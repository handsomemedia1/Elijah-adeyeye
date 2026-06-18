import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { HiPlus, HiPencil, HiTrash, HiExternalLink } from 'react-icons/hi';
import './Admin.css';

const EMPTY_PUB = {
  title: '', abstract: '', authors: '', published_date: '',
  status: 'Preprint', doi_link: '', pdf_url: '', venue: ''
};

export default function ManagePublications() {
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null or pub object
  const [form, setForm] = useState(EMPTY_PUB);
  const [saving, setSaving] = useState(false);

  const fetchPubs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('portfolio_publications')
      .select('*')
      .order('published_date', { ascending: false });
    setPubs(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPubs(); }, []);

  const openNew = () => { setForm(EMPTY_PUB); setEditing('new'); };
  const openEdit = (pub) => { setForm({ ...pub }); setEditing(pub.id); };
  const closeEditor = () => { setEditing(null); setForm(EMPTY_PUB); };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      delete payload.id;
      delete payload.created_at;

      if (editing === 'new') {
        const { error } = await supabase.from('portfolio_publications').insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_publications').update(payload).eq('id', editing);
        if (error) throw error;
      }
      closeEditor();
      fetchPubs();
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;
    const { error } = await supabase.from('portfolio_publications').delete().eq('id', id);
    if (error) alert('Error: ' + error.message);
    else fetchPubs();
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Publications</h1>
          <p className="admin-page__subtitle">Manage your research papers, preprints, and conference articles</p>
        </div>
        <button className="btn btn--primary" onClick={openNew}>
          <HiPlus /> Add Publication
        </button>
      </div>

      {/* Editor Modal */}
      {editing !== null && (
        <div className="admin-modal-overlay" onClick={closeEditor}>
          <div className="admin-modal glass" onClick={e => e.stopPropagation()}>
            <h2 className="admin-modal__title">{editing === 'new' ? 'New Publication' : 'Edit Publication'}</h2>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form__row">
                <div className="admin-form__field">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} required />
                </div>
              </div>
              <div className="admin-form__row admin-form__row--2col">
                <div className="admin-form__field">
                  <label>Authors *</label>
                  <input name="authors" value={form.authors} onChange={handleChange} required placeholder="Adeyeye, E., et al." />
                </div>
                <div className="admin-form__field">
                  <label>Venue / Journal</label>
                  <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g., IEEE S&P, Nature" />
                </div>
              </div>
              <div className="admin-form__row admin-form__row--2col">
                <div className="admin-form__field">
                  <label>Published Date *</label>
                  <input type="date" name="published_date" value={form.published_date} onChange={handleChange} required />
                </div>
                <div className="admin-form__field">
                  <label>Status</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Preprint">Preprint</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Published">Published</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>
              <div className="admin-form__row">
                <div className="admin-form__field">
                  <label>Abstract</label>
                  <textarea name="abstract" value={form.abstract} onChange={handleChange} rows={4} />
                </div>
              </div>
              <div className="admin-form__row admin-form__row--2col">
                <div className="admin-form__field">
                  <label>DOI Link</label>
                  <input name="doi_link" value={form.doi_link} onChange={handleChange} placeholder="https://doi.org/..." />
                </div>
                <div className="admin-form__field">
                  <label>PDF URL</label>
                  <input name="pdf_url" value={form.pdf_url} onChange={handleChange} placeholder="https://..." />
                </div>
              </div>
              <div className="admin-form__actions">
                <button type="button" className="btn btn--ghost" onClick={closeEditor}>Cancel</button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? 'Saving...' : editing === 'new' ? 'Add Publication' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publications List */}
      {loading ? (
        <div className="admin-empty glass"><p>Loading publications...</p></div>
      ) : pubs.length === 0 ? (
        <div className="admin-empty glass">
          <p>No publications added yet. Click "Add Publication" to get started.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper glass">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pubs.map(pub => (
                <tr key={pub.id}>
                  <td>
                    <strong>{pub.title}</strong>
                    <br /><span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{pub.authors}</span>
                  </td>
                  <td>{pub.venue || '—'}</td>
                  <td>{pub.published_date}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${pub.status?.toLowerCase().replace(' ', '-')}`}>
                      {pub.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      {pub.doi_link && (
                        <a href={pub.doi_link} target="_blank" rel="noopener noreferrer" className="admin-action-btn" title="View DOI">
                          <HiExternalLink />
                        </a>
                      )}
                      <button onClick={() => openEdit(pub)} className="admin-action-btn" title="Edit">
                        <HiPencil />
                      </button>
                      <button onClick={() => handleDelete(pub.id)} className="admin-action-btn admin-action-btn--danger" title="Delete">
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
