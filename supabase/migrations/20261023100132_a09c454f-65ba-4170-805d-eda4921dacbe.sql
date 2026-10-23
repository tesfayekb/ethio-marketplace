-- Bundle 22 turn 30 — M20. INC-833 / INC-835 / INC-836 / INC-832; DEC-241 / DEC-242.
--
-- WHY (concern 1, DEC-241): a deactivated account is refused at every signed-in door before anything is read,
-- counted or written (D189). The rule lived in two places (rate_gate and has_permission) and nine doors called
-- neither, so a deactivated account's still-valid access token worked there by direct REST. It is now written
-- once: public.account_is_deactivated(uuid) is the one read, public.assert_caller_active() the one refusal;
-- rate_gate and has_permission call them, and each bypassing door calls the refusal after its sign-in check.
--
-- WHY (concern 2, DEC-242): a credential is removed only after a fresh, server-verified proof of the person who
-- holds it. remove_own_password trusted the client. public.require_recent_password() finds the password sign-in
-- GoTrue recorded for another session of the same account within the window; the door is rate-gated
-- (password_remove), consumes that proof session and writes an audit row.
--
-- Parts: B2 the one read and the one refusal · B3 rate_gate and has_permission call them · B4 the eight doors ·
-- B5 the password (dial, proof, door) · B6 deny-all policies for the two INC-832 tables · B7 the three uncalled
-- doors lose authenticated EXECUTE (INC-836) · B8 proofs and the mark.

-- B2 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
CREATE FUNCTION public.account_is_deactivated(p_user_id uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS (SELECT 1 FROM public.profiles pr WHERE pr.user_id = p_user_id AND pr.account_status = 'deactivated') $$;

CREATE FUNCTION public.assert_caller_active() RETURNS void LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$ DECLARE v_uid uuid := auth.uid(); BEGIN IF v_uid IS NULL THEN RETURN; END IF; IF public.account_is_deactivated(v_uid) THEN RAISE EXCEPTION 'account is deactivated'; END IF; END $$;

COMMENT ON FUNCTION public.account_is_deactivated(uuid) IS
  'DEC-241, D189: the one read of account deactivation; an unknown id is not deactivated.';
COMMENT ON FUNCTION public.assert_caller_active() IS
  'DEC-241, D189: the one refusal of a deactivated caller (''account is deactivated''); no caller passes.';

REVOKE ALL ON FUNCTION public.account_is_deactivated(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.assert_caller_active() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.account_is_deactivated(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.assert_caller_active() TO service_role;

-- B3 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.rate_gate(p_action text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_dial  public.rate_dials%ROWTYPE;
  v_limit integer;
  v_start timestamptz;
  v_count integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('allowed', true, 'remaining', NULL, 'resets_at', NULL);
  END IF;
  -- DEC-241 (bundle 22 turn 30) — the one refusal of a deactivated caller (D189), shared by every signed-in door.
  PERFORM public.assert_caller_active();
  SELECT * INTO v_dial FROM public.rate_dials WHERE action = p_action;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown rate dial: %', p_action;
  END IF;
  SELECT o.max_count INTO v_limit
    FROM public.rate_overrides o
   WHERE o.user_id = v_uid AND o.action = p_action;
  v_limit := coalesce(v_limit, v_dial.max_count);
  v_start := to_timestamp(floor(extract(epoch from clock_timestamp()) / v_dial.window_seconds) * v_dial.window_seconds);

  INSERT INTO public.rate_limits (key, action, window_start, count)
  VALUES (v_uid::text, p_action, v_start, 1)
  ON CONFLICT (key, action, window_start)
  DO UPDATE SET count = public.rate_limits.count + 1
  RETURNING count INTO v_count;

  RETURN jsonb_build_object(
    'allowed', v_count <= v_limit,
    'remaining', greatest(v_limit - v_count, 0),
    'resets_at', v_start + make_interval(secs => v_dial.window_seconds)
  );
END $function$;

REVOKE ALL ON FUNCTION public.rate_gate(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_gate(text) TO service_role;

CREATE OR REPLACE FUNCTION public.has_permission(p_user_id uuid, p_resource text, p_action text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- Bundle 16 turn S3 (D189) — a deactivated account holds no permission: every staff door and every policy that
  -- asks this function answers false for it (a super admin cannot be deactivated — profiles_status_guard).
  SELECT CASE WHEN public.account_is_deactivated(p_user_id) THEN false
              WHEN public.is_super_admin(p_user_id) THEN true ELSE EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
    JOIN public.permissions p ON rp.permission_id = p.id
    JOIN public.resources res ON p.resource_id = res.id
    WHERE ur.user_id = p_user_id AND res.name = p_resource AND p.action = p_action)
  OR EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
    JOIN public.permissions p ON rp.permission_id = p.id
    JOIN public.resources res ON p.resource_id = res.id
    WHERE ur.user_id = p_user_id AND res.name = p_resource AND p.action = 'manage')
  END;
$function$;

REVOKE ALL ON FUNCTION public.has_permission(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO service_role;

-- B4 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_cover_photo(p_listing_id uuid, p_photo_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid();
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
  -- D154: the cover is the first photo. Pass 1 moves every photo of this listing out of the way (-1 minus its
  -- place); pass 2 puts the chosen photo at 0 and the others behind it in their old order.
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  UPDATE public.listing_photos AS p SET display_order = o.place
    FROM (SELECT x.id,
                 (row_number() OVER (ORDER BY (x.id = p_photo_id) DESC, x.display_order DESC) - 1)::integer AS place
            FROM public.listing_photos x
           WHERE x.listing_id = p_listing_id) AS o
   WHERE p.id = o.id AND p.listing_id = p_listing_id;
  UPDATE public.listings SET cover_photo_id = p_photo_id, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'cover_photo_id', p_photo_id);
END $function$;

REVOKE ALL ON FUNCTION public.set_cover_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_cover_photo(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_cover_photo(uuid, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.move_listing_photo(p_listing_id uuid, p_photo_id uuid, p_position integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_count integer;
  v_place integer;
  v_cover uuid;
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
  IF p_position IS NULL OR p_position < 0 THEN
    RAISE EXCEPTION 'bad position';
  END IF;
  SELECT count(*)::integer INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  v_place := least(p_position, v_count - 1);
  -- Pass 1: every photo of this listing out of the way (-1 minus its place).
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  -- Pass 2: the others in their old order, closed up around the chosen place; the photo at that place.
  WITH others AS (
    SELECT x.id, (row_number() OVER (ORDER BY x.display_order DESC) - 1)::integer AS i
      FROM public.listing_photos x
     WHERE x.listing_id = p_listing_id AND x.id <> p_photo_id
  ), placed AS (
    SELECT o.id, CASE WHEN o.i >= v_place THEN o.i + 1 ELSE o.i END AS place FROM others o
    UNION ALL
    SELECT p_photo_id, v_place
  )
  UPDATE public.listing_photos AS p SET display_order = placed.place
    FROM placed
   WHERE p.id = placed.id AND p.listing_id = p_listing_id;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id AND display_order = 0;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'position', v_place, 'cover_photo_id', v_cover);
END $function$;

REVOKE ALL ON FUNCTION public.move_listing_photo(uuid, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO service_role;

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
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO service_role;

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
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO service_role;

CREATE OR REPLACE FUNCTION public.clear_seller_place()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  PERFORM public.assert_caller_active();
  DELETE FROM public.seller_places WHERE user_id = v_uid;
  RETURN jsonb_build_object('ok', true);
END $function$;

REVOKE ALL ON FUNCTION public.clear_seller_place() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clear_seller_place() TO authenticated;
GRANT EXECUTE ON FUNCTION public.clear_seller_place() TO service_role;

CREATE OR REPLACE FUNCTION public.unsave_listing(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_count bigint;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  PERFORM public.assert_caller_active();
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- Any ad the caller saved may be unsaved, public or not (the Saved page's Remove on a grey card).
  SELECT l.id INTO v_id FROM public.listings l WHERE l.public_id = p_public_id;
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  DELETE FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', false, 'count', v_count);
END $function$;

REVOKE ALL ON FUNCTION public.unsave_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.unsave_listing(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unsave_listing(text) TO service_role;

CREATE OR REPLACE FUNCTION public.user_set_preferred_language(p_code text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_prev text;
BEGIN
  -- GATE 1 — identity.
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  PERFORM public.assert_caller_active();

  -- GATE 2 — publication: base or enabled_public only (U4f gate, server-side).
  IF p_code IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.languages l
     WHERE l.code = p_code AND (l.is_base OR l.enabled_public)
  ) THEN
    RAISE EXCEPTION 'language not published';
  END IF;

  -- CAPTURE (old value) before MUTATE.
  SELECT pr.preferred_language INTO v_prev
    FROM public.profiles pr WHERE pr.user_id = v_uid;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no profile row';
  END IF;

  -- MUTATE — own row only.
  UPDATE public.profiles pr
     SET preferred_language = p_code, updated_at = now()
   WHERE pr.user_id = v_uid;

  PERFORM public.log_audit('profile.preferred_language', 'profiles', v_uid::text,
    jsonb_build_object('old', v_prev, 'new', p_code));

  RETURN p_code;
END $function$;

REVOKE ALL ON FUNCTION public.user_set_preferred_language(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_preferred_language(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_set_preferred_language(text) TO service_role;

-- end_impersonation has no separate sign-in check in its live body (its lookup is scoped to actor_id =
-- auth.uid()); the one call is therefore its first statement.
CREATE OR REPLACE FUNCTION public.end_impersonation(p_session uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_row public.impersonation_sessions%ROWTYPE;
BEGIN
  PERFORM public.assert_caller_active();
  SELECT * INTO v_row FROM public.impersonation_sessions
   WHERE id = p_session AND actor_id = auth.uid() AND ended_at IS NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'no active impersonation session'; END IF;

  UPDATE public.impersonation_sessions
     SET ended_at = now(), ended_reason = 'manual'
   WHERE id = p_session;

  PERFORM public.log_audit('impersonation.end', 'impersonation_sessions', p_session::text,
    jsonb_build_object('actor', v_row.actor_id, 'target', v_row.target_id, 'reason', 'manual'));
END $function$;

REVOKE ALL ON FUNCTION public.end_impersonation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.end_impersonation(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.end_impersonation(uuid) TO service_role;

-- B5 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('password_remove', 5, 3600) ON CONFLICT (action) DO NOTHING;

CREATE FUNCTION public.require_recent_password(p_window interval DEFAULT interval '5 minutes')
 RETURNS uuid
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_session uuid;
  v_proof   uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  BEGIN
    v_session := NULLIF(auth.jwt() ->> 'session_id', '')::uuid;
  EXCEPTION WHEN others THEN
    v_session := NULL;
  END;
  SELECT s.id INTO v_proof
    FROM auth.sessions s
    JOIN auth.mfa_amr_claims c ON c.session_id = s.id
   WHERE s.user_id = v_uid
     AND s.id IS DISTINCT FROM v_session
     AND c.authentication_method = 'password'
     AND c.updated_at > now() - p_window
   ORDER BY c.updated_at DESC
   LIMIT 1;
  IF v_proof IS NULL THEN
    RAISE EXCEPTION 'recent sign-in required' USING ERRCODE = 'P0009', HINT = 'Sign in with the password again and retry.';
  END IF;
  RETURN v_proof;
END $function$;

COMMENT ON FUNCTION public.require_recent_password(interval) IS
  'DEC-242 — the proof is the password sign-in GoTrue recorded for another session of the same account within the window; the door that consumes it deletes that session.';

REVOKE ALL ON FUNCTION public.require_recent_password(interval) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.require_recent_password(interval) TO service_role;

CREATE OR REPLACE FUNCTION public.remove_own_password()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_gate  jsonb;
  v_proof uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  PERFORM public.assert_caller_active();
  v_gate := public.rate_gate('password_remove');
  IF NOT (v_gate ->> 'allowed')::boolean THEN RAISE EXCEPTION 'rateLimited'; END IF;
  v_proof := public.require_recent_password();

  IF NOT EXISTS (
    SELECT 1 FROM auth.identities
     WHERE user_id = auth.uid() AND provider <> 'email'
  ) THEN
    RAISE EXCEPTION 'last sign-in method: removing the password would leave no way in';
  END IF;

  UPDATE auth.users
     SET encrypted_password = NULL, updated_at = now()
   WHERE id = auth.uid();

  DELETE FROM auth.sessions WHERE id = v_proof AND user_id = auth.uid();

  PERFORM public.log_audit('account.password_removed', 'auth.users', auth.uid()::text,
    jsonb_build_object('proof', 'password', 'dial', 'password_remove'));
END;
$function$;

COMMENT ON FUNCTION public.remove_own_password() IS
  'P1-g truth model (R2): removes the CALLER''s password. Refuses unless a non-email identity remains (last-method rule). The INC-024 AFTER DELETE trigger on auth.identities remains the remove-direction guard for the identity path. DEC-242: requires a password sign-in of another session of the same account within 5 minutes (require_recent_password), is rate-gated (password_remove), consumes that proof session and is audited.';

REVOKE ALL ON FUNCTION public.remove_own_password() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_own_password() TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_own_password() TO service_role;

-- B6 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
-- INC-832: the two server-only tables of 20261015110000 get the deny-all policies the guard skipped.
CREATE POLICY blocked_email_domains_no_client ON public.blocked_email_domains
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY rate_limits_prune_runs_no_client ON public.rate_limits_prune_runs
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- B7 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
-- INC-836: three doors with no caller in the app lose authenticated EXECUTE; no DROP (the Foundations doors part
-- retires the bodies). Existing service_role grants are untouched.
REVOKE EXECUTE ON FUNCTION public.delete_draft(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.confirm_home_country(character) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.promote_to_super_admin(uuid) FROM authenticated;

-- B8 ─────────────────────────────────────────────────────────────────────────────────────────────────────────
DO $proof$
DECLARE
  v_fn     text;
  v_def    text;
  v_n      integer;
  v_raised boolean;
  v_gate   jsonb;
  v_before bigint;
  v_after  bigint;
BEGIN
  -- The two new functions and the proof exist, are definer with search_path public and closed to browser roles.
  FOREACH v_fn IN ARRAY ARRAY['public.account_is_deactivated(uuid)', 'public.assert_caller_active()',
                              'public.require_recent_password(interval)'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = v_fn::regprocedure AND p.prosecdef
                     AND p.proconfig @> ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'M20 proof: % is not security definer with search_path public', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'M20 proof: % is executable by a browser role', v_fn;
    END IF;
  END LOOP;

  IF public.account_is_deactivated(gen_random_uuid()) THEN
    RAISE EXCEPTION 'M20 proof: an unknown id reads as deactivated';
  END IF;

  PERFORM public.assert_caller_active();  -- no caller: returns

  v_raised := false;
  BEGIN
    PERFORM public.require_recent_password();
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'not authenticated' THEN
      RAISE EXCEPTION 'M20 proof: require_recent_password without a caller raised %', SQLERRM;
    END IF;
    v_raised := true;
  END;
  IF NOT v_raised THEN
    RAISE EXCEPTION 'M20 proof: require_recent_password without a caller did not raise';
  END IF;

  FOREACH v_fn IN ARRAY ARRAY['public.rate_gate(text)', 'public.set_cover_photo(uuid,uuid)',
                              'public.move_listing_photo(uuid,uuid,integer)', 'public.remove_listing_photo(uuid,uuid)',
                              'public.accept_legal(uuid[],text,boolean,boolean)', 'public.clear_seller_place()',
                              'public.unsave_listing(text)', 'public.user_set_preferred_language(text)',
                              'public.end_impersonation(uuid)'] LOOP
    v_def := pg_get_functiondef(v_fn::regprocedure);
    v_n := (length(v_def) - length(replace(v_def, 'assert_caller_active(', ''))) / length('assert_caller_active(');
    IF v_n <> 1 THEN
      RAISE EXCEPTION 'M20 proof: % names assert_caller_active( % times', v_fn, v_n;
    END IF;
  END LOOP;

  IF position('account_is_deactivated(' IN pg_get_functiondef('public.has_permission(uuid,text,text)'::regprocedure)) = 0 THEN
    RAISE EXCEPTION 'M20 proof: has_permission does not call account_is_deactivated';
  END IF;

  v_def := pg_get_functiondef('public.remove_own_password()'::regprocedure);
  IF position('rate_gate(' IN v_def) = 0 OR position('require_recent_password(' IN v_def) = 0
     OR position('log_audit(' IN v_def) = 0 THEN
    RAISE EXCEPTION 'M20 proof: remove_own_password lacks its gate, proof or audit';
  END IF;

  -- INC-836: no browser role may execute the three uncalled doors; delete_draft keeps its service_role grant.
  -- (confirm_home_country and promote_to_super_admin held no service_role grant before M20 — live ACL read in
  -- B0 — and gain none here.)
  FOREACH v_fn IN ARRAY ARRAY['public.delete_draft(uuid)', 'public.confirm_home_country(character)',
                              'public.promote_to_super_admin(uuid)'] LOOP
    IF has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'M20 proof: % is still executable by authenticated', v_fn;
    END IF;
  END LOOP;
  IF NOT has_function_privilege('service_role', 'public.delete_draft(uuid)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'M20 proof: delete_draft lost its service_role grant';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blocked_email_domains'
                   AND policyname = 'blocked_email_domains_no_client')
     OR NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'rate_limits_prune_runs'
                   AND policyname = 'rate_limits_prune_runs_no_client') THEN
    RAISE EXCEPTION 'M20 proof: an INC-832 deny-all policy is missing';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'password_remove') THEN
    RAISE EXCEPTION 'M20 proof: the password_remove dial is missing';
  END IF;

  SELECT count(*) INTO v_before FROM public.rate_limits WHERE action = 'password_remove';
  v_gate := public.rate_gate('password_remove');
  SELECT count(*) INTO v_after FROM public.rate_limits WHERE action = 'password_remove';
  IF NOT (v_gate ->> 'allowed')::boolean OR v_after <> v_before THEN
    RAISE EXCEPTION 'M20 proof: rate_gate with no session refused or counted';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261023150000') ON CONFLICT DO NOTHING;