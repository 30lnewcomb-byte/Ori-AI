import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Technology",
  description: "Explore the engineering ideas behind Ori's AI systems, local experiments, and software projects."
};

const areas = [
  { number: "01", label: "MODEL RUNTIME", title: "A separate AI runtime", description: "Ori Intelligence runs separately from the Ori Platform web app. The platform calls the runtime through a server-side API, keeping model execution and web delivery in separate services.", detail: "TENSORFLOW / KERAS / API" },
  { number: "02", label: "LOCAL DEVELOPMENT", title: "Experiments close to the machine", description: "Many early Ori projects were designed to run locally. That made it possible to test software and model ideas on the systems they were built for, without requiring every experiment to use a hosted service.", detail: "LOCAL TESTING / PROTOTYPES" },
  { number: "03", label: "DEPLOYMENT", title: "Apps and services deploy separately", description: "The public website, user-facing platform, developer workspace, and AI runtime are separate projects. Each can be changed and deployed without bundling every part into one release.", detail: "WEBSITE / APPS / RUNTIME" },
  { number: "04", label: "PERMISSIONED WORKFLOWS", title: "Engineering tools with safeguards", description: "Ori Mechanic is being developed as an independent engineering system. Its design focuses on isolated tasks, explicit permissions, and human review; it is still a work in progress.", detail: "ISOLATION / PERMISSIONS / REVIEW" }
];

export default function TechnologyPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="ENGINEERING APPROACH" title="Separate systems for separate work." description="Ori uses different environments for its website, user-facing platform, AI runtime, and local experiments. Keeping them separate makes each part easier to test, maintain, and deploy." />
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
