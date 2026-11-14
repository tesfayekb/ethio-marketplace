# Handoff — 2026-11-13, the housekeeping lane, the Safari picture fix, the speed, app-fixes and CI turns landed; the findings rule; records turn R14

Written by the supervisor at records turn R14. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev = main `50ee2e698` before this records turn (the merge of pull request #40, the CI turn).
- The published site is `4dd6cad55` (the operator's Publish of 2026-11-13 after pull request #39); pull request #40 changed no app code, so no Publish is owed.
- No migration landed since records turn R13: ethio-prod and ethio-staging both stand at mark `20261109110000`.
- No lane is open. Pull request #21 (`cursor/f2-forms-plan`) stays open until the form kit's first turn has copied its plan record.

## 2. What closed since the last handoff

Block S89 of docs/spec/spec-ledger.md, turn by turn: the Cursor rules turn 3 (#33), the housekeeping lane in seven turns (#34), housekeeping turn 4 (#35), the photo investigation (#36), the pictures turn (#37), the speed turn (#38), the app-fixes turn (#39), the CI turn (#40). Each turn's report is in docs/governance/reports/, its task file and rulings in docs/governance/briefs/.

## 3. Decisions to know first

- DEC-379 — findings never make a detour: a finding is attached by its class to the scheduled turn that owns the mechanism, or joins the before-launch list (roadmap); only a security hole, a data loss or a block on the turn in flight interrupts.
- DEC-373 — view-as v2 (staff start, the person is told afterwards, no writes, messages shown and logged through one door), in the Ops phase before launch; a new Terms version first.
- DEC-374, DEC-375, DEC-378 — the executor's gate, the proven code tree, two workers on the split lanes. Judges still counting: DEC-374 (2 of 5), DEC-375 b (1 of 5), DEC-378 a (1 of 5 full runs).
- DEC-377 — PROPOSED: Lovable returns for work that is not complex, on its own branch with a pull request; awaits the operator's yes. Knowledge v3.13 is owed before its first turn.
- DEC-372 — only staff load and run the view-as check; ADOPTED.

## 4. The order of work

1. The form kit — Foundations 2, wave 1 (Fable 5.1 High; the plan on `cursor/f2-forms-plan`). It builds the one refusal reader, the first class of INC-1147.
2. The doors — F1-2 → F1-7 with F1-5a (the dials, the anonymous doors' gate).
3. The scheduled lists of the roadmap and the supervisor's tracker; the operator's UI redesign before Stage 2 (he brings the direction; INC-1146 rides it).
The before-launch list (roadmap) holds the findings no scheduled turn owns, grouped by class.

## 5. Owed

- By the supervisor: instructions v1.18 (the in-force lines dated after 2026-11-09, the correctives of S567 → S610); Knowledge v3.13; the reads of DEC-365's count, DEC-370's alerts and DEC-371's ten runs at the next records turn; the register pass that rewrites the cells this turn's amendment lines name.
- By the operator: yes or no on DEC-377's branch flow; the direction of his UI redesign; the launch reminders of the project memory.

## 6. How CI reads now

- A lane's evidence is under `docs/tracking/branches/<ref>/` on branch ci-evidence; the root files are dev's.
- A full run: about 15 minutes (895 s measured). A run on a proven code tree (a report push, a merge of a proven lane): about 7 minutes, no browser lane.
- The serial lane runs the `@a11y` and `@global-state` tests on every push; a test that writes a shared-value table carries the tag or an allowlist line (CF-LANES-4).
