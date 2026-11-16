```
THE LOVABLE GUARD READS A PATCHLESS EXCEPTION FILE FROM GIT — when GitHub's files API omits the patch of a file under one of the three content-level exceptions (its diff is too large to carry: the ceilings file's long lines), the guard reads the two sides of that file from git instead of refusing (DEC-398). Base: dev 84e5f45fb

Stem: `lovable-guard-patchless` (brief `docs/governance/briefs/lovable-guard-patchless.md` (new); report `docs/governance/reports/lovable-guard-patchless.report.md` (new)). Tier B (a CI guard's rule). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. No stop planned: STEP 1 is a census that does not STOP; a premise found wrong is a STOP.

BASELINE: dev 84e5f45fb — CI run 43852434407 SUCCESS (lanes skipped; the code tree proven by run 43849416511).

PREVENTION (G70): the class — a guard built on one channel's data without its documented gap (GitHub's files API drops `patch` for a large diff; the guard treated "no patch" as unreadable). Repository: this turn. Instructions: rule in force for v1.20 — a guard that reads an outside API names the API's documented omissions and its fallback in the GO. Cursor rules: not needed. Knowledge: not needed.

THE SYSTEM (G0)
CONCERN: a pull request from a `lovable/*` branch is judged by content under the three exceptions (DEC-390, DEC-396) whatever the size of its diff.
MECHANISM: `scripts/ci/lovable-branch-guard.sh` (`exception_refusal`: a missing patch refuses today, "the API carries no patch for it") and its step in `.github/workflows/ci.yml` :66–:75; tests `scripts/ci/lovable-branch-guard.test.ts` CF-LVB-1…12.
CONSUMERS (grep of 84e5f45fb): the step; pull request #55 (`lovable/forms-categories`), refused by the scope job of run 43861627088 with "scripts/route-budgets.mjs — the API carries no patch for it" after a ratchet changed nine of the file's long lines (each about 4 KB) — every line a ceiling line, the file's sha256 equal to the supervisor's.
COVERED HERE: the fallback. LEFT: none.
CONFORMANCE GUARD: CF-LVB-13 — a planted API answer without `patch` for `scripts/route-budgets.mjs`, with the two sides supplied from a planted git history whose changed lines are ceiling lines → passes; CF-LVB-14 — the same with one non-ceiling changed line → refuses with DEC-390 named; a patchless file that is NOT under an exception keeps its path rule (unchanged); a patchless exception file whose two sides cannot be read refuses (never a pass).
EXCEPTIONS: none.
FIVE LENSES — security: the content rule is unchanged, only its source widens; an unreadable side still refuses · performance: one shallow fetch of two commits in the scope job, only on `lovable/*` pull requests · failure modes: a fetch that fails refuses with its message · consistency: the same `exception_refusal` reading for a patch from the API and a diff from git · future growth: none.
FORWARD-SCAN: every later Lovable pull request that changes a ceiling. REGISTER: the CF-LVB row gains the fallback.

SCOPE, by area (the plan narrows it to files; each source file with its own tests): `scripts/ci/` — `scripts/ci/lovable-branch-guard.sh` and `scripts/ci/lovable-branch-guard.test.ts`; `.github/workflows/ci.yml` (the guard step only: the base and head shas from `github.event.pull_request.base.sha` / `.head.sha` into the step's environment, and whatever fetch of those two commits the script's fallback needs); `docs/features/ci-guards.md` (the CF-LVB section); `roadmap.md` line 3; the turn's own brief and report; `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`). Never a path rule 00 forbids.

THE TURN, IN THIS ORDER
STEP 0 — `git fetch origin dev main ci-evidence`, `git switch -c cursor/lovable-guard-patchless origin/dev`, `git status --short` empty; `git rev-parse --short=9 HEAD` prints 84e5f45fb. Save this brief byte for byte as `docs/governance/briefs/lovable-guard-patchless.md` (new) (scripted copy, one fenced block; sha256 equal to the value after END BRIEF). Roadmap line 3: `The brief in force: docs/governance/briefs/lovable-guard-patchless.md (the Lovable guard reads a patchless exception file from git, DEC-398). Previous: ` + the line as it stands after "The brief in force: ". Remove from `scripts/conformance/briefs-allowlist.txt` every line keyed to a brief other than this one. `bun scripts/brief/check-go.ts docs/governance/briefs/lovable-guard-patchless.md`, output pasted. Commit `lovable-guard-patchless: task saved`; not pushed alone.
STEP 1 — THE CENSUS (no STOP; answers in the report's §4): consumers (the step, #55's refusal read from the run's log); definition (which files take the fallback: the three exception files only); tests (CF-LVB-1…12 unchanged + 13, 14; `scripts/conformance/wired.test.ts` unchanged); lists (none; CF-LVB-13 and CF-LVB-14 free by `rg -lw 'CF-LVB-1[34]' src e2e scripts`); old-file-readers, second-readers, chunk-graph, environments, first-download, callee-codes — CENSUS-ITEM each: not applicable — a bash script, its test and one workflow step; mechanisms (`exception_refusal`, the dispatch, the step); premises — (a) GitHub's files API omits `patch` for a large diff (cite GitHub's REST documentation page for "List pull requests files" as read, or OPEN); (b) the scope job's checkout is shallow (`ci.yml` :62, no `fetch-depth`), so the fallback fetches the two commits itself (`git fetch --no-tags --depth=1 origin <base> <head>`) or reads the two blobs from the contents API — the executor chooses and names it; findings; queued (`rg -n 'patchless|DEC-398' docs/governance roadmap.md`: nothing earlier).
STEP 2 — the fallback in the script and the step; CF-LVB-13, CF-LVB-14; the docs. Commit `lovable-guard-patchless: read a patchless exception from git (DEC-398)`.
STEP 3 — `bun run typecheck`; `bun run lint`; `bunx vitest run scripts/ci/lovable-branch-guard.test.ts scripts/conformance/wired.test.ts`; `bun run checks`; `bun scripts/brief/check-go.ts docs/governance/briefs/lovable-guard-patchless.md --at 84e5f45fb` (output pasted). The self-review before the push.
STEP 4 — ONE push; `gh pr create --base dev` (title "The Lovable guard reads a patchless exception file from git (DEC-398)"); `gh pr checks <number> --watch --interval 60`; green → the comment per rule 00.
STEP 5 — the report while CI runs: rule 60's fourteen headings; §14 Records word for word; its push changes records only.

DECIDE-AND-NAME: git fetch or the contents API for the two sides; the exact environment names in the step.

RECORDS (the report's §14, word for word): DEC-398 — when GitHub's files API carries no `patch` for a file under one of the guard's three content-level exceptions, the guard reads the file's two sides (the pull request's base and head commits) from git and judges the changed lines by the same rule; an unreadable side refuses (CF-LVB-13, CF-LVB-14). INC-1185 — DEC-394's guard refused pull request #55 because GitHub omitted the ceilings file's patch (nine changed lines of about 4 KB each); found on the guard's second real run; closed by this turn. Changelog: one line.

TOLERANCES (G60), by defect: a CI red whose failure names the guard script, its test or the guard step is a STOP; a red elsewhere is named under Limits and CI judges. No `src/` file changes, so no bundle table is owed.

FINDINGS (G64): anything major beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: the step runs only on a `lovable/*` pull request; CF-LVB-13 and CF-LVB-14 are the proof here, pull request #55's re-run after "Update branch" the first real one.
```
