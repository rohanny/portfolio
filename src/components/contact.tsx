import React from "react";
import { Github, Twitter, Linkedin, Mail, FileText, Globe, ArrowUpRight } from "lucide-react";

interface ContactProps {
  isDarkMode: boolean;
}

interface ContactLink {
  label: string;
  value: string;
  url: string;
  icon: React.ReactNode;
}

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

export const Contact: React.FC<ContactProps> = ({ isDarkMode: _ }) => {
  const contactLinks: ContactLink[] = [
    {
      label: "github",
      value: "rohannY",
      url: "https://github.com/rohannY",
      icon: <Github className="w-4 h-4" />,
    },
    {
      label: "linkedin",
      value: "rohanny",
      url: "https://www.linkedin.com/in/rohanny/",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      label: "leetcode",
      value: "rohannny",
      url: "https://leetcode.com/rohannny/",
      icon: <LeetCodeIcon />,
    },
    {
      label: "email",
      value: "yrohan740@gmail.com",
      url: "mailto:yrohan740@gmail.com",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      label: "portfolio",
      value: "rohanny.vercel.app",
      url: "https://rohanny.vercel.app",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      label: "resume",
      value: "view resume",
      url: "https://docs.google.com/document/d/1fqed3vpSoKiJa_fRrqk_JIXWDAsHtRwxd0-bDjbDaZ8/edit?tab=t.0",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "x (twitter)",
      value: "rohannny",
      url: "https://x.com/rohannny",
      icon: <Twitter className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
          links.
        </h2>
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          connect with me across different platforms.
        </p>
      </div>

      <div className="border-t border-zinc-200/60 dark:border-zinc-900/60 divide-y divide-zinc-200/60 dark:divide-zinc-900/60">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-4 text-xs font-mono transition-colors duration-250 cursor-pointer text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                {link.icon}
              </span>
              <span className="text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 font-medium transition-colors">
                {link.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400/80 dark:text-zinc-600 transition-colors group-hover:text-zinc-800 dark:group-hover:text-zinc-350">
                {link.value}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-700 transition-all duration-300 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
