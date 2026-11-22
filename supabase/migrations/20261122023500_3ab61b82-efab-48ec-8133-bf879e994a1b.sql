-- e2e-areas: admin-monetisation

-- Cursor bundle 2, part 5 of 5 — TWO UNREAD PUBLIC READS CLOSED (INC-1236 (a); DEC-407; brief
-- docs/governance/briefs/cursor-bundle-2.md item 3, ruling docs/governance/briefs/cursor-bundle-2-ruling-1.md answer 3;
-- census docs/governance/reports/cursor-bundle-2.census.md). `level_overrides` (a level's perks for a category or a country)
-- and `market_settings` (a market's dials) each held a column-level SELECT for the browser roles and an open read rule
-- (`level_overrides_public_read`, `market_settings_public_read`, USING true). No browser code reads either table: the
-- resolver that reads `level_overrides` (level_perks_for) lost its browser EXECUTE in 20261119150800, `market_settings` is
-- read by the staff console's door and by definer doors as their owner, and the one test that read both as the browser
-- (MON-13) now expects the refusal. This file revokes the browser roles' SELECT on every column of both tables and drops the
-- two open read rules; each table keeps its three `false` write rules. Definer doors read as the owner (neither table has
-- FORCE ROW LEVEL SECURITY), so their reads stand. Nothing is granted.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261122040300') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 5: part 4 (mark 20261122040300) must be applied first';
  END IF;
  IF to_regclass('public.level_overrides') IS NULL OR to_regclass('public.market_settings') IS NULL THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 5: level_overrides or market_settings is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. level_overrides
REVOKE SELECT (badge, category_id, country_code, created_at, days, id, level_key, max_photos, placement, updated_at)
  ON public.level_overrides FROM anon, authenticated;
DROP POLICY level_overrides_public_read ON public.level_overrides;

-- ------------------------------------------------------------ 2. market_settings
REVOKE SELECT (country_code, created_at, free_regular_ads, id, included_reach, launch_credits, launch_days, paid_levels,
               paid_levels_since, updated_at)
  ON public.market_settings FROM anon, authenticated;
DROP POLICY market_settings_public_read ON public.market_settings;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) neither browser role holds SELECT on the table or on any of its columns, for either table; the service role still
--     reads both;
-- (b) each table's policies are exactly its three `false` write rules — no rule permits a read;
-- (c) a read of either table as anon and as authenticated is refused by privilege (42501), on a key that matches nothing;
-- (d) neither table forces row security on its owner, so a definer door's read stands.
DO $proof$
DECLARE
  v_hex   text := replace(gen_random_uuid()::text, '-', '');
  v_tag   text;
  v_table text;
  v_role  text;
  v_names text[];
  v_state text;
  v_count integer;
BEGIN
  v_tag := 'e2e-mig-b2c-' || substr(v_hex, 1, 10);

  -- (a)
  FOREACH v_table IN ARRAY ARRAY['level_overrides', 'market_settings'] LOOP
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      IF has_table_privilege(v_role, 'public.' || v_table, 'SELECT') THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (a): % holds SELECT on %', v_role, v_table;
      END IF;
      SELECT count(*)::integer INTO v_count
        FROM pg_attribute a
       WHERE a.attrelid = ('public.' || v_table)::regclass AND a.attnum > 0 AND NOT a.attisdropped
         AND has_column_privilege(v_role, ('public.' || v_table)::regclass, a.attname, 'SELECT');
      IF v_count <> 0 THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (a): % holds SELECT on % column(s) of %', v_role, v_count, v_table;
      END IF;
    END LOOP;
    IF NOT has_table_privilege('service_role', 'public.' || v_table, 'SELECT') THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (a): the service role no longer reads %', v_table;
    END IF;
  END LOOP;

  -- (b)
  FOREACH v_table IN ARRAY ARRAY['level_overrides', 'market_settings'] LOOP
    SELECT array_agg(p.policyname ORDER BY p.policyname) INTO v_names
      FROM pg_policies p WHERE p.schemaname = 'public' AND p.tablename = v_table;
    IF v_names IS DISTINCT FROM ARRAY[v_table || '_no_delete', v_table || '_no_insert', v_table || '_no_update']::text[] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (b): % has the policies % (expected its three write rules)', v_table, v_names;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_policies p WHERE p.schemaname = 'public' AND p.tablename = v_table
                  AND (p.cmd IN ('SELECT', 'ALL') OR p.qual IS DISTINCT FROM 'false')
                  AND p.cmd <> 'INSERT') THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (b): % has a rule that is not a refusal', v_table;
    END IF;
  END LOOP;

  -- (c)
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_table IN ARRAY ARRAY['level_overrides', 'market_settings'] LOOP
      v_state := NULL;
      EXECUTE format('SET LOCAL ROLE %I', v_role);
      BEGIN
        IF v_table = 'level_overrides' THEN
          PERFORM l.id FROM public.level_overrides l WHERE l.level_key = v_tag;
        ELSE
          PERFORM m.id FROM public.market_settings m WHERE m.country_code = 'XQ' AND m.created_at < '1970-01-01';
        END IF;
      EXCEPTION WHEN insufficient_privilege THEN
        v_state := 'refused';
      END;
      RESET ROLE;
      IF v_state IS DISTINCT FROM 'refused' THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (c): % read % without a refusal', v_role, v_table;
      END IF;
    END LOOP;
  END LOOP;

  -- (d)
  IF EXISTS (SELECT 1 FROM pg_class c
              WHERE c.oid IN ('public.level_overrides'::regclass, 'public.market_settings'::regclass)
                AND (c.relforcerowsecurity OR NOT c.relrowsecurity)) THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 5 proof (d): a table forces row security or has it off';
  END IF;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261122040400') ON CONFLICT DO NOTHING;
