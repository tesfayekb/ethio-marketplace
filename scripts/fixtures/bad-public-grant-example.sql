-- Fixture for the public-surface guard: an unlisted grant to a browser role.
GRANT SELECT ON public.e2e_fixture_secret_table TO anon;
GRANT EXECUTE
  ON FUNCTION public.e2e_fixture_secret_fn(uuid)
  TO authenticated;
