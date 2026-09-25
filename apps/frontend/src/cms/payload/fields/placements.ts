import type { ArrayField } from 'payload'

export const SITE_OPTIONS = [
  { label: 'Research (research.…)', value: 'research' },
]

/**
 * Which other sites an item appears on, and where in their order.
 * The main portfolio keeps using each collection's own `order` / `priority`,
 * so existing content needs no placements at all.
 */
export const placementsField: ArrayField = {
  name: 'placements',
  type: 'array',
  label: 'Also show on',
  labels: { singular: 'Placement', plural: 'Placements' },
  admin: {
    description:
      'Add a row per other site this should appear on, with its position there (lower shows first). Leave empty to keep it on the main portfolio only.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'site', type: 'select', required: true, defaultValue: 'research', options: SITE_OPTIONS },
        { name: 'order', type: 'number', required: true, defaultValue: 0 },
      ],
    },
  ],
}
