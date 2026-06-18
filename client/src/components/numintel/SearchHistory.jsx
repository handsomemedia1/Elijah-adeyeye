import { HiClock, HiTrash, HiChevronRight } from 'react-icons/hi';

export default function SearchHistory({ history, onSelect, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="ni-history glass">
      <div className="ni-history__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <HiClock /> Recent Searches
        </h3>
        <button 
          onClick={onClear}
          className="btn btn--outline"
          style={{ padding: 'var(--space-1) var(--space-3)', fontSize: 'var(--text-sm)' }}
        >
          <HiTrash /> Clear
        </button>
      </div>

      <div className="ni-history__list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {history.map((item, i) => (
          <button 
            key={i}
            className="ni-history__item"
            onClick={() => onSelect(item.phone)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: 'var(--space-3)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s ease'
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.formatted}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', gap: 'var(--space-3)' }}>
                <span style={{ color: item.carrierColor }}>{item.carrierName}</span>
                <span>Score: {item.score}</span>
              </div>
            </div>
            <HiChevronRight style={{ color: 'var(--text-tertiary)' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
