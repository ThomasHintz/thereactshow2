import { deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    deleteCookie('session', { req, res, httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('/reactors');
  } else {
    // Handle any other HTTP method
  }
}
