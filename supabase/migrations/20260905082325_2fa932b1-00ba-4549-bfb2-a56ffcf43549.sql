-- C5k PART A — INLINE CREATE: admin_create_category gains four optional fields.
--
-- The nine-argument form REPLACES the five-argument form. A plain
-- CREATE OR REPLACE cannot add parameters: it would create a second overload
-- and every existing named-argument call (p_name_en/p_icon/p_parent_id/
-- p_allow_listings) would become ambiguous. The old signature is therefore
-- dropped in the same statement block and the extended one created with the
-- SAME body — slug derivation, catch-all parent refusal, pointer/edge
-- creation, audit line and ACL are byte-for-byte the prior behaviour when the
-- four new parameters are left at their defaults.

DROP FUNCTION IF EXISTS public.admin_create_category(text, text, text, uuid, boolean);

CREATE FUNCTION public.admin_create_category(
  p_name_en text,
  p_slug text DEFAULT NULL,
  p_icon text DEFAULT NULL,
  p_parent_id uuid DEFAULT NULL,
  p_allow_listings boolean DEFAULT true,
  p_price_enabled boolean DEFAULT true,
  p_expiry_days integer DEFAULT NULL,
  p_visible_from timestamptz DEFAULT NULL,
  p_visible_until timestamptz DEFAULT NULL
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

  PERFORM public.assert_parent_not_catchall(p_parent_id);

  IF p_slug IS NULL OR btrim(p_slug) = '' THEN
    v_slug := public.category_slug_candidate(p_name_en);
  ELSE
    v_slug := lower(btrim(p_slug));
    IF EXISTS (SELECT 1 FROM public.categories c WHERE c.slug = v_slug) THEN
      RAISE EXCEPTION 'admin.categories.error.slugTaken';
    END IF;
  END IF;

  INSERT INTO public.categories (name_en, slug, icon, allow_listings,
                                 price_enabled, expiry_days,
                                 visible_from, visible_until)
  VALUES (p_name_en, v_slug, p_icon, COALESCE(p_allow_listings, true),
          COALESCE(p_price_enabled, true), p_expiry_days,
          p_visible_from, p_visible_until)
  RETURNING id INTO v_id;

  INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
  VALUES (p_parent_id, v_id,
          COALESCE((SELECT max(display_order) + 1 FROM public.category_tree_pointers p
                     WHERE p.parent_id IS NOT DISTINCT FROM p_parent_id), 0));

  PERFORM public.log_audit('category.create', 'categories', v_id::text,
    jsonb_build_object('name_en', p_name_en, 'slug', v_slug,
                       'parent_id', p_parent_id, 'allow_listings', p_allow_listings,
                       'price_enabled', p_price_enabled, 'expiry_days', p_expiry_days,
                       'visible_from', p_visible_from, 'visible_until', p_visible_until));
  RETURN v_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz) TO service_role;

-- ---------- PROOFS (fail loudly) --------------------------------------------
DO $$
DECLARE
  v_user uuid;
  v_defaults uuid;
  v_full uuid;
  v_row public.categories%ROWTYPE;
  v_edges integer;
  v_from timestamptz := timestamptz '2099-01-02 03:04:00+00';
  v_until timestamptz := timestamptz '2099-02-03 04:05:00+00';
BEGIN
  -- P0: exactly ONE admin_create_category exists, with the nine-argument shape.
  IF (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_create_category') <> 1 THEN
    RAISE EXCEPTION 'P0 FAILED: admin_create_category is not a single overload';
  END IF;
  IF (SELECT pg_get_function_identity_arguments(p.oid) FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'admin_create_category')
     <> 'p_name_en text, p_slug text, p_icon text, p_parent_id uuid, p_allow_listings boolean, p_price_enabled boolean, p_expiry_days integer, p_visible_from timestamp with time zone, p_visible_until timestamp with time zone' THEN
    RAISE EXCEPTION 'P0 FAILED: unexpected signature (%)',
      (SELECT pg_get_function_identity_arguments(p.oid) FROM pg_proc p
         JOIN pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname = 'public' AND p.proname = 'admin_create_category');
  END IF;
  RAISE NOTICE 'P0 PASS: single nine-argument overload';

  -- P1: ACL is exactly {authenticated, service_role} EXECUTE.
  IF NOT has_function_privilege('authenticated',
        'public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz)', 'EXECUTE')
     OR NOT has_function_privilege('service_role',
        'public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz)', 'EXECUTE')
     OR has_function_privilege('anon',
        'public.admin_create_category(text, text, text, uuid, boolean, boolean, integer, timestamptz, timestamptz)', 'EXECUTE') THEN
    RAISE EXCEPTION 'P1 FAILED: ACL is not {authenticated, service_role}';
  END IF;
  RAISE NOTICE 'P1 PASS: ACL intact';

  SELECT ur.user_id INTO v_user
    FROM public.user_roles ur
   WHERE public.has_permission(ur.user_id, 'categories', 'create')
   LIMIT 1;
  IF v_user IS NULL THEN
    RAISE NOTICE 'P2/P3 SKIPPED: no user holds categories:create';
    RETURN;
  END IF;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_user::text, 'role', 'authenticated')::text, true);

  -- P2: defaults-only call behaves exactly as before the change.
  v_defaults := public.admin_create_category('C5k Proof Defaults');
  SELECT * INTO v_row FROM public.categories WHERE id = v_defaults;
  IF v_row.slug IS NULL OR v_row.allow_listings IS DISTINCT FROM true
     OR v_row.price_enabled IS DISTINCT FROM true
     OR v_row.expiry_days IS NOT NULL
     OR v_row.visible_from IS NOT NULL OR v_row.visible_until IS NOT NULL THEN
    RAISE EXCEPTION 'P2 FAILED: defaults-only row drifted (slug=% allow=% price=% expiry=% from=% until=%)',
      v_row.slug, v_row.allow_listings, v_row.price_enabled, v_row.expiry_days,
      v_row.visible_from, v_row.visible_until;
  END IF;
  SELECT count(*) INTO v_edges FROM public.category_tree_pointers WHERE child_id = v_defaults;
  IF v_edges <> 1 THEN RAISE EXCEPTION 'P2 FAILED: expected one edge, got %', v_edges; END IF;
  RAISE NOTICE 'P2 PASS: defaults-only create unchanged (slug=%)', v_row.slug;

  -- P3: full-params call persists every new field.
  v_full := public.admin_create_category('C5k Proof Full', NULL, 'Package', NULL,
                                         true, false, 45, v_from, v_until);
  SELECT * INTO v_row FROM public.categories WHERE id = v_full;
  IF v_row.price_enabled IS DISTINCT FROM false
     OR v_row.expiry_days IS DISTINCT FROM 45
     OR v_row.visible_from IS DISTINCT FROM v_from
     OR v_row.visible_until IS DISTINCT FROM v_until THEN
    RAISE EXCEPTION 'P3 FAILED: read-back (price=% expiry=% from=% until=%)',
      v_row.price_enabled, v_row.expiry_days, v_row.visible_from, v_row.visible_until;
  END IF;
  RAISE NOTICE 'P3 PASS: price_enabled=false expiry_days=45 window persisted';

  -- Cleanup: the proofs leave nothing behind.
  DELETE FROM public.category_tree_pointers WHERE child_id IN (v_defaults, v_full);
  DELETE FROM public.categories WHERE id IN (v_defaults, v_full);
  -- The audit_log is append-only by law: the two proof lines stay, correctly.
  IF EXISTS (SELECT 1 FROM public.categories WHERE id IN (v_defaults, v_full)) THEN
    RAISE EXCEPTION 'CLEANUP FAILED: proof rows remain';
  END IF;
  RAISE NOTICE 'CLEANUP OK: proof rows removed';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260905090000') ON CONFLICT DO NOTHING;