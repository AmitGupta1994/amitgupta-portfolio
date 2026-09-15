import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { revalidateGlobalAfterChange } from '../hooks/revalidateFrontend'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: publicRead,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      labels: { singular: 'Link', plural: 'Links' },
      admin: {
        description: 'Each href must point at a section id on the home page, e.g. "/#about".',
      },
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
  ],
}
