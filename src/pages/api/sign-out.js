import { deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    deleteCookie('session', { req, res, httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === 'production' });
    return res.redirect(303, '/');
  } else {
    // Handle any other HTTP method
  }
}
