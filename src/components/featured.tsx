import React from "react";

type View = "home" | "experience" | "projects" | "me" | "contact";

interface HomeFeaturedProps {
  onViewChange: (view: View) => void;
}

export const HomeFeatured: React.FC<HomeFeaturedProps> = ({ onViewChange }) => {
  return (
    <div className="space-y-12">
      {/* Featured Projects Section */}
      <div className="space-y-6">
        <div className="border-b border-zinc-200/60 dark:border-zinc-900/60 pb-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            featured projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Project 1 */}
          <a
            href="https://abhiraj-kale.github.io/fine-dine-admin-frontend/public/webpages/homepage.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 shadow-sm transition-all duration-300"
          >
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Fine Dine
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                contactless dining system built with jQuery & Tailwind CSS during the pandemic to minimize interaction.
              </p>
            </div>
          </a>

          {/* Project 2 */}
          <a
            href="https://github.com/rohannY/Cine-Phile"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 shadow-sm transition-all duration-300"
          >
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                Cine Phile
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                movie streaming platform featuring built-in social group chat capabilities powered by Stream Chat.
              </p>
            </div>
          </a>
        </div>

        <div>
          <button
            onClick={() => onViewChange("projects")}
            className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors duration-200"
          >
            view all projects &rarr;
          </button>
        </div>
      </div>

      {/* Recent Experience Section */}
      <div className="space-y-6">
        <div className="border-b border-zinc-200/60 dark:border-zinc-900/60 pb-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            recent work
          </h2>
        </div>

        <div className="p-4 border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 shadow-sm space-y-2">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Software Engineer L1
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Softlink Global &bull; Mumbai
              </p>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">June 2024 - Present</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Delivering cloud-native freight forwarding ERP platforms, customs clearance software, and blockchain data systems.
          </p>
        </div>

        <div>
          <button
            onClick={() => onViewChange("experience")}
            className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors duration-200"
          >
            view all experience &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
