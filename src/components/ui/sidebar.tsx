import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  label: string;
  icon: JSX.Element;
}

interface SidebarProps {
  items: SidebarItem[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
interface TooltipProps {
  text: string;
  isDarkMode: boolean;
  direction?: "left" | "right" | "top" | "bottom";
}
const Tooltip: React.FC<TooltipProps> = ({
  text,
  isDarkMode,
  direction = "left",
}) => {
  let positionStyles = "";
  switch (direction) {
    case "right":
      positionStyles = "left-[110%] top-1/2 -translate-y-1/2";
      break;
    case "top":
      positionStyles = "bottom-[110%] left-1/2 -translate-x-1/2";
      break;
    case "bottom":
      positionStyles = "top-[110%] left-1/2 -translate-x-1/2";
      break;
    case "left":
    default:
      positionStyles = "left-[220%] top-1/2 -translate-y-1/2";
      break;
  }

  const baseStyles = `absolute ${positionStyles} rounded-md px-2 py-1 text-sm transition-opacity duration-300 z-50 whitespace-nowrap ${
    isDarkMode ? "bg-zinc-800 text-zinc-100" : "bg-zinc-200 text-zinc-900"
  }`;

  return <div className={`${baseStyles} opacity-90`}>{text}</div>;
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarStyles = isDarkMode
    ? "bg-zinc-900 text-zinc-100 border-zinc-700"
    : "bg-zinc-100 text-zinc-900 border-zinc-300";

  return (
    <div
      className={`w-full h-full px-10 font-satoshi ${
        isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
      }`}
    >
      <motion.div
        initial={{ width: isExpanded ? "13%" : "4.4rem" }}
        animate={{ width: isExpanded ? "13%" : "4.4rem" }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`h-[80vh] rounded-2xl relative flex flex-col px-2 py-6 transition-all shadow-md mx-auto border-[1px] ${sidebarStyles} 
          w-[16.66%] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[6rem]`}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div className="font-medium space-y-2 flex-1">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -30,
                backgroundColor: isDarkMode ? "#27272a" : "#e4e4e7",
              }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: isDarkMode ? "#27272a" : "#e4e4e7",
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{
                backgroundColor: isDarkMode ? "#3f3f46" : "#d1d1d6",
                x: 4,
              }}
              transition={{
                backgroundColor: { duration: 0.3, ease: "easeInOut" },
                x: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              }}
              style={{ cursor: "pointer" }}
              className={`cursor-pointer relative group w-full p-3 flex gap-4 items-center rounded-xl border-[1px] ${
                isDarkMode ? "border-zinc-700" : "border-zinc-300"
              } hover:shadow-sm`}
            >
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  background: isDarkMode
                    ? "radial-gradient(circle at 40% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)"
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
                className="w-6 h-6 flex items-center justify-center relative"
                transition={{ duration: 0.3 }}
              >
                <motion.div className="transition-all duration-300 [&>svg]:text-zinc-400 group-hover:[&>svg]:text-current">
                  {item.icon}
                </motion.div>
                {!isExpanded && hoveredIndex === index && (
                  <Tooltip text={item.label} isDarkMode={isDarkMode} />
                )}
              </motion.div>

              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredIndex === index ? 1 : 0,
                      backgroundColor: isDarkMode ? "#ffffff" : "#333333",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={toggleDarkMode}
          whileHover={{
            scale: 1.02,
          }}
          onHoverStart={() => setIsToggleHovered(true)}
          onHoverEnd={() => setIsToggleHovered(false)}
          style={{ cursor: "pointer" }}
          className={`mt-4 relative w-full p-3 flex gap-4 items-center rounded-xl border-[1px] transition-colors duration-200 ${
            isDarkMode
              ? "border-zinc-700 bg-zinc-800 text-zinc-100 hover:border-zinc-600"
              : "border-zinc-300 bg-zinc-200 text-zinc-900 hover:border-zinc-400"
          }`}
        >
          <motion.div className="w-6 h-6 flex items-center justify-center">
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.div>

          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium"
            >
              {isDarkMode ? "Light" : "Dark"}
            </motion.span>
          )}

          {isToggleHovered && (
            <Tooltip
              direction="top"
              text={isDarkMode ? "Light" : "Dark"}
              isDarkMode={isDarkMode}
            />
          )}
        </motion.button>

        <motion.button
          onClick={toggleSidebar}
          initial={{
            opacity: 0,
            rotate: 0,
            backgroundColor: isDarkMode ? "#27272a" : "#e4e4e7",
          }}
          animate={{
            opacity: 1,
            rotate: isExpanded ? 0 : 360,
            backgroundColor: isDarkMode ? "#27272a" : "#e4e4e7",
          }}
          whileHover={{
            backgroundColor: isDarkMode ? "#3f3f46" : "#d1d1d6",
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          transition={{
            backgroundColor: { duration: 0.2, ease: "easeInOut" },
            opacity: { duration: 0.3, ease: "easeInOut" },
            rotate: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          }}
          className="absolute -right-4 top-0 bottom-0 m-auto h-9 w-9 flex items-center justify-center shadow-md text-sm rounded-full border-[1px] border-zinc-500"
        >
          {isExpanded ? (
            <ChevronLeft className="h-5 w-5 text-zinc-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-zinc-500" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Sidebar;
