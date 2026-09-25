import { createSiteGlobal } from './siteGlobal'

/** Copy for the research site (research.<domain>). */
export const Research = createSiteGlobal({
  slug: 'research',
  label: 'Research site',
  title: 'Research',
  tagline: 'Gait analysis, sensing hardware and applied machine learning',
  about:
    'I work at the intersection of <strong>research and engineering</strong>: building the sensing hardware, computer-vision pipelines and data analysis behind human gait studies, then turning the results into software that runs reliably outside the lab. My published work covers FSR-instrumented insoles, pose-estimation based joint measurement and machine learning for fault detection.',
  aboutHint: 'Research and coding focus.',
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Publications', href: '/#publications' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ],
})
