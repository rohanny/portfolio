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
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.88 10.26a1.375 1.375 0 0 0 0 1.956l.008.007 3.937 4.09a3.78 3.78 0 0 1-5.75 5.087l-1.378-1.43a1.375 1.375 0 0 0-1.956 0l-.008.007a1.375 1.375 0 0 0 0 1.956l1.378 1.43a6.53 6.53 0 0 0 9.878-8.81l-.008-.007-2.92-3.036 6.84-7.11a1.375 1.375 0 0 0 0-1.956l-.007-.008a1.374 1.374 0 0 0-.957-.413zm1.61 5.92a1.375 1.375 0 0 0-.968.411l-6.84 7.11a1.375 1.375 0 0 0 0 1.956l.007.008a1.375 1.375 0 0 0 1.936 0l6.84-7.11a1.375 1.375 0 0 0 0-1.956l-.007-.008a1.375 1.375 0 0 0-.968-.411z"/>
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
