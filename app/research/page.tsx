import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Research & experiments",
  description: "A transparent home for Ori's engineering experiments and research notes."
};

export default function ResearchPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="LEARNING IN PUBLIC" title="Curiosity deserves careful work." description="Experimentation has been part of Ori from the beginning. This section is where meaningful investigations, engineering notes, and results can be shared when they are ready." />
        <section className="research-empty" data-reveal>
          <div className="research-mark" aria-hidden="true"><span/><span/><span/><span/></div>
          <div><span className="feature-index">A NOTE ON THIS SECTION</span><h2>Work in progress, not invented progress.</h2><p>There are no published research papers or formal research reports here yet. Rather than fill this page with made-up breakthroughs, material will be added when there is real work, useful context, and results worth sharing.</p></div>
        </section>
        <div className="research-bottom" data-reveal><span className="eyebrow-dot" /><p>Good experiments start with a clear question—and report what actually happened.</p></div>
      </div>
    </main>
  );
}
