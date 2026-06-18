import { useState, useEffect } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { getScoreCategory } from '../../data/numIntelData';

export default function ReputationScore({ score, reasons }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const category = getScoreCategory(score);
  
  // Animate score from 0 to final value
  useEffect(() => {
    setAnimatedScore(0);
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);

  const circumference = 2 * Math.PI * 54; // radius = 54
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="ni-score glass">
      <div className="ni-score__ring-container">
        <svg className="ni-score__svg" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Score arc */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={category.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="ni-score__arc"
            style={{ filter: `drop-shadow(0 0 8px ${category.color})` }}
          />
        </svg>
        <div className="ni-score__value">
          <span className="ni-score__number" style={{ color: category.color }}>
            {animatedScore}
          </span>
          <span className="ni-score__of">/100</span>
        </div>
      </div>

      <div className="ni-score__info">
        <span className="ni-score__label" style={{ color: category.color }}>
          {category.label}
        </span>
        <p className="ni-score__description">{category.description}</p>
      </div>

      <button
        className="ni-score__toggle"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide' : 'Why this score?'}
        {expanded ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {expanded && (
        <div className="ni-score__reasons">
          {reasons.map((r, i) => (
            <div key={i} className={`ni-score__reason ${r.points < 0 ? 'ni-score__reason--negative' : 'ni-score__reason--neutral'}`}>
              <span className="ni-score__reason-text">{r.text}</span>
              <span className={`ni-score__reason-points ${r.points < 0 ? 'ni-score__reason-points--negative' : ''}`}>
                {r.points === 0 ? '—' : r.points}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
