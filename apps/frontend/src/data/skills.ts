import { SkillCategoryData } from '@/types/skill';

export const skillsData: SkillCategoryData[] = [
  {
    id: "architecture",
    title: "System Design & Architecture",
    show: true,
    priority: 1,
    items: [
      { name: "System Design", rating: 8 },
      { name: "Clean Architecture", rating: 9 },
      { name: "SOLID Principles", rating: 9 },
      { name: "MVVM", rating: 9 }
    ]
  },
  {
    id: "web",
    title: "Web & Backend",
    show: true,
    priority: 2,
    items: [
      { name: "Python", rating: 9 },
      { name: "Django", rating: 8 },
      { name: "PostgreSQL", rating: 8 },
      { name: "AI/ML", rating: 8 }
    ]
  },
  {
    id: "mobile",
    title: "Mobile",
    show: true,
    priority: 3,
    items: [
      { name: "Android (Kotlin, KMP)", rating: 9 }
    ]
  },
  {
    id: "deployment",
    title: "Deployment",
    show: true,
    priority: 4,
    items: [
      { name: "AWS", rating: 8 },
      { name: "Docker", rating: 8 },
      { name: "CI/CD", rating: 8 }
    ]
  },
  {
    id: "iot_embedded",
    title: "IoT & Embedded Systems",
    show: true,
    priority: 5,
    items: [
      { name: "Android TV / STB", rating: 9 },
      { name: "AOSP Firmware", rating: 8 },
      { name: "BLE & Sensors", rating: 7 },
      { name: "Digital Signage Systems", rating: 8 }
    ]
  },
  {
    id: "research",
    title: "Research & Academic (2+ Years)",
    show: true,
    priority: 6,
    items: [
      { name: "Data Acquisition & Analysis", rating: 8 },
      { name: "Computer Vision (MediaPipe)", rating: 8 },
      { name: "Sensor Fusion", rating: 7 },
      { name: "Academic Writing", rating: 8 }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    show: true,
    priority: 7,
    items: [
      { name: "React", rating: 7 },
      { name: "Next.js", rating: 7 },
      { name: "Tailwind CSS", rating: 8 },
      { name: "GSAP", rating: 6 }
    ]
  },
  {
    id: "learning",
    title: "Currently Learning",
    show: true, 
    priority: 8,
    items: [
      { name: "RAG", rating: 5 },
      { name: "LangChain", rating: 5 },
      { name: "Terraform", rating: 4 },
      { name: "Agentic AI", rating: 4 }
    ]
  }
];
