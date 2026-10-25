# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40161655561
- Commit: `36c6b9fa276977f37858e467d47fd97f32bf0c0d`
- Attempt: 1
- Written (UTC): 2026-10-25T04:37:35.011Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
 [31m❯[39m src/server/ai/gateway.test.ts [2m([22m[2m28 tests[22m[2m | [22m[31m6 failed[39m[2m)[22m[32m 98[2mms[22m[39m
 [31m❯[39m src/server/media/policy.test.ts [2m([22m[2m20 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 45[2mms[22m[39m
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
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 4f7c281a-1169-4b22-99ed-84729e6fede5] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/conformance/routes.test.ts[2m [ scripts/conformance/routes.test.ts ][22m
[41m[1m FAIL [22m[49m scripts/conformance/vendor-seams.test.ts[2m [ scripts/conformance/vendor-seams.test.ts ][22m
[41m[1m FAIL [22m[49m src/server/ai/gateway.test.ts[2m > [22mthe one AI call[2m > [22mAIG-2 an E2E stand-in is parsed, metered and audited
[41m[1m FAIL [22m[49m src/server/ai/gateway.test.ts[2m > [22mthe one AI call[2m > [22mAIG-3 the same runtime flag cannot enable a stand-in in a normal build
[41m[1m FAIL [22m[49m src/server/ai/gateway.test.ts[2m > [22mthe one AI call[2m > [22mAIG-10 an audit-write failure logs once and preserves the answer
[41m[1m FAIL [22m[49m src/server/ai/gateway.test.ts[2m > [22mthe one AI call[2m > [22mAIG-16 a refused reservation asks no model, spends nothing and writes no row
[41m[1m FAIL [22m[49m src/server/ai/gateway.test.ts[2m > [22mthe one AI call[2m > [22mAIG-19 the writing helper refuses an answer carrying contact details
[41m[1m FAIL [22m[49m src/server/ai/gateway.test.ts[2m > [22mthe one AI call[2m > [22mAIG-20 the writing helper's stand-in answer is today's fake pair
[41m[1m FAIL [22m[49m src/server/media/policy.test.ts[2m > [22mthe screen's switch and cap through the gateway (D158, D184)[2m > [22mPPOL-19 the site's spent day cap holds the photo, logged, before any provider call (D184)
[2m Test Files [22m [1m[31m4 failed[39m[22m[2m | [22m[1m[32m273 passed[39m[22m[90m (277)[39m
[2m      Tests [22m [1m[31m7 failed[39m[22m[2m | [22m[1m[32m1716 passed[39m[22m[90m (1723)[39m
##[error]Error: scripts/conformance/routes-allowlist.txt:5 stale allowance: src/routes/api/admin/categories/generate-image.ts | staff AI route not yet on defineRoute | INC-861
##[error]Error: scripts/conformance/vendor-seams-allowlist.txt:50 stale allowance: src/routes/api/admin/categories/generate-image.ts | direct vendor use before DEC-250 | INC-877
##[error]AssertionError: expected { ok: true, value: { …(2) }, …(2) } to deeply equal { ok: true, value: { …(2) }, …(1) }
##[error]AssertionError: expected { ok: true, …(3) } to deeply equal { ok: true, …(2) }
##[error]AssertionError: expected { ok: true, …(3) } to deeply equal { ok: true, …(2) }
##[error]AssertionError: expected { ok: true, value: { …(2) }, …(2) } to deeply equal { ok: true, value: { …(2) }, …(1) }
##[error]AssertionError: expected { ok: true, value: { …(2) }, …(2) } to deeply equal { ok: true, value: { …(2) }, …(1) }
##[error]AssertionError: expected { ok: true, value: { …(2) }, …(2) } to deeply equal { ok: true, value: { …(2) }, …(1) }
##[error]AssertionError: expected { kind: 'verdict', …(1) } to deeply equal { kind: 'held' }
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

 ❯ src/server/ai/gateway.test.ts:343:66



##[error]AssertionError: expected { ok: true, value: { …(2) }, …(2) } to deeply equal { ok: true, value: { …(2) }, …(1) }

- Expected
+ Received

@@ -1,7 +1,8 @@
  {
    "fake": true,
+   "latencyMs": 0,
    "ok": true,
    "value": {
      "description": "Version 1. cars — My car · toyota. Nothing beyond these facts is claimed.",
      "title": "cars My car (1)",
    },

 ❯ src/server/ai/gateway.test.ts:352:66



##[error]AssertionError: expected { kind: 'verdict', …(1) } to deeply equal { kind: 'held' }

- Expected
+ Received

  {
-   "kind": "held",
+   "kind": "verdict",
+   "verdict": {
+     "code": "providerUnavailable",
+     "evidence": "screening is unavailable",
+     "ok": false,
+   },
  }

 ❯ src/server/media/policy.test.ts:442:82


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/9b069e83-ae4d-4463-83e9-b9f0e8ebba35' before making global git config changes
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
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/e6230495-579d-4595-9cad-4b224992d916.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.4+38afee6c8
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1736 keys across 563 files (395 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index 214920c..ffc0d6e 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 562,
+  "scanned": 563,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index 214920c..ffc0d6e 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 562,
+  "scanned": 563,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/6539ed4a-f097-4dbd-b7b6-ca3c469c1135' before making global git config changes
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
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
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

542 packages installed [12.12s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
##[group]Run bun run format:check
[36;1mbun run format:check[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ prettier --check "src/**" "e2e/**" "docs/**" "*.{json,js,ts,md}"
Checking formatting...
[[33mwarn[39m] src/lib/schemas/category-image.ts
[[33mwarn[39m] src/routes/api/admin/categories/generate-image.ts
[[33mwarn[39m] src/server/ai/gateway.census.test.ts
[[33mwarn[39m] src/server/ai/gateway.test.ts
[[33mwarn[39m] src/server/ai/gateway.ts
[[33mwarn[39m] src/server/ai/providers/gemini.ts
[[33mwarn[39m] src/server/ai/tasks.ts
[[33mwarn[39m] src/server/ai/template.ts
[[33mwarn[39m] src/server/media/background.test.ts
[[33mwarn[39m] Code style issues found in 9 files. Run Prettier with --write to fix.
error: script "format:check" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/f833d236-ffe7-41c2-87e7-1e2a1359a8c5' before making global git config changes
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
