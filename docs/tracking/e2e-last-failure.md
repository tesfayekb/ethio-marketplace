# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42372372981
- Commit: `9995901e2ead3e4b5260906e554bec2430aff892`
- Attempt: 1
- Written (UTC): 2026-11-07T12:47:08.778Z
- Passed: 2434 · Skipped: 332 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (17 of 18 results files read, 17 of 18 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: smoke. The start log's error lines, redacted, from `smoke` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql...
ERROR: duplicate key value violates unique constraint "languages_pkey" (SQLSTATE 23505)
Server record (DEC-340, stream):
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres ERROR:  duplicate key value violates unique constraint "languages_pkey"
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres DETAIL:  Key (code)=(q95) already exists.
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
	    VALUES (v_lang_on, v_tag || ' on', v_tag, true, true, 9001), (v_lang_off, v_tag || ' off', v_tag, true, false, 9002)"
	PL/pgSQL function inline_code_block line 57 at SQL statement
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 4. PROOFS
(189 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

`smoke`: log unavailable.

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

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-07T12:28:20.033Z | 0.4 min |
| shard 1 | 2026-11-07T12:30:11.939Z | 13.4 min |
| shard 2 | 2026-11-07T12:28:20.048Z | 18.1 min |
| shard 3 | 2026-11-07T12:27:59.502Z | 8.7 min |
| shard 4 | 2026-11-07T12:28:29.541Z | 12.9 min |
| shard 5 | 2026-11-07T12:28:32.675Z | 11.6 min |
| shard 6 | 2026-11-07T12:30:35.636Z | 12.8 min |
| shard 7 | 2026-11-07T12:29:16.237Z | 4.4 min |
| shard 8 | 2026-11-07T12:28:43.300Z | 8.4 min |
| shard 9 | 2026-11-07T12:28:35.124Z | 13.2 min |
| shard 10 | 2026-11-07T12:28:39.454Z | 17.1 min |
| shard 11 | 2026-11-07T12:28:07.110Z | 10.0 min |
| shard 12 | 2026-11-07T12:28:07.678Z | 11.7 min |
| shard 13 | 2026-11-07T12:27:59.980Z | 10.6 min |
| shard 14 | 2026-11-07T12:28:17.691Z | 13.3 min |
| shard 15 | 2026-11-07T12:28:45.469Z | 4.6 min |
| shard 16 | 2026-11-07T12:28:06.405Z | 8.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.4 min | shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 5, shard 13 |
| `import-security.spec.ts` | 36 | 5.4 min | shard 4, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-listings.spec.ts` | 76 | 4.6 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 54 | 4.5 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 2, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.2 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 4.2 min | shard 5, shard 13 |
| `photo-pipeline.spec.ts` | 68 | 4.2 min | shard 5, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 3.5 min | shard 3, shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 3, shard 11 |
| `ad-page.spec.ts` | 78 | 3.0 min | shard 1, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 7, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 3, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `mfa-stepup.spec.ts` | 20 | 1.7 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 1, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 5, shard 13 |
| `dialogs.spec.ts` | 14 | 1.3 min | shard 3, shard 11 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 1.1 min | shard 7, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `my-listings-promote.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-levels.spec.ts` | 26 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 28 | 0.5 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-category.spec.ts` › PW-29 the photos caption counts against the plan's cap | mobile-360 | 45.3 s |
| `post-wizard-category.spec.ts` › PW-29 the photos caption counts against the plan's cap | desktop-1280 | 45.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42372372981-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42372372981-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42372372981-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42372372981-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42372372981-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42372372981-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42372372981-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42372372981-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-16
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

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99f02-to-is-refused-tooManyPhotos-mobile-360`; this run carried 0 context file(s); of the same spec: none

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

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-25-an-edited-photo-takes-the-old-photo-s-place-its-objects-go-at-the-cap-it-is-still-taken-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2fc14--it-is-still-taken-D154-B2--mobile-360`; this run carried 0 context file(s); of the same spec: none

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

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-mobile-360` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-mobile-360`; this run carried 0 context file(s); of the same spec: none

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

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99f02-to-is-refused-tooManyPhotos-desktop-1280`; this run carried 0 context file(s); of the same spec: none

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

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-25-an-edited-photo-takes-the-old-photo-s-place-its-objects-go-at-the-cap-it-is-still-taken-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2fc14--it-is-still-taken-D154-B2--desktop-1280`; this run carried 0 context file(s); of the same spec: none

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

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-desktop-1280` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4 ×4
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 13

```text
[WebServer] [ssr-error] /api/upload/photo tooManyPhotos:4 ×4
```

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
