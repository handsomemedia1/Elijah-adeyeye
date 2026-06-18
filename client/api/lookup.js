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
    // For now, return a placeholder response since we are using local parsing
    return res.status(200).json({
      valid: true,
      number: phone,
      local_format: '',
      international_format: '',
      country_prefix: '',
      country_code: '',
      country_name: '',
      location: '',
      carrier: '',
      line_type: ''
    });
  }

  try {
    const url = `http://apilayer.net/api/validate?access_key=${NUMVERIFY_API_KEY}&number=${encodeURIComponent(phone)}`;
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
