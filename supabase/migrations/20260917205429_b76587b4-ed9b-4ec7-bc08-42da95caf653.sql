-- ============================================================================
-- M-MAINT PART A — INC-215 (a countries-file action row applies its field
-- edits too) and INC-220 (listing-photo storage policies keyed on the owner
-- segment, which sits AFTER the DEC-075 partition segment).
--
-- INC-183: every function below is re-declared WHOLE (never patched by text
-- anchor) and restates its own closers in-file.
-- No new table, so no INC-212 birth grants to revoke.
-- ============================================================================

-- ============================================================
-- A.1 public.loc_import_plan(jsonb, jsonb, text) — WHOLE re-declaration
--     Body of 20260916215832_7fcdddce byte-for-byte EXCEPT the country
--     state-action branch, which now carries the compound ops
--     'open+update' / 'close+update' when the row also edits cells, and
--     counts BOTH the reactivation/retirement and the change (INC-215).
-- ============================================================
CREATE OR REPLACE FUNCTION public.loc_import_plan(
  p_countries jsonb, p_locations jsonb, p_scope text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $plan$
DECLARE
  v_scope   char(2) := NULL;
  v_items   jsonb := '[]'::jsonb;
  v_ref     jsonb := '[]'::jsonb;
  v_adds int := 0; v_changes int := 0; v_retires int := 0;
  v_reacts int := 0; v_deletes int := 0; v_unchanged int := 0;
  r jsonb; v_row int; v_action text; v_op text; v_detail text;
  v_code char(2); v_cty public.countries;
  v_seen_codes text[] := '{}'; v_seen_keys text[] := '{}';
  v_created_keys text[] := '{}'; v_active_keys text[] := '{}';
  v_deleted_keys text[] := '{}';
  v_fields jsonb; v_ignored text[]; v_slugs text[]; v_slug text;
  v_key text; v_raw text; v_segs text[]; v_depth int; v_level text;
  v_parent_key text; v_parent_id uuid; v_parent_active boolean;
  v_id uuid; v_loc public.locations; v_cc char(2);
  v_txt text; v_bool boolean; v_int int; v_num double precision;
  v_am text; v_cur_am text; v_n int; v_ok boolean;
BEGIN
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    v_scope := upper(btrim(p_scope));
    IF NOT EXISTS (SELECT 1 FROM public.countries c WHERE c.code = v_scope) THEN
      RAISE EXCEPTION 'unknown country scope';
    END IF;
  END IF;

  -- ---------------- COUNTRIES FILE ----------------
  FOR r IN SELECT value FROM jsonb_array_elements(COALESCE(p_countries, '[]'::jsonb)) LOOP
    v_row := COALESCE(public.cat_int(r->>'row'), 0);
    v_code := upper(COALESCE(btrim(r->>'country_code'), ''));
    v_action := lower(COALESCE(public.cat_text(r->>'action'), ''));
    v_fields := '{}'::jsonb;

    IF v_code !~ '^[A-Z]{2}$' THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',
        COALESCE(btrim(r->>'country_code'),''),'reason','badCountryCode');
      CONTINUE;
    END IF;
    IF v_action NOT IN ('','upsert','open','close') THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
        'reason','badAction','detail',v_action);
      CONTINUE;
    END IF;
    IF v_code = ANY(v_seen_codes) THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
        'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_codes := v_seen_codes || v_code;
    IF v_scope IS NOT NULL AND v_code <> v_scope THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
        'reason','outOfScope','detail',v_scope);
      CONTINUE;
    END IF;

    v_txt := public.cat_text(r->>'unit_system');
    IF v_txt IS NOT NULL AND lower(v_txt) NOT IN ('metric','imperial') THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
        'reason','badUnitSystem','detail',v_txt);
      CONTINUE;
    END IF;
    v_txt := public.cat_text(r->>'currency_code');
    IF v_txt IS NOT NULL AND upper(v_txt) !~ '^[A-Z]{3}$' THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
        'reason','badCurrency','detail',v_txt);
      CONTINUE;
    END IF;

    -- root_order: every slug an ACTIVE ROOT category, no duplicates
    v_slugs := ARRAY(SELECT lower(btrim(x))
                       FROM unnest(string_to_array(COALESCE(r->>'root_order',''), '|')) x
                      WHERE btrim(x) <> '');
    v_ok := true;
    IF array_length(v_slugs,1) IS NOT NULL
       AND (SELECT count(DISTINCT u) FROM unnest(v_slugs) u) <> array_length(v_slugs,1) THEN
      v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
        'reason','duplicateCategory');
      CONTINUE;
    END IF;
    FOREACH v_slug IN ARRAY COALESCE(v_slugs, '{}'::text[]) LOOP
      IF NOT EXISTS (
        SELECT 1 FROM public.category_tree_pointers p
          JOIN public.categories c ON c.id = p.child_id
         WHERE p.parent_id IS NULL AND c.slug = v_slug AND c.is_active
      ) THEN
        v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
          'reason','notARoot','detail',v_slug);
        v_ok := false;
        EXIT;
      END IF;
    END LOOP;
    IF NOT v_ok THEN CONTINUE; END IF;

    SELECT * INTO v_cty FROM public.countries WHERE code = v_code;

    IF NOT FOUND THEN
      IF public.cat_text(r->>'name_en') IS NULL THEN
        v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
          'reason','nameRequired');
        CONTINUE;
      END IF;
      v_fields := jsonb_build_object('name_en', public.cat_text(r->>'name_en'));
      IF public.cat_text(r->>'unit_system') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('unit_system', lower(public.cat_text(r->>'unit_system')));
      END IF;
      IF public.cat_text(r->>'currency_code') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('currency_code', upper(public.cat_text(r->>'currency_code')));
      END IF;
      IF public.cat_int(r->>'display_order') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('display_order', public.cat_int(r->>'display_order'));
      END IF;
      IF array_length(v_slugs,1) IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('root_order', to_jsonb(v_slugs));
      END IF;
      -- a create is CLOSED regardless of the cell; `open` opens it in step 2.
      v_items := v_items || jsonb_build_object('row',v_row,'key',v_code,'file','countries',
        'op','create','fields',v_fields);
      v_adds := v_adds + 1;
      IF v_action = 'open' THEN
        v_active_keys := v_active_keys || ('country:' || v_code);
        v_items := v_items || jsonb_build_object('row',v_row,'key',v_code,'file','countries',
          'op','activate','fields','{}'::jsonb);
        v_reacts := v_reacts + 1;
      ELSIF v_action = 'close' THEN
        v_items := v_items || jsonb_build_object('row',v_row,'key',v_code,'file','countries',
          'op','noop','fields','{}'::jsonb,'detail','alreadyClosed');
        v_unchanged := v_unchanged + 1;
      END IF;
      CONTINUE;
    END IF;

    -- existing country: editable cells
    v_txt := public.cat_text(r->>'name_en');
    IF v_txt IS NOT NULL AND v_txt <> v_cty.name_en THEN
      v_fields := v_fields || jsonb_build_object('name_en', v_txt);
    END IF;
    v_txt := public.cat_text(r->>'unit_system');
    IF v_txt IS NOT NULL AND lower(v_txt) <> v_cty.unit_system THEN
      v_fields := v_fields || jsonb_build_object('unit_system', lower(v_txt));
    END IF;
    v_txt := public.cat_text(r->>'currency_code');
    IF v_txt IS NOT NULL AND upper(v_txt) IS DISTINCT FROM v_cty.currency_code THEN
      v_fields := v_fields || jsonb_build_object('currency_code', upper(v_txt));
    END IF;
    v_int := public.cat_int(r->>'display_order');
    IF v_int IS NOT NULL AND v_int <> v_cty.display_order THEN
      v_fields := v_fields || jsonb_build_object('display_order', v_int);
    END IF;
    IF r ? 'root_order' AND btrim(COALESCE(r->>'root_order','')) <> ''
       AND array_to_string(v_slugs,'|') IS DISTINCT FROM
           (public.country_export_row(v_code)->>'root_order') THEN
      v_fields := v_fields || jsonb_build_object('root_order', to_jsonb(v_slugs));
    END IF;

    -- INC-199: a status cell that differs needs the matching action
    IF public.cat_text(r->>'is_active') IS NOT NULL AND v_action NOT IN ('open','close') THEN
      v_bool := public.cat_bool(r->>'is_active', v_cty.is_active);
      IF v_bool IS DISTINCT FROM v_cty.is_active THEN
        v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
          'reason','statusNeedsAction','detail',
          'stored=' || CASE WHEN v_cty.is_active THEN 'true' ELSE 'false' END ||
          ' requested=' || CASE WHEN v_bool THEN 'true' ELSE 'false' END);
        CONTINUE;
      END IF;
    END IF;

    -- INC-215: a state action NEVER swallows the row's field edits. When both
    -- are present the entry carries the compound op and the preview counts
    -- BOTH the state change and the change; when the state is already what the
    -- action asks for, the edits still apply as a plain update.
    IF v_action = 'open' THEN
      IF v_cty.is_active THEN
        IF v_fields <> '{}'::jsonb THEN
          v_op := 'update'; v_detail := 'alreadyOpen'; v_changes := v_changes + 1;
        ELSE
          v_op := 'noop'; v_detail := 'alreadyOpen'; v_unchanged := v_unchanged + 1;
        END IF;
      ELSIF v_fields <> '{}'::jsonb THEN
        v_op := 'open+update'; v_detail := NULL;
        v_reacts := v_reacts + 1; v_changes := v_changes + 1;
      ELSE
        v_op := 'activate'; v_detail := NULL; v_reacts := v_reacts + 1;
      END IF;
    ELSIF v_action = 'close' THEN
      IF EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.scope_country = v_code) THEN
        v_ref := v_ref || jsonb_build_object('file','countries','row',v_row,'key',v_code,
          'reason','scopedRolesExist');
        CONTINUE;
      END IF;
      IF NOT v_cty.is_active THEN
        IF v_fields <> '{}'::jsonb THEN
          v_op := 'update'; v_detail := 'alreadyClosed'; v_changes := v_changes + 1;
        ELSE
          v_op := 'noop'; v_detail := 'alreadyClosed'; v_unchanged := v_unchanged + 1;
        END IF;
      ELSIF v_fields <> '{}'::jsonb THEN
        v_op := 'close+update'; v_detail := NULL;
        v_retires := v_retires + 1; v_changes := v_changes + 1;
      ELSE
        v_op := 'retire'; v_detail := NULL; v_retires := v_retires + 1;
      END IF;
    ELSIF v_fields <> '{}'::jsonb THEN
      v_op := 'update'; v_detail := NULL; v_changes := v_changes + 1;
    ELSE
      v_op := 'noop'; v_detail := NULL; v_unchanged := v_unchanged + 1;
    END IF;

    v_items := v_items || (jsonb_build_object('row',v_row,'key',v_code,'file','countries',
      'op',v_op,'fields',v_fields)
      || CASE WHEN v_detail IS NULL THEN '{}'::jsonb ELSE jsonb_build_object('detail',v_detail) END);
  END LOOP;

  -- ---------------- LOCATIONS FILE ----------------
  FOR r IN SELECT value FROM jsonb_array_elements(COALESCE(p_locations, '[]'::jsonb)) LOOP
    v_row := COALESCE(public.cat_int(r->>'row'), 0);
    v_raw := btrim(COALESCE(r->>'location_key', ''));
    v_action := lower(COALESCE(public.cat_text(r->>'action'), ''));
    v_fields := '{}'::jsonb; v_ignored := '{}'::text[]; v_detail := NULL;

    IF v_raw !~ '^[a-z0-9]+(-[a-z0-9]+)*(/[a-z0-9]+(-[a-z0-9]+)*){0,3}$' THEN
      v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_raw,
        'reason','badKey');
      CONTINUE;
    END IF;
    v_key := v_raw;
    v_segs := string_to_array(v_key, '/');
    v_depth := array_length(v_segs, 1);
    v_level := CASE v_depth WHEN 1 THEN 'country' WHEN 2 THEN 'region'
                            WHEN 3 THEN 'city' ELSE 'sub_city' END;

    IF v_action NOT IN ('','upsert','activate','retire','delete') THEN
      v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
        'reason','badAction','detail',v_action);
      CONTINUE;
    END IF;
    IF v_key = ANY(v_seen_keys) THEN
      v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
        'reason','duplicateKey');
      CONTINUE;
    END IF;
    v_seen_keys := v_seen_keys || v_key;

    -- the country anchor
    SELECT l.country_code INTO v_cc FROM public.locations l
     WHERE l.level = 'country' AND l.slug = v_segs[1] LIMIT 1;
    IF v_cc IS NULL THEN
      IF v_depth = 1 THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','countryRowByActivation');
      ELSE
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','unknownParent');
      END IF;
      CONTINUE;
    END IF;
    IF v_scope IS NOT NULL AND v_cc <> v_scope THEN
      v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
        'reason','outOfScope','detail',v_scope);
      CONTINUE;
    END IF;

    -- the parent
    v_parent_id := NULL; v_parent_active := NULL; v_parent_key := NULL;
    IF v_depth > 1 THEN
      v_parent_key := array_to_string(v_segs[1:v_depth-1], '/');
      v_parent_id := public.loc_id_of_key(v_parent_key);
      IF v_parent_id IS NULL AND NOT (v_parent_key = ANY(v_created_keys)) THEN
        IF EXISTS (SELECT 1 FROM jsonb_array_elements(COALESCE(p_locations,'[]'::jsonb)) e
                    WHERE btrim(COALESCE(e.value->>'location_key','')) = v_parent_key) THEN
          v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
            'reason','unknownParent','detail','parentLaterInFile');
        ELSE
          v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
            'reason','unknownParent');
        END IF;
        CONTINUE;
      END IF;
      IF v_parent_id IS NOT NULL THEN
        SELECT l.is_active INTO v_parent_active FROM public.locations l WHERE l.id = v_parent_id;
      ELSE
        v_parent_active := false;
      END IF;
      IF v_parent_key = ANY(v_active_keys) THEN v_parent_active := true; END IF;
    END IF;

    -- iso only on regions
    IF public.cat_text(r->>'iso_3166_2') IS NOT NULL AND v_level <> 'region' THEN
      v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
        'reason','isoOnRegionsOnly');
      CONTINUE;
    END IF;

    v_id := public.loc_id_of_key(v_key);

    -- ---- NEW KEY ----
    IF v_id IS NULL THEN
      IF v_action IN ('retire','delete') THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','unknownKey');
        CONTINUE;
      END IF;
      IF public.cat_text(r->>'name_en') IS NULL THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','nameRequired');
        CONTINUE;
      END IF;
      IF v_level IN ('city','sub_city')
         AND (public.loc_num(r->>'center_lat') IS NULL OR public.loc_num(r->>'center_lng') IS NULL) THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','missingCoordinates');
        CONTINUE;
      END IF;
      -- INC-209: depth 2 (a region under the anchor) is EXEMPT; depth 3/4 keep the rule.
      IF v_action = 'activate' AND v_depth > 2 AND NOT COALESCE(v_parent_active, false) THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','parentInactive','detail',v_parent_key);
        CONTINUE;
      END IF;

      v_fields := jsonb_build_object('name_en', public.cat_text(r->>'name_en'),
        'level', v_level, 'country_code', v_cc,
        'display_order', COALESCE(public.cat_int(r->>'display_order'), 0),
        'is_active', (v_action = 'activate'));
      IF public.cat_text(r->>'name_am') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('name_am', public.cat_text(r->>'name_am'));
      END IF;
      IF public.cat_text(r->>'iso_3166_2') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('iso_3166_2', upper(public.cat_text(r->>'iso_3166_2')));
      END IF;
      IF btrim(COALESCE(r->>'aliases','')) <> '' THEN
        v_fields := v_fields || jsonb_build_object('aliases', to_jsonb(public.cat_pipe(r->>'aliases')));
      END IF;
      IF public.loc_num(r->>'center_lat') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('center_lat', public.loc_num(r->>'center_lat'));
      END IF;
      IF public.loc_num(r->>'center_lng') IS NOT NULL THEN
        v_fields := v_fields || jsonb_build_object('center_lng', public.loc_num(r->>'center_lng'));
      END IF;

      v_created_keys := v_created_keys || v_key;
      IF v_action = 'activate' THEN v_active_keys := v_active_keys || v_key; END IF;
      v_items := v_items || jsonb_build_object('row',v_row,'key',v_key,'file','locations',
        'op','create','fields',v_fields);
      v_adds := v_adds + 1;
      CONTINUE;
    END IF;

    -- ---- EXISTING KEY ----
    SELECT * INTO v_loc FROM public.locations WHERE id = v_id;

    -- read-only cells are never applied (IE-3): report a difference
    IF public.cat_text(r->>'level') IS NOT NULL AND lower(public.cat_text(r->>'level')) <> v_loc.level THEN
      v_ignored := v_ignored || 'level';
    END IF;
    IF public.cat_text(r->>'country_code') IS NOT NULL
       AND upper(public.cat_text(r->>'country_code')) <> v_loc.country_code THEN
      v_ignored := v_ignored || 'country_code';
    END IF;
    IF public.cat_text(r->>'source') IS NOT NULL AND lower(public.cat_text(r->>'source')) <> v_loc.source THEN
      v_ignored := v_ignored || 'source';
    END IF;
    IF public.cat_text(r->>'location_path') IS NOT NULL
       AND public.cat_text(r->>'location_path') <> public.loc_path_of(v_id) THEN
      v_ignored := v_ignored || 'location_path';
    END IF;
    IF public.cat_int(r->>'listing_count') IS NOT NULL
       AND public.cat_int(r->>'listing_count') <>
           (SELECT count(*) FROM public.listings li WHERE li.location_id = v_id) THEN
      v_ignored := v_ignored || 'listing_count';
    END IF;

    v_txt := public.cat_text(r->>'name_en');
    IF v_txt IS NOT NULL AND v_txt <> v_loc.name_en THEN
      v_fields := v_fields || jsonb_build_object('name_en', v_txt);
    END IF;
    v_txt := public.cat_text(r->>'iso_3166_2');
    IF v_txt IS NOT NULL AND upper(v_txt) IS DISTINCT FROM v_loc.iso_3166_2 THEN
      v_fields := v_fields || jsonb_build_object('iso_3166_2', upper(v_txt));
    END IF;
    IF r ? 'aliases' AND public.cat_pipe(r->>'aliases') IS DISTINCT FROM COALESCE(v_loc.aliases,'{}'::text[]) THEN
      v_fields := v_fields || jsonb_build_object('aliases', to_jsonb(public.cat_pipe(r->>'aliases')));
    END IF;
    v_int := public.cat_int(r->>'display_order');
    IF v_int IS NOT NULL AND v_int <> v_loc.display_order THEN
      v_fields := v_fields || jsonb_build_object('display_order', v_int);
    END IF;
    v_num := public.loc_num(r->>'center_lat');
    IF v_num IS NOT NULL AND v_num IS DISTINCT FROM v_loc.center_lat THEN
      v_fields := v_fields || jsonb_build_object('center_lat', v_num);
    END IF;
    v_num := public.loc_num(r->>'center_lng');
    IF v_num IS NOT NULL AND v_num IS DISTINCT FROM v_loc.center_lng THEN
      v_fields := v_fields || jsonb_build_object('center_lng', v_num);
    END IF;
    v_am := public.cat_text(r->>'name_am');
    IF v_am IS NOT NULL THEN
      v_cur_am := public.loc_export_row(v_id)->>'name_am';
      IF v_am <> COALESCE(v_cur_am,'') THEN
        v_fields := v_fields || jsonb_build_object('name_am', v_am);
      END IF;
    END IF;

    IF public.cat_text(r->>'is_active') IS NOT NULL AND v_action NOT IN ('activate','retire') THEN
      v_bool := public.cat_bool(r->>'is_active', v_loc.is_active);
      IF v_bool IS DISTINCT FROM v_loc.is_active THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','statusNeedsAction','detail',
          'stored=' || CASE WHEN v_loc.is_active THEN 'true' ELSE 'false' END ||
          ' requested=' || CASE WHEN v_bool THEN 'true' ELSE 'false' END);
        CONTINUE;
      END IF;
    END IF;

    IF v_action = 'delete' THEN
      v_detail := NULL;
      SELECT count(*) INTO v_n FROM public.locations c
       WHERE c.parent_id = v_id
         AND NOT (public.loc_key_of(c.id) = ANY(v_deleted_keys));
      IF v_n > 0 THEN v_detail := 'hasChildren'; END IF;
      IF v_detail IS NULL AND EXISTS (SELECT 1 FROM public.listings li WHERE li.location_id = v_id) THEN
        v_detail := 'hasListings';
      END IF;
      IF v_detail IS NULL AND EXISTS (SELECT 1 FROM public.listing_locations ll WHERE ll.location_id = v_id) THEN
        v_detail := 'hasCoverage';
      END IF;
      IF v_detail IS NULL AND EXISTS (SELECT 1 FROM public.profiles pr WHERE pr.default_post_location_id = v_id) THEN
        v_detail := 'hasProfileDefaults';
      END IF;
      IF v_detail IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','deleteBlocked','detail',v_detail);
        CONTINUE;
      END IF;
      v_deleted_keys := v_deleted_keys || v_key;
      v_items := v_items || jsonb_build_object('row',v_row,'key',v_key,'file','locations',
        'op','delete','fields','{}'::jsonb);
      v_deletes := v_deletes + 1;
      CONTINUE;
    END IF;

    IF v_action = 'activate' THEN
      IF v_loc.is_active THEN
        v_op := 'noop'; v_detail := 'alreadyActive'; v_unchanged := v_unchanged + 1;
        v_active_keys := v_active_keys || v_key;
      -- INC-209: depth 2 (a region under the anchor) is EXEMPT; depth 3/4 keep the rule.
      ELSIF v_depth > 2 AND NOT COALESCE(v_parent_active, false) THEN
        v_ref := v_ref || jsonb_build_object('file','locations','row',v_row,'key',v_key,
          'reason','parentInactive','detail',v_parent_key);
        CONTINUE;
      ELSE
        v_op := 'activate'; v_detail := NULL; v_reacts := v_reacts + 1;
        v_active_keys := v_active_keys || v_key;
      END IF;
    ELSIF v_action = 'retire' THEN
      IF NOT v_loc.is_active THEN
        v_op := 'noop'; v_detail := 'alreadyRetired'; v_unchanged := v_unchanged + 1;
      ELSE
        v_op := 'retire'; v_detail := NULL; v_retires := v_retires + 1;
      END IF;
    ELSIF v_fields <> '{}'::jsonb THEN
      v_op := 'update'; v_detail := NULL; v_changes := v_changes + 1;
      IF v_loc.is_active THEN v_active_keys := v_active_keys || v_key; END IF;
    ELSE
      v_op := 'noop'; v_detail := NULL; v_unchanged := v_unchanged + 1;
      IF v_loc.is_active THEN v_active_keys := v_active_keys || v_key; END IF;
    END IF;

    v_items := v_items || (jsonb_build_object('row',v_row,'key',v_key,'file','locations',
        'op',v_op,'fields',v_fields)
      || CASE WHEN v_detail IS NULL THEN '{}'::jsonb ELSE jsonb_build_object('detail',v_detail) END
      || CASE WHEN array_length(v_ignored,1) IS NULL THEN '{}'::jsonb
              ELSE jsonb_build_object('ignored', to_jsonb(v_ignored)) END);
  END LOOP;

  RETURN jsonb_build_object(
    'counts', jsonb_build_object('adds',v_adds,'changes',v_changes,'retires',v_retires,
      'reactivations',v_reacts,'deletes',v_deletes,'unchanged',v_unchanged,
      'refusals', jsonb_array_length(v_ref)),
    'refusals', v_ref,
    'items', v_items);
END $plan$;
REVOKE ALL ON FUNCTION public.loc_import_plan(jsonb, jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_import_plan(jsonb, jsonb, text) TO service_role;

-- ============================================================
-- A.2 public.admin_commit_location_import(jsonb, jsonb, text, text)
--     WHOLE re-declaration. Body of 20260915170752_55cdd205 byte-for-byte
--     EXCEPT the country open/close steps, which now also carry the new
--     compound ops and apply the state change AND the field edits in ONE
--     statement (INC-200 law), writing BOTH an 'update' revision (fields,
--     prev -> post) and the state revision so the existing undo reverts both.
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_commit_location_import(
  p_countries jsonb, p_locations jsonb, p_scope text, p_digest text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_plan jsonb; v_batch uuid := gen_random_uuid(); v_uid uuid := auth.uid();
  it jsonb; f jsonb; v_key text; v_code char(2); v_id uuid; v_prev jsonb;
  v_segs text[]; v_depth int; v_parent_id uuid; v_anchor uuid;
  v_am_prev jsonb; v_row public.countries; v_pos int;
BEGIN
  IF NOT public.has_permission(v_uid, 'locations', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'import');
  IF NOT pg_try_advisory_xact_lock(hashtext('location-import'), hashtext(v_uid::text)) THEN
    RAISE EXCEPTION 'import already running';
  END IF;

  v_plan := public.loc_import_plan(p_countries, p_locations, p_scope);
  IF jsonb_array_length(v_plan->'refusals') > 0 THEN
    RAISE EXCEPTION 'planHasRefusals';
  END IF;

  -- (1) countries create / update ------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('create','update') LOOP
    v_code := it->>'key'; f := it->'fields';
    IF it->>'op' = 'create' THEN
      INSERT INTO public.countries (code, name_en, is_active, unit_system, currency_code, display_order)
      VALUES (v_code, f->>'name_en', false,
              COALESCE(f->>'unit_system','metric'),
              NULLIF(COALESCE(f->>'currency_code',''),'')::char(3),
              COALESCE((f->>'display_order')::int, 0));
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','create',v_code,NULL,public.country_export_row(v_code),v_uid);
    ELSE
      v_prev := public.country_export_row(v_code);
      UPDATE public.countries SET
        name_en       = COALESCE(f->>'name_en', name_en),
        unit_system   = COALESCE(f->>'unit_system', unit_system),
        currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
        display_order = COALESCE((f->>'display_order')::int, display_order),
        updated_at    = now()
       WHERE code = v_code;
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
  END LOOP;

  -- (2) country open: the market and its tree anchor -------------------------
  --     INC-215: 'open+update' opens the market AND applies the row's edits in
  --     ONE statement; the anchor is named from the POST-update row.
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('activate','open+update') LOOP
    v_code := it->>'key'; f := it->'fields';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET
      is_active     = true,
      name_en       = COALESCE(f->>'name_en', name_en),
      unit_system   = COALESCE(f->>'unit_system', unit_system),
      currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
      display_order = COALESCE((f->>'display_order')::int, display_order),
      updated_at    = now()
     WHERE code = v_code;
    SELECT * INTO v_row FROM public.countries WHERE code = v_code;
    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL,'country',v_code,v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'import');
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
    END IF;
    IF it->>'op' = 'open+update' THEN
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'country','open',v_code,v_prev,public.country_export_row(v_code),v_uid);
  END LOOP;

  -- (3a) location creates, shallowest first ---------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'create'
             ORDER BY array_length(string_to_array(value->>'key','/'),1),
                      (value->>'row')::int LOOP
    v_key := it->>'key'; f := it->'fields';
    v_segs := string_to_array(v_key,'/'); v_depth := array_length(v_segs,1);
    v_parent_id := CASE WHEN v_depth > 1
      THEN public.loc_id_of_key(array_to_string(v_segs[1:v_depth-1],'/')) END;
    -- INC-200 law: one statement carries every cell.
    INSERT INTO public.locations
      (parent_id, level, country_code, name_en, slug, iso_3166_2, aliases,
       display_order, center_lat, center_lng, is_active, source)
    VALUES (v_parent_id, f->>'level', (f->>'country_code')::char(2), f->>'name_en',
            v_segs[v_depth], NULLIF(COALESCE(f->>'iso_3166_2',''),''),
            COALESCE(ARRAY(SELECT jsonb_array_elements_text(COALESCE(f->'aliases','[]'::jsonb))), '{}'::text[]),
            COALESCE((f->>'display_order')::int, 0),
            (f->>'center_lat')::double precision, (f->>'center_lng')::double precision,
            COALESCE((f->>'is_active')::boolean, false), 'import')
    RETURNING id INTO v_id;
    IF COALESCE(f->>'name_am','') <> '' THEN
      PERFORM public.admin_save_entity_translation('location', v_id, 'name', 'am', f->>'name_am');
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','create',v_key,
            jsonb_build_object('id',v_id,'parent_id',v_parent_id,'am_state',NULL),
            public.loc_export_row(v_id), v_uid);
  END LOOP;

  -- (3b) location updates ---------------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'locations' AND value->>'op' IN ('update','noop') LOOP
    f := it->'fields';
    CONTINUE WHEN f = '{}'::jsonb;
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    CONTINUE WHEN v_id IS NULL;
    SELECT jsonb_build_object('value',t.value,'status',t.status,'machine',t.machine)
      INTO v_am_prev FROM public.entity_translations t
     WHERE t.entity_type='location' AND t.entity_id=v_id AND t.field='name' AND t.lang_code='am';
    v_prev := public.loc_export_row(v_id)
              || jsonb_build_object('id',v_id,'am_state',v_am_prev);
    UPDATE public.locations SET
      name_en       = COALESCE(f->>'name_en', name_en),
      iso_3166_2    = CASE WHEN f ? 'iso_3166_2' THEN NULLIF(f->>'iso_3166_2','') ELSE iso_3166_2 END,
      aliases       = CASE WHEN f ? 'aliases'
                        THEN COALESCE(ARRAY(SELECT jsonb_array_elements_text(f->'aliases')), '{}'::text[])
                        ELSE aliases END,
      display_order = COALESCE((f->>'display_order')::int, display_order),
      center_lat    = COALESCE((f->>'center_lat')::double precision, center_lat),
      center_lng    = COALESCE((f->>'center_lng')::double precision, center_lng),
      updated_at    = now()
     WHERE id = v_id;
    IF COALESCE(f->>'name_am','') <> '' THEN
      PERFORM public.admin_save_entity_translation('location', v_id, 'name', 'am', f->>'name_am');
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','update',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (3c) activations, shallowest first --------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'activate'
             ORDER BY array_length(string_to_array(value->>'key','/'),1) LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    v_prev := public.loc_export_row(v_id) || jsonb_build_object('id',v_id);
    UPDATE public.locations SET is_active = true, updated_at = now() WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','activate',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (4) retires -------------------------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'locations' AND value->>'op' = 'retire' LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    v_prev := public.loc_export_row(v_id) || jsonb_build_object('id',v_id);
    UPDATE public.locations SET is_active = false, updated_at = now() WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','retire',v_key,v_prev,public.loc_export_row(v_id),v_uid);
  END LOOP;

  -- (5) deletes, deepest first ---------------------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items') value
             WHERE value->>'file' = 'locations' AND value->>'op' = 'delete'
             ORDER BY array_length(string_to_array(value->>'key','/'),1) DESC LOOP
    v_key := it->>'key'; v_id := public.loc_id_of_key(v_key);
    CONTINUE WHEN v_id IS NULL;
    SELECT jsonb_build_object('value',t.value,'status',t.status,'machine',t.machine)
      INTO v_am_prev FROM public.entity_translations t
     WHERE t.entity_type='location' AND t.entity_id=v_id AND t.field='name' AND t.lang_code='am';
    SELECT parent_id INTO v_parent_id FROM public.locations WHERE id = v_id;
    v_prev := public.loc_export_row(v_id)
              || jsonb_build_object('id',v_id,'parent_id',v_parent_id,'am_state',v_am_prev);
    DELETE FROM public.entity_translations
     WHERE entity_type='location' AND entity_id=v_id;
    DELETE FROM public.locations WHERE id = v_id;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'location','delete',v_key,v_prev,NULL,v_uid);
  END LOOP;

  -- (6) country close ------------------------------------------------------
  --     INC-215: 'close+update' closes the market AND applies the row's edits
  --     in ONE statement, writing both revisions.
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' IN ('retire','close+update') LOOP
    v_code := it->>'key'; f := it->'fields';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET
      is_active     = false,
      name_en       = COALESCE(f->>'name_en', name_en),
      unit_system   = COALESCE(f->>'unit_system', unit_system),
      currency_code = COALESCE(NULLIF(COALESCE(f->>'currency_code',''),'')::char(3), currency_code),
      display_order = COALESCE((f->>'display_order')::int, display_order),
      updated_at    = now()
     WHERE code = v_code;
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;
    IF it->>'op' = 'close+update' THEN
      INSERT INTO public.location_import_revisions
        (batch_id, entity_type, action, entity_key, prev, post, created_by)
      VALUES (v_batch,'country','update',v_code,v_prev,public.country_export_row(v_code),v_uid);
    END IF;
    INSERT INTO public.location_import_revisions
      (batch_id, entity_type, action, entity_key, prev, post, created_by)
    VALUES (v_batch,'country','close',v_code,v_prev,public.country_export_row(v_code),v_uid);
  END LOOP;

  -- (7) root order, one statement per country ------------------------------
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND (value->'fields') ? 'root_order' LOOP
    v_code := it->>'key';
    DELETE FROM public.country_root_order WHERE country_code = v_code;
    INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
    SELECT v_code, c.id, s.ord, v_uid
      FROM jsonb_array_elements_text(it->'fields'->'root_order') WITH ORDINALITY AS s(slug, ord)
      JOIN public.categories c ON c.slug = s.slug;
  END LOOP;

  PERFORM public.log_audit('location.import.commit','locations',v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch, 'counts', v_plan->'counts',
                            'refusals', '[]'::jsonb);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_location_import(jsonb, jsonb, text, text) TO service_role;

-- ============================================================
-- A.3 INC-220 — the listing-photos object policies key on the OWNER segment.
--     DEC-075 made the key partition-first: <partition>/<uid>/<listing>/<photo>/<variant>.
--     Segment 1 is the partition, so the owner is segment 2.
--     The bucket holds NO objects under the old shape (census (d)), so there is
--     no OR on segment [1].
--     listing_photos_object_public_read is left EXACTLY as it is: it is
--     partition-agnostic (it joins storage_path) and stays gated on
--     exif_stripped AND an active listing.
-- ============================================================
DROP POLICY IF EXISTS listing_photos_object_insert ON storage.objects;
CREATE POLICY listing_photos_object_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'listing-photos'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

DROP POLICY IF EXISTS listing_photos_object_owner_read ON storage.objects;
CREATE POLICY listing_photos_object_owner_read ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'listing-photos'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

DROP POLICY IF EXISTS listing_photos_object_owner_delete ON storage.objects;
CREATE POLICY listing_photos_object_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'listing-photos'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

INSERT INTO public.migration_marks(version) VALUES ('20260917140000') ON CONFLICT DO NOTHING;