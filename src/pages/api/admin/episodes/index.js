import db from '@/db';

const SORT_MAP = {
  'ASC': 'asc',
  'DESC': 'desc'
};

const COLUMN_MAP = {
  'id': 'id',
  'number': 'number',
  'episode': 'episode'
};

const COLS_LIST = ['number', 'content', 'summary', 'slug', 'season', 'episode', 'duration', 'filename', 'title', 'episode_type', 'buzzsprout_id', 'buzzsprout_url', 'pub_date', 'youtube_url', 'transcript_filename', 'audio_url', 'audio_size'];

export default async function handler(req, res) {
  const sessionId = req.cookies?.session;
  if (!sessionId) { res.status(404).json({}); return; }
  const sessionRes = await db.get('select email from sessions join users on users.id = sessions.user_id where session_id=?;', sessionId);
  if (!sessionRes || sessionRes?.email != process.env.ADMIN_EMAIL) { res.status(404).json({}); return; }
  if (req.method === 'GET') {
    const { sort, range, filter } = req.query;
    const [sortColumn, sortDirection] = sort ? JSON.parse(sort) : [false, false];
    const [rangeStart, rangeEnd] = range ? JSON.parse(range) : [false, false];
    let rows;
    if (sort && range) {
      rows = await db.all(`select * from episodes order by ${COLUMN_MAP[sortColumn]} ${SORT_MAP[JSON.parse(sort)[1]]} limit ? offset ?;`, rangeEnd - rangeStart, rangeStart);
    } else if (filter) {
      const filterParsed = JSON.parse(filter);
      rows = await db.all(`select * from episodes where id in (${filterParsed['id'].map(x => '?').join(',')})`, filterParsed['id']);
    }
    const { count } = await db.get('select count(id) as count from episodes;');

    res.setHeader('Content-Range', count);
    res.status(200).json(rows)
  } else if (req.method === 'POST') {
    await db.run(`insert into episodes (${COLS_LIST.join(', ')}) values (${COLS_LIST.map(() => '?').join(', ')});`,
                 COLS_LIST.map((c) => req.body[c]));
    const episode = await db.get('select * from episodes where number = ? and title = ? and slug = ?', req.body['number'], req.body['title'], req.body['slug']);
    res.status(200).json(episode);
  }
}
