# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40809236156
- Commit: `c7bb093ae4d52fe53b186c0244c285c17ab791e0`
- Attempt: 1
- Written (UTC): 2026-10-29T03:26:42.596Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 479[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
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
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1112[2mms[22m[39m
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 1021ebf6-d929-4e18-991b-e70820272214] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
 [31m❯[39m scripts/conformance/agents-lines.test.ts [2m([22m[2m3 tests[22m[2m | [22m[31m2 failed[39m[2m)[22m[32m 20[2mms[22m[39m
 [31m❯[39m scripts/conformance/non-null.test.ts [2m([22m[2m2 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 2305[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 350[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 304[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/conformance/agents-lines.test.ts[2m > [22mAGENTS.md stays inside its budget and points only to files that exist (G55)[2m > [22mAGL-1 every path and file name AGENTS.md points to exists
[41m[1m FAIL [22m[49m scripts/conformance/agents-lines.test.ts[2m > [22mAGENTS.md stays inside its budget and points only to files that exist (G55)[2m > [22mAGL-2 AGENTS.md after its LOVABLE block stays inside the 5,120-byte budget, or a recorded exception holds its count
[41m[1m FAIL [22m[49m scripts/conformance/non-null.test.ts[2m > [22mno new non-null assertion (the executor's platform rule; turn K2)[2m > [22mCF-NN-1 every file holds no more non-null assertions than its allowlist line, and the kit none
[2m Test Files [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m351 passed[39m[22m[90m (353)[39m
[2m      Tests [22m [1m[31m3 failed[39m[22m[2m | [22m[1m[32m2114 passed[39m[22m[90m (2117)[39m
##[error]AssertionError: expected 'AGENTS.md:23 names local-backend-proo…' to be '' // Object.is equality
##[error]Error: scripts/conformance/agents-lines-allowlist.txt:3 stale allowance: AGENTS.md (9409) | over the 5,120-byte budget recorded at S326 (INC-735) since turn 33's exception (S384) replaced the file whole; the no-agents-change flag closes AGENTS.md to this turn, so the budget in force is held for the supervisor's ruling (Foundations turn C3) | 2026-12-31
##[error]Error: scripts/conformance/non-null-allowlist.txt:68 stale allowance: scripts/e2e-failure-report.ts (8) | non-null assertions written before the platform rule was enforced | INC-932
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    [90m   |[39m               [31m^[39m
    [90m 62|[39m       }[33m;[39m
    [90m 63|[39m       if (cells.length !== 3 || cells.some((cell) => !cell)) fail("exp…
[90m [2m❯[22m scripts/conformance/kit.ts:[2m72:27[22m[39m
[90m [2m❯[22m readAllowlist scripts/conformance/kit.ts:[2m56:6[22m[39m
[90m [2m❯[22m scripts/conformance/non-null.test.ts:[2m77:23[22m[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯[22m[39m


[2m Test Files [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m351 passed[39m[22m[90m (353)[39m
[2m      Tests [22m [1m[31m3 failed[39m[22m[2m | [22m[1m[32m2114 passed[39m[22m[90m (2117)[39m
[2m   Start at [22m 03:06:46
[2m   Duration [22m 147.81s[2m (transform 7.80s, setup 90.71s, import 40.04s, tests 75.76s, environment 193.43s)[22m


##[error]AssertionError: expected 'AGENTS.md:23 names local-backend-proo…' to be '' // Object.is equality

- Expected
+ Received

+ AGENTS.md:23 names local-backend-proof.md, which no file in the repository is

 ❯ scripts/conformance/agents-lines.test.ts:79:67



##[error]Error: scripts/conformance/agents-lines-allowlist.txt:3 stale allowance: AGENTS.md (9409) | over the 5,120-byte budget recorded at S326 (INC-735) since turn 33's exception (S384) replaced the file whole; the no-agents-change flag closes AGENTS.md to this turn, so the budget in force is held for the supervisor's ruling (Foundations turn C3) | 2026-12-31
 ❯ fail scripts/conformance/kit.ts:61:15
 ❯ scripts/conformance/kit.ts:72:27
 ❯ readAllowlist scripts/conformance/kit.ts:56:6
 ❯ scripts/conformance/agents-lines.test.ts:87:24



##[error]Error: scripts/conformance/non-null-allowlist.txt:68 stale allowance: scripts/e2e-failure-report.ts (8) | non-null assertions written before the platform rule was enforced | INC-932
 ❯ fail scripts/conformance/kit.ts:61:15
 ❯ scripts/conformance/kit.ts:72:27
 ❯ readAllowlist scripts/conformance/kit.ts:56:6
 ❯ scripts/conformance/non-null.test.ts:77:23


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/16ef41cc-252f-4407-9723-bb00d0d97117' before making global git config changes
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
