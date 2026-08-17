-- U1f-2: E2E migration-parity ledger reader.
-- The CI preflight cannot read supabase_migrations.schema_migrations through
-- PostgREST (that schema is not exposed). This definer function is the only
-- door, and it is opened for service_role ONLY: no client role can call it.
CREATE OR REPLACE FUNCTION public.e2e_migration_ledger()
RETURNS SETOF text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT version::text
  FROM supabase_migrations.schema_migrations
  ORDER BY version
$$;

REVOKE ALL ON FUNCTION public.e2e_migration_ledger() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.e2e_migration_ledger() TO service_role;