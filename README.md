# SUR Technology website

Ground-up rebuild of [surtechno.com](https://surtechno.com) for enterprise IT teams buying and selling used data center hardware. Designed and built by RADCAT.

The homepage is a lead magnet. Its centerpiece is **Value Check**, an instant recovery estimate for retired hardware that gates an itemized Market Value Report behind a work email. The same panel flips to a parts request form for buyers.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- CSS Modules with design tokens in `app/globals.css`
- [Lucide](https://lucide.dev) icons via `lucide-react`
- Self-hosted fonts from Fontsource: Archivo (display), Instrument Sans (body), IBM Plex Mono (data)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

Node 20.9 or newer.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero + Value Check, buy/sell desks, Market Pulse, process, data security, about |
| `/report/sample` | Sample Market Value Report, the deliverable a lead receives (not indexed) |
| `/api/leads` | POST endpoint for sell estimates, part requests and Market Pulse signups |

## Leads

All three forms post to `/api/leads`. Set `LEAD_WEBHOOK_URL` (see `.env.example`) to forward every lead as JSON to a CRM, Zapier, Make or Slack workflow. Without it, leads are logged to the server console.

Each payload carries a `type` (`sell`, `buy` or `pulse`), the email and the form fields. Sell leads include the estimate the visitor saw. A hidden honeypot field drops basic bot submissions.

## Before launch

- **Calibrate the estimator.** Per-unit ranges and monthly decline rates in `lib/estimator.ts` are placeholders roughed from public 2026 market data. The SUR desk should replace them.
- **Confirm company claims** pulled from the current site: 1,250+ enterprise customers, 45+ countries, 24/7 support, 4-hour reply, NIST 800-88 and DoD 5220.22-M.
- **Certifications.** If SUR holds R2v3, e-Stewards, ISO 27001 or NAID AAA, add them to the Security section.
- **Logo.** `components/Wordmark.tsx` is a typographic stand-in. Swap in the final logo there.
- **Market Pulse figures** in `components/Sections.tsx` are dated October 2026. Refresh monthly along with the alert bar copy in `components/AlertBar.tsx`.

## Deploy

Built for Vercel: import the repo, add `LEAD_WEBHOOK_URL` as an environment variable, deploy.
