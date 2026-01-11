"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CustomCursorProps {
  isDarkMode?: boolean;
}

export const CustomCursor = ({ isDarkMode = true }: CustomCursorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; timestamp: number }[]>([]);
  const lastMoveTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setCursorPos({ x, y });
      lastMoveTimeRef.current = Date.now();
      
      // Add point to trail with timestamp
      pointsRef.current.push({ x, y, timestamp: Date.now() });
      
      // Keep only last 50 points for performance
      if (pointsRef.current.length > 50) {
        pointsRef.current.shift();
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      pointsRef.current = [];
    };

    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Animation loop for drawing trail
    let animationFrameId: number;
    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;

      // If cursor hasn't moved for 100ms, start fading out trail
      if (timeSinceLastMove > 100 && pointsRef.current.length > 0) {
        // Remove oldest point gradually
        pointsRef.current.shift();
      }

      if (pointsRef.current.length > 2) {
        ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

        // Use quadratic curves for smooth trail
        for (let i = 1; i < pointsRef.current.length - 1; i++) {
          const currentPoint = pointsRef.current[i];
          const nextPoint = pointsRef.current[i + 1];
          
          // Calculate midpoint for smooth curve
          const midX = (currentPoint.x + nextPoint.x) / 2;
          const midY = (currentPoint.y + nextPoint.y) / 2;
          
          ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, midX, midY);
        }

        // Draw to the last point
        const lastPoint = pointsRef.current[pointsRef.current.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);

        ctx.stroke();
      }

      // Keep trail at reasonable length during movement
      if (pointsRef.current.length > 40 && timeSinceLastMove < 100) {
        pointsRef.current = pointsRef.current.slice(-40);
      }

      animationFrameId = requestAnimationFrame(drawTrail);
    };

    drawTrail();

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isDarkMode]);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 1024px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Canvas for drawing trail */}
      <canvas
        ref={canvasRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Custom cursor dot - only visible on desktop */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
      >
        {/* Main cursor dot */}
        <div
          className={`w-3 h-3 rounded-full shadow-lg ${
            isDarkMode ? "bg-white" : "bg-black"
          }`}
          style={{
            boxShadow: isDarkMode 
              ? '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
              : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </motion.div>
    </>
  );
};
