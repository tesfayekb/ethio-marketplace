-- FIXTURE (DEC-054, case c): A is healed to X by H1, then X is healed to Y by H2.
INSERT INTO public.migration_marks (version) VALUES ('20250101000000')
ON CONFLICT (version) DO NOTHING;
