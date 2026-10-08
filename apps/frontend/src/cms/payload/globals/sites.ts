import type { Field } from 'payload'

import { createSiteGlobal } from './siteGlobal'

const CONTACT_NOTE = 'Kathmandu (Nepal)'

/** The tech portfolio: the software engineering site on the apex/www/tech hosts. */
export const TechSite = createSiteGlobal({
  site: 'tech',
  title: 'Portfolio',
  tagline: 'Backend-focused full stack engineering',
  name: 'Amit Gupta',
  headline: 'Lead Engineer | Full Stack Engineer (Backend-Focused)',
  imageUrl: 'https://github.com/amitgupta1994.png',
  summary:
    'Tech Lead and Full Stack Engineer (Backend-Focused) with <strong>7+ years</strong> of experience architecting scalable systems, from requirement gathering and MVP development through cloud deployment and monitoring.',
  heroTitle: 'Engineering systems that scale',
  heroDescription: [
    { text: 'Lead engineer building ' },
    { text: 'resilient backends', highlight: true },
    { text: ', ' },
    { text: 'AI-native products', highlight: true },
    { text: ' and cloud platforms that grow from first MVP to ' },
    { text: 'high-concurrency scale', highlight: true },
    { text: '.' },
  ],
  ctaLabel: "Let's build together",
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Publications', href: '/#publications' },
    { name: 'Articles', href: '/#articles' },
    { name: 'Contact', href: '/#contact' },
  ],
})

/** The research site: publications, research posts and the skills behind them. */
export const ResearchSite = createSiteGlobal({
  site: 'research',
  title: 'Research',
  tagline: 'Gait analysis, sensing hardware and applied machine learning',
  name: 'Amit Gupta',
  headline: 'Researcher | Human gait analysis and applied machine learning',
  imageUrl: 'https://github.com/amitgupta1994.png',
  summary:
    'I work where <strong>research meets engineering</strong>: building the sensing hardware, computer-vision pipelines and analysis behind human gait studies, then turning the results into software that holds up outside the lab.',
  heroTitle: 'Measuring how people move',
  heroDescription: [
    { text: 'Published work on ' },
    { text: 'gait analysis', highlight: true },
    { text: ', ' },
    { text: 'FSR-instrumented insoles', highlight: true },
    { text: ' and pose-estimation based measurement, with the data pipelines behind them.' },
  ],
  ctaLabel: 'Get in touch',
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Publications', href: '/#publications' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ],
})

/** The trekking site: routes walked, photographs and films. */
export const TrekSite = createSiteGlobal({
  site: 'trek',
  title: 'Trek',
  tagline: `Himalayan trails, long walks and the gear that survives them — ${CONTACT_NOTE}`,
  name: 'Amit Gupta',
  headline: 'Trekker | Himalayan trails',
  imageUrl: 'https://github.com/amitgupta1994.png',
  summary:
    'Away from the screen I walk. This is where the <strong>trails, passes and altitude</strong> live — the routes covered in Nepal and beyond, with the photographs and films that came back from them.',
  heroTitle: 'Walking the Himalaya',
  heroDescription: [
    { text: 'Trails, passes and ' },
    { text: 'high camps', highlight: true },
    { text: ' — the routes, the photographs and the films.' },
  ],
  ctaLabel: 'Say hello',
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Photos', href: '/#photos' },
    { name: 'Films', href: '/#videos' },
    { name: 'Treks', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ],
})

/** Headline figures under a studio site's hero. */
const statsField: Field = {
  name: 'stats',
  type: 'array',
  labels: { singular: 'Stat', plural: 'Stats' },
  admin: { description: 'Figures under the hero, e.g. "120+" / "Campaigns launched". Hidden when empty.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

/** A company site's registered details, shown in the footer. */
const companyField: Field = {
  name: 'company',
  type: 'group',
  admin: { description: 'Shown in the footer.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'legalName', type: 'text', admin: { description: 'Registered name, e.g. "Voxelate Pvt. Ltd."; defaults to the title.' } },
        { name: 'founded', type: 'text', admin: { description: 'Year, e.g. "2024".' } },
      ],
    },
  ],
}

const STUDIO_NAV = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'Packages', href: '/#packages' },
  { name: 'Work', href: '/#work' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'Contact', href: '/#contact' },
]

/** Amit's own digital marketing & branding practice — written in the first person. */
export const CreativesSite = createSiteGlobal({
  site: 'creatives',
  title: 'Creatives',
  tagline: 'Digital marketing & branding',
  name: 'Amit Gupta',
  headline: 'Digital Marketing & Branding',
  imageUrl: 'https://github.com/amitgupta1994.png',
  summary:
    'I help businesses build brands people remember and campaigns that pay for themselves — strategy, identity, content and performance marketing, done hands-on.',
  heroTitle: 'Ideas that move people',
  heroDescription: [
    { text: 'I craft ' },
    { text: 'brand identities', highlight: true },
    { text: ', ' },
    { text: 'social content', highlight: true },
    { text: ' and ' },
    { text: 'performance campaigns', highlight: true },
    { text: ' for businesses ready to grow.' },
  ],
  ctaLabel: 'Work with me',
  nav: STUDIO_NAV,
  extraFields: [statsField],
})

/** Voxelate, the digital marketing & branding company — written as "we". */
export const VoxelateSite = createSiteGlobal({
  site: 'voxelate',
  title: 'Voxelate',
  tagline: 'Digital marketing & branding company',
  name: 'Voxelate',
  headline: 'Digital Marketing & Branding',
  // The logo mark (public/voxelate); shown in the nav and hero. Share previews use
  // the opengraph-image file in the route instead.
  imageUrl: '/voxelate/logo-mark.jpg',
  summary:
    'Voxelate is a digital marketing and branding company. Our team of strategists, designers and creators builds brands people remember and campaigns that pay for themselves.',
  heroTitle: 'Brands built to be remembered',
  heroDescription: [
    { text: 'Our team delivers ' },
    { text: 'brand strategy', highlight: true },
    { text: ', ' },
    { text: 'creative production', highlight: true },
    { text: ' and ' },
    { text: 'performance marketing', highlight: true },
    { text: ' for growing businesses.' },
  ],
  ctaLabel: 'Start a project',
  nav: [
    ...STUDIO_NAV.slice(0, 4),
    { name: 'Team', href: '/#team' },
    ...STUDIO_NAV.slice(4),
  ],
  extraFields: [
    statsField,
    companyField,
  ],
})

/**
 * The software development company: same Digital Mantras design as the tech
 * portfolio, written as "we". Placeholder name until the company is named.
 */
export const TechCompanySite = createSiteGlobal({
  site: 'techcompany',
  title: 'TechCompany',
  tagline: 'Software development company',
  name: 'TechCompany',
  headline: 'Software Development Company',
  imageUrl: '/techcompany/logo.png',
  summary:
    'We are a software development company that designs, builds and runs <strong>scalable web and mobile products</strong>, <strong>AI systems</strong> and the cloud infrastructure under them. Clients hire us as dedicated engineers at a fixed monthly rate, by the hour, or to deliver an outsourced project end to end — and we build and ship products of our own.',
  heroTitle: 'Software built to scale',
  heroDescription: [
    { text: 'We design and build ' },
    { text: 'web & mobile apps', highlight: true },
    { text: ', ' },
    { text: 'AI systems', highlight: true },
    { text: ' and the ' },
    { text: 'cloud infrastructure', highlight: true },
    { text: ' they run on — as your team, by the hour, or end to end.' },
  ],
  ctaLabel: 'Start a project',
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Engagement', href: '/#engagement' },
    { name: 'Products', href: '/#products' },
    { name: 'Work', href: '/#projects' },
    { name: 'Process', href: '/#process' },
    { name: 'Stack', href: '/#skills' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ],
  extraFields: [
    statsField,
    {
      name: 'process',
      type: 'array',
      labels: { singular: 'Step', plural: 'Process' },
      admin: { description: 'How a project runs, in order. Hidden when empty.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    companyField,
  ],
})

/** Mokshya Trails, the trekking company: same design as the trek site, written as "we". */
export const MokshyaTrailsSite = createSiteGlobal({
  site: 'mokshyatrails',
  title: 'Mokshya Trails',
  tagline: 'Trekking company in Nepal',
  name: 'Mokshya Trails',
  headline: 'Guided treks in the Himalaya',
  imageUrl: '/mokshyatrails/logo.png',
  summary:
    'Mokshya Trails is a Nepal-based trekking company. Our licensed guides and porters lead small groups on the Himalaya\'s classic routes and quieter valleys — with permits, lodges and logistics handled, so you can <strong>just walk</strong>.',
  heroTitle: 'Walk the Himalaya with us',
  heroDescription: [
    { text: 'Guided treks to ' },
    { text: 'Everest', highlight: true },
    { text: ', ' },
    { text: 'Annapurna', highlight: true },
    { text: ' and ' },
    { text: 'Langtang', highlight: true },
    { text: ' — small groups, local guides, every detail handled.' },
  ],
  ctaLabel: 'Plan your trek',
  // Sections use "/#…" like the other sites (served at the subdomain root); pages use
  // the /mokshyatrails/… form so they work on the subdomain and the main domain.
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Featured treks', href: '/#treks' },
    { name: 'All treks', href: '/mokshyatrails/treks' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ],
  extraFields: [
    {
      name: 'slides',
      type: 'array',
      labels: { singular: 'Slide', plural: 'Hero slides' },
      minRows: 1,
      maxRows: 5,
      admin: { description: 'The home page slider, in order. Three works best.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'mokshyatrails-photos' },
        { name: 'imageUrl', type: 'text', label: 'External image URL', admin: { description: 'Used when no image is uploaded.' } },
        {
          type: 'row',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { description: 'Small line above the title.' } },
            { name: 'title', type: 'text', required: true },
          ],
        },
        { name: 'description', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'ctaLabel', type: 'text', label: 'Button label' },
            { name: 'ctaHref', type: 'text', label: 'Button link', admin: { description: 'e.g. /mokshyatrails/treks/everest-base-camp' } },
          ],
        },
      ],
    },
    statsField,
    companyField,
  ],
})
