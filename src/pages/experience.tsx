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
              <div className="w-full sm:w-32 text-left text-gray-600 dark:text-zinc-100 text-sm sm:text-base font-light pt-1 mb-1 sm:mb-0">
                {exp.date}
              </div>
              <div className="flex align-middle items-start lg:items-center gap-2 sm:gap-4 flex-1 w-full text-sm sm:text-base text-gray-700 dark:text-zinc-200 font-normal relative">
                <span className={`pt-2 ${isDarkMode ? "text-zinc-100" : "text-gray-700"}`}>{exp.role}</span>
                <button
                  onClick={() => handleCompanyClick(exp.company)}
                  className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-medium shadow-sm transition-all duration-200 cursor-pointer hover:scale-105 ${isDarkMode ? 'bg-zinc-700 text-zinc-100' : 'bg-white text-stone-800 border border-stone-400 hover:bg-gray-100'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="w-6 h-6 mr-2 flex items-center justify-center">{exp.logo}</span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-100' : 'text-stone-500'}`}>{exp.company}</span>
                  {exp.product && <span className="ml-2 text-gray-400 dark:text-zinc-300 font-normal">{exp.product}</span>}
                </button>
                <span className={`flex items-center gap-1 font-shadows tracking-wider ${isDarkMode? 'text-white':'text-gray-900'} absolute left-2/3 -translate-x-1/3 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2`}>
                  <span className="pt-2">view more</span>
                  <span className="inline-block align-middle">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 85 71">
                      <path d="M0 0 C6.28371307 -0.10064005 12.32809949 0.24058331 18.5625 1 C19.78936523 1.14308594 19.78936523 1.14308594 21.04101562 1.2890625 C23.02788675 1.52144509 25.01402794 1.76005516 27 2 C27 2.99 27 3.98 27 5 C22.05 5 17.1 5 12 5 C13.9078125 5.89460937 15.815625 6.78921875 17.78125 7.7109375 C41.45656854 18.88010318 41.45656854 18.88010318 50.4375 24.4375 C51.03691406 24.80085449 51.63632813 25.16420898 52.25390625 25.53857422 C56.55465381 28.310306 60.13882568 31.75914132 63 36 C63.375 38.9375 63.375 38.9375 63 41 C50.48985727 47.22348009 37.05619015 48.92049011 23.37011719 50.84472656 C20.47691688 51.25325944 17.58617935 51.67686575 14.6953125 52.1015625 C12.84908716 52.3654861 11.00273709 52.62853895 9.15625 52.890625 C8.29584106 53.0176178 7.43543213 53.1446106 6.5489502 53.27545166 C5.74711304 53.38596863 4.94527588 53.4964856 4.11914062 53.61035156 C3.06756775 53.75999359 3.06756775 53.75999359 1.99475098 53.91265869 C-0.1926081 54.00843346 -1.91232425 53.62820394 -4 53 C-4 52.34 -4 51.68 -4 51 C4.81056871 48.88038425 13.73749973 47.59538086 22.69091797 46.25268555 C30.17687996 45.12596734 37.64912585 43.9465982 45.0859375 42.52734375 C46.24915527 42.3068335 47.41237305 42.08632324 48.61083984 41.85913086 C52.33024162 40.91628582 55.51685255 39.59466396 59 38 C55.33430239 29.28085975 43.34448068 25.40243366 35.31542969 21.3034668 C33.36859473 20.30922886 31.42622865 19.30666098 29.484375 18.30273438 C23.72516557 15.33981429 17.97478262 12.50156733 12 10 C12.5775 10.55429687 13.155 11.10859375 13.75 11.6796875 C14.86375 12.76636719 14.86375 12.76636719 16 13.875 C16.7425 14.59429687 17.485 15.31359375 18.25 16.0546875 C20 18 20 18 20 20 C14.89805834 18.00871099 12.01798004 13.6715657 8.53515625 9.62890625 C6.15816361 6.92348531 6.15816361 6.92348531 3.24609375 5.40234375 C1 4 1 4 0.35961914 1.91235352 C0.24094482 1.28127686 0.12227051 0.6502002 0 0 Z " fill={isDarkMode ? '#fff' : '#313131'} />
                      <path d="M0 0 C3.3 0 6.6 0 10 0 C10 0.99 10 1.98 10 3 C6.37 2.67 2.74 2.34 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill={isDarkMode ? '#fff' : '#404040'} />
                    </svg>
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkExperience; 