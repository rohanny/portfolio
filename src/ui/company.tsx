import React from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyDetailsProps {
  company: string;
  isDarkMode: boolean;
  onBack: () => void;
}

const companyData = {
  "Softlink Global": {
    logo: "/softlink.png",
    description: "Leading technology company specializing in innovative software solutions, digital transformation, and enterprise applications. Focuses on creating scalable, modern applications with cutting-edge technologies.",
    role: "Software Engineer L1",
    duration: "2024 - Present",
    technologies: ["Dotnet", "React", "Node.js", "OpenTelemetry", "CI/CD", "Keycloak"],
    projects: [
      {
        name: "LogiDocs",
        description: "A comprehensive system where users can create, customize, and reuse logistical document templates. Enables efficient document management and standardization across logistics operations."
      },
      {
        name: "LogiBrain",
        description: "Advanced logistics intelligence platform that leverages AI and machine learning to optimize supply chain operations, route planning, and resource allocation."
      }
    ],
    location: "Mumbai",
    industry: "Technology & Logistics"
  }
};

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, isDarkMode, onBack }) => {
  const data = companyData[company as keyof typeof companyData];

  if (!data) {
    return (
      <motion.div 
        className="h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          <h1 className="text-lg font-medium mb-3">Company not found</h1>
          <button
            onClick={onBack}
            className={`px-3 py-1.5 text-sm rounded ${
              isDarkMode 
                ? "bg-zinc-800 text-white hover:bg-zinc-700" 
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            } transition-colors`}
          >
            Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="h-full flex flex-col pt-8 font-['Geist'] max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <button
          onClick={onBack}
          className={`p-1.5 rounded transition-colors ${
            isDarkMode 
              ? "text-zinc-400 hover:text-white hover:bg-zinc-800" 
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <img src={data.logo} alt={company} className="w-6 h-6 rounded object-contain" />
          <h1 className={`text-lg font-semibold font-['Playfair_Display'] ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            {company}
          </h1>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 space-y-6">
        {/* Basic Info */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="space-y-2">
            <h3 className={`text-sm font-medium uppercase tracking-wide ${
              isDarkMode ? "text-zinc-400" : "text-gray-800"
            }`}>
              Role & Duration
            </h3>
            <div className="space-y-1">
              <p className={`text-sm ${isDarkMode ? "text-zinc-200" : "text-gray-700"}`}>
                <span className="font-medium">Position:</span> {data.role}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-zinc-200" : "text-gray-700"}`}>
                <span className="font-medium">Duration:</span> {data.duration}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-zinc-200" : "text-gray-700"}`}>
                <span className="font-medium">Location:</span> {data.location}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-zinc-200" : "text-gray-700"}`}>
                <span className="font-medium">Industry:</span> {data.industry}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className={`text-sm font-medium uppercase tracking-wide ${
              isDarkMode ? "text-zinc-400" : "text-gray-800"
            }`}>
              Technologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    isDarkMode 
                      ? "bg-slate-700 text-zinc-200" 
                      : "bg-gray-200 text-gray-800"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className={`text-sm font-medium uppercase tracking-wide ${
            isDarkMode ? "text-zinc-400" : "text-gray-800"
          }`}>
            About {company}
          </h3>
          <p className={`text-sm leading-relaxed ${
            isDarkMode ? "text-zinc-200" : "text-gray-700"
          }`}>
            {data.description}
          </p>
        </motion.div>

        {/* Projects */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className={`text-sm font-medium uppercase tracking-wide ${
            isDarkMode ? "text-zinc-400" : "text-gray-500"
          }`}>
            Key Projects
          </h3>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="space-y-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <h4 className={`text-sm font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {project.name}
                </h4>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? "text-zinc-200" : "text-gray-700"
                }`}>
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanyDetails; 