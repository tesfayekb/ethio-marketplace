# Foundations turn 20 — completion report

## 1. Identity and status

Original START: `454b58497c14a6082e4eeb2ba3970832e4f3bbc1`. Stop-2 resume base verified: `148d6e61abe121b9195af864c4a9a773a3eda0c8`. Last readable landing HEAD before this report: `b4c01f1b1ce87abcd998f36cf518571caa885d79`; the platform's final commit will include this report and roadmap closure. No stateful git command was run.

Parts A–D, THE CHECKS, THE END-TO-END CHECK and this report are done. Implementation and all prescribed E2E checks pass. The complete unit suite is not wholly green: EXH-17 alone times out in this sandbox, left untouched under stop-2 R2. Final-commit CI remains the supervisor's judge.

## 2. Part A — standing infrastructure ruling

Part A stands as previously reported, with no infrastructure code fix:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `454b5849` (short `454b584`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-25T12:53:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40193823379
```

Previously readable evidence: `Passed: 2069 · Skipped: 124 · Failed: 0`; `Sources without results: shard 8`; `shard 8: log unavailable`. Per A1 ruling, lane 8 stopped during backend start/migration application before tests; turn 19 changed no migration. Classification: infrastructure, not code. The unavailable lane log was not represented as independently read.

## 3. STEP 0 and departures

Verified again on this resume:

```text
e90ef835a16fc7614a09f8ef837861f2c2dc6c64bb52c844d1d013aca1f70065  docs/governance/briefs/foundations-turn-20.md
```

- STEP-0 ruling: the saved carrier had one extra line break between `left).` and `LEFT:`. The authorized repair replaced only that break with one space; the exact expected hash matches. The temporary reconstructed copy had disappeared, so file-copy replacement could not be used; the superseding ruling authorized the edit.
- Stop-2 R1 expands scope only to `src/features/admin/legal/legal-service.ts`: one import and replacing the inline scratch-kind pattern in `validDocument` with `SCRATCH_KIND`. The country-code pattern remains byte-for-byte unchanged. The supervisor's census searched the name rather than the pattern and missed this caller; this ruling resolves that miss.
- Stop-2 R2 leaves EXH-17 and the other executor's kit unchanged, with no workaround, timeout increase or exclusion. The supervisor separately handles the sandbox timeout; its CI component-tests pass on `454b5849`, run `40193823379`, is the ruling's evidence, not a new local proof.
- The E2E script's own build is part of the explicitly prescribed `bun run e2e:local` mechanism; no separate manual build or typecheck was invoked.
- Translation usage maps moved when `i18n:usage` ran; both generated files are included under the standing allowance.

## 4. Part B — mechanism and framework proof

The four schemas are in `src/lib/schemas/server-fns.ts`: undefined input, strict nonempty ad slug, strict string seller name, strict scratch-kind plus at most five string countries. `SCRATCH_KIND` has one production definition in legal-kinds.ts; that file gained only `export`.

Framework greps confirmed the installed compiler's client stripping and the Standard Schema server validator. Captured lines:

```text
handleCreateServerFn.js:1:import { cleanId, codeFrameError, stripMethodCall } from "./utils.js";
handleCreateServerFn.js:23: context.warn?.(`${location}createServerFn().inputValidator() is deprecated. Use createServerFn().validator() instead.`);
handleCreateServerFn.js:140: if (context.env === "client") stripMethodCall(methodCall.callPath);
createServerFn.js:171: if ("~standard" in validator) {
createServerFn.js:172: const result = await validator["~standard"].validate(input);
```

Commands: `grep -n "stripMethodCall\|inputValidator() is deprecated" node_modules/@tanstack/start-plugin-core/dist/esm/start-compiler/handleCreateServerFn.js`; `grep -n "~standard" node_modules/@tanstack/start-client-core/dist/esm/createServerFn.js`. Client bundle-budget judgment remains CI's, not inferred from source alone.

## 5. Part B — red-first and rule tests

Prior red-first output, preserved in `/tmp/exec-logs/1caf152f-4333-45d1-ab23-e93e168edaac.log`:

```text
× CF-RT-8 every server function requires its own schema validator
AssertionError: expected false to be true // Object.is equality
Test Files  1 failed (1)
Tests  1 failed | 8 skipped (9)
```

CF-RT-8 proves the planted mixed schema/legacy pair, rejects a lambda validator, and accepts the zod expression and NoInputSchema cases. Final focused run:

```text
✓ CF-RT-1 every handler file and server function uses defineRoute / a schema validator, or has its allowance
✓ CF-RT-2 no file outside the helper set reads a body, builds a Response, reads Authorization, constructs a client or calls fetch
✓ CF-RT-3 the UUID regex literal lives only in src/lib/schemas/primitives.ts
✓ CF-RT-4 a planted hand-rolled route is reported twice
✓ CF-RT-5 the lint block's ignore list equals the allowlist's paths, both ways
✓ CF-RT-6 generic calls conform only with the boundary import
✓ CF-RT-7 the scanner reports both planted read-failure copies once
✓ CF-RT-8 every server function requires its own schema validator
✓ SFN-1 accepts today's loader inputs
✓ SFN-2 refuses malformed inputs and unknown object keys
✓ SFN-3 the scratch-kind pattern has one production definition
Test Files  2 passed (2)
Tests  12 passed (12)
```

SFN-3 was red on the duplicated admin pattern before R1 and passes after its exact authorized replacement. No assertion or test limit was weakened.

## 6. Part C — input and answer comparison

Compared each route against START using quoted paths and `git diff 454b5849`:

| Function | Before input → answer | After input → answer | Only change |
| --- | --- | --- | --- |
| getSsrLangContext | No input → `{ star, languages, origin, path, areaCookie, geo }` | `NoInputSchema` → identical object | Same language URL, headers, no-store and parse through upstream; named 1500 ms deadline; same logged empty-language degradation |
| readAdPageFn | Hand-checked `{ slug: string }`, nonempty → readAdPage answer | `AdPageInputSchema` → same answer | Strict schema replaces hand validator; handler unchanged |
| sellerExistsFn | Hand-checked `{ name: string }`, including empty → sellerExists answer | `SellerPageInputSchema` → same answer | Strict schema replaces hand validator; handler unchanged |
| termsPageFn | No input → legalPage("terms") | `NoInputSchema` → same answer | Validator only |
| privacyPageFn | No input → legalPage("privacy") | `NoInputSchema` → same answer | Validator only |
| scratchPageFn | Hand-checked kind, shaped countries → `{ global, countries: [{ code, data }] }` | `LegalScratchInputSchema`, then shapedCountries in handler → identical answer for loader inputs | Shared pattern; strict input with five-country ceiling; normalization moved into handler |

Loaders and their redirect/not-found/error behavior, including canonical ad 301, upper-case seller 301 and `/legal/terms` / `/legal/privacy` 301, are unchanged. Head metadata is unchanged. Invalid-input refusal wording now comes from schemas as declared. No other route behavior difference was found.

## 7. Part C/D — counts and documentation

Routes allowlist: **10 → 4**. Matching ROUTES-BOUNDARY-IGNORES: **10 → 4**, removed with the allowlist in the same earlier Part-C batch; CF-RT-5 passes. AGENTS.md: **5764 → 5841 bytes**, exactly the prescribed route-rule replacement. Docs updated: routes mechanism/compiler/six reads/CF-RT-8, register route row and status line, changelog, roadmap. The register's other rows were not edited.

## 8. K2 census — every site and remaining bypass

All six production `createServerFn` sites use the schema mechanism; each has only its own route loader caller:

- `src/routes/__root.tsx:97` getSsrLangContext; caller `:249`.
- `src/routes/l.$slug.tsx:24` readAdPageFn; caller `:35`.
- `src/routes/$name.tsx:9` sellerExistsFn; caller `:31`.
- `src/routes/terms.tsx:7` termsPageFn; caller `:18`.
- `src/routes/privacy.tsx:7` privacyPageFn; caller `:18`.
- `src/routes/legal.$kind.tsx:9` scratchPageFn; caller `:38`.

Production `fetch()` under src/routes and src/server outside the helper set: none. The single actual production call is `src/server/upstream.ts:28`, the shared helper. Test fixture/census strings in gateway.census.test.ts are not production calls.

Every remaining CF-RT allowance (allowlist lines 5–8), also ESLint lines 110–113:

- `src/components/shell/location-data.ts:65` — client UUID copy, INC-857.
- `src/components/shell/place-carry.ts:26` — client UUID copy, INC-857.
- `src/features/posting/post-prefill.ts:13` — client UUID copy, INC-857.
- `src/integrations/supabase/previewAuthStorage.ts:48` — client UUID copy, INC-857.

These four out-of-scope siblings were not changed. R1's newly scoped scratch-pattern bypass is resolved at legal-service.ts:106.

## 9. THE CHECKS

Executed in the prescribed order:

```text
bun run lint: exit 0; 0 errors, 41 warnings
bun run test:unit: exit 1
Test Files  1 failed | 281 passed (282)
Tests  1 failed | 1792 passed | 1 skipped (1794)
Duration 223.46s
build-errors.log: build OK (2026-10-25T13:30:29Z; later 13:35:23Z also build OK)
bun run i18n:usage: exit 0
i18n usage map: 1736 keys across 563 files (395 dynamic call sites)
bun run format:check: exit 0; All matched files use Prettier code style!
```

There were no `error TS` lines in the readable harness log. No manual build/typecheck. The focused SFN/CF-RT run proves all newly changed rules independently of the existing EXH-17 failure.

## 10. THE END-TO-END CHECK

Each run used `bun run e2e:local`, ethio-staging credentials already configured, both mobile-360 and desktop-1280, two workers, fake mode and zero retries; Chromium override `/opt/ms-playwright/chromium-1194/chrome-linux/chrome`. Port 4173 was free before the first run. No spec/helper changed; no repeat, background rerun or ceiling kill.

```text
legal-pages.spec.ts whole:
Running 10 tests using 2 workers
10 passed (38.1s)
smoke-auth-i18n.spec.ts whole:
Running 2 tests using 2 workers
2 passed (21.2s)
ad-page.spec.ts --grep "AP-9 |AP-10 |AP-11 |AP-35 ":
Running 8 tests using 2 workers
8 passed (1.2m)
```

Each command exited 0, with complete owned-account teardown and no transport retries. The smoke flow signs in, reads header identity, switches Amharic and signs out; ad AP-35 checks a seller's live paged listings. These are real test flows, not merely signed-out page loads.

Captured `[WebServer]` logs: `[ssr-error]` totals **legal 0, smoke 0, ad 0**; no paths carry such a line. The root emits successful `[upstream] ssr language gate 200` reads. Logs are `/tmp/turn20/e2e-{legal,smoke,ad}.log`.

## 11. Limits and latest readable CI

R2's exact final unit failure:

```text
FAIL  scripts/conformance/executor-hooks.test.ts > the landing door (land.ts) > EXH-17 when the session's git refuses dev and hold/*, the door parks the commits on the session's own branch — never anywhere else
Error: Test timed out in 5000ms.
```

No other executor kit file was read or changed during this resume. The complete suite is not claimed green. Lint's extra warning is `src/routes/__root.tsx:185:5`, unused no-restricted-syntax disable after the fetch move; removal is outside the brief's exact root edits, so it is reported, not changed. The other 40 warnings remain.

The passing smoke run additionally emits unhandled abort stacks with `status 500`, followed by `[client-aborted]` on `/api/categories/tree`, `/api/i18n/en`, `/api/feed` and the root's `/_serverFn/…` request. No `[ssr-error]` line accompanies them. This out-of-scope abort-log concern is disclosed, not represented as a clean server log or fixed here.

Latest directly fetched CI header (not this landing):

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `1aeb2c8f08be55ff022de9e2c88073398173856f` (short `1aeb2c8`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T13:16:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40195508736
```

Final landing CI and bundle budget are unverified here; the supervisor reads that run after the platform commit.

## 12. Complete file list and new-file proof

`git diff --name-only 454b5849` before the report returned the following 22 files; this report is the 23rd file:

```text
AGENTS.md
docs/_changelog.md
docs/features/routes.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-20.md
docs/governance/mechanisms.md
eslint.config.js
public/i18n-usage.json
roadmap.md
scripts/conformance/routes-allowlist.txt
scripts/conformance/routes.test.ts
scripts/fixtures/bad-server-fn-example.ts.txt
src/features/admin/legal/legal-service.ts
src/features/legal/legal-kinds.ts
src/lib/schemas/server-fns.test.ts
src/lib/schemas/server-fns.ts
src/routes/$name.tsx
src/routes/__root.tsx
src/routes/l.$slug.tsx
src/routes/legal.$kind.tsx
src/routes/privacy.tsx
src/routes/terms.tsx
docs/governance/reports/foundations-turn-20.report.md
```

`git ls-files` proves the new brief, fixture and schemas already tracked by earlier platform landings:

```text
docs/governance/briefs/foundations-turn-20.md
scripts/fixtures/bad-server-fn-example.ts.txt
src/lib/schemas/server-fns.test.ts
src/lib/schemas/server-fns.ts
```

The platform already tracks this report: final `git ls-files docs/governance/reports/foundations-turn-20.report.md` returned that path. No manual add/commit. Markdown lint checks exited 0 with ignored-file warnings because ESLint supplies no Markdown configuration; Prettier checks cover the documents. No migration, user-visible string, dependency or E2E source change.