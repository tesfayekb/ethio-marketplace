-- FIXTURE (DEC-054, case a): migration A declares a mark BELOW its filename
-- stamp. Authored input, never derived from a real ledger.
INSERT INTO public.migration_marks (version) VALUES ('20250101000000')
ON CONFLICT (version) DO NOTHING;
