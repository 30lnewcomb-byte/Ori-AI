# Ori status publishing

This document defines the machine-readable status source for the public page at `/status`.

## Source of truth

- File: `data/status.json`
- Public page: `https://ori-ai-tan.vercel.app/status`
- The page reads this file at build time. A production deployment publishes accepted changes.
- Keep the page presentation separate from status data. Do not hard-code service states into the React page.

## Ori Mechanic integration

Ori Mechanic may prepare status changes by editing `data/status.json` in a dedicated branch and opening a pull request. Do not give an automation direct permission to publish to the production branch by default.

Required workflow:

1. Read current status data and preserve unrelated components and incident history.
2. Verify a state using an actual health check or an explicitly supplied operator update. A failed check should be repeated before reporting an outage.
3. Set `updatedAt` to an ISO 8601 UTC timestamp when changing published data.
4. Validate the complete document against the schema below.
5. Open a pull request with the evidence, check time, affected component IDs, and concise change summary.
6. A human maintainer reviews and merges the change. Only then does the production page update.

Never infer that a service is operational merely because a URL exists or a deployment was once successful. If a component has no reliable monitor, keep its state as `unmonitored`. If the overall state cannot be established, use `unknown`.

## Data schema (version 1)

Top-level fields:

- `schemaVersion`: must be `1`.
- `updatedAt`: ISO 8601 UTC timestamp, or `null` before the first verified update.
- `overall`: `{ "state": OverallState, "message": string }`.
- `components`: array of service components.
- `incidents`: array of incident records, newest updates first on the page.

Component fields:

- `id`: stable lowercase identifier. Do not rename existing IDs.
- `name`: public service name.
- `description`: short factual description.
- `state`: one of `operational`, `degraded`, `partial_outage`, `major_outage`, `maintenance`, `unmonitored`.
- `url`: optional public destination.

Overall state accepts the component states plus `unknown`.

Incident fields:

- `id`: stable unique identifier.
- `title`: concise public title.
- `state`: `investigating`, `identified`, `monitoring`, or `resolved`.
- `impact`: `none`, `minor`, `major`, or `critical`.
- `startedAt` and `updatedAt`: ISO 8601 UTC timestamps.
- `updates`: chronological entries with `at` (ISO 8601 UTC) and `message` (factual, customer-safe summary).

## Publishing and safety rules

- Status data is public. Never include secrets, credentials, internal IP addresses, private logs, personal information, or security-sensitive implementation details.
- Do not invent uptime percentages, response times, maintenance windows, incident causes, or resolution estimates.
- Do not create an incident for an unverified alert.
- Keep incident messages factual, brief, and understandable.
- Preserve the existing status schema unless a maintainer approves a versioned migration.
- A pull request is a proposal, not a published status change.
- Do not add a direct write endpoint to the public website. Any future authenticated automation must use scoped credentials, schema validation, audit logs, rate limits, and human approval before publication.
