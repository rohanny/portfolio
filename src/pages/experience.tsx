import React, { useState } from "react";
import CompanyDetails from "../ui/company";
import { motion } from "framer-motion";

interface WorkExperienceProps {
  isDarkMode: boolean;
}

const experiences = [
  {
    date: "2024 - Present",
    role: "Software Engineer L1 at",
    company: "Softlink Global",
    product: "",
    logo: <img src="/softlink.png" alt="Softlink Global" className="w-7 h-7 mr-2 rounded object-contain" /> 
  }
];

const WorkExperience: React.FC<WorkExperienceProps> = ({ isDarkMode }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleCompanyClick = (company: string) => {
    setSelectedCompany(company);
  };

  const handleBack = () => {
    setSelectedCompany(null);
  };

  if (selectedCompany) {
    return <CompanyDetails company={selectedCompany} isDarkMode={isDarkMode} onBack={handleBack} />;
  }

  return (
    <motion.div 
      className="h-full flex flex-col justify-start font-['Geist']"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className={`text-2xl font-bold font-['Playfair_Display'] mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Work Experience
          </h1>
        </motion.div>
        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <div className="w-full sm:w-32 text-left text-gray-600 dark:text-zinc-100 text-sm sm:text-base font-light mb-1 sm:mb-0">
                {exp.date}
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-4 flex-1 w-full text-sm sm:text-base text-gray-700 dark:text-zinc-200 font-normal">
                <span className={isDarkMode ? "text-zinc-100" : "text-gray-700"}>{exp.role}</span>
                <button
                  onClick={() => handleCompanyClick(exp.company)}
                  className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-medium shadow-sm transition-all duration-200 cursor-pointer hover:scale-105 ${isDarkMode ? 'bg-zinc-700 text-zinc-100' : 'bg-gray-100 text-gray-900 border border-gray-300'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="w-6 h-6 mr-2 flex items-center justify-center">{exp.logo}</span>
                  <span className="hover:text-blue-500">{exp.company}</span>
                  {exp.product && <span className="ml-2 text-gray-400 dark:text-zinc-300 font-normal">{exp.product}</span>}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkExperience; 