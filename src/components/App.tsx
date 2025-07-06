import { FileText, Home, Link, Code, Briefcase } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Shell from "./shell";
import HomePage from "./home";
import Projects from "./projects";
import WorkExperience from "./experience";
import TechStack from "./tech";
import Links from "./links";

const items = [
  { label: "Home", icon: <Home className="w-full h-full" />, path: "/" },
  { label: "Work Experience", icon: <Briefcase className="w-full h-full" />, path: "/work-experience" },
  { label: "Projects", icon: <FileText className="w-full h-full" />, path: "/projects" },
  { label: "Tech Stack", icon: <Code className="w-full h-full" />, path: "/tech-stack" },
  { label: "Links", icon: <Link className="w-full h-full" />, path: "/links" },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("Home");
  
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handlePageChange = (pageName: string) => {
    setCurrentPage(pageName);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full"
          >
            <HomePage isDarkMode={isDarkMode} />
          </motion.div>
        );
      case "Work Experience":
        return (
          <motion.div
            key="work-experience"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full"
          >
            <WorkExperience isDarkMode={isDarkMode} />
          </motion.div>
        );
      case "Projects":
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full"
          >
            <Projects isDarkMode={isDarkMode} />
          </motion.div>
        );
      case "Tech Stack":
        return (
          <motion.div
            key="tech-stack"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full"
          >
            <TechStack isDarkMode={isDarkMode} />
          </motion.div>
        );
      case "Links":
        return (
          <motion.div
            key="links"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full"
          >
            <Links isDarkMode={isDarkMode} />
          </motion.div>
        );
      default:
        return <HomePage isDarkMode={isDarkMode} />;
    }
  };

  return (
    <Shell
      items={items}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onItemClick={handlePageChange}
      currentPage={currentPage}
    >
      {renderPage()}
    </Shell>
  );
}

export default App; 