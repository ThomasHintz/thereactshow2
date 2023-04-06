import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import db from '@/db';

import { scrypt, randomBytes, timingSafeEqual, randomUUID } from 'crypto';
import { promisify } from 'util';

// Promisify scrypt for better async/await usage
const scryptPromise = promisify(scrypt);

// Generate a random salt with a default length of 16 bytes
function genSalt(bytes = 16) {
  return randomBytes(bytes).toString('hex');
};

// Hash the password with the provided salt and rounds (default 64 rounds)
async function hash(salt, password, rounds = 64) {
  const derivedKey = await scryptPromise(password, salt, rounds);
  return derivedKey.toString('hex');
}

// Verify the password against the stored hash and salt
async function verify(password, hash, salt, rounds = 64) {
  const keyBuffer = Buffer.from(hash, 'hex');
  const derivedKey = await scryptPromise(password, salt, rounds);
  return timingSafeEqual(keyBuffer, derivedKey);
}

// Generate a URL for redirecting with a custom error message
function makeMsg(csi, email, text) {
  return `/reactors/create-account?csi=${csi}&msg=${encodeURIComponent(text)}&email=${encodeURIComponent(email)}`;
}

// Create a new user in the database
const createUser = async (email, salt, hashRes) => {
  await db.run('insert into users (email, salt, password_hash) values (?, ?, ?);', email, salt, hashRes);
  const { id: userId } = await db.get('select id from users where email=?', email);
  return userId;
};

// Create a new subscription for the user
const createSubscription = async (userId) => {
  await db.run('insert into subscriptions (uuid, user_id) values (?, ?);', randomUUID(), userId);
};

// Rate-limiting settings
const rateLimitWindow = 60 * 1000 * 3; // 3 minute
const maxRequests = 10; // Maximum number of requests within the rateLimitWindow
const rateLimiter = new Map();

const isRateLimited = (ip) => {
  const currentTime = Date.now();
  const record = rateLimiter.get(ip);

  if (record) {
    const [requestCount, windowStart] = record;

    // If the request is within the rate limit window, update the request count
    if (currentTime - windowStart < rateLimitWindow) {
      if (requestCount > maxRequests) {
        return true;
      }
      rateLimiter.set(ip, [requestCount + 1, windowStart]);
    } else {
      // If the request is outside the rate limit window, reset the request count
      rateLimiter.set(ip, [1, currentTime]);
    }
  } else {
    // If the IP is not in the rateLimiter, add it
    rateLimiter.set(ip, [1, currentTime]);
  }

  return false;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, passwordagain, csi } = req.body;

    // Check for rate limiting
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (isRateLimited(ip)) {
      res.redirect(makeMsg(csi, email, 'Too many requests. Please try again later or send a message on the contact page if you believe this is an error.'));
      return;
    }

    // Validate email, password, and csi
    if (email && password && password === passwordagain && csi) {
      // Check for minimum password length
      if (password.length < 12) {
        res.redirect(makeMsg(csi, email, 'Please enter a password that is at least 12 characters long.'));
        return;
      }

      // Retrieve Stripe session and email
      const session = csi && await stripe.checkout.sessions.retrieve(csi);
      const emailFromSession = session && session.customer_details.email;

      // Validate session and email
      if (!session || !emailFromSession || email !== emailFromSession) {
        console.error('Unexpected error occurred');
        if (!session) { console.error('unable to get session'); }
        if (!emailFromSession) { console.error('unable to get email from session'); }
        if (!email === emailFromSession) { console.error('session email does not match form email'); }
        res.redirect('/reactors/create-account?unexpected_error=true');
        return;
      }

      // Check if user already exists
      const existingUser = await db.get('select id from users where email=?', email);
      if (existingUser) {
        console.error('User already exists');
        res.redirect('/reactors/create-account?unexpected_error=true');
        return;
      }

      // Create new user and subscription
      const salt = genSalt();
      const hashRes = await hash(salt, password);
      const userId = await createUser(email, salt, hashRes);
      await createSubscription(userId);
      console.log('User created successfully');
      res.redirect('/reactors');
    } else {
      // Handle missing or invalid form data
      if (!email || !csi) {
        console.error('Missing email or csi');
        res.redirect('/reactors/create-account?unexpected_error=true');
        return;
      }
      if (!password) {
        res.redirect(makeMsg(csi, email, 'Please enter a password'));
        return;
      }
      if (password !== passwordagain) {
        res.redirect(makeMsg(csi, email, 'Passwords did not match. Please try again.'));
        return;
      }
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method not allowed. Only POST method is supported.' });
  }
}
