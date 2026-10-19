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
      "At Softlink Global, I worked on core platform and backend engineering problems spanning distributed systems, asynchronous data pipelines, cross-database replication, and developer infrastructure. I engineered backend sync daemons, Change Data Capture (CDC) pipelines, and high-performance document tools powering enterprise logistics ERP deployments.",
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
            desc: "Designed and built background synchronization workers that process SQL Server Change Tracking offsets and perform incremental bulk updates into analytical PostgreSQL instances every 5 minutes, eliminating full-table locks and sync latency.",
            stack: ["C#", ".NET Core", "SQL Server Change Tracking", "PostgreSQL", "Background Workers"]
          },
          {
            title: "Cross-Database Replication Pipelines",
            subtitle: "RabbitMQ • Binary Protocols • Connection Pooling",
            desc: "Architected asynchronous data synchronization pipelines using RabbitMQ and connection pooling to reliably decouple high-volume transactional ERP operational writes into analytical stores across 10+ enterprise client deployments.",
            stack: ["RabbitMQ", "SQL Server", "PostgreSQL", ".NET", "Connection Pooling"]
          },
          {
            title: "Automated Schema Comparison & Migration Tooling",
            subtitle: "C# • Information Schema • Schema Drift",
            desc: "Developed automated comparison tooling to inspect metadata across versions prior to migration, detecting schema divergence (missing columns, altered datatypes) across 50+ production tables to prevent ingestion failures during upgrades.",
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
          "Maintained 99.9% uptime across asynchronous data pipelines handling continuous production transactions.",
          "Collaborated closely with cross-functional teams, product architects, and database administrators to enforce schema governance and API security."
        ]
      }
    ]
  }
};

const experienceList: ItemCardData[] = [
  {
    id: "softlink-global",
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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId && experienceDetails[selectedId]) {
    return (
      <DetailView
        data={experienceDetails[selectedId]}
        onBack={() => setSelectedId(null)}
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
          <ItemCard key={item.id} item={item} onClick={setSelectedId} />
        ))}
      </div>
    </div>
  );
};
