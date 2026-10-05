Source: supervisor thread, turn 1178, Fri 2026-10-02 13:28 New York.
Status at 2026-10-05: walked by the operator on 2026-10-02 (turn 1179: 'done'; walk answers summarised in turn 1180 — the corrected walk checks for typed-number validation, Quote on Request and the Graphics Card refusal went into the bundle 2 brief); the curator note was pasted on request (turn 1180 step 4 reminder; not confirmed).
Related: bundle 1, DEC-103, DEC-104, INC-387, batch 16, batch 18 held.

CI is green on Lovable's commit (5e09c8d3) and it has been promoted to main, so you can Publish now and then import batch 16.

**Verified**
- **The retry fix:** only a call with no answer at all is retried; a real error from the server is never retried. This is the first of the five clean runs I set as the bar for keeping it.
- **The option limit** is now 1,500, proven by a test that failed at 400.
- **Lovable's own full test run did not finish** before its turn ended. One AI image test failed on its machine only; the same test passes in CI. I'll fold that follow-up into the next prompt.

**One new finding:** the "Suggest icon" button in the admin category editor is very likely broken on the live site. Lovable found the AI service rejects the request because our icon list has grown to 136 names. Category image generation works. I'll have it fixed in the next bundle.

**Your steps**

1. In Lovable, click Publish and wait until it finishes.
2. On the published site, import `c27-b16-definitions.csv`: expect 0 added · 12 changed · 0 refused.
3. Do the walk below on the published site, at phone width.
4. Paste the short block at the bottom to the curator.

**Walk: answer yes, or say what you saw**

1. **Map zoom:** on the Place step, drop an exact pin, zoom the map out twice and save. Reopen the pin: does the map open at the zoom you left it?
2. **Phone numbers:** in Laptops, type `0911 23 45 67` in Graphics Card. Is it refused with a message? The rule is still too strict and will also refuse things like "Sizes 42 43 44 45"; that is fixed in the next bundle.
3. **Searching:** in the category search, type `toyota`. While it looks, does it say "Searching…" and never "no results"?
4. **Numbers:** in Cars, type `1800` for Year. Does it turn red at once, before you press Next?
5. **Other, single choice:** in Audio & Sound, set Brand to Other, leave its box empty and press Next. Does it stay on the page with the box red and the cursor in it?
6. **Other, multiple choice:** on the same form, tick Other under Connectivity and type `Infrared`. Go Next, then Back. Is the text still there?
7. **Written unit:** in Food & Beverages › Beverages, set Unit of Sale to Other and write `Tray`. Does the price step say "Price per Tray"?
8. **Quote:** in Services › Education & Tutoring, set Pricing Type to Quote on Request. Is the price step locked to contact, and does switching to Per Hour let you enter a price again?
9. **Price on the card:** publish that tutoring listing at a price per hour, then open its category page. Does the card show the price followed by "Per hour"?

**For the curator, after step 2 succeeds**

---
```
Supervisor note (2026-10-02)
- DEC-103 is live: the option ceiling is 1,500 per list. Name any list above 400 in the change note.
- Batch 16 is imported: 12 changed, 0 refused. The live catalogue now equals your batch-17 merged state.
- The allowed-list ceiling is still 50. Batch 18 stays held until I say 150.
```
---

Nothing goes to Lovable right now. I'll write its next prompt after your walk answers, so any walk finding goes into the same turn.
