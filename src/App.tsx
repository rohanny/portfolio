import { Header } from "./components/header";
import { Experience } from "./components/experience";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import { Me } from "./components/me";
import { Blog } from "./components/blog";
import { SpotifyCard } from "./components/spotify-card";
import { Navbar } from "./components/navbar";
import { HomeFeatured } from "./components/featured";
import { Terminal } from "./components/terminal";
import { PixelGridTrail } from "./components/pixel-grid-trail";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

type View = 'home' | 'experience' | 'projects' | 'me' | 'contact' | 'blog';

const viewFromPath = (path: string): View => {
  const clean = path.replace(/^\//, '').toLowerCase();
  const base = clean.split('/')[0];
  if (['experience', 'projects', 'me', 'contact', 'blog'].includes(base)) {
    return base as View;
  }
  return 'home';
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
    return 'home';
  });
  const [direction, setDirection] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;

  const handleViewChange = useCallback((newView: View, pushState = true) => {
    const views: View[] = ['home', 'experience', 'projects', 'contact', 'me', 'blog'];
    const curIdx = views.indexOf(currentViewRef.current);
    const newIdx = views.indexOf(newView);
    if (newIdx !== curIdx) {
      setDirection(newIdx > curIdx ? 1 : -1);
      setCurrentView(newView);
      if (pushState) {
        const path = newView === 'home' ? '/' : `/${newView}`;
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

  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore navigation shortcuts if modifier keys are pressed (e.g. Ctrl+C)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        // Allow backtick to toggle even when input is active, but only if it's the backtick key
        if (e.key === "`") {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
        return;
      }

      if (e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      switch (e.key.toLowerCase()) {
        case "h":
          handleViewChange("home");
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
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0c0d10] text-zinc-850 dark:text-zinc-300 font-sans selection:bg-zinc-800/80 dark:selection:bg-zinc-200/80 selection:text-white dark:selection:text-black pb-24 transition-colors duration-150 relative overflow-hidden lowercase">
      <PixelGridTrail isDarkMode={isDark} />
      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        isDarkMode={isDark}
        onThemeToggle={handleThemeToggle}
      />

      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[350px] bg-radial-gradient from-zinc-300/20 dark:from-zinc-900/40 via-transparent to-transparent pointer-events-none blur-3xl opacity-50 z-0 transition-all duration-550" />

      <div className="max-w-2xl mx-auto px-6 pt-20 sm:pt-28 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          {currentView === "home" && (
            <motion.div
              key="home"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Header onViewChange={handleViewChange} />
              </div>

              <div>
                <HomeFeatured onViewChange={handleViewChange} />
              </div>

              <div className="!mt-8">
                <SpotifyCard isDarkMode={isDark} />
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

          {currentView === "blog" && (
            <motion.div
              key="blog"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >
              <div>
                <Blog />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        isDarkMode={isDark}
        onThemeToggle={handleThemeToggle}
        onViewChange={handleViewChange}
      />
    </div>
    </MotionConfig>
  );
}

