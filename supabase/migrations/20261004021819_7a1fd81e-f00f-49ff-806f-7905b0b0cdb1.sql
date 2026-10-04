-- bundle 3 M3 — ACL only (RULINGS 5, step 4 census): attr_import_plan is
-- reachable only through the admin doors and service_role, like
-- cat_import_plan and loc_import_plan.
-- e2e-areas: admin-attributes

REVOKE EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) TO service_role;

DO $proof$
DECLARE
  v_admin uuid;
  v_plan  jsonb;
BEGIN
  -- ACL: no browser role executes the planner; service_role and the
  -- preview door keep theirs.
  IF has_function_privilege('authenticated', 'public.attr_import_plan(jsonb,jsonb,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.attr_import_plan(jsonb,jsonb,text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.attr_import_plan(jsonb,jsonb,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_preview_attribute_import(jsonb,jsonb,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_preview_attribute_import(jsonb,jsonb,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF M3 ACL wrong';
  END IF;

  SELECT ur.user_id INTO v_admin
    FROM public.user_roles ur JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name IN ('super_admin', 'admin') AND ur.scope_type = 'global'
   ORDER BY r.priority DESC, ur.created_at LIMIT 1;
  IF v_admin IS NULL THEN RAISE EXCEPTION 'PROOF M3 setup: no admin'; END IF;

  -- Behaviour: the admin preview still plans a scratch import; rolled back.
  BEGIN
    PERFORM set_config('request.jwt.claims',
      jsonb_build_object('sub', v_admin, 'role', 'authenticated')::text, true);
    IF NOT public.has_permission(v_admin, 'categories', 'import') THEN
      RAISE EXCEPTION 'PROOF M3 setup: admin lacks categories.import';
    END IF;
    v_plan := public.admin_preview_attribute_import(
      jsonb_build_array(jsonb_build_object(
        'attr_key', 'e2e_m3_proof', 'name_en', 'e2e M3 proof', 'attr_type', 'text')),
      '[]'::jsonb, NULL);
    IF v_plan IS NULL OR NOT (v_plan ? 'refusals') THEN
      RAISE EXCEPTION 'PROOF M3 preview returned no plan: %', v_plan;
    END IF;
    RAISE EXCEPTION 'e2e-m3-rollback';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'e2e-m3-rollback' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', NULL, true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261004030000') ON CONFLICT DO NOTHING;