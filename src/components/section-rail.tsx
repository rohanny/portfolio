import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub activity" },
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech stack" },
  { id: "contact", label: "Contact" },
  { id: "off-the-clock", label: "Off the clock" },
];

export function SectionRail() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const pinnedSection = useRef<string | null>(null);

  useEffect(() => {
    let frame: number | null = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.42;
    const sectionSelector = sections.map(({ id }) => `#${id}`).join(",");

    const sectionAtPointer = () => {
      const target = document.elementFromPoint(pointerX, pointerY);
      return target instanceof Element
        ? target.closest<HTMLElement>(sectionSelector)?.id
        : undefined;
    };

    const trackPointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      const sectionId = sectionAtPointer();
      if (sectionId) {
        pinnedSection.current = null;
        setActiveSection(sectionId);
      }
    };

    const updateActiveSection = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (pinnedSection.current) {
          setActiveSection(pinnedSection.current);
          return;
        }

        const pointerSection = sectionAtPointer();
        if (pointerSection) {
          setActiveSection(pointerSection);
          return;
        }

        const activationLine = window.innerHeight * 0.42;
        const positions = sections.flatMap((section) => {
          const element = document.getElementById(section.id);
          if (!element) return [];
          const bounds = element.getBoundingClientRect();
          return [{ id: section.id, top: bounds.top, bottom: bounds.bottom }];
        });

        const active = positions.find(({ top, bottom }) => top <= activationLine && bottom > activationLine)
          ?? positions.reduce((closest, position) =>
            Math.abs(position.top - activationLine) < Math.abs(closest.top - activationLine)
              ? position
              : closest,
          );

        if (active) setActiveSection(active.id);
      });
    };

    const releasePinnedSection = () => {
      if (!pinnedSection.current) return;
      pinnedSection.current = null;
      updateActiveSection();
    };

    updateActiveSection();
    document.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("wheel", releasePinnedSection, { passive: true });
    window.addEventListener("touchstart", releasePinnedSection, { passive: true });
    window.addEventListener("keydown", releasePinnedSection);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("wheel", releasePinnedSection);
      window.removeEventListener("touchstart", releasePinnedSection);
      window.removeEventListener("keydown", releasePinnedSection);
    };
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 sm:left-4 sm:block">
      <ol className="m-0 flex list-none flex-col items-start gap-px p-0">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;

          return (
            <li key={id} className="flex h-4 items-center gap-px">
              <a
                href={`#${id}`}
                aria-label={`Scroll to ${label}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  pinnedSection.current = id;
                  setActiveSection(id);
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group flex h-4 w-7 cursor-pointer items-center justify-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <span
                  aria-hidden="true"
                  className={`block h-px rounded-full transition-[width,background-color] duration-300 ${
                    isActive
                      ? "w-6 bg-foreground"
                      : "w-2.5 bg-muted-foreground/35 group-hover:w-4 group-hover:bg-muted-foreground"
                  }`}
                />
              </a>
              <span
                aria-hidden="true"
                className={`w-20 text-left font-logo text-[10px] leading-4 text-muted-foreground transition-[opacity,transform,color] duration-300 ${
                  isActive
                    ? "translate-x-0 opacity-100 text-foreground"
                    : "pointer-events-none -translate-x-1 opacity-0"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
