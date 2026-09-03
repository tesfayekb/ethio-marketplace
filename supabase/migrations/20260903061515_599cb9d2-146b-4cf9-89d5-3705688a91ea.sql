-- C2f (INC-138) — THE ROSTER'S PARENT MUST BE A LIVE PATH.
-- 1. Retired parents can no longer own a browse edge (the pointer is deleted).
-- 2. admin_list_categories resolves parent deterministically: a NULL-parent
--    (root) pointer wins; otherwise the lowest display_order pointer whose
--    parent is ACTIVE. Contract, ordering and ACL are otherwise identical.

DO $$
DECLARE v_deleted bigint;
BEGIN
  WITH gone AS (
    DELETE FROM public.category_tree_pointers p
     USING public.categories c
     WHERE p.parent_id = c.id AND c.is_active = false
    RETURNING p.id
  )
  SELECT count(*) INTO v_deleted FROM gone;
  RAISE NOTICE 'C2f: deleted % pointer(s) whose parent was retired', v_deleted;
END $$;

CREATE OR REPLACE FUNCTION public.admin_list_categories()
RETURNS TABLE(
  id uuid,
  slug text,
  name_en text,
  icon text,
  is_active boolean,
  is_catchall boolean,
  allow_listings boolean,
  display_order integer,
  price_enabled boolean,
  expiry_days integer,
  visible_from timestamp with time zone,
  visible_until timestamp with time zone,
  parent_id uuid,
  exclusion_count integer,
  listing_count integer,
  excluded_country_codes text[],
  has_image boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
         c.is_catchall, c.allow_listings, c.display_order,
         c.price_enabled, c.expiry_days,
         c.visible_from, c.visible_until,
         (SELECT p.parent_id
            FROM public.category_tree_pointers p
            LEFT JOIN public.categories pc ON pc.id = p.parent_id
           WHERE p.child_id = c.id
             AND (p.parent_id IS NULL OR pc.is_active)
           ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
           LIMIT 1),
         (SELECT count(*)::int FROM public.category_country_exclusions x
           WHERE x.category_id = c.id),
         (SELECT count(*)::int FROM public.listings l
           WHERE l.category_id = c.id AND l.status = 'active'),
         COALESCE((SELECT array_agg(x.country_code::text ORDER BY x.country_code)
                     FROM public.category_country_exclusions x
                    WHERE x.category_id = c.id), ARRAY[]::text[]),
         (c.image_url IS NOT NULL)
    FROM public.categories c
   ORDER BY c.name_en;
END $$;

-- Definer law: the ACL is restated in the file that (re)defines the function.
REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO service_role;

-- PROOFS ---------------------------------------------------------------------
DO $$
DECLARE
  v_bad bigint;
  v_parent uuid;
  v_cols int;
BEGIN
  -- (a) zero inactive-parent edges remain.
  SELECT count(*) INTO v_bad
    FROM public.category_tree_pointers p
    JOIN public.categories c ON c.id = p.parent_id
   WHERE c.is_active = false;
  IF v_bad <> 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: % pointer(s) still hang off a retired parent', v_bad;
  END IF;

  -- (b) a root category resolves to parent NULL (Vehicles when present).
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug = 'vehicles') THEN
    SELECT (SELECT p.parent_id
              FROM public.category_tree_pointers p
              LEFT JOIN public.categories pc ON pc.id = p.parent_id
             WHERE p.child_id = c.id
               AND (p.parent_id IS NULL OR pc.is_active)
             ORDER BY (p.parent_id IS NOT NULL), p.display_order, p.created_at
             LIMIT 1)
      INTO v_parent
      FROM public.categories c WHERE c.slug = 'vehicles';
    IF v_parent IS NOT NULL THEN
      RAISE EXCEPTION 'PROOF FAILED: vehicles resolved to parent %', v_parent;
    END IF;
  END IF;

  -- (c) contract read-back: 17 out parameters, has_image still last.
  SELECT cardinality(proallargtypes) INTO v_cols
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_categories';
  IF v_cols <> 17 THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_list_categories returns % columns', v_cols;
  END IF;
  IF (SELECT proargnames[array_length(proargnames, 1)]
        FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_list_categories') <> 'has_image' THEN
    RAISE EXCEPTION 'PROOF FAILED: has_image is no longer the trailing column';
  END IF;

  -- (d) deny path unchanged: no session => permission denied.
  BEGIN
    PERFORM * FROM public.admin_list_categories();
    RAISE EXCEPTION 'PROOF FAILED: admin_list_categories did not deny';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF FAILED: unexpected deny error %', SQLERRM;
    END IF;
  END;

  RAISE NOTICE 'C2f proofs passed';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904030000') ON CONFLICT DO NOTHING;