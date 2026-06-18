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
    <button
      type="button"
      onClick={handleToggle}
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

// --- Animation Generation ---
const createAnimation = (variant: AnimationVariant, start: AnimationStart, _blur: boolean): Animation => {
  if (variant === "circle" && start === "center") {
    return {
      name: "curtain-bottom-up",
      css: `
        ::view-transition-group(root) { animation-duration: 0.3s; animation-timing-function: ease-out; }
        ::view-transition-new(root) { animation-name: curtain-reveal; }
        ::view-transition-old(root) { animation: none; z-index: -1; }
        @keyframes curtain-reveal {
          from { clip-path: inset(0% 0% 100% 0%); }
          to { clip-path: inset(0% 0% 0% 0%); }
        }
      `
    };
  }
  return {
      name: "none",
      css: ""
  }
};
