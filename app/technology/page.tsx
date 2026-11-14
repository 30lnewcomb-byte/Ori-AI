import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Technology", description: "Learn about the engineering ideas and systems behind Ori." };

export default function TechnologyPage() {
  return <main id="main" className="subpage"><div className="section-wrap">
    <PageIntro eyebrow="UNDER THE HOOD" title="Technology is a practice, not a slogan." description="Ori's technology work spans AI systems, software infrastructure, and the engineering that connects them. We focus on understanding how each piece works—and how to make it dependable." />
    <div className="feature-grid">
      <article className="feature-card feature-card-wide"><span className="feature-index">01 / INTELLIGENCE</span><div className="feature-graphic graphic-nodes" aria-hidden="true"><i/><i/><i/><i/><i/><b/></div><h2>AI systems</h2><p>Ori's AI work explores model integration, inference, and the software needed to make intelligence useful in real applications. The underlying systems are evolving.</p><Link className="text-link" href="/products">Explore Ori Platform <span aria-hidden="true">↗</span></Link></article>
      <article className="feature-card"><span className="feature-index">02 / INFRASTRUCTURE</span><div className="feature-graphic graphic-stack" aria-hidden="true"><i/><i/><i/></div><h2>Practical infrastructure</h2><p>Separating responsibilities, keeping deployments understandable, and avoiding unnecessary complexity.</p></article>
      <article className="feature-card"><span className="feature-index">03 / ENGINEERING</span><div className="feature-graphic graphic-grid" aria-hidden="true"><i/><i/><i/><i/></div><h2>Tools that do real work</h2><p>Building clear interfaces and controlled systems that are easier to inspect, maintain, and improve.</p></article>
    </div>
    <div className="page-next"><div><span className="section-kicker">GO DEEPER</span><h2>See the projects behind the ideas.</h2></div><Link className="button button-secondary" href="/products">View Ori projects <span aria-hidden="true">↗</span></Link></div>
  </div></main>;
}
