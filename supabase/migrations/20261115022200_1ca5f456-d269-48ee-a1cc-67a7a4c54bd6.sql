-- e2e-areas: admin-categories

-- Foundations 1, turn F1-4a, part 9 of 19 — THE CATEGORY PICTURE DOORS ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_set_category_images and
-- admin_accept_category_image are redeclared WHOLE from their last
-- declarations (live md5 checked). Each gate becomes ONE door_context('staff', categories:<its action>, staff_config,
-- global) and the shell; refusal sentences and console keys become door_refuse codes (unknownCategory, acceptNoImage). images void → {ok:true}, accept
-- timestamptz → {ok:true, accepted_at}: DROP + CREATE, grants restated. Proofs on
-- scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_set_category_images(uuid,text,text,text,text)', 'c7efebd5c561ff0a5c247eb16c7521ed'],
    ['public.admin_accept_category_image(uuid)', 'e5bc735c0e15c8c38272413fae221d40']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040700') THEN
    RAISE EXCEPTION 'F1-4a part 9: part 8 (b480f0e4) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 9: a door mechanism function is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 9: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_set_category_images (whole from 20260904050152 :55; the gate on door_context, the codes and the shell; jsonb)
DROP FUNCTION public.admin_set_category_images(uuid, text, text, text, text);
CREATE FUNCTION public.admin_set_category_images(
  p_id uuid,
  p_image_url text,
  p_image_thumb_url text,
  p_og_image_url text,
  p_generation_prompt text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_old jsonb;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'assets', 'staff_config', NULL, 'global');

  SELECT jsonb_build_object(
           'image_url', c.image_url,
           'image_thumb_url', c.image_thumb_url,
           'og_image_url', c.og_image_url,
           'image_generation_prompt', c.image_generation_prompt,
           'image_accepted_at', c.image_accepted_at)
    INTO v_old
    FROM public.categories c
   WHERE c.id = p_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownCategory'); END IF;

  UPDATE public.categories
     SET image_url = p_image_url,
         image_thumb_url = p_image_thumb_url,
         og_image_url = p_og_image_url,
         image_generation_prompt = p_generation_prompt,
         -- C5g PART C — a NEW generation is not the accepted one.
         image_accepted_at = NULL,
         updated_at = now()
   WHERE id = p_id;

  PERFORM public.log_audit('category.set_images', 'categories', p_id::text,
    jsonb_build_object(
      'old', v_old,
      'new', jsonb_build_object(
        'image_url', p_image_url,
        'image_thumb_url', p_image_thumb_url,
        'og_image_url', p_og_image_url,
        'image_generation_prompt', p_generation_prompt,
        'image_accepted_at', NULL)));
  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_set_category_images', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) IS
  'F1-4a on the door shell (DEC-333): stores a category''s picture addresses behind door_context(staff, categories:assets, staff_config, global); refuses unknownCategory; audits category.set_images; answers {ok:true}.';
REVOKE ALL ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) TO authenticated;

-- ------------------------------------------------------------ 2. admin_accept_category_image (whole from 20260904050152 :10; the gate on door_context, the codes and the shell; jsonb)
DROP FUNCTION public.admin_accept_category_image(uuid);
CREATE FUNCTION public.admin_accept_category_image(p_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_old jsonb;
  v_now timestamptz;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'assets', 'staff_config', NULL, 'global');

  SELECT jsonb_build_object(
           'image_url', c.image_url,
           'image_accepted_at', c.image_accepted_at)
    INTO v_old
    FROM public.categories c
   WHERE c.id = p_id;
  IF NOT FOUND THEN PERFORM public.door_refuse('unknownCategory'); END IF;

  IF (v_old ->> 'image_url') IS NULL THEN
    PERFORM public.door_refuse('acceptNoImage');
  END IF;

  v_now := now();
  UPDATE public.categories
     SET image_accepted_at = v_now,
         updated_at = v_now
   WHERE id = p_id;

  PERFORM public.log_audit('category.accept_image', 'categories', p_id::text,
    jsonb_build_object('old', v_old,
                       'new', jsonb_build_object('image_accepted_at', v_now)));
  RETURN jsonb_build_object('ok', true, 'accepted_at', v_now);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_accept_category_image', 'staff_config', SQLERRM);
END $function$;
COMMENT ON FUNCTION public.admin_accept_category_image(uuid) IS
  'F1-4a on the door shell (DEC-333): accepts a category''s picture behind door_context(staff, categories:assets, staff_config, global); refuses unknownCategory / acceptNoImage; audits category.accept_image; answers {ok:true, accepted_at}.';
REVOKE ALL ON FUNCTION public.admin_accept_category_image(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_accept_category_image(uuid) TO authenticated;

-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts: the 2 doors VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated, never anon
--     or PUBLIC; every body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied for a caller without the door's permission (403) and
--     notSignedIn for no caller (401), none spending staff_config, writing or auditing;
-- (c) each code, every earlier check cleared, the exact message, a 400, nothing written; each success with its row
--     and audit line; staff_config counted once per call past the gates; every refusal metered in door_refusals.
DO $proof$
DECLARE
  v_hex     text := replace(gen_random_uuid()::text, '-', '');
  v_tag     text;
  v_staff   uuid := gen_random_uuid();
  v_plain   uuid := gen_random_uuid();
  v_deact   uuid := gen_random_uuid();
  v_lim     uuid := gen_random_uuid();
  v_sess    uuid := gen_random_uuid();
  v_sess_l  uuid := gen_random_uuid();
  v_role_s  uuid;
  v_role_l  uuid;
  v_root    uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_d       uuid;
  v_cc      uuid;
  v_r2      uuid;
  v_pa      uuid;
  v_pb      uuid;
  v_pa2     uuid;
  v_pd      uuid;
  v_x       uuid;
  v_y       uuid;
  v_z       uuid;
  v_sel     uuid;
  v_dep     uuid;
  v_lx      uuid;
  v_ly      uuid;
  v_lsel    uuid;
  v_ldep    uuid;
  v_batch   uuid;
  v_rows    jsonb;
  v_defs    jsonb;
  v_links   jsonb;
  v_answer  jsonb;
  v_count   integer;
  v_refused bigint;
  v_msg     text;
  v_state   text;
  v_fn      regprocedure;
  v_pairs   text[][];
  i         integer;
BEGIN
  v_tag := 'e2e-mig-f14a9-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_set_category_images(uuid,text,text,text,text)', '5f3f29967f3b997f7ae8c69c75c617e0'],
    ['public.admin_accept_category_image(uuid)', '2d054ec3738209abaa78ffedfa5bdbd4']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 9 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 9 proof (a): %''s body differs from this file', v_fn;
    END IF;
  END LOOP;

  BEGIN
    PERFORM set_config('request.jwt.claims', '{}', true);
    INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data, aud, role, created_at, updated_at) VALUES
      (v_staff, v_tag || '-staff@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_plain, v_tag || '-plain@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_deact, v_tag || '-deact@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now()),
      (v_lim, v_tag || '-lim@example.invalid', NULL, '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at)
    SELECT gen_random_uuid(), u, v_tag || '-f', 'totp', 'verified', now(), now() FROM unnest(ARRAY[v_staff, v_lim]) u;
    INSERT INTO auth.sessions (id, user_id, created_at, updated_at, aal) VALUES (v_sess, v_staff, now(), now(), 'aal2'), (v_sess_l, v_lim, now(), now(), 'aal2');
    INSERT INTO auth.mfa_amr_claims (id, session_id, created_at, updated_at, authentication_method)
    VALUES (gen_random_uuid(), v_sess, now(), now(), 'totp'), (gen_random_uuid(), v_sess_l, now(), now(), 'totp');
    UPDATE public.profiles SET account_status = 'deactivated'
     WHERE user_id = v_deact
       AND EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_deact AND u.email LIKE 'e2e-mig-%');
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-staff', v_tag) RETURNING id INTO v_role_s;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_s, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'restructure', 'assets', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_s) <> 6 THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: a categories permission of the lim role is not declared';
    END IF;
    INSERT INTO public.user_roles (user_id, role_id, scope_type)
    VALUES (v_staff, v_role_s, 'global'), (v_deact, v_role_s, 'global'), (v_lim, v_role_l, 'global');
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag, v_tag) RETURNING id INTO v_root;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (NULL, v_root, 0);
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' a', v_tag || '-a') RETURNING id INTO v_a;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_a, 0) RETURNING id INTO v_pa;
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' b', v_tag || '-b') RETURNING id INTO v_b;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_b, 1) RETURNING id INTO v_pb;
    INSERT INTO public.categories (name_en, slug, is_active) VALUES (v_tag || ' c', v_tag || '-c', false) RETURNING id INTO v_c;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_c, 2);
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' d', v_tag || '-d') RETURNING id INTO v_d;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_c, v_d, 0) RETURNING id INTO v_pd;
    INSERT INTO public.categories (name_en, slug) VALUES (v_tag || ' r2', v_tag || '-r2') RETURNING id INTO v_r2;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_r2, 3);
    INSERT INTO public.categories (name_en, slug, is_catchall) VALUES (v_tag || ' cc', v_tag || '-cc', true) RETURNING id INTO v_cc;
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_root, v_cc, 1000000);
    INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_r2, v_a, 0) RETURNING id INTO v_pa2;
    IF NOT (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa)
       OR (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa2) THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: the scratch tree''s home pointers differ';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_category_images', 'admin_accept_category_image');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_set_category_images(v_c, 'https://example.invalid/' || v_tag || '.webp', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_set_category_images(v_c, 'https://example.invalid/' || v_tag || '.webp', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (b) a caller without the permission (admin_set_category_images) answered %', v_answer;
    END IF;
    v_answer := public.admin_accept_category_image(v_a);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (b) a caller without the permission (admin_accept_category_image) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_set_category_images(v_c, 'https://example.invalid/' || v_tag || '.webp', NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: the dial staff_config counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: the dial staff_config counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (((SELECT image_url FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_c) IS NULL)
        AND ((SELECT image_accepted_at FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) IS NULL)
        AND NOT EXISTS (SELECT 1 FROM public.audit_log WHERE actor_id IN (v_deact, v_plain))) THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_category_images', 'admin_accept_category_image')) IS DISTINCT FROM v_refused + 4 THEN
      RAISE EXCEPTION 'F1-4a part 9 (b) proof: door_refusals did not meter the 4 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_set_category_images', 'admin_accept_category_image');
    v_answer := public.admin_set_category_images(gen_random_uuid(), NULL, NULL, NULL, NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) pictures of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_set_category_images(v_a, NULL, NULL, NULL, NULL);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) pictures cleared did not answer ok';
    END IF;
    v_answer := public.admin_set_category_images(v_c, 'https://example.invalid/' || v_tag || '.webp', NULL, NULL, NULL);
    IF NOT (v_answer = '{"ok": true}'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) pictures stored did not answer ok';
    END IF;
    IF NOT ((SELECT image_url FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_c) = 'https://example.invalid/' || v_tag || '.webp') THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) the stored picture differs';
    END IF;
    v_answer := public.admin_accept_category_image(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownCategory' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) accept of an unknown category answered %', v_answer;
    END IF;
    v_answer := public.admin_accept_category_image(v_a);
    IF v_answer ->> 'message' IS DISTINCT FROM 'acceptNoImage' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) accept with no picture answered %', v_answer;
    END IF;
    IF NOT ((SELECT image_accepted_at FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_a) IS NULL) THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) a refused accept wrote a stamp';
    END IF;
    v_answer := public.admin_accept_category_image(v_c);
    IF NOT (v_answer ->> 'ok' = 'true' AND (v_answer ->> 'accepted_at')::timestamptz = (SELECT image_accepted_at FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_c)) THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: (c) accept did not answer the stamp it wrote';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.set_images', 'category.accept_image')) <> 3 THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: the staff successes wrote % audit lines (expected 3)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category.set_images', 'category.accept_image'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 6 THEN
      RAISE EXCEPTION 'F1-4a part 9 proof: the dial staff_config counted % for (c) the staff writer (expected %)', v_count, 6;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_set_category_images', 'admin_accept_category_image')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 9 (c) proof: door_refusals did not meter the 3 refusals';
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a9-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a9-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040800') ON CONFLICT DO NOTHING;
