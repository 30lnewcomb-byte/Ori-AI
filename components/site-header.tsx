"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
  { href: "/research", label: "Research" },
  { href: "/developers", label: "Developers" },
  { href: "/company", label: "Company" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Ori home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>ori</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <Link className="nav-cta" href="/products" onClick={() => setOpen(false)}>
            Explore Ori <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
