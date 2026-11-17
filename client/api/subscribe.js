import { isRateLimited } from './_rateLimit.js';

// Public values, already in the client bundle. Row-level security limits this key to inserts.
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ijawxlndyslanklfigua.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_c9ctVWF2DVLv-IHApNV9nA_FWp-VKOt';
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Hidden field filled in: treat as a bot, and give it nothing to learn from.
  if (body.website) return res.status(200).json({ ok: true });

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_newsletter_subscribers`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email }),
    });

    // 409 means this email is already subscribed. Report success so nobody can test who is on the list.
    if (response.ok || response.status === 409) return res.status(200).json({ ok: true });

    console.error('Newsletter: Supabase returned', response.status, await response.text());
    return res.status(502).json({ error: 'Could not subscribe.' });
  } catch (error) {
    console.error('Newsletter: request failed', error);
    return res.status(502).json({ error: 'Could not subscribe.' });
  }
}
