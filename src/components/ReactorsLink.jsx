'use server';

import Link from 'next/link';

import UserMenuClient from '@/components/UserMenuClient';

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

export default async function ReactorsLink() {
  const userId = await getSession();
  if (userId) {
    return (
      <Link
        href="/reactors/account"
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
      >
        Reactors
      </Link>
    )
  } else {
    return (
      <Link
        href="/reactors"
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
      >
        Reactors
      </Link>
    );
  }
};
