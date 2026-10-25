# Foundations turn 23 — completion report (2026-10-25)

## 1. Files and bases

Original START: `7633438d92949c13a1d2ffa09869d68a51afee47`. Continuation ruling START: `0f542851e0f20f8950ef2f92a450cdfdfbc42419`. Closure HEAD: `ee326e39c00bd7cd771020642064ff09611e62c9`; the final platform save carries this report and roadmap, so its hash cannot be predicted.

`git diff --name-only 7633438d92949c13a1d2ffa09869d68a51afee47` plus this new report (15 files):

```text
docs/_changelog.md
docs/features/e2e-harness.md
docs/features/performance-strategy.md
docs/governance/briefs/foundations-turn-23.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-23.report.md
docs/perf/baseline-2026-10-25-1.json
docs/perf/baseline-2026-10-25-2.json
docs/perf/baseline-2026-10-25-3.json
docs/perf/baseline-2026-10-25-4.json
roadmap.md
scripts/perf/lab.ts
src/lib/error-capture.test.ts
src/lib/error-capture.ts
src/routes/auth_.callback.tsx
```

Continuation-only diff before closure: `src/lib/error-capture.test.ts`. No other application file changed during continuation. No migration, new string, package, spec/helper, AGENTS.md, .claude file or CLAUDE.md changed.

`git ls-files` for the seven already-created new files:

```text
docs/governance/briefs/foundations-turn-23.md
docs/perf/baseline-2026-10-25-1.json
docs/perf/baseline-2026-10-25-2.json
docs/perf/baseline-2026-10-25-3.json
docs/perf/baseline-2026-10-25-4.json
scripts/perf/lab.ts
src/lib/error-capture.test.ts
```

The report is new at closure; its tracked-file proof is checked after the platform save, not assumed.

## 2. Part A — CI first

Original A1, recorded in the preceding execution: run 40205286807 SUCCESS on `7633438d92949c13a1d2ffa09869d68a51afee47`, completed 2026-10-25T15:29:29Z; nothing to fix. This is prior-turn evidence, not a fresh retrieval of that historical reporter output.

Latest authoritative ci-evidence read during continuation (first six lines):

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `0f542851e0f20f8950ef2f92a450cdfdfbc42419` (short `0f54285`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-25T16:18:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40209349608
```

This run is on the unformatted continuation base, not the corrected closure. Guards evidence identifies `src/lib/error-capture.test.ts` formatting: `[warn] Code style issues found in the above file. Run Prettier with --write to fix.` and `error: script "format:check" exited with code 1`. The ruling's exact one-file formatting repair addresses it; local lint and formatting now pass. E2E reporter: Passed 2060, Skipped 150, Failed 0; gating failures 0; shard 13 has no results; final-commit CI remains the supervisor's judgment.

## 3. Done by part and step

- A1: done previously, historical SUCCESS above.
- STEP 0: saved brief verified now at 29276 bytes, SHA-256 `c718f22ab036b31ec5dbaf7a0f413e27132d019047f665e14d0f285a74086596`; title/fence and one EOF newline retained. Roadmap names this brief.
- B1: lab installed exactly; SHA-256 `c0701c98767133e0e19a4b069d0c3313d01c330430c6036c16f7d2bbf0e91291` verified now.
- C1: render-stream errors tagged; recognized h3 aborted requests become one warning in the wrapper; genuine errors retain expansion and capture.
- C2: ECAP-1…3 prove the rules; red-first was executed previously (see limits on retained raw evidence below).
- C3: callback reads router searchStr via useLocation; same safeReturnPath/return behavior.
- D1: four stored measurements, three cold runs and one warm result per page; all seven page classes found. No ceiling reduction to two runs recorded.
- D2: header dumps captured previously; recaptured during continuation below because prior raw dumps were not available.
- D3: no missing page; no invented result.
- E1–E3: baseline documentation, error-census paragraph and mechanism rows 33/39 completed previously.
- E4: changelog previously appended; only turn-23 roadmap tick closed here with closure HEAD and measured totals.
- THE CHECKS, THE END-TO-END CHECK and completion report: completed with explicit limits.

## 4. Red-first and final ECAP proof

Prior execution recorded the new tests against unchanged error-capture.ts: ECAP-1 and ECAP-2 failed; ECAP-3 passed (2 failed, 1 passed). Then C1 was saved and all three passed. Raw prior failing output is not retained in this continuation's accessible logs; the exact failing lines cannot honestly be re-pasted. No rollback or repeated red-first run performed.

Fresh verbose proof after the ruling's formatting-only change:

```text
ECAP-1 tags a stream render error for the census — passed
ECAP-2 turns an abandoned request's unhandled 500 into one warning — passed
ECAP-3 keeps a real unhandled error's full description — passed
Test Files 1 passed (1)
Tests 3 passed (3)
Duration 2.36s
```

The full required unit suite also reports `src/lib/error-capture.test.ts (3 tests)` passed, 24ms.

## 5. Published phone baseline

Stored measurement timestamps: 2026-10-25T15:41:16.897Z, 15:43:48.630Z, 15:46:44.187Z, 15:49:01.680Z. Lighthouse mobileSlow4G devtools latency 562.5ms, download 1474.56Kbps, upload 675Kbps; CPU 4×; 360×740 DPR 1.75. TTFB uses CDP clock. These measure published public pages, not a speed improvement from this turn.

The following lines are reconstructed exactly from stored JSON using lab.ts's print format; prior stdout was not retained:

```text
[lab] home https://my-market-dawn.lovable.app/ — TTFB 1236 ms · FCP 3260 ms · LCP 3260 ms · CLS 0 · TBT 663 ms · load 5400 ms · HTML 7.6 KB · total 509.8 KB in 74 requests · warm LCP 6524 ms, 955 KB
[lab] category https://my-market-dawn.lovable.app/c/vehicles — TTFB 912 ms · FCP 2900 ms · LCP 2968 ms · CLS 0.011 · TBT 751 ms · load 5077 ms · HTML 7.6 KB · total 510.1 KB in 75 requests · warm LCP 6824 ms, 460 KB
[lab] ad https://my-market-dawn.lovable.app/l/driver-hire-service-c5j3d66hyk — TTFB 938 ms · FCP 3168 ms · LCP 6008 ms · CLS 0.026 · TBT 685 ms · load 6365 ms · HTML 13.7 KB · total 893.6 KB in 96 requests · warm LCP 1188 ms, 237 KB
[lab] seller https://my-market-dawn.lovable.app/badminton_shop — TTFB 1080 ms · FCP 3112 ms · LCP 3112 ms · CLS 0.006 · TBT 612 ms · load 5280 ms · HTML 7.3 KB · total 550.3 KB in 78 requests · warm LCP 5100 ms, 362 KB
[lab] post https://my-market-dawn.lovable.app/post — TTFB 827 ms · FCP 2860 ms · LCP 2860 ms · CLS 0 · TBT 542 ms · load 5257 ms · HTML 8.8 KB · total 555 KB in 67 requests · warm LCP 988 ms, 70 KB
[lab] auth https://my-market-dawn.lovable.app/auth — TTFB 610 ms · FCP 2668 ms · LCP 2668 ms · CLS 0 · TBT 528 ms · load 4708 ms · HTML 8 KB · total 548.8 KB in 77 requests · warm LCP 1212 ms, 48 KB
[lab] terms https://my-market-dawn.lovable.app/terms — TTFB 1175 ms · FCP 3276 ms · LCP 3276 ms · CLS 0 · TBT 799 ms · load 5296 ms · HTML 44.6 KB · total 536.3 KB in 71 requests · warm LCP 1112 ms, 85 KB
```

No page skipped. Budgets remain for the subsequent speed study; no performance target invented or asserted.

## 6. Headers

Fresh `curl -sI` captures at 16:21 UTC, not the original 15:xx measurement time. Every non-cookie header is retained; Set-Cookie values are deliberately withheld to avoid storing cookies in the public repository. Cookie security attributes are not used for the speed conclusions.

```text
https://my-market-dawn.lovable.app/
HTTP/2 200 
date: Sun, 25 Oct 2026 16:21:01 GMT
content-type: text/html; charset=utf-8
cache-control: no-cache, must-revalidate, max-age=0
strict-transport-security: max-age=31536000; includeSubDomains
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-deployment-id: psr2.199657c4-eaf7-4fe2-8f8d-62122bd08386.1793550061.v8urArr8FAzgwVU97Sn21s3ESDBxd3di5iP9e86VCdU
[set-cookie value omitted: security]
server: cloudflare
cf-ray: a5028d497f466cdf-CDG


https://my-market-dawn.lovable.app/l/driver-hire-service-c5j3d66hyk
HTTP/2 200 
date: Sun, 25 Oct 2026 16:21:03 GMT
content-type: text/html; charset=utf-8
cache-control: no-cache, must-revalidate, max-age=0
strict-transport-security: max-age=31536000; includeSubDomains
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-deployment-id: psr2.199657c4-eaf7-4fe2-8f8d-62122bd08386.1793550062.pNBqBOtPZXKssNCk8YsI5-GCrCKzDIKlaYT95RkwwPE
[set-cookie value omitted: security]
server: cloudflare
cf-ray: a5028d4fcc8553c5-CDG


https://my-market-dawn.lovable.app/assets/index-CAGQeEsF.js
HTTP/2 200 
date: Sun, 25 Oct 2026 16:21:03 GMT
content-type: text/javascript; charset=utf-8
accept-ranges: bytes
cache-control: public, max-age=31536000, immutable
strict-transport-security: max-age=31536000; includeSubDomains
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-deployment-id: psr2.199657c4-eaf7-4fe2-8f8d-62122bd08386.1793550063.Yznk6BVbkcDLib9ZdguiZMHEd-0Pz7-2eMiDx4EXg6Y
[set-cookie value omitted: security]
server: cloudflare
cf-ray: a5028d57e91b1661-CDG


https://zwmvxvzzvjvtdcfcwiuf.supabase.co/storage/v1/object/public/category-assets/8912bf40-95e4-4588-873c-ee8d0f0ec9e1/card-1790586420878.png
HTTP/2 200 
date: Sun, 25 Oct 2026 16:21:04 GMT
content-type: image/png
content-length: 138389
cf-ray: a5028d596e899eef-CDG
cf-cache-status: DYNAMIC
accept-ranges: bytes
access-control-allow-origin: *
cache-control: private, no-cache
etag: "cc8f329566e4acbd9b5e3797297f1f5d"
last-modified: Mon, 28 Sep 2026 09:07:02 GMT
server: cloudflare
sb-gateway-mode: direct
sb-gateway-version: 1
sb-project-ref: zwmvxvzzvjvtdcfcwiuf
sb-request-id: 01a173dd-93ee-7779-a7b9-274a9482b2d1
x-robots-tag: none
strict-transport-security: max-age=31536000; includeSubDomains; preload
[set-cookie value omitted: security]
alt-svc: h3=":443"; ma=86400
```

HTML is no-cache/must-revalidate, asset JS immutable for one year, image private/no-cache and DYNAMIC. No Age, Vary or Content-Encoding header appeared in these HEAD responses; absence is not a claim about every GET response.

## 7. Required checks

In the brief's order:

1. Ruling command `bunx prettier --write src/lib/error-capture.test.ts`, then `bun run lint`: exit 0, 0 errors / 40 warnings.
2. `bun run test:unit`: exit 1; Test Files 1 failed / 283 passed (284); Tests 1 failed / 1799 passed / 1 skipped (1801); duration 235.27s. Only known EXH-11 sandbox timeout failed. EXH-17 did not fail this run.
3. Harness log: `=== build 2026-10-25T16:13:56Z ===` / `build OK`; no error TS line. No standalone manual build/typecheck. The mandated e2e:local wrapper performs its own build.
4. `bun run i18n:usage`: exit 0, 1736 keys across 564 files, 395 dynamic call sites; neither map changed.
5. `bun run format:check`: exit 0, `All matched files use Prettier code style!`.

Fresh ECAP verbose run was additional targeted proof, not a repeated E2E. Closure docs receive touched-file lint and final format:check again last.

## 8. End-to-end check

Both runs via bun run e2e:local, ethio-staging, both projects, 2 workers, fake mode, --retries=0; fallback Chromium override as brief permits. Port 4173 had no leftover server before the first run. No spec/helper edit, repeat or timeout override.

- post-wizard-category.spec.ts --grep "PW-182 ": 2 passed (25.8s); password and callback preserve category/place on both projects.
- smoke-auth-i18n.spec.ts whole: 2 passed (25.3s); sign-in, identity, language, phone overflow and sign-out verified on both projects.
- Each teardown: 4 signed-in accounts (2 pool, 2 fresh); transport retries 0; deleted 3 process-owned users.

Every requested matching server channel/count line:

```text
category:
Running 2 tests using 2 workers
  2 passed (25.8s)
smoke:
Running 2 tests using 2 workers
[WebServer] [aborted] the client left; h3 logged the request as unhandled (status 500)
[WebServer] [0m[31m[client-aborted] GET /api/i18n/en[0m
[WebServer] [aborted] the client left; h3 logged the request as unhandled (status 500)
[WebServer] [0m[31m[client-aborted] GET /api/categories/tree[0m
[WebServer] [aborted] the client left; h3 logged the request as unhandled (status 500)
[WebServer] [0m[31m[client-aborted] GET /api/feed[0m
[WebServer] [aborted] the client left; h3 logged the request as unhandled (status 500)
[WebServer] [0m[31m[client-aborted] GET /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2[0m
  2 passed (25.3s)
```

Counts: category ssr-error 0, renderToReadableStream 0, aborted 0, client-aborted 0; smoke ssr-error 0, renderToReadableStream 0, aborted 4, client-aborted 4.

Important limit: the smoke log also retains bare `abort@[native code]` stacks before each warning. The recognized h3 unhandled-500 error is replaced by one warning, but the whole runtime log is not stack-free. Do not claim every abort stack disappeared; no further source change is authorized by this continuation ruling.

## 9. K2 census

Read-only production src census (test/spec files excluded), hook initializers cross-checked against window/document/localStorage/sessionStorage/navigator reads: no remaining matching useState/useMemo/useRef initializer. Covered former site `src/routes/auth_.callback.tsx:48–50` now reads router searchStr (current lines checked below).

Production console.error sites in src/server and src/lib: no remaining untagged framework-error writer found. The framework emitter remains node_modules/@tanstack/react-router/dist/esm/ssr/renderRouterToStream.js:14–16; error-capture.ts:85–88 tags its arguments. error-capture.ts:81–83 recognizes the h3 abort log. Tagged non-census upstream logs at src/server/upstream.ts:35,43 are deliberate, not an untagged framework bypass.

Observed remaining runtime sibling: bare abort stack from dist/server/_libs/h3+rou3+srvx.mjs:544:20 during smoke sign-out. The prior wrapper is not the only runtime stack emitter; attribution beyond this observed frame is not proved here. Reported, not changed outside ruling scope.

## 10. Limits

```text
FAIL scripts/conformance/executor-hooks.test.ts > the landing door (land.ts) > EXH-11 refuses a red check (and the stop gate refuses the unlanded turn); with the checks green it lands, and the gate lets the turn end
Error: Test timed out in 5000ms.
scripts/conformance/executor-hooks.test.ts:608:3
```

Known INC-890 limit; no skip, workaround or kit edit. Full units are not claimed green. Original raw red-first, lab stdout and headers unavailable in this continuation; exact stored measurement values are recoverable, historical raw failures are not. Bare abort stacks remain despite expected warning conversion. Final CI success is unverified.

## 11. Departures and CI wait

- Original STEP 0 first copy included BRIEF-END (9 extra bytes); prior execution repaired from original message and verified the expected hash. Current checksum and byte count match.
- Original D1 first run could not write because docs/perf did not exist; directory created and group rerun successfully, as prior execution disclosed. This was a measurement run, not a repeated E2E.
- Continuation ruling at 16:12 UTC on base 0f542851: formatted exactly the named ECAP file with prettier 3.8.3; no other application change. Addresses the three prettier/prettier lint errors and observed base-CI formatting failure.
- Fresh headers replace inaccessible historical dumps; cookies withheld for security. Lab print lines reconstructed from literal recorded values; no estimate.
- Extra targeted verbose ECAP run to paste named passing lines.
- No extra bug fix for residual runtime abort stacks; scope is formatting-only for application source.

Closure HEAD `ee326e39c00bd7cd771020642064ff09611e62c9` precedes report/roadmap save. Latest readable CI is the formatting-red run above; supervisor judges the corrected final commit. END THE TURN after closure checks; no publish action.

## 12. Summary

Parts A–E and required continuation steps complete; lab and brief hashes match; baseline stored for all seven page classes; lint 0/40; four requested E2E checks passed with zero render-error channel lines. Unit EXH-11 timeout, historical raw-evidence gaps and residual bare abort stacks disclosed. Final-commit CI awaits supervisor judgment.
