-- IE-2 — ATTRIBUTE IMPORT: PREVIEW → CONFIRM/DISCARD → UNDO (Tier A)
-- Permission registration follows the DEC-016/DEC-017 pattern (C2-MIG §3).
-- Writer order in the commit RPC is F5: gates → capture → mutate.

-- ============================================================
-- 1. PERMISSION — categories:import (step-up, super_admin only)
-- ============================================================
DO $$
DECLARE
  v_res  uuid;
  v_perm uuid;
  v_role uuid;
BEGIN
  SELECT id INTO v_res FROM public.resources WHERE name = 'categories';
  IF v_res IS NULL THEN
    RAISE EXCEPTION 'resource categories missing';
  END IF;

  INSERT INTO public.permissions (resource_id, action, requires_step_up, assignable)
  VALUES (v_res, 'import', true, true)
  ON CONFLICT DO NOTHING;

  UPDATE public.permissions p
     SET requires_step_up = true, assignable = true
   WHERE p.resource_id = v_res AND p.action = 'import';

  SELECT id INTO v_perm FROM public.permissions
   WHERE resource_id = v_res AND action = 'import';
  SELECT id INTO v_role FROM public.roles WHERE name = 'super_admin';

  IF v_role IS NOT NULL AND v_perm IS NOT NULL THEN
    INSERT INTO public.role_permissions (role_id, permission_id, is_core)
    VALUES (v_role, v_perm, false)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ============================================================
-- 2. CAPTURE TABLE — old → new, batch-tagged (undo's only source)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.attribute_import_revisions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id   uuid NOT NULL,
  kind       text NOT NULL CHECK (kind IN ('definition', 'link')),
  action     text NOT NULL CHECK (action IN ('upsert', 'unlink', 'delete')),
  entity_key text NOT NULL,
  prev       jsonb,
  post       jsonb,
  undone_at  timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.attribute_import_revisions TO service_role;

ALTER TABLE public.attribute_import_revisions ENABLE ROW LEVEL SECURITY;

-- RPC-only surface (E7): deny-all for anon and authenticated, explicitly.
DROP POLICY IF EXISTS attribute_import_revisions_no_client_access
  ON public.attribute_import_revisions;
CREATE POLICY attribute_import_revisions_no_client_access
  ON public.attribute_import_revisions
  FOR ALL TO authenticated, anon
  USING (false) WITH CHECK (false);

CREATE INDEX IF NOT EXISTS idx_air_batch
  ON public.attribute_import_revisions(batch_id, id);

-- ============================================================
-- 3. THE PLANNER — one validator, shared by preview and commit
-- ============================================================
-- Internal: no grants at all. Only the SECURITY DEFINER doors below call it,
-- and they run as the owner, so no client can reach it.
CREATE OR REPLACE FUNCTION public.attr_import_plan(
  p_definitions jsonb, p_links jsonb, p_scope text
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_types      text[] := ARRAY['text','number','single_select','multi_select','boolean','date','range'];
  v_scope_id   uuid;
  v_scope_ids  uuid[] := NULL;
  v_defs       jsonb := '[]'::jsonb;
  v_lnks       jsonb := '[]'::jsonb;
  v_refusals   jsonb := '[]'::jsonb;
  v_seen_defs  text[] := ARRAY[]::text[];
  v_seen_lnks  text[] := ARRAY[]::text[];
  v_new_keys   text[] := ARRAY[]::text[];
  e            jsonb;
  v_row        int;
  v_key        text;
  v_action     text;
  v_type       text;
  v_raw        text;
  v_options    jsonb;
  v_depends    text;
  v_entry      jsonb;
  v_parent     text;
  v_parent_ok  boolean;
  v_dep_vals   text[];
  v_att        public.attributes%ROWTYPE;
  v_change     text;
  v_cat        public.categories%ROWTYPE;
  v_origin     text;
  v_req        boolean;
  v_filt       boolean;
  v_rank       int;
  v_link       public.category_attribute_links%ROWTYPE;
  v_attr_id    uuid;
  v_bad        boolean;
BEGIN
  -- scope subtree (the console's active category filter)
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT id INTO v_scope_id FROM public.categories WHERE slug = btrim(p_scope);
    IF v_scope_id IS NULL THEN
      RAISE EXCEPTION 'unknown category scope';
    END IF;
    WITH RECURSIVE sub AS (
      SELECT v_scope_id AS id
      UNION
      SELECT p.child_id FROM public.category_tree_pointers p JOIN sub s ON s.id = p.parent_id
    )
    SELECT array_agg(id) INTO v_scope_ids FROM sub;
  END IF;

  ---------------------------------------------------------------- definitions
  FOR e IN SELECT value FROM jsonb_array_elements(COALESCE(p_definitions, '[]'::jsonb))
  LOOP
    v_row := COALESCE((e->>'row')::int, 0);
    v_key := btrim(COALESCE(e->>'attribute_key', ''));
    v_action := lower(COALESCE(NULLIF(btrim(COALESCE(e->>'action','')), ''), 'upsert'));

    IF v_key = '' THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key','','reason','missingKey');
      CONTINUE;
    END IF;
    IF v_key = ANY (v_seen_defs) THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_defs := v_seen_defs || v_key;

    IF v_action NOT IN ('upsert','delete') THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_att FROM public.attributes WHERE attr_key = v_key;

    IF v_action = 'delete' THEN
      IF v_att.id IS NULL THEN
        v_defs := v_defs || jsonb_build_object('row',v_row,'key',v_key,'action','delete','change','none');
        CONTINUE;
      END IF;
      IF EXISTS (SELECT 1 FROM public.category_attribute_links l WHERE l.attribute_id = v_att.id) THEN
        v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','blastRadius');
        CONTINUE;
      END IF;
      v_defs := v_defs || jsonb_build_object('row',v_row,'key',v_key,'action','delete','change','delete','id',v_att.id);
      CONTINUE;
    END IF;

    v_type := lower(btrim(COALESCE(e->>'type','')));
    IF NOT (v_type = ANY (v_types)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','unknownType');
      CONTINUE;
    END IF;

    -- OPTIONS: either the export's `a|b|c` list, or a JSON array whose entries
    -- are strings or {"value":…,"parent":…}; a {"depends_on":…} meta entry may
    -- ride along (DEC-045). Existing readers map non-`value` entries to '' and
    -- drop them, so the meta entry is invisible to them.
    v_raw := COALESCE(e->>'options', '');
    v_options := NULL;
    v_depends := NULL;
    v_bad := false;
    IF btrim(v_raw) <> '' THEN
      IF left(btrim(v_raw), 1) = '[' THEN
        BEGIN
          v_options := btrim(v_raw)::jsonb;
        EXCEPTION WHEN others THEN
          v_bad := true;
        END;
        IF NOT v_bad AND jsonb_typeof(v_options) <> 'array' THEN v_bad := true; END IF;
      ELSE
        SELECT jsonb_agg(to_jsonb(s)) INTO v_options
          FROM unnest(string_to_array(v_raw, '|')) AS s
         WHERE btrim(s) <> '';
      END IF;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    IF v_options IS NOT NULL THEN
      FOR v_entry IN SELECT value FROM jsonb_array_elements(v_options) LOOP
        IF jsonb_typeof(v_entry) = 'object' AND v_entry ? 'depends_on' THEN
          v_depends := v_entry->>'depends_on';
        ELSIF jsonb_typeof(v_entry) = 'object' AND NOT (v_entry ? 'value') THEN
          v_bad := true;
        ELSIF jsonb_typeof(v_entry) NOT IN ('object','string') THEN
          v_bad := true;
        END IF;
      END LOOP;
    END IF;
    IF v_bad THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','malformedOptions');
      CONTINUE;
    END IF;

    -- DEC-045 — every `parent` must name a value of the depended-on definition.
    v_parent_ok := true;
    IF v_options IS NOT NULL AND EXISTS (
      SELECT 1 FROM jsonb_array_elements(v_options) x
       WHERE jsonb_typeof(x.value) = 'object' AND x.value ? 'parent'
    ) THEN
      IF v_depends IS NULL OR btrim(v_depends) = '' THEN
        v_parent_ok := false;
      ELSE
        SELECT array_agg(COALESCE(x.value->>'value', trim(both '"' from x.value::text)))
          INTO v_dep_vals
          FROM public.attributes a,
               LATERAL jsonb_array_elements(COALESCE(a.options, '[]'::jsonb)) x
         WHERE a.attr_key = btrim(v_depends)
           AND NOT (jsonb_typeof(x.value) = 'object' AND NOT (x.value ? 'value'));
        IF v_dep_vals IS NULL THEN
          v_parent_ok := false;
        ELSE
          FOR v_entry IN SELECT value FROM jsonb_array_elements(v_options) LOOP
            IF jsonb_typeof(v_entry) = 'object' AND v_entry ? 'parent' THEN
              v_parent := v_entry->>'parent';
              IF v_parent IS NULL OR NOT (v_parent = ANY (v_dep_vals)) THEN
                v_parent_ok := false;
              END IF;
            END IF;
          END LOOP;
        END IF;
      END IF;
    END IF;
    IF NOT v_parent_ok THEN
      v_refusals := v_refusals || jsonb_build_object('file','definitions','row',v_row,'key',v_key,'reason','badParent');
      CONTINUE;
    END IF;

    IF v_att.id IS NULL THEN
      v_change := 'add';
      v_new_keys := v_new_keys || v_key;
    ELSIF v_att.name_en IS DISTINCT FROM COALESCE(e->>'label_en', v_att.name_en)
       OR v_att.attr_type IS DISTINCT FROM v_type
       OR COALESCE(v_att.options, 'null'::jsonb) IS DISTINCT FROM COALESCE(v_options, 'null'::jsonb) THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_defs := v_defs || jsonb_build_object(
      'row', v_row, 'key', v_key, 'action', 'upsert', 'change', v_change,
      'id', v_att.id, 'name_en', COALESCE(NULLIF(btrim(COALESCE(e->>'label_en','')), ''), v_key),
      'attr_type', v_type, 'options', v_options);
  END LOOP;

  --------------------------------------------------------------------- links
  FOR e IN SELECT value FROM jsonb_array_elements(COALESCE(p_links, '[]'::jsonb))
  LOOP
    v_row := COALESCE((e->>'row')::int, 0);
    v_key := btrim(COALESCE(e->>'attribute_key',''));
    v_action := lower(COALESCE(NULLIF(btrim(COALESCE(e->>'action','')), ''), 'upsert'));
    v_origin := btrim(COALESCE(e->>'origin',''));

    IF v_action NOT IN ('upsert','unlink') THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','badAction');
      CONTINUE;
    END IF;

    SELECT * INTO v_cat FROM public.categories WHERE slug = btrim(COALESCE(e->>'category_slug',''));
    IF v_cat.id IS NULL THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','unknownCategory');
      CONTINUE;
    END IF;

    IF v_scope_ids IS NOT NULL AND NOT (v_cat.id = ANY (v_scope_ids)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','outOfScope');
      CONTINUE;
    END IF;

    IF (v_cat.slug || '|' || v_key) = ANY (v_seen_lnks) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_lnks := v_seen_lnks || (v_cat.slug || '|' || v_key);

    SELECT id INTO v_attr_id FROM public.attributes WHERE attr_key = v_key;
    IF v_attr_id IS NULL AND NOT (v_key = ANY (v_new_keys)) THEN
      v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','unknownAttribute');
      CONTINUE;
    END IF;

    v_req := lower(COALESCE(e->>'is_required','false')) IN ('true','t','1','yes');
    v_filt := lower(COALESCE(e->>'is_filterable','false')) IN ('true','t','1','yes');
    v_rank := NULL;
    IF btrim(COALESCE(e->>'card_rank','')) <> '' THEN
      BEGIN
        v_rank := btrim(e->>'card_rank')::int;
      EXCEPTION WHEN others THEN
        v_rank := -1;
      END;
      IF v_rank IS NULL OR v_rank < 1 OR v_rank > 3 THEN
        v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','badCardRank');
        CONTINUE;
      END IF;
    END IF;

    v_link := NULL;
    IF v_attr_id IS NOT NULL THEN
      SELECT * INTO v_link FROM public.category_attribute_links
       WHERE category_id = v_cat.id AND attribute_id = v_attr_id;
    END IF;

    -- INHERITED ROW: `origin` names another category. It may be re-imported
    -- verbatim (a round trip must be a no-op) but never CHANGED here.
    IF v_origin <> '' AND v_origin <> v_cat.slug THEN
      IF v_action = 'unlink' OR v_link.id IS NOT NULL THEN
        v_refusals := v_refusals || jsonb_build_object('file','links','row',v_row,'key',v_key,'reason','inheritedRow','detail',v_origin);
        CONTINUE;
      END IF;
      -- verbatim inherited row with nothing of its own: nothing to do.
      v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change','none');
      CONTINUE;
    END IF;

    IF v_action = 'unlink' THEN
      IF v_link.id IS NULL THEN
        v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','unlink','change','none');
      ELSE
        v_lnks := v_lnks || jsonb_build_object('row',v_row,'key',v_key,'slug',v_cat.slug,'action','unlink',
                                              'change','unlink','link_id',v_link.id,
                                              'category_id',v_cat.id,'attribute_id',v_attr_id);
      END IF;
      CONTINUE;
    END IF;

    IF v_link.id IS NULL THEN
      v_change := 'add';
    ELSIF v_link.is_required IS DISTINCT FROM v_req
       OR v_link.is_filterable IS DISTINCT FROM v_filt
       OR v_link.card_rank IS DISTINCT FROM v_rank THEN
      v_change := 'change';
    ELSE
      v_change := 'none';
    END IF;

    v_lnks := v_lnks || jsonb_build_object(
      'row',v_row,'key',v_key,'slug',v_cat.slug,'action','upsert','change',v_change,
      'link_id',v_link.id,'category_id',v_cat.id,'attribute_id',v_attr_id,
      'is_required',v_req,'is_filterable',v_filt,'card_rank',v_rank);
  END LOOP;

  RETURN jsonb_build_object(
    'definitions', v_defs,
    'links', v_lnks,
    'refusals', v_refusals,
    'counts', jsonb_build_object(
      'adds', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'add')
            + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'add'),
      'changes', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'change')
               + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'change'),
      'unlinks', (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'unlink'),
      'deletes', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'delete'),
      'unchanged', (SELECT count(*) FROM jsonb_array_elements(v_defs) x WHERE x.value->>'change' = 'none')
                 + (SELECT count(*) FROM jsonb_array_elements(v_lnks) x WHERE x.value->>'change' = 'none'),
      'refusals', jsonb_array_length(v_refusals)));
END $function$;

REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon, authenticated;

-- ============================================================
-- 4. PREVIEW — writes nothing
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_preview_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN public.attr_import_plan(p_definitions, p_links, p_scope);
END $function$;

REVOKE ALL ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_attribute_import(jsonb, jsonb, text) TO authenticated;

-- ============================================================
-- 5. COMMIT — F5: gates → capture → mutate
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_commit_attribute_import(
  p_definitions jsonb, p_links jsonb, p_scope text DEFAULT NULL, p_digest text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_plan    jsonb;
  v_batch   uuid := gen_random_uuid();
  v_item    jsonb;
  v_prev    jsonb;
  v_post    jsonb;
  v_id      uuid;
  v_order   int;
  v_applied int := 0;
BEGIN
  -- (1) GATES
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  -- one commit in flight per user (released with the transaction)
  IF NOT pg_try_advisory_xact_lock(hashtext('attribute-import'), hashtext(auth.uid()::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.attr_import_plan(p_definitions, p_links, p_scope);

  -- (2)+(3) CAPTURE then MUTATE, row by row. `change = none` writes nothing.
  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'definitions')
  LOOP
    CONTINUE WHEN v_item->>'change' = 'none';

    v_id := NULLIF(v_item->>'id','')::uuid;
    v_prev := NULL;
    IF v_id IS NOT NULL THEN
      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en)
        INTO v_prev FROM public.attributes a WHERE a.id = v_id;
    END IF;

    IF v_item->>'change' = 'delete' THEN
      DELETE FROM public.attributes WHERE id = v_id;
      v_post := NULL;
    ELSE
      IF v_id IS NULL THEN
        INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
        VALUES (v_item->>'key', v_item->>'name_en', v_item->>'attr_type',
                CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END)
        RETURNING id INTO v_id;
      ELSE
        UPDATE public.attributes
           SET name_en = v_item->>'name_en',
               attr_type = v_item->>'attr_type',
               options = CASE WHEN v_item->'options' = 'null'::jsonb THEN NULL ELSE v_item->'options' END,
               updated_at = now()
         WHERE id = v_id;
      END IF;
      SELECT jsonb_build_object('attr_key',a.attr_key,'name_en',a.name_en,'attr_type',a.attr_type,
                                'options',a.options,'help_text_en',a.help_text_en)
        INTO v_post FROM public.attributes a WHERE a.id = v_id;
    END IF;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'definition', v_item->>'action', v_item->>'key', v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  FOR v_item IN SELECT value FROM jsonb_array_elements(v_plan->'links')
  LOOP
    CONTINUE WHEN v_item->>'change' = 'none';

    v_prev := NULL;
    SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                              'is_required',l.is_required,'is_filterable',l.is_filterable,
                              'display_order',l.display_order,'card_rank',l.card_rank)
      INTO v_prev FROM public.category_attribute_links l
     WHERE l.id = NULLIF(v_item->>'link_id','')::uuid;

    IF v_item->>'change' = 'unlink' THEN
      DELETE FROM public.category_attribute_links WHERE id = (v_item->>'link_id')::uuid;
      v_post := NULL;
    ELSE
      -- a definition created earlier in THIS commit resolves by key
      v_id := NULLIF(v_item->>'attribute_id','')::uuid;
      IF v_id IS NULL THEN
        SELECT id INTO v_id FROM public.attributes WHERE attr_key = v_item->>'key';
      END IF;

      IF v_item->>'change' = 'add' THEN
        SELECT COALESCE(max(l.display_order), 0) + 1 INTO v_order
          FROM public.category_attribute_links l
         WHERE l.category_id = (v_item->>'category_id')::uuid;
        INSERT INTO public.category_attribute_links
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
        VALUES ((v_item->>'category_id')::uuid, v_id,
                (v_item->>'is_required')::boolean, (v_item->>'is_filterable')::boolean,
                v_order, NULLIF(v_item->>'card_rank','')::int)
        RETURNING id INTO v_id;
      ELSE
        v_id := (v_item->>'link_id')::uuid;
        UPDATE public.category_attribute_links
           SET is_required = (v_item->>'is_required')::boolean,
               is_filterable = (v_item->>'is_filterable')::boolean,
               card_rank = NULLIF(v_item->>'card_rank','')::int,
               updated_at = now()
         WHERE id = v_id;
      END IF;

      SELECT jsonb_build_object('category_id',l.category_id,'attribute_id',l.attribute_id,
                                'is_required',l.is_required,'is_filterable',l.is_filterable,
                                'display_order',l.display_order,'card_rank',l.card_rank)
        INTO v_post FROM public.category_attribute_links l WHERE l.id = v_id;
    END IF;

    INSERT INTO public.attribute_import_revisions
      (batch_id, kind, action, entity_key, prev, post, created_by)
    VALUES (v_batch, 'link', v_item->>'action',
            (v_item->>'slug') || '|' || (v_item->>'key'), v_prev, v_post, auth.uid());
    v_applied := v_applied + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.import', 'attributes', v_batch::text,
    jsonb_build_object('batch_id', v_batch, 'scope', p_scope, 'digest', p_digest,
                       'applied', v_applied, 'counts', v_plan->'counts'));

  RETURN jsonb_build_object('batch_id', v_batch, 'applied', v_applied,
                            'counts', v_plan->'counts', 'refusals', v_plan->'refusals');
END $function$;

REVOKE ALL ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_attribute_import(jsonb, jsonb, text, text) TO authenticated;

-- ============================================================
-- 6. UNDO — restore the captured rows that are still untouched
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_undo_attribute_import(p_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_rev        record;
  v_restored   int := 0;
  v_conflicted int := 0;
  v_slug       text;
  v_key        text;
  v_attr       uuid;
  v_cat        uuid;
  v_exists     boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');
  IF p_batch IS NULL THEN
    RAISE EXCEPTION 'batch id required';
  END IF;

  PERFORM 1 FROM public.attribute_import_revisions WHERE batch_id = p_batch LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  FOR v_rev IN
    SELECT * FROM public.attribute_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY id DESC
  LOOP
    IF v_rev.kind = 'definition' THEN
      IF v_rev.prev IS NULL THEN
        -- the import created it: remove it again, unless it now carries links
        IF EXISTS (SELECT 1 FROM public.category_attribute_links l
                     JOIN public.attributes a ON a.id = l.attribute_id
                    WHERE a.attr_key = v_rev.entity_key) THEN
          v_conflicted := v_conflicted + 1;
          CONTINUE;
        END IF;
        DELETE FROM public.attributes WHERE attr_key = v_rev.entity_key;
      ELSE
        SELECT EXISTS (SELECT 1 FROM public.attributes WHERE attr_key = v_rev.entity_key) INTO v_exists;
        IF v_exists THEN
          UPDATE public.attributes
             SET name_en = v_rev.prev->>'name_en',
                 attr_type = v_rev.prev->>'attr_type',
                 options = CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                 updated_at = now()
           WHERE attr_key = v_rev.entity_key;
        ELSE
          INSERT INTO public.attributes (attr_key, name_en, attr_type, options, help_text_en)
          VALUES (v_rev.prev->>'attr_key', v_rev.prev->>'name_en', v_rev.prev->>'attr_type',
                  CASE WHEN v_rev.prev->'options' = 'null'::jsonb THEN NULL ELSE v_rev.prev->'options' END,
                  v_rev.prev->>'help_text_en');
        END IF;
      END IF;
    ELSE
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
          (category_id, attribute_id, is_required, is_filterable, display_order, card_rank)
        VALUES (v_cat, v_attr,
                (v_rev.prev->>'is_required')::boolean, (v_rev.prev->>'is_filterable')::boolean,
                COALESCE((v_rev.prev->>'display_order')::int, 0),
                NULLIF(v_rev.prev->>'card_rank','')::int)
        ON CONFLICT (category_id, attribute_id) DO UPDATE
          SET is_required = EXCLUDED.is_required,
              is_filterable = EXCLUDED.is_filterable,
              display_order = EXCLUDED.display_order,
              card_rank = EXCLUDED.card_rank,
              updated_at = now();
      END IF;
    END IF;

    UPDATE public.attribute_import_revisions SET undone_at = now() WHERE id = v_rev.id;
    v_restored := v_restored + 1;
  END LOOP;

  PERFORM public.log_audit('attribute.undo_import', 'attributes', p_batch::text,
    jsonb_build_object('batch_id', p_batch, 'restored', v_restored, 'conflicted', v_conflicted));

  RETURN jsonb_build_object('restored', v_restored, 'conflicted', v_conflicted);
END $function$;

REVOKE ALL ON FUNCTION public.admin_undo_attribute_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_attribute_import(uuid) TO authenticated;

-- ---------------------------------------------------------------- read-back
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
                  WHERE r.name = 'categories' AND p.action = 'import') THEN
    RAISE EXCEPTION 'categories:import not registered';
  END IF;
  IF to_regclass('public.attribute_import_revisions') IS NULL THEN
    RAISE EXCEPTION 'attribute_import_revisions missing';
  END IF;
  IF NOT has_function_privilege('authenticated',
      'public.admin_preview_attribute_import(jsonb, jsonb, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'preview grant missing';
  END IF;
  IF has_function_privilege('authenticated',
      'public.attr_import_plan(jsonb, jsonb, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'planner must not be client-reachable';
  END IF;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260907200000') ON CONFLICT DO NOTHING;