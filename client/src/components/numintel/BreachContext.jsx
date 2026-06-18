import { HiShieldCheck } from 'react-icons/hi';

export default function BreachContext({ breaches }) {
  if (!breaches || breaches.length === 0) return null;

  return (
    <div className="ni-breach glass">
      <h4 className="ni-breach__title">
        <HiShieldCheck /> Breach Exposure Context
      </h4>
      <p className="ni-breach__subtitle">
        Major data breaches that exposed phone numbers in this country
      </p>

      <div className="ni-breach__timeline">
        {breaches.map((b, i) => (
          <div key={i} className="ni-breach__item">
            <div className="ni-breach__dot" />
            <div className="ni-breach__content">
              <div className="ni-breach__header">
                <h5 className="ni-breach__name">{b.name}</h5>
                <span className="ni-breach__date">{new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
              </div>
              <p className="ni-breach__desc">{b.description}</p>
              <div className="ni-breach__meta">
                <span className="ni-breach__records">
                  {(b.records / 1000000).toFixed(0)}M records
                </span>
                <div className="ni-breach__types">
                  {b.dataTypes.map(t => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
