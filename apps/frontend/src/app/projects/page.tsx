import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Project() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>My Projects</h1>
      <p>Here are some of the things I've built recently.</p>

      <div style={{ marginTop: '2rem' }}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
        ))}
      </div>
    </main>
  );
}
