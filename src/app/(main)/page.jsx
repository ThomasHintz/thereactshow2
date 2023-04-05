import Link from 'next/link'

import { Container } from '@/components/Container'
import Episodes from '@/components/Episodes'

export const metadata = {
  description: "Weekly podcast focused on React, programming, and software engineering."
};

export default async function Home() {
  return (
    <>
      <Episodes limit={15} />
      <Container>
        <Link
          href="/episodes"
          className="flex items-center text-lg mb-16 underline font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
        >
          View All Episodes
        </Link>
      </Container>
    </>
  );
}
