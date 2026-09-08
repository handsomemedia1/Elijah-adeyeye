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
let ROUTES_TO_PRERENDER = [
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

async function prerender() {
  console.log('\n📡 Starting prerender...\n');

  // Fetch published blog posts to prerender them
  try {
    const { data: posts, error } = await supabase
      .from('portfolio_blog_posts')
      .select('slug')
      .eq('published', true);
      
    if (error) {
      console.warn('⚠️ Could not fetch blog posts for prerendering:', error.message);
    } else if (posts) {
      posts.forEach(post => {
        ROUTES_TO_PRERENDER.push(`/blog/${post.slug}`);
      });
      console.log(`📚 Found ${posts.length} published blog posts to prerender.`);
    }
  } catch (err) {
    console.warn('⚠️ Failed to connect to Supabase for blog prerendering:', err.message);
  }

  // Read the built index.html as template
  const template = fs.readFileSync(
    path.resolve(__dirname, 'dist/index.html'),
    'utf-8'
  );

  // Start Vite in SSR mode
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    build: { ssrEmitAssets: false },
  });

  let errorCount = 0;

  for (const url of ROUTES_TO_PRERENDER) {
    try {
      let initialData = null;
      
      // If it's a blog post, fetch its full data to inject into SSR context
      if (url.startsWith('/blog/')) {
        const slug = url.split('/blog/')[1];
        if (slug) {
          const { data: post } = await supabase
            .from('portfolio_blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();
            
          if (post) {
            initialData = { post };
          } else {
             console.warn(`⚠️ Post not found or unpublished: ${slug}`);
             continue; // Skip rendering unpublished/nonexistent
          }
        }
      }

      // Load the server entry via Vite's SSR transform pipeline
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

      // Render to string
      const { html: appHtml, helmetContext } = await render(url, initialData);

      // Extract helmet tags
      const { helmet } = helmetContext;
      const headTags = helmet
        ? [
            helmet.title?.toString() || '',
            helmet.meta?.toString() || '',
            helmet.link?.toString() || '',
            helmet.script?.toString() || '',
          ].join('\n    ')
        : '';

      let finalHtml = template
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace('</head>', `  ${headTags}\n  </head>`);

      // Inject initialData for client hydration
      if (initialData) {
        const script = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>`;
        finalHtml = finalHtml.replace('</head>', `  ${script}\n  </head>`);
      }

      // Write to dist/<route>/index.html
      const routePath = url === '/' ? '/index.html' : `${url}/index.html`;
      const outPath = path.resolve(__dirname, 'dist', routePath.replace(/^\//, ''));
      const outDir = path.dirname(outPath);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outPath, finalHtml);
      console.log(`  ✅ Prerendered: ${url} → dist${routePath}`);
    } catch (err) {
      console.error(`  ❌ Failed to prerender ${url}:`, err.message);
      errorCount++;
    }
  }

  await vite.close();

  console.log(`\n✅ Prerender complete. ${ROUTES_TO_PRERENDER.length - errorCount}/${ROUTES_TO_PRERENDER.length} routes succeeded.\n`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('Prerender fatal error:', err);
  process.exit(1);
});
