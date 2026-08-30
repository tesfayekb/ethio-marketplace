DO $$
DECLARE
  rec record;
  missing text[] := '{}'::text[];
  remaining int;
  seq record;
BEGIN
  -- (1) CENSUS: every public table lacking any service_role privilege.
  FOR rec IN
    SELECT c.relname AS tbl
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relkind IN ('r','p')
      AND NOT EXISTS (
        SELECT 1 FROM information_schema.role_table_grants g
        WHERE g.table_schema = 'public'
          AND g.table_name = c.relname
          AND g.grantee = 'service_role'
      )
    ORDER BY c.relname
  LOOP
    missing := missing || rec.tbl;
    -- (2) GRANT ALL on the censused table.
    EXECUTE format('GRANT ALL ON public.%I TO service_role', rec.tbl);
  END LOOP;

  RAISE NOTICE 'INC-097c census: tables lacking service_role privileges: %',
    coalesce(array_to_string(missing, ', '), '(none)');

  -- USAGE on sequences owned by public tables (identity/serial columns).
  FOR seq IN
    SELECT c.relname AS seqname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'S'
  LOOP
    EXECUTE format('GRANT USAGE, SELECT ON public.%I TO service_role', seq.seqname);
  END LOOP;

  -- (3) PROOF: zero public tables remain without service_role privileges.
  SELECT count(*) INTO remaining
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relkind IN ('r','p')
    AND NOT EXISTS (
      SELECT 1 FROM information_schema.role_table_grants g
      WHERE g.table_schema = 'public'
        AND g.table_name = c.relname
        AND g.grantee = 'service_role'
    );
  IF remaining > 0 THEN
    RAISE EXCEPTION 'INC-097c proof failed: % public tables still lack service_role grants', remaining;
  END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260830100000') ON CONFLICT DO NOTHING;