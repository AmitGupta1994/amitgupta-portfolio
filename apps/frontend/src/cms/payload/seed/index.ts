// Replaces site content with src/cms/payload/seed/data.ts. Run with `npm run seed`.
// SEED_SITES=creatives (comma-separated) limits it to those sites and leaves the rest alone.
// Users and uploaded media are left untouched.
import { getPayload } from 'payload'

import { SITES, type SiteKey } from '@/types/sites'
import config from '../payload.config'
import { siteContent, siteGlobals } from './data'

// Seeding writes dozens of docs; skip the per-save revalidation and CDN purge.
const context = { disableRevalidate: true }
const everything = { id: { exists: true } }

const requested = process.env.SEED_SITES?.split(',').map((site) => site.trim()).filter(Boolean)
const unknown = requested?.filter((site) => !SITES.includes(site as SiteKey)) ?? []
if (unknown.length > 0) {
  throw new Error(`Unknown site(s) in SEED_SITES: ${unknown.join(', ')}. Known: ${SITES.join(', ')}`)
}
const sites = requested?.length ? (requested as SiteKey[]) : SITES

const payload = await getPayload({ config })

for (const site of sites) {
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

  if (site === 'trek') {
    await payload.delete({ collection: 'trek-treks', where: everything, context })
    for (const [order, trek] of content.treks.entries()) {
      await payload.create({ collection: 'trek-treks', data: { ...trek, order }, context })
    }
  }

  if (site === 'mokshyatrails') {
    await payload.delete({ collection: 'mokshyatrails-treks', where: everything, context })
    for (const [order, trek] of content.trekPackages.entries()) {
      await payload.create({
        collection: 'mokshyatrails-treks',
        data: {
          ...trek,
          includes: trek.includes.map((text) => ({ text })),
          excludes: trek.excludes.map((text) => ({ text })),
          order,
        },
        context,
      })
    }
    // Booking requests and reviews are real records: never touched by the seed.
  }

  if (site === 'creatives' || site === 'voxelate' || site === 'techcompany') {
    await payload.delete({ collection: `${site}-services`, where: everything, context })
    for (const [order, service] of content.services.entries()) {
      await payload.create({ collection: `${site}-services`, data: { ...service, order }, context })
    }

    await payload.delete({ collection: `${site}-packages`, where: everything, context })
    for (const [order, pkg] of content.packages.entries()) {
      await payload.create({
        collection: `${site}-packages`,
        data: { ...pkg, features: pkg.features.map((text) => ({ text })), order },
        context,
      })
    }
    // Reviews, team, clients and products are left alone: they are real facts added in the admin.
  }

  await payload.delete({ collection: `${site}-skill-categories`, where: everything, context })
  for (const category of content.skillCategories) {
    await payload.create({ collection: `${site}-skill-categories`, data: category, context })
  }

  payload.logger.info(`Seeded ${site}`)
}

payload.logger.info('Seed complete')
process.exit(0)
