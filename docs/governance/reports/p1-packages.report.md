# Task P-1 — plans and packages, part 1: the plan's new dials, the packages and their prices, Admin › Plans and Admin › Packages; plus W4 — report

Base: 94249bf8 · Final commit: d568147 · Brief: docs/governance/briefs/p1-packages.md (the task gave no
sha256; `rg -n sha256 docs/governance/briefs/p1-packages.md` finds none)
Review: READY · 0 BLOCKER · 0 MAJOR · 5 MINOR · on d568147

The base's CI (read at orient, rule 40; the two-step check: ci-status's SHA `94249bf8` = `origin/dev` at
orient): `94249bf88fcee970622ba118e3961f0422b5cd66` · **SUCCESS** · 2026-11-02T07:45:18Z · run
41406025561.

## 1. Done / not done, by part and step

- STEP 0 — done: the task saved byte for byte (`docs/governance/briefs/p1-packages.md`), §S as
  `docs/governance/plans-packages-spec-v1.md`, `roadmap.md` line 3; rulings 1–5 saved as
  `p1-packages.ruling-<n>.md`.
- Part A (migrations) — done: M1a `20261102081500…` (plan dials), M1b `20261102081600…` (packages,
  prices, resolver, resource), M1c `20261102081700…` (three staff doors); stop 1 (three rounds, rulings
  2–4); all three applied on ethio-staging by the supervisor (rulings 3 and 4). The allowlist lines, the
  pool-reset map. Details in `p1-packages.stop-1.md`.
- Part B (Admin › Plans) — done: the section, route head and overview card say Plans (`admin.section.plans.*`;
  the `admin.section.coverage.*` pair deleted — ruling 5 item 2); the service reads and writes
  `default_days` / `max_active_ads` / `label_key` (`p_default_days`, `p_max_active_ads`,
  `p_ads_unlimited`, `p_label_key`); the roster's three columns (Ad lifetime, Ads at most, Label key);
  the editor's fields (days, ads + Unlimited, label) with the typed number parse `wholeNumber`
  (ruling 1 answer 10) in `coverage-forms.ts`; every `admin.coverage.*` Amharic value replaced per
  INC-1036 (ruling 4); the coverage pair moved to the admin layer (CF-SL-1). Tests CVF-1..5, CV-9..12.
- Part C (Admin › Packages) — done: `src/features/admin-packages/` (service, hooks, forms, page,
  prices table, editor, price-create and price-end dialogs), `src/routes/admin.packages.tsx`, the
  section (group listings) and rail icon, CF-PRICE-1 (`scripts/conformance/package-price.ts`) and
  CF-PERM-1 (`perm-vocabulary.ts`) with tests and allowlists, the `admin-packages` e2e area, the
  `admin.packages.*` / `admin.section.packages.*` / `admin.roles.perm.resource.packages` keys EN + AM,
  PKG-1..9, RP-17 (the brief's RP-12 — see §10), the budget line.
- Part D (W4) — done: Screening's Tier filter (`admin-screening-filter-tier`, SF-7, SC-27); Set tier
  from the listings row menu through the ad page's dialog and door via the one runner
  `changeListingTier` (CLT-1..3, ATR-6, ATR-7).
- Part E — done: `docs/features/packages.md` (new), `docs/features/coverage-console.md`, register rows
  91 and 92, one changelog line; THE CHECKS (three whole runs, the last on d568147); THE BROWSER CHECK
  (§5); DEC-296 base vs tree (§5); the self-review (two findings fixed in d568147, §10); this report.
- Not done: nothing of the brief. Not run here: the items in §12.

## 2. Files changed

`git diff --name-only 94249bf8` (72 paths):

```
docs/_changelog.md
docs/features/coverage-console.md
docs/features/packages.md
docs/generated/i18n-usage.json
docs/governance/briefs/p1-packages.md
docs/governance/briefs/p1-packages.ruling-1.md
docs/governance/briefs/p1-packages.ruling-2.md
docs/governance/briefs/p1-packages.ruling-3.md
docs/governance/briefs/p1-packages.ruling-4.md
docs/governance/briefs/p1-packages.ruling-5.md
docs/governance/mechanisms.md
docs/governance/plans-packages-spec-v1.md
docs/governance/reports/p1-packages.stop-1.md
docs/governance/reports/p1-packages.stop-2.md
e2e/admin-coverage.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-packages.spec.ts
e2e/admin-roles.spec.ts
e2e/admin-screening.spec.ts
e2e/helpers/pool-reset-map.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/conformance/package-price-allowlist.txt
scripts/conformance/package-price.test.ts
scripts/conformance/package-price.ts
scripts/conformance/perm-vocabulary-allowlist.txt
scripts/conformance/perm-vocabulary.test.ts
scripts/conformance/perm-vocabulary.ts
scripts/e2e-select.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin-coverage/coverage-create-dialog.tsx
src/features/admin-coverage/coverage-dialogs.test.tsx
src/features/admin-coverage/coverage-dialogs.tsx
src/features/admin-coverage/coverage-editor.tsx
src/features/admin-coverage/coverage-forms.ts
src/features/admin-coverage/coverage-page.tsx
src/features/admin-coverage/coverage-service.ts
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/change-listing-tier.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-overview/locations-overview.tsx
src/features/admin-packages/package-editor.tsx
src/features/admin-packages/package-prices.tsx
src/features/admin-packages/packages-dialogs.tsx
src/features/admin-packages/packages-forms.test.ts
src/features/admin-packages/packages-forms.ts
src/features/admin-packages/packages-page.tsx
src/features/admin-packages/packages-service.test.ts
src/features/admin-packages/packages-service.ts
src/features/admin-packages/price-create-dialog.tsx
src/features/admin-packages/price-end-dialog.tsx
src/features/admin-packages/use-packages-error.ts
src/features/admin-packages/use-packages.ts
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/admin/rail-items.ts
src/features/admin/sections.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/integrations/supabase/types.ts
src/routeTree.gen.ts
src/routes/admin.coverage.tsx
src/routes/admin.packages.tsx
supabase/migrations/20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql
supabase/migrations/20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql
supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql
```

36 of them are new (`git diff --name-status 94249bf8 | rg ^A`); `git ls-files` of those 36 paths answers
36. Every path is in SCOPE, in ruling 1's or ruling 5's additions, or in the standing allowance, except
`src/routeTree.gen.ts` (the generated route tree, which the new route file regenerates on build — a
Departure, §10). `docs/governance/plans-packages-spec-v1.md` is STEP 0's own file (the brief's §S).

## 3. Behaviour contract — before → after

- `admin_set_coverage_plan` (M1a): before `(text, integer, integer, integer, boolean, smallint)`; after
  the same six plus `p_default_days integer DEFAULT NULL, p_max_active_ads integer DEFAULT NULL,
  p_ads_unlimited boolean DEFAULT false, p_label_key text DEFAULT NULL`. The body is ethio-prod's live
  definition plus eight insertions (stop 1): three new refusals `badDefaultDays`, `badMaxActiveAds`,
  `badLabelKey` beside `badMaxPhotos`; the order inside unchanged (not authenticated →
  `coverage:update` → second factor → dial → rules → write); the audit row's `old`/`new` carry the three
  dials. Every existing caller (the console) now sends the three; a caller sending the old six gets the
  defaults (NULL = keep stored).
- `coverage_plans`: + `default_days` (NOT NULL DEFAULT 30), `max_active_ads` (NULL = unlimited),
  `label_key`; browser roles read the three columns (`updated_by` stays closed); the free plan reads
  30 / NULL / `plan.free`.
- New tables `listing_packages`, `package_prices`; new resolver `package_price_for(listing, package)`
  → jsonb or NULL; new resource `packages` (`view` plain, `update` step-up); new doors
  `admin_save_listing_package`, `admin_save_package_price`, `admin_end_package_price` (the config
  doors' order; refusals by name). Before: none of these existed.
- Admin › Plans screen (`/admin/coverage`): same path, id and permission; title/body keys
  `admin.section.coverage.*` → `admin.section.plans.*` (menu, route head, overview card); roster + 3
  columns; editor + 3 fields; `numberOrZero` → `wholeNumber` (a blank or non-numeric number field is
  a refusal by name, never 0 — ruling 1 answer 10); refusal ids + 3. Everything else as at base.
- Admin › Packages (`/admin/packages`): new. `packages:view` opens it (the /admin layout's gate); the
  roster (one read of `listing_packages`), Add package / Edit (dialog; the key fixed on edit), the
  prices table of the chosen package (Filters → chip), Add price, End price (red, live rows only);
  every write under the step-up guard, every refusal translated by the door's own message.
- Admin › Screening: + Tier filter (`listings.tier` column) and chip; filters state
  `country` → `{country, tier}`; query key + `filters.tier`. Nothing else changed.
- Admin › Listings: row menu + "Set tier" (`admin.listings.action.tier`) when `mayEnforce && !own &&
  mayTier(status)`; the ad page's `TierDialog` and door; the ad page's `runTier` now goes through
  `changeListingTier` (same outcomes: done / cancelled keeps the dialog / refusal by the one mapper).
- Roles matrix: + resource row `packages` with View and Update (Update marked step-up) — from the
  seed; the key `admin.roles.perm.resource.packages`.
- Strings layers: the coverage/plans section pair in the admin layer (CF-SL-1); the packages pair in
  base (the overview card and menu read it).

## 4. Censuses

- Readers of `admin.section.coverage.*` (`rg -n "admin.section.coverage" src e2e scripts`): sections.ts,
  the route head, `locations-overview.tsx` (the stop-2 hit, ruling 5 → in scope) — all moved to
  `admin.section.plans.*`; the old pair deleted; 0 readers remain.
- Readers of `package_prices` / `package_price_for` in app code (`rg -n "package_prices|package_price_for"
  src e2e scripts`): `packages-service.ts` (the one reader), the generated types, the e2e spec (not a
  consumer), the guard. CF-PRICE-1 judges this on every run (CFP-1 green on the real tree).
- Seeded permission names without keys (CF-PERM-1, `perm-vocabulary.ts` over `supabase/migrations/`):
  0 after `admin.roles.perm.resource.packages`; PV-1 was red on the real tree before the key.
- `numberOrZero` (`rg -n numberOrZero src`): `admin-countries/country-dialogs.tsx:172` (used by
  `country-editor.tsx:12,65`) — outside scope, K2.
- `TIER_LABEL` siblings (`rg -n "tierLabel|TIER_LABEL" src/features/admin-listings`): local `tierLabel`
  closures in `listings-page.tsx` and `listing-page.tsx` beside `TIER_LABEL` — K2.
- `scratchHolder` copies (`rg -n "async function scratchHolder" e2e`): ad-page-doors, admin-screening,
  admin-listings, my-listings-doors, admin-packages (mine, the fifth) — K2.
- `Control+A` presses (`rg -c "Control\+A" e2e/admin-listings.spec.ts e2e/admin-screening.spec.ts`): 7 —
  the harness's convention; a local macOS artefact (stop 2), K2.
- Migration guards (`bash scripts/check-migrations.sh`): born-closed, definer, self-marking,
  public-surface, real-row proof — OK (stop 1).

## 5. Tests

Unit (ids, all green; `bunx vitest run <the seven files>` → 7 files, 37 tests):
- new `packages-service.test.ts` PKS-1..6; `packages-forms.test.ts` PKF-1..7;
  `change-listing-tier.test.ts` CLT-1..3; `coverage-dialogs.test.tsx` CVF-1..5 (+ the existing
  `useCoverageError` test); `use-screening.test.ts` + SF-7; `package-price.test.ts` CFP-1..3 (CFP-2 is
  the planted bypass: a planted reader, a planted resolver call and a planted computation found; the one
  reader, a shown amount and an ad's own price not); `perm-vocabulary.test.ts` PV-1..4 (PV-3 planted).
- Red-first: PV-1 red on the real tree before `admin.roles.perm.resource.packages`, green after; CFP-2
  and PV-3 plant their bypasses on every run.

Component tests whole (`bun run checks`, d568147): 427 files, 2671 passed, 1 failed — NH-6
(`scripts/ci/nightly-hour.test.ts`, macOS, red on the base tree too). Laws (`scripts/`): 436 passed,
1 failed — the same NH-6.

E2E (new / changed ids): new PKG-1..9 (`e2e/admin-packages.spec.ts`), RP-17 (`admin-roles.spec.ts`),
CV-9..12 (`admin-coverage.spec.ts`; CV-8's column list extended), ATR-6, ATR-7 (`admin-listings.spec.ts`),
SC-27 (`admin-screening.spec.ts`). No assertion loosened; no `.first()`, `waitForTimeout` or `test.only`
in the added lines (`rg` over the diff: 0).

THE BROWSER CHECK (local, ethio-staging, `bun run e2e:local`, both projects, 0 retries;
`[ssr-error]` 0 and `[slow-rpc]` 0 in every log):
- `admin-coverage.spec.ts` + `admin-packages.spec.ts` whole on 287b938f5: **42 passed (2.2m)**.
- `admin-packages.spec.ts` whole on d568147 (the seam changed): **18 passed (1.5m)**.
- `admin-roles.spec.ts` whole on 287b938f5: **26 passed, 2 failed** — RP-8 in both projects
  (`<html lang>` stayed `en` / the device record never reached `am`), an untouched test. RP-8 alone on
  this tree: 2 failed. RP-8 alone on an export of the BASE (94249bf8, `/tmp/p1/base`): **1 failed
  (desktop-1280), 1 passed** — the same symptom, so it is not this branch's. It is the ledgered
  "language switch never takes" flake (`docs/tracking/flake-ledger.md:91,136`; the sage-s6-3 report
  names RP-8 by this symptom). Earlier in the task RP-8 + RP-17 passed 4/4 (6f003008f). RP-17 passed in
  every run. CI's Linux lanes are the proof.
- Earlier runs (stop 2): SC-27, ATR-6, ATR-7 6/6; `admin-screening.spec.ts` whole 50 passed, 4 failed
  and `admin-listings.spec.ts` whole 70 passed, 6 failed — every failure the `Control+A` macOS artefact
  (stop 2), none touching W4; CI passed them on 7f3f39f3.

J-audit of the changed specs: J1 every scratch row namespaced `e2e_pkg_<tag>_<run>_<worker>_<project>`
(≤ 32, the door's key shape); J2 Amharic asserted by key; J3 no real row edited — scratch packages,
prices, roles, markets, branches reaped in `afterEach` by destroys that throw; J4 counts and audit rows
read via the service client; J5 twin helpers (`tableOf`, `rowOf`, `wholeOf`, `actionsOf`), no
`.first()`; J6 PKG-6's public read and PKG-9's role reads are keyed by the scratch ids; J7 seed before
navigate, `waitForOpenMarket` before PKG-4's market appears; J8 none `@global-state`; J9 the pool for
consumers, the TOTP pool for step-up.

THE CHECKS on d568147 (`bun run typecheck` → exit 0; `bun run checks`):
`checks (fast): 17 PASS · 4 FAIL · 232s` · last line `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 284s`.
The four FAILs: laws-first and component-tests on NH-6 only (above); actionlint and gitleaks (Linux
x64 binaries, cannot run on this Mac — CI judges). Behind actionlint, run by hand: `format:check` OK,
`lint` 0 errors / 45 warnings (base 46), `e2e-select --self-test` OK, `check-root-routes` self-test 12
allowed / 5 refused, 60 entries safe. NOT RUN (30): installs (dependencies present), dependency-audit
(no advisory service), e2e-preflight (staging credentials the script never holds), e2e (CI's lanes),
promote (CI only), SARIF upload, build-and-check's steps shadowed by actionlint (run by hand, above),
laws-first's changed-folder unit tests and Semgrep-on-changed (shadowed by NH-6; the whole component
suite and the whole semgrep scan passed). Bundle budget PASS, NEAR band `0 NEAR, none grew`.

DEC-296 (local builds, base at `/tmp/p1/base` vs d568147): the entry 212.2 → 212.6 KiB / 213 (the
new route in the tree and its section: +0.3–0.4 on every page). Raised ceilings (`ceilingForLocal`),
each with its cause on its line in `scripts/route-budgets.mjs`: `/` 231→232, `/$name` 229→230,
`/account_/legal_/$versionId` 216→217, `/account_/saved` 229→230, `/admin/coverage` 321→322 (+1.1: the
three columns and fields), `/admin/legal_/edit` 290→291, `/admin/listings` 345→348 (+2.3: the tier
dialog and runner), `/admin/listings_/$listingId` 388→389, `/admin/listings_/$listingId_/edit` 410→411,
`/admin/places` 329→330, `/admin/roles_/$roleId` 314→315 (+1.4: the matrix key and the admin catalogue),
`/admin/translations` 401→404 (+2.5: the admin catalogue), `/admin/translations_/$lang` 309→310,
`/admin/users_/$userId` 292→293, `/auth_/reset` 216→217, `/c/$slug` 231→232, `/dev/primitives` 230→231,
`/dev/tall` 213→214, `/settings` 279→280; new `/admin/packages` 330.3 / 332. The 31 other pages grew
0.1–0.7 KiB and stay ≥ 0.4 KiB under their ceilings.

## 6. K2 — siblings that bypass the mechanism

- `src/features/admin-countries/country-dialogs.tsx:172` `numberOrZero` (via `country-editor.tsx:12,65`)
  — the sentinel parse ruling 1 (answer 10) replaced in the plans form; outside scope.
- `src/features/admin-listings/listings-page.tsx` and `listing-page.tsx`: a local `tierLabel` closure
  each beside `TIER_LABEL` (`tier-reasons.ts`); outside the W4 change.
- T1's `admin_set_listing_tier` (`20261102045918…sql:32`) carries an inline
  `profiles.account_status = 'deactivated'` read beside DEC-241's `assert_caller_active`.
- `validate_listing_draft` reads `coverage_plans WHERE plan = 'free'` (INC-1034, the supervisor's;
  CF-PLAN-1 in P-3).
- Five spec-local `scratchHolder` copies (ad-page-doors, admin-screening, admin-listings,
  my-listings-doors, admin-packages); four of them narrow `resources.name` with `as unknown as`
  (`admin-listings.spec.ts:305,2235`, `admin-screening.spec.ts`, …) — mine narrows by shape; a shared
  helper home is outside scope.
- 7 `Control+A` presses in `admin-listings.spec.ts` / `admin-screening.spec.ts` (the harness's
  convention; a macOS artefact).
- `package-prices.tsx` prints `<amount> <currency>` by hand while `src/features/posting/price-line.ts`
  (`priceLine`) is the listing price's one line; whether a package fee shares it is a ruling (MINOR).
- `coverage-dialogs.tsx` still exports the hook `useCoverageError` beside components (the one
  react-refresh warning left in the area; pre-existing).
Greps: `rg -n numberOrZero src`; `rg -n "tierLabel|TIER_LABEL" src`; `rg -n "account_status" supabase/migrations/2026110*`;
`rg -n "async function scratchHolder" e2e`; `rg -n "as unknown as" e2e/*.spec.ts` (85);
`rg -c "Control\+A" e2e/*.spec.ts`; `rg -n "currency" src/features src/lib`.

## 7. Allowlists and guards

- `scripts/public-surface-allowlist.txt` 160 → 166: `listing_packages | anon,authenticated`,
  `package_prices | anon,authenticated`, `package_price_for | anon,authenticated`,
  `admin_save_listing_package | authenticated`, `admin_save_package_price | authenticated`,
  `admin_end_package_price | authenticated` (each with its Turn P-1 reason).
- `scripts/acceptance-doors-allowlist.txt` 113 → 116: the `admin_set_coverage_plan(…)` line replaced by
  its ten-argument signature; + the three package doors (`staff`).
- `scripts/conformance/package-price-allowlist.txt` (new, CF-PRICE-1): header lines only, 0 entries.
- `scripts/conformance/perm-vocabulary-allowlist.txt` (new, CF-PERM-1): header lines only, 0 entries.
- `e2e/helpers/pool-reset-map.ts` `POOL_EXEMPT_TABLES` + `listing_packages`, `package_prices`.
- `scripts/e2e-select.ts` + area `admin-packages` (src globs → `admin-packages.spec.ts`,
  `admin-roles.spec.ts`); self-test OK.
- Guards wired: `wired.test.ts` names `package-price` and `perm-vocabulary`; self-tests CFP-2, PV-3 on
  planted bypasses (green); `scripts/check-migrations.sh` OK (stop 1).

## 8. Strings

Generated from both trees by a parser over the four locale files (`/tmp/p1/strings-table.py`):
95 new keys, 33 changed values (all Amharic, `admin.coverage.*`, from ruling 4's INC-1036 list — 5 of the
40 base keys had the same value in the ruling and 2 differed only in escaping), 2 removed, none moved
between layers. The Amharic is copied by key from rulings 4 and 5; none is mine.

### New keys

| layer | key | EN | AM |
|---|---|---|---|
| base | `admin.section.plans.title` | Plans | ዕቅዶች |
| base | `admin.section.plans.body` | What a seller may do on each plan: reach, photos, ad lifetime and how many ads. | በእያንዳንዱ ዕቅድ ሻጭ ምን ማድረግ እንደሚችል፦ ሽፋን፣ ፎቶዎች፣ የማስታወቂያ ቆይታ እና የማስታወቂያዎች ብዛት። |
| base | `admin.section.packages.title` | Packages | ጥቅሎች |
| base | `admin.section.packages.body` | The promotions a seller may apply to an ad, and their prices. | ሻጭ በማስታወቂያ ላይ ሊጠቀምባቸው የሚችላቸው ማስተዋወቂያዎች እና ዋጋዎቻቸው። |
| admin | `admin.roles.perm.resource.packages` | Packages | ጥቅሎች |
| admin | `admin.coverage.col.days` | Ad lifetime | የማስታወቂያ ቆይታ |
| admin | `admin.coverage.col.ads` | Ads at most | ማስታወቂያዎች ቢበዛ |
| admin | `admin.coverage.col.label` | Label key | የመለያ ቁልፍ |
| admin | `admin.coverage.field.days` | Ad lifetime (days) | የማስታወቂያ ቆይታ (ቀናት) |
| admin | `admin.coverage.field.daysHint` | How long an ad stays live when its category sets no limit. | ምድቡ ገደብ ካላስቀመጠ ማስታወቂያ ምን ያህል ጊዜ እንደሚቆይ። |
| admin | `admin.coverage.field.ads` | Active ads at most | ንቁ ማስታወቂያዎች ቢበዛ |
| admin | `admin.coverage.field.adsUnlimited` | Unlimited | ያልተገደበ |
| admin | `admin.coverage.field.adsHint` | Counted across live and waiting ads. | በቀጥታ ያሉና በመጠባበቅ ላይ ያሉ ማስታወቂያዎች ይቆጠራሉ። |
| admin | `admin.coverage.field.label` | Label key | የመለያ ቁልፍ |
| admin | `admin.coverage.field.labelHint` | The translation key that names this plan on screens. | ይህን ዕቅድ በማያ ገጾች ላይ የሚሰይመው የትርጉም ቁልፍ። |
| admin | `admin.coverage.unlimited` | Unlimited | ያልተገደበ |
| admin | `admin.coverage.error.badDefaultDays` | The ad lifetime is at least 1 day. | የማስታወቂያ ቆይታ ቢያንስ 1 ቀን ነው። |
| admin | `admin.coverage.error.badMaxActiveAds` | The ad limit is at least 1, or unlimited. | የማስታወቂያ ገደብ ቢያንስ 1 ወይም ያልተገደበ ነው። |
| admin | `admin.coverage.error.badLabelKey` | A label key is lower-case letters, digits, dots and underscores. | የመለያ ቁልፍ ትንንሽ የላቲን ፊደላት፣ አኃዞች፣ ነጥቦች እና ከስር መስመሮች ነው። |
| admin | `admin.packages.caption` | Every package and its prices | እያንዳንዱ ጥቅል እና ዋጋዎቹ |
| admin | `admin.packages.loading` | Loading packages… | ጥቅሎች እየተጫኑ ነው… |
| admin | `admin.packages.error` | The packages could not be loaded. | ጥቅሎቹ ሊጫኑ አልቻሉም። |
| admin | `admin.packages.empty` | There is no package yet. | እስካሁን ጥቅል የለም። |
| admin | `admin.packages.col.key` | Package | ጥቅል |
| admin | `admin.packages.col.tier` | Tier | ደረጃ |
| admin | `admin.packages.col.days` | Days | ቀናት |
| admin | `admin.packages.col.enabled` | On | በርቷል |
| admin | `admin.packages.col.selfServe` | Self-serve | በሻጭ የሚተገበር |
| admin | `admin.packages.col.extends` | Extends lifetime | ቆይታ ያራዝማል |
| admin | `admin.packages.col.sort` | Order | ቅደም ተከተል |
| admin | `admin.packages.col.updated` | Updated | የተሻሻለው |
| admin | `admin.packages.on` | On | በርቷል |
| admin | `admin.packages.off` | Off | ጠፍቷል |
| admin | `admin.packages.create.open` | Add package | ጥቅል ጨምር |
| admin | `admin.packages.create.title` | Add a package | ጥቅል ጨምር |
| admin | `admin.packages.edit.title` | Edit package | ጥቅል አርትዕ |
| admin | `admin.packages.action.edit` | Edit | አርትዕ |
| admin | `admin.packages.field.key` | Package key | የጥቅል ቁልፍ |
| admin | `admin.packages.field.keyHint` | 2 to 32 lower-case letters, digits or underscores, starting with a letter; fixed once saved. | ከ2 እስከ 32 ትንንሽ የላቲን ፊደላት፣ አኃዞች ወይም ከስር መስመሮች፣ በፊደል የሚጀምር፤ ከተቀመጠ በኋላ አይቀየርም። |
| admin | `admin.packages.field.tier` | Tier | ደረጃ |
| admin | `admin.packages.field.days` | Days | ቀናት |
| admin | `admin.packages.field.enabled` | Switched on | በርቷል |
| admin | `admin.packages.field.selfServe` | Sellers may apply it | ሻጮች ሊተገብሩት ይችላሉ |
| admin | `admin.packages.field.extends` | Extends the ad's lifetime | የማስታወቂያውን ቆይታ ያራዝማል |
| admin | `admin.packages.field.label` | Label key | የመለያ ቁልፍ |
| admin | `admin.packages.field.sort` | Order | ቅደም ተከተል |
| admin | `admin.packages.saved` | Package saved. | ጥቅሉ ተቀምጧል። |
| admin | `admin.packages.noDelete` | A package can be switched off, never removed. | ጥቅል ሊጠፋ ይችላል፣ በፍጹም አይወገድም። |
| admin | `admin.packages.prices.title` | Prices | ዋጋዎች |
| admin | `admin.packages.prices.caption` | The prices of the chosen package | የተመረጠው ጥቅል ዋጋዎች |
| admin | `admin.packages.prices.filter` | Package | ጥቅል |
| admin | `admin.packages.prices.empty` | This package has no price: it is not offered. | ይህ ጥቅል ዋጋ የለውም፦ አይቀርብም። |
| admin | `admin.packages.prices.loading` | Loading prices… | ዋጋዎች እየተጫኑ ነው… |
| admin | `admin.packages.prices.error` | The prices could not be loaded. | ዋጋዎቹ ሊጫኑ አልቻሉም። |
| admin | `admin.packages.prices.col.market` | Market | ገበያ |
| admin | `admin.packages.prices.col.category` | Category | ምድብ |
| admin | `admin.packages.prices.col.amount` | Price | ዋጋ |
| admin | `admin.packages.prices.col.from` | From | ከ |
| admin | `admin.packages.prices.col.to` | Until | እስከ |
| admin | `admin.packages.prices.everyMarket` | Every market | ሁሉም ገበያዎች |
| admin | `admin.packages.prices.everyCategory` | Every category | ሁሉም ምድቦች |
| admin | `admin.packages.prices.free` | Free | ነጻ |
| admin | `admin.packages.prices.open` | Open-ended | ያለ መጨረሻ |
| admin | `admin.packages.prices.create.open` | Add price | ዋጋ ጨምር |
| admin | `admin.packages.prices.create.title` | Add a price | ዋጋ ጨምር |
| admin | `admin.packages.prices.field.market` | Market | ገበያ |
| admin | `admin.packages.prices.field.category` | Category | ምድብ |
| admin | `admin.packages.prices.field.amount` | Amount | መጠን |
| admin | `admin.packages.prices.field.amountHint` | 0 makes the package free. | 0 ጥቅሉን ነጻ ያደርገዋል። |
| admin | `admin.packages.prices.field.currency` | Currency | ምንዛሪ |
| admin | `admin.packages.prices.field.from` | Valid from | የሚጀምረው |
| admin | `admin.packages.prices.field.to` | Valid until | የሚያበቃው |
| admin | `admin.packages.prices.field.toHint` | Leave blank for no end. | መጨረሻ ከሌለው ባዶ ይተዉት። |
| admin | `admin.packages.prices.action.end` | End price | ዋጋ አብቃ |
| admin | `admin.packages.prices.end.title` | End this price | ይህን ዋጋ አብቃ |
| admin | `admin.packages.prices.end.body` | The price stops at the date you choose; its history stays. | ዋጋው በመረጡት ቀን ይቆማል፤ ታሪኩ ይቀራል። |
| admin | `admin.packages.prices.ended` | Price ended. | ዋጋው አብቅቷል። |
| admin | `admin.packages.prices.saved` | Price saved. | ዋጋው ተቀምጧል። |
| admin | `admin.packages.error.denied` | You do not have permission to do that. | ይህን ለማድረግ ፈቃድ የለዎትም። |
| admin | `admin.packages.error.stepUp` | Verify a code and try again. | ኮድ አረጋግጠው እንደገና ይሞክሩ። |
| admin | `admin.packages.error.rateLimited` | Too many changes in a row; try again later. | በተከታታይ በጣም ብዙ ለውጦች፤ ቆይተው እንደገና ይሞክሩ። |
| admin | `admin.packages.error.badKey` | A package key is 2 to 32 lower-case letters, digits or underscores, starting with a letter. | የጥቅል ቁልፍ ከ2 እስከ 32 ትንንሽ የላቲን ፊደላት፣ አኃዞች ወይም ከስር መስመሮች ነው፣ በፊደል የሚጀምር። |
| admin | `admin.packages.error.unknownTier` | Pick Featured or Premium. | የተለየ ወይም ፕሪሚየም ይምረጡ። |
| admin | `admin.packages.error.badDays` | Days is at least 1. | ቀናት ቢያንስ 1 ነው። |
| admin | `admin.packages.error.badLabelKey` | A label key is lower-case letters, digits, dots and underscores. | የመለያ ቁልፍ ትንንሽ የላቲን ፊደላት፣ አኃዞች፣ ነጥቦች እና ከስር መስመሮች ነው። |
| admin | `admin.packages.error.unknownPackage` | That package does not exist. | ያ ጥቅል የለም። |
| admin | `admin.packages.error.unknownCountry` | That market does not exist. | ያ ገበያ የለም። |
| admin | `admin.packages.error.unknownCategory` | That category does not exist. | ያ ምድብ የለም። |
| admin | `admin.packages.error.unknownCurrency` | That currency does not exist. | ያ ምንዛሪ የለም። |
| admin | `admin.packages.error.badAmount` | The amount is 0 or more. | መጠኑ 0 ወይም ከዚያ በላይ ነው። |
| admin | `admin.packages.error.badWindow` | The end is after the start. | መጨረሻው ከመጀመሪያው በኋላ ነው። |
| admin | `admin.packages.error.overlap` | Another price already covers that market, category and dates. | ሌላ ዋጋ ያንን ገበያ፣ ምድብ እና ቀናት አስቀድሞ ይሸፍናል። |
| admin | `admin.packages.error.notFound` | That price no longer exists. | ያ ዋጋ ከእንግዲህ የለም። |
| admin | `admin.packages.error.alreadyEnded` | That price has already ended. | ያ ዋጋ አስቀድሞ አብቅቷል። |
| admin | `admin.packages.error.unknown` | That could not be saved. | ያ ሊቀመጥ አልቻለም። |

### Changed values (Amharic only; the English is unchanged — INC-1036, ruling 4)

| key | EN | AM before → after |
|---|---|---|
| `admin.coverage.caption` | Every plan and how far it reaches | ሁሉም እያንዳንዱ እቅድ እና የሚደርሰው ርቀት → እያንዳንዱ ዕቅድ እና ምን ያህል እንደሚደርስ |
| `admin.coverage.loading` | Loading plans… | እያንዳንዱ እቅድ በመጠራት ላይ። → ዕቅዶች እየተጫኑ ነው… |
| `admin.coverage.error` | The plans could not be loaded. | እቅዶቹ መጠር አልተታሉም። → ዕቅዶቹ ሊጫኑ አልቻሉም። |
| `admin.coverage.empty` | There is no plan on record yet. | አሁን የተመዝገበ እቅድ የለም። → እስካሁን የተመዘገበ ዕቅድ የለም። |
| `admin.coverage.note` | Posting enforces these limits from U6. | ከU6 ጀምሮ ማስታወቂያ እነዚህን ወሰቦች ይተገብራል። → ከU6 ጀምሮ ማስታወቂያ መለጠፍ እነዚህን ገደቦች ያስከብራል። |
| `admin.coverage.col.plan` | Plan | እቅድ → ዕቅድ |
| `admin.coverage.col.cities` | Cities | ከቴሞች → ከተሞች |
| `admin.coverage.col.countries` | Countries | ጀበዎች → አገሮች |
| `admin.coverage.col.photos` | Photos at most | በእብዛቅ ፈቶዎች → ፎቶዎች ቢበዛ |
| `admin.coverage.col.everywhere` | Everywhere | በሁሉም በክል → በሁሉም ቦታ |
| `admin.coverage.col.updated` | Updated | የታደሰው → የተሻሻለው |
| `admin.coverage.everywhere.no` | No | አይደለም → አይ |
| `admin.coverage.everywhere.tipYes` | A seller on this plan may reach every open market at once. | በይህ እቅድ ላይ ያለ ሰው በአንድ ጊዜ ሁሉንም ክፉት ገበያዎች ላይ ማድረስ ይችላል። → በዚህ ዕቅድ ላይ ያለ ሻጭ በአንድ ጊዜ ሁሉንም ክፍት ገበያዎች መድረስ ይችላል። |
| `admin.coverage.everywhere.tipNo` | A seller on this plan chooses places within the limits beside it. | በይህ እቅድ ላይ ያለ ሰው በገበዎቹ ወሰን ውስጥ ስዎችን ይመርጣል። → በዚህ ዕቅድ ላይ ያለ ሻጭ ከጎኑ ባሉት ገደቦች ውስጥ ቦታዎችን ይመርጣል። |
| `admin.coverage.create.open` | Add plan | እቅድ አክል → ዕቅድ ጨምር |
| `admin.coverage.create.title` | Add a plan | እቅድ አክል → ዕቅድ ጨምር |
| `admin.coverage.action.edit` | Edit | አርክ → አርትዕ |
| `admin.coverage.edit.title` | Edit plan | እቅድ አርም → ዕቅድ አርትዕ |
| `admin.coverage.field.plan` | Plan name | የእቅዱ ስም → የዕቅድ ስም |
| `admin.coverage.field.planHint` | Lower-case letters and underscores, 2 to 32 characters, e.g. free. | ስሯን ስዎች እና አንደርስኮርች ብቻ፥ ክ2 እስክ 32 ቁምፅ። → ትንንሽ የላቲን ፊደላት እና ከስር መስመሮች፣ ከ2 እስከ 32 ቁምፊ፣ ለምሳሌ free። |
| `admin.coverage.field.cities` | Cities at most | በእብዛቅ ከቴሞች → ከተሞች ቢበዛ |
| `admin.coverage.field.regions` | Regions at most | በእብዛቅ ክልሎች → ክልሎች ቢበዛ |
| `admin.coverage.field.countries` | Countries at most | በእብዛቅ ጀበዎች → አገሮች ቢበዛ |
| `admin.coverage.field.photos` | Photos at most | በእብዛቅ ፈቶዎች → ፎቶዎች ቢበዛ |
| `admin.coverage.field.everywhere` | Allow everywhere | በሁሉም በክል መፈቀድ → በሁሉም ቦታ ፍቀድ |
| `admin.coverage.field.limitHint` | At least 1. | ቢያስ 1። → ቢያንስ 1። |
| `admin.coverage.noDelete` | A plan can be edited, never removed. | እቅድ ማስተካከል ይቻላል፥ መደመስስ ግን አይቻልም። → ዕቅድ ሊስተካከል ይችላል፣ በፍጹም አይወገድም። |
| `admin.coverage.error.denied` | You do not have permission to do that. | ይህን ለማድረግ ፈቃድ የሎትም። → ይህን ለማድረግ ፈቃድ የለዎትም። |
| `admin.coverage.error.stepUp` | Verify a code and try again. | ኮድ አረጋግጠው እና እነነሰን። → ኮድ አረጋግጠው እንደገና ይሞክሩ። |
| `admin.coverage.error.unknown` | That could not be saved. | መቀመጥ አልተሳካም። → ያ ሊቀመጥ አልቻለም። |
| `admin.coverage.error.badPlan` | A plan name is 2 to 32 lower-case letters or underscores. | የእቅድ ስም ክ2 እስክ 32 ስሯን ስዎች ወይም አንደርስኮርች ብቻ ነው። → የዕቅድ ስም ከ2 እስከ 32 ትንንሽ የላቲን ፊደላት ወይም ከስር መስመሮች ነው። |
| `admin.coverage.error.belowMinimum` | Every limit is at least 1. | ሁሉም ወሰን ቢያስ 1 ነው። → እያንዳንዱ ገደብ ቢያንስ 1 ነው። |
| `admin.coverage.error.badMaxPhotos` | The photo limit is between 0 and 30. | የፎቶ ገደብ ከ0 እስከ 30 ነው። → የፎቶ ገደብ ከ0 እስከ 30 መካከል ነው። |

Unchanged of the 40 (same value in the ruling): `admin.coverage.filter.search`, `.searchPlaceholder`,
`.field.photosHint`, `.error.reason`, `.maxPhotos`; `.col.regions` and `.everywhere.yes` differ only
in escaping (`\u` at base, the glyphs now).

### Removed (a renamed string is a new key; no reader remains)

- base `admin.section.coverage.title` — EN "Coverage" / AM «ሽፋን»
- base `admin.section.coverage.body` — EN "How far a seller may reach on each plan." / AM «በየእቅዱ ሻጭ
  እስከምን ድረስ መድረስ ይችላል።»

Both usage maps regenerated (`bun run i18n:usage`; 1841 keys across 652 files) and committed
(287b938f5).

## 9. Migrations

All three applied on ethio-staging by the supervisor (rulings 3 and 4); none applied by me.

- `supabase/migrations/20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql` — M1a, 19 969 bytes,
  sha256 `c6405baa15d84f30d6363c79241b18f27178bf6032f586d01fac648cd1527074`, mark `20261102220000`,
  `-- e2e-areas: admin-coverage, posting`. apply ecdb5eab → expect mark 20261102220000 (done).
- `supabase/migrations/20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql` — M1b, 24 273 bytes,
  sha256 `79e44a3fe5977c1be603ebb395ecbd42c35b2d0d3038124aeeefecf7b9fccc91`, mark `20261102230000`,
  `-- e2e-areas: admin-packages, admin-roles`. apply 502ee113 → expect mark 20261102230000 (done).
- `supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql` — M1c, 26 667 bytes,
  sha256 `551f722777c90c7076039eb319fc2366243f512e2a055b566cf89d754130bc98`, mark `20261103000000`,
  `-- e2e-areas: admin-packages`. apply ac5b1435 → expect mark 20261103000000 (done).
What each creates and proves: `p1-packages.stop-1.md`. The generated client types for them
(`src/integrations/supabase/types.ts`) are the supervisor's generator text (ruling 5, DEC-320), applied
by script and untouched otherwise (8ff798294).

## 10. Departures

- Three migration files, not two (rule 30's size split; stop 1). Ruling 2 and 3 fixes (scratch plan
  letters-only; the key pattern `^[a-z][a-z0-9_]{1,31}$`, S512); M1c's one-RAISE-per-condition check
  (ruling 3).
- RP-12 → **RP-17**: `admin-roles.spec.ts` already holds RP-12..RP-16, so the packages matrix test is
  RP-17 (same content as the brief's RP-12).
- `numberOrZero` → `wholeNumber` in the plans form (ruling 1 answer 10): a blank or non-numeric number
  field is now refused by name, never read as 0.
- `admin.packages.error.rateLimited`: ruling 4 pointed at a key `admin.listings.move.error.rateLimited`
  that does not exist; the ruling's own listed Amharic value was used for the packages key.
- `changeListingTier` lives in its own file (`change-listing-tier.ts`), not in `use-admin-listing.ts`,
  which rides the posting path (CF-SL-1 showed the tier words following it onto public pages; stop 2).
- `coverage-forms.ts`: the plans form's judge moved out of `coverage-dialogs.tsx` (0a738fd5d) so the
  exports I added did not raise react-refresh warnings (lint 46 → 45 warnings).
- `src/routeTree.gen.ts`: the generated route tree, regenerated by the build for the new route; not
  named by SCOPE (precedent: foundations-turn-n1b-1).
- `scripts/e2e-select.ts`, `e2e/helpers/pool-reset-map.ts`, `src/features/admin/rail-items.ts` (ruling 1
  item 1) and `src/features/admin-overview/locations-overview.tsx` (ruling 5 item 2) joined the scope.
- `src/components/shell/` untouched (no primitive had to grow).
- `git archive` (read-only) exported the base to `/tmp/p1/base` for the DEC-296 comparison and the
  RP-8 base run; it is not on rule 00's git list.
- Self-review on 287b938f5 found two MAJORs, both fixed in d568147: `packagesErrorKey` read its
  message map by `hasOwnProperty` + `map[key]` instead of `ownValue` (a second local version of the
  own-key mechanism); the spec's `scratchHolder` narrowed `resources.name` with `as unknown as` (now
  a shape guard). MINORs left (§6): the hand-made `<amount> <currency>` cell vs `priceLine`;
  `useCoverageError` exported beside components; `routeTree.gen.ts`; the fifth `scratchHolder`;
  `marketName` shows the stored code for a market not on the open list (data, not a sentinel).
- STOPs and rulings in the turn: stop 1 (MIGRATION, three rounds; rulings 2, 3, 4), stop 2 (QUESTION —
  the generator's entries, the overview card; ruling 5); ruling 1 (the plan).

## 11. CI

- The base: `94249bf88fcee970622ba118e3961f0422b5cd66` (short `94249bf`) · **SUCCESS** ·
  2026-11-02T07:45:18Z · https://github.com/tesfayekb/ethio-marketplace/actions/runs/41406025561 —
  ci-status's SHA matched `origin/dev` at orient (the two-step check). No red of an earlier turn.
- This pull request's runs (`gh run list --branch cursor/p1-packages`):
  - `fa84ed0d` run 41414833020 and `770d0c02` run 41417522518 — every E2E lane red: the round-1 and
    round-2 migration files failed to apply on the temporary backend (the plan pattern, the key CHECK —
    stop 1 rounds 2 and 3). Class: a defect of this turn; fixed in 46171810e, 4735e8118, 78513a910.
  - `7f3f39f3` run 41418519493 — one test red in both projects: `i18n-coverage.spec.ts › the roles
    permission matrix renders no raw English vocabulary` (M1b seeded `packages` before its key). Class
    (c), the window between a door and its screens; fixed in 642af37d6 (the key + CF-PERM-1).
  - `137d0956` run 41428972721 — `First-paint bundle budget`: `/admin/listings: 346.5 KiB, over its
    ceiling of 345 KiB` (W4's tier dialog). Fixed by the DEC-296 line 345 → 348 in 10c0fd4e2.
  - No re-run was requested.
- The runs on this report's push are read as rule 40 says; the "every check green" line goes in the
  pull request.

## 12. Limits

- `actionlint` and `gitleaks` are Linux x64 binaries: not run here (the steps behind actionlint were
  run by hand, §5); CI judges both.
- NH-6 (`scripts/ci/nightly-hour.test.ts`) is red on this macOS, on the base tree too; CI is its proof.
- RP-8 (`admin-roles.spec.ts`, untouched) fails locally on this tree and on the base export with the
  ledgered language-switch symptom (§5); CI's lanes and its repeat lane are the proof. The root is the
  overlay facade's cold-press path (`src/components/ui/overlay-facade.tsx`), outside scope — reported,
  not touched.
- `admin-listings.spec.ts` and `admin-screening.spec.ts` whole fail locally on the `Control+A` macOS
  artefact (stop 2); CI passed them on 7f3f39f3.
- No Supabase MCP, no SQL runner: the migrations' proofs ran only on staging's apply (rulings 3–4).
- Local DEC-296 sizes read about 0.1 KiB under CI's; ceilings were set with `ceilingForLocal`.
