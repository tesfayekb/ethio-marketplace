# Running record, condensed — bundle 19 (2026-10-17 03:26Z → 23:3xZ)

The supervisor's notes of the day, condensed; the full notes are the Project document claude/running-record-2026-10-05-thread2-part3.md (entries from 2026-10-17 03:3xZ). Block S71 in docs/spec/spec-ledger.md and docs/tracking/incidental-findings.md (INC-678…INC-712) are the record; this file keeps the sequence and the operator's words.

## The operator's directives of the day

- 03:3xZ (23:14 local, 2026-10-16): "please work on the next prompt so by the time ci lands we have the prompt ready to go … I dont want to wait ideal for ci to be green … lets continue to work" — bundle 19 started before bundle 18's records (they landed as turn 2); the next prompt goes out as soon as the executor reports.
- A fix never goes alone — it rides the next turn (standing).
- 14:3xZ — DEC-191 ("yes"): a seller or business name one letter off a protected organisation's name is refused; a curator pass for sound-alikes and abbreviations (research and plan only); the names chosen before the rules counted (the query tool could not run the rule — the nightly sweep of 2026-10-18 02:23 UTC is the count).
- 14:4xZ — the seller's page is the seller name at the root, ethio.com/<name> — "WE AGREED AND SPENT SO MUCH TIME … THAT DECISION PASSED THROUGH A LOT OF DISCUSSIONS AND BUILD" (S271: turn 16 had put it at /seller/<key>; turn 17 moved it).
- 14:5xZ — "Report this seller" with reasons, including "uses my organisation's name" (the reclaim request), for a future build — the roadmap line.
- 14:5xZ–15:0xZ — on the preview of turn 17: the signed-out contact before "All ads by this seller" and one "Contact seller" link that signs in and comes back with the contact shown; the in-page bar; the large-screen design beside the photos ("Do you attach the design to lovable so it can see?" — no: D201 §5's widths were in no brief, S274); similar ads with the home page's count per row; the map that enlarges and closes; no map box without a pin; "we still need to work on this product detail page"; "give me updated of the above turn so i can send once" (turn 18 v2 replaced the unsent v1).
- 21:2xZ — the sold-ad Details at half the width on a large screen (INC-708, turn 19).
- 23:1xZ — "New push doesn't cancel but only queued" (S279: runs are never cancelled since DEC-181; the supervisor had held turn 19 for a run that a push could not have cancelled).
- 23:2xZ (19:26 local) — the phone review of turn 19's preview: the contact bar above the bottom menu removed (Contact seller in the seller box only); the Google Maps link must open the app at the pin; "Will review in desktop later" — turn 21.

## The sequence (times approximate)

- Turns 1–6 (03:26Z–07:0xZ): the QR route; bundle 18's records; the address helper; M1 (`public_id`, `public_listing`, the counters); the buyer's page; M1b and the card link.
- Turns 7–10 (07:1xZ–10:0xZ): three actors on one component; the safety box and the SOLD badge; M2 `fact_rank` in nine migration files (DEC-189's chunks, DEC-190's fingerprint proofs); the Key fact tick.
- Turns 11–13b (10:1xZ–13:1xZ): M5 the reveal rules and the contact block; M3 Save and Account › Saved; M4 Report; M6 the home country on the three personal tables.
- Turns 14–17 (13:1xZ–14:4xZ): M7 the saved list's cursor; Share and the counts; similar ads; M8 `seller_feed_page` and the seller's page, moved to ethio.com/<name> in turn 17.
- Turn 18 v2 (17:2xZ): the page as drawn (container widths, the bars, Contact seller, the Location card, Enlarge map, the feed's rows for similar ads) and M9 (DEC-191). Turn 19 v2 (22:45Z): run 995's reds (the right column's sticky top, AP-36's settle, AL-31's admin access), the reveal by the visitor's own tap (S276), the first paint that waits for the session (INC-707), Posted, Read more, Google Maps, the h1, the half-empty row (INC-708).

## Notes for the successor

- The executor's query tool runs as `supabase_read_only_user`: it cannot execute closed functions (`alias_rule` answered 42501); its read-backs see what that role sees.
- The four drawings in docs/design/d201/ are the platform's WebP copies at reduced size; the full-size drawings are the supervisor's Design canvas "Product detail page — D201 drawings".
- The supervisor's brief checker (check-brief.py) runs on every brief before it is sent; its rules grow with each class the day found (the owed-test census of rows and headers, `table-order`, `personal-table`).
- The helper drafts of this records turn (S71, INC-678…INC-711) were made from the full notes by read-only helpers and reviewed by the supervisor before import (G50).
