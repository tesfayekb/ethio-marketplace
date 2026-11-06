-- e2e-areas: auth-caller-gates, door-refusals
-- Foundations 1, turn F1-1, M-F1a part 2 of 6 — THE ONE GATE ORDER AND THE SHELL (DEC-333; plan
-- docs/governance/reports/f1-doors.stop-1.md §3.1, §3.4, §3.5; ruling 1 decisions 2, 5, 9). `door_context` is the one
-- function every door calls first — caller class → deactivation → permission with scope → step-up → dial — every
-- refusal a door_refuse code (part 1), step-up keeping P0009 (the server's 428 and the client's dialog read it);
-- the shell's catch `door_refused` counts the dial AGAIN (INC-844: the plpgsql sub-transaction rolled the first
-- count back with the door's work), meters the refusal in `door_refusals` (born closed, no person column), sets
-- PostgREST's response.status and RETURNS the refusal body — so PostgREST commits the count where a RAISE would
-- roll it back, and supabase-js surfaces the same `code[:detail]` message a RAISE gives; `door_audit` is the one
-- named audit call over log_audit. Proofs on scratch rows under a sentinel rollback: the premise (STEP 2, SQL
-- side) on a planted scratch door the block creates and drops — a returned refusal commits its count and its
-- refusal row and leaves the door's table unchanged; the gates refuse in the law's order; the service role passes;
-- the cost per class (1,000 calls, clock_timestamp, the median as a NOTICE; over 10 ms fails). Law 11, law 12,
-- CF-SQL-1.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261106060100')
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regtype('public.door_ctx') IS NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 2: part 1 (6d2f0f3e) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NOT NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NOT NULL
     OR to_regprocedure('public.door_audit(public.door_ctx,text,text,text,jsonb,jsonb)') IS NOT NULL
     OR to_regclass('public.door_refusals') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 2: a door mechanism object already exists';
  END IF;
  IF to_regprocedure('public.rate_gate(text)') IS NULL
     OR to_regprocedure('public.require_step_up_if_needed(text,text)') IS NULL
     OR to_regprocedure('public.log_audit(text,text,text,jsonb)') IS NULL
     OR to_regprocedure('public.update_updated_at_column()') IS NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 2: a gate door_context composes is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. door_context — the one law order
CREATE FUNCTION public.door_context(p_class text, p_resource text DEFAULT NULL, p_action text DEFAULT NULL, p_dial text DEFAULT NULL, p_country character DEFAULT NULL, p_scope_mode text DEFAULT 'none')
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
      PERFORM public.door_refuse('rateLimited');
    END IF;
  END IF;
  RETURN v_ctx;
END $$;
COMMENT ON FUNCTION public.door_context(text, text, text, text, character, text) IS
  'DEC-333: the one gate order every door calls first — caller class → deactivation → permission with scope → step-up → dial; refusals are door_refuse codes (notSignedIn, accountDeactivated, permissionDenied[:scope], rateLimited); step-up keeps P0009. Classes: owner | staff | public | reader | staff-reader.';
REVOKE ALL ON FUNCTION public.door_context(text, text, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_context(text, text, text, text, character, text) TO service_role;

-- ------------------------------------------------------------ 2. door_refusals — the metered refusals (born closed)
CREATE TABLE public.door_refusals (
  door       text NOT NULL,
  code       text NOT NULL,
  day        date NOT NULL DEFAULT current_date,
  count      integer NOT NULL DEFAULT 0 CHECK (count >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (door, code, day)
);
COMMENT ON TABLE public.door_refusals IS
  'DEC-333: one row per door, refusal code and day, counted by door_refused; read by staff tooling through the service role (ACT-020). No person column.';
REVOKE ALL ON public.door_refusals FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.door_refusals TO service_role;
ALTER TABLE public.door_refusals ENABLE ROW LEVEL SECURITY;
CREATE POLICY door_refusals_no_select ON public.door_refusals FOR SELECT USING (false);
CREATE POLICY door_refusals_no_insert ON public.door_refusals FOR INSERT WITH CHECK (false);
CREATE POLICY door_refusals_no_update ON public.door_refusals FOR UPDATE USING (false) WITH CHECK (false);
CREATE POLICY door_refusals_no_delete ON public.door_refusals FOR DELETE USING (false);
CREATE TRIGGER door_refusals_updated_at BEFORE UPDATE ON public.door_refusals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------ 3. door_refused — the shell's catch
CREATE FUNCTION public.door_refused(p_door text, p_dial text, p_message text)
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
     AND v_code NOT IN ('notSignedIn', 'accountDeactivated', 'permissionDenied', 'stepUpRequired') THEN
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
COMMENT ON FUNCTION public.door_refused(text, text, text) IS
  'DEC-333 / INC-844: the door shell''s EXCEPTION WHEN SQLSTATE ''P0D01'' handler — counts the dial again, meters door_refusals, sets response.status (401/403/428/429, else 400) and returns the PostgREST error body {ok:false, code:P0D01, message:code[:detail], refusals:[{reason, detail}]} that supabase-js surfaces as error.message.';
REVOKE ALL ON FUNCTION public.door_refused(text, text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refused(text, text, text) TO service_role;

-- ------------------------------------------------------------ 4. door_audit — the one named audit call
CREATE FUNCTION public.door_audit(p_ctx public.door_ctx, p_action text, p_entity_type text, p_entity_id text, p_old jsonb DEFAULT NULL, p_new jsonb DEFAULT NULL)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path = public
AS $$
BEGIN
  IF p_ctx.uid IS NULL THEN
    RAISE EXCEPTION 'door_audit: no caller in the context';
  END IF;
  PERFORM public.log_audit(p_action, p_entity_type, p_entity_id,
    jsonb_strip_nulls(jsonb_build_object('old', p_old, 'new', p_new)));
END $$;
COMMENT ON FUNCTION public.door_audit(public.door_ctx, text, text, text, jsonb, jsonb) IS
  'DEC-333: a door''s audit row — the manifest''s audit action, the entity, old and new — over log_audit (actor = the caller).';
REVOKE ALL ON FUNCTION public.door_audit(public.door_ctx, text, text, text, jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_audit(public.door_ctx, text, text, text, jsonb, jsonb) TO service_role;


-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
--     country it passes with countries = {it}; a permission that requires step-up still raises P0009 for a
--     staff door and not for a staff reader (a read owes its permission, not a second factor); the service
--     role passes without a count.
-- (d) the cost: 1,000 calls per class, the median per call as a NOTICE; over 10 ms fails.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-f1a2-' || substr(gen_random_uuid()::text, 1, 8);
  v_code     character(2) := 'XZ';
  v_user     uuid := gen_random_uuid();
  v_deact    uuid := gen_random_uuid();
  v_staff    uuid := gen_random_uuid();
  v_scoped   uuid := gen_random_uuid();
  v_role_g   uuid;
  v_role_c   uuid;
  v_perm     uuid;
  v_res      uuid;
  v_perm_su  uuid;
  v_res_su   uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_res_su_name text := 'e2e_mig_rsu_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_answer   jsonb;
  v_count    integer;
  v_rows     integer;
  v_msg      text;
  v_state    text;
  v_ctx      public.door_ctx;
  v_t0       timestamptz;
  v_samples  double precision[];
  v_median   double precision;
  v_fn       regprocedure;
  v_cls      text;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[
      'public.door_context(text,text,text,text,character,text)'::regprocedure,
      'public.door_refused(text,text,text)'::regprocedure,
      'public.door_audit(public.door_ctx,text,text,text,jsonb,jsonb)'::regprocedure] LOOP
    IF (SELECT proconfig::text <> '{search_path=public}' OR provolatile <> 'v' OR NOT prosecdef FROM pg_proc WHERE oid = v_fn)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (a): % is not a closed VOLATILE SECURITY DEFINER with search_path public', v_fn;
    END IF;
  END LOOP;
  IF has_table_privilege('anon', 'public.door_refusals', 'SELECT')
     OR has_table_privilege('authenticated', 'public.door_refusals', 'SELECT')
     OR has_table_privilege('authenticated', 'public.door_refusals', 'INSERT')
     OR NOT has_table_privilege('service_role', 'public.door_refusals', 'INSERT')
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.door_refusals'::regclass)
     OR (SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'door_refusals') <> 4
     OR NOT EXISTS (SELECT 1 FROM pg_trigger t WHERE t.tgrelid = 'public.door_refusals'::regclass AND NOT t.tgisinternal
                      AND t.tgfoid = 'public.update_updated_at_column()'::regprocedure) THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (a): door_refusals is not born closed';
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_user,   v_tag || '-user@example.invalid',   '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact,  v_tag || '-deact@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_staff,  v_tag || '-staff@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_scoped, v_tag || '-scoped@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    -- the auth.users trigger made the profiles rows; one is deactivated
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    -- a scratch resource with one permission that needs no step-up, and one that does
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'edit', false) RETURNING id INTO v_perm;
    INSERT INTO public.resources (name, description) VALUES (v_res_su_name, v_tag) RETURNING id INTO v_res_su;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res_su, 'edit', true) RETURNING id INTO v_perm_su;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-global', v_tag) RETURNING id INTO v_role_g;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-country', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_g, v_perm), (v_role_g, v_perm_su), (v_role_c, v_perm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_g, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_scoped, v_role_c, 'country', v_code);
    INSERT INTO public.rate_overrides (user_id, action, max_count) VALUES (v_user, 'draft', 3), (v_staff, 'draft', 100000);


    -- (b) the planted scratch door on the shell
    CREATE TABLE public.e2e_mig_door_rows (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), note text NOT NULL);
    EXECUTE $q$
      CREATE FUNCTION public.e2e_mig_door_scratch(p_refuse boolean)
       RETURNS jsonb LANGUAGE plpgsql VOLATILE SET search_path = public
      AS $sd$
      DECLARE v_ctx public.door_ctx;
      BEGIN
        v_ctx := public.door_context('owner', NULL, NULL, 'draft');
        INSERT INTO public.e2e_mig_door_rows (note) VALUES ('written before the refusal');
        IF p_refuse THEN PERFORM public.door_refuse('scratchRefused', 'why'); END IF;
        RETURN jsonb_build_object('ok', true, 'remaining', v_ctx.dial_remaining);
      EXCEPTION WHEN SQLSTATE 'P0D01' THEN
        RETURN public.door_refused('e2e_mig_door_scratch', 'draft', SQLERRM);
      END $sd$ $q$;
    REVOKE ALL ON FUNCTION public.e2e_mig_door_scratch(boolean) FROM PUBLIC, anon, authenticated;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user::text, 'role', 'authenticated')::text, true);
    v_answer := public.e2e_mig_door_scratch(true);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_user::text AND action = 'draft';
    SELECT count(*)::integer INTO v_rows FROM public.e2e_mig_door_rows;
    IF v_answer ->> 'ok' IS DISTINCT FROM 'false' OR v_answer ->> 'code' IS DISTINCT FROM 'P0D01'
       OR v_answer ->> 'message' IS DISTINCT FROM 'scratchRefused:why'
       OR v_answer -> 'refusals' -> 0 ->> 'reason' IS DISTINCT FROM 'scratchRefused'
       OR v_answer -> 'refusals' -> 0 ->> 'detail' IS DISTINCT FROM 'why'
       OR current_setting('response.status', true) IS DISTINCT FROM '400'
       OR v_count <> 1 OR v_rows <> 0
       OR (SELECT count FROM public.door_refusals WHERE door = 'e2e_mig_door_scratch' AND code = 'scratchRefused' AND day = current_date) IS DISTINCT FROM 1 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (b): a returned refusal did not count once and leave the table unchanged (% / count % / rows %)', v_answer, v_count, v_rows;
    END IF;
    v_answer := public.e2e_mig_door_scratch(false);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_user::text AND action = 'draft';
    SELECT count(*)::integer INTO v_rows FROM public.e2e_mig_door_rows;
    IF (v_answer ->> 'ok')::boolean IS NOT TRUE OR (v_answer ->> 'remaining')::integer <> 1 OR v_count <> 2 OR v_rows <> 1 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (b): an allowed call did not count once and write once (% / count % / rows %)', v_answer, v_count, v_rows;
    END IF;
    -- the third call reaches the override's limit (3) and is allowed; the fourth is rateLimited at 429, counted
    v_answer := public.e2e_mig_door_scratch(false);
    v_answer := public.e2e_mig_door_scratch(false);
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_user::text AND action = 'draft';
    SELECT count(*)::integer INTO v_rows FROM public.e2e_mig_door_rows;
    IF v_answer ->> 'message' IS DISTINCT FROM 'rateLimited' OR current_setting('response.status', true) IS DISTINCT FROM '429'
       OR v_count <> 4 OR v_rows <> 2 THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (b): the dial over its limit did not refuse rateLimited at 429 and count (% / count % / rows %)', v_answer, v_count, v_rows;
    END IF;
    DROP FUNCTION public.e2e_mig_door_scratch(boolean);
    DROP TABLE public.e2e_mig_door_rows;


    -- (c) the gates in order
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_msg := NULL; v_state := NULL;
    BEGIN
      PERFORM public.door_context('owner', NULL, NULL, 'draft');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_ctx := public.door_context('public', NULL, NULL, 'listing_read');
    IF v_ctx.uid IS NOT NULL OR v_ctx.dial_remaining IS NOT NULL THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): a signed-out public call did not pass without a count';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      PERFORM public.door_context('staff', v_res_name, 'edit', 'staff_config');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'accountDeactivated' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): a deactivated caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      PERFORM public.door_context('staff', v_res_name, 'edit', 'staff_config');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): a caller without the permission answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_scoped::text, 'role', 'authenticated')::text, true);
    v_msg := NULL;
    BEGIN
      PERFORM public.door_context('staff', v_res_name, 'edit', 'staff_config', 'XY', 'match');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_msg IS DISTINCT FROM 'permissionDenied:scope' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): a country grant for another country answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    v_ctx := public.door_context('staff', v_res_name, 'edit', 'staff_config', v_code, 'match');
    IF v_ctx.uid IS DISTINCT FROM v_scoped OR v_ctx.countries IS DISTINCT FROM ARRAY[v_code]::character(2)[] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): the country grant for its own country did not pass (%)', v_ctx;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_msg := NULL;
    BEGIN
      PERFORM public.door_context('staff', v_res_su_name, 'edit', 'staff_config');
    EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
    END;
    IF v_state IS DISTINCT FROM 'P0009' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): step-up did not keep P0009 (% %)', coalesce(v_msg, 'success'), v_state;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('role', 'service_role')::text, true);
    v_ctx := public.door_context('staff', v_res_su_name, 'edit', 'staff_config');
    IF v_ctx.role IS DISTINCT FROM 'service_role' OR v_ctx.dial_remaining IS NOT NULL THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): the service role did not pass without a count (%)', v_ctx;
    END IF;
    -- a staff reader of a step-up permission at aal1 passes: a read owes its permission, not a second factor
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal1')::text, true);
    v_ctx := public.door_context('staff-reader', v_res_su_name, 'edit');
    IF v_ctx.uid IS DISTINCT FROM v_staff THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (c): a staff reader was asked for a second factor (%)', v_ctx;
    END IF;


    -- (d) the cost per class (the staff caller holds a 100000 override on 'draft')
    FOREACH v_cls IN ARRAY ARRAY['reader', 'owner', 'staff', 'public'] LOOP
      PERFORM set_config('request.jwt.claims',
        CASE WHEN v_cls = 'public' THEN '{}' ELSE json_build_object('sub', v_staff::text, 'role', 'authenticated')::text END, true);
      v_samples := ARRAY[]::double precision[];
      FOR i IN 1..1000 LOOP
        v_t0 := clock_timestamp();
        CASE v_cls
          WHEN 'reader' THEN PERFORM public.door_context('reader');
          WHEN 'owner'  THEN PERFORM public.door_context('owner', NULL, NULL, 'draft');
          WHEN 'staff'  THEN PERFORM public.door_context('staff', v_res_name, 'edit', 'draft');
          ELSE PERFORM public.door_context('public', NULL, NULL, 'listing_read');
        END CASE;
        v_samples := array_append(v_samples, extract(epoch FROM clock_timestamp() - v_t0) * 1000.0);
      END LOOP;
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY s) INTO v_median FROM unnest(v_samples) AS s;
      RAISE NOTICE 'door_context cost: class % median % ms per call (1000 calls)', v_cls, round(v_median::numeric, 4);
      IF v_median > 10 THEN
        RAISE EXCEPTION 'F1-1 M-F1a part 2 proof (d): door_context(%) costs % ms per call', v_cls, round(v_median::numeric, 3);
      END IF;
    END LOOP;



    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261106060200') ON CONFLICT DO NOTHING;
