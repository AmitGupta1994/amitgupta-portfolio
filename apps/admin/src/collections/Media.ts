import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicRead,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
  },
}
