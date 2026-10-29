# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40824018057
- Commit: `7f9b0cba1f9ed6e1392eeb4f24b8efba80b14f25`
- Attempt: 1
- Written (UTC): 2026-10-29T05:53:15.163Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
src/components/shell/data-table.test.tsx(111,8): error TS2741: Property 'rowTestId' is missing in type '{ columns: DataTableColumn<Row>[]; rows: never[]; rowKey: (row: Row) => string; caption: string; emptyState: string; keyset: { hasPrevious: true; hasNext: false; onNext: Mock<...>; onPrevious: Mock<...>; }; }' but required in type 'DataTableProps<Row>'.
src/components/shell/data-table.test.tsx(124,8): error TS2741: Property 'rowTestId' is missing in type '{ columns: DataTableColumn<Row>[]; rows: never[]; rowKey: (row: Row) => string; caption: string; emptyState: string; }' but required in type 'DataTableProps<Row>'.
##[error]Process completed with exit code 2.
```

### Tail (last 60 lines)

```text
+ @radix-ui/react-toggle-group@1.1.11
+ @radix-ui/react-tooltip@1.2.8
+ @supabase/supabase-js@2.110.9
+ @tailwindcss/vite@4.2.4
+ @tanstack/react-query@5.101.1
+ @tanstack/react-router@1.170.41
+ @tanstack/react-start@1.168.60
+ @tanstack/router-plugin@1.168.42
+ @types/pngjs@6.0.5
+ class-variance-authority@0.7.1
+ clsx@2.1.1
+ cmdk@1.1.1
+ date-fns@4.1.0
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ libphonenumber-js@1.11.18
+ lucide-react@0.575.0
+ pngjs@7.0.0
+ qrcode-generator@2.0.4
+ react@19.2.5
+ react-day-picker@9.14.0
+ react-dom@19.2.5
+ react-hook-form@7.73.1
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@4.6.7

542 packages installed [10.24s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
src/components/shell/data-table.test.tsx(111,8): error TS2741: Property 'rowTestId' is missing in type '{ columns: DataTableColumn<Row>[]; rows: never[]; rowKey: (row: Row) => string; caption: string; emptyState: string; keyset: { hasPrevious: true; hasNext: false; onNext: Mock<...>; onPrevious: Mock<...>; }; }' but required in type 'DataTableProps<Row>'.
src/components/shell/data-table.test.tsx(124,8): error TS2741: Property 'rowTestId' is missing in type '{ columns: DataTableColumn<Row>[]; rows: never[]; rowKey: (row: Row) => string; caption: string; emptyState: string; }' but required in type 'DataTableProps<Row>'.
##[error]Process completed with exit code 2.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/ddd5a6eb-54d3-4a91-80c8-eda9f8595db1' before making global git config changes
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
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 1091[2mms[22m[39m
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
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
     [33m[2m✓[22m[39m OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu [33m 343[2mms[22m[39m
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1911[2mms[22m[39m
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
 [31m❯[39m scripts/e2e-select.test.ts [2m([22m[2m19 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 382[2mms[22m[39m
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 2e6da026-420c-408e-843f-3efa65ea7855] ReaderError: feed_page: marker-text-that-must-not-travel
 [31m❯[39m scripts/conformance/layout-reads.test.ts [2m([22m[2m2 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 18[2mms[22m[39m
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 401[2mms[22m[39m
 [31m❯[39m scripts/test-ids.test.ts [2m([22m[2m6 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 335[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 308[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/e2e-select.test.ts[2m > [22mselfTest[2m > [22mevery spec is reachable and every area glob matches
[41m[1m FAIL [22m[49m scripts/test-ids.test.ts[2m > [22mtest ids (INC-536)[2m > [22mTI-1 no test id is used twice in the repository
[41m[1m FAIL [22m[49m scripts/conformance/layout-reads.test.ts[2m > [22ma test reads a layout whole, once it has stopped moving (INC-940)[2m > [22mBX-1 every box read in e2e/ is a layoutBoxes read, or its test has a live allowance
[2m Test Files [22m [1m[31m3 failed[39m[22m[2m | [22m[1m[32m352 passed[39m[22m[90m (355)[39m
[2m      Tests [22m [1m[31m3 failed[39m[22m[2m | [22m[1m[32m2145 passed[39m[22m[90m (2148)[39m
##[error]AssertionError: expected [ Array(1) ] to deeply equal []
##[error]AssertionError: expected [ Array(1) ] to deeply equal []
##[error]AssertionError: expected 'e2e/rail-first-paint.spec.ts#RFP-2:43…' to be '' // Object.is equality
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[2m   Duration [22m 270.42s[2m (transform 10.97s, setup 162.82s, import 70.67s, tests 134.51s, environment 364.06s)[22m


##[error]AssertionError: expected [ Array(1) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "spec not reachable from any area: e2e/rail-first-paint.spec.ts",
+ ]

 ❯ scripts/e2e-select.test.ts:98:24



##[error]AssertionError: expected [ Array(1) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "ACR-6: src/components/shell/data-table.test.tsx:108, scripts/admin-tables.test.ts:34",
+ ]

 ❯ scripts/test-ids.test.ts:12:19



##[error]AssertionError: expected 'e2e/rail-first-paint.spec.ts#RFP-2:43…' to be '' // Object.is equality

- Expected
+ Received

+ e2e/rail-first-paint.spec.ts#RFP-2:43 reads a box by itself; compare boxes through layoutBoxes (e2e/helpers/ui.ts)
+ e2e/rail-first-paint.spec.ts#RFP-2:47 reads a box by itself; compare boxes through layoutBoxes (e2e/helpers/ui.ts)

 ❯ scripts/conformance/layout-reads.test.ts:99:75


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/3992c401-7245-4416-88ec-968abff7644d' before making global git config changes
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
    307.6 / 308 KiB  /admin/impersonation_/$sessionId
    276.6 / 277 KiB  /admin/legal
    276.0 / 277 KiB  /admin/legal_/$versionId
    282.2 / 283 KiB  /admin/legal_/edit
    352.9 / 353 KiB  /admin/listings

Per-page budget failed (D234):
  /admin/ai: 332.4 KiB, over its ceiling of 331 KiB
  /admin/places: 338.0 KiB, over its ceiling of 338 KiB
  /admin/translations: 408.2 KiB, over its ceiling of 408 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    376.3 / 379 KiB  /admin/listings_/$listingId
    399.7 / 403 KiB  /admin/listings_/$listingId_/edit
    268.6 / 270 KiB  /admin/locations
    338.0 / 338 KiB  /admin/places
    305.1 / 306 KiB  /admin/roles
    305.7 / 306 KiB  /admin/roles_/$roleId
    374.2 / 377 KiB  /admin/screening
    408.2 / 408 KiB  /admin/translations
    319.8 / 320 KiB  /admin/translations_/$lang
    303.5 / 304 KiB  /admin/users
    284.0 / 285 KiB  /admin/users_/$userId
    218.7 / 219 KiB  /auth
    207.0 / 208 KiB  /auth_/callback
    209.1 / 210 KiB  /auth_/reset
    219.5 / 220 KiB  /c/$slug
    221.9 / 223 KiB  /dev/primitives
    241.0 / 242 KiB  /dev/style
    206.4 / 207 KiB  /dev/tall
    247.8 / 251 KiB  /l/$slug
    209.9 / 211 KiB  /legal/$kind
    217.6 / 218 KiB  /legal/accept
    210.6 / 212 KiB  /legal/publishing
    326.6 / 327 KiB  /my-listings
    315.5 / 316 KiB  /my-listings_/$listingId
    394.4 / 397 KiB  /my-listings_/$listingId_/edit
    394.4 / 397 KiB  /post
    394.3 / 397 KiB  /post_/$listingId
    209.9 / 211 KiB  /privacy
    269.8 / 271 KiB  /settings
    209.9 / 211 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/0b9cc158-0e40-401d-83b0-8d89b3476b17' before making global git config changes
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
