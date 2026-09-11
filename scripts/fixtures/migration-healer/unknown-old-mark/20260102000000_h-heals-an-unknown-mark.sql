-- FIXTURE (DEC-054, case d): the healer's UPDATE names an old mark no local
-- migration declares. It must be ignored and warned about, never applied.
UPDATE public.migration_marks SET version = '20260101000000' WHERE version = '20259999000000';
INSERT INTO public.migration_marks (version) VALUES ('20260102000000')
ON CONFLICT (version) DO NOTHING;
