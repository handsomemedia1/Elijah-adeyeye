import { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiExternalLink, HiEye } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa6';
import { blogPosts } from '../data/siteData';
import { useElitechBlogs } from '../hooks/useElitechBlogs';
import './WritingPage.css';

const tags = ['All', 'Cybersecurity', 'Psychology', 'AI', 'Education'];

export default function WritingPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('All');
  const [expandedPost, setExpandedPost] = useState(null);

  // Live Elitech Hub blogs from Supabase
  const { posts: elitechPosts, trending, loading: elitechLoading } = useElitechBlogs(20);

  const filtered = blogPosts.filter(p => {
    if (typeFilter === 'articles' && p.type !== 'article') return false;
    if (typeFilter === 'linkedin' && p.type !== 'linkedin') return false;
    if (typeFilter === 'elitech') return false; // Elitech posts have their own section
    if (tagFilter !== 'All' && !p.tags.includes(tagFilter)) return false;
    return true;
  });

  const featured = blogPosts.find(p => p.featured);

  // Show elitech section when filter is 'all' or 'elitech'
  const showElitech = typeFilter === 'all' || typeFilter === 'elitech';

  return (
    <div className="writing page-enter">
      <SEO
        title="Writing — Blog & Insights"
        description="Thoughts on cybersecurity, psychology, and technology. Long-form articles, Elitech Hub blogs, and LinkedIn thought leadership."
        path="/writing"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: "url('/assets/images/backgrounds/hero_bg_writing_1776720496242.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.6) contrast(1.2)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Blog & Insights</span>
          <h1 className="page-hero__title"><span className="gradient-text">Writing</span></h1>
          <p className="page-hero__subtitle">Long-form articles, Elitech Hub blogs, and LinkedIn thought leadership</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="writing__filters">
            <div className="writing__type-toggle">
              {['all', 'elitech', 'linkedin'].map(type => (
                <button
                  key={type}
                  className={`writing__type-btn ${typeFilter === type ? 'writing__type-btn--active' : ''}`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type === 'all' ? 'All' : type === 'elitech' ? '🌐 Elitech Hub' : '💼 LinkedIn Posts'}
                </button>
              ))}
            </div>
          </div>

          {/* ── Elitech Hub Live Blog Section ── */}
          {showElitech && (
            <div className="writing__elitech-section">
              <div className="section-header" style={{ marginBottom: 'var(--space-8)' }}>
                <span className="section-header__label">Live from Elitech Hub</span>
                <h2 className="section-header__title">Elitech Hub Blog</h2>
                <div className="accent-line" />
                <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                  Posts synced automatically from <a href="https://elitechub.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>elitechub.com</a>
                </p>
              </div>

              {elitechLoading ? (
                <div className="writing__loading">
                  <div className="writing__loading-spinner" />
                  <p>Fetching latest posts from Elitech Hub...</p>
                </div>
              ) : elitechPosts.length > 0 ? (
                <>
                  {/* Trending Post */}
                  {trending && typeFilter !== 'linkedin' && (
                    <a
                      href={`https://elitechub.com/blog-posts/${trending.slug}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="writing__trending glass"
                    >
                      <div className="writing__trending-badge">🔥 Trending on Elitech Hub</div>
                      {trending.thumbnail && (
                        <div className="writing__trending-thumb">
                          <img src={trending.thumbnail} alt={trending.title} />
                        </div>
                      )}
                      <div className="writing__trending-content">
                        <span className="post-card__tag">{trending.category || 'Blog'}</span>
                        <h2 className="writing__trending-title">{trending.title}</h2>
                        <p className="writing__trending-excerpt">{trending.excerpt}</p>
                        <div className="post-card__meta">
                          <span>{new Date(trending.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          {trending.views > 0 && (
                            <span className="writing__views"><HiEye /> {trending.views} views</span>
                          )}
                        </div>
                      </div>
                    </a>
                  )}

                  {/* Elitech Posts Grid */}
                  <div className="writing__elitech-grid">
                    {elitechPosts.filter(p => !trending || p.id !== trending.id).map(post => (
                      <a
                        key={post.id}
                        href={`https://elitechub.com/blog-posts/${post.slug}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="writing__elitech-card glass"
                      >
                        {post.thumbnail && (
                          <div className="writing__elitech-card-thumb">
                            <img src={post.thumbnail} alt={post.title} />
                          </div>
                        )}
                        <div className="writing__elitech-card-body">
                          <span className="post-card__tag">{post.category || 'Blog'}</span>
                          <h3 className="writing__elitech-card-title">{post.title}</h3>
                          <p className="writing__elitech-card-excerpt">{post.excerpt}</p>
                          <div className="post-card__meta">
                            <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            {post.views > 0 && (
                              <span className="writing__views"><HiEye /> {post.views}</span>
                            )}
                            <span className="writing__elitech-link">
                              Read on Elitech Hub <HiExternalLink />
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="writing__empty glass">
                  <p>No posts available from Elitech Hub right now.</p>
                </div>
              )}
            </div>
          )}

          {/* ── LinkedIn Posts Section ── */}
          {(typeFilter === 'all' || typeFilter === 'linkedin') && (
            <>
              {typeFilter === 'all' && (
                <div className="section-header" style={{ marginTop: 'var(--space-16)', marginBottom: 'var(--space-8)' }}>
                  <span className="section-header__label">Thought Leadership</span>
                  <h2 className="section-header__title">LinkedIn Posts</h2>
                  <div className="accent-line" />
                </div>
              )}

              {/* Featured Post */}
              {featured && typeFilter !== 'elitech' && tagFilter === 'All' && (
                <div className="writing__featured glass" onClick={() => setExpandedPost(featured.id === expandedPost ? null : featured.id)}>
                  <div className="writing__featured-badge">
                    <FaLinkedinIn /> Featured Post
                  </div>
                  <h2 className="writing__featured-title">{featured.title}</h2>
                  <p className="writing__featured-excerpt">{featured.excerpt}</p>
                  <div className="post-card__meta">
                    <span>{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              )}

              {/* Posts Grid */}
              <div className="writing__list">
                {filtered.map(post => (
                  <article key={post.id} className="writing__post glass">
                    <div className="writing__post-header">
                      <div className="post-card__tags">
                        {post.tags.map(t => (
                          <span key={t} className="post-card__tag">{t}</span>
                        ))}
                        {post.type === 'linkedin' && (
                          <span className="writing__linkedin-badge">
                            <FaLinkedinIn /> LinkedIn
                          </span>
                        )}
                      </div>
                      <div className="post-card__meta">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="writing__post-title">{post.title}</h3>
                    <p className="writing__post-excerpt">{post.excerpt}</p>

                    {expandedPost === post.id && (
                      <div className="writing__post-content">
                        {post.content.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    )}

                    <div className="writing__post-actions">
                      <button
                        className="btn btn--ghost"
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      >
                        {expandedPost === post.id ? 'Show Less' : 'Read Full Article'} {expandedPost !== post.id && <HiArrowRight />}
                      </button>
                      {post.linkedinUrl && (
                        <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                          <FaLinkedinIn /> View on LinkedIn
                        </a>
                      )}
                    </div>

                    {post.type === 'linkedin' && (
                      <p className="writing__attribution">Originally posted on LinkedIn</p>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
