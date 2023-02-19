"use client"

import { Article } from '@/components/Components';
import PageContents from './page.mdx';

export default function Page() {
  return (
    <Article
      title="When should you use React.memo and useMemo?"
      datetime="2020-07-17"
      datetitle="July 17th, 2020"
      author="Thomas Hintz"
    >
      <PageContents />
    </Article>
  );
}
