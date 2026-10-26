# Foundations turn K1, ruling 3 — STOP before STEP 0

## Status and starting point

STOP before saving or applying the brief, as HOW TO WORK requires when a platform rule conflicts. Starting HEAD matches BASE:

```text
7e9206e61ae807be3480d78f229f83538e23e0d6
```

Initial `git status --short` was empty. No stateful git command was run.

## Conflict

The platform rule's exact words:

> Never use TypeScript non-null assertions (`!`) — narrow with an early-return guard or optional chaining instead. Sole exception: `process.env['X']!` reads inside server handlers.

The uploaded brief's R2, `EDIT .claude/hooks/lib.ts #5`, introduces three non-null assertions:

```typescript
const c = cmd[i]!;
while (k < n && !/[\s;&|<>]/.test(cmd[k]!)) k += 1;
const { delim, inert } = pending.shift()!;
```

None is the permitted server-handler environment read. The upload displays these at lines 182, 216 and 227. The brief also requires exact blocks and exact final hashes; substituting guards would depart from its prescribed bytes. No alternative implementation or changed expectation was applied.

## Done and not done by step

- Done: read the entire uploaded ruling; read AGENTS.md and docs/conventions.md; verified BASE and read the first six CI evidence lines; documented the conflict.
- STEP 0: not done. The brief was not saved, and roadmap.md was not changed.
- R1, R2, hash checks, lint, unit checks and independent code review: not done because STOP precedes saving and implementation.
- Completion report: this STOP report only. No code, test, package, string, migration or AGENTS.md changes.

## CI evidence

First six readable lines; this is not evidence for BASE or this turn's final commit:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `bb4a1ebb2d0b77becb84805947fec9967da21bef` (short `bb4a1eb`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T11:13:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40309910746
```

## Scope, departures and limits

Only `docs/governance/reports/foundations-turn-k1-r3.report.md` was added. No files under .claude/ were read or changed. The three conflicting statements were read from the uploaded brief, not from executor files. No scheduler or service command was executed. No manual build or typecheck was run. No before/after behavior, red-first result, implementation hash or reviewer verdict is claimed.

The required conflict STOP is the sole departure from the execution sequence. A corrected exact block and its updated hashes are needed before implementation can proceed.