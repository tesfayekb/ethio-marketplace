-- Phase A3 — seller profile foundations (F12 + F13), personal-only v1 per DEC-013.
--
-- PUBLIC EXPOSURE: NONE. profiles stays owner-read + admin-read.
-- Do NOT add a public/anon read policy to public.profiles. The seller detail card
-- (Phase B3) will expose alias/contact through a SECURITY DEFINER get_seller_card()
-- gated to listings in status 'active' — never through a table read policy.

-- A. COLUMNS -----------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS seller_alias text,
  ADD COLUMN IF NOT EXISTS contact_phone text,
  ADD COLUMN IF NOT EXISTS show_phone boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS contact_telegram text,
  ADD COLUMN IF NOT EXISTS show_telegram boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS contact_whatsapp boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS default_post_location_id uuid REFERENCES public.locations(id);

-- B. VALIDATION LAWS ---------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='profiles_alias_format' AND conrelid='public.profiles'::regclass) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_alias_format CHECK (
      seller_alias IS NULL OR (
        char_length(seller_alias) BETWEEN 3 AND 30
        AND seller_alias ~ '^[A-Za-z0-9][A-Za-z0-9 _.-]*[A-Za-z0-9]$'
      )
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='profiles_phone_format' AND conrelid='public.profiles'::regclass) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_phone_format CHECK (
      contact_phone IS NULL OR contact_phone ~ '^\+[0-9]{7,15}$'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='profiles_telegram_format' AND conrelid='public.profiles'::regclass) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_telegram_format CHECK (
      contact_telegram IS NULL OR contact_telegram ~ '^[A-Za-z0-9_]{5,32}$'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='profiles_show_needs_value' AND conrelid='public.profiles'::regclass) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_show_needs_value CHECK (
      (NOT show_phone OR contact_phone IS NOT NULL)
      AND (NOT show_telegram OR contact_telegram IS NOT NULL)
      AND (NOT contact_whatsapp OR contact_phone IS NOT NULL)
    );
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_alias_unique
  ON public.profiles (lower(seller_alias))
  WHERE seller_alias IS NOT NULL;

CREATE OR REPLACE FUNCTION public.profiles_default_location_check()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.default_post_location_id IS NOT NULL
     AND (TG_OP = 'INSERT' OR NEW.default_post_location_id IS DISTINCT FROM OLD.default_post_location_id) THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.locations
       WHERE id = NEW.default_post_location_id AND is_active = true
    ) THEN
      RAISE EXCEPTION 'default post location must be a known, active location';
    END IF;
  END IF;
  RETURN NEW;
END; $$;

REVOKE ALL ON FUNCTION public.profiles_default_location_check() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS profiles_default_location_check ON public.profiles;
CREATE TRIGGER profiles_default_location_check
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_default_location_check();

-- C. GRANT EXTENSION (censused columns + the seven new ones) -----------------
GRANT UPDATE (
  display_name,
  avatar_url,
  preferred_language,
  viewing_location,
  notification_prefs,
  contact_prefs,
  updated_at,
  seller_alias,
  contact_phone,
  show_phone,
  contact_telegram,
  show_telegram,
  contact_whatsapp,
  default_post_location_id
) ON public.profiles TO authenticated;

-- E. IN-MIGRATION PROOFS ------------------------------------------------------
DO $$
DECLARE
  u1 uuid; u2 uuid;
  snap1 public.profiles%ROWTYPE;
  snap2 public.profiles%ROWTYPE;
  loc_inactive uuid; loc_active uuid; ctry char(2); parent_loc uuid;
  ok boolean;
BEGIN
  SELECT user_id INTO u1 FROM public.profiles ORDER BY created_at LIMIT 1;
  IF u1 IS NULL THEN RAISE NOTICE 'SKIP: no profiles rows'; RETURN; END IF;
  SELECT user_id INTO u2 FROM public.profiles WHERE user_id <> u1 ORDER BY created_at LIMIT 1;
  SELECT * INTO snap1 FROM public.profiles WHERE user_id = u1;
  IF u2 IS NOT NULL THEN SELECT * INTO snap2 FROM public.profiles WHERE user_id = u2; END IF;

  -- P1 alias format
  ok := false;
  BEGIN
    UPDATE public.profiles SET seller_alias = 'ab' WHERE user_id = u1;
  EXCEPTION WHEN check_violation THEN ok := true;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P1 FAILED: short alias accepted'; END IF;
  UPDATE public.profiles SET seller_alias = 'Valid Seller.1' WHERE user_id = u1;
  RAISE NOTICE 'P1 PASS: ''ab'' rejected; ''Valid Seller.1'' accepted';

  -- P2 case-insensitive uniqueness
  IF u2 IS NULL THEN
    RAISE NOTICE 'P2 SKIP: fewer than two profiles';
  ELSE
    ok := false;
    BEGIN
      UPDATE public.profiles SET seller_alias = 'VALID seller.1' WHERE user_id = u2;
    EXCEPTION WHEN unique_violation THEN ok := true;
    END;
    IF NOT ok THEN RAISE EXCEPTION 'P2 FAILED: duplicate alias accepted'; END IF;
    RAISE NOTICE 'P2 PASS: case-insensitive duplicate rejected';
  END IF;

  -- P3 phone laws
  ok := false;
  BEGIN
    UPDATE public.profiles SET contact_phone = '0911223344' WHERE user_id = u1;
  EXCEPTION WHEN check_violation THEN ok := true;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P3 FAILED: non-E.164 phone accepted'; END IF;
  UPDATE public.profiles SET contact_phone = '+251911223344' WHERE user_id = u1;
  ok := false;
  BEGIN
    UPDATE public.profiles SET contact_phone = NULL, show_phone = true WHERE user_id = u1;
  EXCEPTION WHEN check_violation THEN ok := true;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P3 FAILED: show_phone with NULL phone accepted'; END IF;
  RAISE NOTICE 'P3 PASS: bad phone rejected; +251911223344 accepted; show_phone without value rejected';

  -- P4 default location law
  SELECT id, country_code INTO parent_loc, ctry
    FROM public.locations WHERE parent_id IS NULL ORDER BY country_code LIMIT 1;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active)
    VALUES (parent_loc, 'region', ctry, 'A3 scratch inactive', 'a3-scratch-inactive-'||gen_random_uuid(), false)
    RETURNING id INTO loc_inactive;
  INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active)
    VALUES (parent_loc, 'region', ctry, 'A3 scratch active', 'a3-scratch-active-'||gen_random_uuid(), true)
    RETURNING id INTO loc_active;
  ok := false;
  BEGIN
    UPDATE public.profiles SET default_post_location_id = loc_inactive WHERE user_id = u1;
  EXCEPTION WHEN others THEN ok := true;
  END;
  IF NOT ok THEN RAISE EXCEPTION 'P4 FAILED: inactive location accepted'; END IF;
  UPDATE public.profiles SET default_post_location_id = loc_active WHERE user_id = u1;
  UPDATE public.profiles SET default_post_location_id = NULL WHERE user_id = u1;
  DELETE FROM public.locations WHERE id IN (loc_inactive, loc_active);
  IF EXISTS (SELECT 1 FROM public.locations WHERE id IN (loc_inactive, loc_active)) THEN
    RAISE EXCEPTION 'P4 FAILED: scratch locations not cleaned';
  END IF;
  RAISE NOTICE 'P4 PASS: inactive rejected; active accepted; scratch cleaned';

  -- P5 column-grant law under impersonation (INC-064: dynamic real user)
  ok := false;
  BEGIN
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u1::text, 'role', 'authenticated')::text, true);
    SET LOCAL ROLE authenticated;
    UPDATE public.profiles SET seller_alias = 'A3 Proof Alias' WHERE user_id = u1;
    BEGIN
      UPDATE public.profiles SET home_country_code = home_country_code WHERE user_id = u1;
    EXCEPTION WHEN insufficient_privilege THEN ok := true;
    END;
    RESET ROLE;
  EXCEPTION WHEN others THEN
    RESET ROLE; RAISE;
  END;
  PERFORM set_config('request.jwt.claims', NULL, true);
  IF NOT ok THEN RAISE EXCEPTION 'P5 FAILED: home_country_code update was permitted'; END IF;
  RAISE NOTICE 'P5 PASS: owner may set seller_alias; home_country_code denied (42501)';

  -- RESTORE
  UPDATE public.profiles SET
    seller_alias = snap1.seller_alias,
    contact_phone = snap1.contact_phone,
    show_phone = snap1.show_phone,
    contact_telegram = snap1.contact_telegram,
    show_telegram = snap1.show_telegram,
    contact_whatsapp = snap1.contact_whatsapp,
    default_post_location_id = snap1.default_post_location_id,
    updated_at = snap1.updated_at
  WHERE user_id = u1;
  IF u2 IS NOT NULL THEN
    UPDATE public.profiles SET
      seller_alias = snap2.seller_alias,
      updated_at = snap2.updated_at
    WHERE user_id = u2;
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.user_id = u1
      AND (p.seller_alias IS DISTINCT FROM snap1.seller_alias
        OR p.contact_phone IS DISTINCT FROM snap1.contact_phone
        OR p.show_phone IS DISTINCT FROM snap1.show_phone
        OR p.default_post_location_id IS DISTINCT FROM snap1.default_post_location_id)
  ) THEN
    RAISE EXCEPTION 'RESTORE FAILED for u1';
  END IF;
  IF u2 IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.user_id = u2 AND p.seller_alias IS DISTINCT FROM snap2.seller_alias
  ) THEN
    RAISE EXCEPTION 'RESTORE FAILED for u2';
  END IF;
  RAISE NOTICE 'RESTORE PASS: all touched profile fields returned to pre-proof values';
END $$;