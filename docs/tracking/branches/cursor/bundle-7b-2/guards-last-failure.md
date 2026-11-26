# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45736662097
- Commit: `d9d8e2bbb3ee40c8995c0beed757d86e363e8de3`
- Attempt: 1
- Written (UTC): 2026-11-26T02:19:07.696Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstderr[2m | src/components/shell/data-table.test.tsx[2m > [22m[2mDataTable C7 contract[2m > [22m[2mDTK-12 a failed read never recovers as an empty past-end page
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 713[2mms[22m[39m
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2306[2mms[22m[39m
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
[90mstdout[2m | scripts/conformance/refusal-readers.test.ts[2m > [22m[2ma failed read is one typed failure (CF-REFUSAL-3)[2m > [22m[2mCFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstderr[2m | src/features/my-listings/promote-sheet.test.tsx[2m > [22m[2mP-2 (b) the promote sheet (DEC-349)[2m > [22m[2mPMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 21; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1398[2mms[22m[39m
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/features/admin-listings/listing-photos.test.tsx[2m > [22m[2mLPH-U2 a failed photo read says failure and Retry refetches that query; a successful empty read stays null
[22m[39mfailure-notice listing-photos-failed server (reader pending)
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
 [31m❯[39m scripts/conformance/proof-readers.test.ts [2m([22m[2m5 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 4768[2mms[22m[39m
[90mstderr[2m | src/features/categories/category-tree.test.ts[2m > [22m[2mthe page's held category tree[2m > [22m[2mCTR-U1 (DEC-464) a failed read keeps its error, and retry asks for the tree again
[22m[39m[feed] first page failed Error: feedFailed
[90mstderr[2m | src/features/admin/translations/ai-bulk-bar.test.tsx[2m > [22m[2mAiBulkBar[2m > [22m[2mABB-U1 a failed count read draws the one notice, and Retry calls the count's read once
[22m[39mfailure-notice rail-categories-failed server (reader pending)
[22m[39mfailure-notice rail-categories-failed malformed
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 8fee83ec-ca5f-44f0-95e3-c650c804be00] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 402b1475-63fe-4af3-aa8d-a1696dbe7347] Error: feed_page returned no page
[90mstderr[2m | src/features/admin-screening/name-checks.test.tsx[2m > [22m[2mNCQ-U the queue section[2m > [22m[2mNCQ-U3 a failed read shows the error, never 'none'
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[90mstderr[2m | src/features/posting/step-pricing.test.tsx[2m > [22m[2mStepPricing — a failed last-currency read is no hint (INC-1257)[2m > [22m[2mSPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload
[22m[39m[save-error] unsave_listing Error: transport
[90mstderr[2m | src/features/admin-ai/ai-calls.test.tsx[2m > [22m[2mAI call consumer[2m > [22m[2mACR-4 a failed read remains an error with retry, never an empty success
[90mstderr[2m | src/features/admin-attributes/attributes-page.test.tsx[2m > [22m[2mATPG-2 a failed Used by read draws one notice with Retry and the cell's failed words, never none
[90mstderr[2m | src/features/admin-attributes/attributes-page.test.tsx[2m > [22m[2mATPG-3 a failed coverage read draws the cell's failed words, never 0/N
[22m[39mfailure-notice impersonation-notice-failed network
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 318[2mms[22m[39m
[90mstderr[2m | src/components/forms/field-select.test.tsx[2m > [22m[2mFSL-U5 a failed read stays disabled, draws the one notice, and Retry calls the read once
[90mstderr[2m | src/features/admin/audit/audit-page.test.tsx[2m > [22m[2mAUDT-U1 a failed stats read draws the four tiles failed, none with a number
[22m[39mfailure-notice audit-stat-24h-failed server (reader pending)
failure-notice audit-stat-7d-failed server (reader pending)
failure-notice audit-stat-impersonations-failed server (reader pending)
failure-notice audit-stat-top-action-failed server (reader pending)
[90mstderr[2m | src/features/admin/audit/audit-page.test.tsx[2m > [22m[2mAUD-U2 a failed rows read hands the table its own refetch as Retry
[22m[39mfailure-notice audit-stat-24h-failed server (reader pending)
failure-notice audit-stat-7d-failed server (reader pending)
failure-notice audit-stat-impersonations-failed server (reader pending)
failure-notice audit-stat-top-action-failed server (reader pending)
[90mstderr[2m | src/features/admin/audit/audit-page.test.tsx[2m > [22m[2mAUD-U3 a failed facets read draws the notice with Retry, never silent empty choices
[22m[39mfailure-notice audit-stat-24h-failed server (reader pending)
```

### Tail (last 60 lines)

```text
[31m[1mAssertionError[22m: expected [ …(2) ] to deeply equal [][39m

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   "supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql:173 asserts a deparsed definition by LIKE; read the catalog's columns",[39m
[31m+   "supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql:174 asserts a deparsed definition by LIKE; read the catalog's columns",[39m
[31m+ ][39m

[36m [2m❯[22m scripts/conformance/proof-readers.test.ts:[2m174:9[22m[39m
    [90m172|[39m             `${finding.file}:${finding.line} asserts a deparsed defini…
    [90m173|[39m         )[33m,[39m
    [90m174|[39m       )[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m   |[39m         [31m^[39m
    [90m175|[39m       [34mexpect[39m([34mpastDeparseFloor[39m([32m"20261104000000_a.sql"[39m))[33m.[39m[34mtoBe[39m([35mtrue[39m)[33m;[39m
    [90m176|[39m       [34mexpect[39m([34mpastDeparseFloor[39m([32m"20261103235959_a.sql"[39m))[33m.[39m[34mtoBe[39m([35mfalse[39m)[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m629 passed[39m[22m[90m (630)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m4138 passed[39m[22m[90m (4139)[39m
[2m   Start at [22m 01:49:19
[2m   Duration [22m 359.48s[2m (transform 14.05s, setup 234.53s, import 109.97s, tests 248.02s, environment 399.30s)[22m


##[error]AssertionError: expected [ …(2) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql:173 asserts a deparsed definition by LIKE; read the catalog's columns",
+   "supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql:174 asserts a deparsed definition by LIKE; read the catalog's columns",
+ ]

 ❯ scripts/conformance/proof-readers.test.ts:174:9


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/a00f2dcd-767c-4b51-9ed0-20a3d0cc26cb' before making global git config changes
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
##[error]E2E failed — see docs/tracking/branches/cursor/bundle-7b-2/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
DEC-078: flaky body rendered after the ledger; ledger line byte-identical; cap flip of 11 rendered 10 bodies + 1 "body omitted: cap".
DEC-078 part 2: green form carries passed → Flake ledger → Flaky bodies → the flipped first line; a clean green renders non-gating): 0 and no flake section.
ok — R1a census names the missing log
ok — R1a a11y never states zero with a gap
ok — R1b census: all N logs read
ok — R1b a11y: all N logs read
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 13 context file(s) found).
Verdict class: TESTS (e2e-verdict-class.txt).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
Flake ledger: appended 0 line(s) to docs/tracking/flake-ledger.md; 1 already there for this run (INC-495).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
publish-evidence: published docs/tracking/branches/cursor/bundle-7b-2/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
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
  LANES_LINE: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-da1841007b67… (0 read)
  EVIDENCE_REF: cursor/bundle-7b-2
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/branches/cursor/bundle-7b-2/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/6dd30b0e-9fbc-4bf4-9c24-a6af96bf515e' before making global git config changes
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
