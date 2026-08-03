-- INC-022: remove the fabricated 'US' country sentinel and its false 'ip_guess' provenance.
-- Unknown representation chosen: NULL in home_country_code (column made NULLable).
-- Rationale: nothing structurally depends on NOT NULL here — the FK to public.countries
-- accepts NULL, and no view/index/policy requires a value. NULL is the honest "no value",
-- whereas an 'XX' sentinel would be another fabricated country code on a geography path.

-- (a) Widen the country_source CHECK constraints.
ALTER TABLE public.user_directory DROP CONSTRAINT user_directory_country_source_check;
ALTER TABLE public.user_directory ADD CONSTRAINT user_directory_country_source_check
  CHECK (country_source IN ('ip_guess','user_confirmed','unknown'));

ALTER TABLE public.profiles DROP CONSTRAINT profiles_country_source_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_country_source_check
  CHECK (country_source IN ('ip_guess','user_confirmed','unknown'));

-- (b) Defaults become 'unknown'.
ALTER TABLE public.user_directory ALTER COLUMN country_source SET DEFAULT 'unknown';
ALTER TABLE public.profiles ALTER COLUMN country_source SET DEFAULT 'unknown';

-- (c) home_country_code becomes NULLable; NULL means "not known yet".
ALTER TABLE public.user_directory ALTER COLUMN home_country_code DROP NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN home_country_code DROP NOT NULL;

-- (d) Data correction: no real IP guess has ever been made; every 'ip_guess' row to
-- date is the fabricated 'US' sentinel written by the old trigger fallback.
UPDATE public.user_directory
  SET country_source = 'unknown', home_country_code = NULL
  WHERE country_source = 'ip_guess';

UPDATE public.profiles
  SET country_source = 'unknown', home_country_code = NULL, updated_at = now()
  WHERE country_source = 'ip_guess';

-- (e) Trigger: no fabricated fallback. A country is recorded only when a real hint
-- arrives and resolves against public.countries.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_name text;
  v_country char(2);
  v_source text;
BEGIN
  v_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'full_name',''),
    NULLIF(NEW.raw_user_meta_data->>'name',''),
    split_part(NEW.email, '@', 1),
    'user'
  );
  v_country := upper(NULLIF(NEW.raw_user_meta_data->>'country_guess',''));
  IF v_country IS NULL OR NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_country) THEN
    v_country := NULL;
    v_source := 'unknown';
  ELSE
    v_source := 'ip_guess';
  END IF;

  INSERT INTO public.user_directory (user_id, home_country_code, country_source)
    VALUES (NEW.id, v_country, v_source);
  INSERT INTO public.profiles (user_id, home_country_code, country_source, display_name)
    VALUES (NEW.id, v_country, v_source, v_name);
  RETURN NEW;
END; $function$;

-- (f) Confirmation acts on both weaker provenances.
CREATE OR REPLACE FUNCTION public.confirm_home_country(p_country character)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = upper(p_country)) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;
  UPDATE public.user_directory SET home_country_code = upper(p_country),
    country_source = 'user_confirmed'
    WHERE user_id = auth.uid() AND country_source IN ('ip_guess','unknown');
  IF NOT FOUND THEN RAISE EXCEPTION 'country already confirmed'; END IF;
  UPDATE public.profiles SET home_country_code = upper(p_country),
    country_source = 'user_confirmed', updated_at = now()
    WHERE user_id = auth.uid();
END; $function$;