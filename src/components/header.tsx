import React from "react";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { SkeletonSprite } from "./skeleton";

interface HeaderProps {
  onViewChange: (view: "contact") => void;
}

export const Header: React.FC<HeaderProps> = ({ onViewChange }) => {
  return (
    <header className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-4 flex-1">
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
            rohan yadav
          </h1>
          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
            software engineer building distributed systems & thoughtful interfaces
          </p>
        </div>
        <div className="shrink-0">
          <SkeletonSprite scale={1.8} />
        </div>
      </div>
      <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
        I build reliable backend systems and thoughtful interfaces. My work spans data pipelines, distributed services, developer tools, and the details that make software feel clear and considered.
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1 text-xs font-mono">
        <button
          type="button"
          onClick={() => onViewChange("contact")}
          className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500"
        >
          get in touch <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        <a href="https://github.com/rohannY" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500">
          <Github className="h-3.5 w-3.5" /> github
        </a>
        <a href="https://linkedin.com/in/rohanny" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500">
          <Linkedin className="h-3.5 w-3.5" /> linkedin
        </a>
      </div>
    </header>
  );
};
