import { getLiveStatus } from "@/lib/status";

export async function StatusNotice() {
  const live = await getLiveStatus();
  const affected = live.components.filter((component) => component.state !== "operational");
  if (affected.length === 0) return null;

  const critical = affected.some((component) =>
    component.state === "major_outage" || component.state === "partial_outage"
  );
  const heading = critical
    ? "Service disruption detected"
    : affected.some((component) => component.state === "maintenance")
      ? "Service notice"
      : "Some services need attention";

  return (
    <aside className="status-global-notice" data-severity={critical ? "critical" : "warning"} aria-label="Live service notice" aria-live="polite">
      <div className="status-global-notice-inner">
        <span className="status-global-notice-dot" aria-hidden="true" />
        <div className="status-global-notice-copy">
          <strong>{heading}</strong>
          <p>{affected.length} monitored item{affected.length === 1 ? "" : "s"} currently need attention. Details from the latest checks:</p>
          <ul>
            {affected.map((component) => (
              <li key={component.id}><b>{component.name} — {component.state.replace("_", " ")}</b>: {component.checkMessage}</li>
            ))}
          </ul>
        </div>
        <a href="/status">View system status ↗</a>
      </div>
    </aside>
  );
}
