import Image from 'next/image';
import { Project } from '@/types/project';

type ProjectCardProps = Omit<Project, 'id'>;

export default function ProjectCard({ title, description, techStack, githubUrl, liveUrl, imageUrl }: ProjectCardProps) {
  return (
    <div className="group flex flex-col bg-white border border-neutral-200/80 dark:bg-neutral-900/70 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">{title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 flex-grow leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-5">
          {techStack.map((tech) => (
            <span key={tech} className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-full border border-neutral-200/60 dark:border-neutral-700/60">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
          {githubUrl !== "#" && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.79 23.04c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.44-4.04-1.44-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.06 1.82 2.78 1.29 3.46.99.11-.77.42-1.29.76-1.59-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
              Code
            </a>
          )}
          {liveUrl !== "#" && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/link inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:underline transition-colors"
            >
              Live Demo
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transform transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
