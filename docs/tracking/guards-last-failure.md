# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40162977274
- Commit: `57d0fe58d57fef7d8be24f0bb5ddf74db2e72760`
- Attempt: 1
- Written (UTC): 2026-10-25T05:01:44.736Z

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
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/4837879f-1665-475a-9d56-b8269fad0204.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.4+38afee6c8
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1736 keys across 559 files (395 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index 214920c..6d8dc30 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 562,
+  "scanned": 559,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index 214920c..6d8dc30 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 562,
+  "scanned": 559,
   "dynamicCallSites": 395,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/f8c63c45-3928-405d-8260-9c366b0caaed' before making global git config changes
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
##[error]Unexplained deletions in 36c6b9fa276977f37858e467d47fd97f32bf0c0d..HEAD (INC-076).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 * [new branch]        lovable-sync-1788764600 -> origin/lovable-sync-1788764600
 * [new branch]        lovable-sync-1789741128 -> origin/lovable-sync-1789741128
 * [new branch]        lovable-sync-1790153551 -> origin/lovable-sync-1790153551
 * [new branch]        lovable-sync-1790668701 -> origin/lovable-sync-1790668701
 * [new branch]        lovable-sync-1790806349 -> origin/lovable-sync-1790806349
 * [new branch]        lovable-sync-1790807903 -> origin/lovable-sync-1790807903
 * [new branch]        lovable-sync-1790881191 -> origin/lovable-sync-1790881191
 * [new branch]        lovable-sync-1790889145 -> origin/lovable-sync-1790889145
 * [new branch]        main                    -> origin/main
[command]/usr/bin/git branch --list --remote origin/dev
  origin/dev
[command]/usr/bin/git rev-parse refs/remotes/origin/dev
57d0fe58d57fef7d8be24f0bb5ddf74db2e72760
##[endgroup]
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force -B dev refs/remotes/origin/dev
Switched to a new branch 'dev'
branch 'dev' set up to track 'origin/dev'.
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
57d0fe58d57fef7d8be24f0bb5ddf74db2e72760
##[group]Run SELF_TEST=1 bash scripts/check-deletions.sh
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: 36c6b9fa276977f37858e467d47fd97f32bf0c0d
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
##[error]Unexplained deletions in 36c6b9fa276977f37858e467d47fd97f32bf0c0d..HEAD (INC-076).
The following files were deleted with no [intentional-delete] marker in any commit
message and no path line added to docs/tracking/intentional-deletions.txt by this range:
src/server/category-images/fixture.ts
src/server/category-images/gate.ts
src/server/category-images/gemini.ts
src/server/category-images/prompt.ts
If the removal is intended, say so in the commit message or add the path to
docs/tracking/intentional-deletions.txt in the same push; otherwise you are pushing from a stale
checkout and are about to erase someone's work.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/5f31b662-61af-489e-9b9e-572e8a5be2bc' before making global git config changes
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
 [31m❯[39m scripts/conformance/routes.test.ts [2m([22m[2m8 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 16[2mms[22m[39m
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 04e725f8-5eb6-4d95-9b48-a524cf0f8f4c] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/conformance/routes.test.ts[2m > [22mthe route boundary census (CF-RT)[2m > [22mCF-RT-5 the lint block's ignore list equals the allowlist's paths, both ways
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m276 passed[39m[22m[90m (277)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m1741 passed[39m[22m[90m (1742)[39m
##[error]AssertionError: expected [ …(3) ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   "src/routes/api/admin/categories/generate-image.ts",[39m
[31m+   "src/server/category-images/gate.ts",[39m
[31m+   "src/server/category-images/gemini.ts",[39m
[31m+ ][39m

[36m [2m❯[22m scripts/conformance/routes.test.ts:[2m138:64[22m[39m
    [90m136|[39m     )[33m;[39m
    [90m137|[39m     [35mconst[39m allowSet [33m=[39m [35mnew[39m [33mSet[39m([33mALLOWED[39m[33m.[39m[34mkeys[39m())[33m;[39m
    [90m138|[39m     expect([...lintSet].filter((path) => !allowSet.has(path))).toEqual…
    [90m   |[39m                                                                [31m^[39m
    [90m139|[39m     expect([...allowSet].filter((path) => !lintSet.has(path))).toEqual…
    [90m140|[39m   })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m276 passed[39m[22m[90m (277)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m1741 passed[39m[22m[90m (1742)[39m
[2m   Start at [22m 04:44:48
[2m   Duration [22m 127.14s[2m (transform 6.90s, setup 45.22s, import 44.93s, tests 39.84s, environment 208.19s)[22m


##[error]AssertionError: expected [ …(3) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "src/routes/api/admin/categories/generate-image.ts",
+   "src/server/category-images/gate.ts",
+   "src/server/category-images/gemini.ts",
+ ]

 ❯ scripts/conformance/routes.test.ts:138:64


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/f3fa402d-5a94-49b0-b91f-3c5a9de85799' before making global git config changes
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
