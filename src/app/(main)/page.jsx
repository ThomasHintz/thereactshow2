import Link from 'next/link'

import { Container } from '@/components/Container'
import Episodes from '@/components/Episodes'

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

export const metadata = {
  description: "Weekly podcast focused on React, programming, and software engineering."
};

export default async function Home() {
  return (
    <>
      <Episodes limit={15} />
      <Container>
        <Link
          href="/episodes"
          className="flex items-center text-lg mb-16 underline font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
        >
          View All Episodes
        </Link>
      </Container>
    </>
  );
}
