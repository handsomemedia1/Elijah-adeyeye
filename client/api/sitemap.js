import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ijawxlndyslanklfigua.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_c9ctVWF2DVLv-IHApNV9nA_FWp-VKOt';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    // 1. Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('portfolio_blog_posts')
      .select('slug, updated_at, published_at')
      .eq('published', true);

    if (error) {
      console.error('Error fetching posts for sitemap:', error);
      return res.status(500).json({ error: 'Failed to generate sitemap' });
    }

    // 2. Base URL of the site
    const baseUrl = 'https://elijahadeyeye.vercel.app';

    // 3. Static routes
    const staticRoutes = [
      '',
      '/about',
      '/research',
      '/lab',
      '/numintel',
      '/publications',
      '/elitech',
      '/writing',
      '/blog',
      '/contact',
      '/cv',
      '/collaborate'
    ];

    // Data for dynamic routes from siteData.js isn't easily importable in an edge function without a bundler setup.
    // Assuming hardcoded mapping for now to ensure crawlability, or relying on Vercel's build process if this is run in Node.
    // For a true dynamic build, we should fetch from DB, but these are static in the codebase.
    const siteDataRoutes = [
      '/research/ai-evaluation',
      '/research/human-behaviour',
      '/research/behavioural-cybersecurity',
      '/research/ai-cybersecurity',
      '/research/ai-research-integrity',
      '/publications/can-ai-express-empathy',
      '/publications/online-trauma-academic-outcomes',
      '/publications/measurement-equivalence-emotional-expression',
      '/projects/behavioral-phishing-detection',
      '/projects/cross-platform-fraud-detection-system',
      '/projects/elitech-hub-platform'
    ];

    const allStaticRoutes = [...staticRoutes, ...siteDataRoutes];

    // 4. Generate XML string
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allStaticRoutes
    .map((route) => {
      return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${route === '/blog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
  ${posts
    .map((post) => {
      return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.published_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

    // 5. Send the XML response
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400'); // Cache for 1 hour
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap function error:', error);
    return res.status(500).json({ error: 'Server error generating sitemap' });
  }
}
