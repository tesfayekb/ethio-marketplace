-- Bundle 13 (photos), turn 9 (2026-10-14). Tier A. D154 B2 — a photo turned or cropped on the device takes the old photo's place.
--
-- A. replace_listing_photo (NEW; service-only, like register_listing_photo): the upload route's door for an edited photo
--    (POST /api/upload/photo with `replaces`). After the route has checked the caller, the listing, the photo it replaces
--    (read AS THE CALLER), the strip and the AI screen, and has stored the new objects, this door, in one transaction:
--    locks the listing row; refuses `photoGone` when the old photo is not on the listing; deletes the old row; inserts the
--    new photo at the old one's place (`display_order`), with `exif_stripped = true` as register_listing_photo writes it;
--    sets `cover_photo_id` to the first photo in the order (the cover follows the order, D154 B1). The plan's photo cap is
--    not checked: an edit adds no photo. The route deletes the old photo's objects after the door answers.
-- B. Proofs (structure, body markers, grants; RAISE EXCEPTION on any failure). No proof touches a real row or auth.users.
--    What the door does to rows is proven by the route's own tests (PP-25..PP-28), through the app's connection.

-- ===== A — replace_listing_photo =====
CREATE OR REPLACE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  IF p_photo_id IS NULL OR p_old_photo_id IS NULL THEN
    RAISE EXCEPTION 'photo ids are required';
  END IF;
  -- One edit of an ad's photos at a time: the listing row is locked.
  PERFORM 1 FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT display_order INTO v_order FROM public.listing_photos
   WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'photoGone';
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_old_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  -- D158 — a photo stored while photo screening is off is HELD (`unscreened`).
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (p_photo_id, p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false));
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_src text;
BEGIN
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL
     OR v_src NOT LIKE '%replace_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''photoGone''%'
     OR v_src NOT LIKE '%FOR UPDATE%'
     OR v_src NOT LIKE '%coalesce(p_unscreened, false)%'
     OR v_src NOT LIKE '%ORDER BY display_order LIMIT 1%' THEN
    RAISE EXCEPTION 'proof A failed: the body of replace_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof A failed: replace_listing_photo is not the service role''s alone';
  END IF;
  -- The door it sits beside is unchanged.
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)') IS NULL THEN
    RAISE EXCEPTION 'proof B failed: register_listing_photo is missing';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014110000') ON CONFLICT (version) DO NOTHING;
