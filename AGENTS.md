# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

Nx + npm-workspaces monorepo (`apps/*`, `packages/*`). One app exists: `apps/frontend`, a single Next.js app that serves both the public site (`/`) and the Payload CMS admin (`/admin`) on the same port, backed by Postgres. `apps/api` is an empty placeholder and `packages/` does not exist yet. There are no `project.json` files: Nx infers every target from each workspace package's `scripts`, so a new app only needs a `package.json` with `dev`/`build`/`lint`/`test` to join the graph.

App-specific conventions live in [apps/frontend/AGENTS.md](apps/frontend/AGENTS.md) (imported by `apps/frontend/CLAUDE.md`) — read it before changing frontend code. Deployment (one Vercel project, Neon Postgres) is in [DEPLOYMENT.md](DEPLOYMENT.md).

**Postgres must be reachable to render, build, seed or migrate.** Config lives in `apps/frontend/.env` (see `.env.example`): `DATABASE_URL`, `PAYLOAD_SECRET`, and optionally `BLOB_READ_WRITE_TOKEN` (uploads go to `apps/frontend/media` without it). Locally the database is Homebrew Postgres 14 (`amitgupta_portfolio`).

## Commands

Run from the repo root:

```bash
npm run dev            # nx dev frontend  (site at :3000, admin at :3000/admin)
npm run seed           # REPLACES all CMS content with apps/frontend/src/cms/payload/seed/data.ts
npm run migrate:create # after changing a collection/global; commit the generated file
npm run build          # nx run-many -t build  (runs payload migrate, then next build)
npm run lint           # nx run-many -t lint
npm run test           # nx run-many -t test
npm run graph          # Nx project graph
```

Targeting one project or one test:

```bash
npx nx test frontend                                   # full vitest run for the app
npx nx test frontend -- src/components/__tests__/About.test.tsx   # single file
npx nx test frontend -- -t "toggles theme"             # single test by name
npx nx build frontend
```

`build`, `test`, and `lint` are Nx-cached; add `--skip-nx-cache` when a cached result is misleading. `dev` is not cached.

Seeding a remote database needs `NODE_ENV=production DATABASE_URL="…" npm run seed` — without `NODE_ENV=production` Payload treats it as a dev database and pushes schema, which makes the next `payload migrate` stop on a confirmation prompt. The `build` script passes `--force-accept-warning` so deploys never hang on that prompt.

## Payload CMS (inside apps/frontend)

The CMS sits behind a port/adapter boundary so it can be replaced:

- `src/content/ports.ts` — the `ContentSource` interface: what the site needs, in the site's own types (`src/types`).
- `src/content/index.ts` — **the only place the CMS is chosen**; the site imports its getters from `@/content` and never learns which CMS is behind them.
- `src/cms/payload/` — the Payload implementation: `payload.config.ts`, `collections/` (`Projects`, `Experiences`, `Expertise`, `SkillCategories`, `Publications`, `Media`, `Users`), `globals/` (`Profile`, `Navigation`), `access/`, `fields/`, `hooks/`, `migrations/`, `seed/`, generated `payload-types.ts`, `client.ts` (local-API handle) and `adapter/` (queries + mappers, exported as `payloadContentSource`).
- `src/app/(payload)/` — generated route re-exports; they must live under `src/app` because Next owns routing (`importMap.baseDir` points back at `src` for that reason). See the README there.

ESLint forbids `src/app/(frontend)` and `src/components` from importing `@/cms/**`, which keeps the boundary honest. **To swap CMS:** write `src/cms/<name>/adapter` satisfying `ContentSource`, change the one import in `src/content/index.ts`, then delete `src/cms/payload` and `src/app/(payload)`.

- Content collections/globals use `publicRead` access and the `revalidateSite` hooks; bulk local-API writes pass `context: { disableRevalidate: true }`.
- List collections carry the shared `orderField` with `defaultSort: 'order'`; skill categories sort by `priority`.
- The adapter pushes schema automatically when `NODE_ENV !== 'production'`; production applies the committed migrations that `build` runs first.
- After changing a field: `npm run generate:types -w frontend` (writes `src/cms/payload-types.ts`), then `npm run migrate:create`, and update the matching mapper in `src/cms/payload/adapter`.
- `src/app/(payload)/**` is generated — don't hand-edit. Re-run `npm run generate:importmap -w frontend` after adding custom admin components.
- No `serverURL` is set: admin and site share an origin, so uploads get same-origin URLs (`/api/media/file/…`).

## Frontend architecture (apps/frontend)

Next.js 16 App Router + React 19 + Tailwind CSS v4 + GSAP. `@/*` maps to `src/*` and `@payload-config` to `src/cms/payload.config.ts` (declared in `tsconfig.json`, and in `vitest.config.mts` where `@payload-config` resolves to a stub — keep them in sync).

**Two route groups, no `src/app/layout.tsx`.** `src/app/(frontend)` is the site (its layout is the site's root layout: fonts, theme script, `PageLoader`, `SmoothScroll`, `NavMenu`); `src/app/(payload)` is Payload's own root layout and routes. Each group has exactly one root layout — adding `src/app/layout.tsx` breaks both.

**Content comes from the CMS through `@/content`, typed by `src/types`.** The adapter modules (`src/cms/payload/adapter/profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `publications.ts`, `expertise.ts`, `navigation.ts`) each export an async `get*()` that queries Payload's local API through `src/cms/payload/client.ts` and maps the doc onto the frontend type (nulls → undefined, uploads → same-origin URLs). Mappers are exported separately (`mapProfile`, `mapProject`, `mapSkillCategory`) because the tests cover them. Only server components call the getters; components take data as props — a client component importing them would pull Payload into the browser bundle. `mapProfile` tolerates an empty profile so a first deploy against an empty database still builds. Copy edits happen in the admin UI, not in code. Note `profile.summary` contains HTML and is rendered with `dangerouslySetInnerHTML` in `About.tsx`. Skill categories carry `show` and `priority` used for filtering/ordering.

**Caching.** `src/app/(frontend)/layout.tsx` sets `revalidate = 3600`, so `/` and `/projects` are prerendered and served from the CDN; visitors don't hit Postgres. Saving in the admin runs the `revalidateSite` hooks (`revalidatePath('/', 'layout')`), which invalidates those pages immediately; the hourly window is the fallback. `/admin` and `/api/**` are dynamic and query on every request.

**The whole site is one scrolling page.** `src/app/(frontend)/page.tsx` composes every section inside anchor `<div id="...">` wrappers whose ids must match the Navigation global's hrefs in the CMS (`/#hero`, `/#about`, …). Adding a section means touching the page and the CMS navigation. `src/app/(frontend)/projects/page.tsx` is a separate unstyled route that predates the main page.

**Server-first components.** Sections are server components unless they need hooks; `MediumArticlesSection` is an async server component that fetches the Medium RSS feed through `api.rss2json.com` with `next: { revalidate: 3600 }` and returns `null` on failure. Remote image hosts must be allowlisted in `next.config.ts` `images.remotePatterns` (Vercel Blob is already allowed); CMS uploads are covered by `localPatterns`.

**GSAP pattern** (used by `ScrollReveal`, `HorizontalProjectsSection`, `Hero`, `TiltCard`, `MagneticButton`, `AmbientBackground`, `HeroMarquee`, `ScrollProgress`, `ExperienceSection`, `PublicationsSection`, `NavMenu`). Every animated component follows the same shape — match it:

```tsx
"use client";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
// inside useEffect: bail on SSR and on prefers-reduced-motion,
// wrap tweens in gsap.context(() => {...}, ref), return () => ctx.revert();
```

`HorizontalProjectsSection` additionally bails below 768px and falls back to native horizontal overflow scrolling. Failing to `ctx.revert()` leaves pinned ScrollTriggers alive across route changes. `Hero` builds its timeline paused and plays it via `onPageLoaded` from `PageLoader`, so the intro isn't spent behind the loading curtain; `globals.css` pre-hides `[data-hero-reveal]`/`[data-page-loader]` under `.js` with a delayed keyframe fallback.

**Smooth scrolling** is Lenis on GSAP's ticker (`SmoothScroll.tsx`), which also intercepts same-page hash links; it is disabled under `prefers-reduced-motion`, so `globals.css` must not set `scroll-behavior: smooth`.

**Theming is class-based, not `prefers-color-scheme`-only.** Tailwind v4 defines the variant in `globals.css` (`@custom-variant dark (&:where(.dark, .dark *))`), so dark styles key off a `dark` class on `<html>`. An inline blocking script in `src/app/(frontend)/layout.tsx` sets that class from `localStorage.theme` before paint (hence `suppressHydrationWarning`); `ThemeProvider` owns the `light | dark | system` state afterwards and re-persists it. Changing the theme storage key or logic means changing both places. The palette is navy/teal tokens in `globals.css`; `globals.css` also carries a print stylesheet used for CV export.

**Unused / stale:** `FullPageDeck.tsx` (a no-op wrapper left from an abandoned deck animation), `SectionPagination.tsx`, and `ProjectsSection.tsx` (superseded by `HorizontalProjectsSection`) are not referenced by any page.

## Testing

Vitest + Testing Library, `happy-dom` environment, globals enabled, setup in `src/test/setup.ts` (which globally stubs `next/image` to a plain `<img>`). Tests sit in `__tests__` directories next to what they cover: `src/cms/payload/adapter/__tests__` covers the CMS mappers with plain fixtures (no database), `src/components/__tests__` covers UI. `@payload-config` resolves to `src/test/payload-config-stub.ts` so importing the adapter never loads Payload. Component tests that touch animated code mock `gsap` explicitly, and theme tests must stub `window.matchMedia` — `happy-dom` does not provide a usable one.
