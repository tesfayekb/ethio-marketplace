# Foundations turn L — plan (locale and format, code part; INC-999 evidence first)

Base dev e65a78e7. Plan only; no migration in any part. Counts below are from `rg` at plan time (src/e2e/scripts, tests excluded unless named) and are re-run as the census in the build.

## 1. Part A — INC-999 evidence

**Where it is cut.** `.github/workflows/local-backend-proof.yml:825` keeps `text.splitlines()[-60:]` of the start log. A long statement echo pushes the CLI's `ERROR:`/`SQLSTATE` lines above the 60-line window; only "Try rerunning the command with --debug" survives. Line 828 (INC-973's `local-backend-start-failure.txt`) keeps `ERROR`/`FATAL` lines but not `SQLSTATE`, `DETAIL`, `HINT`, `CONTEXT`. The merger at :1090 copies the fragment as written, so the fix belongs at the source.

**Rule.** Move the excerpt out of inline Python into `scripts/ci/start-failure-excerpt.py` (one function `excerpt(text) -> list[str]`), called from :825 and :828:
1. "Last migration line" (as now);
2. a **Cause** block: every line matching `^\s*(ERROR|FATAL|PANIC|SQLSTATE|DETAIL|HINT|CONTEXT|LINE \d+|QUERY)\b` or `\(SQLSTATE [0-9A-Z]{5}\)`, in order, each kept whole (cap 40 lines, newest kept, with "N earlier cause lines omitted");
3. the statement echo, cut to its first 10 and last 10 lines with "N lines omitted";
4. the last 20 lines of the log.
Cause lines are never subject to the tail cut. Redaction runs before, unchanged.

**Test.** Fixture captured, not authored (I1): run the pinned CLI 2.120.0 against a scratch local backend with a one-off file in a temp copy of `supabase/` (a `CREATE FUNCTION` echo of >200 lines then `SELECT 1/0`), save the redacted log to `scripts/ci/fixtures/start-failure-cli.log` with its capture command in a header. If no local backend can start in the sandbox, the fallback is the CLI's own error-printing shape read from its pinned source (`pkg/migration` / pgconn error formatting), cited file:line, and the fixture is marked "shape from source"; the report says which. Tests (Python via `bun test` wrapper or `python3 -m unittest` run by a unit test):
- SFE-1: captured log → excerpt contains ERROR and SQLSTATE lines.
- SFE-2: same log with the echo padded to 5,000 lines → cause lines still present.
- SFE-3: no cause lines → excerpt says "no ERROR/SQLSTATE line in the log", never empty.
- SFE-4 (guard, class INC-984/992/999): a census over `.github/workflows/*.yml` fails on any `splitlines()[-N:]` / `tail -n` excerpt of a failure log not routed through `start-failure-excerpt.py` or the lane-step excerpt; allowlist `key | reason | until`; planted proof; wired in wired.test.ts.

**LEFT:** the proof's own cause on lane 3 of run 40884980032 (one lane in nineteen) is read once evidence exists; its fix is a migration-file change → operator.

## 2. Part B — dates, times, numbers (INC-985)

### src/lib/locale.ts (constants, K4)
`LANGUAGES = ["en","am"] as const` (the formatter-known codes; om/ti join as rows), `LOCALE_TAG: Record<Lang,string> = { en: "en-GB", am: "am-ET" }`, `FALLBACK_LANGUAGE = "en"`, `COUNTRY_CODE = /^[A-Z]{2}$/`, `isCountryCode()`. `format-locale.ts` reads its tags from here (its literals at :7–8, :10, :13 move).

### src/lib/format.ts (intents)
One cached instance per (intent, resolved locale) in a `Map`; unknown language → `formatLocale` → en-GB.

| Intent | en | am |
|---|---|---|
| `formatDay` | `{dateStyle:"medium"}` (29 Oct 2026) | `{day:"numeric",month:"long",year:"numeric"}` |
| `formatDayFull` | `{dateStyle:"full"}` | `{weekday:"long",day:"numeric",month:"long",year:"numeric"}` |
| `formatDayShort` (no year) | `{day:"numeric",month:"short"}` | `{day:"numeric",month:"long"}` |
| `formatDayTime` | `{dateStyle:"medium",timeStyle:"short"}` | day as above + `{hour:"numeric",minute:"2-digit"}` |
| `formatMoment` (seconds, audit) | `{dateStyle:"short",timeStyle:"medium"}` | day long + `{hour,minute,second}` |
| `formatTime` | `{timeStyle:"short"}` | `{hour:"numeric",minute:"2-digit"}` |
| `formatMonthYear` | `{month:"long",year:"numeric"}` | same |
| `formatRelative(date, now)` | `RelativeTimeFormat {numeric:"auto"}` with the unit table now in relative-time.ts | same |
| `formatCount` | `NumberFormat()` integer | same |
| `formatNumber(n, {maxFraction})` | `NumberFormat({maximumFractionDigits})` | same |
| `weekdayNarrow`, `monthName` | for date-field only | same |

Rule: in am, `month` is never `"short"`/`dateStyle:"medium"|"short"` (CLDR am-ET short month gives "ኦክቶ"). `relative-time.ts` and `posted.ts` become thin callers or are retired into format.ts (posted.ts kept as a re-export only if callers need it; else deleted and listed in intentional-deletions).

### Consumers (src, 59 hits) — verdict
Moves (each to the intent named):
- settings.tsx:423 day · screening-page.tsx:169 dayShort (was month short), :178 dayTime · photo-reviews.tsx:62, photo-changes.tsx:59, job-line.tsx:46 dayTime · name-checks.tsx:94 dayTime, :98 count
- ai-calls.tsx:55 moment, :56 count · posting/step-who.tsx:103 day, :937 dayTime · seller-line.tsx:38 monthYear · step-pricing.tsx:403 number · price-line.ts:50 number · attribute-display.ts:91 number (fraction)
- admin-listings/listings-page.tsx:174 day, :175 dayFull, :176 dayShort (was month short) · listing-page.tsx:162 day, :163 dayTime, :885 dayTime
- account-overview.tsx:151 day · users-list.tsx:109 · user-detail.tsx:55 · impersonation-view.tsx:71 · user-legal-card.tsx:18 · legal-version-view.tsx:174 · legal-page.tsx:69 · legal-kinds.ts:70, :84 (each per its current options → day/dayTime)
- my-listing-page.tsx:269, :273 · my-listings-page.tsx:206, :215 (full), :218
- audit-page.tsx:129 time, :134 dayShort (was month short)
- relative-time.ts:22, posted.ts:9 → formatRelative
- date-field.tsx:114–117 → day, dayFull, monthYear, weekdayNarrow (locale passed in today; it moves to language)

Stays (allowlist, reason):
- ai-service.ts:256/262/268 — `en-US` USD cost formatters (provider money in USD, register row 16 exception), until: never (reviewed).
- components/ui/calendar.tsx:35, :157 and components/ui/chart.tsx:225 — UI kit (row 16); calendar is used only via date-field, which overrides labels; `data-day` is a non-visible key.
- Ethiopian-calendar year (row 16): `rg` finds no `ethiopic` Intl use in src today; the exception is kept as a named allowlist key for when it lands, else dropped (report states which).
- format-locale.ts itself (`supportedLocalesOf`) — the locale picker.

e2e: ad-page.spec.ts:1325 (`"am"` RelativeTimeFormat) and legal-pages.spec.ts:204 (`"en-GB"`) — tests compute the expected value independently by design (a test must not use the code under test); they stay, allowlisted under `e2e/` with reason "independent oracle". scripts/: no hits.

### Guard CF-FMT-1 (scripts/conformance/format.test.ts)
Fails on `Intl.DateTimeFormat|NumberFormat|RelativeTimeFormat`, `toLocale(Date|Time)?String`, a literal `"am-ET"|"en-GB"|"en-US"` locale, or `/^[A-Z]{2}$/` outside format.ts/locale.ts/format-locale.ts. AST-based (TS compiler, like T2b) so comments/strings in tests don't trip it. Allowlist `key | reason | until`; stale/expired fail. Planted bypass proof; wired.test.ts names `test:unit`.

INC-954 app copies: legal-kinds.ts:101, legal-service.ts:107, calling-codes.ts:131, pricing-data.ts:277 → `isCountryCode`. pricing-data's `/^[A-Z]{3}$/` (currency) is a K2 (no constant asked). **LEFT:** the SQL half (23 functions with `'am'/'en'` literals → `base_languages()`, INC-954 DB copies).

## 3. Part C — page heads in the reader's language (INC-990)

**Builder** `src/lib/page-head.ts`: `pageHead({ title: MessageKey, description?: MessageKey, values?, og?: {image?, type}, canonical?, hreflang? }, ctx)` → TanStack `head()` object; adds the site suffix from key `head.siteSuffix`; dynamic parts (seller name, ad title) are inserted as values (text only; React head renders them as text nodes / attribute values, never HTML). Public routes keep G1: absolute og URL from `getRequestOrigin`, `og:locale` = declared language, hreflang from the publication gate (existing code moves behind the builder, not changed).

**Language and catalogue.**
- Server first paint: `server-shell-language.ts` already resolves the cookie language (DEC-287); the root route loader exposes `{ language }` in router context; `head()` reads `match.context.language`.
- Catalogue: head keys live in a new tiny layer `head` (en-head/am-head, DEC-258 layers) — only head strings (~55 keys × 2). On the server it is imported statically (server bundle, no client cost). In the browser, `head()` re-runs on navigation; the `head` layer is joined into **en-base/am-base already shipped** only if measured cost ≤0.1 KiB/page; otherwise the client head keeps the SSR title until the strings layer for that route loads, then `StringsLayerGate`'s load triggers `router.invalidate()`-free re-head via a `useHead` sync of `document.title`. Decision taken by measurement in turn L-3 (both builds measured against base; cause written). Missing key → English catalogue → never raw key (compiled.en fallback, D3).
- Admin heads: their keys go in the admin layer (already loaded before draw).

**Consumers.** 52 route files with `head:` (full list produced by `rg -l "head: " src/routes` in the census and pasted into the report), plus `src/features/seller/seller-head.ts` ("Ads by ${name} on ethio.com.") and any `head` helper under features (`rg "title:" src/features/**/*head*`). seller-head becomes a caller of `pageHead` with `values: { name }`; INC-990's two English literals become keys.

**Guard CF-HEAD-1** (scripts/conformance/page-head.test.ts): AST over src/routes and `*head*.ts`: a string/template literal in a `title` meta, `description`, `og:title`, `og:description`, `twitter:*` outside page-head.ts fails. Planted literal proof; allowlist form as above; wired.

**New keys** (names only; EN/AM sent by script, G43): `head.siteSuffix`, `head.<route>.title` and `head.<route>.description` per route (≈52 × 2, exact list emitted by the census script `scripts/conformance/head-keys.ts --list` in L-3 and sent to you before strings land), `head.seller.title`, `head.seller.description`, `head.seller.notFound.title`. Existing keys reused where a route already shows the same heading (listed per route).

**First-download cost.** Builder ≈0.3 KiB min (shared root chunk). Target ≤0.1 KiB gzip per public page; measured per page in route-budgets with cause. If the builder exceeds it, it is split: server-only formatting in the head path, client only `document.title` sync. Over-tolerance = STOP (G60).

## 4. Part D — messages with values

**Out of this work; own turn (L-5).** 226 `.replace("{` sites in src (non-test); heaviest import-dialog.tsx (11), approve-bar.tsx (5), screening-page.tsx:467–468, listings-page.tsx:317–324, listing-page.tsx:256/300/340, auth.tsx:464/504/513/680, invite-card.tsx:36–39, data-table.tsx:361, filter-chips.tsx:140, feed.tsx:127, location-selector.tsx:313, app-shell.tsx:918, settings.tsx:635, country-dialogs.tsx:58, country-verb-dialogs.tsx:78. Full by-definition list emitted by the L-5 census. Mechanism there: `t(key, values)` with typed placeholders from catalog-tokens.ts, plus guard. Part C's builder uses the same `values` shape so L-5 only swaps its interpolation.

## 5. Tests (ids grep-checked free at plan time; re-grepped at build)
- Unit: SFE-1…4; FMT-1…8 (each intent en + am; FMT-3 asserts am month full "ኦክቶበር" not "ኦክቶ"; FMT-7 unknown language → en-GB; FMT-8 cache returns same instance); LOC-1…3 (country shape, tags, fallback); CF-FMT-1 planted; HEAD-1…5 (keys→text in am, values as text with `<img src=x onerror=alert(1)>` literal, missing am key → en, unknown language → en, public head carries absolute og/hreflang); CF-HEAD-1 planted.
- E2E (both projects, whole files, 0 retries, `bun run e2e:local`): `e2e/locale-format.spec.ts` LF-E1 an Amharic account sees a full Amharic month on My listings; LF-E2 `/` and an ad page SSR `<title>` in Amharic with cookie am (read from response HTML before hydration); LF-E3 English unchanged. Touched specs run whole.

## 6. Conflicts
- Knowledge v3.11 A6 vs CI-2 R1/AGENTS.md `bun run checks` (runs build): governed by the CI-2 ruling until v3.12.
- Platform "never run typechecks" — checks reads harness verdict (as ruled).
- D1/C: route `head()` must stay synchronous/SSR; catalogue must not enter public first downloads (DEC-261/D234 budgets) — handled by the measured decision in §3.
- K4 vs e2e oracles holding `"am"`/`"en-GB"` — allowlisted with reason; needs your ruling if not accepted.
- Part A edits a workflow file and adds a script; no migration.
- No conflict found with AGENTS.md otherwise.

## 7. K2
- pricing-data.ts:277 currency shape `/^[A-Z]{3}$/` — no constant (reported).
- calendar.tsx:35 `"default"` locale month short — UI kit, overridden by date-field; reported.
- chart.tsx:225 `toLocaleString()` without locale.
- 226 `.replace("{` sites (Part D).
- SQL `'am'/'en'` literals in 23 functions and INC-954 DB copies (LEFT).
- e2e oracles with literal locales.

## 8. Sizing (G37, G0.10)
| Turn | Content | Estimate |
|---|---|---|
| L-1 | Part A excerpt script, workflow wiring, captured fixture, SFE-1…4 guard | 1 turn, band S–M |
| L-2 | locale.ts, format.ts, CF-FMT-1 + allowlist, INC-954 four app copies, FMT/LOC tests | 1 turn, M |
| L-3 | Move the ~45 Part B consumers; E2E LF-E1; budgets | 1 turn, M–L |
| L-4 | page-head.ts, language in context, head layer + measurement, CF-HEAD-1, key list to you; then (after strings arrive) 52 routes + seller-head, LF-E2/E3 | 1–2 turns, L |
| L-5 | Part D `t(key, values)` + guard + 226 sites | own turn(s), L |

Total L-1…L-4: 4–5 turns (band 4–6). LEFT for the operator: SQL locale literals → `base_languages()`, INC-954 DB copies, INC-999's proof fix (migration-file change).
