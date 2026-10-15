-- Bundle 16 (My listings), turn 3b (2026-10-14). Tier A. Delete (call F) and the Rented / Filled words (call H) for the
-- seller's ad page (D138; D173; spec: docs/features/my-listings.md).
-- e2e-areas: my-listings, admin-categories
--
-- A. listings.deleted_at: the moment the ad's owner deleted it. A deleted ad is `removed` (the state machine's word) and
--    leaves My listings: `my_listings` counts and lists it nowhere and `my_listing` answers "not your listing". Its record
--    stays, as the retention rules say (call F).
-- B. The allowed category capability words gain `rented` and `filled` (call H): a sold ad of a category holding one of
--    them is called Rented or Filled.
-- C. cat_import_plan, redeclared whole from its live definition (20261005165621): the categories import accepts the two
--    words (it refused any word outside its list as badCapability). Nothing else changes (P4).
-- D. transition_listing, redeclared whole from 20261014194317: the owner deletes his own ad as its owner — a seller who
--    also holds a staff role is not asked for staff's second factor — and the deletion stamps deleted_at; an ad its owner
--    deleted is not restored. Nothing else changes (P4).
-- E. my_listings, redeclared whole from 20261014212353: both reads leave out a deleted ad; each row carries `soldWord`
--    (sold, rented or filled, from the ad's category).
-- F. my_listing, redeclared whole from 20261014230715: a deleted ad is "not your listing"; the row carries `soldWord`,
--    the same row object as my_listings (P5).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the column; the constraint; the headers and
--    privileges; each redeclared body equal to its earlier body beyond the named changes (carriage returns removed
--    first); the reads keyed by the caller and leaving out a deleted ad; the row object of the two doors equal; calls with
--    no session refused; a scratch identity that owns nothing (no real row, no auth.users row) refused or answered with
--    zero counts. What the doors do with real ads is proven by MLA-7…MLA-10 (e2e/my-listings-ad.spec.ts).

-- ===== A — the deletion mark =====
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
COMMENT ON COLUMN public.listings.deleted_at IS
  'Bundle 16 turn 3b (call F) — when the ad''s owner deleted it (its status is removed); it leaves My listings and is never restored.';

-- ===== B — the capability words =====
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_capabilities_check;
ALTER TABLE public.categories ADD CONSTRAINT categories_capabilities_check
  CHECK (capabilities <@ ARRAY['bookable','map_pin','own_place','rented','filled']::text[]);

-- ===== C — cat_import_plan (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.cat_import_plan(p_rows jsonb, p_scope text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
  -- DEC-079 — categories that carry, or hold a descendant carrying, a price
  -- basis (primary lineage), read ONCE per plan: id -> the basis key.
  v_basis_map jsonb;
  v_bkey text;
BEGIN
  v_export := public.cat_export_rows(NULL);
  WITH RECURSIVE d AS (
    SELECT l.category_id AS cid, a.attr_key AS k
      FROM public.category_attribute_links l
      JOIN public.attributes a ON a.id = l.attribute_id
     WHERE a.attr_key ~ '^(pricing_type|unit_of_sale)(-|$)'
  ),
  up AS (
    SELECT cid, k FROM d
    UNION
    SELECT public.cat_primary_parent(up.cid), up.k FROM up
     WHERE public.cat_primary_parent(up.cid) IS NOT NULL
  ),
  down AS (
    SELECT cid, k FROM d
    UNION
    SELECT c.id, down.k FROM public.categories c JOIN down ON down.cid = public.cat_primary_parent(c.id)
  ),
  hit AS (SELECT cid, min(k) AS k FROM (SELECT * FROM up UNION SELECT * FROM down) u GROUP BY cid)
  SELECT COALESCE(jsonb_object_agg(cid::text, k), '{}'::jsonb) INTO v_basis_map FROM hit;
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
    -- DEC-105 — own_place is an allowed capability token. Bundle 16 turn 3b (call H) — rented and filled too: the
    -- word a sold ad of the category takes.
    SELECT x INTO v_bad FROM unnest(v_caps) x
     WHERE x NOT IN ('bookable','map_pin','own_place','rented','filled') LIMIT 1;
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

    -- DEC-079 — a row may not CREATE a period lock on a basis-carrying lineage
    -- (the basis decides the period). A row restating a stored lock passes.
    IF v_action <> 'delete'
       AND v_lock IS NOT NULL AND btrim(v_lock) <> ''
       AND public.cat_bool(v_lock, false)
       AND (v_cat.id IS NULL OR NOT v_cat.price_period_locked) THEN
      v_bkey := CASE WHEN v_cat.id IS NULL THEN NULL ELSE v_basis_map ->> v_cat.id::text END;
      IF v_bkey IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','periodLockedWithBasis','detail',v_bkey);
        CONTINUE;
      END IF;
    END IF;

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

      -- M8a A2 (INC-314) — a create row's guest parents: each names a category
      -- of the export map that is not a catch-all, or a create row EARLIER in
      -- this file; otherwise the row is refused, naming the slug.
      SELECT s INTO v_rename
        FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
       WHERE NOT ((v_by_slug ? s AND COALESCE(v_by_slug -> s ->> 'is_catchall', '') <> 'true')
                  OR s = ANY (v_infile))
       LIMIT 1;
      IF v_rename IS NOT NULL THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent','detail', v_rename);
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
END $$;
REVOKE ALL ON FUNCTION public.cat_import_plan(jsonb, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;
GRANT ALL ON FUNCTION public.cat_import_plan(jsonb, text) TO service_role;

-- ===== D — transition_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed','closed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- D174 2 (bundle 16 turn 1) — the owner reopens his own closed ad, to the live status it was closed from and
  -- with the time it had left. Nothing about it changed while it was closed (edit_listing sends a closed ad to
  -- screening), so it needs no new review. Staff never reopen a seller's closed ad.
  IF v_row.status = 'closed' AND p_new_status IN ('active','reduced') THEN
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: closed -> %', p_new_status;
    END IF;
    v_ok := (p_new_status = v_row.resume_status);
  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active' (the reopen above returns an ad to the place it already held).
  ELSIF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    IF NOT v_service THEN
      PERFORM public.require_step_up_if_needed('listings', 'review');
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    IF v_row.status = 'removed' THEN
      -- Bundle 16 turn 3b (call F) — an ad its owner deleted is not brought back.
      IF v_row.deleted_at IS NOT NULL THEN
        RAISE EXCEPTION 'a listing its owner deleted is not restored';
      END IF;
      -- D137 (REQ-022 amended, the operator, 2026-10-11): a removed listing comes
      -- back only to screening, never straight to live; by enforcement with a
      -- fresh second factor; one removed for a severe screening reason by a
      -- super admin only.
      IF NOT (v_service OR v_enforcer) THEN
        RAISE EXCEPTION 'enforcement only: removed -> screening';
      END IF;
      IF coalesce(v_row.screening->>'severe','false') = 'true'
         AND NOT (v_service OR public.is_super_admin(v_uid)) THEN
        RAISE EXCEPTION 'a listing removed for a severe reason is restored by a super admin only';
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
      v_ok := true;
    ELSE
      v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
    END IF;
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced') OR (p_new_status = 'sold' AND v_row.status = 'closed');
  ELSIF p_new_status = 'closed' THEN
    -- D174 2 — "No longer available": only the owner closes his live ad; the time it had left is kept.
    IF NOT v_owner THEN
      RAISE EXCEPTION 'owner only: % -> closed', v_row.status;
    END IF;
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    -- Bundle 16 turn 3b (call F) — the owner deletes his own ad as its owner, whatever staff role he also holds.
    IF v_owner AND NOT v_service THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') AND v_row.status = 'closed' THEN
    -- D174 2 — reopened: the time it had left when it was closed.
    UPDATE public.listings SET
      status = p_new_status,
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') AND v_row.clock_kept THEN
    -- Bundle 16 call A — after the review of an edit, the ad gets back the time it had when it was edited; an edit
    -- never renews an ad.
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      expires_at = CASE WHEN v_row.kept_remaining IS NULL THEN NULL ELSE now() + v_row.kept_remaining END,
      clock_kept = false, kept_remaining = NULL, resume_status = NULL,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      -- M5 / DEC-117 — LEAST(the seller's date, now() + the category's days);
      -- each side is left out when absent (LEAST skips NULL); NULL when both are.
      expires_at = LEAST(v_row.poster_expires_at,
        now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'closed' THEN
    UPDATE public.listings SET
      status = 'closed',
      clock_kept = true,
      kept_remaining = CASE WHEN v_row.expires_at IS NULL THEN NULL
                            ELSE greatest(v_row.expires_at - now(), interval '0') END,
      resume_status = v_row.status,
      updated_at = now()
    WHERE id = p_listing_id;
  ELSIF p_new_status = 'expired' THEN
    -- Bundle 16 — the live status a renewal returns it to.
    UPDATE public.listings SET status = 'expired', resume_status = v_row.status, updated_at = now()
     WHERE id = p_listing_id;
  ELSIF p_new_status = 'removed' AND v_owner THEN
    -- Bundle 16 turn 3b (call F) — deleted by its owner: it leaves My listings (deleted_at); the record stays.
    UPDATE public.listings SET status = 'removed', deleted_at = now(), updated_at = now()
     WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $function$;

REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- ===== E — my_listings (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.my_listings(p_group text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_counts jsonb;
  v_rows   jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_group IS NULL OR p_group NOT IN ('live','review','attention','closed','sold','drafts') THEN
    RAISE EXCEPTION 'unknown group';
  END IF;
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 100 OR p_offset IS NULL OR p_offset < 0 THEN
    RAISE EXCEPTION 'bad page';
  END IF;

  -- The groups of My listings (D138, D173–D175): live (active, reduced — reach is staff's lever and is not shown),
  -- in review (screening, held), needs attention (rejected, removed), closed (closed, expired), sold, drafts.
  WITH mine AS (
    SELECT l.status,
           CASE l.status
             WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
             WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
             WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
             WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
             WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
           END AS grp
      FROM public.listings l
     WHERE l.seller_id = v_uid
       AND l.deleted_at IS NULL
  )
  SELECT jsonb_build_object(
           'live',      count(*) FILTER (WHERE grp = 'live'),
           'review',    count(*) FILTER (WHERE grp = 'review'),
           'attention', count(*) FILTER (WHERE grp = 'attention'),
           'closed',    count(*) FILTER (WHERE grp = 'closed'),
           'sold',      count(*) FILTER (WHERE grp = 'sold'),
           'drafts',    count(*) FILTER (WHERE grp = 'drafts'))
    INTO v_counts
    FROM mine;

  SELECT coalesce(jsonb_agg(r.row ORDER BY r.changed DESC, r.id DESC), '[]'::jsonb)
    INTO v_rows
    FROM (
      SELECT l.id, coalesce(l.updated_at, l.created_at) AS changed,
             jsonb_build_object(
               'id', l.id,
               'status', l.status,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status = 'closed' AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END) AS row
        FROM public.listings l
       WHERE l.seller_id = v_uid
         AND l.deleted_at IS NULL
         AND CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END = p_group
       ORDER BY coalesce(l.updated_at, l.created_at) DESC, l.id DESC
       LIMIT p_limit OFFSET p_offset
    ) r;

  RETURN jsonb_build_object('counts', v_counts, 'rows', v_rows);
END $function$;
REVOKE ALL ON FUNCTION public.my_listings(text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listings(text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_listings(text, integer, integer) TO service_role;

-- ===== F — my_listing (redeclared whole) =====
CREATE OR REPLACE FUNCTION public.my_listing(p_listing_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_policy public.listing_policy%ROWTYPE;
  v_out    jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;

  SELECT jsonb_build_object(
           'listing',
             jsonb_build_object(
               'id', l.id,
               'status', l.status,
               'title', l.title,
               'categoryId', l.category_id,
               'coverPhotoId', (SELECT p.id FROM public.listing_photos p
                                 WHERE p.listing_id = l.id AND p.exif_stripped
                                 ORDER BY p.display_order
                                 LIMIT 1),
               'photosSoon', l.photos_soon,
               'priceMode', l.price_mode,
               'priceAmount', l.price_amount,
               'priceCurrency', l.price_currency,
               'pricePeriod', l.price_period,
               'priceBp', l.price_bp,
               'priceNegotiable', l.price_negotiable,
               'priceUnit', l.price_unit,
               'priceUnitText', l.price_unit_text,
               -- D173 2 — the "Price reduced" record while its 14 days stand.
               'priceWas', CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END,
               'reserved', l.reserved_at IS NOT NULL,
               'publishedFirstAt', l.published_first_at,
               'publishedAt', l.published_at,
               'renewedAt', l.renewed_at,
               'expiresAt', l.expires_at,
               -- The days an ad has left (live) or keeps while closed: whole days, rounded up; null with no end date.
               'daysLeft', CASE WHEN l.status IN ('active','reduced') AND l.expires_at IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM (l.expires_at - now())) / 86400))::integer END,
               'daysKept', CASE WHEN l.status = 'closed' AND l.kept_remaining IS NOT NULL
                                THEN greatest(0, ceil(extract(epoch FROM l.kept_remaining) / 86400))::integer END,
               'soldAt', l.sold_at,
               -- Bundle 16 turn 3b (call H) — the word a sold ad takes: Rented or Filled when its category says so.
               'soldWord', coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold'),
               'createdAt', l.created_at,
               'updatedAt', l.updated_at,
               -- A removed ad's latest staff reason (seller_notices, which the seller already reads).
               'removedReason', CASE WHEN l.status = 'removed' THEN
                                  (SELECT sn.reason FROM public.seller_notices sn
                                    WHERE sn.listing_id = l.id AND sn.seller_id = v_uid AND sn.kind = 'admin_remove'
                                    ORDER BY sn.created_at DESC
                                    LIMIT 1) END),
           'group', CASE l.status
               WHEN 'active' THEN 'live'      WHEN 'reduced' THEN 'live'
               WHEN 'screening' THEN 'review' WHEN 'held' THEN 'review'
               WHEN 'rejected' THEN 'attention' WHEN 'removed' THEN 'attention'
               WHEN 'closed' THEN 'closed'    WHEN 'expired' THEN 'closed'
               WHEN 'sold' THEN 'sold'        WHEN 'draft' THEN 'drafts'
             END,
           -- A closed ad reopens to the live status it was closed from (transition_listing takes exactly that one).
           'resumeStatus', l.resume_status,
           'countryCode', coalesce(loc.country_code, l.home_country_code),
           -- D174 3, D175 2 — the admin's renew setting, so the page offers Renew only when it is allowed.
           'renewAllowed', coalesce(v_policy.renew_allowed, false),
           'renewDays', v_policy.renew_days)
    INTO v_out
    FROM public.listings l
    LEFT JOIN public.locations loc ON loc.id = l.location_id
   WHERE l.id = p_listing_id AND l.seller_id = v_uid
     AND l.deleted_at IS NULL;

  -- One answer for "not yours" and "not there".
  IF v_out IS NULL THEN RAISE EXCEPTION 'not your listing'; END IF;
  RETURN v_out;
END $function$;
REVOKE ALL ON FUNCTION public.my_listing(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing(uuid) TO service_role;

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n    integer;
  v_msg  text;
  v_src  text;
  v_seg  text;
  v_md5  text;
  v_out  jsonb;
BEGIN
  -- P1. The column and the constraint.
  SELECT count(*) INTO v_n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'listings' AND column_name = 'deleted_at'
     AND data_type = 'timestamp with time zone';
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P1: listings.deleted_at is missing or not timestamptz'; END IF;
  SELECT count(*) INTO v_n FROM pg_constraint
   WHERE conname = 'categories_capabilities_check' AND conrelid = 'public.categories'::regclass
     AND pg_get_constraintdef(oid) LIKE '%rented%' AND pg_get_constraintdef(oid) LIKE '%filled%'
     AND pg_get_constraintdef(oid) LIKE '%own_place%' AND pg_get_constraintdef(oid) LIKE '%bookable%'
     AND pg_get_constraintdef(oid) LIKE '%map_pin%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P1: the capability words are not bookable, map_pin, own_place, rented, filled'; END IF;

  -- P2. The headers.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.my_listing(uuid)'::regprocedure, 'public.my_listings(text,integer,integer)'::regprocedure)
     AND provolatile = 's' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3b P2: my_listing or my_listings is not STABLE SECURITY DEFINER with search_path public'; END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid IN ('public.transition_listing(uuid,text)'::regprocedure, 'public.cat_import_plan(jsonb,text)'::regprocedure)
     AND provolatile = 'v' AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 2 THEN RAISE EXCEPTION 'B16T3b P2: transition_listing or cat_import_plan is not VOLATILE SECURITY DEFINER with search_path public'; END IF;

  -- P3. Who may call them: the seller's doors — a signed-in user, never anon; the import plan — the service only.
  IF has_function_privilege('anon', 'public.my_listing(uuid)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.my_listings(text,integer,integer)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.transition_listing(uuid,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.cat_import_plan(jsonb,text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.cat_import_plan(jsonb,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3b P3: a door is open to a role it must not be';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.my_listing(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.my_listings(text,integer,integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.transition_listing(uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16T3b P3: authenticated may not execute a seller door';
  END IF;

  -- P4. Each redeclared body is its earlier body beyond the named changes.
  SELECT md5(replace(replace(replace(replace(p.prosrc, chr(13), ''), replace('    -- Bundle 16 turn 3b (call F) — the owner deletes his own ad as its owner, whatever staff role he also holds.
    IF v_owner AND NOT v_service THEN
', chr(13), ''), replace('    IF v_owner AND NOT (v_service OR v_enforcer) THEN
', chr(13), '')), replace('      -- Bundle 16 turn 3b (call F) — an ad its owner deleted is not brought back.
      IF v_row.deleted_at IS NOT NULL THEN
        RAISE EXCEPTION ''a listing its owner deleted is not restored'';
      END IF;
', chr(13), ''), replace('', chr(13), '')), replace('  ELSIF p_new_status = ''removed'' AND v_owner THEN
    -- Bundle 16 turn 3b (call F) — deleted by its owner: it leaves My listings (deleted_at); the record stays.
    UPDATE public.listings SET status = ''removed'', deleted_at = now(), updated_at = now()
     WHERE id = p_listing_id;
', chr(13), ''), replace('', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '91d00f3f7f47c7ff0ff213f18a99b355' THEN
    RAISE EXCEPTION 'B16T3b P4: transition_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), '               -- Bundle 16 turn 3b \(call H\)[^\n]*\n[^\n]*\n[^\n]*\n[^\n]*\n', ''), chr(13), ''), replace('         AND l.deleted_at IS NULL
', chr(13), ''), replace('', chr(13), '')), replace('       AND l.deleted_at IS NULL
', chr(13), ''), replace('', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.my_listings(text,integer,integer)'::regprocedure;
  IF v_md5 IS DISTINCT FROM 'b5647978d443b0c8b502929872299673' THEN
    RAISE EXCEPTION 'B16T3b P4: my_listings differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(regexp_replace(replace(p.prosrc, chr(13), ''), '               -- Bundle 16 turn 3b \(call H\)[^\n]*\n[^\n]*\n[^\n]*\n[^\n]*\n', ''), chr(13), ''), replace('   WHERE l.id = p_listing_id AND l.seller_id = v_uid
     AND l.deleted_at IS NULL;
', chr(13), ''), replace('   WHERE l.id = p_listing_id AND l.seller_id = v_uid;
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.my_listing(uuid)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '7c0d39afb885e1e18ca2b1aadabde768' THEN
    RAISE EXCEPTION 'B16T3b P4: my_listing differs from its earlier body beyond the named changes';
  END IF;
  SELECT md5(replace(replace(replace(p.prosrc, chr(13), ''), replace('     WHERE x NOT IN (''bookable'',''map_pin'',''own_place'',''rented'',''filled'') LIMIT 1;
', chr(13), ''), replace('     WHERE x NOT IN (''bookable'',''map_pin'',''own_place'') LIMIT 1;
', chr(13), '')), replace('    -- DEC-105 — own_place is an allowed capability token. Bundle 16 turn 3b (call H) — rented and filled too: the
    -- word a sold ad of the category takes.
', chr(13), ''), replace('    -- DEC-105 — own_place is an allowed capability token.
', chr(13), '')))
    INTO v_md5 FROM pg_proc p WHERE p.oid = 'public.cat_import_plan(jsonb,text)'::regprocedure;
  IF v_md5 IS DISTINCT FROM '2d0680045f12d614348ae1e4bb89b136' THEN
    RAISE EXCEPTION 'B16T3b P4: cat_import_plan differs from its earlier body beyond the named changes';
  END IF;

  -- P5. my_listing's row object is my_listings' row object, byte for byte.
  SELECT replace(prosrc, chr(13), '') INTO v_src FROM pg_proc WHERE oid = 'public.my_listing(uuid)'::regprocedure;
  v_seg := substring(v_src FROM strpos(v_src, 'jsonb_build_object(' || chr(10) || '               ''id'', l.id,'));
  v_seg := substring(v_seg FOR strpos(v_seg, 'LIMIT 1) END)') + length('LIMIT 1) END)') - 1);
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND length(v_seg) > 2000 AND strpos(v_seg, '''soldWord''') > 0
     AND strpos(replace(prosrc, chr(13), ''), v_seg) > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P5: my_listing''s row object differs from my_listings'''; END IF;

  -- P6. The reads are keyed by the caller and leave out a deleted ad.
  IF strpos(v_src, 'WHERE l.id = p_listing_id AND l.seller_id = v_uid' || chr(10) || '     AND l.deleted_at IS NULL;') = 0 THEN
    RAISE EXCEPTION 'B16T3b P6: my_listing''s read is not keyed by the caller or keeps a deleted ad';
  END IF;
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.my_listings(text,integer,integer)'::regprocedure
     AND strpos(replace(prosrc, chr(13), ''), 'WHERE l.seller_id = v_uid' || chr(10) || '       AND l.deleted_at IS NULL' || chr(10) || '  )') > 0
     AND strpos(replace(prosrc, chr(13), ''), 'WHERE l.seller_id = v_uid' || chr(10) || '         AND l.deleted_at IS NULL' || chr(10) || '         AND CASE l.status') > 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16T3b P6: a read of my_listings is not keyed by the caller or keeps a deleted ad'; END IF;

  -- P7. No session: refused at the first gate.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T3b P7: my_listing answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T3b P7: my_listing: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.my_listings('live');
    RAISE EXCEPTION 'B16T3b P7: my_listings answered a call with no session';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'B16T3b P7: my_listings: %', v_msg; END IF;
  END;

  -- P8. A scratch identity that owns nothing (a fresh uuid; no auth.users row is read or written).
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid())::text, true);
  BEGIN
    PERFORM public.my_listing(gen_random_uuid());
    RAISE EXCEPTION 'B16T3b P8: my_listing answered for an ad the caller does not own';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not your listing' THEN RAISE EXCEPTION 'B16T3b P8: my_listing: %', v_msg; END IF;
  END;
  v_out := public.my_listings('sold', 20, 0);
  IF v_out IS DISTINCT FROM jsonb_build_object(
       'counts', jsonb_build_object('live', 0, 'review', 0, 'attention', 0, 'closed', 0, 'sold', 0, 'drafts', 0),
       'rows', '[]'::jsonb) THEN
    RAISE EXCEPTION 'B16T3b P8: an identity that owns nothing got %', v_out;
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261015130000') ON CONFLICT (version) DO NOTHING;
