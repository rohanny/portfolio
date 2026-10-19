import React from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export interface DetailViewData {
  id: string;
  category: "work" | "project";
  title: string;
  subtitle: string;
  period?: string;
  location?: string;
  overview: string;
  tags: string[];
  links?: { label: string; url: string; icon?: "github" | "external" }[];
  sections: {
    heading: string;
    points?: string[];
    paragraphs?: string[];
    subItems?: { title: string; subtitle?: string; desc: string; stack?: string[] }[];
  }[];
}

interface DetailViewProps {
  data: DetailViewData;
  onBack: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ data, onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>back to {data.category === "work" ? "experience" : "projects"}</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
            {data.title}
          </h2>
          {data.period && (
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              {data.period}
            </span>
          )}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {data.subtitle}
          {data.location && (
            <>
              <span className="text-zinc-300 dark:text-zinc-650 mx-1.5">•</span>
              <span>{data.location}</span>
            </>
          )}
        </p>

        {/* Links (e.g. GitHub, Demo) */}
        {data.links && data.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {data.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-350 hover:text-zinc-950 dark:hover:text-white underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 transition-all"
              >
                {link.icon === "github" ? (
                  <Github className="w-3.5 h-3.5" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Overview */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          overview
        </h3>
        <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          {data.overview}
        </p>
      </div>

      {/* Detailed Sections (Architecture, Key Contributions, etc) */}
      <div className="space-y-8">
        {data.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-900 pb-2">
              {section.heading}
            </h3>

            {/* Paragraphs */}
            {section.paragraphs && (
              <div className="space-y-3">
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Bullet points */}
            {section.points && (
              <ul className="space-y-2.5">
                {section.points.map((pt, ptIdx) => (
                  <li
                    key={ptIdx}
                    className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600 mt-1 select-none">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Sub-items (like projects inside experience) */}
            {section.subItems && (
              <div className="space-y-3">
                {section.subItems.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    className="p-4 border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 space-y-2"
                  >
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                        {sub.title}
                      </h4>
                      {sub.subtitle && (
                        <span className="text-[10px] font-mono text-zinc-400">
                          {sub.subtitle}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                      {sub.desc}
                    </p>
                    {sub.stack && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {sub.stack.map((st, stIdx) => (
                          <span
                            key={stIdx}
                            className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tech Stack Tags */}
      <div className="space-y-2 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          technologies & skills
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {data.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
