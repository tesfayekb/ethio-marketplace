# Foundations turn K1, ruling 1 — completion report

DONE STEP 0, R1, R2, THE CHECKS, the review. LEFT two reviewer MAJORs listed (not fixed; see Departures). CI: the supervisor reads the run on the final commit.

## 1. Start
`git rev-parse HEAD` → `91ca9f47039d8091d5d447e6401c6fc549b2cec3` (= BASE).

## 2. Steps
- STEP 0 — done. Brief saved: `1c4662aff3e8f43b80c21e2254109ef2b206e4b4963888d3e405c9eb1833396c`, 16112 bytes. roadmap.md line 3 points at the brief; nothing ticked.
- R1 — done (red first, nothing committed).
- R2 — done; the eight lib.ts EDIT blocks copied by script.
- THE CHECKS — done.

## 3. Files (`git diff --name-only 91ca9f47`)
```
.claude/hooks/lib.ts
docs/governance/briefs/foundations-turn-k1-r1.md
roadmap.md
scripts/conformance/executor-hooks.test.ts
```
plus this report.

## 4. R1 red lines
```
AssertionError: echo "$(at now)": expected +0 to be 2 // Object.is equality
AssertionError: expected [ 'echo' ] to deeply equal [ 'echo', 'cp' ]
      Tests  2 failed | 21 skipped (23)
```

## 5. Behaviour contract (before → after)
- `echo "$(at now)"`: allowed → refused
- ``echo "`crontab -l`"``: allowed → refused
- `git commit -m "note $(systemctl restart nginx)"`: allowed → refused
- unquoted heredoc with `$(at now)` in its body: allowed → refused
- `echo '$(at now)'`: allowed → allowed
- commit message through a quoted heredoc inside `"$(…)"`: allowed → allowed
- EXH-22: write inside `"$(…)"` outside SCOPE (`src/features/posting/wizard.tsx`): allowed → refused; to `.claude/hooks/lib.ts`: allowed → refused; inside SCOPE (`src/server/ai/x.ts`): allowed → allowed.

## 6. Hashes
```
.claude/hooks/lib.ts: OK
scripts/conformance/executor-hooks.test.ts: OK
```
`git diff 91ca9f47 --stat -- src e2e supabase`: empty.

## 7. Tests and checks
- `executor-hooks.test.ts` whole: 1 file, 23 passed (23), EXH-0…22.
- `bun run lint`: ✖ 39 problems (0 errors, 39 warnings).
- `bun run test:unit`: Test Files 1 failed | 310 passed (311); Tests 1 failed | 1938 passed | 1 skipped (1940). The failure is CF-SL-1 (strings-layers.test.ts) under full-run load; re-run alone: 6 passed (6) — a sandbox limit, untouched by this turn.
- Build log: `build OK` (latest entry).
- `bun run format:check`: run last (see chat).

## 8. K2 — other readers of command text by regular expression in .claude/hooks/
bash-guard.ts rule table, :28–:169 (e.g. :28 `git push`, :88 `psql`, :139 `eval`, :145 `node -e`). They read the raw text, quotes included, so a substitution inside double quotes is matched, not missed; they can mistake data for a command (e.g. `echo 'git push'` is refused) — fail-closed. No other program reader by regex found.

## 9. Reviewer verdict — MAJOR
1. lib.ts :318–:320 — the `$(` body matcher ignores quotes: `echo "$(echo ')'; at now)"` → exit 0 (expected 2).
2. lib.ts :468–:469 — a backslash-quoted delimiter keeps its backslash (`<<\A` stores `\A`), so a following heredoc's body is swallowed: `cat <<\A <<B` / `hello` / `A` / `$(at now)` / `B` → exit 0 (expected 2).
Probes used inert hook input only. 23/23 tests passed in the reviewer's run.

## 10. Departures
- The two MAJORs are in SCOPE and provable, but fixing them changes `.claude/hooks/lib.ts` away from the brief's hash `2c62d609…`, and the brief forbids reconciling a mismatch other than by copying the block. The two instructions conflict, so I listed them and did not fix them; a ruling decides. Both cases are allowed at BASE too, so nothing that was refused is now allowed.

## 11. CI (ci-status.md, first six lines, latest readable)
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e024c36e032b356339c299da59bea347bd827fc8` (short `e024c36`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T09:31:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40296745791
```

## 12. Limits
The full unit run times out CF-SL-1 under load in the sandbox (passes alone). CI on the final commit is not read here.
