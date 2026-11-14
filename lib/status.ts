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
