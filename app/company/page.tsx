import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About Ori",
  description:
    "The story of how a personal AI experiment grew into separate software and engineering projects.",
};

export default function CompanyPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro
          eyebrow="ABOUT ORI"
          title="An idea that kept growing."
          description="Ori began when I was deciding which AI to use. I started experimenting with building one myself, and the work grew into several separate projects."
        />

        <section className="company-story" aria-labelledby="company-origin-title">
          <div className="company-story-copy">
            <span className="section-kicker">THE FIRST QUESTION</span>
            <h2 id="company-origin-title">What if I built my own?</h2>
            <p>
              While exploring ideas for other projects, I was trying to work
              out which AI would be the right one to use. Then another
              possibility came up: instead of choosing an existing AI, what if
              I built a custom one?
            </p>
            <p>
              At first, this was a personal experiment—not a company or a planned product suite. I built local tools and model prototypes to explore what was possible. As the work grew, some projects needed their own codebases and responsibilities.
            </p>
          </div>

          <aside className="company-origin-note" aria-label="The question that started Ori">
            <span className="section-kicker">THE IDEA</span>
            <blockquote>What AI should I use?</blockquote>
            <div className="origin-divider" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <blockquote>What if I built a custom AI?</blockquote>
            <p>One question led to a much bigger direction.</p>
          </aside>
        </section>

        <section className="story-section" aria-labelledby="story-growth-title">
          <div className="story-section-heading">
            <span className="section-kicker">HOW IT GREW</span>
            <h2 id="story-growth-title">From local experiments to separate projects.</h2>
          </div>
          <div className="story-growth-copy">
            <p>
              The first projects mostly ran locally. That made it practical to test software and model ideas on the hardware available at the time. The work was hands-on: build something, see where it failed, and adjust it.
            </p>
            <p>
              Later, different needs led to separate applications and services. Ori Platform became the user-facing workspace; Developer Platform holds developer project records and documentation; Ori Mechanic remains an independent engineering project.
            </p>
          </div>

          <div className="story-steps">
            <article>
              <span>01</span>
              <div>
                <h3>Local prototypes</h3>
                <p>
                  Early experiments tested software and model ideas on local machines.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Separate codebases</h3>
                <p>
                  Projects moved into their own repositories as their responsibilities diverged.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Hosted workspaces</h3>
                <p>
                  Ori Platform and Ori Developer Platform became separately deployed web applications.
                </p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Independent engineering</h3>
                <p>
                  Ori Mechanic continues as a separate project with its own development and permission boundaries.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="story-section ecosystem-section" aria-labelledby="ecosystem-title">
          <div className="story-section-heading">
            <span className="section-kicker">THE ORI PROJECTS</span>
            <h2 id="ecosystem-title">Different projects. Different jobs.</h2>
            <p>
              The projects share an origin, but each has its own codebase and responsibility.
            </p>
          </div>

          <div className="ecosystem-list">
            <article>
              <span>01</span>
              <div>
                <h3>Ori Platform</h3>
                <p>
                  The user-facing chat workspace. It connects to Ori Intelligence through a server-side API.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Ori Mechanic</h3>
                <p>
                  An independent project in development for isolated software tasks, explicit permissions, and human review.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Ori Developer Platform</h3>
                <p>
                  A separate workspace for developer project records and public documentation. API access and model administration are still in development.
                </p>
              </div>
            </article>
          </div>
          <p className="ecosystem-footnote">
            The projects can be developed and deployed independently; Ori Platform connects to its own intelligence runtime through a server-side API.
          </p>
        </section>

        <section className="story-values" aria-labelledby="values-title">
          <div className="story-section-heading">
            <span className="section-kicker">WHAT GUIDES THE WORK</span>
            <h2 id="values-title">What shapes the engineering decisions.</h2>
          </div>
          <div className="story-values-grid">
            <article>
              <span>01 / COST</span>
              <h3>Use what is available.</h3>
              <p>Prefer existing hardware, local development, and free services when they meet the requirement.</p>
            </article>
            <article>
              <span>02 / BOUNDARIES</span>
              <h3>Keep responsibilities separate.</h3>
              <p>Give applications, runtimes, and engineering tools clear interfaces and ownership.</p>
            </article>
            <article>
              <span>03 / STATUS</span>
              <h3>Describe what exists.</h3>
              <p>Document current behavior and limitations; do not present planned features as available.</p>
            </article>
          </div>
        </section>

        <section className="personal-project" aria-labelledby="personal-project-title">
          <div className="personal-project-copy">
            <span className="section-kicker">PERSONAL BY DESIGN</span>
            <h2 id="personal-project-title">Keep the basic experience accessible.</h2>
            <p>
              Ori Platform currently does not require a paid subscription to create an account. Hosting and compute still use real resources; the project aims to keep required paid services out of the basic experience and make any necessary costs clear.
            </p>
          </div>
          <aside className="sundae-note">
            <span className="section-kicker">THE SUNDAE IDEA</span>
            <blockquote>
              “Ori is really a personal project that has the toppings of an
              ice cream sundae.”
            </blockquote>
            <p>
              The original idea is still at the centre. The projects, tools,
              and experiments are the toppings that have gathered around it.
            </p>
          </aside>
        </section>

        <section className="about-ending" aria-labelledby="about-ending-title">
          <span className="section-kicker">STILL GROWING</span>
          <h2 id="about-ending-title">The projects are still in development.</h2>
          <p>
            The projects have different release schedules and levels of readiness. Their current roles and availability are listed on the Projects and Status pages. Release notes will appear here when changes are deployed.
          </p>
        </section>

        <div className="company-links">
          <div>
            <span className="section-kicker">FOLLOW THE WORK</span>
            <h2>See what is being built.</h2>
          </div>
          <a
            className="button button-secondary"
            href="https://github.com/30lnewcomb-byte"
            target="_blank"
            rel="noreferrer"
          >
            Visit GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
