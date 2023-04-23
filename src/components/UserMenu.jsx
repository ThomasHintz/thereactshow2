'use server';

import Link from 'next/link';

import UserMenuClient from '@/components/UserMenuClient';

import { cookies } from 'next/headers';

import db from '@/db';

const signedInNavigation = [
  { name: 'Account', href: '/reactors/account' },
  { name: 'Sign Out', href: '/' },
]

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

export default async function UserMenu() {
  const userId = await getSession();
  return (
    <UserMenuClient>
      {userId ? (
         <>
           <Link
             href="/reactors/account"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
           >
             Account
           </Link>
           <form
             method="POST"
             action="/api/sign-out"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
           >
             <button
               type="submit">
               Sign Out
             </button>
           </form>
         </>
      ) : (
         <>
           <Link
             href="/reactors/sign-in"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
           >
             Sign In
           </Link>
           <Link
             href="/reactors"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
           >
             Create Account
           </Link>
         </>
      )}
    </UserMenuClient>
  );
};
