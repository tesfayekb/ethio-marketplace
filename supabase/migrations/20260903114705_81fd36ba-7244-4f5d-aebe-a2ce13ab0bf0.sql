-- C5a-2 — CALLER-CONTEXT UPLOADS (INC-154)
-- Part A.1: the bucket's public flag cannot be written from SQL (the platform
-- rejects every write to storage.buckets) and the storage tool is blocked by
-- workspace policy (public_buckets_blocked). The operator's manual flip is
-- therefore ASSERTED here, loudly, instead of reproduced.
DO $$
DECLARE v_public boolean;
BEGIN
  SELECT public INTO v_public FROM storage.buckets WHERE id = 'category-assets';
  IF v_public IS NULL THEN
    RAISE EXCEPTION 'C5a-2: bucket category-assets missing — create it with the storage tool first';
  END IF;
  IF v_public IS NOT TRUE THEN
    RAISE EXCEPTION 'C5a-2: bucket category-assets is PRIVATE — an operator must flip it public before this migration applies';
  END IF;
END $$;

-- Part A.2: caller-context write law for the bucket. Existing public-read and
-- service_role policies are untouched.
DROP POLICY IF EXISTS "category_assets_assets_insert" ON storage.objects;
CREATE POLICY "category_assets_assets_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'category-assets'
    AND public.has_permission(auth.uid(), 'categories', 'assets')
  );

DROP POLICY IF EXISTS "category_assets_assets_update" ON storage.objects;
CREATE POLICY "category_assets_assets_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'category-assets'
    AND public.has_permission(auth.uid(), 'categories', 'assets')
  )
  WITH CHECK (
    bucket_id = 'category-assets'
    AND public.has_permission(auth.uid(), 'categories', 'assets')
  );

DROP POLICY IF EXISTS "category_assets_assets_delete" ON storage.objects;
CREATE POLICY "category_assets_assets_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'category-assets'
    AND public.has_permission(auth.uid(), 'categories', 'assets')
  );

-- Part A.3: the gated row-write. F5 order: gate -> step-up -> capture -> mutate -> audit.
CREATE OR REPLACE FUNCTION public.admin_set_category_images(
  p_id uuid,
  p_image_url text,
  p_image_thumb_url text,
  p_og_image_url text,
  p_generation_prompt text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
           'image_generation_prompt', c.image_generation_prompt)
    INTO v_old
    FROM public.categories c
   WHERE c.id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'category not found'; END IF;

  UPDATE public.categories
     SET image_url = p_image_url,
         image_thumb_url = p_image_thumb_url,
         og_image_url = p_og_image_url,
         image_generation_prompt = p_generation_prompt,
         updated_at = now()
   WHERE id = p_id;

  PERFORM public.log_audit('category.set_images', 'categories', p_id::text,
    jsonb_build_object(
      'old', v_old,
      'new', jsonb_build_object(
        'image_url', p_image_url,
        'image_thumb_url', p_image_thumb_url,
        'og_image_url', p_og_image_url,
        'image_generation_prompt', p_generation_prompt)));
END $$;

REVOKE ALL ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_category_images(uuid, text, text, text, text) TO authenticated;

-- ---- PROOFS -------------------------------------------------------------
-- P1: an authenticated caller WITHOUT categories:assets is refused a bucket insert.
DO $$
DECLARE v_state text := '';
BEGIN
  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', '00000000-0000-4000-8000-0000000000c5', 'role', 'authenticated')::text, true);
  BEGIN
    INSERT INTO storage.objects (bucket_id, name, owner)
    VALUES ('category-assets', 'c5a2-proof/denied.png', NULL);
    v_state := 'ALLOWED';
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLSTATE;
  END;
  RESET ROLE;
  IF v_state <> '42501' THEN
    RAISE EXCEPTION 'C5a-2 P1 FAILED: expected 42501 refusal, got %', v_state;
  END IF;
  RAISE NOTICE 'C5a-2 P1 OK: bucket insert refused (42501) without categories:assets';
END $$;

-- P2/P3: RPC deny-case, then happy path + read-back on a scratch row.
DO $$
DECLARE
  v_scratch uuid;
  v_admin uuid;
  v_msg text := '';
  v_img text; v_thumb text; v_og text; v_prompt text;
BEGIN
  INSERT INTO public.categories (name_en, slug, is_active)
  VALUES ('C5a-2 scratch', 'c5a2-scratch-' || substr(gen_random_uuid()::text, 1, 8), false)
  RETURNING id INTO v_scratch;

  -- P2: deny
  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', '00000000-0000-4000-8000-0000000000c5', 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.admin_set_category_images(v_scratch, 'x', 'y', 'z', 'p');
    v_msg := 'ALLOWED';
  EXCEPTION WHEN OTHERS THEN
    v_msg := SQLERRM;
  END;
  RESET ROLE;
  IF v_msg <> 'permission denied' THEN
    RAISE EXCEPTION 'C5a-2 P2 FAILED: expected permission denied, got %', v_msg;
  END IF;
  RAISE NOTICE 'C5a-2 P2 OK: RPC refused without categories:assets';

  -- P3: happy path as a real holder of categories:assets
  SELECT ur.user_id INTO v_admin
    FROM public.user_roles ur
   WHERE public.has_permission(ur.user_id, 'categories', 'assets')
   LIMIT 1;
  IF v_admin IS NULL THEN
    RAISE EXCEPTION 'C5a-2 P3 FAILED: no user holds categories:assets';
  END IF;

  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_admin::text, 'role', 'authenticated')::text, true);
  PERFORM public.admin_set_category_images(
    v_scratch,
    'https://example.test/card.png',
    'https://example.test/thumb.png',
    'https://example.test/og.png',
    'c5a2 proof prompt');
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', NULL, true);

  SELECT image_url, image_thumb_url, og_image_url, image_generation_prompt
    INTO v_img, v_thumb, v_og, v_prompt
    FROM public.categories WHERE id = v_scratch;

  IF v_img <> 'https://example.test/card.png'
     OR v_thumb <> 'https://example.test/thumb.png'
     OR v_og <> 'https://example.test/og.png'
     OR v_prompt <> 'c5a2 proof prompt' THEN
    RAISE EXCEPTION 'C5a-2 P3 FAILED: read-back mismatch (% / % / % / %)', v_img, v_thumb, v_og, v_prompt;
  END IF;
  RAISE NOTICE 'C5a-2 P3 OK: RPC wrote and read back all four columns';

  DELETE FROM public.categories WHERE id = v_scratch;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904100000') ON CONFLICT DO NOTHING;