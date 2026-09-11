-- FIXTURE (DEC-054, case d): A's literal mark, which no healer names.
INSERT INTO public.migration_marks (version) VALUES ('20250101000000')
ON CONFLICT (version) DO NOTHING;
