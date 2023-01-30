import NavBar from '@/components/NavBar'

export default function ExtraLayout({children}) {
  return (
    <div>
      <NavBar showPodcast />
      {children}
    </div>
  );
}
