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
    <section aria-labelledby="off-the-clock-heading" className="mt-10">
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
        className="group flex items-center gap-3.5 rounded-lg border border-border bg-muted/50 p-3 transition-colors hover:border-foreground/20 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {track?.image ? (
          <img
            src={track.image}
            alt={`${track.album || track.name} cover`}
            width={52}
            height={52}
            loading="lazy"
            className="size-[52px] flex-none rounded-md border border-border object-cover"
          />
        ) : (
          <div className="size-[52px] flex-none rounded-md border border-border bg-muted" aria-hidden="true" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-sans text-[13px] text-foreground">{track?.name || "Recently played"}</span>
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
      </a>
    </section>
  );
}
