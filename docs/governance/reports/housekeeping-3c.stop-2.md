STOP — housekeeping-3c part A: the scripts project reaches `.claude/hooks/lib.ts` by import
DONE: STEP 0, STEP 1 (stop 1); ruling 1 saved (sha256 equal); Part A built but not committed
LEFT: parts A (its `typecheck` line and commit), B, C, D; STEPS 6 → 8
CI: the lane head's run (3090657bf, stop 1's push), root `ci-status.md` on ci-evidence:
# CI Status (auto-generated — do not edit by hand)

- Commit: `3090657bf6fadff1e9fb1b25fbb4a21502681f0c` (short `3090657`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T04:02:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43151625168
FILES: this turn's, `git diff --name-only 611ade039` on the pushed branch:
docs/governance/briefs/housekeeping-3c.md
docs/governance/reports/housekeeping-3c.stop-1.md
docs/governance/reports/housekeeping-3c.stop-2.md (this file)
roadmap.md

One question (end of this file). Ruling 1 Q1 (a) keeps `.claude/` unedited and out of the scripts
project's `include`. But `tsc` follows imports, and two scripts import `.claude/hooks/lib.ts`. So
the project ruling 1 describes cannot be green without one of the choices below, and the choice is
the supervisor's.

## What was found

`bunx tsc --noEmit -p tsconfig.scripts.json` with the project as ruling 1 words it (`extends` the
root, `include` `scripts/**/*.ts`, `playwright.nightly.config.ts`, `vitest.config.ts`; `allowJs`
on, `checkJs` off; no `.claude/`) reports **3 errors**, all in `.claude/hooks/lib.ts`:

```
.claude/hooks/lib.ts(28,22):   error TS2868: Cannot find name 'Bun'.   Bun.stdin.text()
.claude/hooks/lib.ts(1084,16): error TS2868: Cannot find name 'Bun'.   Bun.spawn(cmd, …)
.claude/hooks/lib.ts(1111,13): error TS2868: Cannot find name 'Bun'.   Bun.spawnSync(["git", …])
```

`tsc --explainFiles` names the cause:

```
.claude/hooks/lib.ts
  Imported via "../../.claude/hooks/lib" from file 'scripts/brief/apply-blocks.ts'
  Imported via "../../.claude/hooks/lib" from file 'scripts/conformance/executor-hooks.test.ts'
scripts/brief/apply-blocks.ts
  Imported via "./apply-blocks" from file 'scripts/brief/apply-blocks.test.ts'
```

- `scripts/conformance/executor-hooks.test.ts` :16 → :25 imports the kit's pure parsers
  (`normaliseCommand`, `writeTargets`, `commandSegments`, `programsOf`, `blankInertData`,
  `heredocDelimiter`, `runsOnlyDataPrograms`, `unreadablePrograms`).
- `scripts/brief/apply-blocks.ts` :28 imports `PROJECT_DIR` and `scopeVerdict`.
- Neither calls the three `Bun` sites, but `tsc` checks the whole imported file. `land.ts` is not
  imported by anything, so its six errors (INC-1110) do not arrive.

Correction to my stop-1 report: its census says "Nothing under `.claude/` is reached". That is true
of the root project. Of the scripts project it is wrong: `lib.ts` is reached by these two imports.
My stop-1 measurement counted `lib.ts`'s three errors through the `include` line and did not see
that they also arrive by import, so Q1 did not ask this.

## The rest of Part A, built and green (not committed)

The working tree holds Part A's edits, uncommitted, waiting for the answer. The pushed branch holds
only this stop report on top of stop 1. Measured on this tree:
- `docs/governance/briefs/housekeeping-3c-ruling-1.md`: a scripted copy of the folder's file,
  sha256 14d0f8f19f234772ef66e3df05419a410855c98f963a4a4383ad76e878fa259b, equal to the stated
  value.
- `tsconfig.scripts.json` (new, as above), carrying ruling 1's comment on `.claude/hooks/**`
  (INC-1110).
- `scripts/e2e-failure-report.ts`: every `Bun` use (28 sites) now reads and writes through
  `node:fs` (`existsSync`, `readFileSync`, three helpers `jsonFile`, `textOr`, `writeText`; the last
  makes the folder first, as `Bun.write` does) and `node:child_process` `spawnSync`. The four
  `TS7006` callbacks type with them.
- `scripts/conformance/on-demand-failure.test.ts` :311: `handler !== null` before `isSilent`.
- `package.json`'s `typecheck` line is back at its committed text (`tsc --noEmit`), so the tree's
  `bun run typecheck` stays green while this waits. Part A's line is
  `tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`.
- Root `tsc --noEmit`: exit 0. The scripts project: the 3 errors above, nothing else (2.96 s).
- `bunx vitest run scripts/e2e-failure-report.test.ts scripts/conformance/on-demand-failure.test.ts
  scripts/conformance/executor-hooks.test.ts`: 3 files, 35 tests passed.
- `bunx eslint scripts/e2e-failure-report.ts scripts/conformance/on-demand-failure.test.ts
  --max-warnings 0`: clean (after `prettier --write` on the two files).

Not yet built: CF-TSC-1, and the checks runner's Typecheck step (ruling 1 (e)). Both depend on the
answer.

## QUESTION

How does the scripts project go green while `.claude/hooks/lib.ts` stays unedited (ruling 1 Q1 (a))?

- (a) Recommended. The project's `exclude` names exactly the three files that bring the kit in:
  `scripts/conformance/executor-hooks.test.ts` (1,049 lines), `scripts/brief/apply-blocks.ts`
  (241) and `scripts/brief/apply-blocks.test.ts` (295, which imports `apply-blocks.ts`). This is
  ruling 1's exception widened to what it reaches, with the same expiry: the comment says they join
  with `.claude/hooks/**` at rules turn 4 (INC-1110). CF-TSC-1 holds the `exclude` list to exactly
  those three, and fails when one of them no longer imports `.claude/hooks/` (a stale line) or a
  fourth file appears. Measured with a probe config (deleted): **0 errors**. The cost is 1,585
  lines of scripts left untypechecked until rules turn 4. The brief says "never an exclude"; ruling
  1 already made `.claude/` a recorded exception, and this is that exception's reach.
- (b) Rules turn 4's three `lib.ts` changes (ruling 1 (b)) land before 3c's Part A, or this ruling
  names `.claude/hooks/lib.ts` :28, :1084, :1111 for this turn. Either is a rule-00 matter (S586,
  S588), which ruling 1 has already answered once.
- (c) A hand-written ambient declaration of the three `Bun` members `lib.ts` uses (e.g.
  `scripts/types/bun-hooks.d.ts`). I advise against it: it is the class this turn exists to close
  (a hand declaration that can drift from the real one, as `start-failure-excerpt.d.mts` did in
  turn 3b), and every script could then call `Bun.spawn` again with nothing to stop it.
- (d) The Bun types as a package: a package change is its own turn (G42) and this turn carries
  `no-package-change`.

With (a), Part A lands as ruling 1 says, plus the `exclude` line and CF-TSC-1's check of it, and
Parts B → D follow unchanged.
