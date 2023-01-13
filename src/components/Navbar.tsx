import siteinfo from "../siteinfo";
import Link from "next/link";
import Image from "next/image";

function NavLink({ href, path, children }: any) {
  const className = path === href ? "active" : "";
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Navbar({ url, children }: any) {
  return (
    <div id="main-navbar-wrapper">
      <nav id="main-navbar">
        <Link href="/" className="logo">
          <div className="logo-img">
            <Image src="/favicon.ico" alt="" width={100} height={100} />
          </div>
          <span className="logo-text">{siteinfo.title}</span>
        </Link>
        <div className="spacer"></div>
        <NavLink href="/" path={url}>
          Home
        </NavLink>
        <NavLink href="/blog/" path={url}>
          Blog
        </NavLink>
      </nav>
    </div>
  );
}
export default Navbar;
