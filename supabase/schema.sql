-- ============================================================
--  PORTFOLIO ADMIN — DATABASE SCHEMA
--  Run this ONCE in your Supabase project:
--    Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
--
--  Security model (Row-Level Security):
--    • Everyone can READ  (so the public portfolio can render).
--    • Only a logged-in (authenticated) user can INSERT/UPDATE/DELETE.
--  Since you'll be the only auth user, only you can change content.
-- ============================================================

-- Helpful extension for UUID generation (usually already enabled).
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
--  Reusable trigger to keep `updated_at` fresh on every update.
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
--  TABLES
-- ============================================================

-- ---- projects ---------------------------------------------
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  image_url     text,
  technologies  text[] default '{}',
  category      text,               -- "Work" | "Personal" | null
  company       text,
  live_link     text,
  github_link   text,
  featured      boolean default false,
  -- Optional case-study fields (shown in the project detail modal)
  problem       text,
  approach      text,
  outcomes      text,
  highlights    text[] default '{}',
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---- experience -------------------------------------------
create table if not exists public.experience (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  company       text,
  domain        text,
  period        text,
  location      text,
  tag           text,               -- "Engineering" | "Data" | "People" ...
  summary       text,
  achievements  text[] default '{}',
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---- articles ---------------------------------------------
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  summary       text,
  excerpt       text,
  points        text[] default '{}',
  tags          text[] default '{}',
  image_url     text,
  cover_from    text,               -- gradient start (SVG cover)
  cover_to      text,               -- gradient end
  cover_emoji   text,
  date_label    text,               -- e.g. "Coming soon"
  read_time     text,
  link          text,
  draft         boolean default true,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---- testimonials -----------------------------------------
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  quote         text not null,
  name          text,
  title         text,               -- job title / role
  domain        text,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---- certifications ---------------------------------------
create table if not exists public.certifications (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  issuer        text,
  domain        text,
  year          text,
  link          text,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---- education --------------------------------------------
create table if not exists public.education (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  institution   text,
  year          text,
  description   text,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---- site_content -----------------------------------------
--  One-off editable text: name, tagline, bio, stats, socials, etc.
--  Stored as a single JSON blob in one row (id = 'main') so the
--  admin can edit free-form settings without a rigid column list.
create table if not exists public.site_content (
  id            text primary key default 'main',
  data          jsonb not null default '{}',
  updated_at    timestamptz default now()
);

-- ============================================================
--  updated_at triggers
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'projects','experience','articles','testimonials',
    'certifications','education','site_content'
  ]
  loop
    execute format(
      'drop trigger if exists set_%1$s_updated_at on public.%1$s;', t
    );
    execute format(
      'create trigger set_%1$s_updated_at before update on public.%1$s
         for each row execute function public.set_updated_at();', t
    );
  end loop;
end $$;

-- ============================================================
--  ROW-LEVEL SECURITY
--  public read; authenticated write (insert/update/delete).
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'projects','experience','articles','testimonials',
    'certifications','education','site_content'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);

    -- Table-level privileges. RLS decides WHICH ROWS a role sees, but the
    -- role must ALSO hold the SQL GRANT on the table. Tables created via
    -- raw SQL are not auto-granted to anon/authenticated in newer projects.
    execute format('grant select on public.%I to anon, authenticated;', t);
    execute format(
      'grant insert, update, delete on public.%I to authenticated;', t
    );
    -- service_role (used by the migration script) needs full access too.
    execute format(
      'grant select, insert, update, delete on public.%I to service_role;', t
    );

    -- Public read
    execute format('drop policy if exists "public read %1$s" on public.%1$s;', t);
    execute format(
      'create policy "public read %1$s" on public.%1$s
         for select using (true);', t
    );

    -- Authenticated write (any logged-in user; you are the only one)
    execute format('drop policy if exists "auth write %1$s" on public.%1$s;', t);
    execute format(
      'create policy "auth write %1$s" on public.%1$s
         for all
         to authenticated
         using (true)
         with check (true);', t
    );
  end loop;
end $$;

-- ============================================================
--  STORAGE BUCKET for uploaded images (public read, auth write)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- Public can read files in the bucket.
drop policy if exists "public read portfolio-images" on storage.objects;
create policy "public read portfolio-images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

-- Logged-in user can upload / update / delete files in the bucket.
drop policy if exists "auth write portfolio-images" on storage.objects;
create policy "auth write portfolio-images"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'portfolio-images')
  with check (bucket_id = 'portfolio-images');

-- ============================================================
--  Seed the single site_content row so the admin has a row to edit.
-- ============================================================
insert into public.site_content (id, data)
values ('main', '{}')
on conflict (id) do nothing;

-- Done. You should now see 7 tables under Table Editor and a
-- "portfolio-images" bucket under Storage.
