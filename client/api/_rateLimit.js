const hits = new Map();

/** Best-effort limit. Counts are per serverless instance, so this only slows simple abuse. */
export function isRateLimited(req, max = 5, windowMs = 10 * 60 * 1000) {
  const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}
