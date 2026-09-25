import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { SITE_OPTIONS } from '../fields/placements'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

/** Photo galleries for the trek and creatives sites. Uploads go to Vercel Blob in production. */
export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'album', 'order'],
  },
  defaultSort: 'order',
  access: {
    read: publicRead,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'caption', type: 'text', admin: { description: 'Shown under the photo and used as its alt text.' } },
    {
      type: 'row',
      fields: [
        { name: 'album', type: 'text', admin: { description: 'Groups photos, e.g. "Everest Base Camp 2024".' } },
        { name: 'location', type: 'text' },
      ],
    },
    {
      name: 'site',
      type: 'select',
      required: true,
      defaultValue: 'trek',
      options: SITE_OPTIONS,
      admin: { position: 'sidebar', description: 'Which site these photos belong to.' },
    },
    orderField,
  ],
}
