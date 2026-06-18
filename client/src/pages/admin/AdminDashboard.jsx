import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { HiOutlineMail, HiOutlineAcademicCap, HiOutlineDocumentText, HiOutlineEye, HiOutlineTrendingUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ messages: 0, publications: 0, blogs: 0, views: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [viewsByDay, setViewsByDay] = useState([]);
  const [topPages, setTopPages] = useState([]);

  useEffect(() => {
    async function loadStats() {
      const [msgRes, pubRes, blogRes, viewsRes] = await Promise.all([
        supabase.from('portfolio_messages').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_publications').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('portfolio_views').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        messages: msgRes.count || 0,
        publications: pubRes.count || 0,
        blogs: blogRes.count || 0,
        views: viewsRes.count || 0,
      });

      // Recent messages
      const { data: msgs } = await supabase
        .from('portfolio_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentMessages(msgs || []);

      // Views by day (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data: views } = await supabase
        .from('portfolio_views')
        .select('page, viewed_at')
        .gte('viewed_at', sevenDaysAgo.toISOString())
        .order('viewed_at', { ascending: true });

      if (views && views.length > 0) {
        // Group by day
        const days = {};
        const pageCounts = {};
        views.forEach(v => {
          const day = new Date(v.viewed_at).toLocaleDateString('en-US', { weekday: 'short' });
          days[day] = (days[day] || 0) + 1;
          pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
        });
        setViewsByDay(Object.entries(days).slice(-7));
        setTopPages(Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5));
      }
    }
    loadStats();
  }, []);

  const maxViews = Math.max(...viewsByDay.map(d => d[1]), 1);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Dashboard</h1>
      <p className="admin-page__subtitle">Welcome back, Elijah 👋</p>

      {/* Stat Cards */}
      <div className="admin-stats">
        <div className="admin-stat-card glass">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
            <HiOutlineEye style={{ color: '#06b6d4' }} />
          </div>
          <div>
            <p className="admin-stat-card__value">{stats.views.toLocaleString()}</p>
            <p className="admin-stat-card__label">Total Page Views</p>
          </div>
        </div>
        <div className="admin-stat-card glass">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(var(--color-primary-rgb), 0.15)' }}>
            <HiOutlineMail style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <p className="admin-stat-card__value">{stats.messages}</p>
            <p className="admin-stat-card__label">Messages</p>
          </div>
        </div>
        <div className="admin-stat-card glass">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
            <HiOutlineAcademicCap style={{ color: '#a855f7' }} />
          </div>
          <div>
            <p className="admin-stat-card__value">{stats.publications}</p>
            <p className="admin-stat-card__label">Publications</p>
          </div>
        </div>
        <div className="admin-stat-card glass">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
            <HiOutlineDocumentText style={{ color: '#22c55e' }} />
          </div>
          <div>
            <p className="admin-stat-card__value">{stats.blogs}</p>
            <p className="admin-stat-card__label">Elitech Hub Posts</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="admin-analytics-grid">
        <div className="admin-chart-card glass">
          <div className="admin-chart-card__header">
            <span className="admin-chart-card__title">Views This Week</span>
            <HiOutlineTrendingUp style={{ color: 'var(--color-primary)' }} />
          </div>
          {viewsByDay.length > 0 ? (
            <>
              <div className="admin-bar-chart">
                {viewsByDay.map(([day, count], i) => (
                  <div
                    key={i}
                    className="admin-bar-chart__bar"
                    style={{ height: `${(count / maxViews) * 100}%` }}
                    title={`${day}: ${count} views`}
                  />
                ))}
              </div>
              <div className="admin-bar-chart__label">
                {viewsByDay.map(([day], i) => (
                  <span key={i}>{day}</span>
                ))}
              </div>
            </>
          ) : (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              No view data yet. Views will appear as visitors browse your portfolio.
            </p>
          )}
        </div>

        <div className="admin-chart-card glass">
          <div className="admin-chart-card__header">
            <span className="admin-chart-card__title">Top Pages</span>
          </div>
          {topPages.length > 0 ? (
            <ul className="admin-top-pages">
              {topPages.map(([page, count]) => (
                <li key={page}>
                  <span className="admin-top-pages__path">{page}</span>
                  <span className="admin-top-pages__count">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              Page analytics will populate as your site receives traffic.
            </p>
          )}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="admin-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 className="admin-section__title" style={{ marginBottom: 0 }}>Recent Messages</h2>
          <Link to="/admin/messages" className="btn btn--ghost" style={{ fontSize: '0.8rem' }}>View All →</Link>
        </div>
        {recentMessages.length === 0 ? (
          <div className="admin-empty glass">
            <HiOutlineMail />
            <p>No messages yet. Once visitors use your contact form, they'll appear here.</p>
          </div>
        ) : (
          <div className="admin-messages-list">
            {recentMessages.map(msg => (
              <div key={msg.id} className="admin-message-card glass">
                <div className="admin-message-card__header">
                  <div>
                    <strong>{msg.name}</strong>
                    <span className="admin-message-card__email">{msg.email}</span>
                  </div>
                  <span className="admin-message-card__time">
                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="admin-message-card__body">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
