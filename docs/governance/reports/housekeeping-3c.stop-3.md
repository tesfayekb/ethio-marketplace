QUESTION — housekeeping-3c STEP 6: `check-go --at 611ade039` prints one finding, CF-BRIEF-16 on the brief itself
DONE: parts A, B, C, D (commits 41775c501, 8d238cfde, 2aff22859, d0f6c2cf5); STEP 6's `bun run typecheck` (exit 0), `bun run lint` (exit 0), `bunx vitest run scripts --maxWorkers=2` (110 files, 568 passed, 1 skipped), `bun run checks` (`checks: 35 PASS · 0 FAIL · 24 NOT RUN · 470s`)
LEFT: STEP 6's `check-go` verdict (this question); the self-review, the push, the pull request's CI, the report, the docs-only report push
CI: the lane head's run (ab9670e32, stop 2's push), root `ci-status.md` on ci-evidence:
# CI Status (auto-generated — do not edit by hand)

- Commit: `ab9670e322fef75f98d6cc7da14971f50995010c` (short `ab9670e`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T09:35:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43191935076
FILES: this turn's, `git diff --name-only 611ade039` on d0f6c2cf5:
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
docs/governance/briefs/housekeeping-3c.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-3c.stop-1.md
docs/governance/reports/housekeeping-3c.stop-2.md
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

## The output

STEP 6 says of `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-3c.md --at <this turn's base commit>`: "the expected result is no finding". On d0f6c2cf5 it prints, exit 1:

```text
[check-go] at 611ade039441bfc45b112bf18fd5ae04689e6bd7 (--at 611ade039): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-Mybev2; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
CF-BRIEF-16 docs/governance/briefs/housekeeping-3c.md:50 SCOPE names .claude/hooks/**/*.ts, which rule 00 forbids the executor
[check-go] 1 finding(s)
```

The finding is CF-BRIEF-16 (ruling 1 item 6) judging the brief in force: its SCOPE line 50 reads "every `scripts/**/*.ts` and `.claude/hooks/**/*.ts` file the new project reports an error in", the path ruling 1 item 1 took out of the turn. Every tree law and COUNT line at 611ade039 is clean. The brief is saved byte for byte, so its line cannot change. The brief's TOLERANCES make "a red … when its failure names a path this turn changed" a STOP, and this turn saved that brief; hence this question rather than a choice of mine.

What stands on d0f6c2cf5 (not pushed past ab9670e32 yet; this stop's push carries Parts A → D):
- `scripts/conformance/briefs-allowlist.txt` holds one line, so `briefs.test.ts`'s in-force test (the text laws on the brief in force, which now include CF-BRIEF-16) passes: `docs/governance/briefs/housekeeping-3c.md:50 SCOPE names .claude/hooks/**/*.ts, which rule 00 forbids the executor | the saved brief predates CF-BRIEF-16; ruling 1 item 1 keeps the turn out of .claude/ | INC-1110`. CF-BRIEF-13 drops it when the next brief comes in force.
- `check-go.ts` reads the allowlist only to judge it (CF-BRIEF-13); it has never subtracted allowlisted findings (turn 2's form), so the line does not quiet its output.

A second difference from the brief, for the same answer: under `--at`, CF-BRIEF-5 also reported `docs/governance/briefs/housekeeping-3c.md:53 cites docs/governance/briefs/housekeeping-3c.md, not in the tree` — the brief's own path, which STEP 0 saves, so the commit STEP 0 began from never holds it, for every brief. `go-laws.ts` `citedPathFindings` now skips the brief's own path (one line, its comment says why); CF-BRIEF-14's `--at` case plants it and went red without the skip. Neither ruling names this line.

QUESTION. Which form closes STEP 6?
(a) The finding stands as the law's true verdict on this brief: STEP 6's expected result reads "one finding, CF-BRIEF-16 at :50", the allowlist line stays for the in-force test, and the report pastes the output as above. (My recommendation: the supervisor's pre-send run keeps showing every finding, allowlisted or not.)
(b) `check-go.ts` subtracts the allowlist's lines keyed to the file (printing them as allowed), so this run prints `[check-go] no finding`. A behaviour change to check-go no ruling names; the supervisor's pre-send run would then hide allowlisted findings.
And: is the CF-BRIEF-5 own-path skip kept (it is what lets any `--at <the commit STEP 0 began from>` run be clean)?
