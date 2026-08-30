-- U4c — REVISION CAPTURE. Every writer records what it is about to overwrite.
-- Declared-mark law (DEC-022 / INC-094): the mark below is the ledger entry.
-- Definer law (INC-074): every re-declared function restates its REVOKE/GRANT.

-- ---------------------------------------------------------------------------
-- A. ui_translation_revisions — append-only history, deny-all to clients.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ui_translation_revisions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key          text NOT NULL,
  lang_code    text NOT NULL,
  prev_value   text,
  prev_status  text,
  prev_machine boolean NOT NULL DEFAULT false,
  action       text NOT NULL,
  changed_by   uuid,
  changed_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ui_translation_revisions_key_lang_idx
  ON public.ui_translation_revisions (key, lang_code, changed_at DESC);

-- GRANTS: no client role may reach this table. The reading UI is U4e and will
-- arrive as a gated SECURITY DEFINER read; E2E reads through service_role.
REVOKE ALL ON TABLE public.ui_translation_revisions FROM PUBLIC;
REVOKE ALL ON TABLE public.ui_translation_revisions FROM anon;
REVOKE ALL ON TABLE public.ui_translation_revisions FROM authenticated;
GRANT ALL ON TABLE public.ui_translation_revisions TO service_role;

ALTER TABLE public.ui_translation_revisions ENABLE ROW LEVEL SECURITY;

-- Deny-all: an explicit, self-describing policy rather than "no policy at all",
-- so the intent survives a future reader of this file.
DROP POLICY IF EXISTS "revisions are not client-readable" ON public.ui_translation_revisions;
CREATE POLICY "revisions are not client-readable"
  ON public.ui_translation_revisions
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- B. Writers re-declared: capture the prior row BEFORE mutating.
-- ---------------------------------------------------------------------------

-- Human edit.
CREATE OR REPLACE FUNCTION public.admin_save_translation(p_key text, p_lang text, p_value text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base    text;
  v_src     text;
  v_want    text[];
  v_got     text[];
  v_flag    boolean := false;
  v_note    text := NULL;
  v_prev    public.ui_translations%ROWTYPE;
  v_had     boolean := false;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'update');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown translation key';
  END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' ||
              array_to_string(v_want, '}, {') || '}';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  v_had := FOUND;

  -- U4c revision capture: a prior VALUE, or a status that this write changes.
  IF v_had AND (v_prev.value IS NOT NULL OR v_prev.status IS DISTINCT FROM 'edited') THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), 'save', auth.uid());
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'edited', false, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'edited', machine = false,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.save', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'save',
                       'machine', false, 'flagged', v_flag,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $$;
REVOKE ALL ON FUNCTION public.admin_save_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_translation(text, text, text) TO authenticated;

-- Machine write — the SINGLE writer the U4c edge function calls.
CREATE OR REPLACE FUNCTION public.admin_machine_translation(p_key text, p_lang text, p_value text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_base text; v_src text; v_want text[]; v_got text[];
  v_flag boolean := false; v_note text := NULL;
  v_prev public.ui_translations%ROWTYPE;
  v_had  boolean := false;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'machine') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'machine');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;

  SELECT l.code INTO v_base FROM public.languages l WHERE l.is_base LIMIT 1;
  IF p_lang = v_base THEN
    RAISE EXCEPTION 'base language rows are sync-owned';
  END IF;

  SELECT t.value INTO v_src
    FROM public.ui_translations t WHERE t.key = p_key AND t.lang_code = v_base;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown translation key'; END IF;

  v_want := public.translation_placeholders(v_src);
  v_got  := public.translation_placeholders(p_value);
  IF v_want IS DISTINCT FROM v_got THEN
    v_flag := true;
    v_note := 'placeholder mismatch: expected {' || array_to_string(v_want, '}, {') || '}';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  v_had := FOUND;

  IF v_had AND (v_prev.value IS NOT NULL OR v_prev.status IS DISTINCT FROM 'machine') THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), 'machine', auth.uid());
  END IF;

  INSERT INTO public.ui_translations (key, lang_code, value, status, machine,
                                      flagged, flag_note, updated_by, updated_at)
  VALUES (p_key, p_lang, p_value, 'machine', true, v_flag, v_note, auth.uid(), now())
  ON CONFLICT (key, lang_code) DO UPDATE
    SET value = EXCLUDED.value, status = 'machine', machine = true,
        flagged = EXCLUDED.flagged, flag_note = EXCLUDED.flag_note,
        updated_by = auth.uid(), updated_at = now();

  PERFORM public.log_audit('translation.machine', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', 'machine',
                       'machine', true, 'flagged', v_flag,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(p_value, ''), 200)));
END $$;
REVOKE ALL ON FUNCTION public.admin_machine_translation(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_machine_translation(text, text, text) TO authenticated;

-- Approve / clear.
CREATE OR REPLACE FUNCTION public.admin_set_translation_status(p_key text, p_lang text, p_action text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_prev public.ui_translations%ROWTYPE;
  v_new  text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'translations', 'approve') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('translations', 'approve');
  IF NOT public.translation_scope_ok(p_lang) THEN
    RAISE EXCEPTION 'not assigned to this language';
  END IF;
  IF p_action NOT IN ('approve', 'clear') THEN
    RAISE EXCEPTION 'unknown translation action';
  END IF;

  SELECT * INTO v_prev FROM public.ui_translations
   WHERE key = p_key AND lang_code = p_lang;
  IF NOT FOUND THEN RAISE EXCEPTION 'translation row not found'; END IF;

  IF v_prev.value IS NOT NULL
     OR v_prev.status IS DISTINCT FROM (CASE WHEN p_action = 'approve' THEN 'approved' ELSE 'untranslated' END) THEN
    INSERT INTO public.ui_translation_revisions
      (key, lang_code, prev_value, prev_status, prev_machine, action, changed_by)
    VALUES (p_key, p_lang, v_prev.value, v_prev.status,
            COALESCE(v_prev.machine, false), p_action, auth.uid());
  END IF;

  IF p_action = 'approve' THEN
    UPDATE public.ui_translations
       SET status = 'approved', approved_by = auth.uid(), approved_at = now(),
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
    v_new := v_prev.value;
  ELSE
    UPDATE public.ui_translations
       SET status = 'untranslated', value = NULL, machine = false,
           flagged = false, flag_note = NULL,
           approved_by = NULL, approved_at = NULL,
           updated_by = auth.uid(), updated_at = now()
     WHERE key = p_key AND lang_code = p_lang;
    v_new := NULL;
  END IF;
  IF NOT FOUND THEN RAISE EXCEPTION 'translation row not found'; END IF;

  PERFORM public.log_audit('translation.status', 'ui_translations', p_key,
    jsonb_build_object('key', p_key, 'lang', p_lang, 'action', p_action, 'machine', false,
                       'old_value', left(COALESCE(v_prev.value, ''), 200),
                       'new_value', left(COALESCE(v_new, ''), 200)));
END $$;
REVOKE ALL ON FUNCTION public.admin_set_translation_status(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_translation_status(text, text, text) TO authenticated;

-- ---------------------------------------------------------------------------
-- C. PROOFS — dynamic principals, scratch rows, cleaned up, fail loudly.
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v_base    uuid;
  v_role    uuid;
  v_session uuid := gen_random_uuid();
  v_factor  uuid := gen_random_uuid();
  can_write boolean := true;
  n         bigint;
  v_rev     public.ui_translation_revisions%ROWTYPE;
  k_plain   text := 'u4c.proof.plain';
BEGIN
  SELECT ur.user_id INTO v_base FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'user' AND NOT public.is_super_admin(ur.user_id) LIMIT 1;
  IF v_base IS NULL THEN
    RAISE EXCEPTION 'U4c PROOFS FAILED: no dynamic principal available';
  END IF;

  INSERT INTO public.roles (name, display_name, description, is_system, priority)
  VALUES ('u4c-proof-translator', 'U4c proof', 'scratch', false, 10)
  RETURNING id INTO v_role;
  INSERT INTO public.role_permissions (role_id, permission_id, is_core)
  SELECT v_role, p.id, false FROM public.permissions p
    JOIN public.resources res ON res.id = p.resource_id
   WHERE res.name = 'translations' AND p.action IN ('view', 'update', 'approve', 'machine');
  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  VALUES (v_base, v_role, 'global');
  INSERT INTO public.translator_languages (user_id, lang_code) VALUES (v_base, 'am')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.ui_translations (key, lang_code, value, status)
  VALUES (k_plain, 'en', 'Hello there', 'approved')
  ON CONFLICT (key, lang_code) DO NOTHING;
  INSERT INTO public.ui_translations (key, lang_code, status)
  VALUES (k_plain, 'am', 'untranslated')
  ON CONFLICT (key, lang_code) DO NOTHING;

  BEGIN
    INSERT INTO auth.sessions(id, user_id, created_at, updated_at, aal)
    VALUES (v_session, v_base, now(), now(), 'aal2');
    INSERT INTO auth.mfa_factors(id, user_id, friendly_name, factor_type, status,
                                 created_at, updated_at, secret)
    VALUES (v_factor, v_base, 'u4c-proof', 'totp', 'verified', now(), now(), 'PROOFSECRET');
    INSERT INTO auth.mfa_amr_claims(id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_session, now(), now(), 'totp');
  EXCEPTION WHEN others THEN
    can_write := false;
  END;

  IF NOT can_write THEN
    RAISE NOTICE 'P1..P3 DEFERRED: auth.* is not writable here; covered by U4c E2E TR-11..13';
  ELSE
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_base::text, 'role', 'authenticated', 'aal', 'aal2',
                        'session_id', v_session::text)::text, true);

    -- P1: save -> save captures EXACTLY ONE revision, holding the FIRST value.
    PERFORM public.admin_save_translation(k_plain, 'am', 'የመጀመሪያ');
    PERFORM public.admin_save_translation(k_plain, 'am', 'ሁለተኛ');
    SELECT count(*) INTO n FROM public.ui_translation_revisions
     WHERE key = k_plain AND lang_code = 'am' AND action = 'save' AND prev_value IS NOT NULL;
    IF n <> 1 THEN
      RAISE EXCEPTION 'P1 FAILED: expected 1 value-carrying save revision, got %', n;
    END IF;
    SELECT * INTO v_rev FROM public.ui_translation_revisions
     WHERE key = k_plain AND lang_code = 'am' AND action = 'save' AND prev_value IS NOT NULL;
    IF v_rev.prev_value <> 'የመጀመሪያ' THEN
      RAISE EXCEPTION 'P1 FAILED: revision carries % not the first value', v_rev.prev_value;
    END IF;
    RAISE NOTICE 'P1 PASS: save->save captured one revision carrying the first value';

    -- P2: machine over an EDITED row captures the edited value.
    PERFORM public.admin_machine_translation(k_plain, 'am', 'ማሽን');
    SELECT * INTO v_rev FROM public.ui_translation_revisions
     WHERE key = k_plain AND lang_code = 'am' AND action = 'machine'
     ORDER BY changed_at DESC LIMIT 1;
    IF v_rev.prev_value <> 'ሁለተኛ' OR v_rev.prev_status <> 'edited' OR v_rev.prev_machine THEN
      RAISE EXCEPTION 'P2 FAILED: machine revision = (%, %, %)',
        v_rev.prev_value, v_rev.prev_status, v_rev.prev_machine;
    END IF;
    RAISE NOTICE 'P2 PASS: machine-over-edited captured the human value';

    -- P3: clear captures value AND status.
    PERFORM public.admin_set_translation_status(k_plain, 'am', 'clear');
    SELECT * INTO v_rev FROM public.ui_translation_revisions
     WHERE key = k_plain AND lang_code = 'am' AND action = 'clear'
     ORDER BY changed_at DESC LIMIT 1;
    IF v_rev.prev_value <> 'ማሽን' OR v_rev.prev_status <> 'machine' OR NOT v_rev.prev_machine THEN
      RAISE EXCEPTION 'P3 FAILED: clear revision = (%, %, %)',
        v_rev.prev_value, v_rev.prev_status, v_rev.prev_machine;
    END IF;
    RAISE NOTICE 'P3 PASS: clear captured value + status + machine provenance';

    PERFORM set_config('request.jwt.claims', NULL, true);
  END IF;

  -- Cleanup (scratch rows never survive the migration).
  DELETE FROM public.ui_translation_revisions WHERE key = k_plain;
  DELETE FROM public.ui_translations WHERE key = k_plain;
  DELETE FROM public.translator_languages WHERE user_id = v_base AND lang_code = 'am';
  DELETE FROM public.user_roles WHERE role_id = v_role;
  DELETE FROM public.role_permissions WHERE role_id = v_role;
  DELETE FROM public.roles WHERE id = v_role;
  IF can_write THEN
    DELETE FROM auth.mfa_amr_claims WHERE session_id = v_session;
    DELETE FROM auth.sessions WHERE id = v_session;
    DELETE FROM auth.mfa_factors WHERE id = v_factor;
  END IF;
  RAISE NOTICE 'PROOF cleanup OK';
END
$proof$;

-- P4: the revision table is unreachable by anon/authenticated (ACL read-back).
DO $acl$
DECLARE
  v_anon boolean;
  v_auth boolean;
  v_rls  boolean;
BEGIN
  SELECT has_table_privilege('anon', 'public.ui_translation_revisions', 'SELECT') INTO v_anon;
  SELECT has_table_privilege('authenticated', 'public.ui_translation_revisions', 'SELECT') INTO v_auth;
  SELECT relrowsecurity INTO v_rls FROM pg_class
   WHERE oid = 'public.ui_translation_revisions'::regclass;
  IF v_anon OR v_auth THEN
    RAISE EXCEPTION 'P4 FAILED: revisions readable (anon=%, authenticated=%)', v_anon, v_auth;
  END IF;
  IF NOT v_rls THEN
    RAISE EXCEPTION 'P4 FAILED: RLS not enabled on ui_translation_revisions';
  END IF;
  RAISE NOTICE 'P4 PASS: revisions deny-all (anon=%, authenticated=%, rls=%)', v_anon, v_auth, v_rls;
END
$acl$;

INSERT INTO public.migration_marks(version) VALUES ('20260830060000') ON CONFLICT DO NOTHING;