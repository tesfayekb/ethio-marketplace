# Handover — bundle 17 closed (2026-10-16)

Written by the supervisor at the close of bundle 17 and imported word for word by the records turn (turn 6). The successor reads, in this order, before anything else (instructions §2 addendum): this file → docs/governance/system-state.md → the tail of docs/spec/spec-ledger.md (block S69) → the root /roadmap.md → the ci-evidence branch → the tail of docs/tracking/incidental-findings.md. Chat memory and the previous thread's notes are advisory; the repository is the record (G53).

## Heads and CI

- dev = `ae3ce4e0` ("Executed Turn 5 bundle", 2026-10-16 15:48Z) — CI run 963 (38926883911) FAILURE at 16:39:51Z on two causes only, both fixed in this records turn (INC-671 the closed Next's contrast; INC-672 PW-162 part (d)); 2021 passed, 4 passed on retry. main = `ea937367` ("Updated Bundle 17, Turn 4") — run 962 (38921265406) SUCCESS at 15:54:49Z, promoted. This records turn's own commit (turn 6) follows and, green, closes the bundle and promotes.
- Branch ci-evidence holds the evidence files; the copies on dev are frozen (DEC-098). Runs queue and never cancel (DEC-181; no run cancelled in bundle 17 — 959 queued behind 958, 962 behind 961, 963 ran whole).
- The platform's side branches: eleven lovable-sync-* / lovable-backup-dev-* branches, the known set since 2026-10-01; none new.
- Published 2026-10-16 ~16:04Z (turn 5, before run 963's verdict — DEC-181's deviation, recorded) with Sync keys ("5 keys added across 3 languages, 6 Amharic values seeded"). The published site is turn 5; turn 6's green asks for one more Publish and a one-line re-walk (the closed Next's new look).

## Bundle and turn state

- Bundle 17 CLOSED (spec-ledger block S69): turns 1, 2, 3, 3b (a ruling-prompt), 4 (brief version 2), 5 and this records turn 6; one migration (`20261016150556_19d4f9d4`, mark `20261017120000`, `set_listing_photos_soon` takes a closed ad) applied on ethio-prod by the executor's tool and on ethio-staging by the operator, proven by run 962's preflight. No migration is outstanding on either project.
- The executor (Lovable) is idle after turn 6. The curator (a separate session) has delivered the C37 text batch (162 definitions rows, Title Case and the rulings), audited clean; version 2 is awaited (four rulings: "Co-op" kept, "Short-Term Rentals" as a one-row categories file, Food Kind and Honey Form reworded, the shared Brand / Producer help conditioned); its import and the Translations approval of two Amharic labels are the operator's steps after it.
- Bundle 18 is not briefed: its spec list comes first (D198, D199, D200, INC-669, INC-670; INC-657).

## Operator steps owed

1. After turn 6's run is green: Publish (no new string; no Sync keys needed), then the one-line re-walk: on a new ad's Specifications with a required detail empty, Next is grey with dark text and the line under it, and a tap still marks the detail.
2. The curator's text batch version 2: its import (one definitions file; one one-row categories file) after the supervisor's audit, then Admin › Translations: approve the two pending Amharic labels («ሲሸጥ ያለበት ሁኔታ», «ቅርጽ»).
3. INC-657: the title or the place line of the ad seen live without a city.
4. INC-655: whether the second open of Post listing (Seller Centre) was fast.
5. The ID-card / passport photo question (asked 2026-10-15; unanswered): keep such a photo hidden for staff, as built, or refuse it at upload like nudity.
6. D200: his word on the state put to him — a text change goes to staff review until an AI text screen exists (D176/D177); none is built today.

## Each agent's state

- Supervisor: this thread; the running record at the Project doc claude/running-record-2026-10-05-thread2-part3.md (condensed for this close in docs/governance/handoffs/2026-10-16-bundle17-close-running-record.md); bundle 18's spec list in hand next; the curator's text batch v2 audit beside it.
- Executor: idle; its connected branch dev; its Knowledge v3.10; AGENTS.md as in the repository.
- Curator: the text batch v1 delivered and audited; v2 requested with four rulings; after v2's import the C37 plan's R-O and text passes are complete; wave 2 and the 18 held lists wait for the engine (E6: a multi-pick list as a source of menus or prefills; E9: the title with three picks); Pets & Animals stays closed.

## Open questions, with owners

- D199 (supervisor → operator): a discount / sale on the Edit — where the "was" price lives, how long it shows, the "Price reduced" ribbon's tie-in; peers researched before the spec (G49).
- D200 (operator): "in review" after a text change — decided (D176/D177) until the AI text screen exists; the screen's place in the plan (AI-driven screening of all posts is his standing wish).
- D190 (parked; operator at a second market's opening): the Subject list's "Languages (not English or Amharic)" label.
- INC-635 (watched): "Project not specified." logged once a run by server routes.
- INC-648 (watched, PLATFORM-ORIGIN): the platform's own edit of src/integrations/supabase/previewAuthStorage.ts.
- INC-497 (CT-18): open — eight ledger lines in the window; no `[ct18-dump]` line yet.
- D179 (operator's reminder): re-discuss the ahead-of-Jiji plan when the staged order is complete.

## Next planned action

1. Turn 6's run read; Publish; the one-line re-walk.
2. Bundle 18's spec list to the operator: D198 breadcrumbs (the panel crumb to the panel's home; page crumbs for /my-listings, the ad, the Edit, /post), D199 after the peer research and his rulings, D200's state, INC-669 (the counter reads the server's remaining before any call; a test spends one and reads 4), INC-670 (one Ribbon primitive with a render test), INC-657 when the ad is named — then the brief (ESTIMATE 2–3 executor turns).
3. The flaky-test turn after bundle 18: INC-643, 644, 645, 646, 652, 653, 654, 662, 664, 673, 674 (INC-655 measured first).

## Rulebook records

- Instructions: v1.13 live (docs/governance/instructions-amendments.md records it). Rules adopted since v1.13 and in force, not yet installed: DEC-181's queueing (the next prompt goes out as soon as the executor reports; Publish on the newest commit green with the executor idle), DEC-182's migration size rule, "the next brief is built during the current turn" (S229), every walk string read from en.ts at the published commit, a brief's expected fingerprint computed on the exact stored bytes (S240), a locator named in a brief checked for its hidden-element rule (S241), a record file edited by anchored replacement never by a replace-all (S242), a visual state on a control checked against the gating accessibility audit (S243), a change sized by the tests it reaches including route interceptors (S244), the curator's remaining batches combined at the operator's word (2026-10-16).
- Executor Knowledge: v3.10 live; docs/governance/lovable-knowledge.md is its mirror.
