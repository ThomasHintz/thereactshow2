"use client"

import { Article } from '@/components/Components';
import PageContents from './page.mdx';

export default function Page() {
  return (
    <Article
      title="Learn JavaScript Fundamentals: Arrays"
      datetime="2021-08-31"
      datetitle="August 31st, 2021"
      author="Mackenzie Hanna"
    >
      <PageContents />
    </Article>
  );
}
