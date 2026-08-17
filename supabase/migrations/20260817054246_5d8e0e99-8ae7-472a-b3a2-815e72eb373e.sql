-- U1f-3 (in-place correction of U1f-2): E2E migration-parity ledger reader.
--
-- ENVIRONMENT ASYMMETRY (root cause, INC-074 addendum):
-- supabase_migrations.schema_migrations only exists where the migration TOOL
-- ran -- that is ethio-prod. ethio-staging is applied BY HAND through the SQL
-- editor, which writes no ledger at all. A definer function reading
-- supabase_migrations therefore cannot be applied on staging, so the parity
-- check it was meant to serve could never run there.
--
-- Correction: the ledger becomes an ordinary public table, public.migration_marks,
-- that every migration writes its own version into as its last statement
-- (self-marking law, docs/governance/migrations.md). The mark is the ledger on
-- staging, and it is identical on prod.
--
-- The table is definer/service_role territory only: RLS is enabled and NO policy
-- is created, so no client role can read or write it even if a grant slipped in.
CREATE TABLE IF NOT EXISTS public.migration_marks (
  version text PRIMARY KEY,
  marked_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.migration_marks ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.migration_marks FROM PUBLIC, anon, authenticated;
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

-- Self-mark (last statement, per the self-marking law).
INSERT INTO public.migration_marks(version) VALUES ('20260817054246') ON CONFLICT DO NOTHING;
