# TASK — P-1c turn (d): the whole-catalogue fold (roadmap line 7's debt), INC-1048 (the Countries console's Amharic), INC-1049 (one `grantRole`) — report

Base: cfecc476f · Final commit: 6c0e7d775 · Brief: docs/governance/briefs/p1c-fold-d.md (no sha256
given for the brief; the attached file `inc1048-am-countries.md` sha256
`e508eaafaa7cb326fdd46ed042190c7319facb7999763c3975b24398a12e1821` — matched by `shasum -a 256`
this turn) · Ruling 1: docs/governance/briefs/p1c-fold-d-ruling-1.md
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 6c0e7d775

Model: Claude Fable 5.1 (Cursor). Phase 1 (PLAN FIRST) was the census stop of the previous chat;
this report covers phase 2, the build on ruling 1.

## 1. Done / not done, by part and step

Done, in ruling 1's order:

- Item 1 THE FOLD (commit `46ba87087`, part A): (i) `has(key: string): boolean` on `useI18n`
  (`src/i18n/provider.tsx`: `ownValue(messages, key) !== undefined || ownValue(enFirstPaint, key) !==
  undefined`); `permission-matrix.tsx` asks `has(key)` before `t`; `history.ts`'s `reasonLabel` takes
  the predicate; `listing-page.tsx` passes `has`; `history.test.ts` passes
  `(key) => ownValue(en, key) !== undefined`. (iii) `shippedCatalogues()` in
  `src/i18n/compiled-catalog.ts` behind `loadOnce`, exported through `src/i18n/index.ts`; the Sync
  click is the ruled chain; `shippedCatalogues` joins DEFINERS in `on-demand-failure.test.ts`; the two
  `as unknown as` casts are gone. Not (ii), as ruled.
- Item 2 THE GUARD CF-LOC-1 (same commit): `scripts/conformance/locale-imports.ts`,
  `locale-imports.test.ts` (CFLI-1…4), `locale-imports-allowlist.txt` (header only); census over
  `src/**` minus `src/i18n/**` and tests, static and dynamic forms, `@/` and relative paths resolved;
  `en-base` exempted by name in the rule with the reason in the guard's header (option A); the
  caller named in `wired.test.ts`.
- Item 3 THE REGISTER: row **108** in `docs/governance/mechanisms.md` (8-pipe form, after row 107);
  rows 19 and 107's notes brought level (commit `6c0e7d775`, part E).
- Item 4 BUDGETS (commit `81e936ef2`, part D): the three lines came down in DEC-296's ratchet form
  with the ruled cause: `/admin/listings_/$listingId` 401 → 353 = ceilingForLocal(351.6),
  `/admin/roles_/$roleId` 328 → 279 = ceilingForLocal(278.2), `/admin/translations` 433 → 310 =
  ceilingForLocal(308.7). Every other line untouched (`git diff --stat`: 3 insertions, 3 deletions).
- Item 5 PART 3 (commit `860b9a32c`, part C): `grantRole(userId, roleName)` in `e2e/helpers/users.ts`
  beside `leaseUser`, tag `[e2e:users]`, body unchanged; `categories.ts` keeps
  `export { grantRole } from "./users"`; `translations.ts`'s dead export gone; `admin-shell.spec.ts`
  imports from `./helpers/users`; `admin-shell.spec.ts` ran whole locally, both projects, 0 retries:
  12 passed.
- Item 6 PART 2 INC-1048 (commit `3019f3e14`, part B): the 70 `admin.countries.*` values of
  `src/i18n/locales/am-admin.ts` replaced in place from the file's `ts` block by a script
  (`/tmp`, never retyped): 45 changed, 25 identical (decoded comparison); no key added, removed or
  moved (the file's order equals the file's key order, asserted); no `\u` escape left among them;
  `en-admin.ts` untouched (`git diff --quiet`).
- Item 7 PART 4 docs (commit `6c0e7d775`, part E): `docs/features/i18n-runtime.md` (§No screen
  imports a locale module — `has`, `shippedCatalogues`, CF-LOC-1 and its one exemption; the Sync
  note), `docs/features/admin-guide.md` (§Turn (c)'s weight note closes; §Turn (b)'s pointer),
  `roadmap.md` line 7 (the carried clause and the fold go; the measured drop stays; the other debts
  stay) and the new INC-1049 line below it; one `docs/_changelog.md` line (rule 10, standing
  allowance).
- Item 8 TESTS: unit tests of items 1 and 2 (section 5); the ruled ids ran, both projects, 0
  retries (section 5: 29 passed, 3 failed on the first run — classified there, none a STOP by item 8's
  rule); `admin-shell.spec.ts` whole.
- Item 9: this report; PR #18 ready; the watch and the "every check green" comment follow.

Not done: nothing of the ruling. Not ruled and not done: turn (c)'s own changelog line (its brief's
item 2 deferred it to "(d)" meaning that brief's later phase; this task's ruling does not name it).

## 2. Files changed

`git diff --name-only cfecc476f` (28 files):

```
docs/_changelog.md
docs/features/admin-guide.md
docs/features/i18n-runtime.md
docs/governance/briefs/p1c-fold-d-ruling-1.md
docs/governance/briefs/p1c-fold-d.md
docs/governance/mechanisms.md
e2e/admin-shell.spec.ts
e2e/helpers/categories.ts
e2e/helpers/translations.ts
e2e/helpers/users.ts
roadmap.md
scripts/conformance/locale-imports-allowlist.txt
scripts/conformance/locale-imports.test.ts
scripts/conformance/locale-imports.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/features/admin-listings/history.test.ts
src/features/admin-listings/history.ts
src/features/admin-listings/listing-page.tsx
src/features/admin/roles/permission-matrix.tsx
src/features/admin/translations/languages-page.tsx
src/i18n/compiled-catalog.ts
src/i18n/compiled-layer-loader.test.ts
src/i18n/index.ts
src/i18n/locales/am-admin.ts
src/i18n/provider-layers.test.tsx
src/i18n/provider.tsx
```

New files (`git ls-files` lists them): `scripts/conformance/locale-imports.ts`,
`scripts/conformance/locale-imports.test.ts`, `scripts/conformance/locale-imports-allowlist.txt`,
`docs/governance/briefs/p1c-fold-d.md`, `docs/governance/briefs/p1c-fold-d-ruling-1.md`. Every path
is in SCOPE or the standing allowance (`docs/_changelog.md`, briefs, reports, roadmap, features,
mechanisms). No deletion. `docs/generated/i18n-usage.json` and `public/i18n-usage.json` unchanged
after `bun run i18n:usage` (no `t(` key added, removed or moved).

## 3. Behaviour contract — before → after

| Place | Before (cfecc476f) | After |
| --- | --- | --- |
| `useI18n()` value | `{ t, language, entities, … }` | gains `has(key): boolean` — true when `messages` (the loaded layers and the DB overlay's written rows) or the English first paint owns the key; never throws; no other field changes |
| `reasonLabel(reason, t, catalogue)` (`history.ts`) | third argument a catalogue object, read through `ownValue` | third argument a predicate `has`; same answers: a known key → `t(key)`, an unknown or inherited name → the raw reason |
| `/admin/listings/$id` history reasons | `reasonLabel(entry.reason, t, en)` with the whole `en.ts` imported | `reasonLabel(entry.reason, t, has)`; the admin layer is loaded by the admin layout's gate before the page draws, so every reason key the page used to find is found |
| `/admin/roles/$roleId` matrix labels | `key in en` (the whole catalogue) then `t(key)` | `has(key)` then `t(key)`; a key of the admin layer (loaded) or a DB-written row answers true (the ruled widening); the warn line for a missing key unchanged |
| `/admin/translations` Sync keys | `sync.mutateAsync({ en, am })` with both catalogues in the page's first download | `guard(() => shippedCatalogues().catch(report + rethrow).then(({ en, am }) => sync.mutateAsync({ en, am })))`; the joins download on the click (`loadOnce`, one object per visit); a failed download → `reportOnDemandFailure("the shipped strings")` (the shell's one notice) and the section's own error line through the existing `.catch(setErrorKey(translationErrorKey))`; the mutation's payload is the same text (CLL-4) |
| `shippedCatalogues()` (new) | — | `Promise<{ en, am }>`: built from the layer loaders — the first paint (`enBase`), the language's base, each `STRINGS_LAYERS` part in order — equal to `en.ts` / `am.ts`; no new chunk |
| `compiled-catalog.ts` static imports | `error-text`, `load-once`, types | + `enBase` (already in the entry through the provider; measured −0.1 KiB or equal on every page, section 4) |
| `scripts/route-budgets.mjs` | 401 / 328 / 433 | 353 / 279 / 310; the other lines unchanged |
| `e2e/helpers/users.ts` | no `grantRole` | `grantRole(userId, roleName)` — the same INSERT, tag `[e2e:users]` |
| `e2e/helpers/categories.ts` | its own `grantRole` body (tag `[e2e:c2]`) | `export { grantRole } from "./users"` (eleven importers untouched) |
| `e2e/helpers/translations.ts` | a dead `grantRole` export (tag `[e2e:u4b]`) | gone |
| `e2e/admin-shell.spec.ts` | a local `grantRole` (tag `[e2e:admin-shell]`) | imports `grantRole` from `./helpers/users`; six call sites unchanged |
| `am-admin.ts` `admin.countries.*` | 70 `\u`-escaped literals | 70 plain Ethiopic literals from the file (45 changed texts, section 8) |

Nothing else differs: no route, door, schema, status or string key changed.

## 4. Censuses

- Whole-catalogue importers in `src/` (`rg -n "i18n/locales/(en|am)(\"|')" src`): base — `listing-page.tsx:28`, `permission-matrix.tsx:7`, `languages-page.tsx:28–29` (the three folded), `src/lib/page-head.ts:1` (`en-base`, the ruled exemption), `src/i18n/types.ts:1` (type-only, inside `src/i18n`). Tree — CF-LOC-1's census: `[CF-LOC-1] files read: 673; findings: 0; allowlist: 0`.
- Planted proofs (CFLI-2, CFLI-3, inside the test under `node_modules/.cache/locale-imports-*`, removed in `finally`): a static import, a relative import and a re-export → 3 findings; a dynamic `import("@/i18n/locales/am")` → 1 finding; `en-base`, a type-only import, a file inside `src/i18n/` and a same-named path elsewhere → none (CFLI-4). The real tree with the old `permission-matrix.tsx:7` import re-planted went red in the earlier run of this turn (`permission-matrix.tsx:7 imports src/i18n/locales/en`), then restored.
- The three measured drops (local; base `cfecc476f` built from `git archive` in `/tmp/p1c-d-base`, the tree built after it, never concurrently; closures by `scripts/bundle-closure.mjs` through `/tmp/p1c-b-dump.mjs`, the diff by `/tmp/p1c-c-diff.mjs`): `/admin/listings_/$listingId` 400.2 → 351.6 (**−48.6**: en.js −0.2, en-admin −27.8, en-guide −10.2, en-member −10.2, history −0.1, index −0.2, provider +0.1); `/admin/roles_/$roleId` 326.8 → 278.2 (**−48.6**); `/admin/translations` 431.7 → 308.7 (**−123.0**: + am-admin −34.6, am-base −14.1, am-guide −13.1, am-member −12.6). Every other page −0.1 KiB or unchanged (index −0.2, provider +0.1); none grew; none inside the NEAR band (`bundle-budget › the NEAR band (R4): 0 NEAR, none grew`).
- A first shape of `shippedCatalogues` (`import("./locales/en")` / `import("./locales/am")`) made the bundler split `en-base` out of the entry's provider chunk: +0.1 KiB on every page (measured, 16 pages listed by the diff). The landed shape joins the existing loaders instead; that measurement is the reason in the function's comment.
- `grantRole` definitions (`rg -n "function grantRole" e2e`): 13 of the signature `(userId, roleName)` at base (helpers/categories, helpers/translations, admin-shell, admin-users, admin-roles, admin-audit, auth-signout, rbac, mfa-stepup, shell, shell-table-law, i18n-coverage, category-image-routes) + 3 of another signature (my-listings-doors :299, my-listings-ad :281, ad-page-doors :139). After: one in `helpers/users.ts`, the re-export in `categories.ts`, ten spec-local copies left (roadmap INC-1049 line).
- INC-1048: the file's `ts` block holds 70 `admin.countries.*` entries; `am-admin.ts` holds 70 at base and after (`rg -c`); the diff's hunks lie in lines 1575–1670 of the base and name only `admin.countries.*` keys.

## 5. Tests

Added / changed:

- `src/i18n/provider-layers.test.tsx` **PSL-5** (`has` is "no,yes,no,no" for a member key, a base key, `constructor`, `no.such.key` with no layer asked — false, never a throw) and **PSL-6** ("yes,yes,no,no" once the member layer resolves — the same sources as `t`). File: 6 passed.
- `src/i18n/compiled-layer-loader.test.ts` **CLL-4** (`shippedCatalogues()` equals `en` and `am` whole; the same object on the second ask). File: 4 passed.
- `scripts/conformance/locale-imports.test.ts` **CFLI-1…4** (section 4); ids renamed from LOC-1…4 after TI-1 found them taken by `src/routes/api/locations.test.ts`; planting rewritten inline after PPF-1.
- `src/features/admin-listings/history.test.ts` INC-799's three tests pass the predicate `hasEn` instead of the catalogue (the signature change of item 1).
- `scripts/conformance/on-demand-failure.test.ts` DEFINERS gains `shippedCatalogues`; `scripts/conformance/wired.test.ts` names `locale-imports.test.ts` (CFLI-4).

Unit totals: component-tests (inside THE CHECKS) `Tests 1 failed | 2717 passed (2718)` — the one is NH-6 (Mac-only, below); the laws (`bunx vitest run scripts --maxWorkers=2`) `1 failed | 454 passed (455)` — NH-6 again. `bun run typecheck`: clean (`tsc --noEmit`, no output).

THE CHECKS (`bun run checks`, whole, on `6c0e7d775`'s tree): fast line
`checks (fast): 17 PASS · 4 FAIL · 254s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam`;
last line `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 314s`. The four FAIL are the known Mac-only ones:
`laws-first › scripts/ tests first` and `component-tests` (NH-6: this machine resolves no New York
zone), `build-and-check › Workflow lint (actionlint, pinned)` and `secrets-scan › gitleaks (pinned)`
(linux x64 binaries). The build-and-check steps they blocked were run by hand, all green:
`bun run format:check` (All matched files use Prettier code style), `bun run lint` (0 errors, 46
pre-existing warnings), `scripts/e2e-select.ts --self-test` (OK), `scripts/check-root-routes.ts
--self-test` (12 allowed, 5 refused) and its run (61 entries, every root segment safe), `bun run
build` (exit 0), `node scripts/check-bundle-size.mjs` (Bundle budget OK). NOT RUN, each named by the
runner: dependency-audit (2: the advisory service unreachable from the sandbox), e2e-preflight (4:
staging credentials the script never holds), e2e (6: GitHub artefacts), promote (4: CI only),
build-and-check Install/Typecheck/Format/Lint/e2e-selector/Root-routes/Build/Bundle report (9: an
earlier step failed — run by hand above), laws-first's changed-folders unit tests and Semgrep ERROR
(2: after NH-6 — covered by component-tests and the semgrep job's full scan, both run),
bundle-budget › Install (1), semgrep › Upload SARIF and its Warn (2).

E2E (ethio-staging, `bun run e2e:local`, both projects, 0 retries):

- `e2e/admin-shell.spec.ts` whole: `Running 12 tests using 2 workers` → `12 passed (42.0s)`; `[ssr-error]` 0 (`rg -c` over the log).
- The ruled ids (`--grep "RP-3 |RP-4 |RP-7 |RP-8 |RP-11 |RP-12 |RP-17 |AL-17 |AL-18 |AL-20 |AL-26 |AL-28 |ATR-1 |TR-7 |TR-9 "` over admin-roles, admin-listings, admin-translations-console): 32 ran → `29 passed (3.0m)`, `3 failed`; `[ssr-error]` 0. The three, classified by item 8's rule (a STOP only when the failure body or server log touches a path this turn changed):
  - AL-20 (both projects) at `admin-listings.spec.ts:1491`: the listing's stored title read back as the new title **concatenated with the old** (`"Corrected listing yhpuibda" + "E2E admin listing local jcfoywnk"`). The spec clears the field with `Control+A` + `Backspace` (lines 1468 and 1481); on this macOS Chromium `Control+A` selects nothing, so the typed text lands beside the old one — the wizard's save and the page's `<h1>{listing.title}</h1>` (the only line of mine near it is an import removal) print what was stored. An environment effect of the local runner, not a path this turn changed; CI's Linux lane is the proof (AL-20 passed on `cfecc476f`'s E2E run).
  - RP-8 desktop-1280 at `helpers/ui.ts:1318`: on `/admin/roles` (the list, not a page of this turn) the language pick did not reach `<html lang="am">` within 15 s. An investigation run of RP-8 alone (both projects, 0 retries): `2 passed (13.3s)`. Reported, not a STOP; CI's repeat lane judges repeatability.
- TR-21 is CI's lane (ruling). `bun run e2e:changed` not run: the selector is CI's.

J-audit (`e2e/**` changed): J1 — the moved `grantRole` writes the same `user_roles` row it wrote before, on scratch or pooled users only; no new state · J2 — no dial touched · J3 — ethio-staging through the harness only · J4 — no identity leaks: the helper takes an id · J5 — no new anchor · J6 — no `waitForTimeout`, `.first()` or `test.only` added (`rg` over the four files: none of mine) · J7 — no assertion changed · J8 — both projects ran · J9 — the fixtures are the spec's own.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "i18n/locales/" src e2e scripts`, `rg -n "function grantRole" e2e`, `rg -n "as unknown as" src/i18n`.

- Whole-catalogue imports in tests (outside CF-LOC-1's ruled census): `e2e/admin-shell.spec.ts:9`, and every e2e spec and unit test reading `en` (e.g. `src/features/admin-listings/history.test.ts:9`) — tests, weightless, left by the rule's definition.
- `src/i18n/types.ts:1` type import of `en-base` (inside `src/i18n`, type-only) — not a bypass.
- `src/i18n/provider.tsx:43` `enBase as unknown as Messages` — pre-existing, beside the new `has`; outside the numbered changes, untouched.
- `grantRole`: the ten spec-local copies (admin-users, admin-roles, admin-audit, auth-signout, rbac, mfa-stepup, shell, shell-table-law, i18n-coverage, category-image-routes) and the three same-name helpers of the other signature (my-listings-doors :299, my-listings-ad :281, ad-page-doors :139 → `grantScratchRole` when touched) — the roadmap's INC-1049 line, at most three spec files a turn.
- `e2e/helpers/categories.ts` keeps a second import path to the one helper (the ruled re-export).

## 7. Allowlists and guards

- `scripts/conformance/locale-imports-allowlist.txt` (new): 0 lines before → 0 after (header only; empty by design — the one exemption is in the rule).
- `scripts/conformance/on-demand-failure.test.ts` DEFINERS: `compiled-catalog.ts` 2 → 3 names (`shippedCatalogues`); its allowlist unchanged.
- `scripts/conformance/non-null-allowlist.txt`: unchanged; no file gained a `!`.
- Guard self-tests run: CF-LOC-1 CFLI-2/3 (planted), the real-tree plant (section 4); `check-hardcoded-strings.sh` self-test (bad fixture 1, good 0; findings 0); `check-root-routes.ts --self-test`; `e2e-select.ts --self-test`; the am-script guard, strings-layers guard, PPF-1, TI-1 and wired.test.ts inside the laws run (all green but NH-6).

## 8. Strings

No new key; no EN text changed. The 45 changed Amharic values (INC-1048, copied from the file by
key; the 25 others are the same text with the `\u` escapes replaced by the literal):

| Key | EN | AM before | AM after |
| --- | --- | --- | --- |
| `admin.countries.caption` | Every market on record | በመዝገብ ላይ ያሉ ሱሉ ገበያዎች | በመዝገብ ላይ ያሉ ሁሉም ገበያዎች |
| `admin.countries.loading` | Loading countries… | አገሮች በመጠር ላይ… | አገሮች በመጫን ላይ… |
| `admin.countries.error` | The countries could not be loaded. | አገሮቹ መጠር አልተታሩም። | አገሮቹ ሊጫኑ አልቻሉም። |
| `admin.countries.filter.allStatusesOption` | Status: open and closed | ሁኔታ፦ ክፉት እና ዝግ | ሁኔታ፦ ክፍት እና ዝግ |
| `admin.countries.filter.openOnly` | Open only | ክፉት ብቻ | ክፍት ብቻ |
| `admin.countries.col.places` | Places active / total | ብሪ ባትዎች ፣ በዠት | ቦታዎች ንቁ / ጠቅላላ |
| `admin.countries.col.units` | Units · currency | መለክያ · ገንዘብ | መለኪያ · ገንዘብ |
| `admin.countries.col.rail` | Rail order | የሓድድ ቅደት | የዋና ምድቦች ቅደም ተከተል |
| `admin.countries.col.roles` | Roles scoped | የታሰሩ ሚናዎች | የተገደቡ ሚናዎች |
| `admin.countries.badge.open` | Open | ክፉት | ክፍት |
| `admin.countries.places.hint` | Active places · places on record | ብሪ ባትዎች · በመዝገብ ላይ ያሉ ባትዎች | ንቁ ቦታዎች · በመዝገብ ላይ ያሉ ቦታዎች |
| `admin.countries.rail.hint` | How many roots this market orders for itself; 0 follows the global order. | ይህ ገበያ ለራሱ በማዘገጀት የሚያዛቸው የሥር ምድቦች ብዙነት፡ 0 አለምአቀፍ ቅደት ይከተላል። | ይህ ገበያ ለራሱ ስንት ዋና ምድቦችን እንደሚደረድር፤ 0 ዓለም አቀፉን ቅደም ተከተል ይከተላል። |
| `admin.countries.roles.hint` | Role grants scoped to this market. | ለእነዚህ ገበያ የተሰሩ ሚናዎች። | በዚህ ገበያ የተገደቡ የሚና ፈቃዶች። |
| `admin.countries.unit.imperial` | Imperial | ኢምፐሪያል | ኢምፔሪያል |
| `admin.countries.field.name` | Name (English) | ስም (እንግሊዝ) | ስም (እንግሊዝኛ) |
| `admin.countries.field.unit` | Unit system | የመለክያ ስርዓት | የመለኪያ ሥርዓት |
| `admin.countries.field.currencyHint` | The ISO 4217 code, e.g. ETB. Leave empty where there is none. | የISO 4217 ኮድ፡ መሳላ፡ ETB። የለልም ካለ ባዶ ይሓ። | የISO 4217 ኮድ፣ ለምሳሌ ETB። ከሌለ ባዶ ይተዉት። |
| `admin.countries.field.order` | Order | ቅደት | ቅደም ተከተል |
| `admin.countries.action.close` | Close this market | ይህን ገበያ ዝጊ | ይህን ገበያ ዝጋ |
| `admin.countries.action.railOrder` | Rail order | የሓድድ ቅደት | የዋና ምድቦች ቅደም ተከተል |
| `admin.countries.edit.anchorActive` | Its anchor place is active. | የእሩ መሰረት ባት ብሪ ነው። | መልህቅ ቦታው ንቁ ነው። |
| `admin.countries.edit.anchorInactive` | Its anchor place is still inactive. | የእሩ መሰረት ባት አለበሪም። | መልህቅ ቦታው አሁንም ንቁ አይደለም። |
| `admin.countries.edit.translationsLink` | Names in other languages are edited in Translations → Data. | በሌሎች ዮንያዎች ያሉ ስሞች በትርጁማን → ዳትና ይሰነዳሉ። | በሌሎች ቋንቋዎች ያሉ ስሞች በትርጉሞች → ዳታ ውስጥ ይታረማሉ። |
| `admin.countries.open.hint` | Shoppers start browsing it and its anchor place becomes active. | ገዛዎች መመልከት ይጀምራሉ፡ የእሩ መሰረት ባትም ብሪ ይሆናል። | ገዢዎች ማሰስ ይጀምራሉ፣ መልህቅ ቦታውም ንቁ ይሆናል። |
| `admin.countries.close.title` | Close this market | ይህን ገበያ ዝጊ | ይህን ገበያ ዝጋ |
| `admin.countries.close.hint` | It disappears from browse. Nothing is deleted. | ከመመልከት ይሰወራል። ምንም አይሰረዝም። | ከማሰስ ይጠፋል። ምንም አይሰረዝም። |
| `admin.countries.close.confirm` | Close | ዝጊ | ዝጋ |
| `admin.countries.close.scopedHint` | {count} role grants are scoped to this market. Closing it hides the market and keeps every grant. | {count} የሚና ሚናዎች ለእነዚህ ገበያ ተሰሩ ነው። መዝጋት ገበያውን ይሰይማል ሚናዎቹን ግን ያቆያል። | {count} የሚና ፈቃዶች በዚህ ገበያ የተገደቡ ናቸው። መዝጋት ገበያውን ይደብቃል፣ እያንዳንዱን ፈቃድ ግን ይጠብቃል። |
| `admin.countries.rail.title` | Rail order | የሓድድ ቅደት | የዋና ምድቦች ቅደም ተከተል |
| `admin.countries.rail.hintDialog` | The order below is the order shoppers see in this market. | ከዚህ በታች ያለው ቅደት በእነዚህ ገበያ ገዛዎች የሚያዩት ነው። | ከዚህ በታች ያለው ቅደም ተከተል በዚህ ገበያ ገዢዎች የሚያዩት ነው። |
| `admin.countries.rail.globalNote` | This market follows the global order today. | ይህ ገበያ አሁን አለምአቀፍ ቅደት ይከተላል። | ይህ ገበያ ዛሬ ዓለም አቀፉን ቅደም ተከተል ይከተላል። |
| `admin.countries.rail.up` | Move up | ወደ ላይ | ወደ ላይ አንቀሳቅስ |
| `admin.countries.rail.down` | Move down | ወደ ታች | ወደ ታች አንቀሳቅስ |
| `admin.countries.rail.submit` | Save order | ቅደቱን አስቀምጥ | ቅደም ተከተሉን አስቀምጥ |
| `admin.countries.rail.empty` | There is no active root category to order yet. | ገንቶ የሚያዛ ብሪ የሥር ምድብ የለም። | እስካሁን የሚደረደር ንቁ ዋና ምድብ የለም። |
| `admin.countries.error.reason` | Reason: {reason} | ምክንያት፡ {reason} | ምክንያት፦ {reason} |
| `admin.countries.error.denied` | You do not have permission to do that. | ይህን ለማድረግ ፈቃድ የላዎትም። | ይህን ለማድረግ ፈቃድ የለዎትም። |
| `admin.countries.error.stepUp` | Verify a code and try again. | ኮድ አረጋግጠው እና እነደገኘ ይሞክሩ። | ኮድ አረጋግጠው እንደገና ይሞክሩ። |
| `admin.countries.error.unknown` | That could not be saved. | ይህ መቀመጥ አልተሳከም። | ያ ሊቀመጥ አልቻለም። |
| `admin.countries.error.badCountryCode` | A country code is exactly two letters. | የአገር ኮድ ብትክ ሁለት ሆሄ ነው። | የአገር ኮድ በትክክል ሁለት ፊደላት ነው። |
| `admin.countries.error.badUnitSystem` | The unit system is either metric or imperial. | የመለክያ ስርዓቱ ሜትሪክ ወይም ኢምፐሪያል ብቻ ነው። | የመለኪያ ሥርዓቱ ሜትሪክ ወይም ኢምፔሪያል ብቻ ነው። |
| `admin.countries.error.badCurrency` | That is not a three-letter currency code. | ያ ቶስት ሆሄ የገንዘብ ኮድ አይደለም። | ያ ባለ ሦስት ፊደል የገንዘብ ኮድ አይደለም። |
| `admin.countries.error.scopedRolesExist` | Role grants still point at this market. | የሚና ሚናዎች አሁንም እነዚህን ገበያ ይይዛሉ። | የሚና ፈቃዶች አሁንም ይህን ገበያ ይጠቁማሉ። |
| `admin.countries.error.duplicateCategory` | A category appears twice in that order. | በይህ ቅደት ውስጥ ምድብ ሁለት ጊዜ አለ። | በዚያ ቅደም ተከተል ውስጥ አንድ ምድብ ሁለት ጊዜ አለ። |
| `admin.countries.error.notARoot` | Only a root category can be ordered on the rail. | በሓድድ ላይ የሥር ምድብ ብቻ ይቅደማል። | በዋና ምድቦች መደዳ ላይ ዋና ምድብ ብቻ ሊደረደር ይችላል። |

(Generated by a script from `git show cfecc476f:src/i18n/locales/am-admin.ts`, the tree's file and `en-admin.ts`; values decoded, 45 rows.)

## 9. Migrations

none (`git diff --name-only cfecc476f -- supabase/migrations`: empty; FLAG-free brief, no migration
asked).

## 10. Departures

- `docs/_changelog.md` gained one line: not named by ruling 1's item 7, required by rule 10
  ("appends one `docs/_changelog.md` line in the same change") and inside the standing allowance.
- `docs/governance/mechanisms.md` rows 19 and 107 had their notes brought level with row 108 (rule
  10: "the register row … updated in the turn's docs part"); item 3 named only the new row.
- `shippedCatalogues()` is built from the existing layer loaders rather than `import("./locales/en")`
  / `import("./locales/am")`: ruling 1 item 1 (iii) names the function, `loadOnce` and the export, not
  the import form; the import form was measured to cost +0.1 KiB on every page (section 4), which
  item 4 ("Every other line untouched") would not allow. CLL-4 proves the joins equal the catalogues.
  `compiled-catalog.ts` therefore imports `enBase` statically (inside `src/i18n`, outside the
  census; already in the entry).
- The guard's test ids are CFLI-1…4, not LOC-1…4: TI-1 (`src/routes/api/locations.test.ts` owns
  LOC-1…4).
- The three budget lines use the file's ratchet wording (`DEC-296 (turn P-1c d, the ratchet): local
  S KiB, 8 KiB or more under OLD — <ruled cause> (−drop on base cfecc476f's before); OLD → NEW =
  ceilingForLocal(S); was OLD.`), the S6-3 form the ruling named, with the ruled cause verbatim.
- No STOP in phase 2. Phase 1's STOP (the census and plan) was answered by ruling 1.
- Two E2E reds on the local runner (AL-20, RP-8 desktop) are classified in section 5, not STOPped,
  by item 8's rule; CI's lanes are their proof.

## 11. CI

Base `cfecc476f` (= `git rev-parse origin/dev` at the task's start and now): the raw ci-evidence
branch read through `git fetch origin ci-evidence` + `git show origin/ci-evidence:…` (never
`curl`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `98da94b30af0a24de0d9a35b62c75f38decefc2f` (short `98da94b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-04T09:51:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41807987075
```

Two-step check: `ci-status.md` names `98da94b30` — this branch's first commit (the task saved on
`cfecc476f`), green; `e2e-last-failure.md` names `cfecc476f` ("last E2E run 41799077046 passed");
`guards-last-failure.md` for `98da94b30`: "No failed build/guard jobs in this run." No red of an
earlier turn to fix. `origin/dev` did not move during the task.

This pull request's own runs: filled in below after `gh pr checks 18 --watch` (every red's class,
cause and fixing commit, any re-run with its reason).

## 12. Limits

- The four Mac-only FAILs of `bun run checks` (NH-6 twice; the pinned linux gitleaks and
  actionlint) cannot pass on this machine; the blocked steps were run by hand (section 5) and CI's
  jobs are the judge for those four.
- AL-20 and RP-8 (desktop) were red on the local runner (section 5): AL-20 by `Control+A` on macOS
  Chromium, RP-8 once in two runs; neither re-run more than once; CI's lanes prove both.
- The budget numbers are local builds (`ceilingForLocal`); CI's own sizes may differ by about
  0.1 KiB.
- TR-21 and `e2e:changed` are CI's (ruling).
