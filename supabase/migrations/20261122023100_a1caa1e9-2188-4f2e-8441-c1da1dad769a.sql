-- e2e-areas: admin-listings, my-listings, admin-locations, admin-screening

-- Cursor bundle 2, part 1 of 5 — THE LIST RULE, ONE MECHANISM (DEC-423; brief docs/governance/briefs/cursor-bundle-2.md
-- item 1, ruling docs/governance/briefs/cursor-bundle-2-ruling-1.md answer 6; census docs/governance/reports/cursor-bundle-2.census.md).
-- Two new helpers, `door_filter_countries` and `door_filter_categories`, the one rule a list door reads a country list and
-- a category list by. Each takes the list the door was sent and the field's name, and answers what the door matches by:
--   * NULL or an empty list answers NULL: no filter;
--   * more than 20 values (counted as sent, before a category's subtree is added), a NULL value, or — for a country — a
--     value that is not two letters A to Z once read as the doors read it (`upper(btrim(…))`) answers `badValue` with
--     the field as its detail;
--   * a country answers its distinct values as `character(2)[]` (the column's own type, so the place's index serves);
--   * a category answers every root with its subtree (`cat_descendants`), distinct.
-- A list that holds at least one value never answers NULL: a list whose values match nothing answers a list that no row
-- carries, and the door then answers no row — a filter never widens by matching nothing. The helpers are INVOKER and
-- STABLE, closed to the browser roles (called by definer doors as their owner, as `cat_descendants` is), so they take no
-- manifest line. Their guard is scripts/doors (the finding `filter-off-helper`).

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261121160000') THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 1: the ledger''s newest mark 20261121160000 must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.cat_descendants(uuid)') IS NULL THEN
    RAISE EXCEPTION 'cursor-bundle-2 part 1: door_refuse or cat_descendants is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. door_filter_countries
CREATE OR REPLACE FUNCTION public.door_filter_countries(p_values text[], p_field text)
RETURNS character(2)[]
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_value text;
  v_code  character(2);
  v_codes character(2)[] := ARRAY[]::character(2)[];
BEGIN
  IF p_values IS NULL OR cardinality(p_values) = 0 THEN
    RETURN NULL;
  END IF;
  IF cardinality(p_values) > 20 THEN
    PERFORM public.door_refuse('badValue', p_field);
  END IF;
  FOREACH v_value IN ARRAY p_values LOOP
    v_value := upper(btrim(v_value));
    IF v_value IS NULL OR v_value !~ '^[A-Z]{2}$' THEN
      PERFORM public.door_refuse('badValue', p_field);
    END IF;
    v_code := v_value::character(2);
    IF NOT (v_code = ANY (v_codes)) THEN
      v_codes := v_codes || v_code;
    END IF;
  END LOOP;
  RETURN v_codes;
END $$;
COMMENT ON FUNCTION public.door_filter_countries(text[], text) IS
  'DEC-423: the list rule of a country filter — NULL or empty is no filter; at most 20 values, each upper(btrim(…)) and two letters A to Z or badValue:<field>; the distinct codes as character(2)[]; a list of values that name no market answers a list no row carries, never NULL.';
REVOKE ALL ON FUNCTION public.door_filter_countries(text[], text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.door_filter_countries(text[], text) TO service_role;

-- ------------------------------------------------------------ 2. door_filter_categories
CREATE OR REPLACE FUNCTION public.door_filter_categories(p_values uuid[], p_field text)
RETURNS uuid[]
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_ids uuid[];
BEGIN
  IF p_values IS NULL OR cardinality(p_values) = 0 THEN
    RETURN NULL;
  END IF;
  IF cardinality(p_values) > 20 THEN
    PERFORM public.door_refuse('badValue', p_field);
  END IF;
  IF EXISTS (SELECT 1 FROM unnest(p_values) AS v(id) WHERE v.id IS NULL) THEN
    PERFORM public.door_refuse('badValue', p_field);
  END IF;
  SELECT coalesce(array_agg(DISTINCT d.id), ARRAY[]::uuid[]) INTO v_ids
    FROM unnest(p_values) AS r(id)
   CROSS JOIN LATERAL public.cat_descendants(r.id) AS d;
  RETURN v_ids;
END $$;
COMMENT ON FUNCTION public.door_filter_categories(uuid[], text) IS
  'DEC-423: the list rule of a category filter — NULL or empty is no filter; at most 20 values (counted as sent), none NULL, or badValue:<field>; every root with its subtree (cat_descendants), distinct; a root that exists nowhere answers itself, so the door matches no row, never NULL.';
REVOKE ALL ON FUNCTION public.door_filter_categories(uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.door_filter_categories(uuid[], text) TO service_role;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both: STABLE INVOKER with search_path public, EXECUTE for the service role only (never anon,
--     authenticated or PUBLIC); each body this file's (md5).
-- (b) the answers: NULL and the empty list answer NULL; a country list answers its distinct upper-cased codes in order; a
--     code that names no market answers itself, not NULL; a category list answers every root with its subtree and its
--     deepest leaf, distinct; a category that exists nowhere answers itself, not NULL.
-- (c) the refusals, each badValue:<field>: 21 values (and 21 equal values: counted as sent), a NULL value, a three-letter,
--     a one-digit and an empty country; exactly 20 values pass.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ', 'XY' and 'XQ': scratch codes no market holds (K4: a recorded proof exception)
  v_root    uuid;
  v_child   uuid;
  v_leaf    uuid;
  v_other   uuid;
  v_nowhere uuid := gen_random_uuid();
  v_fn      regprocedure;
  v_want    text;
  v_call    text;
  v_msg     text;
  v_answer  text;
BEGIN
  FOR v_fn, v_want IN VALUES
    ('public.door_filter_countries(text[],text)'::regprocedure, '082a4b33fe8ae87959cdbc26c3f07a37'),
    ('public.door_filter_categories(uuid[],text)'::regprocedure, '5cd2410db10c8e5077f6d8f7e86df5fa')
  LOOP
    IF (SELECT prosecdef OR provolatile <> 's' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (a): %''s header or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-b2a0-' || substr(v_hex, 1, 10);
  BEGIN
    -- no door_context ran: the refusal raises P0D01 here, as a shell's body reads it
    PERFORM set_config('door.outer', '', true);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' root', v_tag || '-root', true, true, true, 9999) RETURNING id INTO v_root;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' child', v_tag || '-child', true, true, true, 9999) RETURNING id INTO v_child;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag || '-leaf', true, true, true, 9999) RETURNING id INTO v_leaf;
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' other', v_tag || '-other', true, true, true, 9999) RETURNING id INTO v_other;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_child, 1);
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_child, v_leaf, 1);

    -- (b) the answers
    IF public.door_filter_countries(NULL, 'country') IS NOT NULL
       OR public.door_filter_countries(ARRAY[]::text[], 'country') IS NOT NULL
       OR public.door_filter_categories(NULL, 'category') IS NOT NULL
       OR public.door_filter_categories(ARRAY[]::uuid[], 'category') IS NOT NULL THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): NULL or an empty list is a filter';
    END IF;
    IF public.door_filter_countries(ARRAY['xz', ' XY ', 'XZ'], 'country') IS DISTINCT FROM ARRAY['XZ', 'XY']::character(2)[] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): a country list is not its distinct upper-cased codes in order';
    END IF;
    IF public.door_filter_countries(ARRAY['XQ'], 'country') IS DISTINCT FROM ARRAY['XQ']::character(2)[] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): a well-formed code that names no market was not answered as itself';
    END IF;
    IF public.door_filter_countries(ARRAY(SELECT 'XZ' FROM generate_series(1, 20)), 'country') IS DISTINCT FROM ARRAY['XZ']::character(2)[] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): twenty values were refused';
    END IF;
    IF (SELECT array_agg(x ORDER BY x) FROM unnest(public.door_filter_categories(ARRAY[v_root], 'category')) x)
         IS DISTINCT FROM (SELECT array_agg(x ORDER BY x) FROM unnest(ARRAY[v_root, v_child, v_leaf]) x) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): a category list is not its root with the whole subtree';
    END IF;
    IF (SELECT array_agg(x ORDER BY x) FROM unnest(public.door_filter_categories(ARRAY[v_child, v_other, v_child], 'category')) x)
         IS DISTINCT FROM (SELECT array_agg(x ORDER BY x) FROM unnest(ARRAY[v_child, v_leaf, v_other]) x) THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): two roots do not answer the distinct union of their subtrees';
    END IF;
    IF public.door_filter_categories(ARRAY[v_nowhere], 'category') IS DISTINCT FROM ARRAY[v_nowhere] THEN
      RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (b): a category that exists nowhere was not answered as itself';
    END IF;

    -- (c) the refusals, each badValue:<field>
    FOR v_call, v_want IN VALUES
      ('public.door_filter_countries(ARRAY[''XYZ''], ''country'')', 'badValue:country'),
      ('public.door_filter_countries(ARRAY[''X1''], ''country'')', 'badValue:country'),
      ('public.door_filter_countries(ARRAY[''''], ''country'')', 'badValue:country'),
      ('public.door_filter_countries(ARRAY[''XZ'', NULL], ''country'')', 'badValue:country'),
      ('public.door_filter_countries(ARRAY(SELECT ''XZ'' FROM generate_series(1, 21)), ''country'')', 'badValue:country'),
      ('public.door_filter_categories(ARRAY[NULL]::uuid[], ''category'')', 'badValue:category'),
      ('public.door_filter_categories(ARRAY(SELECT gen_random_uuid() FROM generate_series(1, 21)), ''category'')', 'badValue:category'),
      (format('public.door_filter_categories(ARRAY(SELECT %L::uuid FROM generate_series(1, 21)), ''category'')', v_root), 'badValue:category')
    LOOP
      v_msg := NULL;
      BEGIN
        EXECUTE 'SELECT ' || v_call || '::text' INTO v_answer;
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
      END;
      IF v_msg IS DISTINCT FROM v_want THEN
        RAISE EXCEPTION 'cursor-bundle-2 part 1 proof (c): % answered % (expected %)', v_call, coalesce(v_msg, v_answer), v_want;
      END IF;
    END LOOP;

    RAISE EXCEPTION 'cursor-bundle-2-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'cursor-bundle-2-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261122040000') ON CONFLICT DO NOTHING;
