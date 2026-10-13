-- Bundle 12 (the tidy-up round), turn T7 (2026-10-13). Tier A. DEC-144 rule 2 (parent first) on a pointer change.
-- e2e-areas: admin-categories
-- Bundle 7 left one way round the parent-first guard (M11's stop report): a category asks its own questions and
-- those it inherits through its home path (effective_category_links follows the primary parent), so moving a
-- category, making another path its home or giving it a first path can put a question before the question it
-- depends on. The guard watched the links and the definitions only.
-- Live beside file (ethio-prod, pg_proc, read in this turn's census): catalog_order_guard() RETURNS trigger;
--   provolatile v; prosecdef t; proconfig {search_path=public}; md5(prosrc) 26a66404a1cf0c247ec96fcdca72e82c
--   (1304 characters). The body below is that text with ONE branch added (the pointers table).
-- A. catalog_order_guard() — redeclared: a pointer row judges its child and everything under it.
-- B. Two deferred constraint triggers on category_tree_pointers: a new pointer, and a pointer whose parent or home
--    flag changed. A display order alone changes nothing a category inherits and is not judged.
-- C. Proofs: scratch rows only, each case undone by its own block; the caller is a random id; no auth.users row.

-- ===== A — the guard judges a pointer's child =====
CREATE OR REPLACE FUNCTION public.catalog_order_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $g$
DECLARE
  v_roots uuid[];
  v_cats  uuid[];
  v_done  text;
  v_bad   jsonb;
BEGIN
  -- Migrations, seeds and service-client scratch rows are not judged.
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  IF TG_TABLE_NAME = 'category_attribute_links' THEN
    v_roots := ARRAY[NEW.category_id];
  ELSIF TG_TABLE_NAME = 'category_tree_pointers' THEN
    -- T7 — a pointer added, moved or made home: the child and everything under it
    -- inherit through a new home path, so they are judged again.
    v_roots := ARRAY[NEW.child_id];
  ELSE
    SELECT array_agg(DISTINCT l.category_id) INTO v_roots
      FROM public.category_attribute_links l WHERE l.attribute_id = NEW.id;
  END IF;
  IF v_roots IS NULL THEN
    RETURN NULL;
  END IF;
  v_done := COALESCE(current_setting('ethio.catalog_order_judged', true), '');
  WITH RECURSIVE d(id) AS (
    SELECT unnest(v_roots)
    UNION
    SELECT t.child_id FROM public.category_tree_pointers t JOIN d ON t.parent_id = d.id)
  SELECT array_agg(d.id) INTO v_cats FROM d WHERE position(d.id::text IN v_done) = 0;
  IF v_cats IS NULL THEN
    RETURN NULL;
  END IF;
  PERFORM set_config('ethio.catalog_order_judged', v_done || ',' || array_to_string(v_cats, ','), true);
  v_bad := public.catalog_order_violations(v_cats);
  IF jsonb_array_length(v_bad) > 0 THEN
    RAISE EXCEPTION 'admin.attributes.error.parentAfterChild:%',
      (v_bad -> 0 ->> 'slug') || ': ' || (v_bad -> 0 ->> 'parent') || ' → ' || (v_bad -> 0 ->> 'child')
      USING ERRCODE = 'P0010';
  END IF;
  RETURN NULL;
END $g$;
REVOKE ALL ON FUNCTION public.catalog_order_guard() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.catalog_order_guard() TO service_role;

-- ===== B — the pointer triggers (deferred, like the two on links and definitions) =====
DROP TRIGGER IF EXISTS catalog_order_guard_pointers_insert ON public.category_tree_pointers;
CREATE CONSTRAINT TRIGGER catalog_order_guard_pointers_insert
  AFTER INSERT ON public.category_tree_pointers
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW EXECUTE FUNCTION public.catalog_order_guard();
DROP TRIGGER IF EXISTS catalog_order_guard_pointers_update ON public.category_tree_pointers;
CREATE CONSTRAINT TRIGGER catalog_order_guard_pointers_update
  AFTER UPDATE ON public.category_tree_pointers
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (OLD.parent_id IS DISTINCT FROM NEW.parent_id OR OLD.is_primary IS DISTINCT FROM NEW.is_primary)
  EXECUTE FUNCTION public.catalog_order_guard();

-- ===== C — proofs (scratch rows only; no auth.users row; the caller is a random id) =====
DO $proof$
DECLARE
  v_key    text := 'e2e-mig-t7-' || substr(md5(random()::text), 1, 8);
  v_claims text := json_build_object('sub', gen_random_uuid(), 'role', 'authenticated')::text;
  v_case   int;
  v_p1     uuid;
  v_p2     uuid;
  v_leaf   uuid;
  v_a      uuid;
  v_c      uuid;
  v_def    text;
  v_err    text;
BEGIN
  -- C1: the guard's pointers branch and the two deferred triggers, read from the catalogue.
  v_def := pg_get_functiondef('public.catalog_order_guard()'::regprocedure);
  IF position('ELSIF TG_TABLE_NAME = ''category_tree_pointers'' THEN' IN v_def) = 0
     OR position('v_roots := ARRAY[NEW.child_id];' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T7 C1: the guard has no pointers branch';
  END IF;
  IF (SELECT count(*) FROM pg_catalog.pg_trigger t
       WHERE t.tgrelid = 'public.category_tree_pointers'::regclass
         AND t.tgname IN ('catalog_order_guard_pointers_insert', 'catalog_order_guard_pointers_update')
         AND t.tgdeferrable AND t.tginitdeferred
         AND t.tgfoid = 'public.catalog_order_guard()'::regprocedure) <> 2 THEN
    RAISE EXCEPTION 'T7 C1: the two deferred pointer triggers';
  END IF;
  IF pg_get_triggerdef((SELECT t.oid FROM pg_catalog.pg_trigger t
                         WHERE t.tgrelid = 'public.category_tree_pointers'::regclass
                           AND t.tgname = 'catalog_order_guard_pointers_update'))
     NOT ILIKE '%old.parent_id IS DISTINCT FROM new.parent_id%old.is_primary IS DISTINCT FROM new.is_primary%' THEN
    RAISE EXCEPTION 'T7 C1: the update trigger judges more than a parent or home change';
  END IF;

  -- C2: five cases on scratch rows. P1 and P2 are top-level; P2 asks A (place 1); the leaf, under P1, asks C, which
  -- depends on A. Under P1 the leaf asks C alone. Each case undoes itself.
  --   1 a caller moves the leaf under P2, where A is inherited after C: refused;
  --   2 the same with C at place 2, after A: passes;
  --   3 the same as 1 with no caller (a migration, a seed, the service client): passes;
  --   4 a caller changes only the display order of a pointer whose leaf already breaks the order: passes;
  --   5 a caller gives a leaf that asks C its first path, under P2: refused.
  FOR v_case IN 1..5 LOOP
    v_err := NULL;
    BEGIN
      PERFORM set_config('request.jwt.claims', '{}', true);
      PERFORM set_config('ethio.catalog_order_judged', '', true);
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-p1-' || v_case, v_key, true, true) RETURNING id INTO v_p1;
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-p2-' || v_case, v_key, true, true) RETURNING id INTO v_p2;
      INSERT INTO public.categories (slug, name_en, is_active, allow_listings)
      VALUES (v_key || '-leaf-' || v_case, v_key, true, true) RETURNING id INTO v_leaf;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options)
      VALUES (v_key || '-a' || v_case, v_key, 'single_select', '[{"value":"a"}]') RETURNING id INTO v_a;
      INSERT INTO public.attributes (attr_key, name_en, attr_type, options, depends_on)
      VALUES (v_key || '-c' || v_case, v_key, 'single_select', '[{"value":"x"}]', v_a) RETURNING id INTO v_c;
      INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order)
      VALUES (NULL, v_p1, 2000000), (NULL, v_p2, 2000001);
      INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
      VALUES (v_p2, v_a, 1), (v_leaf, v_c, CASE WHEN v_case = 2 THEN 2 ELSE 0 END);
      IF v_case = 4 THEN
        INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_p2, v_leaf, 0);
      ELSIF v_case <> 5 THEN
        INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_p1, v_leaf, 0);
      END IF;
      SET CONSTRAINTS ALL IMMEDIATE;
      SET CONSTRAINTS ALL DEFERRED;
      PERFORM set_config('ethio.catalog_order_judged', '', true);
      IF v_case <> 3 THEN
        PERFORM set_config('request.jwt.claims', v_claims, true);
      END IF;
      IF v_case = 4 THEN
        UPDATE public.category_tree_pointers SET display_order = 5 WHERE child_id = v_leaf;
      ELSIF v_case = 5 THEN
        INSERT INTO public.category_tree_pointers (parent_id, child_id, display_order) VALUES (v_p2, v_leaf, 0);
      ELSE
        UPDATE public.category_tree_pointers SET parent_id = v_p2 WHERE child_id = v_leaf;
      END IF;
      SET CONSTRAINTS ALL IMMEDIATE;
      RAISE EXCEPTION 't7-undo';
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    SET CONSTRAINTS ALL DEFERRED;
    PERFORM set_config('request.jwt.claims', '{}', true);
    PERFORM set_config('ethio.catalog_order_judged', '', true);
    IF v_case IN (1, 5) THEN
      IF v_err IS NULL OR v_err NOT LIKE 'admin.attributes.error.parentAfterChild:' || v_key || '-leaf-' || v_case || ': '
                                        || v_key || '-a' || v_case || ' → ' || v_key || '-c' || v_case THEN
        RAISE EXCEPTION 'T7 C2 case %: expected the parent-first refusal, got %', v_case, coalesce(v_err, 'nothing');
      END IF;
    ELSIF v_err IS DISTINCT FROM 't7-undo' THEN
      RAISE EXCEPTION 'T7 C2 case %: expected a pass, got %', v_case, v_err;
    END IF;
  END LOOP;

  -- C3: nothing of the proofs is left.
  IF EXISTS (SELECT 1 FROM public.categories WHERE slug LIKE 'e2e-mig-%' AND slug LIKE v_key || '%')
     OR EXISTS (SELECT 1 FROM public.attributes WHERE attr_key LIKE 'e2e-mig-%' AND attr_key LIKE v_key || '%') THEN
    RAISE EXCEPTION 'T7 C3: proof rows were left behind';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261013180000') ON CONFLICT (version) DO NOTHING;
