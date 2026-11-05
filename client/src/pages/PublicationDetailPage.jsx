import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { publications, researchInterests } from '../data/siteData';
import { HiArrowLeft, HiExternalLink, HiClipboardCopy, HiCheck } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import './PublicationDetailPage.css';

export default function PublicationDetailPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const publication = publications.find(p => p.slug === slug);
  const pillar = publication ? researchInterests.find(r => r.slug === publication.researchPillar) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!publication) {
    return (
      <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
        <SEO title="Publication Not Found" noindex={true} />
        <h2>Publication Not Found</h2>
        <Link to="/publications" className="btn btn--outline" style={{ marginTop: '1rem' }}>Back to Publications</Link>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(publication.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    author: publication.authors.map(author => ({
      '@type': 'Person',
      name: author
    })),
    datePublished: publication.publishedDate || publication.submitted,
    publisher: {
      '@type': 'Organization',
      name: publication.publisher
    },
    identifier: publication.doi ? `doi:${publication.doi}` : undefined,
    url: `https://elijahadeyeye.vercel.app/publications/${publication.slug}`
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elijahadeyeye.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Publications', item: 'https://elijahadeyeye.vercel.app/publications' },
      { '@type': 'ListItem', position: 3, name: publication.title, item: `https://elijahadeyeye.vercel.app/publications/${publication.slug}` }
    ]
  };

  return (
    <div className="pub-detail page-enter">
      <SEO
        title={publication.title}
        description={publication.abstract}
        path={`/publications/${publication.slug}`}
        type="article"
        jsonLd={[articleSchema, breadcrumbSchema]}
      />
      <section className="section">
        <div className="container pub-detail__inner">
          <Link to="/publications" className="pub-detail__back">
            <HiArrowLeft /> Back to Publications
          </Link>

          <header className="pub-detail__header">
            <div className="pub-detail__tags">
              <span className={`pub-card__badge ${publication.status === 'Accepted' ? 'badge--accepted' : publication.status === 'Published' ? 'badge--published' : 'badge--review'}`}>
                {publication.status}
              </span>
              <span className="pub-card__type">
                {publication.type === 'conference' ? 'Conference' : 'Journal'}
              </span>
            </div>
            <h1 className="pub-detail__title">{publication.title}</h1>
            <p className="pub-detail__authors">
              {publication.authors.map((a, i) => (
                <span key={a}>
                  <strong className={a === publication.highlightedAuthor ? 'highlight' : ''}>{a}</strong>
                  {i < publication.authors.length - 1 && ', '}
                </span>
              ))}
            </p>
            <p className="pub-detail__journal">
              {publication.journal} — {publication.publisher}
            </p>
          </header>

          <div className="pub-detail__content">
            <div className="pub-detail__main">
              <h3>Abstract</h3>
              <p className="pub-detail__abstract">{publication.abstract}</p>

              <h3>Keywords</h3>
              <div className="pub-detail__keywords">
                {publication.keywords.map(k => (
                  <span key={k} className="skill-tag">{k}</span>
                ))}
              </div>

              <h3>Citation (APA)</h3>
              <div className="pub-detail__citation glass">
                <p>{publication.citation}</p>
                <button className="btn btn--sm btn--outline" onClick={handleCopy}>
                  {copied ? <><HiCheck /> Copied</> : <><HiClipboardCopy /> Copy Citation</>}
                </button>
              </div>
            </div>

            <aside className="pub-detail__sidebar">
              <div className="glass pub-detail__meta">
                <h4>Publication Details</h4>
                <ul>
                  <li><strong>Status:</strong> {publication.status}</li>
                  <li><strong>Date:</strong> {publication.date || publication.publishedDate || publication.submitted}</li>
                  {publication.doi && (
                    <li><strong>DOI:</strong> <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">{publication.doi} <HiExternalLink /></a></li>
                  )}
                  {publication.correctionDoi && (
                    <li><strong>Correction:</strong> <a href={`https://doi.org/${publication.correctionDoi}`} target="_blank" rel="noopener noreferrer">{publication.correctionDoi} <HiExternalLink /></a></li>
                  )}
                  {publication.manuscriptId && <li><strong>Manuscript ID:</strong> {publication.manuscriptId}</li>}
                  {publication.abstractId && <li><strong>Abstract ID:</strong> {publication.abstractId}</li>}
                </ul>
                
                {pillar && (
                  <div className="pub-detail__pillar">
                    <h4>Research Pillar</h4>
                    <Link to={`/research/${pillar.slug}`}>
                      {pillar.icon} {pillar.title}
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
