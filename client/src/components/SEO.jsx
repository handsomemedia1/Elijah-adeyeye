import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/siteData';

const BASE_URL = 'https://elijahadeyeye.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/profile/profile.jpg`;

/**
 * SEO — injects page-level meta, OG, Twitter, canonical, and JSON-LD schemas.
 * All schemas passed via jsonLd[] are injected alongside the default Person schema.
 *
 * @param {string}   title          — Page title (without site suffix)
 * @param {string}   description    — Meta description (≤160 chars)
 * @param {string}   path           — Route path e.g. "/publications/can-ai-express-empathy"
 * @param {string}   [image]        — OG image URL (defaults to profile photo)
 * @param {string}   [type]         — OG type ("website" | "article")
 * @param {Array}    [jsonLd]       — Additional JSON-LD schema objects to inject
 * @param {boolean}  [noindex]      — Set true to add noindex,nofollow
 */
export default function SEO({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  jsonLd = [],
  noindex = false,
}) {
  const url = `${BASE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | Elijah Adeyeye`;
  const ogImage = image || DEFAULT_IMAGE;

  // Default Person schema — always present
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: BASE_URL,
    image: DEFAULT_IMAGE,
    jobTitle: siteConfig.title,
    description: siteConfig.descriptor,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ORCID',
      value: 'https://orcid.org/0009-0005-4853-7813',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Elitech Hub',
      url: 'https://elitechub.com',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Ibadan',
    },
    sameAs: [
      siteConfig.linkedin,
      siteConfig.githubUrl,
      siteConfig.twitter,
      siteConfig.orcid,
    ].filter(Boolean),
  };

  const allSchemas = [personSchema, ...jsonLd];

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${siteConfig.name} — ${title}`} />
      <meta property="og:site_name" content="Elijah Adeyeye" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@elijahadeyeye" />
      <meta name="twitter:creator" content="@elijahadeyeye" />

      {/* JSON-LD schemas */}
      {allSchemas.map((schema, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
