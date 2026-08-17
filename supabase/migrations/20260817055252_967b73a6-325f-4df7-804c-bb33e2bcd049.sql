-- U1f-3: parity ledger that exists on BOTH environments.
--
-- Environment asymmetry: supabase_migrations.schema_migrations exists only where
-- the migration TOOL ran (ethio-prod). ethio-staging is applied by hand through
-- the SQL editor and has no tool ledger. The ledger therefore becomes
-- public.migration_marks, written by every migration as its own last statement
-- (self-marking law, docs/governance/migrations.md).
--
-- This migration also re-applies the corrected 20260817054246 objects to prod,
-- where the OLD (supabase_migrations-reading) version of that file already ran:
-- CREATE OR REPLACE below replaces prod's ledger function too.

CREATE TABLE IF NOT EXISTS public.migration_marks (
  version text PRIMARY KEY,
  marked_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.migration_marks ENABLE ROW LEVEL SECURITY;

-- No policies by design: definer/service_role territory only.
REVOKE ALL ON TABLE public.migration_marks FROM PUBLIC, anon, authenticated;

-- Explicit deny-all for client roles: the table is definer/service_role territory.
-- (RLS with zero policies already denies; the policy makes the refusal explicit
-- and satisfies the every-table-ships-a-policy law.)
DROP POLICY IF EXISTS "migration_marks_no_client_access" ON public.migration_marks;
CREATE POLICY "migration_marks_no_client_access"
  ON public.migration_marks FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);
GRANT ALL ON TABLE public.migration_marks TO service_role;

CREATE OR REPLACE FUNCTION public.e2e_migration_ledger()
RETURNS SETOF text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT version
  FROM public.migration_marks
  ORDER BY version
$$;

REVOKE ALL ON FUNCTION public.e2e_migration_ledger() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.e2e_migration_ledger() TO service_role;

-- Backfill: every migration version present in supabase/migrations/ at the time
-- this file was written, so both environments start complete the moment it runs.
INSERT INTO public.migration_marks(version) VALUES
  ('20260729110912'),
  ('20260730015333'),
  ('20260730021240'),
  ('20260730094625'),
  ('20260803075756'),
  ('20260803100407'),
  ('20260804133231'),
  ('20260804150657'),
  ('20260804152522'),
  ('20260804174739'),
  ('20260804213701'),
  ('20260809010130'),
  ('20260809010922'),
  ('20260809014125'),
  ('20260809061244'),
  ('20260809103904'),
  ('20260809105042'),
  ('20260810065832'),
  ('20260810071215'),
  ('20260810073508'),
  ('20260810074522'),
  ('20260810075629'),
  ('20260816092211'),
  ('20260816120338'),
  ('20260817023555'),
  ('20260817033146'),
  ('20260817052646'),
  ('20260817054246')
ON CONFLICT DO NOTHING;

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260817055252') ON CONFLICT DO NOTHING;