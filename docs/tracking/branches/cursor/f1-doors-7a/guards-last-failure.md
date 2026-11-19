# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44593520490
- Commit: `6013d44155e4ea0d3ad6f98d67f2557d7e1bb048`
- Attempt: 1
- Written (UTC): 2026-11-19T19:50:35.672Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 520[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2038[2mms[22m[39m
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
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1312[2mms[22m[39m
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident ce0408bf-f3c9-40c0-aed9-54a4dcbe2e53] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident f911843a-1997-4435-8d71-8a551661fb92] Error: feed_page returned no page
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[ssr-error] /api/attributes/$id/options [incident 2e65385b-da12-4eb2-9610-718614a0e81b] ReaderError: accountDeactivated
 [31m❯[39m src/features/posting/price-basis.test.ts [2m([22m[2m7 tests[22m[2m | [22m[31m2 failed[39m[2m)[22m[32m 86[2mms[22m[39m
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 353[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 322[2mms[22m[39m
[22m[39m[ssr-error] /api/seller [incident cb4f1224-f860-4f13-a0cf-718afd2d15d3] Error: seller_feed_page returned no page
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 305[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m src/features/posting/price-basis.test.ts[2m > [22mprice basis[2m > [22mmirrors price_shape_for_basis exactly
[41m[1m FAIL [22m[49m src/features/posting/price-basis.test.ts[2m > [22mprice basis[2m > [22mreads negotiable as a flag, not a forced mode (DEC-081)
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m528 passed[39m[22m[90m (529)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m3450 passed[39m[22m[90m (3452)[39m
##[error]Error: expected two CASE arms, found 0
##[error]Error: expected two CASE arms, found 0
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[36m [2m❯[22m sqlShapeTable src/features/posting/price-basis.test.ts:[2m33:33[22m[39m
    [90m 31|[39m   [35mconst[39m body [33m=[39m sql[33m.[39m[34mslice[39m(start[33m,[39m sql[33m.[39m[34mindexOf[39m([32m"$$;"[39m[33m,[39m start))[33m;[39m
    [90m 32|[39m   const cases = [...body.matchAll(/CASE p_value([\s\S]*?)END/g)].map((…
    [90m 33|[39m   if (cases.length !== 2) throw new Error(`expected two CASE arms, fou…
    [90m   |[39m                                 [31m^[39m
    [90m 34|[39m   [35mconst[39m arms [33m=[39m (text[33m:[39m string) [33m=>[39m
    [90m 35|[39m     [35mnew[39m [33mMap[39m(
[90m [2m❯[22m src/features/posting/price-basis.test.ts:[2m59:28[22m[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯[22m[39m


[41m[1m FAIL [22m[49m src/features/posting/price-basis.test.ts[2m > [22mprice basis[2m > [22mreads negotiable as a flag, not a forced mode (DEC-081)
[31m[1mError[22m: expected two CASE arms, found 0[39m
[36m [2m❯[22m sqlShapeTable src/features/posting/price-basis.test.ts:[2m33:33[22m[39m
    [90m 31|[39m   [35mconst[39m body [33m=[39m sql[33m.[39m[34mslice[39m(start[33m,[39m sql[33m.[39m[34mindexOf[39m([32m"$$;"[39m[33m,[39m start))[33m;[39m
    [90m 32|[39m   const cases = [...body.matchAll(/CASE p_value([\s\S]*?)END/g)].map((…
    [90m 33|[39m   if (cases.length !== 2) throw new Error(`expected two CASE arms, fou…
    [90m   |[39m                                 [31m^[39m
    [90m 34|[39m   [35mconst[39m arms [33m=[39m (text[33m:[39m string) [33m=>[39m
    [90m 35|[39m     [35mnew[39m [33mMap[39m(
[90m [2m❯[22m src/features/posting/price-basis.test.ts:[2m68:12[22m[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯[22m[39m

[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m528 passed[39m[22m[90m (529)[39m
[2m      Tests [22m [1m[31m2 failed[39m[22m[2m | [22m[1m[32m3450 passed[39m[22m[90m (3452)[39m
[2m   Start at [22m 18:59:30
[2m   Duration [22m 294.85s[2m (transform 11.08s, setup 190.85s, import 97.71s, tests 191.90s, environment 331.43s)[22m


##[error]Error: expected two CASE arms, found 0
 ❯ sqlShapeTable src/features/posting/price-basis.test.ts:33:33
 ❯ src/features/posting/price-basis.test.ts:59:28



##[error]Error: expected two CASE arms, found 0
 ❯ sqlShapeTable src/features/posting/price-basis.test.ts:33:33
 ❯ src/features/posting/price-basis.test.ts:68:12


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/5d20af5b-84c6-42dd-95cf-17b2a22a4e4d' before making global git config changes
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

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[e2e:preflight] missing migration file(s):
  - 20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql
  - 20261119150100_7865816d-4bf9-4a6b-9070-a44199ee9c6e.sql
  - 20261119150200_77d5acc2-e3af-4635-b249-05b712af1070.sql
  - 20261119150300_89938bbb-1658-40d6-baac-74cb470ba6fd.sql
  - 20261119150400_3f213ee5-6d1e-45c1-8f46-ab60d46d9c5b.sql
  - 20261119150500_b7fcfe88-667d-405f-9018-bed6552edafb.sql
  - 20261119150600_57fbc734-01db-4382-b05b-300b81dad61c.sql
  - 20261119150700_1df56bcd-5038-457b-ab0f-07edd66ad4c1.sql
  - 20261119150800_d09dae74-5af5-44b3-999b-6f297359409e.sql
  - 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql
STAGING BEHIND: apply 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql
  - 20261119150100_7865816d-4bf9-4a6b-9070-a44199ee9c6e.sql
  - 20261119150200_77d5acc2-e3af-4635-b249-05b712af1070.sql
  - 20261119150300_89938bbb-1658-40d6-baac-74cb470ba6fd.sql
  - 20261119150400_3f213ee5-6d1e-45c1-8f46-ab60d46d9c5b.sql
  - 20261119150500_b7fcfe88-667d-405f-9018-bed6552edafb.sql
  - 20261119150600_57fbc734-01db-4382-b05b-300b81dad61c.sql
  - 20261119150700_1df56bcd-5038-457b-ab0f-07edd66ad4c1.sql
  - 20261119150800_d09dae74-5af5-44b3-999b-6f297359409e.sql
  - 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql
STAGING BEHIND: apply 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql
  - 20261119150100_7865816d-4bf9-4a6b-9070-a44199ee9c6e.sql
  - 20261119150200_77d5acc2-e3af-4635-b249-05b712af1070.sql
  - 20261119150300_89938bbb-1658-40d6-baac-74cb470ba6fd.sql
  - 20261119150400_3f213ee5-6d1e-45c1-8f46-ab60d46d9c5b.sql
  - 20261119150500_b7fcfe88-667d-405f-9018-bed6552edafb.sql
  - 20261119150600_57fbc734-01db-4382-b05b-300b81dad61c.sql
  - 20261119150700_1df56bcd-5038-457b-ab0f-07edd66ad4c1.sql
  - 20261119150800_d09dae74-5af5-44b3-999b-6f297359409e.sql
  - 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql
STAGING BEHIND: apply 20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/018b9cc6-3e83-48da-a922-8ab556a5aed6' before making global git config changes
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
##[error]E2E failed — see docs/tracking/branches/cursor/f1-doors-7a/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  layout OK — merged flat: 1 context file(s), report rendered.
  layout OK — zero artifacts: 0 context file(s), report rendered.
  layout OK — missing directory: 0 context file(s), report rendered.
DEC-078: flaky body rendered after the ledger; ledger line byte-identical; cap flip of 11 rendered 10 bodies + 1 "body omitted: cap".
DEC-078 part 2: green form carries passed → Flake ledger → Flaky bodies → the flipped first line; a clean green renders non-gating): 0 and no flake section.
ok — R1a census names the missing log
ok — R1a a11y never states zero with a gap
ok — R1b census: all N logs read
ok — R1b a11y: all N logs read
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 76 context file(s) found).
Verdict class: TESTS (e2e-verdict-class.txt).
publish-evidence: published docs/tracking/branches/cursor/f1-doors-7a/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "lanes=failure"
[36;1mecho "lanes=failure"[0m
[36;1mif [ "failure" = "skipped" ] && [ "$DOCS_ONLY" = "true" ]; then[0m
[36;1m  echo "Lanes: ${LANES_LINE}"[0m
[36;1m  exit 0[0m
[36;1mfi[0m
[36;1mif [ "failure" != "success" ]; then[0m
[36;1m  class=$(head -n 1 e2e-verdict-class.txt 2>/dev/null || echo TESTS)[0m
[36;1m  case "$class" in[0m
[36;1m    "INFRA "*)[0m
[36;1m      read -r _ lanes steps <<< "$class"[0m
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      ;;[0m
[36;1m    *)[0m
[36;1m      evidence=$(bash scripts/publish-evidence.sh --print-path "$EVIDENCE_REF" docs/tracking/e2e-last-failure.md) ||[0m
[36;1m        evidence="no evidence file (publish-evidence.sh refused the ref)"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
[36;1m      ;;[0m
[36;1m  esac[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "Every temporary-backend lane passed (the email lane included)."[0m
shell: /usr/bin/bash -e {0}
env:
  DOCS_ONLY: false
  LANES_LINE: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-9a1c9ddd62ad… (1 read)
  EVIDENCE_REF: cursor/f1-doors-7a
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/branches/cursor/f1-doors-7a/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/0df9b15c-4024-455a-a572-47d0e73587fa' before making global git config changes
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
