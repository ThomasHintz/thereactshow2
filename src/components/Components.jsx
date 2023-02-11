import { Container } from '@/components/Container';

export function Box({ children, ...props }) {
  const classNames = Object.entries(props).reduce((acc, [k]) => `${acc} ${k}`, '')
  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

export function Article({ title, datetime, datetitle, author, children }) {
  return (
    <article className="py-16 lg:py-36">
      <Container>
        <header className="flex flex-col">
          <div className="flex space-x-2">
            <time pubdate datetime={datetime} title={datetitle}>{datetitle}</time>
            <span>•</span>
            <address className="author">By {author}</address>
          </div>
          <h1 className="mt-2 mb-4 text-4xl font-bold text-slate-900">{title}</h1>
        </header>
        <div className="space-y-4">
          {children}
        </div>
      </Container>
    </article>
  );
};

export function P({ children }) {
  return (
    <p>{children}</p>
  );
};

export function H2({ children }) {
  return (
    <h2 className="mt-2 text-3xl font-bold text-slate-900">{children}</h2>
  );
};

export function A({ href, children }) {
  return (
    <a className="text-sm font-bold text-pink-500 hover:text-pink-700 active:text-pink-900" href={href}>{children}</a>
  );
};
