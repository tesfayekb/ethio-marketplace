# Foundations L-2c-3 — Part A report

CI FIRST: `ce7300bf08c08492c765d82fd4ebade085ef66c8` — **SUCCESS**, newest completed run read at turn start (40944397573). All four raw ci-evidence documents were read. No initial checks run.

## Step 0

Saved payload sha256 (including final newline, excluding four-backtick fences):
`2fe0c81e6a6a633d28db0d51166df14e0a989b20224a0722fe744623d678d2a6` — matches the ruling.
Roadmap line 3 names foundations-turn-l-2c-3.md.

## Part 2

Restored the own measured candidate from read-only project history `3062b206` by copying file contents, dependency first. No git apply, patch application, checkout, push or other stateful Git command used. Equality with that candidate proved for all 29 restored files by git diff --exit-code. The reader-order/country-name concern uses formatLocale and one reader-locale.ts containing collatorFor, formatCountryName and compareCodes; name-collator.ts takes FIXED_ORDER_LOCALE. Register row 16 names the mechanism set. Location-data uses the explicitly ruled code-point name tie-break, keeping name-collator off the shell.

AGENTS.md is byte-identical to 6039e3f7: its allowance is exactly 10,200 bytes and permits no added bytes. The ruling's G0.9 fallback records structure in register row 16 alone. AGL-1/2 pass; no allowance or test changed. The three resurrected test paths and reader-locale.ts were removed from intentional-deletions.txt; collator.ts/compare-codes.ts/country-name.ts stay listed and absent, since their exports share reader-locale.ts.

CF-FMT-1/2 and FMT-9…11 are the measured candidate's tests unchanged. CF-FMT-2 catches planted DisplayNames/Collator/bare localeCompare bypasses and includes approved-home/explicit-locale negative controls and Segmenter. The autonym and CutText exceptions expire 2027-04-30. Existing order, name, workflow and E2E files are unchanged (git diff --exit-code versus 6039e3f7). Translation maps regenerated.

## Per-page growth and raised ceilings

All 50 existing page ceilings move to the next whole KiB above their previous integer ceiling (+1 KiB); no ceiling decreases or extra pages. This preserves the existing ratchet room and resolves the former NEAR lines, rather than rounding a measurement down to a lower ceiling. Every line carries the ruling's exact cause: **the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c)**.

Fresh exact measurements from this turn's checks-owned build versus its 6039e3f7 baseline are below. They match the ruling's approved b4250ca0 table at four decimals; app sources at both baseline commits are identical. All 50 pages are explained; growth ranges from +0.3213 to +0.5381 KiB, within 0.6 KiB. Entry JS: 206.3789 → 206.8115 KiB (+0.4326).

| Page | 6039e3f7 KiB | Landed candidate KiB | Growth KiB | Old ceiling | Raised ceiling |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 220.5986 | 220.9424 | +0.3438 | 221 | 222 |
| `/$name` | 219.2705 | 219.6162 | +0.3457 | 220 | 221 |
| `/account` | 267.1123 | 267.4570 | +0.3447 | 268 | 269 |
| `/account_/legal` | 209.0645 | 209.4131 | +0.3486 | 210 | 211 |
| `/account_/legal_/$versionId` | 209.6602 | 210.0938 | +0.4336 | 211 | 212 |
| `/account_/saved` | 219.3564 | 219.7012 | +0.3447 | 220 | 221 |
| `/admin` | 207.3330 | 207.7656 | +0.4326 | 208 | 209 |
| `/admin/` | 208.1748 | 208.6084 | +0.4336 | 209 | 210 |
| `/admin/ai` | 334.8047 | 335.2510 | +0.4463 | 336 | 337 |
| `/admin/attributes` | 348.0293 | 348.4932 | +0.4639 | 349 | 350 |
| `/admin/audit` | 307.9053 | 308.3506 | +0.4453 | 309 | 310 |
| `/admin/categories` | 356.2510 | 356.7480 | +0.4971 | 357 | 358 |
| `/admin/countries` | 337.8145 | 338.2578 | +0.4434 | 339 | 340 |
| `/admin/coverage` | 330.3994 | 330.8408 | +0.4414 | 331 | 332 |
| `/admin/images` | 207.9795 | 208.4111 | +0.4316 | 209 | 210 |
| `/admin/impersonation_/$sessionId` | 308.5615 | 308.9902 | +0.4287 | 309 | 310 |
| `/admin/legal` | 277.6621 | 278.0195 | +0.3574 | 279 | 280 |
| `/admin/legal_/$versionId` | 276.9668 | 277.3135 | +0.3467 | 278 | 279 |
| `/admin/legal_/edit` | 282.4316 | 282.8652 | +0.4336 | 283 | 284 |
| `/admin/listings` | 354.1904 | 354.6367 | +0.4463 | 355 | 356 |
| `/admin/listings_/$listingId` | 378.7686 | 379.2148 | +0.4463 | 380 | 381 |
| `/admin/listings_/$listingId_/edit` | 401.2363 | 401.5723 | +0.3359 | 403 | 404 |
| `/admin/locations` | 268.8564 | 269.3945 | +0.5381 | 270 | 271 |
| `/admin/places` | 339.1074 | 339.5898 | +0.4824 | 340 | 341 |
| `/admin/roles` | 305.4395 | 305.9570 | +0.5176 | 306 | 307 |
| `/admin/roles_/$roleId` | 306.8057 | 307.2373 | +0.4316 | 308 | 309 |
| `/admin/screening` | 379.3975 | 379.8447 | +0.4473 | 380 | 381 |
| `/admin/translations` | 410.4521 | 410.9893 | +0.5371 | 411 | 412 |
| `/admin/translations_/$lang` | 320.7549 | 321.1846 | +0.4297 | 322 | 323 |
| `/admin/users` | 304.5293 | 304.9580 | +0.4287 | 305 | 306 |
| `/admin/users_/$userId` | 284.9258 | 285.2900 | +0.3643 | 286 | 287 |
| `/auth` | 219.0352 | 219.4678 | +0.4326 | 220 | 221 |
| `/auth_/callback` | 207.3711 | 207.8027 | +0.4316 | 208 | 209 |
| `/auth_/reset` | 209.4395 | 209.8701 | +0.4307 | 210 | 211 |
| `/c/$slug` | 220.5986 | 220.9424 | +0.3438 | 221 | 222 |
| `/dev/primitives` | 222.2754 | 222.7031 | +0.4277 | 223 | 224 |
| `/dev/style` | 241.3623 | 241.7939 | +0.4316 | 242 | 243 |
| `/dev/tall` | 206.6904 | 207.1230 | +0.4326 | 208 | 209 |
| `/l/$slug` | 250.1260 | 250.4922 | +0.3662 | 251 | 252 |
| `/legal/$kind` | 211.1426 | 211.4688 | +0.3262 | 212 | 213 |
| `/legal/accept` | 217.9561 | 218.3877 | +0.4316 | 219 | 220 |
| `/legal/publishing` | 211.9014 | 212.2256 | +0.3242 | 213 | 214 |
| `/my-listings` | 327.7002 | 328.1328 | +0.4326 | 329 | 330 |
| `/my-listings_/$listingId` | 316.9180 | 317.2783 | +0.3604 | 318 | 319 |
| `/my-listings_/$listingId_/edit` | 395.7236 | 396.0615 | +0.3379 | 397 | 398 |
| `/post` | 395.6855 | 396.0215 | +0.3359 | 397 | 398 |
| `/post_/$listingId` | 395.6514 | 395.9863 | +0.3350 | 397 | 398 |
| `/privacy` | 211.1338 | 211.4570 | +0.3232 | 212 | 213 |
| `/settings` | 270.7314 | 271.0732 | +0.3418 | 272 | 273 |
| `/terms` | 211.1309 | 211.4521 | +0.3213 | 212 | 213 |

## Tests and checks

Targeted candidate/guard/order proof: **11 files, 38 tests passed**. Existing legal/formatter/name/service proof: **16 files, 138 tests passed**, unchanged.
Whole unit suite: **375 files passed; 2,237 tests passed of 2,237**, at 2 workers (575s). Exactly one full checks run; no FAIL and 0 NEAR.

**Checks last line:** `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 931s`

The 21 NOT RUN steps: build-and-check/component-tests/bundle-budget dependency installs (3); Semgrep Upload SARIF and its upload-warning step (2); dependency-audit install and Audit (2); e2e-preflight Cache bun install, Bun cache hit?, Install dependencies and Migration parity preflight (4); E2E Download shard results, Download job log tails, Download error contexts, Verify artifacts belong to attempt, Publish merged report and Verdict (6); promote Token present, Configure bot, Fast-forward guard and Promote dev to main (4). These require GitHub services, advisory access, staging credentials/backend or CI promotion; no result invented.

**Part 2: done**, under the measured weight ruling. Fresh harness verdict: build OK. No manual push; platform-managed dev landing follows this turn.
No manual build/typecheck: harness verdict is read by checks, and checks owns its build. No E2E file changed, so no touched-spec run owed; browser authenticated flows are not claimed verified.

## K2

Stop-2 list stands, confirmed by census: scripts/admin-tables.ts:175, scripts/i18n-usage-map.ts:113, scripts/ci/turn-checks.ts:229, scripts/e2e-failure-report.ts:946,962, scripts/destructive-red.ts:170 still have tooling localeCompare outside the src-only widening. E2E Segmenter oracle: e2e/helpers/ui.ts:1457. Ruled autonym and CutText exceptions remain. Non-Latin database collation parity and category-name-title follow-ups remain on roadmap; making shared chunks cheaper belongs to later speed work. No app bare localeCompare remains.

Machine-order kinds from stop 1: UUIDs (lowercase ASCII), slugs (lowercase ASCII), country ISO codes (uppercase ASCII), language codes (lowercase ASCII), consistently serialized ISO timestamps, and lowercase ASCII feature ids. Human names use reader collator or fixed compareNames, except the explicitly ruled shell nameEn code-point tie-break.

## Delivery limits

Part B stays L-2d and is not implemented. No migration, dependency, secret or workflow changed. Platform manages landing on dev; no final-landing CI or publication claimed.

## Files from git diff --name-only 6039e3f7

- docs/_changelog.md
- docs/features/i18n-runtime.md
- docs/generated/i18n-usage.json
- docs/governance/briefs/foundations-turn-l-2c-3.md
- docs/governance/mechanisms.md
- docs/governance/reports/foundations-turn-l-2c-3.report.md
- docs/tracking/intentional-deletions.txt
- public/i18n-usage.json
- roadmap.md
- scripts/conformance/format-allowlist.txt
- scripts/conformance/format.test.ts
- scripts/route-budgets.mjs
- src/components/language-switcher.tsx
- src/components/shell/location-data.ts
- src/features/admin-ai/ai-service.ts
- src/features/admin-attributes/attributes-service.ts
- src/features/admin-attributes/category-attributes-dialog.tsx
- src/features/admin-categories/categories-service.ts
- src/features/admin-listings/listing-page.tsx
- src/features/admin-locations/locations-page.tsx
- src/features/admin-locations/locations-service.ts
- src/features/admin/legal/legal-page.tsx
- src/features/admin/translations/languages-page.tsx
- src/features/legal/legal-document-page.tsx
- src/features/legal/legal-kinds.ts
- src/features/posting/calling-codes.ts
- src/features/posting/step-who.tsx
- src/features/posting/wizard.tsx
- src/lib/collator.test.ts
- src/lib/compare-codes.test.ts
- src/lib/country-name.test.ts
- src/lib/locale.ts
- src/lib/name-collator.ts
- src/lib/place-order.ts
- src/lib/reader-locale.ts
- src/routes/api/categories.tree.ts
