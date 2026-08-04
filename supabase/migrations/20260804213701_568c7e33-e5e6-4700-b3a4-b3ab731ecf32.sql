-- P2-c-tier: listing tier (LIVE in v1).
-- tier is a real, live feature: admin -> 'premium' (promotional lever),
-- user self-serve -> 'featured'; both free in v1, paid tiers are a future change.
-- Idempotent per the project standing rule: re-running this migration is a no-op.
-- No backfill required: the NOT NULL DEFAULT 'regular' covers every pre-existing row.

ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS tier text NOT NULL DEFAULT 'regular';

DO $$
BEGIN
  ALTER TABLE public.listings
    ADD CONSTRAINT listings_tier_check
    CHECK (tier IN ('premium', 'featured', 'regular'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

COMMENT ON COLUMN public.listings.tier IS
  'Feed ranking tier. LIVE in v1: premium (admin-granted promo), featured (user self-serve), regular (default). Both non-regular tiers are free in v1; paid tiers are a future change.';

-- Composite index serving the v1 feed ordering exactly:
--   WHERE status = 'active' ORDER BY tier_rank ASC, view_count ASC, published_at DESC
-- view_count does not exist yet (separate pre-launch view-tracking feature), so the
-- index covers the two columns that are real today. A bare (tier) index would not help
-- the ORDER BY tail; this one lets the active-feed scan come out pre-sorted.
CREATE INDEX IF NOT EXISTS listings_feed_order_idx
  ON public.listings (tier, published_at DESC)
  WHERE status = 'active';
