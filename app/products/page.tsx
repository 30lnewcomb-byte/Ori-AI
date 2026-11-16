import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Projects",
  description: "An overview of Ori Platform, Ori Developer Platform, and Ori Mechanic, including each project's role and current stage."
};

const items = [
  { name: "Ori Platform", category: "AI platform", state: "Active project", description: "The user-facing chat workspace. It connects to the separate Ori Intelligence runtime through a server-side API.", href: "https://ori-platform.vercel.app", action: "Open platform" },
  { name: "Ori Developer Platform", category: "Developer workspace", state: "In development", description: "A workspace for developer project records and documentation. API access and model administration are still in development.", href: "https://ori-developer-platform.vercel.app", action: "Visit developer platform" },
  { name: "Ori Mechanic", category: "Independent engineering", state: "In development", description: "An engineering project in development for isolated tasks and explicit permissions.", href: "https://github.com/30lnewcomb-byte/ori-mechanic", action: "View project on GitHub" }
];

export default function ProductsPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="PROJECT DIRECTORY" title="Three projects, separate responsibilities." description="Ori Platform is the user-facing AI workspace. Developer Platform provides developer project records and documentation. Ori Mechanic is an independent engineering project." />
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
        <div className="note-panel" data-reveal><span className="note-symbol">i</span><p>Ori Intelligence is the separate runtime used by Ori Platform. It has no public-facing application of its own.</p></div>
      </div>
    </main>
  );
}
