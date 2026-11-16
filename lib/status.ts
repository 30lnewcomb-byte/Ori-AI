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

export type LiveStatusSnapshot = {
  components: LiveStatusComponent[];
  checkedAt: string;
  overallState: OverallState;
  message: string;
};

const CHECK_TIMEOUT_MS = 6500;
const RETRY_DELAY_MS = 500;
const SLOW_RESPONSE_MS = 4000;

type EndpointAttempt = {
  response: Response | null;
  error: unknown;
  elapsedMs: number;
  attempts: number;
};

function isTransientStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function isTimeoutError(error: unknown): boolean {
  return error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
}

async function requestEndpoint(url: string, headers: HeadersInit, retryTransient: boolean): Promise<EndpointAttempt> {
  const started = Date.now();
  let lastResponse: Response | null = null;
  let lastError: unknown = null;
  const maxAttempts = retryTransient ? 2 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      lastResponse = await fetch(url, {
        method: "GET",
        cache: "no-store",
        redirect: "follow",
        signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
        headers
      });
      lastError = null;
      if (!retryTransient || !isTransientStatus(lastResponse.status) || attempt === maxAttempts) {
        return { response: lastResponse, error: null, elapsedMs: Date.now() - started, attempts: attempt };
      }
    } catch (error) {
      lastError = error;
      lastResponse = null;
      if (attempt === maxAttempts) {
        return { response: null, error, elapsedMs: Date.now() - started, attempts: attempt };
      }
    }

    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  }

  return { response: lastResponse, error: lastError, elapsedMs: Date.now() - started, attempts: maxAttempts };
}

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
      checkMessage: "Monitoring is not fully configured for this service, so its availability could not be checked."
    };
  }

  const isProvider = component.id === "render-platform" || component.id === "vercel-platform";
  const headers = component.id === "ori-mechanic"
    ? { Accept: "application/vnd.github+json", "User-Agent": "Ori-Status-Monitor" }
    : { Accept: "application/json,text/html,*/*" };
  const result = await requestEndpoint(monitorUrl, headers, !isProvider);
  const { response, error, elapsedMs, attempts } = result;

  if (error) {
    const timeout = isTimeoutError(error);
    return {
      ...component,
      state: "degraded",
      checkedAt,
      responseTimeMs: elapsedMs,
      checkMessage: timeout
        ? attempts > 1
          ? "The service did not respond within the check time limit on either attempt. It may be starting up or temporarily slow; this is not yet a confirmed outage."
          : "The service took too long to respond. It may be starting up or temporarily slow; this is not yet a confirmed outage."
        : attempts > 1
          ? "The monitor could not connect after two attempts. The service may be temporarily unreachable, or there may be a network or DNS issue."
          : "The monitor could not connect to the service. This may be a temporary network or DNS issue."
    };
  }

  if (!response) {
    return {
      ...component,
      state: "degraded",
      checkedAt,
      responseTimeMs: elapsedMs,
      checkMessage: "The monitor did not receive a response, so service availability could not be confirmed."
    };
  }

  if (isProvider && response.ok) {
    try {
      const payload = await response.json() as {
        status?: { indicator?: string; description?: string };
      };
      const indicator = payload.status?.indicator ?? "unknown";
      const description = payload.status?.description ?? "The provider did not publish a status description.";
      const feedBase = monitorUrl.replace(/\\/status\\.json$/, "");
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
        { incidents?: Array<{ name?: string; status?: string; impact?: string }> } | null,
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
      const activeIncidentImpact = (incidentPayload?.incidents ?? [])
        .filter((incident) => incident.status !== "resolved")
        .reduce<"none" | "minor" | "major" | "critical">((highest, incident) => {
          const impact = incident.impact;
          const rank = { none: 0, minor: 1, major: 2, critical: 3 };
          return impact && rank[impact as keyof typeof rank] > rank[highest]
            ? impact as "none" | "minor" | "major" | "critical"
            : highest;
        }, "none");
      const providerState: Exclude<ComponentState, "unmonitored"> =
        indicator === "critical" || indicator === "major" || activeIncidentImpact === "critical" || activeIncidentImpact === "major" ? "major_outage" :
        indicator === "maintenance" || activeMaintenance.length > 0 ? "maintenance" :
        indicator === "minor" || activeIncidentImpact === "minor" ? "degraded" :
        indicator === "none" ? "operational" : "degraded";
      const details = [
        `The provider reports: ${description}.`,
        activeIncidents.length ? `Active incidents: ${activeIncidents.join("; ")}.` : "",
        activeMaintenance.length ? `Active maintenance: ${activeMaintenance.join("; ")}.` : ""
      ].filter(Boolean);
      return {
        ...component,
        state: providerState,
        checkedAt,
        responseTimeMs: elapsedMs,
        checkMessage: details.join(" ")
      };
    } catch {
      return {
        ...component,
        state: "degraded",
        checkedAt,
        responseTimeMs: elapsedMs,
        checkMessage: "The provider's status page responded, but its status information could not be read. The provider's condition is currently unknown."
      };
    }
  }

  if (response.ok) {
    const slow = elapsedMs >= SLOW_RESPONSE_MS;
    return {
      ...component,
      state: slow ? "degraded" : "operational",
      checkedAt,
      responseTimeMs: elapsedMs,
      checkMessage: slow
        ? `The service is reachable, but its response was slower than expected (${(elapsedMs / 1000).toFixed(1)} seconds).`
        : attempts > 1
          ? `The service responded successfully after a retry (HTTP ${response.status}).`
          : `The service responded successfully (HTTP ${response.status}).`
    };
  }

  const statusCode = response.status;
  const message = statusCode === 429
    ? "The service is reachable but is temporarily limiting requests. The monitor will check again on the next refresh."
    : statusCode >= 500
      ? `The service responded, but its server reported a temporary error (HTTP ${statusCode}) after ${attempts} attempt${attempts === 1 ? "" : "s"}. This does not by itself confirm a full outage.`
      : statusCode === 404
        ? "The host responded, but the monitored page was not found (HTTP 404). The site may be online while this address is incorrect or unavailable."
        : statusCode >= 400
          ? `The host responded, but access to the monitored page was refused or invalid (HTTP ${statusCode}). The site may still be reachable to visitors.`
          : `The service returned an unexpected response (HTTP ${statusCode}).`;

  return {
    ...component,
    state: "degraded",
    checkedAt,
    responseTimeMs: elapsedMs,
    checkMessage: message
  };
}

const computeLiveStatus = async () => {
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
    ? "All monitored Ori services and hosting platforms are reporting normal status."
    : `${attention.length} of ${components.length} checks could not confirm normal operation. Open a service below for details; a slow response or one failed request is not automatically a confirmed outage.`;

  return { components, checkedAt, overallState, message };
};

export const getLiveStatus = computeLiveStatus;
