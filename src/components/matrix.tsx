import React, { useEffect, useRef } from "react";

interface MatrixProps {
  isDarkMode: boolean;
}

export const Matrix: React.FC<MatrixProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const codeChars = "01$#@&%*+=-/\\|<>{}[]";

    // Spacing configuration
    const charWidth = 8;
    const charHeight = 10;

    let width = 600;
    let height = 180;
    let cols = Math.floor(width / charWidth);
    let rows = Math.floor(height / charHeight);

    // Offscreen canvas for drawing high-fidelity shapes to convert to ASCII
    const offscreen = document.createElement("canvas");
    const offscreenCtx = offscreen.getContext("2d")!;

    const setupDimensions = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : 600;
      // Smaller height on mobile
      height = width < 500 ? 120 : 180;

      cols = Math.floor(width / charWidth);
      rows = Math.floor(height / charHeight);

      // Main canvas DPI scaling
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Offscreen canvas is 1-to-1 with ASCII grid cells
      offscreen.width = cols;
      offscreen.height = rows;
    };

    setupDimensions();

    // Mouse interaction states
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isHovering = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseLeave);
    window.addEventListener("resize", setupDimensions);

    // Pre-initialize character grid to minimize GC overhead and enable persistence
    let charGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => codeChars[Math.floor(Math.random() * codeChars.length)])
    );

    let animationId: number;
    let frame = 0;

    const drawOffscreenShapes = () => {
      offscreenCtx.fillStyle = "black";
      offscreenCtx.fillRect(0, 0, cols, rows);

      offscreenCtx.fillStyle = "white";
      offscreenCtx.strokeStyle = "white";
      offscreenCtx.lineWidth = 1;

      const cx = cols / 2;
      const cy = rows / 2;
      
      // Smooth scale based on width
      const scale = Math.min(1, width / 500);

      // Draw Pikachu Ears
      offscreenCtx.beginPath();
      offscreenCtx.moveTo(cx - 24 * scale, cy - 15 * scale);
      offscreenCtx.lineTo(cx - 14 * scale, cy - 2 * scale);
      offscreenCtx.lineTo(cx - 18 * scale, cy + 2 * scale);
      offscreenCtx.closePath();
      offscreenCtx.fill();

      offscreenCtx.beginPath();
      offscreenCtx.moveTo(cx + 24 * scale, cy - 15 * scale);
      offscreenCtx.lineTo(cx + 14 * scale, cy - 2 * scale);
      offscreenCtx.lineTo(cx + 18 * scale, cy + 2 * scale);
      offscreenCtx.closePath();
      offscreenCtx.fill();

      // Eyes
      offscreenCtx.beginPath();
      offscreenCtx.arc(cx - 10 * scale, cy - 2 * scale, 2.5 * scale, 0, Math.PI * 2);
      offscreenCtx.fill();
      offscreenCtx.beginPath();
      offscreenCtx.arc(cx + 10 * scale, cy - 2 * scale, 2.5 * scale, 0, Math.PI * 2);
      offscreenCtx.fill();

      // Cheeks (blushing circles)
      offscreenCtx.beginPath();
      offscreenCtx.arc(cx - 16 * scale, cy + 4 * scale, 3.5 * scale, 0, Math.PI * 2);
      offscreenCtx.fill();
      offscreenCtx.beginPath();
      offscreenCtx.arc(cx + 16 * scale, cy + 4 * scale, 3.5 * scale, 0, Math.PI * 2);
      offscreenCtx.fill();

      // Mouth (cute curve)
      offscreenCtx.beginPath();
      offscreenCtx.arc(cx - 2 * scale, cy + 3 * scale, 2 * scale, 0, Math.PI);
      offscreenCtx.stroke();
      offscreenCtx.beginPath();
      offscreenCtx.arc(cx + 2 * scale, cy + 3 * scale, 2 * scale, 0, Math.PI);
      offscreenCtx.stroke();
    };

    const render = () => {
      frame++;
      
      // Step 1: Draw high-res vector icons offscreen
      drawOffscreenShapes();

      // Step 2: Read pixel data from offscreen canvas
      const imgData = offscreenCtx.getImageData(0, 0, cols, rows);
      const pixels = imgData.data;

      // Step 3: Clear main canvas with appropriate theme color
      ctx.fillStyle = isDarkMode ? "#0c0d10" : "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // Re-allocate charGrid if columns/rows size changes
      if (charGrid.length !== rows || charGrid[0].length !== cols) {
        charGrid = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => codeChars[Math.floor(Math.random() * codeChars.length)])
        );
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pixelIdx = (r * cols + c) * 4;
          const brightness = pixels[pixelIdx]; // White shapes have brightness = 255

          const posX = c * charWidth;
          const posY = r * charHeight;

          // Calculate interactive hover distance
          const dx = posX - mouseX;
          const dy = posY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let hoverFactor = 0;
          if (isHovering && dist < 65) {
            hoverFactor = (65 - dist) / 65; // 0 to 1
          }

          // Randomize character values on hover/pulse
          if (hoverFactor > 0.2 && frame % 4 === 0) {
            charGrid[r][c] = codeChars[Math.floor(Math.random() * codeChars.length)];
          }

          if (brightness > 128) {
            // High-density ASCII character belonging to the drawn shapes
            const symbol = charGrid[r][c];
            ctx.fillStyle = isDarkMode 
              ? `rgba(255, 255, 255, ${0.55 + hoverFactor * 0.45})`
              : `rgba(9, 9, 11, ${0.65 + hoverFactor * 0.35})`;
            ctx.fillText(symbol, posX, posY);
          } else {
            // Draw background characters (faint dots or occasional zeros/ones)
            ctx.fillStyle = isDarkMode
              ? `rgba(63, 63, 70, ${0.12 + hoverFactor * 0.25})`
              : `rgba(161, 161, 170, ${0.15 + hoverFactor * 0.2})`;
            ctx.fillText(".", posX, posY);
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setupDimensions);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <div className={`w-full flex justify-center py-4 border rounded-none overflow-hidden backdrop-blur-sm shadow-inner transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0f1115]/30 border-zinc-900/80" 
        : "bg-white border-zinc-200"
    }`}>
      <canvas ref={canvasRef} className="block max-w-full cursor-crosshair opacity-90" />
    </div>
  );
};
