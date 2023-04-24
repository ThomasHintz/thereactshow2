import Link from 'next/link';
import { BookOpenIcon, BanknotesIcon, StarIcon } from '@heroicons/react/24/outline'

const features = [


  {
    name: 'Premium Subscription',
    link: 'https://thereactshow.supercast.com/',
    description:
      'Your own premium podcast feed with: bonus content, early releases, ad-free episodes, AMA. The BEST way to support the show!',
    icon: StarIcon,
    highlight: true
  },
  {
    name: 'Buy My Book!',
    link: '/book',
    description:
      'If you want to learn more in-depth how React work then this is definitely the best way to support the show!',
    icon: BookOpenIcon,
  },
  {
    name: 'Tip!',
    link: 'https://buy.stripe.com/cN25nl5x2fZO4M0cMN',
    description:
      'Another great way to directly support the show is to send us a one-time tip! Thank you so much!',
    icon: BanknotesIcon,
  }
];

export const metadata = {
  title: 'Support the Show!',
  description: 'Show your support for the show with these options!'
};

export default async function Page() {
  return (
    <div className="pt-4 pb-12 sm:pb-4 lg:pt-12">
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Support the Show!</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Like <i>The React Show</i>? These are the best ways to support us!
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className={`relative pl-16 p-4 rounded-lg ${feature.highlight ? 'shadow-md border-2 border-green-500' : ''}`}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <Link href={feature.link}>
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </Link>
                      </div>
                      <Link
                        href={feature.link}
                        className="underline font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                      >
                        {feature.name}
                      </Link>
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
