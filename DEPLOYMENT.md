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

## Caching

Pages are prerendered and served from Vercel's CDN, so visitors don't hit the database.
Saving in the admin clears that cache immediately (`src/cms/payload/hooks/revalidateSite.ts`), and
pages also refresh once a day as a safety net — kept long so scheduled regenerations don't
wake the Neon compute (and spend free compute-hours) for no reason.

If you put Cloudflare in front, leave HTML caching off (the default) or you will also need
to purge Cloudflare on every edit. Never let a CDN cache `/admin` or `/api`.

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
