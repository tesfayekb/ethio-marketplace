# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40118998768
- Commit: `0d95c0dd56bd1c59f31ae6e71f711902d531a91a`
- Attempt: 1
- Written (UTC): 2026-10-24T22:44:17.281Z
- Passed: 2001 · Skipped: 98 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

101 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `[incident <uuid>] AbortError: The operation was aborted` | 5 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>hf<n>: e<n>e_par_<n>xz<n>w<n> → e<n>e_chi_ptc<n>me` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-tzwrjm: e<n>e_par_n<n>qnf<n> → e<n>e_chi_<n>e<n>gq` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>hf<n>: e<n>e_par_<n>xz<n>w<n> → e<n>e_chi_ptc<n>me ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-tzwrjm: e<n>e_par_n<n>qnf<n> → e<n>e_chi_<n>e<n>gq ×1

Off the allowlist:

### [incident <uuid>] AbortError: The operation was aborted

- Count: 5 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-23 the gallery draws the middle size, and on a computer a wide photo's top me ×2 · PP-24 a middle size over its cap is refused by name and nothing is stored (D162) ×2 · PW-117 two sub-cities of one city both save and count as that one city ×2 · PW-118 a draft's own channel is never overwritten by the last post's ×2 · PW-20 where: the default place lists itself, is ticked, and a lone city box offe ×1 · PW-33 a region alone never lists itself; its city does (W6 R2) ×1

```text
[WebServer] [ssr-error] /api/media/photo-links [incident 61a19a5b-2483-47fa-9a65-93fdd49b9cfc] AbortError: The operation was aborted
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-24T18:04:59.151Z | 3.5 min |
| full | 2026-10-24T18:08:30.213Z | 275.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 68 | 14.0 min | full |
| `post-wizard-specs.spec.ts` | 82 | 11.1 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 10.9 min | full |
| `admin-listings.spec.ts` | 62 | 10.9 min | full |
| `ad-page.spec.ts` | 68 | 10.8 min | full |
| `admin-screening.spec.ts` | 52 | 10.0 min | full |
| `shell.spec.ts` | 212 | 9.8 min | full |
| `posting-routes.spec.ts` | 80 | 7.9 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 7.9 min | full |
| `post-wizard-place.spec.ts` | 38 | 7.2 min | full |
| `my-listings-ad.spec.ts` | 36 | 6.9 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.9 min | full |
| `admin-translations-governance.spec.ts` | 20 | 6.9 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | full |
| `legal-certify.spec.ts` | 42 | 6.4 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.1 min | full |
| `post-wizard-category.spec.ts` | 48 | 6.0 min | full |
| `feed-screens.spec.ts` | 36 | 5.9 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.7 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.7 min | full |
| `post-wizard-resets.spec.ts` | 34 | 5.7 min | full |
| `admin-locations.spec.ts` | 38 | 5.6 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.6 min | full |
| `admin-users.spec.ts` | 28 | 5.3 min | full |
| `viewing-place.spec.ts` | 22 | 5.1 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.9 min | full |
| `admin-roles.spec.ts` | 26 | 4.8 min | full |
| `ad-page-doors.spec.ts` | 30 | 4.7 min | full |
| `my-listings-doors.spec.ts` | 28 | 4.6 min | full |
| `legal-admin.spec.ts` | 42 | 4.0 min | full |
| `import-security.spec.ts` | 36 | 3.9 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.8 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `admin-attributes-import.spec.ts` | 40 | 3.4 min | full |
| `my-listings-page.spec.ts` | 16 | 3.3 min | full |
| `auth-signout.spec.ts` | 28 | 3.3 min | full |
| `legal-doors.spec.ts` | 34 | 3.1 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.7 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `feed-index.spec.ts` | 30 | 2.5 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | full |
| `admin-audit.spec.ts` | 14 | 2.3 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.2 min | full |
| `feed-route.spec.ts` | 22 | 2.1 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `admin-shell.spec.ts` | 12 | 1.5 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.4 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `auth-caller-gates.spec.ts` | 8 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.1 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.0 min | full |
| `legal-accept.spec.ts` | 12 | 0.9 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.8 min | full |
| `phone-frame.spec.ts` | 18 | 0.8 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `legal-history.spec.ts` | 6 | 0.6 min | full |
| `account-saved.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.5 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 224.5 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.3 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 34.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 32.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 31.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.9 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.8 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 40118998768-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 80 (pool 2, fresh 78)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 112 user(s) owned by process 40118998768-nightly
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback

- Source: `full`
- Project: `desktop-1280`

```text
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 17

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
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
+ ]
--- further error 1 ---
Error: admin shell: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 17

- Array []
+ Array [
+   "shell.searchPlaceholder => \"Search listings\"",
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

## Server errors: full

```text
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
[WebServer] [ssr-error] /api/media/photo-links [incident f9ef0231-822a-40e2-aaac-e3b7160224c6] AbortError: The operation was aborted
[WebServer] [ssr-error] /api/listings/alias [incident cf107719-af2d-49c3-a5d8-e70f07abcb0e] AbortError: The operation was aborted
[WebServer] [ssr-error] /api/listings/alias [incident 084dd489-c504-478f-9906-e9c0393f4e65] AbortError: The operation was aborted
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
