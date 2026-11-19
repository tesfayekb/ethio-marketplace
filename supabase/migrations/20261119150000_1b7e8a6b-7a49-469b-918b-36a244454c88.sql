-- (no e2e-areas line: the shell serves every door, so every spec area is selected)

-- Foundations 1, turn F1-7a, part 1 of 10 — THE SHELL'S RATE LIMIT (DEC-333; INC-1170, INC-1196; brief
-- docs/governance/briefs/f1-doors-7a.md; ruling docs/governance/briefs/f1-doors-7a-ruling-1.md).
-- door_context's dial refusal now carries the dial's reset time as its detail — rate_gate's own resets_at text, the
-- form the route boundary already answers (src/server/route.ts) — so a door's rateLimited refusal reads
-- `rateLimited:<resets_at>`. door_refused no longer counts the dial again for a rateLimited refusal: the refusal came
-- from the dial itself, whose own count the sub-transaction rolled back, so a refused call over the limit leaves the
-- stored count as it was. Every other refusal after the dial still counts once (INC-844). Both bodies are redeclared
-- whole from their last declarations (20261106051600_8b7c2e41 :39 and :128), byte for byte apart from those two lines.

DO $pre$
DECLARE
  v_md5 text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261119050600') THEN
    RAISE EXCEPTION 'F1-7a part 1: the mark 20261119050600 must be applied first';
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.door_context(text,text,text,text,character,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '5a05ee77766181a4256d5b7efce36c41' THEN
    RAISE EXCEPTION 'F1-7a part 1: the live door_context is not its last declaration''s body (%)', v_md5;
  END IF;
  SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p
   WHERE p.oid = 'public.door_refused(text,text,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '1a94a1b3ad3446749a1d08d9c096df02' THEN
    RAISE EXCEPTION 'F1-7a part 1: the live door_refused is not its last declaration''s body (%)', v_md5;
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. door_context (whole from 20261106051600 :39)
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
REVOKE ALL ON FUNCTION public.door_context(text, text, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_context(text, text, text, text, character, text) TO service_role;

-- ------------------------------------------------------------ 2. door_refused (whole from 20261106051600 :128)
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
  v_status := CASE v_code
                WHEN 'notSignedIn' THEN '401'
                WHEN 'permissionDenied' THEN '403'
                WHEN 'accountDeactivated' THEN '403'
                WHEN 'stepUpRequired' THEN '428'
                WHEN 'rateLimited' THEN '429'
                ELSE '400'
              END;
  PERFORM set_config('response.status', v_status, true);
  RETURN jsonb_build_object(
    'ok', false,
    'code', 'P0D01',
    'message', p_message,
    'details', NULL,
    'hint', NULL,
    'refusals', jsonb_build_array(jsonb_strip_nulls(jsonb_build_object('reason', v_code, 'detail', v_detail))));
END $$;
REVOKE ALL ON FUNCTION public.door_refused(text, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refused(text, text, text) TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) both bodies are the redeclared ones, VOLATILE SECURITY DEFINER with search_path public, closed to browser
--       roles and held by the service role;
--   (b) a scratch door on the shell under the dial 'save', a scratch caller's override at 3: an allowed call counts
--       once; a refusal of another code after the dial counts once (INC-844); the call over the limit refuses
--       rateLimited at 429 with the dial's reset time as its detail — a future instant, rate_gate's resets_at — and
--       leaves the stored count as it was.
DO $proof$
DECLARE
  v_stem    text := translate(substr(md5(gen_random_uuid()::text), 1, 10), '0123456789', 'ghijkmnopr');
  v_tag     text;
  v_user    uuid := gen_random_uuid();
  v_fn      regprocedure;
  v_answer  jsonb;
  v_count   integer;
  v_before  integer;
  v_detail  text;
  v_at      timestamptz;
  v_msg     text;
BEGIN
  -- (a)
  IF (SELECT md5(replace(prosrc, chr(13), '')) FROM pg_proc
       WHERE oid = 'public.door_context(text,text,text,text,character,text)'::regprocedure)
       IS DISTINCT FROM '1136caf7f43e38e4ee9a1852635333f8'
     OR (SELECT md5(replace(prosrc, chr(13), '')) FROM pg_proc WHERE oid = 'public.door_refused(text,text,text)'::regprocedure)
       IS DISTINCT FROM '990719366502e9e9f0e92a62692cb3f8' THEN
    RAISE EXCEPTION 'F1-7a part 1 proof (a): a shell body is not the redeclared one';
  END IF;
  FOREACH v_fn IN ARRAY ARRAY[
      'public.door_context(text,text,text,text,character,text)'::regprocedure,
      'public.door_refused(text,text,text)'::regprocedure] LOOP
    IF (SELECT proconfig::text <> '{search_path=public}' OR provolatile <> 'v' OR NOT prosecdef FROM pg_proc WHERE oid = v_fn)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-7a part 1 proof (a): % is not a closed VOLATILE SECURITY DEFINER with search_path public', v_fn;
    END IF;
  END LOOP;

  BEGIN
    v_tag := 'e2e-mig-f17a1-' || v_stem;
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_user, v_tag || '-user@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_user, 'save', 3);
    CREATE TABLE public.e2e_mig_f17a_rows (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), note text NOT NULL);
    EXECUTE $q$
      CREATE FUNCTION public.e2e_mig_f17a_door(p_refuse boolean)
       RETURNS jsonb LANGUAGE plpgsql VOLATILE SET search_path = public
      AS $sd$
      DECLARE v_ctx public.door_ctx;
      BEGIN
        v_ctx := public.door_context('owner', NULL, NULL, 'save');
        INSERT INTO public.e2e_mig_f17a_rows (note) VALUES ('written before the refusal');
        IF p_refuse THEN PERFORM public.door_refuse('badValue', 'scratch'); END IF;
        RETURN jsonb_build_object('ok', true, 'remaining', v_ctx.dial_remaining);
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        RETURN public.door_refused('e2e_mig_f17a_door', 'save', SQLERRM);
      END $sd$ $q$;
    REVOKE ALL ON FUNCTION public.e2e_mig_f17a_door(boolean) FROM PUBLIC, anon, authenticated;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user::text, 'role', 'authenticated')::text, true);

    -- (b) one allowed call: counted once, one row
    v_answer := public.e2e_mig_f17a_door(false);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_user::text AND action = 'save';
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_count <> 1
       OR (SELECT count(*) FROM public.e2e_mig_f17a_rows) <> 1 THEN
      RAISE EXCEPTION 'F1-7a part 1 proof (b): an allowed call did not count once (% / count %)', v_answer, v_count;
    END IF;
    -- a refusal of another code after the dial: counted once, its row rolled back
    v_answer := public.e2e_mig_f17a_door(true);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_user::text AND action = 'save';
    IF v_answer ->> 'message' IS DISTINCT FROM 'badValue:scratch'
       OR current_setting('response.status', true) IS DISTINCT FROM '400'
       OR v_count <> 2 OR (SELECT count(*) FROM public.e2e_mig_f17a_rows) <> 1 THEN
      RAISE EXCEPTION 'F1-7a part 1 proof (b): a refusal after the dial did not count once (% / count %)', v_answer, v_count;
    END IF;
    -- the third call reaches the override's limit and is allowed
    v_answer := public.e2e_mig_f17a_door(false);
    SELECT coalesce(sum(count), 0)::integer INTO v_before FROM public.rate_limits WHERE key = v_user::text AND action = 'save';
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR v_before <> 3 THEN
      RAISE EXCEPTION 'F1-7a part 1 proof (b): the call at the limit was not allowed and counted (% / count %)', v_answer, v_before;
    END IF;
    -- the fourth is over the limit: rateLimited at 429, its detail the reset time, the stored count unchanged
    v_answer := public.e2e_mig_f17a_door(false);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_user::text AND action = 'save';
    v_detail := v_answer -> 'refusals' -> 0 ->> 'detail';
    BEGIN
      v_at := v_detail::timestamptz;
    EXCEPTION WHEN others THEN
      v_at := NULL;
    END;
    IF v_answer ->> 'message' IS DISTINCT FROM 'rateLimited:' || coalesce(v_detail, '')
       OR v_answer -> 'refusals' -> 0 ->> 'reason' IS DISTINCT FROM 'rateLimited'
       OR current_setting('response.status', true) IS DISTINCT FROM '429'
       OR v_at IS NULL OR v_at <= clock_timestamp()
       OR v_count <> v_before
       OR (SELECT count(*) FROM public.e2e_mig_f17a_rows) <> 2 THEN
      RAISE EXCEPTION 'F1-7a part 1 proof (b): the call over the limit did not refuse rateLimited with a future reset time and leave the count (% / count % for %)', v_answer, v_count, v_before;
    END IF;
    IF (SELECT count FROM public.door_refusals
         WHERE door = 'e2e_mig_f17a_door' AND code = 'rateLimited' AND day = current_date) IS DISTINCT FROM 1 THEN
      RAISE EXCEPTION 'F1-7a part 1 proof (b): the rateLimited refusal was not metered once';
    END IF;
    DROP FUNCTION public.e2e_mig_f17a_door(boolean);
    DROP TABLE public.e2e_mig_f17a_rows;

    RAISE EXCEPTION 'f1-7a-part-1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-7a-part-1-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
  PERFORM set_config('response.status', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261119170000') ON CONFLICT DO NOTHING;
