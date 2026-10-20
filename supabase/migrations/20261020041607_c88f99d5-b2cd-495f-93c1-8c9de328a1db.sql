-- Bundle 22 turn 12 — M12 (mark 20261020200000): one acceptance tick (DEC-206) and the export of
-- acceptances (D226). my_legal_status says whether the caller has ever confirmed 18 or older;
-- accept_legal asks the 18+ statement only until it is confirmed once and no longer asks a separate
-- storage consent; the permission legal:export (with step-up) and the door admin_export_legal_acceptances.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020120000') THEN
    RAISE EXCEPTION 'bundle 22 turn 9 M9 (mark 20261020120000) must be applied first';
  END IF;
END $$;

-- ===== 1 — my_legal_status: each row also carries adult_confirmed =====
-- Re-declared whole from its definition at M2; the one change is the key adult_confirmed (true when any
-- acceptance of the caller confirmed 18 or older), so that the screen asks the 18+ statement only once.
CREATE OR REPLACE FUNCTION public.my_legal_status(p_kinds text[] DEFAULT ARRAY['terms','privacy'])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_adult boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  v_adult := EXISTS (SELECT 1 FROM public.legal_acceptances a
                      WHERE a.user_id = v_uid AND a.adult_confirmed);
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'kind', x.kind,
             'country_code', x.country_code,
             'version_id', x.version_id,
             'version', x.version,
             'label', x.label,
             'material', x.material,
             'effective_at', x.effective_at,
             'adult_confirmed', v_adult)
           ORDER BY x.kind, x.country_code NULLS FIRST)
      FROM (
        -- the version in force of each document that applies to the caller: one row per document
        SELECT DISTINCT ON (d.id)
               d.id AS document_id, d.kind, d.country_code,
               v.id AS version_id, v.version, v.label, v.material, v.effective_at
          FROM public.legal_documents d
          JOIN public.legal_versions v ON v.document_id = d.id
         WHERE d.kind = ANY (p_kinds)
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.country_code IS NULL
                OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid))
         ORDER BY d.id, v.version DESC
      ) x
     WHERE NOT EXISTS (
       -- accepted: a version at or above the newest material version in force (or version 1)
       SELECT 1
         FROM public.legal_acceptances a
         JOIN public.legal_versions va ON va.id = a.version_id
        WHERE a.user_id = v_uid
          AND va.document_id = x.document_id
          AND va.version >= (
                SELECT max(v3.version) FROM public.legal_versions v3
                 WHERE v3.document_id = x.document_id
                   AND v3.status = 'published'
                   AND v3.effective_at <= now()
                   AND (v3.material OR v3.version = 1)))), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_status(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_status(text[]) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_status(text[]) TO service_role;

-- ===== 2a — the 18+ flag records what was asked this time =====
-- The statement is asked once (DEC-206): a later acceptance records false when it was not asked again.
-- accept_legal refuses every acceptance that has no confirmation, now or earlier, so the check moves
-- into the door. No row changes: every existing row is true.
ALTER TABLE public.legal_acceptances DROP CONSTRAINT IF EXISTS legal_acceptances_adult_check;

-- ===== 2 — accept_legal: 18+ once, no separate storage consent (DEC-206) =====
-- Re-declared whole from its definition at M3a (same arguments, same default). Two changes: the 18+
-- statement is required only while the caller has no acceptance that confirmed it, and its row records
-- whether it was given this time; a Privacy Policy version no longer needs the storage consent (the Terms
-- state the storage). The consent flag is still recorded on a privacy row when a caller sends it.
CREATE OR REPLACE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean,
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
    VALUES (v_uid, v_vid, p_language, v_method, p_adult IS TRUE, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO service_role;

-- ===== 3 — the permission legal:export (with step-up); granted to no role =====
INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, 'export', 'Export who accepted a legal version (account id, date, language, home country)', true, true
  FROM public.resources r
 WHERE r.name = 'legal'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p WHERE p.resource_id = r.id AND p.action = 'export');

-- ===== 4 — admin_export_legal_acceptances: one page of a published version's acceptances =====
-- legal:export with step-up. Minimal columns (D226): the account id, the time, the language, the sign-in
-- method, the home country, and the two statements' flags; never a name or an e-mail. Pages run by
-- (accepted_at, id); the first page writes one audit line.
CREATE OR REPLACE FUNCTION public.admin_export_legal_acceptances(p_version_id uuid,
                                                                 p_after_at timestamptz DEFAULT NULL,
                                                                 p_after_id uuid DEFAULT NULL,
                                                                 p_limit integer DEFAULT 1000)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;
REVOKE ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamptz, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamptz, uuid, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_legal_acceptances(uuid, timestamptz, uuid, integer) TO service_role;

-- ===== 5 — proofs, with no caller (G39): every door refuses a missing caller; the permission exists with
-- step-up; headers and grants as declared. Row behaviour is proven by e2e tests on scratch rows.
DO $$
DECLARE
  v_msg text;
  v_r   record;
BEGIN
  BEGIN
    PERFORM public.my_legal_status(ARRAY['terms']);
    RAISE EXCEPTION 'proof: my_legal_status answered without a caller';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof: my_legal_status said %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.accept_legal(ARRAY[gen_random_uuid()], 'en', true);
    RAISE EXCEPTION 'proof: accept_legal answered without a caller';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof: accept_legal said %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.admin_export_legal_acceptances(gen_random_uuid());
    RAISE EXCEPTION 'proof: the export answered without a caller';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof: the export said %', v_msg; END IF;
  END;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'legal_acceptances_adult_check') THEN
    RAISE EXCEPTION 'proof: the 18+ check is still on the table';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'legal' AND p.action = 'export' AND p.requires_step_up) THEN
    RAISE EXCEPTION 'proof: legal:export with step-up is missing';
  END IF;
  FOR v_r IN
    SELECT p.oid, p.proname, p.provolatile, p.prosecdef, p.proconfig
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.proname IN ('my_legal_status', 'accept_legal', 'admin_export_legal_acceptances')
  LOOP
    IF NOT v_r.prosecdef OR v_r.proconfig IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof: % headers changed', v_r.proname;
    END IF;
    IF (v_r.proname = 'my_legal_status' AND v_r.provolatile <> 's')
       OR (v_r.proname <> 'my_legal_status' AND v_r.provolatile <> 'v') THEN
      RAISE EXCEPTION 'proof: % volatility changed', v_r.proname;
    END IF;
    IF has_function_privilege('anon', v_r.oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof: anon can run %', v_r.proname;
    END IF;
    IF NOT has_function_privilege('authenticated', v_r.oid, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof: authenticated cannot run %', v_r.proname;
    END IF;
  END LOOP;
  IF (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public'
         AND p.proname IN ('my_legal_status', 'accept_legal', 'admin_export_legal_acceptances')) <> 3 THEN
    RAISE EXCEPTION 'proof: a door has a second overload';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020200000') ON CONFLICT DO NOTHING;
