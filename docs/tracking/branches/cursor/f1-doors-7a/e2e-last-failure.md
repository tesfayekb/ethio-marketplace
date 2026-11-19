# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44593520490
- Commit: `c6f661c83d2f895446e4342fd354d64212b8eaff`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-9a1c9ddd62ad… (1 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-19T19:50:14.302Z
- Passed: 2347 · Skipped: 360 · Failed: 199
- Gating failures: 199 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

1104 line(s), 32 message(s): 5 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `[incident [account id]] ReaderError: permission denied for function get_attribute_options_version` | 922 | shard 2, shard 3, shard 4, shard 6, shard 7, shard 8, shard 10, shard 11, shard 12, shard 14 |
| `[incident [account id]] [object Object]` | 42 | shard 5, shard 8 |
| `translation scope: permission denied for function translation_scope_ok` | 42 | shard 5, shard 8 |
| `permission denied for function listing_contact_refusals` | 28 | shard 2, shard 3, shard 11, shard 12 |
| `rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>` | 8 | shard 2 |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### [incident [account id]] ReaderError: permission denied for function get_attribute_options_version

- Count: 922 · Sources: shard 2, shard 3, shard 4, shard 6, shard 7, shard 8, shard 10, shard 11, shard 12, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-21 a child detail shows only the chosen parent's options and clears on change ×36 · PW-166 a prefill the seller left goes with the old choice; one the seller change ×35 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×34 · PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price pag ×30 · PW-25 an inherited year picker is bounded by the model chosen three levels down, ×29 · PW-188 a list that hangs under another answer offers its shared Other last under ×28

```text
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version
```

### [incident [account id]] [object Object]

- Count: 42 · Sources: shard 5, shard 8
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-55 a commission basis asks a percentage, stores basis points, and reads it ba ×5 · PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advan ×5 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×4 · PW-57 a per-quintal basis keeps the period once and reviews as a price per quint ×4 · TR-12 bulk AI fill translates every untranslated scratch key ×4 · TR-12 bulk AI fill translates every untranslated scratch key (retry #1) ×4

```text
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
```

### translation scope: permission denied for function translation_scope_ok

- Count: 42 · Sources: shard 5, shard 8
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-55 a commission basis asks a percentage, stores basis points, and reads it ba ×5 · PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advan ×5 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×4 · PW-57 a per-quintal basis keeps the period once and reviews as a price per quint ×4 · TR-12 bulk AI fill translates every untranslated scratch key ×4 · TR-12 bulk AI fill translates every untranslated scratch key (retry #1) ×4

```text
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
```

### permission denied for function listing_contact_refusals

- Count: 28 · Sources: shard 2, shard 3, shard 11, shard 12
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-144 leaving the contact step makes one identity call, or none when nothing ch ×6 · PW-12 who: the alias is checked against the door, messages cannot be switched of ×5 · PW-185 a Next pressed while the contact step is still reading waits for it, then ×5 · MLA-15 Edit, complete: a second city and a channel apply at once from the Place  ×4 · PW-149 a save refused for another reason shows a message at Next and can be retr ×4 · PR-4 identity: the alias is saved, and a second seller cannot take it (retry #1) ×3

```text
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals
```

### rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>

- Count: 8 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached (retry #1) ×8 · PR-7 the draft dial refuses by name once the ceiling is reached ×4 · AT-6 merge: links move to the survivor and the sources disappear ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-19T20:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-19T19:04:11.093Z | 4.3 min |
| email | 2026-11-19T19:03:36.991Z | 0.4 min |
| webkit | 2026-11-19T19:02:47.444Z | 7.2 min |
| shard 1 | 2026-11-19T19:07:30.077Z | 5.5 min |
| shard 2 | 2026-11-19T19:03:20.206Z | 6.4 min |
| shard 3 | 2026-11-19T19:03:10.115Z | 30.2 min |
| shard 4 | 2026-11-19T19:06:52.297Z | 6.2 min |
| shard 5 | 2026-11-19T19:03:44.047Z | 7.4 min |
| shard 6 | 2026-11-19T19:04:35.996Z | 5.9 min |
| shard 7 | 2026-11-19T19:03:56.034Z | 7.3 min |
| shard 8 | 2026-11-19T19:03:15.783Z | 44.8 min |
| shard 9 | 2026-11-19T19:06:32.550Z | 5.5 min |
| shard 10 | 2026-11-19T19:05:49.076Z | 5.3 min |
| shard 11 | 2026-11-19T19:05:37.426Z | 17.8 min |
| shard 12 | 2026-11-19T19:02:54.967Z | 46.1 min |
| shard 13 | 2026-11-19T19:03:45.809Z | 6.7 min |
| shard 14 | 2026-11-19T19:03:18.673Z | 13.9 min |
| shard 15 | 2026-11-19T19:07:20.501Z | 6.3 min |
| shard 16 | 2026-11-19T19:03:28.223Z | 7.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 74.8 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 51.3 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 32.1 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 24.4 min | shard 11 |
| `admin-translations-console.spec.ts` | 46 | 16.8 min | smoke, shard 8 |
| `post-wizard-details.spec.ts` | 8 | 11.1 min | shard 14 |
| `post-wizard-bundle2.spec.ts` | 70 | 11.0 min | shard 3 |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `my-listings-ad.spec.ts` | 38 | 7.0 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 6.8 min | shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 6.1 min | shard 2 |
| `ad-page.spec.ts` | 104 | 6.0 min | webkit, shard 13 |
| `admin-translations-data.spec.ts` | 10 | 5.9 min | shard 5 |
| `import-security.spec.ts` | 36 | 5.7 min | shard 4 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `photo-pipeline.spec.ts` | 74 | 5.5 min | webkit, shard 16 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 5 |
| `admin-listings.spec.ts` | 78 | 5.0 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 58 | 4.9 min | webkit, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 4.7 min | shard 13 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.8 min | shard 7 |
| `admin-translations-governance.spec.ts` | 20 | 3.5 min | smoke, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `post-wizard-category.spec.ts` | 52 | 3.4 min | webkit, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.3 min | smoke, shard 10 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 2 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 6 |
| `dialogs.spec.ts` | 20 | 2.5 min | webkit, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 14 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 3 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 1.0 min | shard 6 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 11 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 12 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `press.spec.ts` | 22 | 0.9 min | shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `shell-bands.spec.ts` | 16 | 0.2 min | shard 12 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | desktop-1280 | 344.5 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 344.5 s |
| `post-wizard-pricing.spec.ts` › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) | desktop-1280 | 120.9 s |
| `post-wizard-resets.spec.ts` › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold | mobile-360 | 120.9 s |
| `post-wizard-details.spec.ts` › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves | desktop-1280 | 120.8 s |
| `post-wizard-pricing.spec.ts` › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) | desktop-1280 | 120.8 s |
| `post-wizard-pricing.spec.ts` › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) | desktop-1280 | 120.8 s |
| `post-wizard-pricing.spec.ts` › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it | desktop-1280 | 120.7 s |
| `post-wizard-pricing.spec.ts` › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) | desktop-1280 | 120.7 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 120.7 s |
| `post-wizard-details.spec.ts` › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name | desktop-1280 | 120.7 s |
| `post-wizard-pricing.spec.ts` › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages | desktop-1280 | 120.7 s |
| `post-wizard-resets.spec.ts` › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold | desktop-1280 | 120.7 s |
| `post-wizard-pricing.spec.ts` › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) | mobile-360 | 120.7 s |
| `post-wizard-pricing.spec.ts` › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) | desktop-1280 | 120.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44593520490-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44593520490-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44593520490-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44593520490-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44593520490-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44593520490-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44593520490-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44593520490-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44593520490-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44593520490-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44593520490-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44593520490-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44593520490-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44593520490-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44593520490-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44593520490-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44593520490-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44593520490-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44593520490-local-16
```

## posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  434 |     );
  435 |     expect(saved.status).toBe(200);
> 436 |     expect(saved.payload["ok"], JSON.stringify(saved.payload)).toBe(true);
      |                                                                ^
  437 |
  438 |     const second = await seller(page);
  439 |     const taken = await postRoute(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:436:64
```

Context:

```text
          - listitem [ref=e258]:
            - generic [ref=e259]: About
          - listitem [ref=e260]:
            - generic [ref=e261]: Contact
      - navigation "Help" [ref=e262]:
        - heading "Help" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - generic [ref=e266]: Safety
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - link "Terms" [ref=e271] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e272]:
            - link "Privacy" [ref=e273] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  504 |
  505 |     const first = await page.request.get(path, { headers: auth });
> 506 |     expect(first.status()).toBe(200);
      |                            ^
  507 |     const etag = first.headers()["etag"] ?? "";
  508 |     expect(etag, "the options route published no ETag").not.toBe("");
  509 |     // INC-243 — the list is held for ONE minute, with five of stale-while-revalidate,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:506:28
```

Context:

```text
          - listitem [ref=e258]:
            - generic [ref=e259]: About
          - listitem [ref=e260]:
            - generic [ref=e261]: Contact
      - navigation "Help" [ref=e262]:
        - heading "Help" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - generic [ref=e266]: Safety
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - link "Terms" [ref=e271] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e272]:
            - link "Privacy" [ref=e273] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null

  555 |         }
  556 |       }
> 557 |       expect(refusal, `the dial never refused within ${ceiling + 2} calls`).not.toBeNull();
      |                                                                                 ^
  558 |       const entry = (Array.isArray(refusal!["refusals"]) ? refusal!["refusals"][0] : {}) as Record<
  559 |         string,
  560 |         unknown
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:557:81
```

Context:

```text
          - listitem [ref=e258]:
            - generic [ref=e259]: About
          - listitem [ref=e260]:
            - generic [ref=e261]: Contact
      - navigation "Help" [ref=e262]:
        - heading "Help" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - generic [ref=e266]: Safety
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - link "Terms" [ref=e271] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e272]:
            - link "Privacy" [ref=e273] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "{\"code\":\"P0D01\",\"details\":null,\"hint\":null,\"message\":\"notYourListing\"}"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "{\"code\":\"P0D01\",\"details\":null,\"hint\":null,\"message\":\"notYourListing\"}"

  962 |         body: { p_listing_id: listingId },
  963 |       });
> 964 |       expect(JSON.stringify(foreign.body)).toContain("not your listing");
      |                                            ^
  965 |     } finally {
  966 |       await other.close();
  967 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:964:44
```

Context:

```text
          - listitem [ref=e258]:
            - generic [ref=e259]: About
          - listitem [ref=e260]:
            - generic [ref=e261]: Contact
      - navigation "Help" [ref=e262]:
        - heading "Help" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - generic [ref=e266]: Safety
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - link "Terms" [ref=e271] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e272]:
            - link "Privacy" [ref=e273] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  434 |     );
  435 |     expect(saved.status).toBe(200);
> 436 |     expect(saved.payload["ok"], JSON.stringify(saved.payload)).toBe(true);
      |                                                                ^
  437 |
  438 |     const second = await seller(page);
  439 |     const taken = await postRoute(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:436:64
```

Context:

```text
          - listitem [ref=e335]:
            - generic [ref=e336]: About
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Help" [ref=e339]:
        - heading "Help" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Safety
      - navigation "Legal" [ref=e344]:
        - heading "Legal" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - link "Terms" [ref=e348] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e349]:
            - link "Privacy" [ref=e350] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e352]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  504 |
  505 |     const first = await page.request.get(path, { headers: auth });
> 506 |     expect(first.status()).toBe(200);
      |                            ^
  507 |     const etag = first.headers()["etag"] ?? "";
  508 |     expect(etag, "the options route published no ETag").not.toBe("");
  509 |     // INC-243 — the list is held for ONE minute, with five of stale-while-revalidate,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:506:28
```

Context:

```text
          - listitem [ref=e335]:
            - generic [ref=e336]: About
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Help" [ref=e339]:
        - heading "Help" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Safety
      - navigation "Legal" [ref=e344]:
        - heading "Legal" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - link "Terms" [ref=e348] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e349]:
            - link "Privacy" [ref=e350] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e352]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null

  555 |         }
  556 |       }
> 557 |       expect(refusal, `the dial never refused within ${ceiling + 2} calls`).not.toBeNull();
      |                                                                                 ^
  558 |       const entry = (Array.isArray(refusal!["refusals"]) ? refusal!["refusals"][0] : {}) as Record<
  559 |         string,
  560 |         unknown
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:557:81
```

Context:

```text
          - listitem [ref=e335]:
            - generic [ref=e336]: About
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Help" [ref=e339]:
        - heading "Help" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Safety
      - navigation "Legal" [ref=e344]:
        - heading "Legal" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - link "Terms" [ref=e348] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e349]:
            - link "Privacy" [ref=e350] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e352]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "{\"code\":\"P0D01\",\"details\":null,\"hint\":null,\"message\":\"notYourListing\"}"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "{\"code\":\"P0D01\",\"details\":null,\"hint\":null,\"message\":\"notYourListing\"}"

  962 |         body: { p_listing_id: listingId },
  963 |       });
> 964 |       expect(JSON.stringify(foreign.body)).toContain("not your listing");
      |                                            ^
  965 |     } finally {
  966 |       await other.close();
  967 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:964:44
```

Context:

```text
          - listitem [ref=e335]:
            - generic [ref=e336]: About
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Help" [ref=e339]:
        - heading "Help" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Safety
      - navigation "Legal" [ref=e344]:
        - heading "Legal" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - link "Terms" [ref=e348] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e349]:
            - link "Privacy" [ref=e350] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e352]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  331 |     expect((await reserve(b, x.id, true)).error).toBe("notYourListing");
  332 |     expect((await price(b, x.id, 90)).error).toBe("notYourListing");
> 333 |     expect((await b.rpc("listing_history", { p_listing_id: x.id })).error).toBe("not your listing");
      |                                                                            ^
  334 |     expect((await b.rpc("listing_history", { p_listing_id: crypto.randomUUID() })).error).toBe(
  335 |       "not your listing",
  336 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:333:76
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-mobile-360`; this run carried 76 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  331 |     expect((await reserve(b, x.id, true)).error).toBe("notYourListing");
  332 |     expect((await price(b, x.id, 90)).error).toBe("notYourListing");
> 333 |     expect((await b.rpc("listing_history", { p_listing_id: x.id })).error).toBe("not your listing");
      |                                                                            ^
  334 |     expect((await b.rpc("listing_history", { p_listing_id: crypto.randomUUID() })).error).toBe(
  335 |       "not your listing",
  336 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:333:76
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-149 a save refused for another reason shows a message at Next and can be retried

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-149: the retry did not pass

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-149: the retry did not pass with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: PW-149: the retry did not pass

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-149: the retry did not pass with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1153 |     await page.unroute("**/api/listings/identity");
  1154 |     await page.getByTestId("post-next").click();
> 1155 |     await expect(page.getByTestId("post-step-8"), "PW-149: the retry did not pass").toBeVisible({
       |                                                                                     ^
  1156 |       timeout: 20_000,
  1157 |     });
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-149-a-save-refused-for-another-reason-shows-a-message-at-Next-and-can-be-retried-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-f583c--at-Next-and-can-be-retried-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1646 |     await page.getByTestId("post-who-show-phone").check();
  1647 |     await page.getByTestId("post-next").click();
> 1648 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1649 |     await expect
  1650 |       .poll(
  1651 |         async () => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1648:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-133-contact-details-are-kept-on-the-profile-and-open-the-next-ad-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-7c4e1-rofile-and-open-the-next-ad-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1695 |     const before = calls.length;
  1696 |     await page.getByTestId("post-next").click();
> 1697 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1698 |     const pass1 = calls.slice(before);
  1699 |     expect(pass1.length, `PW-144: both changed made ${pass1.length} calls`).toBe(1);
  1700 |     expect(pass1[0]?.["alias"], "PW-144: the call lacks the name").toBe(alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1697:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-a2e7f-r-none-when-nothing-changed-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-185 a Next pressed while the contact step is still reading waits for it, then reaches review

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1739 |     await page.getByTestId("post-who-show-phone").check();
  1740 |     await page.getByTestId("post-next").click();
> 1741 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1742 |
  1743 |     // Every identity read after Back is held until after the press.
  1744 |     let requested!: () => void;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1741:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-185-a-Next-pressed-while-the-contact-step-is-still-reading-waits-for-it-then-reaches-review-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-3c2e5--for-it-then-reaches-review-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-149 a save refused for another reason shows a message at Next and can be retried

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: PW-149: the retry did not pass

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-149: the retry did not pass with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: PW-149: the retry did not pass

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-149: the retry did not pass with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1153 |     await page.unroute("**/api/listings/identity");
  1154 |     await page.getByTestId("post-next").click();
> 1155 |     await expect(page.getByTestId("post-step-8"), "PW-149: the retry did not pass").toBeVisible({
       |                                                                                     ^
  1156 |       timeout: 20_000,
  1157 |     });
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-149-a-save-refused-for-another-reason-shows-a-message-at-Next-and-can-be-retried-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-f583c--at-Next-and-can-be-retried-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1646 |     await page.getByTestId("post-who-show-phone").check();
  1647 |     await page.getByTestId("post-next").click();
> 1648 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1649 |     await expect
  1650 |       .poll(
  1651 |         async () => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1648:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-133-contact-details-are-kept-on-the-profile-and-open-the-next-ad-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-7c4e1-rofile-and-open-the-next-ad-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1695 |     const before = calls.length;
  1696 |     await page.getByTestId("post-next").click();
> 1697 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1698 |     const pass1 = calls.slice(before);
  1699 |     expect(pass1.length, `PW-144: both changed made ${pass1.length} calls`).toBe(1);
  1700 |     expect(pass1[0]?.["alias"], "PW-144: the call lacks the name").toBe(alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1697:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-a2e7f-r-none-when-nothing-changed-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-185 a Next pressed while the contact step is still reading waits for it, then reaches review

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1739 |     await page.getByTestId("post-who-show-phone").check();
  1740 |     await page.getByTestId("post-next").click();
> 1741 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1742 |
  1743 |     // Every identity read after Back is held until after the press.
  1744 |     let requested!: () => void;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1741:51
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-185-a-Next-pressed-while-the-contact-step-is-still-reading-waits-for-it-then-reaches-review-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-3c2e5--for-it-then-reaches-review-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_3_c2ixfj_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_3_c2ixfj_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_3_c2ixfj_select" id="post-attr-e2e_post_local-3_3_c2ixfj_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_3_c2ixfj_select" id="post-attr-e2e_post_local-3_3_c2ixfj_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_3_c2ixfj_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_3_c2ixfj_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_3_c2ixfj_select" id="post-attr-e2e_post_local-3_3_c2ixfj_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_3_c2ixfj_select" id="post-attr-e2e_post_local-3_3_c2ixfj_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  238 |     );
  239 |     await pw26Picker.focus();
> 240 |     await expect(pw26Picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                              ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-mobile-360` — Playwright's name `post-wizard-resets-POSTING-cf6f2-the-new-category-never-asks-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_5_5o0ljm_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_5_5o0ljm_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_5_5o0ljm_select" id="post-attr-e2e_post_local-3_5_5o0ljm_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_5_5o0ljm_select" id="post-attr-e2e_post_local-3_5_5o0ljm_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_5_5o0ljm_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_5_5o0ljm_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_5_5o0ljm_select" id="post-attr-e2e_post_local-3_5_5o0ljm_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_5_5o0ljm_select" id="post-attr-e2e_post_local-3_5_5o0ljm_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  462 |     const picker = specControl(page, spec.select.attrKey);
  463 |     await picker.focus();
> 464 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-mobile-360` — Playwright's name `post-wizard-resets-POSTING-e57e3--seconds-restores-them-D59--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_9_ln248i_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_9_ln248i_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_9_ln248i_select" id="post-attr-e2e_post_local-3_9_ln248i_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_9_ln248i_select" id="post-attr-e2e_post_local-3_9_ln248i_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_9_ln248i_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_9_ln248i_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_9_ln248i_select" id="post-attr-e2e_post_local-3_9_ln248i_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_9_ln248i_select" id="post-attr-e2e_post_local-3_9_ln248i_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  462 |     const picker = specControl(page, spec.select.attrKey);
  463 |     await picker.focus();
> 464 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-mobile-360` — Playwright's name `post-wizard-resets-POSTING-356d8-e-and-the-reset-stands-D59--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_idn_1795115259255_ozzlhx_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_idn_1795115259255_ozzlhx_idn" id="post-attr-e2e_idn_1795115259255_ozzlhx_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
    - waiting for element to be visible and enabled
  - element was detached from the DOM, retrying

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-59-a-card-1-identity-change-hides-only-what-hangs-on-it-and-a-card-2-change-touches-nothing-else-mobile-360` — Playwright's name `post-wizard-resets-POSTING-59cbe-change-touches-nothing-else-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795115382519_k36oex_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795115382519_k36oex_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_first_1795115382519_k36oex_idn" id="post-attr-e2e_first_1795115382519_k36oex_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_first_1795115382519_k36oex_idn" id="post-attr-e2e_first_1795115382519_k36oex_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795115382519_k36oex_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795115382519_k36oex_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_first_1795115382519_k36oex_idn" id="post-attr-e2e_first_1795115382519_k36oex_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_first_1795115382519_k36oex_idn" id="post-attr-e2e_first_1795115382519_k36oex_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  803 |     const picker = control(idn.attr_key);
  804 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 805 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-163-a-first-identity-answer-keeps-the-details-filled-above-it-a-change-keeps-them-too-mobile-360` — Playwright's name `post-wizard-resets-POSTING-0c834--it-a-change-keeps-them-too-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_sys_1795115437307_krtwau_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_sys_1795115437307_krtwau_idn" id="post-attr-e2e_sys_1795115437307_krtwau_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-60-a-non-identity-fold-owner-change-clears-only-its-fold-child-an-identity-change-clears-nothing-it-does-not-hold-mobile-360` — Playwright's name `post-wizard-resets-POSTING-b8bbb-rs-nothing-it-does-not-hold-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_shift_local-3_27_rjceow_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_shift_local-3_27_rjceow_make" id="post-attr-e2e_shift_local-3_27_rjceow_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-mobile-360` — Playwright's name `post-wizard-resets-POSTING-b6b2b-s-survive-and-Undo-restores-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_and_1795115687494_rouwdc_k1"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_and_1795115687494_rouwdc_k1" id="post-attr-e2e_and_1795115687494_rouwdc_k1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-152-a-two-pair-condition-shows-its-row-only-when-both-answers-match-mobile-360` — Playwright's name `post-wizard-resets-POSTING-d0598-nly-when-both-answers-match-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795115810642_u0tcmx_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795115810642_u0tcmx_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r164_1795115810642_u0tcmx_idn" id="post-attr-e2e_r164_1795115810642_u0tcmx_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r164_1795115810642_u0tcmx_idn" id="post-attr-e2e_r164_1795115810642_u0tcmx_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795115810642_u0tcmx_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795115810642_u0tcmx_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r164_1795115810642_u0tcmx_idn" id="post-attr-e2e_r164_1795115810642_u0tcmx_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r164_1795115810642_u0tcmx_idn" id="post-attr-e2e_r164_1795115810642_u0tcmx_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-164-an-identity-change-keeps-every-detail-that-does-not-depend-on-it-resets-the-ones-that-do-and-Undo-restores-them-mobile-360` — Playwright's name `post-wizard-resets-POSTING-e6c71-t-do-and-Undo-restores-them-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795115859440_riqypx_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795115859440_riqypx_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r165_1795115859440_riqypx_p1" id="post-attr-e2e_r165_1795115859440_riqypx_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795115859440_riqypx_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795115859440_riqypx_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r165_1795115859440_riqypx_p1" id="post-attr-e2e_r165_1795115859440_riqypx_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-165-a-parent-s-change-never-touches-a-detail-that-depends-on-another-parent-mobile-360` — Playwright's name `post-wizard-resets-POSTING-abfdc-t-depends-on-another-parent-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795115906590_adejmz_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795115906590_adejmz_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r166_1795115906590_adejmz_model" id="post-attr-e2e_r166_1795115906590_adejmz_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795115906590_adejmz_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795115906590_adejmz_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r166_1795115906590_adejmz_model" id="post-attr-e2e_r166_1795115906590_adejmz_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-166-a-prefill-the-seller-left-goes-with-the-old-choice-one-the-seller-changed-stays-when-it-fits-and-is-cleared-when-it-does-not-mobile-360` — Playwright's name `post-wizard-resets-POSTING-aa207-is-cleared-when-it-does-not-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795115958793_qwzvuk_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795115958793_qwzvuk_model"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r167_1795115958793_qwzvuk_model" id="post-attr-e2e_r167_1795115958793_qwzvuk_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r167_1795115958793_qwzvuk_model" id="post-attr-e2e_r167_1795115958793_qwzvuk_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795115958793_qwzvuk_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795115958793_qwzvuk_model"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r167_1795115958793_qwzvuk_model" id="post-attr-e2e_r167_1795115958793_qwzvuk_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r167_1795115958793_qwzvuk_model" id="post-attr-e2e_r167_1795115958793_qwzvuk_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-167-a-seller-s-year-inside-the-new-model-s-bounds-is-kept-one-outside-is-cleared-with-the-Undo-offer-mobile-360` — Playwright's name `post-wizard-resets-POSTING-81aef-cleared-with-the-Undo-offer-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116005725_5oz37j_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116005725_5oz37j_brand"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r168_1795116005725_5oz37j_brand" id="post-attr-e2e_r168_1795116005725_5oz37j_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116005725_5oz37j_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116005725_5oz37j_brand"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r168_1795116005725_5oz37j_brand" id="post-attr-e2e_r168_1795116005725_5oz37j_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-168-a-chain-the-brand-changes-the-model-it-no-longer-offers-is-cleared-and-what-it-filled-goes-the-seller-s-own-colour-stays-mobile-360` — Playwright's name `post-wizard-resets-POSTING-7b26f-e-seller-s-own-colour-stays-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116053163_yhqnki_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116053163_yhqnki_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r174_1795116053163_yhqnki_p1" id="post-attr-e2e_r174_1795116053163_yhqnki_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116053163_yhqnki_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116053163_yhqnki_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r174_1795116053163_yhqnki_p1" id="post-attr-e2e_r174_1795116053163_yhqnki_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-174-a-parent-s-move-whose-new-option-carries-no-fact-leaves-D-on-another-parent-s-fact-as-a-prefill-Bundle-7-D4-mobile-360` — Playwright's name `post-wizard-resets-POSTING-df254-t-as-a-prefill-Bundle-7-D4--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_39_xn7cjb_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_39_xn7cjb_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_39_xn7cjb_select" id="post-attr-e2e_post_local-3_39_xn7cjb_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_39_xn7cjb_select" id="post-attr-e2e_post_local-3_39_xn7cjb_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_39_xn7cjb_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_39_xn7cjb_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_39_xn7cjb_select" id="post-attr-e2e_post_local-3_39_xn7cjb_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_39_xn7cjb_select" id="post-attr-e2e_post_local-3_39_xn7cjb_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  238 |     );
  239 |     await pw26Picker.focus();
> 240 |     await expect(pw26Picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                              ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-cf6f2-the-new-category-never-asks-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_43_509dgd_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_43_509dgd_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_43_509dgd_select" id="post-attr-e2e_post_local-3_43_509dgd_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_43_509dgd_select" id="post-attr-e2e_post_local-3_43_509dgd_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_43_509dgd_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_43_509dgd_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_43_509dgd_select" id="post-attr-e2e_post_local-3_43_509dgd_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_43_509dgd_select" id="post-attr-e2e_post_local-3_43_509dgd_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  462 |     const picker = specControl(page, spec.select.attrKey);
  463 |     await picker.focus();
> 464 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e57e3--seconds-restores-them-D59--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_47_7qu7jv_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_47_7qu7jv_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_47_7qu7jv_select" id="post-attr-e2e_post_local-3_47_7qu7jv_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_47_7qu7jv_select" id="post-attr-e2e_post_local-3_47_7qu7jv_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_47_7qu7jv_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-3_47_7qu7jv_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-3_47_7qu7jv_select" id="post-attr-e2e_post_local-3_47_7qu7jv_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-3_47_7qu7jv_select" id="post-attr-e2e_post_local-3_47_7qu7jv_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  462 |     const picker = specControl(page, spec.select.attrKey);
  463 |     await picker.focus();
> 464 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-356d8-e-and-the-reset-stands-D59--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_idn_1795115964939_2b2xq0_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_idn_1795115964939_2b2xq0_idn" id="post-attr-e2e_idn_1795115964939_2b2xq0_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-59-a-card-1-identity-change-hides-only-what-hangs-on-it-and-a-card-2-change-touches-nothing-else-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-59cbe-change-touches-nothing-else-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795116087924_nzojpu_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795116087924_nzojpu_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_first_1795116087924_nzojpu_idn" id="post-attr-e2e_first_1795116087924_nzojpu_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_first_1795116087924_nzojpu_idn" id="post-attr-e2e_first_1795116087924_nzojpu_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795116087924_nzojpu_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_first_1795116087924_nzojpu_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_first_1795116087924_nzojpu_idn" id="post-attr-e2e_first_1795116087924_nzojpu_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_first_1795116087924_nzojpu_idn" id="post-attr-e2e_first_1795116087924_nzojpu_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  803 |     const picker = control(idn.attr_key);
  804 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 805 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-163-a-first-identity-answer-keeps-the-details-filled-above-it-a-change-keeps-them-too-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-0c834--it-a-change-keeps-them-too-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_sys_1795116141318_k300mh_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_sys_1795116141318_k300mh_idn" id="post-attr-e2e_sys_1795116141318_k300mh_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-60-a-non-identity-fold-owner-change-clears-only-its-fold-child-an-identity-change-clears-nothing-it-does-not-hold-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-b8bbb-rs-nothing-it-does-not-hold-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_shift_local-3_64_y1gg3h_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_shift_local-3_64_y1gg3h_make" id="post-attr-e2e_shift_local-3_64_y1gg3h_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-b6b2b-s-survive-and-Undo-restores-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_and_1795116390280_hbt734_k1"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_and_1795116390280_hbt734_k1" id="post-attr-e2e_and_1795116390280_hbt734_k1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-152-a-two-pair-condition-shows-its-row-only-when-both-answers-match-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-d0598-nly-when-both-answers-match-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795116513724_eobd6q_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795116513724_eobd6q_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r164_1795116513724_eobd6q_idn" id="post-attr-e2e_r164_1795116513724_eobd6q_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r164_1795116513724_eobd6q_idn" id="post-attr-e2e_r164_1795116513724_eobd6q_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795116513724_eobd6q_idn"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r164_1795116513724_eobd6q_idn"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r164_1795116513724_eobd6q_idn" id="post-attr-e2e_r164_1795116513724_eobd6q_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r164_1795116513724_eobd6q_idn" id="post-attr-e2e_r164_1795116513724_eobd6q_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-164-an-identity-change-keeps-every-detail-that-does-not-depend-on-it-resets-the-ones-that-do-and-Undo-restores-them-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e6c71-t-do-and-Undo-restores-them-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795116560847_eg8kar_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795116560847_eg8kar_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r165_1795116560847_eg8kar_p1" id="post-attr-e2e_r165_1795116560847_eg8kar_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795116560847_eg8kar_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r165_1795116560847_eg8kar_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r165_1795116560847_eg8kar_p1" id="post-attr-e2e_r165_1795116560847_eg8kar_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-165-a-parent-s-change-never-touches-a-detail-that-depends-on-another-parent-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-abfdc-t-depends-on-another-parent-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795116607875_guzp0w_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795116607875_guzp0w_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r166_1795116607875_guzp0w_model" id="post-attr-e2e_r166_1795116607875_guzp0w_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795116607875_guzp0w_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r166_1795116607875_guzp0w_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r166_1795116607875_guzp0w_model" id="post-attr-e2e_r166_1795116607875_guzp0w_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-166-a-prefill-the-seller-left-goes-with-the-old-choice-one-the-seller-changed-stays-when-it-fits-and-is-cleared-when-it-does-not-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-aa207-is-cleared-when-it-does-not-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795116657681_xrujxr_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795116657681_xrujxr_model"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r167_1795116657681_xrujxr_model" id="post-attr-e2e_r167_1795116657681_xrujxr_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r167_1795116657681_xrujxr_model" id="post-attr-e2e_r167_1795116657681_xrujxr_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795116657681_xrujxr_model"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1795116657681_xrujxr_model"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r167_1795116657681_xrujxr_model" id="post-attr-e2e_r167_1795116657681_xrujxr_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r167_1795116657681_xrujxr_model" id="post-attr-e2e_r167_1795116657681_xrujxr_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-167-a-seller-s-year-inside-the-new-model-s-bounds-is-kept-one-outside-is-cleared-with-the-Undo-offer-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-81aef-cleared-with-the-Undo-offer-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116704620_uwbmym_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116704620_uwbmym_brand"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r168_1795116704620_uwbmym_brand" id="post-attr-e2e_r168_1795116704620_uwbmym_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116704620_uwbmym_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r168_1795116704620_uwbmym_brand"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r168_1795116704620_uwbmym_brand" id="post-attr-e2e_r168_1795116704620_uwbmym_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-168-a-chain-the-brand-changes-the-model-it-no-longer-offers-is-cleared-and-what-it-filled-goes-the-seller-s-own-colour-stays-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-7b26f-e-seller-s-own-colour-stays-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4)

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116751507_h4ghwf_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116751507_h4ghwf_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r174_1795116751507_h4ghwf_p1" id="post-attr-e2e_r174_1795116751507_h4ghwf_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116751507_h4ghwf_p1"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r174_1795116751507_h4ghwf_p1"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_r174_1795116751507_h4ghwf_p1" id="post-attr-e2e_r174_1795116751507_h4ghwf_p1" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-174-a-parent-s-move-whose-new-option-carries-no-fact-leaves-D-on-another-parent-s-fact-as-a-prefill-Bundle-7-D4-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-df254-t-as-a-prefill-Bundle-7-D4--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxcm618kaqmd_type"]').locator('option[value="e2e_mwnxcm618kaqmd_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxcm618kaqmd_type"]').locator('option[value="e2e_mwnxcm618kaqmd_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxcm618kaqmd_type"]').locator('option[value="e2e_mwnxcm618kaqmd_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxcm618kaqmd_type"]').locator('option[value="e2e_mwnxcm618kaqmd_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  129 |     await reachStep3(page, user.id, category);
  130 |     const type = control(set.typeKey);
> 131 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      |                                                                    ^
  132 |       timeout: 20_000,
  133 |     });
```

Context: context file not found for `post-wizard-units-POSTING-WIZARD-UNITS-PW-175-the-price-page-asks-the-unit-of-sale-above-the-quantity-mobile-360` — Playwright's name `post-wizard-units-POSTING--f1ad0--of-sale-above-the-quantity-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxs5uqtjd8mt_type"]').locator('option[value="e2e_mwnxs5uqtjd8mt_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxs5uqtjd8mt_type"]').locator('option[value="e2e_mwnxs5uqtjd8mt_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxs5uqtjd8mt_type"]').locator('option[value="e2e_mwnxs5uqtjd8mt_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxs5uqtjd8mt_type"]').locator('option[value="e2e_mwnxs5uqtjd8mt_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  129 |     await reachStep3(page, user.id, category);
  130 |     const type = control(set.typeKey);
> 131 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      |                                                                    ^
  132 |       timeout: 20_000,
  133 |     });
```

Context: context file not found for `post-wizard-units-POSTING-WIZARD-UNITS-PW-175-the-price-page-asks-the-unit-of-sale-above-the-quantity-desktop-1280` — Playwright's name `post-wizard-units-POSTING--f1ad0--of-sale-above-the-quantity-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: PW-44: the child picker was open before its parent

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_1_2oqkr3_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-44: the child picker was open before its parent with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_1_2oqkr3_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_surf_local-4_1_2oqkr3_model" id="post-attr-e2e_surf_local-4_1_2oqkr3_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"

--- further error 1 ---
Error: PW-44: the child picker was open before its parent

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_1_2oqkr3_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-44: the child picker was open before its parent with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_1_2oqkr3_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_surf_local-4_1_2oqkr3_model" id="post-attr-e2e_surf_local-4_1_2oqkr3_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"


  1534 |       `[data-testid="post-attr-control"][data-attr="${set.model.attrKey}"]`,
  1535 |     );
> 1536 |     await expect(model, "PW-44: the child picker was open before its parent").toBeDisabled();
       |                                                                               ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-mobile-360` — Playwright's name `post-wizard-category-POSTI-f6a45--leaf-narrows-by-its-parent-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: PW-44: the child picker was open before its parent

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_4_90h1ej_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-44: the child picker was open before its parent with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_4_90h1ej_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_surf_local-4_4_90h1ej_model" id="post-attr-e2e_surf_local-4_4_90h1ej_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"

--- further error 1 ---
Error: PW-44: the child picker was open before its parent

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_4_90h1ej_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-44: the child picker was open before its parent with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_surf_local-4_4_90h1ej_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_surf_local-4_4_90h1ej_model" id="post-attr-e2e_surf_local-4_4_90h1ej_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"


  1534 |       `[data-testid="post-attr-control"][data-attr="${set.model.attrKey}"]`,
  1535 |     );
> 1536 |     await expect(model, "PW-44: the child picker was open before its parent").toBeDisabled();
       |                                                                               ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-desktop-1280` — Playwright's name `post-wizard-category-POSTI-f6a45--leaf-narrows-by-its-parent-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')


  318 |       await editor.getByTestId(`entity-ai-location-${one.id}-name`).click();
  319 |       await stepUpIfPrompted(page, secret);
> 320 |       await expect(editor.getByTestId(`entity-saved-location-${one.id}-name`)).toBeVisible({
      |                                                                                ^
  321 |         timeout: 30000,
  322 |       });
  323 |       // INC-558's class (turn G3c) — the box shows the AI's text (it kept the old
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:320:80
```

Context:

```text
          - listitem [ref=e384]:
            - generic [ref=e385]: About
          - listitem [ref=e386]:
            - generic [ref=e387]: Contact
      - navigation "Help" [ref=e388]:
        - heading "Help" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - generic [ref=e392]: Safety
      - navigation "Legal" [ref=e393]:
        - heading "Legal" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - link "Terms" [ref=e397] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e398]:
            - link "Privacy" [ref=e399] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e401]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: bulk entity AI never reached scratch location [account id]

expect(received).toBe(expected) // Object.is equality

Expected: "machine"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: bulk entity AI never reached scratch location [account id]

expect(received).toBe(expected) // Object.is equality

Expected: "machine"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

  504 |       await expect(page.getByTestId("ai-bulk-summary")).toBeVisible({ timeout: 90000 });
  505 |       for (const anchor of [one, two]) {
> 506 |         await expect
      |         ^
  507 |           .poll(() => statusOf(anchor.id), {
  508 |             timeout: 30000,
  509 |             message: `bulk entity AI never reached scratch location ${anchor.id}`,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:506:9
```

Context:

```text
          - listitem [ref=e397]:
            - generic [ref=e398]: About
          - listitem [ref=e399]:
            - generic [ref=e400]: Contact
      - navigation "Help" [ref=e401]:
        - heading "Help" [level=2] [ref=e402]
        - list [ref=e403]:
          - listitem [ref=e404]:
            - generic [ref=e405]: Safety
      - navigation "Legal" [ref=e406]:
        - heading "Legal" [level=2] [ref=e407]
        - list [ref=e408]:
          - listitem [ref=e409]:
            - link "Terms" [ref=e410] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e411]:
            - link "Privacy" [ref=e412] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e414]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('entity-editor-location-[account id]-name').getByTestId('entity-saved-location-[account id]-name')


  318 |       await editor.getByTestId(`entity-ai-location-${one.id}-name`).click();
  319 |       await stepUpIfPrompted(page, secret);
> 320 |       await expect(editor.getByTestId(`entity-saved-location-${one.id}-name`)).toBeVisible({
      |                                                                                ^
  321 |         timeout: 30000,
  322 |       });
  323 |       // INC-558's class (turn G3c) — the box shows the AI's text (it kept the old
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:320:80
```

Context:

```text
          - listitem [ref=e373]:
            - generic [ref=e374]: About
          - listitem [ref=e375]:
            - generic [ref=e376]: Contact
      - navigation "Help" [ref=e377]:
        - heading "Help" [level=2] [ref=e378]
        - list [ref=e379]:
          - listitem [ref=e380]:
            - generic [ref=e381]: Safety
      - navigation "Legal" [ref=e382]:
        - heading "Legal" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - link "Terms" [ref=e386] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e387]:
            - link "Privacy" [ref=e388] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e390]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: the filtered Data bulk bar never counted exactly two untranslated rows

expect(received).toBe(expected) // Object.is equality

Expected: "2"
Received: "0"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the filtered Data bulk bar never counted exactly two untranslated rows

expect(received).toBe(expected) // Object.is equality

Expected: "2"
Received: "0"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  492 |       await expect(fillButton).toHaveAttribute("data-scope", "filtered", { timeout: 20000 });
  493 |       await expect(fillButton).toHaveAttribute("data-count-state", "success", { timeout: 20000 });
> 494 |       await expect
      |       ^
  495 |         .poll(async () => (await fillButton.innerText()).replace(/[^0-9]/g, ""), {
  496 |           timeout: 20000,
  497 |           message: "the filtered Data bulk bar never counted exactly two untranslated rows",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:494:7
```

Context:

```text
          - listitem [ref=e311]:
            - generic [ref=e312]: About
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Help" [ref=e315]:
        - heading "Help" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Safety
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - link "Terms" [ref=e324] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e325]:
            - link "Privacy" [ref=e326] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: PW-85: "e2eflabelbksampdcp" listed the leaf without the match line

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')
Expected substring: "e2eflabelbksampdcp"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-85: "e2eflabelbksampdcp" listed the leaf without the match line with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')

--- further error 1 ---
Error: PW-85: "e2eflabelbksampdcp" listed the leaf without the match line

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')
Expected substring: "e2eflabelbksampdcp"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-85: "e2eflabelbksampdcp" listed the leaf without the match line with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')


  87 |         hit.getByTestId("post-category-hit-match"),
  88 |         `PW-85: "${word}" listed the leaf without the match line`,
> 89 |       ).toContainText(seed.label);
     |         ^
  90 |     }
  91 |
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-85-an-option-label-an-alias-and-an-Amharic-alias-each-find-the-leaf-and-the-choice-prefills-the-option-mobile-360` — Playwright's name `post-wizard-finder-POSTING-d5e02--choice-prefills-the-option-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-85: "e2eflabelikguksrnlbtt" listed the leaf without the match line

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')
Expected substring: "e2eflabelikguksrnlbtt"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-85: "e2eflabelikguksrnlbtt" listed the leaf without the match line with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')

--- further error 1 ---
Error: PW-85: "e2eflabelikguksrnlbtt" listed the leaf without the match line

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')
Expected substring: "e2eflabelikguksrnlbtt"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-85: "e2eflabelikguksrnlbtt" listed the leaf without the match line with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="[account id]"]').getByTestId('post-category-hit-match')


  87 |         hit.getByTestId("post-category-hit-match"),
  88 |         `PW-85: "${word}" listed the leaf without the match line`,
> 89 |       ).toContainText(seed.label);
     |         ^
  90 |     }
  91 |
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-85-an-option-label-an-alias-and-an-Amharic-alias-each-find-the-leaf-and-the-choice-prefills-the-option-desktop-1280` — Playwright's name `post-wizard-finder-POSTING-d5e02--choice-prefills-the-option-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-1-tr11","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:04:31.644693+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:04:31.644693+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-1-tr11')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-1-tr11","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:04:31.644693+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:04:31.644693+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e402]:
            - generic [ref=e403]: About
          - listitem [ref=e404]:
            - generic [ref=e405]: Contact
      - navigation "Help" [ref=e406]:
        - heading "Help" [level=2] [ref=e407]
        - list [ref=e408]:
          - listitem [ref=e409]:
            - generic [ref=e410]: Safety
      - navigation "Legal" [ref=e411]:
        - heading "Legal" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - link "Terms" [ref=e415] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e416]:
            - link "Privacy" [ref=e417] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e419]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: TR-12 step 4: bulk AI never landed the machine row for e2e.scratch.44593520490-local-8-local-8-mobile-360-3-tr12-b1 in scope zxx-mo (expected machine|true|true)

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true"
Received: "untranslated|false|false"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: TR-12 step 4: bulk AI never landed the machine row for e2e.scratch.44593520490-local-8-local-8-mobile-360-3-tr12-b1 in scope zxx-mo (expected machine|true|true)

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true"
Received: "untranslated|false|false"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  654 |       // Database truth, per key: the only law for bulk assertions (TR-11's pattern).
  655 |       for (const key of keys) {
> 656 |         await expect
      |         ^
  657 |           .poll(
  658 |             async () => {
  659 |               const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:656:9
```

Context:

```text
          - listitem [ref=e433]:
            - generic [ref=e434]: About
          - listitem [ref=e435]:
            - generic [ref=e436]: Contact
      - navigation "Help" [ref=e437]:
        - heading "Help" [level=2] [ref=e438]
        - list [ref=e439]:
          - listitem [ref=e440]:
            - generic [ref=e441]: Safety
      - navigation "Legal" [ref=e442]:
        - heading "Legal" [level=2] [ref=e443]
        - list [ref=e444]:
          - listitem [ref=e445]:
            - link "Terms" [ref=e446] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e447]:
            - link "Privacy" [ref=e448] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e450]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-6-tr13-break","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:06:40.944765+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:06:40.944765+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-6-tr13-break')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-6-tr13-break","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:06:40.944765+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:06:40.944765+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e402]:
            - generic [ref=e403]: About
          - listitem [ref=e404]:
            - generic [ref=e405]: Contact
      - navigation "Help" [ref=e406]:
        - heading "Help" [level=2] [ref=e407]
        - list [ref=e408]:
          - listitem [ref=e409]:
            - generic [ref=e410]: Safety
      - navigation "Legal" [ref=e411]:
        - heading "Legal" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - link "Terms" [ref=e415] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e416]:
            - link "Privacy" [ref=e417] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e419]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-35 machine translation keeps the {country} token

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-9-tr35","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:07:59.361554+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:07:59.361554+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-9-tr35')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-9-tr35","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:07:59.361554+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:07:59.361554+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e402]:
            - generic [ref=e403]: About
          - listitem [ref=e404]:
            - generic [ref=e405]: Contact
      - navigation "Help" [ref=e406]:
        - heading "Help" [level=2] [ref=e407]
        - list [ref=e408]:
          - listitem [ref=e409]:
            - generic [ref=e410]: Safety
      - navigation "Legal" [ref=e411]:
        - heading "Legal" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - link "Terms" [ref=e415] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e416]:
            - link "Privacy" [ref=e417] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e419]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-12-tr23-kept","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:09:16.871764+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:09:16.871764+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-12-tr23-kept')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-12-tr23-kept","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:09:16.871764+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:09:16.871764+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e402]:
            - generic [ref=e403]: About
          - listitem [ref=e404]:
            - generic [ref=e405]: Contact
      - navigation "Help" [ref=e406]:
        - heading "Help" [level=2] [ref=e407]
        - list [ref=e408]:
          - listitem [ref=e409]:
            - generic [ref=e410]: Safety
      - navigation "Legal" [ref=e411]:
        - heading "Legal" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - link "Terms" [ref=e415] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e416]:
            - link "Privacy" [ref=e417] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e419]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-scope AI: a translator outside the language gets the structured refusal

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 500
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 500

  925 |       });
  926 |
> 927 |       expect(refusal.status).toBe(403);
      |                              ^
  928 |       expect(refusal.error).toMatch(/not assigned to this language/i);
  929 |     } finally {
  930 |       for (const roleId of reap) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:927:30
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

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-18-tr16","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:10:40.736521+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:10:40.736521+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-mobile-360-18-tr16')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-mobile-360-18-tr16","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:10:40.736521+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:10:40.736521+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e402]:
            - generic [ref=e403]: About
          - listitem [ref=e404]:
            - generic [ref=e405]: Contact
      - navigation "Help" [ref=e406]:
        - heading "Help" [level=2] [ref=e407]
        - list [ref=e408]:
          - listitem [ref=e409]:
            - generic [ref=e410]: Safety
      - navigation "Legal" [ref=e411]:
        - heading "Legal" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - link "Terms" [ref=e415] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e416]:
            - link "Privacy" [ref=e417] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e419]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-22-tr11","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:13:58.017073+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:13:58.017073+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-22-tr11')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-22-tr11","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:13:58.017073+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:13:58.017073+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e390]:
            - generic [ref=e391]: About
          - listitem [ref=e392]:
            - generic [ref=e393]: Contact
      - navigation "Help" [ref=e394]:
        - heading "Help" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - generic [ref=e398]: Safety
      - navigation "Legal" [ref=e399]:
        - heading "Legal" [level=2] [ref=e400]
        - list [ref=e401]:
          - listitem [ref=e402]:
            - link "Terms" [ref=e403] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e404]:
            - link "Privacy" [ref=e405] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e407]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: TR-12 step 4: bulk AI never landed the machine row for e2e.scratch.44593520490-local-8-local-8-desktop-1280-27-tr12-b1 in scope zxx-de (expected machine|true|true)

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true"
Received: "untranslated|false|false"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: TR-12 step 4: bulk AI never landed the machine row for e2e.scratch.44593520490-local-8-local-8-desktop-1280-27-tr12-b1 in scope zxx-de (expected machine|true|true)

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true"
Received: "untranslated|false|false"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  654 |       // Database truth, per key: the only law for bulk assertions (TR-11's pattern).
  655 |       for (const key of keys) {
> 656 |         await expect
      |         ^
  657 |           .poll(
  658 |             async () => {
  659 |               const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:656:9
```

Context:

```text
          - listitem [ref=e408]:
            - generic [ref=e409]: About
          - listitem [ref=e410]:
            - generic [ref=e411]: Contact
      - navigation "Help" [ref=e412]:
        - heading "Help" [level=2] [ref=e413]
        - list [ref=e414]:
          - listitem [ref=e415]:
            - generic [ref=e416]: Safety
      - navigation "Legal" [ref=e417]:
        - heading "Legal" [level=2] [ref=e418]
        - list [ref=e419]:
          - listitem [ref=e420]:
            - link "Terms" [ref=e421] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e422]:
            - link "Privacy" [ref=e423] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e425]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-30-tr13-break","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:16:05.950879+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:16:05.950879+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-30-tr13-break')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-30-tr13-break","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:16:05.950879+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:16:05.950879+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e390]:
            - generic [ref=e391]: About
          - listitem [ref=e392]:
            - generic [ref=e393]: Contact
      - navigation "Help" [ref=e394]:
        - heading "Help" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - generic [ref=e398]: Safety
      - navigation "Legal" [ref=e399]:
        - heading "Legal" [level=2] [ref=e400]
        - list [ref=e401]:
          - listitem [ref=e402]:
            - link "Terms" [ref=e403] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e404]:
            - link "Privacy" [ref=e405] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e407]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-35 machine translation keeps the {country} token

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-33-tr35","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:17:23.317588+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:17:23.317588+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-33-tr35')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-33-tr35","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:17:23.317588+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:17:23.317588+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e390]:
            - generic [ref=e391]: About
          - listitem [ref=e392]:
            - generic [ref=e393]: Contact
      - navigation "Help" [ref=e394]:
        - heading "Help" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - generic [ref=e398]: Safety
      - navigation "Legal" [ref=e399]:
        - heading "Legal" [level=2] [ref=e400]
        - list [ref=e401]:
          - listitem [ref=e402]:
            - link "Terms" [ref=e403] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e404]:
            - link "Privacy" [ref=e405] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e407]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-37-tr23-kept","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:18:40.52753+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:18:40.52753+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-37-tr23-kept')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-37-tr23-kept","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:18:40.52753+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:18:40.52753+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e390]:
            - generic [ref=e391]: About
          - listitem [ref=e392]:
            - generic [ref=e393]: Contact
      - navigation "Help" [ref=e394]:
        - heading "Help" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - generic [ref=e398]: Safety
      - navigation "Legal" [ref=e399]:
        - heading "Legal" [level=2] [ref=e400]
        - list [ref=e401]:
          - listitem [ref=e402]:
            - link "Terms" [ref=e403] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e404]:
            - link "Privacy" [ref=e405] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e407]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-scope AI: a translator outside the language gets the structured refusal

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 500
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 500

  925 |       });
  926 |
> 927 |       expect(refusal.status).toBe(403);
      |                              ^
  928 |       expect(refusal.error).toMatch(/not assigned to this language/i);
  929 |     } finally {
  930 |       for (const roleId of reap) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:927:30
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - link "Terms" [ref=e347] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e348]:
            - link "Privacy" [ref=e349] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-42-tr16","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:20:05.450672+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:20:05.450672+00:00","orphaned":false,"origin":"manual","context":null}
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16').getByTestId('string-saved-e2e-scratch-44593520490-local-8-local-8-desktop-1280-42-tr16')

[e2e:l4c] route /api/translate → 500 {"error":"server error","incident":"[account id]"}
pooled user [account id]
DB row: {"key":"e2e.scratch.44593520490-local-8-local-8-desktop-1280-42-tr16","lang_code":"am","value":null,"status":"untranslated","machine":false,"flagged":false,"flag_note":null,"updated_by":null,"updated_at":"2026-11-19T19:20:05.450672+00:00","approved_by":null,"approved_at":null,"created_at":"2026-11-19T19:20:05.450672+00:00","orphaned":false,"origin":"manual","context":null}

   95 |     await assertion();
   96 |   } catch (error) {
>  97 |     throw new Error(`${errorText(error)}\n[e2e:l4c] ${await evidence()}`);
      |           ^
   98 |   }
```

Context:

```text
          - listitem [ref=e390]:
            - generic [ref=e391]: About
          - listitem [ref=e392]:
            - generic [ref=e393]: Contact
      - navigation "Help" [ref=e394]:
        - heading "Help" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - generic [ref=e398]: Safety
      - navigation "Legal" [ref=e399]:
        - heading "Legal" [level=2] [ref=e400]
        - list [ref=e401]:
          - listitem [ref=e402]:
            - link "Terms" [ref=e403] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e404]:
            - link "Privacy" [ref=e405] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e407]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnx6vouspju9a_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnx6vouspju9a_idn" id="post-attr-e2e_mwnx6vouspju9a_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-a40fa-s-it-back-in-both-languages-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnx9j5y2gkl1r_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnx9j5y2gkl1r_idn" id="post-attr-e2e_mwnx9j5y2gkl1r_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-56-an-hourly-basis-fixes-the-period-to-the-hour-and-a-changed-basis-moves-it-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-6ea10-nd-a-changed-basis-moves-it-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxc5vm03q65e_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxc5vm03q65e_idn" id="post-attr-e2e_mwnxc5vm03q65e_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-109-a-quote-basis-forces-contact-and-a-changed-basis-releases-it-INC-375-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-9a05b--basis-releases-it-INC-375--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxesl8g36mep_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxesl8g36mep_idn" id="post-attr-e2e_mwnxesl8g36mep_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-108-an-Other-basis-names-the-seller-s-written-unit-INC-371-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-df19a-ler-s-written-unit-INC-371--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxhifbm6p5s0_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxhifbm6p5s0_idn" id="post-attr-e2e_mwnxhifbm6p5s0_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-1e8b2-iews-as-a-price-per-quintal-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxk52iao7ocx_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxk52iao7ocx_idn" id="post-attr-e2e_mwnxk52iao7ocx_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-62e66-valid-one-advances-INC-301--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxmrvwqxjym8_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxmrvwqxjym8_idn" id="post-attr-e2e_mwnxmrvwqxjym8_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-63-the-pricing-basis-is-asked-on-the-price-step-refused-there-when-empty-and-still-shapes-the-period-D62-2-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-ccd8b-ll-shapes-the-period-D62-2--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxpepcniub6q_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxpepcniub6q_idn" id="post-attr-e2e_mwnxpepcniub6q_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-43ca0-ct-price-clears-it-DEC-081--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxs9sp44gvo4_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxs9sp44gvo4_idn" id="post-attr-e2e_mwnxs9sp44gvo4_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-67-a-commission-basis-chosen-on-step-5-is-stored-on-the-draft-before-the-percentage-is-typed-INC-312-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-82f73-ercentage-is-typed-INC-312--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxv0cyy2tkde_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxv0cyy2tkde_idn" id="post-attr-e2e_mwnxv0cyy2tkde_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9)

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxxprowjr9gt_type"]').locator('option[value="e2e_mwnxxprowjr9gt_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxxprowjr9gt_type"]').locator('option[value="e2e_mwnxxprowjr9gt_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxxprowjr9gt_type"]').locator('option[value="e2e_mwnxxprowjr9gt_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxxprowjr9gt_type"]').locator('option[value="e2e_mwnxxprowjr9gt_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1094 |     const listingId = await reachStep3(page, userId, category);
  1095 |     const type = specControl(page, set.typeKey);
> 1096 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
       |                                                                    ^
  1097 |       timeout: 20_000,
  1098 |     });
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-136-a-product-type-that-allows-only-some-units-narrows-the-unit-list-on-the-price-page-bundle-4-step-9-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-e2f9a-price-page-bundle-4-step-9--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxyq3z32lgli_type"]').locator('option[value="e2e_mwnxyq3z32lgli_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxyq3z32lgli_type"]').locator('option[value="e2e_mwnxyq3z32lgli_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxyq3z32lgli_type"]').locator('option[value="e2e_mwnxyq3z32lgli_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxyq3z32lgli_type"]').locator('option[value="e2e_mwnxyq3z32lgli_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1094 |     const listingId = await reachStep3(page, userId, category);
  1095 |     const type = specControl(page, set.typeKey);
> 1096 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
       |                                                                    ^
  1097 |       timeout: 20_000,
  1098 |     });
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-137-Pieces-per-Pack-shows-with-per-pack-and-goes-with-its-value-on-another-unit-the-size-and-terms-lines-read-under-the-price-bundle-4-steps-9-10-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-70be6--price-bundle-4-steps-9-10--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9)

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxzqm1xaoqvg_type"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxzqm1xaoqvg_type" id="post-attr-e2e_mwnxzqm1xaoqvg_type" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
    - waiting for element to be visible and enabled
  - element was detached from the DOM, retrying

```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-138-a-required-unit-left-empty-is-refused-on-the-price-page-s-Next-not-on-the-specifications-page-s-bundle-4-step-9-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-ec116-ons-page-s-bundle-4-step-9--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12)

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwny2ig2cizacq_type"]').locator('option[value="e2e_mwny2ig2cizacq_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny2ig2cizacq_type"]').locator('option[value="e2e_mwny2ig2cizacq_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwny2ig2cizacq_type"]').locator('option[value="e2e_mwny2ig2cizacq_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny2ig2cizacq_type"]').locator('option[value="e2e_mwny2ig2cizacq_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1094 |     const listingId = await reachStep3(page, userId, category);
  1095 |     const type = specControl(page, set.typeKey);
> 1096 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
       |                                                                    ^
  1097 |       timeout: 20_000,
  1098 |     });
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-140-the-title-page-opens-with-a-title-written-from-the-answers-and-the-seller-s-edit-survives-a-changed-answer-bundle-4-step-12-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-a8714-ed-answer-bundle-4-step-12--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455)

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwny3irxw520ph_type"]').locator('option[value="e2e_mwny3irxw520ph_open"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny3irxw520ph_type"]').locator('option[value="e2e_mwny3irxw520ph_open"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwny3irxw520ph_type"]').locator('option[value="e2e_mwny3irxw520ph_open"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny3irxw520ph_type"]').locator('option[value="e2e_mwny3irxw520ph_open"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1367 |     const listingId = await reachStep3(page, user.id, category);
  1368 |     const type = specControl(page, set.typeKey);
> 1369 |     await expect(type.locator(`option[value="${openType}"]`)).toHaveCount(1, { timeout: 20_000 });
       |                                                               ^
  1370 |     await type.selectOption(openType);
  1371 |     await nextThroughPhotos(page);
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-e-a-basis-emptied-by-a-specification-change-after-the-title-step-leaves-no-refusal-on-specifications-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-ca751--on-specifications-INC-455--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxs8yr1ojy1r_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxs8yr1ojy1r_idn" id="post-attr-e2e_mwnxs8yr1ojy1r_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-a40fa-s-it-back-in-both-languages-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxuwjej4zkdz_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxuwjej4zkdz_idn" id="post-attr-e2e_mwnxuwjej4zkdz_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-56-an-hourly-basis-fixes-the-period-to-the-hour-and-a-changed-basis-moves-it-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-6ea10-nd-a-changed-basis-moves-it-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxxjcy19wx16_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnxxjcy19wx16_idn" id="post-attr-e2e_mwnxxjcy19wx16_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-109-a-quote-basis-forces-contact-and-a-changed-basis-releases-it-INC-375-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-9a05b--basis-releases-it-INC-375--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny06b6ht1jmk_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwny06b6ht1jmk_idn" id="post-attr-e2e_mwny06b6ht1jmk_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-108-an-Other-basis-names-the-seller-s-written-unit-INC-371-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-df19a-ler-s-written-unit-INC-371--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny2uusow8gl4_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwny2uusow8gl4_idn" id="post-attr-e2e_mwny2uusow8gl4_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-1e8b2-iews-as-a-price-per-quintal-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny5hsqdtwpr9_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwny5hsqdtwpr9_idn" id="post-attr-e2e_mwny5hsqdtwpr9_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-62e66-valid-one-advances-INC-301--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwny84st4rkekh_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwny84st4rkekh_idn" id="post-attr-e2e_mwny84st4rkekh_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-63-the-pricing-basis-is-asked-on-the-price-step-refused-there-when-empty-and-still-shapes-the-period-D62-2-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-ccd8b-ll-shapes-the-period-D62-2--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyarxgbyk3ol_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnyarxgbyk3ol_idn" id="post-attr-e2e_mwnyarxgbyk3ol_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-43ca0-ct-price-clears-it-DEC-081--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnydkwli2wtut_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnydkwli2wtut_idn" id="post-attr-e2e_mwnydkwli2wtut_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-67-a-commission-basis-chosen-on-step-5-is-stored-on-the-draft-before-the-percentage-is-typed-INC-312-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-82f73-ercentage-is-typed-INC-312--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnygarafif9lm_idn"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnygarafif9lm_idn" id="post-attr-e2e_mwnygarafif9lm_idn" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyj0ip25uovm_type"]').locator('option[value="e2e_mwnyj0ip25uovm_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyj0ip25uovm_type"]').locator('option[value="e2e_mwnyj0ip25uovm_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyj0ip25uovm_type"]').locator('option[value="e2e_mwnyj0ip25uovm_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyj0ip25uovm_type"]').locator('option[value="e2e_mwnyj0ip25uovm_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1094 |     const listingId = await reachStep3(page, userId, category);
  1095 |     const type = specControl(page, set.typeKey);
> 1096 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
       |                                                                    ^
  1097 |       timeout: 20_000,
  1098 |     });
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-136-a-product-type-that-allows-only-some-units-narrows-the-unit-list-on-the-price-page-bundle-4-step-9-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-e2f9a-price-page-bundle-4-step-9--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyk0zz01nbae_type"]').locator('option[value="e2e_mwnyk0zz01nbae_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyk0zz01nbae_type"]').locator('option[value="e2e_mwnyk0zz01nbae_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyk0zz01nbae_type"]').locator('option[value="e2e_mwnyk0zz01nbae_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyk0zz01nbae_type"]').locator('option[value="e2e_mwnyk0zz01nbae_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1094 |     const listingId = await reachStep3(page, userId, category);
  1095 |     const type = specControl(page, set.typeKey);
> 1096 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
       |                                                                    ^
  1097 |       timeout: 20_000,
  1098 |     });
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-137-Pieces-per-Pack-shows-with-per-pack-and-goes-with-its-value-on-another-unit-the-size-and-terms-lines-read-under-the-price-bundle-4-steps-9-10-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-70be6--price-bundle-4-steps-9-10--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyl1j7lf1r6m_type"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_mwnyl1j7lf1r6m_type" id="post-attr-e2e_mwnyl1j7lf1r6m_type" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-138-a-required-unit-left-empty-is-refused-on-the-price-page-s-Next-not-on-the-specifications-page-s-bundle-4-step-9-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-ec116-ons-page-s-bundle-4-step-9--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyntisfx0f2k_type"]').locator('option[value="e2e_mwnyntisfx0f2k_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyntisfx0f2k_type"]').locator('option[value="e2e_mwnyntisfx0f2k_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyntisfx0f2k_type"]').locator('option[value="e2e_mwnyntisfx0f2k_narrow"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyntisfx0f2k_type"]').locator('option[value="e2e_mwnyntisfx0f2k_narrow"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1094 |     const listingId = await reachStep3(page, userId, category);
  1095 |     const type = specControl(page, set.typeKey);
> 1096 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
       |                                                                    ^
  1097 |       timeout: 20_000,
  1098 |     });
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-140-the-title-page-opens-with-a-title-written-from-the-answers-and-the-seller-s-edit-survives-a-changed-answer-bundle-4-step-12-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-a8714-ed-answer-bundle-4-step-12--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455)

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyou1am83x4l_type"]').locator('option[value="e2e_mwnyou1am83x4l_open"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyou1am83x4l_type"]').locator('option[value="e2e_mwnyou1am83x4l_open"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyou1am83x4l_type"]').locator('option[value="e2e_mwnyou1am83x4l_open"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnyou1am83x4l_type"]').locator('option[value="e2e_mwnyou1am83x4l_open"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1367 |     const listingId = await reachStep3(page, user.id, category);
  1368 |     const type = specControl(page, set.typeKey);
> 1369 |     await expect(type.locator(`option[value="${openType}"]`)).toHaveCount(1, { timeout: 20_000 });
       |                                                               ^
  1370 |     await type.selectOption(openType);
  1371 |     await nextThroughPhotos(page);
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-e-a-basis-emptied-by-a-specification-change-after-the-title-step-leaves-no-refusal-on-specifications-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-ca751--on-specifications-INC-455--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown group"
Received: "badValue:group"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown group"
Received: "badValue:group"

  299 |
  300 |     const unknown = await myListings(s.a, "paused");
> 301 |     expect(unknown.error).toBe("unknown group");
      |                           ^
  302 |     const badPage = await myListings(s.a, "live", 101, 0);
  303 |     expect(badPage.error).toBe("bad page");
  304 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:301:27
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-1-my_listings-the-seller-s-own-ads-in-six-groups-newest-change-first-with-their-counts-nobody-else-s-mobile-360` — Playwright's name `my-listings-page-MY-LISTIN-3e815--their-counts-nobody-else-s-mobile-360`; this run carried 76 context file(s); of the same spec: none

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181)

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "bad search"
Received: "badValue:search"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "bad search"
Received: "badValue:search"

  566 |       p_search: "a".repeat(101),
  567 |     });
> 568 |     expect(long.error).toBe("bad search");
      |                        ^
  569 |     const gone = await a.rpc("my_listings", {
  570 |       p_group: "live",
  571 |       p_limit: 50,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:568:24
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-5-my_listings-the-search-the-filters-and-the-renew-setting-the-counts-follow-them-D181-mobile-360` — Playwright's name `my-listings-page-MY-LISTIN-68d07-he-counts-follow-them-D181--mobile-360`; this run carried 76 context file(s); of the same spec: none

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown group"
Received: "badValue:group"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown group"
Received: "badValue:group"

  299 |
  300 |     const unknown = await myListings(s.a, "paused");
> 301 |     expect(unknown.error).toBe("unknown group");
      |                           ^
  302 |     const badPage = await myListings(s.a, "live", 101, 0);
  303 |     expect(badPage.error).toBe("bad page");
  304 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:301:27
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-1-my_listings-the-seller-s-own-ads-in-six-groups-newest-change-first-with-their-counts-nobody-else-s-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-3e815--their-counts-nobody-else-s-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "bad search"
Received: "badValue:search"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "bad search"
Received: "badValue:search"

  566 |       p_search: "a".repeat(101),
  567 |     });
> 568 |     expect(long.error).toBe("bad search");
      |                        ^
  569 |     const gone = await a.rpc("my_listings", {
  570 |       p_group: "live",
  571 |       p_limit: 50,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:568:24
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-5-my_listings-the-search-the-filters-and-the-renew-setting-the-counts-follow-them-D181-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-68d07-he-counts-follow-them-D181--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 11`
- Project: `mobile-360`

```text
Error: [INC-562] step 8 did not come after Next. Saves (draft, identity): draft 200 after 59 ms, ok=true | identity 200 after 106 ms, ok=false (door:doorError). Refusal lines shown: none.
--- further error 1 ---
Error: [INC-562] step 8 did not come after Next. Saves (draft, identity): draft 200 after 59 ms, ok=true | identity 200 after 106 ms, ok=false (door:doorError). Refusal lines shown: none.

   at helpers/posting.ts:2841

  2839 |       .allInnerTexts()
  2840 |       .catch(() => [] as string[]);
> 2841 |     throw new Error(
       |           ^
  2842 |       `[INC-562] step ${String(step)} did not come after Next. Saves (draft, identity): ${
  2843 |         answered.join(" | ") || "none answered"
  2844 |       }. Refusal lines shown: ${shown.join(" | ") || "none"}.`,
    at nextToStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:2841:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:485:5
[cause]: Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 172000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 172000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-11_3_3rzv0h_select"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-11_3_3rzv0h_select" id="post-attr-e2e_post_local-11_3_3rzv0h_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    337 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_pin_mobile360_12_1795115655808_brand"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_pin_mobile360_12_1795115655808_brand" id="post-attr-e2e_pin_mobile360_12_1795115655808_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360` — Playwright's name `post-wizard-place-POSTING--d27b1-and-still-reviewed-DEC-085--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_big_mobile360_15_1795115778510_brand"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_big_mobile360_15_1795115778510_brand" id="post-attr-e2e_big_mobile360_15_1795115778510_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-mobile-360` — Playwright's name `post-wizard-place-POSTING--e7684-he-brand-is-chosen-INC-336--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: [INC-562] step 8 did not come after Next. Saves (draft, identity): draft 200 after 63 ms, ok=true | identity 200 after 90 ms, ok=false (door:doorError). Refusal lines shown: none.
--- further error 1 ---
Error: [INC-562] step 8 did not come after Next. Saves (draft, identity): draft 200 after 63 ms, ok=true | identity 200 after 90 ms, ok=false (door:doorError). Refusal lines shown: none.

   at helpers/posting.ts:2841

  2839 |       .allInnerTexts()
  2840 |       .catch(() => [] as string[]);
> 2841 |     throw new Error(
       |           ^
  2842 |       `[INC-562] step ${String(step)} did not come after Next. Saves (draft, identity): ${
  2843 |         answered.join(" | ") || "none answered"
  2844 |       }. Refusal lines shown: ${shown.join(" | ") || "none"}.`,
    at nextToStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:2841:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:485:5
[cause]: Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 172000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 172000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-11_11_5ku2uy_select"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-11_11_5ku2uy_select" id="post-attr-e2e_post_local-11_11_5ku2uy_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    337 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_pin_desktop1280_17_1795115959493_brand"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_pin_desktop1280_17_1795115959493_brand" id="post-attr-e2e_pin_desktop1280_17_1795115959493_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-desktop-1280` — Playwright's name `post-wizard-place-POSTING--d27b1-and-still-reviewed-DEC-085--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_big_desktop1280_24_1795116082737_brand"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_big_desktop1280_24_1795116082737_brand" id="post-attr-e2e_big_desktop1280_24_1795116082737_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
    - waiting for element to be visible and enabled
  - element was detached from the DOM, retrying

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-desktop-1280` — Playwright's name `post-wizard-place-POSTING--e7684-he-brand-is-chosen-INC-336--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page

- Source: `shard 11`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnx9dgho24lg7_type"]').locator('option[value="e2e_mwnx9dgho24lg7_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnx9dgho24lg7_type"]').locator('option[value="e2e_mwnx9dgho24lg7_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnx9dgho24lg7_type"]').locator('option[value="e2e_mwnx9dgho24lg7_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnx9dgho24lg7_type"]').locator('option[value="e2e_mwnx9dgho24lg7_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  393 |     const listingId = await walkToStep3(page, user.id, category);
  394 |     const type = control(page, set.typeKey);
> 395 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      |                                                                    ^
  396 |       timeout: 20_000,
  397 |     });
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-88-a-step-3-answer-s-fact-and-narrowing-reach-the-unit-asked-on-the-price-page-mobile-360` — Playwright's name `post-wizard-where-POSTING--ab826-nit-asked-on-the-price-page-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit

- Source: `shard 11`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxacpn5rble6_type"]').locator('option[value="e2e_mwnxacpn5rble6_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxacpn5rble6_type"]').locator('option[value="e2e_mwnxacpn5rble6_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxacpn5rble6_type"]').locator('option[value="e2e_mwnxacpn5rble6_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxacpn5rble6_type"]').locator('option[value="e2e_mwnxacpn5rble6_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  444 |     const listingId = await walkToStep3(page, user.id, category);
  445 |     const type = control(page, set.typeKey);
> 446 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      |                                                                    ^
  447 |       timeout: 20_000,
  448 |     });
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-104-a-unit-settled-by-the-type-is-held-by-the-price-page-s-unit-mobile-360` — Playwright's name `post-wizard-where-POSTING--1e07f-ld-by-the-price-page-s-unit-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxojt6lym3jl_type"]').locator('option[value="e2e_mwnxojt6lym3jl_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxojt6lym3jl_type"]').locator('option[value="e2e_mwnxojt6lym3jl_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxojt6lym3jl_type"]').locator('option[value="e2e_mwnxojt6lym3jl_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxojt6lym3jl_type"]').locator('option[value="e2e_mwnxojt6lym3jl_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  393 |     const listingId = await walkToStep3(page, user.id, category);
  394 |     const type = control(page, set.typeKey);
> 395 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      |                                                                    ^
  396 |       timeout: 20_000,
  397 |     });
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-88-a-step-3-answer-s-fact-and-narrowing-reach-the-unit-asked-on-the-price-page-desktop-1280` — Playwright's name `post-wizard-where-POSTING--ab826-nit-asked-on-the-price-page-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxpjezzv37hq_type"]').locator('option[value="e2e_mwnxpjezzv37hq_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxpjezzv37hq_type"]').locator('option[value="e2e_mwnxpjezzv37hq_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxpjezzv37hq_type"]').locator('option[value="e2e_mwnxpjezzv37hq_milk"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_mwnxpjezzv37hq_type"]').locator('option[value="e2e_mwnxpjezzv37hq_milk"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  444 |     const listingId = await walkToStep3(page, user.id, category);
  445 |     const type = control(page, set.typeKey);
> 446 |     await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      |                                                                    ^
  447 |       timeout: 20_000,
  448 |     });
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-104-a-unit-settled-by-the-type-is-held-by-the-price-page-s-unit-desktop-1280` — Playwright's name `post-wizard-where-POSTING--1e07f-ld-by-the-price-page-s-unit-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  311 |     ] as const) {
  312 |       const refused = await person.rpc("my_listing", { p_listing_id: id });
> 313 |       expect(refused.error).toBe("not your listing");
      |                             ^
  314 |       expect(refused.data).toBeNull();
  315 |     }
  316 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:313:29
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-1-my_listing-the-seller-s-own-ad-with-the-list-s-row-its-group-the-status-it-reopens-to-and-the-renew-setting-nobody-else-s-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-8dfb1-renew-setting-nobody-else-s-mobile-360`; this run carried 76 context file(s); of the same spec: `my-listings-ad-MY-LISTINGS-9d729-s-ad-and-a-signed-out-visit-desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--mobile-360`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--mobile-360`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--desktop-1280`

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-2 listing_history says which way a Reserved change went

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  343 |
  344 |     const refused = await s.rpc("listing_history", { p_listing_id: randomId() });
> 345 |     expect(refused.error).toBe("not your listing");
      |                           ^
  346 |   });
  347 |
  348 |   test("MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:345:27
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-2-listing_history-says-which-way-a-Reserved-change-went-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-d6a42--way-a-Reserved-change-went-mobile-360`; this run carried 76 context file(s); of the same spec: `my-listings-ad-MY-LISTINGS-9d729-s-ad-and-a-signed-out-visit-desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--mobile-360`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--mobile-360`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--desktop-1280`

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('my-listing-not-found')
Expected: "This ad is not one of yours, or it no longer exists."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listing-not-found')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('my-listing-not-found')
Expected: "This ad is not one of yours, or it no longer exists."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listing-not-found')


  572 |
  573 |     await openAd(page, Y);
> 574 |     await expect(page.getByTestId("my-listing-not-found")).toHaveText(
      |                                                            ^
  575 |       en["myListings.ad.notFound"],
  576 |       { timeout: 15000 },
  577 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:574:60
```

Context:

```text
          - listitem [ref=e172]:
            - generic [ref=e173]: About
          - listitem [ref=e174]:
            - generic [ref=e175]: Contact
      - navigation "Help" [ref=e176]:
        - heading "Help" [level=2] [ref=e177]
        - list [ref=e178]:
          - listitem [ref=e179]:
            - generic [ref=e180]: Safety
      - navigation "Legal" [ref=e181]:
        - heading "Legal" [level=2] [ref=e182]
        - list [ref=e183]:
          - listitem [ref=e184]:
            - link "Terms" [ref=e185] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e186]:
            - link "Privacy" [ref=e187] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e189]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F)

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  621 |     }
  622 |     const gone = await s.rpc("my_listing", { p_listing_id: X });
> 623 |     expect(gone.error).toBe("not your listing");
      |                        ^
  624 |     await openAd(page, X);
  625 |     await expect(page.getByTestId("my-listing-not-found")).toHaveText(
  626 |       en["myListings.ad.notFound"],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:623:24
```

Context:

```text
          - listitem [ref=e204]:
            - generic [ref=e205]: About
          - listitem [ref=e206]:
            - generic [ref=e207]: Contact
      - navigation "Help" [ref=e208]:
        - heading "Help" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - generic [ref=e212]: Safety
      - navigation "Legal" [ref=e213]:
        - heading "Legal" [level=2] [ref=e214]
        - list [ref=e215]:
          - listitem [ref=e216]:
            - link "Terms" [ref=e217] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e218]:
            - link "Privacy" [ref=e219] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e221]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('post-review')


  1095 |       await page.getByTestId("post-who-show-phone").check();
  1096 |       await page.getByTestId("post-next").click();
> 1097 |       await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 15000 });
       |                                                     ^
  1098 |       await expect(page.getByTestId("post-edit-notice")).toHaveText(en["myListings.editBox.done"], {
  1099 |         timeout: 15000,
  1100 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1097:53
```

Context:

```text
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
      - navigation "Legal" [ref=e336]:
        - heading "Legal" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - link "Terms" [ref=e340] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e341]:
            - link "Privacy" [ref=e342] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e344]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  311 |     ] as const) {
  312 |       const refused = await person.rpc("my_listing", { p_listing_id: id });
> 313 |       expect(refused.error).toBe("not your listing");
      |                             ^
  314 |       expect(refused.data).toBeNull();
  315 |     }
  316 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:313:29
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-1-my_listing-the-seller-s-own-ad-with-the-list-s-row-its-group-the-status-it-reopens-to-and-the-renew-setting-nobody-else-s-desktop-1280` — Playwright's name `my-listings-ad-MY-LISTINGS-8dfb1-renew-setting-nobody-else-s-desktop-1280`; this run carried 76 context file(s); of the same spec: `my-listings-ad-MY-LISTINGS-9d729-s-ad-and-a-signed-out-visit-desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--mobile-360`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--mobile-360`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--desktop-1280`

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-2 listing_history says which way a Reserved change went

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  343 |
  344 |     const refused = await s.rpc("listing_history", { p_listing_id: randomId() });
> 345 |     expect(refused.error).toBe("not your listing");
      |                           ^
  346 |   });
  347 |
  348 |   test("MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:345:27
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-2-listing_history-says-which-way-a-Reserved-change-went-desktop-1280` — Playwright's name `my-listings-ad-MY-LISTINGS-d6a42--way-a-Reserved-change-went-desktop-1280`; this run carried 76 context file(s); of the same spec: `my-listings-ad-MY-LISTINGS-9d729-s-ad-and-a-signed-out-visit-desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--mobile-360`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--desktop-1280-retry1`, `my-listings-ad-MY-LISTINGS-84178--the-new-city-D194-INC-659--mobile-360`, `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--desktop-1280`

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('my-listing-not-found')
Expected: "This ad is not one of yours, or it no longer exists."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listing-not-found')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('my-listing-not-found')
Expected: "This ad is not one of yours, or it no longer exists."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listing-not-found')


  572 |
  573 |     await openAd(page, Y);
> 574 |     await expect(page.getByTestId("my-listing-not-found")).toHaveText(
      |                                                            ^
  575 |       en["myListings.ad.notFound"],
  576 |       { timeout: 15000 },
  577 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:574:60
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
      - navigation "Legal" [ref=e230]:
        - heading "Legal" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Terms" [ref=e234] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e235]:
            - link "Privacy" [ref=e236] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e238]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  621 |     }
  622 |     const gone = await s.rpc("my_listing", { p_listing_id: X });
> 623 |     expect(gone.error).toBe("not your listing");
      |                        ^
  624 |     await openAd(page, X);
  625 |     await expect(page.getByTestId("my-listing-not-found")).toHaveText(
  626 |       en["myListings.ad.notFound"],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:623:24
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: Contact
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
      - navigation "Legal" [ref=e262]:
        - heading "Legal" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - link "Terms" [ref=e266] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e267]:
            - link "Privacy" [ref=e268] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e270]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('post-review')


  1095 |       await page.getByTestId("post-who-show-phone").check();
  1096 |       await page.getByTestId("post-next").click();
> 1097 |       await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 15000 });
       |                                                     ^
  1098 |       await expect(page.getByTestId("post-edit-notice")).toHaveText(en["myListings.editBox.done"], {
  1099 |         timeout: 15000,
  1100 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1097:53
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_0_h2je78_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_0_h2je78_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_0_h2je78_select" id="post-attr-e2e_post_local-12_0_h2je78_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_0_h2je78_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_0_h2je78_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_0_h2je78_select" id="post-attr-e2e_post_local-12_0_h2je78_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  267 |     );
  268 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 269 |     await expect(picker).toHaveAttribute("data-options", "ready");
      |                          ^
  270 |     // Two scratch options plus the "choose" placeholder.
  271 |     await expect(picker.locator("option")).toHaveCount(3);
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-mobile-360` — Playwright's name `post-wizard-specs-POSTING--44a2d--detail-is-refused-under-it-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-145 an over-limit options read says so under its control, and a second open loads the list

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_8_oi2ogs_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_8_oi2ogs_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-12_8_oi2ogs_select" id="post-attr-e2e_post_local-12_8_oi2ogs_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_8_oi2ogs_select" id="post-attr-e2e_post_local-12_8_oi2ogs_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_8_oi2ogs_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_8_oi2ogs_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-12_8_oi2ogs_select" id="post-attr-e2e_post_local-12_8_oi2ogs_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_8_oi2ogs_select" id="post-attr-e2e_post_local-12_8_oi2ogs_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  404 |     await picker.blur();
  405 |     await picker.focus();
> 406 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-145-an-over-limit-options-read-says-so-under-its-control-and-a-second-open-loads-the-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--00e71--second-open-loads-the-list-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_oth_mobile360_13_1795115094799_one"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_oth_mobile360_13_1795115094799_one" id="post-attr-e2e_oth_mobile360_13_1795115094799_one" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-120-a-phone-number-in-an-Other-write-in-is-flagged-as-typed-single-and-multi-mobile-360` — Playwright's name `post-wizard-specs-POSTING--0cc37-d-as-typed-single-and-multi-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_oth_mobile360_17_1795115218034_one"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_oth_mobile360_17_1795115218034_one" id="post-attr-e2e_oth_mobile360_17_1795115218034_one" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-106-an-empty-Other-write-in-is-refused-and-focused-on-Next-INC-369-mobile-360` — Playwright's name `post-wizard-specs-POSTING--8b043-nd-focused-on-Next-INC-369--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.check: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-checks"][data-attr="e2e_oth_mobile360_28_1795115341183_many"]').locator('[data-testid="post-attr-check"][data-value="e2e_oth_mobile360_28_1795115341183_a"]')


  662 |     await checks
  663 |       .locator(`[data-testid="post-attr-check"][data-value="${keys.single.replace("_one", "_a")}"]`)
> 664 |       .check();
      |        ^
  665 |     await expect(otherBox(page, keys.multi)).toHaveCount(0);
  666 |     await checks.locator('[data-testid="post-attr-check"][data-value="other"]').check();
  667 |     await otherBox(page, keys.multi).fill("barley");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:664:8
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-107-a-multi-choice-Other-carries-its-write-in-to-the-draft-INC-370-mobile-360` — Playwright's name `post-wizard-specs-POSTING--65408-te-in-to-the-draft-INC-370--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_lazy_mobile360_32_1795115463590_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_lazy_mobile360_32_1795115463590_make" id="post-attr-e2e_lazy_mobile360_32_1795115463590_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-mobile-360` — Playwright's name `post-wizard-specs-POSTING--6ecf9--entry-with-no-tap-INC-320--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_trip_mobile360_38_1795115597980_identity"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_trip_mobile360_38_1795115597980_identity" id="post-attr-e2e_trip_mobile360_38_1795115597980_identity" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--4c4ed-r-INC-329-small-model-list--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_trip_mobile360_42_1795115720566_identity"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_trip_mobile360_42_1795115720566_identity" id="post-attr-e2e_trip_mobile360_42_1795115720566_identity" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_46_ywfj2c_select"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-12_46_ywfj2c_select" id="post-attr-e2e_post_local-12_46_ywfj2c_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-mobile-360` — Playwright's name `post-wizard-specs-POSTING--98508--the-door-to-judge-the-step-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: PW-21: the child was open with no parent chosen

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_50_1c52n6_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-21: the child was open with no parent chosen with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_50_1c52n6_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_50_1c52n6_model" id="post-attr-e2e_fold_local-12_50_1c52n6_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"

--- further error 1 ---
Error: PW-21: the child was open with no parent chosen

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_50_1c52n6_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-21: the child was open with no parent chosen with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_50_1c52n6_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_50_1c52n6_model" id="post-attr-e2e_fold_local-12_50_1c52n6_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"


  1314 |
  1315 |     // WITH NO PARENT ANSWER the child is closed and says which answer it waits for.
> 1316 |     await expect(model, "PW-21: the child was open with no parent chosen").toBeDisabled();
       |                                                                            ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-21-a-child-detail-shows-only-the-chosen-parent-s-options-and-clears-on-change-mobile-360` — Playwright's name `post-wizard-specs-POSTING--59573-ptions-and-clears-on-change-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_52_hvhaot_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_52_hvhaot_make" id="post-attr-e2e_fold_local-12_52_hvhaot_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    111 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-188-a-list-that-hangs-under-another-answer-offers-its-shared-Other-last-under-every-parent-and-stores-the-seller-s-words-INC-609-mobile-360` — Playwright's name `post-wizard-specs-POSTING--272e6-the-seller-s-words-INC-609--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: PW-22: the link's default did not prefill

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_56_5014xh_unit"]')
Expected: "e2e_fold_local-12_56_5014xh_pc"
Received: ""
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not prefill with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_56_5014xh_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_56_5014xh_unit" id="post-attr-e2e_fold_local-12_56_5014xh_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value ""

--- further error 1 ---
Error: PW-22: the link's default did not prefill

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_56_5014xh_unit"]')
Expected: "e2e_fold_local-12_56_5014xh_pc"
Received: ""
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not prefill with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_56_5014xh_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_56_5014xh_unit" id="post-attr-e2e_fold_local-12_56_5014xh_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value ""


  1407 |       `[data-testid="post-attr-control"][data-attr="${fold.unit.attrKey}"]`,
  1408 |     );
> 1409 |     await expect(unit, "PW-22: the link's default did not prefill").toHaveValue(
       |                                                                     ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-mobile-360` — Playwright's name `post-wizard-specs-POSTING--b6583-er-and-its-default-prefills-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_cond_local-12_59_5w6g6q_fuel"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_cond_local-12_59_5w6g6q_fuel" id="post-attr-e2e_cond_local-12_59_5w6g6q_fuel" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360` — Playwright's name `post-wizard-specs-POSTING--25a96-y-when-its-condition-is-met-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_63_awlhko_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_63_awlhko_make" id="post-attr-e2e_fold_local-12_63_awlhko_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    110 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-mobile-360` — Playwright's name `post-wizard-specs-POSTING--9df45-fill-the-siblings-they-name-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288)

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: PW-25: e2e_deep_local-12_67_qpo1ch_brand never loaded its options

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_67_qpo1ch_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - PW-25: e2e_deep_local-12_67_qpo1ch_brand never loaded its options with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_67_qpo1ch_brand"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_deep_local-12_67_qpo1ch_brand" id="post-attr-e2e_deep_local-12_67_qpo1ch_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_deep_local-12_67_qpo1ch_brand" id="post-attr-e2e_deep_local-12_67_qpo1ch_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: PW-25: e2e_deep_local-12_67_qpo1ch_brand never loaded its options

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_67_qpo1ch_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - PW-25: e2e_deep_local-12_67_qpo1ch_brand never loaded its options with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_67_qpo1ch_brand"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_deep_local-12_67_qpo1ch_brand" id="post-attr-e2e_deep_local-12_67_qpo1ch_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_deep_local-12_67_qpo1ch_brand" id="post-attr-e2e_deep_local-12_67_qpo1ch_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  1610 |       const picker = control(attrKey);
  1611 |       await picker.focus();
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-and-relative-bounds-resolve-as-the-door-does-INC-288-mobile-360` — Playwright's name `post-wizard-specs-POSTING--36116-e-as-the-door-does-INC-288--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_listfact_1795116471542_als2c6_food"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_listfact_1795116471542_als2c6_food" id="post-attr-e2e_listfact_1795116471542_als2c6_food" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
    - waiting for element to be visible and enabled
  - element was detached from the DOM, retrying

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-159-a-list-fact-ticks-its-tick-list-once-and-the-seller-s-untick-stays-mobile-360` — Playwright's name `post-wizard-specs-POSTING--3d2b2-d-the-seller-s-untick-stays-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_settle_1795116593579_l8z4ew_model"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_settle_1795116593579_l8z4ew_model" id="post-attr-e2e_settle_1795116593579_l8z4ew_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-mobile-360` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: PW-34: the colour option carries no swatch

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_80_bhljf3_colour"][data-value="black"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-34: the colour option carries no swatch with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_80_bhljf3_colour"][data-value="black"]')

--- further error 1 ---
Error: PW-34: the colour option carries no swatch

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_80_bhljf3_colour"][data-value="black"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-34: the colour option carries no swatch with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_80_bhljf3_colour"][data-value="black"]')


  1985 |         `[data-testid="post-attr-swatch"][data-attr="${set.colour.attrKey}"][data-value="${value}"]`,
  1986 |       );
> 1987 |     await expect(swatch(set.inked), "PW-34: the colour option carries no swatch").toBeVisible({
       |                                                                                   ^
  1988 |       timeout: 20_000,
  1989 |     });
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-mobile-360` — Playwright's name `post-wizard-specs-POSTING--7f28e-unmapped-list-shows-no-tray-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: PW-45: the declared swatch tray never rendered

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_83_fp88tt_colour"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-45: the declared swatch tray never rendered with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_83_fp88tt_colour"]')

--- further error 1 ---
Error: PW-45: the declared swatch tray never rendered

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_83_fp88tt_colour"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-45: the declared swatch tray never rendered with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_83_fp88tt_colour"]')


  2058 |       tray.locator(`[data-testid="post-attr-swatch"][data-value="${value}"]`);
  2059 |
> 2060 |     await expect(tray, "PW-45: the declared swatch tray never rendered").toBeVisible({
       |                                                                          ^
  2061 |       timeout: 20_000,
  2062 |     });
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-mobile-360` — Playwright's name `post-wizard-specs-POSTING--bdd4a-two-tone-and-a-pattern-tile-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_86_y7fkn6_fuel"]').locator('option[value="e2e_allow_local-12_86_y7fkn6_petrol"]')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_86_y7fkn6_fuel"]').locator('option[value="e2e_allow_local-12_86_y7fkn6_petrol"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_86_y7fkn6_fuel"]').locator('option[value="e2e_allow_local-12_86_y7fkn6_petrol"]')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_86_y7fkn6_fuel"]').locator('option[value="e2e_allow_local-12_86_y7fkn6_petrol"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  2127 |     await expect(fuel, "PW-35: the fuel picker never rendered").toBeVisible({ timeout: 20_000 });
  2128 |     // BEFORE a model is chosen the picker offers its whole list.
> 2129 |     await expect(fuel.locator(`option[value="${set.fuelPetrol}"]`)).toHaveCount(1);
       |                                                                     ^
  2130 |
  2131 |     await model.selectOption(set.strictModel);
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-mobile-360` — Playwright's name `post-wizard-specs-POSTING--ebdcf-nd-the-review-shows-it-D44--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_88_kthwkt_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_88_kthwkt_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_88_kthwkt_select" id="post-attr-e2e_post_local-12_88_kthwkt_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_88_kthwkt_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_88_kthwkt_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_88_kthwkt_select" id="post-attr-e2e_post_local-12_88_kthwkt_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  2234 |     );
  2235 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 2236 |     await expect(picker).toHaveAttribute("data-options", "ready");
       |                          ^
  2237 |     await expect(
  2238 |       picker.locator(`option[value="${spec.optionValues[0]}"]`),
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-mobile-360` — Playwright's name `post-wizard-specs-POSTING--2f428-t-falls-back-field-by-field-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_unhide_local-12_91_i6u1ig_type"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_unhide_local-12_91_i6u1ig_type" id="post-attr-e2e_unhide_local-12_91_i6u1ig_type" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-mobile-360` — Playwright's name `post-wizard-specs-POSTING--accdb--the-same-selection-unhides-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_96_9dfs1i_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_96_9dfs1i_make" id="post-attr-e2e_fold_local-12_96_9dfs1i_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    110 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-49-a-prefill-only-fact-keeps-its-input-while-a-settled-one-does-not-mobile-360` — Playwright's name `post-wizard-specs-POSTING--a82e1-hile-a-settled-one-does-not-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41)

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_phone_local-12_100_bxyzda_brand"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_phone_local-12_100_bxyzda_brand" id="post-attr-e2e_phone_local-12_100_bxyzda_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-50-the-specifications-show-every-row-open-in-display-order-D41-mobile-360` — Playwright's name `post-wizard-specs-POSTING--e95cf--open-in-display-order-D41--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `shard 12`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_cond_local-12_104_fqbxtc_region"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_cond_local-12_104_fqbxtc_region" id="post-attr-e2e_cond_local-12_104_fqbxtc_region" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-51-a-dependent-detail-never-renders-above-the-answer-it-hangs-on-mobile-360` — Playwright's name `post-wizard-specs-POSTING--dde07-bove-the-answer-it-hangs-on-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_31_hloh1a_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_31_hloh1a_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_31_hloh1a_select" id="post-attr-e2e_post_local-12_31_hloh1a_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_31_hloh1a_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_31_hloh1a_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_31_hloh1a_select" id="post-attr-e2e_post_local-12_31_hloh1a_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  267 |     );
  268 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 269 |     await expect(picker).toHaveAttribute("data-options", "ready");
      |                          ^
  270 |     // Two scratch options plus the "choose" placeholder.
  271 |     await expect(picker.locator("option")).toHaveCount(3);
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--44a2d--detail-is-refused-under-it-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-145 an over-limit options read says so under its control, and a second open loads the list

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_35_a0tits_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_35_a0tits_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-12_35_a0tits_select" id="post-attr-e2e_post_local-12_35_a0tits_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_35_a0tits_select" id="post-attr-e2e_post_local-12_35_a0tits_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_35_a0tits_select"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_35_a0tits_select"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-12_35_a0tits_select" id="post-attr-e2e_post_local-12_35_a0tits_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_35_a0tits_select" id="post-attr-e2e_post_local-12_35_a0tits_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  404 |     await picker.blur();
  405 |     await picker.focus();
> 406 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-145-an-over-limit-options-read-says-so-under-its-control-and-a-second-open-loads-the-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--00e71--second-open-loads-the-list-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_oth_desktop1280_37_1795115591710_one"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_oth_desktop1280_37_1795115591710_one" id="post-attr-e2e_oth_desktop1280_37_1795115591710_one" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-120-a-phone-number-in-an-Other-write-in-is-flagged-as-typed-single-and-multi-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--0cc37-d-as-typed-single-and-multi-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_oth_desktop1280_41_1795115714442_one"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_oth_desktop1280_41_1795115714442_one" id="post-attr-e2e_oth_desktop1280_41_1795115714442_one" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-106-an-empty-Other-write-in-is-refused-and-focused-on-Next-INC-369-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--8b043-nd-focused-on-Next-INC-369--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.check: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-checks"][data-attr="e2e_oth_desktop1280_45_1795115836966_many"]').locator('[data-testid="post-attr-check"][data-value="e2e_oth_desktop1280_45_1795115836966_a"]')


  662 |     await checks
  663 |       .locator(`[data-testid="post-attr-check"][data-value="${keys.single.replace("_one", "_a")}"]`)
> 664 |       .check();
      |        ^
  665 |     await expect(otherBox(page, keys.multi)).toHaveCount(0);
  666 |     await checks.locator('[data-testid="post-attr-check"][data-value="other"]').check();
  667 |     await otherBox(page, keys.multi).fill("barley");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:664:8
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-107-a-multi-choice-Other-carries-its-write-in-to-the-draft-INC-370-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--65408-te-in-to-the-draft-INC-370--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_lazy_desktop1280_49_1795115959525_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_lazy_desktop1280_49_1795115959525_make" id="post-attr-e2e_lazy_desktop1280_49_1795115959525_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--6ecf9--entry-with-no-tap-INC-320--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_trip_desktop1280_55_1795116093328_identity"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_trip_desktop1280_55_1795116093328_identity" id="post-attr-e2e_trip_desktop1280_55_1795116093328_identity" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--4c4ed-r-INC-329-small-model-list--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_trip_desktop1280_60_1795116215793_identity"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_trip_desktop1280_60_1795116215793_identity" id="post-attr-e2e_trip_desktop1280_60_1795116215793_identity" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_64_5rth0i_select"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_post_local-12_64_5rth0i_select" id="post-attr-e2e_post_local-12_64_5rth0i_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--98508--the-door-to-judge-the-step-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: PW-21: the child was open with no parent chosen

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_69_whkddr_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-21: the child was open with no parent chosen with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_69_whkddr_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_69_whkddr_model" id="post-attr-e2e_fold_local-12_69_whkddr_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"

--- further error 1 ---
Error: PW-21: the child was open with no parent chosen

expect(locator).toBeDisabled() failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_69_whkddr_model"]')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - PW-21: the child was open with no parent chosen with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_69_whkddr_model"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_69_whkddr_model" id="post-attr-e2e_fold_local-12_69_whkddr_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "enabled"


  1314 |
  1315 |     // WITH NO PARENT ANSWER the child is closed and says which answer it waits for.
> 1316 |     await expect(model, "PW-21: the child was open with no parent chosen").toBeDisabled();
       |                                                                            ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-21-a-child-detail-shows-only-the-chosen-parent-s-options-and-clears-on-change-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--59573-ptions-and-clears-on-change-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_72_ir69oq_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_72_ir69oq_make" id="post-attr-e2e_fold_local-12_72_ir69oq_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    110 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-188-a-list-that-hangs-under-another-answer-offers-its-shared-Other-last-under-every-parent-and-stores-the-seller-s-words-INC-609-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--272e6-the-seller-s-words-INC-609--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: PW-22: the link's default did not prefill

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_76_ie1o7i_unit"]')
Expected: "e2e_fold_local-12_76_ie1o7i_pc"
Received: ""
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not prefill with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_76_ie1o7i_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_76_ie1o7i_unit" id="post-attr-e2e_fold_local-12_76_ie1o7i_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value ""

--- further error 1 ---
Error: PW-22: the link's default did not prefill

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_76_ie1o7i_unit"]')
Expected: "e2e_fold_local-12_76_ie1o7i_pc"
Received: ""
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not prefill with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_76_ie1o7i_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_76_ie1o7i_unit" id="post-attr-e2e_fold_local-12_76_ie1o7i_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value ""


  1407 |       `[data-testid="post-attr-control"][data-attr="${fold.unit.attrKey}"]`,
  1408 |     );
> 1409 |     await expect(unit, "PW-22: the link's default did not prefill").toHaveValue(
       |                                                                     ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--b6583-er-and-its-default-prefills-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_cond_local-12_79_lgwhgi_fuel"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_cond_local-12_79_lgwhgi_fuel" id="post-attr-e2e_cond_local-12_79_lgwhgi_fuel" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--25a96-y-when-its-condition-is-met-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_85_fbr2tv_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_85_fbr2tv_make" id="post-attr-e2e_fold_local-12_85_fbr2tv_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    110 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--9df45-fill-the-siblings-they-name-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: PW-25: e2e_deep_local-12_92_75zu08_brand never loaded its options

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_92_75zu08_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - PW-25: e2e_deep_local-12_92_75zu08_brand never loaded its options with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_92_75zu08_brand"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_deep_local-12_92_75zu08_brand" id="post-attr-e2e_deep_local-12_92_75zu08_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_deep_local-12_92_75zu08_brand" id="post-attr-e2e_deep_local-12_92_75zu08_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: PW-25: e2e_deep_local-12_92_75zu08_brand never loaded its options

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_92_75zu08_brand"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - PW-25: e2e_deep_local-12_92_75zu08_brand never loaded its options with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_deep_local-12_92_75zu08_brand"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_deep_local-12_92_75zu08_brand" id="post-attr-e2e_deep_local-12_92_75zu08_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_deep_local-12_92_75zu08_brand" id="post-attr-e2e_deep_local-12_92_75zu08_brand" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  1610 |       const picker = control(attrKey);
  1611 |       await picker.focus();
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-and-relative-bounds-resolve-as-the-door-does-INC-288-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--36116-e-as-the-door-does-INC-288--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_listfact_1795116971940_8ouxyp_food"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_listfact_1795116971940_8ouxyp_food" id="post-attr-e2e_listfact_1795116971940_8ouxyp_food" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-159-a-list-fact-ticks-its-tick-list-once-and-the-seller-s-untick-stays-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--3d2b2-d-the-seller-s-untick-stays-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_settle_1795117094637_g7pdbb_model"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_settle_1795117094637_g7pdbb_model" id="post-attr-e2e_settle_1795117094637_g7pdbb_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: PW-34: the colour option carries no swatch

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_103_xjwhvn_colour"][data-value="black"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-34: the colour option carries no swatch with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_103_xjwhvn_colour"][data-value="black"]')

--- further error 1 ---
Error: PW-34: the colour option carries no swatch

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_103_xjwhvn_colour"][data-value="black"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-34: the colour option carries no swatch with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatch"][data-attr="e2e_colour_local-12_103_xjwhvn_colour"][data-value="black"]')


  1985 |         `[data-testid="post-attr-swatch"][data-attr="${set.colour.attrKey}"][data-value="${value}"]`,
  1986 |       );
> 1987 |     await expect(swatch(set.inked), "PW-34: the colour option carries no swatch").toBeVisible({
       |                                                                                   ^
  1988 |       timeout: 20_000,
  1989 |     });
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--7f28e-unmapped-list-shows-no-tray-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: PW-45: the declared swatch tray never rendered

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_106_kx0wyi_colour"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-45: the declared swatch tray never rendered with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_106_kx0wyi_colour"]')

--- further error 1 ---
Error: PW-45: the declared swatch tray never rendered

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_106_kx0wyi_colour"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-45: the declared swatch tray never rendered with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-swatches"][data-attr="e2e_swatch_local-12_106_kx0wyi_colour"]')


  2058 |       tray.locator(`[data-testid="post-attr-swatch"][data-value="${value}"]`);
  2059 |
> 2060 |     await expect(tray, "PW-45: the declared swatch tray never rendered").toBeVisible({
       |                                                                          ^
  2061 |       timeout: 20_000,
  2062 |     });
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--bdd4a-two-tone-and-a-pattern-tile-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_109_3vhmoz_fuel"]').locator('option[value="e2e_allow_local-12_109_3vhmoz_petrol"]')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_109_3vhmoz_fuel"]').locator('option[value="e2e_allow_local-12_109_3vhmoz_petrol"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_109_3vhmoz_fuel"]').locator('option[value="e2e_allow_local-12_109_3vhmoz_petrol"]')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_allow_local-12_109_3vhmoz_fuel"]').locator('option[value="e2e_allow_local-12_109_3vhmoz_petrol"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  2127 |     await expect(fuel, "PW-35: the fuel picker never rendered").toBeVisible({ timeout: 20_000 });
  2128 |     // BEFORE a model is chosen the picker offers its whole list.
> 2129 |     await expect(fuel.locator(`option[value="${set.fuelPetrol}"]`)).toHaveCount(1);
       |                                                                     ^
  2130 |
  2131 |     await model.selectOption(set.strictModel);
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--ebdcf-nd-the-review-shows-it-D44--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_111_k9m70c_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_111_k9m70c_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_111_k9m70c_select" id="post-attr-e2e_post_local-12_111_k9m70c_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_111_k9m70c_select"]')
Expected: "ready"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_post_local-12_111_k9m70c_select"]')
    14 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_post_local-12_111_k9m70c_select" id="post-attr-e2e_post_local-12_111_k9m70c_select" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "failed"


  2234 |     );
  2235 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 2236 |     await expect(picker).toHaveAttribute("data-options", "ready");
       |                          ^
  2237 |     await expect(
  2238 |       picker.locator(`option[value="${spec.optionValues[0]}"]`),
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--2f428-t-falls-back-field-by-field-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_unhide_local-12_114_w0eac0_type"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_unhide_local-12_114_w0eac0_type" id="post-attr-e2e_unhide_local-12_114_w0eac0_type" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--accdb--the-same-selection-unhides-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_local-12_117_uyf2ut_make"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_fold_local-12_117_uyf2ut_make" id="post-attr-e2e_fold_local-12_117_uyf2ut_make" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    110 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-49-a-prefill-only-fact-keeps-its-input-while-a-settled-one-does-not-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--a82e1-hile-a-settled-one-does-not-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `shard 12`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_cond_local-12_119_tnd85s_region"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_cond_local-12_119_tnd85s_region" id="post-attr-e2e_cond_local-12_119_tnd85s_region" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    116 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-51-a-dependent-detail-never-renders-above-the-answer-it-hangs-on-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--dde07-bove-the-answer-it-hangs-on-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart

- Source: `shard 13`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button disabled type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-…>…</button>
       - unexpected value "unsaved"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button disabled type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-…>…</button>
       - unexpected value "unsaved"


  533 |       return data;
  534 |     };
> 535 |     await expect(heart).toHaveAttribute("data-state", "saved");
      |                         ^
  536 |     await expect(heart).toHaveAttribute("aria-pressed", "true");
  537 |     await expect(page.getByTestId("listing-save-count")).toHaveText("Saved by 1");
```

Context:

```text
          - listitem [ref=e311]:
            - generic [ref=e312]: About
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Help" [ref=e315]:
        - heading "Help" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Safety
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - link "Terms" [ref=e324] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e325]:
            - link "Privacy" [ref=e326] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button disabled type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-…>…</button>
       - unexpected value "unsaved"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button disabled type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-…>…</button>
       - unexpected value "unsaved"


  533 |       return data;
  534 |     };
> 535 |     await expect(heart).toHaveAttribute("data-state", "saved");
      |                         ^
  536 |     await expect(heart).toHaveAttribute("aria-pressed", "true");
  537 |     await expect(page.getByTestId("listing-save-count")).toHaveText("Saved by 1");
```

Context:

```text
          - listitem [ref=e386]:
            - generic [ref=e387]: About
          - listitem [ref=e388]:
            - generic [ref=e389]: Contact
      - navigation "Help" [ref=e390]:
        - heading "Help" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Safety
      - navigation "Legal" [ref=e395]:
        - heading "Legal" [level=2] [ref=e396]
        - list [ref=e397]:
          - listitem [ref=e398]:
            - link "Terms" [ref=e399] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e400]:
            - link "Privacy" [ref=e401] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e403]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-4 the owner reads his own flag and counts; another person is refused

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  169 |     const other = await asPerson(await leaseUser());
  170 |     const refused = await other.rpc("listing_counts", { p_listing_id: ad.id });
> 171 |     expect(refused.error).toBe("not your listing");
      |                           ^
  172 |
  173 |     const anonymous = await asAnonymous();
  174 |     const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:171:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-4-the-owner-reads-his-own-flag-and-counts-another-person-is-refused-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-fd638-s-another-person-is-refused-mobile-360`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.listing_saved(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.listing_saved(p_public_id) in the schema cache"

  600 |
  601 |     const savedA = await buyer.rpc("listing_saved", { p_public_id: idA });
> 602 |     expect(savedA.error).toBeNull();
      |                          ^
  603 |     expect(savedA.data).toBe(true);
  604 |     const savedB = await buyer.rpc("listing_saved", { p_public_id: idB });
  605 |     expect(savedB.error).toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:602:26
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--mobile-360`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts every signed-in attempt, a repeat save included (D201 §8, F1-5b)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.listing_saved(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.listing_saved(p_public_id) in the schema cache"

  726 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved"]) {
  727 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 728 |       expect(answer.error).toContain("permission denied");
      |                            ^
  729 |     }
  730 |
  731 |     const savedList = await anonymous.rpc("my_saved_listings", { p_after: null, p_size: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:728:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-every-signed-in-attempt-a-repeat-save-included-D201-8-F1-5b-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-7e47c-ave-included-D201-§8-F1-5b--mobile-360`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts every signed-in attempt, a refused one included

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-20T00:00:00+00:00"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-20T00:00:00+00:00"

  853 |       expect(override.error).toBeNull();
  854 |       const limited = await report(idC);
> 855 |       expect(limited.error).toBe("rateLimited");
      |                             ^
  856 |       expect(limited.data).toBeNull();
  857 |       // INC-1170: the gate's refusal carries no reset time until F1-7 gives it one.
  858 |       // The dial answers before the open-report check (the law order), so a duplicate is the dial's.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:855:29
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-27-Report-by-public-id-a-buyer-reports-once-with-a-reason-and-a-note-the-owner-cannot-report-his-own-ad-a-reason-outside-the-list-and-a-note-over-500-characters-are-refused-a-second-open-report-by-the-same-buyer-is-alreadyReported-a-sold-ad-within-its-30-days-can-be-reported-a-draft-an-unknown-or-a-malformed-id-cannot-the-report-dial-counts-every-signed-in-attempt-a-refused-one-included-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-a0be8-empt-a-refused-one-included-mobile-360`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-4 the owner reads his own flag and counts; another person is refused

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "notYourListing"

  169 |     const other = await asPerson(await leaseUser());
  170 |     const refused = await other.rpc("listing_counts", { p_listing_id: ad.id });
> 171 |     expect(refused.error).toBe("not your listing");
      |                           ^
  172 |
  173 |     const anonymous = await asAnonymous();
  174 |     const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:171:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-4-the-owner-reads-his-own-flag-and-counts-another-person-is-refused-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-fd638-s-another-person-is-refused-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.listing_saved(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.listing_saved(p_public_id) in the schema cache"

  600 |
  601 |     const savedA = await buyer.rpc("listing_saved", { p_public_id: idA });
> 602 |     expect(savedA.error).toBeNull();
      |                          ^
  603 |     expect(savedA.data).toBe(true);
  604 |     const savedB = await buyer.rpc("listing_saved", { p_public_id: idB });
  605 |     expect(savedB.error).toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:602:26
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts every signed-in attempt, a repeat save included (D201 §8, F1-5b)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.listing_saved(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.listing_saved(p_public_id) in the schema cache"

  726 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved"]) {
  727 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 728 |       expect(answer.error).toContain("permission denied");
      |                            ^
  729 |     }
  730 |
  731 |     const savedList = await anonymous.rpc("my_saved_listings", { p_after: null, p_size: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:728:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-every-signed-in-attempt-a-repeat-save-included-D201-8-F1-5b-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-7e47c-ave-included-D201-§8-F1-5b--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts every signed-in attempt, a refused one included

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-20T00:00:00+00:00"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-20T00:00:00+00:00"

  853 |       expect(override.error).toBeNull();
  854 |       const limited = await report(idC);
> 855 |       expect(limited.error).toBe("rateLimited");
      |                             ^
  856 |       expect(limited.data).toBeNull();
  857 |       // INC-1170: the gate's refusal carries no reset time until F1-7 gives it one.
  858 |       // The dial answers before the open-report check (the law order), so a duplicate is the dial's.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:855:29
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-27-Report-by-public-id-a-buyer-reports-once-with-a-reason-and-a-note-the-owner-cannot-report-his-own-ad-a-reason-outside-the-list-and-a-note-over-500-characters-are-refused-a-second-open-report-by-the-same-buyer-is-alreadyReported-a-sold-ad-within-its-30-days-can-be-reported-a-draft-an-unknown-or-a-malformed-id-cannot-the-report-dial-counts-every-signed-in-attempt-a-refused-one-included-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-a0be8-empt-a-refused-one-included-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## legal-certify.spec.ts › Legal certification › LG-15 my_listing_certification lists the statements for all countries and the ad's countries, never another country's; another seller is refused

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "notYourListing"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "notYourListing"

  436 |       p_listing_id: listingId,
  437 |     });
> 438 |     expect(refused.error).toContain("not your listing");
      |                           ^
  439 |   });
  440 |
  441 |   test("LG-16 publish_listing refuses without the exact certified set and records the certification; a draft with no statement publishes as today", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:438:27
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LGC-6 a publishing statement is for signed-in people: the doors refuse a visitor, the page sends one to sign in, and a seller reads the global statement and the country's (D236, M24)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 500
--- further error 1 ---
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 500

  1339 |     for (const fn of ["legal_in_force", "legal_scheduled"]) {
  1340 |       const refused = await anonRpc(fn, { p_kind: kind });
> 1341 |       expect(refused.status, fn).toBe(401);
       |                                  ^
  1342 |       expect((refused.body as { code?: string }).code).toBe("42501");
  1343 |     }
  1344 |     const publicKind = await anonRpc("legal_in_force", { p_kind: "e2e-lgc6-public" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1341:34
```

Context: context file not found for `legal-certify-Legal-certification-LGC-6-a-publishing-statement-is-for-signed-in-people-the-doors-refuse-a-visitor-the-page-sends-one-to-sign-in-and-a-seller-reads-the-global-statement-and-the-country-s-D236-M24-mobile-360` — Playwright's name `legal-certify-Legal-certif-64657-and-the-country-s-D236-M24--mobile-360`; this run carried 76 context file(s); of the same spec: `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-mobile-360`, `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-mobile-360-retry1`, `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-desktop-1280`, `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-desktop-1280-retry1`

## legal-certify.spec.ts › Legal certification › LG-15 my_listing_certification lists the statements for all countries and the ad's countries, never another country's; another seller is refused

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "notYourListing"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "not your listing"
Received string:    "notYourListing"

  436 |       p_listing_id: listingId,
  437 |     });
> 438 |     expect(refused.error).toContain("not your listing");
      |                           ^
  439 |   });
  440 |
  441 |   test("LG-16 publish_listing refuses without the exact certified set and records the certification; a draft with no statement publishes as today", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:438:27
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - link "Terms" [ref=e347] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e348]:
            - link "Privacy" [ref=e349] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LGC-6 a publishing statement is for signed-in people: the doors refuse a visitor, the page sends one to sign in, and a seller reads the global statement and the country's (D236, M24)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 500
--- further error 1 ---
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 500

  1339 |     for (const fn of ["legal_in_force", "legal_scheduled"]) {
  1340 |       const refused = await anonRpc(fn, { p_kind: kind });
> 1341 |       expect(refused.status, fn).toBe(401);
       |                                  ^
  1342 |       expect((refused.body as { code?: string }).code).toBe("42501");
  1343 |     }
  1344 |     const publicKind = await anonRpc("legal_in_force", { p_kind: "e2e-lgc6-public" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1341:34
```

Context: context file not found for `legal-certify-Legal-certification-LGC-6-a-publishing-statement-is-for-signed-in-people-the-doors-refuse-a-visitor-the-page-sends-one-to-sign-in-and-a-seller-reads-the-global-statement-and-the-country-s-D236-M24-desktop-1280` — Playwright's name `legal-certify-Legal-certif-64657-and-the-country-s-D236-M24--desktop-1280`; this run carried 76 context file(s); of the same spec: `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-mobile-360`, `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-mobile-360-retry1`, `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-desktop-1280`, `legal-certify-Legal-certif-8aac0-s-another-seller-is-refused-desktop-1280-retry1`

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves

- Source: `shard 14`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_wri_local-14_13_0age16_kind"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_wri_local-14_13_0age16_kind" id="post-attr-e2e_wri_local-14_13_0age16_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-102-a-type-that-leaves-only-Other-shows-that-question-s-text-box-and-the-typed-text-saves-mobile-360` — Playwright's name `post-wizard-details-POSTIN-819c2-ox-and-the-typed-text-saves-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name

- Source: `shard 14`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_wri_local-14_25_qapgpb_kind"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_wri_local-14_25_qapgpb_kind" id="post-attr-e2e_wri_local-14_25_qapgpb_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-103-required-text-optional-text-and-a-list-s-Other-text-each-save-an-empty-required-text-is-refused-by-name-mobile-360` — Playwright's name `post-wizard-details-POSTIN-214fe-red-text-is-refused-by-name-mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_27_w9kqk4_kind"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_27_w9kqk4_kind"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_27_w9kqk4_kind" id="post-attr-e2e_b7t_local-14_27_w9kqk4_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_27_w9kqk4_kind" id="post-attr-e2e_b7t_local-14_27_w9kqk4_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_27_w9kqk4_kind"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_27_w9kqk4_kind"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_27_w9kqk4_kind" id="post-attr-e2e_b7t_local-14_27_w9kqk4_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_27_w9kqk4_kind" id="post-attr-e2e_b7t_local-14_27_w9kqk4_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  219 |     const picker = control(page, `${stem}_kind`);
  220 |     await picker.focus();
> 221 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-170-the-suggested-title-leads-with-the-seller-s-own-name-for-the-item-Bundle-7-B3-mobile-360` — Playwright's name `post-wizard-details-POSTIN-48347-e-for-the-item-Bundle-7-B3--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: PW-172: Review prints the stored value

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-review-section"][data-step="3"]')
Expected substring: "e2e_post_local-14_31_73hi1j_a label"
Received string:    "Specificationse2e_post_local-14_31_73hi1j text: e2e held textEdit"
Timeout: 20000ms

Call log:
  - PW-172: Review prints the stored value with timeout 20000ms
  - waiting for locator('[data-testid="post-review-section"][data-step="3"]')
    24 × locator resolved to <div data-step="3" data-testid="post-review-section" class="flex items-start justify-between gap-3 p-3">…</div>
       - unexpected value "Specificationse2e_post_local-14_31_73hi1j text: e2e held textEdit"

--- further error 1 ---
Error: PW-172: Review prints the stored value

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-review-section"][data-step="3"]')
Expected substring: "e2e_post_local-14_31_73hi1j_a label"
Received string:    "Specificationse2e_post_local-14_31_73hi1j text: e2e held textEdit"
Timeout: 20000ms

Call log:
  - PW-172: Review prints the stored value with timeout 20000ms
  - waiting for locator('[data-testid="post-review-section"][data-step="3"]')
    24 × locator resolved to <div data-step="3" data-testid="post-review-section" class="flex items-start justify-between gap-3 p-3">…</div>
       - unexpected value "Specificationse2e_post_local-14_31_73hi1j text: e2e held textEdit"


  286 |       page.locator('[data-testid="post-review-section"][data-step="3"]'),
  287 |       "PW-172: Review prints the stored value",
> 288 |     ).toContainText(label, { timeout: 20_000 });
      |       ^
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-172-a-held-answer-whose-option-is-switched-off-prints-its-label-never-offered-INC-466-mobile-360` — Playwright's name `post-wizard-details-POSTIN-3703d-abel-never-offered-INC-466--mobile-360`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves

- Source: `shard 14`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_wri_local-14_34_ps4baj_kind"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_wri_local-14_34_ps4baj_kind" id="post-attr-e2e_wri_local-14_34_ps4baj_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    115 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-102-a-type-that-leaves-only-Other-shows-that-question-s-text-box-and-the-typed-text-saves-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-819c2-ox-and-the-typed-text-saves-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name

- Source: `shard 14`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_wri_local-14_38_7kr3bk_kind"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_wri_local-14_38_7kr3bk_kind" id="post-attr-e2e_wri_local-14_38_7kr3bk_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    114 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-103-required-text-optional-text-and-a-list-s-Other-text-each-save-an-empty-required-text-is-refused-by-name-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-214fe-red-text-is-refused-by-name-desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_40_9odrj2_kind"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_40_9odrj2_kind"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_40_9odrj2_kind" id="post-attr-e2e_b7t_local-14_40_9odrj2_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_40_9odrj2_kind" id="post-attr-e2e_b7t_local-14_40_9odrj2_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_40_9odrj2_kind"]')
Expected: "ready"
Received: "failed"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_b7t_local-14_40_9odrj2_kind"]')
    2 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_40_9odrj2_kind" id="post-attr-e2e_b7t_local-14_40_9odrj2_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
      - unexpected value "loading"
    22 × locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_b7t_local-14_40_9odrj2_kind" id="post-attr-e2e_b7t_local-14_40_9odrj2_kind" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
       - unexpected value "failed"


  219 |     const picker = control(page, `${stem}_kind`);
  220 |     await picker.focus();
> 221 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      |                          ^
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-170-the-suggested-title-leads-with-the-seller-s-own-name-for-the-item-Bundle-7-B3-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-48347-e-for-the-item-Bundle-7-B3--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: PW-172: Review prints the stored value

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-review-section"][data-step="3"]')
Expected substring: "e2e_post_local-14_42_jn3exs_a label"
Received string:    "Specificationse2e_post_local-14_42_jn3exs text: e2e held textEdit"
Timeout: 20000ms

Call log:
  - PW-172: Review prints the stored value with timeout 20000ms
  - waiting for locator('[data-testid="post-review-section"][data-step="3"]')
    24 × locator resolved to <div data-step="3" data-testid="post-review-section" class="flex items-start justify-between gap-3 p-3">…</div>
       - unexpected value "Specificationse2e_post_local-14_42_jn3exs text: e2e held textEdit"

--- further error 1 ---
Error: PW-172: Review prints the stored value

expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="post-review-section"][data-step="3"]')
Expected substring: "e2e_post_local-14_42_jn3exs_a label"
Received string:    "Specificationse2e_post_local-14_42_jn3exs text: e2e held textEdit"
Timeout: 20000ms

Call log:
  - PW-172: Review prints the stored value with timeout 20000ms
  - waiting for locator('[data-testid="post-review-section"][data-step="3"]')
    24 × locator resolved to <div data-step="3" data-testid="post-review-section" class="flex items-start justify-between gap-3 p-3">…</div>
       - unexpected value "Specificationse2e_post_local-14_42_jn3exs text: e2e held textEdit"


  286 |       page.locator('[data-testid="post-review-section"][data-step="3"]'),
  287 |       "PW-172: Review prints the stored value",
> 288 |     ).toContainText(label, { timeout: 20_000 });
      |       ^
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-172-a-held-answer-whose-option-is-switched-off-prints-its-label-never-offered-INC-466-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-3703d-abel-never-offered-INC-466--desktop-1280`; this run carried 76 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-4 the viewing_place dial refuses the call past the account's limit

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-19T20:00:00+00:00"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-19T20:00:00+00:00"

  182 |     expect(await setPlace(own, c.city.id)).toMatchObject({ ok: true });
  183 |     // INC-1170: the gate's refusal carries no reset time until F1-7 gives it one.
> 184 |     expect(await refusedPlace(own, c.subCity.id)).toBe("rateLimited");
      |                                                   ^
  185 |     expect((await stored(id)).viewing_location_id).toBe(c.city.id);
  186 |   });
  187 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:184:51
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - link "Terms" [ref=e262] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e263]:
            - link "Privacy" [ref=e264] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-4 the viewing_place dial refuses the call past the account's limit

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-19T20:00:00+00:00"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rateLimited"
Received: "rateLimited:2026-11-19T20:00:00+00:00"

  182 |     expect(await setPlace(own, c.city.id)).toMatchObject({ ok: true });
  183 |     // INC-1170: the gate's refusal carries no reset time until F1-7 gives it one.
> 184 |     expect(await refusedPlace(own, c.subCity.id)).toBe("rateLimited");
      |                                                   ^
  185 |     expect((await stored(id)).viewing_location_id).toBe(c.city.id);
  186 |   });
  187 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:184:51
```

Context:

```text
          - listitem [ref=e326]:
            - generic [ref=e327]: About
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Help" [ref=e330]:
        - heading "Help" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Safety
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Terms" [ref=e339] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e340]:
            - link "Privacy" [ref=e341] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×2
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-19T20:00:00+00:00 ×4
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×2
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-19T20:00:00+00:00 ×4
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×6
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×9
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×5
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×3
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×2
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×23
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×2
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×3
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×2
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×132
```

## Client errors: shard 3

```text
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×4
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×4
[client-error] console.error: [attr-options] read refused [account id] 500 ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×4
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×5
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×4
[client-error] console.error: [attr-options] read refused [account id] 500 ×5
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/translate ({"error":"server error","incident":"[account id]"})
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×4
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
```

## Server errors: shard 8

```text
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×3
[WebServer] [ssr-error] /api/translate translation scope: permission denied for function translation_scope_ok
[WebServer] [ssr-error] /api/translate [incident [account id]] [object Object]
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×132
```

## Client errors: shard 8

```text
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
console.error: [client-error] gate fetch threw ×3
```

## Server errors: shard 10

```text
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×24
```

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 11

```text
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×26
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×54
```

## Client errors: shard 11

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×4
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×4
[client-error] console.error: [attr-options] read refused [account id] 500 ×5
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×5
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×5
[client-error] console.error: [attr-options] read refused [account id] 500 ×5
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
```

## Server errors: shard 12

```text
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×18
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals ×2
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×8
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×2
[WebServer] [ssr-error] /api/listings/identity permission denied for function listing_contact_refusals
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×336
```

## Client errors: shard 12

```text
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×5
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×3
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×3
[client-error] console.error: [attr-options] read refused [account id] 500 ×5
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×2
```

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: [save-error] listing_saved Could not find the function public.listing_saved(p_public_id) in the schema cache
[client-error] HTTP 404 POST /rest/v1/rpc/listing_saved ({"code":"PGRST202","details":"Searched for the function public.listing_saved with parameter p_public_id or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.",")
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: [save-error] listing_saved Could not find the function public.listing_saved(p_public_id) in the schema cache
[client-error] HTTP 404 POST /rest/v1/rpc/listing_saved ({"code":"PGRST202","details":"Searched for the function public.listing_saved with parameter p_public_id or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.",")
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: [save-error] listing_saved Could not find the function public.listing_saved(p_public_id) in the schema cache
[client-error] HTTP 404 POST /rest/v1/rpc/listing_saved ({"code":"PGRST202","details":"Searched for the function public.listing_saved with parameter p_public_id or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.",")
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: [save-error] listing_saved Could not find the function public.listing_saved(p_public_id) in the schema cache
[client-error] HTTP 404 POST /rest/v1/rpc/listing_saved ({"code":"PGRST202","details":"Searched for the function public.listing_saved with parameter p_public_id or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache.",")
```

## Server errors: shard 14

```text
[WebServer] [ssr-error] /api/attributes/$id/options [incident [account id]] ReaderError: permission denied for function get_attribute_options_version ×40
```

## Client errors: shard 14

```text
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: [attr-options] read refused [account id] 500
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error) ×2
[client-error] HTTP 500 GET http://127.0.0.1:4173/api/attributes/[account id]/options ({"error":"server error","incident":"[account id]"}) ×2
[client-error] console.error: [attr-options] read refused [account id] 500 ×3
```

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).
