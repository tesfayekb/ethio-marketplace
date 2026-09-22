-- INC-263 — THE CATEGORY TREE GAINS A VERSION.
--
-- The posting wizard's tree (categories + category_tree_pointers) was the only
-- public reference read with NO version stamp: the browser held the first answer
-- for the whole visit and an edge/browser cache could hold it longer, so a
-- curator's categories import was invisible for hours (baby-food absent,
-- food-beverages still under its old parent).
--
-- This is the same shape as get_location_tree_version and
-- get_attribute_options_version (INC-243): one md5 over the facts that change
-- when the tree changes, so the public route can answer a conditional request
-- with a 304 and refresh within its own window when it moved.
--
-- No table, no policy, no data change. Read-only, SECURITY DEFINER because the
-- public route calls it with the publishable (anon) key and carries no authority
-- (DEC-013 §10, F3).

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
  );
$function$;

REVOKE ALL ON FUNCTION public.get_category_tree_version() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_category_tree_version() TO anon;
GRANT EXECUTE ON FUNCTION public.get_category_tree_version() TO authenticated;
GRANT ALL ON FUNCTION public.get_category_tree_version() TO service_role;

-- ---------------------------------------------------------------------------
-- PROOFS — SCRATCH ROWS ONLY (INC-222/INC-255): the proof builds the rows it
-- needs, asserts, and deletes them. It never anchors on a live catalog row, so
-- this file applies to every database.
-- ---------------------------------------------------------------------------
DO $proof$
DECLARE
  v0 text;
  v1 text;
  v2 text;
  v3 text;
  v_parent uuid;
  v_child uuid;
BEGIN
  v0 := public.get_category_tree_version();
  IF v0 IS NULL OR length(v0) <> 32 THEN
    RAISE EXCEPTION 'PROOF 1: the version is not one md5 stamp (got %)', coalesce(v0, 'null');
  END IF;

  -- P2 — A NEW CATEGORY MOVES THE VERSION (the baby-food case).
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES ('e2e-inc263-parent', 'e2e-inc263 parent', true, false, false, 9900)
  RETURNING id INTO v_parent;
  INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
  VALUES ('e2e-inc263-child', 'e2e-inc263 child', true, true, false, 9901)
  RETURNING id INTO v_child;
  v1 := public.get_category_tree_version();
  IF v1 = v0 THEN
    RAISE EXCEPTION 'PROOF 2: a new category did not move the version';
  END IF;

  -- P3 — A SURFACING POINTER MOVES THE VERSION TOO (INC-246: a secondary parent
  -- is a pointer row, and nothing else about the category changes).
  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (v_parent, v_child, 1);
  v2 := public.get_category_tree_version();
  IF v2 = v1 THEN
    RAISE EXCEPTION 'PROOF 3: a new tree pointer did not move the version';
  END IF;

  -- P4 — REMOVING THE SCRATCH ROWS RESTORES THE ORIGINAL STAMP: the stamp is a
  -- function of the tree alone, with no drift of its own.
  DELETE FROM public.category_tree_pointers
   WHERE child_id IN (v_parent, v_child) OR parent_id IN (v_parent, v_child);
  DELETE FROM public.categories WHERE id IN (v_parent, v_child);
  v3 := public.get_category_tree_version();
  IF v3 <> v0 THEN
    RAISE EXCEPTION 'PROOF 4: the version did not return to its starting value';
  END IF;

  -- P5 — CLEANUP IS TOTAL.
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-inc263-%') THEN
    RAISE EXCEPTION 'PROOF 5: scratch categories survived the proof';
  END IF;

  RAISE NOTICE 'INC-263 proofs passed (version %, moved on a category and on a pointer)', v0;
END
$proof$;

-- READ-BACK: the definition and its ACL, in-file.
DO $readback$
DECLARE
  def text;
  acl text;
BEGIN
  SELECT pg_get_functiondef(p.oid), coalesce(p.proacl::text, 'default')
    INTO def, acl
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'get_category_tree_version';
  IF def IS NULL THEN
    RAISE EXCEPTION 'READ-BACK: get_category_tree_version is absent';
  END IF;
  IF def NOT LIKE '%category_tree_pointers%' OR def NOT LIKE '%SECURITY DEFINER%' THEN
    RAISE EXCEPTION 'READ-BACK: the landed body is not the declared one: %', def;
  END IF;
  IF acl NOT LIKE '%anon=X%' OR acl NOT LIKE '%authenticated=X%' OR acl NOT LIKE '%service_role=%' THEN
    RAISE EXCEPTION 'READ-BACK: the ACL is not the declared one: %', acl;
  END IF;
  RAISE NOTICE 'READ-BACK ok — ACL %', acl;
END
$readback$;

INSERT INTO public.migration_marks (version) VALUES ('20260922110000')
ON CONFLICT DO NOTHING;
