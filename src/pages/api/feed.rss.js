import path from 'path';
import fs from 'fs';

import db from '@/db';

import { Podcast } from 'podcast';
/* import mp3Duration from 'mp3-duration'; */

import { getEpisodes } from '@/data/episodes';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const feed = new Podcast({
      title: 'The React Show (Reactors)',
      description: "Discussions about React, JavaScript, and web development by React experts with a focus on diving deep into learning React and discussing what it's like to work within the React industry.",
      feedUrl: 'https://www.thereactshow.com/api/feed.rss',
      siteUrl: 'https://www.thereactshow.com',
      imageUrl: 'https://storage.buzzsprout.com/variants/d1tds1rufs5340fyq9mpyzo491qp/5cfec01b44f3e29fae1fb88ade93fc4aecd05b192fbfbc2c2f1daa412b7c1921.jpg',
      author: 'Owl Creek Studio',
      copyright: '© 2023 Owl Creek Studio',
      language: 'en',
      categories: ['Technology','Education','Business'],
      pubDate: 'May 20, 2012 04:00:00 GMT',
      ttl: 60,
      itunesAuthor: 'Owl Creek Studio',
      itunesOwner: { name: 'Owl Creek Studio' },
      itunesExplicit: false,
      itunesCategory: [{
        text: 'Technology'
      },
                       {
                         text: 'Education'
                       },
                       {
                         text: 'Business'
                       }],
      itunesImage: 'https://storage.buzzsprout.com/variants/d1tds1rufs5340fyq9mpyzo491qp/5cfec01b44f3e29fae1fb88ade93fc4aecd05b192fbfbc2c2f1daa412b7c1921.jpg'
    });

    const episodes = await getEpisodes();
    episodes.forEach(({ title, published, description, content, slug, audio: { src, length }, num, id, youtube }) => {
      const filename = `0${num}-mixed.mp3`; // TODO auto-add the 0 prefix
      const filepath = path.join(process.cwd(), 'public', 'files', 'episodes', filename);
      if (fs.existsSync(filepath)) {
        feed.addItem({
          title,
          description: content,
          content,
          url: `https://www.thereactshow.com/podcast/${slug}`,
          date: published,
          itunesExplicit: false,
          itunesSummary: description,
          /* itunesDuration: await mp3Duration(filepath), TODO */
          itunesDuration: 1234,
          enclosure : {
            url: `https://www.thereactshow.com/files/episodes/${filename}`,
            file: filepath
          },
        });
      }
    })

    const dbUpdates = episodes.map(async ({ title, published, description, content, slug, audio: { src, length }, num, id, youtube }) => {
      const filename = `0${num}-mixed.mp3`; // TODO auto-add the 0 prefix
      const filepath = path.join(process.cwd(), 'public', 'files', 'episodes', filename);
      if (fs.existsSync(filepath)) {
        const existsInDb = await db.get('select id from episodes where number=?', num);
        if (!existsInDb) {
          console.log('adding to db');
          await db.run('insert into episodes (number, content, summary, slug, season, episode, filename, title, episode_type, buzzsprout_id, buzzsprout_url, pub_date, youtube_url) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                        num,
                        content,
                        description,
                        slug,
                        1,
                        num,
                        filename,
                        title,
                        'episodic',
                        id,
                        src,
                        published,
                        youtube);
          console.log('added to db', num);
        }
      }
    })
    await Promise.all(dbUpdates);

    const xml = feed.buildXml();

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.send(xml);
  }
};
