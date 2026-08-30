-- U4d-3 (1 of 2) — service_role grant sweep, pre-law era. RECREATED (U4d-3b).
-- Declared mark: 20260830100000 (already in the ledger on prod; ON CONFLICT keeps it idempotent).
-- Pure GRANT sweep + in-migration census. No DDL, no data.
-- LAW (INC-097c): every table ships GRANT ALL TO service_role alongside its RLS
-- policies. service_role bypasses RLS but is still subject to table grants.

DO $$
DECLARE
  r record;
  n int := 0;
BEGIN
  RAISE NOTICE 'CENSUS (pre-sweep): tables with NO service_role grant rows';
  FOR r IN
    SELECT c.relname
      FROM pg_class c
      JOIN pg_namespace ns ON ns.oid = c.relnamespace
     WHERE ns.nspname = 'public'
       AND c.relkind IN ('r','p')
       AND NOT EXISTS (
         SELECT 1 FROM information_schema.role_table_grants g
          WHERE g.table_schema = 'public'
            AND g.table_name = c.relname
            AND g.grantee = 'service_role'
       )
     ORDER BY c.relname
  LOOP
    RAISE NOTICE '  - %', r.relname;
    n := n + 1;
  END LOOP;
  RAISE NOTICE 'CENSUS total: % table(s)', n;
END $$;

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT c.relname
      FROM pg_class c
      JOIN pg_namespace ns ON ns.oid = c.relnamespace
     WHERE ns.nspname = 'public'
       AND c.relkind IN ('r','p')
     ORDER BY c.relname
  LOOP
    EXECUTE format('GRANT ALL ON public.%I TO service_role', r.relname);
  END LOOP;
END $$;

-- PROOF: after the sweep, zero public tables may lack any of SELECT/INSERT/UPDATE/DELETE.
DO $$
DECLARE
  missing int;
BEGIN
  SELECT count(*) INTO missing
    FROM pg_class c
    JOIN pg_namespace ns ON ns.oid = c.relnamespace
   WHERE ns.nspname = 'public'
     AND c.relkind IN ('r','p')
     AND NOT (
       has_table_privilege('service_role', format('public.%I', c.relname), 'SELECT')
       AND has_table_privilege('service_role', format('public.%I', c.relname), 'INSERT')
       AND has_table_privilege('service_role', format('public.%I', c.relname), 'UPDATE')
       AND has_table_privilege('service_role', format('public.%I', c.relname), 'DELETE')
     );
  IF missing > 0 THEN
    RAISE EXCEPTION 'service_role sweep incomplete: % table(s) still short', missing;
  END IF;
  RAISE NOTICE 'PROOF OK: every public table grants ALL to service_role.';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260830100000') ON CONFLICT DO NOTHING;