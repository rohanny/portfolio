const technologies = [
  { name: "C#", icon: "csharp", href: "https://learn.microsoft.com/dotnet/csharp/" },
  { name: ".NET", icon: "dotnet", href: "https://dotnet.microsoft.com/" },
  { name: "ASP.NET Core", icon: "dotnet", href: "https://learn.microsoft.com/aspnet/core/" },
  { name: "PostgreSQL", icon: "postgresql", href: "https://www.postgresql.org/" },
  { name: "RabbitMQ", icon: "rabbitmq", href: "https://www.rabbitmq.com/" },
  { name: "TypeScript", icon: "typescript", href: "https://www.typescriptlang.org/" },
  { name: "React", icon: "react", href: "https://react.dev/" },
  { name: "Next.js", icon: "nextdotjs", href: "https://nextjs.org/" },
  { name: "Tailwind CSS", icon: "tailwindcss", href: "https://tailwindcss.com/" },
  { name: "C++", icon: "cplusplus", href: "https://isocpp.org/" },
  { name: "Node.js", icon: "nodedotjs", href: "https://nodejs.org/" },
  { name: "Express", icon: "express", href: "https://expressjs.com/" },
  { name: "MongoDB", icon: "mongodb", href: "https://www.mongodb.com/" },
  { name: "Docker", icon: "docker", href: "https://www.docker.com/" },
  { name: "OpenTelemetry", icon: "opentelemetry", href: "https://opentelemetry.io/" },
  { name: "Git", icon: "git", href: "https://git-scm.com/" },
];

export function TechStack() {
  return (
    <section aria-labelledby="tech-stack-heading" className="mt-10">
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
            <a
              href={technology.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 font-sans text-xs text-muted-foreground ring-1 ring-border/80 transition-colors hover:bg-muted/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={`/tech-icons/${technology.icon}.svg`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="size-4 shrink-0"
              />
              <span>{technology.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
