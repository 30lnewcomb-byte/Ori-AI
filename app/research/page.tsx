import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Research & experiments", description: "A transparent home for Ori engineering experiments and future research notes." };

export default function ResearchPage() {
  return <main id="main" className="subpage"><div className="section-wrap">
    <PageIntro eyebrow="LEARNING IN PUBLIC" title="Curiosity deserves careful work." description="Research and experimentation are part of building technology. This is where Ori will share meaningful investigations, engineering notes, and results when they are ready to publish." />
    <section className="research-empty">
      <div className="research-mark" aria-hidden="true"><span/><span/><span/><span/></div>
      <div><span className="feature-index">A NOTE ON THIS SECTION</span><h2>Work in progress, not invented progress.</h2><p>There are no published research papers or formal research reports here yet. Rather than fill this page with made-up breakthroughs, we will add material when there is real work, useful context, and results worth sharing.</p></div>
    </section>
    <div className="research-bottom"><span className="eyebrow-dot" /><p>Good experiments start with a clear question—and report what actually happened.</p></div>
  </div></main>;
}
