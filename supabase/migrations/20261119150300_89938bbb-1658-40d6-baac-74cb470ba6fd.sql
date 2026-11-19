-- e2e-areas: legal, settings, auth

-- Foundations 1, turn F1-7a, part 4 of 10 — THE LEGAL READERS ON THE GATE (DEC-333; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md, decisions 4 and 5).
-- Three signed-in readers — my_legal_history, my_legal_status, my_legal_version — call door_context('reader') first
-- and read the caller from the gate's record; `not authenticated` becomes notSignedIn and my_legal_version's
-- `notYours` sentence becomes the code notYours. The two public legal readers — legal_in_force, legal_scheduled —
-- call door_context('public') first, read the caller from the gate's record, and refuse a signed-in-only kind to a
-- signed-out caller with the gate's code notSignedIn instead of `permission denied` (42501). Each is redeclared whole
-- from its last declaration, byte for byte apart from those lines and CREATE OR REPLACE; grants restated as they
-- stand (the signed-in three: authenticated and the service role; the public two: anon, authenticated, service role).

DO $pre$
DECLARE
  v_md5  text;
  v_fn   text;
  v_want text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119170200') THEN
    RAISE EXCEPTION 'F1-7a part 4: the mark 20261119170200 must be applied first';
  END IF;
  FOR v_fn, v_want IN VALUES
      ('public.my_legal_history()', '3903d96295286e083e84a045475a53b7'),
      ('public.my_legal_status(text[])', '6310784b019a6f57f6596e199d0349ad'),
      ('public.my_legal_version(uuid)', '47d5a78440bfa5f51399153e3d06db11'),
      ('public.legal_in_force(text,character)', 'ff27d5272e924e6a26131189b87e4ce1'),
      ('public.legal_scheduled(text,character)', '3973a5a0c000ac502cb327142b8a05bc') LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_fn::regprocedure;
    IF v_md5 IS DISTINCT FROM v_want THEN
      RAISE EXCEPTION 'F1-7a part 4: the live % is not its last declaration''s body (%)', v_fn, v_md5;
    END IF;
  END LOOP;
END $pre$;

-- The live definitions before the redeclarations: the proof runs them as pg_temp copies beside the new bodies.
CREATE TEMP TABLE f17a_p4_before ON COMMIT DROP AS
SELECT p.proname::text AS name, pg_get_functiondef(p.oid) AS def
  FROM pg_proc p
 WHERE p.oid = ANY (ARRAY[
   'public.my_legal_history()'::regprocedure,
   'public.my_legal_status(text[])'::regprocedure,
   'public.my_legal_version(uuid)'::regprocedure,
   'public.legal_in_force(text,character)'::regprocedure,
   'public.legal_scheduled(text,character)'::regprocedure]);

-- ------------------------------------------------------------ 1. my_legal_history
CREATE OR REPLACE FUNCTION public.my_legal_history()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
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

-- ------------------------------------------------------------ 2. my_legal_status
CREATE OR REPLACE FUNCTION public.my_legal_status(p_kinds text[] DEFAULT ARRAY['terms','privacy'])
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ctx   public.door_ctx := public.door_context('reader');
  v_uid   uuid := v_ctx.uid;
  v_adult boolean;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
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

-- ------------------------------------------------------------ 3. my_legal_version
CREATE OR REPLACE FUNCTION public.my_legal_version(p_version_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx public.door_ctx := public.door_context('reader');
  v_uid uuid := v_ctx.uid;
  v_v   public.legal_versions%ROWTYPE;
  v_d   public.legal_documents%ROWTYPE;
  v_ok  boolean;
BEGIN
  IF v_uid IS NULL THEN PERFORM public.door_refuse('notSignedIn'); END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND OR v_v.status <> 'published' THEN PERFORM public.door_refuse('notYours'); END IF;
  SELECT * INTO v_d FROM public.legal_documents d WHERE d.id = v_v.document_id;
  v_ok := v_v.effective_at <= now()
    OR EXISTS (SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.version_id = v_v.id)
    OR EXISTS (SELECT 1 FROM public.legal_notices n WHERE n.user_id = v_uid AND n.version_id = v_v.id);
  IF NOT v_ok THEN PERFORM public.door_refuse('notYours'); END IF;
  RETURN jsonb_build_object(
    'version_id', v_v.id,
    'kind', v_d.kind,
    'country_code', v_d.country_code,
    'version', v_v.version,
    'label', v_v.label,
    'body_en', v_v.body_en,
    'body_am', v_v.body_am,
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v_v.id),
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'settings_snapshot', v_v.settings_snapshot);
END;
$function$;
REVOKE ALL ON FUNCTION public.my_legal_version(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_version(uuid) TO service_role;

-- ------------------------------------------------------------ 4. legal_in_force
CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx public.door_ctx := public.door_context('public');
BEGIN
  IF public.legal_kind_signed_in_only(p_kind) AND v_ctx.uid IS NULL THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v.id),
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
$function$;
REVOKE ALL ON FUNCTION public.legal_in_force(text, character) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_in_force(text, character) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_in_force(text, character) TO service_role;

-- ------------------------------------------------------------ 5. legal_scheduled
CREATE OR REPLACE FUNCTION public.legal_scheduled(p_kind text, p_country character DEFAULT NULL::bpchar)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx public.door_ctx := public.door_context('public');
BEGIN
  IF public.legal_kind_signed_in_only(p_kind) AND v_ctx.uid IS NULL THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'texts', (SELECT coalesce(jsonb_object_agg(t.language, t.body ORDER BY t.language), '{}'::jsonb) FROM public.legal_version_texts t WHERE t.version_id = v.id),
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
$function$;
REVOKE ALL ON FUNCTION public.legal_scheduled(text, character) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_scheduled(text, character) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_scheduled(text, character) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) each body is the redeclared one, STABLE SECURITY DEFINER with search_path public, with its grants;
--   (b) on scratch legal rows (a public scratch kind with a version in force and one scheduled, a signed-in-only
--       scratch kind in force, the person's acceptance), each reader's answer equals the old body's on the same
--       rows — the person's reads, and the public two signed out — and the browser role reads the same;
--   (c) the exact refusals: signed out → notSignedIn (the signed-in three, and the signed-in-only kind of the public
--       two); a deactivated caller → accountDeactivated (all five); a version not yet in force for another person,
--       and an unknown id → notYours; another person's history never carries the acceptance;
--   (d) the cost: 200 calls of each reader, old and new medians as a NOTICE; a new median over 5 ms fails (ruling 7's
--       bar, F1-1).
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_kind    text;
  v_kind_si text;
  v_a       uuid := gen_random_uuid();
  v_b       uuid := gen_random_uuid();
  v_d       uuid := gen_random_uuid();
  v_doc     uuid;
  v_doc_si  uuid;
  v_v1      uuid;
  v_v2      uuid;
  v_vsi     uuid;
  v_r       record;
  v_fn      text;
  v_who     text;
  v_role    text;
  v_call    text;
  v_want    text;
  v_got     text;
  v_st      text;
  v_old     jsonb;
  v_new     jsonb;
  v_as      jsonb;
  v_t0      timestamptz;
  v_old_ms  double precision[];
  v_new_ms  double precision[];
  v_mo      double precision;
  v_mn      double precision;
  i         integer;
  v_msg     text;
BEGIN
  -- (a)
  FOR v_fn, v_want, v_role IN VALUES
      ('public.my_legal_history()', '1651d4dbafa2737b4d2cdd65d16761c0', 'signed-in'),
      ('public.my_legal_status(text[])', '035cf4542feb9617de7758d9ade394d0', 'signed-in'),
      ('public.my_legal_version(uuid)', 'da8c84c9d84f938aab87224b7729aee1', 'signed-in'),
      ('public.legal_in_force(text,character)', '8806354f32212346bc27eb023045c72a', 'public'),
      ('public.legal_scheduled(text,character)', 'f44b2988b992c288512acf3b63b77918', 'public') LOOP
    IF (SELECT md5(replace(prosrc, chr(13), '')) IS DISTINCT FROM v_want
               OR proconfig::text <> '{search_path=public}' OR provolatile <> 's' OR NOT prosecdef
          FROM pg_proc WHERE oid = v_fn::regprocedure)
       OR has_function_privilege('anon', v_fn::regprocedure, 'EXECUTE') IS DISTINCT FROM (v_role = 'public')
       OR NOT has_function_privilege('authenticated', v_fn::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn::regprocedure, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn::regprocedure)) a
                   WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 4 proof (a): % is not the redeclared STABLE DEFINER reader with its grants', v_fn;
    END IF;
  END LOOP;

  BEGIN
    FOR v_r IN SELECT name, def FROM f17a_p4_before LOOP
      EXECUTE regexp_replace(v_r.def, '^CREATE OR REPLACE FUNCTION public\.' || v_r.name || '\(',
                             'CREATE FUNCTION pg_temp.f17a_old_' || v_r.name || '(');
    END LOOP;
    FOR v_r IN SELECT substr(p.proname, 10) AS name, pg_get_function_identity_arguments(p.oid) AS def
                 FROM pg_proc p
                WHERE p.pronamespace = pg_my_temp_schema() AND p.proname LIKE 'f17a\_old\_%' LOOP
      EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def);
    END LOOP;
    IF (SELECT count(*) FROM f17a_p4_before) <> 5 THEN
      RAISE EXCEPTION 'F1-7a part 4 proof: % old definitions captured, not 5', (SELECT count(*) FROM f17a_p4_before);
    END IF;

    v_tag := 'e2e-mig-f17a4-' || v_stem;
    v_kind := 'e2e-mig-f17a4-' || v_stem;
    v_kind_si := 'e2e-pub-f17a4-' || v_stem;
    IF NOT public.legal_kind_signed_in_only(v_kind_si) OR public.legal_kind_signed_in_only(v_kind) THEN
      RAISE EXCEPTION 'F1-7a part 4 proof: the scratch kinds are not one public and one signed-in-only';
    END IF;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_b, v_tag || '-b@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_d, v_tag || '-d@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_d
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_d AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.legal_documents (kind, country_code) VALUES (v_kind, NULL) RETURNING id INTO v_doc;
    INSERT INTO public.legal_documents (kind, country_code) VALUES (v_kind_si, NULL) RETURNING id INTO v_doc_si;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, material,
                                       effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'English one', 'Amharic one', false,
            now() - interval '1 day', now() - interval '1 day', '{}'::jsonb) RETURNING id INTO v_v1;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, material,
                                       effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 2, 'published', 'v2', 'English two', 'Amharic two', true,
            now() + interval '10 days', now(), '{}'::jsonb) RETURNING id INTO v_v2;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, material,
                                       effective_at, published_at, settings_snapshot)
    VALUES (v_doc_si, 1, 'published', 'v1', 'English si', 'Amharic si', false,
            now() - interval '1 day', now() - interval '1 day', '{}'::jsonb) RETURNING id INTO v_vsi;
    INSERT INTO public.legal_acceptances (user_id, version_id, language, method)
    VALUES (v_a, v_v1, public.language_code('base'), 'e2e-mig');

    -- (b) old body beside new, by caller; then the new one through the browser role
    FOR v_who, v_call IN VALUES
        ('a', 'my_legal_history()'),
        ('a', format('my_legal_status(ARRAY[%L, %L])', v_kind, v_kind_si)),
        ('a', format('my_legal_version(%L::uuid)', v_v1)),
        ('a', format('legal_in_force(%L)', v_kind)),
        ('a', format('legal_in_force(%L)', v_kind_si)),
        ('a', format('legal_scheduled(%L)', v_kind)),
        ('out', format('legal_in_force(%L)', v_kind)),
        ('out', format('legal_scheduled(%L)', v_kind)) LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', v_a::text, 'role', 'authenticated')::text END, true);
      EXECUTE 'SELECT to_jsonb(pg_temp.f17a_old_' || v_call || ')' INTO v_old;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      IF v_who = 'out' THEN SET LOCAL ROLE anon; ELSE SET LOCAL ROLE authenticated; END IF;
      EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_as;
      RESET ROLE;
      IF v_new IS DISTINCT FROM v_old OR v_as IS DISTINCT FROM v_new OR v_new IS NULL OR v_new = 'null'::jsonb THEN
        RAISE EXCEPTION 'F1-7a part 4 proof (b): % as % read % before and % after (% as the browser role)',
          v_call, v_who, v_old, v_new, v_as;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    IF public.my_legal_history() -> 'acceptances' -> 0 ->> 'version_id' IS DISTINCT FROM v_v1::text
       OR public.legal_in_force(v_kind) ->> 'version_id' IS DISTINCT FROM v_v1::text
       OR public.legal_scheduled(v_kind) ->> 'version_id' IS DISTINCT FROM v_v2::text
       OR public.legal_in_force(v_kind_si) ->> 'version_id' IS DISTINCT FROM v_vsi::text THEN
      RAISE EXCEPTION 'F1-7a part 4 proof (b): the scratch rows did not reach the reads';
    END IF;

    -- (c) the exact refusals, through the browser role (signed out: anon for the public two)
    FOR v_who, v_call, v_want IN
      SELECT 'out', c.call, 'notSignedIn'
        FROM (VALUES ('my_legal_history()'), (format('my_legal_status(ARRAY[%L])', v_kind)),
                     (format('my_legal_version(%L::uuid)', v_v1)),
                     (format('legal_in_force(%L)', v_kind_si)), (format('legal_scheduled(%L)', v_kind_si))) AS c(call)
      UNION ALL
      SELECT 'deactivated', c.call, 'accountDeactivated'
        FROM (VALUES ('my_legal_history()'), (format('my_legal_status(ARRAY[%L])', v_kind)),
                     (format('my_legal_version(%L::uuid)', v_v1)),
                     (format('legal_in_force(%L)', v_kind)), (format('legal_scheduled(%L)', v_kind))) AS c(call)
      UNION ALL
      SELECT 'other', c.call, 'notYours'
        FROM (VALUES (format('my_legal_version(%L::uuid)', v_v2)),
                     (format('my_legal_version(%L::uuid)', gen_random_uuid()))) AS c(call)
    LOOP
      PERFORM set_config('request.jwt.claims',
        CASE v_who WHEN 'out' THEN '{}'
                   ELSE json_build_object('sub', CASE v_who WHEN 'deactivated' THEN v_d ELSE v_b END::text,
                                          'role', 'authenticated')::text END, true);
      v_got := NULL; v_st := NULL;
      IF v_who = 'out' AND v_call LIKE 'legal_%' THEN SET LOCAL ROLE anon; ELSE SET LOCAL ROLE authenticated; END IF;
      BEGIN
        EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
      EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_got = MESSAGE_TEXT, v_st = RETURNED_SQLSTATE;
      END;
      RESET ROLE;
      IF v_got IS DISTINCT FROM v_want OR v_st IS DISTINCT FROM 'P0D01' THEN
        RAISE EXCEPTION 'F1-7a part 4 proof (c): % as % answered % (%), not %', v_call, v_who,
          coalesce(v_got, 'success'), v_st, v_want;
      END IF;
    END LOOP;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
    IF public.my_legal_history()::text LIKE '%' || v_v1::text || '%' THEN
      RAISE EXCEPTION 'F1-7a part 4 proof (c): another person''s history carried the acceptance';
    END IF;

    -- (d) the cost, the person's reads
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    FOR v_fn, v_call IN VALUES
        ('my_legal_history', 'my_legal_history()'),
        ('my_legal_status', format('my_legal_status(ARRAY[%L, %L])', v_kind, v_kind_si)),
        ('my_legal_version', format('my_legal_version(%L::uuid)', v_v1)),
        ('legal_in_force', format('legal_in_force(%L)', v_kind)),
        ('legal_scheduled', format('legal_scheduled(%L)', v_kind)) LOOP
      v_old_ms := ARRAY[]::double precision[];
      v_new_ms := ARRAY[]::double precision[];
      FOR i IN 1..200 LOOP
        v_t0 := clock_timestamp();
        EXECUTE 'SELECT to_jsonb(pg_temp.f17a_old_' || v_call || ')' INTO v_old;
        v_old_ms := array_append(v_old_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
        v_t0 := clock_timestamp();
        EXECUTE 'SELECT to_jsonb(public.' || v_call || ')' INTO v_new;
        v_new_ms := array_append(v_new_ms, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
      END LOOP;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mo FROM unnest(v_old_ms) AS s;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_mn FROM unnest(v_new_ms) AS s;
      RAISE NOTICE 'F1-7a part 4 cost: % median old % ms, new % ms', v_fn, round(v_mo::numeric, 4), round(v_mn::numeric, 4);
      IF v_mn > 5 THEN
        RAISE EXCEPTION 'F1-7a part 4 proof (d): % takes % ms a call (ruling 7''s bar: 5 ms)', v_fn, round(v_mn::numeric, 3);
      END IF;
    END LOOP;

    RAISE EXCEPTION 'f1-7a-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170300') ON CONFLICT DO NOTHING;
