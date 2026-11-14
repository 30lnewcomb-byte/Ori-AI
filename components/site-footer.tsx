import Link from "next/link";

const groups = [
  { title: "Explore", links: [{ label: "Products", href: "/products" }, { label: "Technology", href: "/technology" }, { label: "Research & experiments", href: "/research" }] },
  { title: "Build", links: [{ label: "Developers", href: "/developers" }, { label: "Developer Platform", href: "https://ori-developer-platform.vercel.app" }, { label: "Documentation", href: "https://ori-developer-platform.vercel.app/docs" }] },
  { title: "Ori", links: [{ label: "About", href: "/company" }, { label: "Updates", href: "/updates" }, { label: "GitHub", href: "https://github.com/30lnewcomb-byte" }] }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span /></span><span>ori</span></Link>
          <p>Thoughtful technology, built to be useful.</p>
        </div>
        {groups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <Link key={link.label} href={link.href}>{link.label}{link.href.startsWith("http") ? <span aria-hidden="true"> ↗</span> : null}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ori</span>
        <span>Independent technology project</span>
        <a className="github-credit" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer" aria-label="Visit Ori on GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.29-2.61 5.23-5.1 5.5.4.35.76 1.02.76 2.06v3.12c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
