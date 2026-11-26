# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45889572597
- Commit: `12a75352054d6727e09c3d4b7f820f0854acb239`
- Attempt: 1
- Repeat: 38 of 58 tests repeated — specs directly changed 5/7, importers of a changed helper 0/0; budget 793 s
- Written (UTC): 2026-11-26T20:46:41.352Z
- Passed: 2705 · Skipped: 551 · Failed: 3
- Gating failures: 3 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Gating failures

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:crawl] no legal_versions row where status = published
--- further error 1 ---
Error: [e2e:crawl] no legal_versions row where status = published

   at helpers/crawl-fixtures.ts:40

  38 |       .maybeSingle();
  39 |     if (error) throw new Error(`[e2e:crawl] reading ${table}: ${error.message}`);
> 40 |     if (data === null) throw new Error(`[e2e:crawl] no ${table} row where ${column} = ${value}`);
     |                              ^
  41 |     return data.id as string;
  42 |   }
  43 |
    at referenceId (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/crawl-fixtures.ts:40:30)
    at Object.pathOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/crawl-fixtures.ts:83:11)
    at Object.run (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/failure-crawl-tests.ts:38:20)
```

Context:

```text
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - link "Terms" [ref=e284] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e285]:
            - link "Privacy" [ref=e286] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-member-account.spec.ts › FAILURE CRAWL — the member's account pages (DEC-459 c) › FCR-32 /account/legal/$versionId as member: loads clean and says every failed read

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: [e2e:crawl] no legal_versions row where status = published
--- further error 1 ---
Error: [e2e:crawl] no legal_versions row where status = published

   at helpers/crawl-fixtures.ts:40

  38 |       .maybeSingle();
  39 |     if (error) throw new Error(`[e2e:crawl] reading ${table}: ${error.message}`);
> 40 |     if (data === null) throw new Error(`[e2e:crawl] no ${table} row where ${column} = ${value}`);
     |                              ^
  41 |     return data.id as string;
  42 |   }
  43 |
    at referenceId (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/crawl-fixtures.ts:40:30)
    at Object.pathOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/crawl-fixtures.ts:83:11)
    at Object.run (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/failure-crawl-tests.ts:38:20)
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - link "Terms" [ref=e278] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e279]:
            - link "Privacy" [ref=e280] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

### failure-crawl-admin-content.spec.ts › FAILURE CRAWL — the staff console's content pages (DEC-459 c) › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read

- Source: `repeat`
- Project: `mobile-360`

```text
Error: [e2e:crawl] no legal_versions row where status = published
--- further error 1 ---
Error: [e2e:crawl] no legal_versions row where status = published

   at helpers/crawl-fixtures.ts:40

  38 |       .maybeSingle();
  39 |     if (error) throw new Error(`[e2e:crawl] reading ${table}: ${error.message}`);
> 40 |     if (data === null) throw new Error(`[e2e:crawl] no ${table} row where ${column} = ${value}`);
     |                              ^
  41 |     return data.id as string;
  42 |   }
  43 |
    at referenceId (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/crawl-fixtures.ts:40:30)
    at Object.pathOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/crawl-fixtures.ts:83:11)
    at Object.run (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/failure-crawl-tests.ts:38:20)
```

Context:

```text
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - link "Terms" [ref=e284] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e285]:
            - link "Privacy" [ref=e286] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 913s for the test suite to run
(no place given)
```

```text
Timed out waiting 913s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 8, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 5, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 5, shard 8 |
| `categories file too large` (quiet) | 2 | shard 8 |
| `categories nulByte` (quiet) | 2 | shard 8 |
| `categories unknownColumn` (quiet) | 2 | shard 8 |
| `countries badHeader` (quiet) | 2 | shard 8 |
| `countries nulByte` (quiet) | 2 | shard 8 |
| `countries tooManyRows` (quiet) | 2 | shard 8 |
| `countries unknownColumn` (quiet) | 2 | shard 8 |
| `countries wrongFile` (quiet) | 2 | shard 8 |
| `definitions nulByte` (quiet) | 2 | shard 8 |
| `definitions tooManyRows` (quiet) | 2 | shard 8 |
| `definitions unknownColumn` (quiet) | 2 | shard 8 |
| `links unknownColumn` (quiet) | 2 | shard 8 |
| `locations badHeader` (quiet) | 2 | shard 8 |
| `locations file too large` (quiet) | 2 | shard 8 |
| `locations nulByte` (quiet) | 2 | shard 8 |
| `locations unknownColumn` (quiet) | 2 | shard 8 |
| `locations wrongFile` (quiet) | 2 | shard 8 |
| `strings badHeader` (quiet) | 2 | shard 8 |
| `strings emptyFile` (quiet) | 2 | shard 8 |
| `strings nulByte` (quiet) | 2 | shard 8 |
| `strings tooManyRows` (quiet) | 2 | shard 8 |
| `strings unknownColumn` (quiet) | 2 | shard 8 |
| `strings wrongFile` (quiet) | 2 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-26T20:17:52.447Z | 6.9 min |
| email | 2026-11-26T20:18:07.525Z | 0.3 min |
| webkit | 2026-11-26T20:18:54.051Z | 11.1 min |
| shard 1 | 2026-11-26T20:18:14.711Z | 11.8 min |
| shard 2 | 2026-11-26T20:18:40.443Z | 10.8 min |
| shard 3 | 2026-11-26T20:18:20.085Z | 9.0 min |
| shard 4 | 2026-11-26T20:18:29.242Z | 7.7 min |
| shard 5 | 2026-11-26T20:18:10.877Z | 17.9 min |
| shard 6 | 2026-11-26T20:18:18.396Z | 18.9 min |
| shard 7 | 2026-11-26T20:18:13.520Z | 16.3 min |
| shard 8 | 2026-11-26T20:22:09.919Z | 12.7 min |
| shard 9 | 2026-11-26T20:17:52.279Z | 7.9 min |
| shard 10 | 2026-11-26T20:18:06.361Z | 18.2 min |
| shard 11 | 2026-11-26T20:20:23.464Z | 25.8 min |
| shard 12 | 2026-11-26T20:20:25.339Z | 14.6 min |
| shard 13 | 2026-11-26T20:18:18.606Z | 10.9 min |
| shard 14 | 2026-11-26T20:17:54.530Z | 18.8 min |
| shard 15 | 2026-11-26T20:20:33.025Z | 16.1 min |
| shard 16 | 2026-11-26T20:17:51.377Z | 12.3 min |
| repeat | 2026-11-26T20:18:36.317Z | 15.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.3 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.2 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.6 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.2 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.4 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 17.4 min | shard 6 |
| `failure-crawl-admin-content.spec.ts` | 54 | 16.3 min | shard 2, repeat |
| `admin-attributes-links.spec.ts` | 34 | 15.8 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.3 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.6 min | shard 10 |
| `failure-crawl-admin-catalog.spec.ts` | 54 | 14.3 min | shard 4, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.1 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.5 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.5 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 9.6 min | smoke, shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 11 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `failure-crawl-member-listings.spec.ts` | 30 | 7.4 min | shard 3, repeat |
| `failure-crawl-admin-people.spec.ts` | 42 | 7.3 min | shard 5, repeat |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 6.7 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 5.6 min | smoke, shard 1 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 5 |
| `dialogs.spec.ts` | 36 | 5.0 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 9 |
| `admin-guides.spec.ts` | 14 | 4.6 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.4 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 15 |
| `ad-page.spec.ts` | 104 | 4.3 min | webkit, shard 9 |
| `admin-screening-reject.spec.ts` | 10 | 4.2 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 4.0 min | shard 16 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7 |
| `photo-pipeline.spec.ts` | 74 | 3.6 min | webkit, shard 12 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 8 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 13 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 12 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 6 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 16 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 14 |
| `name-check-queue.spec.ts` | 8 | 1.8 min | smoke, shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 4 |
| `admin-services.spec.ts` | 10 | 1.7 min | shard 1 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `failure-crawl-member-account.spec.ts` | 48 | 1.5 min | shard 15, repeat |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 1.3 min | shard 9 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8 |
| `press.spec.ts` | 22 | 0.8 min | shard 16 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 7 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 7 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 4 |
| `settings.spec.ts` | 16 | 0.5 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.5 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 0.5 min | shard 16 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `overlays.spec.ts` | 8 | 0.5 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 16 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 6 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 7 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 281.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 137.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 134.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 110.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 106.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 99.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 74.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 72.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 71.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 70.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 67.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 66.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 66.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45889572597-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45889572597-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45889572597-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45889572597-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45889572597-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 4, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45889572597-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45889572597-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45889572597-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45889572597-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 27 user(s) owned by process 45889572597-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 4, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 45889572597-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 4, fresh 30)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 45889572597-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 45889572597-local-16
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
