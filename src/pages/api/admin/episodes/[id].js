import db from '@/db';

const COLS = {};
const COLS_PREFIXED = {};
const COLS_LIST = ['id', 'number', 'content', 'summary', 'slug', 'season', 'episode', 'duration', 'filename', 'title', 'episode_type', 'buzzsprout_id', 'buzzsprout_url', 'pub_date', 'youtube_url', 'transcript_filename', 'audio_url'];
COLS_LIST.forEach((k) => COLS[k] = k)
COLS_LIST.forEach((k) => COLS_PREFIXED[k] = `$${k}`)

export default async function handler(req, res) {
  const sessionId = req.cookies?.session;
  if (!sessionId) { res.status(404).json({}); return; }
  const sessionRes = await db.get('select email from sessions join users on users.id = sessions.user_id where session_id=?;', sessionId);
  if (!sessionRes || sessionRes?.email != process.env.ADMIN_EMAIL) { res.status(404).json({}); return; }
  const { id } = req.query;
  if (req.method === 'GET') {
    const episode = await db.get('select * from episodes where id = ?', id);
    res.status(200).json(episode)
  } else if (req.method === 'PUT') {
    const changes = req.body;
    const changesForSQL = {};
    Object.keys(changes).forEach((k) => changesForSQL[COLS_PREFIXED[k]] = changes[k]);
    const { id } = await db.get(`update episodes set ${Object.keys(changes).map((k) => `${COLS[k]} = ${COLS_PREFIXED[k]}`).join(', ')} where id = $id returning id;`, changesForSQL);
    const episode = await db.get('select * from episodes where id = ?', id);
    res.status(200).json(episode)
  } else if (req.method = 'DELETE') {
    const episode = await db.get('select * from episodes where id = ?', id);
    await db.run('delete from episodes where id = ?', id);
    res.status(200).json(episode);
  }
}
