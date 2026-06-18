import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useReports() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    try {
      // Get most reported numbers
      const { data, error } = await supabase
        .from('numintel_reports')
        .select('phone, category, country')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Aggregate by phone number
      const counts = {};
      (data || []).forEach(r => {
        if (!counts[r.phone]) {
          counts[r.phone] = { phone: r.phone, count: 0, categories: {}, country: r.country };
        }
        counts[r.phone].count++;
        counts[r.phone].categories[r.category] = (counts[r.phone].categories[r.category] || 0) + 1;
      });

      // Sort by count descending, take top 10
      const sorted = Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
        .map(item => ({
          ...item,
          topCategory: Object.entries(item.categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown'
        }));

      setLeaderboard(sorted);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    // Refresh every 60 seconds
    const interval = setInterval(fetchLeaderboard, 60000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const submitReport = useCallback(async ({ phone, category, description, country = 'NG' }) => {
    setSubmitting(true);
    setSubmitSuccess(false);
    try {
      const { error } = await supabase
        .from('numintel_reports')
        .insert([{ phone, category, description, country }]);

      if (error) throw error;

      setSubmitSuccess(true);
      // Refresh leaderboard after new report
      await fetchLeaderboard();
      
      // Reset success state after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      return true;
    } catch (err) {
      console.error('Failed to submit report:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchLeaderboard]);

  return { leaderboard, loading, submitting, submitSuccess, submitReport, refresh: fetchLeaderboard };
}
