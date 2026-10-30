# Foundations turn R1d-c — report (with continuation R1d-c-2)

## Step 0
- foundations-turn-r1d-c.md: sha256 `a51d551ac9bfde6cc587dce7b1ab4a99d1f49df2d7dca36c2d351ce88ffc6f5e` (matches).
- foundations-turn-r1d-c-2.md: sha256 `238d1513d25b21dfac9405f596a0b388619ac393642252b98547f0e41fc523d2` (matches). Roadmap line 3 names both files.

## CI
- `22f5151f` run 41073847634: **FAILURE**, three reds, classified:
  1. Build, typecheck, lint — four prettier errors in scripts/conformance/shell-bands.test.ts (R1d-c's guard file; `format:check` does not cover scripts/, lint does). Fixed: file formatted.
  2. First-paint bundle budget — expected (this stop). Fixed by Ruling 1 below.
  3. Lane 11, `category-nav.spec.ts` › C-8 (desktop-1280): expected no `aria-current` in the rail on "/", but D259's Home row is current there — a test R1d-c owed a G38 re-read. Changed: exactly one current row, and it is `rail-home`. Whole file both projects: 10 passed, 0 failed.
- INC-1013's proof: CI's repeat lane on this push (Ruling 2); no local repeat run.
- INC-1014: open, 1 run in 10, cause unknown; no allowlist line (Ruling 3).

## Ruling 1 — what moved
- **a. Ready mark in one place.** src/router.tsx sets `data-app-ready` itself on the router's first `onRendered` (fired from committed React effects, so after hydration), one macrotask later so its own scroll restoration finishes first. The custom window event, the `routerSettled` dataset flag and __root's listener are gone; src/lib/router-settled.ts deleted (declared in docs/tracking/intentional-deletions.txt).
- **b. MenuNav's panel rows on demand.** The row builder (`byId` index + `itemsOf`) left app-rail.tsx; `navLevelOf(items, id, rules)` lives in src/components/ui/submenu-impl.tsx (loaded through the overlay loader when a panel opens). MenuNav passes its own current-item and page rules, so nothing is copied. SMN-E11, SMN-E12, ROWS-E2, A-5, A-6, A-7, IN-1 unchanged and green.
- **c.** Nothing else moved: the remaining R1d-c code (Home row, strip back item, level store, band row, current-item rule) paints on first load or decides first-paint marking.
- **d/e. Growth (fa5c333f → now, local gzip KiB, after the trims).** Every page +0.78–0.80 KiB, all in the shared entry chunk from the causes DEC-302 names; no other cause. 16 ceilings raised by DEC-296's rule (14 over/NEAR found by the size script, plus /admin/coverage and /auth_/callback named by the checks' NEAR band); no other ceiling moved.

| Page | fa5c333f | now | growth | ceiling |
| --- | --- | --- | --- | --- |
| `/` | 221.0039 | 221.8008 | +0.7969 | 223 (was 222) |
| `/$name` | 219.6768 | 220.4727 | +0.7959 | 221 (unchanged) |
| `/account` | 267.5176 | 268.3125 | +0.7949 | 269 (unchanged) |
| `/account_/legal` | 209.4727 | 210.2666 | +0.7939 | 211 (unchanged) |
| `/account_/legal_/$versionId` | 210.1523 | 210.9473 | +0.7950 | 212 (was 211) |
| `/account_/saved` | 219.7646 | 220.5596 | +0.7950 | 221 (unchanged) |
| `/admin` | 207.8252 | 208.6172 | +0.7920 | 209 (unchanged) |
| `/admin/` | 208.6660 | 209.4570 | +0.7910 | 210 (unchanged) |
| `/admin/ai` | 335.3027 | 336.0928 | +0.7901 | 337 (unchanged) |
| `/admin/attributes` | 348.5410 | 349.3340 | +0.7930 | 350 (unchanged) |
| `/admin/audit` | 308.4189 | 309.2109 | +0.7920 | 310 (unchanged) |
| `/admin/categories` | 356.7969 | 357.5879 | +0.7910 | 358 (unchanged) |
| `/admin/countries` | 338.3076 | 339.1035 | +0.7959 | 340 (unchanged) |
| `/admin/coverage` | 330.8906 | 331.6875 | +0.7969 | 333 (was 332) |
| `/admin/images` | 208.4736 | 209.2646 | +0.7910 | 210 (unchanged) |
| `/admin/impersonation_/$sessionId` | 309.0479 | 309.8408 | +0.7929 | 311 (was 310) |
| `/admin/legal` | 278.0781 | 278.8691 | +0.7910 | 280 (was 279) |
| `/admin/legal_/$versionId` | 277.3721 | 278.1631 | +0.7910 | 279 (unchanged) |
| `/admin/legal_/edit` | 282.9268 | 283.7158 | +0.7890 | 285 (was 284) |
| `/admin/listings` | 354.7139 | 355.5078 | +0.7939 | 356 (unchanged) |
| `/admin/listings_/$listingId` | 379.7764 | 380.5664 | +0.7900 | 381 (unchanged) |
| `/admin/listings_/$listingId_/edit` | 401.7021 | 402.5039 | +0.8018 | 403 (unchanged) |
| `/admin/locations` | 269.4541 | 270.2461 | +0.7920 | 271 (unchanged) |
| `/admin/places` | 339.6396 | 340.4375 | +0.7979 | 341 (unchanged) |
| `/admin/roles` | 306.0107 | 306.8018 | +0.7911 | 308 (was 307) |
| `/admin/roles_/$roleId` | 307.7725 | 308.5664 | +0.7939 | 309 (unchanged) |
| `/admin/screening` | 380.0234 | 380.8047 | +0.7813 | 382 (was 381) |
| `/admin/translations` | 412.4453 | 413.2334 | +0.7881 | 414 (unchanged) |
| `/admin/translations_/$lang` | 321.2383 | 322.0283 | +0.7900 | 323 (unchanged) |
| `/admin/users` | 305.0088 | 305.7998 | +0.7910 | 307 (was 306) |
| `/admin/users_/$userId` | 285.3408 | 286.1338 | +0.7930 | 287 (unchanged) |
| `/auth` | 219.5186 | 220.3125 | +0.7939 | 221 (unchanged) |
| `/auth_/callback` | 207.8623 | 208.6563 | +0.7940 | 210 (was 209) |
| `/auth_/reset` | 209.9307 | 210.7227 | +0.7920 | 212 (was 211) |
| `/c/$slug` | 221.0039 | 221.8008 | +0.7969 | 223 (was 222) |
| `/dev/primitives` | 222.7568 | 223.5488 | +0.7920 | 224 (unchanged) |
| `/dev/style` | 241.8438 | 242.6348 | +0.7910 | 243 (unchanged) |
| `/dev/tall` | 207.1846 | 207.9785 | +0.7939 | 209 (was 208) |
| `/l/$slug` | 250.5723 | 251.3662 | +0.7939 | 252 (unchanged) |
| `/legal/$kind` | 211.5254 | 212.3223 | +0.7969 | 213 (unchanged) |
| `/legal/accept` | 218.4434 | 219.2373 | +0.7939 | 220 (unchanged) |
| `/legal/publishing` | 212.2861 | 213.0820 | +0.7959 | 214 (unchanged) |
| `/my-listings` | 328.1963 | 328.9873 | +0.7910 | 330 (unchanged) |
| `/my-listings_/$listingId` | 317.3652 | 318.1514 | +0.7862 | 319 (unchanged) |
| `/my-listings_/$listingId_/edit` | 396.1904 | 396.9932 | +0.8028 | 398 (unchanged) |
| `/post` | 396.1494 | 396.9541 | +0.8047 | 398 (was 397) |
| `/post_/$listingId` | 396.1162 | 396.9199 | +0.8037 | 398 (was 397) |
| `/privacy` | 211.5195 | 212.3154 | +0.7959 | 213 (unchanged) |
| `/settings` | 271.1387 | 271.9307 | +0.7920 | 273 (was 272) |
| `/terms` | 211.5156 | 212.3115 | +0.7959 | 213 (unchanged) |

## Census (this continuation)
- Files: src/router.tsx, src/routes/__root.tsx, src/lib/router-settled.ts (deleted), src/components/shell/app-rail.tsx, src/components/ui/submenu-impl.tsx, scripts/route-budgets.mjs, scripts/conformance/shell-bands.test.ts (format), e2e/category-nav.spec.ts (C-8), docs/tracking/intentional-deletions.txt, roadmap.md, the brief and this report.
- Tests run: submenu.spec.ts + menu-rows.spec.ts + admin-shell.spec.ts whole, both projects, retries 0: 22 passed, 10 skipped, 0 failed; shell.spec.ts whole: 165 passed, 69 skipped, 0 failed; category-nav.spec.ts whole: 10 passed, 0 failed.

## Unit count and checks
- Unit suite: 386 files, 2,297 / 2,297 tests passed.
- `bun run checks` on the final tree, run whole: `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 1479s`.

## K2
- The strip's back item is named by the menu's "‹" row's own words (parent name or "Main Menu"); no new string (Ruling 4).
- Phone footer's three equal columns stay; D257 is from 768 px.
- RTL verified by dir="rtl".
- src/features/admin-locations/location-form-fields.tsx:160 `md:w-56` stays outside CF-WIDTH-1.
- `format:check` does not cover scripts/**, so a prettier slip there shows only in lint (how shell-bands.test.ts reached CI red).
- AAN-1 (scripts/conformance/auth-answers.test.ts) timed out at 5 s once under a parallel local vitest run; green inside the checks.

## git diff --name-only fa5c333f
```text
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-r1d-c-2.md
docs/governance/briefs/foundations-turn-r1d-c.md
docs/governance/reports/foundations-turn-r1d-c.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/admin-shell.spec.ts
e2e/category-nav.spec.ts
e2e/menu-rows.spec.ts
e2e/shell-bands.spec.ts
e2e/shell.spec.ts
e2e/submenu-look.spec.ts
e2e/submenu.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/layout-reads-allowlist.txt
scripts/conformance/menu-rows-allowlist.txt
scripts/conformance/shell-bands.test.ts
scripts/conformance/submenu-allowlist.txt
scripts/conformance/submenu.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/app-footer.tsx
src/components/shell/app-header.tsx
src/components/shell/app-rail.tsx
src/components/shell/band-row.ts
src/components/shell/bar-spacing.ts
src/components/shell/location-selector.tsx
src/components/shell/menu-current.test.ts
src/components/shell/menu-current.ts
src/components/shell/menu-level.ts
src/components/shell/panel-header.tsx
src/components/shell/panel-tabs.tsx
src/components/shell/rail-first-paint.test.tsx
src/components/ui/submenu-impl.tsx
src/router.tsx
src/routes/__root.tsx
docs/governance/reports/foundations-turn-r1d-c.report.md
```
