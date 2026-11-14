import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { ProfileIntro } from "@/components/profile-intro";
import { SectionRail } from "@/components/section-rail";
import { Projects } from "@/components/projects";
import { GithubActivity } from "@/components/github-activity";
import { Experience } from "@/components/experience";
import { TechStack } from "@/components/tech-stack";
import { Contact, LetsTalk } from "@/components/contact";
import { ProjectDetail } from "@/components/project-detail";
import { ExperienceDetail } from "@/components/experience-detail";
import { OffTheClock } from "@/components/off-the-clock";
import { Button } from "@/components/ui/button";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("portfolio-theme") === "dark",
  );
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeExperience, setActiveExperience] = useState(false);

  const toggleThemeFrom = ({ x, y }: { x: number; y: number }) => {
    const nextIsDarkMode = !isDarkMode;
    const root = document.documentElement;
    root.style.setProperty("--theme-switch-x", `${x}px`);
    root.style.setProperty("--theme-switch-y", `${y}px`);

    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> };
    };

    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(() => {
        root.classList.toggle("dark", nextIsDarkMode);
        localStorage.setItem("portfolio-theme", nextIsDarkMode ? "dark" : "light");
        flushSync(() => setIsDarkMode(nextIsDarkMode));
      });
    } else {
      setIsDarkMode(nextIsDarkMode);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <>
      <header className="relative mx-auto flex h-12 w-full max-w-[640px] items-center justify-between px-4 after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:w-screen after:-translate-x-1/2 after:border-b after:border-dashed after:border-border after:content-['']">
        <a href="#home" aria-label="Rohan, home" className="cursor-pointer font-logo text-base font-medium tracking-wide text-foreground">
          rohan
        </a>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            toggleThemeFrom({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
          }}
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
          title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
          className="size-8 text-muted-foreground hover:text-foreground"
        >
          {isDarkMode ? (
            <Sun className="animate-[theme-icon-spin_420ms_cubic-bezier(0.2,0.7,0.3,1)_both] motion-reduce:animate-none" />
          ) : (
            <Moon className="animate-[theme-icon-spin_420ms_cubic-bezier(0.2,0.7,0.3,1)_both] motion-reduce:animate-none" />
          )}
        </Button>
      </header>
      <main id="home" className="mx-auto min-h-[calc(100svh-3rem)] w-full max-w-[640px] px-4 pb-8 pt-2">
        {activeProject ? (
          <ProjectDetail
            projectId={activeProject}
            onBack={() => {
              setActiveProject(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : activeExperience ? (
          <ExperienceDetail
            onBack={() => {
              setActiveExperience(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : (
          <>
            <SectionRail />
            <ProfileIntro />
            <Experience onSelect={() => {
              setActiveExperience(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
            <GithubActivity />
            <Projects onSelect={(projectId) => {
              setActiveProject(projectId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
            <TechStack />
            <Contact />
            <OffTheClock />
            <LetsTalk />
          </>
        )}
      </main>
      <Analytics />
    </>
  );
}
