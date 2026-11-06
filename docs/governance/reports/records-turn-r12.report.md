# Records turn R12 — report

Base: 7c5c29546 · Final commit: 48dbfa5e6 · Brief: docs/governance/briefs/records-turn-r12.md (sha256 ea762d940fb7e38af364ce89ed0f37743ccdf9964858c1f05b3f9607e6777b76)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on 48dbfa5

Model: Claude Sonnet 5.5 (records turn). Pull request: https://github.com/tesfayekb/ethio-marketplace/pull/27

## 1. Done / not done, by part and step

- Step 1 — `git fetch origin`, `git switch -c cursor/records-r12 origin/dev`; `git rev-parse --short=9 HEAD` printed `7c5c29546`. Dev had not moved.
- Step 2 — the brief saved byte for byte as `docs/governance/briefs/records-turn-r12.md` by a scripted copy (a temporary file written from the message, then `cat` into the four-backtick fence under R11's heading line). The sha256 of the text between BEGIN BRIEF and END BRIEF, with its final newline, is `ea762d940fb7e38af364ce89ed0f37743ccdf9964858c1f05b3f9607e6777b76`, equal to the value printed after END BRIEF. The fenced block read back out of the saved file (`sed '1,3d;$d'`) has the same sha256.
- Step 3 — `sha256sum -c data-shas.txt` in `/Users/tesfayemackbookpro/Downloads/r12-data`: every one of the eleven lines OK (the ten record files, `r12_apply.py` and `expected.txt`). `expected.txt` also equals the EXPECTED block of the brief, line for line.
- Step 4 — `python3 <data>/r12_apply.py <data> .` run once; it printed the nine sha256 lines below; each equals EXPECTED (checked by `sort | diff`: ALL-NINE-EQUAL). The script was read first and not changed.

```
83a1f2bed10f287b2313cc65bccfd6a163de2d36ebee8812dd5f25a0c7a51fb4 docs/tracking/incidental-findings.md
8c3809702fe0f57df8e11860d7a4118bef1861f96184d8fc93729ae14177dd8d docs/spec/spec-ledger.md
94681ddae41342276ad6fd79253c7c6ff440290a9711dcb69a2ecd6874a37227 docs/governance/instructions-amendments.md
8383d43ebf7e9b68f86bc4d0ddc1fe7aa0d5416bdd6b1f9f90b22962ff676871 docs/governance/system-state.md
3383c0c7c5c9726a8f79d68d67811943a2f2e3ce4aaed61f26f4993a250d2330 docs/governance/handoffs/2026-11-05-p2a-close-handover.md
6b9b6885acca7211277a5c5fc05b31a03e90a8f480c64b841e9bd94c5cef54bf docs/governance/mechanisms.md
04512e5c2bac640ff31fdaa95aba7edffa1df483729069269b0aeabc08d32c85 docs/governance/briefs/db-proof-ruling-5.md
a9054508fb0064bf9888c19d6c5e124b1ce1fe1dad02b9ce9a5b182b06582a4e roadmap.md
fc4dc3b16b6c2260187dfc2d8d889c6f91783282329a54df3b1117d428700921 docs/_changelog.md
```

- Step 5 — nothing in the record files was edited by hand. Defects noticed are under FINDINGS (section 10).
- Step 6 — `bun run checks`, `bun run typecheck`, prettier: section 5. `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md` passed ("All matched files use Prettier code style!"). `bun run format:check` (the whole CI format step) passed.
- Step 7 — one commit `48dbfa5e6` "records turn R12: block S87, INC-1046 → INC-1067, the handoff", with the body naming the parts and the `Co-authored-by: Cursor <cursoragent@cursor.com>` trailer; pushed to `cursor/records-r12`; pull request #27 opened into dev, titled "Records turn R12". Not merged.
- Step 8 — this report.

## 2. Files changed

`git diff --name-only 7c5c29546` on the records commit (ten paths: the nine and this brief); with this report the list is eleven, as expected:

```
docs/_changelog.md
docs/governance/briefs/db-proof-ruling-5.md
docs/governance/briefs/records-turn-r12.md
docs/governance/handoffs/2026-11-05-p2a-close-handover.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/governance/reports/records-turn-r12.report.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
```

`git ls-files` proof of the new files: `docs/governance/briefs/db-proof-ruling-5.md`, `docs/governance/briefs/records-turn-r12.md`, `docs/governance/handoffs/2026-11-05-p2a-close-handover.md` are tracked on the branch. `git diff --shortstat 7c5c29546..48dbfa5e6`: 10 files changed, 287 insertions(+), 8 deletions(-). The eight deleted lines are `roadmap.md` lines the script rewrites (line 3 and the seven tick/extend lines); no file is deleted.

## 3. Behaviour contract — answer tables before → after

none — records only: no route, door, screen or function was touched (the diff is ten Markdown files).

## 4. Censuses

none asked by the brief. Checks I ran on the result (not edits):

- `grep -o '^## INC-[0-9]* '` on `docs/tracking/incidental-findings.md`: INC-1046 → INC-1067 each present once (INC-1061 and INC-1062 were already there); the file ends `Numbering: next free INC-1068.`
- `## S87 ` heading in `docs/spec/spec-ledger.md`: 1; DEC-328 → DEC-346 each defined once; D314 → D318 each present.
- `^- S5[1-4][0-9] (` in `docs/governance/instructions-amendments.md`: 31 lines (S510 → S540), no number twice.
- `| 117 |` in `docs/governance/mechanisms.md`: 1, after row 116 (`:140`).
- Paths named in the added text, tested with `[ -e ]`: see FINDINGS.

## 5. Tests

No test added or changed.

- `bun run typecheck`: `tsc --noEmit`, exit 0.
- `bun run checks` (run on the final tree before the commit): `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 325s`, last line `error: script "checks" exited with code 1`. The four FAILs are computer-class, none caused by this turn's files:
  - `build-and-check › Workflow lint (actionlint, pinned)` — the pinned `actionlint_1.7.7_linux_amd64` binary does not run on this Mac (`exec format error`), so the self-test reports "failed for another reason".
  - `secrets-scan › Secrets scan (gitleaks, pinned)` — the pinned gitleaks is a Linux x86-64 ELF; it printed "0 commits in 7c5c29546..HEAD" because the records were not yet committed.
  - `laws-first › scripts/ tests first` and `component-tests › Component tests` — both fail on the same single test, `scripts/ci/nightly-hour.test.ts` NH-6 ("expected +0 to be 2": this Mac ignores `TZDIR`); every other test passed (laws: 484 of 485; component tests: 2756 of 2757).
  - NOT RUN (30), each with the script's own reason: `laws-first` changed-folders unit tests and Semgrep-changed (an earlier step failed); `build-and-check` Install dependencies, Typecheck, Format check, Lint, e2e selector self-test, Root route names, Build, Bundle report (the first is the sandbox's installed dependencies, the rest followed the actionlint FAIL — I ran typecheck, `format:check` and `lint` myself: typecheck exit 0, format check clean, lint 0 errors and 46 warnings, none in a file this turn touched); `component-tests`/`bundle-budget` Install dependencies; `dependency-audit` (the advisory service is unreachable from the sandbox); `e2e-preflight` (needs the staging credentials, which this environment never holds); `e2e` result-merging steps (need the browser lanes' artifacts); `promote` (only CI promotes); `semgrep` SARIF upload (GitHub only).
  - Resolved in CI: on the pull request's run for `48dbfa5e6` every one of those four jobs is green (section 11).
- Browser tests: not run — records only, no spec or screen touched.

## 6. K2 — siblings that bypass the mechanism

none — records only. Greps run: the census checks in section 4 (numbers, headings, register row, slips); no mechanism concern is touched.

## 7. Allowlists and guards

none changed. No allowlist file is in the diff (`git diff --name-only` above); no guard added or edited; the existing guards ran in CI (section 11).

## 8. Strings

none — no `t(` key and no `src/i18n` file is in the diff.

## 9. Migrations

none — no file under `supabase/migrations/` in the diff.

## 10. Departures

none from the brief's steps, with these notes:

- One commit for the records (the brief's step 7 names one commit and its first line); rule 00 step 2's separate "task saved" commit was not made, because the brief says the brief file, the nine paths and the commit are one.
- The report uses rule 60's twelve headings; the brief's step 8 items are in sections 1, 2, 5, 10 and 11.
- `git push -u` printed `error: could not write config file .git/config: Operation not permitted` (the sandbox could not write the upstream setting); the branch itself reached origin (`git ls-remote` shows `48dbfa5e6`), and the local branch still tracks `origin/dev`. No effect on the records.

FINDINGS (anything major noticed; the record files are unchanged):

- `docs/tracking/incidental-findings.md`: the heading `## INC-089 —` appears twice (two entries, already two at base `7c5c29546`: `git show 7c5c29546:docs/tracking/incidental-findings.md | grep -c '^## INC-089 '` → 2). Not this turn's text; reported, not edited.
- Paths named in the new records that do not exist at `7c5c29546` or on this branch: `docs/governance/briefs/f1-doors.md`, `docs/governance/reports/f1-doors.stop-1.md` (on `cursor/f1-doors-plan`, pull request #20 per the roadmap line), `docs/governance/reports/f2-forms.stop-1.md` (on `cursor/f2-forms-plan`, pull request #21); `scripts/doors/manifest.txt`, `src/lib/door-codes.ts`, `src/lib/refusal.ts` (named as things the F1 and F2 turns will build). `apps/cli/src/command-internal/db-bootstrap/docker-create-args.ts` is a path in the Supabase CLI's repository, quoted at `docs/tracking/incidental-findings.md:5903`. None is a defect if those plan branches are merged or the turns land; listed so the supervisor can confirm.
- `bun run checks` cannot pass on this computer (a Mac, while the rules assume Ubuntu): two pinned Linux binaries cannot execute and NH-6 relies on Linux time-zone handling. CI is the judge for those; they were green there.

## 11. CI

The base's CI (`git show origin/ci-evidence:docs/tracking/ci-status.md`, fetched at the start of the task):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `7c5c295463081613b2e053855aa39d322967532d` (short `7c5c295`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-06T00:22:28Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42132807947
```

Two-step check: the conclusion is SUCCESS and the reported commit `7c5c295` is `origin/dev` at the start (`git rev-parse --short=9 origin/dev` → `7c5c29546`). No red of an earlier turn to fix.

This pull request's checks on `48dbfa5e6` (`gh pr checks 27`, run `42150618743`): 41 pass, 1 skipping ("Promote to main (fast-forward on green)", which runs only on `dev`), 0 fail. Included: Build, typecheck, lint; Component tests; Gitleaks secrets scan; Hardcoded string scan; Import gate guard; Listing-write seam guard; Browse-path guard; Marketplace weight guard; First-paint bundle budget; i18n used-on map; Migration linter; Semgrep; Dependency vulnerability audit; E2E preflight; E2E (Playwright, ethio-staging); all sixteen numbered lanes plus smoke, email and repeat; CodeQL. No red, so no re-run and nothing fixed. This report's own commit gets its own run; the "every check green" comment names the last commit.

## 12. Limits

- `bun run checks` ends with 4 FAIL and 30 NOT RUN on this computer (named in section 5); the pull request's CI is the proof for them, and it is green on `48dbfa5e6`.
- No browser tests, no staging credentials: records only.
- I did not read the contents of the records for correctness of their claims (numbers, shas, dates inside them): the brief makes the supervisor their author and the script's output equal to EXPECTED is the proof of an exact copy. I did read the script and ran the structural checks in section 4.
