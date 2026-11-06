-- e2e-areas: auth-caller-gates, door-refusals
-- Foundations 1, turn F1-1, M-F1a part 1 of 6 — THE REFUSAL CODE AND THE SCOPED PERMISSION (DEC-333; plan
-- docs/governance/reports/f1-doors.stop-1.md §3.2 and §3.3, ruling 1 decisions 3 and 4). `door_refuse(code, detail)`
-- raises SQLSTATE P0D01 with the message `code[:detail]` — the shape every client contract already parses
-- (splitRefusal, doorRefusal, readerFailure) — so a refusal is a stable code, never a sentence; the composite
-- `door_ctx` is what door_context (part 2) hands a door; `has_permission_scoped` honours user_roles.scope_country in
-- three modes (INC-834: match / global / filter, none = has_permission) beside the UNCHANGED has_permission the 229
-- policies read. Born closed (service_role only: both run inside SECURITY DEFINER doors, never from the browser).
-- Proofs on scratch rows under a sentinel rollback: catalog facts from catalog columns (law 12), door_refuse's
-- class and message, and every scope mode on scratch roles. Law 11 (readers into variables); CF-SQL-1.

DO $pre$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261105100900') THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1: the ledger''s newest mark 20261105100900 (P-2 M-1c part 9) must be applied first';
  END IF;
  IF to_regprocedure('public.door_refuse(text,text)') IS NOT NULL
     OR to_regprocedure('public.has_permission_scoped(uuid,text,text,character,text)') IS NOT NULL
     OR to_regtype('public.door_ctx') IS NOT NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1: a door mechanism object already exists';
  END IF;
  IF to_regprocedure('public.account_is_deactivated(uuid)') IS NULL
     OR to_regprocedure('public.has_permission(uuid,text,text)') IS NULL
     OR to_regprocedure('public.is_super_admin(uuid)') IS NULL
     OR to_regprocedure('public.get_role_hierarchy(uuid)') IS NULL THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1: a gate has_permission_scoped composes is missing';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. door_refuse — a refusal is a code, never a sentence
CREATE FUNCTION public.door_refuse(p_code text, p_detail text DEFAULT NULL)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SET search_path = public
AS $$
BEGIN
  IF p_code IS NULL OR p_code !~ '^[a-z][A-Za-z]*$' THEN
    RAISE EXCEPTION 'door_refuse: a code is one camelCase word, not %', coalesce(p_code, 'NULL');
  END IF;
  RAISE EXCEPTION USING ERRCODE = 'P0D01', MESSAGE = p_code || coalesce(':' || p_detail, '');
END $$;
COMMENT ON FUNCTION public.door_refuse(text, text) IS
  'DEC-333: raises SQLSTATE P0D01 with the message code[:detail]; the door shell (door_refused) recognises the class, the clients parse the shape (splitRefusal, doorRefusal, doorCode).';
REVOKE ALL ON FUNCTION public.door_refuse(text, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refuse(text, text) TO service_role;

-- ------------------------------------------------------------ 2. door_ctx — what door_context hands the door
CREATE TYPE public.door_ctx AS (
  uid            uuid,
  role           text,
  countries      character(2)[],
  dial_remaining integer,
  resets_at      timestamptz
);
COMMENT ON TYPE public.door_ctx IS
  'DEC-333: the caller (uid, role), the countries a filter reader may show (NULL = all), and the dial''s remaining count and reset.';

-- ------------------------------------------------------------ 3. has_permission_scoped — INC-834, the three modes
CREATE FUNCTION public.has_permission_scoped(p_user_id uuid, p_resource text, p_action text, p_country character DEFAULT NULL, p_mode text DEFAULT 'none')
 RETURNS TABLE(allowed boolean, countries character(2)[], detail text)
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path = public
AS $$
DECLARE
  v_global    boolean;
  v_countries character(2)[];
  v_code      character(2) := nullif(upper(btrim(coalesce(p_country::text, ''))), '')::character(2);
BEGIN
  IF p_mode IS NULL OR p_mode NOT IN ('none', 'match', 'global', 'filter') THEN
    RAISE EXCEPTION 'has_permission_scoped: unknown scope mode %', coalesce(p_mode, 'NULL');
  END IF;
  IF p_user_id IS NULL OR public.account_is_deactivated(p_user_id) THEN
    RETURN QUERY SELECT false, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF public.is_super_admin(p_user_id) THEN
    RETURN QUERY SELECT true, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF p_mode = 'none' THEN
    RETURN QUERY SELECT public.has_permission(p_user_id, p_resource, p_action), NULL::character(2)[], NULL::text; RETURN;
  END IF;
  SELECT bool_or(ur.scope_type = 'global'),
         array_agg(DISTINCT ur.scope_country::character(2)) FILTER (WHERE ur.scope_type = 'country' AND ur.scope_country IS NOT NULL)
    INTO v_global, v_countries
    FROM public.user_roles ur
   WHERE ur.user_id = p_user_id
     AND EXISTS (SELECT 1
                   FROM public.role_permissions rp
                   JOIN public.permissions p ON p.id = rp.permission_id
                   JOIN public.resources res ON res.id = p.resource_id
                  WHERE rp.role_id IN (SELECT public.get_role_hierarchy(ur.role_id))
                    AND res.name = p_resource
                    AND p.action IN (p_action, 'manage'));
  v_global := coalesce(v_global, false);
  IF NOT v_global AND v_countries IS NULL THEN
    RETURN QUERY SELECT false, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF p_mode = 'global' THEN
    RETURN QUERY SELECT v_global, NULL::character(2)[], CASE WHEN v_global THEN NULL::text ELSE 'scope' END; RETURN;
  END IF;
  IF p_mode = 'filter' THEN
    RETURN QUERY SELECT true, CASE WHEN v_global THEN NULL::character(2)[] ELSE v_countries END, NULL::text; RETURN;
  END IF;
  -- match: a global grant passes; a country grant passes only for its own country.
  IF v_global THEN
    RETURN QUERY SELECT true, NULL::character(2)[], NULL::text; RETURN;
  END IF;
  IF v_code IS NULL OR NOT (v_code = ANY (v_countries)) THEN
    RETURN QUERY SELECT false, v_countries, 'scope'::text; RETURN;
  END IF;
  RETURN QUERY SELECT true, v_countries, NULL::text;
END $$;
COMMENT ON FUNCTION public.has_permission_scoped(uuid, text, text, character, text) IS
  'DEC-333 / INC-834: the scope-aware permission check door_context uses — none (has_permission), match (a global grant, or a country grant for p_country), global (only a global grant), filter (any grant; countries = the scoped set, NULL = all). A super admin passes every mode.';
REVOKE ALL ON FUNCTION public.has_permission_scoped(uuid, text, text, character, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.has_permission_scoped(uuid, text, text, character, text) TO service_role;


-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: door_refuse VOLATILE and plain, has_permission_scoped STABLE SECURITY DEFINER, both with
--     search_path public and closed to browser roles; the type exists with its five attributes.
-- (b) door_refuse raises P0D01 with code[:detail] and refuses a code that is not one camelCase word.
-- (c) the scope modes on scratch roles — a global grant and a country grant on a scratch resource — answer as
--     §3.3 says: global refuses the country grant (detail scope) and passes the global one; filter narrows the
--     country grant to its country and widens a global grant to all; match without a country refuses a
--     country-only grant; none answers has_permission.
DO $proof$
DECLARE
  v_tag      text := 'e2e-mig-f1a1-' || substr(gen_random_uuid()::text, 1, 8);
  v_code     character(2) := 'XZ';
  v_user     uuid := gen_random_uuid();
  v_staff    uuid := gen_random_uuid();
  v_scoped   uuid := gen_random_uuid();
  v_role_g   uuid;
  v_role_c   uuid;
  v_perm     uuid;
  v_res      uuid;
  v_res_name text := 'e2e_mig_res_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
  v_msg      text;
  v_state    text;
  v_allowed  boolean;
  v_countries character(2)[];
  v_detail   text;
  v_fn       regprocedure;
BEGIN
  -- (a)
  FOREACH v_fn IN ARRAY ARRAY[
      'public.door_refuse(text,text)'::regprocedure,
      'public.has_permission_scoped(uuid,text,text,character,text)'::regprocedure] LOOP
    IF (SELECT proconfig::text <> '{search_path=public}' FROM pg_proc WHERE oid = v_fn)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (a): % is not closed with search_path public', v_fn;
    END IF;
  END LOOP;
  IF (SELECT provolatile <> 'v' OR prosecdef FROM pg_proc WHERE oid = 'public.door_refuse(text,text)'::regprocedure)
     OR (SELECT provolatile <> 's' OR NOT prosecdef FROM pg_proc WHERE oid = 'public.has_permission_scoped(uuid,text,text,character,text)'::regprocedure)
     OR (SELECT count(*) FROM pg_attribute WHERE attrelid = 'public.door_ctx'::regclass AND attnum > 0 AND NOT attisdropped) <> 5 THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (a): a header attribute or the type differs';
  END IF;
  -- (b)
  v_msg := NULL; v_state := NULL;
  BEGIN
    PERFORM public.door_refuse('scratchRefused', 'why');
  EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
  END;
  IF v_msg IS DISTINCT FROM 'scratchRefused:why' OR v_state IS DISTINCT FROM 'P0D01' THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (b): door_refuse answered % (%)', coalesce(v_msg, 'nothing'), v_state;
  END IF;
  v_msg := NULL; v_state := NULL;
  BEGIN
    PERFORM public.door_refuse('scratchRefused');
  EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
  END;
  IF v_msg IS DISTINCT FROM 'scratchRefused' OR v_state IS DISTINCT FROM 'P0D01' THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (b): door_refuse without a detail answered % (%)', coalesce(v_msg, 'nothing'), v_state;
  END IF;
  v_msg := NULL; v_state := NULL;
  BEGIN
    PERFORM public.door_refuse('not a code');
  EXCEPTION WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT, v_state = RETURNED_SQLSTATE;
  END;
  IF v_state IS DISTINCT FROM 'P0001' THEN
    RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (b): a sentence passed door_refuse (%)', v_state;
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, v_tag, true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_user,   v_tag || '-user@example.invalid',   '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_staff,  v_tag || '-staff@example.invalid',  '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_scoped, v_tag || '-scoped@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.resources (name, description) VALUES (v_res_name, v_tag) RETURNING id INTO v_res;
    INSERT INTO public.permissions (resource_id, action, requires_step_up) VALUES (v_res, 'edit', false) RETURNING id INTO v_perm;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-global', v_tag) RETURNING id INTO v_role_g;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-country', v_tag) RETURNING id INTO v_role_c;
    INSERT INTO public.role_permissions (role_id, permission_id) VALUES (v_role_g, v_perm), (v_role_c, v_perm);
    INSERT INTO public.user_roles (user_id, role_id, scope_type) VALUES (v_staff, v_role_g, 'global');
    INSERT INTO public.user_roles (user_id, role_id, scope_type, scope_country) VALUES (v_scoped, v_role_c, 'country', v_code);

    -- (c) the scope modes
    PERFORM set_config('request.jwt.claims', '{}', true);
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_scoped, v_res_name, 'edit', NULL, 'global') s;
    IF v_allowed IS NOT FALSE OR v_detail IS DISTINCT FROM 'scope' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): global refused a country grant wrongly (% %)', v_allowed, v_detail;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_staff, v_res_name, 'edit', NULL, 'global') s;
    IF v_allowed IS NOT TRUE OR v_countries IS NOT NULL THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): global did not pass a global grant (% %)', v_allowed, v_countries;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_scoped, v_res_name, 'edit', NULL, 'filter') s;
    IF v_allowed IS NOT TRUE OR v_countries IS DISTINCT FROM ARRAY[v_code]::character(2)[] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): filter did not narrow to the country grant (% %)', v_allowed, v_countries;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_staff, v_res_name, 'edit', NULL, 'filter') s;
    IF v_allowed IS NOT TRUE OR v_countries IS NOT NULL THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): filter did not widen a global grant to all (% %)', v_allowed, v_countries;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_scoped, v_res_name, 'edit', NULL, 'match') s;
    IF v_allowed IS NOT FALSE OR v_detail IS DISTINCT FROM 'scope' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): match without a country passed a country-only grant (% %)', v_allowed, v_detail;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_user, v_res_name, 'edit', NULL, 'none') s;
    IF v_allowed IS NOT FALSE THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): none passed a caller without the permission';
    END IF;


    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_scoped, v_res_name, 'edit', v_code, 'match') s;
    IF v_allowed IS NOT TRUE OR v_countries IS DISTINCT FROM ARRAY[v_code]::character(2)[] THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): match for the grant''s own country did not pass (% %)', v_allowed, v_countries;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_scoped, v_res_name, 'edit', 'XY', 'match') s;
    IF v_allowed IS NOT FALSE OR v_detail IS DISTINCT FROM 'scope' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): match for another country passed a country grant (% %)', v_allowed, v_detail;
    END IF;
    SELECT s.allowed, s.countries, s.detail INTO v_allowed, v_countries, v_detail
      FROM public.has_permission_scoped(v_staff, v_res_name, 'edit', NULL, 'none') s;
    IF v_allowed IS NOT TRUE THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 1 proof (c): none refused the global grant';
    END IF;
    RAISE EXCEPTION 'f1a1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a1-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261106120100') ON CONFLICT DO NOTHING;
