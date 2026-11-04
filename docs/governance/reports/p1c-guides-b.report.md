# P-1c turn (b) — the Guide on the pages people use (D315) — report
Base: eb72f3bdf · Final commit: 081a8f7fa · Brief: docs/governance/briefs/p1c-guides-b.md (no sha256 given; rulings: p1c-guides-b-ruling-1.md, p1c-guides-b-ruling-2.md)
Review: NOT READY · 1 BLOCKER · 0 MAJOR · 2 MINOR · on 081a8f7fa

The BLOCKER is outside SCOPE and is this report's stop (§10, §12): `e2e/user-guides.spec.ts` is
reachable from no area of `scripts/e2e-select.ts`, so CI's "e2e selector self-test" step and the
two vitest copies of it (`scripts/e2e-select.test.ts`, in the laws and the component tests) are
red on every commit of this branch. The fix is one area line in a file the plan did not name.

## 1. Done / not done, by part and step

The build ran on ruling 1 (plan approved, eight answers) and ruling 2 (the four questions of stop
1). CI for the base, read first (§11): `eb72f3bdf` SUCCESS.

- **b1 — the page form and the first pages** (commits `abdcfe65f`, `f6f286b8b`): DONE.
  `PageGuide` (`src/components/shell/page-guide.tsx`: a ghost touch button, nothing else on the
  first paint; the first tap fetches the sheet and mounts it for good), the one sheet
  `guide-sheet.tsx` (`GuideSheetContent` for the table form, `PageGuideSheet` for the page form;
  `returnFocusTo`), the parts grammar in `block-guide-sheet.tsx` (`partsKind`, `GuidePart`
  named all-or-none, `partsPrefix`, `aria-current="step"`), the route next (`GuideNext | { to:
  GuideRoute; hash? }`, `resolveGuideNext(next, permissions | null)`, `useAdminShellIfAny`),
  `PageHeader`'s `guide` slot; the Guide on My listings (the table's tile), the listing page,
  the posting and edit wizards (`wizard-guide.ts`: one guide, the eight steps as parts, the
  current step marked; the admin's edit draws none — answer 3, answer 5), Account and Settings
  (answer 2's next pair).
- **b2 — the public pages** (commit `2082301fc`): DONE. The ad page (next → `/post` in both
  sign-in states, answer 4; the control in `listing-detail.tsx`'s actions row, ink by tier), the
  feed (`/`, `/c/$slug`), the seller page, sign-in, Saved. `prim.guide.*` to the base layer
  (CF-SL-1; confirmed by ruling 2 §2).
- **The guard and the strings** (commit `0b349e319`): DONE. CF-GUIDE-1 widened over the routes
  (`admin-guides.ts` + `admin-guides-read.ts`; `ROUTES_WITHOUT_GUIDE` each with its reason,
  answer 6; CFG-4…7); the admin allowlist's until → 2026-11-24 (answer 7); 84 keys EN + AM (§8),
  the four column-less keys left out (ruling 2 §3).
- **The browser spec** (commit `0e40a9e43`): DONE. `e2e/user-guides.spec.ts` UG-1…UG-9; its UG-6
  found the page form's close returning the focus nowhere (Radix focuses a trigger the page form
  has none of) → `returnFocusTo`.
- **Stop 1** (commit `724fc819c`): the measured growth beyond §4; ruling 2 answered.
- **Ruling 2 (a)** (commit `34962c035`): DONE. `guide-spec.ts` — the contract both forms import
  and neither imports the other (BG-7 pins it); the 24 DataTable pages lose the page form's chunk.
- **Ruling 2 (b), (c)** (commit `b0e6e8ed6`): DONE. 48 page ceilings and the entry's moved by
  `ceilingForLocal`, each line with its cause (§3, the measured table).
- **Docs** (commit `979a92c09`): DONE. `docs/features/admin-guide.md` (the mechanism rewritten
  for both forms, §Turn (b)), register row 107 (row 104 grown), the changelog line, roadmap line 3.
- **The checks, the browser check, the self-review** (§5, §10): run; one BLOCKER outside SCOPE.
- NOT DONE: the pull request marked ready and its CI green — blocked on the `e2e-select.ts`
  area (§12). The pull request stays a draft.

## 2. Files changed

`git diff --name-only eb72f3bdf` — 48 paths (the brief, the two rulings and stop 1 included):

```
docs/_changelog.md
docs/features/admin-guide.md
docs/generated/i18n-usage.json
docs/governance/briefs/p1c-guides-b-ruling-1.md          (A)
docs/governance/briefs/p1c-guides-b-ruling-2.md          (A)
docs/governance/briefs/p1c-guides-b.md                   (A)
docs/governance/mechanisms.md
docs/governance/reports/p1c-guides-b.stop-1.md           (A)
e2e/user-guides.spec.ts                                  (A)
public/i18n-usage.json
roadmap.md
scripts/check-bundle-size.mjs
scripts/conformance/admin-guides-allowlist.txt
scripts/conformance/admin-guides-read.ts                 (A)
scripts/conformance/admin-guides.test.ts
scripts/conformance/admin-guides.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/route-budgets.mjs
src/components/layout/page-header.tsx
src/components/marketplace/feed.tsx
src/components/shell/block-guide-sheet.tsx
src/components/shell/block-guide.test.tsx
src/components/shell/block-guide.tsx
src/components/shell/guide-sheet.tsx                     (A)
src/components/shell/guide-spec.ts                       (A; ruling 2 §1a)
src/components/shell/page-guide.test.tsx                 (A)
src/components/shell/page-guide.tsx                      (A)
src/features/account/account-overview.tsx
src/features/account/saved-page.tsx
src/features/admin/admin-context.tsx                     (ruling 2 §4: that one export)
src/features/admin/guide-next.test.ts                    (A)
src/features/admin/guide-next.ts                         (A)
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/wizard-guide.test.ts                (A)
src/features/posting/wizard-guide.ts                     (A)
src/features/posting/wizard.tsx
src/features/seller/seller-page.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/am-guide.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/routes/auth.tsx
src/routes/l.$slug.tsx
src/routes/settings.tsx
```

Every (A) path answers `git ls-files --error-unmatch` (run on the twelve new files). Every path
is in plan §8's SCOPE, the standing allowance, or named by ruling 2 (`guide-spec.ts`,
`admin-context.tsx`). `src/features/admin/guide-next.ts` was listed as "(+test)" and is one
module with its test. No file was deleted.

## 3. Behaviour contract — before → after

| Screen / function | Base `eb72f3bdf` | This tree |
| --- | --- | --- |
| `/` and `/c/$slug` (the feed heading row) | the place heading, the star | + one `Guide` button at the row's end (`feed-guide`); its sheet: What this is · Each part (heading, favourite, sections, card, more, a plain list) · How · next → `/post` |
| `/l/$slug` (the ad page's actions row) | Save, Share, the count | + the Guide button last (`adPage-guide`, the tier's ink); eight parts; next → `/post` signed out and in; the preview (`listing-detail` without `guide`) unchanged |
| `/$name` (the seller page) | the h1 alone | h1 in a flex row with the Guide (`sellerPage-guide`); two parts; next → `/` |
| `/auth` | the h1 alone | h1 in a flex row with the Guide (`auth-guide`); five parts; title follows sign-in / create account; next → `/` |
| `/account` | `PageHeader` title | `PageHeader guide=` (`account-guide`); four parts; next → `/settings` |
| `/settings` | `PageHeader` title | `PageHeader guide=` (`settings-guide`); five parts; next → `/account` |
| `/account_/saved` | `PageHeader` title | `PageHeader guide=` (`saved-guide`); three parts; next → `/` |
| `/my-listings` (the table) | `DataTable` without `guide` | `guide={{ prefix: "myListings", next: { to: "/post" } }}`: the tile in the toolbar's end group, one line per shown column (six) |
| `/my-listings_/$listingId` | `PageHeader` title | `PageHeader guide=` (`myListing-guide`); five parts; next → `/my-listings` |
| `/post`, `/post_/$listingId`, `/my-listings_/$listingId_/edit` (the seller's wizards) | the h1 alone | h1 in a flex row with ONE Guide (`post-guide` / `post-edit-guide`); the eight steps as named parts (`dl`), the current step `aria-current="step"`; the edit wizard's lines under `post.guide.part.*`; next → `/my-listings` |
| `/admin/listings_/$listingId_/edit` (the admin's edit) | the h1 alone | unchanged: `edit.actor === "admin"` draws no Guide |
| `PageHeader` | `actions` (hidden below md) | + `guide?: ReactNode` at the title row's end at every width; the mobile actions bar unchanged |
| `BlockGuide` (admin tables) | control + `Sheet` in `block-guide.tsx`; body `columns` | same control, same testids, same four parts; the sheet is `GuideSheetContent` (`guide-sheet.tsx`), the body takes `parts` + `partsKind="columns"`; icon, anchor and name key from `guide-spec.ts` |
| `block-guide-sheet.tsx` | `useAdminShell()` (throws outside the shell); `columns` → `dl` | `useAdminShellIfAny()` (null outside); `parts` named → `dl`, unnamed → `ul`; `partsPrefix`; `aria-current` |
| `resolveGuideNext(next, permissions)` | section form only; `permissions: readonly string[]` | + route form `{ to, hash? }` → `{ to, hash, allowed: true }`; `permissions \| null`, null → the landing for a section form |
| `useAdminShell()` | throws outside the provider | unchanged; `useAdminShellIfAny()` added beside it |
| `prim.guide.open/what/columns/how/next` | member layer | base layer (CF-SL-1); `prim.guide.parts` new, base |
| CF-GUIDE-1 | admin tables only | + every `src/routes/*.tsx` outside `ROUTES_WITHOUT_GUIDE` reaches exactly one Guide; page specs and parts read; `unclaimed` says "no block or page" |
| `scripts/route-budgets.mjs` / the entry | the base's ceilings | 48 lines + the entry moved by `ceilingForLocal`, causes on each line (below) |

The measured table (base `eb72f3bdf` → stop 1's tree → after ruling 2 (a); gzipped KiB, local
builds in sequence on the same `node_modules`, `node scripts/check-bundle-size.mjs`):

| page | base | stop 1 | after (a) | growth | cause (the line's note) |
| --- | --- | --- | --- | --- | --- |
| `/`, `/c/$slug` | 230.9 | 233.6 | 233.8 | +2.9 | the control + its preload list (page-guide 1.5, guide-spec 0.2), the artefact |
| `/l/$slug` | 261.2 | 263.5 | 263.7 | +2.5 | same |
| `/$name`, `/account_/saved` | 228.8 | 231.6 | 231.7 | +2.9 | same |
| `/account` | 273.3 | 276.0 | 276.1 | +2.8 | same |
| `/settings` | 278.9 | 281.7 | 281.8 | +2.9 | same |
| `/auth` | 225.4 | 228.1 | 228.3 | +2.9 | same |
| `/post`, `/post_/$listingId` | 404.6 | 407.0–407.1 | 407.2 | +2.6 | same |
| `/my-listings_/$listingId_/edit` | 404.7 | 407.1 | 407.3 | +2.6 | same |
| `/admin/listings_/$listingId_/edit` | 410.1 | 412.5 | 412.7 | +2.6 | same (the wizard module carries the control; the admin's edit draws none) |
| `/my-listings_/$listingId` | 325.2 | 327.4 | 327.6 | +2.4 | same |
| `/my-listings` | 319.0 | 322.3 | 320.9 | +1.9 | the one sheet split out of data-table (+0.6), guide-spec 0.2, the artefact |
| 19 admin DataTable pages, `/dev/primitives`, `/dev/style` | — | +3.2…3.3 | — | +1.9…2.0 | same |
| `/admin/screening` | 370.2 | 373.0 | 371.6 | +1.4 | same (its listing-detail chunk −0.5) |
| `/admin/roles_/$roleId` | 318.0 | 321.3 | 321.3 | +3.3 | K2: `permission-matrix.tsx` imports `en` whole → en-guide +2.3; the artefact |
| `/admin/listings_/$listingId` | 391.9 | 394.7 | 394.7 | +2.8 | K2: `listing-page.tsx` imports `en` whole → en-guide +2.3; the artefact |
| `/admin/translations` | 412.1 | 420.6 | 419.2 | +7.1 | K2: `languages-page.tsx` imports `en` and `am` whole → +5.2; the sheet split; the artefact |
| 18 unguided pages (legal, auth callback/reset, `/admin`, `/admin/`, `/admin/images`, the legal consoles, `/admin/locations`, `/admin/users_/$userId`, `/dev/tall`) | — | +1.0 | +1.0…1.1 | +1.0 | the artefact only |
| the entry | 212.6 | 213.6 | 213.6 | +1.0 | the dependency map's new chunks; `prim.guide.*` in the base catalogue; index.js −0.6 |

Against stop 1's table (ruling 2 §1d): the DataTable pages fell by the 1.3 KiB predicted
(+3.3 → +2.0); the page-form pages grew 0.1–0.2 beyond stop 1's numbers — `guide-spec.js` is a
chunk of its own (0.2) because two entry graphs share it, the price of (a) itself. Named as a
departure (§10). Stop 1's "20 admin DataTable pages" bucket hid two pages of another class:
`/admin/roles_/$roleId` and `/admin/listings_/$listingId` are not table pages but whole-catalogue
importers (the same K2 cause ruling 2 §1c carries for `/admin/translations`); corrected here.

## 4. Censuses

- Every consumer of the Guide types and helpers (`rg "shell/(page-guide|block-guide|guide-sheet|block-guide-sheet|guide-spec)"` over `src/`, `scripts/`, `e2e/`): the nine page consumers import `PageGuide` + types from `page-guide.tsx`; `data-table.tsx:13` imports `BlockGuide, guideAnchor` from `block-guide.tsx`; `guide-sheet.tsx:9`, `block-guide-sheet.tsx:9`, `block-guide.tsx:7–10`, `page-guide.tsx:7–15` from `guide-spec.ts`; `wizard-guide.ts:1` types from `page-guide.tsx`; `admin-guides.test.ts:96` `PageGuide`. No module imports `page-guide` from `block-guide` or the reverse (BG-7).
- `BookOpen` outside the Guide (`rg BookOpen src`): `config/panels.ts:4,206,207`, `category-glyphs.ts:15,170`, `category-icon-names.ts:31` — category glyphs, not a guide control.
- `useAdminShell(` outside `src/features/admin/**`: 13 callers (`admin.index.tsx:38`, `admin.listings_.$listingId_.edit.tsx:72`, the ten admin feature pages, `listing-page.tsx:130,933`) — all inside the admin shell; none needs the nullable reader.
- Routes without a Guide (`ROUTES_WITHOUT_GUIDE`): `admin*` (the admin blocks' own, turn (c)), `dev.*` (not a person's page), `auth_.callback` and `auth_.reset` (one-moment screens), `account_.legal*`, `legal.*`, `privacy`, `terms` (legal texts, `LegalText`). CFG-6 asserts the list and each reason.
- My listings' columns (`my-listings-page.tsx`, the `columns` array): photo, title, price, state, posted, expires — six; `open`, `share`, `copy`, `category` are row verbs or facts, not columns (ruling 2 §3).
- `.guide.` keys named outside the layer (CF-GUIDE-1's `astray`): none — the consumers' hits (`rg "\.guide\." src --glob '!src/i18n/**'`) are comments naming the prefix.
- The usage map: `scanned` 672 → 673 (`guide-spec.ts`); every `prim.guide.*` call is a literal (`t("prim.guide.open" satisfies GuideOpenKey)`), so its surfaces stay attributed.
- `e2e-select.ts` areas naming guide files (`rg guide scripts/e2e-select.ts`): `admin-guides` (`block-guide*.tsx`, `order-strip.tsx`, `guide-next.ts`, `*-guide.ts` → `admin-guides.spec.ts`); nothing names `page-guide.tsx`, `guide-sheet.tsx`, `guide-spec.ts`, `wizard-guide.ts` or `e2e/user-guides.spec.ts` — the BLOCKER (§12).

## 5. Tests

Added: `page-guide.test.tsx` PG-1 (the control alone on the first paint), PG-2 (the first tap
mounts the sheet, Each part, `partsPrefix`, the guide layer asked for), PG-3 (the route next with
no admin shell; the sheet stays mounted shut; the focus returns to the control — red before
`returnFocusTo`, green after), PG-4 (unnamed parts draw as a list, the current one marked);
`block-guide.test.tsx` BG-6 (one name, icon and dialog contract in both forms), BG-7 (neither
form imports the other, both import `guide-spec.ts`); `guide-next.test.ts` GN-3; `wizard-guide.test.ts`
WG-1, WG-2; `admin-guides.test.ts` CFG-4…CFG-7 (planted pages: a route without a guide is found,
a conditional spec passes, a non-literal part key / a next outside the register / a missing line
are each found, the exclusions, a type-only import is not followed); `e2e/user-guides.spec.ts`
UG-1…UG-9. Changed: BG-1…BG-5 re-pointed from `columns` to the parts grammar (same assertions);
CFG-3 counts 7 table prefixes, 10 page prefixes, 13 routes. The stub seams are the test's own
(`vi.mock` of the admin context, the strings gate and the layer loader); no real row.

Unit, the touched files (`bunx vitest run` on page-guide, block-guide, guide-next, wizard-guide,
admin-guides, holds-its-box, strings-layers, wired, admin-tables): 9 files, 43 passed. The laws
(`bunx vitest run scripts --maxWorkers=2`, inside THE CHECKS): 89 files — 87 passed, 2 failed:
NH-6 (macOS, pre-existing, §12) and `e2e-select.test.ts › every spec is reachable` (the
BLOCKER). Component tests (inside THE CHECKS): 436 files, 2710 tests — 2708 passed, the same 2
failed. `bun run typecheck`: clean. `bun run lint`: 0 errors, 46 warnings (the pre-existing
class). `bun run format:check`: clean.

THE CHECKS (`bun run checks`, once, on `0cf2df2a9`'s code tree — the later commit changes one
comment): fast line `FAIL laws-first › scripts/ tests first (INC-1030) (54s)`; last line
`checks: 23 PASS · 5 FAIL · 30 NOT RUN · 303s`. The five FAILs, each read in its log: `laws-first`
(NH-6 + e2e-select, above); `build-and-check › Workflow lint (actionlint, pinned)` — the pinned
Linux binary on macOS (no workflow changed); `component-tests` (the same two); `secrets-scan
(gitleaks, pinned)` — the pinned Linux binary (before each commit I read `git diff --cached` for
key-, secret-, token- and password-shaped text and found none); `i18n-usage-map › Assert no
drift` — the maps regenerated (`scanned` 673), committed in `0cf2df2a9`, so this one is fixed.
`bundle-budget › Check the first-paint budget` PASS; `the NEAR band (R4)` PASS ("0 NEAR, none
grew"); migration-lint, string-scan, import-gate, listing-write-seam, browse-path-guard,
marketplace-weight, semgrep (self-test and scan) PASS. The 30 NOT RUN: 8 behind the two Mac reds
(typecheck, format, lint, root route names, build, bundle report — each run by hand on this tree
and clean; the e2e selector self-test — run by hand, RED, the BLOCKER; `changed folders' unit
tests` and `Semgrep ERROR` — the unit tests run by hand above), 3 installs the runner skips, 2
dependency-audit (the advisory service unreachable from the sandbox), 4 e2e-preflight (staging
credentials the script never holds), 6 e2e merges (GitHub artifacts), 4 promote (only CI
promotes), 2 semgrep uploads (GitHub only), 1 bundle-budget install.

THE BROWSER CHECK (`bun run e2e:local`, ethio-staging, both projects, 2 workers, 0 retries):
(i) before stop 1, `e2e/user-guides.spec.ts` whole: 18 passed (9 × 2). (ii) After ruling 2, on
`0cf2df2a9`'s tree, twenty specs in one run — the two guide specs and the specs of every changed
screen (`user-guides`, `admin-guides`, `ad-page-layout`, `ad-page`, `sage-ad-page`,
`feed-screens`, `feed-index`, `settings`, `account-saved`, `my-listings-page`, `my-listings-ad`,
`post-wizard-bundle2`, `seller-name-hidden`, `auth-signup`, `a11y`, `layout`, `shell-table-law`,
`page-head`, `i18n-layers`, `i18n-coverage`), 377 tests: `4 failed · 22 skipped · 351 passed
(22.3m)`. The four failures are two tests in both projects — MLA-13 (`my-listings-ad.spec.ts:1017`,
the price field read `90100` after `Control+A` + typing) and MLP-6 (`my-listings-page.spec.ts:664`,
the search not cleared after `Control+A` + Backspace) — the recorded macOS artefact (`Control+A`
is not select-all in Chromium on a Mac; `walk-w3.report.md` §5 names MLP-6 by it, `p1-packages.report.md`
the class); their failing lines are the presses at `:1008/:1024/:1044` and `:662`, no Guide in
the path, and both passed in every CI lane on `724fc819c` (§11). The 22 skipped are the specs'
own skips: the three `email-serial` sign-up tests (the mail sink CI alone holds) and per-project
skips in `ad-page`, `sage-ad-page`, `feed-screens`, `layout` and `i18n-coverage` (one width's
cases). `[ssr-error]` in the server log:
0 lines (`rg -c`); `[slow-rpc]`: 0. The selector names 69 of 114 specs for this change (the
shared shell files); the rest ran in the pull request's lanes on `724fc819c`, every lane green
(§11).

J-audit (e2e/** changed): UG-1…9 use `adPageFixtures` (scratch seller and ad, removed by the
harness), `signInViaSession`, `switchLanguage`; no `page.route` handler (so no `whilePageLives` owed);
locators by testid, no `.first()`, no `waitForTimeout`, no `test.only` (`rg` over the file); the
guide chunk's absence on the first paint is asserted on a `page.on("request")` listener
(`GUIDE_CHUNK`), then its presence after the first tap.

## 6. K2 — siblings that bypass the mechanism

- The three whole-catalogue importers — `src/features/admin-listings/listing-page.tsx:28`,
  `src/features/admin/roles/permission-matrix.tsx:7`,
  `src/features/admin/translations/languages-page.tsx:28–29` — carry `en-guide` (and `am-guide`)
  in their first download, +2.3 KiB per catalogue this turn and more with every guide turn
  (ruling 2 §1c: carried with the cause; the fold is roadmap line 7). Outside SCOPE; not touched.
- `scripts/e2e-select.ts:176–184` — the `admin-guides` area names `block-guide*.tsx` only; the
  page form, the sheet, the contract and the wizard guide match no area (so the selector says
  ALL for them, which over-selects safely) and `e2e/user-guides.spec.ts` is in no area's `specs`
  (which the self-test refuses). Outside SCOPE; the BLOCKER.
- The admin's edit wizard (`wizard.tsx`, `edit.actor === "admin"`) draws no Guide: the admin
  listing console's own guide is turn (c)'s (`admin-guides-allowlist.txt`).
- Greps run: `rg "shell/(page-guide|block-guide|guide-sheet|block-guide-sheet|guide-spec)"`,
  `rg BookOpen src`, `rg "useAdminShell\(" src`, `rg "from \"@/i18n/locales/(en|am)\"" src`
  (the three importers above; every other hit is a test), `rg guide scripts/e2e-select.ts`.

## 7. Allowlists and guards

- `scripts/conformance/admin-guides-allowlist.txt`: 16 → 16 lines; every line's reason and until
  rewritten `guide owed in turn (c) | 2026-11-24` (answer 7); the header names both forms.
- `scripts/conformance/holds-its-box-allowlist.txt`: 13 → 14. The turn (a) line
  `block-guide.tsx#BlockGuideSheet` re-keyed to `guide-sheet.tsx#BlockGuideSheet` (the module
  moved; same reason, until 2027-05-01); new: `page-guide.tsx#PageGuideSheet | the page Guide's
  sheet draws in a portal on the top layer, out of the page's flow (D315) … | 2027-05-01`.
- CF-GUIDE-1 widened (CFG-4…7 on planted trees; `wired.test.ts` names `admin-guides` and, through
  CFG-7's import, `admin-guides-read`); CF-ADOPT-1 (kit import), CF-WIRED-1, HB-1, CF-SL-1,
  `admin-tables.ts` T10 and `on-demand-failure` all green on this tree (inside the laws run).
- No new allowlist line anywhere else; no `until` extended but the sixteen above.

## 8. Strings

New keys, EN + AM in the same change. `src/i18n/locales/en-guide.ts` / `am-guide.ts`: +84 each;
`en-base.ts` / `am-base.ts`: +6 (`prim.guide.open/what/columns/how/next` moved from the member
layer, `prim.guide.parts` new); `en-member.ts` / `am-member.ts`: −5. The Amharic is the
supervisor's file `~/Downloads/p1c-am-strings-b.md` (sha256
`7ce74aa6902668c580916c17cbb157a20d579a257ca19c8e88d727c742509199`, compared), copied by key;
none of it is mine. Not used: four keys the census over-counted
(`myListings.guide.col.open/share/copy/category`; ruling 2 §3). `bun run i18n:usage` run; both
maps committed. The plan's §2 note placing `prim.guide.*` in the guide layer is superseded by
CF-SL-1's placement (ruling 2 §2).

| key | EN | AM |
| --- | --- | --- |
| `adPage.guide.what` | This is one ad. The photos, price, details and place are the seller's own words; ethio.com checks ads but cannot see the item for you. | ይህ አንድ ማስታወቂያ ነው። ፎቶዎቹ፣ ዋጋው፣ ዝርዝሮቹ እና ቦታው የሻጩ የራሱ ቃላት ናቸው፤ ethio.com ማስታወቂያዎችን ይፈትሻል ነገር ግን ዕቃውን ለእርስዎ ማየት አይችልም። |
| `adPage.guide.part.photos` | Tap a photo to see it large. Swipe for the next one. | ፎቶን በትልቁ ለማየት ይንኩት። ለቀጣዩ ያንሸራትቱ። |
| `adPage.guide.part.title` | The name and the asking price. A price marked negotiable can be discussed. | ስሙ እና የሚጠየቀው ዋጋ። «ድርድር ይቻላል» የተባለ ዋጋ ሊወያይበት ይችላል። |
| `adPage.guide.part.facts` | The main facts, then every detail the seller gave. | ዋና ዋናዎቹ እውነታዎች፣ ከዚያም ሻጩ የሰጠው እያንዳንዱ ዝርዝር። |
| `adPage.guide.part.description` | What the seller wrote, in their words. | ሻጩ የጻፈው፣ በራሱ ቃላት። |
| `adPage.guide.part.seller` | Who posted it and since when. Sign in to see how to reach them; the ad does not show a phone number in the text. | ማን እንደለጠፈው እና ከመቼ ጀምሮ። እንዴት እንደሚያገኟቸው ለማየት ይግቡ፤ ማስታወቂያው በጽሑፉ ውስጥ ስልክ ቁጥር አያሳይም። |
| `adPage.guide.part.location` | The place the item is in or the service covers. | ዕቃው የሚገኝበት ወይም አገልግሎቱ የሚሸፍነው ቦታ። |
| `adPage.guide.part.save` | Save keeps the ad on your Saved page. Share sends its link. | «አስቀምጥ» ማስታወቂያውን በተቀመጡ ገጽዎ ላይ ያቆየዋል። «አጋራ» አገናኙን ይልካል። |
| `adPage.guide.part.report` | If something is wrong — a scam, a wrong category, a sold item — report it; we look at every report. | አንድ ነገር ትክክል ካልሆነ — ማጭበርበር፣ የተሳሳተ ምድብ፣ የተሸጠ ዕቃ — ያመልክቱ፤ እያንዳንዱን ሪፖርት እንመለከታለን። |
| `adPage.guide.how` | Meet in a public place. See the item before you pay. Never send money ahead for an item you have not seen, and never pay a deposit to hold it. If the seller pushes you to pay first, report the ad. Never share your bank or card details in a message. | በሕዝብ ቦታ ይገናኙ። ከመክፈልዎ በፊት ዕቃውን ይመልከቱ። ላላዩት ዕቃ ገንዘብ አስቀድመው በፍጹም አይላኩ፣ እንዲያዝልዎም ቅድመ ክፍያ በፍጹም አይክፈሉ። ሻጩ መጀመሪያ እንዲከፍሉ ካስገደደዎ ማስታወቂያውን ያመልክቱ። የባንክ ወይም የካርድ መረጃዎን በመልእክት በፍጹም አያጋሩ። |
| `adPage.guide.next` | Have something to sell? Post your own ad | የሚሸጡት ነገር አለዎት? የራስዎን ማስታወቂያ ይለጥፉ |
| `feed.guide.what` | Ads near you, newest first. When your place has few, ads from the wider area follow. | በአቅራቢያዎ ያሉ ማስታወቂያዎች፣ አዳዲሶቹ መጀመሪያ። ቦታዎ ጥቂት ሲኖረው ከሰፊው አካባቢ የመጡ ማስታወቂያዎች ይከተላሉ። |
| `feed.guide.part.heading` | The place you are browsing; change it in the menu. | እየተመለከቱ ያሉት ቦታ፤ በምናሌው ውስጥ ይቀይሩት። |
| `feed.guide.part.favourite` | The star makes this category your start page. | ኮከቡ ይህን ምድብ የመነሻ ገጽዎ ያደርገዋል። |
| `feed.guide.part.sections` | Each band names the area its ads come from. | እያንዳንዱ ክፍል ማስታወቂያዎቹ የመጡበትን አካባቢ ይጠቅሳል። |
| `feed.guide.part.card` | The photo, price and place of one ad. A ribbon marks a sold or a highlighted ad. | የአንድ ማስታወቂያ ፎቶ፣ ዋጋ እና ቦታ። ሪባን የተሸጠን ወይም የጎላ ማስታወቂያን ያመለክታል። |
| `feed.guide.part.more` | Show more loads the next ads. | «ተጨማሪ አሳይ» ቀጣዮቹን ማስታወቂያዎች ይጭናል። |
| `feed.guide.how` | Open an ad to see it whole. Buy safely: meet in public, see the item first, never pay ahead; report an ad that looks wrong from its own page. | ማስታወቂያውን ሙሉ ለማየት ይክፈቱት። በደህንነት ይግዙ፦ በሕዝብ ቦታ ይገናኙ፣ ዕቃውን መጀመሪያ ይመልከቱ፣ አስቀድመው በፍጹም አይክፈሉ፤ ትክክል ያልመሰለዎትን ማስታወቂያ ከራሱ ገጽ ያመልክቱ። |
| `feed.guide.next` | Sell something: post an ad | አንድ ነገር ይሽጡ፦ ማስታወቂያ ይለጥፉ |
| `sellerPage.guide.what` | Every live ad from one seller. | የአንድ ሻጭ እያንዳንዱ ንቁ ማስታወቂያ። |
| `sellerPage.guide.part.seller` | The seller's name and how long they have been a member. | የሻጩ ስም እና አባል ከሆኑ ምን ያህል ጊዜ እንደሆነ። |
| `sellerPage.guide.part.ads` | Their ads, newest first. | ማስታወቂያዎቻቸው፣ አዳዲሶቹ መጀመሪያ። |
| `sellerPage.guide.how` | Open an ad to contact the seller from there. Judge each item on its own: meet in public and see it before paying. | ሻጩን ከዚያ ለማግኘት ማስታወቂያውን ይክፈቱ። እያንዳንዱን ዕቃ በራሱ ይመዝኑ፦ በሕዝብ ቦታ ይገናኙ እና ከመክፈልዎ በፊት ይመልከቱት። |
| `sellerPage.guide.next` | Browse all listings | ሁሉንም ማስታወቂያዎች ይመልከቱ |
| `auth.guide.what` | Sign in to save ads, contact sellers and post your own. | ማስታወቂያዎችን ለማስቀመጥ፣ ሻጮችን ለማግኘት እና የራስዎን ለመለጠፍ ይግቡ። |
| `auth.guide.part.email` | The address you sign in with; we send confirmations here. | የሚገቡበት አድራሻ፤ ማረጋገጫዎችን እዚህ እንልካለን። |
| `auth.guide.part.password` | At least the length shown; a phrase of several words is strong and easy to remember. | ቢያንስ የታየው ርዝመት፤ የበርካታ ቃላት ሐረግ ጠንካራ እና ለማስታወስ ቀላል ነው። |
| `auth.guide.part.toggle` | New here? Switch to Create account; it takes a minute. | አዲስ ነዎት? ወደ «መለያ ፍጠር» ይቀይሩ፤ አንድ ደቂቃ ይወስዳል። |
| `auth.guide.part.forgot` | Forgot password sends a link to set a new one. | «የይለፍ ቃል ረሳሁ» አዲስ ለማስቀመጥ አገናኝ ይልካል። |
| `auth.guide.part.google` | Continue with Google signs you in without a password. | «በGoogle ይቀጥሉ» ያለ የይለፍ ቃል ያስገባዎታል። |
| `auth.guide.how` | Enter your e-mail and password, then Continue. After signing in you return to where you were. | ኢሜይልዎን እና የይለፍ ቃልዎን ያስገቡ፣ ከዚያ «ቀጥል»። ከገቡ በኋላ ወደነበሩበት ይመለሳሉ። |
| `auth.guide.next` | Browse without signing in | ሳይገቡ ይመልከቱ |
| `account.guide.what` | Your profile as sellers and buyers see it, and your listings at a glance. | ሻጮች እና ገዢዎች እንደሚያዩት መገለጫዎ፣ እና ማስታወቂያዎችዎ በአጭሩ። |
| `account.guide.part.profile` | Your name, seller name and member date. | ስምዎ፣ የሻጭ ስምዎ እና አባል የሆኑበት ቀን። |
| `account.guide.part.channels` | The ways buyers can reach you; each is shown or hidden on your ads. | ገዢዎች እርስዎን የሚያገኙባቸው መንገዶች፤ እያንዳንዱ በማስታወቂያዎችዎ ላይ ይታያል ወይም ይደበቃል። |
| `account.guide.part.counts` | How many ads you have live, waiting or ended. | ስንት ማስታወቂያዎች ንቁ፣ በመጠባበቅ ላይ ወይም ያበቁ እንዳሉዎት። |
| `account.guide.part.legal` | The terms you agreed to and when. | የተስማሙባቸው ውሎች እና መቼ። |
| `account.guide.how` | Edit profile changes the name and channels; your ads follow. | «መገለጫ አርትዕ» ስሙን እና መንገዶቹን ይቀይራል፤ ማስታወቂያዎችዎ ይከተላሉ። |
| `account.guide.next` | Change your sign-in and security | የመግቢያዎን እና የደህንነትዎን ይቀይሩ |
| `saved.guide.what` | The ads you saved, newest first. | ያስቀመጧቸው ማስታወቂያዎች፣ አዳዲሶቹ መጀመሪያ። |
| `saved.guide.part.item` | Tap to open the ad again. | ማስታወቂያውን እንደገና ለመክፈት ይንኩ። |
| `saved.guide.part.remove` | Remove takes it off this list; the ad stays live. | «አስወግድ» ከዚህ ዝርዝር ያወጣዋል፤ ማስታወቂያው ንቁ ሆኖ ይቆያል። |
| `saved.guide.part.unavailable` | A greyed ad was sold or taken down. | ግራጫ የሆነ ማስታወቂያ ተሸጧል ወይም ተወግዷል። |
| `saved.guide.how` | Save ads from their own page with the heart. | ማስታወቂያዎችን ከራሳቸው ገጽ በልቡ ምልክት ያስቀምጡ። |
| `saved.guide.next` | Find more ads | ተጨማሪ ማስታወቂያዎችን ያግኙ |
| `settings.guide.what` | How you sign in and keep your account safe. | እንዴት እንደሚገቡ እና መለያዎን ደህንነቱ እንደተጠበቀ እንደሚያቆዩ። |
| `settings.guide.part.identity` | The e-mail and name on your account. | በመለያዎ ላይ ያለው ኢሜይል እና ስም። |
| `settings.guide.part.methods` | Password and Google: add or remove a way to sign in. | የይለፍ ቃል እና Google፦ የመግቢያ መንገድ ይጨምሩ ወይም ያስወግዱ። |
| `settings.guide.part.mfa` | A code from your phone each time you sign in — strongly advised for sellers. | በገቡ ቁጥር ከስልክዎ የሚመጣ ኮድ — ለሻጮች በጥብቅ ይመከራል። |
| `settings.guide.part.security` | Where you are signed in; sign out of a lost device here. | የት እንደገቡ፤ የጠፋ መሣሪያን ከዚህ ያስወጡ። |
| `settings.guide.part.device` | The language and settings of this device. | የዚህ መሣሪያ ቋንቋ እና ቅንብሮች። |
| `settings.guide.how` | Each change asks for your password or code first. | እያንዳንዱ ለውጥ መጀመሪያ የይለፍ ቃልዎን ወይም ኮድዎን ይጠይቃል። |
| `settings.guide.next` | Back to your account | ወደ መለያዎ ይመለሱ |
| `myListings.guide.what` | Every ad you posted and where each one stands. | የለጠፉት እያንዳንዱ ማስታወቂያ እና እያንዳንዱ የት እንደደረሰ። |
| `myListings.guide.col.photo` | The cover photo. | የሽፋን ፎቶው። |
| `myListings.guide.col.title` | The ad's name. | የማስታወቂያው ስም። |
| `myListings.guide.col.price` | The asking price. | የሚጠየቀው ዋጋ። |
| `myListings.guide.col.state` | Draft, waiting for a check, live, ended or taken down. | ረቂቅ፣ ፍተሻ በመጠባበቅ ላይ፣ ንቁ፣ ያበቃ ወይም የተወገደ። |
| `myListings.guide.col.posted` | When it went live. | ንቁ የሆነበት ጊዜ። |
| `myListings.guide.col.expires` | When it ends; renew it from its page. | የሚያበቃበት ጊዜ፤ ከገጹ ያድሱት። |
| `myListings.guide.how` | Open an ad to edit, renew, mark sold or delete it. Each market lets you keep a number of Regular ads live at no cost. | ለማርትዕ፣ ለማደስ፣ «ተሸጧል» ለማለት ወይም ለመሰረዝ ማስታወቂያውን ይክፈቱ። እያንዳንዱ ገበያ የተወሰኑ መደበኛ ማስታወቂያዎችን ያለ ክፍያ ንቁ እንዲያቆዩ ይፈቅዳል። |
| `myListings.guide.next` | Post a new ad | አዲስ ማስታወቂያ ይለጥፉ |
| `myListing.guide.what` | One of your ads: its state, dates and what you can do with it. | ከማስታወቂያዎችዎ አንዱ፦ ሁኔታው፣ ቀናቱ እና በእሱ ምን ማድረግ እንደሚችሉ። |
| `myListing.guide.part.actions` | Edit, continue a draft, copy, delete or open the public page. | አርትዕ፣ ረቂቅ ይቀጥሉ፣ ይቅዱ፣ ይሰርዙ ወይም የሕዝብ ገጹን ይክፈቱ። |
| `myListing.guide.part.state` | Where the ad stands and who can see it. | ማስታወቂያው የት እንደደረሰ እና ማን ሊያየው እንደሚችል። |
| `myListing.guide.part.dates` | Posted, renewed, ends and sold dates. | የተለጠፈበት፣ የታደሰበት፣ የሚያበቃበት እና የተሸጠበት ቀናት። |
| `myListing.guide.part.problem` | If the check found something, it is named here with what to change. | ፍተሻው አንድ ነገር ካገኘ እዚህ ከሚቀየረው ጋር ይጠቀሳል። |
| `myListing.guide.part.history` | Every change and check, newest first. | እያንዳንዱ ለውጥ እና ፍተሻ፣ አዳዲሶቹ መጀመሪያ። |
| `myListing.guide.how` | An edited live ad is checked again before the change shows. | የተስተካከለ ንቁ ማስታወቂያ ለውጡ ከመታየቱ በፊት እንደገና ይፈተሻል። |
| `myListing.guide.next` | Back to My listings | ወደ የእኔ ማስታወቂያዎች ይመለሱ |
| `post.guide.what` | Post an ad in eight short steps. Your draft saves itself; come back any time. | በስምንት አጫጭር ደረጃዎች ማስታወቂያ ይለጥፉ። ረቂቅዎ በራሱ ይቀመጣል፤ በማንኛውም ጊዜ ይመለሱ። |
| `post.guide.part.category` | Choose where buyers will look for it. | ገዢዎች የት እንደሚፈልጉት ይምረጡ። |
| `post.guide.part.photos` | Clear photos, up to the number your plan shows; the first one is the cover. | ግልጽ ፎቶዎች፣ ዕቅድዎ እስከሚያሳየው ቁጥር ድረስ፤ የመጀመሪያው ሽፋኑ ነው። |
| `post.guide.part.specifications` | The facts for this category — size, brand, year. | የዚህ ምድብ እውነታዎች — መጠን፣ ብራንድ፣ ዓመት። |
| `post.guide.part.details` | A title and description in your words. Leave phone numbers out of the text; buyers reach you through the contact step. | በራስዎ ቃላት ርዕስ እና መግለጫ። ስልክ ቁጥሮችን ከጽሑፉ ውጭ ያድርጉ፤ ገዢዎች በመገናኛ ደረጃው በኩል ያገኙዎታል። |
| `post.guide.part.price` | A price, or free, or negotiable where the category allows. | ዋጋ፣ ወይም ነጻ፣ ወይም ምድቡ በሚፈቅድበት ድርድር። |
| `post.guide.part.place` | The city the item is in; a pin helps buyers nearby. | ዕቃው የሚገኝበት ከተማ፤ ፒን በአቅራቢያ ያሉ ገዢዎችን ይረዳል። |
| `post.guide.part.contact` | Your seller name and the ways buyers may reach you. | የሻጭ ስምዎ እና ገዢዎች እርስዎን የሚያገኙባቸው መንገዶች። |
| `post.guide.part.review` | Check everything, then submit; the ad goes live after a quick check. | ሁሉንም ይፈትሹ፣ ከዚያ ያስገቡ፤ ማስታወቂያው ከፈጣን ፍተሻ በኋላ ንቁ ይሆናል። |
| `post.guide.how` | Each step saves when you press Next. A phone number in the text, too many photos or a place beyond your plan is refused with a note saying what to change. | «ቀጣይ» ሲጫኑ እያንዳንዱ ደረጃ ይቀመጣል። በጽሑፉ ውስጥ ያለ ስልክ ቁጥር፣ በጣም ብዙ ፎቶዎች ወይም ከዕቅድዎ ውጭ ያለ ቦታ ምን እንደሚቀየር በሚገልጽ ማስታወሻ አይፈቀድም። |
| `post.guide.next` | See your ads and their state | ማስታወቂያዎችዎን እና ሁኔታቸውን ይመልከቱ |
| `post.edit.guide.what` | Change a live ad. The ad stays visible as it was until the change is checked. | ንቁ ማስታወቂያን ይቀይሩ። ለውጡ እስኪፈተሽ ድረስ ማስታወቂያው እንደነበረ ይታያል። |
| `post.edit.guide.how` | Change any step, then save from Review. A changed text, photo or price is checked again before it shows. | ማንኛውንም ደረጃ ይቀይሩ፣ ከዚያ ከ«ግምገማ» ያስቀምጡ። የተቀየረ ጽሑፍ፣ ፎቶ ወይም ዋጋ ከመታየቱ በፊት እንደገና ይፈተሻል። |
| `post.edit.guide.next` | Back to My listings | ወደ የእኔ ማስታወቂያዎች ይመለሱ |
| `prim.guide.open` | Guide | መመሪያ |
| `prim.guide.what` | What this is | ይህ ምንድን ነው |
| `prim.guide.columns` | Each column | እያንዳንዱ ዓምድ |
| `prim.guide.parts` | Each part | እያንዳንዱ ክፍል |
| `prim.guide.how` | How to add, change or remove | እንዴት እንደሚጨመር፣ እንደሚቀየር ወይም እንደሚወገድ |
| `prim.guide.next` | What to do next | ቀጥሎ ምን ይደረግ |

## 9. Migrations

none (FLAG `no-migration`; `git diff --name-only eb72f3bdf -- supabase/` is empty).

## 10. Departures

- **Stop 1** (`724fc819c`, `docs/governance/reports/p1c-guides-b.stop-1.md`): the pages' growth
  beyond §4, answer 2 against CF-SL-1, the four column-less keys, `admin-context.tsx` outside
  SCOPE. Ruling 2 answered each: §1 fix cause (2) in `guide-spec.ts`, carry (1) and (3) with their
  names; §2 base layer confirmed; §3 the four keys have no key; §4 `useAdminShellIfAny()` kept.
- Ruling 2 §1d: after (a), the page-form pages sit 0.1–0.2 KiB above stop 1's numbers
  (`guide-spec.js` as a chunk of its own, 0.2); the cause is on each line. The DataTable pages
  land on the predicted number. The supervisor may read this as within §1d (a cause named) or
  not; I did not stop a second time for 0.2 KiB with a named cause, and say so here.
- Stop 1's table counted `/admin/roles_/$roleId` and `/admin/listings_/$listingId` among the
  DataTable pages; they are whole-catalogue importers (§3). A correction to that report.
- The accessible-name key: the ruling named it as part of the contract; it is a type
  (`GuideOpenKey`) under which each form writes the literal `t("prim.guide.open" satisfies
  GuideOpenKey)`, because the usage map attributes literal calls only (a shared constant would
  turn the key "dynamic").
- The parts list form: pages whose parts have no term of their own draw a `ul` of lines (the
  plan's sheet described a term list for columns); the wizards' parts are named by their step
  keys. All-or-none per page (PG-4).
- The admin's edit wizard draws no Guide (answer 3 gave the edit wizard the posting lines;
  the admin actor is turn (c)'s console).
- `git stash` once while measuring the base (rule 00 names no stash); accepted by ruling 2 §5.
- The base's CI line read once with `curl` from the raw address; accepted by ruling 2 §5; from
  here `git show origin/ci-evidence:…` (§11 was read that way).
- `e2e/admin-guides.spec.ts`'s `GUIDE_CHUNK` still names `block-guide-sheet` — the body's chunk,
  which still exists under that name; not changed.
- Self-review MINOR, fixed (`081a8f7fa`): the sheet body's comment named the guide layer for
  `prim.guide.*`. MINOR, left: `PageHeader` renders its end-column wrapper on mobile when only
  `actions` is passed (an empty flex box of zero width); no layout change observed.
- The X1 finding from the plan's trial stands recorded (stop 1): a chunk group over the shell's
  small shared pieces measured −2.1…−5.5 KiB per page; a budget turn of its own.

## 11. CI

The base, read by `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` at the
start of ruling 2 (and by the raw address at stop 1 — the same lines):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `eb72f3bdf462fadf0bf246a66e2eb921da07b751` (short `eb72f3b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-03T23:28:06Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41736333497
```

Two-step: conclusion SUCCESS; the reported commit is the base. No red of an earlier turn.

This pull request's own run on the stop-1 commit `724fc819c` (run 41756986789, read from
`ci-status.md`, `guards-last-failure.md`, `e2e-last-failure.md` and `gh pr checks 16`): FAILURE.
Three red jobs, class (e): `First-paint bundle budget` (43 pages over — the budget lines, moved
in `b0e6e8ed6`); `Build, typecheck, lint` and `Component tests` — both the e2e selector self-test
(`spec not reachable from any area: e2e/user-guides.spec.ts`), the BLOCKER outside SCOPE. Every
other job green: all 16 E2E lanes, the smoke, repeat and email lanes, the E2E verdict ("last E2E
run 41756986789 passed", 0 flaky, no errors outside a test), CodeQL, the browse-path guard, the
dependency audit. No re-run. The final "every check green" line cannot be written until the
selector's area exists.

## 12. Limits

- **The BLOCKER:** `scripts/e2e-select.ts` is outside SCOPE (plan §8, rulings 1 and 2). The new
  spec needs an area line — the `admin-guides` area widened to `"src/components/shell/*guide*.ts*"`,
  `"src/features/posting/wizard-guide.ts"` and `specs: [..., "e2e/user-guides.spec.ts"]`, or a
  `user-guides` area of its own — about six lines. Until the supervisor extends SCOPE by that
  file, CI's `Build, typecheck, lint` and `Component tests` jobs stay red on every commit of this
  branch, and the pull request stays a draft. This is stop 2's question
  (`docs/governance/reports/p1c-guides-b.stop-2.md`).
- NH-6 (`scripts/ci/nightly-hour.test.ts`): red on macOS (the zone resolution), red on the base
  tree too; CI on Linux judges it.
- actionlint and gitleaks: the pinned Linux binaries do not run on macOS; CI judges both. The
  secret sweep was done by reading `git diff --cached` before each commit.
- The advisory service (dependency-audit), the staging preflight, the e2e merges and the
  promote job: CI only.
- The browser check ran 20 of the 69 specs the selector names (the two guide specs and every
  changed screen's own); the rest are CI's lanes, green on `724fc819c`; the later commits change
  the module graph (`guide-spec.ts`), the budgets, docs and one comment — the pull request's
  next run judges them.
- Rendered-output acceptance (the control's place in each title row at 360 / 768 / 1024 / 1280,
  the ad page's tier ink) is the operator's walk: thirteen routes, each with the Guide opened,
  Escape, and the next link; the wizard at two steps; My listings' tile; Amharic on the ad page.
