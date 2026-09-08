import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { numintelGuides } from '../../data/numintelGuides';
import '../NumIntelPage.css';

export default function GuidePage() {
  const { guideSlug } = useParams();
  const guide = numintelGuides.find(g => g.slug === guideSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guideSlug]);

  if (!guide) {
    return <Navigate to="/numintel/guides" replace />;
  }

  return (
    <div className="numintel page-enter">
      <SEO
        title={`${guide.title} | NumIntel Guides`}
        description={guide.description}
        path={`/numintel/guides/${guide.slug}`}
        type="article"
      />
      
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Link to="/numintel/guides" className="breadcrumb">← All Guides</Link>
          <h1 className="page-hero__title" style={{ marginTop: 'var(--space-4)', fontSize: '2.5rem' }}>{guide.title}</h1>
          <p className="page-hero__subtitle" style={{ maxWidth: '800px' }}>
            {guide.description}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass" style={{ padding: 'var(--space-8)' }}>
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: guide.content }} />
            
            <p style={{ marginTop: 'var(--space-8)', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
              Last updated: {guide.lastUpdated}
            </p>
          </div>

          {guide.relatedTools && guide.relatedTools.length > 0 && (
            <div style={{ marginTop: 'var(--space-8)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Tools</h3>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {guide.relatedTools.map(path => {
                  // e.g. path = /numintel/e164-phone-number-validator
                  const name = path.split('/').pop().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  return (
                    <Link key={path} to={path} className="btn btn--outline">
                      {name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}