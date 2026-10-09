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

## What it does not do yet

E2b adds the read door `feed_page` and `/api/feed`; E3 the screens.

## Migration

The E1 migration under supabase/migrations/ (the database tool names it) with its self-mark; the mark is recorded in docs/\_changelog.md for this turn.

The E2a migration follows it with its own self-mark, recorded in docs/\_changelog.md.

Tests: e2e/feed-index.spec.ts (FE-1..FE-14), area `feed` in scripts/e2e-select.ts.
