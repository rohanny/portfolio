import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectsProps {
  isDarkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const projects = [
  {
    title: "Fine Dine",
    description: "A contactless dining website built with jQuery, HTML, and Tailwind CSS. Created during the pandemic to minimize human interaction while dining out, ensuring a safer experience.",
    tech: ["jQuery", "HTML", "Tailwind CSS"],
    link: "https://abhiraj-kale.github.io/fine-dine-admin-frontend/public/webpages/homepage.html",
    github: "https://github.com/geek-lords/fine-dine-admin-frontend"
  },
  {
    title: "Cine Phile",
    description: "A streaming platform with social features built using React and Tailwind CSS. Offers a diverse library of movies and TV shows with an innovative chat feature powered by Stream Chat.",
    tech: ["React", "Tailwind CSS", "Stream Chat"],
    link: "#",
    github: "https://github.com/rohannY/Cine-Phile"
  },
  {
    title: "Preeti Bhojan",
    description: "A captivating landing page for a mobile application designed to boost user engagement and drive downloads. Features a visually appealing design that effectively showcases the app's value proposition.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://preetibhojan.co.in/",
    github: "https://github.com/rohannY/PreetiBhojan"
  },
  {
    title: "Article Summarizer",
    description: "A web application that uses NLP and machine learning to automatically generate concise summaries of articles. Built with React and Tailwind CSS for enhanced productivity and time-saving.",
    tech: ["React", "Tailwind CSS", "NLP"],
    link: "#",
    github: "https://github.com/rohannY/summarizer-ui"
  }
];

  return (
    <motion.div 
      className="h-full flex flex-col justify-start font-['Geist'] max-w-3xl pb-10 lg:pb-0"
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
                  ? "bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border-zinc-700/30 hover:border-zinc-600/40" 
                  : "bg-gradient-to-br from-stone-900/10 to-stone-800/15 border-stone-800/20 hover:border-stone-700/30"
              } ${index >= 2 ? 'block lg:hidden' : ''}`}
              style={!isDarkMode ? {
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                backgroundBlendMode: 'overlay',
                backgroundSize: '150px 150px'
              } : {}}
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-bold bg-gradient-to-r ${
                        isDarkMode 
                          ? "from-white to-gray-300 bg-clip-text text-transparent" 
                          : "from-stone-900 to-stone-700 bg-clip-text text-transparent"
                      }`}>
                        {project.title}
                      </h3>
                      
                      {/* Action buttons - beside title on mobile */}
                      <div className="flex gap-2 lg:hidden">
                        {project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                              isDarkMode 
                                ? "bg-zinc-700/20 text-blue-400 hover:bg-zinc-600/30 hover:text-blue-300" 
                                : "bg-stone-900/10 text-blue-600 hover:bg-stone-800/20 hover:text-blue-700"
                            }`}
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                            isDarkMode 
                              ? "bg-zinc-700/20 text-gray-300 hover:bg-zinc-600/30 hover:text-white" 
                              : "bg-stone-900/10 text-stone-900 hover:bg-stone-800/20 hover:text-stone-900"
                          }`}
                          title="GitHub"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                    
                    <p className={`text-sm leading-relaxed font-light ${
                      isDarkMode ? "text-gray-300" : "text-stone-900"
                    }`}>
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Action buttons - right side on desktop */}
                  <div className="hidden lg:flex gap-2 ml-4">
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                          isDarkMode 
                            ? "bg-zinc-700/20 text-blue-400 hover:bg-zinc-600/30 hover:text-blue-300" 
                            : "bg-stone-900/10 text-blue-600 hover:bg-stone-800/20 hover:text-blue-700"
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
                          ? "bg-zinc-700/20 text-gray-300 hover:bg-zinc-600/30 hover:text-white" 
                          : "bg-stone-900/10 text-stone-900 hover:bg-stone-800/20 hover:text-stone-900"
                      }`}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                {/* Tech stack */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-stone-500/10">
                  <span className={`text-xs font-light ${
                    isDarkMode ? "text-zinc-400" : "text-stone-600"
                  }`}>
                    built with
                  </span>
                  <div className="flex items-center gap-1">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`text-xs font-medium transition-all duration-200 ${
                          isDarkMode 
                            ? "text-zinc-300 hover:text-zinc-100" 
                            : "text-stone-700 hover:text-stone-900"
                        }`}
                      >
                        {tech}
                        {techIndex < project.tech.length - 1 && (
                          <span className={`mx-1 ${
                            isDarkMode ? "text-zinc-500" : "text-stone-400"
                          }`}>
                            •
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
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