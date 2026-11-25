# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45637439372
- Commit: `2ad83f58f64a386f1392053ae14ce614d8110f1c`
- Attempt: 1
- Written (UTC): 2026-11-25T15:16:11.740Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+      "/admin/translations/$lang",
+      "/admin/users",
+      "/admin/users/$userId",
+      "/c/$slug",
+      "/dev/primitives",
+      "/dev/style",
+      "/legal/$kind",
+      "/legal/accept",
+      "/legal/publishing",
+      "/my-listings",
+      "/my-listings/$listingId",
+      "/my-listings/$listingId/edit",
+      "/post",
+      "/post/$listingId",
+      "/privacy",
+      "/terms"
+    ],
+    "failure.showMore": [
+      "/",
+      "/$name",
+      "/c/$slug"
+    ],
+    "feed.emptyTitle": [
       "/",
       "/c/$slug"
     ],
@@ -4850,6 +4996,7 @@
       "/terms"
     ],
     "legal.kind.publishing": [
+      "/legal/$kind",
       "/legal/publishing"
     ],
     "legal.kind.terms": [
@@ -8217,8 +8364,6 @@
       "/dev/primitives"
     ],
     "prim.state.error": [
-      "/admin/audit",
-      "/admin/impersonation/$sessionId",
       "/dev/primitives"
     ],
     "prim.state.loading": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/b42b1ffc-e58a-423f-ba9e-1cbb86694273' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/ethio-marketplace/ethio-marketplace
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes

```

## Component tests — failure

### Evidence lines

```text
[90mstderr[2m | src/components/shell/data-table.test.tsx[2m > [22m[2mDataTable C7 contract[2m > [22m[2mDTK-12 a failed read never recovers as an empty past-end page
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 716[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2217[2mms[22m[39m
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mRFL-2 a flag read-back that fails answers flagged null with flagRead failed, logged — never 0, the writes reported
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 21; without failed: 0
 [31m❯[39m scripts/conformance/refusal-readers.test.ts [2m([22m[2m9 tests[22m[2m | [22m[31m2 failed[39m[2m)[22m[33m 4320[2mms[22m[39m
[31m     [31m×[31m CFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand[39m[32m 176[2mms[22m[39m
     [32m✓[39m CFRR-9 the census names a failed call's raw error re-thrown inline or at the end of its block, and passes a typed failure, another condition, a catch and the server side[32m 1[2mms[22m[39m
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1199[2mms[22m[39m
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/features/admin-listings/listing-photos.test.tsx[2m > [22m[2mLPH-U2 a failed photo read says failure and Retry refetches that query; a successful empty read stays null
[22m[39mfailure-notice listing-photos-failed server (reader pending)
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[90mstderr[2m | src/features/categories/category-tree.test.ts[2m > [22m[2mthe page's held category tree[2m > [22m[2mCTR-U1 (DEC-464) a failed read keeps its error, and retry asks for the tree again
[22m[39m[feed] first page failed Error: feedFailed
[22m[39mfailure-notice rail-categories-failed server (reader pending)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 3ce624e5-0c4a-4cf1-b737-e74f92483933] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 03273c6a-7db8-4ba4-a6a2-dd9e55cc0c0f] Error: feed_page returned no page
[90mstderr[2m | src/features/admin-screening/name-checks.test.tsx[2m > [22m[2mNCQ-U the queue section[2m > [22m[2mNCQ-U3 a failed read shows the error, never 'none'
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[22m[39m[save-error] unsave_listing Error: transport
[90mstderr[2m | src/features/admin-ai/ai-calls.test.tsx[2m > [22m[2mAI call consumer[2m > [22m[2mACR-4 a failed read remains an error with retry, never an empty success
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 340[2mms[22m[39m
 [31m❯[39m scripts/conformance/provider-errors.test.ts [2m([22m[2m2 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 2895[2mms[22m[39m
[22m[39m[ssr-error] /api/seller [incident 33970e11-d63f-40d3-9855-9fd7be63c5b1] Error: seller_feed_page returned no page
[90mstderr[2m | src/features/admin-ai/ai-spend-days.test.tsx[2m > [22m[2mAiSpendDays (bundle 13 turn 14)[2m > [22m[2mAID-6 a failed read says so with a retry and shows no numbers (F4)
[22m[39mfailure-notice history-failed server (reader pending)
[22m[39mfailure-notice history-failed malformed
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 319[2mms[22m[39m
[22m[39m[categories] picture step failed: persist permissionDenied
[22m[39m[categories] picture step failed: upload storage upload failed: x
[categories] picture step failed: model-call network error
[categories] picture step failed: model-call route returned no image
[categories] picture step failed: client-timeout client-timeout
[22m[39m[categories] picture step failed: persist someCode:a, b
[90mstderr[2m | src/components/marketplace/feed.test.tsx[2m > [22m[2mthe feed's retry after a failed category lookup (INC-1140)[2m > [22m[2mFD-U1 the category-failed retry button calls refreshPage and no reload of its own
[22m[39mfailure-notice feed-category-failed server (reader pending)
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 305[2mms[22m[39m
[90mstderr[2m | src/features/posting/step-specifications-retry.test.tsx[2m > [22m[2mSPR-U1 Retry on a failed schema read asks for the schema again
```

### Tail (last 60 lines)

```text
[36m [2m❯[22m fail scripts/conformance/kit.ts:[2m109:15[22m[39m
[2m Test Files [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m616 passed[39m[22m[90m (618)[39m
    [90m107|[39m       [35mconst[39m line [33m=[39m index [33m+[39m [34m1[39m[33m;[39m
    [90m108|[39m       [35mconst[39m fail [33m=[39m (message[33m:[39m string)[33m:[39m never [33m=>[39m {
    [90m109|[39m         [35mthrow[39m [35mnew[39m [33mError[39m([32m`[39m[36m${[39mpath[36m}[39m[32m:[39m[36m${[39mline[36m}[39m[32m [39m[36m${[39mmessage[36m}[39m[32m: [39m[36m${[39mtext[36m}[39m[32m`[39m)[33m;[39m
    [90m   |[39m               [31m^[39m
    [90m110|[39m       }[33m;[39m
    [90m111|[39m       if (cells.length !== 3 || cells.some((cell) => !cell)) fail("exp…
[90m [2m❯[22m scripts/conformance/kit.ts:[2m120:27[22m[39m
[90m [2m❯[22m readAllowlist scripts/conformance/kit.ts:[2m104:6[22m[39m
[90m [2m❯[22m scripts/conformance/refusal-readers.test.ts:[2m175:23[22m[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯[22m[39m

[2m      Tests [22m [1m[31m3 failed[39m[22m[2m | [22m[1m[32m4075 passed[39m[22m[90m (4078)[39m
[2m   Start at [22m 14:45:19
[2m   Duration [22m 344.93s[2m (transform 13.15s, setup 223.80s, import 104.88s, tests 236.42s, environment 384.65s)[22m


##[error]Error: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/provider-errors-allowlist.txt:3 stale allowance: src/features/ad-page/report.test.ts:60 | an outage text: the failure reads as the generic word and no reader draws its words ("scratch failure") | INC-1278
 ❯ fail scripts/conformance/kit.ts:109:15
 ❯ scripts/conformance/kit.ts:120:27
 ❯ readAllowlist scripts/conformance/kit.ts:104:6
 ❯ scripts/conformance/provider-errors.test.ts:50:23



##[error]Error: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/refusal-readers-allowlist.txt:11 stale allowance: src/features/admin-listings/listing-settings.tsx:101 | a read that re-throws its raw error; the typed-results work (ACT-027) moves it onto readFailed(error) | INC-1256
 ❯ fail scripts/conformance/kit.ts:109:15
 ❯ scripts/conformance/kit.ts:120:27
 ❯ readAllowlist scripts/conformance/kit.ts:104:6
 ❯ scripts/conformance/refusal-readers.test.ts:70:23



##[error]Error: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/refusal-readers-allowlist.txt:11 stale allowance: src/features/admin-listings/listing-settings.tsx:101 | a read that re-throws its raw error; the typed-results work (ACT-027) moves it onto readFailed(error) | INC-1256
 ❯ fail scripts/conformance/kit.ts:109:15
 ❯ scripts/conformance/kit.ts:120:27
 ❯ readAllowlist scripts/conformance/kit.ts:104:6
 ❯ scripts/conformance/refusal-readers.test.ts:175:23


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/c733c020-6f42-48ca-899d-4d4a55dca101' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/ethio-marketplace/ethio-marketplace
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes

```

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
dist/client/assets/use-retry-failed-2jKI0SXq.js                    0.30 kB │ gzip:   0.24 kB
node_modules/.nitro/vite/services/ssr/assets/use-retry-failed-DD4rpXCb.js                         0.79 kB │ gzip:   0.48 kB
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
dist/server/_ssr/use-retry-failed-DD4rpXCb.mjs                    1.02 kB │ gzip:   0.60 kB
Per-page budget failed (D234):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  /admin/audit: 298.3 KiB, over its ceiling of 297 KiB
  /admin/categories: 356.5 KiB, over its ceiling of 355 KiB
  /admin/countries: 313.2 KiB, over its ceiling of 312 KiB
  /admin/images: 268.7 KiB, over its ceiling of 268 KiB
  /admin/impersonation_/$sessionId: 296.3 KiB, over its ceiling of 295 KiB
  /admin/legal: 287.7 KiB, over its ceiling of 286 KiB
  /admin/legal_/$versionId: 283.8 KiB, over its ceiling of 282 KiB
  /admin/legal_/edit: 287.5 KiB, over its ceiling of 286 KiB
  /admin/listings: 332.8 KiB, over its ceiling of 331 KiB
  /admin/listings_/$listingId: 333.7 KiB, over its ceiling of 332 KiB
  /admin/listings_/$listingId_/edit: 414.9 KiB, over its ceiling of 413 KiB
  /admin/locations: 277.2 KiB, over its ceiling of 276 KiB
  /admin/monetisation: 317.0 KiB, over its ceiling of 316 KiB
  /admin/places: 315.5 KiB, over its ceiling of 314 KiB
  /admin/roles: 297.8 KiB, over its ceiling of 296 KiB
  /admin/roles_/$roleId: 277.9 KiB, over its ceiling of 277 KiB
  /admin/screening: 352.9 KiB, over its ceiling of 351 KiB
  /admin/translations: 312.6 KiB, over its ceiling of 311 KiB
  /admin/translations_/$lang: 313.7 KiB, over its ceiling of 312 KiB
  /admin/users: 297.4 KiB, over its ceiling of 296 KiB
  /admin/users_/$userId: 295.0 KiB, over its ceiling of 293 KiB
  /auth: 222.3 KiB, over its ceiling of 221 KiB
  /auth_/callback: 208.1 KiB, over its ceiling of 206 KiB
  /auth_/reset: 215.5 KiB, over its ceiling of 214 KiB
  /c/$slug: 226.1 KiB, over its ceiling of 225 KiB
  /dev/primitives: 230.5 KiB, over its ceiling of 229 KiB
  /dev/style: 265.4 KiB, over its ceiling of 264 KiB
  /dev/tall: 207.0 KiB, over its ceiling of 203 KiB
  /l/$slug: 251.2 KiB, over its ceiling of 250 KiB
  /legal/$kind: 211.0 KiB, over its ceiling of 208 KiB
  /legal/accept: 216.6 KiB, over its ceiling of 215 KiB
  /legal/publishing: 211.9 KiB, over its ceiling of 209 KiB
  /my-listings: 312.6 KiB, over its ceiling of 311 KiB
  /my-listings_/$listingId: 323.1 KiB, over its ceiling of 322 KiB
  /my-listings_/$listingId_/edit: 405.7 KiB, over its ceiling of 404 KiB
  /post: 405.7 KiB, over its ceiling of 404 KiB
  /post_/$listingId: 405.7 KiB, over its ceiling of 404 KiB
  /privacy: 210.8 KiB, over its ceiling of 208 KiB
  /settings: 280.0 KiB, over its ceiling of 279 KiB
  /terms: 210.8 KiB, over its ceiling of 208 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/b8690e6b-17bb-4cc5-b28d-47a82fcac07f' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/ethio-marketplace/ethio-marketplace
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes

```
