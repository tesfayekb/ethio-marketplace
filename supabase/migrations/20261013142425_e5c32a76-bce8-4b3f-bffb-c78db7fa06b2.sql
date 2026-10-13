-- Bundle 12 (the tidy-up round), turn T14 (2026-10-13). Tier A. The plans table: the browser roles read the plan's own columns.
-- e2e-areas: admin-coverage, posting
-- The rule: anon and authenticated may SELECT every column of coverage_plans except updated_by, which no screen
-- shows. The app reads plan, max_cities, max_regions, max_countries, max_photos, allow_everywhere and updated_at
-- (src/features/admin-coverage/coverage-service.ts); the wizard reads the limits through get_posting_schema; every
-- e2e read of the table goes through the service client. The plan limits stay public, as before.
-- Live beside file (ethio-prod, read in this turn's census): the columns are plan, max_cities, max_regions,
-- max_countries, allow_everywhere, updated_by, updated_at, max_photos; anon and authenticated hold SELECT on the
-- table. Only SELECT changes here; every other privilege on the table is left as it is.
-- A. The table-level SELECT of the browser roles replaced by a column-level one (a REVOKE of a table privilege
--    also revokes it from every column, so the grant follows the revoke).
-- B. Proofs: privileges read from the catalogue, and the browser roles' reads planned with WHERE false, so no row is
--    read or written.

-- ===== A — SELECT by column =====
REVOKE SELECT ON public.coverage_plans FROM anon, authenticated;
GRANT SELECT (plan, max_cities, max_regions, max_countries, allow_everywhere, updated_at, max_photos)
  ON public.coverage_plans TO anon, authenticated;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_cols    text[];
  v_col     text;
  v_role    text;
  v_state   text;
  v_err     text;
BEGIN
  -- B1: the table holds exactly the eight columns this file was written for.
  SELECT array_agg(c.column_name::text ORDER BY c.ordinal_position) INTO v_cols
    FROM information_schema.columns c
   WHERE c.table_schema = 'public' AND c.table_name = 'coverage_plans';
  IF v_cols IS DISTINCT FROM ARRAY['plan', 'max_cities', 'max_regions', 'max_countries', 'allow_everywhere',
                                   'updated_by', 'updated_at', 'max_photos'] THEN
    RAISE EXCEPTION 'T14 B1: the columns are not the ones this file was written for: %', v_cols;
  END IF;

  -- B2: each browser role reads every column but updated_by, and no longer holds SELECT on the table;
  -- service_role keeps SELECT on the table.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF has_table_privilege(v_role, 'public.coverage_plans', 'SELECT') THEN
      RAISE EXCEPTION 'T14 B2: % still holds SELECT on the table', v_role;
    END IF;
    FOREACH v_col IN ARRAY v_cols LOOP
      IF (v_col = 'updated_by') = has_column_privilege(v_role, 'public.coverage_plans', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'T14 B2: % on column %: wrong SELECT privilege', v_role, v_col;
      END IF;
    END LOOP;
  END LOOP;
  IF NOT has_table_privilege('service_role', 'public.coverage_plans', 'SELECT') THEN
    RAISE EXCEPTION 'T14 B2: service_role lost SELECT on the table';
  END IF;

  -- B3: as each browser role, a read naming updated_by is refused (42501), and a read of the other seven columns is
  -- planned without error. WHERE false: nothing is read.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    EXECUTE format('SET LOCAL ROLE %I', v_role);
    v_state := NULL;
    BEGIN
      PERFORM c.updated_by FROM public.coverage_plans c WHERE false;
    EXCEPTION WHEN OTHERS THEN
      v_state := SQLSTATE;
      v_err := SQLERRM;
    END;
    IF v_state IS DISTINCT FROM '42501' THEN
      RESET ROLE;
      RAISE EXCEPTION 'T14 B3: % reading updated_by: expected 42501, got % %', v_role,
        coalesce(v_state, 'no error'), coalesce(v_err, '');
    END IF;
    BEGIN
      PERFORM c.plan, c.max_cities, c.max_regions, c.max_countries, c.allow_everywhere, c.updated_at, c.max_photos
        FROM public.coverage_plans c WHERE false;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
      RESET ROLE;
      RAISE EXCEPTION 'T14 B3: % reading the plan columns was refused: %', v_role, v_err;
    END;
    RESET ROLE;
  END LOOP;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014030000') ON CONFLICT (version) DO NOTHING;
