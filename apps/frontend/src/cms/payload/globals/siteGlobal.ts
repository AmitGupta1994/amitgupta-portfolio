import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite'

interface SiteGlobalArgs {
  /** Matches the SiteKey and the subdomain, e.g. 'research'. */
  slug: string
  label: string
  title: string
  tagline: string
  about: string
  aboutHint: string
  nav: Array<{ name: string; href: string }>
}

/**
 * One shape for every standalone site (research, trek, creatives…): its own
 * title, hero override, About copy, navigation and SEO. Content items are shared
 * across sites through placements; this is the per-site writing.
 */
export const createSiteGlobal = ({
  slug,
  label,
  title,
  tagline,
  about,
  aboutHint,
  nav,
}: SiteGlobalArgs): GlobalConfig => ({
  slug,
  label,
  access: {
    read: publicRead,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: title },
        { name: 'tagline', type: 'text', defaultValue: tagline },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      admin: { description: 'Optional. Leave empty to reuse the main portfolio hero.' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea', admin: { rows: 3 } },
      ],
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
      defaultValue: about,
      admin: { rows: 8, description: `Rendered as HTML, so inline tags like <strong> are allowed. ${aboutHint}` },
    },
    {
      name: 'nav',
      type: 'array',
      labels: { singular: 'Link', plural: 'Navigation' },
      admin: { description: "This site's own navigation. Hrefs are section ids on its page." },
      defaultValue: nav,
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
  ],
})
