-- D37-1 rate-limit route test seam
CREATE OR REPLACE FUNCTION public.consume_catalog_find_rate(p_key text, p_limit integer DEFAULT 120)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF p_key IS NULL OR p_key !~ '^[a-f0-9]{64}$' OR p_limit < 1 OR p_limit > 120 THEN
    RAISE EXCEPTION 'badRateInput' USING ERRCODE = '22023';
  END IF;
  RETURN public.consume_rate_limit('catalog_find', p_key, p_limit, interval '1 hour');
END
$$;
REVOKE ALL ON FUNCTION public.consume_catalog_find_rate(text, integer) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.consume_catalog_find_rate(text, integer) TO service_role;
INSERT INTO public.migration_marks(version) VALUES ('20260924027000') ON CONFLICT DO NOTHING;