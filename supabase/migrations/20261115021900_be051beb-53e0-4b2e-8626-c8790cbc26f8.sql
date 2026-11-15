-- e2e-areas: admin-categories, admin-imports

-- Foundations 1, turn F1-4a, part 6 of 19 — THE CATEGORY IMPORT UNDO ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_undo_category_import is
-- redeclared WHOLE from its LIVE body (its literal declaration 20261029001111 :514 plus the dial line D1 M6c computed
-- into it, 20261029024207; live md5 checked). Its gate becomes ONE door_context('staff', categories:import,
-- import_undo, global) and the shell; 'unknown import batch' becomes unknownBatch; the category doors it called
-- become their cores (parts 1 to 4), so a refusal anywhere in the undo raises through this door's shell and nothing
-- is undone; its 'am' literals become language_code('pair'). Its answer is unchanged. Proofs on scratch rows under a
-- sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_undo_category_import(uuid)', '9a2f2192ba818430a5b979c2ae94dd84']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040400') THEN
    RAISE EXCEPTION 'F1-4a part 6: part 5 (c4b183c2) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL
     OR to_regprocedure('public.admin_reactivate_category_core(uuid)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 6: a door mechanism function or a part 2 core is missing';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('import_undo')) <> 1 THEN
    RAISE EXCEPTION 'F1-4a part 6: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 6: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_undo_category_import (whole from live = literal 20261029001111 :514 + its computed gate; the gate on door_context and the shell; the codes; the cores; the pair language by role)
CREATE OR REPLACE FUNCTION public.admin_undo_category_import(p_batch uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_rev record;
  v_id uuid;
  v_parent uuid;
  v_prev jsonb;
  v_restored int := 0;
  v_pp record;
  v_am jsonb;
  v_ord jsonb := '[]'::jsonb;
  v_ids uuid[];
  v_par record;
  v_sec text[];
  v_recreated boolean;
  v_link jsonb;
  v_lattr uuid;
  v_links_restored int := 0;
  v_links_skipped jsonb := '[]'::jsonb;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'import', 'import_undo', NULL, 'global');


  IF NOT EXISTS (SELECT 1 FROM public.category_import_revisions r WHERE r.batch_id = p_batch) THEN
    PERFORM public.door_refuse('unknownBatch');
  END IF;

  -- INC-481 (M12) — the walk follows cat_import_undo_order: non-creations first,
  -- then creations from the fewest descendants up, so a created child is always
  -- removed before its created parent. Ordering by the random uuid id was not
  -- newest-first and let the delete door refuse a parent that still had a child.
  FOR v_rev IN SELECT r.* FROM public.category_import_revisions r
                 JOIN public.cat_import_undo_order(p_batch) o ON o.revision_id = r.id
                ORDER BY o.pos
  LOOP
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_rev.entity_key;
    v_prev := v_rev.prev;

    IF v_rev.action = 'create' THEN
      IF v_id IS NOT NULL THEN
        -- IE-4a — the pending am row this batch created leaves with it.
        DELETE FROM public.entity_translations
         WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
        IF (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
          PERFORM public.admin_retire_category_core(v_id, NULL);
        END IF;
        PERFORM public.admin_delete_category_core(v_id, v_rev.entity_key);
        v_restored := v_restored + 1;
      END IF;
    ELSIF v_prev IS NOT NULL THEN
      v_recreated := (v_id IS NULL);
      IF v_id IS NULL THEN
        SELECT c.id INTO v_parent FROM public.categories c
         WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
        v_id := public.admin_create_category_core(
          v_prev->>'name_en', v_rev.entity_key, NULLIF(v_prev->>'icon',''), v_parent,
          public.cat_bool(v_prev->>'allow_listings', true),
          public.cat_bool(v_prev->>'price_enabled', true),
          public.cat_int(v_prev->>'expiry_days'),
          public.cat_ts(v_prev->>'visible_from'), public.cat_ts(v_prev->>'visible_until'));
      ELSE
        PERFORM public.admin_update_category_core(v_id, v_prev->>'name_en',
          NULLIF(v_prev->>'icon',''), NULL,
          public.cat_bool(v_prev->>'allow_listings', true),
          public.cat_bool(v_prev->>'price_enabled', true),
          public.cat_int(v_prev->>'expiry_days'));
        PERFORM public.admin_set_category_window_core(v_id,
          public.cat_ts(v_prev->>'visible_from'), public.cat_ts(v_prev->>'visible_until'));
      END IF;

      -- DEC-052 / DEC-067 — the three cells come back exactly as they stood.
      IF v_prev ? 'capabilities' OR v_prev ? 'default_price_period'
         OR v_prev ? 'price_period_locked' THEN
        UPDATE public.categories SET
          capabilities = CASE WHEN v_prev ? 'capabilities'
            THEN ARRAY(SELECT lower(btrim(x))
                         FROM unnest(string_to_array(COALESCE(v_prev->>'capabilities',''), '|')) x
                        WHERE btrim(x) <> '')
            ELSE capabilities END,
          default_price_period = COALESCE(NULLIF(v_prev->>'default_price_period',''),
                                          default_price_period),
          price_period_locked = CASE WHEN v_prev ? 'price_period_locked'
            THEN public.cat_bool(v_prev->>'price_period_locked', price_period_locked)
            ELSE price_period_locked END,
          updated_at = now()
         WHERE id = v_id;
      END IF;

      PERFORM public.admin_set_country_exclusions_core(v_id,
        ARRAY(SELECT upper(x) FROM unnest(public.cat_pipe(v_prev->>'excluded_country_codes')) x));

      -- IE-4a — restore the CAPTURED am state exactly: the row that stood here
      -- (value, status, machine) comes back as it was, and a row the batch
      -- itself created where there was none is removed again. Restoring
      -- through the human writer would silently demote an approved row, so the
      -- restore writes the captured tuple and audits it.
      v_am := v_prev->'am_state';
      IF v_am IS NOT NULL AND jsonb_typeof(v_am) = 'object' THEN
        INSERT INTO public.entity_translations
          (entity_type, entity_id, field, lang_code, value, status, machine, updated_by)
        VALUES ('category', v_id, 'name', public.language_code('pair'), v_am->>'value',
                COALESCE(v_am->>'status', 'edited'),
                COALESCE((v_am->>'machine')::boolean, false), auth.uid())
        ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
          SET value = EXCLUDED.value, status = EXCLUDED.status,
              machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
              updated_at = now();
        PERFORM public.log_audit('entity_translation.undo_restore', 'categories', v_id::text,
          jsonb_build_object('batch_id', p_batch, 'lang', public.language_code('pair'), 'field', 'name',
                             'restored', v_am));
      ELSIF v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
        DELETE FROM public.entity_translations
         WHERE entity_type = 'category' AND entity_id = v_id
           AND field = 'name' AND lang_code = public.language_code('pair');
        PERFORM public.log_audit('entity_translation.undo_remove', 'categories', v_id::text,
          jsonb_build_object('batch_id', p_batch, 'lang', public.language_code('pair'), 'field', 'name'));
      ELSIF COALESCE(v_prev->>'name_am', '') <> '' THEN
        -- a pre-IE-4a batch carries no captured state: restore the exported value
        PERFORM public.admin_save_entity_translation_core('category', v_id, 'name', public.language_code('pair'),
                                                     v_prev->>'name_am');
      END IF;

      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
      IF v_pp.pointer_id IS NOT NULL AND v_pp.parent_id IS DISTINCT FROM v_parent THEN
        PERFORM public.admin_move_category_pointer_core(v_pp.pointer_id, v_parent);
      END IF;

      -- INC-199 — the SECONDARY PARENTS of the prior state come back too. An
      -- action row may now carry a secondary-parent change (Pet Services), so
      -- undoing it has to restore the pointer set, not only the fields.
      v_sec := public.cat_pipe(v_prev->>'secondary_parents');
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      PERFORM public.admin_remove_category_pointer_core(p.id)
         FROM public.category_tree_pointers p
         JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = v_id
          AND p.id IS DISTINCT FROM v_pp.pointer_id
          AND NOT (pc.slug = ANY (v_sec));
      PERFORM public.admin_add_category_pointer_core(c.id, v_id)
         FROM public.categories c
        WHERE c.slug = ANY (v_sec)
          AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                           WHERE p.child_id = v_id AND p.parent_id = c.id);

      -- M8a A5 (INC-307) — a recreated category gets back the attribute links
      -- its delete captured; a link whose attribute is gone is skipped and named.
      -- Class rule: an undo restores every dependent row the delete removed, or
      -- says which it cannot.
      IF v_recreated THEN
        FOR v_link IN SELECT value FROM jsonb_array_elements(COALESCE(v_prev->'links', '[]'::jsonb))
        LOOP
          v_lattr := NULL;
          SELECT a.id INTO v_lattr FROM public.attributes a WHERE a.attr_key = v_link->>'attr_key';
          IF v_lattr IS NULL THEN
            v_links_skipped := v_links_skipped || jsonb_build_array(v_link->>'attr_key');
            CONTINUE;
          END IF;
          INSERT INTO public.category_attribute_links
            (category_id, attribute_id, is_required, is_filterable, is_searchable,
             display_order, card_rank, allowed_options, default_value, visible_when)
          VALUES
            (v_id, v_lattr,
             (v_link->>'is_required')::boolean,
             (v_link->>'is_filterable')::boolean,
             (v_link->>'is_searchable')::boolean,
             (v_link->>'display_order')::int,
             (v_link->>'card_rank')::int,
             CASE WHEN jsonb_typeof(v_link->'allowed_options') = 'array'
                  THEN ARRAY(SELECT jsonb_array_elements_text(v_link->'allowed_options')) END,
             CASE WHEN jsonb_typeof(v_link->'default_value') IN ('null') OR NOT (v_link ? 'default_value')
                  THEN NULL ELSE v_link->'default_value' END,
             CASE WHEN jsonb_typeof(v_link->'visible_when') IN ('null') OR NOT (v_link ? 'visible_when')
                  THEN NULL ELSE v_link->'visible_when' END);
          v_links_restored := v_links_restored + 1;
        END LOOP;
      END IF;

      IF public.cat_bool(v_prev->>'is_active', true)
         IS DISTINCT FROM (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
        IF public.cat_bool(v_prev->>'is_active', true) THEN
          PERFORM public.admin_reactivate_category_core(v_id);
        ELSE
          PERFORM public.admin_retire_category_core(v_id, NULL);
        END IF;
      END IF;

      -- INC-187 — the row's PREVIOUS place is collected and applied once per
      -- parent below, so undoing an import restores order as well as fields.
      IF public.cat_int(v_prev->>'display_order') IS NOT NULL THEN
        SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
        v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id,
                                             'ord', public.cat_int(v_prev->>'display_order'));
      END IF;

      v_restored := v_restored + 1;
    END IF;

    UPDATE public.category_import_revisions SET undone_at = now() WHERE id = v_rev.id;
  END LOOP;

  FOR v_par IN SELECT DISTINCT (o->>'parent')::uuid AS parent_id
                 FROM jsonb_array_elements(v_ord) o
  LOOP
    SELECT array_agg(sib.child_id ORDER BY (NOT sib.is_primary), sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order, p.is_primary,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                                AND (o->>'parent')::uuid IS NOT DISTINCT FROM p.parent_id
                              LIMIT 1), p.display_order) AS rank
              FROM public.category_tree_pointers p
             WHERE p.parent_id IS NOT DISTINCT FROM v_par.parent_id) sib;
    IF v_ids IS NOT NULL THEN
      PERFORM public.admin_reorder_categories_core(v_par.parent_id, v_ids);
    END IF;
  END LOOP;

  PERFORM public.log_audit('category_import.undo', 'categories', p_batch::text,
    jsonb_build_object('restored', v_restored, 'links_restored', v_links_restored,
                       'links_skipped', v_links_skipped));

  RETURN jsonb_build_object('restored', v_restored,
                            'links_restored', v_links_restored,
                            'links_skipped', v_links_skipped);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_undo_category_import', 'import_undo', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_undo_category_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_category_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_category_import(uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never
--     anon or PUBLIC; the body this file's (md5).
-- (b) the gates over a scratch batch staff committed: accountDeactivated, permissionDenied (403), notSignedIn (401),
--     none spending import_undo or undoing a row.
-- (c) unknownBatch for a batch that never was (400, counted); a holder of categories:import without
--     categories:restructure is refused permissionDenied by the reactivate core (403) and NOTHING is undone; staff
--     undoes the batch: the created row gone, the retired row active again, one audit line, import_undo counted
--     twice (the unknown batch and the undo) and staff_config not at all.
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
  v_tag := 'e2e-mig-f14a6-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_undo_category_import(uuid)', 'bb0ba487a8021cd357622a9ff7325246']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 6 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 6 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 6 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 6 proof: the scratch tree''s home pointers differ';
    END IF;
    v_rows := jsonb_build_array(
      jsonb_build_object('row', 1, 'category_slug', v_tag || '-n', 'name_en', v_tag || ' n', 'parent_slug', v_tag),
      jsonb_build_object('row', 2, 'category_slug', v_tag || '-b', 'name_en', v_tag || ' b', 'parent_slug', v_tag,
                         'action', 'retire'));
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_batch := (public.admin_commit_category_import(p_rows => v_rows, p_scope => NULL, p_digest => v_tag) ->> 'batch_id')::uuid;
    IF NOT (v_batch IS NOT NULL AND EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-n')) THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the scratch batch did not land';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_undo_category_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_undo_category_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_undo_category_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (b) a caller without the permission (admin_undo_category_import) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_undo_category_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the dial import_undo counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the dial import_undo counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-n') AND NOT (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b)) THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_undo_category_import')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 6 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) the codes; a refused undo undoes nothing
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_undo_category_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_undo_category_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownBatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (c) an unknown batch answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_lim::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_l::text)::text, true);
    v_answer := public.admin_undo_category_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (c) a holder without categories:restructure answered %', v_answer;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-n') AND NOT (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b) AND NOT EXISTS (SELECT 1 FROM public.category_import_revisions WHERE batch_id = v_batch AND undone_at IS NOT NULL)) THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (c) a refused undo undid a row';
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_lim::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the dial import_undo counted % for (c) the refused undo (expected %)', v_count, 0;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_undo_category_import')) IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-4a part 6 (c) proof: door_refusals did not meter the 2 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_undo_category_import(v_batch);
    IF NOT (v_answer ? 'restored') THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (c) the undo answered no restored count';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-n')) THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (c) the created row is still there';
    END IF;
    IF NOT ((SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b)) THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: (c) the retired row is not active again';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category_import.undo')) <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the undo wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category_import.undo'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_undo';
    IF v_count <> 2 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the dial import_undo counted % for (c) the staff undoer (expected %)', v_count, 2;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 6 proof: the dial staff_config counted % for (c) the staff undoer (the cores spend none) (expected %)', v_count, 0;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a6-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a6-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040500') ON CONFLICT DO NOTHING;
