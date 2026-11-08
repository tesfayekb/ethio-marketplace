STOP — p2-fold-c2a M-3c-a (ruling 2): with the ruled card `level`, the feed doors' time grows 15–18 %, more than ruling 2 §2's 10 % tolerance
DONE: ruling 2 saved (2c0476cde); M-3c-a written in ruling 2's shape and proven — `scripts/check-migrations.sh` "Migration guard OK", `bun run db:proof --fresh` PASS (430/430) — NOT committed (below)
LEFT: the supervisor's answer on the cost; then M-3c-a committed and pushed with its MIGRATION stop; then INC-1085 (§4) and the GO's steps 3–7 after "continue"
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `be5cb21add2de4c1f0db4f7d61553d48fcc74118` (short `be5cb21`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-08T05:43:49Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42450544538
FILES:
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/briefs/p2-fold-c2a-ruling-2.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md

## The question

Ruling 2 §2: "growth of at most 10 % with its cause named is reported; a larger growth is a STOP with its cause
(G60 — a defect, not a number alone)." The ruled shape grows `feed_page` by 15.4–17.4 % and `seller_feed_page` by
18.1 %. The cause is the card's nested `level` object together with the `levels` dictionary. The index read (DEC-352)
costs nothing measurable.

**I need the supervisor's ruling on one of these, or another:**

| Option | `feed_page`, probe 6 | Contract change |
| --- | --- | --- |
| A. Accept the ruled shape as built | +17.4 % | none |
| B. Flat card keys beside `tier`, plus the dictionary | +10.3 % | the card's `level` object (DEC-351 §8) becomes two keys |
| C. The nested `level` object, the dictionary served elsewhere | +12.1 % | the `levels` key leaves the three doors |
| D. Flat card keys, the dictionary served elsewhere | +5.5 % | both of the above |

In absolute terms, on this computer's Docker, option A adds about 0.07 ms to a 20-card page. Every option keeps
DEC-352's precompute; none puts a resolver call back on a card.

## The measurement

The method is the stop-2 probe method. The probe is a scratch migration, stamped last, never committed, and removed
before every guard run. It builds a scratch market (XZ, XTS), three scratch levels and an override, and 24 live ads,
refreshed. Then it runs `EXPLAIN (ANALYZE, FORMAT JSON)` of each door, drops the first 5 runs and takes the median of
the rest. It ends by raising its numbers, which db:proof's FAIL excerpt prints.

**Separate stacks** (ruling 2 §2's "before and after", 60 runs each; each run on its own fresh stack):

| Door | Before: c1's tree | After: the six parts | Growth |
| --- | --- | --- | --- |
| `feed_page` | 0.437 ms (0.408–0.465) | 0.574 ms (0.508–0.845) | +31 % |
| `seller_feed_page` | 0.400 ms (0.372–0.421) | 0.534 ms (0.461–0.758) | +34 % |

The "after" run was noisy (its maxima). So the cause was measured with every variant in ONE session, interleaved run
by run. The old bodies and the variants are scratch copies of the doors made inside the probe.

**Probe 3** (60 runs each, interleaved):

| Variant | `feed_page` | `seller_feed_page` |
| --- | --- | --- |
| old body | 0.429 ms | 0.398 ms |
| new body, no dictionary | 0.485 ms | 0.448 ms |
| new body as built | 0.495 ms (+15.4 %) | 0.470 ms (+18.1 %) |
| the dictionary's query alone | 0.017 ms | — |

**Probes 4–6** (`feed_page`, 120 runs each, interleaved; probe 6 is the last and fullest):

| Variant | Probe 4 | Probe 5 | Probe 6 | Probe 6 vs old |
| --- | --- | --- | --- | --- |
| old body | 0.417 | 0.408 | 0.437 | — |
| also reads `f.placement`, `f.badge` | 0.417 | 0.407 | 0.435 | −0.5 % |
| plus `'level', v_rec.tier` (a scalar key) | 0.428 | 0.419 | 0.449 | +2.7 % |
| flat keys `levelPlacement`, `levelBadge` | — | 0.428 | 0.461 | +5.5 % |
| flat keys plus the dictionary | — | — | 0.482 | +10.3 % |
| nested `level` object, no dictionary | 0.467 | 0.457 | 0.490 | +12.1 % |
| nested object built in the query instead | 0.468 | — | — | — |
| as built (nested object plus dictionary) | 0.487 | 0.475 | 0.513 | +17.4 % |

## The cause

- **The index read costs nothing.** Reading `f.placement` and `f.badge` from the row the door already reads changes
  nothing measurable (−0.5 % to 0).
- **The nested object costs about 2 µs a card.** A `jsonb_build_object` inside each card's object costs about 0.05 ms
  on a 20-card page. Building it in the query instead of the PL/pgSQL expression costs the same. Two flat keys cost
  half as much.
- **The dictionary costs about 0.02 ms a call.** It is one aggregate over `listing_packages` per call.

So the growth is the answer's shape, not a defect in the read: the ruled card contract costs about 0.07 ms a page.
Whether that price is accepted is the supervisor's decision, not mine (G60).

## The shape as built (for the record — not committed, not in the tree)

Ruling 2 named five parts. Its part 1 came out at 31.7 KB, over rule 30's ceiling of about 25 KB. So it was split
again by concern, as §3 says: 1 the cache, 2 its keepers. That makes six files.

They are held at `/tmp/c2a-census/v2/built/` (this computer only). The marks assume a commit before 07:00 UTC
today. At the commit, the stamps and marks are chosen again by §3's rule, and the files are regenerated. The md5
values below do not change with the marks.

| # | File | Bytes | sha256 |
| --- | --- | --- | --- |
| 1 | `20261108060100_885b5eb1-85af-40e8-834d-fc87fdcf7539.sql` | 17 727 | `5dbf86cb58b07c78f9be01c4b13bf2b66695d30a8d6ca94a11339651f816b6ea` |
| 2 | `20261108060101_674cc5bf-8a49-426c-8e7d-26fcdfe51405.sql` | 22 912 | `3d0b935a50d6ebb6ff97fdf360023aae5a54b84a9b4befcf4a56cf22143150a3` |
| 3 | `20261108060102_dfd0a6b6-9b9d-40d2-8fff-14ea72760f28.sql` | 22 071 | `92cef44e07c5b8f3f10d9b432078e36582ff31664c7e7b291976c3489de99bb7` |
| 4 | `20261108060103_f74ef992-7cc4-4fe0-af1e-de269e92bcf2.sql` | 20 805 | `c836b30c2605c6a91eb3f5bd8a45f45d43e9bf3f423cce600c6d5fde458a8a12` |
| 5 | `20261108060104_eb9c362d-98bd-4e51-9df4-f31e7c0539ad.sql` | 21 937 | `29ee89e00cc1cff5cc899fc18ca6bb76ab7c9b76a40266f0b9ace5a62903f26d` |
| 6 | `20261108060105_bc0a5b61-955e-478b-93d0-fa900951e9c3.sql` | 14 714 | `97f60a23dcd3331a724b65c776c3c1f7871e9b931c8bb76b6368348262c11aac` |

| # | Mark as built | Objects | md5 old → new |
| --- | --- | --- | --- |
| 1 | 20261108080000 | `feed_index.placement` (with `feed_index_placement_check`) and `feed_index.badge`; `feed_index_refresh`, whole from 20261104153313 :119; the one-time fill | refresh `cdf73a660fc0341833c86db338250961` → `d71a39b4aecdd5a704e8dd5301909c62` |
| 2 | 20261108080100 | `feed_index_check`, whole from 20261104153313 :166; `feed_index_level_look_requeue()` with trigger `listing_packages_level_look`; `feed_index_level_override_requeue()` with trigger `level_overrides_level_look` | check `275d7b2b42350328113f821f0c831b7b` → `772605d310a61f5e12cf5f63e44ddfdc` |
| 3 | 20261108080200 | `feed_page`, whole from 20261019223222 :15 | `ad16deaaf6758ede753be92f0a110ded` → `c2bd59a8d545bd1b4e45964785996c89` |
| 4 | 20261108080300 | `seller_feed_page`, whole from 20261029091909 :8 | `c39aaa046d09bd3d98d9f6f5c3fe21db` → `f982846d4bfbaca9e620e9be62988eee` |
| 5 | 20261108080400 | `my_saved_listings`, whole from 20261019223222 :324 | `b29406f48a22951c93d67e1e8b32e41d` → `a97294ca81edeeafb02688d1afced62a` |
| 6 | 20261108080500 | `public_listing_json`, computed insertion from 20261029090431 :29 | `0cde7e7441adfd35187f8b411af26f78` → `658946271564eb7906d91729e995407b` |

**Every file:**
- a pre-check of the previous mark (part 1: c1's 20261107140500);
- a pre-check of the live body's md5, CR-normalised (law 13);
- the header and grants restated;
- proofs on scratch rows under a sentinel, with no real row read or written (G27);
- closers, then the mark.

**The proofs, by part:**
- **Part 1:**
  - (a) the columns from `pg_attribute`: types, nullable, no default; the CHECK by name, which refuses another value;
    the writer's header, grants and volatility;
  - (b) the writer's md5 with the fragments put back;
  - (c) an ad at an enabled scratch level gets rows with the resolver's look (standard, false); an ad at a
    switched-off scratch level gets rows with NULL axes.
- **Part 2:**
  - (a) both triggers from `pg_trigger`'s columns, never its text: after, row-level, events, columns, a WHEN on the
    first only, function, enabled; the three functions' headers and grants;
  - (b) the check's md5 with its fragment put back;
  - (c)/(d) one loop over nine steps, each read into a variable (CF-PROOF-1) and then refreshed directly. The drain's
    core is not run, because it would take real queue rows.
    - `placement` → queued, then top;
    - `badge` → queued, then true;
    - `enabled` off → queued, then NULL axes;
    - `enabled` on → queued, then the look back;
    - `name_en` → nothing queued;
    - an override (its category, every country) inserted, updated, deleted → queued each time, then its look each time;
  - (e) a planted drift is counted by `feed_index_check(ad)` under `listings_with_wrong_look` alone (wrong rows 0);
    after a refresh, nothing is counted.
- **Parts 3–6:** the door proofs as built.
  - The `level` is read from the index: (boost, true) for the overridden scratch level, and `{key, null, null}` for
    the switched-off one, whose card is still on the page.
  - The card's and the answer's keys are the old ones plus `level` / `levels`.
  - The dictionary's five fields, in (sort, key) order.
  - The ad page: `level` with no dictionary.
  - New in parts 5 and 6: an ad whose nil-key row was removed answers `{key, null, null}`, and on the saved page it
    is still an available card.

**Guards on the six parts** (no probe in the tree):
- `bash scripts/check-migrations.sh` → exit 0. Its lines include "Self-marking guard OK (floor 20260817054246)", "Born-closed guard OK (floor
  20261007143529)", "Definer guard OK", "Public-surface guard OK (floor 20261003215043)", "Real-row proof guard OK
  (floor 20261007000000)" and "Migration guard OK".
- `bun run db:proof --fresh` → `db:proof PASS — applied 430/430, CLI 2.120.0, cold, 55 s`.
- `bunx vitest run scripts --maxWorkers=2` → 491 of 492 passed. The one red is NH-6
  (`scripts/ci/nightly-hour.test.ts`), this computer's known limit, already ruled in c1.

**Pairing lines as built.** They become final at the commit, with the marks chosen then.

```
apply 885b5eb1 → expect mark 20261108080000
apply 674cc5bf → expect mark 20261108080100
apply dfd0a6b6 → expect mark 20261108080200
apply f74ef992 → expect mark 20261108080300
apply eb9c362d → expect mark 20261108080400
apply bc0a5b61 → expect mark 20261108080500
```

## Readings and choices to confirm

1. **Part 1 split by size.** Five parts became six (31.7 KB → 17.7 and 22.9 KB). Ruling 2 §3 allows it ("split again
   by concern").
2. **The one-time fill.** Adding the columns leaves every real row's look NULL, and nothing would refresh an ad that
   never changes. Part 1's section C therefore sets every indexed ad's look once, in one set-based UPDATE with the
   refresh's read (the ad's level, category and location's country; a WHERE, G39). It writes derived values only,
   no seed. Ruling 2 does not name this step; I took it as the completion of §1 ("the refresh writes both"). After
   the apply, `feed_index_check(NULL)->>'listings_with_wrong_look'` should read 0 on staging. A proof cannot show
   that without reading real rows.
3. **"`%I` form" in §3 item 3.** `seller_feed_page` is redeclared whole, as item 3 and ruling 1 §10 say. A whole text
   has no `format()`, so I read "`%I` form" as belonging to item 5's computed insertion, which uses it. Either reading
   gives the same database.
4. **The real-row proof guard.** It refused eight statements in the first build. Each was fixed at its root, none
   allowlisted:
   - The proofs' rollback checks and the seller part's alias UPDATE now filter on the scratch namespace
     (`email LIKE 'e2e-mig-%'`).
   - The writer reads the location's country by a LEFT JOIN in its existing first SELECT (one read, the listing still
     locked `FOR UPDATE OF l`). Before, it ran a second SELECT from `locations`, whose text inside the proof's
     fragment literal the guard read as a real-row read.
5. **The check's new count.** `listings_with_wrong_look` is a new key in the check's answer, not folded into
   `listings_with_wrong_rows`. That keeps the old count's meaning, which `e2e/feed-index.spec.ts` asserts. The nightly
   `feed_index_check_sweep` stores the whole answer in `feed_index_check_runs`, so a drift is a line there with no
   change to the sweep.
6. **The triggers are row-level.**
   - `listing_packages_level_look`: `AFTER UPDATE OF placement, badge, enabled … WHEN (NEW.kind = 'level' AND (old
     triple) IS DISTINCT FROM (new triple))`.
   - `level_overrides_level_look`: AFTER INSERT OR UPDATE OR DELETE. An update queues the old and the new level.
   - Both functions are SECURITY DEFINER, `search_path` public, and born closed (service_role only).
   - No doors-manifest or public-surface line is needed.

## For the report (ruling 2 §5)

- **The superset (§2):** an override's insert, update or delete queues every live ad on its level. That includes ads
  in other categories and countries, which are rewritten unchanged.
- **The propagation window:** the drain's, 500 ads a run every minute (DEC-341's). Until the drain reaches an ad,
  its cards and its ad page show the old look, stale together.
- **DEC-352, INC-1085, the register row, and the accepted departures** (the probe method, the split by door, the curl
  departure): they go into the report as §5 words them. INC-1085 is not started; it is the first item after
  "continue" (§4).

## Limits

- The timings come from this computer's Docker (Apple silicon), not from staging or CI.
- E2E values: not needed for this step; no browser test was run.
