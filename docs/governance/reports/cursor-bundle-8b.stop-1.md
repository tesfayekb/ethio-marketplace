MIGRATION — cursor-bundle-8b part 1: error reports — the table, the write, the three staff doors, the erase
DONE: steps 0, 1, 2 (Part 1's migration, in two files)
LEFT: Part 1's code (STEP 3), parts 2 and 3, steps 6–9
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `8f6c3f2fca3d4033ad9a908ee45b0f2e9b8bfd1a` (short `8f6c3f2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-26T23:02:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45907708105
FILES:
docs/governance/briefs/cursor-bundle-8b-words.json
docs/governance/briefs/cursor-bundle-8b.md
docs/governance/reports/cursor-bundle-8b.stop-1.md
roadmap.md
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
src/features/permissions/door-permissions.generated.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/lib/door-codes.generated.ts
supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql
supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql

apply 3b6b710a → expect mark 20261127010000
apply 8c6761c8 → expect mark 20261127010100

## Orientation

Base `8f6c3f2fc` = `origin/dev` (`8f6c3f2fca3d4033ad9a908ee45b0f2e9b8bfd1a`) at this stop: dev has not moved, so
STEP 3 skips the fast-forward unless the `continue` says otherwise. Dev's CI on the base: SUCCESS (above). The brief
and its words file were saved by `cp`; sha256 `73182a7918ae5e0f6aa07fe7afe48ed0b163f03aba466e96053530fbc4adc750`
and `cf16cb7474f319406adc9f379c471e84eb42155cbed3fd098455e6a7a814953b`, each equal to the carrier's.

## The files (apply in this order)

File A — `supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql`, 29,426 bytes, sha256
`dcceeefc17c37b19208e75fdea109fefcaa1fe1366bb8ef1ffa7658ebd81d636`, mark `20261127010000` (pre-check: mark
`20261126040000` and no `error_reports`). Header `-- e2e-areas: admin-roles`.
- `error_report_kinds()`: the six kinds (notice, crash, unhandled, route, upstream, render), the table's CHECK.
- `public.error_reports`, born closed (REVOKE from PUBLIC, anon, authenticated; service role only; row security; four
  deny policies): id, seen_at, kind, code, message (1–500), shape (1–2000), place (≤300, no `?`/`#`), path (starts
  `/`, ≤300, no `?`, `#` or control character), browser, engine, browser_version, device (phone/tablet/desktop),
  language, app_version, signed_in, group_key (md5), created_at/updated_at with the trigger. No column names a person.
  Indexes `error_reports_seen_idx (seen_at DESC, id DESC)` and `error_reports_group_idx (group_key, seen_at DESC, id
  DESC)`.
- `error_reports_prune_runs`, the heartbeat, in the `job_runs_prune` form (closed, sequence revoked).
- `record_error_report(…12 arguments…) RETURNS uuid`, service only: the shape (ids, quoted values, long hex and digits
  replaced) and the group key md5(kind, code, shape, place) are computed in the database.
- The cores, service only, each taking `p_only uuid[]`: `error_groups_core(days, kind, only)` (≤200 groups by last
  seen, `more`), `error_occurrences_core(group, before_at, before_id, limit, only)` (keyset, `{rows, next}`),
  `error_stats_core(days, only)` (counts per day by kind; top ten pages, browsers with version, app versions).
- `error_reports_prune_core(p_only)` (12 months, DEC-130; heartbeat; trims heartbeats over 14 days only on a full
  run), the wrapper `error_reports_prune()`, scheduled `error-reports-prune` at `29 4 * * *`.
- Proofs (scratch rows tagged `e2e-mig-b8b-<letters>`, rolled back by the sentinel `b8b-part-1-a-proof-ok`): (a) the
  table and heartbeat closed, every function the service role's alone, the schedule; (b) the shapes, the group-key
  rule, four out-of-shape writes refused by the table; (c) every core on the scratch ids (counts, first < last seen,
  kind filter, the window, two keyset pages and the row's exact key list, the stats sums); (d) the erase removes only
  the 13-month-old scratch row, its heartbeat counts 1, a scoped run trims no heartbeat; (e) EXPLAIN (seqscan off)
  names `error_reports_group_idx` for one group's page and `error_reports_seen_idx` for a window. After the block: no
  scratch row is left.

File B — `supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql`, 16,616 bytes, sha256
`7ce0b850ad02c8ed1ac107fdaf0f66ec55295b83c815654838c66217093a8ae5`, mark `20261127010100` (pre-check: mark
`20261127010000`, no resource `errors`, the `admin` role present).
- The resource `errors`, its permission `view` (`requires_step_up` false, assignable), granted to `admin`.
  `super_admin` holds it through `is_super_admin`, as every permission.
- Three doors, plpgsql STABLE SECURITY DEFINER, `search_path = public`, executed by authenticated and the service
  role, each opening `PERFORM public.door_context('staff-reader', 'errors', 'view', NULL, NULL, 'global')` before any
  read: `admin_error_groups(p_days integer DEFAULT 7, p_kind text DEFAULT NULL)`,
  `admin_error_occurrences(p_group text, p_before_at timestamptz DEFAULT NULL, p_before_id uuid DEFAULT NULL, p_limit
  integer DEFAULT 50)`, `admin_error_stats(p_days integer DEFAULT 7)`; their own refusals are `badValue:days`
  (1–366), `badValue:kind`, `badValue:group` (md5 form), `badValue:limit` (1–100), `badValue:cursor` (both or
  neither).
- Proofs (sentinel `b8b-part-1-b-proof-ok`): (a) each door's header and grants; `errors:view` held by `admin` alone,
  no second factor; (b) as `authenticated` with scratch callers, each door refuses with the exact answer before any
  row is read — no session `notSignedIn`, a plain user `permissionDenied`, a deactivated holder
  `accountDeactivated`, a holder scoped to the scratch country `permissionDenied:scope` (each through the reader
  shell, PGRST), a holder without a verified factor `step-up required: no verified factor` (P0009), a holder at aal1
  `step-up required` (P0009); then the holder's `badValue` refusals; (c) the holder reads each answer in its shape
  and its scratch group's one report.

pre-stop scan: 7 of 7, file A `record_error_report` / cores / prune and file B doors and seeds — (1) seeds after
their parents (resource → permission → grant); (2) every scratch value meets its column's CHECK (path, code, place,
device), proven by the apply; (3) every literal matches its parameter's type; (4) no expectation is a real row's value
(file A's cores read only the scratch ids; file B's reads over every row are judged by shape, the occurrences page by
the scratch group alone); (5) one random draw per file (`v_stem`), the scratch country `XZ` guarded by an
existence check; (6) each pre-check reads the previous mark; no body is redeclared; (7) no function body is compared
and no compared literal spans a line break (spanning-literal guard OK).

`bash scripts/check-migrations.sh` (on commit `13987a87a`):
```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard OK (floor 20261109000000).
Random-text guard OK (floor 20261118160000).
Migration guard OK.
```
`bun run db:proof --fresh`: `db:proof PASS — applied 565/565, CLI 2.120.0, cold, 60 s`.
`bun scripts/doors/check-doors.ts`: `check-doors static OK: 230 manifest lines reconcile with the migrations' catalogue`.
`bun run typecheck`, `bun run lint`: green. `bunx vitest run scripts --maxWorkers=2`: 147 files, 824 passed, 1 skipped.
`bunx vitest run src/i18n src/features/permissions src/lib/door`: 14 files, 79 passed.

## For the supervisor's ruling

1. THE DOORS' CLASS. The brief writes `door_context('staff', 'errors', 'view', …)`. The manifest's grammar
   (`scripts/doors/manifest.ts`) gives a `staff` line a dial and an acceptance class, and check-doors'
   `dial-shell-mismatch` holds the body's dial to the line's; every staff read on the shell is `staff-reader` with no
   dial (F1-6b part 6, `admin_list_ai_calls` and its siblings), and SCOPE allows one new dial line, which belongs to
   the public write route. The three doors are therefore `staff-reader`, with no dial (cell-meaning: no work to
   ration — a read of at most 200 groups or 100 rows). Ruling asked: keep `staff-reader`, or name the dial.
2. THE PUBLIC-SURFACE ALLOWLIST. The brief expects no line; the public-surface guard refuses a new
   `GRANT EXECUTE … TO authenticated` without one, and the doors must be callable by a signed-in staff member. Three
   lines were added (`admin_error_groups`, `admin_error_occurrences`, `admin_error_stats` | authenticated | reason) as
   the mechanical edit a standing guard demands (DECIDE-AND-NAME).
3. TEMPORARY `grant-without-caller` LINES. `scripts/doors/check-doors-allowlist.txt` carries three lines
   `| DEC-474` until the doors' client readers land in STEP 3, which removes them in the same commit (cursor-bundle-2's
   precedent, DEC-422).
4. THE GENERATED DOOR TYPES. DW-1 (`scripts/conformance/door-words.test.ts`) demanded `bun scripts/doors/door-types.ts`:
   three lines each in `src/lib/door-codes.generated.ts` and `src/features/permissions/door-permissions.generated.ts`
   (the files sit outside SCOPE's list; a guard-demanded mechanical edit, named here and under §10).
5. FILE A'S SIZE. 29,426 bytes, over rule 30's "about 25 KB". It holds one concern (the store: the table, its write,
   its readers' cores, its erase), and its proofs are most of it; eleven landed files since 2026-11-19 run 25.5–35 KB.
   Splitting the cores into a third file is possible on your word; it would re-stamp every mark.
6. APP VERSION (premise a). No build stamp reaches the browser today (the build exposes no commit), so `app_version`
   is an open nullable column and the stats' version list is one null bucket until one exists; giving the build a
   stamp is a Vite config change outside fix 3's build step, so it is not done. Ruling asked: leave it open, or name
   the stamp.
7. THE PATH CHECK. The first local proof refused `{0,299}` (Postgres caps a repetition count at 255); the path's
   length is now `char_length(path) <= 300` beside the pattern. Caught before any commit.
8. STEP 3's planned browser test will write scratch report rows on ethio-staging's `error_reports` (to be removed by
   the harness by id); named so the staging read-back expects them.

The census (STEP 1) for Part 1's database side is above; Parts 2 and 3 and Part 1's code are censused at their parts,
and the whole enters the report's §2.
