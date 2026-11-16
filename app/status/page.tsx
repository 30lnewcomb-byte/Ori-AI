import type { Metadata } from "next";
import { getLiveStatus, status, type ComponentState, type OverallState, type StatusComponent, type LiveStatusSnapshot } from "@/lib/status";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "System status",
  description: "Check the availability of Ori websites and services, plus current hosting-provider incidents and maintenance."
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
  const live = (await getLiveStatus()) as LiveStatusSnapshot;
  const oriComponents = live.components.filter((component: StatusComponent) => !["render-platform", "vercel-platform"].includes(component.id));
  const providerComponents = live.components.filter((component: StatusComponent) => ["render-platform", "vercel-platform"].includes(component.id));
  const incidents = [...status.incidents].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <main id="main" className="subpage status-page">
      <div className="section-wrap">
        <section className="page-intro" data-reveal>
          <div className="eyebrow"><span className="eyebrow-dot" /> ORI SERVICE STATUS</div>
          <h1>Ori service status</h1>
          <p>This page checks Ori websites and services separately from Vercel and Render's published status feeds. Each result is a point-in-time check.</p>
        </section>

        <section className="status-overview" aria-labelledby="overall-status-title" aria-live="polite">
          <div className="status-overview-main">
            <span className="section-kicker">CURRENT SERVICE HEALTH</span>
            <h2 id="overall-status-title">{stateLabels[live.overallState]}</h2>
            <p>{live.message}</p>
            <p className="status-explainer">Operational means the check succeeded. Degraded means a service did not respond as expected or a provider reported a minor issue. An outage means a provider has reported a major incident. Maintenance indicates planned or active maintenance.</p>
          </div>
          <div className="status-updated">
            <span>LAST CHECKED</span>
            <strong>{formatDate(live.checkedAt)}</strong>
            <a href="/status">Run checks again ↗</a>
          </div>
        </section>

        <section className="status-components" aria-labelledby="components-title">
          <div className="status-section-heading">
            <div><span className="section-kicker">ORI PRODUCTS & SERVICES</span><h2 id="components-title">Ori services</h2></div>
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
            <div><span className="section-kicker">HOSTING INFRASTRUCTURE</span><h2 id="providers-title">Hosting platforms</h2></div>
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
            <div><span className="section-kicker">RECENT SERVICE NOTICES</span><h2 id="incidents-title">Incidents and maintenance</h2></div>
          </div>
          {incidents.length === 0 ? (
            <div className="status-empty">
              <span className="status-empty-mark" aria-hidden="true">—</span>
              <div><h3>No active or recent incidents</h3><p>New incident or maintenance updates will appear here when they are published.</p></div>
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

        <section className="status-footnote" aria-label="About these status checks"><h2>About these updates</h2><p>Service checks run when this page is loaded or refreshed. They show a point-in-time result, not a continuous uptime history or an uptime percentage. Hosting-platform updates come from the platforms’ own published status feeds.</p><p>A failed service check does not automatically mean the hosting provider is down. A service may be starting up, temporarily unreachable, or experiencing an issue of its own. The Ori Mechanic listing checks whether its public project repository can be reached; it does not yet measure a running Mechanic service.</p></section>
      </div>
    </main>
  );
}
