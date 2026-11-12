# HOUSEKEEPING TURN 3C — the typecheck reaches every script, the nightly reaps ethio-staging, the E2E evidence says what the repeat lane covered, and the GO checker judges a brief against the tree it cites — report

Base: 2b11a9d29 (the brief's `Base: dev`; this turn began from the lane head 611ade039, ruling 1 item 5) · Final commit: 74019fe3f · Brief: docs/governance/briefs/housekeeping-3c.md (sha256 d7564eb069f358dae1f023c2ecb405cced5e7cafe744f9f0788aa343a299854c)
CI: 74019fe3f — SUCCESS, run 43236871102 (every check on the pull request green; lane 1's setup ran the maintenance pass green)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 74019fe

## 1. Done / not done, by part and step

- STEP 0 — done (59b1cd520): the lane fast-forwarded (already up to date), the brief saved by script, sha256 equal; roadmap line 3; `check-go` on the tree as saved → `[check-go] no finding`.
- STEP 1 — the census: stop 1 (3090657bf), answered by ruling 1; stop 2 (ab9670e32, the kit reached by import), answered by ruling 2.
- Part A — done (41775c501): `tsconfig.scripts.json` (new), `typecheck` runs both projects, the reporter's `Bun` reads become `node:fs` / `node:child_process`, `on-demand-failure.test.ts` :311 narrowed, the checks runner runs `bun run typecheck` itself (TCK-12), CF-TSC-1; rulings 1 and 2 saved.
- Part B — done (8d238cfde): `E2E_MAINTENANCE: "1"` on the nightly's first Playwright step and on lane 1's proof step; the owner comment in `e2e/global-setup.ts` (comment lines only); CF-CID-7; F6's pages.
- Part C — done (2aff22859): the selection step writes `0 repeated` when specs were selected and none fits; `local-backend-repeat.txt` rides in the lane's `e2e-log-*` upload; the reporter's `- Repeat:` head line; the self-test's INC-1107 cases on a real capture.
- Part D — done (d0f6c2cf5): `check-go.ts --at <commit>`; CF-BRIEF-16; the CF-BRIEF-14 cases; the template's SCOPE and STEP n+1 lines.
- Stop 3 (b29387ba3): `check-go --at` found CF-BRIEF-16 on this brief; ruling 3 answered (a). Its commit (0c511d9f1): the ruling's copy, the allowlist line's reason, the template sentence.
- Stop 4 (dac564c4a): lane 1's first run of the pass failed its photo reaper proof (`mime type text/plain is not supported`, runs 43220268168 and 43222749146); ruling 4 answered (a). Its commit (74019fe3f, `housekeeping-3c: the photo proof uploads a real JPEG (INC-1112)`): the ruling's copy, and the proof in `e2e/global-setup.ts` uploads `madeJpeg(11, 11)` as `card.jpg` with `contentType: "image/jpeg"` — the last code commit and the judged run (ruling 4).
- STEP 6 — done on 0c511d9f1, and again whole on 74019fe3f: `bun run typecheck` exit 0; `bun run lint` exit 0; `bunx vitest run scripts --maxWorkers=2` 110 files, 568 passed, 1 skipped; `bun run checks` (below, §5); `check-go … --at 611ade039` (§11, on 0c511d9f1; 74019fe3f changed no file the checker reads).
- Self-review — done (`.cursor/rules/80-review.mdc`, read against `git diff 611ade039..0c511d9f1`, then again over `git diff 0c511d9f1..74019fe3f`); its line is above.
- Report, the docs-only push and the pull request comment — this commit and after.

## 2. Files changed

`git diff --name-only 2b11a9d29` lists 347 paths on 74019fe3f (348 with this report): 2b11a9d29..611ade039 is 77 commits of turns 3 and 3b of the same bundle (pull request #34), already reported in their own reports. This turn's own paths, `git diff --name-only 611ade039` on 74019fe3f:

```text
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/nightly-e2e.md
docs/features/security-scanning.md
docs/governance/briefs/housekeeping-3c-ruling-1.md
docs/governance/briefs/housekeeping-3c-ruling-2.md
docs/governance/briefs/housekeeping-3c-ruling-3.md
docs/governance/briefs/housekeeping-3c-ruling-4.md
docs/governance/briefs/housekeeping-3c.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-3c.stop-1.md
docs/governance/reports/housekeeping-3c.stop-2.md
docs/governance/reports/housekeeping-3c.stop-3.md
docs/governance/reports/housekeeping-3c.stop-4.md
e2e/global-setup.ts
package.json
roadmap.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-failure-report.ts
scripts/fixtures/local-backend-repeat.43144538685.txt
tsconfig.scripts.json
```

New files, `git ls-files`: `tsconfig.scripts.json`, `scripts/fixtures/local-backend-repeat.43144538685.txt`, the four rulings, the brief, the four stop reports (and this report). Each path is in SCOPE (the brief's, with ruling 1 item 8's additions: `scripts/ci/turn-checks.ts` + its test, `local-backend-proof.yml` beyond the carrier, `ci-guards.md`, `e2e-harness.md`; ruling 4's: `e2e/global-setup.ts` :963 → :976, the proof block, beside Part B's comment lines — and the one import line :14 that block needs, §10) or the standing allowance (`docs/governance/briefs/**`, `docs/governance/reports/**`, roadmap line 3, `docs/features/**`, `scripts/conformance/*-allowlist.txt`). Not changed though named: `scripts/e2e-failure-report.test.ts` (it runs the reporter's own self-test, EFR-1, where the INC-1107 cases live), `tsconfig.json` (F2, §13), `eslint.config.d.ts` (not needed: `allowJs`), every `.claude/` file (ruling 1 item 1).

## 3. Behaviour contract — answer tables before → after

| Surface | At 611ade039 | At 74019fe3f |
| --- | --- | --- |
| `bun run typecheck` | `tsc --noEmit` (the root project) | the root project, then `tsc --noEmit -p tsconfig.scripts.json` (every `scripts/**/*.ts`, `playwright.nightly.config.ts`, `vitest.config.ts`; the three kit importers excluded, ruling 2) |
| checks runner, `build-and-check › Typecheck` | the platform harness's log; here always NOT RUN | runs `bun run typecheck`: PASS on exit 0, FAIL `exit N; log …`, FAIL past its deadline |
| `scripts/e2e-failure-report.ts` reads and writes | `Bun.file`, `Bun.write`, `Bun.spawnSync` | `node:fs`, `node:child_process`; every fallback as before (a missing SSR allowlist reads as empty, a missing ledger as its header) |
| the E2E report's head | no repeat line | `- Repeat: <U> of <T> tests repeated — specs directly changed <a>/<b>, importers of a changed helper <c>/<d>; budget <B> s` (+ `; the time cap left <k> test runs`) only where `repeat` is an expected source; `- Repeat: nothing to repeat` kept; `- Repeat: selection not written`; an unparsed summary quoted raw; none in the docs-only form or the nightly's |
| the repeat selection step, specs selected and none fits | `- Repeat: nothing to repeat` | the summary line with `0 repeated` and `0 of <n>` per rank; "nothing to repeat" only when nothing was selected |
| the lane's `e2e-log-<lane>` upload | the log and three step files | the same plus `local-backend-repeat.txt` |
| `e2e/global-setup.ts` maintenance pass | runs where `E2E_SHARD` is unset or `1`, or `E2E_MAINTENANCE=1`; no CI step set either | the owner rule unchanged; lane 1's proof step and the nightly's first Playwright step set `E2E_MAINTENANCE: "1"`, so the pass runs there |
| the photo reaper's proof (DEC-077 part 2) | uploads `…-photo/card.txt`, a one-byte `text/plain` blob, then asserts exactly 1 removed and 0 left | uploads `…-photo/card.jpg`, `madeJpeg(11, 11)` from `e2e/helpers/photos.ts` with `contentType: "image/jpeg"`; the same exact delete-count assertion, the same error words (ruling 4) |
| `check-go.ts` arguments and exits | `<file> [--root <tree>]`; 0 no finding, 1 findings, 2 usage | adds `[--at <commit>]`: tree laws on a `git archive` snapshot (removed in a `finally`), a git-read COUNT in the repository, the first line names the commit and the split; 2 also for a commit the repository does not hold, a `--at` with no value or one starting with `-`, and a failed archive |
| the text laws | CF-BRIEF-1, 2, 3, 11 | the same plus CF-BRIEF-16 |
| CF-BRIEF-5 | judges every backticked tree path | the same, except the brief's own path (ruling 3 item 2) |
| CF-BRIEF-10 (`countFindings`) | every COUNT runs in the root | a COUNT whose first segment is a git read runs in `repository` (the `--root` repository under `--at`; the root otherwise, so no change without `--at`) |

## 4. Censuses

- The scripts project's errors, the five files `tsc` reaches by import and the kit's 44 errors: stop 1 §Concern 1 (`docs/governance/reports/housekeeping-3c.stop-1.md` :50 →); the import census of `.claude/` (two direct importers, one test importer): stop 2 and CF-TSC-1 (`scripts/conformance/wired.test.ts` :455), which derives it on every run.
- The maintenance owner, every reader of `E2E_SHARD` / `E2E_MAINTENANCE`: stop 1 §Concern 2. On 74019fe3f, `rg -n E2E_MAINTENANCE` over the tree and `.github/workflows`: the two setting steps (`nightly-e2e.yml` :147, `local-backend-proof.yml` :753), the one reader (`e2e/global-setup.ts` :600; :599 until ruling 4's import line), CF-CID-7 (`scripts/conformance/ci-deadlines.test.ts` :300 → :383).
- The repeat selection file, `rg -n local-backend-repeat` over the tree and `.github/workflows`: the writers `local-backend-proof.yml` :245, :247, :284, :290, :294, `scripts/ci/repeat-cap.ts` (via :773); the readers: the proof fragment's writer (:902) and the reporter (`scripts/e2e-failure-report.ts` :1540); the upload :962.
- The GO checker's callers, `rg -n "treeFindings\(|countFindings\("`: `scripts/brief/check-go.ts` :102 and `scripts/conformance/briefs.test.ts` (:254, :286, :298) only.
- Ruling 3 item 2's census (does CF-BRIEF-5 flag the brief's report paths under `--at`?): the `--at 611ade039` run before the skip printed one CF-BRIEF-5 finding, `docs/governance/briefs/housekeeping-3c.md:53 cites docs/governance/briefs/housekeeping-3c.md, not in the tree`; the brief's report path carries "(new)" and was not flagged. So no report-path skip was added.

## 5. Tests

- Added: TCK-12 (`scripts/ci/turn-checks.test.ts` :131 — the step's text is `bun run typecheck`; a planted scripts project with a type error is FAIL `exit N; log …`, PASS once fixed); CF-TSC-1 (`scripts/conformance/wired.test.ts` :455 — the real tree, and planted cases: a missing project, a missing include, an exclude entry too many and one too few); CF-CID-7 (`scripts/conformance/ci-deadlines.test.ts` :356 — the real tree clean; a planted removal for each owner; a planted third setter); the reporter's self-test cases INC-1107 ×6 (`scripts/e2e-failure-report.ts` :3132 → :3166); two CF-BRIEF-14 cases in `scripts/conformance/briefs.test.ts` (CF-BRIEF-16's shapes, with the template's own SCOPE sentence; `check-go --at` on a scratch repository: the working tree lost the cited line and gained a counted file, the snapshot passes, a git-read COUNT, the brief's own path, an unknown commit, `--at` without a value).
- Changed: TCK-3 lost its `typecheckVerdict` cases (the function is gone with the harness log, ruling 1 item 1 e). CF-BRIEF-14's planted brief gains a `.claude/hooks/lib.ts` SCOPE path, and its check-go case's expected law list gains `CF-BRIEF-16` (an exact-list assertion, now one longer). The in-force test's title names CF-BRIEF-16.
- Red-first (planted breaks, each run on its own and then restored): the time-cap marker changed → `INC-1107 the time cap's lines are counted in repeat-cap.ts's own words` failed; the workflow restored to 611ade039's `nothing to repeat` line → two INC-1107 cases failed; the git-read split removed (`cwd: root`) → the `--at` case failed (exit 1, not 0); the own-path skip narrowed → the `--at` case failed with `CF-BRIEF-5 …/docs/governance/briefs/at.md:5 cites docs/governance/briefs/at.md, not in the tree`. TCK-12, CF-TSC-1 and CF-CID-7 carry their planted cases inside the tests.
- The photo proof (ruling 4), red-first in CI: lane 1's setup failed on b29387ba3 (run 43220268168), 0c511d9f1 (run 43222749146) and dac564c4a (run 43227226085), each with `[e2e:setup] photo reaper proof upload failed: mime type text/plain is not supported`; on 74019fe3f (run 43236871102) the same setup printed `[e2e:setup] photo reaper proof: ok` and ran the whole pass (§11). No local run: the proof needs a backend, and the reaper is not run against ethio-staging from this machine (§12).
- Totals on 0c511d9f1, and the same on 74019fe3f: `bunx vitest run scripts --maxWorkers=2` → 110 files, 568 passed, 1 skipped; `bun run typecheck` → exit 0 (both projects). `SELF_TEST=1 bun scripts/e2e-failure-report.ts` → exit 0 on 0c511d9f1.
- THE CHECKS on 0c511d9f1: `checks (fast): 26 PASS · 0 FAIL · 411s` and `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 470s`. Again whole on 74019fe3f: `checks (fast): 26 PASS · 0 FAIL · 417s` and `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 474s`. The runner's own Typecheck line, both times: `PASS     build-and-check › Typecheck  (18s)`. NOT RUN, each with the runner's reason: scope › Decide whether the lanes run (GitHub only); Workflow lint (actionlint) and Secrets scan (gitleaks) (pinned linux/x64 binaries, this machine darwin/arm64); the Install dependencies steps (×3) (the dependencies are installed; a package change is its own turn); dependency-audit (×2) (the advisory service is not reachable from the sandbox); e2e-preflight (×4) (needs the staging credentials); e2e's merge steps (×6) (the lanes' artifacts exist only on GitHub); promote (×4) (only CI promotes); bundle-budget › Install dependencies; semgrep's SARIF upload and its warning (×2) (GitHub only).
- E2E: no spec file changed or was added; `e2e/global-setup.ts` changed in Part B's comment lines and in ruling 4's proof block (and its import). The browser check was not run locally (§12); the pull request's lanes are the proof (§11): every lane green on 74019fe3f, lane 1 `168 passed`, `6 skipped`.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "\btsc\b"` and `bun run typecheck` over `package.json`, `.github/workflows`, `scripts`: CI's `build-and-check` runs `bun run typecheck` (`ci.yml` :169), so it runs both projects; no other `tsc`. `rg -n E2E_MAINTENANCE` (with `.github/`): no third setter. `rg -n local-backend-repeat`: the proof fragment's writer (`local-backend-proof.yml` :902) is a second reader of the selection file; it copies the raw lines into `local-backend-proof.md`, which is the lane's own record, not the head line, and it was left. `rg -n "treeFindings\(|countFindings\("`: no caller but check-go and the test. None found bypassing.

## 7. Allowlists and guards

- `scripts/conformance/briefs-allowlist.txt`: 0 → 1 lines: `docs/governance/briefs/housekeeping-3c.md:50 SCOPE names .claude/hooks/**/*.ts, which rule 00 forbids the executor | the law CF-BRIEF-16 landed in this turn and judges the brief that built it (ruling 3); the next brief's STEP 0 removes it | INC-1110`. The header names CF-BRIEF-16's key form. The `until` cell cannot state "the next brief's STEP 0" in the kit's grammar (a date or an INC/DEC id), so it names INC-1110, the kit's opening; CF-BRIEF-13 fails the line once another brief is in force.
- No other allowlist changed (`git diff --name-only 611ade039 | rg allowlist` → this one file).
- Guards' self-tests run: CF-TSC-1, CF-CID-7, TCK-12, CF-BRIEF-14 (both new cases), the reporter's self-test; each named in §5 with its planted case.

## 8. Strings

None (FLAGS `no-new-string`; no file under `src/` changed).

## 9. Migrations

None (FLAGS `no-migration`; no file under `supabase/` changed).

## 10. Departures

- Rulings: ruling 1 (`docs/governance/briefs/housekeeping-3c-ruling-1.md`, sha256 14d0f8f19f234772ef66e3df05419a410855c98f963a4a4383ad76e878fa259b), ruling 2 (`…-ruling-2.md`, 19295a3ac7401ed0279435b9cef5083b646e6da0a7dcefd06607d72d913651f5) ruling 3 (`…-ruling-3.md`, aa568740f0e3cbbc2f6a5ca74340be9b6eb683100fcf4d4ce6a74d2bb9f21b80) and ruling 4 (`…-ruling-4.md`, a4809c4b5f8fe6f639815c7c265cae502fe08f1e58e9aa96f9c313b9c9fa3d9f), each saved by scripted copy with its sha256 equal. Stops: 4 — the census (ruling 1); the kit reached by import (ruling 2); `check-go --at`'s finding on this brief (ruling 3); lane 1's pass failing its photo proof (ruling 4).
- Part B's premise did not hold on its first run: ruling 1 had lane 1 "run the pass" because the backend's seed exists, but the pass had had no CI owner since cc93140c2 (2026-10-21), and its photo proof uploaded `text/plain` into `listing-photos`, which has been restricted to JPEG, PNG and WebP since 2026-10-28 (M7). Ruling 4 kept Part B and changed the proof (INC-1112, §14); its PREVENTION places the gap in the ruling (G35's window), not in the parts.
- Ruling 4 put `e2e/global-setup.ts` :963 → :976 in scope; `madeJpeg` reaches that block by one import line, `import { madeJpeg } from "./helpers/photos";` at :14, outside the range. The ruling names the helper, so the import is its consequence; named here (MINOR 4). `photos.ts` brings `jpeg-js` and `./users` (already imported by the setup) and nothing else.
- `.claude/hooks/**` is not in the scripts project, and its three importers are excluded (rulings 1 and 2), against the brief's SCOPE line 50.
- `--at` builds a `git archive` snapshot, not a `git worktree` (ruling 1 item 5), against the brief's COVERED HERE. `GIT_READS` does not gain `archive`: the checker calls `git archive` itself, never through a COUNT line, so the law does not need the word.
- The checks runner runs the typecheck itself (ruling 1 item 1 e). To test its line, `stepLine` was lifted out of `main` and `sh` was exported with an optional `cwd`. Every verdict is the same, and `LOCAL[step.key]` is read through `ownValue` (MINOR, below).
- CF-BRIEF-5 skips the brief's own path, under every root — "the law could not have been met by any brief" (ruling 3 item 2, accepted).
- CF-BRIEF-16 treats a sentence with "nothing" or "only with" as no claim, beside the shared negation words, so a SCOPE that copies the template's own sentence (`; \`supabase/migrations/\` only with a migration flag`) under `no-migration` is not flagged. A test reads the template's line for this.
- `isGitRead` judges a COUNT by its first pipe segment (`git show|log|diff|ls-files …`).
- STEP 6's `check-go --at 611ade039` prints one finding, not "no finding": the expected output (ruling 3 item 1, §11).
- The brief's question "should `briefs.test.ts` read the brief's `Base:` line and judge at that commit": no. That test runs only the text laws on the brief in force (they read no tree); the tree laws stay with `check-go`.
- Decide-and-name: the second project is a `-p` chain in the `typecheck` script; `Bun` becomes `node:fs` (`readFileSync`, `writeFileSync`, `existsSync`, `mkdirSync`) and `node:child_process` (`spawnSync`); the eslint config is typed by `allowJs` with `checkJs` off (no `eslint.config.d.ts`); the nightly's variable sits on its first Playwright step (ruling 1 Q3); the repeat file's carrier is the lane's `e2e-log-<lane>` upload; `--at`'s snapshot lives under the OS temp dir and is removed in a `finally`.
- The self-review's four MINOR findings: (1) `stepLine` and `sh` exported for TCK-12 (above); (2) the allowlist line's `until` names INC-1110 because the grammar cannot name "the next STEP 0" (§7); (3) `e2e/global-setup.ts` :602 still logs `maintenance skipped (owner: shard 1)` beside the corrected comment — a code line, outside the comment-only scope (§13); (4) ruling 4's import line :14 outside its stated range (above).

## 11. CI

- The base, at STEP 0 (rule 40, the two-step read): root `ci-status.md` on ci-evidence named the lane head 611ade039, **SUCCESS**, run 43147615979 (a docs-only push; its lanes judged by run 43144538685, green) — stop 1 :4 → :10. `origin/dev` = 2b11a9d29 = the brief's base, unmoved through this turn (re-read at 0c511d9f1's and 74019fe3f's pushes). No red of an earlier turn to fix.
- Stop 2's push (ab9670e32): run 43191935076, SUCCESS.
- Stop 3's push (b29387ba3, Parts A → D): run 43220268168, FAILURE — `E2E lanes / Lane 1 on temporary Supabase` died in global setup with `[e2e:setup] photo reaper proof upload failed: mime type text/plain is not supported`, and `E2E (Playwright, ethio-staging)`, which merges the lanes, followed it (`lanes=failure`). Classed as this turn's own (Part B gave lane 1 the pass); not re-run. Every other check green.
- Ruling 3's commit 0c511d9f1: run 43222749146, FAILURE — the same two jobs, the same line. Ruling 4 moved the judged run to its own commit.
- Stop 4's push (dac564c4a, docs only): run 43227226085, FAILURE — the same two jobs, the same line (the proof unchanged). Its lanes ran: `- Lanes: ran — not docs-only: no commit within 10 first-parent commits of 0c511d9f1… ran its lanes green`.
- The judged run, the last code commit 74019fe3f (ruling 4): run 43236871102, **SUCCESS**; `gh pr checks 34` every check pass (`Promote to main` skipping, as on every pull request). The E2E evidence names commit 76a7fdea7, the pull request's merge commit for 74019fe3f. Lane 1's setup log (`e2e-log-1`, `1.log` :5 → :27), read whole: the targets, the identity pool, `healed 0 stale EN rows`, `reaped 0 stale scratch role(s)` and `listing(s)`, `photo reaper proof: ok`, the photo backlog and the photo sweep (0), `reaped 0` categories and attribute definitions, `[e2e:maintenance] pruned 0 audit rows, 0 objects`, the INC-158 tripwire (`RATIFIED-AM GAP: 28 rows: …`, non-fatal, §13), `reaped 0 stale scratch rows`, `setup complete`; then `Running 174 tests using 1 worker, shard 1 of 16` → `168 passed`, `6 skipped`. Lane 1's env shows `E2E_MAINTENANCE: 1`, lane 2's `E2E_MAINTENANCE:` (empty), and lane 2's setup prints `maintenance skipped (owner: shard 1)`.
- `check-go docs/governance/briefs/housekeeping-3c.md --at 611ade039` on 0c511d9f1, exit 1:

```text
[check-go] at 611ade039441bfc45b112bf18fd5ae04689e6bd7 (--at 611ade039): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-JuvzJx; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
CF-BRIEF-16 docs/governance/briefs/housekeeping-3c.md:50 SCOPE names .claude/hooks/**/*.ts, which rule 00 forbids the executor
[check-go] 1 finding(s)
```

  The finding stands as the expected output: CF-BRIEF-16 is right that this brief's SCOPE (line 50) names `.claude/hooks/**/*.ts`, the path ruling 1 took out of the turn (ruling 3 item 1).
- The first live `- Repeat:` line, `docs/tracking/branches/cursor/housekeeping/e2e-last-failure.md` on ci-evidence (run 43236871102, :9): `- Repeat: 38 of 1393 tests repeated — specs directly changed 5/53, importers of a changed helper 0/60; budget 720 s`. The selection file the lane uploaded (`e2e-log-repeat/local-backend-repeat.txt`, 109 lines) ends with the summary it was read from: `- Repeat: each 2 on both projects; 1393 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 5 of 53 repeated; importers of a changed helper: 0 of 60`. No time-cap line (none in the file). The head shows the importers unrepeated (0 of 60), which is the case DEC-364's amendment hands to the supervisor (§14).
- The report's docs-only push (DEC-365's third live case): this commit changes only `docs/governance/reports/housekeeping-3c.report.md`, and its first-parent parent 74019fe3f ran its lanes green, so the `scope` job should skip the lanes. A report cannot read its own run: what its `- Lanes:` line says is stated in the chat and in the pull request's closing comment.

## 12. Limits

- No browser test ran locally. The E2E values are set (checked by name), but no spec changed. The behaviour changes in the browser runs (lane 1 and the nightly run the maintenance pass; its photo proof uploads a JPEG) happen only inside the global setup's maintenance pass, and running the reaper on ethio-staging from this machine is the nightly's job, not mine. CI's lanes are the proof (§11: lane 1's setup green on run 43236871102).
- The nightly was not run (TOLERANCES): DEC-369's staging half of the judge is the supervisor's read. Its after-counts `<n> / <n> / <n>` and their date stay open in §14; this executor reads no database.
- actionlint and gitleaks did not run locally (linux/x64 binaries on darwin/arm64); CI's build-and-check and secrets-scan judge them.
- CF-REDACT-1 (`scripts/ci/redaction-rules.test.ts`, turn 3b's) failed 2 of 30 local runs and passes alone: it depends on a random key (§13). CI may meet it, about one run in fifteen.
- The `/var/folders/…` path in §11's paste is the machine's temp dir; the snapshot it names was removed (the `--at` case asserts the removal).

## 13. Findings

- F2 — `tsconfig.json` :6 lists `eslint.config.js` in `include` while the root project has no `allowJs`, so the root typecheck reads nothing of it; the scripts project types it through `allowJs` (Part A). Not changed: `tsconfig.json` was not otherwise touched (ruling 1 item 7).
- F7 — `.cursor/rules/20-tests.mdc` :20 and `.claude/rules/20-tests.md` :14 still say "the shard-1 setup alone" reaps; rules turn 4 (ruling 1 item 2 d). The same words remain in `docs/features/e2e-harness.md` :627 (J3, the authoring law the rules cite), left for the same turn so the law and the rules change together.
- `e2e/global-setup.ts` :602 logs `[e2e:setup] maintenance skipped (owner: shard 1)` (lane 2 printed it on run 43236871102): since DEC-369 the owner is lane 1 or the nightly's first run, not a shard. The comment above it was corrected (comment-only scope); the log text is a code line for a later turn.
- CF-REDACT-1's random-key dependence: the rule `\bsb_(?:secret|publishable)_[A-Za-z0-9_-]+\b` in `scripts/ci/redaction-rules.json` :26 ends at a word boundary, so a generated key whose last character is `-` is masked up to that character and the test sees a trailing `-` left. It landed in turn 3b (c463c9ec2); out of this scope.
- Rule 00 step 6 (`.cursor/rules/00-protocol.mdc` :112) says the checks runner's typecheck step "reads Lovable's harness log and prints NOT RUN here". Since Part A it runs `bun run typecheck` and prints PASS or FAIL. For rules turn 4.
- `scripts/e2e-failure-report.ts` :3385 reads a missing SSR allowlist as empty (the base's `.catch(() => "")`, kept as it was), so a lost allowlist would surface as off-allowlist server errors, not as a missing file. Pre-existing; for a later turn.
- Stop 2 corrected stop 1's census: the scripts project reaches `.claude/hooks/lib.ts` by import, which stop 1's measurement (hooks included) never showed (ruling 2's PREVENTION, S589).
- The INC-158 tripwire printed on lane 1's first owned run (run 43236871102, `1.log` :25): `[e2e:maintenance] RATIFIED-AM GAP: 28 rows: buses-vans, heavy-machinery, vehicle-parts, …` — 28 active non-e2e categories on the temporary backend without an approved Amharic name. Non-fatal by design (INC-158). It never printed on a pull-request run before, because no lane ran the pass; whether the temporary backend's seed should carry approved names is for the supervisor.
- Lane 1's run of the pass is the first since 2026-10-21 (ruling 4); besides the proof, it met nothing: every other setup line is green (§11).
- Scratch left for the operator to remove: `/tmp/ethio-scratch/housekeeping-3c/` (the run 43144538685 fragment, the checks logs, the check-go outputs, a workflow copy, the report's draft, run 43236871102's lane logs and its `e2e-log-1`, `e2e-log-2`, `e2e-log-repeat` artifacts under `art-74019/`, the published evidence copy) and the `/tmp/ethio-scratch-redact-*.txt` files from the flake measurement.

## 14. Records

DEC — (ruling 1 item 9, in place of the brief's DEC-369; brackets filled where this lane can) DEC-369 (the supervisor, 2026-11-12 0x:xx New York, under G17 and G22 — the nightly and the lanes' workflows are closed surfaces; INC-1108; the supervisor's read of ethio-staging on 2026-11-12 by DEC-246: 645 `e2e-` roles growing about twenty a day since 2026-10-31, 59 scratch categories, 31 scratch locations; the census's log reads: lane 1 and the nightly both print `maintenance skipped (owner: shard 1)`) — the maintenance pass (every scratch prefix of `e2e/helpers/scratch.ts`, older than the cutoff; the prune, the storage sweeps, the tripwire) has an owner on every backend the tests run against: lane 1 of every pull-request run owns it on its temporary backend, and the nightly's first Playwright run owns it on ethio-staging — each by `E2E_MAINTENANCE: "1"` on that one step's env (CF-CID-7); no CI lane owned it before this turn (since cc93140c2, 2026-10-21, the last `E2E_SHARD: ${{ matrix.shard }}`), so each temporary backend started empty and staging was never reaped; the nightly's user sweep stays the one user mechanism. Frozen judge: adopted when lane 1's setup runs the pass green on the first pull-request run after this lands [run <id>] and the first nightly after the merge runs its setup green with the supervisor's read of staging at the cutoff's residue [before: 645 / 59 / 31; after: <n> / <n> / <n>, read <date>]; reverted (both lines removed) if the pass fails a setup twice.

DEC — (ruling 4) DEC-369's judge gains the line "lane 1's first green setup is run [43236871102]" (on the pull request, at 74019fe3f; the bracket after "this lands" stays open for the first pull-request run after the merge).

INC — INC-1112 — the photo reaper's proof (`e2e/global-setup.ts` :967 → :971, DEC-077 part 2) uploaded `card.txt` as `text/plain` into `listing-photos`, a bucket restricted to JPEG, PNG and WebP since 2026-10-28 (M7 proves the values on both projects); the pass had no owner since cc93140c2 (2026-10-21), so the proof never met the restriction until DEC-369 gave lane 1 the pass (runs 43220268168, 43222749146: `photo reaper proof upload failed: mime type text/plain is not supported`). Fix: the proof uploads a real JPEG from `madeJpeg` (housekeeping 3c). Class: a mechanism without an owner (DEC-369 is the guard; G35's window for a re-enabled mechanism). Status: FIXED (housekeeping 3c).

DEC — DEC-364 — amendment (housekeeping turn 3c; INC-1107): the repeat lane repeats what its budget holds and the evidence head says what that was (`- Repeat: …`); a helper change whose importers exceed the budget is covered by one operator-dispatched Flake check (DEC-184) over the importer list, which the supervisor requests in its ruling when the head line shows the importers unrepeated.

INC — INC-1107 — status line: FIXED (housekeeping turn 3c) — the `- Repeat:` head line; DEC-364 amended. INC-1108 — status line: FIXED (housekeeping turn 3c) — DEC-369; the judge's read-back at the records turn.

INC — INC-1110 — `.claude/hooks/land.ts` :389 reports a timed-out step as "exit 124" (reads `step.timedOut`, absent from `Step`); the dormant kit; found by the scripts typecheck's census (housekeeping 3c); fix at rules turn 4 with the kit's typecheck.

INC — INC-1111 — the nightly's serial full run exceeds the job's 360-minute ceiling (cancelled 2026-11-08, -09, -10; red 2026-11-11 after 5 h 08 min; the Cloudflare parity smoke dead at the install step) — the nightly has given no verdict for four days; a CI-turn item after the bundle; DEC-369's judge reads the setup, not the suite.

register row — (the brief's rows; the first row's exceptions as ruling 2 words them, which replaces ruling 1's) "every TypeScript file is typechecked" → tsconfig.json + tsconfig.scripts.json + the `typecheck` script → CF-TSC-1 → exceptions: "`.claude/hooks/**` and its three importers under scripts/ (`executor-hooks.test.ts`, `apply-blocks.ts`, `apply-blocks.test.ts` — 1,585 lines at ab9670e32) join at rules turn 4 (INC-1110); CF-TSC-1 holds the list to the import census" · "scratch rows are swept by their prefix" (turn 3b's row) → exceptions: "the nightly owns ethio-staging's pass (DEC-369)" · "the evidence states the repeat lane's coverage" → scripts/e2e-failure-report.ts + local-backend-repeat.txt → the reporter's self-test → exceptions: none · "a GO's claims are checked against the tree by a script" (turn 2's row) → `check-go.ts --at <commit>`.

changelog — 2026-11-1x housekeeping turn 3c (Opus 5.5): every script and the dormant kit's hooks are typechecked (`tsconfig.scripts.json`, the `typecheck` script runs both projects; the `Bun` global's reads become `node:fs`; CF-TSC-1); the nightly reaps ethio-staging (INC-1108, DEC-369); the E2E evidence head states the repeat lane's coverage (INC-1107; DEC-364 amended); `check-go.ts --at <commit>` judges a brief against its base. No product code, no migration, no string.

changelog — the line's additions: (ruling 1 item 9) "; the checks runner runs the typecheck itself; CF-BRIEF-16 refuses a SCOPE under rule 00's forbidden paths; lane 1 owns the pass on each temporary backend" · (ruling 2) "(the dormant kit and its three importers excepted until rules turn 4)" · (ruling 4) "; the photo reaper's proof uploads a real photo (INC-1112)".

slip — (ruling 4, PREVENTION) from now a GO or ruling that re-enables a dormant mechanism names its first run as a possible red of its own ("the first run after <date> may red on drift the gap hid; a red there is this turn's STOP, not a code finding of the turn's parts") — v1.18 G35 addendum; the template's TOLERANCES line gains the sentence (the records turn, DEC-346).

roadmap — line 23 ("The housekeeping turn") gains "turn 3c: scripts/ under tsc, INC-1107, INC-1108 (DEC-369), check-go --at"; the records turn writes it (DEC-346).

roadmap — (ruling 2) Rules turn 4's roadmap line gains "the kit's typecheck: `.claude/hooks/**` into the scripts project, its `Bun` uses to node, land.ts :389 (INC-1110), the three importers back in".
