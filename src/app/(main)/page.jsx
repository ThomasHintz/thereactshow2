export const dynamic = 'force-dynamic'

import { Suspense } from "react";

import Link from 'next/link'

import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

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
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/podcast/${episode?.slug}`}>{episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
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

function pageClasses(page, i) {
  return `inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${page === i ? 'border-indigo-500 text-indigo-600': ''}`
};

async function Content({ page }) {
  const episodes = await getEpisodes()
  await new Promise(resolve => setTimeout(resolve, 1000));
  const pages = Math.ceil(episodes.length / 10);
  return (
    <>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {episodes.slice((page - 1) * 10, page * 10).map((episode) => (
          <EpisodeEntry key={episode.id} episode={episode} />
        ))}
      </div>
      <Container>
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            <Link
              href={`/?page=${page - 1}`}
              className={`inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${page <= 1 ? 'pointer-events-none' : ''}`}
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </Link>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {page > 2 && (
               <Link
                 href="/?page=1"
                 className={pageClasses(page, 1)}
                 >
                 1
               </Link>
            )}
            {page > 2 && (
               <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                 ...
               </span>
            )}
            {page > 1 && (
               <Link
                 href={`/?page=${page - 1}`}
                 className={pageClasses(page - 1, page)}
                 >
                 {page - 1}
               </Link>
            )}
            <Link
              href={`/?page=${page}`}
              className={pageClasses(page, page)}
            >
              {page}
            </Link>
            {page < pages && (
               <Link
                 href={`/?page=${page + 1}`}
                 className={pageClasses(page + 1, page)}
                 >
                 {page + 1}
               </Link>
            )}
            {(page + 1) < pages && (
               <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                 ...
               </span>
            )}
            {(page + 1) < pages && (
               <Link
                 href={`/?page=${pages}`}
                 className={pageClasses(page, pages)}
                 >
                 {pages}
               </Link>
            )}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <Link
              href={`/?page=${page + 1}`}
              className={`inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${page >= pages ? 'pointer-events-none' : ''}`}
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </Container>
    </>
  );
}

function Skeleton({ width, height, className, color }) {
  const w = width ? '' : 'w-full';
  const c = color ? color : 'bg-slate-200';
  return (
    <div className={`animate-pulse flex ${c} ${w} ${className}`} style={{ width, height }} />
  );
};

function EpisodeEntryLoading() {
  return (
    <div
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start w-full">
          <div className="order-first font-mono text-sm leading-7 text-slate-500">
            <Skeleton height="1.75rem" width="140px" />
          </div>
          <h2
            className="mt-2 text-lg font-bold text-slate-900 w-full"
          >
            <Skeleton height="1.75rem" />
          </h2>
          <div className="mt-1 text-base leading-7 text-slate-700 w-full">
            <Skeleton height="1rem" className="mt-3" />
            <Skeleton height="1rem" className="mt-3" />
            <Skeleton height="1rem" className="mt-3" />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Skeleton width="0.625rem" height="0.625rem" />
            <span className="ml-3">
              <Skeleton height="1.5rem" width="42.275px" />
            </span>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Skeleton height="1.5rem" width="80.175px" />
          </div>
        </div>
      </Container>
    </div>
  )
}

function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <EpisodeEntryLoading key={i} />
      ))}
    </div>
  );
}

export default async function Home({ searchParams }) {
  return (
    <>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <Suspense fallback={<Loading />}>
          <Content page={searchParams?.page ? parseInt(searchParams?.page, 10) : 1} />
        </Suspense>
      </div>
    </>
  )
}
