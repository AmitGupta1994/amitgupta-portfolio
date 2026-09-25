import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { placementsField } from '../fields/placements'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
  },
  defaultSort: 'order',
  access: {
    read: publicRead,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
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
    placementsField,
  ],
}
