const technologies = [
  { name: "C#", icon: "csharp" },
  { name: "ASP.NET Core", icon: "dotnet" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "RabbitMQ", icon: "rabbitmq" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "C++", icon: "cplusplus" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Docker", icon: "docker" },
  { name: "OpenTelemetry", icon: "opentelemetry" },
  { name: "Git", icon: "git" },
];

export function TechStack() {
  return (
    <section id="tech-stack" aria-labelledby="tech-stack-heading" className="scroll-mt-16 mt-10">
      <div className="mb-4 flex flex-nowrap items-center gap-3">
        <h2
          id="tech-stack-heading"
          className="m-0 shrink-0 font-logo text-sm font-medium tracking-wide text-muted-foreground"
        >
          04 · Tech Stack
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <ul className="m-0 flex flex-wrap gap-2 p-0">
        {technologies.map((technology) => (
          <li key={technology.name} className="list-none">
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-muted px-2 py-1 font-sans text-xs text-muted-foreground ring-1 ring-border/80 transition-colors duration-200 hover:bg-foreground/[0.04] hover:text-foreground">
              <img
                src={`/tech-icons/${technology.icon}.svg`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="size-4 shrink-0"
              />
              <span>{technology.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
