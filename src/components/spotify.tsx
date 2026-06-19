import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { lastFmService, MusicTrack } from '../lib/lastfm';
import React, { Suspense } from 'react';

class SpotifyErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_error: any, _info: any) {}
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-5 text-xs text-zinc-550 bg-zinc-950/20 border border-zinc-900 rounded-none">
          Failed to load music status.
        </div>
      );
    }
    return this.props.children;
  }
}

function SpotifyCardContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [nowPlaying, setNowPlaying] = useState<MusicTrack | null>(null);
  const [recentTracks, setRecentTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        setLoading(true);
        const currentTrack = await lastFmService.getNowPlaying();
        setNowPlaying(currentTrack);
        const recentTracksData = await lastFmService.getRecentTracks(5);
        setRecentTracks(recentTracksData);
      } catch (err) {
        // Stream offline
      } finally {
        setLoading(false);
      }
    };
    fetchMusicData();
    const interval = setInterval(fetchMusicData, 120000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, []);

  const displayTrack = nowPlaying || recentTracks[0];
  const songName = displayTrack?.name || "Offline";
  const artistName = displayTrack?.artist || "Spotify";
  const albumName = displayTrack?.album || "";
  const albumArtUrl = displayTrack?.albumArtUrl;

  const createSpotifyUrl = (trackName: string, artistName: string) => {
    const searchQuery = encodeURIComponent(`${trackName} ${artistName}`);
    return `https://open.spotify.com/search/${searchQuery}`;
  };
  const spotifyUrl = displayTrack ? createSpotifyUrl(songName, artistName) : '#';

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-between w-full">
          <div className="space-y-2.5 flex-1">
            <div className="h-4.5 bg-zinc-900 rounded-none w-2/3 animate-pulse"></div>
            <div className="h-3.5 bg-zinc-900 rounded-none w-1/2 animate-pulse"></div>
          </div>
          <div className="w-16 h-16 bg-zinc-900 rounded-none animate-pulse ml-5"></div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex-1 min-w-0 pr-5 space-y-2">
          {/* Clean track detail */}
          <h3 className="text-xs font-semibold text-zinc-900 dark:text-white tracking-wide truncate font-satoshi group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-200">
            {songName}
          </h3>
          <p className="text-xs font-light text-zinc-500 dark:text-zinc-400 truncate leading-relaxed flex items-center gap-1.5 flex-wrap font-satoshi">
            <span>by <span className="font-normal text-zinc-700 dark:text-zinc-300">{artistName}</span></span>
            <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-650 dark:group-hover:text-zinc-400 transition-colors inline-block shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            {albumName && <span className="text-zinc-300 dark:text-zinc-700 font-mono text-[9px]">•</span>}
            <span className="text-zinc-400 dark:text-zinc-450 truncate">{albumName}</span>
          </p>
        </div>

        {/* Medium album cover */}
        <div className="w-16 h-16 rounded-none overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 flex items-center justify-center ml-4 flex-shrink-0 relative shadow-inner">
          {albumArtUrl ? (
            <img 
              src={albumArtUrl} 
              alt={`${albumName || songName} cover art`}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          ) : (
            <svg className="w-7 h-7 text-zinc-400 dark:text-zinc-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className={`group p-5 rounded-none border relative overflow-hidden w-full transition-all duration-300 ${
        isDarkMode 
          ? "bg-[#0f1115]/30 border-zinc-900/80 shadow-sm" 
          : "bg-white border-zinc-200 shadow-sm"
      } ${!loading ? 'cursor-pointer' : ''}`}
      onClick={!loading ? () => window.open(spotifyUrl, '_blank') : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.01,
      }}
      whileTap={!loading ? { scale: 0.995 } : undefined}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, var(--spotlight-color), transparent 80%)`
          }}
        />
      )}
      {renderContent()}
    </motion.div>
  );
}

const LazySpotifyCardContent = React.lazy(() => Promise.resolve({ default: SpotifyCardContent }));

interface SpotifyProps {
  isDarkMode: boolean;
}

export const Spotify: React.FC<SpotifyProps> = ({ isDarkMode }) => {
  return (
    <SpotifyErrorBoundary>
      <Suspense fallback={
        <div className={`flex items-center justify-between p-5 border rounded-none h-[92px] ${
          isDarkMode 
            ? "bg-zinc-950/20 border-zinc-900" 
            : "bg-white border-zinc-200"
        }`}>
          <div className="space-y-2.5 flex-1 animate-pulse">
            <div className={`h-4.5 rounded-none w-2/3 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}></div>
            <div className={`h-3.5 rounded-none w-1/2 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}></div>
          </div>
          <div className={`w-16 h-16 rounded-none ml-5 animate-pulse ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}></div>
        </div>
      }>
        <LazySpotifyCardContent isDarkMode={isDarkMode} />
      </Suspense>
    </SpotifyErrorBoundary>
  );
};
