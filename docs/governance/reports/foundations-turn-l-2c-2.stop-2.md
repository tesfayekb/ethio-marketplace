# Foundations L-2c continuation — stop 2

CI FIRST: `762d6ac43ebbc61910416ac340b647f21e03beff` — **SUCCESS**, newest completed run read at turn start (40939712961). No initial checks run.

## Step 0

Saved ruling hash (payload between four-backtick fences, including final newline):
`9f4b9fd4459b782b5f61b7d9bdbd010e7929939a3f90e23d6f3a915836c67383` — matches.
Roadmap line 3 names foundations-turn-l-2c-2.md.

## Part 2 — built, measured, withdrawn (STOP)

Own edit tools rebuilt Part A directly: one reader-locale.ts held collatorFor, formatCountryName and compareCodes; location-data used compareCodes; name-collator used FIXED_ORDER_LOCALE and register row 16 named both mechanisms. CF-FMT-1 widened with CF-FMT-2 planted DisplayNames/Collator/bare localeCompare cases, plus Segmenter and approved-home negative controls. Autonym and CutText allowlist dates were 2027-04-30. FMT-9…11 passed. No appendix was applied.

The approved tolerance is at most 0.4 KiB **on any page**. The build exceeds that: /admin/locations grows 0.5381 KiB in the exact closure measurement; the checks' independently printed rounded comparison also shows /admin/roles +0.6 KiB. The ruling therefore requires STOP, not ceiling raises. All Part A changes were withdrawn with own edit tools, restoring ce7300bf's file bytes. Its six withdrawn-file manifest entries remain correct: none of those six exists in the final tree. No budget increased.

The measured candidate source/build was preserved temporarily before withdrawal; baseline artifacts came from the checks' read-only b4250ca0 export/build, captured before cleanup. No manual build/typecheck was run. b4250ca0 and ce7300bf differed only in documents and checks code before this turn, not app sources.

## Per-chunk table (entry closure, KiB gzip; checker rounds to 0.1)

| Chunk | b4250ca0 | Candidate | Change |
| --- | ---: | ---: | ---: |
| format-locale | 0.0 | 0.3 | +0.3 |
| index | 122.9 | 123.0 | +0.1 |
| locale | 0.2 | 0.0 | -0.2 |
| post-prefill | 0.8 | 0.0 | -0.8 |
| post-prefill-Do | 0.0 | 0.7 | +0.7 |
| reader-locale | 0.0 | 0.3 | +0.3 |

Entry JS: 206.4 → 206.8 KiB (rounded). The reader-order and country-name mechanism in one shared module, replacing inline copies, still splits format-locale out and changes the entry/module import overhead. On-demand compareCodes consumers also change page closures. No name-collator was added to the shell.

## Per-page growth (exact captured closure bytes / 1024)

| Page | b4250ca0 | Candidate | Growth KiB |
| --- | ---: | ---: | ---: |
| `/` | 220.5986 | 220.9424 | +0.3438 |
| `/$name` | 219.2705 | 219.6162 | +0.3457 |
| `/account` | 267.1123 | 267.4570 | +0.3447 |
| `/account_/legal` | 209.0645 | 209.4131 | +0.3486 |
| `/account_/legal_/$versionId` | 209.6602 | 210.0938 | +0.4336 |
| `/account_/saved` | 219.3564 | 219.7012 | +0.3447 |
| `/admin` | 207.3330 | 207.7656 | +0.4326 |
| `/admin/` | 208.1748 | 208.6084 | +0.4336 |
| `/admin/ai` | 334.8047 | 335.2510 | +0.4463 |
| `/admin/attributes` | 348.0293 | 348.4932 | +0.4639 |
| `/admin/audit` | 307.9053 | 308.3506 | +0.4453 |
| `/admin/categories` | 356.2510 | 356.7480 | +0.4971 |
| `/admin/countries` | 337.8145 | 338.2578 | +0.4434 |
| `/admin/coverage` | 330.3994 | 330.8408 | +0.4414 |
| `/admin/images` | 207.9795 | 208.4111 | +0.4316 |
| `/admin/impersonation_/$sessionId` | 308.5615 | 308.9902 | +0.4287 |
| `/admin/legal` | 277.6621 | 278.0195 | +0.3574 |
| `/admin/legal_/$versionId` | 276.9668 | 277.3135 | +0.3467 |
| `/admin/legal_/edit` | 282.4316 | 282.8652 | +0.4336 |
| `/admin/listings` | 354.1904 | 354.6367 | +0.4463 |
| `/admin/listings_/$listingId` | 378.7686 | 379.2148 | +0.4463 |
| `/admin/listings_/$listingId_/edit` | 401.2363 | 401.5723 | +0.3359 |
| `/admin/locations` | 268.8564 | 269.3945 | +0.5381 |
| `/admin/places` | 339.1074 | 339.5898 | +0.4824 |
| `/admin/roles` | 305.4395 | 305.9570 | +0.5176 |
| `/admin/roles_/$roleId` | 306.8057 | 307.2373 | +0.4316 |
| `/admin/screening` | 379.3975 | 379.8447 | +0.4473 |
| `/admin/translations` | 410.4521 | 410.9893 | +0.5371 |
| `/admin/translations_/$lang` | 320.7549 | 321.1846 | +0.4297 |
| `/admin/users` | 304.5293 | 304.9580 | +0.4287 |
| `/admin/users_/$userId` | 284.9258 | 285.2900 | +0.3643 |
| `/auth` | 219.0352 | 219.4678 | +0.4326 |
| `/auth_/callback` | 207.3711 | 207.8027 | +0.4316 |
| `/auth_/reset` | 209.4395 | 209.8701 | +0.4307 |
| `/c/$slug` | 220.5986 | 220.9424 | +0.3438 |
| `/dev/primitives` | 222.2754 | 222.7031 | +0.4277 |
| `/dev/style` | 241.3623 | 241.7939 | +0.4316 |
| `/dev/tall` | 206.6904 | 207.1230 | +0.4326 |
| `/l/$slug` | 250.1260 | 250.4922 | +0.3662 |
| `/legal/$kind` | 211.1426 | 211.4688 | +0.3262 |
| `/legal/accept` | 217.9561 | 218.3877 | +0.4316 |
| `/legal/publishing` | 211.9014 | 212.2256 | +0.3242 |
| `/my-listings` | 327.7002 | 328.1328 | +0.4326 |
| `/my-listings_/$listingId` | 316.9180 | 317.2783 | +0.3604 |
| `/my-listings_/$listingId_/edit` | 395.7236 | 396.0615 | +0.3379 |
| `/post` | 395.6855 | 396.0215 | +0.3359 |
| `/post_/$listingId` | 395.6514 | 395.9863 | +0.3350 |
| `/privacy` | 211.1338 | 211.4570 | +0.3232 |
| `/settings` | 270.7314 | 271.0732 | +0.3418 |
| `/terms` | 211.1309 | 211.4521 | +0.3213 |

## Tests and checks

Targeted tests: 6 files / 14 tests passed (FMT-9…11 and unchanged place/shell order tests); 8 files / 35 tests passed (formatter census/wiring and existing formatter/service tests); 15 files / 146 tests passed (unchanged AI, legal, country and entity tests). No existing test assertions or timeouts changed. No E2E file changed or E2E run claimed.

Candidate whole unit suite: **2,235 passed, 2 failed, 2,237 total**, 375 files, at 2 workers. Both failures were AGL-1/AGL-2: adding the required architecture line to AGENTS changed its exact 10,200-byte allowance, making that line stale. No timeout failure. Withdrawal restores AGENTS exactly; whole agents-lines.test.ts recheck **3/3 passed**. This is not a whole-suite proof.

Candidate checks last line:
`checks: 32 PASS · 2 FAIL · 21 NOT RUN · 999s`
The other FAIL was the NEAR band, 16 pages grew. This candidate is not retained or presented as green. A clean-tree whole checks rerun is underway because the standing rule requires every FAIL repaired and the whole run repeated; this is a departure from the one-run preference, not an initial redundant run.

## Machine-order kinds

From stop 1: link_id/id = UUIDs (lowercase ASCII); category_slug = lowercase ASCII slug; country_code/code = uppercase ISO ASCII code (language roster codes lowercase); created_at = consistently serialized ISO timestamp; feature = lowercase ASCII feature id. Human-name comparisons elsewhere use reader collator or fixed compareNames. The shell's nameEn code-point tie-break is the explicitly approved L-2b exception, not a claim that human names are single-case machine ids.

## K2

No final source changes. Reference candidate eliminated src/ bare localeCompare sites; the ruled autonym and CutText Segmenter exceptions remained. Tooling bypasses unchanged: scripts/admin-tables.ts:175, scripts/i18n-usage-map.ts:113, scripts/ci/turn-checks.ts:229, scripts/e2e-failure-report.ts:946,962, scripts/destructive-red.ts:170. E2E Segmenter oracle at e2e/helpers/ui.ts:1457 remains outside the src-only widening. Non-Latin database collation parity and category-name-title follow-ups remain on the roadmap. AGENTS allowance must be handled alongside any next architecture-line edit.

## Final delivery and limits

Part 1 remains delivered from ce7300bf. Part 2 is **not delivered**, withdrawn for weight tolerance. Part B is L-2d, explicitly not this turn. No migration, dependency, secret or workflow changed. No manual push: the platform manages landing on dev; this report does not claim CI on the final landing.

Final clean checks: pending; updated below before closing.

## Files from git diff --name-only ce7300bf

- docs/governance/briefs/foundations-turn-l-2c-2.md
- docs/governance/reports/foundations-turn-l-2c-2.stop-2.md
- roadmap.md
