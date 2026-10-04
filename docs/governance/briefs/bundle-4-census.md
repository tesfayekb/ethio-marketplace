# Bundle 4 — censuses (read on ethio-prod and the tree at b432691b, 2026-10-04)

## Step 1 — steps 4 and 5 by number

- e2e: 60 uses of post-step-4/5 in seven specs (a11y 2, category 6, place 8, pricing 16, resets 10, specs 15, where 3).
- Code: types.ts:14–15 (STEPS), :29 (SEQUENCE), :61–64; step-review.tsx:285–287 and :529 (FIELD_STEPS); field.tsx:102, :312; wizard.tsx:67, :275, :483, :856, :869, :1012, :1017; mobile-step-strip.tsx:10; use-draft.test.tsx:44.
- Door: live validate_listing_draft defers price_basis_keys while p_step < 5 (live line 65).
- Data: 8 drafts on ethio-prod hold draft_step = 4 (they become 3 in M5).

## Step 6 — deal keys (effective links, 151 leaves)

Matches the brief: basis 65 (unit_of_sale 38, pricing_type 27, both 0); quantity_available 29; beside a unit: pack_quantity 16, net_weight_g 13, volume_ml 10; lease_term 6; payment_frequency 6; payment_plan 7; min_hire_days 1; term\_ 0.

## Step 16 — lifetime

- 0 of 168 categories hold expiry_days.
- transition_listing (live) sets expires_at = now() + coalesce(expiry_days, 60).
- cron holds catalog-find-sweep and seller-name-sweep only; expire_stale_listings is not scheduled.
- 0 live listings; 2 listings carry a seller's date.

## Step 20 — dials

- 6 dials live. No test pins "exactly six dials" (AT-20's toHaveLength(6) counts an import line, unrelated).

## Step 22 — naming

- nameRequired exists only on admin category/location/country doors; no posting door holds it.

## Step 23 — contact

- step-who.tsx commits through one `commit` (:310) to saveIdentity; channels come from readLastListingContact (posting-service.ts:444, step-who.tsx:290).

## Step 24 — name check

- Live alias_rule folds every site word, category, location, country and brand on each call (live body), and calls name_claim_folds / name_protected_folds up to six times.
- Limitation: the read-only database role cannot run alias_rule or check_seller_alias (permission denied), so EXPLAIN ANALYZE timings can't be read from here. They will be measured inside M5's DO block (clock_timestamp before/after), before and after the name_folds rebuild.
- Import call sites for the rebuild: attributes/import.ts:139, :181; categories/import.ts:131, :171; locations import route to be added.
