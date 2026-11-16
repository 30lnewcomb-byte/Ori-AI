# Ori — official website

The public website for Ori's projects, technical overview, research notes, updates, and service status. This repository is intentionally separate from Ori Platform, Ori Developer Platform, and Ori Mechanic.

## Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS (no UI framework)
- Designed for Vercel deployment

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Routes

- `/` — company homepage
- `/products` — product directory
- `/technology` — engineering and technology overview
- `/research` — research and experiments
- `/developers` — developer platform and documentation links
- `/company` — the history and purpose of Ori\n- `/status` — live checks for Ori services and hosting providers
- `/updates` — announcements and release notes

## Deployment

Create a separate Vercel project for this repository and use the default Next.js build settings. No environment variables are required by the current site. The production domain and canonical metadata URL should be updated once the final domain is selected.

Do not connect this repository to the deployment projects for Ori Platform or Ori Developer Platform. It is an independent public website.

## Content integrity

- Do not publish fabricated research, release notes, customer stories, testimonials, metrics, or product capabilities.
- Clearly distinguish working products from features that are still being developed.
- Update product links only when the destination is real and verified.
- Keep this site focused on Ori's projects and their current status; each application remains in its own repository and deployment.


## Status publishing

The public status page reads `data/status.json` and runs point-in-time checks when visitors open or refresh the page. Do not label a service operational unless a check confirms that result. Unmonitored services must remain clearly labeled.
