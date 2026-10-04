# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37210551317
- Commit: `2ff58122e22cf414a498ad538c63ed1c73f541ec`
- Attempt: 1
- Written (UTC): 2026-10-04T14:49:52.450Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): none
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 5 · unavailable: email, shard 4, shard 6

`email`, `shard 4`, `shard 6`: log unavailable.

## Accessibility (DEC-084, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 5 · unavailable: email, shard 4, shard 6

`email`, `shard 4`, `shard 6`: log unavailable.

4 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (31.8s)
--- final 10 lines ---
[a11y] home mobile-360 serious=0 critical=0
[a11y] auth mobile-360 serious=0 critical=0
  ✓    1 [mobile-360] › e2e/a11y.spec.ts:58:3 › A11Y SMOKE (DEC-084, gating) › A11Y-1 marketplace home and sign-in @a11y (4.6s)
[a11y] wizard-1 mobile-360 serious=0 critical=0
[a11y] wizard-3 mobile-360 serious=0 critical=0
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (31.8s)
[a11y] wizard-1 mobile-360 serious=0 critical=0
[a11y] wizard-3 mobile-360 serious=0 critical=0
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:maintenance] pruned 2640 audit rows, 0 objects
[e2e:maintenance] RATIFIED-AM GAP: 28 rows: buses-vans, heavy-machinery, vehicle-parts, vehicle-hire, auto-services, gaming, printers-office, electronics-accessories, traditional-cloth, nail-hand-foot, industrial-equipment, other-commercial-equipment, appliances, logistics-cargo, personal-care-services, printing-photography, health-services, other-sports-leisure, steel-metals, wood-timber, plumbing, tiles-paint, roofing-doors, resorts-lodges, tours-tickets, other-agriculture-farming, other-pets-animals, other-babies-kids
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
[e2e:setup] healed 0 stale EN rows (INC-175)
[e2e:setup] reaped 20374 stale scratch rows
[e2e:setup] state written; setup complete

Running 173 tests using 2 workers, shard 1 of 6
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-2-2849-3-vn1zit@ethio-e2e.invalid)
  ✓    1 [mobile-360] › e2e/admin-translations-data.spec.ts:186:3 › U4b translations console › TR-14 the Data scope edits and approves a location name (15.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-2-2849-2-y6qxmv@ethio-e2e.invalid)
  ✓    3 [mobile-360] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (20.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-2-2849-3-vn1zit@ethio-e2e.invalid)
  ✓    4 [mobile-360] › e2e/admin-translations-data.spec.ts:276:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one (20.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-2-2849-2-y6qxmv@ethio-e2e.invalid)
  ✓    5 [mobile-360] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (24.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-2-2849-3-vn1zit@ethio-e2e.invalid)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (4) ---
  ✘    2 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (19.0s)
  ✘    3 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (18.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    4 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (17.3s)
--- final 10 lines ---
[e2e:setup] state written; setup complete

Running 177 tests using 2 workers, shard 3 of 6

  ✓    1 [mobile-360] › e2e/post-wizard-resets.spec.ts:205:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (12.8s)
  ✘    2 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (19.0s)
  ✘    3 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (18.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    4 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (17.3s)
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-5-2852-3-ixta4d@ethio-e2e.invalid)
  ✓    1 [desktop-1280] › e2e/admin-translations-data.spec.ts:186:3 › U4b translations console › TR-14 the Data scope edits and approves a location name (14.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-5-2852-2-bt1y6w@ethio-e2e.invalid)
  ✓    3 [desktop-1280] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (22.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-5-2852-3-ixta4d@ethio-e2e.invalid)
  ✓    4 [desktop-1280] › e2e/admin-translations-data.spec.ts:276:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one (21.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-5-2852-2-bt1y6w@ethio-e2e.invalid)
  ✓    5 [desktop-1280] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (26.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-5-2852-3-ixta4d@ethio-e2e.invalid)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
