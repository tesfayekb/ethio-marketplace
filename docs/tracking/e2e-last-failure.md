# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39711964713 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39711964713
- Commit: `122343deafca749e637ee6c7ff03028d2aec90ec`
- Attempt: 1
- Written (UTC): 2026-10-22T02:49:53.795Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 12` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback — Error: admin shell: keys fell back to English

## Flaky bodies (DEC-078)

### i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 25

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
+   "nav.home => \"Home\"",
+   "panel.myListings => \"Seller Centre\"",
+   "nav.postShort => \"Post listing\"",
+   "impersonation.profileTitle => \"Account\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "panel.myListings => \"Seller Centre\"",
+   "impersonation.profileTitle => \"Account\"",
+   "navSection.marketplace => \"Marketplace\"",
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
+   "navSection.marketplace => \"Marketplace\"",
+   "auth.signOut => \"Sign out\"",
+ ]
--- further error 1 ---
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 25

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
+   "nav.home => \"Home\"",
+   "panel.myListings => \"Seller Centre\"",
+   "nav.postShort => \"Post listing\"",
+   "impersonation.profileTitle => \"Account\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "panel.myListings => \"Seller Centre\"",
+   "impersonation.profileTitle => \"Account\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "nav.home => \"Home\"",
+   "admin.landing.title => \"Admin\"",
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: ስለ እኛ
          - listitem [ref=e293]:
            - generic [ref=e294]: ያግኙን
      - navigation "እገዛ" [ref=e295]:
        - heading "እገዛ" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: ደህንነት
      - navigation "ሕጋዊ" [ref=e300]:
        - heading "ሕጋዊ" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "ውሎች" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "ግላዊነት" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

121 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 22 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 6 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 11 |
| `listing not found` | 5 | shard 7, shard 14, shard 15 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-bw<n>ld: e<n>e_par_vygpnc → e<n>e_chi_<n>rcjqt` (quiet) | 1 | shard 2 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-poklnu: e<n>e_par_fm<n>e<n>q → e<n>e_chi_t<n>o<n>p` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×22 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×6 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-bw<n>ld: e<n>e_par_vygpnc → e<n>e_chi_<n>rcjqt ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-poklnu: e<n>e_par_fm<n>e<n>q → e<n>e_chi_t<n>o<n>p ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 7, shard 14, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1

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
| smoke | 2026-10-22T02:36:28.439Z | 11.1 min |
| email | 2026-10-22T02:35:36.858Z | 0.2 min |
| shard 1 | 2026-10-22T02:35:06.256Z | 8.2 min |
| shard 2 | 2026-10-22T02:35:51.113Z | 13.3 min |
| shard 3 | 2026-10-22T02:35:56.641Z | 13.2 min |
| shard 4 | 2026-10-22T02:35:40.958Z | 6.9 min |
| shard 5 | 2026-10-22T02:35:29.046Z | 5.8 min |
| shard 6 | 2026-10-22T02:37:13.790Z | 10.6 min |
| shard 7 | 2026-10-22T02:35:20.540Z | 6.4 min |
| shard 8 | 2026-10-22T02:37:10.476Z | 7.6 min |
| shard 9 | 2026-10-22T02:35:31.404Z | 9.8 min |
| shard 10 | 2026-10-22T02:35:14.685Z | 12.2 min |
| shard 11 | 2026-10-22T02:36:36.434Z | 11.9 min |
| shard 12 | 2026-10-22T02:35:07.002Z | 5.7 min |
| shard 13 | 2026-10-22T02:35:56.833Z | 10.3 min |
| shard 14 | 2026-10-22T02:37:22.290Z | 7.8 min |
| shard 15 | 2026-10-22T02:34:59.725Z | 5.8 min |
| shard 16 | 2026-10-22T02:35:01.162Z | 6.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.5 min | smoke, shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.9 min | shard 6, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 7, shard 15 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 2, shard 10 |
| `auth-signout.spec.ts` | 56 | 4.0 min | smoke, shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `admin-listings.spec.ts` | 62 | 3.4 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 66 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 68 | 2.8 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 2.1 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 40 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 40 | 1.4 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `settings.spec.ts` | 4 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 4 | 0.2 min | email |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.0 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.7 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 25.5 s |
