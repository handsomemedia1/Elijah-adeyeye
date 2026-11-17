import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { elitechPostUrl } from '../data/siteData';

/** Posts live on Elitech Hub, so old /blog/:slug links forward there. */
export default function BlogRedirect() {
  const { slug } = useParams();
  const url = elitechPostUrl(slug);

  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <SEO title="Redirecting to Elitech Hub" description="This post is on Elitech Hub." path={`/blog/${slug}`} noindex />
      <p>This post is on <a href={url}>Elitech Hub</a>.</p>
    </div>
  );
}
