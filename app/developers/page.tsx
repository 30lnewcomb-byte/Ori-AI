import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Developers",
  description: "Find the separate Ori developer workspace and its documentation."
};

export default function DevelopersPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro eyebrow="FOR PEOPLE WHO BUILD" title="A separate place to build with Ori." description="The Developer Platform has its own workspace and documentation. It is separate from the Ori chat application." />
        <section className="developer-entry" data-reveal>
          <div className="developer-entry-main">
            <span className="terminal-kicker">ORI / DEVELOPER WORKSPACE</span>
            <h2>Projects. Models. Tools.</h2>
            <p>The workspace currently includes project records and public documentation. API access, model connections, and tool administration are still in development.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://ori-developer-platform.vercel.app" target="_blank" rel="noreferrer">Open developer platform <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href="https://ori-developer-platform.vercel.app/docs" target="_blank" rel="noreferrer">Read documentation <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="developer-entry-index" aria-label="Developer workspace areas">
            <div><span>01</span><strong>Projects</strong><small>Workspace organization</small></div>
            <div><span>02</span><strong>Models and tools</strong><small>Platform capabilities</small></div>
            <div><span>03</span><strong>Documentation</strong><small>Guides and references</small></div>
          </div>
        </section>
        <div className="developer-footnote" data-reveal><span className="eyebrow-dot" /><p>Project storage depends on the Neon database being configured and its migration applied. Other developer areas remain in development or unconnected.</p></div>
      </div>
    </main>
  );
}
