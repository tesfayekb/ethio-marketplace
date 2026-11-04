# P-1c turn (c) — the fifteen remaining admin blocks' guides, then (d) if the chat holds (the ruling) — report

Base: 484b6bb3f · Final commit: 41840d015 · Brief: docs/governance/briefs/p1c-guides-c.md (no sha256
given for the brief; ruling 1 is docs/governance/briefs/p1c-guides-c-ruling-1.md, ruling 2 is
docs/governance/briefs/p1c-guides-c-ruling-2.md; the vetted strings file `p1c-am-strings-c.md` sha256
`852df3d13c131af538c54bc89c6041d6e9a7106dca9c22fd17b2e1ff70d97328`, measured by `sha256sum` before
use and again at the report — equal to the ruling's)

Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 41840d0

## 1. Done / not done, by part and step

Phase 1 (the brief, item 1) — the texts for the sixteen blocks posted in the chat, with the census
hit (the allowlist held sixteen lines, the brief said fifteen: `users-list.tsx` was in it) — DONE,
stopped as the brief asked; the supervisor's ruling 1 vetted the English, supplied the Amharic in
one file and ruled `users-list.tsx` in.

Phase 2 (ruling 1), every item:

- Step 0 — the file's sha256 proven (`852df3d1…7328`, equal) before any text was used. DONE.
- 1 — sixteen blocks, 138 keys (48 what/how/next + 90 column lines) in `en-guide.ts` and
  `am-guide.ts`; `admin-guides-allowlist.txt` ends with its header only; CF-GUIDE-1 passes with no
  line (`[admin-guides] tables: 21, guided: 22, allowed: 0`). DONE (commit d5e0e35a6).
- 2 — the eleven changed English values: every English value taken from the file's column, not from
  my post (proved by `/tmp/p1c-c-verify.ts`: 138 rows, 0 differences in either language). DONE.
- 3 — no braces: `src/i18n/locales/am-script.test.ts` "no guide value, English or Amharic, carries a
  brace" over both guide files; proven red on a planted brace in `admin.users.guide.next`, then
  removed; the test also carries an inline planted check. DONE.
- 4 — "tier" kept; nothing renamed. DONE (the grep `rg -n "tier" src/i18n/locales/en-guide.ts`
  shows the Listings column keys only).
- 5 — the Amharic copied from the file's block byte for byte (prettier re-wrapped long lines; the
  verify script compares every value of the loaded module to the file: 0 differences); the two
  Countries labels left as they are. DONE.
- 6 — `guide` on all sixteen tables with the posted prefixes and nexts, the two same-page anchors
  (`admin-ai-log`, `admin-screening-names`), `impersonation.listings` → `{ section: "users" }`,
  Translations' nexts as posted; `bun run i18n:usage` (both maps unchanged); CF-GUIDE-1 and CFG-1…7
  green; T10 and TBL-1…9 green; `GUIDED_SECTIONS` deleted, AG-1 asks every section; AG-6 added;
  `docs/features/admin-guide.md` updated; the roadmap's P-1c line trued. DONE (commits d5e0e35a6,
  63b741f05, 8412127ae, 41840d015).
- 7 — the weight measured page by page (§3 and §12): the sixteen guided pages +0.0 KiB each (no
  ceiling moved); three whole-catalogue pages grew by the texts — STOP 1, ruling 2 option (1): their
  three ceilings raised by `ceilingForLocal` with the cause on the line. DONE.
- 8 — the local runs: `e2e/admin-guides.spec.ts` whole, both projects, 0 retries: 14 passed; the
  toolbar tests by id: 32 passed; `bun run e2e:changed` not run (the selector would print more than
  five files — the sixteen tables' consoles — as the ruling foresaw). DONE.
- 9 — FINDINGS carried (§10, §12). DONE.
- 10 — this report; the pull request made ready; its CI watched (§11). DONE up to the push; the
  CI result goes into the pull request's comment.

Ruling 2: item 1 the three ceilings (commit 41840d015); item 2 no fold; item 3 the roadmap line 7
clause; item 4 the checks, the review, this report; item 5 noted. DONE.

Not done, by ruling: the changelog line and the register rows (brief item 2: turn (d)); the fold
of the three whole-catalogue imports (ruling 2 item 2: the first part of turn (d), plan first).

## 2. Files changed

`git diff --name-only 484b6bb3f` at 41840d015 (before this report's own commit adds
`docs/governance/reports/p1c-guides-c.report.md`):

```
docs/features/admin-guide.md
docs/governance/briefs/p1c-guides-c-ruling-1.md
docs/governance/briefs/p1c-guides-c-ruling-2.md
docs/governance/briefs/p1c-guides-c.md
docs/governance/reports/p1c-guides-c.stop-1.md
e2e/admin-guides.spec.ts
roadmap.md
scripts/admin-tables.test.ts
scripts/conformance/admin-guides-allowlist.txt
scripts/conformance/admin-guides.test.ts
scripts/route-budgets.mjs
src/features/admin-ai/ai-calls.tsx
src/features/admin-ai/ai-page.tsx
src/features/admin-attributes/attributes-page.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-countries/countries-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-locations/locations-page.tsx
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin/audit/audit-page.tsx
src/features/admin/impersonation/impersonation-view.tsx
src/features/admin/roles/roles-list.tsx
src/features/admin/translations/data-scope.tsx
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/strings-page.tsx
src/features/admin/users/users-list.tsx
src/i18n/locales/am-guide.ts
src/i18n/locales/am-script.test.ts
src/i18n/locales/en-guide.ts
```

`git diff --name-only fdadf53b6` (ruling 1 item 10): the same list without
`docs/governance/briefs/p1c-guides-c.md` — 29 paths. New files, by `git ls-files`:
`docs/governance/briefs/p1c-guides-c.md`, `docs/governance/briefs/p1c-guides-c-ruling-1.md`,
`docs/governance/briefs/p1c-guides-c-ruling-2.md`, `docs/governance/reports/p1c-guides-c.stop-1.md`.
Every path is in the brief's areas (the sixteen tables, the guide layer's files, the guard and T10
tests, the spec) or the standing allowance; `scripts/route-budgets.mjs` by ruling 2 item 1 (§10).

Commits: `fdadf53b6` task saved · `be0be0ebe` ruling 1 saved · `d5e0e35a6` part A · `63b741f05`
part B · `8412127ae` part C · `7d917cdbb` stop 1 · `41840d015` part D.

## 3. Behaviour contract — before → after

Each of the sixteen tables (one line each, `guide={{ prefix, next }}` on its `<DataTable`):

| file | before | after |
| --- | --- | --- |
| `src/features/admin-ai/ai-page.tsx` (features) | no Guide in the toolbar | Guide `admin.ai.features`, frame `id="admin-ai-features"`, next → the AI log on the same page (`#admin-ai-log`) |
| `src/features/admin-ai/ai-calls.tsx` (log) | none | `admin.ai.log` → Audit |
| `src/features/admin-attributes/attributes-page.tsx` | none | `admin.attributes` → Categories |
| `src/features/admin-categories/categories-page.tsx` | none | `admin.categories` → Attributes |
| `src/features/admin-countries/countries-page.tsx` | none | `admin.countries` → Locations |
| `src/features/admin-listings/listings-page.tsx` | none | `admin.listings` → Screening |
| `src/features/admin-locations/locations-page.tsx` | none | `admin.locations` → Countries |
| `src/features/admin-screening/screening-page.tsx` | none | `admin.screening` → the Name checks on the same page (`#admin-screening-names`) |
| `src/features/admin-screening/name-checks.tsx` | none | `admin.screening.names` → Users |
| `src/features/admin/audit/audit-page.tsx` | none | `admin.audit` → Roles |
| `src/features/admin/impersonation/impersonation-view.tsx` | none | `impersonation.listings` → Users |
| `src/features/admin/roles/roles-list.tsx` | none | `admin.roles` → Users |
| `src/features/admin/translations/data-scope.tsx` | none | `admin.translations.data` → Translations |
| `src/features/admin/translations/languages-page.tsx` | none | `admin.translations.languages` → Legal |
| `src/features/admin/translations/strings-page.tsx` | none | `admin.translations.strings` → Translations |
| `src/features/admin/users/users-list.tsx` | none | `admin.users` → Roles |

Everything else on each screen — its reads, columns, verbs, filters, exports, the toolbar's other
controls — is the base's: the diff of each file is exactly the one `guide=` line (four lines in
`screening-page.tsx`, prettier's wrap). A next to a section the caller may not open resolves to
`/admin` (base behaviour of `resolveGuideNext`, now exercised by AG-6). No route, door or SQL
function touched.

The weight, measured (a fresh `git archive` of `484b6bb3f` built at `/tmp/p1c-c-base`; this tree at
`8412127ae` — `scripts/route-budgets.mjs` changes no byte of the build; `bun run build && node
scripts/check-bundle-size.mjs` on each):

| page | base | tree | growth | cause |
| --- | --- | --- | --- | --- |
| `/admin/ai` | 328.1 | 328.1 | +0.0 | guide spec |
| `/admin/attributes` | 341.4 | 341.4 | +0.0 | guide spec |
| `/admin/categories` | 349.5 | 349.5 | +0.0 | guide spec |
| `/admin/countries` | 330.9 | 330.9 | +0.0 | guide spec |
| `/admin/listings` | 350.4 | 350.4 | +0.0 | guide spec |
| `/admin/locations` | 275.4 | 275.4 | +0.0 | guide spec |
| `/admin/screening` | 371.6 | 371.6 | +0.0 | guide spec (two tables) |
| `/admin/audit` | 301.1 | 301.1 | +0.0 | guide spec |
| `/admin/users` | 297.6 | 297.6 | +0.0 | guide spec |
| `/admin/users_/$userId` (impersonation) | 292.8 | 292.8 | +0.0 | guide spec |
| `/admin/roles` | 297.9 | 297.9 | +0.0 | guide spec |
| `/admin/translations` (three tables) | 419.2 | 431.7 | +12.5 | the whole-catalogue import (`languages-page.tsx:28–29`): `en-guide.js` +5.5, `am-guide.js` +7.0; the guide specs +0.0 |
| `/admin/listings_/$listingId` | 394.7 | 400.2 | +5.5 | the whole-catalogue import (`listing-page.tsx:28`): `en-guide.js` +5.5 |
| `/admin/roles_/$roleId` | 321.3 | 326.8 | +5.5 | the whole-catalogue import (`permission-matrix.tsx:7`): `en-guide.js` +5.5 |

The entry is unchanged (`index` 126.3 KiB on both builds); every other page is within ±0.1 KiB
(`/l/$slug` 263.7 → 263.6 and `/my-listings_/$listingId_/edit` 407.3 → 407.2: the bundler's chunk
split; nothing of this turn touches them). Ceilings moved (ruling 2 item 1, DEC-296's form,
`ceilingForLocal`): `/admin/listings_/$listingId` 396 → 401, `/admin/roles_/$roleId` 322 → 328,
`/admin/translations` 420 → 433; no other ceiling moved. `node scripts/check-bundle-size.mjs` at
41840d015: `Bundle budget OK.`

## 4. Censuses

- The sixteen tables (phase 1): every `<DataTable` under `src/features/admin*/**` without `guide=`
  — `/tmp/p1c-c-census.ts` over the tree, and the allowlist's lines: sixteen files (the brief said
  fifteen; `src/features/admin/users/users-list.tsx` was the sixteenth) — the STOP of phase 1,
  ruled in by ruling 1 item 1.
- The column keys per table (phase 1, `/tmp/p1c-c-headers.ts`): 90 column lines across the sixteen,
  read from each file's column literals (and `attributionColumns` through its spread), the same set
  CF-GUIDE-1's "missing" rule asks for — CFG-3 green proves the 90 match.
- Toolbar testids of the sixteen (ruling 1 item 8): `rg` over `e2e/**` for `ai-calls-toolbar`,
  `ai-toolbar`, `attribute-toolbar`, `category-toolbar`, `country-toolbar`, `listings-toolbar`,
  `location-toolbar`, `admin-name-checks-toolbar`, `admin-screening-toolbar`, `audit-toolbar`,
  `impersonation-listings-toolbar`, `role-toolbar`, `data-toolbar`, `lang-toolbar`,
  `strings-toolbar`, `users-toolbar` (`/tmp/p1c-c-toolbar-tests.mjs`): AT-79
  (`e2e/admin-attributes-library.spec.ts`), AS-3 (`admin-audit`), CO-1, CO-2 (`admin-countries`),
  AL-10 (`admin-listings`), LT-1 (`admin-locations`), RP-16 (`admin-roles`), AU-13 (`admin-users`);
  and SC-11 (`admin-screening.spec.ts:567`) through the shared `data-table-toolbar`. Others that
  read `data-table-toolbar` are the guides' own specs (`admin-guides`, `user-guides`) and
  `my-listings-page` (not an admin table).
- Braces in guide values: `/tmp/p1c-c-verify.ts` — 0 values with `{` or `}` in either file; the
  test now judges it on every run.
- Whole-catalogue importers (the cause of the three growths): `rg -n 'from "@/i18n/locales/(en|am)"'
  src --glob '!**/*.test.*'` — `src/features/admin/translations/languages-page.tsx:28–29`,
  `src/features/admin/roles/permission-matrix.tsx:7`,
  `src/features/admin-listings/listing-page.tsx:28` (and `src/i18n/types.ts:1`, a type import —
  weightless). The same three roadmap line 7 names.
- `grantRole` (the helper AG-6 needs): `rg -n "grantRole" e2e` — three definitions (§6).

## 5. Tests

Added / changed:

- `e2e/admin-guides.spec.ts`: `GUIDED_SECTIONS` deleted; AG-1's title and body changed — it now
  asks EVERY section: a tableless section (`TABLELESS_SECTIONS` = Images, Legal) has 0
  `data-table-toolbar`; every other section has Guides, exactly one per toolbar, each frame present
  (the shape of the per-toolbar assertions is the base's; only the branch condition changed).
  AG-6 added: a pooled user leased (`leaseUser`), granted the system role `moderator`
  (`grantRole` from `./helpers/categories`; `listings:view`, `audit_logs:view`,
  `admin_panel:access`, never `listings:review`), signed in, `/admin/listings`; the Listings Guide
  opened; the next's text is `en["admin.listings.guide.next"]`, its `href` `/admin` (no section
  path, no hash); click → URL `/admin`, `admin-landing` visible, `admin-access-notice` 0,
  `role="alert"` 0, `admin-section-link-listings` visible, `admin-section-link-screening` 0. The
  identity: a pooled account (J9), the role the next lease strips (J1); nothing written. Header
  comment rewritten for turn (c).
- `scripts/conformance/admin-guides.test.ts` CFG-3: `allowances.size` is 0 and the guided prefixes
  are the twenty-three named (the six Monetisation, `myListings`, the sixteen) — the shape was a
  list of seven, now twenty-three.
- `scripts/admin-tables.test.ts` TBL-6: its premise ("owed > 0") ended with the allowlist; rewritten
  to assert owed = 0, no T10 refusal in the tree, and — so T10 is still shown to bite — a planted
  strip of one admin table's `guide=` is refused with T10 (`breaches(file, stripped)`). Red first:
  the old TBL-6 went red at part A (`expected 0 to be greater than 0`), the rewrite green.
- `src/i18n/locales/am-script.test.ts`: the no-brace test (ruling 1 item 3), red on a real planted
  brace in `admin.users.guide.next` (removed), green after; an inline planted value stays in the
  assertion.

Unit totals: `bun run typecheck` exit 0 (41840d015). The touched tests: `bunx vitest run
scripts/conformance/admin-guides.test.ts scripts/admin-tables.test.ts
src/i18n/locales/am-script.test.ts` — 3 files, 19 passed. The laws (`bunx vitest run scripts
--maxWorkers=2`, inside the checks' laws-first job): 88 files passed, 1 failed — NH-6 only (Mac-only,
§12): `Test Files 1 failed | 88 passed (89)`, `Tests 1 failed | 450 passed (451)`. The component
tests job: `Test Files 1 failed | 435 passed (436)`, `Tests 1 failed | 2710 passed (2711)` — the
same NH-6.

THE CHECKS (`bun run checks` at 41840d015, whole):
`checks (fast): 17 PASS · 4 FAIL · 245s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, …`
`checks: 24 PASS · 4 FAIL · 30 NOT RUN · 308s`
The 4 FAIL, each read in its log: laws-first "scripts/ tests first" — NH-6 only; component-tests —
NH-6 only; build-and-check "Workflow lint (actionlint, pinned)" — `actionlint self-test: the bad
fixture failed for another reason` (the pinned Linux binary on a Mac); secrets-scan "gitleaks,
pinned" — the pinned Linux binary (`Secrets scan: 7 commits in 484b6bb3f..HEAD` then the binary
fails to run). All four are the known Mac-only reds; CI's Linux runners judge them (§11).
The 30 NOT RUN: laws-first's two dependents (changed folders' unit tests; Semgrep on changed files —
blocked by NH-6; the component tests ran whole in their own job); build-and-check's Install
(sandbox), Typecheck, Format check, Lint, e2e selector self-test, Root route names, Build, Bundle
report (blocked by actionlint) — **run by hand**: `bun run typecheck` 0, `bun run format:check` 0,
`bun run lint` 0, `bun run scripts/e2e-select.ts --self-test` 0, `bun run scripts/check-root-routes.ts
--self-test && bun run scripts/check-root-routes.ts` 0, `bun run build` 0, `node
scripts/check-bundle-size.mjs` 0 (`Bundle budget OK.`); component-tests' Install (sandbox);
bundle-budget's Install (sandbox); dependency-audit's two (no advisory service from the sandbox; CI
judges); e2e-preflight's four (staging credentials the script never holds); e2e's six (merges the
lanes' artifacts); promote's four (only CI promotes); semgrep's two uploads (GitHub-only).

E2E, local (ethio-staging; `bun run e2e:local`, both projects, 0 retries):
- `e2e/admin-guides.spec.ts` whole: `14 passed (37.8s)` (AG-1…AG-7 × 2 projects); `[ssr-error]`
  lines in the log: 0.
- By id, the toolbar tests of the sixteen (§4): `bun run e2e:local -- <the eight specs>
--retries=0 --grep "AT-79|AS-3|CO-1|CO-2|AL-10|LT-1|RP-16|AU-13|SC-11"` — `32 passed (1.7m)` (the
  `LT-1` pattern also matched LT-10…LT-16); `[ssr-error]` lines: 0.
- `bun run e2e:changed` not run: the selector would print more than five files (ruling 1 item 8).

J-audit (`e2e/**` changed): J1 — AG-6's only mutable state is the pooled user's `moderator` role,
granted by the shared `grantRole` and stripped at the next lease (the pool's own reset); no scratch
row created · J2 — no door's dial touched; the Guide is read · J3 — ethio-staging through the
harness only · J4 — nothing of the test's own identity leaks: the account is pooled · J5 — anchors
are testids and structure; one word read from `en` (the catalogue, never a literal) · J6 — no
`waitForTimeout`, no `.first()`, no `test.only` (`rg` over the spec: none) · J7 — assertions on the
URL, the landing's testid, the absence of the notice and of any alert, and the section links · J8 —
both projects · J9 — pooled identities (the job super admin; a leased pooled user).

## 6. K2 — siblings that bypass the mechanism

- `grantRole` exists three times: `e2e/admin-shell.spec.ts:40` (a local copy),
  `e2e/helpers/categories.ts:240`, `e2e/helpers/translations.ts:274` (two exported helpers of the
  same name and signature). AG-6 uses the `categories` helper. Outside this turn's scope; not
  touched. (`rg -n "grantRole" e2e`.)
- The three whole-catalogue imports — `src/features/admin-listings/listing-page.tsx:28`,
  `src/features/admin/roles/permission-matrix.tsx:7`,
  `src/features/admin/translations/languages-page.tsx:28–29` — carry every strings layer, the guide
  layer included, in their first download (+5.5 / +5.5 / +12.5 KiB this turn). Roadmap line 7's
  debt; ruling 2 item 2 forbids the fold here (the first part of turn (d), plan first). Not touched.
- Ruling 1 item 7 and ruling 2 item 1 name `scripts/check-bundle-size.mjs` for the per-page
  ceilings; those lines live in `scripts/route-budgets.mjs` (which that check reads; the entry's
  ceiling alone is in `check-bundle-size.mjs`). The three lines were raised where they live. A
  wording finding, not a bypass.
- Greps run: `rg -n "<DataTable" src/features` against `guide=` (every admin table carries one;
  CF-GUIDE-1 and T10 are the standing census); `rg -n 'locales/(en|am)"' src`; `rg -n grantRole e2e`.

## 7. Allowlists and guards

- `scripts/conformance/admin-guides-allowlist.txt`: 16 lines → 0 (header only). No new line
  anywhere. `scripts/conformance/non-null-allowlist.txt`: unchanged (no `!` added).
- CF-GUIDE-1 (`admin-guides.test.ts` CFG-1…7): green; census line `[admin-guides] tables: 21,
guided: 22, allowed: 0` (21 files, 22 guided prefixes-by-file: the products file holds two; the
  prefix list in CFG-3 names 23 with `myListings`). Self-tests (CFG-1, CFG-2, CFG-4…7) green.
- T10 (`scripts/admin-tables.ts`, `admin-tables.test.ts` TBL-1…9): green; TBL-6 proves the refusal
  on a planted strip (`breaches(...)` contains `T10`).
- The am-script guard (`am-script.test.ts`): the new brace test, proven red on a plant.
- `wired.test.ts`: no new guard, nothing to wire.

## 8. Strings

138 new keys in `src/i18n/locales/en-guide.ts` and `am-guide.ts` (164 → 302 keys in each file), none changed
or removed; the EN column and the AM block both from the vetted file (sha256 above), copied by key;
no Amharic of my own. Each key with its EN and AM, generated from the compiled modules in the
file's order (`/tmp/p1c-c-strings-table.ts`):

| key | EN | AM |
| --- | --- | --- |
| `admin.ai.features.guide.what` | Every outside AI service the site uses — photo checking, writing help, the seller-name check, category pictures and icons, machine translation, background removal — with its switch, its monthly budget and what it has cost this month. | ጣቢያው የሚጠቀምበት እያንዳንዱ የውጭ የሰው ሰራሽ አስተውሎት አገልግሎት — የፎቶ ምርመራ፣ የመጻፍ እገዛ፣ የሻጭ ስም ፍተሻ፣ የምድብ ምስሎች እና አዶዎች፣ የማሽን ትርጉም፣ ዳራ ማስወገድ — ከማብሪያው፣ ከወርሃዊ በጀቱ እና በዚህ ወር ካስወጣው ጋር። |
| `admin.ai.features.guide.col.feature` | The service and, under it, what it does and which provider answers. | አገልግሎቱ እና ከሥሩ ምን እንደሚሠራ እና የትኛው አቅራቢ እንደሚመልስ። |
| `admin.ai.features.guide.col.state` | On, or Off with the reason: switched off by staff, or its monthly budget reached. A feature off by budget comes back next month or when the budget is raised. | በርቷል፣ ወይም ጠፍቷል ከምክንያቱ ጋር፦ በሠራተኞች ጠፍቷል፣ ወይም ወርሃዊ በጀቱ ተደርሷል። በበጀት የጠፋ አገልግሎት በሚቀጥለው ወር ወይም በጀቱ ሲጨመር ይመለሳል። |
| `admin.ai.features.guide.col.spend` | What this feature has cost this month against its budget; a warning shows at 80 % of the budget and when it is reached. | ይህ አገልግሎት በዚህ ወር ከበጀቱ አንጻር ምን ያህል እንዳስወጣ፤ በጀቱ 80 % ሲደርስ እና ሲሞላ ማስጠንቀቂያ ይታያል። |
| `admin.ai.features.guide.col.calls` | How many calls this month and today; for machine translation, the characters too. | በዚህ ወር እና ዛሬ ስንት ጥሪዎች፤ ለማሽን ትርጉም ፊደላቱም ጭምር። |
| `admin.ai.features.guide.col.price` | What one call costs — or, for machine translation, a million characters. Staff set it; the provider's bill is the final figure. | አንድ ጥሪ ምን ያህል እንደሚያስከፍል — ወይም ለማሽን ትርጉም አንድ ሚሊዮን ፊደላት። ሠራተኞች ያስቀምጡታል፤ የአቅራቢው ሂሳብ የመጨረሻው አኃዝ ነው። |
| `admin.ai.features.guide.col.updated` | The day the switch, budget or price last changed. | ማብሪያው፣ በጀቱ ወይም ዋጋው በመጨረሻ የተቀየረበት ቀን። |
| `admin.ai.features.guide.how` | Edit changes the switch, the budget in dollars (empty means no budget) and the price; it asks for your second factor. At its budget a feature switches itself off. While photo checking is off, a new ad's photos are held for staff and approving the ad approves them; a live ad cannot take new photos. A feature cannot be switched on while its spend is over its budget — raise the budget first. | «አርትዕ» ማብሪያውን፣ በጀቱን በዶላር (ባዶ ማለት በጀት የለም ማለት ነው) እና ዋጋውን ይቀይራል፤ የማረጋገጫ ኮድዎን ይጠይቃል። በጀቱ ሲሞላ አገልግሎት ራሱን ያጠፋል። የፎቶ ምርመራ ጠፍቶ እያለ የአዲስ ማስታወቂያ ፎቶዎች ለሠራተኞች ይያዛሉ፤ ማስታወቂያውን ማጽደቅ እነሱንም ያጸድቃል፤ በቀጥታ ያለ ማስታወቂያ አዲስ ፎቶ መውሰድ አይችልም። ወጪው ከበጀቱ በላይ እያለ አገልግሎት ሊበራ አይችልም — መጀመሪያ በጀቱን ይጨምሩ። |
| `admin.ai.features.guide.next` | See the recent calls and how each one ended. | የቅርብ ጊዜ ጥሪዎችን እና እያንዳንዱ እንዴት እንዳበቃ ይመልከቱ። |
| `admin.ai.log.guide.what` | Every AI call of the last 90 days, newest first — which service asked, which model answered and how it ended. Prompts, photos and answers are never kept. | ያለፉት 90 ቀናት እያንዳንዱ የሰው ሰራሽ አስተውሎት ጥሪ፣ አዲሱ መጀመሪያ — የትኛው አገልግሎት እንደጠየቀ፣ የትኛው ሞዴል እንደመለሰ እና እንዴት እንዳበቃ። የተላኩ ጥያቄዎች፣ ፎቶዎች እና መልሶች በፍጹም አይቀመጡም። |
| `admin.ai.log.guide.col.time` | When the call was made. | ጥሪው የተደረገበት ጊዜ። |
| `admin.ai.log.guide.col.feature` | The service that made the call. | ጥሪውን ያደረገው አገልግሎት። |
| `admin.ai.log.guide.col.model` | The provider's model that answered. | የመለሰው የአቅራቢው ሞዴል። |
| `admin.ai.log.guide.col.outcome` | Answered, or why not: switched off, over budget, unavailable, timed out, a provider error or an unusable answer. | ተመልሷል፣ ወይም ለምን እንዳልተመለሰ፦ ጠፍቷል፣ ከበጀት በላይ፣ አይገኝም፣ ጊዜው አልፏል፣ የአቅራቢ ስህተት ወይም የማይጠቅም መልስ። |
| `admin.ai.log.guide.col.latency` | How long the provider took to answer, in milliseconds. | አቅራቢው ለመመለስ የፈጀበት ጊዜ፣ በሚሊሰከንድ። |
| `admin.ai.log.guide.col.person` | Who the call was for — a person's name, System for the site's own jobs, or Hidden when you may not see people's names. | ጥሪው ለማን እንደነበር — የሰው ስም፣ ለጣቢያው የራሱ ሥራዎች «ሥርዓት»፣ ወይም የሰዎችን ስም ማየት ካልተፈቀደልዎ «የተደበቀ»። |
| `admin.ai.log.guide.how` | Filter by service or outcome from the toolbar. Nothing here can be changed; rows older than 90 days are removed on their own. Many failed calls in a row point to the provider or to a switched-off service — check the table above. | ከመሣሪያ አሞሌው በአገልግሎት ወይም በውጤት ያጣሩ። እዚህ ምንም ሊቀየር አይችልም፤ ከ90 ቀን በላይ ያረጁ ረድፎች በራሳቸው ይወገዳሉ። በተከታታይ ብዙ የከሸፉ ጥሪዎች አቅራቢውን ወይም የጠፋ አገልግሎትን ያመለክታሉ — ከላይ ያለውን ሠንጠረዥ ይመልከቱ። |
| `admin.ai.log.guide.next` | Budget alerts and switch-offs are also written in the audit log. | የበጀት ማስጠንቀቂያዎች እና መጥፋቶች በኦዲት መዝገብም ይጻፋሉ። |
| `admin.attributes.guide.what` | The library of facts an ad can carry — size, brand, year, condition. Each attribute is defined once and attached to the categories that ask it, so every ad in those categories asks the same question. | ማስታወቂያ ሊይዛቸው የሚችላቸው እውነታዎች ቤተ መጻሕፍት — መጠን፣ የምርት ስም፣ ዓመት፣ ሁኔታ። እያንዳንዱ ባህሪ አንድ ጊዜ ይገለጻል እና ለሚጠይቁት ምድቦች ይያያዛል፤ ስለዚህ በእነዚያ ምድቦች ያለ እያንዳንዱ ማስታወቂያ ተመሳሳይ ጥያቄ ይጠይቃል። |
| `admin.attributes.guide.col.name` | The question as sellers see it, with its fixed key under it. Inherited from … marks a question a parent category passes down. | ሻጮች እንደሚያዩት ጥያቄው፣ ከሥሩ ቋሚ ቁልፉ። «ከ… የተወረሰ» ወላጅ ምድብ የሚያወርሰውን ጥያቄ ያመለክታል። |
| `admin.attributes.guide.col.type` | The kind of answer: text, a number, one choice, several choices, yes or no, a date or a range. | የመልሱ ዓይነት፦ ጽሑፍ፣ ቁጥር፣ አንድ ምርጫ፣ ብዙ ምርጫ፣ አዎ ወይም አይደለም፣ ቀን ወይም ክልል። |
| `admin.attributes.guide.col.options` | How many answers a choice question offers; a dash for other types. Open the row to read them. | የምርጫ ጥያቄ ስንት መልሶችን እንደሚያቀርብ፤ ለሌሎች ዓይነቶች ሰረዝ። ለማንበብ ረድፉን ይክፈቱ። |
| `admin.attributes.guide.col.coverage` | How many of the options have an Amharic label; amber while some are missing. | ከአማራጮቹ ስንቱ የአማርኛ መለያ እንዳላቸው፤ አንዳንዶቹ እስኪሟሉ ድረስ ብርቱካናማ። |
| `admin.attributes.guide.col.usage` | The categories that ask this question. | ይህን ጥያቄ የሚጠይቁት ምድቦች። |
| `admin.attributes.guide.how` | New attribute defines a question; Edit changes its words, help and options — a text question takes only the site's preset checks. Assign to category attaches it; Remove from category detaches it. Delete (red) is refused while any category still uses it. Merge joins two attributes into one. Import and Export carry the library as a file; Export follows the category you filtered to. An option sellers should no longer pick is switched off, not deleted. | «አዲስ ባህሪ» ጥያቄ ይገልጻል፤ «አርትዕ» ቃላቱን፣ እገዛውን እና አማራጮቹን ይቀይራል — የጽሑፍ ጥያቄ የጣቢያውን አስቀድመው የተቀመጡ ፍተሻዎች ብቻ ይወስዳል። «ወደ ምድብ መድብ» ያያይዘዋል፤ «ከምድብ አስወግድ» ይለየዋል። አንድ ምድብ አሁንም እየተጠቀመበት እያለ «ሰርዝ» (ቀይ) አይፈቀድም። «አዋህድ» ሁለት ባህሪያትን ወደ አንድ ያጣምራል። «ባህርያትን አስገባ» እና «ባህርያትን ላክ» ቤተ መጻሕፍቱን እንደ ፋይል ያጓጉዛሉ፤ «ላክ» ያጣሩበትን ምድብ ይከተላል። ሻጮች ከእንግዲህ መምረጥ የሌለባቸው አማራጭ ይጠፋል እንጂ አይሰረዝም። |
| `admin.attributes.guide.next` | Attach questions to a category and choose which show on its cards. | ጥያቄዎችን ለምድብ ያያይዙ እና በካርዶቹ ላይ የትኞቹ እንደሚታዩ ይምረጡ። |
| `admin.categories.guide.what` | The tree people browse and post into: main categories, their subcategories and, where needed, a catch-all. Sellers post only into a category with nothing under it. | ሰዎች የሚያስሱበት እና የሚለጥፉበት ዛፍ፦ ዋና ምድቦች፣ ንዑስ ምድቦቻቸው እና ሲያስፈልግ አጠቃላይ ምድብ። ሻጮች የሚለጥፉት ከሥሩ ምንም በሌለው ምድብ ውስጥ ብቻ ነው። |
| `admin.categories.guide.col.name` | The category's icon and English name, with its address slug; indented by its depth in the tree. | የምድቡ አዶ እና የእንግሊዝኛ ስም፣ ከአድራሻ ስሌጉ ጋር፤ በዛፉ ውስጥ ባለው ጥልቀት ልክ ወደ ውስጥ ገብቷል። |
| `admin.categories.guide.col.parent` | The category it sits under; Also in names other places it is shown. A main category has none. | ከሥሩ የሚቀመጥበት ምድብ፤ «በተጨማሪ በ» የሚታይባቸውን ሌሎች ቦታዎች ይጠቅሳል። ዋና ምድብ ወላጅ የለውም። |
| `admin.categories.guide.col.status` | Active, Scheduled (shown from a future day) or Retired. | ንቁ፣ መርሐ የተያዘለት (ከወደፊት ቀን ጀምሮ የሚታይ) ወይም የተቋረጠ። |
| `admin.categories.guide.col.flags` | Catch-all; whether it accepts ads, asks a price or has a show window; amber warnings for a missing picture or icon and for fewer than two card attributes. | አጠቃላይ፤ ማስታወቂያዎችን ይቀበል፣ ዋጋ ይጠይቅ ወይም የመታያ ጊዜ ይኑረው እንደሆነ፤ ለጎደለ ምስል ወይም አዶ እና ከሁለት በታች ለሆኑ የካርድ ባህሪያት ብርቱካናማ ማስጠንቀቂያዎች። |
| `admin.categories.guide.col.order` | Its place among its siblings. | በእኩዮቹ መካከል ያለው ቦታ። |
| `admin.categories.guide.col.listings` | How many ads it holds. | ስንት ማስታወቂያዎችን እንደያዘ። |
| `admin.categories.guide.col.exclusions` | In how many countries it is hidden. | በስንት ሀገሮች ውስጥ እንደተደበቀ። |
| `admin.categories.guide.how` | Create category adds a node. The row opens the editor: Edit changes its name, icon, listing lifetime and whether it accepts ads and asks a price; Visibility sets the days it is shown; Image generates and accepts its picture; Add pointer shows it under another parent too; Countries hides it in chosen countries; Attributes picks the questions its ads ask. Move up and down reorder siblings. Retire takes a category out of use — if it holds live ads you choose where they go; Reactivate brings it back; Delete (red) removes a retired one only. Generate missing asks the AI for the pictures the shown rows lack; Import and Export carry the tree as a file. Changes ask for your second factor. | «ምድብ ፍጠር» አንድ አንጓ ይጨምራል። ረድፉ አርታዒውን ይከፍታል፦ «አርትዕ» ስሙን፣ አዶውን፣ የማስታወቂያ ቆይታውን እና ማስታወቂያ መቀበሉን እና ዋጋ መጠየቁን ይቀይራል፤ «ታይነት» የሚታይባቸውን ቀናት ያስቀምጣል፤ «ምስል» ምስሉን ያመነጫል እና ይቀበላል፤ «ጠቋሚ ጨምር» በሌላ ወላጅ ሥርም ያሳየዋል፤ «አገሮች» በተመረጡ ሀገሮች ውስጥ ይደብቀዋል፤ «ባህሪያት» ማስታወቂያዎቹ የሚጠይቋቸውን ጥያቄዎች ይመርጣል። «ወደ ላይ አንቀሳቅስ» እና «ወደ ታች አንቀሳቅስ» እኩዮችን ይደረድራሉ። «ጡረታ አውጣ» ምድብን ከአገልግሎት ያወጣል — በቀጥታ ያሉ ማስታወቂያዎች ካሉት የት እንደሚሄዱ ይመርጣሉ፤ «እንደገና አንቃ» ይመልሰዋል፤ «ሰርዝ» (ቀይ) የተቋረጠን ብቻ ያስወግዳል። «የጎደሉትን አመንጭ» የታዩት ረድፎች የሚጎድሏቸውን ምስሎች ከሰው ሰራሽ አስተውሎት ይጠይቃል፤ «ምድቦችን አስገባ» እና «ምድቦችን ላክ» ዛፉን እንደ ፋይል ያጓጉዛሉ። ለውጦች የማረጋገጫ ኮድዎን ይጠይቃሉ። |
| `admin.categories.guide.next` | Define the questions categories ask. | ምድቦች የሚጠይቋቸውን ጥያቄዎች ይግለጹ። |
| `admin.countries.guide.what` | Every country the site can serve, open or closed. A row sets its units and currency, its own order of main categories and whether people there can post and browse. | ጣቢያው ሊያገለግላቸው የሚችላቸው እያንዳንዱ ሀገር፣ ክፍት ወይም ዝግ። ረድፍ መለኪያዎቹን እና ገንዘቡን፣ የራሱን የዋና ምድቦች ቅደም ተከተል እና እዚያ ያሉ ሰዎች መለጠፍ እና ማሰስ ይችሉ እንደሆነ ያስቀምጣል። |
| `admin.countries.guide.col.name` | The country's English name and its two-letter code. | የሀገሩ የእንግሊዝኛ ስም እና ባለ ሁለት ፊደል ኮዱ። |
| `admin.countries.guide.col.status` | Open — people can post and browse here — or Closed, not offered until an admin opens it. | ክፍት — ሰዎች እዚህ መለጠፍ እና ማሰስ ይችላሉ — ወይም ዝግ፣ አስተዳዳሪ እስኪከፍተው ድረስ አይቀርብም። |
| `admin.countries.guide.col.places` | Active places here, out of all the places on record. | እዚህ ያሉ ንቁ ቦታዎች፣ በመዝገብ ላይ ካሉት ቦታዎች ሁሉ። |
| `admin.countries.guide.col.units` | Metric or imperial, and the currency ads are priced in. | ሜትሪክ ወይም ኢምፔሪያል፣ እና ማስታወቂያዎች የሚተመኑበት ገንዘብ። |
| `admin.countries.guide.col.rail` | How many main categories this market orders for itself; 0 follows the global order. | ይህ ገበያ ለራሱ ስንት ዋና ምድቦችን እንደሚደረድር፤ 0 ዓለም አቀፉን ቅደም ተከተል ይከተላል። |
| `admin.countries.guide.col.roles` | How many staff role grants are limited to this country. | ስንት የሠራተኞች ሚና ፈቃዶች በዚህ ሀገር እንደተገደቡ። |
| `admin.countries.guide.col.updated` | When the row last changed. | ረድፉ በመጨረሻ የተቀየረበት ጊዜ። |
| `admin.countries.guide.how` | Edit sets the name, the units and the currency; Rail order sets this market's order of main categories. Open and Close switch the market — opening it also activates its anchor place; both ask for your second factor. Closing a country with staff roles limited to it asks you to confirm; the grants are kept. Countries are added by importing the markets file, never one by one; Download countries gives you that file. | «አርትዕ» ስሙን፣ መለኪያዎቹን እና ገንዘቡን ያስቀምጣል፤ «የዋና ምድቦች ቅደም ተከተል» የዚህን ገበያ የዋና ምድቦች ቅደም ተከተል ያስቀምጣል። «ይህን ገበያ ክፈት» እና «ይህን ገበያ ዝጋ» ገበያውን ይቀያይራሉ — መክፈት መልህቅ ቦታውንም ያነቃል፤ ሁለቱም የማረጋገጫ ኮድዎን ይጠይቃሉ። በእሱ የተገደቡ የሠራተኞች ሚናዎች ያሉትን ሀገር መዝጋት እንዲያረጋግጡ ይጠይቃል፤ ፈቃዶቹ ይጠበቃሉ። ሀገሮች የገበያዎችን ፋይል በማስገባት ይጨመራሉ፣ በፍጹም አንድ በአንድ አይደለም፤ «አገሮችን አውርድ» ያንን ፋይል ይሰጥዎታል። |
| `admin.countries.guide.next` | Build and activate the country's places before opening it. | ሀገሩን ከመክፈትዎ በፊት ቦታዎቹን ይገንቡ እና ያንቁ። |
| `admin.listings.guide.what` | Every ad on the site except drafts — live, waiting, ended or removed — newest first. Open an ad to see its history and act on it. | ከረቂቆች በስተቀር በጣቢያው ላይ ያለ እያንዳንዱ ማስታወቂያ — በቀጥታ፣ በመጠባበቅ ላይ፣ ያበቃ ወይም የተወገደ — አዲሱ መጀመሪያ። ታሪኩን ለማየት እና እርምጃ ለመውሰድ ማስታወቂያውን ይክፈቱ። |
| `admin.listings.guide.col.title` | The ad's name; a line under it warns when a photo may not fit the ad. Open it to reach the ad's page. | የማስታወቂያው ስም፤ ከሥሩ ያለ መስመር ፎቶ ከማስታወቂያው ጋር ላይስማማ ሲችል ያስጠነቅቃል። የማስታወቂያውን ገጽ ለመድረስ ይክፈቱት። |
| `admin.listings.guide.col.seller` | The seller's public name — a business's name when they post as one — and their e-mail when you may see it. | የሻጩ የሕዝብ ስም — እንደ ንግድ ሲለጥፉ የንግዱ ስም — እና ማየት ሲፈቀድልዎ ኢሜይላቸው። |
| `admin.listings.guide.col.place` | The city the ad is in and its country. | ማስታወቂያው ያለበት ከተማ እና ሀገሩ። |
| `admin.listings.guide.col.category` | The category it was posted in. | የተለጠፈበት ምድብ። |
| `admin.listings.guide.col.price` | The asking price with its unit. | የሚጠየቀው ዋጋ ከመለኪያው ጋር። |
| `admin.listings.guide.col.status` | Live, Reduced reach, Waiting for review, Held, Expired, Sold, Rejected, Closed or Removed; the ad's tier when it has one; its open reports, when you review ads. | በቀጥታ፣ የተቀነሰ ተደራሽነት፣ ግምገማ በመጠበቅ ላይ፣ የተያዘ፣ ጊዜው ያለፈ፣ የተሸጠ፣ ውድቅ የተደረገ፣ የተዘጋ ወይም የተወገደ፤ ማስታወቂያው ሲኖረው ደረጃው፤ ማስታወቂያዎችን ሲገመግሙ ክፍት ሪፖርቶቹ። |
| `admin.listings.guide.col.posted` | When it first went live. | መጀመሪያ በቀጥታ የወጣበት ጊዜ። |
| `admin.listings.guide.col.expires` | When it ends. | የሚያበቃበት ጊዜ። |
| `admin.listings.guide.how` | The pills switch between All, Live, Waiting, Ended and Removed; search by a title's words or an ad's id; filter by country, category, seller, date and tier. The row's menu offers Open, Send back to review, Restore, Set tier, View as seller and Remove (red); each move asks for a reason, a note for the seller and your second factor, and the seller is told. Tick several ads to remove or restore them together. Editing an ad and removing a photo happen on the ad's page. Settings sets whether sellers may renew an expired ad and for how many days. Your own ads cannot be moved or edited here. | ክኒኖቹ በ«ሁሉም»፣ «በቀጥታ»፣ «በመጠባበቅ ላይ ያሉ»፣ «ያበቁ» እና «የተወገዱ» መካከል ይቀያይራሉ፤ በርዕስ ቃላት ወይም በማስታወቂያ መለያ ይፈልጉ፤ በሀገር፣ በምድብ፣ በሻጭ፣ በቀን እና በደረጃ ያጣሩ። የረድፉ ምናሌ «ክፈት»፣ «ለግምገማ መልስ»፣ «ወደነበረበት መልስ»፣ «ደረጃ አስቀምጥ»፣ «እንደ ሻጩ ይመልከቱ» እና «አስወግድ» (ቀይ) ያቀርባል፤ እያንዳንዱ እርምጃ ምክንያት፣ ለሻጩ ማስታወሻ እና የማረጋገጫ ኮድዎን ይጠይቃል፣ ሻጩም ይነገረዋል። ብዙ ማስታወቂያዎችን በአንድ ላይ ለማስወገድ ወይም ለመመለስ ምልክት ያድርጉባቸው። ማስታወቂያ ማረም እና ፎቶ ማስወገድ በማስታወቂያው ገጽ ላይ ይደረጋሉ። «ቅንብሮች» ሻጮች ጊዜው ያለፈ ማስታወቂያ ማደስ ይችሉ እንደሆነ እና ለስንት ቀን ያስቀምጣል። የራስዎ ማስታወቂያዎች እዚህ ሊንቀሳቀሱ ወይም ሊታረሙ አይችሉም። |
| `admin.listings.guide.next` | Review the ads waiting for approval. | ማጽደቅ የሚጠብቁትን ማስታወቂያዎች ይገምግሙ። |
| `admin.locations.guide.what` | Every place people can post and browse in — regions, cities and sub-cities under their country. A place's path is its fixed address on the site. | ሰዎች የሚለጥፉበት እና የሚያስሱበት እያንዳንዱ ቦታ — ክልሎች፣ ከተሞች እና ክፍለ ከተሞች ከሀገራቸው ሥር። የቦታ መንገድ በጣቢያው ላይ ያለው ቋሚ አድራሻው ነው። |
| `admin.locations.guide.col.name` | The place's English name and its level. | የቦታው የእንግሊዝኛ ስም እና ደረጃው። |
| `admin.locations.guide.col.path` | Where it sits: country, region, city. | የሚገኝበት፦ ሀገር፣ ክልል፣ ከተማ። |
| `admin.locations.guide.col.status` | Active or Retired. A new place is born retired until you activate it. | ገባሪ ወይም የተቋረጠ። አዲስ ቦታ እስኪያገብሩት ድረስ ተቋርጦ ይወለዳል። |
| `admin.locations.guide.col.counts` | Listings posted here · seller coverage rows · profiles defaulting here. | እዚህ የተለጠፉ ማስታወቂያዎች · የሻጭ ሽፋን ረድፎች · እዚህ ነባሪ የሆኑ መገለጫዎች። |
| `admin.locations.guide.col.order` | Its place among its siblings. | በእኩዮቹ መካከል ያለው ቦታ። |
| `admin.locations.guide.col.aliases` | How many other names and spellings find this place in search. | ስንት ሌሎች ስሞች እና አጻጻፎች ይህን ቦታ በፍለጋ እንደሚያገኙ። |
| `admin.locations.guide.col.iso` | Its ISO 3166-2 code, when it has one. | ሲኖረው የISO 3166-2 ኮዱ። |
| `admin.locations.guide.how` | Add place adds a child inside a chosen place — it is born retired; Edit changes its name, aliases, code and centre; Activate and Retire switch it — a place is activated only after its parent; Move puts it under another parent; Reorder siblings changes its order. Delete (red) is permanent, asks you to type the place's address, and is refused while something still points at it — children, listings, coverage rows or profiles. Import and Export carry the markets and places files, scoped to the country you filtered to. Moves and deletes ask for your second factor. | «ቦታ ጨምር» በተመረጠ ቦታ ውስጥ ልጅ ይጨምራል — ተቋርጦ ይወለዳል፤ «አስተካክል» ስሙን፣ ተለዋጭ ስሞቹን፣ ኮዱን እና መሃሉን ይቀይራል፤ «አግብር» እና «አቋርጥ» ይቀያይሩታል — ቦታ የሚገበረው ከወላጁ በኋላ ብቻ ነው፤ «አንቀሳቅስ» በሌላ ወላጅ ሥር ያስቀምጠዋል፤ «የአጎራባቾችን ቅደም ተከተል ቀይር» ቅደም ተከተሉን ይቀይራል። «አጥፋ» (ቀይ) ቋሚ ነው፣ የቦታውን አድራሻ እንዲተይቡ ይጠይቃል፣ እና አንድ ነገር አሁንም እየጠቆመው እያለ — ልጆች፣ ማስታወቂያዎች፣ የሽፋን ረድፎች ወይም መገለጫዎች — አይፈቀድም። «ቦታዎችን አስገባ» እና «ቦታዎችን አውርድ» የገበያዎችን እና የቦታዎችን ፋይሎች ያጓጉዛሉ፣ ባጣሩበት ሀገር ተገድበው። ማንቀሳቀስ እና ማጥፋት የማረጋገጫ ኮድዎን ይጠይቃሉ። |
| `admin.locations.guide.next` | Open the country once its places are active. | ቦታዎቹ ገባሪ ከሆኑ በኋላ ሀገሩን ይክፈቱ። |
| `admin.screening.guide.what` | Ads waiting for a decision, oldest first. No buyer sees an ad until you approve it. | ውሳኔ የሚጠብቁ ማስታወቂያዎች፣ አሮጌው መጀመሪያ። እስኪያጸድቁት ድረስ ማንም ገዢ ማስታወቂያ አያይም። |
| `admin.screening.guide.col.title` | The ad's name; a line under it warns when a photo may not fit the ad. | የማስታወቂያው ስም፤ ከሥሩ ያለ መስመር ፎቶ ከማስታወቂያው ጋር ላይስማማ ሲችል ያስጠነቅቃል። |
| `admin.screening.guide.col.category` | The category the seller chose. | ሻጩ የመረጠው ምድብ። |
| `admin.screening.guide.col.place` | The city the ad is in. | ማስታወቂያው ያለበት ከተማ። |
| `admin.screening.guide.col.sent` | When the seller sent it for review. | ሻጩ ለግምገማ የላከበት ጊዜ። |
| `admin.screening.guide.how` | Preview as buyer shows the ad as buyers will see it, with the seller's public name and contact methods; Show number reveals a number and writes an audit row. Approve publishes the ad; Reject (red) refuses it; both ask you to confirm and for your second factor. Tick several ads to decide them together. From the preview, Edit opens the ad in the wizard; Done brings you back to the preview. Below the queue sit the photos held for review, the seller names held for review and the photo changes on live ads. | «ገዢዎች እንደሚያዩት ይመልከቱ» ማስታወቂያውን ገዢዎች እንደሚያዩት፣ ከሻጩ የሕዝብ ስም እና የመገናኛ መንገዶች ጋር ያሳያል፤ «ቁጥሩን አሳይ» ቁጥር ይገልጣል እና የኦዲት ረድፍ ይጽፋል። «አጽድቅ» ማስታወቂያውን ያትማል፤ «ውድቅ አድርግ» (ቀይ) ይከለክለዋል፤ ሁለቱም እንዲያረጋግጡ እና የማረጋገጫ ኮድዎን ይጠይቃሉ። ብዙ ማስታወቂያዎችን በአንድ ላይ ለመወሰን ምልክት ያድርጉባቸው። ከቅድመ እይታው «አርትዕ» ማስታወቂያውን በአዋቂው ውስጥ ይከፍታል፤ «ተጠናቋል» ወደ ቅድመ እይታው ይመልስዎታል። ከወረፋው በታች ለግምገማ የተያዙ ፎቶዎች፣ ለግምገማ የተያዙ የሻጭ ስሞች እና በቀጥታ ባሉ ማስታወቂያዎች ላይ የተደረጉ የፎቶ ለውጦች ይገኛሉ። |
| `admin.screening.guide.next` | Decide on the seller names the AI holds. | ሰው ሰራሽ አስተውሎቱ የያዛቸውን የሻጭ ስሞች ይወስኑ። |
| `admin.screening.names.guide.what` | Seller names the AI check says may imitate a well-known company, brand or person. A held name is hidden from buyers until you decide; a name the AI could not check stays visible. | የሰው ሰራሽ አስተውሎት ፍተሻ ታዋቂ ኩባንያን፣ የምርት ስምን ወይም ሰውን ሊመስሉ ይችላሉ ያላቸው የሻጭ ስሞች። የተያዘ ስም እስኪወስኑ ድረስ ከገዢዎች ይደበቃል፤ ፍተሻው ሊፈትሸው ያልቻለው ስም ይታያል። |
| `admin.screening.names.guide.col.name` | The name and what the AI said it imitates. Name hidden means you may not see people's names. | ስሙ እና ፍተሻው ይመስለዋል ያለው። «ስሙ ተደብቋል» ማለት የሰዎችን ስም ማየት አልተፈቀደልዎም ማለት ነው። |
| `admin.screening.names.guide.col.since` | When the name was held. | ስሙ የተያዘበት ጊዜ። |
| `admin.screening.names.guide.col.attempts` | How many times the AI check ran on this name. | ፍተሻው በዚህ ስም ላይ ስንት ጊዜ እንደሮጠ። |
| `admin.screening.names.guide.col.owner` | The account the name belongs to; opens its user page. | ስሙ የሚገኝበት መለያ፤ የተጠቃሚ ገጹን ይከፍታል። |
| `admin.screening.names.guide.how` | Allow this name shows it to buyers again, with an optional reason kept in the audit log; it asks for your second factor. Rename opens the owner's user page, where its profile editor changes the name. If the name changed after the list loaded, nothing is written — reload. The line above says when the re-check last ran and lets you resume it when it is paused. | «ይህን ስም ፍቀድ» ለገዢዎች እንደገና ያሳየዋል፣ በኦዲት መዝገብ ከሚቀመጥ አማራጭ ምክንያት ጋር፤ የማረጋገጫ ኮድዎን ይጠይቃል። «ስሙን ቀይር» የባለቤቱን የተጠቃሚ ገጽ ይከፍታል፣ የመገለጫ አርታዒው ስሙን የሚቀይርበት። ዝርዝሩ ከተጫነ በኋላ ስሙ ከተቀየረ ምንም አይጻፍም — እንደገና ይጫኑ። ከላይ ያለው መስመር ድጋሚ ፍተሻው በመጨረሻ መቼ እንደሮጠ ይናገራል እና ሲቆም እንዲቀጥሉት ያስችልዎታል። |
| `admin.screening.names.guide.next` | Find the seller's account to rename it. | ስሙን ለመቀየር የሻጩን መለያ ያግኙ። |
| `admin.audit.guide.what` | Every staff action and security event, newest first — who did what, to which record, and when. The figures and the 14-day chart above count the same rows. | እያንዳንዱ የሠራተኞች እርምጃ እና የደህንነት ክንውን፣ አዲሱ መጀመሪያ — ማን ምን እንዳደረገ፣ በየትኛው መዝገብ ላይ እና መቼ። ከላይ ያሉት አኃዞች እና የ14 ቀን ገበታ ተመሳሳይ ረድፎችን ይቆጥራሉ። |
| `admin.audit.guide.col.time` | When it happened. | የተከሰተበት ጊዜ። |
| `admin.audit.guide.col.actor` | Who did it; System for the site's own jobs. | ማን እንዳደረገው፤ ለጣቢያው የራሱ ሥራዎች «ሥርዓት»። |
| `admin.audit.guide.col.action` | What was done, as the system names it. | ምን እንደተደረገ፣ ሥርዓቱ እንደሚጠራው። |
| `admin.audit.guide.col.entity` | The kind of record it touched and the start of its id. | የነካው የመዝገብ ዓይነት እና የመለያው መጀመሪያ። |
| `admin.audit.guide.col.meta` | The details recorded with it — values before and after, a reason, a count. Open a row to read every pair. | ከእሱ ጋር የተመዘገቡት ዝርዝሮች — ከዚህ በፊት እና በኋላ ያሉ እሴቶች፣ ምክንያት፣ ቁጥር። እያንዳንዱን ጥንድ ለማንበብ ረድፍ ይክፈቱ። |
| `admin.audit.guide.how` | Search, filter by action, entity type and dates, and page through. Nothing here can be changed or deleted. | ይፈልጉ፣ በእርምጃ፣ በአካል ዓይነት እና በቀናት ያጣሩ፣ እና ገጽ በገጽ ይመልከቱ። እዚህ ምንም ሊቀየር ወይም ሊሰረዝ አይችልም። |
| `admin.audit.guide.next` | See who holds which role. | ማን የትኛውን ሚና እንደያዘ ይመልከቱ። |
| `impersonation.listings.guide.what` | The ads of the account you are viewing, read-only. You see their data; you are not acting as them, and nothing here changes it. | እየተመለከቱት ያለው መለያ ማስታወቂያዎች፣ ለንባብ ብቻ። ውሂባቸውን ያያሉ፤ እንደ እነሱ እየሠሩ አይደለም፣ እና እዚህ ምንም አይቀይረውም። |
| `impersonation.listings.guide.col.title` | The ad's name. | የማስታወቂያው ስም። |
| `impersonation.listings.guide.col.status` | Where the ad stands: draft, waiting, live, ended or removed. | ማስታወቂያው ያለበት ሁኔታ፦ ረቂቅ፣ በመጠባበቅ ላይ፣ በቀጥታ፣ ያበቃ ወይም የተወገደ። |
| `impersonation.listings.guide.col.price` | The asking price. | የሚጠየቀው ዋጋ። |
| `impersonation.listings.guide.col.created` | When the seller created it. | ሻጩ የፈጠረበት ጊዜ። |
| `impersonation.listings.guide.how` | The session ends on its own after 15 minutes, or with End now. Its start and end are written in the audit log with both names. | ክፍለ ጊዜው ከ15 ደቂቃ በኋላ በራሱ ያበቃል፣ ወይም በ«አሁን አቁም»። መጀመሪያውና መጨረሻው ከሁለቱም ስሞች ጋር በኦዲት መዝገብ ይጻፋሉ። |
| `impersonation.listings.guide.next` | Back to the person's account. | ወደ ሰውዬው መለያ ይመለሱ። |
| `admin.roles.guide.what` | The staff roles and what each may do. A system role is fixed by the site; a custom role is yours to shape. | የሠራተኞች ሚናዎች እና እያንዳንዱ ምን ማድረግ እንደሚችል። የሥርዓት ሚና በጣቢያው የተወሰነ ነው፤ ብጁ ሚና እርስዎ የሚቀርጹት ነው። |
| `admin.roles.guide.col.name` | The role's fixed key. | የሚናው ቋሚ ቁልፍ። |
| `admin.roles.guide.col.display` | The name staff see. | ሠራተኞች የሚያዩት ስም። |
| `admin.roles.guide.col.kind` | System — fixed by the site — or Custom. | የሥርዓት — በጣቢያው የተወሰነ — ወይም ብጁ። |
| `admin.roles.guide.col.members` | How many people hold it. | ስንት ሰዎች እንደያዙት። |
| `admin.roles.guide.col.permissions` | How many permissions it grants. | ስንት ፈቃዶችን እንደሚሰጥ። |
| `admin.roles.guide.how` | Create role adds a custom role; it asks for your second factor. Open a row to grant or revoke its permissions, see its members or delete it — a role with members cannot be deleted, and a system role cannot be changed. Some permissions are reserved for system roles and cannot be granted to a custom one. View members opens the Users list filtered to the role. | «ሚና ፍጠር» ብጁ ሚና ይጨምራል፤ የማረጋገጫ ኮድዎን ይጠይቃል። ፈቃዶቹን ለመስጠት ወይም ለመንሳት፣ አባላቱን ለማየት ወይም ለመሰረዝ ረድፍ ይክፈቱ — አባላት ያሉት ሚና ሊሰረዝ አይችልም፣ የሥርዓት ሚናም ሊቀየር አይችልም። አንዳንድ ፈቃዶች ለሥርዓት ሚናዎች የተያዙ ናቸው እና ለብጁ ሚና ሊሰጡ አይችሉም። «አባላትን ተመልከት» የተጠቃሚዎችን ዝርዝር በሚናው ተጣርቶ ይከፍታል። |
| `admin.roles.guide.next` | Give a person a role from their user page. | ከተጠቃሚ ገጻቸው ለሰው ሚና ይስጡ። |
| `admin.translations.data.guide.what` | The names of categories, places, attributes and answer options in this language. A name with no approved translation shows its English. | በዚህ ቋንቋ የምድቦች፣ የቦታዎች፣ የባህሪያት እና የመልስ አማራጮች ስሞች። የጸደቀ ትርጉም የሌለው ስም እንግሊዝኛውን ያሳያል። |
| `admin.translations.data.guide.col.entity` | The thing being named, with its key under it. | የሚሰየመው ነገር፣ ከሥሩ ቁልፉ። |
| `admin.translations.data.guide.col.type` | Category, Location, Attribute or Answer option. | ምድብ፣ ቦታ፣ ባህሪ ወይም የመልስ አማራጭ። |
| `admin.translations.data.guide.col.source` | The English name. | የእንግሊዝኛው ስም። |
| `admin.translations.data.guide.col.value` | The translation, or a dash while there is none. | ትርጉሙ፣ ወይም እስካሁን ከሌለ ሰረዝ። |
| `admin.translations.data.guide.col.status` | Untranslated, Machine, Edited or Approved. Only an approved name reaches the site. | ያልተተረጎመ፣ በማሽን፣ የተስተካከለ ወይም የጸደቀ። የጸደቀ ስም ብቻ ጣቢያው ላይ ይደርሳል። |
| `admin.translations.data.guide.how` | Edit opens a row to write, AI-translate, approve or clear it. AI bulk translates every untranslated row; Approve all approves every machine or edited row; each asks for your second factor. These names are a meter only — they do not decide whether the language can go public. | «አርትዕ» ረድፍን ለመጻፍ፣ በሰው ሰራሽ አስተውሎት ለመተርጎም፣ ለማጽደቅ ወይም ለማጽዳት ይከፍታል። የጅምላ ትርጉም እያንዳንዱን ያልተተረጎመ ረድፍ ይተረጉማል፤ «ሁሉንም የተገመገሙ አጽድቅ» እያንዳንዱን በማሽን ወይም የተስተካከለ ረድፍ ያጸድቃል፤ እያንዳንዱ የማረጋገጫ ኮድዎን ይጠይቃል። እነዚህ ስሞች መለኪያ ብቻ ናቸው — ቋንቋው ለሕዝብ መውጣት ይችል እንደሆነ አይወስኑም። |
| `admin.translations.data.guide.next` | Switch the language on for staff or the public. | ቋንቋውን ለሠራተኞች ወይም ለሕዝብ ያብሩ። |
| `admin.translations.languages.guide.what` | Every language the site can speak, with how much of it is translated and where it is shown. | ጣቢያው ሊናገረው የሚችለው እያንዳንዱ ቋንቋ፣ ምን ያህሉ እንደተተረጎመ እና የት እንደሚታይ ጋር። |
| `admin.translations.languages.guide.col.language` | The language in its own script, its code, and Base or RTL when it applies. | ቋንቋው በራሱ ፊደል፣ ኮዱ፣ እና ሲመለከተው «መሠረት» ወይም «ከቀኝ ወደ ግራ»። |
| `admin.translations.languages.guide.col.nameEn` | Its English name. | የእንግሊዝኛ ስሙ። |
| `admin.translations.languages.guide.col.coverage` | Approved interface strings out of the base language's total. This decides whether the language can go public. | ከመሠረቱ ቋንቋ ጠቅላላ ውስጥ የጸደቁ የበይነገጽ ሐረጎች። ይህ ቋንቋው ለሕዝብ መውጣት ይችል እንደሆነ ይወስናል። |
| `admin.translations.languages.guide.col.coverageData` | Approved data names — categories, places, attributes — out of all of them. A meter only. | የጸደቁ የውሂብ ስሞች — ምድቦች፣ ቦታዎች፣ ባህሪያት — ከሁሉም ውስጥ። መለኪያ ብቻ። |
| `admin.translations.languages.guide.col.admin` | On shows the language in staff tools and previews; the base language is always on. | በርቶ ከሆነ ቋንቋውን በሠራተኞች መሣሪያዎች እና ቅድመ እይታዎች ያሳያል፤ መሠረቱ ቋንቋ ሁልጊዜ በርቷል። |
| `admin.translations.languages.guide.col.public` | On offers the language to visitors. It stays off until every interface string is approved. | በርቶ ከሆነ ቋንቋውን ለጎብኚዎች ያቀርባል። እያንዳንዱ የበይነገጽ ሐረግ እስኪጸድቅ ድረስ ጠፍቶ ይቆያል። |
| `admin.translations.languages.guide.how` | Open strings takes you to the language's translations. Add language adds one; Sync keys brings the app's new strings in; Move up and down order the rows; Delete (red) is refused for the base language and while the language is public — unpublish it first. Every change asks for your second factor. | «ሐረጎችን ክፈት» ወደ ቋንቋው ትርጉሞች ይወስድዎታል። «ቋንቋ ጨምር» አንድ ይጨምራል፤ «ቁልፎችን አመሳስል» የመተግበሪያውን አዳዲስ ሐረጎች ያስገባል፤ «ወደ ላይ አንቀሳቅስ» እና «ወደ ታች አንቀሳቅስ» ረድፎቹን ይደረድራሉ፤ «ሰርዝ» (ቀይ) ለመሠረቱ ቋንቋ እና ቋንቋው ለሕዝብ እያለ አይፈቀድም — መጀመሪያ ከሕዝብ ያውርዱት። እያንዳንዱ ለውጥ የማረጋገጫ ኮድዎን ይጠይቃል። |
| `admin.translations.languages.guide.next` | Legal texts have their own English and Amharic bodies on the Legal page. | የሕግ ጽሑፎች በሕግ ገጹ ላይ የራሳቸው የእንግሊዝኛ እና የአማርኛ ይዘቶች አሏቸው። |
| `admin.translations.strings.guide.what` | Every word the app shows — menus, buttons, messages — in this language, one key at a time. An approved string reaches the site; an untranslated one falls back to English. | መተግበሪያው የሚያሳየው እያንዳንዱ ቃል — ምናሌዎች፣ አዝራሮች፣ መልእክቶች — በዚህ ቋንቋ፣ በአንድ ጊዜ አንድ ቁልፍ። የጸደቀ ሐረግ ጣቢያው ላይ ይደርሳል፤ ያልተተረጎመ ወደ እንግሊዝኛ ይመለሳል። |
| `admin.translations.strings.guide.col.key` | The string's fixed key in the app. | የሐረጉ በመተግበሪያው ውስጥ ያለው ቋሚ ቁልፍ። |
| `admin.translations.strings.guide.col.source` | The English text. | የእንግሊዝኛው ጽሑፍ። |
| `admin.translations.strings.guide.col.value` | The translation, or a dash while there is none. | ትርጉሙ፣ ወይም እስካሁን ከሌለ ሰረዝ። |
| `admin.translations.strings.guide.col.status` | Untranslated, Machine, Edited or Approved; Flagged (red) when a placeholder the English carries is missing. | ያልተተረጎመ፣ በማሽን፣ የተስተካከለ ወይም የጸደቀ፤ እንግሊዝኛው የያዘው ቦታ ያዥ ሲጎድል የተመለከተ (ቀይ)። |
| `admin.translations.strings.guide.col.provenance` | Who or what wrote it — a person or the machine — and who approved it. | ማን ወይም ምን እንደጻፈው — ሰው ወይም ማሽኑ — እና ማን እንዳጸደቀው። |
| `admin.translations.strings.guide.how` | Edit opens a row to write, AI-translate, approve, clear or read its history. A flagged string cannot be approved until its placeholders are restored. AI bulk translates every untranslated row; Approve all approves every machine or edited row; Export (CSV or XLIFF) and Import carry the strings as a file. Each change asks for your second factor. The Data pill switches to the names of categories, places and options. | «አርትዕ» ረድፍን ለመጻፍ፣ በሰው ሰራሽ አስተውሎት ለመተርጎም፣ ለማጽደቅ፣ ለማጽዳት ወይም ታሪኩን ለማንበብ ይከፍታል። የተመለከተ ሐረግ ቦታ ያዦቹ እስኪመለሱ ድረስ ሊጸድቅ አይችልም። የጅምላ ትርጉም እያንዳንዱን ያልተተረጎመ ረድፍ ይተረጉማል፤ «ሁሉንም የተገመገሙ አጽድቅ» እያንዳንዱን በማሽን ወይም የተስተካከለ ረድፍ ያጸድቃል፤ «CSV ላክ»፣ «XLIFF ላክ» እና «ፋይል አስገባ» ሐረጎቹን እንደ ፋይል ያጓጉዛሉ። እያንዳንዱ ለውጥ የማረጋገጫ ኮድዎን ይጠይቃል። የ«ዳታ» ክኒን ወደ ምድቦች፣ ቦታዎች እና አማራጮች ስሞች ይቀይራል። |
| `admin.translations.strings.guide.next` | Back to the languages to switch this one on. | ይህን ለማብራት ወደ ቋንቋዎቹ ይመለሱ። |
| `admin.users.guide.what` | Everyone with an account — their state, their roles and when they joined. Open a row for the person's page. | መለያ ያለው እያንዳንዱ ሰው — ሁኔታቸው፣ ሚናዎቻቸው እና መቼ እንደተቀላቀሉ። ለሰውዬው ገጽ ረድፍ ይክፈቱ። |
| `admin.users.guide.col.name` | The person's display name. | የሰውዬው የሚታይ ስም። |
| `admin.users.guide.col.email` | Their sign-in e-mail. | የሚገቡበት ኢሜይላቸው። |
| `admin.users.guide.col.country` | Their home country's code. | የመኖሪያ ሀገራቸው ኮድ። |
| `admin.users.guide.col.status` | Active, or Deactivated — a deactivated account is refused at every door and signed out. | ንቁ፣ ወይም የተቋረጠ — የተቋረጠ መለያ በእያንዳንዱ በር ይከለከላል እና ይወጣል። |
| `admin.users.guide.col.roles` | The staff roles they hold, if any. | የያዟቸው የሠራተኞች ሚናዎች፣ ካሉ። |
| `admin.users.guide.col.joined` | When the account was made. | መለያው የተፈጠረበት ጊዜ። |
| `admin.users.guide.how` | Search, filter by status and role, and page through. The row opens the person's page, where staff change the status with a reason, give or remove roles, edit the profile and start a read-only View as session — each asks for your second factor. You cannot deactivate yourself or a super admin. | ይፈልጉ፣ በሁኔታ እና በሚና ያጣሩ፣ እና ገጽ በገጽ ይመልከቱ። ረድፉ የሰውዬውን ገጽ ይከፍታል፣ ሠራተኞች ሁኔታውን በምክንያት የሚቀይሩበት፣ ሚናዎችን የሚሰጡበት ወይም የሚያነሱበት፣ መገለጫውን የሚያርሙበት እና ለንባብ ብቻ የ«እንደ ተጠቃሚው ይመልከቱ» ክፍለ ጊዜ የሚጀምሩበት — እያንዳንዱ የማረጋገጫ ኮድዎን ይጠይቃል። ራስዎን ወይም ዋና አስተዳዳሪን ማቋረጥ አይችሉም። |
| `admin.users.guide.next` | See what each role allows. | እያንዳንዱ ሚና ምን እንደሚፈቅድ ይመልከቱ። |

## 9. Migrations

none — `git diff --name-only 484b6bb3f -- supabase/` prints nothing.

## 10. Departures

- Phase 1's census: the allowlist held sixteen tables, the brief said fifteen (`users-list.tsx`).
  STOP in the chat; ruling 1 item 1 ruled it in.
- Ruling 1 item 7 ruled growth from anything but the guide spec a STOP; three pages grew by the texts
  through roadmap line 7's imports → `docs/governance/reports/p1c-guides-c.stop-1.md`, pull request
  #17 opened as a draft. Ruling 2 option (1): the three ceilings raised by DEC-296's form with the
  cause on the line, in `scripts/route-budgets.mjs` (the rulings' words say
  `scripts/check-bundle-size.mjs`; the per-page lines live in `route-budgets.mjs`, as in turns (a)
  and (b)). `scripts/route-budgets.mjs` is a file the brief's areas did not name; touched by ruling 2
  item 1 ("raise the three lines").
- Rule 10 (Documentation) asks for a `docs/_changelog.md` line and the register row in the same
  change; the brief's item 2 puts the changelog, the register rows (104 → 107) and the last doc
  section in turn (d). Followed the brief; named here.
- Rule 20's twin-locator and J laws: AG-6 reads one word from `en` (the next's label) — the same
  pattern AG-2/AG-5 use in the base.
- The model: ruling 1 named Claude Opus 5.5 (High); this chat runs Claude Fable 5.1 by the operator's
  choice (ruling 2 item 5: noted, no change).
- TBL-6's rewrite: the brief did not name it; its premise ended with the empty allowlist, so a test
  that would have gone red for the right reason was re-aimed at the end state and given a planted
  proof (rule 20: a test that cannot fail is a defect).
- The spec's header comment and AG-1's title were rewritten (they described turn (b)'s plan for
  these very changes).
- MINOR findings from the self-review, left as they are: (1) ruling 2's file name for the ceilings
  (above); (2) `grantRole` × 3 in `e2e/` (K2, out of scope).

FINDINGS (ruling 1 item 9, not this turn's work): INC-1048 — the Countries console's Amharic in
`am-admin.ts` (the 65 `\u`-escaped lines of commit 89402cc08) is garbled; the two Countries labels
quoted in the guide texts («ይህን ገበያ ዝጋ», «የዋና ምድቦች ቅደም ተከተል») are left as they are and fixed in (d).
No other wrong value met while copying the texts.

## 11. CI

The base's CI (two-step read at the start of phase 2 and again at stop 1; the reported commit equals
the base):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `484b6bb3ffb8d81cdf45905b3de202ddb2ea53f6` (short `484b6bb`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-04T05:28:52Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41777385628
```

No red of an earlier turn to fix. `origin/dev` did not move during the turn (`git fetch` at stop 1
and before the report: `origin/dev` = `484b6bb3f`). The pull request's own runs: none red at the time of writing; a red of the pull request's own runs is classed (rule 40) and added here in the commit that fixes it.

## 12. Limits

- The sandbox is a Mac: NH-6 (`scripts/ci/nightly-hour.test.ts`, the zone lookup) and the pinned
  Linux `actionlint` and `gitleaks` binaries fail here and only here; the seven build-and-check steps
  they blocked were run by hand (§5), all green; CI's Linux runners are the judge of the three.
- `bun run e2e:changed` not run (the selector prints more than five files; ruling 1 item 8). CI's
  lanes judge every other spec that draws one of the sixteen consoles.
- The three carried numbers (ruling 2 item 4): `/admin/listings_/$listingId` +5.5 KiB,
  `/admin/roles_/$roleId` +5.5 KiB, `/admin/translations` +12.5 KiB — the texts in three first
  downloads through the whole-catalogue imports, until the fold (turn (d), plan first). The sixteen
  guided pages: +0.0 each.
- The model: Claude Fable 5.1, not the ruling's Claude Opus 5.5 (High).
- The Amharic was not read by me for meaning (the brief forbids my own Amharic; the file is the
  supervisor's vetted text) — proven byte-equal to the file, nothing more.
- Rendered-output acceptance (the sixteen tiles at 360 / 768 / 1024 / 1280) belongs to the
  operator's walk; here: typecheck, the guards, AG-1…AG-7 in both projects.
