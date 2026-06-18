import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { HiUpload, HiDocumentDownload, HiCheck } from 'react-icons/hi';
import './Admin.css';

export default function ManageSettings() {
  const [settings, setSettings] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('portfolio_settings')
        .select('*')
        .limit(1)
        .single();
      setSettings(data);
    }
    load();
  }, []);

  const handleFileUpload = async (e, fieldKey, folderName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && file.type !== 'application/zip') {
      alert('Please upload a PDF or ZIP file');
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${folderName}/Elijah_Adeyeye_${folderName}_${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('portfolio_settings')
        .update({ [fieldKey]: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', settings.id);

      if (updateError) throw updateError;

      setSettings(prev => ({ ...prev, [fieldKey]: publicUrl }));
      setSuccess(`${fieldKey.replace('_url', '').replace('_', ' ')} uploaded successfully!`);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Settings</h1>
      <p className="admin-page__subtitle">Manage your portfolio configuration</p>

      {/* CV Management */}
      <div className="admin-section">
        <h2 className="admin-section__title">CV / Resume</h2>
        <div className="admin-settings-card glass">
          <div className="admin-settings-card__info">
            <HiDocumentDownload style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
            <div>
              <p style={{ fontWeight: 'var(--weight-bold)' }}>Current CV</p>
              {settings?.cv_url ? (
                <a href={settings.cv_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>
                  View current CV ↗
                </a>
              ) : (
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  No CV uploaded yet. Using the default file from assets.
                </p>
              )}
            </div>
          </div>
          <label className="btn btn--primary admin-upload-btn">
            <HiUpload /> {uploading ? 'Uploading...' : 'Upload New CV'}
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'cv_url', 'cv')}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Media Kit */}
        <h2 className="admin-section__title" style={{ marginTop: '24px' }}>Media/Press Kit</h2>
        <div className="admin-settings-card glass">
          <div className="admin-settings-card__info">
            <HiDocumentDownload style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
            <div>
              <p style={{ fontWeight: 'var(--weight-bold)' }}>Current Media Kit</p>
              {settings?.media_kit_url ? (
                <a href={settings.media_kit_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>
                  View current Media Kit ↗
                </a>
              ) : (
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  No Media Kit uploaded yet. (Upload a ZIP or PDF).
                </p>
              )}
            </div>
          </div>
          <label className="btn btn--primary admin-upload-btn">
            <HiUpload /> {uploading ? 'Uploading...' : 'Upload Media Kit'}
            <input
              type="file"
              accept=".pdf,.zip"
              onChange={(e) => handleFileUpload(e, 'media_kit_url', 'media-kit')}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Speaker Bio */}
        <h2 className="admin-section__title" style={{ marginTop: '24px' }}>Speaker Bio</h2>
        <div className="admin-settings-card glass">
          <div className="admin-settings-card__info">
            <HiDocumentDownload style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
            <div>
              <p style={{ fontWeight: 'var(--weight-bold)' }}>Current Speaker Bio</p>
              {settings?.speaker_bio_url ? (
                <a href={settings.speaker_bio_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>
                  View current Speaker Bio ↗
                </a>
              ) : (
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  No Speaker Bio uploaded yet. (Upload a PDF).
                </p>
              )}
            </div>
          </div>
          <label className="btn btn--primary admin-upload-btn">
            <HiUpload /> {uploading ? 'Uploading...' : 'Upload Speaker Bio'}
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'speaker_bio_url', 'speaker-bio')}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>
        {success && (
          <div className="admin-success-msg">
            <HiCheck /> {success}
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="admin-section">
        <h2 className="admin-section__title">Account</h2>
        <div className="admin-settings-card glass">
          <div className="admin-settings-card__info">
            <div>
              <p style={{ fontWeight: 'var(--weight-bold)' }}>Password</p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                To change your password, use the "Forgot Password" flow on the login page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
