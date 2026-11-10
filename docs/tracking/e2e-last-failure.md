# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 42792144721 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42792144721
- Commit: `e4fee1975245583ae7e2bff8b41668e597c5195a`
- Attempt: 1
- Written (UTC): 2026-11-10T09:56:33.797Z
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
+ Received  + 52

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
+   "legal.lang.en => \"English\"",
+   "nav.home => \"Home\"",
+   "head.myListing.title => \"My listing\"",
+   "nav.postShort => \"Post listing\"",
+   "account.overview.title => \"Account\"",
+   "admin.landing.title => \"Admin\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "panel.myListings => \"Seller Centre\"",
+   "account.overview.title => \"Account\"",
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
+   "admin.users.title => \"Users\"",
+   "admin.roles.title => \"Roles & Permissions\"",
+   "admin.audit.title => \"Audit & Security\"",
+   "admin.roles.perm.resource.locations => \"Locations\"",
+   "admin.nav.group.catalog => \"Catalog\"",
--- further error 1 ---
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 52

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
+   "legal.lang.en => \"English\"",
+   "nav.home => \"Home\"",
+   "head.myListing.title => \"My listing\"",
+   "nav.postShort => \"Post listing\"",
+   "account.overview.title => \"Account\"",
+   "admin.landing.title => \"Admin\"",
+   "navSection.marketplace => \"Marketplace\"",
+   "panel.myListings => \"Seller Centre\"",
+   "account.overview.title => \"Account\"",
+   "admin.landing.title => \"Admin\"",
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - link "Terms" [ref=e270] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e271]:
            - link "Privacy" [ref=e272] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
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
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-10T09:40:57.642Z | 14.1 min |
| email | 2026-11-10T09:40:39.630Z | 0.4 min |
| shard 1 | 2026-11-10T09:40:01.715Z | 12.6 min |
| shard 2 | 2026-11-10T09:39:27.493Z | 16.3 min |
| shard 3 | 2026-11-10T09:39:45.488Z | 8.9 min |
| shard 4 | 2026-11-10T09:40:19.910Z | 13.0 min |
| shard 5 | 2026-11-10T09:40:53.822Z | 9.8 min |
| shard 6 | 2026-11-10T09:39:59.677Z | 13.6 min |
| shard 7 | 2026-11-10T09:40:28.151Z | 4.8 min |
| shard 8 | 2026-11-10T09:40:00.494Z | 8.3 min |
| shard 9 | 2026-11-10T09:40:40.366Z | 14.8 min |
| shard 10 | 2026-11-10T09:39:20.517Z | 13.6 min |
| shard 11 | 2026-11-10T09:40:33.822Z | 12.4 min |
| shard 12 | 2026-11-10T09:41:20.051Z | 10.7 min |
| shard 13 | 2026-11-10T09:39:26.080Z | 7.4 min |
| shard 14 | 2026-11-10T09:41:29.020Z | 13.7 min |
| shard 15 | 2026-11-10T09:40:31.511Z | 4.6 min |
| shard 16 | 2026-11-10T09:40:02.773Z | 7.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.3 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 72 | 6.8 min | smoke, shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 5.5 min | shard 4, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 6, shard 14 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 6, shard 14 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 5, shard 13 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 2, shard 11 |
| `admin-listings.spec.ts` | 76 | 4.4 min | shard 2, shard 10 |
| `admin-locations.spec.ts` | 38 | 4.4 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `admin-roles.spec.ts` | 28 | 4.2 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 6, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 54 | 3.8 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 4, shard 12 |
| `photo-pipeline.spec.ts` | 68 | 3.1 min | shard 5, shard 13 |
| `sage-bands.spec.ts` | 76 | 3.0 min | shard 7, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3, shard 11 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 2.8 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.3 min | shard 5, shard 13 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `dialogs.spec.ts` | 14 | 1.6 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 7, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 11 |
| `sage-ad-page.spec.ts` | 18 | 1.1 min | shard 7, shard 15 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `admin-guides.spec.ts` | 14 | 0.9 min | shard 2, shard 10 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 28 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `submenu.spec.ts` | 14 | 0.2 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 5, shard 13 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 31.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
