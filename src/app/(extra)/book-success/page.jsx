import JustifiedSection from '@/components/JustifiedSection'

export default async function Page({ params }) {
  return (
    <>
      <JustifiedSection title="Thanks for your support!">
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            download
            href="/files/foundations-high-performance-react.pdf"
            className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download PDF
          </a>
          <a
            href="/files/foundations-high-performance-react.epub"
            download
            className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download ePub
          </a>
          <a
            href="/files/foundations-high-performance-react.mobi"
            download
            className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download Kindle
          </a>
        </div>
      </JustifiedSection>
    </>
  )
}
