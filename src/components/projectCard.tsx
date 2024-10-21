import { motion } from "framer-motion";
import React from "react";
import git from "../assets/svg/git.svg";
import live from "../assets/svg/live.svg";
import { Reveal } from "../utils/Reveal";

interface ProjectProps {
  project: {
    title: string;
    imageSrc: string;
    description: string;
    githubLink: string;
    liveLink?: string;
  };
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  const { title, imageSrc, description, githubLink, liveLink } = project;

  return (
    <div className="mx-auto py-5 w-full sm:grid sm:grid-cols-8">
      <div className="col-span-2 py-10 px-4 sm:px-0">
        <motion.img
          alt={title}
          src={imageSrc}
          className="cursor-pointer"
          loading="lazy"
          whileHover={{ scale: 1.1, type: "spring" }}
          transition={{
            type: "spring",
            damping: 10,
            mass: 0.75,
            stiffness: 100,
          }}
        />
      </div>
      <div className="col-span-6 px-4 sm:px-10 sm:py-10 space-y-5">
        <Reveal>
          <h2 className="font-satoshi font-medium text-2xl">{title}</h2>
        </Reveal>
        <Reveal>
          <p className="font-figtree text-sm sm:text-lg font-thin text-lightGrey">
            {description}
          </p>
        </Reveal>
        <div className="flex space-x-6">
          <div className="flex space-x-6">
            <a href={githubLink} aria-label={`GitHub link for ${title}`}>
              <img src={git} alt="GitHub" className="w-8 cursor-pointer" />
            </a>
            {liveLink && (
              <a href={liveLink} aria-label={`Live site for ${title}`}>
                <img
                  src={live}
                  alt="Live site"
                  className="w-8 cursor-pointer"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
