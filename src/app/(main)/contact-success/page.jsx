import { Container } from '@/components/Container'

export default async function Page({}) {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Contact Us
        </h1>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <p>
            Message sent successfully! Thank you!
          </p>
        </div>
      </Container>
    </div>
  );
}
