import { ArrowLeft, ArrowUpRight } from "lucide-react";

const experience = {
  title: "Software Engineer L1",
  company: "Softlink Global",
  location: "Mumbai",
  period: "June 2024 — Present",
  overview:
    "At Softlink Global, I work on platform and backend engineering across distributed systems, asynchronous data pipelines, cross-database replication, and developer tooling. My work includes synchronization services, Change Data Capture (CDC) pipelines, and document generation tools for logistics software.",
  tags: ["C#", ".NET Core", "ASP.NET", "PostgreSQL", "SQL Server", "RabbitMQ", "React", "TypeScript", "OpenTelemetry", "Docker", "CI/CD"],
  stories: [
    {
      theme: "Data movement",
      title: "Keeping customer data in sync",
      description:
        "Built CDC workers and RabbitMQ pipelines to replicate SQL Server data into PostgreSQL across 10+ customer deployments. Added schema comparison tooling across 50+ production tables.",
      flow: "SQL Server ↔ PostgreSQL · CDC / RabbitMQ",
      metric: "5M",
      metricLabel: "records in 15 minutes",
    },
    {
      theme: "Analytics",
      title: "Making operational data useful",
      description:
        "Built a self-hosted BI platform as a Power BI alternative, pairing normalized PostgreSQL schemas and REST APIs with React dashboards. Query optimization brought P95 latency from 3.8 seconds to under 260 ms.",
      flow: "PostgreSQL → ASP.NET APIs → React dashboards",
      metric: "3.8s → <260ms",
      metricLabel: "P95 query latency",
    },
    {
      theme: "Document workflows",
      title: "From editable templates to finished PDFs",
      description:
        "Developed a React and TypeScript document designer with a C#/.NET rendering backend for logistics documents and custom template variables.",
      flow: "React + TypeScript → .NET rendering → PDF",
      metric: "200+",
      metricLabel: "enterprise templates",
    },
  ],
  widerScope:
    "Alongside these systems, I built freight and customs APIs, added OpenTelemetry tracing to sync workflows, and worked with product, architecture, and database teams on schema governance and API security.",
};

export function ExperienceDetail({ onBack }: { onBack: () => void }) {
  return (
    <article className="mx-auto mt-10 w-full max-w-[640px]" aria-labelledby="experience-detail-heading">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 border-0 bg-transparent p-0 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        back
      </button>

      <header className="mt-8 border-b border-border pb-5">
        <h1 id="experience-detail-heading" className="m-0 font-heading text-4xl font-medium leading-none tracking-tight text-foreground">
          {experience.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <a
            href="https://www.softlinkglobal.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            <img src="/softlink-logo.png" alt="" className="size-4 shrink-0 object-contain" />
            {experience.company}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
          <p className="m-0 font-logo text-xs text-muted-foreground">
            {experience.period} <span aria-hidden="true">·</span> {experience.location}
          </p>
        </div>
      </header>

      <div className="mt-6 space-y-7">
        <section aria-labelledby="experience-overview-heading">
          <h2 id="experience-overview-heading" className="m-0 font-logo text-xs font-medium tracking-wide text-muted-foreground">
            Overview
          </h2>
          <p className="mb-0 mt-2 font-sans text-sm leading-7 text-foreground/85">{experience.overview}</p>
        </section>

        <section aria-labelledby="experience-work-heading">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="experience-work-heading" className="m-0 font-heading text-2xl font-medium leading-none tracking-tight text-foreground">
              Work in motion
            </h2>
            <span className="font-logo text-[11px] text-muted-foreground">Data · Analytics · Documents</span>
          </div>
          <div className="divide-y divide-dashed divide-border">
            {experience.stories.map((story, index) => (
              <article key={story.title} className="group/story grid grid-cols-[minmax(0,1fr)_144px] gap-x-4 gap-y-3 py-5 first:pt-4 max-[420px]:grid-cols-1">
                <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                  <span className="font-logo text-[11px] text-muted-foreground/70">0{index + 1}</span>
                  <div className="min-w-0">
                    <p className="m-0 font-logo text-[11px] text-muted-foreground">{story.theme}</p>
                    <h3 className="mb-0 mt-1 cursor-pointer py-1 font-editorial text-2xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover/story:text-muted-foreground motion-reduce:transition-none">{story.title}</h3>
                    <p className="mb-0 mt-2 font-sans text-sm leading-6 text-muted-foreground">{story.description}</p>
                    <p className="mb-0 mt-3 font-mono text-[10px] leading-5 text-muted-foreground/80">{story.flow}</p>
                  </div>
                </div>
                <div className="flex min-w-0 flex-col justify-center border-l border-dashed border-border pl-4 text-left max-[420px]:ml-7 max-[420px]:border-l-0 max-[420px]:border-t max-[420px]:pt-2 max-[420px]:pl-0">
                  <strong className="font-heading text-xl font-medium leading-none tracking-tight text-foreground">{story.metric}</strong>
                  <span className="mt-1 font-logo text-[10px] text-muted-foreground">{story.metricLabel}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="mb-0 mt-5 border-t border-dashed border-border pt-4 font-sans text-sm leading-6 text-muted-foreground">
            {experience.widerScope}
          </p>
        </section>

        <section aria-labelledby="experience-stack-heading">
          <h2 id="experience-stack-heading" className="m-0 font-logo text-xs font-medium tracking-wide text-muted-foreground">
            Core stack
          </h2>
          <ul className="mb-0 mt-3 flex flex-wrap gap-1.5 p-0 font-logo text-[10px] text-muted-foreground">
            {experience.tags.map((technology) => (
              <li key={technology} className="list-none border border-dashed border-border px-2 py-1">{technology}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
