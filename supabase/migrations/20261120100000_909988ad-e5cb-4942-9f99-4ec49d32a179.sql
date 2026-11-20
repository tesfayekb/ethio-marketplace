-- (no e2e-areas line: the shell and every reader on the gate change their refusal's status, so every spec area is selected)

-- Foundations 1, turn F1-7c, part 1 of 4 — A READER'S REFUSAL ANSWERS ITS CODE'S STATUS (DEC-333; INC-1213; brief
-- docs/governance/briefs/f1-doors-7c.md; census docs/governance/reports/f1-doors-7c.census.md; ruling
-- docs/governance/briefs/f1-doors-7c-ruling-1.md, decisions 2 and 3).
-- * door_refusal_status (new, closed): the one table from a refusal's code to its HTTP status — notSignedIn 401,
--   permissionDenied 403, accountDeactivated 403, stepUpRequired 428, rateLimited 429, otherwise 400 (door_refused's
--   CASE until now, unchanged in value).
-- * door_context marks the outermost call, transaction-locally (`door.outer`), before the service role's return and
--   before any refusal: a call that spends a dial marks 'door' always; a call with none marks 'reader' only when
--   nothing is marked yet.
-- * door_refuse raises a reader's refusal as SQLSTATE PGRST, its message the body PostgREST answers ({code: P0D01,
--   message: code[:detail]}) and its detail the status from the table; a door's refusal (and an unmarked one: a job, a
--   trigger, a migration) keeps P0D01, so every shell's WHEN SQLSTATE 'P0D01' handler is untouched.
-- * door_refused reads its status from the table.
-- door_context and door_refused are redeclared whole from 20261119150000_1b7e8a6b (:32, :97), door_refuse from
-- 20261106051500_6d2f0f3e (:31), each byte for byte apart from the named lines; no door or reader body changes.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.door_context(text,text,text,text,character,text)', '1136caf7f43e38e4ee9a1852635333f8'],
    ['public.door_refused(text,text,text)', '990719366502e9e9f0e92a62692cb3f8'],
    ['public.door_refuse(text,text)', '55f9bf0a6c4c4b2cc57d304df779e7fc']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261120050700') THEN
    RAISE EXCEPTION 'F1-7c part 1: the mark 20261120050700 (F1-7b part 8) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refusal_status(text)') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-7c part 1: door_refusal_status already exists';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-7c part 1: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. door_refusal_status — the one status table (new)
CREATE FUNCTION public.door_refusal_status(p_code text)
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path = public
AS $$
  SELECT CASE p_code
           WHEN 'notSignedIn' THEN '401'
           WHEN 'permissionDenied' THEN '403'
           WHEN 'accountDeactivated' THEN '403'
           WHEN 'stepUpRequired' THEN '428'
           WHEN 'rateLimited' THEN '429'
           ELSE '400'
         END
$$;
COMMENT ON FUNCTION public.door_refusal_status(text) IS
  'F1-7c (DEC-333, INC-1213): the one table from a refusal''s code to its HTTP status — notSignedIn 401, permissionDenied 403, accountDeactivated 403, stepUpRequired 428, rateLimited 429, otherwise 400; read by door_refused (a door''s shell) and door_refuse (a reader''s refusal).';
REVOKE ALL ON FUNCTION public.door_refusal_status(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refusal_status(text) TO service_role;

-- ------------------------------------------------------------ 2. door_context (whole from 20261119150000 :32)
CREATE OR REPLACE FUNCTION public.door_context(p_class text, p_resource text DEFAULT NULL, p_action text DEFAULT NULL, p_dial text DEFAULT NULL, p_country character DEFAULT NULL, p_scope_mode text DEFAULT 'none')
 RETURNS public.door_ctx
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path = public
AS $$
DECLARE
  v_ctx       public.door_ctx;
  v_allowed   boolean;
  v_countries character(2)[];
  v_detail    text;
  v_gate      jsonb;
BEGIN
  IF p_class IS NULL OR p_class NOT IN ('owner', 'staff', 'public', 'reader', 'staff-reader') THEN
    RAISE EXCEPTION 'door_context: unknown class %', coalesce(p_class, 'NULL');
  END IF;
  IF p_class IN ('staff', 'staff-reader') AND (p_resource IS NULL OR p_action IS NULL) THEN
    RAISE EXCEPTION 'door_context: a staff class names its permission';
  END IF;
  IF p_class IN ('reader', 'staff-reader') AND p_dial IS NOT NULL THEN
    RAISE EXCEPTION 'door_context: a reader spends no dial';
  END IF;
  -- F1-7c (INC-1213): the outermost call's kind, for door_refuse. A call that spends a dial is a door, whose shell
  -- reads P0D01, and always marks it; a call with none is a reader and marks it only when nothing is marked yet.
  IF p_dial IS NOT NULL THEN
    PERFORM set_config('door.outer', 'door', true);
  ELSIF coalesce(current_setting('door.outer', true), '') = '' THEN
    PERFORM set_config('door.outer', 'reader', true);
  END IF;
  v_ctx.uid := auth.uid();
  v_ctx.role := auth.role();
  -- A job is not a person: the service role passes every gate and spends no dial.
  IF v_ctx.role = 'service_role' THEN
    RETURN v_ctx;
  END IF;
  -- 1. caller class
  IF v_ctx.uid IS NULL AND p_class <> 'public' THEN
    PERFORM public.door_refuse('notSignedIn');
  END IF;
  -- 2. deactivation (skipped for a signed-out public call: nothing to read)
  IF v_ctx.uid IS NOT NULL AND public.account_is_deactivated(v_ctx.uid) THEN
    PERFORM public.door_refuse('accountDeactivated');
  END IF;
  -- 3. permission with scope, 4. step-up (P0009 kept: the server's 428 and the client's dialog read it)
  IF p_resource IS NOT NULL THEN
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_ctx.uid, p_resource, p_action, p_country, p_scope_mode) s;
    IF NOT coalesce(v_allowed, false) THEN
      PERFORM public.door_refuse('permissionDenied', v_detail);
    END IF;
    v_ctx.countries := v_countries;
    -- a staff reader owes its permission, never a second factor (a read changes nothing)
    IF p_class <> 'staff-reader' THEN
      PERFORM public.require_step_up_if_needed(p_resource, p_action);
    END IF;
  END IF;
  -- 5. dial (rate_gate counts nothing for a signed-out caller)
  IF p_dial IS NOT NULL AND v_ctx.uid IS NOT NULL THEN
    v_gate := public.rate_gate(p_dial);
    v_ctx.dial_remaining := (v_gate ->> 'remaining')::integer;
    v_ctx.resets_at := (v_gate ->> 'resets_at')::timestamptz;
    IF NOT coalesce((v_gate ->> 'allowed')::boolean, false) THEN
      PERFORM public.door_refuse('rateLimited', v_gate ->> 'resets_at');
    END IF;
  END IF;
  RETURN v_ctx;
END $$;
COMMENT ON FUNCTION public.door_context(text, text, text, text, character, text) IS
  'DEC-333: the one gate order every door calls first — caller class → deactivation → permission with scope → step-up → dial; refusals are door_refuse codes (notSignedIn, accountDeactivated, permissionDenied[:scope], rateLimited); step-up keeps P0009. Classes: owner | staff | public | reader | staff-reader. F1-7c: marks the outermost call (door.outer, transaction-local) — door when it spends a dial, reader when it spends none and nothing is marked — for door_refuse.';
REVOKE ALL ON FUNCTION public.door_context(text, text, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_context(text, text, text, text, character, text) TO service_role;

-- ------------------------------------------------------------ 3. door_refuse (whole from 20261106051500 :31)
CREATE OR REPLACE FUNCTION public.door_refuse(p_code text, p_detail text DEFAULT NULL)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SET search_path = public
AS $$
BEGIN
  IF p_code IS NULL OR p_code !~ '^[a-z][A-Za-z]*$' THEN
    RAISE EXCEPTION 'door_refuse: a code is one camelCase word, not %', coalesce(p_code, 'NULL');
  END IF;
  -- F1-7c (INC-1213): a reader has no shell, and PostgREST answers P0D01 at 500. Raised as PGRST, the same body
  -- reaches the caller at its code's status from the one table.
  IF current_setting('door.outer', true) = 'reader' THEN
    RAISE SQLSTATE 'PGRST' USING
      MESSAGE = jsonb_build_object('code', 'P0D01', 'message', p_code || coalesce(':' || p_detail, ''))::text,
      DETAIL = jsonb_build_object('status', public.door_refusal_status(p_code)::integer, 'headers', '{}'::jsonb)::text;
  END IF;
  RAISE EXCEPTION USING ERRCODE = 'P0D01', MESSAGE = p_code || coalesce(':' || p_detail, '');
END $$;
COMMENT ON FUNCTION public.door_refuse(text, text) IS
  'DEC-333: raises SQLSTATE P0D01 with the message code[:detail]; the door shell (door_refused) recognises the class, the clients parse the shape (splitRefusal, doorRefusal, doorCode). F1-7c (INC-1213): when door_context marked the outermost call a reader, raises SQLSTATE PGRST instead — the body {code: P0D01, message: code[:detail]} at the status door_refusal_status gives the code.';
REVOKE ALL ON FUNCTION public.door_refuse(text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refuse(text, text) TO service_role;

-- ------------------------------------------------------------ 4. door_refused (whole from 20261119150000 :97)
CREATE OR REPLACE FUNCTION public.door_refused(p_door text, p_dial text, p_message text)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path = public
AS $$
DECLARE
  v_code   text := split_part(coalesce(p_message, ''), ':', 1);
  v_detail text := nullif(substr(coalesce(p_message, ''), length(split_part(coalesce(p_message, ''), ':', 1)) + 2), '');
  v_status text;
BEGIN
  -- INC-844: the sub-transaction rolled the door's count back with its work; count once more, unless the
  -- refusal came before the dial (a gate code) — then nothing was ever counted.
  IF p_dial IS NOT NULL AND auth.uid() IS NOT NULL
     AND v_code NOT IN ('notSignedIn', 'accountDeactivated', 'permissionDenied', 'stepUpRequired', 'rateLimited') THEN
    PERFORM public.rate_gate(p_dial);
  END IF;
  INSERT INTO public.door_refusals (door, code, day, count)
  VALUES (p_door, v_code, current_date, 1)
  ON CONFLICT (door, code, day) DO UPDATE SET count = public.door_refusals.count + 1;
  v_status := public.door_refusal_status(v_code);
  PERFORM set_config('response.status', v_status, true);
  RETURN jsonb_build_object(
    'ok', false,
    'code', 'P0D01',
    'message', p_message,
    'details', NULL,
    'hint', NULL,
    'refusals', jsonb_build_array(jsonb_strip_nulls(jsonb_build_object('reason', v_code, 'detail', v_detail))));
END $$;
COMMENT ON FUNCTION public.door_refused(text, text, text) IS
  'DEC-333 / INC-844: the door shell''s EXCEPTION WHEN SQLSTATE ''P0D01'' handler — counts the dial again, meters door_refusals, sets response.status from door_refusal_status (401/403/428/429, else 400; F1-7c) and returns the PostgREST error body {ok:false, code:P0D01, message:code[:detail], refusals:[{reason, detail}]} that supabase-js surfaces as error.message.';
REVOKE ALL ON FUNCTION public.door_refused(text, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refused(text, text, text) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the four bodies are this file's, with their headers, closed to browser roles and held by the service role;
--   (b) the table: each named code's status, and 400 for any other;
--   (c) a scratch reader on the gate raises its refusal as PGRST — the message the body {code P0D01, message
--       code[:detail]}, the detail {status, headers} with the table's status — signed in (400, 403, 429 with the
--       instant), signed out (notSignedIn 401) and as the service role (400);
--   (d) a scratch door that calls that reader inside its body answers through its shell: {ok:false, code P0D01} at the
--       table's status, never an escaped PGRST — also when a reader marked the transaction before the door ran;
--   (e) an unmarked refusal (a job, a trigger) raises P0D01 as before.
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_user    uuid := gen_random_uuid();
  v_cases   text[][];
  v_answer  jsonb;
  v_state   text;
  v_msg     text;
  v_detail  text;
  v_at      text;
  i         integer;
BEGIN
  -- (a)
  v_cases := ARRAY[
    ['public.door_refusal_status(text)', '4be1958d30d962ec9e39d956c1a922b8', 's', 'f'],
    ['public.door_context(text,text,text,text,character,text)', 'aa7e8bc66d8a6698a851cc3843c4cabc', 'v', 't'],
    ['public.door_refuse(text,text)', '8c9807e7f9d220ba2693e24a5dd1bb56', 'v', 'f'],
    ['public.door_refused(text,text,text)', 'dcb6ae0125ce2f9da12a33b266171b03', 'v', 't']];
  FOR i IN 1..array_length(v_cases, 1) LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM v_cases[i][2] OR p.provolatile::text <> v_cases[i][3]
               OR p.prosecdef::text <> v_cases[i][4]::boolean::text OR p.proconfig::text <> '{search_path=public}'
          FROM pg_proc p WHERE p.oid = v_cases[i][1]::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_cases[i][1]::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_cases[i][1]::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_cases[i][1]::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_cases[i][1]::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-7c part 1 proof (a): %''s body, header or grants differ', v_cases[i][1];
    END IF;
  END LOOP;

  -- (b)
  v_cases := ARRAY[
    ['notSignedIn', '401'], ['permissionDenied', '403'], ['accountDeactivated', '403'], ['stepUpRequired', '428'],
    ['rateLimited', '429'], ['notYours', '400'], ['badValue', '400']];
  FOR i IN 1..array_length(v_cases, 1) LOOP
    IF public.door_refusal_status(v_cases[i][1]) IS DISTINCT FROM v_cases[i][2] THEN
      RAISE EXCEPTION 'F1-7c part 1 proof (b): % answered %', v_cases[i][1], public.door_refusal_status(v_cases[i][1]);
    END IF;
  END LOOP;

  BEGIN
    v_tag := 'e2e-mig-f17c1-' || v_stem;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_user, v_tag || '-user@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_user, 'save', 50);
    EXECUTE $q$
      CREATE FUNCTION public.e2e_mig_f17c_reader(p_code text, p_detail text)
       RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
      AS $sr$
      BEGIN
        PERFORM public.door_context('reader');
        PERFORM public.door_refuse(p_code, p_detail);
        RETURN '{}'::jsonb;
      END $sr$ $q$;
    EXECUTE $q$
      CREATE FUNCTION public.e2e_mig_f17c_door(p_code text)
       RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public
      AS $sd$
      DECLARE v_ctx public.door_ctx;
      BEGIN
        v_ctx := public.door_context('owner', NULL, NULL, 'save');
        PERFORM public.e2e_mig_f17c_reader(p_code, 'scratch');
        RETURN jsonb_build_object('ok', true);
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        RETURN public.door_refused('e2e_mig_f17c_door', 'save', SQLERRM);
      END $sd$ $q$;
    REVOKE ALL ON FUNCTION public.e2e_mig_f17c_reader(text, text) FROM PUBLIC, anon, authenticated;
    REVOKE ALL ON FUNCTION public.e2e_mig_f17c_door(text) FROM PUBLIC, anon, authenticated;
    PERFORM set_config('door.outer', '', true);

    -- (c) a reader's refusal: signed in, signed out, the service role
    v_at := to_char(clock_timestamp() + interval '1 hour', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');
    v_cases := ARRAY[
      ['authenticated', 'notYours', 'scratch', 'notYours:scratch', '400'],
      ['authenticated', 'permissionDenied', NULL, 'permissionDenied', '403'],
      ['authenticated', 'rateLimited', v_at, 'rateLimited:' || v_at, '429'],
      ['anon', 'notYours', NULL, 'notSignedIn', '401'],
      ['service_role', 'notYours', NULL, 'notYours', '400']];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      PERFORM set_config('request.jwt.claims', CASE v_cases[i][1]
        WHEN 'authenticated' THEN json_build_object('sub', v_user::text, 'role', 'authenticated')::text
        WHEN 'service_role' THEN json_build_object('role', 'service_role')::text
        ELSE json_build_object('role', 'anon')::text END, true);
      v_state := NULL;
      BEGIN
        PERFORM public.e2e_mig_f17c_reader(v_cases[i][2], v_cases[i][3]);
      EXCEPTION WHEN others THEN
        GET STACKED DIAGNOSTICS v_state = RETURNED_SQLSTATE, v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
      END;
      IF v_state IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_cases[i][4])
         OR v_detail::jsonb IS DISTINCT FROM jsonb_build_object('status', v_cases[i][5]::integer, 'headers', '{}'::jsonb) THEN
        RAISE EXCEPTION 'F1-7c part 1 proof (c): the reader''s % (%) raised % / % / %', v_cases[i][2], v_cases[i][1], v_state, v_msg, v_detail;
      END IF;
      IF coalesce(current_setting('door.outer', true), '') <> '' THEN
        RAISE EXCEPTION 'F1-7c part 1 proof (c): the mark outlived the refused call';
      END IF;
    END LOOP;

    -- (d) a door that calls the reader answers through its shell
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user::text, 'role', 'authenticated')::text, true);
    v_cases := ARRAY[['notYours', 'notYours:scratch', '400', ''], ['permissionDenied', 'permissionDenied:scratch', '403', 'reader']];
    FOR i IN 1..array_length(v_cases, 1) LOOP
      PERFORM set_config('door.outer', v_cases[i][4], true);
      PERFORM set_config('response.status', '', true);
      v_answer := public.e2e_mig_f17c_door(v_cases[i][1]);
      IF (v_answer ->> 'ok') IS DISTINCT FROM 'false' OR v_answer ->> 'code' IS DISTINCT FROM 'P0D01'
         OR v_answer ->> 'message' IS DISTINCT FROM v_cases[i][2]
         OR current_setting('response.status', true) IS DISTINCT FROM v_cases[i][3] THEN
        RAISE EXCEPTION 'F1-7c part 1 proof (d): the door over a reader answered % at % (marked %)', v_answer, current_setting('response.status', true), v_cases[i][4];
      END IF;
    END LOOP;

    -- (e) an unmarked refusal keeps P0D01
    PERFORM set_config('door.outer', '', true);
    v_state := NULL;
    BEGIN
      PERFORM public.door_refuse('notYours', 'scratch');
    EXCEPTION WHEN others THEN
      GET STACKED DIAGNOSTICS v_state = RETURNED_SQLSTATE, v_msg = MESSAGE_TEXT;
    END;
    IF v_state IS DISTINCT FROM 'P0D01' OR v_msg IS DISTINCT FROM 'notYours:scratch' THEN
      RAISE EXCEPTION 'F1-7c part 1 proof (e): an unmarked refusal raised % / %', v_state, v_msg;
    END IF;

    DROP FUNCTION public.e2e_mig_f17c_door(text);
    DROP FUNCTION public.e2e_mig_f17c_reader(text, text);
    RAISE EXCEPTION 'f1-7c-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7c-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261120120000') ON CONFLICT DO NOTHING;
