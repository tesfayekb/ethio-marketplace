# Turn S6-2 — one select (the task, the supervisor's ruling on the S6 plan, and the plan's S6-2 sections)

```text
Task: sage-s6-2-select. Base: dev a0461df3. Build S6-2 of your approved S6 plan (docs/governance/briefs/sage-s6-1-dialog-look.md holds the plan and the rulings; the S6-1 report, docs/governance/reports/sage-s6-1-dialog-look.report.md, holds what landed). No plan round: the plan is approved; a census hit the plan did not anticipate is still a STOP.

THE TURN (ruling 1 of the plan): one select.
- The 42 hand-drawn `<select>` elements in the 20 consumer files move onto NativeSelect; SELECT_CLASS (category-form-fields.tsx) is retired; the posting steps' selects keep the form kit's look (ruling 2 of the plan: the field look is for dialogs, sheets and the filter panel only — NativeSelect's closed control reads DIALOG_FIELD only inside a panel, as S6-1 built it).
- CF-LIST-1 gains the rule: a `<select>` outside native-select.tsx fails (planted); the 21 "until SAGE-S6" lines leave choice-lists-allowlist.txt.
- The posting wizard's selects carry the form kit's refusal states (aria-invalid, aria-describedby, the shared gate): every one keeps them through NativeSelect; a unit test per wizard step that has a select proves the refusal still reaches it.
- S6-1's MINOR: the `as unknown as` at category-dialogs.tsx:681 goes (your report's two options; take the one that needs no migration).

TESTS: the unit tests per consumer; e2e: every spec that drives a moved select (your G38 list for S6-2), run whole, both projects, retries 0; the laws; THE CHECKS; THE SELF-REVIEW; THE REPORT; the pull request's CI green.

SCOPE (by area): src/components/ui/native-select.tsx and its tests; the 20 consumer files and their tests; src/features/posting/ (the steps with selects, field.tsx untouched unless the census says otherwise — then STOP); category-form-fields.tsx; scripts/conformance/ (choice-lists.test.ts, its allowlist); e2e/ (the G38 specs); docs/features/design-foundation.md, docs/governance/mechanisms.md (row 84's note), docs/_changelog.md, roadmap.md, the brief and the report. AGENTS.md is not in scope.

Growth: each consumer's page measured on the base and on your tree; DEC-296's form for any ceiling crossed, with its cause.

---- THE SUPERVISOR'S RULING ON THE S6 PLAN (as saved in docs/governance/briefs/sage-s6-1-dialog-look.md) ----

RULING on your S6 plan. Base: dev 04fee757. The plan is approved as written, with the answers below. Build S6-1 now (stem sage-s6-1-dialog-look, branch cursor/sage-s6-1-dialog-look); S6-2, S6-3 and S6-4 follow as their own tasks after S6-1 is merged.

Open points:
1. 71fec9ff is the S6 plan; the brief's 836d1030 was my error. Checked against 71fec9ff, as you did.
2. Field look: inside dialogs, sheets and the filter panel only, through the `in-data-[dialog-panel]:` variant; the posting form keeps the form kit's look. NativeSelect stays the only file that draws a `<select>`.
12. Four turns, one pull request each. Stems: sage-s6-1-dialog-look, sage-s6-2-select, sage-s6-3-popover, sage-s6-4-screens. Each saves its own brief (this ruling plus your plan's section for that turn, in one fenced block, with `Base: dev <sha>` on its first line) and names it on roadmap line 3.

(Open points 3–11 and 13 and the K2 filings bind S6-1; the full ruling is saved in sage-s6-1-dialog-look.md.)

---- THE PLAN'S S6-2 SECTIONS (the executor's plan of 2026-10-31, approved above) ----

### Native selects (ruling 1)

- There are 42 `<select>` elements in the 20 consumer files allowlisted for S6 (the 21st line is `native-select.tsx` itself).
- `SELECT_CLASS` (`category-form-fields.tsx:33`) is a second version of the select look, used by 9 files.
- The posting steps style their selects with the form kit's `controlClass` (`field.tsx:133`), or with local `fieldClass` constants in `step-where.tsx` and `step-who.tsx`.

- **CF-LIST-1 (ruling 1).** A `<select>` outside `native-select.tsx` fails. The 21 lines leave the allowlist.

2. **S6-2, one select** (ruling 1): the 42 selects in 20 files move onto `NativeSelect`, `SELECT_CLASS` is retired, and the select rule lands in CF-LIST-1. It is split out because the posting wizard's selects carry the form kit's refusal states, which are a separate risk.

The G38 list (the S6-2 part): `choice-lists.test.ts` (the select rule); `admin-tables.test.ts` T2b (re-run); the `post-wizard-specs`, `-category`, `-details`, `-pricing`, `-place` and `-where` specs; the specs that drive a moved select (the full list goes in each turn's census).
```
