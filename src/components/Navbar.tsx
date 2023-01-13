import siteinfo from "../siteinfo";

function Link({ href, path, children }: any) {
  const className = path === href ? "active" : "";
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function Navbar({ url, children }: any) {
  return (
    <div id="main-navbar-wrapper">
      <nav id="main-navbar">
        <a href="/">{siteinfo.title}</a>
        <div className="spacer"></div>
        <Link href="/" path={url}>
          Home
        </Link>
        <Link href="/blog/" path={url}>
          Blog
        </Link>
      </nav>
    </div>
  );
}
export default Navbar;
