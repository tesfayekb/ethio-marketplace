# Foundations turn 34b-4 — completion report

Brief: `docs/governance/briefs/foundations-turn-34b-4.md` (sha256 `e9f342ec2ddc9d92cc0055da2545d38fc16076f776aa18d4702fdbad97a70706`, 32047 bytes — matches).
Reviewer (independent, on the last code commit): READY — no BLOCKER, no MAJOR.

## 1. Done by part

- Part A — done. `git rev-parse HEAD` = `1346a1be506179209286a168c323ea26ae8fc1b6` = BASE (<START>). The newest readable CI evidence is the run on `f09ec2a` (turn 34b-3), not BASE: run 40382950832 on BASE had not written evidence yet.
- STEP 0 — done; hash and byte count match.
- Part B — done (red first, §3).
- Part C — done; build log `build OK`; `bunx vitest run scripts/conformance`: `Test Files 19 passed (19)`, `Tests 104 passed (104)`.
- Part D — done (roadmap line 3, register row 52, changelog line, roadmap tick of 34w-2 and this turn's line).
- THE CHECKS — done (§4). Reviewer — done (§7). Report — this file.

## 2. Files (`git diff --name-only 1346a1be`)

docs/_changelog.md, docs/governance/briefs/foundations-turn-34b-4.md (new), docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-34b-4.report.md (new), roadmap.md, scripts/conformance/on-demand-failure.test.ts.

## 3. Red first (BASE's census, ODC-5 added)

```text
     × ODC-5 a handler that does nothing is silent, and no handler is none: an empty catch, a bare return, then(ok, undefined), catch(undefined) (34b-3's reviewer) 7ms
AssertionError: expected '' to be 'node_modules/.cache/on-demand-failure…' // Object.is equality
      Tests  1 failed | 4 passed (5)
```

## 4. The checks

- Hash list: `docs/_changelog.md: OK`, `docs/governance/mechanisms.md: OK`, `scripts/conformance/on-demand-failure.test.ts: OK`.
- `git diff 1346a1be --stat -- src supabase e2e`: empty.
- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
- `bun run test:unit`: `Test Files 318 passed (318)`, `Tests 1966 passed | 1 skipped (1967)`. No known limit timed out this run.
- `bun run format:check`: clean (run last).

## 5. K2

- Product calls the tightened census would newly name: none (ODC-1 green on the tree).
- Other do-nothing forms in src/ (already judged before this turn, warm-ups or not loader calls): `src/server/route.ts:130`, `src/components/shell/date-field.tsx:51`, `src/components/ui/overlay-loader.ts:67`, `src/components/ui/overlay-facade.tsx:137`, `src/features/posting/map/leaflet.ts:181`, `src/features/admin/users/user-detail.tsx:234`, `:293`, `:334` (`.catch(() => undefined)`); `src/providers/theme-provider.tsx:16`, `src/providers/rail-state.ts:20` (`catch(e){}` inside inline boot-script strings, not code the census reads). Test files: `src/lib/refresh-after-write.test.ts:87`, `src/features/feed/held-first-page.test.ts:31`.
- Log-only handlers (`.catch((…) => console.…)`): none found by search.

## 6. None

Migrations: none. Strings: none. Product code: none. Packages: none. AGENTS.md: unchanged.

## 7. Reviewer

READY. Checked: `handlerIn` makes `undefined`/`null`/`void 0` no handler for `.catch` and `.then`'s second argument; `doesNothing` accepts only empty statements and bare/undefined/`void 0` returns, so a body with any other statement still counts as an answer; `isSilent` now judges a catch block directly. MINOR (not fixed, out of the brief's contract): a `catch (e) { e; }` expression-only body or a handler that only logs still passes — the brief keeps these as review questions.

## 8. Departures

None.

## 9. CI (last readable)

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898` (short `f09ec2a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T18:26:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40374691120
```

Failing evidence: E2E `Failed: 3`, including `auth-signout.spec.ts › U0j sign-out hard reset › SO-12 …` — the red turn 34w-2 closed (expected). BASE's run 40382950832 not yet in evidence.

## 10. Limits

No browser run (none owed). EXH-11/12/17/19, AAN-1, CF-SL-1/3/6 did not time out this run. CI on this landing is the supervisor's to read.
