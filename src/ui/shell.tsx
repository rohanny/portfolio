import { ReactNode, ReactElement } from "react";
import Sidebar from "./sidebar";

interface ShellProps {
  children: ReactNode;
  items: Array<{ label: string; icon: ReactElement; path?: string }>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onItemClick?: (label: string) => void;
  activeLabel?: string;
}

const Shell: React.FC<ShellProps> = ({
  children,
  items,
  isDarkMode,
  toggleDarkMode,
  onItemClick,
  activeLabel,
}) => {
  return (
    <div
      className={`w-full h-screen overflow-auto relative ${
        isDarkMode ? "bg-zinc-950" : "bg-white"
      }`}
      style={!isDarkMode ? {} : {}}
    >
      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block pointer-events-none">
        {/* Blob 1: Top Left */}
        <div className={`absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl animate-blob ${
          isDarkMode 
            ? "bg-zinc-700/30" 
            : "bg-blue-400/15"
        }`} />
        
        {/* Blob 2: Bottom Right */}
        <div className={`absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-2000 ${
          isDarkMode 
            ? "bg-slate-700/30" 
            : "bg-purple-400/15"
        }`} />
        
        {/* Blob 3: Center Right */}
        <div className={`absolute top-1/2 right-24 transform -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-4000 ${
          isDarkMode 
            ? "bg-stone-700/20" 
            : "bg-indigo-300/10"
        }`} />
        {/* Blob 4: Top Right */}
        <div className={`absolute top-24 right-12 w-60 h-60 rounded-full blur-3xl animate-blob ${
          isDarkMode 
            ? "bg-zinc-600/30" 
            : "bg-pink-300/15"
        }`} />
        {/* Blob 5: Bottom Left */}
        <div className={`absolute bottom-24 left-12 w-60 h-60 rounded-full blur-3xl animate-blob animation-delay-2000 ${
          isDarkMode 
            ? "bg-neutral-600/30" 
            : "bg-yellow-200/10"
        }`} />
      </div>

      {/* Main Grid Container */}
      <div className={`relative z-10 w-full max-w-[90rem] mx-auto min-h-screen flex lg:border-x-2 border-dashed ${
          isDarkMode ? "border-zinc-800/60" : "border-stone-500/20"
      }`}>
        
        {/* Left Sidebar Column */}
        <div className={`hidden lg:flex w-28 flex-col items-center border-r-2 border-dashed ${
            isDarkMode ? "border-zinc-800/60" : "border-stone-500/20"
        }`}>
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <Sidebar
              items={items}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              onItemClick={onItemClick}
              activeLabel={activeLabel}
            />
          </div>
        </div>

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col relative">
           {/* Top Horizontal Line (Decorative) - Positioned relative to content column to move with it 
               Using absolute here is fine because the parent is now the constrained grid column. 
           */}
           <div 
            className={`absolute left-0 right-0 h-px border-t-2 border-dashed hidden lg:block ${
              isDarkMode ? "border-zinc-800/60" : "border-stone-500/20"
            }`}
            style={{ top: "4rem" }} 
          />
           
           <div className={`w-full max-w-5xl mx-auto flex-1 px-6 pt-4 pb-24 lg:px-6 lg:pt-24 lg:pb-12`}>
             {children}
           </div>
        </div>

      </div>

      {/* Sidebar for Mobile (floating, centered) */}
      <div className="block lg:hidden fixed left-1/2 -translate-x-1/2 bottom-4 z-50 isolate" style={{ backfaceVisibility: 'hidden' }}>
        <Sidebar
          items={items}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onItemClick={onItemClick}
          activeLabel={activeLabel}
        />
      </div>
    </div>
  );
};

export default Shell; 