-- IMPORT-GATE PART B (mark healing). The import_lib migration
-- 20260909054432 landed without its self-mark; this corrective records it and
-- its own, keeping the ledger monotonic (DEC-022). No behaviour change.
INSERT INTO public.migration_marks(version) VALUES ('20260909054432') ON CONFLICT DO NOTHING;
INSERT INTO public.migration_marks(version) VALUES ('20260909060000') ON CONFLICT DO NOTHING;