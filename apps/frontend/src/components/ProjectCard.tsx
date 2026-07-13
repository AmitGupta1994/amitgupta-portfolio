type ProjectProps = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectCard({ title, description, techStack, githubUrl, liveUrl }: ProjectProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>{description}</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        {techStack.map((tech) => (
          <span key={tech} style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '0.875rem', color: '#333' }}>
            {tech}
          </span>
        ))}
      </div>

      <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
        View Project
      </a>
    </div>
  );
}
