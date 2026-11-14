import Link from "next/link";

const products = [
  { number: "01", name: "Ori Platform", type: "AI workspace", description: "The place to interact with Ori and the intelligence behind it.", href: "https://ori-platform.vercel.app", link: "Open Ori Platform" },
  { number: "02", name: "Ori Developer Platform", type: "Developer tools", description: "A dedicated workspace for projects and the tools being built for developers.", href: "https://ori-developer-platform.vercel.app", link: "Visit developer platform" },
  { number: "03", name: "Ori Mechanic", type: "Engineering project", description: "An independent project exploring safer, more reliable ways for software to carry out technical work.", href: "https://github.com/30lnewcomb-byte/ori-mechanic", link: "Explore the repository" }
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> INTRODUCING ORI</div>
          <h1>Technology should make the complicated <span>feel possible.</span></h1>
          <p className="hero-copy">Ori is an independent technology project exploring useful AI, thoughtful software, and better tools for people who build.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">Explore what we're building <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/company">Get to know Ori</Link>
          </div>
          <div className="hero-footnote"><span className="status-line" /> Built with curiosity. Improved through real work.</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="core"><span>o</span></div>
          <div className="orbit-label label-top">INTELLIGENCE</div>
          <div className="orbit-label label-right">TOOLS</div>
          <div className="orbit-label label-bottom">ENGINEERING</div>
          <div className="art-cross cross-one" /><div className="art-cross cross-two" />
        </div>
      </section>

      <section className="intro-band section-wrap">
        <p className="section-kicker">A connected set of ideas</p>
        <div className="intro-band-content">
          <h2>One direction.<br /><span>Different ways to build.</span></h2>
          <p>Ori brings together AI experiences, developer tools, and independent engineering projects. Each has a distinct job. Together, they form a growing body of work.</p>
        </div>
      </section>

      <section className="products-section section-wrap">
        <div className="section-heading">
          <div><p className="section-kicker">THE ORI ECOSYSTEM</p><h2>Explore what we're building.</h2></div>
          <Link className="text-link" href="/products">All products <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <article className="product-row" key={product.number}>
              <span className="product-number">{product.number}</span>
              <div className="product-copy"><span className="product-type">{product.type}</span><h3>{product.name}</h3><p>{product.description}</p></div>
              <a className="row-link" href={product.href} target="_blank" rel="noreferrer" aria-label={product.link}>{product.link} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section">
        <div className="section-wrap principles-inner">
          <div><p className="section-kicker">HOW WE APPROACH THE WORK</p><h2>Build carefully.<br /><span>Make it matter.</span></h2></div>
          <div className="principle-grid">
            <article><span>01 / CLARITY</span><h3>Useful over impressive.</h3><p>Technology should solve a real problem. Complexity is not a feature by itself.</p></article>
            <article><span>02 / HONESTY</span><h3>Show what is real.</h3><p>Be clear about what works today, what is experimental, and what still needs work.</p></article>
            <article><span>03 / CRAFT</span><h3>Details are the product.</h3><p>Good engineering is thoughtful, reliable, understandable, and improved over time.</p></article>
          </div>
        </div>
      </section>

      <section className="closing-cta section-wrap">
        <div><p className="section-kicker">KEEP EXPLORING</p><h2>There is more to build.</h2><p>Follow the projects, explore the technology, or take a look at the developer experience.</p></div>
        <Link className="button button-primary" href="/developers">Explore the developer platform <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
