import { Helmet } from 'react-helmet-async';
import { siteConfig, researchInterests } from '../data/siteData';
import { SITE_URL, absoluteUrl, PERSON_ID, WEBSITE_ID, ELITECH_ID, DEFAULT_OG_IMAGE } from '../config/site';

const SITE_NAME = 'Elijah Adeyeye';
const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 160;

// Pages that exist above a nested page, for breadcrumbs. /projects has no page of its own, so it points to the Lab.
const PARENT_PAGES = {
  '/research': 'Research',
  '/publications': 'Publications',
  '/projects': ['Lab', '/lab'],
  '/numintel': 'NumIntel',
  '/numintel/countries': 'Countries',
  '/numintel/guides': 'Guides',
};

/** Adds the site name only when the title doesn't have it and there's room in search results. */
function buildTitle(title, path) {
  const skipSuffix = path === '/' || title.includes('|') || title.includes(SITE_NAME)
    || (title + TITLE_SUFFIX).length > MAX_TITLE_LENGTH;
  return skipSuffix ? title : title + TITLE_SUFFIX;
}

/** Shortens at a word boundary so search results don't show half a word. */
function buildDescription(description) {
  if (!description || description.length <= MAX_DESCRIPTION_LENGTH) return description;
  const cut = description.slice(0, MAX_DESCRIPTION_LENGTH - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function buildBreadcrumbs(path, title) {
  const crumbs = [{ name: 'Home', path: '/' }];
  const segments = path.split('/').filter(Boolean);
  segments.slice(0, -1).forEach((_, i) => {
    const prefix = `/${segments.slice(0, i + 1).join('/')}`;
    const parent = PARENT_PAGES[prefix];
    if (Array.isArray(parent)) crumbs.push({ name: parent[0], path: parent[1] });
    else if (parent) crumbs.push({ name: parent, path: prefix });
  });
  crumbs.push({ name: title.split(' | ')[0], path });
  return crumbs;
}

/** The person, site and organisation every page refers to, so search engines see one connected entity. */
const siteEntities = [
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE_NAME,
    description: siteConfig.descriptor,
    inLanguage: 'en-GB',
    publisher: { '@id': PERSON_ID },
  },
  {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.name,
    url: absoluteUrl('/'),
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/assets/images/profile/profile.jpg`,
      caption: siteConfig.name,
    },
    jobTitle: siteConfig.title,
    description: siteConfig.descriptor,
    knowsAbout: [
      ...researchInterests.map((r) => r.title),
      'Behavioural science',
      'Counselling psychology',
      'Phone number intelligence',
      'Cybersecurity education',
    ],
    homeLocation: { '@type': 'Place', name: siteConfig.location },
    identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: siteConfig.orcid },
    worksFor: { '@id': ELITECH_ID },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Ibadan' },
    sameAs: [siteConfig.linkedin, siteConfig.githubUrl, siteConfig.twitter, siteConfig.orcid].filter(Boolean),
  },
  {
    '@type': 'Organization',
    '@id': ELITECH_ID,
    name: 'Elitech Hub',
    url: siteConfig.elitechUrl,
    founder: { '@id': PERSON_ID },
  },
];

/**
 * Page metadata: title, description, canonical, social cards and one JSON-LD graph.
 *
 * @param {string}  title        Page title without the site name
 * @param {string}  description  Meta description; longer text is shortened to 160 characters
 * @param {string}  path         Route path, e.g. "/publications/can-ai-express-empathy"
 * @param {string}  [image]      Social image URL; defaults to the site's card
 * @param {string}  [type]       Open Graph type: "website" or "article"
 * @param {string}  [pageType]   schema.org page type, e.g. "AboutPage", "CollectionPage"
 * @param {Array}   [jsonLd]     Extra schema.org objects for this page
 * @param {boolean} [noindex]    Keep the page out of search results
 */
export default function SEO({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  pageType = 'WebPage',
  jsonLd = [],
  noindex = false,
}) {
  const url = absoluteUrl(path);
  const fullTitle = buildTitle(title, path);
  const metaDescription = buildDescription(description);
  const ogImage = image || DEFAULT_OG_IMAGE;

  const webPage = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: fullTitle,
    description: metaDescription,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-GB',
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
    ...(pageType === 'ProfilePage' || path === '/' ? { mainEntity: { '@id': PERSON_ID } } : { author: { '@id': PERSON_ID } }),
    ...(path !== '/' && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
  };

  const breadcrumb = path !== '/' && {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: buildBreadcrumbs(path, title).map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };

  // eslint-disable-next-line no-unused-vars
  const extras = jsonLd.map(({ '@context': _context, ...schema }) => schema);
  const graph = noindex ? [] : [...siteEntities, webPage, breadcrumb, ...extras].filter(Boolean);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {!noindex && <link rel="canonical" href={url} />}
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      <meta property="og:image" content={ogImage} />
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={`${SITE_NAME}: ${title.split(' | ')[0]}`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@elijahadeyeye" />
      <meta name="twitter:creator" content="@elijahadeyeye" />

      {graph.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
        </script>
      )}
    </Helmet>
  );
}
