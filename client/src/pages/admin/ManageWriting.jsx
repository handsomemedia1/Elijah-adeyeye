import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  HiPlus, HiPencil, HiTrash, HiExternalLink, HiEye,
  HiEyeOff, HiUpload, HiSearch, HiRefresh
} from 'react-icons/hi';
import './Admin.css';
import RichEditor from '../../components/RichEditor';

const EMPTY_POST = {
  title: '', slug: '', excerpt: '', body: '', category: 'General',
  tags: [], thumbnail: '', published: false, published_at: null,
  meta_title: '', meta_description: '', og_image: ''
};

const CATEGORIES = ['General', 'Cybersecurity', 'Psychology', 'AI', 'Education', 'Research', 'Technology'];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ManageWriting() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_POST);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState('editor'); // editor | seo | preview

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('portfolio_blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const openNew = () => { setForm(EMPTY_POST); setEditing('new'); setActiveTab('editor'); };
  const openEdit = (post) => {
    setForm({ ...post, tags: post.tags || [] });
    setEditing(post.id);
    setActiveTab('editor');
  };
  const closeEditor = () => { setEditing(null); setForm(EMPTY_POST); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug from title
      if (name === 'title' && (editing === 'new' || !prev.slug)) {
        updated.slug = slugify(value);
      }
      // Auto-fill SEO fields if empty
      if (name === 'title' && !prev.meta_title) {
        updated.meta_title = value;
      }
      if (name === 'excerpt' && !prev.meta_description) {
        updated.meta_description = value;
      }
      return updated;
    });
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `blog/${Date.now()}-${slugify(form.title || 'post')}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('portfolio-assets')
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(path);
      setForm(prev => ({ ...prev, thumbnail: publicUrl, og_image: prev.og_image || publicUrl }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (publish = false) => {
    if (!form.title || !form.slug) {
      alert('Title and slug are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        body: form.body,
        category: form.category,
        tags: form.tags,
        thumbnail: form.thumbnail,
        published: publish ? true : form.published,
        published_at: publish && !form.published_at ? new Date().toISOString() : form.published_at,
        meta_title: form.meta_title || form.title,
        meta_description: form.meta_description || form.excerpt,
        og_image: form.og_image || form.thumbnail,
        updated_at: new Date().toISOString(),
      };

      if (editing === 'new') {
        const { error } = await supabase.from('portfolio_blog_posts').insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_blog_posts').update(payload).eq('id', editing);
        if (error) throw error;
      }
      closeEditor();
      fetchPosts();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this post?')) return;
    await supabase.from('portfolio_blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  const togglePublish = async (post) => {
    const newState = !post.published;
    await supabase.from('portfolio_blog_posts').update({
      published: newState,
      published_at: newState && !post.published_at ? new Date().toISOString() : post.published_at,
    }).eq('id', post.id);
    fetchPosts();
  };

  const filtered = posts.filter(p => {
    if (filter === 'published' && !p.published) return false;
    if (filter === 'drafts' && p.published) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const wordCount = form.body ? form.body.split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // === RENDER ===
  if (editing !== null) {
    return (
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h1 className="admin-page__title">{editing === 'new' ? 'New Post' : 'Edit Post'}</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
              {wordCount} words · {readTime} min read
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn--ghost" onClick={closeEditor}>Cancel</button>
            <button className="btn btn--outline" onClick={() => handleSave(false)} disabled={saving}>
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button className="btn btn--primary" onClick={() => handleSave(true)} disabled={saving}>
              {saving ? 'Publishing...' : form.published ? 'Update & Publish' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--glass-border)', paddingBottom: 0 }}>
          {[
            { key: 'editor', label: '✏️ Editor' },
            { key: 'seo', label: '🔍 SEO' },
            { key: 'preview', label: '👁️ Preview' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === tab.key ? 'var(--color-primary)' : 'var(--text-tertiary)',
                borderBottom: activeTab === tab.key ? '2px solid var(--color-primary)' : '2px solid transparent',
                fontWeight: activeTab === tab.key ? 700 : 500, fontSize: '0.875rem',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Tab */}
        {activeTab === 'editor' && (
          <div className="admin-form">
            <div className="admin-form__field">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Your post title" style={{ fontSize: '1.25rem', fontWeight: 700, padding: '14px 16px' }} />
            </div>

            <div className="admin-form__row--2col">
              <div className="admin-form__field">
                <label>Slug *</label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="your-post-slug" />
              </div>
              <div className="admin-form__field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-form__field">
              <label>Excerpt</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="A short summary of your post (also used as meta description)" />
            </div>

            <div className="admin-form__field">
              <label>Body *</label>
              <RichEditor
                value={form.body}
                onChange={(html) => setForm(prev => ({ ...prev, body: html }))}
                placeholder="Start writing your post... Use the toolbar above for formatting."
              />
            </div>

            {/* Tags */}
            <div className="admin-form__field">
              <label>Tags</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {form.tags.map(tag => (
                  <span key={tag} className="admin-badge admin-badge--published" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => removeTag(tag)}>
                    {tag} ×
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Type a tag and press Enter"
                  style={{ flex: 1 }}
                />
                <button type="button" className="btn btn--ghost" onClick={addTag}>Add</button>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="admin-form__field">
              <label>Thumbnail</label>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {form.thumbnail && (
                  <img src={form.thumbnail} alt="Thumbnail" style={{ width: 120, height: 68, objectFit: 'cover', borderRadius: 8 }} />
                )}
                <label className="btn btn--outline" style={{ cursor: 'pointer' }}>
                  <HiUpload /> {uploading ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={handleThumbnailUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="admin-form">
            <div className="admin-section" style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Search Engine Preview</h3>
              <div className="glass" style={{ padding: 20 }}>
                <p style={{ color: '#8ab4f8', fontSize: '1.1rem', marginBottom: 4 }}>
                  {form.meta_title || form.title || 'Post Title'}
                </p>
                <p style={{ color: '#bdc1c6', fontSize: '0.8rem', marginBottom: 4 }}>
                  client-eight-hazel.vercel.app/blog/{form.slug || 'your-slug'}
                </p>
                <p style={{ color: '#9aa0a6', fontSize: '0.85rem', lineHeight: 1.4 }}>
                  {(form.meta_description || form.excerpt || 'Post description will appear here...').substring(0, 160)}
                </p>
              </div>
            </div>

            <div className="admin-form__field">
              <label>Meta Title <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>({(form.meta_title || '').length}/60 chars)</span></label>
              <input name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="SEO page title (falls back to post title)" />
            </div>

            <div className="admin-form__field">
              <label>Meta Description <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>({(form.meta_description || '').length}/160 chars)</span></label>
              <textarea name="meta_description" value={form.meta_description} onChange={handleChange} rows={3} placeholder="Page description for search results (falls back to excerpt)" />
            </div>

            <div className="admin-form__field">
              <label>OG Image URL</label>
              <input name="og_image" value={form.og_image} onChange={handleChange} placeholder="Social sharing image (falls back to thumbnail)" />
              {form.og_image && (
                <img src={form.og_image} alt="OG Preview" style={{ marginTop: 8, maxWidth: 300, borderRadius: 8 }} />
              )}
            </div>

            <div className="glass" style={{ padding: 16, marginTop: 8 }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: 8, color: 'var(--color-primary)' }}>📈 SEO Tips</h4>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16 }}>
                <li>Keep meta title under 60 characters for full display in search results</li>
                <li>Meta description should be 120-160 characters for optimal click-through</li>
                <li>Include your target keyword naturally in both title and description</li>
                <li>Use a compelling OG image (1200×630px) for social media sharing</li>
                <li>Your slug should contain relevant keywords separated by hyphens</li>
              </ul>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div style={{ maxWidth: 720 }}>
            {form.thumbnail && (
              <img src={form.thumbnail} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 12, marginBottom: 24 }} />
            )}
            <p style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{form.category}</p>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 12, lineHeight: 1.3 }}>{form.title || 'Untitled Post'}</h1>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 24 }}>
              {readTime} min read · {form.published_at ? new Date(form.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}
            </p>
            {form.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {form.tags.map(t => <span key={t} className="admin-badge admin-badge--published">{t}</span>)}
              </div>
            )}
            <div
              className="admin-preview-body"
              style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: form.body || '<p style="color:var(--text-tertiary)">Start writing to see the preview...</p>' }}
            />
          </div>
        )}
      </div>
    );
  }

  // === LIST VIEW ===
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Writing</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
            {posts.length} post{posts.length !== 1 ? 's' : ''} · {posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts
          </p>
        </div>
        <button className="btn btn--primary" onClick={openNew}>
          <HiPlus /> New Post
        </button>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['all', 'published', 'drafts'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn--primary' : 'btn--ghost'}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative', maxWidth: 320 }}>
          <HiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            style={{
              width: '100%', padding: '8px 12px 8px 36px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)',
              borderRadius: 8, color: 'var(--text-primary)', fontSize: '0.875rem',
            }}
          />
        </div>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="admin-empty glass"><p>Loading...</p></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty glass">
          <p>No posts found. Click <strong>"New Post"</strong> to start writing!</p>
        </div>
      ) : (
        <div className="admin-table-wrapper glass">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(post => (
                <tr key={post.id}>
                  <td>
                    {post.thumbnail ? (
                      <img src={post.thumbnail} alt="" style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (
                      <div style={{ width: 48, height: 32, borderRadius: 4, background: 'var(--glass-border)' }} />
                    )}
                  </td>
                  <td>
                    <strong style={{ cursor: 'pointer' }} onClick={() => openEdit(post)}>{post.title}</strong>
                    <br /><span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>/{post.slug}</span>
                  </td>
                  <td><span style={{ fontSize: '0.8rem' }}>{post.category}</span></td>
                  <td>
                    <span className={`admin-badge ${post.published ? 'admin-badge--published' : 'admin-badge--under-review'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{(post.views || 0).toLocaleString()}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                    {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button onClick={() => togglePublish(post)} className="admin-action-btn" title={post.published ? 'Unpublish' : 'Publish'}>
                        {post.published ? <HiEyeOff /> : <HiEye />}
                      </button>
                      <button onClick={() => openEdit(post)} className="admin-action-btn" title="Edit">
                        <HiPencil />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="admin-action-btn admin-action-btn--danger" title="Delete">
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
