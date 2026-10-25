# Foundations turn 21 — completion report

Brief: docs/governance/briefs/foundations-turn-21.md (sha256 `26ba0de900301d159b490583a7e3ba610f7e4828341a1c977a938d789099223d`, verified at STEP 0).
START: `88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba`. HEAD when this report was written: `13798dd5b386baae032014b1cc1fb577d4cb36b4` (platform mid-turn save); the final platform commit carries this report.

## 1. Files (`git diff --name-only 88bfbc1b`)

```text
docs/_changelog.md
docs/features/ci-guards.md
docs/features/routes.md
docs/governance/briefs/foundations-turn-21.md
docs/governance/mechanisms.md
eslint.config.js
roadmap.md
scripts/conformance/lint-rules.test.ts
src/server/upstream.test.ts
src/server/upstream.ts
```

plus this report. `git ls-files` lists the new files `docs/governance/briefs/foundations-turn-21.md` and `scripts/conformance/lint-rules.test.ts`. The i18n maps did not change.

## 2. Part A — CI first

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba` (short `88bfbc1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T14:03:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40198835862
```

e2e-last-failure.md: "last E2E run 40198835862 passed". guards-last-failure.md: "No failed build/guard jobs in this run." There was nothing to fix.

## 3. Done by part

- STEP 0 — done. The sha256 matches. Roadmap line 3 was replaced and the turn-21 line added after turn 20.
- B1 — done. `RESTRICTED_SYNTAX` sits above `export default`, and its selectors were moved over unchanged.
- B2 — done. `lint-rules.test.ts` exports `owedLists` and `missingLists`, and it uses kit `walkFiles` and `TREE_SCAN_MS`.
- B3 — done. All four blocks compose the lists. sha256 of eslint.config.js = `622d60afda68dce1992d6dee8180563f7ebb55c6d90ab059d69705109c3e8727`, which matches the supervisor's value, so no diff is pasted.
- C1 and C2 — done.
- D1–D4 — done. In D3, each old text occurred exactly once (counts 1, 1, 1, 1, and the row-37 anchor 1).
- E — done (read-only, §8).

## 4. Red-first

CF-LINT, with B1 saved and the blocks still inline:

```text
× CF-LINT-1 every src file carries every list the owed table gives it
AssertionError: expected [ …(121) ] to deeply equal []
  (121 entries, every one "typedClient, caughtError")
✓ CF-LINT-2 every e2e file carries specLint
× CF-LINT-3 … AssertionError: expected false to be true   (at line 98: src/routes/planted-lint.tsx)
Tests  2 failed | 1 passed (3)
```

After B3: `✓ lint-rules.test.ts (3 tests)` and `✓ routes.test.ts (9 tests)`, with 12 passed in total.

UPS-4, before C1: `× UPS-4 … AssertionError: expected "info" to be called 1 times, but got 0 times` (Tests 1 failed | 3 passed). After C1: `Tests 4 passed (4)`.

## 5. THE CHECKS

- `bun run lint`: 40 warnings at START, `✖ 40 problems (0 errors, 40 warnings)` after the change. No warning remains at src/routes/__root.tsx:185.
- `bun run test:unit`: `Test Files 1 failed | 282 passed (283)` and `Tests 1 failed | 1796 passed | 1 skipped (1798)`.
  - The one failure is EXH-17 (see §9).
  - Every CF-LINT-1…3, CF-RT-1…8 and UPS-1…4 test passed.
- build-errors.log: newest entry `=== build 2026-10-25T14:15:26Z === build OK`, with no `error TS` lines.
- `bun run i18n:usage`: 1736 keys across 563 files (395 dynamic call sites). Neither map moved.
- `bun run format:check`: run last and clean (see the chat close).

## 6. THE END-TO-END CHECK

Setup: e2e/smoke-auth-i18n.spec.ts whole, both projects, 2 workers, fake mode, `--retries=0`, the Chromium path override, port 4173 free beforehand.

- Result: `2 passed (23.6s)`.
- `[ssr-error]`: 0 on every path.
- `[upstream]` lines: seven `[upstream] ssr language gate 200 …ms`. Playwright's `[WebServer]` prefix does not show which stream a line came from, so the log level cannot be seen in this output. UPS-4 proves that a 200 answer goes to console.info.

## 7. K2 — `no-restricted-syntax` blocks and repeated rule keys (eslint.config.js)

- :126 src-wide block (files :124): typedClient + caughtError.
- :139 INC-815 exemption block (files :137): typedClient.
- :166 route-boundary block (files :148): typedClient + caughtError + routeBoundary.
- :179 spec-lint block (files :177): specLint.

No other rule key is set in more than one hand-written block. `no-restricted-imports` (:101), `react-refresh/only-export-components` (:113) and `@typescript-eslint/no-unused-vars` (:114) are set only in the `**/*.{ts,tsx}` block. The extended presets (js, tseslint, reactHooks, eslint-plugin-prettier) were not censused key by key.

## 8. Part E — INC-893 (read-only)

(a) First `[client-aborted]` line (`GET /api/i18n/en`), from the request's first line:

```text
[WebServer] abort@[native code]
[WebServer] @/dev-server/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] emit@node:events:97:22
[WebServer] emitCloseNT@internal:http:47:79
[WebServer] emit@node:events:118:23
[WebServer] emitCloseNT@internal:streams/destroy:78:14
[WebServer] processTicksAndRejections@
[WebServer] abort@[native code]
[WebServer] @/dev-server/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] emit@node:events:97:22
[WebServer] emitCloseNT@internal:http:47:79
[WebServer] emit@node:events:118:23
[WebServer] emitCloseNT@internal:streams/destroy:78:14
[WebServer] processTicksAndRejections@ (status 500)
[WebServer] caused by: abort@[native code]
[WebServer] @/dev-server/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] emit@node:events:97:22
[WebServer] emitCloseNT@internal:http:47:79
[WebServer] emit@node:events:118:23
[WebServer] emitCloseNT@internal:streams/destroy:78:14
[WebServer] processTicksAndRejections@
[WebServer] [client-aborted] GET /api/i18n/en
```

Second `[client-aborted]` line (`GET /api/feed`): the same 21 lines, frame for frame, and then `[WebServer] [client-aborted] GET /api/feed`.

(b) The first complete stack carrying "status 500" is the 14-line block above, from the second `abort@[native code]` through `caused by: … processTicksAndRejections@`. Every frame is native, node:events or the bundled srvx line 544.

(c) Who writes it:
- `(status ${…})`: src/lib/error-capture.ts:38 `describeStatus`.
- `caused by: `: src/lib/error-capture.ts:27 `describeError`.
- Both are called by the `console.error` wrapper at src/lib/error-capture.ts:57-64.
- The error object is logged by h3: node_modules/h3/dist/h3.mjs:225 `if (error.unhandled && !config.silent) console.error(error);` (bundled at dist/server/_libs/h3+rou3+srvx.mjs:985).
- The abort is raised by srvx: node_modules/srvx/dist/adapters/node.mjs:232-236 `_abortController` (`res.once("close", …) abort()` when the response has not finished).
- Grepping the first message line (`abort@[native code]`) finds nothing in node_modules/@tanstack, node_modules/srvx, node_modules/h3 or src/, because it is a native frame.

Finding: when a client hangs up, srvx aborts the request signal. h3 then wraps the abort as an unhandled HTTPError(500) and logs it, and the app's error-capture wrapper prints it with its cause before answer.ts:127 writes `[client-aborted]`.

(d) `/_serverFn/258c9c7b…` requests (2, at sign-out) produce the same 21-line pair before `[client-aborted] GET /_serverFn/…` as the `/api/` requests do. No difference was seen apart from the path.

## 9. Limits

- EXH-17, scripts/conformance/executor-hooks.test.ts (INC-890, the other executor's kit; not changed, skipped or worked around): `× EXH-17 when the session's git refuses dev and hold/*, the door parks the commits on the session's own branch — never anywhere else 5232ms` with `Error: Test timed out in 5000ms.`
- In the mid-turn unit run, EXH-11 from the same file also timed out at 5000ms (`× EXH-11 … 5163ms`), together with UPS-4, which failed because that run raced the C1 save. A standalone rerun of UPS-4 passed 4/4. EXH-11 passed in the final run.
- The `[upstream]` log level could not be read from the E2E output (§6).

## 10. Departures

- The brief asks for a whole unit run after Part B and another after Part C. I ran one mid-turn run after C1 instead, and the CF-LINT red/green and CF-RT runs stood in as Part B's proof. The whole suite also ran at THE CHECKS.

## 11. ci-status.md (last readable)

The same six lines as §2: 88bfbc1b, SUCCESS, 2026-10-25T14:03:33Z, run 40198835862.

## 12. CI wait

This turn ends after the final commit. The supervisor reads the run.
