-- C5g PART C — ACCEPT (the agree-and-save).
-- Append-only (E2). The column is nullable: an unaccepted image is the norm.
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_accepted_at timestamptz;

COMMENT ON COLUMN public.categories.image_accepted_at IS
  'C5g: when an operator accepted the CURRENT generated imagery. Cleared to NULL by every persist (regeneration un-accepts).';

-- ---- Part C.1: the accept verb ------------------------------------------
-- F5 writer order: gates (permission -> step-up) -> capture -> mutate -> audit.
CREATE OR REPLACE FUNCTION public.admin_accept_category_image(p_id uuid)
RETURNS timestamptz
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_old jsonb;
  v_now timestamptz;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'assets') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'assets');

  SELECT jsonb_build_object(
           'image_url', c.image_url,
           'image_accepted_at', c.image_accepted_at)
    INTO v_old
    FROM public.categories c
   WHERE c.id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'category not found'; END IF;

  IF (v_old ->> 'image_url') IS NULL THEN
    RAISE EXCEPTION 'admin.categories.error.acceptNoImage' USING ERRCODE = 'P0011';
  END IF;

  v_now := now();
  UPDATE public.categories
     SET image_accepted_at = v_now,
         updated_at = v_now
   WHERE id = p_id;

  PERFORM public.log_audit('category.accept_image', 'categories', p_id::text,
    jsonb_build_object('old', v_old,
                       'new', jsonb_build_object('image_accepted_at', v_now)));
  RETURN v_now;
END $function$;

REVOKE ALL ON FUNCTION public.admin_accept_category_image(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_accept_category_image(uuid) TO authenticated;

-- ---- Part C.2: every persist UN-ACCEPTS ----------------------------------
-- Restated verbatim from C5a-2 with the single added clause; the ACL is
-- restated IN THIS FILE (DEC-022-B definer-guard law).
CREATE OR REPLACE FUNCTION public.admin_set_category_images(
  p_id uuid,
  p_image_url text,
  p_image_thumb_url text,
  p_og_image_url text,
  p_generation_prompt text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_old jsonb;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'assets') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  PERFORM public.require_step_up_if_needed('categories', 'assets');

  SELECT jsonb_build_object(
           'image_url', c.image_url,
           'image_thumb_url', c.image_thumb_url,
           'og_image_url', c.og_image_url,
           'image_generation_prompt', c.image_generation_prompt,
           'image_accepted_at', c.image_accepted_at)
    INTO v_old
    FROM public.categories c
   WHERE c.id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'category not found'; END IF;

  UPDATE public.categories
     SET image_url = p_image_url,
         image_thumb_url = p_image_thumb_url,
         og_image_url = p_og_image_url,
         image_generation_prompt = p_generation_prompt,
         -- C5g PART C — a NEW generation is not the accepted one.
         image_accepted_at = NULL,
         updated_at = now()
   WHERE id = p_id;

  PERFORM public.log_audit('category.set_images', 'categories', p_id::text,
    jsonb_build_object(
      'old', v_old,
      'new', jsonb_build_object(
        'image_url', p_image_url,
        'image_thumb_url', p_image_thumb_url,
        'og_image_url', p_og_image_url,
        'image_generation_prompt', p_generation_prompt,
        'image_accepted_at', NULL)));
END $function$;

REVOKE ALL ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) TO authenticated;

-- ---- PROOFS --------------------------------------------------------------
DO $$
DECLARE
  v_scratch uuid;
  v_admin uuid;
  v_at timestamptz;
  v_after timestamptz;
BEGIN
  -- P0: ACL — anon may not execute either verb.
  IF has_function_privilege('anon', 'public.admin_accept_category_image(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'C5g P0 FAILED: anon can execute admin_accept_category_image';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_accept_category_image(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'C5g P0 FAILED: authenticated cannot execute admin_accept_category_image';
  END IF;
  RAISE NOTICE 'C5g P0 OK: accept verb ACL is authenticated-only';

  INSERT INTO public.categories(name_en, slug, display_order, icon)
  VALUES ('C5g proof', 'c5g-proof-' || replace(gen_random_uuid()::text, '-', ''), 9999, 'Package')
  RETURNING id INTO v_scratch;

  -- P1: refusal without the permission leaves NO trace (F5).
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', gen_random_uuid()::text, 'role', 'authenticated')::text, true);
    PERFORM public.admin_accept_category_image(v_scratch);
    RESET ROLE;
    RAISE EXCEPTION 'C5g P1 FAILED: accept succeeded without categories:assets';
  EXCEPTION WHEN sqlstate '42501' OR raise_exception THEN
    RESET ROLE;
    PERFORM set_config('request.jwt.claims', NULL, true);
  END;
  SELECT image_accepted_at INTO v_at FROM public.categories WHERE id = v_scratch;
  IF v_at IS NOT NULL THEN
    RAISE EXCEPTION 'C5g P1 FAILED: a refused accept left a timestamp';
  END IF;
  RAISE NOTICE 'C5g P1 OK: refusal left no trace';

  SELECT ur.user_id INTO v_admin
    FROM public.user_roles ur
   WHERE public.has_permission(ur.user_id, 'categories', 'assets')
   LIMIT 1;
  IF v_admin IS NULL THEN
    RAISE EXCEPTION 'C5g P2 FAILED: no user holds categories:assets';
  END IF;

  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_admin::text, 'role', 'authenticated')::text, true);

  -- P2: accept without imagery is refused with the translated key.
  BEGIN
    PERFORM public.admin_accept_category_image(v_scratch);
    RAISE EXCEPTION 'C5g P2 FAILED: accepted a category with no image';
  EXCEPTION WHEN sqlstate 'P0011' THEN
    RAISE NOTICE 'C5g P2 OK: accept refuses an imageless category';
  END;

  -- P3: persist -> accept -> re-persist clears the acceptance.
  PERFORM public.admin_set_category_images(
    v_scratch,
    'https://example.test/card-1.png',
    'https://example.test/thumb-1.png',
    'https://example.test/og-1.png',
    NULL);
  SELECT public.admin_accept_category_image(v_scratch) INTO v_at;
  IF v_at IS NULL THEN
    RAISE EXCEPTION 'C5g P3 FAILED: accept returned NULL';
  END IF;
  SELECT image_accepted_at INTO v_after FROM public.categories WHERE id = v_scratch;
  IF v_after IS DISTINCT FROM v_at THEN
    RAISE EXCEPTION 'C5g P3 FAILED: stored acceptance % <> returned %', v_after, v_at;
  END IF;

  PERFORM public.admin_set_category_images(
    v_scratch,
    'https://example.test/card-2.png',
    'https://example.test/thumb-2.png',
    'https://example.test/og-2.png',
    NULL);
  SELECT image_accepted_at INTO v_after FROM public.categories WHERE id = v_scratch;
  IF v_after IS NOT NULL THEN
    RAISE EXCEPTION 'C5g P3 FAILED: regeneration did not un-accept (%).', v_after;
  END IF;
  RAISE NOTICE 'C5g P3 OK: accept stamps, regeneration clears';

  RESET ROLE;
  PERFORM set_config('request.jwt.claims', NULL, true);

  -- P4: both writes are audited.
  IF NOT EXISTS (SELECT 1 FROM public.audit_log
                  WHERE entity_id = v_scratch::text AND action = 'category.accept_image') THEN
    RAISE EXCEPTION 'C5g P4 FAILED: accept was not audited';
  END IF;
  RAISE NOTICE 'C5g P4 OK: accept is audited';

  DELETE FROM public.categories WHERE id = v_scratch;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904110000') ON CONFLICT DO NOTHING;