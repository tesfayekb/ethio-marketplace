# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37089390987
- Commit: `df2080a9b76cb51a7acd0599ce943aef99db68c9`
- Attempt: 1
- Written (UTC): 2026-10-03T02:23:43.521Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 line(s), 6 message(s): 1 off the allowlist, 5 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 2 | shard 3 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | shard 4 |
| `definitions wrongFile` (quiet) | 1 | shard 4 |

Quiet (allowlisted): definitions badHeader ×2 · digest mismatch ×2 · preview_failed permission denied ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · definitions wrongFile ×1

Off the allowlist:

### listing not found

- Count: 2 · Sources: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

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
[e2e:teardown] deleted 4 user(s) owned by process 37089390987-email
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

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

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
-   29 [mobile-360] › e2e/shell.spec.ts:580:3 › corner-block grid › every rail row carries a leading icon on one gutter
  -   30 [mobile-360] › e2e/shell.spec.ts:600:3 › corner-block grid › category rows carry DISTINCT icons, not one repeated glyph
  -   31 [mobile-360] › e2e/shell.spec.ts:618:3 › corner-block grid › the rail collapses to icons, shows a tooltip, and remembers the choice
  -   32 [mobile-360] › e2e/shell.spec.ts:672:3 › corner-block grid › exactly one collapse toggle, and the wordmark moves into the bar when collapsed
  -   33 [mobile-360] › e2e/shell.spec.ts:710:3 › corner-block grid › the rail sign-out is absent for a logged-out visitor
  -   34 [mobile-360] › e2e/shell.spec.ts:721:3 › tablet chrome (md = 768px) › tablets get the persistent rail and the FULL controls
  -   35 [mobile-360] › e2e/shell.spec.ts:751:3 › tablet chrome (md = 768px) › the top bar is ONE band: logo-cell height AND background, location row separate
  ✓   36 [mobile-360] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (857ms)
  ✓   37 [mobile-360] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger (628ms)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.4s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37089390987-email

  1 passed (11.4s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-1-2861-2-lqcb1f@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
  ✓   20 [mobile-360] › e2e/admin-attributes-import.spec.ts:1031:3 › C3 attributes console › AT-23 a categories:view-only operator sees no import control and is refused (5.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-1-2861-3-dcq0wc@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   22 [mobile-360] › e2e/admin-attributes-import.spec.ts:1092:3 › C3 attributes console › AT-24 a commit whose bytes changed since the preview is refused (2.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-1-2861-3-dcq0wc@ethio-e2e.invalid)
  ✓   23 [mobile-360] › e2e/admin-attributes-import.spec.ts:1122:3 › C3 attributes console › AT-25 an invalid option parent is refused (2.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-1-2861-3-dcq0wc@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-2-3055-2-zln7gx@ethio-e2e.invalid)
  ✓    3 [mobile-360] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (18.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-2-3055-3-skvrok@ethio-e2e.invalid)
  ✓    4 [mobile-360] › e2e/admin-translations-data.spec.ts:276:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one (21.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-2-3055-2-zln7gx@ethio-e2e.invalid)
  ✓    5 [mobile-360] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (26.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-2-3055-3-skvrok@ethio-e2e.invalid)
  ✓    6 [mobile-360] › e2e/admin-translations-data.spec.ts:452:3 › U4b translations console › TR-26 the Data scope approves every machine-filled content name (18.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-2-3055-2-zln7gx@ethio-e2e.invalid)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓    6 [mobile-360] › e2e/post-wizard-pricing.spec.ts:380:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (13.1s)
  ✓    5 [mobile-360] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (19.8s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓    7 [mobile-360] › e2e/post-wizard-pricing.spec.ts:406:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (13.4s)
  ✓    9 [mobile-360] › e2e/post-wizard-pricing.spec.ts:421:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (12.6s)
  ✓    8 [mobile-360] › e2e/post-wizard-resets.spec.ts:494:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (22.0s)
  ✓   10 [mobile-360] › e2e/post-wizard-pricing.spec.ts:435:3 › POSTING WIZARD › PW-94 a listing card prints its price period (7.1s)
  ✓   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:457:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (12.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   32 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (3.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-4-3126-3-5kbfvz@ethio-e2e.invalid)
  ✓   31 [desktop-1280] › e2e/admin-attributes-library.spec.ts:66:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (14.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-4-3126-2-4wooga@ethio-e2e.invalid)
  ✓   33 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1307:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (10.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-4-3126-3-5kbfvz@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   35 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1413:3 › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets (4.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-4-3126-3-5kbfvz@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   19 [desktop-1280] › e2e/admin-translations-console.spec.ts:566:3 › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key (7.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-5-2908-2-bsezbv@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled a05c64bb-626f-4dcc-a921-07b6d798339d: []
  ✓   21 [desktop-1280] › e2e/admin-translations-console.spec.ts:687:3 › U4b translations console › TR-13 the placeholder validator flags a machine write too (8.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089390987-5-2908-2-bsezbv@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled a05c64bb-626f-4dcc-a921-07b6d798339d: []
  ✓   20 [desktop-1280] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (26.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089390987-5-2908-3-s3wnwo@ethio-e2e.invalid)
  ✓   22 [desktop-1280] › e2e/admin-translations-console.spec.ts:741:3 › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one (20.6s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 152 tests using 2 workers, shard 6 of 6

  ✓    2 [desktop-1280] › e2e/post-wizard-specs.spec.ts:211:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (12.2s)
  ✓    1 [desktop-1280] › e2e/post-wizard-resets.spec.ts:204:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (14.0s)
  ✓    3 [desktop-1280] › e2e/post-wizard-specs.spec.ts:289:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (13.6s)
PW-72 bodies: []
  ✓    4 [desktop-1280] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (18.7s)
  ✓    5 [desktop-1280] › e2e/post-wizard-specs.spec.ts:374:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (11.6s)
  ✓    7 [desktop-1280] › e2e/post-wizard-specs.spec.ts:407:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (11.1s)
```
