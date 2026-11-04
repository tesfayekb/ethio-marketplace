# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41756986789
- Commit: `724fc819cefa3031dc680541f54d3117e1e615c9`
- Attempt: 1
- Written (UTC): 2026-11-04T02:13:31.446Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 981[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mRFL-2 a flag read-back that fails answers flagged null with flagRead failed, logged — never 0, the writes reported
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
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
     [33m[2m✓[22m[39m OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu [33m 332[2mms[22m[39m
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 2085[2mms[22m[39m
 [31m❯[39m scripts/e2e-select.test.ts [2m([22m[2m19 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 394[2mms[22m[39m
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 049ede04-27be-4ebc-a0d6-35f9a2018d51] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 386[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 307[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/e2e-select.test.ts[2m > [22mselfTest[2m > [22mevery spec is reachable and every area glob matches
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m435 passed[39m[22m[90m (436)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2708 passed[39m[22m[90m (2709)[39m
##[error]AssertionError: expected [ Array(1) ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

[41m[1m FAIL [22m[49m scripts/e2e-select.test.ts[2m > [22mselfTest[2m > [22mevery spec is reachable and every area glob matches
[31m[1mAssertionError[22m: expected [ Array(1) ] to deeply equal [][39m

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   "spec not reachable from any area: e2e/user-guides.spec.ts",[39m
[31m+ ][39m

[36m [2m❯[22m scripts/e2e-select.test.ts:[2m98:24[22m[39m
    [90m 96|[39m [34mdescribe[39m([32m"selfTest"[39m[33m,[39m () [33m=>[39m {
    [90m 97|[39m   [34mit[39m([32m"every spec is reachable and every area glob matches"[39m[33m,[39m () [33m=>[39m {
    [90m 98|[39m     [34mexpect[39m([34mselfTest[39m())[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m   |[39m                        [31m^[39m
    [90m 99|[39m   })[33m;[39m
    [90m100|[39m })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m435 passed[39m[22m[90m (436)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2708 passed[39m[22m[90m (2709)[39m
[2m   Start at [22m 01:52:48
[2m   Duration [22m 339.81s[2m (transform 12.40s, setup 236.40s, import 86.19s, tests 181.38s, environment 423.61s)[22m


##[error]AssertionError: expected [ Array(1) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "spec not reachable from any area: e2e/user-guides.spec.ts",
+ ]

 ❯ scripts/e2e-select.test.ts:98:24


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/e1aa0f47-54e1-4fe5-bb8e-6d7672d4ea20' before making global git config changes
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

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
✖ 47 problems (0 errors, 47 warnings)
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  32:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  44:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/field.tsx
  108:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  133:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  272:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  281:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  312:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/map/map-preview.tsx
  44:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/preview/listing-detail.tsx
  171:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components                                                                                                                                react-refresh/only-export-components
  365:3   warning  React Hook useEffect contains a call to 'setContactHighlight'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [view.contact.focusOnReturn, view.contact.viewer] as a second argument to the useEffect Hook  react-hooks/exhaustive-deps

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/step-pricing.tsx
  86:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/step-specifications.tsx
  1944:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/step-who.tsx
  128:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/i18n/provider.tsx
   81:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  790:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  804:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/providers/theme-provider.tsx
  39:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

✖ 47 problems (0 errors, 47 warnings)
  0 errors and 1 warning potentially fixable with the `--fix` option.

##[group]Run bun run scripts/e2e-select.ts --self-test
[36;1mbun run scripts/e2e-select.ts --self-test[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
e2e-select self-test FAILED:
  - spec not reachable from any area: e2e/user-guides.spec.ts
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/c72f9848-adb9-48fe-ad7a-570c46f88e44' before making global git config changes
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
  /: 233.6 KiB, over its ceiling of 232 KiB
  /$name: 231.6 KiB, over its ceiling of 230 KiB
  /account: 276.0 KiB, over its ceiling of 274 KiB
  /account_/legal: 216.2 KiB, over its ceiling of 216 KiB
  /account_/saved: 231.6 KiB, over its ceiling of 230 KiB
  /admin: 214.6 KiB, over its ceiling of 214 KiB
  /admin/: 215.4 KiB, over its ceiling of 215 KiB
  /admin/ai: 329.4 KiB, over its ceiling of 327 KiB
  /admin/attributes: 342.8 KiB, over its ceiling of 340 KiB
  /admin/audit: 302.4 KiB, over its ceiling of 300 KiB
  /admin/categories: 350.8 KiB, over its ceiling of 348 KiB
  /admin/countries: 332.3 KiB, over its ceiling of 330 KiB
  /admin/images: 215.3 KiB, over its ceiling of 215 KiB
  /admin/listings: 351.8 KiB, over its ceiling of 349 KiB
  /admin/listings_/$listingId: 394.7 KiB, over its ceiling of 393 KiB
  /admin/listings_/$listingId_/edit: 412.5 KiB, over its ceiling of 411 KiB
  /admin/monetisation: 341.5 KiB, over its ceiling of 339 KiB
  /admin/places: 333.8 KiB, over its ceiling of 331 KiB
  /admin/roles: 299.3 KiB, over its ceiling of 297 KiB
  /admin/roles_/$roleId: 321.3 KiB, over its ceiling of 319 KiB
  /admin/screening: 373.0 KiB, over its ceiling of 371 KiB
  /admin/translations: 420.6 KiB, over its ceiling of 413 KiB
  /admin/translations_/$lang: 313.7 KiB, over its ceiling of 311 KiB
  /admin/users: 298.9 KiB, over its ceiling of 297 KiB
  /auth: 228.1 KiB, over its ceiling of 226 KiB
  /c/$slug: 233.6 KiB, over its ceiling of 232 KiB
  /dev/primitives: 236.6 KiB, over its ceiling of 234 KiB
  /dev/style: 256.0 KiB, over its ceiling of 254 KiB
  /l/$slug: 263.5 KiB, over its ceiling of 262 KiB
  /legal/$kind: 218.3 KiB, over its ceiling of 218 KiB
  /legal/accept: 225.3 KiB, over its ceiling of 225 KiB
  /legal/publishing: 219.1 KiB, over its ceiling of 219 KiB
  /my-listings: 322.3 KiB, over its ceiling of 320 KiB
  /my-listings_/$listingId: 327.4 KiB, over its ceiling of 326 KiB
  /my-listings_/$listingId_/edit: 407.1 KiB, over its ceiling of 406 KiB
  /post: 407.1 KiB, over its ceiling of 406 KiB
  /post_/$listingId: 407.0 KiB, over its ceiling of 406 KiB
  /privacy: 218.3 KiB, over its ceiling of 218 KiB
  /settings: 281.7 KiB, over its ceiling of 280 KiB
  /terms: 218.3 KiB, over its ceiling of 218 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/c1cb863c-a3cd-4511-a15a-e2a20c969758' before making global git config changes
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
