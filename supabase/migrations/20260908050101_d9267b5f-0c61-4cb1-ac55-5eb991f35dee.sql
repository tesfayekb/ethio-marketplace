-- DEC-045a-fix PART A — CLOSERS for the three re-declared SECURITY DEFINER doors.
-- 20260908041703 re-declared admin_delete_attribute, admin_unlink_attribute and
-- admin_merge_attributes without restating their ACLs in-file (DEC-022-B).
-- CREATE OR REPLACE preserves live grants, but the file must be self-describing:
-- this corrective restates them and reads the result back.

REVOKE ALL ON FUNCTION public.admin_delete_attribute(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_attribute(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_delete_attribute(uuid, text) TO service_role;

REVOKE ALL ON FUNCTION public.admin_unlink_attribute(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_unlink_attribute(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_unlink_attribute(uuid) TO service_role;

REVOKE ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO authenticated;
GRANT ALL ON FUNCTION public.admin_merge_attributes(uuid, uuid[]) TO service_role;

-- ACL READ-BACK LOOP: every door executes as authenticated and service_role,
-- and by nobody else. A miss raises; nothing is assumed.
DO $acl$
DECLARE
  v_fn   text;
  v_acl  text;
  v_bad  text := '';
BEGIN
  FOREACH v_fn IN ARRAY ARRAY[
    'admin_delete_attribute(uuid, text)',
    'admin_unlink_attribute(uuid)',
    'admin_merge_attributes(uuid, uuid[])'
  ] LOOP
    SELECT COALESCE(array_to_string(p.proacl, ' '), '(default)') INTO v_acl
      FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public'
       AND p.oid = ('public.' || v_fn)::regprocedure;
    RAISE NOTICE 'ACL % = %', v_fn, v_acl;

    IF NOT has_function_privilege('authenticated', 'public.' || v_fn, 'EXECUTE') THEN
      v_bad := v_bad || v_fn || ' (authenticated cannot execute) ';
    END IF;
    IF NOT has_function_privilege('service_role', 'public.' || v_fn, 'EXECUTE') THEN
      v_bad := v_bad || v_fn || ' (service_role cannot execute) ';
    END IF;
    IF has_function_privilege('anon', 'public.' || v_fn, 'EXECUTE') THEN
      v_bad := v_bad || v_fn || ' (anon CAN execute) ';
    END IF;
  END LOOP;

  IF v_bad <> '' THEN
    RAISE EXCEPTION 'DEC-045a-fix ACL READ-BACK FAILED: %', v_bad;
  END IF;
  RAISE NOTICE 'DEC-045a-fix ACL READ-BACK OK: three doors = authenticated + service_role only';
END
$acl$;

INSERT INTO public.migration_marks(version) VALUES ('20260908120000') ON CONFLICT DO NOTHING;