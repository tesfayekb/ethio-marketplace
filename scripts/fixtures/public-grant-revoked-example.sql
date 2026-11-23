-- Fixture for the public-surface guard (INC-1262): a grant to a browser role that a later REVOKE
-- in the same file closes again. The guard reads both, in file order: no offender.
GRANT EXECUTE ON FUNCTION public.e2e_fixture_closed_fn(uuid) TO anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.e2e_fixture_closed_fn(uuid) FROM PUBLIC, anon, authenticated;
