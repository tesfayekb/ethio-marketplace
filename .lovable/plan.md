# Bundle 10a — the one failure notice (DEC-464, INC-1278, INC-1279)

Base `lovable/next` (app files = dev `1bbfc7dad`). Plan only. Nothing is built before ruling 1.

## 1. Census of consumers (definition: a `.tsx` under src/features, src/routes, src/components that draws a query's or an action's failure)

Honest limit: this census is a read-only scan with file:line for every site found (148 confirmed, 16 in EXCLUDED paths). It is **not yet proven exhaustive**. Still to trace before Part A lands: action-refusal outlets in admin dialogs and posting fields, `features/ad-page`, state → child prop chains, and every Retry marked `?`. The guard (section 3) is what closes the gap. It fails on any site this list missed.

Legend: **M** = moves here (renders through the notice). **L** = left, with the reason. **X** = EXCLUDED, allowlisted `| INC-1279 until bundle 10b`.

**Shared outlets (components)**
- M `components/shell/data-table.tsx:181, :692`: the failed state draws the notice. `retry` becomes required whenever `error` is set (D38, D46).
- M `components/shell/stat-card.tsx:29-31, :70`: `failed` draws the notice in tile size. `onRetry` is required with `failed`.
- M `components/shell/detail-panel.tsx:54`, `chart-frame.tsx:112`: they take `error` and `onRetry`.
- M `components/forms/field-select.tsx:39, :62`: the `failed` line gains the notice's compact form and a Retry.
- M `components/marketplace/feed.tsx:39, :206` (FeedError), `:286` (D2: next-page Retry gains `retryTestid`), `:149` (D3: "Show more" button when IntersectionObserver is missing).
- M `components/shell/app-rail.tsx:711-713, :726` (D12: failed is never also "No categories yet").
- M `components/shell/location-selector.tsx:280-286` (D13, D21: the place lists).
- L `components/shell/strings-layer-gate.tsx:42`, `date-field.tsx:183`, `components/ui/picture.tsx:70-79`: on-demand download failures already go through `LoadFailedHere`/INC-911, or are an image fallback, not a read.

**Public and member**
- M feed reader `use-feed.ts:38` (D1): keeps the 404 code. A kept place that is gone is cleared, the feed reloads, and one line says so.
- M `features/seller/seller-page.tsx:31, :61` (D5: next page failure gets words and Retry).
- M `routes/l.$slug.tsx:167-169`, `listing-detail.tsx:1535-1540` (D4: gone → "no longer available" + Go home).
- M `routes/legal.$kind.tsx:62, :73` (D6), `routes/legal.publishing.tsx:95-97` (D9), `features/legal/legal-document-page.tsx:47, :135`, `legal-accept-screen.tsx:27, :99` (D7), `my-legal-page.tsx:48` (D26), `my-legal-version.tsx:37-38` (D28: gone by gate code), `certify-block.tsx:53`.
- M `features/account/account-overview.tsx:131`, `saved-page.tsx:90, :135` (D26; :135 stays an action failure, D27's words are bundle 10b's unless ruled).
- M `features/posting/wizard.tsx:860-861`, `step-category.tsx:229-234` (D15), `step-specifications.tsx:1196, :1208, :1753`, `step-pricing.tsx:461-462` (D18), `step-where.tsx:1572, :1629` (D21), `step-who.tsx:684-687`, `step-review.tsx:596-599` (D20).
- L `step-who.tsx:990`, `map/*` (`LoadFailedHere`); `step-photos.tsx:669`, `step-where.tsx:1946, :2146, :2248`, `step-who.tsx:1247`, `step-review.tsx:823`, `photo-editor.tsx:246`: field- and save-level refusals with their own words (refusal reader); census will re-check each for raw text.
- M `features/my-listings/my-listings-page.tsx:740-746`, `my-listing-page.tsx:366, :668-671, :677, :690, :771` (D23), `promote-sheet.tsx:113`.

**Admin**
- M `features/admin/users/users-list.tsx:247`, `user-detail.tsx:98, :410-416` (D32).
- M `features/admin/roles/roles-list.tsx:237`, `role-detail.tsx:29-53` (D38).
- M `features/admin/translations/*`: `languages-page.tsx:169, :629, :1042`, `strings-page.tsx:429`, `data-scope.tsx:186-192, :237, :588`, `history-drawer.tsx:137, :242-250`, `transfer-bar.tsx:241-244`, `pseudo-bar.tsx:148-151`, `ai-bulk-bar.tsx:247, :273, :290`, `delete-language-dialog.tsx:114`, `language-picker.tsx:51`, `translator-card.tsx:129` (D38, D43). Raw detail goes to a `data-` attribute and the console.
- M `features/admin/legal/*`: `legal-page.tsx:41, :318`, `legal-version-view.tsx:50, :188`, `legal-editor.tsx:24`, `legal-editor-form.tsx:156`, `user-legal-card.tsx:45` (D38).
- M `features/admin/import-dialog.tsx:243-255, :664-678` (D51: `code — detail` leaves the words).
- M `features/admin-categories/categories-page.tsx:789-792, :1052-1055` (D51), `:1086`, `category-dialogs.tsx:907-916` (D46).
- M `features/admin-locations/locations-page.tsx:435-444`, `admin-countries/countries-page.tsx:333-342` (D46), `country-verb-dialogs.tsx:135-149, :224-227` (D54).
- M `features/admin-overview/locations-overview.tsx:34-43, :60-98` (D52: a tile is drawn only when its read may run).
- M `features/admin-monetisation/markets-section.tsx:179`, `products-section.tsx:350` (D46), `use-monetisation-error.ts:25-40`, `monetisation-dialogs.tsx:33-40` (D51).
- M `features/admin-ai/ai-page.tsx:253-261` (D46), `ai-refusals.ts:48-59`, `ai-feature-form.tsx:194-205` (D51).
- M `features/admin-listings/listing-page.tsx:216, :616, :1002`, `listing-settings.tsx:163`, `listings-page.tsx:254, :553, :642`, `tier-dialog.tsx:158`; `admin-screening/screening-page.tsx:497` (D36), `:633`, `job-line.tsx:100`. Already-retrying sites (`name-checks.tsx:231`, `photo-changes.tsx:99`, `photo-reviews.tsx:109`, `listing-photos.tsx:101`, `ai-calls.tsx:140`, `ai-spend-days.tsx:80`) move for one look.
- M comments only: `routes/admin.screening.tsx:10-12`, `use-screening.ts:382-385` (D37).
- L `routes/dev.primitives.tsx:327-428`: the board shows the notice's states; allowlisted as a demonstration.
- L `routes/__root.tsx:291`: the route error boundary (Refresh), not a reader.
- X `features/admin/audit/*`, `features/admin/impersonation/*`, `features/admin-attributes/*`, `features/auth/*`, `routes/auth*`, `routes/settings.tsx`, `routes/admin.tsx` (D29, D31, D39, D40, D42, D49, audit part of D38, attributes part of D46).

## 2. The notice

`src/components/shell/failure-notice.tsx` (new), one component, no new dependency.

```text
FailureNotice({
  error: unknown;              // read once with readerFailure + gateRefusal
  testid: string;              // `${testid}-failed`, `-retry`, `-exit`
  onRetry?: () => void;        // caller's own refetch
  exit?: { label: StringKey; to?: LinkProps; onPress?: () => void }; // gone / no access
  gone?: readonly string[];    // extra codes that mean "gone" for this caller
  size?: "block" | "tile" | "line";
})
```

Reason map (one row each; growth = one row):

| Reason (from `readerFailure`) | Words | Next step |
|---|---|---|
| `network` | failure.network | Retry (onRetry) |
| `server`, `malformed`, unknown | failure.server | Retry |
| `refused`, code in gone set (`listingNotFound`, `listingNotAvailable`, `unknownPlace`, `unknownCategory`, `notYours` + `gone`) | failure.gone | caller's exit, else Go home. Never Retry |
| `auth` 403 / `permissionDenied` | failure.noAccess | Go back. Never Retry |
| `auth` 401 | nothing new: hands to the existing sign-in-ended path; draws failure.server words while it does | — |
| `rateLimited` | failure.rateLimited `{when}` (formatLocale) | Retry, disabled until that time |
| other `refused` | failure.refused | Go back |

Rules: `role="alert"`, never takes focus, targets 44 px (`size="touch"`). The class and status go only to `data-failure-class` / `data-failure-status` and `console.warn`. Detail is shown only through a key that takes it. The notice never throws: a read that throws falls to the `server` row.

New keys (en-base.ts after `"common.retry"` :35; am-base.ts after :33 from the supervisor's file). Existing `common.retry` and `common.goHome` are reused (searched).

| Key | English |
|---|---|
| failure.network | We couldn't reach ethio.com. Check your connection and try again. |
| failure.server | Something went wrong on our side. Try again. |
| failure.gone | This is no longer available. |
| failure.noAccess | You don't have access to this. |
| failure.refused | This couldn't be done. |
| failure.rateLimited | Too many tries. You can try again {when}. |
| failure.goBack | Go back |
| failure.showMore | Show more |
| failure.placeCleared | That place is no longer listed, so we're showing all areas. |

## 3. The guard

`src/components/shell/failure-notice.census.test.ts` (new). Reads every non-test `.tsx` under src/features, src/routes, src/components. Fails when a file matches a failure pattern and does not render `<FailureNotice` or a shared outlet that does (DataTable `error=` with `retry=`, StatCard `failed` with `onRetry`, DetailPanel/ChartFrame `error=` with `onRetry=`). Fails always on a diagnostic drawn as words.

Patterns:
- failure branch: `/\.\s*(?:error|isError|isFailed)\b|===\s*["'](?:failed|error)["']|\bfailed\s*[?&]/`
- failure prop: `/\b(?:error|failed|errorState|failedLabel)\s*=/`
- diagnostics (always red): `/\b\w*[Ff]ailure\s*\.\s*(?:class|status)\b(?![^<]*data-)/`, `/\berror\s*\.\s*message\b/`, `/\bString\(\s*error\s*\)/`, and `errorText(` inside JSX.
- allowlist `path | reason | until`; stale or expired lines fail; EXCLUDED files `| INC-1279 until bundle 10b`.
- proven on a planted bypass (a temp file string fed to the same matcher) before it lands.

It misses: an error renamed to any other variable (`problem`, `phase`) and drawn; a catch → helper → state → child chain; toasts; a Retry drawn that cannot succeed (behaviour, not text). Those are covered by the notice's tests and browser tests, not the guard.

## 4. Parts in order

- **Part A** — `failure-notice.tsx`, `failure-notice.test.tsx` (FN-U1 each reason's words/step; FN-U2 Retry calls refetch; FN-U3 no Retry on gone/no access; FN-U4 Retry waits for the rate time; FN-U5 unknown error draws server; FN-U6 no class/status in text), the guard + planted proof, `data-table.tsx`, `stat-card.tsx`, `detail-panel.tsx`, `chart-frame.tsx`, `field-select.tsx`, keys, the board's states in `dev.primitives.tsx`, docs/features/display-primitives.md.
- **Part B — public**: feed (`feed.tsx`, `use-feed.ts`), `app-rail.tsx`, `location-selector.tsx`, ad page, seller page, legal routes/pages (D1–D7, D9, D12, D13).
- **Part C — posting and member**: wizard and steps, my-listings, account, my legal (D15, D18, D20, D21, D23, D26, D28).
- **Part D — admin**: users, roles, translations, legal, listings, screening, categories, locations, countries, overview, monetisation, AI, import dialog, comments (D32, D36–D38, D43, D46, D51, D52, D54).

User cases per changed screen (works; network; server; gone; no access; rate; empty; signed out/in; EN/AM; 360/768/1280) get their unit ids in each part's report; every browser case is NONE today and is named for Cursor's bundle 7: FEED-F1 gone place cleared, AD-F1 gone ad, RAIL-F1, LOC-F1, SELL-F1, LEGAL-F1, WIZ-F1, MYL-F1, ACC-F1, ADM-F1 (one per console, a DataTable failure + Retry).

## 5. Conflicts with the rules

1. roadmap.md: the message asks for it; Knowledge ROLE never touches it. Not written.
2. Guards: Knowledge says a guard is a `scripts/conformance` census (kit.ts, wired.test.ts); scripts/ is never-touch. The ruling places it in src/components/shell. Ruling needed: keep it there, or Cursor wires a scripts census.
3. Performance vs failure: lazy-loading the notice means a network failure may not be able to fetch it. Proposal: the notice stays in the shell chunk (small, words only); the size cost is NOT RUN here (plan mode, no build) and is named per page at the build turn.
4. DataTable/StatCard "retry required": EXCLUDED callers (audit, impersonation, attributes) would break the type. Proposal: required by the guard, optional in the type until bundle 10b.
5. `reportUnauthorised` lives in `src/features/auth/session-end.ts` (EXCLUDED): imported, never edited.
6. `use-feed.ts` and `my-legal-version.tsx` reads may need a service change (E2: no new database call). D1 and D28 use the codes already returned; if not, STOP.
7. D27 and the action refusals in posting are a refusal reader's concern (E3); left unless ruled.
8. Census not proven exhaustive (section 1).
