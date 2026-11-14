import { ArrowLeft, ArrowUpRight } from "lucide-react";

const projectDetails = {
  kronos: {
    name: "Kronos",
    subtitle: "Distributed Log-Structured Storage Engine",
    overview:
      "Kronos is an append-only commit log and distributed storage engine inspired by the internal architectures of Kafka and Bitcask. Built in C++, it explores write-ahead logging (WAL), memory-mapped segment indexing, sequential disk write performance, and crash-recovery protocols with payload checksum validation.",
    tags: ["C++", "Distributed Systems", "Write-Ahead Log (WAL)", "Memory-Mapped I/O", "CRC32", "Storage Engines"],
    sections: [
      {
        heading: "Architectural highlights & storage model",
        points: [
          "Append-Only Commit Log: Employs sequential I/O to maximize disk write throughput, avoiding costly random write seek times on disk.",
          "Memory-Mapped Segment Indexing: Keeps dense offset-to-physical-byte indices memory-mapped (mmap) for constant-time (O(1)) index lookups and low-latency sequential range reads.",
          "Write-Ahead Logging (WAL): Enforces all writes to persist sequentially to WAL before memory updates, ensuring atomicity and zero state loss upon crashes.",
          "CRC32 Checksum Integrity: Appends CRC32 checksums to segment record headers; validates integrity on startup to detect and isolate partially written or corrupted log records.",
          "Segment Compaction & Rolling: Implements segment file rollover at configurable size boundaries to support background cleanup and retain bound log sizes.",
        ],
      },
      {
        heading: "Key technical challenges solved",
        points: [
          "Eliminating memory bloat during massive append bursts using bounded buffer pooling and flushing semantics.",
          "Designing deterministic crash recovery that reads segment headers sequentially and safely restores the partition state table on unexpected process termination.",
        ],
      },
    ],
    href: "https://github.com/rohanny/kronos",
  },
  uldraw: {
    name: "Uldraw",
    subtitle: "Real-Time Collaborative Canvas Platform",
    overview:
      "Uldraw is an interactive, real-time infinite collaborative whiteboard built with Next.js, React, WebSockets, and PostgreSQL. It allows multiple distributed users to simultaneously draw, manipulate vector nodes, and collaborate with minimal synchronization overhead.",
    tags: ["Next.js", "React", "TypeScript", "WebSockets", "PostgreSQL", "Tailwind CSS"],
    sections: [
      {
        heading: "Real-time synchronization & engine architecture",
        points: [
          "WebSocket Broadcast Hub: Implemented lightweight room-based channels for low-latency transmission of live cursor positions, active drag states, and element modifications.",
          "Vector Canvas Engine: Custom SVG/Canvas rendering pipeline optimized for smooth rendering and high-frequency coordinate tracking.",
          "Conflict-Aware History Stack: Implemented a robust local and synchronized undo/redo stack managing concurrent element modifications without canvas corruption.",
          "Persistent Storage: Backed by PostgreSQL for reliable workspace persistence, user authentication, and project state snapshots.",
        ],
      },
    ],
    href: "https://github.com/rohannY",
  },
  feedback: {
    name: "Feedback",
    subtitle: "Workflow Automation & Application Tracking Platform",
    overview:
      "Feedback is a full-stack tracking and workflow automation platform built with React, Node.js, Express, and MongoDB. It streamlines applicant evaluation cycles, automated status tracking, and review pipelines with state machine transitions.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "REST APIs"],
    sections: [
      {
        heading: "System features & design",
        points: [
          "State Machine Workflow: Designed deterministic multi-stage status workflows to track candidates and applications smoothly across evaluation stages.",
          "Asynchronous Background Queues: Handled automated event triggers, notifications, and candidate evaluations asynchronously.",
          "Schema Validation: Structured strict validation rules with Express middleware ensuring complete payload validation and data integrity in MongoDB.",
          "Role-Based Access: Secure authentication and granular permissions for reviewers, hiring managers, and administrators.",
        ],
      },
    ],
    href: "https://github.com/VighneshManjrekar/feedback",
  },
} as const;

type ProjectId = keyof typeof projectDetails;

export function ProjectDetail({ projectId, onBack }: {
  projectId: string;
  onBack: (origin: { x: number; y: number }) => void;
}) {
  const project = projectDetails[projectId as ProjectId];
  if (!project) return null;

  return (
    <article className="mx-auto mt-10 w-full max-w-[640px]" aria-labelledby="project-detail-heading">
      <button
        type="button"
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          onBack({
            x: event.clientX || bounds.left + bounds.width / 2,
            y: event.clientY || bounds.top + bounds.height / 2,
          });
        }}
        className="inline-flex items-center gap-2 border-0 bg-transparent p-0 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        back
      </button>

      <header className="mt-8 border-b border-border pb-5">
        <h1 id="project-detail-heading" className="m-0 font-editorial text-4xl font-normal leading-none tracking-tight text-foreground">
          {project.name}
        </h1>
        <p className="mb-0 mt-2 font-sans text-sm text-muted-foreground">{project.subtitle}</p>
      </header>

      <div className="mt-6 space-y-7">
        <section aria-labelledby="project-overview-heading">
          <h2 id="project-overview-heading" className="m-0 font-logo text-xs font-medium tracking-wide text-muted-foreground">
            Overview
          </h2>
          <p className="mb-0 mt-2 font-sans text-sm leading-7 text-foreground/85">{project.overview}</p>
        </section>

        {project.sections.map((section) => (
          <section key={section.heading} aria-label={section.heading}>
            <h2 className="m-0 border-b border-border pb-2 font-logo text-xs font-medium tracking-wide text-muted-foreground">
              {section.heading}
            </h2>
            <ul className="mb-0 mt-3 list-disc space-y-2 pl-5 font-sans text-sm leading-6 text-muted-foreground marker:text-muted-foreground/60">
              {section.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </section>
        ))}

        <section aria-labelledby="project-stack-heading">
          <h2 id="project-stack-heading" className="m-0 font-logo text-xs font-medium tracking-wide text-muted-foreground">
            Built with
          </h2>
          <ul className="mb-0 mt-3 flex flex-wrap gap-1.5 p-0 font-logo text-[10px] text-muted-foreground">
            {project.tags.map((technology) => (
              <li key={technology} className="list-none border border-dashed border-border px-2 py-1">{technology}</li>
            ))}
          </ul>
        </section>

        <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-sans text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground">
          View project
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </article>
  );
}
