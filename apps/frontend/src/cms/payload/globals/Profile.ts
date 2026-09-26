import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite'

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
    {
      name: 'hero',
      type: 'group',
      admin: { description: 'Copy for the full-screen hero section.' },
      fields: [
        // Defaults on the required hero fields let the schema push add these columns to
        // an existing profile row without a data-loss prompt.
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Engineering systems that scale',
        },
        {
          name: 'description',
          type: 'array',
          labels: { singular: 'Segment', plural: 'Segments' },
          admin: {
            description:
              'Joined in order into one paragraph (include spaces at the edges). Tick "highlight" to colour a segment.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'text', type: 'text', required: true },
                { name: 'highlight', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Call to action',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, defaultValue: "Let's build together" },
                { name: 'href', type: 'text', required: true, defaultValue: '/#contact' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'mainSiteUrl',
      type: 'text',
      label: 'Main portfolio URL',
      admin: {
        description:
          'Absolute URL of the main portfolio, e.g. https://guptaamit.com.np — the other sites link back to it. A relative "/" would loop on a subdomain.',
      },
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
