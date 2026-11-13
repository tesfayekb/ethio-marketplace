# App fixes — six defects in the site itself, each at its mechanism — report

Base: 3e3a51a89 · Final commit: 8afc3cc56 · Brief: docs/governance/briefs/app-fixes.md (sha256 be9a46c29ff9f808404e45e8190e1acf642e7dc0f1838e481c1116c758022593) · Rulings: docs/governance/briefs/app-fixes-ruling-1.md (sha256 7651c5436a90d1083c715cac7fe5c6b0684a263e1bf2236ce1b3f2aff7b10939), docs/governance/briefs/app-fixes-ruling-2.md (sha256 54c9b353d61e3b29ca700541432efbd30469c9ca3158d969d534845ba88ca072)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 8afc3cc56

CI at the start: dev 3e3a51a (PR #38's merge) — run 43472354920, **SUCCESS**. CI of the last code commit: §11.

## 1. Done / not done, by part and step

- STEP 0 — done: branch `cursor/app-fixes` from `origin/dev` 3e3a51a89; the brief saved byte for byte (sha256 equal); roadmap line 3; the speed brief's line out of `briefs-allowlist.txt`; draft PR [#39](https://github.com/tesfayekb/ethio-marketplace/pull/39) (`872824a4d`).
- STEP 1 — done: the census, stopped (`app-fixes.stop-1.md`, `0bea41aae`); ruling 1 answered it.
- Part A — done (`9eedabf63`): the impersonation check and its banner for staff only, as ONE on-demand module (DEC-372, INC-1116). The gate is `src/components/shell/impersonation-gate.ts` (pure; census IMPG-1…4); the plain notice `src/components/shell/impersonation-notice.tsx` is `resilientLazy`'s fallback (IMPN-1…4); BC-16's real allowlist is empty; IMP-6.
- Part B — done (`7ea280e59`): CF-STALE-1…2 (`scripts/conformance/stale-reload.test.ts`), three allowlist lines; no seam for the router library's reload, so INC-1128 stays OPEN (§13).
- Part C — done (`d7b458e80`): every panel gives the focus back to its opener (`useOpenerFocus`, `src/components/ui/dialog-opener.ts`, under the dialog, the sheet and the alert dialog; INC-1130); DO-6…10, DLG-E9.
- Part D — done (`d7b458e80`): a picture that cannot draw keeps its text alternative (INC-1131); PIC-6…8.
- Part E — done (`314d1a881`): a gone ad's view answers `listingNotFound` 404 quietly (INC-1134); VWR-3, VWR-4.
- Part F — done (`314d1a881`, the re-entry in `13a53a37b`): the pseudo generator fills from the base language's keys and names what it could not write (INC-1137; PSG-1…5); the go-template's two sentences (ruling 1 item 6); the `@global-state` tests back in the serial lane (INC-1135, ruling 2 item 1), green on the first run.
- Five ceilings by their named causes — `2917a170b` (§5, the first-download table).
- Stop 2 — `9fa44ee4f`; ruling 2 answered it.
- Ruling 2 — done (`13a53a37b`): the re-entry; INC-1143 (`baseTotalOf`); the positive controls in PIC-7 and VWR-4; the ruling saved bare.
- STEP 7's one further commit — `8afc3cc56`: the base-keys stat card waits for the roster it now reads (self-review, §10).
- STEP 6 (the gate), STEP 7 (push, CI) and STEP 8 (this report, the self-review) — done.
- Not done: none.

## 2. Files changed

`git diff --name-only 3e3a51a89` (with this report):

```
.github/workflows/local-backend-proof.yml
docs/features/admin-audit-security.md
docs/features/admin-shell.md
docs/features/ci-local-backend.md
docs/features/design-foundation.md
docs/features/e2e-harness.md
docs/features/my-listings.md
docs/features/performance-strategy.md
docs/features/routes.md
docs/features/translations.md
docs/generated/i18n-usage.json
docs/governance/briefs/app-fixes-ruling-1.md
docs/governance/briefs/app-fixes-ruling-2.md
docs/governance/briefs/app-fixes.md
docs/governance/go-template.md
docs/governance/reports/app-fixes.report.md
docs/governance/reports/app-fixes.stop-1.md
docs/governance/reports/app-fixes.stop-2.md
e2e/admin-audit.spec.ts
e2e/dialogs.spec.ts
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.test.ts
scripts/ci/lane-plan.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/entry-admin-allowlist.txt
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/lanes-allowlist.txt
scripts/conformance/lanes.test.ts
scripts/conformance/stale-reload-allowlist.txt
scripts/conformance/stale-reload.test.ts
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/impersonation-gate.test.ts
src/components/shell/impersonation-gate.ts
src/components/shell/impersonation-notice.test.tsx
src/components/shell/impersonation-notice.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/dialog-opener.test.tsx
src/components/ui/dialog-opener.ts
src/components/ui/dialog.tsx
src/components/ui/picture.test.tsx
src/components/ui/picture.tsx
src/components/ui/sheet.tsx
src/features/admin/impersonation/impersonation-banner.tsx
src/features/admin/translations/coverage-against-base.test.ts
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/pseudo-bar.tsx
src/features/admin/translations/pseudo-generate.test.tsx
src/features/admin/translations/translations-service.ts
src/features/admin/translations/use-translations.ts
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
src/routes/api/listings/view.test.ts
src/server/ad-view.ts
```

New files (`git diff --name-only --diff-filter=A 3e3a51a89 | xargs git ls-files`, before this report): `docs/governance/briefs/app-fixes-ruling-1.md`, `docs/governance/briefs/app-fixes-ruling-2.md`, `docs/governance/briefs/app-fixes.md`, `docs/governance/reports/app-fixes.stop-1.md`, `docs/governance/reports/app-fixes.stop-2.md`, `scripts/conformance/stale-reload-allowlist.txt`, `scripts/conformance/stale-reload.test.ts`, `src/components/shell/impersonation-gate.test.ts`, `src/components/shell/impersonation-gate.ts`, `src/components/shell/impersonation-notice.test.tsx`, `src/components/shell/impersonation-notice.tsx`, `src/components/ui/dialog-opener.ts`, `src/features/admin/translations/pseudo-generate.test.tsx`. No file deleted.

Scope: every path is in the brief's SCOPE, the standing allowance (`docs/features/**`, briefs, reports, roadmap line 3, `scripts/conformance/*-allowlist.txt`, the two i18n maps), ruling 1 item 5 (`scripts/bundle-closure.test.ts`, `entry-admin-allowlist.txt`, `src/components/shell/`, `docs/governance/go-template.md`) or ruling 2 item 1 (`scripts/ci/lane-plan.ts`, `scripts/conformance/lanes.test.ts`).

## 3. Behaviour contract — answer tables before → after

| Touched | At 3e3a51a89 | Final |
| --- | --- | --- |
| The shell's impersonation check (`app-shell.tsx`) | every signed-in person: the active-session door on load, on each route change and every 30 s; the banner, its hook and its service in the entry | only when `impersonationCheckOn` is on: signed in, not signing out, the permission read settled, and the caller holds `admin.panel` OR the read failed; member: no call, no download (IMP-6) |
| The banner's module | in the entry | one on-demand chunk (banner + hook + service), `resilientLazy`, Suspense fallback `null` (nothing while it loads) |
| The banner's code fails to download | — (it was in the entry) | the plain notice `impersonation-notice` for staff: "A view-as session may be active." + End now (`impersonation-banner-end`); End now loads the service, ends the active session (the notice leaves), says "No view-as session is active." when there is none, `door.refused` + Refresh when the call fails, `LoadFailedHere` + Refresh when the service cannot load |
| `ImpersonationBanner` | `enabled` prop | no prop (the gate is the shell's) |
| A dialog, sheet or alert dialog closing | the focus to its library trigger; a screen-sized panel to what held the focus; a smaller panel opened from state to the page | to its opener (what held the focus when it opened, or the control the opening press landed on) — except the panel's own library trigger (`aria-controls` = the panel id, left to Radix), an owner's `onCloseAutoFocus` that prevented the default, and an opener no longer in the page |
| `Picture`, failed or with no source | the `ImageOff` box, no role, `alt` dropped | the box carries `role="img"` and `aria-label={alt}` when `alt` is not empty; an empty `alt` stays hidden |
| `POST /api/listings/view`, the door's write fails on its link to the ad (Postgres `23503`) | 200 `{counted:false}` and an `[ssr-error]` line | 404 `{error:"listingNotFound"}` (`clientError`) and an `[ad-view]` information line; nothing written |
| `POST /api/listings/view`, any other door error, the success and the dials | as today | unchanged (VWR-2, VWR-4, VW-1…5) |
| `usePseudoGenerate` | the target's own rows by offset (`listTranslations`, `zxa`); `{written, failed, total}` | the roster's one `isBase` language's live keys, once, by key (`fetchAllTranslationRows`); `{written, failed, total, failedKeys}`, `total` = the keys read; zero or several base rows throw `noSingleBase: <n>` before anything is written |
| `PseudoBar` | Generate enabled when not pending; summary only | Generate disabled until the roster is read (`roster` prop); the first 20 failed keys under `admin.translations.ai.failedList` (`strings-pseudo-failed`) |
| The languages page's base total (stat card) | `statsByLang.get("en")` | `baseTotalOf(languages.data, statsByLang)`; the card loading until the stats and the roster are read |
| The languages table's base key count (publication gate) | the `isBase` row's code, else `"en"` | `baseTotalOf(rows, statsByLang)`: no single base row reads 0 |
| The serial lane | `--grep "@a11y"` | `--grep "@a11y\|@global-state"`; `SERIAL_TAGS` both, `NIGHTLY_TAGS` none |

## 4. Censuses

STEP 1's census (every grep, by key word, with file:line) is `docs/governance/reports/app-fixes.stop-1.md` §"The census"; ruling 1 accepted it whole. Added during the build:

- `rg -n "\blocation\s*\.\s*reload\b" src` (CF-STALE-1's own census, comments blanked): `src/components/marketplace/feed.tsx`, `src/lib/error-page.ts`, `src/lib/on-demand-failure.ts` — three, each an allowlist line; `src/lib/stale-chunk.ts` the mechanism.
- `rg -n "count_listing_view|countAdView|api/listings/view" src e2e scripts`: the route, `ad-view.ts`, its tests, `count-view.ts:22–31` (ignores every answer), `e2e/ad-page.spec.ts` :228–290, :653, :706 (a refused id and an unknown one, the POST's arrival — none reads a 404), `scripts/e2e-select.ts:358`.
- The door's SQL read before the branch: `count_listing_view` answers `false` for an ad it cannot find (`supabase/migrations/20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql:225`); `23503` is the counter's insert (`:231`) after a removal between the two.
- The generator's door: `admin_export_translations` — `WHERE t.lang_code = p_lang AND (p_after IS NULL OR t.key > p_after) ORDER BY t.key` (`supabase/migrations/20261012101642_241cc49a-39e5-4fa0-843d-db74955dcbcb.sql:43–45`).
- `rg -n "\"en\"" src/features/admin/translations --glob '!*.test.*'` after INC-1143: none in `languages-page.tsx`.
- `rg -n "INC-1135|global-state|NIGHTLY_TAGS|SERIAL_TAGS" scripts .github docs/features` — the guard and constants that pinned the list (stop 2): `scripts/ci/lane-plan.ts:27–35`, `scripts/conformance/lanes.test.ts:223–246`, the workflow :794–795, `lanes-allowlist.txt`, `docs/features/e2e-harness.md`, `docs/features/ci-local-backend.md`; `.cursor/rules/20-tests.mdc:31` (J8, not edited: §13).
- `rg -n "translations-stat-keys" e2e src`: no reader beyond the page.

## 5. Tests

Added or changed, by id:

- IMPG-1…4 (`src/components/shell/impersonation-gate.test.ts`, new): member off, staff on; a failed read on; loading, signed out and signing out off; the census over seven cases, a planted unconditional gate getting three wrong.
- IMPN-1…4 (`src/components/shell/impersonation-notice.test.tsx`, new): a failed download shows the notice; End now ends the session and the notice leaves; no session; a failed call.
- BC-16 (`scripts/bundle-closure.test.ts`): "the real allowlist is empty"; its planted cases stay (an admin module fails by its path; a stale line fails).
- CF-STALE-1…2 (`scripts/conformance/stale-reload.test.ts`, new): the real census equals the three allowlisted files; planted: a feature file's reload found at its line, allowlisted, then stale. Wired (`wired.test.ts`).
- DO-6…10 (`src/components/ui/dialog-opener.test.tsx`): a small dialog opened from state; the sheet and the alert dialog (`it.each`); a library trigger left to Radix (`aria-controls`); the owner's handler wins; an opener removed while open.
- PIC-6…8 (`src/components/ui/picture.test.tsx`): failed with an alt; failed and decorative; no source with an alt.
- VWR-3, VWR-4 (`src/routes/api/listings/view.test.ts`): `23503` → 404 `listingNotFound`, no error line, no `logRouteError`; another door error → logged, `{counted:false}`.
- PSG-1…5 (`src/features/admin/translations/pseudo-generate.test.tsx`, new): a target with no rows filled from every live base key (an orphan left out), each once, the reader asked only for the roster's base code; a refused write and an empty source named; no base and two bases refuse before anything; the bar names the first twenty; Generate disabled until the roster is read.
- BTO-1, BTO-2 (`src/features/admin/translations/coverage-against-base.test.ts`): the roster's base names the total (a decoy `en` row with another total is the positive control); no single base reads 0.
- CF-LANES-1 (`scripts/conformance/lanes.test.ts`): no allowlist line and no finding on the real tree; its planted cases find an `@a11y` and a `@global-state` test in no lane.
- IMP-6 (`e2e/admin-audit.spec.ts`, `@private-identity`): a member's page makes no call to `get_active_impersonation` and downloads none of the module across three navigations; a super admin's page does both.
- DLG-E9 (`e2e/dialogs.spec.ts`, `@webkit`): Share this ad, opened from state, gives the focus back to `listing-share-open` by Escape and by the close button.

Red-first (each on the base's version, written from `git show 3e3a51a89:<path>` and restored; the new copies kept under `/tmp/ethio-scratch/app-fixes/red-*`):

- DO-6, DO-7 ×2, DO-8 fail on the old primitives; DO-9 and DO-10 pass on them (the owner's handler and a removed opener behaved the same before).
- DLG-E9 fails on the old primitives in `mobile-360` and `webkit-390`: "the focus is not back on its opener … Expected: focused · Received: inactive" (`2 failed`).
- PIC-6 and PIC-8 fail on the old `picture.tsx`; PIC-7 passes on it. Its positive control: the image exists and the frame carries `data-picture-failed`, so the absence it asserts is the failed state's own (ruling 2 item 4).
- VWR-3 fails on the old route; VWR-4 passes on it. Its positive control: the door was called once and `logRouteError` was called exactly once with the door's message, so the other-error branch was really taken (ruling 2 item 4).
- PSG-1…5 all fail on the old generator and bar; PSG-1 because a target with no rows wrote nothing (INC-1137's cause).
- IMPG-4's planted gate gets "a member", "the read is loading" and "staff, the read loading again" wrong.
- CF-LANES-1 fails with the old `lane-plan.ts` against the new workflow (`1 failed`).
- BTO-1: no red on the old code (the old read was inline in the page, not a function); the decoy row is its positive control.

Totals (this turn's commands): the touched unit test files `7 passed (7)`, `43 passed (43)`; `src/components` `55 passed`, `310 passed`; `src/features/admin/translations` `9 passed`, `60 passed`; `bunx vitest run scripts --maxWorkers=2` `118 passed (118)`, `607 passed | 1 skipped (608)`. `bun run typecheck`: exit 0. `bun run lint`: exit 0.

`bun run checks` (on `13a53a37b`'s tree): `checks (fast): 26 PASS · 0 FAIL · 400s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path…`; last line `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 457s`. NOT RUN, each with its own reason as printed: scope's two artifact steps (a GitHub run only); actionlint and gitleaks (linux/x64 pins, this machine darwin/arm64); the dependency installs (already installed); the dependency audit (its advisory service unreachable); e2e-preflight's four steps (staging credentials the script never holds); the e2e merge steps and the lanes (a temporary backend); semgrep's SARIF upload and its warning (GitHub only). The bundle budget: `the NEAR band (R4) — 0 NEAR`.

Browser runs, by id, 0 retries (`bun run e2e:local -- e2e/admin-audit.spec.ts e2e/dialogs.spec.ts --grep "IMP-1 |IMP-2 |IMP-3 |IMP-5 |IMP-6 |DLG-E9 "`, four projects, ethio-staging): `14 passed (1.3m)` — IMP-1, IMP-2, IMP-3, IMP-5, IMP-6 in `mobile-360` and `desktop-1280`; DLG-E9 in `mobile-360`, `desktop-1280`, `webkit-1280`, `webkit-390`. No spec file ran whole. TR-30 ran in CI's serial lane, not here (§12): run 43488341499's smoke lane `16 passed`, `4 skipped`, TR-30 passed on `desktop-1280` (44.2 s). CI on the pull request runs every test in its lane and the repeat lane over the changed specs.

J-audit (e2e/** changed): IMP-6 leases its own pooled member and signs in the job's super admin (J1, J3); DLG-E9 seeds a scratch seller and ad through the harness (J1); no `waitForTimeout`, no `.first()`, no `test.only` in the added lines; no new `@global-state` test (J8).

First download (this machine's builds; `node scripts/check-bundle-size.mjs`; 3e3a51a89 against the final tree; KiB gzipped):

| Page | 3e3a51a | final | change | ceiling (base → final) |
| --- | --- | --- | --- | --- |
| `(the entry, JS)` | 204.5 | 203.9 | -0.6 | 205 |
| `/` | 226.1 | 225.4 | -0.7 | 227 |
| `/$name` | 224.1 | 223.4 | -0.7 | 225 |
| `/account` | 266.8 | 266.1 | -0.7 | 268 |
| `/account_/legal` | 207.1 | 206.4 | -0.7 | 208 |
| `/account_/legal_/$versionId` | 207.8 | 207.1 | -0.7 | 209 |
| `/account_/saved` | 224.3 | 223.6 | -0.7 | 225 |
| `/admin` | 208.9 | 208.3 | -0.6 | 210 |
| `/admin/` | 209.7 | 209.1 | -0.6 | 211 |
| `/admin/ai` | 322.5 | 322.9 | +0.4 | 323 → 324 |
| `/admin/attributes` | 335.7 | 336.1 | +0.4 | 337 |
| `/admin/audit` | 294.4 | 294.2 | -0.2 | 295 |
| `/admin/categories` | 343.7 | 344.1 | +0.4 | 345 |
| `/admin/countries` | 325.2 | 325.7 | +0.5 | 326 → 327 |
| `/admin/images` | 209.6 | 208.9 | -0.7 | 210 |
| `/admin/impersonation_/$sessionId` | 289.5 | 291.7 | +2.2 | 290 → 293 |
| `/admin/legal` | 280.7 | 281.1 | +0.4 | 282 |
| `/admin/legal_/$versionId` | 277.9 | 278.1 | +0.2 | 279 |
| `/admin/legal_/edit` | 279.7 | 280.2 | +0.5 | 281 |
| `/admin/listings` | 347.1 | 348.3 | +1.2 | 348 → 349 |
| `/admin/listings_/$listingId` | 349.4 | 351.2 | +1.8 | 350 → 352 |
| `/admin/listings_/$listingId_/edit` | 408.7 | 408.1 | -0.6 | 410 |
| `/admin/locations` | 269.6 | 269.9 | +0.3 | 271 |
| `/admin/monetisation` | 333 | 333.5 | +0.5 | 334 |
| `/admin/places` | 326.8 | 327.3 | +0.5 | 328 |
| `/admin/roles` | 291.3 | 292 | +0.7 | 292 → 293 |
| `/admin/roles_/$roleId` | 272.3 | 272.5 | +0.2 | 273 |
| `/admin/screening` | 368.2 | 368.2 | +0.0 | 369 |
| `/admin/translations` | 302.1 | 303 | +0.9 | 303 → 304 |
| `/admin/translations_/$lang` | 305.6 | 306.4 | +0.8 | 306 → 307 |
| `/admin/users` | 291.4 | 292.1 | +0.7 | 292 → 293 |
| `/admin/users_/$userId` | 286.7 | 288.3 | +1.6 | 288 → 289 |
| `/auth` | 221.8 | 220.5 | -1.3 | 223 |
| `/auth_/callback` | 208.6 | 207.4 | -1.2 | 209 |
| `/auth_/reset` | 210.6 | 209.3 | -1.3 | 211 |
| `/c/$slug` | 226.1 | 225.4 | -0.7 | 227 |
| `/dev/primitives` | 225.4 | 225.3 | -0.1 | 226 |
| `/dev/style` | 247 | 246.6 | -0.4 | 248 |
| `/dev/tall` | 204.8 | 204.2 | -0.6 | 206 |
| `/l/$slug` | 256.5 | 256 | -0.5 | 257 |
| `/legal/$kind` | 209.2 | 208.6 | -0.6 | 210 |
| `/legal/accept` | 216.2 | 215.5 | -0.7 | 217 |
| `/legal/publishing` | 210 | 209.3 | -0.7 | 211 |
| `/my-listings` | 314 | 313 | -1.0 | 315 |
| `/my-listings_/$listingId` | 322.1 | 321.7 | -0.4 | 323 |
| `/my-listings_/$listingId_/edit` | 400.8 | 400.3 | -0.5 | 402 |
| `/post` | 400.8 | 400.3 | -0.5 | 402 |
| `/post_/$listingId` | 400.7 | 400.3 | -0.4 | 402 |
| `/privacy` | 209.2 | 208.6 | -0.6 | 210 |
| `/settings` | 276.3 | 274.5 | -1.8 | 277 |
| `/terms` | 209.2 | 208.6 | -0.6 | 210 |

The causes, chunk by chunk:

- Part A (DEC-372): the banner, its hook and its service left the entry for their own chunks, so every page fell 0.6 KiB. The pages that use them load them: `use-impersonation.js` 0.7 KiB, `impersonation-service.js` 0.8 KiB, and `useMutation.js` 1.0 KiB (react-query's mutation observer and `useMutation`, which left the entry with them; query-core's mutation and mutation cache stayed in `index.js`). Measured from part A's builds: the entry's JS 204.5 → 203.9 KiB, with `index.js` 127.2 → 128.3 KiB holding the gate and the plain notice. Ceilings raised: `/admin/impersonation_/$sessionId`, `/admin/listings`, `/admin/listings_/$listingId`, `/admin/users_/$userId`; `/admin/ai` and `/admin/translations_/$lang` for the NEAR band.
- Parts C, D, F (measured against part B's tree, built in place from `git show 7ea280e59:<path>` and written back from HEAD, `git status` clean after):
  - `notice-outlet` (now with `dialog-opener.ts`): 0.2 → 0.7 KiB;
  - `dialog`: 1.2 → 0.9 KiB (its press code moved into the hook);
  - `sheet`: 1.6 → 1.7 KiB;
  - `alert-dialog`: 0.8 → 0.9 KiB;
  - `admin.translations`: 5.8 → 5.9 KiB (the failed-keys line).

  The entry is unchanged (`index.js` 128.3 KiB in both builds). Pages that draw a panel grew by +0.1 to +0.7 KiB. Ceilings raised (`2917a170b`): `/admin/countries` and `/admin/impersonation_/$sessionId` (NEAR band), `/admin/roles`, `/admin/translations`, `/admin/users`.
- Ruling 2's commit and `8afc3cc56`: exact gzip bytes for every asset, compared between builds, show every chunk that imports another moving by −7 to +13 bytes when content hashes rename it (`index.js` +13). That is enough to cross a 0.1 KiB rounding line, so some pages read ±0.1 KiB. The real change is `use-translations.js` +35 B and `admin.translations.js` −16 B. No ceiling moved.

Every raised ceiling's line in `scripts/route-budgets.mjs` carries its cause and this measurement in DEC-296's form (`ceilingForLocal`).

## 6. K2 — siblings that bypass the mechanism

- Reload: `src/components/marketplace/feed.tsx:206` reloads by its own call beside `refreshPage` (allowlist line, until INC-1140; the feed not edited, ruling 1 item 3); `src/lib/error-page.ts` (the dependency-free error page) and `src/lib/on-demand-failure.ts` (`refreshPage`, the shared cure) are allowlisted by reason.
- Focus return: `src/components/shell/app-rail.tsx:1103–1152` (the phone menu, its own `onCloseAutoFocus` to the ☰) and `src/components/shell/guide-sheet.tsx:84` (its own handler) return the focus by their own code; both still return it, and the primitives leave an owner's prevented default alone. Unchanged (ruling 1 item 4).
- Positional reads: `src/features/admin/translations/ai-bulk-bar.tsx:122–165` reads a list by position (INC-1141, a read, not a write loop).
- Bare fetch: `src/features/admin/translations/use-translations.ts:389` fetches `/i18n-usage.json` outside the route mechanism (INC-1142).
- The base language: after INC-1143, `rg -n "\"en\"" src/features/admin/translations --glob '!*.test.*'` finds no reader of the base code by literal in the page; other admin files were not censused for the same literal beyond this folder.
- The notice's look: `src/components/shell/impersonation-notice.tsx:62` repeats the banner's class list (`src/features/admin/impersonation/impersonation-banner.tsx:31`) — the same look in two places (§13).
- Greps run: those of §4 and stop 1's census.

## 7. Allowlists and guards

- `scripts/conformance/entry-admin-allowlist.txt`: 3 → 0 (BC-16, "the real allowlist is empty").
- `scripts/conformance/holds-its-box-allowlist.txt`: 17 → 19:
  - `src/components/shell/impersonation-notice.tsx#LazyImpersonationBanner`: drawn fixed on the top of the viewport, out of the page's flow; nothing shows while it downloads, and the plain notice draws in the same place when it cannot. Until 2027-05-13.
  - `src/components/app-shell.tsx#LazyImpersonationBanner`: the shell's Suspense around it, fixed and out of flow, so the page has no box of it to keep. Until 2027-05-13.
- `scripts/conformance/stale-reload-allowlist.txt` (new): 0 → 3:
  - `src/lib/error-page.ts`: the root error page's Try again button. Until 2027-05-13.
  - `src/lib/on-demand-failure.ts`: `refreshPage`, the shared cure. Until 2027-05-13.
  - `src/components/marketplace/feed.tsx`: the feed's retry button. Until INC-1140.
- `scripts/conformance/lanes-allowlist.txt`: 1 → 0 (INC-1135's line, ruling 2 item 1).
- `scripts/conformance/briefs-allowlist.txt`: 1 → 0 (the speed brief's line, STEP 0, as the line's own until said).
- New guard: CF-STALE-1…2, proven on a planted bypass, wired (`wired.test.ts`, "CF-STALE-2").
- Guard self-tests run: BC-16's planted cases, IMPG-4, CF-STALE-2, CF-LANES-1's planted cases, and `bun run checks`' self-tests (§5).

## 8. Strings

Two new base-layer keys (Part A; the brief's flag allowed two; both maps regenerated with `bun run i18n:usage`):

| Key | EN | AM |
| --- | --- | --- |
| `impersonation.mayBeActive` | A view-as session may be active. | የመወከል ክፍለ ጊዜ ንቁ ሊሆን ይችላል። |
| `impersonation.noneActive` | No view-as session is active. | ንቁ የመወከል ክፍለ ጊዜ የለም። |

The Amharic was composed by the executor from words already in the catalogue: "ንቁ የመወከል ክፍለ ጊዜዎች" (`am-admin.ts`) and "ሊሆን ይችላል" (`am-base.ts`). The supervisor reads both before the merge (ruling 1 item 1). Reused, not changed: `impersonation.endNow`, `door.refused`, `common.loadFailed`, `admin.translations.ai.failedList`. The usage maps also record `admin.translations.ai.failedList`'s new page, `/admin/translations`.

## 9. Migrations

none (`git diff --name-only 3e3a51a89 -- supabase` is empty); Part E needed no SQL change.

## 10. Departures

- Two stops and two rulings.
  - Stop 1 (`0bea41aae`): BC-16 lay outside scope, and TR-30's cause was not the brief's hypothesis. Ruling 1 answered it, saved bare as `docs/governance/briefs/app-fixes-ruling-1.md` in part A's commit.
  - Stop 2 (`9fa44ee4f`): the re-entry needed `scripts/ci/lane-plan.ts` and `scripts/conformance/lanes.test.ts`. Ruling 2 answered it, saved bare as `docs/governance/briefs/app-fixes-ruling-2.md` in the re-entry's commit.
- Part A's shape follows ruling 1 item 1, not the stop-1 plan: one on-demand module, with the gate and the plain notice in the shell.
- The notice has two new keys where ruling 1 said "one new key". The no-session words need their own key; the brief's flag allows two.
- "If there is none it says so and leaves" is read as: the notice shows `noneActive` and offers no button.
- The refusal words: a failed End now call shows `door.refused` (the one refusal reader's key for a door that answered no). A failed download of the service shows `common.loadFailed` through `LoadFailedHere`. Both offer `refreshPage`.
- The `resilientLazy` binding lives in the notice's file (`LazyImpersonationBanner`). CF-RLF-1 requires a fallback declared in the same file, and `inPlace` needs the fallback to draw `LoadFailedHere`.
- The gate takes `staff: boolean`, not the permission list. The browse-import guard lets only `app-shell.tsx`, `routes/admin.tsx` and `features/permissions/*` import `features/permissions`.
- The notice is `role="status"` without `aria-live`: LR-C1 refuses a live region drawn before its words.
- `scripts/route-budgets.mjs`: besides the ceilings, `useMutation` left `ENTRY_CLOSURE`. The check refused a closure entry the entry no longer holds, so this is part A's cause written into the ceilings file.
- Two allowlist lines in `holds-its-box-allowlist.txt` (HB-1; §7).
- Part C: DO-9 and DO-10 cannot be red on the old code (§5).
- Part E: the gone ad is recognised by Postgres `23503` (the database's code for a missing link) and answers the existing door code `listingNotFound` with 404. It writes an `[ad-view]` information line through `console.info`, not `logRouteError`.
- Part F:
  - No single base row throws `noSingleBase: <n>`, spoken by `translationErrorKey` as `admin.translations.error.generic` with the code as the detail line.
  - `PseudoBar` takes the roster and keeps Generate disabled until it is read, so a roster still arriving is never "no base". This is a change to the screen's states beyond the brief's text.
  - `languages-page.tsx` passes `languages.data` to the bar.
- The commits `d7b458e80` (parts C, D) and `314d1a881` (parts E, F) fail the first-download check on their own trees. The check ran at the end, not before each `src/` commit; `2917a170b` raises the five ceilings by their causes. Ruling 2 item 3 accepted this as a named departure; history is not rewritten, and since then every `src/` commit ran the check first.
- INC-1143's helper also replaced the publication gate's `?? "en"` fallback (`languages-page.tsx`, the table's base key count), the same read in the same file. With no single base row it now reads 0, where it used to read the `en` row.
- `8afc3cc56` (STEP 7's one further commit, from the self-review): the base-keys stat card stays loading until the roster as well as the stats are read. Before this, INC-1143's helper showed 0 keys while the roster was still arriving.
- An extra commit, `2917a170b`, beyond the brief's four part commits: the ceilings.

## 11. CI

The base's CI (ci-evidence `docs/tracking/ci-status.md`, read at STEP 0 and again at stop 2):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `3e3a51a8963beadcb415baafd371a29d1426607f` (short `3e3a51a`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-13T17:32:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43472354920
```

Two-step SHA check: the file's commit 3e3a51a89 equals `git rev-parse origin/dev` (3e3a51a89, fetched at STEP 0 and at stop 2). No red of an earlier turn to fix.

This pull request's runs:

- 43473208330 on `872824a` (STEP 0): SUCCESS.
- 43473208330 on `872824a` (STEP 0): SUCCESS.
- 43475544434 on `0bea41a` (stop 1): SUCCESS.
- 43484667160 on `9fa44ee` (stop 2, the first CI of parts A → F): SUCCESS, 43 pass, 1 skipping.
- 43488341499 on `13a53a37b` (ruling 2's commit): SUCCESS, 43 pass, 1 skipping. The smoke lane ran `--grep "@a11y|@global-state"`: 16 passed, 0 failed, 0 flaky, 4 skipped, 20 total. TR-30 passed on `desktop-1280` (44.2 s).
- 43491896215 on `8afc3cc56` (the last code commit): SUCCESS, 43 pass, 1 skipping (Promote to main, which runs only on dev), completed 2026-11-13T19:44:49Z.

No red in any run; nothing re-run.

## 12. Limits

- TR-30 was not run locally. It is a `@global-state` test (serial-only, J8), and ruling 1 item 2(e) puts its proof in CI's serial lane, where it passed (§11). INC-1137's local proof is PSG-1…5.
- `bun run db:proof` was not run: there is no migration.
- actionlint and gitleaks: NOT RUN locally (linux/x64 pins on darwin/arm64). CI ran both.
- `bun run checks` ran whole on `13a53a37b`'s tree. `8afc3cc56` (one line in `languages-page.tsx`, one in `translations.md`) was checked on its own tree with `bun run typecheck` (exit 0), `bun run lint` (exit 0), the translations tests (`9 passed`, `60 passed`) and `node scripts/check-bundle-size.mjs` (`Bundle budget OK.`); CI ran every job on it (§11).
- `8afc3cc56`'s stat-card loading flag has no unit test, because the languages page has none. Its proof is typecheck, lint, the translations tests (60 passed) and CI's browser lanes over the page's specs.
- How the screens look rendered is the operator's walk: the notice as a super admin and its absence as a member, and a small dialog's focus by keyboard in Safari.
- Two red-first swaps ran in the working tree, written from `git show` and restored (`git status` clean after each). The scratch copies and build logs are under `/tmp/ethio-scratch/app-fixes/`, which is the operator's to remove.

## 13. Findings

- INC-1128, the router library's reload: `@tanstack/react-router` 1.170.41 `dist/esm/lazyRouteComponent.js` reloads during render on a module-not-found error unless `sessionStorage["tanstack_router_reload:" + message]` is set. `@tanstack/router-plugin` 1.168.42's code-splitter hard-wires `lazyRouteComponent` (`code-splitter/framework-options.js`). Its options (`splitBehavior`, `defaultBehavior`, `deleteNodes`, `addHmr`) reach nothing the reload reads, and `createRouter` has no such option either. Preventing Vite's `vite:preloadError` while leaving hands the library an undefined module, which throws a TypeError and shows the route's error page. The ways out are a package patch, a dependency change, or writing the library's session key. INC-1128 stays OPEN for a package turn (ruling 1 item 3).
- `.cursor/rules/20-tests.mdc:31` (J8) still says `@global-state` tests run serial-only in the nightly. Since `13a53a37b` they run in the serial lane on every push. The rule is not edited here; ruling 2 item 1 gives it to the CI turn's rules items.
- `src/components/shell/stat-card.tsx` has no error state, so a failed stats or roster read shows 0 keys on `/admin/translations` (`languages-page.tsx:124–129`). The stats read behaved this way at the base; the roster read joined it with INC-1143. The languages table shows the roster's error on the same page. Proposed: an `error` state for `StatCard` in a shell turn. MINOR.
- `src/components/shell/impersonation-notice.tsx:62` repeats the banner's class list (`impersonation-banner.tsx:31`), the same look in two places. A shared constant must live where both can import it without the notice importing the banner's module. MINOR.
- None is a security hole (rule 50's read of the diff: §10, and the self-review's heading 8).

## 14. Records

DEC — DEC-372 (for INC-1116; the operator's decision "A as recommended", 2026-11-12 16:40 his local time; the form ruled in the app-fixes turn's ruling 1 and put to him in the reply that carried it) — only a person who holds the admin-panel permission loads and runs the active-impersonation check and its banner, as one on-demand module; a failed permission read is treated as staff; no admin module is in any page's first download (BC-16's allowlist is empty). If that module cannot load, the shell shows staff a plain red notice that a view-as session may be active, with End now, which loads the service on demand and ends the caller's active session. Frozen judge: adopted when a signed-in member's page makes no call to the active-session door and downloads none of the module (IMP-6, BC-16) and IMP-1, IMP-2, IMP-3 and IMP-5 are green in the same run [run 43488341499].

INC — INC-1116 — every signed-in page downloaded the impersonation banner, its hook and its service in the first download and ran the active-session check on load, on each route change and every thirty seconds, though only a super admin can hold a session; fix: DEC-372 — one on-demand module for staff, the gate in the shell, BC-16's allowlist empty; the app-fixes turn; FIXED [9eedabf63; the entry's JS 204.5 → 203.9 KiB, gzipped, this machine's lock-exact builds of 3e3a51a89 and part A].

INC — INC-1128 — the router library's own reload on a module-load error (once per message, its own session key) still interrupts a WebKit navigation during the first load after the pictures turn fixed the site's reloader; OPEN — no seam inside the repository's code; the reading in §13; a package turn.

INC — INC-1130 — a dialog panel smaller than the screen, opened from state, returned the keyboard focus to the page when it closed, in every engine (WCAG 2.4.3); fix: every panel returns the focus to its opener; the app-fixes turn; FIXED d7b458e80; K2: the phone menu (`app-rail.tsx`, its own `onCloseAutoFocus` to the ☰) and `guide-sheet.tsx`'s own handler return the focus by their own code and stay; DropdownMenu and Tooltip have library triggers; every DialogContent, SheetContent and AlertDialogContent opened from state now returns it through the primitives (report §4).

INC — INC-1131 — a picture that failed to load showed a hidden icon and dropped its text alternative (WCAG 1.1.1); fix: the failed frame carries the image role and the text; the app-fixes turn; FIXED d7b458e80.

INC — INC-1134 — the view route logged an error line when asked to count a view for an ad removed a moment before; fix: a typed not-found, quiet, no write (Postgres 23503 read by code; FIXED 314d1a881); the app-fixes turn.

INC — INC-1137 — the pseudo-translation generator listed only the rows the target language already owned (`admin_list_translations`), and a language's rows are made only by the key sync for languages that exist when it runs; a language the generator had just created had none, so it wrote nothing and reported 0 written and 0 failed (`TR-30`, run 43457682073: "Received: "missing""). The supervisor's first reading (rows skipped by offset paging) was wrong; the executor's census read the door. Fix: the generator reads the base language's keys once through the data-API reader and writes each, the writer creating the row; the summary names the keys it could not write; the app-fixes turn; FIXED 314d1a881. Class: a write loop driven by the target's rows, not the source's keys; an operation that did nothing reported as a result.

INC — INC-1135 — amendment line: the `@global-state` tests run in the serial lane on every push since 13a53a37b, 16 tests (12 run, 4 skipped by their own project gates), 126 s of test time (run 43488341499, the smoke lane 16 passed · 0 failed · 0 flaky · 4 skipped, with TR-30 passed on desktop-1280 in 44.2 s) — FIXED.

INC — INC-1140 — the feed's retry button reloads the page by its own call (`feed.tsx` :206) beside the shared cure `refreshPage`; an app turn that may touch the feed's chunk.

INC — INC-1141 — `ai-bulk-bar.tsx` :122 → :165 reads a list by position (the data-API law); not a write loop.

INC — INC-1142 — `use-translations.ts` :385 fetches a static asset by a bare fetch outside the route mechanism.

INC — INC-1143 — `languages-page.tsx` :104 read the base language's total with a literal `"en"` (K4: a language code outside the one constants module and the roster); fix: the roster's `isBase` row; the app-fixes turn; FIXED 13a53a37b (and 8afc3cc56: the stat waits for the roster).

register row — register rows (unnumbered): "the impersonation notice: staff only, fail toward showing (DEC-372)" → the shell's gate → the unit census + IMP-6 → exceptions: none · the stale-chunk row gains CF-STALE-1 · the dialog row: "every panel returns the focus to its opener" · the picture row: "the failed frame keeps its text alternative" · the data-API reader's row gains the generator.

changelog — 2026-11-1x app fixes (Opus 5.5): the impersonation check and its notice for staff only (DEC-372); every dialog gives the focus back to its opener; a failed picture keeps its text; a gone ad's view is a quiet absence; the pseudo generator fills from the base language's keys and names what it could not write; INC-1128 open; the `@global-state` tests on every push.
