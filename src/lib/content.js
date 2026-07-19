// ============================================================
//  CONTENT DATA LAYER
//  The public site reads content through these functions. Each
//  one tries Supabase first and falls back to the static
//  src/data/portfolio.js if Supabase is unconfigured, unreachable,
//  or returns nothing — so the site never breaks.
// ============================================================

import { supabase, isSupabaseConfigured } from "./supabase.js";
import { TABLES } from "./mappers.js";
import * as staticData from "../data/portfolio.js";

// Map each content type to the matching static fallback array.
const STATIC_FALLBACK = {
  projects: staticData.projects,
  experience: staticData.experience,
  articles: staticData.articles,
  testimonials: staticData.testimonials,
  certifications: staticData.certifications,
  education: staticData.education,
};

// Simple per-key promise cache so multiple components share one fetch.
const cache = new Map();

/**
 * Fetch a list content type ("projects", "experience", ...).
 * Returns app-shaped objects (camelCase), ordered by sort_order.
 * Falls back to static data on any problem.
 */
export async function getContent(key) {
  if (cache.has(key)) return cache.get(key);

  const promise = (async () => {
    const fallback = STATIC_FALLBACK[key] ?? [];
    const meta = TABLES[key];
    if (!isSupabaseConfigured || !meta) return fallback;

    try {
      const { data, error } = await supabase
        .from(meta.table)
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (!data || data.length === 0) return fallback; // empty -> fallback
      return data.map(meta.fromRow);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn(`[content] ${key} fell back to static:`, err.message);
      }
      return fallback;
    }
  })();

  cache.set(key, promise);
  return promise;
}

/**
 * Fetch the single site_content JSON blob (name, tagline, bio, etc.).
 * Falls back to the static exports if unavailable/empty.
 */
export async function getSiteContent() {
  if (cache.has("__site")) return cache.get("__site");

  const fallback = {
    personal: staticData.personal,
    about: staticData.about,
    stats: staticData.stats,
    skillCategories: staticData.skillCategories,
    languages: staticData.languages,
    sectionImages: staticData.sectionImages,
    repoDescriptions: staticData.repoDescriptions,
  };

  const promise = (async () => {
    if (!isSupabaseConfigured) return fallback;
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "main")
        .single();
      if (error) throw error;
      const d = data?.data;
      if (!d || Object.keys(d).length === 0) return fallback;
      // Merge so any missing keys fall back to static defaults.
      return { ...fallback, ...d };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("[content] site_content fell back to static:", err.message);
      }
      return fallback;
    }
  })();

  cache.set("__site", promise);
  return promise;
}

// Invalidate caches (used after admin edits within the same tab).
export function clearContentCache() {
  cache.clear();
}
