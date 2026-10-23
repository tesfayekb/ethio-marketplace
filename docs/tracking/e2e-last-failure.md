# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39910796044 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39910796044
- Commit: `b0c01ef1a24952ac6c18220c4668d25034f81c50`
- Attempt: 1
- Written (UTC): 2026-10-23T06:38:48.186Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback — Error: admin shell: keys fell back to English

## Flaky bodies (DEC-078)

### i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 40

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
+   "nav.home => \"Home\"",
+   "panel.myListings => \"Seller Centre\"",
+   "nav.postShort => \"Post listing\"",
+   "impersonation.profileTitle => \"Account\"",
+   "admin.landing.title => \"Admin\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "panel.myListings => \"Seller Centre\"",
+   "impersonation.profileTitle => \"Account\"",
+   "admin.landing.title => \"Admin\"",
+   "admin.landing.title => \"Admin\"",
+   "nav.home => \"Home\"",
+   "admin.landing.title => \"Admin\"",
+   "app.tagline => \"Buy and sell\"",
+   "footer.sectionCompany => \"Company\"",
+   "footer.about => \"About\"",
+   "post.step.contact => \"Contact\"",
+   "footer.sectionHelp => \"Help\"",
+   "footer.safety => \"Safety\"",
+   "admin.users.legal.title => \"Legal\"",
+   "post.price.group.terms => \"Terms\"",
+   "footer.privacy => \"Privacy\"",
+   "footer.rights => \"All rights reserved.\"",
+   "admin.landing.title => \"Admin\"",
+   "admin.categories.col.listings => \"Listings\"",
+   "admin.listings.detail.back => \"All listings\"",
+   "admin.users.title => \"Users\"",
+   "admin.roles.title => \"Roles & Permissions\"",
+   "admin.audit.title => \"Audit & Security\"",
+   "admin.roles.perm.resource.locations => \"Locations\"",
+   "admin.overview.places => \"Places\"",
--- further error 1 ---
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 40

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
+   "nav.home => \"Home\"",
+   "panel.myListings => \"Seller Centre\"",
+   "nav.postShort => \"Post listing\"",
+   "impersonation.profileTitle => \"Account\"",
+   "admin.landing.title => \"Admin\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "panel.myListings => \"Seller Centre\"",
+   "impersonation.profileTitle => \"Account\"",
+   "admin.landing.title => \"Admin\"",
+   "admin.landing.title => \"Admin\"",
```

Context:

```text
          - listitem [ref=e245]:
            - generic [ref=e246]: ስለ እኛ
          - listitem [ref=e247]:
            - generic [ref=e248]: ያግኙን
      - navigation "እገዛ" [ref=e249]:
        - heading "እገዛ" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: ደህንነት
      - navigation "ሕጋዊ" [ref=e254]:
        - heading "ሕጋዊ" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - link "ውሎች" [ref=e258] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e259]:
            - link "ግላዊነት" [ref=e260] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e262]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

116 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 18 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 6 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 11 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `listing not found` | 4 | shard 7, shard 15 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 2, shard 10 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 6, shard 14 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>pc<n>eo: e<n>e_par_<n>dipqe → e<n>e_chi_po<n>gfy` (quiet) | 1 | shard 2 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-kpi<n>ye: e<n>e_par_<n>gie<n> → e<n>e_chi_<n>cfdha` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×18 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×6 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>pc<n>eo: e<n>e_par_<n>dipqe → e<n>e_chi_po<n>gfy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-kpi<n>ye: e<n>e_par_<n>gie<n> → e<n>e_chi_<n>cfdha ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 7, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-23T06:21:52.520Z | 10.5 min |
| email | 2026-10-23T06:22:44.016Z | 0.3 min |
| shard 1 | 2026-10-23T06:24:14.806Z | 9.6 min |
| shard 2 | 2026-10-23T06:21:57.935Z | 10.9 min |
| shard 3 | 2026-10-23T06:22:30.466Z | 12.8 min |
| shard 4 | 2026-10-23T06:22:13.105Z | 6.2 min |
| shard 5 | 2026-10-23T06:22:12.590Z | 6.4 min |
| shard 6 | 2026-10-23T06:22:32.181Z | 10.7 min |
| shard 7 | 2026-10-23T06:22:22.480Z | 6.7 min |
| shard 8 | 2026-10-23T06:22:09.208Z | 7.7 min |
| shard 9 | 2026-10-23T06:22:31.354Z | 9.8 min |
| shard 10 | 2026-10-23T06:21:44.809Z | 11.6 min |
| shard 11 | 2026-10-23T06:22:10.849Z | 12.6 min |
| shard 12 | 2026-10-23T06:26:37.019Z | 6.3 min |
| shard 13 | 2026-10-23T06:22:59.875Z | 10.4 min |
| shard 14 | 2026-10-23T06:22:27.665Z | 7.8 min |
| shard 15 | 2026-10-23T06:31:21.166Z | 6.6 min |
| shard 16 | 2026-10-23T06:25:06.480Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.7 min | smoke, shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.9 min | shard 6, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 7, shard 15 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.3 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `auth-signout.spec.ts` | 56 | 4.0 min | smoke, shard 3, shard 11 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 3.8 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 66 | 3.8 min | shard 5, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 68 | 3.2 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.1 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.9 min | shard 6, shard 14 |
| `admin-listings.spec.ts` | 62 | 2.7 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 2.1 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 5, shard 13 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 40 | 1.5 min | shard 4, shard 12 |
| `legal-certify.spec.ts` | 40 | 1.4 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.2 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 4, shard 12 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `settings.spec.ts` | 4 | 0.3 min | shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 4 | 0.2 min | email |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 28.4 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 26.6 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.4 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.6 s |
