# CURSOR BUNDLE 8a — every page meets its failures: the failure crawl (DEC-459 (c), INC-1278 in part); a route answer that is not ok becomes one typed failure (INC-1305, INC-1304, the typed failure's detail); two guards that misjudge (INC-1308, INC-1306). — report

Base: 70df93185 · Final commit: 0710dd3fd · Brief: docs/governance/briefs/cursor-bundle-8a.md (sha256 d652e014b41a288a66dbb7acf49453346dab6b526441dbf0c95111c17c6f6f2a) · Ruling 1: docs/governance/briefs/cursor-bundle-8a-ruling-1.md · Ruling 2: docs/governance/briefs/cursor-bundle-8a-ruling-2.md (sha256 a623e362bf17081bf3a64060d6f9e2614c451d68c8aeab03f6e61cf8d73d88de)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on e2ed49f
Review (ruling 2's commits): READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on 0710dd3

CI of the base (read at the turn's start and again before the push): `Commit: 70df931855277087581fe4921066bcb64d5b34cd (short 70df931)` · `Conclusion: SUCCESS` · run 45859549094. The pull request's CI: §11.

## 1. Done / not done, by part and step

- STEP 0 — done (commit 0e0bbf556). The brief was saved by scripted copy, and its sha256 equals the carrier's. Roadmap line 3 names it. The briefs allowlist held no line keyed to another brief. `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8a.md --root .` answered `[check-go] no finding`.
- STEP 1 — the census. It stopped once (stop 1, commit 425364496: `PROVIDER_ERRORS` held no server-error body). Ruling 1 was saved by scripted copy with its sha256 equal (commit b8241d347). The census is in §2, after the file list.
- STEP 2, PART 1 — done (771711dee, with the gate fixes in 97d1ad80c). It adds the crawl, its judge and its table; seven spec files, one per area; the planted unit cases (`src/test/failure-crawl.test.ts`, FCJ-1…12); the allowlist; and the page-coverage census (CF-CRAWL-1, CFC-1…5). Per ruling 1 Q1, it also adds four captured server errors to `PROVIDER_ERRORS`, with PEF-3…5.
- STEP 3, PART 2 — done (0e21fe1a5).
  - INC-1305: `similar.ts` and `suggestAliases` throw the typed failure. `similar-ads.tsx` and `step-who.tsx` draw the failure notice with Retry. `peekAssist` and the six other reads are designed defaults, listed as `default` lines (§10).
  - INC-1304: the translations service's three failures go through `routeFailure`, and `/i18n-usage.json` is read through `fetchWithDeadline`.
  - The typed failure carries the route's detail (`ReaderFailure.detail`, `failureDetail`), and `reasonOf` reads it from there.
- STEP 4, PART 3 — done.
  - (a) 0352aadf0: the floor reads the copies and the hook's calls (`floorProblem`, `hookCalls`), proven by DPM-5's two planted cases. No sibling floor is of the same kind (§2, definition).
  - (b) 8680b9176: the component job's step "Changed test files, each alone (INC-1306)" (`scripts/conformance/changed-tests.ts`, CF-ALONE-1…3).
- STEP 5 — done: `docs/features/failure-crawl.md` (new), `docs/features/route-client.md`, `docs/features/ci-guards.md`.
- STEP 6 — done (§5). The ceilings commit e27b6173f follows the checks' NEAR notes (§10).
- STEP 7 — the push of e27b6173f, then a second push (e2ed49f10) for its CI's two causes (§10, §11). PR [#114](https://github.com/tesfayekb/ethio-marketplace/pull/114) stays a draft.
- STEP 8 — this report.
- RULING 2 — done.
  - The ruling was saved by scripted copy, its sha256 equal to the carrier's and to `expected.txt` (commit 4fe8b691f).
  - The browse-path guard reads every path from `src/` on, and admits the hook alone from the admin route files `src/routes/admin.<…>` (b1543bbfd).
  - BPG-4's deadline is written as its three runs' (0710dd3fd, the self-review's fix).
  - That was one push (0710dd3fd), then this report, records only.

## 2. Files changed

`git diff --name-only 70df93185` (this report's commit included):

```
.github/workflows/ci.yml
docs/features/ci-guards.md
docs/features/failure-crawl.md
docs/features/rbac-client-seam.md
docs/features/route-client.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-8a-ruling-1.md
docs/governance/briefs/cursor-bundle-8a-ruling-2.md
docs/governance/briefs/cursor-bundle-8a.md
docs/governance/reports/cursor-bundle-8a.report.md
docs/governance/reports/cursor-bundle-8a.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/failure-crawl-admin-catalog.spec.ts
e2e/failure-crawl-admin-content.spec.ts
e2e/failure-crawl-admin-people.spec.ts
e2e/failure-crawl-member-account.spec.ts
e2e/failure-crawl-member-listings.spec.ts
e2e/failure-crawl-member-public.spec.ts
e2e/failure-crawl-public.spec.ts
e2e/helpers/crawl-fixtures.ts
e2e/helpers/crawl-pages.ts
e2e/helpers/failure-crawl-judge.ts
e2e/helpers/failure-crawl-tests.ts
e2e/helpers/failure-crawl.ts
public/i18n-usage.json
roadmap.md
scripts/check-browse-imports.sh
scripts/check-browse-imports.test.ts
scripts/ci/lane-weights.json
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/call-deadline-allowlist.txt
scripts/conformance/changed-tests.test.ts
scripts/conformance/changed-tests.ts
scripts/conformance/door-permissions.test.ts
scripts/conformance/door-permissions.ts
scripts/conformance/failure-crawl-allowlist.txt
scripts/conformance/failure-crawl.test.ts
scripts/conformance/failure-crawl.ts
scripts/conformance/route-client-allowlist.txt
scripts/conformance/route-client.test.ts
scripts/conformance/wired.test.ts
scripts/conformance/workflow-reader.ts
scripts/e2e-select.ts
scripts/fixtures/browse-imports/admin-route-hook/src/routes/admin.users.ts.txt
scripts/fixtures/browse-imports/admin-route-seam/src/routes/admin.roles.ts.txt
scripts/fixtures/browse-imports/browse-route-hook/src/routes/listings.ts.txt
scripts/route-budgets.mjs
src/features/ad-page/similar-ads.test.tsx
src/features/ad-page/similar-ads.tsx
src/features/ad-page/similar.test.ts
src/features/ad-page/similar.ts
src/features/admin/import-dialog.tsx
src/features/admin/translations/translations-service.test.ts
src/features/admin/translations/translations-service.ts
src/features/admin/translations/use-translations.test.ts
src/features/admin/translations/use-translations.ts
src/features/posting/posting-service-reads.test.ts
src/features/posting/posting-service.ts
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/lib/route-client.test.ts
src/lib/route-client.ts
src/test/failure-crawl.test.ts
src/test/provider-errors.test.ts
src/test/provider-errors.ts
```

New files (`git diff --name-only --diff-filter=A 70df93185`, each proven tracked by `git ls-files`, 28 of 28 at ruling 2's push, this report included):

```
docs/features/failure-crawl.md
docs/governance/briefs/cursor-bundle-8a-ruling-1.md
docs/governance/briefs/cursor-bundle-8a-ruling-2.md
docs/governance/briefs/cursor-bundle-8a.md
docs/governance/reports/cursor-bundle-8a.report.md
docs/governance/reports/cursor-bundle-8a.stop-1.md
e2e/failure-crawl-admin-catalog.spec.ts
e2e/failure-crawl-admin-content.spec.ts
e2e/failure-crawl-admin-people.spec.ts
e2e/failure-crawl-member-account.spec.ts
e2e/failure-crawl-member-listings.spec.ts
e2e/failure-crawl-member-public.spec.ts
e2e/failure-crawl-public.spec.ts
e2e/helpers/crawl-fixtures.ts
e2e/helpers/crawl-pages.ts
e2e/helpers/failure-crawl-judge.ts
e2e/helpers/failure-crawl-tests.ts
e2e/helpers/failure-crawl.ts
scripts/conformance/changed-tests.test.ts
scripts/conformance/changed-tests.ts
scripts/conformance/failure-crawl-allowlist.txt
scripts/conformance/failure-crawl.test.ts
scripts/conformance/failure-crawl.ts
scripts/fixtures/browse-imports/admin-route-hook/src/routes/admin.users.ts.txt
scripts/fixtures/browse-imports/admin-route-seam/src/routes/admin.roles.ts.txt
scripts/fixtures/browse-imports/browse-route-hook/src/routes/listings.ts.txt
src/features/admin/translations/use-translations.test.ts
src/test/failure-crawl.test.ts
```

### The census (STEP 1)

- **consumers.**
  - Fix 1: every page route of `src/routeTree.gen.ts`. There are 58 rows across 3 audiences (`e2e/helpers/crawl-pages.ts`, FCR-1…78) and 2 `page` lines. The reads each page makes were recorded from real loads by the crawl itself (§5 runs).
  - Fix 2: INC-1305's reads, from Cursor 7b's report (finding F3) as ruling 1 Q4 directs:
    - `similar.ts:28` and `suggestAliases` (posting-service.ts:1111): bypassed, now through `routeFailure`.
    - `pricing-data.ts:214` and `:273`, `step-where.tsx:226`, `attribute-options.ts:159`, `map/leaflet.ts:97`, `map/geocode.ts:32` and `peekAssist` (posting-service.ts:965): designed defaults, as `default` lines.
    - `step-photos.tsx:262` reads an upload's answer, a write, so it is not a read on load.
    - INC-1304: `translations-service.ts:611–617`, `:682–685`, `importFailure` `:1104–1108` and `use-translations.ts:396`, all bypassing; now through `routeFailure` and `fetchWithDeadline`.
  - Fix 3a: `COMPARISON_FLOOR` (door-permissions.test.ts:39 now, :28 at the base). Fix 3b: the job `component-tests` (`.github/workflows/ci.yml:209–224` at the base).
- **definition.**
  - Fix 1: the route list as above.
  - Fix 2: route answers turned into a default or a hand-built failure, as listed under consumers. RCG-6 (`scripts/conformance/route-client.test.ts`) now holds no allowance for a failure built from an answer's status.
  - Fix 3a, the floors with an allowlist (`rg -n "FLOOR\s*=" scripts/conformance`):
    - `safe-href.test.ts:166` `SINK_FLOOR` counts every sink. A retired line wraps its sink rather than removing it, so it cannot fall with the work.
    - `door-words.test.ts:42–43` counts families and named doors. Retiring a line adds a family. Its allowlist is on the never-list.
    - `script-text.test.ts:166` and `lint-rules.test.ts:80–81` have no `until` allowlist.
    - So `COMPARISON_FLOOR` is the only floor of the kind.
  - Fix 3b: `github.event.pull_request.base.sha` or `github.event.before`, one `git fetch --no-tags --depth=1`, then `git diff --name-only --diff-filter=d`.
- **tests.** `similar.test.ts`, `similar-ads.test.tsx`, `posting-service-reads.test.ts`, `step-who.test.tsx`, `translations-service.test.ts`, `use-translations.test.ts` (new), `reader-failure.test.ts`, `route-client.test.ts`, `import-dialog.test.tsx` (IRW-3 and IRW-9 assert the detail tail, unchanged), `scripts/conformance/route-client.test.ts` (RCG-4's pinned INC set), `door-permissions.test.ts`, `wired.test.ts`, `turn-checks.test.ts`.
- **lists.**
  - The crawl's allowlist (new, 76 lines).
  - `route-client-allowlist.txt`: 10 → 8.
  - `call-deadline-allowlist.txt`: 2 → 1.
  - `wired.test.ts`: names CF-CRAWL-1 and CF-ALONE.
  - `docs/features/ci-guards.md`.
  - The briefs allowlist: no line.
  - `scripts/ci/lane-weights.json`: seven entries (CF-LANES-2).
  - The e2e areas (`scripts/e2e-select.ts`, area `failure-crawl`).
  - Exact lists: RCG-4 (`toEqual` over the INC set, now one), PEF-4 (the captured keys), CF-ALONE-3 (the job's step order).
- **old-file-readers.**
  - `REFUSAL_DETAIL`: `route-client.ts:97`, `reader-failure.ts:223`, `src/server/imports/route.ts:125` (a server reader, unchanged).
  - The typed failure's fields: `failureDetail` is read only by `import-dialog.tsx` `reasonOf` (ruling 1 Q5).
  - `COMPARISON_FLOOR`: door-permissions.test.ts only.
  - The job's steps: `workflow-reader.ts`, CF-ALONE-3.
- **second-readers.**
  - Eight files `vi.mock("@/lib/route-client"`. Five spread the original, so `routeFailure` stays real: `first-reads.test.ts:16`, `translations-service.test.ts:14`, `use-photo-links.test.ts:11`, `import-dialog.test.tsx:29`, `location-data.test.ts:23`.
  - Three replace the module whole: `location-import-dialog.test.tsx:23`, `geocode.test.ts:9`, `use-feed.test.ts:17`. Of their modules, only `use-feed.ts:42` calls `routeFailure` (§13).
  - No file mocks `@/lib/reader-failure`.
  - INC-1306's class (a fixed tick for an on-demand load) is caught by the new step, which ran all 16 changed test files alone and green (§5).
- **chunk-graph.** The entry is unchanged in its modules: `index` −5 B and `shared-shell` +4 B (the dependency map's names); `reader-failure` stays on demand.
- **environments.** Not applicable: no build option changes.
- **mechanisms read.** `routeFailure`, `readFailed`, `REFUSAL_DETAIL`, `fetchWithDeadline` and its census, `FailureNotice`, the on-demand notice, `leaseUser`, `staff-factor.ts`, `whilePageLives`, `e2e/helpers/layout.ts`, `PROVIDER_ERRORS`, `kit.ts`, `workflow-reader.ts`.
- **first-download.** From my own lock-exact builds (the base rebuilt in `/tmp/ethio-scratch/cursor-bundle-8a/base-tree`, the tree's in `dist/`), every page:

  | Page | Base KiB | This tree KiB | Change | Ceiling | Room |
  |---|---|---|---|---|---|
  | `/` | 227.7 | 227.7 | 0.0 | 229 | 1.3 |
  | `/$name` | 225.6 | 225.6 | 0.0 | 227 | 1.4 |
  | `/account` | 270.7 | 270.7 | 0.0 | 272 | 1.3 |
  | `/account_/legal` | 210.3 | 210.3 | 0.0 | 211 | 0.7 |
  | `/account_/legal_/$versionId` | 211.7 | 211.7 | 0.0 | 213 | 1.3 |
  | `/account_/saved` | 228.0 | 228.0 | 0.0 | 229 | 1.0 |
  | `/admin` | 215.0 | 215.0 | 0.0 | 216 | 1.0 |
  | `/admin/` | 215.9 | 215.8 | -0.1 | 217 | 1.2 |
  | `/admin/ai` | 311.1 | 311.1 | 0.0 | 312 | 0.9 |
  | `/admin/attributes` | 326.4 | 326.5 | 0.1 | 327 | 0.5 |
  | `/admin/audit` | 299.9 | 299.8 | -0.1 | 301 | 1.2 |
  | `/admin/categories` | 360.9 | 360.9 | 0.0 | 362 | 1.1 |
  | `/admin/countries` | 317.0 | 317.0 | 0.0 | 318 | 1.0 |
  | `/admin/images` | 215.7 | 215.7 | 0.0 | 217 | 1.3 |
  | `/admin/impersonation_/$sessionId` | 243.8 | 243.8 | 0.0 | 245 | 1.2 |
  | `/admin/legal` | 292.4 | 292.4 | 0.0 | 293 | 0.6 |
  | `/admin/legal_/$versionId` | 288.6 | 288.6 | 0.0 | 289 → 290 | 1.4 |
  | `/admin/legal_/edit` | 292.3 | 292.3 | 0.0 | 293 | 0.7 |
  | `/admin/listings` | 336.8 | 336.9 | 0.1 | 338 | 1.1 |
  | `/admin/listings_/$listingId` | 337.7 | 337.8 | 0.1 | 339 | 1.2 |
  | `/admin/listings_/$listingId_/edit` | 419.9 | 420.0 | 0.1 | 421 | 1.0 |
  | `/admin/locations` | 279.1 | 279.1 | 0.0 | 280 | 0.9 |
  | `/admin/monetisation` | 320.9 | 320.9 | 0.0 | 322 | 1.1 |
  | `/admin/places` | 319.3 | 319.4 | 0.1 | 320 | 0.6 |
  | `/admin/roles` | 301.3 | 301.2 | -0.1 | 302 | 0.8 |
  | `/admin/roles_/$roleId` | 281.1 | 281.1 | 0.0 | 282 | 0.9 |
  | `/admin/screening` | 357.6 | 357.7 | 0.1 | 358 → 359 | 1.3 |
  | `/admin/translations` | 317.7 | 317.6 | -0.1 | 319 | 1.4 |
  | `/admin/translations_/$lang` | 318.6 | 318.5 | -0.1 | 319 | 0.5 |
  | `/admin/users` | 299.0 | 299.0 | 0.0 | 300 | 1.0 |
  | `/admin/users_/$userId` | 300.1 | 300.0 | -0.1 | 301 | 1.0 |
  | `/auth` | 224.1 | 224.1 | 0.0 | 225 | 0.9 |
  | `/auth_/callback` | 209.8 | 209.7 | -0.1 | 211 | 1.3 |
  | `/auth_/reset` | 217.2 | 217.2 | 0.0 | 218 | 0.8 |
  | `/c/$slug` | 227.7 | 227.7 | 0.0 | 229 | 1.3 |
  | `/dev/primitives` | 232.2 | 232.2 | 0.0 | 233 | 0.8 |
  | `/dev/style` | 267.3 | 267.3 | 0.0 | 268 | 0.7 |
  | `/dev/tall` | 208.7 | 208.7 | 0.0 | 210 | 1.3 |
  | `/l/$slug` | 253.5 | 253.6 | 0.1 | 254 → 255 | 1.4 |
  | `/legal/$kind` | 212.7 | 212.7 | 0.0 | 214 | 1.3 |
  | `/legal/accept` | 218.4 | 218.3 | -0.1 | 219 | 0.7 |
  | `/legal/publishing` | 214.0 | 214.0 | 0.0 | 215 | 1.0 |
  | `/my-listings` | 315.0 | 315.0 | 0.0 | 316 | 1.0 |
  | `/my-listings_/$listingId` | 325.4 | 325.5 | 0.1 | 326 | 0.5 |
  | `/my-listings_/$listingId_/edit` | 409.7 | 409.9 | 0.2 | 411 | 1.1 |
  | `/post` | 409.7 | 409.9 | 0.2 | 411 | 1.1 |
  | `/post_/$listingId` | 409.7 | 409.8 | 0.1 | 411 | 1.2 |
  | `/privacy` | 212.5 | 212.5 | 0.0 | 213 | 0.5 |
  | `/settings` | 283.3 | 283.3 | 0.0 | 284 | 0.7 |
  | `/terms` | 212.5 | 212.5 | 0.0 | 213 | 0.5 |

  Every page that grew, chunk by chunk (≥ 10 B), against the base:
  - `reader-failure` +47 B on every page that carries it: the typed failure's `detail`.
  - `posting-service` +65 B on `/admin/listings`, `/admin/listings_/$listingId`, `/admin/listings_/$listingId_/edit`, `/admin/screening`, `/my-listings_/$listingId`, `/my-listings_/$listingId_/edit`, `/post` and `/post_/$listingId`: `suggestAliases` through `callRoute` and `routeFailure`.
  - `wizard` +84 B on the four wizard pages: `step-who`'s suggestions notice.
  - `l._slug` +117 B on `/l/$slug`: the similar ads' notice.
  - `import-dialog` +16 B on `/admin/attributes` and `/admin/places`: `reasonOf` reads `failureDetail`.
  - The largest page growth is +0.142 KiB (`/post`).

  Three pages end inside the NEAR band. Their ceilings are raised by DEC-296's local form (§10).
- **premises.** One was wrong: `PROVIDER_ERRORS` held no server error (stop 1, ruled).
  - OPEN (a): the pages whose first read comes from the server (`/`, `/c/$slug`, `/$name`, `/l/$slug`, `/legal/$kind`, `/terms`, `/privacy`) are crawled through a client navigation (`via: "client"`, FCR-1…7 and FCR-20…26). There the loader's read is the browser's and is failed like any other. The server's own first feed page (`readFirstFeedPage`) is not failed by the browser; `docs/features/failure-crawl.md` names this under "It misses".
  - OPEN (b): the crawl's time, measured on this machine at mobile-360 (desktop projects skip it). By lane file, in seconds and tests:

    | Lane file | Seconds | Tests |
    |---|---|---|
    | public | 161.1 | 13 |
    | member-public | 138.3 | 7 |
    | member-account | 132.3 | 8 |
    | member-listings | 457.9 | 5 |
    | admin-catalog | 427.1 | 9 |
    | admin-content | 492.4 | 9 |
    | admin-people | 404.9 | 7 |

    Per audience: visitor 161.1 s (13 pages), member 728.5 s (20), staff 1,324.4 s (25), for a total of 2,213.9 s of lane time. Whole runs: public with member 7.8 min, admin 14.0 min. The split is seven files by area, each under the spec-size rule (`scripts/ci/lane-weights.json`).
  - OPEN (c): as under definition.
- **callee-codes.** Not applicable: no door and no manifest line changes in this lane.
- **gate-reach.** `similar.ts:29`, `posting-service.ts:1129`, `translations-service.ts` (three failures) and `use-translations.ts:398` all inherit their gates: no door, route or policy check changes.
- **user-cases.** Each case maps to tests:

  | Read | Success | Network | Server error | Malformed | Signed out | Languages |
  |---|---|---|---|---|---|---|
  | similar | SIM-1/2 | SIM-3 and SIM-4's Retry case | SIM-3 | SIM-3 | public read (`auth: "none"`) | FCR-4 and FCR-23 (the notice's keys) |
  | suggestAliases | PSR-5's ok path | PSR-5 and SWO-2 | PSR-5 | — | the wizard is signed-in only | the notice's keys |
  | translations service | TRS-1 | TRS-2 | TRS-2 | — | TRS-2 (`signedOut`) | — |
  | usage map | UTU-1 | — | UTU-3 | — | — | — |
  | the detail | RF-11 and RCL-25 | — | — | — | — | — |

  The usage map's deadline is UTU-2. NONE for both languages in unit tests: the words are keys, and FailureNotice's own tests own them.
- **findings.** §13.
- **queued.** `rg "bundle 8|8a|INC-1278|INC-1304|INC-1305|INC-1306|INC-1308|DEC-459"` over the briefs, reports, features and roadmap: DEC-459 (c), INC-1304, INC-1305, INC-1306 and INC-1308 are built here, and INC-1278 in part. DEC-459 (c)'s manifest guard and the per-control tests are left for the supervisor, as the brief says.

## 3. Behaviour contract — answer tables before → after

| Function / screen | Before (70df93185) | After |
|---|---|---|
| `similarListings` | not ok, unparsable or thrown → `{ cards: [], coverLinks: {} }` | not ok → `routeFailure(answer)`; unparsable → `readFailed(…)`; thrown → thrown. Success unchanged. |
| `SimilarAds` | a failed read draws nothing (the section was hidden) | `FailureNotice` line (testid `listing-similar-failed`, `data-similar="failed"`) with Retry. Success and empty unchanged. |
| `suggestAliases` | not ok, or `ok` false → `[]` | not ok → `routeFailure`; `ok:false` → `readFailed(<first refusal's reason>)`. Same route, body, sign-in ("required") and `SAVE_TIMEOUT_MS`. |
| `StepWho` | a failed ask drew no names | `FailureNotice` (testid `post-who-alias-suggestions-failed`, subject `post.who.aliasSuggestions`) with Retry, where the suggestions show |
| translations service (three failures) | `new Error(<words>)` built from the status | `routeFailure(answer)`; the import status codes via `ownValue(IMPORT_STATUS_CODES, …)` |
| `useUsageMap` | `fetch` with no deadline | `fetchWithDeadline(fetch, …)`. Answers are unchanged: keys, or a failure. |
| `readFailed(error, status)` | two arguments | an optional third `detail`, carried as `failure.detail`; message unchanged |
| `routeFailure` | detail dropped unless it is a short code | the message is unchanged; the detail is also carried whole as data |
| `ImportDialog` `reasonOf` | read `answer.detail` | reads `failureDetail(failure)`. The same text reaches the reason line (IRW-3, IRW-9 unchanged and green). |
| `COMPARISON_FLOOR` (DPM-1) | copies ≥ 70 | copies + hook calls ≥ 70 (`floorProblem`) |
| `component-tests` job | one step, `bun run test:unit` | plus "Changed test files, each alone (INC-1306)" after it |

No route, door, status, body key or header changes.

## 4. Censuses

See §2 for each grep's result.
- `rg -n "status" src/test/provider-errors.ts` (stop 1).
- `rg -n "FLOOR\s*=" scripts/conformance`.
- `rg -n "REFUSAL_DETAIL"` across src, e2e and scripts.
- `rg -n "\.detail"` on a typed failure.
- `rg -n 'vi.mock\("@/lib/(route-client|reader-failure)"'`.
- The queued `rg` above.
- The route list from `src/routeTree.gen.ts`, read by CF-CRAWL-1 itself (CFC-1 green).

## 5. Tests

- **Added or changed ids.**
  - FCJ-1…12 (`src/test/failure-crawl.test.ts`, new).
  - CFC-1…5 (`scripts/conformance/failure-crawl.test.ts`, new).
  - CF-ALONE-1…3 (`scripts/conformance/changed-tests.test.ts`, new).
  - DPM-5 (new) and DPM-1 (reads `floorProblem`).
  - PEF-3…5 (new).
  - TCK-1 (asserts the local form of the changed-tests step).
  - RCG-4: re-pointed, the INC set is now one; INC-1304 left.
  - SIM-3: re-pointed, it now asserts the throw where the old one asserted the empty answer.
  - SIM-4: the INC-1305 notice case.
  - PSR-5, SWO-2 and TRS-2 (re-pointed to the typed failure).
  - UTU-1…3 (new file), RF-11, RCL-25.
  - E2E: FCR-1…78 (58 rows), in seven new spec files.
- **Red-first.**
  - FCJ-3 with the silence check disabled (`if (false && …)`): "1 failed | 11 skipped"; restored (`cmp` equal): "1 passed | 11 skipped".
  - Part 2, each source file written from `git show 70df93185:<path>` and its test run, then the file written back from HEAD (tree clean after):
    - SIM-3: 1 failed | 2 passed.
    - similar-ads INC-1305: 1 failed | 3 passed.
    - PSR-5: 1 failed | 6 passed.
    - SWO-2: 1 failed | 3 passed.
    - TRS-2: 1 failed | 12 passed.
    - UTU-1 and UTU-2: 2 failed | 1 passed.
    - RF-11: 1 failed | 36 passed.
    - RCL-25: 1 failed | 29 passed.
  - Each passes on the tree.
- **Laws.** `bunx vitest run scripts --maxWorkers=2` on e27b6173f and again on e2ed49f10's tree: `Test Files 147 passed (147)`, `Tests 821 passed | 1 skipped (822)`. Typecheck exit 0 and ESLint clean on each fix.
- **Each changed test file alone** (`CHANGED_BASE=70df93185… bun scripts/conformance/changed-tests.ts run`): `changed tests alone: 16 test file(s) changed against 70df931855277087581fe4921066bcb64d5b34cd` … `changed tests alone: 16 file(s) in 22.4 s`. Every file passed, 159 tests in all.
- **`bun run checks`** on 97d1ad80c, the last code tree before the ceilings-only commit:
  - Fast line: `checks (fast): 27 PASS · 0 FAIL · 624s`.
  - Last line: `checks: 36 PASS · 0 FAIL · 25 NOT RUN · 690s`.
  - Typecheck and lint PASS inside it.
  - The 25 NOT RUNs, by the runner's own reasons:
    - `scope` (2): the code-tree index lives in the Actions API, only in a GitHub run.
    - `actionlint` and `gitleaks` (2): pinned linux/x64 binaries, and this machine is darwin/arm64.
    - Four install steps: dependencies already installed.
    - `dependency-audit` (2): the advisory service is not reachable from the sandbox.
    - `e2e-preflight` (4): it needs the staging credentials, which the script never holds.
    - `e2e` merge (6): it merges the browser lanes' GitHub artifacts.
    - `promote` (4): only CI promotes.
    - `semgrep` SARIF upload and its warning (2): GitHub only.
  - The bundle step's three NEAR notes led to e27b6173f. After it, `node scripts/check-bundle-size.mjs` exits 0 with no NEAR line, and the laws are green (above).
  - The first run (on 8680b9176) had 2 FAILs, both fixed at the root in 97d1ad80c (§10).
- **Ruling 2, the browse-path guard** (`scripts/check-browse-imports.test.ts`).
  - BPG-1…3: their ids and cases are unchanged, and each now runs both ways. The relative run uses the tree as the working folder and the argument `src`, as CI's step does; the absolute run passes the tree's full path.
  - BPG-4 also runs `src` with the working folder at the repository's root, as CI does.
  - BPG-5…7 are new, each run both ways. An admin route file importing the hook passes; a browse-path route file importing it fails by its path; an admin route file importing the seam beside the hook fails by its path. Their fixtures are three new trees under `scripts/fixtures/browse-imports/`.
  - The ids BPG-5…7 were grepped free first (`rg "BPG-[5-9]"`: none).
  - Red-first on the old guard (ec88bb1f0's script): `Tests 3 failed | 4 passed (7)`.
    - BPG-1 failed: `admin-hook (relative): expected 'Browse-path guard FAILED: 1 file(s) i…' to contain 'Browse-path guard OK'`.
    - BPG-5 failed: `admin-route-hook (relative)`, the same.
    - BPG-4 failed on vitest's 5 s default: its three whole runs take about 6 s each. Its deadline is now `3 * RUN_DEADLINE`, the three runs' own deadline (0710dd3fd).
  - On the fixed guard: `Tests 7 passed (7)`. CI's two steps by hand: `bash scripts/check-browse-imports.sh src` answers OK. On `scripts/fixtures` it exits 1, flagging exactly the five planted bad files.
  - The supervisor's evidence, rerun. The `src` of Lovable 10b part 2's head 7622725bb (`git archive` into `/tmp/ethio-scratch/cursor-bundle-8a/lovable-10b-7622725bb/`):
    - the old guard flags 21 files relative (20 admin-folder files and `src/routes/admin.listings_.$listingId_.edit.tsx`) and 1 absolute (that route file);
    - the fixed guard answers OK both ways.
  - Typecheck exit 0, ESLint clean, prettier clean.
  - Laws: `Test Files 147 passed (147)`, `Tests 824 passed | 1 skipped (825)`. After the deadline fix: the guard's test with `wired.test.ts`, `Tests 12 passed (12)`.
  - `bun run checks` on b1543bbfd: fast line `checks (fast): 27 PASS · 0 FAIL · 642s`, last line `checks: 36 PASS · 0 FAIL · 25 NOT RUN · 709s`. The 25 NOT RUNs have the reasons above. `browse-path-guard › Guard src/` and `› Self-test — guard must reject the bad fixture` PASS.
  - Shellcheck is not installed on this computer, so it did not run on the script.
  - No browser test changed, so no browser run.
- **check-go.** `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8a.md --at 70df93185`: `[check-go] no finding`.
- **Browser** (`bun run e2e:local`, mobile-360, 0 retries; the seven spec files are new, so they ran whole):
  - Admin files: `23 passed (14.0m)`, 2 failed. FCR-70 lacked the `/admin/ rest profiles GET (malformed)` line, and FCR-76 lacked the `/admin/legal/edit rest countries GET` line. Both lines were added; the grep rerun of FCR-70 and FCR-76 gave `2 passed`.
  - Public and member files: `32 passed (7.8m)`, 1 failed. FCR-13 navigated before its start page settled; the harness now always settles it. The grep rerun of FCR-13, FCR-37 and FCR-70 gave `3 passed (45.3s)`.
  - After the split into seven files: the grep run of FCR-13 and FCR-52 gave `2 passed (19.3s)`. After the allowlist moved: FCR-13 gave `1 passed (17.7s)`.
  - desktop-1280, all seven files: `58 skipped` (the crawl sets its own widths in the phone project).
  - After the scratch legal version (e2ed49f10): `--grep "FCR-75 |FCR-32 "` gave `2 passed (1.1m)`. The red-first for this fix is CI run 45889572597 itself: on a fresh backend, both failed with `no legal_versions row where status = published`. ethio-staging holds published versions, so the red cannot show locally.
  - CFC-5 after the CodeQL fix: `5 passed`. A planted wrong `until` on `footer footer.about` gave `1 failed | 4 skipped` (`footer.about: expected false to be true`). The allowlist was written back from HEAD.
  - `[ssr-error]` lines in these runs: 0.
  - CI's lanes and its repeat lane are the full proof.
- **J-audit** (e2e/** changed):
  - Sign-in only through `leaseUser()` and `staff-factor.ts`.
  - Scratch rows only, through `crawl-fixtures.ts` (the harness's makers, removed in `cleanup`).
  - No real row is a fixture since e2ed49f10. Until then, the legal version pages read a real published version, which my self-review missed and CI's fresh backend caught (§10). The two remaining reads are reference rows the migrations seed: the base role `user` and a language open to staff.
  - Every forced server error is a captured body from `PROVIDER_ERRORS`.
  - No `.first()`, no `waitForTimeout` and no `test.only` (`rg` over the diff: none).

## 6. K2 — siblings that bypass the mechanism

- `src/features/posting/pricing-data.ts:212` `FALLBACK_CURRENCY = "ETB"`: a literal currency outside the constants module (K4). Out of scope.
- `src/features/admin-screening/use-screening.ts:403` and `src/features/my-listings/my-listing-page.tsx:258`: `(await loadAttributeOptions(…)) ?? []` turns `loadAttributeOptions`' typed absence back into an empty list. Out of scope.
- `src/features/admin/translations/strings-page.tsx:511`: `usage.data?.[row.key]` without `ownValue`. Out of scope (the strings page).
- `src/features/admin/translations/strings-page.tsx:277`: `?? "en"` on the base language (K4, a sentinel default). Out of scope; its crawl line is `| INC-1278`.
- `src/server/imports/route.ts:125` reads `REFUSAL_DETAIL` on the server. It uses the mechanism, so it is no bypass; listed for completeness.
- Greps: `rg -n "\?\? \[\]" src/features`, `rg -n '"ETB"|"ET"' src`, `rg -n "usage\.data\?\.\[" src`, `rg -n "REFUSAL_DETAIL" src`.

## 7. Allowlists and guards

| Allowlist | Before → after | Change |
|---|---|---|
| `scripts/conformance/failure-crawl-allowlist.txt` | 0 → 76 (new) | 2 `page`, 3 `footer` (`DEC-463`), 7 `default`, 64 `read`; 32 `permanent`, 41 `INC-1278`, 3 `DEC-463`. Every line has its reason (§10 and §13). |
| `scripts/conformance/route-client-allowlist.txt` | 10 → 8 | removed `use-translations.ts … \| 2027-04-24` and `translations-service.ts … \| INC-1304` |
| `scripts/conformance/call-deadline-allowlist.txt` | 2 → 1 | removed `use-translations.ts … \| INC-1304` |
| `scripts/conformance/door-permissions-allowlist.txt` | 80 → 80 | untouched (never-list) |

Guard self-tests run:
- CFC-2 and CFC-3 (a planted route, a planted row).
- FCJ-3 (planted swallow, red-first above).
- DPM-5 (an empty reader, a moved copy).
- CF-ALONE-1 and CF-ALONE-2 (a planted list, a base that cannot be read).
- PEF-3 (planted sources).
- RCG-6 (a planted hand-built failure).
- BPG-1…7, ruling 2: planted fixture trees for the browse-path guard, run both relative and absolute. CI's self-test over `scripts/fixtures` still fails.

`wired.test.ts` names CF-CRAWL-1 and CF-ALONE. It already names the browse-path guard's test by BPG-4, and that line is unchanged.

## 8. Strings

None (FLAG no-new-string). The new notices use existing keys: `adPage.similar.title` and `post.who.aliasSuggestions`, with the failure notice's own words. `bun run i18n:usage` added `/l/$slug` to four keys' page lists in both maps.

## 9. Migrations

None (FLAG no-migration). `bun run db:proof` ran only to start the throwaway local stack for ruling 1's captures: `db:proof PASS — applied 563/563, CLI 2.120.0`.

## 10. Departures

- **Stop 1 and ruling 1.**
  - Ruling 1 widened SCOPE to `src/test/provider-errors.ts` with its test, to `src/test/failure-crawl.test.ts`, and to `posting-service.ts` and `step-who.tsx` with their tests.
  - Q4: `peekAssist` is a designed default (`default … peekAssist | … | permanent`, no code change), and `suggestAliases` draws the notice.
  - Q5: only `reasonOf` reads the detail.
- **Q1, our own routes.**
  - The ruling expected `serverError`'s `{"error":"server error","incident":…}` at 500. With the database container stopped, our routes answered `{"error":"upstream unavailable"}` at 503 (captured; `upstreamUnavailable`, `src/server/supabase/user-client.ts:226`). That is the entry, as the one body both sourced and captured. `serverError` answers only an unexpected throw, which no stopped container produces.
  - The sign-in server's entry is the body auth-js's version header asks for: `{"code":"unexpected_failure","message":…}`. Without the header the server answers `{"code":500,"error_code":…,"msg":…}`.
  - The captures (`/tmp/ethio-scratch/cursor-bundle-8a/capture-1.txt` … `capture-5.txt`, made by `capture.ts`, `capture-signed-v.ts` and `capture-routes.ts` there) ran on images `public.ecr.aws/supabase/gotrue:v2.197.0`, `postgrest:v16.4`, `storage-api:v1.79.36` and `postgres:17.11.0.004` (CLI 2.120.0). Key-shaped strings in them: 0. Raw answers, verbatim:
    - `GET /rest/v1/categories?select=id&limit=1` → `503` `{"code":"PGRST000","details":"could not translate host name \"supabase_db_ethio-ci-local\" to address: Name does not resolve\n","hint":null,"message":"Database connection error."}`
    - `GET /storage/v1/object/public/category-assets/none.webp` → `500` `{"statusCode":"500","error":"Internal","message":"Internal Server Error","code":"InternalError"}`
    - `GET /auth/v1/user` (with auth-js's version header) → `500` `{"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"}`
    - `GET /api/categories/tree` (also `/api/i18n/en`, `/api/feed`, `/api/locations`) → `503` `{"error":"upstream unavailable"}`
- **The allowlist's home.** It is `scripts/conformance/failure-crawl-allowlist.txt`, not under `e2e/`. The format check reads `e2e/**` and has no parser for a `.txt` file (checks run 1's FAIL). The move is declared in `docs/tracking/intentional-deletions.txt` with the `[intentional-delete]` marker. The file was new in this lane, so the range shows no deletion.
- **Mechanical edits a standing guard demanded** (DECIDE-AND-NAME). This is the review's first MINOR: they are outside the brief's named areas.
  - `scripts/e2e-select.ts`: area `failure-crawl` (every spec reachable from an area).
  - `scripts/ci/lane-weights.json`: seven entries (CF-LANES-2).
  - `scripts/ci/turn-checks.ts` with `turn-checks.test.ts`: the pre-push gate runs the new CI step in its local form, with no shallow fetch and `CHANGED_BASE` set to the turn's base. Checks run 1 failed it with an empty base.
  - `door-permissions.test.ts` DPM-5's temp root is removed in a `finally` (PPF-1).
  - `failure-crawl-judge.ts` reads a market code through `isCountryCode` and an id through `UUID_RE` (CF-FMT-1).
  - `failure-crawl.ts` (census) uses the `pattern` tag (CF-PATTERN-4).
  - `crawl-fixtures.ts` has no scratch-prefix literal (CF-HELPERS).
- **The impersonation page.** Its row (FCR-64) became a `page … | INC-1278` line. The crawl cannot hold a session, and on an unheld id the page draws its ended state on every load. It is owed a fixture (§13).
- **The legal editor's fixture.** `/admin/legal/edit` opens `?kind=terms`, the editor's required search.
- **Designed defaults named** (31 `permanent` `default` or `read` lines, each with its reason):

  - `default src/features/posting/pricing-data.ts readGuessCurrency` — the price step's currency preselect, last of its chain (pricing-data.ts:214): a guess that cannot be read falls to the home market's currency, which the seller sees and may change; submit_listing judges the currency sent (INC-1305, a designed default)
  - `default src/features/posting/pricing-data.ts readMarketCurrencies` — the currency picker's short list (pricing-data.ts:273): a failed read leaves the curated rows, and the full list stays one row away ("More currencies…"); nothing is chosen for the seller (INC-1305, a designed default)
  - `default src/features/posting/step-where.tsx readGuess` — the place step's guess (step-where.tsx:226): a guess that cannot be read is no guess, and the seller picks the place (INC-1305, a designed default)
  - `default src/features/posting/attribute-options.ts loadAttributeOptions` — an attribute's options (attribute-options.ts:159): a failed read answers null — the typed absence each caller draws — or the copy an earlier read held; a fresh-only judgement never takes the held copy (INC-1305, a designed default)
  - `default src/features/posting/map/leaflet.ts loadTilePlan` — the map's tile plan (leaflet.ts:97): a refused or broken read draws the map on the known backup host (OSM_PLAN), and the reason is kept for the log (INC-1305, a designed default)
  - `default src/features/posting/map/geocode.ts ask` — the place search and the street lookup (geocode.ts:32): a failed read answers the reason, and the pin dropper says it in its own words (post.pin.geocodeUnavailable, map-pin-dropper.tsx:72) (INC-1305)
  - `default src/features/posting/posting-service.ts peekAssist` — the writing budget's remaining tries (posting-service.ts:965): advisory — a read that cannot say answers null, the screen keeps its own count, and the route decides at the press (INC-1305; ruling 1, Q4)
  - `read /dev/tall rest languages GET` — the language gate list (src/i18n/provider.tsx:150): a failure is logged and retried once, then the base language stands — the gate-list law of rule 10 (Runtime stability)
  - `read * api /api/categories/tree` — the category tree's revalidation, the page-wide store's (src/features/categories/category-tree.ts:520): the root's seeded tree is held and still drawn, so a failed revalidation never empties a screen that had rows (INC-031); asked on some loads only
  - `read /l/$slug api /api/listings/view` — the view counter (src/features/ad-page/count-view.ts:30), a write on load that never disturbs the page
  - `read /dev/tall as member rpc my_legal_status` — the legal gate's read (src/features/legal/use-legal-gate.ts:31-33, :62-65): a failed read sends nobody anywhere and is logged; the doors stay the authority
  - `read /dev/tall as member rpc my_viewing_location` — the account place's read (src/components/app-shell.tsx:523-528, D106): a failed read is logged and this browser's own pick stands
  - `read /my-listings/$listingId rest listing_packages GET` — the preview's level look (src/features/levels/use-level-rows.ts:101-109): a failed level read draws the free look and is logged
  - `read /my-listings/$listingId rpc listing_counts` — the ad's counts (src/features/posting/preview/listing-detail.tsx:661-668): a failed read is said in the page's own words (adPage.counts.unavailable), a line that is not an alert
  - `read /my-listings/$listingId/edit rpc my_listing` — the ad's title in the crumb and the review's share wait (src/components/shell/seller-crumbs.tsx:24-29, src/features/posting/step-review.tsx:252-271): a failed read draws the crumb as "—", still a link to the ad's page, and the share wait stops, logged
  - `read /post rpc my_recent_categories` — the recent categories row (src/features/posting/step-category.tsx:171-181, src/features/posting/posting-service.ts:675-697): a failed read draws no row of recents, and the whole category list stands
  - `read /post/$listingId rpc my_recent_categories` — the recent categories row (src/features/posting/step-category.tsx:171-181, src/features/posting/posting-service.ts:675-697): a failed read draws no row of recents, and the whole category list stands
  - `read /post/$listingId rpc get_posting_schema` — the wizard's question read (src/features/posting/wizard.tsx:572-592): a failure is kept as failed, never an empty list, and the Specifications step reads again and says it there (src/features/posting/step-specifications.tsx:248-253, :1201-1207)
  - `read /l/$slug as member rpc my_seller_line` — the owner's under-review notice (src/routes/l.$slug.tsx:196-208): a failed read is logged and the notice is not drawn; the page never claims "not held"
  - `read /admin/ rest languages GET` — the language gate list (src/i18n/provider.tsx:150): a failure is logged and retried once, then the base language stands — the gate-list law of rule 10 (Runtime stability)
  - `read /admin/ rpc my_legal_status` — the legal gate's read (src/features/legal/use-legal-gate.ts:31-33, :62-65): a failed read sends nobody anywhere and is logged; the doors stay the authority
  - `read /admin/ rpc my_viewing_location` — the account place's read (src/components/app-shell.tsx:523-528, D106): a failed read is logged and this browser's own pick stands
  - `read /admin/listings rest listing_packages GET` — the levels' rows (src/features/levels/use-level-rows.ts:101-109, src/features/admin-listings/listings-page.tsx:136): a failed level read is logged, and a level not known is drawn as not known
  - `read /admin/listings/$listingId rest listing_packages GET` — the levels' rows (src/features/levels/use-level-rows.ts:101-109, src/features/admin-listings/listing-page.tsx:166): a failed level read is logged, and the ad's level is drawn as "Level not known"
  - `read /admin/legal/$versionId rest countries GET` — the market names of the version's list (src/features/admin/legal/legal-version-view.tsx:128, :210): a failed read names each market by its code, the market's own id
  - `read /admin/screening rest listing_packages GET` — the levels' rows (src/features/levels/use-level-rows.ts:101-109, src/features/admin-screening/screening-page.tsx:157): a failed level read is logged, and a level not known is drawn as not known
  - `read /admin/screening rpc admin_name_check_summary` — the names waiting for the name check (src/features/admin-screening/screening-page.tsx:637-645, INC-977): a failed read is said in the page's own words (admin.screening.nameChecks.error), never 0 — a line of text, not an alert
  - `read /admin/translations rest countries GET` — the add-language dialog's market list (src/features/admin/translations/languages-page.tsx:825, :1054-1066): its failure is said in the dialog's picker, with its Retry, where the list is used
  - `read /admin/translations/$lang static /i18n-usage.json` — the strings' usage map (src/features/admin/translations/use-translations.ts:394, src/features/admin/translations/strings-page.tsx:511, :833-834): a failed read is said in the row editor's own words (admin.translations.editor.usedOnUnknown); the page stands
  - `read /admin/users/$userId rpc admin_list_languages` — the translator card's languages (src/features/admin/translations/translator-card.tsx:65, :80-86, :130-133): its failure is said in the card's picker, with its Retry, where the list is used
  - `read /admin/legal/edit rest countries GET` — the document's market name in the editor's title (src/features/admin/legal/legal-editor-form.tsx:58, :93): a failed read names the market by its code, the market's own id

- **Desktop lane weights.** Not measured: the crawl skips desktop projects, and the list reporter prints no time for a skipped test.
- **`import-dialog.test.tsx`.** Named in SCOPE but unchanged. Its IRW-3 and IRW-9 already prove the detail reaches the reason line through the typed failure. This is the review's second MINOR.
- **Ceilings** (e27b6173f, DEC-296's local form, each cause on its line):
  - `/l/$slug` 254 → 255.
  - `/admin/screening` 358 → 359.
  - `/admin/legal_/$versionId` 289 → 290. It grew only +0.022 KiB, but every page moved and INC-1031 raises every page left in the band.
- **Gate fixes** (97d1ad80c): the allowlist move and the turn-checks local form, both from checks run 1's two FAILs.
- **A second push** (the brief asks for ONE, DEC-414). The first push's CI had two causes of mine, each fixed in its own commit and pushed together (§11):
  - 0774f0ff2: CFC-5 reads the footer lines as text, not a pattern built from a key (CodeQL).
  - e2ed49f10: the crawl's legal version is a scratch row (`legal_documents` of a scratch kind, `^e2e-[a-z0-9-]{1,40}$` by the table's check, and its published version). They are made on first use and removed in `cleanup` with any acceptances and notices, as `e2e/legal-history.spec.ts` does. This replaced a read of a real published version, which a fresh backend does not hold.
- **Ruling 2** (`docs/governance/briefs/cursor-bundle-8a-ruling-2.md`, sha256 a623e362…, saved by scripted copy). Its first message carried no sha256. That was a STOP, answered in the chat by the carrier and its `expected.txt`.
  - Decisions 1–3: the guard and its tests (b1543bbfd, 0710dd3fd; §5). CI's step is unchanged.
  - Decision 4: the repeat proof is accepted as capped. INC-1311 is named in §13.
  - Decision 5: the captured 503 `{"error":"upstream unavailable"}` is the entry, as Q1 above says. Nothing changed.
  - Decision 6: INC-1312 and INC-1313 are numbered findings (§13), and nothing changed for them in this lane. The INC-1278 lines stay.
  - Decision 7: one push (0710dd3fd), the guard fix only, then this report, records only.
  - One departure, the review's MINOR: the guard's `is_admin_folder` is now named `admits_hook`, since it admits the admin route files too. Nothing else in the guard changed but `from_src` and the `src/`-anchored patterns the ruling asks for.
  - The guard's two feature docs say the same (`docs/features/ci-guards.md` §browse-path-guard, `docs/features/rbac-client-seam.md`). They fall under the standing allowance.

## 11. CI

- **The base.** `Commit: 70df931855277087581fe4921066bcb64d5b34cd (short 70df931)` · `Conclusion: SUCCESS` · `Completed (UTC): 2026-11-26T17:18:18Z` · run 45859549094. The two-step SHA check: ci-status names the base, which equals `origin/dev` at the push (`git rev-parse origin/dev` = 70df93185). There was no red from an earlier turn.
- **The first push (e27b6173f, run 45889572597; the failure file names its merge commit 12a7535).** 38 pass, 5 fail, 2 skipping.
  - `CodeQL`, class (e): one new high alert, "Incomplete string escaping or encoding" at `scripts/conformance/failure-crawl.test.ts:109` (CFC-5 built a pattern from a footer key, escaping dots only). Fixed in 0774f0ff2.
  - `E2E lanes / Lane 2` (FCR-75), `Lane 15` (FCR-32) and `Lane repeat` (FCR-75), class (e): `[e2e:crawl] no legal_versions row where status = published` at `e2e/helpers/crawl-fixtures.ts:40`. The fixture read a real published version, and CI's temporary backend holds none. Fixed in e2ed49f10.
  - The repeat lane's global timeout (913 s) was the cap DEC-283 tolerates ("capped"). The lane was red for the failed repetition only.
  - `E2E (Playwright, ethio-staging)`: the merged verdict over those lanes. Nothing else failed: `Passed: 2705 · Skipped: 551 · Failed: 3`; server-error census 0 off the allowlist; accessibility serious=0 critical=0.
  - No re-run.
- **CI's own crawl times** (the first run's timing, summed over the shard and the repeat lane): admin-content 16.3 min, admin-catalog 14.3, member-listings 7.4, admin-people 7.3, public 2.5, member-public 1.9, member-account 1.5. The slowest test was FCR-41 at 281.6 s. The lanes that ran the crawl took 7.7–16.1 min; shard 11, the slowest at 25.8 min, ran no crawl file.
- **The second push (e2ed49f10, run 45894289368):** `gh pr checks 114` shows 43 pass and 2 skipping: `Promote to main` runs on `dev` only, and the `Lovable branch guard` on Lovable's branches only. CodeQL passes.
  - The branch's `ci-status.md`: `Commit: e2ed49f107609f4073294854e9dffbec61a2ad84 (short e2ed49f)` · `Conclusion: SUCCESS` · `Completed (UTC): 2026-11-26T21:24:07Z` · run 45894289368. That equals the last code commit (two-step check).
  - The repeat lane passed capped. Its evidence: `Repeat: 38 of 58 tests repeated — specs directly changed 5/7 …; budget 793 s; the time cap left 76 test runs`.
- **Ruling 2's push (0710dd3fd, run 45902809507):** `gh pr checks 114` shows 43 pass and 2 skipping, the same two as above. CodeQL passes. `gh pr checks 114 --watch` exited 0.
  - The branch's `ci-status.md`: `Commit: 0710dd3fdafef205beb694bf25de68551e837137 (short 0710dd3)` · `Conclusion: SUCCESS` · `Completed (UTC): 2026-11-26T22:38:45Z` · run 45902809507. That equals the last code commit and the branch's head at the push (two-step check). Its lanes line: `ran — no proven code tree`, so every lane ran on this tree.
  - The repeat lane passed capped. Its job log shows the same five crawl files (`REPEAT_TESTS: 58`, `REPEAT_PARALLEL_TESTS: 38`, `REPEAT_BUDGET_SECONDS: 793`), then `repeat-cap: capped` and `0 failed` steps. The job log does not print how many runs the cap left; I read no count and state none. Ruling 2 accepts this (INC-1311).
  - No re-run. The guard's two steps ran in the check `Browse-path guard (no RBAC seam on the marketplace path, with self-test)`, which passed in 10 s.

## 12. Limits

- WebKit, the merged tree's first download and the lanes' real time are CI's and the supervisor's.
- After the split into seven files and the allowlist's move, I reran only FCR-13 and FCR-52 locally, by grep. Every other row last ran whole before the split, with the same rows, judge and allowlist lines, and the same tests now declared per file. CI's lanes run them all.
- I measured desktop time for no lane.
- Repeatability is proven only in part. The repeat lane's 793 s budget held 5 of the 7 changed crawl files, and its cap left 76 test runs unrun. The crawl's long tests (FCR-41 at 281.6 s) do not fit DEC-283's budget. Ruling 2 accepts the capped proof, and INC-1311 (Cursor 8c) owns it (§13).
- No log was left unread that this report states a count for.

## 13. Findings

- **INC-1278, in part: the crawl's reported silent defaults and wrong verdicts.** These are 41 allowlist lines `| INC-1278`, each with its file and line. They are not fixed in this lane; each is retired by its own turn.

  - `page /admin/impersonation/$sessionId` — the crawl holds no impersonation session (begin_impersonation asks a staff step-up and a target), and on an id no session holds the page draws its ended state on every load, so neither its load nor its reads' failures can be judged — the page is owed a fixture that opens a session, reported
  - `read /l/$slug api /api/locations/:country` — the market's place tree (src/features/posting/preview/listing-detail.tsx:318-331): a failed read drops the ad's place names from the page and the screen says nothing — a silent default, reported
  - `read /$name serverFn e4f5c6e473dc55fc3fceee1eb9eb72d87a0533c73d1949c6ae91e94d7913a39c (malformed)` — the seller page's existence check (src/routes/$name.tsx:36): an answer that does not read as one draws "This seller was not found." — a wrong verdict, reported; its network failure draws the page-failed answer
  - `read /dev/tall rpc get_entity_bundle` — the entity names bundle (src/i18n/provider.tsx:394, src/i18n/bundle.ts:94): a failed read leaves every name in the base language and the screen says nothing — a silent default, reported
  - `read /dev/tall as member rpc get_my_permissions` — the shell's permission read (src/features/permissions/usePermissions.ts:60, src/components/app-shell.tsx:771): a failed read is drawn as the regular tier, and the screen says nothing — a silent default, reported
  - `read /dev/tall as member rest profiles GET (malformed)` — the account's language and status reads (src/features/auth/preferred-language.ts:74, src/features/auth/account-status.ts:43-44): an answer of the wrong shape reads as nothing stored — a silent default, reported
  - `read /account as member rpc my_listings` — the account overview's counts (src/features/account/account-overview.tsx:87-98): a failed read rejects the page's Promise.all uncaught, so the page stays at its loading line and the error is unhandled — reported
  - `read /l/$slug as member rpc listing_viewer_state` — the viewer's state (src/features/ad-page/use-saved-state.ts:38-39): an unknown answer is drawn as "not the owner", and the screen says nothing — a silent default, reported
  - `read /my-listings/$listingId rpc sold_visible_days` — the sold ad's shown days (src/features/my-listings/my-listing-page.tsx:222, :410-413): a failed read falls to SOLD_SHOWN_DAYS for an ad not sold and drops a sold ad's visibility line, and the screen says nothing — a silent default, reported
  - `read /my-listings/$listingId rpc my_seller_line` — the seller's public line in the preview (src/features/my-listings/my-listing-page.tsx:273-276, :736-738): a failed read is drawn as no previous name, no member-since date and not under review — a silent default, reported
  - `read /my-listings/$listingId rpc get_posting_schema` — the ad's questions in the preview (src/features/posting/posting-service.ts:916-924, src/features/my-listings/my-listing-page.tsx:249-250): a failed read answers no schema and the preview draws the ad without its answers — a silent default, reported
  - `read /my-listings/$listingId api /api/locations/:country` — the market's place tree (src/features/posting/preview/listing-detail.tsx:318-331): a failed read drops the ad's place names from the preview and the screen says nothing — a silent default, reported
  - `read /my-listings/$listingId/edit rpc my_seller_line` — the seller's line on the review (src/features/posting/step-review.tsx:294-301): a failed read is logged and the line shows the name alone, and the screen says nothing — a silent default, reported
  - `read /my-listings/$listingId/edit rpc get_posting_schema` — the ad's answers on the review (src/features/posting/step-review.tsx:315-317): a failed read is drawn as a category with no questions, and the screen says nothing — a silent default, reported
  - `read /my-listings/$listingId/edit api /api/locations/:country` — the market's place tree in the review's preview (src/features/posting/listing-preview.tsx:107-123): a failed read drops the ad's place names, and the screen says nothing — a silent default, reported
  - `read /my-listings/$listingId/edit rest locations GET` — the item place's country (src/features/posting/posting-service.ts:573-584, src/features/posting/wizard.tsx:359-363): a failed read answers no country and the contact step falls back to home ▸ market — a silent default on a geography path, reported
  - `read /post/$listingId rest locations GET` — the item place's country (src/features/posting/posting-service.ts:573-584, src/features/posting/wizard.tsx:359-363): a failed read answers no country and the contact step falls back to home ▸ market — a silent default on a geography path, reported
  - `read /my-listings/$listingId/edit rest listings GET (malformed)` — the draft read of the edit (src/features/posting/use-edit-draft.ts:242-262, src/features/posting/posting-service.ts:396-403): an answer of the wrong shape is drawn as an ad with empty fields and the fixed price mode, and the screen says nothing — a silent default, reported
  - `read /post/$listingId rest listings GET (malformed)` — the draft read before the wizard (src/routes/post_.$listingId.tsx:33-36, src/features/posting/posting-service.ts:396-403): an answer of the wrong shape reads as an ad that may not be resumed and sends the seller to the ad's page — a wrong verdict, reported
  - `read /settings auth user (malformed)` — the address an e-mail change waits on (src/features/auth/auth-service.ts:408-411): an answer of the wrong shape reads as "nothing waits", and the screen says nothing — a silent default, reported
  - `read /admin/ rpc get_entity_bundle` — the entity names bundle (src/i18n/provider.tsx:394, src/i18n/bundle.ts:94): a failed read leaves every name in the base language and the screen says nothing — a silent default, reported
  - `read /admin/ rpc get_my_permissions` — the shell's permission read (src/features/permissions/usePermissions.ts:60, src/components/app-shell.tsx:771): a failed read is drawn as the regular tier, the console's staff member lands on the public listings, and the screen says nothing — a silent default, reported
  - `read /admin/ rpc get_active_impersonation` — the impersonation banner (src/features/admin/impersonation/impersonation-banner.tsx:25): a failed read draws no banner, and the screen says nothing — a silent default, reported
  - `read /admin/ rpc legal_review_overdue` — the menu's legal-review alert (src/features/admin/nav-alerts.ts:42): a failed read draws no alert, and the screen says nothing — a silent default, reported
  - `read /admin/attributes rpc admin_list_categories` — the category roster (src/features/admin-attributes/attributes-page.tsx:99-100, :129, :214-219): its failure is said while a category filter is on; unfiltered, the filter's list is drawn empty and the screen says nothing — a silent default, reported
  - `read /admin/audit rpc admin_audit_stats (malformed)` — the audit's counts (src/features/admin/audit/audit-service.ts:105-109, src/features/admin/audit/audit-page.tsx:164-171): an answer of the wrong shape is drawn as zero events, and the screen says nothing — a silent default, reported
  - `read /admin/categories rest countries GET` — the category editors' market list (src/features/admin-categories/categories-page.tsx:208, :1205, :1229): a failed read hands the editors no market, and the screen says nothing — a silent default, reported
  - `read /admin/listings/$listingId rpc get_posting_schema` — the ad's questions as buyers see it (src/features/admin-screening/use-screening.ts:386, src/features/admin-listings/listing-page.tsx:163, :586-587): a failed read draws the ad without its answers, and the screen says nothing — a silent default, reported
  - `read /admin/listings/$listingId api /api/locations/:country` — the market's place tree (src/features/posting/preview/listing-detail.tsx:318-331): a failed read drops the ad's place names from the preview and the screen says nothing — a silent default, reported
  - `read /admin/listings/$listingId/edit rpc get_posting_schema` — the ad's answers on the review (src/features/posting/step-review.tsx:315-317): a failed read is drawn as a category with no questions, and the screen says nothing — a silent default, reported
  - `read /admin/listings/$listingId/edit api /api/locations/:country` — the market's place tree in the review's preview (src/features/posting/listing-preview.tsx:107-123): a failed read drops the ad's place names, and the screen says nothing — a silent default, reported
  - `read /admin/listings/$listingId/edit rest locations GET` — the item place's country (src/features/posting/posting-service.ts:573-584, src/features/posting/wizard.tsx:359-363): a failed read answers no country and the contact step falls back to home ▸ market — a silent default on a geography path, reported
  - `read /admin/listings/$listingId/edit rpc admin_listing_detail (malformed)` — the staff draft read of the edit (src/features/posting/use-edit-draft.ts:138, src/features/admin-listings/use-admin-listing.ts:112, :178-182): an answer of the wrong shape is drawn as an ad with empty fields, and the screen says nothing — a silent default, reported
  - `read /admin/translations rpc admin_entity_translation_stats` — the data coverage column (src/features/admin/translations/languages-page.tsx:120-123): a failed read drops each language's data coverage, and the screen says nothing — a silent default, reported
  - `read /admin/translations/$lang rpc admin_entity_translation_stats` — the data coverage line (src/features/admin/translations/strings-page.tsx:123, :274): a failed read drops the content count, and the screen says nothing — a silent default, reported
  - `read /admin/translations/$lang rpc admin_list_languages` — the language roster (src/features/admin/translations/strings-page.tsx:120, :252-256, :277): a failed read draws the language by its code and takes "en" for the base language, and the screen says nothing — a silent default, reported
  - `read /admin/users rpc admin_list_roles` — the role filter's options (src/features/admin/users/users-list.tsx:92-93): a failed read draws the filter with no roles, and the screen says nothing — a silent default, reported
  - `read /admin/users/$userId rpc admin_list_roles` — the roles staff may assign (src/features/admin/users/user-detail.tsx:57, :118): a failed read offers no role, and the screen says nothing — a silent default, reported
  - `read /admin/users/$userId rest countries GET` — the home-country picker (src/features/admin/users/user-detail.tsx:473, :658): a failed read offers no country, and the screen says nothing — a silent default, reported
  - `read /admin/users/$userId rpc admin_get_user (malformed)` — the user's detail read (src/features/admin/users/admin-users-service.ts:105-109): an answer of the wrong shape reads as no such user, and the page says "This user does not exist." — a silent default, reported
  - `read /admin/ rest profiles GET (malformed)` — the account's language and status reads (src/features/auth/preferred-language.ts:74, src/features/auth/account-status.ts:43-44): an answer of the wrong shape reads as nothing stored — a silent default, reported

- **INC-1309 (fixed here, ruling 2): the browse-path guard judged the path's form.** Its admin exceptions needed a character before `src`, so CI's relative run refused the admin folders' hook imports, and no admin route file but `src/routes/admin.tsx` was admitted. Fixed in b1543bbfd (§5, §10).
- **INC-1311 (owner Cursor 8c): the long crawl tests are never repeated.** A crawl test longer than the repeat budget's share is left by the cap: run 45894289368's repeat lane passed capped, with 76 test runs left, and FCR-41 took 281.6 s. Until 8c fits each crawl test to the budget, the nightly and the flake ledger watch them (ruling 2, decision 4).
- **An auth 500 read as signed out (INC-1312, owner Cursor 8b, fix 1).** `src/server/supabase/user-client.ts:93–108`: an auth server 500 (`unexpected_failure`, an `AuthApiError`, not retryable) answers `reason: "notSignedIn"`. A caller whose sign-in server failed is told they are signed out, not that it was unreachable. A wrong class on an identity path; it fails closed, so it is not a hole.
- **Two names for one state (INC-1312's sibling).** "signedOut" (the route client's kind) and "notSignedIn" (the gate code) both exist: `src/lib/refusal.ts:177` maps one to the other, and `translations-service.ts:404` holds its own constant. Two names invite a third.
- **The next long-detail reader** (ruling 1, Q5). When a second screen needs a long route detail in a sentence, the reading of `failureDetail` moves into the one refusal reader (`src/lib/refusal.ts`) at that turn. The register should carry it.
- **The edit wizard's malformed draft.** A draft answer of the wrong shape is drawn as an ad with empty fields (`use-edit-draft.ts:242–262`, `posting-service.ts:396–403`; crawl lines above).
- **A whole-module mock hides the typed failure (INC-1313, owner Cursor 8c).** `src/features/feed/use-feed.test.ts:17` mocks `@/lib/route-client` as `{ callRoute }` only, while `use-feed.ts:42` throws `await routeFailure(answer)`. UFS-7's 500 case (`use-feed.test.ts:213–216`) therefore meets the mock's own error (the mocked module has no `routeFailure`) and passes on `error` not being null: it never proves the typed failure. Out of scope (the feed); the fix is spreading `importOriginal` as five siblings do.
- **The impersonation page** (`/admin/impersonation/$sessionId`) is owed a fixture that opens a session, so the crawl can judge it.
- **K2 items:** §6.
- **Not a finding.** `step-photos.tsx:262` (Cursor 7b's F3) reads an upload's answer, a write, so it is outside a read-on-load crawl.

## 14. Records

- INC — INC-1305 fixed (Cursor bundle 8a): the similar ads' read and the alias suggestions throw the route client's one typed failure, and their screens draw the failure notice with Retry (`similar.ts`, `similar-ads.tsx`, `posting-service.ts` `suggestAliases`, `step-who.tsx`). `peekAssist` and the reads of `pricing-data.ts`, `step-where.tsx`, `attribute-options.ts`, `map/leaflet.ts` and `map/geocode.ts` are designed defaults, each a `default` line of the crawl's allowlist with its reason.
- INC — INC-1304 fixed (Cursor bundle 8a): the translations service's three failures go through `routeFailure`, and `/i18n-usage.json` is read through `fetchWithDeadline`. The route-client allowlist loses two lines and the call-deadline allowlist one.
- INC — INC-1306's guard built (Cursor bundle 8a): the component job's step "Changed test files, each alone (INC-1306)" runs every test file a push changes in its own process, against the pull request's base or dev's previous head. A base that cannot be read fails loudly (`scripts/conformance/changed-tests.ts`, CF-ALONE-1…3).
- INC — INC-1278 in part (Cursor bundle 8a): the failure crawl forces every page's reads to fail. Its allowlist holds 41 `| INC-1278` lines (40 reads and the impersonation page), each a silent default or wrong verdict with its file and line, listed in the report's §13.
- INC — INC-1308 (the supervisor's record) — a census floor that its own allowlist's planned retirement breaks. `scripts/conformance/door-permissions.test.ts` requires at least 70 permission comparisons (`COMPARISON_FLOOR`) and counts only the copies (`permissionComparisons` skips the hook's file), so moving the comparisons allowlisted `until INC-1281` onto `useMayCall` — the planned work of Lovable 10b part 2 — fails DPM-1 though nothing is wrong. Evidence: the supervisor's reading of the census at 70df93185. Class: concern "a census floor proves its reader and never counts down with the work its allowlist plans"; mechanism the census kit's floors; fixed in Cursor bundle 8a, fix 3.
- INC — INC-1309 (the supervisor's record) — the browse-path guard's admin exception matched only absolute paths, and CI runs it on a relative one. `scripts/check-browse-imports.sh` admits the hook from admin folders by patterns that need a character before `src`; its tests passed absolute paths, CI's step passes `src`; and it admitted no admin route file but `src/routes/admin.tsx`. Evidence: the supervisor's gate on Lovable 10b part 2's head `7622725bb` (20 admin-folder files flagged on the relative run, 1 admin route file on both). Class: concern 'a guard is proven on the input form CI gives it'; mechanism the browse-path guard; fixed in Cursor bundle 8a, ruling 2.
- INC — INC-1311 (the supervisor's record) — a crawl test longer than the repeat budget's share is never repeated by the repeat lane. Evidence: run 45894289368's repeat lane passed capped, 76 test runs left by the cap; FCR-41 took 281.6 s. Class: concern 'every changed test is proven repeatable'; mechanism the repeat lane (DEC-283, `scripts/ci/repeat-cap.ts`); owner Cursor 8c (each crawl test fits the budget). Until then the nightly and the flake ledger watch them.
- INC — INC-1312 (the supervisor's record) — an auth server failure is read as signed out. `src/server/supabase/user-client.ts` answers an auth 500 (`unexpected_failure`) with `reason: \"notSignedIn\"`, so a caller whose sign-in server failed is told they are signed out; it fails closed. Sibling: two names for the signed-out state (`signedOut`, `notSignedIn`; `src/lib/refusal.ts`, `translations-service.ts`). Evidence: Cursor bundle 8a's capture with the stack's auth server failing. Class: concern 'a failure is never read as signed out' (CF-SESSION-1's server side); mechanism the user client; owner Cursor 8b, fix 1.
- INC — INC-1313 (the supervisor's record) — a whole-module mock hides the typed failure. `src/features/feed/use-feed.test.ts` mocks `@/lib/route-client` with `callRoute` only, so UFS-7's 500 case meets the mock's own error and never proves the route client's typed failure. Class: concern 'a test proves the mechanism it names'; mechanism the route client's test mocks (spread `importOriginal`, the form other route-client mocks use); owner Cursor 8c.
- DEC — DEC-481 (the supervisor's, G17) — Cursor 8a takes INC-1306's guard and Cursor 8b takes INC-1295. Why: INC-1295 changes how the generated word maps and the page limits are committed, while Lovable 10b part 2 changes those same files beside 8a; in 8b no Lovable lane is open. Amends DEC-479's composition of 8a and 8b; the order of the lanes is unchanged.
- INC — (my proposal, now INC-1312 by ruling 2, whose record above replaces it) an auth server's 500 is read as signed out: `src/server/supabase/user-client.ts:93–108` answers `notSignedIn` for an `AuthApiError` at 500, so a caller whose sign-in server failed is told they are signed out. Evidence: the capture of `GET /auth/v1/user` at 500 (Cursor bundle 8a, ruling 1 Q1). Class: concern "a failure is read as its kind"; mechanism the route boundary's caller read.
- register row — a page meets its failures → the failure crawl (`e2e/helpers/failure-crawl.ts`, `e2e/helpers/failure-crawl-judge.ts`, `e2e/helpers/crawl-pages.ts`, `e2e/failure-crawl-*.spec.ts`) → guard: the page-coverage census `scripts/conformance/failure-crawl.ts` (CF-CRAWL-1, CFC-1…5) and the judge's tests (`src/test/failure-crawl.test.ts`, FCJ-1…12) → exceptions: `scripts/conformance/failure-crawl-allowlist.txt`.
- register row — the route client's row gains: carries the route's detail as data (`ReaderFailure.detail`, read through `failureDetail`; RF-11, RCL-25).
- register row — the census kit's row gains: a floor proves the reader (`floorProblem` over the copies and the hook's calls; DPM-5).
- register row — the component job's row gains: changed test files alone (`scripts/conformance/changed-tests.ts`; CF-ALONE-1…3).
- changelog — Cursor bundle 8a: the failure crawl opens every page for each audience at 360, 768 and 1280 px, fails each read it makes (a dropped network, the provider's captured server error, a malformed first answer) and requires the failure notice or a named default (DEC-459 (c)). The similar ads and the alias suggestions show their failure with Retry (INC-1305). The translations console's failures are the one typed failure, and its usage map is read under a deadline (INC-1304). The typed failure carries the route's detail. The permission census's floor proves its reader (INC-1308). Each changed test file runs alone in CI (INC-1306).
- roadmap — none dictated by the brief.
- slip — none.
- Note — S810 is the supervisor's (ruling 1).
- Note — S813 is the supervisor's (ruling 2). The four records of ruling 2 above are copied by script from its decision 7, without their quotes. INC-1312's `\"notSignedIn\"` keeps the ruling's characters as written.
