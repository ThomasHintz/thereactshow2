export const dynamic = 'force-dynamic';

import Link from 'next/link'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MVz87Ke2JFOuDSNa2PVPrs3BBq9vJQwwDITC3sOB521weM4oklKtQFbJ03MNsJwsxtjHO5NScqOHC9MABREVjU900yYz3lWgL');
import { dbRun } from '@/db';

import { XCircleIcon } from '@heroicons/react/20/solid'

import { Container } from '@/components/Container';


// /reactors/create-account?csi=cs_test_a1pBB0FI8GUKnWYlCVn0RKUYXV8FRroacXjI5WVhWPlFJilm46lZwdjgac
export default async function Page({ searchParams }) {
  const unexpectedError = searchParams['unexpected_error'];
  const msg = searchParams['msg'];
  const csi = searchParams['csi'];
  const session = csi && await stripe.checkout.sessions.retrieve(csi);
  const email = (csi && session && session.customer_details.email) || searchParams['email'];
  const message = searchParams['message'];
  const submitted = email || message;
  const valid = submitted && email && message;
  let emailSentSuccessfully = false;
  if (unexpectedError) {
    return (
      <>
        Unexpected Error sorry about that! Please contact us via <Link href="/contact">Contact</Link> and we will get it figured out!
      </>
    );
  }
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          The Reactors - Create Account
        </h1>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <p>
            Thank you so much for signing up to become a Reactor! We just need a password now to create an account for you!
          </p>
          {msg && (
             <div className="rounded-md bg-red-50 p-4 mt-8">
               <div className="flex">
                 <div className="flex-shrink-0">
                   <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                 </div>
                 <div className="ml-3">
                   <h3 className="text-sm font-medium text-red-800">There was an error with your submission</h3>
                   <div className="mt-2 text-sm text-red-700">
                     {msg}
                   </div>
                 </div>
               </div>
             </div>
          )}
          <form className="space-y-8" method="POST" action="/api/create-account">
            <input
              name="csi"
              value={csi}
              type="hidden"
            />
            <div className="space-y-8">
              <div className="pt-8">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="emailprefilled" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="emailprefilled"
                        name="emailprefilled"
                        type="email"
                        defaultValue={email}
                        disabled
                        title="Email Address (required)"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="hidden"
                        name="email"
                        value={email}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minlength="12"
                        title="Password (required)"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="passwordagain" className="block text-sm font-medium text-gray-700">
                      Password (again)
                    </label>
                    <div className="mt-1">
                      <input
                        id="passwordagain"
                        name="passwordagain"
                        type="password"
                        required
                        minlength="12"
                        title="Password (required)"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
