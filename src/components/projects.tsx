import React, { useState } from "react";
import { ItemCard, ItemCardData } from "./item-card";
import { DetailView, DetailViewData } from "./detail-view";
import { motion } from "framer-motion";

const projectDetails: Record<string, DetailViewData> = {
  kronos: {
    id: "kronos",
    category: "project",
    projectArtwork: "kronos",
    title: "Kronos",
    subtitle: "Distributed Log-Structured Storage Engine",
    period: "Personal Systems Project",
    overview:
      "Kronos is an append-only commit log and distributed storage engine inspired by the internal architectures of Kafka and Bitcask. Built in C++, it explores write-ahead logging (WAL), memory-mapped segment indexing, sequential disk write performance, and crash-recovery protocols with payload checksum validation.",
    tags: ["C++", "Distributed Systems", "Write-Ahead Log (WAL)", "Memory-Mapped I/O", "CRC32", "Storage Engines"],
    links: [
      { label: "github repository", url: "https://github.com/rohanny/kronos", icon: "github" }
    ],
    sections: [
      {
        heading: "architectural highlights & storage model",
        points: [
          "Append-Only Commit Log: Employs sequential I/O to maximize disk write throughput, avoiding costly random write seek times on disk.",
          "Memory-Mapped Segment Indexing: Keeps dense offset-to-physical-byte indices memory-mapped (mmap) for constant-time (O(1)) index lookups and low-latency sequential range reads.",
          "Write-Ahead Logging (WAL): Enforces all writes to persist sequentially to WAL before memory updates, ensuring atomicity and zero state loss upon crashes.",
          "CRC32 Checksum Integrity: Appends CRC32 checksums to segment record headers; validates integrity on startup to detect and isolate partially written or corrupted log records.",
          "Segment Compaction & Rolling: Implements segment file rollover at configurable size boundaries to support background cleanup and retain bound log sizes."
        ]
      },
      {
        heading: "key technical challenges solved",
        points: [
          "Eliminating memory bloat during massive append bursts using bounded buffer pooling and flushing semantics.",
          "Designing deterministic crash recovery that reads segment headers sequentially and safely restores the partition state table on unexpected process termination."
        ]
      }
    ]
  },
  uldraw: {
    id: "uldraw",
    category: "project",
    projectArtwork: "uldraw",
    title: "Uldraw",
    subtitle: "Real-Time Collaborative Canvas Platform",
    period: "Full-Stack Project",
    overview:
      "Uldraw is an interactive, real-time infinite collaborative whiteboard built with Next.js, React, WebSockets, and PostgreSQL. It allows multiple distributed users to simultaneously draw, manipulate vector nodes, and collaborate with minimal synchronization overhead.",
    tags: ["Next.js", "React", "TypeScript", "WebSockets", "PostgreSQL", "Tailwind CSS"],
    links: [
      { label: "github profile", url: "https://github.com/rohannY", icon: "github" }
    ],
    sections: [
      {
        heading: "real-time synchronization & engine architecture",
        points: [
          "WebSocket Broadcast Hub: Implemented lightweight room-based channels for low-latency transmission of live cursor positions, active drag states, and element modifications.",
          "Vector Canvas Engine: Custom SVG/Canvas rendering pipeline optimized for smooth rendering and high-frequency coordinate tracking.",
          "Conflict-Aware History Stack: Implemented a robust local and synchronized undo/redo stack managing concurrent element modifications without canvas corruption.",
          "Persistent Storage: Backed by PostgreSQL for reliable workspace persistence, user authentication, and project state snapshots."
        ]
      }
    ]
  },
  feedback: {
    id: "feedback",
    category: "project",
    projectArtwork: "feedback",
    title: "Feedback",
    subtitle: "Workflow Automation & Application Tracking Platform",
    period: "Full-Stack Project",
    overview:
      "Feedback is a full-stack tracking and workflow automation platform built with React, Node.js, Express, and MongoDB. It streamlines applicant evaluation cycles, automated status tracking, and review pipelines with state machine transitions.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "REST APIs"],
    links: [
      { label: "github repository", url: "https://github.com/VighneshManjrekar/feedback", icon: "github" }
    ],
    sections: [
      {
        heading: "system features & design",
        points: [
          "State Machine Workflow: Designed deterministic multi-stage status workflows to track candidates and applications smoothly across evaluation stages.",
          "Asynchronous Background Queues: Handled automated event triggers, notifications, and candidate evaluations asynchronously.",
          "Schema Validation: Structured strict validation rules with Express middleware ensuring complete payload validation and data integrity in MongoDB.",
          "Role-Based Access: Secure authentication and granular permissions for reviewers, hiring managers, and administrators."
        ]
      }
    ]
  }
};

const projectList: ItemCardData[] = [
  {
    id: "kronos",
    title: "Kronos",
    subtitle: "Distributed Log-Structured Storage Engine",
    metaBadge: "C++",
    description:
      "Append-only commit log engine inspired by Kafka and Bitcask. Implements sequential disk writes, memory-mapped segment indexing, WAL, and CRC32 crash recovery.",
    tags: ["C++", "Distributed Systems", "WAL", "mmap", "Storage Engine"]
  },
  {
    id: "uldraw",
    title: "Uldraw",
    subtitle: "Real-Time Collaborative Canvas Platform",
    metaBadge: "Live",
    description:
      "Infinite collaborative canvas with Next.js and WebSockets. Features real-time multi-user cursor tracking, concurrent shape editing, and conflict-aware undo/redo stacks.",
    tags: ["Next.js", "React", "TypeScript", "WebSockets", "PostgreSQL"]
  },
  {
    id: "feedback",
    title: "Feedback",
    subtitle: "Workflow Automation & Tracking Platform",
    metaBadge: "Full-Stack",
    description:
      "Full-stack workflow tracking platform with deterministic state transitions, asynchronous background queues, and structured REST API validations.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB"]
  }
];

export const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const id = window.location.pathname.split("/")[2];
    return id && projectDetails[id] ? id : null;
  });

  React.useEffect(() => {
    const project = selectedId ? projectDetails[selectedId] : null;
    const title = project ? `${project.title} — Rohan Yadav` : "Rohan Yadav — Software Engineer";
    const description = project?.overview ?? "Rohan Yadav is a software engineer building reliable backend systems, distributed services, and thoughtful interfaces.";
    const url = project ? `https://rohanny.vercel.app/projects/${project.id}` : "https://rohanny.vercel.app/";
    document.title = title;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    return () => {
      document.title = "Rohan Yadav — Software Engineer";
      document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://rohanny.vercel.app/");
      document.querySelector('meta[property="og:url"]')?.setAttribute("content", "https://rohanny.vercel.app/");
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Rohan Yadav is a software engineer building reliable backend systems, distributed services, and thoughtful interfaces.");
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", "Rohan Yadav — Software Engineer");
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", "Reliable backend systems, distributed services, and thoughtful interfaces.");
      document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", "Rohan Yadav — Software Engineer");
      document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", "Reliable backend systems, distributed services, and thoughtful interfaces.");
    };
  }, [selectedId]);

  React.useEffect(() => {
    const syncSelection = () => {
      const id = window.location.pathname.split("/")[2];
      setSelectedId(id && projectDetails[id] ? id : null);
    };
    window.addEventListener("popstate", syncSelection);
    return () => window.removeEventListener("popstate", syncSelection);
  }, []);

  const selectProject = (id: string) => {
    window.history.pushState({ view: "projects", projectId: id }, "", `/projects/${id}`);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToProjects = () => {
    if (window.history.state?.projectId === selectedId) {
      window.history.back();
      return;
    }
    window.history.pushState({ view: "projects" }, "", "/projects");
    setSelectedId(null);
  };

  if (selectedId && projectDetails[selectedId]) {
    return (
      <DetailView
        data={projectDetails[selectedId]}
        onBack={backToProjects}
      />
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
          projects.
        </h2>
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          a collection of distributed systems, developer tools, and web platforms i've built.
        </p>
      </div>

      <div className="space-y-4">
        {projectList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.045 } }}
          >
            <ItemCard item={item} onClick={selectProject} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
