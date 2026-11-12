# Housekeeping turn 1 of 4 — the local checks tell a machine limit from a defect; the lint set comes clean and stays clean; a GO is checked by a script — report

Base: 2b11a9d29 · Final commit: 55a296384 · Brief: docs/governance/briefs/housekeeping-1.md (sha256 87262da339cd0c744e51510d5a0628f3650ca18ca770f8bd3779908e9922eb20)
Review: READY · 0 BLOCKER · 0 MAJOR · 5 MINOR · on 55a2963

CI: the base 2b11a9d29 — run 42733115280, SUCCESS. The final code commit 55a296384 — run 42810138275,
SUCCESS: every check green (41; Promote skipped, dev only). §11.

## 1. Done / not done, by part and step

| step / part | state | commits |
|---|---|---|
| STEP 0 — brief saved (sha256 equal), roadmap line 3 | done | 9de34f26c |
| STEP 1 — the census (PLAN FIRST) | done, stop 1 | 129f9360d; ruling 1 6877c3077 |
| Part A + D — the platform reader, `--no-tests`, NH-6 / NH-7, the NEAR note (DEC-361) | done | b0afddb79; stop 2 5c989b946; ruling 2 07b536841 |
| Part C — `briefs.test.ts` (CF-BRIEF-1 → 4) | done | 65e49a0ce; stop 3 ff2aa39f1; ruling 3 1a4cb619c |
| Part B — the lint set clean, `--max-warnings 0` | done (the i18n split reverted, ruling 4) | 2b5f7dc6f, f1bbb43d1; stop 4 bd095897c; ruling 4 8a81039a7; 64f80cf60 |
| STEP 6 — `bun run checks` whole | done; its first run's FAIL was stop 5 | stop 5 806868ded; ruling 5 fda89e9f4; a6cd6fdbd |
| Part A's guides (my miss, §10) | done | 55a296384 |
| STEP 7 — push, pull request #34, CI | pushed 55a296384; the pull request stays a draft (ruling 4) | — |
| STEP 8 — this report | done | the report commit |

Not done: nothing the brief or rulings 1 → 5 asked. Left to later turns by ruling: INC-1095 (29
hidden `exhaustive-deps` sites), the i18n split (turn 1b, INC-1097), the refusal readers (F2 wave 1),
the harness helpers named `use…` (turn 2).

## 2. Files changed

`git diff --name-only 2b11a9d29` (137 paths; this report included):

```
docs/features/ci-status-reporter.md
docs/features/nightly-e2e.md
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1-ruling-2.md
docs/governance/briefs/housekeeping-1-ruling-3.md
docs/governance/briefs/housekeeping-1-ruling-4.md
docs/governance/briefs/housekeeping-1-ruling-5.md
docs/governance/briefs/housekeeping-1.md
docs/governance/reports/housekeeping-1.report.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
docs/governance/reports/housekeeping-1.stop-3.md
docs/governance/reports/housekeeping-1.stop-4.md
docs/governance/reports/housekeeping-1.stop-5.md
docs/tracking/intentional-deletions.txt
e2e/i18n-sign-in-language.spec.ts
package.json
public/i18n-usage.json
roadmap.md
scripts/ci/checks-cache.ts
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/choice-lists.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/press.test.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/marketplace/feed.tsx
src/components/picker-popup.ts
src/components/searchable-picker.test.tsx
src/components/searchable-picker.tsx
src/components/shell/app-rail.tsx
src/components/shell/block-guide.tsx
src/components/shell/data-table.tsx
src/components/shell/favourite-category.ts
src/components/shell/rail-first-paint.test.tsx
src/components/shell/rail-variant.ts
src/components/shell/submenu/submenu-signal.ts
src/components/shell/theme-toggle.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/badge.tsx
src/components/ui/button-variants.ts
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/choice-list-look.test.tsx
src/components/ui/dialog-look.test.tsx
src/components/ui/form.tsx
src/components/ui/keep-in-strip.ts
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/components/ui/overlay-ask.ts
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/pagination.tsx
src/components/ui/section-notice-state.ts
src/components/ui/section-notice.tsx
src/components/ui/slot-split.ts
src/components/ui/strip-arrows.tsx
src/components/ui/submenu-impl.tsx
src/components/ui/submenu-levels.ts
src/components/ui/toggle-group.tsx
src/components/ui/toggle-variants.ts
src/components/ui/toggle.tsx
src/features/ad-page/share-ad.tsx
src/features/ad-page/share-price-text.ts
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/attribute-error.ts
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-form-fields.tsx
src/features/admin-categories/category-form-values.ts
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-categories/category-submit-error.ts
src/features/admin-countries/country-dialog-state.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-editor.tsx
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-listings/edit-listing.ts
src/features/admin-locations/location-dialog-state.ts
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-editor.tsx
src/features/admin-locations/location-form-fields.tsx
src/features/admin-locations/location-form-values.ts
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/admin/admin-context.tsx
src/features/admin/admin-shell-provider.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/amount-scale.ts
src/features/posting/edit-step-changes.ts
src/features/posting/field-refusals.ts
src/features/posting/field.test.ts
src/features/posting/field.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/map-snap.ts
src/features/posting/map/outline.test.ts
src/features/posting/phone-number-field.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-section.ts
src/features/posting/preview/photo-gallery.tsx
src/features/posting/same-channels.test.ts
src/features/posting/same-channels.ts
src/features/posting/spec-sentences.ts
src/features/posting/step-details.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-review.tsx
src/features/posting/step-specifications.test.ts
src/features/posting/step-specifications.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/features/posting/wizard.tsx
src/i18n/provider.tsx
src/providers/theme-context.ts
src/providers/theme-provider.tsx
src/routes/admin.tsx
src/routes/l.$slug.tsx
src/test/own-key-sites.test.ts
```

New files (39 before this report): `git ls-files --error-unmatch` over `git diff --name-only
--diff-filter=A 2b11a9d29` printed all 39, and this report makes 40. No file of the base is deleted
(`--diff-filter=D`: 0). `src/i18n/i18n-context.ts` was created at 2b5f7dc6f and removed at 64f80cf60
(ruling 4), declared in that commit (`[intentional-delete]`) and in
`docs/tracking/intentional-deletions.txt`.

The one spec file, comment-only (ruling 1 Q12), `git diff 2b11a9d29 HEAD -- e2e/`:

```
@@ -190,7 +190,6 @@ test.describe("D239 — the account's language at sign-in", () => {
     "D239-E6 impersonation leaves the staff member's own language as it was, at start and at end",
     { tag: "@private-identity" },
     async ({ page }) => {
-      // eslint-disable-next-line react-hooks/rules-of-hooks -- a harness helper, not a React hook
       const { secret, user: staff } = await useJobSuperAdmin(page);
```

Untouched, as ruling 1 required: `git diff --stat 2b11a9d29..HEAD -- scripts/check-bundle-size.mjs
scripts/budget-band.mjs .github eslint.config.js scripts/ci/turn-checks-allowlist.txt` prints
nothing.

## 3. Behaviour contract — answer tables before → after

**`bun run checks` (scripts/ci/turn-checks.ts)**

| case | base | now |
|---|---|---|
| a pinned binary built for another machine (actionlint, gitleaks on darwin/arm64) | FAIL ("exec format error") | NOT RUN `pinned binary linux/x64 (<asset>); this machine darwin/arm64`, before any download |
| a pinned asset whose name the reader cannot classify | runs | NOT RUN `pinned asset platform unknown: <name>` |
| `--no-tests` | not an argument | every vitest / playwright step NOT RUN `--no-tests`; the last line ends `· --no-tests (the laws and the unit tests not run)` |
| any other argument | ignored | refused, exit 2 |
| the budget step failing only by the NEAR band | FAIL (and R4 asked for a raise) | PASS, one NOTE per NEAR page (DEC-361) |
| the budget step with any other failure | FAIL | FAIL (unchanged) |
| R4's band | its own `NEAR_KIB` and a raw compare | budget-band.mjs's `NEAR_KIB` and `judgedSize` |
| the brief in force (roadmap line 3) | read by its own copy in turn-checks.ts | read by `briefInForce` (laws-changed.ts), the one reader |

**The laws step's Semgrep on changed files (scripts/ci/laws-changed.ts; ruling 5)**

| case | base | now |
|---|---|---|
| where CI's pinned rules are kept | `/tmp/semgrep-rules-<sha>` | `<cache root>/semgrep-rules-<sha>` (`ETHIO_CHECKS_CACHE ?? ~/.cache/ethio-checks`, from `scripts/ci/checks-cache.ts`) |
| where its venv is kept | `/tmp/semgrep-<version>` | `<cache root>/semgrep-<version>` |
| a rules folder whose files the machine swept (folders left, no file) | treated as cached: Semgrep runs with no rules, exit 7 "No config given", a FAIL | `semgrepRulesWhole` false: the folder is removed and the pinned archive fetched again |
| the runner's own cache root (logs, base builds, its own Semgrep venv) | `turn-checks.ts`'s private `CACHE` | the same value, imported from `checks-cache.ts` |

**scripts/ci/nightly-hour.sh and its tests**

| case | base | now |
|---|---|---|
| a zone that does not resolve | `::error title=nightly-hour::the America/New_York time zone does not resolve …` whatever the zone | names the zone it used (`${ZONE}`, ruling 1 Q2) |
| NH-6 (`TZDIR` emptied) | runs everywhere; FAILs on macOS | runs on Linux only (`it.runIf`), skipped elsewhere, never passed |
| NH-7 (`NIGHTLY_ZONE=Nowhere/Unknown`) | — | exit 2, the error line, no `go=`, on every platform |
| the NH suite on a machine without GNU `date` | every test FAILs | skipped by `describe.runIf(hasGnuDate)`, its reason in the title |

**`lint` (package.json)**: `eslint .` → `eslint . --max-warnings 0`; base 46 warnings (my lock-exact
run, stop 1), now 0.

**The ad page (src/features/posting/preview/listing-detail.tsx)**

| case | base | now |
|---|---|---|
| an approximate pin's map links | computed after the still map's on-demand chunk downloaded (`MAP_PREVIEW.load().then(({ snap }) …)`) | computed at once from the statically imported `snap` (ruling 3 point 3: a user-visible improvement, not a Departure); a failed map download no longer withholds the links |
| the sign-in return's focus and 3-second highlight | an effect with no dependency list, re-run on every render, guarded by a flag; the timer never cleared | a stable callback ref (deps `focusOnReturn`, `viewer`), once under the same flag; the timer held in a ref and cleared on unmount (ruling 1 Q13; LD-32) |

**Exports (Part B).** Every moved export keeps its name and its body: the 25 new modules hold only
lines found in the base tree, bar one doc comment (`picker-popup.ts` :1); the scripted check is in
§4. `badgeVariants`, `useFormField` and `useImageFailure` lose `export` (D322 (b): no importer).
`AdminShellContext` and `AdminShellValue` gain `export` in admin-context.tsx (admin-shell-provider.tsx
reads them, D322 (a)). The i18n export list (`src/i18n/index.ts`): unchanged (the split reverted) —
`git diff --stat 2b11a9d29 HEAD -- src/i18n/` shows provider.tsx +3 (the three disable lines) and
nothing else.

**The route budgets**: `/admin/legal_/edit` ceiling 292 → 287 (ruling 4, D323 (b)); every other
line unchanged.

## 4. Censuses

STEP 1's census (pinned-asset steps, the runner's spawn sites, NH-6's assertion and `TZ` output,
arguments, test steps by text, the 46 warnings with each export's kind and importers, the base's
first-download table, roadmap line 3's readers, TCK-5 and R4's print sites, every list a new name
must join, wrong premises, findings) is `docs/governance/reports/housekeeping-1.stop-1.md` (a), (b),
(c), (d), (e), (f) and (g), at 2b11a9d29; ruling 1 accepted it whole. Censuses run since:

**Every module Part B created is a move.** A script read every line of every `src/**/*.ts(x)` at
2b11a9d29 and, for each of the 25 new modules, printed its lines (imports aside) not found there:
24 modules print 0; `src/components/picker-popup.ts` prints 1, its doc comment ("The searchable
picker's placement, keyboard and list-box geometry (searchable-picker.tsx)."). In the 77 modified
`src`/`e2e` files, the added lines other than imports are: the re-export lines of the moved
components, `overlays-impl.ts`'s `export * as submenuLevels`, `app-rail.tsx`'s
`overlays.submenuLevels.navLevelOf`, admin-context.tsx's two exports, `useImageFailure` without
`export`, listing-detail.tsx's callback ref, its unmount clear, its `snap` call, LD-32, and
provider.tsx's three disable lines (/tmp/ethio-scratch/housekeeping-1/mod-added.txt).

**The e2e selector, every new module (ruling 3 point 2)** — `matches()` over `AREAS` of
`scripts/e2e-select.ts`, by script; `bun scripts/e2e-select.ts --self-test`: `e2e-select self-test
OK: every spec is reachable; every area glob matches.`

| module | the areas that select it (glob) |
|---|---|
| `src/components/picker-popup.ts` | components (src/components/**) |
| `src/components/shell/favourite-category.ts` | shell (src/components/shell/**); components (src/components/**); submenu (src/components/shell/favourite-category.ts) |
| `src/components/shell/rail-variant.ts` | shell (src/components/shell/**); components (src/components/**); submenu (src/components/shell/rail-variant.ts) |
| `src/components/ui/button-variants.ts` | components (src/components/**); house-style (src/components/ui/**); press (src/components/ui/button-variants.ts) |
| `src/components/ui/keep-in-strip.ts` | components (src/components/**); house-style (src/components/ui/**) |
| `src/components/ui/overlay-ask.ts` | on-demand (src/components/ui/overlay-*.ts*); components (src/components/**); house-style (src/components/ui/**); overlay-shift (src/components/ui/overlay-*.ts*) |
| `src/components/ui/section-notice-state.ts` | components (src/components/**); house-style (src/components/ui/**) |
| `src/components/ui/slot-split.ts` | components (src/components/**); house-style (src/components/ui/**) |
| `src/components/ui/submenu-levels.ts` | components (src/components/**); house-style (src/components/ui/**); submenu (src/components/ui/submenu-*.ts*) |
| `src/components/ui/toggle-variants.ts` | components (src/components/**); house-style (src/components/ui/**) |
| `src/features/ad-page/share-price-text.ts` | sage-ad-page (src/features/ad-page/**); ad-page (src/features/ad-page/**) |
| `src/features/admin-attributes/attribute-error.ts` | admin-attributes (src/features/admin-attributes/**) |
| `src/features/admin-categories/category-form-values.ts` | admin-categories (src/features/admin-categories/**) |
| `src/features/admin-categories/category-submit-error.ts` | admin-categories (src/features/admin-categories/**) |
| `src/features/admin-countries/country-dialog-state.ts` | admin-countries (src/features/admin-countries/**) |
| `src/features/admin-locations/location-dialog-state.ts` | admin-locations (src/features/admin-locations/**) |
| `src/features/admin-locations/location-form-values.ts` | admin-locations (src/features/admin-locations/**) |
| `src/features/admin/admin-shell-provider.tsx` | admin-shell (src/features/admin/**) |
| `src/features/posting/amount-scale.ts` | posting (src/features/posting/**) |
| `src/features/posting/field-refusals.ts` | posting (src/features/posting/**) |
| `src/features/posting/map/map-snap.ts` | posting (src/features/posting/**) |
| `src/features/posting/preview/listing-section.ts` | posting (src/features/posting/**); sage-ad-page (src/features/posting/preview/listing-section.ts) |
| `src/features/posting/same-channels.ts` | posting (src/features/posting/**) |
| `src/features/posting/spec-sentences.ts` | posting (src/features/posting/**) |
| `src/providers/theme-context.ts` | none → ALL |

`theme-context.ts` is in no area, as `theme-provider.tsx` is in none: a change to either selects ALL
(over-selection, never under). For this turn's whole diff the selector prints `ALL`.

**Guards that read a moved name's old file** (stop 3's miss, ruling 3 point 1): press.test.ts :40,
choice-lists.test.ts :53–:54, visible-area.test.ts :26 — each moved with its needle; §5 has the
proofs.

**The only-export-components disables (ruling 4 point 2)** — `rg -n "eslint-disable.*only-export-components" src e2e scripts`:

```
src/i18n/provider.tsx:82:// eslint-disable-next-line react-refresh/only-export-components -- INC-1097: splitting the i18n hooks out of the provider re-chunks its four shared modules and costs every page 0.8–1.4 KiB (measured, housekeeping-1 stop 4); retired by housekeeping turn 1b with the chunk rule
src/i18n/provider.tsx:802:// eslint-disable-next-line react-refresh/only-export-components -- INC-1097: splitting the i18n hooks out of the provider re-chunks its four shared modules and costs every page 0.8–1.4 KiB (measured, housekeeping-1 stop 4); retired by housekeeping turn 1b with the chunk rule
src/i18n/provider.tsx:817:// eslint-disable-next-line react-refresh/only-export-components -- INC-1097: splitting the i18n hooks out of the provider re-chunks its four shared modules and costs every page 0.8–1.4 KiB (measured, housekeeping-1 stop 4); retired by housekeeping turn 1b with the chunk rule
```

**The laws' caches (ruling 5)** — `rg -n "semgrep-|/tmp" scripts/ci/laws-changed.ts
scripts/ci/turn-checks.ts` before the fix: laws-changed.ts :115 (`join("/tmp",
\`semgrep-rules-${rules}\`)`), :136 (`join("/tmp", \`semgrep-${version}\`)`); turn-checks.ts :58
(the platform harness's log, not a cache), :583 (its venv, already under the cache root), :666 (the
semgrep job's `/tmp/semgrep-rules`, removed and fetched again every run). After: no cache path
under `/tmp` in laws-changed.ts. `rg -n "ethio-checks|ETHIO_CHECKS_CACHE" scripts`: checks-cache.ts
(the one TypeScript spelling), turn-checks.ts :31 (a comment), and `scripts/db-proof.sh` :99 (§6).

**The first-download table** (ruling 4 point 5: re-measured on the final tree). The build of
64f80cf60 (the last commit to touch `src/`; `git diff --name-only 64f80cf60 HEAD` names only
`scripts/ci/` and docs), `node scripts/check-bundle-size.mjs`: `Bundle budget OK.`, `JS: 211.8 KiB /
215 KiB — ok`, `CSS: 23.1 KiB / 40 KiB — ok`, 0 pages in the NEAR band. The final `bun run checks`
built the tree again at 55a296384: its budget log's 52 sizes and ceilings equal that capture's, 52 of
52. Base = my lock-exact build of 2b11a9d29 (stop 1 (b)); gzipped KiB:

| page | base (size / ceiling) | final | change | ceiling |
|---|---|---|---|---|
| entry JS | 211.9 / 215 | 211.8 | -0.1 | 215 |
| stylesheet | 23.1 / 40 | 23.1 | 0.0 | 40 |
| / | 233.5 / 235 | 233.3 | -0.2 | 235 |
| /$name | 231.4 / 233 | 231.3 | -0.1 | 233 |
| /account | 274.6 / 277 | 274.4 | -0.2 | 277 |
| /account_/legal | 214.6 / 217 | 214.5 | -0.1 | 217 |
| /account_/legal_/$versionId | 215.2 / 218 | 215.1 | -0.1 | 218 |
| /account_/saved | 231.6 / 233 | 231.5 | -0.1 | 233 |
| /admin | 212.9 / 216 | 212.7 | -0.2 | 216 |
| /admin/ | 213.7 / 216 | 213.6 | -0.1 | 216 |
| /admin/ai | 326.5 / 329 | 326.3 | -0.2 | 329 |
| /admin/attributes | 339.8 / 342 | 339.6 | -0.2 | 342 |
| /admin/audit | 299.5 / 302 | 299.3 | -0.2 | 302 |
| /admin/categories | 347.9 / 350 | 347.6 | -0.3 | 350 |
| /admin/countries | 329.3 / 332 | 329.1 | -0.2 | 332 |
| /admin/images | 213.5 / 216 | 213.4 | -0.1 | 216 |
| /admin/impersonation_/$sessionId | 294.2 / 298 | 294.0 | -0.2 | 298 |
| /admin/legal | 285.1 / 288 | 284.9 | -0.2 | 288 |
| /admin/legal_/$versionId | 282.4 / 285 | 282.2 | -0.2 | 285 |
| /admin/legal_/edit | 284.1 / 292 | 283.9 | -0.2 | 287 |
| /admin/listings | 351.6 / 353 | 351.4 | -0.2 | 353 |
| /admin/listings_/$listingId | 353.2 / 354 | 353.0 | -0.2 | 354 |
| /admin/listings_/$listingId_/edit | 413.4 / 414 | 413.4 | 0.0 | 414 |
| /admin/locations | 273.7 / 276 | 273.5 | -0.2 | 276 |
| /admin/monetisation | 337.5 / 341 | 337.3 | -0.2 | 341 |
| /admin/places | 330.8 / 333 | 330.6 | -0.2 | 333 |
| /admin/roles | 296.2 / 299 | 296.0 | -0.2 | 299 |
| /admin/roles_/$roleId | 276.6 / 279 | 276.4 | -0.2 | 279 |
| /admin/screening | 372.6 / 374 | 372.4 | -0.2 | 374 |
| /admin/translations | 307.1 / 310 | 306.9 | -0.2 | 310 |
| /admin/translations_/$lang | 310.7 / 313 | 310.5 | -0.2 | 313 |
| /admin/users | 296.0 / 299 | 295.8 | -0.2 | 299 |
| /admin/users_/$userId | 291.3 / 294 | 291.1 | -0.2 | 294 |
| /auth | 229.6 / 231 | 229.5 | -0.1 | 231 |
| /auth_/callback | 216.1 / 217 | 215.9 | -0.2 | 217 |
| /auth_/reset | 218.0 / 219 | 217.9 | -0.1 | 219 |
| /c/$slug | 233.5 / 235 | 233.3 | -0.2 | 235 |
| /dev/primitives | 233.5 / 236 | 233.3 | -0.2 | 236 |
| /dev/style | 254.4 / 256 | 254.3 | -0.1 | 256 |
| /dev/tall | 212.2 / 215 | 212.1 | -0.1 | 215 |
| /l/$slug | 263.7 / 265 | 263.6 | -0.1 | 265 |
| /legal/$kind | 216.6 / 219 | 216.5 | -0.1 | 219 |
| /legal/accept | 223.6 / 226 | 223.5 | -0.1 | 226 |
| /legal/publishing | 217.4 / 220 | 217.3 | -0.1 | 220 |
| /my-listings | 321.8 / 323 | 321.7 | -0.1 | 323 |
| /my-listings_/$listingId | 329.8 / 331 | 329.7 | -0.1 | 331 |
| /my-listings_/$listingId_/edit | 408.0 / 409 | 408.0 | 0.0 | 409 |
| /post | 407.9 / 409 | 408.0 | +0.1 | 409 |
| /post_/$listingId | 407.9 / 409 | 407.9 | 0.0 | 409 |
| /privacy | 216.6 / 219 | 216.5 | -0.1 | 219 |
| /settings | 283.2 / 284 | 283.1 | -0.1 | 284 |
| /terms | 216.6 / 219 | 216.5 | -0.1 | 219 |

Chunk by chunk (Vite's gzip column, base build log against the final build log, by chunk name;
every chunk that moved by 0.01 KiB or more):

```
chunks: base 261, final 260
-0.10	0.33 → 0.23	admin-context.js
+0.01	0.85 → 0.86	admin.index.js
+0.05	0.65 → 0.7	admin.js
+0.01	4.4 → 4.41	admin.legal.js
-0.01	13.59 → 13.58	admin.monetisation.js
-0.01	2.21 → 2.2	admin.roles.js
-0.01	5.92 → 5.91	admin.translations.js
-0.01	9.66 → 9.65	admin.translations_._lang.js
-0.01	3.73 → 3.72	agree-to-document.js
+0.01	0.84 → 0.85	alert-dialog.js
+0.01	10.4 → 10.41	attribute-dialogs.js
+0.01	3.39 → 3.4	auth.js
-0.01	1.46 → 1.45	auth_.reset.js
-0.02	8.17 → 8.15	category-dialogs.js
+0.01	1.17 → 1.18	certify-block.js
-0.01	2.48 → 2.47	date-field.js
+0.01	4.06 → 4.07	dev.style.js
-0.01	2.29 → 2.28	guide-sheet.js
+0.01	0.62 → 0.63	icon-button.js
+0.35	131.97 → 132.32	index.js
+0.01	0.64 → 0.65	label.js
+0.02	13.48 → 13.5	listing-detail.js
-0.02	1.14 → 1.12	map-large.js
-0.03	1.18 → 1.15	map-preview.js
-0.46	0.46 → -	menu-current.js
-0.04	3.69 → 3.65	overlay-facade.js
-0.01	32.19 → 32.18	overlays-impl.js
-0.02	1.59 → 1.57	page-guide.js
-0.01	2.72 → 2.71	promote-sheet-lazy.js
-2.77	2.77 → -	share-ad.js
+2.78	- → 2.78	share-price-text.js
-0.01	1.82 → 1.81	step-up-gate.js
+0.03	0.29 → 0.32	still-map.js
+0.14	62.58 → 62.72	wizard.js
```

The causes (DEC-355): the entry (`index.js` +0.35) took in `menu-current.js` (−0.46, gone) — a net
saving on every page's first download (the entry closure 211.9 → 211.8). `share-ad.js` →
`share-price-text.js` is the same code under the module's name (+0.01). `wizard.js` +0.14 is the
posting moves (field-refusals, amount-scale, same-channels, spec-sentences re-linked) and the one page
that grew, `/post` +0.1 (408.0 / 409, outside the band: `judgedSize` 408.1, 0.9 below its line).
`listing-detail.js` +0.02 and `still-map.js` +0.03 against `map-preview.js` −0.03 and `map-large.js`
−0.02 are `snap` leaving the map modules for `map-snap.ts` (ruling 3: the ad page now carries the
function); `/l/$slug` −0.1 overall. The `admin*.js` lines are the admin moves (admin-shell-provider,
category, country, location, attribute modules). `/admin/legal_/edit` 283.9, its line lowered
292 → 287 (ruling 4).

## 5. Tests

**Added / changed** (ids; reasons):

- `scripts/ci/turn-checks.test.ts`: TCK-5 rewritten to DEC-361 (the one band; a NEAR page is a NOTE,
  never a FAIL — the FAIL it asserted is the behaviour DEC-361 retires); TCK-7 (platform reader), TCK-8
  (`--no-tests`), TCK-9 (the budget step's NEAR-only failure is a PASS), TCK-10 (ruling 5: the rules
  cache is whole only by its files) — new. Every new test's lines from the budget script are copied
  from two real runs (stop 2).
- `scripts/ci/nightly-hour.test.ts`: NH-6 `it.runIf(process.platform === "linux")`; NH-7 new; the
  suite `describe.runIf(hasGnuDate)` (INC-1096).
- `scripts/conformance/briefs.test.ts` (new): CF-BRIEF-1 → CF-BRIEF-4; `wired.test.ts` names it.
- `scripts/conformance/press.test.ts` (PRP-1's fixture), `choice-lists.test.ts` (owners; the walk reads
  `ts` and `tsx`, the owner check runs before the `.tsx` filter), `visible-area.test.ts` (AREA_READERS;
  VA-3's fixture), `overlays.test.ts` (WATCHED, MAY_REACH gain `submenu-levels`) — each follows its
  moved export; no assertion loosened (each still asserts its text in exactly one file).
- `src/features/posting/preview/listing-detail.test.tsx`: LD-32 new (the highlight timer cleared on
  unmount; LD-25 was taken, TI-1 said so). `listing-detail-map.test.tsx`: the mock's `snap` entry left
  (ruling 1). Tests that imported a moved export from its component file import it from the module;
  ids unchanged.

**Red first** (each shown, then restored with sha256 equal):

- TCK-5, TCK-7, TCK-8, TCK-9 on the base runner: `Tests 4 failed | 10 passed`. NH-7 on the base
  script: `Tests 1 failed | 5 passed | 1 skipped` (the message named New York, Q2 (b)).
- CF-BRIEF-4 with the two checkers emptied: `Tests 1 failed | 2 passed`; the planted lines appended to
  a ruling: CF-BRIEF-2 and CF-BRIEF-3 named them (stop 2).
- TCK-10 before `semgrepRulesWhole` existed: `TypeError: semgrepRulesWhole is not a function`,
  `1 failed | 14 skipped`; after: `Tests 15 passed (15)`.
- LD-32 with the unmount effect removed: `Tests 1 failed | 28 skipped`; restored: `29 passed`.
- The three guards (ruling 3 point 1): the old needle on the tree red (3 failed); moved, green; a
  planted removal from the new file red — `button-variants.ts:1 the primitive lacks ${PRESSED.button}`;
  `picker-popup.ts:1 owner: does not read menu-row.ts's list constants` (this plant PASSED before the
  walk read `.ts`, the defect fixed in the file); `searchable-picker.tsx:4 imports visible-area.ts
  outside its on-demand readers`.
- The lint floor (the brief's planted bypass): an exported function appended to
  `src/providers/theme-provider.tsx` → `ESLint found too many warnings (maximum: 0).`, exit 1;
  restored, sha256 equal.

**Totals on the final tree** (55a296384): `bun run typecheck` exit 0. `bunx eslint . -f json`: 1395
files, 0 errors, 0 warnings; `bunx eslint . --max-warnings 0` exit 0. `bunx vitest run scripts
--maxWorkers=2`: `Test Files 100 passed (100)`, `Tests 511 passed | 1 skipped (512)` (the skip: NH-6,
darwin). The checks' component-tests step (`vitest`, the whole suite): `Test Files 458 passed (458)`,
`Tests 2870 passed | 1 skipped (2871)`.

**THE CHECKS** — `bun run checks`, whole, on 55a296384 (the third run of STEP 6; the first's FAIL is
§10's stop 5):

```
checks (fast): 25 PASS · 0 FAIL · 378s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 34 PASS · 0 FAIL · 24 NOT RUN · 431s
```

This run started from an empty cache root for the laws' Semgrep, so it fetched CI's pinned rules once
(196 rule files under `javascript/` and `typescript/`) and installed Semgrep 1.179.0 there:
`Ran 45 rules on 115 files: 0 findings.` The budget step: PASS; `bundle-budget › the NEAR band (R4)`:
`0 NEAR`. The 24 NOT RUN, with their reasons as printed:

```
build-and-check › Workflow lint (actionlint, pinned) — pinned binary linux/x64 (actionlint_1.7.7_linux_amd64.tar.gz); this machine darwin/arm64
build-and-check › Install dependencies — the sandbox's dependencies are already installed; a package change is its own turn
build-and-check › Typecheck — /tmp/observability/build-errors.log is missing   (run on its own: exit 0)
component-tests › Install dependencies — (the same reason)
secrets-scan › Secrets scan (gitleaks, pinned) — pinned binary linux/x64 (gitleaks_8.24.3_linux_x64.tar.gz); this machine darwin/arm64
dependency-audit › Install dependencies, Audit — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
e2e-preflight › Cache bun install, Bun cache hit?, Install dependencies, Migration parity preflight (staging) — compares migrations with ethio-staging through the staging credentials, which the script never holds
e2e › Download shard results, Download job log tails, Download error contexts, Verify the downloaded artifacts belong to this attempt, Publish merged E2E report, Verdict — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
promote › Promote token present (DEC-210), Configure the actions bot, Fast-forward guard (ff-only law — never merge/rebase here), Promote dev to main — pushes main with the promote token; only CI promotes (DEC-020)
bundle-budget › Install dependencies — the sandbox's dependencies are already installed; a package change is its own turn
semgrep › Upload SARIF — GitHub's code-scanning upload, only GitHub can receive it
semgrep › Warn: the SARIF upload failed — answers the GitHub-only upload above
```

**Browser** (rule 00 step 7; the E2E values are set): no spec's code changed (the one spec diff is a
comment, ruling 1 Q12). The selector prints ALL for this diff, so `e2e:changed` does not apply; the
screen whose behaviour changed is the ad page (§3), so its specs ran whole, both projects, 0 retries,
outside the sandbox (`bun run e2e:local -- <file>`, each alone; ethio-staging):

- `e2e/ad-page.spec.ts`: `73 passed (4.5m)`, `5 skipped` (AP-37 desktop, AP-42, AP-45, AP-50 mobile,
  OVW-1 desktop — each a width-only test on the other project); AP-23 (the sign-in return to the
  contact block) and AP-39 / AP-55 (the map) passed on both; `[ssr-error]` lines: 0.
- `e2e/sage-ad-page.spec.ts` (the selector's group for listing-detail.tsx): `10 passed (1.4m)`,
  `8 skipped` (the width-specific SAP cases on the other project); `[ssr-error]` lines: 0.

The first attempt could not start (`no usable browser at the resolved path`: the shell inherited
`PLAYWRIGHT_BROWSERS_PATH` pointing into Cursor's sandbox cache); the run above set it to the user's
Playwright cache (`~/Library/Caches/ms-playwright`, chromium-1208 present). J-audit: not owed (no
spec's code changed).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "export function use(Attribute|Country|Location|Submit)Error|function
useImageFailure" src`; `rg -n "rules-of-hooks" e2e`; `rg -n "roadmap" .claude/hooks/lib.ts`;
`rg -n "ethio-checks|ETHIO_CHECKS_CACHE" scripts`; `rg -n "exhaustive-deps" src` (29).

- The refusal readers, five copies (F2's form kit, wave 1; this turn moved them and changed no line
  of their bodies): `src/features/admin-attributes/attribute-error.ts` :15 `useAttributeError`;
  `src/features/admin-countries/country-dialog-state.ts` :10 `useCountryError`;
  `src/features/admin-locations/location-dialog-state.ts` :10 `useLocationError`;
  `src/features/admin-categories/category-image-dialog.tsx` :29 `useImageFailure`;
  `src/features/admin-categories/category-submit-error.ts` :7 `useSubmitError`.
- Beside INC-447 (no new number, ruling 1): `useAttributeError` reads `(error as { message?: unknown
  }).message` (attribute-error.ts :26–:29) instead of `errorText`, and shows that raw text when no key
  matches (:40) — a staff screen; F2 wave 1 picks it up.
- The harness helpers named `use…` (turn 2): five `rules-of-hooks` disables —
  `e2e/admin-audit.spec.ts` :86, `e2e/admin-roles.spec.ts` :79, `e2e/helpers/categories.ts` :252,
  `e2e/i18n-coverage.spec.ts` :115, `e2e/helpers/translations.ts` :282.
- The brief in force: `.claude/hooks/lib.ts` :150 keeps its own reader of roadmap line 3 (the dormant
  kit's; ruling 1 Q7 — a kit turn folds it). In scope, folded: turn-checks.ts's copy is gone.
- The checks' cache root: `scripts/db-proof.sh` :99 spells `${ETHIO_CHECKS_CACHE:-$HOME/.cache/ethio-checks}`
  in shell (it cannot import `checks-cache.ts`); outside this turn's scope; the comment in
  checks-cache.ts names it.
- INC-1095's 29 disabled `exhaustive-deps` sites (ruling 1: a turn of their own).

## 7. Allowlists and guards

- `scripts/conformance/briefs-allowlist.txt`: new, its grammar header only — 0 entries at birth
  (ruling 1 Q6, ruling 2).
- `scripts/ci/turn-checks-allowlist.txt`: unchanged (no line for a platform reason — the runner
  decides from the machine).
- `scripts/conformance/non-null-allowlist.txt`: 146 lines at the base, 146 now; no file gained a
  non-null assertion.
- Every other `scripts/conformance/*-allowlist.txt`: unchanged (`git diff --stat 2b11a9d29..HEAD --
  scripts/conformance/*.txt` names briefs-allowlist.txt alone).
- Lint directives (ruling 4, D323 (a)): the three lines in §4, each with its rule, its reason
  (INC-1097) and its until (housekeeping turn 1b). No other `only-export-components` disable in
  src, e2e or scripts; the base's one (category-dialogs.tsx :106) is gone (Q14).
- Guards' self-tests run: `bun scripts/e2e-select.ts --self-test` OK; CF-BRIEF-4 (planted lines);
  the three moved guards' planted removals (§5); `--max-warnings 0`'s planted bypass (§5); TCK-10.
- `scripts/ci/checks-cache.ts` is a constants module the ruling named (one value); it has no census of
  its own that the root is spelled nowhere else (§13).

## 8. Strings

none — FLAGS no-new-string. `rg` over `src/i18n/locales/` in `git diff --name-only 2b11a9d29`: no
path. The usage maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`) changed by removals
only: the posting keys left `/admin/listings/$listingId` and `/admin/screening` (edit-listing.ts now
imports `same-channels.ts`, not step-who.tsx), and "/" and "/c/$slug" left keys already marked
"(every page)". The checks' i18n-usage-map step: PASS.

## 9. Migrations

none — FLAGS no-migration (`supabase/` absent from §2).

## 10. Departures

The turn ran under the brief and rulings 1 → 5, each saved by scripted copy with its sha256 equal to
the carrier's: ruling 1 (stop 1, the census: Q1 → Q14, the approved file list, INC-1095, INC-1096,
D322), ruling 2 (stop 2: a code span is a quotation for CF-BRIEF-2; S571), ruling 3 (stop 3: three
guards follow their exports, the selector's groups, `snap` a static import), ruling 4 (stop 4: the
i18n split leaves this turn, INC-1097, D323), ruling 5 (stop 5: the laws' Semgrep caches leave /tmp,
INC-1098). Departures from the brief and the stop-1 table, each with its reason:

- `eslint.config.js` is not touched (ruling 1 premise (1): `allowConstantExport: true` already stood
  at :113).
- `scripts/ci/nightly-hour.sh` :40 names `${ZONE}`, and its header names GNU `date` (ruling 1 Q2,
  INC-1096).
- `scripts/conformance/overlays.test.ts` (ruling 1 Q11), `press.test.ts`, `choice-lists.test.ts`,
  `visible-area.test.ts` (ruling 3 point 1), `scripts/e2e-select.ts` (ruling 3 point 2),
  `scripts/route-budgets.mjs` :45 (ruling 4 point 3), `scripts/ci/checks-cache.ts` (ruling 5) — scope
  widened by those rulings. choice-lists.test.ts's walk reads `ts` as well as `tsx` and its owner
  check runs before the `.tsx` filter: the approved owner line for a `.ts` file was never read (its
  planted removal passed); fixed inside the file the ruling gave. PRP-1's and VA-3's fixtures name the
  new files (each fixture follows its needle).
- Ruling 1 Q9's `src/i18n/i18n-context.ts` is not built: ruling 4, INC-1097 (the split re-chunked the
  entry's four shared modules, +0.8 → 1.4 KiB on every page). provider.tsx's three exports carry the
  reasoned, expiring disable instead.
- Helpers moved with their export (stop 3's corrections, accepted by ruling 3 point 4): `sameChannels`
  took `CHANNELS`, `Channel` and `channelOf`; `scaleAmount` took `AmountScale`; `firstSentence` alone
  went to spec-sentences.ts — the stop-1 table's "`foldFact` → spec-sentences.ts" was wrong (`foldFact`
  stays in `src/features/posting/reset-scope.ts` :82). Reason: imports stay one-way.
- `docs/features/posting.md` :1125 (`CONTROL_LESS_FIELDS`) names field-refusals.ts beside the :1152
  line ruling 3 named — the same stale cell.
- Two commit subjects are shorter than the titles the rulings dictated, which were over rule 00's 72
  characters (77 and 81): 64f80cf60 `housekeeping-1: part B — the i18n split leaves this turn
  (INC-1097)` and a6cd6fdbd `housekeeping-1: part A — the Semgrep caches leave /tmp (INC-1098)`; each
  carries the dictated title word for word in its body.
- `scripts/route-budgets.mjs` :45's comment carries ruling 4's words "ratchet at housekeeping-1 (283.9
  local): 292 → 287" and, after them, "(D323 (b), ruling 4); was 292." before the line's old comment.
- Part A changed the runner and the NH suite without their guides — my miss, found by this turn's
  self-review of ruling 5's fix: 55a296384 brings `docs/features/ci-status-reporter.md` (the platform
  reader, `--no-tests`, the NEAR note, TCK-1…10, and ruling 5's cache line, which landed in a6cd6fdbd)
  and `docs/features/nightly-e2e.md` (NH-6's platform, NH-7) up to the code (rule 10, Documentation).
- STEP 7's "push once for the code": the branch was pushed at each of the five stops (a stop's
  protocol) and once after ruling 5's fix; the bundle's pull request #34 stays a draft until turn 4
  (ruling 4 point 5).
- The STOPs: stop 1 (PLAN FIRST), stop 2 (CF-BRIEF-2 on ruling 1's own line), stop 3 (three guards
  and the selector outside scope; `snap`'s second reader), stop 4 (the i18n split's growth), stop 5
  (a machine-reason FAIL none of (1)–(3) covered: macOS swept the laws' Semgrep rules cache under
  /tmp).

## 11. CI

The base, two-step (stop 1): `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` —

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `2b11a9d2943114859f22ac14cfc9ccf9f589ac54` (short `2b11a9d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-10T01:27:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42733115280
```

The commit named is the base (2b11a9d29 = `git rev-parse origin/dev`, dev did not move during the
turn); guards-last-failure "No failed build/guard jobs in this run"; e2e-last-failure "last E2E run
42733115280 passed". No red of an earlier turn to fix.

This pull request's runs (`gh run list --branch cursor/housekeeping`):

- bd095897c (stop 4) — FAILURE, `First-paint bundle budget (gzipped ceiling)`: `Per-page budget
  failed (D234)`. Class: this lane's own code (the i18n split's growth that stop 4 reported). Cause and
  fix: ruling 4's revert, 64f80cf60.
- 806868ded (stop 5; ruling 4's tree) — SUCCESS, run 42806584515.
- 55a296384 (the final code commit) — run 42810138275, completed SUCCESS (`gh run view 42810138275`: head 55a296384); `gh pr checks 34`: 41 SUCCESS, 1 SKIPPED (`Promote to main (fast-forward on green)`, which runs only on dev), the `First-paint bundle budget (gzipped ceiling)` job among the successes (`/admin/legal_/edit` holds under 287).

No re-run.

## 12. Limits

- STEP 6's first run on 64f80cf60 printed `checks: 33 PASS · 1 FAIL · 24 NOT RUN · 478s`; the FAIL was
  `laws-first › Semgrep ERROR on changed files, CI's pins (INC-1030)` — exit 7, "No config given" —
  the machine's /tmp sweep had emptied the rules cache (stop 5, INC-1098). The emptied folder was moved,
  not deleted, to `/tmp/ethio-scratch/housekeeping-1/swept-semgrep-rules-a84ff9cc`; the second run
  (806868ded's tree) was `34 PASS · 0 FAIL · 24 NOT RUN`; the third is §5's.
- actionlint and gitleaks cannot run on this machine (pinned linux/x64 binaries): CI's build-and-check
  and secrets-scan jobs are their judges. The dependency audit, the staging preflight, the E2E merge and
  promote are CI's (§5's reasons). The checks' Typecheck step reads a harness log that does not exist
  here; `bun run typecheck` ran on its own (exit 0).
- NH-6 is skipped on this Mac (darwin); NH-7 is its positive control here; CI's ubuntu runs both.
- Browser: two specs, not the suite (the selector says ALL; CI's lanes run every spec). The changed
  spec is a comment-only change; CI's repeat lane repeats the spec (ruling 1 Q12).
- The supervisor's lint counts came from an install that is not lock-exact; mine are the measurement
  (46 at the base, 0 now).
- Scratch (the operator's to remove): `/tmp/ethio-scratch/housekeeping-1/` — the build and budget
  captures, the page and chunk tables, the planted copies, the checks captures (checks-final.txt,
  -2, -3), the e2e captures, the swept rules folder, and the census scripts.

## 13. Findings

- `.cursor/rules/12-ui.mdc` :79 names "`Field` and `focusFirstRefusal` in
  `src/features/posting/field.tsx`"; `focusFirstRefusal` is in `src/features/posting/field-refusals.ts`
  :194 now — the next rules turn (4), ruling 3 point 5.
- Register row 67 names "the map's links (listing-detail.tsx)" among `logOnDemandFailure`'s in-place
  callers; that caller is gone (`snap` is a static import). `rg -n "logOnDemandFailure"
  src/features/posting/preview/listing-detail.tsx` → :2 (the import) and :546 `"the section bar's
  offset"`, a caller the row never listed (at the base :568 already). The records turn's corrected
  cell is in §14.
- Register row 14 already named `reportMissing` in field.tsx at the base; it lives in
  `src/features/posting/wizard.tsx` :264 (`git show 2b11a9d29:src/features/posting/field.tsx` has no
  `reportMissing`). §14's corrected cell names both places.
- `scripts/route-budgets.mjs` :45 `/admin/legal_/edit` lowered 292 → 287 on the lock-exact measurement
  (283.9), ruling 4; if CI measures above 287 the budget job says so on this pull request.
- `scripts/ci/checks-cache.ts` (ruling 5) holds the checks' cache root for TypeScript;
  `scripts/db-proof.sh` :99 spells it in shell. No census asserts the root is spelled only there — a
  candidate for the next checks or CI turn (turn 3), not built here (A2).
- `src/i18n/provider.tsx` (836 lines) and `src/components/shell/app-rail.tsx` are over the ~300-line
  split rule (1,147 lines); Part B shrank app-rail.tsx (+5 −67); not split here (A2).
- The records turn's register rows 85 and 87 name `searchable-picker.tsx` for exports now in
  `src/components/picker-popup.ts` (ruling 3 point 5); §14 carries the corrected cells. Row 108's
  `src/i18n/provider.tsx` is unchanged by the revert.

## 14. Records

DEC — DEC-361 (the supervisor, 2026-11-10 05:0x New York, under G17 — a local instrument's verdict; CI's judge DEC-296 unchanged; D320's class rule at two occurrences; amended at housekeeping-1 ruling 1 from the GO's text after the census found D320's FAIL in check-bundle-size.mjs's local band, not in R4) — `bun run checks` reports the NEAR band and never fails on it: the runner reads the budget step's output, and when its only failure section is "NEAR band failed (DEC-296)" the step is PASS with one NOTE per NEAR page (its size, its ceiling, its growth since the base build and the words "CI's bundle-budget job judges; raise the line only with a named cause"); any other budget failure stays the step's FAIL; R4 reads the one band (budget-band.mjs's NEAR_KIB and judgedSize) and keeps no copy. check-bundle-size.mjs, budget-band.mjs and the CI job are unchanged. Frozen judge: adopted when TCK-5 and TCK-9 assert the NOTE and PASS, and `git diff` shows the two budget scripts and ci.yml untouched; reverted whole if a page crosses its CI ceiling in the next ten runs without a local NOTE having named it.

INC — INC-1094 — the local checks runner reports FAIL for steps the executor's machine cannot run (2026-11-09; the rules-3 report, the third occurrence after db-proof and f1-doors-1). Defect: `bun run checks` prints FAIL for the pinned linux/amd64 actionlint and gitleaks binaries on arm64 macOS ("exec format error") and for NH-6 (`scripts/ci/nightly-hour.test.ts`: `TZDIR` emptied to make the zone unresolvable; macOS's libc ignores `TZDIR`, so the zone resolves and the exit is 0, "expected +0 to be 2") in the scripts and component runs — green in CI every time, so the executor cannot tell a machine limit from a defect and every report carries four reds under Limits. Class: a check's verdict comes from the check, not the machine (G0.6 failure modes); mechanism: turn-checks.ts's allowance and R3. Fix: housekeeping turn 1 — the runner reads the pinned asset's platform from the step's text and says NOT RUN with the reason before any download; NH-6 runs where `TZDIR` governs (Linux) and NH-7 proves the same refusal on every platform through `NIGHTLY_ZONE`, and the laws' Semgrep caches live under the runner's cache root and are judged whole by their files (INC-1098). Status: FIXED in housekeeping turn 1 (TCK-7, NH-7).

(INC-1094's Fix ends with ruling 5 point 4's clause, word for word.)

INC — INC-1095 — twenty-nine `react-hooks/exhaustive-deps` sites hidden behind `eslint-disable` lines (2026-11-10; the housekeeping-1 census, finding (g) 2). Defect: the lint count shows one `exhaustive-deps` warning, but 29 lines disable the rule (src/components/app-shell.tsx :781; posting/step-where.tsx :892, :949, :970, :1000, :1026, :1154, :1232, :1263, :1284; posting/catalog-finder.ts :222; step-pricing.tsx :398; map/map-pin-dropper.tsx :311, :316; step-details.tsx :202; step-specifications.tsx :597, :1093; wizard.tsx :459, :520, :691, :853; phone-number-field.tsx :112, :129; admin-screening/screening-page.tsx :278, :293; admin-categories/categories-page.tsx :330; category-image-dialog.tsx :234; admin-translations/strings-page.tsx :186; use-label-room.ts :42), three with a stated reason; `--max-warnings 0` does not see a disabled line, so the lint floor of housekeeping turn 1 does not cover them. Class: an effect whose dependency list is wrong or suppressed — a re-run or a stale closure the rule exists to catch (G23: each effect must be read); mechanism: the lint rule, and for the disables a guard that a disable line carries a reason and an expiry (the allowlist law G55 applied to lint directives — `eslint-plugin-eslint-comments/require-description` or the repository's own census test; a package is G42's own turn). Fix: a turn of its own after housekeeping (each effect read and fixed at its cause or its disable given a reason and an INC), on the roadmap. Status: OPEN.

INC — INC-1096 — scripts/ci/nightly-hour.sh reads GNU `date` (2026-11-10; the housekeeping-1 census, finding (g) 4). Defect: `date -d` at :38–:39 and :58 is GNU syntax; on a stock macOS (BSD `date`) every NH test fails for a machine reason the platform reader of INC-1094 does not see, and the executor's Mac passes them only because Homebrew coreutils' `date` is ahead of `/bin/date` on PATH. Class: INC-1094's — a check's verdict must come from the check, not the machine. Fix: housekeeping turn 1 — the NH suite runs under `describe.runIf(hasGnuDate)` with its reason in the title (CI's ubuntu always has it), and the script's header names the requirement; no second code path in the script (G0.2). Status: FIXED in housekeeping turn 1.

DEC — D322 (the supervisor, 2026-11-10 05:0x, housekeeping-1 ruling 1, under G17) — (a) admin-context.tsx keeps its context and hooks; `AdminShellProvider` moves to admin-shell-provider.tsx (the smaller diff to the same end state); (b) an export with no importer loses the `export` keyword rather than earning a module (badgeVariants, useFormField, useImageFailure); (c) overlays.test.ts's WATCHED and MAY_REACH gain `submenu-levels` so `navLevelOf` stays off the first download by law (the ruling widened the scope by that file); (d) a comment-only change to a spec file is proven by CI's repeat lane, not by a local browser run — the diff must show the comment line alone; (e) `--no-tests` skips the laws-first censuses with every other vitest step and marks the summary line so a report cannot pass it as the whole.

register row — The three register rows (unnumbered; the records turn numbers them): "a local check's verdict comes from the check, not the machine" → scripts/ci/turn-checks.ts (the platform reader; `--no-tests`; the budget-output reader) → TCK-7, TCK-8, TCK-9, NH-7 → exceptions: none; "the lint set is clean and stays clean" → the `lint` script at `--max-warnings 0` over eslint.config.js → the lint step; exception: `allowConstantExport: true` (eslint.config.js :113, pre-existing) → debt: INC-1095's disabled sites; "a GO obeys the brief laws by a script" → scripts/conformance/briefs.test.ts → CF-BRIEF-4 → exceptions: briefs-allowlist.txt (empty).

slip — S571 (ruling 2, the supervisor's): ruling 1 :11 wrote the planted text in backticks while ruling that only double quotes count.

INC — INC-1097 — a module move re-chunks the entry's shared modules and costs every page their glue (2026-11-10; housekeeping-1 stop 4; the second occurrence after P-1c b's +0.9 KiB artefact recorded at scripts/route-budgets.mjs :45). Defect: splitting `useI18n`, `useStringsLayers` and `readDeviceStar` out of `src/i18n/provider.tsx` into `i18n-context.ts` (ruling 1, Q9's list) left the provider reached by the root alone, so the bundler folded it into the entry and split the four modules it shares with lazy pages (auth-result, on-demand-failure, entity, load-once) into chunks of their own: +0.8 → 1.4 KiB on every page, six pages over their ceilings and seven NEAR, the code unchanged (the executor's experiment x1: the two files at their base text, every page holds or falls). Class: the first-paint closure's chunking depends on which module happens to reference a shared module, so an unrelated move changes every visitor's download; mechanism: NONE YET — a chunk rule for the first-paint closure (vite.config.ts), housekeeping turn 1b; until it lands the split is reverted and provider.tsx's three exports carry a reasoned, expiring lint disable (D323). Status: OPEN — turn 1b.

DEC — D323 (the supervisor, 2026-11-10 06:0x New York, housekeeping-1 ruling 4, under G17) — (a) a lint directive that stays is written in G55's allowlist form — the rule, a reason and an until (an INC or a turn) — and is a recorded exception (G0.5); a bare `--max-warnings N` is never the form (G68: a number that hides which and until when); (b) the budget's ratchet is followed in the lane that measured it: a ceiling LOWERS on the executor's lock-exact build without waiting for CI (DEC-361's wait is for a raise), the line's comment naming the turn and the measurement.

INC — INC-1098 — the laws' Semgrep step judged its rules cache whole by a folder's existence, under /tmp (2026-11-10; housekeeping-1 stop 5; INC-1094's class). Defect: `scripts/ci/laws-changed.ts` :109–:110 kept CI's pinned Semgrep rules at `/tmp/semgrep-rules-<pin>` and read "the `javascript` folder exists" as "the cache is whole"; macOS's periodic /tmp sweep empties old files and leaves the folders, so the step ran Semgrep with no rules — exit 7, "No config given" — and `bun run checks` printed a FAIL that named no defect in the tree (the first run of STEP 6 on 64f80cf60; the second, after the cache was moved aside and fetched again, 34 PASS · 0 FAIL). The venv at :130 sat under /tmp too. Class: a check's verdict comes from the check, not the machine (INC-1094); a cache's wholeness is judged by its contents, never by a folder's name; a tool's cache lives under the user's cache root, never under a path the machine sweeps. Fix: housekeeping turn 1 (ruling 5) — both caches under the runner's cache root (`ETHIO_CHECKS_CACHE ?? ~/.cache/ethio-checks`), `semgrepRulesWhole()` counts the rule files in both folders and a false answer fetches again; TCK-10. Status: FIXED in housekeeping turn 1.

register row — row 14, corrected cell (the mechanism column), the new module path: `Field` in `src/features/posting/field.tsx` + the mirror (`reportMissing` in `src/features/posting/wizard.tsx`, `focusFirstRefusal` in `src/features/posting/field-refusals.ts`); the wizard's steps report to it (`src/features/posting/wizard.tsx`)

register row — row 85, corrected cell (the mechanism column), the new module path: `src/lib/visible-area.ts` `areaFrom` / `visibleArea` (a margin, 8 px unless told) / `collisionPaddingNow` / `watchChromeTop` (turn S5: the top chrome's bottom edge, told again on resize; the ad page's sticky section bar loads it on demand, `AREA_ON_DEMAND`) over the `data-chrome` markers; `src/components/picker-popup.ts` `placeList`, `usePickerPlacement` (scroll-then-open, `--picker-max-height`, `LIST_SCROLLER`, the `data-settled` mark, F4b); `dropdown-menu-impl.tsx` and `popover.tsx` per-side collision padding

register row — row 87, corrected cell (the mechanism column), the new module path: the phrase "`src/components/searchable-picker.tsx` (`PickerOption`, `pickerPopClass`, `usePickerPlacement`: shared horizontal geometry and owned control open state)" becomes "`src/components/searchable-picker.tsx` (`PickerOption`) and `src/components/picker-popup.ts` (`pickerPopClass`, `usePickerPlacement`: shared horizontal geometry and owned control open state)"; the rest of the cell unchanged.

register row — row 67, corrected cell (the mechanism column): the words "the map's links (listing-detail.tsx)" become "the ad page's section bar offset (listing-detail.tsx)" (the links no longer download anything — `snap` is a static import, housekeeping-1 ruling 3; the section bar's `watchChromeTop` download is the page's one in-place caller, unlisted since before this turn).

changelog — 2026-11-10 — housekeeping turn 1 (pull request #34): `bun run checks` tells a machine limit from a defect — a pinned binary built for another machine is NOT RUN with its platform, `--no-tests` runs every guard and no test, the budget step's NEAR band is a NOTE (DEC-361), the laws' Semgrep caches live under the cache root and are judged whole by their files (INC-1098); NH-6 runs on Linux and NH-7 proves the zone refusal everywhere; the lint set is clean and the `lint` script fails on a warning (`--max-warnings 0`; 46 → 0, the three INC-1097 disables in provider.tsx recorded with their expiry); `briefs.test.ts` checks the brief in force and its rulings (CF-BRIEF-1 → 4); `/admin/legal_/edit` ceiling 292 → 287.

roadmap — line 12 (Checks turn — a no-tests form of `bun run checks`): ticked — `[x]`, "done in housekeeping turn 1 (TCK-8; `bun run checks --no-tests`, INC-1064)".

roadmap — line 23 (The housekeeping turn): turn 1's items done in housekeeping turn 1 — "the local first-download check's NEAR band becomes a note, CI the instrument (D320, DEC-296)" (DEC-361, TCK-5, TCK-9) and "the 46 lint warnings" (0 at `--max-warnings 0`; the three INC-1097 exceptions until turn 1b); the turn also landed INC-1094 (the platform reader, NH-7), INC-1096, INC-1098 and the brief conformance test (CF-BRIEF-4). Next on the lane: housekeeping turn 1b (the chunk rule for the first-paint closure, INC-1097; the i18n split again), then turns 2 → 4 as the bundle names them.
