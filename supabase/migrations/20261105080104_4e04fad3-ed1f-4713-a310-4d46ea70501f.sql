-- e2e-areas: my-listings, admin-listings, posting
-- P-2 (a) M-1c, part 1 of 7 — the sweep's schema (plan §3; rulings 9 H5/H6, 10).
-- Three additions, no function: the heartbeat row of listing-expiry-sweep gains the four counters
-- (level_ended, level_paused, reach_ended, reminded — DEC-332, heartbeat-only); listings gains
-- tier_reminded_for (the tier_until a level_ending notice was about: one notice per end, a new end
-- reminds again); seller_notices takes the sweep's two kinds (level_ending, level_paused) with no
-- reason — reason becomes nullable, kept for every staff kind and absent for a system kind
-- (CHECK ((kind LIKE 'admin\_%') = (reason IS NOT NULL))). Nothing is granted or opened: the three
-- tables keep their roles (the browser reads seller_notices through its own-row policy only).
-- Proofs: catalog facts (law 12) and the CHECKs' behaviour on scratch rows, rolled back by the sentinel.

DO $pre$
BEGIN
  IF to_regprocedure('public.resume_listing(uuid)') IS NULL
     OR NOT EXISTS (SELECT 1 FROM pg_attribute WHERE attrelid = 'public.listings'::regclass AND attname = 'tier_until' AND NOT attisdropped) THEN
    RAISE EXCEPTION 'P-2 M-1c part 1: M-1a and M-1b (71cb9d01 … 0ce62d98) must be applied first';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.seller_notices'::regclass AND conname = 'seller_notices_kind_check')
     OR NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.seller_notices'::regclass AND conname = 'seller_notices_reason_check') THEN
    RAISE EXCEPTION 'P-2 M-1c part 1: seller_notices'' kind or reason CHECK is not named as 20261011085637 / 20261012042142 named it';
  END IF;
END $pre$;

-- ------------------------------------------------------------ 1. THE HEARTBEAT'S COUNTERS
ALTER TABLE public.listing_expiry_sweep_runs
  ADD COLUMN level_ended  integer NOT NULL DEFAULT 0,
  ADD COLUMN level_paused integer NOT NULL DEFAULT 0,
  ADD COLUMN reach_ended  integer NOT NULL DEFAULT 0,
  ADD COLUMN reminded     integer NOT NULL DEFAULT 0;
COMMENT ON COLUMN public.listing_expiry_sweep_runs.level_ended IS
  'P-2 M-1c (DEC-332): ads whose level ended this run and fell to the baseline.';
COMMENT ON COLUMN public.listing_expiry_sweep_runs.level_paused IS
  'P-2 M-1c: of level_ended, the ads paused for want of a free baseline slot (D306).';
COMMENT ON COLUMN public.listing_expiry_sweep_runs.reach_ended IS
  'P-2 M-1c: ads whose reach ended this run (back to the market''s included reach, places trimmed — DEC-330).';
COMMENT ON COLUMN public.listing_expiry_sweep_runs.reminded IS
  'P-2 M-1c: level_ending notices written this run (one per end).';

-- ------------------------------------------------------------ 2. THE REMINDER'S MEMORY
ALTER TABLE public.listings ADD COLUMN tier_reminded_for timestamptz;
COMMENT ON COLUMN public.listings.tier_reminded_for IS
  'P-2 M-1c: the tier_until a level_ending notice was written for — the sweep reminds once per end (a new end reminds again); cleared when the level ends.';

-- ------------------------------------------------------------ 3. THE SWEEP'S NOTICES
ALTER TABLE public.seller_notices DROP CONSTRAINT seller_notices_kind_check;
ALTER TABLE public.seller_notices ADD CONSTRAINT seller_notices_kind_check
  CHECK (kind IN ('admin_edit','admin_remove','admin_restore','admin_send_back','level_ending','level_paused'));
ALTER TABLE public.seller_notices ALTER COLUMN reason DROP NOT NULL;
ALTER TABLE public.seller_notices DROP CONSTRAINT seller_notices_reason_check;
ALTER TABLE public.seller_notices ADD CONSTRAINT seller_notices_reason_check
  CHECK (reason IS NULL OR reason IN ('wrong_category','misleading','prohibited','duplicate','contact_in_text','photo','rules',
                                      'removed_in_error','appeal_accepted','other','undo'));
-- A staff kind keeps its reason; a system kind (the sweep's) has none.
ALTER TABLE public.seller_notices ADD CONSTRAINT seller_notices_reason_by_kind_check
  CHECK ((kind LIKE 'admin\_%') = (reason IS NOT NULL));
COMMENT ON COLUMN public.seller_notices.reason IS
  'A staff notice''s reason (required for every admin_* kind); NULL on the sweep''s system kinds (P-2 M-1c, D306).';

-- ------------------------------------------------------------ 4. PROOFS
-- (a) the columns and their defaults, the CHECKs by name (catalog facts, law 12) — no grant moved;
-- (b) the CHECKs' behaviour on scratch rows: a system kind without a reason is taken, with one refused;
--     a staff kind without a reason refused; an unknown kind refused. Rolled back by the sentinel.
DO $proof$
DECLARE
  v_seller uuid := gen_random_uuid();
  v_tag    text := 'e2e-mig-p2-m1c1-' || substr(gen_random_uuid()::text, 1, 8);
  v_code   char(2) := 'XZ';
  v_cat    uuid;
  v_ad     uuid;
  v_run    bigint;
  v_msg    text;
  v_case   text;
  v_state  text;
BEGIN
  -- (a)
  IF (SELECT count(*) FROM pg_attribute a
       WHERE a.attrelid = 'public.listing_expiry_sweep_runs'::regclass AND NOT a.attisdropped
         AND a.attname IN ('level_ended','level_paused','reach_ended','reminded')
         AND a.attnotnull AND a.atttypid = 'integer'::regtype) <> 4
     OR NOT EXISTS (SELECT 1 FROM pg_attribute a
                     WHERE a.attrelid = 'public.listings'::regclass AND a.attname = 'tier_reminded_for'
                       AND NOT a.attisdropped AND NOT a.attnotnull AND a.atttypid = 'timestamptz'::regtype)
     OR EXISTS (SELECT 1 FROM pg_attribute a
                 WHERE a.attrelid = 'public.seller_notices'::regclass AND a.attname = 'reason' AND a.attnotnull)
     OR (SELECT count(*) FROM pg_constraint c
          WHERE c.conrelid = 'public.seller_notices'::regclass AND c.contype = 'c'
            AND c.conname IN ('seller_notices_kind_check','seller_notices_reason_check','seller_notices_reason_by_kind_check')
            AND c.convalidated) <> 3 THEN
    RAISE EXCEPTION 'P-2 M-1c part 1 proof (a): a column, a default or a CHECK differs';
  END IF;
  IF has_table_privilege('anon', 'public.listing_expiry_sweep_runs', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_expiry_sweep_runs', 'SELECT')
     OR has_table_privilege('anon', 'public.seller_notices', 'SELECT')
     OR has_table_privilege('authenticated', 'public.seller_notices', 'INSERT')
     OR NOT has_table_privilege('authenticated', 'public.seller_notices', 'SELECT')
     OR NOT has_table_privilege('service_role', 'public.seller_notices', 'INSERT') THEN
    RAISE EXCEPTION 'P-2 M-1c part 1 proof (a): a grant moved';
  END IF;

  -- (b)
  BEGIN
    INSERT INTO public.listing_expiry_sweep_runs (expired) VALUES (0) RETURNING id INTO v_run;
    IF (SELECT level_ended + level_paused + reach_ended + reminded FROM public.listing_expiry_sweep_runs WHERE id = v_run) <> 0 THEN
      RAISE EXCEPTION 'P-2 M-1c part 1 proof (b): the counters do not default to 0';
    END IF;
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
      RAISE EXCEPTION 'P-2 M-1c part 1 proof: scratch code % already exists', v_code;
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_code, 'e2e-mig-p2-m1c1', true);
    INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role, created_at, updated_at)
    VALUES (v_seller, v_tag || '-seller@example.invalid', '{}'::jsonb, 'authenticated', 'authenticated', now(), now());
    INSERT INTO public.categories (name_en, slug, price_enabled, is_active, allow_listings, display_order)
    VALUES ('E2E P2 M1c1 Leaf', v_tag, true, true, true, 9999) RETURNING id INTO v_cat;
    INSERT INTO public.listings (seller_id, category_id, title, description, home_country_code)
    VALUES (v_seller, v_cat, 'E2E P2 M1c1 draft', 'scratch', v_code) RETURNING id INTO v_ad;
    -- Taken: the two system kinds without a reason; a staff kind with one.
    INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_seller, v_ad, 'level_ending');
    INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_seller, v_ad, 'level_paused');
    INSERT INTO public.seller_notices (seller_id, listing_id, kind, reason) VALUES (v_seller, v_ad, 'admin_edit', 'photo');
    IF (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_ad) <> 3
       OR (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_ad AND reason IS NULL AND fields = '{}'::text[]) <> 2 THEN
      RAISE EXCEPTION 'P-2 M-1c part 1 proof (b): the three notices were not written as sent';
    END IF;
    -- Refused, each by the CHECK: a system kind with a reason, a staff kind without one, an unknown kind.
    FOR v_case IN SELECT unnest(ARRAY['systemWithReason', 'staffWithoutReason', 'unknownKind']) LOOP
      v_state := NULL;
      BEGIN
        CASE v_case
          WHEN 'systemWithReason'   THEN INSERT INTO public.seller_notices (seller_id, listing_id, kind, reason) VALUES (v_seller, v_ad, 'level_ending', 'other');
          WHEN 'staffWithoutReason' THEN INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_seller, v_ad, 'admin_remove');
          WHEN 'unknownKind'        THEN INSERT INTO public.seller_notices (seller_id, listing_id, kind) VALUES (v_seller, v_ad, 'reach_ending');
        END CASE;
      EXCEPTION WHEN check_violation THEN
        GET STACKED DIAGNOSTICS v_state = RETURNED_SQLSTATE;
      END;
      IF v_state IS DISTINCT FROM '23514' THEN
        RAISE EXCEPTION 'P-2 M-1c part 1 proof (b): % was not refused by a CHECK (%)', v_case, coalesce(v_state, 'taken');
      END IF;
    END LOOP;
    IF (SELECT count(*) FROM public.seller_notices WHERE listing_id = v_ad) <> 3 THEN
      RAISE EXCEPTION 'P-2 M-1c part 1 proof (b): a refused notice left a row';
    END IF;
    RAISE EXCEPTION 'p2-m1c1-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c1-proof-ok' THEN RAISE; END IF;
  END;
END;
$proof$;

INSERT INTO public.migration_marks (version) VALUES ('20261105100100') ON CONFLICT DO NOTHING;
