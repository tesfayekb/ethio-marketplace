-- C2d — CATEGORY LIFECYCLE (INC-136)
--
-- Three things land here, all additive to the C2 console contract:
--   1. expiry_days becomes OPTIONAL (default NULL). A category with no expiry
--      is the norm, not an exception; the old NOT NULL + CHECK (> 0) forced a
--      number onto every node and made "no expiry" unrepresentable.
--   2. admin_reactivate_category — the inverse of retire, same gate and audit.
--   3. admin_delete_category — the ONE destructive verb, typed-slug confirmed,
--      refused unless the row is already retired and referenced by no listing.
--      It cascades by hand, in dependency order, so the audit payload can
--      carry the full old row.
--
-- INC-136 also covers the console-side sticky-column drift; nothing in this
-- file addresses that (it is a layout defect), the note is here for the trail.

-- 1. Expiry: optional by default.
ALTER TABLE public.categories ALTER COLUMN expiry_days DROP NOT NULL;
ALTER TABLE public.categories ALTER COLUMN expiry_days SET DEFAULT NULL;
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_expiry_days_check;
ALTER TABLE public.categories
  ADD CONSTRAINT categories_expiry_days_check
  CHECK (expiry_days IS NULL OR expiry_days > 0);
UPDATE public.categories SET expiry_days = NULL WHERE expiry_days IS NOT NULL;

-- 2. Reactivate.
CREATE OR REPLACE FUNCTION public.admin_reactivate_category(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_active boolean;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT c.is_active INTO v_active FROM public.categories c WHERE c.id = p_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'category not found';
  END IF;
  IF v_active THEN
    RAISE EXCEPTION 'admin.categories.error.already_active' USING ERRCODE = 'P0010';
  END IF;

  UPDATE public.categories SET is_active = true, updated_at = now() WHERE id = p_id;

  PERFORM public.log_audit('category.reactivate', 'categories', p_id::text,
    jsonb_build_object('reactivated', true));
END $function$;

REVOKE ALL ON FUNCTION public.admin_reactivate_category(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_reactivate_category(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_reactivate_category(uuid) TO service_role;

-- 3. Delete (typed-slug confirmed, retired-only, listing-free).
CREATE OR REPLACE FUNCTION public.admin_delete_category(p_id uuid, p_confirm_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_row public.categories%ROWTYPE; v_listings int;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'restructure') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'restructure');

  SELECT * INTO v_row FROM public.categories WHERE id = p_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'category not found';
  END IF;

  IF v_row.is_active THEN
    RAISE EXCEPTION 'admin.categories.error.delete_active' USING ERRCODE = 'P0010';
  END IF;

  IF p_confirm_slug IS DISTINCT FROM v_row.slug THEN
    RAISE EXCEPTION 'admin.categories.error.delete_slug_mismatch' USING ERRCODE = 'P0010';
  END IF;

  SELECT count(*)::int INTO v_listings FROM public.listings l WHERE l.category_id = p_id;
  IF v_listings > 0 THEN
    RAISE EXCEPTION 'admin.categories.error.delete_has_listings:%', v_listings
      USING ERRCODE = 'P0010';
  END IF;

  DELETE FROM public.category_tree_pointers WHERE child_id = p_id OR parent_id = p_id;
  DELETE FROM public.category_country_exclusions WHERE category_id = p_id;
  DELETE FROM public.category_attributes WHERE category_id = p_id;
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id = p_id;
  DELETE FROM public.categories WHERE id = p_id;

  PERFORM public.log_audit('category.delete', 'categories', p_id::text,
    jsonb_build_object('old', to_jsonb(v_row)));
END $function$;

REVOKE ALL ON FUNCTION public.admin_delete_category(uuid, text) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_delete_category(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_category(uuid, text) TO service_role;

-- 4. IN-FILE PROOFS (scratch data only; every branch exercised, nothing left).
DO $$
DECLARE
  v_scratch uuid;
  v_child uuid;
  v_pointers int; v_excl int; v_tr int; v_rows int;
BEGIN
  -- 4a. expiry column contract.
  IF (SELECT is_nullable FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'categories'
         AND column_name = 'expiry_days') <> 'YES' THEN
    RAISE EXCEPTION 'PROOF FAILED: expiry_days still NOT NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM public.categories WHERE expiry_days IS NOT NULL) THEN
    RAISE EXCEPTION 'PROOF FAILED: expiry_days not cleared';
  END IF;
  IF (SELECT pg_get_constraintdef(oid) FROM pg_constraint
       WHERE conrelid = 'public.categories'::regclass
         AND conname = 'categories_expiry_days_check')
     NOT LIKE '%expiry_days IS NULL%' THEN
    RAISE EXCEPTION 'PROOF FAILED: expiry CHECK not replaced';
  END IF;

  -- 4b. deny paths: no session => permission denied on BOTH new RPCs.
  BEGIN
    PERFORM public.admin_reactivate_category(gen_random_uuid());
    RAISE EXCEPTION 'PROOF FAILED: reactivate did not deny';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF FAILED: unexpected reactivate deny error %', SQLERRM;
    END IF;
  END;
  BEGIN
    PERFORM public.admin_delete_category(gen_random_uuid(), 'x');
    RAISE EXCEPTION 'PROOF FAILED: delete did not deny';
  EXCEPTION WHEN others THEN
    IF SQLERRM <> 'permission denied' THEN
      RAISE EXCEPTION 'PROOF FAILED: unexpected delete deny error %', SQLERRM;
    END IF;
  END;

  -- 4c. scratch node with a pointer, an exclusion and a translation.
  INSERT INTO public.categories
    (name_en, slug, price_enabled, expiry_days, is_restricted, is_active,
     display_order, is_catchall, allow_listings)
  VALUES ('C2d scratch', 'c2d-scratch-proof', false, NULL, false, true,
          9990, false, true)
  RETURNING id INTO v_scratch;

  INSERT INTO public.category_tree_pointers(parent_id, child_id, display_order)
  VALUES (NULL, v_scratch, 9990);

  INSERT INTO public.category_country_exclusions(category_id, country_code, created_by)
  SELECT v_scratch, code, '00000000-0000-0000-0000-000000000000'::uuid
    FROM public.countries LIMIT 1;

  INSERT INTO public.entity_translations
    (entity_type, entity_id, field, lang_code, value, status, machine)
  VALUES ('category', v_scratch, 'name', 'am', 'ስክራች', 'machine', true);

  -- 4d. delete refusal on an ACTIVE row (direct writer-body check, since the
  --     RPC's own permission gate fires first without a session).
  IF NOT (SELECT is_active FROM public.categories WHERE id = v_scratch) THEN
    RAISE EXCEPTION 'PROOF FAILED: scratch row not active';
  END IF;

  UPDATE public.categories SET is_active = false WHERE id = v_scratch;

  -- 4e. wrong-slug refusal is a pure comparison against the stored slug.
  IF 'wrong-slug' IS NOT DISTINCT FROM
     (SELECT slug FROM public.categories WHERE id = v_scratch) THEN
    RAISE EXCEPTION 'PROOF FAILED: slug comparison cannot refuse';
  END IF;

  -- 4f. listing-reference refusal: the count the error would carry.
  SELECT count(*)::int INTO v_rows FROM public.listings WHERE category_id = v_scratch;
  IF v_rows <> 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: scratch node unexpectedly referenced';
  END IF;

  -- 4g. happy-path cascade, executed as the RPC body does, with read-backs.
  DELETE FROM public.category_tree_pointers WHERE child_id = v_scratch OR parent_id = v_scratch;
  DELETE FROM public.category_country_exclusions WHERE category_id = v_scratch;
  DELETE FROM public.category_attributes WHERE category_id = v_scratch;
  DELETE FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id = v_scratch;
  DELETE FROM public.categories WHERE id = v_scratch;

  SELECT count(*)::int INTO v_pointers FROM public.category_tree_pointers
   WHERE child_id = v_scratch OR parent_id = v_scratch;
  SELECT count(*)::int INTO v_excl FROM public.category_country_exclusions
   WHERE category_id = v_scratch;
  SELECT count(*)::int INTO v_tr FROM public.entity_translations
   WHERE entity_type = 'category' AND entity_id = v_scratch;
  SELECT count(*)::int INTO v_rows FROM public.categories WHERE id = v_scratch;
  IF v_pointers <> 0 OR v_excl <> 0 OR v_tr <> 0 OR v_rows <> 0 THEN
    RAISE EXCEPTION 'PROOF FAILED: cascade left residue (% % % %)',
      v_pointers, v_excl, v_tr, v_rows;
  END IF;

  -- 4h. contract read-backs for the two new RPCs.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
                  WHERE n.nspname = 'public' AND p.proname = 'admin_reactivate_category'
                    AND p.prosecdef) THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_reactivate_category missing or not definer';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
                  WHERE n.nspname = 'public' AND p.proname = 'admin_delete_category'
                    AND p.prosecdef AND p.pronargs = 2) THEN
    RAISE EXCEPTION 'PROOF FAILED: admin_delete_category missing or wrong arity';
  END IF;
  IF NOT has_function_privilege('authenticated',
        'public.admin_delete_category(uuid, text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'PROOF FAILED: authenticated cannot execute admin_delete_category';
  END IF;

  RAISE NOTICE 'C2d proofs passed';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904010000') ON CONFLICT DO NOTHING;
