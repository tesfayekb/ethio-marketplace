# RULING — P-2 (c) c2a, stop 2: the card look precomputed into the feed index (DEC-352); five parts; PW-141 (INC-1085). Base: cursor/p2-fold be5cb21ad.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-2.md` (never retyped — INC-1076) and commit it before any code. It answers the stop-2 report (`docs/governance/reports/p2-fold-c2a.stop-2.md`) point by point and replaces ruling 1 §4's sentence "measure … Growth over 10 % is a STOP with a plan to precompute" with the shape below. Everything else in ruling 1 stands.

## 1. P1 is ruled: the feed index carries the look (DEC-352)

Your measurement is accepted as the record (0.438 → 14.426 ms, × 32.9; the resolver's 0.32 ms per call planned every time). No per-card call of `level_perks_for` is written in any door. The feed index is already the cards' read model for a derived value (the rank, DEC-341), so the look joins it the same way:

- `public.feed_index` gains `placement text NULL` with the same CHECK as `listing_packages.placement` (`placement IS NULL OR placement IN ('standard','boost','top')`, 20261103040805 :27) and `badge boolean NULL`. Both nullable: NULL perks (a level switched off, or none found) write NULL axes, and a NULL axis is the typed absence the client reads as the baseline look. No default values.
- `feed_index_refresh` (20261104153313 :119) writes them from ONE `level_perks_for(v_tier, v_category_id, <the stored location's country_code>)` call per refresh — the same resolver and the same country read as `set_listing_level`. One mechanism; the index is its cache.
- The four doors read `f.placement` and `f.badge` from the row they already read. `my_saved_listings` and `public_listing_json` read the listing's all-categories, everywhere row (`category_key = place_key =` the nil key); when that row is absent the look is `{key, null, null}` — never a resolver call, never an error. The ad page therefore shows the same look as the cards, stale for the same minutes after a staff change, which is the consistency this ruling wants. The `level` expression on every card is `jsonb_build_object('key', <tier>, 'placement', f.placement, 'badge', f.badge)`; the `levels` dictionary stays exactly as you built it (three doors; none on the ad page).
- P2 (a per-listing table) is not taken: a second table for one derived pair, read by a join per card, when the read model exists.

## 2. What keeps the cache true

- Triggers, two new, each enqueuing through the existing `feed_reindex_enqueue_listings(uuid[])` (20261104153313 :40), drained by `feed-reindex-drain`:
  - on `listing_packages`: a change to `placement`, `badge` or `enabled` of a level row queues every live ad on that level; a change that alters none of the three (a name, a price) queues nothing. Row-level with a `WHEN` on the three columns, or statement-level with transition tables — your choice in the plan; the behaviour is the rule.
  - on `level_overrides`: INSERT, UPDATE or DELETE queues every live ad on the override's level. The level's whole set is the accepted superset (an override is scoped narrower; staff edits of overrides are rare; simplicity wins). Name this in the report.
  - the category tree (20261009052418 :348–380) and the ad's own changes (`feed_index_on_listing_update`) already refresh; no new path.
  - The propagation window is the drain's (500 a run, every minute), the window DEC-341 accepted for the rank. State it in the report as the accepted window; a later turn gives the Monetisation guide the sentence "reaches the cards within minutes".
- `feed_index_check` (20261104153313 :166) compares every index row's `placement`/`badge` with the resolver's current answer and reports a difference as a drift line through its existing channel (the nightly `feed_index_check_sweep`). This is the mechanism's guard (K3): a trigger that fails to queue shows up here the next night.
- Proofs, in one DO block on scratch rows under a sentinel, removed in the block, no real row read or written (G27; a real singleton row is parked only inside the rolled-back block, DEC-350):
  - a scratch level + a scratch live ad on it → refresh → the index rows carry the resolver's look;
  - the scratch level's `placement` changes → the ad's id is in the queue → the drain's core (or a direct refresh) → the index shows the new look; the same for `badge` and for `enabled` → NULL axes;
  - a scratch override on the scratch level (its category, every country) inserted, updated, deleted → queued each time;
  - a change to the scratch level's `name_en` → nothing queued;
  - a planted drift (an index row's `placement` set to a wrong value for the scratch ad) → `feed_index_check(scratch ad)` reports it; after a refresh it reports nothing;
  - the four doors' proofs as you built them (headers and grants; bodies hash to the last declaration with the fragments put back; the cards' `level` read from the index with the ruled values; the switched-off level's ad `{key, null, null}` still on the page; the dictionary exactly its five fields in (sort, key) order; the ad page's `level` with no dictionary and, for an ad without a nil-key row, `{key, null, null}`).
- Timing again at the migration stop, by your probe method (the scratch probe never committed): `feed_page` and `seller_feed_page` before and after, medians of 60. Tolerance: growth of at most 10 % with its cause named is reported; a larger growth is a STOP with its cause (G60 — a defect, not a number alone).

## 3. The split: five parts, by rule 30 — confirmed

Rule 30 binds before ruling 1 §10. Parts, in this order, each with a pre-check of the previous mark and of the live body's md5 (CR-normalised), the redeclaration with header and grants restated, proofs, closers, mark:

1. the read model: the two columns on `feed_index`, `feed_index_refresh`, the two triggers (and their functions), `feed_index_check`;
2. `feed_page` (whole, from 20261019223222 :15);
3. `seller_feed_page` (whole, from 20261029091909 :8 — INC-1083 named, `%I` form);
4. `my_saved_listings` (whole, from 20261019223222 :324);
5. `public_listing_json` (computed insertion from 20261029090431 :29 — INC-1083 named).

Marks are chosen at the commit, not now (G39): the UTC hour at the commit rounded up plus one hour for part 1, then +100 per part; every mark above c1's 20261107140500; the four door files re-stamped after part 1 so filename order = mark order. Pairing lines in the stop report: `apply <fragment> → expect mark <value>` for each of the five. `scripts/check-migrations.sh` run and its "Self-marking guard OK" line pasted (no probe in the tree when it runs). `bun run db:proof --fresh` PASS with the five parts and no probe. Each part at or under about 25 KB; a part that would pass it is split again by concern.

Then STOP at the migration stop as the GO says: the five files committed and pushed, END THE TURN; I apply on ethio-staging by the connector, read back the marks, patch the client types, and send "continue". Nothing of steps 3–7 before that.

## 4. PW-141 in the repeat lane — INC-1085; fixed in this turn's build part, at the root

Registered now as INC-1085 (your Records section carries it under that number): PW-141, `e2e/post-wizard-category.spec.ts:656`, repeat lane, mobile-360, `post-who-alias-ok` not visible within 20 s after the alias was typed; third occurrence of the test (2026-10-13, 2026-10-14, 2026-11-08); the repeat lane exists to surface exactly this (DEC-283), so it is a finding, not noise. Rule 40 (e) stands: not re-run.

Order: it is NOT fixed before the migration stop (the stop comes first, so the staging apply is not delayed); it is the first item of the build part after "continue", and the report names it under FINDINGS with its cause read, not guessed:

- Read first (G21): the alias route (`src/routes/api/listings/alias.ts`) and the doors it calls count `alias_check` by `rate_gate` — dial 60 per 3600 s per caller (20261003221958 :12). The repeat lane runs the changed spec file repeatedly inside 720 s with retries 0 on a backend whose pool holds 2 accounts (teardown: "pool 2, fresh 5"); every repetition of a named-seller test spends that caller's dial. Reproduce locally against staging: the spec with `--repeat-each` on PW-141 alone (and the sibling tests that type an alias), one worker, mobile-360; read the alias route's answer in the server log when the tick fails to show. If it is `rate`, the cause is proven; if it is anything else, STOP with the log lines.
- The fix, if the dial: at the mechanism, never the test and never the dial — the named-seller fixture (`seller(page, { named: true })`) gives its leased account a `rate_overrides` row for `alias_check` for the test's own user (G38: "a rate dial is never raised for a test — it gets a rate_overrides row for its own user"), removed with the account's other scratch rows; a leased account is not a fresh account (INC-377/378/380), so the fixture, not each spec, carries it. Red first: the repeat run failing before the fixture change, green after (`--repeat-each 12 --workers 8`, both projects, the G38 flake proof), both runs' counts in the report.
- If the cause is not the dial, the fix follows the cause under the same laws; a loosened timeout or a retry is refused.

## 5. Records (your report's Records section; I number)

- DEC-352 — the card look is precomputed into `feed_index` (`placement`, `badge`) by `feed_index_refresh` from the one resolver; the doors read the row; two triggers queue the level's live ads on a look change; `feed_index_check` guards drift; the ad page reads the same row (stale together with the cards). Alternative P2 recorded and not taken. Measurement: × 32.9 / × 35.4 with the per-card resolver; the resolver's 0.32 ms per call, planned each call.
- INC-1085 — PW-141 in the repeat lane (above), with the cause once read.
- Register row (unnumbered until R13): "the card look" → mechanism `level_perks_for` + its cache `feed_index.placement/badge` written by `feed_index_refresh` → guard `feed_index_check` (nightly) + the migration proofs → exceptions none → growth: a new look axis is a new column pair landed in the same migration as its `listing_packages` column, written by the refresh and compared by the check.
- Departures accepted: the probe method (a scratch migration read through db:proof's FAIL excerpt, never committed); the split by door; the curl departure as ruling 1 §11 recorded it.

## 6. Limits restated

Nothing outside the stop-1 census's file list and the five parts changes in this turn; a sibling is reported (K2), never touched. The brief's tolerances stand: a red whose failure or server log touches a path this turn changed is a STOP; any other red is named under Limits and CI judges. No "any red", no absolute byte number: the feed timing tolerance is §2's.
