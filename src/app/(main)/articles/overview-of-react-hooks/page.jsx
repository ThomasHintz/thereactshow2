"use client"

import { Article } from '@/components/Components';
import PageContents from './page.mdx';

export default function Page() {
  return (
    <Article
      title="An Overview of React Hooks"
      datetime="2021-08-20"
      datetitle="August 20th, 2021"
      author="Mackenzie Hanna"
    >
      <PageContents />
    </Article>
  );
}
