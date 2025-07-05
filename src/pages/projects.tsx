import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectsProps {
  isDarkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const projects = [
    {
      title: "Fine Dine",
      description: "A contactless dining website built with jQuery, HTML, and Tailwind CSS. Created during the pandemic to minimize human interaction while dining out.",
      tech: ["jQuery", "HTML", "Tailwind CSS"],
      link: "https://abhiraj-kale.github.io/fine-dine-admin-frontend/public/webpages/homepage.html",
      github: "https://github.com/geek-lords/fine-dine-admin-frontend"
    },
    {
      title: "Preeti Bhojan",
      description: "A landing page for a mobile application designed to boost user engagement and drive downloads with an appealing UI.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://preetibhojan.co.in/",
      github: "https://github.com/rohannY/PreetiBhojan"
    }
  ];

  return (
    <motion.div 
      className="h-full flex flex-col justify-start font-['Geist'] max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl">
        <motion.h1 
          className={`text-2xl font-bold mb-6 font-['Playfair_Display'] ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Projects
        </motion.h1>
        
        <motion.p 
          className={`text-sm leading-relaxed mb-6 font-light ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Here are some of the projects I've worked on.
        </motion.p>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? "bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border-zinc-700/50 hover:border-zinc-600/50" 
                  : "bg-gradient-to-br from-stone-200/80 to-stone-300/80 border-stone-600/40 hover:border-stone-700/50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkMode ? "from-blue-500/5 via-purple-500/5 to-pink-500/5" : "from-blue-500/5 via-purple-500/5 to-pink-500/5"
              }`} />
              
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${
                      isDarkMode 
                        ? "from-white to-gray-300 bg-clip-text text-transparent" 
                        : "from-stone-900 to-stone-700 bg-clip-text text-transparent"
                    }`}>
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed font-light ${
                      isDarkMode ? "text-gray-300" : "text-stone-900"
                    }`}>
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 ml-4">
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                          isDarkMode 
                            ? "bg-zinc-700/50 text-blue-400 hover:bg-zinc-600/50 hover:text-blue-300" 
                            : "bg-stone-200/80 text-blue-600 hover:bg-stone-300/80 hover:text-blue-700"
                        }`}
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                        isDarkMode 
                          ? "bg-zinc-700/50 text-gray-300 hover:bg-zinc-600/50 hover:text-white" 
                          : "bg-stone-200/80 text-stone-900 hover:bg-stone-300/80 hover:text-stone-900"
                      }`}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                        isDarkMode 
                          ? "bg-zinc-700/50 border-zinc-600/50 text-zinc-200 hover:bg-zinc-600/50" 
                          : "bg-stone-200/80 border-stone-400/50 text-stone-900 hover:bg-stone-300/80"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div 
          className="mt-6 pt-4 border-t border-dashed border-stone-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="flex justify-end">
            <a
              href="https://github.com/rohannY?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-light transition-all duration-300 group ${
                isDarkMode 
                  ? "text-zinc-400 hover:text-zinc-300" 
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              View more projects on{" "}
              <span className="underline underline-offset-2 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500">GitHub</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects; 