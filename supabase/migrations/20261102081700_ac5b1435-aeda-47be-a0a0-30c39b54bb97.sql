-- e2e-areas: admin-packages
-- Turn P-1 part A, M1c (D282, D283; spec v1 §3.3, §3.7; ruling 1, answers 3, 4) — the three staff
-- doors of the packages and their prices; the tables, the resolver and the resource are M1b's
-- (20261102081600; split by concern under the 25 KB ceiling, rule 30). A price row is born by
-- admin_save_package_price and only ends (admin_end_package_price; history stays) — a correction
-- is a new row; for the same package, market and category two windows [from, to) never
-- intersect, judged under FOR UPDATE on the package row (answer 4; no extension, G42).

-- ------------------------------------------------------------ 1. THE DOORS
-- The shape of the config doors (INC-951 3c, as admin_set_coverage_plan beside them): signed in,
-- packages:update (has_permission refuses a deactivated account, DEC-241), the second factor, the
-- staff_config dial; the door's own rules; then the write, one audit row, a jsonb answer. A
-- refusal raises, so nothing it reached is kept (INC-844).
CREATE FUNCTION public.admin_save_listing_package(p_key text, p_tier text, p_days integer, p_enabled boolean, p_self_serve boolean, p_extends_lifetime boolean, p_label_key text DEFAULT NULL::text, p_sort integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_old public.listing_packages%ROWTYPE;
  v_new public.listing_packages%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  IF coalesce(p_key, '') !~ '^[a-z][a-z0-9_]{1,31}$' THEN
    RAISE EXCEPTION 'bad key';
  END IF;
  IF p_tier IS NULL OR p_tier NOT IN ('featured', 'premium') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  IF coalesce(p_days, 0) < 1 THEN
    RAISE EXCEPTION 'bad days';
  END IF;
  IF p_label_key IS NOT NULL AND p_label_key !~ '^[a-z][a-z0-9_.]{1,79}$' THEN
    RAISE EXCEPTION 'bad label key';
  END IF;

  SELECT * INTO v_old FROM public.listing_packages WHERE key = p_key FOR UPDATE;
  INSERT INTO public.listing_packages (key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort, updated_by, updated_at)
  VALUES (p_key, p_tier, p_days, coalesce(p_enabled, true), coalesce(p_self_serve, false), coalesce(p_extends_lifetime, true),
          coalesce(p_label_key, v_old.label_key), coalesce(p_sort, v_old.sort, 0), v_uid, now())
  ON CONFLICT (key) DO UPDATE
    SET tier = EXCLUDED.tier,
        days = EXCLUDED.days,
        enabled = EXCLUDED.enabled,
        self_serve = EXCLUDED.self_serve,
        extends_lifetime = EXCLUDED.extends_lifetime,
        label_key = EXCLUDED.label_key,
        sort = EXCLUDED.sort,
        updated_by = EXCLUDED.updated_by,
        updated_at = now()
  RETURNING * INTO v_new;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package.saved', 'listing_package', p_key,
            jsonb_build_object(
              'old', CASE WHEN v_old.key IS NULL THEN NULL
                          ELSE to_jsonb(v_old) - 'updated_by' - 'updated_at' - 'created_at' END,
              'new', to_jsonb(v_new) - 'updated_by' - 'updated_at' - 'created_at'));

  RETURN jsonb_build_object('ok', true, 'key', p_key, 'created', v_old.key IS NULL);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_listing_package(text, text, integer, boolean, boolean, boolean, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_listing_package(text, text, integer, boolean, boolean, boolean, text, integer) TO authenticated, service_role;

CREATE FUNCTION public.admin_save_package_price(p_package_key text, p_amount numeric, p_currency character, p_country_code character DEFAULT NULL::bpchar, p_category_id uuid DEFAULT NULL::uuid, p_valid_from timestamp with time zone DEFAULT NULL::timestamp with time zone, p_valid_to timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_pkg  public.listing_packages%ROWTYPE;
  v_from timestamptz := coalesce(p_valid_from, now());
  v_row  public.package_prices%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_pkg FROM public.listing_packages WHERE key = p_package_key FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown package';
  END IF;
  IF p_amount IS NULL OR p_amount < 0 THEN
    RAISE EXCEPTION 'bad amount';
  END IF;
  IF p_currency IS NULL OR NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = p_currency) THEN
    RAISE EXCEPTION 'unknown currency';
  END IF;
  IF p_country_code IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = p_country_code) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;
  IF p_category_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id) THEN
    RAISE EXCEPTION 'unknown category';
  END IF;
  IF p_valid_to IS NOT NULL AND p_valid_to <= v_from THEN
    RAISE EXCEPTION 'bad window';
  END IF;
  IF EXISTS (SELECT 1 FROM public.package_prices x
              WHERE x.package_key = p_package_key
                AND x.country_code IS NOT DISTINCT FROM p_country_code
                AND x.category_id IS NOT DISTINCT FROM p_category_id
                AND x.valid_from < coalesce(p_valid_to, 'infinity'::timestamptz)
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_from) THEN
    RAISE EXCEPTION 'overlapping window';
  END IF;

  INSERT INTO public.package_prices (package_key, country_code, category_id, amount, currency, valid_from, valid_to, updated_by)
  VALUES (p_package_key, p_country_code, p_category_id, p_amount, p_currency, v_from, p_valid_to, v_uid)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.saved', 'package_price', v_row.id::text,
            jsonb_strip_nulls(jsonb_build_object(
              'package', p_package_key, 'country_code', p_country_code, 'category_id', p_category_id,
              'amount', p_amount, 'currency', p_currency, 'valid_from', v_from, 'valid_to', p_valid_to)));

  RETURN jsonb_build_object('ok', true, 'id', v_row.id);
END $function$;
REVOKE ALL ON FUNCTION public.admin_save_package_price(text, numeric, character, character, uuid, timestamptz, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_package_price(text, numeric, character, character, uuid, timestamptz, timestamptz) TO authenticated, service_role;

CREATE FUNCTION public.admin_end_package_price(p_id uuid, p_valid_to timestamp with time zone DEFAULT now())
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.package_prices%ROWTYPE;
  v_to  timestamptz := coalesce(p_valid_to, now());
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'packages', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('packages', 'update');
  IF NOT coalesce((public.rate_gate('staff_config')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  -- The package row is the lock for every window of its prices (as the save door takes it).
  PERFORM 1 FROM public.listing_packages k
    JOIN public.package_prices x ON x.package_key = k.key
   WHERE x.id = p_id
   FOR UPDATE OF k;
  SELECT * INTO v_row FROM public.package_prices WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'price not found';
  END IF;
  IF v_row.valid_to IS NOT NULL AND v_row.valid_to <= now() THEN
    RAISE EXCEPTION 'price already ended';
  END IF;
  IF v_to <= v_row.valid_from THEN
    RAISE EXCEPTION 'bad window';
  END IF;
  IF EXISTS (SELECT 1 FROM public.package_prices x
              WHERE x.package_key = v_row.package_key
                AND x.id <> v_row.id
                AND x.country_code IS NOT DISTINCT FROM v_row.country_code
                AND x.category_id IS NOT DISTINCT FROM v_row.category_id
                AND x.valid_from < v_to
                AND coalesce(x.valid_to, 'infinity'::timestamptz) > v_row.valid_from) THEN
    RAISE EXCEPTION 'overlapping window';
  END IF;

  UPDATE public.package_prices SET valid_to = v_to, updated_by = v_uid WHERE id = p_id;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'package_price.ended', 'package_price', p_id::text,
            jsonb_strip_nulls(jsonb_build_object(
              'package', v_row.package_key, 'from', v_row.valid_to, 'to', v_to)));

  RETURN jsonb_build_object('ok', true, 'id', p_id, 'valid_to', v_to);
END $function$;
REVOKE ALL ON FUNCTION public.admin_end_package_price(uuid, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_end_package_price(uuid, timestamptz) TO authenticated, service_role;

-- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real
-- row read, G27), rolled back by the sentinel. (a) the three doors' headers and grants (VOLATILE,
-- SECURITY DEFINER, search_path public; closed to PUBLIC and anon, open to authenticated and
-- service_role); (b) create and edit a package: the row, the two audit rows (old null, then
-- old → new), a NULL label key or sort keeps the stored one; (c) two price rows and their audit
-- rows; one ended: valid_to and its audit row; (d) an overlapping window, open or future, is
-- refused and writes nothing; adjacent future windows pass; an end that would overlap is refused;
-- (e) the thirteen refusals, each its own words, each writing nothing; (f) a user without
-- packages:update: 'permission denied' at each door; (g) an aal1 session: P0009 at each door;
-- (h) the dial: a full window answers 'rateLimited' and writes nothing.
DO $proof$
DECLARE
  v_save    regprocedure := 'public.admin_save_listing_package(text,text,integer,boolean,boolean,boolean,text,integer)'::regprocedure;
  v_price   regprocedure := 'public.admin_save_package_price(text,numeric,character,character,uuid,timestamptz,timestamptz)'::regprocedure;
  v_end     regprocedure := 'public.admin_end_package_price(uuid,timestamptz)'::regprocedure;
  v_fn      regprocedure;
  v_admin   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_tag     text := 'e2e-mig-p1-m1c-' || substr(gen_random_uuid()::text, 1, 8);
  v_pkg     text := 'e2e_mig_pk_' || translate(substr(gen_random_uuid()::text, 1, 8), '0123456789-', 'abcdefghijk');
  v_cur     char(3);
  v_leaf    uuid;
  v_a       uuid;
  v_b       uuid;
  v_g       uuid;
  v_h       uuid;
  v_n       integer;
  v_to      timestamptz;
  v_answer  jsonb;
  v_msg     text;
  v_state   text;
  v_case    text;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[v_save, v_price, v_end] LOOP
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'P-1 M1c proof (a): the header or the grants of % differ', v_fn;
    END IF;
  END LOOP;

  BEGIN
    -- A currency the table holds, read by its order (no code is written here).
    SELECT c.code INTO v_cur FROM public.currencies c ORDER BY c.display_order, c.code LIMIT 1;
    IF v_cur IS NULL THEN RAISE EXCEPTION 'P-1 M1c proof: no currency row'; END IF;
    -- A scratch category (no caller is set: the catalogue guard judges signed-in writes only).
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P1 M1c Leaf', v_tag || '-leaf', true, true, true, 9998) RETURNING id INTO v_leaf;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v_leaf, 9998);

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
    -- (h) the dial: one success fills the window; the override is widened after the check.
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_admin, 'staff_config', 1);

    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (b) create
    v_answer := public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true, 'package.e2e_mig', 99);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_pkg, 'created', true) THEN
      RAISE EXCEPTION 'P-1 M1c proof (b): create answered %', v_answer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.listing_packages
                    WHERE key = v_pkg AND tier = 'premium' AND days = 7 AND enabled AND self_serve AND extends_lifetime
                      AND label_key = 'package.e2e_mig' AND sort = 99 AND updated_by = v_admin)
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package.saved' AND entity_id = v_pkg) <> 1
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_id = v_pkg AND actor_id = v_admin
                         AND entity_type = 'listing_package'
                         AND meta->'old' = 'null'::jsonb AND meta->'new'->>'days' = '7') THEN
      RAISE EXCEPTION 'P-1 M1c proof (b): the created row or its audit row differ';
    END IF;

    -- (h) the window of 1 is full: the next call is refused and writes nothing.
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_save_listing_package(v_pkg, 'premium', 8, true, true, true);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'rateLimited'
       OR (SELECT days FROM public.listing_packages WHERE key = v_pkg) <> 7
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package.saved' AND entity_id = v_pkg) <> 1 THEN
      RAISE EXCEPTION 'P-1 M1c proof (h): answered % or wrote', coalesce(v_msg, 'success');
    END IF;
    UPDATE public.rate_overrides SET max_count = 1000 WHERE user_id = v_admin AND action = 'staff_config';

    -- (b) edit: old → new; days 14, switched off; NULL label key and sort keep the stored ones.
    v_answer := public.admin_save_listing_package(v_pkg, 'featured', 14, false, false, false, NULL, NULL);
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'key', v_pkg, 'created', false)
       OR NOT EXISTS (SELECT 1 FROM public.listing_packages
                       WHERE key = v_pkg AND tier = 'featured' AND days = 14 AND NOT enabled AND NOT self_serve
                         AND NOT extends_lifetime AND label_key = 'package.e2e_mig' AND sort = 99)
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package.saved' AND entity_id = v_pkg
                         AND meta->'old'->>'days' = '7' AND meta->'new'->>'days' = '14'
                         AND meta->'old'->>'enabled' = 'true' AND meta->'new'->>'enabled' = 'false') THEN
      RAISE EXCEPTION 'P-1 M1c proof (b): the edited row or its audit row differ';
    END IF;

    -- (c) two price rows, each a window open since an hour ago.
    v_a := (public.admin_save_package_price(v_pkg, 1.00, v_cur, NULL, v_leaf, now() - interval '1 hour')->>'id')::uuid;
    v_b := (public.admin_save_package_price(v_pkg, 2.00, v_cur, NULL, NULL, now() - interval '1 hour')->>'id')::uuid;
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_pkg) <> 2
       OR (SELECT count(*) FROM public.audit_log WHERE action = 'package_price.saved'
            AND entity_id IN (v_a::text, v_b::text) AND actor_id = v_admin AND entity_type = 'package_price'
            AND meta->>'package' = v_pkg AND meta->>'currency' = v_cur) <> 2
       OR NOT EXISTS (SELECT 1 FROM public.package_prices
                       WHERE id = v_a AND amount = 1.00 AND currency = v_cur AND country_code IS NULL
                         AND category_id = v_leaf AND valid_from = now() - interval '1 hour'
                         AND valid_to IS NULL AND updated_by = v_admin) THEN
      RAISE EXCEPTION 'P-1 M1c proof (c): the price rows or their audit rows differ';
    END IF;

    -- (d) overlaps before anything ends: the same scope again, open and future.
    FOR v_case IN VALUES ('same'), ('future') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'same' THEN PERFORM public.admin_save_package_price(v_pkg, 1.50, v_cur, NULL, v_leaf);
          WHEN 'future' THEN PERFORM public.admin_save_package_price(v_pkg, 1.50, v_cur, NULL, v_leaf, now() + interval '1 day', now() + interval '2 days');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'overlapping window' THEN
        RAISE EXCEPTION 'P-1 M1c proof (d): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    IF (SELECT count(*) FROM public.package_prices WHERE package_key = v_pkg) <> 2 THEN
      RAISE EXCEPTION 'P-1 M1c proof (d): a refused overlap wrote';
    END IF;

    -- (c) end A.
    v_answer := public.admin_end_package_price(v_a, now());
    IF v_answer IS DISTINCT FROM jsonb_build_object('ok', true, 'id', v_a, 'valid_to', now())
       OR (SELECT valid_to FROM public.package_prices WHERE id = v_a) IS DISTINCT FROM now()
       OR NOT EXISTS (SELECT 1 FROM public.audit_log
                       WHERE action = 'package_price.ended' AND entity_id = v_a::text AND actor_id = v_admin
                         AND entity_type = 'package_price'
                         AND meta->>'package' = v_pkg AND meta ? 'to' AND NOT meta ? 'from') THEN
      RAISE EXCEPTION 'P-1 M1c proof (c): ending A differs (%)', v_answer;
    END IF;
    -- (d) adjacent future windows on A's scope are accepted; an end that would overlap is refused.
    v_g := (public.admin_save_package_price(v_pkg, 1.50, v_cur, NULL, v_leaf, now() + interval '1 day', now() + interval '2 days')->>'id')::uuid;
    v_h := (public.admin_save_package_price(v_pkg, 1.75, v_cur, NULL, v_leaf, now() + interval '2 days', now() + interval '3 days')->>'id')::uuid;
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_end_package_price(v_g, now() + interval '2 days 12 hours');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    IF v_msg IS DISTINCT FROM 'overlapping window'
       OR (SELECT valid_to FROM public.package_prices WHERE id = v_g) IS DISTINCT FROM now() + interval '2 days' THEN
      RAISE EXCEPTION 'P-1 M1c proof (d): the overlapping end answered % or wrote', coalesce(v_msg, 'success');
    END IF;

    -- (e) each refusal with its own words; nothing written after them.
    FOR v_case IN VALUES ('bad key'), ('unknown tier'), ('bad days'), ('bad label key'),
                         ('unknown package'), ('bad amount'), ('unknown currency'), ('unknown country'),
                         ('unknown category'), ('bad window'), ('price not found'), ('end bad window'),
                         ('price already ended') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'bad key' THEN PERFORM public.admin_save_listing_package('1_bad', 'premium', 7, true, true, true);
          WHEN 'unknown tier' THEN PERFORM public.admin_save_listing_package(v_pkg, 'gold', 7, true, true, true);
          WHEN 'bad days' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 0, true, true, true);
          WHEN 'bad label key' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true, 'Bad Key');
          WHEN 'unknown package' THEN PERFORM public.admin_save_package_price('e2e_mig_none', 0, v_cur);
          WHEN 'bad amount' THEN PERFORM public.admin_save_package_price(v_pkg, -1, v_cur);
          WHEN 'unknown currency' THEN PERFORM public.admin_save_package_price(v_pkg, 0, 'e2e');
          -- 'XQ' is no market: a scratch code the countries table never holds (K4 exception, as 'XZ').
          WHEN 'unknown country' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur, 'XQ');
          WHEN 'unknown category' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur, NULL, gen_random_uuid());
          WHEN 'bad window' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur, NULL, NULL, now(), now() - interval '1 minute');
          WHEN 'price not found' THEN PERFORM public.admin_end_package_price(gen_random_uuid());
          WHEN 'end bad window' THEN PERFORM public.admin_end_package_price(v_h, now() + interval '1 day');
          WHEN 'price already ended' THEN PERFORM public.admin_end_package_price(v_a, now() + interval '1 day');
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM (CASE v_case WHEN 'end bad window' THEN 'bad window' ELSE v_case END) THEN
        RAISE EXCEPTION 'P-1 M1c proof (e): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;

    -- (f) a plain user; (g) the super admin on aal1.
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    FOR v_case IN VALUES ('save'), ('price'), ('end') LOOP
      v_msg := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true);
          WHEN 'price' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur);
          WHEN 'end' THEN PERFORM public.admin_end_package_price(v_h);
        END CASE;
      EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
      END;
      IF v_msg IS DISTINCT FROM 'permission denied' THEN
        RAISE EXCEPTION 'P-1 M1c proof (f): % answered %', v_case, coalesce(v_msg, 'success');
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_admin::text, 'role', 'authenticated', 'aal', 'aal1',
                        'session_id', v_session::text)::text, true);
    FOR v_case IN VALUES ('save'), ('price'), ('end') LOOP
      v_state := NULL;
      BEGIN
        CASE v_case
          WHEN 'save' THEN PERFORM public.admin_save_listing_package(v_pkg, 'premium', 7, true, true, true);
          WHEN 'price' THEN PERFORM public.admin_save_package_price(v_pkg, 0, v_cur);
          WHEN 'end' THEN PERFORM public.admin_end_package_price(v_h);
        END CASE;
      EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE; v_msg := SQLERRM;
      END;
      IF v_state IS DISTINCT FROM 'P0009' THEN
        RAISE EXCEPTION 'P-1 M1c proof (g): % answered % %', v_case, coalesce(v_state, 'success'), v_msg;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', '{}', true);
    -- Nothing refused wrote: one check per condition, each naming what it saw (INC-1033 d). The
    -- successful saves are two (the create and the edit); the price rows A, B, G, H; one end (A).
    SELECT count(*) INTO v_n FROM public.package_prices WHERE package_key = v_pkg;
    IF v_n <> 4 THEN RAISE EXCEPTION 'P-1 M1c proof (d-h): price rows % expected 4', v_n; END IF;
    SELECT days INTO v_n FROM public.listing_packages WHERE key = v_pkg;
    IF v_n IS DISTINCT FROM 14 THEN RAISE EXCEPTION 'P-1 M1c proof (d-h): days % expected 14', v_n; END IF;
    SELECT valid_to INTO v_to FROM public.package_prices WHERE id = v_h;
    IF v_to IS DISTINCT FROM now() + interval '3 days' THEN
      RAISE EXCEPTION 'P-1 M1c proof (d-h): H valid_to % expected %', v_to, now() + interval '3 days';
    END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package.saved' AND entity_id = v_pkg;
    IF v_n <> 2 THEN RAISE EXCEPTION 'P-1 M1c proof (d-h): package.saved rows % expected 2', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package_price.saved'
      AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text);
    IF v_n <> 4 THEN RAISE EXCEPTION 'P-1 M1c proof (d-h): package_price.saved rows % expected 4', v_n; END IF;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE action = 'package_price.ended'
      AND entity_id IN (v_a::text, v_b::text, v_g::text, v_h::text);
    IF v_n <> 1 THEN RAISE EXCEPTION 'P-1 M1c proof (d-h): package_price.ended rows % expected 1', v_n; END IF;

    RAISE EXCEPTION 'p1-m1c-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1-m1c-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261103000000') ON CONFLICT DO NOTHING;
