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
