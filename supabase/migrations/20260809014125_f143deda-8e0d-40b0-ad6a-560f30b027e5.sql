-- Phase R2 — additive admin policies via has_permission(). No existing policy altered.

CREATE POLICY categories_admin_all ON public.categories
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(),'categories','manage'))
  WITH CHECK (public.has_permission(auth.uid(),'categories','manage'));

CREATE POLICY category_attributes_admin_all ON public.category_attributes
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(),'categories','manage'))
  WITH CHECK (public.has_permission(auth.uid(),'categories','manage'));

CREATE POLICY category_tree_pointers_admin_all ON public.category_tree_pointers
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(),'categories','manage'))
  WITH CHECK (public.has_permission(auth.uid(),'categories','manage'));

CREATE POLICY locations_admin_all ON public.locations
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(),'locations','manage'))
  WITH CHECK (public.has_permission(auth.uid(),'locations','manage'));

CREATE POLICY countries_admin_all ON public.countries
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(),'countries','manage'))
  WITH CHECK (public.has_permission(auth.uid(),'countries','manage'));

CREATE POLICY listings_admin_read ON public.listings
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'listings','view'));

CREATE POLICY listings_admin_update ON public.listings
  FOR UPDATE TO authenticated
  USING (public.has_permission(auth.uid(),'listings','update'))
  WITH CHECK (public.has_permission(auth.uid(),'listings','update'));

CREATE POLICY listing_photos_admin_read ON public.listing_photos
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'listings','view'));

CREATE POLICY profiles_admin_read ON public.profiles
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(),'profiles','view'));

-- Write privileges for tables that gained an admin write policy (RLS still gates them).
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.category_attributes TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.category_tree_pointers TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.locations TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.countries TO authenticated;

-- Self-checking impersonation proofs. Nothing persists: the super-admin insert is
-- performed inside a subtransaction that is deliberately aborted.
DO $$
DECLARE
  v_base uuid := '78e789f8-4c80-4490-9d68-15d3ce95899d'; -- base 'user' role only
  v_super uuid := 'b3c1e67e-d5a4-4bc2-ac11-169ba5c011e1'; -- operator super_admin
  v_deny_err text := NULL;
  v_super_ok boolean := false;
  v_anon_count bigint;
  v_before bigint;
  v_after bigint;
BEGIN
  SELECT count(*) INTO v_before FROM public.categories;

  -- (a) base user must be denied
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_base, 'role','authenticated')::text, true);
    INSERT INTO public.categories (name_en, slug) VALUES ('probe','probe-deny-r2');
    RESET ROLE;
    RAISE EXCEPTION 'R2 PROOF FAILED: base user was allowed to insert a category';
  EXCEPTION WHEN insufficient_privilege THEN
    v_deny_err := SQLSTATE || ': ' || SQLERRM;
  END;
  RESET ROLE;

  -- (b) super admin must be allowed (aborted subtransaction => no residue)
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', v_super, 'role','authenticated')::text, true);
    INSERT INTO public.categories (name_en, slug) VALUES ('probe','probe-allow-r2');
    v_super_ok := true;
    RESET ROLE;
    RAISE EXCEPTION 'R2_ROLLBACK_SENTINEL';
  EXCEPTION
    WHEN insufficient_privilege THEN
      RESET ROLE;
      RAISE EXCEPTION 'R2 PROOF FAILED: super admin denied: %', SQLERRM;
    WHEN others THEN
      RESET ROLE;
      IF SQLERRM <> 'R2_ROLLBACK_SENTINEL' THEN
        RAISE EXCEPTION 'R2 PROOF FAILED (super admin path): %', SQLERRM;
      END IF;
  END;
  RESET ROLE;

  -- (c) anonymous public read must still work
  BEGIN
    SET LOCAL ROLE anon;
    PERFORM set_config('request.jwt.claims', json_build_object('role','anon')::text, true);
    SELECT count(*) INTO v_anon_count FROM public.categories;
    RESET ROLE;
  END;
  RESET ROLE;

  SELECT count(*) INTO v_after FROM public.categories;

  IF v_deny_err IS NULL THEN
    RAISE EXCEPTION 'R2 PROOF FAILED: no denial captured for base user';
  END IF;
  IF NOT v_super_ok THEN
    RAISE EXCEPTION 'R2 PROOF FAILED: super admin insert did not execute';
  END IF;
  IF v_after <> v_before THEN
    RAISE EXCEPTION 'R2 PROOF FAILED: residue left behind (% -> %)', v_before, v_after;
  END IF;
  IF v_anon_count IS NULL OR v_anon_count <> v_before THEN
    RAISE EXCEPTION 'R2 PROOF FAILED: anon read broke (got %, expected %)', v_anon_count, v_before;
  END IF;

  RAISE NOTICE 'R2 PROOF (a) base-user denial: %', v_deny_err;
  RAISE NOTICE 'R2 PROOF (b) super-admin insert succeeded, rolled back; categories % -> %', v_before, v_after;
  RAISE NOTICE 'R2 PROOF (c) anon SELECT count(*) = %', v_anon_count;
END $$;