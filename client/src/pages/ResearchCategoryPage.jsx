import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { researchInterests, publications, featuredProjects } from '../data/siteData';
import { HiArrowLeft, HiArrowRight, HiOutlineLightBulb, HiOutlineBeaker, HiOutlineCollection } from 'react-icons/hi';
import { useEffect } from 'react';
import './ResearchCategoryPage.css';

// Generating slugs for projects based on their name for routing
const projectsWithSlugs = featuredProjects.map(p => ({
  ...p,
  slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}));

export default function ResearchCategoryPage() {
  const { slug } = useParams();

  const pillar = researchInterests.find(r => r.slug === slug);
  const relatedPubs = publications.filter(p => p.researchPillar === slug);
  const relatedProjects = projectsWithSlugs.filter(p => p.researchPillar === slug || (p.tags && p.tags.some(t => t.toLowerCase().includes(pillar?.title.toLowerCase().split(' ')[0]))));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!pillar) {
    return (
      <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
        <SEO title="Research Area Not Found" noindex={true} />
        <h2>Research Area Not Found</h2>
        <Link to="/research" className="btn btn--outline" style={{ marginTop: '1rem' }}>Back to Research</Link>
      </div>
    );
  }

  return (
    <div className="research-cat page-enter">
      <SEO
        title={`${pillar.title} — Research`}
        description={pillar.description}
        path={`/research/${pillar.slug}`}
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 210, 170, 0.05) 0%, transparent 50%)' }} />
        <div className="container page-hero__inner">
          <Link to="/research" className="research-cat__back">
            <HiArrowLeft /> All Research Areas
          </Link>
          <span className="section-header__label" style={{ marginTop: 'var(--space-6)' }}>Research Pillar</span>
          <h1 className="page-hero__title">
            <span className="gradient-text">{pillar.icon} {pillar.title}</span>
          </h1>
          <p className="page-hero__subtitle">
            {pillar.description}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-sidebar-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-8)' }}>
            
            <div className="research-cat__main">
              {pillar.overview && (
                <div className="research-cat__overview glass" style={{ marginBottom: 'var(--space-8)' }}>
                  <h2 style={{ marginBottom: 'var(--space-4)' }}>Research Overview</h2>
                  <p>{pillar.overview}</p>
                </div>
              )}

              {pillar.questions && (
                <div className="research-cat__questions" style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
                    <HiOutlineLightBulb className="text-primary" /> Core Research Questions
                  </h3>
                  <ul className="custom-list">
                    {pillar.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pillar.futureResearch && (
                <div className="research-cat__future glass" style={{ marginBottom: 'var(--space-8)', borderLeft: '4px solid var(--color-primary)' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Open Questions / Future Directions</h3>
                  <p>{pillar.futureResearch}</p>
                </div>
              )}

              <div className="section-header" style={{ marginTop: 'var(--space-8)' }}>
                <h2 className="section-header__title">Related Publications</h2>
                <div className="accent-line" />
              </div>
              
              {relatedPubs.length > 0 ? (
                <div className="grid-2">
                  {relatedPubs.map(pub => (
                    <div key={pub.id} className="pub-card glass">
                      <div className="pub-card__header">
                        <span className={`pub-card__badge ${pub.status === 'Accepted' ? 'badge--accepted' : pub.status === 'Published' ? 'badge--published' : 'badge--review'}`}>{pub.status}</span>
                        <span className="pub-card__type">{pub.type === 'conference' ? 'Conference' : 'Journal'}</span>
                      </div>
                      <h3 className="pub-card__title">{pub.title}</h3>
                      <p className="pub-card__journal">{pub.journal}</p>
                      <Link to={`/publications/${pub.slug}`} className="pub-card__link">
                        Read Publication <HiArrowRight />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>Ongoing research in this area. Check back for upcoming publications.</p>
                </div>
              )}

              {relatedProjects.length > 0 && (
                <div style={{ marginTop: 'var(--space-8)' }}>
                  <div className="section-header">
                    <h2 className="section-header__title">Related Projects</h2>
                    <div className="accent-line" />
                  </div>
                  <div className="grid-2">
                    {relatedProjects.map(proj => (
                      <div key={proj.name} className="pub-card glass">
                        <h3 className="pub-card__title">{proj.name}</h3>
                        <p className="pub-card__journal" style={{ fontSize: '0.9rem' }}>{proj.description.substring(0, 100)}...</p>
                        <Link to={`/projects/${proj.slug}`} className="pub-card__link" style={{ marginTop: '1rem' }}>
                          View Project <HiArrowRight />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="research-cat__sidebar">
              {pillar.themes && (
                <div className="glass" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>
                    <HiOutlineCollection className="text-primary" /> Themes
                  </h3>
                  <div className="skill-tags">
                    {pillar.themes.map(t => (
                      <span key={t} className="skill-tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {pillar.methods && (
                <div className="glass">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>
                    <HiOutlineBeaker className="text-primary" /> Methods & Approaches
                  </h3>
                  <ul className="custom-list" style={{ fontSize: '0.9rem' }}>
                    {pillar.methods.map((m, i) => (
                      <li key={i} style={{ marginBottom: '0.5rem' }}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="glass" style={{ marginTop: 'var(--space-6)', textAlign: 'center', background: 'linear-gradient(to bottom right, rgba(99, 210, 170, 0.1), rgba(6, 9, 14, 0.8))' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Collaborate</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Interested in this research area?</p>
                <Link to="/collaborate" className="btn btn--primary btn--sm" style={{ width: '100%' }}>Discuss Research</Link>
              </div>
            </aside>
            
          </div>
        </div>
      </section>
    </div>
  );
}
