import type { ServiceIcon } from '@/types/studio'

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

const STUDIO_NAV = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'Packages', href: '/#packages' },
  { name: 'Work', href: '/#work' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'Contact', href: '/#contact' },
]
const PORTRAIT = 'https://github.com/amitgupta1994.png'

/** Values written into each site's global. Field defaults cover anything omitted. */
export const siteGlobals = {
  tech: {
    title: 'Portfolio',
    tagline: 'Senior Full Stack Lead Engineer (Backend Focused)',
    name: 'Amit Gupta',
    headline: 'Senior Full Stack Lead Engineer (Backend Focused)',
    imageUrl: PORTRAIT,
    mainSiteUrl: MAIN_SITE_URL,
    contact: CONTACT,
    summary:
      'As a <strong>Senior Full Stack Lead Engineer (Backend Focused)</strong> with <strong>7+ years</strong> of experience building scalable systems in autonomous, remote environments, I architect and deliver end-to-end solutions across backend, cloud, web, and AI-driven products. With <strong>4+ years of dedicated backend expertise</strong>, I specialize in engineering robust APIs and data architectures using Python, Django, FastAPI, PostgreSQL, MySQL, and MongoDB. \n \n Because I understand both the intricacies of server-side systems and how APIs are consumed by frontend and mobile clients, I lead technical execution and bridge cross-stack boundaries seamlessly. My background in containerized cloud environments (AWS, Docker, CI/CD pipelines, Nginx) ensures features are delivered reliably with high availability, strong observability, and minimal downtime. Backed by 2 years of university AI/ML research, I integrate intelligent models and generative AI into production to build performant, resilient software that scales.',
    hero: {
      title: 'Engineering systems that scale',
      description: [
        { text: 'Senior Full Stack Lead Engineer specializing in ' },
        { text: 'resilient backends', highlight: true },
        { text: ', ' },
        { text: 'scalable cloud infrastructure', highlight: true },
        { text: ' and ' },
        { text: 'AI-native products', highlight: true },
        { text: ' engineered from MVP to high-concurrency scale.' },
      ],
      cta: { label: "Let's connect", href: '/#contact' },
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
      title: 'Amit Gupta | Senior Full Stack Lead Engineer (Backend Focused)',
      description:
        'Senior Full Stack Lead Engineer (Backend Focused) with 7+ years of experience building resilient backends, cloud platforms, and AI-native systems.',
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
    tagline: 'Digital marketing & branding',
    name: 'Amit Gupta',
    headline: 'Digital Marketing & Branding',
    imageUrl: PORTRAIT,
    mainSiteUrl: MAIN_SITE_URL,
    contact: { email: CONTACT.email, phone: CONTACT.phone, whatsapp: CONTACT.whatsapp, location: CONTACT.location },
    summary:
      'I help businesses build brands people remember and campaigns that pay for themselves — strategy, identity, content and performance marketing, done hands-on.',
    hero: {
      title: 'Ideas that move people',
      description: [
        { text: 'I craft ' },
        { text: 'brand identities', highlight: true },
        { text: ', ' },
        { text: 'social content', highlight: true },
        { text: ' and ' },
        { text: 'performance campaigns', highlight: true },
        { text: ' for businesses ready to grow.' },
      ],
      cta: { label: 'Work with me', href: '/#contact' },
    },
    nav: STUDIO_NAV,
    // Real figures only — add them in the admin; the row stays hidden while empty.
    stats: [],
    seo: {
      title: 'Amit Gupta | Digital Marketing & Branding',
      description:
        'Brand identity, social media content and performance marketing for businesses ready to grow — by Amit Gupta.',
    },
  },
  voxelate: {
    title: 'Voxelate',
    tagline: 'Digital marketing & branding company',
    name: 'Voxelate',
    headline: 'Digital Marketing & Branding',
    imageUrl: '/voxelate/logo-mark.jpg',
    // A company site doesn't link back to a personal portfolio.
    mainSiteUrl: '',
    // Placeholder: replace with the company's own inbox, number and socials in the admin.
    contact: { email: CONTACT.email, phone: CONTACT.phone, whatsapp: CONTACT.whatsapp, location: CONTACT.location },
    summary:
      'Voxelate is a digital marketing and branding company. Our team of strategists, designers and creators builds brands people remember and campaigns that pay for themselves.',
    hero: {
      title: 'Brands built to be remembered',
      description: [
        { text: 'Our team delivers ' },
        { text: 'brand strategy', highlight: true },
        { text: ', ' },
        { text: 'creative production', highlight: true },
        { text: ' and ' },
        { text: 'performance marketing', highlight: true },
        { text: ' for growing businesses.' },
      ],
      cta: { label: 'Start a project', href: '/#contact' },
    },
    nav: [...STUDIO_NAV.slice(0, 4), { name: 'Team', href: '/#team' }, ...STUDIO_NAV.slice(4)],
    stats: [],
    // The registered name and founding year (company group) are filled in the admin.
    seo: {
      title: 'Voxelate | Digital Marketing & Branding Company',
      description:
        'Voxelate is a digital marketing and branding company: brand strategy, creative production and performance marketing for growing businesses.',
    },
  },
  techcompany: {
    title: 'TechCompany',
    tagline: 'Software development company',
    name: 'TechCompany',
    headline: 'Software Development Company',
    imageUrl: '/techcompany/logo.png',
    // A company site doesn't link back to a personal portfolio.
    mainSiteUrl: '',
    // Placeholder: replace with the company's own inbox, number and profiles in the admin.
    contact: {
      email: CONTACT.email,
      phone: CONTACT.phone,
      whatsapp: CONTACT.whatsapp,
      location: CONTACT.location,
      linkedin: CONTACT.linkedin,
      github: CONTACT.github,
    },
    summary:
      'We are a software development company that designs, builds and runs <strong>scalable web and mobile products</strong>, <strong>AI systems</strong> and the cloud infrastructure under them. Clients hire us as dedicated engineers at a fixed monthly rate, by the hour, or to deliver an outsourced project end to end — and we build and ship products of our own.',
    hero: {
      title: 'Software built to scale',
      description: [
        { text: 'We design and build ' },
        { text: 'web & mobile apps', highlight: true },
        { text: ', ' },
        { text: 'AI systems', highlight: true },
        { text: ' and the ' },
        { text: 'cloud infrastructure', highlight: true },
        { text: ' they run on — as your team, by the hour, or end to end.' },
      ],
      cta: { label: 'Start a project', href: '/#contact' },
    },
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
    // Real figures only — add them in the admin; the band stays hidden while empty.
    stats: [],
    process: [
      {
        title: 'Discover',
        description:
          'A short call and a written brief: the problem, the users, the constraints and what success looks like. You get a scope, an estimate and a recommended way to engage.',
      },
      {
        title: 'Design the system',
        description:
          'Architecture before code — data model, services, integrations and infrastructure, sized for the load you expect next year, not just launch day.',
      },
      {
        title: 'Build in sprints',
        description:
          'Two-week sprints with a working demo at the end of each, a shared board and direct access to the engineers doing the work.',
      },
      {
        title: 'Ship & hand over',
        description:
          'Automated deployments, monitoring and documentation, so launch is a non-event and your team can own what we built.',
      },
      {
        title: 'Run & scale',
        description:
          'Optional support after launch: on-call, performance work, cost tuning and new features as the product grows.',
      },
    ],
    seo: {
      title: 'TechCompany | Software Development Company',
      description:
        'Scalable web and mobile apps, AI integration and AI systems, system design and DevOps — dedicated engineers, hourly work or outsourced projects.',
    },
  },
  mokshyatrails: {
    title: 'Mokshya Trails',
    tagline: 'Trekking company in Nepal',
    name: 'Mokshya Trails',
    headline: 'Guided treks in the Himalaya',
    imageUrl: '/mokshyatrails/logo.png',
    mainSiteUrl: '',
    // Placeholder: replace with the company's own inbox, number and profiles in the admin.
    contact: { email: CONTACT.email, phone: CONTACT.phone, whatsapp: CONTACT.whatsapp, location: CONTACT.location },
    summary:
      "Mokshya Trails is a Nepal-based trekking company. Our licensed guides and porters lead small groups on the Himalaya's classic routes and quieter valleys — with permits, lodges and logistics handled, so you can <strong>just walk</strong>.",
    hero: {
      title: 'Walk the Himalaya with us',
      description: [
        { text: 'Guided treks to ' },
        { text: 'Everest', highlight: true },
        { text: ', ' },
        { text: 'Annapurna', highlight: true },
        { text: ' and ' },
        { text: 'Langtang', highlight: true },
        { text: ' — small groups, local guides, every detail handled.' },
      ],
      cta: { label: 'Plan your trek', href: '/#contact' },
    },
    nav: [
      { name: 'Home', href: '/#hero' },
      { name: 'About', href: '/#about' },
      { name: 'Featured treks', href: '/#treks' },
      { name: 'All treks', href: '/mokshyatrails/treks' },
      { name: 'Reviews', href: '/#reviews' },
      { name: 'Contact', href: '/#contact' },
    ],
    // Stock photos (Unsplash) until the company's own are uploaded.
    slides: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000',
        eyebrow: 'Everest region',
        title: 'Walk to the foot of Everest',
        description: 'Thirteen days through Sherpa villages and monasteries to Base Camp and the dawn view from Kala Patthar.',
        ctaLabel: 'Everest Base Camp trek',
        ctaHref: '/mokshyatrails/treks/everest-base-camp',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000',
        eyebrow: 'Licensed local guides',
        title: 'Small groups, big mountains',
        description: 'Guides and porters from the regions we walk, permits and lodges arranged — you just bring your boots.',
        ctaLabel: 'Browse all treks',
        ctaHref: '/mokshyatrails/treks',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000',
        eyebrow: 'Fixed or private departures',
        title: 'Your dates, your pace',
        description: 'Join a scheduled group departure or tell us when you want to go, and we will build the trek around you.',
        ctaLabel: 'Plan your trek',
        ctaHref: '/#contact',
      },
    ],
    // Real figures only — add them in the admin; the band stays hidden while empty.
    stats: [],
    seo: {
      title: 'Mokshya Trails | Guided Treks in Nepal',
      description:
        'Guided treks to Everest Base Camp, Annapurna Base Camp and Langtang Valley with licensed local guides. Fixed departures and private treks.',
    },
  },
}

const ALL_EXPERIENCES = [
  {
    role: 'Lead Software Engineer',
    company: 'TheGemsTech',
    date: '07/01/2024 - Current',
    description:
      'Architected and led scalable backend and multi-product systems across fintech, ride-sharing, travel, and AI platforms (Restro Cash, Vite, Karmic Astrology). Established CI/CD pipelines and cloud-ready AWS deployments; mentored engineering teams to standardize engineering practices and eliminate delivery bottlenecks.',
  },
  {
    role: 'Professional Freelancer (Senior Software Engineer and Researcher)',
    company: 'Freelancer.com',
    date: '17/05/2021 - Current',
    description:
      'Delivered end-to-end scalable full-stack solutions and AI/ML architectures for international clients. Built recommendation engines, generative AI applications (Cocktail & Recipe generator), and digital consultation platforms with optimized backend APIs and low-latency database queries.',
  },
  {
    role: 'Research Exchange',
    company: 'Department of Biomedical Engineering, IIT Hyderabad',
    date: '08/08/2023 - 08/12/2024',
    description:
      'Designed and validated BLE-enabled FSR smart insoles achieving real-time gait data acquisition with improved signal reliability and experimental accuracy for clinical research systems. Contributed to biomedical gait analysis and sensor calibration workflows.',
  },
  {
    role: 'Research Assistant',
    company: 'Kathmandu University',
    date: '02/01/2022 - 02/01/2024',
    description:
      'Built computer vision gait analysis system using MediaPipe pose estimation and sensor fusion, improving movement classification robustness and real-time inference performance. Developed ML pipelines for human motion analysis for biomedical AI applications.',
  },
  {
    role: 'Senior Software Engineer and Team Lead',
    company: 'Energy Bank Systems',
    date: '01/10/2020 - 01/11/2021',
    description:
      'Led the architecture of Android TV and STB-based digital signage systems deployed in enterprise environments, improving system stability and reducing playback failures. Managed sprint delivery cycles, code quality, release predictability, and embedded system performance.',
  },
  {
    role: 'Senior Engineer and Researcher: AOSP',
    company: 'New IT Venture',
    date: '20/11/2019 - 07/08/2020',
    description:
      'Customized AOSP and developed firmware for Amlogic-based STB devices in collaboration with cross-border hardware teams in China. Developed NetTV streaming platform with system-level integration, improving media delivery reliability and eliminating streaming interruptions.',
  },
  {
    role: 'Software Engineer',
    company: 'Insight Workshop',
    date: '06/07/2018 - 19/11/2019',
    description:
      'Developed native mobile applications using Kotlin/Java with MVVM architecture, improving app performance, maintainability, and backend API response handling efficiency. Participated in Agile delivery with automated CI/CD workflows.',
  },
  {
    role: 'Software Developer',
    company: 'New IT Venture',
    date: '01/12/2016 - 04/07/2018',
    description:
      'Developed and maintained Android-based OTT/IPTV/STB streaming applications (NetTV), implementing media server communication, token authentication, and secure video encryption/decryption using ExoPlayer.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Leapfrog Technology',
    date: '05/06/2016 - 05/09/2016',
    description:
      'Developed "Awaz," an Android application using Java and digital signal processing (DSP) techniques for real-time sound frequency detection and musical note matching, implementing audio processing algorithms and UI components.',
  },
]

const ALL_EXPERTISE = [
  {
    domain: 'Backend & Databases',
    years: '4+ Years',
    description:
      'Building scalable, high-throughput APIs and managing complex data architectures with Python, Django, FastAPI, PostgreSQL, MySQL, Redis, and MongoDB.',
  },
  {
    domain: 'Total Software Development',
    years: '7+ Years',
    description:
      'Architecting, designing, and delivering end-to-end scalable solutions across web, mobile, and cloud environments while managing the full product lifecycle from initial requirements to system monitoring.',
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
      'Crafting dynamic, responsive, and user-centric interfaces utilizing HTML, CSS, JavaScript, TypeScript, React, and Next.js.',
  },
  {
    domain: 'Native Android',
    years: '4+ Years',
    description:
      'Developing high-performance, robust mobile applications using Java, Kotlin, Jetpack Compose, KMM, and KMP with clean architecture.',
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
    title: 'Restro Cash',
    description:
      'Multi-tenant restaurant fintech and order management platform built with Django and PostgreSQL, supporting high-concurrency order workflows, digital wallet settlements, and containerized AWS deployments.',
    techStack: ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Vite (Ride-Sharing Platform)',
    description:
      'High-throughput ride-sharing platform backend featuring real-time driver matching, geospatial query routing, dynamic fare calculation algorithms, and WebSockets for live location synchronization.',
    techStack: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Trekking & Travel Platform',
    description:
      'Scalable booking platform and itinerary management system with dynamic route planning, automated permit tracking, group departure scheduling, and secure payment processing.',
    techStack: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Gen AI Recipe Generation System',
    description:
      'Generative AI application leveraging LLM pipelines, LangChain orchestration, and vector embeddings to deliver personalized cocktail and culinary recommendations with structured output formatting.',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Vector DB', 'FastAPI'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'NetTV Streaming Platform',
    description:
      'Large-scale OTT media streaming platform with secure DRM video encryption/decryption, ExoPlayer pipeline optimizations, adaptive bitrate streaming, and system-level Android TV/STB integrations.',
    techStack: ['Kotlin', 'Java', 'ExoPlayer', 'AOSP', 'RESTful APIs'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Biomedical Gait Analysis & Smart Insole',
    description:
      'Biomedical AI sensing platform combining BLE-enabled FSR smart insoles with MediaPipe computer vision pose estimation for real-time human gait classification and clinical motion diagnostics.',
    techStack: ['Python', 'MediaPipe', 'PyTorch', 'BLE', 'Data Pipelines'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'ML Movie Recommendation System',
    description:
      'Scalable machine learning recommendation engine combining collaborative filtering with content-based NLP feature extraction, served through containerized high-speed prediction APIs.',
    techStack: ['Python', 'Scikit-Learn', 'FastAPI', 'Pandas', 'Docker'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Online Digital Consultation Platform',
    description:
      'Full-stack telehealth and digital consultation application featuring secure real-time communication channels, practitioner scheduling, and encrypted patient data records.',
    techStack: ['React', 'Next.js', 'Django', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/amitgupta1994',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  },
]

const ALL_SKILLS = [
  {
    key: 'web',
    title: 'Web & Backend Architecture',
    show: true,
    priority: 1,
    items: [
      { name: 'Python', rating: 9 },
      { name: 'Django & DRF', rating: 9 },
      { name: 'FastAPI', rating: 9 },
      { name: 'PostgreSQL', rating: 9 },
      { name: 'MySQL & MongoDB', rating: 8 },
      { name: 'Redis & Caching', rating: 8 },
      { name: 'RESTful APIs', rating: 9 },
    ],
  },
  {
    key: 'architecture',
    title: 'System Design & Architecture',
    show: true,
    priority: 2,
    items: [
      { name: 'System Design', rating: 9 },
      { name: 'Microservices Architecture', rating: 8 },
      { name: 'Clean Architecture', rating: 9 },
      { name: 'SOLID Principles', rating: 9 },
      { name: 'Distributed Systems & Sharding', rating: 8 },
      { name: 'MVVM & Design Patterns', rating: 9 },
    ],
  },
  {
    key: 'deployment',
    title: 'DevOps & Cloud Infrastructure',
    show: true,
    priority: 3,
    items: [
      { name: 'AWS (EC2, S3, Lambda, ALB)', rating: 8 },
      { name: 'Docker & Containerization', rating: 9 },
      { name: 'CI/CD & GitHub Actions', rating: 8 },
      { name: 'Nginx & Reverse Proxies', rating: 8 },
      { name: 'Monitoring & Observability', rating: 8 },
      { name: 'Terraform', rating: 7 },
    ],
  },
  {
    key: 'frontend',
    title: 'Frontend Engineering',
    show: true,
    priority: 4,
    items: [
      { name: 'React', rating: 8 },
      { name: 'Next.js', rating: 8 },
      { name: 'TypeScript & JavaScript', rating: 8 },
      { name: 'Tailwind CSS', rating: 9 },
      { name: 'State Management & UI/UX', rating: 8 },
    ],
  },
  {
    key: 'research',
    title: 'AI, Machine Learning & Research',
    show: true,
    priority: 5,
    items: [
      { name: 'LLMs & Generative AI', rating: 8 },
      { name: 'LangChain & RAG', rating: 8 },
      { name: 'Vector Databases & Embeddings', rating: 7 },
      { name: 'PyTorch & TensorFlow', rating: 7 },
      { name: 'Computer Vision (MediaPipe)', rating: 8 },
      { name: 'Sensor Fusion & Biomechanics', rating: 8 },
    ],
  },
  {
    key: 'mobile',
    title: 'Mobile App Development',
    show: true,
    priority: 6,
    items: [
      { name: 'Native Android (Kotlin & Java)', rating: 9 },
      { name: 'Jetpack Compose', rating: 8 },
      { name: 'Compose Multiplatform (KMP/KMM)', rating: 8 },
      { name: 'ExoPlayer & Media Streaming', rating: 9 },
      { name: 'JUnit 5 & Mobile Architecture', rating: 8 },
    ],
  },
  {
    key: 'iot_embedded',
    title: 'IoT & Embedded Systems',
    show: true,
    priority: 7,
    items: [
      { name: 'Android TV & STB', rating: 9 },
      { name: 'AOSP & Firmware Customization', rating: 8 },
      { name: 'BLE & Smart Sensors', rating: 8 },
      { name: 'Digital Signage Systems', rating: 8 },
    ],
  },
  {
    key: 'learning',
    title: 'Emerging Tech & Exploration',
    show: true,
    priority: 8,
    items: [
      { name: 'Agentic AI & Multi-Agent Systems', rating: 7 },
      { name: 'AI-Assisted Workflow Automation', rating: 8 },
      { name: 'High-Throughput Event Streaming', rating: 7 },
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

type ServiceSeed = { title: string; icon: ServiceIcon; description: string; details: string }
type PackageSeed = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
}

const SERVICES: ServiceSeed[] = [
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
]

// Prices are the studio's to set: "On request" until they are filled in the admin.
const PACKAGES: PackageSeed[] = [
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
    description: 'Hands-on, ongoing marketing on retainer.',
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

// The company's tiers: written for a team taking on the work, not one person.
const COMPANY_PACKAGES: PackageSeed[] = [
  {
    name: 'Launch',
    price: 'On request',
    period: '',
    description: 'For new brands: identity, launch content and a channel set up properly.',
    features: [
      'Brand strategy workshop',
      'Logo system & brand guidelines',
      'Social profiles set up and designed',
      'Launch campaign creative',
      'Dedicated project manager',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: 'On request',
    period: 'per month',
    description: 'A full creative and media team running your marketing every month.',
    features: [
      'Content calendar across your platforms',
      'Monthly shoot: reels & product photography',
      'Meta & Google ads management',
      'Community management',
      'Monthly performance report & strategy call',
      'Dedicated account manager',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'On request',
    period: 'custom',
    description: 'Multi-brand and multi-market programmes with a team built around you.',
    features: [
      'Integrated campaign planning',
      'Brand system for multiple lines',
      'Production at scale: video, photo, motion',
      'Full-funnel paid media & conversion tracking',
      'Websites, landing pages & SEO',
      'Quarterly business reviews',
    ],
    popular: false,
  },
]

// The software company's six services, in the order the page shows them.
const TECH_SERVICES: ServiceSeed[] = [
  {
    title: 'Scalable Web App Development',
    icon: 'code',
    description: 'Web platforms and SaaS products built to handle growth from the first user to the millionth.',
    details:
      'React and Next.js frontends, Django, Node and Go backends, PostgreSQL and Redis, multi-tenant SaaS, real-time features, caching and horizontal scaling.',
  },
  {
    title: 'Mobile App Development',
    icon: 'mobile',
    description: 'Native and cross-platform apps for Android and iOS that feel fast and stay reliable offline.',
    details:
      'Kotlin and Jetpack Compose, Kotlin Multiplatform, Flutter and React Native, offline-first sync, push notifications, payments and store releases.',
  },
  {
    title: 'AI Integration',
    icon: 'sparkles',
    description: 'LLMs and machine learning added to the product you already have, where they earn their keep.',
    details:
      'Chat and copilots, retrieval over your own documents (RAG), document extraction, classification and recommendations, with evaluation and cost controls.',
  },
  {
    title: 'AI System Development',
    icon: 'cpu',
    description: 'AI-native products and agents designed from the ground up, from data pipeline to production.',
    details:
      'Agentic workflows and tool use, model selection and fine-tuning, data pipelines, vector search, evaluation harnesses, guardrails and monitoring.',
  },
  {
    title: 'System Design & Architecture',
    icon: 'layers',
    description: 'Architecture reviews and designs that keep systems simple today and scalable tomorrow.',
    details:
      'Domain modelling, monolith-to-services migrations, event-driven design, database sharding, performance audits and technical due diligence.',
  },
  {
    title: 'DevOps & Infrastructure',
    icon: 'server',
    description: 'Cloud infrastructure, CI/CD and monitoring handled, so releases are routine and outages are rare.',
    details:
      'AWS, GCP and Azure, Docker and Kubernetes, Terraform, CI/CD pipelines, observability, backups, security hardening and cloud cost optimisation.',
  },
]

// How clients engage the company. Rates are the company's to set: "On request" until filled in.
const ENGAGEMENT_MODELS: PackageSeed[] = [
  {
    name: 'Fixed-Rate Engineers',
    price: 'On request',
    period: 'per engineer / month',
    description: 'Dedicated engineers who join your team full time at a fixed monthly rate.',
    features: [
      'Full-time, dedicated to your product',
      'Works in your tools, stand-ups and sprints',
      'Fixed monthly cost — no surprises',
      'Scale the team up or down monthly',
      'Replacement guarantee',
    ],
    popular: true,
  },
  {
    name: 'Hourly Work',
    price: 'On request',
    period: 'per hour',
    description: 'Flexible engineering time for features, fixes, audits and consulting.',
    features: [
      'Pay only for hours worked',
      'Weekly timesheets and progress notes',
      'Ideal for maintenance and short tasks',
      'Architecture and code reviews',
      'Start within days',
    ],
    popular: false,
  },
  {
    name: 'Outsourced Projects',
    price: 'On request',
    period: 'fixed scope',
    description: 'Hand us the whole project — we deliver it end to end against an agreed scope.',
    features: [
      'Discovery, design and estimate up front',
      'Milestone-based pricing',
      'Dedicated project manager',
      'QA, deployment and documentation included',
      'Post-launch support available',
    ],
    popular: false,
  },
]

// What a guided trek typically includes; adjust per trek in the admin.
const STANDARD_INCLUDES = [
  'Licensed English-speaking trekking guide',
  'Porter (one per two trekkers)',
  'National park and TIMS / conservation permits',
  'Tea-house accommodation on the trail',
  'Airport and hotel transfers in Kathmandu',
  'First-aid kit and emergency evacuation arrangements',
]
const STANDARD_EXCLUDES = [
  'International flights and Nepal visa',
  'Meals in Kathmandu',
  'Travel insurance with high-altitude evacuation cover',
  'Tips for guides and porters',
  'Personal gear, drinks and hot showers on the trail',
]

// Route facts are public knowledge; prices and departure dates are the company's
// to set, so they start empty ("On request", request your own date).
const TREK_PACKAGES = [
  {
    slug: 'everest-base-camp',
    title: 'Everest Base Camp',
    region: 'Khumbu, Nepal',
    season: 'Mar–May, Sep–Nov',
    days: 13,
    maxAltitudeM: 5545,
    distanceKm: 130,
    difficulty: 'challenging' as const,
    groupSize: '2–12',
    featured: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=2000',
    summary:
      'The classic Khumbu route: fly into Lukla, follow the Dudh Koshi through Namche and Tengboche, then up the glacial moraine to Base Camp at 5,364 m, with the dawn climb of Kala Patthar at 5,545 m.',
    body: '',
    itinerary: [
      { day: '1', title: 'Fly Kathmandu → Lukla, trek to Phakding', description: 'A short mountain flight, then an easy first walk along the Dudh Koshi (2,610 m).' },
      { day: '2', title: 'Phakding → Namche Bazaar', description: 'Suspension bridges and the first view of Everest on the climb to the Sherpa capital (3,440 m).' },
      { day: '3', title: 'Acclimatisation in Namche', description: 'Hike to the Everest View Hotel and back down to sleep low.' },
      { day: '4', title: 'Namche → Tengboche', description: 'Contouring trail with Ama Dablam ahead, ending at the monastery (3,860 m).' },
      { day: '5', title: 'Tengboche → Dingboche', description: 'Into the Imja valley and its stone-walled fields (4,410 m).' },
      { day: '6', title: 'Acclimatisation in Dingboche', description: 'Climb Nangkartshang for views of Makalu and Lhotse.' },
      { day: '7', title: 'Dingboche → Lobuche', description: 'Past the climbers\' memorials at Thukla Pass (4,940 m).' },
      { day: '8', title: 'Lobuche → Gorak Shep → Everest Base Camp', description: 'Along the Khumbu Glacier to Base Camp (5,364 m), back to Gorak Shep to sleep.' },
      { day: '9', title: 'Kala Patthar at dawn, descend to Pheriche', description: 'Sunrise on Everest from 5,545 m, then a long descent.' },
      { day: '10–11', title: 'Pheriche → Namche → Lukla', description: 'Two days retracing the valley down to Lukla.' },
      { day: '12', title: 'Fly Lukla → Kathmandu', description: 'Morning flight back; a spare afternoon in the city.' },
      { day: '13', title: 'Contingency day', description: 'Held in reserve for Lukla flight delays.' },
    ],
    includes: STANDARD_INCLUDES,
    excludes: STANDARD_EXCLUDES,
  },
  {
    slug: 'annapurna-base-camp',
    title: 'Annapurna Base Camp',
    region: 'Annapurna, Nepal',
    season: 'Mar–May, Oct–Nov',
    days: 9,
    maxAltitudeM: 4130,
    distanceKm: 110,
    difficulty: 'moderate' as const,
    groupSize: '2–12',
    featured: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&q=80&w=2000',
    summary:
      'Through terraced hills and rhododendron forest above Pokhara, up the Modi Khola gorge past Chhomrong and Machhapuchhre Base Camp into the Annapurna Sanctuary — a glacial amphitheatre ringed by peaks at 4,130 m.',
    body: '',
    itinerary: [
      { day: '1', title: 'Pokhara → Nayapul, trek to Ghandruk', description: 'A short drive, then stone steps up to the Gurung village of Ghandruk (1,940 m).' },
      { day: '2', title: 'Ghandruk → Chhomrong', description: 'Over the Kimrong Khola to Chhomrong, facing Annapurna South (2,170 m).' },
      { day: '3', title: 'Chhomrong → Bamboo', description: 'Down and up into the forested Modi Khola gorge (2,310 m).' },
      { day: '4', title: 'Bamboo → Deurali', description: 'Through bamboo and rhododendron as the valley narrows (3,230 m).' },
      { day: '5', title: 'Deurali → Machhapuchhre Base Camp → Annapurna Base Camp', description: 'Into the Sanctuary, arriving at ABC (4,130 m) for sunset.' },
      { day: '6', title: 'Sunrise at ABC, descend to Bamboo', description: 'First light on Annapurna I, then a long descent.' },
      { day: '7', title: 'Bamboo → Jhinu Danda', description: 'Back through Chhomrong to the hot springs at Jhinu (1,780 m).' },
      { day: '8', title: 'Jhinu → Nayapul, drive to Pokhara', description: 'Last morning on the trail, an afternoon by Phewa Lake.' },
      { day: '9', title: 'Pokhara → Kathmandu', description: 'Drive or fly back to Kathmandu.' },
    ],
    includes: STANDARD_INCLUDES,
    excludes: STANDARD_EXCLUDES,
  },
  {
    slug: 'langtang-valley',
    title: 'Langtang Valley',
    region: 'Langtang, Nepal',
    season: 'Mar–May, Sep–Nov',
    days: 8,
    maxAltitudeM: 4984,
    distanceKm: 65,
    difficulty: 'moderate' as const,
    groupSize: '2–12',
    featured: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2000',
    summary:
      'The closest high valley to Kathmandu: up the Langtang Khola through Tamang villages and yak pastures to Kyanjin Gompa, with an optional climb of Kyanjin Ri or Tserko Ri for a glacier-ringed panorama.',
    body: '',
    itinerary: [
      { day: '1', title: 'Drive Kathmandu → Syabrubesi', description: 'A full day on mountain roads to the trailhead (1,460 m).' },
      { day: '2', title: 'Syabrubesi → Lama Hotel', description: 'Along the river through forest home to red pandas (2,470 m).' },
      { day: '3', title: 'Lama Hotel → Langtang village', description: 'The valley opens out to rebuilt Langtang village (3,430 m).' },
      { day: '4', title: 'Langtang → Kyanjin Gompa', description: 'A short day past mani walls to the monastery and cheese factory (3,870 m).' },
      { day: '5', title: 'Climb Tserko Ri, back to Kyanjin', description: 'Dawn ascent to 4,984 m for views of Langtang Lirung.' },
      { day: '6', title: 'Kyanjin → Lama Hotel', description: 'A long descent down the valley.' },
      { day: '7', title: 'Lama Hotel → Syabrubesi', description: 'Last day on the trail.' },
      { day: '8', title: 'Drive Syabrubesi → Kathmandu', description: 'Back to the city.' },
    ],
    includes: STANDARD_INCLUDES,
    excludes: STANDARD_EXCLUDES,
  },
]

const pick = <T,>(items: T[], predicate: (item: T) => boolean) => items.filter(predicate)

/**
 * Per-site rows. Research repeats the research roles, skills and publications
 * that also belong on the tech portfolio — separate tables mean separate rows.
 * Trek starts empty: add real treks, photos and films in the admin.
 * Creatives (personal) and Voxelate (company) get services and package outlines;
 * reviews, stats, prices, work videos, team and clients are real-world facts, so
 * they are added in the admin. TechCompany gets its services, engagement models,
 * process and stack; case studies, products, reviews and stats come from the admin.
 */
export const siteContent = {
  tech: {
    treks: [] as typeof TREKS,
    trekPackages: [] as typeof TREK_PACKAGES,
    services: [] as ServiceSeed[],
    packages: [] as PackageSeed[],
    experiences: ALL_EXPERIENCES,
    expertise: ALL_EXPERTISE,
    publications: ALL_PUBLICATIONS,
    projects: ALL_PROJECTS,
    skillCategories: ALL_SKILLS,
  },
  research: {
    treks: [] as typeof TREKS,
    trekPackages: [] as typeof TREK_PACKAGES,
    services: [] as ServiceSeed[],
    packages: [] as PackageSeed[],
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
    trekPackages: [] as typeof TREK_PACKAGES,
    services: [] as ServiceSeed[],
    packages: [] as PackageSeed[],
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: [] as typeof ALL_SKILLS,
  },
  creatives: {
    treks: [] as typeof TREKS,
    trekPackages: [] as typeof TREK_PACKAGES,
    services: SERVICES,
    packages: PACKAGES,
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: [] as typeof ALL_SKILLS,
  },
  voxelate: {
    treks: [] as typeof TREKS,
    trekPackages: [] as typeof TREK_PACKAGES,
    services: SERVICES,
    packages: COMPANY_PACKAGES,
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: [] as typeof ALL_SKILLS,
  },
  techcompany: {
    treks: [] as typeof TREKS,
    trekPackages: [] as typeof TREK_PACKAGES,
    services: TECH_SERVICES,
    packages: ENGAGEMENT_MODELS,
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    // Case studies are real client work, added in the admin.
    projects: [] as typeof ALL_PROJECTS,
    // The company's stack: the engineering categories of the tech portfolio.
    skillCategories: pick(ALL_SKILLS, (s) => ['web', 'frontend', 'mobile', 'architecture', 'deployment'].includes(s.key)),
  },
  mokshyatrails: {
    treks: [] as typeof TREKS,
    trekPackages: TREK_PACKAGES,
    services: [] as ServiceSeed[],
    packages: [] as PackageSeed[],
    experiences: [] as typeof ALL_EXPERIENCES,
    expertise: [] as typeof ALL_EXPERTISE,
    publications: [] as typeof ALL_PUBLICATIONS,
    projects: [] as typeof ALL_PROJECTS,
    skillCategories: [] as typeof ALL_SKILLS,
  },
}
