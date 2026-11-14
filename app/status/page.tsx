import type { Metadata } from "next";
import { status, type ComponentState } from "@/lib/status";

export const metadata: Metadata = {
  title: "System status",
  description: "Current service status and incident updates for Ori projects."
};

const stateLabels: Record<ComponentState | "unknown", string> = {
  operational: "Operational",
  degraded: "Degraded performance",
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

export default function StatusPage() {
  const incidents = [...status.incidents].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <main id="main" className="subpage status-page">
      <div className="section-wrap">
        <section className="page-intro" data-reveal>
          <div className="eyebrow"><span className="eyebrow-dot" /> ORI SERVICE STATUS</div>
          <h1>Know what’s working.</h1>
          <p>A clear view of the services and projects that make up Ori. We’ll publish incidents and maintenance updates here when monitoring is connected.</p>
        </section>

        <section className="status-overview" aria-labelledby="overall-status-title">
          <div className="status-overview-main">
            <span className="section-kicker">CURRENT STATUS</span>
            <h2 id="overall-status-title">{stateLabels[status.overall.state]}</h2>
            <p>{status.overall.message}</p>
          </div>
          <div className="status-updated">
            <span>LAST UPDATED</span>
            <strong>{formatDate(status.updatedAt)}</strong>
          </div>
        </section>

        <section className="status-components" aria-labelledby="components-title">
          <div className="status-section-heading">
            <div><span className="section-kicker">SERVICE COMPONENTS</span><h2 id="components-title">Ori services</h2></div>
            <span className="status-count">{status.components.length} components</span>
          </div>
          <div className="status-component-list">
            {status.components.map((component) => (
              <article className="status-component" key={component.id}>
                <div className="status-component-copy">
                  <h3>{component.name}</h3>
                  <p>{component.description}</p>
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

        <p className="status-footnote">Status information is published from Ori’s service-status data. Unmonitored services are not being checked automatically; their availability should not be inferred from this page.</p>
      </div>
    </main>
  );
}
