import HeadTags from '@/components/HeadTags';

export default function StandardHead({ title, description }) {
  return (
    <>
      <HeadTags />
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
    </>
  );
};
