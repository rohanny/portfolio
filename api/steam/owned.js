export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600');
  
  const { steamid } = req.query;
  const apiKey = process.env.STEAM_API_KEY;

  if (!apiKey || !steamid) {
    return res.status(400).json({ error: 'Missing Steam API key or Steam ID' });
  }

  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamid}&include_appinfo=true&include_played_free_games=true&format=json`
    );

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Steam owned games API error:', error);
    return res.status(500).json({ error: 'Failed to fetch Steam owned games' });
  }
}
