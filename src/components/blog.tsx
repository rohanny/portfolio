import React from "react";

export const Blog: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
          blog.
        </h2>
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 italic">
          a wizard is never late, nor is he early. he arrives precisely when he means to.
        </p>
      </div>
    </div>
  );
};
