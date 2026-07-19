# Portfolio Admin Panel

A private, password-protected `/admin` dashboard where you manage your
portfolio content through forms. Content is stored in **Supabase**
(database + auth + image storage). The public site reads from Supabase and
**falls back to `src/data/portfolio.js`** if Supabase is ever unreachable,
so the site never breaks.

---

## One-time setup

### 1. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) → **New project**
   (pick a region near you, e.g. Mumbai/Singapore). Save the DB password.
2. Wait ~2 minutes for it to provision.
3. **Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (migration only — secret!)
4. **Authentication → Users → Add user** → create yourself one user
   (email + password). Tick **Auto Confirm User**. This is your admin login.

### 2. Add environment variables

Copy the keys into your local `.env` (already gitignored):

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...        # anon public key
SUPABASE_SERVICE_ROLE_KEY=eyJ...     # service_role — needed ONLY for migration
```

See `.env.example` for the full list.

### 3. Create the database tables

In the Supabase dashboard → **SQL Editor → New query**, paste the entire
contents of [`supabase/schema.sql`](../supabase/schema.sql) and **Run**.

This creates 7 tables, Row-Level Security (public read / logged-in write),
`updated_at` triggers, and a public `portfolio-images` storage bucket.

### 4. Migrate your existing content

This copies everything from `src/data/portfolio.js` into Supabase (and
uploads the 3 local project images to Storage). Run once:

```bash
npm run migrate
```

- Re-running **clears and re-inserts** each table (no duplicates).
  Pass `--append` to keep existing rows instead.
- Requires `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

Verify the rows landed in the Supabase **Table Editor**.

### 5. Deploy (Vercel)

Add the two **frontend** vars in Vercel → Project → Settings → Environment
Variables (do **not** add the service_role key to the frontend/Vercel):

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

`vercel.json` already rewrites all paths to `index.html` so `/admin`
works on a hard refresh.

---

## Using the admin

- Go to **`/admin`** → sign in with your Supabase user email + password.
  Sessions persist ("stay logged in").
- Sidebar sections: **Projects · Experience · Articles · Testimonials ·
  Certifications · Education · Site info**.
- Each list section supports **Add / Edit / Delete** and **reorder**
  (▲▼ buttons — the order is saved as `sort_order`).
- **Images**: in any form with a cover image, click **Upload image**
  (drag a file → it's hosted on Supabase and the URL is filled in), or
  paste an image URL directly.
- **Site info** edits the one-off text (name, tagline, bio, socials).
  Simple fields have friendly inputs; **Raw JSON** exposes everything
  else (stats, skills, section images, expertise, quick facts, traits).
- Changes are live on the public site on next refresh.

---

## How it fits together

```
/admin form  ──►  Supabase (auth + DB + storage)  ◄──  public portfolio
```

- `src/lib/supabase.js` — the Supabase client (reads env vars).
- `src/lib/mappers.js` — DB row ⇄ app-shape transforms + table registry.
- `src/lib/content.js` — public data layer: fetch from Supabase, fall back
  to `portfolio.js` on any error/empty result.
- `src/hooks/useContent.js` — React hooks (`useContent`, `useSiteContent`).
- `src/admin/*` — auth context, route guard, login, dashboard, CRUD forms.
- `scripts/migrate.mjs` — one-time content migration.
- `supabase/schema.sql` — database schema + RLS + storage.

### What updates live vs. what needs a redeploy

Fully live (fetched from Supabase, editable in the admin):

- **Projects, Experience, Articles, Testimonials, Certifications, Education**
- **Site info**: name, tagline, headline, status pill, socials, resume URL,
  email/phone/location, about badge & availability — consumed live by the
  **Hero**, **About**, and **Contact** sections.

Static for now (migrated to Supabase and editable via **Site info → Raw
JSON**, but the public component still reads the static file, so a change
shows after the next deploy — not instantly):

- **Skills** (`skillCategories`), the **Logo** brand name, and the GitHub
  section's **repo description overrides**.

These are large, rarely-edited config blocks; wiring them live is a small
follow-up if you want it.

---

## Security model

- Every table is **public-read** (so visitors can see your portfolio) and
  **write-locked to authenticated users** via Row-Level Security. You're
  the only auth user, so only you can change anything.
- The **anon key** is safe in the frontend — it can only read, plus write
  when accompanied by a valid login session.
- The **service_role key** bypasses RLS. Use it only for the local
  migration. Never commit it or put it in the frontend/Vercel.

## Backups

Export anytime from Supabase → **Table Editor → (table) → Export**, or
`Database → Backups`. The static `src/data/portfolio.js` also remains a
working snapshot/fallback.
```
