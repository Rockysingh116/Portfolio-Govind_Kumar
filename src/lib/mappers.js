// ============================================================
//  MAPPERS
//  Translate between database rows (snake_case columns) and the
//  shapes the React components already expect (camelCase). This
//  keeps the components unchanged and centralises the transform
//  so the migration script and the fetch layer agree.
// ============================================================

// ---------- PROJECTS ----------
export const projectFromRow = (r) => ({
  id: r.id,
  title: r.title,
  description: r.description,
  image: r.image_url,
  technologies: r.technologies || [],
  category: r.category || undefined,
  company: r.company || undefined,
  liveLink: r.live_link || "",
  githubLink: r.github_link || "",
  featured: !!r.featured,
  problem: r.problem || undefined,
  approach: r.approach || undefined,
  outcomes: r.outcomes || undefined,
  highlights: r.highlights || undefined,
});

export const projectToRow = (p, i = 0) => ({
  title: p.title ?? "",
  description: p.description ?? null,
  image_url: p.image ?? null,
  technologies: p.technologies ?? [],
  category: p.category ?? null,
  company: p.company ?? null,
  live_link: p.liveLink ?? null,
  github_link: p.githubLink ?? null,
  featured: !!p.featured,
  problem: p.problem ?? null,
  approach: p.approach ?? null,
  outcomes: p.outcomes ?? null,
  highlights: p.highlights ?? [],
  sort_order: p.sort_order ?? i,
});

// ---------- EXPERIENCE ----------
export const experienceFromRow = (r) => ({
  id: r.id,
  title: r.title,
  company: r.company,
  domain: r.domain || undefined,
  period: r.period,
  location: r.location,
  tag: r.tag || undefined,
  summary: r.summary || undefined,
  achievements: r.achievements || [],
});

export const experienceToRow = (e, i = 0) => ({
  title: e.title ?? "",
  company: e.company ?? null,
  domain: e.domain ?? null,
  period: e.period ?? null,
  location: e.location ?? null,
  tag: e.tag ?? null,
  summary: e.summary ?? null,
  achievements: e.achievements ?? [],
  sort_order: e.sort_order ?? i,
});

// ---------- ARTICLES ----------
export const articleFromRow = (r) => ({
  id: r.id,
  title: r.title,
  summary: r.summary,
  excerpt: r.excerpt || undefined,
  points: r.points || undefined,
  tags: r.tags || [],
  image: r.image_url || undefined,
  cover:
    r.cover_from || r.cover_to || r.cover_emoji
      ? { from: r.cover_from, to: r.cover_to, emoji: r.cover_emoji }
      : undefined,
  date: r.date_label || undefined,
  readTime: r.read_time || undefined,
  link: r.link || "",
  draft: !!r.draft,
});

export const articleToRow = (a, i = 0) => ({
  title: a.title ?? "",
  summary: a.summary ?? null,
  excerpt: a.excerpt ?? null,
  points: a.points ?? [],
  tags: a.tags ?? [],
  image_url: a.image ?? null,
  cover_from: a.cover?.from ?? null,
  cover_to: a.cover?.to ?? null,
  cover_emoji: a.cover?.emoji ?? null,
  date_label: a.date ?? null,
  read_time: a.readTime ?? null,
  link: a.link ?? null,
  draft: a.draft ?? true,
  sort_order: a.sort_order ?? i,
});

// ---------- TESTIMONIALS ----------
export const testimonialFromRow = (r) => ({
  id: r.id,
  quote: r.quote,
  name: r.name,
  title: r.title,
  domain: r.domain || undefined,
});

export const testimonialToRow = (t, i = 0) => ({
  quote: t.quote ?? "",
  name: t.name ?? null,
  title: t.title ?? null,
  domain: t.domain ?? null,
  sort_order: t.sort_order ?? i,
});

// ---------- CERTIFICATIONS ----------
export const certificationFromRow = (r) => ({
  id: r.id,
  title: r.title,
  issuer: r.issuer,
  domain: r.domain || undefined,
  year: r.year,
  link: r.link || "",
});

export const certificationToRow = (c, i = 0) => ({
  title: c.title ?? "",
  issuer: c.issuer ?? null,
  domain: c.domain ?? null,
  year: c.year ?? null,
  link: c.link ?? null,
  sort_order: c.sort_order ?? i,
});

// ---------- EDUCATION ----------
export const educationFromRow = (r) => ({
  id: r.id,
  title: r.title,
  institution: r.institution,
  year: r.year,
  description: r.description,
});

export const educationToRow = (e, i = 0) => ({
  title: e.title ?? "",
  institution: e.institution ?? null,
  year: e.year ?? null,
  description: e.description ?? null,
  sort_order: e.sort_order ?? i,
});

// ============================================================
//  TABLE REGISTRY
//  A single source of truth mapping each content type to its
//  table name and row<->app transforms. Used by the data layer
//  and the admin CRUD screens.
// ============================================================
export const TABLES = {
  projects: {
    table: "projects",
    fromRow: projectFromRow,
    toRow: projectToRow,
  },
  experience: {
    table: "experience",
    fromRow: experienceFromRow,
    toRow: experienceToRow,
  },
  articles: {
    table: "articles",
    fromRow: articleFromRow,
    toRow: articleToRow,
  },
  testimonials: {
    table: "testimonials",
    fromRow: testimonialFromRow,
    toRow: testimonialToRow,
  },
  certifications: {
    table: "certifications",
    fromRow: certificationFromRow,
    toRow: certificationToRow,
  },
  education: {
    table: "education",
    fromRow: educationFromRow,
    toRow: educationToRow,
  },
};
