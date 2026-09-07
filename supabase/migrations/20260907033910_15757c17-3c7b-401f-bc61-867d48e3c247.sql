-- C3-UX-1c — USED-BY CHIPS + REMOVE FROM CATEGORY.
-- Additive read door only: admin_list_attributes returns a bare usage COUNT, so
-- the library cannot name the categories a definition is used by, nor address
-- the link row a "remove from category" verb must delete. One SECURITY DEFINER
-- lookup supplies both, gated exactly like the roster read (categories:view).
-- No table, column, policy or grant is touched.

CREATE OR REPLACE FUNCTION public.admin_list_attribute_categories()
RETURNS TABLE (
  link_id          uuid,
  attribute_id     uuid,
  category_id      uuid,
  category_slug    text,
  category_name_en text,
  is_active        boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- GATE (F3/E7): the same permission the library roster itself requires.
  IF NOT public.has_permission(auth.uid(), 'categories', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT l.id, l.attribute_id, c.id, c.slug, c.name_en, c.is_active
    FROM public.category_attribute_links l
    JOIN public.categories c ON c.id = l.category_id
   ORDER BY c.name_en, c.slug;
END $$;

-- INC-074 definer law: the file restates the full ACL for the function it declares.
REVOKE ALL ON FUNCTION public.admin_list_attribute_categories() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_attribute_categories() TO authenticated;

-- ============================================================
-- PROOFS — read back from the live database.
-- ============================================================
DO $proof$
DECLARE
  v_rows int;
  v_links int;
  v_ok boolean;
BEGIN
  -- P1: the function exists with the declared shape.
  SELECT count(*) = 1 INTO v_ok
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'admin_list_attribute_categories'
     AND p.prosecdef;
  IF NOT v_ok THEN RAISE EXCEPTION 'P1 FAILED: function missing or not SECURITY DEFINER'; END IF;
  RAISE NOTICE 'P1 PASS: admin_list_attribute_categories present, SECURITY DEFINER';

  -- P2: totality — one row per link row (E6: the empty set is stated, not assumed).
  SELECT count(*) INTO v_links FROM public.category_attribute_links;
  SELECT count(*) INTO v_rows
    FROM public.category_attribute_links l
    JOIN public.categories c ON c.id = l.category_id;
  IF v_rows <> v_links THEN
    RAISE EXCEPTION 'P2 FAILED: % link rows but % joinable rows', v_links, v_rows;
  END IF;
  RAISE NOTICE 'P2 PASS: % link rows, all joinable to a category', v_links;

  -- P3: anon holds no EXECUTE.
  SELECT NOT has_function_privilege('anon', 'public.admin_list_attribute_categories()', 'EXECUTE')
    INTO v_ok;
  IF NOT v_ok THEN RAISE EXCEPTION 'P3 FAILED: anon can execute the lookup'; END IF;
  RAISE NOTICE 'P3 PASS: anon has no EXECUTE';

  -- P4: an unpermitted caller is refused (the gate, not the grant).
  v_ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000000"}', true);
    PERFORM count(*) FROM public.admin_list_attribute_categories();
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied');
  END;
  PERFORM set_config('request.jwt.claims', NULL, true);
  IF NOT v_ok THEN RAISE EXCEPTION 'P4 FAILED: unpermitted caller allowed'; END IF;
  RAISE NOTICE 'P4 PASS: unpermitted caller refused';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260907050000') ON CONFLICT DO NOTHING;