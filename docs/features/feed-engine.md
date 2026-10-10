# Feed engine

Spec: docs/governance/feed-engine-spec.md (approved 2026-10-08, D101). Brief: docs/governance/briefs/bundle-10.md.

## What E1 built

- **`public.feed_index`** — one row per (category key, place key) of each active listing that has a publish time. Primary key, in read order: `(category_key, place_key, tier_rank, published_at, listing_id)`; a second index on `listing_id` serves the refresh and the cascade delete. `listing_id` references `listings(id) ON DELETE CASCADE`. The table holds no personal data.
- **The nil-uuid keys** — `00000000-0000-0000-0000-000000000000` is an explicit key: as `category_key` it means "all categories", as `place_key` "everywhere". It is never a default for a missing value.
- **`feed_keys(category, places[])`** (STABLE, SECURITY INVOKER) — the category, every parent along every pointer (guests included), plus the all-categories key; crossed with each place, every parent up to the country, plus the everywhere key. No category gives no rows.
- **`feed_index_refresh(listing)`** (VOLATILE, SECURITY DEFINER) — locks the listing row, deletes its rows and rewrites them from the main place and its `listing_locations`; returns the row count (0 for a missing, inactive or unpublished listing).
- **`feed_index_check(listing default null)`** (STABLE, SECURITY DEFINER) — counts only: `active_listings`, `active_without_published_at`, `active_without_rows`, `rows_for_inactive`, `listings_with_wrong_rows`; for one listing or the whole catalogue.
- **Who may call them** — the table and all three functions are closed to PUBLIC, `anon` and `authenticated` (RLS on with one closing policy); `service_role` only.
- **The backfill and its check** — the migration locks `listings`, `listing_locations`, `category_tree_pointers` and `locations` in SHARE mode, refreshes every active listing, and fails the migration unless the whole-catalogue check reports zero missing, zero inactive and zero wrong rows.

## What E2a built

- **The rank** — `feed_tier_rank(tier)` (IMMUTABLE): premium 2, featured 1, regular 0; an unknown tier raises. A higher rank is read first; newest first inside a rank (D108). `feed_index_refresh` and `feed_index_check` are redeclared whole with the rank taken from the listing's tier.
- **The five refresh triggers** — statement-level, in the writer's own transaction, one refresh per listing per statement: `feed_index_on_listing_insert` / `_update` on `listings` (an update refreshes only when status, publish time, category, main place or tier changed and the row was or becomes active), and `feed_index_on_place_insert` / `_delete` / `_update` on `listing_locations` (active listings only). They run as their owner, so a write by any role keeps the index right.
- **The queue and the sweep** — `feed_reindex_queue` (one row per listing) is filled by `feed_reindex_enqueue_categories` and `feed_reindex_enqueue_places`, called by four triggers: a tree pointer inserted, deleted or updated, and a place's parent moved. `feed_reindex_wake()` starts the job `feed-reindex-drain` (every minute) when listings are queued; each run of `feed_reindex_sweep(limit 500)` refreshes up to 500 queued listings, writes one heartbeat row in `feed_reindex_runs` (kept 14 days) and unschedules the job when the queue is empty. An advisory lock orders a wake against the drain's last look, so a queued listing always has a drain; the daily check wakes it again if rows remain.
- **The daily check** — `feed_index_check_sweep()` writes the whole-catalogue counts plus the queue length to `feed_index_check_runs` and returns them.
- **The schedules** — `feed-index-check` daily at 03:53 UTC; `feed-reindex-drain` only while the queue holds listings.
- **Who may call them** — the three new tables are closed to the browser roles (RLS on, one closing policy, ALL to `service_role`); every new function is revoked from PUBLIC, `anon` and `authenticated`.
- **The rewrite** — the migration rewrites every active listing's rows with its tier and checks one state under brief SHARE locks.

## What E2b built

- **`feed_page(category, place, after, size)`** (STABLE, SECURITY DEFINER, reads `feed_index` as its owner) — one page of cards for a category (null = all categories) in a place (null = everywhere). Order (D108): premium, then featured, then regular; newest first inside each.
- **The ladder** — the chosen place, each parent up to its country, then everywhere. The page reads from the chosen place outward and stops at the first step that holds 8 or more listings; each listing appears once, under the narrowest step that holds it. The answer carries `ladder`, `steps` (step, placeId, shown) and each card's `step`.
- **The cursor** — `next` is the step and the last card's (tier rank, publish time, id); the next page continues after it, so a deep page costs what the first costs. `size` is 1 to 50 (20 by default).
- **Refusals** — `feed_page: badSize`, `unknownCategory` (missing or inactive), `unknownPlace` (missing or inactive), `badCursor`.
- **Who may call it** — `anon`, `authenticated` and `service_role` (named in scripts/public-surface-allowlist.txt); `feed_index` stays closed to the browser roles. A card carries the listing card's fields only, no seller.
- **`GET /api/feed`** — parameters `category`, `place` (uuids), `size` (1–50) and `after` (base64url of the cursor JSON). Answers: 200 `{ cards, ladder, steps, next }` with `Cache-Control: public, max-age=60, stale-while-revalidate=300`; 400 `badCategory`, `badPlace`, `badSize`, `badCursor`; 404 `unknownCategory`, `unknownPlace`; 502 for any other failure (logged as `[ssr-error]`). Every error is `no-store`. Anon client, no session, no in-process cache.
- **Slow-call warning** — a `feed_page` call over 5 s logs one `[slow-rpc] feed_page <ms>` line; an answer with no error whose `cards`, `ladder` or `steps` is not an array is a 502 (E3a.6, F4).

## What E3b built

- **The pages and the hook** — "/" and every "/c/<slug>" read `/api/feed` through `useFeed({ categoryId, placeId, enabled })` (src/features/feed/use-feed.ts), 20 cards a page, for the last place of the location row (none = everywhere). The browser never reads `listings` and never sorts; a non-200, a thrown fetch or a body `parseFeedPage` refuses is an error, never an empty page (F4).
- **The sections and their labels** — `feedSections` (src/features/feed/feed-page.ts) groups consecutive cards by ladder step. Step 1 has no label: the h1 reads `feed.headingIn` ("Listings in {place}") over the chosen place's own listings. Every wider place lies inside the chosen place's own country, so the wider places share ONE heading, `feed.heading` naming the chosen place ("Listings near {place}"), on the first of them; everywhere is `nav.allListings`; with no place chosen the h1 is "Listings near you" (D125, the operator, 2026-10-10; INC-534: "Listings near Ethiopia" had stood over listings inside Ethiopia). Tests: FS-3, FS-4, FS-11, FS-13; FP-5, FP-10. With nothing in the chosen place, the invitation leads (D119, below); `feed-step-none` says so only when no invitation can be drawn.
- **Paging** — `feed-more` (44 px) is watched by an IntersectionObserver (rootMargin 0px); the next page loads only when it comes into view. A failed next page keeps the cards and offers Retry.
- **Not found** — the slug resolves through the whole tree (`categoryLookup`, INC-504); an unknown slug shows `feed-category-unknown` and asks the feed nothing; a failed tree read shows `feed-category-failed`. A top category shows its whole branch (INC-503).
- **The breadcrumbs** — the whole category path (`pathOf`), earlier segments linking to their pages (`breadcrumb-category-parent`).
- **The card** — no views count (DEC-165): nothing tracks views.

## The speed judge (E3c)

- **`feed_bench(category, place, after, runs)`** (VOLATILE, SECURITY INVOKER, read-only) — calls `feed_page` `runs` times (1 to 200, else `feed_bench: badRuns`) at 20 cards a page and answers each call's milliseconds (measured inside the database), the last page's bytes and its cards. Executable by `service_role` only.
- **scripts/feed-bench.ts** — on ethio-staging only (it refuses any other project): seeds 100,500 scratch active listings (15 tops, 150 second-level, 9 third-level, 4 guests; 10 regions × 10 cities plus one empty city; 1 % premium, 3 % featured over 60 days; plus 500 in one leaf × one city), times six shapes (all/everywhere, top/country, leaf/city, top/empty city widening, page 50 by cursor, guest host/country) at 33 calls with 3 warm-ups, then removes every scratch row and the seller, and counts leftovers.
- **`--clean`** — `bun scripts/feed-bench.ts --clean` on ethio-staging only: counts every `e2e-bench-` row, removes those listings, categories with their pointers and places (cities first), counts again and prints one line `feed-bench --clean: found <n> scratch rows; left <n>`; no status file, no users touched; exit 0 only when none are left. Every id list the script sends is cut by chunkByLength (DEC-138), so no request carries a 1,000-id query string (INC-520).
- **Seeding** — listings are inserted 250 at a time; an insert that ends with a statement timeout waits 5 seconds and is tried again, at most 3 attempts in all; any other error fails at once. The reported seed time covers a failed seed too (INC-524).
- **The workflow** — .github/workflows/feed-bench.yml, weekly on Sunday at 05:10 UTC and on demand (each run writes and deletes about 1.3 million rows on the shared ethio-staging); it publishes docs/tracking/feed-bench-status.md to branch ci-evidence and is red on a miss or a failure.
- **The staging gate (DEC-168)** — before it writes anything the bench waits, up to 40 minutes, until no CI, Nightly E2E or Guard Proof run is queued or running (scripts/staging-gate.ts, read through the Actions API with the job's own token, `actions: read`); still busy → Verdict SKIPPED, with the runs named. While it seeds and measures it asks again at most every 15 seconds; when such a run has started it stops, cleans up and writes Verdict YIELDED. CI never waits. A SKIPPED or YIELDED run is red, and is dispatched again.
- **The targets (D101 §5)** — p95 ≤ 50 ms per shape (nearest rank of 30 calls), one page ≤ 30,720 bytes. Under DEC-166 a red run is a MISS: an incident, and the database design is revised before the next screen bundle.
- **Not measured here** — the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.

## D119 — the invite card (2026-10-09)

- **Who sees it** — the chosen place only (the last place of the location row; never the everywhere feed), while it holds fewer than 4 listings of the category on screen (`inviteShown`, `INVITE_BELOW = 4`, src/features/feed/feed-page.ts; on the home page every category counts). The widening threshold (8) is unchanged.
- **Where** — `feed-invite` (src/components/marketplace/invite-card.tsx) is the last item of the chosen place's row. When the place has none, it leads alone in section 1, before the wider places, and replaces the `feed-step-none` note. With nothing anywhere, the card leads alone in the same way (the operator's walk, 2026-10-09); the empty box (`feed-empty`) is shown only when no place is chosen.
- **The look** — gold (DEC-169, the gold token's third placement): a gold border and tint, a star in a gold circle, and the green Post listing button.
- **"Be the first" only where nobody has advertised (the operator, 2026-10-10)** — with some listings in the place the card reads `feed.invite.placeMore` ("Advertise in {place}.") or `feed.invite.placeCategoryMore` ("Advertise {category} in {place}.") — without "too" (the operator, 2026-10-10); `placeCount` (feed-page.ts) decides. Tests: FS-3, FS-8 (some listings), FS-4, FS-10 ("Be the first"), FP-9.
- **The words** — `feed.invite.place` on the home page ("Be the first to advertise in {place}.") and `feed.invite.placeCategory` on a category page ("Be the first to advertise {category} in {place}."); the Amharic is the operator's own. The button is `nav.postListing`.
- **The address** — `feed-invite-post` opens `/post?place=<id>`, with `category=<id>` as well on a category page (docs/features/posting.md, D119).
- **Tests** — FS-3 and FS-4 (changed), FS-8..FS-10; FP-8.
- **The grid (D123, 2026-10-10)** — three cards a row on a phone, four from 640 px, five from 1024 px; below 11rem the card is compact (smaller type and padding, a container query in listing-card.tsx); the invitation is one card among the others, the size of a card, compact below 11rem as well (the operator, 2026-10-10). Tests: FS-12, and shell.spec's grid test (3 / 4 / 5).

## What it does not do yet

- The rail's highlight and the subcategory menus (D98).
- The place kept on the account and the "different place" notice (D106, D107).

## Migration

The E1 migration under supabase/migrations/ (the database tool names it) with its self-mark; the mark is recorded in docs/\_changelog.md for this turn.

The E2a migration follows it with its own self-mark, recorded in docs/\_changelog.md.

The E2b migration follows with its own self-mark, recorded in docs/\_changelog.md.

Tests: scripts/feed-bench.test.ts (FB-1..FB-4), e2e/feed-index.spec.ts (FE-1..FE-14), e2e/feed-route.spec.ts (FR-1..FR-8), e2e/feed-screens.spec.ts (FS-1..FS-10), src/features/feed/feed-page.test.ts (FP-1..FP-8), area `feed` in scripts/e2e-select.ts.
