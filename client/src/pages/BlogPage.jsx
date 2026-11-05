import { useState } from 'react';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useElitechBlogs } from '../hooks/useElitechBlogs';
import { elitechBlogUrl, elitechImageUrl, elitechPostUrl } from '../data/siteData';
import './BlogPage.css';

const formatDate = (iso, month) =>
  new Date(iso).toLocaleDateString('en-US', { timeZone: 'UTC', month, day: 'numeric', year: 'numeric' });

export default function BlogPage() {
  const { posts, loading, error } = useElitechBlogs(100);
  const [activeCategory, setActiveCategory] = useState('All');
  const [headerRef, headerVisible] = useScrollReveal();

  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
  const featuredPost = posts[0]; // Most recent post

  return (
    <div className="blog">
      <SEO
        title="Blog"
        description="Insights on cybersecurity, psychology, AI, and technology by Elijah Adeyeye, published on Elitech Hub."
        path="/blog"
      />

      {/* Hero */}
      <section className="blog__hero" ref={headerRef}>
        <div className={`container ${headerVisible ? 'visible' : ''}`}>
          <span className="section-header__label">Blog</span>
          <h1 className="blog__hero-title">Insights & Perspectives</h1>
          <p className="blog__hero-subtitle">
            Thoughts on cybersecurity, psychology, technology, and the intersection of it all.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="blog__featured">
          <div className="container">
            <a href={elitechPostUrl(featuredPost.slug)} target="_blank" rel="noopener noreferrer" className="blog__featured-card glass">
              {featuredPost.thumbnail && (
                <div className="blog__featured-thumb">
                  <img src={elitechImageUrl(featuredPost.thumbnail)} alt={featuredPost.title} />
                </div>
              )}
              <div className="blog__featured-content">
                <span className="blog__category-tag">{featuredPost.category}</span>
                <h2 className="blog__featured-title">{featuredPost.title}</h2>
                <p className="blog__featured-excerpt">{featuredPost.excerpt}</p>
                <div className="blog__meta">
                  <span>{formatDate(featuredPost.published_at, 'long')}</span>
                  <span>·</span>
                  <span>{(featuredPost.views || 0).toLocaleString('en-US')} views</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="blog__filters">
        <div className="container">
          <div className="blog__filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`blog__filter-btn ${activeCategory === cat ? 'blog__filter-btn--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="blog__grid-section">
        <div className="container">
          {loading ? (
            <div className="blog__loading">Loading posts...</div>
          ) : error && posts.length === 0 ? (
            <div className="blog__empty">
              <p>Posts couldn't load. <a href={elitechBlogUrl} target="_blank" rel="noopener noreferrer">Read them on Elitech Hub</a>.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="blog__empty">
              <p>No posts in this category yet.</p>
            </div>
          ) : (
            <div className="blog__grid">
              {filtered.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }) {
  const [ref, visible] = useScrollReveal();

  return (
    <a href={elitechPostUrl(post.slug)} target="_blank" rel="noopener noreferrer" className={`blog__card glass ${visible ? 'visible' : ''}`} ref={ref}>
      {post.thumbnail && (
        <div className="blog__card-thumb">
          <img src={elitechImageUrl(post.thumbnail)} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="blog__card-body">
        <span className="blog__category-tag">{post.category}</span>
        <h3 className="blog__card-title">{post.title}</h3>
        <p className="blog__card-excerpt">{post.excerpt}</p>
        <div className="blog__meta">
          <span>{formatDate(post.published_at, 'short')}</span>
          <span>{(post.views || 0).toLocaleString('en-US')} views</span>
        </div>
      </div>
    </a>
  );
}
