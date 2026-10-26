# Foundations — turn 34b-2: STOP before STEP 0 (stop 1)

## 1. Status

STOP before saving the brief. Part A is done; STEP 0 and Parts B–F were not started. No file other than this report changed.

## 2. Part A

- `git rev-parse HEAD`: `c1b6b4e5edada0c66524eed2fd79c7eec6a65fc0` = BASE.
- ci-status.md, first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `c1b6b4e5edada0c66524eed2fd79c7eec6a65fc0` (short `c1b6b4e`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T14:05:56Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40333117660
```

- e2e-last-failure.md: `last E2E run 40333117660 passed`. guards-last-failure.md: `No failed build/guard jobs in this run.` Nothing to fix.

## 3. The conflict

The brief: "If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report."

The rule (project knowledge, AGENTS.md project block), exact words:

> Shell: cards take `CARD_SURFACE` (no 1-px border; state borders on top); one ☰ per width, top-left; md tables use `tbl-md:`.

BLOCK 7 (`src/components/shell/on-demand-notice.tsx`), the notice's surface:

```text
className="pointer-events-auto flex max-w-md items-center gap-3 rounded-md border border-neutral-soft bg-card px-3 py-2 text-sm text-foreground shadow-bar"
```

This is a shell card surface (`bg-card`, rounded, shadowed) drawn with a 1-px `border border-neutral-soft` and its own `rounded-md`/`shadow-bar`, not `CARD_SURFACE` (`src/components/layout/surface.ts:5`: `rounded-card bg-card shadow-card`). The brief requires its bytes exactly (hash `9d24a3a8…`), so I cannot substitute `cn(CARD_SURFACE, …)` without departing from it.

## 4. What a corrected brief would need

BLOCK 7's notice surface built from `CARD_SURFACE` (no 1-px border), with the new hash for `src/components/shell/on-demand-notice.tsx` and the brief's own sha256 and size — or a ruling that a floating notice is not a "card" under this rule.

## 5. Files changed

- docs/governance/reports/foundations-turn-34b-2.stop-1.md (this report)

## 6. Limits

No tests, build read or browser run: nothing else changed.
