import { postgresAdapter } from '@payloadcms/db-postgres'
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

export default buildConfig({
  // Makes upload `url`s absolute, so the frontend can use them as-is.
  serverURL: process.env.SERVER_URL || 'http://localhost:3001',
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
  }),
  sharp,
})
