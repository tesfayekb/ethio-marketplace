-- Foundations turn D1, M4 — INC-951 part 3a: five authenticated SECURITY DEFINER row-writing doors
-- gain their own rate gate (the member doors' shape, set_listing_pin), placed after the door's
-- permission and step-up gates and before its first write. Each door is redeclared whole from its
-- live definition (ethio-prod, 2026-10-28 23:05 UTC) with one inserted gate line. Headers and ACLs
-- unchanged: plpgsql, VOLATILE, SECURITY DEFINER, search_path public; authenticated, service_role.
-- The dials (declared in src/lib/dials.ts, countedBy "door"):
--   import_audit   600 / 3600  — about two events per import; a real staff day runs dozens.
--   legal_accept    60 / 3600  — a person accepts the few documents in force, once each.
--   photo_remove   100 / 86400 — equal to the route's own day dial; the door is the last line.
--   impersonation   30 / 86400 — 15-minute sessions, one at a time; far beyond a support shift.
--   legal_export    60 / 3600  — first pages only (the audited write).
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES
  ('import_audit', 600, 3600),
  ('legal_accept', 60, 3600),
  ('photo_remove', 100, 86400),
  ('impersonation', 30, 86400),
  ('legal_export', 60, 3600);

CREATE OR REPLACE FUNCTION public.import_gate_audit(p_family text, p_event text, p_batch uuid, p_counts jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_actor uuid := auth.uid();
  v_resource text;
  v_verb text;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'permission denied: not signed in' USING ERRCODE = '42501';
  END IF;
  IF coalesce(p_family, '') = '' OR p_event NOT IN ('preview', 'commit', 'undo', 'refused') THEN
    RAISE EXCEPTION 'import: unknown gate event' USING ERRCODE = '22023';
  END IF;
  SELECT f.resource, f.verb INTO v_resource, v_verb
    FROM (VALUES ('attributes', 'categories', 'import'),
                 ('categories', 'categories', 'import'),
                 ('locations', 'locations', 'import'),
                 ('translations', 'translations', 'update')) AS f(family, resource, verb)
   WHERE f.family = p_family;
  IF v_resource IS NULL OR NOT public.has_permission(v_actor, v_resource, v_verb) THEN
    RAISE EXCEPTION 'permission denied: import %', p_family USING ERRCODE = '42501';
  END IF;
  -- INC-951 — the door's own hourly ceiling (dial import_audit).
  IF NOT coalesce((public.rate_gate('import_audit')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta)
  VALUES (
    v_actor,
    'import.' || p_event,
    'import:' || p_family,
    p_batch,
    public.import_sanitize(coalesce(p_counts, '{}'::jsonb))
  );
END;
$function$;
REVOKE ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean, p_data_consent boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_method  text;
  v_home    char(2);
  v_vid     uuid;
  v_v       public.legal_versions%ROWTYPE;
  v_privacy boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  PERFORM public.assert_caller_active();
  -- INC-951 — one call counts once, however many documents it accepts (dial legal_accept).
  IF NOT coalesce((public.rate_gate('legal_accept')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'emptyList';
  END IF;
  IF p_adult IS DISTINCT FROM true AND NOT EXISTS (
       SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.adult_confirmed) THEN
    RAISE EXCEPTION 'adultRequired';
  END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  v_method := coalesce(
    auth.jwt() -> 'app_metadata' ->> 'provider',
    (auth.jwt() -> 'amr' -> 0 ->> 'method'),
    'unknown');
  SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid;
  FOREACH v_vid IN ARRAY p_version_ids LOOP
    SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = v_vid;
    IF NOT FOUND OR v_v.status <> 'published' OR v_v.effective_at > now() THEN
      RAISE EXCEPTION 'notInForce';
    END IF;
    IF EXISTS (SELECT 1 FROM public.legal_documents d
                WHERE d.id = v_v.document_id
                  AND d.country_code IS NOT NULL
                  AND d.country_code IS DISTINCT FROM v_home) THEN
      RAISE EXCEPTION 'notApplicable';
    END IF;
    SELECT (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$') INTO v_privacy
      FROM public.legal_documents d WHERE d.id = v_v.document_id;
    INSERT INTO public.legal_acceptances
      (user_id, version_id, language, method, adult_confirmed, home_country_code, data_consent)
    VALUES (v_uid, v_vid, CASE WHEN p_language IN ('en', 'am') OR EXISTS (SELECT 1 FROM public.legal_version_texts t WHERE t.version_id = v_vid AND t.language = p_language) THEN p_language ELSE 'en' END, v_method, p_adult IS TRUE, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$function$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.remove_listing_photo(p_listing_id uuid, p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_next uuid; v_status text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  PERFORM public.assert_caller_active();
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  -- INC-951 — the door's last line behind the route's own dials (dial photo_remove).
  IF NOT coalesce((public.rate_gate('photo_remove')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_photo_id AND listing_id = p_listing_id;
  -- D154 B5 (bundle 13 turn 10) — a photo the seller removes from a live ad is listed for staff.
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id;
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id)
    VALUES (p_listing_id, 'removed', p_photo_id);
  END IF;
  SELECT id INTO v_next FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, v_next), updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'removed', p_photo_id, 'cover_photo_id', v_next);
END $function$;
REVOKE ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.begin_impersonation(p_target uuid, p_reason text)
 RETURNS TABLE(session_id uuid, expires_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_reason text; v_id uuid; v_expires timestamptz;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'impersonation is super-admin only';
  END IF;
  IF p_target = auth.uid() THEN RAISE EXCEPTION 'cannot impersonate yourself'; END IF;
  IF public.is_super_admin(p_target) THEN RAISE EXCEPTION 'cannot impersonate a super admin'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_target) THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  v_reason := btrim(COALESCE(p_reason, ''));
  IF length(v_reason) < 5 THEN RAISE EXCEPTION 'a reason of at least 5 characters is required'; END IF;

  IF EXISTS (SELECT 1 FROM public.impersonation_sessions s
              WHERE s.actor_id = auth.uid() AND s.ended_at IS NULL AND s.expires_at > now()) THEN
    RAISE EXCEPTION 'an impersonation session is already active';
  END IF;

  PERFORM public.require_step_up_if_needed('impersonation', 'use');
  -- INC-951 — a ceiling far beyond a support shift (dial impersonation).
  IF NOT coalesce((public.rate_gate('impersonation')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  v_expires := now() + interval '15 minutes';
  INSERT INTO public.impersonation_sessions (actor_id, target_id, reason, expires_at)
  VALUES (auth.uid(), p_target, v_reason, v_expires)
  RETURNING id INTO v_id;

  PERFORM public.log_audit('impersonation.start', 'impersonation_sessions', v_id::text,
    jsonb_build_object('actor', auth.uid(), 'target', p_target, 'reason', v_reason,
                       'expires_at', v_expires));

  RETURN QUERY SELECT v_id, v_expires;
END $function$;
REVOKE ALL ON FUNCTION public.begin_impersonation(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.begin_impersonation(uuid, text) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_export_legal_acceptances(p_version_id uuid, p_after_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_after_id uuid DEFAULT NULL::uuid, p_limit integer DEFAULT 1000)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_version integer;
  v_kind    text;
  v_country char(2);
  v_rows    jsonb;
  v_count   integer;
  v_last_at timestamptz;
  v_last_id uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'export') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'export');
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 5000 THEN RAISE EXCEPTION 'badValue:limit'; END IF;
  IF (p_after_at IS NULL) <> (p_after_id IS NULL) THEN RAISE EXCEPTION 'badValue:after'; END IF;
  SELECT v.version, d.kind, d.country_code INTO v_version, v_kind, v_country
    FROM public.legal_versions v
    JOIN public.legal_documents d ON d.id = v.document_id
   WHERE v.id = p_version_id AND v.status = 'published';
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'account_id', p.user_id,
           'accepted_at', p.accepted_at,
           'language', p.language,
           'method', p.method,
           'home_country', p.home_country_code,
           'adult_confirmed', p.adult_confirmed,
           'data_consent', p.data_consent) ORDER BY p.accepted_at, p.id), '[]'::jsonb),
         count(*)
    INTO v_rows, v_count
    FROM (SELECT a.id, a.user_id, a.accepted_at, a.language, a.method, a.home_country_code,
                 a.adult_confirmed, a.data_consent
            FROM public.legal_acceptances a
           WHERE a.version_id = p_version_id
             AND (p_after_at IS NULL OR (a.accepted_at, a.id) > (p_after_at, p_after_id))
           ORDER BY a.accepted_at, a.id
           LIMIT p_limit) p;
  SELECT a.accepted_at, a.id INTO v_last_at, v_last_id
    FROM public.legal_acceptances a
   WHERE a.version_id = p_version_id
     AND (p_after_at IS NULL OR (a.accepted_at, a.id) > (p_after_at, p_after_id))
   ORDER BY a.accepted_at, a.id
   OFFSET greatest(v_count - 1, 0) LIMIT 1;
  IF p_after_at IS NULL THEN
    -- INC-951 — only the first page writes, so only the first page counts (dial legal_export).
    IF NOT coalesce((public.rate_gate('legal_export')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'legal.acceptances_exported', 'legal_version', p_version_id::text,
            jsonb_build_object('kind', v_kind, 'country', v_country, 'version', v_version));
  END IF;
  RETURN jsonb_build_object(
    'version', v_version,
    'kind', v_kind,
    'country_code', v_country,
    'rows', v_rows,
    'next', CASE WHEN v_count = p_limit THEN jsonb_build_object('at', v_last_at, 'id', v_last_id) END);
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamp with time zone, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamp with time zone, uuid, integer) TO authenticated, service_role;

-- PROOF (INC-951 3a): scratch rows only, rolled back by the sentinel. For each door, with the
-- scratch caller's override at 1: call 1 writes its row; call 2 raises rateLimited and writes none.
DO $proof$
DECLARE
  v_uid     uuid := gen_random_uuid();
  v_target  uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_cat     uuid;
  v_lst     uuid;
  v_p1      uuid;
  v_p2      uuid;
  v_va      uuid;
  v_vb      uuid;
  v_n       integer;
  v_msg     text;
  v_sig     text;
BEGIN
  FOREACH v_sig IN ARRAY ARRAY['public.import_gate_audit(text,text,uuid,jsonb)',
                               'public.accept_legal(uuid[],text,boolean,boolean)',
                               'public.remove_listing_photo(uuid,uuid)',
                               'public.begin_impersonation(uuid,text)',
                               'public.admin_export_legal_acceptances(uuid,timestamptz,uuid,integer)'] LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_sig, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'INC-951 3a proof: ACL of % differs', v_sig;
    END IF;
    IF (SELECT p.provolatile::text || p.prosecdef::text || p.proconfig::text FROM pg_proc p
         WHERE p.oid = v_sig::regprocedure) <> 'vtrue{search_path=public}' THEN
      RAISE EXCEPTION 'INC-951 3a proof: header of % differs', v_sig;
    END IF;
  END LOOP;
  BEGIN
    SELECT v.id INTO v_va FROM public.legal_versions v JOIN public.legal_documents d ON d.id = v.document_id
     WHERE v.status = 'published' AND v.effective_at <= now() AND d.country_code IS NULL
     ORDER BY v.id LIMIT 1;
    SELECT v.id INTO v_vb FROM public.legal_versions v JOIN public.legal_documents d ON d.id = v.document_id
     WHERE v.status = 'published' AND v.effective_at <= now() AND d.country_code IS NULL AND v.id <> v_va
     ORDER BY v.id LIMIT 1;
    IF v_va IS NULL OR v_vb IS NULL THEN RAISE EXCEPTION 'INC-951 3a proof: two versions in force are needed'; END IF;

    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_uid, 'e2e-d1-m4-' || v_uid || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_target, 'e2e-d1-m4-' || v_target || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_target) THEN
      RAISE EXCEPTION 'INC-951 3a proof: the scratch target has no profile';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_uid, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_uid, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret)
    VALUES (gen_random_uuid(), v_uid, 'd1-m4-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES
      (v_uid, 'import_audit', 1), (v_uid, 'legal_accept', 1), (v_uid, 'photo_remove', 1),
      (v_uid, 'impersonation', 1), (v_uid, 'legal_export', 1);
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E D1 M4 Leaf', 'e2e-d1-m4-' || substr(v_uid::text, 1, 8), true, true, true, 9999)
    RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_uid, v_cat, 'E2E D1 M4 listing', 'scratch',
            (SELECT k.code FROM public.countries k ORDER BY k.code LIMIT 1))
    RETURNING id INTO v_lst;
    INSERT INTO public.listing_photos (listing_id, storage_path, display_order)
    VALUES (v_lst, 'e2e-d1-m4/' || v_lst || '/1.webp', 0) RETURNING id INTO v_p1;
    INSERT INTO public.listing_photos (listing_id, storage_path, display_order)
    VALUES (v_lst, 'e2e-d1-m4/' || v_lst || '/2.webp', 1) RETURNING id INTO v_p2;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_uid::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text,
                        'amr', json_build_array(json_build_object('method', 'totp')))::text, true);

    -- (1) import_gate_audit
    PERFORM public.import_gate_audit('categories', 'preview', gen_random_uuid(), '{}'::jsonb);
    v_msg := NULL;
    BEGIN
      PERFORM public.import_gate_audit('categories', 'preview', gen_random_uuid(), '{}'::jsonb);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'import.preview';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (import_gate_audit): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (2) accept_legal
    PERFORM public.accept_legal(ARRAY[v_va], 'en', true, false);
    v_msg := NULL;
    BEGIN
      PERFORM public.accept_legal(ARRAY[v_vb], 'en', true, false);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.legal_acceptances WHERE user_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029040000');
