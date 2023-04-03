import Link from 'next/link';
import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';

import db from '@/db';

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

export default async function Layout({ children }) {
  const userId = await getSession();
  if (!userId) {
    redirect('/reactors');
  }
  return (
    <>
      signed in as: {userId}
      <nav>
        <ul>
          <form method="POST" action="/api/sign-out">
            <button type="submit">Sign Out</button>
          </form>
        </ul>
      </nav>
      {children}
    </>
  );
};
