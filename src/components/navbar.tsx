import React from "react";
import { ThemeToggle } from "./theme";
import { motion } from "framer-motion";

interface NavbarProps {
  currentView: 'home' | 'experience' | 'projects' | 'me' | 'contact' | 'blog';
  onViewChange: (view: 'home' | 'experience' | 'projects' | 'me' | 'contact' | 'blog') => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onViewChange,
  isDarkMode,
  onThemeToggle
}) => {
  const getLinkClass = (view: 'home' | 'experience' | 'projects' | 'me' | 'contact' | 'blog') => {
    const isActive = currentView === view;
    return `relative py-2 text-[11px] sm:text-xs font-mono transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${
      isActive 
        ? "text-zinc-900 dark:text-white font-medium" 
        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
    }`;
  };

  return (
    <nav aria-label="main navigation" className="fixed top-0 left-0 w-full z-40 border-b border-zinc-200/50 dark:border-zinc-900/50 bg-zinc-50/70 dark:bg-[#0c0d10]/70 backdrop-blur-md transition-colors duration-150">
      <div className="max-w-2xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">
        <button 
          onClick={() => onViewChange("home")}
          className="font-mono text-sm font-semibold text-zinc-900 dark:text-white cursor-pointer hidden min-[380px]:block"
        >
          ry.
        </button>
        <div className="flex items-center gap-2.5 sm:gap-5 w-full min-[380px]:w-auto justify-between min-[380px]:justify-end whitespace-nowrap">
          <button 
            onClick={() => onViewChange("home")}
            aria-current={currentView === "home" ? "page" : undefined}
            className={getLinkClass("home")}
          >
            [h]ome
            {currentView === "home" && <motion.span layoutId="nav-active-indicator" className="absolute inset-x-0 -bottom-0.5 h-px bg-zinc-700 dark:bg-zinc-200" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </button>
          <button 
            onClick={() => onViewChange("experience")}
            aria-current={currentView === "experience" ? "page" : undefined}
            className={getLinkClass("experience")}
          >
            <span className="hidden sm:inline">[e]xperience</span>
            <span className="inline sm:hidden">[e]xp</span>
            {currentView === "experience" && <motion.span layoutId="nav-active-indicator" className="absolute inset-x-0 -bottom-0.5 h-px bg-zinc-700 dark:bg-zinc-200" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </button>
          <button 
            onClick={() => onViewChange("projects")}
            aria-current={currentView === "projects" ? "page" : undefined}
            className={getLinkClass("projects")}
          >
            <span className="hidden sm:inline">[p]rojects</span>
            <span className="inline sm:hidden">[p]roj</span>
            {currentView === "projects" && <motion.span layoutId="nav-active-indicator" className="absolute inset-x-0 -bottom-0.5 h-px bg-zinc-700 dark:bg-zinc-200" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </button>
          <button 
            onClick={() => onViewChange("contact")}
            aria-current={currentView === "contact" ? "page" : undefined}
            className={getLinkClass("contact")}
          >
            [c]ontact
            {currentView === "contact" && <motion.span layoutId="nav-active-indicator" className="absolute inset-x-0 -bottom-0.5 h-px bg-zinc-700 dark:bg-zinc-200" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </button>
          <button 
            onClick={() => onViewChange("me")}
            aria-current={currentView === "me" ? "page" : undefined}
            className={getLinkClass("me")}
          >
            [m]e
            {currentView === "me" && <motion.span layoutId="nav-active-indicator" className="absolute inset-x-0 -bottom-0.5 h-px bg-zinc-700 dark:bg-zinc-200" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </button>
          
          <div className="border-l border-zinc-200 dark:border-zinc-800/80 h-4 pl-3 sm:pl-3.5 flex items-center">
            <ThemeToggle 
              isDarkMode={isDarkMode} 
              toggleDarkMode={onThemeToggle} 
              className="p-1.5 border-none bg-transparent dark:bg-transparent shadow-none hover:text-zinc-900 dark:hover:text-white"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
