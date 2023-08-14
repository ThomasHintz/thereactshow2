// export const dynamic = 'force-dynamic'

// import { setTimeout } from 'timers/promises';

import { Suspense } from "react";

// import chaptersStatic from './chapters.json' assert { type: 'json' };

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { PlayButtonClient } from '@/components/player/PlayButtonClient'
import Player from '@/app/Player'

import { getEpisode } from '@/data/episodes'

function parseTime(time) {
  const stepOne = time.split(',');
  const hms = stepOne.length > 0 && stepOne[0].split(':')
  const h = parseInt(hms[0], 10);
  const m = parseInt(hms[1], 10);
  const s = parseInt(hms[2], 10);
  return (h * 3600) + (m * 60) + s;
}

function humanTime(time) {
  const stepOne = time.split(',');
  return stepOne.length > 0 ? stepOne[0] : '';
}

function Transcript({ children }) {
  return (
    <>
      <hr className="my-12 border-gray-200" />
      <h2 className="mt-2 text-3xl font-bold text-slate-900" id="transcript">Transcript</h2>
      <div className="space-y-4" data-cy="transcript">
        {children}
      </div>
    </>
  );
};

function Skeleton({ width, height, className, color }) {
  const w = width ? '' : 'w-full';
  const c = color ? color : 'bg-slate-200';
  return (
    <span className={`animate-pulse ${c} ${w} ${className}`} style={{ width, height }} />
  );
};

function TranscriptNoPlayer({ episode }) {
  return (
    <Transcript>
      {episode.transcript.map(({ id, text }) => (
        <p key={id}>
          <Skeleton className="inline-flex" width="91px" height="18px" /> {text}
        </p>
      ))}
    </Transcript>
  )
}

async function TranscriptWithPlayer({ episode }) {
  // const chaptersRes = episode?.chapters && await fetch(episode.chapters, { cache: 'no-store' });
  /* await setTimeout(5000); */
  /* const { chapters } = chaptersStatic */
  /* const { chapters } = chaptersRes ? await chaptersRes.json() : { chapters: null }
   * let chapterOffsets = [[0, 0]]
   * if (chapters) {
   *   chapters.reduce(({ startTime: prevStartTime, title: prevTitle, acc }, { title, startTime }) => {
   *     const containsAd = prevTitle.includes('[Ad]')
   *     if (containsAd) {
   *       chapterOffsets.push([prevStartTime, acc + (startTime - prevStartTime)])
   *     }
   *     return { startTime, title, acc: containsAd ? acc + (startTime - prevStartTime) : acc }
   *   }, { startTime: 0, title: '', acc: 0 })
   * }
   * chapterOffsets = chapterOffsets.reverse() */
  /* (
   *   <Transcript>
   *     {episode.transcript.map(({ id, startTime, endTime, text }) => (
   *       <p key={id}>
   *         <Player
   *           episode={episode}
   *           startTime={parseTime(startTime) + chapterOffsets.find(([start]) => parseTime(startTime) >= start)[1]}
   *           endTime={parseTime(endTime) + chapterOffsets.find(([start]) => parseTime(startTime) >= start)[1]} />
   *         <strong><time>{humanTime(startTime)}</time></strong> {text}
   *       </p>
   *     ))}
   *   </Transcript>
   * ) */
  return (
    <Transcript>
      {episode.transcript.map(({ id, startTime, endTime, text }) => (
        <p key={id}>
          <Player
            episode={episode}
            startTime={parseTime(startTime)}
            endTime={parseTime(endTime)} />
          <strong><time>{humanTime(startTime)}</time></strong> {text}
        </p>
      ))}
    </Transcript>
  )
};

export async function generateMetadata({ params }) {
  const episode = await getEpisode({ episodeSlug: params.slug });
  return {
    title: episode.title,
    description: `Podcast episode: ${episode.description}`
  };
};

export default async function Page({ params }) {
  const episode = await getEpisode({ episodeSlug: params.slug })
  let date = new Date(episode.published)

  let audioPlayerData = {
    title: episode.title,
    audio: {
      src: episode.audio?.src,
      type: episode.audio?.type,
    },
    link: `/${episode.slug}`,
  }

  return (
    <>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButtonClient audioPlayerData={audioPlayerData} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900" data-cy="title">
                  [{episode.num}] {episode.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                  data-cy="date"
                />
              </div>
            </div>
            <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
              {episode.description}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          {episode?.youtube && (
            <div class="aspect-w-16 aspect-h-9">
              <iframe src={episode.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              <hr className="my-12 border-gray-200" />
            </div>
          )}
          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content || 'CONTENT' }}
            data-cy="description"
          />
          {episode?.transcript && <Suspense fallback={<TranscriptNoPlayer episode={episode} />}>
            <TranscriptWithPlayer episode={episode} />
          </Suspense>}
        </Container>
      </article>
    </>
  )
}
