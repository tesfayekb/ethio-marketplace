-- L1b-M — LOCATIONS ERA · IMPORT FAMILY, DATABASE SIDE (Tier A)
-- Purpose: the `locations` import family's database half — revisions table,
-- key/path/export helpers, the two-file planner, the export, and the three
-- gated doors (preview · commit · undo). The registry, gate, routes and the
-- hostile catalogue land at L1b-C.
-- Spec: docs/governance/locations-era-spec.md §4 L1b; DEC-064 (coverage
-- untouched here); IE-4a Amharic carrier; INC-198/199 law (statusNeedsAction;
-- action rows carry their cells); INC-200 law (a row writes all its cells in
-- one statement).
-- Mirrors the categories machinery: planner 20260915114812 (de5a1373),
-- revisions 20260907194932. The cell readers cat_text/cat_int/cat_bool/cat_pipe
-- are REUSED by name (B1); only a numeric reader (loc_num) is new because no
-- cat_* equivalent exists.
-- POSITIVE-PATH door behaviour is proven at L1b-C through the route: a
-- migration cannot hold a permitted, step-up-fresh identity, and faking one
-- would prove nothing. The proofs here are the planner, the write sequence,
-- DENY and ACLs.
-- DEC-022: declared mark 20260915190000.

-- ============================================================
-- 2.1 REVISIONS TABLE (mirror of category_import_revisions)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.location_import_revisions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id    uuid NOT NULL,
  entity_type text NOT NULL CHECK (entity_type IN ('country','location')),
  action      text NOT NULL CHECK (action IN ('create','update','activate','retire','delete','open','close')),
  entity_key  text NOT NULL,
  prev        jsonb,
  post        jsonb,
  undone_at   timestamptz,
  created_by  uuid NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lir_batch
  ON public.location_import_revisions(batch_id, id);

GRANT ALL ON TABLE public.location_import_revisions TO service_role;

ALTER TABLE public.location_import_revisions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS location_import_revisions_no_client_access ON public.location_import_revisions;
CREATE POLICY location_import_revisions_no_client_access
  ON public.location_import_revisions
  FOR ALL TO authenticated, anon
  USING (false) WITH CHECK (false);

-- ============================================================
-- 2.2 HELPERS (service_role-only closers; the doors call them)
-- ============================================================

-- numeric cell reader (no cat_* equivalent exists; coordinates are not ints)
CREATE OR REPLACE FUNCTION public.loc_num(p_text text)
RETURNS double precision LANGUAGE plpgsql IMMUTABLE SET search_path TO 'public' AS $fn$
BEGIN
  IF p_text IS NULL OR btrim(p_text) = '' THEN RETURN NULL; END IF;
  RETURN btrim(p_text)::double precision;
EXCEPTION WHEN others THEN RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.loc_num(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_num(text) TO service_role;

CREATE OR REPLACE FUNCTION public.loc_key_of(p_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $fn$
  WITH RECURSIVE up AS (
    SELECT l.id, l.parent_id, l.slug, 0 AS d
      FROM public.locations l WHERE l.id = p_id
    UNION ALL
    SELECT p.id, p.parent_id, p.slug, up.d + 1
      FROM public.locations p JOIN up ON p.id = up.parent_id
  )
  SELECT string_agg(slug, '/' ORDER BY d DESC) FROM up
$fn$;
REVOKE ALL ON FUNCTION public.loc_key_of(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_key_of(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.loc_path_of(p_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $fn$
  WITH RECURSIVE up AS (
    SELECT l.id, l.parent_id, l.name_en, 0 AS d
      FROM public.locations l WHERE l.id = p_id
    UNION ALL
    SELECT p.id, p.parent_id, p.name_en, up.d + 1
      FROM public.locations p JOIN up ON p.id = up.parent_id
  )
  SELECT string_agg(name_en, ' › ' ORDER BY d DESC) FROM up
$fn$;
REVOKE ALL ON FUNCTION public.loc_path_of(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_path_of(uuid) TO service_role;

-- the locations file's row; the key ORDER here is the file's contract (2.4).
CREATE OR REPLACE FUNCTION public.loc_export_row(p_id uuid)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $fn$
  SELECT jsonb_build_object(
    'location_path', COALESCE(public.loc_path_of(l.id), ''),
    'location_key',  COALESCE(public.loc_key_of(l.id), ''),
    'name_en',       l.name_en,
    'name_am',       COALESCE((SELECT t.value FROM public.entity_translations t
                                WHERE t.entity_type = 'location' AND t.entity_id = l.id
                                  AND t.field = 'name' AND t.lang_code = 'am'
                                  AND t.status IN ('approved','edited')), ''),
    'iso_3166_2',    COALESCE(l.iso_3166_2, ''),
    'aliases',       array_to_string(COALESCE(l.aliases, '{}'::text[]), '|'),
    'display_order', l.display_order::text,
    'center_lat',    COALESCE(l.center_lat::text, ''),
    'center_lng',    COALESCE(l.center_lng::text, ''),
    'is_active',     CASE WHEN l.is_active THEN 'true' ELSE 'false' END,
    'level',         l.level,
    'country_code',  l.country_code,
    'source',        l.source,
    'listing_count', (SELECT count(*) FROM public.listings li WHERE li.location_id = l.id)::text,
    'action',        ''
  )
  FROM public.locations l WHERE l.id = p_id
$fn$;
REVOKE ALL ON FUNCTION public.loc_export_row(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_export_row(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.country_export_row(p_code char(2))
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $fn$
  SELECT jsonb_build_object(
    'country_code',  c.code,
    'name_en',       c.name_en,
    'is_active',     CASE WHEN c.is_active THEN 'true' ELSE 'false' END,
    'unit_system',   c.unit_system,
    'currency_code', COALESCE(c.currency_code, ''),
    'display_order', c.display_order::text,
    'root_order',    COALESCE((SELECT string_agg(cat.slug, '|' ORDER BY o.position)
                                 FROM public.country_root_order o
                                 JOIN public.categories cat ON cat.id = o.category_id
                                WHERE o.country_code = c.code), ''),
    'action',        ''
  )
  FROM public.countries c WHERE c.code = p_code
$fn$;
REVOKE ALL ON FUNCTION public.country_export_row(char) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.country_export_row(char) TO service_role;

-- key → id (four index lookups at most); used by the planner and the doors.
CREATE OR REPLACE FUNCTION public.loc_id_of_key(p_key text)
RETURNS uuid LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $fn$
DECLARE
  v_segs text[];
  v_seg  text;
  v_id   uuid := NULL;
  v_i    int := 0;
BEGIN
  IF p_key IS NULL OR btrim(p_key) = '' THEN RETURN NULL; END IF;
  v_segs := string_to_array(lower(btrim(p_key)), '/');
  FOREACH v_seg IN ARRAY v_segs LOOP
    v_i := v_i + 1;
    IF v_i = 1 THEN
      SELECT l.id INTO v_id FROM public.locations l
       WHERE l.level = 'country' AND l.slug = v_seg LIMIT 1;
    ELSE
      SELECT l.id INTO v_id FROM public.locations l
       WHERE l.parent_id = v_id AND l.slug = v_seg LIMIT 1;
    END IF;
    IF v_id IS NULL THEN RETURN NULL; END IF;
  END LOOP;
  RETURN v_id;
END $fn$;
REVOKE ALL ON FUNCTION public.loc_id_of_key(text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.loc_id_of_key(text) TO service_role;

-- ============================================================
-- 2.3 PLANNER — the only authority on meaning; writes nothing.
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
      IF v_action = 'activate' AND v_depth > 1 AND NOT COALESCE(v_parent_active, false) THEN
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
      ELSIF v_depth > 1 AND NOT COALESCE(v_parent_active, false) THEN
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
-- 2.4 EXPORT
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_export_locations(p_scope text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_scope char(2) := NULL;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF p_scope IS NOT NULL AND btrim(p_scope) <> '' THEN
    v_scope := upper(btrim(p_scope));
    IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_scope) THEN
      RAISE EXCEPTION 'unknown country scope';
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'countries', COALESCE((
      SELECT jsonb_agg(public.country_export_row(c.code) ORDER BY c.display_order, c.code)
        FROM public.countries c
       WHERE v_scope IS NULL OR c.code = v_scope), '[]'::jsonb),
    'locations', COALESCE((
      SELECT jsonb_agg(public.loc_export_row(l.id)
               ORDER BY l.country_code,
                        CASE l.level WHEN 'country' THEN 0 WHEN 'region' THEN 1
                                     WHEN 'city' THEN 2 ELSE 3 END,
                        public.loc_key_of(l.id))
        FROM public.locations l
       WHERE v_scope IS NULL OR l.country_code = v_scope), '[]'::jsonb));
END $fn$;
REVOKE ALL ON FUNCTION public.admin_export_locations(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_export_locations(text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_export_locations(text) TO service_role;

-- ============================================================
-- 2.5 DOORS
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_preview_location_import(
  p_countries jsonb, p_locations jsonb, p_scope text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $fn$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'locations', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  RETURN public.loc_import_plan(p_countries, p_locations, p_scope);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_preview_location_import(jsonb, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_preview_location_import(jsonb, jsonb, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_preview_location_import(jsonb, jsonb, text) TO service_role;

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
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' = 'activate' LOOP
    v_code := it->>'key';
    v_prev := public.country_export_row(v_code);
    SELECT * INTO v_row FROM public.countries WHERE code = v_code;
    UPDATE public.countries SET is_active = true, updated_at = now() WHERE code = v_code;
    SELECT id INTO v_anchor FROM public.locations
     WHERE level = 'country' AND country_code = v_code LIMIT 1;
    IF v_anchor IS NULL THEN
      INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (NULL,'country',v_code,v_row.name_en,
              public.location_slug_candidate(v_row.name_en, NULL), true, 'import');
    ELSE
      UPDATE public.locations SET is_active = true WHERE id = v_anchor;
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
  FOR it IN SELECT value FROM jsonb_array_elements(v_plan->'items')
             WHERE value->>'file' = 'countries' AND value->>'op' = 'retire' LOOP
    v_code := it->>'key';
    v_prev := public.country_export_row(v_code);
    UPDATE public.countries SET is_active = false, updated_at = now() WHERE code = v_code;
    UPDATE public.locations SET is_active = false
     WHERE level = 'country' AND country_code = v_code;
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

CREATE OR REPLACE FUNCTION public.admin_undo_location_import(p_batch uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
  v_uid uuid := auth.uid(); rev public.location_import_revisions;
  v_n int := 0; v_id uuid; f jsonb; v_am jsonb; v_code char(2);
BEGIN
  IF NOT public.has_permission(v_uid, 'locations', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('locations', 'import');

  IF NOT EXISTS (SELECT 1 FROM public.location_import_revisions WHERE batch_id = p_batch) THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.location_import_revisions
                  WHERE batch_id = p_batch AND undone_at IS NULL) THEN
    RAISE EXCEPTION 'batchAlreadyUndone';
  END IF;

  -- reverse apply order, derived from (entity_type, action)
  FOR rev IN
    SELECT * FROM public.location_import_revisions
     WHERE batch_id = p_batch AND undone_at IS NULL
     ORDER BY CASE entity_type || ':' || action
                WHEN 'country:update' THEN 1 WHEN 'country:close' THEN 2
                WHEN 'location:delete' THEN 3 WHEN 'location:retire' THEN 4
                WHEN 'location:activate' THEN 5 WHEN 'location:update' THEN 6
                WHEN 'location:create' THEN 7 WHEN 'country:create' THEN 8
                ELSE 9 END,
              array_length(string_to_array(entity_key,'/'),1) DESC
  LOOP
    IF rev.entity_type = 'country' THEN
      v_code := rev.entity_key;
      IF rev.action = 'update' THEN
        UPDATE public.countries SET
          name_en = rev.prev->>'name_en',
          unit_system = rev.prev->>'unit_system',
          currency_code = NULLIF(rev.prev->>'currency_code','')::char(3),
          display_order = (rev.prev->>'display_order')::int,
          updated_at = now()
         WHERE code = v_code;
        DELETE FROM public.country_root_order WHERE country_code = v_code;
        INSERT INTO public.country_root_order (country_code, category_id, position, created_by)
        SELECT v_code, c.id, s.ord, v_uid
          FROM unnest(string_to_array(COALESCE(rev.prev->>'root_order',''),'|')) WITH ORDINALITY AS s(slug, ord)
          JOIN public.categories c ON c.slug = s.slug
         WHERE btrim(s.slug) <> '';
      ELSIF rev.action = 'close' THEN
        UPDATE public.countries SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE code = v_code;
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true'
         WHERE level = 'country' AND country_code = v_code;
      ELSIF rev.action = 'open' THEN
        UPDATE public.countries SET is_active = false, updated_at = now() WHERE code = v_code;
        UPDATE public.locations SET is_active = false
         WHERE level = 'country' AND country_code = v_code;
      ELSIF rev.action = 'create' THEN
        IF EXISTS (SELECT 1 FROM public.locations WHERE country_code = v_code)
           OR EXISTS (SELECT 1 FROM public.user_roles WHERE scope_country = v_code) THEN
          RAISE EXCEPTION 'undoBlocked' USING DETAIL = 'hasRows';
        END IF;
        DELETE FROM public.countries WHERE code = v_code;
      END IF;
    ELSE
      IF rev.action = 'delete' THEN
        INSERT INTO public.locations
          (id, parent_id, level, country_code, name_en, slug, iso_3166_2, aliases,
           display_order, center_lat, center_lng, is_active, source)
        VALUES ((rev.prev->>'id')::uuid, NULLIF(rev.prev->>'parent_id','')::uuid,
                rev.prev->>'level', (rev.prev->>'country_code')::char(2),
                rev.prev->>'name_en',
                (string_to_array(rev.entity_key,'/'))[array_length(string_to_array(rev.entity_key,'/'),1)],
                NULLIF(rev.prev->>'iso_3166_2',''),
                COALESCE(public.cat_pipe(rev.prev->>'aliases'), '{}'::text[]),
                (rev.prev->>'display_order')::int,
                public.loc_num(rev.prev->>'center_lat'), public.loc_num(rev.prev->>'center_lng'),
                (rev.prev->>'is_active') = 'true', rev.prev->>'source');
        v_id := (rev.prev->>'id')::uuid;
      ELSE
        v_id := public.loc_id_of_key(rev.entity_key);
      END IF;

      IF v_id IS NOT NULL AND rev.action = 'retire' THEN
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'activate' THEN
        UPDATE public.locations SET is_active = (rev.prev->>'is_active') = 'true', updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'update' THEN
        UPDATE public.locations SET
          name_en = rev.prev->>'name_en',
          iso_3166_2 = NULLIF(rev.prev->>'iso_3166_2',''),
          aliases = COALESCE(public.cat_pipe(rev.prev->>'aliases'), '{}'::text[]),
          display_order = (rev.prev->>'display_order')::int,
          center_lat = public.loc_num(rev.prev->>'center_lat'),
          center_lng = public.loc_num(rev.prev->>'center_lng'),
          updated_at = now()
         WHERE id = v_id;
      ELSIF v_id IS NOT NULL AND rev.action = 'create' THEN
        DELETE FROM public.entity_translations WHERE entity_type='location' AND entity_id=v_id;
        DELETE FROM public.locations WHERE id = v_id;
        v_id := NULL;
      END IF;

      -- the am state, exactly as it was
      IF v_id IS NOT NULL AND rev.action IN ('update','delete') THEN
        v_am := rev.prev->'am_state';
        IF v_am IS NULL OR v_am = 'null'::jsonb THEN
          DELETE FROM public.entity_translations
           WHERE entity_type='location' AND entity_id=v_id AND field='name' AND lang_code='am';
        ELSE
          INSERT INTO public.entity_translations
            (entity_type, entity_id, field, lang_code, value, status, machine, updated_by, updated_at)
          VALUES ('location', v_id, 'name', 'am', v_am->>'value',
                  COALESCE(v_am->>'status','edited'), COALESCE((v_am->>'machine')::boolean,false),
                  v_uid, now())
          ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
            SET value = EXCLUDED.value, status = EXCLUDED.status,
                machine = EXCLUDED.machine, updated_by = v_uid, updated_at = now();
        END IF;
      END IF;
    END IF;

    UPDATE public.location_import_revisions SET undone_at = now() WHERE id = rev.id;
    v_n := v_n + 1;
  END LOOP;

  PERFORM public.log_audit('location.import.undo','locations',p_batch::text,
    jsonb_build_object('restored', v_n));
  RETURN jsonb_build_object('restored', v_n);
END $fn$;
REVOKE ALL ON FUNCTION public.admin_undo_location_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_location_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_location_import(uuid) TO service_role;

-- ============================================================
-- 2.6 PROOFS
-- ============================================================

-- P1 — the planner's refusal vocabulary, by name.
DO $p1$
DECLARE
  v_plan jsonb; v_seen text[]; v_want text[]; v_r text;
  v_city public.locations; v_nonroot text; v_rows jsonb;
BEGIN
  SELECT * INTO v_city FROM public.locations WHERE level='city' AND country_code='ET' AND slug='adama';
  SELECT c.slug INTO v_nonroot FROM public.category_tree_pointers p
    JOIN public.categories c ON c.id = p.child_id WHERE p.parent_id IS NOT NULL LIMIT 1;

  v_rows := jsonb_build_array(
    jsonb_build_object('row','1','location_key','Ethiopia/Oromia','name_en','X'),
    jsonb_build_object('row','2','location_key','ethiopia/e2e-l1b-nowhere/x','name_en','X',
      'center_lat','9','center_lng','38'),
    jsonb_build_object('row','3','location_key','ethiopia/e2e-l1b-late/kid','name_en','Kid',
      'center_lat','9','center_lng','38'),
    jsonb_build_object('row','4','location_key','ethiopia/e2e-l1b-late','name_en','Late'),
    jsonb_build_object('row','5','location_key','ethiopia/oromia/e2e-l1b-nocoord','name_en','NoCoord'),
    jsonb_build_object('row','6','location_key','ethiopia/oromia/e2e-l1b-iso','name_en','Iso',
      'center_lat','9','center_lng','38','iso_3166_2','ET-OR'),
    (public.loc_export_row(v_city.id) || jsonb_build_object('row','7','is_active','false')),
    jsonb_build_object('row','8','location_key','ethiopia/oromia','action','delete'),
    jsonb_build_object('row','9','location_key','e2e-l1b-notacountry','name_en','No')
  );
  v_plan := public.loc_import_plan(
    jsonb_build_array(
      jsonb_build_object('row','1','country_code','E1','name_en','Bad'),
      jsonb_build_object('row','2','country_code','ET','currency_code','etb1'),
      jsonb_build_object('row','3','country_code','US','root_order',v_nonroot)
    ), v_rows, NULL);

  SELECT array_agg(DISTINCT (x->>'reason') || COALESCE(':' || (x->>'detail'), ''))
    INTO v_seen FROM jsonb_array_elements(v_plan->'refusals') x;

  v_want := ARRAY['badKey','unknownParent','unknownParent:parentLaterInFile',
    'missingCoordinates','isoOnRegionsOnly','statusNeedsAction:stored=true requested=false',
    'deleteBlocked:hasChildren','badCountryCode','badCurrency:etb1',
    'notARoot:' || v_nonroot, 'countryRowByActivation'];
  FOREACH v_r IN ARRAY v_want LOOP
    IF NOT (v_r = ANY(v_seen)) THEN
      RAISE EXCEPTION 'P1 FAILED — refusal % not raised; saw %', v_r, v_seen;
    END IF;
  END LOOP;

  -- outOfScope: an ET key and an ET countries row under scope US
  v_plan := public.loc_import_plan(
    jsonb_build_array(jsonb_build_object('row','1','country_code','ET')),
    jsonb_build_array(jsonb_build_object('row','1','location_key','ethiopia/oromia')), 'US');
  IF (SELECT count(*) FROM jsonb_array_elements(v_plan->'refusals') x
       WHERE x->>'reason' = 'outOfScope') <> 2 THEN
    RAISE EXCEPTION 'P1 FAILED — outOfScope not raised on both files: %', v_plan->'refusals';
  END IF;
  RAISE NOTICE 'P1 OK — every refusal name raised: %', v_seen;
END $p1$;

-- P2 — the plan itself.
DO $p2$
DECLARE
  v_plan jsonb; v_city public.locations; v_item jsonb;
BEGIN
  SELECT * INTO v_city FROM public.locations WHERE level='city' AND country_code='ET' AND slug='adama';

  v_plan := public.loc_import_plan('[]'::jsonb, jsonb_build_array(
    jsonb_build_object('row','1','location_key','ethiopia/e2e-l1b-r','name_en','L1b Region','action','activate'),
    jsonb_build_object('row','2','location_key','ethiopia/e2e-l1b-r/e2e-l1b-c','name_en','L1b City',
      'center_lat','9.1','center_lng','38.7'),
    jsonb_build_object('row','3','location_key','ethiopia/e2e-l1b-r/e2e-l1b-c/e2e-l1b-s','name_en','L1b Sub',
      'center_lat','9.2','center_lng','38.8')
  ), NULL);
  IF (v_plan->'counts'->>'adds')::int <> 3 THEN
    RAISE EXCEPTION 'P2 FAILED — adds = %, expected 3 (%)', v_plan->'counts'->>'adds', v_plan->'refusals';
  END IF;
  IF (v_plan->'counts'->>'refusals')::int <> 0 THEN
    RAISE EXCEPTION 'P2 FAILED — refusals: %', v_plan->'refusals';
  END IF;
  SELECT value INTO v_item FROM jsonb_array_elements(v_plan->'items')
   WHERE value->>'key' = 'ethiopia/e2e-l1b-r/e2e-l1b-c';
  IF v_item->'fields'->>'name_en' <> 'L1b City' THEN
    RAISE EXCEPTION 'P2 FAILED — the city item carries no name_en: %', v_item;
  END IF;

  -- an untouched export row is unchanged
  v_plan := public.loc_import_plan('[]'::jsonb,
    jsonb_build_array(public.loc_export_row(v_city.id) || jsonb_build_object('row','1')), NULL);
  IF (v_plan->'counts'->>'unchanged')::int <> 1
     OR (v_plan->'counts'->>'refusals')::int <> 0
     OR (v_plan->'items'->0->>'op') <> 'noop' THEN
    RAISE EXCEPTION 'P2 FAILED — a round-tripped export row is not unchanged: %', v_plan;
  END IF;

  -- a NEW country with `close`: the create, then a noop alreadyClosed
  v_plan := public.loc_import_plan(
    jsonb_build_array(jsonb_build_object('row','1','country_code','ZY','name_en','Zy Test','action','close')),
    '[]'::jsonb, NULL);
  IF (v_plan->'counts'->>'adds')::int <> 1
     OR (v_plan->'items'->0->>'op') <> 'create'
     OR (v_plan->'items'->1->>'op') <> 'noop'
     OR (v_plan->'items'->1->>'detail') <> 'alreadyClosed' THEN
    RAISE EXCEPTION 'P2 FAILED — ZY create + alreadyClosed not planned: %', v_plan->'items';
  END IF;
  RAISE NOTICE 'P2 OK — adds=3, round-trip unchanged, ZY create + alreadyClosed';
END $p2$;

-- P3 — the write sequence the commit carries (the gated door cannot be called
-- from a migration, so its exact statements are replayed; the Amharic write
-- replays the translation door's own INSERT, which is itself gated).
DO $p3$
DECLARE
  v_eth uuid; v_r uuid; v_c uuid; v_s uuid; v_am text;
BEGIN
  SELECT id INTO v_eth FROM public.locations WHERE level='country' AND slug='ethiopia';

  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, iso_3166_2,
    aliases, display_order, center_lat, center_lng, is_active, source)
  VALUES (v_eth,'region','ET','L1b Region','e2e-l1b-r','ET-L1', ARRAY['l1b'], 7, NULL, NULL, true,'import')
  RETURNING id INTO v_r;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, aliases,
    display_order, center_lat, center_lng, is_active, source)
  VALUES (v_r,'city','ET','L1b City','e2e-l1b-c','{}'::text[],0,9.1,38.7,true,'import')
  RETURNING id INTO v_c;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, aliases,
    display_order, center_lat, center_lng, is_active, source)
  VALUES (v_c,'sub_city','ET','L1b Sub','e2e-l1b-s','{}'::text[],0,9.2,38.8,true,'import')
  RETURNING id INTO v_s;

  IF (SELECT source FROM public.locations WHERE id = v_c) <> 'import' THEN
    RAISE EXCEPTION 'P3 FAILED — source is not import';
  END IF;
  IF (SELECT region_id FROM public.locations WHERE id = v_c) IS DISTINCT FROM v_r
     OR (SELECT city_id FROM public.locations WHERE id = v_s) IS DISTINCT FROM v_c
     OR (SELECT region_id FROM public.locations WHERE id = v_s) IS DISTINCT FROM v_r THEN
    RAISE EXCEPTION 'P3 FAILED — the guard did not fill the ancestor columns';
  END IF;
  IF public.loc_key_of(v_s) <> 'ethiopia/e2e-l1b-r/e2e-l1b-c/e2e-l1b-s' THEN
    RAISE EXCEPTION 'P3 FAILED — key = %', public.loc_key_of(v_s);
  END IF;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine, updated_at)
  VALUES ('location', v_c, 'name', 'am', 'ኤል1ቢ ከተማ', 'edited', false, now());
  v_am := public.loc_export_row(v_c)->>'name_am';
  IF v_am <> 'ኤል1ቢ ከተማ' THEN
    RAISE EXCEPTION 'P3 FAILED — name_am round-trip returned "%"', v_am;
  END IF;
  RAISE NOTICE 'P3 OK — ancestors filled, source=import, name_am round-trips as %', v_am;

  -- deepest-first delete, am rows first
  DELETE FROM public.entity_translations WHERE entity_type='location' AND entity_id IN (v_s,v_c,v_r);
  DELETE FROM public.locations WHERE id = v_s;
  DELETE FROM public.locations WHERE id = v_c;
  DELETE FROM public.locations WHERE id = v_r;
  IF EXISTS (SELECT 1 FROM public.entity_translations
              WHERE entity_type='location' AND entity_id IN (v_s,v_c,v_r))
     OR EXISTS (SELECT 1 FROM public.locations WHERE id IN (v_s,v_c,v_r)) THEN
    RAISE EXCEPTION 'P3 FAILED — scratch rows survived';
  END IF;
  RAISE NOTICE 'P3 OK — deepest-first delete removed the rows and their am rows';
END $p3$;

-- P4 — DENY: an authenticated identity holding nothing.
DO $p4$
DECLARE v_msg text; v_uid text := gen_random_uuid()::text;
BEGIN
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid, 'role', 'authenticated')::text, true);

  BEGIN PERFORM public.admin_preview_location_import('[]'::jsonb,'[]'::jsonb,NULL);
    RAISE EXCEPTION 'P4 FAILED — preview allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P4 FAILED — preview: %', v_msg; END IF; END;

  BEGIN PERFORM public.admin_commit_location_import('[]'::jsonb,'[]'::jsonb,NULL,'d');
    RAISE EXCEPTION 'P4 FAILED — commit allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P4 FAILED — commit: %', v_msg; END IF; END;

  BEGIN PERFORM public.admin_undo_location_import(gen_random_uuid());
    RAISE EXCEPTION 'P4 FAILED — undo allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P4 FAILED — undo: %', v_msg; END IF; END;

  BEGIN PERFORM public.admin_export_locations(NULL);
    RAISE EXCEPTION 'P4 FAILED — export allowed';
  EXCEPTION WHEN others THEN v_msg := SQLERRM;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'P4 FAILED — export: %', v_msg; END IF; END;

  PERFORM set_config('request.jwt.claims', '', true);
  RAISE NOTICE 'P4 OK — all four doors refuse an unprivileged identity with permission denied';
END $p4$;

-- P5 — read-back: RLS, policy, ACLs, and the helpers on a seeded row.
DO $p5$
DECLARE
  v_sig text; v_city uuid;
  v_doors text[] := ARRAY[
    'public.admin_preview_location_import(jsonb, jsonb, text)',
    'public.admin_commit_location_import(jsonb, jsonb, text, text)',
    'public.admin_undo_location_import(uuid)',
    'public.admin_export_locations(text)'];
  v_closed text[] := ARRAY[
    'public.loc_import_plan(jsonb, jsonb, text)',
    'public.loc_key_of(uuid)', 'public.loc_path_of(uuid)',
    'public.loc_export_row(uuid)', 'public.country_export_row(character)',
    'public.loc_id_of_key(text)', 'public.loc_num(text)'];
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.location_import_revisions'::regclass) THEN
    RAISE EXCEPTION 'P5 FAILED — RLS is not enabled on location_import_revisions';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies
                  WHERE tablename = 'location_import_revisions'
                    AND policyname = 'location_import_revisions_no_client_access') THEN
    RAISE EXCEPTION 'P5 FAILED — the deny-all policy is missing';
  END IF;

  FOREACH v_sig IN ARRAY v_doors LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P5 FAILED — anon can execute %', v_sig; END IF;
    IF NOT has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P5 FAILED — authenticated cannot execute %', v_sig; END IF;
  END LOOP;
  FOREACH v_sig IN ARRAY v_closed LOOP
    IF has_function_privilege('anon', v_sig, 'EXECUTE')
       OR has_function_privilege('authenticated', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P5 FAILED — % is not closed to client roles', v_sig; END IF;
    IF NOT has_function_privilege('service_role', v_sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'P5 FAILED — service_role cannot execute %', v_sig; END IF;
  END LOOP;

  SELECT id INTO v_city FROM public.locations WHERE level='city' AND country_code='ET' AND slug='adama';
  IF public.loc_key_of(v_city) <> 'ethiopia/oromia/adama' THEN
    RAISE EXCEPTION 'P5 FAILED — loc_key_of = %', public.loc_key_of(v_city);
  END IF;
  IF public.loc_id_of_key(public.loc_export_row(v_city)->>'location_key') <> v_city THEN
    RAISE EXCEPTION 'P5 FAILED — the export row does not round-trip through its key';
  END IF;
  RAISE NOTICE 'P5 OK — RLS + deny-all policy, four doors open to authenticated, seven helpers closed, key round-trips';
END $p5$;

-- 2.7 the mark
INSERT INTO public.migration_marks(version) VALUES ('20260915190000') ON CONFLICT DO NOTHING;