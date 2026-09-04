-- C5h PART A — the image surface reads STORED truth.
-- Read-only definer: the dialog must see what the row actually holds, including
-- the acceptance stamp, on every open. Gate: categories:assets (F3). No write,
-- so no step-up and no audit (F5 applies to mutating verbs).
CREATE OR REPLACE FUNCTION public.admin_get_category_images(p_id uuid)
RETURNS TABLE (
  image_url text,
  image_thumb_url text,
  og_image_url text,
  image_accepted_at timestamptz)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'categories', 'assets') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  RETURN QUERY
  SELECT c.image_url, c.image_thumb_url, c.og_image_url, c.image_accepted_at
    FROM public.categories c
   WHERE c.id = p_id;
END $function$;

REVOKE ALL ON FUNCTION public.admin_get_category_images(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_category_images(uuid) TO authenticated;

-- ---- PROOFS --------------------------------------------------------------
DO $$
DECLARE
  v_scratch uuid;
  v_admin uuid;
  v_at timestamptz;
  v_row record;
  v_count int;
BEGIN
  -- P0: ACL — anon may not execute; authenticated may.
  IF has_function_privilege('anon', 'public.admin_get_category_images(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'C5h P0 FAILED: anon can execute admin_get_category_images';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_get_category_images(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'C5h P0 FAILED: authenticated cannot execute admin_get_category_images';
  END IF;
  RAISE NOTICE 'C5h P0 OK: reader ACL is authenticated-only';

  INSERT INTO public.categories(name_en, slug, display_order, icon)
  VALUES ('C5h proof', 'c5h-proof-' || replace(gen_random_uuid()::text, '-', ''), 9999, 'Package')
  RETURNING id INTO v_scratch;

  -- P1: DENY — a principal without categories:assets is refused.
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claims',
      json_build_object('sub', gen_random_uuid()::text, 'role', 'authenticated')::text, true);
    PERFORM * FROM public.admin_get_category_images(v_scratch);
    RESET ROLE;
    RAISE EXCEPTION 'C5h P1 FAILED: read succeeded without categories:assets';
  EXCEPTION WHEN sqlstate '42501' OR raise_exception THEN
    RESET ROLE;
    PERFORM set_config('request.jwt.claims', NULL, true);
  END;
  RAISE NOTICE 'C5h P1 OK: reader refuses a principal without the permission';

  SELECT ur.user_id INTO v_admin
    FROM public.user_roles ur
   WHERE public.has_permission(ur.user_id, 'categories', 'assets')
   LIMIT 1;
  IF v_admin IS NULL THEN
    RAISE EXCEPTION 'C5h P2 FAILED: no user holds categories:assets';
  END IF;

  SET LOCAL ROLE authenticated;
  PERFORM set_config('request.jwt.claims',
    json_build_object('sub', v_admin::text, 'role', 'authenticated')::text, true);

  -- P2: SHAPE — an imageless row answers one row of NULLs.
  SELECT count(*) INTO v_count FROM public.admin_get_category_images(v_scratch);
  IF v_count <> 1 THEN
    RAISE EXCEPTION 'C5h P2 FAILED: expected exactly 1 row, got %', v_count;
  END IF;
  SELECT * INTO v_row FROM public.admin_get_category_images(v_scratch);
  IF v_row.image_url IS NOT NULL OR v_row.image_accepted_at IS NOT NULL THEN
    RAISE EXCEPTION 'C5h P2 FAILED: imageless row reported imagery';
  END IF;
  RAISE NOTICE 'C5h P2 OK: shape is one row, NULL-honest';

  -- P3: TRUTH — persist then accept, and the reader reports both verbatim.
  PERFORM public.admin_set_category_images(
    v_scratch,
    'https://example.test/card-9.png',
    'https://example.test/thumb-9.png',
    'https://example.test/og-9.png',
    NULL);
  SELECT public.admin_accept_category_image(v_scratch) INTO v_at;
  SELECT * INTO v_row FROM public.admin_get_category_images(v_scratch);
  IF v_row.image_url IS DISTINCT FROM 'https://example.test/card-9.png'
     OR v_row.image_thumb_url IS DISTINCT FROM 'https://example.test/thumb-9.png'
     OR v_row.og_image_url IS DISTINCT FROM 'https://example.test/og-9.png'
     OR v_row.image_accepted_at IS DISTINCT FROM v_at THEN
    RAISE EXCEPTION 'C5h P3 FAILED: reader disagrees with the stored row';
  END IF;
  RAISE NOTICE 'C5h P3 OK: reader returns stored URLs and the acceptance stamp';

  -- P4: an unknown id answers ZERO rows (empty is explicit, E6).
  SELECT count(*) INTO v_count FROM public.admin_get_category_images(gen_random_uuid());
  IF v_count <> 0 THEN
    RAISE EXCEPTION 'C5h P4 FAILED: unknown id returned % rows', v_count;
  END IF;
  RAISE NOTICE 'C5h P4 OK: unknown id is the empty set';

  RESET ROLE;
  PERFORM set_config('request.jwt.claims', NULL, true);

  DELETE FROM public.categories WHERE id = v_scratch;
END $$;

INSERT INTO public.migration_marks(version) VALUES ('20260904120000') ON CONFLICT DO NOTHING;