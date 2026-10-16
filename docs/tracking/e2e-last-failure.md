# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38961523082 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38961523082
- Commit: `d0001498189ab42d543b181a0a3b0fb9bd2d4866`
- Attempt: 1
- Written (UTC): 2026-10-16T21:09:34.447Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-23 Edit changes a specification: a refusal under its control, then the answer saved — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-3')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-3')


  775 |         await page.getByTestId("post-back").click();
  776 |       }
> 777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
      |                                                     ^
  778 |     };
  779 |     /** Next on Specifications: record what stood there, then come back to Price. */
  780 |     const judge = async (label: string) => {
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:777:53)
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-23 Edit changes a specification: a refusal under its control, then the answer saved

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Corrected listing edzgnexh"
Received: "first answerorrected listing edzgnexh"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Corrected listing edzgnexh"
Received: "first answerorrected listing edzgnexh"

  1690 |       .single();
  1691 |     if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
> 1692 |     expect(stored?.["title"]).toBe(title);
       |                               ^
  1693 |     expect((stored?.["attributes"] as Row)[spec.text.attrKey]).toBe("second answer");
  1694 |     // Two edits, two notices (read in any order).
  1695 |     expect((await noticeRows(live.id)).map((row) => String(row["fields"])).sort()).toEqual([
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1692:31
```

Context:

```text
          - listitem [ref=e391]:
            - generic [ref=e392]: About
          - listitem [ref=e393]:
            - generic [ref=e394]: How it works
      - navigation "Help" [ref=e395]:
        - heading "Help" [level=2] [ref=e396]
        - list [ref=e397]:
          - listitem [ref=e398]:
            - generic [ref=e399]: Safety
          - listitem [ref=e400]:
            - generic [ref=e401]: Contact
      - navigation "Legal" [ref=e402]:
        - heading "Legal" [level=2] [ref=e403]
        - list [ref=e404]:
          - listitem [ref=e405]:
            - generic [ref=e406]: Terms
          - listitem [ref=e407]:
            - generic [ref=e408]: Privacy
    - paragraph [ref=e410]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

115 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 15 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jcfcsd: e<n>e_par_syhtlx → e<n>e_chi_pcsxnp` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-o<n>q<n>b: e<n>e_par_zi<n>gme → e<n>e_chi_cu<n>kt` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jcfcsd: e<n>e_par_syhtlx → e<n>e_chi_pcsxnp ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-o<n>q<n>b: e<n>e_par_zi<n>gme → e<n>e_chi_cu<n>kt ×1

Off the allowlist:

### listing not found

- Count: 15 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×3 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1

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
| smoke | 2026-10-16T20:25:13.213Z | 18.3 min |
| email | 2026-10-16T20:25:26.033Z | 0.4 min |
| shard 1 | 2026-10-16T20:25:13.303Z | 41.6 min |
| shard 2 | 2026-10-16T20:25:12.068Z | 38.7 min |
| shard 3 | 2026-10-16T20:25:17.626Z | 40.6 min |
| shard 4 | 2026-10-16T20:25:23.567Z | 43.6 min |
| shard 5 | 2026-10-16T20:25:26.429Z | 43.8 min |
| shard 6 | 2026-10-16T20:25:18.078Z | 40.7 min |
| changed | 2026-10-16T20:25:18.533Z | 36.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 136 | 44.3 min | shard 2, shard 5, changed |
| `post-wizard-place.spec.ts` | 76 | 35.8 min | shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 82 | 30.4 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 68 | 29.3 min | shard 3, shard 6, changed |
| `photo-pipeline.spec.ts` | 66 | 28.7 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 27.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 96 | 25.5 min | shard 2, shard 5, changed |
| `post-wizard-pricing.spec.ts` | 52 | 22.3 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 20.7 min | smoke, shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 18.6 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 16.6 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 64 | 16.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 14.8 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 14.0 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 12.7 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 9.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.1 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 28 | 7.8 min | shard 1, shard 5 |
| `import-security.spec.ts` | 36 | 7.7 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.2 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.7 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.0 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.8 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.9 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 82.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 70.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 68.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 64.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 62.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 61.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 60.9 s |
| `admin-listings.spec.ts` › AL-23 Edit changes a specification: a refusal under its control, then the answer saved | desktop-1280 | 60.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 59.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 59.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 59.1 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 55.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 53.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 51.2 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 50.9 s |
