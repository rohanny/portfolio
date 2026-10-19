import { cn } from "../lib/utils";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
}

export const ThemeToggle = ({
  isDarkMode,
  toggleDarkMode,
  className = "",
}: ThemeToggleProps) => {
  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className={cn(
        "group p-2.5 rounded-none border border-zinc-200 dark:border-zinc-900/35 bg-white dark:bg-[#0f1115]/30 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-150 shadow-sm cursor-pointer flex items-center justify-center active:scale-95",
        className,
      )}
      aria-label={`switch to ${isDarkMode ? "light" : "dark"} theme`}
    >
      {isDarkMode ? (
        <Sun className="w-4 h-4 transition-transform duration-150 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-150 group-hover:-rotate-12" />
      )}
    </button>
  );
};
