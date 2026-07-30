-- Identity: global directory + partitioned profile (Phase 1, REQ-033/DEC-008).
CREATE TABLE public.user_directory (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  home_country_code char(2) NOT NULL REFERENCES public.countries(code),
  country_source text NOT NULL DEFAULT 'ip_guess'
    CHECK (country_source IN ('ip_guess','user_confirmed')),
  handle text UNIQUE,
  account_status text NOT NULL DEFAULT 'active'
    CHECK (account_status IN ('active','frozen','banned')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.user_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "directory_owner_read" ON public.user_directory
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
GRANT SELECT ON public.user_directory TO authenticated;
-- Deliberately NO insert/update/delete policies or grants: writes occur only
-- via SECURITY DEFINER functions below. Deny-by-default.

CREATE TABLE public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  home_country_code char(2) NOT NULL REFERENCES public.countries(code),
  country_source text NOT NULL DEFAULT 'ip_guess'
    CHECK (country_source IN ('ip_guess','user_confirmed')),
  display_name text NOT NULL,
  avatar_url text,
  preferred_language text NOT NULL DEFAULT 'en',
  viewing_location jsonb,
  notification_prefs jsonb NOT NULL DEFAULT '{}',
  contact_prefs jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_owner_read" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "profiles_owner_update" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (display_name, avatar_url, preferred_language, viewing_location,
  notification_prefs, contact_prefs, updated_at)
  ON public.profiles TO authenticated;
-- Column-scoped UPDATE grant: home_country_code and country_source are NOT
-- user-writable; they change only via confirm_home_country().

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_name text;
  v_country char(2);
BEGIN
  v_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'full_name',''),
    NULLIF(NEW.raw_user_meta_data->>'name',''),
    split_part(NEW.email, '@', 1),
    'user'
  );
  v_country := upper(COALESCE(NULLIF(NEW.raw_user_meta_data->>'country_guess',''), 'US'));
  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = v_country) THEN
    v_country := 'US';
  END IF;
  INSERT INTO public.user_directory (user_id, home_country_code)
    VALUES (NEW.id, v_country);
  INSERT INTO public.profiles (user_id, home_country_code, display_name)
    VALUES (NEW.id, v_country, v_name);
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.confirm_home_country(p_country char(2))
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE code = upper(p_country)) THEN
    RAISE EXCEPTION 'unknown country';
  END IF;
  UPDATE public.user_directory SET home_country_code = upper(p_country),
    country_source = 'user_confirmed'
    WHERE user_id = auth.uid() AND country_source = 'ip_guess';
  IF NOT FOUND THEN RAISE EXCEPTION 'country already confirmed'; END IF;
  UPDATE public.profiles SET home_country_code = upper(p_country),
    country_source = 'user_confirmed', updated_at = now()
    WHERE user_id = auth.uid();
END; $$;
GRANT EXECUTE ON FUNCTION public.confirm_home_country(char) TO authenticated;