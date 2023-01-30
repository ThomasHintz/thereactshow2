import Link from 'next/link'

export default function NavBar({ showPodcast }) {
  return (
    <nav className="bg-gray-800">
      <ol className="flex space-x-4 p-4 justify-center">
        <li>
          <Link
            href="/book"
            className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Book</Link>
        </li>
        <li>
          <Link
            href="/contact-us"
            className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Contact</Link>
        </li>
        {showPodcast && (
           <li>
             <Link
               href="/"
               className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
             >Podcast</Link>
           </li>
        )}
      </ol>
    </nav>
  )
}
