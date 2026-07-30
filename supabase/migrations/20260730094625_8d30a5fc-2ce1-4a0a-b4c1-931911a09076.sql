COMMENT ON TABLE public.profiles IS
  'RLS: owner SELECT/UPDATE only. NO INSERT policy BY DESIGN: rows are created exclusively by the handle_new_user() trigger on auth.users. Do not add user INSERT policies.';

COMMENT ON TABLE public.user_directory IS
  'RLS: owner SELECT only. NO INSERT/UPDATE/DELETE policies BY DESIGN: created by handle_new_user() trigger; mutated only via SECURITY DEFINER functions (confirm_home_country) and future admin machinery.';