import React, { useEffect, useState } from "react";
import meData from "../data/me.json";
import { steamService, SteamProfile, SteamGameInfo } from "../lib/steam";
import { letterboxdService, LetterboxdFilm } from "../lib/letterboxd";
import { Matrix } from "./matrix";

interface MeProps {
  isDarkMode: boolean;
}

const SteamLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
  </svg>
);

const LetterboxdLogo = () => (
  <div className="flex items-center gap-0.5 shrink-0">
    <span className="w-2.5 h-2.5 rounded-full bg-[#ff8000] inline-block"></span>
    <span className="w-2.5 h-2.5 rounded-full bg-[#00e054] inline-block -ml-1"></span>
    <span className="w-2.5 h-2.5 rounded-full bg-[#00c0f4] inline-block -ml-1"></span>
  </div>
);

export const Me: React.FC<MeProps> = ({ isDarkMode }) => {
  const { steam: staticSteam, letterboxd: staticLetterboxd } = meData;
  
  // Steam state
  const [steamProfile, setSteamProfile] = useState<SteamProfile | null>(null);
  const [steamGames, setSteamGames] = useState<SteamGameInfo[]>([]);
  const [steamLoading, setSteamLoading] = useState(true);
  
  // Letterboxd state
  const [letterboxdFilms, setLetterboxdFilms] = useState<LetterboxdFilm[]>([]);
  const [letterboxdLoading, setLetterboxdLoading] = useState(true);

  // Fetch Steam data
  useEffect(() => {
    const fetchSteamData = async () => {
      try {
        setSteamLoading(true);
        const [profile, games] = await Promise.all([
          steamService.getPlayerSummary(),
          steamService.getRecentlyPlayedGames(5)
        ]);
        if (profile) setSteamProfile(profile);
        if (games.length > 0) setSteamGames(games);
      } catch (error) {
        console.error('Failed to fetch Steam data:', error);
      } finally {
        setSteamLoading(false);
      }
    };
    fetchSteamData();
    const interval = setInterval(fetchSteamData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Fetch Letterboxd data
  useEffect(() => {
    const fetchLetterboxdData = async () => {
      try {
        setLetterboxdLoading(true);
        const films = await letterboxdService.getRecentFilms(4);
        if (films.length > 0) setLetterboxdFilms(films);
      } catch (error) {
        console.error('Failed to fetch Letterboxd data:', error);
      } finally {
        setLetterboxdLoading(false);
      }
    };
    fetchLetterboxdData();
  }, []);

  // Use live data or fallback to static
  const steam = {
    username: steamProfile?.username || staticSteam.username,
    profileUrl: steamProfile?.profileUrl || staticSteam.profileUrl,
    status: steamProfile?.status || staticSteam.status,
    avatarText: staticSteam.avatarText,
    avatar: steamProfile?.avatar,
    isOnline: steamProfile?.isOnline ?? true,
    isInGame: steamProfile?.isInGame ?? false,
  };

  const games = steamGames.length > 0 
    ? steamGames.map(g => ({
        name: g.name,
        hours: g.hoursPlayed,
        status: g.isCurrentlyPlaying ? 'in-game' : 'offline',
        lastPlayed: g.hoursRecent ? `${g.hoursRecent} recently` : 'a while ago',
        iconUrl: g.iconUrl,
      }))
    : staticSteam.recentlyPlayed.map(g => ({ ...g, iconUrl: undefined }));

  const letterboxd = {
    username: letterboxdService.getUsername() || staticLetterboxd.username,
    profileUrl: letterboxdService.getProfileUrl() || staticLetterboxd.profileUrl,
  };

  const films = letterboxdFilms.length > 0
    ? letterboxdFilms.map(f => ({
        title: f.title,
        rating: f.rating || 0,
        year: f.year,
        review: f.review || '',
        posterUrl: f.posterUrl,
        filmUrl: f.filmUrl,
      }))
    : staticLetterboxd.recentlyWatched.map(f => ({ ...f, posterUrl: undefined, filmUrl: undefined }));

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          despite everything, it's still you.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Minimal Steam Card */}
        <a
          href={steam.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
        >
          {/* Header with profile */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <SteamLogo />
              {steam.avatar ? (
                <img 
                  src={steam.avatar} 
                  alt={steam.username}
                  className="w-6 h-6 rounded-sm"
                />
              ) : (
                <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-sm flex items-center justify-center font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
                  {steam.avatarText}
                </div>
              )}
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200 font-satoshi">{steam.username}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${steam.isInGame ? 'bg-green-500' : steam.isOnline ? 'bg-blue-400' : 'bg-zinc-400'}`}></span>
              <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400">{steam.status}</span>
            </div>
          </div>

          {/* Recently Played */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">recently played</span>
            {steamLoading ? (
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 animate-pulse">
                    <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {games.slice(0, 3).map((game) => (
                  <div key={game.name} className="flex items-center gap-2 group/game">
                    {game.iconUrl ? (
                      <img 
                        src={game.iconUrl} 
                        alt={game.name}
                        className="w-6 h-6 rounded-sm bg-zinc-200 dark:bg-zinc-800"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-sm flex items-center justify-center text-[10px]">🎮</div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200 truncate font-satoshi">{game.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </a>

        {/* Minimal Letterboxd Card */}
        <a
          href={letterboxd.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <LetterboxdLogo />
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">letterboxd</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">@{letterboxd.username}</span>
          </div>

          {/* Last Watched */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">last watched</span>
            {letterboxdLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
              </div>
            ) : films[0] ? (
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 font-satoshi">{films[0].title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{films[0].year}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: Math.floor(films[0].rating) }).map((_, i) => (
                      <span key={i} className="text-xs text-orange-400">★</span>
                    ))}
                    {films[0].rating % 1 !== 0 && <span className="text-xs text-orange-400">½</span>}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">no recent films</p>
            )}
          </div>
        </a>

        {/* Pikachu Matrix */}
        <div className="pt-4">
          <Matrix isDarkMode={isDarkMode} />
        </div>

      </div>
    </div>
  );
};
