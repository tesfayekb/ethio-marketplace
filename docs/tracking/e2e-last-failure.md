# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38250004537 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38250004537
- Commit: `45637132738127aaf7526490a8f7c4ca6381e373`
- Attempt: 1
- Written (UTC): 2026-10-12T13:08:24.420Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · shell.spec.ts › L4b location picker › LS-2 a pick is remembered, clearing forgets it — Error: [e2e:reap] translations of 0671ad01-3736-4bc4-9b60-dd66c69bd583 failed: <html>

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 15,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 15,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }

  968 |       { adds, changes, retires, reactivations, deletes, refused },
  969 |       `CT-18 the round trip was not a no-op: ${await counts.textContent()}`,
> 970 |     ).toEqual({ adds: 0, changes: 0, retires: 0, reactivations: 0, deletes: 0, refused: 0 });
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] refused POST /api/listings/draft: ok=false (door:doorError)
[client-error] HTTP 429 GET /api/catalog/find ((body unavailable))
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-59-a-card-1-identity-change-hides-only-what-hangs-on-it-and-a-card-2-change-touches-nothing-else-mobile-360`

### shell.spec.ts › L4b location picker › LS-2 a pick is remembered, clearing forgets it

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:reap] translations of 0671ad01-3736-4bc4-9b60-dd66c69bd583 failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:reap] translations of 0671ad01-3736-4bc4-9b60-dd66c69bd583 failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/locations.ts:273

  271 |       .eq("entity_id", id);
  272 |     if (translations.error) {
> 273 |       throw new Error(`[e2e:reap] translations of ${id} failed: ${translations.error.message}`);
      |             ^
  274 |     }
  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:273:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2218:7
```

Context:

```text
          - listitem [ref=e305]:
            - generic [ref=e306]: About
          - listitem [ref=e307]:
            - generic [ref=e308]: How it works
      - navigation "Help" [ref=e309]:
        - heading "Help" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: Safety
          - listitem [ref=e314]:
            - generic [ref=e315]: Contact
      - navigation "Legal" [ref=e316]:
        - heading "Legal" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Terms
          - listitem [ref=e321]:
            - generic [ref=e322]: Privacy
    - paragraph [ref=e324]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

109 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 8 | shard 3, shard 4, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `<html>` | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>wwgo: e<n>e_par_x<n>ey → e<n>e_chi_n<n>ltis` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>vf<n>y: e<n>e_par_<n>iyom → e<n>e_chi_c<n>s<n>xe` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>wwgo: e<n>e_par_x<n>ey → e<n>e_chi_n<n>ltis ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>vf<n>y: e<n>e_par_<n>iyom → e<n>e_chi_c<n>s<n>xe ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 4, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### <html>

- Count: 1 · Sources: shard 4

```text
[WebServer] [ssr-error] /api/listings/draft <html>
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T12:37:06.897Z | 20.1 min |
| email | 2026-10-12T12:37:04.166Z | 0.3 min |
| shard 1 | 2026-10-12T12:37:02.274Z | 22.4 min |
| shard 2 | 2026-10-12T12:37:00.115Z | 25.0 min |
| shard 3 | 2026-10-12T12:37:42.620Z | 27.5 min |
| shard 4 | 2026-10-12T12:37:03.802Z | 31.0 min |
| shard 5 | 2026-10-12T12:37:04.493Z | 26.8 min |
| shard 6 | 2026-10-12T12:37:12.187Z | 23.3 min |
| shard 7 | 2026-10-12T12:37:05.124Z | 27.4 min |
| shard 8 | 2026-10-12T12:37:02.243Z | 27.1 min |
| changed | 2026-10-12T12:37:05.096Z | 12.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 32.4 min | shard 4, shard 8 |
| `post-wizard-place.spec.ts` | 76 | 31.5 min | shard 3, shard 7, changed |
| `post-wizard-bundle2.spec.ts` | 68 | 25.9 min | shard 3, shard 7 |
| `admin-listings.spec.ts` | 54 | 22.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 21.6 min | smoke, shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 18.0 min | shard 4, shard 8 |
| `admin-screening.spec.ts` | 34 | 17.6 min | shard 2, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 16.3 min | shard 3, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.1 min | shard 1, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 14.9 min | shard 4, shard 8 |
| `feed-screens.spec.ts` | 28 | 14.1 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 12.8 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.4 min | shard 3, shard 7 |
| `auth-signout.spec.ts` | 44 | 11.0 min | smoke, shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.2 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.2 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 9.7 min | shard 2, shard 6 |
| `posting-routes.spec.ts` | 52 | 9.4 min | shard 4, shard 8 |
| `admin-users.spec.ts` | 26 | 8.9 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.7 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 8.7 min | shard 3, shard 7 |
| `admin-translations-console.spec.ts` | 42 | 8.4 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.2 min | shard 4, shard 8 |
| `import-security.spec.ts` | 34 | 7.6 min | shard 3, shard 7 |
| `admin-roles.spec.ts` | 26 | 7.3 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 6.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 28 | 6.6 min | shard 4, shard 8, changed |
| `feed-index.spec.ts` | 28 | 6.4 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.2 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.7 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 4.6 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.6 min | shard 1, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 7 |
| `admin-shell.spec.ts` | 10 | 3.1 min | shard 2, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.0 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.7 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 4, shard 8 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 0.7 min | shard 3, shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else | mobile-360 | 91.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 62.8 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 56.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 54.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 52.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 51.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 50.8 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 49.4 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | desktop-1280 | 47.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 46.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 46.7 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 46.0 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 45.9 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | desktop-1280 | 45.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 45.5 s |
