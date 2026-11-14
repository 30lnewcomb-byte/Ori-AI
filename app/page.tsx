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
          <h1>An idea that kept <span>growing.</span></h1>
          <p className="hero-copy">Ori began with a question about what AI to use. It became an idea to build something of its own—and grew into a collection of projects with different purposes.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">Explore the projects <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/company">Read the story</Link>
          </div>
          <div className="hero-footnote">A personal project. Built through curiosity and experimentation.</div>
        </div>
        <aside className="hero-index" aria-label="Ori project overview" data-reveal data-delay="120">
          <div className="hero-index-heading"><span>THE ORI PROJECTS</span><span>01—03</span></div>
          {projects.map((project) => (
            <a className="hero-index-row" href={project.href} key={project.number} target="_blank" rel="noreferrer">
              <span className="hero-index-number">{project.number}</span>
              <span className="hero-index-copy"><strong>{project.name}</strong><small>{project.category}</small></span>
              <span className={project.status === "Active project" ? "project-status status-active" : "project-status"}>{project.status}</span>
              <span className="hero-index-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
          <p className="hero-index-note">Each project has its own role. Work in progress is labeled plainly.</p>
        </aside>
      </section>

      <section className="intro-band section-wrap" data-reveal>
        <p className="section-kicker">ONE IDEA, MANY DIRECTIONS</p>
        <div className="intro-band-content">
          <h2>Not one app.<br /><span>A growing ecosystem.</span></h2>
          <p>Ori is a personal technology project made up of related work: AI systems, local experiments, developer tools, and independent engineering projects. They can grow separately without losing the idea that connects them.</p>
        </div>
      </section>

      <section className="products-section section-wrap" data-reveal>
        <div className="section-heading">
          <div><p className="section-kicker">THE PROJECTS</p><h2>Different jobs. Shared origins.</h2></div>
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
            <p className="section-kicker">HOW THE WORK GROWS</p>
            <h2>Let the work<br /><span>earn its place.</span></h2>
            <p>Ori grows through experiments, useful discoveries, and careful improvements—not a promise that every idea is already finished.</p>
          </div>
          <div className="principle-list" data-reveal data-delay="100">
            <article><span>01</span><div><h3>Start with a question.</h3><p>Understand the problem before choosing the technology.</p></div></article>
            <article><span>02</span><div><h3>Build for a reason.</h3><p>Give each project and feature a clear job. Complexity should solve something real.</p></div></article>
            <article><span>03</span><div><h3>Be honest about progress.</h3><p>Separate working features from experiments and future plans.</p></div></article>
          </div>
        </div>
      </section>

      <section className="closing-cta section-wrap" data-reveal>
        <div><p className="section-kicker">FOLLOW THE WORK</p><h2>See what is taking shape.</h2><p>Explore the projects, read about the technology, or follow development on GitHub.</p></div>
        <div className="closing-actions">
          <Link className="button button-primary" href="/developers">Developer resources <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Ori on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
