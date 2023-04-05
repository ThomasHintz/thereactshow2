import Link from 'next/link'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

import { getEpisodes } from '@/data/episodes'

import Player from '@/app/Player'

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
      data-cy="episode-entry"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
            data-cy="episode-title"
          >
            <Link data-cy="show-notes-link" href={`/podcast/${episode?.slug}`}>[{episode.num}] {episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
            data-cy="episode-date"
          />
          <p className="mt-1 text-base leading-7 text-slate-700" data-cy="episode-description">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Player episode={episode}>
              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </Player>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/podcast/${episode.slug}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
            {episode?.transcript &&
             (
               <>
                 <span
                   aria-hidden="true"
                   className="text-sm font-bold text-slate-400"
                 >
                   /
                 </span>
                 <Link
                   href={`/podcast/${episode.slug}#transcript`}
                   className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                   aria-label={`Transcript for episode ${episode.title}`}
                   data-cy="transcript-link"
                 >
                   Transcript
                 </Link>
               </>
             )}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default async function Episodes({ limit }) {
  const episodes = await getEpisodes();

  return (
    <>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.slice(0, limit || episodes.length).map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  );
}
