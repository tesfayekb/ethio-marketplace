-- Function hardening: strip default PUBLIC EXECUTE (deny-by-default).
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.confirm_home_country(char) FROM PUBLIC, anon;
-- confirm_home_country keeps its existing GRANT to authenticated.