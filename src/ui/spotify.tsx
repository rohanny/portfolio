import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { lastFmService, MusicTrack } from '../lib/lastfm';
import React, { Suspense } from 'react';

// Error Boundary for Spotify Card
class SpotifyErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_error: any, _info: any) {
    // Optionally log error
    // console.error('Spotify Card Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full text-xs text-red-500">
          Failed to load Spotify card.
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentTrack = await lastFmService.getNowPlaying();
        setNowPlaying(currentTrack);
        const recentTracksData = await lastFmService.getRecentTracks(5);
        setRecentTracks(recentTracksData);
      } catch (err) {
        setError('Failed to load music data');
      } finally {
        setLoading(false);
      }
    };
    fetchMusicData();
    const interval = setInterval(fetchMusicData, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayTrack = nowPlaying || recentTracks[0];
  const isPlaying = nowPlaying !== null;
  const songName = displayTrack?.name || "No track playing";
  const artistName = displayTrack?.artist || "Unknown Artist";
  const albumName = displayTrack?.album || "Unknown Album";
  const albumArtUrl = displayTrack?.albumArtUrl;

  const formatPlayedTime = (playedAt: string | undefined) => {
    if (!playedAt) return '';
    try {
      const date = new Date(playedAt);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    } catch {
      return '';
    }
  };
  const playedTime = formatPlayedTime(displayTrack?.playedAt);
  const createSpotifyUrl = (trackName: string, artistName: string) => {
    const searchQuery = encodeURIComponent(`${trackName} ${artistName}`);
    return `https://open.spotify.com/search/${searchQuery}`;
  };
  const spotifyUrl = displayTrack ? createSpotifyUrl(songName, artistName) : '#';

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="relative z-10 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <svg className={`w-3 h-3 ${
                  isDarkMode ? "text-zinc-400" : "text-amber-200"
                }`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className={`text-xs font-light ${
                  isDarkMode ? "text-zinc-400" : "text-amber-200"
                }`}>
                  Loading...
                </span>
              </div>
              <div className={`text-sm font-semibold mb-1 ${
                isDarkMode ? "text-white" : "text-stone-900"
              }`}>
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded w-32"></div>
              </div>
              <div className={`text-xs font-light ${
                isDarkMode ? "text-zinc-400" : "text-stone-700"
              }`}>
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-3 rounded w-24"></div>
              </div>
            </div>
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ml-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="relative z-10 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <svg className={`w-3 h-3 ${
                  isDarkMode ? "text-zinc-400" : "text-stone-700"
                }`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className={`text-xs font-light ${
                  isDarkMode ? "text-zinc-400" : "text-stone-700"
                }`}>
                  Last.fm
                </span>
              </div>
              <div className={`text-sm font-semibold mb-1 ${
                isDarkMode ? "text-white" : "text-stone-900"
              }`}>
                {error}
              </div>
              <div className={`text-xs font-light ${
                isDarkMode ? "text-zinc-400" : "text-stone-700"
              }`}>
                Check your connection
              </div>
            </div>
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center ml-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      );
    }
    // Main content
    return (
      <div className="relative z-10 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Song Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className={`w-3 h-3 ${
                isDarkMode ? "text-zinc-400" : "text-stone-700"
              }`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className={`text-xs font-light ${
                isDarkMode ? "text-zinc-400" : "text-stone-700"
              }`}>
                {isPlaying ? "Now Playing" : "Recently Played"}
              </span>
            </div>
            <div className={`text-sm font-semibold mb-1 ${
              isDarkMode ? "text-white" : "text-stone-900"
            }`}>
              {songName}
            </div>
            <div className={`text-xs font-light ${
              isDarkMode ? "text-zinc-400" : "text-stone-700"
            }`}>
              {artistName} {albumName && `• ${albumName}`}
              {!isPlaying && playedTime && (
                <span className="ml-2 opacity-75">• {playedTime}</span>
              )}
            </div>
          </div>
          {/* Album Art */}
          <motion.div 
            className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ml-3"
            whileHover={{ 
              borderRadius: "50%",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {albumArtUrl ? (
              <motion.img 
                src={albumArtUrl} 
                alt={`${albumName || songName} album art`}
                className="w-full h-full object-cover"
                whileHover={{ 
                  rotate: 360,
                  transition: { 
                    rotate: { 
                      duration: 3, 
                      ease: "linear", 
                      repeat: Infinity 
                    }
                  }
                }}
              />
            ) : (
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            )}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-lg border backdrop-blur-md shadow-lg relative overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${
      isDarkMode 
        ? "bg-zinc-800/20 border-zinc-500/40 shadow-zinc-900/20" 
        : "bg-amber-900/20 border-amber-700/10 shadow-amber-900/20"
    } ${!loading && !error ? 'cursor-pointer' : ''}`}
      onClick={!loading && !error ? () => window.open(spotifyUrl, '_blank') : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00000008] to-[#f9f9f900]" />
      {renderContent()}
    </div>
  );
}

// Lazy load the SpotifyCardContent
const LazySpotifyCardContent = React.lazy(() => Promise.resolve({ default: SpotifyCardContent }));

const MusicCard = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <SpotifyErrorBoundary>
    <Suspense fallback={<div className="flex items-center justify-center h-24 text-xs text-gray-400">Loading music...</div>}>
      <LazySpotifyCardContent isDarkMode={isDarkMode} />
    </Suspense>
  </SpotifyErrorBoundary>
);

export default MusicCard; 