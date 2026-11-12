STOP — housekeeping-1b step 1: the census; the rule's shape needs ruling 1 (two shapes, one scoping, the ratchet on 50 pages)
DONE: STEP 0 (brief saved, sha256 e0cd0930…b1284 equal to the folder's file; roadmap line 3 written; commit 80dd83521 `housekeeping-1b: task saved`; lane head before it 1df9c9ed0 = origin/cursor/housekeeping; `git status --short` empty), STEP 1 (this census; nothing under `src/`, `scripts/`, `vite.config.ts` changed)
LEFT: STEPS 2 → 7 (the group, the closure law, the i18n split, the checks, the report), after ruling 1
CI: the last completed run on the lane's last CODE commit — `55a296384` (run 42810138275): SUCCESS; the run on the lane head `1df9c9ed0` (a report-only commit; run 42814067426): completed, SUCCESS, 41 pass, 1 skipping (`gh pr checks 34`, read after it completed). `origin/ci-evidence` `ci-status.md` still reports `55a2963` (SUCCESS) — the two-step read: the reported commit is not the head, so it is stale for the head and the run's own conclusion above is the head's verdict.
FILES: `git diff --name-only 1df9c9ed0` → `docs/governance/briefs/housekeeping-1b.md`, `roadmap.md` (plus this report)

# Housekeeping 1b — step 1 census

Every number below is from a build I ran in this task: the lane head's own build (`bun run build`, lock-exact `node_modules`, `bun run build` is `vite build`), and scratch builds in `/tmp/ethio-scratch/housekeeping-1b/tree` (a copy of the tree with a throw-away plugin that dumps each chunk's modules and each module's imports; the copy's output file names equal the lane head's build byte for byte, so the plugin changes nothing). That folder is the operator's to remove. Sizes are the budget step's own (`node scripts/check-bundle-size.mjs`, gzip level 6, local build; the per-page figures are printed without the local 0.1 allowance, as the step prints them).

## (a) The entry's static closure at the lane's head

Read from the build the way `scripts/bundle-closure.mjs` reads it (`staticClosure` over the entry `index-cyapQdq5.js`), with each chunk's modules from the bundler's own chunk records (a `generateBundle` dump: `modules`, and `moduleParsed`'s `importedIds` / `dynamicallyImportedIds` for the module graph). **53 chunks**, 211.8 KiB gzipped (CSS 23.1 KiB separately). Chunk names, hashes stripped:

`ClientOnly button category-tree chevron-right createLucideIcon createServerFn dist dist ellipsis error-text format-locale index jsx-runtime layers lazyRouteComponent legal-kinds legal-reader link location-data not-found notice-outlets on-demand-notice overlay-facade own-key page-head post-prefill preload-helper provider qss query-keys react react-dom reader-locale refresh-after-write return-path rolldown-runtime root route-client signed-in-route spinner supabase-door surface use-legal-gate useMatch useMutation useNavigate useQuery useRouter useRouterState useSearch useSelector utils utils`

The shared modules (statically imported by the entry's closure AND reached statically from at least one lazy chunk) and where each travels today:

- **Folded into the entry** (`index`, 242 modules, 51 of them shared): the shell and its feeders — `src/features/auth/auth-result.ts` (15 lazy targets), `auth-error-key.ts`, `use-auth.ts`, `sign-out.ts`, `session-policy.ts`, `src/components/shell/*` (band-row, menu-current, strings-layers, strings-layer-gate, favourite-category, use-shown-pathname), `src/components/ui/{cut-text,dropdown-menu,dialog-primitive,tooltip,breadcrumb}.tsx`, `src/lib/{press,resilient-lazy,sign-out-landing}.ts`, `src/features/admin/{sections,impersonation/*}`, `src/features/permissions/*`, and the route stubs (`src/routes/*.tsx`, 1 lazy target each — the split route components import their own route module).
- **Inside another shared chunk**: `src/lib/on-demand-failure.ts`, `src/i18n/entity.ts`, `src/features/auth/auth-client.ts`, `preferred-language.ts`, `src/i18n/bundle.ts`, `compiled-catalog.ts`, `locales/en-base.ts` (41.6 KB rendered) and `provider.tsx` (15.4 KB) are all in the **`provider` chunk** (66 KB rendered, 64 lazy targets); `src/lib/load-once.ts` and `session-key.ts` are in **`supabase-door`**.
- **A chunk of their own** (the bundler's choice, by which modules happen to reference them): `button` (button, button-variants), `category-tree`, `error-text`, `format-locale`, `layers`, `legal-kinds`, `legal-reader`, `location-data` (+ geo-distance, uuid), `notice-outlets`, `on-demand-notice` (+ notice-dock), `overlay-facade` (+ overlay-loader), `own-key`, `page-head`, `post-prefill` (+ use-label-room, place-order), `query-keys`, `reader-locale`, `refresh-after-write`, `return-path`, `route-client`, `signed-in-route`, `spinner`, `surface`, `use-legal-gate`, and the `dist` chunk that holds `menu-row.ts` with two Radix modules (a vendor name given to an application module).
- 25 of the 53 chunks hold no `src/` module (vendor only): 38.1 KiB gzipped between them.

Per-chunk module lists are in `/tmp/ethio-scratch/housekeeping-1b/closure-base.txt` (345 lines; the operator's folder, not committed).

## (b) The same closure with the i18n split applied (the three files of 2b5f7dc6f, scratch build)

`provider.tsx`, `index.ts`, `i18n-context.ts` and the three provider tests copied from `git show 2b5f7dc6f:…`. **57 chunks** (53 → 57), entry closure 211.8 → 212.8 KiB, every page +1.0 … +1.4 KiB (table below). `provider` leaves the closure (`provider.tsx` folds into the entry); five chunks join:

| new chunk | holds |
|---|---|
| `i18n-context` | `src/i18n/i18n-context.ts`, `compiled-catalog.ts`, `locales/en-base.ts` |
| `auth-result` | `auth-result.ts`, `auth-client.ts`, `auth-error-key.ts`, `session-policy.ts` |
| `entity` | `src/i18n/entity.ts` |
| `on-demand-failure` | `src/lib/on-demand-failure.ts` |
| `load-once` | `src/lib/load-once.ts` |

That is the four INC-1097 names (auth-result, on-demand-failure, entity, load-once) plus `i18n-context`; no other module moved. The P-1c b artefact's two (`spinner`, `on-demand-notice`) are already their own chunks at the lane head (`scripts/route-budgets.mjs` :45's comment).

## (c) The bundler's option as installed

`node_modules/rolldown/dist/shared/define-config-GlCPZt1X.d.mts` (rolldown 1.1.0): `output.codeSplitting?: boolean | CodeSplittingOptions` (:824); `advancedChunks` is `@deprecated` in its favour (:834 …, :826–:841's text). `CodeSplittingOptions` (:1185) has `groups?: CodeSplittingGroup[]` (:1213). The group fields I used (`CodeSplittingGroup`, :983):

- `name: string | (id) => string | null` — the chunk's name (`[name]-[hash].js`);
- `test?: string | RegExp | (id) => boolean` — which modules the group captures;
- `priority?: number` (default 0);
- `minShareCount?: number` (:1097, default 1 — how many entry chunks reference the module);
- `entriesAware?: boolean` (:1135, default false — one chunk for all matches, which is what a single client entry wants);
- `includeDependenciesRecursively?: boolean` (:1159, **default true** — see (d): it matters);
- `tags?: ['$initial']` (:1174 — "statically imported by a user-defined entry or part of its dependency chain").

**Where `vite` 8.1.6 exposes it.** `build.rollupOptions` is `@deprecated — Use rolldownOptions instead` (`node_modules/vite/dist/node/index.d.ts` :2170–:2178: both exist, `rollupOptions` is the alias). So the brief's `vite.build.rollupOptions.output` is the deprecated spelling; the group goes under `rolldownOptions.output.codeSplitting`. **A premise that does not hold, and the consequential one:** a top-level `build.rolldownOptions` applies to every Vite environment the TanStack Start / Nitro build runs (`client`, `ssr`, `nitro`). I built it that way: the same group reshaped the server (SSR chunks 277 → 246, nitro 317 → 287, 44 and 220 chunks' module lists changed) — the brief's STOP condition ("a rule that changes the SERVER bundle's shape"). Scoped to the client environment — `vite: { environments: { client: { build: { rolldownOptions: { output: { codeSplitting: { groups: [ … ] } } } } } } }` through the wrapper's `vite` option — the SSR and nitro chunk partitions are **identical** to the build without the group (every chunk's module list equal; the only differences are the route manifest module and nitro's public-assets table, which name the client chunks by design), and the client chunks change as measured. So the plan scopes the group to `environments.client`.

## (d) The proposed group

Name `shared-shell` (the closure guard's prefix rules: `entryChunks` matches `^(entry|index|main)[.-]`, so it is not an entry chunk; none of `MUST_STAY_LAZY` / `PUBLIC_MUST_STAY_LAZY` (`reader-failure`, `legal-page-data`, `zod`, `posting-service`, `overlays-impl`, `category-glyphs`, `date-calendar`, `leaflet`, `en-member`, `am-member`, `en-admin`, `am-admin`) is a prefix of it; `MUST_NOT_CARRY` (`GoTrueClient`) is by text and held in every trial).

`test`: a function over the module's path against a list the repository owns — the **45 `src/` modules that today travel in their own chunks** (the census's "a chunk of their own" and "inside another shared chunk", measured on the split build; the list from the unsplit lane head has 44: it holds `src/i18n/provider.tsx`, `src/i18n/bundle.ts` and `src/features/auth/preferred-language.ts` where the split's holds `src/i18n/i18n-context.ts`, `src/features/auth/auth-result.ts`, `auth-error-key.ts` and `session-policy.ts`):

- `src/features/auth/auth-client.ts`
- `src/features/session/session-policy.ts`
- `src/features/auth/auth-error-key.ts`
- `src/features/auth/auth-result.ts`
- `src/components/ui/button-variants.ts`
- `src/components/ui/button.tsx`
- `src/features/categories/category-tree.ts`
- `src/components/shell/menu-row.ts`
- `src/i18n/entity.ts`
- `src/lib/error-text.ts`
- `src/lib/locale.ts`
- `src/lib/format-locale.ts`
- `src/i18n/locales/en-base.ts`
- `src/i18n/compiled-catalog.ts`
- `src/i18n/i18n-context.ts`
- `src/components/layout/layers.ts`
- `src/features/legal/legal-kinds.ts`
- `src/features/legal/legal-reader.ts`
- `src/lib/load-once.ts`
- `src/lib/geo-distance.ts`
- `src/lib/uuid.ts`
- `src/components/shell/location-data.ts`
- `src/lib/notice-outlets.ts`
- `src/lib/on-demand-failure.ts`
- `src/components/shell/notice-dock.ts`
- `src/components/shell/on-demand-notice.tsx`
- `src/components/ui/overlay-loader.ts`
- `src/components/ui/overlay-facade.tsx`
- `src/lib/own-key.ts`
- `src/lib/page-head.ts`
- `src/components/ui/use-label-room.ts`
- `src/lib/place-order.ts`
- `src/features/posting/post-prefill.ts`
- `src/lib/query-keys.ts`
- `src/lib/reader-locale.ts`
- `src/lib/refresh-after-write.ts`
- `src/lib/return-path.ts`
- `src/lib/route-client.ts`
- `src/lib/signed-in-route.ts`
- `src/components/brand/spinner.tsx`
- `src/lib/session-key.ts`
- `src/lib/supabase-door.ts`
- `src/components/layout/surface.ts`
- `src/features/legal/use-legal-gate.ts`
- `src/lib/utils.ts`

`priority: 100` (only group; wins over automatic chunking), `minShareCount` left at 1 (the list is the filter, not the count), `entriesAware` false.

Two shapes were measured; they differ in one field, and the ruling is yours (below):

| | P1 `includeDependenciesRecursively` default (true) | P2 `includeDependenciesRecursively: false` |
|---|---|---|
| the group chunk | 87 modules (the 45 + 42 vendor modules the 45 import: react, react-dom, query-core, tailwind-merge, lucide, radix slot, clsx, cva …) — 50.1 KiB gz | the 45 modules only — 29.2 KiB gz |
| closure chunks (JS) | 53 → **21** | 53 → **31** |
| entry JS | 211.8 → **203.2** KiB | 211.8 → **206.0** KiB |
| every page | −8.6 … −12.1 KiB | −5.8 … −7.7 KiB |
| vendor-only chunks (stable across a deploy that changes only `src/`) | 25 / 38.1 KiB → 19 / **24.3 KiB** | 25 / 38.1 → 29 / 47.7 KiB |

The entry closures, names with hashes stripped:

- P1 (21): `ClientOnly chevron-right createServerFn dist ellipsis index lazyRouteComponent link not-found qss rolldown-runtime root shared-shell useMatch useMutation useNavigate useRouter useRouterState useSearch useSelector utils`
- P2 (31): `ClientOnly bundle-mjs chevron-right createLucideIcon createServerFn dist dist dist ellipsis index jsx-runtime lazyRouteComponent link not-found preload-helper qss react react-dom rolldown-runtime root shared-shell useMatch useMutation useNavigate useQuery useRouter useRouterState useSearch useSelector utils x`

With i18n split not applied the group alone measures: P1 21 chunks, entry 202.8 KiB; the split on top of the group costs +0.4 KiB entry (203.2). A third shape was measured for completeness: `tags: ['$initial']` with no `test` (everything the entry imports statically, by the bundler's own notion): the closure becomes **2 chunks** (`index` 390 modules + `rolldown-runtime`), 194.8 KiB — and the named group dissolves into the entry chunk, so it is not "a named group of shared modules" and ENTRY_CLOSURE would list two names; I report it as a finding (§i), not as the plan.

Why the saving exists (it is much larger than the brief's "falls by three or stays"): the closure's raw size is 650.9 KiB in 53 files; gzipped file by file 211.8 KiB, gzipped as one stream 201.1 KiB — merging recovers most of the 10.7 KiB that per-file compression and per-chunk import glue cost. P1's 21 chunks sum to 203.2 KiB (one stream 199.6).

`entriesAware`: not needed — the client has one entry; the SSR/nitro bundles are not touched because the group is scoped to the client environment (c).

## (e) The guard's shape

- Where the closure is read today: `scripts/check-bundle-size.mjs` :118–:145 (`jsEntries` :118 → `staticClosure` → `mustStayLazyViolation` :128, `carriedViolation` :136, the totals :145); the per-page closures :203–:223 (`readRouteManifest` :203, `judgeRouteBudgets` :210) (`readRouteManifest`, `routePreloads`, `judgeRouteBudgets`); `scripts/bundle-closure.mjs` :29 (`staticClosure`), :44 (`entryChunks`), :53 (`MUST_STAY_LAZY`).
- Proposed: a pure `closureListViolations(closureNames, expected)` in `bundle-closure.mjs` (hashes stripped by `/-[A-Za-z0-9_-]{8}\.js$/`, which I checked against every name in the build: names with hyphens and hashes that contain `-`, e.g. `useMatch-i8-xg83V.js`, `root-DLTE-HSj.js`, `on-demand-notice-BC3xzsKv.js`, strip correctly) comparing the entry closure as a **multiset** of names (the base has `dist` ×2 and `utils` ×2, P2 `dist` ×3), failing with the chunk name that joined or left; `ENTRY_CLOSURE` in `scripts/route-budgets.mjs` as `{ name: reason }` lines (G55's form without an expiry; multiplicity as `dist: ["reason", "reason"]` or a count — the plan's choice, say so in the ruling); called in `check-bundle-size.mjs` right after `mustStayLazyViolation`, before the sizes are totalled, exit 1 with the name. `scripts/ci/turn-checks.ts` treats a budget-step failure as FAIL unless it is NEAR-only (`pageSizes`, :366), so the new failure is a FAIL with its text — no change to `scripts/ci/`.
- Test ids: `BC-1` … `BC-13` are used in `scripts/bundle-closure.test.ts` (grep over `src/`, `e2e/`, `scripts/`: no `BC-14` or higher anywhere) — next free **BC-14** (the list passes; a planted extra name fails by name; a planted missing name fails by name; the multiplicity case). `budget-band.test.ts` is unchanged.
- The ENTRY_CLOSURE names would be the chosen shape's closure as measured: P1's 21 (below) or P2's 31 (below); most are bundler names derived from vendor module paths (`useSelector`, `link`, `utils`, …), so a dependency bump that renames one is a red with a cause — by design, and a package change is its own turn.

## (f) Every list a new name must join

- `MUST_STAY_LAZY`, `PUBLIC_MUST_STAY_LAZY`, `MUST_NOT_CARRY`: nothing joins (`shared-shell` is a prefix of none; every trial passed those checks — the budget step reached its per-page stage each time).
- `scripts/conformance/overlays.test.ts` (`WATCHED`, `MAY_REACH`): unchanged — `overlay-facade.tsx` and `overlay-loader.ts` are in the group's list; `overlays-impl` stays a dynamic import, reached only from `overlay-loader.ts` (`MAY_REACH["./overlays-impl"]`), and is in no closure in any trial.
- `scripts/e2e-select.ts` :237–:240: the `i18n` group's `src: ["src/i18n/**"]` already covers a new `src/i18n/i18n-context.ts` (specs `e2e/i18n-*.spec.ts`, `e2e/smoke-auth-i18n.spec.ts`); `vite.config.ts`, `scripts/bundle-closure.mjs`, `scripts/route-budgets.mjs` and `scripts/check-bundle-size.mjs` are named by no selector group (`rg "vite.config|bundle|route-budgets" scripts/e2e-select.ts`: no match), so `bun run e2e:changed` selects nothing for them.
- `docs/tracking/intentional-deletions.txt` :125–:126: the `src/i18n/i18n-context.ts` line (added by 64f80cf60) — `scripts/check-deletions.sh` judges only `git diff --diff-filter=D base..head`: the file is absent at the base of the pull request (`dev`) and at the head today, so no range sees a deletion, and a pre-existing manifest line "declares nothing"; when the file returns the line is stale text and the brief's "retire" is a removal of those two lines (the comment and the path). No guard reads the manifest for a file that exists (`rg` for the manifest's name over `scripts/` and `.github/`: `scripts/check-deletions.sh`, and `scripts/conformance/executor-hooks.test.ts` :208, which seeds its own scratch copy). Say if a manifest line for a present file is wanted by any other reading.
- Other readers of provider.tsx's text that the split does not disturb (still in `provider.tsx`): `scripts/conformance/i18n-overlay.test.ts` :50–:60, `language-records.test.ts` :19 (`EXCEPTED`), `scripts/conformance/route-client-allowlist.txt` :5, `src/lib/env-flags.test.ts` :37, `src/features/auth/preferred-language.test.ts` :91. `e2e/i18n-coverage.spec.ts` :6 imports `LANGUAGE_STORAGE_KEY` from `src/i18n/provider` (still exported there). Importers of `./provider` besides `index.ts`: `src/i18n/server-shell-language.ts` :1 (`BASE_LANGUAGE`).

## (g) The first-download table at the lane's head, against the scratch shapes

(KiB gzipped, the budget step's per-page column; the delta is against the lane head. P1/P2 are the split plus the group.) The budget step at the lane head: OK, `JS: 211.8 / 215`, `CSS: 23.1 / 40`.

| page | ceiling | base (lane head) | i18n split alone | split + group P1 | split + group P2 |
|---|---|---|---|---|---|
| `/` | 235 | 233.3 | 234.5 (+1.2) | 223.8 (-9.5) | 227 (-6.3) |
| `/$name` | 233 | 231.3 | 232.4 (+1.1) | 221.9 (-9.4) | 225 (-6.3) |
| `/account` | 277 | 274.4 | 275.6 (+1.2) | 265.1 (-9.3) | 268.2 (-6.2) |
| `/account_/legal` | 217 | 214.5 | 215.5 (+1.0) | 205.7 (-8.8) | 208.6 (-5.9) |
| `/account_/legal_/$versionId` | 218 | 215.1 | 216.1 (+1.0) | 206.3 (-8.8) | 209.2 (-5.9) |
| `/account_/saved` | 233 | 231.5 | 232.6 (+1.1) | 222 (-9.5) | 225.2 (-6.3) |
| `/admin` | 216 | 212.7 | 213.8 (+1.1) | 204.1 (-8.6) | 206.9 (-5.8) |
| `/admin/` | 216 | 213.6 | 214.6 (+1.0) | 204.9 (-8.7) | 207.7 (-5.9) |
| `/admin/ai` | 329 | 326.3 | 327.5 (+1.2) | 315.8 (-10.5) | 319.5 (-6.8) |
| `/admin/attributes` | 342 | 339.6 | 340.8 (+1.2) | 329 (-10.6) | 332.8 (-6.8) |
| `/admin/audit` | 302 | 299.3 | 300.5 (+1.2) | 288.9 (-10.4) | 292.6 (-6.7) |
| `/admin/categories` | 350 | 347.6 | 348.8 (+1.2) | 336.9 (-10.7) | 340.8 (-6.8) |
| `/admin/countries` | 332 | 329.1 | 330.3 (+1.2) | 318.5 (-10.6) | 322.3 (-6.8) |
| `/admin/images` | 216 | 213.4 | 214.4 (+1.0) | 204.7 (-8.7) | 207.5 (-5.9) |
| `/admin/impersonation_/$sessionId` | 298 | 294 | 295.1 (+1.1) | 284.3 (-9.7) | 287.7 (-6.3) |
| `/admin/legal` | 288 | 284.9 | 286 (+1.1) | 275.3 (-9.6) | 278.5 (-6.4) |
| `/admin/legal_/$versionId` | 285 | 282.2 | 283.4 (+1.2) | 272.8 (-9.4) | 275.9 (-6.3) |
| `/admin/legal_/edit` | 287 | 283.9 | 285 (+1.1) | 274.3 (-9.6) | 277.5 (-6.4) |
| `/admin/listings` | 353 | 351.4 | 352.7 (+1.3) | 340 (-11.4) | 344.1 (-7.3) |
| `/admin/listings_/$listingId` | 354 | 353 | 354.2 (+1.2) | 342.6 (-10.4) | 346.5 (-6.5) |
| `/admin/listings_/$listingId_/edit` | 414 | 413.4 | 414.8 (+1.4) | 401.3 (-12.1) | 405.7 (-7.7) |
| `/admin/locations` | 276 | 273.5 | 274.5 (+1.0) | 264.7 (-8.8) | 267.6 (-5.9) |
| `/admin/monetisation` | 341 | 337.3 | 338.6 (+1.3) | 326.2 (-11.1) | 330.1 (-7.2) |
| `/admin/places` | 333 | 330.6 | 331.8 (+1.2) | 320 (-10.6) | 323.9 (-6.7) |
| `/admin/roles` | 299 | 296 | 297.2 (+1.2) | 285.8 (-10.2) | 289.4 (-6.6) |
| `/admin/roles_/$roleId` | 279 | 276.4 | 277.5 (+1.1) | 267.1 (-9.3) | 270.2 (-6.2) |
| `/admin/screening` | 374 | 372.4 | 373.7 (+1.3) | 361.1 (-11.3) | 365.5 (-6.9) |
| `/admin/translations` | 310 | 306.9 | 308.1 (+1.2) | 296.6 (-10.3) | 300.2 (-6.7) |
| `/admin/translations_/$lang` | 313 | 310.5 | 311.7 (+1.2) | 300.1 (-10.4) | 303.8 (-6.7) |
| `/admin/users` | 299 | 295.8 | 296.9 (+1.1) | 286.1 (-9.7) | 289.5 (-6.3) |
| `/admin/users_/$userId` | 294 | 291.1 | 292.2 (+1.1) | 281.4 (-9.7) | 284.7 (-6.4) |
| `/auth` | 231 | 229.5 | 230.6 (+1.1) | 220 (-9.5) | 223.2 (-6.3) |
| `/auth_/callback` | 217 | 215.9 | 217 (+1.1) | 207.1 (-8.8) | 210 (-5.9) |
| `/auth_/reset` | 219 | 217.9 | 219 (+1.1) | 209 (-8.9) | 212 (-5.9) |
| `/c/$slug` | 235 | 233.3 | 234.5 (+1.2) | 223.8 (-9.5) | 227 (-6.3) |
| `/dev/primitives` | 236 | 233.3 | 234.5 (+1.2) | 223.8 (-9.5) | 227.1 (-6.2) |
| `/dev/style` | 256 | 254.3 | 255.4 (+1.1) | 244.3 (-10.0) | 247.9 (-6.4) |
| `/dev/tall` | 215 | 212.1 | 213.2 (+1.1) | 203.5 (-8.6) | 206.3 (-5.8) |
| `/l/$slug` | 265 | 263.6 | 264.8 (+1.2) | 253.5 (-10.1) | 257.1 (-6.5) |
| `/legal/$kind` | 219 | 216.5 | 217.6 (+1.1) | 207.8 (-8.7) | 210.7 (-5.8) |
| `/legal/accept` | 226 | 223.5 | 224.6 (+1.1) | 214.6 (-8.9) | 217.6 (-5.9) |
| `/legal/publishing` | 220 | 217.3 | 218.3 (+1.0) | 208.5 (-8.8) | 211.4 (-5.9) |
| `/my-listings` | 323 | 321.7 | 322.9 (+1.2) | 311 (-10.7) | 314.9 (-6.8) |
| `/my-listings_/$listingId` | 331 | 329.7 | 330.9 (+1.2) | 318.8 (-10.9) | 322.7 (-7.0) |
| `/my-listings_/$listingId_/edit` | 409 | 408 | 409.3 (+1.3) | 396.5 (-11.5) | 400.7 (-7.3) |
| `/post` | 409 | 408 | 409.3 (+1.3) | 396.4 (-11.6) | 400.7 (-7.3) |
| `/post_/$listingId` | 409 | 407.9 | 409.3 (+1.4) | 396.4 (-11.5) | 400.6 (-7.3) |
| `/privacy` | 219 | 216.5 | 217.6 (+1.1) | 207.7 (-8.8) | 210.7 (-5.8) |
| `/settings` | 284 | 283.1 | 284.2 (+1.1) | 273.6 (-9.5) | 276.8 (-6.3) |
| `/terms` | 219 | 216.5 | 217.6 (+1.1) | 207.7 (-8.8) | 210.7 (-5.8) |

Verdicts of the same step on the shapes: the split alone fails 9 pages over their ceilings (INC-1097's stop 4); **P1 fails 50 pages' ratchet (8 KiB or more under its ceiling) and P2 fails 39; neither fails a ceiling** — the law that every saving is kept, so the same commit must lower those pages' lines (50 under P1, 39 under P2) in `scripts/route-budgets.mjs` (scope names that file) and, for the entry, `BUDGET_KIB.js` in `check-bundle-size.mjs` (215 → 204 for P1 by `ceilingForLocal(203.2)`; the entry's line is not under the ratchet — only the NEAR band bounds it above — so lowering it is the ruling's choice).

## (h) Premises found wrong or different

1. `build.rollupOptions.output` — deprecated alias of `rolldownOptions` in vite 8.1.6; and at the top level it reaches the SSR and nitro environments (a STOP by the brief's tolerance). The group must be scoped to `environments.client`.
2. "the closure's chunk count falls by three or stays" — it falls by 22 (P2) or 32 (P1); and "no page grows" holds with a margin of 5.8 … 12.1 KiB, which the ratchet turns into 39 (P2) or 50 (P1) lines of `route-budgets.mjs` that must move down in the same commit.
3. "a `test` regex that matches nothing is silent — so the guard's list is what fails": confirmed by construction (a stale path in the list is not an error in the bundler); the guard's list of chunk names is the failing party, and the module list itself has no check — see Findings 1.
4. "the four INC-1097 chunks … the P-1c b artefact's spinner and on-demand-notice among them": the split makes five chunks (the four plus `i18n-context`); `spinner` and `on-demand-notice` are already their own chunks at the lane head, in every shape.

## (i) Findings beyond the task

1. **The module list is the rule, and nothing checks it against the build.** If a listed path is renamed, the bundler captures nothing for it silently and the closure grows a new chunk name — the budget step then fails *by that name* (the law catches it, one hop late). A small census (every path in the group's list exists; the group chunk holds each) would fail one hop earlier; it is a new guard (K3: same pull request, with its `wired.test.ts` caller) and the brief does not ask for it. Say if you want it in this turn.
2. **Returning visitors pay for P1.** P1 moves 14 KiB gz of vendor code (react, react-dom, query-core, tailwind-merge, lucide, radix) out of its own stable chunks into `shared-shell`, which gets a new hash whenever any of the 45 `src/` modules changes: vendor-only chunks fall 38.1 → 24.3 KiB. A cold visit saves 8.6–12.1 KiB, a returning visit after a deploy that touches a shared module re-downloads ~14 KiB it kept before. P2 keeps the vendor chunks (47.7 KiB, 4 more) and saves 5.8 KiB or more cold. The brief's measure is the cold first download; the choice between the two is the supervisor's.
3. **`tags: ['$initial']`** (no list) would make the closure 2 chunks and 194.8 KiB cold, immune to any future move — the rule the brief's title names ("chunked by a rule, not by which module happens to reference a shared module") taken to its end; it dissolves the named group into the entry and the entry chunk becomes 1.35 MB raw (one cache unit changed by every deploy; its vendor part today is stable). I measured it, did not run it in a browser, and do not propose it without a ruling.
4. **A single-chunk group's ordering has not been run.** Playwright does not start inside Cursor's sandbox (rule 20); the group changes where modules sit, not what they do, but execution order of the chunks (react-dom before its users, the i18n provider before the shell) has been proven only by the build's own static checks and by CI's lanes after the push. CI's E2E lanes are the judge; I will paste the lane results.
5. The route budgets' comments at :45's artefact (`P-1c b`) and the `BUDGET_KIB` comment history (`check-bundle-size.mjs` :35–:54) are long; lowering 39–50 ceilings adds as many comment fragments to lines that are already hundreds of characters. A shorter form for a ratchet line is the plan's question, not a defect.

## What I need in ruling 1

1. **Shape**: P1 (default recursion: 21 chunks, entry 203.2, −8.6 … −12.1 KiB, vendor stable chunks 38.1 → 24.3) or P2 (`includeDependenciesRecursively: false`: 31 chunks, entry 206.0, −5.8 KiB or more, vendor chunks kept).
2. **Scope**: `vite.environments.client.build.rolldownOptions` (the only form that leaves the server bundle alone) — confirm; the brief's `build.rollupOptions` spelling reshapes it.
3. **The ratchet**: the commit that lands the group lowers the ratcheted pages' ceilings (39 or 50 by shape) in `scripts/route-budgets.mjs` (DEC-296 `ceilingForLocal`, one line fragment each) and the entry's `js` ceiling — confirm, and say whether the entry's line follows.
4. **Finding 1**: the list-against-build census inside this turn, or left under Findings.
5. The ENTRY_CLOSURE form for a name that occurs twice (`dist`, `utils`): a count or a list of reasons.
