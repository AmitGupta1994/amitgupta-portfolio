import type { ServiceIcon } from '@/types/creatives'

// Seed content, one block per site. Every site owns its own tables, so the same
// fact can appear on two sites as two rows — that is the trade-off of keeping
// them separable.

const CONTACT = {
  email: 'iamitgupta1994@gmail.com',
  phone: '(+977) 9843944663',
  whatsapp: 'https://wa.me/9779843944663',
  location: 'Kathmandu (Nepal)',
  freelancer: 'https://www.freelancer.com/u/iamamitgupta1994',
  linkedin: 'https://www.linkedin.com/in/iamamitgupta1994/',
  github: 'https://github.com/amitgupta1994',
  googleScholar: 'https://scholar.google.com/citations?user=NZwhe6kAAAAJ&hl=en&oi=sra',
}

const MAIN_SITE_URL = 'https://guptaamit.com.np'
const PORTRAIT = 'https://github.com/amitgupta1994.png'

/** Values written into each site's global. Field defaults cover anything omitted. */
export const siteGlobals = {
  tech: {
    title: 'Portfolio',
    tagline: 'Backend-focused full stack engineering',
    name: 'Amit Gupta',
    headline: 'Lead Engineer | Full Stack Engineer (Backend-Focused)',
    imageUrl: PORTRAIT,
    mainSiteUrl: MAIN_SITE_URL,
    contact: CONTACT,
    summary:
      'As a Tech Lead and Full Stack Engineer (Backend-Focused) with <strong>7+ years</strong>  of experience architecting scalable systems, I drive the complete lifecycle from requirement gathering and MVP development to cloud deployment and monitoring. Communicating directly with clients, I build complex software solutions and AI-based systems. Backed by AI/ML research, I integrate AI capabilities, build AI-native products, and leverage AI-assisted coding. I am skilled in leading teams, mentoring, and applying deep expertise across Backend, Native Android, and DevOps to drive business growth. \n \n I am a pragmatic builder and debugger who approaches software development from a strict systems engineering perspective. By combining strong coding fundamentals with a highly iterative mindset, I build quickly, diagnose issues efficiently, and continuously refine architectures to scale seamlessly from initial single region deployments to high concurrency, multi sharded environments.',
    hero: {
      title: 'Engineering systems that scale',
      description: [
        { text: 'Lead engineer building ' },
        { text: 'resilient backends', highlight: true },
        { text: ', ' },
        { text: 'AI-native products', highlight: true },
        { text: ' and cloud platforms that grow from first MVP to ' },
        { text: 'high-concurrency scale', highlight: true },
        { text: '.' },
      ],
      cta: { label: "Let's build together", href: '/#contact' },
    },
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
    seo: {
      title: 'Amit Gupta | Portfolio',
      description: 'Lead engineer building resilient backends, AI-native products and cloud platforms.',
    },
  },
  research: {
    title: 'Research',
    tagline: 'Gait analysis, sensing hardware and applied machine learning',
    name: 'Amit Gupta',
    headline: 'Researcher | Human gait analysis and applied machine learning',
    imageUrl: PORTRAIT,
    mainSiteUrl: MAIN_SITE_URL,
    contact: CONTACT,
    summary:
      'I work where <strong>research meets engineering</strong>: building the sensing hardware, computer-vision pipelines and analysis behind human gait studies, then turning the results into software that holds up outside the lab. My published work covers FSR-instrumented insoles for gait phase detection, pose-estimation based joint measurement validated against Kinovea, and machine learning for fault detection in pumps. \n \n Alongside the research I build the systems it depends on — data acquisition, APIs, pipelines and deployment.',
    hero: {
      title: 'Measuring how people move',
      description: [
        { text: 'Published work on ' },
        { text: 'gait analysis', highlight: true },
        { text: ', ' },
        { text: 'FSR-instrumented insoles', highlight: true },
        { text: ' and pose-estimation based measurement, with the data pipelines behind them.' },
      ],
      cta: { label: 'Get in touch', href: '/#contact' },
    },
    nav: [
      { name: 'Home', href: '/#hero' },
      { name: 'About', href: '/#about' },
      { name: 'Publications', href: '/#publications' },
      { name: 'Experience', href: '/#experience' },
      { name: 'Skills', href: '/#skills' },
      { name: 'Contact', href: '/#contact' },
    ],
    seo: {
      title: 'Amit Gupta | Research',
      description:
        'Published research on human gait analysis, FSR insoles, pose estimation and applied machine learning.',
    },
  },
  trek: {
    title: 'Trek',
    tagline: 'Himalayan trails, long walks and the gear that survives them',
    name: 'Amit Gupta',
    headline: 'Trekker | Himalayan trails',
    imageUrl: PORTRAIT,
    mainSiteUrl: MAIN_SITE_URL,
    contact: CONTACT,
    summary:
      'Away from the screen I walk. This is where the <strong>trails, passes and altitude</strong> live — the routes, the photographs and the films. Add your treks, photos and films in the admin; sections stay hidden until they have content.',
    hero: {
      title: 'Walking the Himalaya',
      description: [
        { text: 'Trails, passes and ' },
        { text: 'high camps', highlight: true },
        { text: ' — the routes, the photographs and the films.' },
      ],
      cta: { label: 'Say hello', href: '/#contact' },
    },
    nav: [
      { name: 'Home', href: '/#hero' },
      { name: 'About', href: '/#about' },
      { name: 'Photos', href: '/#photos' },
      { name: 'Films', href: '/#videos' },
      { name: 'Treks', href: '/#treks' },
      { name: 'Skills', href: '/#skills' },
      { name: 'Contact', href: '/#contact' },
    ],
    seo: {
      title: 'Amit Gupta | Trek',
      description: 'Trekking routes in Nepal and beyond, with photographs and films.',
    },
  },
  creatives: {
    title: 'Creatives',
    tagline: 'Digital marketing & branding studio',
    name: 'Amit Gupta',
    headline: 'Digital Marketing & Branding',
    imageUrl: PORTRAIT,
    mainSiteUrl: MAIN_SITE_URL,
    contact: { email: CONTACT.email, phone: CONTACT.phone, whatsapp: CONTACT.whatsapp, location: CONTACT.location },
    summary:
      'We build brands people remember and campaigns that pay for themselves — strategy, identity, content and performance marketing under one roof.',
    hero: {
      title: 'Ideas that move people',
      description: [
        { text: 'Brand identity, ' },
        { text: 'social content', highlight: true },
        { text: ' and ' },
        { text: 'performance campaigns', highlight: true },
        { text: ' for businesses ready to grow.' },
      ],
      cta: { label: 'Get started', href: '/#contact' },
    },
    nav: [
      { name: 'Home', href: '/#home' },
      { name: 'Services', href: '/#services' },
      { name: 'Packages', href: '/#packages' },
      { name: 'Work', href: '/#work' },
      { name: 'Reviews', href: '/#reviews' },
      { name: 'Contact', href: '/#contact' },
    ],
    // Real figures only — add them in the admin; the row stays hidden while empty.
    stats: [],
    seo: {
      title: 'Creatives | Digital Marketing & Branding',
      description:
        'Brand identity, social media content and performance marketing for businesses ready to grow.',
    },
  },
}

const ALL_EXPERIENCES = [
  {
    role: 'Lead Software Engineer',
    company: 'TheGemsTech',
    date: '07/01/2024 - Current',
    description:
      'Architected and led scalable backend and application systems across fintech, ride-sharing, travel, and AI platforms, supporting multi-product architecture with CI/CD pipelines and cloud-ready deployments.',
  },
  {
    role: 'Professional Freelancer (Senior Software Engineer)',
    company: 'Freelancer.com',
    date: '17/05/2021 - Current',
    description:
      'Developed AI/ML systems including recommendation engines and generative AI applications, improving personalization quality and response relevance through NLP and machine learning pipelines.',
  },
  {
    role: 'Research Exchange',
    company: 'Department of Biomedical Engineering, IIT Hyderabad',
    date: '08/08/2023 - 08/12/2024',
    description:
      'Designed and validated BLE-enabled FSR smart insoles achieving real-time gait data acquisition with improved signal reliability and experimental accuracy for clinical research systems.',
  },
  {
    role: 'Research Assistant',
    company: 'Kathmandu University',
    date: '02/01/2022 - 02/01/2024',
    description:
      'Built computer vision gait analysis system using MediaPipe pose estimation and sensor fusion, improving movement classification robustness and real-time inference performance.',
  },
]

const ALL_EXPERTISE = [
  {
    domain: 'Total Software Development',
    years: '7+ Years',
    description:
      'Architecting, designing, and delivering end-to-end scalable solutions across web, mobile, and cloud environments while managing the full product lifecycle from initial requirements to system monitoring.',
  },
  {
    domain: 'Backend & Databases',
    years: '4+ Years',
    description:
      'Building scalable APIs and managing complex data architectures with Python, Django, FastAPI, PostgreSQL, MySQL, and MongoDB.',
  },
  {
    domain: 'DevOps & Cloud',
    years: '1.5+ Years',
    description:
      'Executing end-to-end system deployment, continuous monitoring, containerization, and CI/CD pipeline automation utilizing AWS, Docker, Nginx, and GitHub Actions.',
  },
  {
    domain: 'AI & Machine Learning',
    years: '2+ Years',
    description:
      'Leveraging university research experience to build AI-native products, integrate intelligent data-driven models into production systems, and accelerate workflows using AI-assisted coding.',
  },
  {
    domain: 'Frontend',
    years: '1+ Years',
    description:
      'Crafting dynamic, responsive, and user-centric interfaces utilizing HTML, CSS, JavaScript, React, and Next.js.',
  },
  {
    domain: 'Native Android',
    years: '4+ Years',
    description: 'Developing high-performance, robust mobile applications using Java, Kotlin, Jetpack Compose, KMM, and KMP.',
  },
  {
    domain: 'Professional Research',
    years: '2 Years',
    description:
      'Served as a Research Assistant at Design Lab, Kathmandu University, specializing in Human Gait Analysis. Authored published papers and applied Machine Learning (ML) and Computer Vision (CV) techniques to advance data-driven research.',
  },
]

const ALL_PUBLICATIONS = [
  {
    title:
      'Design of Force Sensitive Resistor (FSR) embedded insole for phase detection during human gait and its classification',
    authors: 'Pant, U., Baral, S., Gupta, A., & Shrestha, P. L.',
    date: '2024, September',
    publisher: 'IOP Conference Series: Materials Science and Engineering',
  },
  {
    title: 'Application of Machine Learning Algorithm for Fault Detection in Pump',
    authors: 'Bhattarai, A., Gupta, A., Kafle, A., Sapkota, P., Chitrakar, S., Dahlhaug, O. G., & Pradhan, S.',
    date: '2023, August',
    publisher: 'International conference on the Efficiency and Performance Engineering Network (Springer Nature)',
  },
  {
    title:
      'Knee flexion/extension angle measurement for gait analysis using machine learning solution "mediapipe pose" and its comparison with Kinovea®',
    authors: 'Gupta, A., Shrestha, P. L., Thapa, B., Silwal, R., & Shrestha, R.',
    date: '2023, March',
    publisher: 'IOP Conference Series: Materials Science and Engineering',
  },
]

const ALL_PROJECTS = [
  {
    title: 'Monorepo Portfolio',
    description:
      'A production-grade portfolio built with Next.js, Tailwind CSS, and structured for a future Django backend integration.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/amitgupta-portfolio',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Task Management API',
    description:
      'A robust backend service featuring JWT authentication, role-based access control, and comprehensive test coverage.',
    techStack: ['Django', 'Python', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/yourusername/task-api',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with Stripe payment integration, real-time inventory tracking, and an admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce-app',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Real-time Chat App',
    description:
      'A scalable chat application featuring WebSocket connections, online status indicators, and message history.',
    techStack: ['React', 'Express', 'Socket.io', 'Redis'],
    githubUrl: 'https://github.com/yourusername/chat-app',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'AI Image Generator',
    description:
      "A creative tool allowing users to generate artwork from text prompts using OpenAI's DALL-E 3 API.",
    techStack: ['Next.js', 'Tailwind', 'OpenAI API', 'Vercel'],
    githubUrl: 'https://github.com/yourusername/ai-generator',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'SaaS Analytics Dashboard',
    description: 'A comprehensive dashboard for SaaS companies to track user engagement, MRR, and churn rates.',
    techStack: ['Vue.js', 'Nuxt', 'Chart.js', 'Supabase'],
    githubUrl: 'https://github.com/yourusername/saas-dashboard',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
]

const ALL_SKILLS = [
  {
    key: 'architecture',
    title: 'System Design & Architecture',
    show: true,
    priority: 1,
    items: [
      { name: 'System Design', rating: 8 },
      { name: 'Clean Architecture', rating: 9 },
      { name: 'SOLID Principles', rating: 9 },
      { name: 'MVVM', rating: 9 },
    ],
  },
  {
    key: 'web',
    title: 'Web & Backend',
    show: true,
    priority: 2,
    items: [
      { name: 'Python', rating: 9 },
      { name: 'Django', rating: 8 },
      { name: 'PostgreSQL', rating: 8 },
      { name: 'AI/ML', rating: 8 },
    ],
  },
  {
    key: 'mobile',
    title: 'Mobile',
    show: true,
    priority: 3,
    items: [{ name: 'Android (Kotlin, KMP)', rating: 9 }],
  },
  {
    key: 'deployment',
    title: 'Deployment',
    show: true,
    priority: 4,
    items: [
      { name: 'AWS', rating: 8 },
      { name: 'Docker', rating: 8 },
      { name: 'CI/CD', rating: 8 },
    ],
  },
  {
    key: 'iot_embedded',
    title: 'IoT & Embedded Systems',
    show: true,
    priority: 7,
    items: [
      { name: 'Android TV / STB', rating: 9 },
      { name: 'AOSP Firmware', rating: 8 },
      { name: 'BLE & Sensors', rating: 7 },
      { name: 'Digital Signage Systems', rating: 8 },
    ],
  },
  {
    key: 'research',
    title: 'Research & Academic (2+ Years)',
    show: true,
    priority: 6,
    items: [
      { name: 'Data Acquisition & Analysis', rating: 8 },
      { name: 'Computer Vision (MediaPipe)', rating: 8 },
      { name: 'Sensor Fusion', rating: 7 },
      { name: 'Academic Writing', rating: 8 },
    ],
  },
  {
    key: 'frontend',
    title: 'Frontend',
    show: true,
    priority: 5,
    items: [
      { name: 'React', rating: 7 },
      { name: 'Next.js', rating: 7 },
      { name: 'Tailwind CSS', rating: 8 },
      { name: 'GSAP', rating: 6 },
    ],
  },
  {
    key: 'learning',
    title: 'Currently Learning',
    show: true,
    priority: 8,
    items: [
      { name: 'RAG', rating: 5 },
      { name: 'LangChain', rating: 5 },
      { name: 'Terraform', rating: 4 },
      { name: 'Agentic AI', rating: 4 },
    ],
  },
]


/**
 * Routes, with the published figures for each trail. The `body` is intentionally
 * empty: that is your own account of the walk, written in the admin.
 */
const TREKS = [
  {
    slug: 'everest-base-camp',
    title: 'Everest Base Camp',
    region: 'Khumbu, Nepal',
    season: 'Mar–May, Sep–Nov',
    days: 13,
    maxAltitudeM: 5545,
    distanceKm: 130,
    summary:
      'The classic Khumbu route: fly into Lukla, follow the Dudh Koshi through Namche and Tengboche, then up the glacial moraine to Base Camp at 5,364 m, with the dawn climb of Kala Patthar at 5,545 m for the view of the summit.',
    body: '',
  },
  {
    slug: 'annapurna-base-camp',
    title: 'Annapurna Base Camp',
    region: 'Annapurna, Nepal',
    season: 'Mar–May, Oct–Nov',
    days: 9,
    maxAltitudeM: 4130,
    distanceKm: 110,
    summary:
      'Through terraced hills and rhododendron forest above Pokhara, up the Modi Khola gorge past Chhomrong and Machhapuchhre Base Camp into the Annapurna Sanctuary — a glacial amphitheatre ringed by peaks at 4,130 m.',
    body: '',
  },
]

const SERVICES = [
  {
    title: 'Brand Identity',
    icon: 'palette',
    description: 'Logos, colour, type and voice that make a business recognisable at a glance.',
    details:
      'Brand strategy workshops, naming, logo systems, colour and typography, brand guidelines and the templates your team uses every day.',
  },
  {
    title: 'Social Media Marketing',
    icon: 'megaphone',
    description: 'Content calendars, community management and campaigns that grow a following.',
    details:
      'Platform strategy for Instagram, Facebook, TikTok and LinkedIn, monthly content calendars, copywriting, scheduling, community replies and monthly reporting.',
  },
  {
    title: 'Performance Ads',
    icon: 'chart',
    description: 'Paid campaigns on Meta and Google, measured against what they bring back.',
    details:
      'Audience research, creative testing, conversion tracking, budget pacing and a clear report on cost per lead and return on ad spend.',
  },
  {
    title: 'Content & Video',
    icon: 'video',
    description: 'Reels, product shoots and short films made for the feed they live in.',
    details:
      'Scripting, shooting, editing, motion graphics, captions and sound — vertical and landscape cuts from one shoot.',
  },
  {
    title: 'SEO & Web',
    icon: 'search',
    description: 'Fast websites and search visibility that keep working after the ads stop.',
    details:
      'Landing pages and business sites, technical SEO, local listings, on-page content and analytics set up so you can see what converts.',
  },
  {
    title: 'Copy & Strategy',
    icon: 'pen',
    description: 'Positioning and words that explain why you, not the competitor.',
    details:
      'Market and competitor review, messaging framework, campaign concepts, ad and website copy, and launch plans.',
  },
] satisfies Array<{ icon: ServiceIcon } & Record<string, string>>

// Prices are the studio's to set: "On request" until they are filled in the admin.
const PACKAGES = [
  {
    name: 'Starter',
    price: 'On request',
    period: '',
    description: 'For new businesses getting their brand and first channel right.',
    features: [
      'Logo refresh & mini brand guide',
      'One social platform set up and managed',
      '12 designed posts a month',
      'Basic monthly report',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: 'On request',
    period: 'per month',
    description: 'For businesses ready to grow reach and leads every month.',
    features: [
      'Everything in Starter',
      'Two platforms with content calendar',
      '4 short-form reels a month',
      'Meta ads management',
      'Community management',
      'Monthly strategy call',
    ],
    popular: true,
  },
  {
    name: 'Brand Partner',
    price: 'On request',
    period: 'per month',
    description: 'A full marketing team on retainer.',
    features: [
      'Full brand identity system',
      'All platforms, daily presence',
      'Product & lifestyle shoots',
      'Meta & Google ads with conversion tracking',
      'Landing pages & SEO',
      'Quarterly campaign planning',
    ],
    popular: false,
  },
]

const pick = <T,>(items: T[], predicate: (item: T) => boolean) => items.filter(predicate)

/**
 * Per-site rows. Research repeats the research roles, skills and publications
 * that also belong on the tech portfolio — separate tables mean separate rows.
 * Trek starts empty: add real treks, photos and films in the admin.
 * Creatives gets its services and package outlines; reviews, stats, prices and
 * work videos are real-world facts, so they are added in the admin.
 */
export const siteContent = {
  tech: {
    treks: [] as typeof TREKS,
    services: [] as typeof SERVICES,
    packages: [] as typeof PACKAGES,
    experiences: ALL_EXPERIENCES,
    expertise: ALL_EXPERTISE,
    publications: ALL_PUBLICATIONS,
    projects: ALL_PROJECTS,
    skillCategories: ALL_SKILLS,
  },
  research: {
    treks: [] as typeof TREKS,
    services: [] as typeof SERVICES,
    packages: [] as typeof PACKAGES,
    experiences: pick(ALL_EXPERIENCES, (e) =>
      ['Research Exchange', 'Research Assistant'].includes(e.role)
    ),
    expertise: pick(ALL_EXPERTISE, (e) =>
      ['Professional Research', 'AI & Machine Learning', 'Backend & Databases'].includes(e.domain)
    ),
    publications: ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: pick(ALL_SKILLS, (s) => ['research', 'web', 'architecture', 'learning'].includes(s.key)),
  },
  trek: {
    treks: TREKS,
    services: [] as typeof SERVICES,
    packages: [] as typeof PACKAGES,
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: [] as typeof ALL_SKILLS,
  },
  creatives: {
    treks: [] as typeof TREKS,
    services: SERVICES,
    packages: PACKAGES,
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: [] as typeof ALL_SKILLS,
  },
}
