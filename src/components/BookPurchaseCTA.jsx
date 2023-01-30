import CenteredDarkPanel from '@/components/CenteredDarkPanel'

export default function BookPurchaseCTA() {
  return (
    <>
      <CenteredDarkPanel title="Foundations of High-Performance React" buttonText="Purchase"
                         id="first-cta"
                         href="https://buy.stripe.com/bIY6rpgbG3d2ces000"
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
