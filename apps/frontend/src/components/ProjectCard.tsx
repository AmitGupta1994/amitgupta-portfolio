import Image from 'next/image';

type ProjectProps = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

export default function ProjectCard({ title, description, techStack, githubUrl, liveUrl, imageUrl }: ProjectProps) {
  return (
    <div className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-6 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full border border-neutral-200">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {githubUrl !== "#" && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
              GitHub
            </a>
          )}
          {liveUrl !== "#" && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
