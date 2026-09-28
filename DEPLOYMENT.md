# Deploying to Vercel

One Vercel project serves everything: the portfolio at `/` and the Payload admin at
`/admin`, from `apps/frontend`.

## 1. Create the database (Neon)

1. Create a project at [neon.tech](https://neon.tech) and a database in it.
2. Copy the **pooled** connection string (the host contains `-pooler`):
   `postgres://user:password@ep-something-pooler.region.aws.neon.tech/dbname?sslmode=require`

## 2. Create the Vercel project

Import the repository and set **Root Directory** to `apps/frontend`. Leave the build and
install commands on their defaults — the build runs database migrations first. Under
**Settings → Environment Variables** add:

| Variable                | Value                                                                    |
| ----------------------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`          | The Neon pooled connection string                                          |
| `PAYLOAD_SECRET`        | A long random string (`openssl rand -hex 32`). Never change it later — it invalidates logins |
| `BLOB_READ_WRITE_TOKEN` | Added for you in step 3                                                    |

Deploy, then open `https://your-site.vercel.app/admin` and create the first admin user.

## 3. Image uploads (Vercel Blob)

Vercel's filesystem is read-only, so uploaded images need Blob storage. In the dashboard:
**Storage → Create → Blob**, connect it to the project, and Vercel adds
`BLOB_READ_WRITE_TOKEN`. Redeploy.

Without the token the site still runs, but uploading an image fails. Content that uses
external image URLs is unaffected.

## 4. First content

The production database starts empty. From your machine, with the Neon URL:

```bash
NODE_ENV=production DATABASE_URL="postgres://…neon.tech/dbname?sslmode=require" npm run seed
```

`NODE_ENV=production` matters: without it Payload treats the database as a development one
and syncs the schema directly, which marks the database as dev-pushed. The build answers the
resulting confirmation prompt automatically, but from then on every deploy runs migrations
against a schema that was never migrated — which can fail. Keep production migration-only.

This **replaces** all portfolio content with `apps/frontend/src/cms/payload/seed/data.ts`, leaving
users and uploaded images alone. Run it once, then edit in the admin UI.

## Subdomains (research.…, trek.…)

The research and trek sites are the same deployment, served on their own hosts by
`src/middleware.ts`. Per subdomain:

1. Vercel → your project → **Settings → Domains → Add**: `research.yourdomain.com`
   (then `trek.yourdomain.com`).
2. Vercel shows the DNS record to create. In Cloudflare add a **CNAME** for `research`
   pointing at the target Vercel gives you. Leave the proxy off (grey cloud) unless you
   have a reason to proxy — see the caching note below.
3. Wait for the certificate to be issued, then open `https://research.yourdomain.com`.

No extra project, build or environment variable is needed; `/research` and `/trek` keep
working on the main domain too. Adding `creatives.` later is the same three steps plus a
row in `SITE_BY_SUBDOMAIN`.

The trek site's photo gallery uploads through the admin, so it needs the Blob store from
step 3; its films only store YouTube URLs and cost nothing. Sections with no content yet
don't render, so the page is presentable before you upload anything.

## Caching and the CDN

Pages are prerendered and served from Vercel's edge, so visitors never reach Postgres:
`/`, `/projects`, `/research` and `/trek` all carry
`Cache-Control: s-maxage=86400, stale-while-revalidate=…`. Saving in the admin clears
those pages immediately (`src/cms/payload/hooks/revalidateSite.ts`) and purges Cloudflare;
the daily window is only a fallback. `/admin` and `/api/**` send
`Cache-Control: private, no-store` and must never be cached.

### Cloudflare (proxied, orange cloud)

Proxying is fine as long as the app can purge Cloudflare when you publish. Set it up once:

1. Cloudflare → **My Profile → API Tokens → Create Token → Create Custom Token**.
   Permissions: **Zone → Cache Purge → Purge**. Zone Resources: **Include → Specific zone →
   your domain**. Copy the token.
2. Cloudflare → your domain → **Overview**, copy the **Zone ID** from the right-hand panel.
3. Vercel → Settings → Environment Variables, add for Production and Preview:

| Variable               | Value                     |
| ---------------------- | ------------------------- |
| `CLOUDFLARE_ZONE_ID`   | The zone id from step 2   |
| `CLOUDFLARE_API_TOKEN` | The token from step 1     |

4. Redeploy. From then on, every save purges both caches.

Also in Cloudflare:

- **SSL/TLS → Overview → Full (strict)**.
- Add each subdomain in **Vercel first**, then point a CNAME at the target Vercel shows.
  Keep a new record DNS-only until its certificate is issued, then proxy it if you want.
- **Never add a cache rule for `/admin*` or `/api*`.** If you add an HTML cache rule for the
  rest, keep Edge TTL on "respect origin headers" so the `s-maxage` above is honoured.
- Leave Browser Cache TTL on **Respect Existing Headers**.

Without the two variables nothing breaks: only Vercel is purged, so leave Cloudflare's
HTML caching off (its default) — otherwise your edits sit behind a stale copy until the
TTL expires.

## Staging (staging.research.…)

Staging is the **same Vercel project**, deployed from a `staging` branch with its own
database. Nothing extra is needed in code: `staging.research.<domain>` and
`research-staging.<domain>` both resolve to the research site.

1. **Branch:** `git switch -c staging && git push -u origin staging`.
2. **Database:** create a Neon branch (e.g. `staging`) and copy its pooled connection
   string.
3. **Vercel → Settings → Environment Variables**, for **Preview** only:
   `DATABASE_URL` = the Neon staging string, plus `PAYLOAD_SECRET` (any value; a different
   one from production is fine).
4. **Vercel → Settings → Domains → Add** `staging.research.<domain>`, and in the dialog
   **assign it to the `staging` branch** instead of production.
5. **Cloudflare → DNS**: CNAME `staging.research` → the target Vercel shows, **DNS only
   (grey cloud)**. This matters: Cloudflare's free Universal SSL only covers one level of
   subdomain, so a proxied `staging.research.…` would fail TLS. Either keep it DNS-only, or
   name it `research-staging.<domain>` (a single level) if you want it proxied.
6. Push to `staging` and the domain serves that branch; `main` keeps serving production.

Notes:

- Staging deployments send `X-Robots-Tag: noindex` so they never reach search results.
- Publishing on staging does **not** purge Cloudflare — the purge is zone-wide and would
  clear production's cache. Staging pages still refresh through Vercel's own invalidation.
- Run the seed against the staging database the same way, with its own `DATABASE_URL`.

## Database changes later

Schema changes are pushed automatically in development; production runs committed
migrations, which the build applies. After changing any collection or global:

```bash
npm run migrate:create        # creates a file in apps/frontend/src/cms/payload/migrations
```

Commit that file — without it the next deploy won't have the change.

## Notes

- **After changing env vars, redeploy.** They're read at build and at runtime.
- **The build needs the database**, because migrations run and pages are prerendered.
- **Custom domain:** add it in Vercel; the site and `/admin` share it (ports 80/443).
- **If a build can't resolve workspace packages**, enable "Include files outside the root
  directory" in the project's Build settings.
