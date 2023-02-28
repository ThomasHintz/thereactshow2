import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MVz87Ke2JFOuDSNa2PVPrs3BBq9vJQwwDITC3sOB521weM4oklKtQFbJ03MNsJwsxtjHO5NScqOHC9MABREVjU900yYz3lWgL');

import { setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

import db from '@/db';

import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);

async function verify(password, hash, salt, rounds = 64) {
  const keyBuffer = Buffer.from(hash, 'hex');
  const derivedKey = await scryptPromise(password, salt, rounds);
  return timingSafeEqual(keyBuffer, derivedKey);
}

function makeMsg(email, text) {
  return `/reactors/sign-in?msg=${encodeURIComponent(text)}&email=${encodeURIComponent(email)}`
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, remember_me: rememberMe } = req.body;
    if (email && password) {
      const queryRes = await db.get('select id, salt, password_hash from users where email=?;', email);
      const { password_hash, salt, id: userId } = queryRes || { password_hash: '', salt: '', id: '' };
      const verifyRes = await verify(password, password_hash, salt);
      if (verifyRes) {
        const sessionId = uuidv4();
        const maxAge = 60 * 60 * 24 * 365;
        const today = new Date();
        const expiresDate = new Date(today.getTime() + (1000 * maxAge));
        await db.run('insert into sessions (user_id, session_id, expires) values (?, ?, ?);', userId, sessionId, expiresDate.toISOString());
        setCookie('session', sessionId, { req, res, maxAge: rememberMe ? maxAge : undefined, httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === 'production' });
        res.redirect('/reactors/account')
      } else {
        res.redirect(makeMsg(email, 'Invalid password or account does not exist.'));
      }
    } else {
      if (!email) {
        res.redirect(makeMsg(email, 'Please enter an email address.'));
      }
      if (!password) {
        res.redirect(makeMsg(email, 'Please enter a password.'));
      }
    }
  } else {
    // Handle any other HTTP method
  }
}
