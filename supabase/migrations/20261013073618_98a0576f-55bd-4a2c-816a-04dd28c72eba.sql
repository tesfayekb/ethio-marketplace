-- Bundle 12 (the tidy-up round), turn T10 (2026-10-13). Tier A. The import gate's audit row needs the family's permission.
-- e2e-areas: admin-imports, admin-attributes, admin-categories, admin-locations, admin-translations
-- The rule: import_gate_audit writes a row only for a caller who holds that family's own import permission, the same
-- permission the gate checks before it calls this function, so every caller that should write a row still does.
-- Live beside file (ethio-prod, pg_proc, read in this turn's census): import_gate_audit(text, text, uuid, jsonb)
--   RETURNS void; provolatile v; prosecdef t; proconfig {search_path=public}; md5(prosrc)
--   ba2184c0317ce1ede233b93218dab857 (582 characters). The body below is that text with ONE check added: the family's
--   own permission (src/server/imports/registry.ts: attributes and categories categories:import, locations
--   locations:import, translations translations:manage).
-- A. import_gate_audit redeclared; its REVOKE and GRANTs restated as they were.
-- B. Proofs: no row is written; the caller is a random id with no role; no auth.users row.

-- ===== A — the family's permission, before the row =====
CREATE OR REPLACE FUNCTION public.import_gate_audit(
  p_family text,
  p_event text,
  p_batch uuid,
  p_counts jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_resource text;
  v_verb text;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'permission denied: not signed in' USING ERRCODE = '42501';
  END IF;
  IF coalesce(p_family, '') = '' OR p_event NOT IN ('preview', 'commit', 'undo', 'refused') THEN
    RAISE EXCEPTION 'import: unknown gate event' USING ERRCODE = '22023';
  END IF;
  SELECT f.resource, f.verb INTO v_resource, v_verb
    FROM (VALUES ('attributes', 'categories', 'import'),
                 ('categories', 'categories', 'import'),
                 ('locations', 'locations', 'import'),
                 ('translations', 'translations', 'manage')) AS f(family, resource, verb)
   WHERE f.family = p_family;
  IF v_resource IS NULL OR NOT public.has_permission(v_actor, v_resource, v_verb) THEN
    RAISE EXCEPTION 'permission denied: import %', p_family USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.audit_log(actor_id, action, entity_type, entity_id, meta)
  VALUES (
    v_actor,
    'import.' || p_event,
    'import:' || p_family,
    p_batch,
    public.import_sanitize(coalesce(p_counts, '{}'::jsonb))
  );
END;
$$;

REVOKE ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.import_gate_audit(text, text, uuid, jsonb) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_def    text;
  v_caller uuid := gen_random_uuid();
  v_family text;
  v_err    text;
  v_state  text;
BEGIN
  -- B1: the check is in the live body, and the header is unchanged.
  v_def := pg_get_functiondef('public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure);
  IF position('public.has_permission(v_actor, v_resource, v_verb)' IN v_def) = 0
     OR position('(''translations'', ''translations'', ''manage'')' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T10 B1: the permission check is not in the body';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
                  WHERE p.oid = 'public.import_gate_audit(text, text, uuid, jsonb)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v'
                    AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'T10 B1: the header changed';
  END IF;
  IF has_function_privilege('anon', 'public.import_gate_audit(text, text, uuid, jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.import_gate_audit(text, text, uuid, jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'T10 B1: the grants changed';
  END IF;

  -- B2: a signed-in caller with no role is refused for every family and for an unknown one; nothing is written.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_caller, 'role', 'authenticated')::text, true);
  FOREACH v_family IN ARRAY ARRAY['attributes', 'categories', 'locations', 'translations', 'e2e-mig-nonesuch'] LOOP
    v_err := NULL;
    v_state := NULL;
    BEGIN
      PERFORM public.import_gate_audit(v_family, 'preview', NULL, '{}'::jsonb);
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
      v_state := SQLSTATE;
    END;
    IF v_state IS DISTINCT FROM '42501' OR v_err <> 'permission denied: import ' || v_family THEN
      RAISE EXCEPTION 'T10 B2 %: expected the permission refusal, got % %', v_family,
        coalesce(v_state, 'no error'), coalesce(v_err, '');
    END IF;
  END LOOP;

  -- B3: no caller is refused as before.
  PERFORM set_config('request.jwt.claims', '{}', true);
  v_state := NULL;
  BEGIN
    PERFORM public.import_gate_audit('attributes', 'preview', NULL, '{}'::jsonb);
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLSTATE;
    v_err := SQLERRM;
  END;
  IF v_state IS DISTINCT FROM '42501' OR v_err <> 'permission denied: not signed in' THEN
    RAISE EXCEPTION 'T10 B3: expected the signed-out refusal, got % %', coalesce(v_state, 'no error'), coalesce(v_err, '');
  END IF;

  -- B4: nothing of the proofs is left.
  IF EXISTS (SELECT 1 FROM public.audit_log a WHERE a.actor_id = v_caller) THEN
    RAISE EXCEPTION 'T10 B4: a refused call wrote an audit row';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261013190000') ON CONFLICT (version) DO NOTHING;
