# Report — turn D2 (INC-1023): the app reads the bundle's parts

Brief: docs/governance/briefs/foundations-turn-d2-strings.md. Base: dev b3e8dba2.

## 1. Step 0

- sha256 of the ruling text (with its final newline): `9ce7fed0553feaec3efb74f0910e454298e26d89506074c2d8acc3420b855933` — equals the value after END; the fenced block in the saved brief hashes to the same value.
- Roadmap line 3 names the D2 brief (and D1's); prettier check passed on roadmap.md.

## 2. CI

- Last completed run: 41156059838 on `b3e8dba2`, **FAILURE**, completed 2026-10-31T02:05:46Z.
  - E2E results: 2,039 passed, 216 skipped, 0 failed, 0 flaky.
  - Lane 3 and the smoke lane: the temporary backend never started (`toomanyrequests: Rate exceeded` from the Docker registry). Classified as infrastructure, per the ruling; the CI turn after D2 fixes it.
  - "E2E (Playwright, ethio-staging)": failure. The ruling expects STAGING BEHIND on this run, because it may have started before the operator's staging apply. I did not open that job's body. It is not classified as a defect; the run on this push judges it.
  - Every other job passed, the first-paint budget included.

## 3. Consumers moved (file:line at the final tree)

| Consumer | Before | After |
| --- | --- | --- |
| src/i18n/bundle.ts `fetchUiBundle` (rpc fallback) | `rpc("get_ui_bundle")`, flat map | `rpc("get_ui_bundle_parts")`; `shapeBundle` parses `{written, copied}` |
| src/routes/api/i18n.$lang.ts (the bundle read) | `get_ui_bundle`; body `{lang, bundle: {key: value}}` | `get_ui_bundle_parts`; body `{lang, bundle: {written, copied}}` |
| src/features/admin/translations/translations-service.ts `fetchUiBundle` (the console) | `get_ui_bundle` | `get_ui_bundle_parts`, both parts joined (written over copied) |
| src/i18n/provider.tsx `applyWithBundle` | `{ ...base, ...bundle }` | `overlayBundle(base, bundle, shipped)` |

The app no longer reads `get_ui_bundle` (`rg` finds it only in src/lib/supabase-door.test.ts, a test of the door's URL shape that uses the name as a sample, and in the guard I18B-3's/I18B-5's "not read" assertions). `get_ui_bundle_version` is still read by the route as the validator's version.

## 4. The merge rule and its census

`overlayBundle(base, parts, shipped)` in src/i18n/bundle.ts:
- a written row always wins;
- a copied row applies only where `shipped` has no text for the key (own-property read, so `toString` and the like are never treated as text);
- a language the build does not ship (`shipped` empty) shows its copied rows.

`shipped` in the provider is the build's own text for the active language: for the base language, en-base plus its loaded layers; otherwise the compiled catalogue plus that language's loaded layer parts. English underneath a non-base language is not "shipped" text for it.

Census CF-I18N-OVERLAY (scripts/conformance/i18n-overlay.test.ts): in every non-test file under src/, a spread of a bundle part (`...x.written`, `...x.copied`) is refused. A file reading `fetchUiBundle` may not spread `bundle`, and an src/i18n reader must call `overlayBundle`. No allowlist. Planted cases: the old provider line `setMessages({ ...base, ...bundle })` (two findings), and a part spread. The scan reads 634 files with 0 findings.

## 5. The cache shape

- `uiBundleEtag(lang, version)` = `bundleEtag("parts1." + lang, version)` → `"parts1.am.<version>"`.
- A browser holding a flat answer sends `If-None-Match: "am.<version>"`. That tag no longer matches, so it gets a 200 with the parts (I18B-5).
- `bundleEtag` itself is unchanged, because src/routes/api/locations.$country.ts also uses it and its answer did not change shape.
- A flat or malformed body that still reaches the reader is refused by `shapeBundle` ("bundle is not the written/copied shape"). The provider logs it and keeps the compiled text (D3, F4), as OVB-7 and OVB-9 prove.

## 6. Tests added or changed

Added:
- src/i18n/overlay.test.ts OVB-1…11: the merge rules, flat and malformed refusal, a flat cached route answer keeps the compiled text, the rpc fallback reads the parts, and the shape-carrying ETag.
- src/routes/api/i18n.lang.test.ts I18B-5: a flat answer's tag is answered 200 with the parts.
- src/features/admin/translations/translations-service.test.ts TRS-B1: the console reads the parts and joins them.
- scripts/conformance/i18n-overlay.test.ts: the census and its planted cases.

Changed under G38 (old → new):
- I18B-1: ETag `"am.h1"` → `"parts1.am.h1"`; body `{lang, bundle: {"app.title": "T"}}` → `{lang, bundle: {written: {"app.title": "T"}, copied: {"app.x": "C"}}}`; the mock answers the parts.
- I18B-3: tags `"am.h1"` → `"parts1.am.h1"`; "bundle not read" names `get_ui_bundle_parts` instead of `get_ui_bundle`.
- e2e/i18n-bundle.spec.ts IB-1 and IB-2: `body.bundle[key]` → `body.bundle.copied[key]`. A row seeded by service insert has no 'save' or 'machine' revision, so it is copied.

admin_sync_ui_keys through the predicate: proven by the existing TR-40 (e2e/admin-translations-console.spec.ts). A copied am row follows the code; a row with a 'save' revision is kept. It is unchanged and was run.

Browser run: `bun run e2e:local -- e2e/i18n-bundle.spec.ts e2e/admin-translations-console.spec.ts e2e/admin-translations-data.spec.ts`, both projects, retries 0: **61 passed, 1 skipped** (6.0m). The browser binary was passed through `E2E_CHROMIUM_PATH`, as the browser guard's remedy names. e2e/admin-translations-governance.spec.ts was not run here; CI judges it.

## 7. Growth

| Measure | Size | Ceiling old → new | Cause |
| --- | --- | --- | --- |
| Entry JS | 208.9 KiB (S2: 208.7) | 210 (unchanged) | overlayBundle, shapeBundle, uiBundleEtag in the root language provider |
| Stylesheet | 22.5 KiB | 40 (unchanged) | none |
| /$name | 221.7 | 222 → 223 | the same, on every page |
| /admin/ | 210.7 | 211 → 212 | the same |
| /admin/listings | 356.7 | 357 → 358 | the same |
| /admin/listings_/$listingId_/edit | 403.7 | 404 → 405 | the same |
| /admin/roles_/$roleId | 309.8 | 310 → 311 | the same |

The five pages entered turn A's NEAR band on the first full run, and each was raised by `ceilingForLocal(size)` (local size + 0.1, then DEC-296's form), with its cause beside it in scripts/route-budgets.mjs. No page grew more than about 0.2 KiB. The exact per-page base sizes at b3e8dba2 were not measured separately.

## 8. Unit count

2,373 passed of 2,373, in 393 files.

## 9. Checks

The first full run gave `checks: 32 PASS · 2 FAIL · 21 NOT RUN · 977s`. The two FAILs were the first-paint budget and the NEAR band, the five pages above. After the raise, the whole run again:

`checks: 34 PASS · 0 FAIL · 21 NOT RUN · 929s`

## 10. K2

- src/routes/api/locations.$country.ts uses `bundleEtag` for a different answer. It is left unchanged on purpose; it is not a bypass.
- No other reader of the UI bundle was found.
- `get_ui_bundle` and `get_ui_bundle_version` remain in the database. Retiring them is the roadmap's new line (turn D2, INC-1023).

## 11. Limits

- The published site reads `get_ui_bundle` until this build is published.
- Not run here: e2e/admin-translations-governance.spec.ts and the staging job's failure body on b3e8dba2.

## 12. git diff --name-only b3e8dba2

```text
docs/_changelog.md
docs/features/i18n-runtime.md
docs/governance/briefs/foundations-turn-d2-strings.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-d2-strings.report.md
e2e/i18n-bundle.spec.ts
roadmap.md
scripts/conformance/i18n-overlay.test.ts
scripts/route-budgets.mjs
src/features/admin/translations/translations-service.test.ts
src/features/admin/translations/translations-service.ts
src/i18n/bundle.ts
src/i18n/overlay.test.ts
src/i18n/provider.tsx
src/routes/api/i18n.$lang.ts
src/routes/api/i18n.lang.test.ts
```
