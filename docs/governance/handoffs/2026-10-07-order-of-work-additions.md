# The order of work — what was added between 2026-10-06 and the close of bundle 7 (2026-10-07)

What this file is. `docs/governance/handoffs/2026-10-06-order-of-work-and-cross-check.md` is the plan of record: the staged plan as the operator answered it, the cross-check that nothing identified earlier was dropped, and (its PART 3) what was added on 2026-10-06. This file continues PART 3: every item identified between 2026-10-06 11:50Z and 2026-10-07 10:45Z, each with the place it has in the order. The order of the stages did not change; one bundle is placed before stage 1. The plan document itself ("ethio.com — what to build next, and why", a Claude Docs document of the operator's account) carries the two operator decisions since the evening of 2026-10-06 and is brought level with this close by the supervisor. Sizes are ESTIMATES in executor turns. Decisions are in `docs/spec/spec-ledger.md` (block S56); incidents in `docs/tracking/incidental-findings.md`; the executor's task list is the root `roadmap.md`.

## PART 4 — Added by the operator's decisions of 2026-10-07

| Item | Where it sits | Size (ESTIMATE) | Ref. |
| --- | --- | --- | --- |
| An ad's free text (title, description, write-in answers) is translated into every site language at posting and on an edit; readers see their own language, the original one tap away; translation has its own admin switch; screening covers every language and has no off switch | Stage 2, a new subsection "Translation of every ad" | 3–5 turns; stage 2 moves from 16–25 to 19–30 | DEC-149 (changes REQ-004's default; serves REQ-025's index) |
| Chat messages are screened; translated only on a tap | Stage 6 | inside stage 6 | DEC-149 (3), DEC-145 |
| A seller corrects a translation of their own ad | "Not now" — later, not in the first build | — | DEC-149 (2) |
| A language section in the moderation design: the judge reads the original; the translation fields; the second layer for a language not yet proven; the switch | The stage 2 spec | — | DEC-149; `docs/governance/moderation-design.md` |
| Whether a title the form built from answers is stored as text (then it is rebuilt per language from the catalogue); the index size for REQ-025 | The stage 2 spec, read in the code first | — | DEC-149 |
| The Privacy text names the AI provider for translation as for screening | Stage 1 | — | DEC-149 |
| Reviews and ratings of sellers: 1–5 stars and a short text from a signed-in user who contacted the seller; screened and translated; one public reply by the seller; a scam review starts a check; reviewer-abuse patterns; no average under five reviews; the label "From signed-in users who contacted this seller. Purchases are not verified."; a `review` dial | Stage 8, the first stage after opening, with the seller page | 6–10 turns, 2 migrations; stage 8 moves from 8–12 to 14–22 | DEC-150 (supersedes answer 16 of 2026-10-06 for the time after opening; builds on DEC-011) |
| The tap on Show contact is the contact a review needs; contacts are counted from opening day | Stage 3 (the ad page) keeps the trace; nothing new to build there | — | DEC-150 (1) |
| Sellers rating buyers; an open reply thread; a review with no contact at all | "Not now" (the first) or declined by DEC-150 (the other two) | — | DEC-150 |
| On an ad page the `{country}` token draws the AD'S country, never the reader's market | A requirement of stage 3's spec | — | the operator's question of 2026-10-06 on new markets |
| Opening a market includes approving that country's name in Translations in every language the site carries | The launch round's market-opening checklist (`docs/governance/launch-gate.md`, added 2026-10-07) | — | the same question |
| Button and action labels are short everywhere — two or three words; an explanation is written once as help text | The next bundle, one part (a census, the English and Amharic list read by the operator, the route from a changed seed text to the approved Amharic rows read first); every new string from now on | 1 turn | D81 |

With these, stages 1 to 7 move from 56–90 to 59–95 executor turns (5+19+7+6+2+15+5 = 59; 8+30+11+10+4+24+8 = 95) — ESTIMATE.

## PART 5 — Identified while building bundle 7

| Item | Where it sits | Ref. |
| --- | --- | --- |
| The place step restores saved places from the draft, in any market; an ad's places carry a position | DONE — bundle 7 (M10, turn 5) | INC-473, INC-474 |
| Only the doors write the places table and eight admin tables; no TRUNCATE for the browser roles | DONE — bundle 7 (M10, M11) | INC-476, INC-478 |
| The shell-quote advisory | DONE — bundle 7 turn 3 | INC-475 |
| After a question or an answer is removed, a later save of the same visit is never refused | DONE — bundle 7 (M10; turn 8; K4, K5 in turn 9) | INC-479, D79 |
| The category import's undo walks in a fixed structural order | DONE — bundle 7 turn 7b (M12) | INC-481, DEC-152 |
| The hardening from the first full read of the code scanners: the read-only workflow token, own-key lookups, the map credit as text, the pre-paint scripts, the reporter's table cells, the scan's rule set | DONE — bundle 7 turn 10 | DEC-153, DEC-154, INC-483–486 |
| The migration check: a create-and-drop scratch table in a proof, a real-row allowlist, a draft checked in a scratch folder | DONE — bundle 7 turn 7 | DEC-151 |
| Two privileges-hygiene items (bodies in the Project record) | The next bundle, its first migration | INC-480, INC-482 |
| The platform linter's "Extension in Public" line | The next bundle, read in the same census | turn 8's report |
| Which door, if any, enforces an option's `allowed` list on a sibling answer — a census, then a ruling | The next bundle, its first census | INC-477 (hypothesis) |
| The sign-up and reset forms say that a refused password appeared in a known leak; a test; a frozen rule for whether ethio-staging gets the switch | The next bundle | the leaked-password read of 2026-10-07 |
| The nightly of 2026-10-07 red on PW-147 and PW-153 | Decided by the nightly of 2026-10-08: the next bundle if it repeats, else the tidy-up round's flaky-test turn | INC-487 |
| The console's definition editor shows no count when its save removes an answer ads hold | The tidy-up round | block S56 |
| A pointer move that changes what a category inherits is not judged by the parent-first guard | The tidy-up round | M11's stop report |
| The import preview does not show the parent-first refusal; the commit refuses whole | The tidy-up round | DEC-144 rule 2 |
| One unit case of the reset function: a prefill from an unmoved parent's fact | The tidy-up round | turn 1's verification |
| CI run time — more shards, or the three heaviest spec files split; rule frozen first | The tidy-up round | the operator's note of 2026-10-07 |
| 188 lockfile entries carry the sandbox's private cache address | The tidy-up round | INC-420 |
| The home feed's uncapped read | Stage 3, with paging | INC-459's census |
| Recents and favourites in the picker for buyers | Stage 5 (the seller half is built — D78) | D56 |
| The next versions of the supervisor's instructions and of the executor's Knowledge (the class rules of blocks S55 and S56; the one-line staging apply; D81) | Beside the executor's turns | G46 |
