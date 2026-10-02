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
    { name: 'album', type: 'text', admin: { description: 'Optional grouping, e.g. a trek name.' } },
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
]
