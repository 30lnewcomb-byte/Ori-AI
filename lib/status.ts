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
  monitorUrl?: string;
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
      (component.url === undefined || typeof component.url === "string") &&
      (component.monitorUrl === undefined || typeof component.monitorUrl === "string")
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

export async function checkStatusComponent(
  component: StatusComponent,
  checkedAt: string
): Promise<LiveStatusComponent> {
  if (!component.monitorUrl) {
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
    const response = await fetch(component.monitorUrl, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
      headers: component.id === "ori-mechanic"
        ? { Accept: "application/vnd.github+json", "User-Agent": "Ori-Status-Monitor" }
        : { Accept: "application/json,text/html,*/*" }
    });
    const responseTimeMs = Date.now() - started;
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
  const degradedCount = components.filter((component) => component.state !== "operational").length;
  const overallState: OverallState = degradedCount === 0 ? "operational" : "degraded";
  const message = degradedCount === 0
    ? "All monitored endpoints responded successfully during the latest check."
    : `${degradedCount} of ${components.length} monitored endpoints did not respond successfully. This may include a cold start or a temporary network issue; check again before treating it as an outage.`;

  return { components, checkedAt, overallState, message };
}
