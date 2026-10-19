import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SpotifyCardProps {
  isDarkMode: boolean;
}

export const SpotifyCard: React.FC<SpotifyCardProps> = ({ isDarkMode }) => {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio playback error:", err);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      className={`group relative overflow-hidden border transition-all duration-500 ${
        isPlaying
          ? isDarkMode
            ? "border-red-950/60 bg-[#0d0c10] shadow-[0_4px_30px_rgba(239,68,68,0.12)]"
            : "border-red-200 bg-white shadow-md"
          : isDarkMode
            ? "border-zinc-800/80 bg-[#0f1115]/50 shadow-sm"
            : "border-zinc-200 bg-white shadow-sm"
      }`}
    >
      {/* HTML5 Audio with chunk-based progressive byte-range streaming */}
      <audio
        ref={audioRef}
        src="/audio/know-my-name.mp3"
        preload="metadata"
      />

      {/* Visible Full-Color Artist Artwork in Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/artist-art.jpg"
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover object-[center_42%] scale-100 contrast-110 saturate-125 transition-all duration-700 ease-out group-hover:scale-105 ${
            isPlaying ? "opacity-45 dark:opacity-40" : "opacity-35 dark:opacity-30"
          }`}
        />
        {/* Directional gradient overlay: deep tint on left for crystal-clear text, gentle fade towards right */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDarkMode
              ? "bg-gradient-to-r from-[#0d0c10]/95 via-[#0d0c10]/80 to-[#0d0c10]/40"
              : "bg-gradient-to-r from-white/95 via-white/80 to-white/40"
          }`}
        />
      </div>

      {/* Red Crimson Ambient Glow: completely 0% opacity on default, only activates on play */}
      <div
        className={`pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full blur-3xl transition-opacity duration-700 z-0 ${
          isPlaying ? "bg-[#ef4444]/25 opacity-100" : "opacity-0"
        }`}
      />

      {/* Compact Padding */}
      <div className="relative z-10 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side: Spotify icon + Song Title + Artist + Compact Equalizer in Crimson */}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <svg
                className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                  isPlaying ? "text-[#ef4444]" : "text-zinc-400 dark:text-zinc-400"
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.306c-.215.353-.674.464-1.026.248-2.812-1.718-6.353-2.106-10.525-1.153-.404.093-.807-.156-.899-.56-.093-.404.156-.807.56-.899 4.568-1.044 8.49-.604 11.643 1.338.352.216.463.674.247 1.026zm1.468-3.262c-.27.44-.847.578-1.287.308-3.22-1.979-8.127-2.552-11.936-1.396-.497.151-1.023-.134-1.174-.631-.151-.497.134-1.023.631-1.174 4.354-1.322 9.774-.683 13.458 1.606.44.27.578.847.308 1.287zm.126-3.41c-3.863-2.294-10.237-2.506-13.93-1.384-.593.18-1.22-.162-1.4-.755-.18-.593.162-1.22.755-1.4 4.246-1.29 11.286-1.037 15.719 1.595.534.316.708 1.011.391 1.545-.316.533-1.011.708-1.535.399z" />
              </svg>
              <h3
                onClick={togglePlay}
                className="text-sm sm:text-base font-semibold tracking-tight text-zinc-900 dark:text-white truncate cursor-pointer hover:text-[#ef4444] dark:hover:text-[#ef4444] transition-colors"
              >
                know my name
              </h3>
            </div>

            <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 truncate font-normal tracking-normal pl-6">
              true damage, soyeon, coco jones, vic mensa
            </p>

            {/* Compact Live Audio Spectrum Equalizer (Single art crimson color) */}
            <div className="flex items-center gap-1 pt-0.5 pl-6 h-3" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (bar) => (
                  <motion.span
                    key={bar}
                    className={`w-[2px] rounded-none transition-colors duration-200 ${
                      isPlaying
                        ? "bg-[#ef4444]"
                        : "bg-zinc-300 dark:bg-zinc-600/70"
                    }`}
                    animate={
                      isPlaying && !reduceMotion
                        ? {
                            scaleY: [
                              0.25,
                              0.5 + ((bar * 5) % 6) / 10,
                              0.3,
                              0.9,
                              0.2
                            ]
                          }
                        : { scaleY: 0.25 }
                    }
                    transition={
                      isPlaying && !reduceMotion
                        ? {
                            duration: 0.6 + (bar % 4) * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (bar % 5) * 0.06
                          }
                        : { duration: 0.2 }
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Right Side: Single Art (Square -> Circle & Rotate on play) */}
          <div
            onClick={togglePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlay();
              }
            }}
            aria-label={isPlaying ? "Pause Know My Name" : "Play Know My Name"}
            className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 cursor-pointer select-none"
          >
            <motion.div
              animate={{
                borderRadius: isPlaying ? "9999px" : "4px",
                rotate: isPlaying && !reduceMotion ? 360 : 0
              }}
              transition={{
                borderRadius: { duration: 0.5, ease: "easeInOut" },
                rotate: isPlaying
                  ? { repeat: Infinity, duration: 6, ease: "linear" }
                  : { duration: 0.5, ease: "easeOut" }
              }}
              className="relative w-full h-full overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-zinc-900"
            >
              <img
                src="/single-art.png"
                alt="Know My Name Single Cover"
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Vinyl center spindle hole visible during rotation */}
              {isPlaying && (
                <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#0c0d10] border border-zinc-600/80 shadow-md flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-zinc-400" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
