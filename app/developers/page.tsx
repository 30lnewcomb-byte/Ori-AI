import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Developers", description: "Find the Ori developer workspace and documentation." };

export default function DevelopersPage() {
  return <main id="main" className="subpage"><div className="section-wrap">
    <PageIntro eyebrow="FOR PEOPLE WHO BUILD" title="Build alongside Ori." description="The Ori developer experience is being developed as a separate workspace, with its own documentation and a clear boundary from the user-facing Ori Platform." />
    <div className="developer-panel">
      <div className="developer-panel-top"><span className="window-dots"><i/><i/><i/></span><span>ORI / DEVELOPER</span><span className="panel-version">WORKSPACE</span></div>
      <div className="developer-panel-body"><div className="terminal-kicker">A PLACE TO BUILD</div><h2>Projects. Models. Tools.</h2><p>Explore the developer workspace and its public documentation. Some platform capabilities are still under active development; the docs describe what is currently implemented.</p><div className="hero-actions"><a className="button button-primary" href="https://ori-developer-platform.vercel.app" target="_blank" rel="noreferrer">Open developer platform <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="https://ori-developer-platform.vercel.app/docs" target="_blank" rel="noreferrer">Read documentation <span aria-hidden="true">↗</span></a></div></div>
    </div>
    <div className="developer-footnote"><span className="eyebrow-dot" /><p>The developer platform is a separate product from Ori Platform. Its features and APIs should be treated according to the current documentation.</p></div>
  </div></main>;
}
