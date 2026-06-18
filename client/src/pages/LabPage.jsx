import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { HiSearch, HiStar, HiExternalLink } from 'react-icons/hi';
import { FaGithub, FaCodeBranch } from 'react-icons/fa6';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { featuredProjects, languageColors, siteConfig } from '../data/siteData';
import './LabPage.css';

const categories = ['All', 'Cybersecurity', 'Data Analysis', 'AI/ML', 'Web Dev', 'Tools'];

function getRelativeTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  if (days < 30) return `Updated ${days}d ago`;
  const months = Math.floor(days / 30);
  return `Updated ${months}mo ago`;
}

export default function LabPage() {
  const { repos, loading, stats } = useGitHubRepos();
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('All');
  const [sortBy, setSortBy] = useState('updated');

  const languages = useMemo(() => {
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    return ['All', ...langs];
  }, [repos]);

  const filtered = useMemo(() => {
    let result = [...repos];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q)
      );
    }
    if (langFilter !== 'All') {
      result = result.filter(r => r.language === langFilter);
    }
    if (sortBy === 'updated') result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    else if (sortBy === 'stars') result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [repos, search, langFilter, sortBy]);

  return (
    <div className="lab page-enter">
      <SEO
        title="Lab — Projects & Experiments"
        description="Open-source projects, experiments, and tools built by Elijah Adeyeye. Cybersecurity, data analysis, AI/ML, and web development."
        path="/lab"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_lab_1776720324972.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Developer Lab</span>
          <h1 className="page-hero__title">The <span className="gradient-text">Lab</span></h1>
          <p className="page-hero__subtitle">Live-synced from GitHub · All public repositories</p>
        </div>
      </section>

      {/* Stats Panel */}
      <section className="lab__stats-section">
        <div className="container">
          <div className="lab__stats glass-strong">
            <div className="lab__stat">
              <span className="lab__stat-value gradient-text">{stats.totalRepos}</span>
              <span className="lab__stat-label">Repositories</span>
            </div>
            <div className="lab__stat">
              <span className="lab__stat-value gradient-text">{stats.totalStars}</span>
              <span className="lab__stat-label">Total Stars</span>
            </div>
            <div className="lab__stat">
              <span className="lab__stat-value gradient-text">{stats.topLanguage}</span>
              <span className="lab__stat-label">Top Language</span>
            </div>
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <FaGithub /> Follow on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section lab__featured">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left' }}>
            <span className="section-header__label">Featured</span>
            <h2 className="section-header__title">Featured Projects</h2>
          </div>
          <div className="grid-3">
            {featuredProjects.map((p, i) => (
              <div key={i} className="featured-card glass">
                <span className="post-card__tag">{p.category}</span>
                <h3 className="featured-card__name">{p.name}</h3>
                <p className="featured-card__desc">{p.description}</p>
                <div className="featured-card__tech">
                  {p.tech.map(t => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
                <div className="featured-card__actions">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                    <FaGithub /> GitHub
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                      <HiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="section section-alt lab__repos">
        <div className="container">
          <div className="lab__filters">
            <div className="lab__search glass">
              <HiSearch className="lab__search-icon" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="lab__search-input"
              />
            </div>
            <div className="lab__filter-pills">
              {languages.slice(0, 8).map(lang => (
                <button
                  key={lang}
                  className={`lab__pill ${langFilter === lang ? 'lab__pill--active' : ''}`}
                  onClick={() => setLangFilter(lang)}
                >
                  {lang !== 'All' && (
                    <span className="repo-card__lang-dot" style={{ background: languageColors[lang] || '#8B949E' }} />
                  )}
                  {lang}
                </button>
              ))}
            </div>
            <select className="lab__sort glass" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="updated">Latest Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          {loading ? (
            <div className="lab__loading">
              <div className="lab__spinner" />
              <p>Fetching from GitHub...</p>
            </div>
          ) : (
            <div className="lab__grid">
              {filtered.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card glass"
                >
                  <div className="repo-card__header">
                    <h4 className="repo-card__name">{repo.name}</h4>
                    {repo.archived && <span className="pub-card__badge badge--review">Archived</span>}
                  </div>
                  <p className="repo-card__desc">{repo.description || 'No description'}</p>
                  <div className="repo-card__meta">
                    {repo.language && (
                      <span className="repo-card__lang">
                        <span className="repo-card__lang-dot" style={{ background: languageColors[repo.language] || '#8B949E' }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="repo-card__stars"><HiStar /> {repo.stargazers_count}</span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="repo-card__stars"><FaCodeBranch /> {repo.forks_count}</span>
                    )}
                    <span className="repo-card__updated">{getRelativeTime(repo.updated_at)}</span>
                  </div>
                  {repo.homepage && (
                    <span className="repo-card__demo">Live Demo →</span>
                  )}
                </a>
              ))}
              {filtered.length === 0 && (
                <p className="lab__empty">No repositories found matching your criteria.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
