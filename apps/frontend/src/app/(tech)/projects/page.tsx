import ProjectCard from "@/components/ProjectCard";
import { getProjects } from '@/content';

export default async function Project() {
  const projects = await getProjects();

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>My Projects</h1>
      <p>Here are some of the things I&apos;ve built recently.</p>

      <div style={{ marginTop: '2rem' }}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </main>
  );
}
