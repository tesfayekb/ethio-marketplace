# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46100047891
- Commit: `b6a2945c5c84c5c951549c4a33d6a17712aac9d6`
- Attempt: 1
- Written (UTC): 2026-11-28T03:03:37.976Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstderr[2m | src/components/shell/data-table.test.tsx[2m > [22m[2mDataTable C7 contract[2m > [22m[2mDTK-12 a failed read never recovers as an empty past-end page
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 722[2mms[22m[39m
[90mstderr[2m | src/features/posting/step-where.test.tsx[2m > [22m[2mUFW-27 the failed market read says so and Retry asks that reader uf:S7s6.1
[90mstderr[2m | src/features/posting/step-where.test.tsx[2m > [22m[2mUFW-27 the failed market read says so and Retry asks that reader uf:S7s6.1
[90mstderr[2m | src/features/posting/step-where.test.tsx[2m > [22m[2mUFW-28 the failed tree read says so and Retry asks that reader uf:S7s6.2
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2310[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mRFL-2 a flag read-back that fails answers flagged null with flagRead failed, logged — never 0, the writes reported
[90mstdout[2m | scripts/conformance/refusal-readers.test.ts[2m > [22m[2ma failed read is one typed failure (CF-REFUSAL-3)[2m > [22m[2mCFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand
     [33m[2m✓[22m[39m CFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand [33m 341[2mms[22m[39m
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 22; without failed: 0
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1452[2mms[22m[39m
[90mstderr[2m | src/features/posting/step-review.test.tsx[2m > [22m[2mUFW-41 a failed summary identity read says so and Retry rereads uf:S7s8.2
[90mstderr[2m | src/features/posting/step-review.test.tsx[2m > [22m[2mUFW-41 a failed summary identity read says so and Retry rereads uf:S7s8.2
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)
[22m[39mfailure-notice post-who-alias-suggestions-failed server (reader pending)
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)
[22m[39mfailure-notice post-who-alias-suggestions-failed network
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mUFW-33 a failed identity read says so and Retry reads it again uf:S7s7.1
[22m[39mfailure-notice post-who-read-failed network
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/features/admin-listings/listing-photos.test.tsx[2m > [22m[2mLPH-U2 a failed photo read says failure and Retry refetches that query; a successful empty read stays null
[22m[39mfailure-notice listing-photos-failed server (reader pending)
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
 [31m❯[39m src/routes/auth-forms.test.tsx [2m([22m[2m9 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 1402[2mms[22m[39m
[90mstderr[2m | src/features/categories/category-tree.test.ts[2m > [22m[2mthe page's held category tree[2m > [22m[2mCTR-U1 (DEC-464) a failed read keeps its error, and retry asks for the tree again
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mUFW-20 a failed currency list says so and Retry reads it again uf:S7s4.5
[90mstderr[2m | src/components/marketplace/feed-states.test.tsx[2m > [22m[2mUF-1 the feed[2m > [22m[2mUFP-2 a failed category lookup says so and Retry refreshes the page uf:S1.7
[22m[39mfailure-notice feed-category-failed server (reader pending)
[22m[39m[error-report] send failed unreachable
[error-report] send failed unreachable
[error-report] send failed unreachable
[90mstderr[2m | src/components/marketplace/feed-states.test.tsx[2m > [22m[2mUF-1 the feed[2m > [22m[2mUFP-7 a failed next page shows its notice and Retry reads that page again uf:S1.19
[90mstderr[2m | src/components/marketplace/feed-states.test.tsx[2m > [22m[2mUF-1 the feed[2m > [22m[2mUFP-7 a failed next page shows its notice and Retry reads that page again uf:S1.19
[22m[39m[error-report] send failed unreachable
[22m[39mfailure-notice feed-category-failed malformed
[22m[39m[feed] first page failed Error: [vitest] No "routeFailure" export is defined on the "@/lib/route-client" mock. Did you forget to return it from "vi.mock"?
[90mstderr[2m | src/features/admin/translations/ai-bulk-bar.test.tsx[2m > [22m[2mAiBulkBar[2m > [22m[2mABB-U1 a failed count read draws the one notice, and Retry calls the count's read once
[90mstderr[2m | src/features/my-listings/my-listings-page-states.test.tsx[2m > [22m[2mUF-1 the member's listings[2m > [22m[2mUFM-2 a failed list carries its class and Retry reads it again uf:S8.5
[90mstderr[2m | src/features/my-listings/my-listings-page-states.test.tsx[2m > [22m[2mUF-1 the member's listings[2m > [22m[2mUFM-2 a failed list carries its class and Retry reads it again uf:S8.5
[22m[39m[error-report] send failed unreachable
[22m[39mfailure-notice rail-categories-failed server (reader pending)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident dcb998db-1cb1-413a-87f3-c6db823a1fd2] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident aaaf1b7e-06a9-4d6c-a5db-8171bfbb962e] Error: feed_page returned no page
[90mstderr[2m | src/features/posting/step-specifications-states.test.tsx[2m > [22m[2mUFW-13 a failed schema and a rate refusal say so with Retry uf:S7s3.2
[90mstderr[2m | src/features/posting/step-specifications-states.test.tsx[2m > [22m[2mUFW-13 a failed schema and a rate refusal say so with Retry uf:S7s3.2
[90mstderr[2m | src/features/posting/step-specifications-states.test.tsx[2m > [22m[2mUFW-13 a failed schema and a rate refusal say so with Retry uf:S7s3.2
[90mstderr[2m | src/features/ad-page/similar-ads.test.tsx[2m > [22m[2mSIM-4 the similar-ads section[2m > [22m[2mINC-1305 a failed read draws the failure notice's line with Retry, and Retry reads again
[22m[39mfailure-notice listing-similar-failed server (reader pending)
[90mstderr[2m | src/features/ad-page/similar-ads.test.tsx[2m > [22m[2mSIM-4 the similar-ads section[2m > [22m[2mINC-1305 a failed read draws the failure notice's line with Retry, and Retry reads again
[22m[39mfailure-notice listing-similar-failed network
[90mstderr[2m | src/features/admin-screening/name-checks.test.tsx[2m > [22m[2mNCQ-U the queue section[2m > [22m[2mNCQ-U3 a failed read shows the error, never 'none'
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[90mstderr[2m | src/features/my-listings/my-listing-page-states.test.tsx[2m > [22m[2mUF-1 one member listing[2m > [22m[2mUFM-6 the page draws loading, its failed read with Retry, and not found uf:S9.2
[90mstderr[2m | src/features/my-listings/my-listing-page-states.test.tsx[2m > [22m[2mUF-1 one member listing[2m > [22m[2mUFM-6 the page draws loading, its failed read with Retry, and not found uf:S9.2
[90mstderr[2m | src/features/my-listings/my-listing-page-states.test.tsx[2m > [22m[2mUF-1 one member listing[2m > [22m[2mUFM-7 a failed buyer-view identity read keeps its raw class uf:S9.11
[22m[39m[error-report] send failed unreachable
[90mstderr[2m | src/features/my-listings/my-listing-page-states.test.tsx[2m > [22m[2mUF-1 one member listing[2m > [22m[2mUFM-7 a failed buyer-view identity read keeps its raw class uf:S9.11
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[22m[39mfailure-notice post-photo-editor-failed server (reader pending)
[22m[39mfailure-notice post-photo-editor-failed auth 403
[90mstderr[2m | src/features/posting/photo-editor.test.tsx[2m > [22m[2mPhotoEditor (D154 B2)[2m > [22m[2mPED-10 a photo whose read failed on the server draws the failure notice; its Retry opens the photo
[22m[39mfailure-notice post-photo-editor-failed server 503
[90mstderr[2m | src/features/seller/seller-page-states.test.tsx[2m > [22m[2mUF-1 a seller's page[2m > [22m[2mUFP-19 a failed read says so and Retry reads again uf:S3.6
[90mstderr[2m | src/features/seller/seller-page-states.test.tsx[2m > [22m[2mUF-1 a seller's page[2m > [22m[2mUFP-20 the end coming into view loads the next page, and a failed next page says so with Retry uf:S3.7
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
```

### Tail (last 60 lines)

```text
                aria-required="true"
                autocomplete="new-password"
                class="min-h-11 rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive ring-1 ring-destructive w-full pe-11"
                id="reset-password"
                minlength="8"
                name="password"
                placeholder="auth.passwordPlaceholder"
                required=""
                type="password"
                value=""
              />
              <button
                aria-label="auth.showPassword"
                aria-pressed="false"
                class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 p-0 size-11 text-muted-foreground hover:bg-accent hover:text-foreground absolute end-0 top-1/2 -translate-y-1/2"
                data-pressable=""
                data-testid="password-toggle"
                type="button"
              >
                <span
                  aria-hidden="true"
                  class="inline-flex [&_svg]:size-4"
                >
                  <svg
                    aria-hidden="true"
                    class="lucide lucide-eye"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                    />
                    <circle
                      cx="12"
               
error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/e5ab127a-96ba-4225-8032-6d4cc6e2075f' before making global git config changes
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
