import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook to fetch published blog posts from Elitech Hub's Supabase.
 * Table: blog_posts
 * Columns: id, title, slug, excerpt, category, author, thumbnail, published, published_at, views
 */
export function useElitechBlogs(limit = 20) {
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBlogs() {
      try {
        setLoading(true);

        // Fetch published posts ordered by date
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, category, author, thumbnail, published_at, views')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;
        if (!cancelled) {
          setPosts(data || []);

          // The trending post = highest views
          if (data && data.length > 0) {
            const sorted = [...data].sort((a, b) => (b.views || 0) - (a.views || 0));
            setTrending(sorted[0]);
          }
        }
      } catch (err) {
        console.error('Elitech blog fetch error:', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBlogs();
    return () => { cancelled = true; };
  }, [limit]);

  return { posts, trending, loading, error };
}
