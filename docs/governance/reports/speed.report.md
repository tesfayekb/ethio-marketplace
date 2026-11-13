# Speed — one full CI run per turn, lanes by measured time, the pre-push gate — report
Base: 203907b3d (the brief's `Base: dev 50783a30e`, branched at dev's tip after PR #37's merge as STEP 0 says) · Final commit: b44c1a455 · Brief: docs/governance/briefs/speed.md (sha256 acc4df3d82103235b2996305a0e20f4c6262a1253b13a98bcdceccfd383816f9) · Ruling: docs/governance/briefs/speed-ruling-1.md (sha256 cc7360e2182873c26c4418f4daf80a29d99b71adf29f8a7ec928630dfc83d7f6)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on b44c1a4

CI: run 43463527584 on b44c1a455 — SUCCESS (every check on pull request #38 green). Base: run 43431755160 on 203907b3d — SUCCESS.

## 1. Done / not done, by part and step

| Part / step | State | Commit |
| --- | --- | --- |
| STEP 0 — brief saved, roadmap line 3, draft PR #38 | done | 6ee4d129a |
| STEP 1 — census; stop 1 | done; ruling 1 answered it | 58257391c |
| Part A — the pre-push gate (DEC-374): rules 00, 20, 40, 60, AGENTS.md :26, the GO template's checks line, CF-RULES-1; ruling 1 saved bare | done | 92b8e21ce |
| Part B — a proven code tree is not proven again (DEC-375 a): `codeTreeId`, the `code-tree-<id>` index, the lookup, both readers, CF-DOCS-1 → 10 | done | fbaf43467 |
| Part C — lanes by measured time (DEC-375 b), two workers (DEC-376), the serial lane, the repeat budget, CF-LANES-1 → 3, LWM-1/2 | done; its workers and serial tags changed by ruling 11 below | 93ff0e6bf |
| Part D — rules turn 4's items R2 → R7, AGENTS.md :24 → :25, CF-BRIEF-18, the GO template's setting sentence | done | 0e668e5b9 |
| STEP 6 — typecheck, lint, scripts laws, `bun run checks`, `check-go --at` | done | — |
| STEP 7 — one push, the run read, ONE further code commit (ruling 11) | done: run 43457682073 red → b44c1a455 → run 43463527584 green | b44c1a455 |
| STEP 8 — self-review, this report | done | this commit |

Not done: `REPEAT_SECONDS_PER_TEST` was not re-measured (ruling item 4): neither run repeated a spec ("Repeat: nothing to repeat"), and after ruling 11 (b) the lanes run one worker, the state its 4.7 was measured in. INC-1135 is not fixed (item 5's "otherwise" branch, §10 and §13).

## 2. Files changed

`git diff --name-only 203907b3d` (46 files):

```
.cursor/rules/00-protocol.mdc
.cursor/rules/12-ui.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/40-ci-evidence.mdc
.cursor/rules/60-report.mdc
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/local-backend-proof.yml
AGENTS.md
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/governance/briefs/speed-ruling-1.md
docs/governance/briefs/speed.md
docs/governance/go-template.md
docs/governance/reports/speed.stop-1.md
docs/tracking/intentional-deletions.txt
playwright.config.ts
roadmap.md
scripts/brief/go-laws.ts
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/lane-plan.ts
scripts/ci/lane-weights.json
scripts/ci/lane-weights.test.ts
scripts/ci/lane-weights.ts
scripts/ci/turn-checks-allowlist.txt
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/lanes-allowlist.txt
scripts/conformance/lanes.test.ts
scripts/conformance/rules.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-failure-report.ts
scripts/fixtures/docs-only/artifacts-e2e-results-smoke.json
scripts/fixtures/docs-only/jobs-green-43426917119.json
scripts/fixtures/docs-only/run-41974149932.json
scripts/fixtures/docs-only/run-43319295611.json
scripts/fixtures/docs-only/run-43426917119.json
scripts/fixtures/docs-only/run-43431755160.json
scripts/fixtures/docs-only/run-43435542489.json
scripts/fixtures/docs-only/runs-8511aeed9.json
scripts/fixtures/lane-plan/results-lane-11.json
scripts/fixtures/lane-plan/results-lane-3.json
```

New (`git diff --name-only --diff-filter=A 203907b3d`): the two briefs, the stop report, `scripts/ci/lane-plan.ts`, `lane-weights.json`, `lane-weights.test.ts`, `lane-weights.ts`, `scripts/conformance/lanes-allowlist.txt`, `lanes.test.ts`, `rules.test.ts`, the six `scripts/fixtures/docs-only/*` files above other than `runs-8511aeed9.json`, and the two `scripts/fixtures/lane-plan/*` files. Deleted (`--diff-filter=D`): `scripts/fixtures/docs-only/runs-8511aeed9.json`, declared with `[intentional-delete]` in Part B's commit and its line in `docs/tracking/intentional-deletions.txt`. Every path is in the brief's SCOPE, ruling 1 item 9's additions or the standing allowance.

## 3. Behaviour contract — answer tables before → after

The scope job (`ci.yml` › Scope, `scripts/ci/docs-only.ts`):

| Push | At 203907b3d | Now |
| --- | --- | --- |
| docs-only push (every changed path a record) | walk first parents ≤ `WALK_BOUND`, skip when a green run's tree is found | the code tree's id is looked up in `code-tree-<id>` artifacts; skipped when a candidate counts |
| merge commit of a pull request proven green | lanes run again | skipped: `Lanes: skipped — the code tree was proven by run <id> (<event>, <ref>, head <sha7>)` |
| any code change | lanes run | lanes run; the job uploads `code-tree-<id>` (`overwrite: true`, 30 days) |
| candidate counts | — | this repository's run, `.github/workflows/ci.yml`, completed `success`, a lane job succeeded and the verdict succeeded (`lanesGreen`); at most 5, newest first, never this run, never a fork's |
| failed read, unknown shape, no candidate | lanes run | lanes run (`ran — no proven code tree: …`) |
| outputs | `docs_only`, `lanes` | `docs_only`, `lanes` (names kept), `tree` |

Readers of the line: `ci-status-report.yml` :71 matches `startsWith('skipped — ')` and labels rows `skipped (proven tree)`; `scripts/e2e-failure-report.ts` writes `last E2E run X ran no lanes — <reason from the line>`.

The browser lanes (`local-backend-proof.yml`):

| Lane | At 203907b3d | Now (b44c1a455) |
| --- | --- | --- |
| 1 → 16 | `--shard=n/16`, one worker | the lane plan's files through `--test-list` (by measured seconds), `--grep-invert "@global-state|@a11y"`, one worker |
| smoke | three spec files plus `@a11y`, one worker | `--grep "@a11y" --workers=1` only (the serial lane); re-runs nothing |
| webkit, email | unchanged commands, one worker | unchanged commands, one worker |
| repeat | budget 720 s fixed | budget = the slowest planned lane's seconds (`lane-plan.ts --repeat-budget`, 643 s today) |
| evidence | lane table | lane table + each numbered lane's `- Plan (DEC-375 b): …` line + the summary's `- Lane plan …; planned/test seconds: …` |

The GO check (`scripts/brief/go-laws.ts`): CF-BRIEF-18 is new. A setting named in a code span, which is a YAML key under `.github/workflows/` or a `process.env` read in `playwright.config.ts`, and which a `docs/spec/spec-ledger.md` line beginning `- DEC-<n>` names, must have its newest such decision cited. `bun scripts/brief/check-go.ts docs/governance/briefs/speed.md --at 203907b3d` prints the one expected line, `CF-BRIEF-18 docs/governance/briefs/speed.md:9 names E2E_WORKERS; its newest decision is DEC-230`, then `[check-go] 1 finding(s)`. Every other law answers as before.

The rules: rule 00 step 7 and rule 20's browser line name the WebKit projects (R6); rule 20 J3 names lane 1 and the nightly as the maintenance owner (R5); rule 12 :79 names `Field`, `focusFirstRefusal` and `reportMissing` (R2); rule 40 names the per-ref evidence path with its `git show` lines (R3), the no-run-after-fifteen-minutes rule (R4) and the new-project census rule (R7). DEC-374's gate is in rules 00, 20, 60 and AGENTS.md :26. J8 is as at base.

## 4. Censuses

- The brief's CONSUMERS grep (`rg -n "bun run checks|e2e:local|each whole|both projects|half an hour|tens of minutes" .cursor AGENTS.md docs/governance/go-template.md`) is in stop 1. Every hit was changed in Part A, and CF-RULES-1 holds it.
- Item 4's readers of the smoke source, before its three specs left it:
  - `rg -n "smoke" scripts/e2e-failure-report.ts scripts/*.ts scripts/ci/*.ts .github/workflows/*.yml .cursor/rules docs/features/e2e-harness.md`.
  - The `[a11y]` summary (`scripts/e2e-failure-report.ts` :723, :932 → :934) and the server-error census (:1076 → :1085) read every source's log. `a11y.spec.ts` stays in the serial lane.
  - So no reader needed `shell.spec.ts`, `auth-signout.spec.ts` or `smoke-auth-i18n.spec.ts` in smoke. Run 43463527584's accessibility section reads 10 page×project checks from the serial lane.
- Ruling 11 (b), the cause of ATR-1's red:
  - Searches: `rg -n "tier_rank" supabase/migrations`, `rg -ln "listing_packages" e2e`, and `lane-plan.ts --lane 10` over the captured list.
  - `public.level_ranks_rebuild()` (`supabase/migrations/20261104153313_…sql` :66 → :109) renumbers every level by `ORDER BY sort, key` after every statement on `listing_packages`.
  - `admin-monetisation.spec.ts` :1437 (MON-16) and :1489 (MON-17) seed a level at `sort: 0`, which renumbers premium from 2 to 3.
  - Lane 10's plan holds `admin-listings.spec.ts` and `admin-monetisation.spec.ts` together.
- Item 5, TR-30 (`e2e/admin-translations-governance.spec.ts` :1267 → :1325):
  - The summary appeared with no error, but the probe key's `zxa` row was absent.
  - The generator `src/features/admin/translations/use-translations.ts` :333 → :365 pages the `zxa` list by `offset` while writing into it, and counts a refused row without naming it.
  - The cause is outside the test's fixture.
- Two-worker and serial-tag mentions, before ruling 11's commit: `rg -n "TWO_WORKER_SHARE|SERIAL_TAGS|SERIAL_GREP|isSerial|DEC-376|two workers|2 workers|global-state"` over `scripts/ci`, `scripts/conformance`, the workflow, `playwright.config.ts`, AGENTS.md, `.cursor/rules` and the two feature guides. Each hit is changed in b44c1a455 except `scripts/conformance/rules.test.ts` :79, which is the executor's local-run line and not the CI lanes.

## 5. Tests

- New:
  - CF-RULES-1 (`scripts/conformance/rules.test.ts`).
  - CF-DOCS-7 → 10. CF-DOCS-2, 3, 5 and 6 were rewritten to the new rule; 1 and 4 are unchanged. The fixtures were captured from the Actions API (runs 41974149932, 43319295611, 43426917119, 43431755160, 43435542489; jobs of 43426917119; the artifacts answer). Tree ids come from real `git ls-tree` output in a scratch repository.
  - LWM-1/2 (`scripts/ci/lane-weights.test.ts`, on captured lane results of run 43431755160).
  - CF-LANES-1 → 3.
  - CF-BRIEF-18: a planted case in CF-BRIEF-14's tree, the in-force run inside the CF-BRIEF-2 case, and a focused case.
- Changed:
  - CF-BRIEF-14's exact lists gain CF-BRIEF-18 (`briefs.test.ts`, the bare-root list and check-go's named list).
  - `wired.test.ts` names CF-RULES-1, CF-DOCS-10, CF-LANES-3, LWM-2 and CF-BRIEF-18.
  - The e2e-failure-report self-test reads the new headline.
- Ruling 11 changed CF-LANES-1 and CF-LANES-3:
  - CF-LANES-1's findings carry a key (`@<tag>` for a test every lane leaves out). Its planted "@a11y test in none" replaces "@global-state test in none".
  - CF-LANES-3 expects `LANE_WORKERS` (1) in every lane. Its planted cases are a job-wide `"2"` (18 findings) and a numbered `--workers=2` (16 findings).
- Red-first evidence:
  - CF-BRIEF-18 finds the planted `E2E_WORKERS` miss and the brief in force.
  - With `lanes-allowlist.txt` cut to its header, CF-LANES-1 fails, naming `admin-categories-images.spec.ts › CI-5 … @global-state [desktop-1280] runs in 0 lanes (serial 0, numbered 0)` and the other `@global-state` tests. The line was then restored.
  - CF-DOCS-10's planted mismatch between the writer's line and a reader fails.
- Unit totals:
  - `bunx vitest run scripts --maxWorkers=2` on b44c1a455: 117 files, 605 passed, 1 skipped.
  - CI's Component tests: run 43463527584 has 484 files and 3038 passed. Run 43457682073 had 1 failed and 3037 passed (CF-REDACT-1, §11).
- `bun run typecheck`: both projects clean.
- `bun run checks` on b44c1a455:
  - `checks (fast): 26 PASS · 0 FAIL · 446s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 506s`
  - On 0e668e5b9: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 520s`.
- The 25 NOT RUN, each with its reason:
  - The scope job's two steps: they need the Actions API's artifacts.
  - actionlint and gitleaks: pinned linux/x64 binaries, and this machine is darwin/arm64.
  - The three dependency installs (build-and-check, component-tests, bundle-budget): already installed, and a package change is its own turn.
  - dependency-audit (2): the advisory service is not reachable from the sandbox.
  - e2e-preflight (4): it needs the staging credentials.
  - e2e (6): it merges the lanes' artifacts.
  - promote (4): only CI promotes.
  - semgrep's SARIF upload and its warning (2): GitHub-only.
- Browser runs:
  - Under DEC-374 the gate's browser runs are the test ids the turn adds or changes. This turn changed no file under `e2e/` and added no test id, so no browser test ran locally.
  - CI on the pull request ran every test: run 43463527584 passed 2527, failed 0, had 1 flaky and skipped 356, out of 2884.
  - The J-audit line does not apply (no `e2e/**` change).
- `[ssr-error]` counts: run 43457682073's census holds one line (`gate fetch threw upstream ssr language gate timed out after <n>ms`, shard 11, non-gating). Run 43463527584's census is in its `local-backend-last-failure.md`, which opens "last E2E run 43463527584 passed".

## 6. K2 — siblings that bypass the mechanism

- Greps: `rg -n "docs-only push" .github/workflows/ci.yml`; `rg -n "\"smoke\"|'smoke'|smoke\b" scripts .github/workflows`; `rg -n "offset" src/features/admin/translations/use-translations.ts`.
- `ci.yml` :394, :583, :704 and :754 comments still say "docs-only push". They sit outside the scope job, which the brief's scope narrows to, so they were left.
- `src/features/admin/translations/use-translations.ts` :333 → :365 pages a data-API list by offset. The law's mechanism is `readAllPages`. It is out of scope (`src/`) and is the likely cause of TR-30's red (§13).
- The scope decider, the lane plan and the GO laws have no other copy. `rg -n "WALK_BOUND|first-parent" scripts .github` finds no remaining reader of the retired walk.

## 7. Allowlists and guards

- `scripts/conformance/agents-lines-allowlist.txt`: 2 → 2 lines. Its key moved `AGENTS.md (10718)` → `AGENTS.md (10759)`, with the reason naming each step (10718 → 10776 → 10800 → 10759) and `until` unchanged.
- `scripts/conformance/briefs-allowlist.txt`: 0 → 1 line, `docs/governance/briefs/speed.md:9 names E2E_WORKERS; its newest decision is DEC-230`.
  - Reason: the brief is saved byte for byte and not edited, and CF-BRIEF-18 was born from this brief's own miss. It holds until the next brief's STEP 0, when CF-BRIEF-13 refuses a line keyed to a brief not in force.
  - `until`: DEC-375. The kit accepts only a date or an id there (§10).
  - The header names the new key form.
- `scripts/conformance/lanes-allowlist.txt`: new, 1 line, `@global-state`.
  - Reason: the tests stay with the nightly's serial run (DEC-028). TR-30 failed in the serial lane on run 43457682073 for a cause in the pseudo generator, not its fixture (ruling 1 item 5).
  - `until`: INC-1135.
  - Part C's two lines (`email`, `smoke`, until DEC-376) left with ruling 11 (b): every lane now runs one worker, so CF-LANES-3 has no exception.
- `scripts/ci/turn-checks-allowlist.txt`: 10 → 10 lines; :11's reason was brought up to date.
- `docs/tracking/intentional-deletions.txt`: 69 → 70 entries.
- Guard self-tests run: CF-BRIEF-14 (planted tree and check-go spawned), CF-LANES-1 and CF-LANES-3's planted cases, CF-DOCS-10's planted mismatch, AGL-2, CF-KIT-7 (the new allowlist reads key `found` / `findings`), and `wired.test.ts`.

## 8. Strings

None. The flag is no-new-string, and `git diff --name-only 203907b3d -- src/i18n` is empty.

## 9. Migrations

None. The flag is no-migration, and `git diff --name-only 203907b3d -- supabase` is empty.

## 10. Departures

1. **Stop 1 and ruling 1.** Ruling 1 is saved bare in Part A's commit (sha256 equal). Its items 1–9 were built as written, with these named departures:
   - The scope job's name "Scope (docs-only push, DEC-365)" stays, because the status reporter matches it.
   - Part C's numbered lanes write their plan lines in the lane job's evidence step. The summary job gains only the plan's summary line.
   - CF-LANES-1 lists tests with `playwright test --list` (collection only: no browser, server or backend).
2. **Ruling 11 (b): the lanes back to one worker**, commit b44c1a455.
   - On run 43457682073, ATR-1 (`e2e/admin-listings.spec.ts` :2249) read premium's `tier_rank` as 3, not 2.
   - Lane 10 also ran `admin-monetisation.spec.ts`, whose MON-16 (:1437) and MON-17 (:1489) seed a level at `sort: 0`. `level_ranks_rebuild()` then renumbers every level.
   - The cause is another test's write to ranks every live ad shares, not ATR-1's own scratch state in one module. So the rule's "otherwise" applies:
     - `E2E_WORKERS: "1"` for every lane.
     - AGENTS.md :31's clause reads "16 lanes by measured time, 1 worker each".
     - CF-LANES-3 expects one.
     - The repeat budget is the slowest planned lane's seconds, without the two-worker share.
     - The comment in `playwright.config.ts` and the two feature guides say so.
   - Two workers took 63.9 % of the plan's one-worker seconds on that run.
3. **Item 5: INC-1135 stays OPEN.**
   - TR-30 (`@global-state`, desktop-1280) failed in the serial lane: "pseudo text never landed for admin.translations.title". The cause is outside its fixture (§4, §13).
   - The serial lane runs `--grep "@a11y"`, and CF-LANES-1 carries `@global-state` as an allowlist line until INC-1135.
   - Rule 20's J8 and the harness guide's J8 are back to their base text.
   - That lane held 20 project-test pairs: 16 `@global-state` pairs and the 4 `@a11y` pairs that run 43463527584's serial lane also ran. Of the 20, 15 passed, 1 (TR-30) failed and 4 were skipped.
4. **CF-BRIEF-18's allowlist `until` is `DEC-375`**, not the ruling's "the next brief's STEP 0". `readAllowlist` accepts only a date or an INC/DEC id. CF-BRIEF-13 already refuses the line once another brief is in force, and the reason carries the ruling's words.
5. **AGENTS.md bytes, AGL-2:**
   - 10718: the base.
   - 10776: Part C, :31's first clause.
   - 10800: Part D. R3 adds 63 bytes on :24; :25 names "the three above" and recovers 39.
   - 10759: ruling 11 (b), :31's clause back to "1 worker each".
   - :26's DEC-374 line kept its 134 bytes.
6. **`REPEAT_SECONDS_PER_TEST` stays 4.7**: no spec was repeated on either run, and the lanes are back at one worker (§1).
7. **Corrections to the brief** (ruling item 7, the brief stays as saved):
   - DEC-374's "the repeat lane repeating each changed spec" is corrected in §14.
   - DEC-375 (c)'s judge is replaced by DEC-376's.
   - The ESTIMATE is superseded by §11's measurements.
8. **Correction to INC-1135's text**: `shell.spec.ts` holds no `@global-state` test, only a comment. The tests are in three files: `admin-categories-images.spec.ts`, `admin-translations-console.spec.ts` and `admin-translations-governance.spec.ts`. The serial lane's 20 project-test pairs on run 43457682073 are those tests plus `a11y.spec.ts`'s `@a11y` tests. §14 keeps the ruling's text word for word, with a `slip —` line.
9. **DECIDE-AND-NAME:**
   - `docs-only.ts` keeps its name, and its readers are unchanged.
   - A dev push finds the pull request's proof by its code tree's id: the `code-tree-<id>` artifact, then the run's API answer.
   - The weights file holds seconds and test count per spec file and project, plus the run id and date. Its maker is `bun scripts/ci/lane-weights.ts <folder of results.json>`.
   - The single-worker steps are none now: every lane runs one.
   - The repeat budget is `round(max(planned lane seconds))`.
   - CF-RULES-1 lives in `scripts/conformance/rules.test.ts`.
   - The gate's measured time is 506 s on b44c1a455 and 520 s on 0e668e5b9, about nine minutes.
10. **Scratch copies** under `/tmp/ethio-scratch/speed/` are the operator's to remove: the `--list` capture, the lane results, the base workflow copy, red-first files, CI job logs and JSON answers, and the probes `b18.ts`, `tree-id.ts` and `m1.ts`.

## 11. CI

Base. The root `ci-status.md` on ci-evidence, first six lines:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `203907b3db66a298664d0d4019142a4109a4d7d5` (short `203907b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-13T13:39:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43431755160
```

The two-step SHA check: `git rev-parse origin/dev` is 203907b3d…, which the file's commit equals. There was no red of an earlier turn.

This lane: `branches/cursor/speed/ci-status.md`, first six lines:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `b44c1a4556580eb14cd1b4f4b598993d25c59069` (short `b44c1a4`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-13T16:50:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43463527584
```

Its next line reads `- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-e4a84e9b91f5… (0 read)`. The first run's scope job indexed `code-tree-e358dffe362e…`, which equals `readCodeTreeId("0e668e5b9")` computed locally.

The reds of run 43457682073 (0e668e5b9), each classified before any code changed. There were no re-runs.

| Job | Class (rule 40) | Cause | Handled |
| --- | --- | --- | --- |
| Lane 10 | (e) | ATR-1 `[3]` vs `[2]`: MON-16/17's sort-0 scratch level, the same lane's backend, two workers | ruling 11 (b): one worker, b44c1a455 |
| Lane smoke | (e) | TR-30 `@global-state`: no `zxa` row for the probe key; the cause is in the pseudo generator (`src/`) | item 5: the serial lane on `@a11y`, b44c1a455; INC-1135 open |
| Lane webkit | (e), not this turn's | the backend never started: migration `20261028235443_…` proof (2) "the door after the import answered success". Its rate window rolled over between two saves (server record `16:00:00.002`) | §13; the migration is not edited (no-migration); green on run 43463527584 |
| Component tests | (e), not this turn's | CF-REDACT-1 (`scripts/ci/redact.test.ts` :129): a random JWT probe ending in `-` left `-` after the mask | §13; outside scope; green on run 43463527584 |
| E2E (Playwright, ethio-staging) | the verdict of the lanes above (class TESTS) | — | green on run 43463527584 |

Run 43463527584 (b44c1a455): every check on the pull request is green, and the comment is posted. Webkit had one flaky pass, SAP-1 (webkit-390, `sage-ad-page.spec.ts`). It is ledgered once; the ledger's 7-day counts top at 2 (SO-12), so no test is at three.

Measurements (ruling 11's list):

| | Run 43457682073 (0e668e5b9, two workers) | Run 43463527584 (b44c1a455, one worker) |
| --- | --- | --- |
| push → result | 15:56:40 → 16:10:30, 13.8 min | 16:31:12 → 16:50:18, 19.1 min |
| lanes 1 → 16 planned / test seconds | 1 642/391, 2 641/365, 3 641/398, 4 640/417, 5 640/410, 6 641/424, 7 641/345, 8 641/387, 9 641/341, 10 643/426, 11 640/453, 12 641/489, 13 640/395, 14 641/427, 15 641/477, 16 641/409 | 1 642/664, 2 641/737, 3 641/701, 4 640/647, 5 640/661, 6 641/717, 7 641/722, 8 641/600, 9 641/680, 10 643/559, 11 640/641, 12 641/657, 13 640/596, 14 641/687, 15 641/701, 16 641/622 |
| test time vs the plan's 10,255 one-worker s | 6,554 s, 63.9 % | 10,592 s, 103.3 % |
| slowest lane vs mean (test seconds) | 489 / 409.6, +19.4 % | 737 / 662.0, +11.3 % |
| slowest numbered job | lane 15, 670 s | lane 2, 928 s |
| serial lane | 342 job s; 20 tests (15 passed, 1 failed, 4 skipped) | 192 job s; 4 tests (`@a11y`), all passed |
| repeat lane | budget 482 s; nothing to repeat | budget 643 s; nothing to repeat |
| email / webkit | 172 s / backend failed | 215 s / 765 s |

No lane was more than 25 % over the mean (item 11 d), so the weights were not refreshed.

Lane 15's fixed overhead by step on run 43463527584: job 927 s, of which "Run proof lane" took 701 s. The other 226 s:
- Load the backend images: 64 s.
- Start backend and apply all migrations: 75 s.
- Install Chromium's system libraries: 19 s.
- Build E2E app: 12 s.
- Restore the backend images: 9 s.
- setup-cli: 8 s.
- Dispose temporary backend: 8 s.
- Cache bun install: 5 s.
- Cache Playwright browsers: 5 s.
- checkout: 3 s.
- Set up job, setup-bun, keeping the lane evidence and the two uploads: 2 s each.
- The rest: 1 s or under.

Run 43457682073's lane 15 had 213 s of overhead (690 − 477).

## 12. Limits

- The scope job's lookup and index run only in a GitHub run. Their local proof is CF-DOCS-1 → 10 on captured answers. The first real reuse is this report's docs-only push, and the merge.
- `ci-status-report.yml` runs from the default branch, so its new match is live after the merge. In this turn its proof is its self-test.
- No local browser run: the turn changed no spec and added no test id. The E2E values are set by name; their values were not read.
- actionlint and gitleaks are NOT RUN locally (pinned linux/x64 binaries); CI ran both green.
- `REPEAT_SECONDS_PER_TEST` could not be re-measured: nothing was repeated.
- TR-30's root cause was read from code, not proven on a backend. The test's own log does not print the summary's written/failed counts.

## 13. Findings

1. **Global state in lane tests (structural; it blocks DEC-376's two workers).**
   - MON-16 (`e2e/admin-monetisation.spec.ts` :1437) and MON-17 (:1489) insert a scratch level at `sort: 0`.
   - `level_ranks_rebuild()` (`supabase/migrations/20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql` :66 → :109) renumbers every level after each statement on `listing_packages`. Every live ad's `tier_rank` moves.
   - ATR-1 (`e2e/admin-listings.spec.ts` :2249) asserts premium's rank `[2]`.
   - Any test that seeds a level below an existing one is global state, though not tagged `@global-state`. Two workers in one backend expose it.
   - Not fixed: it is outside item 11 (b)'s one-module rule, and the lanes went back to one worker.
2. **TR-30 and the pseudo generator (multilingual, phantom success).**
   - `src/features/admin/translations/use-translations.ts` :333 → :365 reads the `zxa` list by `offset` while writing into the same list. The data-API law says `readAllPages`, keyset.
   - Its `catch` at :356 counts a refused row and goes on.
   - The summary then shows success-shaped counts while the probe key has no row (run 43457682073, serial lane, desktop-1280).
   - The failure body: `Error: pseudo text never landed for admin.translations.title` · `Expected: "machine|true|true|true"` · `Received: "missing"` · `Timeout 30000ms exceeded while waiting on the predicate` · `at e2e/admin-translations-governance.spec.ts:1303:7`.
   - Out of scope (`src/`); it keeps INC-1135 open.
3. **CF-REDACT-1's probe exposes a redaction gap.**
   - `scripts/ci/redaction-rules.json` :21's JWT pattern ends in `\b`. When a token's last base64url character is `-`, the mask stops before it and the trailing `-` stays.
   - `scripts/ci/redact.test.ts` :80 → :82 builds random parts, so the test fails about one run in 64 (run 43457682073, Component tests).
   - Nothing beyond that trailing `-` stays unmasked.
   - Out of scope (`scripts/ci/redaction-rules.json`, `redact.test.ts`).
4. **A migration's proof depends on the clock.**
   - `supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql` :1438 → :1446 expects the second `admin_save_translation` inside one rate window to be refused. Its server record is stamped `16:00:00.002`: the window rolled over between the two saves, and the backend did not start (run 43457682073, webkit lane).
   - An applied migration is not edited. A later migration or the proof's own window is the records turn's to plan.
5. The four stale "docs-only push" comments in `ci.yml` (§6).

## 14. Records

DEC — DEC-374 (the supervisor, 2026-11-13 under G17, flagged to the operator 2026-11-12 21:4x New York; his words "THAT IS VERY VERY LONG. ITS AN ISSUE") — the executor's pre-push gate is `bun run checks` with the typecheck, the lint, the touched unit tests and the scripts laws, plus the browser runs of the test ids the turn adds or changes and each red-first run; no spec file runs whole locally unless the turn wrote it new; the push follows at once; CI on the pull request is the full proof: every test in its lane, and the repeat lane repeating the changed specs that fit its budget, directly changed first, with no retries (DEC-283). Why: the whole-file local runs repeated CI's proof serially against a shared staging backend (the pictures turn's report: "518 tests" in about 35 minutes before the push), while the gate itself takes 506 s. Frozen judge: over the next five build turns, adopted if CI reds that a removed local whole-file run would have caught are at most one; whole-file runs of the changed specs return if they are two or more.

DEC — DEC-375 (the supervisor, 2026-11-13 under G17 and G22 — the lanes, the scope decider and the promote path are closed surfaces; the operator's words 2026-11-12 21:51 "THE DURATION OF EACH CI CAN NOT BE THIS LONG"; measured: push to result 20–27 minutes, shards 4.4–18.6 minutes on run 43305919223) — (a) a push whose code tree (the tree with the records set aside) equals the code tree of a run of this repository that completed green with its lanes run reuses that proof: the scope job indexes each tree it sends to the lanes (`code-tree-<id>`) and looks its own up, so the merge commit of a pull request proven green, and a docs-only push, run no lanes again; DEC-365's first-parent walk is retired into this rule and its count of safe skips continues here. (b) Every Chromium test runs in exactly one lane: lanes 1 → 16 are split by measured seconds per spec file (the lane plan and its weights file), not by count; the `smoke` lane is the serial lane (the `@a11y` and `@global-state` tests) and no longer re-runs specs the sixteen run; the repeat lane's budget ends with the slowest planned lane. Frozen judges: (a) adopted when the first three merges whose tree equals a proven tree promote main without running the lanes and no later dev run shows a red the reused proof missed; reverted at the first such red. (b) adopted when the slowest of lanes 1 → 16 is within 25 % of their mean on five code runs [this turn: +11.3 % on run 43463527584 at one worker; +19.4 % on run 43457682073 at two]; back to `--shard` if not.

DEC — DEC-376 (the supervisor, 2026-11-13, under G17, G22 and the OVERRIDE RULE — put to the operator in the reply that carried ruling 1 of the speed turn; his paste of that ruling is its approval) — the browser lanes run two workers again (lanes 1 → 16, `webkit`, `repeat`; the email lane and the serial lane stay at one), replacing the state DEC-230's rule left (one worker since run 1088, 2026-10-21). What changed since: the two causes are fixed (INC-814, turn 22; INC-817, turn 22c); every scratch key and identity is worker-tagged (the speed census's list); the executor's local runs have used two workers on every turn. The count restarts: a red or a flaky test caused by two workers sharing a backend, which is not a fix of the test's own scratch state in the turn that finds it, returns the lanes to one worker with no further exception until a new decision on new evidence. Frozen judge: adopted when over the next ten code runs there is no such failure and the median test time of lanes 1 → 16 is at most 75 % of the plan's one-worker seconds [this turn: 63.9 % on run 43457682073; that run's lane 10 red (ATR-1 read premium's rank 3 while MON-16/17's sort-0 scratch level shared the backend) met the count's rule, so the lanes returned to one worker in b44c1a455] (DEC-217 measured 67 → 78 %).

INC — INC-1135 — the `@global-state` tests (four spec files: admin-categories-images, admin-translations-console, admin-translations-governance, shell) ran in no per-push lane (every lane's command excluded them, local-backend-proof.yml :788 → :798) and only in the nightly's serial run on staging (DEC-028, nightly-e2e.yml :151 → :163), where their failures are non-gating; that run wrote no results on 2026-11-12 ("Sources without results: full") and the nightly concluded FAILURE every day from 2026-11-08 to 2026-11-12 — so no pull request and no promotion was judged on them. Cause: DEC-028 excluded them for the shards' shared staging database; since DEC-211 each lane has its own backend and the reason no longer held. Fix: the serial lane runs them on every push, one worker, its own backend; the speed turn; [OPEN — the lane runs `@a11y` only; the failure bodies in §13]. Class: a rule kept after its cause went away; a test set whose only runner can fail without anyone judging it.

register row — "the executor's pre-push gate (DEC-374)" → rule 00 + `bun run checks` → CF-RULES-1 → exceptions: none · "a proven code tree is not proven again" → `scripts/ci/docs-only.ts` → CF-DOCS-1 → 9 → exceptions: none (the DEC-365 row widened) · "every Chromium test in exactly one lane, split by measured time, two workers (DEC-375 b, DEC-376)" → the lane plan and its weights file → CF-LANES-1 → 3 → exceptions: the email lane and the serial lane at one worker · "a GO cites the decision that set a setting it names" → the GO checker → CF-BRIEF-18 → exceptions: `speed.md` until the next brief's STEP 0.

changelog — 2026-11-1x the speed turn (Opus 5.5): one full CI run per turn — a merge whose code tree the pull request's run proved green promotes main on that proof (DEC-375 a); the lanes split by measured time with two workers each, push to result 19 minutes from 20–27 (DEC-375 b, DEC-376); the executor's pre-push gate without whole-file local browser runs (DEC-374); rules turn 4's items (the per-ref evidence path, the maintenance owner's words, the WebKit projects in the rules, the missing-run rule); the smoke lane is the serial lane and re-runs nothing; the `@global-state` tests stay with the nightly — INC-1135 OPEN; a GO cites the decision behind a setting it names (CF-BRIEF-18).

slip — The texts above are copied word for word, but ruling 11 (b) made some of them false after run 43457682073, and the supervisor rules their wording at the records turn:
- DEC-375 (b) says "the `@a11y` and `@global-state` tests", while the serial lane runs `@a11y`.
- Register row 3 says "two workers (DEC-375 b, DEC-376)", while every lane runs one.
- Register row 3's exceptions name "the email lane and the serial lane at one worker"; now there are none.
- The changelog says "with two workers each".
- Register row 2 says CF-DOCS-1 → 9, while the tests are CF-DOCS-1 → 10.
- INC-1135 names four spec files, `shell` among them. `shell.spec.ts` holds no `@global-state` test, so the set is three files: admin-categories-images, admin-translations-console and admin-translations-governance.

INC — Global state in lane tests: MON-16 and MON-17 (`e2e/admin-monetisation.spec.ts` :1437, :1489) seed a level at `sort: 0`; `level_ranks_rebuild()` renumbers every level and moves every live ad's `tier_rank`; ATR-1 (`e2e/admin-listings.spec.ts` :2249) read 3 for premium when both ran on one backend at two workers (run 43457682073, lane 10). Class: a scratch row that changes a value every test reads, untagged as global state. Open; it blocks two workers (DEC-376).

INC — The pseudo generator pages by offset while it writes into the list it reads (`src/features/admin/translations/use-translations.ts` :333 → :365, `listTranslations({ offset })`), and its catch at :356 counts a refused row and goes on; TR-30 saw the summary and no `zxa` row for its probe key (run 43457682073). Class: positional paging over a list the loop changes (the `readAllPages` law); a degraded result shown as a summary. Open; it keeps INC-1135 open.

INC — CF-REDACT-1 fails about one run in 64: `scripts/ci/redaction-rules.json` :21's JWT pattern ends in `\b`, so a token whose last base64url character is `-` keeps that `-` after the mask; `scripts/ci/redact.test.ts` :80 → :82's random probe meets it (run 43457682073, Component tests). Class: a word boundary after a character class that holds a non-word character. Open.

INC — A migration's proof depends on the clock: `supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql` :1438 → :1446 expects the second save inside one rate window to be refused; at `16:00:00.002` the window rolled over between the saves and the webkit lane's backend never started (run 43457682073). Class: a proof that reads a time window without holding it. Open.
