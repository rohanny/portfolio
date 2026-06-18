import { Header } from "./components/header";
import { Experience } from "./components/experience";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import { Me } from "./components/me";
// import { Blog } from "./components/blog";
import { Spotify } from "./components/spotify";
import { Navbar } from "./components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

type View = 'about' | 'experience' | 'projects' | 'me' | 'contact';

const viewFromPath = (path: string): View => {
  const clean = path.replace(/^\//, '').toLowerCase();
  if (['experience', 'projects', 'me', 'contact'].includes(clean)) {
    return clean as View;
  }
  return 'about';
};

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 20 : direction < 0 ? -20 : 0,
  }),
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const,
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -20 : direction < 0 ? 20 : 0,
    transition: {
      duration: 0.15,
      ease: [0.42, 0, 1, 1] as const,
    }
  })
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>(() => {
    if (typeof window !== 'undefined') {
      return viewFromPath(window.location.pathname);
    }
    return 'about';
  });
  const [direction, setDirection] = useState(0);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;

  const handleViewChange = useCallback((newView: View, pushState = true) => {
    const views: View[] = ['about', 'experience', 'projects', 'contact', 'me'];
    const curIdx = views.indexOf(currentViewRef.current);
    const newIdx = views.indexOf(newView);
    if (newIdx !== curIdx) {
      setDirection(newIdx > curIdx ? 1 : -1);
      setCurrentView(newView);
      if (pushState) {
        const path = newView === 'about' ? '/' : `/${newView}`;
        window.history.pushState({ view: newView }, '', path);
      }
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const view = viewFromPath(window.location.pathname);
      handleViewChange(view, false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleViewChange]);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl && 
        (activeEl.tagName === "INPUT" || 
         activeEl.tagName === "TEXTAREA" || 
         activeEl.isContentEditable)
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "a":
          handleViewChange("about");
          break;
        case "e":
          handleViewChange("experience");
          break;
        case "p":
          handleViewChange("projects");
          break;
        case "m":
          handleViewChange("me");
          break;
        case "c":
          handleViewChange("contact");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleViewChange]);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0c0d10] text-zinc-850 dark:text-zinc-300 font-sans selection:bg-zinc-800/80 dark:selection:bg-zinc-200/80 selection:text-white dark:selection:text-black pb-24 transition-colors duration-500 relative overflow-hidden lowercase">
      <Navbar 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        isDarkMode={isDark} 
        onThemeToggle={handleThemeToggle} 
      />

      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[350px] bg-radial-gradient from-zinc-300/20 dark:from-zinc-900/40 via-transparent to-transparent pointer-events-none blur-3xl opacity-50 z-0 transition-all duration-550" />

      <div className="max-w-2xl mx-auto px-6 pt-28 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          {currentView === "about" && (
            <motion.div
              key="about"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Header />
              </div>

              <div>
                <Spotify isDarkMode={isDark} />
              </div>
            </motion.div>
          )}

          {currentView === "experience" && (
            <motion.div
              key="experience"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Experience />
              </div>
            </motion.div>
          )}

          {currentView === "projects" && (
            <motion.div
              key="projects"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Projects />
              </div>
            </motion.div>
          )}

          {currentView === "me" && (
            <motion.div
              key="me"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Me isDarkMode={isDark} />
              </div>
            </motion.div>
          )}

          {currentView === "contact" && (
            <motion.div
              key="contact"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Contact isDarkMode={isDark} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

