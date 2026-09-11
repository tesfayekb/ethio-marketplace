-- FIXTURE (DEC-054, case c): second healer, X -> Y. The remap is transitive.
UPDATE public.migration_marks SET version = '20260103000000' WHERE version = '20260101000000';
INSERT INTO public.migration_marks (version) VALUES ('20260104000000')
ON CONFLICT (version) DO NOTHING;
