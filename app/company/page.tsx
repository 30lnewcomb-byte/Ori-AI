import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About Ori",
  description:
    "The story behind Ori: one question, a collection of experiments, and an ecosystem that grew over time.",
};

export default function CompanyPage() {
  return (
    <main id="main" className="subpage">
      <div className="section-wrap">
        <PageIntro
          eyebrow="ABOUT ORI"
          title="An idea that kept growing."
          description="Ori began with a simple question: what AI should I use? It grew from that question into a personal project made up of experiments, tools, and projects with different purposes."
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
              That question became the thread running through Ori. It was not
              the beginning of a carefully planned company or a ready-made
              product ecosystem. It was an idea worth exploring, surrounded by
              other ideas and projects that could help it take shape.
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
            <h2 id="story-growth-title">Not one big launch. A lot of experiments.</h2>
          </div>
          <div className="story-growth-copy">
            <p>
              The early projects were mostly designed to run locally. That
              made room to experiment with software, models, and ideas close
              to the systems they were built for. Some experiments became
              useful pieces of a larger project; others opened up entirely new
              directions.
            </p>
            <p>
              As the work developed, those directions began to need their own
              tools and responsibilities. Some stayed focused on local
              computing, while others grew into platforms and hosted services.
              The ecosystem took shape gradually, as a result of the work—not
              because every part had been mapped out at the beginning.
            </p>
          </div>

          <div className="story-steps">
            <article>
              <span>01</span>
              <div>
                <h3>Start with a question.</h3>
                <p>
                  Explore what already exists, then consider what could be
                  built instead.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Experiment locally.</h3>
                <p>
                  Build and test ideas in hands-on projects, learning from
                  what works and what needs to change.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Give each idea its purpose.</h3>
                <p>
                  Let separate projects develop around the problems and
                  capabilities they are meant to address.
                </p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Grow the ecosystem.</h3>
                <p>
                  Connect the work where it makes sense, without forcing every
                  project to become the same thing.
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
              Ori is a collection of related projects, not one product wearing
              several names. Each has a role of its own, while contributing to
              the wider idea.
            </p>
          </div>

          <div className="ecosystem-list">
            <article>
              <span>01</span>
              <div>
                <h3>Ori Platform</h3>
                <p>
                  The platform layer for working with Ori's intelligence and
                  connecting its capabilities to the wider project.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Ori Mechanic</h3>
                <p>
                  A separate technical system being developed for engineering
                  work and complex workflows, with its own tools and
                  safeguards.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Ori Developer Platform</h3>
                <p>
                  A dedicated workspace for developers working with Ori's
                  tools, models, and platform capabilities.
                </p>
              </div>
            </article>
          </div>
          <p className="ecosystem-footnote">
            The projects can evolve independently. Their connection is the
            original curiosity that brought them into existence.
          </p>
        </section>

        <section className="story-values" aria-labelledby="values-title">
          <div className="story-section-heading">
            <span className="section-kicker">WHAT GUIDES THE WORK</span>
            <h2 id="values-title">Built around curiosity.</h2>
          </div>
          <div className="story-values-grid">
            <article>
              <span>01 / EXPLORE</span>
              <h3>Stay curious.</h3>
              <p>Ask questions, try ideas, and keep learning how things work.</p>
            </article>
            <article>
              <span>02 / BE HONEST</span>
              <h3>Be precise.</h3>
              <p>
                Test the details, explain limitations, and don't claim more
                than the work can support.
              </p>
            </article>
            <article>
              <span>03 / BUILD</span>
              <h3>Build with care.</h3>
              <p>
                Make thoughtful choices about the people, tools, and systems
                involved.
              </p>
            </article>
          </div>
        </section>

        <section className="personal-project" aria-labelledby="personal-project-title">
          <div className="personal-project-copy">
            <span className="section-kicker">PERSONAL BY DESIGN</span>
            <h2 id="personal-project-title">Technology should be approachable.</h2>
            <p>
              Ori is a personal project, and that shapes how it is shared.
              People can use Ori without being asked to pay for a subscription
              or an access plan. The point is to make the work available and
              give people room to explore what it can do.
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
          <h2 id="about-ending-title">One idea became many projects. Those projects became Ori.</h2>
          <p>
            Ori is still being built. The technology will change, the projects
            will develop, and new ideas may find their place. What stays the
            same is the reason to keep building: curiosity, experimentation,
            and the possibility of making something useful.
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
