import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Monorepo Portfolio",
    description: "A production-grade portfolio built with Next.js, Tailwind CSS, and structured for a future Django backend integration.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/amitgupta-portfolio",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Task Management API",
    description: "A robust backend service featuring JWT authentication, role-based access control, and comprehensive test coverage.",
    techStack: ["Django", "Python", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/yourusername/task-api",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with Stripe payment integration, real-time inventory tracking, and an admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/yourusername/ecommerce-app",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Real-time Chat App",
    description: "A scalable chat application featuring WebSocket connections, online status indicators, and message history.",
    techStack: ["React", "Express", "Socket.io", "Redis"],
    githubUrl: "https://github.com/yourusername/chat-app",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    title: "AI Image Generator",
    description: "A creative tool allowing users to generate artwork from text prompts using OpenAI's DALL-E 3 API.",
    techStack: ["Next.js", "Tailwind", "OpenAI API", "Vercel"],
    githubUrl: "https://github.com/yourusername/ai-generator",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    title: "SaaS Analytics Dashboard",
    description: "A comprehensive dashboard for SaaS companies to track user engagement, MRR, and churn rates.",
    techStack: ["Vue.js", "Nuxt", "Chart.js", "Supabase"],
    githubUrl: "https://github.com/yourusername/saas-dashboard",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  }
];
