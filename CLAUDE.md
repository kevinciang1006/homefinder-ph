# HomeFinder PH — CLAUDE.md

## Project Overview

HomeFinder PH is a PropTech demo SPA built as a portfolio piece for a Frontend Developer application at Ohmyhome Property Inc. It showcases a full-featured Metro Manila property marketplace with browsing, filtering, map views, comparisons, favorites, seller tools, instant valuations, and community ShoutOuts.

## Stack Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + shadcn/ui primitives |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 (persist middleware) |
| Maps | MapLibre GL JS + react-map-gl/maplibre |
| Charts | Recharts |
| Forms | react-hook-form + zod |
| Icons | lucide-react |
| Testing | Vitest + @testing-library/react |
| Deploy | Docker → Google Cloud Run |

## Before Making Changes

- [ ] Run `pnpm typecheck` to confirm TypeScript is clean
- [ ] Run `pnpm lint` to catch ESLint issues
- [ ] Run `pnpm test -- --run` to confirm all tests pass
- [ ] Never use `any` type — use `unknown` + narrowing if needed
- [ ] All Recharts components need `"use client"` directive
- [ ] All map components need `"use client"` directive and dynamic import with `ssr: false`
- [ ] Zustand stores with `persist` middleware need `"use client"` directive
- [ ] Next.js 15+ `params` in pages are Promises — always `await params`
- [ ] Prefer Server Components by default; only use `"use client"` where genuinely needed

## React 19 / Next.js 16 Idioms

- Server Components by default — never add `"use client"` unless using hooks, event handlers, or browser APIs
- `"use client"` boundary: wrap at the lowest possible level
- Prefer `next/image` over `<img>` everywhere
- Route handlers use typed `NextRequest`/`NextResponse`
- No default exports for components — only for pages (required by Next.js)
- `params` in page components: `{ params }: { params: Promise<{ id: string }> }` — must be awaited

## Angular Best Practices Reference

Even though this is a React project, Kevin's personal convention is to keep a reference to Angular best practices for portfolio consistency:
https://angular.dev/assets/context/best-practices.md

## Project Conventions

- Seed data lives in `src/data/` and is used directly by API routes (no database)
- Zustand stores are client-only and use localStorage `persist` where specified
- All currency is PHP (Philippine Peso)
- Images from `images.unsplash.com` — configured in `next.config.ts` `remotePatterns`
- API routes validate with zod and return typed JSON
