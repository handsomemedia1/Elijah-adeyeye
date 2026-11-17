/**
 * Builds the crawler files from the same data the pages use:
 * sitemap.xml, robots.txt, llms.txt (a map of the site for AI assistants)
 * and llms-full.txt (the site's facts as plain text, so assistants can quote it accurately).
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL, absoluteUrl } from './src/config/site.js';

const decode = (text = '') => text
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const stripHtml = (html = '') => decode(html
  .replace(/<\/(p|h[1-6]|li|ul|ol)>/g, '\n')
  .replace(/<li>/g, '- ')
  .replace(/<h[1-6][^>]*>/g, '\n### ')
  .replace(/<[^>]+>/g, ''))
  .replace(/\n{3,}/g, '\n\n')
  .trim();

/** Reads the title and description a prerendered page put in its <head>. */
export function readPageMeta(headHtml) {
  const title = decode(headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || '');
  const description = decode(headHtml.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1] || '');
  return { title, description };
}

export function writeSitemap(dist, routes, lastModified) {
  const urls = routes.map((route) => {
    const lastmod = lastModified[route] ? `<lastmod>${lastModified[route]}</lastmod>` : '';
    return `  <url><loc>${absoluteUrl(route)}</loc>${lastmod}</url>`;
  }).join('\n');
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}

export function writeRobots(dist) {
  // AI search crawlers are named so it's explicit they're welcome; they'd be allowed by "*" anyway.
  const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    '',
    ...aiCrawlers.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', 'Disallow: /admin', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ];
  fs.writeFileSync(path.join(dist, 'robots.txt'), lines.join('\n'));
}

const SECTIONS = [
  ['About', (r) => ['/', '/about', '/cv', '/contact', '/collaborate'].includes(r)],
  ['Research', (r) => r.startsWith('/research')],
  ['Publications', (r) => r.startsWith('/publications')],
  ['Projects', (r) => r === '/lab' || r.startsWith('/projects')],
  ['NumIntel phone number tools', (r) => r === '/numintel' || /^\/numintel\/[^/]+$/.test(r) && !r.endsWith('/countries') && !r.endsWith('/guides')],
  ['NumIntel country guides', (r) => r.startsWith('/numintel/countries')],
  ['NumIntel articles', (r) => r.startsWith('/numintel/guides')],
  ['Writing', (r) => r === '/blog' || r === '/elitech'],
];

export function writeLlms(dist, pages, data) {
  const { siteConfig, biography, publications, researchInterests, numintelGuides, numintelCountries, featuredProjects, elitechPosts } = data;

  const index = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.name}: ${siteConfig.title}; ${siteConfig.tagline}. ${siteConfig.descriptor}`,
    '',
    `Full text of the site's facts: ${SITE_URL}/llms-full.txt`,
    '',
  ];
  for (const [name, match] of SECTIONS) {
    const inSection = pages.filter((p) => match(p.route));
    if (!inSection.length) continue;
    index.push(`## ${name}`, '');
    inSection.forEach((p) => index.push(`- [${p.title}](${absoluteUrl(p.route)}): ${p.description}`));
    index.push('');
  }
  index.push(
    '## Elsewhere',
    '',
    `- [Elitech Hub](${siteConfig.elitechUrl}): the cybersecurity training hub ${siteConfig.name} founded. His articles are published on its blog.`,
    `- [LinkedIn](${siteConfig.linkedin})`,
    `- [ORCID](${siteConfig.orcid})`,
    `- [GitHub](${siteConfig.githubUrl})`,
    '',
  );
  fs.writeFileSync(path.join(dist, 'llms.txt'), index.join('\n'));

  const full = [
    `# ${siteConfig.name}`,
    '',
    `Website: ${SITE_URL}`,
    `Role: ${siteConfig.title}; ${siteConfig.tagline}`,
    `Location: ${siteConfig.location}`,
    `ORCID: ${siteConfig.orcid}`,
    '',
    '## Biography',
    '',
    biography.trim(),
    '',
    '## Research areas',
    '',
    ...researchInterests.flatMap((r) => [
      `### ${r.title}`,
      `URL: ${absoluteUrl(`/research/${r.slug}`)}`,
      '',
      r.description,
      '',
      ...(r.overview ? [r.overview, ''] : []),
      ...(r.questions?.length ? ['Research questions:', ...r.questions.map((q) => `- ${q}`), ''] : []),
    ]),
    '## Publications',
    '',
    ...publications.flatMap((p) => [
      `### ${p.title}`,
      `Authors: ${p.authors.join(', ')}`,
      ...(p.journal ? [`Venue: ${p.journal}`] : []),
      ...(p.publisher ? [`Publisher: ${p.publisher}`] : []),
      ...(p.doi ? [`DOI: https://doi.org/${p.doi}`] : []),
      `URL: ${absoluteUrl(`/publications/${p.slug}`)}`,
      '',
      p.abstract,
      '',
    ]),
    '## Projects',
    '',
    ...featuredProjects.flatMap((p) => [
      `### ${p.name}`,
      `URL: ${absoluteUrl(`/projects/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}`,
      '',
      p.description,
      '',
    ]),
    '## NumIntel: phone number guides',
    '',
    ...numintelGuides.flatMap((g) => [
      `### ${g.title}`,
      `URL: ${absoluteUrl(`/numintel/guides/${g.slug}`)}`,
      `Last updated: ${g.lastUpdated}`,
      '',
      stripHtml(g.content),
      '',
    ]),
    '## NumIntel: country phone number formats',
    '',
    ...numintelCountries.flatMap((c) => [
      `### ${c.name} (${c.isoCode}, calling code ${c.callingCode})`,
      `URL: ${absoluteUrl(`/numintel/countries/${c.slug}`)}`,
      `International format example: ${c.internationalFormatExample}`,
      `National format example: ${c.nationalFormatExample}`,
      ...(c.mobilePrefixes?.length ? [`Mobile prefixes: ${c.mobilePrefixes.join(', ')}`] : []),
      '',
      c.numberingPlan,
      '',
      ...(c.validationNotes ? [c.validationNotes, ''] : []),
    ]),
    ...(elitechPosts?.length ? [
      '## Articles (published on Elitech Hub)',
      '',
      ...elitechPosts.map((p) => `- [${p.title}](${data.elitechPostUrl(p.slug)})${p.excerpt ? `: ${p.excerpt}` : ''}`),
      '',
    ] : []),
  ];
  fs.writeFileSync(path.join(dist, 'llms-full.txt'), full.join('\n'));
}
