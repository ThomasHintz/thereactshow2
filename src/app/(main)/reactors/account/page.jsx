import { cookies } from 'next/headers';

import db from '@/db';

import { Container } from '@/components/Container';

async function getSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('session');
  if (!sessionId) {
    return false;
  }
  const { user_id: userId } = await db.get('select user_id from sessions where session_id=?;', sessionId.value);
  if (!userId) {
    return false;
  }
  return userId;
};

export default async function Page() {
  const userId = await getSession();
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          The Reactors
        </h1>
        <a href="https://buy.stripe.com/test_3cs01j768d65gso289">Level I</a>
        {userId && <p>user: {userId}</p>}
      </Container>
    </div>
  );
};
