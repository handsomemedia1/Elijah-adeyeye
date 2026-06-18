import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './BlogPage.css';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [headerRef, headerVisible] = useScrollReveal();

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('portfolio_blog_posts')
        .select('id, title, slug, excerpt, category, tags, thumbnail, published_at, views, meta_description')
        .eq('published', true)
        .order('published_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
  const featuredPost = posts[0]; // Most recent post

  return (
    <div className="blog">
      <Helmet>
        <title>Blog | Elijah Adeyeye</title>
        <meta name="description" content="Insights on cybersecurity, psychology, AI, and technology by Elijah Adeyeye." />
        <meta property="og:title" content="Blog | Elijah Adeyeye" />
        <meta property="og:description" content="Insights on cybersecurity, psychology, AI, and technology by Elijah Adeyeye." />
      </Helmet>

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
            <Link to={`/blog/${featuredPost.slug}`} className="blog__featured-card glass">
              {featuredPost.thumbnail && (
                <div className="blog__featured-thumb">
                  <img src={featuredPost.thumbnail} alt={featuredPost.title} />
                </div>
              )}
              <div className="blog__featured-content">
                <span className="blog__category-tag">{featuredPost.category}</span>
                <h2 className="blog__featured-title">{featuredPost.title}</h2>
                <p className="blog__featured-excerpt">{featuredPost.excerpt || featuredPost.meta_description}</p>
                <div className="blog__meta">
                  <span>{new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{(featuredPost.views || 0).toLocaleString()} views</span>
                </div>
              </div>
            </Link>
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
  const readTime = Math.max(1, Math.ceil((post.views || 100) / 200)); // estimate

  return (
    <Link to={`/blog/${post.slug}`} className={`blog__card glass ${visible ? 'visible' : ''}`} ref={ref}>
      {post.thumbnail && (
        <div className="blog__card-thumb">
          <img src={post.thumbnail} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="blog__card-body">
        <span className="blog__category-tag">{post.category}</span>
        <h3 className="blog__card-title">{post.title}</h3>
        <p className="blog__card-excerpt">{post.excerpt}</p>
        <div className="blog__meta">
          <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>{(post.views || 0).toLocaleString()} views</span>
        </div>
      </div>
    </Link>
  );
}
