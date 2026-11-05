/**
 * prerender.mjs - Build-time static HTML generation for Elijah Adeyeye Portfolio
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Supabase for build-time fetching
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ijawxlndyslanklfigua.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_c9ctVWF2DVLv-IHApNV9nA_FWp-VKOt';
const supabase = createClient(supabaseUrl, supabaseKey);

// All static routes to prerender. Admin routes are intentionally excluded (noindex).
const ROUTES_TO_PRERENDER = [
  '/',
  '/about',
  '/research',
  '/research/ai-evaluation',
  '/research/human-behaviour',
  '/research/behavioural-cybersecurity',
  '/research/ai-cybersecurity',
  '/research/ai-research-integrity',
  '/publications',
  '/publications/can-ai-express-empathy',
  '/publications/online-trauma-academic-outcomes',
  '/publications/measurement-equivalence-emotional-expression',
  '/lab',
  '/projects/behavioral-phishing-detection',
  '/projects/cross-platform-fraud-detection-system',
  '/projects/elitech-hub-platform',
  '/writing',
  '/blog',
  '/elitech',
  '/contact',
  '/cv',
  '/collaborate',
  '/numintel',
  '/numintel/phone-number-validator',
  '/numintel/international-phone-number-validator',
  '/numintel/e164-phone-number-validator',
  '/numintel/countries',
  '/numintel/countries/nigeria',
  '/numintel/countries/ghana',
  '/numintel/countries/kenya',
  '/numintel/countries/south-africa',
  '/numintel/countries/united-kingdom',
  '/numintel/countries/united-states',
  '/numintel/guides',
  '/numintel/guides/what-is-e164',
  '/numintel/guides/international-phone-number-format',
  '/numintel/guides/phone-number-validation',
];

const BASE_URL = 'https://elijahadeyeye.vercel.app';
const DIST = path.resolve(__dirname, 'dist');
// Pages that show blog posts, so the posts are in their HTML for search engines.
const ROUTES_WITH_POSTS = new Set(['/', '/blog', '/writing']);
// React 19 renders page metadata and image preloads inside the app; they belong in <head>.
// JSON-LD scripts stay put: React expects them in place when it hydrates, and search engines read them anywhere.
const HEAD_TAG = /<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g;

async function fetchElitechPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category, author, thumbnail, published_at, views')
      .eq('published', true)
      .eq('author', 'Elijah Adeyeye')
      .order('published_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    console.log(`📚 Found ${data.length} Elitech Hub posts.`);
    return data;
  } catch (err) {
    // The pages still load posts in the browser, so this shouldn't stop a deploy.
    console.warn('⚠️ Could not fetch Elitech Hub posts:', err.message);
    return null;
  }
}

/** Removes the defaults meant for the unrendered shell, so each page has one set of tags. */
function withoutShellDefaults(template) {
  return template
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*>/, '')
    .replace(/\s*<!-- Open Graph[\s\S]*?application\/ld\+json[\s\S]*?<\/script>/, '')
    .replace(/<div id="initial-loader">[\s\S]*?<\/style>\s*<\/div>\s*/, '');
}

function writeSitemap() {
  const urls = ROUTES_TO_PRERENDER.map((route) => `  <url><loc>${BASE_URL}${route === '/' ? '' : route}</loc></url>`).join('\n');
  fs.writeFileSync(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

async function prerender() {
  console.log('\n📡 Starting prerender...\n');

  const elitechPosts = await fetchElitechPosts();

  // app.html stays unrendered. Vercel serves it for routes with no HTML of their own, such as /admin.
  const shellPath = path.join(DIST, 'app.html');
  if (!fs.existsSync(shellPath)) fs.copyFileSync(path.join(DIST, 'index.html'), shellPath);
  const template = withoutShellDefaults(fs.readFileSync(shellPath, 'utf-8'));

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    build: { ssrEmitAssets: false },
  });

  const failures = [];

  for (const url of ROUTES_TO_PRERENDER) {
    try {
      const initialData = elitechPosts && ROUTES_WITH_POSTS.has(url) ? { elitechPosts } : null;
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
      const { html, helmetContext } = await render(url, initialData);
      if (!html) throw new Error('rendered empty HTML');

      const { helmet } = helmetContext;
      const headTags = helmet
        ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((tag) => tag?.toString() || '')
        : [];
      const appHtml = html.replace(HEAD_TAG, (tag) => {
        headTags.push(tag);
        return '';
      });

      if (initialData) {
        headTags.push(`<script type="application/json" id="initial-data">${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>`);
      }

      const finalHtml = template
        .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
        .replace('</head>', () => `  ${headTags.filter(Boolean).join('\n    ')}\n  </head>`);

      const outPath = path.join(DIST, url === '/' ? '' : url, 'index.html');
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, finalHtml);
      console.log(`  ✅ Prerendered: ${url}`);
    } catch (err) {
      console.error(`  ❌ Failed to prerender ${url}:`, err.message);
      failures.push(url);
    }
  }

  await vite.close();
  writeSitemap();

  // Vercel serves this with a 404 status. It stays unrendered so the app can show the right message for any URL.
  fs.writeFileSync(
    path.join(DIST, '404.html'),
    template.replace('</head>', '  <title>Page Not Found | Elijah Adeyeye</title>\n    <meta name="robots" content="noindex" />\n  </head>')
  );

  console.log(`\n✅ Prerender complete. ${ROUTES_TO_PRERENDER.length - failures.length}/${ROUTES_TO_PRERENDER.length} routes succeeded.\n`);

  if (failures.length > 0) {
    process.exit(1);
  }
  // Open handles from the Supabase client shouldn't keep the build running.
  process.exit(0);
}

prerender().catch((err) => {
  console.error('Prerender fatal error:', err);
  process.exit(1);
});
