# Turn A — the budget instrument (DEC-296) — report

## 1. Step 0
Brief `docs/governance/briefs/foundations-turn-a-budget.md`, sha256 `ef25274504f65e265a4171ee59a3c9d1c1899bd8382829953786ff5800ef47a3` (matches). Roadmap line 3 names it; prettier passes.

## 2. CI
d2e9bb36: FAILURE, run 41151685462. The first-paint budget job and every other guard passed. Lane 2 is the only failure: "Sources without results: shard 2". The suite ran 2,349 passed, 0 failed, 0 flaky. Lane 2's log was not read, so the cause is UNCONFIRMED. It looks like infrastructure (the lane produced no results; the INC-1018 class). No code path is implicated, and CI on this push judges.

## 3. The guard
- `scripts/budget-band.mjs` holds `NEAR_KIB` = 0.3, `LOCAL_ALLOWANCE_KIB` = 0.1, `ceilingFor`, `ceilingForLocal` and `nearFindings`.
- `scripts/check-bundle-size.mjs` judges the entry JS, the stylesheet and every page row with it.
- `scripts/route-budgets.mjs` re-exports the band.
- The two DEC-296 comments are corrected to the ruled form.
- The planted cases are NB-1…5 in `scripts/conformance/budget-band.test.ts`:
  - 307.9/308 fails, naming the page, the size and ceilingFor = 309;
  - 307.7/308 passes;
  - the entry and the stylesheet are judged like the pages.
- The test is wired in `wired.test.ts`.

## 4. Census

| page | size | source | ceiling |
| --- | --- | --- | --- |
| entry JS | 208.8 | local 208.706 + 0.1 | 209 → 210 |
| /admin/roles | 308.0 | CI 398a5859 | 308 → 309 |
| /admin/screening | 381.9 | CI | 382 → 383 |
| /admin/users | 307.0 | CI | 307 → 308 |
| /auth_/callback | 209.8 | CI | 210 → 211 |
| /auth_/reset | 211.8 | CI | 212 → 213 |
| /c/$slug | 222.9 | CI | 223 → 224 |
| /dev/primitives | 224.7 | CI (at the band's edge; local + 0.1 is inside) | 225 → 226 |
| / | 222.9 | local + 0.1 | 223 → 224 |
| /account_/saved | 221.7 | local + 0.1 | 222 → 223 |
| /admin | 209.8 | local + 0.1 | 210 → 211 |
| /admin/coverage | 332.8 | local + 0.1 | 333 → 334 |
| /admin/impersonation_/$sessionId | 311.0 | local + 0.1 | 311 → 312 |
| /admin/legal_/edit | 284.9 | local + 0.1 | 285 → 286 |
| /admin/listings_/$listingId | 381.7 | local + 0.1 | 382 → 383 |

/admin/roles_/$roleId measures 309.6 in CI, so ceilingFor gives 310 and it stays. The stylesheet is 22.5 of 40 KiB and stays. Nothing was lowered. The budget check on the production build (`env -u VITE_E2E`) reads "Bundle budget OK".

## 5. Units and checks
- The one full run read `checks: 33 PASS · 1 FAIL · 21 NOT RUN · 972s`, with unit tests at 2,356/2,357.
- The FAIL was TI-1: the new BB-n test ids already existed elsewhere. They were renamed NB-n.
- After the rename, TI-1, NB-1…5 and wired pass (13/13).
- LIMIT: the whole checks were not run again after the rename (time). CI judges the final tree.

## 6. K2
No other place states the NEAR form: the two comments in check-bundle-size.mjs are corrected, and every page line now cites DEC-296 (turn A).

## 7. Files
roadmap.md; docs/governance/briefs/foundations-turn-a-budget.md; scripts/budget-band.mjs; scripts/check-bundle-size.mjs; scripts/route-budgets.mjs; scripts/conformance/budget-band.test.ts; scripts/conformance/wired.test.ts; docs/governance/mechanisms.md; docs/_changelog.md; this report.
