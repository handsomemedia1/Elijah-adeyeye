// Vercel serverless function for Numverify API integration
// Usage: GET /api/lookup?phone=2348031234567

export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // TODO: Add Numverify API key here when available
  const NUMVERIFY_API_KEY = process.env.NUMVERIFY_API_KEY;

  if (!NUMVERIFY_API_KEY) {
    // Return an honest error indicating the service is unavailable
    return res.status(503).json({ error: 'Phone verification service is currently unavailable. Please try again later.' });
  }

  try {
    const url = `https://apilayer.net/api/validate?access_key=${NUMVERIFY_API_KEY}&number=${encodeURIComponent(phone)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.info });
    }

    // Cache the result in Supabase here if needed (omitted for brevity)

    res.status(200).json(data);
  } catch (error) {
    console.error('Lookup API error:', error);
    res.status(500).json({ error: 'Failed to lookup phone number' });
  }
}
