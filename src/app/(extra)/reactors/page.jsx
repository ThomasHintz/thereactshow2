import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Container';


import { CheckIcon } from '@heroicons/react/20/solid'
import reactorsBackground from '@/images/reactors2.jpg';

const features = [
    {
        name: 'Ad-Free Episodes',
        description: 'Enjoy the podcast the way its meant to be enjoyed: just good, pure fun!'
    },
    {
        name: 'The After-Show',
        description: 'The After-Show, when the reactor really heats up! Regular, subscriber-only bonus content!',
    },
    {
        name: 'Thank you for your financial support!',
        description: 'It makes this show possible!',
    }
];

const tiers = [
    {
        name: 'Monthly (USD)',
        id: 'tier-monthly',
        href: process.env.SUB_MONTHLY_URL,
        price: '$10',
        priceUnit: 'monthly',
        description: '',
        features: features.map(({ name }) => name),
    },
    {
        name: 'Annual (USD)',
        id: 'tier-annual',
        href: process.env.SUB_ANNUAL_URL,
        price: '$100',
        priceUnit: 'yearly',
        description: '',
        features: [{ name: 'Save $20 by going yearly!' }, ...features].map(({ name }) => name),
    },
];

const faqs = [
    {
        question: 'How do I listen to subscriber-exclusive podcasts and content?',
        answer: `You will be provided with a unique podcast feed that you will be able to add to your favorite podcast player. We support Apple Podcasts, Spotify, Overcast, Podcast Addict, Pocket Casts, Podcast Republic, Downcast, RSSRadio, Podkicker, and more. Unfortunately we aren't able to support Stitcher, or any other podcast player that doesn't support importing private feeds.`,
    },
    {
        question: 'How do I get in touch?',
        answer: (<span>Send us a message on the <Link href="/contact-us" className="font-semibold text-indigo-600 hover:text-indigo-500">Contact Us</Link> page.</span>)
    },
    {
        question: 'How do I cancel my subscription?',
        answer: (<span>You can cancel your subsription at any time from your <Link href="/reactors/account" className="font-semibold text-indigo-600 hover:text-indigo-500">account page</Link>.</span>)
    },
    {
        question: 'Why do you have a discounted subscription if it offers the same benefits?',
        answer: `Good question! The main point of the subscription is to support the show but we also don't want to create benefits for only the more well-off or those living in wealthier locations. However, we are residents of the United States which has a higher cost of living so offering really low cost subscriptions doesn't provide a lot of benefit to us, after processing fees and administrative overhead, which is why the discounted subscription is annual only.`
    }
]

export default async function Page() {
    return (
        <div className="relative isolate overflow-hidden pt-14">
            <Image
                src={reactorsBackground}
                alt="TODO reactors background"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Join The Reactors!
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        The <strong>BEST</strong> way to support the show and gain access to subscriber-only bonus content!
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#pricing"
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                        >
                            Join!
                        </a>
                        <a href="#learn-more" className="text-sm font-semibold leading-6 text-white">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="isolate overflow-hidden bg-gray-900" id="pricing">
                <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            We are better, <br className="hidden sm:inline lg:hidden" />
                            together
                        </p>
                    </div>
                    <div className="relative mt-6">
                        <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
                            Support the show and join us in navigating this software journey.
                        </p>
                        <svg
                            viewBox="0 0 1208 1024"
                            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
                        >
                            <ellipse cx={604} cy={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" rx={604} ry={512} />
                            <defs>
                                <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                                    <stop stopColor="#7775D6" />
                                    <stop offset={1} stopColor="#E935C1" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className="flow-root bg-white pb-24 sm:pb-32">
                    <div className="-mt-80">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                                {tiers.map((tier) => (
                                    <div
                                        key={tier.id}
                                        className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                                        >
                                        <div>
                                            <h3 id={tier.id} className="text-base font-semibold leading-7 text-indigo-600">
                                                {tier.name}
                                            </h3>
                                            <div className="mt-4 flex items-baseline gap-x-2">
                                                <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                                                <span className="text-base font-bold leading-7 text-gray-600">/{tier.priceUnit}</span>
                                            </div>
                                            <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
                                            <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                                                {tier.features.map((feature) => (
                                                    <li key={feature} className="flex gap-x-3">
                                                        <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <a
                                            href={tier.href}
                                            aria-describedby={tier.id}
                                            className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Join today!
                                        </a>
                                    </div>
                                ))}
                                <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                                    <div className="lg:min-w-0 lg:flex-1">
                                        <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Discounted</h3>
                                        <p className="mt-1 text-base leading-7 text-gray-600">
                                            Can&apos;t afford a full-priced subscription right now? Or live in a place with a lower cost-of-living? The discounted subscription includes all of the benefits of a full subscription at a reduced price ($20 USD annually) and still helps support the show!
                                        </p>
                                    </div>
                                    <a
                                        href={process.env.SUB_DISCOUNT_URL}
                                        className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Join discounted <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden bg-white py-24 sm:py-32" id="learn-more">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">The Reactors</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Exclusive Content & Community</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Join <i>The Reactors</i> to directly support the show and gain access to ad-free, bonus content and The Reactors community!
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <CheckIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className="flex items-start justify-end lg:order-first">
                            <Image
                                src={reactorsBackground}
                                alt="Product screenshot"
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                                width={2432}
                                height={1442}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-5">
                            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Can’t find the answer you’re looking for? Reach out to our{' '}
                                <Link href="/contact-us" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    customer support
                                </Link>{' '}
                                team.
                            </p>
                        </div>
                        <div className="mt-10 lg:col-span-7 lg:mt-0">
                            <dl className="space-y-10">
                                {faqs.map((faq) => (
                                    <div key={faq.question}>
                                        <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
