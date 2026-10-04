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

## Step 9 — the price page's copies of the specifications form (census, base f183e2a6)

Line numbers are those of f183e2a6, before the fix.

- **Schema read, per copy.** Every mounted `StepSpecifications` reads the posting schema itself on mount (`step-specifications.tsx:259–278`, `readPostingSchemaAnswer` → `get_posting_schema`, which the door counts against the `schema_read` dial). There is no shared cache, so each copy is one counted read. The wizard's own read (`wizard.tsx:215`) is separate and happens on a category change, not on the price page.
- **Fields report, per copy.** `step-specifications.tsx:303–316` reports the drawn, condition-met keys through `onFields`, and only when the prop is passed. The two price-page copies (`wizard.tsx:947` and `:961`) passed no `onFields`, so the price page sent **no** fields report: a refusal on a deal row mapped to no step (`field.tsx:100`, `stepOfField`).
- **Option loading, per copy.** `step-specifications.tsx:384–419` requests lists for answered selects and for big lists once a sibling is answered. It walks **every** schema attribute, not only the drawn ones, and its once-per-key memory (`requestedAnswered`, `requestedBig`) is a per-mount ref. `loadAttributeOptions` caches only after a response (`attribute-options.ts:126`), so concurrent first loads are not de-duplicated.
- **What the two copies did twice.** Two counted schema reads. Each answered-select list and each eligible big list requested twice, both copies asking for the same lists, including lists for rows neither copy draws. Two independent sets of hidden-answer, reconcile and default passes writing `attributes`.
- **Could one copy's report overwrite the other's?** Yes, had both been given `onFields`. The wizard holds one `specFields` state, and each copy reports only its own subset, so the copy whose effect ran last would have replaced the other's keys. As shipped, neither reported, so no overwrite happened; the defect was the missing report.
- **Fix chosen.** One copy draws its groups around the price control (`around={{ after: "sold", node: <StepPricing/> }}`): one schema read, one option load per list, and one fields report (`onPriceFields` → `priceFields`, routed to step 4 by `stepOfField`).
