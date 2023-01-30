import StandardHead from '@/components/StandardHead';

export default async function Head({ params }) {
  return (
    <StandardHead
      title="Foundations of High-Performance React"
      description="A book diving deep into the details of how React actually works."
    />
  );
};
