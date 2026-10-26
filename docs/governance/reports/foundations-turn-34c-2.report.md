# Foundations turn 34c-2 — completion report

Brief: `docs/governance/briefs/foundations-turn-34c-2.md` (sha256 `d058f2b5f2ef76d88b848dad2a7ef079b41a2edba09ac8af26ee3eb3c0b1efad`, 55768 bytes — matches).
Reviewer (independent, on the last code commit): READY — no BLOCKER, no MAJOR; one MINOR (§8).

## 1. Done by part

- Part A — done. <START> = `cd3e00dd`, which is BASE `0d8d4f28` plus STOP 1's report. `git diff --name-only 0d8d4f28 HEAD` lists only `docs/governance/reports/foundations-turn-34c-2.stop-1.md`, which is outside SCOPE. ci-status.md, first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `eb95b9e42b0a822d49993c7c9148243d53c54aec` (short `eb95b9e`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T20:01:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40384938946
```

  Run 40391189707 on BASE is not yet in the evidence.

- STEP 0 — done; hash and byte count match.
- Part B — done (§4).
- Part C — done. Every block was copied by script from the saved brief. Build log: `build OK`.
- Part D — done.
- THE CHECKS, THE END-TO-END CHECK and the reviewer — done.

## 2. Files (`git diff --name-only 0d8d4f28`)

AGENTS.md, docs/\_changelog.md, docs/governance/briefs/foundations-turn-34c-2.md (new), docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-34c-2.report.md (new), docs/governance/reports/foundations-turn-34c-2.stop-1.md (STOP 1, already landed), roadmap.md, scripts/conformance/project-reads.test.ts (new), src/features/auth/auth-client.test.ts, src/features/auth/auth-service.ts, src/features/session/session-policy.test.ts (new), src/features/session/session-policy.ts, src/i18n/provider-layers.test.tsx, src/i18n/provider.test.tsx, src/i18n/provider.tsx, src/lib/supabase-door.ts, src/routes/\_\_root.tsx.

## 3. Behaviour, before → after

- **Session clocks:**
  - Names: before, their own pattern on the address, which gave "sb-local-…" for localhost → now `besideStoredSession` (`sb-<ref>-…`).
  - Live session: before, this project's token or any `sb-*-auth-token` in the browser → now `storedSessionKey()` only.
  - No project: before, a "local" guess → now null, and every caller returns.
  - Retired step-up hint: now named through `besideStoredSession`.
- **Password check's second client:** before, read the browser pair only → now `projectEnv()`.
- **Language list (provider):** before, read the browser pair only → now `projectEnv()`.
- **Root loader:** before, its own reading, trailing slash kept → now `projectEnv()`.
- **Photo origin:** before, its own reading → now `projectEnv()`.
- **`rehydrate`:**
  - Refresh that never reached the server: before, evicted the session → now throws; `sessionRehydration` answers "unavailable" and the session stays stored (ASC-7).
  - Refused refresh: evicts, as before.
- **`currentSession()`:** now uses the shared `neverReachedTheServer`; behaviour unchanged.

## 4. Red first (BASE code)

```text
AssertionError: expected 'src/features/auth/auth-service.ts:414…' to be '' // Object.is equality
AssertionError: expected 'none' to be 'unavailable' // Object.is equality
AssertionError: expected 'sb-local-session-ref' to be 'sb-localhost-session-ref' // Object.is equality
AssertionError: expected 'theirs' to be null
AssertionError: expected { …(3) } to be null
      Tests  5 failed | 7 passed (12)
```

## 5. The checks

- **Hash list:** all 13 OK.
- **`git diff 0d8d4f28 --stat -- src/integrations supabase e2e`:** empty.
- **C4 set:** `Test Files 1 failed | 108 passed (109)`, `Tests 1 failed | 503 passed (504)`. The one failure is CF-SL-1, a known limit (INC-921). Run alone: `Tests 6 passed (6)`.
- **`bun run lint`:** `✖ 39 problems (0 errors, 39 warnings)`.
- **`bun run test:unit`:** `Test Files 2 failed | 321 passed (323)`, `Tests 2 failed | 1978 passed | 1 skipped (1981)`.
  - The failures were CF-SL-1 (known limit) and EXH-21 in `scripts/conformance/executor-hooks.test.ts`.
  - EXH-21 is not on the brief's known-limit list. Run alone: `Tests 24 passed (24)`.
  - I ran the full suite a second time to capture EXH-21's failure line, and it did not fail then. That second full run is a departure (§9); I did not capture the first run's failure line.
- **i18n:** `bun run i18n:usage`, then `git diff --stat -- docs/generated public`: empty. `bun run i18n:map-guard`: maps match the tree.
- **`bash scripts/check-hardcoded-strings.sh`:** `findings: 0`.
- **`bun run format:check`:** clean (run last).

## 6. End-to-end

- e2e/auth-signout.spec.ts: `32 passed (3.5m)`
- e2e/auth-reset.spec.ts: `6 passed (30.5s)`
- e2e/smoke-auth-i18n.spec.ts: `2 passed (20.2s)`
- `[ssr-error]` lines: 0.

## 7. K2

- **Address, key or storage name read outside the door** (listed, not changed; the e2e/ ones are turn 34c-3's):
  - `e2e/auth-signout.spec.ts`: :143, :212, :230, :272, :306, :311
  - `e2e/smoke-auth-i18n.spec.ts`: :58
  - `e2e/admin-categories-home.spec.ts`: :240, :248–249, :380, :391, :395
  - `e2e/ad-page-doors.spec.ts`: :31–32
  - `e2e/account-saved.spec.ts`: :28–29
  - `e2e/viewing-place.spec.ts`: :59–60, :190–191
  - `e2e/auth-google.spec.ts`: :42
  - `e2e/auth-caller-gates.spec.ts`: :26–27
  - `e2e/admin-screening.spec.ts`: :867–868, :1249–1250
  - `e2e/helpers/session.ts`: :61, and `e2e/helpers/ui.ts`: :506, :563 (named by the brief)
  - `scripts/feed-bench.ts`: :286; `scripts/e2e-migration-preflight.ts`: :145; `scripts/security-lints.ts`: :122
  - `scripts/e2e-failure-report.ts`: :117, :1798 — redaction patterns, not readers
  - `supabase/functions/` does not exist in this tree.
- **Auth calls read as "no session" without asking whether the call reached the server:** auth-service.ts :224, :511, :550/:556/:575, :668, and mfa-service.ts :171 (`getSession().data.session` with no error check).
- **Door mocks:**
  - auth-client.test.ts and the two provider tests were fixed here.
  - The other door mocks (signed-in-route, session-bearer, use-auth, use-legal-gate, route-client, attribute-options, legal-reader, contact, count-view, save, report) test subjects that reach none of the four new readers, and all of them pass.

## 8. Reviewer

READY. MINOR: `besideStoredSession` derives its prefix from the stored key by slicing off `"auth-token"`. It is correct as long as `storedSessionKey()` keeps the `sb-<ref>-auth-token` shape, which SPK-1 proves.

## 9. Departures

- The full unit suite ran twice. The second run was to read the line for EXH-21's unlisted failure; EXH-21 passed in that run and passed alone.
- None for migrations or strings.

## 10. Limits

CF-SL-1 timed out under load and passed alone (INC-921). EXH-21 failed once under full load, and that failure line was not captured. CI on this landing is the supervisor's to read.
