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
          The Reactors - Sign In
        </h1>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
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
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link href='/reactors' className="font-medium text-indigo-600 hover:text-indigo-500">
                  sign up to become a Reactor!
                </Link>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-gray-50">
                <form className="space-y-6" method="POST" action="/api/sign-in">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={email}
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultValue="checked"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
