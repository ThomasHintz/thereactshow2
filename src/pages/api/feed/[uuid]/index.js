import path from 'path';
import fs from 'fs';

import db from '@/db';
import {
  ROOT,
  REACTORS_ACCOUNT,
  accountUnsubscribeURL,
  accountFeedURL,
  podcastPage,
  episodeFile
} from '@/paths';

import { Podcast } from 'podcast';

import { getEpisodes } from '@/data/episodes';

async function syncEpisodes() {
  const episodes = await getEpisodes();
  let newEpisodes = false;

  const dbUpdates = episodes.map(async ({ title, published, description, content, slug, audio: { src, length }, num, id, youtube }) => {
      const existsInDb = await db.get('select id from episodes where number=?', num);
    if (!existsInDb) {
      newEpisodes = true;
      console.log('adding to db');
      await db.run('insert into episodes (number, content, summary, slug, season, episode, audio_url, title, episode_type, buzzsprout_id, buzzsprout_url, pub_date, youtube_url) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                   num,
                   content,
                   description,
                   slug,
                   1,
                   num,
                   '',
                   title,
                   'full',
                   id,
                   src,
                   published,
                   youtube);
      console.log('added to db', num);
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
    const { uuid: uuidRaw } = req.query;
    const uuid = uuidRaw.split('.rss')[0];
    const subExists = await db.get('select id from subscriptions where uuid=?', uuid);
    if (subExists) {
      const now = new Date();
      const dbEpisodesRaw = await db.all('select * from episodes order by number desc;');
      const dbEpisodes = dbEpisodesRaw.filter(e => new Date(e.pub_date) <= now);
      const { last_build_date } = await db.get('select last_build_date from feed;');
      const lastEpisode = dbEpisodes[0];
      let lastBuilt = new Date(last_build_date);
      if (lastBuilt < new Date(lastEpisode.pub_date)) {
        console.log('rebuild!');
        await db.run('update feed set last_build_date = ?;', now.toISOString());
        lastBuilt = now;
      }
      const feed = new Podcast({
        title: 'The React Show Premium: The Reactors',
        description: `<p>Premium subscription to The React Show: thank you so much for your support!</p>
<p>Manage your subscription here: <a href="${REACTORS_ACCOUNT}">${REACTORS_ACCOUNT}</a></p>
<p>Unsubscribe here: <a href="${accountUnsubscribeURL(uuid)}">${accountUnsubscribeURL(uuid)}</a></p>
<p>Discussions about React, JavaScript, and web development by React experts with a focus on diving deep into learning React and discussing what it's like to work within the React industry.</p>`,
        feedUrl: accountFeedURL(uuid),
        siteUrl: ROOT,
        imageUrl: 'https://storage.buzzsprout.com/variants/d1tds1rufs5340fyq9mpyzo491qp/5cfec01b44f3e29fae1fb88ade93fc4aecd05b192fbfbc2c2f1daa412b7c1921.jpg',
        author: 'The React Show',
        copyright: '© 2023 Owl Creek',
        language: 'en',
        categories: ['Technology','Education','Business'],
        pubDate:lastBuilt,
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

      dbEpisodes.forEach(({ title, pub_date, summary: description, content, slug, duration, audio_url, number, episode_type }) => {
        feed.addItem({
          title,
          description: content,
          content,
          url: podcastPage(slug),
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
            url: audio_url || ''
          },
        });
      })

      const xml = feed.buildXml();

      res.setHeader('Content-Type', 'text/xml; charset=utf-8');
      res.send(xml);
    } else {
      return res.status(404).send('Not found');
    }
  }
};
