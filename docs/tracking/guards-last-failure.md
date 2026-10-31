# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41190843148
- Commit: `b2bbc9f339d21280ef244e38ce7324888e7fc0d4`
- Attempt: 1
- Written (UTC): 2026-10-31T10:19:32.133Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 1104[2mms[22m[39m
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
     [33m[2m✓[22m[39m OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu [33m 351[2mms[22m[39m
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1990[2mms[22m[39m
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 605b2428-92cf-47f6-b352-701659abd7c2] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 386[2mms[22m[39m
 [31m❯[39m scripts/test-ids.test.ts [2m([22m[2m6 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 318[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
 [31m❯[39m src/lib/themes.test.ts [2m([22m[2m5 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 48[2mms[22m[39m
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 306[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/test-ids.test.ts[2m > [22mtest ids (INC-536)[2m > [22mTI-1 no test id is used twice in the repository
[41m[1m FAIL [22m[49m src/lib/themes.test.ts[2m > [22mTHEMES[2m > [22mTH-2 THEMES.sage.dark equals .dark, name by name, both ways
[2m Test Files [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m398 passed[39m[22m[90m (400)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m2423 passed[39m[22m[90m (2425)[39m
##[error]AssertionError: expected [ …(2) ] to deeply equal []
##[error]AssertionError: expected { …(97) } to deeply equal { …(97) }
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
- Expected
+ Received

- []
+ [
+   "DC-1: src/server/door.test.ts:37, e2e/dark-cards.spec.ts:18",
+   "DC-2: src/server/door.test.ts:48, e2e/dark-cards.spec.ts:91",
+ ]

 ❯ scripts/test-ids.test.ts:12:19



##[error]AssertionError: expected { …(97) } to deeply equal { …(97) }

- Expected
+ Received

@@ -77,17 +77,17 @@
    "sidebar-primary-foreground": "oklch(0.202 0.025 162.8)",
    "sidebar-ring": "oklch(0.777 0.09 162.9)",
    "success": "oklch(0.777 0.09 162.9)",
    "success-line": "oklch(0.382 0.042 161.8)",
    "success-soft": "oklch(0.273 0.024 164.2)",
-   "tier-featured": "oklch(0.312 0.032 162.1)",
+   "tier-featured": "oklch( 0.312 0.032 162.1 )",
    "tier-featured-fold": "oklch(0.442 0.063 163)",
    "tier-featured-frame": "oklch(0.634 0.093 163.1)",
    "tier-featured-ink": "oklch(0.777 0.09 162.9)",
    "tier-featured-rule": "oklch(0.382 0.042 161.8)",
    "tier-featured-star": "oklch(0.634 0.093 163.1)",
-   "tier-premium": "oklch(0.305 0.032 78)",
+   "tier-premium": "oklch( 0.305 0.032 78 )",
    "tier-premium-chip": "oklch(0.308 0.043 84.2)",
    "tier-premium-fold": "oklch(0.651 0.116 79.1)",
    "tier-premium-frame": "oklch(0.708 0.12 78.6)",
    "tier-premium-ink": "oklch(0.801 0.127 82.7)",
    "tier-premium-rule": "oklch(0.379 0.052 84.8)",

 ❯ src/lib/themes.test.ts:45:39


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/ef6f1478-c70f-4a2a-b3d2-ccd38ecc2060' before making global git config changes
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

## Semgrep (enforcing on ERROR) — failure

### Evidence lines

```text
Complete job name: Semgrep (enforcing on ERROR)
[36;1m  --config /tmp/semgrep-rules/javascript --severity ERROR --json \[0m
[36;1m  --severity ERROR --severity WARNING \[0m
[36;1m# ERROR, WARNINGs outside test code, no reviewed (suppressed) site.[0m
Self-test OK: an ERROR in test code is kept; a WARNING in test code is dropped; a suppressed result is dropped; a WARNING in product code is kept.
Semgrep counts: ERROR=2 WARNING kept=2 WARNING dropped as test code=43 suppressed=10
##[error]Semgrep: 2 ERROR finding(s). Bodies are not printed in this log (DEC-132 rule 2). Reproduce locally with the pinned version and rules, or read Security → Code scanning (branch dev, tool Semgrep).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 • Scan skipped: 
   ◦ Matching --exclude patterns: 2
   ◦ Files matching .semgrepignore patterns: 13
 • Scan was limited to files tracked by git
 • For a detailed list of skipped files and lines, run semgrep with the --verbose flag
Ran 234 rules on 1319 files: 47 findings.
Self-test OK: an ERROR in test code is kept; a WARNING in test code is dropped; a suppressed result is dropped; a WARNING in product code is kept.
Semgrep counts: ERROR=2 WARNING kept=2 WARNING dropped as test code=43 suppressed=10
##[error]Semgrep: 2 ERROR finding(s). Bodies are not printed in this log (DEC-132 rule 2). Reproduce locally with the pinned version and rules, or read Security → Code scanning (branch dev, tool Semgrep).
##[error]Process completed with exit code 1.
##[group]Run github/codeql-action/upload-sarif@v3
with:
  sarif_file: semgrep.sarif
  category: semgrep
  checkout_path: /home/runner/work/ethio-marketplace/ethio-marketplace
  token: ***
  matrix: null
  wait-for-processing: true
env:
  SEMGREP_VERSION: 1.179.0
  SEMGREP_RULES_SHA: a84ff9cc2453ca91d581380de4b8b3f272f6f4be
  pythonLocation: /opt/hostedtoolcache/Python/3.12.15/x64
  PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.12.15/x64/lib/pkgconfig
  Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.12.15/x64
  Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.12.15/x64
  Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.12.15/x64
  LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.12.15/x64/lib
##[endgroup]
Job run UUID is 3ebfd021-4540-4a9f-9a9e-d82150ca0fcd.
##[warning]CodeQL Action v3 will be deprecated in December 2026. Please update all occurrences of the CodeQL Action in your workflow files to v4. For more information, see https://github.blog/changelog/2025-10-28-upcoming-deprecation-of-codeql-action-v3/
Post-processing sarif files: ["semgrep.sarif"]
Validating semgrep.sarif
Adding fingerprints to SARIF file. See https://docs.github.com/en/code-security/reference/code-scanning/sarif-support-for-code-scanning#data-for-preventing-duplicated-alerts for more information.
##[group]Uploading code scanning results
Uploading results
Successfully uploaded results
##[endgroup]
##[group]Waiting for processing to finish
Analysis upload status is complete.
##[endgroup]
Post job cleanup.
##[group]Uploading combined SARIF debug artifact
##[endgroup]
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/948512ba-7785-47a1-9066-a8a1a8c43205' before making global git config changes
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
##[warning]Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/setup-python@v5, github/codeql-action/upload-sarif@v3. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/

```
