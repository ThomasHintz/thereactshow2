"use client"

import { Article } from '@/components/Components';
import PageContents from './page.mdx';

export default function Page() {
  return (
    <Article
      title="When should you use React.PureComponent?"
      datetime="2020-07-19"
      datetitle="July 19th, 2020"
      author="Thomas Hintz"
    >
      <PageContents />
    </Article>
  );
}
