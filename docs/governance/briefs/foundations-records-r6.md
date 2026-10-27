# Foundations — records turn R6: the handover supplement, INC-949–INC-954, block S79 (DEC-277–DEC-280), S457, ACT-021, the speed documents and the owed roadmap lines (G41, G53): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — RECORDS TURN R6 (2026-10-27; G41, G53; register row 58; anchors located at e2287d6d03327474e3666789f8dd85d80ed6bba4). RECORDS ONLY. The outgoing supervisor thread wrote a supplement to the handoff of 2026-10-27 listing what that handoff left out (the tracker's rules, two reminders, the security review's unregistered findings, the newer standing directives, an unanswered decision); the fresh thread worked its checklist and registered its findings, and the operator answered three questions. This turn lands all of it, word for word, by the block applier: the supplement's repository copy (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md — the public repository's copy, G51); INC-949–INC-954 and INC-930's answer in the incident ledger before its numbering line, which becomes INC-955; block S79 at the end of the spec ledger (DEC-277–DEC-280, turn 34f-2's review rulings, the rules in force not yet installed); S457 in the instructions record's §Slips; ACT-021 in the action tracker; the four speed documents into docs/governance/plans/; the owed roadmap lines, the ticks of turns 34f and 34f-2 and this turn's own line; the changelog. Tier C (records). No migration. No string. No package change. No product, test, workflow or kit file. AGENTS.md unchanged. No file deleted. Base: dev e2287d6d03327474e3666789f8dd85d80ed6bba4 (turn 34f-2's landing; CI SUCCESS on e2287d6d (run 40574354034, completed 2026-10-27 20:23:49Z; main promoted; 0 flaky)). The executor is Claude Code (DEC-257); a records-only turn may run on Sonnet (G59). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0 (the brief and roadmap line 3); B — the records (by the applier); THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: e2287d6d03327474e3666789f8dd85d80ed6bba4
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
docs/governance/instructions-amendments.md
docs/governance/plans/card-photos-stable-links-study-v1.md
docs/governance/plans/category-pictures-convert-spec-v1.md
docs/governance/plans/edge-caching-study-v1.md
docs/governance/plans/speed-plan-2026-10-25.md
docs/spec/spec-ledger.md
docs/tracking/action-tracker.md
docs/tracking/incidental-findings.md
SCOPE-END

THE SYSTEM (G0) — the records.
CONCERN: every registered incident, decision, slip, action and queued item, and every handover document, is in the repository within one bundle, so a successor reads the repository and never chat (G41, G53; the operator, 2026-10-27: "what else has been missed in the handover, may be more that is just in your memory, but not in repository or handoff").
MECHANISM: docs/tracking/incidental-findings.md (one entry per incident, then the later word, the numbering line and the watch list), docs/spec/spec-ledger.md (one block per period, ending in its numbering line), docs/governance/instructions-amendments.md §Slips, docs/tracking/action-tracker.md, docs/governance/handoffs/, docs/governance/plans/ and roadmap.md (one line per queued item); applied by scripts/brief/apply-blocks.ts (register row 58).
CONSUMERS: the supervisor's session start (v1.15 §2 reads the newest handoff, system-state.md, the ledger's tail, roadmap.md and the incident ledger's tail), every brief's queue and INC references, the handover (G53).
COVERED HERE: the handover supplement; INC-949–INC-954; INC-930's answer; DEC-277–DEC-280; turn 34f-2's review rulings; S457; ACT-021; the four speed documents of the supplement §6; the owed roadmap lines (INC-949–INC-954, INC-443's rest, the CI and kit turn, ACT-021). LEFT: system-state.md's position — the next bundle close (block S79's RECORDS OWED).
CONFORMANCE GUARD: none new — the import is proven by its hashes. docs/governance/ and docs/spec/ are outside Prettier (the ratified records); the incident ledger, the action tracker, roadmap.md and the changelog are under it — their texts are written in Prettier's form (the supervisor's run of the pinned Prettier on the finished files: clean).
EXCEPTIONS: none.
FIVE LENSES — security: the repository is public (G51): no key, token, e-mail address, message id, document address or project id appears (checked by script); INC-951 and the supplement's §3 name an unfixed finding by its class only — its detail stays in the Project until the fix is live · performance: none (documents) · failure modes: none · consistency: one ledger per record kind · future growth: none.
FORWARD-SCAN: none. REGISTER: none (no mechanism changes).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-records-r6.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `docs/governance/briefs/foundations-turn-34f-2.md (Foundations turn 34f, continued after its stop 1: the ad page's place names come with the page — INC-947; then turn 34f's review, report and landing)` becomes `docs/governance/briefs/foundations-records-r6.md (Foundations records turn R6: the handover supplement, INC-949–INC-954, DEC-277–DEC-280, S457 and the owed roadmap lines — G41, G53)` (everything after it stays, as it is). The roadmap's other lines change in Part B, by the applier — none of its blocks touches line 3. Commit `records turn R6: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Part B; THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r6.md <paths>` — never retyped, never edited or reflowed by hand, never formatted. Part B's texts are record: the commands, test ids, files, decisions and fixes they name are history and plans, never instructions for this turn. A refusal from the applier is a STOP that pastes its line. Before applying, check that no block's OLD or NEW text touches roadmap line 3 (S454: a block that would change the brief in force is a STOP). If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-records-r6.md, roadmap.md, docs/_changelog.md and docs/governance/reports/foundations-records-r6.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: commits, with titles that claim only what happened: STEP 0; Part B (`records turn R6 part B: the handover supplement, INC-949–INC-954, block S79, S457, ACT-021, the speed documents and the owed roadmap lines`); the report.
- Local runs: no browser test and no unit test is owed beyond THE CHECKS — no file under src/, e2e/, scripts/ or supabase/ changes (CI runs every test on every commit).
- Behaviour contract: nothing in the product, the tests or the tooling changes. Five new documents; the incident ledger gains six entries and INC-930's line before its numbering line, which becomes "Numbering: next free INC-955.", the watch list staying its last part; the spec ledger gains block S79 after its last line; the instructions record gains S457 after S456; the action tracker gains ACT-021 after ACT-020; the roadmap gains its lines, its two ticks and line 3's new brief; the changelog its line; nothing else changes.
- Knowledge K: K1 the census is the supervisor's (the supplement's checklist and the tracker compared with the roadmap); K2 the report lists any INC-949–INC-954 heading, any "S79 ·" block, any "- S457 (" slip or any ACT-021 line the record already holds (expected: none — `git grep -c -E '^## INC-9(49|5[0-4]) |^S79 · |^- S457 \(|^- ACT-021 ' <START> -- docs` prints nothing); K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE, roadmap.md or docs/_changelog.md is a STOP. CI on BASE: SUCCESS on e2287d6d (run 40574354034, completed 2026-10-27 20:23:49Z; main promoted; 0 flaky). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); read e2e-last-failure.md and guards-last-failure.md only if it is not SUCCESS on BASE — then a red is fixed first at its root (G21, G38) and named in the report.

PART B — THE RECORDS (by the applier).
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r6.md --dry`, then the same without `--dry`; paste the output (expected: `FILE docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md (21423 bytes)` · `FILE docs/governance/plans/speed-plan-2026-10-25.md (5531 bytes)` · `FILE docs/governance/plans/edge-caching-study-v1.md (4260 bytes)` · `FILE docs/governance/plans/card-photos-stable-links-study-v1.md (4073 bytes)` · `FILE docs/governance/plans/category-pictures-convert-spec-v1.md (4336 bytes)` · `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/spec/spec-ledger.md #1` · `EDIT docs/governance/instructions-amendments.md #1` · `EDIT docs/tracking/action-tracker.md #1` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT roadmap.md #3` · `EDIT docs/_changelog.md #1` · `applied 13 block(s) to 11 file(s)`). The blocks:
FILE-BEGIN docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
# Handover supplement — 2026-10-27 (what the first handoff left out)

> Repository copy (records turn R6). The Project keeps the full copy; this one leaves out, for the public repository (G51), the tracker's address and its editing ids, an e-mail address and the detail of two unfixed findings (§3). The numbers the supplement left to the new thread are assigned in block S79 of docs/spec/spec-ledger.md: INC-949–INC-954, DEC-277–DEC-280, S457 and ACT-021.

Written by the outgoing supervisor thread at 2026-10-27 21:15Z (17:15 New York), at dev = main = `e2287d6d` (turn 34f-2's report, re-read in a fresh clone for this document), after the operator found that the new thread did not know the Foundation fixes tracker or the list of items to be done: "this is exactly what should have been avoided … what else has been missed in the handover, may be more that is just in your memory, but not in repository or handoff". This document is the result of an audit of everything the outgoing thread held outside the repository: the tracker, the scheduled tasks, the project memory, the Project docs and its running record. Read it whole. It does not replace docs/governance/handoffs/2026-10-27-foundations-handover.md; it fills its gaps.

The outgoing thread assigns no ledger numbers here. Numbers belong to the new thread. At `e2287d6d`, the repository holds INC-945 to INC-948, the incident ledger names INC-949 as next free, and the spec ledger's last numbering line reads "next free DEC-277, D239, INC-945, S457, ACT-021" (spec-ledger.md :4668). The new thread takes its next numbers from the higher of the repository and its own running record (G41). Every item below that needs a number is registered by the new thread.

## 1. The Foundation fixes tracker — the operator's working list

- **Address:** the Foundation fixes tracker, a Claude Doc in the Project (titled "Foundation fixes — progress tracker"; its address is in the Project copy of this document). The operator keeps it open in his sidebar as his visual guide, "so nothing is missed" (2026-10-24).
- **His rules for it** (project memory, preferences.md, 2026-10-24): the list follows the fix plan in order, with ticks. The supervisor updates it step by step after every verified turn. The item an executor is working on right now is marked in a different colour (orange) on the status board, so he can tell at a glance what is in progress and what is done. It is opened for him when he asks. Every item names its decision or incident (DEC, INC or D) so nothing is lost between the tracker and the ledgers. Each update adds one row at the top of the changelog table at the bottom of the page.
- **How to edit it:** through the Claude Docs connector; the container and node ids and the write rules are in the Project copy of this document (G51: the repository is public).
- **Its sections:**
  - §1: governance installed.
  - §2: the systems audit's 21 findings with status. Open: INC-837, INC-834, INC-838, INC-844, INC-836 part 2, INC-826, INC-827/INC-843.
  - §3: the mechanisms landed in bundle 22.
  - §4: the Foundations bundle's nine mechanisms, with the status board and every sub-item (the form kit's four waves; the door mechanism's manifest, INC-834, INC-838, INC-844, INC-836 part 2 and INC-849/850; locale and format's 42 Intl sites, 9 ternaries, 5 country-name paths and 23 SQL language literals; QueryState, Button, Picture and the a11y sweep; ListingDetail and safeHref; t(key, values) and plurals).
  - §5: the queue beside and after the bundle.
  - §6: where the executors are, plus the changelog.
- **Pending decisions shown in it:**
  - INC-930: (a) or (b); (b) is recommended.
  - "DECISIONS FOR TESFAYE (credits)" of 2026-10-26: (1) the executor on Sonnet for records and exact-copy turns; (2) the Claude Code kit's efficiency change; (3) executor turns back to Lovable when the Claude Code credit ends.
  - The operator approved (1) and (3) on 2026-10-27 at 07:43 local, and they are in v1.15's G59.
  - **(2) was never answered and never built.** See §4a below.
- **Reconciliation owed (the new thread):** every open line of the tracker must have its line in roadmap.md, the record. The outgoing thread compared them. The tracker's lists match the roadmap apart from the gaps in §4 below.

## 2. Scheduled tasks on the operator's account

Read with the scheduled-task list tool on 2026-10-27.

| Task | When | Where it runs | What it does |
| --- | --- | --- | --- |
| Weekly security review — ethio.com | Mondays 06:41 New York; next 2026-11-02 | a fresh session each week | Read-only review. Writes the Project docs claude/security-review-YYYY-MM-DD.md and overwrites claude/security-review-latest.md, then notifies the operator. **The supervisor thread registers its findings as INCs itself** (the task's own prompt says so). |
| ethio.com legal watch | 15 April and 15 October, 08:41 New York; next 2027-04-15 | a fresh session | The six-monthly legal review (DEC-220). Writes a Claude Doc and notifies the operator. |
| Renew ethio PROMOTE_TOKEN | 2027-01-11 | a fresh session | Reminds the operator to renew the token before about 2027-01-18. |
| Remind: DMCA agent registration | 2026-10-29 00:00Z (Wed 28 Oct, 20:00 New York) | **the OUTGOING thread's session** | The operator asked for it on 2026-10-21. |
| Remind: real legal phone number | 2026-10-29 00:05Z (Wed 28 Oct, 20:05 New York) | **the OUTGOING thread's session** | The operator asked for it on 2026-10-21. |

The two reminders fire into the retired thread. The outgoing thread tried to move them to standalone scheduled tasks, but this session is not permitted to create scheduled tasks, so they stay where they are, and it will relay them in one line if they wake it. **The new thread should set the same two reminders in its own session** (texts below) once the operator agrees. After that, the old two can be deleted.

- **DMCA agent registration:** still a launch requirement (docs/governance/launch-gate.md :82). Steps: copyright.gov → DMCA designated agent directory → create an account → designate the company's agent (name, address, the legal mailbox, a separate voicemail phone number) → pay about $6 → put the renewal date (every three years at most) in the calendar. Protection starts only from the filing date.
- **Real legal phone number:** the phone in Admin › Legal facts is a placeholder. (1) Get a Google Voice number (Atlanta area). (2) Admin › Legal → Edit facts: put it in "Phone for legal matters" and in the "Copyright agent" line, then Save. (3) Terms of Service → New version → publish as a Correction (effective at once, nobody is asked again). (4) Use the same number for the copyright agent at copyright.gov.

## 3. The 2026-10-26 security review: findings not yet registered

The report is in the Project (the security review of 2026-10-26). It found no critical or high findings. **None of its new findings has an INC yet.** To register:

- **N1 (LOW).** A staff-only door writes one row per call without a rate gate. Registered as INC-951; its detail is held back from the public repository until the fix is live (G51; the INC-443…INC-448 precedent). The Project copy of this document and the Project's security review of 2026-10-26 hold it.
- **N4 (INFO, needs a decision).** The AI gateway's audit row is best-effort: src/server/ai/gateway.ts :400-418 and src/server/ai/audit.ts :16-34 return the billed answer even when the `ai_calls` row cannot be written. For verdicts about a person (the imitation check, the assist's screening), a database hiccup gives an acted-on verdict with no audit row.
  - Decide one of: record "best-effort" as a DEC, or refuse the verdict (`unavailable`) when the row cannot be written (the stricter reading of G54 b).
- **N2 and N3 (INFO):** no action. N2 is the sign-up acceptance taken from the client's tick (by design, D230). N3 is the dependency audit reds of 10-20 → 10-24, all closed.
- **Carried, still standing:**
  - INC-443: the public-surface allowlist backfill. Eleven older browser grants are missing: listing_reveal_count, cat_primary_pointer, cat_primary_parent, get_category_tree_version, admin_list_categories, price_shape_for_basis, impersonated_list_listings, attr_answer_tokens, attr_answer_other_text, attr_contact_like and listing_contact_refusals. The admin_reveal_listing_contact line still says "with a fresh second factor". transition_listing is listed twice.
  - INC-446: the map key returned by GET /api/map/tiles, by design.
  - INC-409: has_permission answers for any user id.
  - The anonymous doors' address gate (detail held back until the fix is live, G51). INC-846 is the nearest record; the door mechanism (Foundations 5) is its natural home.
- The next report arrives Monday 2026-11-02. Read it the same day and register its findings.

## 4. Owed items with no roadmap line (found in this audit)

Each needs an INC or a roadmap line from the new thread, landed in its next turn's records part.

- **a. The Claude Code kit's efficiency change.** This is decision (2) of 2026-10-26. It was recommended and never answered, and it is not built. At `0586d7f2`, .claude/agents/reviewer.md says `model: inherit`, no rule file in .claude/rules/ has a `paths:` scope, and land.ts runs every check. The change has three parts:
  - the full checks once per turn, not up to five times;
  - each rule file loaded only when its files are touched;
  - the reviewer on Sonnet, and skipped on records-only turns.

  It is a Lovable turn, because .claude/** is closed to the Claude Code executor. **Ask the operator first.**

  The third part conflicts with his standing directive of 2026-10-26 (project memory, ways-of-working.md): "every turn [waits] for the reviewer's report before landing, built into the executor's rules so it always happens". So the question to him is only whether the reviewer may run on Sonnet. It is not whether the reviewer may be skipped.
- **b.** The security review's N1 and N4 (§3).
- **c. The two "Try again" buttons.** src/features/legal/certify-block.tsx :82 and src/features/legal/legal-accept-screen.tsx :109 still show `common.tryAgain`. This was turn 34c-1's K2 review question. Decide: if each one retries a request, keep it. If it retries a download, it moves to the on-demand failure notice's Refresh (INC-911, INC-918). Read the code, then rule.
- **d. Country-code shape copies.** These four files each test `/^[A-Z]{2}$/` beside legal-kinds.ts :101's `COUNTRY`:
  - src/features/admin/legal/legal-service.ts :107
  - src/features/posting/calling-codes.ts :131
  - src/features/posting/pricing-data.ts :277
  - src/features/legal/legal-kinds.ts :101 (the `COUNTRY` itself)

  Fold them into the locale and format mechanism's census (Foundations item 6, "one constants module").
- **e. A fresh phone measurement of the published site after the next Publish.** The tracker's speed item says this shows what turns 24–34 bought. It is the speed study's baseline (D234) and has no roadmap line.
- **f. Turn 34f-2's review findings.** docs/governance/reports/foundations-turn-34f-2.report.md §10 lists three MAJOR and six MINOR review findings "for a ruling". Two of them:
  - `places.list` (20261017105751 :157–166) has no `is_active` filter, so the ad page can name a switched-off place that the tree hid. This is a database turn.
  - HB-1 passes every consumer, not every finding, to `readAllowlist`, so a stale exemption line would not fail.

  At `e2287d6d` the incident ledger ends "Numbering: next free INC-949" (incidental-findings.md :5366), and neither INC-949 nor INC-950 appears anywhere in the repository. Whatever numbers the new thread gave these rulings in its own record, their entries and roadmap lines land in its next records part. The other findings each need a ruling recorded too.
- **g. The nightly's new time is not landed.** On 2026-10-27 he asked for the nightly full run to start at 11:30 am Atlanta time (memory, ways-of-working.md), but at `e2287d6d`, .github/workflows/nightly-e2e.yml :10 still reads `cron: "0 18 * * *"`. GitHub's cron is UTC only, and Atlanta leaves daylight time on 2026-11-01: 11:30 am is 15:30 UTC until then and 16:30 UTC after. The change therefore carries a seasonal re-time (the 2026-07-16 governance's DST rule) and a line for the next switch on 2027-03-14. It is a workflow change, so it is a Lovable turn. If the new thread has already decided or briefed it, this item is only its roadmap line.

## 5. Standing directives in the project memory that v1.15 does not carry, or carries in an older form

The project memory is readable from the new thread: the project memory's preferences.md and ways-of-working.md. Read both whole; they are the operator's own words, dated. Where v1.15's text is OLDER than his word, his word governs. Each conflict below is to be corrected at v1.16.

- **Staging migrations.** Since 2026-10-24 the supervisor applies ethio-staging migrations itself through the Supabase connector (DEC-246), so work does not stop when he is away. When he applies one himself, the instruction is only "apply the new migration to staging": no link, no click-by-click steps (2026-10-07). His staging apply is not held for the supervisor's review (2026-10-07). G45's click-by-click staging text is older.
- **Production migrations.** They always go the normal way: Lovable applies them through its migration tool, so the history is recorded. Never an operator upload or an out-of-course route, even for a large file (2026-10-17). v1.15's §4 "one recorded exception" (the operator applies an existing file on prod) is superseded.
- **Lovable sending.** From 2026-10-24 the supervisor sends Lovable its prompts directly through the Lovable connector. He connected it "for exactly that purpose"; he keeps the major decisions, the walks and Publish. G56's last clause ("when the operator is present he pastes the file himself") was the outgoing thread's own cost reasoning on 2026-10-27, not his directive. He asked at 10:08 local "Have you stopped working directly with lovable?" and did not answer the reply. Default to sending through the connector (a long brief as a file via the connector's upload) unless he says otherwise. Checks on a running Lovable turn happen only when he says he is away (2026-10-27, G57).
- **No scheduled checks.** At 17:09 local on 2026-10-27 the operator said: "please cancel your scheduled checks. I will report to you". This is on top of G57. The supervisor schedules no check-ins and runs no background CI waits unless he says he is away. He brings each executor's report. The outgoing thread had none running when he said it. The only scheduled items it held were his two reminders (§2), which are reminders, not checks.
- **Do not idle the executor on CI.** A new push queues behind the running CI run; it does not cancel it (he corrected this repeatedly, 2026-10-24). So the next executor prompt goes out as soon as the turn is verified, without waiting for CI. CI is reviewed afterwards, and any fix is folded into the turn after that (2026-10-05, 2026-10-11). v1.15's G36 sentence ("send the executor nothing until the run has completed") is older than this and is to be corrected at v1.16. Meanwhile his word governs.
- **Prepare ahead.** The next brief or records file is prepared while the executor works, never after it sits idle (2026-10-07). Prompts and executor work stay lean on credits: cut duplicate work such as anything CI already does, but never at the cost of quality (2026-10-26, 2026-10-27).
- **The executor's limits.** A brief never asks Lovable for something its platform forbids, such as writing under supabase/migrations/ or fetching the ci-evidence branch. Check every brief against the executor's known constraints before it is sent (2026-10-17). Lovable's Knowledge is kept within its cap by compacting wording only, never by dropping a rule (2026-10-23).
- **Claude Code sessions.** On 2026-10-25 he said "Claude drives the executor itself rather than him pasting briefs" (memory). v1.15's G56 has him start each Claude Code session and paste the carrier, which is how every Claude Code turn has run so far. Raise the gap with him at v1.16, and check whether any tool in your session can start and message a Claude Code session. Until then G56's practice stands.
- **Superseded, for the record:** his 2026-10-24 wish that the supervisor check a running Lovable turn "about every minute" was replaced on 2026-10-27 by checks only when he says he is away, and then by "please cancel your scheduled checks. I will report to you".
- **Which executor.** Lovable when he is away from his computer and phone; Claude Code when he is around (2026-10-25). The Claude Code cloud credit runs to 2026-11-05 (G59). He uses about 4,500 Lovable credits a month and will not accept worse work.
- **Never drop an item.** Whenever a new order of work is drawn up, no item previously identified as needing a fix or a build may be dropped (2026-10-06). The roadmap's stages are never marked done or removed; they are reviewed together after the phased implementations (2026-10-16).
- **Explaining bundles first.** Before a full bundle goes to Lovable, explain each part to him in detail, with anything he needs to comment on, then produce the final one (2026-10-05). Each feature decision is discussed when its stage is reached and checked against earlier decisions (2026-10-06).
- **Design rules.** A document's name is itself the link inside the sentence (2026-10-23). Every design starts from the best known implementation of the pattern. The app must feel instant (2026-10-23).
- **Reminders he asked for.**
  - The ahead-of-Jiji plan is re-discussed after the staged implementations (memory areas/ahead-of-jiji-plan.md; Project doc claude/ahead-of-jiji-plan-2026-10-14.md; repository docs/governance/plans/ahead-of-jiji.md).
  - The Sage 3D redesign and the left rail come before Stage 2 (in the handoff).
- **Launch items** (docs/governance/launch-gate.md): a Resend sending domain and Supabase SMTP for ethio-prod (:5); the legal@, privacy@ and security@ mailboxes (:81).

## 6. Project docs that hold work decided and not built

These are named in the repository but live only in the Project. G53 wants decided specs in the repository, so the new thread's next records part imports the four speed documents (the first four below) into docs/governance/plans/.

- claude/speed-plan-2026-10-25.md: the speed plan (D234) behind turns 23–37 and the speed study.
- claude/edge-caching-study-v1.md: DEC-263, edge caching at the Cloudflare cutover; the spec is owed.
- claude/card-photos-stable-links-study-v1.md: DEC-264, stable card-photo links for live ads; the spec is owed.
- claude/category-pictures-convert-spec-v1.md: DEC-265 and INC-900, the stored category pictures re-cut.
- claude/supabase-door-spec-v2.md: built as turn 34 (v1 is superseded). claude/supabase-off-first-paint-study-2026-10-25.md is its study.
- claude/systems-audit-2026-10-23.md: the source of the Foundations mechanisms. The forms, server and ai reports are the specs G54 cites.
- claude/executor-kit-v1.md and claude/executor-research-2026-10-25.md: the Claude Code kit and the research behind it.
- claude/security-review-2026-10-26.md and claude/security-review-latest.md: §3.
- claude/legal-peer-review-2026-10-19.md (and its note), claude/terms-privacy-v2-approved-rev108.md and claude/legal-texts-v2-final-am-review-2026-10-21.md: the legal texts and the review behind them. The legal watch reads them.
- claude/marketplace-feature-review-2026-10.md and claude/ahead-of-jiji-plan-2026-10-14.md: the product plans to re-discuss later.
- claude/supervisor-tools-2026-10-27.md: the tools, already restored.

## 7. The new thread's checklist for today

1. Read this document, then preferences.md and ways-of-working.md in the project memory, then claude/security-review-2026-10-26.md.
2. Open the tracker (§1). Confirm every open tracker line has its roadmap line, and list any it does not.
3. Register §3's N1 and N4 and §4's items (numbers from the ledger and the running record, G41). Put their roadmap lines and this document (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md) in the next turn's records part.
   - **G51:** the repository is public. Before importing, drop from the repository copy the tracker's address and container id (write "the Foundation fixes tracker, a Claude Doc in the Project"), the e-mail addresses and the Project doc links. The Project copy keeps them.
4. Ask the operator two things together, in one short message: decision (2) (§4a, Sonnet for the reviewer only), and INC-930's (a) or (b).
5. Offer to set the two reminders of §2 in your own session.
6. Record the outgoing thread's slip: the first handoff (G53) left out the tracker's address and its rules, the scheduled tasks bound to the old session, the unregistered security findings, the newer standing directives in memory, and the unanswered kit decision. **Corrective:** before any handoff is written, a checklist is run and its results appear in the handoff:
   - list the scheduled tasks;
   - list the Project docs and memory files changed since the last handoff;
   - read the tracker whole and compare it with the roadmap;
   - list every decision put to the operator and not answered;
   - read the latest security review and confirm its findings are registered.
FILE-END docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
FILE-BEGIN docs/governance/plans/speed-plan-2026-10-25.md
# Speed plan — D234 (2026-10-25)

Supervisor's working plan; the repository record lands at the next records turn. Numbers marked ESTIMATE are not measured.

## 1. Baseline — published site, Foundations turn 23 (docs/perf/baseline-2026-10-25-*.json)
Lab: scripts/perf/lab.ts — Lighthouse mobileSlow4G devtools constants (562.5 ms latency, 1,474.56 Kbps down, 675 Kbps up, CPU 4×), 360×740 phone, median of 3 cold runs.

| Page | TTFB | FCP | LCP (element) | TBT | Total | Requests |
|---|---|---|---|---|---|---|
| home | 1236 | 3260 | 3260 (footer text — the feed is not on the first paint) | 663 | 509.8 KB | 74 |
| category | 912 | 2900 | 2968 | 751 | 510.1 KB | 75 |
| ad | 938 | 3168 | **6008** (category picture, card-*.png) | 685 | **893.6 KB** | 96 |
| seller | 1080 | 3112 | 3112 | 612 | 550.3 KB | 78 |
| post | 827 | 2860 | 2860 | 542 | 555.0 KB | 67 |
| auth | 610 | 2668 | 2668 | 528 | 548.8 KB | 77 |
| terms | 1175 | 3276 | 3276 | 799 | 536.3 KB | 71 |

Bytes by type (cold): script 340–395 KB on every page; fonts 87 KB (Latin), 281 KB on the ad page (Noto Sans Ethiopic 400/500/600); the ad page 135 KB of images. Two render-blocking Google Fonts stylesheets sit in front of every first paint (src/routes/__root.tsx :286-:293).

## 2. Targets (from studies/speed/research.md; pre-committed)
- LCP ≤ 2.5 s on the lab for home, category, ad, seller, auth (stretch 1.8 s); CLS ≤ 0.1; TBT ≤ 200 ms; TTFB ≤ 0.8 s.
- First-paint JS ≤ 150 KB compressed for feed, ad and seller pages; ≤ 200 KB for the wizard; ≤ 100 KB for sign-in (stretch). Today: entry 302 KiB gzip-6.
- Web fonts 0 KB on Amharic pages (Android ships Noto Sans Ethiopic).
- JUDGE for every speed turn (frozen now): a turn is kept when, on two lab runs after Publish, the pages it targets improve on their named metric and no other page's median LCP rises by more than 10%; otherwise it is reverted or re-planned before the next speed turn.

## 3. Turns
- **S1 — Foundations turn 24 (drafted, sha recorded at send).** Per-page first-download ceilings for all 50 pages (scripts/route-budgets.mjs, ratchet), public must-stay-lazy list; loadOnce (glyph map, calendar, leaflet, phone parser) + on-demand import census; useNearViewport (buyer's map, similar ads); pure schema shapers off the ad page. Measured gzip-6: entry 302.2 → 289.9; home 315.5 → 303.3; ad 343.5 → 326.7; wizard 439.2 → 421.3. INC-895, INC-896, INC-897.
- **S2 — the ad page's LCP and the home page's first paint (no DEC).** Gallery photo links signed in the loader (the DEC-195 pattern) with fetchpriority/preload on the first photo; category pictures as WebP at card size (640×480 PNG today); the home/category feed's first page rendered on the server (#1 of the census); legal pages dehydrate only the reader's text (Tier A).
- **S3 — the language path (no DEC).** Render in the starred language on the server; skip the base-language DB catalogue; one language read per load; entity bundle over a cacheable GET.
- **S4 — the entry diet (no DEC).** Supabase client off the anonymous first paint; admin code off the entry; en-base split by surface; header menus loaded on first open; the React.lazy sites onto loadOnce (INC-897). Goal: entry ≤ 200 KiB, then ≤ 150.
- **S5 — fonts (operator decision A).** Package or asset change in its own turn (G42).

## 4. Decisions for the operator
- **A. Fonts** — (a) the phone's own fonts, 0 KB (recommended; FCP −1 to −1.5 s ESTIMATE; Amharic unchanged on Android, English and headings in the phone's font); (b) one self-hosted English font (Inter, 2 weights, ≈ 40 KB ESTIMATE) + the phone's Ethiopic, Bricolage dropped; (c) all three families self-hosted and non-blocking.
- **B. Edge caching of public pages for signed-out visitors** at the DNS cutover (Cloudflare proxy): TTFB −0.4 to −1 s ESTIMATE; needs a DEC because a newly published language or category shows within the cache window (≈ 60 s) instead of on the next load (INC-113 law).
- **C. Stable card-photo URLs** (D151 private bucket): repeat feed views re-download every card photo today (≈ 0.4–0.8 MB per repeat view ESTIMATE); a DEC on the privacy trade.

## 5. What the first download holds (S4 input; measured 2026-10-25 on the S2 prototype build, source maps)
The home page's first download is 303.3 KiB gzip-6 in 58 chunks; five chunks are 78% of it:
| Chunk (gz) | What it is (raw KiB by source) | Lever |
|---|---|---|
| index 127.0 | react-dom 171; @tanstack/router-core 49 + react-router 10; the shell 44 (app-rail 15, app-shell 11, breadcrumbs 7, header 6, location selector 4); **admin code 14** (admin-users-service, roles-service, impersonation service/banner, sections); @radix-ui/react-menu 14 + dialog 6; lucide 8 | admin code and the menus off the entry (S4) |
| client 52.7 | **@supabase/supabase-js 205 raw**: auth-js 92, realtime-js + phoenix 54, storage-js 21, postgrest-js 15 | the Supabase client off the anonymous first paint, or the realtime and storage clients off it (S4; the largest single lever) |
| provider 27.4 | **the base catalogue 71 raw** (src/i18n/locales), the i18n provider 7, auth 8 | split the base catalogue by surface (S3/S4) |
| tooltip 12.6 | Radix tooltip + floating-ui 34 raw | tooltips on first hover, or the native title on public pages (S4) |
| createServerFn 11.8 | seroval 24 raw (server-function serialisation) | stays (loaders need it) |
ESTIMATE of S4's ceiling: −60 to −90 KiB gz from the entry (to about 200–230 KiB), most of it the Supabase client.
FILE-END docs/governance/plans/speed-plan-2026-10-25.md
FILE-BEGIN docs/governance/plans/edge-caching-study-v1.md
# Study — edge caching of signed-out public pages at the DNS cutover (DEC-263; spec owed)

Status: study v1, 2026-10-26, the supervisor. DEC-263 is approved (Tesfaye, 2026-10-25, "all as recommended"): Cloudflare keeps a copy of public pages close to the visitor and serves it while refreshing it in the background; every staff publish of a category, language, price or legal text drops the copy at once; only pages that carry no account data are cached, and each language keeps its own copy. This note records the constraints found in the code and the platform; the spec follows before the cutover.

## Constraints found

- **Hosting:** Lovable's custom-domain page: a standard setup is DNS only (grey cloud); proxying is supported through the connect option "Uses Cloudflare or similar proxy" (a CNAME, Lovable issues the certificate; "You are responsible for configuring and maintaining your CDN or proxy"). So the ethio.com zone (Tesfaye's Cloudflare account, free plan) can sit in front of the app, with its own cache.
- **What a page's HTML depends on** (src/routes/__root.tsx at the turn-32 prototype): two cookies — the starred language (`LANGUAGE_STAR_COOKIE`, :141) and the saved area (`AREA_COOKIE`, :116, :148) — and the edge's location guess (`geoGuess(getRequest())`, :151-:157: `cf-ipcountry`, `cf-ipcity`, `cf-region-code`); the listings pages' first page comes from the area (`getFirstFeedPage`, :113-:118). The session is in the browser's storage, never a cookie, so the HTML carries no account data — but it does vary by language, area and country.
- **The free plan's cache keys** take the URL (and query string rules) only; keys by cookie or by request header are an Enterprise feature. A rule that caches the URL alone would serve one visitor's language, area or country to another.
- Today the gate list and the language catalogue are never cached across loads (INC-113, `cache: "no-store"`); a cache in front changes that law, hence the purge.

## The shape of the build (recommended)

1. **A small Worker on the ethio.com zone** (Workers' free tier) in front of the app for the public page paths (`/`, `/c/*`, `/l/*`, `/<seller>`, `/terms`, `/privacy`, `/legal/*`): it builds its own cache key — the URL, the language cookie, the area cookie, `cf-ipcountry` (and the city only if the HTML uses it), and a **publish version** — and uses the Cache API: a hit younger than about 60 s is served; an older hit is served and refreshed in the background (`waitUntil`); a miss goes to the app. It never caches a response with `Set-Cookie`, a non-200, or a request with an `Authorization` header or a `?lang=` override; every other path (routes under `/api/`, `/auth`, signed-in screens, the admin) passes through untouched.
2. **Purge by version, not by URL:** every staff publish that changes what a public page shows (categories, languages, prices and units, legal versions, a listing's state) bumps one number (`public.publish_version`, written by those doors in the same transaction); the Worker reads it through one cheap, cacheable endpoint (a few seconds' TTL) and puts it in the key, so a publish makes every old copy unreachable at once in every data centre — no purge API call, no token in the app.
3. **The app's side:** public pages answer `Cache-Control: private, no-store` to browsers as today (the Worker caches, the browser does not), and an `x-ethio-cacheable: 1` header only on a page that holds no request-specific data beyond the key's parts — the Worker caches only those.
4. **Proofs the spec will require:** two languages, two areas and two countries never share a copy; a publish is visible on the next load; a signed-in visitor's page is identical to today's (the session is client-side); a response with a cookie is never cached; the Worker's failure falls through to the app (no blank page); TTFB measured on the lab before and after.

## To verify at spec time

Workers' free-tier request limit against the traffic forecast; whether the city is in the HTML; Lovable's proxy mode with a Worker route on the same hostname; the version endpoint's own cost.

## Order

At the DNS cutover, after DEC-261's turns. DEC-264's public photo origin (`img.ethio.com`) is made in the same zone at the same time.
FILE-END docs/governance/plans/edge-caching-study-v1.md
FILE-BEGIN docs/governance/plans/card-photos-stable-links-study-v1.md
# Study — stable links for live ads' card photos (DEC-264; Tier A; spec owed)

Status: study v1, 2026-10-26, the supervisor. DEC-264 is approved (Tesfaye, 2026-10-25, "all as recommended"): card-size copies of a LIVE ad's photos at stable public addresses, cached for good; originals, drafts and every non-live ad stay private; when an ad stops being live its public copies are deleted and purged at once. This note records what the code holds and the shape of the build; the spec follows before its turn.

## What the code holds (read at the turn-32 prototype)

- One storage seam (DEC-075): `src/server/media/storage.ts` — keys `<partition>/<user>/<listing>/<photo>/<variant>.<ext>`; the database stores `{ partition, key }` per variant, never a URL; two providers, `supabase` (today: the private `listing-photos` bucket, written by the service role) and `r2` (Cloudflare R2 over its S3 API, SigV4 in-house, a `publicBase`).
- Read links expire (D151, INC-588): `src/server/media/links.ts` — `PHOTO_LINK_SECONDS = 3600`, variants `card`, `thumb`, `mid`, `cover`; one reader-and-signer for every door (DEC-195: `readAndSignPhotoLinks`, `signPublicPhotos`, `signPhotoRows`); callers `src/server/ad-page.ts`, `src/routes/l.$slug.tsx`, `src/routes/api/media/photo-links.ts`, the feed's first page (D234 S4) and `listing-detail.tsx`.
- Why repeat views re-download: each load signs a fresh token, so the URL differs and neither the browser nor Supabase's CDN can reuse the bytes (turn 23's lab; ESTIMATE 0.4–0.8 MB per repeat feed view).
- The bucket already has an anonymous read policy on `exif_stripped AND status = 'active'` (storage.ts's note), but a private bucket's public path cannot be read by an `<img>` without a token.

## The shape of the build (recommended)

1. **Where the copies live:** a public R2 bucket behind the ethio.com Cloudflare zone (`img.ethio.com`), made at the DNS cutover with DEC-263 — one origin, Cloudflare's CDN in front, purge by URL through the zone's API. Fallback if R2 is not wanted: a second, public Supabase bucket `listing-cards`.
2. **What is copied:** the `card` variant only (the feed and the ad page's first picture; `thumb` too if the feed uses it), under a name that never changes (`<listing public id>/<photo id>/card.<ext>`, the photo id being new on every edit — D154 B2 replaces a photo's objects when it is edited).
3. **When:** an outbox, not a trigger calling storage: the listing state machine's doors (publish, sold, expire, remove, suspend, the seller's deactivation, delete) write one row per change to `public.public_photo_outbox` in the same transaction; a scheduled job (heartbeat row, G9 ops invariant) copies on `live` and deletes plus purges on leaving it, idempotent and retried; the readers serve the public link only for a photo whose copy is confirmed, and the signed link otherwise (so a missed run degrades to today, never to a broken picture).
4. **The readers:** `links.ts` answers the public link for `card` of a live, copied photo and a signed link for everything else (`mid`, `cover`, drafts, the owner's own non-live ads).
5. **Privacy, as approved:** a public card link works while the ad is live and stops when it leaves (deleted and purged within the job's interval — the spec fixes the interval and the purge); it is unguessable (photo ids are random) and carries no seller data; originals and EXIF never leave the private bucket.

## Proofs the spec will require

A live ad's card link is stable across loads and served with `Cache-Control: public, max-age=31536000, immutable`; leaving live deletes the object and purges it (the link answers 404 at the CDN within the interval); a draft, a suspended or a removed ad never has a public copy (deny proofs); the outbox job's heartbeat and its retry; the readers fall back to signed links when a copy is missing; the photo editor's replace (D154 B2) deletes the old public copy.

## Order

After DEC-261's turns and DEC-265; built with the Cloudflare cutover (DEC-263), because the public origin and the purge live in the same zone.
FILE-END docs/governance/plans/card-photos-stable-links-study-v1.md
FILE-BEGIN docs/governance/plans/category-pictures-convert-spec-v1.md
# Spec — the stored category pictures converted to WebP (DEC-265, INC-900; Tier A)

Status: spec v1, 2026-10-26, the supervisor's design under DEC-265 (Tesfaye, 2026-10-25: "all as recommended" — option (a), a staff conversion, the same pictures; not regenerated). Read at the turn-32 prototype. Nothing here is built.

## Why

Turn 23's lab: the ad page's largest element, the one the page waits on (LCP 6.0 s on the lab's phone over slow 4G), was a category picture, `card-*.png`. Since D234 S2 every new picture is cut as WebP (`PICTURE_WEBP_QUALITY` 0.82, `src/features/admin-categories/category-image-variants.ts` :186-:212) under a versioned name cached for a year (`PICTURE_CACHE_SECONDS`); the 171 pictures made before it are PNG (≈ 127.5 KiB each on average) under the old one-hour cache.

## The concern and the mechanism

CONCERN: a category's picture reaches a buyer's phone as WebP at card size under a versioned name cached for a year — whether it was cut before or after D234 S2.
MECHANISM: the cutter's own encoder (`category-image-variants.ts`) and naming (`pictureExtension`, `card-<ts>.<ext>`), reused; a new staff door that swaps the card and thumb links only.

1. **The door (a migration, Mxx):** `public.admin_convert_category_pictures(p_id uuid, p_old_image_url text, p_image_url text, p_old_thumb_url text, p_image_thumb_url text) RETURNS boolean` — `SECURITY DEFINER`, `search_path public`; `has_permission(auth.uid(), 'categories', 'assets')` and `require_step_up_if_needed('categories', 'assets')`, as `admin_set_category_images`; a compare-and-swap: it updates `image_url` and `image_thumb_url` only while they still equal the old links (a regeneration in between wins: the function answers false and changes nothing); it keeps `og_image_url`, `image_generation_prompt` and `image_accepted_at` (the existing door resets acceptance — "a NEW generation is not the accepted one" — which a format change is not); one audit row `category.convert_pictures` with old and new links. REVOKE from PUBLIC and anon; GRANT to authenticated, with its line in `scripts/public-surface-allowlist.txt`. Proofs in one DO block on a scratch category, RAISE EXCEPTION on failure: the swap; the refusal without the permission; the compare-and-swap refusal; acceptance, prompt and OG unchanged; the audit row.
2. **The service:** `convertCategoryPictures(categoryId)` in `category-images-service.ts` — reads the row (staff read), fetches the card and thumb PNGs from their public links, draws each on a canvas of its own size and encodes it with the cutter's encoder (the same pixels; a 512-square picture from before D122 stays 512 square), uploads `card-<now>.webp` and `thumb-<now>.webp` with `PICTURE_CACHE_SECONDS`, calls the door, and on `true` prunes the two old PNGs (best effort, logged, as the generator prunes); on `false` it removes the two new files and reports "changed meanwhile". A browser that cannot encode WebP stops the run with a message (no PNG is re-uploaded).
3. **The screen:** Admin › Images (`/admin/images`, today a placeholder section page) becomes the pictures tool: "N category pictures are still PNG" with Convert; one category at a time with progress (done, skipped, failed, each failure's category and stage); gated by `categories:assets`. New strings, EN and AM, listed key by key in the brief (G43).
4. **The census guard:** a unit census that every upload under `category-assets` passes `PICTURE_CACHE_SECONDS` and a versioned name (the generator and the converter — two consumers).

## Tests

Unit: the service's order and its `false` path (mocked storage and door); the encoder keeps the size. E2E (new `e2e/admin-category-pictures.spec.ts`): a scratch category with PNG pictures (its own rows and storage objects, removed in afterEach — G27) is converted; its links end `.webp` and are served `image/webp`; acceptance and the OG link are unchanged; the audit row exists; a staff member without `categories:assets` sees no Convert and the door refuses (deny proof, no file written).

## Size and order

ESTIMATE one turn with a migration stop (apply on ethio-prod through the executor's tool behind the operator's approval; ethio-staging first). After DEC-261's turn 34; the operator presses Convert once after Publish (an operator step, listed in the closing message).
FILE-END docs/governance/plans/category-pictures-convert-spec-v1.md
EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-949.
OLD-END
NEW-BEGIN
## INC-949 — the ad's public document names places the location tree hides (2026-10-27; turn 34f-2's review, MAJOR 2)

Defect: `public_listing_json` (migration 20261017105751 :157–:166) builds `places.list` from the listing's places joined to `locations` with no rule on `is_active`, while `get_location_tree` (20260915190024 :47–:63) keeps only active places under active ancestors. A place switched off, or one under a switched-off country, region or city, is therefore still named in an ad's public document. The names rode the document before turn 34f-2; since 34f-2 the ad page draws them (`placeList`). Place names only, no person data. Fix: `public_listing_json` redeclared whole from its live definition (a Tier A migration turn, G39), filtering `places.list` by the tree's rule written once as one SQL predicate both doors use, its proofs on scratch rows; the list also carries each place's ancestor path for the Maps address (the review's MAJOR 3, accepted). Class: concern "a public read shows only the places the location tree shows"; mechanism: NONE YET (the tree's rule as one predicate). Status (2026-10-27): OPEN.

## INC-950 — HB-1 cannot see an outdated exemption line (2026-10-27; turn 34f-2's review, a MINOR)

Defect: scripts/conformance/holds-its-box.test.ts :134 hands `readAllowlist` (scripts/conformance/kit.ts :51) every consumer it found, not the keys it found bypassing the mechanism, so a line naming a part that now holds its box is not "stale" and stays on the allowlist unnoticed (G55: a stale line fails its test). Fix: HB-1 passes its finding keys; a planted stale line proves the refusal (red first); with it, a census of the other seventeen callers of `readAllowlist` (each must pass what it found bypassing, not what it scanned). Class: concern "an exemption leaves the allowlist the day its finding does"; mechanism `readAllowlist`, G55. Status (2026-10-27): OPEN.

## INC-951 — a staff-only door writes one row per call without a rate gate (2026-10-26 security review, N1; LOW)

Registered with its detail held back from the public repository until the fix is live (G51; the INC-443…INC-448 precedent); the security review of 2026-10-26 in the Project holds it. Fix: the door gated by `rate_gate`, or the row written by the server after the route has verified the caller and its browser grant revoked — a Tier A migration turn; the door mechanism's manifest (Foundations, the door mechanism) lists it. Class: concern "a door that writes a row per call is rate-gated"; mechanism `rate_gate` and the door manifest. Status (2026-10-27): OPEN.

## INC-952 — an AI verdict about a person is acted on when its audit row could not be written (2026-10-26 security review, N4)

Defect: src/server/ai/gateway.ts :400–:418 and src/server/ai/audit.ts :16–:34 return the billed answer even when the `ai_calls` row cannot be written ("audit failure never changes a billed answer"), so for the verdicts about a person — the identity imitation check, the assist's screening — a database hiccup gives an acted-on verdict with no audit row. Fix (DEC-280): the task registry marks the tasks that judge a person; for those the gateway answers `unavailable` when the row cannot be written, and the caller shows its "try again later" refusal; the other tasks stay best-effort; a test proves the refusal and that nothing was acted on (G38). Class: concern "an AI verdict about a person is audited before it is acted on"; mechanism the AI gateway (`aiCall`, register row of the gateway). Status (2026-10-27): OPEN.

## INC-953 — two load-error retries drawn by hand (2026-10-27; turn 34c-1's K2 question, ruled)

Defect: src/features/legal/certify-block.tsx :77–:84 and src/features/legal/legal-accept-screen.tsx :102–:111 each draw a failed read and its `common.tryAgain` button by hand, and they differ (`role="alert"` on the box in one, on the paragraph in the other; `min-h-11` on one only). Ruling: both retry a request (`query.refetch()`), not a code download, so neither moves to the on-demand failure notice's Refresh (INC-911, INC-918); both KEPT as retries. Fix: both become consumers of the loading-state mechanism (QueryState, the Foundations list) with its one error-and-retry shape. Class: concern "a read that failed, offered again"; mechanism QueryState (NONE YET). Status (2026-10-27): OPEN.

## INC-954 — a country code's shape is tested by copies (2026-10-27; the handover supplement §4d)

Defect: four app files test `/^[A-Z]{2}$/` by their own copy — src/features/legal/legal-kinds.ts :101 (`COUNTRY`), src/features/admin/legal/legal-service.ts :107, src/features/posting/calling-codes.ts :131, src/features/posting/pricing-data.ts :277 — and database doors carry their own `'^[A-Z]{2}$'` (in landed files 20260915162505 :531, :588, :648, 20260916215832 :139, 20260917000149 :41, 20260917205429 :54, 20260915170752 :206; the census reads the live definitions). Fix: one country-code shape in the locale and format constants module (Foundations, locale and format — "one constants module"), every copy onto it, with its census. Class: concern "a country code's shape is checked in one place"; mechanism the locale and format constants module (NONE YET). Status (2026-10-27): OPEN.

INC-930 (an offline sign-out from a page whose marketplace code never downloaded): the operator chose (b) on 2026-10-27 — the Home page's code is fetched ahead of time for a signed-in visitor (at most 13.5 KB compressed, once) — DEC-279; it rides turn 34c-4.

Numbering: next free INC-955.
NEW-END
EDIT docs/spec/spec-ledger.md #1
OLD-BEGIN
NUMBERING after this block: next free DEC-277, D239, INC-945, S457, ACT-021.
OLD-END
NEW-BEGIN
NUMBERING after this block: next free DEC-277, D239, INC-945, S457, ACT-021.


S79 · 2026-10-27 16:1xZ → 2026-10-27 22:0xZ · THE FRESH SUPERVISOR THREAD (INSTRUCTIONS v1.15) — FOUNDATIONS TURN 34f (INC-940: A LATE PART HOLDS ITS BOX — REGISTER ROW 60; A TEST READS A LAYOUT WHOLE — ROW 61) AND 34f-2 (THE AD PAGE'S PLACE NAMES FROM THE SERVER'S DOCUMENT — INC-947), THE NIGHTLY'S HOUR (DEC-277), THE HANDOVER SUPPLEMENT (S457) AND THE OPERATOR'S THREE ANSWERS (DEC-278–DEC-280)

What landed (times Z unless marked local; local is UTC−4):
- 16:1xZ — the fresh thread's session start (v1.15 §2): dev = main = `0586d7f2`; records turn R5 verified CLEAN (run 40532962246 SUCCESS); the supervisor's tools written back from the Project, every file sha-exact.
- 18:3xZ — Foundations turn 34f (Claude Code; brief 7f9bfad2… / 120,662 B) stopped once (`0026bd30`, docs/governance/reports/foundations-turn-34f.stop-1.md): its own proof ALS-1 was red on mobile-360 — the place line, drawn from the country tree after the paint, grew the Location box by 32 px. Run 40560297547 SUCCESS (0 flaky).
- 19:56Z — turn 34f-2 (brief b711cbee… / 36,974 B; the supervisor's ruling, neither of the stop's options): the ad page's view carries the places' names from the server's document (`placeList`; AV-9, LDM-2). Landed `e2287d6d`; every file byte-equal to the prototype; unit 333 files / 2,018 passed; the four e2e files 143 passed, 5 skipped, 0 failed; ALS-1 green three times on both projects. Review READY · 0 BLOCKER · 3 MAJOR · 6 MINOR (the rulings below). Run 40574354034 SUCCESS (20:23:49Z, 0 flaky, main promoted).

THE OPERATOR'S WORDS (local time)
- 12:14 — the fresh thread, with "Go" for INC-940.
- 16:5x — the nightly full run to start at 11:30 am Atlanta time; the Flake check queued behind tonight's nightly left to start after its 60-minute staging gate rather than the nightly cancelled.
- 17:09 — "please cancel your scheduled checks. I will report to you".
- 17:3x — the handover supplement: "Read the Project doc … whole, then preferences.md and ways-of-working.md in the project memory. It lists what the first handoff left out. Work through its §7 checklist, register its findings, and land it in the repository with your next turn."
- 17:4x — three answers: the Claude Code reviewer stays on the executor's model; INC-930 (b); an AI verdict about a person is refused when its audit row cannot be written.

DECISIONS
- DEC-277 (the operator's hour, the supervisor's form, 2026-10-27): the nightly full run starts at 11:30 America/New_York all year — two crons, 15:30 and 16:30 UTC, the job going on only when the New York hour is 11, so the seasonal change needs no re-time (the 2026-07-16 governance's DST rule satisfied by construction). A workflow change: a Lovable turn, with INC-936. Watch: a 280–358-minute nightly from 11:30 runs to about 16:10–17:30 local.
- DEC-278 (the operator, 2026-10-27 — decision (2) of 2026-10-26): the Claude Code reviewer keeps the executor's model (`model: inherit`) and runs on every turn (his standing directive of 2026-10-26); the kit's full checks run once per code tree — the executor's own check run (protocol step 5) through land.ts's cache, so the landing does not run them again on the same tree. The rule files are not scoped by path (the supervisor's correction after reading, G17: a path-scoped rule loads only when a matching file is read, so a file written new before any read would miss its rule — ESTIMATE 3,000–4,000 tokens saved a session; quality first, G59). A Lovable turn (.claude/** is closed to the Claude Code executor).
- DEC-279 (the operator, 2026-10-27; INC-930): (b) — for a signed-in visitor the Home page's code is fetched ahead of time (at most 13.5 KB compressed, once, measured 2026-10-26), so an offline sign-out lands on a working page. Rides turn 34c-4.
- DEC-280 (the operator, 2026-10-27; the security review's N4, INC-952): a verdict about a person (the identity imitation check, the assist's screening) is acted on only once its `ai_calls` row is written; when the row cannot be written the call answers `unavailable`; the tasks that judge no person (category icons, translation) stay best-effort. The stricter reading of G54 (b).

THE SUPERVISOR'S RULINGS ON TURN 34f-2'S REVIEW (G17; overridable)
- MAJOR 1 (MapLarge's failure place is now MapFrame inside the dialog) — ACCEPTED: the map's word in the map's box everywhere; the allowance's reason (the loading place) stays true.
- MAJOR 2 (`places.list` has no active rule) — INC-949.
- MAJOR 3 (the Maps link from the first paint is a names-only query until the tree arrives) — ACCEPTED; the document's list carrying each place's ancestor path rides INC-949's door change.
- MINORs: listing-preview.tsx :107 and :114–:123 (K2) join INC-947's LEFT list; HB-1's stale-allowance gap — INC-950; e2e/post-wizard-where.spec.ts :931's comment moves with INC-946's file work; the rest accepted as written.

THE HANDOVER SUPPLEMENT (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md; the Project keeps the full copy): read whole with the project memory's preferences.md and ways-of-working.md and the security review of 2026-10-26; its §7 checklist worked — the tracker's 37 open lines compared with roadmap.md at `e2287d6d` (the lines without a roadmap line are written by records turn R6: INC-949–INC-954, ACT-021, DEC-277/DEC-278's Lovable turn, INC-443's rest; the PW-94 and PW-54 single lines stay on the watch list; the launch items are in docs/governance/launch-gate.md :5, :81, :82); its findings registered; the four speed documents of §6 imported into docs/governance/plans/; the two reminders of §2 offered in the new session.

RULES IN FORCE, ADOPTED IN THIS BLOCK (not yet in the instructions — installed at v1.16, G46): S457's pre-handoff checklist; from the project memory (the operator's dated word, newer than v1.15) — the supervisor applies ethio-staging migrations itself through the Supabase connector (DEC-246), and when the operator applies one the instruction is "apply the new migration to staging" (G45's click-by-click text is older); production migrations only through Lovable's migration tool, never an operator upload (§4's "one recorded exception" withdrawn, 2026-10-17); Lovable is sent its briefs through the connector by default (G56's last clause withdrawn); no scheduled checks and no background CI waits unless the operator says he is away (17:09 today); the next executor prompt goes out as soon as a turn is verified, not after CI (G36's "send the executor nothing until the run has completed" withdrawn — runs queue, DEC-181); his wish of 2026-10-25 that the supervisor start the Claude Code sessions is put to him at v1.16 (G56's practice stands until then).

INCIDENTS — INC-949 (the ad's public document names places the tree hides), INC-950 (HB-1 blind to an outdated exemption), INC-951 (a staff-only door without a rate gate — detail held back, G51), INC-952 (an AI verdict about a person without its audit row — DEC-280), INC-953 (two load-error retries drawn by hand — KEPT as retries, onto QueryState), INC-954 (a country code's shape tested by copies); INC-930's answer (DEC-279). In docs/tracking/incidental-findings.md.

SLIPS — S457 (the first handoff's omissions; the pre-handoff checklist); in docs/governance/instructions-amendments.md §Slips.

ACTIONS — ACT-021 (a phone measurement of the published site after the next Publish); in docs/tracking/action-tracker.md.

OPERATOR STEPS OWED — a Publish of dev's head and one walk (the map's credit now on the map's foot, turn 34f); the Flake check's result for INC-940's judge; the two reminders of the supplement §2 (the DMCA agent registration and the real legal phone number, 2026-10-29) in the new session on his word; the items carried from blocks S76–S78.

JUDGES OPEN AT THE CLOSE OF THIS BLOCK: INC-940 — the operator's Flake check on `e2287d6d` (specs e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8; run beside the nightly, a red read before it counts) with no failure, and no AP-36 flake line in the next 20 CI runs from `e2287d6d`; DEC-276's twenty runs; the judges of block S78.

RECORDS OWED — .claude/rules/20-tests.md gains `layoutBoxes` (DEC-278's Lovable turn); system-state.md's position at the next bundle close.

CURATOR STATE AT THE CLOSE OF THIS BLOCK: unchanged — as block S76 left it.

NUMBERING after this block: next free DEC-281, D239, INC-955, S458, ACT-022.
NEW-END
EDIT docs/governance/instructions-amendments.md #1
OLD-BEGIN
- S456 (G5 and G16's addendum — a number in a brief is measured or labelled ESTIMATE; 2026-10-27 14:4xZ, found on turn 34e's first run) — turn 34e's brief set every install's deadline at 300 s a try and the certificate tools' at 180 s without measuring a single step's times, and its decisions line called the deadlines "generous multiples of the measured times" (true of the job deadlines, measured on run 40406394089; not of the install deadlines). The Chromium install's measured tail (66 of 371 lane runs past 300 s, 895 s at most) was readable from the Actions API the same day. The first run lost lanes 3, 5 and 12 (INC-943) and with them the turn's green: the fix rides records turn R5. Its sibling: a retry was put on package installs, which cannot be repeated after a cut-off. Corrective (DEC-276): every deadline, ceiling or size a brief sets is computed from CI's own history (the step's median, 99th percentile and maximum over at least 300 runs, shown in the brief), with at least half again as margin; a retry only where re-running is safe.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
OLD-END
NEW-BEGIN
- S456 (G5 and G16's addendum — a number in a brief is measured or labelled ESTIMATE; 2026-10-27 14:4xZ, found on turn 34e's first run) — turn 34e's brief set every install's deadline at 300 s a try and the certificate tools' at 180 s without measuring a single step's times, and its decisions line called the deadlines "generous multiples of the measured times" (true of the job deadlines, measured on run 40406394089; not of the install deadlines). The Chromium install's measured tail (66 of 371 lane runs past 300 s, 895 s at most) was readable from the Actions API the same day. The first run lost lanes 3, 5 and 12 (INC-943) and with them the turn's green: the fix rides records turn R5. Its sibling: a retry was put on package installs, which cannot be repeated after a cut-off. Corrective (DEC-276): every deadline, ceiling or size a brief sets is computed from CI's own history (the step's median, 99th percentile and maximum over at least 300 runs, shown in the brief), with at least half again as margin; a retry only where re-running is safe.
- S457 (G53 — a handover is loss-free; 2026-10-27 21:0xZ, found by the operator) — the handoff of 2026-10-27 (docs/governance/handoffs/2026-10-27-foundations-handover.md) left out what the outgoing thread held outside the repository: the Foundation fixes tracker's address and the operator's rules for it, the two reminders bound to the outgoing session, the security review of 2026-10-26's unregistered findings, the standing directives in the project memory newer than v1.15, and the kit decision put to the operator on 2026-10-26 and never answered. The operator: "this is exactly what should have been avoided". The outgoing thread wrote the supplement (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md). Corrective: before any handoff is written, a checklist runs and its results appear in the handoff — (1) the scheduled tasks listed; (2) the Project docs and memory files changed since the last handoff listed; (3) the tracker read whole and compared with the roadmap; (4) every decision put to the operator and not answered listed; (5) the latest security review read and its findings confirmed registered. In force from 2026-10-27; installed in G53 at v1.16.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
NEW-END
EDIT docs/tracking/action-tracker.md #1
OLD-BEGIN

- ACT-018 — status 2026-10-13: CLOSED with bundle 11 (blocks S62 and S63; forty-three executor turns). Open from it: D135 (the look; the operator's choice, with the shell brief), the admin groups' summary pages (last in the admin work), INC-579.
OLD-END
NEW-BEGIN

- ACT-021 (2026-10-27) — a phone measurement of the published site after the next Publish (the handover supplement §4e): the speed lab (scripts/perf/lab.ts — the slow-4G phone of turn 23's baseline) on home, category, the ad page, seller and sign-in — first-paint bytes, LCP, CLS, TBT and the time to the first working tap — to show what turns 24–34f bought; the speed study's baseline (D234) before turns 35–37. The supervisor's read-only work. Status: OPEN.

- ACT-018 — status 2026-10-13: CLOSED with bundle 11 (blocks S62 and S63; forty-three executor turns). Open from it: D135 (the look; the operator's choice, with the shell brief), the admin groups' summary pages (last in the admin work), INC-579.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [x] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6). Final HEAD 83badbba; CI run 40400996498: queued when turn K2's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930 waits on Tesfaye's choice (a question in the tracker): an offline sign-out from a page whose marketplace code never downloaded either stays on that page, signed out, until the connection returns, or the marketplace's code is fetched for a signed-in visitor ahead of time (its size measured before the choice). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files.
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
OLD-END
NEW-BEGIN
  - [x] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6). Final HEAD 83badbba; CI run 40400996498: queued when turn K2's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930: the operator chose (b) on 2026-10-27 (DEC-279) — for a signed-in visitor the Home page's code is fetched ahead of time (at most 13.5 KB compressed, once, measured 2026-10-26), so an offline sign-out lands on a working page. And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files.
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f)
  - [ ] INC-837 — the caller-gates allowlist's `until INC-837` lines retired with the Foundations doors part (the expiry G55 requires).
OLD-END
NEW-BEGIN
  - [ ] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f)
  - [ ] INC-949 — `public_listing_json` names only the places the location tree shows: redeclared whole from its live definition (a Tier A migration turn, G39) with the tree's rule written once as one SQL predicate both doors use, proofs on scratch rows; `places.list` also carries each place's ancestor path for the Maps address (turn 34f-2's review, MAJOR 3)
  - [ ] INC-950 — HB-1 (scripts/conformance/holds-its-box.test.ts :134) hands `readAllowlist` its finding keys, not every consumer, red first on a planted stale line; with it the census of the other seventeen `readAllowlist` callers (G55)
  - [ ] INC-951 — a staff-only door rate-gated, or its row written by the server after the route's verification with its browser grant revoked (a Tier A migration turn; detail held back until the fix is live, G51)
  - [ ] INC-952 — DEC-280: the AI task registry marks the tasks that judge a person; for those the gateway answers `unavailable` when the `ai_calls` row cannot be written, the caller shows its "try again later" refusal, and a test proves nothing was acted on (G38); the other tasks stay best-effort
  - [ ] INC-953 — the two load-error retries (src/features/legal/certify-block.tsx :77–:84, src/features/legal/legal-accept-screen.tsx :102–:111) onto QueryState's one error-and-retry shape, with the Foundations loading-state work
  - [ ] INC-954 — one country-code shape in the locale and format constants module; the four app copies (legal-kinds.ts :101, legal-service.ts :107, calling-codes.ts :131, pricing-data.ts :277) and the database doors' own copies onto it, with its census — in the Foundations locale and format work
  - [ ] INC-443, the rest — the public-surface allowlist (scripts/public-surface-allowlist.txt) gains the eleven older browser grants it lacks (listing_reveal_count, cat_primary_pointer, cat_primary_parent, get_category_tree_version, admin_list_categories, price_shape_for_basis, impersonated_list_listings, attr_answer_tokens, attr_answer_other_text, attr_contact_like, listing_contact_refusals), each with its reason; the admin_reveal_listing_contact line loses "with a fresh second factor" (D129); transition_listing listed once
  - [ ] The CI and kit turn (Lovable — .github/workflows/\*\* and .claude/\*\* are closed to the Claude Code executor) — DEC-277: the nightly at 11:30 New York (two crons, 15:30 and 16:30 UTC, the job going on only when the New York hour is 11); DEC-278: the full checks once per code tree (protocol step 5 through land.ts's cache), the reviewer unchanged; the records owed by turn 34f (above); INC-941; INC-936's rulings once the red nights are read
  - [ ] ACT-021 — a phone measurement of the published site after the next Publish (the speed lab's slow-4G phone; home, category, ad, seller, sign-in): what turns 24–34f bought, the speed study's baseline
  - [ ] INC-837 — the caller-gates allowlist's `until INC-837` lines retired with the Foundations doors part (the expiry G55 requires).
NEW-END
EDIT roadmap.md #3
OLD-BEGIN
  - [x] Records turn R5 (docs/governance/briefs/foundations-records-r5.md; no migration; Lovable; G41, G53) — the fix first: INC-943 (DEC-276) — the browser's system libraries (`bunx playwright install-deps chromium`) once with 1500 s and its download (`bunx playwright install chromium`) 900 s a try with one retry, in all five installs; the certificate tools' package install once; CF-CID-1's fifth rule (a package install runs once) and CF-CID-2's planted breach; then the handover: instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md, delivered for installation) with its amendment record and moved text; S455 and S456; docs/governance/handoffs/2026-10-27-foundations-handover.md and the running record 2026-10-23 → 2026-10-27; INC-941 → INC-944 and the later word on INC-940 and INC-935 ("Numbering: next free INC-945."); system-state.md's position; block S78; the owed roadmap lines below INC-939's. Final HEAD 0586d7f2; CI run 40532962246: SUCCESS (main promoted; DEC-276's judge: run 1 of 20, no install step failed by its deadline).
  - [ ] Turn 34f (docs/governance/briefs/foundations-turn-34f.md; no migration; the Claude Code executor; G0) — INC-940 (AP-36's four retried passes): a part of the page that arrives after the first paint holds its box — MapFrame (src/features/posting/map/map-frame.tsx) over still-map.ts, the still map's places on the ad page and in the wizard, the provider's credit on the box at its foot; the census scripts/conformance/holds-its-box.test.ts (HB-1…HB-3, register row 60); a test reads a layout whole — layoutBoxes (e2e/helpers/ui.ts), the ad page's ten layout tests moved onto it, the census scripts/conformance/layout-reads.test.ts (BX-1, BX-2, register row 61); MFR-1, MFR-2, LDM-1, ALS-1 (e2e/ad-page-layout.spec.ts). Its judge: the operator's Flake check (specs e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8) with no failure, and no AP-36 flake line in the next 20 CI runs.
  - [ ] Turn 34f-2 (docs/governance/briefs/foundations-turn-34f-2.md; no migration; the Claude Code executor; G0) — turn 34f's stop 1 (docs/governance/reports/foundations-turn-34f.stop-1.md; ALS-1 red on mobile-360, the place line drawn from the country tree after the paint — INC-947): the ad page's view carries the places' names from the server's document (`placeList`; AV-9, LDM-2), so both of its place lines are in the first paint; INC-948 (PW-30) registered; then turn 34f's end-to-end check, review, report and landing.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [x] Records turn R5 (docs/governance/briefs/foundations-records-r5.md; no migration; Lovable; G41, G53) — the fix first: INC-943 (DEC-276) — the browser's system libraries (`bunx playwright install-deps chromium`) once with 1500 s and its download (`bunx playwright install chromium`) 900 s a try with one retry, in all five installs; the certificate tools' package install once; CF-CID-1's fifth rule (a package install runs once) and CF-CID-2's planted breach; then the handover: instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md, delivered for installation) with its amendment record and moved text; S455 and S456; docs/governance/handoffs/2026-10-27-foundations-handover.md and the running record 2026-10-23 → 2026-10-27; INC-941 → INC-944 and the later word on INC-940 and INC-935 ("Numbering: next free INC-945."); system-state.md's position; block S78; the owed roadmap lines below INC-939's. Final HEAD 0586d7f2; CI run 40532962246: SUCCESS (main promoted; DEC-276's judge: run 1 of 20, no install step failed by its deadline).
  - [x] Turn 34f (docs/governance/briefs/foundations-turn-34f.md; no migration; the Claude Code executor; G0) — INC-940 (AP-36's four retried passes): a part of the page that arrives after the first paint holds its box — MapFrame (src/features/posting/map/map-frame.tsx) over still-map.ts, the still map's places on the ad page and in the wizard, the provider's credit on the box at its foot; the census scripts/conformance/holds-its-box.test.ts (HB-1…HB-3, register row 60); a test reads a layout whole — layoutBoxes (e2e/helpers/ui.ts), the ad page's ten layout tests moved onto it, the census scripts/conformance/layout-reads.test.ts (BX-1, BX-2, register row 61); MFR-1, MFR-2, LDM-1, ALS-1 (e2e/ad-page-layout.spec.ts). Its judge: the operator's Flake check (specs e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8) with no failure, and no AP-36 flake line in the next 20 CI runs.
  - [x] Turn 34f-2 (docs/governance/briefs/foundations-turn-34f-2.md; no migration; the Claude Code executor; G0) — turn 34f's stop 1 (docs/governance/reports/foundations-turn-34f.stop-1.md; ALS-1 red on mobile-360, the place line drawn from the country tree after the paint — INC-947): the ad page's view carries the places' names from the server's document (`placeList`; AV-9, LDM-2), so both of its place lines are in the first paint; INC-948 (PW-30) registered; then turn 34f's end-to-end check, review, report and landing. Landed `e2287d6d` (34f's stop 1 `0026bd30`); run 40574354034 SUCCESS, main promoted; its review's rulings in block S79 (INC-949, INC-950).
  - [x] Records turn R6 (docs/governance/briefs/foundations-records-r6.md; no migration; the Claude Code executor; G41, G53) — the handover supplement of 2026-10-27 (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md, the repository copy, G51), INC-949–INC-954 and INC-930's answer, block S79 (DEC-277–DEC-280, the review rulings of turn 34f-2, the rules in force not yet installed), S457, ACT-021, the four speed documents (docs/governance/plans/) and the owed roadmap lines.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34f-2 (2026-10-27; INC-947) — turn 34f's own proof (ALS-1) found a second late part on the ad page: the place line, named from the country tree after the paint. The ad page's view now carries the places' names from the server's document (`places.list` → `placeList`), so the title box's place link and the Location box's line are in the first paint; the draft-built views keep the tree (INC-947). INC-948 (PW-30 red when its file runs whole against ethio-staging) registered. New tests: AV-9, LDM-2.
OLD-END
NEW-BEGIN
- Foundations turn 34f-2 (2026-10-27; INC-947) — turn 34f's own proof (ALS-1) found a second late part on the ad page: the place line, named from the country tree after the paint. The ad page's view now carries the places' names from the server's document (`places.list` → `placeList`), so the title box's place link and the Location box's line are in the first paint; the draft-built views keep the tree (INC-947). INC-948 (PW-30 red when its file runs whole against ethio-staging) registered. New tests: AV-9, LDM-2.

- Foundations records turn R6 (2026-10-27; G41, G53) — records only. The handover supplement of 2026-10-27 imported (its repository copy leaves out the tracker's address and ids, an e-mail address and the detail of two unfixed findings — G51); INC-949–INC-954 and INC-930's answer in the incident ledger; block S79 (DEC-277: the nightly at 11:30 New York; DEC-278: the reviewer keeps the executor's model, the checks once per code tree; DEC-279: INC-930 (b); DEC-280: an AI verdict about a person refused without its audit row; turn 34f-2's review rulings; the rules in force not yet installed); S457 and its pre-handoff checklist; ACT-021; the speed plan, the edge-caching and card-photo studies and the category-pictures spec in docs/governance/plans/; the owed roadmap lines.
NEW-END
B2. `grep -n -E '^## INC-949 |^## INC-954 |^Numbering: next free INC-95' docs/tracking/incidental-findings.md | cut -c1-50` — three lines, in that order; `tail -1 docs/spec/spec-ledger.md` — "NUMBERING after this block: next free DEC-281, D239, INC-955, S458, ACT-022."; `grep -c '^- S457 (' docs/governance/instructions-amendments.md` — 1; `sed -n 3p roadmap.md | cut -c1-80` — names foundations-records-r6.md; paste all four. Commit Part B.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-records-r6.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e scripts supabase .claude .github` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals); `bun run i18n:usage` (no change to either map); `bun run build`; `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
56fb3004adb2bf93b968152902aeca265780a1b22bccb769c00f75405be9ee52  docs/_changelog.md
ae78b201d090642df5d1c69e59ccb15af62b037690496b07e4284cf1ac76f96a  docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md
ecd15e49238904cf4e4cc163934f9b7cd1a63fb0e03e9ea47a93fa5228b7fb6f  docs/governance/instructions-amendments.md
23e2bdae4c8007ed02da8226082d2a46dee2a2811143c6edb398fb6745fdf1ad  docs/governance/plans/card-photos-stable-links-study-v1.md
324982342f78632d62ba275ee9c1d7fa9e61b6273d87aec7e9f583e70f42b5b0  docs/governance/plans/category-pictures-convert-spec-v1.md
204f69aa088a6a747ba4e7d36498fe2843f55b256809e36bbaa318e11b9d88c1  docs/governance/plans/edge-caching-study-v1.md
dc564be0dd46c1392ae80e1f905df94998e1619b9169a4d921f511d81bfc6567  docs/governance/plans/speed-plan-2026-10-25.md
9cee690c1c2847cc54e5a36f3097d570d1da0b12290280ca617a7082feb78411  docs/spec/spec-ledger.md
b61ced52173160d707ba62e4a42559ae159bb873180b92f6a3e8be394554db9f  docs/tracking/action-tracker.md
b85e72e44cb305df1d123fcb8fc71252eb9d9ff1c5a40ddac1b0ee37fb0687e3  docs/tracking/incidental-findings.md

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its answer and say so in the report); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR in the imported text is never fixed here (the record is the supervisor's) — it is listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-records-r6.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract (3); the census — "the supervisor's" (4); B1's output and B2's lines and the unit totals (5); the K2 lines (6); "none" for guards (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12); the reviewer's last line. Commit it (`records turn R6: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the supplement's repository copy keeps the Project documents' names (they are names, not links; no address remains) and leaves out the tracker's address and ids, the e-mail address and the detail of N1 and of the anonymous doors' gate (G51), with a note at its head saying so; the four speed documents land under their Project names, unchanged; INC-951's entry is written by class only until its fix is live (the INC-443…INC-448 precedent); turns 34f and 34f-2 are ticked (landed, CI green) while INC-940's judge runs (the incident stays open until it decides); DEC-278 does not scope the rule files by path (block S79 gives the reason).
```
