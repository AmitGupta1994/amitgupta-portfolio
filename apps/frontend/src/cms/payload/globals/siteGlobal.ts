import type { Field, GlobalConfig } from 'payload'

import type { SiteKey } from '@/types/sites'
import { SITE_LABELS } from '@/types/sites'
import { publicRead } from '../access/publicRead'
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite'

export interface SiteDefaults {
  site: SiteKey
  /** Site identity, e.g. "Research". */
  title: string
  tagline: string
  name: string
  headline: string
  imageUrl: string
  /** About copy, HTML. */
  summary: string
  heroTitle: string
  heroDescription: Array<{ text: string; highlight?: boolean }>
  ctaLabel: string
  nav: Array<{ name: string; href: string }>
  /** Fields only this site's global carries, appended after the shared ones. */
  extraFields?: Field[]
}

/**
 * One global per site, holding that site's whole identity: profile details,
 * contact, About copy, hero and navigation. Sites share no rows, so each can be
 * edited (or exported) on its own.
 */
export const createSiteGlobal = (defaults: SiteDefaults): GlobalConfig => ({
  slug: defaults.site,
  label: SITE_LABELS[defaults.site],
  admin: { group: SITE_LABELS[defaults.site] },
  access: { read: publicRead },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: defaults.title },
        { name: 'tagline', type: 'text', defaultValue: defaults.tagline },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, defaultValue: defaults.name },
        { name: 'headline', type: 'text', required: true, defaultValue: defaults.headline },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'External image URL',
      defaultValue: defaults.imageUrl,
      admin: { description: 'Used when no image is uploaded.' },
    },
    {
      name: 'mainSiteUrl',
      type: 'text',
      label: 'Main portfolio URL',
      admin: {
        description:
          'Absolute URL of the main portfolio, e.g. https://guptaamit.com.np — other sites link back to it. A relative "/" would loop on a subdomain.',
      },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text', required: true },
            { name: 'location', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'whatsapp', type: 'text', label: 'WhatsApp URL' },
            { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
            { name: 'github', type: 'text', label: 'GitHub URL' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'freelancer', type: 'text', label: 'Freelancer URL' },
            { name: 'googleScholar', type: 'text', label: 'Google Scholar URL' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'instagram', type: 'text', label: 'Instagram URL' },
            { name: 'youtube', type: 'text', label: 'YouTube URL' },
            { name: 'facebook', type: 'text', label: 'Facebook URL' },
          ],
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      defaultValue: defaults.summary,
      admin: { rows: 8, description: 'About copy for this site. Rendered as HTML.' },
    },
    {
      name: 'hero',
      type: 'group',
      admin: { description: "This site's full-screen hero." },
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: defaults.heroTitle },
        {
          name: 'description',
          type: 'array',
          labels: { singular: 'Segment', plural: 'Segments' },
          defaultValue: defaults.heroDescription,
          admin: {
            description:
              'Joined in order into one paragraph (include spaces at the edges). Tick "highlight" to colour a segment.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'text', type: 'text', required: true },
                { name: 'highlight', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Call to action',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, defaultValue: defaults.ctaLabel },
                { name: 'href', type: 'text', required: true, defaultValue: '/#contact' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'nav',
      type: 'array',
      labels: { singular: 'Link', plural: 'Navigation' },
      defaultValue: defaults.nav,
      admin: { description: "This site's own navigation; hrefs are section ids on its page." },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', admin: { description: 'Defaults to "<name> | <title>".' } },
        { name: 'description', type: 'textarea' },
      ],
    },
    ...(defaults.extraFields ?? []),
  ],
})
