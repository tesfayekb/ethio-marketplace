-- Foundations turn D1, M4b — INC-951 for the import audit door, the brief's second form for concern 3:
-- "the row is written by the server and the browser grant revoked" (ruling, stop 5). import_gate_audit
-- runs AFTER an import has saved, so a refusal there would leave a finished import with no audit row;
-- the door is therefore never refused for rate, and the browser can no longer reach it at all.
--   * The argument list gains p_actor uuid (auth.uid() is null under the service client), so the
--     function is DROPPED and recreated; the body is the live one (ethio-prod, M4) byte for byte except
--     v_actor := p_actor and the removed M4 gate line. Header unchanged: plpgsql, VOLATILE,
--     SECURITY DEFINER, search_path public.
--   * EXECUTE: service_role only (REVOKE FROM PUBLIC, anon, authenticated restated).
--   * The import_audit dial (M4) loses its only counter, so its rate_dials row is deleted with it;
--     src/lib/dials.ts drops importAudit in the same landing.
-- Rate-limiting the imports lives on the work, before any side effect (G54a; M6).
DROP FUNCTION public.import_gate_audit(text, text, uuid, jsonb);

CREATE FUNCTION public.import_gate_audit(p_actor uuid, p_family text, p_event text, p_batch uuid, p_counts jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_actor uuid := p_actor;
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
                 ('translations', 'translations', 'update')) AS f(family, resource, verb)
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
$function$;
REVOKE ALL ON FUNCTION public.import_gate_audit(uuid, text, text, uuid, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.import_gate_audit(uuid, text, text, uuid, jsonb) TO service_role;

DELETE FROM public.rate_dials WHERE action = 'import_audit';

-- PROOF (M4b): scratch rows only, rolled back by the sentinel.
--   (1) authenticated and anon cannot execute the door; service_role can; header as declared.
--   (2) a service-role call with an actor writes exactly one row naming that actor — and a second
--       call writes a second (never rate-refused).
--   (3) a null actor and an actor without the family's permission are refused and write nothing.
DO $proof$
DECLARE
  v_sig    text := 'public.import_gate_audit(uuid,text,text,uuid,jsonb)';
  v_staff  uuid := gen_random_uuid();
  v_member uuid := gen_random_uuid();
  v_batch  uuid := gen_random_uuid();
  v_key    text := v_batch::text;
  v_n      integer;
  v_msg    text;
BEGIN
  IF has_function_privilege('authenticated', v_sig, 'EXECUTE')
     OR has_function_privilege('anon', v_sig, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
    RAISE EXCEPTION 'M4b proof: ACL differs';
  END IF;
  IF to_regprocedure('public.import_gate_audit(text,text,uuid,jsonb)') IS NOT NULL THEN
    RAISE EXCEPTION 'M4b proof: the old signature survives';
  END IF;
  IF (SELECT p.provolatile::text || p.prosecdef::text || p.proconfig::text FROM pg_proc p
       WHERE p.oid = v_sig::regprocedure) <> 'vtrue{search_path=public}' THEN
    RAISE EXCEPTION 'M4b proof: header differs';
  END IF;
  IF EXISTS (SELECT 1 FROM public.rate_dials WHERE action = 'import_audit') THEN
    RAISE EXCEPTION 'M4b proof: the import_audit dial survives';
  END IF;
  BEGIN
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, 'e2e-d1-m4b-' || v_staff || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_member, 'e2e-d1-m4b-' || v_member || '@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    SELECT v_staff, r.id, 'global' FROM public.roles r WHERE r.name = 'super_admin';
    -- the service client: no auth.uid()
    PERFORM set_config('request.jwt.claims', '{"role":"service_role"}', true);

    PERFORM public.import_gate_audit(v_staff, 'categories', 'commit', v_batch, '{"created":1}'::jsonb);
    SELECT count(*) INTO v_n FROM public.audit_log
     WHERE entity_id = v_key AND actor_id = v_staff AND action = 'import.commit' AND entity_type = 'import:categories';
    IF v_n <> 1 OR (SELECT count(*) FROM public.audit_log WHERE entity_id = v_key) <> 1 THEN
      RAISE EXCEPTION 'M4b proof (2): % rows naming the actor', v_n;
    END IF;
    PERFORM public.import_gate_audit(v_staff, 'categories', 'undo', v_batch, '{}'::jsonb);
    IF (SELECT count(*) FROM public.audit_log WHERE entity_id = v_key AND actor_id = v_staff) <> 2 THEN
      RAISE EXCEPTION 'M4b proof (2): the second event was not written';
    END IF;

    v_msg := NULL;
    BEGIN
      PERFORM public.import_gate_audit(NULL, 'categories', 'commit', v_batch, '{}'::jsonb);
    EXCEPTION WHEN insufficient_privilege THEN v_msg := SQLERRM;
    END;
    IF v_msg IS NULL THEN RAISE EXCEPTION 'M4b proof (3): a null actor was accepted'; END IF;
    v_msg := NULL;
    BEGIN
      PERFORM public.import_gate_audit(v_member, 'categories', 'commit', v_batch, '{}'::jsonb);
    EXCEPTION WHEN insufficient_privilege THEN v_msg := SQLERRM;
    END;
    IF v_msg IS NULL THEN RAISE EXCEPTION 'M4b proof (3): an actor without permission was accepted'; END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE entity_id = v_key) <> 2 THEN
      RAISE EXCEPTION 'M4b proof (3): a refused call wrote a row';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261029041000');
