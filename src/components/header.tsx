import React from "react";
import { SkeletonSprite } from "./skeleton";

export const Header: React.FC = () => {
  return (
    <header className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-4 flex-1">
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
            rohan yadav
          </h1>
          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
            Software Developer, UI Engineer & Designer
          </p>
        </div>
        <div className="shrink-0">
          <SkeletonSprite scale={1.8} />
        </div>
      </div>
      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
        I'm a software developer who enjoys building efficient backend systems and polished frontends. I focus on writing clean, performant code to solve complex, real-world problems. My engineering approach is deeply shaped by a strong foundation in data structures, algorithms, and competitive programming.
      </p>
    </header>
  );
};
