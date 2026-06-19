// Types for Steam API responses
export interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks?: number; // minutes
  playtime_forever: number; // minutes
  img_icon_url: string;
  img_logo_url?: string;
}

export interface SteamRecentGamesResponse {
  response: {
    total_count: number;
    games: SteamGame[];
  };
}

export interface SteamPlayerSummary {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number; // 0=Offline, 1=Online, 2=Busy, 3=Away, 4=Snooze, 5=looking to trade, 6=looking to play
  gameextrainfo?: string; // If currently in-game, this is the game name
  gameid?: string;
}

export interface SteamPlayerSummaryResponse {
  response: {
    players: SteamPlayerSummary[];
  };
}

export interface SteamProfile {
  username: string;
  profileUrl: string;
  avatar: string;
  status: string;
  isOnline: boolean;
  isInGame: boolean;
  currentGame?: string;
}

export interface SteamGameInfo {
  id: number;
  name: string;
  hoursPlayed: string;
  hoursRecent?: string;
  iconUrl: string;
  isCurrentlyPlaying: boolean;
}

class SteamService {
  private apiKey: string;
  private steamId: string;
  private isDev: boolean;

  constructor() {
    this.apiKey = import.meta.env.VITE_STEAM_API_KEY || '';
    this.steamId = import.meta.env.VITE_STEAM_ID || '';
    this.isDev = import.meta.env.DEV;
  }

  private getCache<T>(key: string, ttlMs: number): T | null {
    if (typeof window === 'undefined' || !window.sessionStorage) return null;
    try {
      const cached = sessionStorage.getItem(key);
      if (!cached) return null;
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < ttlMs) {
        return parsed.data as T;
      }
      sessionStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to read from cache:', e);
    }
    return null;
  }

  private setCache<T>(key: string, data: T): void {
    if (typeof window === 'undefined' || !window.sessionStorage) return;
    try {
      sessionStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('Failed to write to cache:', e);
    }
  }

  private formatPlaytime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    if (hours < 1) return `${minutes} mins`;
    return `${hours} hrs`;
  }

  private getStatusText(state: number, gameInfo?: string): string {
    if (gameInfo) return `playing ${gameInfo}`;
    switch (state) {
      case 0: return 'offline';
      case 1: return 'online';
      case 2: return 'busy';
      case 3: return 'away';
      case 4: return 'snooze';
      case 5: return 'looking to trade';
      case 6: return 'looking to play';
      default: return 'offline';
    }
  }

  async getPlayerSummary(): Promise<SteamProfile | null> {
    if (!this.apiKey || !this.steamId) {
      console.warn('Steam API key or Steam ID not configured');
      return null;
    }

    const cacheKey = `steam_profile_${this.steamId}`;
    const cached = this.getCache<SteamProfile>(cacheKey, 21600000); // 6 hours TTL
    if (cached) return cached;

    try {
      let url: string;
      if (this.isDev) {
        // Local dev - use vite proxy
        url = `/proxy/steam/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${this.steamId}`;
      } else {
        // Production - use serverless function
        url = `/api/steam/player?steamid=${this.steamId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Steam API error: ${response.status}`);
      }

      const data: SteamPlayerSummaryResponse = await response.json();
      const player = data.response.players[0];

      if (!player) return null;

      const profile: SteamProfile = {
        username: player.personaname,
        profileUrl: player.profileurl,
        avatar: player.avatarmedium,
        status: this.getStatusText(player.personastate, player.gameextrainfo),
        isOnline: player.personastate > 0,
        isInGame: !!player.gameextrainfo,
        currentGame: player.gameextrainfo,
      };

      this.setCache(cacheKey, profile);
      return profile;
    } catch (error) {
      console.error('Failed to fetch Steam profile:', error);
      return null;
    }
  }

  async getRecentlyPlayedGames(count: number = 5): Promise<SteamGameInfo[]> {
    if (!this.apiKey || !this.steamId) {
      console.warn('Steam API key or Steam ID not configured');
      return [];
    }

    const cacheKey = `steam_recent_games_${this.steamId}_${count}`;
    const cached = this.getCache<SteamGameInfo[]>(cacheKey, 21600000); // 6 hours TTL
    if (cached) return cached;

    try {
      let url: string;
      if (this.isDev) {
        // Local dev - use vite proxy
        url = `/proxy/steam/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.apiKey}&steamid=${this.steamId}&count=${count}&format=json`;
      } else {
        // Production - use serverless function
        url = `/api/steam/games?steamid=${this.steamId}&count=${count}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Steam API error: ${response.status}`);
      }

      const data: SteamRecentGamesResponse = await response.json();
      const profile = await this.getPlayerSummary();

      const games = (data.response.games || []).map((game) => ({
        id: game.appid,
        name: game.name,
        hoursPlayed: this.formatPlaytime(game.playtime_forever),
        hoursRecent: game.playtime_2weeks 
          ? this.formatPlaytime(game.playtime_2weeks) 
          : undefined,
        iconUrl: game.img_icon_url 
          ? `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
          : `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`,
        isCurrentlyPlaying: profile?.currentGame?.toLowerCase() === game.name.toLowerCase(),
      }));

      this.setCache(cacheKey, games);
      return games;
    } catch (error) {
      console.error('Failed to fetch Steam games:', error);
      return [];
    }
  }
}

export const steamService = new SteamService();
