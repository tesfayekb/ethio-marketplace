# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42385875615
- Commit: `8a4a4f29a6d3c06ffc3ce3b328a13cecce1e9420`
- Attempt: 1
- Written (UTC): 2026-11-07T15:40:50.017Z
- Passed: 2500 · Skipped: 366 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: shard 11
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 5` · one-line-slots.spec.ts › OLS-1 the home heading and the signed-out bar fit in every public language — Error: the switcher lists the public languages

## Flaky bodies (DEC-078)

### one-line-slots.spec.ts › OLS-1 the home heading and the signed-out bar fit in every public language

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: the switcher lists the public languages

expect(received).toContain(expected) // indexOf

Expected value: "en"
Received array: []
--- further error 1 ---
Error: the switcher lists the public languages

expect(received).toContain(expected) // indexOf

Expected value: "en"
Received array: []

  45 |   await page.keyboard.press("Escape");
  46 |   await expect(page.getByRole("menu")).toHaveCount(0);
> 47 |   expect(languages, "the switcher lists the public languages").toContain("en");
     |                                                                ^
  48 |   return languages;
  49 | }
  50 |
    at publicLanguages (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots.spec.ts:47:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/one-line-slots.spec.ts:74:21
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (17 of 18 results files read, 17 of 18 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: shard 11. The start log's error lines, redacted, from `shard 11` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql...
ERROR: duplicate key value violates unique constraint "languages_pkey" (SQLSTATE 23505)
Server record (DEC-340, stream):
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres ERROR:  duplicate key value violates unique constraint "languages_pkey"
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres DETAIL:  Key (code)=(qc9) already exists.
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
	    VALUES (v_lang_on, v_tag || ' on', v_tag, true, false, 9001), (v_lang_off, v_tag || ' off', v_tag, false, false, 9002)"
	PL/pgSQL function inline_code_block line 93 at SQL statement
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(137 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: shard 11

`shard 11`: log unavailable.

70 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `tooManyPhotos:<n>` | 8 | shard 5, shard 13 |
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

Off the allowlist:

### tooManyPhotos:<n>

- Count: 8 · Sources: shard 5, shard 13
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-25 an edited photo takes the old photo's place; its objects go; at the cap it ×6 · PP-7 the eleventh photo is refused tooManyPhotos (retry #1) ×4 · PP-26 a refused edit leaves the old photo as it was; a photo not on the listing  ×2 · PP-7 the eleventh photo is refused tooManyPhotos ×2 · PP-8 DELETE removes the row and the objects; POST makes a photo the cover ×2

```text
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: shard 11

`shard 11`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: shard 11

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-07T15:26:19.008Z | 14.0 min |
| email | 2026-11-07T15:23:47.516Z | 0.3 min |
| shard 1 | 2026-11-07T15:23:29.510Z | 12.7 min |
| shard 2 | 2026-11-07T15:23:08.810Z | 16.3 min |
| shard 3 | 2026-11-07T15:23:18.012Z | 8.5 min |
| shard 4 | 2026-11-07T15:25:41.842Z | 12.3 min |
| shard 5 | 2026-11-07T15:23:37.445Z | 10.7 min |
| shard 6 | 2026-11-07T15:25:00.312Z | 13.1 min |
| shard 7 | 2026-11-07T15:23:33.029Z | 4.4 min |
| shard 8 | 2026-11-07T15:23:09.200Z | 8.3 min |
| shard 9 | 2026-11-07T15:22:54.159Z | 11.9 min |
| shard 10 | 2026-11-07T15:23:34.332Z | 16.1 min |
| shard 12 | 2026-11-07T15:22:59.169Z | 11.2 min |
| shard 13 | 2026-11-07T15:23:40.523Z | 9.3 min |
| shard 14 | 2026-11-07T15:23:32.640Z | 13.3 min |
| shard 15 | 2026-11-07T15:22:56.629Z | 3.3 min |
| shard 16 | 2026-11-07T15:24:19.473Z | 8.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.7 min | smoke, shard 8, shard 16 |
| `import-security.spec.ts` | 36 | 5.5 min | shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 5, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.1 min | shard 1, shard 9 |
| `auth-signout.spec.ts` | 54 | 5.0 min | smoke, shard 3 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 76 | 4.2 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 54 | 4.1 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 6, shard 14 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `post-wizard-category.spec.ts` | 48 | 3.9 min | shard 5, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.6 min | shard 1, shard 9 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.6 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 4, shard 12 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 2.8 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `ad-page.spec.ts` | 78 | 2.6 min | shard 1, shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.3 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 22 | 2.2 min | shard 2 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 4, shard 12 |
| `admin-users.spec.ts` | 14 | 1.8 min | shard 3 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 4, shard 12 |
| `choice-lists.spec.ts` | 48 | 1.5 min | shard 3 |
| `admin-attributes-import.spec.ts` | 40 | 1.3 min | shard 1, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 5 | 1.0 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `sage-tiers.spec.ts` | 40 | 0.9 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `admin-translations-governance.spec.ts` | 4 | 0.9 min | shard 3 |
| `sage-ad-page.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `my-listings-promote.spec.ts` | 8 | 0.8 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `my-listings-levels.spec.ts` | 26 | 0.6 min | shard 5, shard 13 |
| `dialogs.spec.ts` | 7 | 0.6 min | shard 3 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `admin-shell.spec.ts` | 6 | 0.4 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `shell-bands.spec.ts` | 16 | 0.2 min | shard 8, shard 15 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `auth-caller-gates.spec.ts` | 4 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 1, shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `breadcrumbs.spec.ts` | 3 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 5 | 0.1 min | shard 3 |
| `feed-index.spec.ts` | 15 | 0.1 min | shard 3 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `feed-route.spec.ts` | 11 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `door-refusals.spec.ts` | 6 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.0 min | shard 1, shard 9 |
| `category-image-routes.spec.ts` | 5 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `dark-cards.spec.ts` | 2 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.6 s |
| `post-wizard-category.spec.ts` › PW-29 the photos caption counts against the plan's cap | mobile-360 | 44.8 s |
| `post-wizard-category.spec.ts` › PW-29 the photos caption counts against the plan's cap | desktop-1280 | 44.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42385875615-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42385875615-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42385875615-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42385875615-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42385875615-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42385875615-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42385875615-local-10
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42385875615-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-16
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  296 |       const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
  297 |       expect(answer.status, `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(200);
> 298 |       expect(answer.payload["ok"], `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(
      |                                                                                              ^
  299 |         true,
  300 |       );
  301 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:298:94
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99f02-to-is-refused-tooManyPhotos-mobile-360`; this run carried 1 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1484 |     for (let index = 2; index < 10; index += 1) {
  1485 |       const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
> 1486 |       expect(answer.payload["ok"], `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(
       |                                                                                              ^
  1487 |         true,
  1488 |       );
  1489 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1486:94
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-25-an-edited-photo-takes-the-old-photo-s-place-its-objects-go-at-the-cap-it-is-still-taken-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2fc14--it-is-still-taken-D154-B2--mobile-360`; this run carried 1 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PW-29: the caption never rendered the plan's cap

expect(locator).toContainText(expected) failed

Locator: getByTestId('post-photos-count')
Expected substring: "10"
Received string:    "0 of 4"
Timeout: 20000ms

Call log:
  - PW-29: the caption never rendered the plan's cap with timeout 20000ms
  - waiting for getByTestId('post-photos-count')
    24 × locator resolved to <p data-testid="post-photos-count" class="text-xs text-muted-foreground">0 of 4</p>
       - unexpected value "0 of 4"

--- further error 1 ---
Error: PW-29: the caption never rendered the plan's cap

expect(locator).toContainText(expected) failed

Locator: getByTestId('post-photos-count')
Expected substring: "10"
Received string:    "0 of 4"
Timeout: 20000ms

Call log:
  - PW-29: the caption never rendered the plan's cap with timeout 20000ms
  - waiting for getByTestId('post-photos-count')
    24 × locator resolved to <p data-testid="post-photos-count" class="text-xs text-muted-foreground">0 of 4</p>
       - unexpected value "0 of 4"


  1293 |
  1294 |     const caption = page.getByTestId("post-photos-count");
> 1295 |     await expect(caption, "PW-29: the caption never rendered the plan's cap").toContainText(
       |                                                                               ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-mobile-360` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-mobile-360`; this run carried 1 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  296 |       const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
  297 |       expect(answer.status, `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(200);
> 298 |       expect(answer.payload["ok"], `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(
      |                                                                                              ^
  299 |         true,
  300 |       );
  301 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:298:94
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99f02-to-is-refused-tooManyPhotos-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1484 |     for (let index = 2; index < 10; index += 1) {
  1485 |       const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
> 1486 |       expect(answer.payload["ok"], `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(
       |                                                                                              ^
  1487 |         true,
  1488 |       );
  1489 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1486:94
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-25-an-edited-photo-takes-the-old-photo-s-place-its-objects-go-at-the-cap-it-is-still-taken-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2fc14--it-is-still-taken-D154-B2--desktop-1280`; this run carried 1 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PW-29: the caption never rendered the plan's cap

expect(locator).toContainText(expected) failed

Locator: getByTestId('post-photos-count')
Expected substring: "10"
Received string:    "0 of 4"
Timeout: 20000ms

Call log:
  - PW-29: the caption never rendered the plan's cap with timeout 20000ms
  - waiting for getByTestId('post-photos-count')
    24 × locator resolved to <p data-testid="post-photos-count" class="text-xs text-muted-foreground">0 of 4</p>
       - unexpected value "0 of 4"

--- further error 1 ---
Error: PW-29: the caption never rendered the plan's cap

expect(locator).toContainText(expected) failed

Locator: getByTestId('post-photos-count')
Expected substring: "10"
Received string:    "0 of 4"
Timeout: 20000ms

Call log:
  - PW-29: the caption never rendered the plan's cap with timeout 20000ms
  - waiting for getByTestId('post-photos-count')
    24 × locator resolved to <p data-testid="post-photos-count" class="text-xs text-muted-foreground">0 of 4</p>
       - unexpected value "0 of 4"


  1293 |
  1294 |     const caption = page.getByTestId("post-photos-count");
> 1295 |     await expect(caption, "PW-29: the caption never rendered the plan's cap").toContainText(
       |                                                                               ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-desktop-1280` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4 ×4
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).

## Server errors: shard 13

```text
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4 ×4
```

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## shard 11: no results file

shard 11: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
