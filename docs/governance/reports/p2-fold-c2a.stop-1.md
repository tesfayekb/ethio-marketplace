STOP — p2-fold-c2a step 1: the census (c2a's file list, the store's home and shape, M-3c-a's doors)
DONE: c2a step 1 (this census; nothing else changed)
LEFT: c2a — M-3c-a (after the ruling) → migration stop; then the store and the fold, the strings, W1, CF-LEVEL-1, the tests, THE CHECKS, budgets, the self-review, the report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `5bd54705db6c54e6f158ce9585479e158efc657b` (short `5bd5470`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-08T04:21:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42444923983
FILES:
docs/governance/reports/p2-fold-c2a.stop-1.md

## 0. Orientation

- `git rev-parse --short=9 HEAD origin/cursor/p2-fold`: both `5bd54705d` (equal). `origin/dev`:
  `af50ca802` at the start and again at this stop (unmoved since c1's base).
- CI, two-step: the branch head 5bd5470 is the commit `ci-status.md` reports, SUCCESS (run
  42444923983); `guards-last-failure.md` names 5bd5470, "No failed build/guard jobs";
  `e2e-last-failure.md`: "last E2E run 42444923983 passed". Dev's head af50ca802: `gh run list
  --branch dev --workflow CI` → run 42360042346, completed success. No red.
- **Departure, named:** I first read the three evidence files with `curl` at the raw addresses
  the carrier names; rule 50 forbids `curl`, and rule 40's equivalent is `git show
  origin/ci-evidence:…`. I read them again that way; the content is the same. Nothing else was
  fetched.
- Line numbers below are at 5bd54705d. SQL was read by each function's LAST declaration
  (`lastDeclarations()` of scripts/conformance/plan-seam.ts, run from a scratch script outside the
  repository); src/, scripts/ and e2e/ by `rg` on the definitions.

## (a) c2a's file list

### (a1) The eleven `tier:` lines of CF-LEVEL-1's allowlist

| # | File:lines | What | Tests beside |
|---|---|---|---|
| 1 | src/features/feed/ranking.ts:5 | `ListingTier = "premium" \| "featured" \| "regular"` | none |
| 2 | src/components/marketplace/card-tier.ts:1, 13, 32, 69–88, 136–164, 167, 173–182 | `PaidTier`; `cardLookOf(tier)` by the word; `adPageLookOf`; `CARD_TIERS`; `tierOf` | card-tier.test.ts (CTR-1…5) |
| 3 | src/components/marketplace/tier-flag.tsx:6, 37–39, 46–51, 101, 126 | `useTierName`: `tier === "premium" ? t("tier.premium") : t("tier.featured")` | tier-flag.test.tsx (TFL-1…6; :30, :81, :106, :120 assert `tier.premium` through a fake `t`) |
| 4 | src/features/feed/feed-page.ts:5, 52, 87, **113**, 145 | `TIERS`; `!TIERS.includes(v.tier)` → `return null` (INC-1079); the cast | feed-page.test.ts (**FP-3 :120 "refuses a card with a wrong tier"** — its meaning reverses: a fourth key keeps its card) |
| 5 | src/features/admin-listings/use-admin-listings.ts:16 | `LISTING_TIERS` (the filter's options); :78 sends `p_tier` | none |
| 6 | src/features/admin-listings/tier-reasons.ts:19–20, 25–29, 39–41, **51** (INC-1077), 71–72, 78, 86–88 | `TIERS`, `TIER_LABEL`, `isTierValue`, `BASELINE_TIER`, `tierProblem`, `tierErrorKey` | tier-reasons.test.ts |
| 7 | src/features/admin-listings/listing-page.tsx:24, 42, 176–188, 280, 391, 469, 525, 558, 736 | `tierOf`, `TIER_LABEL`, local `tierLabel`, the dialog's notice, the Tier label | none |
| 8 | src/features/admin-listings/listings-page.tsx:53, 219–220, 263, 370, 576, 780, 788 | local `tierLabel` (`t(\`tier.${value}\`)`), the filter, the chip | none |
| 9 | src/routes/dev.style.tsx:145–179, 227, 264–280 | fixture cards by word (`style-card-${tier}-${mode}` test ids); the DEC-314 dark-card board (:264–280) names `"premium"` / `"featured"` beside the tier token classes | e2e dark-cards.spec.ts, sage-tiers.spec.ts |
| 10 | scripts/feed-bench.ts:464, 470 | seeds 1 % premium, 4 % featured, the rest regular, by word | scripts/feed-bench.test.ts |
| 11 | e2e/helpers/ad-page.ts:122 | `tier: "regular"` on every seeded ad | every spec importing it |

### (a2) The six more sites the plan lists

| File:lines | Turn |
|---|---|
| src/features/admin-listings/history.ts:25, 45, 66 (`admin.listings.filter.tier`), 87 | c2a (history.test.ts) |
| src/features/admin-screening/use-screening.ts:13–14, 40, 69, 132, 175 (`.eq("tier", …)`) | c2a (use-screening.test.ts) |
| src/features/admin-screening/screening-page.tsx:37–40, 140, 421, 578, 581, 586, 846 | c2a (no test beside) |
| src/components/app-shell.tsx:754 | not a level (the session tier); excluded, as stop 1 said |
| SQL `admin_list_listings` 20261105080110:76 (`p_tier NOT IN ('premium','featured','regular')`) | c2b (M-3c-b) |
| SQL column default `listings.tier` | done in c1 (M-3a, `baseline_level_key()`) |

### (a3) Census hits the plan did not list (STOP: each needs the ruling's approval to join c2a)

They read the type or the look through card-tier.ts (not a literal word, so CF-LEVEL-1 never
named them), and the fold changes their type or their source.

| File:lines | Why it is reached | Tests beside |
|---|---|---|
| src/features/admin-listings/tier-dialog.tsx:12, 59, 68, 74, 146 | `TIERS` / `TIER_LABEL` options; three retired keys | tier-dialog.test.tsx (:54, :137 assert retired keys) |
| src/features/admin-listings/change-listing-tier.ts:5, 36 | runs `tierErrorKey` | change-listing-tier.test.ts (:72 asserts `admin.listings.tier.error.removed`) |
| src/components/marketplace/listing-card.tsx:12–13, 109, 133, 176, 190 | `cardLookOf(listing.tier)`, `TierFlag`, `data-tier` | listing-card.test.tsx (:144 `` `tier.${tier}` ``) |
| src/routes/l.$slug.tsx:22–23, 224, 249, 257, 267 | the ad page: `cardLookOf(view.tier).paid`, `adPageLookOf` | (route) |
| src/features/ad-page/public-listing.ts:7, 31, 113 | `tierOf(doc.tier)` — where the ad's `level` object is read | public-listing.test.ts |
| src/features/posting/preview/listing-detail.tsx:53–54, 198, 317, 668 | `ListingTier` prop, `adPageLookOf(view.tier)` | listing-detail.test.tsx, listing-detail-tier.test.tsx |
| src/features/posting/use-draft.ts:6, 147, 173, 672 · use-edit-draft.ts:2–3, 188, 230, 278 · posting-service.ts:5–6, 272, 450 · step-review.tsx:24, 165 | `ListingTier` / `tierOf` on the owner's preview | use-draft.test.tsx, use-edit-draft.test.ts, posting-service.test.ts, step-review.test.tsx |
| views passing the key: my-listing-page.tsx:680, wizard.tsx:1685, screening-page.tsx:846, listing-page.tsx:558 | the type follows (CF-TIER-4 keeps them carrying it) | — |
| **src/routes/api/feed.ts:~100–106** and **src/routes/api/seller.ts:~80–84** | each rebuilds its body from named keys (`cards`, `ladder`, `steps`, `next` / `seller`, `cards`, `next`): a door's `levels` is dropped unless the route passes it | feed.test.ts, seller.test.ts |
| src/server/first-screen.ts:235 (`parseFeedPage`) · src/features/feed/use-feed.ts · src/features/seller/use-seller-feed.ts · src/features/ad-page/similar.ts | the server's first page and the browser's reads carry the dictionary; the browser seeds the store | first-screen.test.ts, use-feed.test.ts, use-seller-feed.test.ts, similar.test.ts, seller-page.test.tsx |
| src/features/ad-page/save.ts:65–86 | the saved page's cards from `my_saved_listings` (question Q2); `:86 data.cards as unknown as SavedCard[]` (a TypeScript-law bypass, pre-existing) | save.test.ts |
| src/features/posting/refusal-text.ts:47 · src/features/posting/step-where.tsx:1729 | the two strings that move: `coverageExceedsPlan` → `post.refusal.coverageExceedsReach`; `post.where.planCaption` → `post.where.reachCaption` | refusal-text.test.ts, step-where.test.tsx |
| src/server/ad-page.ts:41 | `data as unknown as PublicListingDoc` (pre-existing); the doc passes through, so no change unless the parse moves here | ad-page.test.ts |

### (a4) card-tier.ts and CF-TIER-1…4

- The look today is keyed by the word: premium → gold (`bg-tier-premium`, flag 64 units, two
  stars), featured → sage (flag 44, one star), regular → plain. The level rows say premium = `top`
  + badge, featured = `boost` + badge, regular = `standard` (20261103040805:79, :512–513). The fold
  keys it by `placement` (top → gold, boost → sage, standard → plain) and draws the flag only when
  `badge` (question Q4 for the two combinations no row holds today).
- scripts/conformance/card-tiers.test.ts: `TIER_CLASS` :43–44 and `FLAG_REF` :46 read token names
  (`tier-premium`, `tier-featured`), which stay. `TIER_COMPARE` :47–48 catches `tier === "premium"`
  in screen files; it must also catch `placement === "top" | "boost"` outside card-tier.ts. CF-TIER-2's
  planted files :163–224 keep every line red, and gain a placement comparison. CF-TIER-3 :281–318
  (CARD_PAGES, the flag's marker) is unchanged. CF-TIER-4 :226–279 (every `ListingDetail` /
  `PreviewSheet` view carries `tier`) is unchanged; the prop's type becomes `string`. Allowlist
  card-tiers-allowlist.txt:2 (`src/routes/dev.style.tsx (4)`, DEC-314) stays, with its count
  re-read.

### (a5) The admin console's level readers

tier-reasons.ts, use-admin-listings.ts, listings-page.tsx, listing-page.tsx, screening-page.tsx,
use-screening.ts, history.ts, tier-dialog.tsx, change-listing-tier.ts (lines above). One dependency:
the roster filter sends `p_tier` to `admin_list_listings`, which refuses any key outside the three
words until c2b (20261105080110:76). Options read from the rows list those three keys today, so
nothing differs until staff add a fourth level; c2b closes it.

### (a6) The seeders

- e2e/helpers/ad-page.ts:122: drop `tier` from the insert; since c1 the column defaults to
  `baseline_level_key()`. No read is needed.
- src/routes/dev.style.tsx: a fixture page, no database. The fixture cards carry fixture level rows
  (keys, placements, badges, names) built in the file, and are drawn through the same `levelLook`.
  The DEC-314 board (:264–280) keeps its three candidate sets under neutral ids (question Q6).
- scripts/feed-bench.ts:464/470: it seeds three levels by word to spread the ranks (the bench times
  `tier_rank` ordering). "Seed by `baseline_level_key()`" alone would seed every ad at the baseline
  and stop measuring the mixed order (question Q7).

## (b) The store: home and shape (proposal)

**Home:** `src/features/levels/levels-store.ts`, one module, beside the pattern it copies
(src/features/categories/category-tree.ts:484 `useCategoryTree`: module cache, `subscribe`,
`useSyncExternalStore`, a seed). Searched: `rg "levels-store|level-rows|useLevelRows|useLevels\b|levelLook"`
over src, scripts and e2e → 0 hits; no `src/features/levels/` exists.

**Shape:**

```ts
export interface LevelRow {
    key: string; sort: number; placement: string; badge: boolean;
    nameEn: string; nameAm: string | null; isBaseline: boolean;
}
export function parseLevelRows(value: unknown): LevelRow[] | null; // the answer's `levels`, the table read
export function levelOf(rows: readonly LevelRow[], key: string): LevelRow | null; // unknown → the baseline row (INC-1079)
export function levelName(row: LevelRow, language: string): string;  // catalogText(row.nameEn, row.nameAm, language)
export function seedLevelRows(rows: readonly LevelRow[]): void;      // browser only, equality-guarded
export function useLevelRows(): { rows: readonly LevelRow[]; isLoading: boolean; error: ReaderError | null };
```

`card-tier.ts`'s `cardLookOf` / `adPageLookOf` take `{ placement, badge }` (from `levelOf`), never
a word.

- **First paint:** the server draws each card from the dictionary inside the answer it already
  holds. `FeedPage` gains `levels`, and `ListingCard` gets its row from that page's dictionary;
  no store and no extra request. Nothing writes module state during SSR, so one request's rows
  never reach another's.
- **Seeding:** in the browser, from the answer that arrived with the page: use-feed (feed_page,
  including the server's held first page), use-seller-feed (seller_feed_page), and the saved page
  (Q2).
- **Fetch:** only on a screen with no card answer: the admin console, screening, the owner's
  previews, the Promote sheet. One read of `listing_packages` (`key, sort, placement, badge,
  name_en, name_am, is_baseline`, `kind = 'level'`) through `getSupabase()`
  (src/lib/supabase-door.ts, which keeps the client off the first download), keyset-paged by
  `readAllPages`, once per page life. RLS answers enabled rows to browser roles and every row to
  staff with `packages:view`. The file joins `LEVEL_READER_HOMES`. A failed read is a typed
  `ReaderError` shown as the screen's error state, never an empty list.
- **Unknown key (INC-1079):** `levelOf` answers the baseline row, so the card keeps its place and
  takes the baseline look; a unit test proves a fourth key keeps its card. If the dictionary holds
  no baseline row, the look is the plain (`standard`, no badge) look (question Q3).

## (c) M-3c-a — the doors

| Door | Last declaration | Body | md5 (prosrc, CR-normalised) | Form |
|---|---|---|---|---|
| `feed_page(uuid,uuid,jsonb,integer)` | 20261019223222:15 (body :24) | 6 953 chars | `ad16deaaf6758ede753be92f0a110ded` | under 10 KB: whole text, behind a pre-check of the live md5 |
| `seller_feed_page(text,jsonb,integer)` | 20261029091909:8 (body :13) | 5 323 chars | `c39aaa046d09bd3d98d9f6f5c3fe21db` | whole text (see below) |
| `public_listing_json(listings,uuid)` | 20261029090431:29 (body :34) | 12 514 chars | `0cde7e7441adfd35187f8b411af26f78` | computed insertion (over 10 KB) |
| `my_saved_listings(jsonb,integer)` (Q2) | 20261019223222:324 (body :329) | 4 315 chars | `b29406f48a22951c93d67e1e8b32e41d` | whole text, if ruled in |

- **How the md5s were read:** I have no database connection and no Supabase MCP server. Each md5
  was computed by script from its last declaration's text, by c1's method. The method was checked
  on `validate_listing_draft`: it answered `6fdcdbc38cac35a964253bf7a2098b74`, the value c1's
  pre-check proved live. Each file's pre-check proves its md5 against live at the supervisor's
  apply (G39). After the three files the GO names, no later migration redeclares these doors,
  inside a DO block or out (`rg` over every later file naming them). Their only caller of
  `public_listing_json` is `public_listing` (20261019223105:203).
- **Why `seller_feed_page` is written whole and not by computed insertion:**
  scripts/conformance/seller-names.test.ts `latestBodies` (:24–33) takes a `format('CREATE …')`
  template for the latest body (INC-1083). Its allowlist line seller-names-allowlist.txt:18
  (`seller_feed_page`) would then go stale, and the guard would fail. Rule 30 needs computed
  insertion only above about 10 KB, so whole text keeps the guard reading the real body.
  `public_listing_json` reads names only through the helpers, so that guard does not read it.
- **Additive keys** (the app ignores them until the fold):
  - `feed_page` and `seller_feed_page` gain one top-level `levels` array, beside `cards` …
    `next`: every enabled level row in `(sort, key)` order, `{key, sort, placement, badge,
    name_en, name_am, is_baseline}`.
  - `public_listing_json` gains `level`: the ad's row, the same seven fields.
  - Cursors, cards and every other key stay unchanged.
  - Size: about 395 bytes raw per feed answer on three rows (223 gzipped alone), and 136 bytes for
    one `level` object. The sort values in this estimate are illustrative.
- **Proofs** (one DO block per file, scratch rows under the sentinel): headers and grants restated
  and read back; md5 with the fragments put back = the md5 above (nothing else changed); scratch
  `e2e-` level rows (one disabled) → the `levels` array equals `SELECT … FROM listing_packages
  WHERE kind='level' AND enabled ORDER BY sort, key`, compared whole; a scratch ad on a scratch
  level → `public_listing(…)->'level'` equals its row; a scratch language from one draw (INC-1082).
  File header `-- e2e-areas: feed, ad-page, account`.
- No manifest or public-surface line changes (header, arguments and grants unchanged).

**First downloads at the base** (`bun install --frozen-lockfile`: "no changes"; `bun run build &&
node scripts/check-bundle-size.mjs`: "Bundle budget OK.", "Tier flag: card pages only (CF-TIER-3) —
ok"). Every reading equals stop 1's at af50ca802.

| Page | KiB gzip / ceiling |
|---|---|
| entry JS | 212.0 / 215 (CSS 23.1 / 40) |
| `/` | 232.1 / 235 |
| `/c/$slug` | 232.1 / 235 |
| `/$name` | 230.1 / 233 |
| `/account_/saved` | 230.1 / 233 |
| `/l/$slug` | 262.0 / 265 |
| `/dev/style` | 253.1 / 256 |
| `/admin/listings` | 349.5 / 351 |
| `/admin/listings_/$listingId` | 351.1 / 353 |
| `/admin/screening` | 370.6 / 373 |
| `/my-listings` | 320.7 / 322 |
| `/my-listings_/$listingId` | 327.7 / 329 |
| `/post`, `/post_/$listingId` | 405.9 / 408 |
| `/my-listings_/$listingId_/edit` | 406.0 / 408 |
| `/admin/listings_/$listingId_/edit` | 411.4 / 414 |

## (d) The tests reached

- **Unit** (each whole): card-tier.test.ts, tier-flag.test.tsx, listing-card.test.tsx,
  feed-page.test.ts (FP-3 reversed; a fourth key), tier-reasons.test.ts, tier-dialog.test.tsx,
  change-listing-tier.test.ts, history.test.ts, use-screening.test.ts, feed.test.ts,
  seller.test.ts, first-screen.test.ts, use-feed.test.ts, use-seller-feed.test.ts,
  seller-page.test.tsx, similar.test.ts, save.test.ts, public-listing.test.ts, ad-page.test.ts,
  listing-detail.test.tsx, listing-detail-tier.test.tsx, posting-service.test.ts,
  use-edit-draft.test.ts, use-draft.test.tsx, step-review.test.tsx, refusal-text.test.ts,
  step-where.test.tsx, promote-sheet.test.tsx (W1, PMS-*), scripts/feed-bench.test.ts; the new
  store's test; the laws: listing-levels.test.ts (CFL-1…3), card-tiers.test.ts (CF-TIER-1…4,
  CTR-6/7), strings-layers, am-script, wired.test.ts.
- **e2e**:
  - The specs the carrier names: sage-tiers.spec.ts (:45, :486, :592 retired keys),
    feed-screens.spec.ts, admin-listings.spec.ts (ATR-2/3/5/6/7), admin-screening.spec.ts
    (SC-27 :1502, :1520–1528).
  - Census hits beyond them, each whole:
    - admin-listings.spec.ts **ATR-1** (:2320; :2333 and :2341 assert `admin.listings.tier.done`,
      `tier.premium` and `admin.listings.filter.tier`);
    - my-listings-promote.spec.ts (:142–144, :449, :493 retired keys; W1's e2e);
    - sage-ad-page.spec.ts (SAP-3 :332, the ad page's look);
    - dark-cards.spec.ts (dev.style);
    - the importers of e2e/helpers/ad-page.ts.
  - Seeds by key that stay valid as keys (Q1 of the plan's ruling): feed-route, feed-index,
    one-line-slots, my-listings-doors (:1201 asserts the SQL reason name `coverageExceedsPlan`,
    which stays).
  - No e2e asserts the exact key set of a feed, seller or ad answer
    (`rg "Object.keys(" e2e src`).

## (e) The strings

- docs/governance/briefs/p2-fold-strings.json: sha256 `db0024573b36d83af488bc64194424ccef812d34e5b471c54d25e9857836946e`
  (= ruling 1's). 26 keys: **member 14** (en-member / am-member), **admin 11** (en-admin /
  am-admin), **base 1** (`post.refusal.coverageExceedsReach`, en-base / am-base). None exists
  today in any of the eight locale files.
- Retired keys' callers at this base (beyond the tests above):
  - `tier.premium` / `tier.featured`: tier-flag.tsx:39, tier-reasons.ts:26–27, listings-page.tsx:220.
  - `admin.listings.tier.regular`: listings-page.tsx:220, listing-page.tsx:181, tier-reasons.ts:28.
  - `admin.listings.filter.tier`: screening-page.tsx:578, history.ts:66, listings-page.tsx:780,
    tier-dialog.tsx:68, listing-page.tsx:736.
  - `.action.tier`: tier-dialog.tsx:146, listing-page.tsx:525, listings-page.tsx:263.
  - `.tier.title`: tier-dialog.tsx:59.
  - `.tier.done`: listings-page.tsx:370, listing-page.tsx:391.
  - `.tier.error.same|removed|unknown`: tier-reasons.ts:71–72, 86–88.
  - `post.refusal.coverageExceedsPlan`: refusal-text.ts:47.
  - `post.where.planCaption`: step-where.tsx:1729.
  - `post.where.planFull`: no caller.
  - **The caps block's 53 keys** (`admin.coverage.*` 50, `admin.monetisation.caps.edit/title/untilP2`)
    **and the 12 `admin.monetisation.caps.guide.*`** are still called by caps-editor.tsx,
    caps-forms.ts, caps-section.tsx, monetisation-service.ts, monetisation-order.ts,
    monetisation-dialogs.tsx, level-overrides-table.tsx, override-dialog.tsx, product-editor.tsx
    and e2e/admin-monetisation.spec.ts. The caps block retires in c2b, so they cannot leave in c2a
    (question Q8).
- The two guide sentences: en-guide.ts:324–325 (`…the ad's tier when it has one…`) and :328–329
  (`…date and tier… Set tier…`) get their EN edits; am-guide.ts:286, :290 are unchanged (they say
  ደረጃ and «ደረጃ አስቀምጥ», as the supervisor verified).
- The c3 keys (`myListings.promote.reach.*`, `.error.*Reach`) and the c2b keys
  (`admin.monetisation.reach.field.*`) would land without a caller. No guard refuses a key without
  a caller (`post.where.planFull` lives so today).

## (f) Premises the tree proves wrong, and conflicts

1. **Four card answers carry `tier`, not three.** `my_saved_listings` (20261019223222:324, emitting
   `'tier'` at :413) feeds `/account_/saved`, a card page (CARD_PAGES). Without it, that page's
   cards need the store's fetch (Q2).
2. **"DEC-331 replaces the 2027-03-31 date in the test's text":** the date is on the allowlist's
   eleven `tier:` lines, not in listing-levels.test.ts or listing-levels.ts. It leaves with those
   lines; the guard's text names DEC-331 instead. The allowlist also holds two `reader:` lines
   (e2e/helpers/listing-seed.ts, DEC-342; e2e/helpers/level-overrides.ts, DEC-351), legitimate
   harness readers (Q5).
3. **"The three doors … by your computed-insertion form":** applied to `seller_feed_page`, it turns
   the seller-names guard red (INC-1083; (c) above). I propose whole text for the three bodies under
   10 KB.
4. **The routes drop new keys:** `/api/feed` and `/api/seller` rebuild their bodies, so the
   additive `levels` reaches no client until those two routes pass it; they join c2a ((a3)).
5. **The plan's list is short by (a3):**
   - ten src files read the type, the look or the tier verbs' mapper;
   - eight carry or seed the card answers;
   - two move a string.

   ATR-1, my-listings-promote, sage-ad-page and dark-cards are reached beyond the named specs.
6. **A level's look can be overridden per category and market** (`level_overrides.placement`,
   `badge`, read by `level_perks_for`). The answers as ruled carry the row's base placement/badge,
   so a category override would not change the card's look (Q4).

## (g) K2 for c2b (touched by none of c2a)

- the caps block: src/features/admin-monetisation/monetisation-service.ts:107
  (`.from("coverage_plans")`), caps-editor.tsx, caps-forms.ts, caps-section.tsx,
  monetisation-order.ts:113 (the `caps` step), e2e/admin-monetisation.spec.ts:290, :348, :531,
  e2e/helpers/pool-reset-map.ts:54;
- the edit reader's caps (INC-1080): use-edit-draft.ts's source;
- step 6's NULL cap (INC-1084): src/features/posting/step-where.tsx:134–137, 1350–1352, 1700 read
  NULL as "plan not known";
- posting-service.ts:803–807's stale "through `seller_plan()`" comment, and the schema's `plan`
  key now carrying the reach key;
- the plan-seam reader's move (scripts/conformance/plan-seam.ts:54–147) and CF-PLAN-1's retirement;
- the product editor's reach caps;
- `admin_list_listings` 20261105080110:76 and the rest of M-3c-b.

## QUESTIONS for the ruling

- **Q1 — the file list:** (a1) + (a2)'s three src files + (a3) approved?
- **Q2 — `my_saved_listings`:** a fourth door in M-3c-a (`levels` beside `cards`, whole text,
  4.3 KB), or the saved page reads the store's fetch?
- **Q3 — no baseline row in the dictionary:** the plain look, as proposed? And the ad page's
  `level` object: drawn directly and NOT seeded into the store (one row is never the whole store)?
- **Q4 — the look's two combinations no row holds today:** `badge` on `standard` (which flag?),
  and `top`/`boost` without badge (the tinted card with no flag, as proposed?); and whether a
  category override's placement/badge should reach the card (the answer would then carry
  `level_perks_for`'s placement and badge per card, not the base row's).
- **Q5 — CF-LEVEL-1 "empties":** the eleven `tier:` lines only (the two `reader:` lines stay with
  their DEC), or the harness readers move too?
- **Q6 — dev.style's DEC-314 board (:264–280):** keep the three candidates under neutral ids
  (`gold` / `sage`), keeping the card-tiers allowlist line, as proposed?
- **Q7 — feed-bench:** read the bench database's level rows (service client) and spread its seeds
  over them by `sort` (the file then joins `LEVEL_READER_HOMES` or takes a `reader:` line), or seed
  every ad at the baseline (no mixed order measured)?
- **Q8 — the retired keys in c2a:** the tier keys and the two plan keys
  (`coverageExceedsPlan`, `planCaption`, plus `planFull`) leave in c2a; the caps block's 65 keys
  leave in c2b with their callers?
- **Q9 — the store's home:** `src/features/levels/levels-store.ts`, as proposed?
