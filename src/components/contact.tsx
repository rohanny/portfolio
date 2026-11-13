import { ArrowUpRight, Code2, FileText, Mail } from "lucide-react";

const contactLinks = [
  { label: "Email", href: "mailto:yrohan740@gmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/rohannY", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohanny/", icon: "linkedin" },
  { label: "Twitter", href: "https://x.com/rohannny", icon: "twitter" },
  { label: "LeetCode", href: "https://leetcode.com/rohannny/", icon: "leetcode" },
  { label: "Resume", href: "https://drive.google.com/file/d/1GMy1M6Nv4_Ehk2rexyRVC2ycHf3D7eHS/view?usp=sharing", icon: "resume" },
];

function ContactIcon({ name }: { name: (typeof contactLinks)[number]["icon"] }) {
  if (name === "mail") return <Mail aria-hidden="true" className="size-4" />;
  if (name === "leetcode") return <Code2 aria-hidden="true" className="size-4" />;
  if (name === "resume") return <FileText aria-hidden="true" className="size-4" />;
  if (name === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.28 5.7.42.36.77 1.06.77 2.14v3.17c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    );
  }
  if (name === "twitter") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.4 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="mt-10">
      <div className="mb-4 flex flex-nowrap items-center gap-3">
        <h2
          id="contact-heading"
          className="m-0 shrink-0 font-logo text-sm font-medium tracking-wide text-muted-foreground"
        >
          05 · Contact
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <ul className="m-0 flex flex-wrap gap-2 p-0">
        {contactLinks.map(({ label, href, icon }) => (
          <li key={label} className="list-none">
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="inline-flex items-center gap-2 rounded-md bg-muted px-2.5 py-1.5 font-sans text-sm text-muted-foreground ring-1 ring-border/80 transition-colors hover:bg-muted/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ContactIcon name={icon} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>

    </section>
  );
}

export function LetsTalk() {
  return (
    <section aria-labelledby="lets-talk-heading" className="mt-8">
      <div className="flex flex-col items-center gap-3 border border-dashed border-border px-4 py-5 text-center">
        <h2 id="lets-talk-heading" className="m-0 font-heading text-2xl font-normal tracking-tight text-foreground">
          Let’s talk
        </h2>
        <p className="m-0 max-w-sm font-sans text-sm leading-6 text-muted-foreground">
          Have a project, a question, or just want to say hello? Email is the easiest way to reach me.
        </p>
        <a
          href="mailto:yrohan740@gmail.com"
          className="inline-flex items-center gap-2 bg-foreground px-3 py-2 font-sans text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Send an email
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </section>
  );
}
