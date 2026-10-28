# Turn 34c-4 — the tests find the stored session by the app's own names; the page a sign-out lands on is fetched ahead of time (DEC-279, INC-930); the route guard reads a closed page
Base: 562db573165aec4e14e3f11e347cc9a21fceadfa · Final commit: efea10e82bd248bed2002215641e5c5ac7dbbbea · Brief: docs/governance/briefs/foundations-turn-34c-4.md (sha256 c3c813dbd85cb60acca8c211f2764a9b1e2920b4a8b7cad9259e0fe4af2b3dce)
Review: READY · 0 BLOCKER · 1 MAJOR · 7 MINOR · on efea10e

## 1. Done / not done, by part and step

- Part A — done. `git rev-parse HEAD origin/dev` → `562db573165aec4e14e3f11e347cc9a21fceadfa` twice (HEAD = origin/dev = BASE); `git diff --name-only BASE..origin/dev` empty. CI on BASE: SUCCESS (section 11).
- STEP 0 — done. The brief was taken byte for byte from the carrying message (extracted by a scratch script from this session's own transcript, so it was not retyped): `sha256sum` → `c3c813dbd85cb60acca8c211f2764a9b1e2920b4a8b7cad9259e0fe4af2b3dce`, `wc -c` → `93833` — both as the carrying message states. roadmap.md line 3 edited as the brief says. Commit `57ef95f`.
- Part B — done (B1 red shown, B2 green). Commit `442e3ea`.
- Part C — done (SO-13 red on BASE's app, both projects; not committed).
- Part D — done (D1, D2 green). Commit `e81fb97` (Parts C and D).
- Part E — done (E1 red shown, E2 green). Commit `4bdcff3`.
- Part F — done. Commit `efea10e`.
- THE CHECKS, THE END-TO-END CHECK, THE INDEPENDENT REVIEW — done (sections 5, 12).

## 2. Files changed

`git diff --name-only 562db573165aec4e14e3f11e347cc9a21fceadfa..HEAD` (before this report's commit):

```
docs/_changelog.md
docs/features/e2e-harness.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-34c-4.md
docs/governance/mechanisms.md
e2e/admin-categories-home.spec.ts
e2e/auth-signout.spec.ts
e2e/helpers/route-guard.ts
e2e/helpers/session.ts
e2e/helpers/ui.ts
e2e/smoke-auth-i18n.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/project-reads.test.ts
scripts/conformance/route-guard.test.ts
src/components/app-shell.tsx
src/lib/env-flags.test.ts
src/lib/session-key.ts
src/lib/sign-out-landing.test.ts
src/lib/sign-out-landing.ts
src/lib/supabase-door.ts
src/test/e2e-route-guard.test.ts
```

Plus this report: docs/governance/reports/foundations-turn-34c-4.report.md.

New files, `git ls-files`: `docs/governance/briefs/foundations-turn-34c-4.md`, `src/lib/session-key.ts`, `src/lib/sign-out-landing.test.ts`, `src/lib/sign-out-landing.ts` — all four listed.

The two i18n maps are not in the brief's THE FILES list — see section 10.

## 3. Behaviour contract — answer tables before → after

| Touched | BASE | After |
| --- | --- | --- |
| A signed-in visitor's page, online (app-shell.tsx) | fetches no route code beyond the page's own | fetches the Home route's code once per page life (`router.loadRouteChunk(router.routesById["/"])`), after the shell knows the visitor; offline at first → on the `online` event; a failure logged once `[home-ahead] the Home page's code did not download: <errorText>` and not retried (CHANGE 2, DEC-279) |
| A signed-out visitor's page | nothing fetched ahead | unchanged: nothing fetched ahead (HA-2) |
| An offline sign-out from a page opened directly (/settings) | lands on "/" showing the root's "This page didn't load" view until the connection returns | lands on "/" with Home drawn by its own code, signed out; the page loads afresh when the connection returns (DEC-271 unchanged) — SO-13 |
| E2E build only: `window.__ethioHomeAhead` | absent | the fetch's state (`loading` / `ready` / `failed`), set only when `isE2E` |
| `storedSessionKey()`, `besideStoredSession(name)`, `authStorageKey(url)` (supabase-door.ts) | `sb-<ref>-auth-token`, `sb-<ref>-<name>`, null for a bad URL | same answers; the rule now lives in src/lib/session-key.ts and is re-exported (`authStorageKey`); supabase-door.test.ts, session-policy.test.ts, auth-client.test.ts pass unchanged |
| e2e `storageKey()` | `sb-<host's first label>-auth-token` | same name from `authStorageKey`; a non-URL E2E_SUPABASE_URL throws a named error (`new URL` threw before) |
| e2e `injectSession` on a persona switch | removed every `sb-*-auth-token` and `sb-*-stepped-up-at` | removes this project's two names (`storageKey()`, `besideSessionKey("stepped-up-at")`) and the sentinel |
| e2e session waits / reads (ui.ts, smoke, auth-signout, admin-categories-home) | searched for any `sb-…-auth-token` | read this project's exact name through the session helpers; a missing session in `forgetStoredSession` / `editStoredSession` throws `[e2e:session] no persisted supabase session found` |
| SO-8 / SO-9's survivor check | every `sb-` name of any project | unchanged (`supabaseNamesIn`) |
| `whilePageLives` (route-guard.ts) | either "gone" error ends the request quietly | ends quietly only on one of the two errors AND `routePageClosed(route)`; on an open page the error throws; error words read through `errorText` |
| CF-RG-1 | a handler inside any call expression counted as guarded; log `unguarded handlers: <files>` | only `whilePageLives` by name guards; log `unguarded handlers: <handlers> in <files> files` |

Nothing else changes: no string, route, door, migration or package.

## 4. Censuses

K1a — `grep -rn -e 'auth-token' -e '"sb-' -e "'sb-" -e '`sb-' e2e --include=*.ts | grep -v '^e2e/helpers/session.ts'`, before Part B — 18 lines, as the brief expected:

```
e2e/helpers/ui.ts:485: * authenticated-only account menu, and the persisted `sb-<ref>-auth-token`
e2e/helpers/ui.ts:523:          if (key !== null && key.startsWith("sb-")) local.push(key);
e2e/helpers/ui.ts:569:    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
e2e/helpers/ui.ts:612: * node-side password grant is injected as the persisted `sb-<ref>-auth-token`
e2e/helpers/ui.ts:626:    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
e2e/smoke-auth-i18n.spec.ts:58:    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
e2e/auth-signout.spec.ts:143:        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
e2e/auth-signout.spec.ts:212:        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
e2e/auth-signout.spec.ts:230:        Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")),
e2e/auth-signout.spec.ts:272:        Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")),
e2e/auth-signout.spec.ts:308:    lastActivityAt: `sb-${ref}-last-activity-at`,
e2e/auth-signout.spec.ts:309:    sessionStartedAt: `sb-${ref}-session-started-at`,
e2e/auth-signout.spec.ts:310:    sessionRef: `sb-${ref}-session-ref`,
e2e/auth-signout.spec.ts:311:    authToken: `sb-${ref}-auth-token`,
e2e/auth-signout.spec.ts:520:        Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
e2e/auth-signout.spec.ts:573:        Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
e2e/admin-categories-home.spec.ts:240:          if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
e2e/admin-categories-home.spec.ts:380:          if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
```

K1b — `grep -rn "whilePageLives\|pageWentAway" e2e --include=*.ts | grep -v helpers/route-guard.ts`:

```
e2e/helpers/on-demand.ts:5:import { whilePageLives } from "./route-guard";
e2e/helpers/on-demand.ts:18: * left can still be in this handler when that page goes: it ends there (whilePageLives).
e2e/helpers/on-demand.ts:26:    whilePageLives(async (route) => {
e2e/ad-page-layout.spec.ts:4:import { whilePageLives } from "./helpers/route-guard";
e2e/ad-page-layout.spec.ts:40:      whilePageLives(async (route) => {
```

As expected: on-demand.ts and ad-page-layout.spec.ts.

## 5. Tests

- B1 (red, not committed): `bunx vitest run scripts/conformance/project-reads.test.ts` → `[project-reads] e2e files read: 117; findings: 16`; `Tests  1 failed | 3 passed (4)` — CF-PROJECT-3 failed (16 = the 12 sites' code lines and policyKeys' 4; the census does not count the two comment lines of K1a).
- B2: `bunx vitest run scripts/conformance/project-reads.test.ts src/lib/supabase-door.test.ts src/features/session/session-policy.test.ts src/features/auth/auth-client.test.ts` → `Test Files  4 passed (4)`, `Tests  36 passed (36)`.
- C1 (red on BASE's app, not committed): `bun run e2e:local -- e2e/auth-signout.spec.ts --grep "SO-13 "` → `2 failed` (`[mobile-360]` and `[desktop-1280]`); first failure: `Error: the Home page's code is fetched ahead of time for a signed-in visitor` · `Expected: "ready"` · `Received: "idle"`.
- D1: `bunx vitest run src/lib/sign-out-landing.test.ts src/lib/env-flags.test.ts src/components` → `Test Files  37 passed (37)`, `Tests  168 passed (168)`.
- D2: the same SO-13 run → `2 passed (13.7s)`; `[ssr-error]` 0.
- E1 (red, not committed): `bunx vitest run src/test/e2e-route-guard.test.ts` → `Tests  2 failed | 1 passed (3)` — RG-1 (`expect(pageWentAway(new Error(""))).toBe(false)` → `expected false to be true` on the object's message) and RG-3 (`TypeError: routePageClosed is not a function`).
- E2: `bunx vitest run src/test/e2e-route-guard.test.ts scripts/conformance/route-guard.test.ts scripts/conformance/wired.test.ts` → `Test Files  3 passed (3)`, `Tests  7 passed (7)`.
- New ids: HA-1…4, RG-3, CF-PROJECT-3, CF-PROJECT-4, SO-13. Changed: RG-1 (two more expectations), RG-2 (routes given a closed page), CF-RG-2 (a handler behind another wrapper planted, expected at line 16).
- Unit suite: `bun run test:unit` → `Test Files  334 passed (334)`, `Tests  2025 passed (2025)` (the brief's expectation).
- THE END-TO-END CHECK (both projects, 2 workers, fake mode, 0 retries, ethio-staging):
  - `bun run e2e:local -- e2e/auth-signout.spec.ts e2e/smoke-auth-i18n.spec.ts e2e/admin-categories-home.spec.ts` → `Running 46 tests using 2 workers` · `46 passed (5.2m)`.
  - `bun run e2e:local -- e2e/admin-users.spec.ts e2e/settings.spec.ts --grep "AU-1 |S-3 "` → `Running 3 tests using 2 workers` · `3 passed (35.9s)`.
  - `[ssr-error]` in the server log (Playwright's piped `[WebServer]` output, 155 and 28 lines read): 0 in both runs, so no path.
- J-audit (e2e/** changed): the changes are the brief's blocks applied by the applier (G37). SO-13 leases one pooled account (J9), seeds the session before navigating (J7), locates by test id (J5), waits by `expect.poll` with no `waitForTimeout` (J7), and edits no real row (J3).

## 6. K2 — siblings that bypass the mechanism

Greps run after the turn:

- `grep -rn -e 'auth-token' -e '"sb-' -e "'sb-" -e '`sb-' src --include=*.ts --include=*.tsx | grep -v '\.test\.'` → only src/lib/session-key.ts (the rule), src/lib/supabase-door.ts :16, :106 (comments) and src/features/session/session-policy.ts :83 (a comment). No bypass.
- `grep -rn -e 'auth-token' scripts --include=*.ts` → scripts/e2e-failure-report.ts :20 (comment), :117, :1798 — the redaction of any project's session name from evidence, on purpose (secret redaction), outside both census domains, as the brief and the census's comment say.
- `grep -rn "__ethioSupabase" e2e | wc -l` → 91 in 24 files (`grep -rln`) — INC-959, left with its own roadmap line (Part F).
- `grep -rn "loadRouteChunk\|preloadRoute" src` (non-test) → only app-shell.tsx :136 and sign-out-landing.ts's comment. No other fetch-ahead.
- `grep -rn "pageWentAway\|isClosed()" e2e | grep -v helpers/route-guard.ts` → none.

Beyond INC-959's: none found.

## 7. Allowlists and guards

- No allowlist changed (`git diff --stat BASE..HEAD -- scripts/conformance/*-allowlist.txt` is empty); route-guard-allowlist.txt still has 3 lines.
- CF-PROJECT-1: `[project-reads] files read: 548; findings: 0`. CF-PROJECT-2: passed. CF-PROJECT-3: `[project-reads] e2e files read: 117; findings: 0`. CF-PROJECT-4: passed (it plants a key search at :2 and a clock name at :1, and passes the helpers and a comment).
- CF-RG-1: `[route-guard] files read: 118; unguarded handlers: 5 in 3 files`. CF-RG-2: passed (lines 4 and 16 named).
- HOOK-1 (src/lib/env-flags.test.ts) names `__ethioHomeAhead` in app-shell.tsx; passed.
- wired.test.ts: passed.

## 8. Strings

None. `git diff --name-only BASE..HEAD -- src/i18n/locales` is empty (FLAGS no-new-string). `bun run i18n:usage` → `1736 keys across 597 files (396 dynamic call sites)`; the key count is unchanged. Only the maps' `"scanned"` file counter moved, 595 → 597, because of the two new src files (section 10).

## 9. Migrations

None (`git diff BASE --stat -- supabase` is empty).

## 10. Departures

1. **The i18n maps moved; the brief expected no change.** docs/generated/i18n-usage.json and public/i18n-usage.json each changed one line: `"scanned": 595` → `597`. The generator counts the files it scans, and Part B (src/lib/session-key.ts) and Part D (src/lib/sign-out-landing.ts) each add one. No key changed. `bun run e2e:local`'s map guard refused to start with stale maps, and `land.ts` refuses to land when they are not committed, so the maps were committed with Parts C–D (`e81fb97`). Both files are in rule 00's standing allowance but not in this brief's THE FILES list. For the supervisor's ruling. As a result, Part B's commit `442e3ea` holds the maps one count stale (596 expected). The maps are fresh from `e81fb97` on.
2. **The reviewer ran in the background.** The Agent call asked for the foreground (`run_in_background: false`), but the platform started the reviewer in the background. The turn waited for its own final line before writing this report (as the brief allows).
3. **The reviewer's findings are not fixed.** The brief's text does not allow fixing them: every touched file is pinned by THE CHECKS' hash list and changes only through the applier ("never edited or reflowed by hand"). So each one is listed here for a ruling.
   - **MAJOR-1 (K3):** row 62's new mechanism `createHomeAhead` lands without a `scripts/conformance` census, a planted bypass or a wired.test.ts entry. Its guards are the behaviour tests HA-1…4 and SO-13. Neither a census file nor wired.test.ts is in SCOPE. The brief's CONFORMANCE GUARD line for concern 2 names HA-1…4 and SO-13 as the guard. Rule 10 K3 asks for a census.
   - **MINOR-1:** the i18n maps moved (departure 1).
   - **MINOR-2:** new `as unknown as` casts at app-shell.tsx :138, auth-signout.spec.ts :298 and e2e-route-guard.test.ts :15. All three come from the brief's blocks and follow the existing window-instrument pattern. `readStoredSession`'s `JSON.parse(raw) as PersistedSession` has no shape check.
   - **MINOR-3:** e2e/helpers/session.ts :67 prints E2E_SUPABASE_URL's value in its error when that value is not a URL. The value is the staging project's public address, not a secret. Rule 50 still says never to print an env var's value.
   - **MINOR-4:** the mobile account menu's code still arrives only on its first opening. SO-13 opens the menu once while online, as SO-12 does. An offline sign-out on mobile from a page whose menu was never opened is outside DEC-279 and is not proven (section 12).
   - **MINOR-5:** assertions and mocks changed shape:
     - SO-11 (:227), SO-12 (:266) and SO-13 (:328) now check that this project's exact session name is gone, where they used to check any project's `sb-*-auth-token`. The brief's Decisions cover only SO-8 and SO-9.
     - SO-3b's removal now uses the exact name.
     - RG-2's route mock is `routeOn(true)` instead of `{}`.
     - RG-1 has two more assertions.
   - **MINOR-6:** three places still say a reload or a navigation "has gone" the page, while the guard now ends a request quietly only on a closed page: route-guard.ts's header :7–8, register row 57's concern column and the e2e-harness.md line. e2e/helpers/on-demand.ts :16–18 makes the same reload claim, and that file is outside SCOPE. The guard's own users (`refuseScripts` in on-demand-failure.spec.ts and supabase-door.spec.ts, and ALS-1) were not in THE END-TO-END CHECK, so CI on the landing is their first run under the narrowed rule. Also, `request().frame()` throws for a service-worker request, and that throw would replace the handler's original error.
   - **MINOR-7:** docs/features/admin-shell.md :286 (U0j, sign-out is a hard reset) is not updated for DEC-279 (H1). That file is outside the brief's docs list.

No STOP and no ruling in this turn.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read at Part A:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `562db573165aec4e14e3f11e347cc9a21fceadfa` (short `562db57`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T22:13:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40590576844
```

Two-step check: SUCCESS, and the commit is BASE (`562db573…`) — current for BASE. This landing's run has not completed.

## 12. Limits

- No local run is CI's verdict. CI on the landing runs every test in its lanes.
- The browser runs targeted ethio-staging with a non-lock-exact local install (INC-420). The bundle reading `JS: 205.3 KiB / 207 KiB — ok` and `CSS: 20.5 KiB / 40 KiB — ok` comes from this install's build.
- No `--repeat-each` or flake proof (DEC-184). SO-13 ran red once on BASE's app (C1). An earlier C1 attempt stopped at the stale-map guard before any test ran, and so did the first D2 attempt. SO-13 then ran green in D2 and in THE END-TO-END CHECK.
- An offline sign-out on mobile from a page whose account menu was never opened is not proven (review MINOR-4).
- The route guard's users outside the brief's E2E list (e2e/on-demand-failure.spec.ts, e2e/supabase-door.spec.ts, e2e/ad-page-layout.spec.ts ALS-1) were not run locally (review MINOR-6).
- CI-only jobs were not run locally: the 16 E2E lanes, semgrep, gitleaks, dependency-audit and the weight guards beyond `check-bundle-size.mjs`.
