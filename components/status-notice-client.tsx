"use client";

import { useEffect, useMemo, useState } from "react";

type NoticeItem = {
  id: string;
  name: string;
  state: string;
  checkMessage: string;
};

type Props = {
  affected: NoticeItem[];
  heading: string;
  critical: boolean;
};

export function StatusNoticeClient({ affected, heading, critical }: Props) {
  const signature = useMemo(
    () => affected.map((item) => [item.id, item.state, item.checkMessage].join(":")).join("|"),
    [affected]
  );
  const storageKey = "ori-status-notice-dismissed:" + signature;
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(storageKey) === "1");
    } catch {
      setDismissed(false);
    }
    setReady(true);
  }, [storageKey]);

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // The notice remains dismissed for this page even if storage is unavailable.
    }
  }

  if (!ready || dismissed || affected.length === 0) return null;

  return (
    <aside className="status-global-notice" data-severity={critical ? "critical" : "warning"} aria-label="Live service notice" aria-live="polite">
      <div className="status-global-notice-inner">
        <span className="status-global-notice-dot" aria-hidden="true" />
        <div className="status-global-notice-copy">
          <strong>{heading}</strong>
          <p>{affected.length} monitored item{affected.length === 1 ? "" : "s"} currently have a reported issue. Details from the latest checks:</p>
          <ul>
            {affected.map((component) => (
              <li key={component.id}><b>{component.name} — {component.state.replace("_", " ")}</b>: {component.checkMessage}</li>
            ))}
          </ul>
        </div>
        <div className="status-global-notice-actions">
          <a href="/status">View system status ↗</a>
          <button type="button" onClick={dismiss} aria-label="Dismiss service notice">Dismiss <span aria-hidden="true">×</span></button>
        </div>
      </div>
    </aside>
  );
}
