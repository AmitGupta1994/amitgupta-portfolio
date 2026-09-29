// Replaces every site's content with src/cms/payload/seed/data.ts. Run with `npm run seed`.
// Users and uploaded media are left untouched.
import { getPayload } from 'payload'

import { SITES } from '@/types/sites'
import config from '../payload.config'
import { siteContent, siteGlobals } from './data'

// Seeding writes dozens of docs; skip the per-save revalidation and CDN purge.
const context = { disableRevalidate: true }
const everything = { id: { exists: true } }

const payload = await getPayload({ config })

for (const site of SITES) {
  await payload.updateGlobal({ slug: site, data: siteGlobals[site], context })

  const content = siteContent[site]

  await payload.delete({ collection: `${site}-experiences`, where: everything, context })
  for (const [order, experience] of content.experiences.entries()) {
    await payload.create({ collection: `${site}-experiences`, data: { ...experience, order }, context })
  }

  await payload.delete({ collection: `${site}-expertise`, where: everything, context })
  for (const [order, item] of content.expertise.entries()) {
    await payload.create({ collection: `${site}-expertise`, data: { ...item, order }, context })
  }

  await payload.delete({ collection: `${site}-publications`, where: everything, context })
  for (const [order, publication] of content.publications.entries()) {
    await payload.create({ collection: `${site}-publications`, data: { ...publication, order }, context })
  }

  await payload.delete({ collection: `${site}-projects`, where: everything, context })
  for (const [order, project] of content.projects.entries()) {
    await payload.create({
      collection: `${site}-projects`,
      data: { ...project, techStack: project.techStack.map((name) => ({ name })), order },
      context,
    })
  }

  await payload.delete({ collection: `${site}-skill-categories`, where: everything, context })
  for (const category of content.skillCategories) {
    await payload.create({ collection: `${site}-skill-categories`, data: category, context })
  }

  payload.logger.info(`Seeded ${site}`)
}

payload.logger.info('Seed complete')
process.exit(0)
