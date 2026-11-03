-- e2e-areas: admin-monetisation
-- Turn P-1b part A, M-c (model v2 §1 rules 4 and 6, §4; D289, D296, D300, D305, D310, D312;
-- ruling 1 §2 Q5, Q6, Q10, §3 f) — the markets and the reach product. The reach rows (D296) join
-- public.listing_packages as kind reach: city (the included reach), nationwide, worldwide — 30
-- days each (an ESTIMATE staff edit in the console), named in both base languages, no price row
-- (D312: the credit rates are price-row values staff enter per country). public.market_settings
-- is the free baseline per country (D300/D310: N free Regular ads live at a time; the included
-- reach) and the launch switch (D305: paid_levels, since when, the launch bundle every seller of
-- the country receives when it turns on); the row with no country is "any other country" — the
-- price table's NULL convention — and the only row seeded (3 free ads, city, OFF, launch 10 / 30);
-- the operator adds the Ethiopia row in the console (no country code in SQL, K4). Everyone reads
-- the rows (P-2's publish door and Promote); writes only through admin_save_market_settings
-- (packages:update with a second factor and the staff_config dial). public.admin_list_monetisation
-- is the staff reader of the console (D289): markets, products, overrides and prices in one
-- answer, every row with created_by_name / updated_by_name from profiles.display_name the way
-- admin_list_audit does, never an id; packages:view checked inside.

-- ------------------------------------------------------------ 1. THE REACH PRODUCT
INSERT INTO public.listing_packages (key, kind, name_en, name_am, days, enabled, self_serve, extends_lifetime, sort)
VALUES ('city', 'reach', 'City', 'ከተማ', 30, true, false, false, 100),
       ('nationwide', 'reach', 'Nationwide', 'ሀገር አቀፍ', 30, true, true, false, 110),
       ('worldwide', 'reach', 'Worldwide', 'ዓለም አቀፍ', 30, true, true, false, 120)
ON CONFLICT (key) DO NOTHING;

-- ------------------------------------------------------------ 2. THE MARKETS
CREATE TABLE public.market_settings (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code      char(2) NULL REFERENCES public.countries(code),
  free_regular_ads  integer NOT NULL CHECK (free_regular_ads >= 0),
  included_reach    text NOT NULL REFERENCES public.listing_packages(key) ON UPDATE CASCADE,
  paid_levels       boolean NOT NULL DEFAULT false,
  paid_levels_since timestamptz NULL,
  launch_credits    integer NULL CHECK (launch_credits IS NULL OR launch_credits > 0),
  launch_days       integer NULL CHECK (launch_days IS NULL OR launch_days > 0),
  created_by        uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  updated_by        uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT market_settings_scope_unique UNIQUE NULLS NOT DISTINCT (country_code),
  CONSTRAINT market_settings_launch_check CHECK (NOT paid_levels OR (launch_credits IS NOT NULL AND launch_days IS NOT NULL)),
  CONSTRAINT market_settings_since_check CHECK (paid_levels = (paid_levels_since IS NOT NULL))
);
COMMENT ON TABLE public.market_settings IS
  'D300/D305/D310 — the free baseline (free Regular ads live at a time, the included reach) and the paid-levels switch with its launch bundle, per country; the row with no country is every other country (P-1b).';
CREATE TRIGGER market_settings_updated_at
  BEFORE UPDATE ON public.market_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

REVOKE ALL ON public.market_settings FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.market_settings TO service_role;
GRANT SELECT (id, country_code, free_regular_ads, included_reach, paid_levels, paid_levels_since, launch_credits, launch_days, created_at, updated_at)
  ON public.market_settings TO anon, authenticated;
ALTER TABLE public.market_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY market_settings_public_read ON public.market_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY market_settings_no_insert ON public.market_settings
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY market_settings_no_update ON public.market_settings
  FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY market_settings_no_delete ON public.market_settings
  FOR DELETE TO anon, authenticated USING (false);

-- The default market: any other country (ruling 1 Q5; D310's "3 abroad", D305's 10 / 30).
INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels, launch_credits, launch_days)
SELECT NULL::char(2), 3, 'city', false, 10, 30
 WHERE NOT EXISTS (SELECT 1 FROM public.market_settings m WHERE m.country_code IS NULL);

-- ------------------------------------------------------------ 3. THE DOOR
-- Upsert by scope (a country, or none). Turning the switch on stamps paid_levels_since (kept while
-- it stays on); off clears it. The launch bundle is required while the switch is on.
CREATE FUNCTION public.admin_save_market_settings(p_free_regular_ads integer, p_included_reach text, p_paid_levels boolean, p_country_code character DEFAULT NULL::bpchar, p_launch_credits integer DEFAULT NULL::integer, p_launch_days integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_on    boolean := coalesce(p_paid_levels, false);
  v_old   public.market_settings%ROWTYPE;
  v_new   public.market_settings%ROWTYPE;
  v_since timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;
  IF p_free_regular_ads IS NULL OR p_free_regular_ads < 0 THEN
    RAISE EXCEPTION 'bad free ads';
  END IF;
  -- The reach row is the lock: an enabled reach product only.
  PERFORM 1 FROM public.listing_packages k WHERE k.key = p_included_reach AND k.kind = 'reach' AND k.enabled FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown reach';
  END IF;
  IF v_on AND (p_launch_credits IS NULL OR p_launch_days IS NULL) THEN
    RAISE EXCEPTION 'launch bundle required';
  END IF;
  IF (p_launch_credits IS NOT NULL AND p_launch_credits < 1) OR (p_launch_days IS NOT NULL AND p_launch_days < 1) THEN
    RAISE EXCEPTION 'bad launch bundle';
  END IF;

  SELECT * INTO v_old FROM public.market_settings WHERE country_code IS NOT DISTINCT FROM p_country_code FOR UPDATE;
  v_since := CASE WHEN NOT v_on THEN NULL
                  WHEN v_old.paid_levels THEN v_old.paid_levels_since
                  ELSE now() END;
  INSERT INTO public.market_settings
    (country_code, free_regular_ads, included_reach, paid_levels, paid_levels_since, launch_credits, launch_days, created_by, updated_by, updated_at)
  VALUES (p_country_code, p_free_regular_ads, p_included_reach, v_on, v_since, p_launch_credits, p_launch_days, v_uid, v_uid, now())
  ON CONFLICT ON CONSTRAINT market_settings_scope_unique DO UPDATE
    SET free_regular_ads = EXCLUDED.free_regular_ads,
        included_reach = EXCLUDED.included_reach,
        paid_levels = EXCLUDED.paid_levels,
        paid_levels_since = EXCLUDED.paid_levels_since,
        launch_credits = EXCLUDED.launch_credits,
        launch_days = EXCLUDED.launch_days,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'market.saved', 'market_settings', v_new.id::text,
            jsonb_build_object(
              'old', CASE WHEN v_old.id IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'created_by' - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'id', v_new.id, 'created', v_old.id IS NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_market_settings(integer, text, boolean, character, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_market_settings(integer, text, boolean, character, integer, integer) TO authenticated, service_role;

-- ------------------------------------------------------------ 4. THE STAFF READER (D289)
CREATE FUNCTION public.admin_list_monetisation()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL OR NOT public.has_permission(v_uid, 'packages', 'view') THEN
    RAISE EXCEPTION 'denied';
  END IF;
  RETURN jsonb_build_object(
    'markets', coalesce((
      SELECT jsonb_agg(to_jsonb(m) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY m.country_code NULLS FIRST)
        FROM public.market_settings m
        LEFT JOIN public.profiles pc ON pc.user_id = m.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = m.updated_by), '[]'::jsonb),
    'products', coalesce((
      SELECT jsonb_agg(to_jsonb(k) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY k.sort, k.key)
        FROM public.listing_packages k
        LEFT JOIN public.profiles pc ON pc.user_id = k.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = k.updated_by), '[]'::jsonb),
    'overrides', coalesce((
      SELECT jsonb_agg(to_jsonb(o) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY o.level_key, o.category_id, o.country_code)
        FROM public.level_overrides o
        LEFT JOIN public.profiles pc ON pc.user_id = o.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = o.updated_by), '[]'::jsonb),
    'prices', coalesce((
      SELECT jsonb_agg(to_jsonb(p) - 'created_by' - 'updated_by'
                       || jsonb_build_object('created_by_name', pc.display_name, 'updated_by_name', pu.display_name)
                       ORDER BY p.package_key, p.valid_from DESC, p.id)
        FROM public.package_prices p
        LEFT JOIN public.profiles pc ON pc.user_id = p.created_by
        LEFT JOIN public.profiles pu ON pu.user_id = p.updated_by), '[]'::jsonb));
END $function$;
REVOKE ALL ON FUNCTION public.admin_list_monetisation() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_monetisation() TO authenticated, service_role;

-- PROOF (P-1b M-c): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the door's header and grants (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role), the reader's (STABLE, DEFINER; the same grants); the
--       table: the browser roles read every column but created_by and updated_by, hold no write,
--       service_role whole, row security on; the default row; the three reach rows with both names.
--   (b) the door as a scratch super admin on aal2: a scratch market XZ saved (row, created_by,
--       audit old null); (h) the dial; switched on without a bundle: 'launch bundle required' and
--       nothing written; on with 10 / 30: paid_levels_since set, audit old → new; saved again while
--       on: since kept; off: since cleared.
--   (c) each refusal with its own words, each writing nothing; (f) a plain user: 'permission
--       denied' at the door, 'denied' at the reader; (g) aal1: P0009.
--   (d) the reader: the four arrays; the scratch market row with the admin's display name as
--       created_by_name and no created_by; the default row; the scratch rows of every array.
--   (e) anon reads the market rows, never created_by.
DO $proof$
DECLARE
  v_door    regprocedure := 'public.admin_save_market_settings(integer,text,boolean,character,integer,integer)'::regprocedure;
  v_list    regprocedure := 'public.admin_list_monetisation()'::regprocedure;
  v_fn      regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p1b-mc-' || substr(gen_random_uuid()::text, 1, 8);
  v_rc      text := 'e2e_mig_rc_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_code    char(2) := 'XZ';
  v_m       uuid;
  v_answer  jsonb;
  v_row     jsonb;
  v_msg     text;
  v_state   text;
  v_case    text;
  v_col     text;
  v_role    text;
  v_n       integer;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[v_door, v_list] LOOP
    IF (SELECT NOT prosecdef OR proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-1b M-c proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;
  IF (SELECT provolatile FROM pg_proc WHERE oid = v_door) <> 'v' OR (SELECT provolatile FROM pg_proc WHERE oid = v_list) <> 's' THEN
    RAISE EXCEPTION 'P-1b M-c proof (a): the volatility differs';
  END IF;
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_col IN ARRAY ARRAY['id', 'country_code', 'free_regular_ads', 'included_reach', 'paid_levels', 'paid_levels_since', 'launch_credits', 'launch_days', 'created_at', 'updated_at'] LOOP
      IF NOT has_column_privilege(v_role, 'public.market_settings', v_col, 'SELECT') THEN
        RAISE EXCEPTION 'P-1b M-c proof (a): % cannot read market_settings.%', v_role, v_col;
      END IF;
    END LOOP;
    IF has_column_privilege(v_role, 'public.market_settings', 'created_by', 'SELECT')
       OR has_column_privilege(v_role, 'public.market_settings', 'updated_by', 'SELECT')
       OR has_table_privilege(v_role, 'public.market_settings', 'INSERT, UPDATE, DELETE') THEN
      RAISE EXCEPTION 'P-1b M-c proof (a): % holds a privilege it must not', v_role;
    END IF;
  END LOOP;
  IF NOT has_table_privilege('service_role', 'public.market_settings', 'SELECT, INSERT, UPDATE, DELETE')
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.market_settings'::regclass) THEN
    RAISE EXCEPTION 'P-1b M-c proof (a): service_role or row security differs';
  END IF;
  IF (SELECT count(*) FROM public.market_settings) <> 1
     OR NOT EXISTS (SELECT 1 FROM public.market_settings
                     WHERE country_code IS NULL AND free_regular_ads = 3 AND included_reach = 'city' AND NOT paid_levels
                       AND paid_levels_since IS NULL AND launch_credits = 10 AND launch_days = 30) THEN
    RAISE EXCEPTION 'P-1b M-c proof (a): the default market differs';
  END IF;
  IF (SELECT count(*) FROM public.listing_packages
       WHERE max_photos IS NULL AND placement IS NULL
         AND (key, kind, name_en, name_am, days, enabled, badge) IN
             (('city', 'reach', 'City', 'ከተማ', 30, true, false),
              ('nationwide', 'reach', 'Nationwide', 'ሀገር አቀፍ', 30, true, false),
              ('worldwide', 'reach', 'Worldwide', 'ዓለም አቀፍ', 30, true, false))) <> 3 THEN
    RAISE EXCEPTION 'P-1b M-c proof (a): the reach rows differ';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-1b M-c proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p1b-mc', true);
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_rc, 'reach', 'E2E reach', 30, true, true, false, 199);
    -- The profile trigger names the account after its e-mail's local part: the reader shows it.
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_admin, v_tag || '-admin@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_admin, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_admin, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_admin, v_tag, 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_config', 1);

    -- (b) the door.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);
    v_answer := public.admin_save_market_settings(5, v_rc, false, v_code);
    v_m := (v_answer->>'id')::uuid;
    IF NOT (v_answer->>'created')::boolean
       OR NOT EXISTS (SELECT 1 FROM public.market_settings
                       WHERE id = v_m AND country_code = v_code AND free_regular_ads = 5 AND included_reach = v_rc
                         AND NOT paid_levels AND paid_levels_since IS NULL AND launch_credits IS NULL AND launch_days IS NULL
                         AND created_by = v_admin AND updated_by = v_admin)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'market.saved' AND entity_type = 'market_settings' AND entity_id = v_m::text
                         AND actor_id = v_admin AND meta->'old' = 'null'::jsonb AND meta->'new'->>'free_regular_ads' = '5') THEN
      RAISE EXCEPTION 'P-1b M-c proof (b): the saved market or its audit row differ (%)', v_answer;
    END IF;
    -- (h) the window of 1 is full.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_market_settings(6, v_rc, false, v_code);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR (SELECT free_regular_ads FROM public.market_settings WHERE id = v_m) <> 5 THEN
      RAISE EXCEPTION 'P-1b M-c proof (h): answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    UPDATE public.rate_overrides SET max_count = 1000 WHERE user_id = v_admin AND action = 'staff_config';
    -- on without a bundle: refused, nothing written.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_market_settings(5, v_rc, true, v_code, 10, NULL);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'launch bundle required' OR (SELECT paid_levels FROM public.market_settings WHERE id = v_m) THEN
      RAISE EXCEPTION 'P-1b M-c proof (b): on without a bundle answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    -- on with 10 / 30: since set; old → new.
    v_answer := public.admin_save_market_settings(5, v_rc, true, v_code, 10, 30);
    IF (v_answer->>'created')::boolean OR (v_answer->>'id')::uuid <> v_m
       OR NOT EXISTS (SELECT 1 FROM public.market_settings
                       WHERE id = v_m AND paid_levels AND paid_levels_since = now() AND launch_credits = 10 AND launch_days = 30)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'market.saved' AND entity_id = v_m::text
                         AND meta->'old'->>'paid_levels' = 'false' AND meta->'new'->>'paid_levels' = 'true') THEN
      RAISE EXCEPTION 'P-1b M-c proof (b): switching on differs (%)', v_answer;
    END IF;
    -- saved again while on: since kept (moved back a day first, so "kept" is visible).
    UPDATE public.market_settings SET paid_levels_since = now() - interval '1 day' WHERE id = v_m;
    PERFORM public.admin_save_market_settings(7, v_rc, true, v_code, 12, 45);
    IF (SELECT paid_levels_since FROM public.market_settings WHERE id = v_m) IS DISTINCT FROM now() - interval '1 day'
       OR (SELECT free_regular_ads FROM public.market_settings WHERE id = v_m) <> 7 THEN
      RAISE EXCEPTION 'P-1b M-c proof (b): a save while on moved since or lost the values';
    END IF;
    -- off: since cleared.
    PERFORM public.admin_save_market_settings(7, v_rc, false, v_code, 12, 45);
    IF NOT EXISTS (SELECT 1 FROM public.market_settings
                    WHERE id = v_m AND NOT paid_levels AND paid_levels_since IS NULL AND launch_credits = 12) THEN
      RAISE EXCEPTION 'P-1b M-c proof (b): switching off did not clear since';
    END IF;

    -- (c) each refusal with its own words; nothing written after them.
    FOR v_case IN VALUES ('unknown country'), ('bad free ads'), ('unknown reach'), ('launch bundle required'), ('bad launch bundle') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          -- 'XQ' is no market: a scratch code the countries table never holds (K4 exception, as 'XZ').
          WHEN 'unknown country' THEN PERFORM public.admin_save_market_settings(1, v_rc, false, 'XQ');
          WHEN 'bad free ads' THEN PERFORM public.admin_save_market_settings(-1, v_rc, false, v_code);
          WHEN 'unknown reach' THEN PERFORM public.admin_save_market_settings(1, 'e2e_mig_none', false, v_code);
          WHEN 'launch bundle required' THEN PERFORM public.admin_save_market_settings(1, v_rc, true, v_code);
          WHEN 'bad launch bundle' THEN PERFORM public.admin_save_market_settings(1, v_rc, true, v_code, 0, 30);
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM v_case THEN
        RAISE EXCEPTION 'P-1b M-c proof (c): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    -- (d) the reader as the admin.
    v_answer := public.admin_list_monetisation();
    IF jsonb_typeof(v_answer->'markets') <> 'array' OR jsonb_typeof(v_answer->'products') <> 'array'
       OR jsonb_typeof(v_answer->'overrides') <> 'array' OR jsonb_typeof(v_answer->'prices') <> 'array' THEN
      RAISE EXCEPTION 'P-1b M-c proof (d): the reader''s shape differs (%)', jsonb_typeof(v_answer);
    END IF;
    SELECT r INTO v_row FROM jsonb_array_elements(v_answer->'markets') r WHERE r->>'id' = v_m::text;
    IF v_row IS NULL OR v_row->>'created_by_name' <> v_tag || '-admin' OR v_row->>'updated_by_name' <> v_tag || '-admin'
       OR v_row ? 'created_by' OR v_row ? 'updated_by' OR (v_row->>'free_regular_ads')::integer <> 7 THEN
      RAISE EXCEPTION 'P-1b M-c proof (d): the scratch market row differs (%)', v_row;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer->'markets') r WHERE r->'country_code' = 'null'::jsonb)
       OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_answer->'products') r WHERE r->>'key' = v_rc AND NOT r ? 'created_by') THEN
      RAISE EXCEPTION 'P-1b M-c proof (d): the default market or the scratch reach are not listed';
    END IF;

    -- (f) a plain user; (g) the admin on aal1.
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_market_settings(1, v_rc, false, v_code);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'P-1b M-c proof (f): the door answered %', coalesce(v_msg, 'success');
    END IF;
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_list_monetisation();
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'denied' THEN
      RAISE EXCEPTION 'P-1b M-c proof (f): the reader answered %', coalesce(v_msg, 'success');
    END IF;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1', 'session_id', v_session::text)::text, true);
    v_state := NULL;
    BEGIN
      PERFORM public.admin_save_market_settings(1, v_rc, false, v_code);
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
    END;
    IF v_state IS DISTINCT FROM 'P0009' THEN
      RAISE EXCEPTION 'P-1b M-c proof (g): answered % %', coalesce(v_state, 'success'), v_msg;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- Nothing refused wrote: one check per condition (INC-1033 d).
    SELECT count(*) INTO v_n FROM public.market_settings WHERE country_code = v_code;
    IF v_n <> 1 THEN RAISE EXCEPTION 'P-1b M-c proof (b-g): market rows % expected 1', v_n; END IF;
    SELECT free_regular_ads INTO v_n FROM public.market_settings WHERE id = v_m;
    IF v_n IS DISTINCT FROM 7 THEN RAISE EXCEPTION 'P-1b M-c proof (b-g): free ads % expected 7', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'market.saved' AND entity_id = v_m::text;
    IF v_n <> 4 THEN RAISE EXCEPTION 'P-1b M-c proof (b-g): market.saved rows % expected 4', v_n; END IF;

    -- (e) anon reads the market rows, never created_by.
    SET LOCAL ROLE anon;
    SELECT count(*) INTO v_n FROM public.market_settings WHERE id = v_m;
    IF v_n <> 1 THEN RESET ROLE; RAISE EXCEPTION 'P-1b M-c proof (e): anon does not see the market row'; END IF;
    v_state := NULL;
    BEGIN
      PERFORM m.created_by FROM public.market_settings m WHERE false;
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE;
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-c proof (e): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-mc-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-mc-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261103180000') ON CONFLICT DO NOTHING;
