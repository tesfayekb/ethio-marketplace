# The Lovable guard reads a patchless exception file from git (DEC-398) — report

Base: 84e5f45fb · Final commit: 53877d293 · Brief: docs/governance/briefs/lovable-guard-patchless.md (sha256 d80dc8037b3e717ec3e5e578cd8f1da367b5b9973a3cf46927532eca3d68df4f)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 53877d2

## 1. Done / not done, by part and step

- STEP 0 done: `git fetch origin dev main ci-evidence`; `git switch -c cursor/lovable-guard-patchless origin/dev`; status empty; `git rev-parse --short=9 HEAD` printed 84e5f45fb. The brief was saved by scripted copy inside one fenced block; the fenced text's sha256 is d80dc8037b3e717ec3e5e578cd8f1da367b5b9973a3cf46927532eca3d68df4f, equal to the stated value (and to the source file's). Roadmap line 3 names it, the old line kept after "Previous: ". `scripts/conformance/briefs-allowlist.txt` holds comment lines only (no line keyed to any brief), so nothing was removed. `bun scripts/brief/check-go.ts docs/governance/briefs/lovable-guard-patchless.md` → `[check-go] no finding`. Commit `lovable-guard-patchless: task saved` (04c044525).
- STEP 1 done: the census (§4); no STOP.
- STEP 2 done: the fallback in the script and the step; CF-LVB-13, CF-LVB-14; the docs. Commit `lovable-guard-patchless: read a patchless exception from git (DEC-398)` (53877d293).
- STEP 3 done: typecheck, lint, the two named test files, the laws, `bun run checks`, `check-go --at 84e5f45fb` (§5); the self-review (last line above).
- STEP 4: one push; pull request https://github.com/tesfayekb/ethio-marketplace/pull/56; CI in §11.
- STEP 5: this report.
- DECIDE-AND-NAME: **git fetch** (not the contents API) for the two sides; the step's environment names are **`PR_BASE_SHA`** and **`PR_HEAD_SHA`** (`github.event.pull_request.base.sha` / `.head.sha`). The fetch is `git fetch --no-tags --depth=1 --filter=blob:none --quiet origin <base> <head>` made by the script itself, lazily, once, only when a patchless exception file is met; the checkout in `ci.yml` stays shallow (no `fetch-depth`, CF-LVB-10 still holds).

## 2. Files changed

`git diff --name-only 84e5f45fb..HEAD` (at 53877d293, before this report):

```
.github/workflows/ci.yml
docs/features/ci-guards.md
docs/governance/briefs/lovable-guard-patchless.md
roadmap.md
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
```

New file proof: `git ls-files docs/governance/briefs/lovable-guard-patchless.md` prints the path. This report is the seventh path (`docs/governance/reports/lovable-guard-patchless.report.md`, new). `ci.yml` changes in the guard step only (two environment lines and a comment).

## 3. Behaviour contract — answer tables before → after

`scripts/ci/lovable-branch-guard.sh` (stdin: the pull request's files, JSON arrays; exit 0 pass, 1 refusal, 2 not-the-API's-input):

| Input | Before (84e5f45fb) | After |
| --- | --- | --- |
| An entry with a patch, any file | judged by path rule / exception rule | the same, unchanged |
| A patchless entry under no exception | path rule | path rule; git is not read |
| A patchless exception file, `PR_BASE_SHA` / `PR_HEAD_SHA` set, git's changed lines allowed by the exception | exit 1, "the API carries no patch for it (a binary or a very large diff), so DEC-390's exception cannot be read" | exit 0 (the same `exception_refusal` reads git's hunks) |
| The same with a changed line the exception does not allow | exit 1, the no-patch message | exit 1, the exception's own reason with its DEC (e.g. "a changed line that is not a ceiling line; DEC-390 allows ceiling lines only") |
| A patchless exception file, no / malformed shas, a refused fetch, a failed diff, a binary file | exit 1, the no-patch message | exit 1, "…the API carries no patch for it (a binary or a very large diff) and its two sides could not be read from git: <reason>, so DEC-39x's exception cannot be read" — never a pass |
| Input that is not the API's arrays | exit 2 | exit 2, unchanged |

The one wording change: the unreadable-patch refusal now continues after "(a binary or a very large diff)" with "and its two sides could not be read from git: <reason>"; its first clause and its closing "so DEC-39x's exception cannot be read" are as before (CF-LVB-7 and CF-LVB-12's assertions, unchanged, still read them). The step's two new environment lines are read only by the fallback.

## 4. Censuses

- Consumers (grep of 84e5f45fb): `rg -n 'lovable-branch-guard|CF-LVB'` outside the briefs and reports → `.github/workflows/ci.yml:68` (the step; `:62` its checkout, shallow), `scripts/ci/lovable-branch-guard.sh`, `scripts/ci/lovable-branch-guard.test.ts`, `docs/features/ci-guards.md:1295` (the CF-LVB section). `scripts/conformance/wired.test.ts` finds the script's basename in `ci.yml` (not edited; passes). `docs/governance/mechanisms.md` holds no CF-LVB line of its own to name here (the register row is §14).
- Pull request #55 (`lovable/forms-categories`), read from run 43861627088's log (`gh run view 43861627088 --log-failed`): the step ran `gh api --paginate "repos/${REPO}/pulls/${PR_NUMBER}/files" | bash scripts/ci/lovable-branch-guard.sh` and answered `1 change(s) outside what a Lovable branch may change (DEC-394)` / `scripts/route-budgets.mjs — the API carries no patch for it (a binary or a very large diff), so DEC-390's exception cannot be read`, exit 1.
- Definition — which files take the fallback: the three exception files only (`docs/tracking/intentional-deletions.txt`, `scripts/route-budgets.mjs`, `scripts/conformance/<name>-allowlist.txt`), the one `if` in the file loop (`scripts/ci/lovable-branch-guard.sh:174`–`:189`); every other file keeps its path rule.
- Tests: CF-LVB-1…12 unchanged (the file's first 12 `it`s; its imports, header comment and one scratch-directory block were added around them); 13 and 14 added (`scripts/ci/lovable-branch-guard.test.ts:412`, `:485`); `scripts/conformance/wired.test.ts` unchanged.
- Lists: `rg -lw 'CF-LVB-1[34]' src e2e scripts` at the base → none (exit 1); CF-LVB-13 and CF-LVB-14 are free. No list gains a name.
- Old-file-readers, second-readers, chunk-graph, environments, first-download, callee-codes: not applicable — a bash script, its test and one workflow step.
- Mechanisms: `exception_refusal` (`scripts/ci/lovable-branch-guard.sh:133`), the file loop's dispatch (`:171`–`:197`), the step (`.github/workflows/ci.yml:68`–`:80`). Two helpers added: `fetch_sides` (`:86`), `patch_from_git` (`:102`); no second judge of changed lines — git's hunks go through the same `exception_refusal`.
- Premises:
  - (a) GitHub's files API omits `patch` for a large diff — **OPEN as to the documentation**: the REST page "List pull requests files" (https://docs.github.com/en/rest/pulls/pulls#list-pull-requests-files, read in this turn) states "Responses include a maximum of 3000 files. The paginated response returns 30 files per page by default." and shows `patch` in its example; it does not state the omission. The omission is **observed**: run 43861627088's log (above), and the pull request's real answer read in this turn: `gh api --paginate repos/tesfayekb/ethio-marketplace/pulls/55/files` → 40 entries, one without `patch`, `scripts/route-budgets.mjs` (`status: modified`); every other entry has one.
  - (b) the scope job's checkout is shallow (`ci.yml:62`, no `fetch-depth`) — true; the script fetches the two commits itself. Chosen: git fetch, not the contents API, because the contents API reads one blob at a time, would need the merge-base commit or the two shas and a size ceiling per call, and cannot be planted in the unit test the brief asks for. Measured on this machine against the real pull request: a plain `--depth=1` fetch of the two commits took about 2.5 minutes on this slow link (two full trees, about 20 MB), `--depth=1 --filter=blob:none` about 1 second (`.git` 232 KB, then the diff fetched the two blobs); the script uses the second.
- Real-data proof (scratch under `/tmp/ethio-scratch/lovable-guard-patchless/`, the operator's to remove): pull request #55's real files answer piped into the new script from a work tree whose `origin` is the real repository, `PR_BASE_SHA=84e5f45fb1cf085b95fbdf8aa54fee2e61e7c6b9`, `PR_HEAD_SHA=52fa7d58c5bdc9ceb1a935aa10e89d78a7482df6` → `lovable-branch-guard: 40 file(s), none outside what a Lovable branch may change (DEC-394).` exit 0, 1.5 s; `git diff --unified=0` of the file between those shas has 18 `+`/`-` lines (nine changed, each a ceiling line). The same answer into the base script → the refusal #55 got, exit 1.
- Queued: `rg -n 'patchless|DEC-398' docs/governance roadmap.md` (excluding this turn's brief) → nothing earlier.

## 5. Tests

- Added: `CF-LVB-13` — a planted API answer without `patch` for `scripts/route-budgets.mjs` (the real file, nine ceiling lines grown by one), the two sides from a planted remote → exit 0; beside a screen file and a forbidden path (per-file verdicts); the deletions ledger's added line and an allowlist's removed lines read from git → exit 0; two identical sides → exit 0; no shas, a malformed sha, a commit the remote lacks, and a binary file → each refuses, never a pass; a patchless file under no exception keeps its path rule and git is not read; the step's two environment lines are asserted in `ci.yml`. `CF-LVB-14` — the same file with one non-ceiling changed line → exit 1 with `DEC-390 allows ceiling lines only`; a ceiling line widened by a key → exit 1; a removed ledger line, an allowlist's added line and a new allowlist file, each read from git → refused with their own DEC.
- Red-first: the base script (`git show HEAD:scripts/ci/lovable-branch-guard.sh`, before the change) against the final test file: CF-LVB-13 and CF-LVB-14 fail (`1 change(s) outside…` on the passing case; no "a changed line that is not a ceiling line" on the refusing one), CF-LVB-1…12 pass (`Tests  2 failed | 12 passed (14)`); the new script: `Tests  14 passed (14)`.
- `bun run typecheck` → tsc ×2 clean. `bun run lint` → `eslint . --max-warnings 0` clean.
- `bunx vitest run scripts/ci/lovable-branch-guard.test.ts scripts/conformance/wired.test.ts` → `Test Files  2 passed (2)` / `Tests  19 passed (19)`.
- `bunx vitest run scripts --maxWorkers=2` → `Test Files  123 passed (123)` / `Tests  648 passed | 1 skipped (649)`.
- `bun run checks` (final tree, 53877d293): fast line `checks (fast): 26 PASS · 0 FAIL · 402s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`; last line `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 468s`. NOT RUN, each with the reason the runner gave: scope › Lovable branch guard (DEC-394), Decide whether the lanes run, Index the code tree the lanes prove (pull-request-only steps / the Actions API's artifacts); build-and-check › Workflow lint (actionlint, pinned) (pinned linux/x64 binary, this machine is darwin/arm64), Install dependencies; component-tests › Install dependencies; secrets-scan › Secrets scan (gitleaks, pinned) (linux/x64 binary); dependency-audit › Install dependencies, Audit (the advisory service is not reachable from the sandbox); e2e-preflight › Cache bun install, Bun cache hit?, Install dependencies, Migration parity preflight (staging) (staging credentials the script never holds); e2e › Download shard results, Download job log tails, Download error contexts, Verify the downloaded artifacts belong to this attempt, Publish merged E2E report, Verdict (the browser lanes' artifacts from GitHub); promote › Promote token present, Configure the actions bot, Fast-forward guard, Promote dev to main (only CI promotes); bundle-budget › Install dependencies; semgrep › Upload SARIF, Warn: the SARIF upload failed (GitHub-only).
- `bun scripts/brief/check-go.ts docs/governance/briefs/lovable-guard-patchless.md --at 84e5f45fb` → `[check-go] no finding`.
- Browser tests: none added or changed (no `e2e/**`, no `src/**` change); no E2E count lines owed.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n 'git (diff|fetch)' scripts/ci/*.sh scripts/ci/*.ts`; `rg -n 'github.event.pull_request' .github/workflows/ci.yml`; `rg -n 'patch' scripts/ci/lovable-branch-guard.sh`. Result: no second reader of a pull request's changed lines exists besides this script (`scripts/ci/docs-only.ts` decides lanes from a branch's changed files by its own code; it is a different concern and is not judged by this rule). No bypass found; none left.

## 7. Allowlists and guards

- `scripts/conformance/briefs-allowlist.txt`: 0 lines before → 0 after (comments only; the brief asked to remove lines keyed to other briefs; there were none).
- No new allowlist line. The guard is the CF-LVB census's test, extended by CF-LVB-13 and CF-LVB-14 and proven on planted answers, with a red-first run against the base script (§5). `scripts/conformance/wired.test.ts` unchanged and green.

## 8. Strings

none — the brief carries FLAG no-new-string; `git diff --name-only 84e5f45fb..HEAD` names no `src/` file.

## 9. Migrations

none — FLAG no-migration; `git diff --name-only 84e5f45fb..HEAD` names no `supabase/` path.

## 10. Departures

- Roadmap line 3 and the brief were written as STEP 0 says; the allowlist step removed nothing (no lines to remove, §1).
- The brief's step names `git fetch --no-tags --depth=1 origin <base> <head>`; the script adds `--filter=blob:none` (measured, §4 premise (b)). The brief allows the executor to choose and name the fetch.
- The brief says "the two sides of that file from git" from the event's base and head shas. `github.event.pull_request.base.sha` is the base branch's tip and the API diffs against the merge base; the two agree when the branch is up to date (pull request #55 was: `compare` gave merge base 84e5f45fb, behind_by 0). For a branch behind its base, git's diff includes the base's own changes to the file reversed: that can refuse over lines the pull request did not write, and cannot pass what the rule refuses on the pull request's own lines. Documented in `docs/features/ci-guards.md` (CF-LVB section); not closed here (needs the merge base, i.e. a deeper fetch or one more API call).
- CF-LVB-13 and CF-LVB-14 carry more cases than the two the brief names (unreadable sides, the other two exceptions read from git, no-exception patchless file); they are inside the named guard.

## 11. CI

Base CI (`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read at the start of the turn):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `84e5f45fb1cf085b95fbdf8aa54fee2e61e7c6b9` (short `84e5f45`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T10:58:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43852434407
```

Two-step check: conclusion SUCCESS; the reported commit 84e5f45fb equals the base. No red of an earlier turn to fix.

This pull request's CI, on the last code commit 53877d293 (run 43867687998, https://github.com/tesfayekb/ethio-marketplace/actions/runs/43867687998; pull request https://github.com/tesfayekb/ethio-marketplace/pull/56): `gh pr checks 56` → 43 pass · 0 fail · 1 skipping (Promote to main, which runs only on `dev`). First six lines of `branches/cursor/lovable-guard-patchless/ci-status.md` on `ci-evidence`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `53877d2931261f28df62cd6cccfec4635e0af406` (short `53877d2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T12:46:57Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43867687998
```

Two-step check: conclusion SUCCESS; the reported commit equals my last code commit. Every red of this pull request's own runs: none. Re-runs: none. Actionlint ran in CI's `build-and-check` on the edited step (pass).

## 12. Limits

- The guard step runs only on a `lovable/*` pull request; this pull request is a `cursor/*` branch, so CI does not run the step. CF-LVB-13 and CF-LVB-14 on planted history, and the run of the script on pull request #55's real answer from a work tree whose `origin` is the real repository (§4), are the proof here; pull request #55's re-run after "Update branch" is the first real run in CI.
- The planted-history tests make git repositories, so they run where git may write `.git`. In this Cursor sandbox they fail at `git init`; they were run outside it (all test runs in §5 were). CI is unsandboxed.
- The fetch's `--filter=blob:none` is honoured by github.com (measured from this machine); the scope job's own network and credentials are not reproducible here (`actions/checkout` persists its credentials, the job has `contents: read`).
- `actionlint` is NOT RUN locally (a pinned linux/x64 binary); CI's `build-and-check` ran it on the edited step (§11).
- No log of an earlier CI run beyond run 43861627088's failed steps was read.

## 13. Findings

- `.github/workflows/ci.yml:62`–`:80`: the guard step runs from the pull request's own merge checkout, so a pull request that edits the script or the step is judged by its edited version. INC-1168 (c)'s "carry" step (named under Left in `docs/features/ci-guards.md`) is the planned answer; raised so the plan keeps it. Nothing exploitable is described here.
- `scripts/ci/lovable-branch-guard.sh` and the CF-LVB tests: the base-tip versus merge-base difference (§10) — a candidate small follow-up (fetch the merge base through the compare answer) if "Update branch" proves a burden.
- Rule or tool notes: `scripts/conformance/*` tests that plant git repositories fail inside Cursor's write-restricted sandbox; the rules' "run outside the sandbox" note for the browser check does not mention them (`.cursor/rules/00-protocol.mdc` step 6).
- Otherwise: none found beyond the above, after reading `git diff 84e5f45fb..HEAD` against rule 80's eight headings.

## 14. Records

DEC — when GitHub's files API carries no `patch` for a file under one of the guard's three content-level exceptions, the guard reads the file's two sides (the pull request's base and head commits) from git and judges the changed lines by the same rule; an unreadable side refuses (CF-LVB-13, CF-LVB-14).

INC — DEC-394's guard refused pull request #55 because GitHub omitted the ceilings file's patch (nine changed lines of about 4 KB each); found on the guard's second real run; closed by this turn.

changelog — The Lovable branch guard reads a patchless exception file (a ceilings file whose diff is too large for GitHub's files API to carry) from git — the pull request's base and head commits — and judges its changed lines by the same rule; an unreadable side refuses (DEC-398).

register row — CF-LVB (the Lovable branch guard, `scripts/ci/lovable-branch-guard.sh`): gains the fallback — a patchless exception file is read from git (`PR_BASE_SHA`, `PR_HEAD_SHA`, one shallow blobless fetch), same rule, an unreadable side refuses; tests CF-LVB-1…14.

roadmap — none dictated by the brief.

slip — none.
