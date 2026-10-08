import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { SITES } from '@/types/sites'
import { Media } from './collections/Media'
import { collectionsForSite } from './collections/perSite'
import { Users } from './collections/Users'
import {
  CreativesSite,
  MokshyaTrailsSite,
  ResearchSite,
  TechCompanySite,
  TechSite,
  TrekSite,
  VoxelateSite,
} from './globals/sites'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// This adapter lives in src/cms/payload; the generated admin routes live in src/app/(payload).
const srcDir = path.resolve(dirname, '../..')

// No serverURL: the admin and the site share one origin, so uploads get
// same-origin URLs (/api/media/file/…) that work in every environment.

// Vercel's filesystem is read-only, so uploads go to Blob storage whenever a token
// is present; locally they stay in apps/frontend/media.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: srcDir,
    },
  },
  collections: [...SITES.flatMap(collectionsForSite), Media, Users],
  globals: [TechSite, ResearchSite, TrekSite, CreativesSite, VoxelateSite, TechCompanySite, MokshyaTrailsSite],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Schema changes are pushed automatically in development; production runs the
    // committed migrations instead (see the `build` script).
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: blobToken
    ? [
        vercelBlobStorage({
          enabled: true,
          collections: {
            media: true,
            ...Object.fromEntries(SITES.map((site) => [`${site}-photos`, true])),
          },
          token: blobToken,
        }),
      ]
    : [],
})
