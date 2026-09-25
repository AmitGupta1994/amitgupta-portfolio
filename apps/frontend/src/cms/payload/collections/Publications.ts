import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { placementsField } from '../fields/placements'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'order'],
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
    { name: 'authors', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'text', required: true, admin: { description: 'e.g. "2024, September"' } },
        { name: 'publisher', type: 'text', required: true },
      ],
    },
    orderField,
    placementsField,
  ],
}
