-- e2e-areas: admin-categories, admin-imports

-- Foundations 1, turn F1-4a, part 5 of 19 — THE CATEGORY IMPORT COMMIT ONTO DOOR_CONTEXT AND THE SHELL (DEC-333; brief
-- docs/governance/briefs/f1-doors-4a.md). admin_commit_category_import is
-- redeclared WHOLE from its LIVE body (its literal declaration 20261029001111 :180 plus the dial line D1 M6c computed
-- into it, 20261029022748; live md5 checked). Its gate becomes ONE door_context('staff', categories:import,
-- import_commit, global) and the shell; 'import already running' becomes importRunning, the race guard's
-- unknownParent the code with the slug; the eight category doors it called become their cores (parts 1 to 4), so a
-- refusal anywhere in the file raises through this door's shell and the whole file rolls back; its 'am' literals
-- become language_code('pair'). Its answer is unchanged. The planner's 'unknown category scope' stays a sentence (it
-- reaches the relay's row unchanged). Proofs on scratch rows under a sentinel rollback.

DO $pre$
DECLARE
  v_pairs text[][] := ARRAY[
    ['public.admin_commit_category_import(jsonb,text,text)', 'c94a815cb615b4fe32270642423c6815']];
  v_md5   text;
  i       integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261115040300') THEN
    RAISE EXCEPTION 'F1-4a part 5: part 4 (aa24b4c5) must be applied first';
  END IF;
  IF to_regprocedure('public.door_context(text,text,text,text,character,text)') IS NULL
     OR to_regprocedure('public.door_refused(text,text,text)') IS NULL
     OR to_regprocedure('public.door_refuse(text,text)') IS NULL
     OR to_regprocedure('public.language_code(text)') IS NULL
     OR to_regprocedure('public.admin_retire_category_core(uuid,uuid)') IS NULL
     OR to_regprocedure('public.admin_remove_category_pointer_core(uuid)') IS NULL THEN
    RAISE EXCEPTION 'F1-4a part 5: a door mechanism function or a core of parts 1 to 4 is missing';
  END IF;
  IF (SELECT count(*) FROM public.rate_dials WHERE action IN ('import_commit')) <> 1 THEN
    RAISE EXCEPTION 'F1-4a part 5: a dial of these doors is missing';
  END IF;
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    SELECT md5(replace(p.prosrc, chr(13), '')) INTO v_md5 FROM pg_proc p WHERE p.oid = v_pairs[i][1]::regprocedure;
    IF v_md5 IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 5: the live % is not its last declaration''s body (%)', v_pairs[i][1], v_md5;
    END IF;
  END LOOP;
END $pre$;

-- ------------------------------------------------------------ 1. admin_commit_category_import (whole from live = literal 20261029001111 :180 + its computed gate; the gate on door_context and the shell; the codes; the cores; the pair language by role)
CREATE OR REPLACE FUNCTION public.admin_commit_category_import(
  p_rows jsonb, p_scope text, p_digest text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_plan jsonb;
  v_batch uuid := gen_random_uuid();
  v_item jsonb;
  v_fields jsonb;
  v_slug text;
  v_id uuid;
  v_parent uuid;
  v_prev jsonb;
  v_pending jsonb := '[]'::jsonb;
  v_progress boolean;
  v_next jsonb;
  v_order int;
  v_ids uuid[];
  v_pp record;
  v_am jsonb;
  v_ord jsonb := '[]'::jsonb;
  v_par record;
  v_op text;
  v_sp text;
  v_spid uuid;
BEGIN
  -- GATES
  PERFORM public.door_context('staff', 'categories', 'import', 'import_commit', NULL, 'global');

  IF NOT pg_try_advisory_xact_lock(hashtext('category-import'), hashtext(auth.uid()::text)) THEN
    PERFORM public.door_refuse('importRunning');
  END IF;

  v_plan := public.cat_import_plan(p_rows, p_scope);

  -- CREATES first, parents before children (repeat passes until settled).
  SELECT COALESCE(jsonb_agg(i), '[]'::jsonb) INTO v_pending
    FROM jsonb_array_elements(v_plan->'items') i WHERE i->>'op' = 'create';

  LOOP
    EXIT WHEN jsonb_array_length(v_pending) = 0;
    v_progress := false;
    v_next := '[]'::jsonb;
    FOR v_item IN SELECT * FROM jsonb_array_elements(v_pending)
    LOOP
      v_slug := v_item->>'slug';
      v_fields := v_item->'fields';
      v_parent := NULL;
      IF v_item->>'parent_slug' IS NOT NULL THEN
        SELECT c.id INTO v_parent FROM public.categories c WHERE c.slug = v_item->>'parent_slug';
        IF v_parent IS NULL THEN
          v_next := v_next || v_item;
          CONTINUE;
        END IF;
      END IF;
      -- M8a A3 — a guest parent created by this same file waits for its pass.
      IF EXISTS (SELECT 1 FROM jsonb_array_elements_text(
                   CASE WHEN jsonb_typeof(v_fields->'secondary_parents') = 'array'
                        THEN v_fields->'secondary_parents' ELSE '[]'::jsonb END) x
                  WHERE NOT EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = x)
                    AND EXISTS (SELECT 1 FROM jsonb_array_elements(v_pending) q
                                 WHERE q->>'slug' = x)) THEN
        v_next := v_next || v_item;
        CONTINUE;
      END IF;

      v_id := public.admin_create_category_core(
        v_fields->>'name_en', v_slug, v_fields->>'icon', v_parent,
        (v_fields->>'allow_listings')::boolean, (v_fields->>'price_enabled')::boolean,
        public.cat_int(v_fields->>'expiry_days'),
        public.cat_ts(v_fields->>'visible_from'),
        public.cat_ts(v_fields->>'visible_until'));

      -- DEC-052 / DEC-067 — the three cells the create stated, in ONE statement.
      IF v_fields ? 'capabilities' OR v_fields ? 'default_price_period'
         OR v_fields ? 'price_period_locked' THEN
        UPDATE public.categories SET
          capabilities = CASE WHEN v_fields ? 'capabilities'
            THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(v_fields->'capabilities')),
                          '{}'::text[])
            ELSE capabilities END,
          default_price_period = COALESCE(NULLIF(v_fields->>'default_price_period',''),
                                          default_price_period),
          price_period_locked = COALESCE((v_fields->>'price_period_locked')::boolean,
                                         price_period_locked),
          updated_at = now()
         WHERE id = v_id;
      END IF;

      -- IE-4a — a non-empty am name is written as a HUMAN, pending-review row
      -- ('edited', machine=false) through the translation door. The batch owns
      -- the row it creates: Undo removes it again.
      IF public.cat_text(v_fields->>'name_am') IS NOT NULL THEN
        PERFORM public.admin_save_entity_translation_core('category', v_id, 'name', public.language_code('pair'),
                                                     v_fields->>'name_am');
      END IF;

      IF jsonb_array_length(COALESCE(v_fields->'excluded_country_codes','[]'::jsonb)) > 0 THEN
        PERFORM public.admin_set_country_exclusions_core(v_id,
          ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                  v_fields->'excluded_country_codes') x));
      END IF;

      -- INC-187 — a created row STATES its place; the order pass below applies it.
      IF public.cat_int(v_fields->>'display_order') IS NOT NULL THEN
        SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
        v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id,
                                             'ord', public.cat_int(v_fields->>'display_order'));
      END IF;

      -- M8a A3 (INC-314) — the create row's guest parents become pointers.
      FOR v_sp IN SELECT x FROM jsonb_array_elements_text(
                    CASE WHEN jsonb_typeof(v_fields->'secondary_parents') = 'array'
                        THEN v_fields->'secondary_parents' ELSE '[]'::jsonb END) x
      LOOP
        SELECT c.id INTO v_spid FROM public.categories c WHERE c.slug = v_sp;
        IF v_spid IS NULL THEN
          PERFORM public.door_refuse('unknownParent', v_sp);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                        WHERE p.child_id = v_id AND p.parent_id = v_spid) THEN
          PERFORM public.admin_add_category_pointer_core(v_spid, v_id);
        END IF;
      END LOOP;

      FOR v_next IN SELECT v_next LOOP EXIT; END LOOP; -- no-op guard

      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'create', v_slug, NULL, public.cat_export_row(v_id), auth.uid());

      v_progress := true;
    END LOOP;

    IF NOT v_progress THEN
      EXIT;
    END IF;
    v_pending := v_next;
  END LOOP;

  -- UPDATES, RETIRES, REACTIVATIONS, DELETES
  FOR v_item IN SELECT * FROM jsonb_array_elements(v_plan->'items')
                 WHERE value->>'op' <> 'create'
  LOOP
    v_op := v_item->>'op';
    -- INC-198/199 (d) — a noop item is a PREVIEW note ("alreadyRetired",
    -- "alreadyActive", "alreadyDeleted"). It writes nothing, not even a
    -- revision row, so Undo has nothing to restore for it.
    CONTINUE WHEN v_op = 'noop';

    v_slug := v_item->>'slug';
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_slug;
    CONTINUE WHEN v_id IS NULL;

    -- IE-4a — CAPTURE the prior am state (none, or value + status + machine)
    -- alongside the row, so Undo restores exactly what stood here before.
    SELECT jsonb_build_object('value', t.value, 'status', t.status, 'machine', t.machine)
      INTO v_am
      FROM public.entity_translations t
     WHERE t.entity_type = 'category' AND t.entity_id = v_id
       AND t.field = 'name' AND t.lang_code = public.language_code('pair');
    v_prev := public.cat_export_row(v_id)
              || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));

    IF v_op = 'delete' THEN
      -- M8a A4 (INC-307) — the delete captures the category's attribute links
      -- (each row minus id and category_id, plus its attr_key) so Undo can
      -- restore them; the links leave by cascade with the category.
      v_prev := v_prev || jsonb_build_object('links', COALESCE((
        SELECT jsonb_agg((to_jsonb(l) - 'id' - 'category_id')
                         || jsonb_build_object('attr_key', a.attr_key)
                         ORDER BY l.display_order, l.attribute_id)
          FROM public.category_attribute_links l
          JOIN public.attributes a ON a.id = l.attribute_id
         WHERE l.category_id = v_id), '[]'::jsonb));
      -- The am row leaves with the category (a deleted id can never be read
      -- again); the captured am_state above restores it on Undo. A ROOT leaves
      -- the same way — the delete door removes its parent-NULL pointer.
      DELETE FROM public.entity_translations
       WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
      PERFORM public.admin_delete_category_core(v_id, v_slug);
      INSERT INTO public.category_import_revisions
        (batch_id, action, entity_key, prev, post, created_by)
      VALUES (v_batch, 'delete', v_slug, v_prev, NULL, auth.uid());
      CONTINUE;
    END IF;

    -- INC-199 — STATUS THEN CELLS, one write per row. A retire/reactivate item
    -- carries the row's other cell changes in `fields`; the status door runs
    -- first and the SAME field application as a plain change row follows, so a
    -- rename or a secondary parent on an action row is never dropped. One
    -- revision row records both halves (prev before, post after).
    IF v_op = 'retire' THEN
      PERFORM public.admin_retire_category_core(v_id, NULL);
    ELSIF v_op = 'reactivate' THEN
      PERFORM public.admin_reactivate_category_core(v_id);
    END IF;

    v_fields := COALESCE(v_item->'fields', '{}'::jsonb);

    IF v_fields ? 'name_en' OR v_fields ? 'icon' OR v_fields ? 'allow_listings'
       OR v_fields ? 'price_enabled' OR v_fields ? 'expiry_days' THEN
      PERFORM public.admin_update_category_core(
        v_id,
        COALESCE(v_fields->>'name_en', (SELECT c.name_en FROM public.categories c WHERE c.id = v_id)),
        COALESCE(v_fields->>'icon', (SELECT c.icon FROM public.categories c WHERE c.id = v_id)),
        NULL,
        COALESCE((v_fields->>'allow_listings')::boolean,
                 (SELECT c.allow_listings FROM public.categories c WHERE c.id = v_id)),
        COALESCE((v_fields->>'price_enabled')::boolean,
                 (SELECT c.price_enabled FROM public.categories c WHERE c.id = v_id)),
        CASE WHEN v_fields ? 'expiry_days' THEN public.cat_int(v_fields->>'expiry_days')
             ELSE (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_id) END);
    END IF;

    -- DEC-052 / DEC-067 — the three cells, in ONE statement, touching only the
    -- cells the row carries.
    IF v_fields ? 'capabilities' OR v_fields ? 'default_price_period'
       OR v_fields ? 'price_period_locked' THEN
      UPDATE public.categories SET
        capabilities = CASE WHEN v_fields ? 'capabilities'
          THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(v_fields->'capabilities')),
                        '{}'::text[])
          ELSE capabilities END,
        default_price_period = COALESCE(NULLIF(v_fields->>'default_price_period',''),
                                        default_price_period),
        price_period_locked = COALESCE((v_fields->>'price_period_locked')::boolean,
                                       price_period_locked),
        updated_at = now()
       WHERE id = v_id;
    END IF;

    -- IE-4a — the planner only ever emits a NON-EMPTY name_am, and only when
    -- it differs from the live value: an identical cell writes nothing, and an
    -- empty cell never reaches here at all (silence, not a deletion).
    IF v_fields ? 'name_am' AND btrim(COALESCE(v_fields->>'name_am','')) <> '' THEN
      PERFORM public.admin_save_entity_translation_core('category', v_id, 'name', public.language_code('pair'),
                                                   btrim(v_fields->>'name_am'));
    END IF;

    IF v_fields ? 'visible_from' OR v_fields ? 'visible_until' THEN
      PERFORM public.admin_set_category_window_core(v_id,
        public.cat_ts(v_fields->>'visible_from'), public.cat_ts(v_fields->>'visible_until'));
    END IF;

    IF v_fields ? 'excluded_country_codes' THEN
      PERFORM public.admin_set_country_exclusions_core(v_id,
        ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                v_fields->'excluded_country_codes') x));
    END IF;

    IF v_fields ? 'parent_slug' THEN
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_fields->>'parent_slug', '');
      PERFORM public.admin_move_category_pointer_core(v_pp.pointer_id, v_parent);
    END IF;

    IF v_fields ? 'secondary_parents' THEN
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      -- remove the secondary pointers that left the file
      PERFORM public.admin_remove_category_pointer_core(p.id)
         FROM public.category_tree_pointers p
         JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = v_id
          AND p.id <> v_pp.pointer_id
          AND NOT (pc.slug = ANY (ARRAY(SELECT x::text FROM jsonb_array_elements_text(
                                          v_fields->'secondary_parents') x)));
      -- add the ones that arrived
      PERFORM public.admin_add_category_pointer_core(c.id, v_id)
         FROM public.categories c
        WHERE c.slug = ANY (ARRAY(SELECT x::text FROM jsonb_array_elements_text(
                                    v_fields->'secondary_parents') x))
          AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                           WHERE p.child_id = v_id AND p.parent_id = c.id);
    END IF;

    -- INC-187 — the row's stated place is COLLECTED here and applied once per
    -- parent after every row of the batch has landed. Ranking one row at a time
    -- against a scale the previous row just renumbered could not reproduce a
    -- file's own sequence.
    IF v_fields ? 'display_order' THEN
      v_order := public.cat_int(v_fields->>'display_order');
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id, 'ord', v_order);
    END IF;

    INSERT INTO public.category_import_revisions
      (batch_id, action, entity_key, prev, post, created_by)
    VALUES (v_batch,
            CASE WHEN v_op IN ('retire','reactivate') THEN v_op ELSE 'update' END,
            v_slug, v_prev, public.cat_export_row(v_id), auth.uid());
  END LOOP;

  -- INC-187 — ONE ordering pass per primary parent, after all rows. Siblings are
  -- sorted by the file's value for the rows in this batch and by their current
  -- position for everyone else; the reorder door renumbers 0..N-1 and keeps a
  -- catch-all excluded and pinned last.
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

  PERFORM public.log_audit('category_import.commit', 'categories', v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch,
                            'counts', v_plan->'counts',
                            'refusals', v_plan->'refusals');
EXCEPTION WHEN SQLSTATE 'P0D01' THEN
  RETURN public.door_refused('admin_commit_category_import', 'import_commit', SQLERRM);
END $function$;
REVOKE ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO service_role;

-- ------------------------------------------------------------ 2. PROOFS
-- (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service role, never
--     anon or PUBLIC; the body this file's (md5).
-- (b) the gates: accountDeactivated, permissionDenied (403), notSignedIn (401), none spending import_commit or
--     applying a row.
-- (c) a scratch file (one create under a scratch root, one retire of a scratch category): a holder of
--     categories:import without categories:restructure is refused permissionDenied by the retire core (403) and
--     NOTHING of the file applies — the create before it rolls back with it, no revision, no audit line, no
--     import_commit spent; staff applies it: the batch, the created row under the root, the retired row, two
--     revisions, one audit line, import_commit counted once and staff_config not at all (the cores spend none).
--     importRunning needs a second session and unknownParent a parent removed between plan and write: not driven.
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
  v_tag := 'e2e-mig-f14a5-' || substr(v_hex, 1, 10);
  -- (a)
  v_pairs := ARRAY[
    ['public.admin_commit_category_import(jsonb,text,text)', '6be256f133d6a18f320679af7911d8ed']];
  FOR i IN 1..array_length(v_pairs, 1) LOOP
    v_fn := v_pairs[i][1]::regprocedure;
    IF (SELECT NOT prosecdef OR provolatile <> 'v' OR proconfig::text <> '{search_path=public}' OR prorettype <> 'jsonb'::regtype
          FROM pg_proc WHERE oid = v_fn)
       OR EXISTS (SELECT 1 FROM aclexplode((SELECT proacl FROM pg_proc WHERE oid = v_fn)) a WHERE a.grantee = 0)
       OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'F1-4a part 5 proof (a): the door %''s header, return type or grants differ', v_fn;
    END IF;
    IF (SELECT md5(replace(p.prosrc, chr(13), '')) FROM pg_proc p WHERE p.oid = v_fn) IS DISTINCT FROM v_pairs[i][2] THEN
      RAISE EXCEPTION 'F1-4a part 5 proof (a): %''s body differs from this file', v_fn;
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
      RAISE EXCEPTION 'F1-4a part 5 proof: a categories permission of the staff role is not declared';
    END IF;
    INSERT INTO public.roles (name, description) VALUES (v_tag || '-lim', v_tag) RETURNING id INTO v_role_l;
    INSERT INTO public.role_permissions (role_id, permission_id)
    SELECT v_role_l, p.id FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
     WHERE r.name = 'categories' AND p.action IN ('view', 'update', 'create', 'import');
    IF (SELECT count(*) FROM public.role_permissions WHERE role_id = v_role_l) <> 4 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: a categories permission of the lim role is not declared';
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
      RAISE EXCEPTION 'F1-4a part 5 proof: the scratch tree''s home pointers differ';
    END IF;
    v_rows := jsonb_build_array(
      jsonb_build_object('row', 1, 'category_slug', v_tag || '-n', 'name_en', v_tag || ' n', 'parent_slug', v_tag),
      jsonb_build_object('row', 2, 'category_slug', v_tag || '-b', 'name_en', v_tag || ' b', 'parent_slug', v_tag,
                         'action', 'retire'));

    -- (b) the gates
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_commit_category_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_deact::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_commit_category_import(p_rows => v_rows, p_scope => NULL, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'accountDeactivated' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (b) a deactivated holder answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_plain::text, 'role', 'authenticated')::text, true);
    v_answer := public.admin_commit_category_import(p_rows => v_rows, p_scope => NULL, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (b) a caller without the permission (admin_commit_category_import) answered %', v_answer;
    END IF;
    PERFORM set_config('request.jwt.claims', '{}', true);
    v_answer := public.admin_commit_category_import(p_rows => v_rows, p_scope => NULL, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'notSignedIn' OR current_setting('response.status', true) IS DISTINCT FROM '401' THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (b) no caller answered %', v_answer;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_deact::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the dial import_commit counted % for (b) a deactivated holder (expected %)', v_count, 0;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_plain::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the dial import_commit counted % for (b) a caller without the permission (expected %)', v_count, 0;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-n') AND (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b)) THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (b) a refused call wrote something';
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_commit_category_import')) IS DISTINCT FROM v_refused + 3 THEN
      RAISE EXCEPTION 'F1-4a part 5 (b) proof: door_refusals did not meter the 3 refusals';
    END IF;

    -- (c) a refused file applies nothing; an accepted one applies all
    SELECT coalesce(sum(count), 0) INTO v_refused FROM public.door_refusals WHERE day = current_date
       AND door IN ('admin_commit_category_import');
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_lim::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess_l::text)::text, true);
    v_answer := public.admin_commit_category_import(p_rows => v_rows, p_scope => NULL, p_digest => v_tag);
    IF v_answer ->> 'message' IS DISTINCT FROM 'permissionDenied' OR current_setting('response.status', true) IS DISTINCT FROM '403' THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (c) a holder without categories:restructure answered %', v_answer;
    END IF;
    IF NOT (NOT EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug = v_tag || '-n') AND (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b) AND NOT EXISTS (SELECT 1 FROM public.category_import_revisions WHERE created_by = v_lim)) THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (c) a refused file applied a row';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_lim AND action IN ('category_import.commit', 'category.create')) <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the refused file wrote % audit lines (expected 0)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_lim AND action IN ('category_import.commit', 'category.create'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_lim::text AND action = 'import_commit';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the dial import_commit counted % for (c) the refused file (expected %)', v_count, 0;
    END IF;
    IF (SELECT coalesce(sum(count), 0) FROM public.door_refusals WHERE day = current_date
          AND door IN ('admin_commit_category_import')) IS DISTINCT FROM v_refused + 1 THEN
      RAISE EXCEPTION 'F1-4a part 5 (c) proof: door_refusals did not meter the 1 refusals';
    END IF;
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_staff::text, 'role', 'authenticated', 'aal', 'aal2', 'session_id', v_sess::text)::text, true);
    v_answer := public.admin_commit_category_import(p_rows => v_rows, p_scope => NULL, p_digest => v_tag);
    v_batch := (v_answer ->> 'batch_id')::uuid;
    IF NOT (v_batch IS NOT NULL AND v_answer -> 'refusals' = '[]'::jsonb) THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (c) the commit answered no batch, or refusals';
    END IF;
    IF NOT (EXISTS (SELECT 1 FROM public.categories c JOIN public.category_tree_pointers p ON p.child_id = c.id AND p.is_primary WHERE c.slug LIKE 'e2e-mig-%' AND c.slug = v_tag || '-n' AND c.name_en = v_tag || ' n' AND p.parent_id = v_root)) THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (c) the created row differs';
    END IF;
    IF NOT (NOT (SELECT is_active FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND id = v_b)) THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (c) the retired row is still active';
    END IF;
    IF NOT ((SELECT count(*) FROM public.category_import_revisions WHERE batch_id = v_batch AND created_by = v_staff) = 2) THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: (c) the batch''s revisions differ';
    END IF;
    IF (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category_import.commit')) <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the accepted file wrote % audit lines (expected 1)',
        (SELECT count(*) FROM public.audit_log WHERE actor_id = v_staff AND action IN ('category_import.commit'));
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'import_commit';
    IF v_count <> 1 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the dial import_commit counted % for (c) the accepted file (expected %)', v_count, 1;
    END IF;
    SELECT coalesce(sum(count), 0)::integer INTO v_count FROM public.rate_limits WHERE key = v_staff::text AND action = 'staff_config';
    IF v_count <> 0 THEN
      RAISE EXCEPTION 'F1-4a part 5 proof: the dial staff_config counted % for (c) the accepted file (the cores spend none) (expected %)', v_count, 0;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f14a5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f14a5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261115040400') ON CONFLICT DO NOTHING;
