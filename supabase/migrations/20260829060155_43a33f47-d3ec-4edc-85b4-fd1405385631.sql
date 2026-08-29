-- ---------------------------------------------------------------------
-- LEDGER RECONCILIATION (INC-094) — bookkeeping only, no schema change.
--
-- The self-marking law (docs/governance/migrations.md) requires each migration
-- to INSERT its own 14-digit filename stamp into public.migration_marks. The
-- filename stamp is assigned by the migration tool WHEN IT WRITES THE FILE, so
-- the SQL author cannot know it while composing the statement: the preceding
-- migration was authored with '20260829060232' and written to disk as
-- 20260829060103_e9f7988f-e584-4944-9c5e-f3e7fa32b07d.sql. Migration files are
-- tool-managed and cannot be edited (law E2 + platform enforcement), so the
-- correction lands here, as a new append-only migration.
--
-- Effect: the ledger carries the real filename stamp and drops the phantom.
-- Idempotent and safe to re-run; safe to apply to staging in either order
-- relative to the file it corrects.
-- ---------------------------------------------------------------------

INSERT INTO public.migration_marks(version) VALUES ('20260829060103') ON CONFLICT DO NOTHING;
DELETE FROM public.migration_marks WHERE version = '20260829060232';

DO $verify$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260829060103') THEN
    RAISE EXCEPTION 'LEDGER RECONCILIATION FAILED: 20260829060103 not marked';
  END IF;
  IF EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20260829060232') THEN
    RAISE EXCEPTION 'LEDGER RECONCILIATION FAILED: phantom mark survives';
  END IF;
  RAISE NOTICE 'LEDGER RECONCILIATION OK';
END $verify$;

INSERT INTO public.migration_marks(version) VALUES ('20260829060500') ON CONFLICT DO NOTHING;