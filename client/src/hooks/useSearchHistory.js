import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'numintel_history';
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    setHistory(stored);
  }, []);

  const addToHistory = useCallback((result) => {
    setHistory(prev => {
      const newHistory = [...prev];
      const existingIndex = newHistory.findIndex(h => h.phone === result.phone);
      if (existingIndex >= 0) {
        newHistory.splice(existingIndex, 1);
      }
      
      newHistory.unshift({
        phone: result.phone,
        formatted: result.formatted,
        carrierName: result.carrier?.name || 'Unknown',
        carrierColor: result.carrier?.color || 'var(--text-secondary)',
        score: result.score,
        country: result.country,
        timestamp: Date.now()
      });
      
      if (newHistory.length > MAX_HISTORY) {
        newHistory.pop();
      }
      
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  return { history, addToHistory, clearHistory };
}
