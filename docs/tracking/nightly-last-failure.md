# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39152445032
- Commit: `ca51872be255dac2d38e5c268577a41c9d8aec02`
- Attempt: 1
- Written (UTC): 2026-10-19T00:04:47.760Z
- Passed: 1 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly
- Sources without results: full
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

351 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 252 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>k<n>qm<n>: e<n>e_par_<n>i<n>ss → e<n>e_chi_lbvrrp` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-tspccq: e<n>e_par_ik<n>oa<n> → e<n>e_chi_<n>fmgo<n>` (quiet) | 1 | full |
| `listing not found` | 1 | full |
| `replace_listing_photo: listing not found` | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>k<n>qm<n>: e<n>e_par_<n>i<n>ss → e<n>e_chi_lbvrrp ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-tspccq: e<n>e_par_ik<n>oa<n> → e<n>e_chi_<n>fmgo<n> ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 252 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): no account fixtures fit ×9 · super admin routes fit ×8 · account at every width ×6 · the marketplace shell renders no English fallback ×6 · admin categories at every width ×5 · AP-41 the page's remaining lines ×5

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-3 a complete draft publishes to screening and never to active ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### replace_listing_photo: listing not found

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) ×1 · PP-28 a refused edit keeps the editor open with its reason and the photo as it w ×1

```text
[WebServer] [ssr-error] /api/upload/photo replace_listing_photo: listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly · unavailable: full

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-18T19:05:06.054Z | 3.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.6 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39152445032-nightly
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×16
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).

## full: no results file

full: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/view HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/view HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
  ✘    52 [mobile-360] › e2e/ad-page.spec.ts:1584:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box (14.5s)
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/media/photo-links HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/media/photo-links HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
--- final 10 lines ---
✓  1619 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1131:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (5.7s)
  ✓  1620 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1152:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (9.1s)
  ✓  1621 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1217:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (5.8s)
  ✓  1622 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1251:3 › POSTING WIZARD › PW-192 D193 on the price and the title steps: a fixed price with no figure closes Next, the figure opens it; a blank title closes it, a tap marks the title, typing opens it (6.3s)
  ✓  1623 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1296:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (5.6s)
  ✓  1624 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1314:3 › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) (10.9s)
  ✓  1625 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1380:3 › POSTING WIZARD › PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455) (7.2s)
  ✓  1626 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1436:3 › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control (5.9s)
  ✓  1627 [desktop-1280] › e2e/post-wizard-recent.spec.ts:54:3 › POSTING WIZARD — USED BEFORE › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none (8.5s)
```

```text
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×16
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
```
