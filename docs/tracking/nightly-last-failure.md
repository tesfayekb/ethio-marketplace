# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42253852317
- Commit: `596345a4c4ed52ed31589d8ac0872bc0de15b8f3`
- Attempt: 1
- Written (UTC): 2026-11-06T22:36:13.080Z
- Passed: 0 · Skipped: 0 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly
- Sources without results: full
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SAP-1 each tier's ad page reads its tokens (390, dark) ×1 · SAP-2 Show contact is 48px and as wide as its box (390) ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly · unavailable: full

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-06T16:36:55.248Z | 0.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 32.2 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42253852317-nightly
```

## auth-resend-exhaustion.spec.ts › A-3: three resends exhaust the per-visit limit

- Source: `nightly`
- Project: `nightly-mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })


  48 |   await signUpFresh(page, 103);
  49 |   await assertNoSignUpError(page);
> 50 |   await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
     |                                                                            ^
  51 |     timeout: 15000,
  52 |   });
  53 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/nightly/auth-resend-exhaustion.spec.ts:50:76
```

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 10 context file(s); of the same spec: none

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/edit_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function edit_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/relist_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function relist_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/set_listing_price ({"code":"42501","details":null,"hint":null,"message":"permission denied for function set_listing_price"})
[client-error] console.error: Failed to load resource: the server responded with a status of 429 () ×2
[client-error] HTTP 429 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "rateLimited", "refusals": [{"reason": "rateLimited"}]}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/edit_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function edit_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/relist_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function relist_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/set_listing_price ({"code":"42501","details":null,"hint":null,"message":"permission denied for function set_listing_price"})
```

## full: no results file

full: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
  ✘   228 [mobile-360] › e2e/admin-listings.spec.ts:580:3 › ADMIN LISTINGS — the console's doors › AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written (6.6s)
  ✘   249 [mobile-360] › e2e/admin-listings.spec.ts:2067:3 › ADMIN LISTINGS — the console's doors › AL-29 Neither door moves a posted ad to another category; nothing is written (D172) (7.6s)
  ✘   406 [mobile-360] › e2e/auth-caller-gates.spec.ts:253:1 › CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account @private-identity (1.6s)
  ✘   648 [mobile-360] › e2e/legal-certify.spec.ts:1035:3 › Legal certification › LG-28 while an acceptance is owed, the table guard refuses the seller's own changes to a live ad and nothing is written (14.3s)
  ✘   714 [mobile-360] › e2e/my-listings-doors.spec.ts:453:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing (13.8s)
  ✘   716 [mobile-360] › e2e/my-listings-doors.spec.ts:541:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) (13.0s)
  ✘   717 [mobile-360] › e2e/my-listings-doors.spec.ts:597:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) (9.4s)
  ✘   718 [mobile-360] › e2e/my-listings-doors.spec.ts:659:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) (7.8s)
  ✘   721 [mobile-360] › e2e/my-listings-doors.spec.ts:781:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-9 The seller's history: each change, by you, staff or the system, never a name (7.2s)
  ✘   740 [mobile-360] › e2e/my-listings-page.spec.ts:274:3 › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's (15.6s)
  ✘   741 [mobile-360] › e2e/my-listings-page.spec.ts:354:3 › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) (16.9s)
  ✘   744 [mobile-360] › e2e/my-listings-page.spec.ts:514:3 › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) (8.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
  ✘  1012 [mobile-360] › e2e/posting-routes-dials.spec.ts:133:3 › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial (6.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
  ✘  1017 [mobile-360] › e2e/posting-routes-dials.spec.ts:195:3 › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial (6.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
  ✘  1019 [mobile-360] › e2e/posting-routes-dials.spec.ts:213:3 › POSTING DOOR DIALS › PR-46 set_listing_price counts against the revise dial (6.7s)
  ✘  1258 [mobile-360] › e2e/shell.spec.ts:1227:3 › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category (11.0s)
  ✘  1625 [desktop-1280] › e2e/admin-listings.spec.ts:580:3 › ADMIN LISTINGS — the console's doors › AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written (6.3s)
  ✘  1646 [desktop-1280] › e2e/admin-listings.spec.ts:2067:3 › ADMIN LISTINGS — the console's doors › AL-29 Neither door moves a posted ad to another category; nothing is written (D172) (8.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 () ×2
  ✘  1781 [desktop-1280] › e2e/admin-translations-governance.spec.ts:1266:3 › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state (4.2m)
  ✘  1799 [desktop-1280] › e2e/auth-caller-gates.spec.ts:253:1 › CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account @private-identity (1.6s)
  ✘  2028 [desktop-1280] › e2e/legal-certify.spec.ts:1035:3 › Legal certification › LG-28 while an acceptance is owed, the table guard refuses the seller's own changes to a live ad and nothing is written (13.2s)
  ✘  2094 [desktop-1280] › e2e/my-listings-doors.spec.ts:453:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing (13.2s)
  ✘  2096 [desktop-1280] › e2e/my-listings-doors.spec.ts:541:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) (11.2s)
  ✘  2097 [desktop-1280] › e2e/my-listings-doors.spec.ts:597:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) (7.0s)
  ✘  2098 [desktop-1280] › e2e/my-listings-doors.spec.ts:659:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) (6.8s)
  ✘  2101 [desktop-1280] › e2e/my-listings-doors.spec.ts:781:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-9 The seller's history: each change, by you, staff or the system, never a name (7.4s)
--- final 10 lines ---
[WebServer] [upstream] ssr language gate 200 66ms
[WebServer] [upstream] ssr language gate 200 57ms
  ✓  2434 [desktop-1280] › e2e/posting-routes.spec.ts:1446:5 › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) (11.6s)
[WebServer] [upstream] ssr language gate 200 68ms
[WebServer] [upstream] ssr language gate 200 67ms
  ✓  2435 [desktop-1280] › e2e/posting-routes.spec.ts:1516:3 › POSTING ROUTES › PR-53 a seller or business name one letter off a protected organisation's name is refused as reserved; a short or exact-only handle is not widened; an ordinary name passes (DEC-191) (7.0s)
[WebServer] [upstream] ssr language gate 200 52ms
[WebServer] [upstream] ssr language gate 200 75ms
  ✓  2436 [desktop-1280] › e2e/posting-routes.spec.ts:1621:3 › POSTING ROUTES › PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203) (6.8s)
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/edit_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function edit_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/relist_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function relist_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/set_listing_price ({"code":"42501","details":null,"hint":null,"message":"permission denied for function set_listing_price"})
[client-error] console.error: Failed to load resource: the server responded with a status of 429 () ×2
[client-error] HTTP 429 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "rateLimited", "refusals": [{"reason": "rateLimited"}]}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/edit_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function edit_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/relist_listing ({"code":"42501","details":null,"hint":null,"message":"permission denied for function relist_listing"})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/set_listing_price ({"code":"42501","details":null,"hint":null,"message":"permission denied for function set_listing_price"})
```
