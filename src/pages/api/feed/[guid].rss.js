import path from 'path';
import fs from 'fs';

import db from '@/db';

import { Podcast } from 'podcast';
import mp3Duration from 'mp3-duration';

import { getEpisodes } from '@/data/episodes';

async function syncEpisodes() {
  const episodes = await getEpisodes();
  let newEpisodes = false;

  const dbUpdates = episodes.map(async ({ title, published, description, content, slug, audio: { src, length }, num, id, youtube }) => {
    const filename = `0${num}-mixed.mp3`; // TODO auto-add the 0 prefix
    const filepath = path.join(process.cwd(), 'public', 'files', 'episodes', filename);
    if (fs.existsSync(filepath)) {
      const existsInDb = await db.get('select id from episodes where number=?', num);
      if (!existsInDb) {
        newEpisodes = true;
        console.log('adding to db');
        const duration = Math.round(await mp3Duration(filepath));
        await db.run('insert into episodes (number, content, summary, slug, season, episode, filename, duration, title, episode_type, buzzsprout_id, buzzsprout_url, pub_date, youtube_url) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                     num,
                     content,
                     description,
                     slug,
                     1,
                     num,
                     filename,
                     duration,
                     title,
                     'full',
                     id,
                     src,
                     published,
                     youtube);
        console.log('added to db', num);
      }
    }
  })
  // if (newEpisodes) {
    // TODO upsert: "insert into feed (last_build_date) VALUES(datetime('now'),datetime('now', 'localtime'));"
  // }
  await Promise.all(dbUpdates);
  return newEpisodes;
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // await syncEpisodes();
    const feed = new Podcast({
      title: 'The React Show (Reactors)',
      description: "Premium subscription to The React Show. Discussions about React, JavaScript, and web development by React experts with a focus on diving deep into learning React and discussing what it's like to work within the React industry.",
      feedUrl: 'https://www.thereactshow.com/api/feed.rss',
      siteUrl: 'https://www.thereactshow.com',
      imageUrl: 'https://storage.buzzsprout.com/variants/d1tds1rufs5340fyq9mpyzo491qp/5cfec01b44f3e29fae1fb88ade93fc4aecd05b192fbfbc2c2f1daa412b7c1921.jpg',
      author: 'The React Show',
      copyright: '© 2023 Owl Creek',
      language: 'en',
      categories: ['Technology','Education','Business'],
      pubDate: 'May 20, 2012 04:00:00 GMT',
      ttl: 60,
      itunesAuthor: 'The React Show',
      itunesOwner: { name: 'The React Show' },
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

    const dbEpisodes = await db.all('select * from episodes order by number desc;');
    dbEpisodes.forEach(({ title, pub_date, summary: description, content, slug, duration, filename, number, episode_type }) => {
      const filepath = path.join(process.cwd(), 'public', 'files', 'episodes', filename);
      if (fs.existsSync(filepath)) {
        feed.addItem({
          title,
          description: content,
          content,
          url: `https://www.thereactshow.com/podcast/${slug}`,
          date: pub_date,
          itunesTitle: title,
          itunesExplicit: false,
          itunesSummary: description,
          itunesDuration: duration,
          itunesAuthor: 'The React Show',
          itunesSeason: 1,
          itunesEpisode: number,
          itunesEpisodeType: episode_type,
          enclosure : {
            url: `https://www.thereactshow.com/files/episodes/${filename}`,
            file: filepath
          },
        });
      }
    })

    const xml = feed.buildXml();

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.send(xml);
  }
};
