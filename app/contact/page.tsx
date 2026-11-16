import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for the Ori project.",
};

export default function ContactPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro
          eyebrow="CONTACT"
          title="Get in touch with Ori."
          description="This page is being prepared. An official Ori contact address will be published here once it has been set up."
        />
        <section className="contact-preparation" aria-labelledby="contact-email-title">
          <div className="contact-preparation-copy">
            <span className="section-kicker">EMAIL</span>
            <h2 id="contact-email-title">Official contact address coming soon.</h2>
            <p>The Ori email address has not been published yet. This page will be updated with the official address when it is ready.</p>
          </div>
          <span className="contact-preparation-state">NOT PUBLISHED</span>
        </section>
        <section className="contact-follow" aria-labelledby="contact-follow-title">
          <div><span className="section-kicker">IN THE MEANTIME</span><h2 id="contact-follow-title">Follow the project.</h2><p>Public project code and development updates are available on GitHub.</p></div>
          <a className="button button-secondary" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Visit GitHub <span aria-hidden="true">↗</span></a>
        </section>
        <p className="contact-page-note">No contact address is active on this page yet.</p>
      </div>
    </main>
  );
}
