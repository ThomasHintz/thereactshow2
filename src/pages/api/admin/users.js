

import db from '@/db';

export default async function handler(req, res) {
  const sessionId = req.cookies?.session;
  if (!sessionId) { res.status(404).json({}); return; }
  const sessionRes = await db.get('select email from sessions join users on users.id = sessions.user_id where session_id=?;', sessionId);
  if (!sessionRes || sessionRes?.email != process.env.ADMIN_EMAIL) { res.status(404).json({}); return; }
  if (req.method === 'GET') {
    const rows = await db.all('select id, email from users;');

    res.setHeader('Content-Range', rows.length);
    res.status(200).json(rows)
  }
}
