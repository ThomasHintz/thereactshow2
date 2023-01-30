const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function FormattedDate({ date, ...props }) {
  if (date instanceof Date && !isNaN(date.valueOf())) {
    return (
      <time dateTime={date.toISOString()} {...props}>
        {dateFormatter.format(date)}
      </time>
    )
  }
  return null;
}
