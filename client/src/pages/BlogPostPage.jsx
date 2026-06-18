import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { HiArrowLeft, HiClock, HiEye, HiTag } from 'react-icons/hi';
import './BlogPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (data) {
        setPost(data);

        // Increment view count
        await supabase
          .from('portfolio_blog_posts')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id);

        // Fetch related posts (same category)
        const { data: related } = await supabase
          .from('portfolio_blog_posts')
          .select('id, title, slug, thumbnail, category, published_at')
          .eq('published', true)
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);
        setRelatedPosts(related || []);
      }
      setLoading(false);
    }
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post__loading">
        <div className="writing__loading-spinner" style={{
          width: 32, height: 32, margin: '20vh auto',
          border: '3px solid var(--glass-border)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
          This post doesn't exist or hasn't been published yet.
        </p>
        <Link to="/blog" className="btn btn--primary">← Back to Blog</Link>
      </div>
    );
  }

  const wordCount = post.body ? post.body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="blog-post">
      <Helmet>
        <title>{post.meta_title || post.title} | Elijah Adeyeye</title>
        <meta name="description" content={post.meta_description || post.excerpt || ''} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
        {(post.og_image || post.thumbnail) && (
          <meta property="og:image" content={post.og_image || post.thumbnail} />
        )}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:author" content="Elijah Adeyeye" />
        <link rel="canonical" href={`https://client-eight-hazel.vercel.app/blog/${post.slug}`} />

        {/* JSON-LD Structured Data for Google */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.meta_description || post.excerpt,
          "image": post.og_image || post.thumbnail,
          "datePublished": post.published_at,
          "dateModified": post.updated_at || post.published_at,
          "author": {
            "@type": "Person",
            "name": "Elijah Adeyeye",
            "url": "https://client-eight-hazel.vercel.app"
          },
          "publisher": {
            "@type": "Person",
            "name": "Elijah Adeyeye"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://client-eight-hazel.vercel.app/blog/${post.slug}`
          }
        })}</script>
      </Helmet>

      {/* Back button */}
      <div className="container">
        <Link to="/blog" className="blog-post__back">
          <HiArrowLeft /> Back to Blog
        </Link>
      </div>

      {/* Hero */}
      {post.thumbnail && (
        <div className="blog-post__hero">
          <div className="container">
            <img src={post.thumbnail} alt={post.title} className="blog-post__hero-img" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container">
        <div className="blog-post__content">
          <header className="blog-post__header">
            <span className="blog__category-tag">{post.category}</span>
            <h1 className="blog-post__title">{post.title}</h1>
            <div className="blog-post__meta">
              <span className="blog-post__meta-item">
                <HiClock /> {readTime} min read
              </span>
              <span className="blog-post__meta-item">
                <HiEye /> {(post.views || 0).toLocaleString()} views
              </span>
              <span className="blog-post__meta-item">
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post__tags">
                {post.tags.map(t => (
                  <span key={t} className="blog-post__tag"><HiTag /> {t}</span>
                ))}
              </div>
            )}
          </header>

          {/* Post Body */}
          <div
            className="blog-post__body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Author Card */}
          <div className="blog-post__author glass">
            <div className="blog-post__author-info">
              <strong>Elijah Adeyeye</strong>
              <p>Cybersecurity Researcher · Cyberpsychologist · Software Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="blog-post__related">
          <div className="container">
            <h2 className="blog-post__related-title">Related Posts</h2>
            <div className="blog__grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="blog__card glass">
                  {rp.thumbnail && (
                    <div className="blog__card-thumb">
                      <img src={rp.thumbnail} alt={rp.title} loading="lazy" />
                    </div>
                  )}
                  <div className="blog__card-body">
                    <span className="blog__category-tag">{rp.category}</span>
                    <h3 className="blog__card-title">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
