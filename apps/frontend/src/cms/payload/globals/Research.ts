import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/publicRead'
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite'

/** Copy for the research site (research.<domain>). */
export const Research: GlobalConfig = {
  slug: 'research',
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
        { name: 'title', type: 'text', required: true, defaultValue: 'Research' },
        {
          name: 'tagline',
          type: 'text',
          defaultValue: 'Gait analysis, sensing hardware and applied machine learning',
        },
      ],
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
      defaultValue:
        'I work at the intersection of <strong>research and engineering</strong>: building the sensing hardware, computer-vision pipelines and data analysis behind human gait studies, then turning the results into software that runs reliably outside the lab. My published work covers FSR-instrumented insoles, pose-estimation based joint measurement and machine learning for fault detection.',
      admin: {
        rows: 8,
        description: 'Rendered as HTML, so inline tags like <strong> are allowed. Research and coding focus.',
      },
    },
    {
      name: 'nav',
      type: 'array',
      labels: { singular: 'Link', plural: 'Navigation' },
      admin: { description: 'This site\'s own navigation. Hrefs are section ids on the research page.' },
      defaultValue: [
        { name: 'Home', href: '/#hero' },
        { name: 'About', href: '/#about' },
        { name: 'Publications', href: '/#publications' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Contact', href: '/#contact' },
      ],
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', admin: { description: 'Defaults to "<name> | Research".' } },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
