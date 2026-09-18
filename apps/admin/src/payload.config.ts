import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Experiences } from './collections/Experiences'
import { Expertise } from './collections/Expertise'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Publications } from './collections/Publications'
import { SkillCategories } from './collections/SkillCategories'
import { Users } from './collections/Users'
import { Navigation } from './globals/Navigation'
import { Profile } from './globals/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Makes upload `url`s absolute, so the frontend can use them as-is. On Vercel the
// deployment URL is used unless SERVER_URL is set explicitly.
const serverURL =
  process.env.SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3001')

const allowedOrigins = [serverURL, process.env.FRONTEND_URL].filter(Boolean) as string[]

// Vercel's filesystem is read-only, so uploads go to Blob storage whenever a token
// is present; locally they stay in apps/admin/media.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  serverURL,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Projects, Experiences, Expertise, SkillCategories, Publications, Media, Users],
  globals: [Profile, Navigation],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Schema changes are pushed automatically in development; production runs the
    // committed migrations instead (see the admin app's `build` script).
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: blobToken
    ? [
        vercelBlobStorage({
          enabled: true,
          collections: { media: true },
          token: blobToken,
        }),
      ]
    : [],
})
