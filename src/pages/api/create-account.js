import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MVz87Ke2JFOuDSNa2PVPrs3BBq9vJQwwDITC3sOB521weM4oklKtQFbJ03MNsJwsxtjHO5NScqOHC9MABREVjU900yYz3lWgL');

import db from '@/db';

import { scrypt, randomBytes, timingSafeEqual, randomUUID } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);

function genSalt(bytes = 16) {
  return randomBytes(bytes).toString('hex');
};

async function hash(salt, password, rounds = 64) {
  const derivedKey = await scryptPromise(password, salt, rounds);
  return derivedKey.toString('hex')
}

async function verify(password, hash, salt, rounds = 64) {
  const keyBuffer = Buffer.from(hash, 'hex');
  const derivedKey = await scryptPromise(password, salt, rounds);
  return timingSafeEqual(keyBuffer, derivedKey);
}


function makeMsg(csi, email, text) {
  return `/reactors/create-account?csi=${csi}&msg=${encodeURIComponent(text)}&email=${encodeURIComponent(email)}`
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, passwordagain, csi } = req.body;
    if (email && password && password === passwordagain && csi) {
      const session = csi && await stripe.checkout.sessions.retrieve(csi);
      const emailFromSession = session && session.customer_details.email;
      if (!session || !emailFromSession || email !== emailFromSession) {
        res.redirect('/reactors/create-account?unexpected_error=true');
      }
      const existingUser = await db.get('select id from users where email=?', email);
      if (existingUser) {
        res.redirect('/reactors/create-account?unexpected_error=true');
      }
      console.log('inserting user');
      const salt = genSalt();
      const hashRes = await hash(salt, password);
      await db.run('insert into users (email, salt, password_hash) values (?, ?, ?);', email, salt, hashRes);
      const { id: userId } = await db.get('select id from users where email=?', email);
      await db.run('insert into subscriptions (uuid, user_id) values (?, ?);', randomUUID(), userId);
      console.log('done inserting user');
      res.redirect('/reactors')
    } else {
      if (!email || !csi) {
        res.redirect('/reactors/create-account?unexpected_error=true');
      }
      if (!password) {
        res.redirect(makeMsg(csi, email, 'Please enter a password'));
      }
      if (password !== passwordagain) {
        res.redirect(makeMsg(csi, email, 'Passwords did not match. Please try again.'));
      }
    }
  } else {
    // Handle any other HTTP method
  }
}
