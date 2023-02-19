"use client"

import { Article } from '@/components/Components';
import PageContents from './page.mdx';

export default function Page() {
  return (
    <Article
      title="Next.js vs Create-React-App"
      datetime="2021-08-12"
      datetitle="August 12th, 2021"
      author="Mackenzie Hanna"
    >
      <PageContents />
    </Article>
  );
}
