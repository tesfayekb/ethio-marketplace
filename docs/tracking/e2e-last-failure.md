# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39187335845
- Commit: `e087535d53d2a3492a97810ff5c9db97437e8d09`
- PLATFORM-ORIGIN? the head commit's subject is `Lovable update` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-10-19T02:47:59.929Z
- Passed: 2003 · Skipped: 151 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree — Error: expect(received).toContain(expected) // indexOf
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:828:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:947:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:227:24
```

Context: context file not found for `admin-countries-L2b-countries-console-CO-5-profile-round-trip-units-currency-and-order-are-saved-and-read-back-mobile-360` — Playwright's name `admin-countries-L2b-countr-ac675-der-are-saved-and-read-back-mobile-360`; this run carried 6 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-178-a-late-read-of-the-place-text-never-replaces-a-newer-save-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-7ecd4-never-replaces-a-newer-save-mobile-360`; this run carried 6 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: About
          - listitem [ref=e321]:
            - generic [ref=e322]: Contact
      - navigation "Help" [ref=e323]:
        - heading "Help" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Safety
      - navigation "Legal" [ref=e328]:
        - heading "Legal" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Terms
          - listitem [ref=e333]:
            - generic [ref=e334]: Privacy
    - paragraph [ref=e336]: © 2026 ethio.com — All rights reserved.
```
```

### admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-4-0-lt4c-bum5gk"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-1-ls-region-esegpk", "e2e-loc-5-0-ls-region-fltc1k", "e2e-loc-5-0-ls-region-gmyg0y", "e2e-loc-nightly-3-ls-region-3680hr", "oromia", "sidama", …]

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-4-0-lt4c-bum5gk"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-1-ls-region-esegpk", "e2e-loc-5-0-ls-region-fltc1k", "e2e-loc-5-0-ls-region-gmyg0y", "e2e-loc-nightly-3-ls-region-3680hr", "oromia", "sidama", …]

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

  416 |       await page.getByTestId("location-active-submit").click();
  417 |       await stepUpIfPrompted(page, secret);
> 418 |       await expect
      |       ^
  419 |         .poll(() => treeSlugs(page, "ET"), { timeout: 30000, intervals: [500, 1000, 2000, 3000] })
  420 |         .toContain(citySlug);
  421 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:418:7
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] HTTP 504 GET https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/user (upstream request timeout)
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

Context:

```text
      - generic:
        - button: Cancel
        - button: Activate
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - heading "Two-factor verification required" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: Two-factor verification required
      - paragraph [ref=e7]: This action requires two-factor verification. Enter the current code from your authenticator app.
      - generic [ref=e8]: Six-digit code
      - textbox "Six-digit code" [active] [ref=e9]:
        - /placeholder: "123456"
      - button "Verify and continue" [disabled]
      - button "Cancel" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu')


   at helpers/ui.ts:509

  507 |   // ids here, not surface later as an inexplicable permission assertion.
  508 |   await assertInjectedIdentity(page, session);
> 509 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  510 |   await page.waitForFunction(
  511 |     () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-CQsxfz9Y.js:142:25) at http://127.0.0.1:4173/assets/feed-CQsxfz9Y.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5)
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-128-a-number-typed-before-the-phone-library-arrives-is-saved-only-once-read-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-9f54e-ves-is-saved-only-once-read-desktop-1280`; this run carried 6 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

112 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>e<n>uq<n>: e<n>e_par_<n>p<n>anp → e<n>e_chi_w<n>dgq` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bti<n>m<n>: e<n>e_par_h<n>otd → e<n>e_chi_yv<n>j<n>` (quiet) | 1 | shard 1 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>e<n>uq<n>: e<n>e_par_<n>p<n>anp → e<n>e_chi_w<n>dgq ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bti<n>m<n>: e<n>e_par_h<n>otd → e<n>e_chi_yv<n>j<n> ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-108 an Other basis names the seller's written unit (INC-371) ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · BB-1 Post uses its short Amharic visible and accessible name ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-42 a missing box gives its room to its row ×1 · AP-44 nothing covers the top bars ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T01:53:59.951Z | 21.3 min |
| email | 2026-10-19T01:54:00.291Z | 0.2 min |
| shard 1 | 2026-10-19T01:54:03.474Z | 53.6 min |
| shard 2 | 2026-10-19T01:54:02.657Z | 44.4 min |
| shard 3 | 2026-10-19T01:53:59.353Z | 40.0 min |
| shard 4 | 2026-10-19T01:54:02.510Z | 41.3 min |
| shard 5 | 2026-10-19T01:53:56.123Z | 38.3 min |
| shard 6 | 2026-10-19T01:53:55.022Z | 37.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 420 | 28.9 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 27.3 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 26.4 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 25.2 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 21.9 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 21.1 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 17.5 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 15.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.1 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 13.7 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.7 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.2 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 12.0 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 11.8 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.6 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.4 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 10.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 8.8 min | shard 1, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.6 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.5 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.4 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.3 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.4 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.7 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 5 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 1.0 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 104.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 103.1 s |
| `admin-listings.spec.ts` › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only | desktop-1280 | 95.1 s |
| `post-wizard-bundle2.spec.ts` › PW-178 a late read of the place text never replaces a newer save | mobile-360 | 81.7 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 74.6 s |
| `post-wizard-bundle2.spec.ts` › PW-128 a number typed before the phone library arrives is saved only once read | desktop-1280 | 70.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 66.6 s |
| `photo-pipeline.spec.ts` › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session | desktop-1280 | 65.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 65.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 62.5 s |
| `photo-pipeline.spec.ts` › PP-9 the upload dial refuses once the seller's hourly ceiling is reached | mobile-360 | 56.5 s |
| `shell.spec.ts` › location row is present on Marketplace and absent on Account | mobile-360 | 56.0 s |
| `posting-routes.spec.ts` › PR-6 the options route is ETag'd: a conditional repeat costs a 304 | mobile-360 | 55.7 s |
| `posting-routes.spec.ts` › PR-22 step 8: attribute tables leave the browser; categories still read | desktop-1280 | 53.1 s |
| `admin-countries.spec.ts` › CO-5 profile round trip: units, currency and order are saved and read back | mobile-360 | 52.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39187335845-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39187335845-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39187335845-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39187335845-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39187335845-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39187335845-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39187335845-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39187335845-6
```

## shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › FF-1 every text field is at least 16 px on a phone

- Source: `smoke`
- Project: `mobile-360`

```text
Error: /post: no visible fields reached

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: /post: no visible fields reached

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  3936 |         ).toBeGreaterThanOrEqual(16);
  3937 |       }
> 3938 |       expect(visible, `${path}: no visible fields reached`).toBeGreaterThan(0);
       |                                                             ^
  3939 |     };
  3940 |     await gotoReady(page, "/");
  3941 |     await page.getByTestId("search-toggle").click();
    at sweep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3938:61)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3949:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: About
          - listitem [ref=e219]:
            - generic [ref=e220]: Contact
      - navigation "Help" [ref=e221]:
        - heading "Help" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - generic [ref=e225]: Safety
      - navigation "Legal" [ref=e226]:
        - heading "Legal" [level=2] [ref=e227]
        - list [ref=e228]:
          - listitem [ref=e229]:
            - generic [ref=e230]: Terms
          - listitem [ref=e231]:
            - generic [ref=e232]: Privacy
    - paragraph [ref=e234]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="location"]')
Expected: "true"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="location"]')
    14 × locator resolved to <button type="button" data-target="location" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none border-b-2 px-2 whitespa…>Location</button>
       - unexpected value "null"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="location"]')
Expected: "true"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="location"]')
    14 × locator resolved to <button type="button" data-target="location" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none border-b-2 px-2 whitespa…>Location</button>
       - unexpected value "null"


  1023 |     const locationItem = bar.locator('[data-target="location"]');
  1024 |     await locationItem.click();
> 1025 |     await expect(locationItem).toHaveAttribute("aria-current", "true");
       |                                ^
  1026 |     await expect
  1027 |       .poll(async () => {
```

Context:

```text
        - heading "Company" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - generic [ref=e341]: About
          - listitem [ref=e342]:
            - generic [ref=e343]: Contact
      - navigation "Help" [ref=e344]:
        - heading "Help" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic [ref=e348]: Safety
      - navigation "Legal" [ref=e349]:
        - heading "Legal" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - generic [ref=e353]: Terms
          - listitem [ref=e354]:
            - generic [ref=e355]: Privacy
    - paragraph [ref=e357]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › FF-1 every text field is at least 16 px on a phone

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: /post: no visible fields reached

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: /post: no visible fields reached

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  3936 |         ).toBeGreaterThanOrEqual(16);
  3937 |       }
> 3938 |       expect(visible, `${path}: no visible fields reached`).toBeGreaterThan(0);
       |                                                             ^
  3939 |     };
  3940 |     await gotoReady(page, "/");
  3941 |     await page.getByTestId("search-toggle").click();
    at sweep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3938:61)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3949:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: About
          - listitem [ref=e219]:
            - generic [ref=e220]: Contact
      - navigation "Help" [ref=e221]:
        - heading "Help" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - generic [ref=e225]: Safety
      - navigation "Legal" [ref=e226]:
        - heading "Legal" [level=2] [ref=e227]
        - list [ref=e228]:
          - listitem [ref=e229]:
            - generic [ref=e230]: Terms
          - listitem [ref=e231]:
            - generic [ref=e232]: Privacy
    - paragraph [ref=e234]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-CQsxfz9Y.js:142:25) at http://127.0.0.1:4173/assets/feed-CQsxfz9Y.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5)
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-bti1m1: e2e_par_h24otd → e2e_chi_yv28j3
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 3

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-CQsxfz9Y.js:142:25) at http://127.0.0.1:4173/assets/feed-CQsxfz9Y.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cy84BYLO.js:6028:5)
```
