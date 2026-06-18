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

      return {
        username: player.personaname,
        profileUrl: player.profileurl,
        avatar: player.avatarmedium,
        status: this.getStatusText(player.personastate, player.gameextrainfo),
        isOnline: player.personastate > 0,
        isInGame: !!player.gameextrainfo,
        currentGame: player.gameextrainfo,
      };
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

      return (data.response.games || []).map((game) => ({
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
    } catch (error) {
      console.error('Failed to fetch Steam games:', error);
      return [];
    }
  }
}

export const steamService = new SteamService();
