import Link from 'next/link';

import { Container } from '@/components/Container';
export const metadata = {
  title: 'Rate Limited',
  description: 'Rate limited.'
};

export default async function Page() {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Rate Limited. Please Try Again Later.
        </h1>
      </Container>
    </div>
  );
}
