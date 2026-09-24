# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35979688870
- Commit: `f16a4a8652350324504934220af44212b110723f`
- Attempt: 1
- Written (UTC): 2026-09-24T09:19:50.959Z
- Passed: 89 · Skipped: 13 · Failed: 99
- Gating failures: 99 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Post-test errors (DEC-059, non-gating): shard 6, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) — Error: [e2e:c1a] seeding the leaf failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) — Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited — Error: [e2e:a2c] rebuilding the finder index failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35979688870-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35979688870-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:l2a] reading e2e-loc-6-1-ls-region-bghewn failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `shell-L4b-location-picker-LS-10-a-saved-area-beats-the-deepest-guess-desktop-1280`

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] reading the scratch pool failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `shell-L4b-location-picker-LS-11-picking-a-second-market-renders-its-own-tree-and-saves-its-own-node-desktop-1280`

## shell.spec.ts › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] reading the scratch pool failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `shell-L4b-location-picker-LS-12-a-market-whose-every-level-has-one-option-resolves-to-the-deepest-place-desktop-1280`

## shell.spec.ts › L4b location picker › LS-13 a second city stops the auto-select at the region

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] reading the scratch pool failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `shell-L4b-location-picker-LS-13-a-second-city-stops-the-auto-select-at-the-region-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:inc248] linking the definition failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-by-name-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1b] destroying the spec set failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-18-2-dgro0g@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-22-2-1ahtqq@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-LY-6-at-360-the-open-currency-list-is-above-the-sticky-action-bar-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-26-2-kqnwds@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-30-2-dyoaym@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-34-2-wqiwoy@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-38-2-pmiqpq@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-42-2-zdfju2@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-46-2-vp6bil@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-27-the-mobile-strip-walks-back-to-a-step-already-done-and-no-further-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-50-2-loruxh@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-14-D20-a-signed-out-visitor-is-sent-to-sign-in-with-a-return-path-comes-back-and-a-foreign-return-is-ignored-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-56-2-yzola6@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-15-the-posting-entry-lives-in-My-Listings-not-in-Account-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-58-2-9vv6hc@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-61-2-9dfrhm@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-comes-back-and-the-plan-bounds-the-rest-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-65-2-400bej@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-69-2-tk1ti6@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-73-2-2pl3ln@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-17-the-currency-is-preselected-and-searchable-by-name-in-one-control-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-77-2-yg1ui2@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-21-a-child-detail-shows-only-the-chosen-parent-s-options-and-clears-on-change-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-81-2-lk8wic@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-85-2-9ttzfs@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-89-2-9azkje@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-93-2-tgezqa@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-103-2-x8f7g0@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-106-2-i2zftx@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-110-2-59s6br@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-114-2-aoxjrr@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-35-a-model-s-allowed-set-narrows-and-locks-a-sibling-picker-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-123-2-faaq7t@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-46-a-category-created-with-a-secondary-parent-reaches-the-tree-inside-the-cache-window-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:d30] seeding e2e-post-changed-126-ze7iuh failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-134-2-isrqhj@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-33-a-further-place-is-added-under-a-place-already-listed-and-the-plan-refuses-the-second-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-137-2-a1hcrj@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-140-2-997avp@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-143-2-honkua@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-147-2-awkz71@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-151-2-pgx556@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-155-2-9huxp2@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-159-2-kt3hjg@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-163-2-xryxw3@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-167-2-y0mlxh@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-49-a-prefill-only-fact-keeps-its-input-while-a-settled-one-does-not-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-50 the specifications keep display order and hide only the trailing extras

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-171-2-gg2foi@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-50-the-specifications-keep-display-order-and-hide-only-the-trailing-extras-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-175-2-petp89@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-51-a-dependent-detail-never-renders-above-the-answer-it-hangs-on-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-12-4-afxq4w@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-7-a-draft-resumes-at-the-next-step-and-only-for-its-owner-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-15-2-sirumz@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-8-an-unreachable-save-keeps-the-answers-says-so-and-retries-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-19-2-5zt60o@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-23-2-pokyj5@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-by-name-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-27-2-ztlna0@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-31-2-q2swdx@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-35-2-capist@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-39-2-xdysd3@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-43-2-giume3@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-47-2-0opyqd@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-51-2-0uuor5@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-53-2-jnclco@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-14-D20-a-signed-out-visitor-is-sent-to-sign-in-with-a-return-path-comes-back-and-a-foreign-return-is-ignored-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-60-2-lli4tt@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-15-the-posting-entry-lives-in-My-Listings-not-in-Account-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-64-2-jf1rwt@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-68-2-sagixx@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-comes-back-and-the-plan-bounds-the-rest-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-72-2-yqcdcc@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-76-2-xntbh9@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-80-2-shwfzo@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-17-the-currency-is-preselected-and-searchable-by-name-in-one-control-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-84-2-5pgktn@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-21-a-child-detail-shows-only-the-chosen-parent-s-options-and-clears-on-change-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-88-2-ox0tlg@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-92-2-cxapmz@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-96-2-ztw81f@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-99-2-kvlxvn@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-107-2-uon8ow@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-111-2-a7pcel@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-115-2-m5oc3g@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-119-2-wllxnv@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-35-a-model-s-allowed-set-narrows-and-locks-a-sibling-picker-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-128-2-z1cwxy@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-46-a-category-created-with-a-secondary-parent-reaches-the-tree-inside-the-cache-window-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:d30] seeding e2e-post-changed-131-04819o failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-142-2-ag8piv@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-33-a-further-place-is-added-under-a-place-already-listed-and-the-plan-refuses-the-second-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-146-2-qjymqt@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-150-2-yrgpdc@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-154-2-y2eu0y@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-158-2-y6v6od@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-162-2-7nqiek@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-166-2-3jpnpa@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-170-2-bcfruq@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-174-2-ayvkgc@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-178-2-epfiu2@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-49-a-prefill-only-fact-keeps-its-input-while-a-settled-one-does-not-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-182-2-xwf1kw@ethio-e2e.invalid: {}
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-51-a-dependent-detail-never-renders-above-the-answer-it-hangs-on-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-179-2-eqkz3g@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-1-the-draft-route-sets-the-observed-residency-from-the-edge-exactly-once-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-183-2-qeruvn@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-2-an-incomplete-step-is-the-door-s-own-refusal-at-status-200-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-186-2-utdtnq@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-3-a-complete-draft-publishes-to-screening-and-never-to-active-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-188-2-b4nntd@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-4-identity-the-alias-is-saved-and-a-second-seller-cannot-take-it-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-190-2-larqvn@ethio-e2e.invalid: {}
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-5-assist-answers-from-the-facts-alone-within-the-field-caps-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] reading an attribute failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-6-the-options-route-is-ETag-d-a-conditional-repeat-costs-a-304-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+35979688870-changed-194-2-upnjwk@ethio-e2e.invalid: {}
```

Context:

```text
          - listitem [ref=e2473]:
            - generic [ref=e2474]: About
          - listitem [ref=e2475]:
            - generic [ref=e2476]: How it works
      - navigation "Help" [ref=e2477]:
        - heading "Help" [level=2] [ref=e2478]
        - list [ref=e2479]:
          - listitem [ref=e2480]:
            - generic [ref=e2481]: Safety
          - listitem [ref=e2482]:
            - generic [ref=e2483]: Contact
      - navigation "Legal" [ref=e2484]:
        - heading "Legal" [level=2] [ref=e2485]
        - list [ref=e2486]:
          - listitem [ref=e2487]:
            - generic [ref=e2488]: Terms
          - listitem [ref=e2489]:
            - generic [ref=e2490]: Privacy
    - paragraph [ref=e2492]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the finder leaf failed: Could not query the database for the schema cache. Retrying.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-9-catalog-finder-is-bounded-multilingual-and-rate-limited-desktop-1280`

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying. ×4
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /__root gate fetch failed 503
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /__root gate fetch failed 503
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /__root gate fetch failed 503
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: [client-error] gate fetch threw
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] pageerror: Error: Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwOnHydrationMismatch (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:1979:50) at beginWork (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:4714:18) at performUnitOfWork (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6627:14) at workLoopConcurrentByScheduler (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6624:54) at renderRootConcurrent (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6607:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6273:188) at performWorkOnRootViaSchedulerTask (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:7075:3) at MessagePort.performWorkUntilDeadline (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:107:37)
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: [client-error] gate fetch threw
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] pageerror: Error: Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwOnHydrationMismatch (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:1979:50) at beginWork (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:4714:18) at performUnitOfWork (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6627:14) at workLoopConcurrentByScheduler (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6624:54) at renderRootConcurrent (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6607:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:6273:188) at performWorkOnRootViaSchedulerTask (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:7075:3) at MessagePort.performWorkUntilDeadline (http://127.0.0.1:4173/assets/index-BYgfIg_w.js:107:37)
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×2
[client-error] console.error: [client-error] gate fetch failed 503 {"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."}
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle ((body unavailable))
[client-error] HTTP 503 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
```

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
