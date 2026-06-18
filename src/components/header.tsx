import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
          rohan yadav
        </h1>
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          Creative Software Developer, UI Engineer & Designer
        </p>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
          I'm a <strong className="text-zinc-800 dark:text-zinc-200 font-medium">UI Designer & Developer</strong> who bridges the gap between beautiful design and functional code. I craft digital experiences that not only look stunning but solve real problems—taking projects from initial concept sketches to polished, user-centered products. Beyond design, I'm passionate about Data Structures & Algorithms and Competitive Programming.
        </p>
      </div>
    </header>
  );
};
