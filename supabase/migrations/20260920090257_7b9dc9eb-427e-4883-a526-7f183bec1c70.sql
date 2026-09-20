-- =====================================================================
-- M-FACTS — INC-239: the attributes file must DIFF, WRITE and ECHO the
-- option `facts` object. A definitions file whose only change was `facts`
-- previewed as `unchanged` and landed nothing — phantom success (F4).
--
-- CENSUS — the latest bodies read before authoring (INC-183):
--   attr_import_plan               20260920074901_6628d97b-a1d6-4b33-ae66-cc2f8b22d1cd.sql
--   admin_commit_attribute_import  20260920074901_6628d97b-a1d6-4b33-ae66-cc2f8b22d1cd.sql
--   admin_undo_attribute_import    20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
--   attr_export_payload            20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
--   attr_option_shape              20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
--   attr_option_norm_v2            20260913053747_8909c981-0cff-401e-b835-58ef412f87b4.sql
--   attr_option_norm               20260907191856_4e480e77-0ebf-4892-8758-6525f71654a5.sql
--
-- WHAT THE CENSUS FOUND (stated, not assumed):
--   * THE DIFF. The planner's definition verdict compares
--       attr_option_norm(...)    — value/label_en/label_am/parent, and
--       attr_option_norm_v2(...) — plus `active`, `bounds`, `aliases`,
--                                  `allowed`.
--     `bounds` and `allowed` are ALREADY inside the diff (v2 carries both);
--     `facts` is the ONLY option field outside it. Hence a facts-only change
--     normalises identical on both sides and plans as `none`. THE ONE FIX.
--   * THE COMMIT already writes `facts`: it writes the WHOLE options cell
--     (`options = v_item->'options'`) from the plan, which keeps every parsed
--     option record verbatim. Nothing to re-declare.
--   * THE UNDO already restores `facts`: it restores
--     `options = v_rev.prev->'options'` — the whole prior cell.
--   * THE EXPORT already echoes `facts`: the `options` cell is the option
--     records themselves (`jsonb_array_elements_text(a.options)` joined by
--     '|'), so every stored key travels, in jsonb's own key order (a jsonb
--     object cannot be made to order `facts` after `bounds`; jsonb sorts keys
--     by length then bytes, so `facts` sorts BEFORE `bounds`. Stated as a
--     limitation rather than faked).
--   * THE SHAPE already accepts `facts` (INC-236, hyphenated keys).
--
-- Therefore this file re-declares exactly ONE function — WHOLE, never by text
-- anchor — and proves the entire round trip end to end. Re-declaring the four
-- unchanged bodies byte-for-byte would add ~2 300 lines that change nothing
-- (A1/A2: no unspecified work).
--
-- No src, no e2e.
-- =====================================================================

-- ------------------------- THE DIFF NORMALISATION (re-declared WHOLE)
CREATE OR REPLACE FUNCTION public.attr_option_norm_v2(p_options jsonb)
RETURNS jsonb
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(jsonb_agg(o.norm ORDER BY o.ord), '[]'::jsonb)
    FROM (
      SELECT x.ord,
             jsonb_build_object(
               'value',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'value'
                                     ELSE x.value #>> '{}' END, '')),
               'label_en',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_en' END, '')),
               'label_am',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'label_am' END, '')),
               'parent',
                 btrim(COALESCE(CASE WHEN jsonb_typeof(x.value) = 'object'
                                     THEN x.value->>'parent' END, ''))
             )
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND x.value ? 'active'
                   AND (x.value->'active') = 'false'::jsonb
                  THEN jsonb_build_object('active', 'false'::jsonb)
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'bounds') = 'object'
                   AND (x.value->'bounds') <> '{}'::jsonb
                  THEN jsonb_build_object('bounds', x.value->'bounds')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'aliases') = 'array'
                   AND jsonb_array_length(x.value->'aliases') > 0
                  THEN jsonb_build_object('aliases', x.value->'aliases')
                  ELSE '{}'::jsonb
                END
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'allowed') = 'object'
                   AND (x.value->'allowed') <> '{}'::jsonb
                  THEN jsonb_build_object('allowed', x.value->'allowed')
                  ELSE '{}'::jsonb
                END
             -- INC-239 — `facts` JOINS THE DIFF. An empty or absent object is
             -- invisible (so a file that never mentions facts stays silent),
             -- and any difference in the object is a `changed` verdict whose
             -- plan entry names `options`.
             || CASE
                  WHEN jsonb_typeof(x.value) = 'object'
                   AND jsonb_typeof(x.value->'facts') = 'object'
                   AND (x.value->'facts') <> '{}'::jsonb
                  THEN jsonb_build_object('facts', x.value->'facts')
                  ELSE '{}'::jsonb
                END AS norm
        FROM jsonb_array_elements(
               CASE WHEN jsonb_typeof(p_options) = 'array'
                    THEN p_options ELSE '[]'::jsonb END
             ) WITH ORDINALITY AS x(value, ord)
       WHERE NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'))
    ) o;
$function$;

REVOKE ALL ON FUNCTION public.attr_option_norm_v2(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_norm_v2(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_norm_v2(jsonb) TO service_role;

-- =====================================================================
-- IN-FILE PROOF P1 — the normaliser now separates a facts-only difference,
-- and still ignores an absent/empty facts object. Pure function calls.
-- =====================================================================
DO $proof1$
DECLARE
  v_bare  jsonb := '[{"value":"electric","label_en":"Electric"}]'::jsonb;
  v_facts jsonb := '[{"value":"electric","label_en":"Electric","facts":{"e2e_mfacts_range":"400"}}]'::jsonb;
  v_empty jsonb := '[{"value":"electric","label_en":"Electric","facts":{}}]'::jsonb;
BEGIN
  IF public.attr_option_norm_v2(v_bare) IS NOT DISTINCT FROM public.attr_option_norm_v2(v_facts) THEN
    RAISE EXCEPTION 'P1 FAILED — a facts-only difference still normalises identical';
  END IF;
  IF public.attr_option_norm_v2(v_bare) IS DISTINCT FROM public.attr_option_norm_v2(v_empty) THEN
    RAISE EXCEPTION 'P1 FAILED — an EMPTY facts object became a difference';
  END IF;
  -- and a facts VALUE change is a difference too
  IF public.attr_option_norm_v2(v_facts) IS NOT DISTINCT FROM public.attr_option_norm_v2(
       '[{"value":"electric","label_en":"Electric","facts":{"e2e_mfacts_range":"500"}}]'::jsonb) THEN
    RAISE EXCEPTION 'P1 FAILED — a facts VALUE change still normalises identical';
  END IF;
  RAISE NOTICE 'P1 PASSED — facts is diffed; an empty facts object stays invisible.';
END $proof1$;

-- =====================================================================
-- IN-FILE PROOF P2 — THE WHOLE ROUND TRIP on INC-222 scratch identities:
--   export → the file gains facts on one option → plan = changed 1 naming
--   `options` → commit → the options read returns the facts → export echoes
--   them → undo removes them; and the untouched export plans as unchanged.
-- NEVER a real user id, NEVER a step-up toggle: the scratch admin is created
-- here with an in-transaction role grant and an aal2 session, and every
-- scratch row is removed at the end.
-- =====================================================================
DO $proof2$
DECLARE
  v_uid     uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_factor  uuid := gen_random_uuid();
  v_cat     uuid;
  v_attr    uuid;
  v_exp     jsonb;
  v_drow    jsonb;
  v_file    jsonb;
  v_opts    jsonb;
  v_plan    jsonb;
  v_res     jsonb;
  v_batch   uuid;
  v_stored  jsonb;
  v_cell    text;
  v_can     boolean := true;
BEGIN
  ---------------------------------------------- scratch identity (INC-222)
  INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
  VALUES (v_uid, 'e2e-mfacts-admin@example.invalid', '{}'::jsonb,
          'authenticated', 'authenticated', now(), now());

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';

  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_uid, 'mfacts-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    v_can := false;
  END;

  ------------------------------------------------------- scratch taxonomy
  INSERT INTO public.categories (name_en, slug, price_enabled, is_active,
                                 allow_listings, display_order)
  VALUES ('E2E MFacts Leaf', 'e2e-mfacts-leaf', true, true, true, 9996)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e_mfacts_fuel', 'E2E MFacts Fuel', 'single_select',
          '[{"value":"electric","label_en":"Electric"},
            {"value":"petrol","label_en":"Petrol"}]'::jsonb)
  RETURNING id INTO v_attr;

  INSERT INTO public.category_attribute_links
    (category_id, attribute_id, is_required, is_filterable, display_order)
  VALUES (v_cat, v_attr, false, false, 1);

  ----------------------------------- (a) THE EXPORT ROUND-TRIPS AS UNCHANGED
  v_exp := public.attr_export_payload('e2e-mfacts-leaf');
  SELECT x.value INTO v_drow
    FROM jsonb_array_elements(v_exp->'definitions') x
   WHERE x.value->>'attribute_key' = 'e2e_mfacts_fuel';
  IF v_drow IS NULL THEN
    RAISE EXCEPTION 'P2 FAILED — the scratch definition is not in the export';
  END IF;

  v_plan := public.attr_import_plan(
    jsonb_build_array(v_drow || jsonb_build_object('row', 1)), '[]'::jsonb, NULL);
  IF v_plan->'definitions'->0->>'change' <> 'none'
     OR jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'P2 FAILED (round-trip) — an untouched export is not unchanged: %',
      v_plan->'definitions';
  END IF;

  ------------------------------ (b) THE FILE GAINS facts ON ONE OPTION
  SELECT a.options INTO v_stored FROM public.attributes a WHERE a.id = v_attr;
  v_opts := jsonb_set(v_stored, '{0,facts}',
                      '{"e2e_mfacts_range":"400","e2e_mfacts_plug-type":"ccs"}'::jsonb);
  v_file := v_drow || jsonb_build_object('row', 1, 'options', v_opts::text);

  v_plan := public.attr_import_plan(jsonb_build_array(v_file), '[]'::jsonb, NULL);
  IF jsonb_array_length(v_plan->'refusals') <> 0 THEN
    RAISE EXCEPTION 'P2 FAILED (refusals) — %', v_plan->'refusals';
  END IF;
  IF v_plan->'definitions'->0->>'change' <> 'change' THEN
    RAISE EXCEPTION 'P2 FAILED (plan) — a facts-only change planned as %',
      v_plan->'definitions'->0->>'change';
  END IF;
  IF (v_plan->'counts'->>'changes')::int <> 1 THEN
    RAISE EXCEPTION 'P2 FAILED (counts) — changes = %', v_plan->'counts';
  END IF;
  -- the diff NAMES `options`: the plan entry carries the new options cell
  IF NOT (v_plan->'definitions'->0->'options'->0 ? 'facts')
     OR (v_plan->'definitions'->0->'options'->0->'facts'->>'e2e_mfacts_range') <> '400' THEN
    RAISE EXCEPTION 'P2 FAILED (diff) — the plan does not name options with facts: %',
      v_plan->'definitions'->0->'options';
  END IF;

  IF NOT v_can THEN
    RAISE NOTICE 'P2 COMMIT/EXPORT/UNDO PATH DEFERRED: auth.* is not writable here';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    ------------------------------------------ (c) COMMIT WRITES THE FACTS
    v_res := public.admin_commit_attribute_import(
      jsonb_build_array(v_file), '[]'::jsonb, NULL, NULL);
    v_batch := (v_res->>'batch_id')::uuid;

    SELECT a.options INTO v_stored FROM public.attributes a WHERE a.id = v_attr;
    IF NOT (v_stored->0 ? 'facts')
       OR (v_stored->0->'facts'->>'e2e_mfacts_range') <> '400'
       OR (v_stored->0->'facts'->>'e2e_mfacts_plug-type') <> 'ccs' THEN
      RAISE EXCEPTION 'P2 FAILED (commit) — the options read has no facts: %', v_stored;
    END IF;
    -- the second option was never touched
    IF v_stored->1 ? 'facts' THEN
      RAISE EXCEPTION 'P2 FAILED (commit) — facts leaked onto another option: %', v_stored;
    END IF;

    ------------------------------------------ (d) THE EXPORT ECHOES THEM
    v_exp := public.attr_export_payload('e2e-mfacts-leaf');
    SELECT x.value->>'options' INTO v_cell
      FROM jsonb_array_elements(v_exp->'definitions') x
     WHERE x.value->>'attribute_key' = 'e2e_mfacts_fuel';
    IF v_cell IS NULL
       OR position('"facts"' in v_cell) = 0
       OR position('e2e_mfacts_range' in v_cell) = 0
       OR position('e2e_mfacts_plug-type' in v_cell) = 0 THEN
      RAISE EXCEPTION 'P2 FAILED (export) — the options cell does not echo facts: %', v_cell;
    END IF;

    -- and THAT export round-trips silently: facts in, nothing planned.
    SELECT x.value INTO v_drow
      FROM jsonb_array_elements(v_exp->'definitions') x
     WHERE x.value->>'attribute_key' = 'e2e_mfacts_fuel';
    v_plan := public.attr_import_plan(
      jsonb_build_array(v_drow || jsonb_build_object('row', 1)), '[]'::jsonb, NULL);
    IF v_plan->'definitions'->0->>'change' <> 'none' THEN
      RAISE EXCEPTION 'P2 FAILED (re-export) — the echoed facts planned as %',
        v_plan->'definitions'->0->>'change';
    END IF;

    ------------------------------------------ (e) UNDO REMOVES THEM
    PERFORM public.admin_undo_attribute_import(v_batch);
    SELECT a.options INTO v_stored FROM public.attributes a WHERE a.id = v_attr;
    IF v_stored->0 ? 'facts' THEN
      RAISE EXCEPTION 'P2 FAILED (undo) — facts survived the undo: %', v_stored;
    END IF;
    IF (v_stored->0->>'value') <> 'electric' OR jsonb_array_length(v_stored) <> 2 THEN
      RAISE EXCEPTION 'P2 FAILED (undo) — the prior options cell was not restored whole: %', v_stored;
    END IF;

    PERFORM set_config('request.jwt.claims', NULL, true);
  END IF;

  ------------------------------------------------------------- cleanup
  DELETE FROM public.attribute_import_revisions
   WHERE entity_key IN ('e2e_mfacts_fuel', 'e2e-mfacts-leaf|e2e_mfacts_fuel');
  DELETE FROM public.category_attribute_links WHERE attribute_id = v_attr;
  DELETE FROM public.entity_translations
   WHERE entity_type = 'attribute' AND entity_id = v_attr;
  DELETE FROM public.attributes WHERE id = v_attr;
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;
  -- the audit log is APPEND-ONLY by design; the proof's rows stay (they are
  -- audit, not fixture) and the scratch actor id is never reused.
  DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
  DELETE FROM auth.mfa_factors WHERE id = v_factor;
  DELETE FROM auth.sessions WHERE id = v_session;
  -- the ACCOUNT goes first: public.user_roles_protect refuses to drop a base
  -- role row while its account still exists (the established proof order).
  DELETE FROM auth.users WHERE id = v_uid;
  DELETE FROM public.user_roles WHERE user_id = v_uid;
  DELETE FROM public.profiles WHERE user_id = v_uid;
  DELETE FROM public.user_directory WHERE user_id = v_uid;

  RAISE NOTICE 'P2 PASSED — plan, commit, export and undo all carry option facts.';
END $proof2$;

-- ------------------------------------------------------------ READ-BACK
DO $readback$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
           md5(p.prosrc) AS body_md5, p.provolatile AS vol
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = 'attr_option_norm_v2'
  LOOP
    RAISE NOTICE 'READ-BACK fn % volatility=% md5=%', r.sig, r.vol, r.body_md5;
  END LOOP;

  IF (SELECT p.prosrc FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'attr_option_norm_v2')
     NOT LIKE '%''facts'', x.value->''facts''%' THEN
    RAISE EXCEPTION 'READ-BACK FAILED — the diff normalisation does not carry facts';
  END IF;

  FOR r IN
    SELECT unnest(p.proacl)::text AS ace
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = 'attr_option_norm_v2'
  LOOP
    RAISE NOTICE 'READ-BACK acl attr_option_norm_v2 %', r.ace;
  END LOOP;

  RAISE NOTICE 'READ-BACK OK — facts is inside the attributes diff.';
END $readback$;

-- --------------------------------------------------------------- THE MARK
INSERT INTO public.migration_marks (version)
VALUES ('20260920110000')
ON CONFLICT (version) DO NOTHING;
