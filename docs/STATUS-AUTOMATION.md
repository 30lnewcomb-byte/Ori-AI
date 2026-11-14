# Ori status monitoring and publishing

The public status page is served at `https://ori-ai-tan.vercel.app/status`.

## Built-in checks

The status page performs server-side endpoint checks whenever the page is requested. It does not depend on Ori Mechanic, GitHub commits, or a third-party monitoring vendor.

Current checks:

- Ori-AI website: public homepage response.
- Ori Platform: public application homepage response.
- Ori Intelligence: the production Render runtime's `/health` endpoint.
- Ori VM runtime: the Render-hosted VM service root endpoint.
- Ori Developer Platform: public application homepage response.
- Ori Mechanic: GitHub repository API response. This verifies repository availability only; it does not claim that Mechanic's runtime is ready.
- Render platform: Render's public Statuspage JSON feed. The monitor reads the provider's status indicator and description, not just the HTTP response.
- Vercel platform: Vercel's public Statuspage JSON feed. The monitor reads the provider's status indicator and description, not just the HTTP response.

Each check has a 12-second timeout and uses a no-cache request. Provider feeds map their published indicators to Ori status states: `none` is operational, `maintenance` is maintenance, `minor` is degraded, and `major`/`critical` are major outages. Unknown provider indicators are treated as degraded rather than falsely shown as operational. A successful HTTP response is shown as operational. An unsuccessful response or timeout is shown as a failed check/degraded state. A single failed check is not automatically treated as a confirmed major outage because Render free services can take time to wake from a cold start.

## Monitoring limitations

This is request-triggered monitoring: checks run when someone opens or refreshes the status page. It is not a continuous background monitor, does not run on a fixed schedule, and does not store historical uptime measurements. The page displays the time of the latest check and response time for each endpoint.

A future scheduled monitor can write check history to a persistent store and provide alerts. That should be added only after a durable storage backend is selected. Do not claim continuous uptime coverage until that exists.

## Ori Mechanic integration

Ori Mechanic's future status-management tool should use an authenticated, scoped API rather than Git commits. The API should validate requests, enforce per-component permissions, rate-limit writes, and maintain an audit trail. Incident creation and updates should be filtered by policy before publication. The live endpoint checks remain independent from Mechanic so the status page continues working while Mechanic is under development.

## Data schema

The checked component inventory and incident history are kept in `data/status.json`. Each component has a stable `id`, public `name`, `description`, optional public `url`, and optional `monitorUrl`. Do not put secrets or private service URLs in this file.

Incident records use stable IDs, a title, state (`investigating`, `identified`, `monitoring`, or `resolved`), impact, timestamps, and concise public-safe update messages.

## Publishing and safety rules

- Status data is public. Never include secrets, credentials, internal IP addresses, private logs, personal information, or security-sensitive implementation details.
- Do not invent uptime percentages, response times, incident causes, or resolution estimates.
- Do not create an incident for an unverified alert.
- Keep incident messages factual, brief, and understandable.
- Preserve the existing status schema unless a maintainer approves a versioned migration.
