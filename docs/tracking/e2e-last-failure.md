# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37071327293
- Commit: `712ef155a389689df519ac6795c3715b1d27ea64`
- Attempt: 1
- Written (UTC): 2026-10-02T22:17:22.955Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

No `[ssr-error]` lines in any source (all 8 logs read).

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37071327293-email
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[a11y] wizard-1 mobile-360 serious=0 critical=0
[a11y] wizard-3 mobile-360 serious=0 critical=0
[a11y] wizard-5 mobile-360 serious=0 critical=0
  ✓    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (14.2s)
  ✓    3 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (8.2s)
  ✓    4 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (6.0s)
  ✓    5 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (6.0s)
  ✓    6 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (4.8s)
  ✓    7 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (7.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37071327293-email

  1 passed (12.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:setup] identity pool size = 2 (E2E_WORKERS=2)
[e2e:setup] reaped 0 stale scratch role(s)
[e2e:setup] reaped 0 stale scratch listing(s)
[e2e:setup] photo reaper proof: ok
[e2e:setup] photo backlog: 0 top-level seller folder(s)
[e2e:setup] photo objects removed: 0 under 0 reaped listing(s); orphan-user folders: 0; orphan listing folders: 0; kept (live sellers): 0; more remain: no
[e2e:setup] reaped 0 stale scratch categor(ies)
[e2e:maintenance] pruned 2 audit rows, 0 objects
[e2e:maintenance] RATIFIED-AM GAP: 28 rows: buses-vans, heavy-machinery, vehicle-parts, vehicle-hire, auto-services, gaming, printers-office, electronics-accessories, traditional-cloth, nail-hand-foot, industrial-equipment, other-commercial-equipment, appliances, logistics-cargo, personal-care-services, printing-photography, health-services, other-sports-leisure, steel-metals, wood-timber, plumbing, tiles-paint, roofing-doors, resorts-lodges, tours-tickets, other-agriculture-farming, other-pets-animals, other-babies-kids
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071327293-2-3046-3-hxpphr@ethio-e2e.invalid)
  ✓    2 [mobile-360] › e2e/admin-translations-governance.spec.ts:457:3 › U4g bulk approval, order and orphans › TR-20m mobile exposes both reorder controls for the parked fence (4.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071327293-2-3046-3-hxpphr@ethio-e2e.invalid)
  ✓    1 [mobile-360] › e2e/admin-translations-data.spec.ts:186:3 › U4b translations console › TR-14 the Data scope edits and approves a location name (16.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-2-3046-2-de3ghq@ethio-e2e.invalid)
  ✓    3 [mobile-360] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (25.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071327293-2-3046-3-hxpphr@ethio-e2e.invalid)
  ✓    4 [mobile-360] › e2e/admin-translations-data.spec.ts:276:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one (23.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-2-3046-2-de3ghq@ethio-e2e.invalid)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 171 tests using 2 workers, shard 3 of 6

  ✓    1 [mobile-360] › e2e/post-wizard-pricing.spec.ts:229:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (14.0s)
  ✓    2 [mobile-360] › e2e/post-wizard-resets.spec.ts:204:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (15.1s)
PW-72 bodies: []
  ✓    3 [mobile-360] › e2e/post-wizard-pricing.spec.ts:349:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (16.6s)
  ✓    4 [mobile-360] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (16.3s)
  ✓    5 [mobile-360] › e2e/post-wizard-pricing.spec.ts:380:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (13.0s)
  ✓    6 [mobile-360] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (16.0s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-4-2845-2-0a5ugb@ethio-e2e.invalid)
  ✓   13 [desktop-1280] › e2e/admin-attributes-import.spec.ts:479:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (6.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-4-2845-2-0a5ugb@ethio-e2e.invalid)
  ✓   11 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:568:3 › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells (15.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071327293-4-2845-3-emr3zl@ethio-e2e.invalid)
  ✓   15 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:657:3 › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition (4.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071327293-4-2845-3-emr3zl@ethio-e2e.invalid)
  ✓   14 [desktop-1280] › e2e/admin-attributes-import.spec.ts:548:3 › C3 attributes console › AT-44 the v2 definition cells commit, export and round-trip unchanged (7.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-4-2845-2-0a5ugb@ethio-e2e.invalid)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-5-3053-2-rdbxaq@ethio-e2e.invalid)
  ✓    6 [desktop-1280] › e2e/admin-translations-console.spec.ts:157:3 › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER (9.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-5-3053-2-rdbxaq@ethio-e2e.invalid)
  ✓    7 [desktop-1280] › e2e/admin-translations-console.spec.ts:177:3 › U4b translations console › TR-5 filters live in the URL and survive a reload (3.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-5-3053-2-rdbxaq@ethio-e2e.invalid)
  ✓    8 [desktop-1280] › e2e/admin-translations-console.spec.ts:203:3 › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication (4.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071327293-5-3053-2-rdbxaq@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled f4e24d50-7063-48a5-bb5b-8b9f22356a07: []
  ✓    5 [desktop-1280] › e2e/admin-translations-data.spec.ts:276:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one (26.2s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    1 [desktop-1280] › e2e/post-wizard-specs.spec.ts:211:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (11.3s)
  ✓    2 [desktop-1280] › e2e/post-wizard-resets.spec.ts:204:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (13.1s)
  ✓    3 [desktop-1280] › e2e/post-wizard-specs.spec.ts:289:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (13.2s)
PW-72 bodies: []
  ✓    4 [desktop-1280] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (14.7s)
  ✓    5 [desktop-1280] › e2e/post-wizard-specs.spec.ts:374:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (8.5s)
  ✓    6 [desktop-1280] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (12.5s)
  ✓    7 [desktop-1280] › e2e/post-wizard-specs.spec.ts:407:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (8.1s)
  ✓    9 [desktop-1280] › e2e/post-wizard-specs.spec.ts:468:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (11.3s)
```
