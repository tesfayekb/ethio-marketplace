# Foundations turn R1c-fix — report

1. **Step 0.** `docs/governance/briefs/foundations-turn-r1c-fix.md` saved; the fenced text's sha256 is `2bb0b8fca2ff51d1b2c1be260436fc6013414f28c94a8843adb7d64deca7991a`, equal to the ruling's value. Roadmap line 3 names it.

2. **CI.** Run 41020162680 on `8aead74b`: **SUCCESS** (completed 2026-10-30T07:45:19Z; E2E passed, flaky 0, no errors outside a test). No red to classify. The final tree of this turn has no CI yet.

3. **Part A.**
   - **Item 1, INC-1010 (phone rows stay compact).** `src/styles.css`: `.menu-fit:not([data-many]) > li:not([aria-hidden])` gains `max-height: 2.5rem` under `@media (max-width: 767.98px)`; from 768 px the 3rem cap stays; the 32 px floor, `data-many` and the 16-item line are unchanged. `e2e/shell.spec.ts` :1077, :1346, :1555, :1566 back to `toBeLessThanOrEqual(41)`. D247's sentence rewritten exactly in `docs/features/panels.md` and register row 80 (Concern and Notes); the C2 exception text unchanged. Tests: ROWS-E1 asserts each phone row 32–40 px; new ROWS-E5 (id grep-free) seeds 13 subcategories (15 rows with back and root) at 360×740, asserts no scroll and each row ≤ 40 px and ≥ its share `min(40, height/15) − 1`; removed in afterEach.
   - **Item 2, INC-1011.** Measured (below). ROWS-E3's judge now asserts all three branches: fits at 32 px → no scroll, rows 32–48; 16 or fewer but too tall → overflow > 0 and scrollbar width > 0; more than 16 → `data-many` and visible scroll. Not a STOP: the height goes to the page footer in view on a short, signed-out page, not to another menu section; the signed-in state was not measured (named under K2).
   - **Item 3, J3.** SMN-E4 now records its seeded branch and removes it in afterEach; the `try/finally` is gone.
   - **Runs (retries 0, both projects, each file whole):** `menu-rows.spec.ts`, `submenu.spec.ts`, `submenu-touch.spec.ts` — 11 passed, 11 skipped (desktop-only/touch-only skips), 0 failed; `shell.spec.ts` — 157 passed, 65 skipped, 0 failed. No helper changed (G37: no by-id runs owed).

4. **The rail at 1280×600 (E2E state: signed out, staging, 27 roots in the local backend at run time).**

   | Block | top | height |
   | --- | --- | --- |
   | top bar (`shell-band`) | 0 | 56 |
   | rail (`app-rail`, fixed, `bottom: var(--rail-bottom-inset)` = 186 px) | 56 | 358 |
   | · padding top | 56 | 8 |
   | · panel header (`panel-header`) | 64 | 32 |
   | · gap | 96 | 8 |
   | · `rail-scroll` (client 302, scroll 972) | 104 | 302 |
   | · padding bottom | 406 | 8 |
   | footer (`shell-footer-wrapper`), in view | 415 | 185 |

   Reason for 302 vs 488: the page's document is only 600 px tall (a short feed), so the footer sits in the viewport and the rail stops above it (`--rail-bottom-inset`, app-rail.tsx :968–:974), taking 186 px. Locally earlier the feed was long, the footer off screen, inset 0 → 488 px. This run's own local measurement shows 302 too, so it is the page's length, not CI.

5. **Growth.** One rule in the shared stylesheet: +22 bytes gzipped (+0.0215 KiB) on every page that loads it, the same on all 50; no ceiling moved (bundle-budget: "0 NEAR, none grew").

6. **Units.** 2,282 / 2,282.

7. **Checks.** The first whole run failed format (`e2e/submenu-touch.spec.ts`, fixed by prettier) and one unit, PHR-1 (`src/routes/l.photo.test.ts`), timed out at 5 s under load; it passed 4/4 alone and the rerun passed it — no timeout raised. Second whole run, last line: `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 1323s`.

8. **K2.**
   - The rail yields height to the footer on any short page; whether the categories keep their height is a product ruling. Signed-in rail breakdown not measured this turn.
   - PHR-1 timed out once under the full run's load (5 s default) — a flake candidate, not touched.
   - Tooling `localeCompare` sites and the E2E Segmenter oracle (L-2), unchanged.

9. **git diff --name-only 8aead74b.**
   - .lovable/plan.md
   - docs/_changelog.md
   - docs/features/panels.md
   - docs/governance/briefs/foundations-turn-r1c-fix.md
   - docs/governance/mechanisms.md
   - docs/governance/reports/foundations-turn-r1c-fix.report.md
   - e2e/menu-rows.spec.ts
   - e2e/shell.spec.ts
   - e2e/submenu-touch.spec.ts
   - e2e/submenu.spec.ts
   - roadmap.md
   - src/styles.css

10. **R1d plan.** `.lovable/plan.md` — "Turn R1d plan — the rest of the left menu"; no R1d code in this turn.
