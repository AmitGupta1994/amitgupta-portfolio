import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { orderField } from '../fields/order'
import { SITE_OPTIONS } from '../fields/placements'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite'

/** YouTube films. Only the URL is stored — YouTube does the hosting. */
export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'album', 'order'],
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
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'YouTube URL',
      admin: { description: 'Any YouTube link: watch?v=…, youtu.be/… or /shorts/….' },
    },
    { name: 'description', type: 'textarea' },
    { name: 'album', type: 'text', admin: { description: 'Optional grouping, e.g. a trek name.' } },
    {
      name: 'site',
      type: 'select',
      required: true,
      defaultValue: 'trek',
      options: SITE_OPTIONS,
      admin: { position: 'sidebar', description: 'Which site these films belong to.' },
    },
    orderField,
  ],
}
