# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42392046074
- Commit: `af50ca802c2b44974d3abe4d7f3fb68340bc4eaa`
- Attempt: 1
- Written (UTC): 2026-11-07T22:35:45.900Z
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

66 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `tooManyPhotos:<n>` | 4 | full |
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

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### tooManyPhotos:<n>

- Count: 4 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-25 an edited photo takes the old photo's place; its objects go; at the cap it ×2 · PP-26 a refused edit leaves the old photo as it was; a photo not on the listing  ×2 · PP-7 the eleventh photo is refused tooManyPhotos ×2 · PP-8 DELETE removes the row and the objects; POST makes a photo the cover ×2

```text
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly · unavailable: full

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-07T16:36:21.082Z | 0.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 31.7 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42392046074-nightly
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

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 2 context file(s); of the same spec: none

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
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
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4 ×2
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).

## full: no results file

full: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (8) ---
  ✘   795 [mobile-360] › e2e/photo-pipeline.spec.ts:290:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (17.8s)
  ✘   814 [mobile-360] › e2e/photo-pipeline.spec.ts:1431:3 › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) (24.0s)
  ✘   876 [mobile-360] › e2e/post-wizard-category.spec.ts:1274:3 › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap (26.6s)
  ✘  1267 [mobile-360] › e2e/shell.spec.ts:1227:3 › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category (10.5s)
  ✘  1790 [desktop-1280] › e2e/admin-translations-governance.spec.ts:1266:3 › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state (4.1m)
  ✘  2184 [desktop-1280] › e2e/photo-pipeline.spec.ts:290:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (19.2s)
  ✘  2203 [desktop-1280] › e2e/photo-pipeline.spec.ts:1431:3 › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) (24.0s)
  ✘  2265 [desktop-1280] › e2e/post-wizard-category.spec.ts:1274:3 › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap (27.1s)
--- final 10 lines ---
[WebServer] emit@node:events:97:22
[WebServer] emitCloseNT@internal:http:47:79
[WebServer] emit@node:events:118:23
[WebServer] emitCloseNT@internal:streams/destroy:78:14
[WebServer] processTicksAndRejections@
[WebServer] [aborted] the client left; h3 logged the request as unhandled (status 500)
[WebServer] [client-aborted] GET /api/categories/tree
SGB-4 1440 light top: [{"x":256,"y":56,"width":1184,"height":40},{"x":256,"y":96,"width":1184,"height":40},{"x":256,"y":136,"width":1184,"height":40}]
SGB-4 1440 light scrolled: [{"x":256,"y":56,"width":1184,"height":40},{"x":256,"y":96,"width":1184,"height":40}]
```

```text
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
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4 ×2
```
