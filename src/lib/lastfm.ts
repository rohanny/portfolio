export interface LastFmTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
}

export async function getRecentTrack(): Promise<LastFmTrack | null> {
  const username = import.meta.env.VITE_LASTFM_USERNAME;
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  if (!username || !apiKey) return null;

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json&limit=1`,
      { cache: "no-store" },
    );
    if (!response.ok) return null;

    const data = await response.json();
    const tracks = data?.recenttracks?.track;
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    if (!track) return null;

    const images = track.image || [];
    const image =
      images.find((item: { size: string; "#text": string }) => item.size === "extralarge")?.["#text"] ||
      images.find((item: { size: string; "#text": string }) => item.size === "large")?.["#text"] ||
      images.at(-1)?.["#text"] ||
      "";
    const artist = typeof track.artist === "object" ? track.artist["#text"] : track.artist;

    return {
      name: track.name || "Unknown track",
      artist: artist || "Unknown artist",
      album: track.album?.["#text"] || "",
      image,
    };
  } catch {
    return null;
  }
}
