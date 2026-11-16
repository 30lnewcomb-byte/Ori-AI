import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Research & experiments",
  description: "Engineering experiments and research notes from Ori."
};

export default function ResearchPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="RESEARCH & EXPERIMENTS" title="Experiments and engineering notes." description="This page will document Ori experiments, the methods used, and the results." />
        <section className="research-empty" data-reveal>
          <div className="research-mark" aria-hidden="true"><span/><span/><span/><span/></div>
          <div><span className="feature-index">PUBLICATION STATUS</span><h2>No research reports published yet.</h2><p>Reports will appear here after an experiment has been run, documented, and reviewed. Each entry will include enough context to understand what was tested and what the results show.</p></div>
        </section>
        
      </div>
    </main>
  );
}
