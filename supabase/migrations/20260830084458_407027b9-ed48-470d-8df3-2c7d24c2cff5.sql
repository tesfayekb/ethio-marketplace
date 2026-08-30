DO $$
DECLARE
  rec record;
  fixed text[] := '{}'::text[];
  remaining int;
BEGIN
  -- Census keyed on MISSING PRIVILEGES (a partial grant row still counts as a gap).
  FOR rec IN
    SELECT c.relname AS tbl
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relkind IN ('r','p')
      AND (
        NOT has_table_privilege('service_role', format('public.%I', c.relname), 'SELECT')
        OR NOT has_table_privilege('service_role', format('public.%I', c.relname), 'INSERT')
        OR NOT has_table_privilege('service_role', format('public.%I', c.relname), 'UPDATE')
        OR NOT has_table_privilege('service_role', format('public.%I', c.relname), 'DELETE')
      )
    ORDER BY c.relname
  LOOP
    fixed := fixed || rec.tbl;
    EXECUTE format('GRANT ALL ON public.%I TO service_role', rec.tbl);
  END LOOP;

  RAISE NOTICE 'INC-097c-b census (per-privilege): tables completed to GRANT ALL: %',
    coalesce(array_to_string(fixed, ', '), '(none)');

  -- Proof: every public table holds all four privileges for service_role.
  SELECT count(*) INTO remaining
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relkind IN ('r','p')
    AND (
      NOT has_table_privilege('service_role', format('public.%I', c.relname), 'SELECT')
      OR NOT has_table_privilege('service_role', format('public.%I', c.relname), 'INSERT')
      OR NOT has_table_privilege('service_role', format('public.%I', c.relname), 'UPDATE')
      OR NOT has_table_privilege('service_role', format('public.%I', c.relname), 'DELETE')
    );
  IF remaining > 0 THEN
    RAISE EXCEPTION 'INC-097c-b proof failed: % public tables still lack full service_role privileges', remaining;
  END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260830110000') ON CONFLICT DO NOTHING;