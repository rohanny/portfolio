"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";
import { cn } from "../lib/utils";

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
      className={cn(
        "size-10 cursor-pointer rounded-full p-0 transition-all duration-300 active:scale-95 flex items-center justify-center",
        className,
      )}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.g
          animate={{ rotate: isDarkMode ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="white"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="black"
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill={isDarkMode ? "white" : "black"} 
        />
      </svg>
    </button>
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
          from { clip-path: inset(100% 0% 0% 0%); ${blur ? "filter: blur(8px);" : ""} }
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
