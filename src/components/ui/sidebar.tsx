import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import only the icons you need
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

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarStyles = isDarkMode
    ? "bg-[#2b2b2b] text-[#f5f5f0] border-[#444444]"
    : "bg-[#fafaf7] text-[#454545] border-[#e0e0d8]";

  return (
    <div
      className={`px-10 font-satoshi ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-[#f5f5f0]"
      }`}
    >
      <motion.div
        initial={{ width: isExpanded ? "16.66%" : "4.4rem" }}
        animate={{ width: isExpanded ? "16.66%" : "4.4rem" }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`h-[80vh] rounded-2xl relative flex flex-col px-2 py-10 transition-all shadow-md mx-auto border-[1px] ${sidebarStyles}`}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div className="font-medium space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -30,
                backgroundColor: isDarkMode ? "#2b2b2b" : "#fafaf7",
              }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: isDarkMode ? "#2b2b2b" : "#fafaf7",
              }}
              whileHover={{
                backgroundColor: isDarkMode ? "#444444" : "#f2eee3",
                color: isDarkMode ? "#ffffff" : "#000000", // Change text color on hover
              }}
              transition={{
                backgroundColor: { duration: 0.2, ease: "easeInOut" },
                default: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              }}
              className={`w-full p-3 flex gap-4 items-center rounded-xl cursor-pointer border-[1px] ${
                isDarkMode ? "border-[#444444]" : "border-[#e5e5dd]"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <motion.div
                  className={`w-full h-full ${
                    isDarkMode ? "text-[#666666]" : "text-[#666666]"
                  }`}
                  whileHover={{
                    color: isDarkMode ? "#ffffff" : "#000000", // Change icon color on hover
                  }}
                >
                  {item.icon}
                </motion.div>
              </div>
              {isExpanded && <p>{item.label}</p>}
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={toggleSidebar}
          initial={{
            opacity: 0,
            rotate: 0,
            backgroundColor: isDarkMode ? "#2b2b2b" : "#fafaf7",
          }}
          animate={{
            opacity: 1,
            rotate: isExpanded ? 0 : 180,
            backgroundColor: isDarkMode ? "#2b2b2b" : "#fafaf7",
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: isDarkMode ? "#444444" : "#f2eee3",
            transition: { duration: 0.2 },
          }}
          transition={{
            backgroundColor: { duration: 0.2, ease: "easeInOut" },
            default: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
          className={`border-[1px] ${
            isDarkMode ? "border-[#444444]" : "border-[#d4d4cc]"
          } absolute top-1/2 -right-4 transform -translate-y-1/2 ${
            isDarkMode ? "text-[#f5f5f0]" : "text-[#666666]"
          } p-2 rounded-full shadow-sm`}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Sidebar;
