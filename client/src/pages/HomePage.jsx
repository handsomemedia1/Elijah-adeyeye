import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiExternalLink, HiStar } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa6';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useElitechBlogs } from '../hooks/useElitechBlogs';
import { supabase } from '../lib/supabase';
import {
  siteConfig, stats, publications, aboutSnippet,
  testimonials, blogPosts, featuredProjects
} from '../data/siteData';
import './HomePage.css';

function StatItem({ value, suffix, label }) {
  const [ref, count] = useCountUp(value, 2000);
  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-item__value gradient-text">
        {count}{suffix}
      </span>
      <span className="stat-item__label">{label}</span>
    </div>
  );
}

function PublicationCard({ pub }) {
  const [ref, visible] = useScrollReveal();
  const statusClass = pub.status === 'Accepted' ? 'badge--accepted' :
    pub.status === 'Published' ? 'badge--published' : 'badge--review';
  return (
    <div className={`pub-card glass ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="pub-card__header">
        <span className={`pub-card__badge ${statusClass}`}>{pub.status}</span>
        <span className="pub-card__type">{pub.type === 'conference' ? 'Conference' : 'Journal'}</span>
      </div>
      <h3 className="pub-card__title">{pub.title}</h3>
      <p className="pub-card__journal">{pub.journal} — {pub.publisher}</p>
      <p className="pub-card__abstract">{pub.abstract.substring(0, 150)}...</p>
      <Link to={`/publications`} className="pub-card__link">
        Read More <HiArrowRight />
      </Link>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card glass"
    >
      <h4 className="repo-card__name">{repo.name}</h4>
      <p className="repo-card__desc">{repo.description || 'No description available'}</p>
      <div className="repo-card__meta">
        {repo.language && (
          <span className="repo-card__lang">
            <span className="repo-card__lang-dot" style={{
              background: getLanguageColor(repo.language)
            }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="repo-card__stars"><HiStar /> {repo.stargazers_count}</span>
        )}
        <span className="repo-card__updated">
          {getRelativeTime(repo.updated_at)}
        </span>
      </div>
    </a>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="testimonial-card glass">
      <p className="testimonial-card__text">"{t.content || t.text}"</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {t.image ? (
            <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            t.name.split(' ').map(n => n[0]).join('').substring(0, 2)
          )}
        </div>
        <div>
          <p className="testimonial-card__name">{t.name}</p>
          <p className="testimonial-card__role">{t.role || t.title}</p>
        </div>
      </div>
    </div>
  );
}

function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB',
    HTML: '#E34F26', CSS: '#1572B6', PowerShell: '#012456', Go: '#00ADD8',
  };
  return colors[lang] || '#8B949E';
}

function getRelativeTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  if (days < 30) return `Updated ${days} days ago`;
  const months = Math.floor(days / 30);
  return `Updated ${months}mo ago`;
}

export default function HomePage() {
  const { repos, stats: ghStats } = useGitHubRepos();
  const latestRepos = repos.slice(0, 3);
  
  // Fetch live Portfolio CMS blogs
  const [personalPosts, setPersonalPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('portfolio_blog_posts')
        .select('id, title, slug, excerpt, category, thumbnail, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      setPersonalPosts(data || []);
      setPostsLoading(false);
    }
    fetchPosts();
  }, []);

  const [heroRef, heroVisible] = useScrollReveal({ threshold: 0.1 });
  const [aboutRef, aboutVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  // Typing animation
  const [typed, setTyped] = useState('');
  const fullText = siteConfig.descriptor;
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <SEO
        title="Elijah Adeyeye | Cybersecurity Researcher & Behavioral Scientist"
        description="Founder of Elitech Hub. Cybersecurity researcher studying human behavior under threat — then building systems that defend against it."
        path="/"
      />
      {/* ── HERO SECTION ── */}
      <section className="hero" ref={heroRef}>
        {/* Subtle photo background */}
        <div className="hero__bg-image" />
        <div className="hero__bg-overlay" />
        <div className="hero__mesh mesh-background">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>
        <div className="hero__content container">
          <div className={`hero__text ${heroVisible ? 'visible' : ''}`}>
            <p className="hero__greeting">Hello, I'm</p>
            <h1 className="hero__name">
              <span className="gradient-text">Elijah</span> Adeyeye
            </h1>
            <p className="hero__title">{siteConfig.title}</p>
            <p className="hero__descriptor">
              "{typed}"
              <span className="hero__cursor">|</span>
            </p>
            <p className="hero__tagline">{siteConfig.tagline}</p>
            <div className="hero__ctas">
              <Link to="/lab" className="btn btn--primary">
                View My Work <HiArrowRight />
              </Link>
              <Link to="/publications" className="btn btn--outline">
                Read My Research
              </Link>
            </div>
          </div>
          <div className={`hero__image ${heroVisible ? 'visible' : ''}`}>
            <div className="hero__photo-wrapper">
              <div className="hero__photo-glow" />
              <img src="/assets/images/profile/profile.jpg" alt="Elijah Adeyeye" className="hero__photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="stats-bar">
        <div className="stats-bar__inner container">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
          <StatItem value={ghStats.totalRepos} suffix="" label="GitHub Repositories" />
        </div>
      </section>

      {/* ── FEATURED PUBLICATIONS ── */}
      <section className="section home__publications">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Research</span>
            <h2 className="section-header__title">Featured Publications</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {publications.map(pub => (
              <PublicationCard key={pub.id} pub={pub} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/publications" className="btn btn--ghost">
              View All Publications <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED LAB PROJECTS ── */}
      <section className="section section-alt home__lab">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Developer Lab</span>
            <h2 className="section-header__title">Latest from GitHub</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {latestRepos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/lab" className="btn btn--ghost">
              Explore Full Lab <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST WRITING (Live from Personal CMS) ── */}
      <section className="section home__writing">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Writing & Insights</span>
            <h2 className="section-header__title">Latest Articles</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {postsLoading ? (
              <div style={{ color: 'var(--text-tertiary)' }}>Loading recent posts...</div>
            ) : personalPosts && personalPosts.length > 0 ? (
              personalPosts.slice(0, 3).map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="writing__elitech-card glass" style={{ height: '100%', textDecoration: 'none' }}>
                  {post.thumbnail && (
                    <div className="writing__elitech-card-thumb" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="writing__elitech-card-body" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flexGrow: 1 }}>
                    <span className="post-card__tag" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)' }}>{post.category || 'Blog'}</span>
                    <h3 className="writing__elitech-card-title" style={{ color: 'var(--text-primary)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', lineHeight: 'var(--leading-snug)' }}>{post.title}</h3>
                    <p className="writing__elitech-card-excerpt" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                    <div className="post-card__meta" style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ color: 'var(--text-tertiary)' }}>No recent posts available.</div>
            )}
          </div>
          <div className="section-footer">
            <Link to="/blog" className="btn btn--outline">
              Read My Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="section section-alt home__about" ref={aboutRef}>
        <div className="container">
          <div className={`home__about-grid ${aboutVisible ? 'visible' : ''}`}>
            <div className="home__about-text">
              <span className="section-header__label">About</span>
              <h2 className="section-header__title">{aboutSnippet.headline}</h2>
              <div className="accent-line" style={{ marginBottom: 'var(--space-6)' }} />
              <p>{aboutSnippet.body}</p>
              <Link to="/about" className="btn btn--primary" style={{ marginTop: 'var(--space-6)' }}>
                Full Story <HiArrowRight />
              </Link>
            </div>
            <div className="home__about-credentials">
              {aboutSnippet.credentials.map((c, i) => (
                <div key={i} className="credential-badge glass">
                  <span className="credential-badge__icon">✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section home__testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Testimonials</span>
            <h2 className="section-header__title">What People Say</h2>
            <div className="accent-line" />
          </div>
          <div className="testimonials-scroll">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ELITECH CTA ── */}
      <section className="section home__elitech-cta" ref={ctaRef}>
        <div className={`home__elitech-banner ${ctaVisible ? 'visible' : ''}`}>
          <div className="container">
            <div className="home__elitech-content">
              <h2>Training the Next Generation of<br />
                <span className="gradient-text">Cybersecurity Professionals</span>
              </h2>
              <p>Elitech Hub combines technical cybersecurity education with behavioral psychology — building professionals who understand both the attack and the attacker.</p>
              <div className="home__elitech-actions">
                <Link to="/elitech" className="btn btn--primary">
                  Visit Elitech Hub <HiArrowRight />
                </Link>
                <a href={siteConfig.elitechUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  elitechub.com <HiExternalLink />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
