import React, { useEffect, useRef } from 'react';

interface PixelGridTrailProps {
  isDarkMode: boolean;
  cellSize?: number;
}
export const PixelGridTrail: React.FC<PixelGridTrailProps> = ({ 
  isDarkMode, 
  cellSize = 28 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let targetMouse = { x: -1000, y: -1000, active: false };
    let currentMouse = { x: -1000, y: -1000 };
    let hoverOpacity = 0;
    const revealRadius = 130; // Soft compact radius around cursor

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const startLoop = () => {
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;

      if (currentMouse.x < 0) {
        currentMouse.x = e.clientX;
        currentMouse.y = e.clientY;
      }
      startLoop();
    };

    const handleMouseLeave = () => {
      targetMouse.active = false;
      startLoop();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetMouse.x = touch.clientX;
        targetMouse.y = touch.clientY;
        targetMouse.active = true;
        startLoop();
      }
    };

    const handleTouchEnd = () => {
      targetMouse.active = false;
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const render = () => {
      if (!ctx || !canvas) return;

      // Smooth interpolation for mouse movement and fade in/out
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.18;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.18;

      const targetOpacity = targetMouse.active ? 1 : 0;
      hoverOpacity += (targetOpacity - hoverOpacity) * 0.08;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (hoverOpacity > 0.005 && currentMouse.x >= -revealRadius) {
        const mx = currentMouse.x;
        const my = currentMouse.y;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Grid boundaries around the mouse cursor
        const minX = Math.max(0, Math.floor((mx - revealRadius) / cellSize) * cellSize);
        const maxX = Math.min(width, Math.ceil((mx + revealRadius) / cellSize) * cellSize);
        const minY = Math.max(0, Math.floor((my - revealRadius) / cellSize) * cellSize);
        const maxY = Math.min(height, Math.ceil((my + revealRadius) / cellSize) * cellSize);

        ctx.save();
        ctx.lineWidth = 1;

        // Base line color: extra faint, elegant lines
        const strokeRgb = isDarkMode ? '255, 255, 255' : '0, 0, 0';
        const maxLineAlpha = isDarkMode ? 0.08 : 0.055;

        // Draw vertical grid lines near cursor
        for (let x = minX; x <= maxX; x += cellSize) {
          const dx = Math.abs(x - mx);
          if (dx > revealRadius) continue;

          // Compute distance-based falloff
          const span = Math.sqrt(Math.max(0, revealRadius * revealRadius - dx * dx));
          const yStart = Math.max(0, my - span);
          const yEnd = Math.min(height, my + span);

          const grad = ctx.createLinearGradient(x, yStart, x, yEnd);
          const centerAlpha = (1 - dx / revealRadius) * maxLineAlpha * hoverOpacity;

          grad.addColorStop(0, `rgba(${strokeRgb}, 0)`);
          grad.addColorStop(0.5, `rgba(${strokeRgb}, ${centerAlpha.toFixed(4)})`);
          grad.addColorStop(1, `rgba(${strokeRgb}, 0)`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x + 0.5, yStart);
          ctx.lineTo(x + 0.5, yEnd);
          ctx.stroke();
        }

        // Draw horizontal grid lines near cursor
        for (let y = minY; y <= maxY; y += cellSize) {
          const dy = Math.abs(y - my);
          if (dy > revealRadius) continue;

          const span = Math.sqrt(Math.max(0, revealRadius * revealRadius - dy * dy));
          const xStart = Math.max(0, mx - span);
          const xEnd = Math.min(width, mx + span);

          const grad = ctx.createLinearGradient(xStart, y, xEnd, y);
          const centerAlpha = (1 - dy / revealRadius) * maxLineAlpha * hoverOpacity;

          grad.addColorStop(0, `rgba(${strokeRgb}, 0)`);
          grad.addColorStop(0.5, `rgba(${strokeRgb}, ${centerAlpha.toFixed(4)})`);
          grad.addColorStop(1, `rgba(${strokeRgb}, 0)`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(xStart, y + 0.5);
          ctx.lineTo(xEnd, y + 0.5);
          ctx.stroke();
        }

        ctx.restore();

        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, [isDarkMode, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

