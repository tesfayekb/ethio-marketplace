-- M-SHAPE ADDENDUM (INC-254) — attr_visible_when_ok WHOLE re-declaration.
--
-- WHY: the condition checker capped `in` at 8 values. A real condition needs 20
-- (authentic-original on the international fashion brands), so the cap becomes
-- 64. Nothing else changes: the same two keys, the same key charset, the same
-- string/non-blank value law, the same refusal names (`badVisibleWhen:badShape`).
--
-- PORTABILITY (the reason this file exists at all): the previous proofs anchored
-- on the live `voltage` definition, which staging does not hold — "PROOF setup:
-- voltage definition absent". Every proof below builds its OWN scratch rows and
-- deletes them, so the file runs identically on every database.

CREATE OR REPLACE FUNCTION public.attr_visible_when_ok(p_vw jsonb)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN p_vw IS NULL OR jsonb_typeof(p_vw) = 'null' THEN true
    WHEN jsonb_typeof(p_vw) <> 'object' THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_object_keys(p_vw) k WHERE k NOT IN ('key','in')) THEN false
    WHEN jsonb_typeof(p_vw->'key') <> 'string' THEN false
    WHEN COALESCE(p_vw->>'key','') !~ '^[a-z0-9_][a-z0-9_-]{1,63}$' THEN false
    WHEN jsonb_typeof(p_vw->'in') <> 'array' THEN false
    WHEN jsonb_array_length(p_vw->'in') < 1 OR jsonb_array_length(p_vw->'in') > 64 THEN false
    WHEN EXISTS (SELECT 1 FROM jsonb_array_elements(p_vw->'in') e
                  WHERE jsonb_typeof(e.value) <> 'string'
                     OR btrim(e.value #>> '{}') = '') THEN false
    ELSE true
  END;
$function$;

-- PROOF 1 — the checker itself: 8 (the old cap), 20 (the real condition) and 64
-- pass; 65 and the malformed shapes still refuse.
DO $$
DECLARE
  v_vals text[] := ARRAY[]::text[];
  v_20 jsonb;
BEGIN
  FOR i IN 1..64 LOOP v_vals := v_vals || ('brand_' || i::text); END LOOP;
  v_20 := jsonb_build_object('key','brand-fashion','in', to_jsonb(v_vals[1:20]));

  IF NOT public.attr_visible_when_ok(jsonb_build_object('key','a_b','in', to_jsonb(v_vals[1:8]))) THEN
    RAISE EXCEPTION 'PROOF 1 failed: 8 values refused';
  END IF;
  IF NOT public.attr_visible_when_ok(v_20) THEN
    RAISE EXCEPTION 'PROOF 1 failed: the 20-value condition refused';
  END IF;
  IF NOT public.attr_visible_when_ok(jsonb_build_object('key','a_b','in', to_jsonb(v_vals))) THEN
    RAISE EXCEPTION 'PROOF 1 failed: 64 values refused';
  END IF;
  IF public.attr_visible_when_ok(jsonb_build_object('key','a_b','in', to_jsonb(array_append(v_vals, 'brand_65'::text)))) THEN
    RAISE EXCEPTION 'PROOF 1 failed: 65 values accepted';
  END IF;
  IF public.attr_visible_when_ok(jsonb_build_object('key','a_b','in','[]'::jsonb)) THEN
    RAISE EXCEPTION 'PROOF 1 failed: an empty value list accepted';
  END IF;
  IF public.attr_visible_when_ok(jsonb_build_object('key','a_b','in', jsonb_build_array('x'), 'nope', 1)) THEN
    RAISE EXCEPTION 'PROOF 1 failed: an unknown key accepted';
  END IF;
  IF public.attr_visible_when_ok(jsonb_build_object('key','a_b','in', jsonb_build_array('  '))) THEN
    RAISE EXCEPTION 'PROOF 1 failed: a blank value accepted';
  END IF;
  IF public.attr_visible_when_ok(jsonb_build_object('key','Bad Key','in', jsonb_build_array('x'))) THEN
    RAISE EXCEPTION 'PROOF 1 failed: an illegal key charset accepted';
  END IF;
  RAISE NOTICE 'PROOF 1 ok: 8, 20 and 64 pass; 65, empty, unknown key, blank value and bad charset refuse';
END $$;

-- PROOF 2 — THE TABLE: a link row carrying the real 20-value condition is
-- accepted by `category_attribute_links_visible_when_shape`, and a 65-value one
-- is still rejected by it. Scratch rows only; removed at the end of the block.
DO $$
DECLARE
  v_cat uuid;
  v_sib uuid;
  v_dep uuid;
  v_vals text[] := ARRAY[]::text[];
  v_opts jsonb := '[]'::jsonb;
  v_link uuid;
  v_rejected boolean := false;
BEGIN
  FOR i IN 1..65 LOOP
    v_vals := v_vals || ('brand_' || i::text);
    IF i <= 20 THEN
      v_opts := v_opts || jsonb_build_array(jsonb_build_object(
        'value', 'brand_' || i::text, 'label_en', 'Brand ' || i::text));
    END IF;
  END LOOP;

  INSERT INTO public.categories (name_en, slug, display_order)
  VALUES ('e2e-mshape-addendum', 'e2e-mshape-addendum-' || gen_random_uuid()::text, 9999)
  RETURNING id INTO v_cat;

  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e-mshape-brand', 'Brand', 'single_select', v_opts)
  RETURNING id INTO v_sib;

  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('e2e-mshape-authentic', 'Authentic original', 'boolean')
  RETURNING id INTO v_dep;

  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
  VALUES (v_cat, v_sib, 1);

  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order, visible_when)
  VALUES (v_cat, v_dep, 2,
          jsonb_build_object('key','e2e-mshape-brand','in', to_jsonb(v_vals[1:20])))
  RETURNING id INTO v_link;

  IF v_link IS NULL THEN
    RAISE EXCEPTION 'PROOF 2 failed: the 20-value condition did not land';
  END IF;

  BEGIN
    UPDATE public.category_attribute_links
       SET visible_when = jsonb_build_object('key','e2e-mshape-brand','in', to_jsonb(v_vals))
     WHERE id = v_link;
  EXCEPTION WHEN check_violation THEN
    v_rejected := true;
  END;
  IF NOT v_rejected THEN
    RAISE EXCEPTION 'PROOF 2 failed: a 65-value condition was accepted by the table';
  END IF;

  IF (SELECT jsonb_array_length(visible_when->'in')
        FROM public.category_attribute_links WHERE id = v_link) <> 20 THEN
    RAISE EXCEPTION 'PROOF 2 failed: the stored condition is not the 20-value one';
  END IF;
  RAISE NOTICE 'PROOF 2 ok: the table stores a 20-value condition and still refuses 65';

  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_sib, v_dep);
  DELETE FROM public.categories WHERE id = v_cat;
END $$;

-- PROOF 3 — THE DOOR: the attributes-file planner plans a links row carrying the
-- 20-value condition with NO refusal, and still refuses a 65-value one as
-- `badVisibleWhen:badShape` — the unchanged refusal name. Scratch rows only.
DO $$
DECLARE
  v_cat uuid;
  v_slug text := 'e2e-mshape-door-' || gen_random_uuid()::text;
  v_sib uuid;
  v_dep uuid;
  v_vals text[] := ARRAY[]::text[];
  v_opts jsonb := '[]'::jsonb;
  v_cond20 text;
  v_cond65 text;
  v_plan jsonb;
  v_ref jsonb;
BEGIN
  FOR i IN 1..65 LOOP
    v_vals := v_vals || ('brand_' || i::text);
    IF i <= 20 THEN
      v_opts := v_opts || jsonb_build_array(jsonb_build_object(
        'value', 'brand_' || i::text, 'label_en', 'Brand ' || i::text));
    END IF;
  END LOOP;
  v_cond20 := 'e2e-mshape-brand=' || array_to_string(v_vals[1:20], '|');
  v_cond65 := 'e2e-mshape-brand=' || array_to_string(v_vals, '|');

  INSERT INTO public.categories (name_en, slug, display_order)
  VALUES ('e2e-mshape-door', v_slug, 9999) RETURNING id INTO v_cat;
  INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
  VALUES ('e2e-mshape-brand', 'Brand', 'single_select', v_opts) RETURNING id INTO v_sib;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
  VALUES ('e2e-mshape-authentic', 'Authentic original', 'boolean') RETURNING id INTO v_dep;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
  VALUES (v_cat, v_sib, 1);

  v_plan := public.attr_import_plan(
    '[]'::jsonb,
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', v_slug, 'attribute_key', 'e2e-mshape-authentic',
      'action', 'upsert', 'visible_when', v_cond20)),
    NULL);
  IF jsonb_array_length(COALESCE(v_plan->'refusals','[]'::jsonb)) <> 0 THEN
    RAISE EXCEPTION 'PROOF 3 failed: the 20-value condition refused by the planner %',
      v_plan->'refusals';
  END IF;

  v_plan := public.attr_import_plan(
    '[]'::jsonb,
    jsonb_build_array(jsonb_build_object(
      'row', 1, 'category_slug', v_slug, 'attribute_key', 'e2e-mshape-authentic',
      'action', 'upsert', 'visible_when', v_cond65)),
    NULL);
  v_ref := COALESCE(v_plan->'refusals'->0, '{}'::jsonb);
  IF COALESCE(v_ref->>'reason','') <> 'badVisibleWhen'
     OR COALESCE(v_ref->>'detail','') <> 'badShape' THEN
    RAISE EXCEPTION 'PROOF 3 failed: 65 values not refused as badShape %', v_plan->'refusals';
  END IF;
  RAISE NOTICE 'PROOF 3 ok: the planner accepts 20 values and refuses 65 with the unchanged name';

  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_sib, v_dep);
  DELETE FROM public.categories WHERE id = v_cat;
END $$;

-- READ-BACK — the definition carries the new cap and the old one is gone.
DO $$
DECLARE v_def text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'attr_visible_when_ok';
  IF v_def IS NULL OR position('> 64' in v_def) = 0 OR position('> 8 ' in v_def) > 0 THEN
    RAISE EXCEPTION 'READ-BACK failed: attr_visible_when_ok does not carry the 64 cap';
  END IF;
  RAISE NOTICE 'READ-BACK ok: attr_visible_when_ok is IMMUTABLE sql with the 64-value cap';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260922093000') ON CONFLICT DO NOTHING;