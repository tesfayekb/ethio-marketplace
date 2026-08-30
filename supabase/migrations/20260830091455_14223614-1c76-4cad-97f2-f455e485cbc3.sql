-- U4d-3 (2 of 2) — corrective sweep keyed on MISSING PRIVILEGES. RECREATED (U4d-3b).
-- Declared mark: 20260830110000 (already in the ledger on prod; ON CONFLICT keeps it idempotent).
-- INC-097c addendum (b): the first sweep's census predicate was "no grant ROWS for
-- service_role", which silently skipped tables holding PARTIAL grants (e.g. SELECT
-- only) — countries, locations, profiles, user_directory. Totality must be keyed on
-- missing PRIVILEGES, not on missing rows.

DO $$
DECLARE
  r record;
  n int := 0;
BEGIN
  RAISE NOTICE 'CENSUS (pre-sweep): tables where service_role lacks ANY of S/I/U/D';
  FOR r IN
    SELECT c.relname
      FROM pg_class c
      JOIN pg_namespace ns ON ns.oid = c.relnamespace
     WHERE ns.nspname = 'public'
       AND c.relkind IN ('r','p')
       AND NOT (
         has_table_privilege('service_role', format('public.%I', c.relname), 'SELECT')
         AND has_table_privilege('service_role', format('public.%I', c.relname), 'INSERT')
         AND has_table_privilege('service_role', format('public.%I', c.relname), 'UPDATE')
         AND has_table_privilege('service_role', format('public.%I', c.relname), 'DELETE')
       )
     ORDER BY c.relname
  LOOP
    RAISE NOTICE '  - %', r.relname;
    n := n + 1;
  END LOOP;
  RAISE NOTICE 'CENSUS total: % table(s) short', n;
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

-- Sequences too: a service_role INSERT into a serial table needs USAGE.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT c.relname
      FROM pg_class c
      JOIN pg_namespace ns ON ns.oid = c.relnamespace
     WHERE ns.nspname = 'public' AND c.relkind = 'S'
     ORDER BY c.relname
  LOOP
    EXECUTE format('GRANT USAGE, SELECT ON SEQUENCE public.%I TO service_role', r.relname);
  END LOOP;
END $$;

-- PROOF (per-table, totality): zero tables short after the corrective sweep.
DO $$
DECLARE
  r record;
  missing int := 0;
BEGIN
  FOR r IN
    SELECT c.relname
      FROM pg_class c
      JOIN pg_namespace ns ON ns.oid = c.relnamespace
     WHERE ns.nspname = 'public'
       AND c.relkind IN ('r','p')
     ORDER BY c.relname
  LOOP
    IF NOT (
      has_table_privilege('service_role', format('public.%I', r.relname), 'SELECT')
      AND has_table_privilege('service_role', format('public.%I', r.relname), 'INSERT')
      AND has_table_privilege('service_role', format('public.%I', r.relname), 'UPDATE')
      AND has_table_privilege('service_role', format('public.%I', r.relname), 'DELETE')
    ) THEN
      RAISE NOTICE 'STILL SHORT: %', r.relname;
      missing := missing + 1;
    ELSE
      RAISE NOTICE 'OK: % (ALL to service_role)', r.relname;
    END IF;
  END LOOP;
  IF missing > 0 THEN
    RAISE EXCEPTION 'corrective sweep incomplete: % table(s) still short', missing;
  END IF;
  RAISE NOTICE 'PROOF OK: totality proven per-table.';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260830110000') ON CONFLICT DO NOTHING;