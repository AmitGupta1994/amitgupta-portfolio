# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

Nx + npm-workspaces monorepo (`apps/*`, `packages/*`). Two apps exist: `apps/frontend` (the public site, port 3000) and `apps/admin` (Payload CMS + Postgres, port 3001). `apps/api` is an empty placeholder and `packages/` does not exist yet. There are no `project.json` files: Nx infers every target from each workspace package's `scripts`, so a new app only needs a `package.json` with `dev`/`build`/`lint`/`test` to join the graph.

App-specific conventions live in [apps/frontend/AGENTS.md](apps/frontend/AGENTS.md) and [apps/admin/AGENTS.md](apps/admin/AGENTS.md) (each imported by that app's `CLAUDE.md`) — read the relevant one before changing an app.

Deployment (two Vercel projects, Neon Postgres) is documented in [DEPLOYMENT.md](DEPLOYMENT.md).

**Content flows CMS → frontend.** The frontend fetches everything from the admin app's REST API at request/revalidate time, so the admin app (and its Postgres database) must be running for the frontend to render or build. Each app needs its env file: `apps/admin/.env` and `apps/frontend/.env.local` (see their `.env.example`), with a shared `REVALIDATE_SECRET`.

## Commands

Run from the repo root:

```bash
npm run dev          # nx dev frontend  (Next dev server)
npm run dev:admin    # nx dev admin     (Payload admin at http://localhost:3001/admin)
npm run dev:all      # both, in parallel
npm run seed         # replace all CMS content with apps/admin/src/seed/data.ts
npm run build        # nx run-many -t build  (all projects)
npm run lint         # nx run-many -t lint
npm run test         # nx run-many -t test
npm run graph        # Nx project graph
```

Targeting one project or one test:

```bash
npx nx test frontend                                   # full vitest run for the app
npx nx test frontend -- src/components/__tests__/About.test.tsx   # single file
npx nx test frontend -- -t "toggles theme"             # single test by name
npx nx build frontend
```

`build`, `test`, and `lint` are Nx-cached; add `--skip-nx-cache` when a cached result is misleading. `dev` is not cached.

## Frontend architecture (apps/frontend)

Next.js 16 App Router + React 19 + Tailwind CSS v4 + GSAP. `@/*` maps to `src/*` (declared in both `tsconfig.json` and `vitest.config.mts` — keep them in sync).

**Content comes from the CMS; `src/data` is the access layer, typed by `src/types`.** `profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `publications.ts`, `expertise.ts`, `navigation.ts` each export an async `get*()` that calls `src/lib/cms.ts` and maps the Payload doc onto the frontend type (nulls → undefined, uploads → absolute URLs). Only server components (`page.tsx`, `layout.tsx`) call them; components take the data as props — client components must never import `src/data`. Copy edits happen in the admin UI, not in code. Fetches are cached under the `cms` tag and expired by `POST /api/revalidate` (secret header), which the CMS calls on every save. Note `profile.summary` contains HTML and is rendered with `dangerouslySetInnerHTML`. Skill categories carry `show` and `priority` fields used for filtering/ordering.

**The whole site is one scrolling page.** `src/app/page.tsx` composes every section inside anchor `<div id="...">` wrappers whose ids must match the Navigation global's hrefs in the CMS (`/#hero`, `/#about`, …). Adding a section means touching the page and the CMS navigation. `src/app/projects/page.tsx` is a separate unstyled route that predates the main page.

**Server-first components.** Sections are server components unless they need hooks; `MediumArticlesSection` is an async server component that fetches the Medium RSS feed through `api.rss2json.com` with `next: { revalidate: 3600 }` and returns `null` on failure. Remote image hosts must be allowlisted in `next.config.ts` `images.remotePatterns` (the CMS host is derived from `CMS_URL`).

**GSAP pattern** (used by `ScrollReveal`, `HorizontalProjectsSection`, `Hero`, `TiltCard`, `MagneticButton`, `AmbientBackground`, `HeroMarquee`, `ScrollProgress`, `ExperienceSection`, `PublicationsSection`). Every animated component follows the same shape — match it:

```tsx
"use client";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
// inside useEffect: bail on SSR and on prefers-reduced-motion,
// wrap tweens in gsap.context(() => {...}, ref), return () => ctx.revert();
```

`HorizontalProjectsSection` additionally bails below 768px and falls back to native horizontal overflow scrolling. Failing to `ctx.revert()` leaves pinned ScrollTriggers alive across route changes.

**Theming is class-based, not `prefers-color-scheme`-only.** Tailwind v4 defines the variant in `globals.css` (`@custom-variant dark (&:where(.dark, .dark *))`), so dark styles key off a `dark` class on `<html>`. An inline blocking script in `src/app/layout.tsx` sets that class from `localStorage.theme` before paint (hence `suppressHydrationWarning`); `ThemeProvider` owns the `light | dark | system` state afterwards and re-persists it. Changing the theme storage key or logic means changing both places. `globals.css` also carries a print stylesheet used for CV export.

**Unused / stale:** `FullPageDeck.tsx` (a no-op wrapper left from an abandoned deck animation), `SectionPagination.tsx`, and `ProjectsSection.tsx` (superseded by `HorizontalProjectsSection`) are not referenced by any page.

## Testing

Vitest + Testing Library, `happy-dom` environment, globals enabled, setup in `src/test/setup.ts` (which globally stubs `next/image` to a plain `<img>`). Tests sit in `__tests__` directories next to what they cover. Component tests that touch animated code mock `gsap` explicitly, and theme tests must stub `window.matchMedia` — `happy-dom` does not provide a usable one.
