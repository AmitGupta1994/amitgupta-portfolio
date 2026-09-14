# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

Nx + npm-workspaces monorepo (`apps/*`, `packages/*`). Only `apps/frontend` exists today — `apps/admin` and `apps/api` are empty placeholder directories, and `packages/` does not exist yet. There are no `project.json` files: Nx infers every target from each workspace package's `scripts`, so a new app only needs a `package.json` with `dev`/`build`/`lint`/`test` to join the graph.

App-specific conventions live in [apps/frontend/AGENTS.md](apps/frontend/AGENTS.md) (imported by `apps/frontend/CLAUDE.md`) — read it before changing frontend code.

## Commands

Run from the repo root:

```bash
npm run dev          # nx dev frontend  (Next dev server)
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

**Content lives in `src/data`, typed by `src/types`.** `profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `publications.ts`, `expertise.ts`, `navigation.ts` are the single source of copy; components take that data as props. Copy edits belong in these files, not in JSX. Source of truth for the underlying facts is the CV at `public/cv-amitgupta.pdf`. Note `profileData.summary` contains HTML and is rendered with `dangerouslySetInnerHTML`. `skillsData` entries carry `show` and `priority` fields used for filtering/ordering.

**The whole site is one scrolling page.** `src/app/page.tsx` composes every section inside anchor `<div id="...">` wrappers whose ids must match `navLinks` hrefs in `src/data/navigation.ts` (`/#hero`, `/#about`, …). Adding a section means touching both files. `src/app/projects/page.tsx` is a separate unstyled route that predates the main page.

**Server-first components.** Sections are server components unless they need hooks; `MediumArticlesSection` is an async server component that fetches the Medium RSS feed through `api.rss2json.com` with `next: { revalidate: 3600 }` and returns `null` on failure. Remote image hosts must be allowlisted in `next.config.ts` `images.remotePatterns`.

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
