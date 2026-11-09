MIGRATION — p2-fold-c2a M-3c-a: the card look precomputed into the feed index, six parts (rulings 2 and 3, DEC-352)
DONE: ruling 3 saved and M-3c-a's six parts committed together (8f1a8e609); `scripts/check-migrations.sh` "Migration guard OK"; `bun run db:proof --fresh` PASS (430/430)
LEFT: the staging apply and the types patch (the supervisor's); then, after "continue", INC-1085 first (ruling 2 §4), then the GO's steps 3–7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `6e62092ad0b3ceadd2e8d54f5f7941001a0531a3` (short `6e62092`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-08T06:57:07Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42455269000
FILES:
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/briefs/p2-fold-c2a-ruling-2.md
docs/governance/briefs/p2-fold-c2a-ruling-3.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md
docs/governance/reports/p2-fold-c2a.stop-4.md
supabase/migrations/20261108070500_f5397010-c354-4ed9-81fd-0799efc8c7a7.sql
supabase/migrations/20261108070501_6da335da-6663-4037-94a5-428169504eef.sql
supabase/migrations/20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql
supabase/migrations/20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql
supabase/migrations/20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql
supabase/migrations/20261108070505_2d85fa86-6df7-452a-97d2-cb32e7f7a977.sql

## The six files

The marks follow ruling 2 §3's rule at the commit: committed at 07:06 UTC, rounded up to 08:00, plus one hour gives
20261108090000, then +100 a part. Filename order is mark order. Every mark is above 20261107140500.

| # | File | Bytes | sha256 | Mark |
| --- | --- | --- | --- | --- |
| 1 | `20261108070500_f5397010-c354-4ed9-81fd-0799efc8c7a7.sql` | 17 727 | `d5e9e9eec22ce6fc64df91ecbd049703e4a57777f9f613d3364298fd36a8b774` | 20261108090000 |
| 2 | `20261108070501_6da335da-6663-4037-94a5-428169504eef.sql` | 22 912 | `db4ed5d492b7d4a668518ab429ef348122adda5d1a16dad7fa7bfb270a1418b7` | 20261108090100 |
| 3 | `20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql` | 22 071 | `b5b01b3c44a1ef7c3e5a7be13295706c32b1b367a55c45b603c0296a0e0a9dc6` | 20261108090200 |
| 4 | `20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql` | 20 805 | `0aa82e5feb7f423063ce6add6c3a6325a414588aabcf195e47a6cfa364569ead` | 20261108090300 |
| 5 | `20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql` | 21 937 | `89efbfd70bba58bdca935eaa20394a23f9471240dfb9066ca92455f0dead7252` | 20261108090400 |
| 6 | `20261108070505_2d85fa86-6df7-452a-97d2-cb32e7f7a977.sql` | 14 714 | `c8a001535102840bf61a4821e4a2a0772db38759967d22f0c4c3d9d6c4d99ad2` | 20261108090500 |

| # | Objects | md5 old → new (CR-normalised, law 13) |
| --- | --- | --- |
| 1 | the cache: `feed_index.placement` (text NULL, `feed_index_placement_check`: NULL or standard, boost, top) and `feed_index.badge` (boolean NULL), no defaults; `feed_index_refresh(uuid)` whole from 20261104153313 :119; the one-time fill (one set-based UPDATE with a WHERE) | `cdf73a660fc0341833c86db338250961` → `d71a39b4aecdd5a704e8dd5301909c62` |
| 2 | the keepers: `feed_index_check(uuid)` whole from 20261104153313 :166, with a new count `listings_with_wrong_look`; `feed_index_level_look_requeue()` with trigger `listing_packages_level_look`; `feed_index_level_override_requeue()` with trigger `level_overrides_level_look` | `275d7b2b42350328113f821f0c831b7b` → `772605d310a61f5e12cf5f63e44ddfdc` |
| 3 | `feed_page(uuid, uuid, jsonb, integer)` whole from 20261019223222 :15 | `ad16deaaf6758ede753be92f0a110ded` → `c2bd59a8d545bd1b4e45964785996c89` |
| 4 | `seller_feed_page(text, jsonb, integer)` whole from 20261029091909 :8 (INC-1083 named) | `c39aaa046d09bd3d98d9f6f5c3fe21db` → `f982846d4bfbaca9e620e9be62988eee` |
| 5 | `my_saved_listings(jsonb, integer)` whole from 20261019223222 :324 | `b29406f48a22951c93d67e1e8b32e41d` → `a97294ca81edeeafb02688d1afced62a` |
| 6 | `public_listing_json(listings, uuid)`, computed insertion (`%I` form) from 20261029090431 :29 (INC-1083 named) | `0cde7e7441adfd35187f8b411af26f78` → `658946271564eb7906d91729e995407b` |

**Every file:**
- a pre-check of the previous mark (part 1: c1's 20261107140500);
- a pre-check of the live body's md5;
- the header and grants restated (the feed doors to anon, authenticated and service_role; the saved page to
  authenticated and service_role; the writer, the check, both trigger functions and the ad page's document to
  service_role only, born closed);
- the proofs, on scratch rows under a sentinel (market XZ, currency XTS, `e2e_mig_` keys, scratch users whose email
  starts `e2e-mig-`); no real row is read or written;
- the closers, then its mark.

**The proofs, by part:**
- **Part 1:**
  - (a) the columns from `pg_attribute` (types, nullable, no default) and the CHECK by name, which refuses another
    value; the writer's header, grants and volatility;
  - (b) the writer's md5 with the fragments put back;
  - (c) an ad at an enabled scratch level gets rows carrying the resolver's look (standard, false); an ad at a
    switched-off scratch level gets rows with NULL axes.
- **Part 2:**
  - (a) both triggers from `pg_trigger`'s columns (after, row-level, events, columns, a WHEN on the first only,
    function, enabled); the three functions' headers and grants; the check sql and stable;
  - (b) the check's md5 with its fragment put back;
  - (c)/(d) nine steps, each compared with the resolver's answer read into a variable and then refreshed directly:
    - `placement`, `badge`, `enabled` off, `enabled` on → queued each time, and each refresh writes the new look
      (`enabled` off writes NULL axes);
    - `name_en` → nothing queued;
    - an override inserted, updated, deleted → queued each time;
  - (e) a planted drift is counted under `listings_with_wrong_look` alone, and nothing is counted after a refresh.
- **Parts 3–6:**
  - (a) the header and grants;
  - (b) the md5 with the fragments put back;
  - (c) `level` read from the index: (boost, true) for the overridden scratch level; `{key, null, null}` for the
    switched-off level, whose card is still answered; the card's and the answer's keys;
  - (d) the dictionary's five fields in (sort, key) order (parts 3–5);
  - parts 5 and 6: an ad with no all-categories, everywhere row answers `{key, null, null}` (on the saved page it is
    still an available card); the ad page answers no dictionary.

**Guard lines** (`bash scripts/check-migrations.sh`, no probe in the tree, exit 0):

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

`bun run db:proof --fresh` → `db:proof PASS — applied 430/430, CLI 2.120.0, cold, 51 s`.

## Apply pairing lines

```
apply f5397010 → expect mark 20261108090000
apply 6da335da → expect mark 20261108090100
apply 6ea5ac5b → expect mark 20261108090200
apply ff2ee3b9 → expect mark 20261108090300
apply 5e07ef82 → expect mark 20261108090400
apply 2d85fa86 → expect mark 20261108090500
```

## The feed doors' timing (DEC-353)

- **Per-card calls:** no function is called once per card. The look is read from the row the door already reads.
- **Growth per 20-card page:** +0.07 ms, inside DEC-353's 1 ms line. On `feed_page`, probe 6 measured 0.437 → 0.513 ms
  (medians of 120, interleaved in one session, stop 3). On `seller_feed_page`, probe 3 measured 0.398 → 0.470 ms.
- **The cause:** the nested `level` object, about 2 µs a card, and the `levels` dictionary, about 0.02 ms a call. The
  index read costs nothing measurable (−0.5 % to 0).

## Findings

- **F-1, the writer's one behavioural change beside the two columns** (ruling 3 §3.4). `feed_index_refresh`'s first
  SELECT now LEFT JOINs `locations` for the country. It still locks only the listing (`FOR UPDATE OF l`), and the
  location row is not locked. It then makes one `level_perks_for` call per refresh. Everything else in the writer is
  unchanged.
- **F-2, the one-time fill** (ruling 3 §3.2). It writes derived values only, through the refresh's own read. After
  the staging apply, `feed_index_check(NULL)->>'listings_with_wrong_look'` should read 0 (the supervisor's read-back).
- **F-3, the propagation window and the superset.** A level's or an override's change reaches the cards and the ad
  page through the drain: 500 ads a run, every minute (DEC-341). An override's insert, update or delete queues every
  live ad on its level, a superset; the ads it does not reach are rewritten unchanged.
- **K2 (ruling 3 §3.5).** No screen or script renders `feed_index_check_runs`' answer. `e2e/feed-index.spec.ts`
  FE-13 (:426–435) checks a fixed list of the sweep's keys with `toHaveProperty`. The new key does not break it, but
  it is not asserted there. Proposed c3 line: FE-13's list gains `listings_with_wrong_look`.

## Records (for the report)

- **DEC-352:** the card look is precomputed into `feed_index` (ruling 2 §5).
- **DEC-353:** the feed doors' timing tolerance (ruling 3 §2). A STOP is (a) a function PostgreSQL does not inline,
  called once per card, or (b) growth of more than 1 ms per 20-card page. Class rule: a timing tolerance on a
  sub-millisecond function is an absolute per-page number plus a named defect, never a bare percentage.
- **INC-1085:** not started; it comes after "continue" (ruling 2 §4).
- **The register row:** "the card look", as ruling 2 §5 words it.
- **The six readings of stop 3:** confirmed by ruling 3 §3.

## Limits

- The timings come from this computer's Docker, not from staging or CI.
- No browser test was run in this step; none was owed.
- The pull request's CI runs the proofs on its temporary backends. Its preflight reports "STAGING BEHIND" until
  ethio-staging holds mark 20261108090500.
