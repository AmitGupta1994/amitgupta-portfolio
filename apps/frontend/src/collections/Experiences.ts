import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'date', 'order'],
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
}
