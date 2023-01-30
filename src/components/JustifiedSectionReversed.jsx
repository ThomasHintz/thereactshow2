import BookTitle from '@/components/BookTitle'

export default function JustifiedSectionReversed({ title, children, bg = 'white' }) {
  return (
    <div className={`bg-${bg}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8 text-white">
        {title && typeof title === 'string' && <BookTitle>{title}</BookTitle>}
        {title && typeof title !== 'string' && title}
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:max-w-prose flex-wrap space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
