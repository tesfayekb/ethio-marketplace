# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39338384760
- Commit: `888f756cbc4c5e2d1c479355290f0b106e11dd5a`
- Attempt: 1
- Written (UTC): 2026-10-20T00:09:29.192Z
- Passed: 2190 · Skipped: 155 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] public id read failed: Cannot coerce the result to a single JSON object

  544 |
  545 |     const idRead = await adminClient().from("listings").select("public_id").eq("id", p.id).single();
> 546 |     if (idRead.error) throw new Error(`[e2e:ml] public id read failed: ${idRead.error.message}`);
      |                             ^
  547 |     const pPublicId = idRead.data.public_id as string;
  548 |     expect(typeof pPublicId, "ML-4: the ad has no public id").toBe("string");
  549 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:546:29
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 3 context file(s); of the same spec: none

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:mla] listing ad302ae8-b5a6-4313-91f0-837b0c0a2ae4 not found

  103 |     .maybeSingle();
  104 |   if (error) throw new Error(`[e2e:mla] listing read failed: ${error.message}`);
> 105 |   if (!data) throw new Error(`[e2e:mla] listing ${listingId} not found`);
      |                    ^
  106 |   return data as unknown as Row;
  107 | }
  108 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:105:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1215:21
```

Context:

```text
          - listitem [ref=e344]:
            - generic [ref=e345]: About
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Help" [ref=e348]:
        - heading "Help" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Safety
      - navigation "Legal" [ref=e353]:
        - heading "Legal" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - link "Terms" [ref=e357] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e358]:
            - link "Privacy" [ref=e359] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e361]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] listing 846d9262-6445-463b-ab9d-319ae435a812 not found

  172 |     .maybeSingle();
  173 |   if (error) throw new Error(`[e2e:ml] listing read failed: ${error.message}`);
> 174 |   if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
      |                    ^
  175 |   return data as unknown as Row;
  176 | }
  177 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:174:20)
    at snapshot (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:180:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1033:21
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1037:23
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  1722 |
  1723 |     await gotoReady(page, `/post/${listingId}`);
> 1724 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
       |                                                   ^
  1725 |     await page.getByTestId("post-back").click();
  1726 |     await expect(page.getByTestId("post-step-2")).toBeVisible();
  1727 |     const tiles = page.getByTestId("post-photo-stored");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1724:51
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-29-a-photo-that-may-not-fit-the-ad-is-stored-with-a-warning-the-seller-sees-and-no-visitor-reads-D154-B3-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-01965-d-no-visitor-reads-D154-B3--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

113 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>nq: e<n>e_par_makd<n> → e<n>e_chi_<n>xruns` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lklabo: e<n>e_par_mxn<n>bn → e<n>e_chi_c<n>z<n>wq` (quiet) | 1 | shard 1 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>nq: e<n>e_par_makd<n> → e<n>e_chi_<n>xruns ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lklabo: e<n>e_par_mxn<n>bn → e<n>e_chi_c<n>z<n>wq ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · the feed still loads when the market tree cannot be fetched (INC-282) ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-40 an address never reveals: only the visitor's own tap does (D201 §14) ×1 · AT-63 a swatch-only definitions file previews as one change ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T23:17:07.737Z | 23.1 min |
| email | 2026-10-19T23:17:06.096Z | 0.3 min |
| shard 1 | 2026-10-19T23:17:22.278Z | 47.8 min |
| shard 2 | 2026-10-19T23:17:07.749Z | 51.9 min |
| shard 3 | 2026-10-19T23:17:05.428Z | 45.4 min |
| shard 4 | 2026-10-19T23:16:58.674Z | 46.6 min |
| shard 5 | 2026-10-19T23:17:02.396Z | 47.2 min |
| shard 6 | 2026-10-19T23:16:58.201Z | 36.9 min |
| changed | 2026-10-19T23:17:00.905Z | 21.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `my-listings-ad.spec.ts` | 72 | 34.8 min | shard 2, shard 5, changed |
| `ad-page.spec.ts` | 68 | 30.6 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 28.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 27.3 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 20.5 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 19.6 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 52 | 18.7 min | shard 2, shard 5, changed |
| `posting-routes.spec.ts` | 80 | 18.3 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 17.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.0 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 16.0 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 15.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 15.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.0 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 56 | 14.4 min | shard 2, shard 5, changed |
| `auth-signout.spec.ts` | 56 | 14.2 min | smoke, shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 13.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 13.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.7 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 10.0 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 9.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 9.2 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.8 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 8.3 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.8 min | shard 3, shard 6 |
| `legal-admin.spec.ts` | 16 | 3.4 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.9 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 2.2 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 129.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 114.8 s |
| `my-listings-doors.spec.ts` › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) | mobile-360 | 105.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 96.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 91.9 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 85.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 70.1 s |
| `post-wizard-specs.spec.ts` › PW-155 {country} reads the country in Amharic | mobile-360 | 62.0 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 60.3 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 60.0 s |
| `posting-routes.spec.ts` › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city | desktop-1280 | 59.1 s |
| `photo-pipeline.spec.ts` › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3) | desktop-1280 | 58.2 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 55.2 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | desktop-1280 | 55.2 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 53.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39338384760-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39338384760-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39338384760-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39338384760-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39338384760-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39338384760-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39338384760-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39338384760-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39338384760-changed
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AP-37 seller at 713 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]
--- further error 1 ---
Error: AP-37 seller at 713 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]

  1038 |           sample.current,
  1039 |           `AP-37 ${target} at ${sample.elapsed} ms: current ${sample.current.join(",") || "none"}`,
> 1040 |         ).toEqual([target]);
       |           ^
  1041 |       }
  1042 |     };
  1043 |     const sellerItem = bar.locator('[data-target="seller"]');
    at sampleScroll (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1040:11)
```

Context:

```text
          - listitem [ref=e333]:
            - generic [ref=e334]: About
          - listitem [ref=e335]:
            - generic [ref=e336]: Contact
      - navigation "Help" [ref=e337]:
        - heading "Help" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - generic [ref=e341]: Safety
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - link "Terms" [ref=e346] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e347]:
            - link "Privacy" [ref=e348] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
```
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-lklabo: e2e_par_mxn0bn → e2e_chi_c2z9wq
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
