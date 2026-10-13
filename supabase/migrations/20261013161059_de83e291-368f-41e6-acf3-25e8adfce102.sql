-- Bundle 12 (the tidy-up round), turn T16 (2026-10-13). Tier A. A seller moves a photo to a place in the order (D154).
-- e2e-areas: posting
-- The rule (D154, the operator, 2026-10-13): the first photo is the cover; every photo has Move earlier and Move later,
-- and on a computer a photo can be dragged to another place. One door does all three: move_listing_photo(listing,
-- photo, position) puts the photo at that place (0 = first; a place past the end means last) and closes the others up
-- behind and around it in their old order. The cover follows the first place (cover_photo_id is set to it), as
-- set_cover_photo does since INC-597.
-- New function: move_listing_photo(uuid, uuid, integer) RETURNS jsonb; SECURITY DEFINER; search_path public; owner
-- only (the listing's seller_id must be auth.uid()), the photo must be on that listing, the place must be 0 or more.
-- display_order is unique per listing and every stored value is 0 or more, so the move runs in two passes: every photo
-- of the listing to a negative value (-1 minus the old one), then each to its new place.
-- A. The function, its REVOKE and GRANTs (authenticated only; never anon or PUBLIC).
-- B. Proofs: the catalogue only — the header, the grants, the checks in the body. The move itself is proven by PP-17
--    and PP-18 (e2e/photo-pipeline.spec.ts) through the photo route, on the app's own connection: a proof block would
--    need a listing, and a listing needs a real account (listings.seller_id references auth.users).

-- ===== A — the move =====
CREATE OR REPLACE FUNCTION public.move_listing_photo(p_listing_id uuid, p_photo_id uuid, p_position integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_count integer;
  v_place integer;
  v_cover uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  IF p_position IS NULL OR p_position < 0 THEN
    RAISE EXCEPTION 'bad position';
  END IF;
  SELECT count(*)::integer INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  v_place := least(p_position, v_count - 1);
  -- Pass 1: every photo of this listing out of the way (-1 minus its place).
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  -- Pass 2: the others in their old order, closed up around the chosen place; the photo at that place.
  WITH others AS (
    SELECT x.id, (row_number() OVER (ORDER BY x.display_order DESC) - 1)::integer AS i
      FROM public.listing_photos x
     WHERE x.listing_id = p_listing_id AND x.id <> p_photo_id
  ), placed AS (
    SELECT o.id, CASE WHEN o.i >= v_place THEN o.i + 1 ELSE o.i END AS place FROM others o
    UNION ALL
    SELECT p_photo_id, v_place
  )
  UPDATE public.listing_photos AS p SET display_order = placed.place
    FROM placed
   WHERE p.id = placed.id AND p.listing_id = p_listing_id;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id AND display_order = 0;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'position', v_place, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.move_listing_photo(uuid, uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO authenticated;
GRANT ALL ON FUNCTION public.move_listing_photo(uuid, uuid, integer) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_def   text;
  v_state text;
  v_err   text;
BEGIN
  -- B1: the header and the checks.
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
                  WHERE p.oid = 'public.move_listing_photo(uuid, uuid, integer)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v'
                    AND p.proconfig = ARRAY['search_path=public']
                    AND p.prorettype = 'jsonb'::regtype) THEN
    RAISE EXCEPTION 'T16 B1: the header is not the one this file writes';
  END IF;
  v_def := pg_get_functiondef('public.move_listing_photo(uuid, uuid, integer)'::regprocedure);
  IF position('RAISE EXCEPTION ''not your listing''' IN v_def) = 0
     OR position('RAISE EXCEPTION ''photo not found on this listing''' IN v_def) = 0
     OR position('RAISE EXCEPTION ''bad position''' IN v_def) = 0
     OR position('SET display_order = -1 - display_order' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T16 B1: the body is not the one this file writes';
  END IF;
  -- B2: the grants.
  IF has_function_privilege('anon', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.move_listing_photo(uuid, uuid, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'T16 B2: the grants are not the ones this file writes';
  END IF;
  -- B3: no caller is refused before anything is read (a random listing and photo; nothing exists to touch).
  PERFORM set_config('request.jwt.claims', '{}', true);
  v_state := NULL;
  BEGIN
    PERFORM public.move_listing_photo(gen_random_uuid(), gen_random_uuid(), 0);
  EXCEPTION WHEN OTHERS THEN
    v_state := SQLSTATE;
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not authenticated' THEN
    RAISE EXCEPTION 'T16 B3: expected "not authenticated", got % %', coalesce(v_state, 'no error'), coalesce(v_err, '');
  END IF;
  -- B4: a caller who owns no such listing is refused.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'role', 'authenticated')::text, true);
  v_err := NULL;
  BEGIN
    PERFORM public.move_listing_photo(gen_random_uuid(), gen_random_uuid(), 0);
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not your listing' THEN
    RAISE EXCEPTION 'T16 B4: expected "not your listing", got %', coalesce(v_err, 'no error');
  END IF;
  PERFORM set_config('request.jwt.claims', '{}', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014050000') ON CONFLICT (version) DO NOTHING;
