-- M1 follow-up: the three new server-only tables get explicit deny-all
-- policies, the same pattern rate_limits already carries. RLS stays enabled;
-- no client role has a grant, so these policies can never pass for a browser.

CREATE POLICY rate_dials_no_client ON public.rate_dials
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY rate_overrides_no_client ON public.rate_overrides
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY contact_reveals_no_client ON public.contact_reveals
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='rate_dials' AND policyname='rate_dials_no_client')
     OR NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='rate_overrides' AND policyname='rate_overrides_no_client')
     OR NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='contact_reveals' AND policyname='contact_reveals_no_client') THEN
    RAISE EXCEPTION 'PROOF policies: a deny-all policy is missing';
  END IF;
END $$;