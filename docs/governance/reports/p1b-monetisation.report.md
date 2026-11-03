# Task P-1b — plans and packages, part 2: the credits model's products and console — report

Base: dev af312ca2 (the brief's; ruling 4 set turn (b)'s base at `cursor/p1b-monetisation` 02cbc6746 over dev 8ae1bec5) · Final commit: 44f63997f · Brief: docs/governance/briefs/p1b-monetisation.md (no sha256 given; the four rulings in `p1b-monetisation-ruling-1.md` → `-ruling-4.md`)
Review: READY · 0 BLOCKER · 0 MAJOR · 5 MINOR · on 44f6399

Turn (a) ended at the migration stop (`docs/governance/reports/p1b-monetisation.stop-1.md`: M-a → M-d,
CF-PLAN-1, the allowlist lines; applied on ethio-staging by the supervisor, ruling 4). This report is
turn (b) — the console, the strings, the tests, the guards, the budgets, the docs — and closes the task;
turn (c) folded in (ruling 4: "turn (c) may fold in if the chat holds").

## 1. Done / not done, by part and step

- Part A — ruling 4 recorded; the two never-retyped files applied: `~/Downloads/p1b-types.patch`
  (sha256 `6b0b999d…cafcb`, as ruling 4 §2a names it) onto `src/integrations/supabase/types.ts` — the file
  is now 6429 lines, sha256 `1daf9dc7f09fe8686eedd80fc07ecb19378c9774b44d8f13231efff4b635f2c3`;
  `~/Downloads/p1b-am-strings.md` (sha256 `46c3dfa7…52333`) — 3 base + 74 admin Amharic values copied
  beside their English, key order kept; a script read both files back and found every one of the 77
  values equal to the catalogue's (§8). Commit `6d0a4a81b`. DONE.
- Part B — `src/features/admin-monetisation/` (25 files), the route `/admin/monetisation`, the group
  `monetisation` after Listings, the two redirects, the Locations overview without its Plans tile,
  `admin-packages/` and `admin-coverage/` deleted and declared, the EN and AM strings (74 + 3 added, 15
  retired), CF-PRICE-1 extended, CF-LEVEL-1 new and wired, the vendor-seams line gone, `e2e-select`'s
  area, the usage maps. Commit `96040f05c`. DONE.
- Part C — `e2e/admin-monetisation.spec.ts` MON-1 → MON-15; the RowActions testids
  (`<row>-actions-<id>`) no longer collide with DataTable's card actions slot (`<row>-actions`); the
  usage maps regenerated for the spec's `en[...]` reads; MON-15's scratch plan name letters-only
  (`coverage_plans_plan_check`). Commits `0348763c6`, `a380a6318`, `149d6e806`. DONE.
- Part D — `scripts/route-budgets.mjs`: `/admin/monetisation` 334 (`ceilingForLocal(333.1)`); the
  `/admin/packages` and `/admin/coverage` lines removed; `/admin/listings_/$listingId` 389 → 390,
  `/admin/roles_/$roleId` 315 → 316, `/admin/translations` 404 → 406, `/my-listings_/$listingId_/edit`
  405 → 406, each with its cause on its line. Commit `5d0aee813`. DONE (§10 on "redirect size").
- Part E — `docs/features/plans.md` (new), `packages.md` and `coverage-console.md` superseded notes,
  register rows 91 and 92 extended, the changelog line, the owed roadmap line. Commit `44f63997f`. DONE.
- THE CHECKS (whole, on `44f63997f`), the browser check (every touched spec whole, alone, both projects,
  0 retries), the self-review: §5, §11, §12.
- Not done: nothing of the ruling's list. The new register rows (the perks matrix and its resolver, the
  reach product, the market settings, the names per language, the console) are DRAFTED in §7 as ruling 1
  §4 says ("new rows drafted in (c)'s report"), not written into the register.

## 2. Files changed

`git diff --name-only 02cbc6746` (78 paths; the whole task against af312ca2 is 103, the other 25 are
turn (a)'s, listed in stop-1):

```
docs/_changelog.md
docs/features/coverage-console.md
docs/features/packages.md
docs/features/plans.md
docs/generated/i18n-usage.json
docs/governance/briefs/p1b-monetisation-ruling-4.md
docs/governance/mechanisms.md
docs/tracking/intentional-deletions.txt
e2e/admin-coverage.spec.ts
e2e/admin-locations.spec.ts
e2e/admin-monetisation.spec.ts
e2e/admin-packages.spec.ts
e2e/phone-frame.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/listing-levels.test.ts
scripts/conformance/listing-levels.ts
scripts/conformance/package-price-allowlist.txt
scripts/conformance/package-price.test.ts
scripts/conformance/package-price.ts
scripts/conformance/vendor-seams-allowlist.txt
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/features/admin-coverage/coverage-create-dialog.tsx
src/features/admin-coverage/coverage-dialogs.test.tsx
src/features/admin-coverage/coverage-dialogs.tsx
src/features/admin-coverage/coverage-editor.tsx
src/features/admin-coverage/coverage-page.tsx
src/features/admin-coverage/coverage-service.ts
src/features/admin-coverage/use-coverage.ts
src/features/admin-monetisation/caps-editor.tsx
src/features/admin-monetisation/caps-forms.ts
src/features/admin-monetisation/caps-section.tsx
src/features/admin-monetisation/market-dialog.tsx
src/features/admin-monetisation/markets-section.tsx
src/features/admin-monetisation/monetisation-columns.tsx
src/features/admin-monetisation/monetisation-dialogs.tsx
src/features/admin-monetisation/monetisation-forms.test.ts
src/features/admin-monetisation/monetisation-forms.ts
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-monetisation/monetisation-rows.ts
src/features/admin-monetisation/monetisation-service.test.ts
src/features/admin-monetisation/monetisation-service.ts
src/features/admin-monetisation/on-off.tsx
src/features/admin-monetisation/override-dialog.tsx
src/features/admin-monetisation/overrides-section.tsx
src/features/admin-monetisation/price-dialog.tsx
src/features/admin-monetisation/price-end-dialog.tsx
src/features/admin-monetisation/price-forms.ts
src/features/admin-monetisation/prices-section.tsx
src/features/admin-monetisation/product-editor.tsx
src/features/admin-monetisation/products-section.tsx
src/features/admin-monetisation/use-monetisation-error.ts
src/features/admin-monetisation/use-monetisation-names.ts
src/features/admin-monetisation/use-monetisation.ts
src/features/admin-overview/locations-overview.tsx
src/features/admin-packages/package-editor.tsx
src/features/admin-packages/package-prices.tsx
src/features/admin-packages/packages-dialogs.tsx
src/features/admin-packages/packages-forms.test.ts
src/features/admin-packages/packages-page.tsx
src/features/admin-packages/packages-service.test.ts
src/features/admin-packages/packages-service.ts
src/features/admin-packages/use-packages.ts
src/features/admin/rail-items.test.ts
src/features/admin/rail-items.ts
src/features/admin/sections.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/integrations/supabase/types.ts
src/routeTree.gen.ts
src/routes/admin.coverage.tsx
src/routes/admin.monetisation.tsx
src/routes/admin.packages.tsx
```

Deleted (22 paths, each in `docs/tracking/intentional-deletions.txt`, the `[intentional-delete]`
marker on commit `96040f05c`): `e2e/admin-coverage.spec.ts`, `e2e/admin-packages.spec.ts`, the 8 files of
`src/features/admin-coverage/`, the 12 of `src/features/admin-packages/`. New files, proven by
`git ls-files`: the 25 under `src/features/admin-monetisation/`, `e2e/admin-monetisation.spec.ts`,
`src/routes/admin.monetisation.tsx`, `docs/features/plans.md`, `scripts/conformance/listing-levels.ts`,
`.test.ts`, `-allowlist.txt`, `docs/governance/briefs/p1b-monetisation-ruling-4.md` (7 + 25 = 32 listed).
`src/routeTree.gen.ts` is the generator's output of `bun run build` (never hand-edited);
`src/integrations/supabase/types.ts` is the DEC-320 patch (never hand-edited). Every path is in ruling 1
§4's approved scope or the standing allowance; `docs/features/coverage-console.md` is the standing
allowance (`docs/features/**`), touched only for its superseded note.

## 3. Behaviour contract — before → after

| Surface | At 02cbc6746 (turn (a)'s head: the doors landed, the P-1 screens still drawn) | At 44f63997f |
| --- | --- | --- |
| `/admin/packages` | Admin › Packages page (`admin-section-packages`), section `packages` in group `listings`, `packages:view` | `beforeLoad` → `redirect({ to: "/admin/monetisation", replace: true })`; no page in the build's route manifest |
| `/admin/coverage` | Admin › Plans page (`admin-section-coverage`), section `coverage` in group `locations`, `coverage:view` | the same redirect |
| `/admin/monetisation` | 404 | Admin › Monetisation (`admin-section-monetisation`); section `monetisation`, group `monetisation` (right after Listings), `packages:view`; six blocks in the order Markets · Levels · Per-category perks · Reach · Prices · Posting caps (the last only with `coverage:view`); head `admin.section.monetisation.title`, robots noindex |
| Admin menu (`sections.ts`, `rail-items.ts`) | groups Listings (Listings, Screening, Packages) … Locations (…, Plans) | Listings (Listings, Screening) · **Monetisation** (Monetisation; `Coins`; group icon `BadgeDollarSign`) · … Locations without Plans; `Package` and `Target` no longer imported by the rail |
| Locations overview | stat tile `overview-stat-plans` + link tile Plans (`useCoveragePlans`) | both gone; the stat grid `sm:grid-cols-2`; the import gone |
| Console reads | `listing_packages` + `package_prices` SELECTs (packages), `coverage_plans` SELECT (plans) | ONE rpc `admin_list_monetisation()` → `{markets, products, overrides, prices}` with staff names; plus the `coverage_plans` SELECT for the caps block (unchanged door, unchanged read) |
| Console writes | `admin_save_listing_package` (P-1 shape), `admin_save_package_price` (no credit cost), `admin_end_package_price`, `admin_set_coverage_plan` (with Label key) | `admin_save_listing_package` (M-a shape: kind, names, perks), `admin_save_level_override` / `admin_clear_level_override`, `admin_save_package_price` (+ credit cost, product picked first), `admin_edit_package_price` (while `used_count = 0` and live), `admin_end_package_price`, `admin_save_market_settings`, `admin_set_coverage_plan` with `p_label_key` NULL (the door keeps the stored key by COALESCE — MON-15) |
| Strings | `admin.section.plans.*`, `admin.section.packages.*`, `admin.overview.plans*`, the tier / label-key keys | retired (15); `admin.section.monetisation.*`, `admin.nav.group.monetisation`, `admin.monetisation.*` (77) added, EN + the supervisor's AM |
| CF-PRICE-1 | one reader `admin-packages/packages-service.ts`; forms `.from("package_prices")`, `package_price_for`; operand `amount` | one reader `admin-monetisation/monetisation-service.ts`; forms + `product_price_for`, `admin_list_monetisation`; operands `amount`, `credit_cost`, `creditCost` |
| CF-LEVEL-1 | — | new: no `listing_packages` / `level_overrides` read or `level_perks_for` call outside the reader; no quoted level word; 12 allowlisted tier consumers until P-2 |
| Budgets | `/admin/packages` 332, `/admin/coverage` 322 | `/admin/monetisation` 334; the two lines gone (no page); four pages raised (§10) |
| Everything else (every public page, every other admin page, the doors' SQL, the posting wizard) | — | unchanged by this turn: `git diff --name-only 02cbc6746` names no other source; the public pages' first downloads are 0.1 KiB smaller (the two routes left the route tree) |

## 4. Censuses

- Consumers of the folded consoles, after the fold (`rg -n "admin-packages|admin-coverage|admin/packages|admin/coverage"` over the tree minus docs, dist, lockfile, `routeTree.gen.ts`): the two redirect routes (`src/routes/admin.packages.tsx:7`, `admin.coverage.tsx:8`), the spec MON-3 (`e2e/admin-monetisation.spec.ts:645,649`), `rail-items.test.ts:32–33` (asserting the paths are gone), `sections.ts:84–85` (a comment), `roadmap.md:13,723`, `scripts/ci/turn-checks.ts:269` (a comment's example line — out of scope, K2), and the `-- e2e-areas:` headers of landed migrations `20261102081500/081600/081700` and `20261013142425` (landed files, never edited; `scripts/e2e-select.ts:524` treats an unknown area as ALL only when the migration itself changes).
- Section-id literals (`rg -n '"(packages|coverage|plans)"' src/features/admin src/components/shell src/routes/admin.tsx src/features/admin-overview`, minus roles/perm/resource lines): one hit, `languages-page.tsx:370` — a translations column key, another concern.
- The `Package` icon's importers after the rail dropped it (`rg -n 'import \{[^}]*\bPackage\b' src`): `impersonation-view.tsx:2`, `admin-listings/listings-page.tsx:5`, `src/test/own-key-sites.test.ts:1` — the bundler now gives the icon a chunk of its own (0.25 KiB; §10 budgets).
- Banned patterns over the turn's added lines (6963 lines; `git diff 02cbc6746..HEAD -- src e2e scripts` minus the generated and deleted files): `as unknown as` 0, `: any` 0, `@ts-expect-error|@ts-ignore` 0, non-null `!` 0, `?? 'ET'` 0, `?? guest` 0, `waitForTimeout` 0, `.first()` 0, `test.only` 0, hex colours 0, `instanceof Error` 0, `if (error) return null` 0, `fetch(` 0, `console.log` 0, `request.json` 0, `new Response` 0. `?? 0` once — `e2e/admin-monetisation.spec.ts` `seedPrice`'s `used_count: row.usedCount ?? 0`, a fixture's default on a fixture column, not an identity, geography or screening path. `createClient(` three times — the spec's anon and signed-in REST clients for MON-11 and MON-13 (the same shape as the deleted PKG-6 / PKG-9). `"ET"` / `"ETB"` ten times — all in `monetisation-service.test.ts` fixtures (:126, :129, :190, :192, :294, :297, :308, :310, :320, :322); K4 binds app code and SQL (§10 MINOR).
- The doors' refusal words against the message map: `rg -n "RAISE EXCEPTION" supabase/migrations/20261103040805…/06…/07…` → every message of the three door files has a key in `DOOR_MESSAGE_KEYS` (`monetisation-service.ts:324–363`) except `not found` (`admin_clear_level_override`, M-a :395), which falls to `admin.packages.error.unknown` with the door's raw words under it (MNS-6 asserts exactly this; §10).
- The guard trees: CF-PRICE-1 CFP-1 and CF-LEVEL-1 CFL-1 over `src/`, `e2e/helpers/`, `scripts/` — 0 findings beyond the 12 allowlisted `tier:` lines (`bunx vitest run scripts`, 442 passed).
- Testids the spec relies on, read from the sources before writing it: DataTable (`${rid}-card`, `${rid}-actions`, `${rid}-actions-cell`, `data-table-cards`), RowActions (`-edit`, `-more`, `-more-<key>`), DateField (`-calendar`, `-day-<iso>`), the six dialogs' `${prefix}-…` lists (`rg -o '\$\{prefix\}-[a-z-]+'`), `admin-nav-cards`, `admin-section-link-<id>`, `step-up-modal`.

## 5. Tests

Unit (new): `monetisation-service.test.ts` MNS-1 → MNS-6; `monetisation-forms.test.ts` MNF-1 → MNF-10;
`rail-items.test.ts` + "places the Monetisation group right after Listings and lists neither old path";
`scripts/conformance/listing-levels.test.ts` CFL-1 → CFL-3 (the tree; planted bypasses — a table read, a
resolver call, a quoted `'premium'`, a quoted `'regular'` beside `tier` — found; the reader, a catalogue
key `tier.premium` and `SessionTier` clean; wired in `wired.test.ts`); `package-price.test.ts` CFP-2
extended (planted `product_price_for`, `admin_list_monetisation`, `row.creditCost * 2`). Retired with their
files: PKS-1…6, PKF-1…7, `coverage-dialogs.test.tsx`.

Totals on `44f63997f`: `bunx vitest run src/features/admin-monetisation src/features/admin src/features/admin-overview scripts/conformance` → `Test Files 108 passed (108) · Tests 579 passed (579)`; the laws `bunx vitest run scripts --maxWorkers=2` → `Test Files 1 failed | 87 passed (88) · Tests 1 failed | 442 passed (443)` (the one red is NH-6, Mac-only, §12); the checks' component job → `Test Files 1 failed | 427 passed (428) · Tests 1 failed | 2675 passed (2676)` (the same NH-6).

E2E (new): `e2e/admin-monetisation.spec.ts` MON-1 → MON-15 as ruling 4 §3 lists them, named test by test
in `docs/features/plans.md` §Tests. Proofs of a refusal prove the absent side effect (MON-2: `readProduct`
null and 0 audit rows; MON-5: `max_photos` still NULL; MON-10: amount still 5; MON-12: `readMarket` null
after the dialog's and the door's refusal). MON-6 proves `days` AND `max_photos` through `level_perks_for`
on the SERVICE client (`perksFor`), before, after each cell, after the cleared cell and after Clear;
MON-7 the season cap and `season_until`; MON-15 the free plan READ only, the write on a scratch plan with
every stored field and `label_key` untouched (`toEqual` on the whole row). Real rows (the three levels,
the three reach rows, the default market, the free plan) are only read. Twin locators throughout
(`tableOf` / `rowOf` / `actionsOf` by viewport). Changed: `admin-locations.spec.ts` OV-1 loops
`["markets","places"]` and asserts `overview-stat-plans` count 0; `phone-frame.spec.ts` :80 `/admin/coverage`
→ `/admin/monetisation`. Deleted: PKG-1…9, CV-* (declared). Assertions that changed shape: OV-1's tile list
(three → two) and its new zero-count assertion — listed here.

Red-first: the spec's first run on staging was red at MON-15 only (`coverage_plans_plan_check`: a plan name
holds letters only — the fixture's name, not the console), fixed in `149d6e806`; every other test was green
on its first run. The RowActions testid rename (part C) was caught by reading `data-table.tsx` before the
spec ran: `${rid}-actions` is the card's actions container, so the row verbs took `<row>-actions-<id>-…`.

J-audit of `e2e/**` changes (J1–J9): J1/J3 scratch rows under `e2e_mon_` / `e_probe_mon_`, namespaced
run × worker × project × test, reaped in `afterEach` (overrides and prices first; a scratch market's or
category's rows before `destroyCountry` / `destroyCategoryBranch`); J4 DB truth through the service
client for every claim; J5 structure and testids, words only by catalogue key (`en[...]`, `am[...]`); J6
both twins; J7 seed before navigate; J9 the pooled job super admin for consumers, scratch roles for
narrower staff.

Local browser runs (`env -u PLAYWRIGHT_BROWSERS_PATH bun run e2e:local -- <file> --retries=0`, each spec
whole and alone, both projects; `[ssr-error]` count 0 in every log):

- `e2e/admin-monetisation.spec.ts` — `30 passed (1.4m)`
- `e2e/admin-shell.spec.ts` — `12 passed (40.5s)`
- `e2e/admin-locations.spec.ts` — `2 skipped 36 passed (2.5m)`
- `e2e/phone-frame.spec.ts` — `9 skipped 9 passed (34.2s)`
- `e2e/post-wizard-place.spec.ts` — `38 passed (3.1m)`
- `e2e/admin-roles.spec.ts` — `1 failed 27 passed (2.7m)`: RP-8 on mobile-360, "the device language record
  never reached am (INC-173b)" in `switchLanguage` on `/admin/roles`. Alone (`--grep RP-8`) both twins red
  with the same message; the BASE tree (02cbc6746 exported to `/tmp/p1b-base`, this turn's node_modules,
  the same lockfile) run the same way: `1 failed 1 passed (22.1s)` — desktop red, mobile green, the same
  message. Not this turn's: RP-8 does not touch a path this turn changed (the roles console and the
  language switcher), it fails on the base in the same way, and `admin-roles.spec.ts` was green in CI's last
  completed run on dev (8ae1bec5, run 41567593377). RP-17 (the `packages` resource heading) passed on both
  twins. Under §12; CI judges.

THE CHECKS on the final tree: `bun run typecheck` → clean (`tsc --noEmit`, no output). `bun run checks`
(whole, once, after the last code commit): fast line `checks (fast): 17 PASS · 4 FAIL · 254s`; last line
`checks: 24 PASS · 4 FAIL · 30 NOT RUN · 305s`. The four FAILs, each read in its log: (1) `laws-first ›
scripts/ tests first` — NH-6 only (442 passed); (2) `component-tests` — NH-6 only (2675 passed); (3)
`build-and-check › Workflow lint (actionlint, pinned)` — the pinned `actionlint_1.7.7_linux_amd64` does not
run on macOS ("the bad fixture failed for another reason"; checksum OK); (4) `secrets-scan` — the pinned
`gitleaks_8.24.3_linux_x64` likewise (the log ends at "Secrets scan: 19 commits in af312ca2..HEAD", no
finding and no verdict). The 30 NOT RUN: 10 behind the Mac reds (`changed folders' unit tests`, `Semgrep
ERROR on changed files` in laws-first; typecheck, format, lint, e2e selector self-test, root route names,
build, bundle report in build-and-check) — each run by hand on `44f63997f` and green: `bun run format:check`
("All matched files use Prettier code style!"), `bun run lint` (0 errors; 44 warnings, none in a file this
turn touched), `bun scripts/e2e-select.ts --self-test` ("every spec is reachable; every area glob
matches"), `bun run scripts/check-root-routes.ts --self-test` + the check ("61 entries; every root segment
is safe"), `bun run build` (exit 0), `node scripts/check-bundle-size.mjs` ("Bundle budget OK."), the
changed folders' vitest above, Semgrep's own job PASS (scan, counts only); 4 `Install dependencies` (the
sandbox's dependencies are installed); 2 `dependency-audit` (the advisory service is not reachable); 4
`e2e-preflight` (staging credentials the script never holds); 6 `e2e` (GitHub artifacts); 4 `promote`
(CI only); 2 `semgrep › Upload SARIF` / its warning (GitHub only).

## 6. K2 — siblings that bypass the mechanism

Greps: the four censuses of §4; `rg -n "scratchHolder" e2e/*.spec.ts`; `rg -n "\"ET\"|\"ETB\"" src/features/admin-monetisation`.

- `e2e/admin-monetisation.spec.ts` `scratchHolder` (:420) — the spec-local helper's sixth copy (ad-page-doors, admin-screening, admin-listings, my-listings-doors, attributes-library's variant; admin-packages' copy went with its file). In scope, left as the K2 debt line already on the roadmap (:13, reworded to name this spec) — one e2e helper is its own turn.
- `scripts/ci/turn-checks.ts:269` — a doc comment's example line `/admin/coverage`; out of scope; roadmap :7 names it.
- Landed migrations' `-- e2e-areas: admin-coverage|admin-packages` headers (`20261013142425`, `20261102081500`, `081600`, `081700`) — never edited (rule 30); harmless to the selector unless the file changes.
- `monetisation-service.test.ts` fixtures carry `"ET"` / `"ETB"` literals (the ten lines of §4) — tests, not app code; the P-1 tests they replace did the same. Not touched.
- The `/admin/monetisation` first download (333.1 KiB) carries `category-glyphs` (12.75 KiB) and `category-dialogs` (7.97 KiB) through the override and price dialogs' category selects and `CategoryModal` — the same chunks Admin › Packages carried (330.3); an on-demand split is a speed turn's, not this brief's.

## 7. Allowlists and guards

- `scripts/conformance/package-price-allowlist.txt`: 0 → 0 lines (the header names the reader's new home).
- `scripts/conformance/listing-levels-allowlist.txt` (new): 0 → 12 lines, every one `tier:<file> | the P-1 tier consumer, folded onto the level rows by P-2 | 2027-03-31`: `src/features/feed/ranking.ts`, `src/components/marketplace/card-tier.ts`, `src/components/marketplace/tier-flag.tsx`, `src/features/feed/feed-page.ts`, `src/features/admin-listings/use-admin-listings.ts`, `tier-reasons.ts`, `use-admin-listing.ts`, `listing-page.tsx`, `listings-page.tsx`, `src/routes/dev.style.tsx`, `scripts/feed-bench.ts`, `e2e/helpers/ad-page.ts`. The until is a date because no DEC names P-2's fold yet (§10).
- `scripts/conformance/vendor-seams-allowlist.txt`: 48 → 47 (`coverage-service.ts | direct vendor use before DEC-250 | INC-877` gone with the file; ruling 1 §3i).
- Guard self-tests run: CFP-1…3, CFL-1…3 (planted bypasses found), `wired.test.ts` (CFL-3's caller named), `scripts/admin-tables.ts` TBL-1…9 + TBS-1 over the six tables, `check-hardcoded-strings.sh`, `strings-layers`, `am-script`, `look-law`, `list-action-labels`, `menu-rows`, `e2e-select --self-test`, `check-root-routes --self-test`, the deletions guard self-test, the budget check — all in `bunx vitest run scripts` / `bun run checks` above.
- Register rows DRAFTED for the supervisor (ruling 1 §4), in the register's columns:
  - **100** | A level's effective perks for an ad are one answer from one resolver, per column (D295, D308, D309; turn P-1b) | SQL `level_perks_for(level, category, market)` (M-a; STABLE, SECURITY INVOKER; (main category, market) → (any, market) → (main category, any) → the level row; days capped at the season's end, `season_until`) over `listing_packages` (kind `level`) and `level_overrides`; the doors `admin_save_level_override` / `admin_clear_level_override`; the console's Levels and Per-category perks blocks | CF-LEVEL-1 (`listing-levels.test.ts` CFL-1…3, wired); MNS-6; e2e MON-4 → MON-7 | `listing-levels-allowlist.txt` (12 `tier:` lines until P-2) | a new perk is a column on both tables and a term in the resolver, never a second resolver; a new level is a row | P-2's Promote and the ad page are the resolver's next callers
  - **101** | A product's kind and names are rows, not types (D286, D296, D311; turn P-1b) | `listing_packages.kind` CHECK (`level`, `reach`), `name_en` / `name_am` read through `catalogText`; the door `admin_save_listing_package` (`kind change`, `perks on reach`) | CF-LEVEL-1's quoted-word rule; MNF-1…3; MON-4, MON-5 | — | P-3 widens `kind` to `bundle` | the seeds and their Amharic, ruling 1 §3f
  - **102** | A market's free baseline, included reach and paid-levels switch are one row per market with a default row (D300, D305, D310; turn P-1b) | `market_settings` + `admin_save_market_settings` (`launch bundle required`, `paid_levels_since`); the Markets block | MNS-4; MON-12, MON-13 | — | P-2's free-slot rule and P-3's launch grant read this row | the browser roles read the dials, never the authors
  - **103** | Staff see who created and who last changed a monetisation row, as names (D290; turn P-1b) | `admin_list_monetisation()` joins `profiles.display_name` into `created_by_name` / `updated_by_name`; `attributionColumns` (detail tier) | MON-4; MON-13 (the id columns never granted) | — | a new console table joins the same two names | —

## 8. Strings

Every key read by a script comparing `02cbc6746` → HEAD over `en-base.ts` / `am-base.ts` /
`en-admin.ts` / `am-admin.ts`: base +3 −4, admin +74 −11, 0 changed values; the 77 Amharic values equal
the supervisor's `p1b-am-strings.md` byte for byte (script: 77 keys, 0 mismatches). None of the Amharic is
mine.

Added — `en-base.ts` / `am-base.ts`:

- `admin.section.monetisation.title` · Monetisation · ገቢ ማስገኛ
- `admin.section.monetisation.body` · Levels, reach and their prices per market; the free baseline and the paid-levels switch per country. · ደረጃዎች፣ ተደራሽነት እና ዋጋዎቻቸው በየገበያው፤ ነጻው መሠረት እና የሚከፈልባቸው ደረጃዎች ማብሪያ በየሀገሩ።
- `admin.nav.group.monetisation` · Monetisation · ገቢ ማስገኛ

Added — `en-admin.ts` / `am-admin.ts` (74):

- `admin.monetisation.markets.title` · Markets · ገበያዎች
- `admin.monetisation.levels.title` · Levels · ደረጃዎች
- `admin.monetisation.overrides.title` · Per-category perks · በምድብ የሚለዩ ጥቅሞች
- `admin.monetisation.reach.title` · Reach · ተደራሽነት
- `admin.monetisation.prices.title` · Prices · ዋጋዎች
- `admin.monetisation.caps.title` · Posting caps · የመለጠፍ ገደቦች
- `admin.monetisation.caps.untilP2` · These caps move to the levels and the reach when an ad's level lands. · የማስታወቂያ ደረጃ ሲተገበር እነዚህ ገደቦች ወደ ደረጃዎቹ እና ተደራሽነቱ ይዛወራሉ።
- `admin.monetisation.col.market` · Market · ገበያ
- `admin.monetisation.col.freeAds` · Free Regular ads · ነጻ መደበኛ ማስታወቂያዎች
- `admin.monetisation.col.includedReach` · Included reach · የተካተተ ተደራሽነት
- `admin.monetisation.col.paidLevels` · Paid levels · የሚከፈልባቸው ደረጃዎች
- `admin.monetisation.col.launch` · Launch bundle · የመክፈቻ ጥቅል
- `admin.monetisation.col.since` · Paid since · ክፍያ ከጀመረ
- `admin.monetisation.col.name` · Name · ስም
- `admin.monetisation.col.photos` · Photos at most · ፎቶዎች ቢበዛ
- `admin.monetisation.col.placement` · Placement · አቀማመጥ
- `admin.monetisation.col.badge` · Badge · ምልክት
- `admin.monetisation.col.defaultDays` · Default days · ነባሪ ቀናት
- `admin.monetisation.col.days` · Days · ቀናት
- `admin.monetisation.col.level` · Level · ደረጃ
- `admin.monetisation.col.category` · Category · ምድብ
- `admin.monetisation.col.country` · Country · ሀገር
- `admin.monetisation.col.product` · Product · ምርት
- `admin.monetisation.col.creditCost` · Credits · ክሬዲቶች
- `admin.monetisation.col.createdBy` · Created by · የፈጠረው
- `admin.monetisation.col.updatedBy` · Updated by · ያዘመነው
- `admin.monetisation.col.used` · Used · ጥቅም ላይ የዋለ
- `admin.monetisation.placement.standard` · Standard · መደበኛ
- `admin.monetisation.placement.boost` · Feed boost · በፊድ ላይ ማጉላት
- `admin.monetisation.placement.top` · Top of list · የዝርዝሩ መጀመሪያ
- `admin.monetisation.kind.level` · Level · ደረጃ
- `admin.monetisation.kind.reach` · Reach · ተደራሽነት
- `admin.monetisation.defaultMarket` · Any other country · ማንኛውም ሌላ ሀገር
- `admin.monetisation.mainCategoryAny` · Every category · እያንዳንዱ ምድብ
- `admin.monetisation.countryAny` · Every country · እያንዳንዱ ሀገር
- `admin.monetisation.market.add` · Add market · ገበያ ጨምር
- `admin.monetisation.market.edit` · Edit market · ገበያ አርትዕ
- `admin.monetisation.level.edit` · Edit level · ደረጃ አርትዕ
- `admin.monetisation.product.add` · Add product · ምርት ጨምር
- `admin.monetisation.override.add` · Add override · የምድብ ጥቅም ጨምር
- `admin.monetisation.override.edit` · Edit override · የምድብ ጥቅም አርትዕ
- `admin.monetisation.override.clear` · Clear override · የምድብ ጥቅም አጥፋ
- `admin.monetisation.price.add` · Add price · ዋጋ ጨምር
- `admin.monetisation.price.edit` · Edit price · ዋጋ አርትዕ
- `admin.monetisation.price.end` · End price · ዋጋ አብቃ
- `admin.monetisation.caps.edit` · Edit caps · ገደቦች አርትዕ
- `admin.monetisation.field.nameEn` · Name (English) · ስም (እንግሊዝኛ)
- `admin.monetisation.field.nameAm` · Name (Amharic) · ስም (አማርኛ)
- `admin.monetisation.field.launchCredits` · Launch credits · የመክፈቻ ክሬዲቶች
- `admin.monetisation.field.launchDays` · Launch days · የመክፈቻ ቀናት
- `admin.monetisation.field.creditCost` · Credit cost · የክሬዲት ዋጋ
- `admin.monetisation.error.unknownKind` · Unknown product kind. · ያልታወቀ የምርት ዓይነት።
- `admin.monetisation.error.kindChange` · A product's kind cannot change; add a new product. · የምርት ዓይነት ሊቀየር አይችልም፤ አዲስ ምርት ይጨምሩ።
- `admin.monetisation.error.badName` · The English name is required; names are 80 characters at most. · የእንግሊዝኛ ስም ያስፈልጋል፤ ስሞች ቢበዛ 80 ፊደላት ናቸው።
- `admin.monetisation.error.badPhotos` · Photos at most is a whole number from 0 to 30. · ፎቶዎች ቢበዛ ከ0 እስከ 30 ያለ ሙሉ ቁጥር ነው።
- `admin.monetisation.error.unknownPlacement` · Unknown placement. · ያልታወቀ አቀማመጥ።
- `admin.monetisation.error.perksOnReach` · A reach product carries no level perks. · የተደራሽነት ምርት የደረጃ ጥቅሞች የሉትም።
- `admin.monetisation.error.unknownLevel` · Unknown level. · ያልታወቀ ደረጃ።
- `admin.monetisation.error.notMainCategory` · Pick a main category. · ዋና ምድብ ይምረጡ።
- `admin.monetisation.error.emptyOverride` · Set at least one value. · ቢያንስ አንድ እሴት ያስቀምጡ።
- `admin.monetisation.error.badCreditCost` · Credit cost is a whole number, 0 or more. · የክሬዲት ዋጋ 0 ወይም ከዚያ በላይ የሆነ ሙሉ ቁጥር ነው።
- `admin.monetisation.error.priceInUse` · This price has been used; end it and add a new one. · ይህ ዋጋ ጥቅም ላይ ውሏል፤ ያብቁትና አዲስ ይጨምሩ።
- `admin.monetisation.error.unknownReach` · Unknown reach product. · ያልታወቀ የተደራሽነት ምርት።
- `admin.monetisation.error.badFreeAds` · Free Regular ads is a whole number, 0 or more. · ነጻ መደበኛ ማስታወቂያዎች 0 ወይም ከዚያ በላይ የሆነ ሙሉ ቁጥር ነው።
- `admin.monetisation.error.launchRequired` · Turning paid levels on needs a launch bundle. · የሚከፈልባቸውን ደረጃዎች ማብራት የመክፈቻ ጥቅል ያስፈልገዋል።
- `admin.monetisation.error.badLaunch` · Launch credits and launch days are whole numbers above 0. · የመክፈቻ ክሬዲቶች እና የመክፈቻ ቀናት ከ0 በላይ የሆኑ ሙሉ ቁጥሮች ናቸው።
- `admin.monetisation.loading` · Loading… · በመጫን ላይ…
- `admin.monetisation.empty.markets` · No market rows yet. · እስካሁን የገበያ ረድፍ የለም።
- `admin.monetisation.empty.levels` · No levels yet. · እስካሁን ደረጃ የለም።
- `admin.monetisation.empty.overrides` · No per-category perks yet. · እስካሁን በምድብ የሚለይ ጥቅም የለም።
- `admin.monetisation.empty.reach` · No reach products yet. · እስካሁን የተደራሽነት ምርት የለም።
- `admin.monetisation.empty.prices` · No prices yet. · እስካሁን ዋጋ የለም።
- `admin.monetisation.error` · The monetisation settings could not be loaded. · የገቢ ማስገኛ ቅንብሮች ሊጫኑ አልቻሉም።
- `admin.monetisation.help.overrides` · A subcategory inherits its main category's row; a blank cell means the level's own value; a seasonal category ends every ad at its season's end. · ንዑስ ምድብ የዋና ምድቡን ረድፍ ይወርሳል፤ ባዶ ክፍል የደረጃውን የራሱን እሴት ያመለክታል፤ ወቅታዊ ምድብ እያንዳንዱን ማስታወቂያ በወቅቱ መጨረሻ ያበቃል።

Retired (15; EN · AM): `admin.section.plans.title` Plans · ዕቅዶች; `admin.section.plans.body` What a seller may do on each plan: reach, photos, ad lifetime and how many ads. · በእያንዳንዱ ዕቅድ ሻጭ ምን ማድረግ እንደሚችል፦ ሽፋን፣ ፎቶዎች፣ የማስታወቂያ ቆይታ እና የማስታወቂያዎች ብዛት።; `admin.section.packages.title` Packages · ጥቅሎች; `admin.section.packages.body` The promotions a seller may apply to an ad, and their prices. · ሻጭ በማስታወቂያ ላይ ሊጠቀምባቸው የሚችላቸው ማስተዋወቂያዎች እና ዋጋዎቻቸው።; `admin.overview.plans` Plans · እቅዶች; `admin.overview.plans.caption` Coverage plans · የሽፋን እቅዶች; `admin.coverage.col.label` Label key · የመለያ ቁልፍ; `admin.coverage.field.label` Label key · የመለያ ቁልፍ; `admin.coverage.field.labelHint` The translation key that names this plan on screens. · ይህን ዕቅድ በማያ ገጾች ላይ የሚሰይመው የትርጉም ቁልፍ።; `admin.coverage.error.badLabelKey` A label key is lower-case letters, digits, dots and underscores. · የመለያ ቁልፍ ትንንሽ የላቲን ፊደላት፣ አኃዞች፣ ነጥቦች እና ከስር መስመሮች ነው።; `admin.packages.col.tier` Tier · ደረጃ; `admin.packages.field.tier` Tier · ደረጃ; `admin.packages.field.label` Label key · የመለያ ቁልፍ; `admin.packages.error.unknownTier` Pick Featured or Premium. · የተለየ ወይም ፕሪሚየም ይምረጡ።; `admin.packages.error.badLabelKey` (the same text as coverage's).

Reused P-1 keys (no new text): `admin.packages.error.*` (denied, stepUp, rateLimited, badKey, badDays, unknownPackage, unknownCountry, unknownCategory, unknownCurrency, badAmount, badWindow, overlap, notFound, alreadyEnded, unknown), `admin.packages.prices.*` (everyMarket, everyCategory, free, open, end.title, end.body), `admin.packages.on` / `.off` / `.noDelete` / `.edit.title` (the reach editor's title), `admin.packages.col.*` and `admin.packages.field.*` that survived (key, days, enabled, selfServe, extends, sort, amount, currency, from, to), `admin.coverage.*` (the caps columns and fields, `everywhere.yes` / `.no`, `unlimited`, the five plan errors), `common.save`, `common.cancel`, `prim.date.*`. Needed beyond the list, NOT added (§10): `admin.monetisation.error.overrideNotFound` — "That override no longer exists." — its Amharic is the supervisor's.

`bun run i18n:usage` run after the last `t(` change and after the spec's catalogue reads; both maps committed (`96040f05c`, `a380a6318`); the checks' `i18n-usage-map › Assert no drift` PASS.

## 9. Migrations

None written this turn. Turn (a)'s four (applied on ethio-staging by the supervisor before ruling 4; their
proofs raised `p1b-m?-proof-ok`), unchanged since stop-1, sha256 on `44f63997f`:

- M-a `supabase/migrations/20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql` — `530adcb776ee20bb5bb147331376a64f9e21576efbe2d1991132f5ed2f37f253` — mark `20261103160000` — `apply 1fc03fef → expect mark 20261103160000` (applied).
- M-b `…040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql` — `2630ef7b850e30f18d227aa1976ace743aafdbaab67fcf393ee2fb34ec25dffd` — mark `20261103170000` — applied.
- M-c `…040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql` — `77bbd0eb3a153eb334f71df446adb40b8a6e0959f6afb4252665b7d20d398f90` — mark `20261103180000` — applied.
- M-d `…040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql` — `01fb57808259aea6dfb82a06fd8001ad171a4bf0ef7c144ea13a3515f8b4c38a` — mark `20261103190000` — applied.

## 10. Departures

1. **`not found` has no key.** `admin_clear_level_override`'s one refusal (M-a :395) falls to
   `admin.packages.error.unknown` with the door's words under it (MNS-6 pins this). The key it wants,
   `admin.monetisation.error.overrideNotFound` "That override no longer exists.", is beyond ruling 4's list
   of 77; its Amharic is left to the supervisor (ruling 4 §2b: "a key you need beyond the list is a
   departure: name it with its English"). Roadmap :7.
2. **CF-LEVEL-1's allowlist `until` is a date** (`2027-03-31`) on all 12 lines: ruling 4 §3 says "until =
   P-2's fold", and `kit.ts` admits `YYYY-MM-DD` or `INC-n` / `DEC-n`; no DEC names P-2's fold yet, so a
   date was the grammar's only honest form. The supervisor may replace it with P-2's DEC.
3. **"Redirect size" for `/admin/packages` and `/admin/coverage`** (ruling 4 §3 budgets): a route whose
   only code is a `beforeLoad` redirect has no component chunk and is NOT in the build's route manifest, so
   `check-bundle-size.mjs` refuses a ceiling for it ("a ceiling for a page the build does not have"). Their
   two lines are removed — the "redirect size" is no first download at all — and the note sits on
   `/admin/monetisation`'s line.
4. **Four ceilings raised** by DEC-296's form, each cause on its line and measured against the base tree
   built at 02cbc6746: `/admin/listings_/$listingId` 388.3 → 389.3 (+1.0: en-admin +0.78 — the admin
   strings layer's 74 − 15 keys; move-reasons −0.53 / reason-note +0.46 re-split; index −0.05), 389 → 390;
   `/admin/roles_/$roleId` 314.6 → 315.4 (en-admin +0.78), 315 → 316; `/admin/translations` 402.9 → 404.7
   (en-admin +0.78, am-admin +0.96), 404 → 406; `/my-listings_/$listingId_/edit` 404.4 → 404.6 (the lucide
   `Package` icon now a 0.25 KiB chunk of its own, the re-split, index −0.05), at the band's edge (405 −
   404.7 judged = 0.3), 405 → 406. Every other page: within +0.3 KiB of the base and ≥ 0.4 KiB under its
   ceiling (the full per-page diff was read; `/admin/attributes` +0.3, `/admin/countries` +0.3, `/admin/ai`
   +0.2, `/admin/categories` +0.2, `/admin/places` +0.2, `/admin/impersonation_/$sessionId` +0.2, `/post` and
   `/post_/$listingId` +0.1, `/admin/listings` +0.1, `/admin/screening` +0.1; `/admin/locations` −1.3 (the
   coverage service and hook gone)). Public pages (`/`, `/$name`, `/c/$slug`, `/l/$slug`, the legal pages,
   `/auth*`): −0.1 or 0.0 — growth ≤ 0.1 KiB as the ruling allows, the cause the two routes leaving the route
   tree. The entry: 212.5 / 213 KiB, unchanged.
5. **No `monetisation-table.tsx` wrapper.** A wrapper was written and deleted before the commit:
   `scripts/admin-tables.ts` judges each file that draws `<DataTable` for the whole shape (TableActions,
   TableToolbar, ColumnsButton + useHiddenColumns, DataTablePagination + useKeptPage, RowActions, the
   card title), so each section inlines the shape. TBS-1's floor of 14 search slots — the two deleted
   consoles held one each — is met by the Prices block's search (`monetisation-prices-search`, the title
   and the currency).
6. **Props named `labelKey` / `helpKey` / `titleKey`** for key-typed props (`check-hardcoded-strings.sh` is
   a plain grep for `label="…"` and friends).
7. **MON-15 writes on a scratch plan**, the free plan only read (ruling 1 §3d says "round-trips every
   stored field of the free plan"; ruling 4 §3's fixtures rule says real rows are only read — the second
   governs: the free plan's editor is proven to open on every stored dial and Cancel leaves the row equal;
   the write proof — every field and `label_key` untouched — lands on `e_probe_mon_caps_…` seeded with a
   label key).
8. **Reused titles**: the reach editor's title is `admin.packages.edit.title` ("Edit package" at P-1), the
   level editor's `admin.monetisation.level.edit`; the yes/no cells reuse `admin.coverage.everywhere.yes` /
   `.no`; the caps block's columns reuse `admin.coverage.col.*` — no key beyond the 77 was coined.
9. **`e2e/admin-roles.spec.ts` unchanged** (RP-17's words did not change: the `packages` resource heading
   is the same), re-run as ruling 1 §4 asks; RP-8's local red is a pre-existing base flake (§5, §12).
10. Rulings in the turn: ruling 4 (the continue ruling: base, the two files, the §3 binding points, the
    report's §4). No STOP in turn (b).
11. Ruling 1 §4 named `e2e/helpers/pool-reset-map.ts` and `src/routes/admin.tsx (sectionForPath)` in
    scope: the first was done in turn (a) (`level_overrides`, `market_settings`, `package_prices`,
    `listing_packages` EXEMPT lines), the second needed no change (`sectionForPath` reads `sections.ts`
    generically; the spec's MON-1 and `admin-shell.spec.ts` prove the breadcrumbs and the menu).

Self-review (rule 80) findings, all MINOR: (i) the `"ET"` / `"ETB"` literals in `monetisation-service.test.ts`
fixtures; (ii) `seedPrice`'s `?? 0` fixture default; (iii) departure 1 (`not found` to the fallback); (iv)
departure 2 (a date `until`); (v) `e2e/admin-monetisation.spec.ts` is 1,483 lines — one spec file for one
area, the harness's shape, over the ~300-line guidance that binds source files. No BLOCKER, no MAJOR.

## 11. CI

The base, dev `8ae1bec5`: `gh run list --branch dev --workflow CI` → run `41567593377`, `push`, completed
**success** (2026-11-03T02:40:45Z). The ci-evidence files (`git fetch origin ci-evidence`;
`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`) describe a different run and are
STALE for the base by the two-step check:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `02cbc67468b82a07b7d15989361bba6673e1a837` (short `02cbc67`)
- Conclusion: **CANCELLED**
- Completed (UTC): 2026-11-03T06:49:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41589975179
```

That run is the draft PR #13's on turn (a)'s head `02cbc6746` (its merge commit `610250df6` in
`e2e-last-failure.md`): lanes 2 and 10 red with 18 gating failures, ALL of them `admin-packages.spec.ts`
PKG-1 → PKG-9 on both twins (the P-1 console against the M-a/M-b doors — class (c), the red the task named
as expected between the migration stop and this turn; the spec is now deleted); every other lane and job
green. No earlier turn's red was fixed in this turn. The pull request's checks on `44f63997f` and any red
of its own runs are written here after the push (`gh pr checks 13`), with the final "every check green"
line in the pull request's comment, not here.

## 12. Limits

- **Mac-only checks reds**: `actionlint_1.7.7_linux_amd64` and `gitleaks_8.24.3_linux_x64` are Linux
  binaries the checks runner pins; on this Mac they do not run, so `Workflow lint` and `Secrets scan` FAIL
  without a verdict (no workflow file changed this turn; the staged diff was read for key-, secret-, token-
  and password-shaped text before every commit — none). NH-6 (`scripts/ci/nightly-hour.test.ts`) fails on
  macOS because `TZDIR` is ignored (INC-962's own test). CI's Ubuntu runs of all three are the judge.
- **The `dependency-audit`, `e2e-preflight`, `e2e` and `promote` jobs** did not run locally (§5 names why);
  CI judges.
- **RP-8 (`admin-roles.spec.ts`) is red locally on both the tree and the base** with INC-173b's message
  ("the device language record never reached am") on `/admin/roles`; it passed on one twin in each run and
  failed on the other, and it does not touch a path this turn changed. It is not fixed here (its root is the
  language record's write after a pick on that page, outside scope); CI's lane and the repeat lane judge.
  No other red in the six local spec runs.
- **The browser cache**: this Cursor shell sets `PLAYWRIGHT_BROWSERS_PATH` to a sandbox cache that holds no
  browser; the runs above unset it (`env -u PLAYWRIGHT_BROWSERS_PATH`) so the harness's own guard resolved
  the installed `chromium-1208`. Nothing else in the command changed.
- **Budgets were measured locally** (`ceilingForLocal`); CI's sizes read about 0.1 KiB over local — the
  four raised pages and `/admin/monetisation` were set by that form, and §10.4 names every page that moved.
- **Rendered-output acceptance** (the look at 360 / 768 / 1024 / 1280 beyond `expectNoHorizontalOverflow`
  and axe) belongs to the operator's walk; this turn proves structure, typecheck, tests and the guards.
- No secret was printed, read or written; the E2E values were tested by name only
  (`[ -n "$E2E_SUPABASE_URL" ] && echo set` → set).
