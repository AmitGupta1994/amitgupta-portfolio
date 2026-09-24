import type { NumberField } from 'payload'

export const orderField: NumberField = {
  name: 'order',
  type: 'number',
  required: true,
  defaultValue: 0,
  admin: {
    position: 'sidebar',
    description: 'Lower numbers appear first.',
  },
}
