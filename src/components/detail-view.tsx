import React from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export interface DetailViewData {
  id: string;
  category: "work" | "project";
  title: string;
  subtitle: string;
  period?: string;
  location?: string;
  overview: string;
  tags: string[];
  projectArtwork?: "kronos" | "uldraw" | "feedback";
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

      {data.projectArtwork && (
        <ProjectArtwork variant={data.projectArtwork} title={data.title} />
      )}

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
          <motion.div
            key={sIdx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="space-y-4"
          >
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
                  <motion.div
                    key={subIdx}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="p-4 border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
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
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
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

function ProjectArtwork({ variant, title }: { variant: "kronos" | "uldraw" | "feedback"; title: string }) {
  return (
    <figure className="overflow-hidden border border-zinc-200 bg-[#f8f8f7] dark:border-zinc-800 dark:bg-[#111318]">
      <div className="flex items-center justify-between border-b border-zinc-200/80 px-4 py-2.5 dark:border-zinc-800/80">
        <figcaption className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {variant === "kronos" ? "storage model" : variant === "uldraw" ? "canvas preview" : "workflow preview"}
        </figcaption>
        <span className="text-[10px] font-mono text-zinc-400">{title}</span>
      </div>
      {variant === "kronos" ? (
        <svg role="img" aria-label="Illustration of records flowing from a write-ahead log into indexed storage segments" viewBox="0 0 720 250" className="block w-full" fill="none">
          <path d="M168 125h104m168 0h104" stroke="#a1a1aa" strokeDasharray="4 5" className="diagram-flow" />
          <rect x="28" y="76" width="140" height="98" rx="3" fill="#fff" stroke="#d4d4d8" />
          <text x="48" y="103" fill="#71717a" fontSize="11" fontFamily="monospace">write-ahead log</text>
          <rect x="48" y="119" width="100" height="8" fill="#e4e4e7" /><rect x="48" y="136" width="72" height="8" fill="#d4d4d8" />
          <rect x="272" y="58" width="176" height="134" rx="3" fill="#fff" stroke="#d4d4d8" />
          <text x="292" y="84" fill="#71717a" fontSize="11" fontFamily="monospace">segment index</text>
          <path d="M298 104h124M298 125h124M298 146h124M298 167h124" stroke="#d4d4d8" />
          <motion.circle cx="310" cy="104" r="3" fill="#71717a" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.8, repeat: Infinity }} /><motion.circle cx="350" cy="125" r="3" fill="#71717a" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.8, delay: 0.35, repeat: Infinity }} /><motion.circle cx="392" cy="146" r="3" fill="#71717a" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.8, delay: 0.7, repeat: Infinity }} />
          <rect x="552" y="76" width="140" height="98" rx="3" fill="#fff" stroke="#d4d4d8" />
          <text x="572" y="103" fill="#71717a" fontSize="11" fontFamily="monospace">records</text>
          <rect x="572" y="119" width="100" height="8" fill="#d4d4d8" /><rect x="572" y="136" width="100" height="8" fill="#e4e4e7" />
          <text x="28" y="220" fill="#a1a1aa" fontSize="10" fontFamily="monospace">append → index → recover</text>
        </svg>
      ) : variant === "uldraw" ? (
        <svg role="img" aria-label="Illustration of a collaborative canvas with shapes and two live cursors" viewBox="0 0 720 300" className="block w-full" fill="none">
          <rect x="24" y="22" width="672" height="256" rx="4" fill="#fff" stroke="#e4e4e7" />
          <path d="M24 55h672" stroke="#e4e4e7" />
          <circle cx="45" cy="39" r="4" fill="#d4d4d8" /><circle cx="59" cy="39" r="4" fill="#d4d4d8" />
          <rect x="78" y="34" width="64" height="10" rx="2" fill="#f4f4f5" />
          <rect x="48" y="81" width="160" height="160" rx="2" fill="#fafafa" stroke="#e4e4e7" />
          <circle cx="115" cy="121" r="18" stroke="#a1a1aa" strokeWidth="2" /><rect x="145" y="104" width="44" height="35" rx="2" stroke="#a1a1aa" strokeWidth="2" />
          <path d="M85 183h96M85 195h68" stroke="#d4d4d8" strokeWidth="2" />
          <rect x="270" y="83" width="154" height="98" rx="3" fill="#fafafa" stroke="#71717a" strokeDasharray="4 3" />
          <path d="M296 145l32-34 25 23 20-16 31 32" stroke="#a1a1aa" strokeWidth="2" />
          <motion.g animate={{ x: [0, 14, 0], y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}><path d="M461 102l22 23-10 1-5 10-7-34z" fill="#52525b" /><rect x="480" y="127" width="54" height="20" rx="10" fill="#27272a" /><text x="490" y="141" fill="#fff" fontSize="9" fontFamily="monospace">alex</text></motion.g>
          <motion.g animate={{ x: [-8, 0, -8], y: [0, 10, 0] }} transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut" }}><path d="M562 181l20 21-10 1-5 10-5-32z" fill="#a1a1aa" /><rect x="580" y="203" width="64" height="20" rx="10" fill="#e4e4e7" /><text x="590" y="217" fill="#52525b" fontSize="9" fontFamily="monospace">rohan</text></motion.g>
        </svg>
      ) : (
        <svg role="img" aria-label="Illustration of a candidate review workflow moving across stages" viewBox="0 0 720 250" className="block w-full" fill="none">
          {["applied", "review", "interview", "decision"].map((stage, index) => {
            const x = 24 + index * 171;
            return <g key={stage}><rect x={x} y="45" width="154" height="160" rx="3" fill="#fff" stroke="#e4e4e7" /><text x={x + 16} y="71" fill="#71717a" fontSize="11" fontFamily="monospace">{stage}</text><path d={`M${x + 16} 85h122`} stroke="#e4e4e7" /><rect x={x + 16} y="103" width="122" height="38" rx="2" fill="#fafafa" stroke="#e4e4e7" /><circle cx={x + 30} cy="122" r="7" fill="#d4d4d8" /><path d={`M${x + 44} 118h74M${x + 44} 127h48`} stroke="#d4d4d8" /><rect x={x + 16} y="153" width="122" height="28" rx="2" fill="#fafafa" stroke="#e4e4e7" /></g>;
          })}
          <motion.path d="M177 125h18m153 0h18m153 0h18" stroke="#a1a1aa" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
        </svg>
      )}
      <p className="border-t border-zinc-200/80 px-4 py-2 text-[10px] font-mono text-zinc-400 dark:border-zinc-800/80 dark:text-zinc-500">
        conceptual illustration · based on the project description
      </p>
    </figure>
  );
}
