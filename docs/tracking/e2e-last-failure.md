# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39504891051 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39504891051
- Commit: `54dbf7ad3f573f92870033d3044cdc9e19287965`
- Attempt: 1
- Written (UTC): 2026-10-20T22:57:41.473Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 8
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · layout.spec.ts › LY-4 wizard aside is desktop-only — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · legal-certify.spec.ts › Legal certification › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-1-All-listings-listings-view-reads-every-listing-but-drafts-the-e-mail-only-with-profiles-view-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-51e2d-ail-only-with-profiles-view-mobile-360`; this run carried 5 context file(s); of the same spec: none

### layout.spec.ts › LY-4 wizard aside is desktop-only

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')


   at helpers/ui.ts:549

  547 |   // ids here, not surface later as an inexplicable permission assertion.
  548 |   await assertInjectedIdentity(page, session);
> 549 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  550 |   await page.waitForFunction(
  551 |     () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
```

Context:

```text
          - listitem [ref=e92]:
            - generic [ref=e93]: About
          - listitem [ref=e94]:
            - generic [ref=e95]: Contact
      - navigation "Help" [ref=e96]:
        - heading "Help" [level=2] [ref=e97]
        - list [ref=e98]:
          - listitem [ref=e99]:
            - generic [ref=e100]: Safety
      - navigation "Legal" [ref=e101]:
        - heading "Legal" [level=2] [ref=e102]
        - list [ref=e103]:
          - listitem [ref=e104]:
            - link "Terms" [ref=e105] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e106]:
            - link "Privacy" [ref=e107] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e109]: © 2026 ethio.com — All rights reserved.
```
```

### legal-admin.spec.ts › Admin Legal › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `legal-admin-Admin-Legal-LGA-13-Export-acceptances-saves-a-CSV-of-who-accepted-never-a-name-or-e-mail-mobile-360` — Playwright's name `legal-admin-Admin-Legal-LG-ea3c2-pted-never-a-name-or-e-mail-mobile-360`; this run carried 5 context file(s); of the same spec: none

### legal-certify.spec.ts › Legal certification › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST http://127.0.0.1:4173/api/listings/draft
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - Authorization: Bearer [redacted-jwt]
    - cf-ipcountry: ET
    - content-length: 335


   at helpers/posting.ts:61

  59 |   // edge does (`cf-ipcountry`) and never as the body.
  60 |   if (options.country) headers["cf-ipcountry"] = options.country;
> 61 |   const response = await page.request.post(path, { headers, data: body });
     |                                       ^
  62 |   let payload: Record<string, unknown> = {};
  63 |   try {
```

Context:

```text
          - listitem [ref=e287]:
            - generic [ref=e288]: About
          - listitem [ref=e289]:
            - generic [ref=e290]: Contact
      - navigation "Help" [ref=e291]:
        - heading "Help" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Safety
      - navigation "Legal" [ref=e296]:
        - heading "Legal" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - link "Terms" [ref=e300] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e301]:
            - link "Privacy" [ref=e302] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e304]: © 2026 ethio.com — All rights reserved.
```
```

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
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

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:mla] listing a1bc536d-0649-450c-b3a6-57e16196c386 not found

  108 |     .maybeSingle();
  109 |   if (error) throw new Error(`[e2e:mla] listing read failed: ${error.message}`);
> 110 |   if (!data) throw new Error(`[e2e:mla] listing ${listingId} not found`);
      |                    ^
  111 |   return data as unknown as Row;
  112 | }
  113 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:110:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1032:13
```

Context:

```text
          - listitem [ref=e344]:
            - generic [ref=e345]: About
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Help" [ref=e348]:
        - heading "Help" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Safety
      - navigation "Legal" [ref=e353]:
        - heading "Legal" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - link "Terms" [ref=e357] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e358]:
            - link "Privacy" [ref=e359] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e361]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-10-The-renew-setting-signed-in-users-read-its-two-values-only-listings-enforce-with-a-fresh-second-factor-may-change-it-D175-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-bdee8--factor-may-change-it-D175--desktop-1280`; this run carried 5 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: Contact
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
      - navigation "Legal" [ref=e346]:
        - heading "Legal" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - link "Terms" [ref=e350] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e351]:
            - link "Privacy" [ref=e352] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e354]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>oubj: e<n>e_par_itlx<n>s → e<n>e_chi_ufzbvw` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-eicr<n>: e<n>e_par_kd<n>ixk → e<n>e_chi_<n>dhtc` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>oubj: e<n>e_par_itlx<n>s → e<n>e_chi_ufzbvw ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-eicr<n>: e<n>e_par_kd<n>ixk → e<n>e_chi_<n>dhtc ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-19 the seller's own phrase survives into the suggestion ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · admin tables never overflow horizontally ×1 · LB-1 bands and bars lift without hard borders ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1

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
| smoke | 2026-10-20T22:04:12.910Z | 22.6 min |
| email | 2026-10-20T22:11:23.373Z | 0.3 min |
| shard 1 | 2026-10-20T22:02:34.608Z | 48.8 min |
| shard 2 | 2026-10-20T22:12:12.739Z | 45.2 min |
| shard 3 | 2026-10-20T22:02:49.119Z | 40.0 min |
| shard 4 | 2026-10-20T22:03:02.046Z | 48.9 min |
| shard 5 | 2026-10-20T22:04:05.522Z | 48.4 min |
| shard 6 | 2026-10-20T22:02:39.835Z | 41.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 29.2 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 28.4 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 24.4 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 68 | 23.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 23.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 20.4 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 19.6 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 18.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 16.0 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 15.6 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 15.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 14.5 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 13.3 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 13.3 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.9 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 12.9 min | smoke, shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 11.7 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 11.6 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 9.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 9.7 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 28 | 9.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.4 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 32 | 8.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.6 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 7.1 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 16 | 7.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 6.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.8 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.9 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.0 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 1.0 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `layout.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) | desktop-1280 | 130.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 125.5 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 115.6 s |
| `my-listings-ad.spec.ts` › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177) | desktop-1280 | 105.9 s |
| `legal-admin.spec.ts` › LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail | mobile-360 | 103.2 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 100.5 s |
| `legal-certify.spec.ts` › LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so | mobile-360 | 91.2 s |
| `posting-routes.spec.ts` › PR-2 an incomplete step is the door's own refusal, at status 200 | desktop-1280 | 89.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 88.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 74.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 72.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 71.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 66.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 66.0 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 64.9 s |
