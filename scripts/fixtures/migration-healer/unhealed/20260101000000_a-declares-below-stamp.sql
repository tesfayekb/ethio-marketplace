-- FIXTURE (DEC-054, case b): A alone, with no healer. Its literal mark stands.
INSERT INTO public.migration_marks (version) VALUES ('20250101000000')
ON CONFLICT (version) DO NOTHING;
