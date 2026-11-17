/**
 * The site's public address. Change it here when the custom domain goes live:
 * canonicals, structured data, the sitemap, robots.txt and llms.txt all read it.
 */
export const SITE_URL = 'https://elijahadeyeye.vercel.app';

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '/' : path}`;

// Stable IDs let every page's structured data point to the same person and site.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ELITECH_ID = 'https://www.elitechub.com/#organization';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;
