-- e2e-areas: admin-attributes, admin-imports

-- Foundations 1, turn F1-4a, part 17 of 19 — THE ATTRIBUTE IMPORT UNDO ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_undo_attribute_import is
-- redeclared WHOLE from its LIVE body (its literal declaration 20261017093325 :30 plus the dial line D1 M6c computed
-- into it, 20261029024420; live md5 checked). Its gate becomes ONE door_context('staff', categories:import,
-- import_undo, global) and the shell; 'batch id required' becomes required:batch and 'unknown import batch'
-- unknownBatch; its 'am' literals become language_code('pair'). Its answer is unchanged. Proofs on scratch rows under
-- a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_undo_attribute_import(uuid)', '301fb4da41a13aff94df86ba2739b5c2']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115041500') THEN
    RAISE EXCEPTION 'F1-4a part 17: part 16 (05efbf28) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL
     OR to_regprocedure('public.admin_commit_attribute_import(jsonb,jsonb,text,text)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 17: a door mechanism function is missing';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('import_undo')) <> 1 THEN
    RAISE EXCEPTION 'F1-4a part 17: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 17: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_undo_attribute_import (whole from live = literal 20261017093325 :30 + its computed gate; the gate on door_context and the shell; the codes; the pair language by role)
CREATE OR REPLACE FUNCTION public.admin_undo_attribute_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $m8c$
DECLARE
  v_rev        record;
  v_restored   int := 0;
  v_conflicted int := 0;
  v_slug       text;
  v_key        text;
  v_attr       uuid;
  v_cat        uuid;
  v_exists     boolean;
  v_am         jsonb;
BEGIN
  PERFORM public.door_context('staff', 'categories', 'import', 'import_undo', NULL, 'global');

  IF p_batch IS NULL THEN
    PERFORM public.door_refuse('required', 'batch');
  END IF;

  PERFORM 1 FROM public.attribute_import_revisions WHERE batch_id = p_batch LIMIT 1;
  IF NOT FOUND THEN
    PERFORM public.door_refuse('unknownBatch');
  END IF;

  -- DEC-045b — a parent and its dependent can both be CREATIONS of this batch.
  UPDATE public.attributes a
     SET depends_on = NULL
   WHERE a.depends_on IS NOT NULL
     AND a.attr_key IN (SELECT r.entity_key FROM public.attribute_import_revisions r
                         WHERE r.batch_id = p_batch AND r.kind = 'definition'
                           AND r.prev IS NULL AND r.undone_at IS NULL);

  -- LINK PASS A (INC-197) — every rank this undo is about to change is cleared
  -- FIRST, so no restore ever meets a rank still held by another link of the
  -- same category. A changed link whose prev rank differs from its current one
  -- is cleared; an added link about to be deleted is cleared too (its rank can
  -- be the very rank a changed link is going back to).
  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND kind = 'link'
     ORDER BY created_at DESC
  LOOP
    v_slug := split_part(v_rev.entity_key, '|', 1);
    v_key := split_part(v_rev.entity_key, '|', 2);
    SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
    SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
    CONTINUE WHEN v_cat IS NULL OR v_attr IS NULL;

    IF v_rev.prev IS NULL THEN
      UPDATE public.category_attribute_links
         SET card_rank = NULL, fact_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND (card_rank IS NOT NULL OR fact_rank IS NOT NULL);
    ELSE
      UPDATE public.category_attribute_links
         SET card_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND card_rank IS NOT NULL
         AND card_rank IS DISTINCT FROM NULLIF(v_rev.prev->>'card_rank', '')::int;
      -- B19 M2 — the fact rank vacates the same way before the restore.
      UPDATE public.category_attribute_links
         SET fact_rank = NULL, updated_at = now()
       WHERE category_id = v_cat AND attribute_id = v_attr
         AND fact_rank IS NOT NULL
         AND fact_rank IS DISTINCT FROM NULLIF(v_rev.prev->>'fact_rank', '')::smallint;
    END IF;
  END LOOP;

  -- LINK DELETES (INC-197) — the links this batch ADDED go before anything is
  -- restored, exactly as the commit's unlinks sit between its two passes.
  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL AND kind = 'link'
       AND prev IS NULL
     ORDER BY created_at DESC
  LOOP
    v_slug := split_part(v_rev.entity_key, '|', 1);
    v_key := split_part(v_rev.entity_key, '|', 2);
    SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
    SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
    IF v_cat IS NULL OR v_attr IS NULL THEN
      v_conflicted := v_conflicted + 1;
      CONTINUE;
    END IF;

    DELETE FROM public.category_attribute_links
     WHERE category_id = v_cat AND attribute_id = v_attr;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE
                WHEN kind = 'definition' AND prev IS NOT NULL AND post IS NULL THEN 0
                WHEN kind = 'link' THEN 1
                ELSE 2
              END ASC,
              created_at DESC
  LOOP
    IF v_rev.kind = 'definition' THEN
      IF v_rev.prev IS NULL THEN
        IF EXISTS (SELECT 1 FROM public.category_attribute_links l
                     JOIN public.attributes a ON a.id = l.attribute_id
                    WHERE a.attr_key = v_rev.entity_key) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        IF v_attr IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.attributes d WHERE d.depends_on = v_attr
        ) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        IF v_attr IS NOT NULL THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr AND field = 'label';
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', public.language_code('pair'), 'field', 'label'));
        END IF;
        DELETE FROM public.attributes WHERE attr_key = v_rev.entity_key;
      ELSE
        SELECT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_rev.entity_key) INTO v_exists;
        IF v_exists THEN
          UPDATE public.attributes
             SET name_en = v_rev.prev->>'name_en',
                 attr_type = v_rev.prev->>'attr_type',
                 options = CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                 depends_on = (SELECT p.id FROM public.attributes p
                                WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                 -- DEC-050 — the v2 cells come back exactly as they were.
                 unit         = CASE WHEN v_rev.prev ? 'unit'         THEN v_rev.prev->>'unit'         ELSE unit END,
                 unit_am      = CASE WHEN v_rev.prev ? 'unit_am'      THEN v_rev.prev->>'unit_am'      ELSE unit_am END,
                 min_bound    = CASE WHEN v_rev.prev ? 'min_bound'    THEN v_rev.prev->>'min_bound'    ELSE min_bound END,
                 max_bound    = CASE WHEN v_rev.prev ? 'max_bound'    THEN v_rev.prev->>'max_bound'    ELSE max_bound END,
                 decimals     = CASE WHEN v_rev.prev ? 'decimals'     THEN (v_rev.prev->>'decimals')::smallint  ELSE decimals END,
                 format       = CASE WHEN v_rev.prev ? 'format'       THEN v_rev.prev->>'format'       ELSE format END,
                 preset       = CASE WHEN v_rev.prev ? 'preset'       THEN v_rev.prev->>'preset'       ELSE preset END,
                 max_length   = CASE WHEN v_rev.prev ? 'max_length'   THEN (v_rev.prev->>'max_length')::integer ELSE max_length END,
                 help_text_en = CASE WHEN v_rev.prev ? 'help_text_en' THEN v_rev.prev->>'help_text_en' ELSE help_text_en END,
                 help_text_am = CASE WHEN v_rev.prev ? 'help_text_am' THEN v_rev.prev->>'help_text_am' ELSE help_text_am END,
                 updated_at = now()
           WHERE attr_key = v_rev.entity_key;
        ELSE
          INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en, depends_on,
                                         unit, min_bound, max_bound, decimals, format, preset,
                                         max_length, help_text_am, unit_am)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en',
                  (SELECT p.id FROM public.attributes p
                     WHERE p.attr_key = NULLIF(btrim(COALESCE(v_rev.prev->>'depends_on','')), '')),
                  v_rev.prev->>'unit', v_rev.prev->>'min_bound', v_rev.prev->>'max_bound',
                  (v_rev.prev->>'decimals')::smallint, v_rev.prev->>'format', v_rev.prev->>'preset',
                  (v_rev.prev->>'max_length')::integer, v_rev.prev->>'help_text_am',
                  v_rev.prev->>'unit_am');
        END IF;

        SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_rev.entity_key;
        v_am := v_rev.prev->'am_state';
        IF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'object' THEN
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by)
          VALUES ('attribute', v_attr, 'label', public.language_code('pair'), v_am->>'value',
                  COALESCE(v_am->>'status', 'edited'),
                  COALESCE((v_am->>'machine')::boolean, false), auth.uid())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
                updated_at = now();
          PERFORM public.log_audit('entity_translation.undo_restore', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', public.language_code('pair'), 'field', 'label',
                               'restored', v_am));
        ELSIF v_attr IS NOT NULL AND v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
          DELETE FROM public.entity_translations
           WHERE entity_type = 'attribute' AND entity_id = v_attr
             AND field = 'label' AND lang_code = public.language_code('pair');
          PERFORM public.log_audit('entity_translation.undo_remove', 'attributes', v_attr::text,
            jsonb_build_object('batch_id', p_batch, 'lang', public.language_code('pair'), 'field', 'label'));
        END IF;
      END IF;
    ELSE
      -- LINK PASS B (INC-197) — the unlinked links come back and the changed
      -- links go to their full prev state (flags, display_order, card_rank,
      -- allowed_options + default_value since M-MAINT-2 Part B, and the D24
      -- condition since M-MAINT-3b).
      -- Every rank in the way was cleared in Pass A; the added links are gone.
      v_slug := split_part(v_rev.entity_key, '|', 1);
      v_key := split_part(v_rev.entity_key, '|', 2);
      SELECT id INTO v_cat FROM public.categories WHERE slug = v_slug;
      SELECT id INTO v_attr FROM public.attributes WHERE attr_key = v_key;
      IF v_cat IS NULL OR v_attr IS NULL THEN
        v_conflicted := v_conflicted + 1;
        CONTINUE;
      END IF;

      IF v_rev.prev IS NULL THEN
        DELETE FROM public.category_attribute_links
         WHERE category_id = v_cat AND attribute_id = v_attr;
      ELSE
        INSERT INTO public.category_attribute_links
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank,
           fact_rank, allowed_options, default_value, visible_when)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean,
                (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int,
                -- B19 M2 — a revision written before the column restores NULL.
                NULLIF(v_rev.prev->>'fact_rank','')::smallint,
                CASE WHEN v_rev.prev->'allowed_options' IS NULL
                       OR v_rev.prev->'allowed_options' = 'null'::jsonb
                     THEN NULL
                     ELSE ARRAY(SELECT jsonb_array_elements_text(v_rev.prev->'allowed_options')) END,
                CASE WHEN v_rev.prev->'default_value' IS NULL
                       OR v_rev.prev->'default_value' = 'null'::jsonb
                     THEN NULL ELSE v_rev.prev->'default_value' END,
                CASE WHEN v_rev.prev->'visible_when' IS NULL
                       OR v_rev.prev->'visible_when' = 'null'::jsonb
                     THEN NULL ELSE v_rev.prev->'visible_when' END)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
              fact_rank = EXCLUDED.fact_rank,
              allowed_options = EXCLUDED.allowed_options,
              default_value = EXCLUDED.default_value,
              visible_when = EXCLUDED.visible_when,
              updated_at = now();
      END IF;
    END IF;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import_undo', 'attributes', p_batch::text,
    jsonb_build_object('batch_id', p_batch, 'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('batch_id', p_batch, 'restored', v_restored,
                            'conflicted', v_conflicted);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_undo_attribute_import', 'import_undo', SQLERRM);
END $m8c$;
REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_attribute_import(uuid) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never
--     anon or PUBLIC; the body this file's (md5).
-- (b) the gates over a scratch batch staff committed: accountDeactivated, permissionDenied (403), notSignedIn (401),
--     none spending import_undo or undoing a row.
-- (c) required:batch for no batch and unknownBatch for a batch that never was (400, each counted); staff undoes the
--     batch: the definition and its link gone, one audit line, import_undo counted three times.
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
  v_tag := 'e2e-mig-f14a17-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_undo_attribute_import(uuid)', '9cc4cd07f4d32c63daec5be141ef9f45']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 17 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 17 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 17 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 17 proof: the scratch tree''s home pointers differ';
    END IF;
    v_defs := jsonb_build_array(jsonb_build_object('row', 1, 'attribute_key', v_tag || '-k', 'label_en', 'K', 'type', 'text'));
    v_links := jsonb_build_array(jsonb_build_object('row', 1, 'category_slug', v_tag, 'attribute_key', v_tag || '-k',
                                                    'is_required', 'false', 'is_filterable', 'false'));
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_batch := (public.admin_commit_attribute_import(p_definitions => v_defs, p_links => v_links, p_scope => v_tag, p_digest => v_tag) ->> 'batch_id')::uuid;
    IF NOT (v_batch IS NOT NULL AND EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key = v_tag || '-k')) THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: the scratch batch did not land';
    END IF;

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_undo_attribute_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_undo_attribute_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_undo_attribute_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (b) a caller without the permission (admin_undo_attribute_import) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_undo_attribute_import(v_batch);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: the dial import_undo counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_undo';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: the dial import_undo counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key = v_tag || '-k') AND NOT EXISTS (SELECT 1 FROM public.attribute_import_revisions WHERE batch_id = v_batch AND undone_at IS NOT NULL)) THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_undo_attribute_import')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 17 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) the codes
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_undo_attribute_import');
    v_answer := public.admin_undo_attribute_import(NULL);
    IF v_answer ->> 'message' IS DISTINCT FROM 'required:batch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (c) no batch answered %', v_answer;
    END IF;
    v_answer := public.admin_undo_attribute_import(gen_random_uuid());
    IF v_answer ->> 'message' IS DISTINCT FROM 'unknownBatch' OR current_setting('response.status', true) IS DISTINCT FROM '400' THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (c) an unknown batch answered %', v_answer;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_undo_attribute_import')) IS DISTINCT FROM v_refused + 2 THEN
      RAISE EXCEPTION 'F1-4a part 17 (c) proof: door_refusals did not meter the 2 refusals';
    END IF;
    v_answer := public.admin_undo_attribute_import(v_batch);
    IF NOT ((v_answer ->> 'batch_id')::uuid = v_batch AND v_answer ? 'restored') THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (c) the undo answered another batch';
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key = v_tag || '-k') AND NOT EXISTS (SELECT 1 FROM public.category_attribute_links l JOIN public.attributes a ON a.id = l.attribute_id WHERE a.attr_key LIKE 'e2e-mig-%' AND a.attr_key = v_tag || '-k')) THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: (c) the definition or its link is still there';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.import_undo')) <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: the undo wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('attribute.import_undo'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_undo';
    IF v_count <> 3 THEN
      RAISE EXCEPTION 'F1-4a part 17 proof: the dial import_undo counted % for (c) the staff undoer (expected %)', v_count, 3;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a17-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a17-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115041600') ON CONFLICT DO NOTHING;
