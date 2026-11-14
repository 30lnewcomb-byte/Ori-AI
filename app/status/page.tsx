import type { Metadata } from "next";
import { getLiveStatus, status, type ComponentState, type OverallState } from "@/lib/status";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "System status",
  description: "Live endpoint checks and incident updates for Ori projects."
};

const stateLabels: Record<ComponentState | OverallState, string> = {
  operational: "Operational",
  degraded: "Degraded",
  partial_outage: "Partial outage",
  major_outage: "Major outage",
  maintenance: "Maintenance",
  unmonitored: "Not monitored",
  unknown: "Monitoring not connected"
};

function formatDate(value: string | null) {
  if (!value) return "Not yet available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not yet available";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(date) + " UTC";
}

export default async function StatusPage() {
  const live = await getLiveStatus();
  const oriComponents = live.components.filter((component) => !["render-platform", "vercel-platform"].includes(component.id));
  const providerComponents = live.components.filter((component) => ["render-platform", "vercel-platform"].includes(component.id));
  const incidents = [...status.incidents].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <main id="main" className="subpage status-page">
      <div className="section-wrap">
        <section className="page-intro" data-reveal>
          <div className="eyebrow"><span className="eyebrow-dot" /> ORI SERVICE STATUS</div>
          <h1>Know what’s working.</h1>
          <p>Live checks of Ori websites and runtimes, plus Render and Vercel platform health. Provider checks read each platform’s published status feed; each check runs when this page is requested.</p>
        </section>

        <section className="status-overview" aria-labelledby="overall-status-title" aria-live="polite">
          <div className="status-overview-main">
            <span className="section-kicker">LATEST CHECK</span>
            <h2 id="overall-status-title">{stateLabels[live.overallState]}</h2>
            <p>{live.message}</p>
          </div>
          <div className="status-updated">
            <span>LAST CHECKED</span>
            <strong>{formatDate(live.checkedAt)}</strong>
            <a href="/status">Run checks again ↗</a>
          </div>
        </section>

        <section className="status-components" aria-labelledby="components-title">
          <div className="status-section-heading">
            <div><span className="section-kicker">LIVE ENDPOINT CHECKS</span><h2 id="components-title">Ori services</h2></div>
            <span className="status-count">{oriComponents.length} checks</span>
          </div>
          <div className="status-component-list">
            {oriComponents.map((component) => (
              <article className="status-component" key={component.id}>
                <div className="status-component-copy">
                  <h3>{component.name}</h3>
                  <p>{component.description}</p>
                  <small className="status-check-detail">
                    {component.checkMessage}
                    {component.responseTimeMs !== null ? ` · ${component.responseTimeMs} ms` : ""}
                  </small>
                </div>
                <div className="status-component-state">
                  <span className={`status-indicator status-indicator-${component.state}`} aria-hidden="true" />
                  <span>{stateLabels[component.state]}</span>
                </div>
                {component.url ? <a href={component.url} target="_blank" rel="noreferrer" aria-label={`Open ${component.name}`}>↗</a> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="status-components status-provider-components" aria-labelledby="providers-title">
          <div className="status-section-heading">
            <div><span className="section-kicker">HOSTING & INFRASTRUCTURE</span><h2 id="providers-title">Platform providers</h2></div>
            <span className="status-count">{providerComponents.length} provider feeds</span>
          </div>
          <div className="status-component-list">
            {providerComponents.map((component) => (
              <article className="status-component" key={component.id}>
                <div className="status-component-copy">
                  <h3>{component.name}</h3>
                  <p>{component.description}</p>
                  <small className="status-check-detail">
                    {component.checkMessage}
                    {component.responseTimeMs !== null ? ` · ${component.responseTimeMs} ms` : ""}
                  </small>
                </div>
                <div className="status-component-state">
                  <span className={`status-indicator status-indicator-${component.state}`} aria-hidden="true" />
                  <span>{stateLabels[component.state]}</span>
                </div>
                {component.url ? <a href={component.url} target="_blank" rel="noreferrer" aria-label={`Open official ${component.name} status page`}>↗</a> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="status-incidents" aria-labelledby="incidents-title">
          <div className="status-section-heading">
            <div><span className="section-kicker">SERVICE HISTORY</span><h2 id="incidents-title">Incident updates</h2></div>
          </div>
          {incidents.length === 0 ? (
            <div className="status-empty">
              <span className="status-empty-mark" aria-hidden="true">—</span>
              <div><h3>No incidents published</h3><p>When an incident or scheduled maintenance needs to be shared, its updates will appear here.</p></div>
            </div>
          ) : (
            <div className="status-incident-list">
              {incidents.map((incident) => (
                <article className="status-incident" key={incident.id}>
                  <div className="status-incident-heading"><h3>{incident.title}</h3><span>{incident.state.replace("_", " ")}</span></div>
                  <p className="status-incident-meta">Started {formatDate(incident.startedAt)} · Updated {formatDate(incident.updatedAt)}</p>
                  {incident.updates.map((update, index) => (
                    <div className="status-incident-update" key={`${incident.id}-${index}`}>
                      <time dateTime={update.at}>{formatDate(update.at)}</time><p>{update.message}</p>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="status-footnote">Checks run when this page is opened or refreshed; they are not yet continuous background monitoring and no historical uptime is stored. Provider status comes from Render’s and Vercel’s published status feeds. Ori service checks test public endpoints, so a failed endpoint check can be caused by a cold start or network issue and is not automatically a confirmed provider outage. Ori Mechanic’s check verifies repository availability only, not runtime readiness.</p>
      </div>
    </main>
  );
}
