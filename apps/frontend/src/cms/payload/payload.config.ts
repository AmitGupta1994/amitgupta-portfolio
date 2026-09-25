import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Experiences } from './collections/Experiences'
import { Expertise } from './collections/Expertise'
import { Media } from './collections/Media'
import { Photos } from './collections/Photos'
import { Projects } from './collections/Projects'
import { Publications } from './collections/Publications'
import { Videos } from './collections/Videos'
import { SkillCategories } from './collections/SkillCategories'
import { Users } from './collections/Users'
import { Navigation } from './globals/Navigation'
import { Research } from './globals/Research'
import { Trek } from './globals/Trek'
import { Profile } from './globals/Profile'

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
  collections: [Projects, Experiences, Expertise, SkillCategories, Publications, Photos, Videos, Media, Users],
  globals: [Profile, Navigation, Research, Trek],
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
          collections: { media: true, photos: true },
          token: blobToken,
        }),
      ]
    : [],
})
