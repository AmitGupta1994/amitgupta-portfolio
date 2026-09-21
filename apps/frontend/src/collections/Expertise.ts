import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const Expertise: CollectionConfig = {
  slug: 'expertise',
  labels: { singular: 'Expertise', plural: 'Expertise' },
  admin: {
    useAsTitle: 'domain',
    defaultColumns: ['domain', 'years', 'order'],
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
}
