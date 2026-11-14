import Link from "next/link";

const projects = [
  {
    number: "01",
    name: "Ori Platform",
    category: "AI workspace",
    status: "Available",
    description: "The user-facing Ori experience and the intelligence services connected to it.",
    href: "https://ori-platform.vercel.app",
    action: "Open Ori Platform"
  },
  {
    number: "02",
    name: "Ori Developer Platform",
    category: "Developer tools",
    status: "In development",
    description: "A technical workspace for projects, documentation, and the developer tools taking shape around Ori.",
    href: "https://ori-developer-platform.vercel.app",
    action: "Visit developer platform"
  },
  {
    number: "03",
    name: "Ori Mechanic",
    category: "Open-source engineering",
    status: "In development",
    description: "An independent project exploring controlled, permission-aware software automation.",
    href: "https://github.com/30lnewcomb-byte/ori-mechanic",
    action: "View source on GitHub"
  }
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero hero-editorial">
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> INDEPENDENT TECHNOLOGY</div>
          <h1>Building <span>Ori.</span></h1>
          <p className="hero-copy">An independent technology project bringing together AI systems, developer tools, and practical software.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">Explore the projects <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/company">About Ori</Link>
          </div>
          <div className="hero-footnote">A growing body of work. Built and documented in the open.</div>
        </div>
        <aside className="hero-index" aria-label="Ori project overview">
          <div className="hero-index-heading"><span>PROJECT INDEX</span><span>01—03</span></div>
          {projects.map((project) => (
            <a className="hero-index-row" href={project.href} key={project.number} target="_blank" rel="noreferrer">
              <span className="hero-index-number">{project.number}</span>
              <span className="hero-index-copy"><strong>{project.name}</strong><small>{project.category}</small></span>
              <span className={project.status === "Available" ? "project-status status-available" : "project-status"}>{project.status}</span>
              <span className="hero-index-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
          <p className="hero-index-note">Project status is stated plainly. Work in progress is not presented as a finished product.</p>
        </aside>
      </section>

      <section className="intro-band section-wrap">
        <p className="section-kicker">WHAT IS ORI?</p>
        <div className="intro-band-content">
          <h2>One name.<br /><span>Several distinct projects.</span></h2>
          <p>Ori is not a single app. It is a collection of related projects with separate responsibilities—from an AI workspace to developer infrastructure and independent engineering experiments.</p>
        </div>
      </section>

      <section className="products-section section-wrap">
        <div className="section-heading">
          <div><p className="section-kicker">PROJECTS</p><h2>Explore the work.</h2></div>
          <Link className="text-link" href="/products">Project directory <span aria-hidden="true">↗</span></Link>
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
                <span className={project.status === "Available" ? "project-status status-available" : "project-status"}>{project.status}</span>
                <a className="row-link" href={project.href} target="_blank" rel="noreferrer">{project.action} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section">
        <div className="section-wrap principles-editorial">
          <div className="principles-heading">
            <p className="section-kicker">WORKING PRINCIPLES</p>
            <h2>Make the work<br /><span>earn its place.</span></h2>
            <p>Good technology is more than a convincing demo. It should be understandable, useful, and honest about its limits.</p>
          </div>
          <div className="principle-list">
            <article><span>01</span><div><h3>Build for a reason.</h3><p>Every feature should have a clear job. Complexity needs to solve a real problem.</p></div></article>
            <article><span>02</span><div><h3>Be precise about progress.</h3><p>Working features, experiments, and future plans should never be blurred together.</p></div></article>
            <article><span>03</span><div><h3>Leave things better.</h3><p>Prefer maintainable systems, careful changes, and improvements that can be verified.</p></div></article>
          </div>
        </div>
      </section>

      <section className="closing-cta section-wrap">
        <div><p className="section-kicker">FOLLOW THE WORK</p><h2>See how Ori is built.</h2><p>Explore the projects and their source code, or read the developer documentation.</p></div>
        <div className="closing-actions">
          <Link className="button button-primary" href="/developers">Developer resources <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="https://github.com/30lnewcomb-byte" target="_blank" rel="noreferrer">Ori on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
