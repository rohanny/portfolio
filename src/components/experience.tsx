import React from "react";
import { Briefcase } from "lucide-react";

interface ExperienceItemType {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  projects?: { name: string; description: string }[];
}

const experiences: ExperienceItemType[] = [
  {
    company: "Softlink Global",
    role: "Software Engineer L1",
    period: "June 2024 - Present",
    location: "Mumbai",
    description: "Leading software provider in freight forwarding, logistics, and supply chain industry since 2005. Delivers end-to-end digital solutions through cloud-native ERP platforms, customs clearance software, and blockchain-powered data exchange systems.",
    tags: ["Dotnet", "React", "Node.js", "OpenTelemetry", "CI/CD", "Keycloak"],
    projects: [
      {
        name: "LogiDocs",
        description: "A comprehensive system where users can create, customize, and reuse logistical document templates. Enables efficient document management and standardization across logistics operations."
      },
      {
        name: "LogiBrain",
        description: "Advanced logistics intelligence platform that leverages AI and machine learning to optimize supply chain operations, route planning, and resource allocation."
      }
    ]
  }
];

interface ExperienceCardProps {
  exp: ExperienceItemType;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp }) => {
  return (
    <div
      className="group p-5 rounded-none border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 shadow-sm w-full space-y-3 cursor-default"
    >
      <div className="flex justify-between items-start gap-4 relative z-10">
        <div>
          <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
            {exp.role}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {exp.company} <span className="text-zinc-300 dark:text-zinc-650">•</span> {exp.location}
          </p>
        </div>
        <span className="text-xs text-zinc-500 font-mono whitespace-nowrap">{exp.period}</span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed relative z-10">
        {exp.description}
      </p>
      {exp.projects && exp.projects.length > 0 && (
        <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-200 ease-out relative z-10">
          <div className="overflow-hidden">
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">key projects</span>
              <div className="space-y-2">
                {exp.projects.map((project, pIdx) => (
                  <div key={pIdx} className="pl-3 border-l-2 border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{project.name}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 pt-1 relative z-10">
        {exp.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 px-2.5 py-0.5 rounded-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-zinc-400 select-none">
        <Briefcase className="w-4 h-4 text-zinc-500" />
        <h2 className="text-sm font-semibold uppercase tracking-widest font-mono">
          Work Experience
        </h2>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} />
        ))}
      </div>
    </section>
  );
};
