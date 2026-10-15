-- Bundle 16 turn S3 (2026-10-15). Tier A. D189 (the operator, 2026-10-15) — A DEACTIVATED ACCOUNT IS REFUSED AT EVERY
-- DOOR AND SIGNED OUT. Staff deactivate an account with admin_set_account_status (profiles.account_status); until now
-- only the doors that checked the column themselves refused such an account, and its session lived on. The class
-- fix sits at the two gates every door passes through:
--
-- A. rate_gate, redeclared whole from its live definition (20261003215007; census (d)): after the no-session answer,
--    a caller whose profile is deactivated is refused with 'account is deactivated' — before anything is counted.
--    Every seller door (drafts, identity, revisions, the posting reads) calls this gate first. Grants restated.
-- B. has_permission, redeclared whole from its live definition (20260809010130; census (d)): a deactivated account
--    holds no permission, so every staff door and every policy that asks it answer false (a super admin cannot be
--    deactivated: profiles_status_guard). Grants restated.
-- C. Proofs P1–P4: the bodies' markers and headers; the grants; rate_gate with no session unchanged; has_permission
--    false for an unknown id. The deactivated branches are proven through the app (G39: profiles references
--    auth.users, which no proof touches): the route test and the door test of this turn.
--
-- The app side of the same turn: the API routes' caller check refuses a deactivated bearer; a signed-in session reads
-- its own status at every auth event and signs out, landing on the sign-in page with the reason.

-- ===== A — rate_gate, whole: a deactivated caller is refused before anything is counted =====
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
  -- Bundle 16 turn S3 (D189) — a deactivated account is refused at this gate, which every seller door passes
  -- through before it writes or counts: the one check covers them all, and a door with its own check keeps it.
  IF EXISTS (SELECT 1 FROM public.profiles pr WHERE pr.user_id = v_uid AND pr.account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
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
REVOKE EXECUTE ON FUNCTION public.rate_gate(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_gate(text) TO service_role;

-- ===== B — has_permission, whole: a deactivated account holds no permission =====
CREATE OR REPLACE FUNCTION public.has_permission(p_user_id uuid, p_resource text, p_action text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Bundle 16 turn S3 (D189) — a deactivated account holds no permission: every staff door and every policy that
  -- asks this function answers false for it (a super admin cannot be deactivated — profiles_status_guard).
  SELECT CASE WHEN EXISTS (SELECT 1 FROM public.profiles pr
                            WHERE pr.user_id = p_user_id AND pr.account_status = 'deactivated') THEN false
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
$$;
REVOKE ALL ON FUNCTION public.has_permission(uuid, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.has_permission(uuid, text, text) TO service_role;

-- ===== C — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_ans jsonb;
BEGIN
  -- P1. The bodies carry the change, with their headers kept.
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.rate_gate(text)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%pr.account_status = ''deactivated''%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''account is deactivated'';%'
     OR v_src NOT LIKE '%unknown rate dial: %'
     OR v_src NOT LIKE '%ON CONFLICT (key, action, window_start)%' THEN
    RAISE EXCEPTION 'B16S3 P1: the body of rate_gate is not as written';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.has_permission(uuid, text, text)'::regprocedure
     AND prosecdef AND provolatile = 's' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%pr.account_status = ''deactivated'') THEN false%'
     OR v_src NOT LIKE '%WHEN public.is_super_admin(p_user_id) THEN true%'
     OR v_src NOT LIKE '%p.action = ''manage''%' THEN
    RAISE EXCEPTION 'B16S3 P1: the body of has_permission is not as written';
  END IF;

  -- P2. Grants as before: rate_gate for service_role only; has_permission for signed-in users, never anon.
  IF has_function_privilege('anon', 'public.rate_gate(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.rate_gate(text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.rate_gate(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.has_permission(uuid, text, text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.has_permission(uuid, text, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16S3 P2: a grant is not as before';
  END IF;

  -- P3. No session: rate_gate still answers allowed with no count (unchanged).
  PERFORM set_config('request.jwt.claims', '', true);
  v_ans := public.rate_gate('draft');
  IF coalesce((v_ans->>'allowed')::boolean, false) IS NOT TRUE OR v_ans ? 'remaining' IS NOT TRUE THEN
    RAISE EXCEPTION 'B16S3 P3: rate_gate with no session answered %', v_ans;
  END IF;

  -- P4. An id no profile holds: no permission (unchanged), and no exception.
  IF public.has_permission(gen_random_uuid(), 'listings', 'view') THEN
    RAISE EXCEPTION 'B16S3 P4: has_permission granted an unknown id';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261016090000') ON CONFLICT (version) DO NOTHING;
