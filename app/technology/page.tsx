import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Technology",
  description: "Explore the engineering ideas behind Ori's AI systems, local experiments, and software projects."
};

const areas = [
  { number: "01", label: "INTELLIGENCE", title: "AI systems and model work", description: "Ori explores model integration, inference, and the software needed to make AI useful inside real applications. Different models and approaches are evaluated for different roles.", detail: "MODELS / INFERENCE / INTEGRATION" },
  { number: "02", label: "EXPERIMENTATION", title: "A local-first beginning", description: "Many of the early projects were designed to run locally. That made it possible to experiment close to the software and hardware involved, without making every idea depend on a hosted service.", detail: "LOCAL DEVELOPMENT / PROTOTYPES" },
  { number: "03", label: "INFRASTRUCTURE", title: "Separate systems with clear jobs", description: "As the work grew, some projects developed into their own platforms and services. Keeping responsibilities separate makes each project easier to understand and evolve.", detail: "PLATFORMS / DEPLOYMENTS / SERVICES" },
  { number: "04", label: "ENGINEERING", title: "Tools with boundaries", description: "Projects such as Ori Mechanic explore how software can support technical work while keeping permissions, isolation, and human oversight part of the design.", detail: "PERMISSIONS / ISOLATION / CONTROL" }
];

export default function TechnologyPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="UNDER THE HOOD" title="Built around the job, not a single stack." description="Ori's technology has grown alongside its projects—from local experiments to AI systems, developer tools, and hosted infrastructure. The approach depends on what each project needs." />
        <div className="technology-list">
          {areas.map((area) => (
            <article className="technology-row" key={area.number} data-reveal>
              <span className="technology-index">{area.number}</span>
              <div className="technology-copy"><span className="feature-index">{area.label}</span><h2>{area.title}</h2><p>{area.description}</p></div>
              <span className="technology-detail">{area.detail}</span>
            </article>
          ))}
        </div>
        <div className="page-next" data-reveal>
          <div><span className="section-kicker">GO DEEPER</span><h2>See the projects behind the ideas.</h2></div>
          <Link className="button button-secondary" href="/products">Explore projects <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  );
}
