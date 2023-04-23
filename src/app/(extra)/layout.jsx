import UserMenu from '@/components/UserMenu';
import ReactorsLink from '@/components/ReactorsLink';
import NavBar from '@/components/NavBar'

export default function ExtraLayout({children}) {
  return (
    <>
      <NavBar userMenu={(<UserMenu />)} reactorsLink={(<ReactorsLink />)} />
      <div className="lg:pt-16">
        {children}
      </div>
    </>
  );
}
