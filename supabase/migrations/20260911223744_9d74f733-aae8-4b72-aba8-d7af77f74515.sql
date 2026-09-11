-- DEC-050 L2a-lint: close the six unintentionally anon/PUBLIC-callable SECURITY DEFINER
-- functions surfaced by the Supabase linter (0028). Mark: 20260911230000
-- No function body is altered; ACLs only. Closers + read-backs in-file.

-- 1. Permission doors: signed-in only (never anon, never PUBLIC).
REVOKE ALL ON FUNCTION public.has_permission(uuid, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_permission(uuid, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.has_permission(uuid, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.get_my_permissions() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_my_permissions() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_my_permissions() TO authenticated;
GRANT ALL ON FUNCTION public.get_my_permissions() TO service_role;

-- 2. Trigger / event-trigger bodies: callable by nobody directly.
--    Trigger firing does not consult EXECUTE privilege, so the guards keep working.
REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM authenticated;

REVOKE ALL ON FUNCTION public.role_permissions_core_lock() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.role_permissions_core_lock() FROM anon;
REVOKE ALL ON FUNCTION public.role_permissions_core_lock() FROM authenticated;

REVOKE ALL ON FUNCTION public.roles_system_lock() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.roles_system_lock() FROM anon;
REVOKE ALL ON FUNCTION public.roles_system_lock() FROM authenticated;

REVOKE ALL ON FUNCTION public.user_roles_protect() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.user_roles_protect() FROM anon;
REVOKE ALL ON FUNCTION public.user_roles_protect() FROM authenticated;

-- 3. PROOF: ACL read-backs.
DO $proof$
DECLARE
  r record;
  v_bad text := '';
BEGIN
  FOR r IN
    SELECT p.oid, p.oid::regprocedure::text AS fn
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname IN ('has_permission','get_my_permissions','rls_auto_enable',
                        'role_permissions_core_lock','roles_system_lock','user_roles_protect')
  LOOP
    IF has_function_privilege('anon', r.oid, 'EXECUTE') THEN
      v_bad := v_bad || ' anon:' || r.fn;
    END IF;
    IF has_function_privilege('public', r.oid, 'EXECUTE') THEN
      v_bad := v_bad || ' PUBLIC:' || r.fn;
    END IF;
  END LOOP;
  IF v_bad <> '' THEN
    RAISE EXCEPTION 'PROOF 1 FAILED: still anon/PUBLIC callable:%', v_bad;
  END IF;

  IF NOT has_function_privilege('authenticated',
        'public.has_permission(uuid,text,text)'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: has_permission lost authenticated EXECUTE';
  END IF;
  IF NOT has_function_privilege('authenticated',
        'public.get_my_permissions()'::regprocedure, 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF 2 FAILED: get_my_permissions lost authenticated EXECUTE';
  END IF;

  -- the four guards must remain attached to their triggers
  IF (SELECT count(*) FROM pg_trigger t
       WHERE NOT t.tgisinternal
         AND t.tgfoid IN ('public.role_permissions_core_lock()'::regprocedure,
                          'public.roles_system_lock()'::regprocedure,
                          'public.user_roles_protect()'::regprocedure)) < 3 THEN
    RAISE EXCEPTION 'PROOF 3 FAILED: a role/user-role guard trigger is missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_event_trigger
                  WHERE evtfoid = 'public.rls_auto_enable()'::regprocedure) THEN
    RAISE EXCEPTION 'PROOF 3 FAILED: rls_auto_enable event trigger is missing';
  END IF;

  -- has_permission still answers for the definer path
  PERFORM public.has_permission(gen_random_uuid(), 'categories', 'update');

  RAISE NOTICE 'PROOFS 1-3 GREEN: six functions closed to anon/PUBLIC; authenticated doors and guards intact';
END $proof$;

-- 4. Migration mark (DEC-022).
INSERT INTO public.migration_marks(version) VALUES ('20260911230000') ON CONFLICT DO NOTHING;
