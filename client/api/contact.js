import { isRateLimited } from './_rateLimit.js';

const TO_EMAIL = 'elijahadeyeye@proton.me';
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const clean = (value, maxLength) =>
  typeof value === 'string' && value.trim().length <= maxLength ? value.trim() : '';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Hidden field filled in: treat as a bot, and give it nothing to learn from.
  if (body.website) return res.status(200).json({ ok: true });

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  const name = clean(body.name, 100).replace(/\s+/g, ' ');
  const email = clean(body.email, 254);
  const subject = clean(body.subject, 40).replace(/\s+/g, ' ') || 'General';
  const message = clean(body.message, 5000);

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please provide your name, a valid email and a message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Contact form: RESEND_API_KEY or RESEND_FROM_EMAIL is not set');
    return res.status(503).json({ error: 'Email is not configured.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error('Contact form: Resend returned', response.status, await response.text());
      return res.status(502).json({ error: 'The message could not be sent.' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form: request failed', error);
    return res.status(502).json({ error: 'The message could not be sent.' });
  }
}
