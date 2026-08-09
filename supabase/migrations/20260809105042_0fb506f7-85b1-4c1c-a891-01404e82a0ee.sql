-- Phase R3a — reconciliation proof: assign_role / revoke_role SUCCESS paths + log_audit write path.
--
-- Schema-free. One env-agnostic DO block (INC-064: principals looked up dynamically,
-- skip-with-NOTICE when absent). Any failed assertion RAISES and aborts the deploy;
-- completion of this migration IS the proof.
--
-- PERMANENCE NOTE: the audit_log rows this produces are PERMANENT by design — the
-- append-only trigger refuses UPDATE/DELETE. They are real history of a real proof.
-- Do not attempt cleanup.
--
-- Censused audit shape (from public.assign_role/revoke_role -> public.log_audit):
--   actor_id    = auth.uid()            (the impersonated super admin)
--   action      = 'role.assign' | 'role.revoke'
--   entity_type = 'user_roles'
--   entity_id   = target user id (text)
--   meta        = {"role":"moderator", ...} (assign also carries scope_type/scope_country)

DO $r3a$
DECLARE
  v_super     uuid;
  v_base      uuid;
  v_role      uuid;
  v_before    bigint;
  v_perms     text[];
BEGIN
  SELECT ur.user_id INTO v_super
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' LIMIT 1;

  SELECT id INTO v_role FROM public.roles WHERE name = 'moderator';

  -- a principal holding ONLY the base 'user' role, and not the super admin
  SELECT ur.user_id INTO v_base
    FROM public.user_roles ur
   WHERE ur.user_id <> COALESCE(v_super, '00000000-0000-0000-0000-000000000000'::uuid)
   GROUP BY ur.user_id
  HAVING count(*) = 1
     AND bool_and(EXISTS (SELECT 1 FROM public.roles r WHERE r.id = ur.role_id AND r.name = 'user'))
   LIMIT 1;

  IF v_super IS NULL OR v_base IS NULL OR v_role IS NULL THEN
    RAISE NOTICE 'R3a: skipped — missing principals (super=%, base=%, moderator_role=%)',
      v_super, v_base, v_role;
    RETURN;
  END IF;

  -- ---- P-A1: assign_role succeeds and writes an audit row -------------------
  SELECT count(*) INTO v_before FROM public.audit_log;

  PERFORM set_config('role', 'authenticated', true);
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super, 'role', 'authenticated')::text, true);

  PERFORM public.assign_role(v_base, 'moderator', NULL);

  PERFORM set_config('request.jwt.claims', NULL, true);
  PERFORM set_config('role', 'none', true);
  RESET ROLE;

  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_base AND role_id = v_role) THEN
    RAISE EXCEPTION 'R3a P-A1 FAILED: moderator grant row missing for %', v_base;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.audit_log
     WHERE action = 'role.assign'
       AND entity_type = 'user_roles'
       AND entity_id = v_base::text
       AND meta->>'role' = 'moderator'
       AND meta->>'scope_type' = 'global'
       AND actor_id = v_super
  ) THEN
    RAISE EXCEPTION 'R3a P-A1 FAILED: no role.assign audit row of the censused shape for %', v_base;
  END IF;

  IF (SELECT count(*) FROM public.audit_log) <= v_before THEN
    RAISE EXCEPTION 'R3a P-A1 FAILED: audit_log did not grow (log_audit write path dead)';
  END IF;

  -- ---- P-A2: the grant is live for the grantee ------------------------------
  PERFORM set_config('role', 'authenticated', true);
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_base, 'role', 'authenticated')::text, true);

  SELECT array_agg(permission ORDER BY permission) INTO v_perms FROM public.get_my_permissions();

  PERFORM set_config('request.jwt.claims', NULL, true);
  PERFORM set_config('role', 'none', true);
  RESET ROLE;

  IF v_perms IS NULL OR NOT ('admin_panel:access' = ANY (v_perms)) THEN
    RAISE EXCEPTION 'R3a P-A2 FAILED: grantee lacks admin_panel:access after grant (got %)', v_perms;
  END IF;

  -- ---- P-A3: revoke_role succeeds and writes an audit row -------------------
  SELECT count(*) INTO v_before FROM public.audit_log;

  PERFORM set_config('role', 'authenticated', true);
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_super, 'role', 'authenticated')::text, true);

  PERFORM public.revoke_role(v_base, 'moderator');

  PERFORM set_config('request.jwt.claims', NULL, true);
  PERFORM set_config('role', 'none', true);
  RESET ROLE;

  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_base AND role_id = v_role) THEN
    RAISE EXCEPTION 'R3a P-A3 FAILED: moderator grant row survived revoke for %', v_base;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.audit_log
     WHERE action = 'role.revoke'
       AND entity_type = 'user_roles'
       AND entity_id = v_base::text
       AND meta->>'role' = 'moderator'
       AND actor_id = v_super
  ) THEN
    RAISE EXCEPTION 'R3a P-A3 FAILED: no role.revoke audit row of the censused shape for %', v_base;
  END IF;

  IF (SELECT count(*) FROM public.audit_log) <= v_before THEN
    RAISE EXCEPTION 'R3a P-A3 FAILED: audit_log did not grow on revoke';
  END IF;

  -- ---- P-A4: clean restore --------------------------------------------------
  PERFORM set_config('role', 'authenticated', true);
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_base, 'role', 'authenticated')::text, true);

  SELECT array_agg(permission ORDER BY permission) INTO v_perms FROM public.get_my_permissions();

  PERFORM set_config('request.jwt.claims', NULL, true);
  PERFORM set_config('role', 'none', true);
  RESET ROLE;

  IF v_perms IS DISTINCT FROM ARRAY['account_panel:access'] THEN
    RAISE EXCEPTION 'R3a P-A4 FAILED: base permissions not cleanly restored (got %)', v_perms;
  END IF;

  RAISE NOTICE 'R3a OK: assign/revoke success paths and log_audit writes proven (super=%, base=%)',
    v_super, v_base;
END
$r3a$;
