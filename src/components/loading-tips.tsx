import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";

interface LoadingTipsCardProps {
  isDarkMode: boolean;
}

const loadingTips = [
  "Remember, you need air to live",
  "Just keep your HP over 0 and make your enemies' reach 0 and all shall be well!",
  "Dying Hurts. Dont.",
  "It's best not to kiss the succubus. Absolutely, positively do any other thing BUT kiss the succubus. ",
  "If you find yourself inside a water elemental, just make sure to keep hydrated.",
  "Remember, crying is a free action.",
  "Remember gravity hurts",
  "fire is hot",
  "just because you can does not mean you should",
  "In africa after every 60 second a minute passes",
  "Don't forget to breathe.",
  "Press any key to continue.",
  "If you're stuck, try moving.",
  "Remember to eat and sleep... eventually.",
  "This game is best played with a controller (or keyboard and mouse).",
  "Walking is faster than crawling. Usually.",
  "Aim for the head (if you can).",
  "Try not to die.",
  "This is a game. Have fun!",
  "Keep pressing buttons until something happens.",
  "To defeat the final boss, simply believe in yourself.",
  "To unlock the secret ending, collect all the shiny things.",
  "This game has been optimized for players who enjoy long loading times.",
  "If you see a glitch, embrace it. It's part of the experience.",
  "The best way to win is to not lose.",
  "Don't worry about the plot, it's not important.",
  "The secrets of the universe are hidden in plain sight... or maybe behind a locked door.",
  "The cake is a lie.",
  "This game is not compatible with your hopes and dreams.",
  "Remember, every action has an equal and opposite reaction... except when it doesn't.",
  "Sometimes the best way to win is to simply not play the game.",
  "Warning: This game may cause sudden urges to throw your controller.",
];

const LoadingTipsCard: React.FC<LoadingTipsCardProps> = memo(
  ({ isDarkMode }) => {
    const [currentTip, setCurrentTip] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTip(
          loadingTips[Math.floor(Math.random() * loadingTips.length)]
        );
      }, 180000); // Change tip every 3 minutes

      // Set initial tip
      setCurrentTip(
        loadingTips[Math.floor(Math.random() * loadingTips.length)]
      );

      return () => clearInterval(interval);
    }, []);

    return (
      <motion.div
        className={`relative overflow-hidden h-full flex flex-col justify-center items-center text-center
      }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p
          className={`text-base font-normal text-start italic font-['Fantasy_Game_Font']
        ${isDarkMode ? "text-gray-200" : "text-stone-800"}
        `}
        >
          {currentTip}
        </p>
      </motion.div>
    );
  }
);

LoadingTipsCard.displayName = "LoadingTipsCard";

export default LoadingTipsCard;
