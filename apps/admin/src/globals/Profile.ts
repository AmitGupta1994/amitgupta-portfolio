import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { revalidateGlobalAfterChange } from '../hooks/revalidateFrontend'

export const Profile: GlobalConfig = {
  slug: 'profile',
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
        { name: 'name', type: 'text', required: true },
        { name: 'headline', type: 'text', required: true },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'External image URL',
      admin: { description: 'Used when no image is uploaded.' },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text', required: true },
            { name: 'location', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'whatsapp', type: 'text', label: 'WhatsApp URL' },
            { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
            { name: 'github', type: 'text', label: 'GitHub URL' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'freelancer', type: 'text', label: 'Freelancer URL' },
            { name: 'googleScholar', type: 'text', label: 'Google Scholar URL' },
          ],
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        rows: 10,
        description: 'Rendered as HTML, so inline tags like <strong> are allowed.',
      },
    },
  ],
}
