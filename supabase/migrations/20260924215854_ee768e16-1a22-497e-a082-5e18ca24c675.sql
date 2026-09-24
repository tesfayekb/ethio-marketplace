-- MIGRATION MARK 20260924230000 — INC-275: categories planner, one tree read per plan.
-- Cause: cat_import_plan called cat_export_row(id) per row, and cat_export_row
-- rebuilds the WHOLE export (recursive path walk + pointers) each call, so a
-- full-file preview was quadratic in the category count (742 on staging).
-- Fix: cat_export_rows(NULL) once, keyed by slug; the file's slug set and the
-- secondary-parent check read that in-memory map. No statement_timeout change.
-- Proofs assert behaviour only (no EXPLAIN).

CREATE OR REPLACE FUNCTION public.cat_import_plan(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_scope uuid;
  v_scope_set uuid[] := NULL;
  v_row jsonb;
  v_num int;
  v_slug text;
  v_action text;
  v_cat public.categories%ROWTYPE;
  v_parent public.categories%ROWTYPE;
  v_parent_slug text;
  v_seen text[] := '{}';
  v_infile text[] := '{}';
  v_ref jsonb := '[]'::jsonb;
  v_items jsonb := '[]'::jsonb;
  v_delta jsonb;
  v_cur jsonb;
  v_adds int := 0; v_changes int := 0; v_retires int := 0;
  v_reacts int := 0; v_deletes int := 0; v_unchanged int := 0;
  v_children int; v_listings int;
  v_name_am text;
  v_order int;
  v_export jsonb := NULL;
  v_rename text;
  v_kids text[];
  v_active_txt text;
  v_want_active boolean;
  v_detail text;
  -- DEC-052 / DEC-067 cells
  v_caps text[];
  v_period text;
  v_lock text;
  v_bad text;
  -- INC-275 — ONE tree read per plan: the export keyed by slug, and the file's
  -- own slug set. No per-row export, walk or version call below.
  v_by_slug jsonb;
  v_file_slugs jsonb;
BEGIN
  v_export := public.cat_export_rows(NULL);
  SELECT COALESCE(jsonb_object_agg(r->>'category_slug', r), '{}'::jsonb)
    INTO v_by_slug FROM jsonb_array_elements(v_export) r;
  SELECT COALESCE(jsonb_object_agg(k, true), '{}'::jsonb) INTO v_file_slugs
    FROM (SELECT DISTINCT lower(btrim(COALESCE(o->>'category_slug',''))) k
            FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o) f
   WHERE k <> '';

  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    SELECT c.id INTO v_scope FROM public.categories c WHERE c.slug = lower(btrim(p_scope));
    IF v_scope IS NULL THEN RAISE EXCEPTION 'unknown category scope'; END IF;
    SELECT array_agg(d.id) INTO v_scope_set FROM public.cat_descendants(v_scope) d;
  END IF;

  FOR v_row IN SELECT * FROM jsonb_array_elements(COALESCE(p_rows, '[]'::jsonb))
  LOOP
    v_num := COALESCE(public.cat_int(v_row->>'row'), 0);
    v_slug := lower(COALESCE(public.cat_text(v_row->>'category_slug'), ''));
    v_action := lower(COALESCE(public.cat_text(v_row->>'action'), 'upsert'));
    v_parent_slug := lower(COALESCE(public.cat_text(v_row->>'parent_slug'), ''));

    IF v_slug = '' THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key','',
                                           'reason','missingSlug');
      CONTINUE;
    END IF;

    IF v_slug = ANY (v_seen) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','duplicateSlug');
      CONTINUE;
    END IF;
    v_seen := v_seen || v_slug;

    IF v_action NOT IN ('upsert','create-root','retire','reactivate','delete') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badAction');
      CONTINUE;
    END IF;

    v_caps := ARRAY(SELECT lower(btrim(x))
                      FROM unnest(string_to_array(COALESCE(v_row->>'capabilities',''), '|')) x
                     WHERE btrim(x) <> '');
    v_bad := NULL;
    SELECT x INTO v_bad FROM unnest(v_caps) x
     WHERE x NOT IN ('bookable','map_pin') LIMIT 1;
    IF v_bad IS NOT NULL THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badCapability','detail',v_bad);
      CONTINUE;
    END IF;
    IF (SELECT count(DISTINCT u) FROM unnest(v_caps) u) <> COALESCE(array_length(v_caps,1),0) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badCapability','detail','duplicate');
      CONTINUE;
    END IF;
    v_period := lower(COALESCE(public.cat_text(v_row->>'default_price_period'), ''));
    IF v_period <> '' AND v_period NOT IN ('once','hour','day','week','month','year') THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badPeriod','detail',v_period);
      CONTINUE;
    END IF;
    v_lock := public.cat_text(v_row->>'price_period_locked');

    SELECT * INTO v_cat FROM public.categories c WHERE c.slug = v_slug;

    IF v_scope_set IS NOT NULL AND v_cat.id IS NOT NULL
       AND NOT (v_cat.id = ANY (v_scope_set)) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','outOfScope');
      CONTINUE;
    END IF;

    -- ---------- CREATE ----------
    IF v_cat.id IS NULL THEN
      IF v_action IN ('retire','reactivate') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_action = 'delete' THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyDeleted');
        CONTINUE;
      END IF;

      IF v_action <> 'create-root'
         AND btrim(COALESCE(v_row->>'category_path','')) <> '' THEN
        v_rename := NULL;
        SELECT r->>'category_slug' INTO v_rename
          FROM jsonb_array_elements(v_export) r
         WHERE btrim(COALESCE(r->>'category_path','')) = btrim(COALESCE(v_row->>'category_path',''))
           AND lower(btrim(COALESCE(r->>'parent_slug',''))) = v_parent_slug
           AND lower(btrim(COALESCE(r->>'category_slug',''))) <> v_slug
           AND NOT (v_file_slugs ? lower(btrim(COALESCE(r->>'category_slug',''))))
         LIMIT 1;
        IF v_rename IS NOT NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','slugRename','detail', v_rename);
          CONTINUE;
        END IF;
      END IF;

      IF v_parent_slug = '' AND v_action <> 'create-root' THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownSlug');
        CONTINUE;
      END IF;
      IF v_parent_slug <> '' THEN
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL AND v_parent_slug = ANY (v_infile) THEN
          v_parent := NULL;
        END IF;
        IF v_parent.id IS NULL AND NOT (v_parent_slug = ANY (v_infile)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL AND v_scope_set IS NOT NULL
           AND NOT (v_parent.id = ANY (v_scope_set)) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','outOfScope');
          CONTINUE;
        END IF;
        IF v_parent.id IS NOT NULL THEN
          SELECT sib.slug INTO v_rename
            FROM public.categories sib
            JOIN public.category_tree_pointers p ON p.child_id = sib.id
           WHERE p.parent_id = v_parent.id
             AND lower(btrim(sib.name_en)) = lower(btrim(COALESCE(v_row->>'name_en','')))
           LIMIT 1;
          IF v_rename IS NOT NULL THEN
            v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                                 'reason','slugRename','detail', v_rename);
            CONTINUE;
          END IF;
        END IF;
      ELSE
        v_parent := NULL;
      END IF;

      IF public.cat_text(v_row->>'name_en') IS NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','missingName');
        CONTINUE;
      END IF;

      IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_from') IS NULL)
         OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
            AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','badDate');
        CONTINUE;
      END IF;

      v_adds := v_adds + 1;
      v_infile := v_infile || v_slug;
      v_items := v_items || jsonb_build_object(
        'row', v_num, 'slug', v_slug, 'op', 'create',
        'parent_slug', NULLIF(v_parent_slug, ''),
        'fields', jsonb_build_object(
          'name_en', public.cat_text(v_row->>'name_en'),
          'name_am', public.cat_text(v_row->>'name_am'),
          'icon', public.cat_text(v_row->>'icon'),
          'allow_listings', public.cat_bool(v_row->>'allow_listings', true),
          'price_enabled', public.cat_bool(v_row->>'price_enabled', true),
          'expiry_days', public.cat_int(v_row->>'expiry_days'),
          'display_order', public.cat_int(v_row->>'display_order'),
          'visible_from', public.cat_ts(v_row->>'visible_from'),
          'visible_until', public.cat_ts(v_row->>'visible_until'),
          'excluded_country_codes', to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')),
          'secondary_parents', to_jsonb(public.cat_pipe(v_row->>'secondary_parents')))
        || CASE WHEN v_row ? 'capabilities'
                THEN jsonb_build_object('capabilities', to_jsonb(v_caps))
                ELSE '{}'::jsonb END
        || CASE WHEN v_period <> ''
                THEN jsonb_build_object('default_price_period', v_period)
                ELSE '{}'::jsonb END
        || CASE WHEN v_lock IS NOT NULL AND btrim(v_lock) <> ''
                THEN jsonb_build_object('price_period_locked',
                                        public.cat_bool(v_lock, false))
                ELSE '{}'::jsonb END);
      CONTINUE;
    END IF;

    -- ---------- DELETE ----------
    IF v_action = 'delete' THEN
      SELECT count(*)::int INTO v_children FROM public.category_tree_pointers p
       WHERE p.parent_id = v_cat.id;
      IF v_children > 0 THEN
        SELECT array_agg(c.slug ORDER BY c.slug) INTO v_kids
          FROM public.category_tree_pointers p
          JOIN public.categories c ON c.id = p.child_id
         WHERE p.parent_id = v_cat.id;
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasChildren',
                          'detail', array_to_string(COALESCE(v_kids, ARRAY[]::text[]), ', '),
                          'children', to_jsonb(COALESCE(v_kids, ARRAY[]::text[])));
        CONTINUE;
      END IF;
      SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = v_cat.id;
      IF v_listings > 0 THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                          'reason','hasListings','detail', v_listings::text);
        CONTINUE;
      END IF;
      IF v_cat.is_active THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','deleteActive');
        CONTINUE;
      END IF;
      v_deletes := v_deletes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','delete');
      CONTINUE;
    END IF;

    -- ---------- STATUS CELL (INC-199 part 1) ----------
    v_active_txt := public.cat_text(v_row->>'is_active');
    v_want_active := NULL;
    IF v_active_txt IS NOT NULL AND btrim(v_active_txt) <> '' THEN
      v_want_active := public.cat_bool(v_active_txt, v_cat.is_active);
    END IF;
    IF v_action NOT IN ('retire','reactivate')
       AND v_want_active IS NOT NULL
       AND v_want_active IS DISTINCT FROM v_cat.is_active THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                        'reason','statusNeedsAction',
                        'detail', 'stored=' || CASE WHEN v_cat.is_active THEN 'true' ELSE 'false' END
                                  || ' requested=' || CASE WHEN v_want_active THEN 'true' ELSE 'false' END);
      CONTINUE;
    END IF;

    -- ---------- CELL DIFF (semantic, against the export shape) ----------
    -- INC-275: the current row comes from the once-per-plan export map.
    v_cur := COALESCE(v_by_slug -> v_cat.slug, 'null'::jsonb);
    v_delta := '{}'::jsonb;

    IF (public.cat_text(v_row->>'visible_from') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_from') IS NULL)
       OR (public.cat_text(v_row->>'visible_until') IS NOT NULL
          AND public.cat_ts(v_row->>'visible_until') IS NULL) THEN
      v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                           'reason','badDate');
      CONTINUE;
    END IF;

    IF public.cat_text(v_row->>'name_en') IS NOT NULL
       AND public.cat_text(v_row->>'name_en') IS DISTINCT FROM btrim(v_cat.name_en) THEN
      v_delta := v_delta || jsonb_build_object('name_en', public.cat_text(v_row->>'name_en'));
    END IF;

    IF COALESCE(public.cat_text(v_row->>'icon'), '')
       IS DISTINCT FROM COALESCE(v_cur->>'icon', '') THEN
      v_delta := v_delta || jsonb_build_object('icon', COALESCE(public.cat_text(v_row->>'icon'), ''));
    END IF;

    IF public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings) IS DISTINCT FROM v_cat.allow_listings THEN
      v_delta := v_delta || jsonb_build_object('allow_listings',
                    public.cat_bool(v_row->>'allow_listings', v_cat.allow_listings));
    END IF;

    IF public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled) IS DISTINCT FROM v_cat.price_enabled THEN
      v_delta := v_delta || jsonb_build_object('price_enabled',
                    public.cat_bool(v_row->>'price_enabled', v_cat.price_enabled));
    END IF;

    IF public.cat_int(v_row->>'expiry_days') IS DISTINCT FROM v_cat.expiry_days THEN
      v_delta := v_delta || jsonb_build_object('expiry_days', public.cat_int(v_row->>'expiry_days'));
    END IF;

    IF v_row ? 'capabilities'
       AND array_to_string(v_caps,'|') IS DISTINCT FROM COALESCE(v_cur->>'capabilities','') THEN
      v_delta := v_delta || jsonb_build_object('capabilities', to_jsonb(v_caps));
    END IF;
    IF v_period <> ''
       AND v_period IS DISTINCT FROM COALESCE(v_cur->>'default_price_period','') THEN
      v_delta := v_delta || jsonb_build_object('default_price_period', v_period);
    END IF;
    IF v_lock IS NOT NULL AND btrim(v_lock) <> ''
       AND public.cat_bool(v_lock, v_cat.price_period_locked)
           IS DISTINCT FROM v_cat.price_period_locked THEN
      v_delta := v_delta || jsonb_build_object('price_period_locked',
                    public.cat_bool(v_lock, v_cat.price_period_locked));
    END IF;

    v_order := public.cat_int(v_row->>'display_order');
    IF NOT v_cat.is_catchall
       AND v_order IS NOT NULL
       AND v_order IS DISTINCT FROM public.cat_int(v_cur->>'display_order') THEN
      v_delta := v_delta || jsonb_build_object('display_order', v_order);
    END IF;

    v_name_am := public.cat_text(v_row->>'name_am');
    IF v_name_am IS NOT NULL AND btrim(v_name_am) <> ''
       AND btrim(v_name_am) IS DISTINCT FROM btrim(COALESCE(v_cur->>'name_am', '')) THEN
      v_delta := v_delta || jsonb_build_object('name_am', btrim(v_name_am));
    END IF;

    IF public.cat_ts(v_row->>'visible_from') IS DISTINCT FROM v_cat.visible_from
       OR public.cat_ts(v_row->>'visible_until') IS DISTINCT FROM v_cat.visible_until THEN
      v_delta := v_delta || jsonb_build_object(
        'visible_from', public.cat_ts(v_row->>'visible_from'),
        'visible_until', public.cat_ts(v_row->>'visible_until'));
    END IF;

    IF public.cat_pipe(v_row->>'excluded_country_codes')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'excluded_country_codes') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'excluded_country_codes')) code
                  WHERE NOT EXISTS (SELECT 1 FROM public.countries c
                                     WHERE lower(c.code) = code)) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownCountry');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('excluded_country_codes',
                    to_jsonb(public.cat_pipe(v_row->>'excluded_country_codes')));
    END IF;

    IF v_parent_slug IS DISTINCT FROM COALESCE(v_cur->>'parent_slug', '') THEN
      IF v_parent_slug = '' THEN
        v_delta := v_delta || jsonb_build_object('parent_slug', '');
      ELSE
        SELECT * INTO v_parent FROM public.categories c WHERE c.slug = v_parent_slug;
        IF v_parent.id IS NULL THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','unknownParent');
          CONTINUE;
        END IF;
        IF v_parent.is_catchall THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','catchallParent');
          CONTINUE;
        END IF;
        IF v_parent.id = v_cat.id
           OR v_parent.id IN (SELECT d.id FROM public.cat_descendants(v_cat.id) d) THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                               'reason','cycle');
          CONTINUE;
        END IF;
        v_delta := v_delta || jsonb_build_object('parent_slug', v_parent_slug);
      END IF;
    END IF;

    -- INC-275: secondary parents checked against the in-memory export map.
    IF public.cat_pipe(v_row->>'secondary_parents')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'secondary_parents') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
                  WHERE NOT (v_by_slug ? s)
                     OR v_by_slug -> s ->> 'is_catchall' = 'true') THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('secondary_parents',
                    to_jsonb(public.cat_pipe(v_row->>'secondary_parents')));
    END IF;

    v_detail := NULLIF(array_to_string(
                  ARRAY(SELECT k FROM jsonb_object_keys(v_delta) k ORDER BY k), ', '), '');

    -- ---------- RETIRE ----------
    IF v_action = 'retire' THEN
      IF v_cat.is_active THEN
        SELECT count(*)::int INTO v_listings FROM public.listings l
         WHERE l.category_id = v_cat.id AND l.status = 'active';
        IF v_listings > 0 THEN
          v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                            'reason','hasListings','detail', v_listings::text);
          CONTINUE;
        END IF;
        v_retires := v_retires + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','retire',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyRetired');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyRetired');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- REACTIVATE ----------
    IF v_action = 'reactivate' THEN
      IF NOT v_cat.is_active THEN
        v_reacts := v_reacts + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','reactivate',
                                                 'fields', v_delta,
                                                 'detail', v_detail);
      ELSIF v_delta = '{}'::jsonb THEN
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyActive');
      ELSE
        v_changes := v_changes + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                                 'fields', v_delta,
                                                 'detail','alreadyActive');
      END IF;
      CONTINUE;
    END IF;

    -- ---------- UPSERT ----------
    IF v_delta = '{}'::jsonb THEN
      v_unchanged := v_unchanged + 1;
    ELSE
      v_changes := v_changes + 1;
      v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','update',
                                               'fields', v_delta,
                                               'detail', v_detail);
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'counts', jsonb_build_object(
      'adds', v_adds, 'changes', v_changes, 'retires', v_retires,
      'reactivations', v_reacts, 'deletes', v_deletes,
      'unchanged', v_unchanged, 'refusals', jsonb_array_length(v_ref)),
    'refusals', v_ref,
    'items', v_items);
END $function$;

REVOKE ALL ON FUNCTION public.cat_import_plan(jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

DO $proof$
DECLARE
  v_root uuid; v_kid uuid; v_other uuid; v_catch uuid;
  v_rows jsonb; v_plan jsonb; v_row jsonb; t0 timestamptz; v_ms numeric; n int;
BEGIN
  INSERT INTO public.categories(name_en, slug) VALUES ('e2e INC275 root','e2e-inc275-root') RETURNING id INTO v_root;
  INSERT INTO public.categories(name_en, slug) VALUES ('e2e INC275 kid','e2e-inc275-kid') RETURNING id INTO v_kid;
  INSERT INTO public.categories(name_en, slug) VALUES ('e2e INC275 other','e2e-inc275-other') RETURNING id INTO v_other;
  INSERT INTO public.categories(name_en, slug, is_catchall) VALUES ('e2e INC275 catch','e2e-inc275-catch', true) RETURNING id INTO v_catch;
  INSERT INTO public.category_tree_pointers(parent_id, child_id, display_order) VALUES
    (NULL, v_root, 9001), (NULL, v_other, 9002), (v_root, v_kid, 1), (v_other, v_kid, 2), (v_root, v_catch, 3);

  -- PROOF 1: scratch-branch round trip is a no-op
  SELECT jsonb_agg(r || jsonb_build_object('row', o)) INTO v_rows
    FROM jsonb_array_elements(public.cat_export_rows(v_root)) WITH ORDINALITY t(r, o);
  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'changes')::int <> 0 OR (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'PROOF 1 failed: scratch round trip not a no-op: %', v_plan;
  END IF;

  -- PROOF 2: a changed cell is still one change, named
  SELECT jsonb_agg(CASE WHEN r->>'category_slug'='e2e-inc275-kid'
                        THEN r || '{"name_en":"e2e INC275 kid renamed"}'::jsonb ELSE r END)
    INTO v_rows FROM jsonb_array_elements(v_rows) r;
  v_plan := public.cat_import_plan(v_rows, NULL);
  IF (v_plan->'counts'->>'changes')::int <> 1
     OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'items') i
                     WHERE i->>'slug'='e2e-inc275-kid' AND i->'fields' ? 'name_en') THEN
    RAISE EXCEPTION 'PROOF 2 failed: %', v_plan;
  END IF;

  -- PROOF 3: unknown / catch-all secondary parent → unknownParent (in-memory set)
  v_plan := public.cat_import_plan(jsonb_build_array(
    jsonb_build_object('row',1,'category_slug','e2e-inc275-kid','parent_slug','e2e-inc275-root',
                       'secondary_parents','e2e-inc275-nope'),
    jsonb_build_object('row',2,'category_slug','e2e-inc275-other','parent_slug','',
                       'secondary_parents','e2e-inc275-catch')), NULL);
  IF (SELECT count(*) FROM jsonb_array_elements(v_plan->'refusals') f
       WHERE f->>'reason'='unknownParent') <> 2 THEN
    RAISE EXCEPTION 'PROOF 3 failed: %', v_plan->'refusals';
  END IF;

  -- PROOF 4: slug rename (file drops a slug, keeps its path) still refused
  SELECT r INTO v_row FROM jsonb_array_elements(public.cat_export_rows(v_root)) r
   WHERE r->>'category_slug'='e2e-inc275-catch';
  v_plan := public.cat_import_plan(jsonb_build_array(
    v_row || jsonb_build_object('row',1,'category_slug','e2e-inc275-catch2')), NULL);
  IF NOT EXISTS (SELECT 1 FROM jsonb_array_elements(v_plan->'refusals') f
                  WHERE f->>'reason'='slugRename' AND f->>'detail'='e2e-inc275-catch') THEN
    RAISE EXCEPTION 'PROOF 4 failed: %', v_plan->'refusals';
  END IF;

  -- PROOF 5: the FULL live export previews as a no-op within 5 s (behaviour + time)
  SELECT jsonb_agg(r || jsonb_build_object('row', o)), count(*) INTO v_rows, n
    FROM jsonb_array_elements(public.cat_export_rows(NULL)) WITH ORDINALITY t(r, o);
  t0 := clock_timestamp();
  v_plan := public.cat_import_plan(v_rows, NULL);
  v_ms := round(extract(epoch FROM clock_timestamp() - t0) * 1000);
  RAISE NOTICE 'INC-275 full export: % rows planned in % ms, counts %', n, v_ms, v_plan->'counts';
  IF (v_plan->'counts'->>'changes')::int <> 0 OR (v_plan->'counts'->>'adds')::int <> 0
     OR (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'PROOF 5 failed: full export not a no-op: %', v_plan->'counts';
  END IF;
  IF v_ms > 5000 THEN RAISE EXCEPTION 'PROOF 5 failed: % rows took % ms', n, v_ms; END IF;

  DELETE FROM public.category_tree_pointers WHERE child_id IN (v_root, v_kid, v_other, v_catch);
  DELETE FROM public.categories WHERE id IN (v_kid, v_catch, v_root, v_other);
END $proof$;

DO $rb$
DECLARE d text := pg_get_functiondef('public.cat_import_plan(jsonb,text)'::regprocedure);
BEGIN
  IF d LIKE '%cat_export_row(%' OR d LIKE '%catalog_find_version%' OR d LIKE '%get_category_tree_version%' THEN
    RAISE EXCEPTION 'READBACK failed: per-row lookup in planner';
  END IF;
  IF has_function_privilege('anon','public.cat_import_plan(jsonb,text)','EXECUTE')
     OR has_function_privilege('authenticated','public.cat_import_plan(jsonb,text)','EXECUTE')
     OR NOT has_function_privilege('service_role','public.cat_import_plan(jsonb,text)','EXECUTE') THEN
    RAISE EXCEPTION 'READBACK failed: ACL';
  END IF;
END $rb$;

INSERT INTO public.migration_marks(version) VALUES ('20260924230000') ON CONFLICT DO NOTHING;