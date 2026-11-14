import { useState } from "react";

export function ProfileIntro() {
  const [avatarAvailable, setAvatarAvailable] = useState(true);

  return (
    <section id="about" aria-label="Profile" className="scroll-mt-16 pb-2 pt-0 sm:pb-3 sm:pt-16">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-muted">
          {avatarAvailable ? (
            <img
              src="https://github.com/rohannY.png"
              alt="Rohan Yadav"
              className="size-full rounded-lg object-cover"
              onError={() => setAvatarAvailable(false)}
            />
          ) : (
            <span className="font-heading text-2xl text-muted-foreground" aria-hidden="true">
              RY
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h1 className="m-0 font-heading text-2xl font-normal leading-none tracking-tight text-foreground sm:text-3xl">
            Rohan Yadav
          </h1>
          <p className="mt-1 font-sans text-sm font-medium text-muted-foreground">
            Software Engineer
          </p>
        </div>
      </div>

      <div className="mt-6 w-full space-y-3 font-sans text-sm leading-7 text-muted-foreground sm:text-base">
        <p>
          Hi, I&apos;m Rohan. I&apos;m a software engineer curious about how things work and
          enjoy exploring ideas through building. My interests span backend
          engineering, distributed systems, databases, and interactive applications.
        </p>
        <p>
          Sometimes an idea turns into something useful; other times, it leads
          somewhere unexpected. Either way, there&apos;s always something to learn.
        </p>
        <p>
          This is a collection of projects, experiments, and little discoveries I&apos;ve
          found worth sharing.
        </p>
      </div>
    </section>
  );
}
