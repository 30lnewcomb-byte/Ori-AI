import Link from "next/link";

const projects = [
  { number: "01", name: "Ori Platform", category: "AI platform", status: "Active project", description: "The user-facing chat workspace, connected to the separate Ori Intelligence runtime through a server-side API.", href: "https://ori-platform.vercel.app", action: "Open Ori Platform" },
  { number: "02", name: "Ori Developer Platform", category: "Developer workspace", status: "In development", description: "A separate workspace for developer project records and documentation. API access and model administration are still in development.", href: "https://ori-developer-platform.vercel.app", action: "Visit developer platform" },
  { number: "03", name: "Ori Mechanic", category: "Independent engineering", status: "In development", description: "An independent engineering project in development, focused on isolated tasks and explicit permissions.", href: "https://github.com/30lnewcomb-byte/ori-mechanic", action: "View project on GitHub" }
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero hero-editorial">
        <div className="hero-content" data-reveal>
          <div className="eyebrow"><span className="eyebrow-dot" /> PERSONAL TECHNOLOGY PROJECT</div>
          <h1>What if I built my <span>own AI?</span></h1>
          <p className="hero-copy">I began Ori while trying to decide which AI to use. That question turned into an experiment in building one myself. The work now includes a chat workspace, a separate AI runtime, a developer workspace, and an independent engineering project.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">Explore the projects <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/company">Read the story</Link>
          </div>
          <div className="hero-footnote">Independent projects with separate responsibilities and development stages.</div>
        </div>
        <aside className="architecture-card" aria-labelledby="architecture-title" data-reveal data-delay="120">
          <div className="architecture-card-header">
            <div>
              <span className="architecture-kicker">ORI SYSTEM MAP</span>
              <h2 id="architecture-title">Related projects. Separate systems.</h2>
            </div>
            <span className="architecture-card-index">01—04</span>
          </div>

          <div className="architecture-core">
            <article className="architecture-node architecture-node-primary">
              <span className="architecture-node-mark" aria-hidden="true">O</span>
              <div className="architecture-node-copy">
                <strong>Ori Platform</strong>
                <small>User-facing AI workspace</small>
              </div>
              <span className="architecture-node-tag">WORKSPACE</span>
            </article>

            <div className="architecture-connection">
              <span className="architecture-connection-line" aria-hidden="true" />
              <span>AUTHENTICATED SERVER API</span>
              <span className="architecture-connection-line" aria-hidden="true" />
            </div>

            <article className="architecture-node architecture-node-runtime">
              <span className="architecture-node-mark runtime" aria-hidden="true">01</span>
              <div className="architecture-node-copy">
                <strong>Ori Intelligence</strong>
                <small>Separate TensorFlow / Keras runtime</small>
              </div>
              <span className="architecture-node-tag">RUNTIME</span>
            </article>
          </div>

          <div className="architecture-secondary-heading">
            <span>INDEPENDENT PROJECTS</span>
            <span>02—03</span>
          </div>
          <div className="architecture-secondary-grid">
            <article className="architecture-secondary-card">
              <span className="architecture-secondary-mark" aria-hidden="true">↗</span>
              <strong>Ori Developer Platform</strong>
              <small>Developer workspace</small>
            </article>
            <article className="architecture-secondary-card">
              <span className="architecture-secondary-mark" aria-hidden="true">◇</span>
              <strong>Ori Mechanic</strong>
              <small>Independent engineering project</small>
            </article>
          </div>

          <p className="architecture-note">
            Ori Platform calls its intelligence runtime through a server-side API. The other projects have their own codebases and responsibilities.
          </p>
        </aside>
      </section>

      <section className="intro-band section-wrap" data-reveal>
        <p className="section-kicker">HOW THE PROJECTS FIT</p>
        <div className="intro-band-content">
          <h2>What each project does.</h2>
          <p>Ori Platform is the user-facing AI workspace and connects to Ori Intelligence through a server-side API. Developer Platform provides developer project records and documentation. Ori Mechanic is an independent engineering project.</p>
        </div>
      </section>

      <section className="products-section section-wrap" data-reveal>
        <div className="section-heading">
          <div><p className="section-kicker">THE PROJECTS</p><h2>Three projects, separate roles.</h2></div>
          <Link className="text-link" href="/products">Explore all projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="product-list">
          {projects.map((project) => (
            <article className="product-row" key={project.number}>
              <span className="product-number">{project.number}</span>
              <div className="product-copy">
                <span className="product-type">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="product-row-action">
                <span className={project.status === "Active project" ? "project-status status-active" : "project-status"}>{project.status}</span>
                <a className="row-link" href={project.href} target="_blank" rel="noreferrer">{project.action} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section">
        <div className="section-wrap principles-editorial">
          <div className="principles-heading" data-reveal>
            <p className="section-kicker">HOW THE WORK IS BUILT</p>
            <h2>Clear boundaries. Verified status.</h2>
            <p>Each project lists its current capabilities separately from work that is still being built.</p>
          </div>
          <div className="principle-list" data-reveal data-delay="100">
            <article><span>01</span><div><h3>Solve the actual problem.</h3><p>Choose tools only after the problem and constraints are clear.</p></div></article>
            <article><span>02</span><div><h3>Keep system boundaries clear.</h3><p>Keep applications, model runtime, and engineering tools separate when they have different responsibilities.</p></div></article>
            <article><span>03</span><div><h3>Report implementation status.</h3><p>Show what works, what needs setup, and what is still planned.</p></div></article>
          </div>
        </div>
      </section>

      <section className="closing-cta section-wrap" data-reveal>
        <div><p className="section-kicker">CURRENT PROJECTS</p><h2>Explore the work.</h2><p>Review each project's current role and status, or inspect its source on GitHub.</p></div>
        <div className="closing-actions">
          <Link className="button button-primary" href="/developers">Developer resources <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Ori on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
