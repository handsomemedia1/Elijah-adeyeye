import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiExternalLink, HiStar } from 'react-icons/hi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { supabase } from '../lib/supabase';
import {
  siteConfig, publications, aboutSnippet,
  featuredProjects, researchInterests
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
      <Link to={`/publications/${pub.slug}`} className="pub-card__link">
        Read More <HiArrowRight />
      </Link>
    </div>
  );
}

function ResearchPillarCard({ pillar }) {
  const [ref, visible] = useScrollReveal();
  return (
    <Link to={`/research/${pillar.slug}`} className={`research-pillar glass ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="research-pillar__icon">{pillar.icon}</div>
      <h3 className="research-pillar__title">{pillar.title}</h3>
      <p className="research-pillar__desc">{pillar.description}</p>
    </Link>
  );
}

function ProjectCard({ project }) {
  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <Link to={`/projects/${slug}`} className="project-card glass">
      <h4 className="project-card__name">{project.name}</h4>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__meta">
        <span className="skill-tag">{project.category}</span>
      </div>
    </Link>
  );
}

export default function HomePage() {
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

  return (
    <div className="home">
      <SEO
        title={`${siteConfig.name} | ${siteConfig.title}`}
        description={siteConfig.descriptor}
        path="/"
      />
      {/* ── HERO SECTION ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg-image" style={{ opacity: 0.1 }} />
        <div className="hero__content container">
          <div className={`hero__text ${heroVisible ? 'visible' : ''}`}>
            <h1 className="hero__name">
              Elijah Adeyeye
            </h1>
            <p className="hero__title gradient-text">{siteConfig.title}</p>
            <p className="hero__descriptor">
              {siteConfig.descriptor}
            </p>
            <p className="hero__tagline">{siteConfig.tagline}</p>
            <div className="hero__ctas">
              <Link to="/research" className="btn btn--primary">
                Explore My Research <HiArrowRight />
              </Link>
              <Link to="/publications" className="btn btn--outline">
                View Publications
              </Link>
              <Link to="/cv" className="btn btn--ghost">
                Download CV
              </Link>
            </div>
          </div>
          <div className={`hero__image ${heroVisible ? 'visible' : ''}`}>
            <div className="hero__photo-wrapper" style={{ boxShadow: 'none' }}>
              <img src="/assets/images/profile/profile.jpg" alt="Elijah Adeyeye" className="hero__photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH PILLARS ── */}
      <section className="section home__research">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Focus Areas</span>
            <h2 className="section-header__title">Research Pillars</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {researchInterests.map((pillar, i) => (
              <ResearchPillarCard key={i} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PUBLICATIONS ── */}
      <section className="section section-alt home__publications">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Academic Output</span>
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

      {/* ── FEATURED PROJECTS ── */}
      <section className="section home__projects">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Applied Technology</span>
            <h2 className="section-header__title">Research Projects</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/lab" className="btn btn--ghost">
              Explore Full Lab <HiArrowRight />
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

      {/* ── LATEST WRITING ── */}
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

      {/* ── ELITECH CTA ── */}
      <section className="section section-alt home__elitech-cta" ref={ctaRef}>
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
