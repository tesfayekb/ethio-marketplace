# Handover — bundle 18 closed, bundle 19 open (2026-10-17)

Written by the supervisor at the close of bundle 18 and imported word for word by bundle 19's turn 2 (the records turn, which follows turn 1 at the operator's word so that no record waits longer than one turn — G41's deviation of 2026-10-17 03:1xZ, logged in block S70). The successor reads, in this order, before anything else (instructions §2 addendum): this file → docs/governance/system-state.md → the tail of docs/spec/spec-ledger.md (block S70) → the root /roadmap.md → the brief it names → the ci-evidence branch (ci-status.md, e2e-last-failure.md, guards-last-failure.md, flake-ledger.md whole, and since turn 5 flake-check-status.md and flake-check-last-failure.md) → the tail of docs/tracking/incidental-findings.md. Chat memory and the previous thread's notes are advisory; the repository is the record (G53).

## Heads and CI

- dev = `732b933d` ("Shortened AGENTS.md text", 2026-10-17 03:26Z — bundle 19 turn 1); run 970 queued behind run 969 (de5197e7, bundle 18 turn 5, started 02:59Z; a docs-and-workflow commit). main = `d0001498` (bundle 18 turn 4) — run 968 (38961523082) SUCCESS at 2026-10-16T21:09:52Z, promoted. Runs now take 40–45 minutes (the shards; 966 took 45) — the check-in waits are set to that.
- Branch ci-evidence holds the evidence files; the copies on dev are frozen (DEC-098). Runs queue and never cancel (DEC-181); a run still QUEUED when the next push arrives is replaced by it (GitHub keeps one queued run per group — run 967 on `2ce74f24` was replaced by 968, which judged turns 3 and 4 together).
- The platform's side branches: eleven lovable-sync-* / lovable-backup-dev-* branches, the known set since 2026-10-01; none new.
- Published: asked for at 21:17Z on `d0001498` (turns 3 and 4; the smaller ribbons); the operator's confirmation is owed. Turn 5 (a workflow and docs) and bundle 19 turn 1 (a server route) need no Publish until the page lands.

## Bundle and turn state

- Bundle 18 CLOSED (spec-ledger block S70): turns 1–5; one migration (`20261016183525_b3716a85`, mark `20261018120000`, `peek_rate_limit`) applied on ethio-prod by the executor's tool and on ethio-staging by the operator (read back: one row). No migration is outstanding on either project.
- Bundle 19 OPEN — the product detail page (D201; the spec docs/governance/product-detail-page-spec.md v1; the study docs/governance/plans/product-detail-page-study-2026-10-16.md; the drawings on the supervisor's canvas, v12): turn 1 landed (the QR encoder and route — DEC-187); this records turn is turn 2; turn 3 is M1. The turn plan (ESTIMATE 10–12 turns) is in the roadmap's bundle-19 block and in block S70's D201.
- The executor (Lovable) is idle after turn 1 until this turn's brief. The curator holds charter C38 (research + plan only; the title parts by card rank, the required flags, `fact_rank` 1–4 beside the page's fallback; `display_order` read-only); its plan arrives through the operator and is audited against the form as built before any ruling (G47); rows only after the rulings and after turn 6 gives the importer the column.

## Operator steps owed

1. Confirm the Publish of `d0001498` (or do it: Lovable → Publish) and answer the one walk line: at 360 on the published site, the ribbon word that was cut on 2026-10-16 ("Price reduced" / "Not available", the same card) now shows whole, every ribbon the same size.
2. Flake check group 1 again, after the hour window of the last run: Actions → Flake check → Run workflow (branch dev) — specs `e2e/post-wizard-place.spec.ts e2e/post-wizard-bundle2.spec.ts`, grep `PW-12 |PW-117 |PW-178 ` (each id with a trailing space), repeat 12, workers 8; green → group 2: specs `e2e/post-wizard-resets.spec.ts`, grep `PW-61 `, repeat 12, workers 8. The verdicts are read by the supervisor from branch ci-evidence (flake-check-status.md); no log paste. If a 429 appears at the 10000-per-hour setting, the harness fix follows (DEC-185's rule) — no further dashboard change.
3. ethio-staging's settings as they stand (DEC-185): Authentication → Rate Limits — `Rate limit for token refreshes` 10000 per hour (he reported setting it 2026-10-17 02:4xZ; confirm the field accepted it), `Rate limit for sign ups and sign ins` 300 per 5 minutes. ethio-prod untouched.
4. The curator's C38 plan when it arrives (bring it whole; no rows yet).
5. INC-657: the title or the place line of the ad seen live without a city. INC-655: whether the second open of Post listing was fast.
6. D199's rulings after the peer research the supervisor brings; D200's state (his word).
7. The ID-card / passport photo question (asked 2026-10-15; unanswered).

## Each agent's state

- Supervisor: this thread; the running record at the Project doc claude/running-record-2026-10-05-thread2-part3.md (condensed for this close in docs/governance/handoffs/2026-10-17-bundle18-close-running-record.md); next: turn 3's M1 brief (the migration proofs on scratch rows, G27/G39; `public_listing` proven to return no contact value, no seller user id, no exact approximate coordinates), the D199 peer research beside it, the C38 audit when the plan arrives.
- Executor: idle after bundle 19 turn 1; its connected branch dev; its Knowledge v3.10; AGENTS.md as in the repository (INC-677's rule: no new AGENTS.md line unless a brief asks).
- Curator: charter C38 in hand (2026-10-16 19:0xZ); the C37 plan complete; the 18 held lists and wave 2 wait for the engine; Pets & Animals stays closed.

## Open questions, with owners

- D199 (supervisor → operator): a discount / sale — where the "was" price lives, how long it shows, the "Price reduced" ribbon's tie-in; the detail page draws what D199 defines (spec §18).
- D200 (operator): "in review" after a text change until an AI text screen exists (D176/D177).
- The D201 spec's four questions, answered by the supervisor's recommendations unless the operator says otherwise: the AH-12 report reasons as listed; "Seen N times" shown to buyers from 10; the distinct-sellers flag as a small staff-read table; Saved under the account panel.
- INC-677 (standing): AGENTS.md at its cap — the rule above; Knowledge's next version carries it.
- The stages' status (S250): nothing in the roadmap's stage lines is marked complete; reviewed with the operator after the bundles' phased work.
- D179 (operator's reminder): re-discuss the ahead-of-Jiji plan when the staged order is complete.
- INC-497 (CT-18): open — eight ledger lines in the window; no `[ct18-dump]` line read this bundle. INC-635, INC-648: watched.

## Next planned action

1. This records turn's run read; then turn 3's brief: M1 — `listings.public_id` (a database default over the 31-symbol alphabet, backfilled, unique), `public_listing(p_public_id)` (STABLE SECURITY DEFINER; the public RLS restated; photos with one-hour links; places; the answered facts with labels; the seller's public line; the counts; no contact value), `listing_counters` with `count_listing_view`, `count_listing_share`, `listing_counts`, the `listing_read` dial; applied on prod on save, the stop report, the operator's staging apply by the specific mark, "continue".
2. Turns 4–12 per the roadmap's bundle-19 block; the records turn and one walk at the close.
3. The curator's C38 plan: audit, rulings; its rows after turn 6 (the importer's `fact_rank`).

## Rulebook records

- Instructions: v1.13 live (docs/governance/instructions-amendments.md records it). Rules adopted since v1.13 and in force, not yet installed: DEC-181's queueing; DEC-182's migration size rule; "the next brief is built during the current turn" (S229); every walk string read from en.ts at the published commit; a brief's expected fingerprint computed on the exact stored bytes (S240); the paste approves G17 calls listed under a heading (§3); INC-677's AGENTS.md rule; DEC-184's proof rule; "never send a fix alone — fold it into the next turn"; the operator's "no idle waiting for CI — the next prompt as soon as the executor reports" (2026-10-17).
- Executor Knowledge: v3.10 live; docs/governance/lovable-knowledge.md is its mirror.
