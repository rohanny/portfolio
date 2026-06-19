import { cn } from "../lib/utils";
import { Sun, Moon } from "lucide-react";
import { useThemeToggle } from "./ui/skiper-ui/skiper26";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
}

export const ThemeToggle = ({
  className = "",
}: ThemeToggleProps) => {
  const { toggleTheme } = useThemeToggle({
    variant: "rectangle",
    start: "bottom-up",
    blur: false,
  });

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-none border border-zinc-200 dark:border-zinc-900/35 bg-white dark:bg-[#0f1115]/30 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors shadow-sm cursor-pointer flex items-center justify-center active:scale-95",
        className,
      )}
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 block dark:hidden" />
    </button>
  );
};
