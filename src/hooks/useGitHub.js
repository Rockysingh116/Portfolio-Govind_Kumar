import { useEffect, useState } from "react";

/**
 * Fetches a GitHub user's public profile + top repos (by stars) client-side.
 * No token required — the public API allows 60 req/hr per IP, which is plenty
 * for a portfolio. Results are cached in sessionStorage so re-renders and
 * quick revisits don't re-hit the API.
 *
 * Returns { profile, repos, totalStars, loading, error }.
 */
export function useGitHub(username, { topN = 6 } = {}) {
  const [state, setState] = useState({
    profile: null,
    repos: [],
    totalStars: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) {
      setState((s) => ({ ...s, loading: false, error: "No username" }));
      return;
    }

    const cacheKey = `gh:${username}:${topN}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setState({ ...JSON.parse(cached), loading: false, error: null });
        return;
      } catch {
        /* ignore malformed cache */
      }
    }

    let cancelled = false;
    (async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error(
            profileRes.status === 403
              ? "GitHub rate limit reached — try again later."
              : "Couldn't load GitHub data."
          );
        }

        const profile = await profileRes.json();
        const allRepos = await reposRes.json();

        const owned = allRepos.filter((r) => !r.fork);
        const totalStars = owned.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0
        );
        const repos = owned
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at) - new Date(a.pushed_at)
          )
          .slice(0, topN)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.html_url,
            homepage: r.homepage,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            topics: r.topics || [],
          }));

        const result = {
          profile: {
            name: profile.name,
            login: profile.login,
            avatar: profile.avatar_url,
            bio: profile.bio,
            url: profile.html_url,
            followers: profile.followers,
            following: profile.following,
            publicRepos: profile.public_repos,
          },
          repos,
          totalStars,
        };

        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(result));
        } catch {
          /* storage full / disabled — non-fatal */
        }

        if (!cancelled) setState({ ...result, loading: false, error: null });
      } catch (err) {
        if (!cancelled)
          setState((s) => ({ ...s, loading: false, error: err.message }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username, topN]);

  return state;
}
