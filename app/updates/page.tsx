import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Updates", description: "Released changes and project milestones from Ori." };

export default function UpdatesPage() {
  return <main id="main" className="subpage"><div className="section-wrap">
    <PageIntro eyebrow="PROJECT UPDATES" title="Releases and project changes." description="This page lists completed releases and project milestones." />
    <section className="research-empty updates-empty"><div className="updates-icon" aria-hidden="true">↗</div><div><span className="feature-index">NO UPDATES PUBLISHED</span><h2>No public updates yet.</h2><p>Release notes will be added when a change is deployed and ready to use.</p><a className="text-link" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Follow development on GitHub <span aria-hidden="true">↗</span></a></div></section>
  </div></main>;
}
