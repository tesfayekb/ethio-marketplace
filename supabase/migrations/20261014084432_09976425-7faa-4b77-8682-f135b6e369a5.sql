-- Bundle 13 (photos), turn 10 (2026-10-14). Tier A. D154 B3 — a photo that may not show what the ad sells is stored with a
-- warning; D154 B5 — the photo changes a seller makes on a live ad are listed for staff.
--
-- A. listing_photo_warnings (NEW): one row per photo the screen warned about — its codes (today only `not_relevant`). It
--    is a table of its own, not a column on listing_photos, so that no visitor reads a warning: the seller reads his own
--    photos' rows, staff with listings:view read every row, and nobody else reads any. Rows are written only by the photo
--    doors below; a photo's row goes with the photo (ON DELETE CASCADE).
-- B. listing_photo_changes (NEW): one row per photo a seller adds, edits or removes while the ad is live (`active` or
--    `reduced`), with the screen's warnings; staff with listings:review read it and mark a row reviewed through the door
--    in F. A staff removal is not a seller's change (History keeps it) and is not listed.
-- C. register_listing_photo, redeclared whole from its live definition (20261014022725; census (d)) with `p_warnings`
--    (default none): the warning row, and on a live ad an `added` change. The seven-argument signature is dropped and its
--    grants are restated for the eight.
-- D. replace_listing_photo, redeclared whole from its live definition (turn 9; census (d)) with `p_warnings`: the new
--    photo's warning row, and on a live ad an `edited` change naming the photo it replaced. The eight-argument signature is
--    dropped and its grants are restated for the nine.
-- E. remove_listing_photo, redeclared whole from its live definition (20260917113152; census (d)): on a live ad, a
--    `removed` change. Its signature does not change; its grants are restated.
-- F. admin_review_photo_change (NEW): listings:review marks one change reviewed and audits
--    `listing.photo_change_reviewed`.
-- G. The listing-photos bucket's public read rule (`listing_photos_object_public_read`, 20260804174739) is dropped: since
--    D151 (INC-588) every photo is read through a short-lived link the server signs with the service role, which no
--    storage rule governs, so a visitor needs no rule of his own on the bucket. The owner's rules stay as they are.
-- H. Proofs (structure, body markers, policies, grants; RAISE EXCEPTION on any failure). No proof touches a real row or
--    auth.users. What the doors write is proven by the routes' own tests (PP-29, SC-21), through the app's connection.

-- ===== A — listing_photo_warnings =====
CREATE TABLE IF NOT EXISTS public.listing_photo_warnings (
  photo_id   uuid PRIMARY KEY REFERENCES public.listing_photos(id) ON DELETE CASCADE,
  -- The listing is the photo's (no second foreign key: the row goes with its photo, and the
  -- photo with its listing).
  listing_id uuid NOT NULL,
  codes      text[] NOT NULL CHECK (cardinality(codes) > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS listing_photo_warnings_listing_idx ON public.listing_photo_warnings (listing_id);
ALTER TABLE public.listing_photo_warnings ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.listing_photo_warnings FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_photo_warnings TO authenticated;
GRANT ALL ON public.listing_photo_warnings TO service_role;
DROP POLICY IF EXISTS listing_photo_warnings_seller_read ON public.listing_photo_warnings;
CREATE POLICY listing_photo_warnings_seller_read ON public.listing_photo_warnings
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.listings l
                 WHERE l.id = listing_photo_warnings.listing_id AND l.seller_id = auth.uid()));
DROP POLICY IF EXISTS listing_photo_warnings_admin_read ON public.listing_photo_warnings;
CREATE POLICY listing_photo_warnings_admin_read ON public.listing_photo_warnings
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'view'));

-- ===== B — listing_photo_changes =====
CREATE TABLE IF NOT EXISTS public.listing_photo_changes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id       uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  kind             text NOT NULL CHECK (kind IN ('added', 'edited', 'removed')),
  photo_id         uuid NOT NULL,
  replaced_photo_id uuid NULL,
  codes            text[] NOT NULL DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now(),
  reviewed_at      timestamptz NULL,
  reviewed_by      uuid NULL
);
CREATE INDEX IF NOT EXISTS listing_photo_changes_open_idx
  ON public.listing_photo_changes (created_at) WHERE reviewed_at IS NULL;
CREATE INDEX IF NOT EXISTS listing_photo_changes_listing_idx ON public.listing_photo_changes (listing_id);
ALTER TABLE public.listing_photo_changes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.listing_photo_changes FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.listing_photo_changes TO authenticated;
GRANT ALL ON public.listing_photo_changes TO service_role;
DROP POLICY IF EXISTS listing_photo_changes_admin_read ON public.listing_photo_changes;
CREATE POLICY listing_photo_changes_admin_read ON public.listing_photo_changes
  FOR SELECT TO authenticated
  USING (public.has_permission(auth.uid(), 'listings', 'review'));

-- ===== C — register_listing_photo, whole, with p_warnings =====
DROP FUNCTION IF EXISTS public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean);

CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[]
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22 — the plan's photo cap is the authority; the route's cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- D154 B5 — a photo added to a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, codes)
    VALUES (p_listing_id, 'added', p_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) TO service_role;

-- ===== D — replace_listing_photo, whole, with p_warnings =====
DROP FUNCTION IF EXISTS public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean);

CREATE OR REPLACE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[]
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid; v_status text;
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
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id FOR UPDATE;
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
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- D154 B5 — a photo edited on a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, replaced_photo_id, codes)
    VALUES (p_listing_id, 'edited', p_photo_id, p_old_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[]) TO service_role;

-- ===== E — remove_listing_photo, whole =====
CREATE OR REPLACE FUNCTION public.remove_listing_photo(p_listing_id uuid, p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_next uuid; v_status text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id AND seller_id = v_uid) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listing_photos
                  WHERE id = p_photo_id AND listing_id = p_listing_id) THEN
    RAISE EXCEPTION 'photo not found on this listing';
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_photo_id AND listing_id = p_listing_id;
  -- D154 B5 (bundle 13 turn 10) — a photo the seller removes from a live ad is listed for staff.
  SELECT status INTO v_status FROM public.listings WHERE id = p_listing_id;
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id)
    VALUES (p_listing_id, 'removed', p_photo_id);
  END IF;
  SELECT id INTO v_next FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, v_next), updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'removed', p_photo_id, 'cover_photo_id', v_next);
END $$;

REVOKE ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) TO service_role;

-- ===== F — admin_review_photo_change =====
CREATE OR REPLACE FUNCTION public.admin_review_photo_change(p_change_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_listing uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  UPDATE public.listing_photo_changes SET reviewed_at = now(), reviewed_by = v_uid
   WHERE id = p_change_id AND reviewed_at IS NULL
  RETURNING listing_id INTO v_listing;
  IF v_listing IS NULL THEN
    RAISE EXCEPTION 'changeGone';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'listing.photo_change_reviewed', 'listing', v_listing::text,
          jsonb_build_object('change', p_change_id));
  RETURN jsonb_build_object('ok', true, 'change', p_change_id);
END $$;

REVOKE ALL ON FUNCTION public.admin_review_photo_change(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_photo_change(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_review_photo_change(uuid) TO service_role;

-- ===== G — the bucket's public read rule =====
DROP POLICY IF EXISTS listing_photos_object_public_read ON storage.objects;

-- ===== H — proofs =====
DO $proof$
DECLARE
  v_src text;
  v_n   integer;
BEGIN
  -- A
  SELECT count(*) INTO v_n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public' AND c.relname = 'listing_photo_warnings' AND c.relrowsecurity;
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof A failed: listing_photo_warnings is missing or has no row security'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy
   WHERE polrelid = 'public.listing_photo_warnings'::regclass
     AND polname IN ('listing_photo_warnings_seller_read', 'listing_photo_warnings_admin_read') AND polcmd = 'r';
  IF v_n <> 2 THEN RAISE EXCEPTION 'proof A failed: the warnings table''s two read policies are not as written'; END IF;
  IF has_table_privilege('anon', 'public.listing_photo_warnings', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_photo_warnings', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_photo_warnings', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_photo_warnings', 'DELETE') THEN
    RAISE EXCEPTION 'proof A failed: a browser role can read the warnings without a session, or write them';
  END IF;
  -- B
  SELECT count(*) INTO v_n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public' AND c.relname = 'listing_photo_changes' AND c.relrowsecurity;
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof B failed: listing_photo_changes is missing or has no row security'; END IF;
  SELECT count(*) INTO v_n FROM pg_policy
   WHERE polrelid = 'public.listing_photo_changes'::regclass
     AND polname = 'listing_photo_changes_admin_read' AND polcmd = 'r'
     AND pg_get_expr(polqual, polrelid) LIKE '%''listings''%''review''%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof B failed: the changes table''s read policy is not as written'; END IF;
  IF has_table_privilege('anon', 'public.listing_photo_changes', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_photo_changes', 'INSERT')
     OR has_table_privilege('authenticated', 'public.listing_photo_changes', 'UPDATE')
     OR has_table_privilege('authenticated', 'public.listing_photo_changes', 'DELETE') THEN
    RAISE EXCEPTION 'proof B failed: a browser role can read the changes without a session, or write them';
  END IF;
  -- C
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof C failed: the seven-argument register_listing_photo is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%register_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_warnings%'
     OR v_src NOT LIKE '%v_status IN (''active'', ''reduced'')%'
     OR v_src NOT LIKE '%''added''%' OR v_src NOT LIKE '%tooManyPhotos%' THEN
    RAISE EXCEPTION 'proof C failed: the body of register_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof C failed: register_listing_photo is not the service role''s alone';
  END IF;
  -- D
  IF to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof D failed: the eight-argument replace_listing_photo is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])'::regprocedure
     AND prosecdef AND provolatile = 'v' AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%replace_listing_photo is called by the photo route only%'
     OR v_src NOT LIKE '%RAISE EXCEPTION ''photoGone''%' OR v_src NOT LIKE '%FOR UPDATE%'
     OR v_src NOT LIKE '%INSERT INTO public.listing_photo_warnings%' OR v_src NOT LIKE '%''edited''%' THEN
    RAISE EXCEPTION 'proof D failed: the body of replace_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR has_function_privilege('anon', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof D failed: replace_listing_photo is not the service role''s alone';
  END IF;
  -- E
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.remove_listing_photo(uuid, uuid)'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%not your listing%' OR v_src NOT LIKE '%photo not found on this listing%'
     OR v_src NOT LIKE '%''removed''%' THEN
    RAISE EXCEPTION 'proof E failed: the body of remove_listing_photo is not as written';
  END IF;
  -- F
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_review_photo_change(uuid)'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%'
     OR v_src NOT LIKE '%''listing.photo_change_reviewed''%' OR v_src NOT LIKE '%reviewed_at IS NULL%' THEN
    RAISE EXCEPTION 'proof F failed: the body of admin_review_photo_change is not as written';
  END IF;
  IF has_function_privilege('anon', 'public.admin_review_photo_change(uuid)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_review_photo_change(uuid)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof F failed: admin_review_photo_change''s grants are not as written';
  END IF;
  -- G
  IF EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'listing_photos_object_public_read'
              AND polrelid = 'storage.objects'::regclass) THEN
    RAISE EXCEPTION 'proof G failed: the bucket''s public read rule is still there';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261014120000') ON CONFLICT (version) DO NOTHING;
