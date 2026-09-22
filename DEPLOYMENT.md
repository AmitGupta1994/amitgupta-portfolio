# Deploying to Vercel

Two Vercel projects come from this one repository:

| Project      | Root directory  | What it serves                                  |
| ------------ | --------------- | ----------------------------------------------- |
| CMS (admin)  | `apps/admin`    | Payload admin at `/admin` + the content API      |
| Website      | `apps/frontend` | The public portfolio                             |

Deploy the CMS first: the website reads its content from it.

## 1. Create the database (Neon)

1. Create a project at [neon.tech](https://neon.tech) and a database in it.
2. Copy the **pooled** connection string (the host contains `-pooler`). It looks like:
   `postgres://user:password@ep-something-pooler.region.aws.neon.tech/dbname?sslmode=require`

That string is the `DATABASE_URL` below.

## 2. CMS project

Import the repository in Vercel, then set **Root Directory** to `apps/admin`. Leave the
build and install commands on their defaults — the build runs database migrations before
building. Under **Settings → Environment Variables** add:

| Variable                | Value                                                           |
| ----------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`          | The Neon pooled connection string                                 |
| `PAYLOAD_SECRET`        | A long random string (`openssl rand -hex 32`). Never change it later — it invalidates logins |
| `FRONTEND_URL`          | The website's URL, e.g. `https://your-site.vercel.app` (add after step 3) |
| `REVALIDATE_SECRET`     | Any random string; the website gets the same value                 |
| `BLOB_READ_WRITE_TOKEN` | From the Blob store in step 4                                      |

`SERVER_URL` is optional: without it the CMS uses its own Vercel production URL.

Deploy, then open `https://your-cms.vercel.app/admin` and create the first admin user.

## 3. Website project

Add a second Vercel project from the same repository with **Root Directory** set to
`apps/frontend`, and these variables:

| Variable            | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| `CMS_URL`           | The CMS URL, e.g. `https://your-cms.vercel.app` (no trailing slash) |
| `REVALIDATE_SECRET` | Exactly the same value as in the CMS project              |

Deploy, then go back to the CMS project and set `FRONTEND_URL` to this project's URL, and
redeploy the CMS so saving content refreshes the site.

## 4. Image uploads (Vercel Blob)

Vercel's filesystem is read-only, so uploaded images need Blob storage. In the Vercel
dashboard: **Storage → Create → Blob**, connect it to the CMS project, and Vercel adds
`BLOB_READ_WRITE_TOKEN` for you. Redeploy the CMS.

Without the token the CMS still runs, but uploading an image fails. Content that uses
external image URLs is unaffected.

## 5. First content

The production database starts empty. From your machine, with the Neon URL:

```bash
DATABASE_URL="postgres://…neon.tech/dbname?sslmode=require" npm run seed -w admin
```

This **replaces** all portfolio content with `apps/admin/src/seed/data.ts`. It leaves
users and uploaded images alone. Run it once, then edit in the admin UI.

## Database changes later

Schema changes are pushed automatically in development. Production runs committed
migrations, which the CMS build applies. After changing any collection or global:

```bash
npm run migrate:create -w admin   # creates a file in apps/admin/src/migrations
```

Commit that file. The next CMS deploy applies it.

## Notes

- **Deploy order matters only the first time.** The website renders at request time, so
  its build never fails because the CMS is unreachable — but pages will error until
  `CMS_URL` points at a running CMS.
- **After changing env vars, redeploy.** They're read at build and at runtime.
- **Images from the CMS** are allowed automatically because the host comes from `CMS_URL`.
  Other external image hosts must be added to `images.remotePatterns` in
  `apps/frontend/next.config.ts`.
- **If a build can't resolve workspace packages**, enable "Include files outside the root
  directory" in the project's Build settings.
