import { useEffect, useState } from "react";
import { getRecentTrack, type LastFmTrack } from "@/lib/lastfm";
import { AudioLines } from "@/components/ui/audio-lines";

export function OffTheClock() {
  const [track, setTrack] = useState<LastFmTrack | null>(null);

  useEffect(() => {
    let mounted = true;
    const updateTrack = async () => {
      const recentTrack = await getRecentTrack();
      if (mounted) setTrack(recentTrack);
    };

    void updateTrack();
    const intervalId = window.setInterval(updateTrack, 30_000);
    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="off-the-clock" aria-labelledby="off-the-clock-heading" className="scroll-mt-16 mt-10">
      <div className="mb-3 flex flex-nowrap items-center gap-3">
        <h2 id="off-the-clock-heading" className="m-0 shrink-0 font-logo text-sm font-medium tracking-wide text-muted-foreground">
          06 · Off the clock
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <p className="mb-3 mt-0 font-sans text-sm leading-[1.65] text-muted-foreground">
        A little of what I’ve been listening to lately.
      </p>

      <a
        href={track ? `https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${track.artist}`)}` : "https://open.spotify.com/"}
        target="_blank"
        rel="noreferrer"
        className="group relative isolate flex items-center gap-3.5 overflow-hidden rounded-lg border border-foreground/6 bg-muted/15 p-3 transition-colors hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {track?.image && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 bg-left bg-no-repeat opacity-0 blur-2xl transition-[background-size,opacity] duration-700 ease-out group-hover:bg-[length:180%_auto] group-hover:opacity-80 group-hover:animate-[album-color-bounce_10s_linear_infinite,album-art-rotate_20s_linear_infinite] motion-reduce:animate-none motion-reduce:transition-none"
              style={{ backgroundImage: `url("${track.image}")`, backgroundSize: "150% auto" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 bg-background/70 opacity-0 transition-opacity duration-700 group-hover:opacity-40 motion-reduce:transition-none"
            />
          </>
        )}
        <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3.5">
          {track?.image ? (
            <img
              src={track.image}
              alt={`${track.album || track.name} cover`}
              width={52}
              height={52}
              loading="lazy"
              className="size-[52px] flex-none rounded-md object-cover"
            />
          ) : (
            <div className="size-[52px] flex-none rounded-md bg-muted" aria-hidden="true" />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate font-logo text-[13px] text-foreground">{track?.name || "Recently played"}</span>
            <span className="truncate font-sans text-xs text-muted-foreground">
              {track ? `${track.artist}${track.album ? ` · ${track.album}` : ""}` : "Track details will appear here."}
            </span>
            <span className="mt-0.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span className="font-logo">Recently played</span>
              <span className="inline-flex flex-none items-center gap-1 font-logo text-foreground/80">
                <AudioLines animate size={14} strokeWidth={1.8} />
                Spotify
              </span>
            </span>
          </div>
        </div>
      </a>
    </section>
  );
}
