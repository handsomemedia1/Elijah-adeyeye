// Builds the default social-share card (1200x630). Run with `node scripts/generate-og.mjs` after changing it.
import fs from 'node:fs';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const photoSize = 300;

const background = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#63D2AA" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#63D2AA" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="10%" cy="95%" r="55%">
      <stop offset="0%" stop-color="#3B9EFF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#3B9EFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" x2="1">
      <stop offset="0%" stop-color="#63D2AA"/>
      <stop offset="100%" stop-color="#3B9EFF"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.04"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#060A13"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#g1)"/>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <circle cx="${W - 90 - photoSize / 2}" cy="${H / 2}" r="${photoSize / 2 + 8}" fill="none" stroke="url(#accent)" stroke-width="4"/>
  <text x="80" y="120" font-family="Consolas, 'Cascadia Mono', monospace" font-size="22" letter-spacing="4" fill="#63D2AA">ELIJAHADEYEYE.VERCEL.APP</text>
  <text x="80" y="250" font-family="'Segoe UI', Arial, sans-serif" font-size="84" font-weight="800" fill="#F0F2F5" letter-spacing="-2">Elijah Adeyeye</text>
  <text x="80" y="330" font-family="'Segoe UI', Arial, sans-serif" font-size="38" font-weight="600" fill="url(#accent)">AI, Behavioural &amp; Cybersecurity</text>
  <text x="80" y="380" font-family="'Segoe UI', Arial, sans-serif" font-size="38" font-weight="600" fill="url(#accent)">Researcher</text>
  <rect x="80" y="440" width="120" height="4" rx="2" fill="url(#accent)"/>
  <text x="80" y="510" font-family="'Segoe UI', Arial, sans-serif" font-size="28" fill="#A0AEC0">Founder &amp; CEO, Elitech Hub  ·  Creator of NumIntel</text>
</svg>`;

const mask = Buffer.from(`<svg width="${photoSize}" height="${photoSize}"><circle cx="${photoSize / 2}" cy="${photoSize / 2}" r="${photoSize / 2}" fill="#fff"/></svg>`);
const photo = await sharp('public/assets/images/profile/profile.jpg')
  .resize(photoSize, photoSize, { fit: 'cover', position: 'top' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

fs.mkdirSync('public/og', { recursive: true });
await sharp(Buffer.from(background))
  .composite([{ input: photo, left: W - 90 - photoSize, top: (H - photoSize) / 2 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og/default.png');
console.log('wrote public/og/default.png', fs.statSync('public/og/default.png').size, 'bytes');
