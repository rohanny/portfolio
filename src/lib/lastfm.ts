// Types for Last.fm API responses
export interface LastFmTrack {
  id: string;
  name: string;
  artist: {
    name: string;
  };
  album?: {
    name: string;
    image: Array<{
      size: string;
      '#text': string;
    }>;
  };
  url: string;
  date?: {
    uts: string;
    '#text': string;
  };
}

export interface LastFmRecentTracksResponse {
  recenttracks: {
    track: LastFmTrack[];
    '@attr': {
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  albumArtUrl?: string;
  url: string;
  isPlaying?: boolean;
  playedAt?: string;
  playCount?: number;
}

class LastFmService {
  private apiKey: string;
  private username: string;
  private baseUrl = 'https://ws.audioscrobbler.com/2.0/';

  constructor() {
    // Read from Vite env variables
    this.apiKey = import.meta.env.VITE_LASTFM_API_KEY || '';
    this.username = import.meta.env.VITE_LASTFM_USERNAME || '';
  }

  private cleanTrackName(name: string): string {
    if (!name) return name;
    return name
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanArtistName(name: string): string {
    if (!name) return name;
    return name
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanAlbumName(name: string): string {
    if (!name) return name;
    return name
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private async makeRequest(method: string, params: Record<string, string> = {}): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Last.fm API key not configured');
    }

    const searchParams = new URLSearchParams({
      method,
      api_key: this.apiKey,
      format: 'json',
      ...params
    });

    const response = await fetch(`${this.baseUrl}?${searchParams}`);
    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status}`);
    }

    return response.json();
  }

  async getRecentTracks(limit: number = 10): Promise<MusicTrack[]> {
    try {
      if (!this.username) {
        throw new Error('Last.fm username not configured');
      }

      const data = await this.makeRequest('user.getrecenttracks', {
        user: this.username,
        limit: limit.toString()
      });

      const tracks = data.recenttracks?.track || [];
      if (tracks.length === 0) {
        return [];
      }

      return tracks.map((trackData: any, index: number) => {
        return {
          id: trackData.mbid || `track-${index}`,
          name: this.cleanTrackName(trackData.name),
          artist: this.cleanArtistName(trackData.artist['#text'] || trackData.artist.name),
          album: this.cleanAlbumName(trackData.album?.['#text'] || trackData.album?.name),
          albumArtUrl: trackData.image?.[2]?.['#text'] || trackData.image?.[1]?.['#text'],
          url: trackData.url,
          isPlaying: !trackData.date || trackData['@attr']?.nowplaying === 'true',
          playedAt: trackData.date?.['#text']
        };
      });
    } catch (error) {
      return [];
    }
  }

  async getNowPlaying(): Promise<MusicTrack | null> {
    try {
      const recentTracks = await this.getRecentTracks(1);
      const nowPlaying = recentTracks.find(track => track.isPlaying);
      return nowPlaying || null;
    } catch (error) {
      return null;
    }
  }
}

export const lastFmService = new LastFmService();
