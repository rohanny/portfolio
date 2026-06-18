import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-8 text-[11px] font-mono text-zinc-400 dark:text-zinc-600 select-none">
      <span>© {new Date().getFullYear()} Rohan Yadav</span>
    </footer>
  );
};
