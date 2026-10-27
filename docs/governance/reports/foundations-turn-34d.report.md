# Turn 34d — a test's interception ends with its page (INC-934); the non-null census sees the definite-assignment mark
Base: a9f033a9516c92454595e47939ce12fa9e04e6c5 · Final commit: 821ca20 · Brief: docs/governance/briefs/foundations-turn-34d.md (sha256 7e8de655a003a287412f2fc4dd3a26c9579b3b9ec3af9984aad05a1cdc4a7a27)
Review: READY · 0 BLOCKER · 0 MAJOR · 7 MINOR · on 821ca20

## 1. Done / not done, by part and step

- Part A — done. `git fetch origin dev main ci-evidence`; `git switch dev`; `git rev-parse HEAD origin/dev` →
  `a9f033a9516c92454595e47939ce12fa9e04e6c5` / `a9f033a9516c92454595e47939ce12fa9e04e6c5` (HEAD = origin/dev = BASE;
  `git diff --name-only BASE..origin/dev` empty). CI: run 40406394089 on a9f033a9 — SUCCESS (section 11); guards-last-failure
  "No failed build/guard jobs in this run."; e2e-last-failure "last E2E run 40406394089 passed", "Flaky (passed on retry,
  DEC-030, non-gating): 0", "Errors outside any test (INC-589): none". No red on BASE to fix.
- STEP 0 — done. Brief saved: `sha256sum` → `7e8de655a003a287412f2fc4dd3a26c9579b3b9ec3af9984aad05a1cdc4a7a27`, `wc -c` → `41782`
  (both equal the carrying message's values; the file ends with the closing fence and one newline). roadmap.md line 3 and
  EDITs #1–#2 applied. Commit 994d1dc `turn 34d: step 0 — brief saved`.
- Part B — done (B1 BLOCKs 1–2 written; B2 EDITs #1–#5; B3 red shown, section 5; not committed separately).
- Part C — done (C1 BLOCKs 3–4; C2 EDITs #1–#3; C3 EDITs #1–#3; C4 typecheck + `bunx vitest run scripts/conformance src/test`
  green). Commit f5fa84e `turn 34d parts B–C: the route guard and the definite-assignment census`.
- Part D — done (AGENTS.md #1, mechanisms.md #1, _changelog.md #1). Commit 821ca20 `turn 34d part D: docs`.
- THE CHECKS — done, all green (section 5). THE END-TO-END CHECK — done (section 5). THE INDEPENDENT REVIEW — done (line 3).

## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)

`git diff --name-only a9f033a9516c92454595e47939ce12fa9e04e6c5` (before this report's commit):

```
AGENTS.md
docs/_changelog.md
docs/governance/briefs/foundations-turn-34d.md
docs/governance/mechanisms.md
e2e/helpers/on-demand.ts
e2e/helpers/route-guard.ts
roadmap.md
scripts/conformance/non-null-allowlist.txt
scripts/conformance/non-null.test.ts
scripts/conformance/route-guard-allowlist.txt
scripts/conformance/route-guard.test.ts
src/test/e2e-route-guard.test.ts
```

plus this report, docs/governance/reports/foundations-turn-34d.report.md (its own commit).

New files — `git ls-files -- e2e/helpers/route-guard.ts scripts/conformance/route-guard-allowlist.txt scripts/conformance/route-guard.test.ts src/test/e2e-route-guard.test.ts docs/governance/briefs/foundations-turn-34d.md`:

```
docs/governance/briefs/foundations-turn-34d.md
e2e/helpers/route-guard.ts
scripts/conformance/route-guard-allowlist.txt
scripts/conformance/route-guard.test.ts
src/test/e2e-route-guard.test.ts
```

Hash list: `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34d.md | sha256sum -c` — all ten lines `OK`
(AGENTS.md, docs/_changelog.md, docs/governance/mechanisms.md, e2e/helpers/on-demand.ts, e2e/helpers/route-guard.ts,
scripts/conformance/non-null-allowlist.txt, scripts/conformance/non-null.test.ts, scripts/conformance/route-guard-allowlist.txt,
scripts/conformance/route-guard.test.ts, src/test/e2e-route-guard.test.ts).

## 3. Behaviour contract — answer tables before → after  (every touched route/function/screen)

No route, door, screen or product function touched: `git diff a9f033a9 --stat -- src/features src/routes src/lib src/components src/integrations supabase` — empty.

`refuseScripts(page, refuse)` (e2e/helpers/on-demand.ts):

| Case | BASE | Now |
| --- | --- | --- |
| a `**/*.js` request whose URL/text `refuse` names | fetched, read, `route.abort("failed")` | same |
| a `**/*.js` request `refuse` does not name | fetched, read, `route.fulfill({ response })` | same |
| the page goes while the handler runs (`Target page, context or browser has been closed`, `Response has been disposed`) | the error throws out of the handler; the test fails in its helper | the handler ends (`whilePageLives`); no log line |
| any other error inside the handler | throws | throws (unchanged) |
| signature, glob, order of fetch → read → abort/fulfill | — | unchanged |

`openAfterTheOneReload` — unchanged. New: `pageWentAway(error)`, `whilePageLives(handler)` (e2e/helpers/route-guard.ts).

## 4. Censuses  (every grep the brief asked for, with file:line; "none found" only after the grep)

The consumer census (CF-RG-1's own reading; the spec files are unchanged since BASE — `git diff --quiet a9f033a9 HEAD -- e2e/shell.spec.ts e2e/post-wizard-bundle2.spec.ts e2e/post-wizard-specs.spec.ts` true), re-located with the Grep tool for `\.fetch\(` in e2e/:

| `.route(` call | its `route.fetch()` | test | now |
| --- | --- | --- | --- |
| e2e/helpers/on-demand.ts :19 (BASE) | :21 (BASE) | ODE-1's helper | through whilePageLives (on-demand.ts :24 / :27) |
| e2e/shell.spec.ts :3857 | :3858 | PK-2 | held, allowlist (2) |
| e2e/shell.spec.ts :3890 | :3891 | PK-3 | held, allowlist (2) |
| e2e/post-wizard-bundle2.spec.ts :268 | :275 | — | held, allowlist (2) |
| e2e/post-wizard-bundle2.spec.ts :386 | :392 (inside an inner async block) | — | held, allowlist (2) |
| e2e/post-wizard-specs.spec.ts :2549 | :2550 | — | held, allowlist (1) |

CF-RG-1's console line now: `[route-guard] files read: 117; unguarded handlers: 3` (3 files; 5 handlers — see Departures, MINOR 5).
In BASE's red run: `files read: 116; unguarded handlers: 4`.

Non-null census (CF-NN-1's console line now): `[non-null] files read: 1065; assertions: 992 in 144` (979 non-null + 13
definite-assignment; BASE's allowlist held 143 files). The 13: src/features/posting/use-draft.test.tsx 10 (24 → 34),
src/lib/refresh-after-write.test.ts 1 (5 → 6), e2e/post-wizard-bundle2.spec.ts 2 (new line at 2) — the census's counts,
which CF-NN-1 accepts only at exactly these keys.

## 5. Tests  (ids added/changed/re-pointed with reasons; red-first evidence; unit totals; the E2E count lines and [ssr-error] counts; the J-audit line when e2e/** changed)

New: CF-RG-1, CF-RG-2 (scripts/conformance/route-guard.test.ts), RG-1, RG-2 (src/test/e2e-route-guard.test.ts). Changed: CF-NN-2's
planted file gains `let later!: number` (expected lines `[2, 3]` → `[2, 3, 5]`, key `(2)` → `(3)`), the brief's B2 EDITs #4–#5.
ODE-1 and every other test unchanged. Id collisions: the reviewer grepped `it(`/`test(` titles for `(CF-)?RG-[0-9]` — none.

Red first (B3; after B1–B2, before Part C) — `bunx vitest run scripts/conformance/route-guard.test.ts scripts/conformance/non-null.test.ts`:

```
FAIL  scripts/conformance/non-null.test.ts > ... > CF-NN-1 every file holds no more non-null assertions than its allowlist line, and the kit none
Error: scripts/conformance/non-null-allowlist.txt:117 stale allowance: src/features/posting/use-draft.test.tsx (24) | non-null assertions written before the platform rule was enforced | INC-932
FAIL  scripts/conformance/route-guard.test.ts > ... > CF-RG-1 every e2e route handler that fetches the real answer goes through whilePageLives, or its file's line holds it
AssertionError: expected 'e2e/helpers/on-demand.ts:19 a route h…' to be '' // Object.is equality
+ e2e/helpers/on-demand.ts:19 a route handler fetches the real answer outside whilePageLives (e2e/helpers/route-guard.ts)
 Test Files  2 failed (2)
      Tests  2 failed | 2 passed (4)
```

The supervisor's expected totals and both failure lines match. RG-1/2 test a new module (no red run owed).

C4 — `bunx vitest run scripts/conformance src/test`: `Test Files  34 passed (34)` · `Tests  163 passed (163)`. The new and changed
ids, verbose: CF-RG-1 ✓, CF-RG-2 ✓, CF-NN-1 ✓, CF-NN-2 ✓, RG-1 ✓, RG-2 ✓.

THE CHECKS:
- `bun run lint` — `✖ 39 problems (0 errors, 39 warnings)` (expected 0 errors, 39 warnings).
- `bun run typecheck` — `tsc --noEmit`, exit 0.
- `bun run test:unit` — `Test Files  326 passed (326)` · `Tests  1996 passed (1996)` (exit 0; no known-limit timeout in this run).
- `bun run i18n:usage` — `i18n usage map: 1736 keys across 593 files (395 dynamic call sites)`; `git diff --stat -- docs/generated/i18n-usage.json public/i18n-usage.json` empty.
- `bun run build` — exit 0.
- `bash scripts/check-migrations.sh` — not run: supabase/migrations/ unchanged.
- `bun run format:check` (last) — `All matched files use Prettier code style!`

THE END-TO-END CHECK — `bun run e2e:local -- e2e/on-demand-failure.spec.ts` (staging, both projects, 2 workers, fake mode, 0 retries; exit 0):

```
Running 2 tests using 2 workers
  ✓  1 [mobile-360] › e2e/on-demand-failure.spec.ts:20:3 › ... › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads (4.5s)
  ✓  2 [desktop-1280] › e2e/on-demand-failure.spec.ts:20:3 › ... › ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads (4.7s)
  2 passed (14.1s)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
```

Server log (the web server's output, piped into the run's output: 9 `[WebServer]` lines read): `[ssr-error]` — 0 lines, by any path.
One run proves the helper still refuses and serves as before; it cannot prove the flake is gone (the flake proof is the manual
Flake check, DEC-184).

J-audit (e2e/** changed: e2e/helpers/route-guard.ts new, e2e/helpers/on-demand.ts): J1–J9 — no fixture, row, user, global list,
locator, wait or identity is added or changed; no spec file changed; no `waitForTimeout`; no real row read or written.

## 6. K2 — siblings that bypass the mechanism  (file:line, in scope or not; what was left and why)

Interceptions that fetch the real answer outside whilePageLives: the five held handlers in section 4 (e2e/shell.spec.ts :3857, :3890;
e2e/post-wizard-bundle2.spec.ts :268, :386; e2e/post-wizard-specs.spec.ts :2549) — out of SCOPE, held by their allowlist lines (INC-934).

Paths the census does not see (the brief's K2 list) — greps run:
- `\.fetch\(` across e2e/ — 7 hits: the five above, on-demand.ts :27 (guarded) and route-guard.ts :6 (a comment). No fetch on a
  renamed route or through another identifier.
- `\.route\(\s*[^,]+,\s*[A-Za-z_$][\w$]*\s*\)|routeFromHAR|context\(\)\.route\(|context\.route\(|routeWebSocket` across e2e/ — one hit,
  e2e/ad-page.spec.ts :211 `context.route("**/api/listings/view", (route) => route.continue({ headers … }))`: it continues, never
  fetches — not an interception that reads the real answer. No handler passed by name; no HAR routing; no WebSocket routing.
- The reviewer's independent greps (`fetch(route`, `request.get|post`, `routeFromHAR`, `routeWebSocket` inside handlers) found no
  other; its `page.request.*` hits (e2e/helpers/locations.ts :625, photos.ts :104 and :140, posting.ts :61) are outside route handlers.

Result: none beyond the census's own five.

Other K2 the review named (left, out of the brief's text): 33 `instanceof Error` sites already in e2e/ (the reviewer's count) besides
route-guard.ts :13 — the brief's BLOCK 3 carries the same form (Departures, MINOR 3).

## 7. Allowlists and guards  (each allowlist's count before → after; every new line with reason and until; guard self-tests run)

`git diff --numstat a9f033a9..HEAD -- scripts/conformance/`: non-null-allowlist.txt +3/−2, non-null.test.ts +18/−6, route-guard-allowlist.txt +6/−0 (new), route-guard.test.ts +124/−0 (new).

- scripts/conformance/non-null-allowlist.txt — 143 → 144 lines (`grep -vc '^#'`). New: `e2e/post-wizard-bundle2.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932`. Raised: `src/features/posting/use-draft.test.tsx (24 → 34)`, `src/lib/refresh-after-write.test.ts (5 → 6)` — the census now counting definite-assignment marks that were already in those files at BASE, no new mark written.
- scripts/conformance/route-guard-allowlist.txt — new, 3 lines: `e2e/post-wizard-bundle2.spec.ts (2)`, `e2e/post-wizard-specs.spec.ts (1)`, `e2e/shell.spec.ts (2)`, each `| handlers written before whilePageLives; they move when the file is next run whole (G37) | INC-934`.
- Guard self-tests: CF-RG-2 (planted unguarded handler named at line 4; a guarded one and a never-fetching one passed) ✓; CF-NN-2 (planted, now with a definite-assignment mark) ✓. CF-RG-1 shown red on BASE and green now; CF-NN-1 shown red (stale line) and green now.
- wired.test.ts: the census is itself a `.test.ts` (run by the component-tests job), outside wired.test.ts's domain (it names non-test scripts/conformance census modules), so no caller line is owed; unit suite green.

## 8. Strings  (every new or changed key with EN and AM text; "none" when the brief says No new string)

None (FLAGS no-new-string). Check: `bun run i18n:usage` left both maps unchanged (`git diff --stat` empty); no `src/i18n/` path in section 2.

## 9. Migrations  (file, sha256, mark, apply pairing line; or "none")

None (FLAGS no-migration). Check: `git diff --stat a9f033a9 -- … supabase` empty; no `supabase/` path in section 2.

## 10. Departures  (every difference from the brief with its reason; every STOP and ruling in the turn)

No departure from the brief's text: every FILE and EDIT block is in the tree byte for byte (the hash list, section 2). No STOP, no ruling.

The reviewer's seven MINORs, none fixed — each lies in text the brief fixes by hash (a fix would break `sha256sum -c`, which the brief
says is "never [fixed] by editing an expectation"), or in a file outside the turn's files. Listed for the supervisor's ruling:

1. src/test/e2e-route-guard.test.ts :10 `const route = {} as unknown as Route;` — a cast form on the banned list (test-only; the brief's BLOCK 4).
2. e2e/helpers/route-guard.ts :25 `if (pageWentAway(error)) return;` — ends without a log line (the brief's own decision, G17). The reviewer's case: if "Response has been disposed" ever arrived while the page lived, the request would go unanswered and the test would time out rather than fail with a named error.
3. e2e/helpers/route-guard.ts :13 `error instanceof Error ? error.message : String(error)` — rule 10 (F4) reads a caught error's text through `errorText` (src/lib/error-text.ts); the brief's BLOCK 3.
4. scripts/conformance/route-guard.test.ts :55 — the census passes any non-inline handler, so `page.route(x, otherWrapper(async (route) => { await route.fetch(); }))` would pass; CF-RG-2 plants no such case. Neither a named handler nor an aliased route is seen (section 6 found none today).
5. scripts/conformance/route-guard.test.ts :85 — the log line's `unguarded handlers: ${keys.length}` counts files (3), not handlers (5).
6. docs/features/e2e-harness.md has no whilePageLives line (H1); the brief's narrowed allowance leaves that file out.
7. roadmap.md :524 says "no migration; Lovable" for turn 34d, while the brief names Claude Code as the executor (DEC-257) — copied word for word from the brief's EDIT roadmap.md #2.

Process note: the `reviewer` subagent was called with `run_in_background: false`, but the platform started it in the background.
The turn waited for its answer before writing this report (nothing committed in between).

## 11. CI  (the first six lines of ci-status.md for the last landed commit you can read, with the two-step SHA check; "this landing's run has not completed" when it has not)

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `a9f033a9516c92454595e47939ce12fa9e04e6c5` (short `a9f033a`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T22:12:48Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40406394089
```

Two-step: conclusion SUCCESS; the reported commit a9f033a9 equals BASE, the last landed commit. This landing's run has not completed.

## 12. Limits  (what you could not run or prove, and why — logs unavailable, no browser, no secret)

- The fix's purpose (ODE-1 no longer failing in its helper when the page goes mid-fetch) is not proven by a local run: the race is intermittent and local repeat runs are forbidden (DEC-184). One local run passed at both widths; RG-2 proves the unit behaviour; the Flake check workflow and CI's runs are the proof.
- The known-limit tests (EXH-4/11/12/17/19/21, AAN-1, CF-SL-1/3/6) did not time out in this turn's full unit run (326/1996 passed), so no single-file runs were owed.
- `check-migrations.sh` not run (no migration changed).
- CI for this landing: not yet run (section 11).
