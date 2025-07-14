import { FileText, Home, Link, Code, Briefcase } from "lucide-react";
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Shell from "./ui/shell";

// Lazy load all page components
const HomePage = lazy(() => import("./pages/home"));
const Projects = lazy(() => import("./pages/projects"));
const WorkExperience = lazy(() => import("./pages/experience"));
const TechStack = lazy(() => import("./pages/tech"));
const Links = lazy(() => import("./pages/links"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-400"></div>
  </div>
);

const items = [
  { label: "Home", icon: <Home className="w-full h-full" />, path: "/" },
  { label: "Work Experience", icon: <Briefcase className="w-full h-full" />, path: "/work-experience" },
  { label: "Projects", icon: <FileText className="w-full h-full" />, path: "/projects" },
  { label: "Tech Stack", icon: <Code className="w-full h-full" />, path: "/tech-stack" },
  { label: "Links", icon: <Link className="w-full h-full" />, path: "/links" },
];

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handlePageChange = (pageName: string) => {
    const item = items.find(item => item.label === pageName);
    if (item) {
      navigate(item.path);
    }
  };

  // Find the active label based on the current path
  const activeLabel = items.find(item => item.path === location.pathname)?.label;

  return (
    <Shell
      items={items}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onItemClick={handlePageChange}
      activeLabel={activeLabel}
    >
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
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
          } />
          <Route path="/work-experience" element={
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
          } />
          <Route path="/projects" element={
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
          } />
          <Route path="/tech-stack" element={
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
          } />
          <Route path="/links" element={
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
          } />
        </Routes>
      </Suspense>
    </Shell>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
