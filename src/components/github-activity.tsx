import { useMemo } from "react";
import snapshot from "@/data/github-contributions.json";

type Contribution = { date: string; count: number; level: number };

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVELS = [0, 1, 2, 3, 4];
const LEVEL_CLASSES = [
  "bg-[#e4e4e7] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];
const snapshotDays = snapshot as Contribution[];

function utcDate(date: Date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function GithubActivity() {
  const contributions = snapshotDays;

  const { weeks, monthLabels, total } = useMemo(() => {
    const now = new Date();
    const today = utcDate(now);
    const firstVisibleDay = today - 364 * DAY_MS;
    const firstDate = new Date(firstVisibleDay);
    const gridStart = utcDate(firstDate) - firstDate.getUTCDay() * DAY_MS;
    const lastDate = new Date(today);
    const gridEnd = today + (6 - lastDate.getUTCDay()) * DAY_MS;
    const dataByDate = new Map(contributions.map((item) => [item.date, item]));
    const allDays: Contribution[] = [];
    let snapshotTotal = 0;

    for (let timestamp = gridStart; timestamp <= gridEnd; timestamp += DAY_MS) {
      const date = new Date(timestamp);
      const isoDate = date.toISOString().slice(0, 10);
      const item = dataByDate.get(isoDate);
      const isInRange = timestamp >= firstVisibleDay && timestamp <= today;
      const day = timestamp > today
        ? { date: isoDate, count: 0, level: -1 }
        : item ?? { date: isoDate, count: 0, level: 0 };

      if (isInRange) snapshotTotal += day.count;
      allDays.push(day);
    }

    const calendarWeeks: Contribution[][] = [];
    for (let index = 0; index < allDays.length; index += 7) {
      calendarWeeks.push(allDays.slice(index, index + 7));
    }

    const labels = Array.from({ length: 12 }, (_, index) => {
      const month = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 12 + index, 1));
      const column = Math.max(0, Math.floor((utcDate(month) - gridStart) / (7 * DAY_MS)));
      return { label: MONTHS[month.getUTCMonth()], column };
    });

    return {
      weeks: calendarWeeks,
      monthLabels: labels,
      total: snapshotTotal,
    };
  }, [contributions]);

  return (
    <section id="github" aria-labelledby="github-activity-heading" className="scroll-mt-16 mt-10">
      <div className="mb-4 flex flex-nowrap items-center gap-3">
        <h2
          id="github-activity-heading"
          className="m-0 shrink-0 font-logo text-sm font-medium tracking-wide text-muted-foreground"
        >
          02 · GitHub Activity
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <div aria-label="GitHub contribution calendar for the last year" className="w-full">
        <div
          aria-hidden="true"
          className="grid w-full grid-cols-[repeat(53,minmax(0,1fr))] gap-x-[2px] pb-2 font-mono text-[9px] text-muted-foreground sm:text-[10px]"
        >
          {monthLabels.map(({ label, column }, index) => (
            <span key={`${label}-${index}`} style={{ gridColumnStart: column + 1 }}>
              {label}
            </span>
          ))}
        </div>

        <div
          role="img"
          aria-label={`${total} contributions in the last year`}
          className="grid w-full grid-cols-[repeat(53,minmax(0,1fr))] gap-x-[2px]"
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid min-w-0 grid-rows-7 gap-y-[2px]">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={day.level < 0 ? undefined : `${day.count} contributions on ${day.date}`}
                  data-level={day.level}
                  className={[
                    "aspect-square min-w-0 rounded-[2px]",
                    day.level < 0 && "invisible",
                    LEVEL_CLASSES[day.level] ?? "border-transparent bg-transparent",
                  ].filter(Boolean).join(" ")}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="m-0 font-sans text-xs text-muted-foreground">
            <strong className="font-medium text-foreground">{total}</strong> contributions in the last year
          </p>
          <div aria-label="Contribution intensity: Less to More" className="flex items-center gap-1 font-logo text-[9px] text-muted-foreground sm:text-[10px]">
            <span className="mr-1">Less</span>
            {LEVELS.map((level) => (
              <i
                key={level}
                aria-hidden="true"
                data-level={level}
                className={`size-2 rounded-[2px] border ${LEVEL_CLASSES[level]}`}
              />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
