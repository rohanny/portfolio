import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onViewChange: (view: 'home' | 'experience' | 'projects' | 'me' | 'contact' | 'blog') => void;
}

interface HistoryItem {
  input?: string;
  output: React.ReactNode;
}

const COMMANDS = [
  "help",
  "about",
  "experience",
  "projects",
  "contact",
  "neofetch",
  "theme",
  "clear",
  "exit"
];

export const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onThemeToggle,
  onViewChange,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      output: (
        <div className="text-zinc-500 dark:text-zinc-500 font-mono text-[11px] leading-relaxed">
          welcome to ry's interactive terminal.
          <br />
          type <span className="text-zinc-800 dark:text-zinc-200 font-semibold">help</span> to see a list of commands. press <span className="text-zinc-800 dark:text-zinc-200 font-semibold">`</span> (backtick) or type <span className="text-zinc-800 dark:text-zinc-200 font-semibold">exit</span> to close.
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Click outside listener to keep focus (only within the terminal container)
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target !== inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = input.trim();
      if (trimmed) {
        executeCommand(trimmed);
        setCommandHistory((prev) => [...prev, trimmed]);
      } else {
        // empty input prints just a prompt
        setHistory((prev) => [...prev, { input: "", output: null }]);
      }
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return;
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(trimmed));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Print options
        setHistory((prev) => [
          ...prev,
          {
            input: input,
            output: (
              <div className="text-zinc-400 dark:text-zinc-500 font-mono text-[11px] gap-4 flex flex-wrap">
                {matches.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            ),
          },
        ]);
      }
    }
  };

  const executeCommand = (cmdStr: string) => {
    const args = cmdStr.toLowerCase().split(" ");
    const cmd = args[0];
    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">help</span> - list all commands
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">about / me</span> - read my bio
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">experience</span> - show professional work
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">projects</span> - show portfolio works
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">contact</span> - show social coordinates
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">neofetch</span> - system configuration summary
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">theme [light|dark]</span> - toggle or set theme
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">clear</span> - clear terminal screen
            </div>
            <div>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">exit</span> - close terminal
            </div>
          </div>
        );
        break;

      case "blog":
        onViewChange("blog");
        output = (
          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">recent blog articles:</p>
            <div className="space-y-1 pl-2">
              <p>• <span className="text-zinc-700 dark:text-zinc-300">back to the future: the trilogy</span> (july 19, 2026)</p>
              <p>• <span className="text-zinc-700 dark:text-zinc-300">lord of the rings: my absolute favourite</span> (may 12, 2026)</p>
            </div>
            <p className="italic text-[10px] text-zinc-500">navigated to the [b]log page.</p>
          </div>
        );
        break;

      case "about":
      case "me":
        onViewChange("me");
        output = (
          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1 leading-relaxed">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">about ry:</p>
            <p>software engineer l1 at softlink global based in mumbai.</p>
            <p>building cloud-native erp platforms, templates, and integration tools.</p>
            <p>navigated to the [m]e page for full letterboxd, steam, and tech stack details.</p>
          </div>
        );
        break;

      case "experience":
      case "work":
        onViewChange("experience");
        output = (
          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">experience:</p>
            <div>
              <p className="text-zinc-700 dark:text-zinc-300">softlink global — software engineer l1 (june 2024 - present)</p>
              <p className="text-zinc-500 pl-4">• technologies: dotnet, react, node.js, opentelemetry, ci/cd, keycloak</p>
              <p className="text-zinc-500 pl-4">• projects: logidocs, logibrain</p>
            </div>
            <p className="italic text-[10px] text-zinc-500">navigated to the [e]xperience page.</p>
          </div>
        );
        break;

      case "projects":
        onViewChange("projects");
        output = (
          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">featured projects:</p>
            <div className="space-y-1 pl-2">
              <p>• <span className="text-zinc-700 dark:text-zinc-300">fine dine</span> - contactless dining template (jquery, tailwind)</p>
              <p>• <span className="text-zinc-700 dark:text-zinc-300">cine phile</span> - streaming platform with social chat (react, tailwind, stream)</p>
              <p>• <span className="text-zinc-700 dark:text-zinc-300">preeti bhojan</span> - mobile app landing page (html, css, js)</p>
              <p>• <span className="text-zinc-700 dark:text-zinc-300">article summarizer</span> - nlp summary web app (react, tailwind)</p>
            </div>
            <p className="italic text-[10px] text-zinc-500">navigated to the [p]rojects page.</p>
          </div>
        );
        break;

      case "contact":
        onViewChange("contact");
        output = (
          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1 leading-relaxed">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">contact coordinates:</p>
            <p>• email: <a href="mailto:yrohann@gmail.com" className="text-zinc-900 dark:text-zinc-100 underline">yrohann@gmail.com</a></p>
            <p>• github: <a href="https://github.com/rohannY" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-zinc-100 underline">github.com/rohannY</a></p>
            <p>• linkedin: <a href="https://www.linkedin.com/in/rohanny/" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-zinc-100 underline">linkedin.com/in/rohanny</a></p>
          </div>
        );
        break;

      case "neofetch":
        output = (
          <div className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 flex gap-6 leading-tight select-none">
            <pre className="text-zinc-500 font-bold hidden sm:block">
{`   _ __ _   _ 
  | '__| | | |
  | |  | |_| |
  |_|   \\__, |
        |___/ `}
            </pre>
            <div className="space-y-0.5">
              <p><span className="text-zinc-800 dark:text-zinc-200 font-bold">ry</span>@<span className="text-zinc-800 dark:text-zinc-200 font-bold">portfolio</span></p>
              <p className="text-zinc-400">-----------------</p>
              <p><span className="text-zinc-500">os:</span> react v19 / vite / typescript</p>
              <p><span className="text-zinc-500">shell:</span> ry-sh v1.0.0</p>
              <p><span className="text-zinc-500">theme:</span> {isDarkMode ? "dark mode" : "light mode"}</p>
              <p><span className="text-zinc-500">stack:</span> dotnet, react, node.js, keycloak</p>
              <p><span className="text-zinc-500">gaming:</span> steam: active / playing elden ring</p>
            </div>
          </div>
        );
        break;

      case "theme":
        if (args[1] === "light") {
          if (isDarkMode) onThemeToggle();
          output = <span className="text-[11px] font-mono text-zinc-800 dark:text-zinc-200">theme updated to light.</span>;
        } else if (args[1] === "dark") {
          if (!isDarkMode) onThemeToggle();
          output = <span className="text-[11px] font-mono text-zinc-800 dark:text-zinc-200">theme updated to dark.</span>;
        } else {
          output = (
            <span className="text-[11px] font-mono text-zinc-800 dark:text-zinc-200">
              current theme is {isDarkMode ? "dark" : "light"}. usage: <span className="font-semibold">theme [light|dark]</span>
            </span>
          );
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "exit":
        onClose();
        return;

      default:
        output = (
          <span className="text-red-650 dark:text-red-400 font-mono text-[11px]">
            command not found: {cmd}. type <span className="font-semibold">help</span> for available commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { input: cmdStr, output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          onClick={handleContainerClick}
          initial={{ x: "100%", scaleX: 0, opacity: 0, originX: 1 }}
          animate={{ x: 0, scaleX: 1, opacity: 1, originX: 1 }}
          exit={{ x: "100%", scaleX: 0, opacity: 0, originX: 1 }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className={`fixed top-0 bottom-0 right-0 z-50 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-[#0c0d10]/95 backdrop-blur-md transition-all duration-300 shadow-2xl overflow-hidden lowercase origin-right h-screen ${
            isFullscreen ? "w-screen" : "w-full sm:w-[480px] md:w-[540px]"
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30 select-none">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-550 dark:text-zinc-500 tracking-wider">
                ry@portfolio: ~ (press ` to close)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-zinc-850 dark:hover:text-white transition-colors"
                title={isFullscreen ? "Minimize" : "Maximize"}
              >
                {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-zinc-850 dark:hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Logs */}
          <div
            ref={scrollRef}
            className="p-4 overflow-y-auto font-mono text-xs flex flex-col gap-3 select-text"
            style={{ height: "calc(100% - 37px)" }}
          >
            {history.map((item, index) => (
              <div key={index} className="space-y-1.5">
                {item.input !== undefined && (
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                    <span className="text-zinc-600 dark:text-zinc-550 font-semibold">ry$</span>
                    <span>{item.input}</span>
                  </div>
                )}
                {item.output && <div className="pl-4">{item.output}</div>}
              </div>
            ))}

            {/* Input Row */}
            <div className="flex items-center gap-2 mt-auto pt-2">
              <span className="text-zinc-600 dark:text-zinc-500 font-semibold font-mono text-[11px]">ry$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none ring-0 p-0 m-0 font-mono text-[11px] text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600"
                placeholder="type a command..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
