# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45664029304
- Commit: `d8bc2ea0701111711c11c973b9c6365bb43e64c0`
- Attempt: 1
- Written (UTC): 2026-11-25T17:53:14.704Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstderr[2m | src/components/shell/data-table.test.tsx[2m > [22m[2mDataTable C7 contract[2m > [22m[2mDTK-12 a failed read never recovers as an empty past-end page
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 640[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2419[2mms[22m[39m
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
[90mstdout[2m | scripts/conformance/refusal-readers.test.ts[2m > [22m[2ma failed read is one typed failure (CF-REFUSAL-3)[2m > [22m[2mCFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 21; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1358[2mms[22m[39m
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
[22m[39m[ssr-error] /api/feed [incident 80187af0-3778-4b01-8788-8b2d60f0fc9c] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 219e0eff-997b-4d1c-bf5a-83a8210f7a83] Error: feed_page returned no page
[90mstderr[2m | src/features/admin-screening/name-checks.test.tsx[2m > [22m[2mNCQ-U the queue section[2m > [22m[2mNCQ-U3 a failed read shows the error, never 'none'
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [31m❯[39m src/components/shell/failure-notice.test.tsx [2m([22m[2m12 tests[22m[2m | [22m[31m2 failed[39m[2m)[22m[33m 1124[2mms[22m[39m
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[22m[39m[save-error] unsave_listing Error: transport
[90mstderr[2m | src/features/admin-ai/ai-calls.test.tsx[2m > [22m[2mAI call consumer[2m > [22m[2mACR-4 a failed read remains an error with retry, never an empty success
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 354[2mms[22m[39m
[90mstderr[2m | src/features/admin-ai/ai-spend-days.test.tsx[2m > [22m[2mAiSpendDays (bundle 13 turn 14)[2m > [22m[2mAID-6 a failed read says so with a retry and shows no numbers (F4)
[22m[39m[ssr-error] /api/seller [incident 98aa1a14-d8f8-4740-b4b2-8cf364817467] Error: seller_feed_page returned no page
[22m[39mfailure-notice history-failed server (reader pending)
[22m[39mfailure-notice history-failed malformed
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 321[2mms[22m[39m
[22m[39m[categories] picture step failed: persist permissionDenied
[22m[39m[categories] picture step failed: upload storage upload failed: x
[categories] picture step failed: model-call network error
[categories] picture step failed: model-call route returned no image
[categories] picture step failed: client-timeout client-timeout
[22m[39m[categories] picture step failed: persist someCode:a, b
[90mstderr[2m | src/components/marketplace/feed.test.tsx[2m > [22m[2mthe feed's retry after a failed category lookup (INC-1140)[2m > [22m[2mFD-U1 the category-failed retry button calls refreshPage and no reload of its own
[22m[39mfailure-notice feed-category-failed server (reader pending)
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[22m[39m[report-listing] TypeError: Failed to fetch
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 307[2mms[22m[39m
[90mstderr[2m | src/features/posting/step-specifications-retry.test.tsx[2m > [22m[2mSPR-U1 Retry on a failed schema read asks for the schema again
[90mstderr[2m | src/features/admin/translations/languages-stats.test.tsx[2m > [22m[2mLPG-U1 failed reads draw the three Translations tiles failed, never 0 keys or 0 %
```

### Tail (last 60 lines)

```text
  <body>
    <div>
      <div
        class="flex min-w-0 max-w-full flex-wrap gap-2 break-words flex-col items-start text-sm"
        data-failure-class="malformed 400"
        data-failure-reason="server"
        data-testid="f"
        role="alert"
      >
        <p
          class="min-w-0 text-muted-foreground"
        >
          failure.server
        </p>
        <button
          class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-card shadow-tile hover:bg-accent hover:text-accent-foreground h-11 px-4 py-2 min-h-11"
          data-pressable=""
          data-testid="f-retry"
          type="button"
        >
          common.retry
        </button>
      </div>
    </div>
  </body>
</html>
 ❯ src/components/shell/failure-notice.test.tsx:40:55
 ❯ runWithExpensiveErrorDiagnosticsDisabled node_modules/@testing-library/dom/dist/config.js:47:12
 ❯ checkCallback node_modules/@testing-library/dom/dist/wait-for.js:124:77
 ❯ Timeout.checkRealTimersCallback node_modules/@testing-library/dom/dist/wait-for.js:118:16



##[error]Error: expect(element).toHaveTextContent()

Expected element to have text content:
  failure.gone
Received:
  failure.servercommon.retry
 ❯ src/components/shell/failure-notice.test.tsx:61:35


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/83361ccc-bc4c-4133-a52b-5667a547a62c' before making global git config changes
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
NEAR band failed (DEC-296):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    285.2 / 286 KiB  /admin/legal_/$versionId
    288.8 / 289 KiB  /admin/legal_/edit
    333.1 / 334 KiB  /admin/listings
    334.0 / 335 KiB  /admin/listings_/$listingId
    415.1 / 416 KiB  /admin/listings_/$listingId_/edit
    277.5 / 278 KiB  /admin/locations
    317.4 / 318 KiB  /admin/monetisation
    315.8 / 316 KiB  /admin/places
    297.8 / 299 KiB  /admin/roles
    277.9 / 279 KiB  /admin/roles_/$roleId
    353.2 / 354 KiB  /admin/screening
    313.9 / 314 KiB  /admin/translations
    315.0 / 316 KiB  /admin/translations_/$lang
    297.3 / 298 KiB  /admin/users
    296.3 / 297 KiB  /admin/users_/$userId
    222.3 / 223 KiB  /auth
    208.1 / 209 KiB  /auth_/callback
    215.5 / 216 KiB  /auth_/reset
    226.0 / 227 KiB  /c/$slug
    230.5 / 231 KiB  /dev/primitives
    265.3 / 266 KiB  /dev/style
    207.0 / 208 KiB  /dev/tall
    251.6 / 252 KiB  /l/$slug
    211.0 / 212 KiB  /legal/$kind
    216.6 / 218 KiB  /legal/accept
    212.3 / 213 KiB  /legal/publishing
    312.9 / 314 KiB  /my-listings
    323.4 / 324 KiB  /my-listings_/$listingId
    406.0 / 407 KiB  /my-listings_/$listingId_/edit
    406.0 / 407 KiB  /post
    406.0 / 407 KiB  /post_/$listingId
    210.8 / 212 KiB  /privacy
    280.0 / 281 KiB  /settings
    210.8 / 212 KiB  /terms

Tier flag: card pages only (CF-TIER-3) — ok
NEAR band failed (DEC-296):
  /account: 268.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 269 KiB — DEC-296: set it to ceilingFor(size) = 270
  /admin/ai: 307.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 308 KiB — DEC-296: set it to ceilingFor(size) = 309
  /admin/categories: 356.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 357 KiB — DEC-296: set it to ceilingFor(size) = 358
  /admin/legal_/edit: 288.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 289 KiB — DEC-296: set it to ceilingFor(size) = 290
  /admin/places: 315.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 316 KiB — DEC-296: set it to ceilingFor(size) = 317
  /admin/translations: 313.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 314 KiB — DEC-296: set it to ceilingFor(size) = 315
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/e35710ac-5fad-4d20-a513-2cb3bdfca5a6' before making global git config changes
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
