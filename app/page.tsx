import Link from "next/link";

const projects = [
  { number: "01", name: "Ori Platform", category: "AI platform", status: "Active project", description: "The main Ori experience and the intelligence services being developed around it.", href: "https://ori-platform.vercel.app", action: "Open Ori Platform" },
  { number: "02", name: "Ori Developer Platform", category: "Developer workspace", status: "In development", description: "A separate workspace for developers working with Ori tools, models, documentation, and platform settings.", href: "https://ori-developer-platform.vercel.app", action: "Visit developer platform" },
  { number: "03", name: "Ori Mechanic", category: "Independent engineering", status: "In development", description: "A separate engineering project exploring controlled, permission-aware software workflows.", href: "https://github.com/30lnewcomb-byte/ori-mechanic", action: "View project on GitHub" }
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero hero-editorial">
        <div className="hero-content" data-reveal>
          <div className="eyebrow"><span className="eyebrow-dot" /> PERSONAL TECHNOLOGY PROJECT</div>
          <h1>What if I built my <span>own AI?</span></h1>
          <p className="hero-copy">Ori started with a practical question: which AI should I use? That led to another one—could I build my own? The answer became several projects, from an AI workspace to developer tools and independent engineering experiments.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">Explore the projects <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/company">Read the story</Link>
          </div>
          <div className="hero-footnote">A personal technology project. Each project has its own purpose and stage of development.</div>
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
          <h2>One starting point.<br /><span>Several separate projects.</span></h2>
          <p>Ori is not one app split into several names. Ori Platform is the AI workspace; Developer Platform is for developer resources; Ori Mechanic is a separate engineering project. They share an origin, but each has its own code and development path.</p>
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
            <h2>Build it. Test it.<br /><span>Show its real status.</span></h2>
            <p>An idea stays an experiment until it works. Features and systems are described by what is available now and what is still being developed.</p>
          </div>
          <div className="principle-list" data-reveal data-delay="100">
            <article><span>01</span><div><h3>Start with a question.</h3><p>Understand the problem before choosing the technology.</p></div></article>
            <article><span>02</span><div><h3>Build for a reason.</h3><p>Give each project and feature a clear job. Complexity should solve something real.</p></div></article>
            <article><span>03</span><div><h3>Be honest about progress.</h3><p>Separate working features from experiments and future plans.</p></div></article>
          </div>
        </div>
      </section>

      <section className="closing-cta section-wrap" data-reveal>
        <div><p className="section-kicker">CURRENT PROJECTS</p><h2>Explore the work.</h2><p>See what each project does, check its development stage, or follow the code on GitHub.</p></div>
        <div className="closing-actions">
          <Link className="button button-primary" href="/developers">Developer resources <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Ori on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
