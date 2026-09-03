-- C2e — INC-137 GUARD CORRECTIVE.
-- The C2c landing (20260903044526_…) replaced public.admin_create_category with
-- CREATE OR REPLACE, which preserves the ACL granted by C2-MIG but leaves that
-- file without a self-describing REVOKE/GRANT pair (DEC-022-B definer law).
-- This migration RESTATES the ACL in one self-contained file, verbatim in the
-- compliant pattern used by the passing files in this directory. No behaviour
-- change: the function body, signature, argument names and defaults are
-- untouched; only the privileges are re-declared idempotently.

REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean) TO service_role;

-- In-file proof: the ACL is exactly {authenticated, service_role} EXECUTE and
-- neither PUBLIC nor anon can execute.
DO $$
DECLARE v_acl text;
BEGIN
  SELECT COALESCE(array_to_string(p.proacl, ','), '')
    INTO v_acl
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public'
     AND p.proname = 'admin_create_category';

  IF v_acl = '' THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_create_category has no explicit ACL';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_create_category(text, text, text, uuid, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: authenticated cannot execute admin_create_category';
  END IF;
  IF NOT has_function_privilege('service_role', 'public.admin_create_category(text, text, text, uuid, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: service_role cannot execute admin_create_category';
  END IF;
  IF has_function_privilege('anon', 'public.admin_create_category(text, text, text, uuid, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: anon can execute admin_create_category';
  END IF;
  RAISE NOTICE 'C2e proof OK — acl=%', v_acl;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904020000') ON CONFLICT DO NOTHING;