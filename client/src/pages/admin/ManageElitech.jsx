import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { HiExternalLink, HiEye, HiRefresh } from 'react-icons/hi';
import './Admin.css';

export default function ManageElitech() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category, author, thumbnail, published, published_at, views')
      .eq('published', true)
      .order('published_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Elitech Hub</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
            {posts.length} synced posts from elitechub.com · {totalViews.toLocaleString()} total views
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn--ghost" onClick={fetchPosts}><HiRefresh /> Refresh</button>
          <a href="https://elitechub.com" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            <HiExternalLink /> Go to Elitech Hub
          </a>
        </div>
      </div>

      {loading ? (
        <div className="admin-empty glass"><p>Loading Elitech Hub posts...</p></div>
      ) : (
        <div className="admin-writing-grid">
          {posts.map(post => (
            <div key={post.id} className="admin-writing-card glass">
              {post.thumbnail && (
                <div className="admin-writing-card__thumb">
                  <img src={post.thumbnail} alt={post.title} />
                </div>
              )}
              <span className="admin-writing-card__category">{post.category || 'Blog'}</span>
              <h3 className="admin-writing-card__title">{post.title}</h3>
              <p className="admin-writing-card__excerpt">{post.excerpt}</p>
              <div className="admin-writing-card__meta">
                <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <HiEye /> {(post.views || 0).toLocaleString()}
                </span>
              </div>
              {post.slug && (
                <a href={`https://elitechub.com/blog-posts/${post.slug}.html`} target="_blank" rel="noopener noreferrer"
                  className="btn btn--ghost" style={{ fontSize: '0.75rem', padding: '6px 10px', marginTop: 4 }}>
                  View on Elitech Hub <HiExternalLink />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
