import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const searchParams = url.searchParams;
  const method = searchParams.get('method') || 'user.getrecenttracks';
  const limit = searchParams.get('limit') || '5';
  
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const username = import.meta.env.VITE_LASTFM_USERNAME;
  
  if (!apiKey || !username) {
    return new Response(JSON.stringify({ 
      error: 'LastFM API credentials not configured' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const params = new URLSearchParams({
      method,
      api_key: apiKey,
      format: 'json',
      user: username,
      limit
    });

    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`);
    
    if (!response.ok) {
      throw new Error(`LastFM API error: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('LastFM API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch LastFM data' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 