import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Products", description: "Explore the products and engineering projects being built under Ori." };

const items = [
  { name: "Ori Platform", category: "AI experience", state: "Product", description: "Ori's user-facing AI workspace. It is the home for conversations and the intelligence services connected to the platform.", href: "https://ori-platform.vercel.app", action: "Open platform" },
  { name: "Ori Developer Platform", category: "Developer experience", state: "In development", description: "A dedicated technical workspace for projects, API access, models, tools, and platform configuration. Some areas are still being built.", href: "https://ori-developer-platform.vercel.app", action: "Visit developer platform" },
  { name: "Ori Mechanic", category: "Engineering project", state: "Open source repository", description: "An independent engineering project focused on safely coordinating technical work through isolated capabilities and explicit permissions.", href: "https://github.com/30lnewcomb-byte/ori-mechanic", action: "View source on GitHub" }
];

export default function ProductsPage() {
  return <main id="main" className="subpage">
    <div className="section-wrap">
      <PageIntro eyebrow="THE ORI ECOSYSTEM" title="Tools for different kinds of work." description="Ori is a collection of connected projects. Each one has a clear purpose, its own experience, and room to grow." />
      <div className="catalog-list">
        {items.map((item, i) => <article className="catalog-item" key={item.name}>
          <div className="catalog-index">0{i + 1}</div>
          <div className="catalog-main"><div className="catalog-meta"><span>{item.category}</span><span className="catalog-state">{item.state}</span></div><h2>{item.name}</h2><p>{item.description}</p><a className="text-link" href={item.href} target="_blank" rel="noreferrer">{item.action} <span aria-hidden="true">↗</span></a></div>
        </article>)}
      </div>
      <div className="note-panel"><span className="note-symbol">i</span><p>Ori is an actively developing independent project. Product availability and capabilities vary; this site distinguishes working destinations from work that is still in progress.</p></div>
    </div>
  </main>;
}
