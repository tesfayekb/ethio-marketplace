-- ============================================================
-- C3c PART C — link ordering door.
-- Part C's "Move up / Move down" verb has no landed RPC: C3b set
-- display_order at link time only. This is the missing writer, gated exactly
-- like admin_link_attribute (categories:update + step-up) and audited.
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_set_attribute_link_order(
  p_category_id uuid, p_ordered_link_ids uuid[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_ids uuid[]; v_have integer; v_want integer; v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  v_ids := COALESCE(p_ordered_link_ids, '{}');

  -- TOTALITY (E6): the list must be the category's WHOLE link set, exactly once.
  SELECT count(*)::int INTO v_have
    FROM public.category_attribute_links l WHERE l.category_id = p_category_id;
  SELECT count(DISTINCT u)::int INTO v_want FROM unnest(v_ids) u;
  IF v_have <> v_want OR EXISTS (
    SELECT 1 FROM unnest(v_ids) AS lid
     WHERE NOT EXISTS (SELECT 1 FROM public.category_attribute_links l
                        WHERE l.id = lid AND l.category_id = p_category_id)
  ) THEN
    RAISE EXCEPTION 'admin.attributes.error.orderMismatch' USING ERRCODE = 'P0010';
  END IF;

  SELECT COALESCE(jsonb_agg(l.id ORDER BY l.display_order, l.id), '[]'::jsonb)
    INTO v_old
    FROM public.category_attribute_links l WHERE l.category_id = p_category_id;

  UPDATE public.category_attribute_links l
     SET display_order = u.ord - 1, updated_at = now()
    FROM unnest(v_ids) WITH ORDINALITY AS u(lid, ord)
   WHERE l.id = u.lid AND l.category_id = p_category_id;

  PERFORM public.log_audit('attribute.reorder', 'categories', p_category_id::text,
    jsonb_build_object('old', v_old, 'new', to_jsonb(v_ids)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_attribute_link_order(uuid, uuid[]) TO authenticated;

-- ============================================================
-- PROOFS (in-file; every failure aborts the migration)
-- ============================================================
DO $$
DECLARE v_cat uuid; v_a uuid; v_b uuid; v_la uuid; v_lb uuid; v_ok boolean; v_n int;
BEGIN
  PERFORM set_config('request.jwt.claims', '', true);

  INSERT INTO public.attributes (attr_key, name_en, attr_type)
       VALUES ('c3c_order_a', 'C3c order A', 'text') RETURNING id INTO v_a;
  INSERT INTO public.attributes (attr_key, name_en, attr_type)
       VALUES ('c3c_order_b', 'C3c order B', 'text') RETURNING id INTO v_b;
  INSERT INTO public.categories (name_en, slug, display_order)
       VALUES ('C3c order', 'c3c-order-proof', 9003) RETURNING id INTO v_cat;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
       VALUES (v_cat, v_a, 0) RETURNING id INTO v_la;
  INSERT INTO public.category_attribute_links (category_id, attribute_id, display_order)
       VALUES (v_cat, v_b, 1) RETURNING id INTO v_lb;

  -- P1: the door refuses an ungated caller.
  v_ok := false;
  BEGIN PERFORM public.admin_set_attribute_link_order(v_cat, ARRAY[v_lb, v_la]);
  EXCEPTION WHEN others THEN v_ok := (SQLERRM = 'permission denied'); END;
  IF NOT v_ok THEN RAISE EXCEPTION 'P1 FAILED: link ordering allowed an ungated caller'; END IF;
  RAISE NOTICE 'P1 PASS: admin_set_attribute_link_order refuses an ungated caller';

  -- P2: the refused attempt left NO trace (F5).
  SELECT count(*)::int INTO v_n FROM public.category_attribute_links
   WHERE id = v_la AND display_order = 0;
  IF v_n <> 1 THEN RAISE EXCEPTION 'P2 FAILED: a refused reorder still wrote'; END IF;
  RAISE NOTICE 'P2 PASS: the refused reorder left no trace';

  -- CLEANUP
  DELETE FROM public.category_attribute_links WHERE category_id = v_cat;
  DELETE FROM public.categories WHERE id = v_cat;
  DELETE FROM public.attributes WHERE id IN (v_a, v_b);
  SELECT count(*)::int INTO v_n FROM public.attributes WHERE attr_key LIKE 'c3c_order_%';
  IF v_n <> 0 THEN RAISE EXCEPTION 'CLEANUP FAILED: % scratch definitions remain', v_n; END IF;
  RAISE NOTICE 'CLEANUP PASS: no proof residue';
END $$;

DO $$
DECLARE v_ok boolean;
BEGIN
  SELECT has_function_privilege('authenticated', 'public.admin_set_attribute_link_order(uuid, uuid[])', 'EXECUTE')
     AND NOT has_function_privilege('anon', 'public.admin_set_attribute_link_order(uuid, uuid[])', 'EXECUTE')
    INTO v_ok;
  IF NOT v_ok THEN RAISE EXCEPTION 'ACL FAILED: unexpected execute privileges'; END IF;
  RAISE NOTICE 'ACL PASS: authenticated-only door';
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260906091000') ON CONFLICT DO NOTHING;