const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const files = fs.readdirSync('./public/files/episodes', {withFileTypes: true})
                    .filter(item => !item.isDirectory())
                    .map(item => item.name);
    files.sort();
    files.reverse();

    res.setHeader('Content-Range', files.length);
    res.status(200).json(files.map((f, i) => { return { id: i, filename: f } }));
  }
}
