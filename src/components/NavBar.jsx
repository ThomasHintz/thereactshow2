'use client';

import { Suspense } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

import trsLogo from '@/images/trs-logo.svg';

import Link from 'next/link'

const navigation = [
  { name: 'Contact', href: '/contact-us' },
  { name: 'Book', href: '/book' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({ userMenu, reactorsLink }) {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-full z-20">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    className="block lg:hidden"
                    href="/"
                  >
                    <Image
                      src={trsLogo}
                      className="h-8 w-auto lg:hidden"
                      alt="The React Show TRS logo"
                    />
                  </Link>
                  <Link
                    className="hidden lg:block"
                    href="/"
                  >
                    <Image
                      src={trsLogo}
                      className="h-8 w-auto lg:block"
                      alt="The React Show TRS logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Suspense fallback={(
                        <Link
                          href="/reactors"
                                className={classNames(
                                    '/reactors' === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={'/reactors' === pathname ? 'page' : undefined}
                          >
                          Reactors
                        </Link>
                    )}>
                      {reactorsLink}
                    </Suspense>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.href === pathname ? 'page' : undefined}
                        >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <Suspense fallback={(
                      <UserCircleIcon
                        className="h-8 w-8 rounded-full text-white animate-spin"
                      />
                  )}>
                    {userMenu}
                  </Suspense>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col space-y-4 px-2 pb-3 pt-2">
              <Disclosure.Button>
                <Suspense fallback={(
                    <Link
                      href="/reactors"
                            className={classNames(
                                '/reactors' === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                            aria-current={'/reactors' === pathname ? 'page' : undefined}
                      >
                      Reactors
                    </Link>
                )}>
                  {reactorsLink}
                </Suspense>
              </Disclosure.Button>
              {navigation.map((item) => (
                <Disclosure.Button key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
