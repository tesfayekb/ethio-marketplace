-- D37-1 linter corrective: route-only dial
REVOKE ALL ON FUNCTION public.consume_catalog_find_rate(text, integer) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.consume_catalog_find_rate(text, integer) TO service_role;

DO $$
BEGIN
  IF has_function_privilege('anon', 'public.consume_catalog_find_rate(text, integer)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.consume_catalog_find_rate(text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READBACK: client role can consume catalog finder dial';
  END IF;
  IF NOT has_function_privilege('service_role', 'public.consume_catalog_find_rate(text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'READBACK: route cannot consume catalog finder dial';
  END IF;
END
$$;

INSERT INTO public.migration_marks(version) VALUES ('20260924022000') ON CONFLICT DO NOTHING;