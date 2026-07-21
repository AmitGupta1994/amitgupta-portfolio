import ProjectCard from "./ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

type ProjectsSectionProps = {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">Selected Projects</h2>
        <p className="text-lg text-neutral-600 max-w-2xl">
          Here are some of the applications and services I've built recently, showcasing my experience across the full stack.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
  );
}
