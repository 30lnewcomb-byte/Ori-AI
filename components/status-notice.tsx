import { getLiveStatus, type LiveStatusSnapshot } from "@/lib/status";
import { StatusNoticeClient } from "@/components/status-notice-client";

export async function StatusNotice() {
  const live = (await getLiveStatus()) as LiveStatusSnapshot;
  const affected = live.components.filter((component) =>
    component.state !== "operational"
  );
  if (affected.length === 0) return null;

  const critical = affected.some((component) =>
    component.state === "major_outage" || component.state === "partial_outage"
  );
  const heading = critical
    ? "Service disruption reported"
    : affected.some((component) => component.state === "maintenance")
      ? "Service maintenance notice"
      : "Service status update";

  return <StatusNoticeClient affected={affected} heading={heading} critical={critical} />;
}
