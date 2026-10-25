# Foundations turn 25 — completion report

Brief: docs/governance/briefs/foundations-turn-25.md (sha256 2db9be03434ec1a88395fd38121e2f231e18a24cac2333e340fd1b168893ca5d, 49397 bytes — matched the carrying message).

## 1. Start
<START> = f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97 (equals BASE).

## 2. Part A — CI
```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `f3fc6f79df37ebf06ebfbd65e4a1b2a83b789e97` (short `f3fc6f7`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T18:01:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40217525625
```
e2e-last-failure.md: "last E2E run 40217525625 passed"; guards-last-failure.md: "No failed build/guard jobs in this run." Nothing to fix. A2 applied (date-field.test.tsx warm-up hook 30 s).

## 3. Done by part
- A1 done; A2 done.
- STEP 0 done: brief saved, sha256 and 49397 bytes matched; roadmap line 3 and the turn-25 line written.
- B0–B6 done (all blocks copied by script from the saved brief, never retyped).
- C1–C2 done.
- D1–D4 done (performance-strategy §8, ci-guards D234 section, mechanisms rows 43/44, changelog, roadmap tick).

## 4. Files (git diff --name-only <START>)
docs/_changelog.md, docs/features/ci-guards.md, docs/features/performance-strategy.md, docs/governance/briefs/foundations-turn-25.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-25.report.md, e2e/ad-page.spec.ts, roadmap.md, scripts/conformance/photo-signing-allowlist.txt, scripts/conformance/photo-signing.test.ts, src/components/shell/date-field.test.tsx, src/features/admin-categories/category-image-variants.test.ts, src/features/admin-categories/category-image-variants.ts, src/features/admin-categories/category-images-service.ts, src/features/posting/preview/listing-detail.tsx, src/features/posting/preview/photo-gallery.tsx, src/features/posting/use-photo-links.test.ts, src/features/posting/use-photo-links.ts, src/routes/l.$slug.tsx, src/routes/l.photo.test.ts, src/server/ad-page.test.ts, src/server/ad-page.ts, src/server/ad-photo.ts, src/server/media/links.test.ts, src/server/media/links.ts. i18n maps unchanged.

## 5. THE CHECKS — sha256 (all equal to the brief)
```text
adca82304e7a46c742a93134f65580eb7ba67227a79f571ad63fe8e7fe149a55  scripts/conformance/photo-signing.test.ts
671114c80cde19e7fa72dae0554a18a98a3ebf289e343dabf88db957a4e8ed5d  scripts/conformance/photo-signing-allowlist.txt
930531c3d52fe575e3f4c68bcde2e38b740c9914b1996986f45396ef9379a302  src/server/ad-page.test.ts
2c09a270d21108dd51a008a7fcf59589be015c6c99da1208a645b07d94c86656  src/components/shell/date-field.test.tsx
8762c8fd98463c15317337ae60116d1ade97cb57c92f02dbfd53374abe9e8533  src/server/media/links.ts
e52dceb0368a160eb5407a3ac3b1949cb3eecfbfbadb53ec35bb371561c1d29e  src/server/media/links.test.ts
1455d04cfed46589e7802962e0fae7d5d57b3697e07d0b0fd0cd6541f71eec51  src/server/ad-page.ts
2c0a1d07c556a434f4858868c4ac44190e81d44e71ad310bbf44139951dc8de7  src/features/posting/use-photo-links.test.ts
8ce6acfa6bd4724d22c1b87c8a1cdfce3134d205c878172fa155cfaa410de641  src/features/posting/use-photo-links.ts
bd8589e1d3cdc02ed88c842c1ed1cd6de7eb848f0dba6490b07d9cdd68224c50  src/routes/l.$slug.tsx
fe7cfeeb146950b9b4bfaa174c023d5eaa1723b0cbfdb9df49db690961dedfa7  src/features/posting/preview/listing-detail.tsx
41c5c799c1deb6454f3aae2a8e7526ede28a34893231b02695e194025e0aefec  src/features/posting/preview/photo-gallery.tsx
951b41ab89596e8ec517530819726feeb70bd7d9eb7746d88ef26a33ff6aac79  src/server/ad-photo.ts
86c4fdbe6b6313891fde5da1b9ae59bbddc725b8d960fcfab6d8f553dafeaa21  src/routes/l.photo.test.ts
fa7805a8b80b8a0961eb990076c7bb6e0d023221b5849b557ec5f90d0ae0a911  e2e/ad-page.spec.ts
349ed8ad53f0101a6a2f5f1f775ae74abe3a6b7229e23996ceeff39f8f74d862  src/features/admin-categories/category-image-variants.ts
be2555c41b3a9b165a34acef7d9d75f2078dd2cc6d6bb37fbd125e9101b53e16  src/features/admin-categories/category-image-variants.test.ts
aab7b297db44f4c4eea0740b8eae1f3ca2fb5641bcda742d4d5d01f6a31de3e1  src/features/admin-categories/category-images-service.ts
```

## 6. Red-first
- SIGN-1 (B0 alone): `[SIGN-1] direct signing outside the signer: 3; allowlist: 2` — finding `src/server/ad-photo.ts:38 signs photo links directly (signPhotoRows)`, nothing else; after B5: `direct signing outside the signer: 2; allowlist: 2`, passed.
- UPL-4 (test edit alone): `× UPL-4 preset links are the answer at once, and nothing is asked` — Tests 1 failed | 4 passed (5); after use-photo-links.ts: 5 passed.

## 7. Checks
- lint: ✖ 39 problems (0 errors, 39 warnings).
- test:unit: Test Files 1 failed | 290 passed (291); Tests 1 failed | 1827 passed | 1 skipped (1829). SIGN-1, SIGN-2, LK-1…LK-6, ADP-1…ADP-3, UPL-1…UPL-5, PHR-1…PHR-4, CIV-1 all passed.
- build-errors.log: "=== build 2026-10-25T18:08:31Z === build OK"; no `error TS` line.
- i18n:usage: 1736 keys across 569 files (395 dynamic call sites); maps unchanged.
- format:check: run last (clean).

## 8. End-to-end
- e2e/ad-page.spec.ts --grep "AP-9 |AP-19 |AP-49 |AP-51 |AP-52 ": 10 passed (1.6m); [ssr-error] 0.
- e2e/admin-categories-images.spec.ts --grep "CI-4 ": 2 passed (35.9s); [ssr-error] 0.

## 9. K2
- Direct signing outside links.ts/storage.ts (equals the allowlist): src/routes/api/listings/assist.ts:119, src/routes/api/listings/background.ts:170.
- Ad-page images: photo-gallery.tsx:147 main (loading eager, fetchpriority high); photo-gallery.tsx:290 thumbs (loading lazy, no fetchpriority); photo-gallery.tsx:382 viewer (no loading attribute, no fetchpriority); listing-detail.tsx:652 ListingPicture with priority → listing-picture.tsx:163 (:169 eager, :170 high when priority).
- Raw <button> left in touched files (INC-899, not touched): photo-gallery.tsx:129, :184, :194, :279, :367, :394, :404.

## 10. Limits
- EXH-17 (INC-890): "FAIL scripts/conformance/executor-hooks.test.ts > the landing door (land.ts) > EXH-17 … — Error: Test timed out in 5000ms." Not changed.
- A first E2E start was killed by my own process cleanup before any test ran (no log); the run was then made once, whole.

## 11. Departures
None from the brief's text.

## 12. CI
Last readable ci-status.md names f3fc6f79 (above); the run on the final commit is the supervisor's to judge. HEAD at report: 2891b775.
