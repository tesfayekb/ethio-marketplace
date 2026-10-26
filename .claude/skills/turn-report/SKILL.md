---
name: turn-report
description: Finish a turn — run THE CHECKS and THE END-TO-END CHECK, call the independent reviewer, write the completion report from commands, commit it and land with bun .claude/hooks/land.ts. Its short form writes and lands a stop report for a STOP, a question or a migration.
---

# Finish a turn (THE CHECKS → review → report → land)

## 1. The checks, in this order (land.ts runs the same list again and caches green steps)

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run i18n:usage && git diff --stat -- docs/generated/i18n-usage.json public/i18n-usage.json   # commit both when they move
bun run build
bash scripts/check-migrations.sh        # when supabase/migrations/ changed; paste the guard lines
bun run format:check                     # LAST
```

Every red is fixed at its root (no `!`, cast, `any`, `@ts-expect-error`; no loosened assertion), then
the list runs again from the failed step.

## 2. The end-to-end check

```bash
git diff --name-only <BASE>..HEAD | grep '^e2e/.*\.spec\.ts$'
bun run e2e:local -- <each touched spec file, whole>             # both projects, 2 workers, fake mode, 0 retries
bun run e2e:local -- --grep "<ids the brief names>"
```

Paste every count line and the server log's `[ssr-error]` count by path. No browser or no staging
credentials in this environment: say so under Limits; CI runs every test on the landing.

## 3. The independent review

Every turn that ends with a completion report gets the review; a STOP, QUESTION or MIGRATION stop does not.

1. Run it after THE END-TO-END CHECK, on the last code commit: nothing is committed between its
   answer and the report except a BLOCKER fix.
2. Invoke the `reviewer` subagent in the FOREGROUND — the Agent call with `run_in_background: false` —
   and wait for its answer. Never start it in the background, never write the report or land before it
   answers, never skip it for a stop gate or the turn's length; a review that cannot run is a STOP.
3. Tell it nothing about what you expect: it reads the brief and the rules itself.
4. Every BLOCKER is fixed in a new commit, and the reviewer runs again on that commit.
5. Every MAJOR and MINOR is fixed when the fix lies inside SCOPE and the brief's exact text allows it;
   otherwise it is listed under Departures with the reason, for the supervisor's ruling.
6. Copy its last line — `Review: READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <sha>` — word for
   word as the report's third line. `land.ts` refuses a final report without it, with a BLOCKER in it,
   or naming another commit than the last code commit.

## 4. The report

Write `docs/governance/reports/<brief-stem>.report.md` with the twelve sections of
`.claude/rules/60-report.md`; its second line names the last code commit (`git rev-parse --short HEAD`
before you commit the report). Commands for the numbers:

```bash
git diff --name-only <BASE>..HEAD                # section 2 — every path, verbatim
git ls-files -- <each new file>                  # section 2 proof
git diff --stat <BASE>..HEAD -- scripts/conformance/*-allowlist.txt && for f in scripts/conformance/*-allowlist.txt; do echo "$f $(grep -vc '^#' $f)"; done   # section 7
git show origin/ci-evidence:docs/tracking/ci-status.md | head -6     # section 11 (check the SHA)
```

## 5. Land

```bash
git add docs/governance/reports/<brief-stem>.report.md && git commit -m "turn <NN>: report"
bun .claude/hooks/land.ts          # Bash timeout 1800000 ms; it prints LANDED <sha> or names what to fix
```

When it prints `LANDED`, end the turn. When it refuses, fix what it names (a new commit; re-write the
report's commit line if code changed) and land again. When it HOLDS, end the turn.

## Short form — a STOP, a question, a migration

1. Leave the tree green-shaped: typecheck + lint + touched tests green; nothing half-written; commit.
2. Write `docs/governance/reports/<brief-stem>.stop-<n>.md`:
   ```
   MIGRATION — turn <NN> part <X>: <subject>          (or STOP — … / QUESTION — …)
   DONE: parts <letters>, steps <numbers>
   LEFT: parts <letters>
   CI: <first six lines of ci-status.md for the last landed commit, or "not yet run">
   FILES: <git diff --name-only <BASE>, one per line>
   <the apply pairing line, the question, or the conflict with the rule you quote>
   ```
3. `git add` it, `git commit -m "turn <NN>: stop <n> — <subject>"`, `bun .claude/hooks/land.ts`, end the turn.
