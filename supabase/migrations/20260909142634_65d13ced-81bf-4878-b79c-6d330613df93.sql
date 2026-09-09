-- FIX-SCAN-1 ISSUE 1 (corrective) — SELF-MARK + CLOSER RESTATEMENT.
--
-- 20260909140408 landed admin_update_attribute_link WITHOUT its self-mark
-- (migration law 8). A landed file cannot be edited (append-only law 2), so
-- this corrective heals the ledger and RE-DECLARES the function in full,
-- text-independently, with its REVOKE/GRANT closers restated in-file (A8).
--
-- Gate order is F5: permission -> step-up -> capture -> mutate. The permission
-- is 'categories','update' — the SAME gate carried by the link/unlink pair this
-- RPC replaces, so no role's authority over this surface changes.

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

REVOKE ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.admin_update_attribute_link(uuid, boolean, boolean) TO service_role;

DO $proof$
DECLARE v_acl text;
BEGIN
  SELECT array_to_string(proacl, ',') INTO v_acl
    FROM pg_proc WHERE proname = 'admin_update_attribute_link';
  RAISE NOTICE 'ACL admin_update_attribute_link: %', v_acl;
  IF v_acl LIKE '%anon=X%' THEN
    RAISE EXCEPTION 'FIX-SCAN-1: anon must hold no EXECUTE on admin_update_attribute_link';
  END IF;
  IF v_acl NOT LIKE '%authenticated=X%' THEN
    RAISE EXCEPTION 'FIX-SCAN-1: authenticated must hold EXECUTE on admin_update_attribute_link';
  END IF;
END $proof$;

-- Ledger: the unmarked file's stamp, then this file's declared mark.
INSERT INTO public.migration_marks(version) VALUES ('20260909140408') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks(version) VALUES ('20260909150000') ON CONFLICT DO NOTHING;