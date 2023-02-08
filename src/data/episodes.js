import * as srtparsejs from "srtparsejs";
import fs from 'fs';
import path from 'path';

import { extractFromXml } from '@extractus/feed-extractor'

export const PAGE_SIZE = 15;

const episodeExtra = {
  '12207725': {
    slug: 'the-truth-about-react-server-components',
    transcript: srtparsejs.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', '077-mixed.srt')).toString())
  },
  'Buzzsprout-12158608': {
    slug: 'how-using-typescript-actually-makes-your-program-worse',
    transcript: srtparsejs.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', '076-mixed.srt')).toString())
  },
  'Buzzsprout-12157221': {
    slug: 'flying-in-a-private-jet-my-first-programming-job'
  },
  'Buzzsprout-12142504': {
    slug: 'from-a-career-in-logic-gates-to-react-with-evan-walter',
    transcript: srtparsejs.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', '074-mixed.srt')).toString())
  },
  'Buzzsprout-12076221': {
    slug: 'a-fundamentally-new-react-my-journey-with-react-server-components',
    transcript: srtparsejs.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'Buzzsprout-12076221.srt')).toString())
  },
  'Buzzsprout-12033274': {
    slug: 'learning-react-on-only-3-hours-per-week-while-working-full-time'
  },
  'Buzzsprout-11941927': {
    slug: 'testing-useeffect-porting-rn-app-to-web'
  },
  'Buzzsprout-11918765': {
    slug: 'react-2022-year-in-review-foundational-changes'
  },
  'Buzzsprout-11912454': {
    slug: 'news-dec-21st-chatgpt-swr-20-wasp-mfa-ci-react-visual-cms-flash-in-2022'
  },
  'Buzzsprout-11879575': {
    slug: 'how-i-built-my-own-react'
  },
  'Buzzsprout-11802072': {
    slug: 'faq-typescript-svelte'
  },
  'Buzzsprout-11802002': {
    slug: 'thinking-in-react'
  },
  'Buzzsprout-11757420': {
    slug: 'how-decentralized-is-crypto-really'
  },
  'Buzzsprout-11683392': {
    slug: 'concise-ish-beginners-guide-to-learning-react' // TODO extra content
  },
  'Buzzsprout-11586984': {
    slug: 'its-not-your-fault-you-dont-understand-the-code'
  },
  'Buzzsprout-11533367': {
    slug: 'your-boss-is-wrong-and-how-slow-is-react'
  },
  'Buzzsprout-11500932': {
    slug: 'the-reality-of-micro-frontends-and-why-i-dont-recommend-them'
  },
  'Buzzsprout-11235167': {
    slug: 'react-faq'
  },
  'Buzzsprout-11235154': {
    slug: 'remix-as-fast-as-instant'
  },
  'Buzzsprout-11193020': {
    slug: 'noobs-vs-experts-with-kyle-verhoef'
  },
  'Buzzsprout-11130436': {
    slug: 'oops-i-built-the-wrong-thing'
  },
  'Buzzsprout-11086813': {
    slug: 'a-new-react-compiler'
  },
  'Buzzsprout-10735883': {
    slug: 'forms-still-suck-can-we-design-something-better'
  },
  'Buzzsprout-10402825': {
    slug: 'how-to-build-react-features-right-the-first-time'
  },
  'Buzzsprout-10365089': {
    slug: 'why-react-should-die'
  },
  'Buzzsprout-10317720': {
    slug: 'how-javascript-actually-executes'
  },
  'Buzzsprout-10278986': {
    slug: 'whats-the-hype-about-shopify-hydrogen'
  },
  'Buzzsprout-10229771': {
    slug: 'preventing-startup-burnout-with-brian-wetzel-part-2'
  },
  'Buzzsprout-10181548': {
    slug: 'preventing-startup-burnout-with-brian-wetzel-part-1'
  },
  'Buzzsprout-10138345': {
    slug: 'taking-the-pain-out-of-forms-in-react'
  },
  'Buzzsprout-10037837': {
    slug: 'what-are-react-server-components-and-why-theyre-awesome'
  },
  'Buzzsprout-10037718': {
    slug: 'react-fibers-how-your-app-actually-executes'
  },
  'Buzzsprout-10011866': {
    slug: 'how-to-successfully-test-react-apps-using-cypress'
  },
  'Buzzsprout-9935994': {
    slug: 'chris-keen-on-succeeding-as-a-react-contractor'
  },
  'Buzzsprout-9926848': {
    slug: 'query-caching-why-you-must-use-it-with-react-using-react-query'
  },
  'Buzzsprout-9886172': {
    slug: 'where-and-how-to-store-data-from-your-react-application'
  },
  'Buzzsprout-9842114': {
    slug: 'how-to-stop-wasting-your-time'
  },
  'Buzzsprout-9811470': {
    slug: 'react-component-lifecycle-what-is-a-component'
  },
  'Buzzsprout-9781457': {
    slug: 'why-you-need-to-check-software-licenses'
  },
  'Buzzsprout-9740045': {
    slug: 'alternatives-to-the-software-interview-getting-a-react-job'
  },
  'Buzzsprout-9698201': {
    slug: 'what-do-you-think-of-react-and-other-qa'
  },
  'Buzzsprout-9656919': {
    slug: 'refactoring-quickly-safely-and-easily'
  },
  'Buzzsprout-9608790': {
    slug: 'how-to-diagnose-react-app-bottlenecks-with-the-profiler'
  },
  'Buzzsprout-9545960': {
    slug: 'so-where-do-you-host-your-react-app'
  },
  'Buzzsprout-9502941': {
    slug: 'is-your-react-app-killing-the-planet'
  },
  'Buzzsprout-9464470': {
    slug: 'better-routing-in-react-with-nextjs'
  },
  'Buzzsprout-9451117': {
    slug: 'debug-smarter-in-your-react-apps'
  },
}

const slugToEpisode = {}
Object.entries(episodeExtra).forEach(([id, { slug }]) => {
  slugToEpisode[slug] = id
})

export async function getEpisodes() {
  const feedRes = await fetch('https://feeds.buzzsprout.com/1764837.rss', { next: { revalidate: 60 * 10 } });
  const feedString = await feedRes.text()
  /* const feedString = fs.readFileSync('./feed.rss').toString() */

  let feed = await extractFromXml(feedString,
                                  {
                             getExtraEntryFields: (feedEntry) => {
                               const {
                                 enclosure
                               } = feedEntry
                               return {
                                 enclosure: {
                                   url: enclosure['@_url'],
                                   type: enclosure['@_type'],
                                   length: enclosure['@_length']
                                 },
                                 content: feedEntry['content:encoded'],
                                 chapters: feedEntry['podcast:chapters'] && feedEntry['podcast:chapters']['@_url']
                               }
                             }
                           })

  return feed.entries.map(
    ({ id, title, description, enclosure , published, content, chapters }) => ({
      id,
      title,
      published,
      description,
      content,
      chapters,
      slug: episodeExtra[id]?.slug || title.replace(/[\W_]/g, '-'),
      transcript: episodeExtra[id]?.transcript,
      audio: [enclosure].map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    })
  )
}

export async function getEpisode({ episodeSlug }) {
  const episodes = await getEpisodes()
  const episodeId = slugToEpisode[episodeSlug] || episodeSlug
  let episode = episodes.find(({ id }) => id === episodeId) ||
                episodes.find(({ title }) => title.replace(/[\W_]/g, '-') === episodeId)
  if (!episode) {
    return {
      notFound: true,
    }
  }

  return episode
}
