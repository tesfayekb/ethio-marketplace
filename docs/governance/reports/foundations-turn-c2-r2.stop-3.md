STOP — turn C2 part C: ruling 2's design (the fetch-ahead fetched on demand) still leaves 28 pages' first download 0.1 KiB above BASE (+57 bytes gzipped)
DONE: part A; STEP 0 (`2980ef4`); part B (`d7129b2`); ruling 1 (`328801b`, R2 `ebbaaca`); ruling 2 saved (`e5a1a4c`, sha256 087c60afac1f3b60acc9a46c095d8863928157bd651ba318fd46fc5f91790334, 4067 bytes); stop 2's CI red fixed at its root (`a60d003`); Part C per R5/R6 written and run green, NOT committed (held in the session)
LEFT: part C (commit), parts D, E, F, G; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a8adebeda482ac6ef36f206e8bfbfafd6bd6f535` (short `a8adebe`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-28T13:50:41Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40697185212
Two-step check: the reported commit equals stop 2's landing (a8adebe) — current for it. Its one red, classified (e): e2e-last-failure.md, shard 13, desktop-1280, ODE-1 (e2e/on-demand-failure.spec.ts) — `Error: route.fulfill: Fetch response has been disposed` at e2e/helpers/on-demand.ts :29, thrown through e2e/helpers/route-guard.ts :78; then `browserContext.close: Target page, context or browser has been closed`. Passed 2240 · failed 1 · flaky 0; the repeat lane ran green; no `[ssr-error]` or `[client-error]` line in shard 13's log. Root: `pageWentAway` named "Response has been disposed" (apiResponse.text's words) but not route.fulfill's own words for the same event, "Fetch response has been disposed" (node_modules/playwright-core/lib: `assert(buffer, "Fetch response has been disposed")`), so a request whose document had gone (ODE-1's Refresh) threw instead of ending. Fixed in `a60d003`: the guard's pattern names both wordings; RG-1 gains the route.fulfill line — RED first on the previous guard (`bunx vitest run src/test/e2e-route-guard.test.ts` → `Tests  1 failed | 4 passed (5)`, RG-1 `expected false to be true` at :50), then `Tests  7 passed (7)` with scripts/conformance/route-guard.test.ts; one local run, `bun run e2e:local -- e2e/on-demand-failure.spec.ts --grep "ODE-1"` → `2 passed (26.9s)` (both projects), `[ssr-error]` lines: 0 — a local pass does not reproduce the race; this landing's CI run is the proof. Neither Part B nor R2 touched this path (Part B removed the unused `routePageClosed` only).
FILES:
docs/features/admin-shell.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-c2-r1.md
docs/governance/briefs/foundations-turn-c2-r2.md
docs/governance/briefs/foundations-turn-c2.md
docs/governance/reports/foundations-turn-c2-r1.stop-2.md
docs/governance/reports/foundations-turn-c2-r2.stop-3.md
docs/governance/reports/foundations-turn-c2.stop-1.md
e2e/auth-signout.spec.ts
e2e/helpers/route-guard.ts
e2e/helpers/session.ts
roadmap.md
scripts/conformance/sign-out-landing-allowlist.txt
scripts/conformance/sign-out-landing.test.ts
src/components/app-shell.tsx
src/lib/sign-out-landing.ts
src/routes/admin.tsx
src/routes/settings.tsx
src/test/e2e-route-guard.test.ts

## The conflict

Ruling 2, R7: "the entry's JS line and every page's line must be at or BELOW BASE's numbers … A page above BASE is a STOP with the table; nothing is trimmed only to change a rounding." Part C written to R5/R6 measures, lock-exact (`bun run build`; `node scripts/check-bundle-size.mjs` → `Bundle budget OK.`):

- the entry's JS line: `JS: 205.7 KiB / 207 KiB — ok` — equal to BASE's (stop 2: 205.8);
- 24 page lines equal to BASE's, 28 page lines 0.1 KiB above BASE's (table below);
- exact bytes, the sum of `gzip -6c` over every JS file of the entry's closure as check-bundle-size lists it: BASE 211255 → Part C 211312 (+57); the entry chunk alone (`index-*.js`): BASE 125302 → stop 2 125381 (+79) → Part C 125343 (+41). (BASE re-measured for this stop by building BASE's four changed src files in place — its check-bundle-size lines equal the first BASE run's, every line.)

So ruling 2's split saves 22 bytes against stop 2's design but does not reach BASE: the fetch-ahead's code (`createHomeAhead`, about the size of BASE's single-piece copy) left the entry, but what the entry must hold to fetch it later costs nearly as much — the lazy module's loader (`loadOnce` over `import()`, with the bundler's preload map naming the new chunk file), the once-per-page gate for a signed-in visitor online, and the shell's effect that keeps the arrived module and re-considers on "online".

## Part C as held (R5, R6)

- src/lib/home-ahead.ts (new) — `createHomeAhead`, its types and the module's doc comment, moved from sign-out-landing.ts; and `signOutAhead(landing, menu, report)`, the sign-out path's list of pieces (the landing page's code, the account menu's), so the pieces' words live in the fetched chunk, not the entry.
- src/lib/sign-out-landing.ts — `SIGN_OUT_LANDING`, a one-line pointer to home-ahead.ts, `loadHomeAhead()` (`loadOnce(() => import("./home-ahead"))`), and `homeAheadWhenIdle(signedIn, online, ready)`: once per page life, only for a signed-in visitor online, after load at idle; a failed download is logged once through `logOnDemandFailure` and raises nothing.
- scripts/conformance/on-demand-failure.test.ts — DEFINERS gains `"src/lib/sign-out-landing.ts": ["loadHomeAhead"]`; ODC-1 reads `[ODC-1] loader callers: 15; outside the mechanism: 6; allowlist: 4`, the same line as before Part C (no new allowance); ODC-3 passes (the loader is exported over a loadOnce).
- src/lib/on-demand-failure.ts — `logOnDemandFailure(label, error)` writes the `[client-error] <label> failed to load: <errorText>` line and `reportOnDemandFailure` calls it (concern 4's mechanism, needed here by R5's "logged once (the `[client-error]` line)"; Part E wires its other consumers and ODC-7); and `whenPageIdle(ask)`, the one "after load, when idle" schedule: warmOverlaysWhenIdle (overlay-loader.ts) and homeAheadWhenIdle both call it. Measured on the way: a copy of that schedule in sign-out-landing.ts would be a second one (G0) and costs bytes; placing the one schedule in overlay-loader.ts made the bundler split overlay-loader into a chunk of its own (JS 206.0 KiB, /my-listings_/$listingId over its ceiling); on-demand-failure.ts is already in the entry and already imported by overlay-facade's chunk, so placing it there adds no chunk edge.
- src/components/app-shell.tsx — holds the arrived `HomeAhead` in state; until it arrives, each reading calls `homeAheadWhenIdle(user !== null, navigator.onLine, …)`; once it has, `consider(…)` on each reading and on "online". The E2E names stay inside `isE2E` (the report tells the landing's piece by its `load`).
- src/lib/env-flags.test.ts — R1's line only.
- Tests: src/lib/home-ahead.test.ts — HA-1…4 and SAH-1…4, every assertion kept; src/lib/sign-out-landing.test.ts — SAH-5 (the constant), SAH-6 (not asked before idle, nor for a signed-out visitor or one offline; once at idle, once per page life — on the exported scheduler, with a fresh module per test and the idle callback held), SAH-7 (a failed download: one `[client-error]` line, `reportOnDemandFailure` never called, not retried). e2e/auth-signout.spec.ts SO-13 as at stop 2.
- The runs: `bunx vitest run src/lib src/components scripts/conformance` → `Test Files  100 passed (100)` · `Tests  476 passed (476)`; `bun run typecheck` and eslint on the touched files clean.

## The question

Which way does Part C go?

(a) Accept ruling 2's design at +57 bytes gzipped over BASE on every page (the JS line equal at 205.7; 28 page lines +0.1 KiB) — 22 bytes less than stop 2's.

(b) Accept stop 2's design (the fetch-ahead in the entry, +79 bytes; JS 205.8).

(c) Fetch the account menu's code by the warm-up that already fetches it: `warmOverlaysWhenIdle` (overlay-loader.ts :63) asks every visitor's browser for the overlay primitives once the page is idle; what INC-960 lacked is that nothing said it had arrived. Concern 2 would keep BASE's single-piece `createHomeAhead` for the landing and give the warm-up an E2E-only state (`__ethioMenuAhead` inside `isE2E`, so nothing in the production build), SO-13 polling it — likely at BASE's numbers, but the menu's fetch-ahead would not be `createHomeAhead`'s piece as concern 2's MECHANISM line says, and it would serve every visitor, signed in or not, as the warm-up does today.

(d) Another way the supervisor names.

## The table — every check-bundle-size line that differs between BASE, stop 2 and Part C as held (KiB gzipped; CSS 20.5 in all three; every other page equal in all three)

| Line | BASE (a05e5c95) | stop 2 (held) | Part C (ruling 2, held) |
| --- | --- | --- | --- |
| JS (entry closure) | 205.7 | 205.8 | 205.7 |
| /account | 265.0 | 265.1 | 265.1 |
| /account_/legal | 207.5 | 207.6 | 207.6 |
| /account_/saved | 217.9 | 218.0 | 218.0 |
| /admin | 206.6 | 206.7 | 206.7 |
| /admin/ | 207.5 | 207.6 | 207.5 |
| /admin/ai | 330.2 | 330.3 | 330.3 |
| /admin/attributes | 346.5 | 346.6 | 346.6 |
| /admin/audit | 306.5 | 306.6 | 306.6 |
| /admin/countries | 336.2 | 336.3 | 336.3 |
| /admin/coverage | 328.8 | 328.9 | 328.9 |
| /admin/images | 207.3 | 207.4 | 207.3 |
| /admin/impersonation_/$sessionId | 307.1 | 307.2 | 307.2 |
| /admin/legal | 276.3 | 276.4 | 276.4 |
| /admin/legal_/$versionId | 275.6 | 275.7 | 275.7 |
| /admin/legal_/edit | 281.7 | 281.8 | 281.8 |
| /admin/locations | 268.2 | 268.3 | 268.3 |
| /admin/places | 337.5 | 337.6 | 337.6 |
| /admin/screening | 373.5 | 373.6 | 373.6 |
| /admin/translations | 407.0 | 407.1 | 407.1 |
| /admin/translations_/$lang | 319.2 | 319.3 | 319.3 |
| /admin/users_/$userId | 283.5 | 283.6 | 283.6 |
| /auth | 218.1 | 218.2 | 218.2 |
| /auth_/reset | 208.7 | 208.8 | 208.8 |
| /dev/primitives | 221.4 | 221.5 | 221.5 |
| /dev/tall | 206.0 | 206.1 | 206.1 |
| /l/$slug | 247.3 | 247.4 | 247.4 |
| /legal/$kind | 209.6 | 209.7 | 209.7 |
| /post | 393.7 | 393.8 | 393.8 |
| /post_/$listingId | 393.7 | 393.8 | 393.8 |
| /privacy | 209.6 | 209.7 | 209.6 |
| /settings | 269.4 | 269.5 | 269.5 |
| /terms | 209.6 | 209.7 | 209.6 |
