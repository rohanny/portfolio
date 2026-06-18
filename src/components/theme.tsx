import { motion } from "framer-motion";
import { useCallback } from "react";
import { cn } from "../lib/utils";
import { Sun, Moon } from "lucide-react";

// --- Types ---
export type AnimationVariant = "circle" | "rectangle" | "gif" | "polygon" | "circle-blur";
export type AnimationStart = 
  | "top-left" | "top-right" | "bottom-left" | "bottom-right" 
  | "center" | "top-center" | "bottom-center" 
  | "bottom-up" | "top-down" | "left-right" | "right-left";

interface Animation {
  name: string;
  css: string;
}

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
}

// --- Component ---
export const ThemeToggle = ({
  isDarkMode,
  toggleDarkMode,
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
}: ThemeToggleProps) => {
  
  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;
    const styleId = "theme-transition-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const handleToggle = useCallback(() => {
    const animation = createAnimation(variant, start, blur);
    updateStyles(animation.css);

    if (!(document as any).startViewTransition) {
      toggleDarkMode();
      return;
    }
    (document as any).startViewTransition(() => {
        toggleDarkMode();
    });
  }, [isDarkMode, toggleDarkMode, variant, start, blur, updateStyles]);

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      className={cn(
        "p-2.5 rounded-none border border-zinc-200 dark:border-zinc-900/35 bg-white dark:bg-[#0f1115]/30 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors shadow-sm cursor-pointer flex items-center justify-center",
        className,
      )}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 block dark:hidden" />
    </motion.button>
  );
};

// --- Animation Generation ---
const createAnimation = (variant: AnimationVariant, start: AnimationStart, blur: boolean): Animation => {
  if (variant === "circle" && start === "center") {
    return {
      name: "curtain-bottom-up",
      css: `
        ::view-transition-group(root) { animation-duration: 0.6s; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        ::view-transition-new(root) { animation-name: curtain-reveal; ${blur ? "filter: blur(2px);" : ""} }
        ::view-transition-old(root) { animation: none; z-index: -1; }
        @keyframes curtain-reveal {
          from { clip-path: inset(0% 0% 100% 0%); ${blur ? "filter: blur(8px);" : ""} }
          to { clip-path: inset(0% 0% 0% 0%); ${blur ? "filter: blur(0px);" : ""} }
        }
      `
    };
  }
  return {
      name: "none",
      css: ""
  }
};
