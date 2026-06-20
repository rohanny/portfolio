import React, { useEffect, useRef, useState } from "react";

interface SkeletonSpriteProps {
  scale?: number;
}

type SkeletonState = "walk" | "attack" | "hit" | "death" | "idle" | "hidden";

export const SkeletonSprite: React.FC<SkeletonSpriteProps> = ({ scale = 1.8 }) => {
  const adjustedScale = scale / 4;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [smokeImages, setSmokeImages] = useState<HTMLImageElement[]>([]);
  
  const [currentState, setCurrentState] = useState<SkeletonState>("walk");
  const [baseState, setBaseState] = useState<"walk" | "idle">("walk");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [smokeFrame, setSmokeFrame] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [displacement, setDisplacement] = useState({ x: 0, y: 0 });
  const [hasAttackedThisHover, setHasAttackedThisHover] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(pointer: coarse)");
      setIsTouchDevice(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  const frameWidth = 256;
  const frameHeight = 256;
  const fps = 12;

  // Row mappings:
  // Row 0: Attack (13 frames, loop on hover)
  // Row 1: Death (13 frames, stays on last frame)
  // Row 2: Walk (12 frames, default loop)
  // Row 3: Idle (4 frames, loop after resurrection)
  // Row 4: Hit (3 frames, single play)
  const getRowAndFrames = (state: SkeletonState) => {
    switch (state) {
      case "attack":
        return { row: 0, count: 13, loop: false };
      case "death":
        return { row: 1, count: 13, loop: false };
      case "idle":
        return { row: 3, count: 4, loop: true };
      case "hit":
        return { row: 4, count: 3, loop: false };
      case "hidden":
      case "walk":
      default:
        return { row: 2, count: 12, loop: true };
    }
  };

  const { row: currentRow, count: frameCount, loop: isLoop } = getRowAndFrames(currentState);

  // Load skeleton spritesheet
  useEffect(() => {
    const img = new Image();
    img.src = "/animations/skeleton-enemy.png";
    img.onload = () => setImage(img);
  }, []);

  // Preload smoke explosion PNG frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 1; i <= 16; i++) {
      const img = new Image();
      img.src = `/animations/Smoke Explosion_Frame_${String(i).padStart(2, "0")}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 16) {
          setSmokeImages(images);
        }
      };
      images.push(img);
    }
  }, []);

  // Skeleton frame tick loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;

        if (next >= frameCount) {
          if (currentState === "attack") {
            // Attack finished -> return to walk/idle (baseState)
            setCurrentState(baseState);
            return 0;
          }
          if (currentState === "hit") {
            // Hit finished -> check if 3rd hit (triggers death)
            if (clickCount >= 3) {
              setCurrentState("death");
            } else {
              // Return to attack if hovered, or baseState (walk/idle) if not
              setCurrentState(isHovered ? "attack" : baseState);
            }
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
  }, [fps, frameCount, currentState, isLoop, clickCount, isHovered, baseState]);

  // Smoke frame tick loop
  useEffect(() => {
    if (smokeFrame === null) return;

    const interval = setInterval(() => {
      setSmokeFrame((prev) => {
        if (prev === null) return null;
        const next = prev + 1;
        if (next >= 16) {
          return null; // Stop smoke animation
        }
        return next;
      });
    }, 70); // ~14 FPS

    return () => clearInterval(interval);
  }, [smokeFrame]);

  // Update background scrolling offset only when walking (stops during attack/idle/hit)
  useEffect(() => {
    let animId: number;
    const tick = () => {
      if (currentState === "walk") {
        setScrollOffset((prev) => (prev + 0.8) % 64);
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [currentState]);

  // Trigger smoke explosion 700ms after death finishes
  useEffect(() => {
    if (currentState === "death" && currentFrame === 12) {
      const timer = setTimeout(() => {
        setBaseState("idle");
        setCurrentState("idle");
        setCurrentFrame(0);
        setSmokeFrame(0);
        setClickCount(0); // Reset clicks for the next life cycle
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentState, currentFrame]);

  // Handle hover transitions
  useEffect(() => {
    // Disable hover checks during hit/death transitions
    if (
      currentState === "hit" ||
      currentState === "death" ||
      currentState === "hidden" ||
      smokeFrame !== null
    ) {
      return;
    }

    if (isHovered) {
      if (!hasAttackedThisHover) {
        // Continue walking/idling for 2-3 frames (~250ms) before launching attack
        const timer = setTimeout(() => {
          setCurrentState("attack");
          setCurrentFrame(0);
          setHasAttackedThisHover(true);
        }, 250);
        return () => clearTimeout(timer);
      }
    } else {
      setHasAttackedThisHover(false);
      // If we were in idle baseState (resurrected), hovering away returns to walking state
      if (baseState === "idle") {
        setBaseState("walk");
        setCurrentState("walk");
      } else {
        setCurrentState(baseState);
      }
      setCurrentFrame(0);
    }
  }, [isHovered, baseState, currentState, smokeFrame, hasAttackedThisHover]);

  // Handle displacement from skeleton attack swing
  useEffect(() => {
    if (currentState === "attack" && isHovered) {
      const centerX = (frameWidth * adjustedScale) / 2;
      const centerY = (frameHeight * adjustedScale) / 2;
      
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      
      // Swing frames (e.g., frames 4 to 8 of row 0) push the cursor away
      if (currentFrame >= 4 && currentFrame <= 8) {
        const R = (frameWidth * adjustedScale) / 2 + 35; // Guarantee landing outside box
        const targetX = (dx / distance) * R;
        const targetY = (dy / distance) * R;
        setDisplacement({
          x: targetX - dx,
          y: targetY - dy,
        });
      } else {
        setDisplacement({ x: 0, y: 0 });
      }
    } else {
      setDisplacement({ x: 0, y: 0 });
    }
  }, [currentState, currentFrame, mousePos, isHovered, adjustedScale]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only allow hitting if alive and not currently exploding
    if (
      (currentState === "walk" || currentState === "attack" || currentState === "idle") &&
      smokeFrame === null
    ) {
      setClickCount((prev) => {
        const next = prev + 1;
        setCurrentFrame(0);
        setCurrentState("hit");
        return next;
      });
    }
  };

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = frameWidth * adjustedScale;
    canvas.height = frameHeight * adjustedScale;

    // Draw solid black background (independent of dark/light theme switcher, matched to dark mode theme)
    ctx.fillStyle = "#0c0d10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = false;

    // Draw scrolling slow smoke-like background particles
    ctx.fillStyle = "rgba(100, 116, 139, 0.08)"; // Soft slate/smoke particles
    const speckCount = 5;
    for (let i = 0; i < speckCount; i++) {
      // Different sizes and speeds to create simple parallax depth
      const size = ((i % 3) + 2) * adjustedScale;
      const speedMultiplier = i % 2 === 0 ? 0.3 : 0.15;
      const y = (i * 10 + 6) * adjustedScale;
      const spacing = canvas.width / speckCount;
      const x = ((i * spacing - scrollOffset * speedMultiplier * adjustedScale) + canvas.width * 2) % canvas.width;
      
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Skeleton logic: only draw if not hidden inside active smoke frames
    const shouldDrawSkeleton = smokeFrame === null || smokeFrame >= 13;

    if (shouldDrawSkeleton) {
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
    }

    // Draw Smoke overlay if active
    if (smokeFrame !== null && smokeImages[smokeFrame]) {
      ctx.drawImage(
        smokeImages[smokeFrame],
        0,
        0,
        800,
        800,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  }, [image, currentRow, currentFrame, adjustedScale, smokeFrame, smokeImages, scrollOffset, currentState]);

  return (
    <div 
      className="relative" 
      style={{ width: `${frameWidth * adjustedScale}px`, height: `${frameHeight * adjustedScale}px` }}
      onMouseMove={handleMouseMove}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="select-none rounded bg-[#0c0d10] w-full h-full overflow-hidden"
        style={{ 
          cursor: !isTouchDevice && isHovered && currentState !== "death" && currentState !== "hidden" && smokeFrame === null ? "none" : "pointer" 
        }}
      >
        <canvas ref={canvasRef} className="block pixelated" />
      </div>

      {!isTouchDevice && isHovered && currentState !== "death" && currentState !== "hidden" && smokeFrame === null && (
        <div 
          className="pointer-events-none absolute z-50 transition-all duration-150 ease-out"
          style={{
            left: `${mousePos.x + displacement.x}px`,
            top: `${mousePos.y + displacement.y}px`,
            width: "16px",
            height: "16px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img 
            src="/animations/cursor.png" 
            className="w-full h-full object-contain pixelated" 
            alt="cursor"
          />
        </div>
      )}
    </div>
  );
};
