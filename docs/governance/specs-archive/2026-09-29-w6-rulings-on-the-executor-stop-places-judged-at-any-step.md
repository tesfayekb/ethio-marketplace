Source: supervisor thread, turn 957, Tue 2026-09-29 16:04 New York.
Status at 2026-10-05: rulings sent 2026-09-29 16:51 (before the operator's message of turn 958); built in W6 (migration a3a572bf) and corrected by W6-R; the G29 class scan was reported by the executor (turn 960); R3 corrected (S72) — the last-post prefill moved to W6b-1; not in the repo.
Related: W6, W6-R, S72, G29, validate_listing_draft, v_lands (INC-341), W6b-1, PR-15, INC-323.

Lovable was right to stop. I checked its findings against the code and they hold, so I've made all three calls myself.

- **Places saved without the step-6 check:** confirmed, and the gap is slightly wider than Lovable said. `submit_listing` checks at the step being saved (`bff9822c:67`), so a draft already past step 6 that's saved again from an earlier step also skips the check. **Ruling:** the server checks the places every time they're sent, at any step. That lives in the one shared validation function (`validate_listing_draft`), not by quietly ignoring places, since silently dropping what the seller sent would look like success. The "choose a place" requirement still applies only from step 6.
- **Country count bug:** the step-6 query stores two different counts in the same variable (`v_lands`), so the country limit counts country-level places instead of countries. **Ruling:** fix it in this same change, and check every other server function for the same double-write mistake.
- **Last-post prefill:** Lovable is right that the place step never used it. My R3 was written from the 2026-09-15 ruling without checking the code (slip S72). **Ruling:** it isn't part of W6. It's item 4 of the W6b spec you approved today, and W6b also sets the full prefill order.
- **Your 10 test posts with region-level places:** no data is rewritten. The 6 drafts will ask for a city the next time they reach the place step. The 4 in screening stay as they are, since this is pre-launch data; delete them if you like.
- **"Listing not found" draft-id logging:** not needed. CI's last run was within target (4 lines, 2 of them deliberate). It comes back only if the count rises again.

**Your step:** paste this reply into Lovable and send it.

---
```
W6 — rulings on your stop (2026-09-29). Proceed with Parts A–C with these three changes.

(1) Places sent before step 6: JUDGE THEM, in the one door.
- Precision on your finding: submit_listing calls validate_listing_draft with p_step (bff9822c:67), not greatest(draft_step, p_step). So the gap covers any save below step 6, even on a draft already past it.
- In the re-declared validate_listing_draft, the step-6 place checks (every id an active place of an open market; city or sub-city level; plan counts) run whenever p_coverage is non-empty, at ANY p_step.
- The "coverage required" refusal stays at p_step >= 6 only.
- Do not ignore sent places: dropping input silently is phantom success.
- Add proof P27: a save at p_step 3 carrying a region-only coverage → cityRequired, and nothing is written.

(2) v_lands: fix it in the same re-declaration (count distinct countries into v_lands, country-level nodes into their own variable). P26 must pass on the fixed count.
G29 class scan: list every live public function whose SELECT … INTO names the same variable twice. Report each with file:line; fix any inside this function; report, don't fix, any outside it.

(3) Last-listing prefill: NOT in W6.
- R3 is corrected: "the existing prefill (saved-area cookie → location guess, step-where.tsx:226–256) stays".
- The last-post prefill and the full prefill order arrive in W6b (approved by the operator today).
- In W6, the prefilled city from the cookie or guess satisfies R1.

Also:
- The 10 live listings with region-level places: no data change. Report their ids and statuses in the completion report.
- W5 Part C: the draft-id logging is not needed now. CI run 36585975894 logged 4 lines, 2 of them PR-15's (target ≤ 5). It returns only if the count rises.
Everything else in W6 stands as written.
```
---
