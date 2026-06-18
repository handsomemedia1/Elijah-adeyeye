import { useState } from 'react';
import SEO from '../components/SEO';
import { HiClipboardCopy, HiCheck, HiDownload } from 'react-icons/hi';
import { publications } from '../data/siteData';
import './PublicationsPage.css';

const statusFilters = ['All', 'Under Review', 'Accepted', 'Published', 'Conference'];

export default function PublicationsPage() {
  const [filter, setFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [reactions, setReactions] = useState({});
  const [expanded, setExpanded] = useState({});

  const filtered = filter === 'All' ? publications :
    publications.filter(p =>
      filter === 'Conference' ? p.type === 'conference' : p.status === filter
    );

  const handleCopy = (id, citation) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReaction = (pubId, emoji) => {
    setReactions(prev => {
      const key = `${pubId}-${emoji}`;
      const current = prev[key] || 0;
      return { ...prev, [key]: current + 1 };
    });
  };

  return (
    <div className="publications page-enter">
      <SEO
        title="Publications — Research Papers"
        description="Published research in AI empathy, online trauma, and measurement equivalence. Springer Nature, SAGE Publications, APA Convention."
        path="/publications"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_pubs_1776720396440.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Research Output</span>
          <h1 className="page-hero__title"><span className="gradient-text">Publications</span></h1>
          <p className="page-hero__subtitle">Peer-reviewed research hosted natively — the canonical source</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
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

          {/* Publication Entries */}
          <div className="pub-list">
            {filtered.map(pub => (
              <article key={pub.id} className="pub-entry glass">
                <div className="pub-entry__header">
                  <span className={`pub-card__badge ${pub.status === 'Accepted' ? 'badge--accepted' : 'badge--review'}`}>
                    {pub.status}
                  </span>
                  <span className="pub-entry__type">
                    {pub.type === 'conference' ? '📍 Conference Session' : '📄 Journal Article'}
                  </span>
                </div>

                <h2 className="pub-entry__title">{pub.title}</h2>

                <div className="pub-entry__meta">
                  <p className="pub-entry__authors">
                    {pub.authors.map((a, i) => (
                      <span key={a}>
                        <span className={a === pub.highlightedAuthor ? 'pub-entry__author-highlight' : ''}>
                          {a}
                        </span>
                        {i < pub.authors.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                  <p className="pub-entry__journal">
                    {pub.journal} — {pub.publisher}
                  </p>
                  {pub.manuscriptId && (
                    <p className="pub-entry__msid">Manuscript ID: {pub.manuscriptId}</p>
                  )}
                  {pub.date && <p className="pub-entry__date">📅 {pub.date} — {pub.location}</p>}
                  {pub.abstractId && <p className="pub-entry__msid">Abstract ID: {pub.abstractId}</p>}
                </div>

                <div className="pub-entry__abstract">
                  <h4>Abstract</h4>
                  <p className={expanded[pub.id] ? '' : 'pub-entry__abstract-truncated'}>
                    {pub.abstract}
                  </p>
                  <button
                    className="pub-entry__expand"
                    onClick={() => setExpanded(prev => ({ ...prev, [pub.id]: !prev[pub.id] }))}
                  >
                    {expanded[pub.id] ? 'Show less' : 'Read full abstract'}
                  </button>
                </div>

                <div className="pub-entry__keywords">
                  {pub.keywords.map(k => (
                    <span key={k} className="skill-tag">{k}</span>
                  ))}
                </div>

                {/* Citation */}
                <div className="pub-entry__citation glass-strong">
                  <h4>📋 Citation (APA)</h4>
                  <p className="pub-entry__citation-text">{pub.citation}</p>
                  <button
                    className="btn btn--outline btn--sm"
                    onClick={() => handleCopy(pub.id, pub.citation)}
                  >
                    {copiedId === pub.id ? <><HiCheck /> Copied!</> : <><HiClipboardCopy /> Copy Citation</>}
                  </button>
                </div>

                {/* Reactions */}
                <div className="pub-entry__reactions">
                  {['👍 Insightful', '❤️ Love this', '🔁 Share'].map(emoji => {
                    const key = `${pub.id}-${emoji}`;
                    return (
                      <button
                        key={emoji}
                        className="reaction-btn"
                        onClick={() => handleReaction(pub.id, emoji)}
                      >
                        {emoji}
                        {reactions[key] > 0 && <span className="reaction-count">{reactions[key]}</span>}
                      </button>
                    );
                  })}
                </div>

                <div className="pub-entry__footer">
                  <span className="pub-entry__pdf-note">
                    <HiDownload /> PDF available upon publication
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
