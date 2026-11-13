import { useEffect, useRef, useState } from "react";

type LinePosition = { y1: number; y2: number };

const keyframes: LinePosition[][] = [
  [{ y1: 10, y2: 13 }, { y1: 5, y2: 18 }, { y1: 8, y2: 15 }, { y1: 6, y2: 17 }, { y1: 10, y2: 13 }],
  [{ y1: 6, y2: 17 }, { y1: 2, y2: 22 }, { y1: 10, y2: 13 }, { y1: 6, y2: 17 }],
  [{ y1: 3, y2: 21 }, { y1: 6, y2: 17 }, { y1: 3, y2: 21 }, { y1: 8, y2: 15 }, { y1: 3, y2: 21 }],
  [{ y1: 8, y2: 15 }, { y1: 4, y2: 19 }, { y1: 7, y2: 16 }, { y1: 2, y2: 22 }, { y1: 8, y2: 15 }],
  [{ y1: 5, y2: 18 }, { y1: 10, y2: 13 }, { y1: 4, y2: 19 }, { y1: 8, y2: 15 }, { y1: 5, y2: 18 }],
  [{ y1: 10, y2: 13 }, { y1: 8, y2: 15 }, { y1: 5, y2: 18 }, { y1: 10, y2: 13 }],
];
const initialPositions = keyframes.map((frames) => frames[0]);
const xPositions = [2, 6, 10, 14, 18, 22];

function interpolate(frames: LinePosition[], progress: number): LinePosition {
  const position = progress * (frames.length - 1);
  const index = Math.floor(position);
  const next = Math.min(index + 1, frames.length - 1);
  const amount = position - index;
  return {
    y1: frames[index].y1 + (frames[next].y1 - frames[index].y1) * amount,
    y2: frames[index].y2 + (frames[next].y2 - frames[index].y2) * amount,
  };
}

export function AudioLines({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  animate = false,
  className = "",
}: {
  color?: string;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  className?: string;
}) {
  const [hoverAnimate, setHoverAnimate] = useState(false);
  const [positions, setPositions] = useState(initialPositions);
  const positionsRef = useRef(positions);
  const frameRef = useRef<number | null>(null);
  const active = animate || hoverAnimate;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const returnFrom = positionsRef.current.map((line) => ({ ...line }));
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      let next: LinePosition[];

      if (active) {
        const progress = (elapsed % 1.5) / 1.5;
        next = keyframes.map((frames) => interpolate(frames, progress));
      } else {
        const progress = Math.min(elapsed / 0.4, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        next = initialPositions.map((target, index) => ({
          y1: returnFrom[index].y1 + (target.y1 - returnFrom[index].y1) * eased,
          y2: returnFrom[index].y2 + (target.y2 - returnFrom[index].y2) * eased,
        }));
      }

      positionsRef.current = next;
      setPositions(next);

      if (active || elapsed < 0.4) frameRef.current = requestAnimationFrame(tick);
      else frameRef.current = null;
    };

    if (active || returnFrom.some((line, index) => line.y1 !== initialPositions[index].y1 || line.y2 !== initialPositions[index].y2)) {
      frameRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [active]);

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onMouseEnter={() => setHoverAnimate(true)}
      onMouseLeave={() => setHoverAnimate(false)}
    >
      {positions.map((line, index) => (
        <line key={xPositions[index]} x1={xPositions[index]} y1={line.y1} x2={xPositions[index]} y2={line.y2} />
      ))}
    </svg>
  );
}
