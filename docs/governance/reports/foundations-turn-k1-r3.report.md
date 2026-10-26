# Foundations turn K1, ruling 3: completion report and STOP

START: `b686f0fcb010274acf5effc82557c53a6be6001a` (= BASE).

## 1. Status by step

- STEP 0: done. Brief saved: sha256 `3a8d3efcff48e07727e9421910828a33b6c8d9df0435771857812f6a0727f975`, 21,221 bytes. Roadmap line 3 repointed; nothing ticked.
- R1: done. All three tests failed first, as expected.
- R2: done. The edits were applied by script and every OLD matched exactly once (lib.ts #1–#7, bash-guard.ts #1–#3).
- THE CHECKS: done (see section 4).
- Reviewer: **STOP**. The reviewer found two commands that the shell runs and that both readers allow, plus one refused allowance that is provably data (see section 6).

## 2. Files (`git diff --name-only <START>`)

- .claude/hooks/lib.ts
- .claude/hooks/bash-guard.ts
- scripts/conformance/executor-hooks.test.ts
- docs/governance/briefs/foundations-turn-k1-r3.md
- roadmap.md
- docs/governance/reports/foundations-turn-k1-r3.report.md

## 3. R1 red lines

```
'$(at now)': expected +0 to be 2 // Object.is equality
AssertionError: expected [] to deeply equal [ 'src/x.ts' ]
TypeError: blankInertData is not a function
Tests  3 failed | 21 skipped (24)
```

## 4. Checks

- Hash list: lib.ts OK, bash-guard.ts OK, executor-hooks.test.ts OK.
- `git diff <START> --stat -- src e2e supabase`: empty.
- executor-hooks.test.ts: 24 passed (24).
- Lint: `✖ 39 problems (0 errors, 39 warnings)`.
- Build log: `build OK`. There were no `error TS` lines.
- Full unit run: 311 files, 2 failed and 309 passed; tests: 1,938 passed, 1 skipped, 2 failed (1,941 in total). Both failures were `Test timed out in 5000ms` (AAN-1 and CF-SL-1). Run alone, both files pass (2 files, 8 tests passed). Both are listed as limits.
- format:check: clean (it ran last).

## 5. Behaviour contract (before → after)

- The five new refusals: `cat <<EOF\n'$(at now)'`, the comment case, `find . -name x -exec at now \;`, `echo at`, and the expanding body `meet at 5`. Each went from 0 to 2.
- The changed allowance: `echo "at"` is allowed (0).
- EXH-22: writeTargets now reports `src/x.ts` for the unclosed expanding body ([] before). programsOf now reads `ls` after a comment's `)`.
- EXH-23: blankInertData now exists and behaves as the brief's eight expectations say.

## 6. Reviewer verdict: FINDING (STOP)

Each case below gives the hook input, then the exit code at BASE and after this turn.

1. `{"tool_name":"Bash","tool_input":{"command":"p=systemctl; \"$p\" status"}}`: BASE 0, after 0. **Both readers allow it.** programsOf does not resolve variables, and the word pattern's boundary excludes `=`. This existed before the turn.
2. `{"tool_name":"Bash","tool_input":{"command":"if true; then /bin/systemctl status; fi"}}`: BASE 0, after 0. **Both readers allow it.** programsOf takes `then` for the program, and the word pattern does not accept `/` before the name. This existed before the turn.
3. `{"tool_name":"Bash","tool_input":{"command":"cat <<'A B'\nfix at root\nA B"}}`: BASE 0, after 2. **This allowance is provably data and is now refused.** This turn introduced it: blankInertData's delimiter scan stops at whitespace inside quotes (the same scan is used in shellSegments).

Controls stay allowed (0): `git commit -m "fix at root"`, `git commit -m 'fix at root'`, and `cat <<'EOF'\nfix at root\nEOF`.

Under HOW TO WORK, each of the three findings is a STOP. No code beyond the brief's blocks was changed; the fix needs a ruling.

## 7. K2: non-null assertions left in .claude/hooks/ (`grep -n '\]!\|)!'`)

These 27 lines all predate this brief; this brief added none.

- land.ts:219
- lib.ts:64, 157, 177, 183, 187, 382, 406, 407, 408, 485, 505, 663, 679, 689, 690, 691, 693, 698, 699, 747, 748, 777, 781, 790, 795, 804

## 8. Departures

None. All edits were copied by script.

## 9. CI (ci-status.md, first six lines)

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `7e9206e61ae807be3480d78f229f83538e23e0d6` (short `7e9206e`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T11:41:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40313687373
```

## 10. Limits

- AAN-1 and CF-SL-1 time out under the full run's load and pass when run alone.
- No scheduler was executed during the review; every case was judged by the hook's exit code only.
