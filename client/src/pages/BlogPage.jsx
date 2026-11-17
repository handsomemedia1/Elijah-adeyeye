import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowUpRight, LuSearch, LuX, LuNewspaper, LuChevronDown } from 'react-icons/lu';
import BlogCard, { PostMeta, formatPostDate as formatDate } from '../components/BlogCard';
import { FaLinkedinIn } from 'react-icons/fa6';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useElitechBlogs } from '../hooks/useElitechBlogs';
import { blogPosts, elitechBlogUrl, elitechImageUrl, elitechPostUrl } from '../data/siteData';
import { ELITECH_ID, PERSON_ID } from '../config/site';
import './BlogPage.css';

/**
 * A hub that points to posts published on Elitech Hub. It shows titles and short excerpts only,
 * and every link goes to the post on Elitech Hub, so the two sites never compete for the same search.
 */
export default function BlogPage() {
  const { posts, loading, error } = useElitechBlogs(100);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const counts = new Map();
    posts.forEach((p) => p.category && counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return [['All', posts.length], ...[...counts].sort((a, b) => b[1] - a[1])];
  }, [posts]);

  const search = query.trim().toLowerCase();
  const filtered = posts.filter((p) =>
    (category === 'All' || p.category === category)
    && (!search || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(search)));

  const browsing = category === 'All' && !search;
  const [featured, ...rest] = filtered;
  const gridPosts = browsing ? rest : filtered;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Articles by Elijah Adeyeye on Elitech Hub',
    itemListElement: posts.slice(0, 50).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'BlogPosting',
        headline: p.title,
        url: elitechPostUrl(p.slug),
        mainEntityOfPage: elitechPostUrl(p.slug),
        datePublished: p.published_at,
        author: { '@id': PERSON_ID },
        publisher: { '@id': ELITECH_ID },
      },
    })),
  };

  return (
    <div className="blog">
      <SEO
        title="Blog"
        description="Articles by Elijah Adeyeye on cybersecurity, AI, human behaviour and technology, published on Elitech Hub."
        path="/blog"
        pageType="CollectionPage"
        jsonLd={posts.length ? [itemList] : []}
      />

      <header className="blog-hero">
        <div className="blog-hero__glow" aria-hidden="true" />
        <div className="container blog-hero__inner">
          <p className="blog-hero__eyebrow">
            <LuNewspaper aria-hidden="true" /> Blog
            {posts.length > 0 && <span className="blog-hero__count">{posts.length} articles</span>}
          </p>
          <h1 className="blog-hero__title">
            Notes on security, AI &amp; the <span className="gradient-text">human factor</span>
          </h1>
          <p className="blog-hero__lede">
            Research-led writing on cybersecurity, behaviour and technology. Every article is published on
            {' '}<a href={elitechBlogUrl} target="_blank" rel="noopener">Elitech Hub</a>, where you can read it in full.
          </p>
        </div>
      </header>

      <section className="container blog-toolbar" aria-label="Filter articles">
        <label className="blog-search">
          <LuSearch aria-hidden="true" />
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><LuX /></button>
          )}
        </label>
        <div className="blog-chips" role="group" aria-label="Categories">
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={`blog-chip ${category === name ? 'blog-chip--active' : ''}`}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name} <span className="blog-chip__count">{count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container blog-posts" aria-live="polite">
        {loading ? (
          <div className="blog-grid">
            {Array.from({ length: 6 }, (_, i) => <div key={i} className="blog-card blog-card--skeleton" />)}
          </div>
        ) : error && posts.length === 0 ? (
          <p className="blog-empty">
            Articles couldn&apos;t load. <a href={elitechBlogUrl} target="_blank" rel="noopener">Read them on Elitech Hub</a>.
          </p>
        ) : filtered.length === 0 ? (
          <p className="blog-empty">No articles match that. Try another word or category.</p>
        ) : (
          <>
            {browsing && featured && <FeaturedPost post={featured} />}
            <PostGrid posts={gridPosts} />
          </>
        )}
      </section>

      <LinkedInNotes />

      <section className="container">
        <div className="blog-cta">
          <div>
            <h2 className="blog-cta__title">Want new articles as they land?</h2>
            <p>Subscribe on the contact page, or follow along on Elitech Hub.</p>
          </div>
          <div className="blog-cta__actions">
            <Link to="/contact" className="btn btn--primary">Subscribe</Link>
            <a href={elitechBlogUrl} target="_blank" rel="noopener" className="btn btn--outline">
              Elitech Hub blog <LuArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedPost({ post }) {
  return (
    <article className="blog-featured">
      <a href={elitechPostUrl(post.slug)} target="_blank" rel="noopener" className="blog-featured__link">
        {post.thumbnail && (
          <div className="blog-featured__media">
            <img src={elitechImageUrl(post.thumbnail)} alt="" width="1200" height="675" fetchPriority="high" />
          </div>
        )}
        <div className="blog-featured__body">
          <p className="blog-featured__label">Latest{post.category ? ` · ${post.category}` : ''}</p>
          <h2 className="blog-featured__title">{post.title}</h2>
          <p className="blog-featured__excerpt">{post.excerpt}</p>
          <PostMeta post={post} />
          <span className="blog-readmore">Read on Elitech Hub <LuArrowUpRight aria-hidden="true" /></span>
        </div>
      </a>
    </article>
  );
}

function PostGrid({ posts }) {
  const [ref, visible] = useScrollReveal({ threshold: 0, rootMargin: '0px 0px -40px 0px' });
  if (!posts.length) return null;

  return (
    <div className={`blog-grid stagger ${visible ? 'visible' : ''}`} ref={ref}>
      {posts.map((post) => <BlogCard key={post.id} post={post} />)}
    </div>
  );
}

function LinkedInNotes() {
  const [open, setOpen] = useState(null);
  const [ref, visible] = useScrollReveal({ threshold: 0, rootMargin: '0px 0px -40px 0px' });
  const notes = blogPosts.filter((p) => p.type === 'linkedin');
  if (!notes.length) return null;

  return (
    <section className="container blog-notes" aria-labelledby="linkedin-notes">
      <div className="blog-section-head">
        <h2 id="linkedin-notes"><FaLinkedinIn aria-hidden="true" /> From LinkedIn</h2>
        <p>Shorter thoughts first shared on LinkedIn.</p>
      </div>
      <div className={`blog-notes__list stagger ${visible ? 'visible' : ''}`} ref={ref}>
        {notes.map((note) => {
          const expanded = open === note.id;
          return (
            <article key={note.id} className={`blog-note ${expanded ? 'blog-note--open' : ''}`}>
              <p className="blog-meta">
                <time dateTime={note.date}>{formatDate(note.date)}</time>
                {note.readTime && <span>{note.readTime}</span>}
              </p>
              <h3 className="blog-note__title">{note.title}</h3>
              <p className="blog-note__excerpt">{note.excerpt}</p>
              {expanded && (
                <div className="blog-note__content">
                  {note.content.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
              )}
              <div className="blog-note__actions">
                <button type="button" className="blog-note__toggle" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : note.id)}>
                  {expanded ? 'Show less' : 'Read here'} <LuChevronDown aria-hidden="true" />
                </button>
                {note.linkedinUrl && (
                  <a href={note.linkedinUrl} target="_blank" rel="noopener" className="blog-readmore">
                    View on LinkedIn <LuArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
