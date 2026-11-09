MIGRATION — p2-fold-c3 part E: M-3c-c, promote_options lists the ad's current and the market's included reach (DEC-358)
DONE: part A (the Reach section); housekeeping B1–B7 (B6 under ruling 2: the seller-name law's file and live halves, DEC-359); the siblings C1–C3; the usage maps (D); M-3c-c written (E)
LEFT: after `continue` (ruling 1 §4): LVP-1…5, LDR-7, the ad-page specs and the two wizard specs, each whole and alone, 0 retries, both projects; THE CHECKS; the budgets; the self-review; the report with its fourteen headings
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `fde97fa9cf5b6c32e50966a10d2e6252511225d0` (short `fde97fa`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T08:33:44Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42584027580
FILES (git diff --name-only 588690676..HEAD, c3's own; origin/dev is still f2d558467, the merge base):
.github/workflows/local-backend-proof.yml
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/features/hidden-seller-name.md
docs/features/my-listings.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c3-ruling-1.md
docs/governance/briefs/p2-fold-c3-ruling-2.md
docs/governance/briefs/p2-fold-c3-strings.json
docs/governance/reports/p2-fold-c3.stop-1.md
docs/governance/reports/p2-fold-c3.stop-2.md
docs/governance/reports/p2-fold-c3.stop-3.md
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/feed-index.spec.ts
e2e/helpers/alias-check.ts
e2e/helpers/reach-rows.ts
e2e/my-listings-ad.spec.ts
e2e/my-listings-levels.spec.ts
e2e/my-listings-page.spec.ts
e2e/my-listings-promote.spec.ts
e2e/post-wizard-bundle2.spec.ts
e2e/post-wizard-place.spec.ts
public/i18n-usage.json
scripts/admin-tables.test.ts
scripts/check-migrations.sh
scripts/check-outbound-calls.ts
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/perm-vocabulary.ts
scripts/conformance/select-all-allowlist.txt
scripts/conformance/select-all.test.ts
scripts/conformance/seller-names.test.ts
scripts/conformance/seller-names.ts
scripts/conformance/wired.test.ts
scripts/fixtures/bad-real-pick-proof-example.sql
scripts/migration-real-row-allowlist.txt
src/features/admin-monetisation/use-monetisation-names.test.ts
src/features/admin-monetisation/use-monetisation-names.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/lib/door-codes.test.ts
src/lib/door-codes.ts
src/routes/api/public/jobs.test.ts
src/server/jobs/route.ts
supabase/migrations/20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql

## The migration

- File: `supabase/migrations/20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql` (commit 897fdf5b8)
- sha256: `49effe864afcd2e4afdee00f4aeb2c3903bd78a5f1e257de2724d340198a0161`
- Declared mark: `20261109110000`. The commit was at 09:01 UTC; rounded up to 10:00, plus one hour,
  that gives 11:00. The mark is above `20261109070400`, the ledger's newest, which the file's
  pre-check requires.
- Shape: one file, 18,637 bytes. The pre-check reads mark 20261109070400 and the live md5 of
  `promote_options`, `b9ad1f23846d5e6055cee921a6913941`, computed as md5(replace(prosrc, chr(13), '')).
  The repository's last declaration (20261107125357) hashes to the same value.
- Objects: `public.promote_options(uuid)` is redeclared whole, with `CREATE OR REPLACE`; the return
  stays `jsonb`, so there is no types patch. The header (STABLE, SECURITY DEFINER, `SET search_path =
  public`) and the grants are restated (REVOKE … FROM PUBLIC, anon; EXECUTE to authenticated; ALL to
  service_role). The COMMENT now names DEC-358.
- The change: the body is byte for byte 20261107125357's except for ONE line, the reach loop's
  filter. `k.kind = 'reach' AND k.enabled AND k.self_serve` becomes
  `k.kind = 'reach' AND k.enabled AND (k.self_serve OR k.key = v_market.included_reach OR k.key = v_reach)`.
  The levels loop is not touched. A script built the body from 20261107125357's declaration, and
  `diff` of the two functions shows that one line only. The new body's md5 is
  `a434782eefe6bce9bb16a1c2604cbd0a`.
- Proofs, on scratch rows (market XZ, currency XTS, `e2e_mig_*_<stem>` reach rows above every real
  sort), rolled back by the sentinel, with a check afterwards that none outlived it:
  - (a) the header, the `jsonb` result and the grants.
  - (b) the new filter occurs once, the old one is gone, the live md5 is `a434782e…`, and with the
    old line put back it is `b9ad1f23…`. Each compared literal is on one line, both sides without
    chr(13).
  - (c) XZ's included reach is a non-self-serve scratch row. An ad with no bought reach lists it
    once, current=true, below=false, availability `includedReach`, and the reach head is
    `{key: rinc, until: null, source: null, included: rinc}`. A non-self-serve row that is neither
    included nor current is not listed, and neither is the other ad's bought row.
  - (d) an ad on a bought non-self-serve scratch reach lists it once, current, `sameReach`. The
    included row is listed too: not current, `includedReach`.
  - (e) XZ's included reach moved to a self-serve scratch row is listed once (no duplicate),
    current, `includedReach`, and the old non-self-serve included row is no longer listed.
- pre-stop scan: 7 of 7, a63f48fe:
  1. statement order;
  2. scratch keys accepted;
  3. literal types;
  4. no real row's value is an expectation (the one real read is the derived sort);
  5. one draw for the scratch keys;
  6. the pre-check reads the live md5 and the previous mark;
  7. no compared literal spans a line break, both sides chr(13)-stripped (ruling 3 §2).
- Guard lines (`bash scripts/check-migrations.sh`): "Born-closed guard OK (floor 20261007143529)." ·
  "Definer guard OK." · "Self-marking guard OK (floor 20260817054246)." · "Public-surface guard OK
  (floor 20261003215043)." · "Real-row proof guard OK (floor 20261007000000)." · "Spanning-literal
  guard OK (floor 20261109000000)." · "Migration guard OK."
- `bun run db:proof --fresh`: `db:proof PASS — applied 437/437, CLI 2.120.0, cold, 51 s`. The count
  is the 431 repository files, minus the one the prepared copy removes, plus CI's seven local
  setup files (scripts/ci/prepare-local-backend.sh).
- LVP-5 (my-listings-promote.spec.ts) depends on this file being applied: the included
  non-self-serve reach must be listed as current. On ethio-staging it stays red until the mark
  reads back. On the pull request's temporary backend, which is built from every repository
  migration, it can pass from this push on.

apply a63f48fe → expect mark 20261109110000

## CI on the last pushed commit (5efed5e8c, stop 2), read at 09:0x UTC

The run (42587592780) was still in progress when read, with Lane 2 pending, so its logs and the
evidence branch were not readable. ci-status.md above is still fde97fa's. The checks so far: 35 pass,
1 pending, 3 fail.

- "i18n used-on map is fresh": the maps were stale at 5efed5e8c and are regenerated at part D
  (5f502e319).
- Lane 5 and Lane 13: step 31, "Run proof lane failure". Their logs are not read: GitHub withholds
  them until the run completes, and the annotations carry only the exit code. My unconfirmed
  reading is LVP-5, whose included non-self-serve reach needs M-3c-c, which 5efed5e8c's temporary
  backend did not have. This push carries M-3c-c; the next run is the proof, and the report reads
  both lanes.

## Ruling 2 (DEC-359) as built

- `scripts/conformance/seller-names.ts` (new) is the law: `HELPERS`, `nameReaders`,
  `computedLines` and `fileAllowances` (a computed function's line is judged live, never stale on
  the file side), plus the live judge. `--live-query` prints one literal query: each public
  function's name and its `prosrc` as UTF-8 hex, one row each, with comments stripped on the TS
  side by the reader's `sqlCodeOf`. `--live <tsv>` judges against `HELPERS` and the same
  allowlist. The self-test on planted rows runs first: an unexcused reader → one finding, the same
  reader with its line → none, a line for a function not live → stale. Shown red: with `readsName`
  blinded, the script prints two "self-test FAILED" lines, judges nothing and exits 1.
- `seller-names.test.ts` reads the reader and prints "computed, judged live: validate_listing_draft
  — built by a format() template in 20261107125358_…". Its line stays. SPA-10c gains the
  computed-line and stale-line cases, and SPA-10d judges the live half.
- The smoke lane: a step "Seller-name judge, live (DEC-359)" after the door guard in
  `local-backend-proof.yml`, with `if: matrix.lane == 'smoke' …`, feeding psql's TSV from
  `RUNNER_TEMP`. `wired.test.ts` names it.
- A local simulation (file bodies standing in for the live ones, with validate_listing_draft's
  20261103040808 body, which the live function keeps) printed "seller-names live OK: 17 live readers,
  each excused by seller-names-allowlist.txt". The proof ruling 2 asks for is the first smoke run's
  line, quoted in the report.
- Not run here: `actionlint -shellcheck= -pyflakes=` on the workflow. The checks' pinned
  actionlint is a linux_amd64 binary and this Mac is arm64, so CI's "Workflow lint (actionlint,
  pinned)" job on this push judges it; `bun run checks` runs after `continue`.

## The rest of ruling 1 §4

- FE-13 (57093d5b6) asserts the sweep's exact nine keys, `listings_with_wrong_look` and
  `sold_shown` among them.
- Q9 (2ba9000cc, 6fe20fc0d): `waitAliasAccepted(page)` at bundle2's :525, :592, :663 and :848, and
  `expectAliasAccepted` at the ten that fit. The eight `e2e_${rand()}` names now come from
  `scratchAlias()`: a rand() tail of digits alone left two letters, which the shape rule refuses.
  Grep proof: `rg -n "post-who-alias-ok" e2e` gives only `e2e/helpers/alias-check.ts:24` (the
  state list) and `:136` (the helper's own wait).
- MNN-4 (9bb8ed6d4): a market the open markets do not hold is named
  `admin.monetisation.market.unknown` (EN and AM copied from the strings file by script). Shown
  red against the old `return code;`.
- SAC-1 (12cbf9564): shown red first on a planted file (three presses found, `ControlOrMeta+A` and
  `Control+Enter` passed) and on the tree (11 presses in 4 files), then green after the 11 presses
  became `ControlOrMeta+A`. The allowlist holds only its header.
- The laws: `bunx vitest run scripts --maxWorkers=2` gives 503 passed and 1 failed. The failure is
  NH-6, this Mac's known limit (its `date` ignores TZDIR), which CI judges.

## Corrections (for the report's §13)

- My stop-1 census named NCJ-10 as free; it was taken, so the jobs test is NCJ-13.
- My stop-1 census counted ten template functions; there are eleven (validate_listing_draft,
  20261107125358:78).
