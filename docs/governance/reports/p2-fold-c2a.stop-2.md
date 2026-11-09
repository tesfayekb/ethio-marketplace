STOP — p2-fold-c2a M-3c-a: the feed door's time grows about 33 times with the look on each card (ruling 1 §4: over 10 % is a STOP with a plan to precompute)
DONE: STEP 1 (the census, stop 1); ruling 1 saved (154d3f051); M-3c-a written as four parts and proven by `bun run db:proof --fresh` (PASS) — NOT committed (below)
LEFT: M-3c-a in the ruled shape → its MIGRATION stop; then the GO's steps 3–7 after "continue"
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `e515800b8b0ee43663d7b7478895bebe7087de83` (short `e515800`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-08T05:01:20Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42447608177
FILES:
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md

## The question

Ruling 1 §4 puts each card's look on the card: `level: { key, placement, badge }` from
`level_perks_for(l.tier, l.category_id, <the location's country>)`. Its cost lens says: "measure the
feed door's time before and after (EXPLAIN ANALYZE on a scratch market of 24 ads) in the stop report.
Growth over 10 % is a STOP with a plan to precompute." The growth is about 3 200 %. Which
precomputation do you rule (the plan and its alternative are below)?

## The measurement

**Method.** I have no database other than db:proof's throwaway local stack. The probe was a scratch
migration file, never committed, which db:proof applied after the doors under test. It built a
scratch market (XZ, currency XTS) with one city, one main category and three scratch levels (standard;
boost with badge; top with badge), plus one override (the category in XZ, badge). It then placed 24
live ads, cycling through the three levels, refreshed `feed_index` for each, and ran
`EXPLAIN (ANALYZE, FORMAT JSON) SELECT public.feed_page(<cat>, <city>, NULL, 20)` and the same for
`seller_feed_page(<the seller's name>, NULL, 20)` 65 times. It dropped the first 5 runs and took the
median of the other 60 `Execution Time` values. Finally it raised an exception carrying the numbers,
so db:proof's FAIL excerpt printed them and the transaction rolled everything back.
- Run 1 was the probe alone, on c1's tree: the old doors.
- Run 2 was parts 1 and 2 below, then the probe: the new doors.
Both pages showed 20 cards.

| Door | Before (median, min–max) | After (median, min–max) | Growth |
|---|---|---|---|
| `feed_page` | 0.438 ms (0.395–0.539) | 14.426 ms (14.106–16.048) | × 32.9 |
| `seller_feed_page` | 0.405 ms (0.362–0.643) | 14.348 ms (14.044–17.759) | × 35.4 |

**Where the time goes** (a second scratch probe on the same market, medians of 60):

| What was timed | Median |
|---|---|
| the `levels` dictionary alone (every enabled level row) | 0.016 ms |
| one `level_perks_for` call | 0.320 ms |
| twenty calls inside one query (the plan made once) | 1.221 ms |
| twenty calls as twenty statements (the shape the redeclared doors use) | 6.142 ms |
| the same twenty-row loop without the resolver | 0.031 ms |

`level_perks_for` is a SQL function with a recursive CTE (the main category through
`category_tree_pointers`, then the overrides by priority). It is not inlined. Called once per card
in its own statement, it is planned on every call. Even with one plan for the whole page, its
execution costs about 0.06 ms per card. The budget is 10 % of 0.438 ms, about 0.044 ms for all 20
cards together. So no per-card resolver call fits, wherever it is made. The dictionary fits on its
own: 0.016 ms is about 3.7 %.

## The plan to precompute (proposed)

**P1 — the feed index carries the look.**
- `feed_index` gains two nullable columns, `placement text` and `badge boolean`.
- `feed_index_refresh` (20261104153313 :119) writes them from one `level_perks_for(l.tier,
  l.category_id, <the location's country>)` call per refresh. That is the same resolver and the same
  country read as `set_listing_level`, so there is still one mechanism. NULL perks write NULL axes.
- The two feeds read `f.placement` and `f.badge` from the row they already read: no extra lookup.
- The saved page reads the listing's all-categories, everywhere row (`category_key = place_key =` the
  nil key, the row `seller_feed_page` reads). An available ad always has one; the grey card is
  unchanged.
- The ad page (one ad, not a list) keeps its one direct call, or reads the same row; ruled either way.
- What changes a look and how it reaches the index:
  - the level's own placement, badge or enabled: a new statement trigger on `listing_packages`
    (`AFTER UPDATE OF placement, badge, enabled`) queues that level's live ads;
  - an override: a new trigger on `level_overrides` (insert, update, delete) queues that level's live
    ads;
  - the category tree: already queued (20261009052418 :348–380);
  - the ad's own level, category or place: already refreshed (`feed_index_on_listing_update`).

  The queue is the existing one (`feed_reindex_enqueue_listings`, drained every minute by
  `feed-reindex-drain`, 500 a run). This is the same window DEC-341 accepted for the feed rank: a
  staff edit to a level's look reaches the cards within the drain's minutes.
- The nightly `feed_index_check` gains the look, so drift is caught.
- Cost: a refresh costs about 0.3 ms more; a read costs nothing per card. The expected growth is the
  dictionary's 0.016 ms plus the two keys' jsonb, about 4–5 %. M-3c-a would measure it again by the
  same method.
- Doors touched beyond the four: `feed_index_refresh`, `feed_index_check`, two new trigger functions.
  The two trigger functions are new mechanisms, which K3 says land with their guard.
- Parts: a new part 1 for the column, refresh, triggers and check; then the four doors.

**P2 (the alternative) — a per-listing table.** `listing_looks(listing_id PK, placement, badge)`,
service-only, maintained by the same refresh and the same triggers; the doors join it by its key.
This keeps `feed_index` unwidened (it holds about a dozen rows per ad), but each card costs a key
lookup. By the loop measurement that is about 0.02–0.04 ms per page, which with the dictionary sits
near the 10 % line.

I recommend P1.

**Not proposed.** A look map in the answer, keyed by level × main category × country, still costs one
resolver call per distinct combination on the page (0.32 ms each). A plpgsql resolver would plan once
per session, but still executes about 0.06 ms per card.

## The shape as built (for the record — not committed, not in the tree)

Ruling §10 says "Four doors in one file if near rule 30's size, else two by concern (the two feeds;
the saved page and the ad page)." Rule 30 says "a very large migration (about 25 KB or more) is split
by concern into ordered parts, each with its own mark, proofs and stop." The two files measured
33 840 and 27 703 bytes: the two feeds' whole bodies and their proofs need at least about 26 KB. The
rule binds before the ruling, so I split by door, in the ruling's concern order. **I ask you to
confirm that split** for the final M-3c-a.

| Part | File (on this computer only) | Bytes | Mark | Door, form | Body md5 old → new |
|---|---|---|---|---|---|
| 1 | 20261108050939_6c15fc01-c262-40a1-be0e-d69b284214cf.sql | 22 474 | 20261108060000 | `feed_page`, whole from 20261019223222 :15 | ad16deaaf6758ede753be92f0a110ded → 5b622f49790512f02937e10cb0e35b4e |
| 2 | 20261108050940_0959669e-60ea-428e-97f9-f1541da4cea1.sql | 20 990 | 20261108060100 | `seller_feed_page`, whole from 20261029091909 :8 (INC-1083 named) | c39aaa046d09bd3d98d9f6f5c3fe21db → a7f71d13ecb715523f7a28a644a400f1 |
| 3 | 20261108051152_dbe46240-30bc-4f33-b0af-14c6623566fe.sql | 20 351 | 20261108060200 | `my_saved_listings`, whole from 20261019223222 :324 | b29406f48a22951c93d67e1e8b32e41d → 0c72c8bbcb7e33aaa5205a5b8d583fa9 |
| 4 | 20261108051153_7396d01f-742b-4249-af5b-886db02b2479.sql | 13 638 | 20261108060300 | `public_listing_json`, computed insertion from 20261029090431 :29 (INC-1083 named) | 0cde7e7441adfd35187f8b411af26f78 → ee37b399a5bc0b45e04268e43b7711aa |

Full sha256s:
- part 1: `ec898f24c95c558e44917f01b6913a6c3dabd504f15fd5843d8db1ec583d8cab`
- part 2: `a5429422dc18799b25e3d9f10bfb0f8785cf224a60c9048f8fa4f25ea8c36b58`
- part 3: `d6ac3522488831a464e5cb5e5db7aba4e8beb56fab8ba21345d576a095384575`
- part 4: `c4c9e1a043ab3384af31dae4aeb6bf3b34a7776139479aea1a8d9f398906bfd3`

**Each part's form:**
- a pre-check of the previous mark (part 1 checks c1's 20261107140500) and of the live body's md5
  (CR-normalised);
- the redeclaration, with header and grants unchanged and restated;
- proofs in one DO block on scratch rows, under a sentinel;
- the closers, then the mark.

**The fragments, built by script from each last declaration** (each unique; the script also proved the
put-back):
- the card query gains `loc.country_code AS location_country` (the row `set_listing_level` reads);
- each card gains
  `'level', (SELECT jsonb_build_object('key', v_rec.tier, 'placement', k.p->>'placement', 'badge',
  k.p->'badge') FROM (SELECT public.level_perks_for(v_rec.tier, v_rec.category_id,
  v_rec.location_country) AS p) k)`;
- each answer gains
  `'levels', (SELECT coalesce(jsonb_agg(jsonb_build_object('key', k.key, 'sort', k.sort, 'name_en',
  k.name_en, 'name_am', k.name_am, 'is_baseline', k.is_baseline) ORDER BY k.sort, k.key), '[]'::jsonb)
  FROM public.listing_packages k WHERE k.kind = 'level' AND k.enabled)`;
- `public_listing_json` gains the same `level` beside `tier`, from its own `v_country`, with no
  dictionary.

Under P1 the `level` expression would become `jsonb_build_object('key', v_rec.tier, 'placement',
f.placement, 'badge', f.badge)`; the dictionary stays as built.

**The proofs as built:**
- (a) each door's header and grants;
- (b) each body hashes to its last declaration with the fragments put back;
- (c) the cards:
  - the scratch market has one main category and two scratch levels;
  - the enabled level is standard with no badge; its overrides set the badge (the category, every
    country) and boost (the category in XZ), so the card answers `{key, "boost", true}` and the
    location's country is shown to reach the resolver;
  - the switched-off level's ad answers `{key, null, null}` and is still on the page;
  - every other card key and the answer's keys are the old ones;
- (d) the dictionary is every enabled level row in (sort, key) order with exactly its five fields; the
  scratch enabled level appears as its row and the switched-off one is absent;
- the ad page answers the same `level` with no dictionary.

**db:proof:** `db:proof PASS — applied 428/428, CLI 2.120.0, cold, 49 s` (`--fresh`, with the four
parts and no probe). After the timing runs I moved the four files out of `supabase/migrations/`, so
the tree is c1's plus the docs above. The local stack still holds them; the next db:proof runs
`--fresh`.

**check-migrations:** run on the four parts and the probe. Every guard was OK except "Self-marking
guard FAILED: 1 file(s)", which named only the scratch probe, by design (it carries no mark and was
never committed).

**Why not committed:** the parts carry the per-card resolver that §4's cost lens refuses. A committed
migration on the pull request would be applied by CI's lanes and could be taken for the migration
stop. The ruled shape will be written and committed at its own MIGRATION stop.

## A red on PR #30 (finding — rule 40 (e), not re-run)

- **Where:** run 42447608177 on `e515800` (stop 1, docs only).
- **What failed:** PW-141 (`e2e/post-wizard-category.spec.ts:656`) in the repeat lane, on
  mobile-360. `post-who-alias-ok` never showed within 20 s after the alias was typed. "E2E
  (Playwright, ethio-staging)" is the merged verdict of that one failure.
- **Context:**
  - Passed 2795 · Skipped 406 · Failed 1.
  - c1's last commit `5bd54705d` was green on the same code (run 42444923983).
  - The pull request changed this spec (PW-29's photo cap), not PW-141. The spec runs in the repeat
    lane because it changed.
  - The flake ledger holds two earlier PW-141 lines (2026-10-13, 2026-10-14), so it is under three in
    seven days.
  - No context file was uploaded for the test, so the cause is not proven.
- **Where to look next:** the test signs in a named seller (`seller(page, { named: true })`) and
  types a new name. The check goes through `/api/listings/alias`, which counts `alias_check` by
  `rate_gate`; a repeat of the spec on a reused seller is the first suspect.
- **Not this turn's path:** c2a has changed no code yet.
- **What I propose:** fixing it first in the next build part, as a named item in the report. Rule it
  otherwise if you prefer.

## Departures and records

- **The split:** four parts by door instead of ruling §10's two. Rule 30 quoted above; your
  confirmation is asked.
- **Timing method:** a scratch probe migration run by db:proof, read only through db:proof's own FAIL
  excerpt; the probe was never committed and db:proof's logs were not opened.
- **The curl departure** stays as ruling 1 §11 recorded it.
