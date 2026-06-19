// Letterboxd doesn't have a public API, so we use the RSS feed
// Note: RSS parsing requires a CORS proxy for client-side

export interface LetterboxdFilm {
  title: string;
  year: string;
  rating: number | null;
  review?: string;
  watchedDate: string;
  filmUrl: string;
  posterUrl?: string;
}

export interface LetterboxdProfile {
  username: string;
  profileUrl: string;
}

class LetterboxdService {
  private username: string;
  private isDev: boolean;

  constructor() {
    this.username = import.meta.env.VITE_LETTERBOXD_USERNAME || '';
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

  private parseRating(description: string): number | null {
    // Letterboxd RSS uses star rating like "★★★★" or "★★★½"
    const starMatch = description.match(/★+½?/);
    if (!starMatch) return null;

    const stars = starMatch[0];
    const fullStars = (stars.match(/★/g) || []).length;
    const hasHalf = stars.includes('½');
    
    return fullStars + (hasHalf ? 0.5 : 0);
  }

  private extractYear(title: string): { cleanTitle: string; year: string } {
    // RSS title format: "Film Name, 2024"
    const match = title.match(/^(.+),\s*(\d{4})$/);
    if (match) {
      return { cleanTitle: match[1].trim(), year: match[2] };
    }
    return { cleanTitle: title, year: '' };
  }

  private extractPoster(description: string): string | undefined {
    // Try to extract poster image from description
    const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : undefined;
  }

  private extractReview(description: string): string | undefined {
    // Extract review text from description (after the rating)
    // Remove HTML tags and get clean text
    const cleanDesc = description
      .replace(/<[^>]+>/g, ' ')
      .replace(/★+½?/g, '')
      .replace(/Watched on .+/g, '')
      .trim();
    
    return cleanDesc.length > 10 ? cleanDesc : undefined;
  }

  async getRecentFilms(count: number = 5): Promise<LetterboxdFilm[]> {
    if (!this.username) {
      console.warn('Letterboxd username not configured');
      return [];
    }

    const cacheKey = `letterboxd_films_${this.username}_${count}`;
    const cached = this.getCache<LetterboxdFilm[]>(cacheKey, 21600000); // 6 hours TTL
    if (cached) return cached;

    try {
      let url: string;
      if (this.isDev) {
        // Local dev - use vite proxy
        url = `/proxy/letterboxd/${this.username}/rss/`;
      } else {
        // Production - use serverless function
        url = `/api/letterboxd/feed?username=${this.username}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Letterboxd RSS error: ${response.status}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const items = xmlDoc.querySelectorAll('item');
      const films: LetterboxdFilm[] = [];

      items.forEach((item, index) => {
        if (index >= count) return;

        const titleEl = item.querySelector('title');
        const linkEl = item.querySelector('link');
        const descEl = item.querySelector('description');
        const pubDateEl = item.querySelector('pubDate');

        if (!titleEl?.textContent) return;

        const { cleanTitle, year } = this.extractYear(titleEl.textContent);
        const description = descEl?.textContent || '';

        films.push({
          title: cleanTitle.toLowerCase(),
          year,
          rating: this.parseRating(description),
          review: this.extractReview(description),
          watchedDate: pubDateEl?.textContent || '',
          filmUrl: linkEl?.textContent || `https://letterboxd.com/${this.username}/`,
          posterUrl: this.extractPoster(description),
        });
      });

      this.setCache(cacheKey, films);
      return films;
    } catch (error) {
      console.error('Failed to fetch Letterboxd films:', error);
      return [];
    }
  }

  getProfileUrl(): string {
    return `https://letterboxd.com/${this.username}/`;
  }

  getUsername(): string {
    return this.username;
  }
}

export const letterboxdService = new LetterboxdService();
