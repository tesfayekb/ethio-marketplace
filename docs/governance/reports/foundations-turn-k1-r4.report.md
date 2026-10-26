# Foundations turn K1, ruling 4 — completion and STOP report

Base: `9a3f8713faa0a0e619b96feb08448ae67764c2bb` · Final code commit: `6470d5985b5af6d243818259fb2d5e4930110833`
Brief: `docs/governance/briefs/foundations-turn-k1-r4.md`

## 1. Outcome

STOP under HOW TO WORK's regression rule: exact edits and required checks are complete, but independent review found two newly refused command/data classes. No corrective edits are authorized here. K1 is not closed; a corrective ruling is required.

## 2. Done and not done by step

- STEP 0: done. Exact brief saved; SHA-256 `706f6157d215be038f2c59b836f2c86825a7af673fd65a5b8bc0a3c20e25858d`, 17,645 bytes. Only roadmap line 3's brief reference changed; its suffix preserved, nothing ticked.
- R1: done, all three test EDIT blocks copied by script; both selected tests failed first as prescribed.
- R2: done, all eleven implementation EDIT blocks copied by script, each matching once. Whole hook file: 24 passed.
- THE CHECKS: done. Three hashes OK, app-path diff empty, lint clean of errors, full unit suite passed with one existing skip, build OK, formatting clean before report.
- Independent review: done on final code tree at `6470d5985b5af6d243818259fb2d5e4930110833`; no later code change. Verdict NOT READY.
- THE COMPLETION REPORT: this completion-and-STOP report records all evidence and limits. Final format check runs after writing/formatting it.
- END THE TURN: STOP; no additional implementation or roadmap tick.

## 3. File list

`git diff --name-only <START>` before report returned the first five paths below; this report is the sixth path in the final diff.

- `.claude/hooks/bash-guard.ts`
- `.claude/hooks/lib.ts`
- `docs/governance/briefs/foundations-turn-k1-r4.md`
- `docs/governance/reports/foundations-turn-k1-r4.report.md`
- `roadmap.md`
- `scripts/conformance/executor-hooks.test.ts`

## 4. Required behaviour contract — measured before → after

All values are hook exit codes from inert JSON events; the command strings were never executed.

| Hook input command | BASE → R4 | Result |
| --- | --- | --- |
| `p=systemctl; "$p" status` | 0 → 2 | Refused: a program named by an expansion |
| `$'at' now` | 0 → 2 | Refused: a program named by an expansion |
| `if true; then /bin/systemctl status; fi` | 0 → 2 | Refused: scheduling |
| `cat <<'A B'` + newline + `fix at root` + newline + `A B` | 2 → 0 | Required quoted-space delimiter allowance |
| `echo "$(git rev-parse HEAD)"` | 0 → 0 | Allowed |
| `for f in a b; do echo $f; done` | 0 → 0 | Allowed |

These controls pass, but the broader unchanged-behaviour contract is not met: section 8's regressions were introduced here.

## 5. R1 red-first evidence

```text
FAIL EXH-21
AssertionError: if true; then /bin/systemctl status; fi: expected +0 to be 2 // Object.is equality
FAIL EXH-23
AssertionError: expected 'cat <<\'A B\'\nfix at root\nA B' to be 'cat <<\'A B\'\n           \nA B' // Object.is equality
Test Files  1 failed (1)
Tests  2 failed | 22 skipped (24)
```

No existing assertion was loosened; only the brief's exact additions were applied.

## 6. Hashes and app scope

```text
.claude/hooks/lib.ts: OK
.claude/hooks/bash-guard.ts: OK
scripts/conformance/executor-hooks.test.ts: OK
```

The hash list was read directly from the saved brief, twice. `git diff <START> --stat -- src e2e supabase` returned empty. No migration, string, package, AGENTS.md change or deletion.

## 7. Tests, lint and build

```text
Whole executor-hooks.test.ts:
Test Files  1 passed (1)
Tests  24 passed (24)
Duration  22.41s

bun run lint:
39 problems (0 errors, 39 warnings)

bun run test:unit:
Test Files  311 passed (311)
Tests  1940 passed | 1 skipped (1941)
Duration  296.99s

Latest build telemetry:
=== build 2026-10-26T12:09:42Z ===
build OK
```

EXH-21 and EXH-23 pass in the whole hook file; the full unit run also passes its 24 cases. EXH-11, EXH-12, EXH-17, EXH-19 and EXH-20 passed in the full run. No timeout this turn, no standalone retry needed. The supervisor's expectation that all 1,941 tests pass differs from the measured existing one-skip result; nothing was changed to remove that skip. No manual build/typecheck or browser test was run; this brief requires hook tests, not application browser work.

## 8. Independent review and STOP reproductions

Reviewer: 105 BASE/current inert JSON-event pairs, exact prescribed blocks independently verified; 2 STOP-worthy regression classes and 2 report-only existing-gap classes. Reviewed final code commit/tree identified above; platform automatic commits were observed, never created by the executor. NOT READY: two regression classes block closure. The reviewer did not supply a canonical counted review line; no invented line is attributed to them.

I independently reran both heredoc examples and the quoted-keyword example; each reproduced BASE 0 → R4 2.

### Regression 1 — quoted heredoc body is inert, now refused

Exact JSON event:

```json
{"tool_name":"Bash","tool_input":{"command":"cat <<'A\\ B'\n/bin/systemctl status\nA\\ B"}}
```

BASE exit 0; R4 exit 2. Double-quoted delimiter event also reproduces:

```json
{"tool_name":"Bash","tool_input":{"command":"cat <<\"A\\ B\"\n/bin/systemctl status\nA\\ B"}}
```

BASE exit 0; R4 exit 2. Backslash before a space is literal in these quoted delimiter forms. The new full-word reader plus existing global quote/backslash deletion invents a different terminator, then interprets inert body text as commands. Locations: `.claude/hooks/lib.ts:302–312,523–526,607–609`. This meets the brief's explicit inert-data regression STOP criterion.

### Regression 2 — literal quoted executable mistaken for keyword

```json
{"tool_name":"Bash","tool_input":{"command":"'then' \"$BIN\""}}
```

BASE exit 0; R4 exit 2. Quoted `then` is a literal executable, not a reserved shell keyword; `$BIN` is only an argument. Equivalent quoted `if`, `do`, `!`, `{`, `}` cases also reproduce. Location: `.claude/hooks/lib.ts:707–709` (quote provenance lost by tokenizer). This is not the brief's named expanded-program exception: the executable is literal.

## 9. Report-only existing findings and K2

No sibling changed. Findings BASE also allowed are report-only under this ruling:

- `$(echo /bin/systemctl) status`: BASE 0 / R4 0; backquoted equivalent `` `echo /bin/systemctl` status ``: 0 / 0. Locations `.claude/hooks/lib.ts:343–398,760–764`: outer substitution-selected executable not reliably retained/refused.
- `"$DIR/echo" hi`: BASE 0 / R4 0; `~/bin/echo hi` and `e*ho hi`: 0 / 0. Locations `.claude/hooks/lib.ts:738,763`: basename extraction removes the dollar-bearing prefix; dynamic rejection also requires dollar/backtick presence.

These existing spellings belong to the supervisor's later kit turn, not a reason to expand this turn's scope. Review evidence includes keyword write-target probes; no actual writes occurred.

## 10. Departures and limits

- Initial temporary message extraction stopped at an inline mention of BRIEF-END (3,930 bytes). Its assertion failed before any project file was written. Full-line markers then extracted exactly 17,645 bytes and the required SHA; STEP 0 used those verified bytes. No brief-hash mismatch was saved.
- Independent review ran on the final automatic code commit's tree; no stateful git was run to manufacture a commit. No code was changed after review.
- Full unit tests use the existing harness's scratch repositories; no stateful git command was issued directly by the executor. The read-only reviewer did not run the full conformance suite because of its scratch git/landing operations, and instead compared 105 inert hook events. The executor's required whole tests ran successfully.
- Detailed reviewer evidence remains temporary under `/tmp/k1-r4-review/`; the important inputs, codes, verdict and locations are preserved in this committed report. No new evidence file outside scope.
- Reviewer observations do not prove absence of every possible bypass. Required cases and reported differentials were measured, not actual command execution.
- K1 cannot close because the brief explicitly requires STOP for these new regressions; exact prescribed code retained pending ruling.

## 11. CI evidence

Last readable first six lines, fetched after checks:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `b686f0fcb010274acf5effc82557c53a6be6001a` (short `b686f0f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T12:15:07Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40315678648
```

This SUCCESS is not attributed to the final R4 code/report commit. The supervisor reads the run on this turn's final commit. No waiting, rerun or dispatch.

## 12. Formatting and closure

Before the report, `bun run format:check` returned:

```text
All matched files use Prettier code style!
```

The report is formatted, then `bun run format:check` runs last. Its actual terminal result is the closure formatting evidence. Roadmap was re-read; line 3 points to ruling 4 and no checkbox was ticked. Remaining blocker: corrective ruling for the two reproduced regression classes. No implementation follows the end of this turn.
