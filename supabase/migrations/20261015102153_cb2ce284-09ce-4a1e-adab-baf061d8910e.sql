-- Bundle 16 turn S1 (2026-10-15). Tier A. Abuse and cost guards, part 1 (D184; the operator's review of 2026-10-15).
-- e2e-areas: posting, admin-services
--
-- A. ai_record_spend(text, integer), redeclared whole from its live definition (20261013184636) with one change: at
--    100 % of its monthly budget photo screening switches itself off like every other AI feature (D184). Its new photos
--    are then held for staff, with no further spend (the upload route's hold, bundle 13 turn 6), and it comes back on
--    in the next month by the existing rule.
-- B. admin_set_ai_feature(text, boolean, integer, integer), redeclared whole from its live definition (20261014022725)
--    with one change: photo screening, like every other feature, is not switched on past its budget ('overBudget').
-- C. The photo storage is written and read by the server alone: the three client policies on storage.objects for the
--    listing-photos bucket (insert, owner read, owner delete) are dropped. Every photo has always gone through the
--    upload route, the server's photo links and the removal route, which use the service role; no screen uses them.
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): both bodies equal their live text beyond the
--    named change (checked by their distinctive lines) with their headers and privileges (restated as they stand);
--    no policy on storage.objects names the listing-photos bucket.

-- ===== A — ai_record_spend, whole =====
CREATE OR REPLACE FUNCTION public.ai_record_spend(p_feature text, p_units integer)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v         public.ai_features%ROWTYPE;
  v_day     date := (now() AT TIME ZONE 'utc')::date;
  v_first   date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month   timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_cost    bigint;
  v_spent   bigint;
  v_budget  bigint;
  v_level   smallint := 0;
BEGIN
  IF p_units IS NULL OR p_units < 0 THEN RAISE EXCEPTION 'badValue:units'; END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- A new month: the alert level starts again, and a feature its budget switched off in an earlier month comes back on.
  IF v.alert_month IS DISTINCT FROM v_first THEN
    v.alert_month := v_first;
    v.alert_level := 0;
  END IF;
  IF NOT v.enabled AND v.off_reason = 'budget' AND v.off_at < v_month THEN
    v.enabled := true;
    v.off_reason := NULL;
    v.off_at := NULL;
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (NULL, 'ai.budget_on', 'ai_feature', v.feature, jsonb_build_object('month', v_first));
  END IF;
  v_cost := p_units::bigint * v.unit_cost_microusd;
  INSERT INTO public.ai_spend_days AS d (feature, day, calls, units, cost_microusd)
  VALUES (v.feature, v_day, 1, p_units, v_cost)
  ON CONFLICT (feature, day) DO UPDATE
    SET calls = d.calls + 1,
        units = d.units + EXCLUDED.units,
        cost_microusd = d.cost_microusd + EXCLUDED.cost_microusd;
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF v.monthly_budget_cents IS NOT NULL THEN
    v_budget := v.monthly_budget_cents::bigint * 10000;
    v_level := CASE WHEN v_spent >= v_budget THEN 100
                    WHEN v_spent * 10 >= v_budget * 8 THEN 80
                    ELSE 0 END;
    IF v_level > v.alert_level THEN
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'ai.budget_alert', 'ai_feature', v.feature,
              jsonb_build_object('level', v_level, 'spent_microusd', v_spent,
                                 'budget_cents', v.monthly_budget_cents));
      v.alert_level := v_level;
    END IF;
    -- D158, D184 (bundle 16 turn S1): at the budget every feature switches itself off, photo screening
    -- included — its new photos are then held for staff, at no further spend, until next month.
    IF v_level = 100 AND v.enabled THEN
      v.enabled := false;
      v.off_reason := 'budget';
      v.off_at := now();
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'ai.budget_off', 'ai_feature', v.feature,
              jsonb_build_object('spent_microusd', v_spent, 'budget_cents', v.monthly_budget_cents));
    END IF;
  END IF;
  UPDATE public.ai_features
     SET enabled = v.enabled, off_reason = v.off_reason, off_at = v.off_at,
         alert_month = v.alert_month, alert_level = v.alert_level
   WHERE feature = v.feature;
  RETURN jsonb_build_object('feature', v.feature, 'on', v.enabled, 'spent_microusd', v_spent,
                            'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.ai_record_spend(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_record_spend(text, integer) TO service_role;

-- ===== B — admin_set_ai_feature, whole =====
CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(
  p_feature text,
  p_enabled boolean,
  p_monthly_budget_cents integer,
  p_unit_cost_microusd integer
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  IF p_enabled IS NULL THEN RAISE EXCEPTION 'badValue:enabled'; END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    RAISE EXCEPTION 'badValue:unitCost';
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    RAISE EXCEPTION 'badValue:budget';
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- D158 (bundle 13 turn 6) — photo screening may be switched off: new photos are then held
  -- for staff (listing_photos.unscreened) and shown to no buyer until the ad is approved.
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  -- D184 (bundle 16 turn S1): no feature, photo screening included, is switched on past its budget.
  IF p_enabled AND v_level = 100 THEN RAISE EXCEPTION 'overBudget'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO service_role;

-- ===== C — the photo storage, server only =====
DROP POLICY IF EXISTS listing_photos_object_insert ON storage.objects;
DROP POLICY IF EXISTS listing_photos_object_owner_read ON storage.objects;
DROP POLICY IF EXISTS listing_photos_object_owner_delete ON storage.objects;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_src text;
  v_n   integer;
BEGIN
  -- P1. ai_record_spend: the budget switches every feature off; the rest of the body as it was.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.ai_record_spend(text, integer)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src LIKE '%<> ''photo_screen''%'
     OR v_src NOT LIKE '%IF v_level = 100 AND v.enabled THEN%'
     OR v_src NOT LIKE '%''ai.budget_off''%'
     OR v_src NOT LIKE '%''ai.budget_on''%'
     OR v_src NOT LIKE '%''ai.budget_alert''%' THEN
    RAISE EXCEPTION 'B16S1 P1: the body of ai_record_spend is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.ai_record_spend(text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16S1 P1: ai_record_spend is not the service role''s alone';
  END IF;

  -- P2. admin_set_ai_feature: no feature switched on past its budget; step-up and permission kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src LIKE '%<> ''photo_screen''%'
     OR v_src NOT LIKE '%IF p_enabled AND v_level = 100 THEN RAISE EXCEPTION ''overBudget''; END IF;%'
     OR v_src NOT LIKE '%require_step_up_if_needed(''services'', ''manage'')%'
     OR v_src NOT LIKE '%has_permission(v_uid, ''services'', ''manage'')%' THEN
    RAISE EXCEPTION 'B16S1 P2: the body of admin_set_ai_feature is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16S1 P2: admin_set_ai_feature is open to anon or closed to signed-in users';
  END IF;

  -- P3. No policy on storage.objects names the listing-photos bucket: only the server's service role reaches it.
  SELECT count(*) INTO v_n FROM pg_policy p
   WHERE p.polrelid = 'storage.objects'::regclass
     AND (coalesce(pg_get_expr(p.polqual, p.polrelid), '') LIKE '%listing-photos%'
          OR coalesce(pg_get_expr(p.polwithcheck, p.polrelid), '') LIKE '%listing-photos%');
  IF v_n <> 0 THEN RAISE EXCEPTION 'B16S1 P3: % policies on storage.objects still name listing-photos', v_n; END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261016010000') ON CONFLICT (version) DO NOTHING;
