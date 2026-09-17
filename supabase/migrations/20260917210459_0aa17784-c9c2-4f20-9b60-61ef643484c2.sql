-- ============================================================
-- M-MAINT PART A — PROOF P1 (INC-215): a countries-file row carrying `open`
-- AND a field edit plans as one reopening PLUS one change, commits both, and
-- undoes both. Assertions RAISE; the scratch market is removed at the end.
-- ============================================================
DO $proof$
DECLARE
  v_uid    uuid := 'b3c1e67e-d5a4-4bc2-ac11-169ba5c011e1';  -- super_admin
  v_rows   jsonb;
  v_plan   jsonb;
  v_res    jsonb;
  v_batch  uuid;
  v_cty    public.countries%ROWTYPE;
  v_stepup boolean;
BEGIN
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2')::text, true);

  DELETE FROM public.locations WHERE country_code = 'ZZ';
  DELETE FROM public.countries WHERE code = 'ZZ';
  INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
  VALUES ('ZZ', 'E2E MMaint Market', false, 'metric', 'USD', 9000);

  -- Step-up freshness comes from a LIVE session's TOTP claim, which a
  -- migration cannot hold; suspended for THIS transaction only and restored
  -- below. The gate itself is not weakened.
  SELECT p.requires_step_up INTO v_stepup
    FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = 'locations' AND p.action = 'import';
  UPDATE public.permissions p SET requires_step_up = false
    FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'locations' AND p.action = 'import';

  v_rows := jsonb_build_array(jsonb_build_object(
              'row', 1, 'country_code', 'ZZ', 'action', 'open',
              'name_en', 'E2E MMaint Market',
              'unit_system', 'metric',
              'currency_code', 'ETB',
              'display_order', '9000'));

  -- ---------- P1a: the preview counts BOTH ----------
  v_plan := public.loc_import_plan(v_rows, NULL, NULL);
  IF (v_plan->'counts'->>'reactivations')::int <> 1
     OR (v_plan->'counts'->>'changes')::int <> 1
     OR (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0
     OR v_plan->'items'->0->>'op' <> 'open+update' THEN
    RAISE EXCEPTION 'P1a FAILED — %', v_plan;
  END IF;

  -- ---------- P1b: the commit applies BOTH ----------
  v_res := public.admin_commit_location_import(v_rows, NULL, NULL, 'p1');
  v_batch := (v_res->>'batch_id')::uuid;
  SELECT * INTO v_cty FROM public.countries WHERE code = 'ZZ';
  IF NOT v_cty.is_active OR v_cty.currency_code <> 'ETB' THEN
    RAISE EXCEPTION 'P1b FAILED — active=% currency=%', v_cty.is_active, v_cty.currency_code;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.locations
                  WHERE country_code = 'ZZ' AND level = 'country' AND is_active) THEN
    RAISE EXCEPTION 'P1b FAILED — the reopened market has no active anchor';
  END IF;

  -- ---------- P1c: undo reverts BOTH ----------
  PERFORM public.admin_undo_location_import(v_batch);
  SELECT * INTO v_cty FROM public.countries WHERE code = 'ZZ';
  IF v_cty.is_active OR v_cty.currency_code <> 'USD' THEN
    RAISE EXCEPTION 'P1c FAILED — active=% currency=%', v_cty.is_active, v_cty.currency_code;
  END IF;

  UPDATE public.permissions p SET requires_step_up = v_stepup
    FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'locations' AND p.action = 'import';

  -- ---------- teardown ----------
  DELETE FROM public.location_import_revisions WHERE batch_id = v_batch;
  DELETE FROM public.country_root_order WHERE country_code = 'ZZ';
  DELETE FROM public.locations WHERE country_code = 'ZZ';
  DELETE FROM public.countries WHERE code = 'ZZ';
  IF EXISTS (SELECT 1 FROM public.countries WHERE code = 'ZZ')
     OR EXISTS (SELECT 1 FROM public.locations WHERE country_code = 'ZZ') THEN
    RAISE EXCEPTION 'PROOF CLEANUP FAILED — scratch market survives';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'locations' AND p.action = 'import'
                    AND p.requires_step_up IS NOT DISTINCT FROM v_stepup) THEN
    RAISE EXCEPTION 'PROOF FAILED — the step-up requirement was not restored';
  END IF;

  RAISE NOTICE 'P1 PASSED';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260917151000') ON CONFLICT DO NOTHING;