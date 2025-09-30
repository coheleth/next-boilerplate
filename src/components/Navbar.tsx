"use client";
//******************************************************************************
//    Top navigation bar, with site logo linking back to the home page - follow-
//    ing UX best practices - and links to the remaining pages.
//******************************************************************************

import siteinfo from "../siteinfo";
import Link from "next/link";
import Image from "next/image";

import style from "../styles/Navbar.module.scss";

function NavLink({ href, path, children }: any) {
  const className = path === href ? "active" : "";
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Navbar({ url }: any) {
  return (
    <div className={style.navbarWrapper}>
      <div className={style.navbar}>
        <Link href="/" className={style.logo}>
          <div className={style.logoImg}>
            <Image
              src="/favicon.ico"
              alt={siteinfo.title}
              width={100}
              height={100}
            />
          </div>
          <span className={style.logoText}>{siteinfo.title}</span>
        </Link>

        <button
          id={style.menuButton}
          onClick={() => {
            (
              document.getElementById(style.menuButton) as HTMLInputElement
            ).classList.toggle(style.open);
          }}
          title="Toggle navigation menu"
        >
          <span className={style.labelOpen}>&#x2261;</span>
          <span className={style.labelClose}>&times;</span>
        </button>

        <div className={style.spacer}></div>

        <nav>
          <NavLink href="/" path={url}>
            Home
          </NavLink>

          <NavLink href="/work/" path={url}>
            Work
          </NavLink>

          <NavLink href="/blog/" path={url}>
            Blog
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
