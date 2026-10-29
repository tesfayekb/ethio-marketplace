-- Foundations turn N1a (INC-977): the seller name's check state, written by the doors that save the name.
-- name_checks is born closed (service_role only). save_posting_identity writes 'unchecked' with every new
-- name; admin_update_profile writes 'clean' (a person chose it); name_check_mark (service-only) records the
-- model's answer only for the text it was asked; admin_name_check_summary gives staff the count and the oldest.
-- Both doors are redeclared whole from live pg_get_functiondef (argument lists unchanged; computed insertion).
-- No index: the proof's EXPLAIN on an empty table is a sequential scan (ruling 2: kept only if used).
CREATE TABLE public.name_checks (
  profile_id        uuid        NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  subject           text        NOT NULL CHECK (subject IN ('alias')),
  checked_text      text        NOT NULL,
  state             text        NOT NULL CHECK (state IN ('unchecked','clean','imitates')),
  since             timestamptz NOT NULL DEFAULT now(),
  attempts          integer     NOT NULL DEFAULT 0,
  last_attempt_at   timestamptz,
  home_country_code character(2),
  PRIMARY KEY (profile_id, subject)
);
REVOKE ALL ON public.name_checks FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.name_checks TO service_role;
ALTER TABLE public.name_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY name_checks_deny_select ON public.name_checks FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY name_checks_deny_insert ON public.name_checks FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY name_checks_deny_update ON public.name_checks FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY name_checks_deny_delete ON public.name_checks FOR DELETE TO anon, authenticated USING (false);

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
    -- N1a (INC-977) — every new or changed name starts 'unchecked', in this same transaction; only the
    -- service-only name_check_mark records the model's answer. A failed state write fails the save whole.
    INSERT INTO public.name_checks (profile_id, subject, checked_text, state, since, attempts, last_attempt_at, home_country_code)
    VALUES (v_uid, 'alias', v_alias, 'unchecked', now(), 0, NULL,
            (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid))
    ON CONFLICT (profile_id, subject) DO UPDATE
      SET checked_text = EXCLUDED.checked_text, state = 'unchecked', since = now(),
          attempts = 0, last_attempt_at = NULL, home_country_code = EXCLUDED.home_country_code;
    UPDATE public.alias_history SET released_at = now()
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
END $function$;
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
    UPDATE public.alias_history SET released_at = now()
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
END $function$;
REVOKE ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_profile(uuid, text, text, character, text) TO service_role;

-- The service-only answer: changes the row only when the stored text is the text that was asked (a name
-- changed in between is never marked). Returns whether a row changed.
CREATE OR REPLACE FUNCTION public.name_check_mark(p_profile uuid, p_subject text, p_text text, p_state text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_n integer;
BEGIN
  IF p_state IS NULL OR p_state NOT IN ('clean','imitates') THEN RAISE EXCEPTION 'badValue:state'; END IF;
  UPDATE public.name_checks
     SET state = p_state, attempts = attempts + 1, last_attempt_at = now()
   WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n > 0;
END $function$;
REVOKE ALL ON FUNCTION public.name_check_mark(uuid, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.name_check_mark(uuid, text, text, text) TO service_role;

-- Staff count (the Screening page's own permission, listings:view): the unchecked count and the oldest
-- 'since', and nothing else — no name, no person.
CREATE OR REPLACE FUNCTION public.admin_name_check_summary()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'listings', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN (SELECT jsonb_build_object('unchecked', count(*), 'oldest_since', min(since))
            FROM public.name_checks WHERE state = 'unchecked');
END $function$;
REVOKE ALL ON FUNCTION public.admin_name_check_summary() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_name_check_summary() TO authenticated;
GRANT ALL ON FUNCTION public.admin_name_check_summary() TO service_role;

-- Proof (INC-970): scratch e2e-n1 users only; every row it reads it creates; the sentinel rolls it all back.
DO $proof$
DECLARE
  v_hex  text := replace(gen_random_uuid()::text,'-','');
  v_tag  text := 'e2e-n1-' || substr(v_hex,1,12);
  v_u1   uuid := gen_random_uuid();
  v_u2   uuid := gen_random_uuid();
  v_role uuid := gen_random_uuid();
  v_sess uuid := gen_random_uuid();
  v_a1   text := 'qz' || translate(substr(v_hex,1,10),'0123456789','ghijkmnopr');
  v_a2   text := 'qx' || translate(substr(v_hex,11,10),'0123456789','ghijkmnopr');
  v_a4   text := 'qw' || translate(substr(v_hex,21,10),'0123456789','ghijkmnopr');
  v_r    jsonb;
  v_c    public.name_checks%ROWTYPE;
  v_lang text := (SELECT code FROM public.languages ORDER BY code LIMIT 1);
BEGIN
 BEGIN
  INSERT INTO auth.users(id,email,raw_user_meta_data,aud,role,created_at,updated_at) VALUES
    (v_u1, v_tag||'-s@example.invalid','{}','authenticated','authenticated',now(),now()),
    (v_u2, v_tag||'-t@example.invalid','{}','authenticated','authenticated',now(),now());
  -- The seller has accepted every published text (scratch acceptances), so the acceptance guard passes.
  INSERT INTO public.legal_acceptances(user_id,version_id,language,method)
  SELECT v_u1, v.id, v_lang, v_tag FROM public.legal_versions v WHERE v.status='published' AND v.effective_at<=now();
  IF public.legal_acceptance_pending(v_u1,NULL) THEN RAISE EXCEPTION 'NCU proof setup: acceptance'; END IF;

  -- ── NCU-1 (allow): a door save writes the alias and its 'unchecked' row together.
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub',v_u1,'role','authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u1::text, true);
  v_r := public.save_posting_identity(p_alias => v_a1);
  SELECT * INTO v_c FROM public.name_checks WHERE profile_id=v_u1 AND subject='alias';
  IF (v_r->>'ok')::boolean IS NOT TRUE OR v_c.state IS DISTINCT FROM 'unchecked' OR v_c.checked_text<>v_a1
     OR (SELECT seller_alias FROM public.profiles WHERE user_id=v_u1)<>v_a1 THEN
    RAISE EXCEPTION 'NCU-1 save and state: % %', v_r, v_c.state; END IF;

  -- ── NCU-2 (deny): no browser role can mark; the row is unchanged.
  IF has_function_privilege('authenticated','public.name_check_mark(uuid,text,text,text)','EXECUTE')
     OR has_function_privilege('anon','public.name_check_mark(uuid,text,text,text)','EXECUTE')
     OR has_table_privilege('authenticated','public.name_checks','SELECT,INSERT,UPDATE,DELETE')
     OR has_table_privilege('anon','public.name_checks','SELECT,INSERT,UPDATE,DELETE')
     OR NOT has_function_privilege('service_role','public.name_check_mark(uuid,text,text,text)','EXECUTE')
     OR (SELECT state FROM public.name_checks WHERE profile_id=v_u1)<>'unchecked' THEN
    RAISE EXCEPTION 'NCU-2 deny'; END IF;

  -- ── NCU-5: a stale text changes nothing; a bad state is refused.
  IF public.name_check_mark(v_u1,'alias',v_a1||'x','clean')
     OR (SELECT state FROM public.name_checks WHERE profile_id=v_u1)<>'unchecked' THEN RAISE EXCEPTION 'NCU-5 stale'; END IF;
  BEGIN PERFORM public.name_check_mark(v_u1,'alias',v_a1,'unchecked'); RAISE EXCEPTION 'NCU-5 state absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'badValue:state' THEN RAISE; END IF; END;
  v_r := to_jsonb(public.name_check_mark(v_u1,'alias',v_a1,'clean'));
  IF v_r IS DISTINCT FROM 'true'::jsonb
     OR (SELECT state FROM public.name_checks WHERE profile_id=v_u1)<>'clean' THEN
    RAISE EXCEPTION 'NCU-5 mark: % % % %', v_r, v_a1,
      (SELECT checked_text FROM public.name_checks WHERE profile_id=v_u1),
      (SELECT state FROM public.name_checks WHERE profile_id=v_u1); END IF;

  -- ── NCU-4: the same alias again keeps 'clean'; a changed alias (a 24-hour correction) resets to 'unchecked'.
  v_r := public.save_posting_identity(p_alias => upper(v_a1));
  IF (v_r->>'ok')::boolean IS NOT TRUE OR (SELECT state FROM public.name_checks WHERE profile_id=v_u1)<>'clean' THEN
    RAISE EXCEPTION 'NCU-4 same: %', v_r; END IF;
  v_r := public.save_posting_identity(p_alias => v_a2);
  SELECT * INTO v_c FROM public.name_checks WHERE profile_id=v_u1;
  IF (v_r->>'ok')::boolean IS NOT TRUE OR v_c.state<>'unchecked' OR v_c.checked_text<>v_a2 OR v_c.attempts<>0 THEN
    RAISE EXCEPTION 'NCU-4 changed: % %', v_r, v_c.state; END IF;

  -- ── NCU-1 (refuse): a save whose state write fails saves nothing.
  BEGIN
    EXECUTE 'CREATE FUNCTION public.e2e_n1_refuse() RETURNS trigger LANGUAGE plpgsql AS $t$ BEGIN RAISE EXCEPTION ''e2e-n1 state refused''; END $t$';
    EXECUTE 'CREATE TRIGGER e2e_n1_refuse BEFORE INSERT OR UPDATE ON public.name_checks FOR EACH ROW EXECUTE FUNCTION public.e2e_n1_refuse()';
    PERFORM public.save_posting_identity(p_alias => v_a4);
    RAISE EXCEPTION 'NCU-1 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'e2e-n1 state refused' THEN RAISE; END IF; END;
  IF (SELECT seller_alias FROM public.profiles WHERE user_id=v_u1)<>v_a2
     OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id=v_u1 AND alias=v_a4)
     OR (SELECT checked_text FROM public.name_checks WHERE profile_id=v_u1)<>v_a2 THEN RAISE EXCEPTION 'NCU-1 refused save left a trace'; END IF;

  -- ── NCU-6 (deny): without listings:view the summary is refused.
  BEGIN PERFORM public.admin_name_check_summary(); RAISE EXCEPTION 'NCU-6 deny absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'permission denied' THEN RAISE; END IF; END;

  -- Staff: a scratch role with the existing listings:view and profiles:update, and a fresh scratch TOTP session.
  INSERT INTO public.roles(id,name) VALUES(v_role,v_tag);
  INSERT INTO public.role_permissions(role_id,permission_id)
  SELECT v_role,p.id FROM public.permissions p JOIN public.resources r ON r.id=p.resource_id
   WHERE (r.name='listings' AND p.action='view') OR (r.name='profiles' AND p.action='update');
  INSERT INTO public.user_roles(user_id,role_id,scope_type) VALUES(v_u2,v_role,'global');
  INSERT INTO auth.sessions(id,user_id,created_at,updated_at,aal) VALUES(v_sess,v_u2,now(),now(),'aal2');
  INSERT INTO auth.mfa_factors(id,user_id,friendly_name,factor_type,status,created_at,updated_at)
  VALUES(gen_random_uuid(),v_u2,v_tag,'totp','verified',now(),now());
  INSERT INTO auth.mfa_amr_claims(id,session_id,created_at,updated_at,authentication_method)
  VALUES(gen_random_uuid(),v_sess,now(),now(),'totp');
  PERFORM set_config('request.jwt.claims', jsonb_build_object('sub',v_u2,'role','authenticated','aal','aal2','session_id',v_sess)::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_u2::text, true);

  -- ── NCU-6 (allow): the count includes the scratch row; the oldest is no later than it; nothing else is returned.
  v_r := public.admin_name_check_summary();
  IF (v_r->>'unchecked')::integer < 1 OR (v_r->>'oldest_since')::timestamptz > v_c.since
     OR (SELECT count(*) FROM jsonb_object_keys(v_r)) <> 2 THEN RAISE EXCEPTION 'NCU-6 summary: %', v_r; END IF;

  -- ── NCU-7: a staff-assigned name is 'clean' in the same transaction.
  PERFORM public.admin_update_profile(v_u1, v_tag, v_a4, NULL, NULL);
  SELECT * INTO v_c FROM public.name_checks WHERE profile_id=v_u1;
  IF v_c.state<>'clean' OR v_c.checked_text<>v_a4 OR (SELECT seller_alias FROM public.profiles WHERE user_id=v_u1)<>v_a4 THEN
    RAISE EXCEPTION 'NCU-7 staff clean: %', v_c.state; END IF;

  RAISE EXCEPTION 'N1a proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM<>'N1a proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u1,v_u2)) OR EXISTS (SELECT 1 FROM public.roles WHERE id=v_role)
    OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id IN (v_u1,v_u2))
    OR to_regproc('public.e2e_n1_refuse') IS NOT NULL THEN RAISE EXCEPTION 'NCU rollback failed'; END IF;
END;
$proof$;
INSERT INTO public.migration_marks(version) VALUES('20261029210000');