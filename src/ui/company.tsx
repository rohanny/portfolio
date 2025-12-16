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
    description: "Leading software provider in freight forwarding, logistics, and supply chain industry since 2005. Delivers end-to-end digital solutions through cloud-native ERP platforms, customs clearance software, and blockchain-powered data exchange systems.",
    role: "Software Engineer L1",
    duration: "June 2024 - Present",
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
                : "bg-amber-800 text-white hover:bg-amber-700"
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
      className="h-full flex flex-col font-['Geist'] max-w-3xl"
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
              : "text-amber-700 hover:text-amber-900 hover:bg-amber-100"
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
            <div className={`font-retro grid grid-cols-1 sm:grid-cols-2 rounded-lg border-2 border-dashed ${
              isDarkMode ? "border-zinc-700" : "border-zinc-300"
            }`}>
              <div className={`p-3 flex flex-row items-baseline gap-2 border-b-2 sm:border-r-2 border-dashed ${
                isDarkMode ? "border-zinc-700" : "border-zinc-300"
              }`}>
                <span className={`text-[10px] uppercase tracking-wider ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  Position:
                </span>
                <span className={`text-[10px] ${isDarkMode ? "text-zinc-100" : "text-gray-900"}`}>
                  {data.role}
                </span>
              </div>
              <div className={`p-3 flex flex-row items-baseline gap-2 border-b-2 border-dashed ${
                isDarkMode ? "border-zinc-700" : "border-zinc-300"
              }`}>
                <span className={`text-[10px] uppercase tracking-wider ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  Duration:
                </span>
                <span className={`text-[10px] ${isDarkMode ? "text-zinc-100" : "text-gray-900"}`}>
                  {data.duration}
                </span>
              </div>
              <div className={`p-3 flex flex-row items-baseline gap-2 border-b-2 sm:border-b-0 sm:border-r-2 border-dashed ${
                isDarkMode ? "border-zinc-700" : "border-zinc-300"
              }`}>
                <span className={`text-[10px] uppercase tracking-wider ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  Location:
                </span>
                <span className={`text-[10px] ${isDarkMode ? "text-zinc-100" : "text-gray-900"}`}>
                  {data.location}
                </span>
              </div>
              <div className="p-3 flex flex-row items-baseline gap-2">
                <span className={`text-[10px] uppercase tracking-wider ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  Industry:
                </span>
                <span className={`text-[10px] ${isDarkMode ? "text-zinc-100" : "text-gray-900"}`}>
                  {data.industry}
                </span>
              </div>
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