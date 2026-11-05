# P-2 (a) fix: two proofs take their expectation from a real row — report

Base: dev d40ab0c26 (the brief); this branch from dev 7d21a3340 (amendment 1 F) · Final commit: 0bdbab29f · Brief: docs/governance/briefs/p2-proof-caps.md, amended by docs/governance/briefs/p2-proof-caps-amendment-1.md
Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on 0bdbab2

CI of the base: 7d21a3340 SUCCESS (run 42119420339). PR #25 (the first branch, cursor/p2-proof-caps, 63caa3db4): 41 SUCCESS, 1 SKIPPED (the 1/1/1 proof). This pull request replaces PR #25.

## 1. Done / not done, by part and step

- Item 1 (proof text only, files 10 and 11): done at 7e1edad2d on the first branch (VERIFIED by amendment 1). Each proof reads the plan's caps into variables (law 11), raises if a cap is below 1, builds C + 1 scratch cities (C = max_cities) in one scratch region of XZ with the primary saved last, and expects the primary and the first C − 1 others kept in saved order and exactly the last other removed and answered. Part 2 keeps its second-trim, within-caps and nothing-else checks; part 3 (c) keeps its columns, revision, audit and queue checks.
- Amendment A: the draft PR opened as #25 (the first `gh pr create --draft` failed on GitHub's API; the retry after the next push opened it).
- Amendment B: done at 5d1ab9c4d — part 2's comment above its proof describes the any-caps scenario; part 3's comment above its proof ("places trimmed") is not scenario-specific and is unchanged.
- Amendment C (item 3, the census): done before the wait; §4.
- Amendment D: this branch edits only roadmap.md line 3; the records are in §13.
- Amendment E: the amendment saved (1c1da3c3f); stop 2 (c3dd434aa, 63caa3db4).
- Amendment F (item 2): done — the branch from dev 7d21a3340, the files copied, line 3 fresh, both db:proof runs (§9), `git status --short` clean.
- Item 5: the migration linter, check-migrations.sh, the cheap guards, the laws suite, `bun run checks` (§5, §7); the report; the pull request (ready).

## 2. Files changed

`git diff --name-only origin/dev..HEAD` (dev 7d21a3340):

```
docs/governance/briefs/p2-proof-caps-amendment-1.md
docs/governance/briefs/p2-proof-caps.md
docs/governance/reports/p2-proof-caps.stop-1.md
docs/governance/reports/p2-proof-caps.stop-2.md
roadmap.md
supabase/migrations/20261105080105_8797b9c8-6a43-4d2c-9558-6b11a881aefe.sql
supabase/migrations/20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql
```

(plus this report). dev moved d40ab0c26 → 7d21a3340 (PR #24, the db-proof lane: rules 00/30/50/60, AGENTS.md, package.json's `db:proof`, the db-proof scripts, workflow and docs); none of those paths is in this branch's list.

The copied files (amendment F), each written by `git show 63caa3db4:<path> > <path>`: the six paths above but roadmap.md. `git diff --stat 63caa3db4 -- <those six paths>` (after `git add`): empty.

`git diff --stat origin/dev..HEAD`:

```
 .../governance/briefs/p2-proof-caps-amendment-1.md | 14 ++++
 docs/governance/briefs/p2-proof-caps.md            | 18 ++++++
 docs/governance/reports/p2-proof-caps.stop-1.md    | 11 ++++
 docs/governance/reports/p2-proof-caps.stop-2.md    | 57 ++++++++++++++++
 roadmap.md                                         |  2 +-
 ...080105_8797b9c8-6a43-4d2c-9558-6b11a881aefe.sql | 75 +++++++++++++---------
 ...080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql | 68 +++++++++++++-------
 7 files changed, 190 insertions(+), 55 deletions(-)
```

The hunks (`git diff -U0 origin/dev..HEAD`), against each file's proof block:

- 20261105080105_8797b9c8 (block :90–:204): `+13` the ruling's header line; `-84,4 +85,5` the comment above the proof (amendment B); every other hunk inside the block — `+98,3 · +106,3 · -129,8 · +137,2 · +141,8 · +150,10 · +162 · +164,2 · +168 · +170 · +174 · +176,4 · +183 · +188`.
- 20261105080106_42c3a28d (block :174–:397): `+15` the header line; every other hunk inside the block — `+186,8 · -226,8 · +233,22 · +264 · +269 · +279,3 · +327,2 · +331,3 · +338 · +340,2 · +345`.
- Mechanical check: both files with their proof blocks and every `--` comment line removed are identical to dev's (`diff` of the stripped texts: identical for both); marks 20261105100200 and 20261105100300 unchanged.
- roadmap.md: `@@ -3 +3 @@` only.

## 3. Behaviour contract

No function, door, grant, mark or schema statement changed (§2's stripped-text check). The proofs' answers: part 2 and part 3 (c) PASS under 1/1/1 (CI, PR #25; db:proof 409/409) and under 2/2/2 (db:proof 410/410); at the base, part 2 refused under 2/2/2 (ethio-prod, INC-1067).

## 4. Censuses

Item 3 (G0.3, by definition), taken before the wait; the full table with every file:line is in docs/governance/reports/p2-proof-caps.stop-2.md §The census (greps named there). Summary:

- depends-on-value: 20261104153313_f5c8063d :316–:318 (the seeded ranks must read `regular:0,featured:1,premium:2`) and its rank reads of the real `featured` / `premium` (:252–:253, :351, :363–:365, :384, :392, :397); 20261104154000_fbffa284 :246, :320 (the staff door moves an ad to the real `featured` / `premium`). Both files are applied on ethio-prod (files 3 and 7 of 9); not edited — reported.
- Writes a real row inside its rolled-back block: 20261104153957_8816b4c0 :140, :147 (the default market row parked on the scratch code and back); its expectation is value-independent; applied — reported.
- Fixed by this ruling (was depends-on-value): 20261105080105_8797b9c8 (was :144), 20261105080106_42c3a28d (was :307–:323).
- Every other site in the 17 blocks: uses-scratch or reads-real-value-independent. No block of files 12–17 depends on a value: nothing else to fix.

## 5. Tests

- No test file changed.
- `bun run typecheck`: exit 0.
- `bunx vitest run scripts --maxWorkers=2`: Test Files 1 failed | 96 passed (97); Tests 1 failed | 484 passed (485) — the one red is NH-6 (`scripts/ci/nightly-hour.test.ts`, this Mac's time-zone database; green on CI's Linux).
- `bun run checks`: `checks (fast): 17 PASS · 4 FAIL · 263s`; last line `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 328s`. The FAILs: laws-first › scripts/ tests first (NH-6); component-tests (Tests 1 failed | 2756 passed (2757) — NH-6); build-and-check › Workflow lint and secrets-scan (the pinned linux-x64 actionlint and gitleaks on this arm64 Mac; "Secrets scan: 5 commits in d40ab0c26..HEAD"). The NOT RUNs: laws-first's two later steps and build-and-check's later steps and Build (an earlier step failed); every Install dependencies (installed; a package change is its own turn); dependency-audit (advisory service not reachable); e2e-preflight (staging credentials); e2e (the lanes' artifacts); promote (CI only); semgrep's SARIF upload and its warning (GitHub only). CI judges each.
- E2E: none run — no spec, screen or shared helper changed; CI's lanes run every migration's proofs.

## 6. K2 — siblings that bypass the mechanism

The mechanism of the concern ("real rows in a proof", §7, G27) is the migration linter's real-row proof guard (`Real-row proof guard OK (floor 20261007000000)`, scripts/migration-real-row-allowlist.txt). It reads a proof's reads of real rows; it does not see an expectation taken from a real row's value (files 10 and 11 passed it). The siblings of the class are §4's depends-on-value sites (files 3 and 7, applied) — the guard owed is the second roadmap line in §13. Greps: §4's (stop 2).

## 7. Allowlists and guards

No allowlist changed (`git diff --name-only origin/dev..HEAD` names none). Run: `SELF_TEST=1 bash scripts/check-migrations.sh` (self-tests passed); `bash scripts/check-migrations.sh` ("Real-row proof guard OK (floor 20261007000000)", "Migration guard OK"); `bun run scripts/e2e-migration-preflight.ts --self-test` (10 cases OK); `bash scripts/check-listing-writes.sh src` (findings: 0); `SELF_TEST=1 bun scripts/check-acceptance-doors.ts` and `SELF_TEST=1 bun scripts/check-caller-gates.ts` (self-tests OK; their catalogue runs need the backend's catalogue — CI's local-backend lane); `bash scripts/check-import-gate.sh` (ok, 7 routes).

## 8. Strings

none (no file under src/i18n changed).

## 9. Migrations

- 20261105080105_8797b9c8-6a43-4d2c-9558-6b11a881aefe.sql — sha256 8406082045a1cf20be67e109ffae577490d070d1ed7c5c196cf9556986fac6c5 — mark 20261105100200 — `apply 8797b9c8 → expect mark 20261105100200`
- 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql — sha256 2e42882c6b1912612735a1b4af1e22d0f1fd7c074ee71502b2006b560e1d01b2 — mark 20261105100300 — `apply 42c3a28d → expect mark 20261105100300`
- Under the planted 2/2/2 free plan: `db:proof PASS — applied 410/410, CLI 2.120.0, cold, 49 s`
- The plant deleted, at 1/1/1 (the final tree): `db:proof PASS — applied 409/409, CLI 2.120.0, cold, 50 s`
- The plant (uncommitted, deleted): `supabase/migrations/202611050801045_ruling-15-plant-free-caps.sql` — one DO block that raised if `public.listing_places_trim(uuid)` already existed (so it applied before part 2 creates it), set `coverage_plans` to 2/2/2 `WHERE plan = 'free'`, and raised unless exactly one row changed. `git status --short` after its removal and the second run: clean.

## 10. Departures

- The plant's position (MINOR): item 2 / F ask for a file sorted between part 1 (20261105080104) and part 2 (20261105080105). No file with a distinct version sorts there: a longer version (`202611050801045_…`) sorts before `20261105080104_…` (a digit sorts before `_`), and the version 20261105080104 itself is part 1's (the ledger's key). The plant sorted immediately before part 1 (after 20261104154001), which keeps the ruling's effect: part 1 reads or writes no coverage_plans row (`rg -i coverage_plans` on it: none), and the plant's own check proved it applied before part 2.
- Amendment B: part 2's comment above its proof (outside the block) rewritten — the amendment's words: "A comment is not a schema statement".
- roadmap.md line 3 also names the amendment (line 3 only, D).
- A shell loop's first try (zsh does not split an unquoted list) wrote one empty untracked file at the repository root named by the joined path list; it was removed before the copy and never staged.
- A control run (dev's text of files 10 and 11 under the plant, expected to refuse) was not run: the tool call was rejected before it ran; not asked by the ruling.
- Rulings in the turn: ruling 15; amendment 1 (A–F; S540 — the merge of dev in item 2 replaced by F); the standing rule D.

## 11. CI

- The base (dev 7d21a3340), ci-evidence ci-status.md, first lines: "# CI Status (auto-generated — do not edit by hand)" / "- Commit: `7d21a3340c34cdb136b8bed442e5bc4e5752ae43` (short `7d21a33`)" / "- Conclusion: **SUCCESS**" / "- Completed (UTC): 2026-11-05T22:37:57Z" / "- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42119420339". Two-step check: the commit is origin/dev's head; run 42119420339 is the CI run of that commit (`gh run list --commit`).
- PR #25 (63caa3db4): 41 SUCCESS, 1 SKIPPED.
- No earlier turn's red.

## 12. Limits

- NH-6, actionlint and gitleaks cannot pass on this arm64 Mac; CI judges them.
- No browser run (none owed); the acceptance-door and caller-gate catalogue runs need CI's backend.
- That ethio-prod now applies files 10 and 11 is not proven here; db:proof's 2/2/2 run stands in for its profile (free plan 2/2/2), not for its other rows.

## 13. Records

(D: these land in the records turn, word for word.)

INC-1067 — a migration proof takes its expectation from a real reference row's value. Defect: 20261105080105_8797b9c8 (P-2 M-1c part 2) built its trim scenario on the seller's plan being 1/1/1 and refused otherwise; 20261105080106_42c3a28d (part 3) proof (c) expected the same three-place trim (:307–:318); `seller_plan()` is the constant 'free', so neither proof could choose its caps. Evidence: ethio-prod applied files 1–9 of the 17 and refused file 10: "P-2 M-1c part 2 proof: the seller's plan free is not the 1/1/1 free plan this proof expects" — production's free coverage plan is 2/2/2 (the operator's setting), CI's and staging's 1/1/1 (seeded by 20260915162131 :318). Fix: ruling 15 and its amendment 1 (cursor/p2-proof-caps-2, replacing PR #25) — proof text only: each proof reads the caps (law 11), raises below 1, builds C + 1 scratch cities in one scratch region with the primary saved last and expects exactly the last other removed; marks, grants and schema statements unchanged; db:proof PASS under a planted 2/2/2 free plan (410/410) and at 1/1/1 (409/409); CI at 1/1/1 (PR #25). Census of the 17 P-2 proofs: none of files 10–17 depends on a value now; applied files 20261104153313 (:316–:318) and 20261104154000 (:246, :320) depend on the real level keys; 20261104153957 (:140, :147) writes the real default market row inside its rolled-back block. Class: a migration proof takes its expectation from a real reference row's value — §7 "real rows in a proof", G27; third occurrence of the class (M5, D62-1/INC-340).

Roadmap lines:

- [ ] (c)'s caps fold gives the trim an explicit-caps core so the region and country caps are proven with fixed expectations
- [ ] proofs are applied under a second, varied reference profile in db:proof and a CI lane (the guard this class now owes at three occurrences)
