'use client';

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserMenu({ children }) {
  return (
    <>
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <UserCircleIcon
            className="h-8 w-8 rounded-full text-white"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children.map((link, i) => (
            <Menu.Item key={i}>
              {link}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </>
  );
};

/* <Menu.Item>
 * {({ active }) => (
 *   <a
 *     href="#"
 *     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
 *   >
 *     Your Profile
 *   </a>
 * )}
 * </Menu.Item>
 * <Menu.Item>
 * {({ active }) => (
 *   <a
 *     href="#"
 *     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
 *   >
 *     Settings
 *   </a>
 * )}
 * </Menu.Item>
 * <Menu.Item>
 * {({ active }) => (
 *   <a
 *     href="#"
 *     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
 *   >
 *     Sign out
 *   </a>
 * )}
 * </Menu.Item> */
