import Head from 'next/head'
import Image from 'next/image'

import BookPurchaseCTA from '@/components/BookPurchaseCTA'
import BookTitle from '@/components/BookTitle'
import JustifiedSection from '@/components/JustifiedSection'
import JustifiedSectionReversed from '@/components/JustifiedSectionReversed'
import { Box } from '@/components/Components'

import bookImage from '@/images/foundations.png'
import authorImage from '@/images/headshot.jpg'

const chapters = [
  'Preface',
  'Acknowledgments',
  'Introduction',
  'Components of React',
  'Markup in JavaScript: JSX',
  'Getting Ready to Render with createElement',
  'Render: Putting Elements on the Screen',
  'Reconciliation, or How React Diffs',
  'Fibers: Splitting up Render',
  'Putting it all together',
  'Conclusion'
];

export default async function Page({ params }) {
  return (
    <>
      <Head>
        <title>Foundations of High-Performance React</title>
        <meta name="description" content="TODO" />
      </Head>
      <div className="relative isolate overflow-hidden bg-white">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
        </svg>
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              It All Starts With Understanding The Foundation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              It can be hard to create high-performance React applications without having a firm understanding of the foundations. In this book you&apos;ll create your own version of React that will give you a deep insight into the performance of React itself.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#first-cta"
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Download
              </a>
              <a href="#learn-more" className="text-base font-semibold leading-7 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src={bookImage}
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[33rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookPurchaseCTA />
      <JustifiedSection title="About the Book">
        <p id="learn-more">
          React performance can be a mystery. When your app performance degrades it isn&apos;t always clear where to look or how to fix the issue. Foundations of High-Performance React Applications is a mini-book exploring what makes React itself behave the way it does. Armed with this knowledge you will be better equipped to build your own high-performance React applications and correctly diagnose bottlenecks.
        </p>
        <p>
          Beyond diagnosing bottlenecks, this book teaches the fundamentals of how React renders. By the end of the book you will not only know exactly how React works internally but you’ll also have a deep understanding of how to build React applications that take full advantage of the strengths of the React architecture.
        </p>
        <p>
          The book takes you through the process of creating your own “mini” version of React that is based on the same heuristic algorithms React is. You will not only learn how React renders but be able to see it demonstrated in the included source code.
        </p>
      </JustifiedSection>
      <JustifiedSectionReversed title="Table of Contents" bg="gray-800">
        <ol className="text-xl">
          {chapters.map((c, i) => (
            <li key={i}>
              {c}
            </li>
          ))}
        </ol>
      </JustifiedSectionReversed>
      <section className="overflow-hidden bg-gray-50 py-12 md:py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <svg
            className="absolute top-full right-full translate-x-1/3 -translate-y-1/4 transform lg:translate-x-1/2 xl:-translate-y-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            role="img"
            aria-labelledby="svg-workcation"
          >
            <title id="svg-workcation">Workcation</title>
            <defs>
              <pattern
                id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={404} fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
          </svg>

          <div className="relative">
            <blockquote className="mt-10">
              <div className="mx-auto max-w-3xl text-center text-2xl font-medium leading-9 text-gray-900">
                <p>
    &ldquo;I might be new to React but it was entertaining and clearly communicated.&rdquo;
                </p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base font-medium text-gray-900">Andrew H.</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <JustifiedSectionReversed title="Book Sample" bg="gray-800">
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/files/foundations-high-performance-react-sample-export.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download PDF
          </a>
        </div>
      </JustifiedSectionReversed>
      <BookPurchaseCTA />
      <JustifiedSectionReversed title={(
          <Box flex flex-col items-center>
            <BookTitle>About the Author</BookTitle>
            <Image
              src={authorImage}
                  alt="Picture of smiling author"
                  width={230}
                  height={230}
                  className="rounded-full mt-16"
            />
          </Box>
      )} bg="gray-800">
        <p className="">
          Thomas Hintz has been a web developer for two decades and has been in the software industry for 13 years as an engineer and engineering manager. Creator of the 3L Operating System, a Lisp Compiler, web server, web sockets library, and much more.
        </p>
        <p>
          Author of wildly popular essays like “Work When You Feel Like It”, creator of the fastest websockets server library, and serial speaker at bay-area software events.
        </p>
      </JustifiedSectionReversed>
    </>
  )
}
