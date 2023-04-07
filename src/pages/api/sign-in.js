import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import { setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

import db from '@/db';
import { withRateLimiter } from '@/lib/rateLimiter';

import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);

async function verify(password, hash, salt, rounds = 64) {
  const keyBuffer = Buffer.from(hash, 'hex');
  const derivedKey = await scryptPromise(password, salt, rounds);

  // Ensure both buffers have the same length
  const keyBufferLength = keyBuffer.length;
  const derivedKeyLength = derivedKey.length;
  const maxLength = Math.max(keyBufferLength, derivedKeyLength);
  const paddedKeyBuffer = keyBuffer.length < maxLength ?
                                             Buffer.concat([Buffer.alloc(maxLength - keyBufferLength), keyBuffer]) : keyBuffer;
  const paddedDerivedKey = derivedKey.length < maxLength ?
                                               Buffer.concat([Buffer.alloc(maxLength - derivedKeyLength), derivedKey]) : derivedKey;

  return timingSafeEqual(paddedKeyBuffer, paddedDerivedKey);
}

function makeMsg(email, text) {
  return `/reactors/sign-in?msg=${encodeURIComponent(text)}&email=${encodeURIComponent(email)}`
};

async function handler(req, res) {
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
    res.status(405).json({ error: 'Method not allowed. Only POST method is supported.' });
  }
}

export default withRateLimiter(handler, true);
