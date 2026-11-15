# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43715579662
- Commit: `6418cdd76f4d18210d50690c384fce2bea401a11`
- Attempt: 1
- Written (UTC): 2026-11-15T13:02:23.195Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 1071[2mms[22m[39m
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
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 3546[2mms[22m[39m
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
     [33m[2m✓[22m[39m OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu [33m 395[2mms[22m[39m
 [31m❯[39m scripts/doors/check-doors.test.ts [2m([22m[2m8 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 16532[2mms[22m[39m
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 2026[2mms[22m[39m
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 7f9b6e6a-ef2e-4547-b307-81518afbf7dc] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident c9fd96e3-f2f9-41db-ac36-fe14d9e7f847] Error: feed_page returned no page
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 387[2mms[22m[39m
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 334[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
[22m[39m[ssr-error] /api/seller [incident e59a0cf4-d1eb-467d-931c-5e3dc2015abb] Error: seller_feed_page returned no page
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 307[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/doors/check-doors.test.ts[2m > [22mcheck-doors (CF-DOORS)[2m > [22mDOORS-6 the live mode judges the tree census too: the tree's own catalogue as a live TSV reconciles under the same allowlist (INC-1072)
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m499 passed[39m[22m[90m (500)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3166 passed[39m[22m[90m (3167)[39m
##[error]Error: Test timed out in 5000ms.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 [32m✓[39m src/features/posting/same-channels.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/components/shell/strings-layers.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32m✓[39m src/features/seller/seller-head.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/features/auth/password-pair.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/lib/own-key.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/lib/signed-in-pages.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/lib/collator.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 24[2mms[22m[39m
 [32m✓[39m src/lib/country-name.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 35[2mms[22m[39m
 [32m✓[39m src/routes/root-reads-once.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/features/posting/refusal-text.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/i18n/entity.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/lib/whole-number.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 11[2mms[22m[39m
 [32m✓[39m src/lib/compare-codes.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/features/posting/step-details-limits.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 5[2mms[22m[39m

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m scripts/doors/check-doors.test.ts[2m > [22mcheck-doors (CF-DOORS)[2m > [22mDOORS-6 the live mode judges the tree census too: the tree's own catalogue as a live TSV reconciles under the same allowlist (INC-1072)
[31m[1mError[22m: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".[39m
[36m [2m❯[22m scripts/doors/check-doors.test.ts:[2m112:3[22m[39m
    [90m110|[39m   })[33m;[39m
    [90m111|[39m
    [90m112|[39m   it("DOORS-6 the live mode judges the tree census too: the tree's own…
    [90m   |[39m   [31m^[39m
    [90m113|[39m     // The repository's catalogue, spelt as psql -At -F tab would prin…
    [90m114|[39m     [35mconst[39m { rows } [33m=[39m [34mstaticRows[39m([33mROOT[39m)[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m499 passed[39m[22m[90m (500)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3166 passed[39m[22m[90m (3167)[39m
[2m   Start at [22m 12:47:07
[2m   Duration [22m 453.42s[2m (transform 15.24s, setup 285.52s, import 146.63s, tests 291.49s, environment 524.82s)[22m


##[error]Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ scripts/doors/check-doors.test.ts:112:3


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/f7c941f9-afff-444e-98fd-fa0223fde0fb' before making global git config changes
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
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 25 of 28)
STAGING BEHIND: apply 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261115122700_e01def73-55a8-46af-8005-8e23cca46cb4.sql
  - 20261115122800_89eaa5c9-b607-4e75-b716-63446701b640.sql
  - 20261115122900_069b543e-ce16-488e-b552-d0913cdec3c9.sql
  - 20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql
  - 20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql
  - 20261115123200_e0edb9a7-3e2d-4e53-b772-c5380267e940.sql
  - 20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql
  - 20261115123400_33896921-d11c-46f8-95c3-205aa5a3af9c.sql
  - 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql
STAGING BEHIND: apply 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261115122700_e01def73-55a8-46af-8005-8e23cca46cb4.sql
  - 20261115122800_89eaa5c9-b607-4e75-b716-63446701b640.sql
  - 20261115122900_069b543e-ce16-488e-b552-d0913cdec3c9.sql
  - 20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql
  - 20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql
  - 20261115123200_e0edb9a7-3e2d-4e53-b772-c5380267e940.sql
  - 20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql
  - 20261115123400_33896921-d11c-46f8-95c3-205aa5a3af9c.sql
  - 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql
STAGING BEHIND: apply 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261115122700_e01def73-55a8-46af-8005-8e23cca46cb4.sql
  - 20261115122800_89eaa5c9-b607-4e75-b716-63446701b640.sql
  - 20261115122900_069b543e-ce16-488e-b552-d0913cdec3c9.sql
  - 20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql
  - 20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql
  - 20261115123200_e0edb9a7-3e2d-4e53-b772-c5380267e940.sql
  - 20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql
  - 20261115123400_33896921-d11c-46f8-95c3-205aa5a3af9c.sql
  - 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql
STAGING BEHIND: apply 20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/a3bbf4ea-62f3-49b9-8937-15b4d48f840b' before making global git config changes
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
