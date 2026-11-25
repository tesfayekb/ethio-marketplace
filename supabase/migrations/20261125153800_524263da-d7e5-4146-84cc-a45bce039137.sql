-- (no e2e-areas line: the account's language save runs at every sign-in, so every spec area is selected)

-- Cursor bundle 7a, Part 5, file E of five — A WRITE THAT CHANGES NOTHING WRITES NOTHING (INC-1290; brief
-- docs/governance/briefs/cursor-bundle-7a.md, ruling docs/governance/briefs/cursor-bundle-7a-ruling-1.md decision 5).
-- user_set_preferred_language is redeclared WHOLE from 20261106051900 :86, byte for byte but for three things: the profile row
-- is read FOR UPDATE (a repeat of the same request waits for the first), a request whose value equals the stored one answers
-- {ok:true, language} at once with NO update and NO audit row, and the comments say so. The dial account_pref is still spent
-- first, by door_context, as before: the call was made, and the dial bounds calls (decision 5). The publication gate, the
-- refusals (languageNotPublished, noProfile), the shell and the answer's shape are unchanged. Signature, header and grants as
-- they stand (CREATE OR REPLACE keeps them; the closers are restated). The census of the other own-row setters is in the stop
-- report: only this one audits an unchanged value.
-- Proofs on a scratch user under a sentinel rollback. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261125170300') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file E: the mark 20261125170300 (file D) must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5
    FROM pg_proc p WHERE p.oid = 'public.user_set_preferred_language(text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '864c44ac6a9021e8a3f6c1d44401a250' THEN
    RAISE EXCEPTION 'cursor-bundle-7a file E: the live user_set_preferred_language is not the body this file was built from (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ user_set_preferred_language (whole)
CREATE OR REPLACE FUNCTION public.user_set_preferred_language(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ctx  public.door_ctx;
  v_prev text;
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'account_pref');
  -- GATE 2 — publication: base or enabled_public only (U4f gate, server-side).
  IF p_code IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.languages l
     WHERE l.code = p_code AND (l.is_base OR l.enabled_public)
  ) THEN
    PERFORM public.door_refuse('languageNotPublished');
  END IF;
  -- CAPTURE (old value) before MUTATE; the row is locked, so a repeat of the same request waits for the first.
  SELECT pr.preferred_language INTO v_prev
    FROM public.profiles pr WHERE pr.user_id = v_ctx.uid
    FOR UPDATE;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('noProfile');
  END IF;
  -- A write that changes nothing writes nothing: no update, no audit row (the dial above is spent: the call was made).
  IF v_prev IS NOT DISTINCT FROM p_code THEN
    RETURN jsonb_build_object('ok', true, 'language', p_code);
  END IF;
  -- MUTATE — own row only.
  UPDATE public.profiles pr
     SET preferred_language = p_code, updated_at = now()
   WHERE pr.user_id = v_ctx.uid;

  PERFORM public.door_audit(v_ctx, 'profile.preferred_language', 'profiles', v_ctx.uid::text,
    to_jsonb(v_prev), to_jsonb(p_code));

  RETURN jsonb_build_object('ok', true, 'language', p_code);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('user_set_preferred_language', 'account_pref', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.user_set_preferred_language(text) IS
  'U4f on the door shell (F1-1, DEC-333): the caller''s own preferred_language behind door_context(owner, account_pref); refuses languageNotPublished / noProfile; reads the profile row FOR UPDATE; an unchanged value answers {ok:true, language} with no update and no audit row (INC-1290; the dial is spent); a changed one audits profile.preferred_language {old, new}; answers {ok:true, language}.';
REVOKE ALL ON FUNCTION public.user_set_preferred_language(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_preferred_language(text) TO authenticated;
GRANT ALL ON FUNCTION public.user_set_preferred_language(text) TO service_role;

-- ------------------------------------------------------------ PROOFS (a scratch user only, rolled back by the sentinel)
--   (a) the catalogue: the body is this file's, the header and grants as they stood;
--   (b) a first save of a value writes one audit row and one new row version; the same save again answers the same body, writes
--       no audit row and no new row version, and spends the dial again; a save to another value (NULL) writes one more audit
--       row; a repeat of that writes none; an unpublished code is still refused and writes nothing.
DO $proof$
DECLARE
  v_hex    text := replace(gen_random_uuid()::text, '-', '');
  v_tag    text;
  v_a      uuid := gen_random_uuid();
  v_lang   text := public.language_code('base');
  v_md5    text;
  v_r1     jsonb;
  v_r2     jsonb;
  v_r3     jsonb;
  v_r4     jsonb;
  v_r5     jsonb;
  v_ctid   text;
  v_ctid2  text;
  v_audits integer;
  v_meter  integer;
  v_msg    text;
BEGIN
  -- (a)
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5
    FROM pg_proc p WHERE p.oid = 'public.user_set_preferred_language(text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '7582ccc35258bca709eb311a6d1da08f'
     OR (SELECT NOT (p.prosecdef AND p.provolatile = 'v' AND p.proconfig::text = '{search_path=public}'
                     AND p.prorettype = 'jsonb'::regtype AND p.prolang = (SELECT oid FROM pg_language WHERE lanname = 'plpgsql'))
           FROM pg_proc p WHERE p.oid = 'public.user_set_preferred_language(text)'::regprocedure)
     OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = 'public.user_set_preferred_language(text)'::regprocedure)) a
                 WHERE a.grantee = 0)
     OR has_function_privilege('anon', 'public.user_set_preferred_language(text)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.user_set_preferred_language(text)'::regprocedure, 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.user_set_preferred_language(text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file E proof (a): the body, header or grants differ from this file (%)', v_md5;
  END IF;

  v_tag := 'e2e-mig-b7ae-' || substr(v_hex, 1, 8);
  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_a, v_tag || '-a@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    UPDATE public.profiles SET preferred_language = NULL WHERE user_id = v_a AND v_tag LIKE 'e2e-mig-%';
    IF NOT FOUND THEN RAISE EXCEPTION 'cursor-bundle-7a file E proof: the scratch user has no profile'; END IF;

    -- (b) 1. a first save of the base language: one audit row, a new row version, the dial spent
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    EXECUTE 'SET LOCAL ROLE authenticated';
    v_r1 := public.user_set_preferred_language(v_lang);
    EXECUTE 'RESET ROLE';
    SELECT count(*) INTO v_audits FROM public.audit_log WHERE actor_id = v_a AND action = 'profile.preferred_language';
    SELECT coalesce(sum(r.count), 0) INTO v_meter FROM public.rate_limits r WHERE r.key = v_a::text AND r.action = 'account_pref';
    SELECT pr.ctid::text INTO v_ctid FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */;
    IF v_r1 IS DISTINCT FROM jsonb_build_object('ok', true, 'language', v_lang) OR v_audits <> 1 OR v_meter <> 1
       OR (SELECT pr.preferred_language FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */) IS DISTINCT FROM v_lang THEN
      RAISE EXCEPTION 'cursor-bundle-7a file E proof (b1): a first save answered % with % audit rows and % meter count', v_r1, v_audits, v_meter;
    END IF;

    -- 2. the same save again: the same answer, no audit row, no new row version, the dial spent again
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    EXECUTE 'SET LOCAL ROLE authenticated';
    v_r2 := public.user_set_preferred_language(v_lang);
    EXECUTE 'RESET ROLE';
    SELECT count(*) INTO v_audits FROM public.audit_log WHERE actor_id = v_a AND action = 'profile.preferred_language';
    SELECT coalesce(sum(r.count), 0) INTO v_meter FROM public.rate_limits r WHERE r.key = v_a::text AND r.action = 'account_pref';
    SELECT pr.ctid::text INTO v_ctid2 FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */;
    IF v_r2 IS DISTINCT FROM v_r1 OR v_audits <> 1 OR v_meter <> 2 OR v_ctid2 IS DISTINCT FROM v_ctid THEN
      RAISE EXCEPTION 'cursor-bundle-7a file E proof (b2): an unchanged save answered % with % audit rows, meter %, row version % -> %',
        v_r2, v_audits, v_meter, v_ctid, v_ctid2;
    END IF;

    -- 3. a save to another value (NULL clears it): one more audit row, a new row version
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    EXECUTE 'SET LOCAL ROLE authenticated';
    v_r3 := public.user_set_preferred_language(NULL);
    EXECUTE 'RESET ROLE';
    SELECT count(*) INTO v_audits FROM public.audit_log WHERE actor_id = v_a AND action = 'profile.preferred_language';
    SELECT coalesce(sum(r.count), 0) INTO v_meter FROM public.rate_limits r WHERE r.key = v_a::text AND r.action = 'account_pref';
    SELECT pr.ctid::text INTO v_ctid2 FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */;
    IF v_r3 IS DISTINCT FROM jsonb_build_object('ok', true, 'language', NULL) OR v_audits <> 2 OR v_meter <> 3
       OR v_ctid2 IS NOT DISTINCT FROM v_ctid
       OR (SELECT pr.preferred_language FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */) IS NOT NULL THEN
      RAISE EXCEPTION 'cursor-bundle-7a file E proof (b3): a changed save answered % with % audit rows, meter %', v_r3, v_audits, v_meter;
    END IF;
    v_ctid := v_ctid2;

    -- 4. the repeat of that: nothing written
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    EXECUTE 'SET LOCAL ROLE authenticated';
    v_r4 := public.user_set_preferred_language(NULL);
    EXECUTE 'RESET ROLE';
    SELECT count(*) INTO v_audits FROM public.audit_log WHERE actor_id = v_a AND action = 'profile.preferred_language';
    SELECT pr.ctid::text INTO v_ctid2 FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */;
    IF v_r4 IS DISTINCT FROM v_r3 OR v_audits <> 2 OR v_ctid2 IS DISTINCT FROM v_ctid THEN
      RAISE EXCEPTION 'cursor-bundle-7a file E proof (b4): an unchanged clear answered % with % audit rows', v_r4, v_audits;
    END IF;

    -- 5. an unpublished code is still refused, and nothing is written
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
    EXECUTE 'SET LOCAL ROLE authenticated';
    v_r5 := public.user_set_preferred_language('zz-' || substr(v_hex, 1, 4));
    EXECUTE 'RESET ROLE';
    SELECT count(*) INTO v_audits FROM public.audit_log WHERE actor_id = v_a AND action = 'profile.preferred_language';
    IF v_r5 ->> 'ok' IS DISTINCT FROM 'false' OR v_r5 ->> 'code' IS DISTINCT FROM 'P0D01'
       OR v_r5::text !~ 'languageNotPublished' OR v_audits <> 2
       OR (SELECT pr.preferred_language FROM public.profiles pr WHERE pr.user_id = v_a /* e2e-mig- scratch user */) IS NOT NULL THEN
      RAISE EXCEPTION 'cursor-bundle-7a file E proof (b5): an unpublished code answered % with % audit rows', v_r5, v_audits;
    END IF;

    RAISE EXCEPTION 'b7a-e-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b7a-e-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261125170400') ON CONFLICT DO NOTHING;
