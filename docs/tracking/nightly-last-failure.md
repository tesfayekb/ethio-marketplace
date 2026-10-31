# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41215529335
- Commit: `57c72d3c23d094fbdcb361463f2d57763d0d197e`
- Attempt: 1
- Written (UTC): 2026-10-31T20:08:09.692Z
- Passed: 2255 · Skipped: 297 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-31T15:35:46.779Z | 3.6 min |
| full | 2026-10-31T15:39:21.441Z | 268.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 11.3 min | full |
| `photo-pipeline.spec.ts` | 68 | 11.0 min | full |
| `post-wizard-specs.spec.ts` | 82 | 9.3 min | full |
| `ad-page.spec.ts` | 78 | 9.2 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 9.0 min | full |
| `admin-screening.spec.ts` | 52 | 8.3 min | full |
| `admin-listings.spec.ts` | 62 | 8.3 min | full |
| `import-security.spec.ts` | 36 | 8.1 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 6.4 min | full |
| `posting-routes.spec.ts` | 80 | 6.3 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 6.2 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.0 min | full |
| `my-listings-ad.spec.ts` | 36 | 5.8 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.7 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | full |
| `admin-locations.spec.ts` | 38 | 5.5 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.5 min | full |
| `feed-screens.spec.ts` | 36 | 5.4 min | full |
| `post-wizard-category.spec.ts` | 48 | 5.2 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.2 min | full |
| `admin-users.spec.ts` | 28 | 5.1 min | full |
| `legal-certify.spec.ts` | 42 | 5.0 min | full |
| `admin-roles.spec.ts` | 26 | 4.9 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.8 min | full |
| `viewing-place.spec.ts` | 22 | 4.8 min | full |
| `post-wizard-resets.spec.ts` | 34 | 4.7 min | full |
| `choice-lists.spec.ts` | 96 | 4.5 min | full |
| `auth-signout.spec.ts` | 34 | 4.4 min | full |
| `sage-bands.spec.ts` | 76 | 4.4 min | full |
| `legal-admin.spec.ts` | 42 | 3.7 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.5 min | nightly |
| `admin-attributes-safety.spec.ts` | 18 | 3.5 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.4 min | full |
| `my-listings-doors.spec.ts` | 28 | 3.1 min | full |
| `ad-page-doors.spec.ts` | 30 | 3.0 min | full |
| `my-listings-page.spec.ts` | 16 | 2.6 min | full |
| `admin-countries.spec.ts` | 18 | 2.6 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.5 min | full |
| `legal-doors.spec.ts` | 34 | 2.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 2.1 min | full |
| `admin-audit.spec.ts` | 14 | 2.1 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.1 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.0 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | full |
| `admin-shell.spec.ts` | 12 | 1.7 min | full |
| `feed-index.spec.ts` | 30 | 1.6 min | full |
| `name-check-queue.spec.ts` | 8 | 1.4 min | full |
| `feed-route.spec.ts` | 22 | 1.3 min | full |
| `i18n-sign-in-language.spec.ts` | 12 | 1.3 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.2 min | full |
| `phone-frame.spec.ts` | 18 | 1.2 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.0 min | full |
| `supabase-door.spec.ts` | 12 | 1.0 min | full |
| `sage-shell.spec.ts` | 80 | 0.9 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.9 min | full |
| `legal-accept.spec.ts` | 12 | 0.9 min | full |
| `sage-cards.spec.ts` | 30 | 0.9 min | full |
| `auth-caller-gates.spec.ts` | 8 | 0.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.5 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.5 min | full |
| `primitives-law.spec.ts` | 24 | 0.5 min | full |
| `legal-history.spec.ts` | 6 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `account-saved.spec.ts` | 4 | 0.4 min | full |
| `house-style.spec.ts` | 12 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `settings.spec.ts` | 9 | 0.4 min | full |
| `shell-bands.spec.ts` | 16 | 0.4 min | full |
| `page-head.spec.ts` | 4 | 0.4 min | full |
| `submenu.spec.ts` | 14 | 0.4 min | full |
| `category-image-routes.spec.ts` | 10 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.3 min | full |
| `submenu-look.spec.ts` | 12 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `menu-rows.spec.ts` | 6 | 0.2 min | full |
| `seller-name-hidden.spec.ts` | 2 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `locale-format.spec.ts` | 2 | 0.2 min | full |
| `ad-page-layout.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `overlay-shift.spec.ts` | 6 | 0.1 min | full |
| `i18n-layers.spec.ts` | 6 | 0.1 min | full |
| `submenu-touch.spec.ts` | 8 | 0.1 min | full |
| `overlays.spec.ts` | 6 | 0.1 min | full |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | full |
| `dark-cards.spec.ts` | 4 | 0.1 min | full |
| `fonts.spec.ts` | 2 | 0.0 min | full |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 208.0 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 119.3 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 54.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 53.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.0 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | mobile-360 | 36.7 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | desktop-1280 | 36.1 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 32.2 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41215529335-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 82 (pool 2, fresh 80)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 114 user(s) owned by process 41215529335-nightly
```

## admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `full`
- Project: `desktop-1280`

```text
Error: CO-6: the rail save refused notARoot twice
--- further error 1 ---
Error: CO-6: the rail save refused notARoot twice

  337 |           await saveSwap(pair[0]);
  338 |           if ((await outcome(pair[0], pair[1])) === "notARoot") {
> 339 |             throw new Error("CO-6: the rail save refused notARoot twice");
      |                   ^
  340 |           }
  341 |         }
  342 |         // Relative, never absolute: a sibling's scratch root may cascade away.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:339:19
```

Context:

```text
        - listitem [ref=e172]:
          - generic [ref=e173]: 42. e2e-post-local-2-v0wo1h
          - button "Move up" [ref=e174] [cursor=pointer]: ↑
          - button "Move down" [ref=e175] [cursor=pointer]: ↓
        - listitem [ref=e176]:
          - generic [ref=e177]: 43. e2e-post-local-3-pl04e8
          - button "Move up" [ref=e178] [cursor=pointer]: ↑
          - button "Move down" [ref=e179] [cursor=pointer]: ↓
        - listitem [ref=e180]:
          - generic [ref=e181]: 44. e2e-post-nightly-8-ulthia
          - button "Move up" [ref=e182] [cursor=pointer]: ↑
          - button "Move down" [disabled]: ↓
      - alert [ref=e183]: Only a root category can be ordered on the rail.
      - generic [ref=e184]:
        - button "Reset order" [ref=e185] [cursor=pointer]
        - button "Save order" [ref=e186] [cursor=pointer]
    - button "Close" [ref=e187] [cursor=pointer]:
      - img [ref=e188]
      - generic [ref=e191]: Close
```
```

## house-style.spec.ts › house style fixture › HS-2 axe is clean in light and in dark mode

- Source: `full`
- Project: `mobile-360`

```text
Error: dev-style dark

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "serious:color-contrast×1",
+ ]
--- further error 1 ---
Error: dev-style dark

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "serious:color-contrast×1",
+ ]

  24 |     .map((v) => `${v.impact}:${v.id}×${v.nodes.length}`);
  25 |   console.log(`[a11y] dev-style ${mode} ${test.info().project.name} ${rules.join(" ") || "clean"}`);
> 26 |   expect(rules, `dev-style ${mode}`).toEqual([]);
     |                                      ^
  27 | }
  28 |
  29 | /** A ring is drawn when some box-shadow layer has a visible colour and a spread above 0. */
    at seriousOrCritical (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/house-style.spec.ts:26:38)
```

Context:

```text
          - listitem [ref=e967]:
            - generic [ref=e968]: About
          - listitem [ref=e969]:
            - generic [ref=e970]: Contact
      - navigation "Help" [ref=e971]:
        - heading "Help" [level=2] [ref=e972]
        - list [ref=e973]:
          - listitem [ref=e974]:
            - generic [ref=e975]: Safety
      - navigation "Legal" [ref=e976]:
        - heading "Legal" [level=2] [ref=e977]
        - list [ref=e978]:
          - listitem [ref=e979]:
            - link "Terms" [ref=e980] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e981]:
            - link "Privacy" [ref=e982] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e984]: © 2026 ethio.com — All rights reserved.
```
```

## house-style.spec.ts › house style fixture › HS-2 axe is clean in light and in dark mode

- Source: `full`
- Project: `desktop-1280`

```text
Error: dev-style dark

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "serious:color-contrast×1",
+ ]
--- further error 1 ---
Error: dev-style dark

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "serious:color-contrast×1",
+ ]

  24 |     .map((v) => `${v.impact}:${v.id}×${v.nodes.length}`);
  25 |   console.log(`[a11y] dev-style ${mode} ${test.info().project.name} ${rules.join(" ") || "clean"}`);
> 26 |   expect(rules, `dev-style ${mode}`).toEqual([]);
     |                                      ^
  27 | }
  28 |
  29 | /** A ring is drawn when some box-shadow layer has a visible colour and a spread above 0. */
    at seriousOrCritical (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/house-style.spec.ts:26:38)
```

Context:

```text
          - listitem [ref=e1041]:
            - generic [ref=e1042]: About
          - listitem [ref=e1043]:
            - generic [ref=e1044]: Contact
      - navigation "Help" [ref=e1045]:
        - heading "Help" [level=2] [ref=e1046]
        - list [ref=e1047]:
          - listitem [ref=e1048]:
            - generic [ref=e1049]: Safety
      - navigation "Legal" [ref=e1050]:
        - heading "Legal" [level=2] [ref=e1051]
        - list [ref=e1052]:
          - listitem [ref=e1053]:
            - link "Terms" [ref=e1054] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1055]:
            - link "Privacy" [ref=e1056] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1058]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"}) ×2
```
