# HomeFinder PH

**Live URL:** `https://homefinder-ph-<hash>-asia-southeast1.a.run.app`

A modern PropTech demo application for Metro Manila real estate — built as a portfolio piece for a Frontend Developer role at **Ohmyhome Property Inc.**

## Why This Exists

This project demonstrates end-to-end frontend engineering capability with a stack aligned to modern React/Next.js best practices. It showcases a full property discovery experience — from hero search to map-based browsing, seller dashboards, community ShoutOuts, and comparison tools — all powered by a clean data layer and deployed to Google Cloud Run.

## Features

- Property Search — debounced full-text search across 40 Metro Manila listings
- Interactive Map — MapLibre GL JS with OpenStreetMap tiles, click-to-preview pins
- Smart Filters — filter by city, type, status, price range, bedrooms, developer
- Favorites — persisted to localStorage, accessible across sessions
- Compare — side-by-side comparison of up to 3 properties
- ShoutOuts — buyers post wish lists; community board with local + API data
- Seller Dashboard — list a property, instant AI valuation, analytics charts
- Price Trend Charts — 12-month price history per property (Recharts)
- Demo Auth — session-based login via Zustand + localStorage persist
- Responsive — mobile-first with bottom nav, filter sheets, swipeable gallery
- Cloud Run — Docker standalone build, CI/CD via GitHub Actions

## Screenshots

| Page | Preview |
|---|---|
| Home / Hero | _(screenshot placeholder)_ |
| Property Listing with Map | _(screenshot placeholder)_ |
| Property Detail | _(screenshot placeholder)_ |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 |
| Maps | MapLibre GL JS + react-map-gl |
| Charts | Recharts |
| Forms | react-hook-form + zod |
| Testing | Vitest + @testing-library/react |
| CI/CD | GitHub Actions |
| Cloud | Google Cloud Run + Artifact Registry |

## Run Locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy to Cloud Run

### One-time GCP setup

```bash
export PROJECT_ID=your-gcp-project-id
export REGION=asia-southeast1

gcloud services enable run.googleapis.com artifactregistry.googleapis.com

gcloud artifacts repositories create homefinder-ph \
  --repository-format=docker \
  --location=$REGION

gcloud iam service-accounts create github-actions-sa \
  --display-name="GitHub Actions SA"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### GitHub Secrets

| Secret | Description |
|---|---|
| `GCP_PROJECT_ID` | Your GCP project ID |
| `GCP_SERVICE_ACCOUNT` | Service account email |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Provider resource name |

## Architecture

```
Browser
  ├── TanStack Query ──► Next.js Route Handlers ──► Seed Data (src/data/)
  ├── Zustand Stores ──► localStorage (persist)
  └── MapLibre GL ──► OpenStreetMap Raster Tiles (no API key)
```

## Known Limitations

- **Mock backend** — No real database. All property data is in `src/data/`. Submitted listings are not persisted server-side.
- **No real authentication** — Login is email-only, no password, no JWT.
- **Static pricing** — Valuation estimates use a deterministic formula, not real market data.
- **No real images** — Uses Unsplash URLs.

## License

MIT
