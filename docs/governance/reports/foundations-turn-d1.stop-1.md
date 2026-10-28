# Foundations turn D1 — stop 1: M1 (INC-963) applied on ethio-prod

- File: `supabase/migrations/20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql`
- Mark: `20261029000000` (rule G39: now() 2026-10-28 22:3x UTC, rounded up to 23:00, plus one hour; above 20261025150000).
- Read-back on ethio-prod: `select version from public.migration_marks where version = '20261029000000'` → `20261029000000`.
- Proofs: the migration applied cleanly, which means the DO block's sentinel `d1-m1-proof-ok` was reached:
  - (a) a NULL precision is refused with `badPrecision:missing`;
  - (b) a blank precision is refused the same way;
  - after (a) and (b), the pin columns are NULL and there are 0 revisions;
  - (c) `approx` is stored;
  - (d) a clearing call clears the pin;
  - the ACL is unchanged (anon has no execute, authenticated does).
- Change: `set_listing_pin` was redeclared whole from its live definition. The only change is inside the branch where a pin is sent (ruling 6). The header, argument defaults and grants are unchanged.
- App: none needed. `posting-service.ts:1142 pinAnswer` maps the refusal to the existing `failed` answer, and both callers (`:1186`, `:1242`) send a precision.
- Linter: 233 pre-existing findings, none from this migration.
- Open: M2–M7 follow on "continue". The supervisor applies this file on ethio-staging.
