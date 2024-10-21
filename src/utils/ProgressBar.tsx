import { AnimatePresence, motion, useScroll } from "framer-motion";
import React, { CSSProperties, useEffect, useState } from "react";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  // Explicitly typing the style object using CSSProperties
  const progressContainerStyles: CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "50px",
    width: "70px",
    height: "70px",
    color: "white",
  };

  const goToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div style={progressContainerStyles}>
      <AnimatePresence>
        {scrollPosition > 100 && (
          <svg
            className="progress cursor-pointer w-10 ml-10 md:ml-0 md:w-auto"
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={goToTop}
          >
            <motion.circle
              cx="25.349"
              cy="25.3689"
              r="24.5"
              stroke="white"
              strokeWidth="2"
              fill="#000000"
              style={{ pathLength: scrollYProgress }}
            />
            <path
              d="M20.849 15.2529L29.849 24.2529L20.849 33.2529"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressBar;
