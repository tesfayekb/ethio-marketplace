-- e2e-areas: posting, account, auth-caller-gates, door-refusals

-- Foundations 1, turn F1-5a, part 14 — SAVE_POSTING_IDENTITY ONTO DOOR_CONTEXT AND THE SHELL (DEC-333, DEC-391; brief
-- docs/governance/briefs/f1-doors-5a.md, ruling docs/governance/briefs/f1-doors-5a-ruling-1.md).
-- save_posting_identity is redeclared WHOLE from its last declaration (live md5 checked): ONE
-- door_context('owner', …, 'identity') gate, the shell. Ruling 1 §7: a deactivated caller is refused before
-- the dial is spent (the dial was spent first). Its field refusals ({ok: false, refusals}) are kept as they
-- are. Ruling 1 §6 (INC-1170): the alias verdict's resets_at is dropped. Folds: 'not signed in' →
-- notSignedIn; 'account is deactivated' → accountDeactivated.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.save_posting_identity(text,text,text,text,text,jsonb,character)', '59a766e6afe1a623f33121f585a55aca']];
  v_md5  text;
  i      integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261116031100') THEN
    RAISE EXCEPTION 'F1-5a part 14: part 13 (mark 20261116031100) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'door_context' AND pronamespace = 'public'::regnamespace) THEN
    RAISE EXCEPTION 'F1-5a part 14: the door mechanism (door_context, door_refuse, door_refused) is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 14: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. save_posting_identity (whole; the owner gate and the shell)
CREATE OR REPLACE FUNCTION public.save_posting_identity(p_alias text DEFAULT NULL::text, p_seller_type text DEFAULT NULL::text, p_business_name text DEFAULT NULL::text, p_first_name text DEFAULT NULL::text, p_last_name text DEFAULT NULL::text, p_contact_pref jsonb DEFAULT NULL::jsonb, p_home_country_code character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_ref      jsonb := '[]'::jsonb;
  v_alias    text := lower(btrim(coalesce(p_alias, '')));
  v_type     text := nullif(btrim(coalesce(p_seller_type, '')), '');
  v_biz      text := nullif(btrim(coalesce(p_business_name, '')), '');
  v_first    text := nullif(btrim(coalesce(p_first_name, '')), '');
  v_last     text := nullif(btrim(coalesce(p_last_name, '')), '');
  v_country  char(2) := upper(nullif(btrim(coalesce(p_home_country_code, '')), ''));
  v_source   text;
  v_home     char(2);
  v_row      public.profiles%ROWTYPE;
  v_cur      public.profiles%ROWTYPE;
  v_verdict  jsonb;
  v_rule     text;
  v_alias_changed boolean := false;
  v_out_state text;
BEGIN
  -- F1-5a (ruling 1 §7) — the one gate order: a deactivated caller is refused before the dial is spent.
  PERFORM public.door_context('owner', NULL, NULL, 'identity');
  SELECT * INTO v_cur FROM public.profiles WHERE user_id = v_uid;

  -- ---- alias: existing names are kept; a new or changed name is judged ----
  IF v_alias <> '' AND v_alias IS DISTINCT FROM lower(v_cur.seller_alias) THEN
    v_verdict := public.alias_verdict(v_alias, v_uid);
    IF NOT (v_verdict->>'ok')::boolean THEN
      v_ref := v_ref || jsonb_build_array(v_verdict - 'ok');
    ELSE
      v_alias_changed := true;
    END IF;
  END IF;

  -- ---- seller type / business name ----
  IF v_type IS NOT NULL AND v_type NOT IN ('person','business') THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','seller_type','reason','badValue','detail',v_type));
  END IF;
  IF coalesce(v_type, v_cur.seller_type) = 'business' THEN
    IF coalesce(v_biz, v_cur.business_name) IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','required'));
    END IF;
  END IF;
  IF v_biz IS NOT NULL AND char_length(v_biz) NOT BETWEEN 2 AND 80 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','badLength'));
  ELSIF v_biz IS NOT NULL AND v_biz IS DISTINCT FROM v_cur.business_name THEN
    v_rule := public.business_name_rule(v_biz);
    IF v_rule IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason',public.business_reason(v_rule)));
    END IF;
  END IF;

  -- ---- D17 — the seller's own name, refused BY FIELD when too long ----
  IF v_first IS NOT NULL AND char_length(v_first) > 60 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','first_name','reason','badLength'));
  END IF;
  IF v_last IS NOT NULL AND char_length(v_last) > 60 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','last_name','reason','badLength'));
  END IF;

  -- ---- contact preferences: the same shape the draft door enforces ----
  IF p_contact_pref IS NOT NULL THEN
    v_ref := v_ref || public.listing_contact_refusals(p_contact_pref);
  END IF;

  -- ---- declared home country (never the observed fact) ----
  IF v_country IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = v_country) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','unknownCountry','detail',v_country));
    ELSE
      SELECT d.country_source, d.home_country_code INTO v_source, v_home
        FROM public.user_directory d WHERE d.user_id = v_uid;
      IF v_source = 'user_confirmed' AND v_home IS DISTINCT FROM v_country THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','countryAlreadyConfirmed','detail',v_home));
      END IF;
    END IF;
  END IF;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  -- Every field is optional: a NULL leaves the stored value alone.
  UPDATE public.profiles SET
    seller_alias  = coalesce(nullif(v_alias, ''), seller_alias),
    seller_type   = coalesce(v_type, seller_type),
    business_name = CASE WHEN coalesce(v_type, seller_type) = 'person' AND v_type = 'person'
                         THEN NULL ELSE coalesce(v_biz, business_name) END,
    first_name    = coalesce(v_first, first_name),
    last_name     = coalesce(v_last, last_name),
    contact_prefs = coalesce(p_contact_pref, contact_prefs),
    updated_at    = now()
  WHERE user_id = v_uid;

  IF v_alias_changed THEN
    -- N1b-2c (INC-977, R1): the outgoing name's check state, read before the row is reset, is stamped on
    -- its release; no row reads as 'unchecked' (withheld from public reads, the safe direction).
    v_out_state := coalesce((SELECT c.state FROM public.name_checks c
                              WHERE c.profile_id = v_uid AND c.subject = 'alias'), 'unchecked');
    -- N1a (INC-977) — every new or changed name starts 'unchecked', in this same transaction; only the
    -- service-only name_check_mark records the model's answer. A failed state write fails the save whole.
    INSERT INTO public.name_checks (profile_id, subject, checked_text, state, since, attempts, last_attempt_at, home_country_code)
    VALUES (v_uid, 'alias', v_alias, 'unchecked', now(), 0, NULL,
            (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid))
    ON CONFLICT (profile_id, subject) DO UPDATE
      SET checked_text = EXCLUDED.checked_text, state = 'unchecked', since = now(),
          attempts = 0, last_attempt_at = NULL, home_country_code = EXCLUDED.home_country_code;
    UPDATE public.alias_history SET released_at = now(), released_state = v_out_state
     WHERE user_id = v_uid AND released_at IS NULL;
    INSERT INTO public.alias_history (user_id, alias, alias_fold, home_country_code)
    VALUES (v_uid, v_alias, public.name_fold(v_alias),
            (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid));
  END IF;

  IF v_country IS NOT NULL AND coalesce(v_source, 'unknown') <> 'user_confirmed' THEN
    PERFORM public.confirm_home_country(v_country);
  END IF;

  SELECT * INTO v_row FROM public.profiles WHERE user_id = v_uid;
  RETURN jsonb_build_object(
    'ok', true,
    'alias', v_row.seller_alias,
    'seller_type', v_row.seller_type,
    'business_name', v_row.business_name,
    'first_name', v_row.first_name,
    'last_name', v_row.last_name,
    'contact_prefs', v_row.contact_prefs,
    'home_country_code', v_row.home_country_code
  );
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('save_posting_identity', 'identity', SQLERRM);
END $function$
;
REVOKE ALL ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, character) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, character) TO authenticated, service_role;

-- Proof: catalog facts, then the calls on scratch rows under a sentinel rollback.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  -- 'XZ': a scratch code no market holds, as earlier proofs' (K4: a recorded proof exception)
  v_code    character(2) := 'XZ';
  v_lang    text := public.language_code('base');
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_none    uuid := gen_random_uuid();
  v_ca      text := json_build_object('sub', v_a::text, 'role', 'authenticated')::text;
  v_cb      text := json_build_object('sub', v_b::text, 'role', 'authenticated')::text;
  v_cd      text := json_build_object('sub', v_d::text, 'role', 'authenticated')::text;
  v_r0      text;
  v_anc     uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_snap    text;
  v_snap2   text;
  v_msg     text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_pairs := ARRAY[
    ['public.save_posting_identity(text,text,text,text,text,jsonb,character)', 'f2d222259edcabd27a378ab6c621f589', 'browser', 't', 'jsonb']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT prosecdef <> (v_pairs[i][4] = 't') OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}'
               OR prorettype <> v_pairs[i][5]::regtype FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') <> (v_pairs[i][3] = 'browser')
       OR has_function_privilege('service_role', v_fn, 'EXECUTE') <> (v_pairs[i][3] <> 'owner') THEN
      RAISE EXCEPTION 'F1-5a part 14 proof (a): %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-5a part 14 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  v_tag := 'e2e-mig-f15a14-' || substr(v_hex, 1, 10);
  v_r0 := 'e2e_mig_r0_' || substr(v_hex, 11, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: scratch code % already exists', v_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.listings WHERE id = v_none) THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: the id no row holds is held';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' AND a.name_en = v_tag
     AND a.name_en LIKE 'e2e-mig-%';
    IF v_anc IS NULL THEN RAISE EXCEPTION 'F1-5a part 14 proof: the scratch market has no anchor'; END IF;
    UPDATE public.locations SET is_active = true WHERE id = v_anc AND name_en = v_tag AND name_en LIKE 'e2e-mig-%';
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id)
    VALUES ('region', v_code, v_tag || ' region', v_tag || '-r', true, v_anc) RETURNING id INTO v_region;
    INSERT INTO public.locations (level, country_code, name_en, slug, is_active, parent_id, center_lat, center_lng)
    VALUES ('city', v_code, v_tag || ' city', v_tag || '-c', true, v_region, 9.03, 38.74) RETURNING id INTO v_city;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    SELECT u, v.id, v_lang, 'e2e-mig' FROM public.legal_versions v, unnest(ARRAY[v_a, v_b, v_d]) u
     WHERE v.status = 'published' AND v.effective_at <= now();
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES (v_tag || ' leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort)
    VALUES (v_r0, 'reach', v_tag || ' reach', 30, true, true, false, 9001);
    INSERT INTO public.market_settings (country_code, free_regular_ads, included_reach, paid_levels)
    VALUES (v_code, 20, v_r0, false);

    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date AND door IN ('save_posting_identity');
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap;
    v_answer := public.save_posting_identity(p_first_name => 'Abebe');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('notSignedIn', 'notSignedIn', 'false', '401') THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: save_posting_identity with no caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_cd, true);
    v_answer := public.save_posting_identity(p_first_name => 'Abebe');
    IF (v_answer ->> 'message', v_answer -> 'refusals' -> 0 ->> 'reason', v_answer ->> 'ok', current_setting('response.status', true))
       IS DISTINCT FROM ('accountDeactivated', 'accountDeactivated', 'false', '403') THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: save_posting_identity for a deactivated caller answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.save_posting_identity(p_seller_type => 'robot');
    IF NOT coalesce(v_answer ->> 'ok' = 'false' AND v_answer -> 'refusals' -> 0 ->> 'reason' = 'badValue', false) THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: an unknown seller type answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce((SELECT string_agg(to_jsonb(l)::text, '|' ORDER BY l.id) FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_revisions r WHERE r.seller_id IN (v_a, v_b, v_d))
        || '#' || coalesce((SELECT string_agg(p.id::text || '@' || p.display_order, ',' ORDER BY p.id) FROM public.listing_photos p
                              JOIN public.listings l ON l.id = p.listing_id WHERE l.seller_id IN (v_a, v_b, v_d)), '')
        || '#' || (SELECT count(*) FROM public.listing_photo_changes c JOIN public.listings l ON l.id = c.listing_id
                    WHERE l.seller_id IN (v_a, v_b, v_d))
        || '#' || (SELECT count(*) FROM storage.objects o WHERE o.name LIKE v_tag || '%')
        || '#' || coalesce((SELECT string_agg(to_jsonb(s)::text, '|' ORDER BY s.user_id) FROM public.seller_places s
                              WHERE s.user_id IN (v_a, v_b, v_d)), '')
        || '#' || coalesce((SELECT string_agg(to_jsonb(p)::text, '|' ORDER BY p.user_id) FROM public.profiles p
                              WHERE p.user_id IN (v_a, v_b, v_d)
                                AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.user_id AND u.email LIKE 'e2e-mig-%')), '')
        || '#' || (SELECT count(*) FROM public.audit_log a WHERE a.actor_id IN (v_a, v_b, v_d)
                    OR a.entity_id IN (SELECT l.id::text FROM public.listings l WHERE l.seller_id IN (v_a, v_b, v_d)))
        || '#' || (SELECT count(*) FROM public.seller_notices n WHERE n.seller_id IN (v_a, v_b, v_d))
      INTO v_snap2;
    IF v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: a refused identity call wrote a row';
    END IF;
    PERFORM set_config('request.jwt.claims', v_ca, true);
    v_answer := public.save_posting_identity(p_first_name => 'Abebe');
    IF NOT coalesce((v_answer ->> 'ok')::boolean, false) THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: a first name saved answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT coalesce(jsonb_object_agg(t.k, t.n), '{}'::jsonb) INTO v_answer
      FROM (SELECT CASE r.key WHEN v_a::text THEN 'a' WHEN v_b::text THEN 'b' ELSE 'd' END || '/' || r.action AS k,
                   sum(r.count) AS n
              FROM public.rate_limits r WHERE r.key IN (v_a::text, v_b::text, v_d::text) GROUP BY 1) t;
    IF v_answer IS DISTINCT FROM '{"a/identity":2}'::jsonb THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: the dials counted %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date AND door IN ('save_posting_identity'))
         IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-5a part 14 proof: door_refusals did not meter the 2 refusals';
    END IF;

    RAISE EXCEPTION 'f1-5a-part-14-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-5a-part-14-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261116031200') ON CONFLICT DO NOTHING;
