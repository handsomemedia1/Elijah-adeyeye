import { useEffect } from 'react';
import SearchBar from './SearchBar';
import ResultCard from './ResultCard';
import ReputationScore from './ReputationScore';
import ReportForm from './ReportForm';
import BreachContext from './BreachContext';
import SearchHistory from './SearchHistory';
import { useNumberLookup } from '../../hooks/useNumberLookup';
import { useReports } from '../../hooks/useReports';
import { useSearchHistory } from '../../hooks/useSearchHistory';

export default function NumIntelTool({ defaultCountry = 'NG' }) {
  const { result, loading: lookupLoading, error, lookup, reset } = useNumberLookup();
  const { submitting, submitSuccess, submitReport } = useReports();
  const { history, addToHistory, clearHistory } = useSearchHistory();

  useEffect(() => {
    if (result) {
      addToHistory(result);
    }
  }, [result, addToHistory]);

  const handleSearch = (phone) => {
    lookup(phone, defaultCountry);
  };

  return (
    <div className="numintel-tool">
      <div className="numintel__search-container">
        <SearchBar onSearch={handleSearch} loading={lookupLoading} onReset={reset} />
        {error && (
          <div className="numintel__error glass">
            {error}
          </div>
        )}
        {!result && history.length > 0 && (
          <div style={{ marginTop: 'var(--space-8)' }}>
            <SearchHistory history={history} onSelect={(phone) => lookup(phone, defaultCountry)} onClear={clearHistory} />
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
  );
}