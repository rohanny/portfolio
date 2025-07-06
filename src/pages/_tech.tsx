import React from "react";
import { motion } from "framer-motion";

interface TechStackProps {
  isDarkMode: boolean;
}

const techCategories = [
  {
    name: "Frontend",
    technologies: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue.js" },
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind" },
      { name: "Bootstrap" },
      { name: "Sass" },
    ],
  },
  {
    name: "Backend & Databases",
    technologies: [
      { name: "Node.js" },
      { name: ".NET" },
      { name: "Python" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Prisma" },
    ],
  },
  {
    name: "Cloud & DevOps",
    technologies: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Jenkins" },
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "Firebase" },
    ],
  },
  {
    name: "Monitoring & Security",
    technologies: [
      { name: "OpenTelemetry" },
      { name: "Keycloak" },
      { name: "Prometheus" },
      { name: "Grafana" },
    ],
  },
  {
    name: "Development Tools",
    technologies: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Jira" },
      { name: "Confluence" },
      { name: "Figma" },
      { name: "Adobe XD" },
    ],
  }
];

const TechStack: React.FC<TechStackProps> = ({ isDarkMode }) => {
  return (
    <motion.div 
      className="h-full flex flex-col font-['Geist'] max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1
          className={`text-2xl font-bold font-['Playfair_Display'] mb-2 ${
          isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Tech Stack
        </h1>
        <p
          className={`text-sm ${
            isDarkMode ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          Technologies and tools I work with
        </p>
      </motion.div>

      {/* Tech Categories */}
      <div className="space-y-10">
        {techCategories.map((category, index) => (
          <motion.div
            key={category.name}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
          >
            {/* Category Header */}
            <h3
              className={`text-sm font-medium uppercase tracking-wide ${
              isDarkMode ? "text-zinc-400" : "text-gray-500"
              }`}
            >
              {category.name}
            </h3>

            {/* Technologies */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech, techIndex) => (
                  <motion.span
                  key={tech.name}
                    className={`text-xs font-medium transition-all duration-200 ${
                      isDarkMode 
                        ? "text-zinc-300 hover:text-zinc-100" 
                        : "text-stone-700 hover:text-stone-900"
                    }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                      delay: 0.3 + index * 0.1 + techIndex * 0.05,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                    {tech.name}
                  </motion.span>
              ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechStack; 
