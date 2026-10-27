# Turn R4 — records turn R4: the block applier's fixes, the slips S379–S454, INC-938–INC-940, the owed roadmap lines

Base: b70505f5427e11de86b9eb552a41a28b4149b655 · Final commit: 851a4f8 · Brief: docs/governance/briefs/foundations-records-r4.md (sha256 b6807450be95dbdd600d2cf22b67cf6a155600aa89214be224aaadc25306f1d4)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 851a4f8

## 1. Done / not done, by part and step

- Part A — done. `git rev-parse HEAD origin/dev`: both `b70505f5427e11de86b9eb552a41a28b4149b655` (= BASE, so there was no BASE..origin/dev diff). CI on BASE: SUCCESS (§11), so the failure files were not read.
- STEP 0 — done (68a9aef). The saved brief's sha256 is `b6807450be95dbdd600d2cf22b67cf6a155600aa89214be224aaadc25306f1d4` and it is 96900 bytes; both equal the carrying message. Roadmap line 3 now names foundations-records-r4.md; the text after "— G41)" is unchanged.
- Part B — done (06952cf):
  - B1: R3's applier applied the test, and the run was red (§5).
  - B2: the fixed applier was applied over the old one, and the run was green (§5).
- Part C — done (851a4f8). C1's dry run and real run printed the eight expected lines plus `applied 8 block(s) to 6 file(s)`. Before applying, I checked the roadmap blocks: `grep -c "brief in force"` over them gives 0, so no block touches line 3.
- THE CHECKS — all green (§5).
- THE INDEPENDENT REVIEW — done. The platform started the `reviewer` in the background even though the call asked for the foreground. The turn waited for its answer before writing this report.
- No end-to-end run was owed: nothing under src/ or e2e/ changed.

## 2. Files changed

`git diff --name-only b70505f5427e11de86b9eb552a41a28b4149b655..HEAD` (before this report's commit):

```
docs/_changelog.md
docs/features/brief-applier.md
docs/governance/briefs/foundations-records-r4.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
roadmap.md
scripts/brief/apply-blocks.test.ts
scripts/brief/apply-blocks.ts
```

This report adds `docs/governance/reports/foundations-records-r4.report.md`.

New file: `git ls-files -- docs/governance/briefs/foundations-records-r4.md` prints that path.

## 3. Behaviour contract

Product: none changed. `git diff b70505f5..HEAD --stat -- src e2e supabase` is empty.

`writeAllUnder` (scripts/brief/apply-blocks.ts), BASE → now:

| Case | BASE | Now |
| --- | --- | --- |
| Edited file that exists | renamed over the target with the default mode (a 0755 script became 0644) | staged with the target's mode (`mode & 0o7777`), so a 0755 script stays 0755 |
| Directory at a FILE block's path | raw EISDIR thrown from `renameSync`; earlier files already placed; a staged file left behind | ApplyRefused "staging the files failed, nothing written: <path>: a directory stands at that path"; nothing placed, nothing staged left |
| Rename fails after staging | raw error | ApplyRefused "placing the files failed after k of n (<placed>)": staged files cleared |
| All other cases | — | unchanged; signatures unchanged |

Records:
- **Instructions record:** gains S379–S454 and the "Also logged, not numbered" line after S378.
- **Incident ledger:** gains INC-938, INC-939 and INC-940 before the numbering line, which now reads "Numbering: next free INC-941.". The watch list is still the ledger's last line.
- **Roadmap:**
  - The scenario-suite line is renamed.
  - R3's line is ticked, with its HEAD and run.
  - R4's line is added.
  - Twelve owed lines are added after INC-850's line.
- **Register row 58, the feature doc and the changelog:** each amended by its block.

## 4. Censuses

The census is the supervisor's (K1: the running record, read whole). K2 greps at BASE:

- **Slips:** `git grep -c '^- S379 (\|^- S3[89][0-9] (\|^- S4[0-5][0-9] (' b70505f5… -- docs/governance/instructions-amendments.md` printed nothing (exit 1). No slip in the range is already held.
- **Incidents:** `grep -n '^## INC-93[89] \|^## INC-940 ' docs/tracking/incidental-findings.md` printed nothing (exit 1). None.
- **Roadmap:** `grep -c 'INC-878\|INC-885\|INC-886\|INC-887\|INC-888\|INC-898\|INC-899\|INC-902\|INC-903\|INC-786\|INC-821\|INC-843' roadmap.md` gives 0. None.

## 5. Tests

**B1, red first** (R3's applier with the new test; shown, not committed): `bunx vitest run scripts/brief/apply-blocks.test.ts` gave `Tests  1 failed | 5 passed (6)`. BA-4 failed with `EISDIR: illegal operation on a directory, rename '…/docs/dir.apply-blocks-staged' -> '…/docs/dir'`. The reviewer reproduced this independently. With the directory case removed, BA-4 also fails on the mode alone ("expected 420 to be 493").

**B2:** `bunx vitest run scripts/brief/apply-blocks.test.ts scripts/conformance/wired.test.ts scripts/conformance/non-null.test.ts` gave `Test Files  3 passed (3)` and `Tests  10 passed (10)`.

**C2 output:**

- `grep -c '^- S' docs/governance/instructions-amendments.md`: 124 (BASE 48, +76).

```
110:- S379 (G23; 2026-10-23 13:0xZ) — 
185:- S454 (G16 addendum — an expected
186:- Also logged, not numbered: records
```

```
5316:## INC-938 — the typecheck covers neither s
5324:## INC-940 — AP-36 failed then passed on re
5328:Numbering: next free INC-941.
```

- `sed -n 3p roadmap.md | cut -c1-80`: `The brief in force: docs/governance/briefs/foundations-records-r4.md (Foundation`

**Test ids:** none new. BA-4 and BA-6 were widened by the brief's FILE block: assertions were added, and BA-6's expected array grew. Nothing was loosened.

**THE CHECKS:**
- **Hash list:** `grep -E '^[0-9a-f]{64}  ' <brief> | sha256sum -c` printed 7 × OK.
- **Product paths:** `git diff b70505f5… --stat -- src e2e supabase` is empty.
- **lint:** `✖ 39 problems (0 errors, 39 warnings)`.
- **typecheck:** clean.
- **test:unit:** `Test Files  327 passed (327)`, `Tests  2002 passed (2002)`.
- **i18n:usage:** "1736 keys across 593 files"; neither map moved (`git status` clean).
- **build:** completed.
- **format:check:** "All matched files use Prettier code style!".

**E2E:** none owed (no src/ or e2e/ file changed). No J-audit, because e2e/ did not change.

## 6. K2 — siblings that bypass the mechanism

None. BA-6's census (over src/, e2e/, scripts/ and .claude/; now covering FILE-BEGIN/FILE-END as well) passes: no second parser of block markers exists. The applier's writes stay its one writer, and errors are still read through `errorText`.

## 7. Allowlists and guards

- **Allowlists:** none changed. `git diff --stat b70505f5..HEAD -- 'scripts/conformance/*-allowlist.txt'` is empty.
- **BA-4:** now also proves three cases:
  - a directory at a FILE block's path is refused, with nothing placed and nothing staged;
  - an edited 0755 script stays 0755;
  - (plus the cases it already proved).
- **BA-6:** now also names a planted FILE-block parser (`scripts/files-only.ts`).
- **wired.test.ts and non-null.test.ts:** both pass (B2).

## 8. Strings

None. Nothing under src/ changed, and i18n:usage left both maps unchanged.

## 9. Migrations

None. `git diff --stat -- supabase` is empty.

## 10. Departures

There are no departures in the work: every block was applied by the applier, and the seven hashes match. The reviewer's three MINORs are all in the brief's own hash-pinned text. Per the brief, they are listed here for a ruling and were not fixed:

1. **MINOR 1** — apply-blocks.ts :198–200 together with main :231. When a rename fails partway, the message reads "APPLY REFUSED (nothing written): placing the files failed after k of n (…)". That contradicts itself: files are already placed and are not restored.
   - The `placed` list names absolute paths, not repository paths.
   - The Part B commit title, "places all or nothing", claims more than this branch does. The title was the brief's own.
2. **MINOR 2** — apply-blocks.ts :192–201. The placing-failure branch (refusal, staged files cleared) has no test or positive control. It is close to unreachable after the directory pre-check.
3. **MINOR 3** — the brief contradicts itself in three places:
   - STEP 0 says the roadmap's other lines change "in Part B"; they change in Part C (C1), where they were applied.
   - The behaviour contract says the numbering line "becomes INC-940"; the blocks say INC-941, which is what landed.
   - "REGISTER: none (no mechanism changes)" is stated, yet `EDIT docs/governance/mechanisms.md #1` amends row 58.

   The executor followed the blocks.

There were no STOPs and no rulings in the turn.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `b70505f5427e11de86b9eb552a41a28b4149b655` (short `b70505f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T12:56:20Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40504157476
```

Two-step check: the conclusion is SUCCESS, and the reported commit is BASE, the last landed commit. This landing's run has not completed.

## 12. Limits

- **No browser run:** none was owed, and none was run. CI runs every test on the landing.
- **Supabase server:** the `supabase-prod` MCP server failed to connect this session (HTTP 401). It was not needed, since there is no migration.
- **Typecheck reach:** `bun run typecheck` does not cover scripts/ (INC-938, recorded this turn). The applier's types were checked only by the reviewer's standalone `tsc --strict`. Its only errors are the kit's untyped `Bun` globals.
- **Reviewer:** it ran in the background, as the platform started it. The turn waited for its answer.
