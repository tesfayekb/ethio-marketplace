# Foundations turn 24 — completion report

Brief: docs/governance/briefs/foundations-turn-24.md (sha256 `82deddfcbf4f81bcb3387d1e4f31c9f8e5c6a2ddfaa132e8941bfd580979c1d8`, 91223 bytes). START (`git rev-parse HEAD`): `a5627d66472b44a080937fb68a27b6833ca6999d`. HEAD at report: `dbcef3699b3381f70136e9245fce98f88a6219e1` (platform saves move it).

## 1. Part A — CI first

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `a5627d66472b44a080937fb68a27b6833ca6999d` (short `a5627d6`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T16:42:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40211402692
```

e2e-last-failure.md: "last E2E run 40211402692 passed". guards-last-failure.md: "No failed build/guard jobs in this run." Nothing to fix.

## 2. STEP 0

Saved from the carrying message's text between BRIEF-BEGIN and BRIEF-END (markers excluded): `82deddfc…79c1d8`, 91223 bytes — equal to the message. roadmap.md line 3 and the turn-24 line written as given.

## 3. Done by part

- B1–B5 done (every EDIT applied with its OLD occurring once; route-budgets.mjs written from its FILE block).
- C5 landed first (red-first below), then C1–C4 done.
- D3's test edits landed first (red-first below), then D1, D2, D3's file and D4 done.
- E1–E3 done: schema-shape.ts = the HEADER + lines 816–875, a blank line, lines 906–953 of posting-service.ts at BASE (copied by a read-only script before the cut), then the import edit.
- F1–F5 done (F3 rows and F4 line copied from the brief's text).

## 4. The files (`git diff --name-only a5627d66…`)

AGENTS.md, docs/_changelog.md, docs/features/ci-guards.md, docs/features/performance-strategy.md, docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-24.md, docs/governance/mechanisms.md, e2e/ad-page.spec.ts, public/i18n-usage.json, roadmap.md, scripts/bundle-closure.mjs, scripts/bundle-closure.test.ts, scripts/check-bundle-size.mjs, scripts/conformance/kit-adoption-allowlist.txt, scripts/conformance/on-demand-imports-allowlist.txt, scripts/conformance/on-demand-imports.test.ts, scripts/route-budgets.mjs, src/components/shell/app-rail.tsx, src/components/shell/date-calendar.tsx, src/components/shell/date-field-offline.test.tsx, src/components/shell/date-field.test.tsx, src/components/shell/date-field.tsx, src/components/shell/use-category-glyphs.test.tsx, src/components/shell/use-category-glyphs.ts, src/features/ad-page/public-listing.ts, src/features/ad-page/similar-ads.test.tsx, src/features/ad-page/similar-ads.tsx, src/features/posting/map/leaflet.ts, src/features/posting/map/map-preview.tsx, src/features/posting/phone-parse.ts, src/features/posting/posting-service.ts, src/features/posting/schema-shape.ts, src/lib/load-once.test.ts, src/lib/load-once.ts, src/lib/use-near-viewport.test.tsx, src/lib/use-near-viewport.ts — plus this report.

`git ls-files --error-unmatch`: all 13 new files tracked (route-budgets.mjs, on-demand-imports.test.ts, on-demand-imports-allowlist.txt, load-once.ts/.test.ts, use-near-viewport.ts/.test.tsx, use-category-glyphs.ts/.test.tsx, date-calendar.tsx, date-field-offline.test.tsx, schema-shape.ts, the brief).

## 5. THE CHECKS — sha256 (every line equal to the brief)

```text
23fcc606c281deefd5e14cf4915bf1aed9de770ed00e131b7ae7deaa27518826  scripts/route-budgets.mjs
8ba5ae554263041a907a65cba31ef6fce0157bb5f24993deefd026b183f3bd12  src/lib/load-once.ts
ae77b930a7278efbfbaf4223347ae9d1d699702647f28f50c13723e0b850cc73  src/lib/load-once.test.ts
85799d5030784cd4c086ef627f5124edf55add4c14ddad8feb58b09c7cc36086  src/components/shell/use-category-glyphs.ts
29a40a0a6f8b4ccd2ec4415e7303debce722315a1651d20e691b0b78da69c5e9  src/components/shell/use-category-glyphs.test.tsx
7eda9591438198fc510af1fcf41483899e04e9aaf46bca81d73dc241f259f7e2  src/components/shell/date-calendar.tsx
940d2d5670e036dc3225ecf8b0acfc0050192532d794bc3d51d3d77be2bf61e3  src/components/shell/date-field-offline.test.tsx
81f1ac18b99181e320a0a1dac8784a8d3dd1e404e2e1133b3589c5e65943eab1  scripts/conformance/on-demand-imports.test.ts
2bc9dff347cf320a5a79cf2c6d713f119eef49f48e56256f2527d1e37eac2bf8  scripts/conformance/on-demand-imports-allowlist.txt
f261c663507dc9af49ca23d7e15d6ef7eb36268e69846e477110f9e84cb188c8  src/lib/use-near-viewport.ts
b68f0ebce566b9126d5e9e7a1438e9aacda38a31ad1f717dcb417c562214d8ad  src/lib/use-near-viewport.test.tsx
4324d40b4cce1e859f9c92f631416b252fc62cdc70e5faff429d740335360fbd  src/features/ad-page/similar-ads.tsx
c180f620d122eb3ef0bf50a111531122d3366bfb67988500bfa8782e52cb19a8  src/features/posting/schema-shape.ts
e0293082dc89dbc0d747fd62be28b92b6307e641a8087bccb1b77fa61ed73451  src/features/posting/posting-service.ts
1f3a1f00bf78e788859db5e942031a6f092f04211713ff92763dbec816b43a9c  scripts/bundle-closure.mjs
a2427749035fcd39f768eba4b7419fa9a086e55d6318859c67df76a093cce928  scripts/bundle-closure.test.ts
e502b585ec2220e48c780f655771ea84f92bb07093aa5d5ed2062edb49e12d5b  scripts/check-bundle-size.mjs
6077ca620ac4118523a2df37be26880bd5a0b1da261123653913c971ed04da20  scripts/conformance/kit-adoption-allowlist.txt
39ea0301e101dcadb46ac479c177ec28d4810e7c549184a3607643295703abdb  src/components/shell/app-rail.tsx
78d73379f9fc3e2d5a3f305060a3b1f38be4e928a42e47c4f8b422c11f0441ae  src/components/shell/date-field.tsx
dd71e90abb9b8cda1b0038b932cf058c6201455dc6b9d84a215d0328ce66fba8  src/components/shell/date-field.test.tsx
8105a207972b2f711e55c2382303e8eb15e548548d3f1a31576816e4e8132782  src/features/posting/map/map-preview.tsx
2cb134d47a85b5d316a33bdaaded56341923af17cd0cb28d70d89b88e4f07928  src/features/posting/map/leaflet.ts
33c22fa673c99d3a976ef36dbbd0dfddab4b4dd23dc650e716ccad8186a9dffa  src/features/posting/phone-parse.ts
ac755e96fceae04130ca2f26ddc99f631987235c56f6125a7f5c150c85438ec1  src/features/ad-page/public-listing.ts
ff65e6f02f5d9474e9cd3cada57d61c93a1687fe13c65fb54c5bce3b36ed78ff  src/features/ad-page/similar-ads.test.tsx
34cfa4edc49cd1e66ae48304f964540f059ed983b963a38ce38988f7b61db8c5  e2e/ad-page.spec.ts
952e3ca29079ff3006d1a790b5466e9ce60562a12facc169aeb88572ce3534b9  AGENTS.md
```

- `bun run lint`: ✖ 39 problems (0 errors, 39 warnings) — as expected.
- `bun run test:unit`: Test Files 2 failed | 287 passed (289); Tests 2 failed | 1812 passed | 6 skipped (1820); 299.68s. Failures: EXH-11 (5306ms) and EXH-17 (6451ms) — INC-890 sandbox timeouts; and the date-field.test.tsx suite's `beforeAll` (`await import("./date-calendar")`) "Hook timed out in 10000ms" under the full suite's load (its 5 tests skipped). See limits.
- Named lines (targeted verbose run of the touched files: Tests 31 passed (31)):

```text
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mthe entry's static import closure (DEC-176)[2m > [22mBC-1 static imports and re-e
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mthe entry's static import closure (DEC-176)[2m > [22mBC-2 the closure follows imp
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mthe entry's static import closure (DEC-176)[2m > [22mBC-3 an import of a chunk th
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mthe entry's static import closure (DEC-176)[2m > [22mBC-4 the entries are the ind
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mthe entry's static import closure (DEC-176)[2m > [22mBC-5 a must-stay-lazy chunk 
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-6 a page preloads its own chunks a
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-7 the pages are every route but th
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-8 the manifest module is read from
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-9 pages within their ceilings pass
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-10 a page over its ceiling fails, 
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-11 a page with no ceiling fails, a
 [32m✓[39m scripts/bundle-closure.test.ts[2m > [22mevery page's first download (D234)[2m > [22mBC-12 a public page holding a must-st
 [32m✓[39m src/lib/use-near-viewport.test.tsx[2m > [22museNearViewport (D234)[2m > [22mNV-1 waits until its box nears the screen, th
 [32m✓[39m src/lib/use-near-viewport.test.tsx[2m > [22museNearViewport (D234)[2m > [22mNV-2 a surface that wants its work now (enabl
 [32m✓[39m src/lib/use-near-viewport.test.tsx[2m > [22museNearViewport (D234)[2m > [22mNV-3 without IntersectionObserver the work is
 [32m✓[39m src/lib/load-once.test.ts[2m > [22mloadOnce (D234)[2m > [22mLO-1 one download serves every ask; the value is ready once i
 [32m✓[39m src/lib/load-once.test.ts[2m > [22mloadOnce (D234)[2m > [22mLO-2 a failed download is forgotten: the next ask tries again
 [32m✓[39m src/components/shell/use-category-glyphs.test.tsx[2m > [22museCategoryGlyphs (D234)[2m > [22mGLY-1 a first reader starts 
 [32m✓[39m src/components/shell/use-category-glyphs.test.tsx[2m > [22museCategoryGlyphs (D234)[2m > [22mGLY-2 a later reader reads t
 [32m✓[39m src/components/shell/date-field-offline.test.tsx[2m > [22mDateField offline (D234)[2m > [22mDF-6 a calendar that cannot d
 [32m✓[39m src/features/ad-page/similar-ads.test.tsx[2m > [22mSIM-4 the similar-ads section[2m > [22mdraws nothing while loading and
 [32m✓[39m src/features/ad-page/similar-ads.test.tsx[2m > [22mSIM-4 the similar-ads section[2m > [22mdraws the heading and one card 
 [32m✓[39m src/features/ad-page/similar-ads.test.tsx[2m > [22mSIM-5 the similar-ads read waits for its place to near the screen[2m > 
[22m[39m[OD-1] on-demand imports outside loadOnce: 15; allowlist: 7
 [32m✓[39m scripts/conformance/on-demand-imports.test.ts[2m > [22mon-demand module loading (D234, INC-897)[2m > [22mOD-1 every brows
 [32m✓[39m scripts/conformance/on-demand-imports.test.ts[2m > [22mon-demand module loading (D234, INC-897)[2m > [22mOD-2 the census 
 [32m✓[39m scripts/conformance/on-demand-imports.test.ts[2m > [22mon-demand module loading (D234, INC-897)[2m > [22mOD-3 the bypasse
 [32m✓[39m src/components/shell/date-field.test.tsx[2m > [22mDateField (INC-549)[2m > [22mDF-1 a day after the latest bound is disab
 [32m✓[39m src/components/shell/date-field.test.tsx[2m > [22mDateField (INC-549)[2m > [22mDF-2 a day before the earliest bound is di
 [32m✓[39m src/components/shell/date-field.test.tsx[2m > [22mDateField (INC-549)[2m > [22mDF-3 choosing a day writes it as YYYY-MM-D
 [32m✓[39m src/components/shell/date-field.test.tsx[2m > [22mDateField (INC-549)[2m > [22mDF-4 the month is named in the page's lang
 [32m✓[39m src/components/shell/date-field.test.tsx[2m > [22mDateField (INC-549)[2m > [22mDF-5 a calendar day survives the round tri
[2m      Tests [22m [1m[32m31 passed[39m[22m[90m (31)[39m
```

- /tmp/observability/build-errors.log: every entry this turn "build OK"; no `error TS` line.
- `bun run i18n:usage`: 1736 keys across 569 files (395 dynamic call sites); no key changed. The maps moved only by the scanned file count (new files), regenerated by the map guard and committed (A6).
- `bun run format:check`: clean (run last).

## 6. Red-first

- OD-1 at the start of Part C: `[OD-1] on-demand imports outside loadOnce: 18; allowlist: 7`, findings exactly `src/features/posting/map/leaflet.ts:35`, `:36`, `src/features/posting/phone-parse.ts:30` (× OD-1; OD-2/OD-3 ✓). After C4: 15; allowlist 7; ✓.
- SIM-4/SIM-5 against similar-ads.tsx at START: `× draws nothing while loading and nothing when the answer is empty`, `× reads nothing until the anchor nears the screen, then reads once`, Tests 2 failed | 1 passed (3). After D3: passing.

## 7. THE END-TO-END CHECK (`bun run e2e:local`, both projects, 2 workers, fake, 0 retries)

- ad-page `--grep "AP-32 |AP-39 |AP-43 |AP-44 "`: 8 passed (1.6m); `[ssr-error]` 0.
- shell `--grep "leading icon on one gutter|DISTINCT icons|collapses to icons"`: 3 skipped, 3 passed (21.1s) — the three run on desktop-1280; mobile-360 skips them by the spec's own rule (the rail is a desktop surface); `[ssr-error]` 0.
- admin-audit `--grep "AS-3 "`: 2 passed (25.5s); `[ssr-error]` 0.

## 8. K2

Browser dynamic imports outside loadOnce after this turn (= the allowlist's 7 files, 15 sites): src/components/shell/breadcrumbs.tsx:44, :47, :51, :54; src/features/posting/preview/listing-detail.tsx:42, :45, :377; src/features/posting/step-where.tsx:49, :51; src/i18n/compiled-catalog.ts:13, :22, :23; src/features/admin-categories/category-images-service.ts:107; src/routes/legal.publishing.tsx:50; src/routes/post_.$listingId.tsx:31.

useEffect on the public pages that read data or load a library for something below the first screen: src/features/ad-page/similar-ads.tsx:40 (now behind useNearViewport); src/features/posting/map/map-preview.tsx effect (now behind useNearViewport for the buyer); src/components/marketplace/feed.tsx:100 and src/features/seller/seller-page.tsx:27 (their own infinite-scroll sentinels, unchanged); src/routes/l.$slug.tsx:112 (saved state read — near the top, not below the fold), :162 (no read), :169 (countView write on mount — not a below-the-fold block); src/features/ad-page/share-ad.tsx:78 (runs only when the sheet opens); src/features/feed/use-feed.ts:66 and src/features/seller/use-seller-feed.ts:114 (the first screen's own feed). Guard debt for concern 3 carried as the brief says.

Raw `<button>` left in files this turn touches (INC-899, unchanged): src/components/shell/date-field.tsx:119, :139 (the field and its clear control; :80/:98 at BASE); src/components/shell/app-rail.tsx:372, :463, :792.

## 9. Departures

- None from the exact text. The first ad-page E2E invocation stopped at the i18n map guard (maps stale by file count) and the second at the browser guard (pinned browser missing); the third used `E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` as the brief allows. No test ran in the first two.
- STEP 0 copy was made by a script from the carrying message's saved text, not by hand, so every FILE/EDIT/HEADER block was copied byte for byte (THE CHECKS confirm).

## 10. Limits

- INC-890: `× EXH-11 refuses a red check … 5306ms`; `× EXH-17 when the session's git refuses dev and hold/* … 6451ms` — untouched.
- date-field.test.tsx: under the whole suite its `beforeAll` import of date-calendar exceeded vitest's 10s hook limit (sandbox contention; environment time 2782s). Run alone the file passes 5/5 and the brief's exact text forbids editing it; CI judges it on the final commit. If CI also times out, the hook needs a timeout argument — a brief change.
- The per-page guard itself (check-bundle-size.mjs over the real build) was not run here (no manual build rule); its logic is proven by BC-6…BC-12; CI's bundle-budget job prints every page's line.

## 11. Five lenses

As the brief states; no data path changed (schema-shape.ts moved byte for byte, posting-service.ts sha equal).

## 12. CI wait

After the final commit the turn ends; the supervisor reads the run. Last readable ci-status.md names a5627d66 (above).
