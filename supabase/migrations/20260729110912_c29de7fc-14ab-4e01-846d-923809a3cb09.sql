-- Countries reference table: root of the geography hierarchy (REQ-005/REQ-012).
-- Global reference data; publicly readable; writes deliberately impossible until
-- the admin/RBAC machinery exists (deny-by-default).
CREATE TABLE public.countries (
  code char(2) PRIMARY KEY CHECK (code = upper(code)),
  name_en text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "countries_public_read"
  ON public.countries FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON public.countries TO anon, authenticated;

INSERT INTO public.countries (code, name_en, is_active) VALUES
  ('ET', 'Ethiopia', true),
  ('US', 'United States', true),
  ('CA', 'Canada', false),
  ('GB', 'United Kingdom', false),
  ('DE', 'Germany', false),
  ('KE', 'Kenya', false);