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

export interface LastFmTopTracksResponse {
  toptracks: {
    track: Array<{
      name: string;
      playcount: string;
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
    }>;
    '@attr': {
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface LastFmNowPlayingResponse {
  recenttracks: {
    track: Array<{
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
      '@attr'?: {
        nowplaying: string;
      };
    }>;
  };
}

// Normalized track interface for our app
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
    this.apiKey = import.meta.env.VITE_LASTFM_API_KEY || '';
    this.username = import.meta.env.VITE_LASTFM_USERNAME || '';
  }

  // Clean up track names by removing parentheses and extra info
  private cleanTrackName(name: string): string {
    if (!name) return name;
    
    // Remove content in parentheses and brackets
    let cleaned = name
      .replace(/\([^)]*\)/g, '') // Remove (feat. Artist), (Remix), etc.
      .replace(/\[[^\]]*\]/g, '') // Remove [Explicit], [Radio Edit], etc.
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing spaces
    
    return cleaned;
  }

  // Clean up artist names
  private cleanArtistName(name: string): string {
    if (!name) return name;
    
    // Remove content in parentheses and brackets
    let cleaned = name
      .replace(/\([^)]*\)/g, '') // Remove (feat. Artist), etc.
      .replace(/\[[^\]]*\]/g, '') // Remove [Explicit], etc.
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing spaces
    
    return cleaned;
  }

  // Clean up album names
  private cleanAlbumName(name: string): string {
    if (!name) return name;
    
    // Remove content in parentheses and brackets
    let cleaned = name
      .replace(/\([^)]*\)/g, '') // Remove (feat. Artist), etc.
      .replace(/\[[^\]]*\]/g, '') // Remove [Expanded Edition], etc.
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing spaces
    
    return cleaned;
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

      const tracks = data.recenttracks.track || [];
      
      if (tracks.length === 0) {
        return [{
          id: 'fallback-1',
          name: 'No recent tracks found',
          artist: 'Check your Last.fm username',
          album: 'or API key configuration',
          albumArtUrl: '',
          url: '',
          isPlaying: false
        }];
      }
      
      return tracks.map((track: any, index: number) => {
        // Handle both single track and array of tracks
        const trackData = Array.isArray(track) ? track[0] : track;
        
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

  async getTopTracks(period: '7day' | '1month' | '3month' | '6month' | '12month' | 'overall' = '7day', limit: number = 10): Promise<MusicTrack[]> {
    try {
      if (!this.username) {
        throw new Error('Last.fm username not configured');
      }

      const data = await this.makeRequest('user.gettoptracks', {
        user: this.username,
        period,
        limit: limit.toString()
      });

      const tracks = data.toptracks.track || [];
      
      return tracks.map((track: any, index: number) => ({
        id: `top-${index}`,
        name: this.cleanTrackName(track.name),
        artist: this.cleanArtistName(track.artist.name),
        album: this.cleanAlbumName(track.album?.name),
        albumArtUrl: track.album?.image?.[2]?.['#text'] || track.album?.image?.[1]?.['#text'],
        url: track.url,
        playCount: parseInt(track.playcount)
      }));
    } catch (error) {
      return [];
    }
  }

  async searchTracks(query: string, limit: number = 10): Promise<MusicTrack[]> {
    try {
      const data = await this.makeRequest('track.search', {
        track: query,
        limit: limit.toString()
      });

      const tracks = data.results.trackmatches.track || [];
      
      return tracks.map((track: any, index: number) => ({
        id: track.mbid || `search-${index}`,
        name: this.cleanTrackName(track.name),
        artist: this.cleanArtistName(track.artist),
        albumArtUrl: track.image?.[2]?.['#text'] || track.image?.[1]?.['#text'],
        url: track.url
      }));
    } catch (error) {
      return [];
    }
  }

  async getArtistTopTracks(artist: string, limit: number = 10): Promise<MusicTrack[]> {
    try {
      const data = await this.makeRequest('artist.gettoptracks', {
        artist,
        limit: limit.toString()
      });

      const tracks = data.toptracks.track || [];
      
      return tracks.map((track: any, index: number) => ({
        id: track.mbid || `artist-${index}`,
        name: this.cleanTrackName(track.name),
        artist: this.cleanArtistName(track.artist.name),
        albumArtUrl: track.image?.[2]?.['#text'] || track.image?.[1]?.['#text'],
        url: track.url,
        playCount: parseInt(track.playcount)
      }));
    } catch (error) {
      return [];
    }
  }

  async getWeeklyChart(limit: number = 10): Promise<MusicTrack[]> {
    try {
      if (!this.username) {
        throw new Error('Last.fm username not configured');
      }

      const data = await this.makeRequest('user.getweeklytrackchart', {
        user: this.username,
        limit: limit.toString()
      });

      const tracks = data.weeklytrackchart.track || [];
      
      return tracks.map((track: any, index: number) => ({
        id: track.mbid || `weekly-${index}`,
        name: this.cleanTrackName(track.name),
        artist: this.cleanArtistName(track.artist['#text']),
        album: track.album?.['#text'],
        albumArtUrl: track.image?.[2]?.['#text'] || track.image?.[1]?.['#text'],
        url: track.url,
        playCount: parseInt(track.playcount)
      }));
    } catch (error) {
      return [];
    }
  }
}

export const lastFmService = new LastFmService(); 