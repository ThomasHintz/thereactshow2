import { getEpisode } from '@/data/episodes'

import StandardHead from '@/components/StandardHead';

export default async function Head({ params }) {
  const episode = await getEpisode({ episodeSlug: params.slug })
  return (
    <StandardHead
      title={`${episode.title} - The React Show`}
      description={episode.description}
    />
  );
};
