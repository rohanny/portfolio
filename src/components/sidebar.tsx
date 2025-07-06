import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  label: string;
  icon: JSX.Element;
}

interface SidebarProps {
  items: SidebarItem[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onItemClick?: (label: string) => void;
  currentPage: string;
}
interface TooltipProps {
  text: string;
  isDarkMode: boolean;
  direction?: "left" | "right" | "top" | "bottom";
  customClass?: string;
}
const Tooltip: React.FC<TooltipProps> = ({
  text,
  isDarkMode,
  direction = "left",
  customClass = "",
}) => {
  let positionStyles = "";
  let motionTransforms = {};

  switch (direction) {
    case "right":
      positionStyles = "left-[110%] top-1/2";
      motionTransforms = {
        initial: { y: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
        animate: { y: "-50%", opacity: 1, filter: "blur(0px)", scale: 1 },
        exit: { y: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
      };
      break;
    case "top":
      positionStyles = "bottom-[110%] left-1/2";
      motionTransforms = {
        initial: { x: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
        animate: { x: "-50%", opacity: 1, filter: "blur(0px)", scale: 1 },
        exit: { x: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
      };
      break;
    case "bottom":
      positionStyles = "top-[110%] left-1/2";
      motionTransforms = {
        initial: { x: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
        animate: { x: "-50%", opacity: 1, filter: "blur(0px)", scale: 1 },
        exit: { x: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
      };
      break;
    case "left":
    default:
      positionStyles = "left-[220%] top-1/2";
      motionTransforms = {
        initial: { y: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
        animate: { y: "-50%", opacity: 1, filter: "blur(0px)", scale: 1 },
        exit: { y: "-50%", opacity: 0, filter: "blur(4px)", scale: 0.9 },
      };
      break;
  }

  const baseStyles = `absolute ${positionStyles} rounded-md px-2 py-1 text-sm z-50 whitespace-nowrap ${
    isDarkMode ? "bg-zinc-800 text-zinc-100" : "bg-stone-200 text-stone-900"
  }`;

  return (
    <motion.div
      {...motionTransforms}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${baseStyles} shadow-lg ${customClass}`}
    >
      {text}
    </motion.div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isDarkMode,
  toggleDarkMode,
  onItemClick,
  currentPage,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const sidebarStyles = isDarkMode
    ? "bg-zinc-900/20 text-zinc-100 border-zinc-700/30"
    : "bg-stone-900/10 text-stone-900 border-stone-800/20";

  return (
    <div className="font-satoshi">
      {/* Mobile Sidebar */}
      <div className="block lg:hidden">
        <motion.div
          className={`flex flex-row items-center justify-center gap-1 w-fit px-2 py-1 rounded-full shadow-lg border-[1px] ${sidebarStyles} bg-opacity-90 backdrop-blur-md`}
          style={{ minHeight: 48 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`cursor-pointer flex items-center justify-center w-8 h-8 p-1 rounded-full ${
                isDarkMode ? "border-zinc-700/40" : "border-stone-500/30"
              } ${currentPage === item.label ? (isDarkMode ? "bg-zinc-700/50" : "bg-stone-600/30") : ""}`}
              onClick={() => onItemClick?.(item.label)}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {item.icon}
              </span>
            </motion.div>
          ))}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`ml-1 w-8 h-8 flex items-center justify-center rounded-full border-[1px] transition-colors duration-200 ${
              isDarkMode
                ? "border-zinc-700/30 bg-zinc-800/20 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/40"
                : "border-stone-800/20 bg-stone-900/10 text-stone-900 hover:border-stone-700 hover:bg-stone-900/20"
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <motion.div
          className={`
          flex flex-col justify-between items-stretch w-16 h-[70vh] rounded-2xl px-2 py-2
          shadow-xl border-[1px] ${sidebarStyles} backdrop-blur-sm bg-opacity-90
          `}
        >
          {/* Navigation Items */}
          <div className="font-medium flex flex-col gap-2 items-stretch justify-start">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -30,
                  backgroundColor: isDarkMode ? "rgba(39, 39, 42, 0.2)" : "rgba(28, 25, 23, 0.1)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: currentPage === item.label 
                    ? (isDarkMode ? "rgba(63, 63, 70, 0.4)" : "rgba(28, 25, 23, 0.3)")
                    : (isDarkMode ? "rgba(39, 39, 42, 0.2)" : "rgba(28, 25, 23, 0.1)"),
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{
                  backgroundColor: isDarkMode ? "rgba(63, 63, 70, 0.3)" : "rgba(28, 25, 23, 0.2)",
                  x: 2,
                  scale: 1.02,
                }}
                transition={{
                  backgroundColor: { duration: 0.2, ease: "easeInOut" },
                  x: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 0.2, ease: "easeOut" },
                }}
                style={{ cursor: "pointer" }}
                className={`cursor-pointer relative group w-12 h-12 p-3 flex gap-4 items-center rounded-xl border-[1px] ${
                  isDarkMode ? "border-zinc-700/30" : "border-stone-800/20"
                } hover:shadow-sm ${currentPage === item.label ? (isDarkMode ? "border-zinc-600/50" : "border-stone-700/50") : ""}`}
                onClick={() => onItemClick?.(item.label)}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: isDarkMode
                      ? "radial-gradient(circle at 40% 50%, rgba(147, 197, 253, 0.1) 0%, transparent 60%)"
                      : "radial-gradient(circle at 40% 50%, rgba(0,0,0,0.05) 0%, transparent 60%)",
                  }}
                  animate={{
                    scale: hoveredIndex === index ? [0.95, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                <motion.div
                  className="w-8 h-8 flex items-center justify-center relative rounded-lg"
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`transition-all duration-200 ${
                      currentPage === item.label
                        ? (isDarkMode ? "[&>svg]:text-indigo-400" : "[&>svg]:text-gray-400")
                        : (isDarkMode 
                            ? "[&>svg]:text-zinc-300 group-hover:[&>svg]:text-zinc-100" 
                            : "[&>svg]:text-stone-800 group-hover:[&>svg]:text-stone-900")
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {item.icon}
                  </motion.div>
                  {hoveredIndex === index && (
                    <Tooltip text={item.label} isDarkMode={isDarkMode} direction="left" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Dark Mode Toggle at Bottom */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsToggleHovered(true)}
            onHoverEnd={() => setIsToggleHovered(false)}
            className={`w-12 h-12 p-3 flex items-center justify-center rounded-xl border-[1px] transition-colors duration-200 ${
              isDarkMode
                ? "border-zinc-700/30 bg-zinc-800/20 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/40"
                : "border-stone-800/20 bg-stone-900/10 text-stone-900 hover:border-stone-700 hover:bg-stone-900/20"
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isToggleHovered && (
              <Tooltip 
                text={isDarkMode ? "Light Mode" : "Dark Mode"} 
                isDarkMode={isDarkMode} 
                direction="left" 
                customClass="!left-[130%]"
              />
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
