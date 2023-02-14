import Episodes from '@/components/Episodes'

export const metadata = {
  title: 'All Episodes',
  description: 'List of all episodes for The React Show.'
};

export default async function AllEpisodes() {
  return (
    <Episodes />
  );
}
