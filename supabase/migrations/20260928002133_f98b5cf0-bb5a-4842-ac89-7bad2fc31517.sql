-- ============================================================
-- TURN C1 — DEC-080: THE HOME OF A CATEGORY IS AN EXPLICIT FLAG.
-- INC-303 · INC-304 · INC-305. Declared mark 20260928010000 (the brief's
-- 20260927150000 precedes this file's stamp, so the next round hour after the
-- stamp is declared — DEC-022 / INC-094).
--
-- INC-303 — the import's ordering pass looked a pointer's rank up BY CHILD ID
-- ONLY, so a guest pointer inherited its row's home rank; the home was "the
-- lowest-numbered pointer anywhere", and four homes flipped on 2026-09-27.
-- Repaired below, by slug, guarded (a no-op where the rows are absent):
--   bicycles               → home vehicles
--   personal-care-services → home services
--   industrial-equipment   → home commercial-equipment
--   nursery-furniture      → home babies-kids
-- No log_audit from this body (a migration has no actor).
-- INC-304 — undo could not move a home onto a parent already holding a guest
-- pointer (UNIQUE (parent_id, child_id)); the move door now MERGES.
-- INC-305 — the public tree ignored pointer order and the version ignored
-- pointer shape; the version now covers every pointer's order and flag.
--
-- Re-declared WHOLE with their closers (INC-183): cat_primary_pointer,
-- cat_primary_parent, admin_list_categories, admin_move_category_pointer,
-- admin_remove_category_pointer, admin_commit_category_import,
-- admin_undo_category_import, get_category_tree_version. NEW:
-- admin_set_primary_pointer, cat_pointer_default_home, cat_pointer_promote_home.
-- ============================================================

-- a. the flag -------------------------------------------------------------
ALTER TABLE public.category_tree_pointers ADD COLUMN is_primary boolean NOT NULL DEFAULT false;

-- b. backfill — one pointer per child by today's rule, verbatim ------------
WITH legacy AS (
  SELECT DISTINCT ON (p.child_id) p.id
    FROM public.category_tree_pointers p
    LEFT JOIN public.categories pc ON pc.id = p.parent_id
   ORDER BY p.child_id, (NOT (p.parent_id IS NULL OR pc.is_active)), (p.parent_id IS NOT NULL), p.display_order, p.created_at)
UPDATE public.category_tree_pointers p SET is_primary = true WHERE p.id IN (SELECT id FROM legacy);

-- c. INC-303 repair ---------------------------------------------------------
DO $repair$
DECLARE
  v_pair text[];
  v_child uuid;
  v_home uuid;
BEGIN
  FOREACH v_pair SLICE 1 IN ARRAY ARRAY[
    ARRAY['bicycles', 'vehicles'],
    ARRAY['personal-care-services', 'services'],
    ARRAY['industrial-equipment', 'commercial-equipment'],
    ARRAY['nursery-furniture', 'babies-kids']]
  LOOP
    SELECT c.id INTO v_child FROM public.categories c WHERE c.slug = v_pair[1];
    SELECT c.id INTO v_home FROM public.categories c WHERE c.slug = v_pair[2];
    IF v_child IS NULL OR v_home IS NULL OR NOT EXISTS (
         SELECT 1 FROM public.category_tree_pointers p
          WHERE p.child_id = v_child AND p.parent_id = v_home) THEN
      RAISE NOTICE 'INC-303 repair skipped: % → % (child %, home %, pointer absent)',
        v_pair[1], v_pair[2], v_child, v_home;
      CONTINUE;
    END IF;
    UPDATE public.category_tree_pointers SET is_primary = false
     WHERE child_id = v_child AND is_primary;
    UPDATE public.category_tree_pointers SET is_primary = true
     WHERE child_id = v_child AND parent_id = v_home;
    RAISE NOTICE 'INC-303 repair: % home is now %', v_pair[1], v_pair[2];
  END LOOP;
END $repair$;

-- d. one home per child -----------------------------------------------------
CREATE UNIQUE INDEX category_tree_pointers_one_home
  ON public.category_tree_pointers (child_id) WHERE is_primary;

-- e. triggers (SECURITY INVOKER helpers) -------------------------------------
CREATE OR REPLACE FUNCTION public.cat_pointer_default_home()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT NEW.is_primary AND NOT EXISTS (
       SELECT 1 FROM public.category_tree_pointers p
        WHERE p.child_id = NEW.child_id AND p.is_primary) THEN
    NEW.is_primary := true;
  END IF;
  RETURN NEW;
END $$;

REVOKE ALL ON FUNCTION public.cat_pointer_default_home() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.cat_pointer_default_home() TO service_role;

CREATE TRIGGER cat_pointer_default_home
  BEFORE INSERT ON public.category_tree_pointers
  FOR EACH ROW EXECUTE FUNCTION public.cat_pointer_default_home();

CREATE OR REPLACE FUNCTION public.cat_pointer_promote_home()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF OLD.is_primary THEN
    UPDATE public.category_tree_pointers SET is_primary = true
     WHERE id = (
       SELECT p.id
         FROM public.category_tree_pointers p
         LEFT JOIN public.categories pc ON pc.id = p.parent_id
        WHERE p.child_id = OLD.child_id
        ORDER BY (NOT (p.parent_id IS NULL OR pc.is_active)), (p.parent_id IS NOT NULL),
                 p.display_order, p.created_at
        LIMIT 1);
  END IF;
  RETURN NULL;
END $$;

REVOKE ALL ON FUNCTION public.cat_pointer_promote_home() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.cat_pointer_promote_home() TO service_role;

CREATE TRIGGER cat_pointer_promote_home
  AFTER DELETE ON public.category_tree_pointers
  FOR EACH ROW EXECUTE FUNCTION public.cat_pointer_promote_home();

-- f. the two home readers — the ONLY place the rule lives -------------------
CREATE OR REPLACE FUNCTION public.cat_primary_pointer(p_id uuid)
RETURNS TABLE(pointer_id uuid, parent_id uuid, display_order integer)
LANGUAGE sql STABLE SET search_path TO 'public' AS $$
  SELECT p.id, p.parent_id, p.display_order
    FROM public.category_tree_pointers p
    LEFT JOIN public.categories pc ON pc.id = p.parent_id
   WHERE p.child_id = p_id
     AND (p.parent_id IS NULL OR pc.is_active)
   ORDER BY (NOT p.is_primary), (p.parent_id IS NOT NULL), p.display_order, p.created_at
   LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.cat_primary_pointer(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.cat_primary_pointer(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.cat_primary_pointer(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.cat_primary_parent(p_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  SELECT p.parent_id
    FROM public.category_tree_pointers p
    LEFT JOIN public.categories pc ON pc.id = p.parent_id
   WHERE p.child_id = p_id
     AND (p.parent_id IS NULL OR pc.is_active)
   ORDER BY (NOT p.is_primary), (p.parent_id IS NOT NULL), p.display_order, p.created_at
   LIMIT 1
$function$;

REVOKE ALL ON FUNCTION public.cat_primary_parent(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.cat_primary_parent(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.cat_primary_parent(uuid) TO service_role;

-- h. admin_move_category_pointer — merges onto an existing pointer ----------
CREATE OR REPLACE FUNCTION public.admin_move_category_pointer(
  p_pointer_id uuid, p_new_parent_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_old uuid;
  v_child uuid;
  v_home boolean;
  v_existing uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  PERFORM public.assert_parent_not_catchall(p_new_parent_id);

  SELECT p.parent_id, p.child_id, p.is_primary INTO v_old, v_child, v_home
    FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'pointer not found'; END IF;

  SELECT p.id INTO v_existing
    FROM public.category_tree_pointers p
   WHERE p.child_id = v_child
     AND p.parent_id IS NOT DISTINCT FROM p_new_parent_id
     AND p.id <> p_pointer_id;

  IF v_existing IS NOT NULL THEN
    -- INC-304 — the target already holds this child: MERGE. The surviving row
    -- keeps its own created_at; the home flag travels with the move.
    IF v_home THEN
      UPDATE public.category_tree_pointers SET is_primary = false WHERE id = p_pointer_id;
      UPDATE public.category_tree_pointers SET is_primary = true WHERE id = v_existing;
    END IF;
    DELETE FROM public.category_tree_pointers WHERE id = p_pointer_id;
  ELSE
    UPDATE public.category_tree_pointers SET parent_id = p_new_parent_id WHERE id = p_pointer_id;
  END IF;

  PERFORM public.log_audit('category.pointer_move', 'category_tree_pointers',
    p_pointer_id::text,
    jsonb_build_object('old', jsonb_build_object('parent_id', v_old),
                       'new', jsonb_build_object('parent_id', p_new_parent_id),
                       'merged', v_existing IS NOT NULL));
END $$;

REVOKE ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_move_category_pointer(uuid, uuid) TO service_role;

-- i. NEW admin_set_primary_pointer -----------------------------------------
CREATE OR REPLACE FUNCTION public.admin_set_primary_pointer(p_pointer_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_child uuid;
  v_parent uuid;
  v_prev uuid;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT p.child_id, p.parent_id INTO v_child, v_parent
    FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'pointer not found'; END IF;
  IF v_parent IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM public.categories c WHERE c.id = v_parent AND c.is_active) THEN
    RAISE EXCEPTION 'parent not active';
  END IF;

  SELECT p.id INTO v_prev FROM public.category_tree_pointers p
   WHERE p.child_id = v_child AND p.is_primary;

  -- Two statements: the partial unique index forbids a single swap.
  UPDATE public.category_tree_pointers SET is_primary = false
   WHERE child_id = v_child AND is_primary;
  UPDATE public.category_tree_pointers SET is_primary = true WHERE id = p_pointer_id;

  PERFORM public.log_audit('category.pointer_home', 'category_tree_pointers',
    p_pointer_id::text,
    jsonb_build_object('child_id', v_child,
                       'old', jsonb_build_object('pointer_id', v_prev),
                       'new', jsonb_build_object('pointer_id', p_pointer_id, 'parent_id', v_parent)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_primary_pointer(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_primary_pointer(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_primary_pointer(uuid) TO service_role;

-- j. admin_remove_category_pointer — audits was_home ------------------------
CREATE OR REPLACE FUNCTION public.admin_remove_category_pointer(p_pointer_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_old jsonb;
  v_home boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT jsonb_build_object('parent_id', p.parent_id, 'child_id', p.child_id), p.is_primary
    INTO v_old, v_home FROM public.category_tree_pointers p WHERE p.id = p_pointer_id;
  IF v_old IS NULL THEN RAISE EXCEPTION 'pointer not found'; END IF;

  -- The promote trigger hands the home to the child's next pointer.
  DELETE FROM public.category_tree_pointers WHERE id = p_pointer_id;

  PERFORM public.log_audit('category.pointer_remove', 'category_tree_pointers',
    p_pointer_id::text,
    jsonb_build_object('old', v_old,
                       'was_home', v_home));
END $$;

REVOKE ALL ON FUNCTION public.admin_remove_category_pointer(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_remove_category_pointer(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_remove_category_pointer(uuid) TO service_role;

-- l. get_category_tree_version — covers pointer order and home -------------
CREATE OR REPLACE FUNCTION public.get_category_tree_version()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT md5(
       coalesce((SELECT to_char(max(c.updated_at), 'YYYYMMDDHH24MISS.US')
                   FROM public.categories c), 'none')
    || '|' || (SELECT count(*)::text FROM public.categories c)
    || '|' || (SELECT count(*)::text FROM public.categories c WHERE c.is_active)
    || '|' || coalesce((SELECT to_char(max(p.created_at), 'YYYYMMDDHH24MISS.US')
                          FROM public.category_tree_pointers p), 'none')
    || '|' || (SELECT count(*)::text FROM public.category_tree_pointers p)
    || '|' || coalesce((SELECT md5(string_agg(
                  coalesce(p.parent_id::text, 'root') || ':' || p.child_id::text || ':'
                  || p.display_order::text || ':' || p.is_primary::text, ',' ORDER BY p.id))
                FROM public.category_tree_pointers p), 'none')
  );
$function$;

REVOKE ALL ON FUNCTION public.get_category_tree_version() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_category_tree_version() TO anon;
GRANT EXECUTE ON FUNCTION public.get_category_tree_version() TO authenticated;
GRANT ALL ON FUNCTION public.get_category_tree_version() TO service_role;

-- ---------------------------------------------------------------- g. admin_list_categories (whole; base 20260908111546_94ea56c9:233-384)
CREATE OR REPLACE FUNCTION public.admin_list_categories()
 RETURNS TABLE(id uuid, slug text, name_en text, icon text, is_active boolean, is_catchall boolean, allow_listings boolean, display_order integer, price_enabled boolean, expiry_days integer, visible_from timestamp with time zone, visible_until timestamp with time zone, parent_id uuid, exclusion_count integer, listing_count integer, excluded_country_codes text[], has_image boolean, attribute_count integer, card_attribute_count integer, secondary_parent_names text[])
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  WITH RECURSIVE edge AS (
    SELECT c.id AS cat_id, e.parent_id, e.display_order AS edge_order
      FROM public.categories c
      LEFT JOIN LATERAL (
        SELECT p.parent_id, p.display_order
          FROM public.category_tree_pointers p
          LEFT JOIN public.categories pc ON pc.id = p.parent_id
         WHERE p.child_id = c.id
           AND (p.parent_id IS NULL OR pc.is_active)
         ORDER BY (NOT p.is_primary), (p.parent_id IS NOT NULL), p.display_order, p.created_at
         LIMIT 1
      ) e ON TRUE
     WHERE EXISTS (SELECT 1 FROM public.category_tree_pointers p2
                    WHERE p2.child_id = c.id)
  ),
  node AS (
    SELECT c.id, c.slug, c.is_catchall, e.parent_id,
           COALESCE(e.edge_order, c.display_order) AS edge_order
      FROM public.categories c
      JOIN edge e ON e.cat_id = c.id
  ),
  walk AS (
    SELECT n.id, n.slug, n.parent_id, n.edge_order,
           ARRAY[n.edge_order] AS path, 1 AS depth
      FROM node n
     WHERE n.parent_id IS NULL
    UNION ALL
    SELECT n.id, n.slug, n.parent_id, n.edge_order,
           w.path || n.edge_order, w.depth + 1
      FROM node n
      JOIN walk w ON w.id = n.parent_id
     WHERE w.depth < 20
  ),
  orphan AS (
    SELECT c.id, c.slug, NULL::uuid AS parent_id,
           row_number() OVER (ORDER BY c.slug)::int AS edge_order,
           ARRAY[row_number() OVER (ORDER BY c.slug)::int] AS path
      FROM public.categories c
     WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                        WHERE p.child_id = c.id)
  ),
  listed AS (
    SELECT w.id, w.slug, w.parent_id, w.edge_order, w.path, 0 AS seg FROM walk w
    UNION ALL
    SELECT o.id, o.slug, o.parent_id, o.edge_order, o.path, 1 AS seg FROM orphan o
  ),
  -- DIRECT links: the "attributes: N" figure stays the category's own count.
  lnk AS (
    SELECT k.category_id,
           count(*)::int AS attribute_count
      FROM public.category_attribute_links k
     GROUP BY k.category_id
  ),
  -- C3-INH (DEC-044), amended by INH-1: the CARD count is EFFECTIVE over the
  -- PRIMARY lineage only — own ∪ primary ancestors, nearest link wins. A
  -- secondary (browse) parent confers nothing, so its child keeps the amber
  -- flag until it carries (or primarily inherits) its own card attributes.
  anc AS (
    SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
      FROM public.categories c
    UNION ALL
    SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
      FROM anc a
     WHERE a.depth < 10
       AND public.cat_primary_parent(a.src_id) IS NOT NULL
  ),
  effl AS (
    SELECT DISTINCT ON (anc.cat_id, k.attribute_id)
           anc.cat_id, k.attribute_id, k.card_rank
      FROM anc
      JOIN public.category_attribute_links k ON k.category_id = anc.src_id
     ORDER BY anc.cat_id, k.attribute_id, anc.depth ASC, k.id
  ),
  effcard AS (
    SELECT effl.cat_id AS category_id,
           count(*) FILTER (WHERE effl.card_rank IS NOT NULL)::int AS card_attribute_count
      FROM effl
     GROUP BY effl.cat_id
  ),
  sec AS (
    SELECT l.id AS category_id,
           array_agg(pc.name_en ORDER BY pc.name_en) AS names
      FROM listed l
      JOIN public.category_tree_pointers p ON p.child_id = l.id
      JOIN public.categories pc ON pc.id = p.parent_id AND pc.is_active
     WHERE l.parent_id IS NULL OR p.parent_id <> l.parent_id
     GROUP BY l.id
  ),
  excl AS (
    SELECT x.category_id,
           count(*)::int AS exclusion_count,
           array_agg(x.country_code::text ORDER BY x.country_code) AS codes
      FROM public.category_country_exclusions x
     GROUP BY x.category_id
  ),
  lst AS (
    SELECT li.category_id, count(*)::int AS listing_count
      FROM public.listings li
     WHERE li.status = 'active'
     GROUP BY li.category_id
  )
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings,
         l.edge_order,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         l.parent_id,
         COALESCE(e.exclusion_count, 0),
         COALESCE(s.listing_count, 0),
         COALESCE(e.codes, ARRAY[]::text[]),
         (c.image_url IS NOT NULL),
         COALESCE(k.attribute_count, 0),
         COALESCE(ec.card_attribute_count, 0),
         COALESCE(sp.names, ARRAY[]::text[])
    FROM listed l
    JOIN public.categories c ON c.id = l.id
    LEFT JOIN lnk  k  ON k.category_id  = l.id
    LEFT JOIN effcard ec ON ec.category_id = l.id
    LEFT JOIN sec  sp ON sp.category_id = l.id
    LEFT JOIN excl e  ON e.category_id  = l.id
    LEFT JOIN lst  s  ON s.category_id  = l.id
   ORDER BY l.seg, l.path, l.slug;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_categories() TO service_role;

-- ---------------------------------------------------------------- k1. admin_commit_category_import (whole; base 20260917210006_86c1bbd7:624-918, only the ordering pass changed)
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

-- ---------------------------------------------------------------- k2. admin_undo_category_import (whole; base 20260917210006_86c1bbd7:926-1116, only the ordering pass changed)
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

-- ---------------------------------------------------------------- m. proofs
-- Scratch rows only, rolled back by sentinel. A global super_admin is RESOLVED
-- from this database so the doors' auth.uid() gates run for real; step-up is
-- suspended for this transaction only (rolled back with the rows).
DO $proof$
DECLARE
  v_uid uuid;
  v_a uuid := gen_random_uuid();
  v_b uuid := gen_random_uuid();
  v_l uuid := gen_random_uuid();
  v_m uuid := gen_random_uuid();
  v_n uuid := gen_random_uuid();
  v_pa uuid;
  v_pb uuid;
  v_n_pb uuid;
  v_cnt int;
  v0 text;
  v1 text;
  v2 text;
  v_tok text := replace(gen_random_uuid()::text, '-', '');
BEGIN
  SELECT ur.user_id INTO v_uid
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
   WHERE r.name = 'super_admin' AND ur.scope_type = 'global'
   ORDER BY ur.created_at
   LIMIT 1;
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'PROOF BLOCKED — this database holds no global super_admin to act as';
  END IF;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_uid::text, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, true);
  UPDATE public.permissions p SET requires_step_up = false
    FROM public.resources r
   WHERE r.id = p.resource_id AND r.name = 'categories' AND p.action IN ('update', 'restructure');

  INSERT INTO public.categories (id, slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES (v_a, 'e2e-dec080-a-' || v_tok, 'e2e dec080 A', true, false, false, 999990),
         (v_b, 'e2e-dec080-b-' || v_tok, 'e2e dec080 B', true, false, false, 999991),
         (v_l, 'e2e-dec080-l-' || v_tok, 'e2e dec080 L', true, true, false, 999992),
         (v_m, 'e2e-dec080-m-' || v_tok, 'e2e dec080 M', true, true, false, 999993),
         (v_n, 'e2e-dec080-n-' || v_tok, 'e2e dec080 N', true, true, false, 999994);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (NULL, v_a, 999990), (NULL, v_b, 999991);

  -- P1 — the flagged home survives a reorder that puts the guest first.
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_a, v_l, 5) RETURNING id INTO v_pa;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_b, v_l, 0) RETURNING id INTO v_pb;
  IF public.cat_primary_parent(v_l) IS DISTINCT FROM v_a
     OR NOT (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pa)
     OR (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pb) THEN
    RAISE EXCEPTION 'PROOF P1a failed: home % (expected A)', public.cat_primary_parent(v_l);
  END IF;
  PERFORM public.admin_reorder_categories(v_b, ARRAY[v_l]);
  IF public.cat_primary_parent(v_l) IS DISTINCT FROM v_a THEN
    RAISE EXCEPTION 'PROOF P1b failed: a reorder of B moved the home to %', public.cat_primary_parent(v_l);
  END IF;
  RAISE NOTICE 'PROOF P1 ok — the flagged home A survives a reorder that ranks the guest first';

  -- P2 — moving the home onto a parent that already holds the guest merges.
  PERFORM public.admin_move_category_pointer(v_pa, v_b);
  SELECT count(*) INTO v_cnt FROM public.category_tree_pointers WHERE child_id = v_l;
  IF v_cnt <> 1
     OR NOT (SELECT is_primary FROM public.category_tree_pointers WHERE child_id = v_l)
     OR public.cat_primary_parent(v_l) IS DISTINCT FROM v_b THEN
    RAISE EXCEPTION 'PROOF P2 failed: % pointers, home %', v_cnt, public.cat_primary_parent(v_l);
  END IF;
  RAISE NOTICE 'PROOF P2 ok — home moved A→B onto the guest: one pointer left, flagged, home B';

  -- P3 — deleting a home promotes the remaining pointer.
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_a, v_m, 1) RETURNING id INTO v_pa;
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_b, v_m, 1) RETURNING id INTO v_pb;
  DELETE FROM public.category_tree_pointers WHERE id = v_pa;
  IF NOT (SELECT is_primary FROM public.category_tree_pointers WHERE id = v_pb)
     OR public.cat_primary_parent(v_m) IS DISTINCT FROM v_b THEN
    RAISE EXCEPTION 'PROOF P3 failed: home % after deleting A', public.cat_primary_parent(v_m);
  END IF;
  RAISE NOTICE 'PROOF P3 ok — deleting the home pointer promoted B';

  -- P4 — the version moves on pointer order and on the home flag.
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_a, v_n, 1);
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_b, v_n, 2) RETURNING id INTO v_n_pb;
  v0 := public.get_category_tree_version();
  UPDATE public.category_tree_pointers SET display_order = 7 WHERE id = v_n_pb;
  v1 := public.get_category_tree_version();
  PERFORM public.admin_set_primary_pointer(v_n_pb);
  v2 := public.get_category_tree_version();
  IF v0 = v1 OR v1 = v2 OR public.cat_primary_parent(v_n) IS DISTINCT FROM v_b THEN
    RAISE EXCEPTION 'PROOF P4 failed: % / % / % home %', v0, v1, v2, public.cat_primary_parent(v_n);
  END IF;
  RAISE NOTICE 'PROOF P4 ok — the version moved on an order change and on a home change';

  RAISE EXCEPTION USING ERRCODE = 'P0001', MESSAGE = 'DEC080_PROOF_ROLLBACK';
EXCEPTION
  WHEN SQLSTATE 'P0001' THEN
    IF SQLERRM <> 'DEC080_PROOF_ROLLBACK' THEN RAISE; END IF;
END $proof$;

-- P5 / P6 — reads on the real table (nothing is written).
DO $readback$
DECLARE
  v_bad int;
  v_pair text[];
  v_child uuid;
  v_home uuid;
  v_fn text;
  v_acl text;
BEGIN
  SELECT count(*) INTO v_bad FROM (
    SELECT p.child_id FROM public.category_tree_pointers p
     GROUP BY p.child_id HAVING count(*) FILTER (WHERE p.is_primary) <> 1) x;
  IF v_bad <> 0 THEN RAISE EXCEPTION 'PROOF P5 failed: % children without exactly one home', v_bad; END IF;
  RAISE NOTICE 'PROOF P5 ok — every child with a pointer has exactly one home';

  FOREACH v_pair SLICE 1 IN ARRAY ARRAY[
    ARRAY['bicycles', 'vehicles'],
    ARRAY['personal-care-services', 'services'],
    ARRAY['industrial-equipment', 'commercial-equipment'],
    ARRAY['nursery-furniture', 'babies-kids']]
  LOOP
    SELECT c.id INTO v_child FROM public.categories c WHERE c.slug = v_pair[1];
    SELECT c.id INTO v_home FROM public.categories c WHERE c.slug = v_pair[2];
    IF v_child IS NULL OR v_home IS NULL OR NOT EXISTS (
         SELECT 1 FROM public.category_tree_pointers p
          WHERE p.child_id = v_child AND p.parent_id = v_home) THEN
      RAISE NOTICE 'PROOF P6 skipped: % → % absent here', v_pair[1], v_pair[2];
      CONTINUE;
    END IF;
    IF public.cat_primary_parent(v_child) IS DISTINCT FROM v_home THEN
      RAISE EXCEPTION 'PROOF P6 failed: % home is not %', v_pair[1], v_pair[2];
    END IF;
    RAISE NOTICE 'PROOF P6 ok — % home is %', v_pair[1], v_pair[2];
  END LOOP;

  FOREACH v_fn IN ARRAY ARRAY[
    'public.admin_move_category_pointer(uuid, uuid)',
    'public.admin_set_primary_pointer(uuid)',
    'public.admin_remove_category_pointer(uuid)',
    'public.admin_list_categories()',
    'public.admin_commit_category_import(jsonb, text, text)',
    'public.admin_undo_category_import(uuid)']
  LOOP
    SELECT array_to_string(coalesce(proacl, acldefault('f', proowner)), ',') INTO v_acl
      FROM pg_proc WHERE oid = v_fn::regprocedure;
    IF v_acl LIKE '%anon=%' OR v_acl ~ '(^|,)=X' OR v_acl NOT LIKE '%authenticated=X%' THEN
      RAISE EXCEPTION 'READ-BACK failed: % acl=%', v_fn, v_acl;
    END IF;
    RAISE NOTICE 'READ-BACK % acl=%', v_fn, v_acl;
  END LOOP;
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.admin_commit_category_import(jsonb, text, text)'::regprocedure
                    AND prosrc LIKE '%IS NOT DISTINCT FROM p.parent_id%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.admin_undo_category_import(uuid)'::regprocedure
                    AND prosrc LIKE '%IS NOT DISTINCT FROM p.parent_id%')
     OR NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.cat_primary_parent(uuid)'::regprocedure
                    AND prosrc LIKE '%(NOT p.is_primary)%') THEN
    RAISE EXCEPTION 'READ-BACK failed: a re-declared body lacks its DEC-080 change';
  END IF;
END $readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260928010000') ON CONFLICT DO NOTHING;