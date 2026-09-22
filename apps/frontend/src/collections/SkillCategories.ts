import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'show'],
  },
  defaultSort: 'priority',
  access: {
    read: publicRead,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
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
    {
      name: 'show',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
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
}
