-- ============================================================
-- R-MARK — MARK HEALER (DEC-022 / INC-094).
-- The migration 20260920035859_59a77c4c-ef00-4c57-9bce-79a4284a01d4.sql
-- (the two console readers re-declared WHOLE to project allowed_options,
-- default_value and visible_when) declared the mark '20260920000008', which
-- PRECEDES its own filename stamp '20260920035859'. Migration files are
-- append-only and cannot be edited (INC-094), so the ledger is healed here and
-- that file is listed in scripts/migration-mark-allowlist.txt citing this
-- corrective.
-- No schema, no function, no policy, no application data.
-- ============================================================
INSERT INTO public.migration_marks(version) VALUES
  ('20260920035859'),   -- healed filename stamp of 59a77c4c
  ('20260920040000')    -- R-MARK declared corrective mark
ON CONFLICT DO NOTHING;

INSERT INTO public.migration_marks(version) VALUES ('20260920080000') ON CONFLICT DO NOTHING;