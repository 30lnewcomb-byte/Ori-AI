import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, description, children }: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro" data-reveal>
      <div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
      {children ? <div className="intro-actions">{children}</div> : null}
    </section>
  );
}
