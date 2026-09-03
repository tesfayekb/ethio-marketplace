-- C2c — server-derived slugs + has_image on the admin roster (additive).
-- Laws: E7 (client reads only via gated definer RPCs), F3 (server is the only
-- authority), F4 (no phantom success: a slug conflict raises a translated-key
-- error), E2 (append-only).

-- 1. SLUG DERIVATION HELPER ------------------------------------------------
-- Pure-ish (STABLE: reads public.categories to uniquify). Kept separate from
-- the RPC so the in-file proof can exercise it without a session.
CREATE OR REPLACE FUNCTION public.category_slug_candidate(p_name text)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_base text;
  v_try  text;
  v_n    int := 1;
BEGIN
  v_base := lower(coalesce(p_name, ''));
  v_base := regexp_replace(v_base, '[^a-z0-9]+', '-', 'g');
  v_base := trim(both '-' from v_base);
  IF v_base = '' THEN
    v_base := 'category';
  END IF;

  v_try := v_base;
  WHILE EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_try) LOOP
    v_n := v_n + 1;
    v_try := v_base || '-' || v_n::text;
  END LOOP;
  RETURN v_try;
END $$;

REVOKE ALL ON FUNCTION public.category_slug_candidate(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.category_slug_candidate(text) TO authenticated;

-- 2. admin_create_category — p_slug becomes optional ------------------------
-- CREATE OR REPLACE keeps the argument names/types (and therefore the ACL and
-- every existing by-name call); only defaults and the body change.
CREATE OR REPLACE FUNCTION public.admin_create_category(
  p_name_en text,
  p_slug text DEFAULT NULL,
  p_icon text DEFAULT NULL,
  p_parent_id uuid DEFAULT NULL,
  p_allow_listings boolean DEFAULT true
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id uuid;
  v_slug text;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'create') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'create');

  IF p_slug IS NULL OR btrim(p_slug) = '' THEN
    v_slug := public.category_slug_candidate(p_name_en);
  ELSE
    v_slug := lower(btrim(p_slug));
    IF EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_slug) THEN
      -- F4: a conflict is a named failure the console translates, never a
      -- silent rename of what the operator typed.
      RAISE EXCEPTION 'admin.categories.error.slugTaken';
    END IF;
  END IF;

  INSERT INTO public.categories (name_en, slug, icon, allow_listings)
  VALUES (p_name_en, v_slug, p_icon, COALESCE(p_allow_listings, true))
  RETURNING id INTO v_id;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, v_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0));

  PERFORM public.log_audit('category.create', 'categories', v_id::text,
    jsonb_build_object('name_en', p_name_en, 'slug', v_slug,
                       'parent_id', p_parent_id, 'allow_listings', p_allow_listings));
  RETURN v_id;
END $$;

-- 3. admin_list_categories gains has_image ----------------------------------
-- A RETURNS TABLE change needs a drop/recreate (the C2b pattern); the gate,
-- ordering, every pre-existing column name/type and the ACL are preserved.
DROP FUNCTION IF EXISTS public.admin_list_categories();

CREATE FUNCTION public.admin_list_categories()
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
         (SELECT p.parent_id FROM public.category_tree_pointers p
           WHERE p.child_id = c.id ORDER BY p.created_at LIMIT 1),
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

REVOKE ALL ON FUNCTION public.admin_list_categories() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_list_categories() TO authenticated;

-- 4. PROOFS -----------------------------------------------------------------
DO $$
DECLARE
  v_a text;
  v_b text;
  v_c text;
  v_id1 uuid;
  v_id2 uuid;
BEGIN
  -- 4a. derivation: punctuation and case collapse to a clean slug.
  v_a := public.category_slug_candidate('  Proof C2c — Widgets & Gadgets!  ');
  IF v_a <> 'proof-c2c-widgets-gadgets' THEN
    RAISE EXCEPTION 'PROOF FAILED: derivation produced %', v_a;
  END IF;

  -- 4b. collision suffixing against real rows (scratch, removed below).
  INSERT INTO public.categories (name_en, slug) VALUES ('Proof C2c Row', v_a)
    RETURNING id INTO v_id1;
  v_b := public.category_slug_candidate('Proof C2c — Widgets & Gadgets!');
  IF v_b <> 'proof-c2c-widgets-gadgets-2' THEN
    RAISE EXCEPTION 'PROOF FAILED: first collision produced %', v_b;
  END IF;

  INSERT INTO public.categories (name_en, slug) VALUES ('Proof C2c Row 2', v_b)
    RETURNING id INTO v_id2;
  v_c := public.category_slug_candidate('Proof C2c — Widgets & Gadgets!');
  IF v_c <> 'proof-c2c-widgets-gadgets-3' THEN
    RAISE EXCEPTION 'PROOF FAILED: second collision produced %', v_c;
  END IF;

  DELETE FROM public.categories WHERE id IN (v_id1, v_id2);

  -- 4c. empty name still yields a usable slug.
  IF public.category_slug_candidate('   ') NOT LIKE 'category%' THEN
    RAISE EXCEPTION 'PROOF FAILED: empty name derivation';
  END IF;

  -- 4d. contract read-back: admin_list_categories exposes has_image last.
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.parameters
     WHERE specific_schema = 'public'
       AND parameter_name = 'has_image'
       AND specific_name IN (
         SELECT p.proname || '_' || p.oid FROM pg_proc p
           JOIN pg_namespace n ON n.oid = p.pronamespace
          WHERE n.nspname = 'public' AND p.proname = 'admin_list_categories')
  ) THEN
    RAISE EXCEPTION 'PROOF FAILED: has_image missing from admin_list_categories';
  END IF;

  -- 4e. contract read-back: p_slug is now optional on admin_create_category.
  IF (SELECT pronargdefaults FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_create_category') <> 4 THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_create_category defaults not applied';
  END IF;

  -- 4f. deny path unchanged: no session => permission denied.
  BEGIN
    PERFORM * FROM public.admin_list_categories();
    RAISE EXCEPTION 'PROOF FAILED: admin_list_categories did not deny';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF FAILED: unexpected deny error %', SQLERRM;
    END IF;
  END;

  RAISE NOTICE 'C2c proofs passed';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260903999000') ON CONFLICT DO NOTHING;