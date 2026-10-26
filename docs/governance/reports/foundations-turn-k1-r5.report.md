# Foundations turn K1, ruling 5 — completion report

Base: 6c445a3e428b341c3d112dbb0990246364fb7f4d · Final code commit: 23d3cb33448ac18be281d0fa04db31e47c3d0104
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on 23d3cb33448ac18be281d0fa04db31e47c3d0104

## 1. Outcome and steps

STEP 0 done: exact brief saved; roadmap line 3 reference replaced once, suffix preserved, nothing ticked. R1 done: both selected tests failed before implementation. R2 done: all 19 implementation replacements matched exactly once and the whole hook test passed. THE CHECKS done with the named CF-SL-1 full-load timeout, passing alone. Independent review done on the final code commit; no subsequent code change. Completion report done. K1 closes under this ruling; later findings belong to the next kit turn. Final formatting result is recorded in section 8.

## 2. Scope and files

`git diff --name-only 6c445a3e428b341c3d112dbb0990246364fb7f4d` before creating this report named the first five files below; the final diff also includes this report.

- `.claude/hooks/bash-guard.ts`
- `.claude/hooks/lib.ts`
- `docs/governance/briefs/foundations-turn-k1-r5.md`
- `roadmap.md`
- `scripts/conformance/executor-hooks.test.ts`
- `docs/governance/reports/foundations-turn-k1-r5.report.md`

No app, e2e or Supabase path changed: `git diff 6c445a3e428b341c3d112dbb0990246364fb7f4d --stat -- src e2e supabase` was empty. No migration, new string, package, AGENTS.md change or deletion. Roadmap task boxes remain unchanged as STEP 0 required.

## 3. Exact brief and edit proof

```text
a8c062cbe34b4c475cd6d0700387d8fe2ed4d28d28c65b5578e79d8dee77f143  docs/governance/briefs/foundations-turn-k1-r5.md
33113 docs/governance/briefs/foundations-turn-k1-r5.md
.claude/hooks/lib.ts: OK
.claude/hooks/bash-guard.ts: OK
scripts/conformance/executor-hooks.test.ts: OK
```

Copied the four test blocks and fourteen library plus five guard blocks by script from the saved brief; every OLD matched once in the ordered application. Independent review reproduced the exact final files. No expectation changed. The touched double-quote reader replaces its three existing non-null assertions with charAt; no NEW block introduces one.

## 4. R1 red-first evidence

Command: `bunx vitest run scripts/conformance/executor-hooks.test.ts -t "EXH-21|EXH-23"`.

```text
AssertionError: bash <<'EOF'
at now
EOF: expected +0 to be 2 // Object.is equality
TypeError: heredocDelimiter is not a function
Test Files  1 failed (1)
Tests  2 failed | 22 skipped (24)
```

Nothing committed manually at R1; platform commits are managed externally.

## 5. Fifteen-case behaviour contract

Reviewer measured these via inert JSON hook events, never by executing the payload. Command notation uses literal `\n` for line breaks. 0 means allowed, 2 refused.

| tool_input.command | BASE → final |
| --- | --- |
| `bash <<'EOF'\nat now\nEOF` | 0 → 2 |
| `cat <<'EOF' \| bash\nat now\nEOF` | 0 → 2 |
| `echo 'at now' \| sh` | 0 → 2 |
| `vim -c '!at now'` | 0 → 2 |
| `bunx vitest run -t "look at this"` | 0 → 2 |
| `cat <<'A\ B' > /tmp/x\nhi\nA\ B\nat now\nA B` | 0 → 2 |
| `$(echo /bin/systemctl) status` | 0 → 2 |
| `"$DIR/echo" hi` | 0 → 2 |
| `/usr/bin/a? now` | 0 → 2 |
| `e*ho hi` | 0 → 2 |
| `cat <<'A\ B'\n/bin/systemctl status\nA\ B` | 2 → 0 |
| `cat <<"A\ B"\n/bin/systemctl status\nA\ B` | 2 → 0 |
| `'then' "$BIN"` | 2 → 0 |
| `[ -f package.json ] && echo "ready at last"` | 0 → 0 |
| `~/bin/echo hi` | 0 → 0 |

Event shape: `{"hook_event_name":"PreToolUse","tool_name":"Bash","tool_input":{"command":"<case>"}}`.

The six new scheduling refusals, four unreadable-program refusals and five required allowances pass. Broader reviewer pairs retained scheduler refusals in substitutions, expanding heredocs, unquoted keywords and wrappers; data-only pipelines, compound commands, output redirections and tee retained their allowances. All 37 compared writeTargets inputs matched. Four explicit write cases returned `["/tmp/out"]` at both revisions.

## 6. Unit and EXH evidence

Whole focused file: 1 file passed, 24 tests passed; duration 19.63 seconds. Full `bun run test:unit`: 310 passed files, 1 failed file (311); 1939 passed, 1 skipped, 1 failed (1941); duration 271.49 seconds. The only failure was CF-SL-1, timed out at 5000ms.

Alone: `bunx vitest run scripts/conformance/strings-layers.test.ts`: 1 file passed, 6 tests passed; CF-SL-1 2995ms; duration 10.16 seconds. No test assertion or budget changed (INC-921).

Full-run EXH lines (the reporter lists slower cases only; the whole hook file passed all 24):

```text

```

## 7. Independent review

Reviewer ran on 23d3cb33448ac18be281d0fa04db31e47c3d0104. Verdict READY, no qualifying STOP findings, no BLOCKER/MAJOR/MINOR. Exact hashes and edits verified; changed scope and roadmap suffix verified. Reviewer did not have the original carrying message for independent byte comparison; applying agent extracted it from chat history and matched its stated checksum and byte count.

Report-only unchanged observations, each supplied as tool_input.command in the event in section 5:

```text
cat <<'EOF'
$(at now)
EOF       BASE 2 → final 2
echo "$(printf at)"             BASE 2 → final 2
echo at\ now                   BASE 2 → final 2
true # at now                  BASE 2 → final 2
```

These unchanged refusals are not STOP findings. Named-edge and unreadable-program refusals are deliberate. No qualifying command that BASE refused and final allowed while actually running a scheduler/service-control program was observed; no qualifying data-only command newly refused was observed. Review is differential, not exhaustive shell-parser proof.

## 8. Lint, preview and formatting

`bun run lint`: 0 errors, 39 warnings. Latest preview diagnostic available before this report: build 2026-10-26T12:46:05Z, build OK; no error TS lines. No manual project build or typecheck run.

Final `bun run format:check`, run last after formatting this report: `All matched files use Prettier code style!` Markdown ESLint checks reported three ignored-file warnings (no matching configuration), zero errors.

## 9. CI evidence

Latest readable first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `9a3f8713faa0a0e619b96feb08448ae67764c2bb` (short `9a3f871`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T12:42:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40318186480
```

This is FAILURE on older 9a3f871, not BASE 6c445a3e or the final code commit. Read-only investigator reports E2E lane 8 mobile-360 page.waitForURL timeout at that older revision; no code root for this task established. No CI success claimed; BASE and final CI remain unverified by that evidence. No re-run requested or workflow changed.

## 10. Concern, mechanism and K2 census

Concern: scheduler/service control must not run; inert data is judged by its consumer. Extended the existing readers only: shellSegments and blankInertData now share heredocDelimiter; quoted provenance reaches segmentProgram; whole-word unreadablePrograms runs before scheduling; runsOnlyDataPrograms decides blanked versus whole text. Deliberate scheduling text fallback is not a second local mechanism.

BASE scoped consumer census: lib.ts:362,368 substitutions; :647 commandSegments; :751–754 programsOf; :761–764 unreadablePrograms; :773–775 writeTargets; delimiter reader :523 and :607. bash-guard.ts:211 programsOf, :212 blankInertData, :220 unreadablePrograms. This ruling extends all named consumers. Other text-based rules in scoped bash-guard at BASE remain unchanged: DENY :148 eval, :150 shell strings, :154 interpreter strings, :169 Claude. They are regex-based sibling concerns, not proven vulnerabilities. Investigator did not enumerate external hook files; no claim of zero external bypasses. Out-of-scope census remains limited to previously reported older gaps.

## 11. Departures and limits

- Initial extraction split on an inline BRIEF-END mention, so it selected 6781 bytes; assertion prevented any project write. Corrected extraction to anchored boundary lines from the full saved chat message; exact required bytes then matched. No brief mismatch was saved and no expectation edited.
- Full unit run is not all-green because of the explicitly ruled CF-SL-1 load timeout; alone all six tests pass. Existing one skip retained. AAN-1 did not fail this run.
- CI raw evidence is older than BASE. No BASE red was established to fix. Final CI awaits supervisor.
- No E2E/browser run: task changes executor hooks only; specified proof is inert hook events and unit tests, not app UI. No content route changed; no unrelated metadata edits made.
- No manual stateful git command, landing hook, build or typecheck run. Existing tests create and manipulate only scratch repositories under their established harness.
- Differential review is not an exhaustive shell proof. Existing old gaps remain for the next kit turn: path-named scheduler in shell-fed data, earlier-variable eval indirection, and older non-null assertions outside edited hunks. No separate memory or AGENTS update: FLAGS forbids AGENTS changes, and DEC-270 is recorded by the supervisor in this exact brief.

## 12. Closure

DONE: prescribed edits, red-first and focused proofs, hashes, full unit evidence, isolated timeout proof, independent READY review and completion report. No corrective ruling requested. LEFT: supervisor's CI read and future-kit findings only. Roadmap reference names ruling 5; boxes unchanged. Final code is unchanged since review; platform records this report when the turn ends.
