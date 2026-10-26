# Foundations turn 34c-1 — completion report

Brief: `docs/governance/briefs/foundations-turn-34c-1.md` (sha256 `6ef39fbc62a372b3056a7eab74d8ea55333aab9640fc9f0f97ac0b9aa18468fe`, 65918 bytes — matches).
Reviewer (independent, on the last code commit): READY — no BLOCKER, no MAJOR; two MINORs (§8).

## 1. Done by part

- Part A — done. `git rev-parse HEAD` = `eb95b9e42b0a822d49993c7c9148243d53c54aec` = BASE (<START>). The newest readable evidence is still for `f09ec2a` (turn 34b-3); run 40384938946 on BASE had not written evidence yet (§10).
- STEP 0 — done; hash and byte count match.
- Part B — done (red first, §4).
- Part C — done: C1–C4 copied by script from the saved brief; C5 `bun run i18n:usage` (1736 keys across 593 files); build log `build OK`; the touched test set passed (§5).
- Part D — done (roadmap line 3, AGENTS.md, register rows 53/54, changelog, roadmap 34b-4 ticked, 34c split into 34c-1/34c-2).
- THE CHECKS, THE END-TO-END CHECK, the reviewer — done (§5, §6, §8).

## 2. Files (`git diff --name-only eb95b9e`)

AGENTS.md, docs/_changelog.md, docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-34c-1.md (new), docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-34c-1.report.md (new), e2e/supabase-door.spec.ts, public/i18n-usage.json, roadmap.md, scripts/conformance/session-reads.test.ts (new), src/features/auth/auth-client.test.ts, src/features/auth/auth-service.ts, src/features/auth/types.ts, src/features/auth/use-auth.test.tsx (new), src/features/auth/use-auth.ts, src/features/legal/use-legal-gate.ts, src/lib/session-bearer.test.ts, src/lib/session-bearer.ts, src/lib/signed-in-route.test.ts, src/lib/signed-in-route.ts, src/lib/supabase-door.test.ts, src/lib/supabase-door.ts, src/routes/\_\_root.tsx, src/routes/auth\_.callback.tsx, src/routes/auth\_.reset.tsx, src/routes/root-error.test.tsx (new).

## 3. Behaviour, before → after

- `currentSession()`: `{ session, failed }`, and every getSession() error counted as failed → `SessionRead` with `error`. Only a refresh that never reached the server (`AuthRetryableFetchError`) is failed, and it is logged. A refresh the server refused now reads as signed out.
- use-auth: a failed read meant signed out (Sign in shown) → the visitor stays loading, with neither Sign in nor the account, and the shell's notice offers Refresh.
- requireSignedIn: a failed read sent a signed-in visitor to /auth (307) → it throws, and the route error view shows Refresh.
- session-bearer: sent no bearer and said nothing → still sends no bearer, and logs `[session-bearer] the session could not be read: …`.
- fetchPreferredLanguage / savePreferredLanguage: answered "no session" → "the session could not be read".
- legal landing: landed silently → still lands, and logs `[client-error] legal landing: …`.
- route-client: unchanged; a refused refresh now reaches it as a signed-out caller.
- reset / callback: code that did not load was shown as a dead link → `LoadFailedHere` (Refresh). The reset submit now uses `finally`, so its button always comes back.
- Root error view: "Try again" (`router.invalidate` + `reset`) → Refresh (`refreshPage`) on the shared Button.

## 4. Red first (BASE code)

```text
AssertionError: expected 'src/features/auth/auth-service.ts:675…' to be '' // Object.is equality
AssertionError: expected "warn" to be called with arguments: [ Array(1) ]
AssertionError: expected Response { status: 307, … } to not match object { options: { to: '/auth' } }
AssertionError: expected { session: null, failed: true } to deeply equal { session: null, failed: true, …(1) }   (×3: SBD-11, SBD-15, SBD-20)
AssertionError: expected <button …(1)></button> to be null
AssertionError: expected "vi.fn()" to be called with arguments: [ 'the session', …(1) ]
      Tests  8 failed | 23 passed (31)
```

## 5. The checks

- Hash list: all 23 lines OK.
- `git diff eb95b9e --stat -- src/integrations supabase`: empty.
- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
- C5 set: `Test Files 1 failed | 107 passed (108)`, `Tests 1 failed | 580 passed (581)`. The one failure was CF-SL-1, a known limit (INC-921). Run alone, `scripts/conformance/strings-layers.test.ts` gave `Tests 6 passed (6)`.
- `bun run test:unit`: `Test Files 321 passed (321)`, `Tests 1974 passed | 1 skipped (1975)`.
- `bun run i18n:map-guard`: `usage maps match the tree.`
- `bash scripts/check-hardcoded-strings.sh`: `findings: 0`.
- `bun run format:check`: clean (run last).

## 6. End-to-end (`bun run e2e:local`, both projects, 0 retries)

- e2e/supabase-door.spec.ts: `12 passed (1.0m)` (SBE-6 among them)
- e2e/auth-signout.spec.ts: `32 passed (3.2m)`
- e2e/auth-reset.spec.ts: `6 passed (26.5s)`
- e2e/auth-callback.spec.ts: `4 passed (16.0s)`
- e2e/settings.spec.ts: `9 passed (42.9s)`
- e2e/smoke-auth-i18n.spec.ts: `2 passed (17.6s)`
- e2e/legal-certify.spec.ts: `1 skipped`, `41 passed (5.3m)`
- e2e/on-demand-failure.spec.ts: `2 passed (11.8s)`
- `[ssr-error]` lines across all run logs: 0.

## 7. K2

- Session and user reads outside the door, which read the client directly and do not report a failed read:
  - settings.tsx:180; mfa-service.ts:171
  - auth-service.ts:224, :410, :481 (`rehydrate`, INC-931 → 34c-2), :511, :550, :556, :575, :668
  - pricing-data.ts:142; posting-service.ts:531, :722, :937, :956; account-overview.tsx:67
  - src/integrations/supabase/auth-attacher.ts:9 (the platform's own attacher)
  - src/server/supabase/user-client.ts:93 is server-side and outside this concern.
- Synchronous `__ethioSupabase` readers in e2e/ (listed, not changed; turn 34c-2): admin-users.spec.ts:63, :69; admin-translations-data.spec.ts:251, :635, :660, :801, :826, :855, :881; admin-translations-console.spec.ts:61, :267.
- Error views offering a retry that may need a refresh: certify-block.tsx:82 and legal-accept-screen.tsx:109 (`common.tryAgain`). Whether these retry a download or only a request is a review question; they were not changed. The route error views of terms.tsx:35, privacy.tsx:35, legal.publishing.tsx:65 and legal.$kind.tsx:51 draw the document's own "not available" page and offer no retry.
- Screens that call a link dead, or a person signed out, when their code did not load: none remain in reset or callback. /auth's `hasSessionRehydrating` returns false on "unavailable", so a visitor there sees the sign-in form, which is a signed-out reading. That stays for 34c-2 with INC-931.

## 8. Reviewer

READY. MINOR 1: after a failed read, use-auth stays loading until an auth event or a refresh. This is by design (the supervisor's decision), and the shell's notice is the cure. MINOR 2: the census follows only a held answer's `.failed` within its function, and a destructured `{ failed }` that is never used still passes. It has the same shape as the brief's census, and no product case exists.

## 9. Departures

- auth-signout.spec.ts and legal-certify.spec.ts were each run twice. My first runs used a shorter time limit of my own (190 s and 290 s, under the brief's 600 s ceiling), which cut them off before any result line. Each was run once more at the 600 s ceiling and passed whole (§6). The cut-off runs printed no failure.
- Migrations: none. Strings: none. Packages: none.

## 10. CI (last readable)

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898` (short `f09ec2a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T18:26:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40374691120
```

E2E evidence for that run: `Failed: 3`, including SO-12, which turn 34w-2 closed. Run 40384938946 on BASE is not yet in the evidence.

## 11. Limits

CF-SL-1 timed out once under full load and passed alone (INC-921). No other known limit appeared. CI on this landing is the supervisor's to read.
