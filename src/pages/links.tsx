import React from "react";
import { motion } from "framer-motion";
import { Globe, FileText } from "lucide-react";
import { SiGithub, SiLinkedin, SiGmail, SiLeetcode, SiX } from "react-icons/si";

interface LinksProps {
  isDarkMode: boolean;
}

const links = [
  {
    name: "GitHub",
    username: "rohannY",
    url: "https://github.com/rohannY",
    icon: <SiGithub className="w-4 h-4" />,
  },
  {
    name: "LinkedIn",
    username: "rohanny",
    url: "https://www.linkedin.com/in/rohanny/",
    icon: <SiLinkedin className="w-4 h-4" />,
  },
  {
    name: "LeetCode",
    username: "rohannny",
    url: "https://leetcode.com/u/rohannny/",
    icon: <SiLeetcode className="w-4 h-4" />,
  },
  {
    name: "Email",
    username: "yrohan740@gmail.com",
    url: "mailto:yrohan740@gmail.com",
    icon: <SiGmail className="w-4 h-4" />,
  },
  {
    name: "Portfolio",
    username: "rohanny.vercel.app",
    url: "https://rohanny.vercel.app/",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    name: "Resume",
    username: "View Resume",
    url: "https://docs.google.com/document/d/1fqed3vpSoKiJa_fRrqk_JIXWDAsHtRwxd0-bDjbDaZ8/edit?tab=t.0",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    name: "X (Twitter)",
    username: "rohannny",
    url: "https://x.com/rohannny",
    icon: <SiX className="w-4 h-4" />,
  },
];

const Links: React.FC<LinksProps> = ({ isDarkMode }) => {
  const handleLinkClick = (url: string) => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
    } else if (url.startsWith("/")) {
      // Handle internal links like resume download
      window.open(url, "_blank");
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className="h-full flex flex-col font-['Geist']"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1
          className={`text-2xl font-bold font-['Playfair_Display'] mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Links
        </h1>
        <p
          className={`text-sm ${
            isDarkMode ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          Connect with me across different platforms
        </p>
      </motion.div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <motion.button
            key={link.name}
            onClick={() => handleLinkClick(link.url)}
            className="w-full text-left space-y-1 p-2 -m-2 rounded"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.2 + index * 0.05,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`${
                  isDarkMode
                    ? "text-zinc-300"
                    : "text-gray-600"
                }`}
              >
                {link.icon}
              </div>
              <div
                className={`text-sm font-medium ${
                  isDarkMode ? "text-zinc-300" : "text-gray-700"
                }`}
              >
                {link.name}
              </div>
            </div>
            <div
              className={`text-sm ml-6 ${
                isDarkMode ? "text-zinc-400" : "text-gray-500"
              }`}
            >
              {link.username}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Links;
