# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37076355565
- Commit: `261760e9aae01addb6d219c264f2ea8be26739c7`
- Attempt: 1
- Written (UTC): 2026-10-02T23:19:58.389Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

24 line(s), 10 message(s): 1 off the allowlist, 9 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 4 | shard 3, shard 6 |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `digest mismatch` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `definitions nulByte` (quiet) | 1 | shard 2 |
| `definitions tooManyRows` (quiet) | 1 | shard 2 |
| `definitions unknownColumn` (quiet) | 1 | shard 2 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×3 · definitions wrongFile ×3 · digest mismatch ×3 · commit_failed duplicate key value violates unique constraint <q> ×2 · preview_failed permission denied ×2 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

6 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37076355565-email
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

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

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
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (15.4s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (14.4s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.5s)
  ✓   73 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (17.1s)
  ✓   74 [mobile-360] › e2e/shell.spec.ts:2089:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (26.8s)
  ✓   75 [mobile-360] › e2e/shell.spec.ts:2256:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (9.9s)
  ✓   76 [mobile-360] › e2e/shell.spec.ts:2293:3 › L4b location picker › LS-13 a second city stops the auto-select at the region (14.6s)
  ✓   77 [mobile-360] › e2e/smoke-auth-i18n.spec.ts:18:1 › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out (5.2s)
[a11y] home desktop-1280 serious=0 critical=0
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.0s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37076355565-email

  1 passed (8.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37076355565-1-3140-2-xbnucu@ethio-e2e.invalid)
  ✓   38 [mobile-360] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (12.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37076355565-1-3140-2-xbnucu@ethio-e2e.invalid)
  ✓   37 [mobile-360] › e2e/admin-attributes-library.spec.ts:170:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (28.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37076355565-1-3140-3-3p3wdh@ethio-e2e.invalid)
  ✓   39 [mobile-360] › e2e/admin-attributes-links.spec.ts:250:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (15.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37076355565-1-3140-2-xbnucu@ethio-e2e.invalid)
  ✓   40 [mobile-360] › e2e/admin-attributes-library.spec.ts:217:3 › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked (26.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37076355565-1-3140-3-3p3wdh@ethio-e2e.invalid)
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
--- error lines (2) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘   64 [mobile-360] › e2e/i18n-bundle.spec.ts:104:3 › STAB-I18N · cached translation bundle › IB-2 publishing a fence language moves the version and the bundle (1.9s)
--- final 10 lines ---
✓   75 [mobile-360] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.6s)
  ✓   76 [mobile-360] › e2e/layout.spec.ts:71:1 › LY-5 Account tab opens the overview and profile card (1.7s)
  ✓   77 [mobile-360] › e2e/locations-tree.spec.ts:66:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (385ms)
  ✓   78 [mobile-360] › e2e/locations-tree.spec.ts:94:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (346ms)
  ✓   71 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (17.5s)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   79 [mobile-360] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (31.4s)
  ✓   81 [mobile-360] › e2e/locations-tree.spec.ts:219:3 › L1c · public per-country location tree › LR-4 the payload carries the eleven read fields and nothing else (67ms)
  ✓   82 [mobile-360] › e2e/mfa-stepup.spec.ts:114:3 › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor @private-identity (6.0s)
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
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:714:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (11.3s)
  ✓   30 [mobile-360] › e2e/post-wizard-specs.spec.ts:493:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (11.3s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:884:3 › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control (16.5s)
  ✓   32 [mobile-360] › e2e/post-wizard-specs.spec.ts:514:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (19.7s)
  ✓   33 [mobile-360] › e2e/post-wizard-where.spec.ts:148:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (19.6s)
  ✓   34 [mobile-360] › e2e/post-wizard-specs.spec.ts:594:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (14.1s)
  ✓   36 [mobile-360] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (21.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   54 [desktop-1280] › e2e/admin-attributes-links.spec.ts:919:3 › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged (10.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37076355565-4-3052-3-hf06ms@ethio-e2e.invalid)
  ✓   55 [desktop-1280] › e2e/admin-attributes-library.spec.ts:561:3 › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN (7.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37076355565-4-3052-2-p4jqu0@ethio-e2e.invalid)
  ✓   57 [desktop-1280] › e2e/admin-attributes-library.spec.ts:612:3 › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending (5.2s)
  ✓   56 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1043:3 › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file (14.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37076355565-4-3052-3-hf06ms@ethio-e2e.invalid)
  ✓   58 [desktop-1280] › e2e/admin-attributes-library.spec.ts:665:3 › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses (12.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37076355565-4-3052-2-p4jqu0@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   41 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (12.9s)
  ✓   42 [desktop-1280] › e2e/admin-users.spec.ts:362:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (9.3s)
  ✓   43 [desktop-1280] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (10.6s)
  ✓   44 [desktop-1280] › e2e/admin-users.spec.ts:375:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (17.1s)
  ✓   45 [desktop-1280] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (17.2s)
  ✓   47 [desktop-1280] › e2e/auth-signout.spec.ts:358:3 › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension) (9.7s)
  ✓   48 [desktop-1280] › e2e/category-image-routes.spec.ts:111:3 › C5a — category AI foundation routes › CI-1 unauthenticated callers are refused by both routes (106ms)
  ✓   46 [desktop-1280] › e2e/admin-users.spec.ts:403:3 › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes (24.9s)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   38 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1343:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (13.0s)
[PW-98 fresh] city={"x":430,"y":274,"width":316,"height":44} tick={"x":430,"y":422,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
[PW-98 prefilled] city={"x":430,"y":274,"width":316,"height":44} tick={"x":430,"y":422,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
  ✓   41 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1513:3 › POSTING WIZARD › PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45) (16.0s)
  ✓   40 [desktop-1280] › e2e/post-wizard-where.spec.ts:673:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled (18.0s)
  ✓   42 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1566:3 › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray (11.4s)
  ✓   43 [desktop-1280] › e2e/post-wizard-where.spec.ts:704:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-99 the place boxes step in; every select stays at least 200 px (14.5s)
  ✓   44 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1637:3 › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile (13.2s)
  ✓   45 [desktop-1280] › e2e/post-wizard-where.spec.ts:778:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin (12.9s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
