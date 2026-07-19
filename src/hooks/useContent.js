import { useEffect, useState } from "react";
import { getContent, getSiteContent } from "../lib/content.js";

/**
 * Fetch a list content type from the data layer (Supabase w/ static
 * fallback). Returns { data, loading }. `initial` is used as the
 * first render value so the UI shows real content immediately and
 * updates in place if Supabase returns something different.
 *
 *   const { data: projects } = useContent("projects", staticProjects);
 */
export function useContent(key, initial = []) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getContent(key)
      .then((res) => {
        if (alive) setData(res);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [key]);

  return { data, loading };
}

/**
 * Fetch the site_content blob (personal, about, stats, ...).
 */
export function useSiteContent(initial = {}) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getSiteContent()
      .then((res) => {
        if (alive) setData(res);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { data, loading };
}
