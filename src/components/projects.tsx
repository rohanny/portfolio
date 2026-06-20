import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  name: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
}

const projects: ProjectItem[] = [
  {
    name: "Fine Dine",
    description: "A contactless dining website built with jQuery, HTML, and Tailwind CSS. Created during the pandemic to minimize human interaction while dining out, ensuring a safer experience.",
    tags: ["jQuery", "HTML", "Tailwind CSS"],
    github: "https://github.com/geek-lords/fine-dine-admin-frontend",
    demo: "https://abhiraj-kale.github.io/fine-dine-admin-frontend/public/webpages/homepage.html"
  },
  {
    name: "Cine Phile",
    description: "A streaming platform with social features built using React and Tailwind CSS. Offers a diverse library of movies and TV shows with an innovative chat feature powered by Stream Chat.",
    tags: ["React", "Tailwind CSS", "Stream Chat"],
    github: "https://github.com/rohannY/Cine-Phile",
    demo: null
  },
  {
    name: "Preeti Bhojan",
    description: "A captivating landing page for a mobile application designed to boost user engagement and drive downloads. Features a visually appealing design that effectively showcases the app's value proposition.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rohannY/PreetiBhojan",
    demo: "https://preetibhojan.co.in/"
  },
  {
    name: "Article Summarizer",
    description: "A web application that uses NLP and machine learning to automatically generate concise summaries of articles. Built with React and Tailwind CSS for enhanced productivity and time-saving.",
    tags: ["React", "Tailwind CSS", "NLP"],
    github: "https://github.com/rohannY/summarizer-ui",
    demo: null
  }
];

interface ProjectCardProps {
  project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const mainLink = project.demo || project.github;

  return (
    <a
      href={mainLink || "#"}
      target={mainLink ? "_blank" : undefined}
      rel={mainLink ? "noopener noreferrer" : undefined}
      className={`group p-4 rounded-none border relative overflow-hidden flex flex-col justify-between h-full ${
        mainLink ? "cursor-pointer" : "cursor-default"
      } bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 shadow-sm`}
    >
      <div className="space-y-2 relative z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
            {project.name}
          </h3>
          {mainLink && (
            <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-600 dark:group-hover:text-zinc-350 transition-colors" />
          )}
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-3 relative z-10">
        {project.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 px-2.5 py-0.5 rounded-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

export const Projects: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
          projects.
        </h2>
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          a collection of things i've built.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
};
