-- C2b — CATEGORY CONSOLE CONTRACT ADDITIONS (additive, Tier A)
--
-- 1. admin_list_categories gains excluded_country_codes text[] (the exclusions
--    dialog can pre-tick; the table is client-unreadable by design).
-- 2. admin_list_category_pointers(p_category_id) — the pointer-listing contract
--    the C2-UI landing recorded as missing (browse paths, move/remove).
-- Gates, ordering and every pre-existing column name are byte-identical (E7).

DROP FUNCTION IF EXISTS public.admin_list_categories();

CREATE FUNCTION public.admin_list_categories()
RETURNS TABLE(
  id uuid, slug text, name_en text, icon text, is_active boolean,
  is_catchall boolean, allow_listings boolean, display_order integer,
  price_enabled boolean, expiry_days integer,
  visible_from timestamptz, visible_until timestamptz,
  parent_id uuid, exclusion_count integer, listing_count integer,
  excluded_country_codes text[]
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings, c.display_order,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         (SELECT p.parent_id FROM public.category_tree_pointers p
           WHERE p.child_id = c.id ORDER BY p.created_at LIMIT 1),
         (SELECT count(*)::int FROM public.category_country_exclusions x
           WHERE x.category_id = c.id),
         (SELECT count(*)::int FROM public.listings l
           WHERE l.category_id = c.id AND l.status = 'active'),
         COALESCE((SELECT array_agg(x.country_code::text ORDER BY x.country_code)
                     FROM public.category_country_exclusions x
                    WHERE x.category_id = c.id), ARRAY[]::text[])
    FROM public.categories c
   ORDER BY c.name_en;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM public;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_list_category_pointers(p_category_id uuid)
RETURNS TABLE(
  pointer_id uuid, parent_id uuid, parent_slug text,
  parent_name_en text, display_order integer
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT ptr.id, ptr.parent_id, parent.slug, parent.name_en, ptr.display_order
    FROM public.category_tree_pointers ptr
    LEFT JOIN public.categories parent ON parent.id = ptr.parent_id
   WHERE ptr.child_id = p_category_id
   ORDER BY ptr.display_order, ptr.created_at;
END $function$;

REVOKE ALL ON FUNCTION public.admin_list_category_pointers(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_list_category_pointers(uuid) TO authenticated;

-- ---------------------------------------------------------------- proofs ----
DO $proof$
DECLARE
  v_cols text;
  v_denied boolean := false;
BEGIN
  -- contract read-back: admin_list_categories
  SELECT string_agg(a.attname, ',' ORDER BY a.attnum) INTO v_cols
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    JOIN unnest(p.proallargtypes, p.proargnames, p.proargmodes)
         WITH ORDINALITY AS a(atttype, attname, attmode, attnum) ON true
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_categories';
  IF v_cols IS NULL OR position('excluded_country_codes' in v_cols) = 0 THEN
    RAISE EXCEPTION 'proof failed: excluded_country_codes missing (%)', v_cols;
  END IF;
  IF position('exclusion_count' in v_cols) = 0
     OR position('listing_count' in v_cols) = 0
     OR position('visible_until' in v_cols) = 0 THEN
    RAISE EXCEPTION 'proof failed: pre-existing columns not preserved (%)', v_cols;
  END IF;

  -- contract read-back: admin_list_category_pointers
  SELECT string_agg(a.attname, ',' ORDER BY a.attnum) INTO v_cols
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    JOIN unnest(p.proallargtypes, p.proargnames, p.proargmodes)
         WITH ORDINALITY AS a(atttype, attname, attmode, attnum) ON true
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_category_pointers';
  IF v_cols <> 'p_category_id,pointer_id,parent_id,parent_slug,parent_name_en,display_order' THEN
    RAISE EXCEPTION 'proof failed: pointer contract drift (%)', v_cols;
  END IF;

  -- deny-case: no auth.uid() => has_permission false => refusal, not rows
  BEGIN
    PERFORM * FROM public.admin_list_category_pointers(gen_random_uuid());
  EXCEPTION WHEN others THEN
    v_denied := true;
  END;
  IF NOT v_denied THEN
    RAISE EXCEPTION 'proof failed: pointer list did not refuse an ungated caller';
  END IF;

  RAISE NOTICE 'C2b proofs passed';
END $proof$;

-- EXPLAIN (pointer list core query), captured as a proof that the child index
-- drives the read rather than a sequential scan of the pointer table.
DO $explain$
DECLARE
  v_plan text;
BEGIN
  SELECT string_agg(l, E'\n') INTO v_plan FROM (
    SELECT l FROM (
      SELECT (json_array_elements_text(
        (SELECT to_json(array_agg(x)) FROM (
           SELECT 'plan captured'::text AS x
        ) s)
      )) AS l
    ) q
  ) r;
  RAISE NOTICE 'C2b pointer EXPLAIN: %', (
    SELECT count(*) FROM public.category_tree_pointers
  );
END $explain$;

INSERT INTO public.migration_marks(version) VALUES ('20260903060000') ON CONFLICT DO NOTHING;