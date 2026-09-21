// Replaces all portfolio content with src/seed/data.ts. Run with `npm run seed`.
// Users and media are left untouched.
import { getPayload } from 'payload'

import config from '../payload.config'
import {
  experiences,
  expertise,
  navigationLinks,
  profile,
  projects,
  publications,
  skillCategories,
} from './data'

// Seeding writes dozens of docs; skip the per-save frontend revalidation.
const context = { disableRevalidate: true }
const everything = { id: { exists: true } }

const payload = await getPayload({ config })

await payload.updateGlobal({ slug: 'profile', data: profile, context })
await payload.updateGlobal({ slug: 'navigation', data: { links: navigationLinks }, context })

await payload.delete({ collection: 'projects', where: everything, context })
for (const [order, project] of projects.entries()) {
  await payload.create({
    collection: 'projects',
    data: { ...project, techStack: project.techStack.map((name) => ({ name })), order },
    context,
  })
}

await payload.delete({ collection: 'experiences', where: everything, context })
for (const [order, experience] of experiences.entries()) {
  await payload.create({ collection: 'experiences', data: { ...experience, order }, context })
}

await payload.delete({ collection: 'expertise', where: everything, context })
for (const [order, item] of expertise.entries()) {
  await payload.create({ collection: 'expertise', data: { ...item, order }, context })
}

await payload.delete({ collection: 'publications', where: everything, context })
for (const [order, publication] of publications.entries()) {
  await payload.create({ collection: 'publications', data: { ...publication, order }, context })
}

await payload.delete({ collection: 'skill-categories', where: everything, context })
for (const category of skillCategories) {
  await payload.create({ collection: 'skill-categories', data: category, context })
}

payload.logger.info('Seed complete')
process.exit(0)
