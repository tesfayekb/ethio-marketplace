# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44015218735
- Commit: `36a9a950dc45891570e921039b0675c852dd8015`
- Attempt: 1
- Written (UTC): 2026-11-17T04:23:45.699Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 651[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2123[2mms[22m[39m
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
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
 [31m❯[39m scripts/admin-tables.test.ts [2m([22m[2m9 tests[22m[2m | [22m[31m2 failed[39m[2m)[22m[33m 1046[2mms[22m[39m
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1345[2mms[22m[39m
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 6ce73174-0ed9-40a2-8d42-cb7111c28203] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 77180198-5ce9-4a60-b0f1-0325a509d961] Error: feed_page returned no page
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[ssr-error] /api/attributes/$id/options [incident b6176ccf-8787-49c1-a4b0-cad927fe4554] ReaderError: accountDeactivated
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 358[2mms[22m[39m
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 316[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
[22m[39m[ssr-error] /api/seller [incident badf40fe-db67-472e-8436-11a2a5940d25] Error: seller_feed_page returned no page
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 304[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/admin-tables.test.ts[2m > [22mthe agreed tables' check — the real tree[2m > [22mTBL-4 every table passes every rule
[41m[1m FAIL [22m[49m scripts/admin-tables.test.ts[2m > [22mT2b — the toolbar's search slot (INC-987)[2m > [22mTBS-1 every toolbar search slot in the tree holds one search input
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m515 passed[39m[22m[90m (516)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m3270 passed[39m[22m[90m (3272)[39m
##[error]AssertionError: expected [ Array(1) ] to deeply equal []
##[error]AssertionError: expected [ Array(1) ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    [90m229|[39m     [34mexpect[39m(slots)[33m.[39m[34mtoBeGreaterThanOrEqual[39m([34m14[39m)[33m;[39m
    [90m230|[39m     [34mexpect[39m(refused)[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m   |[39m                     [31m^[39m
    [90m231|[39m   })[33m;[39m
    [90m232|[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m515 passed[39m[22m[90m (516)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m3270 passed[39m[22m[90m (3272)[39m
[2m   Start at [22m 04:10:00
[2m   Duration [22m 284.42s[2m (transform 10.47s, setup 183.27s, import 94.90s, tests 181.64s, environment 322.37s)[22m


##[error]AssertionError: expected [ Array(1) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "src/features/admin/translations/strings-page.tsx: T2b — the search slot holds one search input; a choice that narrows the rows lives in Filters",
+ ]

 ❯ scripts/admin-tables.test.ts:157:29



##[error]AssertionError: expected [ Array(1) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "src/features/admin/translations/strings-page.tsx: T2b — the search slot holds one search input; a choice that narrows the rows lives in Filters",
+ ]

 ❯ scripts/admin-tables.test.ts:230:21


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/2c60488a-84d6-4bf4-afa3-6a346191569c' before making global git config changes
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
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
Per-page budget failed (D234):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    282.0 / 283 KiB  /admin/legal
    279.0 / 280 KiB  /admin/legal_/$versionId
    281.1 / 282 KiB  /admin/legal_/edit
    327.3 / 329 KiB  /admin/listings
    327.9 / 330 KiB  /admin/listings_/$listingId
    410.6 / 412 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    309.8 / 313 KiB  /admin/monetisation
    306.1 / 310 KiB  /admin/places
    292.6 / 294 KiB  /admin/roles
    273.5 / 274 KiB  /admin/roles_/$roleId
    344.6 / 348 KiB  /admin/screening
    305.6 / 305 KiB  /admin/translations
    308.3 / 308 KiB  /admin/translations_/$lang
    291.5 / 293 KiB  /admin/users
    290.6 / 291 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.1 / 211 KiB  /auth_/reset
    224.9 / 227 KiB  /c/$slug
    225.1 / 226 KiB  /dev/primitives
    246.1 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    255.5 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.7 / 217 KiB  /legal/accept
    209.1 / 211 KiB  /legal/publishing
    310.9 / 315 KiB  /my-listings
    321.1 / 323 KiB  /my-listings_/$listingId
    402.8 / 404 KiB  /my-listings_/$listingId_/edit
    402.7 / 404 KiB  /post
    402.7 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/translations: 305.6 KiB, over its ceiling of 305 KiB
  /admin/translations_/$lang: 308.3 KiB, over its ceiling of 308 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/915744a5-a004-4719-96a7-b46382dfd274' before making global git config changes
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
