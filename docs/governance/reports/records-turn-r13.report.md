# Records turn R13 — report

Base: 68347c94c · Final commit: e2ebafefa · Brief: docs/governance/briefs/records-turn-r13.md (sha256 739fd9a4fb86ba6b96502cdd613efb4366814f8e0e2defbf889dd4c3045f50c1)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on e2ebafe

Model: Claude Sonnet 5.5 (records turn). Pull request: https://github.com/tesfayekb/ethio-marketplace/pull/32

## 1. Done / not done, by part and step

- Step 1 — `git fetch origin dev main ci-evidence`, `git switch -c cursor/records-r13 origin/dev`; `origin/dev` was `68347c94c`, the brief's base. Dev had not moved (and has not since: `git rev-parse origin/dev` → `68347c94c3f4afb4e49ef84f3c1570ffd40a6d6f` at the end of the turn).
- Step 2 — the brief saved as `docs/governance/briefs/records-turn-r13.md` by a scripted copy (the text between BEGIN BRIEF and END BRIEF written to a scratch file, then placed inside a four-backtick fence under a heading line). The fenced block read back out of the saved file (`sed '1,3d;$d' | shasum -a 256`) is `739fd9a4fb86ba6b96502cdd613efb4366814f8e0e2defbf889dd4c3045f50c1`, equal to the value the brief states.
- Step 3 — `shasum -a 256 -c data-shas.txt` in `/Users/tesfayemackbookpro/Downloads/r13-data`: every one of its ten lines OK (the nine record files and `r13_apply.py`). `expected.txt` equals the EXPECTED block of the brief, line for line, once its two-space separators are read as one.
- Step 4 — `python3 <data>/r13_apply.py <data> .` run once; it printed the eight sha256 lines below; each equals EXPECTED, and each was recomputed from the file on disk with `shasum -a 256`. The script was read first and not changed.

```
21f8fdd586d4d5a5dd695915ecaaab842c04c59bdf5f4692d144bd5fc146d6f6 docs/tracking/incidental-findings.md
dda91af30fbd0b562dc623962331c2c974461a42e2c27eefaa94d01df19dacc3 docs/spec/spec-ledger.md
578836e1b0141188b48fc8c3100519c6ff1944fbac4a29377bcd6a6b16c46652 docs/governance/instructions-amendments.md
7ef0b460cff068f7f352bc0090a2eece0c7e83edb04f720496a5a1261aa7d6b9 docs/governance/system-state.md
5b79343b19cd1413bbd27be165d0a0e2fba5ac9e963ed77d778fa1b86da209a6 docs/governance/handoffs/2026-11-09-p2c-close-handover.md
32a5802abc5ba8af6aabb991881f7617943d3c692b949c39e8eb9e2fc57ab21c docs/governance/mechanisms.md
0dc489cc9f4a94add14e5fb22fcdf86d485b4ee6074d9d24216f125214839d0f roadmap.md
62a98c4e0b81dbff6b164e7d24c7be2c207d20f3dd46285be20aeecf9d82ad3c docs/_changelog.md
```

- Step 5 — nothing in the record files was edited by hand. Defects I noticed are under FINDINGS (section 10).
- Step 6 — `bun run checks`, `bun run typecheck` and prettier are in section 5. `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md` passed ("All matched files use Prettier code style!").
- Step 7 — one commit, `e2ebafefa` "records turn R13: block S88, INC-1068 → INC-1093, the handoff", with a body naming the parts and the `Co-authored-by: Cursor <cursoragent@cursor.com>` trailer; pushed to `cursor/records-r13`; pull request #32 opened into dev, titled "Records turn R13". Not merged.
- Step 8 — this report, committed on its own. Following the brief, it rides with the records commit's run and gets no run of its own.

## 2. Files changed

`git diff --name-only 68347c94c` on the records commit lists nine paths (the eight and this brief); with this report the list is ten, as expected:

```
docs/_changelog.md
docs/governance/briefs/records-turn-r13.md
docs/governance/handoffs/2026-11-09-p2c-close-handover.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/governance/reports/records-turn-r13.report.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
```

`git ls-files` confirms that both new files on the records commit, `docs/governance/briefs/records-turn-r13.md` and `docs/governance/handoffs/2026-11-09-p2c-close-handover.md`, are tracked on the branch. `git diff --shortstat 68347c94c` on the records commit: 9 files changed, 380 insertions(+), 11 deletions(-). The eleven deleted lines are lines the script rewrites: nine in `roadmap.md` (line 3 and its ticks), one in `docs/governance/mechanisms.md` (row 73's live half) and one in `docs/tracking/incidental-findings.md` (the closing "Numbering: next free" line, now `INC-1094`). No file is deleted.

## 3. Behaviour contract — answer tables before → after

None (records only): no route, door, screen or function was touched, and the diff is ten Markdown files.

## 4. Censuses

The brief asked for none. These are checks I ran on the result, without editing anything:

- `^## INC-<n> ` in `docs/tracking/incidental-findings.md`: INC-1068 → INC-1093 are each present exactly once; the file ends `Numbering: next free INC-1094.`
- The `## S88 ` heading in `docs/spec/spec-ledger.md` appears once; DEC-347 → DEC-360 and D319 → D321 are each present.
- `^- S<n>` in `docs/governance/instructions-amendments.md`: S541 → S566 are each present exactly once. S547's line (`:804`) records the number as passed over, by the record's own text.
- Register rows 119 → 131 in `docs/governance/mechanisms.md` (`:142` → `:154`) each appear once, in order, with no row number twice.
- Line 3 of `roadmap.md` starts `The brief in force: docs/governance/briefs/records-turn-r13.md`.
- I tested the 25 repository paths the added text cites with `[ -e ]`; one is missing (see FINDINGS). All 19 commit shas it cites resolve with `git cat-file -e`.

## 5. Tests

No test was added or changed.

- `bun run typecheck`: `tsc --noEmit`, exit 0.
- `bun run checks`, run on the final records tree before the commit. Fast line: `checks (fast): 17 PASS · 4 FAIL · 279s`. Last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 340s`, followed by `error: script "checks" exited with code 1`. The four FAILs come from this computer, and none is caused by this turn's files:
  - `laws-first › scripts/ tests first` and `component-tests › Component tests` both fail on the same single test, `scripts/ci/nightly-hour.test.ts` NH-6, because this Mac ignores `TZDIR`. Every other test passed: the laws `1 failed | 503 passed (504)`, the component tests `1 failed | 2861 passed (2862)`.
  - `build-and-check › Workflow lint (actionlint, pinned)`: the pinned `actionlint_1.7.7_linux_amd64` passed its checksum but cannot run on this Mac, so the self-test reports "the bad fixture failed for another reason".
  - `secrets-scan › Secrets scan (gitleaks, pinned)`: the pinned `gitleaks_8.24.3_linux_x64` is a Linux x86-64 binary, and it printed "0 commits in 68347c94c..HEAD" because the records were not yet committed.
  - The 30 NOT RUN steps each carry the script's own reason:
    - Skipped behind an earlier FAIL: the `laws-first` changed-folder unit tests and changed-file Semgrep, and the `build-and-check` steps after actionlint (format check, lint, selector self-test, root route names, build, bundle report). I ran three of those by hand: `bun run format:check` is clean, and `bun run lint` shows 0 errors and 46 warnings, none in a file this turn touched.
    - Install-dependency steps: they use the dependencies already installed.
    - `dependency-audit`: the advisory service cannot be reached from the sandbox.
    - `e2e-preflight`: it needs staging credentials.
    - `e2e` result merging: it needs the browser lanes' artifacts.
    - `promote`: only CI promotes.
    - The Semgrep SARIF upload: it runs on GitHub only.
  - In CI, all four of those jobs are green on the pull request's run for `e2ebafefa` (section 11). The bundle budget step passed locally.
- Browser tests were not run: records only, and no spec or screen was touched.

## 6. K2 — siblings that bypass the mechanism

None (records only). The only checks run were the census checks in section 4; this turn touches no mechanism concern.

## 7. Allowlists and guards

None changed. No allowlist file is in the diff (section 2), and no guard was added or edited; the existing guards ran in CI (section 11).

## 8. Strings

None: no `t(` key and no `src/i18n` file is in the diff.

## 9. Migrations

None: no file under `supabase/migrations/` is in the diff.

## 10. Departures

None from the brief's steps, with these notes:

- The records went in one commit, as the brief's step 7 names one commit and its first line. Rule 00 step 2's separate "task saved" commit was not made, because the brief makes the brief file, the eight paths and the commit one.
- The report uses rule 60's headings in R12's form; the brief's step 8 items are in sections 1, 2, 5, 10 and 11.
- `git push -u` printed `error: could not write config file .git/config: Operation not permitted`, because the sandbox could not write the upstream setting. The branch itself reached origin (the pull request's head is `e2ebafefa3113f28543bae1154fe6b4c82f617af`), and the local branch still tracks `origin/dev`, so every later push names `origin cursor/records-r13` explicitly. This has no effect on the records.

FINDINGS (anything major noticed; the record files are unchanged):

- A path that does not exist: the records name `e2e/helpers/alias.ts` at `docs/governance/mechanisms.md:154` (register row 131) and `docs/tracking/incidental-findings.md:6058` (INC-1085's later word). The helpers they name (`scratchAlias`, `expectAliasAccepted`, `waitAliasAccepted`) live in `e2e/helpers/alias-check.ts` (`:52`, `:100`, `:133`); no `e2e/helpers/alias.ts` exists at `68347c94c` or on this branch. The supervisor can correct it at a later records turn.
- `docs/tracking/incidental-findings.md`: the heading `## INC-089 ` appears twice. Both entries were already there at the base (`git show 68347c94c:docs/tracking/incidental-findings.md | grep -c '^## INC-089 '` → 2), so this is not this turn's text; it is reported, not edited. R12 reported it too.
- `S547` is recorded as a number passed over (`docs/governance/instructions-amendments.md:804`). This is the record's own text and needs no correction; it is listed only so the gap is not read as a lost slip.
- `bun run checks` cannot pass on this computer (a Mac, while the rules assume Ubuntu): two pinned Linux binaries cannot run, and NH-6 relies on Linux time-zone handling. CI is the judge for those, and they were green there.

## 11. CI

The base's CI (`git show origin/ci-evidence:docs/tracking/ci-status.md`, fetched at the start of the task):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `68347c94c3f4afb4e49ef84f3c1570ffd40a6d6f` (short `68347c9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T11:22:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42605215902
```

Two-step check: the conclusion is SUCCESS, and the reported commit `68347c9` is `origin/dev` at the start (`68347c94c`). TOTAL was 2806 passed, 0 failed, 0 flaky. There was no red from an earlier turn to fix.

This pull request's run on `e2ebafefa` (`gh pr checks 32`, run `42617059628`) had 41 checks pass, 1 skipping ("Promote to main (fast-forward on green)", which runs only on `dev`), and 0 fail. The ci-evidence branch agrees:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e2ebafefa3113f28543bae1154fe6b4c82f617af` (short `e2ebafe`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T12:47:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42617059628
```

Its job table lists, among others, Build, typecheck, lint; Component tests; Gitleaks secrets scan; Hardcoded string scan; Import gate guard; Listing-write seam guard; Browse-path guard; Marketplace weight guard; First-paint bundle budget; i18n used-on map; Migration linter; Semgrep; Dependency vulnerability audit; E2E preflight; the backend images and the E2E lanes, all success. There was no red, so nothing was re-run or fixed. As the brief says, this report's commit rides with that run and is not re-judged.

## 12. Limits

- `bun run checks` ends with 4 FAIL and 30 NOT RUN on this computer (named in section 5); the pull request's CI is the proof for them, and it is green on `e2ebafefa`.
- No browser tests and no staging credentials: records only.
- I did not check whether the records' claims are correct (the numbers, shas and dates inside them): the brief makes the supervisor their author, and the script's output matching EXPECTED proves an exact copy. I did read the script, ran the structural checks in section 4, and tested the cited paths and shas.
