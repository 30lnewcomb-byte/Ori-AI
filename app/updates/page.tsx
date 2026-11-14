import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Updates", description: "Updates from the Ori project." };

export default function UpdatesPage() {
  return <main id="main" className="subpage"><div className="section-wrap">
    <PageIntro eyebrow="WHAT'S HAPPENING" title="Progress, when there's something to share." description="This page will collect meaningful Ori project announcements and release notes. It will only list updates that have actually happened." />
    <section className="research-empty updates-empty"><div className="updates-icon" aria-hidden="true">↗</div><div><span className="feature-index">NO ANNOUNCEMENTS PUBLISHED</span><h2>Nothing to announce just yet.</h2><p>Rather than manufacture a news feed, we'll publish updates here when a project reaches a meaningful milestone.</p><a className="text-link" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Follow development on GitHub <span aria-hidden="true">↗</span></a></div></section>
  </div></main>;
}
