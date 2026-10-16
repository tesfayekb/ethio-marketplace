# Handover — bundle 16 closed (2026-10-16)

Written by the supervisor at the close of bundle 16 and imported word for word by the records turn. The successor reads, in this order, before anything else (instructions §2 addendum): this file → docs/governance/system-state.md → the tail of docs/spec/spec-ledger.md (block S68) → the root /roadmap.md → the ci-evidence branch → the tail of docs/tracking/incidental-findings.md. Chat memory and the previous thread's notes are advisory; the repository is the record (G53).

## Heads and CI

- dev = main = `9a8980ba` ("Fixed signout session cleanup", 2026-10-15 23:36Z) — CI run 955 (38824565343) SUCCESS at 2026-10-16T00:15:31Z, no retried test, promoted. This records turn's own commit follows it.
- Branch ci-evidence holds the evidence files; the copies on dev are frozen (DEC-098). Runs queue and never cancel (DEC-181, ci.yml `cancel-in-progress: false`; its ten-turn rule kept: no run cancelled while it ran through run 955).
- The platform's side branches: eleven lovable-sync-* / lovable-backup-dev-* branches, the known set since 2026-10-01; none new.
- Published 2026-10-16 ~00:3xZ with Sync keys ("3 keys added across 3 languages, 3 Amharic values seeded").

## Bundle and turn state

- Bundle 16 CLOSED (spec-ledger block S68): turns 1, 2, 2b, 3, 3b, 3c, R1, R2, R3, E1, S1, S2, 4a, 4b, E2a, E2b, E3, E3b, S3, the S3-fix and S3-fix2 rulings, the test-fix ruling on `eee5d6cd`; thirteen migrations, every one applied on ethio-prod by the executor's tool (or by the operator from the raw file under DEC-182) and on ethio-staging by the operator, each read back by its mark. No migration is outstanding on either project.
- The executor (Lovable) is idle after the records turn. The curator (a separate session) has delivered C37 batch 10 (Sports & Leisure: 5 definitions rows, 1 links row; audited clean; expected preview 0 added · 6 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused) and waits for its result message; batch 11 (Babies & Kids, with Maternity & Nursing's Size and Size System) is its next.
- Bundle 17 is not briefed: its spec (the Edit as the wizard, D194) is written and approved first.

## Operator steps owed

1. Admin › Catalogue › Import (ethio-prod): batch 10's two files together; the stop rule on any refusal or count that differs from the expected preview; then its two-line walk (Release Era's Unknown then Other; Size System's Other on Sports Equipment with Jerseys & Kits, then Size offering Other alone).
2. Line 6 of the eight-line walk (Edit inside Screening's preview: the preview shows the new title at once and "Saved. The seller is told what changed: …" appears) — no verdict given.
3. INC-657: the title or the place line of the ad seen live without a city.
4. INC-655: whether the second open of Post listing (Seller Centre) was fast.
5. The ID-card / passport photo question (asked 2026-10-15; unanswered): keep such a photo hidden for staff, as built, or refuse it at upload like nudity.

## Each agent's state

- Supervisor: this thread; the running record at the Project doc claude/running-record-2026-10-05-thread2-part3.md (condensed for this close in docs/governance/handoffs/2026-10-16-bundle16-close-running-record.md); the Edit-as-wizard spec in hand next.
- Executor: idle; its connected branch dev; its Knowledge v3.10; AGENTS.md as in the repository.
- Curator: batch 10 delivered; after the operator's import and walk, the batch-10 result message goes out with the post-import exports attached; batch 11 next; wave 2 and the 18 held lists wait for the engine (E6: a multi-pick list as a source of menus or prefills; E9: the title with three picks); the sentence-case text batch waits.

## Open questions, with owners

- D194's spec (supervisor → operator's approval): the Edit as the wizard at its Review step, each step saving on Next, the admin's Edit the same gateway.
- D190 (parked; operator at a second market's opening): the Subject list's "Languages (not English or Amharic)" label is reworded when that market's languages enter the list.
- INC-637 (supervisor; G42): the DEC on the platform's package change inside S2's work-in-progress commit, at bundle 17's open.
- INC-635 (watched): "Project not specified." logged once a run by server routes — a transport hypothesis; an INC with root-cause work on recurrence.
- INC-648 (watched, PLATFORM-ORIGIN): the platform's own edit of src/integrations/supabase/previewAuthStorage.ts.
- INC-497 (CT-18): open — the first `[ct18-dump]` line decides its fix.
- D179 (operator's reminder): re-discuss the ahead-of-Jiji plan when the staged order is complete.

## Next planned action

1. The Edit-as-wizard spec (D194, with D192 and D193 and INC-658…INC-661 inside it), forward-scanned against the ledger's later REQs, to the operator for approval.
2. Bundle 17's brief after the approval (ESTIMATE 3–4 executor turns; INC-637's DEC first).
3. The flaky-test turn after bundle 17 (INC-643, 644, 645, 646, 652, 653, 654, 662; INC-655 measured first).

## Rulebook records

- Instructions: v1.13 live (docs/governance/instructions-amendments.md records it). Rules adopted since v1.13 and in force, not yet installed: DEC-181's queueing (no 25-minute wait; the next prompt goes out as soon as the executor reports), DEC-182's migration size rule, "the next brief is built during the current turn" (S229), one walk line is never written from memory of a string — every string read from en.ts at the published commit (the "Write for me" catch).
- Executor Knowledge: v3.10 live; docs/governance/lovable-knowledge.md is its mirror.
