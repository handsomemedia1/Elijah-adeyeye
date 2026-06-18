import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://elijahadeyeye.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/profile/profile.jpg`;

export default function SEO({ title, description, path = '/', image }) {
  const url = `${BASE_URL}${path}`;
  const fullTitle = path === '/' 
    ? title 
    : `${title} | Elijah Adeyeye`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image || DEFAULT_IMAGE} />
    </Helmet>
  );
}
