# The levels store — the level rows every screen reads (P-2 (c) c2a; DEC-351 §8, DEC-352, DEC-353)

An ad's level is a row of `listing_packages` (kind `level`): a key, a sort, two names, the
baseline flag and the row's base look (`placement`, `badge`). Staff may rename, end or add a
level; no screen names one by a word. The screens read the rows through ONE module,
`src/features/levels/levels-store.ts`, a subscribed store like the category tree. The pure
fields an answer carries — the look (`LevelLook`, `PLAIN_LOOK`), a card's `level`
(`parseCardLevel`), the ad document's `level` (`parseDocumentLevel`) and THE name chooser
(`levelNameOf`, through `catalogText`) — live in `src/features/levels/level-fields.ts`, which
holds no store and makes no read; the store's rows and the ad page both name a level through it.

## Where the rows come from

- **The card answers carry them.** `feed_page` (the feeds and similar ads, through `/api/feed`),
  `seller_feed_page` and `my_saved_listings` answer one `levels` dictionary per answer (`key,
sort, name_en, name_am, is_baseline`; every enabled level row, in order) and, on each card,
  `level: {key, placement, badge}` — the card's own look, precomputed into `feed_index` (M-3c-a).
  `/api/feed` and `/api/seller` pass the dictionary on; an answer without it is a server error.
  The readers (`parseFeedPage`, `useSellerFeed`, `mySaved`, `similar.ts`, the held first page)
  seed the store with it (`seedLevelRows`, equality-guarded), so a card page makes no extra
  request and the server render draws every card from its own answer.
- **The ad page** (`public_listing_json`) carries the ad's `level` object with its row's names
  (`level: {key, placement, badge, name_en, name_am}`, M-3c-a part 7) and no dictionary: its look
  (`adPageView` → `look`) and its flag's word (`adPageLevelName`, through `levelNameOf`) come
  from its own answer. The page does not touch the store, so a direct landing makes no read
  (SBE-1, DEC-261); NULL names (the row is gone) draw no word and so no flag.
- **A screen with no card answer** — the seller's own ad, the wizard's Review and Screening's
  previews, staff's listing page, the Set level dialog, the roster's and Screening's level filters
  — reads the rows once through the store's table read (`useLevelRows()`): the enabled level rows
  browser roles see, keyset by key (`readAllPages`), with their base look. `useLevelRows({ looks:
false })` serves the seeded names without a read; `useLevelLook(key)` is a preview's look.

## The rules it keeps

- `levelOf(rows, key)` — the row for a key; a key the rows do not hold reads as the BASELINE row,
  never dropped (INC-1079). `exactLevel` is the exact row only (the flag's word shows only when the
  dictionary holds the card's key). `levelLook`; a row's name is `levelNameOf(row, language)`
  (both languages; null when the row has no name in either, never a fallback word).
- `parseCardLevel` reads a card's `level`, `parseDocumentLevel` the ad's; `cardLookOf` / `adPageLookOf`
  (`src/components/marketplace/card-tier.ts`) draw from `{placement, badge}` as independent axes:
  placement picks the frame (standard plain, boost green, top gold), a true badge adds the flag
  (gold on top, green otherwise). An unknown placement is the plain frame.
- A failed table read is a typed `ReaderError` and is logged (`[levels] the level rows read
failed`); a failed download of the database client goes through `reportOnDemandFailure`
  (INC-911). On a failed read the previews draw the plain look and the filters offer only All.
- CF-LEVEL-1 (`scripts/conformance/listing-levels.ts`) names the store as one of the two homes
  allowed to read `listing_packages` (`LEVEL_READER_HOMES`); DEC-331 emptied its `tier:` lines.

## Tests

Unit: `levels-store.test.ts` LVS-1…9; `card-tier.test.ts` CTR-1…5; `tier-flag.test.tsx`;
`listing-card.test.tsx` LC-11; `public-listing.test.ts` AV-11, AV-12 (the ad page's word); `feed-page.test.ts` FP-1, FP-3 (a fourth key keeps its card);
`feed.test.ts` FD-5 and `seller.test.ts` SLR-5 (the dictionary rides the body); `tier-reasons.test.ts`
TIR-1…8; `tier-dialog.test.tsx` TD-1…8. E2E: `sage-tiers.spec.ts`, `sage-ad-page.spec.ts`,
`admin-listings.spec.ts` ATR-1…7, `admin-screening.spec.ts` SC-27, `my-listings-promote.spec.ts`,
`dark-cards.spec.ts`, `feed-route.spec.ts` FR-6; each reads a level's names from its row.
