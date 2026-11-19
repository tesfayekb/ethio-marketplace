-- e2e-areas: posting, my-listings, admin-attributes, admin-categories, admin-imports, admin-locations, admin-translations

-- Foundations 1, turn F1-7a, part 10 of 10 — THE HELPERS CLOSE TO BROWSER ROLES (DEC-333, DEC-407; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md, decision 7;
-- census docs/governance/reports/f1-doors-7a.census.md).
-- THE HELPERS CLOSE (DEC-407's form; INC-1162: the class was the whole helper list). Thirty-one helpers whose every
-- caller runs as its owner — a definer door, an INVOKER core no browser role may run, or an INVOKER helper of the same
-- chain — lose their browser grant; their CHECK constraints and triggers sit on tables no browser role may write. No
-- browser code calls any of them (two e2e tests call two of them on the service role, which keeps its grant). Their
-- EXECUTE leaves anon, authenticated and PUBLIC. The bodies are unchanged (live md5s checked). This file is the last
-- of the stop: its revokes stand apart from every body change.

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
  v_svc  boolean;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170800') THEN
    RAISE EXCEPTION 'F1-7a part 10: the mark 20261119170800 must be applied first';
  END IF;
  FOR v_fn, v_want, v_svc IN VALUES
      ('public.assert_parent_not_catchall(uuid)', '7479a4f6b855e105f48f2b7de207c96f', true),
      ('public.attr_allowed_check(text,jsonb,jsonb,jsonb)', 'ccdcbfc822c0f7e356f3d3c8059a10cb', true),
      ('public.attr_answer_other_text(jsonb)', '8668ad50a65437852135e702afd6a051', true),
      ('public.attr_answer_tokens(jsonb)', '26d39934698be9051e18e1a6eebebc71', true),
      ('public.attr_bound_ok(text)', '8c6bd1891746cd863d4ebfd844cb372f', true),
      ('public.attr_bound_value(text)', '84b9d00295619e2a15c0896bc2692071', true),
      ('public.attr_bounds_targets(jsonb)', 'b08e84acc432452a3976d0d21c574739', true),
      ('public.attr_cats_expand(uuid[])', '062033660213b4966e150f75387c5408', true),
      ('public.attr_cell_check(text,text,text,text,integer,text,text,integer,text,text,text)', '8ed535c02a2724e034488e020cf227e9', true),
      ('public.attr_contact_like(text)', 'cb434d3c889594980d08fd4fe665675c', true),
      ('public.attr_export_payload(text)', '5cec4c6a3f3b2fdf68a739722bba05be', true),
      ('public.attr_inherited_ranks(uuid,jsonb)', '4eef07248ad243dff5a06737616d2d47', true),
      ('public.attr_link_cells_refusal(uuid,uuid,text[],jsonb,jsonb)', '2ca0e4f4bd4072bbe728c09003853c60', true),
      ('public.attr_option_norm_v2(jsonb)', 'b01b465f9a1965fa1c853dc6c3644634', true),
      ('public.attr_option_shape(text,jsonb)', '2df33bb0ea435190f95f67f83ba9e07e', true),
      ('public.attr_postplan_cats(text,jsonb)', '879db8e9bdce96aab6f9cc181a7a5df5', true),
      ('public.attr_preset_ok(text)', '1377013128760da20a28c4afe74a5f69', true),
      ('public.attr_rank_conflict(uuid,integer,text,jsonb)', '1e1965ccee3bedd0440adebc74c7db62', true),
      ('public.attr_split_option_cell(text)', 'd6fc93b76a34868ff7a2cc43a63291d7', true),
      ('public.attr_visible_when_met(jsonb,jsonb,jsonb)', '5ab8255b201c43104ef02414578f0e81', true),
      ('public.attr_visible_when_ok(jsonb)', '20a83804a1b8c68109d97292927fca9b', true),
      ('public.cat_primary_parent(uuid)', '2afedddceaa8735b686e17eb947f85f4', true),
      ('public.cat_primary_pointer(uuid)', '905b137a0805e9b9df6d850a491ec38d', true),
      ('public.catalog_find_norm(text)', 'fa72eaf330d105b782fc634a730f0b86', true),
      ('public.category_slug_candidate(text)', '1dd9c063550b2dfa5c341b0459736f72', false),
      ('public.entity_source_value(text,uuid,text)', '3d3a8a78d59cd6d31254282fee8c4d66', true),
      ('public.import_norm_text(text)', '59cf9a336b3a3c4ae025c73a24c67665', true),
      ('public.import_sanitize(jsonb)', '76d31599961c0a86a30825c83cc84405', true),
      ('public.location_slug_candidate(text,uuid)', 'b18e9221331c48277753077d6298defd', true),
      ('public.ui_translation_reviewable(text,boolean,boolean)', '4bec401735b1d6a176542aa78e8d2118', true),
      ('public.validate_listing_attributes(uuid,jsonb,jsonb,text[])', 'b8de9ceddf7e181034d60507363eda5e', true) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 10: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. the browser grants leave
REVOKE EXECUTE ON FUNCTION public.assert_parent_not_catchall(uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_allowed_check(text, jsonb, jsonb, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_answer_other_text(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_answer_tokens(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_bound_ok(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_bound_value(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_bounds_targets(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_cats_expand(uuid[]) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_cell_check(text, text, text, text, integer, text, text, integer, text, text, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_contact_like(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_export_payload(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_inherited_ranks(uuid, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_link_cells_refusal(uuid, uuid, text[], jsonb, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_option_norm_v2(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_postplan_cats(text, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_preset_ok(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_rank_conflict(uuid, integer, text, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_split_option_cell(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_visible_when_met(jsonb, jsonb, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.attr_visible_when_ok(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cat_primary_parent(uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cat_primary_pointer(uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.catalog_find_norm(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.category_slug_candidate(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.entity_source_value(text, uuid, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.import_norm_text(text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.import_sanitize(jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.location_slug_candidate(text, uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.ui_translation_reviewable(text, boolean, boolean) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_listing_attributes(uuid, jsonb, jsonb, text[]) FROM anon, authenticated, PUBLIC;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) every body is unchanged; none is callable by anon, authenticated or PUBLIC; the service role keeps what it
--       held;
--   (b) THE CALLERS THAT PROVE IT, read from the live catalogue: starting from each closed function, every function
--       of public that names it is either SECURITY DEFINER (it runs it as its owner) or an INVOKER function that no
--       browser role may run, which is followed in turn; a trigger function among them sits only on tables the
--       browser roles may neither INSERT, UPDATE nor DELETE; no policy, view or CHECK constraint of a browser-writable
--       table names any function of the chain.
DO $proof$
DECLARE
  v_fn      text;
  v_want    text;
  v_svc     boolean;
  v_chain   text[];
  v_i       integer;
  v_name    text;
  v_p       record;
  v_where   text;
  v_msg     text;
BEGIN
  -- (a)
  FOR v_fn, v_want, v_svc IN VALUES
      ('public.assert_parent_not_catchall(uuid)', '7479a4f6b855e105f48f2b7de207c96f', true),
      ('public.attr_allowed_check(text,jsonb,jsonb,jsonb)', 'ccdcbfc822c0f7e356f3d3c8059a10cb', true),
      ('public.attr_answer_other_text(jsonb)', '8668ad50a65437852135e702afd6a051', true),
      ('public.attr_answer_tokens(jsonb)', '26d39934698be9051e18e1a6eebebc71', true),
      ('public.attr_bound_ok(text)', '8c6bd1891746cd863d4ebfd844cb372f', true),
      ('public.attr_bound_value(text)', '84b9d00295619e2a15c0896bc2692071', true),
      ('public.attr_bounds_targets(jsonb)', 'b08e84acc432452a3976d0d21c574739', true),
      ('public.attr_cats_expand(uuid[])', '062033660213b4966e150f75387c5408', true),
      ('public.attr_cell_check(text,text,text,text,integer,text,text,integer,text,text,text)', '8ed535c02a2724e034488e020cf227e9', true),
      ('public.attr_contact_like(text)', 'cb434d3c889594980d08fd4fe665675c', true),
      ('public.attr_export_payload(text)', '5cec4c6a3f3b2fdf68a739722bba05be', true),
      ('public.attr_inherited_ranks(uuid,jsonb)', '4eef07248ad243dff5a06737616d2d47', true),
      ('public.attr_link_cells_refusal(uuid,uuid,text[],jsonb,jsonb)', '2ca0e4f4bd4072bbe728c09003853c60', true),
      ('public.attr_option_norm_v2(jsonb)', 'b01b465f9a1965fa1c853dc6c3644634', true),
      ('public.attr_option_shape(text,jsonb)', '2df33bb0ea435190f95f67f83ba9e07e', true),
      ('public.attr_postplan_cats(text,jsonb)', '879db8e9bdce96aab6f9cc181a7a5df5', true),
      ('public.attr_preset_ok(text)', '1377013128760da20a28c4afe74a5f69', true),
      ('public.attr_rank_conflict(uuid,integer,text,jsonb)', '1e1965ccee3bedd0440adebc74c7db62', true),
      ('public.attr_split_option_cell(text)', 'd6fc93b76a34868ff7a2cc43a63291d7', true),
      ('public.attr_visible_when_met(jsonb,jsonb,jsonb)', '5ab8255b201c43104ef02414578f0e81', true),
      ('public.attr_visible_when_ok(jsonb)', '20a83804a1b8c68109d97292927fca9b', true),
      ('public.cat_primary_parent(uuid)', '2afedddceaa8735b686e17eb947f85f4', true),
      ('public.cat_primary_pointer(uuid)', '905b137a0805e9b9df6d850a491ec38d', true),
      ('public.catalog_find_norm(text)', 'fa72eaf330d105b782fc634a730f0b86', true),
      ('public.category_slug_candidate(text)', '1dd9c063550b2dfa5c341b0459736f72', false),
      ('public.entity_source_value(text,uuid,text)', '3d3a8a78d59cd6d31254282fee8c4d66', true),
      ('public.import_norm_text(text)', '59cf9a336b3a3c4ae025c73a24c67665', true),
      ('public.import_sanitize(jsonb)', '76d31599961c0a86a30825c83cc84405', true),
      ('public.location_slug_candidate(text,uuid)', 'b18e9221331c48277753077d6298defd', true),
      ('public.ui_translation_reviewable(text,boolean,boolean)', '4bec401735b1d6a176542aa78e8d2118', true),
      ('public.validate_listing_attributes(uuid,jsonb,jsonb,text[])', 'b8de9ceddf7e181034d60507363eda5e', true) LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) FROM pg_proc WHERE oid = v_fn::regprocedure) IS DISTINCT FROM v_want
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0)
       OR has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE') IS DISTINCT FROM v_svc THEN
      RAISE EXCEPTION 'F1-7a part 10 proof (a): % is not its old body closed to browser roles', v_fn;
    END IF;

    -- (b)
    v_chain := ARRAY[(SELECT proname::text FROM pg_proc WHERE oid = v_fn::regprocedure)];
    v_i := 1;
    WHILE v_i <= array_length(v_chain, 1) LOOP
      v_name := v_chain[v_i];
      SELECT string_agg(schemaname || '.' || tablename || '.' || policyname, ', ') INTO v_where FROM pg_policies
       WHERE coalesce(qual, '') ~ ('\m' || v_name || '\M') OR coalesce(with_check, '') ~ ('\m' || v_name || '\M');
      IF v_where IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7a part 10 proof (b): % (chain of %) is named by the policy %', v_name, v_fn, v_where;
      END IF;
      SELECT string_agg(schemaname || '.' || viewname, ', ') INTO v_where FROM pg_views
       WHERE schemaname NOT IN ('pg_catalog', 'information_schema') AND definition ~ ('\m' || v_name || '\M');
      IF v_where IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7a part 10 proof (b): % (chain of %) is named by the view %', v_name, v_fn, v_where;
      END IF;
      SELECT string_agg(c.conrelid::regclass::text || '.' || c.conname, ', ') INTO v_where FROM pg_constraint c
       WHERE c.contype = 'c' AND pg_get_constraintdef(c.oid) ~ ('\m' || v_name || '\M')
         AND (has_table_privilege('anon', c.conrelid, 'INSERT') OR has_table_privilege('anon', c.conrelid, 'UPDATE')
              OR has_table_privilege('authenticated', c.conrelid, 'INSERT')
              OR has_table_privilege('authenticated', c.conrelid, 'UPDATE'));
      IF v_where IS NOT NULL THEN
        RAISE EXCEPTION 'F1-7a part 10 proof (b): % (chain of %) is named by a CHECK of a browser-writable table: %',
          v_name, v_fn, v_where;
      END IF;
      FOR v_p IN
        SELECT p.oid, p.proname::text AS proname, p.prosecdef, p.prorettype = 'trigger'::regtype AS is_trigger
          FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
         WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
           AND p.proname <> v_name AND p.prosrc ~ ('\m' || v_name || '\M')
      LOOP
        CONTINUE WHEN v_p.prosecdef OR v_p.proname = ANY (v_chain);
        IF v_p.is_trigger THEN
          SELECT string_agg(t.tgrelid::regclass::text, ', ') INTO v_where FROM pg_trigger t
           WHERE t.tgfoid = v_p.oid AND NOT t.tgisinternal
             AND (has_table_privilege('anon', t.tgrelid, 'INSERT') OR has_table_privilege('anon', t.tgrelid, 'UPDATE')
                  OR has_table_privilege('anon', t.tgrelid, 'DELETE')
                  OR has_table_privilege('authenticated', t.tgrelid, 'INSERT')
                  OR has_table_privilege('authenticated', t.tgrelid, 'UPDATE')
                  OR has_table_privilege('authenticated', t.tgrelid, 'DELETE'));
          IF v_where IS NOT NULL THEN
            RAISE EXCEPTION 'F1-7a part 10 proof (b): the trigger function % (chain of %) fires on browser-writable %',
              v_p.proname, v_fn, v_where;
          END IF;
        ELSIF has_function_privilege('anon', v_p.oid, 'EXECUTE') OR has_function_privilege('authenticated', v_p.oid, 'EXECUTE') THEN
          RAISE EXCEPTION 'F1-7a part 10 proof (b): the INVOKER function % (chain of %) is open to a browser role',
            v_p.proname, v_fn;
        END IF;
        v_chain := v_chain || v_p.proname;
      END LOOP;
      v_i := v_i + 1;
    END LOOP;
  END LOOP;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170900') ON CONFLICT DO NOTHING;
