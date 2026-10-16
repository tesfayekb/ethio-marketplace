# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38892057319
- Commit: `d7f8833bb40dd9e379bdc282ee4e45e294a4855c`
- Attempt: 1
- Written (UTC): 2026-10-16T11:54:11.870Z
- Passed: 1771 · Skipped: 126 · Failed: 36
- Gating failures: 36 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) — Error: [e2e:mlp] seeding failed: <html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in — Error: expect(page).toHaveURL(expected) failed

## Flaky bodies (DEC-078)

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mlp] seeding failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:mlp] seeding failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


  217 |       .select("id")
  218 |       .single();
> 219 |     if (error || !data) throw new Error(`[e2e:mlp] seeding failed: ${error?.message ?? "no row"}`);
      |                               ^
  220 |     const id = data.id as string;
  221 |     listingIds.push(id);
  222 |     const located = await adminClient()
    at seed (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:219:31)
    at seedBoth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:240:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:353:15
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-2-The-My-listings-page-the-groups-with-their-counts-each-row-s-line-Continue-on-a-draft-D138-mobile-360` — Playwright's name `my-listings-page-MY-LISTIN-20138-e-Continue-on-a-draft-D138--mobile-360`; this run carried 68 context file(s); of the same spec: `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-mobile-360-retry1`, `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-mobile-360`, `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-desktop-1280`

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e320]:
            - generic [ref=e321]: About
          - listitem [ref=e322]:
            - generic [ref=e323]: How it works
      - navigation "Help" [ref=e324]:
        - heading "Help" [level=2] [ref=e325]
        - list [ref=e326]:
          - listitem [ref=e327]:
            - generic [ref=e328]: Safety
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Legal" [ref=e331]:
        - heading "Legal" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Terms
          - listitem [ref=e336]:
            - generic [ref=e337]: Privacy
    - paragraph [ref=e339]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e287]:
            - generic [ref=e288]: About
          - listitem [ref=e289]:
            - generic [ref=e290]: How it works
      - navigation "Help" [ref=e291]:
        - heading "Help" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Safety
          - listitem [ref=e296]:
            - generic [ref=e297]: Contact
      - navigation "Legal" [ref=e298]:
        - heading "Legal" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Terms
          - listitem [ref=e303]:
            - generic [ref=e304]: Privacy
    - paragraph [ref=e306]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"


  483 |       await window.__ethioSupabase!.auth.signOut({ scope: "local" });
  484 |     });
> 485 |     await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
      |                        ^
  486 |   });
  487 |
  488 |   test("MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:485:24
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

100 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 10 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 7 | shard 1, shard 4, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `too many previews` (quiet) | 4 | shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>yvqm<n>: e<n>e_par_s<n>rika → e<n>e_chi_<n>hzr<n>t` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ylvuzk: e<n>e_par_gmqgnn → e<n>e_chi_d<n>bnfy` (quiet) | 1 | shard 1 |
| `upstream returned an HTML error page (<n>)` | 1 | shard 3 |

Quiet (allowlisted): digest mismatch ×7 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · too many previews ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>yvqm<n>: e<n>e_par_s<n>rika → e<n>e_chi_<n>hzr<n>t ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ylvuzk: e<n>e_par_gmqgnn → e<n>e_chi_d<n>bnfy ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-174 a parent's move whose new option carries no fact leaves D on another pare ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · /settings shows the Account context, and returning shows categories ×1 · PR-41 the door refuses an answer the chosen options do not allow ×1 · PW-162 (e) a basis emptied by a specification change after the title step leaves ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-31 the market select waits for the prefill chain and never preselects ×1

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T11:12:07.234Z | 17.5 min |
| email | 2026-10-16T11:12:00.267Z | 0.2 min |
| shard 1 | 2026-10-16T11:12:08.209Z | 41.6 min |
| shard 2 | 2026-10-16T11:12:08.170Z | 36.3 min |
| shard 3 | 2026-10-16T11:12:06.565Z | 33.5 min |
| shard 4 | 2026-10-16T11:12:01.895Z | 32.2 min |
| shard 5 | 2026-10-16T11:12:02.263Z | 35.9 min |
| shard 6 | 2026-10-16T11:12:09.187Z | 28.7 min |
| changed | 2026-10-16T11:11:59.363Z | 3.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 23.1 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 23.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 78 | 19.4 min | smoke, shard 2, shard 5, changed |
| `shell.spec.ts` | 336 | 18.9 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 17.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 16.3 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 62 | 12.3 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 12.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 11.8 min | shard 3, shard 5 |
| `admin-screening.spec.ts` | 50 | 11.7 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 11.6 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 11.4 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 30 | 11.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 9.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 9.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.6 min | shard 1, shard 5 |
| `import-security.spec.ts` | 36 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 7.5 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 7.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.6 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 5.8 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 5.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 5.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 4.9 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.6 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 4.5 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.8 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 94.0 s |
| `admin-users.spec.ts` › AU-1 permission: moderator is refused, admin sees the list | mobile-360 | 85.8 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 75.8 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 75.4 s |
| `admin-users.spec.ts` › AU-1 permission: moderator is refused, admin sees the list | desktop-1280 | 73.3 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | mobile-360 | 72.2 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | mobile-360 | 71.2 s |
| `admin-audit.spec.ts` › AS-1 gating: a plain user is refused, a moderator reads the log | desktop-1280 | 63.5 s |
| `admin-coverage.spec.ts` › CV-1 gating: a plain user is refused; the roster renders for a super admin | mobile-360 | 63.4 s |
| `admin-locations.spec.ts` › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin | mobile-360 | 63.0 s |
| `admin-shell.spec.ts` › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one | mobile-360 | 62.9 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | desktop-1280 | 62.8 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 62.5 s |
| `admin-attributes-library.spec.ts` › AT-1 gating: a plain user is refused; the library renders for an admin | mobile-360 | 62.3 s |
| `admin-shell.spec.ts` › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one | desktop-1280 | 60.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38892057319-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38892057319-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38892057319-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 55 user(s) owned by process 38892057319-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38892057319-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38892057319-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 4, fresh 30)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 50 user(s) owned by process 38892057319-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38892057319-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38892057319-changed
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')

--- further error 1 ---
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')


  452 |       const passwordInput = page.getByTestId("auth-password");
  453 |       const submit = page.getByTestId("auth-submit");
> 454 |       await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      |                                                               ^
  455 |       await emailInput.fill(user.email);
  456 |       await passwordInput.fill(user.password);
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: How it works
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
          - listitem [ref=e275]:
            - generic [ref=e276]: Contact
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Terms
          - listitem [ref=e282]:
            - generic [ref=e283]: Privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')

--- further error 1 ---
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')


  452 |       const passwordInput = page.getByTestId("auth-password");
  453 |       const submit = page.getByTestId("auth-submit");
> 454 |       await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      |                                                               ^
  455 |       await emailInput.fill(user.email);
  456 |       await passwordInput.fill(user.password);
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: How it works
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Legal" [ref=e261]:
        - heading "Legal" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Terms
          - listitem [ref=e266]:
            - generic [ref=e267]: Privacy
    - paragraph [ref=e269]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: How it works
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
          - listitem [ref=e258]:
            - generic [ref=e259]: Contact
      - navigation "Legal" [ref=e260]:
        - heading "Legal" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Terms
          - listitem [ref=e265]:
            - generic [ref=e266]: Privacy
    - paragraph [ref=e268]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e264]:
            - generic [ref=e265]: About
          - listitem [ref=e266]:
            - generic [ref=e267]: How it works
      - navigation "Help" [ref=e268]:
        - heading "Help" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Safety
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Legal" [ref=e275]:
        - heading "Legal" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Terms
          - listitem [ref=e280]:
            - generic [ref=e281]: Privacy
    - paragraph [ref=e283]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e318]:
            - generic [ref=e319]: About
          - listitem [ref=e320]:
            - generic [ref=e321]: How it works
      - navigation "Help" [ref=e322]:
        - heading "Help" [level=2] [ref=e323]
        - list [ref=e324]:
          - listitem [ref=e325]:
            - generic [ref=e326]: Safety
          - listitem [ref=e327]:
            - generic [ref=e328]: Contact
      - navigation "Legal" [ref=e329]:
        - heading "Legal" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - generic [ref=e333]: Terms
          - listitem [ref=e334]:
            - generic [ref=e335]: Privacy
    - paragraph [ref=e337]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e303]:
            - generic [ref=e304]: About
          - listitem [ref=e305]:
            - generic [ref=e306]: How it works
      - navigation "Help" [ref=e307]:
        - heading "Help" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Safety
          - listitem [ref=e312]:
            - generic [ref=e313]: Contact
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - generic [ref=e318]: Terms
          - listitem [ref=e319]:
            - generic [ref=e320]: Privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: How it works
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
          - listitem [ref=e258]:
            - generic [ref=e259]: Contact
      - navigation "Legal" [ref=e260]:
        - heading "Legal" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Terms
          - listitem [ref=e265]:
            - generic [ref=e266]: Privacy
    - paragraph [ref=e268]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e319]:
            - generic [ref=e320]: About
          - listitem [ref=e321]:
            - generic [ref=e322]: How it works
      - navigation "Help" [ref=e323]:
        - heading "Help" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Safety
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Legal" [ref=e330]:
        - heading "Legal" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Terms
          - listitem [ref=e335]:
            - generic [ref=e336]: Privacy
    - paragraph [ref=e338]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:66

  64 | /** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
  65 | export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
> 66 |   await expect(input, `${fieldName} field is not editable`).toBeEditable();
     |                                                             ^
```

Context:

```text
          - listitem [ref=e313]:
            - generic [ref=e314]: About
          - listitem [ref=e315]:
            - generic [ref=e316]: How it works
      - navigation "Help" [ref=e317]:
        - heading "Help" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - generic [ref=e321]: Safety
          - listitem [ref=e322]:
            - generic [ref=e323]: Contact
      - navigation "Legal" [ref=e324]:
        - heading "Legal" [level=2] [ref=e325]
        - list [ref=e326]:
          - listitem [ref=e327]:
            - generic [ref=e328]: Terms
          - listitem [ref=e329]:
            - generic [ref=e330]: Privacy
    - paragraph [ref=e332]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e261]:
            - generic [ref=e262]: About
          - listitem [ref=e263]:
            - generic [ref=e264]: How it works
      - navigation "Help" [ref=e265]:
        - heading "Help" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Safety
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Legal" [ref=e272]:
        - heading "Legal" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Terms
          - listitem [ref=e277]:
            - generic [ref=e278]: Privacy
    - paragraph [ref=e280]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: How it works
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
          - listitem [ref=e243]:
            - generic [ref=e244]: Contact
      - navigation "Legal" [ref=e245]:
        - heading "Legal" [level=2] [ref=e246]
        - list [ref=e247]:
          - listitem [ref=e248]:
            - generic [ref=e249]: Terms
          - listitem [ref=e250]:
            - generic [ref=e251]: Privacy
    - paragraph [ref=e253]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#auth-email')


   at helpers/ui.ts:69

  67 |
  68 |   for (let attempt = 1; attempt <= 5; attempt += 1) {
> 69 |     await input.fill("");
     |                 ^
  70 |     await input.fill(value);
  71 |
  72 |     try {
    at fillUntilStable (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:69:17)
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:397:3)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:517:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:210:5
```

Context:

```text
          - listitem [ref=e220]:
            - generic [ref=e221]: About
          - listitem [ref=e222]:
            - generic [ref=e223]: How it works
      - navigation "Help" [ref=e224]:
        - heading "Help" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: Safety
          - listitem [ref=e229]:
            - generic [ref=e230]: Contact
      - navigation "Legal" [ref=e231]:
        - heading "Legal" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Terms
          - listitem [ref=e236]:
            - generic [ref=e237]: Privacy
    - paragraph [ref=e239]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')

--- further error 1 ---
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')


  452 |       const passwordInput = page.getByTestId("auth-password");
  453 |       const submit = page.getByTestId("auth-submit");
> 454 |       await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      |                                                               ^
  455 |       await emailInput.fill(user.email);
  456 |       await passwordInput.fill(user.password);
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: How it works
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
          - listitem [ref=e275]:
            - generic [ref=e276]: Contact
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Terms
          - listitem [ref=e282]:
            - generic [ref=e283]: Privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e277]:
            - generic [ref=e278]: About
          - listitem [ref=e279]:
            - generic [ref=e280]: How it works
      - navigation "Help" [ref=e281]:
        - heading "Help" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Safety
          - listitem [ref=e286]:
            - generic [ref=e287]: Contact
      - navigation "Legal" [ref=e288]:
        - heading "Legal" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Terms
          - listitem [ref=e293]:
            - generic [ref=e294]: Privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e256]:
            - generic [ref=e257]: About
          - listitem [ref=e258]:
            - generic [ref=e259]: How it works
      - navigation "Help" [ref=e260]:
        - heading "Help" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Safety
          - listitem [ref=e265]:
            - generic [ref=e266]: Contact
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Terms
          - listitem [ref=e272]:
            - generic [ref=e273]: Privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e262]:
            - generic [ref=e263]: About
          - listitem [ref=e264]:
            - generic [ref=e265]: How it works
      - navigation "Help" [ref=e266]:
        - heading "Help" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Safety
          - listitem [ref=e271]:
            - generic [ref=e272]: Contact
      - navigation "Legal" [ref=e273]:
        - heading "Legal" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Terms
          - listitem [ref=e278]:
            - generic [ref=e279]: Privacy
    - paragraph [ref=e281]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: How it works
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
          - listitem [ref=e264]:
            - generic [ref=e265]: Contact
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Terms
          - listitem [ref=e271]:
            - generic [ref=e272]: Privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e277]:
            - generic [ref=e278]: About
          - listitem [ref=e279]:
            - generic [ref=e280]: How it works
      - navigation "Help" [ref=e281]:
        - heading "Help" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Safety
          - listitem [ref=e286]:
            - generic [ref=e287]: Contact
      - navigation "Legal" [ref=e288]:
        - heading "Legal" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Terms
          - listitem [ref=e293]:
            - generic [ref=e294]: Privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: How it works
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
          - listitem [ref=e264]:
            - generic [ref=e265]: Contact
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Terms
          - listitem [ref=e271]:
            - generic [ref=e272]: Privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e235]:
            - generic [ref=e236]: About
          - listitem [ref=e237]:
            - generic [ref=e238]: How it works
      - navigation "Help" [ref=e239]:
        - heading "Help" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Safety
          - listitem [ref=e244]:
            - generic [ref=e245]: Contact
      - navigation "Legal" [ref=e246]:
        - heading "Legal" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Terms
          - listitem [ref=e251]:
            - generic [ref=e252]: Privacy
    - paragraph [ref=e254]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: How it works
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Legal" [ref=e261]:
        - heading "Legal" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Terms
          - listitem [ref=e266]:
            - generic [ref=e267]: Privacy
    - paragraph [ref=e269]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"


  483 |       await window.__ethioSupabase!.auth.signOut({ scope: "local" });
  484 |     });
> 485 |     await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
      |                        ^
  486 |   });
  487 |
  488 |   test("MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:485:24
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e275]:
            - generic [ref=e276]: About
          - listitem [ref=e277]:
            - generic [ref=e278]: How it works
      - navigation "Help" [ref=e279]:
        - heading "Help" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Safety
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Terms
          - listitem [ref=e291]:
            - generic [ref=e292]: Privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: How it works
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
          - listitem [ref=e263]:
            - generic [ref=e264]: Contact
      - navigation "Legal" [ref=e265]:
        - heading "Legal" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Terms
          - listitem [ref=e270]:
            - generic [ref=e271]: Privacy
    - paragraph [ref=e273]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e297]:
            - generic [ref=e298]: About
          - listitem [ref=e299]:
            - generic [ref=e300]: How it works
      - navigation "Help" [ref=e301]:
        - heading "Help" [level=2] [ref=e302]
        - list [ref=e303]:
          - listitem [ref=e304]:
            - generic [ref=e305]: Safety
          - listitem [ref=e306]:
            - generic [ref=e307]: Contact
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - generic [ref=e312]: Terms
          - listitem [ref=e313]:
            - generic [ref=e314]: Privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e386]:
            - generic [ref=e387]: About
          - listitem [ref=e388]:
            - generic [ref=e389]: How it works
      - navigation "Help" [ref=e390]:
        - heading "Help" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Safety
          - listitem [ref=e395]:
            - generic [ref=e396]: Contact
      - navigation "Legal" [ref=e397]:
        - heading "Legal" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Terms
          - listitem [ref=e402]:
            - generic [ref=e403]: Privacy
    - paragraph [ref=e405]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e306]:
            - generic [ref=e307]: About
          - listitem [ref=e308]:
            - generic [ref=e309]: How it works
      - navigation "Help" [ref=e310]:
        - heading "Help" [level=2] [ref=e311]
        - list [ref=e312]:
          - listitem [ref=e313]:
            - generic [ref=e314]: Safety
          - listitem [ref=e315]:
            - generic [ref=e316]: Contact
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - generic [ref=e321]: Terms
          - listitem [ref=e322]:
            - generic [ref=e323]: Privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e287]:
            - generic [ref=e288]: About
          - listitem [ref=e289]:
            - generic [ref=e290]: How it works
      - navigation "Help" [ref=e291]:
        - heading "Help" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Safety
          - listitem [ref=e296]:
            - generic [ref=e297]: Contact
      - navigation "Legal" [ref=e298]:
        - heading "Legal" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Terms
          - listitem [ref=e303]:
            - generic [ref=e304]: Privacy
    - paragraph [ref=e306]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')

--- further error 1 ---
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')


  452 |       const passwordInput = page.getByTestId("auth-password");
  453 |       const submit = page.getByTestId("auth-submit");
> 454 |       await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      |                                                               ^
  455 |       await emailInput.fill(user.email);
  456 |       await passwordInput.fill(user.password);
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: How it works
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Legal" [ref=e306]:
        - heading "Legal" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Terms
          - listitem [ref=e311]:
            - generic [ref=e312]: Privacy
    - paragraph [ref=e314]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e288]:
            - generic [ref=e289]: About
          - listitem [ref=e290]:
            - generic [ref=e291]: How it works
      - navigation "Help" [ref=e292]:
        - heading "Help" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Safety
          - listitem [ref=e297]:
            - generic [ref=e298]: Contact
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Terms
          - listitem [ref=e304]:
            - generic [ref=e305]: Privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `changed`
- Project: `mobile-360`

```text
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')

--- further error 1 ---
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')


  452 |       const passwordInput = page.getByTestId("auth-password");
  453 |       const submit = page.getByTestId("auth-submit");
> 454 |       await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      |                                                               ^
  455 |       await emailInput.fill(user.email);
  456 |       await passwordInput.fill(user.password);
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: How it works
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
          - listitem [ref=e275]:
            - generic [ref=e276]: Contact
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Terms
          - listitem [ref=e282]:
            - generic [ref=e283]: Privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')

--- further error 1 ---
Error: sign-in form did not render

expect(locator).toBeEditable() failed

Locator: getByTestId('auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render with timeout 15000ms
  - waiting for getByTestId('auth-email')


  452 |       const passwordInput = page.getByTestId("auth-password");
  453 |       const submit = page.getByTestId("auth-submit");
> 454 |       await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      |                                                               ^
  455 |       await emailInput.fill(user.email);
  456 |       await passwordInput.fill(user.password);
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-ylvuzk: e2e_par_gmqgnn → e2e_chi_d5bnfy
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×12
console.error: [client-error] gate fetch threw
```

## Server errors: shard 2

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

## Client errors: shard 2

```text
[client-error] console.error: [client-error] gate fetch threw ×2
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw ×2
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×2
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw ×6
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-2yvqm8: e2e_par_s2rika → e2e_chi_4hzr1t
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×3
console.error: [client-error] gate fetch threw ×3
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34181:25) at http://127.0.0.1:4173/assets/index-C8auPtcJ.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C8auPtcJ.js:6025:5) ×2
console.error: [client-error] gate fetch threw
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
