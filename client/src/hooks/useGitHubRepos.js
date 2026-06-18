import { useState, useEffect, useCallback } from 'react';

const CACHE_KEY = 'ea-github-repos';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export function useGitHubRepos(username = 'handsomemedia1') {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalRepos: 0,
    totalStars: 0,
    topLanguage: '',
  });

  const fetchRepos = useCallback(async () => {
    try {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setRepos(data);
          computeStats(data);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`
      );

      if (!response.ok) throw new Error('Failed to fetch repos');

      const data = await response.json();
      
      // Cache the data
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));

      setRepos(data);
      computeStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Try to use stale cache if fetch fails
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data } = JSON.parse(cached);
        setRepos(data);
        computeStats(data);
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  const computeStats = (data) => {
    const totalStars = data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    const langCount = {};
    data.forEach(repo => {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    });
    const topLanguage = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    setStats({
      totalRepos: data.length,
      totalStars,
      topLanguage,
    });
  };

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, stats, refetch: fetchRepos };
}
