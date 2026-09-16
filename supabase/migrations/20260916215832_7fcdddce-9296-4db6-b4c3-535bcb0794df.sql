-- INC-209 — the country anchor is exempt from parentInactive: a market's tree may be
-- prepared while the market is closed; the path rule (get_location_tree requires an open
-- market AND an active anchor) keeps it hidden; INC-183 whole re-declarations.

-- ============================================================
-- 2.3a BEFORE-STATE capture (INC-200 pattern)
-- ============================================================
CREATE TEMP TABLE fn_before AS
SELECT p.oid,
       p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')' AS sig,
       md5(pg_get_functiondef(p.oid)) AS def_md5,
       md5(COALESCE(p.proacl::text, '')) AS acl_md5
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
 WHERE n.nspname = 'public'
   AND p.proname ~ '(loc|countr|coverage|geo_)';

-- ============================================================
-- 2.1 public.locations_ancestry_guard() — WHOLE re-declaration
-- ============================================================
CREATE OR REPLACE FUNCTION public.locations_ancestry_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_parent public.locations;
  v_rank   int;
  v_prank  int;
BEGIN
  IF (NEW.parent_id IS NULL) <> (NEW.level = 'country') THEN
    RAISE EXCEPTION 'rootMustBeCountry';
  END IF;

  IF NEW.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' THEN
    RAISE EXCEPTION 'badSlug';
  END IF;

  IF NEW.level IN ('city','sub_city')
     AND (NEW.center_lat IS NULL OR NEW.center_lng IS NULL) THEN
    RAISE EXCEPTION 'missingCoordinates';
  END IF;

  v_rank := CASE NEW.level
              WHEN 'country' THEN 0 WHEN 'region' THEN 1
              WHEN 'city' THEN 2 WHEN 'sub_city' THEN 3 END;

  IF NEW.parent_id IS NULL THEN
    NEW.region_id := NULL;
    NEW.city_id := NULL;
    RETURN NEW;
  END IF;

  SELECT * INTO v_parent FROM public.locations WHERE id = NEW.parent_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'parentMissing';
  END IF;

  v_prank := CASE v_parent.level
               WHEN 'country' THEN 0 WHEN 'region' THEN 1
               WHEN 'city' THEN 2 WHEN 'sub_city' THEN 3 END;
  IF v_rank IS DISTINCT FROM v_prank + 1 THEN
    RAISE EXCEPTION 'levelMismatch';
  END IF;

  IF NEW.country_code <> v_parent.country_code THEN
    RAISE EXCEPTION 'crossCountry';
  END IF;

  -- INC-209: the ANCHOR is exempt. A market's tree is prepared while the market is
  -- closed (the anchor is inactive); the path rule keeps it hidden. Below the anchor
  -- the rule is unchanged: a city under a retired region is still refused.
  IF NEW.is_active AND NOT v_parent.is_active AND v_parent.level <> 'country' THEN
    RAISE EXCEPTION 'parentInactive';
  END IF;

  -- FILL, ignoring whatever the caller sent.
  IF NEW.level = 'region' THEN
    NEW.region_id := NULL;
    NEW.city_id := NULL;
  ELSIF NEW.level = 'city' THEN
    NEW.region_id := v_parent.id;
    NEW.city_id := NULL;
  ELSE
    NEW.region_id := v_parent.region_id;
    NEW.city_id := v_parent.id;
  END IF;

  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.locations_ancestry_guard() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS locations_ancestry_guard ON public.locations;
CREATE TRIGGER locations_ancestry_guard
  BEFORE INSERT OR UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.locations_ancestry_guard();

-- ============================================================
-- 2.2 public.loc_import_plan(jsonb, jsonb, text) — WHOLE re-declaration
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

    IF v_action = 'open' THEN
      IF v_cty.is_active THEN
        v_op := 'noop'; v_detail := 'alreadyOpen'; v_unchanged := v_unchanged + 1;
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
        v_op := 'noop'; v_detail := 'alreadyClosed'; v_unchanged := v_unchanged + 1;
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
-- 2.4 PROOF P1 — the guard, under the CLOSED 'CA' anchor
-- ============================================================
DO $p1$
DECLARE
  v_anchor uuid; v_region uuid; v_city uuid; v_sub uuid;
  v_open boolean; v_n int; v_msg text;
BEGIN
  SELECT is_active INTO v_open FROM public.countries WHERE code = 'CA';
  IF v_open THEN RAISE EXCEPTION 'P1 precondition: CA is OPEN'; END IF;
  SELECT id INTO v_anchor FROM public.locations WHERE country_code='CA' AND level='country';
  IF (SELECT is_active FROM public.locations WHERE id = v_anchor) THEN
    RAISE EXCEPTION 'P1 precondition: the CA anchor is ACTIVE';
  END IF;

  -- (1) an ACTIVE region under the CLOSED anchor — the exemption
  INSERT INTO public.locations(parent_id, level, country_code, name_en, slug, is_active, source)
  VALUES (v_anchor, 'region', 'CA', 'E2E L3 Region', 'e2e-l3-region', true, 'admin')
  RETURNING id INTO v_region;

  -- (2) an ACTIVE city under the ACTIVE region
  INSERT INTO public.locations(parent_id, level, country_code, name_en, slug, is_active,
                               center_lat, center_lng, source)
  VALUES (v_region, 'city', 'CA', 'E2E L3 City', 'e2e-l3-city', true, 45.5, -73.6, 'admin')
  RETURNING id INTO v_city;

  -- (3) retire the region; a sub-city under the still-ACTIVE city succeeds
  UPDATE public.locations SET is_active = false WHERE id = v_region;
  IF (SELECT is_active FROM public.locations WHERE id = v_city) IS NOT TRUE THEN
    RAISE EXCEPTION 'P1: retiring the region cascaded onto the city';
  END IF;
  INSERT INTO public.locations(parent_id, level, country_code, name_en, slug, is_active,
                               center_lat, center_lng, source)
  VALUES (v_city, 'sub_city', 'CA', 'E2E L3 Sub', 'e2e-l3-sub', true, 45.51, -73.61, 'admin')
  RETURNING id INTO v_sub;

  -- (4) the rule BELOW the anchor still holds
  UPDATE public.locations SET is_active = false WHERE id = v_city;
  BEGIN
    UPDATE public.locations SET is_active = true WHERE id = v_city;
    RAISE EXCEPTION 'P1: a city under a RETIRED region was accepted';
  EXCEPTION WHEN others THEN
    v_msg := SQLERRM;
    IF v_msg <> 'parentInactive' THEN
      RAISE EXCEPTION 'P1: expected parentInactive, got %', v_msg;
    END IF;
  END;

  -- (5) the path rule: the market is CLOSED, so the tree is empty
  SELECT count(*) INTO v_n FROM public.get_location_tree('CA');
  IF v_n <> 0 THEN RAISE EXCEPTION 'P1: a CLOSED market returned % tree rows', v_n; END IF;

  -- (6) proof write — open the market, then the tree shows the prepared rows
  UPDATE public.countries SET is_active = true WHERE code = 'CA';
  UPDATE public.locations SET is_active = true WHERE id = v_anchor;
  UPDATE public.locations SET is_active = true WHERE id = v_region;
  UPDATE public.locations SET is_active = true WHERE id = v_city;
  SELECT count(*) INTO v_n FROM public.get_location_tree('CA');
  IF v_n < 3 THEN RAISE EXCEPTION 'P1: an OPEN market returned only % tree rows', v_n; END IF;
  RAISE NOTICE 'P1 tree rows when OPEN: %', v_n;

  -- (7) revert every proof write, child-first
  DELETE FROM public.locations WHERE id = v_sub;
  DELETE FROM public.locations WHERE id = v_city;
  DELETE FROM public.locations WHERE id = v_region;
  UPDATE public.locations SET is_active = false WHERE id = v_anchor;
  UPDATE public.countries SET is_active = false WHERE code = 'CA';

  SELECT count(*) INTO v_n FROM public.locations WHERE country_code = 'CA';
  IF v_n <> 1 THEN RAISE EXCEPTION 'P1 revert: CA carries % rows, expected 1', v_n; END IF;
  IF (SELECT is_active FROM public.countries WHERE code='CA') THEN
    RAISE EXCEPTION 'P1 revert: CA is still OPEN';
  END IF;
END $p1$;

-- ============================================================
-- 2.4 PROOF P2 — the planner
-- ============================================================
DO $p2$
DECLARE
  v_plan jsonb; v_n int; v_reason text;
BEGIN
  v_plan := public.loc_import_plan('[]'::jsonb, jsonb_build_array(
      jsonb_build_object('row',1,'location_key','canada/e2e-l3-province',
        'name_en','E2E L3 Province','action','activate'),
      jsonb_build_object('row',2,'location_key','canada/e2e-l3-province/e2e-l3-metro',
        'name_en','E2E L3 Metro','action','activate',
        'center_lat','45.5','center_lng','-73.6')), 'CA');
  IF (v_plan->'counts'->>'adds')::int <> 2 THEN
    RAISE EXCEPTION 'P2: adds = %, expected 2 (%)', v_plan->'counts'->>'adds', v_plan->'refusals';
  END IF;
  IF (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'P2: refusals = % (%)', v_plan->'counts'->>'refusals', v_plan->'refusals';
  END IF;

  -- INC-199 unchanged: a status cell without its action, on an EXISTING key.
  v_plan := public.loc_import_plan('[]'::jsonb, jsonb_build_array(
      jsonb_build_object('row',1,'location_key','canada',
        'name_en','Canada','is_active','true')), 'CA');
  v_reason := v_plan->'refusals'->0->>'reason';
  IF v_reason IS DISTINCT FROM 'statusNeedsAction' THEN
    RAISE EXCEPTION 'P2: expected statusNeedsAction, got % (%)', v_reason, v_plan->'refusals';
  END IF;
END $p2$;

-- ============================================================
-- 2.3b READ-BACK — exactly two definitions changed, no ACL moved
-- ============================================================
DO $p3$
DECLARE
  v_changed text[];
  v_acl text[];
BEGIN
  SELECT COALESCE(array_agg(b.sig ORDER BY b.sig), '{}')
    INTO v_changed
    FROM fn_before b
    JOIN pg_proc p ON p.oid = b.oid
   WHERE md5(pg_get_functiondef(p.oid)) <> b.def_md5;

  IF v_changed <> ARRAY['loc_import_plan(p_countries jsonb, p_locations jsonb, p_scope text)',
                       'locations_ancestry_guard()'] THEN
    RAISE EXCEPTION 'READ-BACK: changed definitions = %', v_changed;
  END IF;

  SELECT COALESCE(array_agg(b.sig ORDER BY b.sig), '{}')
    INTO v_acl
    FROM fn_before b
    JOIN pg_proc p ON p.oid = b.oid
   WHERE md5(COALESCE(p.proacl::text, '')) <> b.acl_md5;
  IF v_acl <> '{}'::text[] THEN
    RAISE EXCEPTION 'READ-BACK: ACL moved on %', v_acl;
  END IF;

  RAISE NOTICE 'READ-BACK: exactly two definitions changed, ACLs identical';
END $p3$;

DROP TABLE fn_before;

INSERT INTO public.migration_marks(version) VALUES ('20260916220000') ON CONFLICT DO NOTHING;