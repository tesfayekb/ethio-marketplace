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

## What it does not do yet

E2 makes the write doors (publish, edit, transitions, the expiry sweep, place changes) call the refresh and adds the tree-change re-index job, the read door `feed_page` and `/api/feed`. Until then the index is not kept current by the doors, and nothing reads it.

## Migration

The E1 migration under supabase/migrations/ (the database tool names it) with its self-mark; the mark is recorded in docs/\_changelog.md for this turn.

Tests: e2e/feed-index.spec.ts (FE-1..FE-5), area `feed` in scripts/e2e-select.ts.
