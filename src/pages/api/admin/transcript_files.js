const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const filesOrig = fs.readdirSync('./src/data', {withFileTypes: true})
                        .filter(item => !item.isDirectory())
                        .map(item => item.name);
    const files = filesOrig.filter(f => f.includes('.srt'));
    files.sort();
    files.reverse();

    res.setHeader('Content-Range', files.length);
    res.status(200).json(files.map((f, i) => { return { id: i, filename: f } }));
  }
}
