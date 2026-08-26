import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";
import ScrollReveal from "./ScrollReveal";

type ProjectsSectionProps = {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <ScrollReveal id="projects" direction="up" distance={30} stagger={0.15} className="w-full scroll-mt-24">
      <section className="w-full flex flex-col gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight mb-2">Selected Projects</h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Here are some of the key applications, systems, and tools I&apos;ve engineered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
