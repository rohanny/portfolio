import React, { useState } from "react";
import { ItemCard, ItemCardData } from "./item-card";
import { DetailView, DetailViewData } from "./detail-view";

const experienceDetails: Record<string, DetailViewData> = {
  "softlink-global": {
    id: "softlink-global",
    category: "work",
    title: "Software Engineer L1",
    subtitle: "Softlink Global",
    location: "Mumbai",
    period: "June 2024 - Present",
    overview:
      "At Softlink Global, I work on platform and backend engineering across distributed systems, asynchronous data pipelines, cross-database replication, and developer tooling. My work includes synchronization services, Change Data Capture (CDC) pipelines, and document generation tools for logistics software.",
    tags: [
      "C#",
      ".NET Core",
      "ASP.NET",
      "PostgreSQL",
      "SQL Server",
      "RabbitMQ",
      "React",
      "TypeScript",
      "OpenTelemetry",
      "Docker",
      "CI/CD"
    ],
    sections: [
      {
        heading: "key engineering systems & architecture",
        subItems: [
          {
            title: "Incremental Change Data Capture (CDC) Sync Daemon",
            subtitle: ".NET Core • SQL Server • PostgreSQL",
            desc: "Built background synchronization workers that process SQL Server Change Tracking offsets and apply incremental bulk updates to PostgreSQL, avoiding repeated full-table synchronization.",
            stack: ["C#", ".NET Core", "SQL Server Change Tracking", "PostgreSQL", "Background Workers"]
          },
          {
            title: "Cross-Database Replication Pipelines",
            subtitle: "RabbitMQ • Binary Protocols • Connection Pooling",
            desc: "Built asynchronous synchronization pipelines using RabbitMQ and connection pooling to decouple transactional ERP writes from analytical stores.",
            stack: ["RabbitMQ", "SQL Server", "PostgreSQL", ".NET", "Connection Pooling"]
          },
          {
            title: "Automated Schema Comparison & Migration Tooling",
            subtitle: "C# • Information Schema • Schema Drift",
            desc: "Developed schema comparison tooling to inspect metadata across versions and surface missing columns or changed data types before migrations.",
            stack: ["C#", "SQL Server Metadata", "PostgreSQL", "Schema Migration"]
          },
          {
            title: "Analytics & Reporting Microservice",
            subtitle: "ASP.NET Minimal APIs • React",
            desc: "Engineered an in-house reporting runtime to replace costly third-party BI licenses, optimizing SQL query execution plans and delivering high-speed RESTful data endpoints to React analytics dashboards.",
            stack: ["ASP.NET Core Minimal APIs", "C#", "React", "Query Optimization"]
          },
          {
            title: "WYSIWYG Document Designer & PDF Compilation Pipeline",
            subtitle: "React • TypeScript • PDFsharp",
            desc: "Engineered an interactive template designer and backend compilation engine that parses custom dynamic variable expressions to compile complex logistics shipping bills and customs invoices directly into vectorized PDF artifacts.",
            stack: ["React", "TypeScript", "JSON Schema", "C#", "PDFsharp"]
          }
        ]
      },
      {
        heading: "core responsibilities & impact",
        points: [
          "Developed resilient backend services and REST APIs supporting core freight forwarding and customs clearance modules.",
          "Implemented structured logging and distributed tracing with OpenTelemetry to track end-to-end sync health.",
          "Collaborated closely with cross-functional teams, product architects, and database administrators to enforce schema governance and API security."
        ]
      }
    ]
  }
};

const experienceList: ItemCardData[] = [
  {
    id: "softlink-global",
    href: "/experience/softlink-global",
    title: "Software Engineer L1",
    subtitle: "Softlink Global",
    location: "Mumbai",
    period: "June 2024 - Present",
    description:
      "Engineering cloud-native freight forwarding ERP platforms, incremental CDC data daemons, cross-database replication pipelines with RabbitMQ, and document generation engines.",
    tags: ["Dotnet", "PostgreSQL", "SQL Server", "RabbitMQ", "React", "OpenTelemetry"]
  }
];

export const Experience: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const id = window.location.pathname.split("/")[2];
    return id && experienceDetails[id] ? id : null;
  });

  React.useEffect(() => {
    const syncSelection = () => {
      const id = window.location.pathname.split("/")[2];
      setSelectedId(id && experienceDetails[id] ? id : null);
    };
    window.addEventListener("popstate", syncSelection);
    return () => window.removeEventListener("popstate", syncSelection);
  }, []);

  const selectExperience = (id: string) => {
    window.history.pushState({ view: "experience", experienceId: id }, "", `/experience/${id}`);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToExperience = () => {
    if (window.history.state?.experienceId === selectedId) {
      window.history.back();
      return;
    }
    window.history.pushState({ view: "experience" }, "", "/experience");
    setSelectedId(null);
  };

  if (selectedId && experienceDetails[selectedId]) {
    return (
      <DetailView
        data={experienceDetails[selectedId]}
        onBack={backToExperience}
      />
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-satoshi">
          work.
        </h2>
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          my professional journey and engineering roles.
        </p>
      </div>

      <div className="space-y-4">
        {experienceList.map((item) => (
          <ItemCard key={item.id} item={item} onClick={selectExperience} />
        ))}
      </div>
    </div>
  );
};
