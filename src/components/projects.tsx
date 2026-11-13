const projects = [
  {
    name: "Kronos",
    description:
      "An append-only commit log exploring write-ahead logging, memory-mapped indexing, and crash recovery.",
    href: "https://github.com/rohanny/kronos",
  },
  {
    name: "Uldraw",
    description:
      "An infinite whiteboard for live cursors, concurrent editing, and conflict-aware history.",
    href: "https://github.com/rohannY",
  },
  {
    name: "Feedback",
    description:
      "A tracking platform built around deterministic state transitions, background queues, and validated APIs.",
    href: "https://github.com/VighneshManjrekar/feedback",
  },
];

function ProjectCard({ project, onSelect }: {
  project: (typeof projects)[number];
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Read about ${project.name}`}
      className="group/row grid w-full grid-cols-[110px_minmax(0,1fr)_18px] items-start gap-x-5 border-b border-border bg-transparent px-1 py-4 text-left text-muted-foreground transition-[color,padding] duration-200 hover:pl-2.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring max-[580px]:grid-cols-[minmax(0,1fr)_18px] max-[580px]:gap-x-3 max-[580px]:py-3.5 max-[580px]:px-0"
    >
      <span className="pt-1 font-editorial text-lg font-normal leading-none tracking-tight text-foreground max-[580px]:hidden">
        {project.name}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="m-0 font-editorial text-xl font-normal leading-none tracking-tight text-foreground min-[581px]:hidden">
          {project.name}
        </h3>
        <p className="m-0 font-sans text-xs leading-[1.55] text-muted-foreground">{project.description}</p>
      </div>
      <span aria-hidden="true" className="pt-1.5 font-mono text-[13px] leading-none text-muted-foreground transition-[transform,color] group-hover/row:translate-x-[3px] group-hover/row:-translate-y-[3px] group-hover/row:text-foreground">↗</span>
    </button>
  );
}

export function Projects({ onSelect }: { onSelect: (projectName: string) => void }) {
  return (
    <section aria-labelledby="projects-heading" className="mt-10">
      <div className="mb-3 flex flex-nowrap items-center gap-3">
        <h2
          id="projects-heading"
          className="m-0 shrink-0 font-logo text-sm font-medium tracking-wide text-muted-foreground"
        >
          03 · Projects
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <div>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} onSelect={() => onSelect(project.name.toLowerCase())} />
        ))}
      </div>
    </section>
  );
}
