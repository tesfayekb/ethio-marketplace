# Housekeeping turn 1b — the first-paint closure is chunked by a rule, the closure becomes a law of the budget, the i18n split lands again — report

Base: 2b11a9d29 (dev; the lane `cursor/housekeeping` began this turn at 1df9c9ed0) · Final commit: b92e0775d · Brief: docs/governance/briefs/housekeeping-1b.md (sha256 e0cd093058e3cc5efbe4264be3905a62735f5614c73560262919c8b2f43b1284) · Ruling 1: docs/governance/briefs/housekeeping-1b-ruling-1.md (sha256 030ebf1aeedf1059eff723444e14be99f44672c807ec32f755f5a2fa4494abda; both sha256 values re-checked at this report on the saved fenced text, equal)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on b92e077

CI: the lane head the turn found, 8aa99c1c0 (stop 2) — run 42837499607, FAILURE: one test, CF-BRIEF-2/3
(the brief law reading this turn's own saved brief); fixed in part B (§11). The base 2b11a9d29 — run
42733115280, SUCCESS. The turn's first push (head e94b42d9a, code at 09bb36b65) — run 42846505952,
FAILURE in one job, the first-paint budget (3 pages, §11); every other job, all 18 E2E lanes included,
green. Fixed in b92e0775d (the final code commit). No run started for the two later pushes (b92e0775d, 6e3fc365b;
INC-1099, §14); the judged run is the run this report's push starts (§11).

## 1. Done / not done, by part and step

| step / part | state | commits |
|---|---|---|
| STEP 0 — brief saved (sha256 equal), roadmap line 3 | done | 80dd83521 |
| STEP 1 — the census (PLAN FIRST) | done, stop 1 | c67861cbc; ruling 1 saved 68891b145 |
| P3 measurement, the frozen rule, the stability proofs | done, stop 2: **P2 adopted — P3 failed the cold half** | 8aa99c1c0 |
| Part A — the `shared-shell` group, `SHARED_SHELL_MODULES`, `moduleKey`, the build plugin | done | e9dac0e9a |
| Part C — the i18n split re-lands (`i18n-context.ts`), the three disables gone, the two deletion-manifest lines removed, the usage maps | done (committed before B: B's census names `i18n-context.ts`, a commit is never red) | 50fae3cd2 |
| Part B — `ENTRY_CLOSURE`, the module census, BC-14, BC-15, the wired caller, the two allowlisted SCOPE findings | done | 482b1aa45 |
| Part D — the ratchet: 39 pages and the entry's JS ceiling lowered; the guide's DEC-362 section | done | 09bb36b65 |
| Part D, again — three pages CI's table ratcheted (`/`, `/c/$slug`, `/dev/style`), §11 | done | b92e0775d |
| STEP 5 — typecheck, lint, scripts laws, unit, build + budget, `bun run checks` whole | done (§5) | — |
| STEP 6 — push, the pull request's CI, the comment | pushed with this report; CI awaited (§11) | — |
| STEP 7 — this report | done | the report commit |

Not done: the browser check is partial — see §12 (the i18n specs ran; one spec flakes at the lane head too).

## 2. Files changed

This turn's own diff, `git diff --name-only 1df9c9ed0..HEAD` (the lane's head when the task was saved; the pull request's diff against dev also carries housekeeping turn 1's 137 paths), 27 paths + this report (the two later rulings joined at the report commit):

```
docs/features/performance-strategy.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-1b-ruling-1.md
docs/governance/briefs/housekeeping-1b-ruling-2.md
docs/governance/briefs/housekeeping-1b-ruling-3.md
docs/governance/briefs/housekeeping-1b.md
docs/governance/reports/housekeeping-1b.stop-1.md
docs/governance/reports/housekeeping-1b.stop-2.md
docs/tracking/intentional-deletions.txt
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/chunk-modules-plugin.d.mts
scripts/chunk-modules-plugin.mjs
scripts/conformance/briefs-allowlist.txt
scripts/conformance/wired.test.ts
scripts/route-budgets.d.mts
scripts/route-budgets.mjs
src/i18n/i18n-context.ts
src/i18n/index.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
vite.config.ts
docs/governance/reports/housekeeping-1b.report.md
```

New files, proven by `git ls-files`: `scripts/chunk-modules-plugin.mjs`, `scripts/chunk-modules-plugin.d.mts`,
`scripts/route-budgets.d.mts`, `src/i18n/i18n-context.ts`, both briefs, both stop reports, this report. Nothing
under `.github/`, `supabase/`, `src/i18n/locales/`, `package.json`, `bun.lock` changed (the flags hold).

The two `.d.mts` files are not in the brief's SCOPE by name: `vite.config.ts` (TypeScript, no `allowJs`)
imports two `.mjs` files, and `bun run typecheck` fails with TS7016 without a declaration. §10.

## 3. Behaviour contract

**The shape (frozen rule of ruling 1: P2).** One Rolldown `output.codeSplitting` group in
`vite.config.ts`, `environments.client.build.rolldownOptions` (the only scope that leaves the server and nitro
builds alone), `{ name: "shared-shell", priority: 100, includeDependenciesRecursively: false,
entriesAware: false, test: sharedShellOwns(moduleKey(id)) }`: 45 of the repository's own modules
(`SHARED_SHELL_MODULES`, a reason each). Reason P2 and not P3: P3 (a second `vendor-shell` group) failed the
cold half — 22 of 50 pages came out 0.6–0.9 KiB above P1's closure with no stability gain over P2 (stop 2).

**The entry's closure, before → after** (the build at the lane head, then the final tree):

- Before, 53 chunks: `ClientOnly button category-tree chevron-right createLucideIcon createServerFn dist dist ellipsis error-text format-locale index jsx-runtime layers lazyRouteComponent legal-kinds legal-reader link location-data not-found notice-outlets on-demand-notice overlay-facade own-key page-head post-prefill preload-helper provider qss query-keys react react-dom reader-locale refresh-after-write return-path rolldown-runtime root route-client signed-in-route spinner supabase-door surface use-legal-gate useMatch useMutation useNavigate useQuery useRouter useRouterState useSearch useSelector utils utils`
- After, 31 chunks (`ENTRY_CLOSURE`, now a law): `ClientOnly bundle-mjs chevron-right createLucideIcon createServerFn dist dist dist ellipsis index jsx-runtime lazyRouteComponent link not-found preload-helper qss react react-dom rolldown-runtime root shared-shell useMatch useMutation useNavigate useQuery useRouter useRouterState useSearch useSelector utils x`

**The entry's size** (local, gzipped, from `node scripts/check-bundle-size.mjs`): JS 211.8 KiB → 206.0 KiB (ceiling
215 → 207); CSS 23.1 KiB unchanged (40).

**The i18n export list of `@/i18n` (src/i18n/index.ts), before → after: unchanged** — 30 names (18 values and
12 types: `BASE_LANGUAGE EMPTY_ENTITY_BUNDLE I18nProvider LANGUAGE_STAR_COOKIE LANGUAGE_STAR_STORAGE_KEY
LANGUAGE_STORAGE_KEY STRINGS_LAYERS SUPPORTED_LANGUAGES catalogPieces catalogText catalogWords drawCatalog
entityName isStringsLayer readDeviceStar shippedCatalogues useI18n useStringsLayers`, and the types
`CatalogPiece CatalogTokens EntityBundle EntityType Language LayerState MessageKey Messages NamedEntity
PublicLanguage ShippedCatalogues StringsLayer`), read from `git show 1df9c9ed0:src/i18n/index.ts` and the
tree by script: equal sets. Only where they come from moved: `useI18n`, `useStringsLayers`,
`LANGUAGE_STAR_STORAGE_KEY`, `LANGUAGE_STAR_COOKIE`, `readDeviceStar` now from `./i18n-context`; the provider,
`LANGUAGE_STORAGE_KEY` and `BASE_LANGUAGE` from `./provider`. `provider.tsx` holds no `eslint-disable`
(`rg -n "eslint-disable" src/i18n` → none; the three INC-1097 lines are gone).

**The server and nitro partitions, on the FINAL tree** (build with the group, build with `groups: []` from the
same tree, `shasum -a 256` over every file of `dist/server`, 352 files each): 348 files byte-identical, same
names. The four that differ: `_tanstack-start-manifest_v-*.mjs` (it names the client's chunks) and — equal
once the client chunk file names' 8-character hashes are normalised — `_ssr/server-*.mjs` and `_ssr/ssr.mjs`
(each differs only in the manifest's hashed name it imports), and `index.mjs`, which is equal once the
public-assets table's `/assets/…` entries and their `mtime`s are removed (251 entries with the group, 277
without — the client's own file set). So the partitions of SSR and nitro are the same module for module;
only the manifest and the public-assets table differ, as the brief's proof demands. The build record
`dist/.chunk-modules.json` is not under `dist/client/` and is named in neither `dist/server/index.mjs` nor
any client file (`rg -c "chunk-modules"` → 0).

**Per-page first downloads, lane head → final tree** (gzipped KiB, local, judged with the 0.1 local allowance,
50 pages): every page fell, by **5.8 to 7.7 KiB** (table in §5).

## 4. Censuses

- `rg -n "codeSplitting|manualChunks|advancedChunks"` over the tree (not node_modules/dist/docs): `vite.config.ts:41`
  (comment) and `:125` (the one group) — no other chunking setting exists.
- `rg -n "moduleKey\(|chunk-modules"`: one definition, `scripts/chunk-modules-plugin.mjs:17`; callers
  `vite.config.ts:66` (the group's `test`), `:119` (the plugin), `scripts/chunk-modules-plugin.mjs:37`; the reader
  `scripts/bundle-closure.mjs:246–256`, the budget step `scripts/check-bundle-size.mjs:167–183`. One spelling of
  a module's identity: the groups, the record and the lists share it.
- `rg -n 'from "(@/i18n/provider|\./provider)"' src`: `src/i18n/i18n-context.ts:4` (type-only), `index.ts:1,9`,
  `server-shell-language.ts:1` (`BASE_LANGUAGE`, unchanged). No consumer imports a hook from the provider module.
- `rg -n "INC-1097"` outside `docs/governance/`: `vite.config.ts:35,38`, `scripts/route-budgets.mjs:120,150,162,173,186,194`,
  `docs/features/performance-strategy.md:349` and `roadmap.md:3` — all say what the code now does.
- The i18n reader census of stop 1 (which files read `provider.tsx`'s text: `scripts/conformance/i18n-overlay.test.ts`
  :50–:60, `language-records.test.ts` :19, `route-client-allowlist.txt`) held: the laws pass (`bunx vitest run
  scripts`, §5).

## 5. Tests

**Added** (scripts/bundle-closure.test.ts): **BC-14** — the closure equals `ENTRY_CLOSURE` by name, hashes
stripped (hyphenated and underscored hashes included): a planted extra name fails by name, a planted missing
name fails by name, a repeated name counts (`dist` ×3 where two are listed, `dist` ×1), and every real line
carries a non-empty reason per occurrence. **BC-15** — the module census: a listed path the tree lacks fails by
path, a listed module another chunk holds fails by path with where it is, a stray module in the group's chunk
fails by name, a path listed twice fails, a build with no `shared-shell` chunk fails; `parseChunkModules`
refuses a non-object and a non-list; the real `SHARED_SHELL_MODULES` has no duplicate, every path exists, every
reason is non-empty. `scripts/conformance/wired.test.ts` names the caller: BC-15 exists in
`bundle-closure.test.ts` and `check-bundle-size.mjs` calls `closureListViolations(` and `moduleCensus(`.
No test id collides (TI-1 passes inside the scripts run).

**Red first**: with `closureListViolations` and `moduleCensus` each made to `return []` (a copy of the file, then
restored — `git diff` empty), `bunx vitest run scripts/bundle-closure.test.ts` → `× BC-14 … AssertionError:
expected [] to deeply equal [ Array(1) ]`, `× BC-15 …` (2 failed | 13 passed); restored → 15 passed. The
planted closures and records are the proof the guard bites; the budget step on the real build also passes only
with the list equal (`bun run build && node scripts/check-bundle-size.mjs`).

**Re-pointed**: `src/i18n/provider-d239.test.tsx`, `provider-layers.test.tsx`, `provider.test.tsx` import the
hooks from `./i18n-context` (their assertions unchanged; the files are the versions of 2b5f7dc6f).

**Totals** (final tree 09bb36b65, this turn's runs):
- `bun run typecheck` — `tsc --noEmit`, clean.
- `bun run lint` — `eslint . --max-warnings 0`, clean (0 warnings).
- `bunx vitest run scripts --maxWorkers=2` — 100 files passed, 513 tests passed, 1 skipped (re-run on b92e0775d: the same).
- `bun run test:unit` — 458 files passed, 2872 tests passed, 1 skipped (includes `src/i18n`'s 11 files, 52 tests).
- `bun run build && node scripts/check-bundle-size.mjs` — `Bundle budget OK.` (JS 206.0 / 207 KiB; 50 pages, none over, none 8 KiB or more under).
- THE CHECKS, last line: `checks: 34 PASS · 0 FAIL · 24 NOT RUN · 427s`; fast line: `checks (fast): 25 PASS · 0 FAIL · 369s` (run whole on the final tree b92e0775d; the first whole run on 09bb36b65 read 34 / 0 / 24, 423 s). The NOTE lines: 0 NEAR (`bundle-budget › the NEAR band (R4)` PASS). NOT RUN, all named with their reason by the runner: actionlint (pinned linux/x64 binary, this machine darwin/arm64), gitleaks (same), the typecheck step of build-and-check (reads Lovable's harness log; I ran `bun run typecheck` myself), every "Install dependencies" step (the tree's dependencies are installed; a package change is its own turn), dependency-audit Install + Audit (the advisory service is not reachable from the sandbox), e2e-preflight (4 steps, needs staging credentials the script never holds), e2e merge steps (6: GitHub artifacts), promote (4: only CI promotes), semgrep SARIF upload and its warn step (GitHub only).

**Browser check** (rule 00 step 7; no spec file changed, so the specs of the group the change touches): `bun run
e2e:local -- e2e/i18n-bundle.spec.ts e2e/i18n-coverage.spec.ts e2e/i18n-layers.spec.ts
e2e/i18n-sign-in-language.spec.ts e2e/smoke-auth-i18n.spec.ts` (both projects, ethio-staging, after `bunx
playwright install chromium`): **35 passed, 3 skipped, 2 failed** — the failures are
`e2e/i18n-coverage.spec.ts:277` "the roles permission matrix renders no raw English vocabulary", both
projects: the page rendered entirely in English (the language control reads `EN`; 83 raw labels), i.e. the
account's Amharic did not apply on that load. §13 finding 1 states what I measured about it; it is not a
chunk that failed to load.

**Per-page table** (lane head → final tree; ceilings before → after; 42 lines lowered: 39 in 09bb36b65, three more in b92e0775d):

| Page | Before (KiB) | After (KiB) | Change | Ceiling before → after |
|---|---:|---:|---:|---|
| `/` | 233.3 | 227.0 | -6.3 | 235 → 228 |
| `/$name` | 231.3 | 225.0 | -6.3 | 233 → 233 |
| `/account` | 274.4 | 268.2 | -6.2 | 277 → 269 |
| `/account_/legal` | 214.5 | 208.6 | -5.9 | 217 → 209 |
| `/account_/legal_/$versionId` | 215.1 | 209.2 | -5.9 | 218 → 210 |
| `/account_/saved` | 231.5 | 225.2 | -6.3 | 233 → 233 |
| `/admin` | 212.7 | 206.9 | -5.8 | 216 → 208 |
| `/admin/` | 213.6 | 207.7 | -5.9 | 216 → 209 |
| `/admin/ai` | 326.3 | 319.5 | -6.8 | 329 → 320 |
| `/admin/attributes` | 339.6 | 332.8 | -6.8 | 342 → 334 |
| `/admin/audit` | 299.3 | 292.6 | -6.7 | 302 → 293 |
| `/admin/categories` | 347.6 | 340.8 | -6.8 | 350 → 342 |
| `/admin/countries` | 329.1 | 322.3 | -6.8 | 332 → 323 |
| `/admin/images` | 213.4 | 207.5 | -5.9 | 216 → 208 |
| `/admin/impersonation_/$sessionId` | 294.0 | 287.7 | -6.3 | 298 → 289 |
| `/admin/legal` | 284.9 | 278.5 | -6.4 | 288 → 279 |
| `/admin/legal_/$versionId` | 282.2 | 275.9 | -6.3 | 285 → 277 |
| `/admin/legal_/edit` | 283.9 | 277.5 | -6.4 | 287 → 278 |
| `/admin/listings` | 351.4 | 344.1 | -7.3 | 353 → 345 |
| `/admin/listings_/$listingId` | 353.0 | 346.5 | -6.5 | 354 → 354 |
| `/admin/listings_/$listingId_/edit` | 413.4 | 405.7 | -7.7 | 414 → 407 |
| `/admin/locations` | 273.5 | 267.6 | -5.9 | 276 → 269 |
| `/admin/monetisation` | 337.3 | 330.1 | -7.2 | 341 → 331 |
| `/admin/places` | 330.6 | 323.9 | -6.7 | 333 → 325 |
| `/admin/roles` | 296.0 | 289.4 | -6.6 | 299 → 290 |
| `/admin/roles_/$roleId` | 276.4 | 270.2 | -6.2 | 279 → 271 |
| `/admin/screening` | 372.4 | 365.5 | -6.9 | 374 → 366 |
| `/admin/translations` | 306.9 | 300.2 | -6.7 | 310 → 301 |
| `/admin/translations_/$lang` | 310.5 | 303.8 | -6.7 | 313 → 305 |
| `/admin/users` | 295.8 | 289.5 | -6.3 | 299 → 290 |
| `/admin/users_/$userId` | 291.1 | 284.7 | -6.4 | 294 → 286 |
| `/auth` | 229.5 | 223.2 | -6.3 | 231 → 231 |
| `/auth_/callback` | 215.9 | 210.0 | -5.9 | 217 → 217 |
| `/auth_/reset` | 217.9 | 212.0 | -5.9 | 219 → 219 |
| `/c/$slug` | 233.3 | 227.0 | -6.3 | 235 → 228 |
| `/dev/primitives` | 233.3 | 227.1 | -6.2 | 236 → 228 |
| `/dev/style` | 254.3 | 247.9 | -6.4 | 256 → 249 |
| `/dev/tall` | 212.1 | 206.3 | -5.8 | 215 → 207 |
| `/l/$slug` | 263.6 | 257.1 | -6.5 | 265 → 265 |
| `/legal/$kind` | 216.5 | 210.7 | -5.8 | 219 → 212 |
| `/legal/accept` | 223.5 | 217.6 | -5.9 | 226 → 219 |
| `/legal/publishing` | 217.3 | 211.4 | -5.9 | 220 → 212 |
| `/my-listings` | 321.7 | 314.9 | -6.8 | 323 → 316 |
| `/my-listings_/$listingId` | 329.7 | 322.7 | -7.0 | 331 → 324 |
| `/my-listings_/$listingId_/edit` | 408.0 | 400.7 | -7.3 | 409 → 402 |
| `/post` | 408.0 | 400.7 | -7.3 | 409 → 402 |
| `/post_/$listingId` | 407.9 | 400.6 | -7.3 | 409 → 402 |
| `/privacy` | 216.5 | 210.7 | -5.8 | 219 → 212 |
| `/settings` | 283.1 | 276.8 | -6.3 | 284 → 284 |
| `/terms` | 216.5 | 210.7 | -5.8 | 219 → 212 |

**Stability** (stop 2, measured on the same method, recorded again): a real code edit of one listed module
(`src/lib/own-key.ts`) renames, in the entry's closure, 0 vendor-only chunks under P2 (the entry and
`shared-shell`: 2), against 15 under P1.

## 6. K2 — siblings that bypass the mechanism

Greps run: the `codeSplitting|manualChunks|advancedChunks` census and the `moduleKey|chunk-modules` census (§4),
`rg -n "MUST_STAY_LAZY|PUBLIC_MUST_STAY_LAZY|MUST_NOT_CARRY" scripts` (the three older lists live in
`scripts/bundle-closure.mjs`; they name what must stay out of the first download, `ENTRY_CLOSURE` names what is
in — two lists, two directions, one reader, one step; no overlap). No file holds a second list of the closure
or a second spelling of a module's identity. Found, in scope and left as the brief covers: none. Out of scope,
reported: the budget lines' long histories in `scripts/route-budgets.mjs` (finding 5, §13 finding 4).

## 7. Allowlists and guards

- `scripts/conformance/briefs-allowlist.txt`: 0 → 2 lines, both `docs/governance/briefs/housekeeping-1b.md:18 SCOPE names
  scripts/check-bundle-size.mjs / scripts/route-budgets.mjs without its test | <reason> | 2026-12-10`. Reason: the
  brief's SCOPE names the budget step and the budget table; their tests are `scripts/bundle-closure.test.ts`
  and `scripts/conformance/budget-band.test.ts`, which CF-BRIEF-3's stem rule (`scripts/conformance/briefs.test.ts:69–73`) cannot see.
  This was the one red of the lane head's CI (§11). The saved brief is byte-for-byte the supervisor's, so the
  allowance is the narrow fix; the expiry is a date because no INC names it — §13 finding 3.
- `docs/tracking/intentional-deletions.txt`: two lines removed (the comment and `src/i18n/i18n-context.ts`):
  the module is now created, not deleted; no file is deleted this turn. `scripts/check-deletions.sh` reads
  only deleted files, so nothing else changes.
- `scripts/conformance/non-null-allowlist.txt`: untouched; no `!`, `any`, `as unknown as` or `@ts-*` added
  (`git diff 1df9c9ed0..HEAD` read for them: none).
- New guard, with its caller: `ENTRY_CLOSURE` (BC-14) and the module census (BC-15), caller named in
  `wired.test.ts`; proven on planted closures and records (§5). Guard self-tests run: BC-1…BC-15,
  `wired.test.ts`, `briefs.test.ts` (CF-BRIEF-1…4), all inside the `scripts` run.
- `scripts/check-bundle-size.mjs`'s 8-KiB ratchet fires on the lane head's old ceilings (42 pages, 39 of them locally and three more under CI's measure, §11); after
  Part D it fires on none.

## 8. Strings

None. FLAG `no-new-string` held: `git diff 1df9c9ed0..HEAD --name-only | rg "src/i18n/locales"` → none. The two
usage maps changed by one line each (`"scanned": 707 → 708`, the new module), regenerated by `bun run i18n:usage`.

## 9. Migrations

None (`git diff --name-only 1df9c9ed0..HEAD | rg "supabase/"` → none; FLAG `no-migration`).

## 10. Departures

1. **STOP 1 and ruling 1** (the census found the brief's `build.rollupOptions` spelling reaches the SSR and
   nitro environments and that `provider.tsx`'s disables hide a re-export); ruling 1 fixed the shape rule, the
   client scope, the ratchet, the lists and the guard. Everything below follows it.
2. **STOP 2** (the frozen rule's verdict: P2; P3 failed the cold half) — recorded in
   `housekeeping-1b.stop-2.md`; ruling 1 said "build to it" with the rule deciding, so work continued.
3. **Order of parts**: Part C (the i18n split) is committed before Part B, because B's census and BC-15 name
   `src/i18n/i18n-context.ts`, and a commit is never red.
4. **Two `.d.mts` declaration files** (`scripts/route-budgets.d.mts`, `scripts/chunk-modules-plugin.d.mts`) —
   not named in SCOPE; `vite.config.ts` imports two `.mjs` files under `tsc` without `allowJs` (TS7016, the
   typecheck would fail). They declare only what vite.config.ts uses.
5. **`scripts/conformance/briefs-allowlist.txt`** — two lines (§7), inside the standing allowance
   (`scripts/conformance/*-allowlist.txt`).
6. **Ratchet comment placement**: ruling 1's `// ratchet housekeeping-1b (<kib> local; DEC-362)` is appended
   after each line's existing comment as ruled; the entry's `BUDGET_KIB.js` line gets its own comment line
   above it (its history is a block of comment lines, not one trailing comment).
7. **Two commands outside the git/shell allowance, disclosed**: (a) I ran `git checkout` with no arguments
   once (to restore `vite.config.ts` after the partition proof) — with no arguments it only lists modified
   paths and changed nothing; the file was restored by copying my own saved copy, and `git status` is clean;
   (b) I ran `rm -rf` on a scratch path that did not exist and `rm` of one scratch file, both under
   `/tmp/ethio-scratch/housekeeping-1b/` (the variant trees). Neither touched the repository.
8. **One report push** as STEP 7 asks: the code and this report go in one push; the CI run id is stated in the
   pull request's description (the run is known only after the push).
9. Local browser runs of §5 used a Chromium I installed with `bunx playwright install chromium` (rule 00
   allows it) into the sandbox's cache.
10. **Rulings 1 → 3 named.** Ruling 1 (stop 1: the shape rule, client scope, ratchet, lists and guard), ruling 2
    (stop 3: wait for the run, never re-push for one; three lines for the report) and ruling 3 (stop 4: push this
    report now, its run is the judged run; INC-1099 and INC-1100 for the records; the warning is nitro's). Rulings 2
    and 3 are saved byte for byte as `docs/governance/briefs/housekeeping-1b-ruling-2.md` and `-ruling-3.md`
    (sha256 7dc759ed132b2da3b53e6e0822d02e770a9d3ba4241dc4aef7228d81b0582569 and
    339dd168f374661e208fdc65aec2c8f1155eba9530dbe2f0ccb68cd13b30e88a, each compared with its carrier's).

## 11. CI

- The base 2b11a9d29: run 42733115280, SUCCESS (housekeeping turn 1's report, §11).
- The lane head this turn found, 8aa99c1c0 (`ci-status.md` at `origin/ci-evidence`, two-step check: its Commit line
  is `8aa99c1c053090b2e1122cde6f98b2379c81c290`, the sha of the stop-2 commit): run 42837499607, conclusion
  **FAILURE**, every job success except Component tests: `scripts/conformance/briefs.test.ts` CF-BRIEF-2/3 —
  `docs/governance/briefs/housekeeping-1b.md:18 SCOPE names scripts/check-bundle-size.mjs / scripts/route-budgets.mjs
  without its test` (read from `gh run view 42837499607 --log-failed`). Class: a guard of an earlier turn reading
  this turn's saved brief — mine to fix first; fixed at its root in part B 482b1aa45 (the two allowlist lines, §7);
  `bunx vitest run scripts/conformance/briefs.test.ts` → 3 passed.
- This pull request's own runs:
  - Run 42846505952 (head e94b42d9a = code 09bb36b65 + this report): conclusion FAILURE, one job red — First-paint bundle
    budget — and every other job success (all 18 E2E lanes and Summarize included). The log's failure, verbatim: `/:
    227.0 KiB, 8 KiB or more under its ceiling of 235 KiB`, `/c/$slug: 227.0 … 235`, `/dev/style: 247.9 … 256`.
    Class (rule 40): a defect of this change, mine — the build is the local build's (the hashed chunk names equal),
    but CI's table has no 0.1 KiB local allowance, so three pages sat 8.0 KiB under their ceilings where the local
    run read 7.9 and did not ratchet them. Cause fixed at its root in b92e0775d: the three lines go to
    `ceilingForLocal(measured)` (235 → 228, 235 → 228, 256 → 249) with their ratchet comment; `CI=1 node
    scripts/check-bundle-size.mjs` (CI's own measure, run locally) → `Bundle budget OK.`; no re-run of CI was used.
  - The judged run is the run this push starts on pull request #34 (the tree holds the last CODE commit b92e0775d);
    its id and check list are read by the supervisor from branch ci-evidence under this commit's sha, since no run
    started for the two earlier pushes (INC-1099). `gh run list --branch cursor/housekeeping` after b92e0775d (16:06
    UTC) and 6e3fc365b (16:17 UTC) listed only the first push's run 42846505952 and earlier ones; I polled until 17:18
    UTC and pushed nothing (ruling 2). The DEC-362 judge's last clause (CI's bundle-budget job and every E2E lane
    green) is that run's.

## 12. Limits

- The browser check is partial. The i18n group's five specs ran locally against ethio-staging: 35 passed, 3
  skipped, 2 failed (the roles-matrix spec, §5, §13 finding 1). The wider browser suite was not run locally
  (rule 20: the specs of the screens and shared helpers I changed — `src/i18n/**` is the one shared module touched,
  `scripts/e2e-select.ts`'s `i18n` group names exactly these five); CI's lanes are the proof.
- Repeats were not run locally (AGENTS.md: CI's repeat lane). The few reruns in finding 1 are an investigation of
  one failure, with the counts stated, and prove nothing about repeatability.
- `bun run checks`' NOT RUN steps, listed in §5, each for a machine or credential reason.
- **Ruling 2 (a): the two local failures of `e2e/i18n-coverage.spec.ts:277`, verbatim.** Run: `bun run e2e:local --
  e2e/i18n-bundle.spec.ts e2e/i18n-coverage.spec.ts e2e/i18n-layers.spec.ts e2e/i18n-sign-in-language.spec.ts
  e2e/smoke-auth-i18n.spec.ts` on the final tree 09bb36b65, ethio-staging. Both projects (`[mobile-360]` and
  `[desktop-1280]`) failed the same assertion, `i18n-coverage.spec.ts:299:82`:
  `expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([])` →
  `- Expected  -  1`, `+ Received  + 85`, `- Array []`, `+ Array [` the 83 Latin labels (the diff's 85 added lines are `+ Array [`, the 83 labels and `+ ]`; the two bodies are
  byte-identical, md5 of the two blocks equal). The 83 labels, in the order the assertion listed them (one per line, as printed):

  ```text
  Account panel
  Admin panel
  Audit logs
  Categories
  Countries
  Impersonation
  Legal documents
  Listings
  Locations
  Packages
  Permissions
  Profiles
  Roles
  Services
  Translations
  User roles
  Access
  Access
  Export
  View
  Assets
  Create
  Delete
  Import
  Manage
  Restructure
  Update
  View
  Activate
  Create
  Delete
  Manage
  Update
  View
  Use
  Edit
  Export
  Publish
  View
  Create
  Delete
  Enforce
  Manage
  Review
  Update
  View
  Create
  Delete
  Import
  Manage
  Restructure
  Update
  View
  Update
  View
  Create
  Delete
  Manage
  Update
  View
  Create
  Delete
  Manage
  Update
  View
  Assign
  Create
  Delete
  Manage
  Update
  View
  Manage
  View
  Approve
  Machine translate
  Manage
  Update
  View
  Create
  Delete
  Manage
  Update
  View
  ```

  What the page showed: the failing mobile run's snapshot (`error-context.md`) has the **whole page in English**: the
  skip link "Skip to content", the menu "Open menu", the language control reading `EN`, the rail ("Listings",
  "Users", "Roles & Permissions", "Audit & Security", "Locations", "Catalog"), the breadcrumb ("Home", "Admin",
  "Roles & Permissions", "Super Admin"). Not only the matrix: the app had not applied `am` on that load. That reads as
  the account language not applied (the spec's `setAmharicAccount` then `gotoReady`), not as missing
  `ui_translations` rows of the admin layer — missing rows would leave the chrome and the matrix partly Amharic. I
  cannot prove it from here: the snapshot is one failure's page, and the staging rows were not read (rule 50: no
  staging reads beyond the browser tests). The supervisor can settle it from the ledger: CI's eighteen lanes were
  green on run 42846505952 (code 09bb36b65), whose backends are seeded, not staging. Local counts: lane-head
  copy 1 failure of 8 executions; final tree 3 of 4; split only 2 of 4; group only 2 of 2 (§13 finding 1). By the
  supervisor's ledger the flake line count for `i18n-coverage` is one in seven days. Ruling 3 reads it as
  deterministic on staging and registers it as INC-1100 (§13 finding 1, §14); not fixed here.
- Logs read: the lane head's CI log (Component tests job) via `gh run view --log-failed`; `ci-status.md` and
  `guards-last-failure.md` at `origin/ci-evidence`. Not read: `e2e-last-failure.md` and `local-backend-proof.md`
  (the lane head's run had every E2E lane green; I did not open them).
- "Cold half" numbers of P1/P2/P3 and the stability proof come from stop 2's builds, not re-run on the final tree;
  the final tree's own numbers are the table (§5) and the partition proof (§3).
- CI measures about 0.1 KiB under a local build (rule 10); the ratchet lines were set by `ceilingForLocal(measured)`
  on the lock-exact local build as ruling 1 orders, so CI's table is the judge.

## 13. Findings

1. **`e2e/i18n-coverage.spec.ts:277` (the roles permission matrix, Amharic) fails on ethio-staging — registered as
   INC-1100 (ruling 3: deterministic on staging, green on CI's seeded backends; fixed in housekeeping turn 2, not
   here; text in §14). My own counts, kept as measured, show it passing more often at the lane head.** The spec signs in as English, calls `setAmharicAccount`, then `gotoReady`s
   `/admin/roles/<id>`; in the failing runs the whole page is English (the language control reads `EN`), so the
   account language did not apply on that load (a race in the account-language reconcile). Counts on
   ethio-staging, one test per project per run: lane-head copy 1 failure in 8 executions (the run of two, then
   three runs of two: one mobile failure); final tree 3 of 4 (the five-spec run: both, then one mobile); the
   final tree with the group removed (the split only) 2 of 4 (mobile both times); the final tree with the split
   reverted (the group only) 2 of 2 (the first attempt aborted on a stale usage map before any browser ran).
   The counts are small and the lane head fails too, so I cannot say the group or the split causes it; they are
   not evidence of repeatability either way. CI's lanes (temporary backend, DEC-283's repeat lane) are the
   judge — and in run 42846505952 (code 09bb36b65) every E2E lane, the one that runs this spec included, was green (§11), and the DEC-362 judge's last clause reverts the shape whole if an E2E red names a chunk that did not load
   or loaded out of order. If CI's i18n lane goes red here, read the account-language path in
   `src/i18n/provider.tsx` against the order the chunks now load; the failing page's snapshot says the provider
   had not applied `am` when `/admin/roles/<id>` drew.
2. **`moduleKey` had to learn that one package can be eight files.** `node_modules/@radix-ui/react-slot/dist/index.mjs`
   exists as eight physical copies (top level and nested under tooltip, alert-dialog, …); a key built from the
   resolved folder named them eight ways and the census saw eight modules. The key drops everything above the
   last `node_modules/`, so the eight share one key (and `\0vite/…` helpers become `node_modules/vite/…`).
   `scripts/chunk-modules-plugin.mjs:17`.
3. **CF-BRIEF-3's stem rule cannot see a budget step's tests** (`scripts/conformance/briefs.test.ts:69–73`: a file
   named in SCOPE needs `<stem>.test.ts`). `scripts/check-bundle-size.mjs` and `scripts/route-budgets.mjs` are
   tested by `bundle-closure.test.ts` and `budget-band.test.ts`. Any brief about the budget meets it. Raised for
   the supervisor: the law should learn a mapping, or briefs name the tests; I allowlisted the two lines with a
   date expiry (no INC names this).
4. **Finding 5 of ruling 1 (for the records turn): the budget lines' histories.** `scripts/route-budgets.mjs`'s
   per-page lines and `BUDGET_KIB` in `scripts/check-bundle-size.mjs` each carry a history of 1–3 KB in one
   trailing comment (the first line of `ROUTE_BUDGETS_KIB` is over 3,000 characters). The records turn moves the
   histories to `docs/features/performance-strategy.md` and leaves each line one sentence.
5. **A literal by-package vendor group grows the entry by +51.8 KiB** (stop 2), because a package group's
   `includeDependenciesRecursively` pulls everything the package reaches into the entry; that is why the shape
   groups the repository's own modules only and leaves vendors to the bundler's names. The `$initial` tag
   (one chunk for the whole entry closure: 2 chunks, 194.8 KiB) was measured and refused: it makes every page
   re-download the shell when any module in it changes.
6. **Cache granularity trade-off, stated.** `shared-shell` (29.2 KiB gzip) is one chunk: an edit to any of its
   45 modules renames it and the entry (a repeat visitor downloads those two again; the vendor chunks keep their names, stop 2's stability proof). A vendor bump that renames a
   bundler-named chunk is a red on `ENTRY_CLOSURE` with the chunk's name — by design, a package change is its
   own turn.
7. **Stop 2's report line 72 says "22 of 52 pages"; the page count is 50.** Correction to my own report: the
   table beside it has 50 rows (`rg -c '^\| `/' docs/governance/reports/housekeeping-1b.stop-2.md` → 50). I did not
   recompute the 22.
8. **Raised — the local budget step hides CI's ratchet by 0.1 KiB** (`scripts/budget-band.mjs` `judgedSize`:
   local adds `LOCAL_ALLOWANCE_KIB`; `scripts/bundle-closure.mjs:187` fires the ratchet on that judged size, so a
   page 8.0–8.1 KiB under its ceiling in CI reads 7.9–8.0 locally). Part D set the lines from the local measure as
   ruling 1 orders and CI's table fired on three pages (§11). A ratchet turn should also run
   `CI=1 node scripts/check-bundle-size.mjs` locally (CI's own measure); the supervisor may want the ratchet to
   judge on the raw size.
9. **The pull request is a draft carrying housekeeping turn 1** (137 paths against dev); this turn's own diff is
   the 27 paths of §2.
10. **Ruling 2 (b): `[warn] inlineDynamicImports option is ignored because the codeSplitting option is specified`
    comes from the NITRO environment's build, not the client's, and not from this change.** Where it prints: in
    every full build log of this turn the line (` WARN  inlineDynamicImports option is ignored because the
    codeSplitting option is specified.`) appears right after `vite v8.1.6 building nitro environment for
    production...` and before its `transforming`, never in the client or ssr environment's section. It prints
    identically on a build of the lane head with no `codeSplitting` in `vite.config.ts` (a `git archive 1df9c9ed0`
    copy: `rg -c codeSplitting vite.config.ts` → no match; the warning at the same place), so this turn's group
    neither causes nor changes it. Where the option is set: nitro's own build config —
    `node_modules/nitro/dist/vite.mjs:28` and `node_modules/nitro/dist/_build/rolldown.mjs:53` pass
    `inlineDynamicImports: nitro.options.inlineDynamicImports` while `:35` / `:48` give the same `output` a
    `codeSplitting: { groups: [{ test: NODE_MODULES_RE, name: libChunkName }] }`; the value is `true` from nitro's
    worker presets (`node_modules/nitro/dist/_presets.mjs:31`, `base-worker`, which `cloudflare-module` — the
    preset this build prints, `[nitro] ◐ Building [Nitro] (preset: cloudflare-module …)` — extends; I read the
    base preset, not the cloudflare preset's own table). Nitro deletes it afterwards (`_build/rolldown.mjs:63–66`),
    but Rolldown has already seen both and warns. The wrapper's own `inlineDynamicImports: true`
    (`node_modules/@lovable.dev/vite-tanstack-config/dist/index.js:459`, in `lovableFetchBundlePreset`) is used only
    when `LOVABLE_NITRO_PRESET=lovable-fetch-bundle` (`index.js:1198`); this build's preset is `cloudflare-module`,
    so it is not the source, and no `inlineDynamicImports` is set in the client environment by the wrapper or by
    us (`rg -n inlineDynamicImports` over the repository outside node_modules → no match). So: Rolldown's note about
    a redundant setting in nitro's own environment; nothing in the client changes, and §3's proof (348 of 352
    `dist/server` files byte-identical; the other four differ only by the client chunk names and the public-assets
    table) stands as measured. For the records turn: a finding, line "the nitro environment's build prints
    Rolldown's `inlineDynamicImports … ignored` warning on every build, from nitro's own presets (nitro
    `_build/rolldown.mjs:48–53`), before and after housekeeping turn 1b; not ours to fix (a package change is its
    own turn)". Ruling 3 words the records line as: "nitro's build sets `inlineDynamicImports` and `codeSplitting`
    together; Rolldown warns; harmless"; no action.

## 14. Records

DEC — DEC-362 (the supervisor, 2026-11-10 07:4x New York, under G17 and DEC-296's frame — the first-paint budget's mechanism; INC-1097 at two occurrences; amended at housekeeping-1b ruling 1 after the census measured the shapes) — the first-paint closure's shared modules travel in named chunks by a code-splitting rule in vite.config.ts scoped to the client environment (Rolldown's `output.codeSplitting` groups; the shape chosen by the frozen rule of ruling 1: P2, because P3 failed the cold half — 22 of 50 pages came out 0.6–0.9 KiB above P1 for no gain in the vendor chunks' stability over P2), and the closure is a law of the budget: `scripts/route-budgets.mjs` lists the chunk names every page downloads (ENTRY_CLOSURE, a reason per occurrence) and the modules each group holds (SHARED_SHELL_MODULES), and the budget step fails on a chunk that joins or leaves the closure, on a listed module missing from the tree or from its chunk, and on a stray module in a group's chunk. Frozen judge: adopted when, with the i18n split re-landed, no page's first download is above housekeeping turn 1's final table [every page fell: by 5.8 to 7.7 KiB], the closure's chunk count fell [53 → 31], the server and nitro partitions are byte-identical to the build without the groups [the same modules; only the manifest and the public-assets table differ], the ratcheted ceilings are lowered in the same commit [42 pages and the entry's 215 → 207], the three INC-1097 disables are gone, and CI's bundle-budget job and every E2E lane are green on the pull request [run: stated in the pull request's description]; reverted whole (the groups, the lists, the plugin and the i18n split together) if CI's budget job fails or an E2E lane's red names a chunk that did not load or loaded out of order.

INC — INC-1097 — status line: FIXED in housekeeping turn 1b — the group shared-shell (vite.config.ts), ENTRY_CLOSURE in route-budgets.mjs with its test, the i18n split landed (i18n-context.ts), provider.tsx's three disables gone; the first occurrence (P-1c b's +0.9 KiB, route-budgets.mjs :45's comment) is explained by the same mechanism.

slip — S573 (the supervisor; housekeeping-1b GO): the GO named the deprecated `build.rollupOptions` and did not foresee that a top-level build option reaches the SSR and nitro environments; it wrote "falls by three or stays" without an ESTIMATE label (G5) where the measurement is 22–32 chunks and 5.8–12.1 KiB a page; it named spinner and on-demand-notice as merge targets that were already their own chunks. Corrective: a GO about the build's shape states no counts (S562) and names the environment a build option reaches.

register row — one row (unnumbered; the records turn numbers it): "the first-paint closure is chunked by a rule and is a law of the budget" → `vite.config.ts` (the `shared-shell` group, client environment only), `scripts/route-budgets.mjs` (`SHARED_SHELL_MODULES`, `sharedShellOwns`, `ENTRY_CLOSURE`), `scripts/chunk-modules-plugin.mjs` (`moduleKey`, the build's chunk → modules record, `dist/.chunk-modules.json`), `scripts/bundle-closure.mjs` (`closureListViolations`, `moduleCensus`, `parseChunkModules`), `scripts/check-bundle-size.mjs` (the budget step) → BC-14, BC-15 (caller named in `scripts/conformance/wired.test.ts`) → exceptions: none; and the corrected cell of the i18n row: the hooks and device-star readers live in `src/i18n/i18n-context.ts`, the provider in `src/i18n/provider.tsx` (the `@/i18n` export list unchanged).

changelog — 2026-11-10 — housekeeping turn 1b (pull request #34): the first-paint closure is chunked by a rule — one `shared-shell` group of the repository's own modules in `vite.config.ts` (client environment only; the server and nitro builds are unchanged module for module), the entry's closure 53 → 31 chunks and every page's first download 5.8 to 7.7 KiB lighter; the closure is a law of the budget step (`ENTRY_CLOSURE`, the module census, BC-14, BC-15) and 42 pages' ceilings and the entry's JS ceiling (215 → 207) are lowered; the i18n split lands again (`src/i18n/i18n-context.ts`) and `provider.tsx`'s three INC-1097 lint disables are gone (DEC-362, INC-1097).

roadmap — line 23 (The housekeeping turn): turn 1b done in housekeeping turn 1b — "the chunk rule for the first-paint closure" (INC-1097, DEC-362) and "the i18n split again"; the lint exceptions of turn 1 are gone. Next on the lane: housekeeping turns 2 → 4 as the bundle names them; the records turn moves the budget lines' histories to `docs/features/performance-strategy.md` (§13 finding 4).

INC — INC-1099 — a push to an open pull request started no CI workflow run (2026-11-10; cursor/housekeeping, the pushes of b92e0775d 16:06 UTC and 6e3fc365b 16:17 UTC; CodeQL ran on both and passed). Defect: `.github/workflows/ci.yml`'s `pull_request` trigger (no path filter; concurrency `ci-${{ github.ref }}`, cancel-in-progress false; nothing running at 16:06) started no run for either push; neither commit message carries a skip marker; `gh run list --branch cursor/housekeeping` listed only CodeQL; the supervisor's watcher on ci-evidence found no completed run in 45 minutes. Root cause: not readable from the repository or the evidence branch — GitHub's own view (the executor's `gh run list`) is the only witness. Class: a missing run for a covered push (INC-061's class); the harness cannot tell "no run started" from "a slow run" for a lane. Prevention: rule 40 / G67 — a push with no run listed after fifteen minutes is reported with the listing and the operator re-triggers by closing and reopening the pull request, never by a re-push (rules turn 4; instructions v1.18); the per-branch CI status file (INC-1039 / DEC-321, housekeeping turn 3) makes a lane's run state readable from ci-evidence. Status: OPEN — the re-trigger path is the operator's; the prevention lands in turn 3 and the rules turn.

INC — INC-1100 — a signed-in test's Amharic account language did not apply on the page it then read (2026-11-10; housekeeping-1b's local run on ethio-staging, `e2e/i18n-coverage.spec.ts` :277 "the roles permission matrix renders no raw English vocabulary", both projects). Defect: after `setAmharicAccount` (the spec-local helper, :108 — a `profiles.preferred_language = 'am'` write through the service client plus the device language) and `gotoReady(/admin/roles/<id>)`, the whole chrome rendered in English (the language control `EN`, the rail, the breadcrumb) and the matrix listed 83 Latin labels — byte-identical failure bodies in both projects, so deterministic on staging; CI's seeded backends pass it; the flake ledger holds one same-day line of the same shape ("the admin shell renders no English fallback", shard 12, 2026-11-10). Class: a test asserts an effect it only assumed — the helper writes the row and never proves the page took the language (G38: tests see what a person sees); and D239's session-start language path (`src/i18n/server-shell-language.ts`; the published language at session start) may not re-read a profile written after sign-in on a shared backend. Mechanism: the one language-setting helper for signed-in tests (e2e/helpers — NONE YET: the spec-local helper is the only copy), which sets the account language, re-enters the session or reloads as the product does, and asserts the chrome's language before returning. Fix: housekeeping turn 2 (the e2e tree) — the helper onto e2e/helpers with its proof of effect and a census of every spec that sets an account or device language (i18n-coverage, i18n-sign-in-language, locale-format, page-head, shell); the server path read first (G23). Status: OPEN.
