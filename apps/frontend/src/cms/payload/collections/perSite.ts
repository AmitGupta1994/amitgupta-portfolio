import type { CollectionConfig } from 'payload'

import type { SiteKey } from '@/types/sites'
import { SITE_LABELS } from '@/types/sites'
import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

/**
 * Every content type exists once per site, as its own collection
 * (`tech-experiences`, `trek-photos`, …). Nothing is shared between sites, so a
 * site's data is a set of whole tables — straightforward to export or to move
 * into its own project later.
 */
const base = (site: SiteKey, type: string, singular: string, plural: string): CollectionConfig => ({
  slug: `${site}-${type}`,
  labels: { singular, plural },
  admin: { group: SITE_LABELS[site] },
  defaultSort: 'order',
  access: { read: publicRead },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [],
})

export const createExperiences = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'experiences', 'Experience', 'Experience'),
  admin: { ...base(site, 'experiences', '', '').admin, useAsTitle: 'role', defaultColumns: ['role', 'company', 'date', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'role', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
      ],
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: { description: 'Shown as written, e.g. "07/01/2024 - Current".' },
    },
    { name: 'description', type: 'textarea', required: true },
    orderField,
  ],
})

export const createSkillCategories = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'skill-categories', 'Skill category', 'Skill categories'),
  defaultSort: 'priority',
  admin: { ...base(site, 'skills', '', '').admin, useAsTitle: 'title', defaultColumns: ['title', 'priority', 'show'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'key',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'Stable identifier, e.g. "web".' },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Skill', plural: 'Skills' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'rating', type: 'number', required: true, min: 0, max: 10 },
          ],
        },
      ],
    },
    { name: 'show', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    {
      name: 'priority',
      type: 'number',
      required: true,
      defaultValue: 99,
      min: 1,
      max: 99,
      admin: { position: 'sidebar', description: '1 is highest priority.' },
    },
  ],
})

export const createExpertise = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'expertise', 'Expertise', 'Expertise'),
  admin: { ...base(site, 'expertise', '', '').admin, useAsTitle: 'domain', defaultColumns: ['domain', 'years', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'domain', type: 'text', required: true },
        { name: 'years', type: 'text', admin: { description: 'e.g. "4+ Years"' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    orderField,
  ],
})

export const createProjects = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'projects', 'Project', 'Projects'),
  admin: { ...base(site, 'projects', '', '').admin, useAsTitle: 'title', defaultColumns: ['title', 'order', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'techStack',
      type: 'array',
      labels: { singular: 'Technology', plural: 'Tech stack' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'githubUrl', type: 'text', label: 'GitHub URL' },
        { name: 'liveUrl', type: 'text', label: 'Live URL' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'External image URL',
      admin: { description: 'Used when no image is uploaded.' },
    },
    orderField,
  ],
})

export const createPublications = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'publications', 'Publication', 'Publications'),
  admin: { ...base(site, 'publications', '', '').admin, useAsTitle: 'title', defaultColumns: ['title', 'date', 'order'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'authors', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'text', required: true, admin: { description: 'e.g. "2024, September"' } },
        { name: 'publisher', type: 'text', required: true },
      ],
    },
    orderField,
  ],
})

/** Uploads go to Vercel Blob in production; see the plugin list in payload.config.ts. */
export const createPhotos = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'photos', 'Photo', 'Photos'),
  admin: { ...base(site, 'photos', '', '').admin, useAsTitle: 'caption', defaultColumns: ['caption', 'album', 'order'] },
  upload: { mimeTypes: ['image/*'] },
  fields: [
    { name: 'caption', type: 'text', admin: { description: 'Shown under the photo and used as its alt text.' } },
    {
      type: 'row',
      fields: [
        { name: 'album', type: 'text', admin: { description: 'Groups photos, e.g. "Everest Base Camp 2024".' } },
        { name: 'location', type: 'text' },
      ],
    },
    orderField,
  ],
})

/** Only the YouTube URL is stored — YouTube does the hosting. */
export const createVideos = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'videos', 'Film', 'Films'),
  admin: { ...base(site, 'videos', '', '').admin, useAsTitle: 'title', defaultColumns: ['title', 'album', 'order'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'YouTube URL',
      admin: { description: 'Any YouTube link: watch?v=…, youtu.be/… or /shorts/….' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'album',
      type: 'text',
      admin: { description: 'Optional grouping, e.g. a trek name; the creatives site shows one card per album.' },
    },
    orderField,
  ],
})


/** Trekking routes, each with its own page at /trek/<slug>. */
export const createTreks = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'treks', 'Trek', 'Treks'),
  admin: { ...base(site, 'treks', '', '').admin, useAsTitle: 'title', defaultColumns: ['title', 'region', 'days', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'URL segment, e.g. "everest-base-camp" → /trek/everest-base-camp.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'region', type: 'text', admin: { description: 'e.g. "Khumbu, Nepal"' } },
        { name: 'season', type: 'text', admin: { description: 'e.g. "Mar–May, Sep–Nov"' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'days', type: 'number', admin: { description: 'Typical days on the trail.' } },
        { name: 'maxAltitudeM', type: 'number', label: 'Max altitude (m)' },
        { name: 'distanceKm', type: 'number', label: 'Distance (km)' },
      ],
    },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'One or two lines, shown on the cards.' } },
    {
      name: 'body',
      type: 'textarea',
      admin: { rows: 10, description: 'Your account of the trek. Rendered as HTML; leave empty to show only the summary.' },
    },
    { name: 'heroImage', type: 'upload', relationTo: `${site}-photos` as 'trek-photos' },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: `${site}-photos` as 'trek-photos',
      hasMany: true,
      admin: { description: 'Photos shown on this trek\'s page.' },
    },
    orderField,
  ],
})

/** Icons a service card can show; the creatives site draws each one. */
export const SERVICE_ICONS = ['megaphone', 'palette', 'chart', 'camera', 'video', 'pen', 'search', 'globe'] as const

/** What the agency offers: a card with a short line and more detail on hover. */
export const createServices = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'services', 'Service', 'Services'),
  admin: { ...base(site, 'services', '', '').admin, useAsTitle: 'title', defaultColumns: ['title', 'icon', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'megaphone',
          options: SERVICE_ICONS.map((value) => ({ label: value, value })),
        },
      ],
    },
    { name: 'description', type: 'textarea', required: true, admin: { description: 'One line, always shown.' } },
    { name: 'details', type: 'textarea', admin: { description: 'Revealed when the card is hovered or focused.' } },
    orderField,
  ],
})

/** Priced packages; one may be flagged as the most popular. */
export const createPackages = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'packages', 'Package', 'Packages'),
  admin: { ...base(site, 'packages', '', '').admin, useAsTitle: 'name', defaultColumns: ['name', 'price', 'popular', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true, admin: { description: 'Shown as written, e.g. "NPR 15,000".' } },
        { name: 'period', type: 'text', admin: { description: 'e.g. "per month", "one-off".' } },
      ],
    },
    { name: 'description', type: 'text', required: true },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'popular', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Highlights this package.' } },
    orderField,
  ],
})

/** Client testimonials. Add only real ones, ideally with a link to the source. */
export const createReviews = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'reviews', 'Review', 'Reviews'),
  admin: { ...base(site, 'reviews', '', '').admin, useAsTitle: 'name', defaultColumns: ['name', 'company', 'rating', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
      ],
    },
    { name: 'text', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'rating', type: 'number', required: true, defaultValue: 5, min: 1, max: 5 },
        { name: 'avatarUrl', type: 'text', label: 'Avatar URL' },
        { name: 'link', type: 'text', label: 'Source URL', admin: { description: 'Where the review was left, if public.' } },
      ],
    },
    orderField,
  ],
})

/** A company site's people. Photos live in the site's own photo collection. */
export const createTeam = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'team', 'Team member', 'Team'),
  admin: { ...base(site, 'team', '', '').admin, useAsTitle: 'name', defaultColumns: ['name', 'role', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true, admin: { description: 'e.g. "Creative Director"' } },
      ],
    },
    { name: 'bio', type: 'textarea', admin: { description: 'One or two lines.' } },
    { name: 'photo', type: 'upload', relationTo: `${site}-photos` as 'voxelate-photos' },
    {
      type: 'row',
      fields: [
        { name: 'photoUrl', type: 'text', label: 'External photo URL', admin: { description: 'Used when no photo is uploaded.' } },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
      ],
    },
    orderField,
  ],
})

/** Brands a company site has worked for, shown as a logo strip. */
export const createClients = (site: SiteKey): CollectionConfig => ({
  ...base(site, 'clients', 'Client', 'Clients'),
  admin: { ...base(site, 'clients', '', '').admin, useAsTitle: 'name', defaultColumns: ['name', 'website', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'website', type: 'text', label: 'Website URL' },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: `${site}-photos` as 'voxelate-photos' },
    { name: 'logoUrl', type: 'text', label: 'External logo URL', admin: { description: 'Used when no logo is uploaded; the name shows when neither is set.' } },
    orderField,
  ],
})

/** The studio layout's tables: the personal site and the company site share these. */
const STUDIO_SITES: SiteKey[] = ['creatives', 'voxelate']

/** Types every site gets, plus the ones only some sites need. */
export const collectionsForSite = (site: SiteKey): CollectionConfig[] => [
  createExperiences(site),
  createSkillCategories(site),
  createExpertise(site),
  createProjects(site),
  createPublications(site),
  createPhotos(site),
  createVideos(site),
  ...(site === 'trek' ? [createTreks(site)] : []),
  ...(STUDIO_SITES.includes(site) ? [createServices(site), createPackages(site), createReviews(site)] : []),
  ...(site === 'voxelate' ? [createTeam(site), createClients(site)] : []),
]
