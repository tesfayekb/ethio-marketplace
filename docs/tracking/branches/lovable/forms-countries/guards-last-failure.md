# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43745958151
- Commit: `d336815def760600a801d85e1c462ac547d0580d`
- Attempt: 1
- Written (UTC): 2026-11-15T18:31:34.831Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
       "/post/$listingId"
     ],
     "post.field.required": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
@@ -6659,6 +6660,7 @@
       "/post/$listingId"
     ],
     "post.optional": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index c106332..b2f94f0 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 727,
+  "scanned": 726,
   "dynamicCallSites": 425,
   "keys": {
     "account.deactivatedBanner": [
@@ -6539,6 +6539,7 @@
       "/post/$listingId"
     ],
     "post.field.required": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
@@ -6659,6 +6660,7 @@
       "/post/$listingId"
     ],
     "post.optional": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/aa3c2288-0f32-42ad-abf2-59c52c7a0dc4' before making global git config changes
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
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 652[2mms[22m[39m
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
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2378[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mRFL-2 a flag read-back that fails answers flagged null with flagRead failed, logged — never 0, the writes reported
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1270[2mms[22m[39m
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 976ef67c-1008-4e9b-9c93-1c3eece1b778] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 8311797c-8300-4b16-b2f8-ca7436724c76] Error: feed_page returned no page
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 359[2mms[22m[39m
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 332[2mms[22m[39m
 [31m❯[39m scripts/conformance/lockfile-hosts.test.ts [2m([22m[2m2 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 13[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
[22m[39m[ssr-error] /api/seller [incident 9e34b183-5aeb-45ce-bb82-840232f21ec8] Error: seller_feed_page returned no page
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 305[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/conformance/lockfile-hosts.test.ts[2m > [22mone install everywhere: the lockfile's addresses are the public registry's (DEC-363)[2m > [22mCF-LOCK-1 every URL in bun.lock is on registry.npmjs.org or an allowlisted host
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m504 passed[39m[22m[90m (505)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3202 passed[39m[22m[90m (3203)[39m
##[error]AssertionError: expected 0 to be greater than 0
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 [32m✓[39m src/providers/pre-paint-scripts.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/i18n/server-shell-language.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m src/features/posting/same-channels.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/components/shell/strings-layers.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/features/seller/seller-head.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/features/auth/password-pair.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m src/lib/own-key.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m src/lib/signed-in-pages.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m src/lib/collator.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 18[2mms[22m[39m
 [32m✓[39m src/routes/root-reads-once.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/features/posting/refusal-text.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m src/lib/country-name.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 21[2mms[22m[39m
 [32m✓[39m src/i18n/entity.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m src/lib/compare-codes.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m src/lib/whole-number.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m src/features/posting/step-details-limits.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 3[2mms[22m[39m

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m scripts/conformance/lockfile-hosts.test.ts[2m > [22mone install everywhere: the lockfile's addresses are the public registry's (DEC-363)[2m > [22mCF-LOCK-1 every URL in bun.lock is on registry.npmjs.org or an allowlisted host
[31m[1mAssertionError[22m: expected 0 to be greater than 0[39m
[36m [2m❯[22m scripts/conformance/lockfile-hosts.test.ts:[2m51:18[22m[39m
    [90m 49|[39m     [35mconst[39m urls [33m=[39m [[33m...[39mtext[33m.[39m[34mmatchAll[39m([33mURL_HOST[39m)][33m.[39mlength[33m;[39m
    [90m 50|[39m     console.log(`[lockfile-hosts] urls: ${urls}, findings: ${findings.…
    [90m 51|[39m     [34mexpect[39m(urls)[33m.[39m[34mtoBeGreaterThan[39m([34m0[39m)[33m;[39m
    [90m   |[39m                  [31m^[39m
    [90m 52|[39m     expect(report(findings.filter((f) => !allowances.has(f.host)))).to…
    [90m 53|[39m   })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m504 passed[39m[22m[90m (505)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3202 passed[39m[22m[90m (3203)[39m
[2m   Start at [22m 18:18:18
[2m   Duration [22m 282.40s[2m (transform 10.64s, setup 184.04s, import 95.23s, tests 176.26s, environment 320.57s)[22m


##[error]AssertionError: expected 0 to be greater than 0
 ❯ scripts/conformance/lockfile-hosts.test.ts:51:18


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/00a8736c-044e-4bb1-95ea-10e80a52c997' before making global git config changes
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
    292.8 / 294 KiB  /admin/impersonation_/$sessionId
    282.1 / 283 KiB  /admin/legal
    279.1 / 280 KiB  /admin/legal_/$versionId
    281.1 / 282 KiB  /admin/legal_/edit
    348.1 / 349 KiB  /admin/listings
    352.6 / 353 KiB  /admin/listings_/$listingId
    411.0 / 411 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    333.1 / 334 KiB  /admin/monetisation
    328.4 / 329 KiB  /admin/places
    294.1 / 295 KiB  /admin/roles
    273.5 / 274 KiB  /admin/roles_/$roleId
    369.1 / 370 KiB  /admin/screening
    305.3 / 306 KiB  /admin/translations
    308.7 / 310 KiB  /admin/translations_/$lang
    293.0 / 294 KiB  /admin/users
    289.6 / 290 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.1 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    225.1 / 226 KiB  /dev/primitives
    246.2 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    255.6 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.7 / 217 KiB  /legal/accept
    209.2 / 211 KiB  /legal/publishing
    312.4 / 315 KiB  /my-listings
    319.9 / 323 KiB  /my-listings_/$listingId
    403.2 / 404 KiB  /my-listings_/$listingId_/edit
    403.1 / 404 KiB  /post
    403.1 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/countries: 328.9 KiB, over its ceiling of 328 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/1a695d40-25c3-4efd-9fdb-7e7d4f548015' before making global git config changes
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
