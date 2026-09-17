-- U6-A2-M2 — THE IDENTITY DOOR, THE PHOTO DOORS, INC-217.
-- Spec: docs/governance/u6-posting-spec.md §4 A2 (D17 identity); INC-217.
-- INC-183: whole re-declarations (DROP+CREATE where the return shape changes).
-- Declared mark: 20260917130000 (last statement).
-- Census note: no `reserved` handle table exists in this schema, so the
-- reserved word list is authored in-function and named here.

-- =====================================================================
-- 1. profiles — the seller-type facts of D17
-- =====================================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS seller_type text NOT NULL DEFAULT 'person',
  ADD COLUMN IF NOT EXISTS business_name text;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_seller_type_check') THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_seller_type_check CHECK (seller_type IN ('person','business'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_business_name_len') THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_business_name_len
      CHECK (business_name IS NULL OR char_length(btrim(business_name)) BETWEEN 2 AND 80);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_seller_alias_lower_key
  ON public.profiles (lower(seller_alias)) WHERE seller_alias IS NOT NULL;

-- =====================================================================
-- 2. listing_photos — the facts the strip route reports
-- =====================================================================
ALTER TABLE public.listing_photos
  ADD COLUMN IF NOT EXISTS width integer,
  ADD COLUMN IF NOT EXISTS height integer,
  ADD COLUMN IF NOT EXISTS bytes integer,
  ADD COLUMN IF NOT EXISTS paths jsonb NOT NULL DEFAULT '{}'::jsonb;

-- =====================================================================
-- 3. public.save_posting_identity — D17
-- =====================================================================
CREATE OR REPLACE FUNCTION public.save_posting_identity(
  p_alias text DEFAULT NULL,
  p_seller_type text DEFAULT NULL,
  p_business_name text DEFAULT NULL,
  p_contact_pref jsonb DEFAULT NULL,
  p_home_country_code char(2) DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_ref      jsonb := '[]'::jsonb;
  v_alias    text := lower(btrim(coalesce(p_alias, '')));
  v_type     text := nullif(btrim(coalesce(p_seller_type, '')), '');
  v_biz      text := nullif(btrim(coalesce(p_business_name, '')), '');
  v_country  char(2) := upper(nullif(btrim(coalesce(p_home_country_code, '')), ''));
  v_source   text;
  v_home     char(2);
  v_row      public.profiles%ROWTYPE;
  v_reserved text[] := ARRAY[
    'admin','administrator','ethio','ethiopia','ethiocom','eritrea','support',
    'help','staff','moderator','moderation','official','team','system','root',
    'security','billing','payments','sales','info','contact','about','null',
    'undefined','me','you','user','users','seller','sellers','buyer','buyers'];
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;

  -- ---- alias ----
  IF v_alias <> '' THEN
    IF v_alias !~ '^[a-z0-9_]{3,30}$' THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','badShape'));
    ELSIF v_alias = ANY (v_reserved) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','aliasReserved'));
    ELSIF EXISTS (SELECT 1 FROM public.profiles p
                   WHERE lower(p.seller_alias) = v_alias AND p.user_id <> v_uid) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','alias','reason','aliasTaken'));
    END IF;
  END IF;

  -- ---- seller type / business name ----
  IF v_type IS NOT NULL AND v_type NOT IN ('person','business') THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','seller_type','reason','badValue','detail',v_type));
  END IF;
  IF coalesce(v_type, (SELECT seller_type FROM public.profiles WHERE user_id = v_uid)) = 'business' THEN
    IF coalesce(v_biz, (SELECT business_name FROM public.profiles WHERE user_id = v_uid)) IS NULL THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','required'));
    END IF;
  END IF;
  IF v_biz IS NOT NULL AND char_length(v_biz) NOT BETWEEN 2 AND 80 THEN
    v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','business_name','reason','badLength'));
  END IF;

  -- ---- contact preferences: the same shape the draft door enforces ----
  IF p_contact_pref IS NOT NULL THEN
    v_ref := v_ref || public.listing_contact_refusals(p_contact_pref);
  END IF;

  -- ---- declared home country (never the observed fact) ----
  IF v_country IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = v_country) THEN
      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','unknownCountry','detail',v_country));
    ELSE
      SELECT d.country_source, d.home_country_code INTO v_source, v_home
        FROM public.user_directory d WHERE d.user_id = v_uid;
      IF v_source = 'user_confirmed' AND v_home IS DISTINCT FROM v_country THEN
        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','home_country_code','reason','countryAlreadyConfirmed','detail',v_home));
      END IF;
    END IF;
  END IF;

  IF jsonb_array_length(v_ref) > 0 THEN
    RETURN jsonb_build_object('ok', false, 'refusals', v_ref);
  END IF;

  -- Every field is optional: a NULL leaves the stored value alone.
  UPDATE public.profiles SET
    seller_alias  = coalesce(nullif(v_alias, ''), seller_alias),
    seller_type   = coalesce(v_type, seller_type),
    business_name = CASE WHEN coalesce(v_type, seller_type) = 'person' AND v_type = 'person'
                         THEN NULL ELSE coalesce(v_biz, business_name) END,
    contact_prefs = coalesce(p_contact_pref, contact_prefs),
    updated_at    = now()
  WHERE user_id = v_uid;

  IF v_country IS NOT NULL AND coalesce(v_source, 'unknown') <> 'user_confirmed' THEN
    PERFORM public.confirm_home_country(v_country);
  END IF;

  SELECT * INTO v_row FROM public.profiles WHERE user_id = v_uid;
  RETURN jsonb_build_object(
    'ok', true,
    'alias', v_row.seller_alias,
    'seller_type', v_row.seller_type,
    'business_name', v_row.business_name,
    'contact_prefs', v_row.contact_prefs,
    'home_country_code', v_row.home_country_code
  );
END $$;

REVOKE ALL ON FUNCTION public.save_posting_identity(text, text, text, jsonb, char) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_posting_identity(text, text, text, jsonb, char) TO authenticated;
GRANT ALL ON FUNCTION public.save_posting_identity(text, text, text, jsonb, char) TO service_role;

-- =====================================================================
-- 4. Photo doors. The storage objects belong to the strip route (A2-C/B1);
--    these doors own the rows only.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings WHERE id = p_listing_id) THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes)
  RETURNING id INTO p_photo_id;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer) TO service_role;

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
  UPDATE public.listings SET cover_photo_id = p_photo_id, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'cover_photo_id', p_photo_id);
END $$;

REVOKE ALL ON FUNCTION public.set_cover_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_cover_photo(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.set_cover_photo(uuid, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.remove_listing_photo(p_listing_id uuid, p_photo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_uid uuid := auth.uid(); v_next uuid;
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
  SELECT id INTO v_next FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, v_next), updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'removed', p_photo_id, 'cover_photo_id', v_next);
END $$;

REVOKE ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_listing_photo(uuid, uuid) TO authenticated;
GRANT ALL ON FUNCTION public.remove_listing_photo(uuid, uuid) TO service_role;

-- =====================================================================
-- 5. INC-217 — get_open_countries gains anchor_id (whole re-declaration;
--    the return shape changes, so DROP+CREATE, same order, same closers)
-- =====================================================================
DROP FUNCTION IF EXISTS public.get_open_countries();

CREATE OR REPLACE FUNCTION public.get_open_countries()
RETURNS TABLE (
  code          char(2),
  name_en       text,
  unit_system   text,
  currency_code char(3),
  display_order integer,
  anchor_slug   text,
  anchor_id     uuid
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT k.code, k.name_en, k.unit_system, k.currency_code, k.display_order,
         (SELECT l.slug FROM public.locations l
           WHERE l.country_code = k.code AND l.level = 'country'
           LIMIT 1) AS anchor_slug,
         (SELECT l.id FROM public.locations l
           WHERE l.country_code = k.code AND l.level = 'country'
           LIMIT 1) AS anchor_id
    FROM public.countries k
   WHERE k.is_active
   ORDER BY k.display_order, k.code;
$$;

REVOKE ALL ON FUNCTION public.get_open_countries() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_open_countries() TO anon, authenticated;
GRANT ALL ON FUNCTION public.get_open_countries() TO service_role;

-- =====================================================================
-- 6. PROOFS
-- =====================================================================
DO $proof$
DECLARE
  v_a  uuid := gen_random_uuid();
  v_b  uuid := gen_random_uuid();
  v_r  jsonb;
  v_n  int;
  v_msg text;
BEGIN
  INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
  VALUES (v_a, 'a2m2-a-'||substr(v_a::text,1,8)||'@example.invalid', '{}'::jsonb, now(), now()),
         (v_b, 'a2m2-b-'||substr(v_b::text,1,8)||'@example.invalid', '{}'::jsonb, now(), now());

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text)::text, true);

  -- P1 — a reserved alias is refused.
  v_r := public.save_posting_identity('admin', NULL, NULL, NULL, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'aliasReserved' THEN
    RAISE EXCEPTION 'P1 FAILED — %', v_r;
  END IF;

  -- P2 — the shape rule.
  v_r := public.save_posting_identity('No Spaces!', NULL, NULL, NULL, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'badShape' THEN
    RAISE EXCEPTION 'P2 FAILED — %', v_r;
  END IF;

  -- P3 — a good alias saves; the declared country is confirmed.
  v_r := public.save_posting_identity('a2m_proof_alias', 'person', NULL,
           '{"messages": true, "telegram": {"show": true, "value": "@proofhandle"}}'::jsonb, 'ET');
  IF NOT (v_r->>'ok')::boolean THEN RAISE EXCEPTION 'P3 FAILED — %', v_r; END IF;
  IF (v_r->>'home_country_code') <> 'ET' THEN RAISE EXCEPTION 'P3 FAILED — country %', v_r; END IF;
  IF (SELECT country_source FROM public.user_directory WHERE user_id = v_a) <> 'user_confirmed' THEN
    RAISE EXCEPTION 'P3 FAILED — the country was not confirmed';
  END IF;
  -- The observed fact is untouched by the identity door.
  IF (SELECT observed_country_code FROM public.user_directory WHERE user_id = v_a) IS NOT NULL THEN
    RAISE EXCEPTION 'P3 FAILED — the identity door wrote the observed fact';
  END IF;

  -- P4 — case-insensitive uniqueness across accounts.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_b::text)::text, true);
  v_r := public.save_posting_identity('A2M_Proof_Alias', NULL, NULL, NULL, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'aliasTaken' THEN
    RAISE EXCEPTION 'P4 FAILED — %', v_r;
  END IF;

  -- P5 — a business needs a name; then the partial update keeps the alias.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_a::text)::text, true);
  v_r := public.save_posting_identity(NULL, 'business', NULL, NULL, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'required' THEN
    RAISE EXCEPTION 'P5 FAILED — %', v_r;
  END IF;
  v_r := public.save_posting_identity(NULL, 'business', 'A2M Proof Trading', NULL, NULL);
  IF NOT (v_r->>'ok')::boolean OR (v_r->>'alias') <> 'a2m_proof_alias'
     OR (v_r->>'business_name') <> 'A2M Proof Trading' THEN
    RAISE EXCEPTION 'P5b FAILED — %', v_r;
  END IF;

  -- P6 — the contact shape is the draft door''s rule.
  v_r := public.save_posting_identity(NULL, NULL, NULL, '{"messages": true, "phone": {"show": true, "value": "abc"}}'::jsonb, NULL);
  IF (v_r->'refusals'->0->>'reason') <> 'badHandle' THEN
    RAISE EXCEPTION 'P6 FAILED — %', v_r;
  END IF;

  -- P7 — DENY: a signed-in caller cannot register a photo.
  BEGIN
    v_r := public.register_listing_photo(gen_random_uuid(), gen_random_uuid(),
             '{"original":"x/y.jpg"}'::jsonb, 10, 10, 100);
    RAISE EXCEPTION 'P7 FAILED — a signed-in caller registered a photo';
  EXCEPTION WHEN OTHERS THEN
    v_msg := SQLERRM;
    IF v_msg NOT LIKE '%photo route only%' THEN RAISE EXCEPTION 'P7 FAILED — %', v_msg; END IF;
  END;

  PERFORM set_config('request.jwt.claims', NULL, true);

  -- P8 — INC-217: every open market''s anchor_id is an active country-level place.
  SELECT count(*) INTO v_n FROM public.get_open_countries() c
   WHERE c.anchor_id IS NULL
      OR NOT EXISTS (SELECT 1 FROM public.locations l
                      WHERE l.id = c.anchor_id AND l.level = 'country' AND l.is_active);
  IF v_n > 0 THEN
    RAISE EXCEPTION 'P8 FAILED — % open market(s) without an active anchor', v_n;
  END IF;
  RAISE NOTICE 'READ-BACK PASS: get_open_countries carries anchor_id for every open market';

  -- CLEANUP
  DELETE FROM auth.users WHERE id IN (v_a, v_b);
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id IN (v_a, v_b)) THEN
    RAISE EXCEPTION 'CLEANUP FAILED — scratch profiles survived';
  END IF;
  RAISE NOTICE 'PROOFS PASS — identity door, photo deny, INC-217 anchor';
END $proof$;

INSERT INTO public.migration_marks(version) VALUES ('20260917130000') ON CONFLICT DO NOTHING;