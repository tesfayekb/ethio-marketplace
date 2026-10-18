# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39124546859 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39124546859
- Commit: `5e6f1c0e4bc3bfdfbdd7a147568639b13504d428`
- Attempt: 1
- Written (UTC): 2026-10-18T12:31:08.339Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge — Test timeout of 120000ms exceeded.

## Flaky bodies (DEC-078)

### admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('language-option-en')


   at helpers/ui.ts:1177

  1175 |   await waitForHydration(page);
  1176 |   await page.getByTestId("language-switcher").click();
> 1177 |   await page.getByTestId(`language-option-${code}`).click();
       |                                                     ^
  1178 |   await expect(page.locator("html")).toHaveAttribute("lang", code, { timeout: 15000 });
  1179 |   /**
  1180 |    * INC-173b — `html[lang]` flips from React state, and the durable record the
    at switchLanguage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1177:53)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:441:7
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:432:5
```

Context:

```text
          - listitem [ref=e1104]:
            - generic [ref=e1105]: ስለ እኛ
          - listitem [ref=e1106]:
            - generic [ref=e1107]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e1108]:
        - heading "እገዛ" [level=2] [ref=e1109]
        - list [ref=e1110]:
          - listitem [ref=e1111]:
            - generic [ref=e1112]: ደህንነት
          - listitem [ref=e1113]:
            - generic [ref=e1114]: ያግኙን
      - navigation "ሕጋዊ" [ref=e1115]:
        - heading "ሕጋዊ" [level=2] [ref=e1116]
        - list [ref=e1117]:
          - listitem [ref=e1118]:
            - generic [ref=e1119]: ውሎች
          - listitem [ref=e1120]:
            - generic [ref=e1121]: ግላዊነት
    - paragraph [ref=e1123]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lh<n>tsm: e<n>e_par_tnmbpy → e<n>e_chi_ms<n>a<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wmsbwe: e<n>e_par_oo<n>ly → e<n>e_chi_bqrj<n>m` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lh<n>tsm: e<n>e_par_tnmbpy → e<n>e_chi_ms<n>a<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wmsbwe: e<n>e_par_oo<n>ly → e<n>e_chi_bqrj<n>m ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T11:47:17.480Z | 18.6 min |
| email | 2026-10-18T11:47:13.265Z | 0.2 min |
| shard 1 | 2026-10-18T11:47:08.614Z | 38.2 min |
| shard 2 | 2026-10-18T11:47:09.613Z | 39.1 min |
| shard 3 | 2026-10-18T11:47:16.011Z | 35.6 min |
| shard 4 | 2026-10-18T11:47:10.053Z | 40.1 min |
| shard 5 | 2026-10-18T11:47:17.437Z | 43.5 min |
| shard 6 | 2026-10-18T11:47:07.280Z | 30.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 23.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.8 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 66 | 22.0 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 20.0 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 16.8 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 15.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.0 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 14.7 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 66 | 13.7 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 13.5 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.2 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.1 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.3 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 10.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 10.0 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 9.8 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 9.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.9 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 7.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 6.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.9 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.9 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 5.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.4 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.1 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.9 min | shard 1, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-console.spec.ts` › TR-9 the Amharic runtime still renders after the DB bundle merge | mobile-360 | 124.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 56.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 55.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 48.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 48.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 47.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 47.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 46.5 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 45.6 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 43.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 43.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 42.5 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 42.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 41.4 s |
