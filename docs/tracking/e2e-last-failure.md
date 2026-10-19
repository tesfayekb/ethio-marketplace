# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39266201899
- Commit: `9bc5f89579729b0990311a921bdab977bd16eb08`
- Attempt: 1
- Written (UTC): 2026-10-19T15:08:35.578Z
- Passed: 2120 · Skipped: 155 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-19 a category import commit refreshes the finder index before any search — Error: PR-19: the commit did not refresh the finder index

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  198 |       await stepUpIfPrompted(page, secret);
  199 |
> 200 |       await expect.poll(async () => await readCategory(slug), { timeout: 20000 }).toBeNull();
      |       ^
  201 |       await expect(categoryRow(page, slug)).toHaveCount(0);
  202 |       expect((await readPointers(id)).length).toBe(0);
  203 |       const { data: excl } = await supabase
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:200:7
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: Contact
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
      - navigation "Legal" [ref=e295]:
        - heading "Legal" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - link "Terms" [ref=e299] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e300]:
            - link "Privacy" [ref=e301] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e303]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_listing_policy ({"code":"P0001","details":null,"hint":null,"message":"renew days are 1 to 365"})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_listing_policy ({"code":"P0001","details":null,"hint":null,"message":"renew days are 1 to 365"})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_listing_policy ({"code":"P0001","details":null,"hint":null,"message":"renew days are 1 to 365"})
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes.spec.ts › POSTING ROUTES › PR-19 a category import commit refreshes the finder index before any search

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PR-19: the commit did not refresh the finder index

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: PR-19: the commit did not refresh the finder index

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  705 |       .limit(1);
  706 |     if (indexError) throw new Error(`[e2e:pr-19] reading the index failed: ${indexError.message}`);
> 707 |     expect(indexed ?? [], "PR-19: the commit did not refresh the finder index").toHaveLength(1);
      |                                                                                 ^
  708 |   });
  709 |
  710 |   /**
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:707:81
```

Context:

```text
          - listitem [ref=e1527]:
            - generic [ref=e1528]: About
          - listitem [ref=e1529]:
            - generic [ref=e1530]: Contact
      - navigation "Help" [ref=e1531]:
        - heading "Help" [level=2] [ref=e1532]
        - list [ref=e1533]:
          - listitem [ref=e1534]:
            - generic [ref=e1535]: Safety
      - navigation "Legal" [ref=e1536]:
        - heading "Legal" [level=2] [ref=e1537]
        - list [ref=e1538]:
          - listitem [ref=e1539]:
            - link "Terms" [ref=e1540] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1541]:
            - link "Privacy" [ref=e1542] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1544]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

116 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 14 | shard 3, shard 6 |
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
| `catalog_find_refresh: canceling statement due to statement timeout` | 1 | shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-laspfp: e<n>e_par_ybk<n> → e<n>e_chi_k<n>ietn` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>aoqf: e<n>e_par_<n>v<n>vw → e<n>e_chi_<n>ntgla` (quiet) | 1 | shard 4 |
| `name_folds_rebuild: canceling statement due to statement timeout` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-laspfp: e<n>e_par_ybk<n> → e<n>e_chi_k<n>ietn ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>aoqf: e<n>e_par_<n>v<n>vw → e<n>e_chi_<n>ntgla ×1

Off the allowlist:

### listing not found

- Count: 14 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-108 an Other basis names the seller's written unit (INC-371) ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### catalog_find_refresh: canceling statement due to statement timeout

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): md+ rail: items scroll, header fixed ×1 · PR-19 a category import commit refreshes the finder index before any search ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
```

### name_folds_rebuild: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CT-19 a create and a rename commit through the doors and undo ×1 · CT-36 a created leaf gets its secondary parents and the undo removes both pointe ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import name_folds_rebuild: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T14:17:56.914Z | 21.9 min |
| email | 2026-10-19T14:18:00.677Z | 0.3 min |
| shard 1 | 2026-10-19T14:17:59.610Z | 50.1 min |
| shard 2 | 2026-10-19T14:18:00.324Z | 50.1 min |
| shard 3 | 2026-10-19T14:17:54.083Z | 39.4 min |
| shard 4 | 2026-10-19T14:17:52.687Z | 47.8 min |
| shard 5 | 2026-10-19T14:17:50.580Z | 43.9 min |
| shard 6 | 2026-10-19T14:17:54.162Z | 37.5 min |
| changed | 2026-10-19T14:17:54.894Z | 4.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 28.9 min | shard 1, shard 4 |
| `shell.spec.ts` | 424 | 27.8 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 26.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 25.1 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.8 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 19.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.2 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 48 | 16.9 min | shard 2, shard 5, changed |
| `post-wizard-pricing.spec.ts` | 52 | 16.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.9 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 15.5 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.2 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.9 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 13.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 13.6 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 36 | 13.4 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 13.2 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 11.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.6 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 10.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.6 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.9 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.9 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.3 min | shard 3, shard 6 |
| `legal-doors.spec.ts` | 28 | 6.3 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `legal-admin.spec.ts` | 16 | 3.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.8 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `legal-accept.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.5 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) | mobile-360 | 108.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 89.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-13 lifecycle: a typed-slug delete removes the row and its dependents | mobile-360 | 76.3 s |
| `my-listings-ad.spec.ts` › MLA-11 the ad's page says what buyers see; its marks and its picture's ribbon (D180) | mobile-360 | 68.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 64.8 s |
| `posting-routes.spec.ts` › PR-19 a category import commit refreshes the finder index before any search | desktop-1280 | 61.5 s |
| `my-listings-page.spec.ts` › MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469) | desktop-1280 | 60.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-19 a create and a rename commit through the doors and undo | desktop-1280 | 58.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.9 s |
| `photo-pipeline.spec.ts` › PP-3 a PDF renamed .jpg is refused unsupportedFormat | desktop-1280 | 54.7 s |
| `admin-categories-console.spec.ts` › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) | mobile-360 | 53.6 s |
| `shell.spec.ts` › md+ rail: items scroll, header fixed | desktop-1280 | 52.3 s |
| `posting-routes.spec.ts` › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) | mobile-360 | 52.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.2 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 51.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39266201899-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39266201899-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39266201899-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39266201899-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39266201899-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39266201899-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39266201899-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39266201899-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39266201899-changed
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  710 |       const changes = { title: `e2e once changed ${rand()}` };
  711 |       const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 712 |       expect(bare.error).toContain("certificationRequired");
      |                          ^
  713 |       const certified = await me.rpc("edit_my_listing", {
  714 |         p_listing_id: a,
  715 |         p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:712:26
```

Context:

```text
          - listitem [ref=e277]:
            - generic [ref=e278]: About
          - listitem [ref=e279]:
            - generic [ref=e280]: Contact
      - navigation "Help" [ref=e281]:
        - heading "Help" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Safety
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - link "Terms" [ref=e290] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e291]:
            - link "Privacy" [ref=e292] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  710 |       const changes = { title: `e2e once changed ${rand()}` };
  711 |       const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 712 |       expect(bare.error).toContain("certificationRequired");
      |                          ^
  713 |       const certified = await me.rpc("edit_my_listing", {
  714 |         p_listing_id: a,
  715 |         p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:712:26
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

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  710 |       const changes = { title: `e2e once changed ${rand()}` };
  711 |       const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 712 |       expect(bare.error).toContain("certificationRequired");
      |                          ^
  713 |       const certified = await me.rpc("edit_my_listing", {
  714 |         p_listing_id: a,
  715 |         p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:712:26
```

Context:

```text
          - listitem [ref=e277]:
            - generic [ref=e278]: About
          - listitem [ref=e279]:
            - generic [ref=e280]: Contact
      - navigation "Help" [ref=e281]:
        - heading "Help" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Safety
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - link "Terms" [ref=e290] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e291]:
            - link "Privacy" [ref=e292] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  710 |       const changes = { title: `e2e once changed ${rand()}` };
  711 |       const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 712 |       expect(bare.error).toContain("certificationRequired");
      |                          ^
  713 |       const certified = await me.rpc("edit_my_listing", {
  714 |         p_listing_id: a,
  715 |         p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:712:26
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

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×3
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_listing_policy ({"code":"P0001","details":null,"hint":null,"message":"renew days are 1 to 365"}) ×3
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
