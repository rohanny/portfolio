import React from "react";
import { ArrowRight } from "lucide-react";

export interface ItemCardData {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  location?: string;
  description: string;
  tags: string[];
  metaBadge?: string;
}

interface ItemCardProps {
  item: ItemCardData;
  onClick: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(item.id);
        }
      }}
      className="group p-5 rounded-none border bg-white dark:bg-[#0f1115]/30 border-zinc-200 dark:border-zinc-900/80 shadow-sm w-full space-y-3 cursor-pointer transition-colors duration-200 hover:border-zinc-400 dark:hover:border-zinc-700 text-left select-none"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors flex items-center gap-1.5">
              {item.title}
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-zinc-500 dark:text-zinc-400" />
            </h3>
            {item.metaBadge && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                {item.metaBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {item.subtitle}
            {item.location && (
              <>
                <span className="text-zinc-300 dark:text-zinc-650 mx-1.5">•</span>
                <span>{item.location}</span>
              </>
            )}
          </p>
        </div>
        {item.period && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap">
            {item.period}
          </span>
        )}
      </div>

      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {item.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
