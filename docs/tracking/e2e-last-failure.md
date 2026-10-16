# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38936498429
- Commit: `64767df277ccd9764819bd7e9a0f8363ec9224dd`
- Attempt: 1
- Written (UTC): 2026-10-16T17:47:40.229Z
- Passed: 2025 · Skipped: 129 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read — Error: PW-128: the read number never reached the draft
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) — Error: the two photos are not on one row: {"firstBox":{"x":297,"y":1159,"width":147,"height":158.25},"secondBox":{"x":456,"y":1195,"width":147,"height":158.25}}
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) — Error: PW-162 d: Next did not reach photos

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-128: the read number never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: "+251911234567"
Received: ""

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-128: the read number never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: "+251911234567"
Received: ""

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1094 |     expect(await phoneOf(), "PW-128: a number was saved before the library read it").toBe("");
  1095 |     release();
> 1096 |     await expect
       |     ^
  1097 |       .poll(phoneOf, {
  1098 |         message: "PW-128: the read number never reached the draft",
  1099 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1096:5
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-128-a-number-typed-before-the-phone-library-arrives-is-saved-only-once-read-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-9f54e-ves-is-saved-only-once-read-mobile-360`; this run carried 4 context file(s); of the same spec: none

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] category e2e-post-3-1-j979xu failed: update or delete on table "categories" violates foreign key constraint "listings_category_id_fkey" on table "listings"

   at helpers/posting.ts:227

  225 |  */
  226 | export function reapStep(label: string, error: { message: string } | null): void {
> 227 |   if (error) throw new Error(`[e2e:reap] ${label} failed: ${error.message}`);
      |                    ^
  228 | }
  229 |
  230 | export async function destroyPostableCategory(slug: string): Promise<void> {
    at reapStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:227:20)
    at destroyPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:247:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:37:46
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: How it works
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Legal" [ref=e327]:
        - heading "Legal" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Terms
          - listitem [ref=e332]:
            - generic [ref=e333]: Privacy
    - paragraph [ref=e335]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')


   at helpers/ui.ts:509

  507 |   // ids here, not surface later as an inexplicable permission assertion.
  508 |   await assertInjectedIdentity(page, session);
> 509 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  510 |   await page.waitForFunction(
  511 |     () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
```

Context:

```text
          - listitem [ref=e248]:
            - generic [ref=e249]: About
          - listitem [ref=e250]:
            - generic [ref=e251]: How it works
      - navigation "Help" [ref=e252]:
        - heading "Help" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - generic [ref=e256]: Safety
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Terms
          - listitem [ref=e264]:
            - generic [ref=e265]: Privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: the two photos are not on one row: {"firstBox":{"x":297,"y":1159,"width":147,"height":158.25},"secondBox":{"x":456,"y":1195,"width":147,"height":158.25}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the two photos are not on one row: {"firstBox":{"x":297,"y":1159,"width":147,"height":158.25},"secondBox":{"x":456,"y":1195,"width":147,"height":158.25}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1962 |       firstBox !== null && secondBox !== null && Math.abs(firstBox.y - secondBox.y) < 2,
  1963 |       `the two photos are not on one row: ${JSON.stringify({ firstBox, secondBox })}`,
> 1964 |     ).toBe(true);
       |       ^
  1965 |     await expect(card.getByTestId("listing-photos-hint")).toHaveText(
  1966 |       en["admin.listings.photos.hint"],
  1967 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1964:7
```

Context:

```text
          - listitem [ref=e385]:
            - generic [ref=e386]: About
          - listitem [ref=e387]:
            - generic [ref=e388]: How it works
      - navigation "Help" [ref=e389]:
        - heading "Help" [level=2] [ref=e390]
        - list [ref=e391]:
          - listitem [ref=e392]:
            - generic [ref=e393]: Safety
          - listitem [ref=e394]:
            - generic [ref=e395]: Contact
      - navigation "Legal" [ref=e396]:
        - heading "Legal" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - generic [ref=e400]: Terms
          - listitem [ref=e401]:
            - generic [ref=e402]: Privacy
    - paragraph [ref=e404]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-162 d: Next did not reach photos

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: PW-162 d: Next did not reach photos

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  794 |       observed.push(`${label}: summary=${fields.join(",") || "none"} photos=${String(reached)}`);
  795 |       expect(fields, `PW-162 ${label}: a summary stood on specifications`).toEqual([]);
> 796 |       expect(reached, `PW-162 ${label}: Next did not reach photos`).toBe(true);
      |                                                                     ^
  797 |       await page.getByTestId("post-next").click();
  798 |       await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
  799 |     };
    at judge (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:796:69)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:841:5
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 4 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

120 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 20 | shard 2, shard 3, shard 6, changed |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ss<n>vo: e<n>e_par_bqhkpf → e<n>e_chi_<n>wupi` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zeu<n>b: e<n>e_par_fi<n>kaj → e<n>e_chi_<n>gw<n>y` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ss<n>vo: e<n>e_par_bqhkpf → e<n>e_chi_<n>wupi ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zeu<n>b: e<n>e_par_fi<n>kaj → e<n>e_chi_<n>gw<n>y ×1

Off the allowlist:

### listing not found

- Count: 20 · Sources: shard 2, shard 3, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×5 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-50 the specifications show every row open in display order (D41) ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T17:03:27.060Z | 20.0 min |
| email | 2026-10-16T17:03:16.152Z | 0.4 min |
| shard 1 | 2026-10-16T17:03:06.371Z | 40.6 min |
| shard 2 | 2026-10-16T17:03:06.096Z | 36.8 min |
| shard 3 | 2026-10-16T17:03:06.180Z | 36.8 min |
| shard 4 | 2026-10-16T17:03:12.386Z | 37.7 min |
| shard 5 | 2026-10-16T17:03:17.969Z | 44.1 min |
| shard 6 | 2026-10-16T17:03:06.192Z | 31.3 min |
| changed | 2026-10-16T17:03:14.801Z | 42.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 164 | 48.0 min | shard 3, shard 6, changed |
| `post-wizard-pricing.spec.ts` | 104 | 35.5 min | shard 3, shard 6, changed |
| `my-listings-ad.spec.ts` | 68 | 30.4 min | shard 2, shard 5, changed |
| `photo-pipeline.spec.ts` | 66 | 28.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 76 | 27.8 min | shard 3, shard 5, changed |
| `admin-listings.spec.ts` | 60 | 21.8 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 20.5 min | smoke, shard 3, shard 6 |
| `auth-signout.spec.ts` | 84 | 19.7 min | smoke, shard 2, shard 5, changed |
| `post-wizard-bundle2.spec.ts` | 68 | 19.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.9 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 15.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 62 | 14.9 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 14.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.4 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 12.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.4 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 10.2 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.6 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.0 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.6 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.6 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.9 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.3 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 5.3 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 1.3 min | shard 3 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 146.0 s |
| `posting-routes-catalog.spec.ts` › PR-38 owner's client cannot insert, update or delete coverage; the route can | mobile-360 | 100.5 s |
| `posting-routes.spec.ts` › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309) | mobile-360 | 83.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 78.5 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 69.9 s |
| `post-wizard-bundle2.spec.ts` › PW-128 a number typed before the phone library arrives is saved only once read | mobile-360 | 67.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 64.9 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | mobile-360 | 62.1 s |
| `posting-routes.spec.ts` › PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185) | desktop-1280 | 61.0 s |
| `post-wizard-bundle2.spec.ts` › PW-126 a carried number reopens grouped | mobile-360 | 59.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 58.8 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 58.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 57.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 56.9 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 56.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38936498429-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38936498429-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 38936498429-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38936498429-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38936498429-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38936498429-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 38936498429-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38936498429-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38936498429-changed
```

## posting-routes.spec.ts › POSTING ROUTES › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309)

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-12-the-draft-door-at-step-1-takes-negotiable-as-an-alias-fixed-flag-INC-309-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-04a36-n-alias-fixed-flag-INC-309--mobile-360`; this run carried 4 context file(s); of the same spec: `posting-routes-POSTING-ROU-8e3b4-reening-and-never-to-active-mobile-360`, `posting-routes-POSTING-ROU-04a36-n-alias-fixed-flag-INC-309--mobile-360-retry1`

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
