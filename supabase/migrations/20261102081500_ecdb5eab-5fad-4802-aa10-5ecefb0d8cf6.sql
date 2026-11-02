-- e2e-areas: admin-coverage, posting
-- Turn P-1 part A, M1a (D279, D280, D283; spec v1 §3.1; ruling 1, answers 2, 6, 7) — a plan's new
-- dials. public.coverage_plans grows three columns staff edit: default_days (an ad's lifetime where
-- its category sets none; read by P-2), max_active_ads (NULL = unlimited; read by P-3's publish
-- door) and label_key (a translation key for the plan's name; stored and edited only — P-3's one
-- reader resolves it). The free plan is backfilled 30 / NULL / plan.free. The browser roles read
-- the three columns as they read the others (bundle 12 turn T14: by column, never updated_by).
-- admin_set_coverage_plan is redeclared from ethio-prod's live definition (prosrc md5
-- c45aa8a3edbc9b45cb4df01273bdaf3b, read back by the supervisor on 2026-11-02) with four trailing
-- defaults and eight insertions, nothing else: the old signature is dropped (the argument list
-- changes), the header and the grants are restated. seller_plan() and plan_caps() are unchanged
-- (answer 7): every seller is on free until the per-seller column lands.

-- ------------------------------------------------------------ 1. THE COLUMNS
ALTER TABLE public.coverage_plans
  ADD COLUMN default_days integer NOT NULL DEFAULT 30,
  ADD COLUMN max_active_ads integer NULL,
  ADD COLUMN label_key text NULL;

ALTER TABLE public.coverage_plans
  ADD CONSTRAINT coverage_plans_default_days_check CHECK (default_days > 0),
  ADD CONSTRAINT coverage_plans_max_active_ads_check
    CHECK (max_active_ads IS NULL OR max_active_ads > 0),
  ADD CONSTRAINT coverage_plans_label_key_check
    CHECK (label_key IS NULL OR label_key ~ '^[a-z][a-z0-9_.]{1,79}$');

COMMENT ON COLUMN public.coverage_plans.default_days IS
  'D283 — an ad''s lifetime in days on this plan where its category sets no expiry_days (read by the activate branch, P-2).';
COMMENT ON COLUMN public.coverage_plans.max_active_ads IS
  'D283 — how many live or waiting ads a seller on this plan may hold; NULL = unlimited (read by the publish door, P-3).';
COMMENT ON COLUMN public.coverage_plans.label_key IS
  'D279 — the translation key that names this plan on screens; data, resolved by the one reader (P-3).';

-- The free plan (D280): 30 days, unlimited ads, its key.
UPDATE public.coverage_plans
   SET default_days = 30, max_active_ads = NULL, label_key = 'plan.free'
 WHERE plan = 'free';

-- The browser roles read the new columns as they read the plan's others (T14, 20261013142425):
-- by column; updated_by stays outside the grant.
GRANT SELECT (default_days, max_active_ads, label_key) ON public.coverage_plans TO anon, authenticated;

-- ------------------------------------------------------------ 2. THE DOOR
-- The argument list changes, so the old signature is dropped and the door created anew. The body
-- is the live one with eight insertions: three declarations; three refusals (badDefaultDays,
-- badMaxActiveAds, badLabelKey); the three values, each NULL = no change as p_max_photos is
-- (p_ads_unlimited true clears the quota); the three columns in the INSERT, its VALUES and its
-- ON CONFLICT set; the three in the audit row's old and new. Proof (b) strips them and reads the
-- live md5 back.
DROP FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint);

CREATE FUNCTION public.admin_set_coverage_plan(p_plan text, p_max_cities integer, p_max_regions integer, p_max_countries integer, p_allow_everywhere boolean, p_max_photos smallint DEFAULT NULL::smallint, p_default_days integer DEFAULT NULL::integer, p_max_active_ads integer DEFAULT NULL::integer, p_ads_unlimited boolean DEFAULT false, p_label_key text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old public.coverage_plans;
  v_photos smallint;
  v_days integer;
  v_ads integer;
  v_label text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'coverage', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('coverage', 'update');
  -- INC-951 3c (D1 M6b-catalogue) — after the door's authority, before its first write: its dial (staff_config).
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF coalesce(p_plan, '') !~ '^[a-z_]{2,32}$' THEN RAISE EXCEPTION 'badPlan'; END IF;
  IF coalesce(p_max_cities, 0) < 1 OR coalesce(p_max_regions, 0) < 1
     OR coalesce(p_max_countries, 0) < 1 THEN
    RAISE EXCEPTION 'belowMinimum';
  END IF;
  IF p_max_photos IS NOT NULL AND (p_max_photos < 0 OR p_max_photos > 30) THEN
    RAISE EXCEPTION 'badMaxPhotos';
  END IF;
  IF p_default_days IS NOT NULL AND p_default_days < 1 THEN RAISE EXCEPTION 'badDefaultDays'; END IF;
  IF p_max_active_ads IS NOT NULL AND p_max_active_ads < 1 THEN RAISE EXCEPTION 'badMaxActiveAds'; END IF;
  IF p_label_key IS NOT NULL AND p_label_key !~ '^[a-z][a-z0-9_.]{1,79}$' THEN RAISE EXCEPTION 'badLabelKey'; END IF;

  SELECT * INTO v_old FROM public.coverage_plans WHERE plan = p_plan;

  -- An absent cap means NO CHANGE: the stored cap for an existing plan, the
  -- column's own default for a new one.
  v_photos := COALESCE(p_max_photos, v_old.max_photos, 10::smallint);
  v_days := COALESCE(p_default_days, v_old.default_days, 30);
  v_ads := CASE WHEN coalesce(p_ads_unlimited, false) THEN NULL ELSE COALESCE(p_max_active_ads, v_old.max_active_ads) END;
  v_label := COALESCE(p_label_key, v_old.label_key);

  INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries,
                                     allow_everywhere, max_photos, default_days, max_active_ads, label_key, updated_by, updated_at)
  VALUES (p_plan, p_max_cities, p_max_regions, p_max_countries,
          coalesce(p_allow_everywhere, false), v_photos, v_days, v_ads, v_label, auth.uid(), now())
  ON CONFLICT (plan) DO UPDATE
    SET max_cities = EXCLUDED.max_cities,
        max_regions = EXCLUDED.max_regions,
        max_countries = EXCLUDED.max_countries,
        allow_everywhere = EXCLUDED.allow_everywhere,
        max_photos = EXCLUDED.max_photos,
        default_days = EXCLUDED.default_days,
        max_active_ads = EXCLUDED.max_active_ads,
        label_key = EXCLUDED.label_key,
        updated_by = EXCLUDED.updated_by,
        updated_at = now();

  PERFORM public.log_audit('coverage.plan.update', 'coverage_plan', p_plan,
    jsonb_build_object(
      'old', CASE WHEN v_old.plan IS NULL THEN NULL ELSE jsonb_build_object(
        'max_cities', v_old.max_cities, 'max_regions', v_old.max_regions,
        'max_countries', v_old.max_countries, 'allow_everywhere', v_old.allow_everywhere,
        'max_photos', v_old.max_photos, 'default_days', v_old.default_days, 'max_active_ads', v_old.max_active_ads, 'label_key', v_old.label_key) END,
      'new', jsonb_build_object(
        'max_cities', p_max_cities, 'max_regions', p_max_regions,
        'max_countries', p_max_countries,
        'allow_everywhere', coalesce(p_allow_everywhere, false),
        'max_photos', v_photos, 'default_days', v_days, 'max_active_ads', v_ads, 'label_key', v_label)));
END $function$;
REVOKE ALL ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint, integer, integer, boolean, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_coverage_plan(text, integer, integer, integer, boolean, smallint, integer, integer, boolean, text) TO authenticated, service_role;

-- PROOF (P-1 M1a): scratch rows only, rolled back by the sentinel.
--   (a) the header: SECURITY DEFINER, VOLATILE, search_path public; closed to PUBLIC and anon, open
--       to authenticated and service_role; the old signature is gone; coverage:update asks a second
--       factor.
--   (b) the body, with the eight insertions stripped, is byte for byte ethio-prod's live body
--       (md5 c45aa8a3edbc9b45cb4df01273bdaf3b).
--   (c) the columns: anon and authenticated read the three new ones, never updated_by; the CHECKs
--       refuse 0 days, 0 ads and a malformed key.
--   (d) the free plan reads 30 / NULL / plan.free.
--   (e) a super admin with a fresh second factor saves a scratch plan with every dial: the row and
--       its audit row (old null, new with the three) hold them.
--   (f) badDefaultDays, badMaxActiveAds and badLabelKey are each refused and write nothing.
--   (g) absent dials change nothing; p_ads_unlimited clears the quota; the audit row carries old
--       and new.
--   (h) the second factor: the same super admin on an aal1 session is refused (P0009).
--   The rows are scratch: one user and one plan; the proof reads no real row (G27).
DO $proof$
DECLARE
  v_fn      regprocedure := 'public.admin_set_coverage_plan(text,integer,integer,integer,boolean,smallint,integer,integer,boolean,text)'::regprocedure;
  v_md5     text;
  v_admin   uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p1-m1a-' || substr(gen_random_uuid()::text, 1, 8);
  v_plan    text := 'e2e_mig_p_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_row     public.coverage_plans%ROWTYPE;
  v_audits  integer;
  v_msg     text;
  v_state   text;
  v_case    text;
  v_col     text;
  v_role    text;
BEGIN
  -- (a)
  IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
        FROM pg_proc WHERE oid = v_fn)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
     OR has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
    RAISE EXCEPTION 'P-1 M1a proof (a): the header or the grants differ';
  END IF;
  IF to_regprocedure('public.admin_set_coverage_plan(text,integer,integer,integer,boolean,smallint)') IS NOT NULL THEN
    RAISE EXCEPTION 'P-1 M1a proof (a): the old signature remains';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'coverage' AND p.action = 'update' AND p.requires_step_up) THEN
    RAISE EXCEPTION 'P-1 M1a proof (a): coverage:update asks no second factor';
  END IF;

  -- (b) the eight insertions stripped, in the order they appear.
  SELECT md5(
           replace(replace(replace(replace(replace(replace(replace(replace(
             replace(p.prosrc, chr(13), ''),
             E'  v_days integer;\n  v_ads integer;\n  v_label text;\n', ''),
             E'  IF p_default_days IS NOT NULL AND p_default_days < 1 THEN RAISE EXCEPTION ''badDefaultDays''; END IF;\n'
             || E'  IF p_max_active_ads IS NOT NULL AND p_max_active_ads < 1 THEN RAISE EXCEPTION ''badMaxActiveAds''; END IF;\n'
             || E'  IF p_label_key IS NOT NULL AND p_label_key !~ ''^[a-z][a-z0-9_.]{1,79}$'' THEN RAISE EXCEPTION ''badLabelKey''; END IF;\n', ''),
             E'  v_days := COALESCE(p_default_days, v_old.default_days, 30);\n'
             || E'  v_ads := CASE WHEN coalesce(p_ads_unlimited, false) THEN NULL ELSE COALESCE(p_max_active_ads, v_old.max_active_ads) END;\n'
             || E'  v_label := COALESCE(p_label_key, v_old.label_key);\n', ''),
             'default_days, max_active_ads, label_key, ', ''),
             'v_days, v_ads, v_label, ', ''),
             E'        default_days = EXCLUDED.default_days,\n        max_active_ads = EXCLUDED.max_active_ads,\n        label_key = EXCLUDED.label_key,\n', ''),
             ', ''default_days'', v_old.default_days, ''max_active_ads'', v_old.max_active_ads, ''label_key'', v_old.label_key', ''),
             ', ''default_days'', v_days, ''max_active_ads'', v_ads, ''label_key'', v_label', ''))
    INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn;
  IF v_md5 IS DISTINCT FROM 'c45aa8a3edbc9b45cb4df01273bdaf3b' THEN
    RAISE EXCEPTION 'P-1 M1a proof (b): admin_set_coverage_plan differs from the live body beyond the eight insertions (%)', v_md5;
  END IF;

  -- (c) the column grants, as T14 proved them.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_col IN ARRAY ARRAY['default_days', 'max_active_ads', 'label_key'] LOOP
      IF NOT has_column_privilege(v_role, 'public.coverage_plans', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1 M1a proof (c): % cannot read %', v_role, v_col;
      END IF;
    END LOOP;
    IF has_column_privilege(v_role, 'public.coverage_plans', 'updated_by', 'SELECT') THEN
      RAISE EXCEPTION 'P-1 M1a proof (c): % reads updated_by', v_role;
    END IF;
  END LOOP;

  -- (d)
  SELECT * INTO v_row FROM public.coverage_plans WHERE plan = 'free';
  IF NOT FOUND OR v_row.default_days <> 30 OR v_row.max_active_ads IS NOT NULL
     OR v_row.label_key IS DISTINCT FROM 'plan.free' THEN
    RAISE EXCEPTION 'P-1 M1a proof (d): the free plan reads % / % / %', v_row.default_days, v_row.max_active_ads, v_row.label_key;
  END IF;

  BEGIN
    -- (c) the CHECKs, on a scratch row written and rolled back inside this block.
    FOR v_case IN VALUES ('days'), ('ads'), ('label') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'days' THEN INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries, default_days)
                           VALUES (v_plan, 1, 1, 1, 0);
          WHEN 'ads' THEN INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries, max_active_ads)
                          VALUES (v_plan, 1, 1, 1, 0);
          WHEN 'label' THEN INSERT INTO public.coverage_plans (plan, max_cities, max_regions, max_countries, label_key)
                            VALUES (v_plan, 1, 1, 1, 'Bad Key');
        END CASE;
      EXCEPTION WHEN check_violation THEN v_msg := 'refused';
      END;
      IF v_msg IS DISTINCT FROM 'refused' THEN
        RAISE EXCEPTION 'P-1 M1a proof (c): the % CHECK let a bad value in', v_case;
      END IF;
    END LOOP;

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');

    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (e)
    PERFORM public.admin_set_coverage_plan(v_plan, 2, 2, 2, false, 5::smallint, 45, 20, false, 'plan.e2e_mig_p');
    SELECT * INTO v_row FROM public.coverage_plans WHERE plan = v_plan;
    IF NOT FOUND OR v_row.max_photos <> 5 OR v_row.default_days <> 45 OR v_row.max_active_ads <> 20
       OR v_row.label_key <> 'plan.e2e_mig_p' OR v_row.updated_by IS DISTINCT FROM v_admin THEN
      RAISE EXCEPTION 'P-1 M1a proof (e): the row differs';
    END IF;
    SELECT count(*) INTO v_audits FROM public.audit_log
     WHERE action = 'coverage.plan.update' AND entity_id = v_plan;
    IF v_audits <> 1 OR NOT EXISTS (
         SELECT 1 FROM public.audit_log
          WHERE action = 'coverage.plan.update' AND entity_id = v_plan
            AND meta->'old' = 'null'::jsonb
            AND meta->'new'->>'default_days' = '45'
            AND meta->'new'->>'max_active_ads' = '20'
            AND meta->'new'->>'label_key' = 'plan.e2e_mig_p') THEN
      RAISE EXCEPTION 'P-1 M1a proof (e): the audit row differs';
    END IF;

    -- (f)
    FOR v_case IN VALUES ('badDefaultDays'), ('badMaxActiveAds'), ('badLabelKey') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'badDefaultDays' THEN PERFORM public.admin_set_coverage_plan(v_plan, 2, 2, 2, false, NULL, 0, NULL, false, NULL);
          WHEN 'badMaxActiveAds' THEN PERFORM public.admin_set_coverage_plan(v_plan, 2, 2, 2, false, NULL, NULL, 0, false, NULL);
          WHEN 'badLabelKey' THEN PERFORM public.admin_set_coverage_plan(v_plan, 2, 2, 2, false, NULL, NULL, NULL, false, 'Bad Key');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM v_case THEN
        RAISE EXCEPTION 'P-1 M1a proof (f): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    SELECT * INTO v_row FROM public.coverage_plans WHERE plan = v_plan;
    IF v_row.default_days <> 45 OR v_row.max_active_ads <> 20 OR v_row.label_key <> 'plan.e2e_mig_p'
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'coverage.plan.update' AND entity_id = v_plan) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1a proof (f): a refused call wrote';
    END IF;

    -- (g) absent dials keep their values; p_ads_unlimited clears the quota.
    PERFORM public.admin_set_coverage_plan(v_plan, 3, 2, 2, false);
    SELECT * INTO v_row FROM public.coverage_plans WHERE plan = v_plan;
    IF v_row.max_cities <> 3 OR v_row.max_photos <> 5 OR v_row.default_days <> 45 OR v_row.max_active_ads <> 20
       OR v_row.label_key <> 'plan.e2e_mig_p' THEN
      RAISE EXCEPTION 'P-1 M1a proof (g): an absent dial changed the row';
    END IF;
    PERFORM public.admin_set_coverage_plan(v_plan, 3, 2, 2, false, NULL, NULL, NULL, true, NULL);
    SELECT * INTO v_row FROM public.coverage_plans WHERE plan = v_plan;
    IF v_row.max_active_ads IS NOT NULL OR v_row.default_days <> 45 THEN
      RAISE EXCEPTION 'P-1 M1a proof (g): p_ads_unlimited did not clear the quota';
    END IF;
    IF NOT EXISTS (
         SELECT 1 FROM public.audit_log
          WHERE action = 'coverage.plan.update' AND entity_id = v_plan
            AND meta->'old'->>'max_active_ads' = '20'
            AND meta->'new'->'max_active_ads' = 'null'::jsonb) THEN
      RAISE EXCEPTION 'P-1 M1a proof (g): the audit row does not carry old 20 → new null';
    END IF;

    -- (h) the same super admin on an aal1 session: the second factor is asked.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1',
                        'session_id', v_session::text)::text, true);
    v_state := NULL;
    BEGIN
      PERFORM public.admin_set_coverage_plan(v_plan, 4, 2, 2, false);
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
    END;
    IF v_state IS DISTINCT FROM 'P0009' THEN
      RAISE EXCEPTION 'P-1 M1a proof (h): answered % %', coalesce(v_state, 'success'), v_msg;
    END IF;
    IF (SELECT max_cities FROM public.coverage_plans WHERE plan = v_plan) <> 3 THEN
      RAISE EXCEPTION 'P-1 M1a proof (h): the refused call wrote';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'p1-m1a-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1a-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261102220000') ON CONFLICT DO NOTHING;
