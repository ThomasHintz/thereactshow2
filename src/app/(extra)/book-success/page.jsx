import JustifiedSection from '@/components/JustifiedSection'

export const metadata = {
  title: 'Download Foundations of High-Performance React'
};

export default async function Page({ params }) {
  return (
    <>
      <JustifiedSection title="Thanks for your support!">
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            download
            href="/files/foundations-high-performance-react.pdf"
            className="rounded-md bg-gray-800 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray"
          >
            Download PDF
          </a>
          <a
            href="/files/foundations-high-performance-react.epub"
            download
            className="rounded-md bg-gray-800 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray"
          >
            Download ePub
          </a>
          <a
            href="/files/foundations-high-performance-react.mobi"
            download
            className="rounded-md bg-gray-800 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray"
          >
            Download Kindle
          </a>
        </div>
      </JustifiedSection>
    </>
  )
}
