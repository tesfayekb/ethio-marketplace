# Foundations turn N1b-3 — stop 1 (N1b-3a done; N1b-3b M1 applied)

## CI line

ci-evidence (raw, read 10:1xZ): ci-status.md still names **`3ee69785` SUCCESS** (09:54:59Z, run 40849853483); guards-last-failure and e2e-last-failure name the same run, with no failure. The run on `7a95706a` had not completed when I read it, so its unit job (EXH-4/5, AAN-1) is not yet judged. The next turn reads it first.

## N1b-3a

### A1 — INC-987

`src/features/admin-ai/ai-calls.tsx`:
- The feature and outcome choices are now `FilterChoices` inside `FiltersButton` (`ai-calls-filters`), with `FilterChips` (`ai-calls-chips`), in audit-page.tsx's form.
- Each change and each chip removal resets the keyset history. The search slot is empty (the table has no text search).

T2b in `scripts/admin-tables.ts` (`searchSlotBreach`, TypeScript's parser):
- A `<TableToolbar>` `search` slot must be one `<Input>`, or a name handed down in a file `SEARCH_PASSED` names. `data-scope.tsx` has one line saying why.
- No `NativeSelect`, `Select` or `select` may sit in the search or Columns slot.

Census:
- 14 files with a search slot, 0 refused.
- `ai-calls.tsx` at c8410ef2 → `["T2b"]` (read with `breaches` on `git show c8410ef2:…`).
- Consumer cost: none; all 14 already passed.

Tests:
- **TBS-1:** the tree is clean.
- **TBS-2:** the planted INC-987 fragment, a lone select, two Inputs, an unexcused name, and a Select in Columns are all refused.
- **TBS-3:** choices in Filters, chips, a cleared chip back to the first page, no combobox in the toolbar.
- **ACR-3:** moved to the pill.
- **E2E:** `e2e/admin-ai-calls.spec.ts`'s locators moved to the panel (R1). `bun run e2e:local -- e2e/admin-ai-calls.spec.ts` gives **`2 passed (21.1s)`** (both projects, the whole file, 0 retries).

### A2 — INC-989

- `name_checks` is now in `POOL_RESET_TABLES`. `reapPoolAccount` (`e2e/helpers/users.ts`) deletes it `.eq("profile_id", id)`.
- The census (`src/test/pool-reset-map.test.ts`) now reads `profile_id`, and every foreign key to `profiles`/`users` in the table's `Relationships`. It finds **38 tables**, all declared.

Tests (renamed **PRR-1…3**, because PRM-1…3 are taken in user-client.test.ts — TI-1 found it):
- **PRR-1:** finds name_checks, and it is RESET.
- **PRR-2:** a planted `profile_id` column and a planted foreign key to profiles under another column name are found; a quiet table is not.
- **PRR-3:** the reap deletes `name_checks` by `profile_id`, and every hand-deleted RESET table is named in the reap.

### Docs

- `docs/features/display-primitives.md`: the T2b line.
- `docs/_changelog.md`: the N1b-3a line.
- roadmap: INC-987 and INC-989 ticked; the INC-990 line added.

## N1b-3b M1 — applied

**apply 8c694553 → expect mark 20261030030000**

File: `supabase/migrations/20261029102723_8c694553-e554-4808-b999-7bd6772c1e38.sql` (11,174 B, sha256 `11225c4f…8c29`).

What it does:
- `name_checks.imitates_of text NULL` with two CHECKs: `char_length <= 80`, and `imitates_of IS NULL OR state = 'imitates'` (R4).
- `name_checks_clear_imitates_of()`, a BEFORE UPDATE trigger (SECURITY INVOKER, `search_path ''`, REVOKE PUBLIC/anon/authenticated). It nulls the column only when the state changes to anything but `imitates`. A same-state write is left to the CHECK, so the CHECK refuses it rather than the trigger silently nulling it.
- `name_check_mark` is DROPped and CREATEd with `p_of text DEFAULT NULL` (R3):
  - the header is kept (plpgsql, SECURITY DEFINER, `search_path TO 'public'`), as is the exact `checked_text = p_text` match;
  - a reason over 80 characters raises `badValue:of`; the reason is kept only with `imitates`;
  - closers: REVOKE ALL FROM PUBLIC, anon, authenticated, then GRANT ALL TO service_role.

Migration guard before apply, run on a scratch copy of the migrations with M1 added:
```text
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```
It also passes on the tree after landing. The proof's rollback check names its scratch namespace (`email LIKE 'e2e-mig-%'`), so no real-row allowlist line was needed.

Proof (its own scratch user `e2e-mig-n1b3m1-…`, rolled back whole, raising on failure; no Vault read, no job_call):
- **NCQ-7a:** the four-argument call (named, as the route sends it) resolves through the default, and the reason stays null.
- **NCQ-7b:** the reason is kept (trimmed) with `imitates`.
- **NCQ-7c:** `unavailable` leaves the state and the reason as they were, and attempts +1.
- **NCQ-7d:** 81 characters are refused with `badValue:of`; the reason and attempts are unchanged.
- **NCQ-7e:** a stale text returns false and nothing changes.
- **NCQ-7f:** `clean` nulls the reason.
- **NCQ-7g:** a direct write of a reason on a `clean` row is refused by the CHECK, and it reads back null.
- **NCQ-7h:** the owner door's rename resets to `unchecked` and the trigger nulls the reason.
- **NCQ-8:** the old signature is gone; the header and text match are read back; the ACL is service-only, and the trigger function cannot be run by anon or authenticated.

Prod readback after apply:
- mark `20261030030000`;
- old signature gone;
- `authenticated` cannot run the new one;
- the two CHECKs and the trigger are present;
- 0 rows carry a reason.

Database linter: 234 warnings, the existing baseline (DEC-240); none is new.

## Unit suite (N1b-3a)

`bun run test:unit`: 2,177 passed, 5 failed, 1 skipped. After that run:
- TI-1 (the PRM ids) and CF-NN-1 (a count I had raised) were fixed. `non-null`, `test-ids` and `pool-reset-map` now give 14/14.
- NH-1/2/3 are the sandbox timezone failures, there before this turn.

## Next

M2: `admin_name_check_list` and `admin_name_check_clear`. R5: read `admin_list_audit`'s facets first.
