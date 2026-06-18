import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Tracks page views by inserting a row into portfolio_views.
 * Only tracks public pages (not /admin).
 */
export function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) return;

    const page = location.pathname || '/';

    supabase
      .from('portfolio_views')
      .insert({
        page,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      })
      .then(({ error }) => {
        if (error) console.warn('View tracking error:', error.message);
      });
  }, [location.pathname]);
}
