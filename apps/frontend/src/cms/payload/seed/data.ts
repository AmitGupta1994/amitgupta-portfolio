// Initial CMS content, migrated from the frontend's former src/data files.
// Shapes match the Payload collections; `order` is assigned from array position.

/** Curation for the research site: which items it shows, and in what order. */
type Placement = { site: 'research'; order: number }
const onResearch = (order: number): Placement[] => [{ site: 'research', order }]

export const profile = {
  name: 'Amit Gupta',
  headline: 'Lead Engineer | Full Stack Engineer (Backend-Focused)',
  imageUrl: 'https://github.com/amitgupta1994.png',
  mainSiteUrl: 'https://guptaamit.com.np',
  contact: {
    email: 'iamitgupta1994@gmail.com',
    phone: '(+977) 9843944663',
    whatsapp: 'https://wa.me/9779843944663',
    location: 'Kathmandu (Nepal)',
    freelancer: 'https://www.freelancer.com/u/iamamitgupta1994',
    linkedin: 'https://www.linkedin.com/in/iamamitgupta1994/',
    github: 'https://github.com/amitgupta1994',
    googleScholar: 'https://scholar.google.com/citations?user=NZwhe6kAAAAJ&hl=en&oi=sra',
  },
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
  summary:
    'As a Tech Lead and Full Stack Engineer (Backend-Focused) with <strong>7+ years</strong>  of experience architecting scalable systems, I drive the complete lifecycle from requirement gathering and MVP development to cloud deployment and monitoring. Communicating directly with clients, I build complex software solutions and AI-based systems. Backed by AI/ML research, I integrate AI capabilities, build AI-native products, and leverage AI-assisted coding. I am skilled in leading teams, mentoring, and applying deep expertise across Backend, Native Android, and DevOps to drive business growth. \n \n I am a pragmatic builder and debugger who approaches software development from a strict systems engineering perspective. By combining strong coding fundamentals with a highly iterative mindset, I build quickly, diagnose issues efficiently, and continuously refine architectures to scale seamlessly from initial single region deployments to high concurrency, multi sharded environments. Ultimately, my focus goes beyond just writing code to designing resilient systems and cultivating a culture of relentless improvement. ',
}

export const navigationLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Expertise', href: '/#expertise' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Publications', href: '/#publications' },
  { name: 'Articles', href: '/#articles' },
  { name: 'Contact', href: '/#contact' },
]

export const projects = [
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

export const experiences = [
  {
    role: 'Lead Software Engineer',
    company: 'TheGemsTech',
    date: '07/01/2024 - Current',
    description:
      'Architected and led scalable backend and application systems across fintech, ride-sharing, travel, and AI platforms, supporting multi-product architecture with CI/CD pipelines and cloud-ready deployments.',
    placements: onResearch(2),
  },
  {
    role: 'Professional Freelancer (Senior Software Engineer)',
    company: 'Freelancer.com',
    date: '17/05/2021 - Current',
    description:
      'Developed AI/ML systems including recommendation engines and generative AI applications, improving personalization quality and response relevance through NLP and machine learning pipelines.',
    placements: onResearch(3),
  },
  {
    role: 'Research Exchange',
    company: 'Department of Biomedical Engineering, IIT Hyderabad',
    date: '08/08/2023 - 08/12/2024',
    description:
      'Designed and validated BLE-enabled FSR smart insoles achieving real-time gait data acquisition with improved signal reliability and experimental accuracy for clinical research systems.',
    placements: onResearch(0),
  },
  {
    role: 'Research Assistant',
    company: 'Kathmandu University',
    date: '02/01/2022 - 02/01/2024',
    description:
      'Built computer vision gait analysis system using MediaPipe pose estimation and sensor fusion, improving movement classification robustness and real-time inference performance.',
    placements: onResearch(1),
  },
]

export const expertise = [
  {
    domain: 'Total Software Development',
    years: '7+ Years',
    description:
      'Architecting, designing, and delivering end-to-end scalable solutions across web, mobile, and cloud environments while managing the full product lifecycle from initial requirements to system monitoring.',
    placements: onResearch(2),
  },
  {
    domain: 'Backend & Databases',
    years: '4+ Years',
    description:
      'Building scalable APIs and managing complex data architectures with Python, Django, FastAPI, PostgreSQL, MySQL, and MongoDB.',
    placements: onResearch(3),
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
    placements: onResearch(1),
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
    placements: onResearch(0),
  },
]

export const publications = [
  {
    title:
      'Design of Force Sensitive Resistor (FSR) embedded insole for phase detection during human gait and its classification',
    authors: 'Pant, U., Baral, S., Gupta, A., & Shrestha, P. L.',
    date: '2024, September',
    publisher: 'IOP Conference Series: Materials Science and Engineering',
    placements: onResearch(0),
  },
  {
    title: 'Application of Machine Learning Algorithm for Fault Detection in Pump',
    authors: 'Bhattarai, A., Gupta, A., Kafle, A., Sapkota, P., Chitrakar, S., Dahlhaug, O. G., & Pradhan, S.',
    date: '2023, August',
    publisher: 'International conference on the Efficiency and Performance Engineering Network (Springer Nature)',
    placements: onResearch(1),
  },
  {
    title:
      'Knee flexion/extension angle measurement for gait analysis using machine learning solution "mediapipe pose" and its comparison with Kinovea®',
    authors: 'Gupta, A., Shrestha, P. L., Thapa, B., Silwal, R., & Shrestha, R.',
    date: '2023, March',
    publisher: 'IOP Conference Series: Materials Science and Engineering',
    placements: onResearch(2),
  },
]

export const skillCategories = [
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
    placements: onResearch(2),
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
    placements: onResearch(1),
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
    placements: onResearch(3),
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
    placements: onResearch(0),
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
    placements: onResearch(4),
  },
]


export const research = {
  title: 'Research',
  tagline: 'Gait analysis, sensing hardware and applied machine learning',
  about:
    'I work where <strong>research meets engineering</strong>: building the sensing hardware, computer-vision pipelines and analysis behind human gait studies, then turning the results into software that holds up outside the lab. My published work covers FSR-instrumented insoles for gait phase detection, pose-estimation based joint measurement validated against Kinovea, and machine learning for fault detection in pumps. \n \n Alongside the research I build the systems it depends on — data acquisition, APIs, pipelines and deployment — which is the same engineering practice I apply to production software.',
  nav: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Publications', href: '/#publications' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Contact', href: '/#contact' },
  ],
  seo: {
    title: 'Amit Gupta | Research',
    description:
      'Published research on human gait analysis, FSR insoles, pose estimation and applied machine learning, by Amit Gupta.',
  },
}
