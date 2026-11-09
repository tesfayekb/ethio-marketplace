# RULING — P-2 (c) c2a, stop 3: option A stands; the timing tolerance restated (DEC-353); six parts confirmed. Base: cursor/p2-fold 6e62092ad.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-3.md` (INC-1076) and commit it with the migration. It answers `docs/governance/reports/p2-fold-c2a.stop-3.md`. Rulings 1 and 2 stand except where this file says otherwise.

## 1. Option A — the ruled contract stands, as built

The card keeps `level: {key, placement, badge}` and the three doors keep the `levels` dictionary (DEC-351 §8, ruling 2 §1). Your measurement is accepted as the record: +0.07 ms on a 20-card page (probe 6: 0.437 → 0.513 ms), the index read itself costing nothing (−0.5 % to 0), the nested object about 2 µs a card, the dictionary about 0.02 ms a call.

Why not B, C or D: "the dictionary served elsewhere" is not cheaper for the reader — the server renders the first feed page inside the HTML from one door call, so a dictionary moved out of the door becomes a second database round trip per page render (milliseconds of network against 0.02 ms of execution) or a client fetch after the first paint; flat keys would save about 0.04 ms a page at the price of a contract the client (cardLookOf, adPageLookOf, the level store) is already written against, and a second shape for the same object. The shape is the mechanism's own cost, not a defect.

## 2. The tolerance was mine and it was wrong — DEC-353

Ruling 2 §2 wrote a bare relative line (10 %) on a function that runs in 0.44 ms. Such a line cannot tell the defect it was written for (a per-card call of `level_perks_for`: +14 ms, × 33) from the mechanism's own cost (+0.07 ms), and it stopped you correctly by its letter. Recorded as my slip (S555) and corrected by decision, not silently (§7 "silent tolerance widening"):

DEC-353 — the feed doors' timing tolerance. A change to `feed_page`, `seller_feed_page` or `my_saved_listings` is a STOP when (a) it calls any function that PostgreSQL does not inline once per card, whatever the measured time, or (b) the door's time per 20-card page grows by more than 1 ms (ESTIMATE band; the probe method of stop 2, medians, same session interleaved). Growth inside that line is reported with its cause named. Class rule: a timing tolerance on a sub-millisecond function is written as an absolute per-page number and a named defect, never as a bare percentage. The report's Records section carries DEC-353 under that number; the operator's paste of this ruling approves it (§3 — it is overridable: say so and I restate it).

## 3. Your six readings — confirmed, with two notes

1. **Six files.** Confirmed: part 1 the cache (columns, `feed_index_refresh`, the fill), part 2 the keepers (the two triggers and their functions, `feed_index_check`), then the four doors. Marks chosen at the commit by ruling 2 §3's rule, +100 a part, pairing lines in the stop report.
2. **The one-time fill.** Confirmed and necessary; ruling 2 did not name it — my omission, recorded (S556: a new derived column ruled without its backfill). As built: one set-based UPDATE with a WHERE, derived values only, the refresh's own read. After the staging apply I read back `feed_index_check(NULL)->>'listings_with_wrong_look'` myself (a read; no proof reads real rows).
3. **"`%I` form".** Your reading is right and is the record: it belongs to the computed insertion (part 6); `seller_feed_page` is a whole redeclaration.
4. **The real-row guard's eight refusals, fixed at the root with no allowlist line.** Accepted. The writer's LEFT JOIN inside its existing first SELECT keeps the listing's `FOR UPDATE OF l` lock — state that in the report's FINDINGS as the one behavioural change to the writer beside the two new columns.
5. **`listings_with_wrong_look` as a new key.** Accepted. One sibling question for the report's K2 list, no change now: does any screen or script render `feed_index_check_runs`' answer by a fixed list of keys (so the new key would be invisible there)? If yes, name it as a c3 line.
6. **Row-level triggers, born closed, SECURITY DEFINER with `search_path` public; an override's update queues the old and the new level.** Accepted.

## 4. Now

Regenerate the six files with the stamps and marks chosen at the commit, run `scripts/check-migrations.sh` (its "Self-marking guard OK" line in the stop report) and `bun run db:proof --fresh`, commit the six with this ruling, push, write the MIGRATION stop report with the six pairing lines and the six sha256s, and END THE TURN. Nothing of INC-1085 or the GO's steps 3–7 before "continue".
