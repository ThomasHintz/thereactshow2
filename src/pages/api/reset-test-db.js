import fs from 'fs';

export default async function handler(req, res) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(401).send('Unauthorized');
  }

  if (req.method === 'POST') {
    try {
      fs.copyFileSync('./test-db.sqlite3', './db.sqlite3');
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error copying file');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
