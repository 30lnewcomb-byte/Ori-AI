import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "About Ori", description: "Learn about Ori and the principles behind the project." };

export default function CompanyPage() {
  return <main id="main" className="subpage"><div className="section-wrap">
    <PageIntro eyebrow="ABOUT ORI" title="A small project with a big curiosity." description="Ori is an independent technology project exploring how AI and software can become more useful, understandable, and thoughtfully engineered." />
    <section className="company-statement"><span className="section-kicker">WHY ORI EXISTS</span><blockquote>Make technology that helps people move from an idea to something real.</blockquote><p>That means building, testing, learning, and being honest about the work along the way. Ori is growing one project at a time—not claiming to be something it is not.</p></section>
    <div className="values-grid">
      <article><span>01</span><h2>Stay curious.</h2><p>Ask better questions. Explore how things work. Keep learning.</p></article>
      <article><span>02</span><h2>Be precise.</h2><p>Make clear claims, test the details, and explain limitations.</p></article>
      <article><span>03</span><h2>Build with care.</h2><p>Respect the people who use the work and the systems it depends on.</p></article>
    </div>
    <div className="company-links"><div><span className="section-kicker">FOLLOW THE WORK</span><h2>Ori is built in the open.</h2></div><a className="button button-secondary" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Visit GitHub <span aria-hidden="true">↗</span></a></div>
  </div></main>;
}
