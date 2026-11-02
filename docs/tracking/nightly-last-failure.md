# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41483057461
- Commit: `af312ca2238538efd905ed6ea5fc97c262b0ac19`
- Attempt: 1
- Written (UTC): 2026-11-02T22:38:19.550Z
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

73 line(s), 32 message(s): 5 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 6 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `[incident <uuid>] Error: storage put default/<uuid>/<uuid>/<uuid>/cover.png: Gateway Timeout` | 2 | full |
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
| `[incident <uuid>] Error: storage put default/<uuid>/<uuid>/<uuid>/card.jpg: Gateway Timeout` | 1 | full |
| `[incident <uuid>] Error: storage put default/<uuid>/<uuid>/<uuid>/cover.webp: Gateway Timeout` | 1 | full |
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused ×2 · PP-33 the seller is told why a photo is hidden: the rule it may break, or an uns ×2 · PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon ×1 · PP-20 a draft begun on /post takes its own address, and a reload opens it again ×1 · PP-29 a photo that may not fit the ad is stored with a warning the seller sees a ×1 · PP-30 Remove background is on the cover only; the preview lies on the house back ×1

```text
[WebServer] [ssr-error] /api/upload/photo listing not found
```

### [incident <uuid>] Error: storage put default/<uuid>/<uuid>/<uuid>/cover.png: Gateway Timeout

- Count: 2 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-21 a published ad's cover photo reaches the feed card, signed for a visitor w ×1 · PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-s ×1 · PP-7 the eleventh photo is refused tooManyPhotos ×1 · PP-8 DELETE removes the row and the objects; POST makes a photo the cover ×1

```text
[WebServer] [ssr-error] /api/upload/photo [incident b55e36dd-6a8d-4c15-9232-44d56c942062] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/8f679668-ab4f-42c0-8f4e-7e915b6d8119/18c9c633-cf41-4f6a-ba34-baafe98a17ba/cover.png: Gateway Timeout
```

### [incident <uuid>] Error: storage put default/<uuid>/<uuid>/<uuid>/card.jpg: Gateway Timeout

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-15 a photo stored in an earlier visit can be made the cover, which moves it f ×1 · PP-16 a photo dropped on the step is added like a picked one ×1

```text
[WebServer] [ssr-error] /api/upload/photo [incident 142f71ee-230c-4887-9586-3d519f5ef189] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/c2166317-0f97-4947-a6f2-3b94b21c3235/21a9d60e-e9df-40fd-9fad-f99a20038d5e/card.jpg: Gateway Timeout
```

### [incident <uuid>] Error: storage put default/<uuid>/<uuid>/<uuid>/cover.webp: Gateway Timeout

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-25 an edited photo takes the old photo's place; its objects go; at the cap it ×1 · PP-26 a refused edit leaves the old photo as it was; a photo not on the listing  ×1

```text
[WebServer] [ssr-error] /api/upload/photo [incident ce7d8cb4-88a8-4b1a-bdfe-a2124d4a143f] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/caae2c27-796a-46ad-839c-823fbd9379a1/539ea2c1-d3ac-4b92-bea3-4f6e7c87f48f/cover.webp: Gateway Timeout
```

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-5 assist answers from the facts alone, within the field caps ×1 · PR-6 the options route is ETag'd: a conditional repeat costs a 304 ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly · unavailable: full

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-02T16:38:04.716Z | 0.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 32.1 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41483057461-nightly
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

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 5 context file(s); of the same spec: none

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
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
[WebServer] [ssr-error] /api/upload/photo listing not found
[WebServer] [ssr-error] /api/upload/photo [incident b55e36dd-6a8d-4c15-9232-44d56c942062] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/8f679668-ab4f-42c0-8f4e-7e915b6d8119/18c9c633-cf41-4f6a-ba34-baafe98a17ba/cover.png: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo [incident 142f71ee-230c-4887-9586-3d519f5ef189] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/c2166317-0f97-4947-a6f2-3b94b21c3235/21a9d60e-e9df-40fd-9fad-f99a20038d5e/card.jpg: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo listing not found
[WebServer] [ssr-error] /api/upload/photo [incident 337d631c-3157-4f14-ba8c-3fc75b2f7579] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/032e5c4e-232c-4c6c-bb21-9e878061af5b/4c2587de-5c35-438c-8953-3dafe9afc6d7/cover.png: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo [incident ce7d8cb4-88a8-4b1a-bdfe-a2124d4a143f] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/caae2c27-796a-46ad-839c-823fbd9379a1/539ea2c1-d3ac-4b92-bea3-4f6e7c87f48f/cover.webp: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo listing not found ×4
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).

## full: no results file

full: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (25) ---
  ✘   356 [mobile-360] › e2e/admin-translations-console.spec.ts:437:3 › U4b translations console › TR-10 translator card proves both permission states (4.2s)
  ✘  1548 [desktop-1280] › e2e/admin-categories-images.spec.ts:43:3 › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them (1.0m)
  ✘  1549 [desktop-1280] › e2e/admin-categories-images.spec.ts:162:3 › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state (2.0m)
  ✘  2116 [desktop-1280] › e2e/photo-pipeline.spec.ts:190:3 › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only (1.3m)
[WebServer] [ssr-error] /api/upload/photo [incident b55e36dd-6a8d-4c15-9232-44d56c942062] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/8f679668-ab4f-42c0-8f4e-7e915b6d8119/18c9c633-cf41-4f6a-ba34-baafe98a17ba/cover.png: Gateway Timeout
  ✘  2121 [desktop-1280] › e2e/photo-pipeline.spec.ts:289:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (1.5m)
  ✘  2122 [desktop-1280] › e2e/photo-pipeline.spec.ts:309:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (1.4m)
  ✘  2129 [desktop-1280] › e2e/photo-pipeline.spec.ts:681:3 › PHOTO PIPELINE › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back (54.7s)
[WebServer] [ssr-error] /api/upload/photo [incident 142f71ee-230c-4887-9586-3d519f5ef189] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/c2166317-0f97-4947-a6f2-3b94b21c3235/21a9d60e-e9df-40fd-9fad-f99a20038d5e/card.jpg: Gateway Timeout
  ✘  2130 [desktop-1280] › e2e/photo-pipeline.spec.ts:750:3 › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed (1.4m)
  ✘  2132 [desktop-1280] › e2e/photo-pipeline.spec.ts:850:3 › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover (1.2m)
  ✘  2133 [desktop-1280] › e2e/photo-pipeline.spec.ts:922:3 › PHOTO PIPELINE › PP-18 a photo dragged onto another photo takes its place (computer) (1.1m)
[WebServer] [ssr-error] /api/upload/photo [incident 337d631c-3157-4f14-ba8c-3fc75b2f7579] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/032e5c4e-232c-4c6c-bb21-9e878061af5b/4c2587de-5c35-438c-8953-3dafe9afc6d7/cover.png: Gateway Timeout
  ✘  2136 [desktop-1280] › e2e/photo-pipeline.spec.ts:1102:3 › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session (2.2m)
  ✘  2138 [desktop-1280] › e2e/photo-pipeline.spec.ts:1304:3 › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) (1.4m)
[WebServer] [ssr-error] /api/upload/photo [incident ce7d8cb4-88a8-4b1a-bdfe-a2124d4a143f] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/caae2c27-796a-46ad-839c-823fbd9379a1/539ea2c1-d3ac-4b92-bea3-4f6e7c87f48f/cover.webp: Gateway Timeout
  ✘  2140 [desktop-1280] › e2e/photo-pipeline.spec.ts:1438:3 › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) (1.9m)
  ✘  2141 [desktop-1280] › e2e/photo-pipeline.spec.ts:1518:3 › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) (1.4m)
  ✘  2142 [desktop-1280] › e2e/photo-pipeline.spec.ts:1579:3 › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) (1.6m)
  ✘  2144 [desktop-1280] › e2e/photo-pipeline.spec.ts:1722:3 › PHOTO PIPELINE › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3) (1.6m)
  ✘  2145 [desktop-1280] › e2e/photo-pipeline.spec.ts:1810:3 › PHOTO PIPELINE › PP-30 Remove background is on the cover only; the preview lies on the house background; Keep stores it as the cover (D159) (1.5m)
  ✘  2146 [desktop-1280] › e2e/photo-pipeline.spec.ts:1900:3 › PHOTO PIPELINE › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159) (1.1m)
  ✘  2147 [desktop-1280] › e2e/photo-pipeline.spec.ts:1952:3 › PHOTO PIPELINE › PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183) (1.2m)
  ✘  2148 [desktop-1280] › e2e/photo-pipeline.spec.ts:2042:3 › PHOTO PIPELINE › PP-33 the seller is told why a photo is hidden: the rule it may break, or an unsure check (D178) (1.2m)
  ✘  2273 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1119:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (29.2s)
--- final 10 lines ---
[WebServer] [upstream] ssr language gate 200 62ms
  ✓  2572 [desktop-1280] › e2e/shell.spec.ts:722:3 › corner-block grid › logo cell sits exactly above the rail and beside the top bar (1.0s)
[WebServer] [upstream] ssr language gate 200 37ms
  ✓  2573 [desktop-1280] › e2e/shell.spec.ts:746:3 › corner-block grid › the lockup's second line spans the wordmark exactly (829ms)
[WebServer] [upstream] ssr language gate 200 61ms
  ✓  2574 [desktop-1280] › e2e/shell.spec.ts:758:3 › corner-block grid › rail submenus expand and collapse (861ms)
[WebServer] [upstream] ssr language gate 200 55ms
  ✓  2575 [desktop-1280] › e2e/shell.spec.ts:773:3 › corner-block grid › every rail row carries a leading icon on one gutter (2.1s)
[WebServer] [upstream] ssr language gate 200 41ms
```

```text
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
[WebServer] [ssr-error] /api/upload/photo listing not found
[WebServer] [ssr-error] /api/upload/photo [incident b55e36dd-6a8d-4c15-9232-44d56c942062] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/8f679668-ab4f-42c0-8f4e-7e915b6d8119/18c9c633-cf41-4f6a-ba34-baafe98a17ba/cover.png: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo [incident 142f71ee-230c-4887-9586-3d519f5ef189] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/c2166317-0f97-4947-a6f2-3b94b21c3235/21a9d60e-e9df-40fd-9fad-f99a20038d5e/card.jpg: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo listing not found
[WebServer] [ssr-error] /api/upload/photo [incident 337d631c-3157-4f14-ba8c-3fc75b2f7579] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/032e5c4e-232c-4c6c-bb21-9e878061af5b/4c2587de-5c35-438c-8953-3dafe9afc6d7/cover.png: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo [incident ce7d8cb4-88a8-4b1a-bdfe-a2124d4a143f] Error: storage put default/136bc7f3-97a3-48da-a8d3-05808d50ff8a/caae2c27-796a-46ad-839c-823fbd9379a1/539ea2c1-d3ac-4b92-bea3-4f6e7c87f48f/cover.webp: Gateway Timeout
[WebServer] [ssr-error] /api/upload/photo listing not found ×4
```
