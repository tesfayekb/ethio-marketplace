-- (no e2e-areas line: every door's refusal answers its code's status, so every spec area is selected)

-- Cursor bundle 7a, Part 2, file B of five — A REFUSAL'S STATUS NAMES ITS KIND (INC-1287; brief
-- docs/governance/briefs/cursor-bundle-7a.md, ruling docs/governance/briefs/cursor-bundle-7a-ruling-1.md decision 3).
-- door_refusal_status, the one table from a refusal's code to its HTTP status, gains two classes beside the gate's four:
--   GONE 404 — the row the caller named is not there, or not theirs to see, and the next step is to go back (31 codes);
--   CHANGED 409 — the row is there, but its state now forbids the action, and the next step is to reload (29 codes).
-- Every other code stays 400: the caller's input must change (the borderline codes — a value from a short list, a conflict
-- with another row, a rule over related rows — included). The client's mirror REFUSAL_STATUS (src/lib/reader-failure.ts)
-- changes in the same commit; CF-REFUSAL-2 holds the two equal in both directions and CF-REFUSAL-6 gives every raised code
-- exactly one class. door_refuse and door_refused read the table and are not redeclared: a reader's refusal raises PGRST with
-- the new status in its detail, a door's shell sets response.status from it.
--   1. door_refusal_status(text) — redeclared WHOLE from 20261120100000 :43, byte for byte but for the new WHEN rows.
--   2. security_lints() — redeclared WHOLE from 20261114070900 :182, byte for byte but for the one term of impersonation_reach
--      that read a grant of `manage` as impersonation: it counts the roles that reach impersonation:use, the permission every
--      impersonation door asks (DEC-466: a grant of manage answers only when manage is asked).
-- Proofs on scratch rows under a sentinel rollback. Law 11, law 12, CF-SQL-1.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.door_refusal_status(text)', '4be1958d30d962ec9e39d956c1a922b8'],
    ['public.security_lints()', '1b3036a78c88863f09752ef1592a901c']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261125170000') THEN
    RAISE EXCEPTION 'cursor-bundle-7a file B: the mark 20261125170000 (file A) must be applied first';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B: the live % is not the body this file was built from (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. door_refusal_status (whole, with the two classes)
CREATE OR REPLACE FUNCTION public.door_refusal_status(p_code text)
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path = public
AS $$
  SELECT CASE p_code
           WHEN 'notSignedIn' THEN '401'
           WHEN 'permissionDenied' THEN '403'
           WHEN 'accountDeactivated' THEN '403'
           WHEN 'stepUpRequired' THEN '428'
           WHEN 'rateLimited' THEN '429'
           WHEN 'attributeNotFound' THEN '404'
           WHEN 'categoryNotFound' THEN '404'
           WHEN 'changeGone' THEN '404'
           WHEN 'listingNotAvailable' THEN '404'
           WHEN 'listingNotFound' THEN '404'
           WHEN 'locationMissing' THEN '404'
           WHEN 'noActiveSession' THEN '404'
           WHEN 'noProfile' THEN '404'
           WHEN 'notYourListing' THEN '404'
           WHEN 'notYours' THEN '404'
           WHEN 'overrideNotFound' THEN '404'
           WHEN 'ownerDeleted' THEN '404'
           WHEN 'parentMissing' THEN '404'
           WHEN 'photoGone' THEN '404'
           WHEN 'photoNotFound' THEN '404'
           WHEN 'priceNotFound' THEN '404'
           WHEN 'reviewGone' THEN '404'
           WHEN 'unknownAttribute' THEN '404'
           WHEN 'unknownBatch' THEN '404'
           WHEN 'unknownCategory' THEN '404'
           WHEN 'unknownCountry' THEN '404'
           WHEN 'unknownEntity' THEN '404'
           WHEN 'unknownFeature' THEN '404'
           WHEN 'unknownKey' THEN '404'
           WHEN 'unknownPackage' THEN '404'
           WHEN 'unknownPermission' THEN '404'
           WHEN 'unknownPointer' THEN '404'
           WHEN 'unknownRole' THEN '404'
           WHEN 'unknownTranslation' THEN '404'
           WHEN 'unknownUser' THEN '404'
           WHEN 'unknownVersion' THEN '404'
           WHEN 'alreadyActive' THEN '409'
           WHEN 'alreadyLinked' THEN '409'
           WHEN 'alreadyReported' THEN '409'
           WHEN 'batchAlreadyUndone' THEN '409'
           WHEN 'categoryInactive' THEN '409'
           WHEN 'draftNotEdited' THEN '409'
           WHEN 'illegalTransition' THEN '409'
           WHEN 'importRunning' THEN '409'
           WHEN 'inReview' THEN '409'
           WHEN 'languagePublished' THEN '409'
           WHEN 'listingChanged' THEN '409'
           WHEN 'listingNotEditable' THEN '409'
           WHEN 'listingRemoved' THEN '409'
           WHEN 'notADraft' THEN '409'
           WHEN 'notCopied' THEN '409'
           WHEN 'notDraft' THEN '409'
           WHEN 'notInForce' THEN '409'
           WHEN 'notLive' THEN '409'
           WHEN 'notPaused' THEN '409'
           WHEN 'notPublished' THEN '409'
           WHEN 'nothingToUndo' THEN '409'
           WHEN 'parentInactive' THEN '409'
           WHEN 'photoRemovalFinal' THEN '409'
           WHEN 'photosSoonNotEditable' THEN '409'
           WHEN 'pinNotEditable' THEN '409'
           WHEN 'priceEnded' THEN '409'
           WHEN 'renewFirst' THEN '409'
           WHEN 'seasonEnded' THEN '409'
           WHEN 'sessionActive' THEN '409'
           ELSE '400'
         END
$$;

COMMENT ON FUNCTION public.door_refusal_status(text) IS
  'F1-7c / INC-1287 (DEC-333): the one table from a refusal''s code to its HTTP status — notSignedIn 401, permissionDenied 403, accountDeactivated 403, stepUpRequired 428, rateLimited 429; GONE 404 (the row the caller named is not there or not theirs to see); CHANGED 409 (the row is there but its state now forbids the action); otherwise 400. Read by door_refused (a door''s shell) and door_refuse (a reader''s refusal); mirrored by REFUSAL_STATUS in src/lib/reader-failure.ts (CF-REFUSAL-2) with every raised code in one class (CF-REFUSAL-6).';
REVOKE ALL ON FUNCTION public.door_refusal_status(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.door_refusal_status(text) TO service_role;

-- ------------------------------------------------------------ 2. security_lints (whole from 20261114070900 :182)
CREATE OR REPLACE FUNCTION public.security_lints()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $sl$
  SELECT jsonb_build_array(
    jsonb_build_object('name', 'rls_disabled_in_public', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind = 'r' AND NOT c.relrowsecurity)),
    jsonb_build_object('name', 'security_definer_view', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = c.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_class'::regclass
        WHERE n.nspname = 'public' AND c.relkind = 'v' AND dep.objid IS NULL
          AND NOT (lower(COALESCE(c.reloptions::text, '{}'))::text[]
                   && ARRAY['security_invoker=1','security_invoker=true','security_invoker=yes','security_invoker=on']))),
    jsonb_build_object('name', 'function_executable_by_anon', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND pg_catalog.has_function_privilege('anon', p.oid, 'EXECUTE'))),
    jsonb_build_object('name', 'function_search_path_mutable', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
         LEFT JOIN pg_catalog.pg_depend dep ON dep.objid = p.oid AND dep.deptype = 'e'
              AND dep.classid = 'pg_catalog.pg_proc'::regclass
        WHERE n.nspname = 'public' AND dep.objid IS NULL
          AND NOT EXISTS (SELECT 1 FROM unnest(COALESCE(p.proconfig, '{}')) cfg WHERE cfg LIKE 'search_path=%'))),
    jsonb_build_object('name', 'table_writable_by_client', 'level', 'WARN', 'count',
      (SELECT count(*)::int FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind IN ('r','p')
          AND EXISTS (SELECT 1 FROM unnest(ARRAY['anon','authenticated']) r(role),
                                    unnest(ARRAY['INSERT','UPDATE','DELETE','TRUNCATE']) v(priv)
                       WHERE pg_catalog.has_table_privilege(r.role, c.oid, v.priv)
                          OR (v.priv IN ('INSERT','UPDATE')
                              AND pg_catalog.has_any_column_privilege(r.role, c.oid, v.priv))))),
    jsonb_build_object('name', 'impersonation_reach', 'level', 'ERROR', 'count',
      (SELECT count(*)::int FROM public.roles ro
        WHERE ro.name <> 'super_admin'
          AND EXISTS (SELECT 1 FROM public.role_permissions rp
                        JOIN public.permissions p ON p.id = rp.permission_id
                        JOIN public.resources r ON r.id = p.resource_id
                       WHERE rp.role_id IN (SELECT public.get_role_hierarchy(ro.id))
                         AND r.name = 'impersonation' AND p.action = 'use')))
  );
$sl$;

REVOKE ALL ON FUNCTION public.security_lints() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.security_lints() TO service_role;

-- ------------------------------------------------------------ PROOFS (scratch rows only, rolled back by the sentinel)
--   (a) the two bodies are this file's, with their headers, closed to browser roles and held by the service role;
--   (b) the table: every GONE code answers 404, every CHANGED code 409, the gate's five their statuses, every borderline
--       code and a code with no row 400;
--   (c) a reader's refusal (door.outer = reader) of a GONE and a CHANGED code raises PGRST with the new status in its detail;
--   (d) a door's shell (door_refused) sets response.status to the class's status and meters the refusal;
--   (e) security_lints(): six names and levels in order; impersonation_reach counts a scratch role granted impersonation:use
--       and not one granted only impersonation:manage.
DO $proof$
DECLARE
  v_gone    text[] := ARRAY[
      'attributeNotFound', 'categoryNotFound', 'changeGone', 'listingNotAvailable',
      'listingNotFound', 'locationMissing', 'noActiveSession', 'noProfile',
      'notYourListing', 'notYours', 'overrideNotFound', 'ownerDeleted',
      'parentMissing', 'photoGone', 'photoNotFound', 'priceNotFound',
      'reviewGone', 'unknownAttribute', 'unknownBatch', 'unknownCategory',
      'unknownCountry', 'unknownEntity', 'unknownFeature', 'unknownKey',
      'unknownPackage', 'unknownPermission', 'unknownPointer', 'unknownRole',
      'unknownTranslation', 'unknownUser', 'unknownVersion'];
  v_changed text[] := ARRAY[
      'alreadyActive', 'alreadyLinked', 'alreadyReported', 'batchAlreadyUndone',
      'categoryInactive', 'draftNotEdited', 'illegalTransition', 'importRunning',
      'inReview', 'languagePublished', 'listingChanged', 'listingNotEditable',
      'listingRemoved', 'notADraft', 'notCopied', 'notDraft',
      'notInForce', 'notLive', 'notPaused', 'notPublished',
      'nothingToUndo', 'parentInactive', 'photoRemovalFinal', 'photosSoonNotEditable',
      'pinNotEditable', 'priceEnded', 'renewFirst', 'seasonEnded',
      'sessionActive'];
  v_other   text[] := ARRAY[
      'unknownCurrency', 'unknownLevel', 'unknownReach', 'unknownLink',
      'aliasTaken', 'labelTaken', 'duplicateKey', 'duplicateCategory',
      'translationExists', 'slugTaken', 'overlappingWindow', 'translationFlagged',
      'notFullyApproved', 'priceInUse', 'deleteActive', 'levelNotAvailable',
      'notOffered',
      'badValue', 'neverRaisedHere'];
  v_gate    text[][] := ARRAY[
    ['notSignedIn', '401'], ['permissionDenied', '403'], ['accountDeactivated', '403'], ['stepUpRequired', '428'],
    ['rateLimited', '429']];
  v_pairs   text[][] := ARRAY[
    ['public.door_refusal_status(text)', '696524cf8cb7bbc4be40ec8d37afa8d8', 's', 'f', '{search_path=public}'],
    ['public.security_lints()', '99928a6398666ba86bea2593d1f4607f', 's', 't', '{"search_path=public, pg_catalog"}']];
  v_tag     text := 'e2e-mig-b7a-b-' || substr(gen_random_uuid()::text, 1, 8);
  v_code    text;
  v_want    text;
  v_state   text;
  v_msg     text;
  v_detail  text;
  v_lints   jsonb;
  v_res     uuid;
  v_perm    uuid;
  v_role_u  uuid;
  v_role_m  uuid;
  v_before  integer;
  v_count   integer;
  i         integer;
BEGIN
  -- (a)
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) IS DISTINCT FROM v_pairs[i][2] OR p.provolatile::text <> v_pairs[i][3]
               OR p.prosecdef::text <> v_pairs[i][4]::boolean::text OR p.proconfig::text <> v_pairs[i][5]
          FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_pairs[i][1]::regprocedure)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_pairs[i][1]::regprocedure, 'EXECUTE')
       OR has_function_privilege('authenticated', v_pairs[i][1]::regprocedure, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_pairs[i][1]::regprocedure, 'EXECUTE') THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (a): %''s body, header or grants differ', v_pairs[i][1];
    END IF;
  END LOOP;

  -- (b)
  FOREACH v_code IN ARRAY v_gone LOOP
    IF public.door_refusal_status(v_code) IS DISTINCT FROM '404' THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (b): the gone code % answered %', v_code, public.door_refusal_status(v_code);
    END IF;
  END LOOP;
  FOREACH v_code IN ARRAY v_changed LOOP
    IF public.door_refusal_status(v_code) IS DISTINCT FROM '409' THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (b): the changed code % answered %', v_code, public.door_refusal_status(v_code);
    END IF;
  END LOOP;
  FOREACH v_code IN ARRAY v_other LOOP
    IF public.door_refusal_status(v_code) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (b): the code % answered %, not 400', v_code, public.door_refusal_status(v_code);
    END IF;
  END LOOP;
  FOR i IN 1..array_length(v_gate, 1) LOOP
    IF public.door_refusal_status(v_gate[i][1]) IS DISTINCT FROM v_gate[i][2] THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (b): % answered %', v_gate[i][1], public.door_refusal_status(v_gate[i][1]);
    END IF;
  END LOOP;
  IF array_length(v_gone, 1) <> 31 OR array_length(v_changed, 1) <> 29
     OR (SELECT count(DISTINCT c) FROM unnest(v_gone || v_changed) c) <> 60 THEN
    RAISE EXCEPTION 'cursor-bundle-7a file B proof (b): the classes are not 31 gone and 29 changed codes, each in one class';
  END IF;

  BEGIN
    -- (c) a reader's refusal: PGRST, the message the body PostgREST answers, the detail the new status
    PERFORM set_config('door.outer', 'reader', true);
    FOR i IN 1..2 LOOP
      v_code := CASE i WHEN 1 THEN 'listingNotFound' ELSE 'listingChanged' END;
      v_state := NULL;
      BEGIN
        PERFORM public.door_refuse(v_code, 'scratch');
      EXCEPTION WHEN others THEN
        GET STACKED DIAGNOSTICS v_state = RETURNED_SQLSTATE, v_msg = MESSAGE_TEXT, v_detail = PG_EXCEPTION_DETAIL;
      END;
      IF v_state IS DISTINCT FROM 'PGRST'
         OR v_msg::jsonb IS DISTINCT FROM jsonb_build_object('code', 'P0D01', 'message', v_code || ':scratch')
         OR v_detail::jsonb IS DISTINCT FROM jsonb_build_object('status', CASE i WHEN 1 THEN 404 ELSE 409 END, 'headers', '{}'::jsonb) THEN
        RAISE EXCEPTION 'cursor-bundle-7a file B proof (c): the reader''s % raised % / % / %', v_code, v_state, v_msg, v_detail;
      END IF;
    END LOOP;
    PERFORM set_config('door.outer', '', true);

    -- (d) a door's shell sets the status and meters the refusal (no dial: nothing is counted again)
    FOR i IN 1..3 LOOP
      v_code := CASE i WHEN 1 THEN 'listingNotFound' WHEN 2 THEN 'listingChanged' ELSE 'badValue' END;
      PERFORM set_config('response.status', '', true);
      PERFORM public.door_refused(v_tag || '-door', NULL, v_code || ':scratch');
      v_want := CASE i WHEN 1 THEN '404' WHEN 2 THEN '409' ELSE '400' END;
      IF current_setting('response.status', true) IS DISTINCT FROM v_want THEN
        RAISE EXCEPTION 'cursor-bundle-7a file B proof (d): the shell answered % for %', current_setting('response.status', true), v_code;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM public.door_refusals r WHERE r.door = v_tag || '-door' AND r.code = v_code AND r.count = 1) THEN
        RAISE EXCEPTION 'cursor-bundle-7a file B proof (d): the shell did not meter %', v_code;
      END IF;
    END LOOP;

    -- (e) security_lints: the lint reads impersonation:use, not impersonation:manage
    v_lints := public.security_lints();
    IF (SELECT array_agg(e ->> 'name' ORDER BY ord) FROM jsonb_array_elements(v_lints) WITH ORDINALITY AS t(e, ord))
       IS DISTINCT FROM ARRAY['rls_disabled_in_public', 'security_definer_view', 'function_executable_by_anon',
                              'function_search_path_mutable', 'table_writable_by_client', 'impersonation_reach'] THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (e): the lint names changed: %', v_lints;
    END IF;
    v_before := (SELECT (e ->> 'count')::integer FROM jsonb_array_elements(public.security_lints()) e WHERE e ->> 'name' = 'impersonation_reach');
    SELECT id INTO v_res FROM public.resources WHERE name = 'impersonation';
    IF v_res IS NULL THEN
      INSERT INTO public.resources (name, description) VALUES ('impersonation', v_tag) RETURNING id INTO v_res;
    END IF;
    INSERT INTO public.permissions (resource_id, action, requires_step_up)
    VALUES (v_res, 'manage', false) ON CONFLICT (resource_id, action) DO NOTHING;
    INSERT INTO public.permissions (resource_id, action, requires_step_up)
    VALUES (v_res, 'use', false) ON CONFLICT (resource_id, action) DO NOTHING;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-manage-only', v_tag) RETURNING id INTO v_role_m;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_m, p.id FROM public.permissions p WHERE p.resource_id = v_res AND p.action = 'manage';
    v_count := (SELECT (e ->> 'count')::integer FROM jsonb_array_elements(public.security_lints()) e WHERE e ->> 'name' = 'impersonation_reach');
    IF v_count IS DISTINCT FROM v_before THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (e): a role holding only impersonation:manage was counted (% to %)', v_before, v_count;
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-use', v_tag) RETURNING id INTO v_role_u;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_u, p.id FROM public.permissions p WHERE p.resource_id = v_res AND p.action = 'use';
    v_count := (SELECT (e ->> 'count')::integer FROM jsonb_array_elements(public.security_lints()) e WHERE e ->> 'name' = 'impersonation_reach');
    IF v_count IS DISTINCT FROM v_before + 1 THEN
      RAISE EXCEPTION 'cursor-bundle-7a file B proof (e): a role holding impersonation:use was not counted (% to %)', v_before, v_count;
    END IF;

    RAISE EXCEPTION 'b7a-b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'b7a-b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('door.outer', '', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261125170100') ON CONFLICT DO NOTHING;
