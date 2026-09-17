-- ============================================================================
-- M-MAINT PART B — the categories-file cells (DEC-052/DEC-067) and the option
-- `facts` cell (D18, DEC-050 allowlist).
--
-- INC-183: every function is re-declared WHOLE and restates its closers.
-- No new table, so no INC-212 birth grants to revoke.
-- validate_listing_attributes is NOT touched: facts are a PREFILL, never a rule.
--
-- Two honest deviations from the brief, both forced by what the code actually is:
--  (1) admin_export_categories only WRAPS public.cat_export_rows(uuid); the
--      exported cells live in cat_export_rows, so THAT function is re-declared
--      whole (three keys after expiry_days) and admin_export_categories is left
--      unchanged.
--  (2) admin_undo_category_import restores columns BY NAME, so the three new
--      cells would not come back on undo. It is re-declared whole with one
--      restore statement for them; without it undo would be a phantom (F4).
-- ============================================================

-- ============================================================
-- B.1 public.cat_export_rows(uuid) — WHOLE re-declaration
--     Body of 20260907194932_c078fa68 byte-for-byte plus the three cells
--     emitted directly after expiry_days.
-- ============================================================
CREATE OR REPLACE FUNCTION public.cat_export_rows(p_scope uuid)
RETURNS jsonb
LANGUAGE sql STABLE SET search_path TO 'public' AS $$
  WITH scoped AS (
    SELECT c.* FROM public.categories c
     WHERE p_scope IS NULL
        OR c.id IN (SELECT d.id FROM public.cat_descendants(p_scope) d)
  ),
  edge AS (
    SELECT s.id AS cat_id, e.parent_id, e.display_order
      FROM scoped s
      LEFT JOIN LATERAL public.cat_primary_pointer(s.id) e ON TRUE
  ),
  path AS (
    WITH RECURSIVE up AS (
      SELECT c.id AS cat_id, c.id AS node, c.slug::text AS acc, 0 AS depth
        FROM scoped c
      UNION ALL
      SELECT u.cat_id, e.parent_id, pc.slug || '/' || u.acc, u.depth + 1
        FROM up u
        JOIN LATERAL public.cat_primary_pointer(u.node) e ON TRUE
        JOIN public.categories pc ON pc.id = e.parent_id
       WHERE u.depth < 20
    )
    SELECT DISTINCT ON (cat_id) cat_id, acc FROM up ORDER BY cat_id, depth DESC
  ),
  sec AS (
    SELECT p.child_id AS cat_id,
           array_agg(pc.slug ORDER BY pc.slug) AS slugs
      FROM public.category_tree_pointers p
      JOIN public.categories pc ON pc.id = p.parent_id
      JOIN edge e ON e.cat_id = p.child_id
     WHERE e.parent_id IS NULL OR p.parent_id <> e.parent_id
     GROUP BY p.child_id
  ),
  excl AS (
    SELECT x.category_id, array_agg(x.country_code::text ORDER BY x.country_code) AS codes
      FROM public.category_country_exclusions x GROUP BY x.category_id
  ),
  lst AS (
    SELECT l.category_id, count(*)::int AS n
      FROM public.listings l WHERE l.status = 'active' GROUP BY l.category_id
  )
  SELECT COALESCE(jsonb_agg(obj ORDER BY obj->>'category_path'), '[]'::jsonb)
    FROM (
      SELECT jsonb_build_object(
               'category_path', COALESCE(pa.acc, s.slug),
               'category_slug', s.slug,
               'parent_slug', COALESCE(pp.slug, ''),
               'name_en', s.name_en,
               'name_am', COALESCE(tr.value, ''),
               'display_order', COALESCE(e.display_order, s.display_order)::text,
               'is_active', CASE WHEN s.is_active THEN 'true' ELSE 'false' END,
               'allow_listings', CASE WHEN s.allow_listings THEN 'true' ELSE 'false' END,
               'is_catchall', CASE WHEN s.is_catchall THEN 'true' ELSE 'false' END,
               'price_enabled', CASE WHEN s.price_enabled THEN 'true' ELSE 'false' END,
               'expiry_days', COALESCE(s.expiry_days::text, ''),
               -- DEC-052 / DEC-067 — the three editable cells, after expiry_days.
               'capabilities', array_to_string(COALESCE(s.capabilities, '{}'), '|'),
               'default_price_period', COALESCE(s.default_price_period, ''),
               'price_period_locked', CASE WHEN s.price_period_locked THEN 'true' ELSE 'false' END,
               'icon', COALESCE(s.icon, ''),
               'visible_from', COALESCE(to_char(s.visible_from AT TIME ZONE 'UTC',
                                                'YYYY-MM-DD"T"HH24:MI:SS"Z"'), ''),
               'visible_until', COALESCE(to_char(s.visible_until AT TIME ZONE 'UTC',
                                                 'YYYY-MM-DD"T"HH24:MI:SS"Z"'), ''),
               'excluded_country_codes', array_to_string(COALESCE(x.codes, '{}'), '|'),
               'secondary_parents', array_to_string(COALESCE(sc.slugs, '{}'), '|'),
               'listing_count', COALESCE(li.n, 0)::text,
               'origin_scope', COALESCE((SELECT c2.slug FROM public.categories c2
                                          WHERE c2.id = p_scope), '')
             ) AS obj
        FROM scoped s
        LEFT JOIN edge e ON e.cat_id = s.id
        LEFT JOIN public.categories pp ON pp.id = e.parent_id
        LEFT JOIN path pa ON pa.cat_id = s.id
        LEFT JOIN sec sc ON sc.cat_id = s.id
        LEFT JOIN excl x ON x.category_id = s.id
        LEFT JOIN lst li ON li.category_id = s.id
        LEFT JOIN public.entity_translations tr
               ON tr.entity_type = 'category' AND tr.entity_id = s.id
              AND tr.field = 'name' AND tr.lang_code = 'am'
    ) q
$$;

-- ============================================================
-- B.2 public.cat_import_plan(jsonb, text) — WHOLE re-declaration
--     Body of 20260915114812_de5a1373 byte-for-byte plus the three cells:
--     validated once per row (badCapability / badPeriod), planned as field
--     diffs on create and update alike.
-- ============================================================
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
BEGIN
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

    -- DEC-052 / DEC-067 — the three new cells, judged ONCE per row before any
    -- branch: an unknown capability or period NAMES the offending value.
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

    -- Scope law: an existing row must live inside the filtered subtree.
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
        -- INC-198 (d) — nothing to do, and the preview SAYS SO.
        v_unchanged := v_unchanged + 1;
        v_items := v_items || jsonb_build_object('row',v_num,'slug',v_slug,'op','noop',
                                                 'detail','alreadyDeleted');
        CONTINUE;
      END IF;

      -- SLUG RENAME, FIRST. The row still carries the read-only address of an
      -- existing category the file has otherwise dropped: slugs are identity.
      IF v_action <> 'create-root'
         AND btrim(COALESCE(v_row->>'category_path','')) <> '' THEN
        IF v_export IS NULL THEN v_export := public.cat_export_rows(NULL); END IF;
        v_rename := NULL;
        SELECT r->>'category_slug' INTO v_rename
          FROM jsonb_array_elements(v_export) r
         WHERE btrim(COALESCE(r->>'category_path','')) = btrim(COALESCE(v_row->>'category_path',''))
           AND lower(btrim(COALESCE(r->>'parent_slug',''))) = v_parent_slug
           AND lower(btrim(COALESCE(r->>'category_slug',''))) <> v_slug
           AND NOT EXISTS (
                 SELECT 1 FROM jsonb_array_elements(COALESCE(p_rows,'[]'::jsonb)) o
                  WHERE lower(btrim(COALESCE(o.value->>'category_slug','')))
                        = lower(btrim(COALESCE(r->>'category_slug',''))))
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
          -- IE-4a corrective: the parent is an accepted create EARLIER in this
          -- same file; the commit lands creates parents-before-children.
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
        -- A rename arriving as a create whose name already belongs to a
        -- sibling: still refused, with the sibling's slug as the fix.
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
        -- DEC-052 / DEC-067 — a create carries the three cells it states.
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
    -- INC-198: a ROOT is not excluded. A category — root or child — is
    -- deletable when it holds NO pointer children (active or retired) and no
    -- listings, and is already retired. A root with children or listings is
    -- refused by the existing hasChildren / hasListings ids, which name the
    -- reason; the delete door removes the root's own parent-NULL pointer.
    IF v_action = 'delete' THEN
      SELECT count(*)::int INTO v_children FROM public.category_tree_pointers p
       WHERE p.parent_id = v_cat.id;
      IF v_children > 0 THEN
        -- IE-4a — the refusal NAMES the children that hold the category down.
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
    -- An is_active cell that CONTRADICTS the stored status and carries no
    -- retire/reactivate action is a refusal, never a silent skip.
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
    -- INC-199 part 2: this diff now runs for a retire/reactivate row TOO, so an
    -- action row carries its other cell changes instead of dropping them.
    v_cur := public.cat_export_row(v_cat.id);
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

    -- DEC-052 / DEC-067 — the three cells as field diffs. An absent cell is
    -- SILENCE; a present cell that differs is one change.
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

    -- INC-187 — a CATCH-ALL's order cell is never a change: the reorder door
    -- excludes catch-alls and pins them at 1000000 + order, so a delta here
    -- could only ever be phantom.
    v_order := public.cat_int(v_row->>'display_order');
    IF NOT v_cat.is_catchall
       AND v_order IS NOT NULL
       AND v_order IS DISTINCT FROM public.cat_int(v_cur->>'display_order') THEN
      v_delta := v_delta || jsonb_build_object('display_order', v_order);
    END IF;

    -- IE-4a — name_am is EDITABLE. A non-empty cell that differs from the
    -- live translation is one change; an EMPTY cell is SILENCE, never a
    -- deletion, so a file with blank am cells round-trips to nothing.
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

    -- Parent change → reparent through the pointer door (cycle + catch-all law).
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

    IF public.cat_pipe(v_row->>'secondary_parents')
       IS DISTINCT FROM public.cat_pipe(v_cur->>'secondary_parents') THEN
      IF EXISTS (SELECT 1 FROM unnest(public.cat_pipe(v_row->>'secondary_parents')) s
                  WHERE NOT EXISTS (SELECT 1 FROM public.categories c
                                     WHERE c.slug = s AND NOT c.is_catchall)) THEN
        v_ref := v_ref || jsonb_build_object('file','categories','row',v_num,'key',v_slug,
                                             'reason','unknownParent');
        CONTINUE;
      END IF;
      v_delta := v_delta || jsonb_build_object('secondary_parents',
                    to_jsonb(public.cat_pipe(v_row->>'secondary_parents')));
    END IF;

    -- The row's changed cells, named, for the preview's row detail.
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
        -- Already retired, but the row still carries cell changes: they apply.
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

-- ============================================================
-- B.3 public.admin_commit_category_import(jsonb, text, text)
--     WHOLE re-declaration. Body of 20260915114812_de5a1373 byte-for-byte plus
--     ONE statement per row applying the three cells (there is no gated door
--     carrying them; the commit's own gates stand above this write).
-- ============================================================
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
BEGIN
  -- GATES
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');
  IF NOT pg_try_advisory_xact_lock(hashtext('category-import'), hashtext(auth.uid()::text)) THEN
    RAISE EXCEPTION 'import already running';
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

      v_id := public.admin_create_category(
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
        PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                     v_fields->>'name_am');
      END IF;

      IF jsonb_array_length(COALESCE(v_fields->'excluded_country_codes','[]'::jsonb)) > 0 THEN
        PERFORM public.admin_set_country_exclusions(v_id,
          ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                  v_fields->'excluded_country_codes') x));
      END IF;

      -- INC-187 — a created row STATES its place; the order pass below applies it.
      IF public.cat_int(v_fields->>'display_order') IS NOT NULL THEN
        SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
        v_ord := v_ord || jsonb_build_object('id', v_id, 'parent', v_pp.parent_id,
                                             'ord', public.cat_int(v_fields->>'display_order'));
      END IF;

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
       AND t.field = 'name' AND t.lang_code = 'am';
    v_prev := public.cat_export_row(v_id)
              || jsonb_build_object('am_state', COALESCE(v_am, 'null'::jsonb));

    IF v_op = 'delete' THEN
      -- The am row leaves with the category (a deleted id can never be read
      -- again); the captured am_state above restores it on Undo. A ROOT leaves
      -- the same way — the delete door removes its parent-NULL pointer.
      DELETE FROM public.entity_translations
       WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
      PERFORM public.admin_delete_category(v_id, v_slug);
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
      PERFORM public.admin_retire_category(v_id, NULL);
    ELSIF v_op = 'reactivate' THEN
      PERFORM public.admin_reactivate_category(v_id);
    END IF;

    v_fields := COALESCE(v_item->'fields', '{}'::jsonb);

    IF v_fields ? 'name_en' OR v_fields ? 'icon' OR v_fields ? 'allow_listings'
       OR v_fields ? 'price_enabled' OR v_fields ? 'expiry_days' THEN
      PERFORM public.admin_update_category(
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
      PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                   btrim(v_fields->>'name_am'));
    END IF;

    IF v_fields ? 'visible_from' OR v_fields ? 'visible_until' THEN
      PERFORM public.admin_set_category_window(v_id,
        public.cat_ts(v_fields->>'visible_from'), public.cat_ts(v_fields->>'visible_until'));
    END IF;

    IF v_fields ? 'excluded_country_codes' THEN
      PERFORM public.admin_set_country_exclusions(v_id,
        ARRAY(SELECT upper(x::text) FROM jsonb_array_elements_text(
                v_fields->'excluded_country_codes') x));
    END IF;

    IF v_fields ? 'parent_slug' THEN
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_fields->>'parent_slug', '');
      PERFORM public.admin_move_category_pointer(v_pp.pointer_id, v_parent);
    END IF;

    IF v_fields ? 'secondary_parents' THEN
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      -- remove the secondary pointers that left the file
      PERFORM public.admin_remove_category_pointer(p.id)
         FROM public.category_tree_pointers p
         JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = v_id
          AND p.id <> v_pp.pointer_id
          AND NOT (pc.slug = ANY (ARRAY(SELECT x::text FROM jsonb_array_elements_text(
                                          v_fields->'secondary_parents') x)));
      -- add the ones that arrived
      PERFORM public.admin_add_category_pointer(c.id, v_id)
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
    SELECT array_agg(sib.child_id ORDER BY sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                              LIMIT 1), p.display_order) AS rank
              FROM public.category_tree_pointers p
             WHERE p.parent_id IS NOT DISTINCT FROM v_par.parent_id) sib;
    IF v_ids IS NOT NULL THEN
      PERFORM public.admin_reorder_categories(v_par.parent_id, v_ids);
    END IF;
  END LOOP;

  PERFORM public.log_audit('category_import.commit', 'categories', v_batch::text,
    jsonb_build_object('counts', v_plan->'counts', 'scope', p_scope, 'digest', p_digest));

  RETURN jsonb_build_object('batch_id', v_batch,
                            'counts', v_plan->'counts',
                            'refusals', v_plan->'refusals');
END $function$;

REVOKE ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_commit_category_import(jsonb, text, text) TO service_role;

-- ============================================================
-- B.4 public.admin_undo_category_import(uuid) — WHOLE re-declaration.
--     Body of 20260915114812_de5a1373 byte-for-byte plus ONE statement
--     restoring the three cells from the captured prev row. The undo restores
--     columns BY NAME, so without this the new cells would not come back.
-- ============================================================
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
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'import') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'import');

  IF NOT EXISTS (SELECT 1 FROM public.category_import_revisions r WHERE r.batch_id = p_batch) THEN
    RAISE EXCEPTION 'unknown import batch';
  END IF;

  FOR v_rev IN SELECT * FROM public.category_import_revisions r
                WHERE r.batch_id = p_batch AND r.undone_at IS NULL
                ORDER BY r.id DESC
  LOOP
    SELECT c.id INTO v_id FROM public.categories c WHERE c.slug = v_rev.entity_key;
    v_prev := v_rev.prev;

    IF v_rev.action = 'create' THEN
      IF v_id IS NOT NULL THEN
        -- IE-4a — the pending am row this batch created leaves with it.
        DELETE FROM public.entity_translations
         WHERE entity_type = 'category' AND entity_id = v_id AND field = 'name';
        IF (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
          PERFORM public.admin_retire_category(v_id, NULL);
        END IF;
        PERFORM public.admin_delete_category(v_id, v_rev.entity_key);
        v_restored := v_restored + 1;
      END IF;
    ELSIF v_prev IS NOT NULL THEN
      IF v_id IS NULL THEN
        SELECT c.id INTO v_parent FROM public.categories c
         WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
        v_id := public.admin_create_category(
          v_prev->>'name_en', v_rev.entity_key, NULLIF(v_prev->>'icon',''), v_parent,
          public.cat_bool(v_prev->>'allow_listings', true),
          public.cat_bool(v_prev->>'price_enabled', true),
          public.cat_int(v_prev->>'expiry_days'),
          public.cat_ts(v_prev->>'visible_from'), public.cat_ts(v_prev->>'visible_until'));
      ELSE
        PERFORM public.admin_update_category(v_id, v_prev->>'name_en',
          NULLIF(v_prev->>'icon',''), NULL,
          public.cat_bool(v_prev->>'allow_listings', true),
          public.cat_bool(v_prev->>'price_enabled', true),
          public.cat_int(v_prev->>'expiry_days'));
        PERFORM public.admin_set_category_window(v_id,
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

      PERFORM public.admin_set_country_exclusions(v_id,
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
        VALUES ('category', v_id, 'name', 'am', v_am->>'value',
                COALESCE(v_am->>'status', 'edited'),
                COALESCE((v_am->>'machine')::boolean, false), auth.uid())
        ON CONFLICT (entity_type, entity_id, field, lang_code) DO UPDATE
          SET value = EXCLUDED.value, status = EXCLUDED.status,
              machine = EXCLUDED.machine, updated_by = EXCLUDED.updated_by,
              updated_at = now();
        PERFORM public.log_audit('entity_translation.undo_restore', 'categories', v_id::text,
          jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'name',
                             'restored', v_am));
      ELSIF v_am IS NOT NULL AND jsonb_typeof(v_am) = 'null' THEN
        DELETE FROM public.entity_translations
         WHERE entity_type = 'category' AND entity_id = v_id
           AND field = 'name' AND lang_code = 'am';
        PERFORM public.log_audit('entity_translation.undo_remove', 'categories', v_id::text,
          jsonb_build_object('batch_id', p_batch, 'lang', 'am', 'field', 'name'));
      ELSIF COALESCE(v_prev->>'name_am', '') <> '' THEN
        -- a pre-IE-4a batch carries no captured state: restore the exported value
        PERFORM public.admin_save_entity_translation('category', v_id, 'name', 'am',
                                                     v_prev->>'name_am');
      END IF;

      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      SELECT c.id INTO v_parent FROM public.categories c
       WHERE c.slug = NULLIF(v_prev->>'parent_slug', '');
      IF v_pp.pointer_id IS NOT NULL AND v_pp.parent_id IS DISTINCT FROM v_parent THEN
        PERFORM public.admin_move_category_pointer(v_pp.pointer_id, v_parent);
      END IF;

      -- INC-199 — the SECONDARY PARENTS of the prior state come back too. An
      -- action row may now carry a secondary-parent change (Pet Services), so
      -- undoing it has to restore the pointer set, not only the fields.
      v_sec := public.cat_pipe(v_prev->>'secondary_parents');
      SELECT * INTO v_pp FROM public.cat_primary_pointer(v_id);
      PERFORM public.admin_remove_category_pointer(p.id)
         FROM public.category_tree_pointers p
         JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = v_id
          AND p.id IS DISTINCT FROM v_pp.pointer_id
          AND NOT (pc.slug = ANY (v_sec));
      PERFORM public.admin_add_category_pointer(c.id, v_id)
         FROM public.categories c
        WHERE c.slug = ANY (v_sec)
          AND NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                           WHERE p.child_id = v_id AND p.parent_id = c.id);

      IF public.cat_bool(v_prev->>'is_active', true)
         IS DISTINCT FROM (SELECT c.is_active FROM public.categories c WHERE c.id = v_id) THEN
        IF public.cat_bool(v_prev->>'is_active', true) THEN
          PERFORM public.admin_reactivate_category(v_id);
        ELSE
          PERFORM public.admin_retire_category(v_id, NULL);
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
    SELECT array_agg(sib.child_id ORDER BY sib.rank, sib.display_order, sib.child_id)
      INTO v_ids
      FROM (SELECT p.child_id, p.display_order,
                   COALESCE((SELECT (o->>'ord')::int
                               FROM jsonb_array_elements(v_ord) o
                              WHERE (o->>'id')::uuid = p.child_id
                              LIMIT 1), p.display_order) AS rank
              FROM public.category_tree_pointers p
             WHERE p.parent_id IS NOT DISTINCT FROM v_par.parent_id) sib;
    IF v_ids IS NOT NULL THEN
      PERFORM public.admin_reorder_categories(v_par.parent_id, v_ids);
    END IF;
  END LOOP;

  PERFORM public.log_audit('category_import.undo', 'categories', p_batch::text,
    jsonb_build_object('restored', v_restored));

  RETURN jsonb_build_object('restored', v_restored);
END $function$;

REVOKE ALL ON FUNCTION public.admin_undo_category_import(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_undo_category_import(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_undo_category_import(uuid) TO service_role;

-- ============================================================
-- B.5 public.attr_option_shape(text, jsonb) — WHOLE re-declaration.
--     Body of 20260913053747_8909c981 (the TRUE latest: it added `allowed` to
--     the allowlist and the DEC-057 allowed-object block) byte-for-byte, plus
--     `facts` in the allowlist and its shape rule (D18).
-- ============================================================
CREATE OR REPLACE FUNCTION public.attr_option_shape(p_key text, p_options jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $function$
DECLARE
  v_opt     jsonb;
  v_val     text;
  v_k       text;
  v_alias   text;
  v_all     text[] := ARRAY[]::text[];
  v_n       int;
  v_b       jsonb;
  v_bmin    text;
  v_bmax    text;
BEGIN
  IF p_options IS NULL OR jsonb_typeof(p_options) <> 'array' THEN RETURN NULL; END IF;

  FOR v_opt IN SELECT value FROM jsonb_array_elements(p_options)
  LOOP
    CONTINUE WHEN jsonb_typeof(v_opt) <> 'object';
    v_val := COALESCE(v_opt->>'value', '');

    FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt) k
    LOOP
      IF v_k NOT IN ('value','label_en','label_am','parent','active','bounds','aliases','allowed','facts') THEN
        RETURN p_key || '|' || v_val || '|unknownOptionKey:' || v_k;
      END IF;
    END LOOP;

    IF v_opt ? 'active' AND jsonb_typeof(v_opt->'active') <> 'boolean' THEN
      RETURN p_key || '|' || v_val || '|activeNotBoolean';
    END IF;

    IF v_opt ? 'aliases' THEN
      IF jsonb_typeof(v_opt->'aliases') <> 'array' THEN
        RETURN p_key || '|' || v_val || '|aliasesNotArray';
      END IF;
      v_n := jsonb_array_length(v_opt->'aliases');
      IF v_n < 1 OR v_n > 5 THEN
        RETURN p_key || '|' || v_val || '|aliasesCount:' || v_n::text;
      END IF;
      FOR v_alias IN SELECT x.value #>> '{}' FROM jsonb_array_elements(v_opt->'aliases') x
      LOOP
        IF v_alias IS NULL THEN RETURN p_key || '|' || v_val || '|aliasNotString'; END IF;
        IF char_length(v_alias) < 1 OR char_length(v_alias) > 32 THEN
          RETURN p_key || '|' || v_val || '|aliasLength:' || v_alias;
        END IF;
        IF v_alias ~ '[[:cntrl:]]' THEN
          RETURN p_key || '|' || v_val || '|aliasControlChar';
        END IF;
        IF lower(v_alias) = ANY (v_all) THEN
          RETURN p_key || '|' || v_val || '|aliasDuplicate:' || v_alias;
        END IF;
        v_all := v_all || lower(v_alias);
      END LOOP;
      IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_opt->'aliases') x
                  WHERE jsonb_typeof(x.value) <> 'string') THEN
        RETURN p_key || '|' || v_val || '|aliasNotString';
      END IF;
    END IF;

    IF v_opt ? 'bounds' THEN
      IF jsonb_typeof(v_opt->'bounds') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|boundsNotObject';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'bounds') k
      LOOP
        v_b := v_opt->'bounds'->v_k;
        IF jsonb_typeof(v_b) <> 'object' THEN
          RETURN p_key || '|' || v_val || '|boundsNotObject:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_object_keys(v_b) bk WHERE bk NOT IN ('min','max')) THEN
          RETURN p_key || '|' || v_val || '|boundsUnknownKey:' || v_k;
        END IF;
        v_bmin := v_b #>> '{min}';
        v_bmax := v_b #>> '{max}';
        IF v_bmin IS NOT NULL AND NOT public.attr_bound_ok(v_bmin) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmin;
        END IF;
        IF v_bmax IS NOT NULL AND NOT public.attr_bound_ok(v_bmax) THEN
          RETURN p_key || '|' || v_val || '|boundsBadValue:' || v_bmax;
        END IF;
        IF v_bmin ~ '^-?[0-9]+(\.[0-9]+)?$' AND v_bmax ~ '^-?[0-9]+(\.[0-9]+)?$'
           AND v_bmin::numeric > v_bmax::numeric THEN
          RETURN p_key || '|' || v_val || '|boundsMinAboveMax:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- DEC-057 — `allowed` is an object of select-target keys to value lists.
    IF v_opt ? 'allowed' THEN
      IF jsonb_typeof(v_opt->'allowed') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|allowedNotObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'allowed') ak) > 5 THEN
        RETURN p_key || '|' || v_val || '|allowedTooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'allowed') k
      LOOP
        v_b := v_opt->'allowed'->v_k;
        IF jsonb_typeof(v_b) <> 'array' THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        v_n := jsonb_array_length(v_b);
        IF v_n < 1 THEN
          RETURN p_key || '|' || v_val || '|allowedEmpty:' || v_k;
        END IF;
        IF v_n > 50 THEN
          RETURN p_key || '|' || v_val || '|allowedTooMany:' || v_k;
        END IF;
        IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                    WHERE jsonb_typeof(x.value) <> 'string') THEN
          RETURN p_key || '|' || v_val || '|allowedValuesNotArray:' || v_k;
        END IF;
        IF (SELECT count(DISTINCT x.value #>> '{}') FROM jsonb_array_elements(v_b) x) <> v_n THEN
          RETURN p_key || '|' || v_val || '|allowedDuplicate:' || v_k;
        END IF;
      END LOOP;
    END IF;

    -- D18 — `facts` is a PREFILL, never a rule: an object of attribute keys to
    -- a scalar or a list of strings, at most 20 entries. The validator never
    -- reads it; the options read projects it for the form.
    IF v_opt ? 'facts' THEN
      IF jsonb_typeof(v_opt->'facts') <> 'object' THEN
        RETURN p_key || '|' || v_val || '|badFacts:notObject';
      END IF;
      IF (SELECT count(*) FROM jsonb_object_keys(v_opt->'facts') fk) > 20 THEN
        RETURN p_key || '|' || v_val || '|badFacts:tooMany';
      END IF;
      FOR v_k IN SELECT k FROM jsonb_object_keys(v_opt->'facts') k
      LOOP
        IF v_k !~ '^[a-z0-9_]{2,64}$' THEN
          RETURN p_key || '|' || v_val || '|badFacts:key:' || v_k;
        END IF;
        v_b := v_opt->'facts'->v_k;
        IF jsonb_typeof(v_b) = 'array' THEN
          v_n := jsonb_array_length(v_b);
          IF v_n < 1 OR v_n > 20 THEN
            RETURN p_key || '|' || v_val || '|badFacts:listLength:' || v_k;
          END IF;
          IF EXISTS (SELECT 1 FROM jsonb_array_elements(v_b) x
                      WHERE jsonb_typeof(x.value) <> 'string') THEN
            RETURN p_key || '|' || v_val || '|badFacts:listNotStrings:' || v_k;
          END IF;
        ELSIF jsonb_typeof(v_b) NOT IN ('string','number','boolean') THEN
          RETURN p_key || '|' || v_val || '|badFacts:value:' || v_k;
        END IF;
      END LOOP;
    END IF;
  END LOOP;

  RETURN NULL;
END $function$;

REVOKE ALL ON FUNCTION public.attr_option_shape(text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attr_option_shape(text, jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.attr_option_shape(text, jsonb) TO service_role;

-- ============================================================
-- B.6 public.get_attribute_options(uuid) — WHOLE re-declaration.
--     Body of 20260916235955_fd11c7ab byte-for-byte plus `facts` projected
--     beside value / label_en / label_am / aliases / bounds for active options.
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_attribute_options(p_attribute_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_opts jsonb;
  v_found boolean;
BEGIN
  SELECT true,
         coalesce((
           SELECT jsonb_agg(
                    jsonb_strip_nulls(jsonb_build_object(
                      'value',    o.value->>'value',
                      'label_en', o.value->>'label_en',
                      'label_am', o.value->>'label_am',
                      'parent',   o.value->>'parent',
                      'aliases',  CASE WHEN jsonb_typeof(o.value->'aliases') = 'array' THEN o.value->'aliases' END,
                      'bounds',   CASE WHEN jsonb_typeof(o.value->'bounds')  = 'object' THEN o.value->'bounds' END,
                      'allowed',  CASE WHEN jsonb_typeof(o.value->'allowed') = 'object' THEN o.value->'allowed' END,
                      'facts',    CASE WHEN jsonb_typeof(o.value->'facts')   = 'object' THEN o.value->'facts' END
                    ))
                    ORDER BY o.ordinality)
             FROM jsonb_array_elements(
                    CASE WHEN jsonb_typeof(a.options) = 'array' THEN a.options ELSE '[]'::jsonb END)
                  WITH ORDINALITY o(value, ordinality)
            WHERE coalesce((o.value->>'active')::boolean, true)
         ), '[]'::jsonb)
    INTO v_found, v_opts
    FROM public.attributes a
   WHERE a.id = p_attribute_id;

  IF NOT coalesce(v_found, false) THEN
    RAISE EXCEPTION 'attributeNotFound';
  END IF;

  RETURN jsonb_build_object(
    'options', v_opts,
    'version', public.get_attribute_options_version(p_attribute_id)
  );
END $$;

REVOKE ALL ON FUNCTION public.get_attribute_options(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_attribute_options(uuid) TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_attribute_options(uuid) TO service_role;

INSERT INTO public.migration_marks(version) VALUES ('20260917150000') ON CONFLICT DO NOTHING;