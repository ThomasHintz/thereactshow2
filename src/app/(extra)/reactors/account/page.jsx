import { cookies } from 'next/headers';

import db from '@/db';
import { accountFeedURL } from '@/paths';

import { Container } from '@/components/Container';

async function getSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('session');
  if (!sessionId) {
    return false;
  }
  const dbRes = await db.get('select user_id from sessions where session_id=?;', sessionId.value);
  const { user_id: userId } = dbRes ? dbRes : { user_id: false };
  if (!userId) {
    return false;
  }
  return userId;
};

export default async function Page() {
  const userId = await getSession();
  const { uuid } = await db.get('select uuid from subscriptions where user_id=?', userId);
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          The Reactors
        </h1>
        <p>Thank you so much for your support! It makes this show possible!</p>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Your Personal Podcast Feed</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="space-y-10">
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">Copy/Paste URL into your podcast app:</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600"><a href={accountFeedURL(uuid)}>{accountFeedURL(uuid)}</a></dd>
              </div>
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">Instructions For Common Podcast Apps:</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600"><a href="/todo">Here</a></dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </div>
  );
};
