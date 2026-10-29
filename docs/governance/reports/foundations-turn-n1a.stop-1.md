# Foundations turn N1a — stop 1 (M1 applied on ethio-prod)

CI line read: 7063a727, FAILURE. The reds were format:check (`src/routes/__root.tsx`, `src/server/first-screen.test.ts`), the U4i ② used-on map and the first-paint budget. Every E2E lane passed (2,283 passed, 0 failed). The run on 31d5fb6b had not completed when this stop was written. `prettier --check` passes on both named files at this tree.

## STEP 0
- The brief is saved unchanged as `docs/governance/briefs/foundations-turn-n1a.md`, one fenced block written by script.
- Roadmap line 3 now names it.
- The INC-977 line is split into N1a (this turn) and N1b (open; waits on the operator's two choices).
- The INC-974 K2 line is added (not built).

## The migration
- File: `supabase/migrations/20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql`
  - 23,354 bytes; sha256 `af1813168138ab440a49551866ff0620df1b95112af2663fe2c5ab0245a99b1a`.
  - Under the 25 KB split line, so it is one file.
- Contents:
  - `public.name_checks`: PK (profile_id, subject); subject CHECK ('alias'); state CHECK ('unchecked','clean','imitates'). It is born closed: REVOKE ALL FROM PUBLIC, anon, authenticated; GRANT ALL service_role; RLS on, with four deny policies.
  - `save_posting_identity`: redeclared whole from live `pg_get_functiondef` by computed insertion, with no DROP and its argument list unchanged. Inside `IF v_alias_changed` it upserts the row as 'unchecked' (checked_text = the lower-cased alias, since = now(), attempts = 0) in the same transaction. A failed state write fails the save.
  - `admin_update_profile`: redeclared whole the same way. A name staff assign is upserted 'clean'. A cleared name deletes its row.
  - `name_check_mark(uuid, text, text, text)`: service-only. It accepts only 'clean' or 'imitates', and changes the row only when the stored checked_text equals p_text.
  - `admin_name_check_summary()`: gated by `has_permission(auth.uid(),'listings','view')`. It returns `{unchecked, oldest_since}` and nothing else.
  - The closers are in the file for all four functions.

### Read-back on ethio-prod
- Mark: `max(migration_marks.version)` = **20261029210000**.
- `name_checks` ACL: `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}`, so no browser role has any grant.
- `name_check_mark`: `{postgres=X,service_role=X}`.
- `admin_name_check_summary`, `save_posting_identity` and `admin_update_profile`: `{postgres=X,authenticated=X,service_role=X}`.
- Rows in `name_checks`: 0, so the proof rolled back.

### Index decision (EXPLAIN on prod)
```text
Aggregate  (cost=15.88..15.89 rows=1 width=16)
  ->  Seq Scan on name_checks  (cost=0.00..15.88 rows=2 width=8)
        Filter: (state = 'unchecked'::text)
```
No index was created (ruling 2). Nothing is asserted about the planner (memory: behaviour-only proofs).

### Proofs in the file
The proof uses scratch `e2e-n1-<hex>` users only, a scratch role and a scratch TOTP session. Everything rolls back on the sentinel, and the rollback itself is asserted.
- **NCU-1, allow:** one save writes the alias and its 'unchecked' row together.
- **NCU-1, refuse:** a planted trigger refuses the state write. The save then raises, the alias is unchanged, there is no alias_history row and checked_text is unchanged.
- **NCU-2:** authenticated and anon cannot execute `name_check_mark` and hold no table privilege. The row is unchanged.
- **NCU-5:** a stale p_text returns false and changes nothing. The state 'unchecked' is refused with `badValue:state`. The current text marks 'clean'.
- **NCU-4:** the same alias saved again keeps 'clean'. A changed alias (a 24-hour correction) resets the row to 'unchecked' with attempts 0.
- **NCU-6:** without listings:view the summary is refused. With it, unchecked ≥ 1, oldest_since ≤ the scratch row's since, and exactly two keys.
- **NCU-7:** a name staff assign through `admin_update_profile` (profiles:update with a fresh step-up) is 'clean', in the same transaction.

### Departures and findings
1. **The first submit failed and nothing was applied.** The read-back after it showed no table, no function and the mark still at 20261029200000.
   - Error: `P0001: NCU-5 mark`.
   - Cause: a proof defect. `IF NOT name_check_mark(...) OR (SELECT state ...) <> 'clean'` is one SQL statement, so its subquery's snapshot comes before the function's update.
   - Fix: the call was split from the read, sent as a query_patch with details on the message. The proof was not weakened.
2. **Migration guard.** Two kinds of allowlist line were added; with them, `bash scripts/check-migrations.sh` exits 0.
   - Born-closed: the scan named the proof's scratch trigger function `e2e_n1_refuse`. It is created by EXECUTE inside the rolled-back block, and the proof asserts `to_regproc` IS NULL. One line went into `scripts/migration-guard-allowlist.txt`, naming the real functions' in-file REVOKEs.
   - Real-row: four proof reads of the scratch users went into `scripts/migration-real-row-allowlist.txt`, each with a reason and "until INC-977 closed".
   - Lesson: a scratch trigger in a proof needs its own REVOKE line, or a pg_temp function.
3. **Public surface:** `admin_name_check_summary` got its line in `scripts/public-surface-allowlist.txt`. `save_posting_identity` and `admin_update_profile` were already listed, at lines 40 and 41.
4. **Security linter:** one new warning, "signed-in users can execute a SECURITY DEFINER function", for `admin_name_check_summary`. This is the intended gated staff door, gated inside on listings:view, and the same class as the 214 findings that predate it. Nothing was changed.

## Ruling 4: the other name-saving paths
- `src/routes/api/listings/alias.ts` calls `check_seller_alias` and `suggest_seller_aliases`, which write nothing to the profile.
- `src/routes/api/seller.ts` only reads.
- On live prod, the only functions that set `seller_alias` are `save_posting_identity` and `admin_update_profile`. Both now write the state.

## Staging
apply 560e36c8 → expect mark 20261029210000

## Left for after "continue" (N1a)
- The route (ruling 3c): `name_check_mark` through the server client after the door answers ok and the model answered clean. Retire `auditUnchecked` and `alias.unchecked`.
- NCU-3 (the route's three cases).
- The staff count line in Admin › Screening, with EN+AM keys (the supervisor's Amharic, copied by script).
- The admin-screening E2E assertion.
- The INC-977 fix line.
- The i18n maps, the whole unit suite and the final report.
