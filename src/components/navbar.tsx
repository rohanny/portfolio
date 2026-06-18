import React from "react";
import { ThemeToggle } from "./theme";

interface NavbarProps {
  currentView: 'about' | 'experience' | 'projects' | 'me' | 'contact';
  onViewChange: (view: 'about' | 'experience' | 'projects' | 'me' | 'contact') => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onViewChange,
  isDarkMode,
  onThemeToggle
}) => {
  const getLinkClass = (view: 'about' | 'experience' | 'projects' | 'me' | 'contact') => {
    const isActive = currentView === view;
    return `text-[11px] sm:text-xs font-mono transition-colors cursor-pointer ${
      isActive 
        ? "text-zinc-900 dark:text-white font-medium" 
        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 border-b border-zinc-200/50 dark:border-zinc-900/50 bg-zinc-50/70 dark:bg-[#0c0d10]/70 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <button 
          onClick={() => onViewChange("about")}
          className="font-mono text-sm font-semibold text-zinc-900 dark:text-white cursor-pointer hidden min-[380px]:block"
        >
          ry.
        </button>
        <div className="flex items-center gap-3 sm:gap-5 w-full min-[380px]:w-auto justify-between min-[380px]:justify-end">
          <button 
            onClick={() => onViewChange("about")}
            className={getLinkClass("about")}
          >
            [a]bout
          </button>
          <button 
            onClick={() => onViewChange("experience")}
            className={getLinkClass("experience")}
          >
            <span className="hidden sm:inline">[e]xperience</span>
            <span className="inline sm:hidden">[e]xp</span>
          </button>
          <button 
            onClick={() => onViewChange("projects")}
            className={getLinkClass("projects")}
          >
            <span className="hidden sm:inline">[p]rojects</span>
            <span className="inline sm:hidden">[p]roj</span>
          </button>
          <button 
            onClick={() => onViewChange("contact")}
            className={getLinkClass("contact")}
          >
            [c]ontact
          </button>
          <button 
            onClick={() => onViewChange("me")}
            className={getLinkClass("me")}
          >
            [m]e
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
