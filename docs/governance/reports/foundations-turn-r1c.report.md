# Foundations turn R1c — report

Brief: `docs/governance/briefs/foundations-turn-r1c.md` (the ruling of R1c, continued after the time-limit stop under the continue ruling at base `1c43379b`). Tier B. No migration, no new dependency.

## 1. Step 0

- sha256 of the fenced ruling: `c4f24de65c45b8ada354cc66398591ff5749ebac630c96f34dee0c140de9e321` (equals the value after END). Roadmap line 3 names the brief.

## 2. CI

- Last completed run read at the raw ci-evidence addresses: run 41011892858 on `1c43379b` — **FAILURE** (the platform's push of the half-landed tree, as the ruling expected). Causes, classified:
  - Build, typecheck, lint: the two `twin helpers per J5` lint errors (`.first()` in `e2e/submenu.spec.ts:114`, `e2e/submenu-touch.spec.ts:77`). Fixed at the root: SMN-E4's panel is read strictly (one live panel), ROWS-E1's list by its one `nav > ul.menu-fit`.
  - E2E lanes 8/16/repeat/smoke and staging: `shell.spec.ts:1077`, `:1345`, `:1553` asserted R1b-2's 32–40 px rows (`<= 41`, received 44.8 px on CI's smaller tree), and the old ROWS-E3 asserted the 15-root fit on any tree (received 448 against 302). Fixed: the four `<= 41` bounds take D247's 48 (G38, named below); ROWS-E3/ROWS-E1 rewritten under ruling 2.
- Before this report: CI on `a4bfd7c7` (run 41006844051) SUCCESS was the last green. No CI has run on this turn's final tree; it is the judge.

## 3. Part 0 — red-first evidence (both INC-1008 causes)

Unchanged from the first half (in the tree since `58149cc8`): cause 2 (a tall panel clamped and scrolling inside itself) failed SMN-E4 at 1280×600 and 1024×600 against the base code restored locally, never committed; cause 1 (no placement on resize) still failed the 900→600 resize after the row shrink. Both passed after the fixes. No third cause.

## 4. Parts

| Part | State | Tests |
|---|---|---|
| 1 D244 | done (first half) | SMG-1, SMG-2, SMN-E4; CF-SUB-1 D244 lines + planted |
| 2 D247 | done; ruling 2 applied this half | CF-ROWS-1 (+ planted >16 branch); ROWS-E1, ROWS-E3, ROWS-E4; SMN-E1/E3 |
| 3 D246 | done | CF-SUB-1 D246 line + planted proof; B21SC-6, B21SC-7 (new); B21SC-1 SC-1, RM-1, RM-2, FV-1 changed (G38) |
| 4 D245 | done | SMN-7 (unit), SMN-E5 (E2E); SMN-1, SMN-6 expectations moved |
| 5 folded rail | done | SMN-E6 (new); category-nav.spec.ts re-read: no assertion changed |

Ruling 2: ROWS-E1 (`e2e/submenu-touch.spec.ts`) and ROWS-E3 (`e2e/menu-rows.spec.ts`) read the main list's count at run time and assert the rule for it (16 or fewer: no scroll, rows ≥ 32 px; more than 16: `data-many` and a scroll whose scrollbar takes width, measured without `--hide-scrollbars`). Each proves the 16-or-fewer branch on a 12-child scratch branch it seeds itself through the shared `seedScratchBranch` (moved from SMN-E4 into `e2e/helpers/posting.ts`) and removes in `afterEach`. On the phone the seeded level holds 14 rows (‹ Main menu, the opened root, its 12); on the rail the seeded list is the opened side panel's 12 rows. The real 15-root tree is the operator's walk. ROWS-E2 stays with R1d (roadmap line).

Ruling 3: mechanisms row 80 completed to seven columns (Exceptions: the menu-rows-allowlist line with its reason and until 2026-11-30; Growth axes; Notes). Rows 79 and 80 re-read whole.

D246 changed assertions (G38, each replaced by D246, not loosened): B21SC-1 SC-1's reopen block (now: the leaf's level, the leaf marked and in view, back twice without a navigation); RM-1's and RM-2's reopen (the leaf's level, Main menu back row, the leaf `aria-current="page"`); FV-1's two `!mobile &&` back-row guards (the phone menu also opens at the page's level, so back reaches the main list before the favourite is read). D247 changed bounds (G38): `shell.spec.ts` four `toBeLessThanOrEqual(41)` → 48 (strip, menu-in-place, first strip row, first menu row).

D245 in code: the surface `rounded-none border border-border bg-popover shadow-none`, flush (PANEL_OVERLAP 1 px over the edge; PANEL_INSET 1 for the border), opacity-only `transition-opacity duration-300 ease-[ease]`, a closing panel kept PANEL_FADE_MS (300 ms) as `submenu-panel-closing`, `data-state="closed"`, `aria-hidden`, `inert`, non-interactive; reduced motion: no transition and no lingering panel. Row separators `border-b border-border` (none on the last), hover `hover:bg-muted`, no hover transition, our row padding (G17). The folded header carries the same surface and a separator.

## 5. Tokens beside ethio.com's literals

| ethio.com | token | light value (src/styles.css) |
|---|---|---|
| `#fff` surface | `bg-popover` | `--popover` (white in light mode) |
| `#ccc` border / separators | `border-border` | `--border` |
| `#e9ecef` hover | `bg-muted` | `--muted` |

The token values are the theme's own; they are the closest tokens, not the literals (C3).

## 6. Per-page growth (gzip, KiB, against `b2ba8e8e`, the same measurement as check-bundle-size at 4 decimals)

All 50 pages grew between +0.0986 and +0.1211 KiB; none above 0.5 KiB, none over its ceiling. Cause, per chunk: `index` +0.1211 (app-rail.tsx's D246 current-row-in-view and URL-level opening, in the entry), `styles` +0.0947 (D245's surface/separator utilities in the shared stylesheet; the panel's code stays on demand). Ceilings raised by DEC-296 only where the NEAR band asked:

| page | base | now | growth | ceiling |
|---|---|---|---|---|
| /admin/translations_/$lang | 321.5547 | 321.6631 | +0.1084 | 322 → 323 |
| /legal/publishing | 212.5898 | 212.7109 | +0.1211 | 213 → 214 |
| every other page | — | — | +0.0986 … +0.1201 | unchanged |

## 7. E2E (local backend, both projects, retries 0)

- shell.spec.ts whole: 157 passed, 65 skipped, 0 failed; then by title the three tests whose bounds moved to 48: 3 passed.
- shell.spec.ts + category-nav.spec.ts whole (before the RM/FV changes): category-nav green; the three D246 failures led to the changes above.
- menu-rows, submenu, submenu-touch, overlay-shift, i18n-coverage whole: 26 passed, 14 skipped, 0 failed; submenu.spec.ts again after the layoutBoxes read: 5 passed, 5 skipped.
- Ids grep-checked: SC-6/SC-7 were taken (admin-screening.spec.ts), so the new tests are B21SC-6 and B21SC-7; SMN-7, SMN-E5, SMN-E6 free.

## 8. Units

2,282 tests in the last whole run (one failure, BX-1: SMN-E5's two `boundingBox()` reads, now one `layoutBoxes` read; BX-1 passes). Final count: see the checks line.

## 9. The checks

CHECKS_LINE

## 10. K2 (same concern, bypassing the mechanism; not touched)

- MenuNav (`app-rail.tsx`, route menus) marks the current item by `isCurrent`, not the URL-level opening; joins at R1d.
- `app-rail.tsx` in-place sites (submenu-allowlist, until R1d) and the strip's hidden scrollbar (menu-rows-allowlist, until 2026-11-30).
- SMN-E4 removes its branch in `finally`, not `afterEach` (J3), as it was written in the first half; the new seeds use `afterEach`.
- Two non-modal overlays predating row 77 (app-rail.tsx, row-actions.tsx).
- CI's old ROWS-E3 read the rail's region as 302 px at 1280×600 against the local 488 px; the new test judges whatever height it reads, but the difference is unexplained and is for the next CI read.

## 11. Limits

- No CI on the final tree yet. The real 15-root tree, the 300 ms fade and the Mac hidden-scrollbar case are the operator's walk on the preview.

## 12. git diff --name-only b2ba8e8e

- `docs/_changelog.md`
- `docs/features/panels.md`
- `docs/governance/briefs/foundations-turn-r1c.md`
- `docs/governance/mechanisms.md`
- `docs/governance/reports/foundations-turn-r1c.report.md`
- `e2e/helpers/posting.ts`
- `e2e/menu-rows.spec.ts`
- `e2e/shell.spec.ts`
- `e2e/submenu-touch.spec.ts`
- `e2e/submenu.spec.ts`
- `roadmap.md`
- `scripts/conformance/menu-rows-allowlist.txt`
- `scripts/conformance/menu-rows.test.ts`
- `scripts/conformance/submenu.test.ts`
- `scripts/e2e-select.ts`
- `scripts/route-budgets.mjs`
- `src/components/shell/app-rail.tsx`
- `src/components/shell/submenu/submenu-signal.ts`
- `src/components/ui/submenu-geometry.ts`
- `src/components/ui/submenu-impl.test.tsx`
- `src/components/ui/submenu-impl.tsx`
- `src/styles.css`
