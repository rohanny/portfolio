import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-10 font-satoshi">
      <motion.div
        initial={{ width: isExpanded ? "16.66%" : "4rem" }}
        animate={{ width: isExpanded ? "16.66%" : "4rem" }}
        transition={{
          duration: 10,
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
        className="h-[80vh] bg-zinc-800 rounded-2xl relative flex flex-col px-2 py-10 transition-all shadow-lg mx-auto"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div className="text-[#eee] font-medium space-y-2">
          {[...Array(2)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: isExpanded ? 0.3 * (index + 1) : 0,
                duration: 0.6,
                ease: "easeInOut",
              }}
              whileHover={{ backgroundColor: "#3b3b3b" }}
              className="w-full p-3 flex gap-4 items-center rounded-xl cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Globe className="w-full h-full" />
              </div>
              {isExpanded && <p>sdds</p>}
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={toggleSidebar}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: isExpanded ? 0 : 180 }} // Rotate icon on toggle
          transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} // Scale effect on hover
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full shadow-md hover:bg-zinc-700"
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </motion.button>
      </motion.div>
    </div>
  );
}
