-- ============================================================
-- M-MAINT — MARK HEALER (DEC-022). The four migrations landed this turn each
-- declared a mark authored BEFORE the tool assigned the filename stamp, so the
-- declared literal precedes the stamp. The files cannot be edited (append-only,
-- INC-094), so the ledger is healed here and each file is listed in
-- scripts/migration-mark-allowlist.txt citing this corrective.
-- No schema, no function, no policy, no application data.
-- ============================================================
INSERT INTO public.migration_marks(version) VALUES
  ('20260917205429'),   -- INC-215 + INC-220
  ('20260917210006'),   -- categories cells + option facts
  ('20260917210349'),   -- proofs P3/P4
  ('20260917210459')    -- proof P1
ON CONFLICT DO NOTHING;

INSERT INTO public.migration_marks(version) VALUES ('20260918000000') ON CONFLICT DO NOTHING;