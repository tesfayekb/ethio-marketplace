-- Bundle 13 (photos, D154–D159), turn 1 (2026-10-13). Tier A. The AI meter and switches (D158, INC-600).
-- e2e-areas: admin-services, posting, admin-categories, admin-translations
-- The rule (D158, the operator, 2026-10-13): every AI feature has an on/off switch, a monthly budget and the spend so
-- far; at its budget every feature switches itself off except photo screening, which only alerts. This file is the
-- door half: the switches and the meter. The page (Admin › Services › AI) is the next turn; photos held for staff
-- while screening is off come after it, so until then photo screening cannot be switched off (its door refuses).
-- A. The resource `services` and its permissions: view (no second factor) and manage (a second factor, as every
--    admin change). No role is granted either: the super admin holds every permission (has_permission).
-- B. Two tables, closed to browser roles (RLS on, deny policies, service_role only):
--    ai_features — one row per AI feature: on/off and why, the monthly budget in cents (null = none), the price of
--      one unit in millionths of a dollar (an ESTIMATE until the provider's bill; staff edit it), the unit (a call,
--      or a character for translations), the month's alert level; six rows seeded. A row named e2e-… is a test's
--      scratch row: no code path names it and the admin list leaves it out.
--    ai_spend_days — per feature and UTC day: calls, units and cost.
-- C. Two service-only doors (no browser role may call them; the server calls them with the service role):
--    ai_feature_gate(feature) — on, or off with its reason; a feature switched off by its budget in an earlier month
--      reads as on (each month's budget starts again);
--    ai_record_spend(feature, units) — one call and its units on today's row at the feature's price; at 80 % and at
--      100 % of the budget an audit row ('ai.budget_alert', once a level a month); at 100 % the feature switches off
--      ('ai.budget_off'), photo screening excepted; a budget-off feature from an earlier month comes back on first
--      ('ai.budget_on').
-- D. Two admin doors (authenticated; each checks its permission itself):
--    admin_ai_features() — services:view; every feature with its state, budget, price and this month's spend;
--    admin_set_ai_feature(feature, enabled, budget, price) — services:manage and a fresh second factor; refuses
--      switching photo screening off (screeningStaysOn), switching on a feature at or over a budget (overBudget), and
--      bad values; writes an audit row ('ai.feature_set') with the row before and after.
-- E. Proofs on scratch rows inside a block that rolls itself back, so they leave no row (audit_log is append-only).

-- ===== A — the resource and its permissions =====
INSERT INTO public.resources (name, display_name, description)
VALUES ('services', 'Services', 'Outside services: the AI switches, budgets and spend (D158; DEC-091)')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, v.action, v.descr, v.step_up, true
  FROM public.resources r
  CROSS JOIN (VALUES
    ('view',   'See the AI features, their switches, budgets and spend', false),
    ('manage', 'Switch an AI feature on or off, set its budget and its price', true)
  ) AS v(action, descr, step_up)
 WHERE r.name = 'services'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = r.id AND p.action = v.action);

-- ===== B — the tables =====
CREATE TABLE public.ai_features (
  feature text PRIMARY KEY
    CONSTRAINT ai_features_feature_check CHECK (
      feature IN ('photo_screen', 'writing_helper', 'name_check', 'category_images', 'category_icons', 'translations')
      OR feature ~ '^e2e-[a-z0-9-]{1,40}$'),
  enabled boolean NOT NULL DEFAULT true,
  off_reason text NULL CONSTRAINT ai_features_off_reason_check CHECK (off_reason IN ('staff', 'budget')),
  off_at timestamptz NULL,
  monthly_budget_cents integer NULL
    CONSTRAINT ai_features_budget_check CHECK (monthly_budget_cents BETWEEN 0 AND 100000000),
  unit text NOT NULL DEFAULT 'call' CONSTRAINT ai_features_unit_check CHECK (unit IN ('call', 'character')),
  unit_cost_microusd integer NOT NULL
    CONSTRAINT ai_features_unit_cost_check CHECK (unit_cost_microusd BETWEEN 0 AND 10000000),
  alert_month date NULL,
  alert_level smallint NOT NULL DEFAULT 0 CONSTRAINT ai_features_alert_level_check CHECK (alert_level IN (0, 80, 100)),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT ai_features_off_check CHECK (
    (enabled AND off_reason IS NULL AND off_at IS NULL) OR (NOT enabled AND off_reason IS NOT NULL AND off_at IS NOT NULL))
);

CREATE TABLE public.ai_spend_days (
  feature text NOT NULL REFERENCES public.ai_features(feature) ON DELETE CASCADE,
  day date NOT NULL,
  calls integer NOT NULL DEFAULT 0 CONSTRAINT ai_spend_days_calls_check CHECK (calls >= 0),
  units bigint NOT NULL DEFAULT 0 CONSTRAINT ai_spend_days_units_check CHECK (units >= 0),
  cost_microusd bigint NOT NULL DEFAULT 0 CONSTRAINT ai_spend_days_cost_check CHECK (cost_microusd >= 0),
  PRIMARY KEY (feature, day)
);

DO $acl$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['ai_features', 'ai_spend_days'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (false)', t || '_deny_select', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (false)', t || '_deny_insert', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO anon, authenticated USING (false)', t || '_deny_update', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO anon, authenticated USING (false)', t || '_deny_delete', t);
  END LOOP;
END $acl$;

-- The six features and their starting prices (ESTIMATES, edited by staff): photo screening $0.002 an upload (three
-- sizes, one call); the writing helper $0.003 a call; the shop-name check $0.0003; a category picture $0.04; an icon
-- suggestion $0.0003; machine translation $20 per million characters. No budget is set: the operator sets them.
INSERT INTO public.ai_features (feature, unit, unit_cost_microusd) VALUES
  ('photo_screen',    'call',      2000),
  ('writing_helper',  'call',      3000),
  ('name_check',      'call',       300),
  ('category_images', 'call',     40000),
  ('category_icons',  'call',       300),
  ('translations',    'character',   20)
ON CONFLICT (feature) DO NOTHING;

-- ===== C — the service-only doors =====
CREATE OR REPLACE FUNCTION public.ai_feature_gate(p_feature text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v       public.ai_features%ROWTYPE;
  v_month timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_on    boolean;
BEGIN
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  RETURN jsonb_build_object('feature', v.feature, 'on', v_on,
                            'off_reason', CASE WHEN v_on THEN NULL ELSE v.off_reason END);
END;
$$;

REVOKE ALL ON FUNCTION public.ai_feature_gate(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_feature_gate(text) TO service_role;

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
    -- D158: at the budget every feature switches itself off except photo screening, which only alerts.
    IF v_level = 100 AND v.enabled AND v.feature <> 'photo_screen' THEN
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

-- ===== D — the admin doors =====
CREATE OR REPLACE FUNCTION public.admin_ai_features()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_first date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_today date := (now() AT TIME ZONE 'utc')::date;
  v_month timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'feature', f.feature,
             'on', f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month),
             'off_reason', CASE WHEN f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month)
                                THEN NULL ELSE f.off_reason END,
             'off_at', CASE WHEN f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month)
                            THEN NULL ELSE f.off_at END,
             'monthly_budget_cents', f.monthly_budget_cents,
             'unit', f.unit,
             'unit_cost_microusd', f.unit_cost_microusd,
             'month_spent_microusd', coalesce(m.cost, 0),
             'month_calls', coalesce(m.calls, 0),
             'month_units', coalesce(m.units, 0),
             'today_calls', coalesce(t.calls, 0),
             'alert_level', CASE WHEN f.alert_month = v_first THEN f.alert_level ELSE 0 END,
             'updated_at', f.updated_at)
           ORDER BY f.feature)
      FROM public.ai_features f
      LEFT JOIN LATERAL (
        SELECT sum(s.cost_microusd)::bigint AS cost, sum(s.calls)::bigint AS calls, sum(s.units)::bigint AS units
          FROM public.ai_spend_days s
         WHERE s.feature = f.feature AND s.day >= v_first) m ON true
      LEFT JOIN public.ai_spend_days t ON t.feature = f.feature AND t.day = v_today
     WHERE f.feature !~ '^e2e-'), '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_ai_features() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_ai_features() TO authenticated;
GRANT ALL ON FUNCTION public.admin_ai_features() TO service_role;

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
  -- Until photos can be held for staff (bundle 13), photo screening stays on.
  IF v.feature = 'photo_screen' AND NOT p_enabled THEN RAISE EXCEPTION 'screeningStaysOn'; END IF;
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  IF p_enabled AND v_level = 100 AND v.feature <> 'photo_screen' THEN RAISE EXCEPTION 'overBudget'; END IF;
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

-- ===== E — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_f        text := 'e2e-mig-' || substr(md5(random()::text || clock_timestamp()::text), 1, 12);
  v_g        jsonb;
  v_r1       jsonb;
  v_r2       jsonb;
  v_r3       jsonb;
  v_r4       jsonb;
  v_g_off    jsonb;
  v_g_back   jsonb;
  v_alerts   integer;
  v_offs     integer;
  v_ons      integer;
  v_day      record;
  v_msg      text;
  v_fn       text;
  v_n        integer;
BEGIN
  -- E1 — the headers: every door SECURITY DEFINER with search_path public.
  FOREACH v_fn IN ARRAY ARRAY['public.ai_feature_gate(text)', 'public.ai_record_spend(text, integer)',
                              'public.admin_ai_features()',
                              'public.admin_set_ai_feature(text, boolean, integer, integer)'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = v_fn::regprocedure AND prosecdef
                     AND proconfig @> ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'proof E1 failed: % is not SECURITY DEFINER with search_path public', v_fn;
    END IF;
  END LOOP;

  -- E2 — the grants: the meter's doors are the service role's alone; the admin doors are signed-in only.
  IF has_function_privilege('anon', 'public.ai_feature_gate(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.ai_feature_gate(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.ai_feature_gate(text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.ai_record_spend(text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof E2 failed: the meter doors are not service-only';
  END IF;
  IF has_function_privilege('anon', 'public.admin_ai_features()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_ai_features()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof E2 failed: the admin doors are not signed-in only';
  END IF;

  -- E3 — the tables are closed to browser roles.
  FOREACH v_fn IN ARRAY ARRAY['public.ai_features', 'public.ai_spend_days'] LOOP
    IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = v_fn::regclass)
       OR has_table_privilege('anon', v_fn, 'SELECT') OR has_table_privilege('authenticated', v_fn, 'SELECT')
       OR has_table_privilege('authenticated', v_fn, 'INSERT') OR has_table_privilege('authenticated', v_fn, 'UPDATE') THEN
      RAISE EXCEPTION 'proof E3 failed: % is open to a browser role', v_fn;
    END IF;
  END LOOP;

  -- E4 — the seed and the permissions.
  SELECT count(*) INTO v_n FROM public.ai_features
   WHERE feature IN ('photo_screen', 'writing_helper', 'name_check', 'category_images', 'category_icons', 'translations');
  IF v_n <> 6 OR (SELECT unit FROM public.ai_features WHERE feature = 'translations') <> 'character' THEN
    RAISE EXCEPTION 'proof E4 failed: the six features are not seeded (%)', v_n;
  END IF;
  IF (SELECT count(*) FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
       WHERE r.name = 'services' AND ((p.action = 'view' AND NOT p.requires_step_up)
                                   OR (p.action = 'manage' AND p.requires_step_up))) <> 2 THEN
    RAISE EXCEPTION 'proof E4 failed: services:view and services:manage are not as written';
  END IF;

  -- E5 — the body rules no scratch row can reach: photo screening never switches itself off, and the admin list
  -- leaves test rows out; the admin doors check their permissions and the second factor.
  IF (SELECT prosrc FROM pg_proc WHERE oid = 'public.ai_record_spend(text, integer)'::regprocedure)
       NOT LIKE '%v_level = 100 AND v.enabled AND v.feature <> ''photo_screen''%'
     OR (SELECT prosrc FROM pg_proc WHERE oid = 'public.admin_ai_features()'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''services'', ''view'')%f.feature !~ ''^e2e-''%'
     OR (SELECT prosrc FROM pg_proc WHERE oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''services'', ''manage'')%require_step_up_if_needed(''services'', ''manage'')%screeningStaysOn%overBudget%INSERT INTO public.audit_log%' THEN
    RAISE EXCEPTION 'proof E5 failed: a door body is not as written';
  END IF;

  -- E6 — no caller, and a caller without the permission (a random id: no such account exists), are refused.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.admin_ai_features();
    RAISE EXCEPTION 'proof E6 failed: no caller read the features';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof E6 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims',
                     json_build_object('sub', gen_random_uuid()::text, 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.admin_set_ai_feature('writing_helper', false, NULL, 3000);
    RAISE EXCEPTION 'proof E6 failed: a caller without services:manage changed a feature';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'proof E6 failed: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.admin_ai_features();
    RAISE EXCEPTION 'proof E6 failed: a caller without services:view read the features';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'proof E6 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);

  -- E7 — the meter on a scratch feature: price 1,000 a unit, budget 1 cent (10,000). Everything inside this block
  -- is rolled back at its end (its rows and its audit rows); only the answers, kept in variables, survive.
  BEGIN
    INSERT INTO public.ai_features (feature, unit_cost_microusd, monthly_budget_cents) VALUES (v_f, 1000, 1);
    v_g := public.ai_feature_gate(v_f);
    v_r1 := public.ai_record_spend(v_f, 5);   -- 5,000: half the budget
    v_r2 := public.ai_record_spend(v_f, 3);   -- 8,000: 80 %
    v_r3 := public.ai_record_spend(v_f, 2);   -- 10,000: the budget — off
    v_g_off := public.ai_feature_gate(v_f);
    SELECT calls, units, cost_microusd INTO v_day FROM public.ai_spend_days
     WHERE feature = v_f AND day = (now() AT TIME ZONE 'utc')::date;
    SELECT count(*) FILTER (WHERE action = 'ai.budget_alert'),
           count(*) FILTER (WHERE action = 'ai.budget_off')
      INTO v_alerts, v_offs
      FROM public.audit_log WHERE entity_type = 'ai_feature' AND entity_id = v_f;
    -- A budget-off from an earlier month: the gate reads on, and the next record turns it back on.
    UPDATE public.ai_features SET off_at = now() - interval '40 days', alert_month = NULL WHERE feature = v_f;
    DELETE FROM public.ai_spend_days WHERE feature = v_f;
    v_g_back := public.ai_feature_gate(v_f);
    v_r4 := public.ai_record_spend(v_f, 1);
    SELECT count(*) INTO v_ons FROM public.audit_log
     WHERE entity_type = 'ai_feature' AND entity_id = v_f AND action = 'ai.budget_on';
    BEGIN
      PERFORM public.ai_record_spend(v_f, -1);
      v_msg := 'accepted';
    EXCEPTION WHEN raise_exception THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    RAISE EXCEPTION 'proof-rollback';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'proof-rollback' THEN RAISE; END IF;
  END;
  IF (v_g->>'on')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'proof E7 failed: a new feature is not on'; END IF;
  IF (v_r1->>'on')::boolean IS NOT TRUE OR (v_r1->>'alert_level')::int <> 0 OR (v_r1->>'spent_microusd')::bigint <> 5000 THEN
    RAISE EXCEPTION 'proof E7 failed: half the budget %', v_r1;
  END IF;
  IF (v_r2->>'on')::boolean IS NOT TRUE OR (v_r2->>'alert_level')::int <> 80 THEN
    RAISE EXCEPTION 'proof E7 failed: 80 %% %', v_r2;
  END IF;
  IF (v_r3->>'on')::boolean IS NOT FALSE OR (v_r3->>'alert_level')::int <> 100 OR (v_r3->>'spent_microusd')::bigint <> 10000 THEN
    RAISE EXCEPTION 'proof E7 failed: the budget %', v_r3;
  END IF;
  IF (v_g_off->>'on')::boolean IS NOT FALSE OR v_g_off->>'off_reason' <> 'budget' THEN
    RAISE EXCEPTION 'proof E7 failed: the gate after the budget %', v_g_off;
  END IF;
  IF v_day.calls <> 3 OR v_day.units <> 10 OR v_day.cost_microusd <> 10000 THEN
    RAISE EXCEPTION 'proof E7 failed: the day row % % %', v_day.calls, v_day.units, v_day.cost_microusd;
  END IF;
  IF v_alerts <> 2 OR v_offs <> 1 THEN
    RAISE EXCEPTION 'proof E7 failed: % alert rows and % off rows', v_alerts, v_offs;
  END IF;
  IF (v_g_back->>'on')::boolean IS NOT TRUE OR (v_r4->>'on')::boolean IS NOT TRUE OR v_ons <> 1 THEN
    RAISE EXCEPTION 'proof E7 failed: a new month did not bring the feature back (% % %)', v_g_back, v_r4, v_ons;
  END IF;
  IF v_msg <> 'badValue:units' THEN RAISE EXCEPTION 'proof E7 failed: negative units %', v_msg; END IF;
  IF EXISTS (SELECT 1 FROM public.ai_features WHERE feature = v_f)
     OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'ai_feature' AND entity_id = v_f) THEN
    RAISE EXCEPTION 'proof E7 failed: the scratch rows outlived the block';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014070000') ON CONFLICT (version) DO NOTHING;
