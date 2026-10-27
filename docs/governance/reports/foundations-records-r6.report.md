# Turn R6 — Foundations records turn R6: the handover supplement, INC-949–INC-954, block S79 (DEC-277–DEC-280), S457, ACT-021, the speed documents and the owed roadmap lines

Base: e2287d6d03327474e3666789f8dd85d80ed6bba4 · Final commit: 2b0582f · Brief: docs/governance/briefs/foundations-records-r6.md (sha256 c5b77f386641d4e08efa344cd7a3fc549f1b86af235e0dbbd9f4d820581ebeaf)
Review: READY · 0 BLOCKER · 1 MAJOR · 3 MINOR · on 2b0582f

## 1. Done / not done, by part and step

- Part A — done. `git rev-parse HEAD origin/dev` printed `e2287d6d03327474e3666789f8dd85d80ed6bba4` twice, so HEAD = origin/dev = BASE and no `BASE..origin/dev` diff was owed. CI on BASE is SUCCESS (§11), so e2e-last-failure.md and guards-last-failure.md were not read, as the brief says.
- STEP 0 — done (8434049 `records turn R6: step 0 — brief saved`).
  - The saved brief's `sha256sum` is c5b77f386641d4e08efa344cd7a3fc549f1b86af235e0dbbd9f4d820581ebeaf and its byte count is 91145 (`wc -c`). Both equal the carrying message.
  - roadmap.md line 3 was changed with the editing tool to name foundations-records-r6.md; the rest of the line is unchanged.
- Part B — done (2b0582f), by the applier only (B1, B2 in §5).
- THE CHECKS — all green (§5).
- THE INDEPENDENT REVIEW — done. Its answer: READY · 0 BLOCKER · 1 MAJOR · 3 MINOR · on 2b0582f. See §10.
- THE COMPLETION REPORT — this file.
- The landing — follows this commit.

## 2. Files changed

`git diff --name-only e2287d6d03327474e3666789f8dd85d80ed6bba4` (before this report):

```
docs/_changelog.md
docs/governance/briefs/foundations-records-r6.md
docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
docs/governance/instructions-amendments.md
docs/governance/plans/card-photos-stable-links-study-v1.md
docs/governance/plans/category-pictures-convert-spec-v1.md
docs/governance/plans/edge-caching-study-v1.md
docs/governance/plans/speed-plan-2026-10-25.md
docs/spec/spec-ledger.md
docs/tracking/action-tracker.md
docs/tracking/incidental-findings.md
roadmap.md
```

This report, docs/governance/reports/foundations-records-r6.report.md, is added in its own commit.

`git ls-files` lists all six new files:

```
docs/governance/briefs/foundations-records-r6.md
docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
docs/governance/plans/card-photos-stable-links-study-v1.md
docs/governance/plans/category-pictures-convert-spec-v1.md
docs/governance/plans/edge-caching-study-v1.md
docs/governance/plans/speed-plan-2026-10-25.md
```

No file was deleted: `git diff --name-only --diff-filter=D <BASE>` counts 0.

## 3. Behaviour contract

Nothing changed in the product, the tests or the tooling. `git diff <BASE> --stat -- src e2e scripts supabase .claude .github` is empty. The records changed exactly as the brief's behaviour contract says:

| Record | Before (BASE) | After |
| --- | --- | --- |
| docs/governance/handoffs/, docs/governance/plans/ | — | the supplement and the four speed documents (21423, 5531, 4260, 4073 and 4336 bytes) |
| incidental-findings.md | "Numbering: next free INC-949." | INC-949–INC-954 and INC-930's line come before "Numbering: next free INC-955." (:5392); the watch list is still last |
| spec-ledger.md | ends with "… next free DEC-277, D239, INC-945, S457, ACT-021." | block S79 follows; the file ends with "… next free DEC-281, D239, INC-955, S458, ACT-022." |
| instructions-amendments.md | S456 is the last slip | S457 follows S456 |
| action-tracker.md | — | ACT-021 follows ACT-020 |
| roadmap.md | line 3 names turn 34f-2's brief | line 3 names this brief; INC-930's line records DEC-279; nine new open lines; turns 34f and 34f-2 ticked; R6's own line added |
| docs/_changelog.md | — | the R6 line |

## 4. Censuses

The census for this turn is the supervisor's: the supplement's checklist, and the tracker compared with the roadmap. The executor owed no other grep.

## 5. Tests

**B1, dry run then the real run.** Both printed the same 14 lines, and they equal the brief's expected output. The dry run added "(dry run: nothing written)".

```
FILE docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md (21423 bytes)
FILE docs/governance/plans/speed-plan-2026-10-25.md (5531 bytes)
FILE docs/governance/plans/edge-caching-study-v1.md (4260 bytes)
FILE docs/governance/plans/card-photos-stable-links-study-v1.md (4073 bytes)
FILE docs/governance/plans/category-pictures-convert-spec-v1.md (4336 bytes)
EDIT docs/tracking/incidental-findings.md #1
EDIT docs/spec/spec-ledger.md #1
EDIT docs/governance/instructions-amendments.md #1
EDIT docs/tracking/action-tracker.md #1
EDIT roadmap.md #1
EDIT roadmap.md #2
EDIT roadmap.md #3
EDIT docs/_changelog.md #1
applied 13 block(s) to 11 file(s)
```

Before applying, I checked that no roadmap block touches line 3. Each of the three OLD texts is a list item (`  - [`), not line 3. The reviewer confirmed that no OLD or NEW text contains "The brief in force".

**B2:**

```
5366:## INC-949 — the ad's public document names
5386:## INC-954 — a country code's shape is test
5392:Numbering: next free INC-955.
NUMBERING after this block: next free DEC-281, D239, INC-955, S458, ACT-022.
1
The brief in force: docs/governance/briefs/foundations-records-r6.md (Foundation
```

**THE CHECKS:**

- The hash list printed OK for all ten files:
  - docs/_changelog.md
  - docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
  - docs/governance/instructions-amendments.md
  - docs/governance/plans/card-photos-stable-links-study-v1.md
  - docs/governance/plans/category-pictures-convert-spec-v1.md
  - docs/governance/plans/edge-caching-study-v1.md
  - docs/governance/plans/speed-plan-2026-10-25.md
  - docs/spec/spec-ledger.md
  - docs/tracking/action-tracker.md
  - docs/tracking/incidental-findings.md
- `git diff <BASE> --stat -- src e2e scripts supabase .claude .github`: empty (`wc -l` printed 0).
- `bun run lint`: exit 0, "✖ 39 problems (0 errors, 39 warnings)".
- `bun run typecheck`: exit 0.
- `bun run test:unit`: exit 0, "Test Files 333 passed (333)", "Tests 2018 passed (2018)".
- `bun run i18n:usage`: exit 0. `git status --short` was empty afterwards, so neither map changed.
- `bun run build`: exit 0.
- `bun run format:check`: exit 0, "All matched files use Prettier code style!".

No unit or browser test was added or changed, and none was owed (the brief: no file under src/, e2e/, scripts/ or supabase/ changes). No E2E run was owed, because no spec changed and the brief names no test id. The J-audit does not arise, because nothing under e2e/** changed.

## 6. K2 — siblings that bypass the mechanism

I ran `git grep -c -E '^## INC-9(49|5[0-4]) |^S79 · |^- S457 \(|^- ACT-021 ' e2287d6d03327474e3666789f8dd85d80ed6bba4 -- docs`. It printed nothing (exit 1): at BASE the record held none of these headings, blocks, slips or action lines. No other bypass arises, since the records were applied only through scripts/brief/apply-blocks.sh.

## 7. Allowlists and guards

None. No allowlist changed, and no guard was added or touched (`git diff <BASE> --stat -- scripts` is empty).

## 8. Strings

None, as the brief says (No string). `git diff <BASE> --stat -- src/i18n` is empty, and `bun run i18n:usage` left both maps unchanged.

## 9. Migrations

None. `git diff <BASE> --stat -- supabase` is empty.

## 10. Departures

There is no departure from the brief's steps.

**Platform note.** The `reviewer` subagent was called with `run_in_background: false`, but the platform started it in the background. The turn waited for its answer before writing this report, as the brief says to do in that case.

The waiting itself went wrong twice before it held:

- My first wait matched the text "READY ·" in my own prompt to the reviewer.
- My second check matched the S79 block's quoted review line inside the diff.

Neither was taken as the verdict. The report was written only after the reviewer's own last line (`… · on 2b0582f`) and its hand-back had arrived.

**Review findings for a ruling.** Every finding is in the imported record text, which the brief says is never fixed here ("the record is the supervisor's"). They are listed here unchanged:

- **MAJOR — roadmap.md:562 ticks this turn's own line ("- [x] Records turn R6 …") before it has landed or been judged by CI, and without a final HEAD or a CI result.**
  - The reviewer quotes 00-executor-protocol.md step 2: "the previous turn's line is ticked with its result; the next line(s) the brief dictates are added; nothing else is ticked".
  - It notes that R4 and R5 added their own lines unticked (R5 unticked in 4e55aa8, ticked in 74efae6).
  - The brief's EDIT roadmap.md #3 dictated the tick, and the applier wrote it verbatim.
- **MINOR — roadmap.md:521 (turn 34c-4) keeps the old either/or sentence after recording (b), DEC-279.** The sentence is "And INC-930: … the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell."
- **MINOR — action-tracker.md:96 places ACT-021 (2026-10-27) before the ACT-018 and ACT-009 status lines dated 2026-10-13 and 2026-10-14 (:98–:105).** This is "after ACT-020" as the brief says, but it breaks the file's date order for a reader of its tail.
- **MINOR — INC-952 (incidental-findings.md:5380) and the supplement §3 N4 (handover-supplement.md:50) cite `src/server/ai/gateway.ts :400–:418`.** At BASE the `recordAiCall` call is at :390 and ends near :406; :407–:418 is the `TranslationLanguages` type. The audit.ts :16–:34 anchor is accurate.

There were no STOPs and no rulings in this turn.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read at Part A:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e2287d6d03327474e3666789f8dd85d80ed6bba4` (short `e2287d6`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T20:23:49Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40574354034
```

The two-step check passes: the conclusion is SUCCESS, and the reported commit equals BASE = origin/dev at Part A. This landing's run has not completed. The supervisor reads it.

## 12. Limits

- No browser test was run. None was owed, since no spec or product file changed. CI on the landing is the full proof.
- The reviewer could not compare the brief's sha256 with the carrying message. The executor did that comparison at STEP 0 (§1).
- I read none of this landing's CI logs, because the run had not started when this report was written.
