# Handoff 2026-10-05 — open items master list (ethio.com)

What this is: the deduplicated list of everything open, in flight, queued, planned, promised, parked, deferred, awaiting the operator, or decided and not built at the close of bundle 4, with the state of the repository, the databases, the published site and the catalogue as it stood at the compile (the "State described" line below); since that compile the CI run 37268978090 on `48d3c53b` was SUCCESS and promoted main (completed 2026-10-05T06:04:07Z), which closes items [1.1], [1.5], [4.61], [4.62], [10.1] and [10.16] below and closes bundle 4 — the rest stands.
Compiled: 2026-10-05, about 05:50 UTC (01:50 America/New_York), against the repository at dev `48d3c53b` and the `ci-evidence` branch at `a06ea55e`.
By whom: the supervisor thread's compile of 2026-10-05; sources are tagged per item (the tag key is in "How to read this file").

---

# OPEN ITEMS — MASTER LIST (ethio.com, handover copy)

State described: the small hours of 2026-10-05, America/New_York (about 01:50 local = 05:50 UTC), carried to the supervisor's last notes entry (stamped 2026-10-05 05:45 UTC), to the supervisor-written records for INC-432 to INC-437 and DEC-131 (`package/drafts/inc-432-437-and-dec-131.md`, written 05:41 UTC), and to a repository read at 2026-10-05 05:46–05:53 UTC. Repository `tesfayekb/ethio-marketplace`: dev `48d3c53b` (bundle 4 turn 12, "Fixed CT-19 constant row refs", pushed 05:42:29Z; CI on it is not yet reported on the `ci-evidence` branch, whose newest report is run 37264070069 on `70e16ea5`, FAILURE); main `24d401f5` (the last promoted commit — the fix of the turn 9b red; the full runs on `a17b227c` (turn 10, run 37256219728) and `70e16ea5` (turn 11, run 37264070069) were each red on ONE browser test and did not promote, so main trails dev by turns 10, 11 and 12). Published site (`https://ethio-market-dawn.lovable.app`): the turn 11 build, `70e16ea5`, published by the operator at about 05:45Z (turn 10, `a17b227c`, was published at about 03:35Z). Migrations: M5 (`923dd4cb`, mark `20261004090000`; healer M5b `02084273`, mark `20261004160000`), M6 (`20261004212627_e44f20e5`, mark `20261005100000`) and M7 (`20261005021121_9347e038`, mark `20261005040000`) on ethio-prod and ethio-staging; M7's mark is LOWER than M6's (INC-433), so `max(version)` on either database still reads `20261005100000`. Catalogue live: 169 categories · 563 definitions · 1,488 link rows (C29 and c29b imported on ethio-prod 2026-10-05 ~03:35Z; the curator's C30 plan would end at 169 · 569 · 1,500). Highest numbers used: DEC-131 (written in the records file; the price table), INC-437 (next free INC-438), supervisor slips S86 to S92 (proposed numbering in the records file for seven unnumbered slips; next S93), D-ruling D72, tests PW-160 · PR-25 · AT-69 · CT-35 · LT-15 · TR-35.

This file lists everything that is open, in flight, queued, planned, promised, parked, deferred, awaiting the operator, or decided and not built. It is deduplicated: an item appears once, in the section where it will be acted on, and other sections point to it by its bracketed id. Nothing here is a decision of this compiler; every line restates a source. Where a source does not say whether an item is still open, the item is kept and the unknown is named. Items closed since the previous compile are kept under their old id with "(closed)" and a pointer to section 12, so the ids other sections cite still resolve.

## How to read this file

Who is who. The operator is the human owner; every product decision is his. The supervisor is the AI thread that writes specs and prompts, verifies results and keeps the records; it never edits the repository. The executor is the AI coding agent (the "Lovable" platform); it is the only writer to the repository and the production database, and it works from prompts the operator pastes. The curator is a separate AI project that writes the catalogue files (categories, questions, answer lists) which the operator imports through the admin console.

Words used below.
- dev / main: the working branch and the certified branch. main moves only when a full CI run on dev is green ("promoted", a fast-forward by the CI job itself).
- CI: the automated checks that run on every push. Its results are read on the branch `ci-evidence` (`docs/tracking/ci-status.md`, `e2e-last-failure.md`, `guards-last-failure.md`, `flake-ledger.md`, `nightly-status.md`, `nightly-last-failure.md`), through the raw GitHub addresses `https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/<file>` — the executor's own remote is a mirror that does not carry that branch, and the copies of these files on dev are frozen.
- ethio-prod / ethio-staging: the production database and the test database. The executor's tool applies a NEW migration file on prod the moment the file is saved; the operator applies it on staging by hand and reports the "mark" (the migration's ledger row in `public.migration_marks`). The executor's tool cannot apply an EXISTING file (M6 was pasted by the operator).
- Publish: the operator's button on the executor platform that puts the built app (the dev tree) on the public address `https://ethio-market-dawn.lovable.app`. The domain ethio.com still serves the OLD site.
- walk: the operator's own check of the published site against a short numbered list the supervisor writes.
- bundle / turn / brief: a bundle is one large piece of executor work described by one brief saved in the repository (`docs/governance/briefs/`); a turn is one executor session inside it, ended so that CI runs on its last commit.
- door: a database function that is the only way to write something; "the judge" is the door `validate_listing_draft`.
- the wizard: the eight-step posting form (category → specifications → photos → price → title and description → place → contact → review).
- a fact / a tick list / a condition: catalogue words. An option's "facts" are answers it settles on other questions; a "tick list" is a multi-choice question (`multi_select`); a "condition" (`visible_when`) shows a question only when another answer matches.
- Numbers: INC-### a defect; DEC-### a decision; D## an operator product ruling of the posting era; ACT-… a tracked action; REQ-### a requirement and Q-### an open question in `docs/spec/spec-ledger.md`; S## a logged supervisor slip; G## a rule of the supervisor instructions; PW-/PR-/AT-/CT-/LS-/LT-/LR-/TR-/AU-/IG-/CI-/CO-/PP-/A11Y- ids of browser tests; M1…M7 the migrations of bundles 3 and 4; C27/C28/C29/C30 the curator's cycles; "batch n" a curator delivery inside C27.
- ESTIMATE marks a number that was not computed from data.

Source tags (in square brackets at the end of each item).
- [A3] [A6] [A1] [A2] = `records-A.md` PART 3 / 6 / 1 / 2; likewise [B…], [C…], [D1-…], [D2-…] for `records-B.md`, `records-C.md`, `records-D1.md`, `records-D2.md`.
- [SW-0836] … [SW-1331] = section 6 of `handover/sweep-<first turn>-….md`; [SW-SUPP] = `sweep-supplement-gaps.md`; [SW-1106 §1] etc. = that sweep's section 1.
- [N <stamp>] = the supervisor's running notes `bundle3_draft.md`, entry with that UTC stamp (the stamps are approximate; several are a few minutes off the commits they describe).
- [INC-REC] = `package/drafts/inc-432-437-and-dec-131.md` (the supervisor's own record text for DEC-131, INC-432 to INC-437 and slips S86 to S92).
- [CUR x.y] = `curator-record.md` section; [RD P2-nnn] / [RD 7.x] = `rules-and-directives.md` item; [PKG specs/<file>] = a verbatim extraction in `package/drafts/specs/`.
- [9b] = `turn9b-prompt.txt`; [T10] = `turn10-prompt.txt`; [T11] = `turn11-prompt.txt`; [T12] = `turn12-prompt.txt`; [C29] = `c29-curator-prompt.txt`; [C30] = `c30-curator-prompt.txt`; [WALK] = `walk-bundle4-c29.md` (the six-line import-and-walk list of 2026-10-05).
- [REPO path:line] = the repository at `48d3c53b` (dev), read while compiling; where an item was checked at an earlier head and nothing in the later commits touches it, the earlier head is named; [CI-EV] = the `ci-evidence` branch at `a06ea55e`.
- [LIVE] = the account's scheduled-task list, read while compiling (2026-10-05 05:50Z).
Dates are the operator's local date unless marked Z (UTC). The repository and commits use UTC, so an evening event can carry the next day's date there.

---

## 1. IN FLIGHT RIGHT NOW

Context for whoever picks this up: the operator wrote on 2026-10-05 (about 01:40Z) that "your work is taking too long"; the supervisor's replies since are kept to two lines, and every long prompt goes to the operator as a file (any prompt carrying Amharic is built by script from a vetted file and never retyped — one inline retyping corrupted a character). Helper agents that compile records run in the foreground and are killed by any incoming message; the operator was asked to keep the chat quiet during compile windows. [N 10-05 01:15Z, 01:20Z, 01:40Z] [SW-SUPP]

**[1.1] EXECUTOR — bundle 4 turn 12 (INC-437, the CT-19 class fix) is pushed to dev and waits for CI and for the supervisor's verification.** Turn 12 is a tests-only turn, Tier B: the browser test CT-19 (`e2e/admin-categories-lifecycle.spec.ts`, "a create and a rename commit through the doors and undo") wrote the file row of its scratch root category with the constant `display_order "2000000"` and asserted the import preview's totals (`adds 1, changes 1`); a parallel test's import renumbered the root, the planner counted `changes 2`, and the run on `70e16ea5` went red (run 37264070069, mobile-360, shard 1; CT-19's third flake line after 2026-09-23 and 2026-09-28). The prompt (`turn12-prompt.txt`) orders: build the row from the root's CURRENT stored cells read through the service client right before the file is built (CT-19 and the same literal at lines 876 and 953); assert the test's own rows' planned actions, not the file's totals, wherever the plan payload names rows; a class rule in the file header; the spec run alone three times at 2 workers and 0 retries; typecheck, lint, format; one changelog line and a roadmap tick; end the turn so CI runs, no further push. State in the repository: commit `48d3c53b` ("Fixed CT-19 constant row refs", 05:42:29Z) changes exactly three files — the spec (+27/−9; the class rule is in the header at lines 37–38; the stored-cell read at line 893 and the own-rows assertion at line 911 carry "INC-437"), `docs/_changelog.md` (one line) and `roadmap.md` (the tick "INC-437 CT-19 stored-cell file rows"). The executor's completion report is not in the notes; CI on `48d3c53b` is not yet reported (ESTIMATE: a full run takes 20–25 minutes, so the verdict is due at about 06:05Z). Owner: executor (report), supervisor (verify by diff `70e16ea5..48d3c53b` and by `ci-status.md` for `48d3c53b`; disposition), CI (a green run promotes main to `48d3c53b` by itself). Exact next step: read `ci-status.md` on `ci-evidence`; if it names `48d3c53b` SUCCESS, the board is green and [2.3] follows; if red, the fix-first rule applies (a red board is never left standing). Numbers: INC-437; run 37264070069; CT-19. [T12] [INC-REC] [N 10-05 05:30Z, 05:45Z] [REPO e2e/admin-categories-lifecycle.spec.ts:37–38, 893, 911; docs/_changelog.md:677; roadmap.md:68] [CI-EV ci-status.md (70e16ea5 FAILURE), e2e-last-failure.md run 37264070069]

**[1.2] SUPERVISOR — INC-433 is registered in the records file; its heal rides the next migration.** M7's declared mark (`20261005040000`, chosen by the brief's rule "now UTC rounded up to the next hour plus one hour") is lower than M6's (`20261005100000`, chosen about 11 hours ahead of that rule), so the ledger's `max(version)` no longer names the newest applied file and the operator's read-back convention "expect mark … checked with max" fails. Parity is unaffected (the preflight compares the SET of declared marks per file with the ledger: `scripts/e2e-migration-preflight.ts:117 missingAgainstLedger`). Fix, as recorded: the next migration heals M7's mark upward with the UPDATE form the preflight understands (`UPDATE public.migration_marks SET version = '<new>' WHERE version = '20261005040000'`, the DEC-022 healer law in the preflight's comment at lines 76–80); the mark rule in every brief gains "and above the ledger's current newest mark" (brief, `AGENTS.md`, Knowledge, `scripts/check-migrations.sh` whose comment at lines 322–323 promises monotonic marks); a read-back asks for the specific mark, never max. Which migration is "next" is stated two ways: the records file says "the engine batch", the earlier notes said L1's first migration — whichever lands first. Low. Owner: supervisor (rule into the records turn and the next brief), executor (the migration). Numbers: INC-433 (OPEN). [INC-REC] [N 10-05 02:20Z] [REPO scripts/e2e-migration-preflight.ts:76–80, 117; scripts/check-migrations.sh:322–323]

**[1.3] CURATOR — C30 (the redesign of the Cooked Food leaf) is ruled; the curator is building its rows on fresh exports; the audit and the import belong to the next thread.** Background: C29 (the catering rows) was imported on ethio-prod at about 03:35Z (see [12.3]); the operator walked the new leaf the same hour and ruled a redesign of its classification, in his own words saved in `c30-curator-prompt.txt` (Food Type = fasting / non-fasting / mixed with fish set apart and the butter distinction; dishes grouped starters / mains / desserts; agelgil as a unit of sale with weight or persons served; a minimum-order row 1–1,000 persons; pickup means no "delivery included" line and no international shipping; the two category names containing "Event" confuse; "Doro Wot → Doro Wot is duplication"). The curator's plan (`e931c366-c30-cooked-food-plan-2026-10-05.md`, received about 05:45Z): Food Type = Fasting Food / Non-fasting Food / Fasting & Non-fasting Food; six dish rows (Starters & Finger Food, Fasting Dishes, Non-fasting Dishes, Includes Fish yes/no, Served With, Desserts; butter pairs Shiro / Shiro with Butter, Gomen / Gomen Kitfo, Firfir / Firfir with Meat); a `Per Agelgil` unit (Serves on card 3 required, Net Weight optional); `term_min_order_people` 1–1,000 on the price page for agelgil / package / tray / Other; an own Pickup & Shipping row scoped `pickup|local_delivery`; Delivery Included shown when `local_delivery` is ticked (a condition that reads a tick list — its first use; the supervisor checked the engine: `attr_visible_when_met` reads array answers through `attr_answer_tokens`, the link-cell refusal has no sibling-type rule, the screen's `pairMet` handles arrays); Events & Catering takes the six dish rows; two name proposals (1: rename `event-venues` → "Hall & Venue Rental" / «የአዳራሽ ኪራይ»; 2: rename both); a five-file import path; end state 169 · 569 · 1,500; the built title becomes the diet alone. Operator rulings (2026-10-05 01:40 local, put to him paste-ready with the supervisor's recommendations): plan yes (title = diet alone accepted); name proposal 1; type names A; tick-list conditions allowed. The curator's own calls were accepted under G17. Rows follow on fresh exports (categories, definitions, links) the operator attaches. The leaf has no live ads, so C29 rows may be deleted or renamed. Owner: curator (rows), operator (exports; forwards the files), the thread that is live when they arrive (audit script on the model of `audit_c29.py`, then the import steps, then a short walk). Waits on: the delivery. Numbers: C30; INC-434 (the list-fact prefill the plan relies on — fixed and published, see [12.11]). [C30] [N 10-05 03:35Z, 05:45Z] [CUR 3.9]

**[1.4] SUPERVISOR — finish the records package for the handover.** The operator directed on 2026-10-04 that every decision, plan and piece of knowledge go into the repository before the thread is handed over, with "no loss of information". Done: `records-A.md`, `records-B.md`, `records-C.md`, `records-D1.md`, `records-D2.md`, `rules-and-directives.md`, `curator-record.md`, the legal export (`package/files/docs/spec/legal/`), the uploads digest, the live executor Knowledge v3.10 (`knowledge-v3.10-live.txt`, handed over by the operator at 01:20Z; the mirror file is ready at `package/files/docs/governance/lovable-knowledge.md`), 46 verbatim spec and ruling extractions in `package/drafts/specs/` (L1 versions 1 and 2, the L2 proposal, the legal settled points, the age-rule research, the bundle 3 and 4 rulings, the C28/C29 prompts among them), the supervisor's own record text for DEC-131 and INC-432 to INC-437 with slips S86 to S92 (`inc-432-437-and-dec-131.md`), partial `instructions-v1.13-amendments.md` (54 KB), and this file. Still to do, as the notes list it: reconcile statuses across the slices; assemble the ledger append (DEC-081 to DEC-131) and the INC append (INC-308 to INC-437; prettier 3.8.3 check on `incidental-findings.md`); the session blocks for 2026-10-04/05 (turns 10 to 12, the C29 import and walk, the C30 plan and rulings); the handover document; `system-state.md`; the roadmap; the launch-gate lines; the `tos-privacy-source.md` amendments; the full text of instructions v1.13; the pack and the import prompt. Owner: supervisor. Waits on: quiet windows. Exact next step: complete the list, then issue the docs-only import turn [2.3]. [N 10-05 00:50Z, 01:20Z] [N 10-04 23:38Z] [D2-1 "RECORDS DIRECTIVE"] [SW-SUPP] [INC-REC]

**[1.5] Condition in force: main trails dev by three turns, and the published site is ahead of main.** The full runs on `a17b227c` (turn 10) and `70e16ea5` (turn 11) were each red on one browser test — LT-13 (INC-334, fixed in turn 11) and CT-19 (INC-437, fixed in turn 12) — with every other job green (run 37264070069: 1,187 passed, 76 skipped, 1 failed, 0 flaky), so the promote job skipped both and main stays at `24d401f5`. The operator published `a17b227c` (~03:35Z) and `70e16ea5` (~05:45Z) from dev, so the public site carries turns 10 and 11 while the certified branch does not; no source rules on publishing from an uncertified head, and the two reds were test-only. The condition ends when the run on `48d3c53b` is green and promotes. Owner: CI; supervisor to read it. [N 10-05 03:35Z, 05:30Z, 05:45Z] [CI-EV ci-status.md; e2e-last-failure.md] [REPO git log origin/main..origin/dev]

**[1.6] Condition in force: parts of bundle 4 have been walked; the rest has not.** Walked by the operator on 2026-10-05 (the six-line list `walk-bundle4-c29.md` after the 03:35Z Publish, then the ribbon and the locate button after the 05:45Z Publish): the new leaf's details and price page (per-unit "Serves" row, the title built from the type, the review line), the Amharic map-pin words (INC-431 — correct), per-person pricing on Events & Catering with the "Minimum Guests" and "Order Ahead" rows, the default picture, the clickable finished steps at 1280 px, the corner ribbon (INC-435 — "looks good") and the "Use my location" state (INC-436 — "yes good"). Findings became INC-434, INC-435, INC-436 (fixed) and the C30 redesign. NOT walked, and no source asks for a walk of them: the step order (DEC-110), listing lifetime (DEC-117, INC-400), the options dial message (INC-410), the shop-or-office tick (DEC-125), the pin cleared on a city change (INC-393), the `{country}` and `{category:<slug>}` tokens on screen (DEC-124; no live row uses them yet), the contact-step changes from the operator's own re-walk (INC-422 to INC-425, INC-430, DEC-127), the settled-range and two-answer screens (INC-374, INC-381; no live rows). Standing rule for any walk: do NOT confirm a home-country change on the operator's own account (a 30-day clock starts) — use Go back; on reopening, the 8 drafts on ethio-prod that M5 moved from step 4 to step 3 pass the price page again. Owner: operator, if and when the next thread writes a list. [WALK] [N 10-05 03:35Z, 05:45Z] [D1-3] [D2-3] [N 10-04 06:30Z] [SW-1286]

---

## 2. THE ORDERED PLAN AHEAD

The order below is the supervisor's, as stated in the notes of 2026-10-04/05 and in the ten-row list given to the operator on 2026-10-04 19:06 local, with the later changes (C29 split out of the engine batch and imported; the records import made its own turn; turns 11 and 12 inserted for the walk findings and the CI reds; the C30 redesign inserted before the engine batch). The notes' last statement of the sequence (05:45Z): turn 12 → CI green → records import turn (docs only) → handover; "the curator's C30 plan is handled by whichever thread is live when it arrives".

### 2A. The rest of bundle 4 and the handover

**[2.1] Turns 10 and 11 are landed and published; turn 12 is pushed — see [1.1].** Turn 10 (`a17b227c`, 24 files; Part H docs, INC-431, INC-432 with M7, lint to 32 warnings, roadmap truth) and turn 11 (`70e16ea5`, 13 files; the LT-13 class fix closing INC-334, INC-434, INC-435, INC-436; PW-159, PW-160, PW-141 reworked; unit tests 360/360) were verified CLEAN by diff. Bundle 4 closes when `48d3c53b` is green and promoted. [N 10-05 02:50Z, 05:30Z] [REPO git log]

**[2.2] (closed) Publish once, then one short walk.** Done on 2026-10-05: two Publishes and the six-line walk plus the ribbon-and-button check; see [1.6] for what was and was not covered and [12.1]–[12.3]. Turn 12 changes a test file only, so no Publish follows it. [N 10-05 03:35Z, 05:45Z]

**[2.3] The records-import turn (documents only).** The executor imports the records package word for word; the supervisor verifies each file byte for byte (sha256). Contents as the sources name them: decisions DEC-081 to DEC-131 and defects INC-308 to INC-437 into the ledgers (INC-432 to INC-437 and DEC-131 from the supervisor's own text in [INC-REC]; slips S86 to S92 numbered there); the session blocks; the handover document; `system-state.md`; the roadmap (lines L1, L2, Report button, Your data page, social-channel posting; the photo clean-up line; tidy the bundle 4 proof list — turn 10 wrote "Parts C → D → E → F — PW-140/141/143/PR-25/PW-144" while Part F's PW-147/148/151 exist in `e2e/`, an incomplete proof list the supervisor ruled "tidy in the records turn, not DRIFT"); the launch-gate lines (section 3, items marked "line owed"); the `tos-privacy-source.md` amendments (A13 amended by DEC-128; new A15 certification; A16 versions, notice, translation, settings; B9 final retention incl. messages and technical records; B13 children; B2 corrected — "precise GPS not collected" is wrong because the map-pin tool reads the device position on "Use my location"; the clauses adopted from the 2020 documents); REQ-028 gains gambling, betting and lotteries; the REQ-007 / REQ-008 amendments (DEC-106, DEC-107, DEC-108; the ledger still gives the store address as ethio.com/@handle and Q-008 "RESOLVED → @handle"); the legal texts under `docs/spec/legal/`; the specs not yet in the repository (L1 v2, L2, the C30 rulings); the supervisor instructions as live (v1.12) and proposed (v1.13); the executor Knowledge mirror v3.10 with the v3.9/v3.10 amendment records; the `AGENTS.md` CI line corrected from the git form (`git fetch origin ci-evidence`, which the executor cannot run — still at `AGENTS.md:21` at `48d3c53b`) to the raw-address form; the class rules forged in bundle 4 (a function reachable from the app connection never issues DELETE or UPDATE without WHERE — proofs in a DO block do not exercise it, only a route test does; a mark sits above the ledger's current newest mark; a migration's proof block uses a scratch user or no caller; verification of a bundle turn checks every step of the brief against the diff, not the report's list; Amharic the executor writes is listed key by key in its report and the `am-script` guard is its CI promotion; a shape the door accepts is a shape every screen reads; a file row for an existing row carries that row's stored cells read at build time, never a constant, and a test asserts its own rows, not a shared roster's totals; the LT-13 class rule in the `admin-locations` spec header; the executor's tool applies a migration the moment the file is saved, so "stop at the apply line" means stop after the prod apply with staging by the operator's hand). Record lines from the C28/C29/C30 cycle: the curator's alcohol word list → the moderation spec (DEC-060 / REQ-028); the six Tigrinya aliases → a speaker check and a launch-gate "languages" line; the price table = DEC-131; new engine item "number-unit labels AM"; the "Eid" alias Latin only; the operator's C30 words and rulings. Security incident detail (INC-389, INC-396, INC-397) was held out of the repository until the fixes were on prod; they are, so it enters now. Use the corrected migration list (the executor's final bundle 3 report mislabels M1). Owner: supervisor compiles, operator sends, executor imports. Waits on: [1.4] and a green `48d3c53b`. [N 10-05 00:50Z, 01:50Z, 01:55Z, 02:06Z, 02:20Z, 02:50Z] [N 10-04 23:38Z] [INC-REC] [D2-1] [D2-3] [D1-3] [SW-1241] [SW-1331] [REPO AGENTS.md:21; roadmap.md:48]

**[2.4] (closed) The four C29 catalogue imports and the ten translation approvals** — done 2026-10-05 ~03:35Z; see [12.3]. One point no source settles: INC-314 (the categories importer drops `secondary_parents` on a create row, [4.20]) and `c29-categories.csv` created a leaf with the secondary parent `services`; whether the leaf carries that parent on prod is not recorded (the walk list expected it "also shown last under Services"; the walk's line 1 reported only the Dishes finding). Whoever audits C30 should read the categories export for `cooked-food-to-order`'s `secondary_parents`. [N 10-05 03:35Z] [WALK] [A3]

**[2.5] Tell the curator the engine is live, and release the engine batch — after C30.** The supervisor has not yet told the curator that `settled`, two-pair conditions, `{country}` and `{category:<slug>}` are accepted by the importer and drawn by the form (the C30 prompt keeps C29's section B, which excludes them; the one new mechanism, a condition on a tick-list answer, was allowed afterwards by the operator's ruling on the plan). The engine batch is the next curator prompt after C30 ([7.3]); the one-message-per-batch rule means it waits for the C30 import. Owner: supervisor. Waits on: [1.3]. [CUR 3.8, 4.1, 4.2] [N 10-05 00:12Z] [C30]

**[2.6] The C30 audit, import and short walk (the next thread's first catalogue task).** When the curator's files arrive: audit on the model of `audit_c29.py` (option shape; aliases; allowed targets and values exist; facts inside their own allowed lists and leaf scope; help ≤ 240 characters; Amharic code points; conditions naming keys linked on the same leaf with existing values — now including the first condition on a tick-list answer; no details row conditioned on a price-page row; cards; required only on cards); import in the five-file order the curator names, on the published site; approve the new names in Translations. Whether a walk follows is the live thread's call: the rule since 2026-10-01 is that a data-only change the audit proves gets no walk line, but C30 changes what the form shows and the C29 import got a six-line walk. Owner: operator imports on numbered steps; supervisor audits and writes the steps. Waits on: the curator. [C30] [N 10-05 01:55Z, 05:45Z] [CUR 1.5, 1.6] [RD 7.1 C-10]

**[2.7] The handover.** Stop point named by the supervisor: "when turn 10 is green" (2026-10-04), restated on 2026-10-05 as turn 12 → CI green → records import turn → handover; "every record in the repo and verified" is reached after [2.3]. The handover document itself is part of the package [1.4]; the new thread starts from it and from the repository's §2 ritual. Owner: supervisor. [D2-1] [D2-3] [SW-SUPP] [N 10-05 03:35Z, 05:45Z]

### 2B. After bundle 4, in the order given

**[2.8] L1 — the legal section (first build task after bundle 4).** Scope as recorded: a "Legal" section in the admin console holding three kinds of document (Terms, Privacy Policy, Publishing statement) as numbered, immutable versions in English and Amharic with change summary, effective date and publisher; legal settings (operator name and address, contact e-mails, provider list, liability amount — 100 US dollars, notice days, response time — 30 days plus up to 60 more for complex requests and sooner where a country's law requires, retention periods) frozen into each published version; machine translation of each version into every active language, correctable without a new version, English binding; `/terms` and `/privacy` pages and footer links; the acceptance screen at sign-in with one required tick "I am 18 or older and I agree to the Terms and the Privacy Policy." and three short lines above it, for all three sign-in doors, existing accounts and re-acceptance after a material change (default notice 30 days); the acceptance record (user, document, version, UTC time, language, sign-in method; no IP) with the latest accepted versions also on the profile row; the publishing certification above Publish (the global statement plus one per country where the ad shows and for the seller's home country, one required tick "I certify the above."), required on publish, edit and renew and recorded per ad per action — it replaces bundle 4's no-tick line and `listings.attested_at`; the fixed buyer safety line beside the seller's contact on every ad ("ethio.com does not verify sellers or ads. Inspect before you pay."); the preset reason "Under 18" on the admin's deactivate action; test accounts accepted by default (a harness change that "carries its own decision record"); its first migration also heals M7's mark if nothing lands before ([1.2]). Tier A. Size: ESTIMATE four to six executor turns, two migrations. Numbers: DEC-128, DEC-129, REQ-034, REQ-028 (buyer banner), Q-018. Specs: spec L1 version 2 was approved by the operator in chat ("approve. also make sure that we record in each user profile for the version agreeing terms of service"); its verbatim text is in the package (`specs/2026-10-04-l1-legal-spec-v2-…md`, with the additions files); it is not in the repository; the detailed Pass-2 spec is owed ([6.1]). Operator decisions still needed: [8.24] IP address, [8.26] 14 or 30 days, and the pre-publication checks [3.37]–[3.41]. Constraint: before any legal text is published, every feature it describes must be live or its clause removed ([3.42]). Owner: supervisor specs, executor builds. [D2-1 DEC-128, DEC-129] [D2-3] [N 10-04 ~21:15Z → ~22:55Z] [SW-1331] [PKG specs/2026-10-04-l1-legal-spec-v2-legal-documents-acceptance-publishing-certification.md]

**[2.9] L2 — the "My ads" screens with retention (after L1).** Scope: the seller's own list (mark sold, relist, renew, delete); a sold or no-longer-available ad keeps its page 30 days with a ribbon, contact hidden, out of feeds and search, then stays in My ads 12 months; an expired ad leaves public view at once and stays in My ads 12 months; an ad deleted by the seller disappears at once and a copy is kept out of sight for 12 months, uniformly in every country; reported / enforced / held ads: case close + 3 years; closed account identity 12 months; messages follow their ad; technical records 12 months (the supervisor's call, a setting); periods are admin settings; a hold flag; a restricted, audited archive; a purge job with a heartbeat that also covers the Supabase auth session and audit rows that hold addresses. Numbers: DEC-130; it finalises clause B9 of the source ledger, the "purge per retention rules" of REQ-022, and Q-012; it overlaps U6 step E1 (My Listings) and E2 (expiry reminders, renew/relist) of the phase ladder. Size: none stated. Spec: proposal L2 was approved in chat; verbatim in the package (`specs/2026-10-04-l2-retention-research-and-proposal.md`); not in the repository; the Pass-2 spec is owed ([6.2]). Owner: supervisor specs, executor builds. [D2-1 DEC-130] [D2-3] [N 10-04 ~21:40Z, ~21:55Z] [REPO docs/governance/roadmap.md:28] [PKG specs/2026-10-04-l2-retention-research-and-proposal.md]

**[2.10] The Report button on every ad, and the "Your data" page (after L2).** Report: reasons include "appears to be under 18" and copyright; it replaces the address in Terms 15; until built, reports go to legal@ethio.com. Your data: request a copy or a deletion, identity confirmed by a fresh sign-in; a person who cannot sign in writes to privacy@ethio.com and is checked by hand; until built, requests are handled by hand. Numbers: REQ-026 (block/report), REQ-012.4 (data rights); gap register "GDPR export/deletion". Size: none stated. Specs: owed ([6.3]). Owner: supervisor specs, executor builds. [D2-1] [D2-3] [N 10-04 ~22:10Z] [RD P2-162] [PKG specs/2026-10-04-legal-settled-points-settings-rule-report-button-your-data-page.md]

**[2.11] The price table (several prices in one ad).** Up to six lines, each a short label or "serves N" plus an amount; lists of ads show "from" the lowest. Ruled by the operator on 2026-10-04 ("AGREE ON ALL THREE") as a later form feature; until it lands, one ad per size with the size typed into the title. Placement: "after the legal pages (L1) and My ads"; its position relative to [2.10] is not stated. Numbers: DEC-131 — written in the records file: "decided, not specified, not built; queued after L1 and My ads"; rationale recorded there (42 of the 69 priced posts of the C28 catering tally print several prices; a menu of different dishes is not one ad, a ladder of sizes for one offer is). Spec: owed ([6.5]). Owner: supervisor specs, executor builds. [INC-REC] [N 10-05 00:12Z, 00:50Z] [D2-3] [CUR 3.9] [RD P2-163]

**[2.12] The spec for posting ads on ethio.com's own social channels (supervisor, not started).** The Terms carry the permission with no per-ad opt-out; the feature has no spec. To check first: each service's rules on automated posting; the EU and UK right to object is noted. Related recorded design (visibility plan §1, 2026-10-02): ethio.com's own Telegram channels by category and city fed by a bot with every approved listing, the bot marking or removing its post when the listing sells; only listings that passed screening are posted. Numbers: ACT-G2; row 12 of the legal table. Operator point open: [8.27]. Owner: supervisor ([6.4]). [D2-3] [N 10-04 ~22:05Z] [REPO docs/governance/visibility-plan.md:7–13] [RD P2-127]

**[2.13] The close-out bundle ("bundle 5"; before the phase closes).** Named contents, from all sources:
- the seven older parked parts of bundles 1 to 3 — S1, S2/S3, T (with T4), A, B, C, Part O (INC-369, INC-370) — plus the "Bundle 1" line, the D+L+M line ("Part O readers not built") and the S2 re-time list. These are one-letter codes of an early-October roadmap; the truth pass found "no written spec I could recover" and marked them not done, while the changelog and the tests say most were built (see [12.20]); the first task is to reconcile, not to rebuild.
- the search-timing ruling the supervisor owes ([4.14]) and the category-search speed "just over target";
- the E census: the posting form's load time on a slow phone connection (INC-351), the "listing not found" server lines (INC-398 / INC-364; 8 on run 37264070069), the INC-368-class AT-58 lines, and whether the quiet allowlist entry "new row for relation <q> violates check constraint <q>" is still hit;
- the final full DEC-023 run (the whole suite, including whole-project lint);
- CI reporter fixes: INC-419, INC-429; CI housekeeping; the flaky-test items of [4.30] not yet closed; DEC-098 stage 2 with the DEC-096 detector; the test-account pool adoption (DEC-097 / DEC-099) and the DEC-104 trial;
- INC-420 (the private npm cache census);
- security census: INC-409 (`has_permission`), whether the seven helper functions added to `scripts/public-surface-allowlist.txt` with M6 stay callable by signed-in users, the 163 (also written 161, 164) older database-checker warnings;
- "photo clean-up" is named in the ten-row list's close-out row; elsewhere it is its own later bundle ([2.17]).
The records turn was first listed here and has moved to [2.3]. Size: ESTIMATE six to eight executor turns, one staging apply, no walk (stated 2026-10-03, before later additions). Spec: the brief is owed ([6.6]). Owner: supervisor writes the brief, executor builds. [D2-3] [D1-3] [C3] [SW-1241] [SW-1286] [SW-1331] [SW-SUPP] [N 10-04 03:00Z] [CI-EV e2e-last-failure.md run 37264070069]

**[2.14] The e-mail announcing a material change to the legal documents.** Needs the notifications pipeline (REQ-031) and the Resend sending domain; must be live before the first material change after launch; until then the acceptance screen is the notice. Owner: supervisor specs, executor builds. [D2-1 DEC-129] [D2-3]

**[2.15] Offer, not accepted: spec "run the full CI suite only on the last push of each executor turn" (or run CI on the operator's own machine).** It would make a private repository affordable; the supervisor offered to spec it "as its own task right after this bundle". A runner of our own is a harness change that needs its own DEC under G22. Waits on the operator ([8.29]). [SW-SUPP] [D2-3] [D1-3]

### 2C. Later bundles and features that are named but not specified or scheduled

**[2.16] The posting-limits bundle (admin posting limits and AI switches).** One admin page where limits change without a code change: listing lifetime by plan level (bundle 4 built lifetime by category only), sale and discount windows, photos per posting per plan, on/off switches for every AI feature; AI-made seller-name suggestions wait for it. This is D69 "Platform Controls" (which subsumes D64, the AI switchboard). Spec not written; "each needs a short spec session" with the operator ([6.11]). [D2-3] [D1-3] [A3] [RD P2-155, P2-156] [SW-1241]

**[2.17] The photo clean-up bundle.** Camera capture, automatic clean-up and optional AI improvement of photos, AI screening of photos, and listing photos on the public card. This is D65 "Photo Studio" (approved in principle, behind the AI switch; the one decision it needs is spend per background removal — ESTIMATE one or two cents per photo). One recorded line for it, now in `roadmap.md:60` as an unticked line: when the card receives the ad's photo through `listing-picture`, the "Photos coming soon" ribbon hides by the existing rule; until then a ticked ad that later got a photo still shows the ribbon on its public card ([6.13]). [D2-3] [A3] [REPO roadmap.md:58] [RD P2-110]

**[2.18] The Settings bundle.** Editing the profile, the contact channels and the home country outside an ad. The door `change_home_country` exists (M4) and the contact step uses it; no Settings screen does (`src/routes/settings.tsx` has no home-country control at `48d3c53b`) ([6.23]). [D2-3] [D1-3] [REPO src/routes/settings.tsx]

**[2.19] Sizes and discounts.** Several sizes on one ad (shops with stock; the engineering census exists, the curator's proposal was asked on 2026-09-29 and never came, no decision) and discount pricing with a duration and a ribbon (D68 "Price drops & sales": a seller never types the "was" price; the operator declined to bless the 7-day and 30-day numbers, which become D69's seeded defaults). Specs owed ([6.12], [6.24]). [B3] [A3] [D1-3] [C3] [RD P2-105, P2-159]

**[2.20] "Request a missing place" with an admin inbox for structured messages.** Users request a region, city or sub-city from the posting form; an admin page shows the requests; the same inbox serves a Contact us page and the reserved-name request button. "It takes typed text from users into an admin page, so it needs limits and screening." Own short spec owed ([6.18]). [SW-1196] [C3] [D1-3] [RD P2-161]

**[2.21] Notices before an ad expires, and a "still available?" reminder.** A setting once notifications exist ([6.25]). [A3] [D1-3] [SW-1241] [RD P2-157]

**[2.22] Per-market presets, lists and units; Amharic number-unit labels.** Not part of bundle 4; wait for per-market defaults and, for some rows, a second market. New engine item from the C29 audit, now visible on live rows: number-unit words ("people", "guests", "days") print in English on Amharic screens — "number-unit labels AM", for the engine batch, not blocking. Detail in [7.8]. [D2-3] [CUR 3.8] [N 10-05 01:55Z]

**[2.23] Outside the wizard — "needed before a posted ad is usable".** (a) the screening step that moves an ad from "In review" to live — today nothing does; (b) "My listings" and editing a published ad (see [2.9]); (c) the public ad page with the "Show contact" button (the door `reveal_listing_contact` is built and tested), real photos on feed cards, and share buttons for Telegram, WhatsApp and Facebook (the seller taps; nothing posts automatically); (d) messaging with e-mail notices; (e) store pages at ethio.com/<name>, public links, the verified badge and verified businesses, including an admin path that gives a protected organisation its own business name; (f) launch items (section 3). None has a spec for its build ([6.19]–[6.22]). [D1-3] [D2-3] [C3] [SW-1241] [SW-SUPP]

**[2.24] The phase ladder still ahead, as the repository states it.** `docs/governance/roadmap.md` (last updated 2026-09-02, so stale in detail): U6 Posting — D1 screening gateway and states, D2 human review console, E1 My Listings, E2 expiry job with reminders and renew/relist, then the era gate (four-lens review); U7 Browse/Feed (geo-scoped feed with auto-widening, search, filters from attributes, listing detail, storefront); U8 Messaging and seller contact channels, notifications; a Bookings era as candidate U9; then the launch gate. `system-state.md` (2026-09-25, unchanged since) also carries as open: D37-2 / D37-3 (later phases of the category finder), the file-cell half of D30/D33, D42 (map radius, backlog), C4 tags (→ U7), the U7 rail flyout, the assets badge, C3-UX-3/4/10, ACT-C3-1, the Eritrea market decision, Q-014. Whether each of the 2026-09-25 items is still open is not stated in any later source. No four-lens close-out review (G19) was written for bundle 1, and none is recorded for bundles 2, 3 or 4. [REPO docs/governance/roadmap.md:28–33] [REPO docs/governance/system-state.md:76] [C6]

**[2.25] Decided or queued executor work that appears in no current queue.** These were queued before bundle 4 and are in none of the lists above; each is detailed in section 4 or 5: the importer sweep ([4.20]–[4.22]); the flaky-test turn CI-T2 ([4.30]); W4b ([5.20]); the "not in" condition ([5.21]); the Admin › Services page, DEC-091 ([5.17]); the stranded-turn detector, DEC-096 ([5.18], now inside [2.13]); the installable PWA, REQ-039 ([5.19]); the reset-timing line for the account pool ([10.6]). [A3] [B3] [C3]

---

## 3. LAUNCH GATE — what must be true before public launch

Marked DONE / NOT DONE / PARTLY / UNKNOWN. "In file" means the line is in `docs/governance/launch-gate.md` today; "line owed" means a source says it belongs there and it is not there. Launch means real users on ethio.com; the file's own heading reads "pre-real-users; none blocking current dev". A lawyer's review is NOT a launch blocker by standing ruling (it waits for the Ethiopia-entity milestone); the supervisor's "lawyer's read before launch" of 2026-10-04 was withdrawn.

### 3A. Infrastructure and providers (in file)

**[3.1] Verify a sending domain in Resend.** NOT DONE. Production e-mail is in test mode and can send only to the operator's own address; sign-up and recovery for anyone else, the change e-mail [2.14] and message notices all depend on it. Owner: operator. [REPO launch-gate.md:5] [B3] [SW-1016]

**[3.2] Cloudflare Turnstile account and the CAPTCHA toggle.** NOT DONE. The sign-up security check is a seam only (`src/features/auth/auth-service.ts:77`). Numbers: DEC-010, REQ-037. Owner: operator (account), executor. [REPO launch-gate.md:6] [D2-1]

**[3.3] Production Google OAuth client and consent-screen verification.** NOT DONE as far as any source shows (the client is in Testing mode). Owner: operator. [REPO launch-gate.md:7]

**[3.4] Update Supabase redirect URLs and Site URL to ethio.com at the domain cutover.** NOT DONE. Owner: operator. [REPO launch-gate.md:8]

**[3.5] Confirm the dev-versus-prod database story.** PARTLY (ethio-staging exists). [REPO launch-gate.md:9]

**[3.6] Leaked-password protection (Supabase Auth).** UNKNOWN — the file says "Pro-plan gated; enable on upgrade"; a sweep of 2026-09-29 says it was "enabled by the operator" (ruled in `docs/tracking/security-scan-2026-09-28.md`). The file line was not updated. [REPO launch-gate.md:10] [SW-0926]

**[3.7] Executor-platform project settings: Hide-badge ON, Visitor-analytics OFF (currently ON), Auto-fix-security OFF.** NOT DONE (as the file states). Owner: operator. [REPO launch-gate.md:11]

**[3.8] On the Supabase Pro upgrade: sessions time-box 7 days, inactivity 4 hours, compromised-refresh-token detection, on both projects.** NOT DONE. Numbers: ACT-U0-1. Owner: operator. [REPO launch-gate.md:12] [REPO action-tracker.md]

**[3.9] Full act-as impersonation, with its write-guard census first.** NOT DONE (Ops phase). Numbers: ACT-U3-1, DEC-021. [REPO launch-gate.md:13]

**[3.10] Entity machine translation on the REQ-004 engine; SSR inlining of the active language bundle.** NOT DONE (deferred by design). Numbers: ACT-U4-1, ACT-U4-2. [REPO launch-gate.md:14–15]

**[3.11] Ops security review: `has_permission` callable for arbitrary targets; the gated-definer linter warnings; leaked-password toggle.** NOT DONE. `has_permission` is INC-409 [4.1]. The warnings (68 in the file; later 149 + 14, then 161 / 163 / 164) were ruled "by design" on 2026-09-28 on the strength of an audit that was promised and never run [9.4]. [REPO launch-gate.md:16] [A3] [D1-3]

**[3.12] DNS cutover of ethio.com to the new app behind the operator's Cloudflare zone.** NOT DONE. Acceptance: `/api/geo` answers `source: "cf-visitor"` with city and coordinates. Rollback: grey-cloud both records. Until then the location guess is country-level. With it: the redirects of [3.30], the old pages coming down [3.44], and the bot rules of [3.34]. Owner: operator. Numbers: DEC-063 amendment. [REPO launch-gate.md:17] [RD P2-147]

**[3.13] Partition rehearsal on staging (the Ethiopia split as a copy by predicate) and its runbook.** NOT DONE. One physical partition at launch. Numbers: REQ-033 amended, Q-014, Q-015 (Wingu/Raxio pricing quotes, "deferred to pre-launch", OPEN). [REPO launch-gate.md:18] [REPO spec-ledger.md:442]

**[3.14] Moderation go-live.** NOT DONE. The dials table seeded and reviewed; the weekly 50-item calibration sample scheduled with an owner; first-round appeals automated and tested; the admin notification on a disagreeing hold wired; the severe-category list ratified by the operator. The screening step itself is not built ([2.23]a). [REPO launch-gate.md:19]

**[3.15] Counsel item (Q-014, DSA): "online marketplace" under Art. 30, micro-enterprise exemption.** NOT DONE; not a blocker (statement-of-reasons, notice-and-action, complaints and repeat-misuse suspension "are built regardless" — none is built yet). The country-law notes of DEC-128 are to be added to this item. [REPO launch-gate.md:20] [D2-1]

**[3.16] Rotate all service-role keys that transited tooling (ethio-staging in GitHub Actions; ethio-prod in the executor's secret store).** NOT DONE. "Precautionary but mandatory before real users." Owner: operator. [REPO launch-gate.md:24]

**[3.17] Re-run at launch: D-8 and D-10 by hand against production; `p1f-identity-unlink.ts --recheck`; the Guard Proof workflow.** NOT DONE. The Guard Proof workflow has not been dispatched since 2026-08-03 and must first be brought onto the current harness (ACT-C3-1). [REPO launch-gate.md:28–30] [REPO action-tracker.md]

### 3B. Content, compliance, brand, quality (in file)

**[3.18] Native-speaker review of all Amharic copy.** NOT DONE. The file names auth, settings, e-mails, shell, panel and feed copy; the same requirement now covers the Amharic legal text [8.8], the reserved-names list [8.11], the catalogue labels [8.12] and executor-written strings (INC-431 showed executor-written Amharic had never been read; the guard added in turn 10 found two more garbled values outside the map-pin family, since corrected — the guard catches wrong code points, not wrong words). Owner: operator. [REPO launch-gate.md:34, 42] [D2-3] [N 10-05 02:50Z]

**[3.19] EXIF strip live before any image upload ships.** DONE — `src/server/media/strip.ts` ("EXIF strip real", census of 2026-10-04). Numbers: DEC-009, REQ-036. [REPO launch-gate.md:35] [N 10-04 ~22:50Z]

**[3.20] ECA registration / Ethiopia data partition.** NOT DONE; an Ethiopia-entity milestone (about year 1), not a launch item. Numbers: DEC-008. [REPO launch-gate.md:36]

**[3.21] Professional trademark clearance of the woven-diamond mark and wordmark.** NOT DONE. Owner: operator. [REPO launch-gate.md:40]

**[3.22] Lighthouse budget on the marketplace path (real LCP/CLS/TBT on a throttled phone).** NOT DONE. The supervisor also promised on 2026-09-28 an LCP budget per page class on this list; no such line exists [9.3]. Numbers: REQ-003, REQ-029. [REPO launch-gate.md:50–53] [A3] [SW-0881]

**[3.23] Visual-regression baselines for the shell at 360/768/1280 in both modes.** NOT DONE. [REPO launch-gate.md:54–57]

**[3.24] Handed forward from the translation era.** OPEN: ACT-U4-4 (spec-lint sweep, 38 sites), ACT-U4-5 (entity revisions/flags), ACT-U4-8 (import-batch history), ACT-U4-3 (history chip polish). DONE: ACT-U4-6, ACT-U4-7. Post-launch set: TM/glossary, ICU plural validation, four-eyes approval, missing-key telemetry. [REPO launch-gate.md:61–62] [REPO action-tracker.md]

**[3.25] From the phase ladder's launch-gate line and the gap register: backup and restore drill; watchdogs; PII export and deletion; legal pages; SEO/hreflang audit; error monitoring; full 2FA step-up; the product-analytics decision; the currency-rate source.** NOT DONE (none is built or decided). Numbers: REQ-032, REQ-040, REQ-016/030, REQ-018, REQ-034/035. [REPO docs/governance/roadmap.md:33] [REPO gap-register.md]

### 3C. Lines the sources say belong on the launch gate and that are not in the file ("line owed")

**[3.26] The repository goes private at launch.** NOT DONE; line owed. Order fixed: attach the repository to the supervisor's session first, test the access, only then switch; decide the CI cost plan (GitHub's runners, or a runner of our own — a harness change needing its own decision under G22). Numbers: DEC-116. Owner: operator, with the supervisor. [D1-3] [SW-1241] [RD P2-148]

**[3.27] The installable PWA "before launch".** NOT DONE — see [5.19]. [A3] [SW-0881]

**[3.28] Keep the promise "We email you when a message arrives", or remove the line.** NOT DONE; line owed. The contact step shows it; messaging (U8) is not built. [D1-3] [SW-1241] [RD P2-115]

**[3.29] The contact-permissions defect "must be closed before launch".** DONE — INC-389 fixed by M1 and M1b (bundle 3), test PR-21. [SW-1196] [D1-6]

**[3.30] Redirects from the old site (rule R9).** NOT DONE; ACT-G3 says R9 enters the launch gate. The home page and `?lang=am` carry over; old category and business pages are mapped; gambling-spam and test pages answer "gone"; the executor platform's published address names ethio.com as the preferred address. Also from the Search Console read: the six businesses whose old pages drew the search traffic (Qulubi International Mart, Selam Photo Studio, Ahadu Kitchen Appliance, Meskel Restaurant and Mart, Lion Insurance Tax Services, a traditional-cloth-to-order page) "should be the first invited back"; shop pages need business type and city in the title; Amharic category titles; "do not submit a sitemap there yet". [REPO visibility-plan.md:33–35] [SW-1151] [C3] [RD P2-122]

**[3.31] "Tightening the alias rules before launch."** DONE — the seller-name rules (DEC-107) were built in bundle 3 (M2, M4, M4b, M4c). [SW-1196] [D1-1]

**[3.32] Legal check before launch (operator): the consent wording of the contact switch under Ethiopia's Personal Data Protection Proclamation 1321/2024; the display of a previous seller name against the right to erasure or correction.** NOT DONE. "I am not a lawyer, so this belongs in the pre-launch legal check." [SW-1196]

**[3.33] Native proofread of the Amharic names in the reserved-names list before use.** NOT DONE — see [8.11]. The list is already seeded and in use. [SW-1196] [D1-3]

**[3.34] Cloudflare AI-bot block and a rate rule, once ethio.com points at the new app.** NOT DONE; line owed. The executor's report on whether a bot filter can sit in front of the published site was promised to the operator and never asked of the executor [9.13]. `public/robots.txt` already refuses the AI training crawlers by name. [D1-3] [SW-1241] [REPO public/robots.txt]

**[3.35] The legal pages and the acceptance are live.** NOT DONE; line owed. Built by L1 [2.8]. [D2-1] [SW-1331]

**[3.36] The change e-mail is live before the first material change after launch.** NOT DONE; line owed. See [2.14]. [D2-1]

**[3.37] The mailboxes legal@ethio.com and privacy@ethio.com exist** (and security@ethio.com, which the drafts name and nobody was asked to create). NOT DONE; line owed. Owner: operator ([8.6]). [D2-3]

**[3.38] The copyright agent is registered with the United States Copyright Office.** NOT DONE; line owed. Without it the protection United States law gives a platform against copyright claims over users' posts does not apply. Owner: operator, guided by the supervisor ([8.7], [9.14]). [D2-1] [D2-3]

**[3.39] A United Kingdom children's access assessment within three months of opening the UK.** NOT DONE; line owed; the supervisor drafts it ([9.15]). [D2-1] [SW-1331]

**[3.40] A re-check of the United Arab Emirates child digital safety law before its grace period ends** (in force January 2026 with a one-year grace period). NOT DONE; line owed. Owner: supervisor. [D2-1] [SW-1331]

**[3.41] A native speaker has read the Amharic legal text; the spelling of "Ethio.com LLC" matches the registration.** NOT DONE. Owner: operator ([8.8], [8.9]). [D2-3]

**[3.42] Every feature the legal texts describe is live, or its clause is removed, before the text is published.** NOT DONE. The list: versioned acceptance at sign-in; the publishing certification with country statements; the e-mail announcing a change; the sold / no-longer-available label, the seller's own list, the 12-month copy and timed erasure; in-app messages and blocking; the appeal of a rejection and review by a person on request; the steps of enforcement (warning, lower ranking, restriction, ban); converted prices and automatic translation of ads; promoted ads; help from staff inside an account; copy, export and deletion of a user's data on request; the security check at sign-up. Also not built: the Report button and the posting on ethio.com's own channels. Owner: supervisor to track against each build. [D2-1] [SW-1331]

**[3.43] The Report button, the "Your data" page and the social-channel posting are on the roadmap.** NOT DONE; roadmap lines owed ([2.10], [2.12]). [D2-1]

**[3.44] The two 2020 pages (`/terms-of-use/`, `/privacy-policy/` on the old site) come down the day the new site replaces the old one; carried-over accounts accept version 1 at first sign-in.** NOT DONE. [D2-1] [SW-1331]

**[3.45] Esri (the map tiles): confirm business use on the free tier; watch the API key.** NOT DONE. The key was created 2026-09-30 and expires at most one year after creation; nothing warns before it does until the Services page exists ([5.17]). The earlier promise of "Cloudflare-hosted maps before public launch" was superseded by the Esri decision. Owner: operator. [B3] [SW-0971]

**[3.46] The "Prohibited & Restricted Items" policy.** NOT DONE. A draft exists (`c25-prohibited-restricted-items-policy-DRAFT.md`), awaiting counsel review before publication; the supervisor named Copyright Proclamation 410/2004, Cultural Heritage 209/2000 and the NBE foreign-exchange directives as needing a lawyer's pass. Its screening terms, the alcohol word list of the C28 note and the gambling ban feed the moderation build. [A3] [CUR 3.4] [SW-0836]

---

## 4. DEFECTS OPEN

Every INC from INC-308 to INC-437 whose record does not say FIXED or CLOSED is here, with the older open numbers the repository's own ledger still carries. Of INC-377 to INC-394 (records-C) all are fixed (INC-381 and INC-374 by bundle 4, INC-389 by bundle 3); INC-392 ("CI-5 transient read") and INC-394 ("phone field unusable") are labels matched to events after the fact. Of the six numbers of 2026-10-04/05 (INC-432 to INC-437, defined in [INC-REC]): INC-432, INC-434, INC-435 and INC-436 are FIXED ([12.6], [12.11]); INC-433 is OPEN ([4.60]); INC-437's fix is on dev awaiting CI ([4.62]). Numbers with no recoverable definition: INC-349, INC-352, INC-364 (see [4.52]). Items closed since the previous compile keep their id with "(closed)" so that pointers resolve.

### 4A. Security

**[4.1] Guard `has_permission` so it does not tell any signed-in user what another account may do.** The function is SECURITY DEFINER, executable by every signed-in user, and answers for any user id; it is used by 62 policies and internally with other users' ids (admin lists), so a guard needs a census of its callers first. Numbers: INC-409; the launch-gate "Ops security review" line names the same grant. Owner: supervisor (brief), executor. Queued: close-out bundle [2.13]; it has no step in bundle 4. Waits on: the caller census. [D1-3] [D2-3] [N 10-04 01:45Z] [REPO launch-gate.md:16]

**[4.2] Decide whether seven helper functions stay callable by signed-in users.** M6 added seven helper functions to `scripts/public-surface-allowlist.txt`; each already had EXECUTE for signed-in users from earlier migrations, so the addition was accepted, with the question left as a census item. Owner: supervisor. Queued: close-out bundle. [D2-3] [N 10-04 ~21:55Z]

**[4.3] Census the older database-checker warnings.** 161 at M1b, 163 at M3, 164 and 163 in one executor report; no census explains the differences. The executor offered "I can deal with them separately if you want" and no ruling was given. Earlier: 165 findings ruled in `docs/tracking/security-scan-2026-09-28.md` (definer-function warnings by design, `pg_trgm` deferred), and four new "signed-in users can run this function" warnings from the D62-1 turn were never mapped to functions. Owner: supervisor to rule. Queued: close-out bundle. [D1-3] [D1-6] [D2-3] [SW-0836] [SW-0926]

**[4.4] Evidence gap on INC-421 (every 5xx JSON answer lost its body after the framework update).** The fix (`src/server.ts`, commit `5f5fd6b7`) is green in CI, but it was never probed on the Cloudflare build the published site runs ("nightly parity smoke only"), and why only the real route and not a probe route lost its body is unexplained. A "Cloudflare probe line" was asked of the executor and is not recorded as delivered. Numbers: INC-421, DEC-126. Owner: supervisor. Queued: nowhere. [D2-3] [N 10-04 05:45Z, 06:30Z]

**[4.5] Move `pg_trgm` out of the `public` schema.** Deferred to the scale phase by the 2026-09-28 ruling. Owner: supervisor. [A3] [SW-0881]

**[4.6] Migration proofs borrowed a real account twice.** The proof blocks of M4 and of M5 used the oldest real account (rolled back) although the class rule "scratch user or no caller" had been stated after M4; M6's proofs use scratch rows only. Recorded as an executor slip; nothing to repair, but the rule must be in every migration prompt. Owner: supervisor. [N 10-04 04:55Z, 15:25Z, ~21:55Z]

### 4B. The posting form

**[4.7] (closed) Replace the garbled Amharic strings of the map-pin tool.** INC-431 is FIXED in turn 10 (`a17b227c`): the 25 `post.pin.*` values replaced verbatim from the supervisor's file; the new unit guard `src/i18n/locales/am-script.test.ts` (no unassigned code point `\p{Cn}`; every letter Ethiopic or Latin) also caught `admin.countries.filter.pageSize` (U+1444) and `admin.coverage.error.reason` (U+1728), corrected in the same turn; `am.ts` holds no unassigned or foreign letter at `48d3c53b`; the operator read the Amharic pin words on the published site (walk line 4: correct). Class rule kept for every prompt: Amharic the executor writes is listed key by key in its report; the guard is the class's CI promotion (third occurrence). See [12.5]. [INC-REC] [N 10-05 02:50Z, 03:35Z] [REPO src/i18n/locales/am.ts:1985, 1990; src/i18n/locales/am-script.test.ts]

**[4.8] (closed) Make every import that commits or undoes rebuild the name-fold table, and let the door be called from the app connection.** INC-432 is FIXED in turn 10 (`a17b227c`) with M7 `20261005021121_9347e038` (mark `20261005040000`, on ethio-prod and ethio-staging): `refreshNameFoldsAfterCommit` (`src/server/catalog-find.server.ts:102`, after the commit or undo returns, never inside it; a failure is logged and never fails the import) called at `attributes/import.ts` :143 :186, `categories/import.ts` :135 :176, `locations/import.ts` :148 :187; CT-35, AT-69, LT-15 red first then green; rebuild 472–644 ms on staging. Two class rules forged ([2.3]). Left behind: INC-433 ([4.60]) and the executor's turn 10 limitation "no live mark read-back this turn" (accepted). See [12.6]. [INC-REC] [N 10-05 02:06Z, 02:16Z, 02:50Z] [REPO src/server/catalog-find.server.ts:102; src/routes/api/admin/*/import.ts; supabase/migrations/20261005021121_9347e038-….sql]

**[4.9] (closed) The "And when" empty-choice label.** Built in turn 9b (`admin.attributes.link.andNone`, asserted by AT-66); see [12.4]. Kept here only so the number sequence holds. [N 10-05 01:15Z] [REPO roadmap.md:53]

**[4.10] A saved extra place in another country is not shown again after Back on the place step.** The second of the two place-step limits left by the W6 turn; the first was fixed on 2026-09-30. Not confirmed fixed in any later record (the place step was reworked in bundle 2, Part P); last word 2026-09-29. Numbers: INC-343 (b). Owner: supervisor to check on the published site or in a test. Queued: nowhere. [A3] [A6] [A2]

**[4.11] The posting form takes about 20 seconds to load on a slow phone connection (Slow 4G, 360 px).** Only a census was ever ordered (the top five costs, with a proposal; "the fixes themselves would be a further turn"); the census was never run. Numbers: INC-351; the load-time half of the "E census". Queued: close-out bundle [2.13]. [B3] [B2] [SW-1106]

**[4.12] Two attributions the executor still owes (read-only).** (a) The origin of the other raw field names the refusal summary can still show (`status`, `cover`, `renew`, `first_name`, `last_name`, `name`, `label`) — the residual of INC-313; (b) one `listings_price_bp_check` server line during test PW-63 on mobile. Last word 2026-09-28. Owner: executor on the supervisor's prompt. Queued: nowhere. [A3] [SW-0836]

**[4.13] Keep the selected currency visible while the currency list is open and searched.** Promised on 2026-09-28 "for the next client turn", not included in that turn; not confirmed in any later record. Bundle 4 step 11 replaced the currency box with one shared searchable picker (`src/components/searchable-picker`); whether that closes it is not recorded. Owner: supervisor to check at the walk. [A3] [SW-0836] [REPO src/features/posting/step-pricing.tsx]

**[4.14] Rule on the category-search timing.** Target: warm p95 at most 300 ms; measured 306 ms at the edge with the database at about 11 ms. The supervisor ruled it "closed as recorded (missed by 6 ms, hop-bound)" on 2026-10-02; the roadmap's truth pass of 2026-10-04 reads "stopped for ruling, no ruling since", and the supervisor's later note says a ruling is owed. Caching search answers at the edge is the recorded candidate. Numbers: INC-363 (partly fixed: no visitor waits for a rebuild). Owner: supervisor. Queued: close-out bundle. [B3] [B6] [D2-3] [REPO roadmap.md:10]

**[4.15] Confirm that the built title covers the "What is it?" answer on Other leaves.** "E4" was the idea that the title is prefilled from the `item_name` answer; it never went into a prompt under that name. Bundle 4 builds the title from the answered card rows (`build-title.ts`); the key `item_name` is not referenced anywhere in `src`, so whether an Other-leaf ad gets a useful title is unknown. Owner: supervisor (walk line). [B3] [B6] [REPO src/features/posting/build-title.ts]

**[4.16] A nit left in M6:** `attr_visible_when_met` now returns true for a condition that is not an object (it returned false before); such a value cannot be stored (a CHECK forbids it). Not blocking. [D2-3] [N 10-04 ~21:55Z]

**[4.17] The count of rows with an empty Amharic name while an approved Amharic translation exists was never reported.** Queued read-only on 2026-09-30 for staging and production (`name_am` / `label_am`), as the class count of INC-361; no result seen. Owner: executor on a prompt. [B3] [SW-1016]

**[4.18] The admin "Suggest icon" fallback note has never been seen on screen.** Bundle 2 step 18 made the fallback visible ("No suggestion found; the default icon is shown"); the executor said "I haven't seen the editor note on screen; no browser test covers it yet". Not followed up. Numbers: INC-387 (fixed in code). [SW-1196]

**[4.19] Three read-only censuses asked of the executor and never seen:** any other buyer-visible help text that promises "no phone numbers"; any other place the form hides a row whose door still demands an answer; what the catch-all flag changes (sorting, glyph, admin filters). Asked 2026-09-30. [B3] [SW-0971]

### 4C. The catalogue engine and the importer

**[4.20] The categories importer drops `secondary_parents` on a create row.** A new leaf imported with a second parent lands without it; until fixed, a new leaf with guests is a two-pass delivery (C29's new leaf has a secondary parent, so this bites next). Fix: apply the cell on create and add a create-with-guests test. The latest declaration of `admin_commit_category_import` is still the one in migration `20260928002133`. Numbers: INC-314. Owner: executor. Queued: "the importer sweep", queued since 2026-09-28; no prompt was ever written. [A3] [A2] [REPO supabase/migrations/20260928002133_f98b5cf0…sql]

**[4.21] Undo of a category delete does not restore its attribute links.** Accepted for a retired, listing-free leaf; "fix when the undo is next touched". Numbers: INC-307 (low). Queued: the importer sweep. [A3] [REPO incidental-findings.md:2732]

**[4.22] The attributes import preview approves a card-rank clash that only the commit refuses.** Fix: the preview refuses it; then remove the broad duplicate-key line from `docs/tracking/ssr-error-allowlist.txt` (line 21). Same class, still logged: the two `[ssr-error] … commit_failed duplicate key … card_rank_unique` lines test AT-58 provokes. Numbers: INC-327, INC-368 class. Queued: the importer sweep; the lines are also an E-census item. [A3] [B3] [REPO docs/tracking/ssr-error-allowlist.txt:21]

**[4.23] Small follow-ups "for the next turn touching each file", none done.** Rename test PW-26 (its title still says "by name"); add `&& !inFlight` to the import-bucket prune in `src/server/imports/gate.ts`; `admin_delete_category` refuses a row with children; the console's pointer dialog shows a "Home" badge and a "Make home" action; `admin_list_category_pointers` exposes `is_primary`. Listed in the action tracker since 2026-09-28. [A3] [SW-0836] [REPO action-tracker.md] [REPO e2e/post-wizard-resets.spec.ts:205]

**[4.24] Older importer numbers still open in the repository's ledger.** INC-261, INC-262, INC-267 — "re-registration from repo truth pending (the importer census turn)"; INC-203 (import commits carry Amharic through the translation door, which needs `translations:update`). No later source mentions them. [REPO incidental-findings.md:2190, 2500, 2506, 2534] [REPO system-state.md:76]

**[4.25] Two questions that never appear together cannot share a card slot.** Found at Wood & Timber; needs an app change; "logged for later" (2026-10-01). [B3] [CUR 3.8]

### 4D. Tests and CI

**[4.26] "listing not found" server lines above the target.** `[ssr-error] /api/listings/draft listing not found` lines that no test provokes on purpose; the target set under INC-323 was 5 per CI run. Counts: 7 on 2026-10-01, 6 per the roadmap on 2026-10-04, 11 on run 37241062194, 8 on run 37264070069 (shards 3, 5, 6 — the one message off the allowlist in that run). The message stays off the allowlist, which matters for DEC-083's gating date 2026-10-12 ([9.10]). Numbers: INC-398 (2026-10-03); the roadmap's older "E census" line counts the same lines under INC-364, a number with no definition — a later compiler may merge them. Queued: close-out bundle. [D1-3] [D1-6] [B3] [REPO roadmap.md:18] [CI-EV e2e-last-failure.md:23]

**[4.27] The guards evidence file does not extract ESLint error lines.** A lint error was invisible in `guards-last-failure.md` (only warnings in the 60-line tail). Numbers: INC-419 (low). Queued: close-out bundle. [D2-3] [N 10-04 04:55Z]

**[4.28] The E2E failure report finds no error-context file.** Every failure body says "context file not found" (57 times in one run), so failures such as PW-55 could not be explained. Numbers: INC-429 (low). Queued: close-out bundle, with INC-419. [D2-3] [N 10-04 ~17:10Z]

**[4.29] The CI report still heads the accessibility section "non-gating".** The check has been gating since 2026-09-29. `scripts/e2e-failure-report.ts:514` still prints "## Accessibility (DEC-084, non-gating)". Numbers: DEC-084. Queued: the flaky-test turn. [A3] [REPO scripts/e2e-failure-report.ts:514]

**[4.30] The flaky-test turn ("CI-T2") was never issued.** A turn planned on 2026-09-29/30 for tests that fail and then pass on retry; called "overdue" on 2026-09-30 and not mentioned since. Parked for it: INC-333 (PW-61, five flaky runs in seven days), INC-335 (PW-35, three) — the one-to-one mapping of INC-333/334/335 to PW-61/LT-13/PW-35 follows the order of listing and is not stated test by test; INC-339 (the Amharic check on the marketplace menu, likely `i18n-coverage.spec.ts › the marketplace shell renders no English fallback`; no test id is recorded); INC-345 (TR-29, five); the reopened INC-285 (LS-6; its collisions were treated again on 2026-10-04 as INC-428, no source says that closes INC-285, and LS-6 has eight ledger lines since 2026-09-28); PR-7; LS-11; PW-58; the flake ledger's 14 tests at three or more flakes in seven days (count of 2026-09-30); the 28 older fast-refresh lint warnings. INC-334 (LT-13) left this list: closed by the turn 11 class fix ([12.10]). New since, from the ledger ([10.3]): PW-76 flaked three times on 2026-10-04 and CO-4 three times in the week — by the DEC-030 rule each gets an INC; none is recorded. Owner: supervisor to draft. [A3] [A6] [B3] [SW-0926] [SW-0971] [CI-EV flake-ledger.md]

**[4.31] PW-61 "Undo within ten seconds" fails most runs at 8 sandbox workers.** Recorded, no fix scheduled. Numbers: INC-322. [A3]

**[4.32] No automatic list of tests at three or more flakes in seven days.** Proposed for every CI report because the manual check had been missed three times; not built (the report only prints the rule). Queued: the flaky-test turn. [A3] [REPO scripts/e2e-failure-report.ts:80]

**[4.33] Two flakes wait for evidence.** INC-286 (TR-34 deep-equality) and INC-287 (TR-24, four times on 2026-09-24): "evidence pending the first DEC-078 body; no fix without it". Open in the repository's ledger; no later source. [REPO incidental-findings.md:2648, 2654]

**[4.34] Older harness numbers still carried.** INC-218 (LS-11; closes when the flake ledger shows no LS-11 line for seven days after 2026-09-25 — never recorded as closed; a new teardown body appeared on 2026-09-27); INC-186 (a green run never judges the artifact contract); INC-117 (the nightly's quarantined global-state tests are not gates); ACT-C3-1 (the Guard Proof workflow, never dispatched since 2026-08-03). [REPO incidental-findings.md:2288] [REPO system-state.md:76] [REPO action-tracker.md]

**[4.35] The final full local run of the whole suite was never done.** "The final full DEC-023 run, including whole-project lint" has been the last line of every queue since 2026-10-01. Queued: close-out bundle. Numbers: DEC-023. [B3] [D2-3] [REPO roadmap.md:19]

**[4.36] Red-before-fix runs owed for PW-94 and PW-106 to PW-109.** Owed when bundle 1 was reported on 2026-10-02 (PW-96's was waived once); whether they were delivered before the bundle closed is not in the sources. [B3] [B6] [SW-1106]

**[4.37] Lint and format leftovers.** 28 older fast-refresh warnings (later written "29 react-refresh warnings", and "6 old warnings" in another report); one warning in `field.tsx`; one the executor "didn't trace to a file"; `scripts/fixtures/e2e-results-malformed.json` fails a bare `prettier --check .` (outside the project's format check). [B3] [SW-0881] [SW-1196] [D2-6]

**[4.38] Spec files over the size rule.** The rule is "no spec file above about 25 tests per project"; `post-wizard-specs` reached it on 2026-09-29 ("the next test added there will split the file first"). At `48d3c53b` `e2e/post-wizard-specs.spec.ts` holds 37 tests and `e2e/post-wizard-bundle2.spec.ts` 30 (the notes of 2026-10-04 counted 29 and 30; turns 9 to 11 added PW-152 to PW-160). No source records a split or a ruling. [A1] [SW-0926] [N 10-04 ~17:55Z, 22:50Z] [REPO e2e/post-wizard-specs.spec.ts; e2e/post-wizard-bundle2.spec.ts]

**[4.39] Numbers asked inside bundle 4 and not seen.** The six-before / six-after timing medians of the M5 name check (`audit_log` action `migration.m5_timing`) — "asked"; step 9's on-screen proof of the size and terms lines. Whether later turns delivered them is not recorded. [N 10-04 15:25Z, ~18:40Z] [SW-1286]

**[4.40] Coverage gaps named in turn reports.** PW-39 and PW-76 were not run locally by the executor ("CI is their proof"); the account page's read-only profile card has a unit test only. [SW-1331] [N 10-04 ~21:55Z]

### 4E. Platform and operations

**[4.41] The lockfile resolves 188 packages to the executor platform's private npm cache.** `bun.lock` points at `europe-west*-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache` (114 before the framework bump); the supervisor's sandbox gets 403 there; CI installs today. Census whether CI depends on that cache. Numbers: INC-420 (low). Queued: close-out bundle. [D2-3] [N 10-04 04:55Z]

**[4.42] The hosting support ticket for the 13-minute outage of 2026-09-27 was never reported as filed.** Cloudflare Error 1102 on the app's Worker; root cause not determinable without the platform's logs (Ray `a418db14897dca32`). Numbers: INC-298. Owner: operator. [A3] [SW-0836] [REPO action-tracker.md]

**[4.43] Staging health.** INC-318 (2026-09-28: every E2E group died with HTTP 522) is closed with no change; if "Unhealthy" returns, read Reports → Database first and decide the staging compute add-on or a lower E2E concurrency on that evidence. The 89 post-test warnings the outage left were to be read in the next nightly file and are not recorded as read. [A3] [A2]

**[4.44] Supabase log volume.** 41.8 GB against 20 GB included, mostly staging test traffic; not billed until early 2027 (ESTIMATE about 11 US dollars a month at that volume); the supervisor is to trim test log volume before 2027. [B3] [SW-1061]

**[4.45] Eleven `lovable-*` side branches stay on the remote.** Ruling: "Leave the branch in place"; every verification lists them. The detector that would flag a new stranded turn is not built ([5.18]). [B3] [REPO git branch -r]

**[4.46] The executor cannot fetch the `ci-evidence` branch by git — its remote is its own mirror and carries only its branches (dev, main, `lovable-backup-dev-*`).** Confirmed on 2026-10-05 (`git fetch origin ci-evidence` → "couldn't find remote ref"; GitHub does have the branch; the raw address answers 200). It reads the three files at `https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/…`, never `origin/main` (whose `ci-status.md` is the stale pre-DEC-098 copy). Supervisor slip (S87 in the records file): the turn 9b and turn 10 prompts said the git form; the turn 11 and 12 prompts give the raw address. `AGENTS.md:21` still gives the git form at `48d3c53b` — to be corrected in the records turn [2.3]. Every prompt must repeat the raw addresses and "read CI first". [N 10-05 01:50Z] [INC-REC] [T11] [T12] [D1-3] [D1-6] [N 10-04 00:35Z, ~18:40Z] [REPO AGENTS.md:21]

**[4.47] The executor's tool cannot apply an existing migration file on prod.** M6 had to be pasted into the ethio-prod SQL editor by the operator (the tool would have written a second file); the commit titled "Applied M6 to ethio-prod" changed only two i18n map files. An exception to "the executor applies on prod", for that case. [N 10-04 ~22:15Z, 22:50Z] [RD 7.1 C-05]

**[4.48] Staging mail.** The Ethereal credentials were repaired by the operator on 2026-10-01; if they fail again every push is red and main cannot be promoted. The launch-gate file calls Ethereal accounts ephemeral ("re-create the credentials FIRST"). [B3] [REPO launch-gate.md:46]

**[4.49] The curator's site-approval prompts on jiji.com.et.** Two fixes were offered on 2026-10-02; outcome not reported. [SW-1151] [CUR 4.2]

### 4F. Records

**[4.50] The repository's ledgers stop at 2026-09-28.** The decision ledger ends at DEC-080 ("DEC-081 reserved"), the defect ledger at INC-307 ("next free INC-308"), the newest handoff file is `2026-09-28-dec080-catalog-handoff.md`. Everything since (DEC-081 to DEC-131, INC-308 to INC-433) lives in the notes and this package. Queued: [2.3]. [REPO spec-ledger.md:1589] [REPO incidental-findings.md:2736] [D2-1]

**[4.51] Repository documents that are stale.** `docs/governance/system-state.md` (position of 2026-09-25; "Claude supervisor v1.10 · Knowledge v3.8"); `docs/governance/roadmap.md` (2026-09-02; storefront still "/@handle"); the root `roadmap.md` (its bundle 4 block is current to turn 12, but its bundle 1 lines still read "not done" against the changelog and the tests — [12.20] — and its old one-letter codes have no written spec); `docs/governance/launch-gate.md` (last changed 2026-09-17; none of the lines of section 3C); `docs/governance/instructions-amendments.md` (stops at v1.9; v1.12 is live); `docs/governance/lovable-knowledge.md` (v3.8; v3.10 is live and its text is now in the package, [12.13]); `docs/governance/handoffs/` (newest 2026-09-28); `docs/spec/spec-ledger.md` REQ-008 and Q-008 (store address `@handle`, replaced by DEC-108) and REQ-007 (amended by DEC-106); the Open questions table (no Q-018, Q-019 or Q-020 row, though the sources cite Q-018 for the 18+ rule and Q-020 for category pages as search landing pages). [REPO files named] [D1-3] [D2-1] [RD 7.1 C-18]

**[4.52] Numbers with no definition in any source.** DEC-090, DEC-101, DEC-102, INC-349, INC-352, INC-364, D67 — to be recorded as "not defined in the record". S61 is defined in the raw transcript. INC-392 and INC-394 are labels only. [A6] [B6] [D1-6] [N 10-05 00:50Z]

**[4.53] Labels that mean two things.** "G29" is (a) the class-wide fix rule carried in executor prompts since 2026-09-29 and (b) the proposed instruction amendment "walk steps state their preconditions" of 2026-09-30; neither is installed and the next instructions need two numbers. "R1…" names four different rule sets. DEC-128 / DEC-129: the notes write "L1 APPROVED (DEC-128/129)"; the records give the age rule to DEC-128 and spec L1 to DEC-129. [B6] [D2-6] [RD 7.1 C-01]

**[4.54] Lines missing from the repository's own running records.** Closed by turn 10: `docs/_changelog.md` now has lines for M1 (`b9aa66a4`), M2 (`18556a32`), M4, M4c, M6 and M7 (lines 666–671). Still missing at `48d3c53b`: `docs/features/*.md` has no section of its own for bundle 3's security part, contact step or seller-name rules (the bundle 3 brief's scope included them; the only mention is the name-fold paragraph inside the bundle 4 section at `posting.md:1227`); `AGENTS.md` has no line for the market-neutral wording rule (DEC-094, "Part T2") and still carries the wrong CI line ([4.46]); `docs/features/posting.md:1079` still reads "Yes/no pins are deferred to W4b". [D1-3] [B3] [A1] [REPO docs/_changelog.md:666–671; AGENTS.md; docs/features/posting.md:1079, 1227]

**[4.55] Action-tracker lines that no longer describe the state.** "D62 spec … NEXT" (built as DEC-081); "Turn C (INC-295): finder rebuild off the request path; heartbeat row" (built: the sweep job and `catalog_find_sweep_runs`, see [12.9]); the INC-298 ticket line [4.42]; the D63 and D53/D56 spec lines ([6.9], [6.10]) still stand. [REPO action-tracker.md]

**[4.56] Rulebook versions and uninstalled amendments.** Live: supervisor instructions v1.12, executor Knowledge v3.10 (its text was handed over by the operator on 2026-10-05 and is in the package; the repository mirror is v3.8). Proposed and never installed: instructions v1.13 and Knowledge v3.11 (the S43 proposals of late September: the flake-ledger read; "one local suite; identity picks; price basis"), both G29 texts, and the candidate amendments collected in `rules-and-directives.md` PART 4. Installed wording that practice has overtaken: G24 / Knowledge A7 on the local run (since 2026-10-03 the local run is the changed specs only and CI is the full proof), §8 on where CI evidence is read (now the `ci-evidence` branch). Owner: supervisor proposes, operator installs. [A6] [RD 7.1 C-13, C-14, C-18] [REPO system-state.md:76]

**[4.57] Memory files and Project documents that are out of date.** The project memory files `governance-laws.md`, `ways-of-working.md`, `product-decisions.md` (full; superseded lines listed in `rules-and-directives.md` 7.3) and `index.md`; the Project description (v0.1, payments era) and the three attached Project documents (instructions v1.8, Knowledge v3.6, handoff 2026-09-02). [RD 7.3]

**[4.58] (closed) The record for 2026-10-01 → 2026-10-03 (records-C) now exists** (`package/drafts/records-C.md`: DEC-099 to DEC-105, INC-377 to INC-394, ACT-G1 to G4, the REQ-007 / REQ-008 amendments, bundles 1 and 2, curator batches 12 to 19). Its PART 6 answers two points the neighbouring records left open: the red-before-fix runs for PW-94 and PW-106 to PW-109 WERE delivered before bundle 1 closed (executor report of 2026-10-02 12:10, upload `e998a73e`); no ADOPT statement for the account pool exists through 2026-10-04. [C6]

**[4.59] Material no source could read.** The supervisor's replies at chat turns 923–925 (the widened Cycle 27 brief with its classes A–L and the first statement of the class-wide rule); turn 1376; tool outputs inside supervisor turns; the curator Project's own instruction (its §7, §9, §10); the executor's own report on the DEC-099 landing; the text of Knowledge v3.9 (v3.10 was recovered on 2026-10-05 and the v3.9/v3.10 amendments are derived from its diff against v3.8). [A6] [B6] [C6] [D2-6] [RD 7.4] [N 10-05 01:20Z]

**[4.60] Heal the non-monotonic migration mark.** See [1.2]. Numbers: INC-433 (low; registered in [INC-REC], status OPEN). Queued: the next migration (the records file says the engine batch; the earlier note L1's first) and the mark rule into the brief, `AGENTS.md`, Knowledge and `scripts/check-migrations.sh`. [INC-REC] [N 10-05 02:20Z]

**[4.61] The board is red until the run on `48d3c53b` reports.** Sequence: `a36ddba3` (mid-turn, run 37254477338: the staging-apply window of M7 and two format findings — closed with turn 10's final commit); `a17b227c` (turn 10, run 37256219728: LT-13 mobile-360 shard 1, the INC-334 chronic class made frequent by LT-15 in the same file; everything else green; fixed in turn 11); `70e16ea5` (turn 11, run 37264070069: CT-19 mobile-360 shard 1, INC-437; 1,187 passed, 0 flaky; fixed in turn 12). None was platform-origin; each was a test. Rule: a red board is never left standing while other work proceeds (§8); the fix-first rule applies to `48d3c53b` if it is red. [CI-EV ci-status.md; e2e-last-failure.md] [N 10-05 03:35Z, 05:30Z] [T11] [T12]

### 4G. Added at this compile (2026-10-05)

**[4.62] CT-19 asserted a shared roster's totals from a constant row (INC-437) — fix on dev, CI pending.** Defect, cause and fix as in [1.1]: the scratch root's file row carried the constant `display_order "2000000"` (the INC-383 fix) and the test asserted the preview's totals; a parallel import's ordering pass renumbered the root. Fix (turn 12, `48d3c53b`): the row is built from the root's current stored cells read through the service client at build time, in CT-19 and at the two other places that held the literal (CT-35 among them per the changelog line); CT-19 asserts its own rows' planned actions; class rule in the file header (a sibling of G28, "no page-position assertion on a shared roster"). Status in the records file: "fix in flight (turn 12)". Numbers: INC-437; run 37264070069. Owner: supervisor (verify), CI. [INC-REC] [T12] [REPO e2e/admin-categories-lifecycle.spec.ts:37–38, 893, 911; docs/_changelog.md:677]

**[4.63] Two tests reached three flakes in seven days without an incident number.** The flake ledger (DEC-030 law: three flakes in seven days ⇒ an INC and root-cause work) shows PW-76 ("a detail the model pins to one value is filled and hidden, and still reviewed", DEC-085) flaky three times on 2026-10-04 (twice in shard 5, once in the fast lane) and CO-4 ("open and close: opening publishes the market's tree") on 09-28, 10-01 and 10-04; PW-55 also has three lines (10-01 ×2, 10-04) and INC-430 records its failure as "never explained"; TR-29 has three (INC-345, already parked). No source registers an INC for PW-76 or CO-4; the automatic listing that would have shown them is not built ([4.32]). Owner: supervisor (register or rule). Queued: the flaky-test turn [4.30]. [CI-EV flake-ledger.md] [D2-3]

**[4.64] The nightly E2E run of 2026-10-04 is red and unruled.** Run 37188134063 on `c6595265` (08:12Z) parsed zero tests in both sources: the runner died in global setup on "STAGING BEHIND: apply 20261004072852_d59800cd … to ethio-staging" — the bundle 3 migration of that morning had been applied on prod but not yet on staging when the nightly fired (the half-landed window the supervisor instructions call PLATFORM-ORIGIN, "closes with the completed landing"). No source mentions this run. The next nightly (cron 06:00Z, 2026-10-05) is the check. Owner: supervisor (read `nightly-status.md` after 06:00Z; rule). [CI-EV nightly-status.md; nightly-last-failure.md:100–118] [REPO .github/workflows/nightly-e2e.yml:7]

---

## 5. DECIDED, NOT BUILT

Every decision, operator ruling or requirement that awaits a build. Items already described in section 2 are named here in one line with a pointer, so that this section is a complete index.

### 5A. Decisions of 2026-10-04 (legal) — all queued in section 2

**[5.1] Build the 18+ rule and the versioned legal documents with recorded acceptance and publishing certification.** DEC-128, DEC-129 → L1 [2.8]. Owner: supervisor spec, executor.

**[5.2] Build retention and the My ads screens.** DEC-130 → L2 [2.9].

**[5.3] Build the Report button, the "Your data" page, the price table and the posting on ethio.com's own channels.** REQ-026, REQ-012.4, DEC-131, ACT-G2 → [2.10], [2.11], [2.12].

**[5.4] Add gambling, betting and lotteries to the banned-everywhere list and screen for them.** Operator: "BAN THEM" (2026-10-04). The line is in the draft Terms 4; REQ-028 has not been amended; the screening rule follows "when moderation is built". Numbers: REQ-028. Queued: the record line in [2.3]; the rule with [5.25]. [D2-1] [N 10-04 ~22:55Z] [RD P2-013]

### 5B. Contact, seller name, store (decisions of 2026-10-02/03)

**[5.5] Give buyers the "Show contact" button.** Contact channels and exact pins are for signed-in buyers only (DEC-106); the door `reveal_listing_contact` is built and tested (each first look recorded, a per-account daily limit), but no screen calls it because the public ad page does not exist. No public phone option and no e-mail channel for now. Numbers: DEC-106, REQ-007. Queued: with the public ad page [2.23]c. [D1-1] [D1-3] [SW-1196]

**[5.6] Finish the seller-name rules' human side.** Built: the rules, the reserved list, suggestions, the change limits (DEC-107). Not built: the request button "This is my organisation, request it" (it lands in the admin inbox of [2.20]); the verified badge; an admin path that gives a protected organisation its own BUSINESS name (the admin can assign a reserved seller name today, with reason and audit); AI-made name suggestions (wait for the AI switches page [2.16]; today suggestions come from the seller's name and the category word, and only from a name typed in Latin letters); a way to load corrections to the reserved list (the operator was told corrections "can be loaded later"; no method is described). Numbers: DEC-107, REQ-008, REQ-028, Q-009, Q-011. [D1-1] [D1-3] [SW-1196] [RD P2-058, P2-118]

**[5.7] Build store pages at ethio.com/<name>.** The seller name is the address, at the root, replacing ethio.com/@name; the guard is built (`scripts/site-words.txt`, `scripts/check-root-routes.ts`, the nightly 'seller-name-sweep'). Not built: the store page route (optional, for any seller), public links on it (website, channel, social page), the business type and city in its title, how to tell a Telegram channel from a personal account when a link is entered, the seller's shop or office shown on the seller card and store page, "closed / reopen" states (REQ-027). "Lovable has to confirm how the router orders this when it is built" (site pages must win). Later, with verified businesses: revisit a public phone option; let a verified business show its registered name even if it contains "ethio". Numbers: DEC-108, REQ-008, REQ-027. Spec owed. [D1-1] [SW-1196] [RD P2-153, P2-160, P2-188]

**[5.8] Make the repository private at launch.** DEC-116 → [3.26].

**[5.9] Home-country change from Settings, with its limit.** The rule (editable, once every 30 days, full country list) and the door exist; the Settings screen does not → [2.18]. Numbers: DEC-068. [D1-3] [RD P2-117]

### 5C. The wizard and the catalogue engine

**[5.10] Lifetime of an ad by plan level, and the "still available?" reminder.** Bundle 4 built: no end date by default, the seller's own date, a category limit (DEC-117). The admin control "depending on the level or type of advertisement" waits for [2.16]; reminders for [2.21]. [D1-1]

**[5.11] The catalogue rows that use the new engine.** The engine is built (DEC-121 price-page key families, DEC-122 a second pricing basis under a condition, INC-374 settled ranges, INC-381 two-answer conditions, DEC-124 the two tokens — door in M6, screens in turn 9b at `24d401f5`); no live catalogue row uses any of it yet → [7.3]. C30 will be the first delivery to use a condition on a tick-list answer (Delivery Included when `local_delivery` is ticked), which the supervisor checked as supported by the door and the screen ([1.3]). [N 10-05 05:45Z]

**[5.12] Market-neutral wording beyond the token.** DEC-094's `{country}` token covers the "Class A" rows; per-market presets, units and the "Class B" rows are not built and not scheduled → [2.22], [7.8]. The `AGENTS.md` line for the wording rule is missing [4.54]. [B3] [CUR 3.8]

**[5.13] Remove the six CI evidence files from dev (DEC-098 stage 2).** Stage 1 (reports published to the `ci-evidence` branch) is adopted. Stage 2: delete the six files from dev with their `paths-ignore` and `.prettierignore` lines. The roadmap reads "awaits ADOPT" although stage 1 was adopted on 2026-10-01/02; the ADOPT it means may be the account pool's. Numbers: DEC-098. Queued: close-out bundle. [B3] [B6] [REPO .github/workflows/ci.yml:10–14]

**[5.14] The feed's "negotiable only" filter chip.** The deferred piece of DEC-081; waits for the feed-filters spec (no filter surface exists). With it, recorded for the same build: where "Sale or Rent" is hidden nothing is stored, so a "For Sale" filter must count "no answer" as a sale. [A1] [B3] [SW-0836] [SW-1016]

**[5.15] Guest order from the `secondary_parents` cell order.** The order of the cell becomes the order of a host's guest categories. Spec not written; the curator's guest-order cells wait on it. Numbers: D63. [A3] [REPO action-tracker.md]

**[5.16] The rest of the publish-attestation ruling.** D66 asked for a statement stored on the listing with a `policy_version`, a `rights_basis` door rule for digital copies of creative works (today enforced only by narrowing the options in the catalogue), and the "Prohibited & Restricted Items" policy with screening terms. Bundle 4 built a no-tick line and `listings.attested_at`; L1 replaces that with the certification. Still nowhere: the door rule and the stored policy version (`policy_version` appears nowhere in the repository); the policy is [3.46]. Numbers: D66. [A3] [A1]

**[5.17] Admin › Services: every outside service tracked for health and cost.** One admin page with a row per outside service (Supabase, Google Gemini, Resend, the map tiles, and the others found in code): status and last check, error rate, usage against the free allowance, estimated cost against a budget, which backup is in use, and warnings before an API key expires. Approved by the operator on 2026-09-30 ("approve both above"; he had asked for "a way to see on admin side if one is working and tracking cost"); never specified or built; it was queued after the flaky-test turn and appears in no later queue. The map route already writes a fallback log line for it to count (`src/routes/api/map/tiles.ts:113`). Numbers: DEC-091. Owner: supervisor to spec. [B3] [B1] [SW-0971] [RD P2-070, P2-183]

**[5.18] The stranded-turn detector.** A signal-only section in the CI status report listing every remote `lovable-*` branch whose tip is not an ancestor of dev, minus an acknowledged list. Decided 2026-10-01 after three executor turns landed on side branches; not built; the cause was removed by DEC-098 stage 1; the seed list must now include an eleventh branch (`lovable-sync-1790889145`). Numbers: DEC-096. Queued: with DEC-098 stage 2. [B3] [B1] [SW-1061]

**[5.19] The installable app (PWA).** Manifest, icons, offline shell, the project's own "Install" button, an "Open in Chrome" nudge for the Telegram and Facebook in-app browsers, a one-line iPhone hint. The supervisor said on 2026-09-28 it would move it up the queue, "before launch and ahead of any push-notification work"; ESTIMATE one or two executor turns. Nothing is built (`public/` holds only `favicon.ico`, `i18n-usage.json`, `robots.txt`). Later options noted: a Play Store listing through a Trusted Web Activity; an iOS App Store shell only if diaspora iPhone use demands it. Numbers: REQ-039. Spec owed (Pass-2 at build time). [A3] [SW-0881] [REPO public/] [RD P2-146]

**[5.20] "W4b": the rest of the settled-facts rule.** A turn named W4b was planned on 2026-09-29 and never issued: (1) a catalogue format and door support for a locked yes/no fact, and the form hiding it once set (307 such facts were counted, 306 of them "dual SIM"; the curator holds 12 fasting-friendly locks for it); (2) fill-and-hide for a link scope that leaves one value; (3) the parent link in the posting schema, so a big dependent list loads only when its parent is answered and only the chosen series' models are read (the phone model list is about 169 KB raw; the logged deviation of INC-336). Numbers: DEC-085, INC-336. Queued: nowhere since 2026-09-30. [A3] [A1] [SW-0926] [CUR 3.8]

**[5.21] A "not in" condition for `visible_when`.** Needed to hide Size for shemma fabric; queued at low priority on 2026-09-29; the "One Size" prefill stands meanwhile. No later word; `src/features/posting/visible-when.ts` has no such form. [A3] [SW-0926]

**[5.22] Platform Controls, Photo Studio, price drops and sales, several sizes.** D69 (with D64), D65, D68, and the multi-size ruling → [2.16], [2.17], [2.19].

**[5.23] Commercial rent "per m² per month".** Needs a change to DEC-079 (a period on a unit basis); deferred 2026-10-01; "Tell me if you want it sooner" was not answered. [B3] [CUR 3.8]

**[5.24] An Ethiopian-calendar expiry entry.** Operator, 2026-09-25: sellers may need to enter an Ethiopian-calendar expiry as well as a European one. No later record; nothing in the code or `docs/features` mentions it. Status unknown. [RD P2-036]

### 5D. Visibility, screening, later eras

**[5.25] What the screening build must do (recorded, no build).** Before publishing (REQ-021): every write-in, every typed field and every multi-choice Other text is screened (sanitised, security-screened, appropriate, correct), with the phone-number check; the lines kept out of the catalogue are blocked at posting ("the list is recorded for it"); the alcohol word list of the C28 note; the gambling rule [5.4]; khat prohibited platform-wide; photos AI-reviewed for policy and for matching the category; a write-ins report (each answer and its frequency) with the admin review console, and only screened text is promoted to a real option. Design of record: `docs/governance/moderation-design.md`. Numbers: REQ-021, REQ-010, REQ-028, DEC-060, DEC-100. [B3] [SW-1016] [SW-1106] [CUR 3.10] [RD P2-085, P2-107]

**[5.26] Share buttons and link previews.** Buttons for Telegram, WhatsApp, Facebook and copy link at the end of posting and on every public ad page, with a preview card (photo, title, price, city); the seller taps, nothing posts automatically; only listings that passed screening are shareable. Rides the public ad page. Numbers: ACT-G1. [REPO visibility-plan.md:7–12] [REPO action-tracker.md] [RD P2-125, P2-126]

**[5.27] One share-size image per listing, with the title as each picture's text alternative.** Visibility rule R4, "decided now" on 2026-10-02 for the photo step; nothing in the code shows it built. (R3, the title built from answers, is built; R1 and R2 are standing rules: slugs and option values never change once public; no hand-written search text per category.) [REPO visibility-plan.md:19–22] [RD P2-124a]

**[5.28] Search-engine rules for the browse phase.** R5 the place in the URL (category × city pages; a permanent id plus readable words; one preferred address); R6 server-rendered lists, ad pages and shop pages with real titles, structured data, a sitemap; R7 only make, model and brand filter pages indexable; R8 a sold or removed ad keeps its page for a period and shows similar ads. Category pages as search landing pages (Q-020) are parked for the same step. Numbers: ACT-G3, Q-020. Queued: the U7 spec. [REPO visibility-plan.md:24–29] [SW-1016] [RD P2-120]

**[5.29] The accessibility check must cover the public ad page and the seller store page in the turns that build them.** Numbers: DEC-084. [A3]

**[5.30] Requirements of the ledger that no build has reached.** Listed from the repository's roadmap, gap register and system state, and from the census of 2026-10-04 — not from a code audit of each requirement: REQ-021 screening gateway (a pass-through stub today) with REQ-009/010/011 enforcement, audit queue (Q-012) and appeals; REQ-022 the rest of the lifecycle (My listings, purge); REQ-023 home ranking and REQ-005 feed widening (Q-005 thresholds open); REQ-025 search (cross-language, typo and transliteration tolerance) and filters; REQ-004 translation of user content; REQ-018 converted prices (rate source not chosen); REQ-026 messaging, block and report; REQ-027 identity display and store states; REQ-008 store pages; REQ-024 promotion records and duplicate-listing detection; REQ-031 notifications; REQ-032 backups, restore drills, watchdogs; REQ-033 partition rehearsal; REQ-034/035 legal pages and the Ethiopia compliance matrix; REQ-012.4 data rights; REQ-037 CAPTCHA; REQ-039 PWA; REQ-040 error monitoring; DEC-012's deferred doors (Telegram sign-in, device/session list, multi-door settings); DEC-021 full impersonation; Q-007 (does any business category need identity verification before posting) open. [REPO docs/governance/roadmap.md] [REPO gap-register.md] [REPO spec-ledger.md:423–446] [D2-1]

**[5.31] The C30 rulings of 2026-10-05 — decided by the operator, rows not yet delivered.** Plan yes; the built title for the leaf becomes the diet alone; name proposal 1 (rename `event-venues` → "Hall & Venue Rental" / «የአዳራሽ ኪራይ»; Events & Catering keeps its name and takes the six dish rows); Food Type names A (Fasting Food / Non-fasting Food / Fasting & Non-fasting Food); a condition may read a tick list. His product direction in his own words is saved in `c30-curator-prompt.txt` (fish set apart because "some consider as fasting and some don't"; butter makes a dish non-fasting; agelgil as the unit with weight or persons served; a minimum-order count 1–1,000; cooked food is not shipped internationally; "delivery included" only with delivery). Nothing is built; the rows are the curator's ([1.3], [7.1]); no app change is recorded as needed. Numbers: C30; INC-434 (prerequisite, fixed). [C30] [N 10-05 03:35Z, 05:45Z]

---

## 6. SPECS OWED

Everything the supervisor must write before the executor or the curator can act, with what exists already. "Pass-2" is the project's name for the detailed, approved build spec that precedes an execution prompt; "approved in chat" means the operator agreed to a shorter text in conversation and the detailed spec is still to be written and imported. The order of 6A follows section 2; 6B lists decided items that are not yet scheduled; 6C lists rulebook and ledger texts.

### 6A. For the ordered plan

**[6.1] Write the Pass-2 spec of L1 (the legal section) and import it.** Exists: spec L1 version 2 (approved by the operator 2026-10-04 17:11 local with "approve. also make sure that we record in each user profile for the version agreeing terms of service"), the version 1 text, and five additions files (the settings rule, the company state and Ethiopia entity, the "act without notice" peer comparison, the review of the 2020 documents, the settled points), all verbatim in `package/drafts/specs/`. Owed: the detailed spec with the admin screens, the tables (documents, versions, acceptances, certifications, legal settings), the doors and their deny-cases, the three sign-in doors' flows, the harness change for test accounts "accepted by default" with its own decision record, the first migration's INC-433 heal, and the forward-scan against later REQs. Numbers: DEC-128, DEC-129, REQ-034, REQ-028, Q-018. Owner: supervisor. Queued: [2.8]. Waits on: nothing (the operator's two open points [8.24], [8.26] can be carried as defaults — the spec leaves the IP out and says 30 days). [D2-1] [D2-3] [PKG specs/2026-10-04-l1-legal-spec-v1-…md, …-v2-…md, 2026-10-04-legal-*.md] [N 10-04 ~21:15Z → ~22:55Z]

**[6.2] Write the Pass-2 spec of L2 (My ads with retention).** Exists: the research-and-proposal text approved in chat (`specs/2026-10-04-l2-retention-research-and-proposal.md`) and the operator's answers (messages follow the ad rules: 12 months after deletion, and until a report, dispute or official request closes plus 3 years). Owed: the screens (the seller's list, mark sold, relist, renew, delete), the state machine for sold / expired / deleted / held, the archive and its access rule, the purge job with heartbeat (auth session and audit rows included), the settings rows for every period, the tests. Numbers: DEC-130, REQ-022, Q-012, U6 E1/E2. Owner: supervisor. Queued: [2.9]. [D2-1 DEC-130] [D2-3] [PKG specs/2026-10-04-l2-retention-research-and-proposal.md]

**[6.3] Write the specs of the Report button and the "Your data" page.** Exists: the settled points (reasons include "appears to be under 18" and copyright; identity confirmed by a fresh sign-in; the hand path through legal@ and privacy@ until built). Owed: both specs; the Report flow must say where reports land (today nothing holds them — the admin inbox of [6.18] is the recorded candidate for structured messages) and how they meet the moderation console (REQ-021) when it exists. Numbers: REQ-026, REQ-012.4. Owner: supervisor. Queued: [2.10]. [D2-1] [D2-3] [N 10-04 ~22:10Z] [PKG specs/2026-10-04-legal-settled-points-…md]

**[6.4] Write the spec for posting ads on ethio.com's own social channels.** Not started; first check each service's rules on automated posting (Telegram bots, WhatsApp, Facebook pages); note the EU and UK right to object; design of record is the visibility plan §1 (own Telegram channels by category and city; the bot posts every approved listing and marks or removes it when sold). The operator's reading question [8.27] is open. Numbers: ACT-G2. Owner: supervisor. Queued: [2.12]. [D2-3] [N 10-04 ~22:05Z] [REPO docs/governance/visibility-plan.md:7–13] [RD P2-127]

**[6.5] Write the price-table spec (DEC-131).** Up to six lines per ad, each a short label or "serves N" with an amount; lists show "from" the lowest; one ad per size until then. Must say how the title rule (DEC-111, no price in the title) and the "from" display meet the feed and the review page, and what the curator's `pack_quantity-serves` row becomes. Owner: supervisor. Queued: [2.11]. [INC-REC] [CUR 3.9] [RD P2-163]

**[6.6] Write the close-out bundle brief (bundle 5).** Contents in [2.13]. Its first step is a truth pass of the old one-letter lines against the changelog and the tests ([12.20]), because "no written spec I could recover" is the recorded state of S1, S2/S3, T, A, B, C and Part O. Owner: supervisor. Queued: [2.13]. [D2-3] [SW-1286] [REPO roadmap.md:9–30]

**[6.7] Write the executor half of the engine batch.** The curator's engine batch ([7.3]) is data; three executor items ride beside it and have no prompt: the Amharic number-unit labels (words such as "people", "guests", "days" print in English on Amharic screens — seen live on the C29 rows), the INC-433 heal migration ([1.2]) if no other migration comes first, and any door change C30 or the rent/hire rows turn out to need (none is recorded as needed; the tick-list condition was checked as working). Owner: supervisor. Queued: after C30 ([2.5]). [N 10-05 01:55Z, 05:45Z] [INC-REC] [CUR 3.8]

**[6.8] Write the handover document and the import prompt of the records package.** The handover: HEAD SHA, phase and gate state, the in-flight prompt, the open questions with owners, the next action; imported to `docs/governance/handoffs/` (newest file there is `2026-09-28-dec080-catalog-handoff.md`). The import prompt: file-by-file scope, sha256 per file, "no other file", no migration rides it, so no apply-pairing line. Owner: supervisor. Queued: [2.3], [2.7]. [D2-1] [SW-SUPP] [REPO docs/governance/handoffs/]

**[6.9] Write the D63 guest-order spec.** The order of a host category's guest categories (a leaf shown under a second parent) becomes the order of the `secondary_parents` cell; the curator's guest-order cells wait on it. Not written since 2026-09-28; the action tracker still lists it. Numbers: D63. Owner: supervisor. Queued: nowhere. [A3] [SW-0836] [REPO docs/tracking/action-tracker.md]

**[6.10] Write the D53 and D56 specs (catalogue-facts collapse; recents and favourites).** Named in the queue of 2026-09-27/28 ("then Turn C and D53/D56 specs"); the action tracker still carries the lines; no later source mentions either. What D53 and D56 say in full is in the repository's ledger, not in the sources read here. Owner: supervisor. Queued: nowhere. [SW-0836] [A3] [REPO docs/tracking/action-tracker.md]

### 6B. Decided, not specified, not scheduled

**[6.11] Spec the posting-limits bundle (D69 Platform Controls, with D64 the AI switchboard).** One admin page for lifetime by plan level, sale and discount windows, photos per posting per plan, on/off switches for every AI feature; AI-made seller-name suggestions wait for it (operator "ok", 2026-10-03). "Each needs a short spec session" with the operator. Owner: supervisor. Queued: [2.16]. [A3] [D1-3] [D2-3] [RD P2-155, P2-156]

**[6.12] Spec D68 price drops and sales.** A seller never types the "was" price; a duration and a ribbon; the 7-day and 30-day numbers become D69's seeded defaults. Owner: supervisor. Queued: [2.19]. [A3] [RD P2-159]

**[6.13] Spec D65 Photo Studio (the photo clean-up bundle).** Camera capture, automatic clean-up, optional AI improvement, AI screening of photos, real photos on the public card (the ribbon hides by the existing rule once `listing-picture` receives the photo); the one decision it needs is spend per background removal (ESTIMATE one or two cents per photo; approved in principle behind the AI switch). Owner: supervisor. Queued: [2.17]. [A3] [D2-3] [REPO roadmap.md:58]

**[6.14] Spec the remainder of D66 (publish attestation).** The `rights_basis` door rule for digital copies of creative works (today enforced only by narrowing the options in the catalogue) and a stored `policy_version` (the string appears nowhere in the repository); the certification itself moves to L1. Owner: supervisor. Queued: nowhere; the policy text is [3.46]. [A3] [A1] [REPO grep policy_version]

**[6.15] Spec the installable app (REQ-039) at build time.** Manifest, icons, offline shell, the project's own "Install" button, an "Open in Chrome" nudge for the Telegram and Facebook in-app browsers, a one-line iPhone hint; `public/` holds only `favicon.ico`, `i18n-usage.json` and `robots.txt`. ESTIMATE one or two executor turns; "before launch". Owner: supervisor. Queued: [5.19]. [A3] [SW-0881] [REPO public/]

**[6.16] Spec Admin › Services (DEC-091).** One page with a row per outside service (Supabase, Google Gemini, Resend, the Esri map tiles, the others found in code): status and last check, error rate, usage against the free allowance, estimated cost against a budget, the backup in use, warnings before an API key expires (the Esri key expires at most one year after 2026-09-30). Approved 2026-09-30, never specified. Owner: supervisor. Queued: [5.17]. [B3] [B1] [RD P2-070, P2-183]

**[6.17] Spec DEC-098 stage 2 with the DEC-096 detector.** Remove the six CI evidence files from dev with their `paths-ignore` and `.prettierignore` lines; add a signal-only section to the CI status report listing every remote `lovable-*` branch whose tip is not an ancestor of dev, minus an acknowledged list (eleven branches today). Owner: supervisor. Queued: [2.13]. [B3] [B1] [REPO .github/workflows/ci.yml:10–14; git branch -r]

**[6.18] Spec "request a missing place" and the admin inbox for structured messages.** A control on the place step; an admin page of requests; the same inbox behind a Contact us page and the reserved-name request button ("This is my organisation, request it"); limits and screening because it takes typed text. Owner: supervisor. Queued: [2.20]. [SW-1196] [C3] [RD P2-161]

**[6.19] Spec the store page at ethio.com/<name> and verified businesses.** The route; public links (website, channel, social page — screened when saved; how to tell a Telegram channel from a personal account); the business type and city in the title; the shop or office on the seller card and store page; "closed / reopen" states (REQ-027); the router must let site pages win over seller names ("Lovable has to confirm how the router orders this when it is built"); the verified badge; an admin path that gives a protected organisation its own business name; a verified business showing a registered name that contains "ethio"; a public phone option revisited then. Numbers: DEC-108, REQ-008, REQ-027. Owner: supervisor. Queued: [2.23]e. [D1-1] [SW-1196] [RD P2-153, P2-160, P2-188]

**[6.20] Spec the public ad page with "Show contact", real photos on feed cards and share buttons (ACT-G1).** The door `reveal_listing_contact` is built and tested; the page does not exist; share buttons for Telegram, WhatsApp, Facebook and copy link with a preview card (photo, title, price, city); the buyer safety line of L1; the accessibility check joins the roster in the turn that builds it (DEC-084); one share-size image per listing (visibility rule R4) is not built. Owner: supervisor. Queued: [2.23]c; browse phase U7. [D1-3] [REPO docs/governance/visibility-plan.md:7–12, 19–22] [A3]

**[6.21] Spec the screening step and the moderation console (REQ-021).** Must hold: every write-in, typed field and multi-choice Other text screened before publishing with the phone-number check; the kept-out catalogue lines blocked at posting; the curator's alcohol word list (C28 note §8); gambling, betting and lotteries (REQ-028, operator "BAN THEM"); khat; photos reviewed for policy and category; the write-ins report; promotion of screened text to a real option; the dials table, the weekly calibration sample, first-round appeals, the hold notification, the severe-category list ([3.14]). Design of record: `docs/governance/moderation-design.md`. Owner: supervisor. Queued: [2.23]a. [B3] [SW-1016] [SW-1106] [CUR 3.10] [D2-1] [N 10-05 01:55Z]

**[6.22] Spec messaging with e-mail notices (U8).** The contact step promises "We email you when a message arrives"; messaging, block and report (REQ-026) and notifications (REQ-031) are not built; the promise must be kept or the line removed before launch ([3.28]). Owner: supervisor. Queued: [2.23]d. [D1-3] [RD P2-115]

**[6.23] Spec the Settings bundle.** Profile, contact channels and home country edited outside an ad; the door `change_home_country` exists (editable once every 30 days, full country list — DEC-068). Owner: supervisor. Queued: [2.18]. [D1-3] [RD P2-117]

**[6.24] Spec several sizes on one ad.** The engineering census exists (W7 Part D); the curator's proposal was asked 2026-09-29 and never came; no decision. Owner: supervisor with the curator and the operator. Queued: [2.19]. [B3] [SW-0971]

**[6.25] Spec expiry notices and the "still available?" reminder.** A setting once notifications exist. Owner: supervisor. Queued: [2.21]. [A3] [RD P2-157]

**[6.26] Spec the feed filters.** Includes the deferred "negotiable only" chip of DEC-081 and the rule that where "Sale or Rent" is hidden nothing is stored, so a "For Sale" filter counts "no answer" as a sale. Owner: supervisor. Queued: browse phase U7. [A1] [B3] [SW-1016]

**[6.27] Write the browse-phase (U7) spec with the search-engine rules R5–R8 and Q-020.** Category × city pages with a permanent id plus readable words and one preferred address; server-rendered lists, ad pages and shop pages with real titles, structured data and a sitemap; only make, model and brand filter pages indexable; a sold or removed ad keeps its page for a period and shows similar ads; category pages as search landing pages (Q-020); cross-language, typo and transliteration tolerance (REQ-025) — with the note from C29 that the fasting facet should read the Food Type, not a prefilled tick. Numbers: ACT-G3, Q-020, REQ-025, REQ-023, REQ-005. Owner: supervisor. Queued: U7. [REPO docs/governance/visibility-plan.md:24–29] [SW-1016] [N 10-05 01:55Z]

**[6.28] Decide and spec DEC-089 (a country-localised catalogue in two data layers).** A proposal of 2026-09-29 parked by the operator for a later discussion ("LATER"); the ETB fallback at `pricing-data.ts:196` and 11 help texts naming Ethiopia were its examples. Owner: supervisor to re-raise. [A3] [SW-0926]

**[6.29] Amend DEC-079 for commercial rent "per m² per month".** A period on a unit basis; deferred 2026-10-01; "Tell me if you want it sooner" unanswered. Owner: supervisor. Queued: with the engine batch at the earliest. [B3] [CUR 3.8]

**[6.30] Spec the cheaper CI shape, if the operator accepts it.** See [2.15], [8.29]. [SW-SUPP]

### 6C. Rulebook and ledger texts

**[6.31] Produce the full text of supervisor instructions v1.13.** Partial output exists (`instructions-v1.13-amendments.md`, 54 KB). It must carry: the two "G29" texts under two numbers (the class-wide fix rule carried in executor prompts since 2026-09-29, and "walk steps state their preconditions" of 2026-09-30); the S43 proposals ("one local suite; identity picks; price basis"); the candidate amendments of `rules-and-directives.md` PART 4; the bundle 4 class rules of [2.3]; the overtaken wording of G24 / Knowledge A7 (the local run is the changed specs only since 2026-10-03; CI is the full proof) and of §8 (CI evidence on the `ci-evidence` branch, raw addresses). Owner: supervisor proposes, operator installs. [A6] [B6] [RD 7.1 C-01, C-13, C-14] [RD PART 4]

**[6.32] Produce Knowledge v3.11 and land the v3.10 mirror.** The live text v3.10 is in the package; the repository mirror is v3.8; the v3.9/v3.10 amendment records are derived from the diff; v3.11 must add the executor-side rules of bundle 4 (raw CI addresses; the mark rule; WHERE-less DELETE; proof rows; Amharic listed key by key; file rows from stored cells; the apply-at-save fact). Owner: supervisor proposes, operator installs in the platform. [N 10-05 01:20Z] [RD 7.1 C-18] [REPO docs/governance/lovable-knowledge.md:1]

**[6.33] Write the ledger amendments.** `tos-privacy-source.md` (the list in [2.3]); REQ-028 (gambling, betting, lotteries; the buyer safety line); REQ-007 and REQ-008 (DEC-106, DEC-107, DEC-108; Q-008's answer and the store address); rows for Q-018 (the 18+ rule), Q-019 (cited nowhere by content) and Q-020 (category landing pages) in the Open questions table, which has none of them. Owner: supervisor. Queued: [2.3]. [D1-3] [D2-1] [REPO docs/spec/spec-ledger.md:423–446]

**[6.34] Rewrite `system-state.md`, the two roadmaps and `launch-gate.md`.** `system-state.md` is at 2026-09-25 ("Claude supervisor v1.10 · Knowledge v3.8"); `docs/governance/roadmap.md` at 2026-09-02 (storefront still "/@handle"); the root `roadmap.md` is the bundle 4 truth list with the stale bundle 1 lines; `launch-gate.md` last changed 2026-09-17 and has none of section 3C. Owner: supervisor drafts, executor imports. Queued: [2.3]. [REPO files named; git log]

**[6.35] Write the four-lens close-out reviews (G19) for bundles 1 to 4.** Security, functionality, performance, usability — none was written for bundle 1 and none is recorded for bundles 2, 3 or 4; the rule says no section is "done" on green checks alone. Owner: supervisor. Queued: before the era gate ([2.24]). [C6] [RD PART 4]

---

## 7. CURATOR QUEUE

The curator works one batch at a time from one message that carries fresh exports (categories, definitions, links) the operator attaches; the supervisor audits every delivery with a script before the operator imports it; import order is categories → definitions → links, then the translation approvals. Limits in force: help text ≤ 240 characters; ≤ 5 aliases per answer, each 1–32 characters; an option's `allowed` list ≤ 5 targets and ≤ 150 values each (live since 2026-10-03 — the C29 prompt still said 50); option lists ≤ 1,500 (name any list above 400 in the change note); no `settled`, two-pair conditions or tokens until told. [CUR 1.5, 1.6, 1.7] [RD 7.1 C-23]

**[7.1] Receive, audit and import C30 (the Cooked Food redesign).** Expected per the plan and the prompt: a five-file import path (the plan's words; the prompt asked for categories, definitions, links with a links pass 2 if needed, and the translations key-names file — which five the curator means is in its plan, not read here), the change note (what C29 rows are deleted, renamed or changed and the import path; the three forms after the change in C29's table form; what the Food Type list is and how it drives Dishes; at most two questions), and the usual form-path dispositions, help census and settled-to-other scan. Content ruled: `event-venues` renamed "Hall & Venue Rental" / «የአዳራሽ ኪራይ»; the three Food Type names of option A; the six dish rows with the butter pairs; `Per Agelgil` on `unit_of_sale-food`; `term_min_order_people` 1–1,000; the scoped Pickup & Shipping row; Delivery Included on a tick-list condition. End state 169 · 569 · 1,500. Audit points the sources name beyond `audit_c29.py`: the first tick-list condition (Delivery Included when `local_delivery` is ticked) — the door proves array answers through `attr_answer_tokens`, and the supervisor asked itself whether one proof test should ride the rows turn ([9.22]); the diet-only title. Owner: curator → operator → the live thread. [C30] [N 10-05 05:45Z] [CUR 1.5]

**[7.2] Hold the standing rules in the C30 and engine-batch prompts.** Fresh exports as the base; every changed cell declared; aliases Latin-only where ruled ("Eid" alias Latin only); Amharic with no unassigned or foreign code point; labels of units start with "Per " / "በ"; no fasting-friendly prefill on fasting types (ruled NO on 2026-10-05: "the type states it; a default-on claim the seller did not make"); Serves required when shown (ruled YES); Fish under the two fasting types (ruled YES; c29b imported); the party-tray label «በግብዣ ትሬይ» kept; the alcohol word list stays out of the files; Tigrinya words stay out until a speaker checks. [N 10-05 01:55Z] [C29] [C30] [CUR 1.7, 1.8]

**[7.3] Write and send the engine batch prompt (after C30).** Contents as the notes and the curator record state them: `pricing_type-rent` (per_hour / day / month / year + flat) linked to the rent, lease and hire leaves with `visible_when` offer = rent|lease|hire, `allowed_options` and a default per group, following the price-periods note (17 leaves in the notes, 18 in the message to the operator — to be settled when the prompt is written); short-term rentals `pricing_type-travel` per_night | per_month and `rental_duration` unlinked; the `term_` rows (minimum term with its own unit, advance, deposit); the held INC-374 battery batch (`settled` ranges on iPhone 18 Pro 4,056–4,288 mAh and 18 Pro Max 5,391–5,567; pins for iPhone 17 3,692 and iPhone Air 3,149; ranges for 17 Pro Max 4,823–5,088 and 17 Pro 3,988–4,252); the INC-381 rows (the Pets Life stage stand-in becomes a true hide and its informational notes go; Brand narrowed for bird, small-animal and fish food); the `{country}` token rows (`product_origin` with `origin-food` merged into it — the merge is a console step —, `condition-vehicles`, `imei_registered`, the Services exam and level wording); the 57 `{category:<slug>}` pointer lines (`c27-walk-pointer-lines-2026-10-01.csv`; "the conversion will be mechanical"). First the word that each mechanism is live ([2.5]). Owner: supervisor. Waits on: [7.1]. [CUR 3.6, 3.8, 4.1] [N 10-04 04:30Z] [N 10-05 00:12Z] [D2-3]

**[7.4] Hold the 12 yes/no locks until W4b lands.** Fasting-friendly = yes on injera (teff), injera (mixed), dirkosh, sugar, salt, kolo, roasted chickpeas, fandisha, nuts; = no on frozen kitfo, frozen tibs, chiko (Batch 1 change note). W4b ([5.20]) was never issued. Owner: curator holds; supervisor releases. [CUR 3.8] [A3]

**[7.5] Settle whether INC-381 closes DEC-088, then deliver the Net Weight / Volume hides.** DEC-088 (2026-09-29): hide Net Weight when the unit is per kg at Grains, Spices, Honey, Meat, Coffee & Tea, Beverages, Snacks, Frozen, Pantry and Other Food; Volume when per litre at Honey (oil), Meat (milk) and Beverages. INC-381 built a two-answer condition; no source says in words that it closes DEC-088. Owner: supervisor to say; curator to deliver (engine batch). [CUR 3.8, 4.2] [A6]

**[7.6] Route the curator's side products.** The six Tigrinya aliases (ጸብሒ ደርሆ, ቅልዋ, ሓምሊ, ጣይታ, ሕምባሻ, taita) → a speaker's check ([8.13]); the alcohol word list (C28 note §2.6 / §8) → the moderation spec ([6.21]); the three form requests not taken up (a delivery-fee row, an orders-close date, a starting-price tick) stay recorded, not requested; the curator's own calls stand (no "Included in the Price" row; no deposit row; an offer that includes tella or tej runs without the drink). [N 10-05 01:55Z] [D2-3] [CUR 3.9]

**[7.7] Chase the multi-size proposal.** Asked of the curator on 2026-09-29; "no reply seen". Owner: supervisor. [CUR 4.2] [B3]

**[7.8] Per-market presets, units and the Class B rows wait; the Amharic number-unit labels are an engine item.** Class A token rows are in [7.3]. The per-market list ("nothing built"): defaults 220 V (14 leaves), 380 V three-phase, EU shoe sizes, Wi-Fi-only tablets, electric cookers, locally made, rebar 12 m; units kg ↔ lb, litres ↔ US gallons, m³ ↔ cu ft, cm/mm/m ↔ inches/feet; dog size bands in kg — wait for per-market defaults. Class B (`plate_code`, `title_status`, `condo_scheme`, "libre"; ECX, MoA, Meher / Belg; the Travel candidates) waits for a second market. New since the C29 audit: number-unit words ("people", "guests", "days") print in English on Amharic screens — an engine (executor) item, [6.7], not a curator file. Units for the 12 closed countries the curator flagged stay unchanged. [CUR 3.8] [N 10-05 01:55Z] [D2-3] [SW-SUPP]

**[7.9] Research rows and evidence still open.** Block machines (power quoted 4.8 to 27 kW for the same names), tower lights, gravel 00 and 03 mm ranges, the ISUZU dump-truck load, polycarbonate sizes as sold in Ethiopia; size systems left blank (Traditional Wear, Uniforms & Workwear, Maternity & Nursing); "K60 EV" as a model (needs a battery and range source); oats as a staple; Gonfa, Dunguza, Ferikh and Tsimdi as rented garments (left as a sale; "Add any you know are rented"); `Per Carton` for Beauty; phone colours for Electronics (asked 2026-09-29, unanswered). [CUR 4.2] [B3]

**[7.10] Small recorded catalogue items, none scheduled.** D63 guest-order cells (wait on [6.9]); the icon allowlist to be given to the curator (named 2026-09-28, not recorded as sent); Vehicles' one-option `offer_type` as an unlink candidate if a walk finds it noisy; Wood & Timber's shared card slot (needs an app change, [4.25]); Other Home & Garden has no pointer line to Household & Cleaning; Derma Roller asked the leaf's Brand; a second condition scale at Health & Wellness ("not now"); "Census C1 = 64 locked categories with a basis" (changelog 2026-09-27, superseded in part by the price-periods work); the two "Event" names (fixed by C30's rename). [CUR 4.2] [A3] [B3]

**[7.11] The curator's site-approval friction on jiji.com.et.** Two fixes offered 2026-10-02; outcome never reported; fallback "https://support.claude.com is the place to ask". [SW-1151] [CUR 4.2]

**[7.12] What the curator has been told, and what it has not.** Told (C30 prompt): the C29 import is live with 0 refusals; the rules of C29's section B hold; a list fact that ticks a tick list "is being fixed this week" (INC-434 — now fixed and published); the operator's seven points verbatim. Not told: that `settled`, two-pair conditions and the two tokens are live ([2.5]); that the `allowed` ceiling is 150, not 50; the DEC-088 answer ([7.5]). [C30] [CUR 4.2]

**[7.13] Check the secondary parent of the new leaf, and keep the two-pass rule until INC-314 is fixed.** The categories importer drops `secondary_parents` on a create row ([4.20]); C29 created `cooked-food-to-order` with the secondary parent `services`; whether it landed is unrecorded ([2.4]). Until the fix, a new leaf with guests is delivered twice (create, then the cell). Owner: the live thread at the C30 audit. [A3] [N 10-05 03:35Z] [WALK]

---

## 8. WAITING ON THE OPERATOR

Every line is one action or one answer; nothing here blocks the executor's current turn unless said so.

### 8A. The working loop

**[8.1] Keep the turn loop going: paste prompts (long ones arrive as files), bring back each executor report, send "continue" only after the supervisor's check, keep the chat quiet during compile windows.** The operator asked for shorter work on 2026-10-05 ("your work is taking too long"); the supervisor answers in two lines. [N 10-05 01:40Z] [SW-1061] [SW-SUPP]

**[8.2] Apply each new migration on ethio-staging and read back the SPECIFIC mark, never `max(version)`.** The executor's tool applies on prod at save; staging is the operator's hand; since INC-433 the newest file's mark is not the ledger's maximum. [N 10-05 02:20Z] [INC-REC] [RD 7.1 C-05]

**[8.3] When the curator delivers C30, forward its files (and the exports it was built on) to the live thread for the audit; import only on the supervisor's numbered steps.** [C30] [CUR 1.6]

**[8.4] Export the Search Console Performance report again on 2026-10-05 (reminder set for 08:36 local) and send the file.** Steps the reminder carries: Search Console → ethio.com → Performance; date range 16 months; Export; send the file. Purpose: see whether the months after June 2025 filled in (the first export covered only 30 May – 18 June 2025). The reminder (`trig_016JrUYr5YK4RotRufpxno5P`, run once at 12:36Z) is bound to the OLD supervisor session, so a new thread will not receive it; if the data stays thin, the old site's top pages come from Cloudflare's traffic report instead. Leave the Search Console DNS verification record in Cloudflare; submit no sitemap until the browse phase. [LIVE] [C3] [SW-1151]

**[8.5] No further Publish or walk is asked for now.** Turn 12 changes a test file only. The bundle 4 surfaces not yet walked are listed in [1.6]; no source asks for a walk of them. [T12] [WALK]

### 8B. Legal, launch and account actions (none blocks current work)

**[8.6] Create the mailboxes legal@ethio.com and privacy@ethio.com** (and decide security@ethio.com, which the drafts name for security reports and nobody was asked to create). [D2-3] [SW-1331]

**[8.7] Register the copyright agent with the United States Copyright Office** (6 US dollars, renewed every three years; the form needs a phone — a separate voicemail number was suggested). The supervisor guides step by step at launch-checklist time ([9.14]). [D2-3] [SW-1331]

**[8.8] Have a native speaker read the Amharic legal text** (`docs/spec/legal/terms-of-service-v1.am.md`, `privacy-policy-v1.am.md` in the package). [D2-3] [SW-1331]

**[8.9] Check the spelling of "Ethio.com LLC" against the company's registration.** [D2-3] [SW-1331]

**[8.10] Look at the robots.txt report in Google Search Console** (the supervisor's reader timed out fetching the live site's robots file; that says nothing certain about Google). [D2-3] [SW-1331]

**[8.11] Proofread the Amharic column of the reserved seller-names list** (`docs/data/reserved-names-v3.csv`; 360 of 435 names are the curator's own renderings; the 223 Ethiopian rows matter at launch). The list is seeded and in use; "corrections can be loaded later" — no loading method is described. [D1-3] [C3] [CUR 3.5]

**[8.12] Native-reader checks of the catalogue's Amharic labels and aliases** owed since 2026-09-29/30 (the Food labels: የረጋ የምግብ ዘይት (የአትክልት ቅቤ), የተነጠረ ቅቤ, ጥሊሊ, የጥሊሊ ቅቤ, ፈሳሽ ዘይት, የረጋ ዘይት, የዶሮ ሥጋ, ስፓጌቲ, ቲማቲም ፓኬት, ቱና, ዱቄት; በጃር (ብልቃጥ), በሳሼ (ፌስታል), በካርቶን, ፔኔ, ላዛኛ) and, by the same rule, the C29/C30 names. "Whether a separate native check happened is unclear." [CUR 4.2] [B3] [SW-0971]

**[8.13] Find a Tigrinya speaker to check the six catering aliases** before they enter any file ([7.6]). [N 10-05 01:55Z] [D2-3]

**[8.14] Change the old WordPress site's former developer account password, or delete the account** (advice of 2026-10-02; not confirmed done). [C3] [SW-1151]

**[8.15] Keep the Supabase spend cap ON; on the Pro upgrade set the session limits of [3.8]; the Fair Use Policy applies from 2026-11-01** (the account pool must be adopted "well before November 1"). [B3] [SW-1061] [REPO launch-gate.md:12]

**[8.16] Confirm business use on Esri's free tier; note that the API key created 2026-09-30 expires at most one year later and nothing warns before it does** ([3.45], [6.16]). [B3] [SW-0971]

**[8.17] File (or report as filed) the hosting support ticket for the 2026-09-27 outage** (Cloudflare Error 1102, Ray `a418db14897dca32`, INC-298). [A3] [REPO docs/tracking/action-tracker.md]

**[8.18] The launch-gate actions that are the operator's alone:** Resend sending domain [3.1]; Cloudflare Turnstile account [3.2]; production Google OAuth client [3.3]; Supabase redirect URLs at cutover [3.4]; executor-platform project settings [3.7]; key rotation [3.16]; the DNS cutover [3.12]; trademark clearance [3.21]; the repository going private, in the stated order [3.26]; the two 2020 pages coming down [3.44].

**[8.19] Glance every week or two at GitHub Traffic (forks, stars, watchers, referring sites, `/blob` or `/tree` pages) while the repository is public.** [SW-SUPP]

**[8.20] Send the "Prohibited & Restricted Items" draft to counsel before publication; keep the lawyer's list for the Ethiopia-entity milestone** (the six points of [11.9]; not a launch blocker). [A3] [D2-3] [SW-1331]

**[8.21] Optional data clean-ups never acted on:** delete the 10 listings with region-level places (6 drafts, 4 in screening) or leave them; the 8 drafts M5 moved to step 3 pass the price page on reopening; raise the free plan's coverage limits in Admin › Locations › Coverage (the operator's numbers); 1,200 characters for the description everywhere (offered, not taken). [A3] [B3] [SW-0926] [SW-1286]

**[8.22] Install the rulebook amendments when the supervisor delivers them** (instructions v1.13 — the instructions live in the Project; Knowledge v3.11 — in the platform's Project Knowledge). G29 of 2026-09-30 has waited since then. [A6] [B3] [SW-1016]

### 8C. Questions put to the operator and not answered (none blocks work; the stated default applies)

**[8.23] Must a business also give a first and last name?** Today: no (business: business name only). [D2-3] [SW-1286]

**[8.24] Should the IP address be stored with each legal acceptance as evidence?** The spec leaves it out. [D2-3] [SW-1331]

**[8.25] "add the notice" — a short "all rights reserved, no permission granted" file in the repository?** Offered for the docs step; unanswered. [D2-3] [SW-SUPP]

**[8.26] 14 or 30 days' notice before a material change to the legal documents?** The draft says 30 (changed from 14 on 2026-10-04). [D2-3] [SW-1331]

**[8.27] Did "automatically post these in social medias … no opt out" mean ethio.com's own channels (the supervisor's reading) or the sellers' accounts?** The reading was not corrected; the Terms were written on it. [D2-3] [RD 7.1 C-20]

**[8.28] Real flag images on Windows desktop browsers (where the emoji flag shows as "ET")? "ethiopia" / "ethiopian" allowed in a seller name?** Both unanswered; both treated as no. [C3] [SW-1196]

**[8.29] The cheaper-CI offer (full suite only on the last push of each turn, or CI on the operator's machine) — wanted?** [SW-SUPP] [D2-3]

**[8.30] Small checks asked and never answered (each treated as settled unless he says otherwise):** Teff Flour asks "Made in" for diaspora buyers ("say remove"); whether "25%" meant an exact quarter width for the city line; Motorcycles with Model = Other — does Fuel Type show blank; Skincare › Moisturiser — Condition right after Volume; Wood & Timber card 3 (Thickness) only for hardwood, door frames and Other — should a new list take the card; commercial rent per m² "sooner?"; the re-check of the first Beauty import; the supervisor's reserved-names matching rulings of 2026-10-03 (whole-name matching, the claim-word rule, the 22 exempt words, the 35 extra international rows) were never acknowledged; the reading of the Kirkland ruling ("keep everything uniform" → no exception for a medicine). [RD 7.4 G-08] [B3] [C3] [SW-SUPP]

---

## 9. PROMISES THE SUPERVISOR MADE

Things the supervisor said it would do and no source records as done. "Standing" marks a practice the supervisor committed to for every turn.

**[9.1] Verify turn 12 by diff and CI, then run the records turn, then hand over.** The stated stop point ([2.7]). [N 10-05 05:45Z]

**[9.2] Rule on the category-search timing (INC-363): warm p95 306 ms at the edge against 300 ms, the database at about 11 ms.** "Closed as recorded" on 2026-10-02; the roadmap says "stopped for ruling, no ruling since"; the later notes say a ruling is owed; edge caching is the candidate ([4.14], [12.21]). [B3] [D2-3] [REPO roadmap.md:10]

**[9.3] Put an LCP budget per page class on the launch-gate list** ("rather than pretend it exists"; 2026-09-28). No such line exists ([3.22]). [A3] [SW-0881]

**[9.4] Run the read-only audit proving that no SECURITY DEFINER function skips its own permission check.** The ruling that 149 + 14 (later 161–164) linter warnings are "by design" rests on it; INC-409 was found later without it ([3.11], [4.1], [4.3]). [A3] [SW-0881]

**[9.5] Move `pg_trgm` out of `public` in the scale phase.** [A3]

**[9.6] Curator-facing promises:** tell the curator when each engine mechanism is live ([2.5]); write the engine batch prompt ([7.3]) and settle the rent/hire leaf count (17 or 18); answer whether INC-381 closes DEC-088 ([7.5]); rule on deleting the typed battery Ah key, "now unused everywhere" (asked 2026-10-01); audit C30 and give the operator its import steps ([7.1]); regenerate the form-path worklist on fresh exports with each batch. [SW-SUPP] [CUR 4.2] [A3]

**[9.7] The after-every-cycle catalogue check and the standing iPhone 13 test** ("Apple → iPhone 13 → iPhone 13 asks only storage, colour and the seller's own questions"; promised 2026-09-29; the audit scripts' count (a) is the check in use; no standing test on real rows exists — PW-76 is the exemplar on a scratch catalogue). [A3]

**[9.8] Compare the second Search Console export with the first and update the redirect and visibility notes; fall back to Cloudflare's traffic report if the data stays thin** ([8.4]). [C3] [SW-1151]

**[9.9] Trim staging test log volume before 2027 (41.8 GB against 20 GB included; ESTIMATE about 11 US dollars a month at that volume); check that staging's monthly-active-user count actually dropped under the account pool before the Fair Use date 2026-11-01.** [B3] [SW-1061]

**[9.10] Keep the running decision rules and record their tallies — none has a tally anywhere:** DEC-115 (ten CI runs after a local selector run: 0 or 1 unselected failures keep, 2 or more widen or revert); DEC-119 (a red in an un-run spec still red after the next turn sends the area back to the selector's full list); DEC-104 (the retrying test client's five-run trial; run 37038531279 was clean run 1; the POST retry goes if a failure is traced to a replayed insert); DEC-097 / DEC-099 (the account pool: three consecutive green runs with no pool-traceable flake; two counted, then held for the reset-timing line [10.6]; `docs/features/e2e-harness.md` still says "adopted provisionally"); DEC-083 (the server-error census becomes gating from 2026-10-12 after five consecutive runs with zero off-allowlist SQL-class lines — "listing not found" is still off the allowlist with 8 lines on the last run; from that date a new allowlist entry needs a DEC); DEC-084 (the public listing page and the storefront join the accessibility roster in the turns that build them). [D1-3] [C3] [A3] [CI-EV e2e-last-failure.md]

**[9.11] Read the nightly evidence for the 89 post-test warnings the 2026-09-28 staging outage left.** Never recorded as done. [A3] [SW-0881]

**[9.12] Watch promises:** a second fast-lane red with no evidence gets an incident number; staging health (if "Unhealthy" returns, read Reports → Database first, then decide the compute add-on or a lower E2E concurrency on that evidence); LS-9 ("watch"); PW-58 and PW-48 (one flake each on 2026-09-29); "if the staging mail fails again, I'll chase the email server". [A3] [SW-0881] [SW-1016] [D2-3]

**[9.13] Deliver the executor's report on whether a bot filter (Cloudflare) can sit in front of the published site.** The operator was told "Lovable will report"; no brief step asks for it (an executor capability census under G25). [D1-3] [SW-1241]

**[9.14] Guide the operator step by step through the copyright-agent registration at launch-checklist time.** [D2-3] [SW-1331]

**[9.15] Draft the United Kingdom children's access assessment** (due within three months of opening the UK). [D2-1] [SW-1331]

**[9.16] Re-check the United Arab Emirates child digital safety law before its grace period ends** (in force January 2026, one-year grace; risk classes not confirmed issued). [D2-1] [SW-1331]

**[9.17] Carry three record lines into the specs:** the screening rule for gambling, betting and lotteries "when moderation is built"; the curator's alcohol word list into the moderation spec; the REQ-025 note that the search's fasting facet reads the Food Type, not a prefilled tick. [D2-3] [N 10-05 01:55Z]

**[9.18] The alert "when one account opens an unusual number of categories in a day".** The operator was told twice on 2026-10-03 that the catalogue lock would include it; the brief as issued carries only the `schema_read` dial (120 per hour); not built, not queued. [D1-3] [SW-1241]

**[9.19] Propose the rulebook amendments** ([6.31], [6.32]): the two G29 texts; the bundle 4 class rules; the overtaken G24 / A7 / §8 wording; the executor-side facts (raw CI addresses; the tool applies at save; it cannot apply an existing file; it cannot fetch `ci-evidence`). "Write G29 into the next update" has stood since 2026-09-29. [SW-SUPP] [RD PART 4] [INC-REC]

**[9.20] "I'll make Lovable's N2 test assert that Unit of Sale comes before Quantity"** (2026-10-01). N2 landed; whether the assertion was added is not recorded. [SW-SUPP]

**[9.21] Standing practices the supervisor bound itself to:** a walk list after each wizard landing; STEP 0 of every multi-turn brief saves the brief in the repository ("I'll open every multi-turn brief this way from now on"); every prompt repeats the raw CI addresses and "read CI first"; every migration prompt carries the mark rule, the closers line and "scratch user or no caller"; every prompt carrying Amharic is built by script from a vetted file and delivered as a file; replies to the operator in two lines; verification checks every brief step against the diff. [SW-1151] [N 10-05 01:15Z, 01:50Z] [INC-REC]

**[9.22] Decide whether the first tick-list condition (C30's Delivery Included) gets a proof test in the rows turn** — the supervisor's own open question: "it's data; the door already proves it with multi-select tokens — note for the records". [N 10-05 05:45Z]

---

## 10. WATCH LIST

Things nobody must act on yet, but which the next thread must read or remember. Figures are from the `ci-evidence` branch at `a06ea55e` unless another source is named.

**[10.1] CI on `48d3c53b` (turn 12) and the promote.** Not yet reported at 05:53Z; the previous two full runs were red on one test each; a green run promotes main from `24d401f5` to `48d3c53b`. Read `ci-status.md` (two-step: conclusion, then that the SHA is the newest non-status commit), then `e2e-last-failure.md`. [CI-EV] [N 10-05 05:45Z]

**[10.2] The nightly E2E run.** The nightly of 2026-10-04 (run 37188134063 on `c6595265`, 08:12Z) is red with zero tests parsed in both sources — the runner died in global setup on "STAGING BEHIND: apply 20261004072852_d59800cd" (the window before the operator's staging apply of that bundle 3 migration); no source mentions it or rules on it. The nightly runs at 06:00Z by cron; the 2026-10-05 run had not started at the read. [CI-EV nightly-status.md, nightly-last-failure.md] [REPO .github/workflows/nightly-e2e.yml:7]

**[10.3] The flake ledger (DEC-030: a test flaky three times in seven days gets an INC).** Lines dated 2026-09-28 to 2026-10-05, by test: LT-13 8 (fixed by turn 11, INC-334); LS-6 8 (one on 09-28, two on 10-03, five on 10-04 — INC-285 reopened / INC-428; no source closes INC-285); PW-61 5 (all on 2026-09-28, the day INC-317's fix landed; none since — INC-333); PW-17 4 (09-28 and 09-29, around INC-330's fix; none since); TR-29 3 (09-28, 09-29, 10-04 — INC-345); PW-76 3 (all on 2026-10-04: two in the matrix, one in the fast lane) with no INC recorded; PW-55 3 (10-01 ×2, 10-04 — INC-430's failure "never explained"); CO-4 3 (09-28, 10-01, 10-04; no INC); then 2 each: TR-28, TR-24 (INC-287), TR-10, PW-57, PW-35 (INC-335), PW-10, LS-11 (INC-218), LR-3, CT-19 (INC-437), CO-7, PW-132 (both in the fast lane — contention noise by DEC-023-B); CT-12 flaky once on 2026-10-05. The report prints the rule and no automatic list ([4.32]); the flaky-test turn is [4.30]. [CI-EV flake-ledger.md]

**[10.4] "listing not found" lines: 8 on run 37264070069 (shards 3, 5, 6)**, the one message off the allowlist; the INC-323 target was 5 per run (INC-398). [CI-EV e2e-last-failure.md:23]

**[10.5] Staging.** Health (INC-318: Reports → Database first); the Ethereal mail credentials (a failure makes every push red; "re-create the credentials FIRST"); sign-in rate limits (HTTP 429) under local runs; the catalog-find sweep every 5 minutes ("288 runs a day"); residue from cancelled runs (a scratch user holding a handle made AU-12 red once; teardown never ran; the global setup reaps nothing under 24 hours — INC-428 narrowed the fixture collisions). [A3] [SW-1196] [N 10-04 20:20Z] [REPO launch-gate.md:46]

**[10.6] The reset-timing line for the account pool.** Promised 2026-10-01 ("I will hold adoption until a timing line settles that question"): how long a pool account's reset takes, to settle whether PW-98's cleanup timeout was pool-related; never specified; DEC-099's adoption is held on it ([9.10]). [C3]

**[10.7] The migration-mark convention after INC-433.** Until a healer runs, `max(version)` on both databases reads M6's `20261005100000` while the newest applied file is M7 (`20261005040000`); any read-back or script that uses the maximum misreads the state. [INC-REC] [N 10-05 02:20Z]

**[10.8] Side branches.** Eleven `lovable-*` branches on the remote (`lovable-backup-dev-1788419378`, `lovable-sync`, nine `lovable-sync-<n>` up to `1790889145`); none added since `2b55ed15`; the detector (DEC-096) is not built; ruling "leave the branch in place". [REPO git branch -r] [B3]

**[10.9] The scheduled reminder bound to the old session** ([8.4]): fires 2026-10-05 12:36Z into `session_011qnXgsftyRPnYgCb94TsYN`; a new thread must re-create it or rely on the operator. [LIVE]

**[10.10] Money and quotas.** Supabase logs 41.8 GB against 20 GB (billed from early 2027); the Fair Use Policy from 2026-11-01; the Esri key's one-year expiry (created 2026-09-30); the executor platform's private npm cache behind 188 lockfile entries (INC-420). [B3] [SW-1061] [D2-3]

**[10.11] Catalogue data points to confirm at the C30 audit:** `cooked-food-to-order`'s `secondary_parents` on prod ([7.13]); that the C29 rows C30 deletes have no live ads (none exist); the "Eid" alias Latin-only rule; the English number-unit words on Amharic screens ("people") now visible on live rows. [N 10-05 03:35Z, 01:55Z]

**[10.12] Operator-account cautions.** A confirmed home-country change on his own account starts a 30-day clock (use Go back in any walk); his 8 drafts moved to step 3 by M5; the 10 region-level listings left as they are. [SW-1286] [A3]

**[10.13] Spec files over the size rule** ("no spec file above about 25 tests per project"): `post-wizard-specs.spec.ts` 37 tests, `post-wizard-bundle2.spec.ts` 30; "the next test added there will split the file first" (2026-09-29) was not applied. [REPO e2e/] [A1] [SW-0926]

**[10.14] Evidence gaps left standing:** INC-421 never probed on the Cloudflare build (nightly parity smoke only; why only the real route lost its body unexplained); LS-9 once; PW-74 once locally; `attr_visible_when_met` returns true for a non-object condition since M6 (a nit; such a value cannot be stored); DEC-104's hypothesis never confirmed by a cause code; the turn 10 limitation "no live mark read-back this turn" accepted by the supervisor. [D2-3] [N 10-04 ~21:55Z] [N 10-05 02:50Z]

**[10.15] The executor platform keeps proposing framework package updates.** Rule since DEC-126 (2026-10-04): a security patch is kept as its own item, never inside a feature turn and never declined by its label (INC-418 reversed the INC-372 habit). [RD 7.1 C-17] [D2-1]

**[10.16] The published site runs an uncertified head** ([1.5]) until the next green promote. [N 10-05 05:45Z] [CI-EV]

**[10.17] Gating dates:** DEC-083 from 2026-10-12 ([9.10]); the UAE grace period ends January 2027 ([9.16]); the UK assessment within three months of opening the UK ([9.15]); the Fair Use Policy 2026-11-01. [A3] [D2-1] [B3]

**[10.18] Harness items never exercised:** the Guard Proof workflow, not dispatched since 2026-08-03 (ACT-C3-1; must be brought onto the current harness before the launch re-run [3.17]); the nightly's quarantined global-state tests are not gates (INC-117); a green run never judges the artifact contract (INC-186). [REPO docs/tracking/action-tracker.md; incidental-findings.md] [REPO system-state.md:76]

**[10.19] Security sweep standing duty:** every verification includes a secrets sweep of the diff; the committed `.env` holds publishable values only (INC-000); the repository is public until launch ([3.26], [8.19]). [RD PART 1] [SW-SUPP]

**[10.20] Two label traps for a new reader:** "G29" means two different rules ([4.53]); "R1" names four rule sets; INC-333/334/335 map to PW-61/LT-13/PW-35 by order of listing only; INC-392 and INC-394 are labels matched to events after the fact ([4.52], [12.24]). [B6] [C6] [RD 7.1 C-01]

---

## 11. PARKED / LATER VERSIONS

Decided NOT to do now, with the condition that reopens each. Nothing here is scheduled.

**[11.1] Jobs and Tenders.** Deferred to v2 by the operator on 2026-07-19 (the repo ledger's scope rulings); the market-census counts (Jiji 54 vacancies and 1,635 CVs; 99 Telegram job channels with 5.9 million subscribers; Ethiojobs 1,100+ vacancies) are filed for that decision; if ever built: employer verification and no-fee rules. [C3] [A3] [RD 7.1 C-22]

**[11.2] Per-market presets, per-market units, the Class B rows and Ethiopia-only fields** — wait for per-market defaults and a second market ([7.8]). [CUR 3.8] [SW-1061]

**[11.3] "Everywhere" coverage stays a later paid option; the free plan's limits are the operator's numbers.** [SW-0926]

**[11.4] A map radius for the service area ("how far from my pin", D42)** — a later wizard idea; `system-state.md` lists it as backlog. [CUR 3.10] [REPO system-state.md:76]

**[11.5] DEC-089, the country-localised catalogue in two data layers** — "LATER" (operator, 2026-09-29) ([6.28]). [A3]

**[11.6] Maps:** OpenStreetMap stays the automatic fallback behind Esri; self-hosting (Protomaps on Cloudflare) only "if use ever passed about 1.5 million tiles a month for two months in a row"; buyers do not load live maps by default (a picture made once, or a "Show map" tap) — a design intent, not built. [SW-0971]

**[11.7] App-store shells:** a Play Store listing through a Trusted Web Activity (cheap, no second codebase) later; an iOS App Store shell "only if diaspora iPhone usage demands it" — both after the PWA ([5.19]). [A3] [SW-0881]

**[11.8] Social and phone features set aside:** posting to a seller's own Facebook Page or Instagram business account "after Meta's app review"; a seller forwarding a Telegram post to our bot to make a draft (floated, not dropped); partnering with channel owners and posting into a seller's connected channel (dropped by the operator); substitute (forwarding) phone numbers ("needs a telecom partner"); automatic grouping of phone digits as typed ("little gain"). [SW-1106] [SW-1151] [SW-1196]

**[11.9] Legal items parked for counsel at the Ethiopia-entity milestone (not launch blockers):** the six points of the lawyer's list (EU/UK → US transfer mechanism; which countries the sanctions line closes; prominence of the liability limit for a US court; whether California's privacy law applies; whether the copyright agent's phone must be printed on the site; how far "act without notice" holds for EU and UK users); an arbitration clause (eBay has one; not added); whether a self-declaration meets Ethiopia's and Kenya's "reasonable efforts" age wording; Ethiopia's one-year traffic-log rule (Computer Crime Proclamation 958/2016 Art. 24 → the REQ-035 matrix, "not built now"); the DSA counsel item Q-014 with the country-law notes of DEC-128 ([3.15]); ECA registration and the Ethiopia data partition (DEC-008, about year 1). Left out of the legal texts on purpose: storefronts and verified badges (source ledger A9), cross-country conversation consent (B5). [D2-3] [SW-1331]

**[11.10] Scale-phase items:** `pg_trgm` out of `public`; an automated page-timing budget; caching search answers at the edge (the INC-363 candidate); a bigger staging database or skipping browser tests on docs-only commits ("wait until the timing section shows they're needed", DEC-087's levers); the ten-shard CI change proposed 2026-09-24 and never made (six shards stand). [A3] [SW-0881] [RD 7.1 C-16]

**[11.11] Deferred platform doors and phases:** DEC-012's doors (Telegram sign-in, device/session list, multi-door settings); DEC-021 full act-as impersonation (Ops phase, [3.9]); the translation era's post-launch set (TM/glossary, ICU plural validation, four-eyes approval, missing-key telemetry; [3.24]); a Bookings era as candidate U9. [REPO launch-gate.md; roadmap.md] [D2-1]

**[11.12] Catalogue scope closed or parked by ruling:** Pets & Animals closed to further work (operator, 2026-10-01); Kirkland out for good; the market census's unread pages stay unread; alcohol, tobacco, sexual wellness, prescription medicines, khat, software and digital goods, social-media accounts, businesses for sale, work-abroad agents out of the catalogue (blocking at posting is the screening step's job); a second condition scale at Health & Wellness "not now"; a per-category-per-plan photo cap matrix "when you want it"; wholesale/bulk "fine for now"; the curator's delivery-fee, orders-close and starting-price rows not requested; no "Included in the Price" or deposit row. [CUR 3.10, 4.2] [SW-0836] [D2-3]

**[11.13] An Ethiopian-calendar expiry entry** (operator, 2026-09-25): no later record; nothing in code or docs; status unknown — parked by silence, not by ruling. [RD P2-036]

**[11.14] Visibility candidates "recorded as candidates, not decisions"** (visibility plan §4): price pages; bulk upload for dealers; saved-search alerts; shop pages with a printable QR code; share results for the seller; a Play Store listing; invite e-mails to old users (DEC-003). [SW-1151] [REPO docs/governance/visibility-plan.md]

**[11.15] The lawyer's review itself is not a launch blocker** (standing ruling; the supervisor's "lawyer's read before launch" of 2026-10-04 was withdrawn). [D2-3] [SW-1331]

---

## 12. CLOSED BY THE REPO, AND CONFLICTS

### 12A. Closed since the previous compile, or confirmed closed by the repository (do not reopen)

**[12.1] Bundle 4 turn 10 landed and was published.** `a17b227c` (24 files; `routeTree.gen.ts` is quote churn, generated and exempt): A — `refreshNameFoldsAfterCommit` and its six call sites, tests CT-35 (needed a scratch parent: the categories import creates children only), AT-69, LT-15 on scratch rows with `finally`; rebuild 472–644 ms on staging; M7 verified (WHERE true; closers; e2e-areas line; proof; mark last); B — the 25 `post.pin.*` strings verbatim from the supervisor's file, plus `am-script.test.ts` (`\p{Cn}` and non-Ethiopic/Latin letters), which also caught `admin.countries.filter.pageSize` (U+1444) and `admin.coverage.error.reason` (U+1728), both corrected; C — `catalog-scope.ts` split from `catalog-scope-provider.tsx`, lint 32 warnings; D — the roadmap ticks (an incomplete proof list, tidy in [2.3]); H — five feature docs and seven changelog lines (M1, M2, M4, M4c, M6, M7, turn 10). CLEAN by diff; CI red on LT-13 only; published ~03:35Z. [N 10-05 02:50Z, 03:35Z] [REPO docs/_changelog.md:666–672; git diff 24d401f5..a17b227c]

**[12.2] Bundle 4 turn 11 landed and was published.** `70e16ea5` (13 files): LT-13 polls the DB count and the page total in the same step with a reload (INC-334 closed; class rule in the `admin-locations` header); `foldFact` (a list fact prefills a `multi_select` while empty; `PREFILLS_HELD` remembers fact-made ticks per category for the open tab) — INC-434; the ribbon as a frame sized to the image's own ratio with a bottom-right corner band in `bg-primary` / `text-primary-foreground` (the operator corrected the colour twice: not yellow, not the watermark) — INC-435; the locate button `aria-pressed` and `variant default` while the position is taken, reset on drag, tap or search — INC-436; PW-159, PW-160, PW-141 reworked; lint 32; unit 360/360. CLEAN by diff; CI red on CT-19 only; published ~05:45Z; the ribbon and the button walked "GOOD". [N 10-05 05:30Z, 05:45Z] [INC-REC] [REPO src/features/posting/step-specifications.tsx:136, 699; src/components/marketplace/listing-picture.tsx:101; src/features/posting/map/map-pin-dropper.tsx:400; e2e/post-wizard-place.spec.ts:1407]

**[12.3] C29 and c29b are imported on ethio-prod and the names approved.** 2026-10-05 ~03:35Z, on the published site: categories added 1; definitions added 8 · changed 8; c29b changed 1; links added 20 · changed 3 · unchanged 1,465 (3 "origin" read-only rows ignored as always); 10 names approved in Translations. The audit (`audit_c29.py`, 0 issues) preceded it. One unknown stays: [2.4]. [N 10-05 03:35Z] [N 10-05 01:55Z, 02:02Z] [WALK]

**[12.4] The "And when" empty-choice label is built** — `admin.attributes.link.andNone`, asserted by AT-66, turn 9b (`0fc968e4`, fixed forward in `24d401f5`); the finding never had an INC number. [N 10-05 01:15Z] [D2-6] [REPO roadmap.md:53]

**[12.5] INC-431 (the garbled Amharic map-pin strings) is FIXED.** 25 keys replaced, two more values found and corrected by the new guard; `am.ts` has no unassigned or foreign letters; the class ("executor-written Amharic never read", 3+ occurrences) has its CI promotion in `src/i18n/locales/am-script.test.ts`. Status in the records file: FIXED (a17b227c). [INC-REC] [N 10-05 02:50Z] [REPO src/i18n/locales/am.ts:1985, 1990; src/i18n/locales/am-script.test.ts]

**[12.6] INC-432 (the seller-name table never refreshed by an import) is FIXED.** Both halves: the six route call sites, and M7 `20261005021121_9347e038` (mark `20261005040000`, on ethio-prod by the executor's tool at save and on ethio-staging by the operator) redeclaring `name_folds_rebuild` with `DELETE FROM public.name_folds WHERE true`; class census: the only such function (`transition_listing` a false match; dynamic SQL not covered). [INC-REC] [N 10-05 02:06Z, 02:16Z] [REPO src/server/catalog-find.server.ts:102; src/routes/api/admin/*/import.ts; supabase/migrations/20261005021121_9347e038-….sql]

**[12.7] The published site matches the live database again, and the security patch is live.** The condition of the previous compile ("no Publish since M5") ended with the 03:35Z Publish of `a17b227c`; M5, M6 and M7 are on prod and the screens that use them are published; the TanStack patch kept under DEC-126 (INC-418, in `b432691b`) and the INC-421 body fix (`5f5fd6b7`) are on the published build. The Cloudflare probe gap of INC-421 ([4.4]) is unchanged. [N 10-05 03:35Z, 05:45Z] [D2-3]

**[12.8] The turn 9b red (PW-129, PW-134, "identity read was never held") is fixed and promoted.** `24d401f5` (wizard.tsx only: the home read waits for `!draft.loading && itemCountryFor === itemPlaceId`); cause: turn 9b's `{country}` lookup read the profile before the place's country answered — the executor's own slip, not a flake; CI green and promoted. [N 10-05 01:40Z, 02:06Z]

**[12.9] "Turn C" (INC-295: the finder rebuild off the request path, a heartbeat row) is built.** `catalog_find` has no in-request refresh; the sweep job `catalog_find_sweep` with its heartbeat table `catalog_find_sweep_runs` exists (migration `a35e45fa`; rescheduled to every 5 minutes by bundle 2); the action tracker's "Turn C … NEXT" line is stale ([4.55]). [REPO supabase/migrations (a35e45fa, 7423f49a:1607); docs/tracking/action-tracker.md]

**[12.10] INC-334 (LT-13 flaky four runs in seven days) is CLOSED by the turn 11 class fix**, not by the flaky-test turn it was parked for; [4.30] shrinks accordingly. [N 10-05 05:30Z] [REPO docs/_changelog.md:673]

**[12.11] INC-434, INC-435 and INC-436 are FIXED and walked** (turn 11; the operator's "looks good" / "yes good"); their class rules are in the records file (INC-434: a shape the door accepts is a shape every screen reads; the docs' sentence is checked against the form before a curator is told to rely on it). [INC-REC] [N 10-05 05:45Z]

**[12.12] Three items the previous compiles doubted are built:** the unit noun on listing cards (`listing-card.tsx:31–39` reads `priceUnit`); the expiry scheduler (cron `listing-expiry-sweep`, M5 `923dd4cb:1791`; INC-414 fixed); the stranding cause removed by DEC-098 stage 1 (no workflow pushes to dev). [REPO src/components/marketplace/listing-card.tsx:31–39; supabase/migrations/20261004144146_923dd4cb-….sql:1791] [B3]

**[12.13] Three record gaps are filled:** the red-before-fix runs for PW-94 and PW-106 to PW-109 WERE delivered before bundle 1 closed (executor report of 2026-10-02 12:10, upload `e998a73e`); the live Knowledge v3.10 text was handed over by the operator (01:20Z); `records-C.md` exists (DEC-099 to DEC-105, INC-377 to INC-394, ACT-G1 to G4, the REQ-007/008 amendments, bundles 1 and 2, batches 12 to 19). [C6] [N 10-05 01:20Z]

**[12.14] M6 is on both databases and CI on `2b55ed15` was green.** The executor report of 2026-10-04 18:44 ("M6 not on ethio-prod") was overtaken: M6 applied on prod by the operator's paste (between the ~22:15Z and 23:06Z notes) and on staging; run 37244952955 on `2b55ed15` SUCCESS, promoted. [N 10-04 ~22:15Z, 23:06Z] [N 10-05 00:50Z] [B6]

**[12.15] Documentation lines the previous compile listed as missing are present at `48d3c53b`:** changelog lines for M1 (`b9aa66a4`), M2 (`18556a32`), M4, M4c, M6 and M7; `docs/features/posting.md:683` now reads "Since M5 (bundle 4 step 22) the door refuses at `p_step` 8 a seller with no public name and a person with no first name"; `docs/features/posting.md:1219` "Bundle 4 — the wizard as built (Parts A–G)" and `attributes.md` carry `{country}`; `docs/features/posting.md:1227` states the name-fold table and the hourly protection. Still missing: see [4.54]. [REPO docs/_changelog.md:666–671; docs/features/posting.md:683, 1219, 1227]

**[12.16] Older closures confirmed by the records (listed so nobody reopens them):** W6b-3 (the shop or office location) built in bundle 4 Part E (PW-143); Part P built and walked in bundle 2; W6b-1 landed 2026-09-30; the map service settled (Esri tiles, OpenStreetMap fallback) — this superseded the "Cloudflare-hosted maps before launch" promise; `negotiable` removed from the pricing-basis lists (2026-10-03); DEC-088 built as INC-381 (engine side, M6); local E2E runs force fake image mode (INC-386); INC-323 and INC-324 closed 2026-09-29; the TanStack flag resolved (INC-418, DEC-126); batches 12 and 13 delivered (Commercial Equipment, Pets & Animals, Travel & Accommodation, Silage, the settled-to-Other scan, the Sports notes); the hardwood check closed (typed numbers stay); INC-389 fixed by M1 and M1b (PR-21); the seller-name rules built (M2, M4, M4b, M4c); the allowed-list ceiling 150 live (bundle 2); batch 15 applied; the four country currency corrections imported (2026-10-04 02:23 local); Kirkland and Pets & Animals closed; INC-343 (a) fixed by W6b-1; INC-395 fixed at `befaca37`; the 24 brand write-in unlinks released and imported (2026-10-01). [A3] [B3] [C3] [CUR 3.3, 3.4] [D1-6]

**[12.17] Bundle 1's parts are built by the changelog and the tests** — INC-362, INC-369, INC-370, INC-371, INC-375 FIXED per `docs/_changelog.md` (2026-10-02) and `e2e/` (PW-93, PW-94, PW-101, PW-105 to PW-109, PR-19; `src/features/posting/answer-tokens.ts`); the roadmap says otherwise — the conflict is [12.20]. [B2] [C6] [REPO docs/_changelog.md:622–623]

**[12.18] The supervisor's C28/C29 rulings were acted on:** Fish under the two fasting types → c29b imported; no fasting-friendly prefill; Serves required when shown; the new leaf created; the price table numbered DEC-131; gluten-free as a search alias on Teff Injera only. [N 10-05 00:12Z, 01:55Z, 03:35Z] [INC-REC]

**[12.19] "CI unknown on `2b55ed15`" and "the turn 9b prompt not yet sent" of the previous compiles are closed** — run 37244952955 SUCCESS; turn 9b landed as `0fc968e4`. [N 10-05 00:50Z, 01:15Z]

### 12B. Conflicts between sources (both statements given; what this file uses)

**[12.20] The roadmap's truth pass against the changelog and the tests (bundle 1).** `roadmap.md` (truth pass of 2026-10-04, still at `48d3c53b` lines 9–19 and 28–30) marks S1, the "Bundle 1" line, S2/S3, T, A, B, C, Part O (INC-369, INC-370), INC-371, INC-375, the D+L+M line and the E census as not done ("no proof found"; "Part O readers not built"); `docs/_changelog.md` (2026-10-02, Bundle 1 items 2–8), the tests PW-93, PW-94, PW-101, PW-105 to PW-109 and PR-19 in `e2e/`, `src/features/posting/answer-tokens.ts`, and the supervisor's closure of bundle 1 on 2026-10-02 say they were built. This file follows the changelog and the tests and lists the reconciliation as the close-out bundle's first task ([2.13], [6.6]); one of the two records needs correcting in the repository. [B6] [C6] [REPO roadmap.md:9–30; docs/_changelog.md:622–623]

**[12.21] INC-363, the category-search timing.** The supervisor's "closed as recorded (missed by 6 ms, hop-bound)" of 2026-10-02 against `roadmap.md:10` "stopped for ruling, no ruling since" and the supervisor's own later note that a ruling is owed. Kept open as [4.14] / [9.2]. [B6] [C6] [D2-3]

**[12.22] DEC-098 "awaits ADOPT".** Stage 1 (reports on the `ci-evidence` branch) was declared fully adopted on 2026-10-01/02; `roadmap.md:30` says stage 2 awaits ADOPT; the ADOPT it means may be the account pool's (DEC-097 / DEC-099), which has none. Not settled; stage 2 is [5.13]. [B6] [C3]

**[12.23] DEC-128 / DEC-129.** The notes write "L1 APPROVED (DEC-128/129)"; the records give the age rule to DEC-128 and spec L1 to DEC-129 (the compiler's reading, following the notes' own DEC-128 entry and "DEC-129 ext."). This file uses the records' split. [D2-6]

**[12.24] Labels that mean two things or were assigned after the event.** "G29" (two texts); "R1" (four rule sets); DEC-083 (reserved for D66, used for the census — the repo settles it as the census); INC-333/334/335 mapped to PW-61/LT-13/PW-35 by order of listing; INC-339 without a test id (likely `i18n-coverage.spec.ts › the marketplace shell renders no English fallback`); INC-392 and INC-394 labels matched to events after the fact; test ids moved between specification and build (PW-95 never used; PW-96, PW-101, PW-104, PW-106, PW-107 built as something else); "Batch 7" (curator) = "R1/R3 + Beauty" (supervisor). [A6] [B6] [C6] [RD 7.1 C-01]

**[12.25] INC-364 against INC-398.** Both name the "listing not found" server lines; INC-364 has no definition in any source; INC-398 is defined (2026-10-03). Kept as two entries with a cross-reference ([4.26]); a later compiler may merge them. [B6] [D1-6]

**[12.26] The rent and hire leaf count: 17 (the notes) or 18 (the message to the operator).** To be settled when the engine batch prompt is written ([7.3]). [D2-6] [CUR 3.6]

**[12.27] M1's identity in the executor's final bundle 3 report** ("M1 a35e45fa → mark 20261003215042") against the repository (M1 = `20261003215007_b9aa66a4`, mark `20261003220000`; `a35e45fa` is an older migration's fragment; `20261003215042` the follow-up file's row). The repository is used; the records turn uses the corrected list. [D1-6]

**[12.28] The older database-checker warnings: 161, 163, 164.** Each figure quoted with its moment; no census explains the differences ([4.3]). [D1-6] [D2-6]

**[12.29] The `allowed`-list ceiling: 50 (the C29 prompt and the notes of 2026-10-05 00:02Z) against 150 (live since bundle 2, `attr_option_shape` at `7423f49a:1526`).** The repository wins: 150; the curator has not been told ([7.12]). [RD 7.1 C-23] [REPO roadmap.md:27]

**[12.30] Who applies a migration on prod, and when the executor can stop.** Memory: the executor applies on prod, never ask the operator. 2026-10-04: the operator pasted M6 because the tool cannot apply an existing file. 2026-10-05: the tool applied M5 and M7 the moment the file was saved, so the turn 10 instruction "stop at the apply line" could only mean "after the prod apply, staging by the operator's hand" (slip S91). Rule used: the tool applies a NEW file at save; an existing file is the operator's paste; staging is always the operator's. [RD 7.1 C-05] [INC-REC] [N 10-05 02:16Z]

**[12.31] Where the executor reads CI.** `AGENTS.md:21` says `git fetch origin ci-evidence && git show …`; the executor's remote carries only its own branches (dev, main, `lovable-backup-dev-*`), so the fetch fails ("couldn't find remote ref", 2026-10-05); the bundle 4 brief (line 13) and DEC-098 say the raw addresses; `origin/main`'s `ci-status.md` is the stale pre-DEC-098 copy and must never be read. The raw addresses are used; `AGENTS.md` is corrected in [2.3]. Earlier statements that the fetch "works" (2026-10-01) are superseded. [N 10-05 01:50Z] [RD 7.1 C-06, C-14] [REPO AGENTS.md:21]

**[12.32] "Turn 12 is in flight with Lovable" (the notes, 05:45Z) against the repository (commit `48d3c53b` on dev at 05:42:29Z).** Both hold: the platform pushes as the executor works; the turn's report and CI are what remain ([1.1]). [N 10-05 05:45Z] [REPO git log] [RD 7.1 C-07]

**[12.33] The published site against the certified branch.** The operator publishes the dev tree; main is "the certified-green record". Since turns 10 and 11 were red on one test each, the public site (`70e16ea5`) is two turns ahead of main (`24d401f5`). No source rules on it; recorded as a condition ([1.5]). [N 10-05 03:35Z, 05:45Z] [CI-EV]

**[12.34] INC-431's count: "exactly the 33 post.pin.* strings" (notes) against 25 corrected keys (the file; one sweep says 26) — of the 33, three are no longer in `am.ts`, 25 were replaced and five (`layerStreet`, `save`, `saved`, `removed`, `at`) were read and found correct on 2026-10-05; the guard then found two values outside the family (U+1444, U+1728).** All reconciled by the turn 10 result. [D2-6] [N 10-05 01:15Z, 02:50Z]

**[12.35] Social posting (C-20).** 2026-10-02: sellers share to their own accounts themselves; automatic posting into other people's accounts is "a bad idea". 2026-10-04: "WE WILL AUTOMATICALLY POST THESE IN SOCIAL MEDIAS … NO OPT OUT". The supervisor read the later line as ethio.com's OWN channels and wrote the Terms on it; the operator did not confirm or correct ([8.27]). [RD 7.1 C-20]

**[12.36] Listing lifetime (C-21).** The code's `coalesce(expiry_days, 60)` and the 2026-09-17 draft-purge spec against the operator's "no end date by default" (DEC-117, built in bundle 4 with INC-400). Drafts and published ads are different things; for published ads the later ruling wins and is built. [RD 7.1 C-21] [D1-1]

**[12.37] Local test runs (C-13).** Installed G24 / Knowledge A7 ("a DEC-023 local run before reporting") against practice since 2026-10-03 (changed specs only; CI is the full proof; since 2026-10-04 whole-file runs of touched specs are a commit condition). The installed wording is out of date ([6.31]). [RD 7.1 C-13]

**[12.38] Rulebook versions (C-18).** v1.12's header (instructions v1.12, Knowledge v3.10) against memory (v1.11, v3.9), the repo mirror (v3.8), `system-state.md` (v1.10 · v3.8), `instructions-amendments.md` (stops at v1.9) and the attached Project docs (v1.8, v3.6). The v1.12 header is the latest statement; the live Knowledge text confirms v3.10. [RD 7.1 C-18] [N 10-05 01:20Z]

**[12.39] A walk expectation written from the catalogue, not the form (S92).** The walk line "Dishes opens with Doro Wot ticked" assumed the prefill worked; the form skipped list facts (INC-434). Second occurrence of the class (INC-422 the first); the records file lists it as a slip. [INC-REC] [N 10-05 03:35Z]

**[12.40] C29's classification is superseded by the C30 plan two hours after import.** C29 modelled the leaf as Food Type = dish (e.g. "Doro Wot") with a Dishes list prefilled from the type; the operator ruled "Doro Wot → Doro Wot is duplication" and a diet-based Food Type; INC-434 (list facts prefill a tick list) was built for the C29 shape and remains correct engine behaviour; the title rule for the leaf becomes "the diet alone". The C29 rows are live until C30 replaces them. [C30] [N 10-05 03:35Z, 05:45Z]

**[12.41] M6's mark against the brief's rule.** The brief's rule ("now UTC rounded up to the next hour plus one hour") would have given M6 `20261004230000`; M6 declared `20261005100000` (about 11 hours ahead); M7, declared by the rule, fell below it (INC-433). The rule gains "and above the ledger's current newest mark" ([1.2]). [INC-REC]

**[12.42] Dates: local against UTC.** Operator messages and this file use America/New_York; commits, the changelog, CI and prompts written after 20:00 local use the next UTC day (INC-407 to INC-413 are headed 2026-10-04 for a walk of 2026-10-03; the C30 rulings are 2026-10-05 01:40 local = 05:40Z). Where a ledger prefers one, only headings change. [D1-6] [B6]

**[12.43] Things no source settles (kept open, not decided here):** whether `buildTitle` covers E4 ([4.15]); whether INC-343 (b) was fixed ([4.10]); whether the Shola milk lock, the Beauty import re-check, the INC-361 class count and the "no phone numbers" help census ever got answers; whether the listing-expiry sweeper's wiring was in `0ce87c13` or M5 (M5 schedules `listing-expiry-sweep`); whether any native-reader check of Amharic catalogue labels took place; which "seven dog breeds" the census ruling of 2026-10-02 meant; why the local suite counts 1,022 tests while CI counts 1,142–1,187 passed; whether the operator used either Jiji fix; whether the executor's N2 test asserts Unit of Sale before Quantity ([9.20]). [A6] [B6] [C6] [D1-6] [D2-6]
