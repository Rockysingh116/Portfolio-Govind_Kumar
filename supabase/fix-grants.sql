-- ============================================================
--  FIX: grant table privileges to anon / authenticated.
--  Run this in the Supabase SQL Editor if you ran an earlier
--  version of schema.sql that was missing these GRANTs.
--  (schema.sql now includes them, so this is only a catch-up.)
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'projects','experience','articles','testimonials',
    'certifications','education','site_content'
  ]
  loop
    execute format('grant select on public.%I to anon, authenticated;', t);
    execute format(
      'grant insert, update, delete on public.%I to authenticated;', t
    );
    -- service_role is used by the migration script; give it full access.
    execute format(
      'grant select, insert, update, delete on public.%I to service_role;', t
    );
  end loop;
end $$;
