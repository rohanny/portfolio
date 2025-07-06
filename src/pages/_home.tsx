import MusicCard from "../ui/spotify";
import OptimizedImage from "../ui/optimized";
import { motion } from "framer-motion";
import { memo } from "react";

interface HomePageProps {
  isDarkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = memo(({ isDarkMode }) => {
  return (
    <motion.div
      className="h-full flex flex-col justify-start font-['Geist']"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl">
        {/* Name and Bio */}
        <div>
          <motion.div
            className="flex flex-row sm:flex-row justify-between items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1
              className={`text-3xl font-bold font-['Playfair_Display'] ${
                isDarkMode ? "text-white" : "text-stone-900"
              }`}
            >
              Rohan Yadav
            </h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                rotate: 15,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <OptimizedImage
                src="https://avatars.githubusercontent.com/u/51793979?v=4&size=64"
                alt="Rohan Yadav"
                className="w-16 h-16 rounded-full border-2 border-stone-400 shadow-lg cursor-pointer"
                loading="eager"
                fallbackSrc="/placeholder.svg"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="mb-3 text-left"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="flex items-center gap-3 font-['Satoshi'] font-normal tracking-wide">
              <span
                className={`text-lg font-bold italic font-['Playfair_Display'] ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                }`}
              >
                Hello There!
              </span>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-stone-600"
                }`}
              >
                <span className="line-through opacity-60">General Kenobi</span>{" "}
                <span className="italic font-medium">Visitor</span>
              </span>
            </div>
          </motion.div>

          <motion.p
            className={`text-base leading-relaxed mb-4 font-light ${
              isDarkMode ? "text-gray-200" : "text-stone-800"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            I'm a{" "}
            <span
              className={`font-medium ${
                isDarkMode
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"
              }`}
            >
              UI Designer & Developer
            </span>{" "}
            who bridges the gap between beautiful design and functional code. I
            craft digital experiences that not only look stunning but solve real
            problems—taking projects from initial concept sketches to polished,
            user-centered products. Beyond design, I'm passionate about{" "}
            <span className="italic">Data Structures & Algorithms</span> and{" "}
            <span className="italic">Competitive Programming</span>.
          </motion.p>

          <motion.p
            className={`text-sm font-light mb-4 leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-stone-700"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            When not coding, I'm <span className="italic">gaming</span>,
            listening to <span className="italic">music</span>, or watching{" "}
            <span className="italic">movies</span> — because even{" "}
            <span className="italic">Aragorn</span> took time from the throne.
          </motion.p>

          <motion.div
            className={`text-xs font-light flex items-center gap-2 ${
              isDarkMode ? "text-gray-400" : "text-stone-600"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDarkMode
                  ? "bg-gradient-to-r from-green-400 to-emerald-400"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              }`}
            ></span>
            Currently crafting delightful user experiences and pushing pixels
            with purpose.
          </motion.div>
        </div>

        {/* Cards Container */}
        <motion.div
          className="mt-8 flex flex-col md:flex-row gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {/* Music Card */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <MusicCard isDarkMode={isDarkMode} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
