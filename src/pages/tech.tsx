import React from "react";
import { motion } from "framer-motion";
import { Monitor} from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiDotnet,
  SiPython,
  SiExpress,
  SiAmazon,
  SiGit,
  SiPostman,
  SiJira,
  SiConfluence,
  SiOpentelemetry,
  SiKeycloak,
  SiPrometheus,
  SiGrafana,
} from "react-icons/si";

interface TechStackProps {
  isDarkMode: boolean;
}

const techCategories = [
  {
    name: "Frontend",
    technologies: [
      { name: "React", icon: <SiReact className="w-6 h-6" /> },
      { name: "TypeScript", icon: <SiTypescript className="w-6 h-6" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-6 h-6" /> },
      { name: "HTML5", icon: <SiHtml5 className="w-6 h-6" /> },
      { name: "CSS3", icon: <SiCss3 className="w-6 h-6" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="w-6 h-6" /> },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6" /> },
      { name: ".NET", icon: <SiDotnet className="w-6 h-6" /> },
      { name: "Python", icon: <SiPython className="w-6 h-6" /> },
      { name: "Express", icon: <SiExpress className="w-6 h-6" /> },
      { name: "AWS", icon: <SiAmazon className="w-6 h-6" /> },
    ],
  },
  {
    name: "Monitoring & Security",
    technologies: [
      { name: "OpenTelemetry", icon: <SiOpentelemetry className="w-6 h-6" /> },
      { name: "Keycloak", icon: <SiKeycloak className="w-6 h-6" /> },
      { name: "Prometheus", icon: <SiPrometheus className="w-6 h-6" /> },
      { name: "Grafana", icon: <SiGrafana className="w-6 h-6" /> },
    ],
  },
  {
    name: "Tools & Platforms",
    technologies: [
      { name: "Git", icon: <SiGit className="w-6 h-6" /> },
      { name: "VS Code", icon: <Monitor className="w-6 h-6" /> },
      { name: "Postman", icon: <SiPostman className="w-6 h-6" /> },
      { name: "Jira", icon: <SiJira className="w-6 h-6" /> },
      { name: "Confluence", icon: <SiConfluence className="w-6 h-6" /> },
    ],
  },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="grid grid-cols-3 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  className="flex flex-col items-center space-y-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.1 + techIndex * 0.05,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tech.icon}
                  </div>
                  <span
                    className={`text-xs font-medium text-center ${
                      isDarkMode ? "text-zinc-200" : "text-gray-700"
                    }`}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechStack;
