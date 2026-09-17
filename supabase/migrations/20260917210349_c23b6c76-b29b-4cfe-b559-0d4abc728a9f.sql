-- ============================================================
-- M-MAINT PART B — PROOFS P3 (categories cells) and P4 (option facts).
-- Every assertion RAISES on failure; the scratch rows are removed at the end.
-- No schema change; no function re-declared here.
-- ============================================================
DO $proof$
DECLARE
  v_uid   uuid := 'b3c1e67e-d5a4-4bc2-ac11-169ba5c011e1';  -- super_admin (categories.import)
  v_root  uuid;
  v_leaf  uuid;
  v_rows  jsonb;
  v_plan  jsonb;
  v_res   jsonb;
  v_batch uuid;
  v_row   public.categories%ROWTYPE;
  v_exp   jsonb;
  v_attr  uuid;
  v_opts  jsonb;
  v_txt   text;
  v_stepup boolean;
  v_lock0 boolean;
  v_period0 text;
BEGIN
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated',
                      'aal', 'aal2',
                      'amr', json_build_array(json_build_object('method','totp')))::text,
    true);
  -- ---------- fixtures ----------
  v_root := public.admin_create_category('E2E MMaint Root', 'e2e-mmaint-root', NULL, NULL,
                                         false, true, NULL, NULL, NULL);
  v_leaf := public.admin_create_category('E2E MMaint Leaf', 'e2e-mmaint-leaf', NULL, v_root,
                                         true, true, NULL, NULL, NULL);

  -- Step-up freshness is derived from a LIVE session's TOTP claim
  -- (auth.mfa_amr_claims), which a migration has no way to hold. The
  -- requirement is suspended for THIS transaction only and restored below,
  -- before the transaction ends; the gate itself is not weakened.
  SELECT p.requires_step_up INTO v_stepup
    FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = 'categories' AND p.action = 'import';
  UPDATE public.permissions p SET requires_step_up = false
    FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'categories' AND p.action = 'import';

  -- ---------- P3a: a file row carrying the three cells ----------
  v_rows := jsonb_build_array(jsonb_build_object(
              'row', 1, 'action', 'upsert',
              'category_slug', 'e2e-mmaint-leaf', 'parent_slug', 'e2e-mmaint-root',
              'name_en', 'E2E MMaint Leaf',
              'capabilities', 'map_pin|bookable',
              'default_price_period', 'month',
              'price_period_locked', 'false'));

  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'changes')::int <> 1
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'P3a FAILED (plan) — %', v_plan->'counts';
  END IF;
  IF NOT (v_plan->'items'->0->'fields' ? 'capabilities'
          AND v_plan->'items'->0->'fields' ? 'default_price_period') THEN
    RAISE EXCEPTION 'P3a FAILED (fields) — %', v_plan->'items'->0;
  END IF;

  v_res := public.admin_commit_category_import(v_rows, NULL, 'p3');
  SELECT c.price_period_locked, c.default_price_period INTO v_lock0, v_period0
    FROM public.categories c WHERE c.id = v_leaf;
  v_batch := (v_res->>'batch_id')::uuid;
  SELECT * INTO v_row FROM public.categories WHERE id = v_leaf;
  IF NOT ('map_pin' = ANY (v_row.capabilities) AND 'bookable' = ANY (v_row.capabilities))
     OR v_row.default_price_period <> 'month'
     OR v_row.price_period_locked <> false THEN
    RAISE EXCEPTION 'P3a FAILED (applied) — caps=% period=% locked=%',
      v_row.capabilities, v_row.default_price_period, v_row.price_period_locked;
  END IF;

  -- ---------- P3b: the export echoes the three cells ----------
  v_exp := public.cat_export_row(v_leaf);
  IF v_exp->>'default_price_period' <> 'month'
     OR v_exp->>'price_period_locked' <> 'false'
     OR v_exp->>'capabilities' NOT IN ('map_pin|bookable','bookable|map_pin') THEN
    RAISE EXCEPTION 'P3b FAILED (export) — %', v_exp;
  END IF;

  -- ---------- P3c: an unknown capability is refused BY NAME ----------
  v_plan := public.cat_import_plan(jsonb_build_array(jsonb_build_object(
              'row', 1, 'action', 'upsert',
              'category_slug', 'e2e-mmaint-leaf', 'parent_slug', 'e2e-mmaint-root',
              'name_en', 'E2E MMaint Leaf',
              'capabilities', 'bookable|fly')), NULL);
  IF v_plan->'refusals'->0->>'reason' <> 'badCapability'
     OR v_plan->'refusals'->0->>'detail' <> 'fly'
     OR (v_plan->'counts'->>'changes')::int <> 0 THEN
    RAISE EXCEPTION 'P3c FAILED — %', v_plan;
  END IF;

  -- ---------- P3d: an unknown period is refused ----------
  v_plan := public.cat_import_plan(jsonb_build_array(jsonb_build_object(
              'row', 1, 'action', 'upsert',
              'category_slug', 'e2e-mmaint-leaf', 'parent_slug', 'e2e-mmaint-root',
              'name_en', 'E2E MMaint Leaf',
              'default_price_period', 'fortnight')), NULL);
  IF v_plan->'refusals'->0->>'reason' <> 'badPeriod'
     OR v_plan->'refusals'->0->>'detail' <> 'fortnight' THEN
    RAISE EXCEPTION 'P3d FAILED — %', v_plan;
  END IF;

  -- ---------- P3e: undo brings the previous cells back ----------
  PERFORM public.admin_undo_category_import(v_batch);
  UPDATE public.permissions p SET requires_step_up = v_stepup
    FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'categories' AND p.action = 'import';
  SELECT * INTO v_row FROM public.categories WHERE id = v_leaf;
  -- the cells stand as they did BEFORE the import: no capabilities, the
  -- category's own period, and its own lock (which the file had flipped).
  IF COALESCE(array_length(v_row.capabilities,1),0) <> 0
     OR v_row.default_price_period = 'month'
     OR v_row.price_period_locked = v_lock0 THEN
    RAISE EXCEPTION 'P3e FAILED (undo) — caps=% period=% locked=%',
      v_row.capabilities, v_row.default_price_period, v_row.price_period_locked;
  END IF;

  -- ---------- P4: the option `facts` cell ----------
  IF public.attr_option_shape('spec', '[{"value":"iphone13","label_en":"iPhone 13",
        "facts":{"screen":"6.1","year":2021,"colors":["black","blue"]}}]'::jsonb) IS NOT NULL THEN
    RAISE EXCEPTION 'P4a FAILED — a well-formed facts object was refused: %',
      public.attr_option_shape('spec', '[{"value":"iphone13","facts":{"screen":"6.1"}}]'::jsonb);
  END IF;

  v_txt := public.attr_option_shape('spec', '[{"value":"x","facts":{"bad key!":1}}]'::jsonb);
  IF v_txt IS NULL OR v_txt NOT LIKE '%badFacts:key:bad key!%' THEN
    RAISE EXCEPTION 'P4b FAILED — %', COALESCE(v_txt, 'accepted');
  END IF;
  v_txt := public.attr_option_shape('spec', '[{"value":"x","facts":[1,2]}]'::jsonb);
  IF v_txt IS NULL OR v_txt NOT LIKE '%badFacts:notObject%' THEN
    RAISE EXCEPTION 'P4b FAILED (notObject) — %', COALESCE(v_txt, 'accepted');
  END IF;
  v_txt := public.attr_option_shape('spec', '[{"value":"x","facts":{"screen":{"a":1}}}]'::jsonb);
  IF v_txt IS NULL OR v_txt NOT LIKE '%badFacts:value:screen%' THEN
    RAISE EXCEPTION 'P4b FAILED (value) — %', COALESCE(v_txt, 'accepted');
  END IF;
  -- the prior allowlist keys still pass unchanged
  IF public.attr_option_shape('spec', '[{"value":"x","allowed":{"model":["a","b"]},
        "bounds":{"year":{"min":"2000","max":"2020"}},"aliases":["xx"],"active":true}]'::jsonb)
     IS NOT NULL THEN
    RAISE EXCEPTION 'P4b FAILED — a pre-existing option shape regressed';
  END IF;

  -- the public options read PROJECTS facts for active options
  v_attr := public.admin_upsert_attribute(
              NULL, 'e2e_mmaint_model', 'E2E MMaint Model', 'single_select',
              '[{"value":"iphone13","label_en":"iPhone 13","facts":{"screen":"6.1","year":2021}},
                {"value":"gone","label_en":"Gone","active":false,"facts":{"screen":"5.0"}}]'::jsonb,
              NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
  v_opts := public.get_attribute_options(v_attr);
  IF jsonb_array_length(v_opts->'options') <> 1
     OR v_opts->'options'->0->'facts'->>'screen' <> '6.1'
     OR v_opts->'options'->0->'facts'->>'year' <> '2021' THEN
    RAISE EXCEPTION 'P4c FAILED (options read) — %', v_opts;
  END IF;

  -- the VALIDATOR ignores facts entirely: a listing value is judged by the
  -- option list alone, and a facts-carrying option behaves like any other.
  IF (public.validate_listing_attributes(v_leaf,
        jsonb_build_object('e2e_mmaint_model','iphone13'), NULL)->>'ok') IS NULL THEN
    RAISE EXCEPTION 'P4d FAILED — the validator did not answer';
  END IF;

  -- ---------- cleanup ----------
  -- The scratch rows leave DIRECTLY: the delete doors demand a live TOTP
  -- session, which a migration cannot hold, and this teardown asserts nothing.
  DELETE FROM public.attributes WHERE attr_key LIKE 'e2e_mmaint%';
  DELETE FROM public.category_import_revisions WHERE batch_id = v_batch;
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id IN (v_leaf, v_root);
  DELETE FROM public.category_country_exclusions WHERE category_id IN (v_leaf, v_root);
  DELETE FROM public.category_tree_pointers
   WHERE child_id IN (v_leaf, v_root) OR parent_id IN (v_leaf, v_root);
  DELETE FROM public.categories WHERE id IN (v_leaf, v_root);
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mmaint-%')
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e_mmaint%') THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch rows survive';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'categories' AND p.action = 'import'
                    AND p.requires_step_up IS NOT DISTINCT FROM v_stepup) THEN
    RAISE EXCEPTION 'PROOF FAILED — the step-up requirement was not restored';
  END IF;

  RAISE NOTICE 'P3 and P4 PASSED';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260917150500') ON CONFLICT DO NOTHING;