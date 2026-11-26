# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45758262652
- Commit: `16929f29fbcfbe8f060b976bdecb8f843e2be1e0`
- Attempt: 1
- Written (UTC): 2026-11-26T05:28:05.747Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstderr[2m | src/components/shell/data-table.test.tsx[2m > [22m[2mDataTable C7 contract[2m > [22m[2mDTK-12 a failed read never recovers as an empty past-end page
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 735[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2148[2mms[22m[39m
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
[22m[39m[session-reads] currentSession() calls: 22; without failed: 0
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1349[2mms[22m[39m
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/features/admin-listings/listing-photos.test.tsx[2m > [22m[2mLPH-U2 a failed photo read says failure and Retry refetches that query; a successful empty read stays null
[22m[39mfailure-notice listing-photos-failed server (reader pending)
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[90mstderr[2m | src/features/categories/category-tree.test.ts[2m > [22m[2mthe page's held category tree[2m > [22m[2mCTR-U1 (DEC-464) a failed read keeps its error, and retry asks for the tree again
 [31m❯[39m src/components/shell/rail-first-paint.test.tsx [2m([22m[2m5 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 275[2mms[22m[39m
     [32m✓[39m RFT-3 a failed glyph download keeps every name and draws no glyph[32m 11[2mms[22m[39m
[90mstderr[2m | src/features/admin/translations/ai-bulk-bar.test.tsx[2m > [22m[2mAiBulkBar[2m > [22m[2mABB-U1 a failed count read draws the one notice, and Retry calls the count's read once
[22m[39m[feed] first page failed Error: [vitest] No "routeFailure" export is defined on the "@/lib/route-client" mock. Did you forget to return it from "vi.mock"?
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident cae80b03-cb4a-49a2-902a-083adc21eee7] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident cf21751f-89f3-4c72-849e-5574a8bd294c] Error: feed_page returned no page
[90mstderr[2m | src/features/admin-screening/name-checks.test.tsx[2m > [22m[2mNCQ-U the queue section[2m > [22m[2mNCQ-U3 a failed read shows the error, never 'none'
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39mfailure-notice post-photo-editor-failed server (reader pending)
[22m[39mfailure-notice post-photo-editor-failed auth 403
[90mstderr[2m | src/features/posting/photo-editor.test.tsx[2m > [22m[2mPhotoEditor (D154 B2)[2m > [22m[2mPED-10 a photo whose read failed on the server draws the failure notice; its Retry opens the photo
[22m[39mfailure-notice post-photo-editor-failed server 503
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[22m[39m[save-error] unsave_listing Error: transport
[90mstderr[2m | src/features/admin-ai/ai-calls.test.tsx[2m > [22m[2mAI call consumer[2m > [22m[2mACR-4 a failed read remains an error with retry, never an empty success
[90mstderr[2m | src/features/admin-attributes/attributes-page.test.tsx[2m > [22m[2mATPG-2 a failed Used by read draws one notice with Retry and the cell's failed words, never none
[90mstderr[2m | src/features/admin-attributes/attributes-page.test.tsx[2m > [22m[2mATPG-3 a failed coverage read draws the cell's failed words, never 0/N
[22m[39mfailure-notice impersonation-notice-failed network
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 317[2mms[22m[39m
[90mstderr[2m | src/components/forms/field-select.test.tsx[2m > [22m[2mFSL-U5 a failed read stays disabled, draws the one notice, and Retry calls the read once
[90mstderr[2m | src/features/admin/audit/audit-page.test.tsx[2m > [22m[2mAUDT-U1 a failed stats read draws the four tiles failed, none with a number
[22m[39mfailure-notice audit-stat-24h-failed server (reader pending)
failure-notice audit-stat-7d-failed server (reader pending)
failure-notice audit-stat-impersonations-failed server (reader pending)
failure-notice audit-stat-top-action-failed server (reader pending)
[90mstderr[2m | src/features/admin/audit/audit-page.test.tsx[2m > [22m[2mAUD-U2 a failed rows read hands the table its own refetch as Retry
[22m[39mfailure-notice audit-stat-24h-failed server (reader pending)
failure-notice audit-stat-7d-failed server (reader pending)
failure-notice audit-stat-impersonations-failed server (reader pending)
```

### Tail (last 60 lines)

```text
          aria-hidden="true"
          class=""
          data-testid="rail-category-skeleton"
        >
          <div
            class="flex min-h-11 md:pointer-fine:min-h-8 items-center gap-2 px-3"
          >
            <span
              class="shrink-0 animate-pulse rounded-full bg-muted size-7.5"
            />
            <span
              class="h-3 w-24 animate-pulse rounded bg-muted rail-icons:hidden"
            />
          </div>
        </li>
        <li
          aria-hidden="true"
          class=""
          data-testid="rail-category-skeleton"
        >
          <div
            class="flex min-h-11 md:pointer-fine:min-h-8 items-center gap-2 px-3"
          >
            <span
              class="shrink-0 animate-pulse rounded-full bg-muted size-7.5"
            />
            <span
              class="h-3 w-24 animate-pulse rounded bg-muted rail-icons:hidden"
            />
          </div>
        </li>
      </ul>
    </nav>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:76:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:52:17
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:95:19
 ❯ src/components/shell/rail-first-paint.test.tsx:167:19


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/9e71ddd2-6d55-4ae8-b3e6-a0315dc07e7f' before making global git config changes
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
