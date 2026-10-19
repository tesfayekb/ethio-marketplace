-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 3 — M3a (part 1 of 2): what the public pages, the acceptance screen and the
-- person's legal history need. Additive; every re-declared door keeps its header and body apart from the
-- named change. Part 2 (M3b) re-declares the settings and publish doors.
--  1. legal_settings gains six facts: operator_details (legal form, where registered, registration
--     number; empty until the operator fills it), legal_phone (empty until filled), security_email, and
--     three periods the texts quote, each 12 months as DEC-130 decided (the operator, 2026-10-19 05:2x
--     local: "12 months (DEC-130 as is)"): listed_ad_keep_months (a sold or expired ad in the seller's own
--     list), account_keep_months (a closed account's identity), technical_keep_months (technical records).
--     The providers fact is no longer shown or sent by the screens; its column stays (dropping it would
--     be destructive) and admin_set_legal_settings still accepts it.
--  2. legal_acceptances gains data_consent: the separate consent to storage in the United States, given
--     with the acceptance of a Privacy Policy version (DEC-204 (b)).
--  3. accept_legal gains p_data_consent (default false): a Privacy Policy version (kind privacy, or a
--     scratch kind ending in -privacy) is refused as consentRequired without it; the consent is recorded
--     on that version's row. The old three-argument door is dropped (its argument list changes).
--  4. legal_in_force and my_legal_version also return the version's settings_snapshot (the facts frozen
--     at publishing), so a reader fills the text's tokens with them.
--  5. legal_scheduled (new; anon and authenticated): the next published version of a document that has
--     not taken effect yet, with its text and frozen facts — the public pages show it ahead of its date.
--  6. my_legal_history and admin_user_legal_history also return data_consent on each acceptance and the
--     version's name on each notice.
-- Gated on M2 v2's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019220000') THEN
    RAISE EXCEPTION 'bundle 22 turn 2 M2 v2 (mark 20261019220000) must be applied first';
  END IF;
END $$;

-- ===== 1 and 2 — the columns =====
ALTER TABLE public.legal_settings
  ADD COLUMN operator_details text NULL
    CONSTRAINT legal_settings_operator_details_check CHECK (operator_details IS NULL OR length(operator_details) <= 2000),
  ADD COLUMN legal_phone text NULL
    CONSTRAINT legal_settings_legal_phone_check CHECK (legal_phone IS NULL OR length(legal_phone) <= 40),
  ADD COLUMN security_email text NOT NULL DEFAULT 'security@ethio.com'
    CONSTRAINT legal_settings_security_email_check CHECK (length(security_email) <= 320),
  ADD COLUMN listed_ad_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_listed_keep_check CHECK (listed_ad_keep_months BETWEEN 1 AND 120),
  ADD COLUMN account_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_account_keep_check CHECK (account_keep_months BETWEEN 1 AND 120),
  ADD COLUMN technical_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_technical_keep_check CHECK (technical_keep_months BETWEEN 1 AND 120);

ALTER TABLE public.legal_acceptances
  ADD COLUMN data_consent boolean NOT NULL DEFAULT false;

-- ===== 3 — accept_legal with the separate storage consent =====
DROP FUNCTION public.accept_legal(uuid[], text, boolean);

-- The caller accepts versions for himself: one row per version, with the language shown, the 18+
-- statement and the sign-in method read from the session token. No IP address is stored. A Privacy
-- Policy version needs the separate consent to storage in the United States (DEC-204 (b)), recorded on
-- its row.
CREATE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean,
                                    p_data_consent boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_method  text;
  v_home    char(2);
  v_vid     uuid;
  v_v       public.legal_versions%ROWTYPE;
  v_privacy boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'emptyList';
  END IF;
  IF p_adult IS DISTINCT FROM true THEN RAISE EXCEPTION 'adultRequired'; END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  IF p_data_consent IS DISTINCT FROM true AND EXISTS (
       SELECT 1 FROM public.legal_versions v
         JOIN public.legal_documents d ON d.id = v.document_id
        WHERE v.id = ANY (p_version_ids)
          AND (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$')) THEN
    RAISE EXCEPTION 'consentRequired';
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
    VALUES (v_uid, v_vid, p_language, v_method, true, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO service_role;

-- ===== 4 — the readers return the frozen facts =====
-- The version in force: the highest published version of the document for this kind and country whose
-- effective time has passed. The change log is never returned. Any kind the caller names is answered,
-- scratch kinds (e2e-...) included: on production none exists (INC-761). The facts frozen at publishing
-- come with it (M3).
CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at,
             'settings_snapshot', v.settings_snapshot)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at <= now()
     ORDER BY v.version DESC
     LIMIT 1);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_in_force(text, char) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_in_force(text, char) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_in_force(text, char) TO service_role;

-- The whole text of a version the caller accepted, was sent a notice for, or that is in force. An
-- accepted version stays readable after newer versions replace it. The change log is never returned.
-- The facts frozen at publishing come with it (M3).
CREATE OR REPLACE FUNCTION public.my_legal_version(p_version_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
  v_d   public.legal_documents%ROWTYPE;
  v_ok  boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND OR v_v.status <> 'published' THEN RAISE EXCEPTION 'notYours'; END IF;
  SELECT * INTO v_d FROM public.legal_documents d WHERE d.id = v_v.document_id;
  v_ok := v_v.effective_at <= now()
    OR EXISTS (SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.version_id = v_v.id)
    OR EXISTS (SELECT 1 FROM public.legal_notices n WHERE n.user_id = v_uid AND n.version_id = v_v.id);
  IF NOT v_ok THEN RAISE EXCEPTION 'notYours'; END IF;
  RETURN jsonb_build_object(
    'version_id', v_v.id,
    'kind', v_d.kind,
    'country_code', v_d.country_code,
    'version', v_v.version,
    'label', v_v.label,
    'body_en', v_v.body_en,
    'body_am', v_v.body_am,
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'settings_snapshot', v_v.settings_snapshot);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_version(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_version(uuid) TO service_role;

-- ===== 5 — legal_scheduled =====
-- The next version of a document that is published but has not taken effect yet: the published version
-- of this kind and country whose effective time is still ahead and comes first. Public, as the version in
-- force is; the change log is never returned.
CREATE FUNCTION public.legal_scheduled(p_kind text, p_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at,
             'settings_snapshot', v.settings_snapshot)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at > now()
     ORDER BY v.effective_at, v.version
     LIMIT 1);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_scheduled(text, char) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_scheduled(text, char) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_scheduled(text, char) TO service_role;

-- ===== 6 — the histories =====
-- The caller's own legal history: his acceptances and the legal e-mails sent to him, newest first.
CREATE OR REPLACE FUNCTION public.my_legal_history()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN jsonb_build_object(
    'acceptances', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', a.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'accepted_at', a.accepted_at,
               'language', a.language,
               'method', a.method,
               'adult_confirmed', a.adult_confirmed,
               'data_consent', a.data_consent)
             ORDER BY a.accepted_at DESC)
        FROM public.legal_acceptances a
        JOIN public.legal_versions v ON v.id = a.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE a.user_id = v_uid), '[]'::jsonb),
    'notices', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', n.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'channel', n.channel,
               'status', n.status,
               'sent_at', n.sent_at)
             ORDER BY n.sent_at DESC)
        FROM public.legal_notices n
        JOIN public.legal_versions v ON v.id = n.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE n.user_id = v_uid), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_history() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_history() TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_history() TO service_role;

-- One person's legal history for staff with profiles:view: his acceptances and the legal e-mails sent to
-- him, newest first.
CREATE OR REPLACE FUNCTION public.admin_user_legal_history(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'profiles', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = p_user_id) THEN
    RAISE EXCEPTION 'unknownUser';
  END IF;
  RETURN jsonb_build_object(
    'acceptances', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', a.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'accepted_at', a.accepted_at,
               'language', a.language,
               'method', a.method,
               'adult_confirmed', a.adult_confirmed,
               'data_consent', a.data_consent)
             ORDER BY a.accepted_at DESC)
        FROM public.legal_acceptances a
        JOIN public.legal_versions v ON v.id = a.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE a.user_id = p_user_id), '[]'::jsonb),
    'notices', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', n.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'channel', n.channel,
               'status', n.status,
               'sent_at', n.sent_at)
             ORDER BY n.sent_at DESC)
        FROM public.legal_notices n
        JOIN public.legal_versions v ON v.id = n.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE n.user_id = p_user_id), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_user_legal_history(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_user_legal_history(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_user_legal_history(uuid) TO service_role;

-- Proofs, with no caller and on scratch rows only (G39; the e2e-mig-m3a- kind is created and rolled back
-- here): the new columns and their defaults; the readers return the frozen facts; legal_scheduled answers
-- the version still ahead; every caller-bound door refuses a missing caller; headers and grants as
-- declared; the three-argument accept_legal is gone. Answers that need a person (the consent rule, the
-- histories) are proven by LG-11 and LG-12.
DO $$
DECLARE
  v_doc  uuid;
  v_ans  jsonb;
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  IF (SELECT column_default FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_settings' AND column_name = 'security_email')
     IS DISTINCT FROM '''security@ethio.com''::text' THEN
    RAISE EXCEPTION 'proof failed: legal_settings.security_email default';
  END IF;
  IF (SELECT count(*) FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_settings'
         AND column_name IN ('operator_details', 'legal_phone') AND is_nullable = 'YES') <> 2 THEN
    RAISE EXCEPTION 'proof failed: operator_details and legal_phone must be nullable';
  END IF;
  IF (SELECT count(*) FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_settings'
         AND column_name IN ('listed_ad_keep_months', 'account_keep_months', 'technical_keep_months')
         AND column_default = '12' AND is_nullable = 'NO') <> 3 THEN
    RAISE EXCEPTION 'proof failed: the three periods must default to 12 and be required';
  END IF;
  IF (SELECT column_default FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_acceptances' AND column_name = 'data_consent')
     IS DISTINCT FROM 'false' THEN
    RAISE EXCEPTION 'proof failed: legal_acceptances.data_consent default';
  END IF;
  BEGIN
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-mig-m3a-proof') RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '2 days', now(),
            '{"legal_email": "one@example.invalid"}'::jsonb),
           (v_doc, 2, 'published', 'v2', 'e', 'a', 'c', true, now() + interval '40 days', now(),
            '{"legal_email": "two@example.invalid"}'::jsonb),
           (v_doc, 3, 'published', 'v3', 'e', 'a', 'c', true, now() + interval '30 days', now(),
            '{"legal_email": "three@example.invalid"}'::jsonb);
    v_ans := public.legal_in_force('e2e-mig-m3a-proof');
    IF v_ans IS NULL OR (v_ans ->> 'version')::int <> 1
       OR v_ans -> 'settings_snapshot' ->> 'legal_email' IS DISTINCT FROM 'one@example.invalid'
       OR v_ans ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_in_force answered %', v_ans;
    END IF;
    v_ans := public.legal_scheduled('e2e-mig-m3a-proof');
    IF v_ans IS NULL OR (v_ans ->> 'version')::int <> 3
       OR v_ans -> 'settings_snapshot' ->> 'legal_email' IS DISTINCT FROM 'three@example.invalid'
       OR v_ans ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_scheduled answered %', v_ans;
    END IF;
    IF public.legal_scheduled('e2e-mig-m3a-proof', 'ET') IS NOT NULL
       OR public.legal_scheduled('e2e-mig-m3a-none') IS NOT NULL THEN
      RAISE EXCEPTION 'proof failed: legal_scheduled answered a document that does not exist';
    END IF;
    RAISE EXCEPTION '__m3a_proof_rollback__';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> '__m3a_proof_rollback__' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.legal_documents WHERE kind LIKE 'e2e-mig-m3a-%') THEN
    RAISE EXCEPTION 'proof failed: the scratch document survived the rollback';
  END IF;
  IF to_regprocedure('public.accept_legal(uuid[], text, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: the three-argument accept_legal still exists';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('accept'), ('version'), ('history'), ('staff_history')) AS t(door) LOOP
    BEGIN
      IF r.door = 'accept' THEN
        PERFORM public.accept_legal(ARRAY[gen_random_uuid()], 'en', true, true);
      ELSIF r.door = 'version' THEN PERFORM public.my_legal_version(gen_random_uuid());
      ELSIF r.door = 'history' THEN PERFORM public.my_legal_history();
      ELSE PERFORM public.admin_user_legal_history(gen_random_uuid());
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.accept_legal(uuid[], text, boolean, boolean)', 'v'::"char", false),
      ('public.legal_in_force(text, character)', 's'::"char", true),
      ('public.my_legal_version(uuid)', 's'::"char", false),
      ('public.legal_scheduled(text, character)', 's'::"char", true),
      ('public.my_legal_history()', 's'::"char", false),
      ('public.admin_user_legal_history(uuid)', 's'::"char", false)) AS t(sig, vol, anon_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok THEN
      RAISE EXCEPTION 'proof failed: % anon EXECUTE is not %', r.sig, r.anon_ok;
    END IF;
    IF NOT has_function_privilege('authenticated', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: authenticated may not execute %', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020020000') ON CONFLICT (version) DO NOTHING;