# Cursor rules turn 3 — report

Base: 8ae1c5fd3 · Final commit: 0586dd9dd1b7e0ee9e7f6629ec029b3ca2886dd6 (the last code commit; `rules-3: the six rule files, instructions v1.17, two record corrections`) · Brief: docs/governance/briefs/rules-3.md (sha256 07acfb2797ae6db3eb134e39d9df2adb7f51f90afacebda53a1899e4c8a1f35f)
Review: READY · 0 BLOCKER · 1 MAJOR · 2 MINOR · on 0586dd9

## 1. Done / not done, by part and step

- Step 1 — done. `git fetch origin dev main ci-evidence`, `git switch -c cursor/rules-3 origin/dev`; `git rev-parse --short=9 HEAD` printed `8ae1c5fd3`; `git status --short` was empty. `origin/dev` had not moved.
- Step 2 (STEP 0) — done. The brief text was written to `/tmp/ethio-scratch/rules-3/brief.txt`; its sha256 was `07acfb2797ae6db3eb134e39d9df2adb7f51f90afacebda53a1899e4c8a1f35f`, equal to the stated value; the fenced file `docs/governance/briefs/rules-3.md` (four backticks, as `records-turn-r13.md`) was then built from that file by `cat`, and the sha256 of its fenced body re-read equal. Commit `713c5900f rules-3: task saved`. See Limits for how the text reached the scratch file.
- Step 3 — done. `sha256sum -c ../data-shas.txt` run inside the data folder's `data/` subfolder: nine lines, nine OK.
- Step 4 — done. `python3 rules3_apply.py <data> .` run once; its thirteen lines were compared with `expected.txt` by `diff`: identical (EXPECTED-MATCH).
- Step 5 — done; findings in section 13.
- Step 6 — done; the hunk-by-hunk reading is section 4.
- Step 7 — done; results in section 5 and Limits.
- Step 8 — done. Commit `0586dd9dd`, `git push -u origin cursor/rules-3`, pull request https://github.com/tesfayekb/ethio-marketplace/pull/33, `gh pr checks 33 --watch --interval 60` to the end, then `gh pr comment 33 --body "Every check green on 0586dd9dd1b7e0ee9e7f6629ec029b3ca2886dd6"`.
- Step 9 — this report, committed on its own (`rules-3: report`) and pushed once (it is the only way it reaches the pull request; it is not re-judged and nothing is pushed after it).

## 2. Files changed

`git diff --name-only 8ae1c5fd3` (before this report was added; the report makes fifteen):

```
.cursor/rules/00-protocol.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/40-ci-evidence.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
docs/_changelog.md
docs/governance/briefs/rules-3.md
docs/governance/claude-supervisor-instructions-v1.17.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/governance/system-state.md
docs/tracking/incidental-findings.md
roadmap.md
```

Plus `docs/governance/reports/rules-3.report.md` (this file). New files, `git ls-files` proof:

```
docs/governance/briefs/rules-3.md
docs/governance/claude-supervisor-instructions-v1.17.md
```

The thirteen script paths' sha256 (script output, equal to EXPECTED):

```
1f4148f55dcd64e69c70f7fd04050ad21eb1bfe885d71231055e08364f341f2c .cursor/rules/00-protocol.mdc
9afe23e0fb25f1c0d3ad33695c2b4d255310a99f6719ad0c175a7b104498efe0 .cursor/rules/20-tests.mdc
6de24961ed62173c7e90c3e2a240e4b9203b84ac63bd4d6574814a6c976b59e0 .cursor/rules/30-migrations.mdc
16f9e5d6e2641f685f92658838dfa8679f5b2c5fa54e95cc118b2c02b83fa033 .cursor/rules/40-ci-evidence.mdc
f3bd34f3bfd5f89f0b34e4b488fafeede569e5f004fdb658919daa594ec4f57c .cursor/rules/60-report.mdc
f5ecc5a9fd62f23fa673110e7ae7269fce350f2a12e026d7e35c523a595dfd28 .cursor/rules/80-review.mdc
7b557f765affbaaef4f0754d2fa3b6d447891073e2536b8aac89ca24eed01c26 docs/governance/claude-supervisor-instructions-v1.17.md
6e1072e2c8cc2dd6d5707d088cc6a55f5fb4996e5cc04f690acce96ff208e6e3 docs/governance/instructions-amendments.md
8650ebc471be7c0a2db8ea3b4a11eb04b14b740889a566890bb5477eedb1cb32 docs/governance/system-state.md
40f7ba28fb66f84b193d8cd1f0bb074b5dc45613fef367823a90af3d9a54fa36 docs/tracking/incidental-findings.md
023aeb4545d61c7dacad7ffb41e5693488327c2e538b43093d36bd43a59a866a docs/governance/mechanisms.md
ff81040d35d0a1e0fc0ee0bea5b08d6488ed6e051f57cf0cb3a190b1a5b4e59e roadmap.md
1de8a0f0d169b48bf0bb7215152d4815b8ee8b68f3307f1265ab08808f0cea9f docs/_changelog.md
```

## 3. Behaviour contract

none — no route, door, screen or function was touched; only rule text and records. Proof: `git diff --name-only 8ae1c5fd3` (section 2) names no path under `src/`, `supabase/`, `e2e/` or `scripts/`.

## 4. Censuses

The brief asks for no grep census. The step 6 reading: `git diff 8ae1c5fd3 -- .cursor/rules/` read whole; every hunk against WHAT THIS TURN IS.

- `00-protocol.mdc`, hunk 1 (step 2, around line 88): line 3 of `roadmap.md` names the brief in force — a FEATURE lane writes it at step 2, a records turn by its script, a rules or docs-only lane beside an open feature lane leaves it and sets `TURN_BASE` / `CHECKS_BASE` to its Base sha. Listed change 1. Re-wrapped lines only otherwise. In list.
- `00-protocol.mdc`, hunk 2 (§Git, around line 192): `merge --ff-only origin/<your cursor/… branch>` added as the one allowed form (fast-forwards or refuses, never creates a commit); `merge` becomes "any other `merge`" in the Never list beside rebase, pull and cherry-pick. Listed change 2. In list.
- `00-protocol.mdc`, hunk 2 (continued): "`main` moves only by CI's promote job…" re-wrapped, and "Never rebase. A deleted file is declared…" split onto its own line — the two glued lines the brief says are wrapped. In list; no word changed in either.
- `20-tests.mdc`, one hunk (the `e2e:local` bullet, line 104): the Playwright-cannot-start-in-Cursor's-sandbox sentence, the run from a terminal outside the sandbox, said in the report, a run that could not start is a Limit. In list.
- `30-migrations.mdc`, hunk 1 (MARK, line 55): the two floor lines read together (the brief's floor; THE MARK'S VALUE's commit-hour value; the greater of the two). In list.
- `30-migrations.mdc`, hunk 2 (PRE-STOP SCAN, line 91): point 6 ends with `;` instead of `.`, point 7 THE CARRIER LAW added, the report line reads `pre-stop scan: 7 of 7, <file fragments>`. In list.
- `40-ci-evidence.mdc`, one hunk (line 81): "your last CODE commit"; the report commit rides without a run of its own; never push a second time for a report, docs or rules change. In list.
- `60-report.mdc`, one hunk (line 8): the opening paragraph gains the CODE-commit CI rule and "no re-push (rule 40)". In list.
- `80-review.mdc`, one hunk (line 5): the review reads YOUR task's brief (line 3 when your lane owns it, else `docs/governance/briefs/<stem>.md`). In list.

Result: six files, ten hunks, every one a listed change; no hunk outside the list.

The seven record paths were read in `git diff --cached` (the five small ones whole; `claude-supervisor-instructions-v1.17.md` is a new 143,754-byte file whose sha256 equals the brief's value, scanned by pattern for secret-shaped text — one 64-hex match, which is the file's own sha256 in the amendment note).

## 5. Tests

No test was added, changed or re-pointed; nothing here changes code.

- `bunx vitest run scripts --maxWorkers=2`, last lines: `Test Files  1 failed | 98 passed (99)` / `Tests  1 failed | 503 passed (504)` — the one failure is `scripts/ci/nightly-hour.test.ts` NH-6 (see Limits).
- `bun run typecheck`: `tsc --noEmit`, no error output.
- `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md docs/governance/system-state.md`: `All matched files use Prettier code style!`
- `bun run checks`, fast line: `checks (fast): 17 PASS · 4 FAIL · 276s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
- `bun run checks`, last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 335s`
- The four FAILs (none names a path this lane changed): `laws-first › scripts/ tests first` and `component-tests › Component tests` (the same NH-6 test in both); `build-and-check › Workflow lint (actionlint, pinned)`; `secrets-scan › Secrets scan (gitleaks, pinned)`. All four are green in CI on the same commit (section 11).
- NOT RUN (named in the runner's own lines): `dependency-audit` (advisory service not reachable from the sandbox); `e2e-preflight` (needs the staging credentials, never held); the six `e2e` merge steps (GitHub artifacts, browser lanes); the four `promote` steps (CI alone promotes); `semgrep` SARIF upload and its warning step (GitHub only); `bundle-budget` and `build-and-check` install steps (dependencies already installed; a package change is its own turn); and, as a consequence of the actionlint step failing first, `build-and-check` Typecheck, Format check, Lint, e2e selector self-test, Root route names, Build and Bundle report, and `laws-first` changed-folders' unit tests and Semgrep-on-changed-files. The typecheck was run by hand (above); the format check ran by hand for the four named files; lint and the build's first-paint budget did not run as such here, and CI's `Build, typecheck, lint` and `First-paint bundle budget` are green.
- The browser check: not applicable — the lane changes no spec, screen or shared helper.

## 6. K2 — siblings that bypass the mechanism

none — rules and records only. Greps run: `rg -n "merge" .cursor/rules/50-security.mdc` (finding in section 13, not a mechanism bypass); `ls e2e/helpers/alias*.ts` (only `alias-check.ts` exists, which the INC-1085 / row 131 correction states).

## 7. Allowlists and guards

none — no allowlist file and no guard was touched. Proof: `git diff --name-only 8ae1c5fd3` names none under `scripts/`.

## 8. Strings

none — FLAG `no-new-string`; no `src/i18n/**` file changed (section 2).

## 9. Migrations

none — FLAG `no-migration`; no path under `supabase/migrations/` changed (section 2).

## 10. Departures

none from the brief's changes: the script printed EXPECTED, every rule hunk was a listed change, and no STOP arose. Three differences of procedure, none changing a file's content:

- The data folder named in the message is laid out as `rules3-data/` holding `data-shas.txt`, `expected.txt`, `rules3_apply.py` and a `data/` subfolder with the nine data files; the brief's "in the data folder run `sha256sum -c data-shas.txt`" was run as `cd data && sha256sum -c ../data-shas.txt`, and the script was given `…/rules3-data/data` as its `<data folder>`. The first line of the message still held the placeholder text; the path was taken from the line after the brief's sha256 (`/Users/tesfayemackbookpro/Downloads/rules3-data`).
- The brief's heading line in `docs/governance/briefs/rules-3.md` (`# Cursor rules turn 3 — brief (sha256 …)`) copies the form of `records-turn-r13.md`; the brief's own text is inside the four-backtick block.
- The commit's attribution trailer is `Co-authored-by: Cursor <cursoragent@cursor.com>`, the form the repository's recent commits carry (no rule file spells one out).

## 11. CI

The base's `ci-status.md` (read from `origin/ci-evidence` after `git fetch origin ci-evidence` at the start of the turn; the two-step check: conclusion SUCCESS, and the reported commit `8ae1c5fd3cbcc85bab88a5de0fde9fc902cbf4f8` equals the base):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `8ae1c5fd3cbcc85bab88a5de0fde9fc902cbf4f8` (short `8ae1c5f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T13:28:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42620762247
```

`guards-last-failure.md` and `e2e-last-failure.md` for the base: no failed build/guard jobs; "last E2E run 42620762247 passed"; `local-backend-proof.md` names the same commit. No red of an earlier turn was open.

The pull request's check list on the last CODE commit `0586dd9dd1b7e0ee9e7f6629ec029b3ca2886dd6` (`gh pr checks 33`; run 42640919996, `completed` / `success`, `headSha` equal to the commit): 41 pass, 1 skipping (`Promote to main`, which runs only on `dev`, never on a pull request), 0 fail:

```
Analyze (actions) | pass | 39s
Analyze (javascript-typescript) | pass | 1m19s
Analyze (python) | pass | 49s
Browse-path guard (no RBAC seam on the marketplace path, with self-test) | pass | 8s
Build, typecheck, lint | pass | 1m57s
CodeQL | pass | 7s
Component tests | pass | 5m35s
Dependency vulnerability audit (enforcing on high/critical) | pass | 17s
E2E (Playwright, ethio-staging) | pass | 12s
E2E lanes / Backend images (DEC-309) | pass | 7s
E2E lanes / Lane 1 on temporary Supabase | pass | 17m47s
E2E lanes / Lane 10 on temporary Supabase | pass | 17m52s
E2E lanes / Lane 11 on temporary Supabase | pass | 14m40s
E2E lanes / Lane 12 on temporary Supabase | pass | 13m37s
E2E lanes / Lane 13 on temporary Supabase | pass | 13m28s
E2E lanes / Lane 14 on temporary Supabase | pass | 18m14s
E2E lanes / Lane 15 on temporary Supabase | pass | 8m22s
E2E lanes / Lane 16 on temporary Supabase | pass | 12m9s
E2E lanes / Lane 2 on temporary Supabase | pass | 19m58s
E2E lanes / Lane 3 on temporary Supabase | pass | 13m44s
E2E lanes / Lane 4 on temporary Supabase | pass | 15m10s
E2E lanes / Lane 5 on temporary Supabase | pass | 13m1s
E2E lanes / Lane 6 on temporary Supabase | pass | 14m48s
E2E lanes / Lane 7 on temporary Supabase | pass | 7m38s
E2E lanes / Lane 8 on temporary Supabase | pass | 11m8s
E2E lanes / Lane 9 on temporary Supabase | pass | 18m27s
E2E lanes / Lane email on temporary Supabase | pass | 3m48s
E2E lanes / Lane repeat on temporary Supabase | pass | 19s
E2E lanes / Lane smoke on temporary Supabase | pass | 15m33s
E2E lanes / Summarize temporary backend lanes | pass | 16s
E2E preflight (migration parity, staging) | pass | 15s
First-paint bundle budget (gzipped ceiling) | pass | 34s
Gitleaks secrets scan | pass | 9s
Hardcoded string scan (enforcing) | pass | 6s
Import gate guard (with self-test) | pass | 8s
Listing-write seam guard (with self-test) | pass | 9s
Marketplace weight guard (no heavy deps on the first-paint path) | pass | 8s
Migration linter (with self-test) | pass | 28s
Semgrep (enforcing on ERROR) | pass | 2m14s
Semgrep OSS | pass | 4s
i18n used-on map is fresh (U4i ②) | pass | 10s
Promote to main (fast-forward on green) | skipping | 0
```

No red in this pull request's runs; no re-run. This report commit is not re-judged (rule 40): it rides without a run of its own read here.

## 12. Limits

- The brief's text reached the scratch file by my writing it out from the message (no attachment or file of the brief was on the disk, and a chat message cannot be read by a script); it is proven by the sha256 equality with the stated value, so a single changed byte would have shown. It is not a scripted extraction from the message.
- `bun run checks` locally: four FAILs and 30 NOT RUN as listed in section 5. The NH-6 test (`scripts/ci/nightly-hour.test.ts`, "a machine that cannot resolve New York's zone is an error"; assertion `expected +0 to be 2`) fails on this computer in both the `scripts` run and the component run; the lane changed no path it reads, and CI's `Component tests` is green on the same commit. The actionlint and gitleaks steps verify and run the pinned Linux builds (`actionlint_1.7.7_linux_amd64`, `gitleaks_8.24.3_linux_x64`) on this macOS arm64 computer; their logs give no cause beyond "the bad fixture failed for another reason" and an exit 1 with no finding text, so I name the Linux-binary mismatch as the likely cause, not a proven one; CI's `Gitleaks secrets scan` and workflow lint inside `Build, typecheck, lint` are green on the same commit.
- Rule 50's sweep of my own diff: the five small record diffs and the rule diffs were read whole; the 232-line `claude-supervisor-instructions-v1.17.md` was scanned by a secret-shape pattern, not read line by line (it is the supervisor's document, byte for byte, sha256 equal). CI's gitleaks job also passed.
- `git push -u origin` printed `could not write config file .git/config: Operation not permitted` (the sandbox forbids the upstream-tracking write); the branch itself was pushed (`git ls-remote` showed `0586dd9dd`) and the pull request opened. The local branch's upstream setting may still read `origin/dev`; the push target was named explicitly.
- No browser tests: none are owed (section 5).

## 13. Findings

- `.cursor/rules/50-security.mdc:89` (unchanged by this turn) lists `merge` among what may never run under "What you may never run — Git" (`` `reset --hard`; `merge`; `pull`; `cherry-pick`… ``), and ends "A refusal is final". The new `00-protocol.mdc` §Git (this turn's text) allows ONE merge form, `merge --ff-only origin/<your cursor/… branch>`, and keeps "any other `merge`" forbidden. As the two files stand, 50's bare `merge` forbids what 00 allows. Not touched (rule 50 is outside this lane's scope and the brief says the supervisor's text is imported unchanged); for the supervisor to rule whether 50 takes the same "any other `merge`" wording.
- `docs/governance/briefs/rules-3.md` step 8 and step 9 together: step 8 says "No report-only re-push: the report commit rides with this commit's run or is read without a run of its own", and step 9 says the report's commit is pushed ("push once"). The report needs the pull request's finished check list, which exists only after the code commit's run completes, so the report commit can only be pushed after that run; I pushed it once, after the run, and read no run for it. The two steps are consistent only on that reading.
- `.cursor/rules/80-review.mdc:10` — the new text's re-wrap leaves one line of 165 characters (`these rules, and the whole diff … Read each base version with …`) where the file's other lines break near 100 (line 2 is the front-matter description, 186). Cosmetic; the file is the supervisor's, unchanged.
- No number used twice, no wrong date or sha, and no path that does not exist were found in the files this turn lands, other than the item first above. Reads that proved it: `rg -n "^## INC-0(89|90)" docs/tracking/incidental-findings.md` (line 419 INC-089, line 478 INC-090 — one each now); `ls e2e/helpers/alias*.ts` (`alias-check.ts` only, with `scratchAlias` :52, `expectAliasAccepted` :100, `waitAliasAccepted` :133 as the correction says); `gh run view 42617059628 --json headSha,conclusion` (head `e2ebafefa3113f28543bae1154fe6b4c82f617af`, `success`, as the R13 roadmap line says); `git cat-file -t` on `a346e2a5b` and `e2ebafefa` (both `commit`). The `git cat-file -t` and `gh` reads are of my own tree and of CI, not a judgement of the instructions' content.

## 14. Records

none — this turn's records are in its data files: the changelog line, the roadmap lines, the amendment note.
