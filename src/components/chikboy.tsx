import React, { useEffect, useRef, useState } from "react";

interface ChikBoyProps {
  isDarkMode: boolean;
}

type AnimState = "idle" | "run" | "jump";

export const ChikBoy: React.FC<ChikBoyProps> = ({ isDarkMode }) => {
  void isDarkMode;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sprite assets state
  const [images, setImages] = useState<{
    idle: HTMLImageElement | null;
    run: HTMLImageElement | null;
  }>({ idle: null, run: null });

  // Refs for dynamic physics, animation, and patrol values to keep the loop stable
  const posRef = useRef({ x: 100, y: 0 }); 
  const velRef = useRef({ x: 0, y: 0 });
  const facingRef = useRef<1 | -1>(1); // 1 = right, -1 = left
  const animStateRef = useRef<AnimState>("idle");
  const currentFrameRef = useRef(0);
  const targetXRef = useRef<number | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Auto-patrol state
  const patrolActionRef = useRef<"idle" | "walk_left" | "walk_right">("idle");
  const patrolNextDecisionTimeRef = useRef(0);

  const renderScale = 0.325;
  const spriteSize = 128;

  // Load Sprites once
  useEffect(() => {
    const idleImg = new Image();
    idleImg.src = "/animations/chikboy-idle.png";
    idleImg.onload = () => setImages(prev => ({ ...prev, idle: idleImg }));

    const runImg = new Image();
    runImg.src = "/animations/chikboy-run.png";
    runImg.onload = () => setImages(prev => ({ ...prev, run: runImg }));
  }, []);

  // Event handlers for keyboard, mouse hover, and mobile touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetElement = canvas.parentElement?.parentElement;
    if (!targetElement) return;

    // Mouse Controls
    const handleMouseMove = (e: MouseEvent) => {
      const rect = targetElement.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      targetXRef.current = relativeX;
    };

    const handleMouseLeave = () => {
      targetXRef.current = null;
    };

    // Mobile Touch Controls
    const handleTouchStart = (e: TouchEvent) => {
      const rect = targetElement.getBoundingClientRect();
      if (e.touches.length > 0) {
        targetXRef.current = e.touches[0].clientX - rect.left;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = targetElement.getBoundingClientRect();
      if (e.touches.length > 0) {
        targetXRef.current = e.touches[0].clientX - rect.left;
      }
    };

    const handleTouchEnd = () => {
      targetXRef.current = null;
    };

    // Keyboard Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s", "A", "D", "W", "S", " "].includes(e.key)) {
        keysPressed.current[e.key] = true;
        targetXRef.current = null;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    // Event listeners
    targetElement.addEventListener("mousemove", handleMouseMove);
    targetElement.addEventListener("mouseleave", handleMouseLeave);
    targetElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    targetElement.addEventListener("touchmove", handleTouchMove, { passive: true });
    targetElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      targetElement.removeEventListener("mousemove", handleMouseMove);
      targetElement.removeEventListener("mouseleave", handleMouseLeave);
      targetElement.removeEventListener("touchstart", handleTouchStart);
      targetElement.removeEventListener("touchmove", handleTouchMove);
      targetElement.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Main game tick loop runs continuously
  useEffect(() => {
    let animId: number;
    let frameTimer = 0;
    const fps = 10;
    const frameInterval = 1000 / fps;

    const canvasHeight = 90; 
    const groundY = canvasHeight - 2;

    const tick = (timestamp: number) => {
      if (!frameTimer) frameTimer = timestamp;
      const elapsed = timestamp - frameTimer;

      let nextX = posRef.current.x;
      let nextY = posRef.current.y;
      let vx = 0;
      let vy = velRef.current.y;
      let nextState: AnimState = "idle";
      let nextFacing = facingRef.current;

      // Check for user inputs
      const hasKeyboardInput = 
        keysPressed.current["ArrowLeft"] || keysPressed.current["a"] || keysPressed.current["A"] ||
        keysPressed.current["ArrowRight"] || keysPressed.current["d"] || keysPressed.current["D"];
      const hasInteractionInput = targetXRef.current !== null;

      // 1. Keyboard Movement Input
      if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"] || keysPressed.current["A"]) {
        vx = -1.2;
        nextFacing = -1;
        nextState = "run";
      } else if (keysPressed.current["ArrowRight"] || keysPressed.current["d"] || keysPressed.current["D"]) {
        vx = 1.2;
        nextFacing = 1;
        nextState = "run";
      }

      // Keyboard Jump Input
      const wantsToJump = 
        keysPressed.current[" "] || 
        keysPressed.current["ArrowUp"] || 
        keysPressed.current["w"] || 
        keysPressed.current["W"];

      if (wantsToJump && posRef.current.y >= groundY - 1) {
        vy = -2.2;
        nextState = "jump";
      }

      // 2. Mouse/Touch Target Movement Input (if no keyboard)
      if (vx === 0 && hasInteractionInput && targetXRef.current !== null) {
        const spriteCenterX = posRef.current.x + (spriteSize * renderScale) / 2;
        const dx = targetXRef.current - spriteCenterX;

        if (Math.abs(dx) > 6) {
          vx = dx > 0 ? 1.2 : -1.2;
          nextFacing = dx > 0 ? 1 : -1;
          nextState = "run";
        }
      }

      // 3. Auto-Patrol / Idle Actions (if no active user input)
      if (!hasKeyboardInput && !hasInteractionInput) {
        if (timestamp >= patrolNextDecisionTimeRef.current) {
          const rand = Math.random();
          if (rand < 0.45) {
            patrolActionRef.current = "idle";
            patrolNextDecisionTimeRef.current = timestamp + 2000 + Math.random() * 2000;
          } else if (rand < 0.725) {
            patrolActionRef.current = "walk_left";
            patrolNextDecisionTimeRef.current = timestamp + 1200 + Math.random() * 1500;
          } else {
            patrolActionRef.current = "walk_right";
            patrolNextDecisionTimeRef.current = timestamp + 1200 + Math.random() * 1500;
          }

          // 15% chance of a playful jump when changing actions
          if (Math.random() < 0.15 && posRef.current.y >= groundY - 1) {
            vy = -2.2;
            nextState = "jump";
          }
        }

        // Apply slow, organic patrol walk velocities
        if (patrolActionRef.current === "walk_left") {
          vx = -0.5;
          nextFacing = -1;
          nextState = "run";
        } else if (patrolActionRef.current === "walk_right") {
          vx = 0.5;
          nextFacing = 1;
          nextState = "run";
        }
      } else {
        // Reset patrol decision timer so he stops immediately when active input resumes
        patrolNextDecisionTimeRef.current = 0;
      }

      // Apply Gravity
      if (posRef.current.y < groundY) {
        vy += 0.05;
        nextState = "jump";
      } else {
        vy = Math.min(vy, 0);
      }

      // Update positions
      nextX += vx;
      nextY += vy;

      // Bound X position inside canvas width
      const maxCanvasX = (canvasRef.current?.clientWidth || 600) - spriteSize * renderScale;
      if (nextX < 0) {
        nextX = 0;
        targetXRef.current = null;
        if (patrolActionRef.current === "walk_left") patrolActionRef.current = "walk_right";
      } else if (nextX > maxCanvasX) {
        nextX = maxCanvasX;
        targetXRef.current = null;
        if (patrolActionRef.current === "walk_right") patrolActionRef.current = "walk_left";
      }

      // Bound Y to ground level
      if (nextY >= groundY) {
        nextY = groundY;
        vy = 0;
      }

      // Reset animation frame if state changes
      if (nextState !== animStateRef.current) {
        animStateRef.current = nextState;
        currentFrameRef.current = 0;
      }

      posRef.current = { x: nextX, y: nextY };
      velRef.current = { x: vx, y: vy };
      facingRef.current = nextFacing;

      // Animation Frame step
      if (elapsed >= frameInterval) {
        frameTimer = timestamp;
        let totalFrames = 6; // idle
        if (nextState === "run" || nextState === "jump") totalFrames = 10;
        currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;
      }

      // Render Loop
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const parentWidth = canvas.parentElement?.clientWidth || 600;
          if (canvas.width !== parentWidth || canvas.height !== canvasHeight) {
            canvas.width = parentWidth;
            canvas.height = canvasHeight;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = false;

          // Draw Sprite
          let img = images.idle;
          if (nextState === "run" || nextState === "jump") img = images.run;

          if (img) {
            ctx.save();
            
            let drawX = nextX;
            const sy = currentFrameRef.current * spriteSize;

            if (nextFacing === -1) {
              ctx.scale(-1, 1);
              drawX = -nextX - spriteSize * renderScale;
            }

            ctx.drawImage(
              img,
              0,
              sy,
              spriteSize,
              spriteSize,
              drawX,
              nextY - spriteSize * renderScale,
              spriteSize * renderScale,
              spriteSize * renderScale
            );

            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [images]);

  return (
    <div className="w-full h-[90px] pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-[90px]" />
    </div>
  );
};
