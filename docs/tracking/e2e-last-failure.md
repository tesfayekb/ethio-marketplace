# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37088981953
- Commit: `ce64a6399105099d756373aa4124c5dbbaa95dfe`
- Attempt: 1
- Written (UTC): 2026-10-03T02:19:57.705Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

28 line(s), 11 message(s): 1 off the allowlist, 10 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `digest mismatch` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `export_failed permission denied` (quiet) | 2 | shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 1 | shard 6 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · digest mismatch ×3 · commit_failed duplicate key value violates unique constraint <q> ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · export_failed permission denied ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37088981953-email
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (528ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (495ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.4s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (14.8s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (16.2s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (14.9s)
  ✓   73 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (18.7s)
  ✓   74 [mobile-360] › e2e/shell.spec.ts:2089:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (34.3s)
  ✓   75 [mobile-360] › e2e/shell.spec.ts:2256:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (10.4s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37088981953-email

  1 passed (9.4s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37088981953-1-3048-3-erwkts@ethio-e2e.invalid)
  ✓   48 [mobile-360] › e2e/admin-attributes-links.spec.ts:676:3 › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error (24.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37088981953-1-3048-2-1vcg3g@ethio-e2e.invalid)
  ✓   50 [mobile-360] › e2e/admin-attributes-library.spec.ts:471:3 › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) (12.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37088981953-1-3048-3-erwkts@ethio-e2e.invalid)
  ✓   51 [mobile-360] › e2e/admin-attributes-links.spec.ts:781:3 › C3 attributes console › AT-60 a links file reorders three links and the posting read follows (15.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37088981953-1-3048-2-1vcg3g@ethio-e2e.invalid)
  ✓   52 [mobile-360] › e2e/admin-attributes-library.spec.ts:503:3 › C3 attributes console › AT-11 remove from category unlinks it and the chip disappears (DB truth) (18.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37088981953-1-3048-3-erwkts@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   73 [mobile-360] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (2.3s)
  ✓   74 [mobile-360] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.3s)
  ✓   75 [mobile-360] › e2e/layout.spec.ts:71:1 › LY-5 Account tab opens the overview and profile card (2.1s)
  ✓   76 [mobile-360] › e2e/locations-tree.spec.ts:66:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (391ms)
  ✓   77 [mobile-360] › e2e/locations-tree.spec.ts:94:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (371ms)
  ✓   70 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (15.1s)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   78 [mobile-360] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (31.8s)
  ✓   80 [mobile-360] › e2e/locations-tree.spec.ts:219:3 › L1c · public per-country location tree › LR-4 the payload carries the eleven read fields and nothing else (93ms)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   50 [mobile-360] › e2e/post-wizard-specs.spec.ts:1059:3 › POSTING WIZARD › PW-18 specifications survive a step Back (10.8s)
[PW-98 fresh] city={"x":90,"y":212,"width":204,"height":44} tick={"x":90,"y":360,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
[PW-98 prefilled] city={"x":90,"y":212,"width":204,"height":44} tick={"x":90,"y":360,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
  ✓   51 [mobile-360] › e2e/post-wizard-specs.spec.ts:1107:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (8.1s)
  ✓   49 [mobile-360] › e2e/post-wizard-where.spec.ts:673:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled (22.6s)
  ✓   52 [mobile-360] › e2e/post-wizard-specs.spec.ts:1133:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (13.3s)
  ✓   53 [mobile-360] › e2e/post-wizard-where.spec.ts:704:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-99 the place boxes step in; every select stays at least 200 px (13.2s)
  ✓   55 [mobile-360] › e2e/post-wizard-where.spec.ts:778:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin (9.6s)
  ✓   54 [mobile-360] › e2e/post-wizard-specs.spec.ts:1183:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (12.2s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37088981953-4-2871-3-sdzw71@ethio-e2e.invalid)
  ✓   58 [desktop-1280] › e2e/admin-attributes-library.spec.ts:665:3 › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses (8.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37088981953-4-2871-2-qdyccs@ethio-e2e.invalid)
  ✓   60 [desktop-1280] › e2e/admin-attributes-library.spec.ts:788:3 › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety (11.2s)
  ✓   59 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1137:3 › C3 attributes console › AT-40 the import dialog reaches Applied and undoes (18.8s)
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
  ✓   61 [desktop-1280] › e2e/admin-attributes-library.spec.ts:909:3 › C3 attributes console › AT-16 a user without categories:view gets 403 and sees no export control (8.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37088981953-4-2871-2-qdyccs@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37088981953-5-3258-3-eyeqpp@ethio-e2e.invalid)
  ✓   71 [desktop-1280] › e2e/layout.spec.ts:18:1 › LY-1 wide pages use most of the desktop content width (4.9s)
  -   73 [desktop-1280] › e2e/layout.spec.ts:35:1 › LY-2 mobile pages do not overflow
  ✓   74 [desktop-1280] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (2.2s)
  ✓   75 [desktop-1280] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.6s)
  ✓   76 [desktop-1280] › e2e/layout.spec.ts:71:1 › LY-5 Account tab opens the overview and profile card (1.9s)
  ✓   77 [desktop-1280] › e2e/locations-tree.spec.ts:66:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (494ms)
  ✓   78 [desktop-1280] › e2e/locations-tree.spec.ts:94:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (291ms)
  ✓   72 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (15.2s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   76 [desktop-1280] › e2e/posting-routes.spec.ts:333:3 › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) (8.3s)
  ✓   77 [desktop-1280] › e2e/shell-table-law.spec.ts:34:3 › shell table law › admin tables never overflow horizontally (3.3s)
  ✓   79 [desktop-1280] › e2e/shell.spec.ts:142:3 › app shell › mounts with header, rail slot and footer, logged out (602ms)
  ✓   80 [desktop-1280] › e2e/shell.spec.ts:168:3 › app shell › feed renders its empty state (1.1s)
  ✓   81 [desktop-1280] › e2e/shell.spec.ts:197:3 › app shell › language toggle renders Amharic (Ge'ez path) (1.3s)
  ✓   82 [desktop-1280] › e2e/shell.spec.ts:225:3 › app shell › the vertical stack is ordered: top bar, location row, breadcrumbs, body (538ms)
  ✓   78 [desktop-1280] › e2e/posting-routes.spec.ts:375:3 › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active (5.0s)
INC-283: picks resolved region=addis-ababa city=addis-ababa
  ✓   83 [desktop-1280] › e2e/shell.spec.ts:244:3 › app shell › the location row cascades Country -> Region -> City, city selectable (1.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
