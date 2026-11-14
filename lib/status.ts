import rawStatus from "@/data/status.json";

export type ComponentState =
  | "operational"
  | "degraded"
  | "partial_outage"
  | "major_outage"
  | "maintenance"
  | "unmonitored";

export type OverallState = ComponentState | "unknown";

export type StatusComponent = {
  id: string;
  name: string;
  description: string;
  state: ComponentState;
  url?: string;
};

export type StatusIncident = {
  id: string;
  title: string;
  state: "investigating" | "identified" | "monitoring" | "resolved";
  impact: "none" | "minor" | "major" | "critical";
  startedAt: string;
  updatedAt: string;
  updates: Array<{ at: string; message: string }>;
};

export type StatusDocument = {
  schemaVersion: 1;
  updatedAt: string | null;
  overall: { state: OverallState; message: string };
  components: StatusComponent[];
  incidents: StatusIncident[];
};

const allowedStates = new Set<ComponentState>([
  "operational",
  "degraded",
  "partial_outage",
  "major_outage",
  "maintenance",
  "unmonitored"
]);

function isStatusDocument(value: unknown): value is StatusDocument {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  const overall = data.overall as Record<string, unknown> | undefined;
  if (data.schemaVersion !== 1 || !overall || typeof overall.message !== "string") return false;
  if (overall.state !== "unknown" && !allowedStates.has(overall.state as ComponentState)) return false;
  if (!Array.isArray(data.components) || !Array.isArray(data.incidents)) return false;

  return data.components.every((item) => {
    if (!item || typeof item !== "object") return false;
    const component = item as Record<string, unknown>;
    return (
      typeof component.id === "string" &&
      typeof component.name === "string" &&
      typeof component.description === "string" &&
      typeof component.state === "string" &&
      allowedStates.has(component.state as ComponentState) &&
      (component.url === undefined || typeof component.url === "string")
    );
  });
}

if (!isStatusDocument(rawStatus)) {
  throw new Error("Invalid data/status.json. See docs/STATUS-AUTOMATION.md for the schema.");
}

export const status: StatusDocument = rawStatus as StatusDocument;

export type LiveStatusComponent = StatusComponent & {
  state: Exclude<ComponentState, "unmonitored">;
  checkedAt: string;
  responseTimeMs: number | null;
  checkMessage: string;
};

const CHECK_TIMEOUT_MS = 12000;

// Private runtime URLs live only in server-side environment variables.
function getMonitorUrl(component: StatusComponent): string | undefined {
  if (component.id === "ori-intelligence") return process.env.ORI_INTELLIGENCE_HEALTH_URL;
  if (component.id === "ori-vm-runtime") return process.env.ORI_VM_RUNTIME_HEALTH_URL;
  return component.url;
}

export async function checkStatusComponent(
  component: StatusComponent,
  checkedAt: string
): Promise<LiveStatusComponent> {
  const monitorUrl = getMonitorUrl(component);
  if (!monitorUrl) {
    return {
      ...component,
      state: "degraded",
      checkedAt,
      responseTimeMs: null,
      checkMessage: "No monitor endpoint is configured."
    };
  }

  const started = Date.now();
  try {
    const response = await fetch(monitorUrl, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
      headers: component.id === "ori-mechanic"
        ? { Accept: "application/vnd.github+json", "User-Agent": "Ori-Status-Monitor" }
        : { Accept: "application/json,text/html,*/*" }
    });
    const responseTimeMs = Date.now() - started;
    if (response.ok && (component.id === "render-platform" || component.id === "vercel-platform")) {
      const payload = await response.json() as {
        status?: { indicator?: string; description?: string };
        incidents?: Array<{ name?: string; status?: string; impact?: string }>;
        scheduled_maintenances?: Array<{ name?: string; status?: string }>;
      };
      const indicator = payload.status?.indicator ?? "unknown";
      const description = payload.status?.description ?? "Provider did not include a status description.";
      const feedBase = monitorUrl.replace(/\/status\.json$/, "");
      const [incidentResponse, maintenanceResponse] = await Promise.all([
        fetch(`${feedBase}/incidents/unresolved.json`, {
          cache: "no-store",
          signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
          headers: { Accept: "application/json" }
        }).catch(() => null),
        fetch(`${feedBase}/scheduled-maintenances/active.json`, {
          cache: "no-store",
          signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
          headers: { Accept: "application/json" }
        }).catch(() => null)
      ]);
      const [incidentPayload, maintenancePayload] = await Promise.all([
        incidentResponse?.ok ? incidentResponse.json().catch(() => null) : null,
        maintenanceResponse?.ok ? maintenanceResponse.json().catch(() => null) : null
      ]) as [
        { incidents?: Array<{ name?: string; status?: string }> } | null,
        { scheduled_maintenances?: Array<{ name?: string; status?: string }> } | null
      ];
      const activeIncidents = (incidentPayload?.incidents ?? [])
        .filter((incident) => incident.status !== "resolved" && incident.name)
        .slice(0, 2)
        .map((incident) => incident.name as string);
      const activeMaintenance = (maintenancePayload?.scheduled_maintenances ?? [])
        .filter((item) => item.status !== "completed" && item.name)
        .slice(0, 2)
        .map((item) => item.name as string);
      const detailParts = [
        `Provider status: ${description} (indicator: ${indicator}).`,
        activeIncidents.length ? `Active incidents: ${activeIncidents.join("; ")}.` : "",
        activeMaintenance.length ? `Scheduled maintenance: ${activeMaintenance.join("; ")}.` : ""
      ].filter(Boolean);
      const providerState: Exclude<ComponentState, "unmonitored"> =
        indicator === "none" ? "operational" :
        indicator === "maintenance" ? "maintenance" :
        indicator === "minor" ? "degraded" :
        indicator === "major" ? "major_outage" :
        indicator === "critical" ? "major_outage" :
        indicator === "unknown" ? "degraded" : "degraded";

      return {
        ...component,
        state: providerState,
        checkedAt,
        responseTimeMs,
        checkMessage: detailParts.join(" ")
      };
    }
    if (response.ok) {
      return {
        ...component,
        state: "operational",
        checkedAt,
        responseTimeMs,
        checkMessage: `Endpoint responded with HTTP ${response.status}.`
      };
    }
    return {
      ...component,
      state: "degraded",
      checkedAt,
      responseTimeMs,
      checkMessage: `Endpoint returned HTTP ${response.status}.`
    };
  } catch (error) {
    const responseTimeMs = Date.now() - started;
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return {
      ...component,
      state: "degraded",
      checkedAt,
      responseTimeMs,
      checkMessage: timedOut
        ? "The endpoint did not respond before the 12-second check limit."
        : "The endpoint could not be reached from the status monitor."
    };
  }
}

export async function getLiveStatus() {
  const checkedAt = new Date().toISOString();
  const components = await Promise.all(
    status.components.map((component) => checkStatusComponent(component, checkedAt))
  );
  const attention = components.filter((component) => component.state !== "operational");
  const hasMajorOutage = attention.some((component) => component.state === "major_outage");
  const hasPartialOutage = attention.some((component) => component.state === "partial_outage");
  const hasMaintenance = attention.some((component) => component.state === "maintenance");
  const hasDegraded = attention.some((component) => component.state === "degraded");
  const overallState: OverallState = hasMajorOutage ? "major_outage" :
    hasPartialOutage ? "partial_outage" :
    hasDegraded ? "degraded" :
    hasMaintenance ? "maintenance" : "operational";
  const message = attention.length === 0
    ? "All monitored Ori endpoints and provider status feeds report operational."
    : `${attention.length} of ${components.length} monitored checks need attention. Review the individual results below; an endpoint check failure is not automatically a confirmed provider outage.`;

  return { components, checkedAt, overallState, message };
}
