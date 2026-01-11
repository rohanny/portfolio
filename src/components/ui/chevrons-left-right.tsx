"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface ChevronsLeftRightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronsLeftRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

const ChevronsLeftRightIcon = forwardRef<
  ChevronsLeftRightIconHandle,
  ChevronsLeftRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        fill="none"
        className="w-full h-full"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial="normal"
          animate={controls}
          d="m9 7-5 5"
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: { translateX: "0%" },
            animate: { translateX: "-2px" },
          }}
        />
        <motion.path
          initial="normal"
          animate={controls}
          d="m15 7 5 5-5"
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: { translateX: "0%" },
            animate: { translateX: "2px" },
          }}
        />
      </svg>
    </div>
  );
});

ChevronsLeftRightIcon.displayName = "ChevronsLeftRightIcon";

export { ChevronsLeftRightIcon };
