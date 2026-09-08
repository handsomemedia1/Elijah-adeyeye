import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { numintelGuides } from '../../data/numintelGuides';
import '../NumIntelPage.css';

export default function GuideListPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="numintel page-enter">
      <SEO
        title="Phone Number Intelligence Guides & Articles | NumIntel"
        description="Learn about E.164, phone number formatting, telecom routing, and validation technologies."
        path="/numintel/guides"
      />
      
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Link to="/numintel" className="breadcrumb">← Back to NumIntel</Link>
          <h1 className="page-hero__title" style={{ marginTop: 'var(--space-4)' }}>NumIntel Guides</h1>
          <p className="page-hero__subtitle">
            Educational resources on telecommunication standards, formatting, and open-source intelligence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {numintelGuides.map(guide => (
              <Link key={guide.slug} to={`/numintel/guides/${guide.slug}`} className="glass numintel__country-card" style={{ textDecoration: 'none', color: 'inherit', padding: 'var(--space-6)', display: 'block', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>{guide.title}</h3>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}