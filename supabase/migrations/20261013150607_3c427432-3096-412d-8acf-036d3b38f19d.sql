-- Bundle 12 (the tidy-up round), turn T15 (2026-10-13). Tier A. Make cover moves the photo to the front (INC-597, D154).
-- e2e-areas: posting
-- The rule (D154, the operator, 2026-10-13): the first photo is the cover, and Make cover moves a photo to first
-- place. Today set_cover_photo writes listings.cover_photo_id, which no screen reads: the photo step's Cover label and
-- every preview take the first photo by display_order (src/features/posting/step-photos.tsx, listing-preview.tsx), so
-- Make cover changed nothing a person sees (INC-597).
-- Live beside file (ethio-prod, pg_proc, read in this turn's census): set_cover_photo(uuid, uuid) RETURNS jsonb;
--   provolatile v; prosecdef t; proconfig {search_path=public}; md5(prosrc) a6ffb211add210f21e733c668655dd82
--   (633 characters). The body below is that text with ONE change: after the checks, the chosen photo moves to
--   display_order 0 and the others follow in their old order, closed up from 1; cover_photo_id is still set.
--   display_order is unique per listing and every stored value is 0 or more (register_listing_photo takes the
--   highest plus one), so the move runs in two passes: every photo of the listing to a negative value (-1 minus
--   the old one), then each to its new place.
-- A. set_cover_photo redeclared; its REVOKE and GRANTs restated as they were.
-- B. Proofs: the catalogue only — the new body, the unchanged header and grants. The move itself is proven by
--    PP-15 (e2e/photo-pipeline.spec.ts) through the photo route, on the app's own connection: a proof block would
--    need a listing, and a listing needs a real account (listings.seller_id references auth.users).

-- ===== A — Make cover moves the photo to the front =====
CREATE OR REPLACE FUNCTION public.set_cover_photo(p_listing_id uuid, p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  -- D154: the cover is the first photo. Pass 1 moves every photo of this listing out of the way (-1 minus its
  -- place); pass 2 puts the chosen photo at 0 and the others behind it in their old order.
  UPDATE public.listing_photos SET display_order = -1 - display_order
   WHERE listing_id = p_listing_id;
  UPDATE public.listing_photos AS p SET display_order = o.place
    FROM (SELECT x.id,
                 (row_number() OVER (ORDER BY (x.id = p_photo_id) DESC, x.display_order DESC) - 1)::integer AS place
            FROM public.listing_photos x
           WHERE x.listing_id = p_listing_id) AS o
   WHERE p.id = o.id AND p.listing_id = p_listing_id;
  UPDATE public.listings SET cover_photo_id = p_photo_id, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'cover_photo_id', p_photo_id);
END $$;

REVOKE ALL ON FUNCTION public.set_cover_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_cover_photo(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.set_cover_photo(uuid, uuid) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_def text;
BEGIN
  -- B1: the move is in the live body, the old checks are kept, and the header is unchanged.
  v_def := pg_get_functiondef('public.set_cover_photo(uuid, uuid)'::regprocedure);
  IF position('SET display_order = -1 - display_order' IN v_def) = 0
     OR position('ORDER BY (x.id = p_photo_id) DESC, x.display_order DESC' IN v_def) = 0
     OR position('RAISE EXCEPTION ''not your listing''' IN v_def) = 0
     OR position('RAISE EXCEPTION ''photo not found on this listing''' IN v_def) = 0
     OR position('SET cover_photo_id = p_photo_id' IN v_def) = 0 THEN
    RAISE EXCEPTION 'T15 B1: the body is not the one this file writes';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
                  WHERE p.oid = 'public.set_cover_photo(uuid, uuid)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v'
                    AND p.proconfig = ARRAY['search_path=public']
                    AND p.prorettype = 'jsonb'::regtype) THEN
    RAISE EXCEPTION 'T15 B1: the header changed';
  END IF;
  -- B2: the grants are as they were.
  IF has_function_privilege('anon', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.set_cover_photo(uuid, uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'T15 B2: the grants changed';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014040000') ON CONFLICT (version) DO NOTHING;
