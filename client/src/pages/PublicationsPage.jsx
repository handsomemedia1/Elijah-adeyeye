import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { publications } from '../data/siteData';
import { Link } from 'react-router-dom';
import './PublicationsPage.css';

const statusFilters = ['All', 'Under Review', 'Accepted', 'Published', 'Conference'];

export default function PublicationsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? publications :
    publications.filter(p =>
      filter === 'Conference' ? p.type === 'conference' : p.status === filter
    );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="publications page-enter">
      <SEO
        title="Publications — Research Papers"
        description="Published research in AI empathy, online trauma, and measurement equivalence."
        path="/publications"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 210, 170, 0.05) 0%, transparent 50%)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Research Output</span>
          <h1 className="page-hero__title"><span className="gradient-text">Publications</span></h1>
          <p className="page-hero__subtitle">Peer-reviewed research and working papers</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pub-filters">
            {statusFilters.map(s => (
              <button
                key={s}
                className={`lab__pill ${filter === s ? 'lab__pill--active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid-2">
            {filtered.map(pub => (
              <div key={pub.id} className="pub-card glass">
                <div className="pub-card__header">
                  <span className={`pub-card__badge ${pub.status === 'Accepted' ? 'badge--accepted' : pub.status === 'Published' ? 'badge--published' : 'badge--review'}`}>
                    {pub.status}
                  </span>
                  <span className="pub-card__type">
                    {pub.type === 'conference' ? 'Conference' : 'Journal'}
                  </span>
                </div>

                <h2 className="pub-card__title">{pub.title}</h2>
                <p className="pub-card__journal">{pub.journal} — {pub.publisher}</p>
                <p className="pub-card__abstract">{pub.abstract.substring(0, 150)}...</p>

                <div className="pub-card__footer" style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link to={`/publications/${pub.slug}`} className="btn btn--outline btn--sm">
                    Read Publication <HiArrowRight />
                  </Link>
                  {pub.doi && <span className="pub-entry__pdf-note" style={{ fontSize: 'var(--text-xs)' }}><HiDownload /> Open Access</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
