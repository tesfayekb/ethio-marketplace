# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39076424859
- Commit: `130586d0896614d2a9d64486a125ab17f3ea77eb`
- Attempt: 1
- Written (UTC): 2026-10-17T23:31:23.900Z
- Passed: 1900 · Skipped: 128 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('language-option-en')


   at helpers/ui.ts:1166

  1164 |   await waitForHydration(page);
  1165 |   await page.getByTestId("language-switcher").click();
> 1166 |   await page.getByTestId(`language-option-${code}`).click();
       |                                                     ^
  1167 |   await expect(page.locator("html")).toHaveAttribute("lang", code, { timeout: 15000 });
  1168 |   /**
  1169 |    * INC-173b — `html[lang]` flips from React state, and the durable record the
    at switchLanguage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1166:53)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1087:5
```

Context:

```text
          - listitem [ref=e317]:
            - generic [ref=e318]: ስለ እኛ
          - listitem [ref=e319]:
            - generic [ref=e320]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e321]:
        - heading "እገዛ" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - generic [ref=e325]: ደህንነት
          - listitem [ref=e326]:
            - generic [ref=e327]: ያግኙን
      - navigation "ሕጋዊ" [ref=e328]:
        - heading "ሕጋዊ" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: ውሎች
          - listitem [ref=e333]:
            - generic [ref=e334]: ግላዊነት
    - paragraph [ref=e336]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>owckz: e<n>e_par_<n>flzls → e<n>e_chi_otiks<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mv<n>rhy: e<n>e_par_ru<n>i<n>s → e<n>e_chi_jbonhk` (quiet) | 1 | shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>owckz: e<n>e_par_<n>flzls → e<n>e_chi_otiks<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mv<n>rhy: e<n>e_par_ru<n>i<n>s → e<n>e_chi_jbonhk ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · admin panel is absent for a normal signed-in user ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SC-21 Photo changes on live ads: a seller's additions, edit and removal are list ×1 · TR-23 machine translation keeps placeholders, and the editor repairs a mangled o ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T22:47:50.284Z | 16.0 min |
| email | 2026-10-17T22:47:50.580Z | 0.2 min |
| shard 1 | 2026-10-17T22:48:01.948Z | 41.5 min |
| shard 2 | 2026-10-17T22:48:09.709Z | 39.5 min |
| shard 3 | 2026-10-17T22:47:51.218Z | 29.8 min |
| shard 4 | 2026-10-17T22:47:58.088Z | 43.1 min |
| shard 5 | 2026-10-17T22:47:55.530Z | 37.3 min |
| shard 6 | 2026-10-17T22:47:53.797Z | 32.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 50 | 23.4 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 23.1 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 22.0 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 16.8 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.1 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 14.4 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 66 | 12.6 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 12.4 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 12.3 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 12.2 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 12.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 11.7 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.0 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 10.0 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 9.9 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.9 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 6.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 6.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.8 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 5.7 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.1 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.1 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `ad-page.spec.ts` › AP-41 the page's remaining lines | desktop-1280 | 133.6 s |
| `ad-page.spec.ts` › AP-41 the page's remaining lines | mobile-360 | 94.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 60.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 50.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.7 s |
| `ad-page.spec.ts` › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5) | desktop-1280 | 49.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 47.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.9 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 45.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 43.6 s |
| `ad-page-doors.spec.ts` › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) | desktop-1280 | 43.1 s |
| `ad-page.spec.ts` › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5) | mobile-360 | 42.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 42.4 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 42.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39076424859-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39076424859-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39076424859-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39076424859-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39076424859-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39076424859-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39076424859-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39076424859-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: locator.boundingBox: Error: strict mode violation: getByTestId('listing-detail-gallery') resolved to 2 elements:
    1) <div data-testid="listing-detail-gallery" class="relative order-1 min-w-0 @2xl:col-span-2 @4xl:col-span-1">…</div> aka getByTestId('listing-detail-gallery').first()
    2) <div class="@container" data-testid="listing-detail-gallery">…</div> aka getByTestId('listing-detail-gallery').nth(1)

Call log:
  - waiting for getByTestId('listing-detail-gallery')

--- further error 1 ---
Error: locator.boundingBox: Error: strict mode violation: getByTestId('listing-detail-gallery') resolved to 2 elements:
    1) <div data-testid="listing-detail-gallery" class="relative order-1 min-w-0 @2xl:col-span-2 @4xl:col-span-1">…</div> aka getByTestId('listing-detail-gallery').first()
    2) <div class="@container" data-testid="listing-detail-gallery">…</div> aka getByTestId('listing-detail-gallery').nth(1)

Call log:
  - waiting for getByTestId('listing-detail-gallery')


  817 |         .poll(async () => {
  818 |           const boxes = await Promise.all([
> 819 |             page.getByTestId("listing-detail-gallery").boundingBox(),
      |                                                        ^
  820 |             page.getByTestId("listing-detail-headline").boundingBox(),
  821 |           ]);
  822 |           const current = JSON.stringify(boxes);
    at Object.generator (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:819:56)
```

Context:

```text
          - listitem [ref=e342]:
            - generic [ref=e343]: About
          - listitem [ref=e344]:
            - generic [ref=e345]: How it works
      - navigation "Help" [ref=e346]:
        - heading "Help" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - generic [ref=e350]: Safety
          - listitem [ref=e351]:
            - generic [ref=e352]: Contact
      - navigation "Legal" [ref=e353]:
        - heading "Legal" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - generic [ref=e357]: Terms
          - listitem [ref=e358]:
            - generic [ref=e359]: Privacy
    - paragraph [ref=e361]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: locator.boundingBox: Error: strict mode violation: getByTestId('listing-detail-gallery') resolved to 2 elements:
    1) <div data-testid="listing-detail-gallery" class="relative order-1 min-w-0 @2xl:col-span-2 @4xl:col-span-1">…</div> aka getByTestId('listing-detail-gallery').first()
    2) <div class="@container" data-testid="listing-detail-gallery">…</div> aka getByTestId('listing-detail-gallery').nth(1)

Call log:
  - waiting for getByTestId('listing-detail-gallery')

--- further error 1 ---
Error: locator.boundingBox: Error: strict mode violation: getByTestId('listing-detail-gallery') resolved to 2 elements:
    1) <div data-testid="listing-detail-gallery" class="relative order-1 min-w-0 @2xl:col-span-2 @4xl:col-span-1">…</div> aka getByTestId('listing-detail-gallery').first()
    2) <div class="@container" data-testid="listing-detail-gallery">…</div> aka getByTestId('listing-detail-gallery').nth(1)

Call log:
  - waiting for getByTestId('listing-detail-gallery')


  817 |         .poll(async () => {
  818 |           const boxes = await Promise.all([
> 819 |             page.getByTestId("listing-detail-gallery").boundingBox(),
      |                                                        ^
  820 |             page.getByTestId("listing-detail-headline").boundingBox(),
  821 |           ]);
  822 |           const current = JSON.stringify(boxes);
    at Object.generator (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:819:56)
```

Context:

```text
          - listitem [ref=e355]:
            - generic [ref=e356]: About
          - listitem [ref=e357]:
            - generic [ref=e358]: How it works
      - navigation "Help" [ref=e359]:
        - heading "Help" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: Safety
          - listitem [ref=e364]:
            - generic [ref=e365]: Contact
      - navigation "Legal" [ref=e366]:
        - heading "Legal" [level=2] [ref=e367]
        - list [ref=e368]:
          - listitem [ref=e369]:
            - generic [ref=e370]: Terms
          - listitem [ref=e371]:
            - generic [ref=e372]: Privacy
    - paragraph [ref=e374]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-41 the page's remaining lines

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('language-option-en')
    - locator resolved to <div lang="en" tabindex="-1" role="menuitem" data-orientation="vertical" data-radix-collection-item="" data-testid="language-option-en" class="relative cursor-default select-none rounded-sm px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 flex min-w-0 items-center gap-1 py-0.5 pe-1 ps-2 leading-none">…</div>
  - attempting click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying


   at helpers/ui.ts:1166

  1164 |   await waitForHydration(page);
  1165 |   await page.getByTestId("language-switcher").click();
> 1166 |   await page.getByTestId(`language-option-${code}`).click();
       |                                                     ^
  1167 |   await expect(page.locator("html")).toHaveAttribute("lang", code, { timeout: 15000 });
  1168 |   /**
  1169 |    * INC-173b — `html[lang]` flips from React state, and the durable record the
    at switchLanguage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1166:53)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1087:5
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: ስለ እኛ
          - listitem [ref=e318]:
            - generic [ref=e319]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e320]:
        - heading "እገዛ" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: ደህንነት
          - listitem [ref=e325]:
            - generic [ref=e326]: ያግኙን
      - navigation "ሕጋዊ" [ref=e327]:
        - heading "ሕጋዊ" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: ውሎች
          - listitem [ref=e332]:
            - generic [ref=e333]: ግላዊነት
    - paragraph [ref=e335]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-4-4owckz: e2e_par_3flzls → e2e_chi_otiks9
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-5-mv1rhy: e2e_par_ru3i2s → e2e_chi_jbonhk
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
