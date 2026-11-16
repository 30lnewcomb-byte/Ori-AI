import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the separate projects that make up the Ori ecosystem."
};

const items = [
  { name: "Ori Platform", category: "AI platform", state: "Active project", description: "The main Ori experience and the platform work connecting its AI capabilities to an application.", href: "https://ori-platform.vercel.app", action: "Open platform" },
  { name: "Ori Developer Platform", category: "Developer workspace", state: "In development", description: "A separate workspace for projects, models, tools, documentation, and platform configuration. Its capabilities continue to develop.", href: "https://ori-developer-platform.vercel.app", action: "Visit developer platform" },
  { name: "Ori Mechanic", category: "Independent engineering", state: "In development", description: "An independent engineering project exploring controlled technical workflows, isolated capabilities, and explicit permissions.", href: "https://github.com/30lnewcomb-byte/ori-mechanic", action: "View project on GitHub" }
];

export default function ProductsPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="THE ORI ECOSYSTEM" title="Projects with separate responsibilities." description="Ori includes an AI workspace, a developer workspace, and independent engineering work. The projects share an origin, but each is developed separately." />
        <div className="catalog-list">
          {items.map((item, i) => (
            <article className="catalog-item" key={item.name} data-reveal data-delay={i * 70}>
              <div className="catalog-index">0{i + 1}</div>
              <div className="catalog-main">
                <div className="catalog-meta"><span>{item.category}</span><span className="catalog-state">{item.state}</span></div>
                <h2>{item.name}</h2><p>{item.description}</p>
                <a className="text-link" href={item.href} target="_blank" rel="noreferrer">{item.action} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="note-panel" data-reveal><span className="note-symbol">i</span><p>These projects are not all at the same stage. Active work, public destinations, and features still being developed are described separately.</p></div>
      </div>
    </main>
  );
}
