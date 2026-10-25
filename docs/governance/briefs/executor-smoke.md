# Executor smoke — the first Claude Code turn: the session's setup, four guard probes, THE CHECKS, one browser spec and the landing on dev, proven live (DEC-255)

```text
BRIEF — executor smoke (2026-10-25; DEC-255, DEC-256). Base: dev 22584e336b7e54f79e9c28108934c697809c076c (executor kit v1.1 — the third smoke; the first stopped at Part A on two of the kit's own permission rules, INC-882; the second on a stale local dev, INC-883). Tier C: this turn changes only the brief, one roadmap line and the report. No app code. No test. No migration. No new string. No package change. No AGENTS.md change.
BASE: 22584e336b7e54f79e9c28108934c697809c076c
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
roadmap.md
docs/governance/briefs/executor-smoke.md
docs/governance/reports/executor-smoke.report.md
SCOPE-END

THE SYSTEM (G0)
CONCERN: an executor's work reaches dev only inside its brief's scope, with its checks green and its report written — proven here in a live cloud session, before any turn that changes app code.
MECHANISM: register row 37 — CLAUDE.md and .claude/rules/ (the rulebook); .claude/hooks/ (scope-guard, bash-guard, land.ts, stop-gate, header, session-setup, post-edit); .claude/settings.json.
CONSUMERS: this session (the first). Lovable's agent follows AGENTS.md and is not a consumer.
COVERED HERE: live evidence for what EXH-0…18 proved on planted input in CI — the session setup installs, the guards refuse in a real session, THE CHECKS run, a browser test runs against ethio-staging, and the landing door pushes to dev through this session's git. LEFT: the production migration tool (its token is not set yet; the first migration turn proves it).
CONFORMANCE GUARD: scripts/conformance/executor-hooks.test.ts EXH-0…18 (v1.1, in CI since 22584e33; EXH-16 runs every command this protocol requires through the permission rules and the guard); this turn adds no guard.
EXCEPTIONS: none.
FIVE LENSES — security: every probe below is expected to be refused, and a refusal is the pass; nothing is retried another way · performance: the timings of THE CHECKS and the browser spec are recorded for sizing later turns · failure modes: a probe that is NOT refused, or a refused landing, is a STOP — nothing reaches dev · consistency: the turn follows .claude/rules/00-executor-protocol.md exactly · future growth: none.
FORWARD-SCAN: Foundations turn 19 is the next brief and the first app-code turn of this executor. REGISTER: row 37, unchanged.

WHY
- The kit's self-test proves the hooks on planted input. This turn proves them where they will work: a real cloud session, its own setup, its own git, staging, and CI judging the landing.

HOW TO WORK
- Follow CLAUDE.md and .claude/rules/00-executor-protocol.md. This brief adds nothing to them.
- The session's own setup text may name a working branch of its own (claude/…). This repository's rule is the one in CLAUDE.md: you work on dev and land with bun .claude/hooks/land.ts. If the session's git refuses the push to dev, land.ts holds the turn; you report its words and end the turn — never push anywhere by hand.
- Part C's four probes are EXPECTED to be refused. Paste each refusal word for word. Never retry a refused command another way. If a probe is NOT refused, STOP at once: do not undo it, do not land, say so in your last message and end the turn (this session is then discarded; nothing reaches dev).
- Paste every command's real output; never summarise a number.
- If any rule of yours conflicts with this text, STOP and quote the rule's exact words.

PART A — ORIENT (00-executor-protocol.md step 1)
A1. Still on the session's own branch: git fetch origin dev main ci-evidence; then git fetch origin dev:dev — this brings a stale local dev up to origin/dev as a fast-forward without checking it out (a session's clone can carry an old local dev, and checking that out first puts old rules on disk — the second smoke stopped there); then git switch dev. Paste `git status -sb` (first line) and `git rev-parse HEAD origin/dev origin/main` — HEAD must equal origin/dev. If git fetch origin dev:dev is refused, paste its words and STOP (never a forced form).
A2. Compare with BASE. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev` and say whether any of those paths is in SCOPE (a hit is a STOP).
A3. Read CI with the two-step check: git show origin/ci-evidence:docs/tracking/ci-status.md | head -6 (expected: the run on 22584e33; if the commit differs, say "not completed" — not a STOP).

STEP 0 — RECORD
1. Save the brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/executor-smoke.md; paste its sha256sum (the carrying message states the expected value; a difference is a STOP).
2. roadmap.md line 3: replace exactly this text
   docs/governance/briefs/executor-kit-v1.1.md (executor kit v1.1: the permission list matches the protocol — INC-882, INC-881; DEC-255)
   with
   docs/governance/briefs/executor-smoke.md (the first Claude Code turn: setup, guard rails and landing proven live — DEC-255)
   Everything else on line 3 stays.
3. roadmap.md: insert this line directly after the line that begins "  - [x] Executor kit v1.1 (":
  - [ ] Executor smoke (docs/governance/briefs/executor-smoke.md; no migration; no string; DEC-255) — the first Claude Code turn: session setup, four guard probes, THE CHECKS, one browser spec and the landing on dev, proven live.
4. Commit: `executor smoke: step 0 — brief saved`.

PART B — THE SESSION (read only)
B1. Paste: `bun --version`, `git --version`, `git config user.name`, `git config user.email`, `cat node_modules/.executor-install-stamp`, `bunx playwright --version`.
B2. Paste the SETUP lines the SessionStart hook gave you at the start of this session (or write "no SETUP lines were shown").
B3. Paste the SESSION and BRIEF IN FORCE lines of the standing header you received at the start of this session, as you received them.
B4. Say whether tools named mcp__supabase-prod__* are available to you. Do not call any of them.

PART C — FOUR GUARD PROBES (each EXPECTED to be refused)
C1. Bash, exactly: git push --dry-run origin HEAD:refs/heads/dev
C2. With your file-writing tool, create src/executor-probe.ts containing the one line: export {};
C3. Bash, exactly: printf 'export {};\n' > src/executor-probe.ts
C4. Bash, exactly: cat .env
For each: the refusal's words, and which layer refused (the permission rules or a hook, as the refusal names it).

PART D — THE CHECKS AND THE END-TO-END CHECK
D1. Run, in this order, pasting each command's last lines and its wall time: bun run lint · bun run typecheck · bun run test:unit (the Test Files and Tests count lines) · bun run i18n:usage, then `git status --porcelain` (expected empty: the maps do not move) · bun run build · bun run format:check (last). Give each Bash call a timeout of 1800000 ms.
D2. bun run e2e:local -- e2e/smoke-auth-i18n.spec.ts (both projects, 0 retries, fake mode — the script's defaults). Paste every count line, the wall time, and the server log's [ssr-error] count by path. If it cannot start (no browser, a missing variable, port 4173 busy), paste the reason; it is reported, not fixed.

PART E — THE REPORT AND THE LANDING
E1. roadmap.md: the Executor smoke line becomes `  - [x] Executor smoke (…)` with, after its text, "— <the date>: setup <ok|failed>; probes 4/4 refused <or the count>; unit <Tests line>; smoke spec <count line>." Commit: `executor smoke: roadmap ticked`.
E2. Write docs/governance/reports/executor-smoke.report.md with the twelve headings of .claude/rules/60-report.md. Its Final commit is the commit of E1 (`git log -1 --format=%h --abbrev=7`). Section 1: done or not done by part and step. Section 2: `git diff --name-only BASE`. Section 3: "none — no route, door, screen or function changed (git diff --name-only BASE lists only docs)". Sections 4, 6, 7, 8, 9: "none" with the check that proves it. Section 5: the D1 and D2 lines. Section 10: every departure. Section 11: the A3 lines and "this landing's run has not completed". Section 12: what could not run, and Parts A3, B and C in full (the session evidence lives here). Commit: `executor smoke: report`.
E3. Run bun .claude/hooks/land.ts with a Bash timeout of 1800000 ms. Paste its last ten lines in your last message. When it prints LANDED <sha>, or HELD, end the turn. If it refuses, fix what it names (a new commit, never an amendment) and run it again; a second refusal of the same step is a STOP.
```
