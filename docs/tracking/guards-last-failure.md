# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40081788382
- Commit: `ee0cdc5629a1c641e17b6c3134de65b073d60104`
- Attempt: 1
- Written (UTC): 2026-10-24T09:41:45.812Z

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
Downloading a new version of Bun: https://github.com/oven-sh/bun/releases/download/bun-v1.4.4/bun-linux-x64.zip
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/b2186ddc-8906-492d-a30b-24814953a6fb.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.4+38afee6c8
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1736 keys across 542 files (395 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index 47122d6..aa0e5c9 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 538,
+  "scanned": 542,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index 47122d6..aa0e5c9 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 538,
+  "scanned": 542,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/cefe7125-9893-42e6-a152-85a7bb262f5a' before making global git config changes
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
src/routes/api/listings/publish.ts(50,27): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(51,17): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(51,63): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(52,17): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(52,61): error TS18046: 'body' is of type 'unknown'.
src/server/route.test.ts(85,21): error TS7006: Parameter 'ctx' implicitly has an 'any' type.
src/server/route.ts(274,27): error TS2322: Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'BlobPart'.
##[error]Process completed with exit code 2.
```

### Tail (last 60 lines)

```text
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

542 packages installed [14.47s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
src/routes/api/listings/publish.ts(50,27): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(51,17): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(51,63): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(52,17): error TS18046: 'body' is of type 'unknown'.
src/routes/api/listings/publish.ts(52,61): error TS18046: 'body' is of type 'unknown'.
src/server/route.test.ts(85,21): error TS7006: Parameter 'ctx' implicitly has an 'any' type.
src/server/route.ts(274,27): error TS2322: Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'BlobPart'.
  Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'ArrayBufferView<ArrayBuffer>'.
    Types of property 'buffer' are incompatible.
      Type 'ArrayBufferLike' is not assignable to type 'ArrayBuffer'.
        Type 'SharedArrayBuffer' is not assignable to type 'ArrayBuffer'.
          Types of property '[Symbol.toStringTag]' are incompatible.
            Type '"SharedArrayBuffer"' is not assignable to type '"ArrayBuffer"'.
##[error]Process completed with exit code 2.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/b50b525c-5695-4da8-a85f-1d1387e2fba6' before making global git config changes
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
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
dist/server/_ssr/app-rail-CT_osGPB.mjs                           55.87 kB │ gzip:  16.56 kB
dist/server/_ssr/server-aGOzagr_.mjs                             59.33 kB │ gzip:  15.46 kB
dist/server/_libs/@radix-ui/react-dropdown-menu+[...].mjs        61.73 kB │ gzip:  12.23 kB
dist/server/index.mjs                                            62.07 kB │ gzip:  14.23 kB
dist/server/_ssr/category-dialogs-v0DGeRji.mjs                   62.23 kB │ gzip:  14.79 kB
dist/server/_libs/tanstack__query-core.mjs                       74.06 kB │ gzip:  15.48 kB
dist/server/_ssr/admin.categories-Cmdsw8uA.mjs                   74.27 kB │ gzip:  17.74 kB
dist/server/_libs/supabase__realtime-js+unenv.mjs                78.40 kB │ gzip:  20.05 kB
dist/server/_ssr/listing-detail-CYxIMvdE.mjs                     79.61 kB │ gzip:  19.88 kB
dist/server/_ssr/admin.translations_._lang-DivKrGk2.mjs          81.93 kB │ gzip:  18.66 kB
dist/server/_libs/tailwind-merge.mjs                             85.65 kB │ gzip:  15.21 kB
dist/server/_libs/@radix-ui/react-alert-dialog+[...].mjs         86.50 kB │ gzip:  20.34 kB
dist/server/_ssr/attribute-dialogs-Bat65sSI.mjs                  87.51 kB │ gzip:  19.84 kB
dist/server/_libs/date-fns.mjs                                  104.02 kB │ gzip:  18.42 kB
dist/server/_libs/supabase__postgrest-js.mjs                    105.41 kB │ gzip:  21.66 kB
dist/server/_ssr/am-base-WWIbIc47.mjs                           106.02 kB │ gzip:  25.23 kB
dist/server/_ssr/en-admin-H-7Pr_EA.mjs                          111.92 kB │ gzip:  25.34 kB
dist/server/_libs/lucide-react.mjs                              117.13 kB │ gzip:  22.88 kB
dist/server/_libs/@supabase/storage-js+[...].mjs                119.50 kB │ gzip:  22.34 kB
dist/server/_libs/react-day-picker.mjs                          135.36 kB │ gzip:  26.50 kB
dist/server/_ssr/provider-BaFFr07Q.mjs                          137.28 kB │ gzip:  41.15 kB
dist/server/_ssr/am-admin-NOQx8WIR.mjs                          146.71 kB │ gzip:  31.15 kB
dist/server/_libs/zod.mjs                                       156.76 kB │ gzip:  35.67 kB
dist/server/_libs/leaflet.mjs                                   242.42 kB │ gzip:  54.53 kB
dist/server/_libs/supabase__auth-js.mjs                         302.37 kB │ gzip:  60.33 kB
dist/server/_libs/libphonenumber-js.mjs                         317.38 kB │ gzip:  62.73 kB
dist/server/_ssr/router-CABTWHtV.mjs                            425.87 kB │ gzip: 112.61 kB
dist/server/_ssr/wizard-BmwrBw_b.mjs                            493.39 kB │ gzip: 124.46 kB
dist/server/_libs/@tanstack/react-router+[...].mjs              752.27 kB │ gzip: 159.42 kB

[32m✓ built in 677ms[39m
[info] [nitro] Using auto generated worker name: `tesfayekb-ethio-marketplace`
[info] Generated [36mdist/server/wrangler.json[39m
[info] Generated [36m.wrangler/deploy/config.json[39m
[info] Generated [36mdist/client/_headers[39m
[info] Generated [36mdist/nitro.json[39m
[success] [nitro] You can preview this build using `npx vite preview`
[success] [nitro] You can deploy this build using `npx nitro deploy --prebuilt`
##[group]Run node scripts/check-bundle-size.mjs
[36;1mnode scripts/check-bundle-size.mjs[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Bundle budget: legal-page-data-C0y46PHl.js must stay lazy (INC-864) but sits in the first-paint closure of index-BtWnWSTN.js.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/84636cd9-38fa-4c73-a7ed-e7f00ff3216c' before making global git config changes
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
 [31m❯[39m scripts/conformance/routes.test.ts [2m([22m[2m6 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 23[2mms[22m[39m
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:69:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
 [31m❯[39m scripts/test-ids.test.ts [2m([22m[2m5 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 192[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/test-ids.test.ts[2m > [22mtest ids (INC-536)[2m > [22mTI-1 no test id is used twice in the repository
[41m[1m FAIL [22m[49m scripts/conformance/routes.test.ts[2m > [22mthe route boundary census (CF-RT)[2m > [22mCF-RT-5 the lint block's ignore list equals the allowlist's paths, both ways
[2m Test Files [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m233 passed[39m[22m[90m (235)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m1470 passed[39m[22m[90m (1472)[39m
##[error]AssertionError: expected [ …(3) ] to deeply equal []
##[error]AssertionError: expected [ …(2) ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    [90m122|[39m     expect([...allowSet].filter((path) => !lintSet.has(path))).toEqual…
    [90m123|[39m   })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯[22m[39m


[2m Test Files [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m233 passed[39m[22m[90m (235)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m1470 passed[39m[22m[90m (1472)[39m
[2m   Start at [22m 09:24:15
[2m   Duration [22m 146.37s[2m (transform 6.97s, setup 52.24s, import 45.42s, tests 48.98s, environment 241.19s)[22m


##[error]AssertionError: expected [ …(3) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "UP-1: src/server/supabase/upstream.test.ts:89, src/server/upstream.test.ts:16",
+   "UP-2: src/server/supabase/upstream.test.ts:123, src/server/upstream.test.ts:30",
+   "UP-3: src/server/supabase/upstream.test.ts:136, src/server/upstream.test.ts:55",
+ ]

 ❯ scripts/test-ids.test.ts:12:19



##[error]AssertionError: expected [ …(2) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "src/routes/l.$id.photo[[].[]]jpg.ts",
+   "src/routes/l.$id.qr[[].[]]svg.ts",
+ ]

 ❯ scripts/conformance/routes.test.ts:121:64


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/f8971d7b-6425-4a19-8c05-96807fa9f180' before making global git config changes
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
