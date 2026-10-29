-- N1b-2c M3b (INC-977, R1): a released name carries its check state.
-- save_posting_identity and admin_update_profile are redeclared whole from their live pg_get_functiondef
-- (md5-checked at build; argument lists unchanged; no DROP); only the lines marked N1b-2c change: the
-- outgoing name's check state, read before the check row is reset, is written as released_state in the
-- same transaction.

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
  v_rate     jsonb;
  v_verdict  jsonb;
  v_rule     text;
  v_alias_changed boolean := false;
  v_out_state text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('identity');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
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
END $function$
;
REVOKE ALL ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, character) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, character) TO authenticated;
GRANT ALL ON FUNCTION public.save_posting_identity(text, text, text, text, text, jsonb, character) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_update_profile(p_user_id uuid, p_display_name text, p_seller_alias text DEFAULT NULL::text, p_home_country_code character DEFAULT NULL::bpchar, p_reason text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old   record;
  v_name  text;
  v_alias text;
  v_rule  text;
  v_meta  jsonb := '{}'::jsonb;
  v_out_state text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'profiles', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('profiles', 'update');

  v_name  := btrim(COALESCE(p_display_name, ''));
  IF v_name = '' THEN
    RAISE EXCEPTION 'display name is required';
  END IF;
  v_alias := lower(NULLIF(btrim(COALESCE(p_seller_alias, '')), ''));

  IF p_home_country_code IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.countries c
                      WHERE c.code = p_home_country_code AND c.is_active) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;

  SELECT display_name, seller_alias, home_country_code
    INTO v_old
    FROM public.profiles
   WHERE user_id = p_user_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  -- A new or changed name: shape and taken always apply; rules b-e can be
  -- overruled only with a reason of at least ten characters.
  IF v_alias IS NOT NULL AND v_alias IS DISTINCT FROM lower(v_old.seller_alias) THEN
    v_rule := public.alias_rule(v_alias);
    IF v_rule = 'a' THEN
      RAISE EXCEPTION 'seller alias refused: shape' USING ERRCODE = '22023';
    END IF;
    IF public.alias_taken(v_alias, p_user_id) THEN
      RAISE EXCEPTION 'seller alias already taken' USING ERRCODE = '23505';
    END IF;
    IF v_rule IS NOT NULL AND char_length(btrim(coalesce(p_reason, ''))) < 10 THEN
      RAISE EXCEPTION 'seller alias needs a reason: %', v_rule
        USING ERRCODE = '22023', HINT = 'reason_required';
    END IF;
  END IF;

  UPDATE public.profiles
     SET display_name      = v_name,
         seller_alias      = v_alias,
         home_country_code = COALESCE(p_home_country_code, home_country_code),
         updated_at        = now()
   WHERE user_id = p_user_id;

  IF lower(v_old.seller_alias) IS DISTINCT FROM v_alias THEN
    -- N1b-2c (INC-977, R1): the outgoing name's check state, read before the row is reset or removed,
    -- is stamped on its release (a held name stays 'imitates'); no row reads as 'unchecked'.
    v_out_state := coalesce((SELECT c.state FROM public.name_checks c
                              WHERE c.profile_id = p_user_id AND c.subject = 'alias'), 'unchecked');
    UPDATE public.alias_history SET released_at = now(), released_state = v_out_state
     WHERE user_id = p_user_id AND released_at IS NULL;
    IF v_alias IS NOT NULL THEN
      INSERT INTO public.alias_history (user_id, alias, alias_fold, home_country_code)
      VALUES (p_user_id, v_alias, public.name_fold(v_alias),
              (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = p_user_id));
      -- N1a (INC-977) — a name staff chose is checked by a person: 'clean', in this same transaction.
      INSERT INTO public.name_checks (profile_id, subject, checked_text, state, since, attempts, last_attempt_at, home_country_code)
      VALUES (p_user_id, 'alias', v_alias, 'clean', now(), 0, now(),
              (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_user_id))
      ON CONFLICT (profile_id, subject) DO UPDATE
        SET checked_text = EXCLUDED.checked_text, state = 'clean', since = now(),
            attempts = 0, last_attempt_at = now(), home_country_code = EXCLUDED.home_country_code;
    ELSE
      DELETE FROM public.name_checks WHERE profile_id = p_user_id AND subject = 'alias';
    END IF;
  END IF;

  IF v_old.display_name IS DISTINCT FROM v_name THEN
    v_meta := v_meta || jsonb_build_object('display_name',
      jsonb_build_object('old', v_old.display_name, 'new', v_name));
  END IF;
  IF v_old.seller_alias IS DISTINCT FROM v_alias THEN
    v_meta := v_meta || jsonb_build_object('seller_alias',
      jsonb_build_object('old', v_old.seller_alias, 'new', v_alias));
  END IF;
  IF p_home_country_code IS NOT NULL
     AND v_old.home_country_code IS DISTINCT FROM p_home_country_code THEN
    v_meta := v_meta || jsonb_build_object('home_country_code',
      jsonb_build_object('old', v_old.home_country_code, 'new', p_home_country_code));
  END IF;

  PERFORM public.log_audit('user.profile_edit', 'profiles', p_user_id::text, v_meta);
  IF v_rule IS NOT NULL THEN
    PERFORM public.log_audit('user.alias_assigned', 'profiles', p_user_id::text,
      jsonb_build_object('alias', v_alias, 'rule', v_rule, 'reason', btrim(p_reason)));
  END IF;
END $function$
;
REVOKE ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) TO service_role;

-- Proof (INC-980): its own scratch e2e-n1b2 seller (v_u) and scratch staff (v_u2, role v_role, session
-- v_sess) only, the legacy mixed-case alias shape included (INC-986); rolled back whole on the sentinel.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text, '-', '');
  v_tag  text := 'e2e-n1b2-' || substr(v_hex, 1, 12);
  v_u    uuid := gen_random_uuid();
  v_u2   uuid := gen_random_uuid();
  v_role uuid := gen_random_uuid();
  v_sess uuid := gen_random_uuid();
  v_a    text := 'qz' || translate(substr(v_hex, 1, 10), '0123456789', 'ghijkmnopr');
  v_a2   text;
  v_a3   text;
  v_mixed text;
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
  v_r    jsonb;
BEGIN
 BEGIN
  v_a2 := v_a || 'b';
  v_a3 := v_a || 'c';
  INSERT INTO auth.users(id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_u, v_tag || '@example.invalid', '{}', 'authenticated', 'authenticated', now(), now()),
           (v_u2, v_tag || '-s@example.invalid', '{}', 'authenticated', 'authenticated', now(), now());
  INSERT INTO public.legal_acceptances(user_id, version_id, language, method)
  SELECT u, v.id, v_lang, v_tag FROM public.legal_versions v, unnest(ARRAY[v_u, v_u2]) u
   WHERE v.status = 'published' AND v.effective_at <= now();
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u::text, true);
  v_r := public.save_posting_identity(p_alias => v_a);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'SPA proof setup: save %', v_r; END IF;

  PERFORM public.name_check_mark(v_u, 'alias', v_a, 'clean');

  -- SPA-5g: the owner's rename stamps the outgoing name's state ('clean') on its release.
  v_r := public.save_posting_identity(p_alias => v_a2);
  IF (v_r->>'ok')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'SPA-5g save %', v_r; END IF;
  IF (SELECT h.released_state FROM public.alias_history h WHERE h.user_id = v_u AND h.alias = v_a) IS DISTINCT FROM 'clean'
     OR (SELECT h.released_at FROM public.alias_history h WHERE h.user_id = v_u AND h.alias = v_a) IS NULL
     OR (SELECT h.released_state FROM public.alias_history h WHERE h.user_id = v_u AND h.alias = v_a2) IS NOT NULL
     OR (SELECT c.state FROM public.name_checks c WHERE c.profile_id = v_u AND c.subject = 'alias') IS DISTINCT FROM 'unchecked'
  THEN RAISE EXCEPTION 'SPA-5g stamp'; END IF;
  -- One transaction gives every release the same now(); the scratch first name is aged by an hour, as two
  -- separate saves would leave it, so "the latest release" is well defined for SPA-5i.
  UPDATE public.alias_history SET taken_at = now() - interval '2 hours', released_at = now() - interval '1 hour'
   WHERE user_id = v_u AND alias = v_a;

  -- The name is held; then the legacy mixed-case shape on its own profile (INC-986).
  PERFORM public.name_check_mark(v_u, 'alias', v_a2, 'imitates');

  v_mixed := upper(substr(v_a2, 1, 1)) || substr(v_a2, 2);
  UPDATE public.profiles SET seller_alias = v_mixed WHERE user_id = v_u;

  -- SPA-5h: a staff rename of a held name stamps 'imitates'; the new staff name is clean and found.
  INSERT INTO public.roles(id, name) VALUES (v_role, v_tag);
  INSERT INTO public.role_permissions(role_id, permission_id)
  SELECT v_role, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
   WHERE r.name = 'profiles' AND p.action = 'update';
  INSERT INTO public.user_roles(user_id, role_id, scope_type) VALUES (v_u2, v_role, 'global');
  INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_u2, now(), now(), 'aal2');
  INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status, created_at, updated_at)
  VALUES (gen_random_uuid(), v_u2, v_tag, 'totp', 'verified', now(), now());
  INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
  VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp');
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub', v_u2, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess)::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u2::text, true);
  PERFORM public.admin_update_profile(v_u, v_tag, v_a3, NULL, NULL);
  IF (SELECT h.released_state FROM public.alias_history h WHERE h.user_id = v_u AND h.alias = v_a2) IS DISTINCT FROM 'imitates'
     OR (SELECT c.state FROM public.name_checks c WHERE c.profile_id = v_u AND c.subject = 'alias') IS DISTINCT FROM 'clean'
  THEN RAISE EXCEPTION 'SPA-5h stamp'; END IF;
  IF public.seller_feed_page(v_a3)->'seller'->>'alias' IS DISTINCT FROM v_a3 THEN RAISE EXCEPTION 'SPA-5h found'; END IF;
  -- SPA-5i: the held name, now previous, is never the public previous name.
  IF public.seller_public_previous_alias(v_u) IS NOT NULL THEN RAISE EXCEPTION 'SPA-5i previous shown'; END IF;
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);

  -- SPA-5k: definitions and closers read back.
  IF position('released_state = v_out_state' IN pg_get_functiondef('public.save_posting_identity(text, text, text, text, text, jsonb, character)'::regprocedure)) = 0
     OR position('released_state = v_out_state' IN pg_get_functiondef('public.admin_update_profile(uuid, text, text, character, text)'::regprocedure)) = 0
  THEN RAISE EXCEPTION 'SPA-5k definitions'; END IF;
  IF has_function_privilege('anon', 'public.save_posting_identity(text, text, text, text, text, jsonb, character)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_update_profile(uuid, text, text, character, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.save_posting_identity(text, text, text, text, text, jsonb, character)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_update_profile(uuid, text, text, character, text)', 'EXECUTE')
  THEN RAISE EXCEPTION 'SPA-5k acl'; END IF;
  RAISE EXCEPTION 'M3b proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3b proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u, v_u2)) OR EXISTS (SELECT 1 FROM public.roles WHERE id = v_role)
    OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id = v_u) THEN
   RAISE EXCEPTION 'M3b rollback failed'; END IF;
END;
$proof$;

INSERT INTO public.migration_marks(version) VALUES ('20261030021500');