"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/products", label: "Projects" },
  { href: "/technology", label: "Technology" },
  { href: "/research", label: "Research" },
  { href: "/developers", label: "Developers" },
  { href: "/company", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Ori home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><span /></span><span>ori</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link href={link.href} key={link.href} aria-current={active ? "page" : undefined} className={active ? "nav-link is-active" : "nav-link"} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            );
          })}
          <a className="nav-cta" href="https://ori-platform.vercel.app" target="_blank" rel="noreferrer">Open Ori Platform <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
