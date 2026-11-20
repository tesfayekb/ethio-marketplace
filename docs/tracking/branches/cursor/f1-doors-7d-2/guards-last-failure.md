# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44759809186
- Commit: `7513a6c67114b469502783a174cf0b43841f3599`
- Attempt: 1
- Written (UTC): 2026-11-20T15:25:40.605Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 959[2mms[22m[39m
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
     [33m[2m✓[22m[39m TCK-12 the Typecheck step runs CI's own `bun run typecheck` (both projects): a planted failing scripts project is FAIL (housekeeping turn 3c) [33m 2878[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mRFL-2 a flag read-back that fails answers flagged null with flagRead failed, logged — never 0, the writes reported
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
     [33m[2m✓[22m[39m OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu [33m 345[2mms[22m[39m
[90mstdout[2m | src/routes/api/listings/identity.test.ts[2m > [22m[2mPOST /api/listings/identity on defineRoute (D1)[2m > [22m[2mAIV-1 an imitation verdict whose audit row failed is not acted on
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 20; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1804[2mms[22m[39m
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[90mstderr[2m | src/features/admin-listings/tier-dialog.test.tsx[2m > [22m[2mTierDialog (turn T1)[2m > [22m[2mTD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 50a51a43-58db-42da-b08f-d0552feeff6f] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/feed [incident 0d5dc365-1325-42b0-9644-306800daa427] Error: feed_page returned no page
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[22m[39m[screening] review of a photo change failed StepUpUnavailable: step-up unavailable: no verified factor
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
[22m[39m[screening] decision failed { message: [32m'ownListing'[39m }
[22m[39m[screening] decision failed { message: [32m'rateLimited'[39m }
[22m[39m[screening] decision failed StepUpUnavailable: step-up unavailable: no verified factor
 [31m❯[39m scripts/conformance/refusal-readers.test.ts [2m([22m[2m4 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 2857[2mms[22m[39m
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[save-error] unsave_listing Error: transport
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 385[2mms[22m[39m
[22m[39m[ssr-error] /api/seller [incident caa3f5a3-2488-425b-b499-ccec005e0364] Error: seller_feed_page returned no page
     [33m[2m✓[22m[39m IMPN-1 a failed download of the banner's module shows the notice in its place [33m 326[2mms[22m[39m
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 307[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/conformance/refusal-readers.test.ts[2m > [22ma refusal is read one way (CF-REFUSAL-1, CF-REFUSAL-2)[2m > [22mCFRR-1 no file in src/ reads a refusal's text by hand, or its line holds it
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m536 passed[39m[22m[90m (537)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3560 passed[39m[22m[90m (3561)[39m
##[error]Error: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/refusal-readers-allowlist.txt:6 stale allowance: src/features/admin-categories/use-image-failure.ts:10 | a code-shaped regex reads an image door's refusal; Lovable's L21 folds it into splitRefusal | INC-1189
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 [32m✓[39m src/lib/own-key.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/lib/signed-in-pages.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/lib/answered-id.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/lib/collator.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 29[2mms[22m[39m
 [32m✓[39m src/routes/root-reads-once.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/lib/country-name.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 32[2mms[22m[39m
 [32m✓[39m src/i18n/entity.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m src/lib/whole-number.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m src/lib/compare-codes.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m src/features/posting/step-details-limits.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m scripts/conformance/refusal-readers.test.ts[2m > [22ma refusal is read one way (CF-REFUSAL-1, CF-REFUSAL-2)[2m > [22mCFRR-1 no file in src/ reads a refusal's text by hand, or its line holds it
[31m[1mError[22m: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/refusal-readers-allowlist.txt:6 stale allowance: src/features/admin-categories/use-image-failure.ts:10 | a code-shaped regex reads an image door's refusal; Lovable's L21 folds it into splitRefusal | INC-1189[39m
[36m [2m❯[22m fail scripts/conformance/kit.ts:[2m109:15[22m[39m
    [90m107|[39m       [35mconst[39m line [33m=[39m index [33m+[39m [34m1[39m[33m;[39m
    [90m108|[39m       [35mconst[39m fail [33m=[39m (message[33m:[39m string)[33m:[39m never [33m=>[39m {
    [90m109|[39m         [35mthrow[39m [35mnew[39m [33mError[39m([32m`[39m[36m${[39mpath[36m}[39m[32m:[39m[36m${[39mline[36m}[39m[32m [39m[36m${[39mmessage[36m}[39m[32m: [39m[36m${[39mtext[36m}[39m[32m`[39m)[33m;[39m
    [90m   |[39m               [31m^[39m
    [90m110|[39m       }[33m;[39m
    [90m111|[39m       if (cells.length !== 3 || cells.some((cell) => !cell)) fail("exp…
[90m [2m❯[22m scripts/conformance/kit.ts:[2m120:27[22m[39m
[90m [2m❯[22m readAllowlist scripts/conformance/kit.ts:[2m104:6[22m[39m
[90m [2m❯[22m scripts/conformance/refusal-readers.test.ts:[2m51:23[22m[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m536 passed[39m[22m[90m (537)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3560 passed[39m[22m[90m (3561)[39m
[2m   Start at [22m 15:05:57
[2m   Duration [22m 414.05s[2m (transform 15.35s, setup 261.89s, import 135.11s, tests 272.72s, environment 469.18s)[22m


##[error]Error: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/refusal-readers-allowlist.txt:6 stale allowance: src/features/admin-categories/use-image-failure.ts:10 | a code-shaped regex reads an image door's refusal; Lovable's L21 folds it into splitRefusal | INC-1189
 ❯ fail scripts/conformance/kit.ts:109:15
 ❯ scripts/conformance/kit.ts:120:27
 ❯ readAllowlist scripts/conformance/kit.ts:104:6
 ❯ scripts/conformance/refusal-readers.test.ts:51:23


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/acc90601-1fa3-4d4a-a659-0a775d2769f4' before making global git config changes
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
dist/server/_libs/@radix-ui/react-dropdown-menu+[...].mjs        62.30 kB │ gzip:  12.42 kB
dist/server/_ssr/admin.screening-CocBEu7r.mjs                    67.31 kB │ gzip:  15.77 kB
dist/server/index.mjs                                            70.23 kB │ gzip:  15.82 kB
dist/server/_libs/tanstack__query-core.mjs                       74.06 kB │ gzip:  15.48 kB
dist/server/_libs/supabase__realtime-js+unenv.mjs                79.24 kB │ gzip:  20.28 kB
dist/server/_ssr/admin.translations_._lang-8k6pLEZG.mjs          79.51 kB │ gzip:  17.64 kB
dist/server/_libs/tailwind-merge.mjs                             85.65 kB │ gzip:  15.21 kB
dist/server/_libs/@radix-ui/react-alert-dialog+[...].mjs         87.72 kB │ gzip:  20.52 kB
dist/server/_ssr/listing-detail-pd7EoIJQ.mjs                     88.99 kB │ gzip:  23.47 kB
dist/server/_ssr/attribute-dialogs-CHlF9LUO.mjs                 103.52 kB │ gzip:  22.34 kB
dist/server/_libs/date-fns.mjs                                  104.02 kB │ gzip:  18.42 kB
dist/server/_libs/supabase__postgrest-js.mjs                    105.44 kB │ gzip:  21.67 kB
dist/server/_ssr/location-data-DE29nsCN.mjs                     117.10 kB │ gzip:  36.92 kB
dist/server/_libs/lucide-react.mjs                              118.45 kB │ gzip:  23.10 kB
dist/server/_libs/@supabase/storage-js+[...].mjs                119.52 kB │ gzip:  22.35 kB
dist/server/_ssr/admin.monetisation-DRXFHv0j.mjs                123.43 kB │ gzip:  26.49 kB
dist/server/_ssr/en-admin-BbIgsn5n.mjs                          130.36 kB │ gzip:  29.39 kB
dist/server/_libs/react-day-picker.mjs                          135.36 kB │ gzip:  26.50 kB
dist/server/_ssr/admin.categories-B7JZvjVv.mjs                  138.54 kB │ gzip:  31.04 kB
dist/server/_ssr/am-admin-B2v21M7G.mjs                          171.94 kB │ gzip:  35.92 kB
dist/server/_libs/zod.mjs                                       185.47 kB │ gzip:  40.81 kB
dist/server/_libs/leaflet.mjs                                   242.42 kB │ gzip:  54.53 kB
dist/server/_libs/supabase__auth-js.mjs                         312.24 kB │ gzip:  62.80 kB
dist/server/_libs/libphonenumber-js.mjs                         317.38 kB │ gzip:  62.73 kB
dist/server/_ssr/router-49ruvrce.mjs                            498.82 kB │ gzip: 143.45 kB
dist/server/_ssr/wizard-BkaJ6mHc.mjs                            506.22 kB │ gzip: 131.04 kB
dist/server/_libs/@tanstack/react-router+[...].mjs              755.75 kB │ gzip: 160.39 kB

[32m✓ built in 879ms[39m
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
Bundle budget: the first-paint closure of index-CFfyNc_a.js no longer matches ENTRY_CLOSURE (scripts/route-budgets.mjs, DEC-362):
  door-codes: 1 in the entry's closure, ENTRY_CLOSURE lists 0 (a chunk joined the first download, DEC-362)
  refusal-split: 1 in the entry's closure, ENTRY_CLOSURE lists 0 (a chunk joined the first download, DEC-362)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/1efb4748-6c7a-4a20-a4ce-bea313798699' before making global git config changes
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
##[error]E2E failed — see docs/tracking/branches/cursor/f1-doors-7d-2/e2e-last-failure.md
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
Wrote docs/tracking/e2e-last-failure.md (20/20 source(s) with usable results, 6 context file(s) found).
Verdict class: TESTS (e2e-verdict-class.txt).
publish-evidence: published docs/tracking/branches/cursor/f1-doors-7d-2/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
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
  LANES_LINE: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a61efeac7e1f… (0 read)
  EVIDENCE_REF: cursor/f1-doors-7d-2
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/branches/cursor/f1-doors-7d-2/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/4e785127-1836-441e-98c5-59f17c437b56' before making global git config changes
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
