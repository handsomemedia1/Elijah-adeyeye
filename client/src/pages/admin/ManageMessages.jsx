import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { HiTrash, HiMail } from 'react-icons/hi';
import './Admin.css';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('portfolio_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('portfolio_messages').delete().eq('id', id);
    fetchMessages();
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Messages</h1>
      <p className="admin-page__subtitle">Messages from your portfolio contact form</p>

      {loading ? (
        <div className="admin-empty glass"><p>Loading messages...</p></div>
      ) : messages.length === 0 ? (
        <div className="admin-empty glass">
          <HiMail style={{ fontSize: '2rem', opacity: 0.4 }} />
          <p>No messages yet. When visitors send you a message, it will appear here.</p>
        </div>
      ) : (
        <div className="admin-messages-list">
          {messages.map(msg => (
            <div key={msg.id} className="admin-message-card glass">
              <div className="admin-message-card__header">
                <div>
                  <strong>{msg.name}</strong>
                  <a href={`mailto:${msg.email}`} className="admin-message-card__email">{msg.email}</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span className="admin-message-card__time">
                    {new Date(msg.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                  <button onClick={() => handleDelete(msg.id)} className="admin-action-btn admin-action-btn--danger" title="Delete">
                    <HiTrash />
                  </button>
                </div>
              </div>
              <p className="admin-message-card__body">{msg.message}</p>
              <a href={`mailto:${msg.email}?subject=Re: Portfolio Message&body=Hi ${msg.name},%0A%0A`} className="btn btn--outline btn--sm">
                Reply via Email
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
