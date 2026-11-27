# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45918807028
- Commit: `8bb8f54bbd238d9755fe273a3c7f2d880b79bbd9`
- Attempt: 1
- Written (UTC): 2026-11-27T01:32:08.204Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
with:
  bun-version: latest
  no-cache: false
  token: ***
##[endgroup]
Downloading a new version of Bun: https://github.com/oven-sh/bun/releases/download/bun-v1.4.5/bun-linux-x64.zip
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/8b25df38-a09d-4d3c-9fa4-a62a949ccdcc.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.5+a7733435c
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1884 keys across 803 files (432 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index 75a63d4..003a608 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 799,
+  "scanned": 803,
   "dynamicCallSites": 432,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index 75a63d4..003a608 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 799,
+  "scanned": 803,
   "dynamicCallSites": 432,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/5422deff-eb0f-4e58-9507-90455f25c92f' before making global git config changes
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
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 748[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2218[2mms[22m[39m
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
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1273[2mms[22m[39m
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/features/admin-listings/listing-photos.test.tsx[2m > [22m[2mLPH-U2 a failed photo read says failure and Retry refetches that query; a successful empty read stays null
[22m[39mfailure-notice listing-photos-failed server (reader pending)
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[90mstderr[2m | src/features/categories/category-tree.test.ts[2m > [22m[2mthe page's held category tree[2m > [22m[2mCTR-U1 (DEC-464) a failed read keeps its error, and retry asks for the tree again
[22m[39m[feed] first page failed Error: [vitest] No "routeFailure" export is defined on the "@/lib/route-client" mock. Did you forget to return it from "vi.mock"?
[90mstderr[2m | src/features/admin/translations/ai-bulk-bar.test.tsx[2m > [22m[2mAiBulkBar[2m > [22m[2mABB-U1 a failed count read draws the one notice, and Retry calls the count's read once
[22m[39mfailure-notice rail-categories-failed server (reader pending)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 44c54951-dfd2-4976-9efe-4fa1a3db2e8a] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 9c025bd2-db1f-49a3-bf02-86775f761fe2] Error: feed_page returned no page
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)
[22m[39mfailure-notice post-who-alias-suggestions-failed server (reader pending)
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)
[22m[39mfailure-notice post-who-alias-suggestions-failed network
[90mstderr[2m | src/features/ad-page/similar-ads.test.tsx[2m > [22m[2mSIM-4 the similar-ads section[2m > [22m[2mINC-1305 a failed read draws the failure notice's line with Retry, and Retry reads again
[22m[39mfailure-notice listing-similar-failed server (reader pending)
[90mstderr[2m | src/features/ad-page/similar-ads.test.tsx[2m > [22m[2mSIM-4 the similar-ads section[2m > [22m[2mINC-1305 a failed read draws the failure notice's line with Retry, and Retry reads again
[22m[39mfailure-notice listing-similar-failed network
[90mstderr[2m | src/features/admin-screening/name-checks.test.tsx[2m > [22m[2mNCQ-U the queue section[2m > [22m[2mNCQ-U3 a failed read shows the error, never 'none'
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[22m[39mfailure-notice post-photo-editor-failed server (reader pending)
[22m[39mfailure-notice post-photo-editor-failed auth 403
[90mstderr[2m | src/features/posting/photo-editor.test.tsx[2m > [22m[2mPhotoEditor (D154 B2)[2m > [22m[2mPED-10 a photo whose read failed on the server draws the failure notice; its Retry opens the photo
[22m[39mfailure-notice post-photo-editor-failed server 503
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[22m[39m[save-error] unsave_listing Error: transport
[90mstderr[2m | src/features/admin-attributes/attributes-page.test.tsx[2m > [22m[2mATPG-2 a failed Used by read draws one notice with Retry and the cell's failed words, never none
[90mstderr[2m | src/features/admin-attributes/attributes-page.test.tsx[2m > [22m[2mATPG-3 a failed coverage read draws the cell's failed words, never 0/N
[90mstderr[2m | src/features/admin-ai/ai-calls.test.tsx[2m > [22m[2mAI call consumer[2m > [22m[2mACR-4 a failed read remains an error with retry, never an empty success
[22m[39mfailure-notice impersonation-notice-failed network
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 322[2mms[22m[39m
[90mstderr[2m | src/components/forms/field-select.test.tsx[2m > [22m[2mFSL-U5 a failed read stays disabled, draws the one notice, and Retry calls the read once
[90mstderr[2m | src/features/admin/audit/audit-page.test.tsx[2m > [22m[2mAUDT-U1 a failed stats read draws the four tiles failed, none with a number
[22m[39mfailure-notice audit-stat-24h-failed server (reader pending)
```

### Tail (last 60 lines)

```text
 [32m✓[39m src/i18n/entity.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/lib/compare-codes.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/components/shell/sign-in-return.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m src/features/posting/step-details-limits.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 3[2mms[22m[39m

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m src/test/provider-errors.test.ts[2m > [22mPROVIDER_ERRORS (INC-1278 b)[2m > [22mPEF-5 our own route's entry quotes the line of src/server that answers it
[31m[1mAssertionError[22m: upstream unavailable: expected '' to contain '"upstream unavailable"'[39m

[32m- Expected[39m
[31m+ Received[39m

[32m- "upstream unavailable"[39m

[36m [2m❯[22m src/test/provider-errors.test.ts:[2m70:25[22m[39m
    [90m 68|[39m       [35mconst[39m [file[33m,[39m line] [33m=[39m entry[33m.[39msource[33m.[39m[34msplit[39m([32m":"[39m)[33m;[39m
    [90m 69|[39m       const text = readFileSync(file ?? "", "utf8").split("\n")[Number…
    [90m 70|[39m       [34mexpect[39m(text[33m,[39m key)[33m.[39m[34mtoContain[39m([33mJSON[39m[33m.[39m[34mstringify[39m(entry[33m.[39mmessage))[33m;[39m
    [90m   |[39m                         [31m^[39m
    [90m 71|[39m     }
    [90m 72|[39m   })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m654 passed[39m[22m[90m (655)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m4294 passed[39m[22m[90m (4295)[39m
[2m   Start at [22m 00:59:36
[2m   Duration [22m 383.23s[2m (transform 14.34s, setup 242.01s, import 123.76s, tests 274.60s, environment 417.20s)[22m


##[error]AssertionError: upstream unavailable: expected '' to contain '"upstream unavailable"'

- Expected
+ Received

- "upstream unavailable"

 ❯ src/test/provider-errors.test.ts:70:25


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/f9be79ef-8461-4061-955e-db1dc80a7d00' before making global git config changes
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
