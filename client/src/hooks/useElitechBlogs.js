import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useInitialData } from '../contexts/InitialDataContext';

const BLOG_AUTHOR = 'Elijah Adeyeye';
const BLOG_COLUMNS = 'id, title, slug, excerpt, category, author, thumbnail, published_at, views';

function mostViewed(posts) {
  return posts.length ? [...posts].sort((a, b) => (b.views || 0) - (a.views || 0))[0] : null;
}

/**
 * Elijah's published posts from Elitech Hub (table: blog_posts).
 * Prerendered pages receive the posts as initial data, then refresh them in the browser.
 */
export function useElitechBlogs(limit = 20) {
  const initialPosts = useInitialData()?.elitechPosts?.slice(0, limit) ?? null;
  const [posts, setPosts] = useState(initialPosts ?? []);
  const [trending, setTrending] = useState(() => mostViewed(initialPosts ?? []));
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBlogs() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(BLOG_COLUMNS)
          .eq('published', true)
          .eq('author', BLOG_AUTHOR)
          .order('published_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;
        if (!cancelled) {
          setPosts(data || []);
          setTrending(mostViewed(data || []));
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
