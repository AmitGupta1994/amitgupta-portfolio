import { projectsData } from "@/data/projectsData";

export default function Projects() {
  return (
    <section className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Featured Projects
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          A selection of my recent engineering work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {project.title}
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300 flex-grow">
              {project.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                View Source →
              </a>
              {project.liveUrl !== "#" && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}