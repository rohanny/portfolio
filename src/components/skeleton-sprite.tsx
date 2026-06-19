import React, { useEffect, useRef, useState } from "react";

interface SkeletonSpriteProps {
  scale?: number;
}

type SkeletonState = "walk" | "attack" | "hit" | "death";

export const SkeletonSprite: React.FC<SkeletonSpriteProps> = ({ scale = 1.8 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentState, setCurrentState] = useState<SkeletonState>("walk");
  const [isHovered, setIsHovered] = useState(false);

  const frameWidth = 64;
  const frameHeight = 64;
  const fps = 12;

  // Row mappings:
  // Row 0: Attack (13 frames, loop on hover)
  // Row 1: Death (13 frames, stays on last frame)
  // Row 2: Walk (12 frames, default loop)
  // Row 4: Hit (3 frames, single play)
  const getRowAndFrames = (state: SkeletonState) => {
    switch (state) {
      case "attack":
        return { row: 0, count: 13, loop: true };
      case "death":
        return { row: 1, count: 13, loop: false };
      case "hit":
        return { row: 4, count: 3, loop: false };
      case "walk":
      default:
        return { row: 2, count: 12, loop: true };
    }
  };

  const { row: currentRow, count: frameCount, loop: isLoop } = getRowAndFrames(currentState);

  // Load spritesheet
  useEffect(() => {
    const img = new Image();
    img.src = "/skeleton-enemy.png";
    img.onload = () => setImage(img);
  }, []);

  // Frame tick loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;

        if (next >= frameCount) {
          if (currentState === "hit") {
            // Hit finished -> automatically transition to Death
            setCurrentState("death");
            return 0;
          }
          if (currentState === "death") {
            // Death finished -> stay on the last frame
            return frameCount - 1;
          }
          return isLoop ? 0 : frameCount - 1;
        }
        return next;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [fps, frameCount, currentState, isLoop]);

  // Handle hover transition updates
  useEffect(() => {
    // We only update state based on hover if we are not currently in the hit/death sequence
    if (currentState === "hit" || currentState === "death") return;

    if (isHovered) {
      setCurrentState("attack");
      setCurrentFrame(0);
    } else {
      setCurrentState("walk");
      setCurrentFrame(0);
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // If the skeleton was hit/dead, mouse leaving revives it back to life!
    if (currentState === "hit" || currentState === "death") {
      setCurrentState("walk");
      setCurrentFrame(0);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only allow hitting if it is alive (walk or attack)
    if (currentState === "walk" || currentState === "attack") {
      setCurrentFrame(0);
      setCurrentState("hit");
    }
  };

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = frameWidth * scale;
    canvas.height = frameHeight * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const sx = currentFrame * frameWidth;
    const sy = currentRow * frameHeight;

    ctx.drawImage(
      image,
      sx,
      sy,
      frameWidth,
      frameHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }, [image, currentRow, currentFrame, scale]);

  const spearSvg = `
<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
  <line x1='10' y1='10' x2='28' y2='28' stroke='%2378350f' stroke-width='3' stroke-linecap='round'/>
  <line x1='10' y1='10' x2='28' y2='28' stroke='%23d97706' stroke-width='1' stroke-linecap='round'/>
  <path d='M0 0 L12 3 L9 9 L3 12 Z' fill='%23e2e8f0' stroke='%230f172a' stroke-width='2' stroke-linejoin='miter'/>
  <path d='M3 3 L7 7' stroke='%2394a3b8' stroke-width='1.5'/>
</svg>
  `.trim().replace(/\s+/g, " ");

  const cursorStyle = `url("data:image/svg+xml,${spearSvg}") 0 0, pointer`;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: cursorStyle }}
      className="select-none transition-transform duration-150 active:scale-95"
    >
      <canvas ref={canvasRef} className="block pixelated" />
    </div>
  );
};
