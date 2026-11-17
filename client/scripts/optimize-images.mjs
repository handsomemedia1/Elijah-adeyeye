// One-off: converts the hero background PNGs to WebP. Run with `node scripts/optimize-images.mjs`.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'public/assets/images/backgrounds';
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
  const out = path.join(dir, file.replace(/\.png$/, '.webp'));
  await sharp(path.join(dir, file)).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
  console.log(`${file}: ${fs.statSync(path.join(dir, file)).size} -> ${fs.statSync(out).size} bytes`);
}
