import { HiShieldExclamation } from 'react-icons/hi';

function maskPhone(phone) {
  // +2348031234567 -> +234 803 *** **67
  if (!phone || phone.length < 8) return phone;
  const visible = phone.slice(0, 7);
  const last2 = phone.slice(-2);
  const masked = '*'.repeat(Math.max(phone.length - 9, 3));
  return `${visible} ${masked} ${last2}`;
}

export default function LeaderBoard({ leaderboard, loading }) {
  if (loading) {
    return (
      <div className="ni-leaderboard glass">
        <div className="ni-leaderboard__loading">
          <div className="ni-leaderboard__spinner" />
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="ni-leaderboard glass">
        <div className="ni-leaderboard__empty">
          <HiShieldExclamation className="ni-leaderboard__empty-icon" />
          <p>No reports yet. Be the first to report a scam number.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ni-leaderboard glass">
      <div className="ni-leaderboard__header">
        <h3>
          <HiShieldExclamation /> Most Reported Numbers
        </h3>
        <span className="ni-leaderboard__badge">
          Live Data
        </span>
      </div>

      <div className="ni-leaderboard__list">
        {leaderboard.map((item, i) => (
          <div key={item.phone} className="ni-leaderboard__item">
            <span className={`ni-leaderboard__rank ${
              i === 0 ? 'ni-leaderboard__rank--1' :
              i === 1 ? 'ni-leaderboard__rank--2' :
              i === 2 ? 'ni-leaderboard__rank--3' : ''
            }`}>
              #{i + 1}
            </span>
            <div className="ni-leaderboard__info">
              <span className="ni-leaderboard__phone">{maskPhone(item.phone)}</span>
              <span className="ni-leaderboard__category">{item.topCategory}</span>
            </div>
            <span className="ni-leaderboard__count">
              {item.count} report{item.count !== 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
