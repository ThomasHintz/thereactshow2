import CenteredDarkPanel from '@/components/CenteredDarkPanel'

export default function BookPurchaseCTA() {
  return (
    <>
      <CenteredDarkPanel title="Foundations of High-Performance React" buttonText="Purchase"
                         id="first-cta"
                         href="https://buy.stripe.com/14kcPNaRm28Ydiw7su"
      >
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          $11.99
        </p>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          DRM-free Kindle, ePub, & PDF downloads.
        </p>
      </CenteredDarkPanel>
    </>
  );
}
