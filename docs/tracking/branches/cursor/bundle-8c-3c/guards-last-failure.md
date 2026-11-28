# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46158750266
- Commit: `c1e1e6131ecc20f5024d543012f554046598e807`
- Attempt: 1
- Written (UTC): 2026-11-28T15:26:20.544Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstderr[2m | src/components/shell/data-table.test.tsx[2m > [22m[2mDataTable C7 contract[2m > [22m[2mDTK-12 a failed read never recovers as an empty past-end page
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 1339[2mms[22m[39m
[90mstderr[2m | src/features/posting/step-where.test.tsx[2m > [22m[2mUFW-27 the failed market read says so and Retry asks that reader uf:S7s6.1
[90mstderr[2m | src/features/posting/step-where.test.tsx[2m > [22m[2mUFW-27 the failed market read says so and Retry asks that reader uf:S7s6.1
[90mstderr[2m | src/features/posting/step-where.test.tsx[2m > [22m[2mUFW-28 the failed tree read says so and Retry asks that reader uf:S7s6.2
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 3453[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mRFL-2 a flag read-back that fails answers flagged null with flagRead failed, logged — never 0, the writes reported
[90mstdout[2m | scripts/conformance/refusal-readers.test.ts[2m > [22m[2ma failed read is one typed failure (CF-REFUSAL-3)[2m > [22m[2mCFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
     [33m[2m✓[22m[39m CFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand [33m 488[2mms[22m[39m
[90mstderr[2m | src/features/admin-screening/screening-decisions.test.tsx[2m > [22m[2mSCRN-U2 a failed name-check read draws the shared notice with Retry, never a zero
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 22; without failed: 0
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)
[22m[39mfailure-notice post-who-alias-suggestions-failed server (reader pending)
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)
[22m[39mfailure-notice post-who-alias-suggestions-failed network
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mUFW-33 a failed identity read says so and Retry reads it again uf:S7s7.1
[22m[39mfailure-notice post-who-read-failed network
[90mstderr[2m | src/features/posting/step-who.test.tsx[2m > [22m[2mSWSF-3 a failed save that named no refusal keeps the line's own words
   [33m[2m✓[22m[39m UFW-33 a failed identity read says so and Retry reads it again uf:S7s7.1 [33m 379[2mms[22m[39m
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 2159[2mms[22m[39m
[90mstderr[2m | src/features/posting/step-review.test.tsx[2m > [22m[2mUFW-41 a failed summary identity read says so and Retry rereads uf:S7s8.2
[90mstderr[2m | src/features/posting/step-review.test.tsx[2m > [22m[2mUFW-41 a failed summary identity read says so and Retry rereads uf:S7s8.2
[90mstderr[2m | src/features/admin-attributes/attributes-page-states.test.tsx[2m > [22m[2mUFA-56 coverage column shows returned counts and incomplete tooltip; failed and loading coverage never shows zero uf:A19.2
[90mstderr[2m | src/features/admin-attributes/attributes-page-states.test.tsx[2m > [22m[2mUFA-56 coverage column shows returned counts and incomplete tooltip; failed and loading coverage never shows zero uf:A19.2
[90mstderr[2m | src/features/admin-attributes/attributes-page-states.test.tsx[2m > [22m[2mUFA-59 attribute roster and category link manager show loading, empty and failed states with their own Retry uf:A19.14
[90mstderr[2m | src/features/admin-attributes/attributes-page-states.test.tsx[2m > [22m[2mUFA-59 attribute roster and category link manager show loading, empty and failed states with their own Retry uf:A19.14
   [33m[2m✓[22m[39m UFA-56 coverage column shows returned counts and incomplete tooltip; failed and loading coverage never shows zero uf:A19.2 [33m 627[2mms[22m[39m
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
     [33m[2m✓[22m[39m OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu [33m 397[2mms[22m[39m
[90mstderr[2m | src/features/admin-listings/listings-page-states.test.tsx[2m > [22m[2mAll listings (UF-2)[2m > [22m[2mUFA-15 loading, empty, a failed read with Retry, and a pager that asks for the next page uf:A5.11
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/features/admin-listings/listings-page-states.test.tsx[2m > [22m[2mAll listings (UF-2)[2m > [22m[2mUFA-15 loading, empty, a failed read with Retry, and a pager that asks for the next page uf:A5.11
[90mstderr[2m | src/features/admin-listings/listing-photos.test.tsx[2m > [22m[2mLPH-U2 a failed photo read says failure and Retry refetches that query; a successful empty read stays null
[22m[39mfailure-notice listing-photos-failed server (reader pending)
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | src/features/admin-monetisation/monetisation-page-states.test.tsx[2m > [22m[2mUFA-73 markets, levels and reach show loading, empty and failed catalogue states with Retry uf:A25.10
[90mstderr[2m | src/features/admin-monetisation/monetisation-page-states.test.tsx[2m > [22m[2mUFA-73 markets, levels and reach show loading, empty and failed catalogue states with Retry uf:A25.10
 [31m❯[39m src/features/admin-monetisation/monetisation-page-states.test.tsx [2m([22m[2m3 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 6410[2mms[22m[39m
   [32m✓[39m UFA-73 markets, levels and reach show loading, empty and failed catalogue states with Retry uf:A25.10[32m 156[2mms[22m[39m
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[90mstderr[2m | src/components/marketplace/feed-states.test.tsx[2m > [22m[2mUF-1 the feed[2m > [22m[2mUFP-2 a failed category lookup says so and Retry refreshes the page uf:S1.7
[22m[39mfailure-notice feed-category-failed server (reader pending)
[90mstderr[2m | src/components/marketplace/feed-states.test.tsx[2m > [22m[2mUF-1 the feed[2m > [22m[2mUFP-7 a failed next page shows its notice and Retry reads that page again uf:S1.19
[22m[39mfailure-notice feed-category-failed malformed
[22m[39m[error-report] send failed unreachable
[22m[39m[screening] decision failed Error: listingNotFound
[22m[39m[screening] decision failed Error: ownListing
[22m[39m[screening] decision failed Error: illegalTransition
[22m[39m[screening] decision failed Error: severeRestore
[22m[39m[screening] decision failed Error: rateLimited
[22m[39m[screening] decision failed Error: permissionDenied
[22m[39m[screening] decision failed Error: noteRequired
[22m[39m[screening] decision failed Error: noteTooLong
[22m[39m[screening] decision failed Error: noFreeSlot
[22m[39m[screening] decision failed Error: badValue:status
[90mstderr[2m | src/features/admin-screening/screening-page-states.test.tsx[2m > [22m[2mUFA-23 queue loading, empty, failed words and Retry reread, then pager reads the next page uf:A8.10
[90mstderr[2m | src/features/admin-screening/screening-page-states.test.tsx[2m > [22m[2mUFA-23 queue loading, empty, failed words and Retry reread, then pager reads the next page uf:A8.10
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin/roles/roles-list-states.test.tsx[2m > [22m[2mthe roles list's rows (UF-2)[2m > [22m[2mUFA-27a a failed read draws the notice with its subject and a Retry that reads again uf:A9.3
[90mstderr[2m | src/features/admin/roles/roles-list-states.test.tsx[2m > [22m[2mthe roles list's rows (UF-2)[2m > [22m[2mUFA-27a a failed read draws the notice with its subject and a Retry that reads again uf:A9.3
[90mstderr[2m | src/features/admin/roles/roles-list-states.test.tsx[2m > [22m[2mthe roles list's rows (UF-2)[2m > [22m[2mUFA-27r INC-1347 a refused read says it was refused, not that it failed uf:A9.3
[90mstderr[2m | src/features/categories/category-tree.test.ts[2m > [22m[2mthe page's held category tree[2m > [22m[2mCTR-U1 (DEC-464) a failed read keeps its error, and retry asks for the tree again
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mUFW-20 a failed currency list says so and Retry reads it again uf:S7s4.5
   [33m[2m✓[22m[39m UFW-20 a failed currency list says so and Retry reads it again uf:S7s4.5 [33m 337[2mms[22m[39m
[90mstderr[2m | src/features/admin/translations/ai-bulk-bar.test.tsx[2m > [22m[2mAiBulkBar[2m > [22m[2mABB-U1 a failed count read draws the one notice, and Retry calls the count's read once
[90mstderr[2m | src/features/admin-categories/categories-page-states.test.tsx[2m > [22m[2mUFA-55 category loading, empty and failed reads show real words and Retry; paths dialog opens uf:A18.14
[90mstderr[2m | src/features/admin-categories/categories-page-states.test.tsx[2m > [22m[2mUFA-55 category loading, empty and failed reads show real words and Retry; paths dialog opens uf:A18.14
[90mstderr[2m | src/features/admin-categories/categories-page-states.test.tsx[2m > [22m[2mUFA-55 category loading, empty and failed reads show real words and Retry; paths dialog opens uf:A18.14
```

### Tail (last 60 lines)

```text
 [32m✓[39m src/features/admin-listings/undo-words.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/features/admin/legal/unknown-version.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/lib/country-name.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 23[2mms[22m[39m
 [32m✓[39m src/routes/root-reads-once.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/components/ui/dialog-parts-look.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/features/admin/translations/counted-label.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/i18n/entity.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/lib/whole-number.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/lib/compare-codes.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/features/posting/step-details-limits.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/components/shell/sign-in-return.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/features/admin-screening/use-screening-gone.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/features/admin-listings/listing-refusals-gone.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/features/admin/users/admin-users-service-gone.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m src/features/admin-monetisation/monetisation-page-states.test.tsx[2m > [22mUFA-71 product prices search by scope and currency, Columns toggle and next, previous and page size change rows uf:A25.7
[31m[1mError[22m: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".[39m
[36m [2m❯[22m src/features/admin-monetisation/monetisation-page-states.test.tsx:[2m160:1[22m[39m
    [90m158|[39m   [34mforgetTableViewsForTests[39m()[33m;[39m
    [90m159|[39m })[33m;[39m
    [90m160|[39m it("UFA-71 product prices search by scope and currency, Columns toggle…
    [90m   |[39m [31m^[39m
    [90m161|[39m   state[33m.[39mlist[33m.[39m[34mmockResolvedValue[39m({
    [90m162|[39m     [33m...[39mconsoleData[33m,[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m746 passed[39m[22m[90m (747)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m4685 passed[39m[22m[90m (4686)[39m
[2m   Start at [22m 15:13:56
[2m   Duration [22m 729.58s[2m (transform 22.71s, setup 430.65s, import 208.90s, tests 611.91s, environment 773.53s)[22m


##[error]Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ src/features/admin-monetisation/monetisation-page-states.test.tsx:160:1


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/33b6771a-7fc2-4fce-b27c-5cdc3d3ce0b8' before making global git config changes
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
