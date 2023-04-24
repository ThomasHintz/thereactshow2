import NavBar from '@/components/NavBar'

export default function ExtraLayout({children}) {
  return (
    <>
      <NavBar />
      <div className="lg:pt-16">
        {children}
      </div>
    </>
  );
}
