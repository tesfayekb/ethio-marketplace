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
