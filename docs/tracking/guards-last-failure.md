# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40158209070
- Commit: `9c9f54b755de8294d6f8b60ae4f833f51407f1cb`
- Attempt: 1
- Written (UTC): 2026-10-25T03:44:15.978Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
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
 [31m❯[39m src/server/media/policy.test.ts [2m([22m[2m17 tests[22m[2m | [22m[31m11 failed[39m[2m)[22m[32m 24[2mms[22m[39m
 [31m❯[39m src/server/media/background-route.test.ts [2m([22m[2m8 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 74[2mms[22m[39m
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident c26d3fb1-7257-45d3-b564-51cb5385eb9f] ReaderError: feed_page: marker-text-that-must-not-travel
 [31m❯[39m src/server/ai/gateway.census.test.ts [2m([22m[2m7 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 35[2mms[22m[39m
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
 [31m❯[39m src/server/media/background.test.ts [2m([22m[2m4 tests[22m[2m | [22m[31m3 failed[39m[2m)[22m[32m 31[2mms[22m[39m
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
 [31m❯[39m src/lib/untrusted-text.test.ts [2m([22m[2m5 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 60[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [31m❯[39m src/server/media/hold.test.ts [2m([22m[2m8 tests[22m[2m | [22m[31m5 failed[39m[2m)[22m[32m 18[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
 [31m❯[39m scripts/conformance/vendor-seams.test.ts [2m([22m[2m3 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 16[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/conformance/vendor-seams.test.ts[2m > [22mvendor seams conformance[2m > [22mVS-1 no file outside the four seams reaches Supabase directly without an allowlist line
[41m[1m FAIL [22m[49m src/lib/untrusted-text.test.ts[2m > [22ma person's words reach a model as material only (D166)[2m > [22mUNT-4 every file that calls a model takes this module; the four calls are the census
[41m[1m FAIL [22m[49m src/server/ai/gateway.census.test.ts[2m > [22mAI gateway conformance[2m > [22mGWC-4 tasks bound deadlines and every string output and close instructions
[41m[1m FAIL [22m[49m src/server/media/background-route.test.ts[2m > [22mPOST /api/listings/background (D155b / D159)[2m > [22mBGR-5 the switch comes first: off is featureOff, unreadable is providerUnavailable, no key is featureOff — and none spends a dial or reads a row
[31m+   "ai background_removal ai audit background_removal featureOff: write failed",[39m
[31m+   "ai background_removal ai audit background_removal unavailable: write failed",[39m
[31m+   "ai background_removal ai audit background_removal featureOff: write failed",[39m
[41m[1m FAIL [22m[49m src/server/media/background.test.ts[2m > [22mbackground removal — the provider (D155b / D159)[2m > [22mBGR-1 fake mode's cut-out is a 400 x 300 PNG with an alpha channel, asked for by either flag
[41m[1m FAIL [22m[49m src/server/media/background.test.ts[2m > [22mbackground removal — the provider (D155b / D159)[2m > [22mBGR-2 Photoroom gets the image only, with the key in its header, asked for a WebP cut-out on a transparent ground
[41m[1m FAIL [22m[49m src/server/media/background.test.ts[2m > [22mbackground removal — the provider (D155b / D159)[2m > [22mBGR-3 a refusal, an answer that is not an image, an empty or oversized answer, or no network is no cut-out, and each is logged
[41m[1m FAIL [22m[49m src/server/media/hold.test.ts[2m > [22mphotoScreenPlan (D158)[2m > [22mPH-1 on: every photo is screened
[41m[1m FAIL [22m[49m src/server/media/hold.test.ts[2m > [22mphotoScreenPlan (D158)[2m > [22mPH-2 off by staff: the photo is held, on any ad (bundle 16 turn 4a: staff see every held photo)
[41m[1m FAIL [22m[49m src/server/media/hold.test.ts[2m > [22mphotoScreenPlan (D158)[2m > [22mPH-3 a switch that could not be read fails closed
[41m[1m FAIL [22m[49m src/server/media/hold.test.ts[2m > [22mphotoScreenPlan (D158)[2m > [22mPH-4 off by budget (D184): held, as off by staff
[41m[1m FAIL [22m[49m src/server/media/hold.test.ts[2m > [22mphotoScreenPlan (D158)[2m > [22mPH-5 the site's day cap (D184): a spent cap turns an open gate into off by budget; any other gate is kept
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-5 sends the cover, the card and the thumb in one call, in that order, with their types
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-6 refuses an upload whose smaller copy shows a different picture
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-9 sends the middle size second when it is stored: cover, middle, card, thumb (D162)
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-10 shows the photo at the default detail and every smaller copy at low detail (D165)
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-11 a model that refuses the low detail is asked once more with every image at the default detail, and the log says so (D165)
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-12 any other provider failure is not asked again: the upload is refused providerUnavailable (D165)
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo policy pass screens every stored size (INC-601)[2m > [22mPPOL-8 keeps fake mode on the cover's width, so no test run reaches the provider
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo screen's relevance warning (D154 B3)[2m > [22mPPOL-14 the ad's category and title travel first, quoted and clipped; nothing is sent without them
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo screen's relevance warning (D154 B3)[2m > [22mPPOL-15 an allowed photo keeps its known warnings; an unknown one is dropped and logged
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo screen's relevance warning (D154 B3)[2m > [22mPPOL-16 fake mode warns on a cover exactly 17 px wide, and still refuses at 13 px
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe photo screen's relevance warning (D154 B3)[2m > [22mPPOL-17 an unsure photo keeps the phrase that says why; fake mode answers unsure at 19 px and nudity at 11 px (bundle 16 turn 4a)
[2m Test Files [22m [1m[31m7 failed[39m[22m[2m | [22m[1m[32m270 passed[39m[22m[90m (277)[39m
[2m      Tests [22m [1m[31m23 failed[39m[22m[2m | [22m[1m[32m1702 passed[39m[22m[90m (1725)[39m
##[error]AssertionError: expected [ { …(3) } ] to deeply equal []
##[error]AssertionError: expected [ …(2) ] to deeply equal [ …(3) ]
##[error]AssertionError: expected true to be false // Object.is equality
##[error]AssertionError: expected [ …(4) ] to deeply equal [ Array(1) ]
+   "ai background_removal ai audit background_removal featureOff: write failed",
+   "ai background_removal ai audit background_removal unavailable: write failed",
+   "ai background_removal ai audit background_removal featureOff: write failed",
##[error]TypeError: fakeCutout is not a function
##[error]TypeError: cutOut is not a function
##[error]TypeError: cutOut is not a function
##[error]TypeError: photoScreenPlan is not a function
##[error]TypeError: photoScreenPlan is not a function
##[error]TypeError: photoScreenPlan is not a function
##[error]TypeError: photoScreenPlan is not a function
##[error]TypeError: withSiteCap is not a function
##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
```

### Tail (last 60 lines)

```text


##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
 ❯ screenPhotoPolicy src/server/media/policy.ts:203:20
 ❯ src/server/media/policy.test.ts:173:18



##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
 ❯ screenPhotoPolicy src/server/media/policy.ts:203:20
 ❯ src/server/media/policy.test.ts:187:18



##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
 ❯ screenPhotoPolicy src/server/media/policy.ts:203:20
 ❯ src/server/media/policy.test.ts:199:18



##[error]TypeError: contextPart is not a function
 ❯ src/server/media/policy.test.ts:264:12



##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
 ❯ screenPhotoPolicy src/server/media/policy.ts:203:20
 ❯ src/server/media/policy.test.ts:282:18



##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
 ❯ screenPhotoPolicy src/server/media/policy.ts:203:20
 ❯ src/server/media/policy.test.ts:296:18



##[error]TypeError: Cannot read properties of undefined (reading 'actorId')
 ❯ screenPhotoPolicy src/server/media/policy.ts:203:20
 ❯ src/server/media/policy.test.ts:315:18


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/a08ba606-2255-4eca-ba4b-a39b677f0316' before making global git config changes
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
Downloading a new version of Bun: https://github.com/oven-sh/bun/releases/download/bun-v1.4.4/bun-linux-x64.zip
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/d2e0deab-d9ae-4af8-8f89-9c75f7678644.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.4+38afee6c8
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1736 keys across 562 files (395 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index e0fa4e6..214920c 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 561,
+  "scanned": 562,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index e0fa4e6..214920c 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 561,
+  "scanned": 562,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/4d18b74d-69de-4db3-bd69-9d8cf61f322b' before making global git config changes
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
src/server/ai/gateway.test.ts(217,42): error TS2344: Type '"category_icon" | "name_check" | "writing_helper"' does not satisfy the constraint '"Expected: literal string: category_icon, Actual: literal string: photo_screen" | "Expected: literal string: category_icon, Actual: literal string: background_removal" | "Expected: literal string: name_check, Actual: literal string: photo_screen" | "Expected: literal string: name_check, Actual: literal string: backg...'.
src/server/media/background.test.ts(4,3): error TS2305: Module '"./background"' has no exported member 'cutOut'.
src/server/media/background.test.ts(6,3): error TS2305: Module '"./background"' has no exported member 'fakeCutout'.
src/server/media/background.test.ts(7,3): error TS2305: Module '"./background"' has no exported member 'isBackgroundFake'.
src/server/media/background.test.ts(8,3): error TS2305: Module '"./background"' has no exported member 'MAX_CUTOUT_BYTES'.
src/server/media/background.test.ts(10,3): error TS2305: Module '"./background"' has no exported member 'PHOTOROOM_SEGMENT_URL'.
src/server/media/hold.test.ts(3,24): error TS2305: Module '"./hold"' has no exported member 'photoScreenPlan'.
src/server/media/hold.test.ts(3,60): error TS2305: Module '"./hold"' has no exported member 'withSiteCap'.
src/server/media/policy.test.ts(4,3): error TS2305: Module '"./policy"' has no exported member 'contextPart'.
src/server/media/policy.test.ts(84,27): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(97,27): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(119,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(133,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(173,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(187,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(199,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(201,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(271,51): error TS2561: Object literal may only specify known properties, but 'category' does not exist in type '{ actorId: string | null; path: string; supabase: SupabaseClient<Database, "public", "public", { Tables: { ai_calls: { Row: { actor_id: string | null; created_at: string; fake: boolean; feature: string; ... 8 more ...; updated_at: string; }; Insert: { ...; }; Update: { ...; }; Relationships: [...]; }; ... 78 more .....'. Did you mean to write 'categoryId'?
src/server/media/policy.test.ts(282,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(288,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(296,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(301,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(315,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(321,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(329,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(335,18): error TS2554: Expected 3 arguments, but got 2.
##[error]Process completed with exit code 2.
```

### Tail (last 60 lines)

```text
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@4.6.7

542 packages installed [12.91s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
src/server/ai/gateway.test.ts(217,42): error TS2344: Type '"category_icon" | "name_check" | "writing_helper"' does not satisfy the constraint '"Expected: literal string: category_icon, Actual: literal string: photo_screen" | "Expected: literal string: category_icon, Actual: literal string: background_removal" | "Expected: literal string: name_check, Actual: literal string: photo_screen" | "Expected: literal string: name_check, Actual: literal string: backg...'.
  Type '"category_icon"' is not assignable to type '"Expected: literal string: category_icon, Actual: literal string: photo_screen" | "Expected: literal string: category_icon, Actual: literal string: background_removal" | "Expected: literal string: name_check, Actual: literal string: photo_screen" | "Expected: literal string: name_check, Actual: literal string: backg...'.
src/server/media/background.test.ts(4,3): error TS2305: Module '"./background"' has no exported member 'cutOut'.
src/server/media/background.test.ts(6,3): error TS2305: Module '"./background"' has no exported member 'fakeCutout'.
src/server/media/background.test.ts(7,3): error TS2305: Module '"./background"' has no exported member 'isBackgroundFake'.
src/server/media/background.test.ts(8,3): error TS2305: Module '"./background"' has no exported member 'MAX_CUTOUT_BYTES'.
src/server/media/background.test.ts(10,3): error TS2305: Module '"./background"' has no exported member 'PHOTOROOM_SEGMENT_URL'.
src/server/media/hold.test.ts(3,24): error TS2305: Module '"./hold"' has no exported member 'photoScreenPlan'.
src/server/media/hold.test.ts(3,60): error TS2305: Module '"./hold"' has no exported member 'withSiteCap'.
src/server/media/policy.test.ts(4,3): error TS2305: Module '"./policy"' has no exported member 'contextPart'.
src/server/media/policy.test.ts(84,27): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(97,27): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(119,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(133,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(173,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(187,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(199,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(201,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(271,51): error TS2561: Object literal may only specify known properties, but 'category' does not exist in type '{ actorId: string | null; path: string; supabase: SupabaseClient<Database, "public", "public", { Tables: { ai_calls: { Row: { actor_id: string | null; created_at: string; fake: boolean; feature: string; ... 8 more ...; updated_at: string; }; Insert: { ...; }; Update: { ...; }; Relationships: [...]; }; ... 78 more .....'. Did you mean to write 'categoryId'?
src/server/media/policy.test.ts(282,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(288,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(296,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(301,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(315,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(321,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(329,18): error TS2554: Expected 3 arguments, but got 2.
src/server/media/policy.test.ts(335,18): error TS2554: Expected 3 arguments, but got 2.
##[error]Process completed with exit code 2.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/10b4df3b-47f4-47a3-ac2f-a4d6e8a96175' before making global git config changes
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

## E2E (Playwright, ethio-staging) — failure

### Evidence lines

```text
[36;1m  || echo "::warning::DEC-030 flake-ledger pass failed"[0m
[36;1mPUBLISH_EVIDENCE_PREPARE='if [ -f "$EVIDENCE_DIR/docs/tracking/flake-ledger.md" ]; then cp "$EVIDENCE_DIR/docs/tracking/flake-ledger.md" docs/tracking/flake-ledger.md && { E2E_FLAKE_ONLY=1 bun scripts/e2e-failure-report.ts || echo "::warning::DEC-030 flake-ledger re-append failed"; }; fi' \[0m
[36;1m  echo "::error::E2E failure reporter self-test failed (exit ${selftest})"[0m
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[36;1m  exit "$reporter"[0m
[36;1mfi[0m
[36;1mexit 0[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_RESULTS_DIR: shard-results
  E2E_LOGS_DIR: shard-logs
  E2E_CONTEXT_DIR: shard-contexts
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40158209070
  E2E_HEAD_COMMIT_MESSAGE: Added photo screening tasks

X-Lovable-Edit-ID: edt-073b86b2-544b-44ed-b799-b651449e327c
Co-authored-by: tesfayekb <tesfayekb@me.com>
##[endgroup]
  layout OK — per-artifact subdir: 1 context file(s), report rendered.
  layout OK — merged flat: 1 context file(s), report rendered.
  layout OK — zero artifacts: 0 context file(s), report rendered.
  layout OK — missing directory: 0 context file(s), report rendered.
DEC-078: flaky body rendered after the ledger; ledger line byte-identical; cap flip of 11 rendered 10 bodies + 1 "body omitted: cap".
DEC-078 part 2: green form carries passed → Flake ledger → Flaky bodies → the flipped first line; a clean green renders non-gating): 0 and no flake section.
ok — R1a census names the missing log
ok — R1a a11y never states zero with a gap
ok — R1b census: all N logs read
ok — R1b a11y: all N logs read
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
context download: 0 context files found.
  glob: shard-contexts/**/error-context.md
  searched: shard-contexts (unreadable or absent)
Wrote docs/tracking/e2e-last-failure.md (18/18 source(s) with usable results, 0 context file(s) found).
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "lanes=failure"
[36;1mecho "lanes=failure"[0m
[36;1mif [ "failure" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "Every temporary-backend lane passed (the email lane included)."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/79b45159-926b-4496-a112-16c22ea13b71' before making global git config changes
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
