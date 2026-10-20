# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39406911619 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39406911619
- Commit: `244b1e717db7f2ac3a71e7293322ae10906deaf8`
- Attempt: 1
- Written (UTC): 2026-10-20T11:11:45.157Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) — Error: [e2e:ml] seeding failed: canceling statement due to statement timeout

## Flaky bodies (DEC-078)

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/my_listing ({"code":"P0001","details":null,"hint":null,"message":"not your listing"})
```

Context:

```text
          - listitem [ref=e153]:
            - generic [ref=e154]: About
          - listitem [ref=e155]:
            - generic [ref=e156]: Contact
      - navigation "Help" [ref=e157]:
        - heading "Help" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - generic [ref=e161]: Safety
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - link "Terms" [ref=e166] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e167]:
            - link "Privacy" [ref=e168] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:ml] seeding failed: canceling statement due to statement timeout
--- further error 1 ---
Error: [e2e:ml] seeding failed: canceling statement due to statement timeout

  285 |       .select(`id,${TRUTH}`)
  286 |       .single();
> 287 |     if (error || !data) throw new Error(`[e2e:ml] seeding failed: ${error?.message ?? "no row"}`);
      |                               ^
  288 |     const row = data as unknown as Row;
  289 |     listingIds.push(row["id"] as string);
  290 |     const located = await adminClient()
    at seed (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:287:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:542:15
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>nm<n>po: e<n>e_par_n<n>oeg → e<n>e_chi_<n>ohyg<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-a<n>bo<n>: e<n>e_par_c<n>n<n>l<n> → e<n>e_chi_<n>oynqg` (quiet) | 1 | shard 4 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>nm<n>po: e<n>e_par_n<n>oeg → e<n>e_chi_<n>ohyg<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-a<n>bo<n>: e<n>e_par_c<n>n<n>l<n> → e<n>e_chi_<n>oynqg ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · an empty category shows the invitation alone, never the old box (D215) ×1 · location row is present on Marketplace and absent on Account ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-159 a list fact ticks its tick list once, and the seller's untick stays ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-44 nothing covers the top bars ×1 · AT-43 a renamed key is refused and names the key to restore ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T10:23:59.876Z | 22.3 min |
| email | 2026-10-20T10:24:37.439Z | 0.3 min |
| shard 1 | 2026-10-20T10:23:53.167Z | 44.1 min |
| shard 2 | 2026-10-20T10:27:17.604Z | 44.1 min |
| shard 3 | 2026-10-20T10:25:51.338Z | 36.4 min |
| shard 4 | 2026-10-20T10:24:14.354Z | 43.0 min |
| shard 5 | 2026-10-20T10:25:29.071Z | 46.0 min |
| shard 6 | 2026-10-20T10:23:52.735Z | 35.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 28.7 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 24.0 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 22.5 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 62 | 21.0 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 19.4 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 18.9 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 18.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 16.2 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 15.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 15.3 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 14.5 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.2 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 12.5 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.9 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 9.6 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.9 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 8.4 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.2 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 32 | 8.1 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 7.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 6.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 6.1 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 28 | 5.4 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `legal-accept.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 1.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 14 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 125.3 s |
| `my-listings-doors.spec.ts` › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) | mobile-360 | 81.9 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 67.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 64.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 60.2 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | mobile-360 | 56.0 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 53.4 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 51.1 s |
| `my-listings-doors.spec.ts` › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) | desktop-1280 | 50.9 s |
| `my-listings-ad.spec.ts` › MLA-5 Mark as sold asks first; then the ad is sold for good (D175 1) | mobile-360 | 50.3 s |
| `my-listings-doors.spec.ts` › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) | desktop-1280 | 50.2 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 49.0 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 47.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 47.6 s |
| `my-listings-doors.spec.ts` › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) | mobile-360 | 46.9 s |
