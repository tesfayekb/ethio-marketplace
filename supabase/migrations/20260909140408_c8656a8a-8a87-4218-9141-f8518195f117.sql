-- FIX-SCAN-1 ISSUE 1 — ATOMIC LINK FLAG UPDATE.
--
-- The link manager used to toggle Required/Filterable as unlink + relink: two
-- writes, so a failure between them LOST the link, and the relink reset
-- card_rank (the row's card membership) because admin_link_attribute inserts a
-- fresh row. One UPDATE removes both failure modes.
--
-- Gate order is F5: permission -> step-up -> capture -> mutate. The permission
-- is 'categories','update' — the SAME gate the link/unlink pair it replaces
-- carries, so no role's authority over this surface changes.

CREATE OR REPLACE FUNCTION public.admin_update_attribute_link(
  p_link_id uuid,
  p_is_required boolean DEFAULT NULL,
  p_is_filterable boolean DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_old public.category_attribute_links%ROWTYPE;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'update') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'update');

  SELECT * INTO v_old FROM public.category_attribute_links l WHERE l.id = p_link_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'admin.attributes.error.notFound' USING ERRCODE = 'P0010';
  END IF;

  UPDATE public.category_attribute_links l
     SET is_required   = COALESCE(p_is_required, l.is_required),
         is_filterable = COALESCE(p_is_filterable, l.is_filterable),
         updated_at    = now()
   WHERE l.id = p_link_id;

  PERFORM public.log_audit('attribute.link_update', 'category_attribute_links', p_link_id::text,
    jsonb_build_object(
      'category_id', v_old.category_id,
      'attribute_id', v_old.attribute_id,
      'old', jsonb_build_object('is_required', v_old.is_required, 'is_filterable', v_old.is_filterable),
      'new', jsonb_build_object(
        'is_required', COALESCE(p_is_required, v_old.is_required),
        'is_filterable', COALESCE(p_is_filterable, v_old.is_filterable))));
END $$;

-- A8 — the ACL is restated in-file for every (re)declared definer function.
REVOKE ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean) TO service_role;

DO $proof$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(proacl, ',') INTO v_acl
    FROM pg_proc WHERE proname = 'admin_update_attribute_link';
  RAISE NOTICE 'ACL admin_update_attribute_link: %', v_acl;
  IF v_acl LIKE '%=X/%' AND v_acl NOT LIKE '%anon=X%' THEN
    RAISE NOTICE 'P0 ok: anon holds no EXECUTE';
  END IF;
END $proof$;
