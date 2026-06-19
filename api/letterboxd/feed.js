export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600');
  
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Missing Letterboxd username' });
  }

  try {
    const response = await fetch(`https://letterboxd.com/${username}/rss/`);

    if (!response.ok) {
      throw new Error(`Letterboxd RSS error: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Return as text/xml so the client can parse it
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(xmlText);
  } catch (error) {
    console.error('Letterboxd RSS error:', error);
    return res.status(500).json({ error: 'Failed to fetch Letterboxd feed' });
  }
}
