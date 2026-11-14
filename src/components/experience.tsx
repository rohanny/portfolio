import { ArrowUpRight } from "lucide-react";

export function Experience({ onSelect }: { onSelect: () => void }) {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-16 mt-10">
      <div className="mb-4 flex items-center gap-3">
        <div className="shrink-0">
          <h2
            id="experience-heading"
            className="m-0 font-logo text-sm font-medium tracking-wide text-muted-foreground"
          >
            01 · Experience
          </h2>
        </div>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <article className="group/experience relative grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3 py-4 transition-[padding,color] duration-200 hover:pl-[18px] hover:text-foreground focus-within:outline-none sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-2 sm:py-5">
        <button
          type="button"
          onClick={onSelect}
          aria-label="Read about my work as Software Engineer L1 at Softlink Global"
          className="absolute inset-0 z-0 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <p className="pointer-events-none relative z-10 col-span-2 m-0 font-logo text-xs text-muted-foreground sm:col-span-1 sm:shrink-0">
          Jun 2024 — Present
        </p>
        <h3 className="pointer-events-none relative z-10 m-0 flex min-w-0 flex-wrap items-center gap-x-1.5 pr-1 font-sans text-sm font-medium text-foreground sm:flex-1 sm:pr-0">
          <span>Software Engineer L1</span>
          <span className="font-normal text-muted-foreground">at</span>
          <a
            href="https://www.softlinkglobal.com"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="pointer-events-auto relative z-20 inline-flex items-center gap-1.5 text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            <img src="/softlink-logo.png" alt="" className="size-4 shrink-0 object-contain" />
            Softlink Global
          </a>
        </h3>
        <ArrowUpRight
          aria-hidden="true"
          className="pointer-events-none relative z-10 size-4 shrink-0 text-muted-foreground transition-[transform,color] group-hover/experience:translate-x-[3px] group-hover/experience:-translate-y-[3px] group-hover/experience:text-foreground"
        />
      </article>
    </section>
  );
}
