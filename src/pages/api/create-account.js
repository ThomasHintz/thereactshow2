import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import db from '@/db';
import { withRateLimiter } from '@/lib/rateLimiter';

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
const createSubscription = async (userId, type) => {
  await db.run('insert into subscriptions (uuid, user_id, type) values (?, ?, ?);', randomUUID(), userId, type);
};

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, passwordagain, csi, patreon_magic_key } = req.body;

    // Validate email, password, and csi
    if (email && password && password === passwordagain && (csi || patreon_magic_key)) {
      // Check for minimum password length
      if (password.length < 12) {
        res.status(303).redirect(makeMsg(csi, email, 'Please enter a password that is at least 12 characters long.'));
        return;
      }

      // Retrieve Stripe session and email or get verify patreon magic key
      const session = (csi && await stripe.checkout.sessions.retrieve(csi)) ||
                      (patreon_magic_key === process.env.PATREON_MAGIC_KEY ? { customer_details: { email } } : false);
      const emailFromSession = session && session.customer_details.email;
      const sessionType = session && session?.metadata?.type;

      // Validate session and email
      if (!session || !emailFromSession || email !== emailFromSession) {
        console.error('Unexpected error occurred');
        if (!session) { console.error('unable to get session'); }
        if (!emailFromSession) { console.error('unable to get email from session'); }
        if (!email === emailFromSession) { console.error('session email does not match form email'); }
        res.status(303).redirect('/reactors/create-account?unexpected_error=true');
        return;
      }

      // Check if user already exists
      const existingUser = await db.get('select id from users where email=?', email);
      if (existingUser) {
        console.error('User already exists');
        res.status(303).redirect('/reactors/create-account?unexpected_error=true');
        return;
      }

      // Create new user and subscription
      const salt = genSalt();
      const hashRes = await hash(salt, password);
      const userId = await createUser(email, salt, hashRes);
      await createSubscription(userId, sessionType);
      console.log('User created successfully');
      res.status(303).redirect('/reactors/account');
    } else {
      // Handle missing or invalid form data
      if (!email || !csi) {
        console.error('Missing email or csi');
        res.status(303).redirect('/reactors/create-account?unexpected_error=true');
        return;
      }
      if (!password) {
        res.status(303).redirect(makeMsg(csi, email, 'Please enter a password'));
        return;
      }
      if (password !== passwordagain) {
        res.status(303).redirect(makeMsg(csi, email, 'Passwords did not match. Please try again.'));
        return;
      }
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method not allowed. Only POST method is supported.' });
  }
}

export default withRateLimiter(handler, true);
