# Handoff — 2026-11-25, Foundations 1's doors done, account security, the failure notice; records turn R18

Written by the supervisor at records turn R18. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev = main `3123c75e4` when the package was built (the merge of pull request #106, Lovable bundle 10b); the published site is `3123c75e4` (the operator's Publish of 2026-11-25 14:06 New York).
- Migrations of block S93: F1-7a ten files, F1-7b eight, F1-7c four, Cursor bundle 1 one, Cursor bundle 2 five, Cursor bundle 4 two, Cursor bundle 5 one, Cursor bundle 6 three — every one on ethio-staging and ethio-prod and read back by the supervisor. Both databases stand at mark `20261125010000`.
- Cursor bundle 7a: five files (marks `20261125170000` → `20261125170400`) applied on ethio-staging by the operator's paste and read back on 2026-11-25 17:36Z; they reach ethio-prod after the re-landed pull request merges, from dev's links in one sitting, with the Publish in the same sitting (ruling 1, decision 2).
- Open lanes: `cursor/bundle-7a-2` (#107, the re-land of #105; rulings 3 and 4). This records turn ran beside it on disjoint files: roadmap line 3 still names the brief that line held before it (the lane's merge writes `cursor-bundle-7a.md` there). `lovable/next` is the standing Lovable branch (DEC-416); `cursor/bundle-7a` stays until the operator closes #105.

## 2. What closed since the last handoff

Block S93 of docs/spec/spec-ledger.md lists every pull request from #73 to #106 with its merge commit. In short:
- records turn R17 (#73);
- F1-7a, F1-7b, F1-7c, F1-7d (#75, #79, #81, #85): every browser-callable function is a door on the shell, a reader on the gate, a named helper or closed; sign-out on this device only (DEC-411);
- Lovable's single turns L15 → L22c (#74, #76, #77, #78, #80, #82, #84, #86, #88, #89);
- the tests and CI turn 2 (#87);
- bundles from 2026-11-21 (DEC-414): Lovable bundles 1 → 8 (#90, #93, #95, #97, #98, #99, #101, #102), Lovable bundle 9 (the user-facing census, plan mode only), Lovable bundles 10a and 10a-2 (#104) and 10b (#106); Cursor bundles 1 → 6 (#91, #92, #94, #96, #100, #103).

## 3. Decisions to know first

- DEC-414 — bundles; Cursor for database, sign-in and CI only (plan Opus 5.5, build Sonnet 5.5); records weekly; no new instructions version before launch unless the operator asks.
- DEC-410, DEC-416 — Lovable is the default executor and works on `lovable/next`.
- DEC-432 — the records turn runs in Lovable from the supervisor's package.
- DEC-459 — everything user-facing is tested (360, 768, 1280; every control and every response on a written list).
- DEC-464 — a fix removes the reason for a failure; a failure that can still happen names its reason and one working next step.
- DEC-466, DEC-473 — `manage` is one permission; category import stays super-admin only (Cursor bundle 7a).
- DEC-434, DEC-438, DEC-461, DEC-465 — the staff session rule (a second factor used in the session).
- DEC-440 → DEC-458 — the Stage 2 spec approved (`docs/governance/stage2-spec.md`).
- DEC-460 — listing search is its own feature, spec first. DEC-463 — the footer pages are before-launch work. DEC-474 — our own field-error reporter and an admin Errors page.

## 4. Owed and open

- The operator: close #105 unmerged once #107 is green; then merge it, apply its five files on ethio-prod from dev's links and Publish in the same sitting (admin loses category import; the unasked `manage` rows leave the Roles console).
- Cursor bundle 7b, then Lovable 10b part 2 (INC-1281), then Cursor bundle 8, then the Errors page, then Stage 2.
- Records debts: the Knowledge mirror (v3.14 in the repository, v3.15 live); INC-564 → INC-567's defect text; INC-1284's text when its fix is live; INC-1186 and INC-1168 (c) when DEC-413's carry step is built.
- Expiry: picomatch's audit exception ends 2026-12-02 (DEC-405, INC-1194).
- Frozen judges running: DEC-472 (the advisors step: ten smoke runs, at most 60 s, no finding the hosted advisor lacks), DEC-415 (the serial pass inside its deadline), DEC-462 (the install cache only if INFRA-red twice in 7 days), DEC-393.

## 5. Gaps in the record

- The running record of 2026-11-19 → 2026-11-21 was not saved (S790): INC-1225 and DEC-421 are "not defined in the record"; S672 → S704 are recorded where a brief, ruling or report names them, and as gaps otherwise.
