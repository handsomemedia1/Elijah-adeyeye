import { useEffect } from 'react';
import SEO from '../components/SEO';
import SearchBar from '../components/numintel/SearchBar';
import ResultCard from '../components/numintel/ResultCard';
import ReputationScore from '../components/numintel/ReputationScore';
import ReportForm from '../components/numintel/ReportForm';
import LeaderBoard from '../components/numintel/LeaderBoard';
import BreachContext from '../components/numintel/BreachContext';
import SearchHistory from '../components/numintel/SearchHistory';
import { useNumberLookup } from '../hooks/useNumberLookup';
import { useReports } from '../hooks/useReports';
import { useSearchHistory } from '../hooks/useSearchHistory';
import './NumIntelPage.css';

export default function NumIntelPage() {
  const { result, loading: lookupLoading, error, lookup, reset } = useNumberLookup();
  const { leaderboard, loading: reportsLoading, submitting, submitSuccess, submitReport } = useReports();
  const { history, addToHistory, clearHistory } = useSearchHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (result) {
      addToHistory(result);
    }
  }, [result, addToHistory]);

  return (
    <div className="numintel page-enter">
      <SEO
        title="NumIntel — Open Source Phone Intelligence"
        description="Community-powered phone number intelligence. Check reputation, identify carriers, and stop scams before they happen."
        path="/numintel"
      />
      <section className="page-hero">
        <div className="mesh-background" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 210, 170, 0.05) 0%, transparent 50%)' }} />
        <div className="container page-hero__inner">
          <span className="section-header__label">Open Source OSINT</span>
          <h1 className="page-hero__title"><span className="gradient-text">NumIntel</span></h1>
          <p className="page-hero__subtitle">
            Community-powered phone number intelligence. Check reputation, identify carriers, and stop scams before they happen.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="numintel__search-container">
            <SearchBar onSearch={lookup} loading={lookupLoading} onReset={reset} />
            {error && (
              <div className="numintel__error glass">
                {error}
              </div>
            )}
            {!result && history.length > 0 && (
              <div style={{ marginTop: 'var(--space-8)' }}>
                <SearchHistory history={history} onSelect={(phone) => lookup(phone)} onClear={clearHistory} />
              </div>
            )}
          </div>

          {result && (
            <div className="numintel__results reveal visible">
              <div className="grid-2">
                <ResultCard result={result} />
                <ReputationScore score={result.score} reasons={result.reasons} />
              </div>
              
              <div className="numintel__breach-section">
                <BreachContext breaches={result.breaches} />
              </div>

              <div className="numintel__report-section">
                <p className="numintel__report-prompt">
                  Does this number look suspicious? Help protect others.
                </p>
                <ReportForm 
                  phone={result.phone} 
                  onSubmit={submitReport} 
                  submitting={submitting} 
                  submitSuccess={submitSuccess} 
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Community</span>
            <h2 className="section-header__title">Global Threat Intelligence</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-2">
            <div className="numintel__info glass">
              <h3>Why NumIntel?</h3>
              <p>
                NumIntel is the first open-source phone intelligence tool built with a Nigerian and West African data lens. We combine local carrier detection with global OSINT (Open Source Intelligence) to provide context on any number.
              </p>
              <ul className="numintel__features">
                <li>Instant Carrier Detection</li>
                <li>Breach Exposure Context</li>
                <li>Community Scam Reports</li>
                <li>Privacy-First (We never touch your contacts)</li>
              </ul>
            </div>
            <LeaderBoard leaderboard={leaderboard} loading={reportsLoading} />
          </div>
        </div>
      </section>
    </div>
  );
}
